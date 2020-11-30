const express = require('express');
const cors = require('cors');
const HOST = 'localhost';
const PORT = 3000;

const app = express();

app.use(express.static('public'));

app.listen(PORT, HOST, () => {
  console.log(`listening on ${HOST}:${PORT}`);
})