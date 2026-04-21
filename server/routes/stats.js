app.get("/api/stats", requireAuth, async (req, res) => {
  const clerkId = req.userId; // 🔥 secure

  try {
    // 🔍 find user
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_user_id", clerkId)
      .single();

    if (userError || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 📊 get streak
    const { data: streak, error: streakError } = await supabase
      .from("streaks")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (streakError) throw streakError;

    // 🔢 count urges
    const { count: urgesCount, error: urgesError } = await supabase
      .from("urges")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if (urgesError) throw urgesError;

    // ⏱ calculate streak hours dynamically
    const lastUrge = new Date(streak.last_urge_at);
    const now = new Date();

    const hours = Math.floor((now - lastUrge) / (1000 * 60 * 60));

    // 📈 simple consistency logic
    const consistency = Math.min(100, hours);

    res.json({
      streak: hours,
      consistency,
      urges: urgesCount,
      lastUrge: streak.last_urge_at,
    });

  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({
      error: err.message,
    });
  }
});