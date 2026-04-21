import { SignOutButton, useUser } from '@clerk/clerk-react'
import { NavLink } from 'react-router-dom'
import HaltLogo from './HaltLogo'

function Sidebar({
  variant = 'dashboard',
  navItems = [],
  statusTitle,
  statusSubtitle,
  footerLabel,
  footerValue,
}) {
  const { user } = useUser()

  return (
    <aside className="flex w-full max-w-full flex-col border-b border-halt-border bg-[#101010] px-5 py-6 md:w-72 md:max-w-72 md:border-b-0 md:border-r md:px-6">
      {/* 🔥 Logo Section */}
      <div className="flex items-center gap-4">
        <HaltLogo size="sm" />
        <div>
          <div className="text-2xl font-black uppercase tracking-[0.22em] text-halt-red">
            HALT
          </div>

          {statusTitle ? (
            <div className="mt-2 text-sm font-bold uppercase tracking-[0.28em] text-white">
              {statusTitle}
            </div>
          ) : null}

          {statusSubtitle ? (
            <div className="mt-1 text-[11px] uppercase tracking-[0.34em] text-zinc-500">
              {statusSubtitle}
            </div>
          ) : null}
        </div>
      </div>

      {/* 🔥 Navigation */}
      <div className="mt-10">
        <div className="halt-label mb-4 text-zinc-600">
          {variant === 'home' ? 'Navigation' : 'Protocol'}
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const baseClass =
              variant === 'home'
                ? 'group flex items-center gap-3 rounded-2xl border-l-2 border-transparent px-3 py-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 transition hover:text-white'
                : 'group flex items-center gap-3 rounded-full px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 transition hover:bg-white/5 hover:text-white'

            const activeClass =
              variant === 'home'
                ? 'border-halt-red bg-white/[0.02] text-white'
                : 'bg-halt-red text-white'

            // 🔥 Sign Out Button
            if (item.action === 'signout') {
              return (
                <SignOutButton key={item.label}>
                  <button className={baseClass} type="button">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </SignOutButton>
              )
            }

            // 🔥 Normal Navigation
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `${baseClass} ${item.active || isActive ? activeClass : ''}`
                }
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* 🔥 Footer */}
      <div className="mt-8 md:mt-auto">
        <div className="halt-panel rounded-2xl bg-[#151515] p-4">
          <div className="halt-label text-zinc-600">{footerLabel}</div>

          <div className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-white">
            {footerValue || user?.firstName || 'Stay Strong'}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar