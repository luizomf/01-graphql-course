import DataLoader from 'dataloader';

export const makePostDataLoader = (getPosts) => {
  return new DataLoader(async (ids) => {
    const urlQuery = ids.join('&userId=');
    const posts = await getPosts('?userId=' + urlQuery);
    return ids.map((id) => {
      return posts.filter((post) => post.userId === id);
    });
  });
};
