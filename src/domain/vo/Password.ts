import { Msg } from '../../application/Msg';

export default interface Password {
  value: string;
  verify(password: string): boolean;
}

export class PasswordPlain implements Password {
  value: string;

  constructor(password: string) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(Msg.INVALID_PASSWORD_FORMAT);
    }
    this.value = password;
  }

  verify(password: string): boolean {
    return this.value === password;
  }
}
