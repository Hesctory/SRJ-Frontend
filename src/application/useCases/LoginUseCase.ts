import type { IAuthRepository } from "../../repository/repositories/IAuthRepository";
import { User } from "../../domain/entities/User";
import { AuthCredentials } from "../../domain/valueObjects/AuthCredentials";

export class LoginUseCase {
  private authRepository: IAuthRepository;
  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(email: string, password: string): Promise<User> {
    if (!AuthCredentials.validateEmail(email)) {
      console.log("Email is invalid");
    }
    const authCredentials: AuthCredentials = AuthCredentials.create(
      email,
      password,
    );
    // Delegate to repository
    try {
      const session = await this.authRepository.login(
        authCredentials.credentials.email,
        authCredentials.credentials.password,
      );
      localStorage.setItem("user", JSON.stringify(session.getUser()));
      localStorage.setItem("token", session.getToken());
      return session.getUser();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Login failed");
    }
  }
}
