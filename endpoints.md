# API Endpoints Reference

Base URLs:
- **Main API**: `http://localhost:4000/api`
- **JSON Server (testing only)**: `http://localhost:3000`

Authentication: `Authorization: Bearer <token>` header on all protected endpoints.

---

## Authentication

### `POST /api/login`

**Request**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response**
```json
{
  "success": "boolean",
  "token": "string",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "phone": "string",
    "roles": ["string"]
  },
  "error": "string | null"
}
```

---

## Reports

These are handled by custom logic in `dataProvider.ts`, not standard CRUD.

### `GET /api/students/report`

Resource name: `students-enrolled-report`

**Query filters**: `schoolyearId`, `levelId`, `gradeId`, `shiftId`, `sectionId`

**Response item**
```json
{
  "id": "number",
  "dni": "string",
  "fullName": "string",
  "year": "string",
  "level": "string",
  "grade": "string",
  "shift": "string",
  "section": "string"
}
```

### `GET /api/students/registration-card`

Resource name: `students-registration-card-report`

**Query filters**: `schoolYearId`, `levelId`, `gradeId`, `shiftId`, `sectionId`, `studentIds`

Response shape mirrors the full student registration card data (same as the `students` entity plus enrollment context).

---

## Students

`GET /api/students` · `POST /api/students`
`GET /api/students/:id` · `PUT /api/students/:id` · `DELETE /api/students/:id`

**Filters**: none (standard pagination)

```json
{
  "id": "number",
  "names": "string",
  "paternalLastname": "string",
  "maternalLastname": "string",
  "fullName": "string",
  "dni": "string",
  "studentCode": "string",
  "genderId": "number",
  "documentTypeId": "number",
  "idDocumentNumber": "string",
  "ethnicSelfIdentificationId": "number | undefined",
  "nativeLanguageId": "number",
  "secondLanguageIds": ["number"],
  "religionId": "number | undefined",
  "civilStateId": "number | undefined",
  "siblings": "number | undefined",
  "cellPhone": "string | undefined",
  "landlinePhone": "string | undefined",
  "email": "string | undefined",
  "birthDate": "string (ISO date)",
  "childbirthTypeId": "number | undefined",
  "birthLocation": {
    "departmentId": "number",
    "provinceId": "number",
    "districtId": "number"
  },
  "address": "string",
  "addressLocation": {
    "departmentId": "number",
    "provinceId": "number",
    "districtId": "number"
  },
  "hasElectronicDevices": "boolean",
  "hasInternetAccess": "boolean",
  "hasDisability": "boolean",
  "hasDisabilityCertificate": "boolean",
  "disabilityTypeId": "number | undefined",
  "disabilityDegreeId": "number | undefined",
  "disabilityCertificateNumber": "string | undefined",
  "familiars": ["FamiliarData"]
}
```

**FamiliarData** (nested array, not a separate endpoint)
```json
{
  "names": "string",
  "paternalLastname": "string",
  "maternalLastname": "string",
  "genderId": "number",
  "birthDate": "string (ISO date)",
  "documentTypeId": "number",
  "idDocumentNumber": "string",
  "nativeLanguageId": "number",
  "secondLanguageIds": ["number"],
  "ethnicSelfIdentificationId": "number | undefined",
  "civilStateId": "number | undefined",
  "religionId": "number | undefined",
  "levelOfEducationId": "number",
  "occupation": "string | undefined",
  "workCenter": "string | undefined",
  "relationshipId": "number",
  "address": "string",
  "addressLocation": {
    "departmentId": "number",
    "provinceId": "number",
    "districtId": "number"
  },
  "lives": "boolean",
  "livesWithStudent": "boolean",
  "isGuardian": "boolean",
  "landlinePhone": "string | undefined",
  "cellPhone": "string | undefined",
  "email": "string | undefined"
}
```

---

## Enrollments

`GET /api/enrollments` · `POST /api/enrollments`
`GET /api/enrollments/:id` · `PUT /api/enrollments/:id` · `DELETE /api/enrollments/:id`

**Filters**: `studentId`

```json
{
  "id": "number",
  "studentId": "number",
  "schoolYearId": "number",
  "levelId": "number",
  "gradeId": "number",
  "shiftId": "number",
  "sectionId": "number",
  "schoolFeeConceptId": "number",
  "previousSchool": "string | undefined",
  "stateName": "string (Activa | Cancelada | Retirada)",
  "year": "string | number | undefined",
  "level": "string | undefined",
  "grade": "string | undefined",
  "shift": "string | undefined",
  "section": "string | undefined",
  "state": "string | undefined"
}
```

> `year`, `level`, `grade`, `shift`, `section` are denormalized display fields returned by the server — not sent on create/update.

---

## Enrollment Debts

`GET /api/enrollment-debts` · `GET /api/enrollment-debts/:id`

**Filters**: `enrollmentId`

```json
{
  "id": "number",
  "enrollmentId": "number",
  "description": "string",
  "totalAmount": "number",
  "paidAmount": "number",
  "dueDate": "string (ISO date)",
  "status": "pending | partially_paid | overdue | paid | cancelled"
}
```

---

## Debt Installments

`GET /api/debt-installments` · `GET /api/debt-installments/:id`

**Filters**: `debtId`

```json
{
  "id": "number",
  "debtId": "number",
  "amount": "number",
  "date": "string (ISO date)",
  "paymentMethodName": "string",
  "reference": "string | undefined"
}
```

---

## Payment Methods

`GET /api/payment-methods`

```json
{ "id": "number", "name": "string" }
```

---

## Payment Preview

`POST /api/payment-preview`

**Request**
```json
{
  "enrollmentId": "number",
  "enrollmentDebtId": "number | undefined",
  "amount": "number",
  "paymentMethodId": "number",
  "date": "string (ISO date)"
}
```
`enrollmentDebtId` is omitted for Pago rápido (no specific debt).

**Response**
```json
{
  "previewToken": "string",
  "paymentPlan": {
    "lines": [
      { "debtId": "number", "description": "string", "allocated": "number", "remaining": "number" }
    ],
    "totalAllocated": "number",
    "change": "number"
  }
}
```

---

## Payments

`POST /api/payments`

**Request**
```json
{
  "enrollmentId": "number",
  "enrollmentDebtId": "number | undefined",
  "amount": "number",
  "paymentMethodId": "number",
  "date": "string (ISO date)",
  "previewToken": "string"
}
```

**Response**
```json
{
  "id": "number",
  "paymentPlan": { "...same shape as payment preview..." }
}
```

---

## Staff

`GET /api/staff` · `POST /api/staff`
`GET /api/staff/:id` · `PUT /api/staff/:id` · `DELETE /api/staff/:id`

```json
{
  "id": "number",
  "staffCode": "string",
  "names": "string",
  "paternalLastName": "string",
  "maternalLastName": "string",
  "positionId": "number | undefined",
  "areaId": "number | undefined"
}
```

---

## Academic Structure

### School Years

`GET /api/school-years` · `POST /api/school-years`
`GET /api/school-years/:id` · `PUT /api/school-years/:id` · `DELETE /api/school-years/:id`

```json
{
  "id": "number",
  "year": "string | number",
  "startDate": "string (ISO date)",
  "endDate": "string (ISO date)",
  "isActive": "boolean"
}
```

### Levels

`GET /api/levels` · `POST /api/levels`
`GET /api/levels/:id` · `PUT /api/levels/:id` · `DELETE /api/levels/:id`

```json
{
  "id": "number",
  "name": "string",
  "orderIndex": "number",
  "level": "string | undefined"
}
```

### Grades

`GET /api/grades` · `POST /api/grades`
`GET /api/grades/:id` · `PUT /api/grades/:id` · `DELETE /api/grades/:id`

**Filters**: `levelId`

```json
{
  "id": "number",
  "name": "string",
  "grade": "string",
  "year": "number | undefined",
  "levelId": "number"
}
```

### Shifts

`GET /api/shifts` · `POST /api/shifts`
`GET /api/shifts/:id` · `PUT /api/shifts/:id` · `DELETE /api/shifts/:id`

**Filters**: `gradeId`

```json
{
  "id": "number",
  "name": "string"
}
```

### Sections

`GET /api/sections` · `POST /api/sections`
`GET /api/sections/:id` · `PUT /api/sections/:id` · `DELETE /api/sections/:id`

**Filters**: `gradeId`, `shiftId`

```json
{
  "id": "number",
  "gradeId": "number",
  "section": "string (A | B | C | D)"
}
```

### Grade Offerings

`GET /api/grade-offerings` · `POST /api/grade-offerings`
`GET /api/grade-offerings/:id` · `PUT /api/grade-offerings/:id` · `DELETE /api/grade-offerings/:id`

**Filters**: `schoolYearId`

```json
{
  "id": "number",
  "schoolYearId": "number",
  "gradeId": "number",
  "shiftId": "number",
  "sections": "number"
}
```

### Classrooms

`GET /api/classrooms` · `POST /api/classrooms`
`GET /api/classrooms/:id` · `PUT /api/classrooms/:id` · `DELETE /api/classrooms/:id`

```json
{
  "id": "number",
  "name": "string",
  "capacity": "number"
}
```

---

## Economic Management

### Costs

`GET /api/costs` · `POST /api/costs`
`GET /api/costs/:id` · `PUT /api/costs/:id` · `DELETE /api/costs/:id`

```json
{
  "id": "number",
  "levelId": "number",
  "shift": "string (shift name, not FK)",
  "inscription": "number",
  "enrollment": "number",
  "monthly": "number",
  "disscountTypeId": "number",
  "schoolYearId": "number"
}
```

> `shift` stores the shift name as a plain string instead of a foreign key — inconsistent with the rest of the schema.

### Accounting Plans

`GET /api/accounting-plans` · `POST /api/accounting-plans`
`GET /api/accounting-plans/:id` · `PUT /api/accounting-plans/:id` · `DELETE /api/accounting-plans/:id`

> Shape not formally typed. Needs a DTO.

---

## Lunchbox / Products

### Lunches

`GET /api/lunches` · `POST /api/lunches`
`GET /api/lunches/:id` · `PUT /api/lunches/:id` · `DELETE /api/lunches/:id`

```json
{
  "id": "number",
  "lunch": "string",
  "categoryId": "number"
}
```

### Lunch Categories

`GET /api/categories` · `POST /api/categories`
`GET /api/categories/:id` · `PUT /api/categories/:id` · `DELETE /api/categories/:id`

```json
{
  "id": "number",
  "category": "string"
}
```

---

## Institutions

`GET /api/institutions` · `POST /api/institutions`
`GET /api/institutions/:id` · `PUT /api/institutions/:id` · `DELETE /api/institutions/:id`

```json
{
  "id": "number",
  "name": "string",
  "ruc": "string",
  "rucStateId": "number"
}
```

---

## Publishers

`GET /api/publishers` · `POST /api/publishers`
`GET /api/publishers/:id` · `PUT /api/publishers/:id` · `DELETE /api/publishers/:id`

```json
{
  "id": "number",
  "description": "string"
}
```

---

## Work Organization

### Work Areas

`GET /api/work-areas` · `POST /api/work-areas`
`GET /api/work-areas/:id` · `PUT /api/work-areas/:id` · `DELETE /api/work-areas/:id`

```json
{
  "id": "number",
  "area": "string"
}
```

### Work Positions

`GET /api/work-positions` · `POST /api/work-positions`
`GET /api/work-positions/:id` · `PUT /api/work-positions/:id` · `DELETE /api/work-positions/:id`

```json
{
  "id": "number",
  "position": "string"
}
```

---

## Reference / Lookup Tables

Read-only resources used to populate select inputs. All follow `GET /api/{resource}`.

| Resource | Fields |
|---|---|
| `genders` | `id`, `name` |
| `document-types` | `id`, `name` |
| `ethnic-self-identifications` | `id`, `name` |
| `languages` | `id`, `name` |
| `religions` | `id`, `name` |
| `civil-states` | `id`, `name` |
| `childbirth-types` | `id`, `name` |
| `familiar-relationship-types` | `id`, `name` |
| `disability-types` | `id`, `type` |
| `disability-degrees` | `id`, `degree` |
| `level-of-educations` | `id`, `name` |
| `school-fee-concepts` | `id`, `name` |
| `ruc-states` | `id`, `name` |
| `products` | `id`, `name` |

### Location Cascade

| Resource | Fields | Filter |
|---|---|---|
| `departments` | `id`, `name`, `code` | — |
| `provinces` | `id`, `name`, `code`, `departmentId` | `departmentId` |
| `districts` | `id`, `name`, `code`, `provinceId` | `provinceId` |

---

## Known Issues

| Issue | Location |
|---|---|
| `costs.shift` stores a name string, not a FK | `GET /api/costs` |
| `levels` has both `name` and `level` fields (duplicate) | `GET /api/levels` |
| Report filter uses `schoolyearId` (lowercase y), rest use `schoolYearId` | `GET /api/students/report` |
| `enrollment-payments` has no TypeScript DTO | `src/ra/resources/economicManagement/enrollmentPayments/` |
| `accounting-plans` has no TypeScript DTO | `src/ra/resources/economicManagement/` |
