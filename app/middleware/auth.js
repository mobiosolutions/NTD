const jwt = require('jsonwebtoken');

/* check authorization token */
exports.checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
    }
    let msg = { auth: false, message: 'No token provided.' };
    if (!token) {
        res.status(500).send(msg);
    }
    jwt.verify(token, 'supersecret', function (err, decoded) {
        var msg = { auth: false, message: 'Failed to authenticate token.' };
        console.log(err);
        if (err) res.status(500).send(msg);
        next();
    });
}