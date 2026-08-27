import { DataSourceBanner } from "@/components/DataSourceBanner";
import { ExecutiveKpiGrid } from "@/components/ExecutiveKpiGrid";
import { LiveScanPanel } from "@/components/LiveScanPanel";
import { WebsiteSourceManager } from "@/components/WebsiteSourceManager";
import {
  agentModules,
  agentSlugs,
  dataSources,
  kpis,
  leadPeriods,
  recommendedScanWebsites,
} from "@/data/dashboard";
import Link from "next/link";

export const metadata = {
  title: "Read-only demo | David James Growth Command Centre",
};

export default function ReadOnlyDashboard() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DataSourceBanner
        dataSources={dataSources}
        websites={recommendedScanWebsites}
      />
      <section className="bg-slate-950 px-6 py-10 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex rounded-full bg-emerald-300 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-950">
            Read-only share demo
          </div>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
            David James Growth Command Centre
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Share this version to explain the idea. Viewers can click tabs,
            filters and drilldowns, but cannot add/delete sources or change
            task assignments.
          </p>
          <Link
            className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950"
            href="/"
          >
            Open editable local version
          </Link>
          <Link
            className="ml-3 mt-6 inline-flex rounded-full bg-emerald-300 px-5 py-3 text-sm font-black text-emerald-950"
            href="/read-only/microsoft/"
          >
            Teams + Copilot setup
          </Link>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:px-8">
        <section>
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
                CEO dashboard
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                Board-level trading picture
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              KPI cards stay clickable so viewers can see the source, reason,
              evidence and action behind each number.
            </p>
          </div>
          <ExecutiveKpiGrid kpis={kpis} />
        </section>

        <section>
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
                Specialist agents
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                Read-only module previews
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Each module opens as a read-only workspace with action queue, live
              leads, data sources, market context and branch team tabs.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {agentModules.map((agent) => (
              <Link
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                href={`/read-only/agents/${agentSlugs[agent.name]}`}
                key={agent.name}
              >
                <h3 className="text-lg font-black text-slate-950">{agent.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {agent.promise}
                </p>
                <div className="mt-4 rounded-2xl bg-slate-100 p-3 text-sm font-semibold text-slate-700">
                  Signal: {agent.signal}
                </div>
                <p className="mt-4 text-sm font-black text-blue-700">
                  Open read-only module -&gt;
                </p>
              </Link>
            ))}
          </div>
        </section>

        <LiveScanPanel
          dataSources={dataSources}
          leadPeriods={leadPeriods}
          readOnly
        />
        <WebsiteSourceManager readOnly websites={recommendedScanWebsites} />
      </div>
    </main>
  );
}
