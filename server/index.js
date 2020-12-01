const express = require('express');
const axios = require('axios');
const HOST = 'localhost';
const PORT = 3000;

const app = express();

app.use(express.static('public'));


//color & size selection routes
app.get('/shoes/:shoeId/colors', (req, res) => {
  let { shoeId } = req.params;
  axios.get(`http://localhost:3001/shoes/${shoeId}/colors`)
  .then(colors => {
    res.send(colors.data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  })
});

app.get('/shoes/:shoeId/sizes', (req, res) => {
  let { shoeId } = req.params;
  axios.get(`http://localhost:3001/shoes/${shoeId}/sizes`)
  .then(sizes => {
    res.send(sizes.data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  })
});

app.get('/shoes/:shoeId/colors/:colorId/quantities', (req, res) => {
  let { shoeId, colorId } = req.params;
  axios.get(`http://localhost:3001/shoes/${shoeId}/colors/${colorId}/quantities`)
  .then(quantities => {
    res.send(quantities.data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  })
});

//product info routes
app.get('/products/:shoeId/summary', (req, res) => {
  let { shoeId } = req.params;
  axios.get(`http://localhost:3002/products/${shoeId}/summary`)
  .then(summary => {
    res.send(summary.data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  })
})

app.listen(PORT, HOST, () => {
  console.log(`listening on ${HOST}:${PORT}`);
})