import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Auhtorization");
  if (!token)
    return res
      .status(401)
      .json({ msg: "No token is provided, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
};

export default authMiddleware;
