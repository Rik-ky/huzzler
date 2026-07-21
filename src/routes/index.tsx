import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.png";
import gatewayImg from "@/assets/gateway.png";
import studioImg from "@/assets/studio.png";
import identityImg from "@/assets/identity.png";
import mascotImg from "@/assets/mascot.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Huzzler — Experience as a Software for African Tech Talent" },
      {
        name: "description",
        content:
          "Huzzler is a gamified AI platform that turns junior African tech talent into job-ready professionals through real cross-functional project simulations.",
      },
      { property: "og:title", content: "Huzzler — Experience as a Software" },
      {
        property: "og:description",
        content:
          "Break the no-experience catch-22. Get verified by AI, join real project teams, and build the portfolio that gets you hired.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const roles = [
  { label: "Frontend Engineer", emoji: "💻" },
  { label: "UI / UX Designer", emoji: "🎨" },
  { label: "Product Manager", emoji: "📋" },
  { label: "Data Analyst", emoji: "📊" },
  { label: "AI / ML Engineer", emoji: "🤖" },
  { label: "Backend Engineer", emoji: "🛠️" },
  { label: "QA Tester", emoji: "🔍" },
  { label: "Mobile Developer", emoji: "📱" },
];

function Heatmap() {
  const weeks = 17;
  const days = 7;
  const levels = ["#ebedf0", "#c6f0a1", "#89e219", "#58cc02", "#3ea300"];
  const cells: number[] = [];
  let seed = 42;
  for (let i = 0; i < weeks * days; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    cells.push(r < 0.35 ? 0 : r < 0.55 ? 1 : r < 0.78 ? 2 : r < 0.93 ? 3 : 4);
  }
  return (
    <div
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: weeks }).map((_, w) => (
        <div
          key={w}
          className="grid gap-[3px]"
          style={{ gridTemplateRows: `repeat(${days}, 1fr)` }}
        >
          {Array.from({ length: days }).map((_, d) => (
            <div
              key={d}
              className="aspect-square rounded-[3px]"
              style={{ backgroundColor: levels[cells[w * days + d]] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/85 border-b-2 border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2">
            <img src={mascotImg} alt="" width={40} height={40} className="h-10 w-10" />
            <span className="text-2xl font-black text-primary tracking-tight">huzzler</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-charcoal/80">
            <a href="#loop" className="hover:text-primary">How it works</a>
            <a href="#pillars" className="hover:text-primary">Pillars</a>
            <a href="#profile" className="hover:text-primary">Your profile</a>
            <a href="#roles" className="hover:text-primary">Roles</a>
          </nav>
          <a href="#cta" className="btn-duo !py-2.5 !px-4">Get started</a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 pt-14 pb-16 md:grid-cols-2 md:pt-24 md:pb-24">
          <div className="order-2 md:order-1">
            <span className="chip">🇳🇬 Built for Africa</span>
            <h1 className="mt-5 text-5xl leading-[0.95] md:text-6xl">
              <span className="text-charcoal">Experience</span>{" "}
              <span className="text-primary">as a software.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-charcoal/80 font-semibold">
              The free, fun, AI-powered way for junior African tech talent to earn
              real cross-functional project experience — and finally break the
              no-experience catch-22.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#cta" className="btn-duo">Get started free</a>
              <a href="#loop" className="btn-duo-outline">I already have an account</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-charcoal/70 font-bold">
              <div className="flex items-center gap-2"><span className="text-lg">⚡</span> AI-verified skills</div>
              <div className="flex items-center gap-2"><span className="text-lg">🤝</span> Real team projects</div>
              <div className="flex items-center gap-2"><span className="text-lg">🏆</span> XP & badges</div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-accent/25 via-transparent to-primary/10 blur-2xl" />
            <img
              src={heroImg}
              alt="Diverse African tech team celebrating around a giant laptop"
              width={1200}
              height={1000}
              className="mx-auto w-full max-w-[560px] animate-float drop-shadow-xl"
            />
          </div>
        </div>

        {/* Roles marquee */}
        <div id="roles" className="border-y-2 border-border bg-white">
          <div className="mx-auto max-w-6xl overflow-x-auto px-5 py-4">
            <div className="flex items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-wider text-charcoal/75">
              {roles.concat(roles).map((r, i) => (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  <span className="text-2xl">{r.emoji}</span>
                  {r.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-start">
          <div>
            <span className="chip">The problem</span>
            <h2 className="mt-4 text-4xl md:text-5xl">
              You can't get a job <span className="text-primary">without experience</span>.
              You can't get experience <span className="text-primary">without a job</span>.
            </h2>
          </div>
          <p className="text-lg md:text-xl leading-relaxed text-charcoal/80 font-semibold md:mt-14">
            Bootcamps teach syntax. Tutorials teach patterns. Neither teaches you
            how to ship a feature with a PM breathing down your neck, a designer
            iterating on Figma, and a QA logging bugs.
            <br />
            <br />
            <span className="text-primary font-black">Huzzler simulates the real thing.</span>{" "}
            An AI recruiter verifies you. An AI project manager assembles your
            team. An AI mentor grades your output. You earn XP and a portfolio
            that proves you can actually do the work.
          </p>
        </div>
      </section>

      {/* The Loop */}
      <section id="loop" className="bg-gradient-to-b from-white to-[oklch(0.98_0.02_130)] border-y-2 border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="text-center">
            <span className="chip">The experience loop</span>
            <h2 className="mt-4 text-4xl md:text-5xl">From zero to shipping in 4 steps.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", title: "Gateway task", body: "Pick your role, take a real-world simulation. AI evaluates your submission on a strict rubric.", emoji: "🎯" },
              { n: "02", title: "Verified & profiled", body: "Pass the gateway to unlock your first badge and get tagged with a verified capability.", emoji: "✅" },
              { n: "03", title: "Dynamic team assembly", body: "The AI drafts you into a cross-functional cohort the moment a matching project appears.", emoji: "🧬" },
              { n: "04", title: "Gamified execution", body: "Ship role-specific micro-tasks in an AI-managed workspace. Earn XP. Fill your heatmap.", emoji: "🚀" },
            ].map((s) => (
              <div key={s.n} className="card-duo p-6 relative">
                <div className="absolute -top-4 left-6 chip !bg-primary !text-white !border-primary-shadow">
                  Step {s.n}
                </div>
                <div className="text-4xl mt-2">{s.emoji}</div>
                <h3 className="mt-3 text-xl">{s.title}</h3>
                <p className="mt-2 text-charcoal/75 font-semibold text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="pillars" className="mx-auto max-w-6xl px-5 py-20 md:py-28 space-y-24 md:space-y-32">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <span className="chip">🎓 Pillar 01 — The Gateway</span>
            <h2 className="mt-4 text-4xl md:text-5xl text-primary">AI that knows if you can actually do the job.</h2>
            <p className="mt-5 text-lg text-charcoal/80 font-semibold">
              Every user faces a role-based simulation task. Our AI evaluation
              engine parses your submission against a strict rubric and returns a
              score from 0–100 with qualitative feedback — like a senior manager
              reviewing your first PR.
            </p>
            <ul className="mt-6 space-y-3 font-bold text-charcoal">
              {[
                "Real-world tasks per discipline (Frontend, UI/UX, PM, Data, AI)",
                "Structured JSON rubric scoring — no vibes-based grading",
                "Duolingo-style badge celebrations when you pass",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-xs font-black">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img src={gatewayImg} alt="Huzzler AI evaluator mascot grading a submission" width={900} height={900} loading="lazy" className="mx-auto w-full max-w-[420px] animate-float" />
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1 relative">
            <img src={studioImg} alt="Collaboration tree of a cross-functional Huzzler team" width={900} height={900} loading="lazy" className="mx-auto w-full max-w-[460px] animate-float" />
          </div>
          <div className="order-1 md:order-2">
            <span className="chip">🤝 Pillar 02 — The Studio</span>
            <h2 className="mt-4 text-4xl md:text-5xl text-primary">Dropped into a real team. In minutes.</h2>
            <p className="mt-5 text-lg text-charcoal/80 font-semibold">
              When the AI detects a mock-project — say, <em>"Build a Healthcare
              Landing Page"</em> — it autonomously drafts a team of verified
              users: 1 PM, 2 React engineers, 1 designer, 1 data analyst. You
              drop into a shared workspace with a visual collaboration tree
              showing how everyone connects.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { k: "Auto-planned", v: "Tailored timelines & sprints" },
                { k: "Role-specific", v: "Digestible mini-tasks per role" },
                { k: "Visual", v: "Collaboration tree diagram" },
                { k: "Live", v: "Real-time progress milestones" },
              ].map((f) => (
                <div key={f.k} className="card-duo p-4">
                  <div className="text-xs font-black text-primary uppercase tracking-widest">{f.k}</div>
                  <div className="mt-1 text-sm font-bold text-charcoal/80">{f.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <span className="chip">👤 Pillar 03 — Developer Identity</span>
            <h2 className="mt-4 text-4xl md:text-5xl text-primary">A living portfolio that proves you ship.</h2>
            <p className="mt-5 text-lg text-charcoal/80 font-semibold">
              Every task you complete feeds a GitHub-style contribution heatmap,
              your Trophy Room of skill badges, and your public profile — the
              receipts that get you hired.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["React ⚛️", "Figma 🎨", "PM 📋", "SQL 🧮", "TypeScript 🟦", "Tailwind 🌬", "AI Prompting 🤖"].map((b) => (
                <span key={b} className="chip !bg-white !text-charcoal !border-border">{b}</span>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={identityImg} alt="Huzzler developer identity profile card with heatmap and badges" width={900} height={900} loading="lazy" className="mx-auto w-full max-w-[440px] animate-float" />
          </div>
        </div>
      </section>

      {/* Heatmap Preview */}
      <section id="profile" className="border-y-2 border-border bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] items-center">
            <div>
              <span className="chip">Contribution heatmap</span>
              <h2 className="mt-4 text-4xl md:text-5xl">Consistency, <span className="text-primary">visualized.</span></h2>
              <p className="mt-4 text-lg text-charcoal/80 font-semibold">
                Employers don't want a resume. They want proof. Your Huzzler
                heatmap shows exactly how often you show up and ship.
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm font-bold text-charcoal/70">
                <span>Less</span>
                <div className="flex gap-1">
                  {["#ebedf0", "#c6f0a1", "#89e219", "#58cc02", "#3ea300"].map((c) => (
                    <span key={c} className="h-4 w-4 rounded-[3px]" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
            <div className="card-duo p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-black uppercase tracking-widest text-charcoal/60">Chidi O.</div>
                  <div className="text-xl font-black text-primary">247 contributions this year</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="chip">🔥 12-day streak</span>
                </div>
              </div>
              <Heatmap />
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { k: "Projects", v: "8" },
                  { k: "Tasks shipped", v: "162" },
                  { k: "Badges", v: "17" },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl bg-secondary p-3 text-center">
                    <div className="text-2xl font-black text-primary">{s.v}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-charcoal/60">{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: "10,000+", l: "Verified junior talent" },
            { n: "500+", l: "Mock projects shipped" },
            { n: "43", l: "Cities across Africa" },
          ].map((s) => (
            <div key={s.l} className="card-duo p-8 text-center">
              <div className="text-5xl font-black text-primary">{s.n}</div>
              <div className="mt-2 font-bold text-charcoal/70">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-6xl px-5 pb-24">
        <div className="card-duo relative overflow-hidden p-10 md:p-16 text-center">
          <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-accent/40 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
          <img src={mascotImg} alt="" width={110} height={110} className="mx-auto animate-float relative" />
          <h2 className="mt-4 text-4xl md:text-5xl relative">Ready to earn your <span className="text-primary">first real experience?</span></h2>
          <p className="mt-4 text-lg text-charcoal/75 font-semibold max-w-xl mx-auto relative">
            Join thousands of young African builders using Huzzler to break into
            tech — for free.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 relative">
            <a href="#top" className="btn-duo">Get started free</a>
            <a href="#loop" className="btn-duo-outline">See how it works</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-border bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-charcoal/70 font-bold">
          <div className="flex items-center gap-2">
            <img src={mascotImg} alt="" width={28} height={28} className="h-7 w-7" />
            <span className="text-primary font-black text-lg">huzzler</span>
            <span>· Experience as a software.</span>
          </div>
          <div>© {new Date().getFullYear()} Huzzler · Built for the AI for Africa Innovation Hackathon</div>
        </div>
      </footer>
    </div>
  );
}
