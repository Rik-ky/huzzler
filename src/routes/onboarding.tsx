import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  Rocket,
  Compass,
  Briefcase,
  RefreshCw,
  Code2,
  Palette,
  LineChart,
  Megaphone,
  Database,
  Wrench,
  Sparkles,
  Trophy,
  Hammer,
  GraduationCap,
  Users,
  Search,
  Instagram,
  Youtube,
  MessageCircle,
  Newspaper,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/lib/theme";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started · Huzzler" },
      { name: "description", content: "Set up your Huzzler profile in a minute so we can match you to real product teams." },
      { property: "og:title", content: "Get started · Huzzler" },
      { property: "og:description", content: "Set up your Huzzler profile in a minute." },
      { property: "og:url", content: "/onboarding" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Get started · Huzzler" },
      { name: "twitter:description", content: "Set up your Huzzler profile in a minute." },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/onboarding" }],
  }),
  component: OnboardingPage,
});

type Option = { id: string; label: string; hint?: string; icon: LucideIcon };

type Step = {
  key: string;
  question: string;
  helper?: string;
  options: Option[];
};

const STEPS: Step[] = [
  {
    key: "reason",
    question: "What brings you to Huzzler?",
    helper: "We'll tailor your first mission to this.",
    options: [
      { id: "experience", label: "I need real experience", icon: Rocket },
      { id: "build", label: "I want to build things", icon: Hammer },
      { id: "switch", label: "I'm switching careers", icon: RefreshCw },
      { id: "role", label: "I'm hunting for a role", icon: Briefcase },
    ],
  },
  {
    key: "craft",
    question: "Which craft do you want to grow in?",
    helper: "Pick the one you'd love to ship in first.",
    options: [
      { id: "eng", label: "Engineering", icon: Code2 },
      { id: "design", label: "Design", icon: Palette },
      { id: "product", label: "Product", icon: Compass },
      { id: "marketing", label: "Marketing", icon: Megaphone },
      { id: "data", label: "Data", icon: Database },
      { id: "ops", label: "Ops", icon: Wrench },
    ],
  },
  {
    key: "level",
    question: "Where are you right now?",
    options: [
      { id: "starting", label: "Just starting out", icon: GraduationCap },
      { id: "some", label: "A few side projects", icon: Sparkles },
      { id: "junior", label: "Junior in the field", icon: LineChart },
      { id: "mid", label: "Mid level, want more", icon: Trophy },
    ],
  },
  {
    key: "goal",
    question: "What would make this year a win?",
    options: [
      { id: "ship", label: "Ship a real product", icon: Rocket },
      { id: "hired", label: "Get hired somewhere great", icon: Briefcase },
      { id: "portfolio", label: "Build a strong portfolio", icon: Trophy },
      { id: "team", label: "Work with a team I love", icon: Users },
    ],
  },
  {
    key: "source",
    question: "How did you hear about Huzzler?",
    options: [
      { id: "friend", label: "A friend told me", icon: Users },
      { id: "search", label: "Google search", icon: Search },
      { id: "yt", label: "YouTube", icon: Youtube },
      { id: "ig", label: "Instagram", icon: Instagram },
      { id: "tt", label: "TikTok", icon: MessageCircle },
      { id: "news", label: "News or article", icon: Newspaper },
      { id: "other", label: "Somewhere else", icon: MoreHorizontal },
    ],
  },
];

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const current = STEPS[step];
  const selected = answers[current.key];
  const progress = useMemo(() => ((step + (selected ? 1 : 0)) / STEPS.length) * 100, [step, selected]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);


  const next = () => {
    if (!selected) return;
    if (step < STEPS.length - 1) setStep(step + 1);
    else navigate({ to: "/dashboard" });
  };
  const back = () => (step === 0 ? navigate({ to: "/" }) : setStep(step - 1));

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
              style={{ width: `${progress}%` }}
            />
          </div>
          <ThemeToggle />
        </div>

        {/* Question */}
        <div className="mt-14 flex items-start gap-4">
          <img src="/huzzler-mark.svg" alt="" className="h-14 w-14 shrink-0 animate-float" />
          <div className="relative mt-2 rounded-2xl border-2 border-border bg-card px-5 py-4">
            <span className="absolute -left-2 top-5 h-4 w-4 rotate-45 border-b-2 border-l-2 border-border bg-card" />
            <h1 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              {current.question}
            </h1>
            {current.helper && (
              <p className="mt-1 text-sm text-muted-foreground">{current.helper}</p>
            )}
          </div>
        </div>

        {/* Options */}
        <div className="mt-10 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          {current.options.map((opt) => {
            const active = selected === opt.id;
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                onClick={() => setAnswers({ ...answers, [current.key]: opt.id })}
                className={`group flex items-center gap-4 rounded-2xl border-2 bg-card px-4 py-4 text-left transition-all ${
                  active
                    ? "border-primary ring-4 ring-primary/20"
                    : "border-border hover:border-primary/60"
                }`}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-2 transition-colors ${
                    active
                      ? "bg-primary/15 ring-primary/40 text-primary"
                      : "bg-muted ring-border text-foreground group-hover:text-primary"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-base font-bold">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Continue */}
        <div className="sticky bottom-0 mt-10 border-t border-border bg-background/95 py-5 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Step {step + 1} of {STEPS.length}
            </span>
            <button
              disabled={!selected}
              onClick={next}
              className="btn-duo disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:transform-none"
            >
              {step === STEPS.length - 1 ? "Finish" : "Continue"}
            </button>
          </div>
          <div className="mt-3 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
