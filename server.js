const express = require('express');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3500;

app.use(express.json());

app.post('/', require('./api/createShortenedLink'));
app.get('/:short', require('./api/translateShortenedLink'));

app.listen(port, () => {
    console.log(`started listening on Port ${port}`);
});
