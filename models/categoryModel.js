const db = require("../data/dbConfig");

const getCategories = (userId) => {
  return db("categories").select("id", "title").where({ userId });
};

module.exports = { getCategories };
