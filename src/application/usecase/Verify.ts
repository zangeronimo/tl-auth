import TokenProvider from '../provider/TokenProvider';

export default class Verify {
  constructor(readonly tokenProvider: TokenProvider) {}

  execute(token: string) {
    return this.tokenProvider.validate(token);
  }
}
