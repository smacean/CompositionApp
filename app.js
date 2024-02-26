const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('top.ejs');
});

app.get('/edit', (req, res) => {
    res.render('edit.ejs');
});

app.listen(3000);