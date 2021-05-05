export const getUsers = (fetch) => (path = '/') => {
  return fetch(process.env.API_URL + '/users' + path);
};
