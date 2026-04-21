app.post("/api/urge", requireAuth, async (req, res) => {
  const clerkId = req.userId; // 🔥 SECURE (from token)

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

    // 🔥 insert urge
    const { error: urgeError } = await supabase
      .from("urges")
      .insert([
        {
          user_id: user.id,
        },
      ]);

    if (urgeError) throw urgeError;

    // 🔥 reset streak
    const { error: streakError } = await supabase
      .from("streaks")
      .update({
        last_urge_at: new Date(),
        current_streak_hours: 0,
      })
      .eq("user_id", user.id);

    if (streakError) throw streakError;

    res.json({
      message: "Urge logged & streak reset",
    });

  } catch (err) {
    console.error("Urge error:", err);
    res.status(500).json({
      error: err.message,
    });
  }
});