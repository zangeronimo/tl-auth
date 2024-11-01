import Password, { PasswordPlain } from '../vo/Password';

export default class User {
  private password: Password;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly username: string,
    password: string,
    readonly companyId: string
  ) {
    this.password = new PasswordPlain(password);
  }

  static create(
    name: string,
    username: string,
    password: string,
    companyId: string
  ) {
    const id = crypto.randomUUID();
    return new User(id, name, username, password, companyId);
  }

  getPassword() {
    return this.password.value;
  }

  verifyPassword(password: string): boolean {
    return this.password.verify(password);
  }
}
