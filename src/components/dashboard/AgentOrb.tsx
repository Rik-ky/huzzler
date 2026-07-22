import { useState } from "react";
import {
  Sparkles,
  Send,
  X,
  Wand2,
  ListChecks,
  CalendarClock,
  BookOpen,
  Rocket,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

type Msg = { from: "user" | "agent"; text: string };

// Mock responses removed, using real API

export function AgentOrb() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "agent",
      text: "Hey, I'm Huzzler. I can plan your day, review a PR, unblock a task, or help you prep for an assessment. What are we shipping?",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const send = async (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || isLoading) return;
    
    // Add user message immediately
    const userMsg: Msg = { from: "user", text: value };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMsg],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((m) => [...m, { from: "agent", text: data.reply }]);
      } else {
        setMessages((m) => [...m, { from: "agent", text: "Sorry, I'm having trouble connecting right now." }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((m) => [...m, { from: "agent", text: "Network error while connecting to the AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating orb */}
      <div className="fixed bottom-5 right-5 z-40 md:bottom-6 md:right-6">
        <button
          onClick={() => setOpen(true)}
          aria-label="Ask Huzzler AI"
          className="group relative grid h-14 w-14 place-items-center rounded-full transition-transform hover:scale-105 active:scale-95"
        >
          <span className="absolute inset-0 rounded-full animate-pulse-ring" aria-hidden />
          <AgentMark size={56} animated />
        </button>
      </div>

      {/* Slide-in sheet */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside
            role="dialog"
            aria-label="Huzzler AI"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[440px] flex-col border-l border-border bg-background shadow-2xl animate-slide-in-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <AgentMark size={40} animated />
                <div>
                  <div className="font-display text-base font-bold">Huzzler</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    Online · Your AI copilot
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick actions */}
            <div className="border-b border-border px-5 py-4">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Quick actions
              </div>
              <div className="grid grid-cols-2 gap-2">
                <QuickAction icon={ListChecks} label="Plan my day" onClick={() => send("Plan my day")} />
                <QuickAction icon={CalendarClock} label="Draft standup" onClick={() => send("Draft my standup")} />
                <QuickAction icon={BookOpen} label="Review my PR" onClick={() => send("Review my latest PR")} />
                <QuickAction icon={Rocket} label="Prep assessment" onClick={() => send("Help me prep for my next assessment")} />
              </div>
            </div>

            {/* Chat thread */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex flex-col gap-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex items-end gap-2 ${m.from === "user" ? "justify-end" : ""}`}
                  >
                    {m.from === "agent" && <AgentMark size={26} />}
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                        m.from === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                {/* AI Reasoning Indicator */}
                {isLoading && (
                  <div className="flex items-end gap-2">
                    <AgentMark size={26} animated />
                    <div className="max-w-[80%] rounded-2xl bg-muted px-3.5 py-3 flex gap-1.5 items-center h-[36px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Composer */}
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted/50 p-1.5">
                <Wand2 className="ml-2 h-4 w-4 text-primary" />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  className="flex-1 bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-foreground"
                  placeholder="Ask Huzzler anything..."
                />
                <button
                  type="button"
                  onClick={() => send()}
                  disabled={!input.trim() || isLoading}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <MessageSquare className="h-3 w-3" /> Conversations sync to your Identity.
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

function QuickAction({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-2.5 py-2 text-left text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
    >
      <Icon className="h-3.5 w-3.5 text-primary" />
      {label}
    </button>
  );
}

export function AgentMark({ size = 40, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <span
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <img
        src="/hustler-agent.svg"
        alt="Huzzler AI"
        className={animated ? "h-full w-full animate-breathe" : "h-full w-full"}
      />
      {animated && (
        <>
          <span
            className="pointer-events-none absolute inset-[-6%] rounded-full border border-primary/25 animate-spin-slow"
            aria-hidden
          />
          <Sparkles
            className="pointer-events-none absolute -right-1 -top-1 h-4 w-4 text-[color:var(--gold)] animate-sparkle"
            aria-hidden
          />
          <Sparkles
            className="pointer-events-none absolute -bottom-1 -left-1 h-3 w-3 text-primary animate-sparkle-delay"
            aria-hidden
          />
        </>
      )}
    </span>
  );
}
