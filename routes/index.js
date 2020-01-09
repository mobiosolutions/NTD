const express = require('express');
const router = express.Router();
const push = require("web-push");

router.get('/', (req, res) => {
    res.send('index');
});


module.exports = router;