const db = require("../data/dbConfig");

const getCategories = (userId) => {
  return db("categories").where({ userId });
};

module.exports = { getCategories };
