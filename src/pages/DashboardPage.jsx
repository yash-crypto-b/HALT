import { useUser } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import CircularProgress from '../components/CircularProgress'
import HaltUrgeButton from '../components/HaltUrgeButton'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'

const navItems = [
  { icon: '▦', label: 'Dashboard', to: '/dashboard', active: true },
  { icon: '🕐', label: 'History', to: '/dashboard' },
  { icon: '✋', label: 'Promises', to: '/dashboard' },
  { icon: '🛡️', label: 'Discipline', to: '/dashboard' },
  { icon: '👤', label: 'Profile', action: 'signout' },
]

function DashboardPage() {
  const { user } = useUser()
  const firstName = user?.firstName || 'Marcus A.'

  return (
    <div className="min-h-screen bg-halt-dark text-white">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col md:flex-row">
        <Sidebar
          navItems={navItems}
          statusTitle="Obsidian Resolve"
          statusSubtitle="Stay Focused"
          footerLabel="Current Session"
          footerValue={firstName}
        />

        <main className="flex-1 px-6 py-8 md:px-8 md:py-8 xl:px-12">
          <div className="flex items-center justify-between">
            <div className="mx-auto flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.38em] text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Active Resolve
            </div>
            <div className="hidden items-center gap-4 text-zinc-500 md:flex">
              <span>🔔</span>
              <span>⚙️</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="halt-panel relative overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_35%)] opacity-40" />
              <div className="relative flex flex-col items-center">
                <div className="halt-label text-zinc-500">Consistency Metric</div>
                <div className="mt-8">
                  <CircularProgress
                    value={84}
                    label=""
                    subtitle=""
                    size="h-[220px] w-[220px]"
                    valueClassName="text-6xl font-black"
                  />
                </div>
                <div className="-mt-16 text-sm uppercase tracking-[0.35em] text-zinc-500">
                  Resolved
                </div>
                <div className="mt-14 text-center">
                  <div className="text-5xl font-black tracking-tight text-white">
                    DAY 14
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-[0.45em] text-zinc-500">
                    Iron Will Phase
                  </div>
                </div>
              </div>
            </motion.section>

            <div className="space-y-4">
              <StatCard icon="🔥" label="Current Streak" value="14 DAYS" />
              <StatCard
                icon="⚡"
                label="Urges Resisted"
                value="42"
                accent="text-cyan-400"
              />
              <div className="halt-panel min-h-[182px] italic text-zinc-400">
                <p className="text-xl leading-relaxed">
                  "Self-discipline is the bridge between goals and
                  accomplishment."
                </p>
                <div className="mt-6 text-sm font-bold uppercase tracking-[0.32em] text-halt-red not-italic">
                  — The Code
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <div className="halt-panel rounded-[2rem] px-6 py-8 text-center md:px-10">
              <div className="halt-label text-zinc-500">
                Immediate Action Required?
              </div>
              <div className="mt-6">
                <HaltUrgeButton fullWidth caption="HUNGRY · ANGRY · LONELY · TIRED" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
