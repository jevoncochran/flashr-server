const db = require("../data/dbConfig");

const getCategories = (userId) => {
  return db("categories").select("id", "title").where({ userId });
};

const getCategoryById = (id) => {
  return db("categories").where({ id }).first();
};

module.exports = { getCategories, getCategoryById };
