import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import HaltLogo from "../components/HaltLogo";

const clerkAppearance = {
  elements: {
    rootBox: "w-full",
    card: "bg-transparent shadow-none border-0",
    header: "hidden",
    footer: "hidden",
    formButtonPrimary:
      "halt-button !w-full !rounded-full !bg-halt-red !py-3 !text-sm !font-black !uppercase !tracking-[0.28em] hover:!bg-[#f14b58]",
    formFieldLabel:
      "!text-[10px] !font-semibold !uppercase !tracking-[0.35em] !text-zinc-500",
    formFieldInput:
      "!rounded-xl !border !border-[#333333] !bg-[#111111] !text-white placeholder:!text-zinc-600 focus:!border-halt-red focus:!ring-0",
    dividerLine: "!bg-[#2a2a2a]",
    dividerText:
      "!text-zinc-600 !uppercase !tracking-[0.25em] !text-[10px]",
    socialButtonsBlockButton:
      "!rounded-xl !border !border-[#333333] !bg-[#111111] !text-white hover:!bg-[#171717]",
    formResendCodeLink: "!text-halt-red",
    identityPreviewText: "!text-zinc-400",
    formFieldSuccessText: "!text-emerald-400",
    formFieldWarningText: "!text-amber-400",
    alertText: "!text-zinc-300",
    otpCodeFieldInput:
      "!rounded-xl !border !border-[#333333] !bg-[#111111] !text-white",
    alternativeMethodsBlockButton:
      "!text-zinc-400 hover:!text-white",
  },
};

function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-halt-dark px-6 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(230,57,70,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_60%)]" />
      <div className="absolute inset-y-0 left-6 hidden w-px bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block" />
      <div className="absolute bottom-16 left-12 hidden h-48 w-48 rotate-12 rounded-[2rem] border border-white/5 bg-white/[0.02] blur-[2px] lg:block" />
      <div className="absolute inset-0 bg-halt-noise opacity-60" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_460px]">
          <div className="hidden lg:block">
            <div className="text-[120px] font-black uppercase tracking-[0.18em] text-white/[0.03]">
              HALT
            </div>
            <div className="mt-6 max-w-sm text-sm uppercase tracking-[0.5em] text-zinc-700">
              Resilience Protocol Online
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="halt-panel rounded-[2rem] border-white/5 bg-[#1c1c1c]/95 p-8 md:p-10">
              <div className="mb-8 flex flex-col items-center text-center">
                <HaltLogo size="lg" />
                <div className="mt-6 text-5xl font-black tracking-tight text-white">
                  HALT
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.45em] text-zinc-500">
                  The Disciplined Monolith
                </div>
              </div>

              {/* ✅ FIXED SIGNIN */}
              <SignIn
                routing="path"
                path="/login"
                signUpUrl="/register"
                afterSignInUrl="/"
                appearance={clerkAppearance}
              />

              <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-zinc-600">
                <span>Secure Resolve</span>
                <span>Privacy · Terms</span>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-zinc-500">
              New to the path?{" "}
              <Link className="font-semibold text-halt-red" to="/register">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;