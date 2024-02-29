const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/main', (req, res) => {
    res.render('main.ejs');
});

app.listen(3000);