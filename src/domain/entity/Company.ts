export default class Company {
  constructor(
    readonly id: string,
    readonly name: string
  ) {}

  static create(name: string) {
    const id = crypto.randomUUID();
    return new Company(id, name);
  }
}
