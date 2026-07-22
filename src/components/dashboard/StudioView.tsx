import { useState } from "react";
import { AgentMark } from "./AgentOrb";
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Users,
  Target,
  Sparkles,
  Send,
  ListChecks,
  CalendarClock,
  LifeBuoy,
  ArrowRight,
  Upload,
  Paperclip,
  Link as LinkIcon,
  FileText,
  type LucideIcon,
} from "lucide-react";

type EngagementStatus = "Active" | "Past";

type Engagement = {
  id: string;
  title: string;
  company: string;
  logo: string;
  type: "Internship" | "Job";
  location: string;
  duration: string;
  status: EngagementStatus;
  description: string;
  role: string;
  achievements: string[];
  squadName: string;
};

type Offer = {
  id: string;
  title: string;
  company: string;
  logo: string;
  type: "Internship" | "Job";
  location: string;
  compensation: string;
  expiresIn: string;
  match: number;
};

export const INITIAL_ENGAGEMENTS: Engagement[] = [
  {
    id: "e3",
    title: "Frontend Intern",
    company: "LagosCare",
    logo: "L",
    type: "Internship",
    location: "Remote",
    duration: "8 weeks · Completed",
    status: "Past",
    description:
      "LagosCare connects patients to nearby clinics. You shipped the onboarding flow and appointment reminders.",
    role: "Design system contributor and onboarding flow lead.",
    achievements: [
      "Shipped the new onboarding: 71% completion, up from 42%.",
      "Contributed 14 components to the design system.",
    ],
    squadName: "LagosCare Squad",
  },
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: "o1",
    title: "Product Engineer",
    company: "Zowa",
    logo: "Z",
    type: "Job",
    location: "Remote",
    compensation: "₦1.2M / mo",
    expiresIn: "5 days",
    match: 94,
  },
  {
    id: "o2",
    title: "Design Intern",
    company: "Kola Studio",
    logo: "K",
    type: "Internship",
    location: "Hybrid · Abuja",
    compensation: "₦450k / mo",
    expiresIn: "3 days",
    match: 88,
  },
  {
    id: "o3",
    title: "AI Engineer",
    company: "Suru Labs",
    logo: "S",
    type: "Job",
    location: "Remote",
    compensation: "₦1.8M / mo",
    expiresIn: "8 days",
    match: 82,
  },
  {
    id: "o4",
    title: "Backend Developer",
    company: "Paystack",
    logo: "P",
    type: "Job",
    location: "Remote",
    compensation: "₦2.5M / mo",
    expiresIn: "2 days",
    match: 98,
  },
  {
    id: "o5",
    title: "Product Marketing",
    company: "Piggyvest",
    logo: "PV",
    type: "Job",
    location: "Hybrid · Lagos",
    compensation: "₦1.5M / mo",
    expiresIn: "10 days",
    match: 75,
  },
  {
    id: "o6",
    title: "UI Designer",
    company: "Kuda",
    logo: "K",
    type: "Internship",
    location: "Remote",
    compensation: "₦600k / mo",
    expiresIn: "14 days",
    match: 89,
  }
];

type Tab = "active" | "past" | "offers";

export function StudioView({
  onOpenSquad,
}: {
  onOpenSquad: (mission: string) => void;
}) {
  const [tab, setTab] = useState<Tab>("active");
  const [openId, setOpenId] = useState<string | null>(null);
  
  const [engagements, setEngagements] = useState<Engagement[]>(INITIAL_ENGAGEMENTS);
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);

  const opened = openId ? engagements.find((e) => e.id === openId) ?? null : null;

  if (opened) {
    return (
      <EngagementDetail
        engagement={opened}
        onBack={() => setOpenId(null)}
        onOpenSquad={() => onOpenSquad(opened.company)}
      />
    );
  }

  const active = engagements.filter((e) => e.status === "Active");
  const past = engagements.filter((e) => e.status === "Past");

  const handleAcceptOffer = (offer: Offer) => {
    // 1. Remove from offers
    setOffers(prev => prev.filter(o => o.id !== offer.id));
    // 2. Add to active engagements
    const newEngagement: Engagement = {
      id: `e-${offer.id}`,
      title: offer.title,
      company: offer.company,
      logo: offer.logo,
      type: offer.type,
      location: offer.location,
      duration: "Ongoing · Week 1",
      status: "Active",
      description: `You have accepted the offer for ${offer.title} at ${offer.company}.`,
      role: "Onboarding and getting up to speed.",
      achievements: ["Successfully completed Huzzler onboarding and accepted the offer."],
      squadName: `${offer.company} Squad`,
    };
    setEngagements(prev => [newEngagement, ...prev]);
    // 3. Switch tab to active
    setTab("active");
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <span className="chip w-fit">Opportunities</span>
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          Where offers turn into shipped work.
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Review live offers, manage your active internships and jobs, and let Huzzler your AI agent
          keep the whole thing on track.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 rounded-2xl border border-border bg-muted/50 p-1.5">
        <TabButton active={tab === "active"} onClick={() => setTab("active")} count={active.length}>
          Active
        </TabButton>
        <TabButton active={tab === "past"} onClick={() => setTab("past")} count={past.length}>
          Past
        </TabButton>
        <TabButton active={tab === "offers"} onClick={() => setTab("offers")} count={offers.length}>
          Offers
        </TabButton>
      </div>

      {tab === "active" && (
        <EngagementList list={active} onOpen={setOpenId} emptyText="No active engagements yet." />
      )}
      {tab === "past" && (
        <EngagementList list={past} onOpen={setOpenId} emptyText="Your past work will show here." />
      )}
      {tab === "offers" && <OfferList offers={offers} onAccept={handleAcceptOffer} />}
    </div>
  );
}

function TabButton({
  children,
  active,
  onClick,
  count,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-display text-sm font-bold tracking-tight transition-colors ${
        active
          ? "bg-background text-foreground shadow-sm ring-1 ring-border"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      {typeof count === "number" && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
            active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function EngagementList({
  list,
  onOpen,
  emptyText,
}: {
  list: Engagement[];
  onOpen: (id: string) => void;
  emptyText: string;
}) {
  if (list.length === 0) {
    return (
      <div className="card-duo grid place-items-center p-10 text-center">
        <Briefcase className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {list.map((e) => (
        <button
          key={e.id}
          onClick={() => onOpen(e.id)}
          className="card-duo group flex flex-col gap-3 p-5 text-left transition-all hover:border-primary/40 hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 font-display text-lg font-bold text-primary ring-2 ring-primary/20">
                {e.logo}
              </div>
              <div>
                <div className="font-display text-base font-bold">{e.title}</div>
                <div className="text-xs text-muted-foreground">{e.company}</div>
              </div>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                e.status === "Active"
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {e.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5" /> {e.type}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {e.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {e.duration}
            </span>
          </div>
          <div className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Open details <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </button>
      ))}
    </div>
  );
}

type OfferStatus = "pending" | "accepted" | "declined";

function OfferList({ offers, onAccept }: { offers: Offer[], onAccept: (offer: Offer) => void }) {
  const [status, setStatus] = useState<Record<string, OfferStatus>>({});
  const [confirm, setConfirm] = useState<{ id: string; action: "accept" | "decline" } | null>(null);

  const set = (id: string, s: OfferStatus) => setStatus((prev) => ({ ...prev, [id]: s }));
  const active = confirm ? offers.find((o) => o.id === confirm.id) ?? null : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {offers.map((o) => {
          const s: OfferStatus = status[o.id] ?? "pending";
          return (
            <div
              key={o.id}
              className={`card-duo flex flex-col gap-3 p-5 transition-opacity ${
                s === "declined" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 font-display text-lg font-bold text-primary ring-2 ring-primary/20">
                    {o.logo}
                  </div>
                  <div>
                    <div className="font-display text-base font-bold">{o.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {o.company} · {o.type}
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {o.match}% match
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {o.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" /> {o.compensation}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> Expires in {o.expiresIn}
                </span>
              </div>
              {s === "pending" && (
                <div className="mt-1 flex gap-2">
                  <button
                    onClick={() => setConfirm({ id: o.id, action: "accept" })}
                    className="btn-duo !py-2 !px-4 flex-1 text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setConfirm({ id: o.id, action: "decline" })}
                    className="btn-duo-outline !py-2 !px-4 text-sm"
                  >
                    Decline
                  </button>
                </div>
              )}
              {s === "accepted" && (
                <div className="mt-1 flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-bold text-primary">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> Accepted
                  </span>
                  <span className="text-[10px] uppercase tracking-widest">Moved to Active</span>
                </div>
              )}
              {s === "declined" && (
                <div className="mt-1 flex items-center gap-1.5 rounded-xl border border-border bg-muted px-3 py-2 text-sm font-bold text-muted-foreground">
                  <XCircle className="h-4 w-4" /> Declined
                  <button
                    onClick={() => set(o.id, "pending")}
                    className="ml-auto text-[10px] uppercase tracking-widest text-primary hover:underline"
                  >
                    Undo
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Confirm dialog */}
      {confirm && active && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setConfirm(null)}
            aria-hidden
          />
          <div
            role="dialog"
            className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className={`grid h-11 w-11 place-items-center rounded-xl ring-2 ${
                  confirm.action === "accept"
                    ? "bg-primary/10 text-primary ring-primary/25"
                    : "bg-muted text-muted-foreground ring-border"
                }`}
              >
                {confirm.action === "accept" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
              </div>
              <div>
                <div className="font-display text-lg font-bold">
                  {confirm.action === "accept" ? "Accept offer?" : "Decline offer?"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {active.title} · {active.company}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {confirm.action === "accept"
                ? "You will be onboarded to the squad and Huzzler will start managing your first tasks."
                : "This offer will be closed. You can still reopen it from Undo before you refresh."}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setConfirm(null)}
                className="btn-duo-outline !py-2 !px-4 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirm.action === "accept" && active) {
                    onAccept(active);
                  } else {
                    set(confirm.id, "declined");
                  }
                  setConfirm(null);
                }}
                className="btn-duo !py-2 !px-4 text-sm"
              >
                {confirm.action === "accept" ? "Yes, accept" : "Yes, decline"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function EngagementDetail({
  engagement,
  onBack,
  onOpenSquad,
}: {
  engagement: Engagement;
  onBack: () => void;
  onOpenSquad: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={onBack}
        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Studio
      </button>

      {/* Header */}
      <div className="card-duo p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 font-display text-xl font-bold text-primary ring-2 ring-primary/20">
              {engagement.logo}
            </div>
            <div>
              <div className="font-display text-xl font-bold tracking-tight md:text-2xl">
                {engagement.title}
              </div>
              <div className="text-sm text-muted-foreground">{engagement.company}</div>
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" /> {engagement.type}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {engagement.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {engagement.duration}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onOpenSquad} className="btn-duo !py-2.5 !px-4 text-sm">
            <Users className="h-4 w-4" /> Open squad
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* Description */}
          <div className="card-duo p-5">
            <div className="mb-2 font-display text-base font-bold">Job description</div>
            <p className="text-sm text-muted-foreground">{engagement.description}</p>
          </div>

          {/* Role */}
          <div className="card-duo p-5">
            <div className="mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <div className="font-display text-base font-bold">Your role</div>
            </div>
            <p className="text-sm text-muted-foreground">{engagement.role}</p>
          </div>

          {/* Achievements */}
          <div className="card-duo p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <div className="font-display text-base font-bold">Achievements so far</div>
            </div>
            <ul className="flex flex-col gap-2">
              {engagement.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          {engagement.status === "Active" && <DeliverablesPanel />}
        </div>

        {/* Hustler AI agent */}
        {engagement.status === "Active" && engagement.type === "Internship" ? (
          <HustlerPanel />
        ) : (
          <SupportPanel />
        )}
      </div>
    </div>
  );
}

function HustlerPanel() {
  return (
    <div className="card-duo flex flex-col gap-4 p-5">
      <div className="flex items-center gap-3">
        <AgentMark size={48} animated />
        <div>
          <div className="font-display text-base font-bold">Huzzler</div>
          <div className="text-xs text-muted-foreground">Your AI internship manager</div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Huzzler assigns tasks, tracks deadlines and unblocks you in the moment. Everything shows up
        on your Identity when shipped.
      </p>

      <PanelBlock icon={ListChecks} title="Tasks this week">
        <TaskRow label="Ship search-filter chips" due="Today" active />
        <TaskRow label="Write ranking spec" due="Thu" />
        <TaskRow label="Pair with Tolu on empty states" due="Fri" />
      </PanelBlock>

      <PanelBlock icon={CalendarClock} title="Upcoming deadlines">
        <DeadlineRow label="v0.2 to staging" when="Fri · 6:00 PM WAT" />
        <DeadlineRow label="Sprint demo" when="Mon · 10:00 AM WAT" />
      </PanelBlock>

      <PanelBlock icon={LifeBuoy} title="Ask Huzzler">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 p-2">
          <input
            className="flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Stuck on ranking weights..."
          />
          <button className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground hover:opacity-90">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </PanelBlock>
    </div>
  );
}

function SupportPanel() {
  return (
    <div className="card-duo flex flex-col gap-3 p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-2 ring-primary/25">
          <LifeBuoy className="h-5 w-5" />
        </div>
        <div>
          <div className="font-display text-base font-bold">Support</div>
          <div className="text-xs text-muted-foreground">We are here if you need anything.</div>
        </div>
      </div>
      <button className="btn-duo-outline !py-2 !px-4 text-sm">Message the operator team</button>
    </div>
  );
}

function PanelBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/40 p-3">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <div className="font-display text-sm font-bold">{title}</div>
      </div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function TaskRow({ label, due, active }: { label: string; due: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-background/60 px-2.5 py-1.5">
      <div className="flex items-center gap-2 text-sm">
        <div
          className={`h-2 w-2 rounded-full ${
            active ? "bg-[color:var(--gold)]" : "bg-muted-foreground/40"
          }`}
        />
        <span>{label}</span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {due}
      </span>
    </div>
  );
}

function DeadlineRow({ label, when }: { label: string; when: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-background/60 px-2.5 py-1.5 text-sm">
      <span>{label}</span>
      <span className="text-xs font-semibold text-muted-foreground">{when}</span>
    </div>
  );
}

type Deliverable = {
  id: string;
  title: string;
  due: string;
  status: "In progress" | "Submitted" | "Approved" | "Changes requested";
};

function DeliverablesPanel() {
  const [items, setItems] = useState<Deliverable[]>([
    { id: "d1", title: "Search filter chips — v1", due: "Today", status: "In progress" },
    { id: "d2", title: "Ranking spec draft", due: "Thu", status: "In progress" },
    { id: "d3", title: "Empty state illustrations", due: "Last week", status: "Approved" },
  ]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [form, setForm] = useState({ notes: "", link: "", file: "" });

  const submitting = openId ? items.find((i) => i.id === openId) ?? null : null;

  const submit = () => {
    if (!submitting) return;
    setItems((prev) =>
      prev.map((i) => (i.id === submitting.id ? { ...i, status: "Submitted" } : i)),
    );
    setOpenId(null);
    setForm({ notes: "", link: "", file: "" });
  };

  const tone = (s: Deliverable["status"]) =>
    s === "Approved"
      ? "bg-primary/15 text-primary"
      : s === "Submitted"
      ? "bg-[color:var(--gold)]/15 text-[color:var(--gold)]"
      : s === "Changes requested"
      ? "bg-[color:var(--fire)]/15 text-[color:var(--fire)]"
      : "bg-muted text-muted-foreground";

  return (
    <div className="card-duo p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Upload className="h-4 w-4 text-primary" />
          <div className="font-display text-base font-bold">Deliverables</div>
        </div>
        <span className="text-xs text-muted-foreground">
          {items.filter((i) => i.status === "Approved").length} of {items.length} approved
        </span>
      </div>

      <div className="divide-y divide-border">
        {items.map((d) => (
          <div key={d.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <div className="truncate font-display text-sm font-bold">{d.title}</div>
              <div className="text-xs text-muted-foreground">Due {d.due}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${tone(d.status)}`}>
                {d.status}
              </span>
              {(d.status === "In progress" || d.status === "Changes requested") && (
                <button
                  onClick={() => setOpenId(d.id)}
                  className="btn-duo !py-1.5 !px-3 text-xs"
                >
                  Submit
                </button>
              )}
              {d.status === "Submitted" && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Awaiting review
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {submitting && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpenId(null)}
            aria-hidden
          />
          <div
            role="dialog"
            className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-2xl"
          >
            <div className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Submit deliverable
            </div>
            <div className="font-display text-lg font-bold">{submitting.title}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Huzzler will notify your squad lead and log this on your Identity.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Notes
                </span>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="What did you build, what's next, blockers..."
                  className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <LinkIcon className="h-3 w-3" /> Link
                </span>
                <input
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  placeholder="PR, Figma, Loom, deployment..."
                  className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <Paperclip className="h-3 w-3" /> Attachment
                </span>
                <div className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 px-3 py-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <input
                    value={form.file}
                    onChange={(e) => setForm({ ...form, file: e.target.value })}
                    placeholder="filename.pdf (drag to upload)"
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setOpenId(null)} className="btn-duo-outline !py-2 !px-4 text-sm">
                Cancel
              </button>
              <button onClick={submit} className="btn-duo !py-2 !px-4 text-sm">
                <Send className="h-4 w-4" /> Submit for review
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
