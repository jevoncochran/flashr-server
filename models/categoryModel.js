const db = require("../data/dbConfig");

const getCategories = (userId) => {
  return db("categories").select("id", "title").where({ userId });
};

const findCategoryBy = (filter) => {
  return db("categories").select("id", "title").where(filter).first();
};

const createCategory = (category) => {
  return db("categories")
    .insert(category, "id")
    .then((ids) => {
      const [id] = ids;
      return findCategoryBy(id);
    });
};

const updateCategory = (changes, id) => {
  return db("categories")
    .where({ id })
    .update(changes)
    .then(() => {
      return findCategoryBy({ id });
    });
};

const deleteCategory = (id) => {
  return db("categories").where({ id }).del();
};

module.exports = {
  getCategories,
  findCategoryBy,
  createCategory,
  updateCategory,
  deleteCategory,
};
