import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import supabase from "./Config/supabaseClient.js";
import { requireAuth } from "./middleware/auth.js";
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const allowedOrigins = [
  'https://halt-seven.vercel.app', // Your Vercel URL
  'http://localhost:5173'          // Keep this so you can still dev locally
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));


// ✅ Test route
app.get("/", (req, res) => {
  res.send("server is running");
});


// ✅ Auth route
app.post("/api/urge", requireAuth, async (req, res) => {
  const clerkId = req.userId;

  res.json({
    message: "user verified",
    clerkId,
  });
});


// ✅ DB test
app.get("/api/test-db", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .limit(1);

    if (error) throw error;

    res.json({
      success: true,
      message: "database connected",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "database failed",
      error: error.message,
    });
  }
});


// ✅ Create User route
app.post("/api/create-user", requireAuth, async (req, res) => {
  const clerkId = req.userId;

  try {
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", clerkId)
      .single();

    if (existingUser) {
      return res.json({ message: "user already exists" });
    }

    const { data: newUser, error } = await supabase
      .from("profiles")
      .insert([{ id: clerkId }])
      .select()
      .single();

    if (error) throw error;

    await supabase.from("streaks").insert([
      {
        user_id: newUser.id,
        current_streak_hours: 0,
        consistency: 0,
        last_urge_at: new Date(),
      },
    ]);

    res.json({ message: "user created", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ NEW: STATS ROUTE (FIX)
app.get("/api/stats", requireAuth, async (req, res) => {
  try {
    const clerkId = req.userId;

    const { data: user } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", clerkId)
      .single();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { data: streak } = await supabase
      .from("streaks")
      .select("*")
      .eq("user_id", user.id)
      .single();

    const { count } = await supabase
      .from("urges")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    res.json({
      streak: streak?.current_streak_hours || 0,
      consistency: streak?.consistency || 0,
      urges: count || 0,
      lastUrge: streak?.last_urge_at || new Date(),
    });

  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ Leaderboard route (unchanged)
app.get("/api/leaderboard", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("streaks")
      .select(`
        user_id,
        last_urge_at,
        profiles (
          id
        )
      `);

    if (error) throw error;

    const leaderboard = data.map((entry) => {
      const lastUrge = new Date(entry.last_urge_at);
      const now = new Date();

      const hours = Math.floor((now - lastUrge) / (1000 * 60 * 60));

      return {
        userId: entry.user_id,
        streak: hours,
      };
    });

    leaderboard.sort((a, b) => b.streak - a.streak);

    const ranked = leaderboard.map((user, index) => ({
      rank: index + 1,
      ...user,
    }));

    res.json(ranked);

  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({
      error: err.message,
    });
  }
});


app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});