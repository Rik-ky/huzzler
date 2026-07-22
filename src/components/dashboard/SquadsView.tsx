import { useState } from "react";
import { Users, Circle, Hash, Send, Calendar, Target, ExternalLink, Video, Plus } from "lucide-react";
import { AgentMark } from "./AgentOrb";

type Member = {
  id: string;
  name: string;
  role: string;
  initials: string;
  online: boolean;
  bio: string;
  relation: string;
  deliverables: string[];
};

const SQUAD = {
  name: "Amala Squad",
  mission: "Ship v0.2 of the Amala Marketplace search & discovery experience.",
  product: "Amala Marketplace",
  lead: {
    id: "ada",
    name: "Ada O.",
    role: "Lead Engineer",
    initials: "AO",
    online: true,
    bio: "Leads architecture and unblocks the squad. Reviews every PR before it ships.",
    relation: "Reviews your PRs and pairs with you on ranking logic.",
    deliverables: ["Search API contract", "PR reviews", "Sprint scoping"],
  } as Member,
  branches: [
    {
      id: "tolu",
      name: "Tolu B.",
      role: "Product Designer",
      initials: "TB",
      online: true,
      bio: "Owns the search & discovery flows end to end. Runs design reviews on Wednesdays.",
      relation: "Hands you specs for filter chips and empty states.",
      deliverables: ["Filter chip spec", "Empty state illustrations", "Design QA"],
    },
    {
      id: "kunle",
      name: "Kunle S.",
      role: "Frontend Engineer",
      initials: "KS",
      online: false,
      bio: "Builds the storefront UI. Owns the component library shared with your work.",
      relation: "Consumes your search hook in the storefront grid.",
      deliverables: ["Storefront grid", "Result card component", "Shared UI kit"],
    },
    {
      id: "you",
      name: "Nneka V.",
      role: "You · Full-stack",
      initials: "YOU",
      online: true,
      bio: "That's you. Building search filters and the ranking spec this sprint.",
      relation: "You ship the filters that Kunle renders and Tolu designs.",
      deliverables: ["Search filter chips", "Ranking spec", "Sprint demo"],
    },
  ] as Member[],
};

const MESSAGES = [
  { id: 1, who: "Ada O.", initials: "AO", time: "9:04", text: "Morning squad. Reviews unblocked overnight, take a look." },
  { id: 2, who: "Tolu B.", initials: "TB", time: "9:12", text: "New empty state in Figma. Copy is intentionally short." },
  { id: 3, who: "You", initials: "YOU", time: "9:20", text: "Filter chips PR is up. Kunle can you plug it into the grid?", mine: true },
  { id: 4, who: "Kunle S.", initials: "KS", time: "9:31", text: "On it after lunch. Nice API surface." },
];

const CAL_URL = "https://calendar.google.com/calendar/u/0/r";
const MEET_URL = "https://meet.google.com/new";

export function SquadsView({ activeMission }: { activeMission?: string | null }) {
  const [hovered, setHovered] = useState<Member | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <span className="chip w-fit">Squads</span>
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          Your squad, mapped like a team should be.
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Hover any teammate to see how your work connects. Chat is always open, standups drop
          straight into your calendar.
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

      {/* Squad tree */}
      <div className="card-duo p-5">
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

        <div className="relative mt-8 pb-4">
          {/* Lead node centered */}
          <div className="flex justify-center">
            <MemberNode member={SQUAD.lead} onHover={setHovered} size="lg" />
          </div>

          {/* Connector lines */}
          <div className="relative mx-auto mt-4 h-10 max-w-3xl">
            <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-border" />
            <div className="absolute left-[10%] right-[10%] top-4 h-px bg-border" />
            <div className="absolute left-[10%] top-4 h-6 w-px bg-border" />
            <div className="absolute left-1/2 top-4 h-6 w-px -translate-x-1/2 bg-border" />
            <div className="absolute right-[10%] top-4 h-6 w-px bg-border" />
          </div>

          {/* Branch nodes */}
          <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4">
            {SQUAD.branches.map((m) => (
              <div key={m.id} className="flex justify-center">
                <MemberNode member={m} onHover={setHovered} />
              </div>
            ))}
          </div>

          {/* Floating profile modal */}
          {hovered && <ProfileFloater member={hovered} />}
        </div>
      </div>

      {/* Chat + standups */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SquadChat />
        <StandupPanel />
      </div>
    </div>
  );
}

function MemberNode({
  member,
  onHover,
  size = "md",
}: {
  member: Member;
  onHover: (m: Member | null) => void;
  size?: "md" | "lg";
}) {
  const dim = size === "lg" ? "h-16 w-16 text-base" : "h-14 w-14 text-sm";
  return (
    <button
      type="button"
      onMouseEnter={() => onHover(member)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(member)}
      onBlur={() => onHover(null)}
      className="group flex flex-col items-center gap-1.5 outline-none"
    >
      <div className="relative">
        <div
          className={`${dim} grid place-items-center rounded-full bg-primary/15 font-display font-bold text-primary ring-2 ring-border transition group-hover:ring-primary group-focus:ring-primary`}
        >
          {member.initials}
        </div>
        <Circle
          className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 ${
            member.online
              ? "fill-primary text-primary"
              : "fill-muted-foreground/40 text-muted-foreground/40"
          }`}
        />
      </div>
      <div className="text-center">
        <div className="font-display text-xs font-bold">{member.name}</div>
        <div className="text-[10px] text-muted-foreground">{member.role}</div>
      </div>
    </button>
  );
}

function ProfileFloater({ member }: { member: Member }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-full z-30 mt-3 w-[300px] -translate-x-1/2 animate-fade-in">
      <div className="card-duo pointer-events-auto p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/15 font-display text-sm font-bold text-primary">
            {member.initials}
          </div>
          <div className="min-w-0">
            <div className="truncate font-display text-sm font-bold">{member.name}</div>
            <div className="truncate text-xs text-muted-foreground">{member.role}</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{member.bio}</p>
        <div className="mt-3 rounded-lg border border-primary/25 bg-primary/5 p-2.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
            How you connect
          </div>
          <div className="mt-1 text-xs text-foreground">{member.relation}</div>
        </div>
        <div className="mt-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Owns
          </div>
          <ul className="mt-1 space-y-0.5 text-xs">
            {member.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SquadChat() {
  return (
    <div className="card-duo flex flex-col lg:col-span-2">
      {/* channel header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4 text-muted-foreground" />
          <div className="font-display text-sm font-bold">amala-squad</div>
          <span className="text-[10px] text-muted-foreground">· 4 members</span>
        </div>
        <div className="flex -space-x-2">
          {["AO", "TB", "KS", "YOU"].map((c) => (
            <div
              key={c}
              className="grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-[9px] font-bold text-primary ring-2 ring-card"
            >
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* messages */}
      <div className="flex max-h-[360px] flex-col gap-4 overflow-y-auto p-4">
        {MESSAGES.map((m) => (
          <div key={m.id} className="flex items-start gap-2.5">
            <div
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-md font-display text-[10px] font-bold ${
                m.mine ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              {m.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-xs font-bold">{m.who}</span>
                <span className="text-[10px] text-muted-foreground">{m.time}</span>
              </div>
              <div className="text-sm text-foreground/90">{m.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* composer */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-2.5 py-1.5">
          <Plus className="h-4 w-4 text-muted-foreground" />
          <input
            className="flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Message #amala-squad"
          />
          <button className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground hover:opacity-90">
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StandupPanel() {
  return (
    <div className="card-duo flex flex-col p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-display text-base font-bold">Standups this week</div>
        <Users className="h-4 w-4 text-primary" />
      </div>
      <div className="flex flex-col gap-3">
        <StandupRow day="Mon" title="Kickoff & scope lock" when="Completed" done />
        <StandupRow day="Wed" title="Design review with Tolu" when="Completed" done />
        <StandupRow day="Thu" title="Search filters demo" when="Today · 4:00 PM WAT" active />
        <StandupRow day="Fri" title="Ship v0.2 to staging" when="Fri · 3:00 PM WAT" />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <a
          href={MEET_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-duo !py-2 !px-4 text-sm"
        >
          <Video className="h-4 w-4" />
          Join Google Meet
          <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
        </a>
        <a
          href={CAL_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-duo-outline !py-2 !px-4 text-sm"
        >
          <Calendar className="h-4 w-4" />
          Open Google Calendar
          <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
        </a>
      </div>

      <div className="mt-5 rounded-xl border border-border bg-muted/40 p-3">
        <div className="flex items-center gap-2">
          <AgentMark size={28} animated />
          <div>
            <div className="font-display text-xs font-bold">Huzzler prepared your update</div>
            <div className="text-[10px] text-muted-foreground">Tap the orb to review before standup</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StandupRow({
  day,
  title,
  when,
  done,
  active,
}: {
  day: string;
  title: string;
  when: string;
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
        <div className="text-xs text-muted-foreground">{when}</div>
      </div>
    </div>
  );
}
