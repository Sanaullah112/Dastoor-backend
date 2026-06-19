import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Not Authorized. Login again." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make sure it's an admin token
    if (decoded.email !== process.env.ADMIN_EMAIL || decoded.password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Not Authorized. Invalid credentials." });
    }

    next();
  } catch (error) {
    console.error("Admin Auth Error:", error);
    next(error);
  }
};

export default adminAuth;
