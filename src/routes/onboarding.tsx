import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Lock, ArrowLeft, Play, Loader2, Brain, Briefcase, Video, Users, Rocket } from "lucide-react";
import { ThemeToggle } from "@/lib/theme";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding Journey · Huzzler" },
    ],
  }),
  component: OnboardingJourney,
});

const STAGE_DEFS = [
  {
    num: "01",
    title: "AI Skills Screener",
    evaluator: "AI",
    desc: "Adaptive multi-domain screener across problem solving, craft and communication.",
    actionText: "Start Screener",
    icon: Brain,
    mockupTitle: "AI Skills Screener Simulation",
    mockupDesc: "You are now taking a simulated adaptive screener. The AI is evaluating your problem solving and craft skills in real-time.",
  },
  {
    num: "02",
    title: "Portfolio Review",
    evaluator: "AI",
    desc: "Your work samples were parsed and scored for depth, originality and shipping evidence.",
    actionText: "Submit Portfolio",
    icon: Briefcase,
    mockupTitle: "Portfolio Parser",
    mockupDesc: "Upload your past projects. Huzzler AI is parsing your GitHub and Figma links to evaluate shipping velocity.",
  },
  {
    num: "03",
    title: "Live Craft Challenge",
    evaluator: "AI",
    desc: "A 90 minute build session evaluated live by Huzzler, your AI agent.",
    actionText: "Enter Build Session",
    icon: Video,
    mockupTitle: "Live Build Environment",
    mockupDesc: "Your container is ready. You have 90 minutes to ship the requested feature. Huzzler is watching your commit patterns.",
  },
  {
    num: "04",
    title: "Human Panel Interview",
    evaluator: "Human",
    desc: "A 30 minute conversation with two operators from the Huzzler network.",
    actionText: "Join Call",
    icon: Users,
    mockupTitle: "Operator Panel Call",
    mockupDesc: "Waiting for hosts to join... You will be speaking with a Product Manager and a Lead Engineer from our network.",
  },
  {
    num: "05",
    title: "Placement Ready",
    evaluator: "Human",
    desc: "Your profile is unlocked to receive live offers in the Studio.",
    actionText: "Unlock Profile",
    icon: Rocket,
    mockupTitle: "Profile Verification",
    mockupDesc: "Finalizing your verified profile. We are currently matching your skills with live startup opportunities.",
  },
];

function OnboardingJourney() {
  const navigate = useNavigate();
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [showMockup, setShowMockup] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const hasSeenToast = sessionStorage.getItem("huzzler_welcome_toast");
    if (!hasSeenToast) {
      setTimeout(() => {
        toast("Welcome! Let's get your profile verified.", {
          description: "Complete these 5 stages to unlock live offers.",
          icon: "👋",
        });
      }, 500);
      sessionStorage.setItem("huzzler_welcome_toast", "true");
    }
  }, []);

  const handleStageAction = (idx: number) => {
    if (idx === activeStageIdx) {
      setShowMockup(true);
    }
  };

  const completeMockupStage = () => {
    setIsSimulating(true);
    // Simulate loading for 1.5 seconds to feel realistic
    setTimeout(() => {
      setIsSimulating(false);
      setShowMockup(false);
      
      toast.success(`${STAGE_DEFS[activeStageIdx].title} Cleared!`, {
        description: "Your results have been saved.",
      });

      if (activeStageIdx === STAGE_DEFS.length - 1) {
        // Finished all stages
        navigate({ to: "/dashboard" });
      } else {
        setActiveStageIdx((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 1500);
  };

  if (showMockup) {
    const currentDef = STAGE_DEFS[activeStageIdx];
    
    if (activeStageIdx === 2) {
      // Special Mockup for Live Craft Challenge
      return (
        <main className="min-h-screen flex flex-col bg-[#0d1117] text-[#c9d1d9] selection:bg-primary/30">
          <nav className="flex h-14 items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMockup(false)}
                disabled={isSimulating}
                className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-[#30363d] hover:text-white disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-semibold text-white">Live Craft Challenge</span>
                <span className="font-mono text-[10px] text-emerald-400">Environment Ready</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Huzzler AI is watching
              </div>
              <button
                onClick={completeMockupStage}
                disabled={isSimulating}
                className="inline-flex h-8 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-xs font-bold text-white transition-all hover:bg-emerald-500 disabled:opacity-70"
              >
                {isSimulating ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Submit Code
                  </>
                )}
              </button>
            </div>
          </nav>
          
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 shrink-0 border-r border-[#30363d] bg-[#161b22] p-4 flex flex-col gap-4">
              <div className="font-mono text-xs font-bold text-[#8b949e] uppercase tracking-wider">Instructions</div>
              <div className="text-sm space-y-3 font-sans leading-relaxed">
                <p>Build a fully functional search filter component using React and Tailwind CSS.</p>
                <ul className="list-disc pl-4 space-y-1 text-[#8b949e]">
                  <li>State management for multiple filters</li>
                  <li>Responsive layout</li>
                  <li>Empty state handling</li>
                </ul>
              </div>
              <div className="mt-auto rounded-xl bg-[#0d1117] border border-[#30363d] p-4">
                <div className="font-mono text-xs text-[#8b949e] mb-2">Time Remaining</div>
                <div className="font-mono text-2xl text-white">89:45</div>
              </div>
            </div>
            
            {/* Editor Area */}
            <div className="flex-1 flex flex-col bg-[#0d1117]">
              <div className="flex items-center gap-2 border-b border-[#30363d] px-4 h-10 bg-[#161b22]">
                <div className="font-mono text-xs text-emerald-400 border-b-2 border-emerald-400 h-full flex items-center px-2">App.tsx</div>
                <div className="font-mono text-xs text-[#8b949e] h-full flex items-center px-2 hover:text-[#c9d1d9] cursor-pointer">styles.css</div>
              </div>
              <div className="flex-1 p-6 font-mono text-sm overflow-auto">
                <pre className="text-[#8b949e]">
                  <code className="text-[#ff7b72]">import</code> {'{ useState }'} <code className="text-[#ff7b72]">from</code> <code className="text-[#a5d6ff]">'react'</code>;{'\n\n'}
                  <code className="text-[#ff7b72]">export default function</code> <code className="text-[#d2a8ff]">SearchFilters</code>() {'{\n'}
                  {'  '}<code className="text-[#8b949e]">// Write your component here...</code>{'\n'}
                  {'  '}
                  {isSimulating && <span className="animate-pulse border-r-2 border-white pr-1" />}
                  {'}'}
                </pre>
              </div>
              {/* Terminal */}
              <div className="h-48 border-t border-[#30363d] bg-[#161b22] p-4 font-mono text-xs flex flex-col">
                <div className="text-[#8b949e] mb-2 flex items-center justify-between">
                  <span>TERMINAL</span>
                  <div className="flex gap-2">
                    <span className="cursor-pointer hover:text-white">bash</span>
                    <span className="cursor-pointer hover:text-white">node</span>
                  </div>
                </div>
                <div className="text-emerald-400">$ npm start</div>
                <div className="text-white mt-1">Starting development server...</div>
                <div className="text-white mt-1">Compiled successfully!</div>
                {isSimulating && (
                  <div className="text-amber-400 mt-2">Huzzler AI is analyzing your code structure...</div>
                )}
              </div>
            </div>
          </div>
        </main>
      );
    }

    const Icon = currentDef.icon;
    return (
      <main className="min-h-screen flex flex-col bg-background text-foreground">
        <nav className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMockup(false)}
              disabled={isSimulating}
              className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="font-display font-bold">Stage {currentDef.num} Simulation</span>
          </div>
          <ThemeToggle />
        </nav>
        
        <div className="flex-1 flex flex-col justify-center items-center p-6">
          <div className="w-full max-w-lg card-duo p-8 md:p-12 text-center animate-in zoom-in-95 duration-500">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary mb-6 ring-8 ring-primary/5">
              {isSimulating ? (
                <Loader2 className="h-10 w-10 animate-spin" />
              ) : (
                <Icon className="h-10 w-10" />
              )}
            </div>
            
            <h1 className="font-display text-2xl font-bold mb-3">{currentDef.mockupTitle}</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {currentDef.mockupDesc}
            </p>
            
            <button
              onClick={completeMockupStage}
              disabled={isSimulating}
              className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {isSimulating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing Evaluation...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Simulate Completion
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
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
            <span className="text-foreground">{activeStageIdx} / 5 Stages</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <header className="mb-12 text-center md:text-left">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Your Placement Journey
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0">
            Prove your craft and unlock access to the Huzzler Studio. Complete each stage in order to verify your skills.
          </p>
        </header>

        <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[1.875rem] before:hidden md:before:block before:w-[2px] before:bg-border before:z-0">
          {STAGE_DEFS.map((def, idx) => {
            const state = idx < activeStageIdx ? "cleared" : idx === activeStageIdx ? "active" : "locked";
            
            return (
              <div
                key={def.num}
                className={`relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 rounded-3xl border bg-card p-6 md:p-8 transition-all duration-300 ${
                  state === "active"
                    ? "border-primary ring-2 ring-primary/20 shadow-xl scale-[1.02] -translate-y-1"
                    : state === "locked"
                    ? "border-border/50 opacity-50 grayscale-[0.5]"
                    : "border-border shadow-sm"
                }`}
              >
                {/* Number indicator */}
                <div className={`hidden md:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-display text-2xl font-bold tracking-tighter transition-colors ${
                  state === "active" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : 
                  state === "cleared" ? "bg-emerald-500/10 text-emerald-600" : 
                  "bg-muted text-muted-foreground"
                }`}>
                  {state === "cleared" ? <CheckCircle2 className="h-8 w-8" /> : def.num}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <h2 className="font-display text-xl md:text-2xl font-bold">{def.title}</h2>
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground">
                        {def.evaluator}
                      </span>
                    </div>
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                        state === "cleared"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : state === "active"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {state === "cleared" && (
                        <>
                          <CheckCircle2 className="h-4 w-4" /> Passed
                        </>
                      )}
                      {state === "active" && (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> In progress
                        </>
                      )}
                      {state === "locked" && (
                        <>
                          <Lock className="h-4 w-4" /> Locked
                        </>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{def.desc}</p>
                  
                  {state === "active" && (
                    <button
                      onClick={() => handleStageAction(idx)}
                      className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-8 font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/20"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      {def.actionText}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
