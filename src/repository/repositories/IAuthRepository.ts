import { DSession } from "../../domain/entities/DSession";

export interface IAuthRepository {
  login(email: string, password: string): Promise<DSession>;
}
