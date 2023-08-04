const db = require("../data/dbConfig");

const getCardsByCategory = (categoryId) => {
  return db("cards")
    .select("id", "front", "back", "archived")
    .where({ categoryId });
};

const findCardBy = (filter) => {
  return db("cards")
    .select("id", "front", "back", "archived")
    .where(filter)
    .first();
};

const updateCard = (changes, id) => {
  return db("cards")
    .where({ id })
    .update(changes)
    .then(() => {
      return findCardBy({ id });
    });
};

module.exports = { getCardsByCategory, updateCard };
