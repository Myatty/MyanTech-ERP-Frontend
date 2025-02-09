const jwt = require('jsonwebtoken');

function checkPrivilege(req, res, role) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Unauthenticated Token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decodeValue) => {
        if (error) {
            return res.status(401).json({ message: 'Unauthenticated Token' });
        } else {
            if (decodeValue.dept_name !== role) {
                return res.status(403).json({ message: 'Unauthorized' });
            }
        }
    });
    return true;
}

module.exports = {
    checkPrivilege
} 