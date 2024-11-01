export class Msg {
  static INVALID_PASSWORD_FORMAT =
    'Password must be at least 8 characters long, contain at least 1 uppercase letter, and at least 1 special character.';
  static EXPIRED_JSON_WEB_TOKEN = 'Token has expired. Please login again.';
  static INVALID_JSON_WEB_TOKEN = 'Invalid token.';
  static INVALID_COMPANY =
    'Invalid or non-existent Company ID. Please check and try again.';
  static INVALID_AUTHENTICATION =
    'Invalid authentication. Please check and try again.';
}
