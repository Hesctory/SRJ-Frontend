import { User } from "../../domain/entities/User";

export interface IAuthRepository {
  login(email: string, password: string): Promise<User | null>;
}