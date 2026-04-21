import { motion } from 'framer-motion'

function StatCard({
  icon,
  label,
  value,
  accent = 'text-halt-red',
  className = '',
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`halt-panel min-h-[146px] ${className}`}
    >
      <div className={`text-xl ${accent}`}>{icon}</div>
      <div className="mt-5">
        <div className="halt-label text-zinc-500">{label}</div>
        <div className="mt-3 text-3xl font-black text-white md:text-4xl">
          {value}
        </div>
      </div>
      {children}
    </motion.div>
  )
}

export default StatCard
