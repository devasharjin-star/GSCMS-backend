import jwt from "jsonwebtoken";

export const authMiddleare = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({
      message: "Token is missing"
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    req.user = decodedToken;

    next();

  } catch (e) {

    console.log(e);

    return res.status(401).json({
      message: "Token is not valid"
    });

  }

};