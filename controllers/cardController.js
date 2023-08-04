const Cards = require("../models/cardModel");

// @desc Update card
// @route PUT /api/categories/:categoryId/cards/:cardId
// @access Private
const updateCard = async (req, res) => {
  const { cardId, categoryId } = req.params;
  const { front, back, archived, consecutive_corrects } = req.body;

  if (!front || !back || !consecutive_corrects) {
    res.status(404).json({ errMsg: "A necessary field is missing!" });
  } else {
    const updated = await Cards.updateCard(
      { front, back, archived, consecutive_corrects, categoryId },
      cardId
    );
    res.status(200).json(updated);
  }
};

module.exports = { updateCard };
