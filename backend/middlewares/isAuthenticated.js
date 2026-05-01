import jwt from "jsonwebtoken";
export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
    return res
    .status(401)
    .json({success: false, message: "please login first"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res
    .status(401)
    .json({success: false, message: "please login first"});
  }
}