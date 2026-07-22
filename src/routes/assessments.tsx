import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Code2,
  Palette,
  Compass,
  Megaphone,
  Database,
  Wrench,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/lib/theme";
import { AgentMark } from "@/components/dashboard/AgentOrb";

export const Route = createFileRoute("/assessments")({
  head: () => ({
    meta: [
      { title: "AI Assessments · Huzzler" },
      { name: "description", content: "Practice while you learn. Pick a domain and let Huzzler grade you in real time." },
      { property: "og:title", content: "AI Assessments · Huzzler" },
      { property: "og:description", content: "Practice while you learn. Pick a domain and let Huzzler grade you in real time." },
      { property: "og:url", content: "/assessments" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AI Assessments · Huzzler" },
      { name: "twitter:description", content: "Practice while you learn." },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/assessments" }],
  }),
  component: AssessmentsPage,
});

type Domain = {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
};

const DOMAINS: Domain[] = [
  { id: "eng", label: "Engineering", hint: "Frontend, backend, systems", icon: Code2 },
  { id: "design", label: "Design", hint: "Product, UI, brand", icon: Palette },
  { id: "product", label: "Product", hint: "Discovery, PRDs, priorities", icon: Compass },
  { id: "marketing", label: "Marketing", hint: "Copy, growth loops, ads", icon: Megaphone },
  { id: "data", label: "Data", hint: "SQL, analysis, dashboards", icon: Database },
  { id: "ops", label: "Ops", hint: "Process, tooling, people", icon: Wrench },
];

type Question = {
  prompt: string;
  lesson: string;
  options: { id: string; label: string; correct?: boolean }[];
};

const BANK: Record<string, Question[]> = {
  eng: [
    {
      prompt: "Which HTTP status best signals a validation error on POST?",
      lesson:
        "422 Unprocessable Entity is used when the request is well-formed but semantically invalid. 400 is fine as a fallback, but 422 is more specific.",
      options: [
        { id: "a", label: "200 OK" },
        { id: "b", label: "302 Found" },
        { id: "c", label: "422 Unprocessable Entity", correct: true },
        { id: "d", label: "500 Internal Server Error" },
      ],
    },
    {
      prompt: "Best index for `WHERE tenant_id = ? AND created_at > ?` on a large table?",
      lesson:
        "A composite index on (tenant_id, created_at) matches the leading equality then the range predicate — this is the classic Postgres pattern.",
      options: [
        { id: "a", label: "Index on created_at only" },
        { id: "b", label: "Composite (tenant_id, created_at)", correct: true },
        { id: "c", label: "Two separate single-column indexes" },
        { id: "d", label: "Hash index on tenant_id" },
      ],
    },
  ],
  design: [
    {
      prompt: "Primary CTA on a landing page — best contrast approach?",
      lesson:
        "A single high-contrast primary color for the main action keeps the eye focused. Multiple bright buttons split attention.",
      options: [
        { id: "a", label: "One bold primary, muted secondary", correct: true },
        { id: "b", label: "Two equally bright buttons" },
        { id: "c", label: "Outline-only for both" },
        { id: "d", label: "Text link only" },
      ],
    },
  ],
  product: [
    {
      prompt: "You have 3 features and 1 sprint. What ships first?",
      lesson:
        "Value / effort with a bias for learning. Ship the smallest thing that resolves the biggest unknown for real users.",
      options: [
        { id: "a", label: "The one the CEO likes most" },
        { id: "b", label: "The smallest that resolves the biggest unknown", correct: true },
        { id: "c", label: "The one with the prettiest mock" },
        { id: "d", label: "All three, cut scope later" },
      ],
    },
  ],
  marketing: [
    {
      prompt: "Cold outbound with a 0.4% reply rate. First lever to pull?",
      lesson:
        "The opening line is 80% of the signal. Rewrite for a specific, personal, present-tense observation before touching the list or offer.",
      options: [
        { id: "a", label: "Buy a bigger list" },
        { id: "b", label: "Rewrite the opening line for specificity", correct: true },
        { id: "c", label: "Add more follow-ups" },
        { id: "d", label: "Switch email provider" },
      ],
    },
  ],
  data: [
    {
      prompt: "Weekly active users dropped 12%. First query you run?",
      lesson:
        "Segment before you diagnose. Slice WAU by acquisition channel and platform to see if the drop is uniform or concentrated.",
      options: [
        { id: "a", label: "Total events last 7 days" },
        { id: "b", label: "WAU sliced by channel and platform", correct: true },
        { id: "c", label: "Top 10 pages" },
        { id: "d", label: "Signups only" },
      ],
    },
  ],
  ops: [
    {
      prompt: "A recurring bug takes 3 hours a week. Do you...?",
      lesson:
        "Automate the toil once it costs more than a day per quarter. 3h/wk = 156h/yr — write the fix, add the alert, move on.",
      options: [
        { id: "a", label: "Keep firefighting weekly" },
        { id: "b", label: "Automate the fix and add an alert", correct: true },
        { id: "c", label: "Hire someone to do it" },
        { id: "d", label: "Ignore it" },
      ],
    },
  ],
};

function AssessmentsPage() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const navigate = useNavigate();
  const [domain, setDomain] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const questions = useMemo(() => (domain ? BANK[domain] ?? [] : []), [domain]);
  const q = questions[qIndex];
  const reveal = picked !== null;
  const correct = reveal && q?.options.find((o) => o.id === picked)?.correct === true;

  const progress = domain
    ? ((qIndex + (reveal ? 1 : 0)) / Math.max(questions.length, 1)) * 100
    : 0;

  const next = () => {
    if (!reveal) return;
    if (correct) setScore((s) => s + 1);
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
      setPicked(null);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setDomain(null);
    setQIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const back = () => {
    if (done || qIndex > 0 || picked) {
      restart();
    } else if (domain) {
      setDomain(null);
    } else {
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-6">
        {/* Top bar */}
        <div className="flex items-center gap-4">
          <button
            onClick={back}
            aria-label="Back"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full ring-2 ring-border text-foreground hover:text-primary hover:ring-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-500"
              style={{ width: `${done ? 100 : progress}%` }}
            />
          </div>
          <ThemeToggle />
        </div>

        {/* Domain picker */}
        {!domain && (
          <>
            <div className="mt-14 flex items-start gap-4">
              <AgentMark size={56} animated />
              <div className="relative mt-2 rounded-2xl border-2 border-border bg-card px-5 py-4">
                <span className="absolute -left-2 top-5 h-4 w-4 rotate-45 border-b-2 border-l-2 border-border bg-card" />
                <h1 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  Pick a domain to practice in.
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  I'll grade you as you go and teach the concept behind every answer.
                </p>
              </div>
            </div>

            <div className="mt-10 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
              {DOMAINS.map((d) => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDomain(d.id)}
                    className="group flex items-center gap-4 rounded-2xl border-2 border-border bg-card px-4 py-4 text-left transition-all hover:border-primary/60"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted ring-2 ring-border text-foreground group-hover:text-primary transition-colors">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <div className="font-display text-base font-bold">{d.label}</div>
                      <div className="text-xs text-muted-foreground">{d.hint}</div>
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Question card */}
        {domain && !done && q && (
          <>
            <div className="mt-14 flex items-start gap-4">
              <AgentMark size={56} animated />
              <div className="relative mt-2 flex-1 rounded-2xl border-2 border-border bg-card px-5 py-4">
                <span className="absolute -left-2 top-5 h-4 w-4 rotate-45 border-b-2 border-l-2 border-border bg-card" />
                <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Question {qIndex + 1} of {questions.length}
                </div>
                <h1 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {q.prompt}
                </h1>
              </div>
            </div>

            <div className="mt-8 grid flex-1 grid-cols-1 gap-3">
              {q.options.map((opt) => {
                const isPicked = picked === opt.id;
                const showCorrect = reveal && opt.correct;
                const showWrong = reveal && isPicked && !opt.correct;
                return (
                  <button
                    key={opt.id}
                    disabled={reveal}
                    onClick={() => setPicked(opt.id)}
                    className={`flex items-center justify-between gap-4 rounded-2xl border-2 bg-card px-4 py-4 text-left transition-all disabled:cursor-default ${
                      showCorrect
                        ? "border-primary ring-4 ring-primary/20"
                        : showWrong
                        ? "border-[color:var(--fire)] ring-4 ring-[color:var(--fire)]/20"
                        : isPicked
                        ? "border-primary ring-4 ring-primary/20"
                        : "border-border hover:border-primary/60"
                    }`}
                  >
                    <span className="font-display text-base font-bold">{opt.label}</span>
                    {showCorrect && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    {showWrong && <XCircle className="h-5 w-5 text-[color:var(--fire)]" />}
                  </button>
                );
              })}
            </div>

            {reveal && (
              <div className="mt-4 rounded-2xl border border-primary/30 bg-primary/5 p-4">
                <div className="mb-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                  <BookOpen className="h-3.5 w-3.5" /> Why
                </div>
                <p className="text-sm text-muted-foreground">{q.lesson}</p>
              </div>
            )}

            <div className="sticky bottom-0 mt-8 border-t border-border bg-background/95 py-5 backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Score {score} / {questions.length}
                </span>
                <button
                  disabled={!reveal}
                  onClick={next}
                  className="btn-duo disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:transform-none"
                >
                  {qIndex + 1 === questions.length ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Results */}
        {done && (
          <div className="mt-16 flex flex-1 flex-col items-center gap-4 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-3xl bg-primary/15 ring-4 ring-primary/25 text-primary">
              <Trophy className="h-9 w-9" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              You scored {score} / {questions.length}
            </h1>
            <p className="max-w-md text-sm text-muted-foreground">
              {score === questions.length
                ? "Clean sweep. I'll queue a harder set next time."
                : "Solid rep. Practice one more round to lock this in."}
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> +{score * 20} XP earned
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button onClick={restart} className="btn-duo !py-2.5 !px-5 text-sm">
                Practice another domain
              </button>
              <Link to="/dashboard" className="btn-duo-outline !py-2.5 !px-5 text-sm">
                Back to workspace
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
