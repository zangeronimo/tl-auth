import { Msg } from '../../../src/application/Msg';
import JsonWebToken from '../../../src/infra/provider/JsonWebToken';

describe('TokenProvider', () => {
  const makeSut = (expiresIn = '1h', secretKey = 'my-secret-key') => {
    return new JsonWebToken({ expiresIn, secretKey });
  };
  const payload = {
    userId: '123',
    name: 'John Doe',
    company: 'abc',
  };

  it('should be able to create a jwt', () => {
    const jsonWebToken = makeSut();
    const token = jsonWebToken.generate(payload);
    expect(token).toBeDefined();
  });

  it('should be able to create and validate a jwt', () => {
    const jsonWebToken = makeSut();
    const token = jsonWebToken.generate(payload);
    const decoded = jsonWebToken.validate(token);
    expect(decoded?.userId).toBe(payload.userId);
    expect(decoded?.name).toBe(payload.name);
    expect(decoded?.company).toBe(payload.company);
  });

  it('should receive an error if token has expired', () => {
    const jsonWebToken = makeSut('1s');
    const token = jsonWebToken.generate(payload);
    const timer = setTimeout(() => {
      expect(() => jsonWebToken.validate(token)).toThrow(
        Msg.EXPIRED_JSON_WEB_TOKEN
      );
    }, 3000);
    timer.unref();
  });

  it('should receive an error if token has another secretKey', () => {
    const jsonWebToken = makeSut();
    const token = jsonWebToken.generate(payload);
    const newJsonWebToken = makeSut('1h', 'other-secret-key');
    expect(() => newJsonWebToken.validate(token)).toThrow(
      Msg.INVALID_JSON_WEB_TOKEN
    );
  });
});
