import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Home,
  Trophy,
  Target,
  Users,
  User,
  MoreHorizontal,
  Flame,
  Gem,
  Heart,
  BookOpen,
  Star,
  Lock,
  Package,
  Zap,
  ChevronRight,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/lib/theme";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your path · Huzzler" },
      { name: "description", content: "Your Huzzler workspace: missions, squads, and the products you're shipping." },
      { property: "og:title", content: "Your path · Huzzler" },
      { property: "og:description", content: "Missions, squads, and the products you're shipping." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

type NavItem = { key: string; label: string; icon: LucideIcon };

const NAV: NavItem[] = [
  { key: "path", label: "Path", icon: Home },
  { key: "board", label: "Leaderboard", icon: Trophy },
  { key: "quests", label: "Quests", icon: Target },
  { key: "squads", label: "Squads", icon: Users },
  { key: "profile", label: "Profile", icon: User },
  { key: "more", label: "More", icon: MoreHorizontal },
];

type Node =
  | { kind: "start"; label: string }
  | { kind: "task"; icon: LucideIcon; state: "active" | "locked" | "done"; title: string }
  | { kind: "chest"; state: "locked" | "open" }
  | { kind: "trophy"; state: "locked" };

const NODES: Node[] = [
  { kind: "start", label: "Start" },
  { kind: "task", icon: Star, state: "active", title: "Kickoff brief" },
  { kind: "task", icon: BookOpen, state: "locked", title: "Product spec" },
  { kind: "chest", state: "locked" },
  { kind: "task", icon: Zap, state: "locked", title: "Ship v0.1" },
  { kind: "task", icon: Package, state: "locked", title: "First review" },
  { kind: "trophy", state: "locked" },
];

function DashboardPage() {
  const [active, setActive] = useState("path");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1400px] gap-6 px-4 py-6">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 flex-col md:flex">
          <Link to="/" className="mb-6 flex items-center gap-2">
            <img src="/huzzler-mark.svg" alt="Huzzler" className="h-9 w-9" />
          </Link>
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => {
              const isActive = active === n.key;
              const Icon = n.icon;
              return (
                <button
                  key={n.key}
                  onClick={() => setActive(n.key)}
                  className={`flex items-center gap-3 rounded-2xl border-2 px-3 py-2.5 text-left font-display text-sm font-bold uppercase tracking-wide transition-colors ${
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
          <div className="mt-auto pt-4">
            <ThemeToggle />
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Mobile top bar */}
          <div className="mb-4 flex items-center justify-between md:hidden">
            <Link to="/" className="flex items-center gap-2">
              <img src="/huzzler-mark.svg" alt="Huzzler" className="h-8 w-8" />
            </Link>
            <ThemeToggle />
          </div>

          {/* Mission header */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary to-[color-mix(in_oklab,var(--primary)_75%,black)] p-5 text-primary-foreground shadow-[0_10px_0_-4px_color-mix(in_oklab,var(--primary)_55%,black)]">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-90">
                  <ChevronRight className="h-3 w-3" /> Sprint 1 · Mission 1
                </div>
                <h1 className="mt-1 truncate font-display text-2xl font-bold tracking-tight">
                  Ship your first feature
                </h1>
              </div>
              <button className="hidden shrink-0 items-center gap-2 rounded-2xl bg-background/15 px-4 py-2 font-display text-sm font-bold uppercase tracking-wide ring-2 ring-background/30 hover:bg-background/25 sm:inline-flex">
                <BookOpen className="h-4 w-4" />
                Playbook
              </button>
            </div>
          </div>

          {/* Path */}
          <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-8 pb-16">
            {NODES.map((node, i) => (
              <PathNode key={i} node={node} offset={i} />
            ))}
            <div className="pt-2 text-center text-sm text-muted-foreground">Introduce yourself to your squad</div>
          </div>
        </main>

        {/* Right rail */}
        <aside className="hidden w-80 shrink-0 flex-col gap-4 lg:flex">
          {/* Stats row */}
          <div className="flex items-center justify-between rounded-2xl border-2 border-border bg-card px-4 py-3">
            <Stat icon={Flame} value="7" color="text-[color:var(--fire)]" />
            <Stat icon={Gem} value="500" color="text-primary" />
            <Stat icon={Heart} value="5" color="text-rose-500" />
          </div>

          {/* Unlock card */}
          <div className="card-duo p-4">
            <div className="mb-2 font-display text-base font-bold">Unlock the Leaderboard</div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-muted ring-2 ring-border">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Finish 3 more tasks to start competing with your cohort.
              </p>
            </div>
          </div>

          {/* Daily quests */}
          <div className="card-duo p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="font-display text-base font-bold">Daily Quests</div>
              <button className="text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                View all
              </button>
            </div>
            <QuestRow icon={Zap} title="Earn 10 XP" progress={0} total={10} />
            <QuestRow icon={Rocket} title="Ship one commit" progress={0} total={1} />
          </div>

          {/* CTA */}
          <div className="card-duo p-4">
            <div className="mb-3 font-display text-base font-bold">Save your progress</div>
            <div className="flex flex-col gap-2">
              <Link to="/auth" className="btn-duo">Create a profile</Link>
              <Link to="/auth" className="btn-duo-outline">Sign in</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, value, color }: { icon: LucideIcon; value: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className={`h-5 w-5 ${color}`} />
      <span className="font-display text-base font-bold">{value}</span>
    </div>
  );
}

function QuestRow({ icon: Icon, title, progress, total }: { icon: LucideIcon; title: string; progress: number; total: number }) {
  const pct = Math.round((progress / total) * 100);
  return (
    <div className="mt-2 flex items-center gap-3">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 ring-2 ring-primary/25 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="font-semibold">{title}</span>
          <span className="text-xs text-muted-foreground">{progress}/{total}</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

function PathNode({ node, offset }: { node: Node; offset: number }) {
  // gentle horizontal sway
  const sway = [0, 60, 40, 0, -40, -60, 0][offset % 7];
  const style = { transform: `translateX(${sway}px)` };

  if (node.kind === "start") {
    return (
      <div style={style} className="flex flex-col items-center">
        <div className="mb-1 rounded-lg bg-card px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground ring-2 ring-border">
          {node.label}
        </div>
        <div className="animate-pulse-ring grid h-20 w-20 place-items-center rounded-full border-b-[6px] border-primary-shadow bg-primary text-primary-foreground">
          <Star className="h-8 w-8 fill-current" />
        </div>
      </div>
    );
  }
  if (node.kind === "chest") {
    return (
      <div style={style}>
        <div className="grid h-16 w-16 place-items-center rounded-2xl border-b-4 border-border bg-muted text-muted-foreground">
          <Package className="h-7 w-7" />
        </div>
      </div>
    );
  }
  if (node.kind === "trophy") {
    return (
      <div style={style}>
        <div className="grid h-16 w-16 place-items-center rounded-full border-b-4 border-border bg-muted text-muted-foreground">
          <Trophy className="h-7 w-7" />
        </div>
      </div>
    );
  }
  const isActive = node.state === "active";
  const Icon = node.icon;
  return (
    <div style={style} className="flex flex-col items-center">
      <div
        className={`grid h-16 w-16 place-items-center rounded-full border-b-4 ${
          isActive
            ? "bg-primary text-primary-foreground border-primary-shadow"
            : "bg-muted text-muted-foreground border-border"
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>
      {isActive && (
        <div className="mt-2 text-xs font-semibold text-foreground">{node.title}</div>
      )}
    </div>
  );
}
