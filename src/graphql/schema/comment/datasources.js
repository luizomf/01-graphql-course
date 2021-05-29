import { ValidationError } from 'apollo-server-errors';
import { SQLDatasource } from '../../datasources/sql/sql-datasource';

export class CommentSQLDataSource extends SQLDatasource {
  async getById(id) {
    return this.db('comments').where('id', '=', id);
  }

  async create({ userId, postId, comment }) {
    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment,
    };

    const exists = await this.db('comments').where(partialComment);
    if (exists.length > 0) {
      throw new ValidationError('Comment already created');
    }

    const created = await this.db('comments').insert(partialComment);

    return {
      id: created[0],
      createAt: new Date().toISOString(),
      ...partialComment,
    };
  }
}
