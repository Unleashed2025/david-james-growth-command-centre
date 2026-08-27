import {
  agentModules,
  agentSlugs,
  branches,
  competitorActivity,
  dataSources,
  leadPeriods,
  kpis,
  marketShare,
  marketingActions,
  opportunities,
  recommendedScanWebsites,
} from "@/data/dashboard";
import { ExecutiveKpiGrid } from "@/components/ExecutiveKpiGrid";
import { DataSourceBanner } from "@/components/DataSourceBanner";
import { LiveScanPanel } from "@/components/LiveScanPanel";
import { WebsiteSourceManager } from "@/components/WebsiteSourceManager";
import Link from "next/link";
import type { ReactNode } from "react";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function ActionPill({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-2xl border border-blue-100 bg-white/80 p-3 text-sm font-semibold leading-5 text-blue-950 shadow-sm">
      Action: {children}
    </div>
  );
}

export default function Home() {
  const totalHeadcount = branches.reduce((total, branch) => total + branch.headcount, 0);
  const totalSellerLeads = branches.reduce((total, branch) => total + branch.sellerLeads, 0);
  const totalLandlordLeads = branches.reduce((total, branch) => total + branch.landlordLeads, 0);

  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DataSourceBanner
        dataSources={dataSources}
        websites={recommendedScanWebsites}
      />
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.35),_transparent_32%),radial-gradient(circle_at_70%_20%,_rgba(16,185,129,0.18),_transparent_28%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
          <nav className="flex flex-wrap items-center justify-between gap-4 text-sm text-white/70">
            <div className="font-bold uppercase tracking-[0.28em] text-white">
              David James Growth Command Centre
            </div>
            <div className="flex flex-wrap gap-3">
              {["CEO dashboard", "Growth agents", "Competitors", "Opportunities"].map(
                (item) => (
                  <a
                    className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/30 hover:text-white"
                    href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                    key={item}
                  >
                    {item}
                  </a>
                ),
              )}
            </div>
          </nav>

          <div className="grid gap-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-blue-200">
                Board-level estate agency growth OS
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
                Turn market intelligence into seller and landlord instructions.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                A CEO dashboard for 44 people across 5 branches, designed to
                show where growth is hiding and what the team should do next.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white p-4 text-slate-950">
                  <p className="text-3xl font-black">5</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Branches
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-950">
                  <p className="text-3xl font-black">{totalHeadcount}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    People
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 text-slate-950">
                  <p className="text-3xl font-black">{totalSellerLeads + totalLandlordLeads}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Leads
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-50">
                CEO priority: recover postcode share in NG3, NG4 and NG5 while
                converting the current high-intent valuation backlog.
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:px-8">
        <section id="ceo-dashboard">
          <SectionHeading
            eyebrow="CEO dashboard"
            title="This month's trading picture"
            description="Each board metric includes a next action so the dashboard drives growth behaviour, not just reporting."
          />
          <ExecutiveKpiGrid kpis={kpis} />
        </section>

        <LiveScanPanel dataSources={dataSources} leadPeriods={leadPeriods} />

        <section id="growth-agents">
          <SectionHeading
            eyebrow="Specialist agents"
            title="Agent capability behind the homepage"
            description="The MVP presents each agent as an actionable module ready to become a deeper workflow when data integrations arrive."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {agentModules.map((agent) => (
              <Link
                href={`/agents/${agentSlugs[agent.name]}`}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
                key={agent.name}
              >
                <h3 className="text-lg font-black text-slate-950">{agent.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{agent.promise}</p>
                <div className="mt-4 rounded-2xl bg-slate-100 p-3 text-sm font-semibold text-slate-700">
                  Signal: {agent.signal}
                </div>
                <ActionPill>{agent.action}</ActionPill>
                <p className="mt-4 text-sm font-black text-blue-700">
                  Open module -&gt;
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section id="opportunities" className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-300">
              Opportunities
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Actions for this week&apos;s trading meeting
            </h2>
            <div className="mt-6 space-y-4">
              {opportunities.map((opportunity) => (
                <article
                  className="rounded-2xl border border-white/10 bg-white/10 p-4"
                  key={opportunity.title}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold">{opportunity.title}</h3>
                      <p className="mt-1 text-sm text-slate-300">
                        {opportunity.owner} | {opportunity.value}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-emerald-950">
                      {opportunity.urgency}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white">{opportunity.action}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeading
              eyebrow="Branch performance"
              title="5-site operating view"
              description="Branch managers get a clear commercial action linked to their local patch."
            />
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Branch</th>
                    <th className="px-4 py-3">Manager</th>
                    <th className="px-4 py-3">Patch</th>
                    <th className="px-4 py-3">Pipeline</th>
                    <th className="px-4 py-3">Valuations</th>
                    <th className="px-4 py-3">Conversion</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {branches.map((branch) => (
                    <tr key={branch.name}>
                      <td className="px-4 py-4 font-bold text-slate-950">{branch.town}</td>
                      <td className="px-4 py-4 text-slate-600">{branch.manager}</td>
                      <td className="px-4 py-4 text-slate-600">{branch.postcodeFocus}</td>
                      <td className="px-4 py-4 text-slate-600">{branch.salesPipeline}</td>
                      <td className="px-4 py-4 font-semibold text-slate-950">
                        {branch.valuationsBooked}
                      </td>
                      <td className="px-4 py-4 font-semibold text-slate-950">
                        {branch.conversionRate}
                      </td>
                      <td className="px-4 py-4 text-blue-700">{branch.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="competitors">
          <SectionHeading
            eyebrow="Competitor intelligence"
            title="Moves that should trigger a commercial response"
            description="Source-fed competitor data covers new listings, SSTC, let agreed, price reductions, withdrawals, days on market and local response actions."
          />
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <thead className="bg-slate-950 text-xs uppercase tracking-wide text-white/70">
                <tr>
                  <th className="px-5 py-4">Competitor</th>
                  <th className="px-5 py-4">Patch</th>
                  <th className="px-5 py-4">Activity</th>
                  <th className="px-5 py-4">Property</th>
                  <th className="px-5 py-4">Value</th>
                  <th className="px-5 py-4">DOM</th>
                  <th className="px-5 py-4">Movement</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {competitorActivity.map((row) => (
                  <tr key={`${row.competitor}-${row.property}`}>
                    <td className="px-5 py-4 font-bold text-slate-950">{row.competitor}</td>
                    <td className="px-5 py-4 text-slate-600">
                      {row.branch} ({row.postcode})
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {row.activity}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{row.property}</td>
                    <td className="px-5 py-4 font-semibold text-slate-950">{row.value}</td>
                    <td className="px-5 py-4 text-slate-600">{row.daysOnMarket}</td>
                    <td className="px-5 py-4 text-slate-600">{row.movement}</td>
                    <td className="px-5 py-4 text-blue-700">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeading
              eyebrow="Market share"
              title="Postcode opportunities"
              description="Prioritise the patches where a share gap can become a targeted seller or landlord campaign."
            />
            <div className="space-y-4">
              {marketShare.map((row) => (
                <article className="rounded-2xl bg-slate-50 p-4" key={row.postcode}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-black">{row.postcode}</h3>
                    <p className="text-sm font-bold text-slate-600">
                      DJ {row.davidJamesShare} vs {row.leadingCompetitor} {row.competitorShare}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{row.opportunity}</p>
                  <ActionPill>{row.action}</ActionPill>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeading
              eyebrow="Marketing and reputation"
              title="Campaigns that create instructions"
              description="Marketing performance is tied back to branch actions, seller conversion and review generation."
            />
            <div className="space-y-4">
              {marketingActions.map((item) => (
                <article className="rounded-2xl border border-slate-200 p-4" key={item.channel}>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-black">{item.channel}</h3>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      {item.performance}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.insight}</p>
                  <ActionPill>{item.action}</ActionPill>
                </article>
              ))}
            </div>
          </div>
        </section>

        <WebsiteSourceManager websites={recommendedScanWebsites} />
      </div>
    </main>
  );
}
