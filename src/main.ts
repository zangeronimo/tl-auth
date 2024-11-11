import TokenController from './infra/controller/TokenController';
import { ExpressAdapter } from './infra/provider/HttpServer';
import JsonWebToken from './infra/provider/JsonWebToken';
import InMemoryRepository from './infra/repository/InMemoryRepository';

const httpServer = new ExpressAdapter();

const authRepository = new InMemoryRepository();
const tokenProvider = new JsonWebToken({
  expiresIn: '1h',
  secretKey: 'my-secret-key',
});

new TokenController(httpServer, authRepository, tokenProvider);

httpServer.listen(4001);
