import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import { jwtSecret } from "../utils/jwtSecret.js";

export const verifyToken = (req, res, next) => {
 
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    return res.status(401).json({ message: "invalid credentials" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(errorHandler(403, "Authorization token required"));
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return next(errorHandler(403, "Token is not valid!"));

    req.user = user;

    next();
  });
};
