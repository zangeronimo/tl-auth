import crypto from 'crypto';

export interface TokenConfig {
  expiresIn?: string;
  secretKey?: string;
}

export default abstract class TokenProvider {
  expiresIn: string;
  secretKey: string;

  constructor(config: TokenConfig) {
    this.expiresIn = config.expiresIn ?? '1h';
    this.secretKey = crypto
      .createHash('md5')
      .update(config.secretKey ?? 'my-secret-key')
      .digest('hex');
  }

  abstract generate(payload: Payload): string;
  abstract validate(token: string): Payload;
}

export type Payload = {
  userId: string;
  name: string;
  company: string;
};
