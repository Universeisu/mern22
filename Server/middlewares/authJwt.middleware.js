const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.MY_CUSTOM_JWT_KEY;

verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ message: "token is missing" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Access Forbidden!" });
    req.role = decoded.role;
    req.email = decoded.email;
    next();
  });
};

isAdmin = (req, res, next) => {
  const { role, email } = req;
  if (req.role !== "admin") {
    return React.status(403).json({ message: "require Admin role!" });
  }
  next();
};

const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;
