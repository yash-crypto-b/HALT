import dotenv from "dotenv";
import express from "express";
import cors from "cors";                          // ✅ keep only this one
import supabase from "./Config/supabaseClient.js";
import { requireAuth } from "./middleware/auth.js";
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});
// ❌ removed: const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ❌ removed: app.use(cors());  — was overriding the configured version below
// ❌ removed: app.use(express.json());  — moved after cors

const allowedOrigins = [
  'https://halt-seven.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());                          // ✅ moved here, after cors

// rest of the file is unchanged...