import jwt from "jsonwebtoken";

export const authMiddleware = async(req, res, next) => {

  const authHeader = req.headers.authorization;

  console.log("Auth Header:", authHeader);

  // 1️⃣ No header
  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing",
    });
  }

  // 2️⃣ Invalid format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Invalid authorization format",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;
    console.log(req.user)

    next();
  } catch (err) {

    console.log("JWT Error:", err.message);

    // 3️⃣ Token expired
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Access token expired",
      });
    }

    // 4️⃣ Invalid token
    return res.status(403).json({
      message: "Invalid token",
    });
  }
};