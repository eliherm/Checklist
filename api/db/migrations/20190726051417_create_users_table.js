exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id');
      table.string('firstName').notNullable();
      table.string('lastName');
      table.string('userName').notNullable();
      table.string('email').notNullable();
      table.binary('password', 60).notNullable();
      table.timestamp('created_at', { precision: 6 }).notNullable().defaultTo(knex.fn.now(6));
      table.timestamp('updated_at', { precision: 6 }).notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)'));
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
