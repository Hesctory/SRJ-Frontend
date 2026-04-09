import { User } from "./User";

export class DSession {
  private constructor(
    private user: User,
    private token: string,
  ) {}

  static create(user: User, token: string): DSession {
    if (!token) 
        throw new Error("Invalid token");

    return new DSession(user, token);
  }

  static getExpiresAtFromToken(token: string): Date {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    if (!payload.exp) throw new Error("Token has no expiration claim");

    // exp is an absolute Unix timestamp in seconds
    return new Date(payload.exp * 1000);
  }

  getUser(): User {
    return this.user;
  }

  getToken(): string {
    return this.token;
  }
}