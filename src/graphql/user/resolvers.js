const users = () => {
  return [
    {
      id: '1',
      userName: 'Luiz 1',
    },
    {
      id: '2',
      userName: 'Luiz 2',
    },
    {
      id: '3',
      userName: 'Luiz 3',
    },
  ];
};

const user = () => {
  return {
    id: '1',
    userName: 'Luiz',
  };
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
