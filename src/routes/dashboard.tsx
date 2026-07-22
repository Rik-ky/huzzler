import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
  Wallet,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/lib/theme";
import { GatewayView } from "@/components/dashboard/GatewayView";
import { StudioView } from "@/components/dashboard/StudioView";
import { SquadsView } from "@/components/dashboard/SquadsView";
import { AgentOrb } from "@/components/dashboard/AgentOrb";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your workspace · Huzzler" },
      { name: "description", content: "Your Huzzler workspace: Onboarding, Opportunities, Squads and Earnings in one place." },
      { property: "og:title", content: "Your workspace · Huzzler" },
      { property: "og:description", content: "Onboarding, Opportunities, Squads and Earnings in one place." },
      { property: "og:url", content: "/dashboard" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Your workspace · Huzzler" },
      { name: "twitter:description", content: "Onboarding, Opportunities, Squads and Earnings in one place." },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/dashboard" }],
  }),
  component: DashboardPage,
});

type NavItem = { key: string; label: string; icon: LucideIcon };

const NAV: NavItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "onboarding", label: "Onboarding", icon: BrainCircuit },
  { key: "opportunities", label: "Opportunities", icon: Hammer },
  { key: "squads", label: "Squads", icon: Users },
  { key: "earnings", label: "Earnings", icon: Wallet },
  { key: "settings", label: "Settings", icon: Settings },
];


function DashboardPage() {
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [squadContext, setSquadContext] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("huzzler_token");
      if (!token) return;
      try {
        const res = await fetch("http://127.0.0.1:3001/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

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

  useEffect(() => {
    const autoNav = sessionStorage.getItem("huzzler_auto_nav");
    if (autoNav) {
      setActive(autoNav);
      sessionStorage.removeItem("huzzler_auto_nav");
    }
  }, []);

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
              <Link to="/assessments" className="btn-duo !py-2.5 !px-5 text-sm">
                <Rocket className="h-4 w-4" />
                Try AI Assessments
              </Link>
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
              tag="Onboarding"
              title="AI Evaluation"
              body="You have cleared 2 of 5 Onboarding stages. Live Craft Challenge is up next."
              cta="Open Onboarding"
              progress={40}
              onClick={() => goTo("onboarding")}
            />
            <PillarCard
              icon={Hammer}
              tag="Opportunities"
              title="Active engagements"
              body="2 live roles including your Amala Marketplace internship. 3 new offers waiting."
              cta="Open Opportunities"
              progress={60}
              onClick={() => goTo("opportunities")}
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
                <button onClick={() => goTo("opportunities")} className="text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                  View all
                </button>
              </div>
              <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-border rounded-xl">
                <Target className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
                <p className="text-sm font-medium">No active missions yet.</p>
                <p className="text-xs text-muted-foreground">Accept an offer to get started.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="card-duo p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="font-display text-base font-bold">Your squad</div>
                </div>
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Users className="h-6 w-6 text-muted-foreground mb-2 opacity-50" />
                  <p className="text-xs text-muted-foreground">
                    You haven't been assigned to a squad yet.
                  </p>
                </div>
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

          {active === "onboarding" && <GatewayView onGoToStudio={() => goTo("opportunities")} />}
          {active === "opportunities" && (
            <StudioView
              onOpenSquad={(mission) => {
                setSquadContext(mission);
                goTo("squads");
              }}
            />
          )}
          {active === "squads" && <SquadsView activeMission={squadContext} />}
          {active === "earnings" && <EarningsView />}
          {active === "settings" && <SettingsView user={user} />}
          {active !== "overview" &&
            active !== "onboarding" &&
            active !== "opportunities" &&
            active !== "squads" &&
            active !== "earnings" &&
            active !== "settings" && (
            <div className="card-duo grid place-items-center p-16 text-center">
              <Sparkles className="mb-3 h-8 w-8 text-primary" />
              <div className="font-display text-lg font-bold">Coming soon</div>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                This section unlocks next.
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

            <Link
              to="/assessments"
              onClick={() => setMobileOpen(false)}
              className="btn-duo mb-6 w-full justify-center text-sm"
            >
              <Rocket className="h-4 w-4" />
              Try AI Assessments
            </Link>

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

      <AgentOrb />
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

function EarningsView() {
  const txns = [
    { id: 1, label: "Amala Marketplace · Week 4 stipend", amount: "+₦180,000", date: "Jul 18, 2026", status: "Paid" },
    { id: 2, label: "PayNow · Growth experiment bonus", amount: "+₦95,000", date: "Jul 12, 2026", status: "Paid" },
    { id: 3, label: "Amala Marketplace · Week 3 stipend", amount: "+₦180,000", date: "Jul 11, 2026", status: "Paid" },
    { id: 4, label: "LagosCare · Internship completion", amount: "+₦350,000", date: "Jun 28, 2026", status: "Paid" },
    { id: 5, label: "Zowa · Offer acceptance bonus", amount: "+₦120,000", date: "Pending", status: "Pending" },
  ];
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <span className="chip w-fit">Earnings</span>
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          What you have earned by shipping.
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Stipends, bonuses and completion payouts from every mission you deliver on Huzzler.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="card-duo p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Lifetime</div>
          <div className="mt-2 font-display text-3xl font-bold">₦1,925,000</div>
          <div className="mt-1 text-xs text-primary">+₦275k this month</div>
        </div>
        <div className="card-duo p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Available</div>
          <div className="mt-2 font-display text-3xl font-bold">₦455,000</div>
          <button className="btn-duo mt-3 !py-2 !px-4 text-sm">Withdraw</button>
        </div>
        <div className="card-duo p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pending</div>
          <div className="mt-2 font-display text-3xl font-bold">₦120,000</div>
          <div className="mt-1 text-xs text-muted-foreground">Clears on Jul 30, 2026</div>
        </div>
      </div>

      <div className="card-duo p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="font-display text-base font-bold">Transactions</div>
          <button className="text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            Export CSV
          </button>
        </div>
        <div className="divide-y divide-border">
          {txns.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-3">
              <div className="min-w-0">
                <div className="truncate font-display text-sm font-bold">{t.label}</div>
                <div className="text-xs text-muted-foreground">{t.date}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`hidden rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider sm:inline ${
                  t.status === "Paid" ? "bg-primary/15 text-primary" : "bg-[color:var(--gold)]/15 text-[color:var(--gold)]"
                }`}>
                  {t.status}
                </span>
                <span className="font-display text-sm font-bold text-primary">{t.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsView({ user }: { user?: any }) {
  const name = user?.user_metadata?.full_name || user?.user_metadata?.name || "Ada Kola";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2) || "AK";
  const email = user?.email || "ada@huzzler.dev";

  const onboarding = user?.user_metadata?.onboarding || {};
  
  const craftMap: Record<string, string> = {
    eng: "Engineering",
    design: "Design",
    product: "Product Management",
    marketing: "Marketing",
    data: "Data Science",
    ops: "Operations",
  };

  const levelMap: Record<string, string> = {
    starting: "Beginner",
    some: "Side Project Builder",
    junior: "Junior Builder",
    mid: "Mid-level Builder",
  };

  const goalMap: Record<string, string> = {
    ship: "Ship real product",
    hired: "Get hired",
    portfolio: "Build portfolio",
    team: "Team builder",
  };

  const craftLabel = craftMap[onboarding.craft] || "Full-stack";
  const levelLabel = levelMap[onboarding.level] || "Builder";
  const goalLabel = goalMap[onboarding.goal];

  const tags = [
    craftLabel,
    ...(levelLabel ? [levelLabel] : []),
    ...(goalLabel ? [goalLabel] : []),
  ];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <span className="chip w-fit">Settings</span>
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          Your identity and preferences.
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Your builder Identity, account details and app preferences all in one place.
        </p>
      </header>

      {/* Identity */}
      <div className="card-duo p-5 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <UserCircle2 className="h-4 w-4 text-primary" />
          <div className="font-display text-base font-bold">Builder Identity</div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/15 font-display text-xl font-bold text-primary ring-2 ring-primary/25">
              {initials}
            </div>
            <div>
              <div className="font-display text-lg font-bold">{name}</div>
              <div className="text-sm text-muted-foreground">{craftLabel} · {levelLabel}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button className="btn-duo-outline !py-2 !px-4 text-sm">Edit profile</button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <IdentityStat label="Missions" value="4" />
          <IdentityStat label="XP" value="1,240" />
          <IdentityStat label="Endorsements" value="17" />
        </div>
      </div>

      {/* Account */}
      <div className="card-duo p-5">
        <div className="mb-3 font-display text-base font-bold">Account</div>
        <div className="divide-y divide-border">
          <SettingRow label="Email" value={email} />
          <SettingRow label="Phone" value="+234 810 000 0000" />
          <SettingRow label="Payout method" value="Bank · GTBank ****1234" />
          <SettingRow label="Password" value="Last changed 2 weeks ago" />
        </div>
      </div>

      {/* Preferences */}
      <div className="card-duo p-5">
        <div className="mb-3 font-display text-base font-bold">Preferences</div>
        <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 p-3">
          <div>
            <div className="text-sm font-semibold">Appearance</div>
            <div className="text-xs text-muted-foreground">Switch between light and dark mode.</div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Session / Log out */}
      <div className="card-duo p-5 border-red-500/20 bg-red-500/5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-base font-bold text-red-500">Sign out</div>
            <div className="text-xs text-muted-foreground">Log out of your Huzzler account on this device.</div>
          </div>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("huzzler_token");
              window.location.href = "/auth?mode=login";
            }}
            className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-bold text-red-500 ring-1 ring-red-500/20 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

function IdentityStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/40 p-3 text-center">
      <div className="font-display text-xl font-bold">{value}</div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="text-sm font-semibold text-muted-foreground">{label}</div>
      <div className="flex items-center gap-3">
        <span className="text-sm">{value}</span>
        <button className="text-xs font-bold uppercase tracking-wider text-primary hover:underline">Edit</button>
      </div>
    </div>
  );
}
