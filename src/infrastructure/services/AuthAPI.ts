import type { userData } from '../dtos/userData';


export class AuthAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000';
  }

  async login(email: string, password: string): Promise<userData > {
    try {
      const response = await fetch(`${this.baseUrl}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const users: userData[] = await response.json();
      console.log(users[0])
      return users[0];
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }
}