const express = require('express');
const bodyParser = require('body-parser');
const path = require ('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname + '../public')));

const urls = [
  { url: 'https://www.google.ca', short: 'x3Gw9Al' },
  { url: 'https://www.shopify.com', short: 'jn6Qcl7' },
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  app.locals.urls = urls;
  res.render('index');
});

app.get('/about', (req, res) => {
  res.send('This is a project to learn how Express servers are built! Thanks for visiting :)');
});

app.get('/about/:name', (req, res) => {
  app.locals.name = req.params["name"];
  console.log(app.locals.name);
  res.render('about');
});

app.get('/:short', (req, res) => {
  const shortenedURLs = urls.map(entry => entry.short)
  const shortenedURL = req.params.short;

  if (shortenedURLs.includes(shortenedURL)) {
    const url = urls.find(entry => entry.short === shortenedURL).url
    res.redirect(url);
  } else {
    res.send('That shortened URL does not exist!');
  }
});

app.post('/new', (req, res) => {
  // SOME LOGIC
  const url = req.body.url
  urls.push({ url: url, short: "SHORTENED" });
  console.log(urls);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`URL Shortener project now running on port ${port}`);
  console.log(`Visit at: http://localhost:${port}`);
});
