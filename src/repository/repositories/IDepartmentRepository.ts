import { DepartmentData } from "../../infrastructure/dtos/departmentData";

export interface IDepartmentRepository {
    getAll(filter?: any): Promise<DepartmentData[]>;
}
