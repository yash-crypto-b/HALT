import { SignUp } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import HaltLogo from '../components/HaltLogo'

const clerkAppearance = {
  elements: {
    rootBox: 'w-full',
    card: 'bg-transparent shadow-none border-0',
    header: 'hidden',
    footer: 'hidden',
    formButtonPrimary:
      'halt-button !w-full !rounded-full !bg-halt-red !py-3 !text-sm !font-black !uppercase !tracking-[0.28em] hover:!bg-[#f14b58]',
    formFieldLabel:
      '!text-[10px] !font-semibold !uppercase !tracking-[0.35em] !text-zinc-500',
    formFieldInput:
      '!rounded-xl !border !border-[#333333] !bg-[#111111] !text-white placeholder:!text-zinc-600 focus:!border-halt-red focus:!ring-0',
    dividerLine: '!bg-[#2a2a2a]',
    dividerText: '!text-zinc-600 !uppercase !tracking-[0.25em] !text-[10px]',
    socialButtonsBlockButton:
      '!rounded-xl !border !border-[#333333] !bg-[#111111] !text-white hover:!bg-[#171717]',
    formResendCodeLink: '!text-halt-red',
    otpCodeFieldInput:
      '!rounded-xl !border !border-[#333333] !bg-[#111111] !text-white',
    alternativeMethodsBlockButton:
      '!text-zinc-400 hover:!text-white',
  },
}

function RegisterPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-halt-dark px-6 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,57,70,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_60%)]" />
      <div className="absolute inset-0 bg-halt-noise opacity-60" />

      <div className="relative z-10 mx-auto w-full max-w-md">
        <div className="halt-panel rounded-[2rem] border-white/5 bg-[#1c1c1c]/95 p-8 md:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <HaltLogo size="lg" />
            <div className="mt-6 text-5xl font-black tracking-tight text-white">
              HALT
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.45em] text-zinc-500">
              Forge Your Resolve
            </div>
          </div>

          <SignUp
            routing="path"
            path="/register"
            signInUrl="/login"
            fallbackRedirectUrl="/dashboard"
            appearance={clerkAppearance}
          />

          <div className="mt-6 text-center text-sm text-zinc-500">
            Already in control?{' '}
            <Link className="font-semibold text-halt-red" to="/login">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
