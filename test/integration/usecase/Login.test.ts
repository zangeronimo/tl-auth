import { Msg } from '../../../src/application/Msg';
import TokenProvider from '../../../src/application/provider/TokenProvider';
import Login from '../../../src/application/usecase/Login';
import JsonWebToken from '../../../src/infra/provider/JsonWebToken';
import InMemoryRepository from '../../../src/infra/repository/InMemoryRepository';

describe('Login tests', () => {
  function makeLogin(
    tokenProvider: TokenProvider = new JsonWebToken({
      expiresIn: '1h',
      secretKey: 'my-secret-key',
    })
  ) {
    const authRepository = new InMemoryRepository();
    return new Login(authRepository, tokenProvider);
  }
  it('should not be able to generate a token without a valid company', () => {
    const authentication = makeLogin();
    const payload = {
      username: 'valid-username',
      password: 'P@ssword',
      company: 'invalid-company',
    };
    expect(() => authentication.execute(payload)).toThrow(Msg.INVALID_COMPANY);
  });
  it('should not be able to generate a token without a valid username', () => {
    const authentication = makeLogin();
    const payload = {
      username: 'invalid-username',
      password: 'P@ssword',
      company: 'valid-company',
    };
    expect(() => authentication.execute(payload)).toThrow(
      Msg.INVALID_AUTHENTICATION
    );
  });
  it('should not be able to generate a token without a valid password', () => {
    const authentication = makeLogin();
    const payload = {
      username: 'valid-username',
      password: 'valid-password',
      company: 'valid-company',
    };
    expect(() => authentication.execute(payload)).toThrow(
      Msg.INVALID_AUTHENTICATION
    );
  });
  it('should generate a token and validate', () => {
    const tokenProvider = new JsonWebToken({
      expiresIn: '1h',
      secretKey: 'my-secret-key',
    });
    const authentication = makeLogin(tokenProvider);
    const payload = {
      username: 'valid-username',
      password: 'P@ssword',
      company: 'valid-company',
    };
    const token = authentication.execute(payload);
    expect(token).toBeTruthy();
    const decoded = tokenProvider.validate(token!);
    expect(decoded).toBeTruthy();
    expect(decoded.company).toBe(payload.company);
  });
});
