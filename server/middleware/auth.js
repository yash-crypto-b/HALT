import { verifyToken } from "@clerk/backend";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No auth header" });
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
      audience: "authenticated", // 🔥 ADD THIS
    });

    req.userId = payload.sub;

    next();
  } catch (err) {
    console.error("Auth error FULL:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
};