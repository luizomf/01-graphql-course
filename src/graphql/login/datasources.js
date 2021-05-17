import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server-errors';

export class LoginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users/';
  }

  async login(userName, password) {
    const user = await this.get('', { userName }, { cacheOptions: { ttl: 0 } });
    const found = !!user.length;

    if (!found) {
      throw new AuthenticationError('User does not exist.');
    }

    const { passwordHash, id: userId } = user[0];
    const isPasswordValid = await this.checkUserPassword(
      password,
      passwordHash,
    );

    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid password.');
    }

    const token = this.createJwtToken({ userId });

    return {
      userId,
      token,
    };
  }

  checkUserPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  createJwtToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
  }
}
