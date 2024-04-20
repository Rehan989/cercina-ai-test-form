// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve the frontend files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
const mySecret = process.env['apikey']
// Proxy POST requests to ManyChat API
app.post('/createSubscriber', async (req, res) => {
  try {
    const response = await axios.post('https://api.manychat.com/fb/subscriber/createSubscriber', req.body, {
      headers: {
        'Authorization': `Bearer 1187700:49911e248ed8b73237d6dde8792251e5`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve the frontend on the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
