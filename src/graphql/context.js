import jwt from 'jsonwebtoken';

const authorizeUser = (req) => {
  const { headers } = req;
  const { authorization } = headers;

  try {
    const [_bearer, token] = authorization.split(' ');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  } catch (e) {
    return '';
  }
};

export const context = ({ req }) => {
  const loggedUserId = authorizeUser(req);

  return {
    loggedUserId,
  };
};
