const linksDB = require('../model/links');
const { v4: uuid } = require('uuid');

const create = (req, res) => {
    if (!req?.body?.link) { // Bad Request
        return res.status(400).json({ message: 'link field is required' });
    }
    const newLink = createNewLink(req.body.link);
    const newData = {
        id: uuid(),
        original: req.body.link,
        short: newLink
    };
    linksDB.setData([...linksDB.data, newData]);
    res.status(200).json({ newLink: `${req.protocol}://${req.headers.host}/${newLink}` });

    console.log(`This particular data added to the database ${JSON.stringify(newData)}`);
};

function createNewLink (original = '') {
    const shortSize = process.env.SHORT_SIZE || 5;
    const segSize = original.length / (shortSize - 1);
    let result = '';

    for (let i = 0; i < shortSize; i++) {
        const seg = original.substring(i * segSize, Math.min((i + 1) * segSize, original.length));
        let seed = 0;
        for (let j = 0; j < seg.length; j++) {
            seed += seg[j].charCodeAt(0);
        }
        seed = seed % 36;
        const candidate = seed.toString(36);
        const randomNumber = Math.floor(Math.random() * 2);
        result += isNaN(candidate) && randomNumber
            ? String.fromCharCode(candidate.charCodeAt(0) + 'A'.charCodeAt(0) - 'a'.charCodeAt(0))
            : candidate;
    }
    return result;
}

module.exports = create;
