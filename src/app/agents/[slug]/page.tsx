import {
  agentModules,
  agentSourceRequirements,
  agentSlugs,
  agentWorkflows,
  branches,
  competitorActivity,
  dataSources,
  estateAgents,
  leadPeriods,
  marketShare,
  recommendedScanWebsites,
} from "@/data/dashboard";
import { AgentWorkspaceTabs } from "@/components/AgentWorkspaceTabs";
import { DataSourceBanner } from "@/components/DataSourceBanner";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return Object.values(agentSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const agent = agentModules.find((item) => agentSlugs[item.name] === slug);

  return {
    title: agent
      ? `${agent.name} | David James Growth Command Centre`
      : "Agent Module | David James Growth Command Centre",
  };
}

export default async function AgentPage({ params }: PageProps) {
  const { slug } = await params;
  const agent = agentModules.find((item) => agentSlugs[item.name] === slug);
  const workflow = agentWorkflows[slug];

  if (!agent || !workflow) {
    notFound();
  }

  const relatedBranch = branches.find((branch) =>
    workflow.queue.some((item) => item.branch.includes(branch.town)),
  );

  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DataSourceBanner
        dataSources={dataSources}
        websites={recommendedScanWebsites}
      />
      <section className="bg-slate-950 px-6 py-8 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link className="text-sm font-bold text-blue-200" href="/">
            &lt;- Back to CEO dashboard
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">
                Specialist growth module
              </p>
              <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
                {agent.name}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                {workflow.focus}
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Current signal
              </p>
              <p className="mt-3 text-2xl font-black">{agent.signal}</p>
              <div className="mt-5 rounded-2xl bg-emerald-300 p-4 text-emerald-950">
                <p className="text-sm font-black uppercase tracking-wide">
                  Primary metric
                </p>
                <p className="mt-1 text-3xl font-black">{workflow.metric}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm leading-6 text-slate-600">
            {relatedBranch
              ? `${relatedBranch.town} is converting at ${relatedBranch.conversionRate} with ${relatedBranch.salesPipeline} in sales pipeline.`
              : "Group-level actions span all five branches and should be reviewed in Monday trading."}{" "}
            Competitor activity includes {competitorActivity.length} source-fed market
            moves and {marketShare.length} postcode share gaps.
          </p>
        </div>
      </div>
      <AgentWorkspaceTabs
        agent={agent}
        branches={branches}
        competitorActivity={competitorActivity}
        dataSources={dataSources}
        estateAgents={estateAgents}
        leadPeriods={leadPeriods}
        marketShare={marketShare}
        slug={slug}
        websites={recommendedScanWebsites}
        sourceRequirements={agentSourceRequirements}
        workflow={workflow}
      />
    </main>
  );
}
