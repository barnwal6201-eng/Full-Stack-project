import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
  throw new Error("Missing ADMIN_EMAIL, ADMIN_PASSWORD or JWT_SECRET");
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                   // 5 attempts per IP
  message: { message: "Too many attempts. Try again later." },
});

router.post("/admin/login", loginLimiter, (req, res) => {
  const { email, password } = req.body;

  if (
    email?.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    password === ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ type: "admin" }, process.env.JWT_SECRET, { expiresIn: "4h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid email or password" });
});

export default router;