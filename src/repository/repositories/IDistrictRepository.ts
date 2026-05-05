import { DistrictData } from "../../infrastructure/dtos/districtData";

export interface IDistrictRepository {
  getAll(filter?: any): Promise<DistrictData[]>;
}
