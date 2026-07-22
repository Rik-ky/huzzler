import {
  BrainCircuit,
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
  Users,
  FileCheck2,
  MessageSquare,
  Trophy,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type Stage = {
  id: string;
  title: string;
  kind: "AI" | "Human";
  status: "passed" | "active" | "locked";
  score?: number;
  desc: string;
  icon: LucideIcon;
};

const STAGES: Stage[] = [
  {
    id: "s1",
    title: "AI Skills Screener",
    kind: "AI",
    status: "passed",
    score: 88,
    desc: "Adaptive multi-domain screener across problem solving, craft and communication.",
    icon: BrainCircuit,
  },
  {
    id: "s2",
    title: "Portfolio Review",
    kind: "AI",
    status: "passed",
    score: 82,
    desc: "Your work samples were parsed and scored for depth, originality and shipping evidence.",
    icon: FileCheck2,
  },
  {
    id: "s3",
    title: "Live Craft Challenge",
    kind: "AI",
    status: "active",
    desc: "A 90 minute build session evaluated live by Huzzler, your AI agent.",
    icon: Play,
  },
  {
    id: "s4",
    title: "Human Panel Interview",
    kind: "Human",
    status: "locked",
    desc: "A 30 minute conversation with two operators from the Huzzler network.",
    icon: MessageSquare,
  },
  {
    id: "s5",
    title: "Placement Ready",
    kind: "Human",
    status: "locked",
    desc: "Your profile is unlocked to receive live offers in the Studio.",
    icon: Trophy,
  },
];

export function GatewayView({ onGoToStudio }: { onGoToStudio: () => void }) {
  const passed = STAGES.filter((s) => s.status === "passed").length;
  const total = STAGES.length;
  const pct = Math.round((passed / total) * 100);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <span className="chip w-fit">Gateway</span>
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          AI Evaluation, then a human panel.
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Move through the Gateway to unlock real offers in the Studio. Every stage is graded, timed
          and stored on your builder Identity.
        </p>
      </header>

      {/* Progress banner */}
      <div className="card-duo relative overflow-hidden p-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Overall progress
            </div>
            <div className="mt-1 font-display text-2xl font-bold">
              {passed} of {total} stages cleared
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Clear the Live Craft Challenge to unlock the human panel.
            </p>
          </div>
          <div className="flex w-full max-w-xs flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Gateway readiness</span>
              <span className="text-primary">{pct}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stages */}
      <div className="flex flex-col gap-3">
        {STAGES.map((stage, i) => (
          <StageCard
            key={stage.id}
            index={i + 1}
            stage={stage}
            onGoToStudio={onGoToStudio}
          />
        ))}
      </div>

      {/* Reward panel */}
      <div className="card-duo flex flex-col gap-3 border-primary/30 bg-primary/5 p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary ring-2 ring-primary/25">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-base font-bold">What you unlock</div>
            <p className="text-sm text-muted-foreground">
              Verified badge, real offers from vetted teams, and a squad placement in the Studio.
            </p>
          </div>
        </div>
        <button onClick={onGoToStudio} className="btn-duo-outline !py-2.5 !px-4 text-sm">
          <Users className="h-4 w-4" />
          Peek the Studio
        </button>
      </div>
    </div>
  );
}

function StageCard({
  index,
  stage,
  onGoToStudio,
}: {
  index: number;
  stage: Stage;
  onGoToStudio: () => void;
}) {
  const Icon = stage.icon;
  const isPassed = stage.status === "passed";
  const isActive = stage.status === "active";
  const isLocked = stage.status === "locked";

  const statusTone = isPassed
    ? "bg-primary/15 text-primary"
    : isActive
    ? "bg-[color:var(--gold)]/15 text-[color:var(--gold)]"
    : "bg-muted text-muted-foreground";

  return (
    <div
      className={`card-duo flex flex-col gap-3 p-4 md:flex-row md:items-center md:gap-5 md:p-5 ${
        isActive ? "ring-2 ring-primary/40" : ""
      } ${isLocked ? "opacity-70" : ""}`}
    >
      <div className="flex items-center gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted font-display text-sm font-bold text-muted-foreground ring-2 ring-border">
          {String(index).padStart(2, "0")}
        </div>
        <div
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
            isPassed
              ? "bg-primary/10 text-primary ring-2 ring-primary/25"
              : isActive
              ? "bg-[color:var(--gold)]/10 text-[color:var(--gold)] ring-2 ring-[color:var(--gold)]/30"
              : "bg-muted text-muted-foreground ring-2 ring-border"
          }`}
        >
          {isLocked ? <Lock className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="font-display text-base font-bold">{stage.title}</div>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {stage.kind}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusTone}`}
          >
            {isPassed ? `Passed · ${stage.score}` : isActive ? "In progress" : "Locked"}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{stage.desc}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {isPassed && (
          <div className="inline-flex items-center gap-1 text-xs font-bold text-primary">
            <CheckCircle2 className="h-4 w-4" /> Cleared
          </div>
        )}
        {isActive && (
          <button className="btn-duo !py-2 !px-4 text-sm">
            Start now <ArrowRight className="h-4 w-4" />
          </button>
        )}
        {isLocked && stage.id === "s5" && (
          <button
            onClick={onGoToStudio}
            className="btn-duo-outline !py-2 !px-4 text-sm"
          >
            Preview offers
          </button>
        )}
      </div>
    </div>
  );
}
