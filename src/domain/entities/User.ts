export class User {

  constructor(
    private id: number,
    private name: string,
    private email: string,
    private password: string,
    private role: string,
  ) {
  }

  static create(
    id: number, 
    name: string,
    email: string,
    password: string,
    role: string
  ): User {
    return new User(id, name, email, password, role);
  }

  static fromJSON(data: any): User {
    return new User(
      data.id, 
      data.name,
      data.email,
      data.password,
      data.role 
    );
  }

  // Getters
  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): string {
    return this.role;
  }
}