import type { IAuthRepository } from "../repositories/IAuthRepository";
import { User } from "../../domain/entities/User";
import { AuthAPI } from "../../infrastructure/services/AuthAPI";
import { LoginResponseData } from "../../infrastructure/dtos/LoginResponseData";
import { DSession } from "../../domain/entities/DSession";
import { userData } from "../../infrastructure/dtos/userData";

export class AuthRepositoryImpl implements IAuthRepository {
  private authAPI: AuthAPI;

  constructor(authAPI: AuthAPI) {
    this.authAPI = authAPI;
  }

  async login(email: string, password: string): Promise<DSession> {
    // Call API layer
    const data: LoginResponseData = await this.authAPI.login(email, password);
    if (!data.success || !data.user)
      throw new Error(data.error || "Login failed");

    const userdto: userData = data.user;

    const user: User = User.create(
      userdto.id,
      userdto.name,
      userdto.email,
      userdto.phone,
      userdto.roles,
    );

    const token = data.token;
    const session = DSession.create(user, token);
    return session;
  }
}
