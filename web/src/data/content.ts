export const courses = [
  {
    slug: "shopify-mastery",
    tag: "SHOPIFY",
    badge: "FLAGSHIP",
    title: "Shopify Mastery",
    sub: "Zero to a live, selling store in 12 weeks.",
    mods: [
      { n: "01", t: "Store setup & theme engineering" },
      { n: "06", t: "Product hunting & China sourcing" },
      { n: "08", t: "Meta ads & order operations" },
    ],
    more: "+ 8 more modules below ↓",
    dur: "12 WEEKS",
    level: "BEGINNER → ADV",
  },
  {
    slug: "tiktok-shop",
    tag: "TIKTOK SHOP",
    badge: "",
    title: "TikTok Shop Accelerator",
    sub: "Short-form commerce, engineered for virality.",
    mods: [
      { n: "01", t: "Shop setup & compliance" },
      { n: "03", t: "Viral product frameworks" },
      { n: "05", t: "Affiliate & live selling" },
    ],
    more: "+ 5 more modules",
    dur: "6 WEEKS",
    level: "BEGINNER",
  },
  {
    slug: "ebay-etsy",
    tag: "EBAY · ETSY",
    badge: "",
    title: "International Selling",
    sub: "Cross-border stores that get paid from anywhere.",
    mods: [
      { n: "01", t: "Account health & listings" },
      { n: "04", t: "Ranking & marketplace SEO" },
      { n: "07", t: "Payoneer & logistics" },
    ],
    more: "+ 6 more modules",
    dur: "8 WEEKS",
    level: "INTERMEDIATE",
  },
  {
    slug: "daraz",
    tag: "DARAZ",
    badge: "",
    title: "Daraz Local Commerce",
    sub: "Win the region’s biggest marketplace.",
    mods: [
      { n: "01", t: "Store & catalog setup" },
      { n: "03", t: "Campaign calendar (11.11)" },
      { n: "05", t: "Fulfilment & returns ops" },
    ],
    more: "+ 4 more modules",
    dur: "5 WEEKS",
    level: "BEGINNER",
  },
  {
    slug: "ai-marketing",
    tag: "AI × MARKETING",
    badge: "NEW",
    title: "AI & Digital Marketing",
    sub: "An automation-first growth stack, hands-on.",
    mods: [
      { n: "02", t: "AI content systems" },
      { n: "05", t: "Meta & TikTok performance ads" },
      { n: "08", t: "Funnels, CRO & analytics" },
    ],
    more: "+ 7 more modules",
    dur: "8 WEEKS",
    level: "ALL LEVELS",
  },
];

export const curriculum = [
  {
    n: "01",
    t: "E-commerce Foundations",
    d: "Business models, margins, and how marketplaces actually rank and reward products — the math before the store.",
  },
  {
    n: "02",
    t: "Shopify Setup",
    d: "Domain, theme selection, essential apps, and a conversion-ready storefront built live in class.",
  },
  {
    n: "03",
    t: "Products & Listings",
    d: "Catalog structure, variants, copywriting, and photography standards that earn the click.",
  },
  {
    n: "04",
    t: "Shipping Setup",
    d: "Zones, rates, fulfilment partners, and delivery promises you can actually keep.",
  },
  {
    n: "05",
    t: "Payments Setup",
    d: "Gateways, Payoneer routing, cards and COD — getting paid reliably across borders.",
  },
  {
    n: "06",
    t: "Product Hunting",
    d: "Winning-product frameworks, demand signals, and the spy tools we use on live client stores.",
  },
  {
    n: "07",
    t: "Sourcing from China",
    d: "Alibaba and 1688, sampling, negotiation scripts, QC, and freight without the horror stories.",
  },
  {
    n: "08",
    t: "Meta & Ads Setup",
    d: "Pixel, catalog, and campaign structures that survive platform updates and scale on data.",
  },
  {
    n: "09",
    t: "Digital Marketing",
    d: "Creative testing, retargeting, and email + WhatsApp flows that turn one order into four.",
  },
  {
    n: "10",
    t: "Order Management",
    d: "Daily ops, returns, customer service, and the cash-flow discipline most sellers learn too late.",
  },
  {
    n: "11",
    t: "Case Studies",
    d: "Tear-downs of real student and client stores — what worked, what died, and why.",
  },
];

export const curriculaBySlug: Record<string, { n: string; t: string; d: string }[]> = {
  "shopify-mastery": curriculum,
  "tiktok-shop": [
    { n: "01", t: "Shop setup & compliance", d: "TikTok Shop registration, verification, and the policy details that get accounts suspended if missed." },
    { n: "02", t: "Content & creative fundamentals", d: "The hook-first, native-feeling video language that TikTok's algorithm actually rewards." },
    { n: "03", t: "Viral product frameworks", d: "How to spot a TikTok-native winning product before it saturates — and price it to convert on impulse." },
    { n: "04", t: "Catalog & inventory sync", d: "Listing structure, variants, and keeping stock accurate across a fast-moving sales spike." },
    { n: "05", t: "Affiliate & live selling", d: "Recruiting creators, commission structures, and running your first live selling session." },
    { n: "06", t: "TikTok Ads Manager & Spark Ads", d: "Boosting organic winners with paid spend without killing their native feel." },
    { n: "07", t: "Fulfilment & customer service", d: "Shipping SLAs, returns, and keeping your shop health score in the green." },
    { n: "08", t: "Scaling & case studies", d: "Real accelerator store teardowns — what scaled past $10K/mo and why." },
  ],
  "ebay-etsy": [
    { n: "01", t: "Account health & listings", d: "Seller standards, policies, and a listing structure built to survive an audit." },
    { n: "02", t: "Marketplace fee structures & pricing", d: "Final value fees, payment processing, and pricing so you keep margin after both." },
    { n: "03", t: "Photography & listing copy", d: "Visual and copy standards that lift click-through on eBay and Etsy search." },
    { n: "04", t: "Ranking & marketplace SEO", d: "Title, tag, and category structuring that gets found in Etsy and eBay search — not just Google." },
    { n: "05", t: "Etsy shop policies & brand setup", d: "Shop sections, policies, and the brand presentation that earns repeat buyers." },
    { n: "06", t: "International shipping & customs", d: "Duties, customs paperwork, and carrier selection for cross-border orders." },
    { n: "07", t: "Payoneer & logistics", d: "Getting paid from international marketplaces and routing funds without losing days to holds." },
    { n: "08", t: "Returns, disputes & seller protection", d: "Handling disputes and chargebacks without tanking your seller rating." },
    { n: "09", t: "Scaling multi-marketplace operations", d: "Running eBay and Etsy side by side without doubling your ops workload." },
  ],
  daraz: [
    { n: "01", t: "Store & catalog setup", d: "Daraz seller center setup, catalog structure, and the listing fields that affect search rank." },
    { n: "02", t: "Seller center & fee structure", d: "Commission tiers, payout cycles, and pricing to protect margin on Pakistan's biggest marketplace." },
    { n: "03", t: "Campaign calendar (11.11)", d: "Planning stock, pricing, and creative around Daraz's flagship sale events." },
    { n: "04", t: "Daraz Ads & voucher tools", d: "Sponsored placements, vouchers, and flash-sale slots that move units during campaigns." },
    { n: "05", t: "Fulfilment & returns ops", d: "Fulfilment-by-Daraz vs self-ship, and a returns process that keeps your rating intact." },
    { n: "06", t: "Customer service & ratings", d: "Response-time standards and rating recovery when something goes wrong." },
    { n: "07", t: "Case studies & scaling", d: "Real Daraz store teardowns, including the Karachi Kart #1-in-category campaign." },
  ],
  "ai-marketing": [
    { n: "01", t: "Growth strategy & funnel mapping", d: "Mapping the funnel before touching a single ad account or automation tool." },
    { n: "02", t: "AI content systems", d: "Prompt systems and pipelines that produce on-brand creative and copy at volume." },
    { n: "03", t: "Creative testing frameworks", d: "Structuring hooks, angles, and formats into a testing matrix that actually tells you why something won." },
    { n: "04", t: "Email & WhatsApp automation flows", d: "Lifecycle flows that turn a single order into repeat revenue on autopilot." },
    { n: "05", t: "Meta & TikTok performance ads", d: "Campaign structures, pixel setup, and budget rules that survive platform changes." },
    { n: "06", t: "AI chatbots & lead qualification", d: "Automating first response and qualification so leads don't go cold overnight." },
    { n: "07", t: "Retargeting & lifecycle marketing", d: "Sequencing retargeting across channels without fatiguing the audience." },
    { n: "08", t: "Funnels, CRO & analytics", d: "Landing page structure and the analytics setup that shows you what to fix first." },
    { n: "09", t: "Marketing automation stacks", d: "Wiring n8n and no-code tools into a stack that runs without daily babysitting." },
    { n: "10", t: "Case studies & campaign teardown", d: "Full teardowns of real client campaigns — budget, creative, and results." },
  ],
};

export const steps = [
  { n: "01", t: "Discover", d: "Audit your business, market, and numbers — the baseline." },
  { n: "02", t: "Strategy", d: "Roadmap, stack, and budget — quoted fixed, in writing." },
  { n: "03", t: "Design", d: "Flows, UI system, and a clickable prototype you approve." },
  { n: "04", t: "Develop", d: "Weekly sprints with a working demo every Friday." },
  { n: "05", t: "Launch", d: "QA, deployment, tracking — and a real first order." },
  { n: "06", t: "Scale", d: "Ads, automation, and iteration on live revenue data." },
];

export const results = [
  {
    name: "Retail Shopify Store",
    tag: "SHOPIFY BUILD",
    line: "PKR 3.84M gross sales in 7 months — up 322%",
    pts: "0,36 12,33 24,34 36,28 48,25 60,20 72,15 84,9 100,3",
    base: "0,36 100,36",
    delta: "+322% YoY",
    more: "34.2K sessions — see live dashboard above",
    unit: "Gross sales / month (PKR)",
    kpis: [
      { v: "PKR 3.84M", l: "Gross sales" },
      { v: "1,138", l: "Orders" },
      { v: "34.2K", l: "Sessions" },
    ],
    bars: [22, 30, 27, 41, 48, 63, 79, 100],
    work: ["Theme engineering", "Meta ads", "China sourcing", "Order ops"],
  },
  {
    name: "TrimTech Tools",
    tag: "EBAY ACCOUNT",
    line: "1,847 orders shipped last quarter",
    pts: "0,34 14,30 28,31 42,24 56,22 70,16 84,12 100,5",
    base: "0,34 100,34",
    delta: "99.1% positive",
    more: "Listing overhaul + repricing automation",
    unit: "Orders / week",
    kpis: [
      { v: "1,847", l: "Orders / qtr" },
      { v: "99.1%", l: "Positive" },
      { v: "+18%", l: "Margin" },
    ],
    bars: [40, 46, 43, 55, 61, 72, 84, 96],
    work: ["Listing overhaul", "Repricing bot", "Account health"],
  },
  {
    name: "Karachi Kart",
    tag: "DARAZ STORE",
    line: "#1 in Home & Living, 11.11 campaign",
    pts: "0,35 15,32 30,33 45,26 60,27 75,14 88,10 100,2",
    base: "0,35 100,35",
    delta: "6.2× ROAS",
    more: "Flash-sale calendar + fulfilment SLA fix",
    unit: "Units / campaign day",
    kpis: [
      { v: "6.2×", l: "Campaign ROAS" },
      { v: "4,300", l: "Units sold" },
      { v: "#1", l: "Category rank" },
    ],
    bars: [18, 24, 30, 28, 46, 58, 77, 100],
    work: ["Flash-sale calendar", "Daraz ads", "Fulfilment SLA"],
  },
  {
    name: "FitFuel",
    tag: "FLUTTER APP",
    line: "40K downloads in the first 90 days",
    pts: "0,37 14,35 28,30 42,28 56,22 70,18 84,10 100,4",
    base: "0,37 100,37",
    delta: "4.7★ rating",
    more: "MVP in 10 weeks, referral loop built in",
    unit: "Installs / week",
    kpis: [
      { v: "40K", l: "Downloads" },
      { v: "4.7★", l: "Store rating" },
      { v: "32%", l: "D30 retention" },
    ],
    bars: [26, 34, 44, 40, 58, 66, 82, 100],
    work: ["MVP in 10 wks", "Referral loop", "Push flows"],
  },
  {
    name: "RGM Stone",
    tag: "SAAS — WORKFLOW OS",
    line: "Quote-to-install factory pipeline, digitised end-to-end",
    pts: "0,38 16,36 32,34 48,26 64,24 80,12 100,6",
    base: "0,38 100,38",
    delta: "Live in production",
    more: "Jobs, warnings & billing in one dashboard",
    unit: "Jobs processed / week",
    kpis: [
      { v: "128", l: "Jobs live" },
      { v: "99.9%", l: "Uptime" },
      { v: "42s", l: "Deploys" },
    ],
    bars: [30, 38, 44, 52, 60, 74, 88, 100],
    work: ["Auth & billing", "Job pipeline", "Warnings engine"],
  },
  {
    name: "Areeba K. — graduate",
    tag: "ACADEMY",
    line: "First $1K month, 60 days after demo class",
    pts: "0,38 15,37 30,35 45,30 60,28 75,20 90,10 100,5",
    base: "0,38 100,38",
    delta: "Etsy · 312 sales",
    more: "Started in the free 3-day demo cohort",
    unit: "Sales / month",
    kpis: [
      { v: "$1.0K", l: "Monthly revenue" },
      { v: "312", l: "Etsy sales" },
      { v: "60 days", l: "To first $1K" },
    ],
    bars: [8, 14, 22, 30, 44, 58, 78, 100],
    work: ["Etsy setup", "Product hunting", "Listing SEO"],
  },
];

export const testimonials = [
  {
    ini: "HR",
    av: "avA",
    name: "Hamza Raza",
    role: "Founder, Aurelia Skincare",
    metric: "3.4× REVENUE IN ONE QUARTER",
    q: "They rebuilt our store and our ad account in the same month. Revenue tripled before the quarter ended — and I finally understand my own dashboard.",
  },
  {
    ini: "SI",
    av: "avB",
    name: "Sana Iqbal",
    role: "Ops Lead, TrimTech Tools",
    metric: "ERP SHIPPED ON THE DATE PROMISED",
    q: "The ERP rollout was the first project in years that shipped on the date we were promised. Weekly demos meant zero surprises.",
  },
  {
    ini: "BA",
    av: "avA",
    name: "Bilal Ahmed",
    role: "Academy graduate → eBay seller",
    metric: "FIRST INTL ORDER: DAY 54",
    q: "I joined the free demo class fully skeptical. Eight weeks later I had my first international order. The mentors sell on these platforms daily — it shows.",
  },
  {
    ini: "MS",
    av: "avB",
    name: "Maryam Shah",
    role: "CEO, FitFuel",
    metric: "40K DOWNLOADS IN 90 DAYS",
    q: "ScaleUp acted like a product team, not a vendor. They pushed back where it mattered and the app is better for it.",
  },
  {
    ini: "UT",
    av: "avA",
    name: "Usman Tariq",
    role: "HR Director, corporate client",
    metric: "38 STAFF CERTIFIED IN 2 DAYS",
    q: "Their AI workshop retrained our entire marketing floor in two days. Practical from the first hour — no slideware.",
  },
];

export const faqs = [
  {
    q: "What does a project cost?",
    a: "Business sites start around $1.5K, ecommerce builds from $2.5K, SaaS MVPs from $8K. Every engagement begins with a free scoping call and a fixed, line-itemed quote — no hourly surprises.",
  },
  {
    q: "How long until launch?",
    a: "A Shopify store ships in 2–4 weeks, business sites in 3–6, SaaS MVPs in 8–12. You see a working build every Friday from week one.",
  },
  {
    q: "Is training online, in-person, or both?",
    a: "Both. Every course runs live online and at our Lahore campus in parallel batches. Recordings, materials, and weekly Q&A are included either way — start with the free 3-day demo.",
  },
  {
    q: "What happens after launch?",
    a: "30 days of included support, then optional care plans covering hosting, security, updates, and a monthly growth review with real numbers.",
  },
  {
    q: "What technologies do you build on?",
    a: "Shopify and WooCommerce for commerce; React, Next.js, and Laravel for web; Flutter for mobile; n8n and OpenAI for automation. We pick boring, scalable stacks — not trends.",
  },
  {
    q: "Do students get certified?",
    a: "Yes — every track ends with a project review and a verifiable ScaleUp certificate. Top graduates get referred into client projects and our hiring network.",
  },
];

export const coreServices = [
  { t: "ai automation", x: 50, y: 20, c: "#5FD6BC", r: "50%" },
  { t: "ecommerce dev", x: 36, y: 36, c: "#7FE0C3", r: "3px" },
  { t: "saas products", x: 64, y: 36, c: "#F2C94C", r: "50%" },
  { t: "digital marketing", x: 29, y: 52, c: "#FFB86B", r: "3px" },
  { t: "ui/ux design", x: 50, y: 52, c: "#F7A8D8", r: "50%" },
  { t: "crm / erp", x: 70, y: 52, c: "#F09A9A", r: "3px" },
  { t: "web development", x: 39, y: 68, c: "#7FC3F0", r: "50%" },
  { t: "mobile apps", x: 62, y: 68, c: "#B8A7F0", r: "3px" },
  { t: "business consulting", x: 50, y: 84, c: "#C9E265", r: "50%" },
];

export const orbitalServices = [
  { t: "store migrations", x: 17, y: 28 },
  { t: "product photography", x: 13, y: 42 },
  { t: "marketplace audits", x: 16, y: 61 },
  { t: "dropshipping setup", x: 19, y: 79 },
  { t: "seo & content", x: 81, y: 30 },
  { t: "email automation", x: 86, y: 42 },
  { t: "corporate training", x: 84, y: 61 },
  { t: "analytics setup", x: 81, y: 79 },
];

export const teamPods = [
  {
    name: "Engineering",
    d: "Senior web, mobile, and SaaS developers — the same people who ship client production code teach the Shopify and AI tracks.",
  },
  {
    name: "Growth & Performance Marketing",
    d: "Meta, TikTok, and marketplace ads run by the team behind every client ROAS number on this site.",
  },
  {
    name: "Academy & Mentorship",
    d: "Instructors and 1:1 mentors running live cohorts online and at the Lahore campus, week after week.",
  },
  {
    name: "Design & Product",
    d: "UI/UX and product strategy for every store, app, and SaaS dashboard we deliver.",
  },
  {
    name: "Client Success",
    d: "The point of contact for weekly demos, fixed quotes, and making sure nothing ships as a surprise.",
  },
];

export const milestones = [
  { y: "Year 1–2", t: "Agency founded", d: "Started delivering Shopify and WooCommerce stores for local SMEs in Lahore." },
  { y: "Year 3", t: "Academy launched", d: "Opened the first live cohort to turn client playbooks into a teachable curriculum." },
  { y: "Year 4–6", t: "Software & AI added", d: "Expanded into SaaS product development, CRM/ERP, and AI automation for client operations." },
  { y: "Year 7–8", t: "One ecosystem", d: "2,400+ students trained and 340+ stores and products launched under one team." },
];

export const coursesBySlug = Object.fromEntries(courses.map((c) => [c.slug, c]));

