require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const PORT = 3000;

const colorAndSizeSelectionHost = process.env.DEV_COLOR_HOST || 'http://3.18.69.132:3001';
const summaryHost = process.env.DEV_SUMMARY_HOST || 'http://54.241.116.3:3002';
const reviewsHost = process.env.DEV_REVIEWS_HOST || 'http://3.18.69.132:3003';
const navbarHost = process.env.DEV_NAVBAR_HOST || 'http://3.18.69.132:3005';
const imagesHost = process.env.DEV_IMAGES_HOST || 'http://54.241.116.3:3004';
const footerHost = process.env.DEV_FOOTER_HOST || 'http://3.18.69.132:3006';

app.use(express.static('public'));

app.get('/bundles', (req, res) => {
  async function retrieveBundles() {
    try {
      let colorAndSizeSelectionComponent = await axios.get(`${colorAndSizeSelectionHost}/bundle.js`);
      let summaryComponent = await axios.get(`${summaryHost}/bundle.js`);
      let reviewsComponent = await axios.get(`${reviewsHost}/bundle.js`);
      let navbarComponent = await axios.get(`${navbarHost}/bundle.js`);
      let imagesComponent = await axios.get(`${imagesHost}/bundle.js`);
      let footerComponent = await axios.get(`${footerHost}/bundle.js`);
      res.send(`${summaryComponent.data}${colorAndSizeSelectionComponent.data}${reviewsComponent.data}${imagesComponent.data}${navbarComponent.data}${footerComponent.data}`);
    } catch (error) {
      console.error(error);
      res.end();
    }
  }
  retrieveBundles();
});

//color & size selection routes
app.get('/shoes/:shoeId/colors', (req, res) => {
  let { shoeId } = req.params;
  axios.get(`${colorAndSizeSelectionHost}/shoes/${shoeId}/colors`)
  .then(colors => {
    res.send(colors.data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  });
});

app.get('/shoes/:shoeId/sizes', (req, res) => {
  let { shoeId } = req.params;
  axios.get(`${colorAndSizeSelectionHost}/shoes/${shoeId}/sizes`)
  .then(sizes => {
    res.send(sizes.data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  });
});

app.get('/shoes/:shoeId/colors/:colorId/quantities', (req, res) => {
  let { shoeId, colorId } = req.params;
  axios.get(`${colorAndSizeSelectionHost}/shoes/${shoeId}/colors/${colorId}/quantities`)
  .then(quantities => {
    res.send(quantities.data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  });
});

//product info routes
app.get('/products/:shoeId/summary', (req, res) => {
  let { shoeId } = req.params;
  axios.get(`${summaryHost}/products/${shoeId}/summary`)
  .then(summary => {
    res.send(summary.data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  });
});

//reviews routes
app.get('/shoes/:shoeId/reviews/:count', (req, res) => {
  let { shoeId, count } = req.params;
  axios.get(`${reviewsHost}/shoes/${shoeId}/reviews/${count}`)
  .then(reviews => {
    res.send(reviews.data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  });
});

app.get('/shoes/:shoeId/rating', (req, res) => {
  let { shoeId } = req.params;
  axios.get(`${reviewsHost}/shoes/${shoeId}/rating`)
  .then(rating => {
    res.send(rating.data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  });
});

// product images routes
/*
* VERIFY imageHost variable is correct!!
*/
app.get('/products/:shoeId/gallery', (req, res) => {
  let { shoeId } = req.params;
  axios.get(`${imagesHost}/products/${shoeId}/gallery`)
  .then(gallery => {
    console.log(gallery.data);
    res.send(gallery.data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  });
});


app.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
});
