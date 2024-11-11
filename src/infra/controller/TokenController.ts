import TokenProvider from '../../application/provider/TokenProvider';
import AuthRepository from '../../application/repository/AuthRepository';
import Login from '../../application/usecase/Login';
import HttpServer from '../provider/HttpServer';

export default class TokenController {
  constructor(
    readonly server: HttpServer,
    readonly authRepository: AuthRepository,
    readonly tokenProvider: TokenProvider
  ) {
    server.register(
      'post',
      '/login',
      (
        params: unknown,
        body: { username: string; password: string; company: string }
      ) => {
        const login = new Login(authRepository, tokenProvider);
        return {
          token: login.execute({
            username: body.username,
            password: body.password,
            company: body.company,
          }),
        };
      }
    );
  }
}
