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
/*
  static getExpiresAtFromToken(token: string): Date {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    if (!payload.exp) throw new Error("Token has no expiration claim");

    // exp is an absolute Unix timestamp in seconds
    return new Date(payload.exp * 1000);
  }
*/

  static getExpiresAtFromToken(token: string): Date | null {
    try {
      if (!token || typeof token !== "string") return null;

      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payloadBase64 = parts[1];

      // Normalizar base64 (importante para JWT)
      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');

      const payloadJson = atob(base64);
      const payload = JSON.parse(payloadJson);

      if (!payload.exp) return null;

      return new Date(payload.exp * 1000);
    } catch (e) {
      return null;
    }
  }
  
  getUser(): User {
    return this.user;
  }

  getToken(): string {
    return this.token;
  }
}