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
      username: "jcochran",
      email: "jevon.cochran@gmail.com",
      password: bcrypt.hashSync("cochran", 8),
    },
    {
      firstName: "LaTasha",
      lastName: "Pollard",
      username: "ljpollard",
      email: "latasha.pollard@gmail.com",
      password: bcrypt.hashSync("pollard", 8),
    },
  ]);
};
