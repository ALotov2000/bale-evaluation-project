const linksDB = require('../model/links');

const translate = (req, res) => {
    const foundLink = linksDB.data.find(link => link.short === req.params.short);
    if (!foundLink) return res.sendStatus(404); // Not Found
    res.redirect(
        foundLink.original.startsWith('http://') || foundLink.original.startsWith('https://')
            ? foundLink.original
            : `http://${foundLink.original}`);
};

module.exports = translate;
