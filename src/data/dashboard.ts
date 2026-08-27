export type Branch = {
  name: string;
  town: string;
  postcodeFocus: string;
  manager: string;
  headcount: number;
  salesPipeline: string;
  lettingsPipeline: string;
  sellerLeads: number;
  landlordLeads: number;
  valuationsBooked: number;
  instructionsWon: number;
  conversionRate: string;
  marketShare: string;
  reviewScore: string;
  avgDaysOnMarket: number;
  action: string;
};

export type EstateAgent = {
  id: string;
  name: string;
  branch: string;
  role: string;
  patch: string;
  speciality: string;
  activeLeads: number;
};

export type Kpi = {
  label: string;
  value: string;
  context: string;
  action: string;
  tone: "blue" | "emerald" | "amber" | "rose" | "violet" | "slate";
};

export type AgentModule = {
  name: string;
  promise: string;
  signal: string;
  action: string;
};

export type AgentWorkflow = {
  slug: string;
  metric: string;
  focus: string;
  queue: {
    item: string;
    branch: string;
    value: string;
    nextAction: string;
    assignedTo?: string;
    leadSource?: string;
    sourceDetail?: string;
    reason?: string;
  }[];
  plays: string[];
};

export type CompetitorActivity = {
  competitor: string;
  branch: string;
  postcode: string;
  activity: "New listing" | "SSTC" | "Let agreed" | "Price reduction" | "Withdrawal";
  property: string;
  value: string;
  daysOnMarket: number;
  movement: string;
  action: string;
};

export type MarketShareRow = {
  postcode: string;
  branch: string;
  davidJamesShare: string;
  leadingCompetitor: string;
  competitorShare: string;
  opportunity: string;
  action: string;
};

export type Opportunity = {
  title: string;
  owner: string;
  value: string;
  urgency: string;
  action: string;
};

export type DataSource = {
  name: string;
  type: string;
  cadence: string;
  status: "Internal file" | "Trusted website" | "Ready";
  use: string;
};

export type LeadPeriod = {
  label: string;
  sellerLeads: number;
  landlordLeads: number;
  valuationsBooked: number;
  instructionsWon: number;
  hotLeads: number;
  action: string;
  records: LeadRecord[];
};

export type LeadRecord = {
  id: string;
  type: "Seller" | "Landlord" | "Valuation" | "Instruction";
  contact: string;
  branch: string;
  assignedTo: string;
  source: string;
  value: string;
  status: string;
  urgency: "Hot" | "Warm" | "Nurture";
  reason: string;
  nextAction: string;
};

export type ScanWebsite = {
  name: string;
  url: string;
  category:
    | "Portals"
    | "Reviews"
    | "Competitors"
    | "First-party website"
    | "Internal files";
  priority: "Essential" | "Recommended" | "Optional";
  dataCaptured: string;
  note: string;
};

export type AgentSourceRequirement = {
  agentSlug: string;
  requiredSource: string;
  currentStatus: "Available in Excel template" | "Needs user file" | "Trusted website source";
  requiredFields: string;
  whyNeeded: string;
  suggestedOwner: string;
};

export const branches: Branch[] = [
  {
    name: "David James Nottingham Central",
    town: "Nottingham",
    postcodeFocus: "NG1 / NG7",
    manager: "Sarah Patel",
    headcount: 11,
    salesPipeline: "GBP 8.4m",
    lettingsPipeline: "132 managed homes",
    sellerLeads: 42,
    landlordLeads: 19,
    valuationsBooked: 26,
    instructionsWon: 13,
    conversionRate: "31%",
    marketShare: "11.8%",
    reviewScore: "4.8",
    avgDaysOnMarket: 29,
    action: "Protect NG1 by calling 9 unconverted valuation prospects before Friday.",
  },
  {
    name: "David James West Bridgford",
    town: "West Bridgford",
    postcodeFocus: "NG2",
    manager: "Tom Hargreaves",
    headcount: 9,
    salesPipeline: "GBP 10.9m",
    lettingsPipeline: "96 managed homes",
    sellerLeads: 35,
    landlordLeads: 14,
    valuationsBooked: 21,
    instructionsWon: 11,
    conversionRate: "34%",
    marketShare: "14.2%",
    reviewScore: "4.9",
    avgDaysOnMarket: 24,
    action: "Target downsizers around Compton Acres with a valuation campaign.",
  },
  {
    name: "David James Arnold",
    town: "Arnold",
    postcodeFocus: "NG5",
    manager: "Rebecca Shaw",
    headcount: 8,
    salesPipeline: "GBP 6.7m",
    lettingsPipeline: "118 managed homes",
    sellerLeads: 28,
    landlordLeads: 22,
    valuationsBooked: 18,
    instructionsWon: 8,
    conversionRate: "29%",
    marketShare: "9.6%",
    reviewScore: "4.7",
    avgDaysOnMarket: 34,
    action: "Win back NG5 market share with probate and family-home seller calls.",
  },
  {
    name: "David James Mapperley",
    town: "Mapperley",
    postcodeFocus: "NG3 / NG4",
    manager: "James O'Neill",
    headcount: 7,
    salesPipeline: "GBP 5.8m",
    lettingsPipeline: "84 managed homes",
    sellerLeads: 31,
    landlordLeads: 17,
    valuationsBooked: 16,
    instructionsWon: 7,
    conversionRate: "27%",
    marketShare: "8.9%",
    reviewScore: "4.6",
    avgDaysOnMarket: 38,
    action: "Chase stale appraisal leads where competitors have just reduced prices.",
  },
  {
    name: "David James Hucknall",
    town: "Hucknall",
    postcodeFocus: "NG15",
    manager: "Megan Foster",
    headcount: 9,
    salesPipeline: "GBP 7.2m",
    lettingsPipeline: "105 managed homes",
    sellerLeads: 37,
    landlordLeads: 21,
    valuationsBooked: 23,
    instructionsWon: 10,
    conversionRate: "30%",
    marketShare: "12.4%",
    reviewScore: "4.8",
    avgDaysOnMarket: 31,
    action: "Convert landlord enquiries into managed lets with a 48-hour fee review sprint.",
  },
];

export const estateAgents: EstateAgent[] = [
  {
    id: "amelia-clarke",
    name: "Amelia Clarke",
    branch: "Nottingham Central",
    role: "Senior Valuer",
    patch: "NG1 / NG7",
    speciality: "City apartments and investor sellers",
    activeLeads: 18,
  },
  {
    id: "ben-morrison",
    name: "Ben Morrison",
    branch: "West Bridgford",
    role: "Sales Manager",
    patch: "NG2",
    speciality: "Premium family homes and downsizers",
    activeLeads: 21,
  },
  {
    id: "charlotte-reed",
    name: "Charlotte Reed",
    branch: "Arnold",
    role: "Valuation Partner",
    patch: "NG5",
    speciality: "Bungalows, probate and first-time buyer stock",
    activeLeads: 16,
  },
  {
    id: "daniel-hughes",
    name: "Daniel Hughes",
    branch: "Mapperley",
    role: "Lister",
    patch: "NG3 / NG4",
    speciality: "Stale listings and relaunch plans",
    activeLeads: 14,
  },
  {
    id: "ella-watson",
    name: "Ella Watson",
    branch: "Hucknall",
    role: "Lettings Valuer",
    patch: "NG15",
    speciality: "Landlord growth and managed lets",
    activeLeads: 19,
  },
];

export const kpis: Kpi[] = [
  {
    label: "Seller and landlord leads",
    value: "266",
    context: "173 seller and 93 landlord leads this month",
    action: "Prioritise the 38 leads showing move intent within 30 days.",
    tone: "blue",
  },
  {
    label: "Valuations booked",
    value: "104",
    context: "Up 12% versus last month, strongest in NG1 and NG15",
    action: "Fill 14 open diary slots with vendor reactivation calls.",
    tone: "emerald",
  },
  {
    label: "Instructions won",
    value: "49",
    context: "GBP 39.0m sales pipeline and 535 managed lettings units",
    action: "Coach branches below 30% conversion using West Bridgford scripts.",
    tone: "violet",
  },
  {
    label: "Market share risk",
    value: "3 zones",
    context: "NG3, NG4 and NG5 behind leading competitors",
    action: "Launch postcode-specific seller campaigns within 7 days.",
    tone: "amber",
  },
  {
    label: "Competitor moves",
    value: "87",
    context: "22 reductions, 11 withdrawals and 18 new premium listings",
    action: "Call matched valuation prospects when a competitor reduces nearby.",
    tone: "rose",
  },
  {
    label: "Reputation score",
    value: "4.76",
    context: "Across 1,842 Google and portal reviews",
    action: "Ask every completed valuation for a review within 24 hours.",
    tone: "slate",
  },
];

export const agentModules: AgentModule[] = [
  {
    name: "Seller Growth Agent",
    promise: "Find homeowners most likely to sell and recommend the next approach.",
    signal: "NG2 family homes are outperforming asking price by 2.8%.",
    action: "Send a valuation invite to 120 matched owner-occupiers.",
  },
  {
    name: "Lead Conversion Agent",
    promise: "Rank enquiries by intent, speed risk and expected fee value.",
    signal: "18 hot leads have no booked valuation after 36 hours.",
    action: "Call the top 10 before 5pm and assign the rest to branch managers.",
  },
  {
    name: "Competitor Intelligence Agent",
    promise: "Track listings, SSTC, let agreed, reductions and withdrawals by rival.",
    signal: "FHP reduced 6 NG5 listings this week.",
    action: "Offer those streets a fresh-market performance review.",
  },
  {
    name: "Expired & Stale Listings Agent",
    promise: "Surface unsold stock and owners ready for a new agent conversation.",
    signal: "41 homes over 90 days on market within core patches.",
    action: "Create a 2-week rescue campaign for the highest-value 15 homes.",
  },
  {
    name: "Landlord Growth Agent",
    promise: "Identify landlords ready to switch, expand or review management fees.",
    signal: "NG15 has 23 rental homes relisted within 12 months.",
    action: "Invite landlords to a yield and compliance review.",
  },
  {
    name: "Reputation Agent",
    promise: "Protect reviews, flag detractors and prompt happy clients.",
    signal: "Mapperley has 7 completions with no review request logged.",
    action: "Send manager-approved review asks today.",
  },
  {
    name: "Management Reporting Agent",
    promise: "Convert branch activity into board-ready reporting and coaching actions.",
    signal: "Two branches are below target on appraisal-to-instruction conversion.",
    action: "Prepare Monday trading pack with branch-specific interventions.",
  },
];

export const agentSlugs: Record<string, string> = {
  "Seller Growth Agent": "seller-growth",
  "Lead Conversion Agent": "lead-conversion",
  "Competitor Intelligence Agent": "competitor-intelligence",
  "Expired & Stale Listings Agent": "expired-stale-listings",
  "Landlord Growth Agent": "landlord-growth",
  "Reputation Agent": "reputation",
  "Management Reporting Agent": "management-reporting",
};

export const agentWorkflows: Record<string, AgentWorkflow> = {
  "seller-growth": {
    slug: "seller-growth",
    metric: "120 owner-occupiers",
    focus: "Win more seller enquiries from homeowners showing local move intent.",
    queue: [
      {
        item: "Compton Acres downsizers",
        branch: "West Bridgford",
        value: "GBP 6.8m target stock",
        nextAction: "Send sold-in-your-road proof and invite to valuation clinic.",
      },
      {
        item: "NG5 bungalow owners",
        branch: "Arnold",
        value: "42 matched homes",
        nextAction: "Call owners near recent competitor reductions.",
      },
      {
        item: "Lace Market apartment sellers",
        branch: "Nottingham Central",
        value: "18 warm prospects",
        nextAction: "Offer city-centre pricing review within 48 hours.",
      },
    ],
    plays: [
      "Rank households by postcode share gap, competitor movement and valuation history.",
      "Generate branch call lists with the strongest local proof point.",
      "Recommend campaign copy based on property type and seller motivation.",
    ],
  },
  "lead-conversion": {
    slug: "lead-conversion",
    metric: "18 hot leads",
    focus: "Move new enquiries from lead to valuation to instruction faster.",
    queue: [
      {
        item: "Unbooked seller leads over 36 hours",
        branch: "Group",
        value: "GBP 5.6m pipeline",
        nextAction: "Call top 10 and send WhatsApp follow-up to the remainder.",
      },
      {
        item: "Valuation no-shows",
        branch: "Mapperley",
        value: "6 appointments",
        nextAction: "Rebook with manager call and local sale proof.",
      },
      {
        item: "High-value landlord enquiries",
        branch: "Hucknall",
        value: "9 portfolio leads",
        nextAction: "Book rental review and compliance check.",
      },
    ],
    plays: [
      "Score leads by source, response time, value, motivation and competitor context.",
      "Flag every lead that misses service-level response times.",
      "Show the next best channel: call, SMS, email or manager escalation.",
    ],
  },
  "competitor-intelligence": {
    slug: "competitor-intelligence",
    metric: "87 competitor moves",
    focus: "Turn competitor listing movement into seller and landlord conversations.",
    queue: [
      {
        item: "NG5 price reductions",
        branch: "Arnold",
        value: "11 reductions",
        nextAction: "Match to old valuations and propose relaunch plans.",
      },
      {
        item: "Premium NG2 SSTC proof",
        branch: "West Bridgford",
        value: "4 quick sales",
        nextAction: "Use as proof in family-home seller campaign.",
      },
      {
        item: "NG15 fast let agreed",
        branch: "Hucknall",
        value: "5 lets under 14 days",
        nextAction: "Promote speed-to-let to landlord switch prospects.",
      },
    ],
    plays: [
      "Monitor new listings, reductions, SSTC, let agreed, withdrawals and days on market.",
      "Identify streets where competitor weakness creates a relaunch opportunity.",
      "Brief branches with daily actions tied to specific properties and prospects.",
    ],
  },
  "expired-stale-listings": {
    slug: "expired-stale-listings",
    metric: "41 stale homes",
    focus: "Win instructions from owners whose current marketing has stalled.",
    queue: [
      {
        item: "Over-90-day sales stock",
        branch: "Group",
        value: "GBP 14.2m stock",
        nextAction: "Prioritise top 15 by price, location and reduction history.",
      },
      {
        item: "Withdrawn Mapperley homes",
        branch: "Mapperley",
        value: "7 homes",
        nextAction: "Send discreet relaunch proposal from James O'Neill.",
      },
      {
        item: "Second-reduction bungalows",
        branch: "Arnold",
        value: "5 homes",
        nextAction: "Offer realistic price reset and new launch plan.",
      },
    ],
    plays: [
      "Find properties over threshold by days on market, reduction count and withdrawal status.",
      "Match homes to nearby David James proof points.",
      "Create branch-ready rescue scripts with compliant, helpful language.",
    ],
  },
  "landlord-growth": {
    slug: "landlord-growth",
    metric: "31 switch prospects",
    focus: "Grow managed lets by finding landlords with pain, churn or portfolio potential.",
    queue: [
      {
        item: "Relisted NG15 rentals",
        branch: "Hucknall",
        value: "23 properties",
        nextAction: "Offer free rental yield and compliance review.",
      },
      {
        item: "Investor apartments",
        branch: "Nottingham Central",
        value: "18 landlords",
        nextAction: "Send city-centre rent movement update.",
      },
      {
        item: "Managed-let fee reviews",
        branch: "Arnold",
        value: "10 landlords",
        nextAction: "Call before renewal with retention and upsell offer.",
      },
    ],
    plays: [
      "Identify landlords likely to switch from relists, voids and slow lets.",
      "Prioritise by portfolio value and management potential.",
      "Recommend compliance, yield or service-led outreach.",
    ],
  },
  reputation: {
    slug: "reputation",
    metric: "4.76 group score",
    focus: "Increase trust signals and protect the brand in local search moments.",
    queue: [
      {
        item: "Mapperley missing review asks",
        branch: "Mapperley",
        value: "7 clients",
        nextAction: "Send personalised review request from the branch manager.",
      },
      {
        item: "Nottingham Central detractor watch",
        branch: "Nottingham Central",
        value: "2 at-risk clients",
        nextAction: "Escalate service recovery call today.",
      },
      {
        item: "Google profile freshness",
        branch: "Group",
        value: "5 branches",
        nextAction: "Upload new sold boards and staff photos this week.",
      },
    ],
    plays: [
      "Prompt happy clients at completion, valuation and let agreed moments.",
      "Escalate negative sentiment before it becomes a public review.",
      "Link review volume and local SEO visibility to seller lead conversion.",
    ],
  },
  "management-reporting": {
    slug: "management-reporting",
    metric: "2 branches below target",
    focus: "Give leadership a clear operating rhythm for growth, coaching and accountability.",
    queue: [
      {
        item: "Monday trading pack",
        branch: "Group",
        value: "5 branches",
        nextAction: "Summarise targets, gaps and named actions by branch.",
      },
      {
        item: "Conversion coaching",
        branch: "Mapperley and Arnold",
        value: "Below 30%",
        nextAction: "Use West Bridgford scripts in manager coaching.",
      },
      {
        item: "Open valuation slots",
        branch: "Group",
        value: "14 slots",
        nextAction: "Assign owners and track booked outcomes.",
      },
    ],
    plays: [
      "Create board-ready trading summaries from operational activity.",
      "Highlight variance to target with named accountable owners.",
      "Turn every report into Monday actions for branches and directors.",
    ],
  },
};

export const competitorActivity: CompetitorActivity[] = [
  {
    competitor: "FHP Living",
    branch: "Nottingham Central",
    postcode: "NG1",
    activity: "New listing",
    property: "2-bed apartment, Lace Market",
    value: "GBP 325k",
    daysOnMarket: 2,
    movement: "Premium city-centre stock",
    action: "Call 4 apartment owners who requested valuations in the last 90 days.",
  },
  {
    competitor: "Royston & Lund",
    branch: "West Bridgford",
    postcode: "NG2",
    activity: "SSTC",
    property: "4-bed detached, Gamston",
    value: "GBP 685k",
    daysOnMarket: 19,
    movement: "Fast sale above patch average",
    action: "Publish proof-point campaign for similar family homes.",
  },
  {
    competitor: "Bairstow Eves",
    branch: "Arnold",
    postcode: "NG5",
    activity: "Price reduction",
    property: "3-bed semi, Redhill",
    value: "GBP 245k",
    daysOnMarket: 74,
    movement: "Reduced by GBP 15k",
    action: "Approach nearby stale listings with a pricing reset offer.",
  },
  {
    competitor: "Frank Innes",
    branch: "Mapperley",
    postcode: "NG3",
    activity: "Withdrawal",
    property: "Victorian terrace, Mapperley Park",
    value: "GBP 410k",
    daysOnMarket: 96,
    movement: "Withdrawn after failed campaign",
    action: "Send a discreet relaunch proposal from the local manager.",
  },
  {
    competitor: "Belvoir",
    branch: "Hucknall",
    postcode: "NG15",
    activity: "Let agreed",
    property: "3-bed rental, Papplewick Lane",
    value: "GBP 1,150 pcm",
    daysOnMarket: 11,
    movement: "Let agreed 5 days faster than local average",
    action: "Benchmark landlord fees and promote faster-let performance.",
  },
  {
    competitor: "William H Brown",
    branch: "Arnold",
    postcode: "NG5",
    activity: "Price reduction",
    property: "2-bed bungalow, Daybrook",
    value: "GBP 260k",
    daysOnMarket: 88,
    movement: "Second reduction in 30 days",
    action: "Prioritise bungalow owners for valuation calls.",
  },
];

export const marketShare: MarketShareRow[] = [
  {
    postcode: "NG1",
    branch: "Nottingham Central",
    davidJamesShare: "11.8%",
    leadingCompetitor: "FHP Living",
    competitorShare: "16.4%",
    opportunity: "City apartments with investor landlords.",
    action: "Launch apartment valuation and rental yield campaign.",
  },
  {
    postcode: "NG2",
    branch: "West Bridgford",
    davidJamesShare: "14.2%",
    leadingCompetitor: "Royston & Lund",
    competitorShare: "18.1%",
    opportunity: "Premium family homes and downsizers.",
    action: "Target Compton Acres and Gamston with sold-in-your-road proof.",
  },
  {
    postcode: "NG3",
    branch: "Mapperley",
    davidJamesShare: "8.7%",
    leadingCompetitor: "Frank Innes",
    competitorShare: "13.5%",
    opportunity: "Stale period homes and probate sales.",
    action: "Run a relaunch clinic for homes over 75 days on market.",
  },
  {
    postcode: "NG5",
    branch: "Arnold",
    davidJamesShare: "9.6%",
    leadingCompetitor: "Bairstow Eves",
    competitorShare: "15.2%",
    opportunity: "Bungalows and first-time buyer stock.",
    action: "Build a call list from reductions, withdrawals and old valuations.",
  },
  {
    postcode: "NG15",
    branch: "Hucknall",
    davidJamesShare: "12.4%",
    leadingCompetitor: "Belvoir",
    competitorShare: "14.8%",
    opportunity: "Rental management switches and landlord portfolio reviews.",
    action: "Offer landlord compliance checks before renewal dates.",
  },
];

export const opportunities: Opportunity[] = [
  {
    title: "Call these sellers",
    owner: "Lead Conversion Agent",
    value: "GBP 5.6m potential pipeline",
    urgency: "Today",
    action: "Ring 18 high-intent valuation leads with no appointment booked.",
  },
  {
    title: "Target this postcode",
    owner: "Seller Growth Agent",
    value: "NG5 share gap: 5.6 pts",
    urgency: "This week",
    action: "Send a local market-share recovery campaign to bungalow owners.",
  },
  {
    title: "Chase these leads",
    owner: "Management Reporting Agent",
    value: "14 open valuation diary slots",
    urgency: "48 hours",
    action: "Allocate every slot to named negotiators and confirm outcomes.",
  },
  {
    title: "Target these landlords",
    owner: "Landlord Growth Agent",
    value: "31 switch prospects",
    urgency: "7 days",
    action: "Offer portfolio yield reviews to landlords with recent relists.",
  },
  {
    title: "Respond to competitor reductions",
    owner: "Competitor Intelligence Agent",
    value: "22 nearby reductions",
    urgency: "This week",
    action: "Contact matched sellers with a realistic pricing and launch plan.",
  },
];

export const marketingActions = [
  {
    channel: "Seller email",
    performance: "8.9% valuation conversion",
    insight: "Best converting theme is 'what buyers paid near you'.",
    action: "Create NG2 and NG7 variants with branch manager videos.",
  },
  {
    channel: "Paid social",
    performance: "GBP 34 cost per seller lead",
    insight: "Downsizer audiences convert 2.1x better than broad homeowners.",
    action: "Shift 30% of spend to downsizer and probate campaigns.",
  },
  {
    channel: "Google Business Profile",
    performance: "14,820 local views",
    insight: "Mapperley photos and review volume lag the group.",
    action: "Upload sold boards and request 7 missing reviews.",
  },
];

export const dataSources: DataSource[] = [
  {
    name: "Internal lead and valuation spreadsheet",
    type: "Internal file",
    cadence: "Daily file update",
    status: "Internal file",
    use: "Lead source, owner, contact history, valuation bookings and instruction outcomes.",
  },
  {
    name: "Website enquiry forms",
    type: "Internal file",
    cadence: "Daily form export",
    status: "Internal file",
    use: "Today's seller and landlord enquiries, source campaign and response speed.",
  },
  {
    name: "Property portals",
    type: "Trusted websites",
    cadence: "Daily scan",
    status: "Trusted website",
    use: "Competitor listings, SSTC, let agreed, price reductions, withdrawals and days on market.",
  },
  {
    name: "Google Business Profile",
    type: "Trusted website",
    cadence: "Daily scan",
    status: "Trusted website",
    use: "Reviews, local visibility, branch search activity and reputation alerts.",
  },
];

export const leadPeriods: LeadPeriod[] = [
  {
    label: "Today",
    sellerLeads: 14,
    landlordLeads: 7,
    valuationsBooked: 9,
    instructionsWon: 3,
    hotLeads: 8,
    action: "Call all hot leads within 30 minutes and fill remaining afternoon valuation slots.",
    records: [
      {
        id: "today-1",
        type: "Seller",
        contact: "Emma Richards",
        branch: "West Bridgford",
        assignedTo: "Ben Morrison",
        source: "Website valuation form - downsizer campaign",
        value: "GBP 625k",
        status: "New lead",
        urgency: "Hot",
        reason: "Submitted a valuation request this morning and viewed three sold-price pages in NG2.",
        nextAction: "Call within 30 minutes and offer a Saturday valuation slot.",
      },
      {
        id: "today-2",
        type: "Landlord",
        contact: "Michael Turner",
        branch: "Hucknall",
        assignedTo: "Ella Watson",
        source: "Google Business Profile call",
        value: "3-property portfolio",
        status: "Callback due",
        urgency: "Hot",
        reason: "Asked about managed letting fees and current rental demand in NG15.",
        nextAction: "Book a portfolio yield review and compliance check.",
      },
      {
        id: "today-3",
        type: "Valuation",
        contact: "Priya Shah",
        branch: "Nottingham Central",
        assignedTo: "Amelia Clarke",
        source: "Portal retargeting landing page",
        value: "GBP 340k",
        status: "Valuation booked",
        urgency: "Warm",
        reason: "Owns a Lace Market apartment near a new competitor listing.",
        nextAction: "Prepare comparable evidence before the appointment.",
      },
      {
        id: "today-4",
        type: "Instruction",
        contact: "Graham Wilson",
        branch: "Arnold",
        assignedTo: "Charlotte Reed",
        source: "Old valuation reactivation call",
        value: "GBP 275k",
        status: "Instruction won",
        urgency: "Hot",
        reason: "Reactivated after a competitor reduction on the same road.",
        nextAction: "Launch with bungalow buyer list and 10-day review point.",
      },
    ],
  },
  {
    label: "Yesterday",
    sellerLeads: 19,
    landlordLeads: 9,
    valuationsBooked: 11,
    instructionsWon: 5,
    hotLeads: 6,
    action: "Review every unbooked enquiry and manager-escalate leads older than 24 hours.",
    records: [
      {
        id: "yesterday-1",
        type: "Seller",
        contact: "Helen Carter",
        branch: "Mapperley",
        assignedTo: "Daniel Hughes",
        source: "Phone enquiry from sold board",
        value: "GBP 410k",
        status: "No valuation booked",
        urgency: "Hot",
        reason: "Called after seeing a sold board but was not recontacted after the first attempt.",
        nextAction: "Manager callback with local proof and two appointment options.",
      },
      {
        id: "yesterday-2",
        type: "Landlord",
        contact: "Sanjay Mehta",
        branch: "Nottingham Central",
        assignedTo: "Amelia Clarke",
        source: "Website landlord form",
        value: "2 city apartments",
        status: "Needs rental review",
        urgency: "Warm",
        reason: "Asked whether rents have moved enough to relaunch one vacant flat.",
        nextAction: "Send rent evidence and book a management consultation.",
      },
      {
        id: "yesterday-3",
        type: "Valuation",
        contact: "Laura Bennett",
        branch: "West Bridgford",
        assignedTo: "Ben Morrison",
        source: "Email campaign click",
        value: "GBP 715k",
        status: "Valuation completed",
        urgency: "Hot",
        reason: "Clicked premium homes campaign and requested a same-week valuation.",
        nextAction: "Follow up with fee proposal before competitor appraisal.",
      },
    ],
  },
  {
    label: "This week",
    sellerLeads: 61,
    landlordLeads: 33,
    valuationsBooked: 38,
    instructionsWon: 16,
    hotLeads: 18,
    action: "Protect this week's conversion by assigning a named owner to every hot lead.",
    records: [
      {
        id: "week-1",
        type: "Seller",
        contact: "Robert Evans",
        branch: "Arnold",
        assignedTo: "Charlotte Reed",
        source: "Expired listing scan",
        value: "GBP 300k",
        status: "Relaunch prospect",
        urgency: "Hot",
        reason: "Current listing is over 90 days with two reductions and no SSTC.",
        nextAction: "Offer a relaunch plan based on fresh buyer demand.",
      },
      {
        id: "week-2",
        type: "Seller",
        contact: "Nadia Collins",
        branch: "West Bridgford",
        assignedTo: "Ben Morrison",
        source: "Rightmove competitor SSTC trigger",
        value: "GBP 650k",
        status: "Warm lead",
        urgency: "Warm",
        reason: "Similar home went SSTC in 19 days, creating a timely proof point.",
        nextAction: "Send proof email and call to offer valuation.",
      },
      {
        id: "week-3",
        type: "Landlord",
        contact: "Peter Lawson",
        branch: "Hucknall",
        assignedTo: "Ella Watson",
        source: "Zoopla rental relist",
        value: "GBP 1,150 pcm",
        status: "Switch prospect",
        urgency: "Hot",
        reason: "Rental property appears to have been relaunched within 12 months.",
        nextAction: "Offer faster-let and management service comparison.",
      },
      {
        id: "week-4",
        type: "Instruction",
        contact: "Olivia Grant",
        branch: "Mapperley",
        assignedTo: "Daniel Hughes",
        source: "Stale listing rescue campaign",
        value: "GBP 435k",
        status: "Instruction proposed",
        urgency: "Warm",
        reason: "Seller responded to relaunch clinic invite after withdrawal.",
        nextAction: "Confirm launch date and photography plan.",
      },
    ],
  },
  {
    label: "Last week",
    sellerLeads: 54,
    landlordLeads: 28,
    valuationsBooked: 35,
    instructionsWon: 14,
    hotLeads: 11,
    action: "Compare branch scripts against West Bridgford and recycle lost valuation reasons.",
    records: [
      {
        id: "last-week-1",
        type: "Seller",
        contact: "Andrew Morgan",
        branch: "Nottingham Central",
        assignedTo: "Amelia Clarke",
        source: "Internal marketing enquiry spreadsheet",
        value: "GBP 385k",
        status: "Lost to competitor",
        urgency: "Nurture",
        reason: "Chose a lower-fee competitor after two days without a manager follow-up.",
        nextAction: "Add to nurture and review lost-fee objection handling.",
      },
      {
        id: "last-week-2",
        type: "Valuation",
        contact: "Rachel Cooper",
        branch: "West Bridgford",
        assignedTo: "Ben Morrison",
        source: "Referral from past client",
        value: "GBP 590k",
        status: "Instruction likely",
        urgency: "Hot",
        reason: "Past-client referral with strong motivation to list before school holidays.",
        nextAction: "Send valuation report and agree launch price.",
      },
      {
        id: "last-week-3",
        type: "Landlord",
        contact: "Thomas King",
        branch: "Hucknall",
        assignedTo: "Ella Watson",
        source: "Let agreed competitor scan",
        value: "GBP 950 pcm",
        status: "Fee review requested",
        urgency: "Warm",
        reason: "Asked why competitor let nearby home faster than current agent.",
        nextAction: "Share speed-to-let benchmark and management proposal.",
      },
    ],
  },
  {
    label: "This month",
    sellerLeads: 173,
    landlordLeads: 93,
    valuationsBooked: 104,
    instructionsWon: 49,
    hotLeads: 38,
    action: "Use the monthly backlog to drive postcode campaigns in NG3, NG4 and NG5.",
    records: [
      {
        id: "month-1",
        type: "Seller",
        contact: "Julie Spencer",
        branch: "Arnold",
        assignedTo: "Charlotte Reed",
        source: "NG5 market-share campaign",
        value: "GBP 255k",
        status: "Valuation requested",
        urgency: "Hot",
        reason: "Campaign response from a postcode where David James trails the leading competitor.",
        nextAction: "Call with local share recovery proof and book appraisal.",
      },
      {
        id: "month-2",
        type: "Landlord",
        contact: "Khalid Ahmed",
        branch: "Nottingham Central",
        assignedTo: "Amelia Clarke",
        source: "Investor landlord email",
        value: "4 apartments",
        status: "Portfolio review",
        urgency: "Hot",
        reason: "Clicked rent review email twice and downloaded investor guide.",
        nextAction: "Book portfolio review and discuss fully managed service.",
      },
      {
        id: "month-3",
        type: "Instruction",
        contact: "Sophie Martin",
        branch: "Mapperley",
        assignedTo: "Daniel Hughes",
        source: "Withdrawal rescue call",
        value: "GBP 395k",
        status: "Instruction won",
        urgency: "Warm",
        reason: "Previously withdrawn after poor viewing volume with another agent.",
        nextAction: "Launch with new photography and buyer-match calls.",
      },
      {
        id: "month-4",
        type: "Valuation",
        contact: "Mark Davies",
        branch: "West Bridgford",
        assignedTo: "Ben Morrison",
        source: "Website valuation form",
        value: "GBP 735k",
        status: "Follow-up overdue",
        urgency: "Hot",
        reason: "High-value valuation has no logged follow-up after appointment.",
        nextAction: "Manager call today with launch options and fee proposal.",
      },
    ],
  },
  {
    label: "Last month",
    sellerLeads: 151,
    landlordLeads: 81,
    valuationsBooked: 93,
    instructionsWon: 43,
    hotLeads: 24,
    action: "Use branch variance to set next month's valuation and instruction targets.",
    records: [
      {
        id: "last-month-1",
        type: "Seller",
        contact: "Caroline Brooks",
        branch: "Mapperley",
        assignedTo: "Daniel Hughes",
        source: "Portal valuation tool",
        value: "GBP 425k",
        status: "Nurture",
        urgency: "Warm",
        reason: "Wanted a price check but indicated a three-month moving timeline.",
        nextAction: "Schedule market update and call in 30 days.",
      },
      {
        id: "last-month-2",
        type: "Landlord",
        contact: "Ian Fletcher",
        branch: "Hucknall",
        assignedTo: "Ella Watson",
        source: "Google Business Profile enquiry",
        value: "1 rental home",
        status: "Instruction won",
        urgency: "Warm",
        reason: "Converted after compliance review and rent evidence.",
        nextAction: "Request review and ask for landlord referral.",
      },
      {
        id: "last-month-3",
        type: "Valuation",
        contact: "Diane Hill",
        branch: "Arnold",
        assignedTo: "Charlotte Reed",
        source: "Internal historic valuation spreadsheet",
        value: "GBP 235k",
        status: "Reactivation due",
        urgency: "Nurture",
        reason: "Six-month-old valuation in a postcode with recent competitor reductions.",
        nextAction: "Send updated price evidence and invite to refresh appraisal.",
      },
    ],
  },
];

export const recommendedScanWebsites: ScanWebsite[] = [
  {
    name: "Rightmove",
    url: "https://www.rightmove.co.uk",
    category: "Portals",
    priority: "Essential",
    dataCaptured:
      "New listings, SSTC, let agreed, reductions, withdrawals, asking prices and days on market.",
    note: "Best source for broad competitor listing movement; use only trusted, permitted website data or manual checks.",
  },
  {
    name: "Zoopla",
    url: "https://www.zoopla.co.uk",
    category: "Portals",
    priority: "Essential",
    dataCaptured:
      "Listings, rental stock, local estimates, price changes and competing agent coverage.",
    note: "Useful cross-check against portal stock and landlord/rental opportunity signals.",
  },
  {
    name: "OnTheMarket",
    url: "https://www.onthemarket.com",
    category: "Portals",
    priority: "Recommended",
    dataCaptured:
      "Additional listing coverage, launch timing and competitor branch activity.",
    note: "Adds coverage where properties are portal-exclusive or appear before other channels.",
  },
  {
    name: "PrimeLocation",
    url: "https://www.primelocation.com",
    category: "Portals",
    priority: "Optional",
    dataCaptured:
      "Premium property stock, investor listings and upper-market competitor activity.",
    note: "Most useful for premium homes and city-centre investor stock.",
  },
  {
    name: "Google Business Profiles",
    url: "https://www.google.com/search?q=David+James+Estate+Agents",
    category: "Reviews",
    priority: "Essential",
    dataCaptured:
      "Review scores, review volume, branch reputation changes and local search visibility.",
    note: "Use the public business profile and internal review request records for the no-API phase.",
  },
  {
    name: "AllAgents",
    url: "https://www.allagents.co.uk",
    category: "Reviews",
    priority: "Recommended",
    dataCaptured:
      "Agent reviews, competitor review strength and reputation gaps by branch.",
    note: "Good supplementary reputation benchmark for estate agency trust signals.",
  },
  {
    name: "GetAgent",
    url: "https://www.getagent.co.uk",
    category: "Competitors",
    priority: "Recommended",
    dataCaptured:
      "Local agent performance comparisons, market share indicators and valuation leads.",
    note: "Useful for understanding perceived agent performance and seller comparison behaviour.",
  },
  {
    name: "Home.co.uk",
    url: "https://www.home.co.uk",
    category: "Competitors",
    priority: "Recommended",
    dataCaptured:
      "Time on market, price history, local market trends and agent comparisons.",
    note: "Helpful for stale listing and relaunch opportunity analysis.",
  },
  {
    name: "David James website",
    url: "https://www.david-james.com",
    category: "First-party website",
    priority: "Essential",
    dataCaptured:
      "Valuation form leads, landlord enquiries, campaign landing pages and conversion source.",
    note: "Use internal website form exports and source tracking spreadsheets for the no-API phase.",
  },
  {
    name: "Internal CRM export file",
    url: "internal-file://crm-leads-export",
    category: "Internal files",
    priority: "Essential",
    dataCaptured:
      "Lead owner, lead source, call history, valuation status, instruction status and lost reasons.",
    note: "Export this from the CRM manually as Excel or CSV; no direct API integration is required for this phase.",
  },
];

export const agentSourceRequirements: AgentSourceRequirement[] = [
  {
    agentSlug: "seller-growth",
    requiredSource: "Seller lead and valuation export",
    currentStatus: "Available in Excel template",
    requiredFields:
      "Lead date, contact name, postcode, property type, estimated value, source, campaign, valuation status, owner, last contact, lost reason.",
    whyNeeded:
      "Without this, the Seller Growth Agent cannot prove where seller leads came from or rank who should be called first.",
    suggestedOwner: "Sales Director / internal data owner",
  },
  {
    agentSlug: "seller-growth",
    requiredSource: "Postcode market-share file",
    currentStatus: "Needs user file",
    requiredFields:
      "Postcode, total listings, David James listings, competitor listings, leading competitor, share gap, property type.",
    whyNeeded:
      "This identifies the postcodes where David James should target owners to recover share.",
    suggestedOwner: "Growth Director",
  },
  {
    agentSlug: "lead-conversion",
    requiredSource: "Internal lead activity export",
    currentStatus: "Available in Excel template",
    requiredFields:
      "Lead created date/time, assigned agent, first response time, follow-up count, valuation booked, status, next action, outcome.",
    whyNeeded:
      "This powers today/yesterday/week/month lead views and highlights overdue conversion actions.",
    suggestedOwner: "Branch managers",
  },
  {
    agentSlug: "competitor-intelligence",
    requiredSource: "Portal competitor movement feed",
    currentStatus: "Trusted website source",
    requiredFields:
      "Agent, listing URL, postcode, price, status, listed date, SSTC date, let agreed date, reductions, withdrawal date, days on market.",
    whyNeeded:
      "This is required for reliable daily competitor monitoring from trusted property websites.",
    suggestedOwner: "Managing Director / data supplier",
  },
  {
    agentSlug: "expired-stale-listings",
    requiredSource: "Stale and withdrawn listings file",
    currentStatus: "Available in Excel template",
    requiredFields:
      "Address or listing reference, agent, postcode, price, days on market, reduction count, withdrawn flag, last status date.",
    whyNeeded:
      "This identifies homes that may need a relaunch conversation.",
    suggestedOwner: "Market analyst",
  },
  {
    agentSlug: "landlord-growth",
    requiredSource: "Landlord and rental opportunity file",
    currentStatus: "Available in Excel template",
    requiredFields:
      "Landlord name, property postcode, rent, current agent, relist date, void days, renewal date, portfolio count, management status.",
    whyNeeded:
      "This lets the Landlord Growth Agent find switch, compliance review and portfolio opportunities.",
    suggestedOwner: "Lettings Director",
  },
  {
    agentSlug: "reputation",
    requiredSource: "Review and customer feedback file",
    currentStatus: "Available in Excel template",
    requiredFields:
      "Review date, branch, platform, rating, reviewer, response status, linked transaction, review request sent, sentiment, service risk.",
    whyNeeded:
      "The Reputation Agent needs this to show review gaps, detractor risks and branch trust actions instead of generic tasks.",
    suggestedOwner: "Marketing Manager / branch managers",
  },
  {
    agentSlug: "management-reporting",
    requiredSource: "Branch trading return",
    currentStatus: "Available in Excel template",
    requiredFields:
      "Branch, week, leads, valuations, instructions, pipeline value, fees, conversion rate, stock, reductions, fall-throughs, manager notes.",
    whyNeeded:
      "This creates the board pack and branch coaching actions.",
    suggestedOwner: "Operations Manager",
  },
];
