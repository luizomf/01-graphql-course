exports.up = async function (knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.text('comment').notNullable();
    table.string('post_id', 255).notNullable();
    table.string('user_id', 255).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('comments');
};
