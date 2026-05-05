import jwt from "jsonwebtoken";
export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  console.log("DEBUG - Auth check", { hasToken: !!token });
  if(!token) {
    return res
    .status(401)
    .json({success: false, message: "please login first"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("DEBUG - Auth success", { userId: decoded.id || decoded.email });
    req.user = decoded;
    next();
  } catch (error) {
    console.error("DEBUG - Auth failed:", error.message);
    return res
    .status(401)
    .json({success: false, message: "please login first"});
  }
}