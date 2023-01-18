const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return knex("users").insert([
    {
      firstName: "Jevon",
      lastName: "Cochran",
      email: "jevon.cochran@gmail.com",
      password: bcrypt.hashSync("cochran", 8),
    },
    {
      firstName: "LaTasha",
      lastName: "Pollard",
      email: "latasha.pollard@gmail.com",
      password: bcrypt.hashSync("pollard", 8),
    },
  ]);
};
