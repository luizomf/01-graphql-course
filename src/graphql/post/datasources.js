import { RESTDataSource } from 'apollo-datasource-rest';
import { makePostDataLoader } from './dataloaders';
import { createPostFn, updatePostFn } from './utils/post-repository';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/posts/';
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
  }

  async getPosts(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getPost(id) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }

  async createPost(postData) {
    return createPostFn(postData, this);
  }

  async updatePost(postId, postData) {
    return updatePostFn(postId, postData, this);
  }

  batchLoadByUserId(id) {
    return this.dataLoader.load(id);
  }
}
