const users = async (_, __, { getUsers }) => {
  const users = await getUsers();
  return users.json();
};

const user = async (_, { id, teste }, { getUsers }) => {
  console.log('TESTE', teste);
  const response = await getUsers('/' + id);
  const user = await response.json();
  return user;
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
