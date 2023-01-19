const db = require("../data/dbConfig");

const createUser = (user) => {
  return db("users")
    .insert(user, "id")
    .then((ids) => {
      const [id] = ids;
      return findUserBy(id);
    });
};

const findUserBy = (filter) => {
  return db("users").where(filter).first();
};

module.exports = { createUser, findUserBy };
