import Login from './application/usecase/Login';
import { ExpressAdapter } from './infra/provider/HttpServer';
import JsonWebToken from './infra/provider/JsonWebToken';
import InMemoryRepository from './infra/repository/InMemoryRepository';

const httpServer = new ExpressAdapter();

httpServer.register(
  'post',
  '/login',
  (
    params: unknown,
    body: { username: string; password: string; company: string }
  ) => {
    const authRepository = new InMemoryRepository();
    const tokenProvider = new JsonWebToken({
      expiresIn: '1h',
      secretKey: 'my-secret-key',
    });
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

httpServer.listen(3001);
