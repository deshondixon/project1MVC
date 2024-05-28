const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();
const Photo = require('../../models/photo.js');

router.post('/add/:name', async (req, res) => {
  const { name, location, description } = req.body;

  if (!name) {
    return res.json({
      error: 'Name for search is required',
    });
  }

  const url = `https://api.unsplash.com/search/photos?query=${name}&per_page=1`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Client-ID ${process.env.API_KEY}`,
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3306/',
        'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        message: response.statusText,
      });
    }

    const data = await response.json();
    const rawUrl = data.results[0].urls.raw;
    const squareUrl =
      `${rawUrl}&fit=crop&w=800&h=800` ||
      'https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg';

    const photo = new Photo({
      name,
      location,
      description,
      imageUrl: squareUrl,
    });
    await photo.save();
    console.log(`Photo saved: ${JSON.stringify(photo)}`);

    return res.status(200).json({
      name,
      location,
      description,
      squareUrl,
    });
  } catch (error) {
    console.error(`Error fetching photo: ${error.message}`);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
});

router.put('/edit/:name', async (req, res) => {
  const { name } = req.params;
  const { newName, newLocation, newDescription } = req.body;

  try {
    const result = await Photo.findOneAndUpdate(
      { name },
      { name: newName, location: newLocation, description: newDescription },
      { new: true }
    );

    if (result) {
      const url = `https://api.unsplash.com/search/photos?query=${newName}&per_page=1`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Client-ID ${process.env.API_KEY}`,
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3306/',
          'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
        },
      });
      const data = await response.json();
      const rawUrl = data.results[0].urls.raw;
      const squareUrl =
        `${rawUrl}&fit=crop&w=800&h=800` ||
        'https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg';

      await Photo.findOneAndUpdate({ name: newName }, { imageUrl: squareUrl });

      return res.json({
        message: 'Card updated successfully',
        squareUrl,
      });
    } else {
      return res.status(404).json({ error: 'Card not found' });
    }
  } catch (error) {
    console.error(`Error updating card: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const result = await Photo.findOneAndDelete({ name });
    if (result) {
      return res.json({ message: 'Card deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Card not found' });
    }
  } catch (error) {
    console.error(`Error deleting card: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
