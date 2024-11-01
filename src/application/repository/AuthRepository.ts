import Company from '../../domain/entity/Company';
import User from '../../domain/entity/User';

export default interface AuthRepository {
  getCompanyById(companyId: string): Company | undefined;
  getUserByLogin(username: string, companyId: string): User | undefined;
}
