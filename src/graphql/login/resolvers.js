export const login = async (_, { data }, { dataSources }) => {
  const { userName, password } = data;
  return dataSources.loginApi.login(userName, password);
};

export const loginResolvers = {
  Mutation: { login },
};
