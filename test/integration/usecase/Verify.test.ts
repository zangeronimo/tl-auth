import { Msg } from '../../../src/application/Msg';
import TokenProvider from '../../../src/application/provider/TokenProvider';
import Verify from '../../../src/application/usecase/Verify';
import JsonWebToken from '../../../src/infra/provider/JsonWebToken';

describe('Verify tests', () => {
  function makeVerify(
    tokenProvider: TokenProvider = new JsonWebToken({
      expiresIn: '1h',
      secretKey: 'my-secret-key',
    })
  ) {
    return new Verify(tokenProvider);
  }

  it('should not be able to validate an invalid token', () => {
    const verify = makeVerify();
    const token = 'invalid-token';
    expect(() => verify.execute(token)).toThrow(Msg.INVALID_JSON_WEB_TOKEN);
  });
  it('should not be able to validate an expired token', async () => {
    const tokenProvider = new JsonWebToken({
      expiresIn: '1s',
      secretKey: 'my-secret-key',
    });
    const token = tokenProvider.generate({
      company: 'company',
      name: 'name',
      userId: 'id',
    });

    const verify = makeVerify();
    await wait(2000);
    expect(() => verify.execute(token)).toThrow(Msg.EXPIRED_JSON_WEB_TOKEN);
  });

  it('should be able to validate a valid token', () => {
    const tokenProvider = new JsonWebToken({
      expiresIn: '1h',
      secretKey: 'my-secret-key',
    });
    const token = tokenProvider.generate({
      company: 'company',
      name: 'name',
      userId: 'id',
    });

    const verify = makeVerify();
    const verifiedToken = verify.execute(token);
    expect(verifiedToken.name).toBe('name');
  });
});
