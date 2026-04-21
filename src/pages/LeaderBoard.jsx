import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import Sidebar from "../components/Sidebar";

const navItems = [
  { icon: '🏠', label: 'Home', to: '/home' },
  { icon: '📊', label: 'Leaderboard', to: '/leaderboard', active: true },
  { icon: '👤', label: 'Profile', to: '/profile' },
];

function LeaderBoard() {
  const { getToken } = useAuth();
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = await getToken();

        const res = await fetch("http://localhost:5000/api/leaderboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setLeaders(data);
      } catch (err) {
        console.error("Leaderboard error:", err);
      }
    };

    fetchLeaderboard();
  }, [getToken]);

  return (
    <div className="flex min-h-screen bg-background text-white">
      
      <Sidebar navItems={navItems} />

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-10">Leaderboard</h1>

        <div className="space-y-4">
          {leaders.map((user) => (
            <div
              key={user.userId}
              className="bg-card p-5 rounded-xl flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-primary">
                  #{user.rank}
                </span>

                <span className="text-sm text-muted">
                  User {user.userId.slice(0, 6)}
                </span>
              </div>

              <div className="text-lg font-semibold">
                {user.streak} hrs
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;