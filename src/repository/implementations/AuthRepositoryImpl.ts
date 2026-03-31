import type { IAuthRepository } from '../repositories/IAuthRepository';
import { User } from '../../domain/entities/User';
import { AuthAPI } from '../../infrastructure/services/AuthAPI';

export class AuthRepositoryImpl implements IAuthRepository {
  private authAPI: AuthAPI;

  constructor(authAPI : AuthAPI) {
    this.authAPI = authAPI;
  }

  async login(email: string, password: string): Promise<User | null> {
    // Call API layer
    const userData = await this.authAPI.login(email, password);
    if(!userData)
      return null;
    const user : User = User.create(
      userData.id, 
      userData.name, 
      userData.email, 
      userData.password, 
      userData.role
    );
    console.log(user);
    return user;
  }
}