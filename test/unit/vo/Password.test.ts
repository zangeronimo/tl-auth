import { Msg } from '../../../src/application/Msg';
import { PasswordPlain } from '../../../src/domain/vo/Password';

describe('Password tests', () => {
  const failCases = [
    { password: 'p@ssword' },
    { password: 'Password' },
    { password: '123' },
    { password: '123456@a' },
  ];
  test.each(failCases)(
    'validate not create password "$password"',
    ({ password }) => {
      expect(() => new PasswordPlain(password)).toThrow(
        Msg.INVALID_PASSWORD_FORMAT
      );
    }
  );

  const successCases = [
    { password: 'P@ssword' },
    { password: 'Password!' },
    { password: '123456@A' },
  ];
  it.each(successCases)(
    'validate create password $password',
    ({ password }) => {
      const pass = new PasswordPlain(password);
      expect(pass.value).toBe(password);
    }
  );
});
