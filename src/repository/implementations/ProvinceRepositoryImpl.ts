import { dataProvider } from "../../ra/dataProvider";
import { ProvinceData } from "../../infrastructure/dtos/provinceData";
import { IProvinceRepository } from "../repositories/IProvinceRepository";

export class ProvinceRepositoryImpl implements IProvinceRepository {
  async getAll(filter: any = {}): Promise<ProvinceData[]> {
    const { data } = await dataProvider.getList<ProvinceData>("provinces", {
      pagination: { page: 1, perPage: 1000 },
      sort: { field: "name", order: "ASC" },
      filter,
    });
    return data;
  }
}
