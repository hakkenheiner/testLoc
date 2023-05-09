const express = require('express');
const cors = require('cors');
const app = express();
const { addWatchedLocation, connectToDatabase } = require('./public/test');

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

connectToDatabase();

app.post('/api/addWatchedLocation', async (req, res) => {
  const { deviceId, latitude, longitude } = req.body;
  try {
    await addWatchedLocation(deviceId, latitude, longitude);
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Error adding watched location:', error);
    res.status(500).json({ status: 'error' });
  }
});

app.listen(3003, () => {
  console.log('Server is running on port 3003');
});

