# Student Enrollment Architecture Plan

## 1. Domain Model & Resources

### Resources (React Admin `<Resource>` registrations)

| Resource | Endpoint base | Purpose |
|---|---|---|
| `students` | `/students` | Student personal data. **CRUD restricted to read/update/delete** — POST is removed from this resource. |
| `enrollments` | `/enrollments` | One row per `(studentId, schoolYearId)`. Owns grade, section, classroom, conditions. |
| `students/enroll` (virtual) | `POST /students/enroll` | **The only way to create a student.** Composite operation. |
| `students/:id/reenroll` (virtual) | `POST /students/:id/reenroll` | New enrollment for an existing student. |
| `students/:id/eligible-school-years` (virtual) | `GET /students/:id/eligible-school-years` | Drives the enabled/disabled state of the **Reenroll** button. |

`students` resource keeps `list`, `edit`, `show`, `delete` only. **No `create` prop** on `<Resource name="students">` — the "Create" button is replaced by a plain "Nuevo Estudiante" route that mounts a custom `<StudentEnrollPage>` (not wrapped in `<Create>`).

---

## 2. Backend Contract (delegated)

### `POST /students/enroll`
Atomic. Single transaction: create student + create first enrollment, or roll back.

```jsonc
// Request
{
  "student":    { /* full StudentCreate payload */ },
  "enrollment": { "schoolYearId": 1, "gradeOfferingId": 12, "sectionId": 3, /* … */ }
}

// 201 Response
{ "studentId": 42, "enrollmentId": 88 }

// 409 Response — duplicate doc, or year already has enrollment
{ "code": "DUPLICATE_DOCUMENT" | "YEAR_ALREADY_ENROLLED", "message": "..." }
```

### `POST /students/:id/reenroll`
```jsonc
// Request: enrollment payload only
{ "schoolYearId": 2, "gradeOfferingId": 14, "sectionId": 5, /* … */ }
// 201: { "enrollmentId": 91 }
// 409 if (studentId, schoolYearId) already exists
```

### `GET /students/:id/eligible-school-years`
Returns school years that are **open for enrollment** AND the student has **no enrollment for**. Drives Reenroll button state. Empty array → button disabled.

```jsonc
[ { "id": 2, "name": "2026", "gradeOfferingsAvailable": true } ]
```

The backend owns the eligibility rule (year is open, student has no row in `enrollments` for that year, status not blocked). Frontend never recomputes it.

---

## 3. Frontend Components

### `<EnrollmentDialog>` — single shared component
Lives at `src/presentation/components/EnrollmentDialog.tsx`. Renders the enrollment form fields inside a MUI `<Dialog>` using react-hook-form (or React Admin's `useForm` from a nested `<SimpleForm>` with `record={{}}`). Props:

```ts
type Props =
  | { mode: "create"; studentDraft: StudentFormValues; onClose: () => void; }
  | { mode: "reenroll"; studentId: number; eligibleYears: SchoolYear[]; onClose: () => void; };
```

The dialog handles its own submit: it calls the right endpoint via `useDataProvider().create("students/enroll", …)` or `dataProvider.create("students/<id>/reenroll", …)`.

### Create flow — `StudentEnrollPage` (custom route, NOT `<Create>`)

- Mounted at `/students/create` as a `<CustomRoute>`.
- Renders the same `TabbedForm` layout as today, **but wrapped in a plain `<Form>`** (react-hook-form's `FormProvider` from `ra-core`), not in `<Create>`.
- Toolbar contains **only `<EnrollButton>`** (no Save).
- `EnrollButton` triggers `form.trigger()` (validate all fields). If invalid → focus offending tab. If valid → open `<EnrollmentDialog mode="create" studentDraft={form.getValues()} />`.
- The dialog's submit is what actually persists. On 201 → `notify("...")` + `redirect("edit","students",studentId)`.

This is why we don't use `<Create>`: React Admin's `<Create>` assumes one POST to `students`. We need the POST to be a composite, fired from the dialog, with the student data still living in the parent form's state.

### Reenroll flow — `<ReenrollButton>` in the List

- Place it in `<StudentsList>` as a row action (and optionally on `StudentEdit`'s toolbar).
- Uses `useGetOne("students/<id>/eligible-school-years", …)` (or a custom `useQuery`) on hover/mount of the row's action menu.
- Disabled when `eligibleYears.length === 0`. Tooltip: "No hay años abiertos para rematrícula."
- On click → `<EnrollmentDialog mode="reenroll" studentId={…} eligibleYears={…} />`. The school-year `<SelectInput>` inside the dialog is **constrained to `eligibleYears`** (passed as `choices` prop) — so the user can never pick an ineligible year, even if the backend list races.
- On 201 → `refresh()` the list.

To avoid N requests on the list: expose a list field `hasEligibleYears: boolean` (or `eligibleYearsCount`) on `GET /students` so the row can render the button enabled/disabled without a per-row fetch. Use the per-student endpoint only when the dialog opens, to populate the `<SelectInput>`.

---

## 4. dataProvider wiring

The default `simpleRestProvider` only knows generic CRUD. Wrap it:

```ts
// src/infrastructure/services/dataProvider.ts
const base = simpleRestProvider("/api");
export const dataProvider = {
  ...base,
  enrollStudent: (payload) => httpClient.post("/students/enroll", payload),
  reenrollStudent: (id, payload) => httpClient.post(`/students/${id}/reenroll`, payload),
  getEligibleYears: (id) => httpClient.get(`/students/${id}/eligible-school-years`),
};
```

Custom hooks (`useEnrollStudent`, `useReenrollStudent`, `useEligibleYears`) wrap these and integrate with React Admin's notification/redirect helpers. Everything else (genders, document-types, grade-offerings inside the dialog) keeps using stock `<ReferenceInput>`.

---

## 5. What this buys you

- **Invariant enforced by construction**: the only POST that creates a student also creates an enrollment. No "orphan student" state is reachable from the UI or the API.
- **One enrollment form** reused for create and reenroll — same component, two modes.
- **Reenroll eligibility lives on the backend**; frontend just renders what it's told.
- **React Admin used where it shines** (list, edit, references, dataProvider, notifications) and bypassed where it doesn't fit (the composite create).
