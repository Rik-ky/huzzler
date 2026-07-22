import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BrainCircuit,
  Hammer,
  UserCircle2,
  Users,
  Trophy,
  Settings,
  Flame,
  Gem,
  Zap,
  Rocket,
  Target,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/lib/theme";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your workspace · Huzzler" },
      { name: "description", content: "Your Huzzler workspace: Gateway evaluations, Studio missions, and your builder Identity." },
      { property: "og:title", content: "Your workspace · Huzzler" },
      { property: "og:description", content: "Gateway, Studio, and Identity in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

type NavItem = { key: string; label: string; icon: LucideIcon };

const NAV: NavItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "gateway", label: "Gateway", icon: BrainCircuit },
  { key: "studio", label: "Studio", icon: Hammer },
  { key: "identity", label: "Identity", icon: UserCircle2 },
  { key: "squads", label: "Squads", icon: Users },
  { key: "leaderboard", label: "Leaderboard", icon: Trophy },
  { key: "settings", label: "Settings", icon: Settings },
];

function DashboardPage() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 flex-col border-r border-border px-4 py-6 md:flex">
          <Link to="/" className="mb-8 flex items-center gap-2 px-2">
            <img src="/huzzler-mark.svg" alt="Huzzler" className="h-9 w-9" />
            <span className="font-display text-lg font-bold tracking-tight">Huzzler</span>
          </Link>
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => {
              const isActive = active === n.key;
              const Icon = n.icon;
              const isSettings = n.key === "settings";
              return (
                <div key={n.key} className={isSettings ? "flex items-center gap-2" : undefined}>
                  <button
                    onClick={() => setActive(n.key)}
                    className={`flex flex-1 items-center gap-3 rounded-lg border px-3 py-2.5 text-left font-display text-sm font-bold tracking-tight transition-colors ${
                      isActive
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {n.label}
                  </button>
                  {isSettings && <ThemeToggle className="h-9 w-9 shrink-0" />}
                </div>
              );
            })}
          </nav>

          {/* Promo banner */}
          <div className="mt-6 relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent p-4">
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/30 blur-2xl" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,color-mix(in_oklab,white_18%,transparent)_45%,transparent_60%)]" />
            <div className="relative">
              <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                <Sparkles className="h-3 w-3" /> New
              </div>
              <div className="font-display text-sm font-bold leading-snug">
                Unlock Pro squads
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Ship with senior mentors and get placed faster.
              </p>
              <button className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                Upgrade <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Top header bar */}
          <div className="flex items-center justify-between border-b border-border px-4 py-4 md:px-8">
            <div className="flex items-center gap-3 md:hidden">
              <Link to="/" className="flex items-center gap-2">
                <img src="/huzzler-mark.svg" alt="Huzzler" className="h-8 w-8" />
                <span className="font-display text-lg font-bold">Huzzler</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-semibold text-muted-foreground">Welcome back</div>
              <div className="font-display text-base font-bold tracking-tight">Let's ship something today.</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="md:hidden"><ThemeToggle /></span>
              <button className="btn-duo !py-2.5 !px-5 text-sm">
                <Rocket className="h-4 w-4" />
                New mission
              </button>
            </div>
          </div>

          <div className="px-4 py-6 md:px-8">


          {/* Metric cards - horizontal */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <MetricCard icon={Flame} label="Streak" value="7 days" delta="+2 this wk" tone="fire" />
            <MetricCard icon={Gem} label="XP earned" value="1,240" delta="+180 today" tone="primary" />
            <MetricCard icon={Trophy} label="Rank" value="#28" delta="↑ 12" tone="gold" />
            <MetricCard icon={Zap} label="Missions shipped" value="4" delta="2 in review" tone="primary" />
          </div>

          {/* Three-pillar row */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <PillarCard
              icon={BrainCircuit}
              tag="Gateway"
              title="AI Evaluation"
              body="Your last skill assessment scored 82. Retake to level up your placement."
              cta="Open Gateway"
              progress={82}
            />
            <PillarCard
              icon={Hammer}
              tag="Studio"
              title="Active mission"
              body="Ship v0.2 of Marketplace search with the Amala squad. Due in 3 days."
              cta="Continue building"
              progress={45}
            />
            <PillarCard
              icon={UserCircle2}
              tag="Identity"
              title="Portfolio"
              body="3 verified contributions. Your builder profile is 70% complete."
              cta="View profile"
              progress={70}
            />
          </div>

          {/* Missions + Squad row */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="card-duo p-5 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="font-display text-lg font-bold">Current missions</div>
                  <div className="text-xs text-muted-foreground">Real product work, shipped with your squad.</div>
                </div>
                <button className="text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                  View all
                </button>
              </div>
              <div className="flex flex-col divide-y divide-border">
                <MissionRow
                  title="Build search filters"
                  product="Amala Marketplace"
                  status="In progress"
                  due="3d"
                  icon={Target}
                />
                <MissionRow
                  title="Wire checkout webhook"
                  product="PayNow"
                  status="In review"
                  due="1d"
                  icon={Clock}
                />
                <MissionRow
                  title="Onboarding illustrations"
                  product="LagosCare"
                  status="Shipped"
                  due="Done"
                  icon={CheckCircle2}
                />
                <MissionRow
                  title="Pricing page copy"
                  product="Zowa"
                  status="Backlog"
                  due="5d"
                  icon={Sparkles}
                />
              </div>
            </div>

            {/* Squad + daily quests stack */}
            <div className="flex flex-col gap-4">
              <div className="card-duo p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="font-display text-base font-bold">Your squad</div>
                  <span className="chip">Amala</span>
                </div>
                <div className="flex -space-x-2">
                  {["A", "T", "K", "N", "+2"].map((c, i) => (
                    <div
                      key={i}
                      className="grid h-9 w-9 place-items-center rounded-full ring-2 ring-card bg-primary/15 text-primary font-display text-sm font-bold"
                    >
                      {c}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  4 builders shipping a marketplace for street food vendors in Lagos.
                </p>
              </div>

              <div className="card-duo p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="font-display text-base font-bold">Daily quests</div>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <QuestRow icon={Zap} title="Earn 50 XP" progress={30} total={50} />
                <QuestRow icon={Rocket} title="Ship one PR" progress={0} total={1} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta: string;
  tone: "primary" | "fire" | "gold";
}) {
  const toneClass =
    tone === "fire"
      ? "text-[color:var(--fire)] bg-[color:var(--fire)]/10 ring-[color:var(--fire)]/25"
      : tone === "gold"
      ? "text-[color:var(--gold)] bg-[color:var(--gold)]/10 ring-[color:var(--gold)]/25"
      : "text-primary bg-primary/10 ring-primary/25";
  return (
    <div className="card-duo p-4">
      <div className="flex items-center justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ring-2 ${toneClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {delta}
        </span>
      </div>
      <div className="mt-3 font-display text-2xl font-bold tracking-tight">{value}</div>
      <div className="text-xs font-semibold text-muted-foreground">{label}</div>
    </div>
  );
}

function PillarCard({
  icon: Icon,
  tag,
  title,
  body,
  cta,
  progress,
}: {
  icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
  cta: string;
  progress: number;
}) {
  return (
    <div className="card-duo p-5 flex flex-col">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 ring-2 ring-primary/25 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <span className="chip">{tag}</span>
      </div>
      <div className="mt-3 font-display text-lg font-bold tracking-tight">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
      <button className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-bold text-primary hover:underline">
        {cta} <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function MissionRow({
  title,
  product,
  status,
  due,
  icon: Icon,
}: {
  title: string;
  product: string;
  status: string;
  due: string;
  icon: LucideIcon;
}) {
  const statusTone =
    status === "Shipped"
      ? "bg-primary/15 text-primary"
      : status === "In review"
      ? "bg-[color:var(--gold)]/15 text-[color:var(--gold)]"
      : status === "Backlog"
      ? "bg-muted text-muted-foreground"
      : "bg-primary/10 text-primary";
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted ring-2 ring-border text-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-display text-sm font-bold">{title}</div>
        <div className="truncate text-xs text-muted-foreground">{product}</div>
      </div>
      <span className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider sm:inline ${statusTone}`}>
        {status}
      </span>
      <span className="w-12 shrink-0 text-right text-xs font-semibold text-muted-foreground">{due}</span>
    </div>
  );
}

function QuestRow({ icon: Icon, title, progress, total }: { icon: LucideIcon; title: string; progress: number; total: number }) {
  const pct = Math.round((progress / total) * 100);
  return (
    <div className="mt-2 flex items-center gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 ring-2 ring-primary/25 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="font-semibold">{title}</span>
          <span className="text-xs text-muted-foreground">{progress}/{total}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
