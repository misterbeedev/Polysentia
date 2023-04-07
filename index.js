const express = require('express');
const { scrape } = require('./api/functions');

const app = express();
const port = 3010;
const path = require('path');

app.get('/', (req, res) => {
  res.status(200).send('Hi!');
});

app.get('/ask/:prompt', async (req, res) => {
  try {
    const prompt = req.params.prompt;

    if (!prompt) {
      res.status(400).send('Prompt is required');
    }

    const result = await scrape(prompt);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
