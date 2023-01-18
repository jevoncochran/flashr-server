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
  ]);
};
