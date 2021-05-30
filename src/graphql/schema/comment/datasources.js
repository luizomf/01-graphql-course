import { ValidationError } from 'apollo-server-errors';
import { SQLDatasource } from '../../datasources/sql/sql-datasource';
import { CREATED_COMMENT_TRIGGER, pubSub } from './resolvers';

const commentReducer = (comment) => {
  return {
    id: comment.id,
    comment: comment.comment,
    user_id: comment.user_id,
    createdAt: new Date(comment.created_at).toISOString(),
  };
};

export class CommentSQLDataSource extends SQLDatasource {
  constructor(dbConnection) {
    super(dbConnection);
    this.tableName = 'comments';
  }

  async getById(id) {
    return this.db(this.tableName).where('id', '=', id);
  }

  async getByPostId(post_id) {
    const query = this.db(this.tableName).where({ post_id });
    const comments = await query;
    return comments.map((comment) => commentReducer(comment));
  }

  async create({ userId, postId, comment }) {
    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment,
    };

    const exists = await this.db(this.tableName).where(partialComment);
    if (exists.length > 0) {
      throw new ValidationError('Comment already created');
    }

    const created = await this.db(this.tableName).insert(partialComment);
    const commentToReturn = {
      id: created[0],
      createAt: new Date().toISOString(),
      ...partialComment,
    };

    pubSub.publish(CREATED_COMMENT_TRIGGER, {
      createdComment: commentToReturn,
    });

    return commentToReturn;
  }

  async batchLoaderCallback(post_ids) {
    const query = this.db(this.tableName).whereIn('post_id', post_ids);
    const comments = await query;
    const filteredComments = post_ids.map((post_id) => {
      return comments
        .filter((comment) => String(comment.post_id) === String(post_id))
        .map((comment) => commentReducer(comment));
    });
    return filteredComments;
  }
}
