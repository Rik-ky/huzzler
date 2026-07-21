import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Lock, User, ArrowRight, Github, Check } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Get started - Huzzler" },
      { name: "description", content: "Create your Huzzler account or sign in to join real product teams and earn verified experience." },
      { property: "og:title", content: "Get started - Huzzler" },
      { property: "og:description", content: "Join Huzzler. Get AI-verified, ship real products, build the portfolio that gets you hired." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

type Mode = "signup" | "login";

function AuthPage() {
  const [mode, setMode] = useState<Mode>("signup");

  return (
    <div className="min-h-screen bg-charcoal text-white flex flex-col" style={{ overflowX: "clip" }}>
      {/* Top bar */}
      <header className="w-full">
        <div className="mx-auto max-w-6xl px-5 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src="/huzzler-mark.svg" alt="Huzzler" className="h-9 w-auto transition-transform group-hover:-rotate-3" />
            <span className="font-display text-lg font-bold tracking-tight text-white/95">huzzler</span>
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold text-white/60 hover:text-white transition-colors"
          >
            Back to site
          </Link>
        </div>
      </header>

      {/* Split canvas */}
      <div className="flex-1 mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-5 py-10 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Left: pitch */}
        <div className="hidden lg:flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Built for Africa's next 1M developers
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] font-bold tracking-tight">
              Ship real products.
              <br />
              <span className="text-primary">Get hired for real.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/65 leading-relaxed">
              Join thousands of junior African talent breaking the
              no-experience loop through AI-verified team projects.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                "AI verifies your skills in minutes, not months",
                "Get drafted into real cross-functional product teams",
                "Earn XP, badges, and a portfolio recruiters trust",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30 shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-white/80 font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 hidden xl:flex items-center gap-3 text-sm text-white/50">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-8 w-8 rounded-full ring-2 ring-charcoal"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.76 0.15 ${200 + i * 20}), oklch(0.6 0.15 ${240 + i * 15}))`,
                  }}
                />
              ))}
            </div>
            <span className="font-semibold text-white/70">12,400+</span>
            <span>hustlers already shipping</span>
          </div>
        </div>

        {/* Right: form card */}
        <div className="flex items-center">
          <div className="w-full rounded-3xl bg-white p-7 sm:p-9 text-charcoal shadow-2xl shadow-black/40 ring-1 ring-white/10">
            {/* Mobile logo */}
            <div className="lg:hidden mb-6 flex items-center gap-2">
              <img src="/huzzler-mark.svg" alt="" className="h-8 w-auto" />
            </div>

            {/* Tabs */}
            <div className="inline-flex rounded-full bg-secondary p-1 ring-1 ring-border">
              {(["signup", "login"] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                    mode === m
                      ? "bg-charcoal text-white"
                      : "text-charcoal/60 hover:text-charcoal"
                  }`}
                >
                  {m === "signup" ? "Create account" : "Sign in"}
                </button>
              ))}
            </div>

            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight">
              {mode === "signup" ? "Start your hustle." : "Welcome back."}
            </h2>
            <p className="mt-1.5 text-charcoal/60 text-sm">
              {mode === "signup"
                ? "Free forever. No credit card. No gatekeeping."
                : "Pick up right where you left off."}
            </p>

            {/* Social */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-white py-2.5 text-sm font-semibold hover:bg-secondary transition-colors">
                <GoogleIcon />
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-white py-2.5 text-sm font-semibold hover:bg-secondary transition-colors">
                <Github size={16} />
                GitHub
              </button>
            </div>

            <div className="my-6 flex items-center gap-3 text-xs font-semibold text-charcoal/40">
              <div className="h-px flex-1 bg-border" />
              or with email
              <div className="h-px flex-1 bg-border" />
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-3.5"
            >
              {mode === "signup" && (
                <Field
                  icon={<User size={16} />}
                  label="Full name"
                  placeholder="Chiamaka Okoye"
                  type="text"
                />
              )}
              <Field
                icon={<Mail size={16} />}
                label="Email"
                placeholder="you@huzzler.africa"
                type="email"
              />
              <Field
                icon={<Lock size={16} />}
                label="Password"
                placeholder="At least 8 characters"
                type="password"
              />

              {mode === "login" && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-charcoal/70 font-medium">
                    <input type="checkbox" className="h-4 w-4 rounded border-border accent-[var(--primary)]" />
                    Remember me
                  </label>
                  <a href="#" className="font-semibold text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="btn-duo w-full flex items-center justify-center gap-2 mt-2"
              >
                {mode === "signup" ? "Create my account" : "Sign in"}
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>

              {mode === "signup" && (
                <p className="pt-1 text-[11px] leading-relaxed text-charcoal/50">
                  By continuing you agree to our{" "}
                  <a href="#" className="underline hover:text-charcoal">Terms</a>{" "}
                  and{" "}
                  <a href="#" className="underline hover:text-charcoal">Privacy Policy</a>.
                </p>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-charcoal/60">
              {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "signup" ? "login" : "signup")}
                className="font-bold text-primary hover:underline"
              >
                {mode === "signup" ? "Sign in" : "Create an account"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/45">
          <span>© {new Date().getFullYear()} Huzzler. Made in Africa.</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white/80 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/80 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/80 transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Field({
  icon,
  label,
  ...rest
}: {
  icon: React.ReactNode;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60">
        {label}
      </span>
      <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-border bg-white px-3.5 py-2.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 transition-all">
        <span className="text-charcoal/40 shrink-0">{icon}</span>
        <input
          {...rest}
          className="w-full bg-transparent text-sm font-medium text-charcoal placeholder:text-charcoal/35 focus:outline-none"
        />
      </div>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.75-6-6.15S8.7 5.9 12 5.9c1.88 0 3.14.8 3.86 1.5l2.63-2.53C16.83 3.3 14.65 2.4 12 2.4 6.98 2.4 2.9 6.48 2.9 11.5S6.98 20.6 12 20.6c6.93 0 9.2-4.87 9.2-7.35 0-.5-.06-.9-.14-1.25H12z"/>
    </svg>
  );
}
