const db = require("../data/dbConfig");

const getCardsByCategory = (categoryId) => {
  return db("cards")
    .select("id", "front", "back", "archived")
    .where({ categoryId });
};

module.exports = { getCardsByCategory };
