import axios from 'axios';

axios.defaults.validateStatus = function () {
  return true;
};

describe('API tests', () => {
  it.skip('should be able to make login', async () => {
    const inputLogin = {
      username: 'valid-username',
      password: 'P@ssword',
      company: 'valid-company',
    };
    const responseLogin = await axios.post(
      'http://localhost:3001/login',
      inputLogin
    );
    const outputLogin = responseLogin.data;
    expect(outputLogin.token).toBeDefined();
    expect(outputLogin.token).toBeTruthy();
    console.log(outputLogin.token);
  });
});
