"use client";

import { useMemo, useState } from "react";
import type { AgentWorkflow, EstateAgent } from "@/data/dashboard";

type QueueItem = AgentWorkflow["queue"][number];

type Assignment = {
  assignedTo: string;
  status: "New" | "Assigned" | "In progress" | "Done";
};

type AgentActionQueueProps = {
  slug: string;
  workflow: AgentWorkflow;
  estateAgents: EstateAgent[];
  readOnly?: boolean;
};

const sourceByAgent: Record<string, string> = {
  "seller-growth":
    "Internal valuation history, website valuation forms, portal listing movement, postcode market-share data and branch prospect notes.",
  "lead-conversion":
    "Website enquiries, phone leads, valuation form submissions, internal lead timestamps, source attribution and negotiator follow-up status.",
  "competitor-intelligence":
    "Rightmove, Zoopla, OnTheMarket, competitor branch websites, listing status changes and local market-share tracking.",
  "expired-stale-listings":
    "Portal days-on-market tracking, withdrawal flags, price reduction history and previous David James valuation records.",
  "landlord-growth":
    "Lettings enquiries, rental relist data, managed portfolio records, void signals, landlord review dates and portal rental movement.",
  reputation:
    "Google reviews, AllAgents reviews, completion records, valuation feedback, detractor flags and branch service notes.",
  "management-reporting":
    "Branch trading returns, valuation diaries, internal lead activity, pipeline movement, call outcomes and weekly target data.",
};

function defaultAgentForItem(item: QueueItem, estateAgents: EstateAgent[]) {
  return (
    estateAgents.find((agent) => item.branch.includes(agent.branch.split(" ").at(-1) ?? "")) ??
    estateAgents.find((agent) => item.branch.includes(agent.branch)) ??
    estateAgents[0]
  );
}

function buildBreakdown({
  slug,
  item,
  index,
  owner,
}: {
  slug: string;
  item: QueueItem;
  index: number;
  owner: EstateAgent;
}) {
  const confidence = ["High", "Medium-high", "Medium"][index] ?? "Medium";
  const due = ["Today", "48 hours", "This week"][index] ?? "This week";
  const leadSource =
    item.leadSource ??
    (slug.includes("competitor")
      ? "Competitor and portal movement"
      : slug.includes("landlord")
        ? "Landlord enquiry and rental market signal"
        : "Internal files, website data and branch activity");

  return {
    source: item.sourceDetail ?? sourceByAgent[slug],
    owner,
    due,
    confidence,
    leadSource,
    reason:
      item.reason ??
      `${item.item} appears because ${item.value.toLowerCase()} is linked to a live commercial opportunity in ${item.branch}. The agent is surfacing it because it can plausibly create seller leads, landlord instructions, faster conversion or market-share recovery.`,
    evidence: [
      `${item.value} identified in the current operating data.`,
      `${item.branch} is the accountable patch or group-level area for this action.`,
      `${owner.name} is a good fit because their patch is ${owner.patch} and their speciality is ${owner.speciality.toLowerCase()}.`,
    ],
  };
}

export function AgentActionQueue({
  slug,
  workflow,
  estateAgents,
  readOnly = false,
}: AgentActionQueueProps) {
  const defaults = useMemo(
    () =>
      Object.fromEntries(
        workflow.queue.map((item) => [
          item.item,
          {
            assignedTo:
              item.assignedTo ?? defaultAgentForItem(item, estateAgents).id,
            status: "New" as const,
          },
        ]),
      ),
    [estateAgents, workflow.queue],
  );
  const [assignments, setAssignments] = useState<Record<string, Assignment>>(defaults);
  const [agentFilter, setAgentFilter] = useState("all");

  const visibleQueue = workflow.queue.filter((item) => {
    if (agentFilter === "all") {
      return true;
    }

    return assignments[item.item]?.assignedTo === agentFilter;
  });

  function updateAssignment(item: string, assignedTo: string) {
    setAssignments((current) => ({
      ...current,
      [item]: {
        ...current[item],
        assignedTo,
        status: "Assigned",
      },
    }));
  }

  function updateStatus(item: string, status: Assignment["status"]) {
    setAssignments((current) => ({
      ...current,
      [item]: {
        ...current[item],
        status,
      },
    }));
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
            Action queue
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Prioritised work for the team
          </h2>
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-wide text-slate-500">
            Filter by estate agent
          </label>
          <select
            className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-blue-400"
            onChange={(event) => setAgentFilter(event.target.value)}
            value={agentFilter}
          >
            <option value="all">All estate agents</option>
            {estateAgents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-5">
        {estateAgents.map((agent) => (
          <button
            className={`rounded-2xl border p-3 text-left transition ${
              agentFilter === agent.id
                ? "border-blue-300 bg-blue-50"
                : "border-slate-200 bg-slate-50 hover:border-slate-300"
            }`}
            key={agent.id}
            onClick={() => setAgentFilter(agent.id)}
            type="button"
          >
            <p className="text-sm font-black">{agent.name}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              {agent.branch} | {agent.activeLeads} active
            </p>
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {visibleQueue.map((item, index) => {
          const assignment = assignments[item.item];
          const owner =
            estateAgents.find((agent) => agent.id === assignment.assignedTo) ??
            estateAgents[0];
          const breakdown = buildBreakdown({ slug, item, index, owner });

          return (
            <details
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition open:border-blue-200 open:bg-white open:shadow-md"
              key={item.item}
            >
              <summary className="cursor-pointer list-none">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-blue-600">
                      Priority {index + 1} | {item.branch}
                    </p>
                    <h3 className="mt-2 text-xl font-black">{item.item}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {item.value}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-white">
                    Click for breakdown
                  </span>
                </div>
                <div className="mt-4 rounded-2xl border border-blue-100 bg-white p-4 text-sm font-semibold leading-6 text-blue-950">
                  Next action: {item.nextAction}
                </div>
              </summary>

              <div className="mt-5 grid gap-4 border-t border-slate-200 pt-5 md:grid-cols-2">
                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-blue-700">
                    Where this lead/signal came from
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                    {breakdown.leadSource}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {breakdown.source}
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                    Why it is here
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                    {breakdown.reason}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 md:col-span-2">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                    Evidence and context
                  </p>
                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    {breakdown.evidence.map((evidence) => (
                      <div
                        className="rounded-xl border border-slate-200 p-3 text-sm font-semibold leading-6 text-slate-700"
                        key={evidence}
                      >
                        {evidence}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-950 p-4 text-white">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-300">
                    {readOnly ? "Assigned owner" : "Assign and track"}
                  </p>
                  {readOnly ? (
                    <div className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-950">
                      {owner.name} | {assignment.status}
                    </div>
                  ) : (
                    <div className="mt-3 grid gap-3">
                      <select
                        className="rounded-xl border border-white/10 bg-white px-3 py-2 text-sm font-bold text-slate-950"
                        onChange={(event) =>
                          updateAssignment(item.item, event.target.value)
                        }
                        value={assignment.assignedTo}
                      >
                        {estateAgents.map((agent) => (
                          <option key={agent.id} value={agent.id}>
                            {agent.name}
                          </option>
                        ))}
                      </select>
                      <select
                        className="rounded-xl border border-white/10 bg-white px-3 py-2 text-sm font-bold text-slate-950"
                        onChange={(event) =>
                          updateStatus(item.item, event.target.value as Assignment["status"])
                        }
                        value={assignment.status}
                      >
                        <option>New</option>
                        <option>Assigned</option>
                        <option>In progress</option>
                        <option>Done</option>
                      </select>
                    </div>
                  )}
                  <p className="mt-3 text-sm font-semibold leading-6">
                    Due: {breakdown.due}
                    <br />
                    Confidence: {breakdown.confidence}
                  </p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-amber-700">
                    Suggested talk track
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                    Use the local market signal as the reason for contact, then
                    offer a specific valuation, relaunch, yield or service review
                    rather than a generic sales call.
                  </p>
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
