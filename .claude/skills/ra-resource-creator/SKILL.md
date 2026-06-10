---
name: ra-resource-creator
description: Use when adding a new React Admin CRUD resource to the SRJ frontend. Given an API format document or field spec, generates TypeScript types, List component, Create form, Edit form, and App.tsx registration — all following the project's established patterns. Invoke whenever the user says "create resource", "new module", "add CRUD for X", shares an API format file, or asks to implement a new entity. Use this skill proactively any time a new backend entity needs a frontend representation.
---

# RA Resource Creator — SRJ Frontend

This skill produces a complete, correctly wired React Admin CRUD resource from an API spec. The most common mistakes (wrong `reference=` names, missing `optionText`, duplicating existing components) are prevented by a mandatory research phase before any code is written.

## Workflow

Work through these 7 phases in order. Do not skip the research phase.

### Phase 1 — Parse the spec

Read the API format document carefully. Extract:
- Required vs optional fields (mark clearly — required fields need `isRequired validate={required()}`)
- All foreign key fields (will need `ReferenceInput + SelectInput`)
- Nested object fields (will become dot-notation sources in the form)
- The list response shape (what the GET endpoint returns per item)
- Filter query params (become `TextInput` filters in the List)

### Phase 2 — Research (mandatory before writing any code)

This phase prevents the most common class of mistakes: guessing resource names or building components that already exist.

1. **Load `references/project-patterns.md`** — Cross-check every foreign key field against the reference name catalog. The correct spelling is what matters: `level-of-educations` not `levels-of-education`, `work-areas` not `work-positions`, etc.

2. **Check `optionText`** — For every `ReferenceInput` you plan to write, check the non-default `optionText` table. Most resources display `name`, but several don't (e.g., `school-years` displays `year`).

3. **Check for reusable components** — Before writing any cascading selector or location picker, check the reusable components table. `LocationFormSelector` handles dept→province→district, `AcademicFormSelector` handles the full academic cascade. Both support `sourcePrefix`. Using them is always correct; reimplementing is always wrong.

4. **Grep for any reference you're unsure about** — If a lookup resource isn't in the catalog, grep existing forms before inventing a name: `grep -r "reference=\"" src/`.

### Phase 3 — Generate types

Create `src/types/<entityName>.ts` (camelCase, singular). Include:
- A **CreateDTO** interface matching the POST body from the spec (required/optional correctly typed)
- A **ListDTO** interface matching what the GET list returns per item
- Any nested DTOs (e.g., a contract or location sub-object)

Follow the convention in `src/types/staffMember.ts` and `src/types/employmentContract.ts` for style.

### Phase 4 — Generate List

File: `src/ra/resources/<module>/<EntityName>List.tsx`

- Use `Datagrid` with `bulkActionButtons={false}`
- Columns come from the ListDTO fields
- Filters: one `TextInput` per filterable field from the spec, with `alwaysOn` for the primary ones and `debounce={500}` on the `<List>`
- Include `EditButton` as the last column

### Phase 5 — Generate Create

File: `src/ra/resources/<module>/<EntityName>Create.tsx`

Choose the form type based on the resource's complexity:
- **`SimpleForm`** — for simple, flat resources (handful of fields, no nested groups)
- **`TabbedForm`** — for resources with many fields or logical groupings

Regardless of form type:
- Toolbar: `<CRUDToolBar save />` — this gives the user a "Volver" back button and a SaveButton automatically. Always use it; never skip it.
- `redirect="list"` on the `<Create>` component
- `mutationMode="pessimistic"` on the `<Create>` component

Tab structure for `TabbedForm` follows the resource's own semantic grouping — there is no fixed template. Think about what makes sense for the specific entity.

### Phase 6 — Generate Edit

File: `src/ra/resources/<module>/<EntityName>Edit.tsx`

Structure is determined by what the resource needs. Some resources have the same tabs as Create; others differ. Let the entity's semantics guide the decision.

Toolbar always uses `CRUDToolBar` as the base:
- `save` prop — almost always needed
- `delete` prop — include unless the resource is non-deletable
- Extra action buttons (dialogs, navigation) go as `children` of `CRUDToolBar`

### Phase 7 — Register + verify

1. Add the resource index file (`src/ra/resources/<module>/index.tsx`) exporting a `<Resource>` component
2. Export it from `src/ra/resources/index.tsx`
3. Add it to `App.tsx`
4. If the resource is used only as a lookup (no CRUD pages needed), add `<Resource name="..." />` (no list/create/edit props) to `App.tsx`
5. Run `npm run type-check` — fix all errors before reporting done

## Universal constraints

- **Labels in Spanish** — every `label=` prop must be in Spanish
- **Required fields**: always pair `isRequired` with `validate={required()}` — one without the other is wrong
- **Horizontal groups**: `<Box display="flex" gap={2} width="100%">` wraps related fields side by side
- **Never invent a `reference=` name** — always look it up first
- **Never recreate a component that already exists** — check the reusable components table first

## Reference files

| Topic | File | Load when |
|---|---|---|
| Reference names, optionText, reusable components | `references/project-patterns.md` | Always — load at Phase 2 |
