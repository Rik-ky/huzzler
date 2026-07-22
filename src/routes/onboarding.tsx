import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2, Lock, ArrowRight, Play, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/lib/theme";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding Stages · Huzzler" },
    ],
  }),
  component: OnboardingStages,
});

function OnboardingStages() {
  const navigate = useNavigate();

  useEffect(() => {
    // Show toast on mount for new users
    const hasSeenToast = sessionStorage.getItem("huzzler_welcome_toast");
    if (!hasSeenToast) {
      setTimeout(() => {
        toast("Welcome! Get started in the onboarding page", {
          description: "Complete these stages to unlock live offers.",
          icon: "👋",
        });
      }, 500);
      sessionStorage.setItem("huzzler_welcome_toast", "true");
    }
  }, []);

  const stages = [
    {
      num: "01",
      title: "AI Skills Screener",
      evaluator: "AI",
      status: "Passed · 88",
      state: "cleared",
      desc: "Adaptive multi-domain screener across problem solving, craft and communication.",
      actionText: "Cleared",
    },
    {
      num: "02",
      title: "Portfolio Review",
      evaluator: "AI",
      status: "Passed · 82",
      state: "cleared",
      desc: "Your work samples were parsed and scored for depth, originality and shipping evidence.",
      actionText: "Cleared",
    },
    {
      num: "03",
      title: "Live Craft Challenge",
      evaluator: "AI",
      status: "In progress",
      state: "active",
      desc: "A 90 minute build session evaluated live by Huzzler, your AI agent.",
      actionText: "Start now",
      onAction: () => navigate({ to: "/dashboard" }),
    },
    {
      num: "04",
      title: "Human Panel Interview",
      evaluator: "Human",
      status: "Locked",
      state: "locked",
      desc: "A 30 minute conversation with two operators from the Huzzler network.",
    },
    {
      num: "05",
      title: "Placement Ready",
      evaluator: "Human",
      status: "Locked",
      state: "locked",
      desc: "Your profile is unlocked to receive live offers in the Studio.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary pb-20">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md md:px-12">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground font-display font-bold">
            H
          </div>
          <span className="font-display text-lg font-bold">Huzzler</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 text-sm font-medium md:flex">
            <span className="text-muted-foreground">Progress:</span>
            <span className="text-foreground">2 / 5 Stages</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <header className="mb-12">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Your Placement Journey
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Prove your craft and unlock access to the Huzzler Studio. Each stage is designed to validate your skills against real-world standards.
          </p>
        </header>

        <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[1.875rem] before:hidden md:before:block before:w-[2px] before:bg-border before:z-0">
          {stages.map((stage) => (
            <div
              key={stage.num}
              className={`relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 rounded-2xl border bg-card p-6 md:p-8 transition-all hover:shadow-lg ${
                stage.state === "active"
                  ? "border-primary ring-1 ring-primary shadow-md"
                  : stage.state === "locked"
                  ? "border-border/50 opacity-60 grayscale-[0.5]"
                  : "border-border"
              }`}
            >
              {/* Number indicator */}
              <div className="hidden md:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-muted font-display text-2xl font-bold tracking-tighter text-muted-foreground">
                {stage.num}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-xl md:text-2xl font-bold">{stage.title}</h2>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground">
                      {stage.evaluator}
                    </span>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                      stage.state === "cleared"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : stage.state === "active"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {stage.state === "cleared" && <CheckCircle2 className="h-4 w-4" />}
                    {stage.state === "active" && <Loader2 className="h-4 w-4 animate-spin" />}
                    {stage.state === "locked" && <Lock className="h-4 w-4" />}
                    {stage.status}
                  </div>
                </div>
                
                <p className="text-muted-foreground">{stage.desc}</p>
                
                {stage.state === "active" && (
                  <button
                    onClick={stage.onAction}
                    className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-8 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-[0.98]"
                  >
                    <Play className="h-4 w-4" />
                    {stage.actionText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
