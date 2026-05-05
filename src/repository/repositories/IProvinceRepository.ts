import { ProvinceData } from "../../infrastructure/dtos/provinceData";

export interface IProvinceRepository {
  getAll(filter?: any): Promise<ProvinceData[]>;
}
