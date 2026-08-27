"use client";

import { useMemo, useState } from "react";
import type { DataSource, LeadPeriod, LeadRecord } from "@/data/dashboard";

type LiveScanPanelProps = {
  dataSources: DataSource[];
  leadPeriods: LeadPeriod[];
  compact?: boolean;
  readOnly?: boolean;
};

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function LiveScanPanel({
  dataSources,
  leadPeriods,
  compact = false,
  readOnly = false,
}: LiveScanPanelProps) {
  const [scanCount, setScanCount] = useState(0);
  const [lastScan, setLastScan] = useState(() => new Date());
  const [selectedPeriod, setSelectedPeriod] = useState(leadPeriods[0].label);
  const [selectedMetric, setSelectedMetric] = useState<
    "All" | LeadRecord["type"] | "Hot"
  >("All");

  const activePeriod = useMemo(
    () => leadPeriods.find((period) => period.label === selectedPeriod) ?? leadPeriods[0],
    [leadPeriods, selectedPeriod],
  );

  function runLiveScan() {
    setScanCount((count) => count + 1);
    setLastScan(new Date());
  }

  const visibleRecords = activePeriod.records.filter((record) => {
    if (selectedMetric === "All") {
      return true;
    }

    if (selectedMetric === "Hot") {
      return record.urgency === "Hot";
    }

    return record.type === selectedMetric;
  });

  return (
    <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
            Live scan
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
            Check today&apos;s freshest lead and market data
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            This button represents the operating process for refreshing today&apos;s
            data from internal files, website forms, trusted property websites
            and review websites. The Excel source register is the manual bridge
            until automated imports are built.
          </p>
        </div>
        {readOnly ? (
          <span className="rounded-full bg-slate-100 px-5 py-3 text-sm font-black text-slate-600">
            Read-only demo
          </span>
        ) : (
          <button
            className="rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            onClick={runLiveScan}
            type="button"
          >
            Run live scan
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <p className="text-xs font-black uppercase tracking-wide text-slate-300">
            Last refreshed
          </p>
          <p className="mt-2 text-lg font-black">{formatTime(lastScan)}</p>
          <p className="mt-1 text-xs text-slate-300">
            Manual scans this session: {scanCount}
          </p>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-950">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
            Source readiness
          </p>
          <p className="mt-2 text-lg font-black">
            {dataSources.length} sources mapped
          </p>
          <p className="mt-1 text-xs font-semibold">
            Manual files and trusted websites work now; automated imports can be added later.
          </p>
        </div>
        <div className="rounded-2xl bg-amber-50 p-4 text-amber-950">
          <p className="text-xs font-black uppercase tracking-wide text-amber-700">
            Freshness rule
          </p>
          <p className="mt-2 text-lg font-black">Show date, source and reason</p>
          <p className="mt-1 text-xs font-semibold">
            Every insight should explain where it came from and what to do next.
          </p>
        </div>
      </div>

      {!compact && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Cadence</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Used for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {dataSources.map((source) => (
                <tr key={source.name}>
                  <td className="px-4 py-4 font-bold text-slate-950">{source.name}</td>
                  <td className="px-4 py-4 text-slate-600">{source.type}</td>
                  <td className="px-4 py-4 text-slate-600">{source.cadence}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {source.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{source.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-5">
        <div className="flex flex-wrap gap-2">
          {leadPeriods.map((period) => (
            <button
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                selectedPeriod === period.label
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              key={period.label}
              onClick={() => {
                setSelectedPeriod(period.label);
                setSelectedMetric("All");
              }}
              type="button"
            >
              {period.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {[
            ["Seller leads", activePeriod.sellerLeads, "Seller"],
            ["Landlord leads", activePeriod.landlordLeads, "Landlord"],
            ["Valuations", activePeriod.valuationsBooked, "Valuation"],
            ["Instructions", activePeriod.instructionsWon, "Instruction"],
            ["Hot leads", activePeriod.hotLeads, "Hot"],
          ].map(([label, value, metric]) => (
            <button
              className={`rounded-2xl p-4 text-left transition ${
                selectedMetric === metric
                  ? "bg-slate-950 text-white"
                  : "bg-slate-50 text-slate-950 hover:bg-slate-100"
              }`}
              key={label}
              onClick={() => setSelectedMetric(metric as typeof selectedMetric)}
              type="button"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {label}
              </p>
              <p className="mt-2 text-3xl font-black">{value}</p>
              <p className="mt-1 text-xs font-bold opacity-70">Click to filter</p>
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold leading-6 text-blue-950">
          Action for {activePeriod.label.toLowerCase()}: {activePeriod.action}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <h3 className="text-xl font-black text-slate-950">
            {selectedMetric === "All" ? "All visible leads" : `${selectedMetric} records`}
          </h3>
          <button
            className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-600"
            onClick={() => setSelectedMetric("All")}
            type="button"
          >
            Show all
          </button>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {visibleRecords.map((record) => (
            <details
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 open:bg-white open:shadow-sm"
              key={record.id}
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                        {record.type}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">
                        {record.urgency}
                      </span>
                    </div>
                    <h4 className="mt-3 text-lg font-black">{record.contact}</h4>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {record.branch} | {record.value} | {record.status}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
                    Open
                  </span>
                </div>
              </summary>

              <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4 text-sm leading-6">
                <div className="rounded-xl bg-blue-50 p-3">
                  <p className="font-black text-blue-700">Lead source</p>
                  <p className="font-semibold text-slate-800">{record.source}</p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-3">
                  <p className="font-black text-emerald-700">Why this is shown</p>
                  <p className="font-semibold text-slate-800">{record.reason}</p>
                </div>
                <div className="rounded-xl bg-white p-3">
                  <p className="font-black text-slate-700">Assigned estate agent</p>
                  <p className="font-semibold text-slate-800">{record.assignedTo}</p>
                </div>
                <div className="rounded-xl bg-slate-950 p-3 text-white">
                  <p className="font-black">Next action</p>
                  <p className="font-semibold">{record.nextAction}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
