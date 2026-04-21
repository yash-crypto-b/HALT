import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// 1. Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Explicitly tell dotenv where to look (goes up one level to the 'server' folder)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// 3. Debug check: If it fails, this prints exactly what's missing
if (!supabaseUrl || !supabaseServiceKey) {
  console.error("--- CONFIG ERROR ---");
  console.error("SUPABASE_URL:", supabaseUrl);
  console.error("SUPABASE_SERVICE_KEY:", supabaseServiceKey ? "Found" : "MISSING");
  throw new Error("Missing Supabase environment variables. Ensure .env is in the /server folder.");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default supabase;