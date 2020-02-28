exports.up = function (knex) {
  return knex.schema
    .createTable('tasks', (table) => {
      table.increments('id');
      table.string('description').notNullable();
      table.boolean('completed').notNullable().defaultTo(false);
      table.boolean('starred').notNullable().defaultTo(false);
      table.integer('userId').unsigned().notNullable();
      table.foreign('userId').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.timestamp('created_at', { precision: 6 }).notNullable().defaultTo(knex.fn.now(6));
      table.timestamp('updated_at', { precision: 6 }).notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)'));
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tasks');
};
