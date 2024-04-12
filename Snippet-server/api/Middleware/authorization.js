const jwt = require("jsonwebtoken");

const config = require("../../config.json");

const verifytoken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "no token found for authorization" });
  }

  try {
    // splite the header toi get the token
    const token = authorization.split(" ").pop();

    const verified = jwt.verify(token, config.jwt_secrect);

    req.user = verified;

    next();
  } catch (error) {
    res.status(401).json({ error: "invalid token" });
  }
};

module.exports = { verifytoken };
