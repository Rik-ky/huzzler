import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRight, Github } from "lucide-react";


export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Get started - Huzzler" },
      { name: "description", content: "Create your Huzzler account or sign in to join real product teams and earn verified experience." },
      { property: "og:title", content: "Get started - Huzzler" },
      { property: "og:description", content: "Join Huzzler. Get AI-verified, ship real products, build the portfolio that gets you hired." },
      { property: "og:url", content: "/auth" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Get started - Huzzler" },
      { name: "twitter:description", content: "Join Huzzler. Get AI-verified, ship real products, build the portfolio that gets you hired." },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
  component: AuthPage,
});

type Mode = "signup" | "login";

function AuthPage() {
  const search = useSearch({ from: "/auth" });
  const initialMode: Mode = search.mode === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<Mode>(initialMode);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setError("");
    setSuccessMsg("");
  }, [initialMode]);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setError("");
    setSuccessMsg("");
    navigate({ to: "/auth", search: { mode: newMode }, replace: true });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const body = mode === "signup" 
        ? { email, password, metadata: { name } } 
        : { email, password };

      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      if (mode === "signup" && !data.data.session) {
        setSuccessMsg("Account created! Please check your email to verify your account before signing in.");
        setMode("login");
        return;
      }

      // Store token (in a real app, this might be handled by HTTP-only cookies or a more secure storage,
      // but localStorage is fine for this demo)
      if (data.data.session) {
        localStorage.setItem("huzzler_token", data.data.session.access_token);
      }

      navigate({ to: mode === "signup" ? "/onboarding" : "/dashboard" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-white flex flex-col" style={{ overflowX: "clip" }}>
      {/* Top bar */}
      <header className="w-full">
        <div className="mx-auto max-w-6xl px-5 py-5 flex items-center justify-between">
          <Link to="/" aria-label="Huzzler home" className="inline-flex">
            <img
              src="/huzzler-mark.svg"
              alt="Huzzler"
              className="h-10 w-auto transition-transform hover:-rotate-3"
            />
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold text-white/60 hover:text-white transition-colors"
          >
            Back to site
          </Link>
        </div>
      </header>

      {/* Centered form */}
      <main className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="mx-auto inline-flex w-full rounded-full bg-white/5 p-1 ring-2 ring-white/20">
            {(["signup", "login"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleModeChange(m)}
                className={`flex-1 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  mode === m
                    ? "bg-white text-charcoal"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {m === "signup" ? "Create account" : "Sign in"}
              </button>
            ))}
          </div>

          <h1 className="mt-8 font-display text-4xl sm:text-5xl font-bold tracking-tight text-center">
            {mode === "signup" ? "Let's get you shipping." : "Welcome back, huzzler."}
          </h1>

          {/* Social */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <a
              href="http://localhost:3001/api/auth/google"
              className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 py-3 text-sm font-semibold text-white ring-2 ring-white/20 hover:bg-white/10 hover:ring-white/30 transition-all"
            >
              <GoogleIcon />
              Google
            </a>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 py-3 text-sm font-semibold text-white ring-2 ring-white/20 hover:bg-white/10 hover:ring-white/30 transition-all"
            >
              <Github size={16} />
              GitHub
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs font-semibold text-white/40">
            <div className="h-px flex-1 bg-white/10" />
            or
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            {error && (
              <div className="rounded-xl bg-red-500/10 p-3 text-sm font-semibold text-red-500 ring-1 ring-red-500/20">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="rounded-xl bg-green-500/10 p-3 text-sm font-semibold text-green-500 ring-1 ring-green-500/20">
                {successMsg}
              </div>
            )}
            
            {mode === "signup" && (
              <BoldInput 
                placeholder="Your name" 
                type="text" 
                autoComplete="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <BoldInput 
              placeholder="Email address" 
              type="email" 
              autoComplete="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <BoldInput
              placeholder="Password"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {mode === "login" && (
              <div className="pt-1 text-right">
                <a href="#" className="text-sm font-semibold text-white/70 hover:text-white">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-duo w-full flex items-center justify-center gap-2 mt-4 !text-base !py-3.5 disabled:opacity-50"
            >
              {loading ? "Please wait..." : (mode === "signup" ? "Create my account" : "Sign in")}
              {!loading && <ArrowRight size={18} strokeWidth={2.75} />}
            </button>
          </form>

          {mode === "signup" && (
            <p className="mt-5 text-center text-[11px] leading-relaxed text-white/40">
              By continuing you agree to our{" "}
              <a href="#" className="underline hover:text-white/70">Terms</a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-white/70">Privacy</a>.
            </p>
          )}
        </div>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between text-xs text-white/40">
          <span>© {new Date().getFullYear()} Huzzler</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/70 transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BoldInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl bg-white/5 px-5 py-4 text-base font-semibold text-white placeholder:text-white/40 ring-1 ring-white/10 focus:bg-white/10 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
    />
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#fff" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.75-6-6.15S8.7 5.9 12 5.9c1.88 0 3.14.8 3.86 1.5l2.63-2.53C16.83 3.3 14.65 2.4 12 2.4 6.98 2.4 2.9 6.48 2.9 11.5S6.98 20.6 12 20.6c6.93 0 9.2-4.87 9.2-7.35 0-.5-.06-.9-.14-1.25H12z"/>
    </svg>
  );
}
