import { AgentWorkspaceTabs } from "@/components/AgentWorkspaceTabs";
import { DataSourceBanner } from "@/components/DataSourceBanner";
import {
  agentModules,
  agentSlugs,
  agentSourceRequirements,
  agentWorkflows,
  branches,
  competitorActivity,
  dataSources,
  estateAgents,
  leadPeriods,
  marketShare,
  recommendedScanWebsites,
} from "@/data/dashboard";
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
      ? `Read-only ${agent.name} | David James Growth Command Centre`
      : "Read-only agent module | David James Growth Command Centre",
  };
}

export default async function ReadOnlyAgentPage({ params }: PageProps) {
  const { slug } = await params;
  const agent = agentModules.find((item) => agentSlugs[item.name] === slug);
  const workflow = agentWorkflows[slug];

  if (!agent || !workflow) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DataSourceBanner
        dataSources={dataSources}
        websites={recommendedScanWebsites}
      />
      <section className="bg-slate-950 px-6 py-8 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link className="text-sm font-bold text-blue-200" href="/read-only">
            &lt;- Back to read-only dashboard
          </Link>
          <div className="mt-8 inline-flex rounded-full bg-emerald-300 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-950">
            Read-only module
          </div>
          <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
            {agent.name}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            {workflow.focus}
          </p>
        </div>
      </section>
      <AgentWorkspaceTabs
        agent={agent}
        branches={branches}
        competitorActivity={competitorActivity}
        dataSources={dataSources}
        estateAgents={estateAgents}
        leadPeriods={leadPeriods}
        marketShare={marketShare}
        readOnly
        slug={slug}
        sourceRequirements={agentSourceRequirements}
        websites={recommendedScanWebsites}
        workflow={workflow}
      />
    </main>
  );
}
