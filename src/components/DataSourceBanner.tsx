import type { DataSource, ScanWebsite } from "@/data/dashboard";

type DataSourceBannerProps = {
  dataSources: DataSource[];
  websites: ScanWebsite[];
};

export function DataSourceBanner({
  dataSources,
  websites,
}: DataSourceBannerProps) {
  const essentialWebsites = websites
    .filter((website) => website.priority === "Essential")
    .map((website) => website.name);
  const internalFiles = dataSources
    .filter((source) => source.status === "Internal file")
    .map((source) => source.name);

  return (
    <section className="border-b border-white/10 bg-slate-900 px-6 py-4 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-300">
            Data sources powering this app
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-300">
            No app API integrations in this phase: data comes from trusted
            websites plus internal Excel/CSV files.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          {[...essentialWebsites, ...internalFiles].map((source) => (
            <span
              className="rounded-full border border-white/10 bg-white/10 px-3 py-2"
              key={source}
            >
              {source}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
