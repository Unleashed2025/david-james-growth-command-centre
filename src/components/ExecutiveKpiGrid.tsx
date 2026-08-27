"use client";

import { useState } from "react";
import type { Kpi } from "@/data/dashboard";

type ExecutiveKpiGridProps = {
  kpis: Kpi[];
};

const toneStyles = {
  blue: "border-blue-200 bg-blue-50 text-blue-950",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-950",
  amber: "border-amber-200 bg-amber-50 text-amber-950",
  rose: "border-rose-200 bg-rose-50 text-rose-950",
  violet: "border-violet-200 bg-violet-50 text-violet-950",
  slate: "border-slate-200 bg-slate-50 text-slate-950",
};

const kpiBreakdowns: Record<
  string,
  {
    source: string;
    reason: string;
    owner: string;
    records: string[];
  }
> = {
  "Seller and landlord leads": {
    source:
      "Website valuation forms, landlord forms, phone enquiries, Google Business Profile calls, campaign landing pages and internal lead files.",
    reason:
      "This card shows whether the business has enough top-of-funnel opportunity today, this week and this month.",
    owner: "Growth Director and branch managers",
    records: [
      "38 hot leads need a named owner and same-day follow-up.",
      "NG2 and NG15 are producing the strongest current enquiry volume.",
      "Landlord enquiries are weighted towards Hucknall and Nottingham Central.",
    ],
  },
  "Valuations booked": {
    source:
      "Internal diary file, online valuation bookings, branch callbacks and manager-confirmed appointments.",
    reason:
      "Valuation appointments are the leading indicator for future sales and lettings instructions.",
    owner: "Branch managers",
    records: [
      "14 diary slots remain open and should be filled from warm leads.",
      "West Bridgford has the strongest booking conversion.",
      "No-shows should be rebooked within 24 hours by a manager.",
    ],
  },
  "Instructions won": {
    source:
      "Internal instruction status file, signed agency agreements, lettings management wins and fee reports.",
    reason:
      "This measures whether leads and valuations are converting into actual commercial stock.",
    owner: "Managing Director",
    records: [
      "49 instructions are currently shown in the current source-backed month.",
      "Mapperley and Arnold need conversion coaching below 30%.",
      "High-value wins should trigger review requests and local proof campaigns.",
    ],
  },
  "Market share risk": {
    source:
      "Portal listing counts, postcode market-share tracking, competitor listings and David James instruction data.",
    reason:
      "A postcode share gap highlights where the agency is losing local visibility and seller consideration.",
    owner: "Growth Director",
    records: [
      "NG3, NG4 and NG5 are below target share.",
      "Arnold has a gap versus Bairstow Eves in NG5.",
      "Mapperley needs stale listing and probate-focused campaigns.",
    ],
  },
  "Competitor moves": {
    source:
      "Rightmove, Zoopla, OnTheMarket, Home.co.uk, competitor websites and branch market notes.",
    reason:
      "Competitor reductions, withdrawals and quick sales create reasons to contact nearby sellers and landlords.",
    owner: "Market Intelligence lead",
    records: [
      "22 reductions can be matched to old valuation prospects.",
      "11 withdrawals can trigger relaunch conversations.",
      "18 premium listings should inform pricing and proof campaigns.",
    ],
  },
  "Reputation score": {
    source:
      "Google Business Profiles, AllAgents, post-completion internal records and customer feedback notes.",
    reason:
      "Reviews affect seller trust, local SEO visibility and branch-level conversion from search.",
    owner: "Marketing Manager",
    records: [
      "Mapperley has 7 completed clients with no review request logged.",
      "Two detractor risks need service recovery before public reviews.",
      "Review volume should be linked to completed valuations and instructions.",
    ],
  },
};

export function ExecutiveKpiGrid({ kpis }: ExecutiveKpiGridProps) {
  const [selectedKpi, setSelectedKpi] = useState(kpis[0].label);
  const activeKpi = kpis.find((kpi) => kpi.label === selectedKpi) ?? kpis[0];
  const breakdown = kpiBreakdowns[activeKpi.label];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kpis.map((kpi) => (
          <button
            className={`rounded-[1.5rem] border p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${toneStyles[kpi.tone]} ${
              selectedKpi === kpi.label ? "ring-4 ring-blue-500/20" : ""
            }`}
            key={kpi.label}
            onClick={() => setSelectedKpi(kpi.label)}
            type="button"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide opacity-70">
                  {kpi.label}
                </p>
                <p className="mt-3 text-4xl font-black tracking-tight">
                  {kpi.value}
                </p>
              </div>
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold">
                Drill down
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 opacity-80">{kpi.context}</p>
            <div className="mt-4 rounded-2xl border border-blue-100 bg-white/80 p-3 text-sm font-semibold leading-5 text-blue-950 shadow-sm">
              Action: {kpi.action}
            </div>
          </button>
        ))}
      </div>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-600">
              KPI drilldown
            </p>
            <h3 className="mt-2 text-2xl font-black">{activeKpi.label}</h3>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-600">
              {breakdown.reason}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white">
            <p className="text-xs font-black uppercase tracking-wide text-slate-300">
              Owner
            </p>
            <p className="mt-1 text-sm font-bold">{breakdown.owner}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl bg-blue-50 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-blue-700">
              Data source
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
              {breakdown.source}
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {breakdown.records.map((record) => (
              <details
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 open:bg-white"
                key={record}
              >
                <summary className="cursor-pointer list-none text-sm font-black text-slate-950">
                  Open evidence
                </summary>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                  {record}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
