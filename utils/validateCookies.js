const jwt = require('jsonwebtoken');

const validateCookies = (req, res, next) => {
    const token = req.cookies.token;
    jwt.verify(token, 'authenticateuser', function (err, decoded) {
        if (err) {
            res.status(401).json({
                message: 'No authorized'
            });
        }

        if (!decoded && decoded.data && decoded.data.uuid) {
            res.status(401).json({
                message: 'No ID found'
            });
        }

        if (!decoded && decoded.data && decoded.data.email) {
            res.status(401).json({
                message: 'No email found'
            });
        }

        req.id = decoded.data.uuid;
        req.email = decoded.data.email;
        next();
    });
};


module.exports = {
    validateCookies
};