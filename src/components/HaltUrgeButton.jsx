import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function HaltUrgeButton({
  fullWidth = false,
  caption = 'PRESS IN CASE OF EMERGENCY',
}) {
  const navigate = useNavigate()

  return (
    <div className={`flex flex-col items-center ${fullWidth ? 'w-full' : ''}`}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/urge')}
        className={`halt-button px-12 py-4 text-base ${fullWidth ? 'w-full' : ''}`}
      >
        Halt Urge
      </motion.button>
      <span className="mt-4 text-[10px] uppercase tracking-[0.38em] text-zinc-600">
        {caption}
      </span>
    </div>
  )
}

export default HaltUrgeButton
