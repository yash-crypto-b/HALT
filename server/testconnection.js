// server/test-connection.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Ensure these match your .env variable names
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Use your Service Role Key

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  console.log("Testing connection...");
  
  try {
    // Try to fetch 1 row from your 'profiles' table
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (error) {
      throw error;
    }

    console.log("✅ Connection Successful!");
    console.log("Data returned:", data);
  } catch (err) {
    console.error("❌ Connection Failed!");
    console.error("Error Message:", err.message);
  }
}

testConnection();