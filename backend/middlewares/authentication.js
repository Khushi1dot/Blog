const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Please login");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    req.userId = decoded.userId; 
    console.log('decoded')
    next(); 
    console.log("DECODED:", decoded);
  } catch (err) {
    console.log("Auth error:", err);
    return res.status(401).send("Invalid or expired token");
  }
  console.log("AUTH HEADER:", req.headers.authorization);
console.log("REQ.USERID:", req.userId);

};

module.exports = authentication;

