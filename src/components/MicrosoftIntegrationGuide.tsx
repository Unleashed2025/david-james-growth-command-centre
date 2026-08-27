"use client";

import { useState } from "react";

const sections = [
  "Teams tab",
  "SharePoint data",
  "Power Automate",
  "Copilot Studio",
  "Rollout checklist",
] as const;

type Section = (typeof sections)[number];

const content: Record<
  Section,
  {
    title: string;
    summary: string;
    cards: { heading: string; detail: string; action: string }[];
  }
> = {
  "Teams tab": {
    title: "Put the dashboard where the team already works",
    summary:
      "The app package installs the read-only GitHub Pages demo as a Microsoft Teams personal tab.",
    cards: [
      {
        heading: "Teams app package",
        detail: "Use the `appPackage` folder to zip the Teams manifest and icon files.",
        action: "Upload the package through Teams admin or Apps > Upload an app.",
      },
      {
        heading: "Read-only dashboard tab",
        detail:
          "The tab points at the public read-only URL, so viewers can explore without changing assignments or sources.",
        action:
          "Share the Teams app with directors, branch managers and negotiators for feedback.",
      },
      {
        heading: "Setup guide tab",
        detail:
          "A second Teams tab points to this Microsoft setup guide so the operating model is clear.",
        action: "Use it in a project kickoff meeting to agree source owners.",
      },
    ],
  },
  "SharePoint data": {
    title: "Use SharePoint/Excel as the controlled data layer",
    summary:
      "Before direct integrations, keep the source register workbook in SharePoint and update it on a daily/weekly rhythm.",
    cards: [
      {
        heading: "Source register workbook",
        detail:
          "The workbook contains tabs for leads, competitor activity, reputation, landlords, branch performance, website scan log and assignments.",
        action: "Move `data-source-register.xlsx` into a controlled SharePoint document library.",
      },
      {
        heading: "Data owners",
        detail:
          "Each tab should have a named owner, cadence and required fields so the dashboard can be trusted.",
        action: "Assign owners for Sales, Lettings, Marketing/Reputation and Operations.",
      },
      {
        heading: "Trusted inputs only",
        detail:
          "Use internal files/application exports plus trusted websites such as Rightmove, Zoopla, OnTheMarket, Google Business Profiles and AllAgents.",
        action: "Avoid direct app API integrations until the manual data model is proven.",
      },
    ],
  },
  "Power Automate": {
    title: "Automate reminders and Teams alerts",
    summary:
      "Power Automate can monitor the SharePoint workbook and post reminders or summaries into Teams channels.",
    cards: [
      {
        heading: "Daily data freshness reminder",
        detail:
          "At 8:30am, check whether today's Leads and Website Scan Log tabs have been updated.",
        action: "Post missing-source reminders to the Branch Managers channel.",
      },
      {
        heading: "Hot lead alert",
        detail:
          "When a lead is marked Hot and has no next action, notify the assigned estate agent.",
        action: "Post an adaptive card with contact, source, reason and next action.",
      },
      {
        heading: "Weekly leadership digest",
        detail:
          "Summarise lead volume, valuations, instructions, market share gaps and review risks.",
        action: "Post the digest every Monday morning to the Leadership channel.",
      },
    ],
  },
  "Copilot Studio": {
    title: "Create a conversational growth assistant",
    summary:
      "Copilot Studio can answer questions over the SharePoint source files and point users back to the dashboard.",
    cards: [
      {
        heading: "Starter topics",
        detail:
          "Questions such as 'show today's hot leads', 'what should Arnold chase?', and 'which reviews need action?'",
        action: "Create topics for leads, competitors, landlords, reputation and branch reporting.",
      },
      {
        heading: "Knowledge sources",
        detail:
          "Use the SharePoint library containing the source workbook and any Word process documents.",
        action: "Connect Copilot Studio to the controlled SharePoint folder.",
      },
      {
        heading: "Human handoff",
        detail:
          "Copilot should recommend actions, not silently change lead ownership or status.",
        action: "Route changes back to branch managers or the editable app workflow.",
      },
    ],
  },
  "Rollout checklist": {
    title: "Practical rollout plan",
    summary:
      "Start with a read-only Teams demo, prove the source workbook, then decide whether to automate imports.",
    cards: [
      {
        heading: "Week 1",
        detail: "Share read-only demo, agree source list, assign workbook owners.",
        action: "Run a 30-minute leadership walkthrough in Teams.",
      },
      {
        heading: "Week 2",
        detail: "Populate the workbook daily and compare dashboard outputs with branch reality.",
        action: "Refine required fields before any automation work starts.",
      },
      {
        heading: "Week 3",
        detail: "Add Power Automate reminders and Copilot Studio Q&A over the source files.",
        action: "Launch to branch managers with clear owner/action rules.",
      },
    ],
  },
};

export function MicrosoftIntegrationGuide() {
  const [activeSection, setActiveSection] = useState<Section>("Teams tab");
  const active = content[activeSection];

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-600">
            Microsoft Teams and Copilot
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Integration plan for the Growth Command Centre
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          A no-API route that uses Teams, SharePoint Excel, Power Automate and
          Copilot Studio before deeper system integrations.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {sections.map((section) => (
          <button
            className={`rounded-full px-4 py-2 text-sm font-black ${
              activeSection === section
                ? "bg-slate-950 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
            key={section}
            onClick={() => setActiveSection(section)}
            type="button"
          >
            {section}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-slate-950 p-6 text-white">
        <h3 className="text-2xl font-black">{active.title}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
          {active.summary}
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              Teams install package
            </p>
            <h3 className="mt-1 text-xl font-black text-emerald-950">
              Download this zip, then upload it into Microsoft Teams
            </h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-emerald-900">
              Teams does not install apps directly from this web page. Use the
              package below via Teams &gt; Apps &gt; Manage your apps &gt; Upload an app.
            </p>
          </div>
          <a
            className="rounded-full bg-emerald-700 px-5 py-3 text-center text-sm font-black text-white"
            href="../../david-james-growth-centre-teams-app-v1-0-2.zip"
          >
            Download Teams app package
          </a>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {active.cards.map((card) => (
          <details
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 open:bg-white open:shadow-sm"
            key={card.heading}
          >
            <summary className="cursor-pointer list-none">
              <h4 className="text-lg font-black">{card.heading}</h4>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-blue-600">
                Click for action
              </p>
            </summary>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
              {card.detail}
            </p>
            <p className="mt-3 rounded-xl bg-blue-50 p-3 text-sm font-semibold leading-6 text-blue-950">
              Action: {card.action}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
