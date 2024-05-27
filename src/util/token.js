const jwt = require("jsonwebtoken");

class Token {
    accessToken(user) {
        return jwt.sign({ id: user.id, admin: user.admin }, "secretKey", {
            expiresIn: "30s",
        });
    }
    refreshToken(user) {
        return jwt.sign({ id: user.id, admin: user.admin }, "secretKey", {
            expiresIn: "2d",
        });
    }
}

module.exports = new Token();
