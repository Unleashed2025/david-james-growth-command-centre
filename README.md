# David James Growth Command Centre

An MVP executive dashboard for a UK estate agency with 44 people across 5 branches. The homepage is designed for the CEO and leadership team: it combines growth KPIs, branch performance, competitor intelligence, postcode market share, reputation, and action-led opportunity lists.

The first version is source-backed and manual-import ready. It does not require app API integrations because the Excel source register acts as the bridge from trusted websites and internal files/application exports. The specialist agent cards on the homepage link to dedicated module pages with action queues and workflow plays.

The app includes a **Live Scan** panel showing data freshness, source readiness, and lead periods for today, yesterday, this week, last week, this month, and last month. A **Scan Websites** manager lists recommended sources such as Rightmove, Zoopla, OnTheMarket, Google Business Profiles, AllAgents, GetAgent, Home.co.uk, the David James website, and the internal CRM export file. Sources can be added or deleted in the UI.

Five named estate agents are included so opportunities can be assigned and filtered by individual agent on each specialist module page.

Specialist module pages now include interactive tabs for the action queue, live leads, data sources, market context, and branch team. The downloadable Excel source register is available at `public/data-source-register.xlsx` and from the app's Scan Websites panel. It includes tabs for Source Register, Leads, Competitor Activity, Reputation, Landlords, Branch Performance, Website Scan Log, and Assignments.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Source-backed seed data in `src/data/dashboard.ts`, ready to be replaced by Excel/CSV imports from trusted websites and internal systems

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Sharing the dashboard

The local preview URL only works on the computer running the app. To share the dashboard with other people, deploy it to a hosted environment such as Vercel, Netlify, or an internal company server. For a quick temporary demo, a secure tunnel can expose the local app, but hosted deployment is better for team review.

Use `/read-only` for a share-safe demo version. Viewers can click around the dashboard, tabs, filters and drilldowns, but they cannot add/delete source websites, run a scan, or change lead assignments/statuses.

## Hosting the read-only demo on GitHub Pages

This app is configured for static export, so it can be hosted on GitHub Pages without running a server.

1. Create a GitHub repository for this folder.
2. Push the app to the repository's `main` branch.
3. In GitHub, open **Settings > Pages** and set the source to **GitHub Actions**.
4. Run the **Publish read-only demo to GitHub Pages** workflow, or push to `main`.
5. Share the read-only URL:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/read-only/
```

If the repository is named `YOUR-GITHUB-USERNAME.github.io`, the URL is:

```text
https://YOUR-GITHUB-USERNAME.github.io/read-only/
```

## Microsoft Teams and Copilot demo

The `appPackage` folder contains a Microsoft Teams app manifest for adding the read-only dashboard as a Teams personal tab. The package includes two tabs:

- **Growth Centre**: the read-only dashboard.
- **Teams + Copilot Setup**: the rollout guide at `/read-only/microsoft/`.

Recommended operating model:

1. Host the read-only app on GitHub Pages.
2. Zip `appPackage/manifest.json`, `appPackage/color.png`, and `appPackage/outline.png`.
3. Upload the zip into Microsoft Teams as a custom app.
4. Store `public/data-source-register.xlsx` in SharePoint as the controlled manual data layer.
5. Use Power Automate to remind source owners to update the workbook and post hot lead/reputation/competitor alerts into Teams.
6. Use Copilot Studio with the SharePoint source folder so staff can ask questions such as “show today’s hot leads”, “what should Arnold chase today?”, and “which reviews need action?”.

A pre-built Teams app package is also published with the static demo:

```text
https://unleashed2025.github.io/david-james-growth-command-centre/dj-exec-teams-app-v1-0-3.zip
```

## Product direction

The Growth Command Centre should become an action engine, not a passive reporting tool. Every insight should recommend the next best action for a branch manager, negotiator, marketer, or leadership team member.

Planned future imports should start with internal CRM exports, valuation diaries, property portal scans, Google Business Profile reviews, call outcomes, branch returns, and competitor listing files. Specialist modules can then evolve into workflows for seller growth, lead conversion, competitor intelligence, expired and stale listings, landlord growth, reputation, and management reporting.
