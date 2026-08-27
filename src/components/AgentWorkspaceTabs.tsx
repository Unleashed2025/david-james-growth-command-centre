"use client";

import { useState } from "react";
import type {
  AgentModule,
  AgentSourceRequirement,
  AgentWorkflow,
  Branch,
  CompetitorActivity,
  DataSource,
  EstateAgent,
  LeadPeriod,
  MarketShareRow,
  ScanWebsite,
} from "@/data/dashboard";
import { AgentActionQueue } from "@/components/AgentActionQueue";
import { LiveScanPanel } from "@/components/LiveScanPanel";
import { WebsiteSourceManager } from "@/components/WebsiteSourceManager";

type AgentWorkspaceTabsProps = {
  agent: AgentModule;
  slug: string;
  workflow: AgentWorkflow;
  estateAgents: EstateAgent[];
  branches: Branch[];
  competitorActivity: CompetitorActivity[];
  marketShare: MarketShareRow[];
  dataSources: DataSource[];
  leadPeriods: LeadPeriod[];
  websites: ScanWebsite[];
  sourceRequirements: AgentSourceRequirement[];
  readOnly?: boolean;
};

const tabs = [
  "Action queue",
  "Live leads",
  "Data sources",
  "Market context",
  "Branch team",
] as const;

type Tab = (typeof tabs)[number];

const moduleContext: Record<
  string,
  {
    filters: string[];
    signals: {
      type: string;
      title: string;
      source: string;
      detail: string;
      action: string;
    }[];
  }
> = {
  "seller-growth": {
    filters: ["Owner intent", "Postcode gap", "Old valuation"],
    signals: [
      {
        type: "Owner intent",
        title: "NG2 downsizer intent cluster",
        source: "Website valuation form + campaign clicks",
        detail: "18 owners viewed sold-price evidence after opening the downsizer email.",
        action: "Send valuation invite with Ben Morrison's recent family-home proof.",
      },
      {
        type: "Postcode gap",
        title: "NG5 bungalow share gap",
        source: "Portal listing share + competitor reductions",
        detail: "David James trails the leading competitor and reductions are rising.",
        action: "Create a bungalow owner call list for Charlotte Reed.",
      },
    ],
  },
  "lead-conversion": {
    filters: ["Response risk", "Unbooked lead", "Lost reason"],
    signals: [
      {
        type: "Response risk",
        title: "36-hour hot lead backlog",
        source: "Internal lead spreadsheet + website form export",
        detail: "18 leads show strong intent but have no valuation appointment booked.",
        action: "Assign each lead and chase the oldest first.",
      },
      {
        type: "Lost reason",
        title: "Lower-fee objection increasing",
        source: "Internal lost valuation notes",
        detail: "Several lost prospects mention cheaper competitors before a manager call.",
        action: "Use value-proof scripts from West Bridgford.",
      },
    ],
  },
  "competitor-intelligence": {
    filters: ["Reduction", "SSTC", "Withdrawal"],
    signals: [
      {
        type: "Reduction",
        title: "NG5 price reductions",
        source: "Rightmove + Zoopla daily scan",
        detail: "11 reductions show sellers may be losing confidence in current campaigns.",
        action: "Match reductions to nearby old valuations and stale prospects.",
      },
      {
        type: "SSTC",
        title: "Fast premium NG2 sales",
        source: "Portal SSTC movement",
        detail: "Comparable homes are moving faster than the patch average.",
        action: "Use as proof in premium seller outreach.",
      },
    ],
  },
  "expired-stale-listings": {
    filters: ["90+ days", "Withdrawal", "Second reduction"],
    signals: [
      {
        type: "90+ days",
        title: "41 stale homes in core patches",
        source: "Portal days-on-market scan",
        detail: "Homes with repeated reductions are likely to need a relaunch plan.",
        action: "Prioritise the top 15 by value and seller motivation.",
      },
      {
        type: "Withdrawal",
        title: "Mapperley withdrawals",
        source: "Portal withdrawal monitoring",
        detail: "Withdrawn homes indicate failed campaigns and possible agent dissatisfaction.",
        action: "Send a discreet relaunch proposal from Daniel Hughes.",
      },
    ],
  },
  "landlord-growth": {
    filters: ["Relist", "Void risk", "Portfolio"],
    signals: [
      {
        type: "Relist",
        title: "NG15 rentals relaunched within 12 months",
        source: "Zoopla rental relist scan",
        detail: "Repeat relists suggest landlords may be unhappy with void periods or service.",
        action: "Offer Ella Watson's yield and compliance review.",
      },
      {
        type: "Portfolio",
        title: "City apartment investor group",
        source: "Internal landlord enquiry file + portal rental stock",
        detail: "Multiple owners have more than one apartment and recent rent-review interest.",
        action: "Invite to a managed portfolio review.",
      },
    ],
  },
  reputation: {
    filters: ["Review request", "Detractor", "Local SEO"],
    signals: [
      {
        type: "Review request",
        title: "Mapperley missing review requests",
        source: "Completion list + Google Business Profile",
        detail: "7 completed clients have no review request logged, suppressing branch trust signals.",
        action: "Send personalised review requests today.",
      },
      {
        type: "Detractor",
        title: "Two service recovery risks",
        source: "Feedback notes + call outcomes",
        detail: "Two clients show negative sentiment before a public review has been left.",
        action: "Escalate manager service recovery calls before close of play.",
      },
      {
        type: "Local SEO",
        title: "Branch profile freshness gap",
        source: "Google Business Profile scan",
        detail: "Photo freshness and owner responses lag stronger competitor profiles.",
        action: "Upload sold boards, staff photos and respond to every new review.",
      },
    ],
  },
  "management-reporting": {
    filters: ["Target gap", "Coaching", "Board pack"],
    signals: [
      {
        type: "Target gap",
        title: "Two branches under conversion target",
        source: "Internal conversion report + weekly branch returns",
        detail: "Mapperley and Arnold are below target appraisal-to-instruction conversion.",
        action: "Schedule coaching with West Bridgford scripts.",
      },
      {
        type: "Board pack",
        title: "Monday trading pack",
        source: "Branch targets + pipeline + valuation diary",
        detail: "The leadership pack needs targets, gaps and named owners by branch.",
        action: "Generate a branch-by-branch action summary.",
      },
    ],
  },
};

export function AgentWorkspaceTabs({
  agent,
  slug,
  workflow,
  estateAgents,
  branches,
  competitorActivity,
  marketShare,
  dataSources,
  leadPeriods,
  websites,
  sourceRequirements,
  readOnly = false,
}: AgentWorkspaceTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Action queue");
  const context = moduleContext[slug];
  const [activeContextFilter, setActiveContextFilter] = useState(
    context.filters[0],
  );
  const [selectedTeamMember, setSelectedTeamMember] = useState("all");
  const relevantBranches = branches.filter((branch) =>
    workflow.queue.some(
      (item) =>
        item.branch === "Group" ||
        item.branch.includes(branch.town) ||
        branch.town.includes(item.branch),
    ),
  );
  const shownBranches = relevantBranches.length > 0 ? relevantBranches : branches;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
        <div className="grid gap-2 md:grid-cols-5">
          {tabs.map((tab) => (
            <button
              className={`rounded-2xl px-4 py-3 text-sm font-black transition ${
                activeTab === tab
                  ? "bg-slate-950 text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Action queue" && (
        <AgentActionQueue
          estateAgents={estateAgents}
          readOnly={readOnly}
          slug={slug}
          workflow={workflow}
        />
      )}

      {activeTab === "Live leads" && (
        <LiveScanPanel
          dataSources={dataSources}
          leadPeriods={leadPeriods}
          readOnly={readOnly}
        />
      )}

      {activeTab === "Data sources" && (
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
                  Recommended needed data sources
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  Websites, files and systems needed for {agent.name}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                This shows the exact websites, internal files and applications
                this agent needs to do its job properly. Anything marked as
                needing a user file can be supplied through Excel or Word before
                direct automated website or internal-file imports are connected.
              </p>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {sourceRequirements
                .filter((requirement) => requirement.agentSlug === slug)
                .map((requirement) => (
                  <details
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 open:bg-white open:shadow-sm"
                    key={requirement.requiredSource}
                  >
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-black">
                            {requirement.requiredSource}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-500">
                            Owner: {requirement.suggestedOwner}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${
                            requirement.currentStatus === "Needs user file"
                              ? "bg-amber-100 text-amber-800"
                              : requirement.currentStatus === "Trusted website source"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {requirement.currentStatus}
                        </span>
                      </div>
                    </summary>
                    <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4">
                      <div className="rounded-xl bg-blue-50 p-3 text-sm leading-6">
                        <p className="font-black text-blue-700">Required fields</p>
                        <p className="font-semibold text-slate-800">
                          {requirement.requiredFields}
                        </p>
                      </div>
                      <div className="rounded-xl bg-white p-3 text-sm leading-6">
                        <p className="font-black text-slate-700">Why required</p>
                        <p className="font-semibold text-slate-800">
                          {requirement.whyNeeded}
                        </p>
                      </div>
                    </div>
                  </details>
                ))}
            </div>
          </section>
          <WebsiteSourceManager readOnly={readOnly} websites={websites} />
        </div>
      )}

      {activeTab === "Market context" && (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
                Market context
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Why {agent.name} is recommending these actions
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              This combines postcode share, competitor movement and branch
              trading signals so each action has a commercial reason.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <h3 className="text-lg font-black">Competitor triggers</h3>
              <div className="mt-4 space-y-3">
                {context.signals
                  .filter((signal) => signal.type === activeContextFilter)
                  .map((signal) => (
                    <details
                      className="rounded-xl bg-slate-50 p-3 open:bg-blue-50"
                      key={signal.title}
                    >
                      <summary className="cursor-pointer list-none">
                        <p className="text-sm font-black">{signal.title}</p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-wide text-blue-600">
                          {signal.type} | click for source
                        </p>
                      </summary>
                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        Source: {signal.source}
                      </p>
                      <p className="mt-2 text-sm text-slate-600">{signal.detail}</p>
                      <p className="mt-2 rounded-xl bg-white p-3 text-sm font-semibold text-blue-950">
                        Action: {signal.action}
                      </p>
                    </details>
                  ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {context.filters.map((filter) => (
                  <button
                    className={`rounded-full px-4 py-2 text-xs font-black ${
                      activeContextFilter === filter
                        ? "bg-slate-950 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                    key={filter}
                    onClick={() => setActiveContextFilter(filter)}
                    type="button"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <h3 className="text-lg font-black">Supporting market evidence</h3>
              <div className="mt-4 space-y-3">
                {competitorActivity.slice(0, 3).map((row) => (
                  <details className="rounded-xl bg-slate-50 p-3 open:bg-white" key={`${row.competitor}-${row.property}`}>
                    <summary className="cursor-pointer list-none">
                    <p className="text-sm font-black">
                      {row.competitor} | {row.activity} | {row.postcode}
                    </p>
                    </summary>
                    <p className="mt-2 text-sm text-slate-600">
                      {row.property} ({row.value}) - {row.movement}
                    </p>
                    <p className="mt-2 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-950">
                      Action: {row.action}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <h3 className="text-lg font-black">Postcode share gaps</h3>
              <div className="mt-4 space-y-3">
                {marketShare.map((row) => (
                  <details className="rounded-xl bg-slate-50 p-3 open:bg-white" key={row.postcode}>
                    <summary className="cursor-pointer list-none">
                    <p className="text-sm font-black">
                      {row.postcode}: DJ {row.davidJamesShare} vs {row.leadingCompetitor} {row.competitorShare}
                    </p>
                    </summary>
                    <p className="mt-2 text-sm text-slate-600">{row.opportunity}</p>
                    <p className="mt-2 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-950">
                      Action: {row.action}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "Branch team" && (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
                Branch team
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Estate agents available for assignment
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Use this view to decide who should own the action before filtering
              the queue by that person.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {estateAgents.map((person) => (
              <button
                className={`rounded-2xl p-4 text-left transition ${
                  selectedTeamMember === person.id
                    ? "bg-blue-50 ring-2 ring-blue-200"
                    : "bg-slate-50 hover:bg-slate-100"
                }`}
                key={person.id}
                onClick={() => setSelectedTeamMember(person.id)}
                type="button"
              >
                <p className="text-lg font-black">{person.name}</p>
                <p className="mt-1 text-sm font-bold text-blue-700">
                  {person.role}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {person.branch} | {person.patch}
                </p>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                  {person.speciality}
                </p>
                <div className="mt-4 rounded-xl bg-white p-3 text-sm font-black">
                  {person.activeLeads} active leads/tasks
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-600"
              onClick={() => setSelectedTeamMember("all")}
              type="button"
            >
              Show all branch actions
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {shownBranches
              .filter((branch) => {
                if (selectedTeamMember === "all") {
                  return true;
                }

                const person = estateAgents.find((agent) => agent.id === selectedTeamMember);
                return person?.branch === branch.town || person?.branch === branch.name.replace("David James ", "");
              })
              .map((branch) => (
              <article className="rounded-2xl border border-slate-200 p-4" key={branch.name}>
                <p className="text-lg font-black">{branch.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {branch.manager} manages {branch.headcount} people, with{" "}
                  {branch.sellerLeads} seller leads and {branch.landlordLeads} landlord leads.
                </p>
                <p className="mt-3 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-950">
                  Action: {branch.action}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
