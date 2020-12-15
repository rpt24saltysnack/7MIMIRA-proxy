const express = require('express');
const axios = require('axios');
const HOST = 'localhost';
const PORT = 3000;
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/bundles', (req, res) => {
  async function retrieveBundles() {
    try {
      let colorAndSizeSelectionComponent = await axios.get('http://3.18.69.132:3001/bundle.js');
      let summaryComponent = await axios.get('http://54.241.116.3:3002/bundle.js');
      res.send(`${summaryComponent.data}${colorAndSizeSelectionComponent.data}`);
    } catch (error) {
      console.error(error);
      res.end()
    }
  }
  retrieveBundles();
});

//color & size selection routes
app.get('/shoes/:shoeId/colors', (req, res) => {
  let { shoeId } = req.params;
  axios.get(`http://3.18.69.132:3001/shoes/${shoeId}/colors`)
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
  axios.get(`http://3.18.69.132:3001/shoes/${shoeId}/sizes`)
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
  axios.get(`http://3.18.69.132:3001/shoes/${shoeId}/colors/${colorId}/quantities`)
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
  axios.get(`http://54.241.116.3:3002/products/${shoeId}/summary`)
  .then(summary => {
    res.send(summary.data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  })
})

app.listen(PORT, () => {
  console.log(`listening on ${HOST}:${PORT}`);
})
