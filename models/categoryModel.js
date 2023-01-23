const db = require("../data/dbConfig");

const getCategories = (userId) => {
  return db("categories").select("id", "title").where({ userId });
};

const getCategoryById = (id) => {
  return db("categories").where({ id }).first();
};

const createCategory = (category) => {
  return db("categories")
    .insert(category, "id")
    .then((ids) => {
      const [id] = ids;
      return getCategoryById(id);
    });
};

module.exports = { getCategories, getCategoryById, createCategory };
