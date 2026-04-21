import { motion } from 'framer-motion'
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom'
import CircularProgress from '../components/CircularProgress'
import HaltUrgeButton from '../components/HaltUrgeButton'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import { useEffect, useState } from 'react'

const navItems = [
  { icon: '🏠', label: 'Home', to: '/', active: true },
  { icon: '📊', label: 'Leaderboard', to: '/leaderboard' }, // ✅ FIXED
  { icon: '👤', label: 'Profile', to: '/profile' },         // ✅ FIXED
]

function HomePage() {
  const navigate = useNavigate()
  const { getToken } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = await getToken();

        const res = await fetch("http://localhost:5000/api/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, [getToken]);

  const handleHalt = async () => {
    try {
      const token = await getToken();

      await fetch("http://localhost:5000/api/urge", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await fetch("http://localhost:5000/api/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setStats(data);

    } catch (err) {
      console.error("Error logging urge:", err);
    }
  };

  if (!stats) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-halt-dark text-white">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col md:flex-row">
        <Sidebar
          variant="home"
          navItems={navItems}
          footerLabel="Current Status"
          footerValue="Stay Strong"
        />

        <main className="flex-1 px-6 py-8 md:px-10 md:py-10 xl:px-14">
          <div className="flex flex-col gap-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-black tracking-tight text-white md:text-7xl"
                >
                  DAY 14
                </motion.h1>
                <p className="mt-3 text-xs uppercase tracking-[0.45em] text-zinc-500 md:text-sm">
                  Personal Resilience Journey
                </p>
              </div>

              <div className="hidden text-right md:block">
                <div className="halt-label text-zinc-600">Last Urge Logged</div>
                <div className="mt-2 text-sm font-bold uppercase tracking-[0.22em] text-zinc-300">
                  {stats?.lastUrge ? new Date(stats.lastUrge).toLocaleString() : "—"}
                </div>
              </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[minmax(320px,420px)_1fr]">
              <div className="flex items-center justify-center">
                <CircularProgress
                  value={stats.consistency || 0}
                  label="Consistency"
                  subtitle="Peak Momentum"
                />
              </div>

              <div className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <StatCard icon="⚡" label="Current Streak" value={`${stats.streak || 0} HOURS`} />
                  <StatCard icon="❤️" label="Urges Denied" value={stats.urges || 0} />
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/leaderboard')}
                  className="halt-panel flex w-full items-center justify-between gap-4 text-left transition hover:border-zinc-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-halt-red/10 text-lg text-halt-red">
                      🏆
                    </div>
                    <div>
                      <div className="halt-label text-zinc-600">
                        Leaderboard Rank
                      </div>
                      <div className="mt-2 text-2xl font-black uppercase tracking-[0.14em] text-white">
                        Top 5% Globally
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl text-zinc-500">&gt;</div>
                </button>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button onClick={handleHalt}>
                <HaltUrgeButton />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default HomePage;