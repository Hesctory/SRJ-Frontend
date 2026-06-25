# Student Registration Card Report — API Contract

## Endpoint

```
GET http://localhost:4000/api/students/registration-card
```

**Auth:** Bearer token from `localStorage` (`token` key).

---

## Query Parameters (Filters)

All parameters are optional strings. If omitted, the backend should return all matching records.

| Parameter     | Type             | Description                                              |
|---------------|------------------|----------------------------------------------------------|
| `schoolYearId`| `string` (ID)    | Filter by school year                                    |
| `levelId`     | `string` (ID)    | Filter by academic level                                 |
| `gradeId`     | `string` (ID)    | Filter by grade                                          |
| `shiftId`     | `string` (ID)    | Filter by shift (turno)                                  |
| `sectionId`   | `string` (ID)    | Filter by section                                        |
| `studentIds`  | `string` (CSV)   | Comma-separated list of student IDs for individual selection |

**Example URL:**

```
GET /api/students/registration-card?schoolYearId=3&levelId=1&gradeId=4&shiftId=2&sectionId=5
GET /api/students/registration-card?studentIds=12,45,78
```

---

## Expected JSON Response

The frontend accepts either:
- A **plain array**: `[ {...}, {...} ]`
- An **object with a `data` key**: `{ "data": [ {...}, {...} ] }`

### Top-level structure per student

```json
{
  "id": 1,
  "enrollmentCode": "2025-001",
  "enrollmentDate": "2025-03-01",
  "schoolYear": "2025",
  "level": "Primaria",
  "grade": "3°",
  "section": "A",
  "shift": "Mañana",
  "paternalLastName": "García",
  "maternalLastName": "López",
  "firstName": "Juan Carlos",
  "birthDate": "2015-06-15",
  "birthPlace": "Lima",
  "birthCountry": "Perú",
  "gender": "Masculino",
  "religion": "Católico",
  "dni": "12345678",
  "siblings": 2,
  "siblingPosition": 1,
  "disability": "Ninguna",
  "previousSchool": "I.E. San Pedro",
  "address": "Av. Los Álamos 123",
  "district": "Miraflores",
  "mother": { ... },
  "father": { ... },
  "guardian": { ... },
  "fees": { ... }
}
```

### `mother` / `father` object

```json
{
  "paternalLastName": "García",
  "maternalLastName": "Torres",
  "firstName": "María",
  "dni": "87654321",
  "phone": "987654321",
  "email": "maria@example.com",
  "educationLevel": "Superior",
  "occupation": "Docente",
  "maritalStatus": "Casada"
}
```

### `guardian` object

```json
{
  "relationship": "Tío",
  "paternalLastName": "García",
  "maternalLastName": "Ruiz",
  "firstName": "Pedro",
  "dni": "11223344",
  "phone": "912345678",
  "email": "pedro@example.com"
}
```

### `fees` object

```json
{
  "registrationFee": 150.00,
  "registrationDiscount": 0.00,
  "enrollmentFee": 300.00,
  "enrollmentDiscount": 50.00,
  "tuition": 250.00,
  "tuitionDiscount": 0.00
}
```

---

## Full TypeScript Types (from `RegistrationCardDocument.tsx`)

```typescript
type Parent = {
  paternalLastName?: string;
  maternalLastName?: string;
  firstName?: string;
  dni?: string;
  phone?: string;
  email?: string;
  educationLevel?: string;
  occupation?: string;
  maritalStatus?: string;
};

type Guardian = {
  relationship?: string;
  paternalLastName?: string;
  maternalLastName?: string;
  firstName?: string;
  dni?: string;
  phone?: string;
  email?: string;
};

type Fees = {
  registrationFee?: number;
  registrationDiscount?: number;
  enrollmentFee?: number;
  enrollmentDiscount?: number;
  tuition?: number;
  tuitionDiscount?: number;
};

type RegistrationCardStudent = {
  id: number;
  enrollmentCode?: string;
  enrollmentDate?: string;
  schoolYear?: string;
  level?: string;
  grade?: string;
  section?: string;
  shift?: string;
  paternalLastName?: string;
  maternalLastName?: string;
  firstName?: string;
  birthDate?: string;
  birthPlace?: string;
  birthCountry?: string;
  gender?: string;
  religion?: string;
  dni?: string;
  siblings?: string | number;
  siblingPosition?: string | number;
  disability?: string;
  previousSchool?: string;
  address?: string;
  district?: string;
  mother?: Parent;
  father?: Parent;
  guardian?: Guardian;
  fees?: Fees;
};
```

---

## Notes

- All fields are optional except `id`.
- `siblings` and `siblingPosition` can be either a number or a pre-formatted string.
- The frontend sends `pagination: { page: 1, perPage: 1000 }` — the backend can ignore pagination for this endpoint and return all matching records at once.
- The frontend sorts by `fullName ASC` in the request, but the actual sorting may be applied client-side; the backend does not need to enforce it.
- All monetary values in `fees` are expected as numbers (decimals allowed).
