function HaltLogo({ size = 'md', withWordmark = false }) {
  const sizes = {
    sm: 'h-12 w-12 rounded-2xl',
    md: 'h-16 w-16 rounded-[1.1rem]',
    lg: 'h-20 w-20 rounded-[1.35rem]',
  }

  const stroke = {
    sm: 'before:left-[11px] before:top-[8px] before:h-[28px] before:w-[8px] after:right-[11px] after:top-[8px] after:h-[28px] after:w-[8px]',
    md: 'before:left-[14px] before:top-[10px] before:h-[36px] before:w-[10px] after:right-[14px] after:top-[10px] after:h-[36px] after:w-[10px]',
    lg: 'before:left-[18px] before:top-[12px] before:h-[46px] before:w-[12px] after:right-[18px] after:top-[12px] after:h-[46px] after:w-[12px]',
  }

  const bridge = {
    sm: 'left-[18px] top-[20px] h-[8px] w-[16px]',
    md: 'left-[24px] top-[26px] h-[10px] w-[18px]',
    lg: 'left-[30px] top-[31px] h-[12px] w-[22px]',
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative border border-white/10 bg-[#111111] ${sizes[size]} before:absolute before:rounded-full before:bg-white before:content-[''] after:absolute after:rounded-full after:bg-white after:content-[''] ${stroke[size]}`}
      >
        <div
          className={`absolute rounded-full bg-white ${bridge[size]}`}
          aria-hidden="true"
        />
      </div>
      {withWordmark ? (
        <div className="leading-none">
          <div className="text-2xl font-black uppercase tracking-[0.24em] text-halt-red">
            HALT
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default HaltLogo
