export type Credentials = {
  email: string;
  password: string;
};

export class AuthCredentials {
  public credentials: Credentials;
  constructor(email: string, password: string) {
    this.credentials = { email, password };
  }

  static create(email: string, password: string) {
    if (this.isEmailEmpty(email)) throw new Error("Email Field is empty");
    if (this.isPasswordEmpty(password))
      throw new Error("Password Field is empty");
    if (!this.validateEmail(email)) throw new Error("Invalid Email Format");
    return new AuthCredentials(email, password);
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isPasswordEmpty(password: string): boolean {
    return password === "";
  }

  static isEmailEmpty(email: string): boolean {
    return email === "";
  }
}
