import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function CircularProgress({
  value,
  label,
  subtitle,
  size = 'h-[250px] w-[250px]',
  valueClassName = 'text-5xl font-black',
}) {
  return (
    <div className={`relative ${size}`}>
      <CircularProgressbar
        value={value}
        strokeWidth={9}
        styles={buildStyles({
          pathColor: '#e63946',
          trailColor: '#202020',
        })}
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="halt-label mb-3 text-zinc-500">{label}</span>
        <span className={valueClassName}>{value}%</span>
        {subtitle ? (
          <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.35em] text-halt-red">
            {subtitle}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export default CircularProgress
