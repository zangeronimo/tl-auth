import jwt, { TokenExpiredError } from 'jsonwebtoken';

import TokenProvider, {
  Payload,
  TokenConfig,
} from '../../application/provider/TokenProvider';
import { Msg } from '../../application/Msg';

export default class JsonWebToken extends TokenProvider {
  constructor(config: TokenConfig) {
    super(config);
  }

  generate(payload: Payload) {
    const token = jwt.sign(payload, this.secretKey, {
      expiresIn: this.expiresIn,
    });
    return token;
  }

  validate(token: string): Payload {
    try {
      const decoded = jwt.verify(token, this.secretKey) as Payload;
      return decoded;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new Error(Msg.EXPIRED_JSON_WEB_TOKEN);
      }
      throw new Error(Msg.INVALID_JSON_WEB_TOKEN);
    }
  }
}
