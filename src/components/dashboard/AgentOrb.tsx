import { useState } from "react";
import { Sparkles, Send, X, Wand2 } from "lucide-react";

export function AgentOrb() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {open && (
        <div className="w-[300px] rounded-2xl border border-border bg-card p-4 shadow-2xl animate-fade-in">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AgentMark size={28} />
              <div>
                <div className="font-display text-sm font-bold">Huzzler</div>
                <div className="text-[10px] text-muted-foreground">Your AI copilot</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            Ask anything, or trigger an action across your Gateway, Studio or Squad.
          </p>
          <div className="mb-3 grid grid-cols-2 gap-2">
            <QuickAction label="Plan my day" />
            <QuickAction label="Draft standup" />
            <QuickAction label="Review my PR" />
            <QuickAction label="Book focus time" />
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 p-1.5">
            <Wand2 className="ml-1.5 h-3.5 w-3.5 text-primary" />
            <input
              className="flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Ask Huzzler..."
            />
            <button className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground hover:opacity-90">
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Ask Huzzler AI"
        className="group relative grid h-14 w-14 place-items-center rounded-full transition-transform hover:scale-105 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full animate-pulse-ring" aria-hidden />
        <AgentMark size={56} animated />
      </button>
    </div>
  );
}

function QuickAction({ label }: { label: string }) {
  return (
    <button className="rounded-lg border border-border bg-muted/40 px-2 py-1.5 text-left text-[11px] font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors">
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
