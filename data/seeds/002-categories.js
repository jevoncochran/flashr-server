/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return knex("categories").insert([
    { title: "Spanish/Colombian Spanish", userId: 1 },
    { title: "Programming", userId: 1 },
    { title: "French", userId: 1 },
    { title: "Spanish", userId: 2 },
    { title: "Portuguese", userId: 1 },
    { title: "Haitian Creole", userId: 1 },
  ]);
};
