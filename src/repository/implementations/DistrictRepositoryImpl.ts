import { dataProvider } from "../../ra/dataProvider";
import { DistrictData } from "../../infrastructure/dtos/districtData";
import { IDistrictRepository } from "../repositories/IDistrictRepository";

export class DistrictRepositoryImpl implements IDistrictRepository {
    async getAll(filter: any = {}): Promise<DistrictData[]> {
        const { data } = await dataProvider.getList<DistrictData>("districts", {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: "name", order: "ASC" },
            filter,
        });
        return data;
    }
}
