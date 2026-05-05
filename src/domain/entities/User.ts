export class User {
  constructor(
    private id: number,
    private name: string,
    private email: string,
    private phone: string,
    private roles: string[],
  ) {}

  static create(
    id: number,
    name: string,
    email: string,
    phone: string,
    roles: string[],
  ): User {
    return new User(id, name, email, phone, roles);
  }

  static fromJSON(data: any): User {
    return new User(data.id, data.name, data.email, data.password, data.roles);
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

  getPhone(): string {
    return this.phone;
  }

  getRoles(): string[] {
    return this.roles;
  }
}
