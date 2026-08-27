import { DataSourceBanner } from "@/components/DataSourceBanner";
import { MicrosoftIntegrationGuide } from "@/components/MicrosoftIntegrationGuide";
import { dataSources, recommendedScanWebsites } from "@/data/dashboard";
import Link from "next/link";

export const metadata = {
  title: "Teams and Copilot setup | David James Growth Command Centre",
};

export default function MicrosoftSetupPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DataSourceBanner
        dataSources={dataSources}
        websites={recommendedScanWebsites}
      />
      <section className="bg-slate-950 px-6 py-10 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link className="text-sm font-bold text-blue-200" href="/read-only/">
            &lt;- Back to read-only demo
          </Link>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
            Microsoft Teams and Copilot rollout
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Use this page to explain how the dashboard can sit inside Teams,
            use SharePoint Excel as the data layer, trigger Power Automate
            alerts, and support a Copilot Studio assistant.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <MicrosoftIntegrationGuide />
      </div>
    </main>
  );
}
