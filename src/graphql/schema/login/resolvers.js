export const login = async (_, { data }, { dataSources }) => {
  const { userName, password } = data;
  return dataSources.loginApi.login(userName, password);
};

export const logout = async (_, { userName }, { dataSources }) => {
  return dataSources.loginApi.logout(userName);
};

export const loginResolvers = {
  Mutation: { login, logout },
};
