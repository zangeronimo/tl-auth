import AuthRepository from '../../application/repository/AuthRepository';
import Company from '../../domain/entity/Company';
import User from '../../domain/entity/User';

export default class InMemoryRepository implements AuthRepository {
  private companies: Company[];
  private users: User[];
  constructor() {
    this.companies = [new Company('valid-company', 'company-name')];
    this.users = [
      new User(
        'valid-user',
        'user-name',
        'valid-username',
        'P@ssword',
        'valid-company'
      ),
    ];
  }
  getUserByLogin(username: string, companyId: string) {
    return this.users.find(
      (user) => user.username === username && user.companyId === companyId
    );
  }
  getCompanyById(companyId: string): Company | undefined {
    return this.companies.find((company) => company.id === companyId);
  }
}
