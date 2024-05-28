const router = require('express').Router();
const Photo = require('../../models/photo.js');

router.get('/', async (req, res) => {
  const cards = await Photo.find();

  return res.render('home.handlebars', {
    cards: cards.map((card) => card.toObject()),
  });
});

module.exports = router;
