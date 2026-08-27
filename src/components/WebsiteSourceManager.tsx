"use client";

import { useState } from "react";
import type { ScanWebsite } from "@/data/dashboard";

type WebsiteSourceManagerProps = {
  websites: ScanWebsite[];
  readOnly?: boolean;
};

const categories: ScanWebsite["category"][] = [
  "Portals",
  "Reviews",
  "Competitors",
  "First-party website",
  "Internal files",
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function WebsiteSourceManager({
  websites,
  readOnly = false,
}: WebsiteSourceManagerProps) {
  const [sources, setSources] = useState(websites);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<ScanWebsite["category"]>("Competitors");

  function addSource() {
    const cleanName = name.trim();
    const cleanUrl = url.trim();

    if (!cleanName || !cleanUrl) {
      return;
    }

    setSources((current) => [
      {
        name: cleanName,
        url: cleanUrl,
        category,
        priority: "Optional",
        dataCaptured: "Custom source added by the user for future live scan configuration.",
        note: "Custom source. For automated scanning it will need to be a trusted website or internal file source.",
      },
      ...current,
    ]);
    setName("");
    setUrl("");
  }

  function removeSource(sourceUrl: string) {
    setSources((current) => current.filter((source) => source.url !== sourceUrl));
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
            Scan websites
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
            Recommended sources to power live data
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          {readOnly
            ? "Review the trusted websites and internal files this read-only demo expects to use."
            : "Add or delete sources here. These are the sources the app expects to use through trusted websites and internal files first."}
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-950">
        Manual data bridge: keep the Excel source register updated until direct
        automated imports from internal files and trusted websites are approved.{" "}
        <a
          className="font-black underline"
          href={`${basePath}/data-source-register.xlsx`}
        >
          Download source register
        </a>
      </div>

      {!readOnly && (
        <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 md:grid-cols-[1fr_1.2fr_0.8fr_auto]">
          <input
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-400"
            onChange={(event) => setName(event.target.value)}
            placeholder="Website name"
            value={name}
          />
          <input
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-400"
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            value={url}
          />
          <select
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-400"
            onChange={(event) => setCategory(event.target.value as ScanWebsite["category"])}
            value={category}
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <button
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white"
            onClick={addSource}
            type="button"
          >
            Add
          </button>
        </div>
      )}

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {sources.map((source) => (
          <article
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            key={`${source.name}-${source.url}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    {source.category}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
                    {source.priority}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-black">{source.name}</h3>
                <a
                  className="mt-1 block break-all text-sm font-semibold text-blue-700"
                  href={source.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {source.url}
                </a>
              </div>
              {!readOnly && (
                <button
                  className="rounded-full bg-white px-3 py-1 text-xs font-black text-rose-600"
                  onClick={() => removeSource(source.url)}
                  type="button"
                >
                  Delete
                </button>
              )}
            </div>
            <p className="mt-4 text-sm font-semibold leading-6 text-slate-700">
              Captures: {source.dataCaptured}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">{source.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
