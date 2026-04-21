import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'

function UrgePage() {
  const [complete, setComplete] = useState(false)
  const [holding, setHolding] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-halt-dark text-white">
      <div className="relative flex min-h-screen flex-col lg:flex-row">
        <section className="relative flex min-h-[40vh] flex-1 flex-col justify-between overflow-hidden bg-halt-red px-8 py-10 md:px-12">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),transparent_60%)] opacity-50" />
          <div className="relative">
            <div className="halt-label text-white/70">Current Promise</div>
            <blockquote className="mt-10 max-w-xl text-4xl font-black italic leading-tight text-white md:text-5xl">
              "I chose strength because the pain of regret is heavier than the
              pain of discipline."
            </blockquote>
          </div>

          <div className="relative">
            <div className="halt-label text-white/70">Active Streak</div>
            <div className="mt-3 text-5xl font-black text-white">14 DAYS</div>
          </div>
        </section>

        <section className="relative flex flex-1 items-center justify-center px-8 py-12">
          <div className="absolute right-8 top-8 text-[10px] font-semibold uppercase tracking-[0.38em] text-halt-red">
            Emergency Protocol Active
          </div>
          <div className="absolute bottom-8 left-8 text-[10px] uppercase tracking-[0.38em] text-zinc-600">
            Press in Case of Emergency
          </div>

          <div className="flex max-w-xl flex-col items-center text-center">
            <CountdownTimer seconds={30} onComplete={() => setComplete(true)} />

            <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-white">
              Pause The Impulse
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
              The urge is a wave. It peaks, then it breaks. Breathe through
              these 30 seconds of transition.
            </p>

            <button
              type="button"
              onMouseDown={() => setHolding(true)}
              onMouseUp={() => setHolding(false)}
              onMouseLeave={() => setHolding(false)}
              onTouchStart={() => setHolding(true)}
              onTouchEnd={() => setHolding(false)}
              className={`halt-button mt-8 px-10 py-4 text-sm ${
                holding ? 'bg-[#ff5e69]' : ''
              }`}
            >
              Hold To Stay Strong
            </button>

            <button
              type="button"
              className="mt-5 text-[11px] uppercase tracking-[0.35em] text-zinc-500 transition hover:text-zinc-300"
            >
              I Am Struggling, Notify My Partner
            </button>
          </div>

          {complete ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="halt-panel w-full max-w-md rounded-[2rem] p-8 text-center"
              >
                <div className="text-4xl font-black uppercase tracking-tight text-white">
                  You Held Strong
                </div>
                <div className="mt-3 text-sm uppercase tracking-[0.35em] text-zinc-400">
                  Emergency Cycle Complete
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="halt-button mt-8 w-full"
                >
                  Back To Dashboard
                </button>
              </motion.div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  )
}

export default UrgePage
