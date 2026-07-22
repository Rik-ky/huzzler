import { Users, Circle, MessageCircle, Github, Calendar, Target } from "lucide-react";

const SQUAD = {
  name: "Amala Squad",
  mission: "Ship v0.2 of the Amala Marketplace search & discovery experience.",
  product: "Amala Marketplace",
  members: [
    { name: "Ada O.", role: "Lead Engineer", initials: "AO", online: true },
    { name: "Tolu B.", role: "Product Designer", initials: "TB", online: true },
    { name: "Kunle S.", role: "Frontend Engineer", initials: "KS", online: false },
    { name: "Nneka V.", role: "You · Full-stack", initials: "YOU", online: true },
  ],
};

export function SquadsView({ activeMission }: { activeMission?: string | null }) {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <span className="chip w-fit">Squads</span>
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          Your squad, your standups, your ship-list.
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Squads are small teams matched around a live product. You show up, contribute, and get
          credited on your Identity.
        </p>
      </header>

      {activeMission && (
        <div className="card-duo flex items-center gap-3 border-primary/30 bg-primary/5 p-4">
          <Target className="h-5 w-5 text-primary" />
          <div className="flex-1 text-sm">
            <span className="font-semibold">Opened from Studio:</span>{" "}
            <span className="text-muted-foreground">Squad for {activeMission}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Squad header */}
        <div className="card-duo p-5 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Current squad
              </div>
              <div className="font-display text-xl font-bold">{SQUAD.name}</div>
              <div className="text-xs text-muted-foreground">Working on {SQUAD.product}</div>
            </div>
            <span className="chip">Active</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{SQUAD.mission}</p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SQUAD.members.map((m) => (
              <div
                key={m.initials}
                className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 font-display text-sm font-bold text-primary">
                  {m.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-sm font-bold">{m.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{m.role}</div>
                </div>
                <Circle
                  className={`h-2.5 w-2.5 ${
                    m.online
                      ? "fill-primary text-primary"
                      : "fill-muted-foreground/40 text-muted-foreground/40"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button className="btn-duo !py-2 !px-4 text-sm">
              <MessageCircle className="h-4 w-4" /> Open squad chat
            </button>
            <button className="btn-duo-outline !py-2 !px-4 text-sm">
              <Github className="h-4 w-4" /> Repository
            </button>
            <button className="btn-duo-outline !py-2 !px-4 text-sm">
              <Calendar className="h-4 w-4" /> Standup schedule
            </button>
          </div>
        </div>

        {/* Standups sidebar */}
        <div className="card-duo p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-display text-base font-bold">This week</div>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col gap-3">
            <StandupRow day="Mon" title="Kickoff & scope lock" done />
            <StandupRow day="Wed" title="Design review with Tolu" done />
            <StandupRow day="Thu" title="Search filters demo" active />
            <StandupRow day="Fri" title="Ship v0.2 to staging" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StandupRow({
  day,
  title,
  done,
  active,
}: {
  day: string;
  title: string;
  done?: boolean;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-bold ${
          done
            ? "bg-primary/10 text-primary ring-2 ring-primary/25"
            : active
            ? "bg-[color:var(--gold)]/10 text-[color:var(--gold)] ring-2 ring-[color:var(--gold)]/25"
            : "bg-muted text-muted-foreground ring-2 ring-border"
        }`}
      >
        {day}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-display text-sm font-bold">{title}</div>
        <div className="text-xs text-muted-foreground">
          {done ? "Completed" : active ? "Today · 4:00 PM WAT" : "Upcoming"}
        </div>
      </div>
    </div>
  );
}
