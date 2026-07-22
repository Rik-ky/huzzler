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
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/lib/theme";
import { GatewayView } from "@/components/dashboard/GatewayView";
import { StudioView } from "@/components/dashboard/StudioView";
import { SquadsView } from "@/components/dashboard/SquadsView";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your workspace · Huzzler" },
      { name: "description", content: "Your Huzzler workspace: Gateway evaluations, Studio missions, and your builder Identity." },
      { property: "og:title", content: "Your workspace · Huzzler" },
      { property: "og:description", content: "Gateway, Studio, and Identity in one place." },
      { property: "og:url", content: "/dashboard" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Your workspace · Huzzler" },
      { name: "twitter:description", content: "Gateway, Studio, and Identity in one place." },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/dashboard" }],
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
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [squadContext, setSquadContext] = useState<string | null>(null);

  const goTo = (key: string) => {
    setActive(key);
    setMobileOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        {/* Sidebar */}
        <aside
          className={`hidden shrink-0 flex-col border-r border-border bg-background py-6 md:sticky md:top-0 md:z-30 md:h-screen md:overflow-y-auto md:flex transition-[width] duration-300 ease-out ${
            collapsed ? "w-20 px-2" : "w-60 px-4"
          }`}
        >
          <div className={`mb-8 flex items-center ${collapsed ? "flex-col gap-3" : "justify-between"}`}>
            <Link to="/" className="flex items-center px-2">
              {collapsed ? (
                <img src="/huzzler-mark.svg" alt="Huzzler" className="h-9 w-9" />
              ) : (
                <img src="/huzzler-logo-darkmode.svg" alt="Huzzler" className="h-8 w-auto" />
              )}
            </Link>
            <button
              onClick={() => setCollapsed((v) => !v)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="grid h-7 w-7 place-items-center rounded-full border border-primary/40 bg-gradient-to-b from-primary/20 to-primary/5 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:from-primary/30 hover:to-primary/10 hover:scale-105 active:scale-95 transition-all"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => {
              const isActive = active === n.key;
              const Icon = n.icon;
              return (
                <button
                  key={n.key}
                  onClick={() => goTo(n.key)}
                  title={collapsed ? n.label : undefined}
                  className={`flex items-center gap-3 rounded-lg border py-2.5 text-left font-display text-sm font-bold tracking-tight transition-colors ${
                    collapsed ? "justify-center px-2" : "px-3"
                  } ${
                    isActive
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {!collapsed && n.label}
                </button>
              );
            })}
          </nav>

          {/* Promo banner */}
          {!collapsed && (
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
          )}
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Top header bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/95 px-4 py-4 backdrop-blur md:px-8">
            <div className="flex items-center gap-3 md:hidden">
              <Link to="/" className="flex items-center">
                <img src="/huzzler-mark.svg" alt="Huzzler" className="h-8 w-8" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-semibold text-muted-foreground">Welcome back</div>
              <div className="font-display text-base font-bold tracking-tight">Let's ship something today.</div>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />
              <button className="btn-duo !py-2.5 !px-5 text-sm">
                <Rocket className="h-4 w-4" />
                Try AI Assessments
              </button>
            </div>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-muted text-foreground md:hidden hover:border-primary/40 hover:text-primary transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 py-6 md:px-8">


          {active === "overview" && (
            <>
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
              body="You have cleared 2 of 5 Gateway stages. Live Craft Challenge is up next."
              cta="Open Gateway"
              progress={40}
              onClick={() => goTo("gateway")}
            />
            <PillarCard
              icon={Hammer}
              tag="Studio"
              title="Active engagements"
              body="2 live roles including your Amala Marketplace internship. 3 new offers waiting."
              cta="Open Studio"
              progress={60}
              onClick={() => goTo("studio")}
            />
            <PillarCard
              icon={Users}
              tag="Squads"
              title="Amala Squad"
              body="4 builders shipping v0.2 of Marketplace search. Standup today at 4:00 PM WAT."
              cta="Open squad"
              progress={70}
              onClick={() => goTo("squads")}
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
                <button onClick={() => goTo("studio")} className="text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                  View all
                </button>
              </div>
              <div className="flex flex-col divide-y divide-border">
                <MissionRow title="Build search filters" product="Amala Marketplace" status="In progress" due="3d" icon={Target} />
                <MissionRow title="Wire checkout webhook" product="PayNow" status="In review" due="1d" icon={Clock} />
                <MissionRow title="Onboarding illustrations" product="LagosCare" status="Shipped" due="Done" icon={CheckCircle2} />
                <MissionRow title="Pricing page copy" product="Zowa" status="Backlog" due="5d" icon={Sparkles} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="card-duo p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="font-display text-base font-bold">Your squad</div>
                  <span className="chip">Amala</span>
                </div>
                <div className="flex -space-x-2">
                  {["A", "T", "K", "N", "+2"].map((c, i) => (
                    <div key={i} className="grid h-9 w-9 place-items-center rounded-full ring-2 ring-card bg-primary/15 text-primary font-display text-sm font-bold">
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
            </>
          )}

          {active === "gateway" && <GatewayView onGoToStudio={() => goTo("studio")} />}
          {active === "studio" && (
            <StudioView
              onOpenSquad={(mission) => {
                setSquadContext(mission);
                goTo("squads");
              }}
            />
          )}
          {active === "squads" && <SquadsView activeMission={squadContext} />}
          {active !== "overview" && active !== "gateway" && active !== "studio" && active !== "squads" && (
            <div className="card-duo grid place-items-center p-16 text-center">
              <Sparkles className="mb-3 h-8 w-8 text-primary" />
              <div className="font-display text-lg font-bold">Coming soon</div>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                We are prioritising Gateway, Studio and Squads for this build. This section unlocks next.
              </p>
            </div>
          )}
          </div>
        </main>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed left-0 top-0 z-50 h-full w-[280px] max-w-[80vw] border-r border-border bg-background p-5 md:hidden">
            <div className="mb-6 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <img src="/huzzler-logo-darkmode.svg" alt="Huzzler" className="h-7 w-auto" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <button className="btn-duo mb-6 w-full justify-center text-sm">
              <Rocket className="h-4 w-4" />
              New mission
            </button>

            <nav className="flex flex-col gap-1">
              {NAV.map((n) => {
                const isActive = active === n.key;
                const Icon = n.icon;
                return (
                  <button
                    key={n.key}
                    onClick={() => goTo(n.key)}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-left font-display text-sm font-bold tracking-tight transition-colors ${
                      isActive
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {n.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 flex items-center justify-between rounded-xl border border-border bg-muted p-3">
              <span className="text-sm font-semibold">Appearance</span>
              <ThemeToggle />
            </div>
          </div>
        </>
      )}
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
  onClick,
}: {
  icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
  cta: string;
  progress: number;
  onClick?: () => void;
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
      <button onClick={onClick} className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-bold text-primary hover:underline">
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
