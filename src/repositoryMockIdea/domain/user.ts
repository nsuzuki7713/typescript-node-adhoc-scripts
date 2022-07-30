export class User {
  constructor(public id: string, public name: string, public email: string) {}

  changeName(name: string): User {
    return new User(this.id, name, this.email);
  }

  changeEmail(email: string): User {
    return new User(this.id, this.name, email);
  }
}
