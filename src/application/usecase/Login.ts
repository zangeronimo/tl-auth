import { Msg } from '../Msg';
import TokenProvider, { Payload } from '../provider/TokenProvider';
import AuthRepository from '../repository/AuthRepository';

export default class Login {
  constructor(
    readonly authRepository: AuthRepository,
    readonly tokenProvider: TokenProvider
  ) {}

  execute(props: Input) {
    const company = this.authRepository.getCompanyById(props.company);
    if (!company) throw new Error(Msg.INVALID_COMPANY);
    const user = this.authRepository.getUserByLogin(
      props.username,
      props.company
    );
    if (!user) throw new Error(Msg.INVALID_AUTHENTICATION);
    if (!user.verifyPassword(props.password)) {
      throw new Error(Msg.INVALID_AUTHENTICATION);
    }
    const payload: Payload = {
      userId: user.id,
      name: user.name,
      company: user.companyId,
    };
    return this.tokenProvider.generate(payload);
  }
}

type Input = {
  username: string;
  password: string;
  company: string;
};
