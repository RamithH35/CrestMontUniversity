const jwt = require("jsonwebtoken");

function requireClubHead(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header required." });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Token format must be Bearer <token>." });
  }

  const token = parts[1];
  const secret = process.env.JWT_SECRET || "default_jwt_secret";

  try {
    const decoded = jwt.verify(token, secret);
    req.clubHead = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

module.exports = { requireClubHead };
