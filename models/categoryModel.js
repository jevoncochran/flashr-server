const db = require("../data/dbConfig");

const getCategories = (userId) => {
  return db("categories").select("id", "title").where({ userId });
};

const createCategory = (category) => {
  return db("categories")
    .insert(category, "id")
    .then((ids) => {
      const [id] = ids;
      return findCategoryBy(id);
    });
};

const findCategoryBy = (filter) => {
  return db("categories").where(filter).first();
};

module.exports = { getCategories, findCategoryBy, createCategory };
