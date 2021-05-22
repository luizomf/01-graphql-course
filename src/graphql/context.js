import jwt from 'jsonwebtoken';
import { UsersApi } from './user/datasources';

const authorizeUser = async (req) => {
  const { headers } = req;
  const { authorization } = headers;

  try {
    const [_bearer, token] = authorization.split(' ');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const userApi = new UsersApi();
    userApi.initialize({});
    const foundUser = await userApi.getUser(userId);

    if (foundUser.token !== token) return '';
    return userId;
  } catch (e) {
    // console.log(e);
    return '';
  }
};

export const context = async ({ req, res }) => {
  const loggedUserId = await authorizeUser(req);

  return {
    loggedUserId,
    res,
  };
};
