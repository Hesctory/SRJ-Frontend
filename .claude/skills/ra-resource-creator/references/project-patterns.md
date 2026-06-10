# SRJ Project Patterns Reference

Load this file during Phase 2 (Research) before writing any code.

---

## 1. Reference Name Catalog

These are the exact strings to use in `reference=` props on `ReferenceInput`. Spelling matters — the backend routes must match exactly.

| `reference=` value | Notes | Canonical file |
|---|---|---|
| `lunch-categories` | Lunch categories | `src/ra/resources/lunches/lunch-categories/index.tsx` |
| `lunches` | Lunch items | `src/ra/resources/lunches/lunches/index.tsx` |
| `childbirth-types` | Birth type lookup | `src/ra/resources/students/management/StudentCreate.tsx` |
| `civil-states` | Marital status | `src/ra/resources/staff-members/StaffMembersEdit.tsx` |
| `departments` | Location — top level | `src/presentation/components/LocationFormSelector.tsx` |
| `disability-degrees` | Disability severity | `src/presentation/components/DisabilityForm.tsx` |
| `disability-types` | Type of disability | `src/presentation/components/DisabilityForm.tsx` |
| `districts` | Location — third level | `src/presentation/components/LocationFormSelector.tsx` |
| `document-types` | DNI, passport, etc. | `src/presentation/components/FamiliarForm.tsx` |
| `ethnic-self-identifications` | Ethnicity lookup | `src/presentation/components/FamiliarForm.tsx` |
| `familiar-relationship-types` | Guardian relationship | `src/presentation/components/MultipleFamiliarsForm.tsx` |
| `genders` | Gender lookup | `src/presentation/components/FamiliarForm.tsx` |
| `grades` | Academic grade | `src/presentation/components/AcademicFormSelector.tsx` |
| `institutions` | School institutions | `src/presentation/components/EmploymentContractFormInputs.tsx` |
| `job-positions` | Staff job position | `src/ra/resources/staff-members/StaffMembersCreate.tsx` |
| `languages` | Native/second language | `src/presentation/components/SecondLanguagesFormSelector.tsx` |
| `level-of-educations` | Education level ⚠️ | `src/presentation/components/FamiliarForm.tsx` |
| `levels` | Academic level (primary/secondary) | `src/presentation/components/AcademicFormSelector.tsx` |
| `provinces` | Location — second level | `src/presentation/components/LocationFormSelector.tsx` |
| `religions` | Religion lookup | `src/presentation/components/FamiliarForm.tsx` |
| `ruc-states` | Tax registration state | `src/ra/resources/configurations/institutions/InstitutionsEdit.tsx` |
| `school-fee-concepts` | Fee concept for enrollment | `src/presentation/components/EnrollmentFormInputs.tsx` |
| `school-years` | Academic year ⚠️ | `src/ra/resources/staff-members/StaffMembersCreate.tsx` |
| `sections` | Classroom section | `src/presentation/components/AcademicFormSelector.tsx` |
| `shifts` | Morning/afternoon shift | `src/presentation/components/AcademicFormSelector.tsx` |
| `work-areas` | Staff work area | `src/presentation/components/EmploymentContractFormInputs.tsx` |

> **⚠️ Common mistakes:**
> - `level-of-educations` — NOT `levels-of-education` (plural at the end, not the middle)
> - `school-years` — NOT `schoolYears` or `school-year`

---

## 2. Non-Default optionText

Most `SelectInput` inside a `ReferenceInput` display the `name` field by default. These resources use a **different** display field and require an explicit `optionText` prop:

| `reference=` | `optionText=` | Reason |
|---|---|---|
| `school-years` | `"year"` | Has a `year` number field, not `name` |
| `levels` | `"level"` | Has a `level` string field, not `name` |
| `sections` | `"section"` | Has a `section` string field, not `name` |
| `disability-types` | `"type"` | Has a `type` string field, not `name` |
| `disability-degrees` | `"degree"` | Has a `degree` string field, not `name` |

If you are using any of these references, the `SelectInput` must include the `optionText` prop or the dropdown will show empty labels.

---

## 3. Reusable Components

Check this table before building any selector or form group. If a component covers your use case, use it — never reimplement.

| Component | Path | What it handles | sourcePrefix support |
|---|---|---|---|
| `LocationFormSelector` | `src/presentation/components/LocationFormSelector.tsx` | Cascading dept → province → district selects. Required validation on all three. | ✅ Yes — pass `sourcePrefix="addressLocation"` etc. |
| `AcademicFormSelector` | `src/presentation/components/AcademicFormSelector.tsx` | Cascading school-year → level → grade → shift → section. Clears downstream fields on change. | ✅ Yes — pass `sourcePrefix="enrollment"` etc. |
| `EnrollmentFormInputs` | `src/presentation/components/EnrollmentFormInputs.tsx` | Full enrollment form: AcademicFormSelector + schoolFeeConceptId + previousSchool | ✅ Yes |
| `FamiliarForm` | `src/presentation/components/FamiliarForm.tsx` | Complete guardian/familiar data form including location, education, relationship, contact | ✅ Yes |
| `MultipleFamiliarsForm` | `src/presentation/components/MultipleFamiliarsForm.tsx` | Dynamic array of FamiliarForm items with add/remove | ❌ No prefix — manages its own array |
| `DisabilityForm` | `src/presentation/components/DisabilityForm.tsx` | Conditional disability type + degree + certificate inputs | ❌ No |
| `SecondLanguagesFormSelector` | `src/presentation/components/SecondLanguagesFormSelector.tsx` | Multi-select for secondary languages filtered against native language | ✅ Yes |
| `CRUDToolBar` | `src/ra/layout/CRUDToolBar.tsx` | Toolbar with Volver button + optional Save + optional Delete + children slot | — |

### CRUDToolBar usage patterns

```tsx
// Create — save only
<CRUDToolBar save />

// Edit — save + delete
<CRUDToolBar save delete />

// Edit — save + delete + extra action buttons in the middle
<CRUDToolBar save delete>
  <ViewEmploymentContractsButton />
</CRUDToolBar>

// Create — custom submit (no standard save button, custom child handles submission)
<CRUDToolBar>
  <ConfirmCreateButton />
</CRUDToolBar>
```
