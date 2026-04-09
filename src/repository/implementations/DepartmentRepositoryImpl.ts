import { dataProvider } from "../../ra/dataProvider";
import { DepartmentData } from "../../infrastructure/dtos/departmentData";
import { IDepartmentRepository } from "../repositories/IDepartmentRepository";

export class DepartmentRepositoryImpl implements IDepartmentRepository {
    async getAll(filter : any = {}): Promise<DepartmentData[]> {
        const { data } = await dataProvider.getList<DepartmentData>("departments", {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: "name", order: "ASC" },
            filter: filter,
        });
        return data;
    }
}
