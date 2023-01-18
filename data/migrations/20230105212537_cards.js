/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("cards", (tbl) => {
      tbl.increments();

      tbl.string("front", 100).notNullable();

      tbl.string("back", 100).notNullable();

      tbl
        .integer("categoryId")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("categories")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl.boolean("archived").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cards");
};
