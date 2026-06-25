// Configuration CRUD resources (registered in App). Sections and the legacy
// accounting-plans resource remain in ./resources but are intentionally not
// re-exported here, matching the app's prior registration.
export { SchoolYearsResource } from "./resources/school-years";
export { AccountingPlanResource } from "./resources/accounting-plan";
export { InstitutionsResource } from "./resources/institutions";
export { LevelsResource } from "./resources/levels";
export { GradesResource } from "./resources/grades";
export { GradeOfferingsResource } from "./resources/grade-offerings";
export { CostsResource } from "./resources/costs";
export { ClassroomsResource } from "./resources/classrooms";
export { WorkAreasResource } from "./resources/work-areas";
export { JobPositionsResource } from "./resources/job-positions";
