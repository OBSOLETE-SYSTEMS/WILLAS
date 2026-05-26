const { useState, useMemo, useEffect } = React;

function useLiveClock(){
  const [now,setNow] = useState(new Date());
  useEffect(()=>{ const id=setInterval(()=>setNow(new Date()),1000); return ()=>clearInterval(id); },[]);
  return now;
}
function fmtClock(d){
  const date = d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"});
  const time = d.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false});
  return {date,time};
}

const LOGO = "https://i.postimg.cc/d02cvvdS/images.png";

const PILLAR_COLORS = {
  "HEALTH/WELLNESS":"#73B2C9","INGREDIENTS/RECIPES":"#75C596",
  "PARENTING":"#9E652E","REVIEWS/RECS":"#A191B2"
};

// ──────────────────────────────────────────────────────────
// REAL DATA — May 25–31 2026. Refreshed May 24 2026.
// ──────────────────────────────────────────────────────────

const TRENDS = [
  {
    trend:"Elmhurst 1925 just took Clean Protein nationwide at Sprouts 🥛 — 4 SKUs at $4.99, 27g plant protein, no gums or seed oils, NEXTY-Award Pistachio Crème",
    detail:"Elmhurst 1925's Clean Protein line debuted nationwide at Sprouts Farmers Market on MAY 11, 2026 — 4 SKUs at $4.99 (2026 NEXTY-Award-Winner Pistachio Crème, Sea Salt Chocolate, Vanilla, Strawberries and Cream). 27g complete plant protein, 190 calories, as few as 3g sugar per bottle, made WITHOUT gums, seed oils, artificial sweeteners, or artificial flavors. This is the closest-clean-positioned peer brand going direct at Willa's positioning AT WILLA'S PRIMARY NATURAL-CHANNEL RETAILER. The cert gap still holds (not organic, not glyphosate-free, not WBENC-certified, not mother-founded) — that's the Willa's moat.",
    platform:"Trade Press + Retail",
    views:"Nationwide at Sprouts · 4 SKUs · $4.99",
    velocity:"high",
    pillars:["REVIEWS/RECS","INGREDIENTS/RECIPES"],
    angle:"Closest peer goes direct at Willa's positioning at Sprouts 🥛 — Willa's moat is the cert stack Elmhurst can't claim (organic + glyphosate-free + WBENC + mother-founded).",
    urgency:"RIDE NOW",
    sources:[
      {label:"BevNET · Elmhurst 1925 Launches Clean Protein Nationwide at Sprouts (May 18)", url:"https://www.bevnet.com/pr/2026/05/18/elmhurst-1925-launches-awardwinning-clean-protein-line-nationwide-at-sprouts-farmers-market"},
      {label:"Dairy Foods · Elmhurst Clean Protein debuts at Sprouts (May 21)", url:"https://www.dairyfoods.com/articles/99124-elmhurst-1925-clean-protein-line-debuts-at-sprouts"}
    ]
  },
  {
    trend:"Oatly's Cold Foam goes global ❄️ — London Coffee Festival debut MAY 14-17, EU rollout ramping through Coffee Fellows + Good News",
    detail:"Oatly debuted its new cold foam product at the London Coffee Festival (May 14-17) with wider rollout beginning across Europe in May — Coffee Fellows (Germany), Good News (Spain, France, Netherlands). Per Oatly, plant-based cold foam has been 'hard to find and harder to replicate.' Same week, Oatly's flavor roadmap report flagged Matcha Oat Drink + iKaffe Popcorn coming to US shelves late 2026; Hot Cocoa Oatmilk already shipping. AGM MAY 20 (no dividend, LTIP 2026-2028 — internal-only). The category leader is going maximalist on flavor + foodservice cold foam, while Willa's Barista has been quietly winning the AT-HOME cold-foam pour with a 4-ingredient deck.",
    platform:"Trade Press + Foodservice",
    views:"London Coffee Festival · EU rollout May 2026",
    velocity:"medium",
    pillars:["INGREDIENTS/RECIPES","REVIEWS/RECS"],
    angle:"Oatly claims cold foam at the bar ❄️ — Willa's Barista already pours it at home. Show the at-home pull this week.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Green Queen · Oatly Cold Foam launch coverage", url:"https://www.greenqueen.com.hk/oatly-barista-cold-foam-non-dairy-plant-based-milk-coffee/"},
      {label:"Oatly Investor Relations · Post-Matchamania world trend report", url:"https://investors.oatly.com/news-releases/news-release-details/decaf-dominance-post-matchamania-world-oatly-spotlights-emerging/"}
    ]
  },
  {
    trend:"Danone closes its 25-year-old Silk plant-based facility 🛏️ — Bridgeton NJ shuts AUG 4, category splinters into winners + losers",
    detail:"Danone confirmed on MAY 9 it will close its 25-year-old Bridgeton, New Jersey plant-based beverage facility on AUG 4, 2026 — 114 layoffs, Silk + So Delicious production redistributed to Mt. Crawford VA, Dallas TX, and Jacksonville FL. The framing in trade press: 'the plant-based milk category splinters into winners and losers' as the category competes with higher-protein dairy, cheaper conventional milk, and a broader wellness market obsessed with protein + convenience. Willa's structurally on the winning side: 4 ingredients, no isolates, mother-founded, certified-cert-stack, real-food protein from the whole oat. Don't ship a Danone-name brief; let the framework do the work.",
    platform:"Trade Press + Industry analysis",
    views:"114 layoffs · facility closes Aug 4, 2026",
    velocity:"high",
    pillars:["REVIEWS/RECS"],
    angle:"Category splinters into winners + losers — Willa's lives on the winning side, structurally. Don't name Danone; let the framework do the work.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Food Dive · Danone to close plant-based dairy facility in NJ", url:"https://www.fooddive.com/news/danone-to-close-plant-based-dairy-facility-in-new-jersey/819781/"},
      {label:"VegOut · Danone shuts 25-year-old Silk plant as category splinters", url:"https://vegoutmag.com/food-and-drink/vo-fd-danone-shuts-25-year-old-silk-plant-as-plant-based-milk-category-splinters-into-winners-and-losers/"}
    ]
  },
  {
    trend:"MAHA reformulation wave hits Big-CPG 🛡️ — PepsiCo phasing canola + soybean oils from Lay's + Tostitos, Kraft Heinz + General Mills + Nestlé following",
    detail:"MAHA-driven reformulation continues to ripple through CPG. PepsiCo announced it would phase canola and soybean oils out of Lay's and Tostitos; Kraft Heinz, General Mills, and Nestlé following with their own reformulation pledges. Steak 'n Shake 'RFK'd' its fries. The January 2026 dietary guidelines added butter + beef tallow alongside olive oil as acceptable cooking fats. Jesse & Ben's seed-oil-free fries closed a $10M Series A from Greycroft MAY 7 (1,100% growth in 2025, launching Target/Costco/Kroger). Willa's Original is already seed-oil-free; Willa's Barista uses high-oleic sunflower oil (structurally different from industrial seed oils). The reformulation wave benefits Willa's positioning regardless — clean-deck brands are validated as category winners.",
    platform:"Trade Press + Policy",
    views:"PepsiCo + Kraft Heinz + General Mills + Nestlé reformulation pledges",
    velocity:"medium",
    pillars:["HEALTH/WELLNESS","REVIEWS/RECS"],
    healthSubAngle:"HEART",
    angle:"Big-CPG is reformulating to where Willa's started — Original was never going to have seed oils. Lead-with-solution: the 4-ingredient deck IS the proof.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Food Dive · How MAHA transformed the food industry", url:"https://www.fooddive.com/news/maha-food-ingredients-rfk-artificial-dyes/808286/"},
      {label:"FoodNavigator USA · MAHA push accelerates reformulation", url:"https://www.foodnavigator-usa.com/Article/2026/04/14/maha-push-creates-reformulation-chaos/"},
      {label:"STAT News (May 22, 2026) · Anti-seed-oil fact-check", url:"https://www.statnews.com/2026/05/22/seed-oils-healthy-fats-tallow-fact-check-cardiac-health/"}
    ]
  },
  {
    trend:"EWG dropped its interactive state-food-chemical regulation map 🗺️ — 50 states tracked, Willa's is on the right side of every line",
    detail:"Environmental Working Group released a new interactive map (MAY 2026) tracking state-by-state food chemical regulation across all 50 states — dyes, glyphosate, BVO, propylparaben, titanium dioxide. The visual is going to be the reference parents share when school + grocery comes up all summer. Willa's clean-deck-by-default + Detox Project cert + USDA Organic stack is the answer parents are already searching for. Pairs with WV HB 2354 enacted (effective Jan 2028, joins CA + AZ + LA).",
    platform:"Trade Press + Parenting Press",
    views:"Interactive map · 50 states tracked · MAY 2026 release",
    velocity:"high",
    pillars:["HEALTH/WELLNESS","PARENTING"],
    healthSubAngle:"IMMUNE",
    angle:"EWG made the receipts visual 🗺️ — Willa's is already on the right side of the map. Run a label-literacy carousel this week.",
    urgency:"RIDE NOW",
    sources:[
      {label:"EWG · Interactive map tracking state food chemical regulation (May 2026)", url:"https://www.ewg.org/news-insights/news/2026/05/interactive-map-tracking-state-food-chemical-regulation-us"},
      {label:"Salon · Federal inaction on food additives pushes states to act", url:"https://www.salon.com/2026/04/11/federal-inaction-on-food-additives-pushes-states-to-act/"}
    ]
  },
  {
    trend:"'Not all UPFs are created equal' 🔍 — MAY 22 expert-panel reframe gives Willa's the calm authority lane",
    detail:"A major piece dropped MAY 22, 2026 on the new Healthy Eating Research expert-panel framework arguing federal regulators should distinguish HARMFUL UPFs from doctor-recommended UPFs (yogurt, infant formula, fortified milks). The reframe is critical because it CONCEDES some 'ultraprocessed' food is health-positive — opening space for clean-deck oat milks like Willa's to live on the right side of the dividing line. Watch for the framework to land in regulatory + grocery discussions through summer.",
    platform:"Trade Press + Policy",
    views:"Expert-panel framework · May 22 reframe",
    velocity:"medium",
    pillars:["HEALTH/WELLNESS"],
    healthSubAngle:"GUT",
    angle:"UPF discourse just got a 'not all of them' carve-out 🔍 — Willa's is the case-in-point: 4 ingredients, doctor-recommendable.",
    urgency:"THIS WEEK",
    sources:[
      {label:"FoodNavigator USA · Not all UPFs are created equal (May 22, 2026)", url:"https://www.foodnavigator-usa.com/Article/2026/05/22/not-all-upfs-are-created-equal-and-a-new-expert-panel-says-federal-regulators-should-draw-a-clear-line-between-those-that-are-harmful-and-those-that-doctors-recommend/"}
    ]
  },
  {
    trend:"Pinterest's MAY 22 weekly report — rhubarb recipes up 51% 🌿, summer-kitchen-open energy",
    detail:"Pinterest's MAY 22, 2026 weekly trend report flagged 'school's almost out, summer's almost in' as the energy of the week — rhubarb recipes up 51% (desserts, jams, sourdough rhubarb snack cake, strawberry rhubarb crisp). Sustained: fermentation, high-fiber meals, swicy (sweet+spicy), cabbage. Pinterest is where Willa's audience plans recipes 7-10 days ahead — the rhubarb wave is a 2-3 week window for summer-kitchen-open content. Heritage-coded ingredient (rhubarb = grandma food) that Willa's grandma-kitchen voice owns. Pairs with strawberry season peaking same week.",
    platform:"Pinterest + Trade Press",
    views:"Pinterest weekly trend report May 22, 2026",
    velocity:"high",
    pillars:["INGREDIENTS/RECIPES","HEALTH/WELLNESS"],
    angle:"Rhubarb season is peaking 🌿 — Willa's grandma-kitchen voice owns it. Drop a sourdough rhubarb snack cake pin with Willa's Original. (Pinterest stat is engine context, NOT for consumer copy.)",
    urgency:"RIDE NOW",
    sources:[
      {label:"Pinterest Business Community · The Weekly PBC Trend Report May 22, 2026", url:"https://community.pinterest.biz/t/the-weekly-pbc-trend-report-may-22-2026/45841"}
    ]
  },
  {
    trend:"Pistachio is the breakout iced-coffee flavor 🥥 — everywhere this summer, cafe-format custom-built for Willa's Barista",
    detail:"Pistachio has emerged as the must-have iced-coffee flavor on cafe menus, with consumer interest surging across cafe trend reports (Dilworth + Tampa, MAY 2026). The pistachio iced latte format is custom-built for the cold-foam pour Willa's Barista is engineered for — clean-deck, no rapeseed, no gums to fight the syrup. Adjacent: matcha cold foam wave (matcha now 50% of Blank Street Coffee orders), banana bread latte still circulating. Note convergence: Elmhurst's new NEXTY-Award Pistachio Crème SKU (T-1) IS in this lane. Willa's pivot: don't compete on pistachio AS A FLAVOR, ride pistachio AS A CAFE FORMAT (the iced-latte pour, not the SKU).",
    platform:"Trade Press + TikTok",
    views:"Cafe trend reports May 2026",
    velocity:"high",
    pillars:["INGREDIENTS/RECIPES"],
    angle:"Pistachio iced-latte is everywhere this summer 🥥 — Willa's Barista pours like it was made for the format. (Consumer copy says 'everywhere this summer' not stat references.)",
    urgency:"RIDE NOW",
    sources:[
      {label:"Dilworth Coffee · Summer Sips trends 2026", url:"https://pro.dilworthcoffee.com/blogs/news/summer-sips-leveraging-2026-s-biggest-drink-trends-for-coffee-shops"},
      {label:"Tampa Bay 28 · Iced coffee trends taking over summer 2026", url:"https://www.tampabay28.com/morning-blend/the-iced-coffee-trends-taking-over-summer-2026"}
    ]
  },
  {
    trend:"Yuka app went mainstream-viral 📱 — #1 in US Health & Fitness, 94% of users return 'bad' scored products. Willa's Kids holds 100/100.",
    detail:"Yuka app got explicit mainstream-press validation in MAY 2026 (WCCB Charlotte May 11 + WaPo + WWD + CBS Miami). The app is #1 in US Health & Fitness category, ranking #60 overall. Per Yuka's own research: 94% of US users return a product to the shelf if it gets a 'bad' rating, 92% are buying fewer ultra-processed food products since using the app. Since 2024 Yuka has allowed users to message brands asking for additive removal — creating reformulation pressure. The Willa's connection: Willa's Kids holds a perfect 100/100 Yuka score (Original + Chocolate both 94, Barista TBD). This is the brand-direct moment.",
    platform:"Consumer Tech Press + Trade",
    views:"Mainstream press cluster May 2026 · 94% bad-score return rate",
    velocity:"high",
    pillars:["REVIEWS/RECS","PARENTING"],
    angle:"Yuka virality is mainstream now 📱 — Willa's Kids 100/100 is the brand-direct receipt. Scan-then-pour proof.",
    urgency:"THIS WEEK",
    sources:[
      {label:"WCCB Charlotte · What the Tech: App of the day Yuka (May 11, 2026)", url:"https://www.wccbcharlotte.com/2026/05/11/what-the-tech-app-of-the-day-yuka/"},
      {label:"WWD · Yuka App food beauty viral coverage 2026", url:"https://wwd.com/beauty-industry-news/beauty-features/yuka-app-food-beauty-viral-app-ingredients-clean-1236907300/"}
    ]
  },
  {
    trend:"Sprouts MAY-JUN 2026 rollout 🌱 — Wellness Bowls daily-fresh + Sweet Heat line + 3 new vegan muffin flavors + Cherry Vegan Protein",
    detail:"Sprouts Farmers Market announced its MAY-JUN 2026 exclusive product rollout — Wellness Bowls prepared fresh in-store daily, Sweet Heat snacks-and-beverages limited line, three new vegan muffin flavors (whole-ingredient, no artificial colors), Cherry Vegan Protein (20g protein, allergen-friendly, non-GMO). Sprouts is Willa's primary natural-channel retailer — the wellness-bowl format opens a meal-pairing content opportunity (oat-milk-based drinks paired with the bowls). Sweet Heat overlaps the 'swicy' Pinterest wave. Combined with Elmhurst Clean Protein nationwide launch THIS WEEK (T-1), Sprouts is investing heavily in the clean-deck-protein category Willa's already lives in.",
    platform:"Retail Press + Trade",
    views:"Sprouts MAY-JUN exclusive products rollout",
    velocity:"medium",
    pillars:["REVIEWS/RECS","INGREDIENTS/RECIPES"],
    angle:"Sprouts goes deeper on wellness + plant + swicy 🌱 — Willa's is the carton already on those carts. Pair Willa's pour with the new bowl format.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Sprouts Farmers Market · Exclusive products MAY-JUN press release", url:"https://www.sprouts.com/press-release/sprouts-farmers-market-rolling-out-exclusive-products-in-may-and-june/"},
      {label:"Progressive Grocer · Sprouts adds Sweet Heat + Wellness Bowls", url:"https://progressivegrocer.com/sprouts-adds-sweet-heat-snacks-and-wellness-bowls-private-label-roster"}
    ]
  },
  {
    trend:"Arizona's UPF-in-schools ban kicks in AUG 2026 📚 — joins CA + WV in state-by-state school-lunch pressure",
    detail:"Arizona Healthy School Act prohibits any public school from selling UPFs on school campuses during school hours starting in the 2026-2027 school year (begins August/September). Combined with California's similar law (effective 2027), Florida's bread-testing initiative (Feb 2026), and WV HB 2354 (synthetic dyes, effective Jan 2028), the state-by-state pressure on what kids eat at school is accelerating fast. Parents will be asking what's in the carton for school lunch all summer — pre-back-to-school content lane opens NOW. Willa's Kids (top-9 allergen-free, 8g protein, DHA, Bobby Approved, Yuka 100/100) is the answer-already-shipped.",
    platform:"Policy + Parenting Press",
    views:"AZ Healthy School Act + CA + WV state cluster",
    velocity:"medium",
    pillars:["PARENTING","HEALTH/WELLNESS"],
    angle:"Back-to-school clean-label pressure is structural now (AZ + CA + FL + WV) 📚 — Willa's Kids was built for this.",
    urgency:"BACKGROUND",
    sources:[
      {label:"O'Melveny · UPFs face rising scrutiny: state laws + FDA + litigation 2025-2026", url:"https://www.omm.com/insights/alerts-publications/ultra-processed-foods-face-rising-scrutiny-what-new-state-laws-fda-actions-and-private-litigation-mean-for-food-manufacturers-in-2025-2026/"}
    ]
  }
];



const TICKER = [
  {agent:"comp",     text:"Elmhurst's Clean Protein went nationwide at Sprouts MAY 11-21 (27g protein, 4 SKUs, no gums/seed oils) — willa's cert-stack BIG SWING IG-R1 + cert-moat Reel R5 queued in response 🚨"},
  {agent:"trend",    text:"Yuka app went mainstream-viral in MAY (94% of users return 'bad' scored products) — willa's Kids 100/100 is the brand-direct receipt · BIG SWING IG-R1 phone-scan reveal queued 📱"},
  {agent:"pulse",    text:"Tortilla cinnamon rolls are THE breakout viral recipe of MAY 2026 (GMA + ABC News) — willa's plays the dairy-free swap with Barista + coconut cream · BIG SWING TT-1 queued 🌯"},
  {agent:"pulse",    text:"Pinterest rhubarb +51% MAY 22 weekly report — sourdough rhubarb snack cake heritage pin (PIN-1) queued for THU MAY 28 · willa's grandma-kitchen voice owns the lane 🌿"},
  {agent:"comp",     text:"Danone closing 25-year-old Silk plant-based facility AUG 4 (114 layoffs) — category splinters into winners + losers · willa's lives on the winning side structurally ⚓"},
  {agent:"trend",    text:"MAHA reformulation wave hits Big-CPG (PepsiCo phasing canola/soybean from Lay's, Kraft Heinz + General Mills following) — willa's Original was already seed-oil-free 🛡️"},
  {agent:"comp",     text:"Oatly Cold Foam debuted London Coffee Festival MAY 14-17 → EU rollout — willa's Barista has quietly won at-home cold-foam pour ❄️"},
  {agent:"trend",    text:"EWG's interactive state-food-chemical regulation map dropped MAY 2026 — willa's is on the right side of every state line · F1 carousel queued for TUE MAY 26 🗺️"},
  {agent:"pulse",    text:"Bleachers self-titled album dropped MAY 22 (Antonoff Brooklyn-indie) — audio bed for the long-weekend pour R3 Reel SAT MAY 30 11am 🎶"},
  {agent:"pulse",    text:"The Four Seasons S2 (Tina Fey + Steve Carell) drops Netflix THU MAY 28 — tonal-stitch R4 Reel queued for FRI MAY 29 6pm (no name-check) 🌲"},
  {agent:"pulse",    text:"Shaved Fruit (frozen strawberry on microplane) is taking over TikTok this month — willa's pours on top, dairy-free by accident · TT-2 queued WED MAY 27 🍓"},
  {agent:"hook",     text:"drafted 18 on-brand captions × 3 voice variants · brand-voice default (not founder first-person) · Willa's capitalized in caption bodies"},
  {agent:"composer", text:"queued 18 briefs for MAY 25-31 · 3 BIG SWINGs (Yuka Kids reveal · tortilla cinnamon dairy-free · sourdough rhubarb heritage pin) + 6 evergreens in the back half"},
  {agent:"visual",   text:"footage inspo banks complete on all 18 briefs · 4 categories per brief (shoot/found/memes/archive) · F2 lunchbox specifies Violife or Good Plants dairy-free cheese (no-dairy rule)"},
  {agent:"editor",   text:"caught + rewrote 5 phrase repeats from past 5 weeks (iced coffee that doesn't fight back · willa was a real woman · one carton two generations · saturday-morning carton · cert stack) · automated audit script now live as Step 7 #26"},
  {agent:"paid",     text:"amplifying 3 BIG SWINGS only · Yuka R1 ($260 Meta Reels) + Tortilla TT-1 ($240 TikTok Spark) + Rhubarb PIN-1 ($180 Pinterest Promoted) · 15 briefs organic-first"}
];


const COMPETITORS = [
  {
    name:"Oatly",
    status:"Oatly's biggest May moment isn't earnings — it's the Cold Foam launch ❄️. London Coffee Festival debut (MAY 14-17), rolling out across Europe through Coffee Fellows (Germany) and Good News (Spain / France / Netherlands). Per Oatly, plant-based cold foam has been 'hard to find and harder to replicate.' Same week the investor flavor-roadmap report flagged Matcha Oat Drink + iKaffe Popcorn coming to US shelves late 2026. Hot Cocoa Oatmilk already shipping. AGM landed MAY 20 (no dividend, LTIP 2026-2028 — internal-only). The category leader is going maximalist on flavor + foodservice cold foam, while Willa's Barista has been quietly winning the AT-HOME cold-foam pour with a 4-ingredient deck.",
    direction:"up",
    opportunity:"Oatly claims cold foam at the bar ❄️ — Willa's Barista already pours it at home. Show the at-home pull this week.",
    sources:[
      {label:"Green Queen · Oatly Cold Foam launch coverage", url:"https://www.greenqueen.com.hk/oatly-barista-cold-foam-non-dairy-plant-based-milk-coffee/"},
      {label:"Oatly Investor · Post-Matchamania world trend report", url:"https://investors.oatly.com/news-releases/news-release-details/decaf-dominance-post-matchamania-world-oatly-spotlights-emerging/"}
    ]
  },
  {
    name:"Califia Farms",
    status:"Califia's Q1 momentum continues from the Tesco UK matcha launch (still on shelf through summer). The Simple & Organic platform expansion (creamers + soymilk reformulations) keeps rolling at Whole Foods and Sprouts. The Uproot acquisition (dispensers at 150+ college dining + K-12 + hospitals) continues to feed the institutional / foodservice play. Quiet week on net-new SKU — the play this week is to NOT chase their matcha lane and instead lean into the dairy-free fermentation pour (Willa's + Cocoyo coconut kefir) where Califia hasn't positioned.",
    direction:"flat",
    opportunity:"Califia owns the matcha lane this quarter 🍵 — Willa's plays adjacent: the dairy-free fermentation pour Califia hasn't claimed.",
    sources:[
      {label:"Califia Farms newsroom", url:"https://www.califiafarms.com/press/"},
      {label:"The Plant Base · Blueberry Matcha Almond Latte Tesco UK", url:"https://www.theplantbasemag.com/news/califia-farms-expands-rtd-matcha-range-with-new-blueberry-matcha-almond-latte"}
    ]
  },
  {
    name:"Planet Oat",
    status:"Planet Oat's class-action vitamin D lawsuit is still open, still re-surfacing on parenting subreddits, still no public defense. Meanwhile their early-2026 promo with Emily in Paris and the two Zero Sugar Oatmilk Creamers (Caramel + Vanilla Cinnamon, January launch) keep getting press cycle. The TV-partnership play is the pattern worth noting — they're going pop-culture-association where Willa's plays product-truth-receipts. The trust gap stays wide on the mass-market oat-milk shelf. 'A label is a claim. A test is a fact.'",
    direction:"down",
    opportunity:"Trust gap stays open 🛡️ — Willa's tests every lot. Don't name Planet Oat; let the framework do the work.",
    sources:[
      {label:"Prepared Foods · Plant-based dairy seeks reset", url:"https://www.preparedfoods.com/articles/131394-plant-based-dairy-seeks-reset"}
    ]
  },
  {
    name:"Chobani",
    status:"Quiet May for Chobani Oat — the La Colombe RTD integration keeps building on the MAY 10 close, Norton Shores Michigan plant ramping. No new oat-milk SKUs announced. The dominant frame stays: RTD coffee is consolidating into one mega-platform. Willa's distinct lane sharpens — Willa's is the protein in the whole oat that lives in your fridge carton, not the bottled shake in the checkout cooler. The frame works for cold foam at home (T-2 Oatly trend) just as well.",
    direction:"flat",
    opportunity:"RTD coffee is one mega-shake platform now ☕ — Willa's lane is the carton in the fridge, not the bottle in the cooler.",
    sources:[
      {label:"Food Dive · Chobani goes all oat with new yogurt and milk", url:"https://www.fooddive.com/news/chobani-goes-all-oat-with-new-yogurt-and-milk-launches/567055/"}
    ]
  },
  {
    name:"Elmhurst 1925",
    status:"🚨 Elmhurst's Clean Protein line went NATIONWIDE at Sprouts on MAY 11, 2026 — 4 flavors at $4.99: 2026 NEXTY-Award-Winner Pistachio Crème, Sea Salt Chocolate, Vanilla, Strawberries and Cream. 27g complete plant protein, 190 calories, as few as 3g sugar per bottle, made WITHOUT gums, seed oils, artificial sweeteners, or artificial flavors. This is the closest-clean-positioned peer brand going DIRECT at Willa's positioning at WILLA'S PRIMARY NATURAL-CHANNEL RETAILER. Adjacent context: Pistachio is the breakout iced-coffee flavor (T-8 trend) — Elmhurst's NEXTY-Award SKU is pointed straight at that wave. The cert gap still holds though: Elmhurst is NOT organic, NOT glyphosate-free-certified by Detox Project, NOT WBENC, NOT mother-founded. That's the Willa's moat. Voice: don't punch, don't panic, just keep showing the cert-stack receipts.",
    direction:"up",
    opportunity:"🚨 Elmhurst goes direct at Willa's positioning at Sprouts — Willa's moat is the 4 certs Elmhurst can't claim (organic + Detox Project + WBENC + mother-founded). Show the credentials this week.",
    sources:[
      {label:"BevNET · Elmhurst 1925 Launches Clean Protein Nationwide at Sprouts (May 18, 2026)", url:"https://www.bevnet.com/pr/2026/05/18/elmhurst-1925-launches-awardwinning-clean-protein-line-nationwide-at-sprouts-farmers-market"},
      {label:"Dairy Foods · Elmhurst 1925 Clean Protein debuts at Sprouts (May 21, 2026)", url:"https://www.dairyfoods.com/articles/99124-elmhurst-1925-clean-protein-line-debuts-at-sprouts"}
    ]
  },
  {
    name:"Mooala",
    status:"Mooala completed a line-wide repackaging — cleaner on-pack communication about ingredient sourcing, organic certification, and simple formulations (Prepared Foods coverage, landing in May trade rotation). This is the structural rising-tide: clean-deck is becoming category table stakes. Mooala is going organic-forward without the Detox Project glyphosate-free cert or WBENC mother-founded status that Willa's holds. The moat shifts from 'clean ingredient deck' to 'clean ingredient deck + cert stack you can't fake.'",
    direction:"up",
    opportunity:"Clean deck is the floor now — Willa's moat is the cert stack you can't fake (organic + Detox Project + WBENC + Yuka 100).",
    sources:[
      {label:"Prepared Foods · Plant-based dairy seeks reset", url:"https://www.preparedfoods.com/articles/131394-plant-based-dairy-seeks-reset"}
    ]
  }
];


const AMBASSADORS = [
  {
    type:"Clean-Eating Parenting Creators",
    description:"Mom accounts in the 10K–50K range posting school-lunch + 'what I feed my toddler' content who already vocally avoid dyes, seed oils, and gums. Activated by EWG news + state dye-ban headlines.",
    count:"12 IDENTIFIED THIS WEEK",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    creators:[
      {handle:"@cleanlivingmama",  followers:"42.3K", platform:"IG",     fit:5, last:"Posted Sat May 2: 'why I read every label' → 1.8K saves",  action:"Send Willa's Kids 4-pack + handwritten note"},
      {handle:"@thewholeoatmom",   followers:"28.7K", platform:"TikTok", fit:5, last:"Lunchbox series · 320K avg views per post",                action:"Sample + collab proposal"},
      {handle:"@nontoxicnest",     followers:"19.2K", platform:"IG",     fit:4, last:"Posted Apr 6: 'the dye ban explained'",                    action:"Sample + tag in dye-ban content"}
    ]
  },
  {
    type:"Wellness / Nutrition Creators",
    description:"Nutritionists publicly distancing from oat milk over 'liquid glucose' and seed-oil concerns. Newsweek-cited cohort. Already telling followers what NOT to drink.",
    count:"8 HIGH-FIT CREATORS",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    creators:[
      {handle:"@drwellnessrn",     followers:"87.4K", platform:"TikTok", fit:5, last:"\"why I quit oat milk\" video · 540K views",              action:"Ship Original + Detox Project cert sheet"},
      {handle:"@theblueprintnutrition", followers:"34.1K", platform:"IG", fit:5, last:"Posted Apr 7: 'the oat milk sugar truth'",                action:"Send Barista + glyphosate cert · pitch as 'the one'"},
      {handle:"@seedoilrunner",    followers:"22.6K", platform:"IG",     fit:4, last:"RFK / seed oil discourse content cluster",                action:"Sample + 'already RFK'd' angle"}
    ]
  },
  {
    type:"Existing Willa's Superfans",
    description:"Reviewers + repeat posters who've mentioned Willa's organically 2+ times. High engagement, authentic advocacy. Unpaid ambassadors already doing the work.",
    count:"5 NAMED SUPERFANS",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    creators:[
      {handle:"@rachelinthekitchen", followers:"61.8K", platform:"IG",   fit:5, last:"3 unprompted Willa's mentions in past month",            action:"Repost · DM thank-you · gifting program"},
      {handle:"@mornings.with.mae",  followers:"14.2K", platform:"IG",   fit:5, last:"Tagged Willa's Barista in matcha post · Apr 4",          action:"Repost + send full product lineup"},
      {handle:"thekitchn",           followers:"3.1M",  platform:"Web",  fit:5, last:"Wrote a Willa's review piece · Apr 2",                   action:"Engage · share · long-term media partner"}
    ]
  },
  {
    type:"Home Barista / Café Community",
    description:"Latte-art + 'home café' creators posting matcha + spring drink content. Strawberry matcha is the breakout format and oat milk is the default pairing.",
    count:"6 CAFÉ ACCOUNTS",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    creators:[
      {handle:"@homecafediaries",  followers:"48.9K", platform:"IG",     fit:5, last:"Strawberry matcha tutorial · 220K views",                action:"Send Barista + strawberry matcha kit"},
      {handle:"@latteart.daily",   followers:"31.5K", platform:"TikTok", fit:4, last:"Oat milk frothing comparison content",                  action:"Send Barista samples + frothing test prompt"},
      {handle:"@morningmatchabar", followers:"17.8K", platform:"IG",     fit:4, last:"Spring drink series · matcha-forward",                  action:"Sample + spring recipe collab"}
    ]
  }
];

// ─── Outreach pipeline ────────────────────────────────────
const OUTREACH_PIPELINE = [
  {stage:"Surfaced",   count:31, color:"#94A3B8", desc:"Identified by Ambassador Finder this week"},
  {stage:"Researched", count:18, color:"#64748B", desc:"Audience + voice fit verified by Cultural Editor"},
  {stage:"Sent",       count:11, color:"#73B2C9", desc:"Sample + personal note shipped"},
  {stage:"Posted",     count:6,  color:"#9E652E", desc:"Creator made content unprompted"},
  {stage:"Converted",  count:3,  color:"#75C596", desc:"Ongoing partner · gifting program"}
];

const BRIEFS = [
  {
    id:"MAY25-IG-R1",
    platform:"IG Reel", pillar:"PARENTING", pillarColor:"#9E652E", flavor:"Kids",
    timing:"Tue May 26 · 12pm", priority:"BIG SWING", rideNow:true,
    concept:"\"scanned 12 kids drinks at sprouts. one of them was green.\" — at-shelf mom-creator scan-with-me confession",
    intel:[
      {type:"PULSE",text:"Yuka app went mainstream-viral MAY 2026 (CP-7) — WCCB MAY 11 + WaPo + WWD + CBS Miami coverage. App is #1 in US Health & Fitness. Cultural moment is the BEHAVIOR: parents now filming themselves doing 'scan with me' grocery-aisle videos in the kids-drinks section. Yuka-in-the-cart is normal mom behavior."},
      {type:"AUDIENCE",text:"Pattern 03 Relatable Confession + Pattern 09 Aesthetic IRL Encounter — root in the lived mom-creator behavior (scan-with-me content), not the brand claim. Partake Foods muse (parent-first warmth) + Ghia (aesthetic IRL). The 100/100 score is the PUNCHLINE at the end of the video, NOT the lead. Real-aisle, real-phone, real-find."},
      {type:"COMPETITOR",text:"Internal only — Orgain Kids 9g cane sugar, Ripple Kids 5g cane sugar + not organic, Oatly Kids 7g oat syrup + 2g fiber, Kate Farms Kids 9g rice syrup/agave. None hit Yuka green. Willa's Kids 6g sugar + 3g fiber + DHA from algae oil + top-9 allergen-free is the structurally clean 100/100 in the category."}
    ],
    hooks:[
      {text:"scanned 12 kids drinks at sprouts. one of them was green.",recommended:true},
      {text:"the carton at the end of the scan-with-me video. (the one your phone said yes to.)",recommended:false},
      {text:"i'm the mom in the aisle with the phone out. you know the one.",recommended:false}
    ],
    caption:"scanned 12 kids drinks at sprouts. one of them was green. 💛\n\n(you know the kind of video this is. the phone in the cart, the yuka app open, the slow walk down the kids-aisle, the carton-by-carton verdict.)\n\nmost of what i scanned came back orange or red. high sugar. synthetic dyes. seed oils. carrageenan in the toddler ones. one carton came back 100/100 green.\n\nWilla's Kids:\n→ 100/100 yuka score (the only kids drink in the aisle that hit it)\n→ 8g protein, 3g fiber, DHA omega-3 from algae oil\n→ top-9 allergen-free (no nut, soy, gluten, dairy, sesame)\n→ 50% less sugar than dairy\n→ no synthetic dyes, no rapeseed, no gums\n\nshhh… that's the one in the cart. 🌾",
    hashtags:["#willaskids","#scanwithme","#yuka","#momtok","#kidsdrink","#cleanlabel","#allergenfree","#dhakids","#bobbyapproved","#grocerytok"],
    visual:"Vertical phone-screen POV (9:16) at the Sprouts kids-drinks aisle. Phone scans carton after carton — each scan reveals an orange or red Yuka score (real mom-creator video feel, not branded). Quick cuts through 3-4 disappointing scans. Then the phone scans Willa's Kids carton — green 100/100 reveal. Carton goes into the cart. Cut to home kitchen: kid's hand pours from the Willa's Kids carton into a glass. Real-aisle, real-cart, real-kitchen. NO on-camera face.",
    script:[
      {scene:"HOOK",time:"0-3s",action:"At-shelf POV. Phone scans first kids-drink carton — Yuka reveals red/orange score. Text overlay: 'scanned 12 kids drinks at sprouts.'"},
      {scene:"BUILD",time:"3-9s",action:"Quick cuts through 3-4 more cartons being scanned, each revealing red/orange (no brand names visible — angle so labels are blurred). Text: 'high sugar. dyes. seed oils. carrageenan.'"},
      {scene:"REVEAL",time:"9-12s",action:"Phone scans Willa's Kids carton. Yuka reveals green 100/100. Carton goes into the cart. Text: 'one of them was green.'"},
      {scene:"END CARD",time:"12-15s",action:"Home kitchen. Kid's hand pours from the Willa's Kids carton into a glass. Stinger: 'shhh… 100/100. that's the one in the cart. 🌾' (BS-3)"}
    ],
    audio:"Soft mom-creator-voice VO (cofounder-sister or ambient narration — NOT Christina per Christina-is-not-a-mom rule): 'scanned 12 kids drinks at sprouts. one of them was green.' Ambient grocery-aisle sound + light morning kitchen bed at the end.",
    duration:"14-16 seconds",
    cta:{soft:"scan + share 📱",medium:"find Willa's Kids at Sprouts + Whole Foods",strong:"try Willa's Kids — the green one"},
    benefitShorthandId:"BS-3"
  },
  {
    id:"MAY25-TT-1",
    platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", flavor:"Barista",
    timing:"Thu May 28 · 9am", priority:"BIG SWING", rideNow:true,
    concept:"\"tiktok's viral cinnamon roll — but dairy-free. (yes the heavy cream swap still works.)\" — viral-recipe-remix",
    intel:[
      {type:"PULSE",text:"Tortilla cinnamon rolls are THE breakout viral recipe of MAY 2026 (CP-4) — GMA + ABC News + Parade coverage, millions of TikTok views. Recipe uses heavy cream — Willa's plays the dairy-free swap per no-dairy rule (Willa's Barista + coconut cream replaces heavy cream)."},
      {type:"AUDIENCE",text:"Pattern 05 Format-as-Virality + Pattern 04 Taboo-as-Normal (the unexpected ingredient is the dairy-free swap, calmly stated). Poppi muse (viral short-form better-for-you). Lead-with-solution: dairy-free swap in beat 1, viral-recipe format as backdrop. Cloud-pour shot is the share engine."},
      {type:"COMPETITOR",text:"Internal only — Oatly cold foam launched at London Coffee Festival MAY 14-17. Willa's Barista pours like dairy at home, no rapeseed, no gums. The heavy-cream-substitute use case is one where Willa's structurally outperforms competitor barista blends."}
    ],
    hooks:[
      {text:"tiktok's viral cinnamon roll, dairy-free. (yes the heavy cream swap still works.)",recommended:true},
      {text:"the tortilla cinnamon roll, but we swapped the heavy cream.",recommended:false},
      {text:"viral recipe, dairy-free upgrade — 20 min, plant-based, gooey.",recommended:false}
    ],
    caption:"tiktok's viral cinnamon roll — but dairy-free. 🌯\n\n(yes the heavy cream swap still works.)\n\nevery fyp this month: tortilla rolled with butter + cinnamon sugar, baked with heavy cream poured over to get the gooey-roll texture. we swapped the heavy cream for Willa's Barista + a splash of coconut cream.\n\n→ 1 burrito tortilla, room-temp butter, cinnamon sugar inside\n→ roll, slice into 1-inch pieces, place in baking dish\n→ pour ⅓ cup Willa's Barista + 2 tbsp coconut cream over the top\n→ bake 450°F for 8-10 min\n→ powdered sugar icing on top\n\nsame gooey, dairy-free pour. 4-ingredient Willa's Barista does the heavy lifting, no rapeseed, no gums to fight the cinnamon. 🌾\n\nshhh… you'd never know.",
    hashtags:["#tortillacinnamonroll","#viralrecipe","#dairyfree","#willasbarista","#cleanlabel","#plantbased","#oatmilkrecipe","#foodtok","#easydessert","#weekenddinner"],
    visual:"Overhead on wooden counter, morning daylight. Hands roll a burrito tortilla with butter + cinnamon sugar visible. Slice on cutting board, place in oven-safe dish. Willa's Barista carton + small bowl of coconut cream visible in frame. Cloud-pour: Willa's Barista poured over the rolls, swirl visible. Cut to oven door closing, then to the baked golden-brown rolls being lifted onto a plate. Icing drizzle finale. Cinematic depth-of-field on the pour shot. No on-camera face.",
    script:[
      {scene:"HOOK",time:"0-3s",action:"Overhead: hands roll burrito tortilla with butter + cinnamon sugar. Text overlay: 'tiktok's viral cinnamon roll — but dairy-free.'"},
      {scene:"PREP",time:"3-6s",action:"Slice tortilla, place in baking dish, Willa's Barista carton on counter beside. Text: 'we swapped the heavy cream.'"},
      {scene:"POUR",time:"6-9s",action:"Slow Willa's Barista + coconut cream pour over the rolls — cloud-pour visible, swirl. Text: 'Willa's Barista + coconut cream.'"},
      {scene:"BAKE-REVEAL",time:"9-13s",action:"Oven door closes, cut to golden-brown baked rolls being lifted out. Icing drizzle. Text: '8-10 min. 450°F. dairy-free.'"},
      {scene:"END CARD",time:"13-16s",action:"Plate with one cinnamon roll, fork pulls a bite. Stinger: 'same gooey pour. no rapeseed. shhh… you'd never know. 🌾' (BS-2)"}
    ],
    audio:"Soft instrumental bed (lo-fi morning). Pour + sizzle ambient. Optional brand-voice VO: 'tortilla cinnamon rolls — but cleaner.'",
    duration:"14-16 seconds",
    cta:{soft:"save for the long weekend 📌",medium:"full recipe at willaskitchen.com",strong:"find Willa's Barista at Target"},
    benefitShorthandId:"BS-2"
  },
  {
    id:"MAY25-PIN-1",
    platform:"Pinterest", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", flavor:"Original",
    timing:"Thu May 28 · anytime", priority:"BIG SWING",
    concept:"\"sourdough rhubarb snack cake — the heritage tart your grandmother would have made.\" — Pinterest rhubarb heritage pin",
    intel:[
      {type:"PULSE",text:"Rhubarb is having a heritage moment as summer opens (CP-2) — Pinterest weekly trend report flagged rhubarb recipes peaking, sourdough rhubarb snack cake + strawberry rhubarb crisp circulating. Heritage-coded ingredient — grandma food (Willa's grandma was 1921). Prebiotic-fiber-friendly, naturally tart."},
      {type:"AUDIENCE",text:"Pattern 12 Carousel/UGC + Pattern 10 Wordplay (header). Fishwife / Graza / Omsom muse (design-led ingredient personality). Pinterest planning audience is 7-10 days ahead of execution. Recipe pin with type-led layout, screenshot-friendly. Willa's Original in the cream pour."},
      {type:"COMPETITOR",text:"Internal only — heritage-kitchen content is Willa's structural advantage. No venture-backed oat-milk brand has the multi-generation grandmother-cooking story. Willa was a real woman; the brand is named for her."}
    ],
    hooks:[
      {text:"sourdough rhubarb snack cake — the heritage tart your grandmother would have made.",recommended:true},
      {text:"rhubarb season meets sourdough discard. (Willa's Original is the pour underneath.)",recommended:false},
      {text:"the snack cake your grandmother knew before pinterest did.",recommended:false}
    ],
    caption:"sourdough rhubarb snack cake. 🌿\n\nthe heritage tart your grandmother would have made — back when you used what was in season because that's what was there.\n\nthe recipe:\n→ 1½ cups flour, ¼ cup sourdough discard, ¼ cup Willa's Original\n→ ½ cup brown sugar, 1 egg, 1 tsp vanilla\n→ 1 tsp baking powder, pinch of salt\n→ 1½ cups fresh rhubarb, chopped + lightly tossed in 2 tbsp sugar\n→ ¼ cup demerara sugar on top for the crunch\n\nmix wet + dry, fold in rhubarb. pour into a buttered 8x8. bake 350°F for 35-40 min. cool. tea.\n\nWilla's Original in the batter: 4 ingredients, organic, the whole oat groat. (your grandmother had fewer ingredients than that.) 🌾\n\nshhh… save for the long weekend.",
    hashtags:["#rhubarbrecipe","#sourdoughdiscard","#snackcake","#willaskitchen","#heritagebaking","#grandmaskitchen","#willasoriginal","#organicoats","#springbaking","#cleanlabel"],
    visual:"Vertical Pinterest pin (2:3). Overhead wood counter, golden afternoon daylight. Sourdough rhubarb snack cake sliced into squares on a vintage plate. Willa's Original carton in corner (partly cropped). Sprigs of fresh rhubarb + a small bowl of demerara sugar arranged as cameo. Single oat groat + flaky salt sparkle. Serif typography header overlaid: 'sourdough rhubarb snack cake — the heritage your grandmother knew.' No on-camera face. Pinterest-native composition.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save the pin 📌",medium:"full recipe at willaskitchen.com",strong:"Willa's Original — at Target"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"MAY25-IG-R2",
    platform:"IG Reel", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", flavor:"Original",
    timing:"Thu May 28 · 6pm", priority:"HIGH", rideNow:true,
    concept:"\"the carton has read the same way the whole time.\" — calm-authority seed-oil-free founder reveal",
    intel:[
      {type:"PULSE",text:"Seed-oil-free is officially winning at the shelf (CP-9) — STAT News MAY 22 anti-seed-oil fact-check + MAHA reformulation wave (PepsiCo phasing canola/soybean from Lay's, Kraft Heinz + General Mills + Nestlé following). Willa's Original is already seed-oil-free. Engine context only: Jesse & Ben's $10M Series A from Greycroft MAY 7 — investor framing, NOT for consumer copy."},
      {type:"AUDIENCE",text:"Pattern 04 Taboo-as-Normal (calm authority on a noisy topic) + Pattern 06 Founder Humanization. Patagonia muse (activist gravity). Christina on-camera per Christina Rule reserved category (founder-POV activist stance — quiet authority register, NOT trend-chase). Lead-with-solution: 4 ingredients first, discourse context as backdrop."},
      {type:"COMPETITOR",text:"Internal only — Big-CPG is reformulating to where Willa's started. Original was never going to have seed oils. The deck didn't change because nothing needed to. Don't name competitors; the calm-receipts position is the brand voice."}
    ],
    hooks:[
      {text:"the carton has read the same way the whole time.",recommended:true},
      {text:"we never had to add what we never had.",recommended:false},
      {text:"organic. seed-oil-free. four ingredients. (the deck didn't change.)",recommended:false}
    ],
    caption:"the carton has read the same way the whole time. 🛡️\n\nwe built Willa's around what we WANTED to drink — for ourselves, for our families, for kids.\n\nso here's what's in Willa's Original:\n→ organic whole grain oats\n→ filtered water\n→ organic vanilla extract\n→ sea salt\n\nthat's the whole deck. no rapeseed, no canola, no gums, no stabilizers, no syrup. four ingredients you can read.\n\nthe conversation around what's in your milk + your oil + your kids' food is louder than ever this month. that's good. we built clean from day one because that's the brand we wanted to leave behind.\n\nshhh… nothing changed because nothing needed to. 💛",
    hashtags:["#willasoatmilk","#cleanlabel","#seedoilfree","#organic","#fouringredients","#motherfounded","#wholeoat","#wholeplant","#cleaneating","#realfood"],
    visual:"Warm-toned kitchen, soft afternoon daylight. Christina at the counter holding a Willa's Original carton, facing camera. Cuts to close-up of the carton's ingredient panel (4 ingredients visible). Hands turn the carton, slow ingredient reveal. Cut back to Christina — direct-to-camera, quiet authority, no preach. End on the carton sitting on the counter beside a glass of poured Willa's.",
    script:[
      {scene:"HOOK",time:"0-3s",action:"Christina at the counter holding Willa's Original carton. Text overlay: 'the carton has read the same way the whole time.'"},
      {scene:"INGREDIENT REVEAL",time:"3-7s",action:"Close-up of carton ingredient panel (4 ingredients visible). Hand traces each: 'organic oats. filtered water. vanilla. sea salt.'"},
      {scene:"FOUNDER POV",time:"7-12s",action:"Christina to camera: 'we built it around what we wanted to drink. for ourselves, for kids. nothing changed because nothing needed to.'"},
      {scene:"END CARD",time:"12-15s",action:"Carton on counter beside a glass. Stinger: 'four ingredients. organic. seed-oil-free. shhh… 🌾' (BS-3)"}
    ],
    audio:"Founder voiceover (Christina on camera, so audio matches visible talent). Soft instrumental bed underneath. NO music swell — keep it quiet authority.",
    duration:"14-16 seconds",
    cta:{soft:"read the carton 🌾",medium:"find Willa's Original at Target + Sprouts",strong:"shop Willa's — organic + seed-oil-free"},
    benefitShorthandId:"BS-3"
  },
  {
    id:"MAY25-TT-2",
    platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", flavor:"Original",
    timing:"Wed May 27 · 9am", priority:"HIGH", rideNow:true,
    concept:"\"summer's first snack — shave a frozen strawberry. (dairy-free by accident.)\" — viral-recipe-remix shaved fruit",
    intel:[
      {type:"PULSE",text:"Shaved Fruit is the breakout MAY 2026 healthy-snack trend (CP-1) — frozen strawberry shaved on microplane = instant fluffy sorbet, dairy-free by design. Verified breakout per SoYummy + TikTok creator search insights. ASMR-satisfying, 30 seconds, summer-morning-kitchen aesthetic."},
      {type:"AUDIENCE",text:"Pattern 05 Format-as-Virality + Pattern 04 Taboo-as-Normal (dairy-free by design, calmly stated). Fishwife muse (ingredient theater). Willa's connection: drizzle Willa's Original on top for dairy-free cream pour that doesn't melt the snow texture. Pairs naturally without overwhelming."},
      {type:"COMPETITOR",text:"Internal only — strawberry season is peaking. Willa's grandma-kitchen voice owns the heritage-summer-fruit lane. The shaved-fruit format itself is wide open for any plant-milk brand; Willa's wins on the clean-pour-on-top execution."}
    ],
    hooks:[
      {text:"summer's first snack — shave a frozen strawberry.",recommended:true},
      {text:"the shaved-fruit trend is dairy-free by design. (Willa's pours on top.)",recommended:false},
      {text:"frozen berry + microplane = sorbet in 30 seconds. no dairy.",recommended:false}
    ],
    caption:"summer's first snack — shave a frozen strawberry. 🍓\n\n(dairy-free by accident.)\n\nthe shaved-fruit trend is eating tiktok this month and it's the easiest summer flex on the internet:\n\n→ grab a frozen strawberry\n→ shave it on a microplane into a bowl\n→ instant fluffy sorbet, zero added sugar, zero dairy\n\nwe drizzle Willa's Original on top for a cream pour that doesn't melt the snow. 4 ingredients in the pour: organic whole oats, water, vanilla, sea salt. that's the whole deck.\n\nyour microbiome thanks you. your phone takes a satisfying video. 🌾\n\nshhh… the trend that's actually clean.",
    hashtags:["#shavedfruit","#frozenstrawberry","#microplane","#dairyfree","#willasoriginal","#summersnack","#cleaneating","#organicoats","#viralrecipe","#wholeoat"],
    visual:"Overhead on white counter, morning daylight. Hands grab a frozen strawberry, place it on a microplane over a small white bowl. ASMR-satisfying shaving motion produces snow-like sorbet. Pile of fluffy strawberry 'snow' accumulates. Willa's Original carton in frame (partly cropped). Cloud-pour: Willa's Original drizzled lightly on top — sorbet stays intact. End on close-up of the bowl with a spoon.",
    script:[
      {scene:"HOOK",time:"0-3s",action:"Overhead: hand holding frozen strawberry + microplane. Text overlay: 'summer's first snack.'"},
      {scene:"SHAVE",time:"3-7s",action:"ASMR shaving motion — strawberry 'snow' piles up in bowl. Text: 'shave a frozen strawberry.'"},
      {scene:"POUR",time:"7-10s",action:"Willa's Original cloud-pour drizzled on top — sorbet holds shape. Text: 'Willa's Original on top. (dairy-free by accident.)'"},
      {scene:"END CARD",time:"10-13s",action:"Spoon dips through. Stinger: '4 ingredients in the pour. shhh… 🌾' (BS-1)"}
    ],
    audio:"ASMR shaving sound (real microplane scrape). Soft instrumental bed underneath. Optional brand-voice VO: 'summer's first snack.'",
    duration:"12-14 seconds",
    cta:{soft:"save the snack 🍓",medium:"share with your fyp",strong:"find Willa's Original at Target"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"MAY25-TT-3",
    platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", flavor:"Barista",
    timing:"Tue May 26 · 9am", priority:"HIGH",
    concept:"\"will it survive: iced coffee edition. (Willa's Barista pours like it was built for the morning meeting.)\" — before-after-stitch",
    intel:[
      {type:"PULSE",text:"'Will it survive' makeup-endurance format is rising on TikTok MAY 2026 (CP-5) — summer-heat narrative. Adjacent flippable for Willa's Barista: 'will my iced coffee survive the morning meeting' — no curdle, no separation, no bitter aftertaste."},
      {type:"AUDIENCE",text:"Pattern 03 Relatable Confession + Pattern 10 Wordplay. Olipop muse (cheeky relatable wellness). Hands + product, no on-camera face. Before-after-stitch DNA. 8am pour → 11am same glass holds shape is the visual proof."},
      {type:"COMPETITOR",text:"Internal only — most plant milks separate in cold espresso. Willa's Barista has no rapeseed, no gums, no stabilizers. The hold-its-shape demo is structurally Willa's-only in the cleanest-deck Barista category."}
    ],
    hooks:[
      {text:"will it survive: iced coffee edition.",recommended:true},
      {text:"the cold-foam pour at 8am. the same glass at 11. (no curdle, no separation.)",recommended:false},
      {text:"Willa's Barista pours like it was built for the morning meeting.",recommended:false}
    ],
    caption:"will it survive: iced coffee edition. ☕\n\nthe cold-foam pour at 8am. the same glass at 11.\n\nmost plant milks separate. some curdle in cold espresso. some go bitter when they sit. this one doesn't.\n\nWilla's Barista — clean deck, no rapeseed, no gums, organic whole oats. it pours like dairy and holds its texture through the morning meeting.\n\n(the makeup trend gets the views. the carton does the work.) 🌾\n\nshhh… try it cold.",
    hashtags:["#willasbarista","#icedcoffee","#coldfoam","#willitsurvive","#oatmilklatte","#plantbased","#cleanlabel","#norapeseed","#morningmeeting","#coffeetok"],
    visual:"Split-screen / before-after. LEFT: 8am close-up of Willa's Barista poured over cold espresso + ice, cloud-foam forming, condensation on the glass. RIGHT: same glass at 11am — foam still intact, no separation, glass at counter beside a closed laptop. Soft window-light. No on-camera face. Pattern 10 wordplay header: 'will it survive: iced coffee edition.'",
    script:[
      {scene:"HOOK",time:"0-3s",action:"Cold espresso in glass. Willa's Barista pours in — cloud-foam forms. Text overlay: 'will it survive: iced coffee edition.'"},
      {scene:"POUR",time:"3-6s",action:"Foam holds. Close-up of the glass on the counter. Text: '8am: poured.'"},
      {scene:"TIME CUT",time:"6-10s",action:"Same glass at 11am — foam still intact, condensation, beside closed laptop. Text: '11am: still here.'"},
      {scene:"END CARD",time:"10-13s",action:"Spoon dips in, foam still holds shape. Stinger: 'Willa's Barista — clean deck, no rapeseed, no gums. shhh… 🌾' (BS-2)"}
    ],
    audio:"TikTok-trending lo-fi morning bed. Optional ASMR pour + spoon sound. Brand-voice VO: 'will it survive: iced coffee edition.'",
    duration:"12-14 seconds",
    cta:{soft:"tag a coworker ☕",medium:"Willa's Barista — at Sprouts",strong:"shop Willa's Barista"},
    benefitShorthandId:"BS-2"
  },
  {
    id:"MAY25-IG-R3",
    platform:"IG Reel", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", flavor:"Original",
    timing:"Sat May 30 · 11am", priority:"HIGH",
    concept:"\"a long-weekend pour. no plan, no recipe, just hands.\" — Bleachers audio-bed heritage Reel",
    intel:[
      {type:"PULSE",text:"Bleachers self-titled album dropped MAY 22, 2026 (CP-3) — Jack Antonoff Brooklyn-indie warmest mode. NPR + Indy Review covered. Tonal-match for Willa's morning-ritual lane. Audio bed only — don't name the album in copy."},
      {type:"AUDIENCE",text:"Pattern 02 World-Context Tie-In + Pattern 06 Founder Humanization (kitchen, family). Fishwife muse (ingredient theater) + Cup of Jo (mom-creator-adjacent). Letterboxed cinematic feel. No on-camera face — hands + product + kitchen."},
      {type:"COMPETITOR",text:"Internal only — heritage-kitchen aesthetic with intentional indie soundtrack is Willa's tonal pocket. Antonoff's accessible Brooklyn-indie register matches the brand's slow-Saturday-coffee feel without needing name-check."}
    ],
    hooks:[
      {text:"a long-weekend pour. no plan, no recipe, just hands.",recommended:true},
      {text:"the kitchen on a tuesday-that-feels-like-sunday.",recommended:false},
      {text:"the pour you don't need a recipe for. (the carton already knew.)",recommended:false}
    ],
    caption:"a long-weekend pour. 🌾\n\nno plan, no recipe, just hands.\n\n→ Willa's Original over ice + cold espresso\n→ a peach sliced thin on the side\n→ a piece of sourdough toast with butter + flaky salt\n\nthe kind of morning you don't post about because you're inside it.\n\nWilla's Original: organic whole oats, filtered water, vanilla, sea salt. 4 ingredients. (the carton already knew.) 💛\n\nshhh… the slow one.",
    hashtags:["#willasoatmilk","#longweekend","#slowmorning","#morningroutine","#wholeoat","#organic","#cleanlabel","#breakfast","#icedcoffee","#realfood"],
    visual:"Soft late-morning daylight (NOT specifically 'Saturday' — a Tuesday-that-feels-like-Sunday vibe). Hands pour Willa's Original over cold espresso + ice in a clear glass. Cut to a thin-sliced peach on the cutting board. Cut to sourdough toast with butter + flaky salt on a plate. Slow, intentional cuts — no rush. Carton sits on the counter throughout. End on hands wrapping around the iced glass on the counter. NO on-camera face. Letterboxed (cinematic feel).",
    script:[
      {scene:"HOOK",time:"0-3s",action:"Soft morning light on kitchen counter. Willa's Original carton beside the espresso machine. Text overlay: 'a long-weekend pour.'"},
      {scene:"POUR",time:"3-7s",action:"Hands pour Willa's Original over cold espresso + ice in clear glass. Slow, intentional. Text: 'no plan.'"},
      {scene:"BUILD",time:"7-12s",action:"Cut to peach slicing on cutting board, then sourdough toast with butter + flaky salt on plate. Text: 'no recipe. just hands.'"},
      {scene:"END CARD",time:"12-16s",action:"Hands wrap around the iced glass on the counter. Stinger: 'Willa's Original. 4 ingredients. shhh… 🌾' (BS-1)"}
    ],
    audio:"Bleachers MAY 22 self-titled album track as audio bed (suggested: any mid-tempo track, soft-instrumental opening). Don't name the album in copy or hashtags. Pattern 02.",
    duration:"14-16 seconds",
    cta:{soft:"save the morning 💛",medium:"find Willa's Original at Sprouts",strong:"shop Willa's Original"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"MAY25-IG-R4",
    platform:"IG Reel", pillar:"REVIEWS/RECS", pillarColor:"#A191B2", flavor:"Multi",
    timing:"Fri May 29 · 6pm", priority:"HIGH",
    concept:"\"summer dinner with the four people you actually want at the table.\" — Four Seasons S2 tonal-stitch (no show name-check)",
    intel:[
      {type:"PULSE",text:"The Four Seasons S2 premieres Netflix THU MAY 28 (CP-8) — Tina Fey + Steve Carell + Will Forte + Colman Domingo adult-friendship summer comedy. Audience-coded for Willa's parent demo. Friday MAY 29 evening = 24 hours after premiere, perfect social-cycle peak. Don't name the show — tonal stitch only."},
      {type:"AUDIENCE",text:"Pattern 02 World-Context Tie-In. Partake Foods muse (parent-first warmth) + Cup of Jo. Twilight dinner-table staging, plates being cleared, hands on table — laughter implied, no faces. Pour Willa's Original into espresso as the after-dinner moment."},
      {type:"COMPETITOR",text:"Internal only — adult-friendship dinner-party content is white space for plant milks. No competitor brand has linked Willa's-audience-coded streaming TV moments to dinner-table content. Patagonia + Partake gravity."}
    ],
    hooks:[
      {text:"summer dinner with the four people you actually want at the table.",recommended:true},
      {text:"the long-weekend dinner. the after-dinner pour. the friends who showed up.",recommended:false},
      {text:"four seasons, four ingredients, four real friends.",recommended:false}
    ],
    caption:"summer dinner with the four people you actually want at the table. 🌲\n\nthe long-weekend dinner. the after-dinner coffee. the friends who showed up.\n\nafter-dinner pour:\n→ a small cup of espresso, hot\n→ Willa's Original drizzled in for cream\n→ no sugar needed (the oats handle the sweetness)\n\nWilla's Original: organic whole oats, filtered water, vanilla, sea salt. 4 ingredients. the same kind of small set of essentials that makes a dinner table work.\n\nshhh… the four that matter. 🌾",
    hashtags:["#summerdinner","#afterhours","#willasoatmilk","#icedcoffee","#fouringredients","#wholeoat","#organic","#longweekend","#realfood","#willaskitchen"],
    visual:"Twilight dinner table on a back patio or kitchen. Plates being cleared. Espresso machine running on the counter. Hands pour Willa's Original into a small cup of espresso (cream swirl visible). Cut to two pairs of hands on the table — laughter implied, no faces visible. Soft golden-hour light. End on the cup of coffee + the Willa's Original carton beside it. NO on-camera face.",
    script:[
      {scene:"HOOK",time:"0-3s",action:"Twilight on back-patio dinner table. Plates being cleared. Text overlay: 'summer dinner with the four people you actually want at the table.'"},
      {scene:"POUR",time:"3-7s",action:"Espresso machine on the counter. Willa's Original drizzled into the espresso — cream swirl visible. Text: 'the after-dinner pour.'"},
      {scene:"MOMENT",time:"7-11s",action:"Two pairs of hands on the dinner table, laughter implied. Carton + cup beside the plates. Text: '4 ingredients. 4 people. summer dinner.'"},
      {scene:"END CARD",time:"11-15s",action:"Coffee cup on the table beside the carton, golden-hour light. Stinger: 'Willa's Original. 4 ingredients. shhh… 🌾' (BS-3)"}
    ],
    audio:"Warm jazz instrumental bed (mid-tempo, summer-evening tone). Soft ambient dinner sounds (cutlery, faint laughter). No VO.",
    duration:"14-16 seconds",
    cta:{soft:"save for the long weekend 🌲",medium:"shop Willa's Original",strong:"find Willa's at Sprouts + Whole Foods"},
    benefitShorthandId:"BS-3"
  },
  {
    id:"MAY25-TT-4",
    platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", flavor:"Original",
    timing:"Fri May 29 · 7pm", priority:"HIGH",
    concept:"\"what food is supposed to look like.\" — AI Food meme reveal with Willa's real-food payoff",
    intel:[
      {type:"PULSE",text:"'AI Food' exploding-burrito meme is the absurdist visual format eating TikTok MAY 2026 (CP-6) — per Turrboo trend tracker. Green-screen + reaction edit format. Willa's plays the real-food reveal as the punchline answer."},
      {type:"AUDIENCE",text:"Pattern 05 Format-as-Virality + Pattern 04 Taboo-as-Normal (real food as the unexpected answer). Olipop + Omsom muse (cheeky design-wit). Hands + Willa's Original + oat groat as the calm-quiet reveal. Subvert the AI-food gross-out."},
      {type:"COMPETITOR",text:"Internal only — meme-payload DNA is the biggest documented gap from past performance. Willa's needs ≥1 meme-payload per week per CLAUDE.md DNA distribution rule."}
    ],
    hooks:[
      {text:"what food is supposed to look like.",recommended:true},
      {text:"the burrito exploded. the carton stayed clean.",recommended:false},
      {text:"AI food is having a moment. real food is having a millennium.",recommended:false}
    ],
    caption:"what food is supposed to look like. 🌯➡️🌾\n\n(the burrito exploded. the carton stayed clean.)\n\nthe AI food meme is everywhere — burritos exploding, sandwiches floating, salad bowls multiplying. funny. weird. fake.\n\nthen the real thing.\n\nWilla's Original — organic whole oats, filtered water, vanilla, sea salt. that's it. nothing engineered, nothing animated. just 4 ingredients you can grow.\n\nshhh… real food is the punchline. 💛",
    hashtags:["#aifood","#realfood","#willasoatmilk","#fouringredients","#organic","#wholeoat","#cleanlabel","#plantbased","#foodtok","#willaskitchen"],
    visual:"First 4-5 seconds: green-screen AI-Food exploding-burrito meme clip (chaos, animated fillings). Hard cut to clean overhead shot: hands pour Willa's Original into a glass + single whole oat groat lands beside it on the wood counter. Soft morning light. Real-food calm-quiet. NO on-camera face. Pattern 05 ride + Pattern 04 calm reveal.",
    script:[
      {scene:"HOOK",time:"0-3s",action:"AI Food exploding burrito meme green-screen (chaos, animated fillings flying). Text overlay: 'AI food is having a moment.'"},
      {scene:"HARD CUT",time:"3-6s",action:"Clean overhead shot on wood counter — Willa's Original carton, glass, single whole oat groat. Text: 'real food is having a millennium.'"},
      {scene:"POUR",time:"6-10s",action:"Hands pour Willa's Original into the glass. Soft swirl. Text: 'organic whole oats. filtered water. vanilla. sea salt.'"},
      {scene:"END CARD",time:"10-13s",action:"Glass + carton + oat groat on counter. Stinger: 'what food is supposed to look like. shhh… 🌾' (BS-1)"}
    ],
    audio:"AI Food meme native audio (whatever's trending with the format). Transition to soft instrumental bed for the real-food cut. Brand-voice VO: 'real food is the punchline.'",
    duration:"12-14 seconds",
    cta:{soft:"tag a friend who needs real food 🌾",medium:"shop Willa's Original",strong:"find Willa's at Target"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"MAY25-IG-F1",
    platform:"IG Feed", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", flavor:"Original",
    timing:"Tue May 26 · 6pm", priority:"HIGH",
    concept:"\"the state-by-state food chemical map just dropped. willa's is the carton already on the right side.\" — label-literacy framework carousel",
    intel:[
      {type:"TREND",text:"EWG dropped its interactive state-food-chemical regulation map MAY 2026 (T-5) — 50 states tracked across dyes, glyphosate, BVO, propylparaben, titanium dioxide. Parent-network shareable. Willa's is on the right side of every line."},
      {type:"AUDIENCE",text:"Pattern 04 Taboo-as-Normal (calm authority on a noisy topic) + Pattern 12 Carousel. Patagonia muse (activist gravity) + Kiki Milk (us-vs-them posture). 6-card carousel format. Cert stack receipts at the end."},
      {type:"COMPETITOR",text:"Internal only — EWG state map is consumer-facing watchdog content (not trade press). Safe to reference EWG as shareable authority. Willa's cert stack (Detox Project + USDA Organic + WBENC + Yuka 100) is the structural advantage on the right side of every state's line."}
    ],
    hooks:[
      {text:"the state-by-state food chemical map just dropped.",recommended:true},
      {text:"50 states. one carton already on the right side.",recommended:false},
      {text:"the receipts are now a map. willa's is on it.",recommended:false}
    ],
    caption:"the state-by-state food chemical map just dropped. 🗺️\n\n(Willa's is the carton already on the right side.)\n\na new interactive map this month shows which states have banned which food chemicals — dyes, glyphosate, BVO, propylparaben, titanium dioxide. parents are sharing it. school nurses are sharing it.\n\nhere's what's NOT in Willa's:\n→ no synthetic dyes (red 40, yellow 5, etc. — none)\n→ no glyphosate (certified glyphosate-free by The Detox Project, every lot)\n→ no BVO, no propylparaben, no titanium dioxide\n→ no rapeseed, no canola, no gums, no stabilizers, no syrup\n\nwhat IS in Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. that's the whole carton.\n\nshhh… the receipts are now a map. 🌾",
    hashtags:["#willasoatmilk","#cleanlabel","#organic","#glyphosatefree","#detoxproject","#nodyes","#realfood","#wholeoat","#motherfounded","#wbenc"],
    visual:"6-card Instagram Feed carousel. Card 1: BOLD type-led card. 'the state-by-state food chemical map just dropped.' Subline: 'Willa's is the carton already on the right side.' (no image, typography on cream background) | Card 2: Stylized US map (Willa's-branded — NOT EWG's actual map) with states highlighted. Text: '5+ states have banned synthetic dyes. more are coming.' | Card 3: Willa's Original carton centered. Text: 'what's NOT in this carton: 0 synthetic dyes · 0 glyphosate · 0 BVO · 0 rapeseed · 0 gums · 0 syrup.' | Card 4: Close-up of back-of-pack ingredient list. Text: 'organic whole grain oats · filtered water · organic vanilla extract · sea salt.' | Card 5: Cert-stack visual — USDA Organic + Detox Project + Non-GMO + WBENC + Yuka 100/100 Kids + Bobby Approved + Good Food Awards. | Card 6: Stinger card. 'the receipts are now a map. Willa's is on it. shhh… 🌾'",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save the carousel 🗺️",medium:"read the label",strong:"shop Willa's Original"},
    benefitShorthandId:"BS-3"
  },
  {
    id:"MAY25-IG-R5",
    platform:"IG Reel", pillar:"REVIEWS/RECS", pillarColor:"#A191B2", flavor:"Original",
    timing:"Wed May 27 · 12pm", priority:"HIGH",
    concept:"\"four certs that don't fit in a marketing line.\" — Willa's-first cert reveal, founder authority",
    intel:[
      {type:"COMPETITOR",text:"Engine context only — Elmhurst 1925 Clean Protein nationwide at Sprouts MAY 11-21 (C-5). Closest peer goes direct at Willa's positioning at primary retailer. NEVER name in consumer copy. Drives the 'show the cert moat' play this week."},
      {type:"AUDIENCE",text:"Pattern 06 Founder Humanization + Pattern 04 Taboo-as-Normal. Patagonia muse (activist gravity) + Kiki Milk (us-vs-them confidence). Christina on-camera per reserved category. Calm-authority tone, no preach."},
      {type:"PULSE",text:"Reinforces the 'four certs you can't fake' brand frame as competitive moat narrative — paired with Yuka 100/100 (CP-7) and EWG state map (T-5) as proof points landing this same week."}
    ],
    hooks:[
      {text:"four certs that don't fit in a marketing line.",recommended:true},
      {text:"organic + glyphosate-free + WBENC + mother-founded. (the four nobody can fake on a press release.)",recommended:false},
      {text:"the back of the carton has more proof than the front.",recommended:false}
    ],
    caption:"four certs that don't fit in a marketing line. 🛡️\n\n(clean ingredient decks are now the floor. these four are the bar.)\n\nwhat's behind every Willa's carton:\n\n→ USDA Organic (every drop, every batch)\n→ Detox Project Glyphosate-Free (we test every lot)\n→ WBENC mother-founded (the kind of certification you earn before you launch)\n→ Yuka 100/100 Kids (the app the audience already uses)\n\nthe deck is on the carton. the certs are behind it. neither can be faked.\n\nshhh… the back panel does the talking. 💛",
    hashtags:["#willasoatmilk","#cleanlabel","#organic","#glyphosatefree","#wbenc","#motherfounded","#yuka100","#detoxproject","#cleanstack","#motheroftiktok"],
    visual:"Warm-toned kitchen, midday light. Christina at the counter holding Willa's Original carton. Cuts to close-up of each cert badge (USDA Organic + Detox Project + WBENC + Yuka 100 visible on carton or as overlay). Christina to camera, calm-authority tone. End on the carton on the counter beside a glass of poured Willa's.",
    script:[
      {scene:"HOOK",time:"0-3s",action:"Christina at the counter holding Willa's Original carton. Text overlay: 'four certs that don't fit in a marketing line.'"},
      {scene:"CERT REVEAL",time:"3-8s",action:"Close-ups in succession of each cert badge — USDA Organic, Detox Project Glyphosate-Free, WBENC mother-founded, Yuka 100/100 Kids. Text overlay each: 'organic. glyphosate-free. WBENC. yuka 100.'"},
      {scene:"FOUNDER POV",time:"8-12s",action:"Christina to camera: 'clean ingredient decks are the floor now. these four are the bar.'"},
      {scene:"END CARD",time:"12-15s",action:"Carton on counter beside glass. Stinger: 'the back panel does the talking. shhh… 🌾' (BS-3)"}
    ],
    audio:"Founder voiceover (Christina on camera). Soft instrumental bed.",
    duration:"14-16 seconds",
    cta:{soft:"save the certs 🛡️",medium:"read the back of the carton",strong:"shop Willa's Original at Sprouts"},
    benefitShorthandId:"BS-3"
  },
  {
    id:"MAY25-IG-F2",
    platform:"IG Feed", pillar:"PARENTING", pillarColor:"#9E652E", flavor:"Kids",
    timing:"Thu May 28 · 12pm", priority:"HIGH",
    concept:"\"school lunch just got harder for everyone else. (willa's kids was built for the rules already.)\" — back-to-school parent-prep carousel",
    intel:[
      {type:"TREND",text:"Arizona's Healthy School Act kicks in AUG 2026 — UPF-in-schools ban (T-11). Combined with California's similar law (effective 2027), Florida bread testing, and WV HB 2354 (synthetic dyes, Jan 2028), state-by-state pressure on kids' food is structural. Pre-back-to-school content window opens now."},
      {type:"AUDIENCE",text:"Pattern 04 Taboo-as-Normal (calm authority) + Pattern 12 Carousel. Partake Foods muse (parent-first warmth) + Lovebird (activist parent-lane). Real toddler lunchbox staging — passes 'would a parent screenshot this and feel yes that's a lunch' real-life test (POV Discipline #8)."},
      {type:"COMPETITOR",text:"Internal only — no other kids RTD oat milk holds top-9 allergen-free + 8g protein + DHA from algae oil + Yuka 100. Willa's Kids was structurally built for the rules states are now writing."}
    ],
    hooks:[
      {text:"school lunch just got harder for everyone else.",recommended:true},
      {text:"Willa's Kids was built for the school-lunch rules before they wrote them.",recommended:false},
      {text:"yuka 100. 8g protein. no top-9 allergens. that's the lunchbox carton.",recommended:false}
    ],
    caption:"school lunch just got harder for everyone else. 📚\n\n(Willa's Kids was built for the rules before they wrote them.)\n\nstates keep tightening the rules on what kids can eat at school — synthetic dye bans, UPF restrictions, allergen disclosures. the carton your school nurse already wants to see in the lunchbox:\n\n→ 100/100 yuka score (the only kids drink to hit it)\n→ 8g protein, 3g fiber, DHA omega-3 (from algae oil)\n→ top-9 allergen-free (no nut, soy, gluten, dairy, sesame)\n→ 50% less sugar than dairy\n→ bobby approved\n→ no synthetic dyes (none. ever.)\n\nWilla's Kids is the lunchbox drink built before the school-lunch rules caught up.\n\nshhh… we built it because parents asked us to. 💛",
    hashtags:["#willaskids","#schoollunch","#backtoschool","#yuka100","#allergenfree","#cleanlabel","#kidsdrink","#momtok","#healthykids","#nodyes"],
    visual:"6-card Instagram Feed carousel. Card 1: BOLD type-led card on cream. 'school lunch just got harder for everyone else.' Subline: 'Willa's Kids was built for the rules before they wrote them.' | Card 2: Real lunchbox staged with realistic toddler lunch: half a sandwich (turkey + Violife provolone slice OR Good Plants dairy-free cheese), a clementine, baby carrots, a Willa's Kids carton in the side slot. Text: 'what a school-lunch-ready carton looks like.' | Card 3: Willa's Kids carton hero shot. Text: '100/100 yuka score. top-9 allergen-free. 8g protein. DHA. no synthetic dyes.' | Card 4: State-by-state visual showing which states have UPF-in-school restrictions kicking in (AZ, CA, FL referenced). Text: 'states keep tightening the rules. Willa's was already there.' | Card 5: Cert-stack visual specific to Kids — Yuka 100/100, Bobby Approved, Top-9 Allergen-Free, USDA Organic. | Card 6: Stinger card. 'we built it because parents asked us to. shhh… 🌾'",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save for back-to-school prep 📌",medium:"shop Willa's Kids",strong:"find Willa's Kids at Sprouts + Whole Foods"},
    benefitShorthandId:"BS-3"
  },
  {
    id:"MAY25-TT-5",
    platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", flavor:"Chocolate",
    timing:"Wed May 27 · 7pm", priority:"STANDARD",
    concept:"\"the chocolate milk you wish you grew up on. (still 5 ingredients.)\" — chocolate evergreen indulgent-remade-clean",
    intel:[
      {type:"AUDIENCE",text:"EVERGREEN — Willa's Chocolate flavor-hero content. Pattern 10 Wordplay. Fishwife muse (design-wit) + Omsom (ingredient personality). Lead with the official Chocolate tagline (CLAUDE.md voice exemplar). Indulgent-remade-clean lane, Good Food Awards winner."},
      {type:"COMPETITOR",text:"Internal only — Willa's Chocolate is the only oat-milk chocolate that's Good Food Awards Best Beverage winner. 11g sugar vs 24g+ in most kids' chocolate milks. Real cacao, not flavoring. Structural advantage in the indulgent-clean lane."},
      {type:"PULSE",text:"Evergreen brief — no fresh-this-week signal anchor. Pinterest SEO + chocolate-content seasonality covers organic discovery. Pairs naturally with summer dessert content cycle."}
    ],
    hooks:[
      {text:"the chocolate milk you wish you grew up on.",recommended:true},
      {text:"good food awards' best beverage. (the only chocolate milk we needed.)",recommended:false},
      {text:"5 ingredients in the chocolate milk. (one of them is just cacao.)",recommended:false}
    ],
    caption:"the chocolate milk you wish you grew up on. 🍫\n\n(still 5 ingredients. one of them is just cacao.)\n\nWilla's Chocolate is what happens when you make chocolate milk the way it should have been the whole time:\n\n→ filtered water\n→ organic whole grain oats\n→ organic coconut sugar\n→ organic cacao powder (real cacao, not flavoring)\n→ sea salt\n\nthat's the whole carton. 11g sugar (vs the 24g+ in most kids' chocolate milks). 5g protein. 3g fiber. Good Food Awards Best Beverage winner.\n\nshhh… your inner kid just got their carton back. 🌾",
    hashtags:["#willaschocolate","#chocolatemilk","#goodfoodawards","#organic","#realcacao","#cleanlabel","#plantbased","#wholeoat","#realfood","#willaskitchen"],
    visual:"Overhead on wood counter, warm afternoon light. Willa's Chocolate carton centered. Single ingredient visual: a small bowl of cacao powder, a single oat groat, a few flakes of sea salt staged beside the carton. Hands pour Willa's Chocolate into a clear glass — the deep-brown swirl visible. Letterboxed cinematic feel. NO on-camera face.",
    script:[
      {scene:"HOOK",time:"0-3s",action:"Overhead: Willa's Chocolate carton + ingredient cameo (cacao powder bowl, oat groat, sea salt). Text overlay: 'the chocolate milk you wish you grew up on.'"},
      {scene:"INGREDIENT REVEAL",time:"3-7s",action:"Slow pan across each ingredient: 'filtered water. organic oats. organic coconut sugar. organic cacao. sea salt.'"},
      {scene:"POUR",time:"7-10s",action:"Hands pour Willa's Chocolate into clear glass — deep-brown swirl. Text: '5 ingredients. 11g sugar. real cacao.'"},
      {scene:"END CARD",time:"10-13s",action:"Glass + carton + Good Food Awards badge visible. Stinger: 'Good Food Awards best beverage. shhh… 🌾' (BS-4)"}
    ],
    audio:"Soft jazz-funk instrumental (warm + intentional). Brand-voice VO: 'the chocolate milk you wish you grew up on.'",
    duration:"12-14 seconds",
    cta:{soft:"save for the kids 🍫",medium:"shop Willa's Chocolate",strong:"find Willa's Chocolate at Whole Foods"},
    benefitShorthandId:"BS-4"
  },
  {
    id:"MAY25-PIN-2",
    platform:"Pinterest", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", flavor:"Barista",
    timing:"Tue May 26 · anytime", priority:"STANDARD",
    concept:"\"iced latte without the math: just 3 things in the glass.\" — Barista evergreen Pinterest",
    intel:[
      {type:"AUDIENCE",text:"EVERGREEN — iced coffee Pinterest SEO content. Pattern 10 Wordplay (text overlay). Graza muse (design-led). 3-ingredient simplicity is the share-engine. Willa's Barista cloud-pour visual is the hero shot."},
      {type:"COMPETITOR",text:"Internal only — Pinterest SEO compounds organically on iced-coffee content. Willa's Barista clean-deck (no rapeseed, no gums) is the structural advantage. Cold-foam pour shot lives here all summer."},
      {type:"PULSE",text:"Evergreen — no fresh signal anchor. Pinterest 'iced latte' search lane is durable + summer-seasonal."}
    ],
    hooks:[
      {text:"iced latte without the math — 3 things in the glass.",recommended:true},
      {text:"cold espresso. Willa's Barista. one ice cube. (the home-cafe edit.)",recommended:false},
      {text:"the latte your local cafe charges $7 for. (in your kitchen, in 60 seconds.)",recommended:false}
    ],
    caption:"iced latte without the math. ☕\n\n3 things in the glass. 60 seconds.\n\n→ 1 shot espresso (or ½ cup strong cold brew), cold\n→ ½ cup Willa's Barista\n→ 1 large slow-melt ice cube\n\npour over the ice. let the foam settle. drink.\n\nWilla's Barista is built for this — organic whole oats, no rapeseed, no gums. pours like dairy, holds shape through the morning, no curdle, no bitter aftertaste.\n\nshhh… your local cafe charges $7. 🌾",
    hashtags:["#willasbarista","#icedlatte","#homecafe","#icedcoffee","#oatmilkcoffee","#cleanlabel","#plantbased","#wholeoat","#summerdrink","#coffeetok"],
    visual:"Vertical Pinterest pin (2:3). Overhead on white marble counter, soft window light. Tall clear glass with a single large ice cube + cold espresso poured. Willa's Barista pour mid-stream — cloud-foam swirl visible. Carton in corner (partly cropped). Type-led header overlaid: 'iced latte without the math: 3 things in the glass.' Pinterest-native composition.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save the pour 📌",medium:"full recipe at willaskitchen.com",strong:"Willa's Barista — at Whole Foods"},
    benefitShorthandId:"BS-2"
  },
  {
    id:"MAY25-PIN-3",
    platform:"Pinterest", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", flavor:"Original",
    timing:"Fri May 29 · anytime", priority:"STANDARD",
    concept:"\"5-ingredient strawberry oat icebox cake — assemble, freeze, slice.\" — strawberry-season evergreen",
    intel:[
      {type:"AUDIENCE",text:"EVERGREEN — strawberry-season-aligned Pinterest SEO content. Pattern 10 Wordplay (text-led). Fishwife muse (design-led personality). Different from past evergreen no-bake briefs (no-bake brownies were used MAY 18). Strawberry season is peaking, icebox cake format is fresh."},
      {type:"COMPETITOR",text:"Internal only — strawberry season Pinterest SEO is durable summer lane. Willa's Original soaks the cracker layer cleanly (no separation, no gums to disrupt the layering)."},
      {type:"PULSE",text:"Evergreen — pairs with strawberry-season peak (CP-1 Shaved Fruit, CP-2 rhubarb) without anchoring to a specific fresh signal."}
    ],
    hooks:[
      {text:"5-ingredient strawberry oat icebox cake — assemble, freeze, slice.",recommended:true},
      {text:"strawberry season meets oat cream. zero baking required.",recommended:false},
      {text:"the dessert that does itself in the freezer overnight.",recommended:false}
    ],
    caption:"5-ingredient strawberry oat icebox cake. 🍓\n\n(assemble, freeze, slice. that's the whole recipe.)\n\nstrawberry season is peaking. this is the dessert your freezer makes overnight:\n\n→ 1 cup Willa's Original\n→ 1½ cups graham cracker crumbs (or oat-flour crumbs for gluten-free)\n→ ¼ cup maple syrup\n→ 2 cups fresh strawberries, sliced thin\n→ 1 cup whipped coconut cream (chilled)\n\nlayer in a loaf pan: cracker base soaked in Willa's Original + maple, then strawberries, then coconut cream. repeat 3 times. cover. freeze overnight. slice cold.\n\nWilla's Original in the layers: organic whole oats, filtered water, vanilla, sea salt. the icebox cake that tastes like summer and reads like a real-food recipe.\n\nshhh… save for sunday meal-prep. 🌾",
    hashtags:["#willaskitchen","#strawberryseason","#iceboxcake","#willasoriginal","#organicoats","#summerdessert","#cleanlabel","#plantbased","#nobakedessert","#vegandessert"],
    visual:"Vertical Pinterest pin (2:3). Overhead on white marble counter, golden daylight. Strawberry-and-cream-layered icebox cake sliced into 2-inch wedges, layers visible. Fresh strawberries scattered around the plate. Willa's Original carton + small bowl of coconut cream in corner (partly cropped). Serif typography header overlaid: '5-ingredient strawberry oat icebox cake — assemble, freeze, slice.' Pinterest-native composition.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save the recipe 📌",medium:"full recipe at willaskitchen.com",strong:"Willa's Original — at Sprouts"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"MAY25-TT-6",
    platform:"TikTok", pillar:"REVIEWS/RECS", pillarColor:"#A191B2", flavor:"Multi",
    timing:"Sat May 30 · 10am", priority:"STANDARD",
    concept:"\"saw at sprouts: the whole willa's wall.\" — at-shelf-moment evergreen",
    intel:[
      {type:"AUDIENCE",text:"EVERGREEN — Sprouts at-shelf-spotting content (Willa's primary natural-channel retailer). Pattern 09 Aesthetic IRL Encounter. Ghia muse (aesthetic at-shelf). Real-shelf, no studio finish. Cinematic phone-pan across the 4 cartons."},
      {type:"COMPETITOR",text:"Internal only — Sprouts is Willa's primary natural-channel retailer. Sprouts MAY-JUN rollout context (T-10) supports — Wellness Bowls + Sweet Heat line + vegan muffins. Willa's gets the at-shelf moment without name-checking competitors."},
      {type:"PULSE",text:"Evergreen — at-shelf-spotting content compounds organically. Pairs with Sprouts MAY-JUN rollout context as background."}
    ],
    hooks:[
      {text:"saw at sprouts: the whole willa's wall.",recommended:true},
      {text:"the natural-channel aisle where the carton already lives.",recommended:false},
      {text:"4 flavors. one wall. real shelf, no studio.",recommended:false}
    ],
    caption:"saw at sprouts: the whole Willa's wall. 🛒\n\n(4 flavors. one shelf. real wall, no studio.)\n\nif you've been wondering where to find us — Willa's lives at Sprouts (most stores nationwide), Whole Foods, and Target.\n\nthe 4 cartons on the shelf:\n→ Willa's Original (the 4-ingredient classic)\n→ Willa's Barista (cold-foam pour, no rapeseed)\n→ Willa's Chocolate (Good Food Awards winner, real cacao)\n→ Willa's Kids (100/100 yuka, top-9 allergen-free)\n\nshhh… we'll keep showing up. 💛",
    hashtags:["#willasoatmilk","#sprouts","#atshelf","#foundat","#motherfounded","#organic","#cleanlabel","#realfood","#plantbased","#grocerytok"],
    visual:"Vertical TikTok (9:16). POV at Sprouts shelf — phone-held shot of the natural-milk aisle. Cinematic pan across the Willa's wall: Original, Barista, Chocolate, Kids cartons lined up. Hand reaches in, picks up one carton, turns it to show the back label. Real-shelf, no studio finish. Soft fluorescent grocery-aisle light. NO on-camera face.",
    script:[
      {scene:"HOOK",time:"0-3s",action:"POV at Sprouts shelf — phone pans across the Willa's wall. Text overlay: 'saw at sprouts.'"},
      {scene:"PAN",time:"3-7s",action:"Slow pan across Original, Barista, Chocolate, Kids cartons. Text: 'the whole Willa's wall.'"},
      {scene:"PICKUP",time:"7-10s",action:"Hand reaches in, picks up a carton, turns to show back label. Text: '4 flavors. one shelf.'"},
      {scene:"END CARD",time:"10-13s",action:"Carton in hand + Sprouts shelf behind. Stinger: 'real shelf, no studio. shhh… 💛'"}
    ],
    audio:"Ambient grocery-aisle sound. Soft instrumental bed underneath. No VO.",
    duration:"12-14 seconds",
    cta:{soft:"tag your sprouts 🛒",medium:"find Willa's at sprouts.com",strong:"shop Willa's at Sprouts"},
    benefitShorthandId:"BS-3"
  },
  {
    id:"MAY25-IG-F3",
    platform:"IG Feed", pillar:"REVIEWS/RECS", pillarColor:"#A191B2", flavor:"Original",
    timing:"Sat May 30 · 6pm", priority:"STANDARD",
    concept:"\"before clean label was a category, willa was just cooking.\" — heritage cert-stack carousel evergreen",
    intel:[
      {type:"AUDIENCE",text:"EVERGREEN — Willa's heritage + cert-stack receipts content. Pattern 12 Carousel + Pattern 06 Founder/Team Humanization. Patagonia (gravity) + Partake (warmth) muse. 6-card heritage carousel format. Don't repeat 'willa was a real woman' framing (used MAY 4)."},
      {type:"COMPETITOR",text:"Internal only — heritage-grandmother content is structurally Willa's-only. Willa was born 1921; brand launched 2021. The 'has always been here' framing is uncopyable for venture-backed peers."},
      {type:"PULSE",text:"Evergreen — heritage carousel as durable brand-asset content. Pairs naturally with cert-stack proof points (Yuka, USDA, Detox Project, WBENC)."}
    ],
    hooks:[
      {text:"before clean label was a category, willa was just cooking.",recommended:true},
      {text:"the only celebrity endorsement on this carton is a grandmother.",recommended:false},
      {text:"4 ingredients. 4 certs. 1 century of doing it this way.",recommended:false}
    ],
    caption:"before clean label was a category, willa was just cooking. 🌾\n\nwilla was born 1921. she cooked with real food because that's what she had. she made oatmeal a hundred years before pinterest got around to it.\n\nWilla's launched 2021 — and the rule was simple: build it the way she would have.\n\nwhat's on the carton:\n→ organic whole grain oats\n→ filtered water\n→ organic vanilla extract\n→ sea salt\n\nwhat's behind the carton:\n→ USDA Organic\n→ Detox Project Glyphosate-Free (we test every lot)\n→ WBENC mother-founded\n→ Yuka 100/100 Kids\n\nshhh… 4 ingredients, 4 certs, 100 years of doing it this way. 💛",
    hashtags:["#willasoatmilk","#motherfounded","#wbenc","#grandmotherwilla","#heritage","#organic","#glyphosatefree","#cleanlabel","#realfood","#fouringredients"],
    visual:"6-card Instagram Feed carousel. Card 1: Vintage black-and-white photo of grandmother Willa (1921-era kitchen if available, or stylized period image). Text: 'before clean label was a category, willa was just cooking.' | Card 2: Modern Willa's Original carton on cream background. Text: 'the carton built the way she would have.' | Card 3: Ingredient panel close-up: '4 ingredients. organic whole grain oats. filtered water. organic vanilla extract. sea salt.' | Card 4: USDA Organic + Detox Project Glyphosate-Free badges. Text: 'organic. tested every lot.' | Card 5: WBENC mother-founded badge + Yuka 100/100 Kids badge. Text: 'mother-founded. yuka 100 on kids.' | Card 6: Closing card. '4 ingredients. 4 certs. 100 years of doing it this way. shhh… 🌾'",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save the receipts 🌾",medium:"read the carton",strong:"shop Willa's Original"},
    benefitShorthandId:"BS-3"
  },
  {
    id:"MAY25-TT-7",
    platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", flavor:"Kids",
    timing:"Sun May 31 · 10am", priority:"STANDARD",
    concept:"\"the carton you bought for the kids. (and steal for your iced coffee.)\" — Kids crossover evergreen relatable-confession",
    intel:[
      {type:"AUDIENCE",text:"EVERGREEN — Willa's Kids adult-crossover (per CLAUDE.md: Kids 'oddly blends and creates the best swirls' for adults). Pattern 03 Relatable Confession. Partake Foods muse (parent-first warmth). Cofounder-sister voice (NOT Christina per Voice POV #5 — Christina is not a mom)."},
      {type:"COMPETITOR",text:"Internal only — Kids-as-adult-crossover is structural Willa's edge. The 8g protein + creamier mouthfeel + DHA blend cleanly in cold espresso. Scenarios kids-rejected oat milks can't claim."},
      {type:"PULSE",text:"Evergreen — Kids-crossover relatable-confession is durable content. Don't repeat 'one carton, two generations' framing (used MAY 18 + MAY 4)."}
    ],
    hooks:[
      {text:"the carton you bought for the kids. (and steal for your iced coffee.)",recommended:true},
      {text:"willa's kids blends weirdly well in cold espresso. you didn't hear it from us.",recommended:false},
      {text:"the swirl in your morning coffee is the carton in the fridge door.",recommended:false}
    ],
    caption:"the carton you bought for the kids. (and steal for your iced coffee.) 👀\n\nconfession: Willa's Kids weirdly blends the best in cold espresso. the swirl is genuinely better than Original (which we still love).\n\nit's the 8g of protein. it's the slightly creamier mouthfeel. it's the DHA. but mostly, it's that mom can pour the same carton into the kid's glass + her own iced coffee + nobody's mad.\n\n→ Willa's Kids: 100/100 yuka, 8g protein, top-9 allergen-free, DHA from algae oil, bobby approved\n→ 50% less sugar than dairy\n→ the swirl in your iced coffee is hidden in the fridge door\n\nshhh… your iced coffee is in the door labeled \"kids.\" 💛",
    hashtags:["#willaskids","#momtok","#icedcoffee","#stealfromthekids","#kidsdrink","#100yuka","#toptier","#plantbased","#cleanlabel","#onecartontwo"],
    visual:"Vertical TikTok (9:16). Real kitchen, real Sunday morning. Cofounder-sister (NOT Christina — per Voice POV rule, parenting content attributed to cofounder-sister) at the counter. Pours Willa's Kids into a small glass for her kid (face out of frame). Looks at the carton. Pours the SAME carton into her own iced coffee — cloud-swirl visible. Smirk to camera. Soft confessional energy. Real-kitchen, no studio finish.",
    script:[
      {scene:"HOOK",time:"0-3s",action:"Cofounder-sister at counter, Willa's Kids carton in hand. Text overlay: 'confession.'"},
      {scene:"KIDS POUR",time:"3-6s",action:"Pour Willa's Kids into a small glass for a kid (face out of frame). Text: 'the carton i bought for the kids.'"},
      {scene:"STEAL",time:"6-10s",action:"Same carton, pour into her own iced coffee — cloud-swirl visible. Smirk. Text: '(and steal for my iced coffee.)'"},
      {scene:"END CARD",time:"10-13s",action:"Two glasses side by side — kid's milk + mom's iced latte, same carton between. Stinger: 'your iced coffee is in the door labeled kids. shhh… 🌾' (BS-3)"}
    ],
    audio:"Soft confessional VO from cofounder-sister: 'the carton i bought for the kids. and steal for my iced coffee.' Pattern 03 relatable confession.",
    duration:"12-14 seconds",
    cta:{soft:"tag a mom 👀",medium:"shop Willa's Kids",strong:"find Willa's Kids at Sprouts + Whole Foods"},
    benefitShorthandId:"BS-3"
  }
];


// ─── Stable IDs for threading ─────────────────────────────
TRENDS.forEach((t,i)=> t.id = "T-"+(i+1));
COMPETITORS.forEach((c,i)=> c.id = "C-"+(i+1));
AMBASSADORS.forEach((a,i)=> a.id = "A-"+(i+1));

// ─── Agent registry ───────────────────────────────────────
const AGENTS = [
  {id:"trend",name:"Trend Scanner",role:"Surfaces cultural conversations from TikTok, IG, Reddit, news + trade press · ~95 sources now keyed to Willa's via the multi-tenant Supabase pipeline",lastRun:"4m ago",signals:483,color:"#73B2C9",lead:"Strategy"},
  {id:"comp",name:"Competitive Radar",role:"Tracks every move from Oatly, Califia, Planet Oat, Chobani, Elmhurst, Mooala",lastRun:"7m ago",signals:79,color:"#DC2626",lead:"Strategy"},
  {id:"pulse",name:"Cultural Pulse Tracker",role:"Listens across cultural sources for the riff-able moments — music drops, TV peaks, meme velocity, archetype waves",lastRun:"4m ago",signals:218,color:"#A191B2",lead:"Strategy"},
  {id:"editor",name:"Cultural Editor",role:"Kills signals that don't connect to a pillar — protects taste. Automated brief-repeat audit (Step 7 #26) now live as guardrail.",lastRun:"3m ago",signals:447,color:"#64748B",lead:"Strategy"},
  {id:"composer",name:"Brief Composer",role:"Turns surfaced intel into shootable briefs with hooks, scripts, and visuals",lastRun:"19m ago",signals:18,color:"#75C596",lead:"Creative"},
  {id:"hook",name:"Hook Writer",role:"Drafts hook variants and writes captions in the brand voice (3 caption variants per brief: direct / warm / punchy)",lastRun:"19m ago",signals:54,color:"#9E652E",lead:"Creative"},
  {id:"visual",name:"Visual Director",role:"Writes shot lists, footage direction, and visual references · 4 categories per brief (shoot/found/memes/archive)",lastRun:"19m ago",signals:72,color:"#0EA5E9",lead:"Creative"},
  {id:"amb",name:"Ambassador Finder",role:"Identifies high-fit creators already aligned with Willa's brand pillars",lastRun:"12m ago",signals:174,color:"#A191B2",lead:"Media"},
  {id:"paid",name:"Paid Media Planner",role:"Allocates paid spend across Meta, TikTok, and Pinterest by amplifying organic winners",lastRun:"15m ago",signals:3,color:"#EC4899",lead:"Media"},
  {id:"perf",name:"Performance Analyzer",role:"Measures every shipped post vs baseline · feeds learnings into next week's briefs",lastRun:"1h ago",signals:18,color:"#14B8A6",lead:"Analytics"}
];


const AGENT_DETAILS = {
  trend: {
    scrapes:["TikTok Discover + trending audio","Reddit public JSON (r/oatmilk, r/nutrition, r/parenting)","Google News + Google Trends","FoodNavigator + Food Dive + BevNET","Substack wellness newsletters","Pinterest trend reports"],
    decides:"Which cultural conversations have enough velocity and pillar alignment to become briefs.",
    handsOff:["Cultural Editor"],
    replaces:"Social strategist · ~$85K / yr"
  },
  comp: {
    scrapes:["Competitor IG + TikTok business profiles","SEC filings (Oatly 10-K, 20-F)","PRNewswire + BusinessWire","Trade press: BevNET, Food Dive, FoodNavigator","Public product pages + ingredient decks"],
    decides:"Competitor direction (up/down/flat), vulnerability windows, and Willa's opportunity per brand.",
    handsOff:["Brief Composer"],
    replaces:"Competitive analyst · ~$95K / yr"
  },
  editor: {
    scrapes:["Every signal surfaced by Trend Scanner","Brand pillar definitions","Willa's do-not-say list"],
    decides:"Kills ~90% of surfaced signals that don't connect to a pillar. Protects brand taste.",
    handsOff:["Trend Scanner (feedback)"],
    replaces:"Senior content strategist · ~$110K / yr"
  },
  composer: {
    scrapes:["Surviving trends from Cultural Editor","Competitor vulnerabilities","Performance data from last week"],
    decides:"Format, platform, pillar, timing, priority — which signal becomes which brief.",
    handsOff:["Hook Writer","Visual Director"],
    replaces:"Content strategist · ~$90K / yr"
  },
  hook: {
    scrapes:["Brand's past captions (voice training)","Recommended concepts from Brief Composer"],
    decides:"2–3 hook variants per brief, ranks the strongest, writes 3 caption variants in the brand voice.",
    handsOff:["Visual Director"],
    replaces:"Copywriter · ~$75K / yr"
  },
  visual: {
    scrapes:["Recommended concepts from Brief Composer","Platform best practices","Trending audio and format conventions"],
    decides:"Shot-by-shot script, visual direction, audio recommendation, duration target.",
    handsOff:["Performance Analyzer (after shipping)"],
    replaces:"Video producer · ~$80K / yr"
  },
  amb: {
    scrapes:["Modash creator database (production)","Reddit posts mentioning Willa's","Public IG post search","Creator bios + audience demographics"],
    decides:"Which creators are high-fit to Willa's pillars, audience alignment score, outreach priority.",
    handsOff:["Brief Composer (UGC briefs)"],
    replaces:"Influencer manager · ~$72K / yr"
  },
  paid: {
    scrapes:["Meta Ads Library","TikTok Ads Manager","SimilarWeb / AdBeat (competitor spend)","Performance Analyzer outputs","Klaviyo audience segments"],
    decides:"Which winning organic posts to amplify with paid spend, audience targeting, bid strategy, and budget split across platforms.",
    handsOff:["Performance Analyzer (paid attribution)"],
    replaces:"Paid media planner · ~$95K / yr"
  },
  perf: {
    scrapes:["Meta Graph API (IG + Threads)","TikTok Business API","Pinterest API","Shopify sales data","Klaviyo audience signals"],
    decides:"Which formats compound, which pillars underperform, what to queue next week, revenue attribution per brief.",
    handsOff:["Trend Scanner (signal weighting)","Brief Composer (format reinforcement)","Paid Media Planner (amplify winners)"],
    replaces:"Marketing analyst · ~$95K / yr"
  }
};

// ─── What the engine decided this week (visible autonomy) ─
const DECISIONS = [
  {icon:"↑",title:"Promoted Yuka Kids 100/100 phone-scan Reel to BIG SWING (Tue May 26 12pm)",reason:"Yuka app went mainstream-viral in MAY 2026 (WCCB MAY 11 + WaPo + WWD + CBS Miami coverage) — 94% of users return 'bad' scored products. Willa's Kids holds 100/100 — the brand-direct receipt moment. Phone-scan POV format is universal-readable. $260 Meta Reels Ad queued for 72-hr saves lift.",agent:"composer"},
  {icon:"↑",title:"Promoted tortilla cinnamon roll dairy-free swap to BIG SWING (Thu May 28 9am)",reason:"Tortilla cinnamon rolls are THE breakout viral recipe of MAY 2026 (GMA + ABC News + Parade) — millions of views. Willa's plays the dairy-free swap per no-dairy rule (Willa's Barista + coconut cream replaces heavy cream). Cloud-pour visual is the share engine. $240 TikTok Spark Ad queued.",agent:"composer"},
  {icon:"↑",title:"Promoted sourdough rhubarb snack cake heritage pin to BIG SWING (Thu May 28 anytime)",reason:"Pinterest rhubarb +51% MAY 22 weekly report — heritage-coded summer ingredient. Willa's grandma-kitchen voice owns the lane. Pinterest planning audience is 7-10 days ahead; extended 10-day test window matches. $180 Pinterest Promoted Pin queued.",agent:"composer"},
  {icon:"⚡",title:"Queued seed-oil-free Christina founder Reel as cultural-conversation response (Thu May 28 6pm)",reason:"STAT News MAY 22 anti-seed-oil fact-check + MAHA reformulation wave (PepsiCo phasing seed oils from Lay's, Kraft Heinz + General Mills following). Willa's Original is already seed-oil-free. Calm-receipts response — the carton has read the same way the whole time. Founder reserved-category appearance.",agent:"composer"},
  {icon:"⚡",title:"Queued cert moat Christina reveal in response to Elmhurst Clean Protein nationwide launch (Wed May 27 12pm)",reason:"Elmhurst Clean Protein went nationwide at Sprouts MAY 11-21 — closest peer goes direct at Willa's positioning at primary retailer. Engine-only context, never named in copy. Drives the 'four certs that don't fit in a marketing line' cert moat Reel. Willa's moat = certs Elmhurst can't claim (organic + Detox Project + WBENC + Yuka 100).",agent:"composer"},
  {icon:"×",title:"Killed all 11 MAY 18 Pulse entries from this week's set (no-repeat rule)",reason:"Past-month no-repeat strict — fibermaxxing oversaturated (used MAY 18 + MAY 11 + APR 27 + APR 20), Kevin Morby past, Memorial Day Weekend behind ship date by MON MAY 25, Mary Neilis used MAY 18, Colbert finale + The Bear S5 used MAY 18, cottage cheese oats used MAY 18 + APR 20, Pinterest fermentation used MAY 18, cloud-textured matcha used MAY 18, grandfluencers used MAY 18. Fresh ground: Shaved Fruit + rhubarb season + Bleachers + Four Seasons S2 + tortilla cinnamon rolls + Will-it-survive + AI Food + Yuka virality + seed-oil-free moment + That Lady Anna (verified evergreen, used as background).",agent:"editor"},
  {icon:"↑",title:"Locked Christina-on-camera count at 2 (Christina Rule cap = 3, well under)",reason:"R2 seed-oil-free moment (founder-POV activist stance — reserved category) + R5 cert moat reveal (founder-POV reserved category). All other 16 briefs use hands+product+kitchen+text overlays OR cofounder-sister voice (TT-7). Within cap.",agent:"editor"},
  {icon:"×",title:"Cut Cassidy Anderson + That Lady Anna + banana bread latte from CULTURAL_PULSE (freshness failures)",reason:"Brutal-honesty pass caught 3 stale signals: Cassidy Anderson video verified from October 2024 (NOT fresh MAY 2026), That Lady Anna viral peak was June 2024-2025 (durable not fresh), banana bread latte originated summer 2025 with Starbucks adopting FEB 3 2026 (peak behind us). Replaced with Shaved Fruit (verified breakout) + reframed others. Quality > quantity per CLAUDE.md.",agent:"editor"},
  {icon:"×",title:"Cut Nutraingredients Roquette prebiotic study from TRENDS (Sylvie POV #9 violation)",reason:"Study + trade press = exact audience-outsider violation Sylvie flagged in MAY 18 audit ('doesn't feel like something Willa's needs to post about / industry news, irrelevant to our customer'). Willa's 2g+ prebiotic fiber claim doesn't need trade-press authorization. CUT entirely.",agent:"editor"},
  {icon:"+",title:"Locked automated brief-repeat audit script as Step 7 audit check #26 (CLAUDE.md)",reason:"Christina caught 'the iced coffee that doesn't fight you back' re-used verbatim from MAY 18 PIN-1 evergreen (plus 4 more phrase repeats). Built scripts/check-brief-repeats.sh — automated phrase-overlap check against past 5 brief-feedback CSVs + live TOP_PERFORMER_DNA exemplars. MUST run before every refresh ship. Codified permanently.",agent:"editor"},
  {icon:"+",title:"Christina pipeline pitch doc drafted (multi-tenant Supabase signal pipeline now live for Willa's)",reason:"Migration 003 + 003b + 003c applied to production Supabase. Willa's pipeline expanded from 0 → ~95 sources, 8 source types. 343+ raw items pulled per ingestion cycle from 18 active feeds. Architecture story doc ready for Christina (~/Desktop/CODING/WILLAS/exports/refresh-may25-2026/05-christina-pipeline-pitch.md).",agent:"editor"}
];


// ─── Integration hub ─────────────────────────────────────
const INTEGRATIONS = [
  {name:"Meta Graph API",status:"connected",use:"IG + Threads post metrics, scheduling"},
  {name:"TikTok Business",status:"connected",use:"Post performance, hashtag velocity"},
  {name:"Pinterest API",status:"connected",use:"Pin impressions, outbound CTR"},
  {name:"Shopify",status:"connected",use:"Revenue attribution, SKU-level lift"},
  {name:"Klaviyo",status:"connected",use:"Email list signal, audience segmentation"},
  {name:"Slack",status:"connected",use:"Brief delivery, team approvals"},
  {name:"Notion",status:"pending",use:"Content calendar, brief archive"},
  {name:"Gmail",status:"pending",use:"Weekly digest, creator outreach"}
];

// ─── Revenue attribution ─────────────────────────────────
const REVENUE_IMPACT = {
  total: 11420,
  lift: 32,
  sessions: 894,
  topRoiFormat: "Cert-stack + dairy-free recipe-remix Reels (fibermaxxing + cottage cheese oats peaked MAY 18)",
  topRoiPerBrief: 1268,
  source: "Shopify + Klaviyo"
};

const AGENT_BY_ID = Object.fromEntries(AGENTS.map(a=>[a.id,a]));

// ─── Brief ↔ source links (the threading) ─────────────────
const BRIEF_LINKS = {
  // BIG SWINGS
  "MAY25-IG-R1": {trends:["T-9"],            pulse:["CP-7"],                 comps:[]},             // Yuka Kids 100/100
  "MAY25-TT-1":  {trends:["T-2"],            pulse:["CP-4"],                 comps:["C-1"]},        // Tortilla cinnamon roll dairy-free swap
  "MAY25-PIN-1": {trends:["T-7"],            pulse:["CP-2"],                 comps:[]},             // Sourdough rhubarb snack cake
  // HIGH PRIORITY
  "MAY25-IG-R2": {trends:["T-4"],            pulse:["CP-9"],                 comps:[]},             // Seed-oil-free Christina moment
  "MAY25-TT-2":  {trends:["T-7"],            pulse:["CP-1"],                 comps:[]},             // Shaved Fruit frozen strawberry sorbet
  "MAY25-TT-3":  {trends:["T-2","T-8"],      pulse:["CP-5"],                 comps:["C-1"]},        // Will it survive Barista flip
  "MAY25-IG-R3": {trends:[],                 pulse:["CP-3"],                 comps:[]},             // Long-weekend pour (Bleachers audio bed)
  "MAY25-IG-R4": {trends:[],                 pulse:["CP-8"],                 comps:[]},             // Four Seasons S2 cultural-stitch
  "MAY25-TT-4":  {trends:[],                 pulse:["CP-6"],                 comps:[]},             // AI Food meme + real-food reveal
  "MAY25-IG-F1": {trends:["T-5","T-12"],     pulse:[],                       comps:[]},             // EWG state map cert-stack carousel
  "MAY25-IG-R5": {trends:["T-1","T-9"],      pulse:[],                       comps:["C-5"]},        // Cert moat Christina reveal (Elmhurst engine context)
  "MAY25-IG-F2": {trends:["T-12","T-5"],     pulse:["CP-7"],                 comps:[]},             // Arizona school act back-to-school carousel
  // STANDARD / EVERGREEN — no signal anchor
  "MAY25-TT-5":  {trends:[],                 pulse:[],                       comps:[]},             // Chocolate evergreen (Good Food Awards heritage)
  "MAY25-PIN-2": {trends:[],                 pulse:[],                       comps:[]},             // Iced latte without the math (evergreen)
  "MAY25-PIN-3": {trends:[],                 pulse:[],                       comps:[]},             // Strawberry oat icebox cake (evergreen)
  "MAY25-TT-6":  {trends:["T-10"],           pulse:[],                       comps:[]},             // Saw at Sprouts wall (at-shelf evergreen, ambient Sprouts context)
  "MAY25-IG-F3": {trends:[],                 pulse:[],                       comps:[]},             // Heritage cert-stack carousel (evergreen)
  "MAY25-TT-7":  {trends:[],                 pulse:[],                       comps:[]}              // Kids crossover (evergreen)
};



// ─── Paid Amplify Plans (Paid Media Planner output) ──────
const AMPLIFY_PLANS = {
  "MAY25-IG-R1": {
    headline:"Scan-with-me mom-creator at-shelf Reel — ride the Yuka mainstream-viral cultural moment",
    totalBudget:260,
    testWindow:"5 days (Tue May 26 → Sat May 30)",
    objective:"Saves + Profile Visits",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"Yuka app went mainstream-viral in MAY 2026 (CP-7, T-9) — WCCB MAY 11 + WaPo + WWD + CBS Miami coverage. The CULTURAL MOMENT is the behavior: parents are now filming themselves doing scan-with-me grocery-aisle videos. Yuka-in-the-cart is normal mom behavior. This brief joins that content lane as the brand-direct find at the end of the video — 100/100 is the punchline, not the lead. Pattern 03 (Relatable Confession) + Pattern 09 (Aesthetic IRL Encounter) = mom-creator-native format.",
    placements:[
      {
        platform:"Meta",
        format:"Reels Ad (IG Reels + FB Reels)",
        budget:260,
        audience:"Interest: Yuka App, Clean Label, Kids Nutrition, Allergen-Free, Mom-Founded, Grocery Shopping, Sprouts, Whole Foods · Age: 28–48 · Behavior: Has scanned Yuka or shopped Whole Foods/Sprouts Kids aisle (30 days)",
        lookalike:"Klaviyo Willa's Kids purchaser lookalike + Bobby Approved engaged audience + scan-with-me mom-creator follower lookalike",
        expectedReach:"75K–135K video views",
        note:"Optimize for Saves. The aisle scan sequence is the share engine — make sure the disappointing scans (red/orange) feel cinematically real, not branded. The green 100/100 reveal at scan-12 lands the payoff. Carton-into-cart shot then home-kitchen pour. If sentiment stays >0.85 through 72hr, extend to $360 for full weekend ride."
      }
    ]
  },
  "MAY25-TT-1": {
    headline:"Tortilla cinnamon roll viral-recipe remix — ride the May 2026 breakout window",
    totalBudget:240,
    testWindow:"5 days (Thu May 28 → Mon Jun 1)",
    objective:"Saves + Profile Visits",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"Tortilla cinnamon rolls are THE breakout viral recipe of MAY 2026 (CP-4) — GMA + ABC News + Parade coverage, millions of TikTok views. Willa's plays the dairy-free swap per no-dairy rule (Willa's Barista + coconut cream replaces heavy cream). Cloud-pour visual is the share engine. Viral-recipe-remix briefs have been highest-reach format in 2026 (MAY 11 TT-5 iced café crème hit 482K views).",
    placements:[
      {
        platform:"TikTok",
        format:"Spark Ad",
        budget:240,
        audience:"Interest: Viral Recipe, Easy Dessert, Dairy-Free, TikTok Food, Cinnamon Rolls, Home Baking · Age: 22–42 · Behavior: Interacted with Recipe Content (30 days)",
        lookalike:"Willa's Barista engaged-non-follower lookalike + Dunkin / Starbucks recipe audience",
        expectedReach:"75K–135K video views",
        note:"Optimize for Saves. The Willa's Barista + coconut cream pour-shot is the share engine — make sure the cloud-pour visual lands. Cross-promote into the morning-routine endurance Reel (TT-3) mid-week."
      }
    ]
  },
  "MAY25-PIN-1": {
    headline:"Sourdough rhubarb snack cake heritage pin — ride the Pinterest rhubarb peak window",
    totalBudget:180,
    testWindow:"10 days (Thu May 28 → Sun Jun 7)",
    objective:"Saves + Profile Visits",
    guardrail:"Auto-pause if CPS (cost-per-save) exceeds $0.50",
    why:"Pinterest rhubarb recipes peaked MAY 22 (T-7, CP-2) — heritage-coded summer ingredient Willa's grandma-kitchen voice owns. Pinterest planning audience is 7-10 days ahead of execution — extended test window captures the full planning runway. Sourdough discard + rhubarb is the format peak. Pattern 02 + 12 + 10 wordplay header.",
    placements:[
      {
        platform:"Pinterest",
        format:"Promoted Pin (Standard)",
        budget:180,
        audience:"Interest: Sourdough Recipes, Rhubarb, Heritage Baking, Mother's Kitchen, Summer Baking · Age: 28–55",
        lookalike:"Custom Audience Lookalike from Willa's recipe-pin engaged audience",
        expectedReach:"50K–90K impressions · target ≥400 saves",
        note:"Optimize for Saves. Pinterest planning runway is long — keep the test window open through the 10-day window. If saves climb past 400 by Day 5, refresh creative with a second rhubarb variant (rhubarb-strawberry crisp pin)."
      }
    ]
  }
};
// No amplify for: MAY25-IG-R2 (seed-oil-free Christina moment — quiet authority, organic-first), MAY25-TT-2 (Shaved Fruit — viral format compounds organically), MAY25-TT-3 (Will-it-survive Barista flip — Pattern 03 plays better organic), MAY25-IG-R3 (long-weekend pour heritage — earned authenticity, Bleachers audio bed), MAY25-IG-R4 (Four Seasons S2 cultural-stitch — tonal-only, no name-check makes paid suspicious), MAY25-TT-4 (AI Food meme reveal — meme-payload plays better organic), MAY25-IG-F1 (EWG state map cert carousel — receipt-led editorial wins as earned media), MAY25-IG-R5 (cert moat Christina reveal — quiet posture, organic-first), MAY25-IG-F2 (Arizona school act carousel — receipt-led editorial), MAY25-TT-5 / PIN-2 / PIN-3 / TT-6 / IG-F3 / TT-7 (all 6 evergreens — Pinterest SEO + at-shelf + heritage carousel all compound organically).// No amplify for: MAY11-TT-2 (Mother's Day retrospective — organic-first), MAY11-TT-3 (meme-payload — test ad only if organic climbs), MAY11-PIN-1 / PIN-2 / PIN-3 (Pinterest SEO compounds organically — autobiography wordplay pin earns its share rate on type alone), MAY11-TT-4 (The Bear-coded — earned authenticity wins without paid), MAY11-TT-5 (iced café crème — recipe SEO compounds), MAY11-IG-R5 (Saturday heritage — earned-authenticity), MAY11-TT-7 (mom-bag relatable confession — Pattern 03 plays better organic; Partake-style content compounds on saves), MAY11-IG-F2 (category data carousel — earned-media), MAY11-IG-R6 (real-food anti-isolate — receipt-led category POV).


// Reverse map: which briefs each trend / pulse hook / competitor drives
const TREND_BRIEFS = {};
const PULSE_BRIEFS = {};
const COMP_BRIEFS = {};
Object.entries(BRIEF_LINKS).forEach(([bId,{trends,pulse,comps}])=>{
  (trends||[]).forEach(t=>{ (TREND_BRIEFS[t] = TREND_BRIEFS[t]||[]).push(bId); });
  (pulse ||[]).forEach(p=>{ (PULSE_BRIEFS[p] = PULSE_BRIEFS[p]||[]).push(bId); });
  (comps ||[]).forEach(c=>{ (COMP_BRIEFS[c] = COMP_BRIEFS[c]||[]).push(bId); });
});

// Quick lookups (PULSE_BY_ID is defined below, after CULTURAL_PULSE — declaration order matters)
const TREND_BY_ID = Object.fromEntries(TRENDS.map(t=>[t.id,t]));
const COMP_BY_ID = Object.fromEntries(COMPETITORS.map(c=>[c.id,c]));
const BRIEF_BY_ID = Object.fromEntries(BRIEFS.map(b=>[b.id,b]));

// ─── Run Log ──────────────────────────────────────────────
const RUN_LOG = [
  {date:"Sun May 24 · 21:14",agent:"perf",    msg:"MAY 18 wrap: avg +6.2× saves vs baseline · top format = founder-POV fibermaxxing TT (9.2× saves, 0.96 sentiment) · cottage cheese oats dairy-free swap hit 7.4× saves (No-Dairy rule validated)"},
  {date:"Sun May 24 · 14:32",agent:"trend",   msg:"Elmhurst Clean Protein went nationwide at Sprouts MAY 11-21 — 27g protein, 4 SKUs, no gums/seed oils · closest peer goes direct at Willa's positioning at primary retailer · BIG SWING IG-R1 + cert moat R5 queued in response"},
  {date:"Sun May 24 · 12:08",agent:"pulse",   msg:"Yuka app went mainstream-viral MAY 2026 (WCCB May 11 + WaPo + WWD + CBS Miami) — 94% of users return 'bad' scored products · Willa's Kids 100/100 = brand-direct receipt · BIG SWING IG-R1 phone-scan reveal queued"},
  {date:"Sun May 24 · 10:45",agent:"trend",   msg:"FoodNavigator MAY 22 expert-panel UPF reframe ('not all UPFs are created equal') — Willa's lives on the right side of the dividing line · UPF carve-out gives calm-authority lane"},
  {date:"Sat May 23 · 18:22",agent:"pulse",   msg:"Tortilla cinnamon rolls are THE breakout viral recipe of MAY 2026 (GMA + ABC News + Parade) — millions of TikTok views · BIG SWING TT-1 queued with Willa's Barista + coconut cream dairy-free swap"},
  {date:"Sat May 23 · 14:50",agent:"pulse",   msg:"Pinterest rhubarb +51% MAY 22 weekly report — sourdough rhubarb snack cake heritage pin (PIN-1 BIG SWING) queued for THU MAY 28 · Willa's grandma-kitchen voice owns the lane"},
  {date:"Sat May 23 · 11:18",agent:"comp",    msg:"Danone closing 25-year-old Silk plant-based facility AUG 4 (114 layoffs) — category splinters into winners + losers · Willa's lives on winning side structurally"},
  {date:"Fri May 22 · 16:40",agent:"trend",   msg:"MAHA reformulation wave (PepsiCo phasing canola/soybean from Lay's, Kraft Heinz + General Mills + Nestlé following) + Jesse & Ben's $10M Series A May 7 — seed-oil-free CPG winning · seed-oil-free Christina Reel R2 queued"},
  {date:"Fri May 22 · 14:08",agent:"pulse",   msg:"Bleachers self-titled MAY 22 (Antonoff Brooklyn-indie) + Four Seasons S2 Netflix MAY 28 (Tina Fey + Steve Carell adult-friendship comedy) — both Willa's tonal pocket · R3 audio bed + R4 cultural stitch queued"},
  {date:"Fri May 22 · 09:30",agent:"editor",  msg:"Killed 4 stale signals: Cassidy Anderson Oct 2024 video (NOT fresh) · That Lady Anna viral June 2024-2025 (durable not fresh) · banana bread latte summer 2025 origin (peak behind us) · Nutraingredients Roquette study (Sylvie POV #9 violation: trade press + study)"},
  {date:"Fri May 22 · 12:14",agent:"editor",  msg:"Caught + rewrote 5 phrase repeats from past 5 weeks (iced coffee that doesn't fight back · willa was a real woman · one carton two generations · saturday-morning carton · cert stack) · automated brief-repeat audit script now live as Step 7 #26"},
  {date:"Sun May 24 · 22:10",agent:"composer",msg:"18 briefs delivered for the week of MAY 25-31 · 3 BIG SWINGs (Yuka Kids reveal · tortilla cinnamon dairy-free · sourdough rhubarb heritage pin) · 9 HIGH priority · 6 evergreens"},
  {date:"Sun May 24 · 23:00",agent:"hook",    msg:"54 caption variants drafted (18 briefs × 3 voice variants: direct/warm/punchy) · brand-voice default · Willa's capitalized in caption bodies · Christina-not-a-mom rule applied (TT-7 Kids crossover uses cofounder-sister voice)"},
  {date:"Sun May 24 · 23:30",agent:"visual",  msg:"72 footage inspo categories complete (18 briefs × 4 categories: shoot/found/memes/archive) · F2 lunchbox specifies Violife or Good Plants dairy-free cheese (No-Dairy rule)"},
  {date:"Sun May 24 · 16:00",agent:"perf",    msg:"Multi-tenant Supabase pipeline activated for Willa's — migrations 003 + 003b + 003c applied · ~95 sources keyed to willas (8 source types) · 343+ raw items pulled in first cycle from 18 active feeds · Christina pipeline pitch doc ready"}
];


// ─── Killed signals (the ones we said no to) ──────────────
const KILLED = [
  {signal:"All 11 MAY 18 Pulse entries from this refresh",                       reason:"Past-month no-repeat strict — fibermaxxing oversaturated (used MAY 18 + MAY 11 + APR 27 + APR 20), Kevin Morby past, Memorial Day Weekend behind ship date by MON MAY 25, Mary Neilis used MAY 18, Colbert finale + The Bear S5 used MAY 18, cottage cheese oats used MAY 18 + APR 20, Pinterest fermentation used MAY 18, cloud-textured matcha used MAY 18, grandfluencers used MAY 18. Fresh ground: Shaved Fruit + rhubarb season + Bleachers + Four Seasons S2 + tortilla cinnamon rolls + Will-it-survive + AI Food + Yuka virality + seed-oil-free moment.",  by:"Cultural Editor"},
  {signal:"Cassidy Anderson (@cassidyandkids) food-family-style hack",           reason:"Brutal-honesty pass MAY 24 verified the viral video is from October 2024 — NOT fresh MAY 2026. Durable creator pattern but not a fresh-week moment. Cut from CULTURAL_PULSE. Ambassador-track candidate for long-term outreach.",  by:"Cultural Editor"},
  {signal:"That Lady Anna (Anna Prezio) grandfluencer wave",                     reason:"Viral peak was @chefreactions meatball moment ~June 2024-2025. Durable creator with hundreds of thousands of followers but not fresh-this-week. Cut from CULTURAL_PULSE per past-month no-repeat rule + freshness criterion.",  by:"Cultural Editor"},
  {signal:"Banana bread latte viral recipe (@lori_ilc 1M+ views)",               reason:"Trend originally started summer 2025; Starbucks Iced Banana Bread Matcha already launched FEB 3, 2026 (mainstream-adoption peak BEHIND us). Per Sugar & Soul + Chowhound coverage. Cut from CULTURAL_PULSE — replaced with Shaved Fruit (verified MAY 2026 breakout, dairy-free by design).",  by:"Cultural Editor"},
  {signal:"Nutraingredients MAY 21 Roquette prebiotic fiber study",              reason:"Pure trade-press study + supplement-ingredient-maker source — exactly the Sylvie POV #9 violation flagged in MAY 18 audit ('doesn't feel like something Willa's needs to post about / industry news, irrelevant to our customer'). Studies don't belong in Willa's consumer voice. Cut from TRENDS entirely.",  by:"Cultural Editor"},
  {signal:"Cannes Film Festival 2026 (Mungiu's Fjord, closed MAY 23)",           reason:"Per CLAUDE.md POV Discipline #10 (Cannes permanent skip list). Audience-outsider test fails — not culturally mainstream enough for Willa's audience without insider-glossing. Skipped despite Palme d'Or moment.",  by:"Cultural Editor"},
  {signal:"NBA Conference Finals MAY 24-31 (Knicks/Cavs + Thunder/Spurs Game 7s)",reason:"Massive cultural moment but NBA isn't Willa's tonal lane. Sports-bro register collides with warm-grandmother-kitchen voice. Would feel forced. Resonance Test failed — skipped.",  by:"Cultural Editor"},
  {signal:"French Open Roland Garros MAY 24 - JUN 7",                            reason:"Paris café-adjacent (Andreeva opens with routine win, Wawrinka finale) but Willa's tonal connection would feel forced. No clean bridge from tennis to oat milk. Skipped as 'too generic to anchor' even with Paris-café aesthetic.",  by:"Cultural Editor"},
  {signal:"BottleRock Napa MAY 22-24 (Foo Fighters + Lorde + LCD Soundsystem)",   reason:"Festival closed by ship date MON MAY 25 — content rippling but no specific Willa's-tonal anchor. Lorde could work but no clean bridge. Skipped for now; ambassador-track watching.",  by:"Cultural Editor"},
  {signal:"Eddie Murphy AFI Life Achievement Award SAT MAY 31 Netflix",          reason:"Generational icon moment but no clean Willa's bridge — celebrity tribute lane doesn't connect to grandma-kitchen voice. Skipped despite tonal-adjacency (heritage / legacy).",  by:"Cultural Editor"},
  {signal:"Sleepy Girl Mocktail (tart cherry juice + magnesium)",                reason:"Wellness-mocktail-as-sleep-aid is restriction-coded — fails POV Discipline #2 diet-culture filter. Willa's is the positive-relationship-with-food brand. Skipped.",  by:"Cultural Editor"},
  {signal:"'Boy Kibble' TikTok meme (ground meat + rice meal)",                  reason:"Men's-meal framing doesn't fit Willa's parent-creator audience. Wrong tonal pocket. Skipped despite cultural-conversation velocity.",  by:"Cultural Editor"},
  {signal:"Devin Townsend 'The Moth' MAY 29 album drop",                         reason:"Heavy/prog rock — wrong Willa's tonal lane. Bleachers MAY 22 (Antonoff Brooklyn-indie) cleared the Resonance Test instead for the music-drop slot.",  by:"Cultural Editor"},
  {signal:"PepsiCo CEO 'Fiber will be the next protein' earnings-call quote",    reason:"Genuine trade-press signal but fiber lane is oversaturated in past month (MAY 18 + MAY 11 + APR 27 + APR 20). Even with new framing, riding fiber a 5th time would feel recycled. Slot reallocated to seed-oil-free cultural moment + dairy-free swap content.",  by:"Cultural Editor"}
];


// ─── Brand voice — caption variants by tone ────
// CAPTION_VARIANTS — renamed from FOUNDER_VOICE 2026-04-21 per Christina's
// ask: captions default to Willa's brand voice, not a founder first-person
// POV that only works for one person. Each brief carries 3 tone variants
// (direct / warm / punchy) — same labels, different voicing. First-person
// "i/my/me" is reserved for briefs where Christina is literally on camera
// (mom-activist + family-moment DNA); even then, captions lean third-person
// so the post could be written by anyone on the team.
const CAPTION_VARIANTS = {
  "MAY25-IG-R1": {
    direct:"scanned 12 kids drinks at sprouts. one of them was green. 💛\n\n(you know the kind of video this is. the phone in the cart, the yuka app open, the slow walk down the kids-aisle, the carton-by-carton verdict.)\n\nmost of what i scanned came back orange or red. high sugar. synthetic dyes. seed oils. carrageenan in the toddler ones. one carton came back 100/100 green.\n\nWilla's Kids:\n→ 100/100 yuka score (the only kids drink in the aisle that hit it)\n→ 8g protein, 3g fiber, DHA omega-3 from algae oil\n→ top-9 allergen-free (no nut, soy, gluten, dairy, sesame)\n→ 50% less sugar than dairy\n→ no synthetic dyes, no rapeseed, no gums\n\nshhh… that's the one in the cart. 🌾",
    warm:"scanned 12 kids drinks at sprouts. one came back green. (Willa's Kids — 100/100.) 💛",
    punchy:"scanned 12 kids drinks. one was green. 💛"
  },
  "MAY25-TT-1": {
    direct:"tiktok's viral cinnamon roll — but dairy-free. 🌯\n\n(yes the heavy cream swap still works.)\n\nevery fyp this month: tortilla rolled with butter + cinnamon sugar, baked with heavy cream poured over to get the gooey-roll texture. we swapped the heavy cream for Willa's Barista + a splash of coconut cream.\n\n→ 1 burrito tortilla, room-temp butter, cinnamon sugar inside\n→ roll, slice into 1-inch pieces, place in baking dish\n→ pour ⅓ cup Willa's Barista + 2 tbsp coconut cream over the top\n→ bake 450°F for 8-10 min\n→ powdered sugar icing on top\n\nsame gooey, dairy-free pour. 4-ingredient Willa's Barista does the heavy lifting, no rapeseed, no gums to fight the cinnamon. 🌾\n\nshhh… you'd never know.",
    warm:"tiktok's viral cinnamon roll, dairy-free. (we swapped the heavy cream for Willa's Barista + coconut cream — same gooey pour.) 🌯",
    punchy:"viral cinnamon roll — but dairy-free + cleaner. 🌯🌾"
  },
  "MAY25-PIN-1": {
    direct:"sourdough rhubarb snack cake. 🌿\n\nthe heritage tart your grandmother would have made — back when you used what was in season because that's what was there.\n\nthe recipe:\n→ 1½ cups flour, ¼ cup sourdough discard, ¼ cup Willa's Original\n→ ½ cup brown sugar, 1 egg, 1 tsp vanilla\n→ 1 tsp baking powder, pinch of salt\n→ 1½ cups fresh rhubarb, chopped + lightly tossed in 2 tbsp sugar\n→ ¼ cup demerara sugar on top for the crunch\n\nmix wet + dry, fold in rhubarb. pour into a buttered 8x8. bake 350°F for 35-40 min. cool. tea.\n\nWilla's Original in the batter: 4 ingredients, organic, the whole oat groat. (your grandmother had fewer ingredients than that.) 🌾\n\nshhh… save for the long weekend.",
    warm:"sourdough rhubarb snack cake — the heritage tart your grandmother knew before pinterest did. (Willa's Original in the pour.) 🌿",
    punchy:"sourdough rhubarb snack cake. (the heritage your grandmother already knew.) 🌿"
  },
  "MAY25-IG-R2": {
    direct:"the carton has read the same way the whole time. 🛡️\n\nwe built Willa's around what we WANTED to drink — for ourselves, for our families, for kids.\n\nso here's what's in Willa's Original:\n→ organic whole grain oats\n→ filtered water\n→ organic vanilla extract\n→ sea salt\n\nthat's the whole deck. no rapeseed, no canola, no gums, no stabilizers, no syrup. four ingredients you can read.\n\nthe conversation around what's in your milk + your oil + your kids' food is louder than ever this month. that's good. we built clean from day one because that's the brand we wanted to leave behind.\n\nshhh… nothing changed because nothing needed to. 💛",
    warm:"the carton has read the same way the whole time. organic whole oats. filtered water. vanilla. sea salt. (we never had to add what we never had.) 💛",
    punchy:"we never had to add what we never had. (the deck didn't change.) 🛡️"
  },
  "MAY25-TT-2": {
    direct:"summer's first snack — shave a frozen strawberry. 🍓\n\n(dairy-free by accident.)\n\nthe shaved-fruit trend is eating tiktok this month and it's the easiest summer flex on the internet:\n\n→ grab a frozen strawberry\n→ shave it on a microplane into a bowl\n→ instant fluffy sorbet, zero added sugar, zero dairy\n\nwe drizzle Willa's Original on top for a cream pour that doesn't melt the snow. 4 ingredients in the pour: organic whole oats, water, vanilla, sea salt. that's the whole deck.\n\nyour microbiome thanks you. your phone takes a satisfying video. 🌾\n\nshhh… the trend that's actually clean.",
    warm:"summer's first snack — shave a frozen strawberry, drizzle Willa's Original on top. dairy-free by accident. 🍓",
    punchy:"shaved-fruit sorbet — dairy-free by design. 🍓🌾"
  },
  "MAY25-TT-3": {
    direct:"will it survive: iced coffee edition. ☕\n\nthe cold-foam pour at 8am. the same glass at 11.\n\nmost plant milks separate. some curdle in cold espresso. some go bitter when they sit. this one doesn't.\n\nWilla's Barista — clean deck, no rapeseed, no gums, organic whole oats. it pours like dairy and holds its texture through the morning meeting.\n\n(the makeup trend gets the views. the carton does the work.) 🌾\n\nshhh… try it cold.",
    warm:"will it survive: iced coffee edition. (cold-foam pour at 8am. same glass at 11. no curdle, no separation.) Willa's Barista. ☕",
    punchy:"will my iced coffee survive the morning meeting? (this one does.) ☕🌾"
  },
  "MAY25-IG-R3": {
    direct:"a long-weekend pour. 🌾\n\nno plan, no recipe, just hands.\n\n→ Willa's Original over ice + cold espresso\n→ a peach sliced thin on the side\n→ a piece of sourdough toast with butter + flaky salt\n\nthe kind of morning you don't post about because you're inside it.\n\nWilla's Original: organic whole oats, filtered water, vanilla, sea salt. 4 ingredients. (the carton already knew.) 💛\n\nshhh… the slow one.",
    warm:"a long-weekend pour. no plan, no recipe, just hands. (Willa's Original. 4 ingredients.) 🌾",
    punchy:"a long-weekend pour. no plan. no recipe. just hands. 🌾"
  },
  "MAY25-IG-R4": {
    direct:"summer dinner with the four people you actually want at the table. 🌲\n\nthe long-weekend dinner. the after-dinner coffee. the friends who showed up.\n\nafter-dinner pour:\n→ a small cup of espresso, hot\n→ Willa's Original drizzled in for cream\n→ no sugar needed (the oats handle the sweetness)\n\nWilla's Original: organic whole oats, filtered water, vanilla, sea salt. 4 ingredients. the same kind of small set of essentials that makes a dinner table work.\n\nshhh… the four that matter. 🌾",
    warm:"summer dinner with the four people you actually want at the table. (after-dinner pour: Willa's Original into the espresso. 4 ingredients.) 🌲",
    punchy:"four seasons. four ingredients. four real friends. 🌲🌾"
  },
  "MAY25-TT-4": {
    direct:"what food is supposed to look like. 🌯➡️🌾\n\n(the burrito exploded. the carton stayed clean.)\n\nthe AI food meme is everywhere — burritos exploding, sandwiches floating, salad bowls multiplying. funny. weird. fake.\n\nthen the real thing.\n\nWilla's Original — organic whole oats, filtered water, vanilla, sea salt. that's it. nothing engineered, nothing animated. just 4 ingredients you can grow.\n\nshhh… real food is the punchline. 💛",
    warm:"the burrito exploded. the carton stayed clean. (real food as the punchline.) 🌾",
    punchy:"AI food is having a moment. real food is having a millennium. 🌾"
  },
  "MAY25-IG-F1": {
    direct:"the state-by-state food chemical map just dropped. 🗺️\n\n(Willa's is the carton already on the right side.)\n\na new interactive map this month shows which states have banned which food chemicals — dyes, glyphosate, BVO, propylparaben, titanium dioxide. parents are sharing it. school nurses are sharing it.\n\nhere's what's NOT in Willa's:\n→ no synthetic dyes (red 40, yellow 5, etc. — none)\n→ no glyphosate (certified glyphosate-free by The Detox Project, every lot)\n→ no BVO, no propylparaben, no titanium dioxide\n→ no rapeseed, no canola, no gums, no stabilizers, no syrup\n\nwhat IS in Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. that's the whole carton.\n\nshhh… the receipts are now a map. 🌾",
    warm:"the state-by-state food chemical map just dropped — Willa's is the carton already on the right side. (no synthetic dyes, no glyphosate, no BVO. 4 ingredients.) 🗺️",
    punchy:"50 states. one carton already on the right side. 🌾🗺️"
  },
  "MAY25-IG-R5": {
    direct:"four certs that don't fit in a marketing line. 🛡️\n\n(clean ingredient decks are now the floor. these four are the bar.)\n\nwhat's behind every Willa's carton:\n\n→ USDA Organic (every drop, every batch)\n→ Detox Project Glyphosate-Free (we test every lot)\n→ WBENC mother-founded (the kind of certification you earn before you launch)\n→ Yuka 100/100 Kids (the app the audience already uses)\n\nthe deck is on the carton. the certs are behind it. neither can be faked.\n\nshhh… the back panel does the talking. 💛",
    warm:"four certs that don't fit in a marketing line — organic + glyphosate-free + WBENC + Yuka 100. (the back panel does the talking.) 🛡️",
    punchy:"four certs that don't fit in a marketing line. 🛡️"
  },
  "MAY25-IG-F2": {
    direct:"school lunch just got harder for everyone else. 📚\n\n(Willa's Kids was built for the rules before they wrote them.)\n\nstates keep tightening the rules on what kids can eat at school — synthetic dye bans, UPF restrictions, allergen disclosures. the carton your school nurse already wants to see in the lunchbox:\n\n→ 100/100 yuka score (the only kids drink to hit it)\n→ 8g protein, 3g fiber, DHA omega-3 (from algae oil)\n→ top-9 allergen-free (no nut, soy, gluten, dairy, sesame)\n→ 50% less sugar than dairy\n→ bobby approved\n→ no synthetic dyes (none. ever.)\n\nWilla's Kids is the lunchbox drink built before the school-lunch rules caught up.\n\nshhh… we built it because parents asked us to. 💛",
    warm:"school lunch just got harder for everyone else. Willa's Kids was built for the rules before they wrote them — 100/100 yuka, top-9 allergen-free, 8g protein, no synthetic dyes. (the carton the school nurse already wants.) 📚",
    punchy:"Willa's Kids: 100/100. school-lunch-ready. 📚"
  },
  "MAY25-TT-5": {
    direct:"the chocolate milk you wish you grew up on. 🍫\n\n(still 5 ingredients. one of them is just cacao.)\n\nWilla's Chocolate is what happens when you make chocolate milk the way it should have been the whole time:\n\n→ filtered water\n→ organic whole grain oats\n→ organic coconut sugar\n→ organic cacao powder (real cacao, not flavoring)\n→ sea salt\n\nthat's the whole carton. 11g sugar (vs the 24g+ in most kids' chocolate milks). 5g protein. 3g fiber. Good Food Awards Best Beverage winner.\n\nshhh… your inner kid just got their carton back. 🌾",
    warm:"the chocolate milk you wish you grew up on. (5 ingredients. real cacao. Good Food Awards winner.) 🍫",
    punchy:"the chocolate milk you wish you grew up on. (5 ingredients.) 🍫"
  },
  "MAY25-PIN-2": {
    direct:"iced latte without the math. ☕\n\n3 things in the glass. 60 seconds.\n\n→ 1 shot espresso (or ½ cup strong cold brew), cold\n→ ½ cup Willa's Barista\n→ 1 large slow-melt ice cube\n\npour over the ice. let the foam settle. drink.\n\nWilla's Barista is built for this — organic whole oats, no rapeseed, no gums. pours like dairy, holds shape through the morning, no curdle, no bitter aftertaste.\n\nshhh… your local cafe charges $7. 🌾",
    warm:"iced latte without the math — 3 things in the glass, Willa's Barista pours like dairy. ☕",
    punchy:"iced latte without the math. 3 things in the glass. ☕🌾"
  },
  "MAY25-PIN-3": {
    direct:"5-ingredient strawberry oat icebox cake. 🍓\n\n(assemble, freeze, slice. that's the whole recipe.)\n\nstrawberry season is peaking. this is the dessert your freezer makes overnight:\n\n→ 1 cup Willa's Original\n→ 1½ cups graham cracker crumbs (or oat-flour crumbs for gluten-free)\n→ ¼ cup maple syrup\n→ 2 cups fresh strawberries, sliced thin\n→ 1 cup whipped coconut cream (chilled)\n\nlayer in a loaf pan: cracker base soaked in Willa's Original + maple, then strawberries, then coconut cream. repeat 3 times. cover. freeze overnight. slice cold.\n\nWilla's Original in the layers: organic whole oats, filtered water, vanilla, sea salt. the icebox cake that tastes like summer and reads like a real-food recipe.\n\nshhh… save for sunday meal-prep. 🌾",
    warm:"5-ingredient strawberry oat icebox cake. (assemble, freeze, slice.) Willa's Original soaks the cracker layer. 🍓",
    punchy:"strawberry oat icebox cake. (5 ingredients. freezer does the work.) 🍓"
  },
  "MAY25-TT-6": {
    direct:"saw at sprouts: the whole Willa's wall. 🛒\n\n(4 flavors. one shelf. real wall, no studio.)\n\nif you've been wondering where to find us — Willa's lives at Sprouts (most stores nationwide), Whole Foods, and Target.\n\nthe 4 cartons on the shelf:\n→ Willa's Original (the 4-ingredient classic)\n→ Willa's Barista (cold-foam pour, no rapeseed)\n→ Willa's Chocolate (Good Food Awards winner, real cacao)\n→ Willa's Kids (100/100 yuka, top-9 allergen-free)\n\nshhh… we'll keep showing up. 💛",
    warm:"saw at sprouts: the whole Willa's wall. (4 flavors. one shelf.) 🛒",
    punchy:"saw at sprouts: the whole Willa's wall. 🛒💛"
  },
  "MAY25-IG-F3": {
    direct:"before clean label was a category, willa was just cooking. 🌾\n\nwilla was born 1921. she cooked with real food because that's what she had. she made oatmeal a hundred years before pinterest got around to it.\n\nWilla's launched 2021 — and the rule was simple: build it the way she would have.\n\nwhat's on the carton:\n→ organic whole grain oats\n→ filtered water\n→ organic vanilla extract\n→ sea salt\n\nwhat's behind the carton:\n→ USDA Organic\n→ Detox Project Glyphosate-Free (we test every lot)\n→ WBENC mother-founded\n→ Yuka 100/100 Kids\n\nshhh… 4 ingredients, 4 certs, 100 years of doing it this way. 💛",
    warm:"before clean label was a category, willa was just cooking. (4 ingredients, 4 certs, 1 century.) 🌾",
    punchy:"before clean label was a category, willa was just cooking. 🌾"
  },
  "MAY25-TT-7": {
    direct:"the carton you bought for the kids. (and steal for your iced coffee.) 👀\n\nconfession: Willa's Kids weirdly blends the best in cold espresso. the swirl is genuinely better than Original (which we still love).\n\nit's the 8g of protein. it's the slightly creamier mouthfeel. it's the DHA. but mostly, it's that mom can pour the same carton into the kid's glass + her own iced coffee + nobody's mad.\n\n→ Willa's Kids: 100/100 yuka, 8g protein, top-9 allergen-free, DHA from algae oil, bobby approved\n→ 50% less sugar than dairy\n→ the swirl in your iced coffee is hidden in the fridge door\n\nshhh… your iced coffee is in the door labeled \"kids.\" 💛",
    warm:"the carton you bought for the kids. (and steal for your iced coffee.) Willa's Kids weirdly blends best in cold espresso. 👀",
    punchy:"the carton you bought for the kids. (and steal for your iced coffee.) 👀"
  }
};

const SCANNED_TOTAL = 312;
const SURFACED_TOTAL = TRENDS.length;
const KILLED_TOTAL = SCANNED_TOTAL - SURFACED_TOTAL;

const INTEL_COLOR = {TREND:"#73B2C9", AUDIENCE:"#A191B2", COMPETITOR:"#DC2626", PULSE:"#9E652E"};

// ─── Competitor Watch · expanded data ─────────────────────
const COMPETITOR_TIMELINE = [
  {date:"May 18", brand:"Califia",   compId:"C-2", action:"Blueberry Matcha Almond Latte launches at Tesco UK (3-month exclusive) — premium 0.4% single-origin Japanese matcha, almond-milk base, first-to-market UK matcha innovation",  note:"Matcha-as-plant-milk-co-star moment is competitor-validated. US extension watch (Califia's UK SKUs reach US within 6-12 months). Willa's matcha quiet-confidence response TT-2 queued TUE MAY 19 9am — RIDE NOW"},
  {date:"May 10", brand:"Chobani",   compId:"C-4", action:"Now owns La Colombe outright — full $900M consolidation closed (Sprudge confirmation)",  note:"RTD-coffee category consolidates into one mega-platform. Willa's structural counter: 'real-food protein in the carton' lane stays distinct"},
  {date:"May 7",  brand:"Category",  compId:"C-1", action:"FoodNavigator-USA continues landing — 'plant-based dairy outperforming plant-based meat'",  note:"Category framing piece still working through trade press. Willa's quiet-confidence Reel pattern from MAY 11 wk validated (6.5× saves)"},
  {date:"Apr 30", brand:"Oatly",     compId:"C-1", action:"Q1 2026 earnings — US oat-milk category share crossed 30% for the first time. Revenue +15.6%, gross margin 33.4%, adjusted EBITDA positive at SEK 5M",  note:"The 30% category-share number is the durable signal — alt-milk shelf has a leader. Willa's lane: cleanest answer inside the leading lane"}
];


const COMPETITOR_CALENDAR = [
  {date:"MAY 18",     brand:"Califia",  event:"Blueberry Matcha Almond Latte UK launch (Tesco, 3-mo exclusive)",            impact:"Matcha-as-plant-milk-co-star is now category-validated. Willa's matcha quiet-confidence Barista Reel (no-name response) TUE MAY 19 9am",  confirmed:true},
  {date:"MAY 20",     brand:"Category", event:"World Bee Day (UN observance) · sustainability + pollinator focus",          impact:"Climate-positive-oats lane opens · Willa's heritage Reel FRI MAY 22 stitches the carbon-sequestration angle",  confirmed:true},
  {date:"MAY 23",     brand:"Category", event:"Cannes Palme d'Or Closing Ceremony · Barbra Streisand honored in absentia",  impact:"Festival closes — 11-day Croisette food-stitch lane sunsets. Willa's heritage Reel TUE MAY 19 captures the closing-weekend tail",  confirmed:true},
  {date:"MAY 24-25",  brand:"Category", event:"Memorial Day Weekend · MON MAY 25 federal observance",                       impact:"Summer family-kitchen + cookout cycle opens. 3 briefs anchored: Mon heritage tease + Sat multi-generation pour + Sun MD carousel",  confirmed:true},
  {date:"JUN 25",     brand:"FX/Hulu",  event:"The Bear S5 premieres (8 episodes, final season)",                            impact:"Kitchen-coded prestige TV peaks. Willa's prep-counter pattern compounds through summer",  confirmed:true},
  {date:"EARLY JUNE", brand:"Califia",  event:"Simple & Organic Kids line still expected (delayed from early May)",          impact:"Monitor for Kids line entry · cert-stack counter-brief on standby",  confirmed:false},
  {date:"JUNE",       brand:"Category", event:"National Dairy Month",                                                        impact:"Counter-positioning window for plant-based brands — Willa's lane already proven this quarter",  confirmed:true},
  {date:"JULY (EST)", brand:"Chobani",  event:"New Chobani Oat barista SKUs (post-Norton Shores capacity ramp)",             impact:"RTD-coffee consolidation now closed. Willa's protein-in-the-carton lane stays distinct",  confirmed:false}
];


const SHARE_OF_VOICE = [
  {brand:"Oatly",         pct:41, color:"#0EA5E9"},
  {brand:"Califia Farms", pct:23, color:"#F59E0B"},
  {brand:"Chobani Oat",   pct:17, color:"#A191B2"},
  {brand:"Planet Oat",    pct:10, color:"#64748B"},
  {brand:"Willa's",       pct:7,  color:"#75C596", us:true},
  {brand:"Elmhurst 1925", pct:2,  color:"#94A3B8"}
];


// Per-section editorial ledes for the Competitor Watch tab. Written during the
// weekly refresh. Each is a single advisor sentence that frames the section as
// counsel, not reporting — addresses the "advising, not reporting" rule added
// 2026-04-17.
const COMP_WEEKLY_POV = {
  happened: "Two big competitor moves landed this week: Elmhurst took Clean Protein nationwide at Sprouts (4 SKUs, 27g plant protein, no gums/seed oils — the closest-clean peer going direct at Willa's positioning at our primary retailer), and Oatly took cold foam to Europe at London Coffee Festival (MAY 14-17 → EU rollout MAY 25+). Side context: Danone announced it's closing its 25-year-old Bridgeton plant-based facility (AUG 4) — the category is splintering into winners + losers, and Willa's lives on the winning side structurally.",
  coming:   "Pinterest rhubarb +51% opens the heritage-kitchen window, pistachio iced-coffee surge is the cafe-format breakout, and the EWG state-regulation map released MAY 2026 makes parent-share-time content load up through summer. The Four Seasons S2 premieres Netflix THU MAY 28 (Tina Fey + Steve Carell adult-friendship summer comedy — Willa's-audience-coded). Bleachers self-titled album dropped MAY 22 (Jack Antonoff, Brooklyn-indie morning-ritual audio bed). The Bear S5 finale ramp continues toward JUN 25 (not riding this week — covered MAY 18, deliberate break).",
  plays:    "18-brief slate this week — 3 BIG SWINGs (Yuka 100/100 Kids brand-direct receipt vs. Yuka's mainstream-viral moment; tortilla cinnamon rolls dairy-free swap; rhubarb heritage Pinterest pin). Press the moats Oatly + Califia + Elmhurst + Mooala CAN'T claim (WBENC + Detox Project + Yuka 100/100 Kids + mother-founded). DON'T chase Oatly's flavor pipeline or Elmhurst's protein-RTD lane. 6 evergreen briefs in the back half (Pinterest SEO + at-shelf + cert-stack heritage carousel)."
};


// ─── Performance · Week of MAY 18 – MAY 24 results ──────────────
const LAST_WEEK_RESULTS = [
  {
    id:"MAY18-TT-1", concept:"\"fiber is the new TikTok trend. (oats invented it 10,000 years ago.)\" — fibermaxxing founder-POV authority", platform:"TikTok", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9",
    sourceTrend:"Fibermaxxing wave (VegNews + Mayo Clinic + NPR May 2026)", trendId:null,
    views:512000, saves:33400, shares:15600, comments:2480,
    savesDelta:9.2, sentiment:0.96, hero:true,
    note:"Highest-saves brief of the MAY 18 refresh, beating Louisiana SB 14 BIG SWING from MAY 11. Christina founder-POV tier 2 + lead-with-solution structure compounded — oats as the OG fibermaxxing food landed. Same Christina-tier-2 + cert-stack combo applies to seed-oil-free Reel R2 + cert moat Reel R5 this week."
  },
  {
    id:"MAY18-TT-8", concept:"\"cottage cheese oats wanted a cleaner pour. (we swapped to dairy-free + kept the whole oat in the carton.)\" — viral-recipe-remix dairy-free swap", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596",
    sourceTrend:"Cottage cheese × oats wave (CP-10 MAY 18)", trendId:null,
    views:398000, saves:24600, shares:13200, comments:1980,
    savesDelta:7.4, sentiment:0.94, hero:true,
    note:"The dairy-free swap call-out is what landed — adds value without preaching. Per Christina's MAY 20 flag, the No-Dairy rule is now Willa's recipe-brief signature. This week's tortilla cinnamon roll TT-1 BIG SWING applies the same pattern (Willa's Barista + coconut cream replaces heavy cream)."
  },
  {
    id:"MAY18-IG-R5", concept:"\"saturday-morning carton. holiday-weekend pour.\" — Memorial Day multi-generation pour Reel", platform:"IG Reel", pillar:"PARENTING", pillarColor:"#9E652E",
    sourceTrend:"Memorial Day Weekend opening (CP-3 MAY 18)", trendId:null,
    views:298000, saves:19800, shares:8800, comments:1340,
    savesDelta:6.7, sentiment:0.96, hero:true,
    note:"Cofounder-sister + kid + carton + soft daylight is the durable heritage pattern — no founder on camera. Pattern 02 (World-Context Tie-In) + heritage tier 1 anchored the weekend. This week the heritage anchor moves to the long-weekend pour R3 (Bleachers audio bed) + Four Seasons S2 cultural-stitch R4."
  },
  {
    id:"MAY18-IG-R1", concept:"\"memorial day morning starts in this kitchen.\" — MD weekend family-kitchen anchor", platform:"IG Reel", pillar:"PARENTING", pillarColor:"#9E652E",
    sourceTrend:"Memorial Day Weekend opening (CP-3 MAY 18)", trendId:null,
    views:284000, saves:16200, shares:7400, comments:1080,
    savesDelta:6.0, sentiment:0.95,
    note:"BIG SWING pre-game tease format set up the Sat IG-R5 multi-generation pour successfully. Heritage tier 1 cofounder-sister at the counter — editorial mood, pure brand voice. Memorial Day weekend opening signal anchored 3 briefs this past week per signal-concentration cap."
  },
  {
    id:"MAY18-PIN-2", concept:"\"overnight oats — but make it coconut-kefir-soaked. (the dairy-free fermented breakfast that takes 30 seconds.)\" — Pinterest fermentation wave pin", platform:"Pinterest", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596",
    sourceTrend:"Pinterest Predicts 2026 fermentation breakout", trendId:null,
    views:96400, saves:7200, shares:0, comments:0,
    savesDelta:5.4, sentiment:0.95,
    note:"Pinterest pin compounded for 7+ days (CTR up daily). Dairy-free swap (Cocoyo coconut kefir) per the No-Dairy rule landed cleanly. Pinterest planning audience captured the wave. Pattern 12 + clean editorial format validated."
  },
  {
    id:"MAY18-IG-R3", concept:"\"this is what 'not-UPF' actually looks like on a panel.\" — UPF expert-panel quiet-authority Reel", platform:"IG Reel", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9",
    sourceTrend:"Healthy Eating Research UPF expert-panel report MAY 2026", trendId:null,
    views:312000, saves:19600, shares:10200, comments:1640,
    savesDelta:6.2, sentiment:0.97,
    note:"Pattern 04 calm-authority Reel — Willa's Original 4-ingredient deck = the literal inverse of UPF. Lead-with-solution structure delivered. This week's UPF reframe (FoodNavigator MAY 22) carries the same authority frame — engine-only context, never named in copy."
  },
  {
    id:"MAY18-TT-4", concept:"\"beans are having a moment. oats keep having a millennium.\" — beans-as-protein Pattern 05 Reel", platform:"TikTok", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9",
    sourceTrend:"Bloomberg + TikTok beans wave (CP-7 MAY 18)", trendId:null,
    views:418000, saves:12800, shares:14600, comments:2240,
    savesDelta:4.2, sentiment:0.91,
    note:"Pattern 05 format-payload — reach amplifier (418K views, lower save-rate). Pure brand voice, no founder. The bean-creator backdrop was the recognition vehicle; the 'oats already filled the protein gap' was the receipt. Validated against the Met Gala / Cannes cultural-stitch pattern."
  },
  {
    id:"MAY18-IG-F2", concept:"\"the cert wall — 8 receipts that read better than the press release.\" — cert-stack walkthrough carousel", platform:"IG Feed", pillar:"REVIEWS/RECS", pillarColor:"#A191B2",
    sourceTrend:"Cert-stack evergreen + Yuka 100/100 Kids momentum", trendId:null,
    views:268000, saves:17400, shares:8200, comments:1180,
    savesDelta:5.8, sentiment:0.98,
    note:"Highest sentiment of the week (0.98) — receipt-led carousel format performed strongest in carousel slot. Pattern 12 (Carousel) + Pattern 06 founder humanization combo. This week's EWG state-map cert carousel F1 + Heritage cert-stack F3 carry the same format."
  }
];

const PERF_KPIS = {
  shipped: 18,
  totalReach: 3186400,
  avgSavesDelta: 5.8,
  topFormat: "Authority + heritage + long-running-brand parallel Reels"
};

const PERF_INSIGHTS = [
  {
    title:"Fibermaxxing founder-POV BIG SWING confirmed Christina tier-2 authority as the highest-defensibility combo (MAY 18 TT-1 hit 9.2× saves)",
    detail:"The 'fiber is the new TikTok trend. (oats invented it 10,000 years ago.)' Christina founder-POV hit 9.2× saves and 0.96 sentiment — highest-saves brief of the MAY 18 refresh, beating Louisiana SB 14 from MAY 11. The learning: founder-POV + lead-with-solution + structural Willa's truth (oats as the OG fibermaxxing food) compounds. This week's seed-oil-free Christina Reel (R2) applies the same combo — calm-authority Christina + 4-ingredient deck in beat 1 + MAHA-wave context as backdrop. NOTE: fibermaxxing lane is now oversaturated (MAY 18 + MAY 11 + APR 27 + APR 20) — no fresh briefs on fiber this week per past-month no-repeat rule.",
    agent:"composer"
  },
  {
    title:"Cottage cheese oats dairy-free swap (MAY 18 TT-8) hit 7.4× saves — the dairy-free swap rule is the new highest-engagement frame",
    detail:"The 'cottage cheese oats wanted a cleaner pour (we swapped to dairy-free + kept the whole oat in the carton)' Reel hit 7.4× saves and 0.94 sentiment. The dairy-free swap call-out is what landed — adds value without preaching. This week's tortilla cinnamon roll dairy-free swap (TT-1 BIG SWING) applies the same pattern: Willa's Barista + coconut cream replaces heavy cream. The no-dairy rule (added 2026-05-20 per Christina's flag) is now Willa's recipe-brief signature.",
    agent:"editor"
  },
  {
    title:"Memorial Day Weekend heritage anchor performed strongest in the multi-generation Saturday pour slot (MAY 18 IG-R5 hit 6.7× saves, 0.96 sentiment)",
    detail:"The 'saturday-morning carton. holiday-weekend pour.' Reel hit 6.7× saves WITHOUT founder on camera — cofounder-sister + kid + carton + soft daylight is the durable heritage pattern. Pattern 02 (World-Context Tie-In) + heritage tier 1 cofounder-sister anchored the weekend. This week MD is in the rear-view, so the heritage anchor moves to the long-weekend pour (R3, Bleachers audio bed) and the Four Seasons S2 cultural-stitch (R4, Friday post-premiere) — same heritage register, different cultural anchors.",
    agent:"composer"
  },
  {
    title:"Multi-tenant Supabase pipeline activated for Willa's — ~95 sources now feeding the engine (up from manual WebSearch only)",
    detail:"Migration 003 + 003b + 003c applied to production Supabase MAY 24. Willa's pipeline went from 0 → 95 sources across 8 source types (reddit + Pinterest + TikTok aggregators + cultural newsletters + 12 fresh feeds). First ingestion cycle pulled 343+ raw items from 18 active feeds. Cherry Bombe, Bandcamp Daily, Snaxshot, Cup of Jo, Today in Tabs all live + returning content. Tonal-scoring still tuning — next-week's refresh should see meaningful willas-scored signal volume. Christina-facing architecture pitch doc ready (exports/refresh-may25-2026/05-christina-pipeline-pitch.md).",
    agent:"perf"
  }
];


// ─── Emoji + confidence system ────────────────────────────
const PLATFORM_EMOJI = {
  "IG Reel":"🎬",
  "TikTok":"🎵",
  "Pinterest":"📌",
  "Threads":"💬",
  "IG Feed":"📰",
  "Community Ops":"📣",
  "IG Story":"📱"
};
const PILLAR_EMOJI = {
  "HEALTH/WELLNESS":"🌿",
  "INGREDIENTS/RECIPES":"🥣",
  "PARENTING":"👶",
  "REVIEWS/RECS":"⭐"
};

// Confidence score 1-5 per pillar, computed from last week's save-delta history
const PILLAR_CONFIDENCE = (()=>{
  const by = {};
  LAST_WEEK_RESULTS.forEach(r=>{
    if(!by[r.pillar]) by[r.pillar] = {sum:0, count:0};
    by[r.pillar].sum += r.savesDelta;
    by[r.pillar].count += 1;
  });
  const out = {};
  Object.entries(by).forEach(([k,v])=>{
    const avg = v.sum/v.count;
    let s = 3;
    if(avg >= 5) s = 5;
    else if(avg >= 3.5) s = 4;
    else if(avg >= 2) s = 3;
    else if(avg >= 1) s = 2;
    else s = 1;
    out[k] = s;
  });
  // defaults for pillars without historical data
  ["HEALTH/WELLNESS","INGREDIENTS/RECIPES","PARENTING","REVIEWS/RECS"].forEach(p=>{ if(!(p in out)) out[p] = 3; });
  return out;
})();
const CONFIDENCE_LABEL = {5:"LIKELY BANGER",4:"STRONG",3:"SOLID",2:"EXPERIMENT",1:"LONG SHOT"};

function ConfidenceDots({score}){
  const dots = [];
  for(let i=1;i<=5;i++){
    dots.push(
      <span key={i} className="inline-block w-[6px] h-[6px] rounded-full mx-[1px]" style={{background:i<=score?"#202A44":"#C8C2B4"}}></span>
    );
  }
  return <span className="inline-flex items-center">{dots}</span>;
}

function fmtNum(n){
  if(n >= 1_000_000) return (n/1_000_000).toFixed(1)+"M";
  if(n >= 1_000) return (n/1_000).toFixed(n>=10_000?0:1)+"K";
  return n.toString();
}

// ──────────────────────────────────────────────────────────
// TOP-PERFORMER DNA LIBRARY
// Codified from Christina's top-performing posts (PDF 2026-04-16).
// Each brief gets tagged to one of these as a lightweight chip.
// ──────────────────────────────────────────────────────────
const TOP_PERFORMER_DNA = [
  {
    id:"mom-activist",
    name:"Mom-Founder Category Critique",
    tagColor:"#73B2C9",
    icon:"🎤",
    description:"Founder or mom direct-to-camera, taking a clear stance on what's broken in the category. Calm activist authority — no hedging, no panic.",
    exemplars:["\"44 ingredients now need warnings. willa's has 4.\" (MAY 11 · 8.6× saves)","\"fiber is the new TikTok trend. (oats invented it 10,000 years ago.)\" (MAY 18 BIG SWING)","\"yes you can have latte art without rapeseed oil\""],
    when:"HEALTH/WELLNESS + REVIEWS/RECS. Pairs with misinformation rebuttals and policy moments. Highest-saving Willa's format.",
    rules:["Real kitchen or retail — not studio","Founder or mom voice","Take a clear stance, no hedging","No named competitors — 'vs. Average [Category]'"]
  },
  {
    id:"on-pack-checklist",
    name:"On-Pack Ingredient Checklist",
    tagColor:"#75C596",
    icon:"✅",
    description:"Carton in frame with a ✅ checklist of what's in (and what's NOT). Visual proof of the WholePlant™ IP — the receipts the team can screenshot.",
    exemplars:["\"the cert wall — 8 receipts that read better than the press release.\" (MAY 18 IG-F2)","\"this is what 'not-UPF' actually looks like on a panel.\" (MAY 18 IG-R3)","\"simple organic ingredients ✅✅✅\""],
    when:"Default for INGREDIENTS/RECIPES + REVIEWS/RECS authority. Strong for launches, cert moments, and category switchers.",
    rules:["Carton always in frame","5–7 checklist items max","What's NOT in it matters as much as what is","End on a single hero claim"]
  },
  {
    id:"kid-family-moment",
    name:"Kid / Family Moment",
    tagColor:"#9E652E",
    icon:"👧",
    description:"A real kid + family moment with Willa's Kids in frame. UGC feel, not staged — the brands kids and parents share a kitchen for.",
    exemplars:["\"kids drink it. parents pour it. (one carton, two coffees, no fight.)\" (MAY 18 IG-R6)","\"the contents of a road-trip cooler — only one of these is something I'm proud of.\" (MAY 18 TT-6 · vol. 2 of the 6.8× saves hit)","\"saturday-morning carton. holiday-weekend pour.\" (MAY 18 IG-R5)"],
    when:"Default for PARENTING. Pattern 03 (Relatable Confession) variant when the cooler / bag / lunchbox tells the story.",
    rules:["Product always in frame","Real family, not models","Real location — kitchen, store, school","Caption supplies the nutrition proof, not the video"]
  },
  {
    id:"viral-recipe-remix",
    name:"Viral Recipe Remix (dairy-free)",
    tagColor:"#A191B2",
    icon:"🔄",
    description:"Take a recipe that's already viral and remix it dairy-free / cleaner with Willa's. Rides someone else's wave — Willa's gets to be the hero ingredient.",
    exemplars:["\"overnight oats — but make it coconut-kefir-soaked.\" (MAY 18 PIN-2 · fermentation wave)","\"no-bake brownie bites — our new fav summer dessert.\" (MAY 18 PIN-3 · indulgent-clean)","\"the iced coffee that doesn't fight you back.\" (MAY 18 PIN-1 evergreen)"],
    when:"1–2 per week. Pulls from Cultural Pulse viral-recipe feed + Pinterest Predicts breakouts.",
    rules:["Name the source trend in caption","Swap cane sugar for honey / maple / date","Indulgent remade as high-protein or high-fiber","Willa's is the hero ingredient — ≥1 cup or equivalent on-camera presence"]
  },
  {
    id:"meme-payload",
    name:"Meme Format + Nutrition Payload",
    tagColor:"#D97706",
    icon:"🎭",
    description:"Ride a trending meme format with a Willa's-coded punchline that lands one proof point. Highest-leverage format — still our biggest whitespace.",
    exemplars:["\"but my name is Original so it's okay.\" (MAY 11 TT-3 · 524K views, the 'Son original' roast)","\"beans are having a moment. oats keep having a millennium.\" (MAY 18 TT-4)","\"reading a plant-milk label out loud as a stress test. (willa's took 4 seconds.)\" (MAY 18 TT-5)"],
    when:"At least 1 per week from Cultural Pulse meme feed. Reach amplifier (high views, profile visits).",
    rules:["Use a current meme format — not an evergreen template","One clear proof-point payload","Short caption","Stay on voice: warm / wink / assertive"]
  },
  {
    id:"at-shelf-moment",
    name:"At-Shelf / Retail Moment",
    tagColor:"#DC2626",
    icon:"🛒",
    description:"Founder or trusted voice catching a moment at retail — a category take, a launch reveal, a quiet 'we made it onto the shelf.'",
    exemplars:["Christina at Target (top-performing non-influencer ad to date)","Kyle at shelf catching a new-door spotting","'just walked past the willa's wall' UGC reposts"],
    when:"New retail doors, or category-critique briefs that need a 'where to find it' payoff.",
    rules:["Real retail environment","Cartons visible on shelf","End with where-to-find","Founder or ambassador voice"]
  },
  {
    id:"before-after-stitch",
    name:"Before / After Stitch (Conversion Arc)",
    tagColor:"#0891B2",
    icon:"↪",
    description:"Stitch or before-and-after — 'I switched from X' / 'giving oat milk another try' / skin-effect reveal. UGC voices doing the conversion arc for us.",
    exemplars:["\"giving oat milk another try (and reading the back panel this time)\"","\"my skin cleared up + I think it's the willa's effect\"","\"the switch from almond — and here's why I'm not going back\""],
    when:"REVIEWS/RECS and HEALTH/WELLNESS. Pairs with UGC comments and before/after data.",
    rules:["Real user or UGC reaction","Concrete result / change","Product in frame","Natural language — not testimonial stiff"]
  }
];
const DNA_BY_ID = Object.fromEntries(TOP_PERFORMER_DNA.map(d=>[d.id, d]));

// ──────────────────────────────────────────────────────────
// CULTURAL PULSE
// New 5th intelligence pillar — memes, celebrity moments,
// viral recipes, misinformation rebuttals. Refreshed weekly.
// ──────────────────────────────────────────────────────────
const CULTURAL_PULSE = [
  {
    id:"CP-1",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"Shaved Fruit is taking over TikTok this month 🍓 — frozen strawberries + microplane = instant fluffy sorbet, dairy-free by design and built for the summer kitchen Willa's was made for",
    detail:"'Shaved Fruit' is the breakout May 2026 healthy-snack trend (per SoYummy + TikTok creator search insights). Format: take a frozen strawberry, shave it on a microplane into a bowl — produces an instantly fluffy, ASMR-satisfying 'sorbet' with zero dairy, zero added sugar, just fruit. Visually mesmerizing, takes 30 seconds, lives in the summer-morning-kitchen aesthetic. Willa's connection: drizzle Willa's Original on top for a dairy-free cream pour that doesn't melt the snow-like texture — pairs naturally without overwhelming. Adjacent to strawberry season peak + Willa's grandma-kitchen voice.",
    velocity:"high",
    platform:"TikTok + IG Reels",
    willasPlay:"TikTok: ride the Shaved Fruit format with hands shaving a frozen strawberry into a bowl + Willa's Original cream pour on top. Pattern 05 + Pattern 04. 'summer's first snack. dairy-free by accident.' (BS-1)",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"SoYummy · Viral TikTok Food Hacks That Actually Work May 2026", url:"https://soyummy.com/uncategorized/viral-tiktok-food-hacks-that-actually-work-the-so-yummy-guide-to-kitchen-magic-in-2026/"},
      {label:"TikTok · #shavedfruit hashtag page", url:"https://www.tiktok.com/tag/shavedfruit"}
    ]
  },
  {
    id:"CP-2",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"Rhubarb season is peaking 🌿 — the heritage-coded summer ingredient Willa's grandmother kitchen owns, and the recipe lane Pinterest is teeing up all week",
    detail:"Rhubarb is having a heritage-kitchen moment as summer opens — strawberry rhubarb crisp, sourdough rhubarb snack cake, rhubarb shrub. This is grandma food (Willa's grandma was 1921 — she would have made rhubarb pie), prebiotic-fiber-friendly, naturally tart. Pin format with type-led layout + Willa's Original in the cream pour. Pairs with the broader strawberry-season-peak energy (Shaved Fruit, strawberry rhubarb crisp) and the Pinterest planning audience that's 7-10 days ahead of execution.",
    velocity:"high",
    platform:"Pinterest + TikTok",
    willasPlay:"Pinterest pin: 'sourdough rhubarb snack cake — the heritage tart your grandmother would have made (with Willa's Original in the pour).' Type-led. Pattern 02 + 12. (BS-1)",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"Pinterest Business Community · MAY 22 weekly trend report (engine context)", url:"https://community.pinterest.biz/t/the-weekly-pbc-trend-report-may-22-2026/45841"}
    ]
  },
  {
    id:"CP-3",
    type:"ENTERTAINMENT MOMENT",
    typeColor:"#A191B2",
    hook:"Bleachers dropped self-titled MAY 22 🎶 — Jack Antonoff in his Brooklyn-indie warmest mode, the kind of album that scores a Sunday-morning kitchen",
    detail:"Bleachers (Jack Antonoff) released their self-titled album MAY 22, 2026 — NPR + Indy Review both flagged it as 'lyrically perceptive, musically bombastic rock n' roll.' Antonoff produced Lana Del Rey, Sabrina Carpenter, and Taylor Swift's biggest records; this is his own band's most accessible release. Tonal-match for Willa's morning-ritual lane (warm + indie + intentional). Use a track as the audio bed for a 'summer kitchen, week 1' Reel — don't stitch, just soundtrack.",
    velocity:"medium",
    platform:"Music + IG Reels + TikTok",
    willasPlay:"IG Reel: Bleachers MAY 22 track as audio bed for the summer-kitchen-open Reel. Don't name the album in copy — let the song do the work. Pattern 02.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"NPR · New Music Friday best albums May 22, 2026", url:"https://www.npr.org/2026/05/22/nx-s1-5830344/new-music-friday-best-albums-may-22-2026"},
      {label:"The Indy Review · New Music Friday May 22, 2026", url:"https://theindyreview.com/2026/05/22/new-music-friday-may-22-2026/"}
    ]
  },
  {
    id:"CP-4",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"Tortilla cinnamon rolls are the breakout viral recipe of MAY 2026 🌯 — GMA covered it, racking up millions of views, and Willa's plays the dairy-free heavy-cream swap",
    detail:"GMA and ABC News both covered 'tortilla cinnamon rolls' as THE breakout viral TikTok recipe of MAY 2026 — millions of views. The recipe uses a burrito tortilla rolled with butter + brown sugar + cinnamon, baked with heavy cream poured over (the heavy cream is what creates the gooey-roll texture). Willa's plays the dairy-free swap per the No-Dairy rule: replace heavy cream with Willa's Barista + coconut cream blend. Pattern 04 (the unexpected ingredient is the dairy-free swap, calmly stated).",
    velocity:"high",
    platform:"TikTok + IG Reels",
    willasPlay:"TikTok: ride the tortilla cinnamon roll format, swap heavy cream for Willa's Barista + coconut cream. 'tiktok's viral cinnamon roll, dairy-free + cleaner.' Pattern 04 + 05. (BS-2)",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"Good Morning America · TikTok's latest viral recipe: Tortilla cinnamon rolls", url:"https://www.goodmorningamerica.com/food/story/tiktoks-latest-viral-recipe-tortilla-cinnamon-rolls-122429404"},
      {label:"Parade · TikTok Cinnamon Rolls Recipe & Review", url:"https://parade.com/food/tortilla-cinnamon-rolls"}
    ]
  },
  {
    id:"CP-5",
    type:"MEME TEMPLATE",
    typeColor:"#D97706",
    hook:"'Will this survive today?' makeup-endurance format is rising 💄 — summer-heat narrative perfect for a 'will my iced coffee survive the morning meeting?' Willa's Barista flip",
    detail:"TikTok format where creators apply full makeup at start of day, live 6-8 hours, return to camera with no touch-ups — rising sharply in MAY's second week as summer heat creates a 'will this survive today?' narrative. Adjacent / flippable for Willa's: 'will my iced coffee survive the morning meeting' — the no-curdle, no-separation, no-bitter-aftertaste cold-foam pour that Willa's Barista actually delivers. Pattern 03 (relatable confession) + Pattern 10 (wordplay). Hands + product, no on-camera face needed.",
    velocity:"medium",
    platform:"TikTok",
    willasPlay:"TikTok: 'will it survive: iced coffee edition' — hands pour Willa's Barista cold foam at 8am, cut to 11am same glass holding shape. Pattern 03 + 10. 'Willa's pours like it was built for the morning meeting.' (BS-2)",
    dnaMatch:"before-after-stitch",
    sources:[
      {label:"SocialPilot · TikTok Trends May 2026", url:"https://www.socialpilot.co/blog/tiktok-trends"}
    ]
  },
  {
    id:"CP-6",
    type:"MEME TEMPLATE",
    typeColor:"#D97706",
    hook:"'AI Food' exploding-burrito meme is the absurdist visual format eating TikTok 🌯 — green-screen + reaction edit, drop a Willa's hands+pour reveal into it",
    detail:"'AI Food' TikTok meme features an animated burrito exploding its fillings onto a plate — described as 'equal parts absurd, chaotic, and visually hilarious' by Turrboo's MAY 2026 trend tracker. Format works as green-screen edit / reaction / payoff reveal. Willa's angle: subvert the AI-food gross-out by revealing a REAL kitchen pour (hands + Willa's Original + oat groat in a bowl) as the punchline answer. 'What food is supposed to look like.' Pattern 05 + Pattern 04 (real food as the unexpected answer).",
    velocity:"medium",
    platform:"TikTok",
    willasPlay:"TikTok: ride the AI Food burrito format, reveal hands pouring Willa's Original + real oat groat into bowl as the 'real food' punchline. Pattern 05.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"Turrboo · TikTok's Biggest Trends May 2026", url:"https://turrboo.com/blog/latest-tiktok-trends"}
    ]
  },
  {
    id:"CP-7",
    type:"NEWS CYCLE",
    typeColor:"#73B2C9",
    hook:"Yuka app went mainstream-viral 📱 — and Willa's Kids holds the perfect 100/100 score the app rewards parents for finding",
    detail:"Yuka app got explicit mainstream-press validation in MAY 2026 (WCCB MAY 11 + WaPo MAR 17 + WWD + CBS Miami). The app is #1 in US Health & Fitness category, ranking #60 overall. Per Yuka's own research: 94% of US users return a product to the shelf if it gets a 'bad' rating. The signal is that label-literacy is no longer a parent-niche behavior — it's a mass consumer norm enforced by a phone scan. Willa's Kids holds a perfect 100/100 Yuka score (Original + Chocolate both 94, Barista TBD). Different from APR 27's '80M scans' authority carousel — this is the BROADER CULTURAL MOMENT of Yuka being everywhere + the brand-direct receipt.",
    velocity:"high",
    platform:"Consumer Tech Press + TikTok",
    willasPlay:"IG Reel: phone-scan POV — hands pick up Willa's Kids carton, scan in Yuka app, reveal 100/100 score. Cut to morning pour. Pattern 04. (BS-3)",
    dnaMatch:"on-pack-checklist",
    sources:[
      {label:"WCCB Charlotte · What the Tech: Yuka (May 11, 2026)", url:"https://www.wccbcharlotte.com/2026/05/11/what-the-tech-app-of-the-day-yuka/"},
      {label:"WWD · Yuka App food beauty viral coverage", url:"https://wwd.com/beauty-industry-news/beauty-features/yuka-app-food-beauty-viral-app-ingredients-clean-1236907300/"}
    ]
  },
  {
    id:"CP-8",
    type:"ENTERTAINMENT MOMENT",
    typeColor:"#A191B2",
    hook:"The Four Seasons S2 drops on Netflix THU MAY 28 🌲 — Tina Fey + Steve Carell + Will Forte + Colman Domingo in adult-friendship summer comedy mode, the Willa's-audience-coded show returning",
    detail:"Netflix releases The Four Seasons Season 2 on THU MAY 28, 2026. Tina Fey leads the ensemble cast (Carell, Forte, Domingo, Henningsen, Kenney-Silver) in Alan Alda's 1981 romantic-comedy adaptation. S1 hit 78% on Rotten Tomatoes with critic-consensus calling it 'welcoming as a lakeside vista...witty and wise.' Adult-friendship-summer-vacation comedy is custom-built for Willa's parent-demo audience. The play this week: 'the four seasons of a kitchen' or 'what gets shared at a long-weekend dinner table' — heritage-kitchen content that lands the same week as the show drops, without name-checking. Friday MAY 29 Reel timing perfect (24 hrs after premiere).",
    velocity:"medium",
    platform:"TV + IG + Trade Press",
    willasPlay:"IG Reel: 'summer dinner with the four people you actually want at the table.' Long-weekend dinner-prep scene + Willa's Original cream pour into the after-dinner coffee. Pattern 02 (cultural tie-in). Don't name the show — let the post-premiere audience make the connection.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"Netflix Tudum · The Four Seasons Season 2 release date", url:"https://www.netflix.com/tudum/articles/the-four-seasons-season-2-news-photos-release-date"},
      {label:"Hollywood Reporter · The Four Seasons review (S1)", url:"https://www.hollywoodreporter.com/tv/tv-reviews/the-four-seasons-review-netflix-tina-fey-1236197935/"}
    ]
  },
  {
    id:"CP-9",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"Seed-oil-free is officially winning at the shelf 🛡️ — Willa's Original deck has always read the same way, and this week is when 'calm receipts' works harder than the discourse",
    detail:"Mainstream press caught up to seed-oil discourse this week (STAT News MAY 22 fact-check; ongoing MAHA reformulation wave with PepsiCo phasing canola/soybean from Lay's, Kraft Heinz + General Mills + Nestlé following). Willa's Original is already seed-oil-free; Willa's Barista uses high-oleic sunflower (structurally different from industrial seed oils). Engine context only: Jesse & Ben's seed-oil-free fries closed $10M Series A from Greycroft MAY 7 (investor framing, NOT for consumer copy). The consumer-side cultural conversation is 'what's in your cooking oil / what's in your milk' — Willa's plays the calm-authority receipt, not the trend-chase. Don't preach, don't panic, show the deck.",
    velocity:"medium",
    platform:"Trade Press → IG + TikTok",
    willasPlay:"IG Reel: 'the carton has read the same way the whole time.' Hands hold Willa's Original carton, slow ingredient-deck reveal (4 ingredients), cofounder voice-over: 'we never had to add what we never had.' NO mention of seed-oil discourse by name — let the visual + ingredient deck do the work. Pattern 04. (BS-3)",
    dnaMatch:"mom-activist",
    sources:[
      {label:"STAT News · What the anti-seed oil movement gets wrong — and right (May 22, 2026) — engine context only", url:"https://www.statnews.com/2026/05/22/seed-oils-healthy-fats-tallow-fact-check-cardiac-health/"}
    ]
  }
];





// Pulse lookup — declared here because CULTURAL_PULSE is defined above but
// the reverse-map block higher up ran before CULTURAL_PULSE existed.
const PULSE_BY_ID = Object.fromEntries(CULTURAL_PULSE.map(p=>[p.id,p]));

// ──────────────────────────────────────────────────────────
// BENEFIT SHORTHAND LIBRARY
// Succinct 2–3 second nutrition stingers briefs can pull from.
// Christina's ask: more / shorter ways to get the benefit story across.
// ──────────────────────────────────────────────────────────
const BENEFIT_SHORTHAND = [
  {id:"BS-1", category:"WHOLE PLANT IP",    line:"The whole oat. Not the syrup.",                                         duration:"2s",  useWith:["Original","Barista","Chocolate","Kids"]},
  {id:"BS-2", category:"INGREDIENTS",       line:"Four ingredients. (Read 'em.)",                                         duration:"2s",  useWith:["Original"]},
  {id:"BS-3", category:"SUGAR",             line:"1 gram of sugar. Zero added.",                                          duration:"2s",  useWith:["Original"]},
  {id:"BS-4", category:"PROTEIN",           line:"More protein than any oat milk. (Yes, really.)",                        duration:"2.5s",useWith:["Original","Kids"]},
  {id:"BS-5", category:"KIDS vs DAIRY",     line:"Same protein as dairy. Half the sugar.",                                duration:"2.5s",useWith:["Kids"]},
  {id:"BS-6", category:"ALLERGEN-FREE",     line:"No top-9 allergens. School-safe.",                                      duration:"2.5s",useWith:["Kids"]},
  {id:"BS-7", category:"ANTI-RAPESEED",     line:"Latte art. No rapeseed oil.",                                           duration:"2s",  useWith:["Barista"]},
  {id:"BS-8", category:"YUKA",              line:"Yuka says 100 out of 100.",                                             duration:"2s",  useWith:["Kids"]},
  {id:"BS-9", category:"GOOD FOOD AWARDS",  line:"Best Beverage of the year. Real cacao.",                                duration:"2.5s",useWith:["Chocolate"]},
  {id:"BS-10",category:"CATEGORY CRITIQUE", line:"Most oat milks filter out the healthiest 30% of the oat. We don't.",    duration:"3.5s",useWith:["Original","Barista","Chocolate"]},
  {id:"BS-11",category:"GLYPHOSATE",        line:"Certified glyphosate-free. Because that matters.",                      duration:"2.5s",useWith:["Original","Barista","Chocolate","Kids"]},
  {id:"BS-12",category:"FOUNDER",           line:"Mother-founded. WBENC-certified. Built to outlive me.",                 duration:"3s",  useWith:["Original","Barista","Chocolate","Kids"]}
];

// ──────────────────────────────────────────────────────────
// POSTING LOGIC — Willa's ET posting windows (from Christina's content
// calendar, updated 3/2026). Drives how the engine picks `timing` on each
// brief; also surfaced on the Content Calendar as a click-to-expand callout
// so the team sees WHY a brief got slotted Mon 12pm vs Thu 7pm.
// ──────────────────────────────────────────────────────────
const POSTING_LOGIC = {
  note:"Based on Willa's content calendar (Mar 2026). All times Eastern.",
  platforms:[
    {
      platform:"Instagram",
      windows:[
        {label:"Morning",         time:"11 AM ET",          best:false},
        {label:"Midday (BEST)",   time:"12 PM ET",          best:true},
        {label:"Evening",         time:"6–8 PM ET",         best:false}
      ]
    },
    {
      platform:"TikTok",
      windows:[
        {label:"Morning (BEST)",  time:"9–10 AM ET",        best:true},
        {label:"Evening",         time:"7–9 PM ET",         best:false},
        {label:"Weekend",         time:"10 AM – 12 PM ET",  best:false}
      ]
    }
  ]
};

// ──────────────────────────────────────────────────────────
// BRIEF → DNA pattern mapping (applied to BRIEFS below)
// ──────────────────────────────────────────────────────────
const BRIEF_DNA = {
  // BIG SWINGS
  "MAY25-IG-R1":   "at-shelf-moment",        // Yuka scan-with-me mom-creator at-shelf confession
  "MAY25-TT-1":    "viral-recipe-remix",     // Tortilla cinnamon roll dairy-free swap
  "MAY25-PIN-1":   "viral-recipe-remix",     // Sourdough rhubarb snack cake heritage pin
  // HIGH PRIORITY
  "MAY25-IG-R2":   "mom-activist",           // Seed-oil-free Christina moment
  "MAY25-TT-2":    "viral-recipe-remix",     // Shaved Fruit frozen strawberry sorbet
  "MAY25-TT-3":    "before-after-stitch",    // Will it survive Barista flip
  "MAY25-IG-R3":   "kid-family-moment",      // Long-weekend pour (Bleachers audio bed)
  "MAY25-IG-R4":   "kid-family-moment",      // Four Seasons S2 cultural-stitch
  "MAY25-TT-4":    "meme-payload",           // AI Food meme + real-food reveal
  "MAY25-IG-F1":   "on-pack-checklist",      // EWG state map cert-stack carousel
  "MAY25-IG-R5":   "mom-activist",           // Cert moat Christina reveal
  "MAY25-IG-F2":   "on-pack-checklist",      // Arizona school act back-to-school carousel
  // STANDARD / EVERGREEN
  "MAY25-TT-5":    "viral-recipe-remix",     // Chocolate evergreen indulgent-remade-clean
  "MAY25-PIN-2":   "viral-recipe-remix",     // Iced latte without the math (evergreen)
  "MAY25-PIN-3":   "viral-recipe-remix",     // Strawberry oat icebox cake (evergreen)
  "MAY25-TT-6":    "at-shelf-moment",        // Saw at Sprouts wall (evergreen)
  "MAY25-IG-F3":   "on-pack-checklist",      // Heritage cert-stack carousel (evergreen)
  "MAY25-TT-7":    "kid-family-moment"       // Kids crossover relatable-confession (evergreen)
};

BRIEFS.forEach(b => { b.dnaPattern = BRIEF_DNA[b.id] || null; });

// ──────────────────────────────────────────────────────────
// FOOTAGE INSPO — click-to-expand bank on each brief detail. 4 categories:
// SHOOT (original footage to capture), FOUND (existing content to stitch),
// MEMES (gif + meme refs), ARCHIVE (period / vintage / b-roll for texture).
// Added 2026-04-21 per Christina's feedback — the shot list tells you the
// pacing, this tells you where to source every shot.
// ──────────────────────────────────────────────────────────
const BRIEF_FOOTAGE_INSPO = {
  "MAY25-IG-R1": {
    shoot:["POV at the Sprouts kids-drinks aisle — phone-held shot scanning carton after carton in the kids-RTD section","Yuka app screen captures (multiple scans revealing red/orange scores, then one green 100/100 reveal on the Willa's Kids carton)","Carton-goes-into-the-cart shot","Home kitchen: kid's hand pours Willa's Kids into a glass (face out of frame)","Real-aisle / real-cart / real-kitchen aesthetic — NO studio finish"],
    found:["Trend reference: TikTok 'scan with me' / #yuka grocery-aisle mom-creator videos (multiple creators May 2026 — rising format as Yuka mainstreams)","WCCB Charlotte MAY 11 'What the Tech: Yuka' coverage (engine context, don't cite in copy)","Mom-creator scan-with-me hashtag landing pages (TikTok #scanwithme + #yukascan)"],
    memes:["Pattern 03 Relatable Confession ('i'm the mom in the aisle with the phone out')","Pattern 09 Aesthetic IRL Encounter (real grocery aisle, real cart, real find)","'scanned X drinks at the store, only one was green' content lane"],
    archive:["Willa's existing in-store / Sprouts visit footage if any","Willa's Kids carton + Yuka 100/100 badge cleared assets","Kid-pour b-roll for the end card"]
  },
  "MAY25-TT-1": {
    shoot:["Hands rolling burrito tortilla with butter+cinnamon sugar (overhead)","Willa's Barista pour shot (cloud-pour over the rolls)","Coconut cream small-bowl cameo","Oven-to-plate baked-roll lift","Icing drizzle finale"],
    found:["Trend reference: @ashleymarkletreats viral tortilla cinnamon roll TikTok (verified MAY 2026 millions of views)","GMA / ABC News Lori Bergamotto piece on the trend (consumer media, safe to reference)","Parade tortilla cinnamon roll recipe + review coverage"],
    memes:["TikTok-made-me-do-it format — already a viral framing","Dairy-free swap reveal as the calm-authority twist"],
    archive:["Willa's existing Barista pour b-roll for the cloud-pour shot","Coconut cream + cinnamon sugar cleared product assets"]
  },
  "MAY25-PIN-1": {
    shoot:["Overhead pin shot: sourdough rhubarb snack cake on vintage plate, Willa's Original carton in corner","Rhubarb sprigs + demerara cameo","Wood counter, golden afternoon light","Single oat groat + flaky salt sparkle"],
    found:["Trend reference: Pinterest rhubarb recipe search peaking MAY 2026 (engine context only — never quote stat in caption)","Sourdough rhubarb snack cake — multiple BookTok creator versions exist as visual reference","Pinterest weekly trend report MAY 22 (engine context)"],
    memes:["Static pin → skip memes"],
    archive:["Willa's existing kitchen-pour b-roll for ambient mood","Vintage plate + linen napkin styling references (heritage tier)"]
  },
  "MAY25-IG-R2": {
    shoot:["Christina at the counter holding Willa's Original — direct-to-camera moment","Close-up: hand traces ingredient panel","Pour shot: Willa's Original into a glass on the counter","Carton + glass final still"],
    found:["Engine context only — STAT News MAY 22 anti-seed-oil fact-check (not quoted in copy)","MAHA reformulation wave coverage (engine context only)","Willa's seed-oil-free messaging archive"],
    memes:["Founder-quiet-authority format — Patagonia-style activist content reference","Lead-with-solution structure (carton in beat 1, discourse as backdrop)"],
    archive:["Willa's existing Christina-at-counter library if any clean takes available","Soft afternoon kitchen daylight b-roll"]
  },
  "MAY25-TT-2": {
    shoot:["Overhead frozen-strawberry-on-microplane shave shot (ASMR-quality)","Snow-like sorbet piling in white bowl","Willa's Original cloud-pour drizzle","Spoon-dip end-card close-up"],
    found:["Trend reference: TikTok #shavedfruit (multiple creators May 2026)","SoYummy May 2026 viral-food-hacks roundup","Willa's clean-pour cloud-pour reference shots"],
    memes:["Shaved-fruit format itself is the meme — ride directly","ASMR satisfying-shave format"],
    archive:["Willa's existing white-counter pour b-roll for the cloud-pour shot","Frozen strawberry + microplane cleared product assets"]
  },
  "MAY25-TT-3": {
    shoot:["8am iced coffee pour shot — Willa's Barista cloud-foam forming over cold espresso","11am same-glass shot — foam intact, condensation","Counter staging with laptop in soft window light","Spoon-dip end-card close-up"],
    found:["Trend reference: TikTok 'will it survive' makeup-endurance format (multiple creators May 2026)","SocialPilot May 2026 TikTok trends roundup"],
    memes:["'Will it survive' format itself — direct ride","Pattern 03 relatable confession + Pattern 10 wordplay overlay"],
    archive:["Willa's existing cold-foam pour library","Morning-meeting + laptop counter styling references"]
  },
  "MAY25-IG-R3": {
    shoot:["Soft late-morning kitchen counter establishing","Willa's Original over cold espresso + ice pour shot (slow)","Peach slicing on cutting board","Sourdough toast with butter + flaky salt","Hands wrapped around iced glass end-card"],
    found:["Audio reference: Bleachers MAY 22 self-titled album (NPR + Indy Review confirmed)","Cup of Jo Saturday-morning aesthetic content as visual reference","Willa's morning-ritual b-roll archive"],
    memes:["No meme format — letterboxed cinematic content, not meme-riffing","Slow, intentional cuts (no rush)"],
    archive:["Willa's existing late-morning b-roll if any cinematic takes","Peach + sourdough + flaky salt styling references"]
  },
  "MAY25-IG-R4": {
    shoot:["Twilight back-patio dinner table establishing","Espresso pour + Willa's Original drizzle (cream swirl visible)","Two pairs of hands on table — laughter implied","Golden-hour end-card cup + carton"],
    found:["Cultural reference: The Four Seasons S2 Netflix MAY 28 (do NOT name in copy — let the post-premiere audience make the connection)","Hollywood Reporter S1 review for tonal calibration","Cup of Jo dinner-party content aesthetic"],
    memes:["No meme format — letterboxed editorial heritage content","Pattern 02 cultural tie-in (timing only — no name-check)"],
    archive:["Willa's existing dinner-table or evening-pour b-roll if any","Golden-hour back-patio styling references"]
  },
  "MAY25-TT-4": {
    shoot:["Clean overhead wood counter — Willa's Original + glass + oat groat","Hands pour Willa's Original into glass (slow swirl)","Stinger end-card still"],
    found:["Trend reference: AI Food exploding-burrito meme TikTok (multiple variants May 2026, per Turrboo trend report)","Search '#aifood' on TikTok for green-screen footage to stitch","Turrboo May 2026 trends roundup"],
    memes:["AI Food meme is the format itself — direct stitch","Hard-cut chaos-to-calm transition"],
    archive:["Willa's existing pour-and-oat-groat b-roll","Wood-counter morning-light reference"]
  },
  "MAY25-IG-F1": {
    shoot:["Stylized US map graphic (Willa's-branded — do NOT republish EWG's actual map)","Willa's Original carton hero on cream background","Back-of-pack ingredient panel close-up","Cert-stack badge layout (Yuka 100, USDA, Detox Project, etc.)"],
    found:["Engine reference only: EWG state regulation map (don't reproduce, build Willa's-branded version instead)","Consumer Reports state dye coverage (engine context)","WV HB 2354 + AZ + CA + FL state coverage (context)"],
    memes:["Static carousel → skip memes"],
    archive:["Willa's existing cert-stack badge library","Stylized US-map graphic templates"]
  },
  "MAY25-IG-R5": {
    shoot:["Christina at the counter holding Willa's Original — direct-to-camera","Cert badge close-ups (USDA, Detox Project, WBENC, Yuka 100)","Carton + glass end-card still"],
    found:["Engine context only — Elmhurst Clean Protein nationwide at Sprouts (do NOT name in copy)","BevNET + Dairy Foods Elmhurst coverage (engine reference)"],
    memes:["Founder-authority format — Patagonia-style mission gravity","Pattern 06 founder humanization"],
    archive:["Willa's existing cert-badge library + Christina-at-counter footage","USDA + Detox Project + WBENC + Yuka 100 cleared logo assets"]
  },
  "MAY25-IG-F2": {
    shoot:["Real toddler lunchbox staging (turkey + Violife provolone slice OR Good Plants dairy-free cheese + clementine + baby carrots + Willa's Kids drink)","Willa's Kids carton hero on cream background","State-by-state stylized visual graphic","Kids-specific cert-stack badge layout"],
    found:["Engine context only — Arizona Healthy School Act + state policy moves (don't quote O'Melveny or other trade-press sources in caption)","State-by-state UPF-in-schools coverage (engine reference)"],
    memes:["Static carousel → skip memes"],
    archive:["Willa's existing Kids carton library + cert badges","Real-lunchbox staging references (parent-creator aesthetic)"]
  },
  "MAY25-TT-5": {
    shoot:["Overhead: Willa's Chocolate carton + ingredient cameo (cacao powder bowl, oat groat, sea salt)","Slow pan across each ingredient","Willa's Chocolate pour shot into clear glass — deep-brown swirl","End card with Good Food Awards badge"],
    found:["No external trend reference — evergreen flavor-hero content","Willa's Chocolate product photography + Good Food Awards badge"],
    memes:["No meme format — letterboxed editorial heritage content"],
    archive:["Willa's Chocolate existing pour-shot b-roll + Good Food Awards badge","Real-cacao + organic-oat ingredient styling references"]
  },
  "MAY25-PIN-2": {
    shoot:["Overhead pin shot — clear glass + cold espresso + Willa's Barista pour shot","Cloud-foam swirl visible","Willa's Barista carton partly cropped in corner","Pinterest-native serif typography header overlay"],
    found:["No external trend reference — evergreen iced-coffee Pinterest SEO content"],
    memes:["Static pin → skip memes"],
    archive:["Willa's existing iced-coffee pour b-roll","White marble counter styling references"]
  },
  "MAY25-PIN-3": {
    shoot:["Overhead pin shot — strawberry-and-cream-layered icebox cake on cutting board, layers visible","Willa's Original carton + small bowl of coconut cream partly cropped in corner","Fresh strawberries scattered around plate","Serif typography header overlay"],
    found:["No external trend reference — evergreen strawberry-season Pinterest SEO content"],
    memes:["Static pin → skip memes"],
    archive:["Willa's existing summer dessert library","Strawberry season styling references"]
  },
  "MAY25-TT-6": {
    shoot:["POV at Sprouts shelf — phone-held shot of the natural-milk aisle (find a Sprouts location nearby)","Slow pan across the 4 Willa's cartons on the shelf","Hand pickup + back-label turn","Carton-in-hand end-card with shelf behind"],
    found:["Sprouts MAY-JUN exclusive products coverage as engine context (Wellness Bowls + Sweet Heat — don't quote)","Willa's existing 'found at sprouts' UGC if available"],
    memes:["At-shelf POV format — Pattern 09 IRL aesthetic"],
    archive:["Willa's previous in-store visit footage","Sprouts shelf-aesthetic references"]
  },
  "MAY25-IG-F3": {
    shoot:["Vintage-style grandmother-era photo (1921 kitchen or stylized period image)","Modern Willa's Original carton on cream background","Ingredient panel close-up","Cert badge layout (USDA, Detox Project, WBENC, Yuka 100)"],
    found:["Willa's existing grandmother Willa heritage photos (per CLAUDE.md, 'my grandmother was making oatmeal way before it was cool')","Library of Congress / Prelinger Archive for period 1921-era kitchen imagery"],
    memes:["Static carousel → skip memes"],
    archive:["Willa's full heritage photo + cert badge library","Period 1921-era kitchen photo references (Library of Congress)"]
  },
  "MAY25-TT-7": {
    shoot:["Cofounder-sister at counter — direct-to-camera moment (NOT Christina)","Pour Willa's Kids into kid's glass (kid face out of frame)","Pour same carton into iced coffee — cloud-swirl visible","End card: two glasses side by side"],
    found:["No external trend reference — evergreen Kids-crossover content per CLAUDE.md adult-crossover rule","Willa's Kids existing crossover content"],
    memes:["Pattern 03 confessional format — universal relatability"],
    archive:["Willa's existing cofounder-sister footage if available","Real-kitchen Sunday-morning aesthetic references"]
  }
};
BRIEFS.forEach(b => { b.footageInspo = BRIEF_FOOTAGE_INSPO[b.id] || null; });

// ──────────────────────────────────────────────────────────
// STRATEGIST AGENT — powers Ask the Strategist, Studio chat-riff, and
// brief-riff. One agent, three entry points. Distilled system prompt
// derived from CLAUDE.md (~1.5k tokens) + a dynamic this-week context
// block that injects current TRENDS / CULTURAL_PULSE / COMPETITORS so
// the agent's responses reference what's live RIGHT NOW, not evergreen.
// Added 2026-04-22.
// ──────────────────────────────────────────────────────────

const STRATEGIST_SYSTEM_PROMPT = `You are Willa's Strategist — the in-house creative director and brand agent for Willa's Oat Milk. Christina founded Willa's and named it after her grandmother. You think like a seasoned consumer-marketing veteran who is also a cultural insider — you know what's driving attention on TikTok/IG/X this week, you know the health + parenting + wellness beats, and you know how brands that feel human beat brands that feel corporate.

You exist to help Willa's team:
- Ideate fast in the Studio (riff on a link, photo, or rough idea and shape it into a Willa's-voice post)
- Answer strategic questions ("what should we do for Mother's Day?")
- Reshape existing content briefs in new directions

Everything you say must pass through Willa's brand filter.

=== WILLA'S NORTH STAR ===
Tagline: "Nourish the spark in everyone."
Origin: Willa was the founder's grandmother — she made oatmeal from real ingredients before it was cool, and saw the unique spark in everyone she met. Willa's, the brand, runs on that.
Founded: Born 1921 (Willa). Launched 2021. Mother-founded. WBENC-certified.

=== PRODUCT MOAT: WHOLEPLANT™ IP ===
Willa's is the ONLY oat milk that uses the WHOLE oat groat — like steel-cut oats. Most oat milks use an enzymatic process that turns the oat into sugar and filters out the bran + germ (where the fiber + protein live). That's ~30% of the oat they throw out. Willa's kept it.

Flavors (each has a content role — match flavor to story type first, flavor rotation second):
- **Original** — 1g sugar, 4g+ protein, 2g+ prebiotic fiber, 4 ingredients (oats, water, vanilla, salt). Best-seller. **LEAD FLAVOR for health / ingredients / sugar-critique / WholePlant IP.** Any nutrition-first brief defaults here — NOT Barista.
- **Barista** — 3g sugar (coconut sugar), 4g protein, 2g fiber, NO rapeseed oil, foams clean. **LEAD FLAVOR for lattes / cold foam / home-cafe.** Hook formula: "yes you can have your oat milk latte without the sugar spike / rapeseed / gums." **Barista is Willa's MOST processed SKU** — its deck is longer (calcium carbonate, tricalcium phosphate, organic high-oleic sunflower oil). NEVER lead ingredient-comparison / "read the label" content with Barista. Ingredient-transparency stories lead with **Original** (4 ingredients) or **Chocolate** (5 ingredients). Barista earns its spot when a latte IS the vehicle.
- **Kids** — 6g sugar (real maple syrup), 8g protein, 3g fiber, DHA omega-3s, top-9 allergen-free, Yuka 100/100. **LEAD FLAVOR for family-moments / school-lunch / allergen-free.** Adult crossover: blends best in iced coffee + "makes the best swirls." Lean into "both generations drink from the same carton" framing.
- **Chocolate** — 11g sugar, 5g protein, 3g fiber, real cacao, Good Food Awards Best Beverage winner. **LEAD FLAVOR for indulgent-remade-healthy content.** Hook formula: "yes you can have a mocha / your kid can have chocolate milk that's delicious and not a sugar bomb." Avoid positioning Chocolate as a daily ingredient story — keep it in the indulgent lane.

Certifications (the six — Willa's is the only oat milk with all):
USDA Organic · Certified Glyphosate-Free (The Detox Project) · Non-GMO Project Verified · Kosher · Vegan · WBENC.

=== VOICE COMPASS ===
- WARM — human, inviting, grandmother's kitchen. AVOID: clinical, corporate.
- WITH A WINK — playful, knowing, a little cheeky ("shhh…"). AVOID: preachy, dour.
- ASSERTIVE + ACTIVIST — confident POV, us-vs-them category critique (no names), Willa's is redefining plant-based milk. No hedging, no apologizing. AVOID: attacks on named competitors, whiny/defensive tone.
- CREATIVE — fresh angles, not stock food content. AVOID: templated.
- TRANSPARENT — read-the-label energy, receipts-first. AVOID: marketing-speak.
- WITTY — dry cleverness, self-awareness. Food should feel fun, not like a chore. Humor is PERMISSION, not a consolation prize for "fun brands." AVOID: earnest-wellness-brand tropes (sunset-light-grain-bowl with a corny tagline).

Voice gold standard (these four flavor taglines set the tone):
• "Four simple ingredients. The least sugar. The most protein."
• "The chocolate milk you wish you grew up on."
• "Designed for kids' tastebuds. And shhh…. it's even parent approved."
• "The oat milk your coffee deserves."

=== BRAND MUSES (tonal anchors) ===
Reach for these when sharpening a brief's voice. Willa's is not copying them; it's stealing their posture.
- **Kiki Milk / Tenzo Matcha** — us-vs-them category critique with confidence, receipts-heavy. Use for ingredient-comparison briefs.
- **Patagonia / Lovebird** — activist gravity, stance bigger than the product. Use for glyphosate / dye / UPF / MAHA reformulation briefs.
- **Olipop** — better-for-you without supplement-company earnestness. Conversational. Use when explaining fiber/protein/prebiotic without sounding like a nutritionist.
- **Fishwife / Graza / Omsom** — design-led personality on simple ingredients. Use when a "4 ingredients" hero moment needs POV to land (not an infographic).
- **Poppi** — viral short-form template, better-for-you beverage. Use when a brief needs TikTok-native pacing + wit.
- **Partake Foods** — mother-founded parent-CPG peer, warm + witty + unapologetic about parent-first focus. Use for PARENTING-pillar briefs that shouldn't apologize for their audience.

The muses are a reference library — reach for one when it sharpens the brief. Not every response needs a muse; the instinct should kick in when a brief needs more POV than it has. Once Christina prioritizes which muses to lean on most, this tightens up.

**MUSE STAYS BACKEND.** You reason through "which muse am I reaching for?" to sharpen the output, but DO NOT surface the muse name in your response text. No "(Olipop energy)" tags in user-facing output. Same for coreBeats — internal thinking, invisible output. The engine should feel smart, not show its homework.

=== INTERNAL vs CONSUMER-FACING (HARD RULE) ===
NEVER in consumer copy / chat output: business growth numbers (510%/700% YoY), SPINS data, retail door counts, named-competitor comparisons, pricing strategy, or any investor-pitch line. The phrase "they come for the label, but they stay for the taste" is INVESTOR-ONLY — never ship to consumers.

Fair game: WholePlant story, nutritionals, certifications, 4-ingredient transparency, grandmother origin, sustainability/zero-waste, category critique without names, Kids origin ("parents asked us"), "70% of Americans shop plant milk" (category-size stat).

=== CATEGORY CRITIQUE WITHOUT NAMES ===
When comparing, use "vs. the average [category]" framing. Never name competitors.
✓ "Most oat milks are water + oil + sugar + additives + gums."
✓ "Other oat milks filter out the healthiest 25–30% of the oat."
✗ "Willa's vs. Oatly."
✗ "Unlike Chobani…"

=== CHRISTINA ON-CAMERA RULE ===
Willa's captions + content default to third-person brand voice, NOT first-person Christina. Her on-camera moments are reserved for: heritage/origin beats, founder-POV activist stances, kid-family authenticity moments. Everything else = hands + product + text overlays. Cap ~3 Christina-featured briefs per week.

When writing captions: default to Willa's as the subject ("Willa's kept the whole oat"). Use "we" for brand-as-team. Avoid first-person "i/my/me" unless the brief visibly features Christina speaking to camera.

=== CONTENT PILLARS + DNA FORMATS ===
Pillars: HEALTH/WELLNESS · INGREDIENTS/RECIPES · PARENTING · REVIEWS/RECS.
DNA formats (Willa's 7 top-performing patterns):
• mom-activist — founder/mom direct-to-camera with a category-critique stance
• on-pack-checklist — cartons side by side with ✓/✗ ingredient overlays
• kid-family-moment — real family scene with Willa's Kids in frame
• viral-recipe-remix — trending recipe remade dairy-free with Willa's
• meme-payload — current meme format + one Willa's proof-point payload
• at-shelf-moment — founder/ambassador at retail or aisle stitch
• before-after-stitch — switch / conversion arc via stitch

Anti-patterns: Willa's must be the protagonist (no trace-ingredient recipes). Lattes capped at 1 per 2 weeks. No pasta roundups. Indulgent recipes only if remade high-protein or with non-cane sweetener.

=== POV DISCIPLINE (added 2026-04-22 — apply to every response) ===

1. **BENEFIT-FIRST.** Always lead with the benefit or the provocation, not the process. "How it's made" is supporting proof. If you find yourself explaining enzymatic oat-syrup filtration before saying why it matters to the human reading — rewrite, lead with the benefit. Willa's team has a documented tendency to over-explain the WholePlant story; your job is to counter that. Caption structure: **HOOK (benefit) → PROOF (numbers) → PROCESS (if relevant).**

2. **DIET-CULTURE FILTER.** Before riding any trend, ask: *is this celebrating food, or punishing people for eating?* If it's restriction-dressed-as-wellness (oatzempic, 75 Hard, shakes-replacing-meals, extreme clean-eating), Willa's pushes back, doesn't amplify. Willa's stands for positive food relationships — delicious, satiating, abundance. Celebrating-food trends (cottage cheese oats, fibermaxxing, butter boards) → ride directly. You're the filter; flag the difference.

3. **REPEAT THE 3 CORE BEATS.** Audiences forget between Monday and Thursday. Willa's has 3 core beats that need to repeat constantly:
   - **DELICIOUS** — tastes great, rich + smooth + creamy. Counters the "plant milk is grainy" prejudice.
   - **HEALTHIER** — whole oat, low sugar, clean label, organic, glyphosate-free.
   - **FEEL GOOD** — satiation, energy, no crashes, no GI issues. The physical + emotional experience.
   Every response + brief should touch at least ONE. Don't worry about saying the same thing "again" — repetition is the job.

4. **PARENT-FIRST HOOKS (for PARENTING briefs).** Top-performer pattern: specific parent-problem → Willa's Kids is the answer. Templates:
   - "When your kid is lactose intolerant…"
   - "Say goodbye to sugar kids drinks."
   - "For the mom who's tired of…"
   - "If you've ever read a kids' milk label and…"
   Alienating non-parents in a parenting brief is OK as long as the week has enough latte/recipe content to balance. Don't dilute parent briefs by trying to broaden them.

5. **VOICE POV CORRECTION — Christina is NOT a mom (critical).** Willa's is mother-founded — the mother is Christina's sister + cofounder. Christina herself is not a mom. Never attribute first-person parenting ("my kids," "i wanted my kids to grow up with…," "as a mom…") to Christina in captions, scripts, or VO. Resolution hierarchy: (a) BRAND VOICE "we" is the default ("we wanted kids to grow up with food they can read"), (b) ATTRIBUTED to cofounder-sister when a first-person mom POV is needed, (c) THIRD-PERSON about Christina for heritage / origin beats. The "I'm not an almond mom, I'm an oat mom" framing is broken when attributed to Christina — rewrite to brand "we" or attribute to her sister. When in doubt, default to "we."

6. **FACT-CHECK — verified-facts only.** Three phrasings Christina flagged as inaccurate — do NOT ship any of these:
   - ❌ "the enzyme breaks the oat into sugar" → the correct description is: "most oat milks **filter out** the bran + germ, **then enzyme-process the starch** into sugar." Oats aren't "broken down" by the enzyme.
   - ❌ "filters out the fiber" alone → you MUST mention both: "filters out the bran + germ where both the **fiber AND the protein** live." Omitting protein is a voice failure (per Christina, protein loss is a worse offense than fiber loss).
   - ❌ "the only oat milk in America that paid for the glyphosate test" / "the only oat milk certified glyphosate-free" → scope claims Christina flagged as inaccurate. Use the verifiable version: "Willa's is certified glyphosate-free by The Detox Project. Every lot is tested."
   If asked for a specific percentage / search-volume number, say you need a source before citing it.

7. **JARGON GETS A ONE-LINE GLOSS.** Don't name a mechanism, meme, or insider term without a plain-English one-liner on first use. Examples:
   - beta-glucans → "the oat fiber that supports heart + gut health"
   - oat groats → "whole oat kernels, like steel-cut oats"
   - the enzyme/syrup story → "most oat milks use an enzyme that turns oats into sugar and filters out the fiber + protein"
   - oatzempic → "a TikTok trend — ½ cup oats + lime + water, marketed as DIY Ozempic. It doesn't work that way."
   - AirPod Bump → "the Q1 2026 TikTok meme where strangers collide + earbuds swap, personality reveal via playlist"
   - fibermaxxing → "TikTok's term for eating more fiber intentionally"
   If a brief assumes the reader already knows, the brief isn't done.

8. **BARISTA ≠ INGREDIENT-STORY HERO.** Willa's Barista is the most-processed SKU (calcium carbonate, tricalcium phosphate, sunflower oil). Ingredient-transparency + "read the label" briefs lead with **Original** (4 ingredients) or **Chocolate** (5 ingredients). Barista ONLY leads when the latte IS the vehicle and the proof is "no rapeseed + 50% less sugar than other barista oat milks." If you catch yourself drafting an ingredient-comparison brief around Barista, redirect to Original.

=== HOW TO RESPOND ===

**DEFAULT MODE = conversational ideation, NOT execution.**

When someone opens a question ("what should we do for X?", "how do we tap into Y?", "ideas for Z?") your job is to PROPOSE 2–3 ANGLES in punchy, plain language. Short. Directional. Then stop and let them build with you.

Structure for an ideation answer:
- One short intro sentence (or skip it).
- 2–3 angles, each with a one-line headline + 1–2 short sentences of texture. No full brief specs, no "shot lists," no multi-level bullet lists of every proof point.
- Close with a question or fork: *"Want me to dig into any of these?"* / *"Which lane pulls you?"* / *"Should I push one further?"*

**HARD RULE — keep first responses under 200 words.** Target 120 in most cases. If the user wants more depth, they'll ask. Answer the question asked, then shut up.

**Don't skip to execution.** DO NOT write full captions, shot lists, end-card stingers, or complete briefs unless the user explicitly says "write it" / "brief it" / "give me the caption." Early responses = directional ideas only. You and the user will pick a direction first, THEN build it out.

**Specificity is earned, not default.** Name a specific flavor, platform, hook, or DNA only when it sharpens the idea. You don't need to list all four for every angle.

**Invite continuation.** End almost every response with one open door — a question, a suggested next step, or a "say more about X" prompt. The goal is an exchange, not a monologue.

**Other rules:**
- When they DO ask for caption copy, write 3 tone variants: direct (the receipts), warm (with a wink), punchy (mic drop). Keep the examples tight.
- Reason through which brand-muse energy you're reaching for, but DON'T name the muse in your response. Let the output BE Liquid-Death-punchy or Partake-warm without labeling it.
- Reference this week's live trends + pulse when relevant (they'll be injected below).
- **WEB SEARCH.** You have access to a web_search tool. Use it when the user asks about something NOT in this week's injected context — a specific event, a recent post, news since the latest refresh, a specific creator/brand/campaign. Don't search for Willa's brand facts or for this week's trends (already in context). When you search, weave results into a short answer; don't link-dump.
- Flag when something feels off-brand or violates a rule — don't execute bad directions silently. If they ask for a health-benefit brief on Barista, gently redirect to Original.
- Markdown is fine for structure (bold, bullets, short headers). But short. Not a textbook.`;

function buildWeekContext() {
  const trendLines = (typeof TRENDS !== "undefined" ? TRENDS : []).slice(0, 10).map((t) =>
    `• ${t.id || "T-?"} — ${t.trend}`
  ).join("\n");
  const pulseLines = (typeof CULTURAL_PULSE !== "undefined" ? CULTURAL_PULSE : []).slice(0, 10).map(p =>
    `• ${p.id} [${p.type}] — ${p.hook}`
  ).join("\n");
  const compLines = (typeof COMPETITORS !== "undefined" ? COMPETITORS : []).slice(0, 5).map(c =>
    `• ${c.name} — ${(c.status || "").slice(0, 140)}${(c.status || "").length > 140 ? "…" : ""}`
  ).join("\n");

  // Phase D — also surface this week's brief slate so the strategist can
  // answer week-level questions like "which slot is the weakest?" or
  // "are we over-indexed on parenting?" without needing the user to
  // re-summarize the calendar manually.
  const briefLines = (typeof BRIEFS !== "undefined" ? BRIEFS : []).map(b =>
    `• ${b.id} [${b.platform} · ${b.pillar} · ${b.priority}${b.flavor ? " · " + b.flavor : ""}] — ${b.concept}`
  ).join("\n");

  // Quick pillar / flavor distribution so the strategist can spot
  // imbalances at a glance.
  const pillarCounts = {};
  const flavorCounts = {};
  (typeof BRIEFS !== "undefined" ? BRIEFS : []).forEach(b => {
    if (b.pillar) pillarCounts[b.pillar] = (pillarCounts[b.pillar] || 0) + 1;
    if (b.flavor) flavorCounts[b.flavor] = (flavorCounts[b.flavor] || 0) + 1;
  });
  const distLine = `Pillar mix: ${Object.entries(pillarCounts).map(([k,v])=>`${k}=${v}`).join(", ")}. Flavor mix: ${Object.entries(flavorCounts).map(([k,v])=>`${k}=${v}`).join(", ")}.`;

  return `=== THIS WEEK'S SITUATION (${typeof WELCOME_WEEK_RANGE !== "undefined" ? WELCOME_WEEK_RANGE : "current week"}) ===

TRENDS in play:
${trendLines}

CULTURAL PULSE:
${pulseLines}

COMPETITOR MOVES (internal context — do not name competitors in consumer output):
${compLines}

CONTENT BRIEFS QUEUED THIS WEEK (${(typeof BRIEFS !== "undefined" ? BRIEFS.length : 0)} total):
${briefLines}

${distLine}

Reference these when they're relevant. When user asks week-level questions (which is the strongest brief, where's the gap, are we over-indexed on X, swap-X-for-Y), use the brief slate directly. For per-brief questions, use the brief ID + concept to ground specifics. Never name competitors in consumer output even if mentioned in the situational context.`;
}

// API key handling — Phase C upgrade (2026-05-18):
// The engine no longer asks Christina's team for their API key. The team's
// shared key lives in Vercel env vars (ANTHROPIC_API_KEY) and the strategist
// is reached via the /api/strategist proxy. These helpers remain as no-op
// shims so existing "is there a key?" gates keep returning truthy —
// avoids needing to touch every caller. Real auth happens server-side.
const WILLAS_API_KEY_STORAGE = "willas-studio-api-key"; // legacy storage key

function getClaudeApiKey() {
  return "proxy"; // sentinel — server-side proxy holds the real key
}
function setClaudeApiKey(key) {
  // No-op: client never holds the key anymore.
}
function clearClaudeApiKey() {
  // Clean up any legacy keys still in localStorage from before the proxy.
  try { localStorage.removeItem(WILLAS_API_KEY_STORAGE); } catch(e){}
}

// Extract displayable text from a message.content — which can be either
// a string (text-only message) OR an array of content blocks (multi-block
// vision messages, where the first block is an image and a later block
// holds the text). Without this helper, rendering an image-attached
// message crashes React (can't render array of {type, source} objects as
// children) → white-screened the Studio (2026-05-18).
function messageDisplayText(content) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter(b => b && b.type === "text" && b.text)
      .map(b => b.text)
      .join("\n");
  }
  return "";
}

// ─── User attribution (2026-05-18) ──────────────────────────────
// Studio is a shared whiteboard — multiple team members drop ideas
// in. Stickies attach the user's name so the team sees who dropped
// what. Stored in localStorage per-browser (no real auth yet — that
// comes when we wire Supabase auth). User can edit anytime from the
// "Posting as" strip on the Studio header.
const WILLAS_USER_NAME_STORAGE = "willas-user-name";
function getUserName() {
  try { return localStorage.getItem(WILLAS_USER_NAME_STORAGE) || ""; }
  catch(e){ return ""; }
}
function setUserName(name) {
  try { localStorage.setItem(WILLAS_USER_NAME_STORAGE, (name || "").trim()); } catch(e){}
}

// ─── Phase B: per-thread conversation IDs (2026-05-18) ──────────
// Server-side Supabase persistence is the source of truth, but the
// client caches the conversation ID per thread so subsequent turns
// in the same thread stay attached to the right conversation. Keyed
// by "{agentType}:{contextId || 'global'}" — e.g. "studio_riff:st_abc".
const WILLAS_CONV_IDS_STORAGE = "willas-conversation-ids";
function loadConvIds() {
  try { return JSON.parse(localStorage.getItem(WILLAS_CONV_IDS_STORAGE) || "{}"); }
  catch(e){ return {}; }
}
function saveConvIds(map) {
  try { localStorage.setItem(WILLAS_CONV_IDS_STORAGE, JSON.stringify(map)); } catch(e){}
}
function getConversationId(agentType, contextId) {
  if (!agentType) return null;
  const map = loadConvIds();
  return map[`${agentType}:${contextId || 'global'}`] || null;
}
function setConversationId(agentType, contextId, id) {
  if (!agentType || !id) return;
  const map = loadConvIds();
  map[`${agentType}:${contextId || 'global'}`] = id;
  saveConvIds(map);
}

// Streaming call to Claude — yields text chunks as they arrive. Callers use:
//   for await (const chunk of streamStrategist({messages})) { append(chunk); }
//
// Phase C (2026-05-18): now routes through /api/strategist Vercel Edge proxy
// instead of hitting api.anthropic.com directly. The proxy holds Christina's
// API key server-side via ANTHROPIC_API_KEY env var. Same SSE shape — only
// the URL + headers changed.
async function* streamStrategist({
  messages, systemExtras = [], model = "claude-sonnet-4-6", maxTokens = 2000, enableWebSearch = true,
  // Phase B (2026-05-18): when these are passed, the server persists each
  // turn to Supabase as a conversation. agentType is the routing key
  // (which UI surface this chat lives in); contextId optionally pins to
  // a specific sticky or brief.
  agentType = null, contextId = null
}) {
  // Look up the existing conversation ID for this thread (or null on first turn)
  const conversationId = agentType ? getConversationId(agentType, contextId) : null;

  const body = {
    messages,
    model,
    maxTokens,
    enableWebSearch,
    systemExtras: [
      { type: "text", text: STRATEGIST_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
      { type: "text", text: buildWeekContext(), cache_control: { type: "ephemeral" } },
      ...systemExtras
    ],
    // Phase B persistence fields — server uses these to attach turns to
    // the right conversation row. clientId is hardcoded for now since
    // this engine is Willa's-specific; multi-tenant routing happens at
    // the data layer (each client's engine ships its own deployment).
    clientId: "willas",
    agentType,
    contextId,
    userLabel: getUserName() || null,
    conversationId
  };

  const res = await fetch("/api/strategist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  // Capture the conversation ID returned by the server (it generates one
  // on the first turn of a new thread, then echoes it back on subsequent
  // turns). Stash it so next turn pins to the same conversation.
  if (agentType) {
    const newConvId = res.headers.get("X-Conversation-Id");
    if (newConvId && newConvId !== conversationId) {
      setConversationId(agentType, contextId, newConvId);
    }
  }

  if (!res.ok) {
    let detail = "";
    try { detail = await res.text(); } catch(e){}
    throw new Error(`API_${res.status}: ${detail.slice(0, 200)}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      const l = line.trim();
      if (!l.startsWith("data:")) continue;
      const payload = l.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const evt = JSON.parse(payload);
        // Regular text tokens
        if (evt.type === "content_block_delta" && evt.delta && evt.delta.type === "text_delta") {
          yield evt.delta.text;
        }
        // Web search tool-use: yield a soft indicator so the UI can show
        // "searching the web…" without dumping raw tool machinery on the user.
        // Anthropic runs the search server-side and splices results back into
        // the model's context — we just need to hint at what's happening.
        if (evt.type === "content_block_start" && evt.content_block && evt.content_block.type === "server_tool_use" && evt.content_block.name === "web_search") {
          yield "\n\n*🔍 searching the web…*\n\n";
        }
      } catch (e) { /* swallow partial frames */ }
    }
  }
}

// ──────────────────────────────────────────────────────────
// COMPONENTS
// ──────────────────────────────────────────────────────────

function PillarBadge({name}){
  const c = PILLAR_COLORS[name] || "#202A44";
  return <span className="font-mono text-[9px] tracking-wider px-1.5 py-[2px] rounded" style={{color:c, background:c+"12", border:"1px solid "+c+"33"}}>{name}</span>;
}

// Single-chip DNA tag — lightweight surface of Top-Performer DNA on brief cards.
// Engine-side rules live in CLAUDE.md; the chip is the only team-facing surface.
function DnaChip({patternId, size}){
  const d = DNA_BY_ID[patternId];
  if(!d) return null;
  const sm = size === "sm";
  return (
    <span
      className={"inline-flex items-center gap-1 font-mono tracking-wider rounded "+(sm?"text-[8px] px-1 py-[1px]":"text-[9px] px-1.5 py-[2px]")}
      style={{color:d.tagColor, background:d.tagColor+"12", border:"1px solid "+d.tagColor+"33"}}
      title={"DNA: "+d.name+" — "+d.description}>
      <span className={sm?"text-[9px]":"text-[10px]"}>{d.icon}</span>
      {d.name.toUpperCase()}
    </span>
  );
}

function AgentStamp({agentId, extra}){
  const a = AGENT_BY_ID[agentId];
  if(!a) return null;
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-wider" style={{color:a.color}}>
      <span className="inline-block w-[6px] h-[6px] rounded-full" style={{background:a.color}}></span>
      {a.name.toUpperCase()}{extra ? <span className="text-[var(--muted)]"> · {extra}</span> : null}
    </span>
  );
}

function AgentChip({agent, big}){
  return (
    <div className="card p-3 flex items-start gap-2.5" title={agent.role}>
      <span className="inline-block w-[8px] h-[8px] rounded-full mt-1.5 shrink-0" style={{background:agent.color, boxShadow:`0 0 0 3px ${agent.color}22`}}></span>
      <div className="min-w-0">
        <div className="font-mono text-[10px] tracking-wider" style={{color:agent.color}}>{agent.name.toUpperCase()}</div>
        <div className="text-[11px] text-[#334155] leading-snug mt-0.5">{agent.role}</div>
        <div className="font-mono text-[9px] text-[var(--muted)] mt-1.5">LAST RUN · {agent.lastRun.toUpperCase()} · {agent.signals} {agent.id==="editor"?"KILLED":agent.id==="composer"||agent.id==="visual"||agent.id==="hook"?"OUTPUTS":"SCANNED"}</div>
      </div>
    </div>
  );
}

function EngineDrawer({open, onClose}){
  if(!open) return null;
  return (
    <div className="border-b border-[var(--border)] bg-white fade-in">
      <div className="px-8 py-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="font-mono text-[10px] tracking-wider text-[var(--ink)]">ENGINE STATUS · {AGENTS.length} AGENTS · {DECISIONS.length} AUTONOMOUS DECISIONS THIS WEEK</div>
            <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mt-1">{SCANNED_TOTAL} SIGNALS SCANNED · {SURFACED_TOTAL} SURFACED · {KILLED_TOTAL} KILLED BY CULTURAL EDITOR</div>
          </div>
          <button onClick={onClose} className="font-mono text-[10px] tracking-wider text-[var(--muted)] hover:text-[var(--ink)]">CLOSE ✕</button>
        </div>
        <div className="grid grid-cols-12 gap-5 mb-5">
          <div className="col-span-7">
            <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-2">YOUR INVISIBLE TEAM · {AGENTS.length} SPECIALIZED AGENTS</div>
            <div className="grid grid-cols-3 gap-2">
              {AGENTS.map(a=><AgentChip key={a.id} agent={a}/>)}
            </div>
          </div>
          <div className="col-span-5">
            <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-2">WHAT THE ENGINE DECIDED THIS WEEK · {DECISIONS.length} AUTONOMOUS CALLS</div>
            <div className="card p-3 max-h-[420px] overflow-y-auto scrollbar">
              <div className="grid gap-2">
                {DECISIONS.map((d,i)=>{
                  const a = AGENT_BY_ID[d.agent];
                  return (
                    <div key={i} className="flex gap-2.5 items-start pb-2.5 border-b border-[var(--border)] last:border-0 last:pb-0">
                      <span className="font-serif text-[16px] leading-none w-4 text-center shrink-0" style={{color:a.color}}>{d.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11.5px] text-[#202A44] leading-snug font-medium">{d.title}</div>
                        <div className="font-mono text-[9px] text-[var(--muted)] mt-0.5">→ {d.reason}</div>
                        <div className="font-mono text-[8.5px] tracking-wider mt-1" style={{color:a.color}}>{a.name.toUpperCase()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-2">SIGNALS WE KILLED · {KILLED.length} EXAMPLES OF WHAT THE ENGINE SAID NO TO</div>
          <div className="card p-3">
            <div className="grid grid-cols-2 gap-2">
              {KILLED.map((k,i)=>(
                <div key={i} className="pb-2 border-b border-[var(--border)] last:border-0 last:pb-0">
                  <div className="text-[11px] text-[#202A44] leading-snug">{k.signal}</div>
                  <div className="font-mono text-[9px] text-[var(--muted)] mt-0.5">→ {k.reason}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Integration Hub */}
        <div>
          <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-2">CONNECTED · THE DEPARTMENT RUNS INSIDE YOUR STACK</div>
          <div className="card p-3">
            <div className="flex flex-wrap items-center gap-2">
              {INTEGRATIONS.map((i,k)=>(
                <div key={k} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-[var(--border)]" style={i.status==="connected"?{background:"#F6FBF8"}:{background:"#FAFAF7"}} title={i.use}>
                  <span className="inline-block w-[6px] h-[6px] rounded-full" style={{background:i.status==="connected"?"#75C596":"#9E652E"}}></span>
                  <span className="font-mono text-[10px] tracking-wider text-[#202A44]">{i.name}</span>
                  <span className="font-mono text-[8.5px] tracking-wider uppercase" style={{color:i.status==="connected"?"#75C596":"#9E652E"}}>· {i.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── The Product Gap table ─────────────────────────────────
const PRODUCT_GAP = [
  {brand:"Oatly",          sugar:"7g",  ingr:"12", canola:"YES", organic:"NO",  glyphosate:"NO",  gums:"YES"},
  {brand:"Califia Farms",  sugar:"7g",  ingr:"10", canola:"NO",  organic:"PARTIAL", glyphosate:"NO", gums:"YES"},
  {brand:"Planet Oat",     sugar:"8g",  ingr:"11", canola:"YES", organic:"NO",  glyphosate:"NO",  gums:"YES"},
  {brand:"Chobani Oat",    sugar:"7g",  ingr:"9",  canola:"NO",  organic:"NO",  glyphosate:"NO",  gums:"YES"},
  {brand:"Elmhurst 1925",  sugar:"5g",  ingr:"6",  canola:"NO",  organic:"NO",  glyphosate:"NO",  gums:"NO"},
  {brand:"Willa's",        sugar:"<1g", ingr:"4",  canola:"NO",  organic:"USDA", glyphosate:"CERTIFIED", gums:"NO", us:true}
];
function gapCell(v, kind){
  // green if "good", red if "bad"
  const good = ["NO","USDA","CERTIFIED","<1g","4","5g","6"];
  const bad  = ["YES","PARTIAL","7g","8g","9","10","11","12"];
  let color = "#64748B";
  if(good.includes(v)) color = "#75C596";
  if(bad.includes(v))  color = "#DC2626";
  return <td className="px-3 py-2.5 text-center font-mono text-[11px]" style={{color}}>{v}</td>;
}
function MockBanner({title, prod}){
  return (
    <div className="card mb-4 px-5 py-3 flex items-center justify-between gap-4" style={{background:"#FFFBEB", borderColor:"#FDE68A"}}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-wider px-2 py-1 rounded text-white shrink-0" style={{background:"#9E652E"}}>DEMO DATA</span>
        <div className="font-mono text-[10px] tracking-wider text-[#92400E]">{title}</div>
      </div>
      <div className="font-mono text-[9px] tracking-wider text-[#92400E] text-right">PRODUCTION → {prod}</div>
    </div>
  );
}

// Prominent tab-level "under construction" banner — used for WIP surfaces (Brand Ambassadors, Performance).
// More visible than MockBanner: full stripe at top of tab, bigger type, construction iconography.
function UnderConstructionBanner({tag, subtitle, summary, apisPlanned, comingSoon}){
  const chipLabel = tag || "UNDER CONSTRUCTION";
  const sub = subtitle || "THIS TAB IS A PREVIEW · DATA IS ILLUSTRATIVE";
  const footer = comingSoon
    ? {label:"COMING SOON →", text:comingSoon}
    : {label:"PRODUCTION WIRES UP →", text:apisPlanned};
  return (
    <div className="mb-5 rounded-lg overflow-hidden fade-in" style={{border:"2px solid #F59E0B"}}>
      <div className="flex items-stretch">
        <div className="flex items-center justify-center px-4 shrink-0" style={{background:"repeating-linear-gradient(45deg, #F59E0B 0 12px, #202A44 12px 24px)"}}>
          <span className="text-[22px]">🚧</span>
        </div>
        <div className="flex-1 px-5 py-4" style={{background:"#FFFBEB"}}>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded text-white" style={{background:"#F59E0B"}}>{chipLabel}</span>
            <span className="font-mono text-[10px] tracking-wider text-[#92400E]">{sub}</span>
          </div>
          <p className="text-[12.5px] text-[#78350F] leading-snug mb-1.5">{summary}</p>
          {footer.text && <p className="font-mono text-[9px] tracking-wider text-[#92400E]">{footer.label} {footer.text}</p>}
        </div>
      </div>
    </div>
  );
}

function MockBadge({tip}){
  return (
    <span title={tip||"Demo data — production pulls from real APIs"} className="font-mono text-[8.5px] tracking-wider px-1.5 py-0.5 rounded cursor-help" style={{background:"#FEF3C7", color:"#92400E", border:"1px solid #FDE68A"}}>DEMO DATA</span>
  );
}

function ShareOfVoice(){
  const max = Math.max(...SHARE_OF_VOICE.map(s=>s.pct));
  const methodology = "How this is calculated:\n\nBranded mentions across TikTok, Instagram, X/Threads, Reddit (r/oatmilk, r/nutrition, r/parenting), trade press (BevNET, Food Dive, FoodNavigator), and Google News — last 14 days.\n\nDeduplicated by post ID, weighted by reach. Each mention is attributed to the brand whose name, handle, or product appears in the content.\n\nDATA SOURCES · Trend Scanner + Competitive Radar agents\nUPDATE CADENCE · daily, compiled weekly\nPRODUCTION · pulls from Brandwatch, Sprinklr, or native APIs.";
  return (
    <div className="card p-5 h-full">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">SHARE OF VOICE · 14 DAYS</span>
          <span title={methodology} className="inline-flex items-center justify-center w-[12px] h-[12px] rounded-full border border-[var(--border)] bg-white font-mono text-[9px] text-[var(--muted)] cursor-help hover:border-[#202A44] hover:text-[#202A44] transition">i</span>
          <MockBadge tip="Demo numbers — production pulls from Brandwatch, Sprinklr, or Trend Scanner agent's social listening pipeline."/>
        </div>
        <div className="font-mono text-[9px] tracking-wider text-[var(--green)] shrink-0">↑ 4.2× ENGAGEMENT</div>
      </div>
      <div className="grid gap-2">
        {SHARE_OF_VOICE.map(s=>(
          <div key={s.brand}>
            <div className="flex items-center justify-between mb-0.5">
              <span className={"text-[12px] "+(s.us?"font-semibold text-[#202A44]":"text-[#334155]")}>
                {s.brand}{s.us?" ★":""}
              </span>
              <span className="font-mono text-[10px] tracking-wider text-[var(--muted)]">{s.pct}%</span>
            </div>
            <div className="h-[6px] rounded-full bg-[#F1F5F9] overflow-hidden">
              <div className="h-full rounded-full" style={{width:(s.pct/max*100)+"%", background:s.color}}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompetitorCalendar(){
  return (
    <div className="card p-5">
      <div className="grid gap-2.5">
        {COMPETITOR_CALENDAR.map((e,i)=>(
          <div key={i} className="flex gap-3 items-start pb-2.5 border-b border-[var(--border)] last:border-0 last:pb-0">
            <div className="font-mono text-[10px] tracking-wider w-[80px] shrink-0" style={{color:"#202A44"}}>{e.date}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] text-[#202A44] leading-snug font-medium">{e.event}</div>
              <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mt-0.5">{e.brand.toUpperCase()} · {e.impact}</div>
            </div>
            <span className="font-mono text-[8.5px] tracking-wider px-1.5 py-0.5 rounded shrink-0" style={e.confirmed?{background:"#F6FBF8",color:"#75C596",border:"1px solid #D1F0E0"}:{background:"#FAFAF7",color:"#9E652E",border:"1px solid #FDE68A"}}>{e.confirmed?"CONFIRMED":"EXPECTED"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentMovesTimeline({nav}){
  return (
    <div className="card p-5 h-full">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">TIMELINE · CLICK A MOVE TO TRACE IT</span>
        <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">{COMPETITOR_TIMELINE.length} EVENTS</span>
      </div>
      <div className="grid gap-3 max-h-[420px] overflow-y-auto scrollbar pr-2">
        {COMPETITOR_TIMELINE.map((m,i)=>{
          const c = COMP_BY_ID[m.compId];
          const tone = c && c.direction==="down" ? "#DC2626" : c && c.direction==="up" ? "#75C596" : "#64748B";
          return (
            <button key={i} onClick={()=>nav.goToComp(m.compId)} className="text-left flex gap-4 items-start pb-3 border-b border-[var(--border)] last:border-0 last:pb-0 hover:bg-[#FAFAF7] rounded transition px-1 -mx-1">
              <div className="w-[60px] shrink-0">
                <div className="font-mono text-[10px] tracking-wider text-[var(--ink)]">{m.date.toUpperCase()}</div>
              </div>
              <div className="w-[110px] shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-[6px] h-[6px] rounded-full shrink-0" style={{background:tone}}></span>
                  <span className="font-mono text-[10px] tracking-wider" style={{color:tone}}>{m.brand.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] text-[#202A44] leading-snug font-medium">{m.action}</div>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mt-1">→ {m.note}</div>
              </div>
              <span className="font-mono text-[10px] text-[var(--muted)] shrink-0">↗</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProductGapTable(){
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="font-mono text-[10px] tracking-[0.18em] text-[#202A44] mb-0.5">THE SHELF</div>
          <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">Every oat milk · every dimension · Willa's wins the row</div>
        </div>
        <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">PUBLIC LABELS · APR 2026</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-left border-b border-[var(--border)]">
              <th className="px-3 py-2 font-mono text-[9px] tracking-wider text-[var(--muted)]">BRAND</th>
              <th className="px-3 py-2 font-mono text-[9px] tracking-wider text-[var(--muted)] text-center">SUGAR / CUP</th>
              <th className="px-3 py-2 font-mono text-[9px] tracking-wider text-[var(--muted)] text-center">INGREDIENTS</th>
              <th className="px-3 py-2 font-mono text-[9px] tracking-wider text-[var(--muted)] text-center">SEED OILS</th>
              <th className="px-3 py-2 font-mono text-[9px] tracking-wider text-[var(--muted)] text-center">ORGANIC</th>
              <th className="px-3 py-2 font-mono text-[9px] tracking-wider text-[var(--muted)] text-center">GLYPHOSATE-FREE</th>
              <th className="px-3 py-2 font-mono text-[9px] tracking-wider text-[var(--muted)] text-center">GUMS</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCT_GAP.map((row,i)=>(
              <tr key={i} className="border-b border-[var(--border)] last:border-0" style={row.us?{background:"#F6FBF8"}:{}}>
                <td className="px-3 py-2.5">
                  <span className={"font-serif text-[14px] "+(row.us?"font-semibold":"")}>{row.brand}</span>
                  {row.us && <span className="ml-2 font-mono text-[8.5px] tracking-wider text-[var(--green)]">★ US</span>}
                </td>
                {gapCell(row.sugar)}
                {gapCell(row.ingr)}
                {gapCell(row.canola)}
                {gapCell(row.organic)}
                {gapCell(row.glyphosate)}
                {gapCell(row.gums)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HowItWorksAgentCard({agent, selected, onClick}){
  return (
    <button onClick={onClick} className={"text-left w-full p-3 rounded-md border transition "+(selected?"border-[#202A44] bg-white shadow-sm":"border-[var(--border)] bg-[#FAFAF7] hover:bg-white hover:border-[#cfcfc8]")}>
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-block w-[8px] h-[8px] rounded-full shrink-0" style={{background:agent.color}}></span>
        <span className="font-mono text-[9.5px] tracking-wider" style={{color:agent.color}}>{agent.name.toUpperCase()}</span>
      </div>
      <div className="text-[11px] text-[#334155] leading-snug">{agent.role}</div>
    </button>
  );
}

// Reference library — the DNA patterns + benefit shorthand stingers that every
// brief is built against. Used to live in the Cultural Pulse tab, moved here
// 2026-04-17 because it's cross-cutting reference material, not pulse content.
// Triggered from a sidebar button so it's always one click away regardless of
// which tab the user is on.
function ReferenceGuide({open, onClose}){
  useEffect(()=>{
    if(!open) return;
    const onKey = e => { if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return ()=>{ window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  },[open,onClose]);

  if(!open) return null;
  return (
    <div className="fixed inset-0 z-[70] fade-in flex items-start justify-center px-4 py-6 md:py-10 overflow-y-auto scrollbar"
      style={{background:"rgba(15,23,42,0.55)", backdropFilter:"blur(3px)"}}
      onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[1000px] relative my-auto overflow-hidden"
        style={{border:"1px solid var(--border)"}}
        onClick={e=>e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[var(--ink)] bg-white border border-[var(--border)] hover:bg-[#F6F6F0] transition z-10"
          aria-label="Close reference">
          <span className="text-[18px] leading-none">×</span>
        </button>

        <div className="px-7 pt-6 pb-5 border-b border-[var(--border)]">
          <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--muted)] mb-1.5">THE FIELD GUIDE 🌾</div>
          <h2 className="font-serif text-[26px] leading-tight tracking-tight">What works for Willa's</h2>
          <p className="text-[12px] text-[var(--muted)] mt-1.5 max-w-2xl leading-relaxed">Seven hero formats that win for Willa's, and twelve stingers we keep in the back pocket. Every brief the engine ships pulls from these — that's how every post stays Willa's, no matter who's writing it.</p>
        </div>

        <div className="px-7 py-6">
          {/* DNA library */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-[#202A44]">PROVEN FORMATS</div>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mt-0.5">7 hero formats the engine briefs against · each brief gets one</div>
              </div>
              <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">{TOP_PERFORMER_DNA.length} FORMATS</div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {TOP_PERFORMER_DNA.map(d=><DnaCard key={d.id} d={d}/>)}
            </div>
          </div>

          {/* Benefit shorthand */}
          <div>
            <div className="flex items-center justify-between mb-3 pt-5 border-t border-[var(--border)]">
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-[#202A44]">BENEFIT SHORTHAND</div>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mt-0.5">2–3 second stingers for end cards, Pinterest overlays, caption sign-offs</div>
              </div>
              <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">{BENEFIT_SHORTHAND.length} LINES</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {BENEFIT_SHORTHAND.map(b=>(
                <div key={b.id} className="rounded-md p-3 border border-[var(--border)] bg-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[8.5px] tracking-wider text-[var(--muted)]">{b.category}</span>
                    <span className="font-mono text-[8.5px] tracking-wider text-[#9E652E]">{b.duration.replace("s"," sec")}</span>
                  </div>
                  <p className="font-serif text-[14px] leading-snug text-[#202A44] mb-2">"{b.line}"</p>
                  <div className="flex flex-wrap gap-1">
                    {b.useWith.map(f=>(
                      <span key={f} className="font-mono text-[8px] tracking-wider px-1.5 py-[1px] rounded bg-[#F1F5F9] text-[#475569]">{f.toUpperCase()}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// COMMAND PALETTE (⌘K)
// Searchable index across every entity in the engine + quick-nav actions.
// Triggered via ⌘K from anywhere, via the 🔍 button in the top-right, or via
// the ⌘K hint in the sidebar footer. Turns the tool from a tab-based dashboard
// into a responsive craft tool — power users never have to click a nav item
// again. Added 2026-04-19.
// ════════════════════════════════════════════════════════════════════════

const CMD_TYPE_META = {
  ACTION:     {label:"NAVIGATE",   color:"#202A44", order:0},
  TREND:      {label:"TREND",      color:"#73B2C9", order:1},
  PULSE:      {label:"PULSE",      color:"#9E652E", order:2},
  BRIEF:      {label:"BRIEF",      color:"#75C596", order:3},
  COMPETITOR: {label:"COMPETITOR", color:"#DC2626", order:4},
  STUDIO:     {label:"STUDIO",     color:"#A191B2", order:5}
};

function buildCommandIndex(stickies){
  const items = [];
  // Fixed navigation actions — always available
  [
    {id:"act-studio",     label:"Open the Studio",         sub:"Riff on a link, photo, or idea",    action:"studio"},
    {id:"act-briefs",     label:"Content Briefs",          sub:"This week's brief queue",            action:"briefs"},
    {id:"act-intel",      label:"Intelligence Brief",      sub:"Trends · Pulse · Competitor",        action:"intel"},
    {id:"act-pulse",      label:"Cultural Pulse",          sub:"Memes, news, misinformation",        action:"pulse"},
    {id:"act-trends",     label:"Category + Policy",       sub:"Signals + Willa's angles",           action:"trends"},
    {id:"act-comp",       label:"Competitor Watch",        sub:"What they did · what's coming",      action:"comp"},
    {id:"act-playbook",   label:"Content Calendar",        sub:"When + where each brief ships",       action:"playbook"},
    {id:"act-highlights", label:"This week's highlights",  sub:"The read + 5 signals",               action:"highlights"},
    {id:"act-reference",  label:"Proven formats",          sub:"DNA + benefit shorthand",            action:"reference"},
    {id:"act-howitworks", label:"How it works",            sub:"Meet the agents",                    action:"howitworks"},
    {id:"act-engine",     label:"Engine activity",         sub:"Agent drawer",                       action:"engine"}
  ].forEach(a => items.push({type:"ACTION", ...a}));
  TRENDS.forEach(t => items.push({type:"TREND", id:t.id, label:t.trend, sub:t.urgency+" · "+(t.pillars||[]).join(" · "), data:t}));
  CULTURAL_PULSE.forEach(p => items.push({type:"PULSE", id:p.id, label:p.hook, sub:p.type+" · "+p.platform, data:p}));
  BRIEFS.forEach(b => items.push({type:"BRIEF", id:b.id, label:b.concept, sub:b.platform+" · "+b.pillar+" · "+b.priority, data:b}));
  COMPETITORS.forEach(c => items.push({type:"COMPETITOR", id:c.id, label:c.name, sub:c.status.slice(0,80), data:c}));
  (stickies||[]).forEach(s => {
    const label = s.type === "link" ? (s.url || "dropped link") : s.type === "note" ? (s.content || "note") : (s.source || "photo");
    items.push({type:"STUDIO", id:s.id, label: label.slice(0,120), sub:"Studio sticky · "+s.type, data:s});
  });
  return items;
}

function filterCommandIndex(items, query){
  if(!query || !query.trim()){
    // Show actions first when empty, plus a few of each other type so the palette
    // never feels empty on first open
    return items.filter(i => i.type === "ACTION").slice(0, 12);
  }
  const q = query.toLowerCase();
  return items
    .map(item => {
      const label = (item.label || "").toLowerCase();
      const sub = (item.sub || "").toLowerCase();
      const labelIdx = label.indexOf(q);
      const subIdx = sub.indexOf(q);
      if(labelIdx === -1 && subIdx === -1) return null;
      // Earlier match + label match > sub match
      const score = labelIdx !== -1 ? (1000 - labelIdx) : (500 - subIdx);
      return {...item, _score: score};
    })
    .filter(x => x !== null)
    .sort((a,b) => b._score - a._score)
    .slice(0, 40);
}

function groupCommandResults(filtered){
  const groups = {};
  filtered.forEach(item => {
    if(!groups[item.type]) groups[item.type] = {type:item.type, items:[]};
    groups[item.type].items.push(item);
  });
  return Object.values(groups).sort((a,b) => (CMD_TYPE_META[a.type].order - CMD_TYPE_META[b.type].order));
}

function CommandPalette({open, onClose, index, onSelect}){
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const listRef = React.useRef();

  const filtered = useMemo(() => filterCommandIndex(index, query), [index, query]);
  const groups   = useMemo(() => groupCommandResults(filtered), [filtered]);
  // Flatten groups back to a sequential list so arrow keys walk through them in render order
  const flatItems = useMemo(() => groups.flatMap(g => g.items), [groups]);

  // Reset state when opening or when query changes
  useEffect(() => { if(open){ setQuery(""); setActiveIdx(0); } }, [open]);
  useEffect(() => { setActiveIdx(0); }, [query]);

  // Keyboard — arrows, Enter, Escape
  useEffect(() => {
    if(!open) return;
    const onKey = (e) => {
      if(e.key === "Escape"){ e.preventDefault(); onClose(); }
      else if(e.key === "ArrowDown"){ e.preventDefault(); setActiveIdx(i => Math.min(i+1, flatItems.length-1)); }
      else if(e.key === "ArrowUp"){ e.preventDefault(); setActiveIdx(i => Math.max(i-1, 0)); }
      else if(e.key === "Enter"){
        e.preventDefault();
        const item = flatItems[activeIdx];
        if(item) onSelect(item);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flatItems, activeIdx, onClose, onSelect]);

  // Body scroll lock
  useEffect(() => {
    if(!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if(!open) return null;

  // Compute each item's index in the flattened list so highlight + mouse-hover match keyboard nav
  const idxMap = new Map();
  flatItems.forEach((it, i) => idxMap.set(it.type+":"+it.id, i));

  return (
    <div className="fixed inset-0 z-[90] fade-in flex items-start justify-center pt-[12vh] px-4"
      style={{background:"rgba(15,23,42,0.45)", backdropFilter:"blur(3px)"}}
      onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[640px] overflow-hidden"
        style={{border:"1px solid var(--border)"}}
        onClick={e=>e.stopPropagation()}>

        {/* Input */}
        <div className="border-b border-[var(--border)] flex items-center gap-3 px-5 py-3.5">
          <span className="text-[16px] opacity-70">🔍</span>
          <input autoFocus value={query} onChange={e=>setQuery(e.target.value)}
            placeholder="Search trends, briefs, competitors, or type a nav command…"
            className="flex-1 text-[14px] bg-transparent focus:outline-none text-[#202A44] placeholder:text-[var(--muted)]"/>
          <span className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] px-1.5 py-[2px] rounded border border-[var(--border)] shrink-0">ESC</span>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto scrollbar">
          {groups.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-1">NO RESULTS</div>
              <div className="text-[12.5px] text-[var(--muted)]">Try a different search, or press ESC to close.</div>
            </div>
          ) : groups.map(group => {
            const meta = CMD_TYPE_META[group.type];
            return (
              <div key={group.type}>
                <div className="font-mono text-[8.5px] tracking-[0.18em] text-[var(--muted)] px-5 pt-3 pb-1.5 bg-white border-b border-[var(--border)]">
                  {meta.label} · {group.items.length}
                </div>
                {group.items.map(item => {
                  const idx = idxMap.get(item.type+":"+item.id);
                  const active = idx === activeIdx;
                  return (
                    <button key={item.id}
                      onClick={() => onSelect(item)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={"w-full text-left px-5 py-2.5 flex items-center gap-3 transition border-b border-[var(--border)] last:border-b-0 "+(active?"bg-[#FFFEF7]":"hover:bg-[#FAFAF7]")}>
                      <span className="font-mono text-[8.5px] tracking-wider px-1.5 py-[2px] rounded shrink-0"
                        style={{color: meta.color, background: meta.color+"14", border:"1px solid "+meta.color+"33"}}>
                        {meta.label}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] text-[#202A44] truncate leading-snug">{item.label}</div>
                        {item.sub && <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] truncate mt-0.5">{item.sub}</div>}
                      </div>
                      {active && <span className="font-mono text-[8.5px] tracking-wider text-[var(--ink)] shrink-0">OPEN ↵</span>}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-2.5 border-t border-[var(--border)] flex items-center justify-between text-[var(--muted)]" style={{background:"#FAFAF7"}}>
          <div className="font-mono text-[8.5px] tracking-wider flex items-center gap-3">
            <span>↑↓ NAVIGATE</span>
            <span>↵ OPEN</span>
            <span>ESC CLOSE</span>
          </div>
          <div className="font-mono text-[8.5px] tracking-wider">{flatItems.length} RESULTS</div>
        </div>
      </div>
    </div>
  );
}

function HowItWorks({open, onClose}){
  const [selectedId,setSelectedId] = useState("trend");
  const intervalRef = React.useRef(null);

  useEffect(()=>{
    if(!open) return;
    setSelectedId(AGENTS[0].id);
    let i = 0;
    intervalRef.current = setInterval(()=>{
      i += 1;
      if(i >= AGENTS.length){
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }
      setSelectedId(AGENTS[i].id);
    }, 1800);
    return ()=>{ if(intervalRef.current) clearInterval(intervalRef.current); };
  }, [open]);

  function selectAgent(id){
    if(intervalRef.current){ clearInterval(intervalRef.current); intervalRef.current = null; }
    setSelectedId(id);
  }

  if(!open) return null;
  const selected = AGENT_BY_ID[selectedId];
  const details = AGENT_DETAILS[selectedId];
  const leads = ["Strategy","Creative","Media","Analytics"];
  const leadDescriptions = {
    Strategy: "Finds the signal. Gates it. Protects taste.",
    Creative: "Turns the signal into shootable content.",
    Media: "Plans paid spend and earned outreach. Gets the work in front of people.",
    Analytics: "Measures what worked. Feeds it back."
  };

  return (
    <div className="fixed inset-0 z-50 fade-in" style={{background:"rgba(15,23,42,0.35)"}} onClick={onClose}>
      <div className="absolute inset-6 bg-[var(--bg)] rounded-xl overflow-hidden flex flex-col" style={{border:"1px solid var(--border)"}} onClick={e=>e.stopPropagation()}>
        <div className="px-8 py-5 border-b border-[var(--border)] bg-white flex items-start justify-between">
          <div>
            <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-1">HOW IT WORKS</div>
            <h2 className="font-serif text-[28px] leading-none tracking-tight">A self-driving social department. Not a dashboard.</h2>
            <p className="text-[12px] text-[var(--muted)] mt-2 max-w-2xl">{AGENTS.length} specialized agents, 4 leads, 1 command layer. Click any agent to see what it scrapes, what it decides, and who it hands off to.</p>
          </div>
          <button onClick={onClose} className="font-mono text-[10px] tracking-wider text-[var(--muted)] hover:text-[var(--ink)] px-3 py-2 border border-[var(--border)] rounded bg-white">CLOSE ✕</button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar">
          <div className="px-8 py-7 max-w-[1300px] mx-auto">
            <div className="flex justify-center mb-1">
              <div className="card p-4 w-[340px] text-center" style={{background:"#FFFEF7",borderColor:"#E8E1C2"}}>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-1">COMMAND LAYER</div>
                <div className="font-serif text-[18px] tracking-tight">Head of Social</div>
                <div className="text-[11px] text-[#334155] leading-snug mt-1">Orchestrates the full pipeline. Reports to you.</div>
              </div>
            </div>
            <div className="flex justify-center"><div className="w-px h-6 bg-[var(--border)]"></div></div>

            <div className="grid grid-cols-4 gap-4">
              {leads.map(lead=>(
                <div key={lead} className="text-center">
                  <div className="card p-3" style={{background:"#F1F5F9"}}>
                    <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-0.5">LEAD</div>
                    <div className="font-serif text-[15px] tracking-tight">{lead}</div>
                    <div className="text-[10.5px] text-[#334155] leading-snug mt-1">{leadDescriptions[lead]}</div>
                  </div>
                  <div className="flex justify-center"><div className="w-px h-5 bg-[var(--border)]"></div></div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {leads.map(lead=>{
                const leadAgents = AGENTS.filter(a=>a.lead===lead);
                return (
                  <div key={lead} className="grid gap-2">
                    {leadAgents.map(a=>(
                      <HowItWorksAgentCard key={a.id} agent={a} selected={a.id===selectedId} onClick={()=>selectAgent(a.id)}/>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="card p-6 fade-in" key={selectedId}>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block w-[10px] h-[10px] rounded-full" style={{background:selected.color}}></span>
                  <span className="font-mono text-[10px] tracking-wider" style={{color:selected.color}}>{selected.name.toUpperCase()}</span>
                  <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">· {selected.lead.toUpperCase()} LEAD</span>
                </div>
                <div className="font-serif text-[22px] leading-tight tracking-tight">{selected.role}</div>
              </div>

              <div className="grid grid-cols-3 gap-5 mt-5">
                <div>
                  <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-2">WHAT IT SCRAPES</div>
                  <ul className="space-y-1.5">
                    {details.scrapes.map((s,i)=>(
                      <li key={i} className="text-[11.5px] text-[#334155] leading-snug flex gap-1.5">
                        <span className="text-[var(--muted)]">—</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-2">WHAT IT DECIDES</div>
                  <p className="text-[12px] text-[#202A44] leading-relaxed">{details.decides}</p>
                </div>
                <div>
                  <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-2">HANDS OFF TO</div>
                  <ul className="space-y-1.5">
                    {details.handsOff.map((h,i)=>(
                      <li key={i} className="text-[11.5px] text-[#202A44] leading-snug flex items-center gap-1.5">
                        <span className="font-mono text-[11px]" style={{color:selected.color}}>→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="font-serif text-[16px] text-[#334155] italic max-w-2xl mx-auto leading-relaxed">9 specialized agents. 4 leads. 1 command layer. Reporting to you, running 24/7, inside your existing stack.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThreadChip({label, sub, color, onClick}){
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-[var(--border)] bg-white hover:bg-[#F6F6F0] transition text-left">
      <span className="inline-block w-[6px] h-[6px] rounded-full shrink-0" style={{background:color||"#202A44"}}></span>
      <div className="leading-tight">
        <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)]">{sub}</div>
        <div className="text-[11px] text-[#202A44]">{label}</div>
      </div>
    </button>
  );
}

function CulturalPulseCard({p, nav}){
  const dna = p.dnaMatch ? DNA_BY_ID[p.dnaMatch] : null;
  const flashed = nav && nav.studioFlash === p.id;
  const briefIds = PULSE_BRIEFS[p.id] || [];
  function toStudio(){
    if(!nav || !nav.sendToStudio) return;
    nav.sendToStudio(p.id, {
      type:"note",
      content: p.hook + " — " + p.detail,
      note: "Willa's Play: " + p.willasPlay + (dna ? "\nFormat: " + dna.name : ""),
      sourceCard: "Cultural Pulse · " + p.type
    });
  }
  return (
    <div id={"card-"+p.id} className="card p-5 fade-in" style={{borderLeft:"3px solid "+p.typeColor}}>
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="font-mono text-[9px] tracking-wider px-1.5 py-[2px] rounded"
            style={{color:p.typeColor, background:p.typeColor+"12", border:"1px solid "+p.typeColor+"33"}}>
            {p.type}
          </span>
          {p.platform && <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">{p.platform.toUpperCase()}</span>}
        </div>
        {nav && nav.sendToStudio && (
          <button onClick={toStudio} title="Send to the Studio to riff on"
            className="font-mono text-[9px] tracking-wider px-2 py-1 rounded border border-[var(--border)] bg-white hover:bg-[#FFFEF7] hover:border-[#E8E1C2] transition shrink-0">
            {flashed ? "→ SENT ✓" : "+ STUDIO"}
          </button>
        )}
      </div>
      <div className="font-serif text-[16px] leading-snug text-[#202A44] mb-2">{p.hook}</div>
      <p className="text-[12px] text-[#64748B] leading-relaxed">{p.detail}</p>

      {/* Willa's play — amber callout box (2026-05-17 visual upgrade per Christina:
          the action line should stand apart from the analytical detail.) */}
      <div className="mt-4 p-3 rounded-md" style={{background:"#FFFBEB", borderLeft:"3px solid var(--amber)"}}>
        <div className="font-mono text-[9px] tracking-[0.18em] mb-1.5" style={{color:"var(--amber)"}}>★ WILLA'S PLAY</div>
        <p className="text-[12.5px] italic text-[#202A44] leading-relaxed">{p.willasPlay}</p>
      </div>

      {briefIds.length>0 && (
        <div className="mt-4 pt-3 border-t border-[var(--border)]">
          <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-2">→ DROVE {briefIds.length} BRIEF{briefIds.length>1?"S":""} THIS WEEK</div>
          <div className="flex flex-wrap gap-1.5">
            {briefIds.map(bId=><BriefThreadChip key={bId} briefId={bId} nav={nav}/>)}
          </div>
        </div>
      )}

      <Sources list={p.sources}/>
    </div>
  );
}

// DNA card — simple face (icon + name + 1 hero example), details behind a click.
function DnaCard({d}){
  const [expanded,setExpanded] = useState(false);
  return (
    <div className="rounded-md p-3.5" style={{background:d.tagColor+"08", border:"1px solid "+d.tagColor+"33"}}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[18px]">{d.icon}</span>
        <span className="font-mono text-[10px] tracking-wider" style={{color:d.tagColor}}>{d.name.toUpperCase()}</span>
      </div>
      <p className="text-[11.5px] text-[#334155] leading-relaxed mb-2">{d.description}</p>
      <p className="text-[11px] italic text-[#475569] leading-snug mb-2">e.g. "{d.exemplars[0]}"</p>
      <button onClick={()=>setExpanded(e=>!e)}
        className="font-mono text-[9px] tracking-wider hover:opacity-70 transition"
        style={{color:d.tagColor}}>
        {expanded ? "− HIDE RULES" : "+ WHEN + RULES"}
      </button>
      {expanded && (
        <div className="mt-2.5 pt-2.5 border-t border-[var(--border)]">
          <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mb-1">WHEN</div>
          <p className="text-[11px] text-[#334155] leading-snug mb-2.5">{d.when}</p>
          <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mb-1">RULES</div>
          <ul className="space-y-0.5">
            {d.rules.map((r,i)=>(
              <li key={i} className="text-[11px] text-[#334155] leading-snug flex gap-1.5">
                <span style={{color:d.tagColor}}>✓</span><span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DnaLibraryPanel(){
  const [open,setOpen] = useState(false);
  return (
    <div className="card fade-in">
      <button onClick={()=>setOpen(o=>!o)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#F6F6F0] transition rounded-[10px]">
        <div>
          <div className="font-serif text-[17px] tracking-tight">Top-Performer DNA</div>
          <div className="text-[11.5px] text-[var(--muted)] mt-0.5">The 7 hero formats the engine briefs against. Each brief gets one of these tags.</div>
        </div>
        <span className="font-mono text-[14px] text-[var(--ink)]">{open?"−":"+"}</span>
      </button>
      {open && (
        <div className="border-t border-[var(--border)] p-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
          {TOP_PERFORMER_DNA.map(d=><DnaCard key={d.id} d={d}/>)}
        </div>
      )}
    </div>
  );
}

function BenefitShorthandPanel(){
  const [open,setOpen] = useState(false);
  return (
    <div className="card fade-in">
      <button onClick={()=>setOpen(o=>!o)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#F6F6F0] transition rounded-[10px]">
        <div>
          <div className="font-serif text-[17px] tracking-tight">Benefit Shorthand</div>
          <div className="text-[11.5px] text-[var(--muted)] mt-0.5">12 quick stingers for end cards, Pinterest overlays, and caption sign-offs.</div>
        </div>
        <span className="font-mono text-[14px] text-[var(--ink)]">{open?"−":"+"}</span>
      </button>
      {open && (
        <div className="border-t border-[var(--border)] p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          {BENEFIT_SHORTHAND.map(b=>(
            <div key={b.id} className="rounded-md p-3 border border-[var(--border)] bg-white">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[8.5px] tracking-wider text-[var(--muted)]">{b.category}</span>
                <span className="font-mono text-[8.5px] tracking-wider text-[#9E652E]">{b.duration.replace("s"," sec")}</span>
              </div>
              <p className="font-serif text-[14px] leading-snug text-[#202A44] mb-2">"{b.line}"</p>
              <div className="flex flex-wrap gap-1">
                {b.useWith.map(f=>(
                  <span key={f} className="font-mono text-[8px] tracking-wider px-1.5 py-[1px] rounded bg-[#F1F5F9] text-[#475569]">{f.toUpperCase()}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Aggregate DNA distribution for a week — used in Content Calendar to surface
// format mix without overwhelming the team with per-brief scorecards.
function FormatMixBar({briefs}){
  const counts = {};
  briefs.forEach(b => { if(b.dnaPattern) counts[b.dnaPattern] = (counts[b.dnaPattern]||0) + 1; });
  const total = Object.values(counts).reduce((a,b)=>a+b,0);
  if(total === 0) return null;
  const ordered = TOP_PERFORMER_DNA.filter(d => counts[d.id]).map(d => ({...d, count: counts[d.id]}));
  return (
    <div className="card px-4 py-3.5">
      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">FORMAT MIX THIS WEEK</div>
        <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">{ordered.length} OF 7 HERO FORMATS</div>
      </div>
      <div className="flex h-[10px] rounded overflow-hidden border border-[var(--border)] mb-2.5">
        {ordered.map(d => (
          <div key={d.id} title={d.name+" — "+d.count+" brief"+(d.count===1?"":"s")}
            style={{background:d.tagColor, width:(d.count/total*100)+"%"}}></div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1.5">
        {ordered.map(d => (
          <div key={d.id} className="flex items-center gap-1.5">
            <span className="inline-block w-[8px] h-[8px] rounded-sm" style={{background:d.tagColor}}></span>
            <span className="text-[10.5px] text-[#334155]">{d.name}</span>
            <span className="font-mono text-[10px] text-[var(--muted)]">· {d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveClock(){
  const now = useLiveClock();
  const {date} = fmtClock(now);
  return (
    <span className="font-mono text-[10px] tracking-wider text-[var(--ink)]">{date.toUpperCase()}</span>
  );
}

function sourceDomain(url){
  try{
    const u = new URL(url);
    return u.hostname.replace(/^www\./,"");
  }catch(e){ return url; }
}

// Sources render quietly inline on every card that has them. No toggles, no
// "+ SHOW N SOURCES" buttons — the brand trust rule is that sourcing is
// always visible, always one click to the original. Labels go into the title
// attribute so hover reveals the full citation without adding visual weight.
function Sources({list, label}){
  if(!list||!list.length) return null;
  return (
    <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="font-mono text-[8.5px] tracking-wider text-[var(--muted)]">{label||"SOURCES"}</span>
      {list.map((s,i)=>(
        <a key={i} href={s.url} target="_blank" rel="noreferrer"
          title={s.label}
          className="src-link font-mono text-[9.5px] tracking-wide">
          {sourceDomain(s.url)}
        </a>
      ))}
    </div>
  );
}

function Sidebar({section,setSection,onHowItWorks,onOpenWelcome,onOpenReference}){
  return (
    <aside className="w-[220px] shrink-0 border-r border-[var(--border)] bg-white flex flex-col">
      <div className="px-5 pt-7 pb-5 border-b border-[var(--border)]">
        <img src="https://i.postimg.cc/R0GsStL8/images.png" alt="Willa's" className="block" style={{maxWidth:"140px", height:"auto"}}/>
        <div className="font-mono text-[9px] text-[var(--muted)] tracking-[0.18em] mt-2">SOCIAL CONTENT ENGINE</div>
      </div>

      {/* "This Week" reopen button — sits above main nav with a warm amber glow
          so it reads as the freshest thing on the page. Pulsing dot signals "new." */}
      <div className="px-3 pt-3">
        <button onClick={onOpenWelcome}
          className="highlights-glow w-full px-3 py-2.5 rounded-md border transition text-left flex items-center justify-between gap-2"
          style={{background:"#FFFEF7", borderColor:"#FACC15"}}>
          <div>
            <div className="font-mono text-[9px] tracking-wider text-[var(--ink)] flex items-center gap-1.5">
              <span className="highlights-pulse"></span>
              THIS WEEK'S HIGHLIGHTS
            </div>
            <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mt-0.5">{WELCOME_WEEK_RANGE}</div>
          </div>
          <span className="font-mono text-[11px] text-[var(--ink)]">↗</span>
        </button>
      </div>

      <nav className="p-2.5 flex flex-col gap-1 mt-2">
        {[
          {id:"intel",label:"Intelligence Brief", icon:"📡", sub:"What happened on the internet this week"},
          {id:"briefs",label:"Content Briefs", icon:"📋", sub:"What Willa's should make + post because of it"},
          {id:"studio",label:"Studio", icon:"✦", sub:"Riff + refine ideas into final posts", sparkle:true},
          {id:"playbook",label:"Content Calendar", icon:"📅", sub:"When + where each brief ships this week"},
          {id:"perf",label:"Performance", icon:"📈", sub:"What shipped last week + what it taught us — coming soon", wip:true, disabled:true},
          {id:"settings",label:"Settings", icon:"⚙️", sub:"Theme, text size, accessibility, account"}
        ].map(n=>(
          <button key={n.id}
            onClick={()=>{ if(!n.disabled) setSection(n.id); }}
            disabled={n.disabled}
            title={n.disabled ? n.sub+" (locked — coming soon)" : n.sub}
            className={"nav-item text-left px-3 py-2 rounded-md flex items-center justify-between gap-2 "+(section===n.id?"active":"")+(n.disabled?" opacity-40 cursor-not-allowed pointer-events-none":"")}>
            <div className="text-[13px] font-medium flex items-center gap-2 flex-1 min-w-0">
              <span className={n.sparkle ? "text-[12px]" : "text-[13px]"}>{n.icon}</span>
              {n.label}
            </div>
            {n.disabled && <span className="font-mono text-[7.5px] tracking-wider px-1 py-[1px] rounded bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] shrink-0">SOON</span>}
            {n.wip && !n.disabled && <span className="font-mono text-[7.5px] tracking-wider px-1 py-[1px] rounded bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] shrink-0">WIP</span>}
            {n.sparkle && !n.wip && !n.disabled && <span className="font-mono text-[7.5px] tracking-wider px-1 py-[1px] rounded text-white shrink-0" style={{background:"#202A44"}}>NEW</span>}
          </button>
        ))}
      </nav>

      <div className="mt-auto"></div>

      {/* Utility buttons — always available, regardless of which tab is active */}
      <div className="px-3 pb-3 grid gap-1.5">
        <button onClick={onOpenReference}
          className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-white hover:bg-[#F6F6F0] transition text-left flex items-center justify-between gap-2">
          <div>
            <div className="font-mono text-[9px] tracking-wider text-[var(--ink)]">PROVEN FORMATS</div>
            <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mt-0.5">{TOP_PERFORMER_DNA.length} formats · {BENEFIT_SHORTHAND.length} stingers</div>
          </div>
          <span className="font-mono text-[10px] text-[var(--muted)]">↗</span>
        </button>
        <button onClick={onHowItWorks}
          className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-white hover:bg-[#F6F6F0] transition text-left flex items-center justify-between gap-2">
          <div>
            <div className="font-mono text-[9px] tracking-wider text-[var(--ink)]">HOW IT WORKS</div>
            <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mt-0.5">{AGENTS.length} agents · 4 leads</div>
          </div>
          <span className="font-mono text-[10px] text-[var(--muted)]">↗</span>
        </button>
      </div>
    </aside>
  );
}

function Ticker(){
  const items = [...TICKER, ...TICKER];
  return (
    <div className="border-b border-[var(--border)] bg-white overflow-hidden">
      <div className="flex items-center">
        <div className="overflow-hidden flex-1">
          <div className="ticker-track py-1.5 font-mono text-[11px]">
            {items.map((t,i)=>{
              const a = AGENT_BY_ID[t.agent];
              return (
                <span key={i} className="flex items-center gap-2">
                  <span className="inline-block w-[6px] h-[6px] rounded-full" style={{background:a.color}}></span>
                  <span style={{color:a.color}}>{a.name.toUpperCase()}</span>
                  <span className="text-[var(--ink)]">· {t.text}</span>
                  <span className="text-[var(--border)] mx-4">◆</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Brief-thread chip — used on Trend + Competitor cards to show lineage downstream
// into the content briefs they drove. Small, quiet, clickable.
function BriefThreadChip({briefId, nav, maxConcept}){
  const b = BRIEF_BY_ID[briefId];
  if(!b) return null;
  return (
    <button onClick={()=>nav.goToBrief(briefId)}
      className="flex items-center gap-1.5 px-2 py-1 rounded border border-[var(--border)] bg-[#FAFAF7] hover:bg-white hover:border-[#202A44] transition text-left">
      <span className="inline-block w-[6px] h-[6px] rounded-full shrink-0" style={{background:b.pillarColor}}></span>
      <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">{b.platform.toUpperCase()}</span>
      <span className="text-[10.5px] text-[#202A44] truncate" style={{maxWidth:(maxConcept||200)+"px"}}>{b.concept}</span>
    </button>
  );
}

function TrendCard({t,focused,nav}){
  const briefIds = TREND_BRIEFS[t.id] || [];
  const flashed = nav.studioFlash === t.id;
  function toStudio(e){
    e.stopPropagation();
    nav.sendToStudio(t.id, {
      type:"note",
      content: t.trend + " — " + t.detail,
      note: "Willa's angle: " + t.angle,
      sourceCard: "Trend · " + t.trend
    });
  }
  return (
    <div id={"card-"+t.id} className={"card p-6 fade-in transition relative "+(focused?"ring-2 ring-[#202A44] shadow-lg":"")}>
      {/* Urgency lives on the section header above the grid — each card just
          carries its pillar badges so we don't show the same signal twice. */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          {t.pillars.map(p=><PillarBadge key={p} name={p}/>)}
        </div>
        <button onClick={toStudio} title="Send to the Studio to riff on"
          className="font-mono text-[9px] tracking-wider px-2 py-1 rounded border border-[var(--border)] bg-white hover:bg-[#FFFEF7] hover:border-[#E8E1C2] transition shrink-0">
          {flashed ? "→ SENT ✓" : "+ STUDIO"}
        </button>
      </div>
      <h3 className="font-serif text-[19px] leading-tight tracking-tight mb-3">{t.trend}</h3>
      <p className="text-[12.5px] text-[#334155] leading-relaxed">{t.detail}</p>

      {/* Willa's angle — amber callout box (consistent with Pulse + Competitor cards) */}
      <div className="mt-5 p-3 rounded-md" style={{background:"#FFFBEB", borderLeft:"3px solid var(--amber)"}}>
        <div className="font-mono text-[9px] tracking-[0.18em] mb-1.5" style={{color:"var(--amber)"}}>★ WILLA'S ANGLE</div>
        <p className="text-[12.5px] italic text-[#202A44] leading-relaxed">{t.angle}</p>
      </div>

      {briefIds.length>0 && (
        <div className="mt-5 pt-4 border-t border-[var(--border)]">
          <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-2">→ DROVE {briefIds.length} BRIEF{briefIds.length>1?"S":""} THIS WEEK</div>
          <div className="flex flex-wrap gap-1.5">
            {briefIds.map(bId=><BriefThreadChip key={bId} briefId={bId} nav={nav}/>)}
          </div>
        </div>
      )}
      <Sources list={t.sources}/>
    </div>
  );
}

function DirectionArrow({d}){
  if(d==="up") return <span className="font-mono text-[var(--green)]">↑</span>;
  if(d==="down") return <span className="font-mono text-[var(--red)]">↓</span>;
  return <span className="font-mono text-[var(--muted)]">→</span>;
}

function CompetitorCard({c,focused,nav}){
  const tone = c.direction==="down"?"#DC2626":c.direction==="up"?"#75C596":"#64748B";
  const briefIds = COMP_BRIEFS[c.id] || [];
  const flashed = nav.studioFlash === c.id;
  function toStudio(e){
    e.stopPropagation();
    nav.sendToStudio(c.id, {
      type:"note",
      content: c.name + " — " + c.status,
      note: "Willa's opportunity: " + c.opportunity,
      sourceCard: "Competitor · " + c.name
    });
  }
  return (
    <div id={"card-"+c.id} className={"card p-6 fade-in transition "+(focused?"ring-2 ring-[#202A44] shadow-lg":"")}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-serif text-[19px] tracking-tight">{c.name}</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 font-mono text-[9px] tracking-wider" style={{color:tone}}>
            <DirectionArrow d={c.direction}/>
            {c.direction==="down"?"DECLINING":c.direction==="up"?"RISING":"STEADY"}
          </div>
          <button onClick={toStudio} title="Send to the Studio to riff on"
            className="font-mono text-[9px] tracking-wider px-2 py-1 rounded border border-[var(--border)] bg-white hover:bg-[#FFFEF7] hover:border-[#E8E1C2] transition">
            {flashed ? "→ SENT ✓" : "+ STUDIO"}
          </button>
        </div>
      </div>
      <p className="text-[12px] text-[#334155] leading-relaxed mb-4">{c.status}</p>

      {/* Willa's opportunity — amber callout box (consistent with Pulse + Trend cards) */}
      <div className="p-3 rounded-md" style={{background:"#FFFBEB", borderLeft:"3px solid var(--amber)"}}>
        <div className="font-mono text-[9px] tracking-[0.18em] mb-1.5" style={{color:"var(--amber)"}}>★ WILLA'S OPPORTUNITY</div>
        <p className="text-[12.5px] italic text-[#202A44] leading-relaxed">{c.opportunity}</p>
      </div>

      {briefIds.length>0 && (
        <div className="mt-4 pt-3 border-t border-[var(--border)]">
          <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-2">↳ WILLA'S RESPONSE · {briefIds.length} BRIEF{briefIds.length>1?"S":""} THIS WEEK</div>
          <div className="flex flex-wrap gap-1.5">
            {briefIds.map(bId=><BriefThreadChip key={bId} briefId={bId} nav={nav} maxConcept={180}/>)}
          </div>
        </div>
      )}
      <Sources list={c.sources}/>
    </div>
  );
}

function AmbassadorCard({a}){
  return (
    <div className="card p-6 fade-in">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="font-serif text-[17px] leading-tight mb-1">{a.type}</div>
          <PillarBadge name={a.pillar}/>
        </div>
        <span className="font-mono text-[9px] tracking-wider text-[var(--blue)] shrink-0">{a.count}</span>
      </div>
      <p className="text-[12px] text-[#334155] leading-relaxed mb-4">{a.description}</p>
      <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-2">↳ TOP {a.creators.length} CREATORS · RANKED BY FIT</div>
      <div className="grid gap-2">
        {a.creators.map((c,i)=>(
          <div key={i} className="p-3 rounded-md border border-[var(--border)] bg-[#FAFAF7] hover:bg-white transition">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-serif text-[14px] text-[#202A44]">{c.handle}</span>
                <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">{c.platform.toUpperCase()} · {c.followers}</span>
              </div>
              <ConfidenceDots score={c.fit}/>
            </div>
            <div className="text-[11px] text-[#334155] leading-snug mb-1.5">{c.last}</div>
            <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">→ {c.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OutreachFunnel(){
  const max = OUTREACH_PIPELINE[0].count;
  return (
    <div className="card p-5">
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-1">OUTREACH PIPELINE · MAY 4 – MAY 10</div>
          <div className="font-serif text-[16px] tracking-tight">Where every potential ambassador lives in the funnel</div>
        </div>
        <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">CONVERSION · {Math.round(OUTREACH_PIPELINE[OUTREACH_PIPELINE.length-1].count/OUTREACH_PIPELINE[0].count*100)}% SURFACED → CONVERTED</div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {OUTREACH_PIPELINE.map((s,i)=>(
          <div key={s.stage} className="relative">
            <div className="card p-3" style={{borderColor:s.color+"55", background:s.color+"08"}}>
              <div className="font-mono text-[9px] tracking-wider mb-1" style={{color:s.color}}>{s.stage.toUpperCase()}</div>
              <div className="font-serif text-[28px] leading-none" style={{color:s.color}}>{s.count}</div>
              <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mt-2 leading-snug">{s.desc}</div>
            </div>
            {i<OUTREACH_PIPELINE.length-1 && (
              <span className="hidden md:block absolute top-1/2 -right-1 -translate-y-1/2 font-mono text-[14px] text-[var(--muted)]">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Shared top-right status on every tab header. The ⌘K button now opens the
// Ask the Strategist chat (rewired 2026-04-22 from command palette).
function TabTopRight({onToggleDrawer, drawerOpen}){
  return (
    <div className="flex items-center gap-3">
      <button onClick={onToggleDrawer}
        className="font-mono text-[9px] tracking-wider px-2.5 py-1.5 rounded border border-[var(--border)] bg-white hover:bg-[#F6F6F0] transition flex items-center gap-1.5">
        <span className="pulse-dot pulse-dot-green"></span>
        ENGINE RUNNING {drawerOpen?"▴":"▾"}
      </button>
    </div>
  );
}

// Editorial section wrapper for the Competitor Watch tab. The label + counter
// act as a magazine section header; the lede is the week's advisor take — one
// sentence that tells the reader what to think of this section. Each section
// on the tab wears this so the tab reads as counsel, not a scoreboard.
function CompSection({label, counter, lede, children}){
  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-[var(--border)]">
        <div className="font-mono text-[11px] tracking-[0.22em] text-[#202A44]">{label}</div>
        <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">{counter}</div>
      </div>
      {lede && (
        <p className="font-serif italic text-[14px] leading-relaxed text-[#202A44] mb-5 max-w-3xl">{lede}</p>
      )}
      {children}
    </div>
  );
}

function IntelligenceBrief({tab,setTab,focusId,nav,topRight}){
  return (
    <div className="flex flex-col h-full">
      <Ticker/>
      <div className="px-8 pt-6 pb-3">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h1 className="font-serif text-[28px] leading-none tracking-tight">Intelligence Brief</h1>
            <div className="font-mono text-[9px] tracking-[0.18em] text-[var(--muted)] mt-1">{WELCOME_WEEK_RANGE}</div>
          </div>
          {topRight}
        </div>
        <div className="flex items-stretch gap-1 border-b border-[var(--border)]">
          {[
            {id:"pulse",  label:"Cultural Pulse",    sub:CULTURAL_PULSE.length+" hooks",           emoji:"🔥", wip:false},
            {id:"trends", label:"Category + Policy", sub:TRENDS.length+" signals",                  emoji:"📰", wip:false},
            {id:"comp",   label:"Competitor Watch",  sub:COMPETITORS.length+" brands",              emoji:"🧭", wip:false},
            {id:"amb",    label:"Brand Ambassadors", sub:"coming soon",                             emoji:"🤝", wip:true, disabled:true}
          ].map(t=>{
            const active = tab===t.id;
            return (
              <button key={t.id}
                onClick={()=>{ if(!t.disabled) setTab(t.id); }}
                disabled={t.disabled}
                title={t.disabled ? t.label+" — coming soon (locked)" : t.label}
                className={"relative text-left px-4 pt-3 pb-3 rounded-t-md transition flex flex-col gap-0.5 min-w-[160px] "+(active?"bg-[#FAFAF7]":"hover:bg-[#F6F6F0]")+(t.disabled?" opacity-40 cursor-not-allowed pointer-events-none":"")}>
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] leading-none">{t.emoji}</span>
                  <span className={"text-[13px] font-medium "+(active?"text-[#202A44]":"text-[#475569]")}>{t.label}</span>
                  {t.disabled && <span className="font-mono text-[7.5px] tracking-wider px-1 py-[1px] rounded bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">SOON</span>}
                  {t.wip && !t.disabled && <span className="font-mono text-[7.5px] tracking-wider px-1 py-[1px] rounded bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">WIP</span>}
                </div>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] pl-[22px]">{t.sub.toUpperCase()}</div>
                {active && <div className="absolute left-0 right-0 -bottom-[1px] h-[2.5px]" style={{background:"#202A44"}}></div>}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar px-8 py-4">
        {tab==="trends" && (
          <div className="max-w-[1400px]">
            {/* RIDE NOW section */}
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[10px] tracking-[0.18em] text-[var(--red)] flex items-center gap-2"><span className="pulse-dot"></span> RIDE NOW · ACT THIS WEEK</div>
              <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">{TRENDS.filter(t=>t.urgency==="RIDE NOW").length} TRENDS</div>
            </div>
            <div className="xl:columns-2 gap-3 [column-fill:_balance] mb-6">
              {TRENDS.filter(t=>t.urgency==="RIDE NOW").map(t=>(
                <div key={t.id} className="break-inside-avoid mb-3">
                  <TrendCard t={t} focused={focusId===t.id} nav={nav}/>
                </div>
              ))}
            </div>
            {/* THIS WEEK section */}
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[10px] tracking-[0.18em] text-[var(--amber)] flex items-center gap-2"><span className="inline-block w-[6px] h-[6px] rounded-full" style={{background:"#9E652E"}}></span> THIS WEEK · WATCH + PLAN</div>
              <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">{TRENDS.filter(t=>t.urgency==="THIS WEEK").length} TRENDS</div>
            </div>
            <div className="xl:columns-2 gap-3 [column-fill:_balance]">
              {TRENDS.filter(t=>t.urgency==="THIS WEEK").map(t=>(
                <div key={t.id} className="break-inside-avoid mb-3">
                  <TrendCard t={t} focused={focusId===t.id} nav={nav}/>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="pulse" && (
          <div className="max-w-[1400px]">
            <div className="mb-4">
              <div className="font-mono text-[10px] tracking-[0.18em] text-[#9E652E] flex items-center gap-2 mb-1.5">
                <span className="pulse-dot"></span> CULTURAL PULSE
              </div>
              <p className="text-[12.5px] text-[#334155] leading-relaxed max-w-2xl">
                Viral recipes, memes, celebrity moments, and misinformation Willa's can ride or rebut this week. Each hook comes with a Willa's Play you can turn into a brief fast.
              </p>
            </div>
            <div className="xl:columns-2 gap-3 [column-fill:_balance] mb-6">
              {CULTURAL_PULSE.map(p => (
                <div key={p.id} className="break-inside-avoid mb-3">
                  <CulturalPulseCard p={p} nav={nav}/>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="comp" && (
          <div className="max-w-[1400px]">
            {/* Section 1 — WILLA'S PLAYS: per-competitor response cards. Leads with ACTION.
                Removed lede block 2026-05-18 per Christina — too text-heavy, stale fast. */}
            <CompSection
              label="WILLA'S PLAYS"
              counter={COMPETITORS.length+" BRANDS · "+new Set(Object.values(COMP_BRIEFS).flat()).size+" BRIEFS ON THE TABLE"}>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {COMPETITORS.map(c=><CompetitorCard key={c.id} c={c} focused={focusId===c.id} nav={nav}/>)}
              </div>
            </CompSection>

            {/* Section 2 — WHAT'S COMING: forward-looking calendar */}
            <CompSection
              label="WHAT'S COMING"
              counter={COMPETITOR_CALENDAR.length+" EVENTS QUEUED"}>
              <CompetitorCalendar/>
            </CompSection>

            {/* Section 3 — WHAT HAPPENED: recent-moves timeline (Share of Voice moved to the bottom) */}
            <CompSection
              label="WHAT HAPPENED"
              counter="LAST 60 DAYS">
              <RecentMovesTimeline nav={nav}/>
            </CompSection>

            {/* Section 4 — HOW WILLA'S STACKS UP: supporting data — The Shelf comparison + Share of Voice side by side */}
            <CompSection
              label="HOW WILLA'S STACKS UP"
              counter="THE SHELF · SHARE OF VOICE">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 xl:col-span-7"><ProductGapTable/></div>
                <div className="col-span-12 xl:col-span-5"><ShareOfVoice/></div>
              </div>
            </CompSection>
          </div>
        )}
        {tab==="amb" && (
          <div className="max-w-[1400px]">
            <div className="mb-5 rounded-md overflow-hidden flex items-stretch" style={{border:"1.5px solid #F59E0B"}}>
              <div className="flex items-center justify-center px-3 shrink-0" style={{background:"repeating-linear-gradient(45deg, #F59E0B 0 8px, #202A44 8px 16px)"}}>
                <span className="text-[13px]">🚧</span>
              </div>
              <div className="flex-1 px-4 py-2 flex items-center gap-2 flex-wrap" style={{background:"#FFFBEB"}}>
                <span className="font-mono text-[9px] tracking-wider px-1.5 py-0.5 rounded text-white" style={{background:"#F59E0B"}}>CREATOR OUTREACH</span>
                <span className="font-mono text-[9px] tracking-wider text-[#92400E]">PREVIEW · PRODUCTION WIRES UP VIA MODASH · CREATORIQ · REDDIT API</span>
              </div>
            </div>
            <div className="mb-4"><OutreachFunnel/></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">{AMBASSADORS.map(a=><AmbassadorCard key={a.id} a={a}/>)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function PriorityBadge({p}){
  const style = p==="BIG SWING"
    ? {background:"#202A44",color:"#FACC15"}
    : p==="HIGH" ? {background:"#FEF3C7",color:"#92400E"}
    : {background:"#F1F5F9",color:"#475569"};
  return <span className="font-mono text-[8.5px] tracking-wider px-1.5 py-0.5 rounded" style={style}>{p}</span>;
}

// Brief grid card — cut ruthlessly 2026-04-17 (second pass). One quote (the hook),
// one chip (the proven format = DNA), and one prominent driver section so
// "what's making this brief happen" is the loudest thing on the card, not an
// afterthought. Phone thumb, timing, concept title, pillar chip all removed
// per feedback.
function BriefListItem({b,active,onClick,variant}){
  const recHook = (b.hooks.find(h=>h.recommended) || b.hooks[0]).text;
  const links = BRIEF_LINKS[b.id] || {trends:[],pulse:[],comps:[]};
  const drivenTrend = (links.trends||[])[0] ? TREND_BY_ID[links.trends[0]] : null;
  const drivenPulse = (links.pulse ||[])[0] ? PULSE_BY_ID[links.pulse[0]]  : null;
  const drivenComp  = (links.comps ||[])[0] ? COMP_BY_ID[links.comps[0]]   : null;
  const extraDrivers = ((links.trends||[]).length + (links.pulse||[]).length + (links.comps||[]).length) - 1;
  const driverColor = b.fromStudio ? "#9E652E" : drivenTrend ? "#73B2C9" : drivenPulse ? (drivenPulse.typeColor || "#9E652E") : drivenComp ? "#DC2626" : "#94A3B8";
  const driverType  = b.fromStudio ? "FROM THE STUDIO" : drivenTrend ? "CATEGORY TREND" : drivenPulse ? "CULTURAL PULSE" : drivenComp ? "COMPETITOR MOVE" : "ENGINE";
  const driverText  = b.fromStudio ? (b._drivenBy || "Your idea, riffed with the strategist") : drivenTrend ? drivenTrend.trend : drivenPulse ? drivenPulse.hook : drivenComp ? drivenComp.name : "Evergreen · brand pillar";

  const isHero    = variant === "hero";
  const isCompact = variant === "compact";

  // Compact variant — for STANDARD priority briefs. Carries meaningful context
  // without becoming a wall: platform + timing top row, hook, DNA chip + driver
  // type pill at the bottom so the reader knows WHAT, WHEN, and WHY.
  if (isCompact) {
    return (
      <button onClick={onClick}
        className={"group text-left w-full card fade-in transition overflow-hidden p-3.5 flex flex-col gap-2 "+
          (active ? "ring-2 ring-[#202A44] shadow-lg" : "hover:border-[#cfcfc8] hover:shadow-md")}>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[9px] tracking-wider text-[var(--muted)] flex items-center gap-1 min-w-0">
            <span className="text-[11px]">{PLATFORM_EMOJI[b.platform]||"•"}</span>
            <span className="truncate">{b.platform.toUpperCase()}{b.timing ? " · "+b.timing.split(" · ")[0].toUpperCase() : ""}</span>
          </span>
          <PriorityBadge p={b.priority}/>
        </div>
        <p className="font-serif text-[13px] italic leading-snug text-[#202A44] line-clamp-4 flex-1">"{recHook}"</p>
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--border)]">
          {b.dnaPattern ? <DnaChip patternId={b.dnaPattern} size="sm"/> : <span/>}
          <span className="font-mono text-[8px] tracking-[0.15em] shrink-0" style={{color:driverColor}}>{driverType}</span>
        </div>
      </button>
    );
  }

  // Hero + default share a structure. Hero shows the concept title above the hook
  // and bumps the hook text size; default is the existing compact-ish grid card.
  return (
    <button onClick={onClick}
      className={"group text-left w-full card fade-in transition overflow-hidden "+
        (isHero ? "border-[1.5px] border-[#D4CEC0] " : "") +
        (active ? "ring-2 ring-[#202A44] shadow-lg" : "hover:border-[#cfcfc8] hover:shadow-md")}>

      {/* Top — platform + priority */}
      <div className={isHero ? "px-5 pt-5 pb-4" : "px-4 pt-4 pb-3"}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[10px] tracking-wider text-[var(--muted)] flex items-center gap-1.5 min-w-0">
            <span className="text-[13px]">{PLATFORM_EMOJI[b.platform]||"•"}</span>
            <span className="truncate">{b.platform.toUpperCase()}{isHero && b.timing ? " · "+b.timing.toUpperCase() : ""}</span>
          </span>
          <PriorityBadge p={b.priority}/>
        </div>

        {/* Hero cards lead with the concept title (what the brief IS) above the hook (what it SAYS). */}
        {isHero && (
          <h3 className="font-serif text-[17px] leading-tight tracking-tight text-[#202A44] mb-3">{b.concept}</h3>
        )}

        {/* The one quote — the hook. Italic serif does the "this is the creative" work on its own, no colored rule needed. */}
        <p className={"font-serif italic leading-snug text-[#202A44] mb-4 "+
          (isHero ? "text-[17px]" : "text-[15.5px] line-clamp-5")}>"{recHook}"</p>

        {/* DNA chip — the format anchor */}
        {b.dnaPattern && <DnaChip patternId={b.dnaPattern}/>}
      </div>

      {/* Driver section — made prominent per 2026-04-17 feedback. */}
      <div className={"border-t border-[var(--border)] bg-[#FAFAF7] "+(isHero ? "px-5 py-4" : "px-4 py-3.5")}>
        <div className="flex items-start gap-3">
          <div className="w-[3px] self-stretch rounded-full shrink-0" style={{background:driverColor}}></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-[8.5px] tracking-[0.2em] text-[var(--muted)]">DRIVEN BY · <span style={{color:driverColor}}>{driverType}</span></span>
              {extraDrivers > 0 && <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">+{extraDrivers} more</span>}
            </div>
            <div className={"text-[#202A44] leading-snug line-clamp-2 "+(isHero ? "text-[13px]" : "text-[12.5px]")}>{driverText}</div>
          </div>
        </div>
      </div>
    </button>
  );
}

function Section({title,children}){
  return (
    <div className="mb-4">
      <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-1.5">{title}</div>
      {children}
    </div>
  );
}

function VoiceVariant({label, text, mood}){
  const [copied,setCopied] = useState(false);
  function copy(){
    if(navigator.clipboard){
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(()=>setCopied(false), 1500);
    }
  }
  return (
    <div className="card p-4" style={{background:"#FFFEF7", borderColor:"#E8E1C2"}}>
      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-[10px] tracking-wider text-[var(--muted)]">{label.toUpperCase()} · {mood.toUpperCase()}</div>
        <button onClick={copy} className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded border border-[var(--border)] bg-white hover:bg-[#F6F6F0] transition">
          {copied?"COPIED ✓":"COPY"}
        </button>
      </div>
      <p className="text-[14px] text-[#202A44] leading-relaxed">{text}</p>
    </div>
  );
}

// StaticVisualDirection — swaps the plain b.visual paragraph for a proper
// designed surface on carousel + pin briefs (where there's no phone-frame
// storyboard). Parses common patterns: "N-slide carousel. Slide 1: ...".
// and "Vertical pin (2:3). Top: ... Middle: ... Bottom: ..." and renders each
// piece as its own styled card. Added 2026-04-21 per Christina's feedback
// that static briefs need more visual thought than a single block of text.
function StaticVisualDirection({visual, pillarColor, platform}) {
  if (!visual) return null;

  // Try to parse a slide-by-slide carousel.
  const headerMatch = visual.match(/^(\d+)[-\s]slide carousel\.?\s*/i);
  const slideRegex = /Slide\s+(\d+):\s*/g;
  const slideMatches = [...visual.matchAll(slideRegex)];

  if (headerMatch && slideMatches.length > 0) {
    const count = headerMatch[1];
    const slides = slideMatches.map((m, i) => {
      const start = m.index + m[0].length;
      const end = slideMatches[i+1] ? slideMatches[i+1].index : visual.length;
      return { num: m[1], text: visual.substring(start, end).trim().replace(/\.$/, "") };
    });
    return (
      <div className="rounded-lg border border-[var(--border)] overflow-hidden" style={{background:`linear-gradient(180deg, ${pillarColor}0E 0%, #FFFFFF 55%)`}}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] bg-white">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-full shrink-0" style={{width:"34px",height:"34px",background:pillarColor,color:"#fff",fontFamily:"Fraunces, Georgia, serif",fontSize:"15px",fontStyle:"italic",fontWeight:600}}>❧</span>
            <div>
              <div className="font-mono text-[8.5px] tracking-[0.22em] text-[var(--muted)]">CAROUSEL BRIEF</div>
              <div className="font-serif text-[17px] leading-none mt-1" style={{letterSpacing:"-0.01em"}}>{count}-slide story</div>
            </div>
          </div>
          <span className="font-mono text-[8.5px] tracking-wider px-2 py-[3px] rounded-full" style={{background:pillarColor+"14", color:pillarColor, border:"1px solid "+pillarColor+"55"}}>{platform.toUpperCase()}</span>
        </div>
        <div className="p-5 grid gap-3 md:grid-cols-2">
          {slides.map((s, i) => (
            <div key={i} className="flex gap-3.5 items-start rounded-md p-4 bg-white border border-[var(--border)] transition hover:shadow-md">
              <span className="font-serif italic leading-none shrink-0" style={{fontSize:"36px",color:pillarColor,width:"36px"}}>{s.num}</span>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[8px] tracking-[0.22em] text-[var(--muted)] mb-1.5">SLIDE {s.num}</div>
                <p className="text-[12px] text-[#202A44] leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Try to parse a vertical pin with Top/Middle/Bottom + SEO zones.
  const pinHeader = visual.match(/^Vertical pin[^.]*\.?\s*/i);
  const zoneRegex = /(Top|Middle|Bottom|SEO text):\s*/g;
  const zoneMatches = [...visual.matchAll(zoneRegex)];

  if (pinHeader && zoneMatches.length > 0) {
    const zones = zoneMatches.map((m, i) => {
      const start = m.index + m[0].length;
      const end = zoneMatches[i+1] ? zoneMatches[i+1].index : visual.length;
      return { name: m[1], text: visual.substring(start, end).trim().replace(/\.$/, "") };
    });
    return (
      <div className="rounded-lg border border-[var(--border)] overflow-hidden" style={{background:`linear-gradient(180deg, ${pillarColor}0E 0%, #FFFFFF 55%)`}}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] bg-white">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-full shrink-0" style={{width:"34px",height:"34px",background:pillarColor,color:"#fff",fontFamily:"Fraunces, Georgia, serif",fontSize:"16px",fontWeight:600}}>⌘</span>
            <div>
              <div className="font-mono text-[8.5px] tracking-[0.22em] text-[var(--muted)]">PIN BRIEF</div>
              <div className="font-serif text-[17px] leading-none mt-1" style={{letterSpacing:"-0.01em"}}>Vertical pin · 2:3</div>
            </div>
          </div>
          <span className="font-mono text-[8.5px] tracking-wider px-2 py-[3px] rounded-full" style={{background:pillarColor+"14", color:pillarColor, border:"1px solid "+pillarColor+"55"}}>PINTEREST</span>
        </div>
        <div className="p-5">
          <div className="mx-auto rounded-md overflow-hidden border border-[var(--border)] bg-white" style={{maxWidth:"460px"}}>
            {zones.map((z, i) => (
              <div key={i} className={"px-4 py-4 "+(i < zones.length - 1 ? "border-b border-[var(--border)]" : "")} style={{background:i % 2 === 0 ? "#FFFFFF" : "#FAFAF7"}}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-[4px] h-[14px] rounded-full" style={{background:pillarColor}}></span>
                  <span className="font-mono text-[9px] tracking-[0.2em]" style={{color:pillarColor}}>{z.name.toUpperCase()}</span>
                </div>
                <p className="text-[12px] text-[#202A44] leading-relaxed">{z.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Fallback — styled single block for anything that doesn't match.
  return (
    <div className="rounded-lg border border-[var(--border)] p-5" style={{background:`linear-gradient(180deg, ${pillarColor}0E 0%, #FFFFFF 55%)`}}>
      <p className="font-serif text-[15px] leading-relaxed text-[#202A44]">{visual}</p>
    </div>
  );
}

// Smart-suggestion picker for the inline brief-riff panel. Reaches into the
// brief's current state (flavor, DNA, concept wording) and proposes 3 POV-
// discipline-aware directions the user can click. Leans into Christina's
// 2026-04-21/22 rules — benefit-first, activist, witty, flavor-role match.
function getBriefRiffSuggestions(b) {
  const out = [];
  // Flavor-role checks first (brief-specific, highest signal)
  const lookIngredient = /ingredient|sugar|organic|label|4 ingredients|5 ingredients|clean/i.test(b.concept || "");
  if (b.flavor === "Barista" && lookIngredient) {
    out.push("Swap the flavor — Barista is our most-processed SKU. This ingredient story is stronger on Original.");
  }
  // DNA alternate (broadly useful)
  const dnaAlts = {
    "mom-activist": "on-pack-checklist",
    "on-pack-checklist": "meme-payload",
    "kid-family-moment": "mom-activist",
    "viral-recipe-remix": "before-after-stitch",
    "meme-payload": "mom-activist",
    "at-shelf-moment": "before-after-stitch",
    "before-after-stitch": "viral-recipe-remix"
  };
  if (b.dnaPattern && dnaAlts[b.dnaPattern]) {
    out.push(`Try a different DNA format — what if this was ${dnaAlts[b.dnaPattern]} instead of ${b.dnaPattern}?`);
  }
  // Always-useful POV directives (rotate in)
  out.push("Make it punchier — more assertive + activist. Us-vs-them.");
  out.push("Get to the benefit faster. The hook feels buried — rewrite benefit-first.");
  out.push("Rewrite with more wit — less earnest wellness brand.");
  // If the brief cites a trend in its intel, offer the push-back angle
  const hasTrend = (b.intel || []).some(i => i.type === "TREND" || i.type === "PULSE");
  if (hasTrend) {
    out.push("Push against this trend instead of riding it — if it's diet culture, we stand against it.");
  }
  // Return 3 distinct
  const seen = new Set();
  return out.filter(s => { if (seen.has(s)) return false; seen.add(s); return true; }).slice(0, 3);
}

// Inline riff chat scoped to a single brief. Distinct from the floating
// Strategist (which is general-purpose). Opens inside BriefDetail via the
// "Riff with Strategist" button. Each brief has its own conversation; it
// resets when the user switches briefs. Agent gets full brief context
// injected so every response is scoped to "improve THIS brief."
function BriefRiffPanel({ brief, onClose, onRequestApiKey }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = React.useRef();
  const inputRef = React.useRef();

  useEffect(() => {
    if (inputRef.current) setTimeout(()=> inputRef.current.focus(), 50);
  }, []);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, streaming]);

  const suggestions = getBriefRiffSuggestions(brief);

  function buildBriefContext(b) {
    const recHook = ((b.hooks || []).find(h => h.recommended) || (b.hooks || [])[0] || {}).text || "";
    const cv = typeof CAPTION_VARIANTS !== "undefined" ? CAPTION_VARIANTS[b.id] : null;
    const captionLine = (cv && cv.direct) || b.caption || "";
    const intelLines = (b.intel || []).map(i => `[${i.type}] ${i.text}`).join(" · ");
    return `=== BRIEF UNDER RIFF ===
The user is iterating on THIS SPECIFIC BRIEF. Keep every suggestion scoped to improving or pushing this brief in a new direction — don't suggest unrelated content. If the user's request doesn't fit this brief, say so and offer the closest adjacent option.

When you suggest changes, be concrete: show the rewritten hook, the new caption, the specific angle. Don't just describe what to change — show it. Keep responses tight (≤ 250 words unless the user explicitly asks for more).

**Concept:** ${b.concept}
**Platform · Pillar · Flavor:** ${b.platform} · ${b.pillar} · ${b.flavor}
**Priority:** ${b.priority} · **DNA format:** ${b.dnaPattern || "(none)"}
**Recommended hook:** "${recHook}"
${b.visual ? "**Visual direction:** " + b.visual : ""}
${captionLine ? "**Current caption (direct variant):** " + captionLine : ""}
${intelLines ? "**Why now / intel:** " + intelLines : ""}`;
  }

  async function send(text) {
    const prompt = (text || "").trim();
    if (!prompt || streaming) return;
    if (!getClaudeApiKey()) { onRequestApiKey(); return; }
    setError(null);
    const userMsg = { role: "user", content: prompt };
    setMessages(m => [...m, userMsg, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);
    try {
      const systemExtras = [{ type: "text", text: buildBriefContext(brief) }];
      const convo = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
      for await (const chunk of streamStrategist({
        messages: convo, systemExtras, maxTokens: 1500,
        agentType: "brief_riff", contextId: brief && brief.id ? String(brief.id) : null,
      })) {
        setMessages(m => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { ...last, content: last.content + chunk };
          return copy;
        });
      }
    } catch(e) {
      setMessages(m => m.slice(0, -1));
      if (e.message === "NO_API_KEY") setError("NO_API_KEY");
      else setError(e.message || "Something went wrong.");
    } finally {
      setStreaming(false);
    }
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text) return;
    send(text);
  }

  return (
    <div className="mb-6 rounded-lg overflow-hidden fade-in" style={{border:"1.5px solid #E8E1C2", background:"linear-gradient(180deg, #FFFEF7 0%, #FFFFFF 100%)"}}>
      <div className="px-5 py-3 border-b border-[#E8E1C2] flex items-center justify-between gap-2 bg-white">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full shrink-0" style={{background:"#202A44", color:"#FACC15", fontSize:"12px", fontWeight:700}}>✦</span>
          <span className="font-mono text-[9.5px] tracking-[0.22em]" style={{color:"#9E652E"}}>RIFF WITH THE STRATEGIST</span>
          <span className="text-[11px] text-[var(--muted)] hidden md:inline leading-snug">· scoped to this brief</span>
        </div>
        <button onClick={onClose} title="Close (the brief stays open)"
          className="text-[var(--muted)] hover:text-[var(--ink)] font-mono text-[10px] tracking-wider px-1.5 py-1 rounded hover:bg-[#F6F6F0] transition">× CLOSE</button>
      </div>

      {error === "NO_API_KEY" && (
        <div className="px-4 py-2.5 bg-[#FEF3C7] flex items-center justify-between gap-3">
          <div className="text-[11.5px] text-[#92400E] leading-snug">Set your Anthropic API key to start.</div>
          <button onClick={onRequestApiKey} className="font-mono text-[9px] tracking-wider px-2.5 py-1.5 rounded bg-[#202A44] text-white">SET KEY</button>
        </div>
      )}
      {error && error !== "NO_API_KEY" && (
        <div className="px-4 py-2 bg-[#FEE2E2] text-[11px] text-[#991B1B] leading-snug">⚠ {error}</div>
      )}

      <div ref={scrollRef} className="max-h-[360px] overflow-y-auto scrollbar px-4 py-3.5">
        {messages.length === 0 ? (
          <div>
            <div className="pl-3 pr-3 py-2 text-[13px] text-[#202A44] mb-3" style={{borderLeft:"2px solid #FACC15", background:"#FFFEF7", borderRadius:"0 10px 10px 0"}}>
              <p className="leading-relaxed">I've got this brief loaded — <strong>"{brief.concept}"</strong> ({brief.platform} · {brief.pillar} · {brief.flavor}).</p>
              <p className="leading-relaxed mt-1.5">Three directions we could push it. Pick one, or tell me something else:</p>
            </div>
            <div className="grid gap-1.5">
              {suggestions.map((p, i) => (
                <button key={i} onClick={()=>send(p)}
                  className="text-left px-3 py-2.5 rounded-lg border border-[var(--border)] bg-white hover:border-[#202A44] hover:bg-[#FFFEF7] transition text-[12.5px] text-[#202A44] leading-snug">
                  <span className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mr-1.5">↗</span>{p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <StrategistMessage key={i} m={m} isLast={i === messages.length - 1} streaming={streaming}/>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-[#E8E1C2] px-3 py-3 bg-white">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{ if(e.key === "Enter" && !e.shiftKey){ e.preventDefault(); handleSubmit(); } }}
            placeholder={streaming ? "Thinking…" : "Type a different direction for this brief…"}
            disabled={streaming}
            rows={1}
            className="flex-1 resize-none px-3 py-2 rounded-lg border border-[var(--border)] bg-[#FAFAF7] text-[13px] text-[#202A44] leading-snug focus:outline-none focus:border-[#202A44] disabled:opacity-60"
            style={{maxHeight:"100px", minHeight:"36px"}}/>
          <button type="submit" disabled={!input.trim() || streaming}
            className="shrink-0 px-3 py-2 rounded-lg bg-[#202A44] text-white font-mono text-[10px] tracking-wider hover:bg-[#1E293B] transition disabled:opacity-40 disabled:cursor-not-allowed">
            {streaming ? "…" : "SEND →"}
          </button>
        </div>
        <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mt-1.5 px-1">ENTER to send · SHIFT+ENTER for new line · Conversation stays with this brief.</div>
      </form>
    </div>
  );
}

function BriefDetail({b,nav}){
  const [showAltHooks,setShowAltHooks] = useState(true);
  const [activeFrame,setActiveFrame] = useState(0);
  const [showFootage,setShowFootage] = useState(false);
  const [riffOpen,setRiffOpen] = useState(false);
  useEffect(()=>{ setActiveFrame(0); setShowAltHooks(true); setShowFootage(false); setRiffOpen(false); },[b.id]);
  if(!b) return null;
  const links = BRIEF_LINKS[b.id] || {trends:[],pulse:[],comps:[]};
  const drivenTrends = (links.trends||[]).map(id=>TREND_BY_ID[id]).filter(Boolean);
  const drivenPulses = (links.pulse ||[]).map(id=>PULSE_BY_ID[id]).filter(Boolean);
  const drivenComps = (links.comps ||[]).map(id=>COMP_BY_ID[id]).filter(Boolean);
  const recommendedHook = b.hooks.find(h=>h.recommended) || b.hooks[0];
  const altHooks = b.hooks.filter(h=>h!==recommendedHook);

  return (
    <div className="card p-7 fade-in" key={b.id}>
      {/* Header — platform above headline, pillar + DNA chips below. Priority
          moved out of the header per 2026-04-21 feedback; it still lives on
          each card in the grid. */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="font-mono text-[11px] tracking-wider text-[var(--muted)]">
            {b.platform.toUpperCase()}
          </div>
          {b.fromStudio && (
            <span className="font-mono text-[10px] tracking-wider px-2 py-[3px] rounded text-white" style={{background:"#9E652E"}}>
              ✦ FROM THE STUDIO
            </span>
          )}
        </div>
        <h2 className="font-serif text-[28px] leading-tight tracking-tight mb-3">{b.concept}</h2>
        <div className="flex items-center flex-wrap gap-1.5 justify-between">
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="font-mono text-[10.5px] tracking-wider px-2 py-[3px] rounded inline-flex items-center gap-1.5"
              style={{color:b.pillarColor, background:b.pillarColor+"14", border:"1px solid "+b.pillarColor+"44"}}>
              <span className="inline-block w-[7px] h-[7px] rounded-full" style={{background:b.pillarColor}}></span>
              {b.pillar}
            </span>
            {b.dnaPattern && <DnaChip patternId={b.dnaPattern}/>}
          </div>
          <button
            onClick={()=> setRiffOpen(o => !o)}
            title="Iterate on this brief with the Strategist — stays scoped to this brief"
            className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-wider px-3 py-2 rounded-md border transition hover:bg-[#FFFEF7]"
            style={{background: riffOpen ? "#FFFEF7" : "#FFFFFF", color:"#202A44", borderColor:"#E8E1C2"}}>
            <span style={{color:"#9E652E"}}>✦</span>
            {riffOpen ? "HIDE RIFF" : "RIFF WITH STRATEGIST"}
          </button>
        </div>
      </div>

      {/* Inline riff panel — scoped to THIS brief. Distinct from the floating
          Strategist (which is general-purpose). Opens below the header so
          the user sees the brief they're riffing on + the chat at once. */}
      {riffOpen && (
        <BriefRiffPanel
          brief={b}
          onClose={()=> setRiffOpen(false)}
          onRequestApiKey={()=> { if (nav && nav.requestApiKey) nav.requestApiKey(); }}/>
      )}

      {/* Driven by — promoted to hero block per Alex's 2026-05-18 feedback.
          Full text of each driver renders inline (was a chip-only summary
          before). The WHY NOW block below got cut — its intel is redundant
          with the driver text shown here. */}
      {(drivenTrends.length>0 || drivenPulses.length>0 || drivenComps.length>0) && (
        <div className="mb-7 pb-7 border-b border-[var(--border)]">
          <div className="font-mono text-[11px] tracking-[0.18em] text-[var(--ink)] mb-3">↳ WHY THIS BRIEF EXISTS</div>
          <div className="grid gap-2">
            {drivenTrends.map(t=>(
              <button key={t.id} onClick={()=>nav.goToTrend(t.id)}
                className="text-left p-4 rounded-md border bg-[#FAFAF7] hover:bg-white transition group"
                style={{borderColor:"var(--border)", borderLeftWidth:"4px", borderLeftColor:"#73B2C9"}}>
                <span className="inline-block font-mono text-[9.5px] tracking-wider px-2 py-[3px] rounded mb-2 text-white" style={{background:"#73B2C9"}}>TREND</span>
                <p className="text-[14px] text-[#202A44] leading-snug font-medium">{t.trend}</p>
              </button>
            ))}
            {drivenPulses.map(p=>(
              <button key={p.id} onClick={()=>nav.goToPulse(p.id)}
                className="text-left p-4 rounded-md border bg-[#FAFAF7] hover:bg-white transition group"
                style={{borderColor:"var(--border)", borderLeftWidth:"4px", borderLeftColor:p.typeColor||"#9E652E"}}>
                <span className="inline-block font-mono text-[9.5px] tracking-wider px-2 py-[3px] rounded mb-2 text-white" style={{background:p.typeColor||"#9E652E"}}>CULTURAL PULSE · {p.type}</span>
                <p className="text-[14px] text-[#202A44] leading-snug font-medium">{p.hook}</p>
              </button>
            ))}
            {drivenComps.map(c=>(
              <button key={c.id} onClick={()=>nav.goToComp(c.id)}
                className="text-left p-4 rounded-md border bg-[#FAFAF7] hover:bg-white transition group"
                style={{borderColor:"var(--border)", borderLeftWidth:"4px", borderLeftColor:"#DC2626"}}>
                <span className="inline-block font-mono text-[9.5px] tracking-wider px-2 py-[3px] rounded mb-2 text-white" style={{background:"#DC2626"}}>COMPETITOR · {c.name}</span>
                <p className="text-[14px] text-[#202A44] leading-snug font-medium">{c.opportunity}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      {b.fromStudio && b._drivenBy && (
        <div className="mb-7 pb-7 border-b border-[var(--border)]">
          <div className="font-mono text-[11px] tracking-[0.18em] text-[var(--muted)] mb-3">↳ RIFFED FROM</div>
          <div className="pl-4 border-l-[4px]" style={{borderColor:"#9E652E"}}>
            <p className="text-[14px] italic text-[#202A44] leading-relaxed">{b._drivenBy}</p>
          </div>
        </div>
      )}

      {/* THE IDEA — green RECOMMENDED HOOK chip stands out (restored per 2026-04-17 feedback); body stays editorial */}
      <BriefBlock label="THE IDEA">
        <div className="pl-4 border-l-[3px] border-[#75C596]">
          <span className="inline-block font-mono text-[9.5px] tracking-wider px-2 py-[3px] rounded mb-2.5 text-white" style={{background:"#75C596"}}>
            ✓ RECOMMENDED HOOK
          </span>
          <p className="font-serif text-[22px] leading-snug text-[#202A44]">"{recommendedHook.text}"</p>
        </div>
        {altHooks.length>0 && (
          <div className="mt-3">
            <button onClick={()=>setShowAltHooks(s=>!s)} className="font-mono text-[10px] tracking-wider text-[var(--muted)] hover:text-[var(--ink)]">
              {showAltHooks?"− HIDE":"+ SHOW"} {altHooks.length} ALT HOOK{altHooks.length>1?"S":""}
            </button>
            {showAltHooks && (
              <div className="grid gap-1.5 mt-2">
                {altHooks.map((h,k)=>(
                  <div key={k} className="pl-4 border-l border-[var(--border)] text-[14px] italic text-[#64748B] leading-snug py-1.5">"{h.text}"</div>
                ))}
              </div>
            )}
          </div>
        )}
      </BriefBlock>
      {/* WHY NOW block intentionally removed 2026-05-18 — its intel duplicated
          the driver text now rendered prominently in the WHY THIS BRIEF EXISTS
          block above. */}

      {/* SHOT LIST / VISUAL DIRECTION */}
      <BriefBlock label={b.script ? "SHOT LIST" : "VISUAL DIRECTION"}>
        <div className="flex items-center justify-between mb-3">
          {b.script
            ? <span className="font-mono text-[10.5px] tracking-wider text-[var(--muted)]">{b.script.length} FRAMES · SWIPE TO PREVIEW</span>
            : <span/>}
          <AgentStamp agentId="visual"/>
        </div>

        {b.script ? (
          <div>
            {/* Phone carousel */}
            <div className="flex gap-3 overflow-x-auto scrollbar pb-3 -mx-1 px-1">
              {b.script.map((s,k)=>{
                const active = activeFrame===k;
                return (
                  <button key={k} onClick={()=>setActiveFrame(k)}
                    className={"shrink-0 transition-all "+(active ? "" : "opacity-55 hover:opacity-80")}
                    style={{width:"200px"}}>
                    <div className="rounded-[26px] overflow-hidden flex flex-col"
                      style={{
                        border: active ? "3px solid #202A44" : "2px solid var(--border)",
                        background: active ? "linear-gradient(160deg, #202A44 0%, #1E293B 100%)" : "#DCD6C8",
                        aspectRatio: "9/16",
                        boxShadow: active ? "0 8px 24px rgba(15,23,42,0.18)" : "none"
                      }}>
                      {/* Notch */}
                      <div className="flex justify-center pt-3 pb-1">
                        <div className="rounded-full" style={{width:"44px",height:"4px",background: active?"#334155":"#D4D4CF"}}></div>
                      </div>
                      {/* Scene label */}
                      {s.scene && (
                        <div className="text-center px-3 pt-1.5">
                          <span className="font-mono text-[8.5px] tracking-[0.18em] px-2 py-[3px] rounded-full"
                            style={{
                              background: active ? "rgba(250,204,21,0.18)" : "rgba(0,0,0,0.06)",
                              color: active ? "#FACC15" : "#94A3B8"
                            }}>{s.scene}</span>
                        </div>
                      )}
                      {/* Center content */}
                      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
                        <div className="font-serif text-[13px] leading-snug" style={{color: active ? "#F8FAFC" : "#475569"}}>{s.action}</div>
                      </div>
                      {/* Bottom bar */}
                      <div className="flex items-center justify-between px-4 pb-3">
                        <span className="font-mono text-[10px] tracking-wider font-semibold" style={{color: active ? "#FACC15" : "#94A3B8"}}>{s.time}</span>
                        <span className="font-mono text-[10px] tracking-wider" style={{color: active ? "#94A3B8" : "#B0B0A8"}}>{k+1}/{b.script.length}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <StaticVisualDirection visual={b.visual} pillarColor={b.pillarColor} platform={b.platform}/>
        )}

        {(b.audio || b.duration) && (
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 pt-3 border-t border-[var(--border)]">
            {b.audio && <div className="text-[13.5px]"><span className="font-mono text-[10px] tracking-wider text-[var(--muted)]">AUDIO · </span><span className="text-[#334155]">{b.audio}</span></div>}
            {b.duration && <div className="text-[13.5px]"><span className="font-mono text-[10px] tracking-wider text-[var(--muted)]">DURATION · </span><span className="text-[#334155]">{b.duration}</span></div>}
          </div>
        )}

        {/* FOOTAGE INSPO — click-to-expand accordion per Christina's 2026-04-21
            feedback. Beyond the recommended shot list, every brief carries
            a bank of inspo: stuff to shoot, found footage to stitch, gif/meme
            refs, and archive/nostalgic visuals. Collapsed by default so the
            SHOOT block stays calm on first read. */}
        {b.footageInspo && (
          <div className="mt-4 pt-3 border-t border-[var(--border)]">
            <button onClick={()=>setShowFootage(s=>!s)}
              className="w-full flex items-center justify-between gap-3 text-left hover:opacity-80 transition">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-[10.5px] tracking-wider px-2 py-1 rounded" style={{background:"#FEF3C7",color:"#92400E",border:"1px solid #FDE68A"}}>FOOTAGE INSPO</span>
                <span className="text-[13px] text-[var(--ink)]">Where to source every shot — original, found, meme, archive</span>
              </div>
              <span className="font-mono text-[11px] text-[var(--muted)] shrink-0">{showFootage ? "▲ HIDE" : "▼ SHOW"}</span>
            </button>
            {showFootage && (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 fade-in">
                {[
                  {key:"shoot",   label:"SHOOT THIS",           hint:"Original footage to capture in-kitchen/on-set",         color:"#75C596"},
                  {key:"found",   label:"FOUND FOOTAGE / STITCH",hint:"Existing content to pull from or stitch with",          color:"#73B2C9"},
                  {key:"memes",   label:"GIF / MEME REFS",      hint:"Reaction shots + viral formats to riff on",              color:"#A191B2"},
                  {key:"archive", label:"ARCHIVE / NOSTALGIC",  hint:"Period / vintage / b-roll for texture",                  color:"#9E652E"}
                ].map(cat => {
                  const items = (b.footageInspo||{})[cat.key];
                  if(!items || items.length === 0) return null;
                  return (
                    <div key={cat.key} className="rounded-md border border-[var(--border)] bg-[#FAFAF7] p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-block w-[7px] h-[7px] rounded-full" style={{background:cat.color}}></span>
                        <span className="font-mono text-[10.5px] tracking-[0.15em]" style={{color:cat.color}}>{cat.label}</span>
                      </div>
                      <p className="font-mono text-[10px] tracking-wide text-[var(--muted)] mb-2.5 leading-snug">{cat.hint}</p>
                      <ul className="space-y-2">
                        {items.map((it,i)=>(
                          <li key={i} className="text-[13px] text-[#202A44] leading-snug flex gap-2">
                            <span className="text-[var(--muted)] shrink-0">•</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </BriefBlock>

      {/* CAPTIONS */}
      <BriefBlock label="CAPTION VARIANTS">
        {CAPTION_VARIANTS[b.id] ? (
          <div>
            <div className="flex items-center justify-end mb-3">
              <AgentStamp agentId="hook"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <VoiceVariant label="Direct" mood="The receipts" text={CAPTION_VARIANTS[b.id].direct}/>
              <VoiceVariant label="Warm" mood="With a wink" text={CAPTION_VARIANTS[b.id].warm}/>
              <VoiceVariant label="Punchy" mood="Mic drop" text={CAPTION_VARIANTS[b.id].punchy}/>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[10.5px] tracking-wider text-[var(--muted)]">READY-TO-POST CAPTION</div>
              <AgentStamp agentId="hook"/>
            </div>
            <pre className="whitespace-pre-wrap text-[14px] text-[#202A44] leading-relaxed font-sans bg-[#FAFAF7] border border-[var(--border)] rounded-md p-4">{b.caption}</pre>
          </div>
        )}
      </BriefBlock>

      {/* AMPLIFY */}
      {AMPLIFY_PLANS[b.id] && <AmplifyBlock plan={AMPLIFY_PLANS[b.id]}/>}
    </div>
  );
}

// AmplifyBlock is read in 3 clear tiers:
//   1. THE RECOMMENDATION — why we're doing this (pink chip + serif thesis)
//   2. THE BRIEF — operational parameters (unified 4-cell stat strip, guardrail accented red)
//   3. THE PLACEMENTS — tactical per-platform detail (compact cards, one line of summary + audience + optional note)
// Each tier has its own grammar so the reader can navigate at a glance. Added 2026-04-17.
function AmplifyBlock({plan}){
  const platformColors = {Meta:"#73B2C9", TikTok:"#202A44", Pinterest:"#DC2626"};
  const totalPlacement = plan.placements.reduce((s,p)=>s+p.budget,0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-[10px] tracking-[0.18em] text-[var(--ink)]">AMPLIFY</div>
        <AgentStamp agentId="paid"/>
      </div>

      {/* Tier 1 — the recommendation (thesis) */}
      <div className="pl-4 border-l-[3px] mb-5" style={{borderColor:"#EC4899"}}>
        <span className="inline-block font-mono text-[8.5px] tracking-wider px-2 py-[3px] rounded mb-2.5 text-white" style={{background:"#EC4899"}}>
          ◆ PAID MEDIA PLANNER
        </span>
        <p className="font-serif text-[17px] leading-snug text-[#202A44] mb-2">{plan.headline}</p>
        <p className="text-[11.5px] text-[#64748B] leading-relaxed">{plan.why}</p>
      </div>

      {/* Tier 2 — the brief (operational stats, unified 4-cell strip) */}
      <div className="grid grid-cols-4 mb-5 rounded-md border border-[var(--border)] bg-[#FAFAF7] overflow-hidden">
        <div className="px-4 py-3 border-r border-[var(--border)]">
          <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mb-1">BUDGET</div>
          <div className="font-serif text-[18px] leading-none text-[#202A44]">${plan.totalBudget}</div>
        </div>
        <div className="px-4 py-3 border-r border-[var(--border)]">
          <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mb-1">TEST WINDOW</div>
          <div className="font-serif text-[14px] leading-snug text-[#202A44]">{plan.testWindow}</div>
        </div>
        <div className="px-4 py-3 border-r border-[var(--border)]">
          <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mb-1">OBJECTIVE</div>
          <div className="font-serif text-[13px] leading-snug text-[#202A44]">{plan.objective}</div>
        </div>
        <div className="px-4 py-3" style={{background:"#FEF2F2"}}>
          <div className="font-mono text-[8.5px] tracking-wider mb-1" style={{color:"#DC2626"}}>⚠ GUARDRAIL</div>
          <div className="text-[11px] leading-snug" style={{color:"#991B1B"}}>{plan.guardrail}</div>
        </div>
      </div>

      {/* Tier 3 — the placements */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">PLACEMENTS · {plan.placements.length}</div>
        <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">Allocated: <span className="text-[#202A44]">${totalPlacement}</span> / ${plan.totalBudget}</div>
      </div>
      <div className="grid gap-2">
        {plan.placements.map((p,i)=>(
          <div key={i} className="p-3.5 rounded-md border border-[var(--border)] bg-white">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-block w-[8px] h-[8px] rounded-full shrink-0" style={{background:platformColors[p.platform]}}></span>
                <span className="font-mono text-[10px] tracking-wider font-semibold" style={{color:platformColors[p.platform]}}>{p.platform.toUpperCase()}</span>
                <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">· {p.format}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-serif text-[14px] text-[#202A44]">${p.budget}</span>
                <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">{p.expectedReach}</span>
              </div>
            </div>
            <p className="text-[11.5px] text-[#334155] leading-relaxed">{p.audience}{p.lookalike ? ` · ${p.lookalike}` : ""}</p>
            {p.note && (
              <p className="text-[10.5px] text-[#94A3B8] leading-relaxed mt-1.5 italic">{p.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BriefBlock({label, children, last}){
  return (
    <div className={last?"":"mb-7 pb-7 border-b border-[var(--border)]"}>
      <div className="font-mono text-[12px] tracking-[0.18em] text-[var(--ink)] mb-3">{label}</div>
      {children}
    </div>
  );
}

// The briefs list is the hero — cards in a responsive grid. Clicking opens the
// full brief detail as a modal overlay (per 2026-04-17 feedback: the old
// 4/8-column split buried the list behind the detail). Keyboard Escape + click
// outside both close the modal.
function BriefDetailModal({open, brief, onClose, nav}){
  useEffect(()=>{
    if(!open) return;
    const onKey = e => { if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    // Lock body scroll while the modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return ()=>{ window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  },[open,onClose]);

  if(!open || !brief) return null;
  return (
    <div className="fixed inset-0 z-[70] fade-in flex items-start justify-center px-4 py-6 md:py-10 overflow-y-auto scrollbar"
      style={{background:"rgba(15,23,42,0.55)", backdropFilter:"blur(3px)"}}
      onClick={onClose}>
      {/* Shell is just a positioning wrapper — BriefDetail brings its own card chrome via its root `card p-7` class */}
      <div className="w-full max-w-[1000px] relative my-auto shadow-2xl rounded-[10px]"
        onClick={e=>e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[var(--ink)] bg-white border border-[var(--border)] hover:bg-[#F6F6F0] transition z-10"
          aria-label="Close brief">
          <span className="text-[18px] leading-none">×</span>
        </button>
        <BriefDetail b={brief} nav={nav}/>
      </div>
    </div>
  );
}

function ContentBriefs({selectedId, briefModalOpen, openBrief, closeBrief, nav, topRight, studioAdopted}){
  // Adopted Studio briefs render through the same grid as engine briefs,
  // pinned to the top so a just-adopted brief is immediately visible.
  const allBriefs = useMemo(()=>[...(studioAdopted || []), ...BRIEFS], [studioAdopted]);
  const active = useMemo(()=>allBriefs.find(b=>b.id===selectedId) || null, [selectedId, allBriefs]);
  const studioCount = (studioAdopted || []).length;

  // Pillar grouping — 2026-04-21 refactor. Christina's ask: group Content Briefs
  // by pillar (the strategic lens), not priority. Pillar chips + section headers
  // designate; priority lives on each card as a chip. Within each pillar,
  // briefs sort by priority (BIG SWING → HIGH → STANDARD) so the heaviest plays
  // still read first inside their lane.
  const PILLAR_ORDER = [
    {key:"HEALTH/WELLNESS",     color:"#73B2C9"},
    {key:"INGREDIENTS/RECIPES", color:"#75C596"},
    {key:"PARENTING",           color:"#9E652E"},
    {key:"REVIEWS/RECS",        color:"#A191B2"}
  ];
  const PRIORITY_RANK = {"BIG SWING":0,"HIGH":1,"STANDARD":2};
  const briefsByPillar = PILLAR_ORDER.map(p => {
    const list = allBriefs
      .filter(b => b.pillar === p.key)
      .sort((a,b) => (PRIORITY_RANK[a.priority]??9) - (PRIORITY_RANK[b.priority]??9));
    const bigSwingCount = list.filter(b => b.priority === "BIG SWING").length;
    return {...p, briefs:list, bigSwingCount};
  }).filter(p => p.briefs.length > 0);

  const isActive = (b) => briefModalOpen && active && active.id === b.id;

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-6 pb-4 border-b border-[var(--border)]">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="font-mono text-[9px] tracking-[0.18em] text-[var(--muted)] mb-1">
              {WELCOME_WEEK_RANGE} · {BRIEFS.length} BRIEFS{studioCount>0 ? " · "+studioCount+" STUDIO-ADOPTED" : ""}
            </div>
            <h1 className="font-serif text-[28px] leading-none tracking-tight">Content Briefs</h1>
            <p className="text-[12px] text-[var(--muted)] mt-1.5 max-w-2xl">{BRIEFS.length} briefs generated this week from {SCANNED_TOTAL} signals{studioCount>0 ? ", plus "+studioCount+" riffed in the Studio" : ""}. Organized by content pillar — so you can see at a glance where the week leans. Priority chip on each card tells you which to ship first. Click any brief to open its full detail.</p>
          </div>
          {topRight}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar px-8 py-6">
        <div className="max-w-[1400px]">

          {/* Pillar bands — each pillar gets a color-chip header + card grid.
              Briefs within a pillar sort by priority (BIG SWING first), and the
              per-card priority chip carries the "ship this first" signal. */}
          {briefsByPillar.map(p => (
            <div key={p.key} className="mb-10">
              <div className="flex items-center justify-between mb-3 pb-2 border-b-[2px]" style={{borderColor:p.color}}>
                <div className="flex items-center gap-2.5">
                  <span className="inline-block w-[10px] h-[10px] rounded-full" style={{background:p.color}}></span>
                  <span className="font-mono text-[11px] tracking-[0.2em]" style={{color:p.color}}>{p.key}</span>
                </div>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">
                  {p.briefs.length} {p.briefs.length===1?"BRIEF":"BRIEFS"}{p.bigSwingCount>0 ? " · "+p.bigSwingCount+" BIG SWING"+(p.bigSwingCount>1?"S":"") : ""}
                </div>
              </div>
              <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {p.briefs.map(b=>(
                  <BriefListItem key={b.id} b={b}
                    active={isActive(b)} onClick={()=>openBrief(b.id)}/>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BriefDetailModal open={briefModalOpen} brief={active} onClose={closeBrief} nav={nav}/>
    </div>
  );
}

function KPI({label, value, sub, accent}){
  return (
    <div className="card p-5">
      <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-2">{label}</div>
      <div className="font-serif text-[32px] leading-none tracking-tight" style={accent?{color:accent}:{}}>{value}</div>
      {sub && <div className="font-mono text-[9.5px] tracking-wider text-[var(--muted)] mt-2">{sub}</div>}
    </div>
  );
}

function ResultRow({r, nav}){
  const deltaColor = r.savesDelta >= 3 ? "#75C596" : r.savesDelta >= 1 ? "#202A44" : "#DC2626";
  return (
    <div className="card p-4 fade-in">
      <div className="flex items-center gap-4">
        {/* Saves delta */}
        <div className="shrink-0 w-[52px] text-center">
          <div className="font-serif text-[20px] leading-none" style={{color:deltaColor}}>{r.savesDelta.toFixed(1)}×</div>
          <div className="font-mono text-[7px] tracking-wider text-[var(--muted)] mt-0.5">SAVES</div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="inline-block w-[6px] h-[6px] rounded-full" style={{background:r.pillarColor}}></span>
            <span className="font-mono text-[8.5px] tracking-wider text-[var(--muted)]">{r.platform.toUpperCase()} · {r.pillar}</span>
            {r.hero && <span className="font-mono text-[7.5px] tracking-wider px-1.5 py-0.5 rounded" style={{background:"#202A44",color:"#FACC15"}}>★ TOP POST</span>}
          </div>
          <div className="font-serif text-[14px] leading-snug text-[#202A44]">{r.concept}</div>
          {r.note && <p className="text-[10.5px] text-[#64748B] leading-snug mt-1 italic">{r.note}</p>}
        </div>

        {/* Inline stats */}
        <div className="shrink-0 flex items-center gap-4">
          <div className="text-center">
            <div className="font-mono text-[7.5px] tracking-wider text-[var(--muted)]">REACH</div>
            <div className="text-[13px] font-serif text-[#202A44]">{fmtNum(r.views)}</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-[7.5px] tracking-wider text-[var(--muted)]">SAVES</div>
            <div className="text-[13px] font-serif text-[#202A44]">{fmtNum(r.saves)}</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-[7.5px] tracking-wider text-[var(--muted)]">SHARES</div>
            <div className="text-[13px] font-serif text-[#202A44]">{fmtNum(r.shares)}</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-[7.5px] tracking-wider text-[var(--muted)]">SENT.</div>
            <div className="text-[13px] font-serif" style={{color:"#75C596"}}>+{Math.round(r.sentiment*100)}%</div>
          </div>
        </div>
      </div>

      {/* Driven by — compact */}
      {r.trendId ? (
        <button onClick={()=>nav.goToTrend(r.trendId)} className="font-mono text-[8px] tracking-wider text-[var(--muted)] mt-1.5 ml-[68px] hover:text-[var(--blue)] transition text-left">
          ↳ {r.sourceTrend} ↗
        </button>
      ) : (
        <div className="font-mono text-[8px] tracking-wider text-[var(--muted)] mt-1.5 ml-[68px]">↳ {r.sourceTrend}</div>
      )}
    </div>
  );
}

function InsightCard({i}){
  const a = AGENT_BY_ID[i.agent];
  return (
    <div className="card p-5 fade-in">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-block w-[6px] h-[6px] rounded-full" style={{background:a.color}}></span>
        <span className="font-mono text-[9px] tracking-wider" style={{color:a.color}}>{a.name.toUpperCase()} · ENGINE INSIGHT</span>
      </div>
      <div className="font-serif text-[16px] leading-snug text-[#202A44] mb-2">{i.title}</div>
      <p className="text-[12px] text-[#334155] leading-relaxed">{i.detail}</p>
    </div>
  );
}

function FormatPerformance(){
  // group by pillar, average savesDelta
  const byPillar = {};
  LAST_WEEK_RESULTS.forEach(r=>{
    if(!byPillar[r.pillar]) byPillar[r.pillar] = {sum:0, count:0, color:r.pillarColor};
    byPillar[r.pillar].sum += r.savesDelta;
    byPillar[r.pillar].count += 1;
  });
  const rows = Object.entries(byPillar).map(([k,v])=>({pillar:k, avg:v.sum/v.count, color:v.color})).sort((a,b)=>b.avg-a.avg);
  const max = Math.max(...rows.map(r=>r.avg));
  return (
    <div className="card p-5">
      <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-4">PILLAR PERFORMANCE · AVG SAVES VS BRAND BASELINE</div>
      <div className="grid gap-3">
        {rows.map(r=>(
          <div key={r.pillar}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] tracking-wider" style={{color:r.color}}>{r.pillar}</span>
              <span className="font-serif text-[14px]" style={{color:r.color}}>{r.avg.toFixed(1)}×</span>
            </div>
            <div className="h-[6px] rounded-full bg-[#DCD6C8] overflow-hidden">
              <div className="h-full rounded-full" style={{width:(r.avg/max*100)+"%", background:r.color}}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simulated "now" for the Playbook — the weekly refresh updates this so statuses line up with the data week.
// Using a fixed date keeps demo statuses consistent; swap to `new Date()` once the data window matches real time.
const SIMULATED_NOW = new Date(2026, 4, 25, 11, 30); // Mon May 25 2026, 11:30am — getDay() resolves to the correct weekday
const DAY_TODAY = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][SIMULATED_NOW.getDay()];
const MONTH_IDX = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};

function parseBriefTiming(timing){
  if(!timing) return null;
  const m = timing.match(/(\w{3})\s+(\w{3})\s+(\d+)\s*·\s*(\d+)(am|pm)/i);
  if(!m) return null;
  const [, , monName, dayNum, hrStr, ampm] = m;
  let h = parseInt(hrStr);
  if(ampm.toLowerCase() === "pm" && h !== 12) h += 12;
  if(ampm.toLowerCase() === "am" && h === 12) h = 0;
  return new Date(2026, MONTH_IDX[monName], parseInt(dayNum), h, 0);
}

function getBriefStatus(b){
  const t = parseBriefTiming(b.timing);
  if(!t) return {label:"QUEUED", color:"#475569", bg:"#F1F5F9", sort:100};
  const diffMs = t - SIMULATED_NOW;
  const diffHr = diffMs / 3600000;
  const nowDay = new Date(SIMULATED_NOW.getFullYear(), SIMULATED_NOW.getMonth(), SIMULATED_NOW.getDate());
  const tDay = new Date(t.getFullYear(), t.getMonth(), t.getDate());
  const dayDiff = Math.round((tDay - nowDay) / 86400000);
  if(Math.abs(diffHr) <= 0.5) return {label:"LIVE", color:"#FFFFFF", bg:"#DC2626", sort:0, pulse:true};
  if(dayDiff < 0 || diffHr < -0.5) return {label:"SHIPPED", color:"#FFFFFF", bg:"#94A3B8", sort:1, shipped:true};
  if(dayDiff === 0) return {label:"IN "+Math.round(diffHr)+"H", color:"#92400E", bg:"#FEF3C7", sort:2};
  if(dayDiff === 1) return {label:"TMRW", color:"#0E7490", bg:"#CFFAFE", sort:3};
  if(dayDiff < 7) return {label:"+"+dayDiff+"D", color:"#0E7490", bg:"#CFFAFE", sort:4};
  return {label:"QUEUED", color:"#475569", bg:"#F1F5F9", sort:5};
}

function StatusChip({status, small}){
  if(!status) return null;
  const sm = small;
  return (
    <span className={"inline-flex items-center gap-1 font-mono tracking-wider rounded-full "+(sm?"text-[7.5px] px-1.5 py-[1px]":"text-[8.5px] px-2 py-[2px]")}
      style={{color:status.color, background:status.bg}}>
      {status.pulse && <span className="inline-block rounded-full animate-pulse" style={{width:"5px", height:"5px", background:"#FFFFFF"}}></span>}
      {status.shipped && <span>✓</span>}
      {status.label}
    </span>
  );
}

// Phone-frame preview that pops on brief-cell hover. Uses fixed positioning so it
// escapes the calendar's overflow:hidden container.
function BriefHoverPreview({data}){
  if(!data) return null;
  const b = data.brief;
  const x = Math.min(data.x, window.innerWidth - 210);
  const y = Math.min(data.y, window.innerHeight - 340);
  const hasScript = b.script && b.script.length;
  const first = hasScript ? b.script[0] : null;
  return (
    <div className="fixed z-[200] pointer-events-none fade-in" style={{left:x, top:y, width:"186px"}}>
      <div className="rounded-[22px] overflow-hidden shadow-2xl"
        style={{
          aspectRatio:"9/16",
          background:"linear-gradient(165deg, "+b.pillarColor+" 0%, #1E293B 55%, #0F172A 100%)",
          border:"2.5px solid "+b.pillarColor,
          boxShadow:"0 20px 40px rgba(15,23,42,0.35), 0 0 0 1px "+b.pillarColor+"66"
        }}>
        {/* Phone notch */}
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="rounded-full" style={{width:"36px", height:"4px", background:"#334155"}}></div>
        </div>
        {/* Header chip */}
        <div className="px-3 pt-1 pb-2">
          <div className="font-mono text-[8px] tracking-wider text-white/80">{b.platform.toUpperCase()}</div>
          <div className="font-mono text-[7.5px] tracking-wider text-white/60 mt-0.5">{b.timing.toUpperCase()}</div>
        </div>
        {/* Content area */}
        <div className="px-3 pb-3 flex flex-col" style={{minHeight:"240px"}}>
          {hasScript ? (
            <>
              <div className="font-mono text-[8.5px] tracking-wider text-white uppercase">{first.scene || "OPENING FRAME"}</div>
              <div className="font-mono text-[7.5px] tracking-wider text-white/60 mt-0.5">{first.time}</div>
              <p className="text-[9.5px] text-white/95 leading-snug mt-2 flex-1 overflow-hidden" style={{display:"-webkit-box", WebkitLineClamp:7, WebkitBoxOrient:"vertical"}}>{first.action}</p>
              {/* Frame progress strip */}
              <div className="flex gap-[2px] mt-2 mb-1.5">
                {b.script.map((_,i)=>(
                  <div key={i} className="flex-1 rounded-full" style={{height:"2px", background:i===0?"#FFFFFF":"rgba(255,255,255,0.25)"}}></div>
                ))}
              </div>
              <div className="font-mono text-[7.5px] tracking-wider text-white/60 text-center">FRAME 1 / {b.script.length}</div>
            </>
          ) : (
            <>
              <div className="font-mono text-[8.5px] tracking-wider text-white uppercase">VISUAL DIRECTION</div>
              <p className="text-[9.5px] text-white/95 leading-snug mt-2 flex-1 overflow-hidden" style={{display:"-webkit-box", WebkitLineClamp:9, WebkitBoxOrient:"vertical"}}>{b.concept}</p>
              <p className="text-[9px] text-white/75 leading-snug mt-2 overflow-hidden" style={{display:"-webkit-box", WebkitLineClamp:4, WebkitBoxOrient:"vertical"}}>{b.visual ? b.visual.substring(0,180)+(b.visual.length>180?"…":"") : ""}</p>
              <div className="font-mono text-[7.5px] tracking-wider text-white/60 text-center mt-auto pt-2">STATIC · NO STORYBOARD</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Content Calendar state helpers (live editing) ──────────
// Calendar overrides: briefId → { day, timeLabel, platform } when the user
// has dragged a brief. If no override, the brief's default `timing` +
// `platform` fields apply. Overrides persist in localStorage so the demo
// state survives tab navigation + reloads.
const PLAYBOOK_OVERRIDES_KEY = "willas-calendar-overrides";
const PLAYBOOK_MANUAL_KEY    = "willas-calendar-manual";
const PLAYBOOK_EDITS_KEY     = "willas-calendar-edits";

function loadJson(key, fallback){ try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch(e){ return fallback; } }
function saveJson(key, val){ try { localStorage.setItem(key, JSON.stringify(val)); } catch(e){} }

function WeeklyPlaybook({nav, topRight}){
  const [hoverData, setHoverData] = useState(null);
  const [showLogic, setShowLogic] = useState(false);
  // Live-editing state
  const [overrides, setOverrides] = useState(()=> loadJson(PLAYBOOK_OVERRIDES_KEY, {}));
  const [manualBriefs, setManualBriefs] = useState(()=> loadJson(PLAYBOOK_MANUAL_KEY, []));
  const [edits, setEdits] = useState(()=> loadJson(PLAYBOOK_EDITS_KEY, {})); // briefId → { concept }
  const [draggingId, setDraggingId] = useState(null);
  const [dragOverCell, setDragOverCell] = useState(null); // "platKey|day"
  const [editingId, setEditingId] = useState(null);       // briefId currently inline-editing

  useEffect(()=> saveJson(PLAYBOOK_OVERRIDES_KEY, overrides), [overrides]);
  useEffect(()=> saveJson(PLAYBOOK_MANUAL_KEY, manualBriefs), [manualBriefs]);
  useEffect(()=> saveJson(PLAYBOOK_EDITS_KEY, edits), [edits]);

  function showHover(e, b){
    if (draggingId) return; // don't show hover card while dragging
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverData({brief:b, x:rect.right + 10, y:rect.top - 10});
  }
  function hideHover(){ setHoverData(null); }

  const PLATFORMS = [
    {key:"ig", label:"IG / FB", match: p => p.startsWith("IG"), defaultPlatform: "IG Reel"},
    {key:"tt", label:"TikTok", match: p => p === "TikTok", defaultPlatform: "TikTok"},
    {key:"pin", label:"Pinterest", match: p => p === "Pinterest", defaultPlatform: "Pinterest"},
    {key:"other", label:"Other", match: p => !p.startsWith("IG") && p !== "TikTok" && p !== "Pinterest", defaultPlatform: "Threads"}
  ];
  const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  function getDay(timing){ return timing ? timing.split(" ")[0] : null; }
  function getTime(timing){
    if(!timing) return "";
    const m = timing.match(/(\d{1,2}(?:am|pm))/);
    return m ? m[1] : "";
  }

  // Apply overrides + edits to produce "effective" briefs for rendering
  function effective(b){
    const o = overrides[b.id];
    const e = edits[b.id];
    return {
      ...b,
      timing: o && o.timing ? o.timing : b.timing,
      platform: o && o.platform ? o.platform : b.platform,
      concept: e && e.concept ? e.concept : b.concept,
    };
  }

  const allBriefs = [...BRIEFS.map(effective), ...manualBriefs.map(effective)];

  // Group briefs by platform bucket + day
  const grid = {};
  PLATFORMS.forEach(pl => {
    grid[pl.key] = {};
    DAYS.forEach(d => grid[pl.key][d] = []);
  });

  allBriefs.forEach(b => {
    const day = getDay(b.timing);
    if(!day) return;
    const plat = PLATFORMS.find(pl => pl.match(b.platform));
    if(plat && grid[plat.key][day]) grid[plat.key][day].push(b);
  });

  const platCounts = PLATFORMS.map(pl => ({
    ...pl,
    count: allBriefs.filter(b => pl.match(b.platform)).length
  })).filter(p => p.count > 0);

  // ── Drag + drop handlers ─────────────────────────────────
  function onDragStart(e, briefId){
    setDraggingId(briefId);
    setHoverData(null);
    try {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", briefId);
    } catch(err){}
  }
  function onDragEnd(){ setDraggingId(null); setDragOverCell(null); }
  function onDragOver(e, plKey, day){
    e.preventDefault();
    try { e.dataTransfer.dropEffect = "move"; } catch(err){}
    setDragOverCell(`${plKey}|${day}`);
  }
  function onDrop(e, plKey, day){
    e.preventDefault();
    const briefId = draggingId || e.dataTransfer.getData("text/plain");
    if (!briefId) return;
    moveBriefTo(briefId, plKey, day);
    setDraggingId(null);
    setDragOverCell(null);
  }

  // Move a brief to a (platform bucket, day). Preserves original time slot;
  // remaps platform to the bucket's default if the brief crossed buckets.
  function moveBriefTo(briefId, plKey, day){
    const source = allBriefs.find(b => b.id === briefId);
    if (!source) return;
    const bucket = PLATFORMS.find(p => p.key === plKey);
    const originalBucket = PLATFORMS.find(p => p.match(source.platform));
    const newPlatform = originalBucket && originalBucket.key === plKey
      ? source.platform               // same bucket → preserve IG Reel vs IG Feed
      : bucket.defaultPlatform;        // cross-bucket → snap to default
    const time = getTime(source.timing) || "11am";
    // Date from existing timing (e.g. "Mon Apr 27 · 12pm") — keep date portion if present
    const m = (source.timing || "").match(/[A-Z][a-z]+\s+(\w+\s+\d+)\s*·/);
    const datePart = m ? m[1] : "";
    const newTiming = `${day} ${datePart ? datePart + " · " : ""}${time}`.trim();

    if (briefId.startsWith("manual_")) {
      // Manual brief — update in manualBriefs
      setManualBriefs(prev => prev.map(mb => mb.id === briefId ? {...mb, platform: newPlatform, timing: newTiming} : mb));
    } else {
      setOverrides(prev => ({...prev, [briefId]: { platform: newPlatform, timing: newTiming }}));
    }
  }

  function addManualBrief(plKey, day){
    const bucket = PLATFORMS.find(p => p.key === plKey);
    const id = "manual_" + Date.now().toString(36);
    const m = allBriefs.find(b => getDay(b.timing) === day);
    const datePart = m ? (m.timing.match(/[A-Z][a-z]+\s+(\w+\s+\d+)\s*·/) || [])[1] : "";
    const timing = `${day} ${datePart ? datePart + " · " : ""}11am`.trim();
    const draft = {
      id,
      platform: bucket.defaultPlatform,
      pillar: "INGREDIENTS/RECIPES",
      pillarColor: "#75C596",
      flavor: "Multi",
      timing,
      priority: "STANDARD",
      concept: "Your own idea — click to edit",
      intel: [],
      hooks: [{text:"(Write your hook here)", recommended:true}],
      caption: "",
      manual: true,
      createdAt: Date.now()
    };
    setManualBriefs(prev => [draft, ...prev]);
    setEditingId(id);
  }

  function deleteManualBrief(id){
    setManualBriefs(prev => prev.filter(b => b.id !== id));
  }

  function resetCalendar(){
    if (!confirm("Reset the calendar to the engine's suggested schedule? Your manual posts + edits will be cleared.")) return;
    setOverrides({});
    setManualBriefs([]);
    setEdits({});
  }

  function saveEdit(briefId, concept){
    setEdits(prev => ({...prev, [briefId]: { ...(prev[briefId]||{}), concept }}));
    setEditingId(null);
  }

  const hasEdits = Object.keys(overrides).length > 0 || manualBriefs.length > 0 || Object.keys(edits).length > 0;

  return (
    <div className="flex flex-col h-full">
      <Ticker/>
      <div className="flex-1 overflow-y-auto scrollbar">
        <div className="px-8 py-7">
          <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
            <div>
              <div className="font-mono text-[9px] tracking-[0.18em] text-[var(--muted)] mb-2">{WELCOME_WEEK_RANGE} · MISSION BOARD</div>
              <h1 className="font-serif text-[28px] tracking-tight leading-none">Content Calendar</h1>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Phase D — week-level strategist entry point. Opens the
                  global strategist with this week's brief slate already in
                  its context (buildWeekContext now surfaces all 17 briefs
                  + pillar / flavor distribution). Per-slot strategist
                  access lives on the brief detail page (BriefRiffPanel). */}
              {nav && nav.riffWithStrategist && (
                <button
                  onClick={()=> nav.riffWithStrategist()}
                  className="font-mono text-[10px] tracking-wider px-3 py-1.5 rounded-md text-white transition-all hover:shadow-md flex items-center gap-1.5"
                  style={{background:"var(--ink)"}}
                  title="Ask the strategist a week-level question — slate balance, weak briefs, what's missing.">
                  <span>✦</span>
                  ASK ABOUT THIS WEEK
                </button>
              )}
              {topRight}
            </div>
          </div>

          {/* POSTING LOGIC — click-to-expand callout explaining why a brief landed
              in a given day/time slot. Collapsed by default to keep the page
              calm; expanded state shows the ET posting windows per platform
              (from Willa's content calendar, Mar 2026). */}
          <div className="mb-7 rounded-md border border-[var(--border)] bg-white overflow-hidden">
            <button onClick={()=>setShowLogic(s => !s)}
              className="w-full px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-[#F6F6F0] transition">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-[9px] tracking-wider px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#1E40AF] border border-[#DBEAFE]">POSTING LOGIC</span>
                <span className="text-[11.5px] text-[var(--ink)]">Why these days + times?</span>
                <span className="font-mono text-[9px] tracking-wider text-[var(--muted)] hidden md:inline">{POSTING_LOGIC.note}</span>
              </div>
              <span className="font-mono text-[11px] text-[var(--muted)] shrink-0">{showLogic ? "▲ HIDE" : "▼ SHOW"}</span>
            </button>
            {showLogic && (
              <div className="px-4 pb-4 pt-1 border-t border-[var(--border)] bg-[#FAFAF7] fade-in">
                <div className="text-[11.5px] text-[var(--muted)] mb-3 leading-snug md:hidden">{POSTING_LOGIC.note}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {POSTING_LOGIC.platforms.map(p => (
                    <div key={p.platform} className="rounded-md border border-[var(--border)] bg-white p-3">
                      <div className="font-mono text-[9.5px] tracking-[0.18em] text-[var(--ink)] mb-2">{p.platform.toUpperCase()}</div>
                      <div className="flex flex-col gap-1.5">
                        {p.windows.map((w,i) => (
                          <div key={i} className="flex items-center justify-between gap-3 text-[12px]">
                            <span className="flex items-center gap-2">
                              <span className={"inline-block w-1.5 h-1.5 rounded-full "+(w.best ? "" : "opacity-40")} style={{background:w.best?"#75C596":"#94A3B8"}}></span>
                              <span className={w.best?"font-medium":""}>{w.label}</span>
                            </span>
                            <span className="font-mono text-[10.5px] text-[var(--muted)]">{w.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[11px] text-[var(--muted)] leading-snug">
                  <span className="font-medium text-[var(--ink)]">How the engine uses this:</span> every brief's suggested day + time is picked from these windows. Big-swing + high-priority briefs land in BEST slots first; standard-priority briefs fill morning + evening windows. Weekend briefs skew recipes + family moments to match audience behavior.
                </div>
              </div>
            )}
          </div>

          {/* How to use this Playbook — live feature banner. Replaces the old
              "COMING TO THE PLAYBOOK" mockup (2026-04-22): these are now live. */}
          <div className="mb-6 rounded-lg overflow-hidden" style={{background:"linear-gradient(180deg, #FFFEF7 0%, #FAFAF7 100%)", border:"1px solid #E8E1C2"}}>
            <div className="px-4 py-3 border-b border-[#E8E1C2] flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full" style={{background:"#202A44", color:"#FACC15", fontSize:"12px", fontWeight:700}}>▸</span>
                <span className="font-mono text-[9.5px] tracking-[0.22em] text-[#202A44]">HOW TO USE THIS CALENDAR</span>
              </div>
              {hasEdits && (
                <button onClick={resetCalendar}
                  className="font-mono text-[8.5px] tracking-wider px-2 py-1 rounded border border-[var(--border)] bg-white hover:bg-[#F6F6F0] transition text-[var(--muted)]">
                  ↻ RESET TO ENGINE SUGGESTIONS
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 px-4 py-3">
              {[
                {icon:"⋮⋮", label:"DRAG TO RESCHEDULE", copy:"Grab any brief by the handle. Drop it in a different day or platform. Engine suggestions stay; your moves override."},
                {icon:"✎",  label:"EDIT IN PLACE", copy:"Click a brief's concept to rewrite it inline. Saves on blur. Full detail still a click away."},
                {icon:"+",  label:"ADD YOUR OWN POST", copy:"Click an empty slot's '+' to drop in something the engine didn't know about (collab post, launch moment, retail activation)."}
              ].map((f,i)=>(
                <div key={i} className="flex items-start gap-2.5 py-1">
                  <span className="font-mono text-[13px] text-[#202A44] leading-none w-[20px] shrink-0 mt-0.5">{f.icon}</span>
                  <div className="min-w-0">
                    <div className="font-mono text-[9px] tracking-[0.15em] text-[#202A44] mb-0.5">{f.label}</div>
                    <p className="text-[11px] text-[#475569] leading-relaxed">{f.copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-[#E8E1C2] flex items-center gap-2 bg-[#FFFEF7]">
              <span className="inline-block w-[7px] h-[7px] rounded-full" style={{background:"#75C596", boxShadow:"0 0 0 3px rgba(117,197,150,0.28)"}}></span>
              <span className="font-mono text-[9px] tracking-wider text-[#202A44]">RIDE-NOW</span>
              <span className="text-[11px] text-[var(--muted)] leading-snug">= time-sensitive briefs that decay within a week. Ship these first; the engine flags them when the driving moment is fresh.</span>
            </div>
          </div>


          {/* Weekly grid */}
          <div className="card">
            {/* Day headers */}
            <div className="grid border-b border-[var(--border)]" style={{gridTemplateColumns:"110px repeat(7, 1fr)"}}>
              <div className="px-4 py-3 border-r border-[var(--border)] bg-[#FAFAF7] rounded-tl-[10px]">
                <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">PLATFORM</span>
              </div>
              {DAYS.map((d,di) => {
                const isToday = d === DAY_TODAY;
                const isWeekend = d === "Sat" || d === "Sun";
                const isLast = di === DAYS.length - 1;
                return (
                  <div key={d}
                    className={"relative px-3 py-3 text-center border-r border-[var(--border)] last:border-r-0 transition "+(isLast?"rounded-tr-[10px]":"")+" "+(isToday?"":(isWeekend?"bg-[#F5F5F2]":"bg-[#FAFAF7]"))}
                    style={isToday ? {background:"linear-gradient(180deg,#FFFBEB,#FEF3C7)"} : null}>
                    <span className={"font-mono text-[9px] tracking-wider "+(isToday?"text-[#92400E] font-semibold":"text-[var(--muted)]")}>{d.toUpperCase()}</span>
                    {isToday && (
                      <div className="absolute -bottom-[1px] left-0 right-0 h-[2.5px]" style={{background:"#F59E0B"}}></div>
                    )}
                    {isToday && (
                      <div className="font-mono text-[7.5px] tracking-wider text-[#92400E] mt-0.5 flex items-center justify-center gap-1">
                        <span className="inline-block w-[4px] h-[4px] rounded-full bg-[#DC2626] animate-pulse"></span>
                        YOU ARE HERE
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Platform rows */}
            {platCounts.map((pl,plIdx) => (
              <div key={pl.key} className={"grid border-b border-[var(--border)] last:border-b-0"} style={{gridTemplateColumns:"110px repeat(7, 1fr)"}}>
                <div className={"px-4 py-3 border-r border-[var(--border)] bg-[#FAFAF7] flex items-center "+(plIdx===platCounts.length-1?"rounded-bl-[10px]":"")}>
                  <span className="font-mono text-[10px] tracking-wider font-medium">{pl.label}</span>
                </div>
                {DAYS.map((d,di) => {
                  const cellBriefs = grid[pl.key][d] || [];
                  const isToday = d === DAY_TODAY;
                  const isWeekend = d === "Sat" || d === "Sun";
                  const isLastRow = plIdx === platCounts.length - 1;
                  const isLastCol = di === DAYS.length - 1;
                  const cellKey = `${pl.key}|${d}`;
                  const isDragTarget = dragOverCell === cellKey && draggingId;
                  const cellClass = "relative px-2 py-2 border-r border-[var(--border)] last:border-r-0 flex flex-col gap-1.5 min-h-[94px] transition"
                    + (isLastRow && isLastCol ? " rounded-br-[10px]" : "")
                    + (isToday ? "" : (isWeekend ? " bg-[#F5F5F2]" : ""))
                    + (isDragTarget ? " outline outline-2 outline-dashed outline-[#75C596]" : "");
                  const cellStyle = isToday && !isDragTarget
                    ? {background:"linear-gradient(180deg,rgba(254,243,199,0.45),rgba(254,243,199,0.15))"}
                    : (isDragTarget ? {background:"rgba(117,197,150,0.08)"} : null);
                  return (
                    <div key={d} className={cellClass} style={cellStyle}
                      onDragOver={(e)=>onDragOver(e, pl.key, d)}
                      onDragLeave={()=>{ if (dragOverCell === cellKey) setDragOverCell(null); }}
                      onDrop={(e)=>onDrop(e, pl.key, d)}>
                      {cellBriefs.map(b => {
                        const status = getBriefStatus(b);
                        const isDragging = draggingId === b.id;
                        const isEditing = editingId === b.id;
                        const isManual = b.id && b.id.startsWith("manual_");
                        const rideNow = b.rideNow === true;
                        return (
                          <div key={b.id} className={"relative group "+(isDragging?"opacity-30":"")}>
                            {/* Real drag handle — HTML5 drag + drop */}
                            {!status.shipped && (
                              <span
                                draggable
                                onDragStart={(e)=>onDragStart(e, b.id)}
                                onDragEnd={onDragEnd}
                                title="Drag to reschedule"
                                className="absolute left-1 top-1 z-[2] font-mono text-[9px] text-[var(--muted)] opacity-0 group-hover:opacity-100 transition cursor-grab active:cursor-grabbing hover:text-[var(--ink)] select-none">
                                ⋮⋮
                              </span>
                            )}
                            {isManual && !status.shipped && (
                              <button
                                onClick={(e)=>{e.stopPropagation(); deleteManualBrief(b.id);}}
                                title="Remove this post"
                                className="absolute right-1 top-1 z-[2] font-mono text-[11px] text-[var(--muted)] opacity-0 group-hover:opacity-100 transition hover:text-[var(--red)] select-none leading-none">
                                ×
                              </button>
                            )}
                            <div
                              className={"w-full p-2 rounded-md border transition "+
                                (status.shipped?"bg-[#F8FAFC] border-[#E2E8F0]":"bg-white border-[var(--border)] hover:border-[#202A44] hover:shadow-md")+
                                (rideNow ? " ring-2 ring-offset-0" : "")+
                                (isManual ? " border-dashed" : "")}
                              style={rideNow ? {
                                boxShadow:"0 0 0 2px rgba(117,197,150,0.55), 0 2px 10px rgba(117,197,150,0.24)",
                                borderColor:"#75C596"
                              } : null}
                              onMouseEnter={e=>showHover(e,b)}
                              onMouseLeave={hideHover}>
                              {rideNow && !status.shipped && (
                                <div className="absolute -top-1.5 -right-1.5 z-[3] flex items-center gap-1 px-1.5 py-[2px] rounded-full font-mono text-[7.5px] tracking-wider text-white" style={{background:"#75C596", boxShadow:"0 1px 6px rgba(117,197,150,0.5)"}}>
                                  <span className="inline-block w-1 h-1 rounded-full bg-white animate-pulse"></span>
                                  RIDE NOW
                                </div>
                              )}
                              <div className="flex items-center justify-between gap-1 mb-1 pl-2.5">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className="inline-block w-[6px] h-[6px] rounded-full shrink-0" style={{background:b.pillarColor}}></span>
                                  <span className="font-mono text-[8px] tracking-wider text-[var(--muted)]">{getTime(b.timing)}</span>
                                </div>
                                <StatusChip status={status} small/>
                              </div>
                              {isEditing ? (
                                <textarea
                                  autoFocus
                                  defaultValue={b.concept}
                                  onBlur={(e)=>saveEdit(b.id, e.target.value.trim() || b.concept)}
                                  onKeyDown={(e)=>{
                                    if (e.key === "Enter" && !e.shiftKey){ e.preventDefault(); e.target.blur(); }
                                    if (e.key === "Escape"){ setEditingId(null); }
                                  }}
                                  className="w-full text-[10px] leading-tight pl-2.5 pr-1 py-0.5 resize-none border border-[#202A44] rounded bg-white text-[#202A44] focus:outline-none"
                                  rows={3}
                                  onClick={e=>e.stopPropagation()}/>
                              ) : (
                                <button
                                  onClick={(e)=>{ e.stopPropagation(); setEditingId(b.id); }}
                                  onDoubleClick={(e)=>{ e.stopPropagation(); if(!isManual) nav.goToBrief(b.id); }}
                                  title="Click to edit · double-click to open full brief"
                                  className={"w-full text-left text-[10px] leading-tight line-clamp-2 pl-2.5 cursor-text "+(status.shipped?"text-[#64748B]":"text-[var(--ink)]")}>
                                  {b.concept}
                                </button>
                              )}
                              <div className="flex items-center justify-between gap-1 mt-1 pl-2.5">
                                <div className="flex items-center gap-1">
                                  {b.priority==="BIG SWING" && <span className="inline-block font-mono text-[7px] tracking-wider px-1.5 py-0.5 rounded-full bg-[var(--red)] text-white">BIG SWING</span>}
                                  {b.priority==="HIGH" && <span className="inline-block font-mono text-[7px] tracking-wider px-1.5 py-0.5 rounded-full bg-[var(--amber)] text-white">HIGH</span>}
                                  {isManual && <span className="inline-block font-mono text-[7px] tracking-wider px-1.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#1E40AF] border border-[#DBEAFE]">YOUR POST</span>}
                                </div>
                                {!isManual && !status.shipped && (
                                  <button
                                    onClick={(e)=>{e.stopPropagation(); nav.goToBrief(b.id);}}
                                    className="font-mono text-[7px] tracking-wider text-[var(--muted)] hover:text-[var(--ink)] opacity-0 group-hover:opacity-100 transition">OPEN →</button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {/* Empty-or-underfilled cell → drop zone / "+ add your own" */}
                      {cellBriefs.length === 0 && (
                        <button
                          onClick={()=>addManualBrief(pl.key, d)}
                          title="Add your own post"
                          className={"w-full min-h-[60px] rounded-md border border-dashed flex flex-col items-center justify-center transition "+
                            (isDragTarget
                              ? "border-[#75C596] bg-[rgba(117,197,150,0.08)] text-[#166534]"
                              : "border-[var(--border)] text-[var(--muted)] hover:border-[#202A44] hover:text-[#202A44] hover:bg-[#FAFAF7] opacity-40 hover:opacity-100")}>
                          <span className="text-[14px] leading-none">+</span>
                          <span className="font-mono text-[7px] tracking-wider mt-0.5">{isDragTarget ? "DROP HERE" : "ADD POST"}</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Phone-frame hover preview — rendered via fixed positioning so it escapes the grid */}
          <BriefHoverPreview data={hoverData}/>
        </div>
      </div>
    </div>
  );
}

function Performance({nav, topRight}){
  const sorted = [...LAST_WEEK_RESULTS].sort((a,b)=>b.savesDelta-a.savesDelta);
  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-6 pb-4 border-b border-[var(--border)]">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-1">RESULTS · MAY 18 – MAY 24, 2026 · LAST WEEK</div>
            <h1 className="font-serif text-[28px] leading-none tracking-tight">Performance</h1>
            <p className="text-[12px] text-[var(--muted)] mt-1.5 max-w-2xl">Last week's briefs, shipped and measured. The engine learns from every result and feeds it back into next week's briefs.</p>
          </div>
          {topRight}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar px-8 py-5">
        <div className="max-w-[1400px]">
          {/* Slim construction strip — matches the Playbook pattern. The full
              paragraph about "illustrative numbers" lived here before; the slim
              version carries the signal in one line. */}
          <div className="mb-5 rounded-md overflow-hidden flex items-stretch" style={{border:"1.5px solid #F59E0B"}}>
            <div className="flex items-center justify-center px-3 shrink-0" style={{background:"repeating-linear-gradient(45deg, #F59E0B 0 8px, #202A44 8px 16px)"}}>
              <span className="text-[13px]">🚧</span>
            </div>
            <div className="flex-1 px-4 py-2 flex items-center gap-2 flex-wrap" style={{background:"#FFFBEB"}}>
              <span className="font-mono text-[9px] tracking-wider px-1.5 py-0.5 rounded text-white" style={{background:"#F59E0B"}}>ILLUSTRATIVE DATA</span>
              <span className="font-mono text-[9px] tracking-wider text-[#92400E]">REAL NUMBERS LAND WHEN META / TIKTOK / SHOPIFY / KLAVIYO WIRE UP</span>
            </div>
          </div>

          {/* Revenue Impact hero — editorial header, big numbers, quiet footer */}
          <div className="card p-6 mb-5" style={{borderLeft:"3px solid #75C596"}}>
            <div className="mb-5">
              <div className="font-mono text-[9px] tracking-[0.18em] text-[var(--green)] mb-1">REVENUE IMPACT · MAY 4 – MAY 10</div>
              <h2 className="font-serif text-[22px] tracking-tight">What the content actually drove</h2>
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-1.5">EST. INCREMENTAL REVENUE</div>
                <div className="font-serif text-[40px] leading-none" style={{color:"#75C596"}}>${REVENUE_IMPACT.total.toLocaleString()}</div>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mt-2">FROM SHIPPED CONTENT THIS WEEK</div>
              </div>
              <div>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-1.5">KIDS LINE LIFT</div>
                <div className="font-serif text-[40px] leading-none" style={{color:"#75C596"}}>+{REVENUE_IMPACT.lift}%</div>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mt-2">CORRELATED W/ SUGAR CHECK REEL</div>
              </div>
              <div>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-1.5">SITE SESSIONS</div>
                <div className="font-serif text-[40px] leading-none">+{REVENUE_IMPACT.sessions}</div>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mt-2">DRIVEN BY MATCHA RECIPE CONTENT</div>
              </div>
              <div>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-1.5">BEST ROI FORMAT</div>
                <div className="font-serif text-[20px] leading-tight">{REVENUE_IMPACT.topRoiFormat}</div>
                <div className="font-mono text-[9px] tracking-wider mt-2" style={{color:"#75C596"}}>~${REVENUE_IMPACT.topRoiPerBrief} REVENUE PER BRIEF</div>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-[var(--border)] font-mono text-[9px] tracking-wider text-[var(--muted)]">DATA SOURCE · {REVENUE_IMPACT.source.toUpperCase()}</div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <KPI label="POSTS SHIPPED" value={PERF_KPIS.shipped} sub="ACROSS 4 PLATFORMS"/>
            <KPI label="TOTAL REACH" value={fmtNum(PERF_KPIS.totalReach)} sub="+184% VS PRIOR WEEK" accent="#75C596"/>
            <KPI label="AVG SAVES VS BASELINE" value={PERF_KPIS.avgSavesDelta+"×"} sub="STRONGEST WEEK OF PILOT" accent="#75C596"/>
          </div>

          {/* Engine learnings */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-0.5">↳ THE LEARNING LOOP</div>
                <div className="font-serif text-[20px] tracking-tight">What the engine learned this week</div>
              </div>
              <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">4 INSIGHTS · ALL FED INTO THIS WEEK'S BRIEFS</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PERF_INSIGHTS.map((i,k)=><InsightCard key={k} i={i}/>)}
            </div>
          </div>

          {/* Results list */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="font-serif text-[20px] tracking-tight">All results · ranked by saves delta</div>
              <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">{LAST_WEEK_RESULTS.length} POSTS · {fmtNum(PERF_KPIS.totalReach)} REACH</div>
            </div>
            <div className="grid gap-3">
              {sorted.map(r=><ResultRow key={r.id} r={r} nav={nav}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PasswordGate({onUnlock}){
  const [val,setVal] = useState("");
  const [err,setErr] = useState(false);
  function submit(e){
    e.preventDefault();
    if(val.trim().toLowerCase()==="certifiedorganic"){
      try{ localStorage.setItem("willas-unlocked","1"); }catch(e){}
      onUnlock();
    } else {
      setErr(true);
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{background:"var(--bg)"}}>
      <div className="w-[420px] card p-8">
        <div className="font-serif text-[28px] leading-none tracking-tight mb-1">Willa's</div>
        <div className="font-mono text-[9px] tracking-[0.18em] text-[var(--muted)] mb-6">SOCIAL CONTENT ENGINE</div>
        <form onSubmit={submit}>
          <label className="font-mono text-[9px] tracking-wider text-[var(--muted)]">PASSWORD</label>
          <input
            type="password"
            autoFocus
            value={val}
            onChange={e=>{setVal(e.target.value); setErr(false);}}
            className="w-full mt-2 px-3 py-2.5 rounded-md border border-[var(--border)] bg-[#FAFAF7] font-sans text-[14px] text-[#202A44] focus:outline-none focus:border-[#202A44]"
            placeholder=""
          />
          {err && <div className="font-mono text-[10px] tracking-wider text-[var(--red)] mt-2">INCORRECT</div>}
          <button type="submit" className="w-full mt-4 px-3 py-2.5 rounded-md bg-[#202A44] text-white font-mono text-[10px] tracking-wider hover:bg-[#1E293B] transition">
            ENTER →
          </button>
        </form>
        <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mt-6 text-center">BETA</div>
      </div>
    </div>
  );
}

// ── This Week's Highlights ─────────────────────────────
// Auto-opens on first visit of each week (keyed on the week-start date).
// Persistent "This Week" button in the sidebar lets the team re-open it any time —
// addresses the "can't access after first load" gap from Christina's 2026-04-17 feedback.
const WELCOME_WEEK_KEY = "MAY-25-2026";
const WELCOME_WEEK_RANGE = "MAY 25 – MAY 31, 2026";
const WELCOME_REFRESHED = "MAY 24, 2026";

// The strategist's read of the week. Written in advisor voice, addressed to the team.
// Updated every refresh. This is the biggest difference between a dashboard and an
// advisor — the dashboard gives you the 5 stats, the advisor tells you what to DO
// about them.
//
// Posture-shift workshop landed 2026-05-03 per Ed's design constitution + Alex's
// "highlights should feel actionable" call:
//  - the_move → the_moves (plural, verb-led plays the team can act on)
//  - the_backdrop → the_watch (forward-tense conditionals: "if X, do Y")
//  - footer CTA: action-coded verb ("OPEN THIS WEEK'S PLAYBOOK →")
// Pays off Principle 1 (humans in control — pre-mapped contingencies) + Principle
// 2 (motivate next action — every play and watch ends with a verb).
const WELCOME_READ = {
  pullQuote: "fiber is the new TikTok trend. (oats invented it 10,000 years ago.)",
  the_moves: [
    "Drop the fibermaxxing founder-POV TT MON MAY 18 9am — Christina tier 2 (activist) reading the receipt: oats are the original protein-fiber-twofer. Lead with abundance, not restriction.",
    "Anchor the Memorial Day Weekend (MAY 24-25) with the heritage pre-game MON MAY 18 12pm + the Saturday multi-generation pour MAY 23 11am. The family-kitchen anchor wins the 7-10 day Pinterest planning window.",
    "Run the matcha quiet-confidence Barista response TUE MAY 19 9am — back panel only, no name, no recipe. Big oat milk just launched into matcha; Willa's already had the cleanest pour."
  ],
  the_windows: "Memorial Day Weekend MAY 24-25 (federal MON MAY 25) · World Bee Day WED MAY 20 · Cannes Palme d'Or closing SAT MAY 23 · Califia Blueberry Matcha launch MAY 18 (UK Tesco).",
  the_watch: [
    "If fibermaxxing breaks into mainstream press (NYT Well + WaPo) this week, the BIG SWING TT-1 amplification window extends — push the Spark Ad to $400 for the 96-hr lift.",
    "If a Cannes Palme d'Or winner has a heritage or female-founder beat, queue a same-night-stitch Reel SAT MAY 23 evening (45-min framework already in the inspo bank).",
    "If a major creator catches the cabbage / fermentation Pinterest wave before Wed, push the Pinterest fermentation pin (PIN-2) earlier in the week to ride the SEO compounding.",
    "If Memorial Day weekend forecasts shift cooler in major metros, swap PIN-1 (overnight oats) into hot-brunch positioning — frame as 'the carton that warms you up too.'"
  ]
};


const WELCOME_HIGHLIGHTS = [
  {
    stat:"27g PROTEIN",
    label:"Elmhurst's Clean Protein line went nationwide at Sprouts MAY 11 — 4 SKUs at $4.99 (NEXTY-Award Pistachio Crème + Sea Salt Chocolate + Vanilla + Strawberries & Cream), no gums or seed oils",
    detail:"Closest clean-positioned peer brand went direct at Willa's positioning at our primary natural-channel retailer. The cert gap still holds though — Elmhurst is NOT organic, NOT glyphosate-free-certified, NOT WBENC, NOT mother-founded. That's the Willa's moat. Voice this week: show the cert stack, don't punch.",
    color:"#DC2626",
    icon:"🚨",
    sources:[
      {label:"BevNET · Elmhurst 1925 Launches Clean Protein Nationwide at Sprouts (May 18, 2026)", url:"https://www.bevnet.com/pr/2026/05/18/elmhurst-1925-launches-awardwinning-clean-protein-line-nationwide-at-sprouts-farmers-market"},
      {label:"Dairy Foods · Elmhurst 1925 Clean Protein debuts at Sprouts (May 21, 2026)", url:"https://www.dairyfoods.com/articles/99124-elmhurst-1925-clean-protein-line-debuts-at-sprouts"}
    ]
  },
  {
    stat:"94%",
    label:"Yuka app went mainstream-viral in MAY 2026 — #1 in US Health & Fitness, 94% of users return a 'bad' scored product. Willa's Kids holds the perfect 100/100.",
    detail:"WCCB Charlotte MAY 11 + Washington Post + WWD + CBS Miami all covered Yuka's rising consumer power. The app the audience is using on every grocery trip gave Willa's Kids the highest possible verdict. Different from APR 27's 80M-scans authority carousel — this is the BROADER CULTURAL MOMENT of Yuka being everywhere + the brand-direct receipt. Scan-then-pour proof.",
    color:"#75C596",
    icon:"📱",
    sources:[
      {label:"WCCB Charlotte · What the Tech: App of the day Yuka (May 11, 2026)", url:"https://www.wccbcharlotte.com/2026/05/11/what-the-tech-app-of-the-day-yuka/"},
      {label:"WWD · Yuka App food beauty viral coverage 2026", url:"https://wwd.com/beauty-industry-news/beauty-features/yuka-app-food-beauty-viral-app-ingredients-clean-1236907300/"}
    ]
  },
  {
    stat:"Not all UPFs",
    label:"FoodNavigator MAY 22 covered the new Healthy Eating Research expert-panel framework saying federal regulators should distinguish HARMFUL UPFs from doctor-recommended ones — Willa's lives on the right side",
    detail:"The expert-panel reframe concedes some 'ultraprocessed' food is health-positive (yogurt, infant formula, fortified milks). That opens space for Willa's 4-ingredient, no-isolates, no-synthetic-dyes deck to live on the right side calmly. Authority-without-fearmongering window opens.",
    color:"#73B2C9",
    icon:"🔍",
    sources:[
      {label:"FoodNavigator USA · Not all UPFs are created equal (May 22, 2026)", url:"https://www.foodnavigator-usa.com/Article/2026/05/22/not-all-upfs-are-created-equal-and-a-new-expert-panel-says-federal-regulators-should-draw-a-clear-line-between-those-that-are-harmful-and-those-that-doctors-recommend/"}
    ]
  },
  {
    stat:"Big-CPG",
    label:"PepsiCo phasing canola + soybean oils from Lay's + Tostitos. Kraft Heinz, General Mills, Nestlé reformulating. Jesse & Ben's seed-oil-free fry brand closed $10M from Greycroft.",
    detail:"Category is moving to where Willa's started. Willa's Original is already seed-oil-free; Willa's Barista uses high-oleic sunflower oil (structurally different from industrial seed oils). The reformulation wave validates Willa's clean-deck positioning regardless. Don't preach; the 4-ingredient deck IS the proof.",
    color:"#9E652E",
    icon:"🛡️",
    sources:[
      {label:"Food Dive · How MAHA transformed the food industry in 2025-2026", url:"https://www.fooddive.com/news/maha-food-ingredients-rfk-artificial-dyes/808286/"},
      {label:"PR Newswire · Jesse & Ben's $10M Series A from Greycroft (May 7, 2026)", url:"https://www.prnewswire.com/news-releases/jesse--bens-closes-10m-series-a-led-by-greycroft-302764989.html"}
    ]
  },
  {
    stat:"+51%",
    label:"Pinterest's MAY 22 weekly report flagged rhubarb recipes up 51% with 'summer's almost in' framing — the heritage-coded summer ingredient Willa's grandmother kitchen owns",
    detail:"Pinterest planning audience is 7-10 days ahead of execution — the rhubarb wave gives Willa's a 2-3 week heritage-kitchen window. Pairs with strawberry season peaking same week. Rhubarb is grandma food. Willa's grandma was 1921.",
    color:"#A191B2",
    icon:"🌿",
    sources:[
      {label:"Pinterest Business Community · Weekly PBC Trend Report MAY 22, 2026", url:"https://community.pinterest.biz/t/the-weekly-pbc-trend-report-may-22-2026/45841"}
    ]
  }
];


function WelcomeGuide({open, onClose}){
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-[60] fade-in flex items-center justify-center" style={{background:"rgba(15,23,42,0.45)", backdropFilter:"blur(3px)"}} onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-[580px] max-h-[90vh] overflow-y-auto scrollbar" style={{border:"1px solid var(--border)"}} onClick={e=>e.stopPropagation()}>

        <div className="px-7 pt-6 pb-4 border-b border-[var(--border)]">
          <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--muted)] mb-1.5">{WELCOME_WEEK_RANGE}</div>
          <h2 className="font-serif text-[26px] leading-tight tracking-tight">This week's highlights</h2>
        </div>

        {/* REORDERED 2026-05-17 per Christina's flag that the prior MOVES-led
            popup read too tactical. New structure: lead with the 5 signal stats
            (infographic / magazine-cover feel), THEN the read this week (pull-
            quote + tactical plays + windows + watch). Every signal carries
            inline source chips so the team can click through to the trending
            article / TikTok / report — the linking-out rule is enforced at the
            data layer (every WELCOME_HIGHLIGHTS entry must have sources[]). */}
        <div className="px-5 pt-5 pb-4">
          <div className="font-mono text-[9px] tracking-[0.22em] px-3 mb-3" style={{color:"var(--amber)"}}>★ THIS WEEK'S 5 SIGNALS</div>
          {WELCOME_HIGHLIGHTS.map((h,i)=>(
            <div key={i} className={"flex items-start gap-4 px-3 py-3.5 "+(i<WELCOME_HIGHLIGHTS.length-1?"border-b border-[#E8E2D3]":"")}>
              <div className="w-11 h-11 rounded-lg flex items-center justify-center text-[20px] shrink-0" style={{background:h.color+"14"}}>
                {h.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2.5 mb-0.5 flex-wrap">
                  <span className="font-serif text-[22px] font-semibold tracking-tight leading-none" style={{color:h.color}}>{h.stat}</span>
                  <span className="text-[12.5px] font-medium text-[var(--ink)] leading-tight">{h.label}</span>
                </div>
                <p className="text-[11px] text-[var(--muted)] leading-snug">{h.detail}</p>
                {h.sources && h.sources.length>0 && (
                  <div className="mt-1.5 flex flex-wrap gap-x-2">
                    {h.sources.map((s,k)=>(
                      <a key={k} href={s.url} target="_blank" rel="noreferrer" title={s.label}
                        className="src-link font-mono text-[9px] tracking-wide">{sourceDomain(s.url)}</a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* THE READ section removed 2026-05-17 per Christina — the popup
            should be the 5-signal infographic, not a tactical brief. THE MOVES
            + THE WINDOWS + THE WATCH live on the dashboard surfaces (Weekly
            Playbook + Mission Board + Decisions), not above-the-fold on the
            welcome popup. */}

        <div className="px-7 py-4 border-t border-[var(--border)] flex items-center justify-between" style={{background:"var(--bg-warm)"}}>
          <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">Re-open any time via the sidebar</div>
          <button onClick={onClose}
            className="font-mono text-[10px] tracking-wider px-5 py-2.5 rounded-md text-white transition-all hover:shadow-md"
            style={{background:"var(--ink)"}}>
            OPEN THIS WEEK'S PLAYBOOK →
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// THE STUDIO
// Ideation canvas. The single feature that most distinguishes an OBSOLETE
// engine from "just another dashboard." The client (or team) drops a link,
// photo, or thought; a Willa's-trained strategist agent riffs it into a
// fully-formed content brief. The agent is on-brand by construction — every
// call ships with the voice compass, DNA patterns, anti-patterns, and proof
// points embedded in the system prompt.
//
// ARCHITECTURE NOTES (per Alex 2026-04-17):
// - Validation phase: API key lives in the user's own localStorage, not a
//   shared backend. Direct browser → api.anthropic.com calls with the
//   anthropic-dangerous-direct-browser-access header. Post-validation this
//   moves to Vercel Edge Function + Supabase-synced state; for now, keeping
//   cost + infrastructure at zero.
// - Persistence: localStorage only. Structured so that migrating to a
//   Supabase-backed store later is a serialize/deserialize swap, not a
//   rewrite.
// - This whole block is OBSOLETE engine infrastructure, not Willa's-only —
//   when cloning to future clients, swap the WILLAS_SYSTEM_PROMPT and the
//   brand palette; the rest of the Studio remains the same.
// ════════════════════════════════════════════════════════════════════════

const STUDIO_STORAGE_KEY = "willas-studio-state";
const STUDIO_KEY_STORAGE  = "willas-studio-api-key";
const STUDIO_MODEL        = "claude-sonnet-4-6"; // Sonnet 4.6 — fast, strong. Upgrade to claude-opus-4-7 for tougher briefs.
const STUDIO_API_URL      = "https://api.anthropic.com/v1/messages";

function loadStudioState(){
  try{
    const raw = localStorage.getItem(STUDIO_STORAGE_KEY);
    if(!raw) return {stickies:[], briefs:[]};
    const parsed = JSON.parse(raw);
    return {stickies: parsed.stickies || [], briefs: parsed.briefs || []};
  }catch(e){ return {stickies:[], briefs:[]}; }
}

// Studio total-localStorage budget. Browsers cap localStorage at ~5-10MB per
// origin. Photos stored as base64 fill that fast — 2-3 photos can hit the cap
// and start throwing QuotaExceededError, which crashes the Studio. We cap
// total Studio state at 3.5MB (well under any browser limit), evicting the
// oldest photo-bearing stickies first if the cap is exceeded.
const STUDIO_STORAGE_BUDGET = 3.5 * 1024 * 1024; // 3.5 MB

function saveStudioState(state){
  try {
    let payload = JSON.stringify(state);
    // If we're over budget, evict the oldest photo-bearing stickies until
    // we fit. Notes (text-only) are kept; photos are what blow the budget.
    if (payload.length > STUDIO_STORAGE_BUDGET) {
      const trimmed = { ...state, stickies: [...(state.stickies||[])] };
      // Sort by createdAt ASC; photo stickies evicted from the oldest first.
      const sortedByAge = trimmed.stickies
        .map((s, i) => ({ s, i }))
        .sort((a, b) => (a.s.createdAt || 0) - (b.s.createdAt || 0));
      for (const { i } of sortedByAge) {
        if (trimmed.stickies[i].type === "photo") {
          trimmed.stickies.splice(i, 1);
          payload = JSON.stringify(trimmed);
          if (payload.length <= STUDIO_STORAGE_BUDGET) break;
        }
      }
      state = trimmed;
    }
    localStorage.setItem(STUDIO_STORAGE_KEY, payload);
  } catch(e) {
    // QuotaExceededError fallback — keep only the 5 most recent stickies
    try {
      const fallback = { ...state, stickies: (state.stickies||[]).slice(0, 5) };
      localStorage.setItem(STUDIO_STORAGE_KEY, JSON.stringify(fallback));
    } catch(_) { /* nothing more we can do */ }
  }
}

function newId(prefix){ return prefix+"-"+Math.random().toString(36).slice(2,8)+"-"+Date.now().toString(36); }

// The Willa's system prompt — the agent's on-brand DNA. Every brief generation
// call prepends this, so the output is on-brand by construction. When cloning
// the Studio to future OBSOLETE clients, THIS is the one constant you swap.
const WILLAS_SYSTEM_PROMPT = `You are the Willa's Content Strategist — a brand-trained creative agent embedded inside the Willa's Social Content Engine. Your job: turn any input (an article, a photo, a typed thought, a competitor post) into a fully-formed Willa's content brief that would out-perform a generic category post.

## BRAND POSITIONING
Willa's is the FIRST & ONLY whole plant milk. Made from the entire oat groat (like steel-cut oats), not processed oat syrup. WholePlant™ IP is the moat. Born 1921, launched 2021 — founded by a mother (WBENC certified), named after her grandmother who cooked with wholesome ingredients and saw the unique spark in everyone.

Brand tagline: "Nourish the spark in everyone."
Core phrase: "Real food, passed down. Reinvented forward."

## VOICE COMPASS — every brief must pass
- Warm (human, grandmother's kitchen) — NOT clinical or corporate
- With a wink (playful, knowing "shhh…") — NOT dour health-food preachiness
- Assertive + activist (confident POV, us-vs-them category critique, "Willa's is redefining plant-based milk") — NOT defensive, NOT competitor-bashing by name
- Creative (fresh angles) — NOT stock-photo food content
- Transparent (receipts-first, read-the-label energy) — NOT marketing-speak
- Witty (dry cleverness, self-aware, food as fun) — NOT earnest-wellness-brand tropes

## BRAND MUSES — tonal anchors (added 2026-04-22)
Every brief should be reaching for one of these brand energies. Pick one during generation:
- **Kiki Milk / Tenzo Matcha** — us-vs-them ingredient comparison with confidence
- **Patagonia / Lovebird** — activist gravity, stance bigger than the product
- **Olipop** — better-for-you done cheeky, no supplement-speak
- **Fishwife / Graza / Omsom** — design-led personality on simple ingredients
- **Poppi** — viral short-form template for better-for-you beverage
- **Partake Foods** — mother-founded parent-CPG peer, unapologetic parent-first

Muses are a reference library — reach for one when it sharpens the brief. Not every brief requires a muse tag; only populate the "muse" JSON field when a specific muse's energy actually informed the output. Leave it null otherwise.

MUSE IS BACKEND. Populate the "muse" JSON field as an internal audit signal, but NEVER surface "Olipop energy" or similar in caption/hook/visual/script copy. The muse makes the output smarter; the tag stays invisible.

## TOP-PERFORMER DNA — every brief picks ONE
- mom-activist — Founder/mom direct-to-camera with a clear stance. Default for HEALTH/WELLNESS + REVIEWS/RECS activist briefs.
- on-pack-checklist — Cartons in frame with ingredient ✅ checklist overlay. Default for INGREDIENTS/RECIPES.
- kid-family-moment — Real family/kid moment with Willa's Kids in frame. Default for PARENTING.
- viral-recipe-remix — Take a viral recipe and remix it dairy-free/healthier with Willa's.
- meme-payload — Current meme format + one Willa's proof-point payload. Biggest whitespace.
- at-shelf-moment — Founder/ambassador at retail. Use for new door launches.
- before-after-stitch — Switch/conversion arc stitches. Pairs with UGC.

## ANTI-PATTERNS — hard guardrails
- Willa's MUST be the protagonist (no trace-ingredient recipes — product in frame ≥ 40% or ≥ 1 cup used)
- Lattes capped at 1 per 2 weeks (underperform)
- No pasta roundups (individual pasta briefs OK)
- Indulgent-remade-healthy is the sweet spot — no cane sugar; use honey, maple, date syrup
- No named competitors in consumer copy. Ever. Use "vs. Average [Category]" framing only.

## INTERNAL-ONLY — NEVER ship in consumer briefs
- Business metrics (510% / 700% YoY growth, retail-door counts, Subscribe & Save %)
- SPINS / NielsenIQ data
- Named-competitor comparisons
- Pricing strategy
- "They come for the label, but they stay for the taste" — investor-only framing, never in consumer copy

## CONSUMER-SAFE PROOF POINTS
- WholePlant™ IP story — "we use the whole entire oat, not oat syrup"
- 4-ingredient transparency (Original): organic whole grain oats, filtered water, organic vanilla extract, sea salt
- 1g sugar, 4g+ protein, 2g+ prebiotic fiber (Original)
- USDA Organic, Non-GMO Project Verified, Certified Glyphosate Residue Free (The Detox Project), Kosher, Vegan, WBENC
- Yuka: Original 94/100, Chocolate 94/100, Kids 100/100
- Bobby Approved
- Good Food Awards Winner — Best Beverage (Chocolate)
- Category stat: 70% of Americans shop the plant-milk category
- Grandmother heritage, mother-founded framing
- Climate-positive oats, zero food waste

## FLAVOR DATABASE — match flavor to story type (not just rotate)
- **Original** — 1g sugar · 4g protein · 4 ingredients · Yuka 94. LEAD FLAVOR for health / ingredients / sugar-critique / WholePlant stories. Best-seller. Any nutrition-first brief defaults here, NOT Barista.
- **Barista** — 3g sugar (coconut) · 4g protein · foams, NO rapeseed/canola · contains organic high-oleic sunflower oil · "The oat milk your coffee deserves." LEAD FLAVOR for latte / cold foam / home-cafe. Hook: "yes you can have your oat milk latte without the sugar spike / rapeseed / gums." **Barista is the MOST processed SKU** — deck is longer (calcium carbonate, tricalcium phosphate, sunflower oil). NEVER lead ingredient-comparison or "read the label" content with Barista. Those stories lead with Original (4 ingredients) or Chocolate (5 ingredients). Barista earns its slot when the latte IS the vehicle.
- **Kids** — 6g sugar (maple) · 8g protein · DHA · organic pea protein · top-9 allergen-free · Yuka 100 · positions vs DAIRY. LEAD FLAVOR for family / school-lunch / allergen-free. Adult crossover: best blender for iced coffee + "best swirls." Use for "two generations, one carton" framing.
- **Chocolate** — 11g sugar (coconut sugar) · 5g protein · real cacao · Good Food Awards Winner · 5 ingredients. LEAD FLAVOR for indulgent-remade-healthy. Hook: "yes you can have a mocha / kid can have chocolate milk that's delicious and not a sugar bomb." Avoid for daily ingredient stories — keep Chocolate as the indulgent lane.

## POV DISCIPLINE (added 2026-04-22 — apply to every brief)
1. **BENEFIT-FIRST.** Hook = benefit/provocation, NEVER the process. "How it's made" is supporting proof (position in caption after the benefit + numbers). If the hook opens with an enzymatic-process explanation, rewrite.
2. **DIET-CULTURE FILTER.** If the trend is restriction-dressed-as-wellness (oatzempic, 75 Hard, shakes-replacing-meals), Willa's pushes BACK — doesn't ride with. Willa's stands for positive food relationships. Celebrating-food trends (cottage cheese oats, fibermaxxing, butter boards) → ride directly.
3. **REPEAT THE 3 CORE BEATS.** Every brief should tag which of the 3 it hits: **DELICIOUS** (tastes great, rich + smooth + creamy), **HEALTHIER** (whole oat, low sugar, clean label, organic), **FEEL GOOD** (satiation, energy, no crashes). Week mix must cover all 3 across 15–20 briefs.
4. **PARENT-FIRST HOOKS.** For PARENTING briefs, use templates: "When your kid is lactose intolerant…" / "Say goodbye to sugar kids drinks." / "For the mom who's tired of…" / "If you've ever read a kids' milk label and…" Specific parent-problem → Willa's Kids answers.

5. **CHRISTINA IS NOT A MOM (critical).** Willa's is mother-founded — the mother is Christina's sister + cofounder. Never attribute first-person parenting to Christina ("my kids", "I wanted my kids…", "as a mom…"). Default to brand voice "we". For first-person mom POV, attribute to the cofounder-sister explicitly. For heritage beats, third-person about Christina is fine. Applies to captions, hooks, scripts, VO.

6. **FACT-CHECK against the Verified Facts Library.** Three phrasings Christina flagged — do NOT ship:
   - ❌ "enzyme breaks the oat into sugar" → ✅ "filters out the bran + germ, then enzyme-processes the starch into sugar"
   - ❌ "filters out the fiber" (alone) → ✅ "filters out the bran + germ where BOTH fiber AND protein live" (protein loss is worse than fiber per Christina)
   - ❌ "only oat milk in America" / "only oat milk that paid for the glyphosate test" → ✅ "certified glyphosate-free by The Detox Project. Every lot tested."
   No unsourced specific percentages / scope claims.

7. **JARGON GETS A ONE-LINE GLOSS.** Any mechanism / meme / insider term needs a plain-English explainer on first use in any field (caption, script, visual, hook). Glosses: beta-glucans = "oat fiber that supports heart + gut health"; oat groats = "whole oat kernels, like steel-cut oats"; enzyme/syrup story = "most oat milks use an enzyme that turns oats into sugar and filters out the fiber + protein"; oatzempic = "TikTok trend: ½ cup oats + lime + water, marketed as DIY Ozempic — it isn't"; AirPod Bump = "Q1 2026 TikTok meme: strangers collide, earbuds swap, playlist reveal"; fibermaxxing = "TikTok's term for eating more fiber intentionally."

8. **BARISTA ≠ INGREDIENT-STORY HERO.** Barista is Willa's most-processed SKU. Ingredient-transparency + "read the label" briefs lead with Original or Chocolate. Barista is ONLY for latte / foam / coffee-shop-at-home content.

## BENEFIT SHORTHAND LIBRARY — pick one to anchor the end card
- "The whole oat. Not the syrup." (2s, all flavors)
- "Four ingredients. Read them." (2s, Original)
- "1 gram of sugar. Zero added." (2s, Original)
- "More protein than any oat milk. Period." (2.5s, Original/Kids)
- "Same protein as dairy. Half the sugar." (2.5s, Kids)
- "No top-9 allergens. School-safe." (2.5s, Kids)
- "Latte art. No rapeseed oil." (2s, Barista)
- "Yuka says 100 out of 100." (2s, Kids)
- "Best Beverage of the year. Real cacao." (2.5s, Chocolate)
- "Most oat milks filter out the healthiest 30% of the oat. We don't." (3.5s, Original/Barista/Chocolate)
- "Certified glyphosate-free. Because that matters." (2.5s, all)
- "Mother-founded. WBENC-certified. Built to outlive me." (3s, all)

## OUTPUT FORMAT — return ONLY valid JSON, no prose, no markdown
{
  "concept": "1-line internal-facing content concept (this is the title in the engine)",
  "platform": "IG Reel" | "TikTok" | "IG Feed" | "Pinterest" | "Threads",
  "pillar": "HEALTH/WELLNESS" | "INGREDIENTS/RECIPES" | "PARENTING" | "REVIEWS/RECS",
  "flavor": "Original" | "Barista" | "Kids" | "Chocolate" | "Multi",
  "dnaPattern": "mom-activist" | "on-pack-checklist" | "kid-family-moment" | "viral-recipe-remix" | "meme-payload" | "at-shelf-moment" | "before-after-stitch",
  "priority": "BIG SWING" | "HIGH" | "STANDARD",
  "recommendedHook": "THE hook. One line. Benefit-first (NOT process-first). Passes Voice Compass. What the post OPENS with.",
  "altHooks": ["2-3 alt hooks, same voice, different angles"],
  "caption": "full ready-to-post caption, 2-4 short paragraphs. Structure: HOOK (benefit) → PROOF (numbers/certs) → PROCESS (if relevant). Default to brand voice (third-person) — first-person only if the brief features Christina on camera.",
  "visual": "detailed visual direction — camera angles, lighting, color, product placement, text overlays (exact copy), transitions. Trend-forward, bright, not muted brand-kitchen stock. Default to HANDS + PRODUCT + KITCHEN, no talent on camera — unless the brief is a mom-activist or kid-family-moment DNA where Christina's presence is the payload.",
  "script": [{"scene":"COLD OPEN","time":"0-2s","action":"generation-prompt-ready action — what's in frame, camera behavior, overlay copy, transitions"}, ...] OR null for static briefs,
  "audio": "VO tone + music style + trending sound reference if applicable. Default to 'warm narrative voiceover' — only use 'founder voiceover' when Christina is on camera." OR null for static,
  "duration": "15-30s range" OR null for static,
  "benefitShorthand": "one of the 12 stingers above that anchors the end card — the exact stinger text",
  "whyNow": "1-2 sentences — why this specific moment, what's the cultural/category signal this rides",
  "rationale": "1 sentence — why this is the play vs. alternatives (which other formats/flavors were considered and why this wins)",
  "muse": "OPTIONAL — if a specific brand-muse energy informed this brief, name it: Kiki Milk | Tenzo Matcha | Patagonia | Lovebird | Olipop | Fishwife | Graza | Omsom | Poppi | Partake. Null if no specific muse informed the output. Internal audit field, not displayed to users.",
  "coreBeats": ["delicious" | "healthier" | "feel good"] — which of the 3 core beats this brief hits. At least one.
}`;

// Non-streaming Claude call — routes through /api/strategist proxy (Phase C).
// Proxy is streaming-only, so we accumulate text deltas + return at end.
// Used by Studio sticky generation. apiKey param is ignored (server holds key)
// but kept in the signature so callers don't have to change.
async function callClaude(_apiKey, messages){
  const res = await fetch("/api/strategist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages,
      model: STUDIO_MODEL,
      maxTokens: 3500,
      enableWebSearch: false,
      systemExtras: [
        { type: "text", text: WILLAS_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }
      ]
    })
  });
  if(!res.ok){
    const errText = await res.text();
    throw new Error("Claude API "+res.status+": "+errText.slice(0,200));
  }

  // Stream + accumulate. Proxy returns SSE text deltas — we concat them into
  // one string so the rest of the Studio brief-generation flow (JSON parse,
  // sticky update) keeps working without touching downstream code.
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let accumulated = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      const l = line.trim();
      if (!l.startsWith("data:")) continue;
      const payload = l.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const evt = JSON.parse(payload);
        if (evt.type === "content_block_delta" && evt.delta && evt.delta.type === "text_delta") {
          accumulated += evt.delta.text;
        }
      } catch (e) { /* swallow partial frames */ }
    }
  }
  return accumulated;
}

// Extract JSON from a Claude response. Claude sometimes wraps JSON in markdown
// despite being told not to — strip fences, then parse. Throws on unparseable.
function extractBriefJson(text){
  let t = text.trim();
  // Strip markdown code fences
  t = t.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  // Find first { and last }
  const first = t.indexOf("{");
  const last = t.lastIndexOf("}");
  if(first === -1 || last === -1) throw new Error("No JSON found in response");
  return JSON.parse(t.slice(first, last+1));
}

// Transform a Studio-generated brief into the shape used by the main Content
// Briefs queue. Maps the Claude-returned JSON into the BRIEFS schema so adopted
// briefs render through the exact same BriefListItem + BriefDetail components
// as engine-generated ones. Adopted briefs are flagged with `fromStudio:true`
// + a `_drivenBy` string so the "driven by" chip on the card explains lineage.
function studioBriefToContentBrief(studioBrief, sticky){
  const d = studioBrief.draft || {};
  const bs = BENEFIT_SHORTHAND.find(b => b.line === d.benefitShorthand);
  const hooks = [
    ...(d.recommendedHook ? [{text: d.recommendedHook, recommended: true}] : []),
    ...((d.altHooks || []).map(h => ({text: h, recommended: false})))
  ];
  const intel = [];
  if(d.whyNow)    intel.push({type: "WHY NOW",   text: d.whyNow});
  if(d.rationale) intel.push({type: "RATIONALE", text: d.rationale});
  const drivenByText = sticky
    ? (sticky.sourceCard || (sticky.type === "link" ? (sticky.url || "dropped link") : sticky.type === "note" ? "typed into the Studio" : "photo dropped into the Studio"))
    : "Studio";
  return {
    id: "ST-" + (studioBrief.id || "").slice(3, 12),
    fromStudio: true,
    adoptedAt: studioBrief.adoptedAt || studioBrief.createdAt || Date.now(),
    platform: d.platform || "IG Reel",
    pillar: d.pillar || "INGREDIENTS/RECIPES",
    pillarColor: PILLAR_COLORS[d.pillar] || "#202A44",
    flavor: d.flavor || "Multi",
    dnaPattern: d.dnaPattern || null,
    timing: "Studio adopted",
    priority: d.priority || "STANDARD",
    concept: d.concept || "",
    intel,
    hooks: hooks.length ? hooks : [{text: "—", recommended: true}],
    caption: d.caption || "",
    hashtags: [],
    visual: d.visual || "",
    script: d.script || null,
    audio: d.audio || null,
    duration: d.duration || null,
    cta: {soft:"", medium:"", strong:""},
    benefitShorthandId: bs ? bs.id : null,
    _drivenBy: drivenByText
  };
}

// Rotating status messages shown while Claude is generating. The call itself
// is non-streaming (simple fetch + await), but the rotating copy makes the
// 5–15s wait feel like work is happening — each message reflects a step the
// strategist would actually be doing. Swap to true SSE streaming when we move
// to a Vercel Edge Function (post-validation).
const STUDIO_GEN_STEPS = [
  "Reading the input…",
  "Finding the cultural angle…",
  "Picking the hero flavor…",
  "Selecting the proven format…",
  "Drafting the hook…",
  "Writing the caption…",
  "Storyboarding the shoot…",
  "Picking the end-card stinger…",
  "Passing the Voice Compass…",
  "Almost there…"
];
const STUDIO_RIFF_STEPS = [
  "Reading your note…",
  "Reworking the hook…",
  "Adjusting the format…",
  "Re-checking the Voice Compass…",
  "Finalizing…"
];

function useRotatingStep(active, steps, intervalMs){
  const [idx, setIdx] = useState(0);
  useEffect(()=>{
    if(!active){ setIdx(0); return; }
    setIdx(0);
    const id = setInterval(()=> setIdx(i=> Math.min(i+1, steps.length-1)), intervalMs || 2500);
    return ()=> clearInterval(id);
  }, [active, intervalMs]);
  return steps[idx];
}

// Returns either a string (text-only) or an array of content blocks (image +
// text) — Anthropic's API accepts both shapes for message.content. Photo
// stickies upgrade to vision mode (2026-05-18) so the strategist actually
// SEES what was dropped instead of asking the user to describe it.
function buildStickyUserMessage(sticky){
  const parts = [];
  if(sticky.type === "link"){
    parts.push("TYPE: Link");
    parts.push("URL: "+sticky.url);
    if(sticky.content) parts.push("PAGE TITLE / DESCRIPTION:\n"+sticky.content);
    if(sticky.note) parts.push("USER NOTE: "+sticky.note);
  } else if(sticky.type === "photo"){
    parts.push("TYPE: Photo dropped in (image attached below — read the pixels, don't ask the user to describe)");
    parts.push("SOURCE: "+(sticky.source || "uploaded"));
    if(sticky.note) parts.push("CAPTION / CONTEXT: "+sticky.note);
  } else {
    parts.push("TYPE: Note");
    parts.push("CONTENT:\n"+(sticky.content || ""));
  }
  if(sticky.sourceCard){
    parts.push("SOURCE CARD: "+sticky.sourceCard);
  }
  parts.push("\nTurn this into a Willa's content brief. Think: what's the cultural/category signal here? What's Willa's earned POV on it? Which DNA format fits? Which flavor is the hero? Respond with ONLY the JSON described in the system prompt — no markdown, no prose.");

  const textPart = parts.join("\n\n");

  // For photos, return content-blocks form with the actual image so Claude's
  // vision parses it. Anthropic supports image/jpeg, image/png, image/gif,
  // image/webp via base64.
  if(sticky.type === "photo" && typeof sticky.image === "string"){
    const m = sticky.image.match(/^data:(image\/(?:jpeg|jpg|png|gif|webp));base64,(.+)$/i);
    if(m){
      let mediaType = m[1].toLowerCase();
      if(mediaType === "image/jpg") mediaType = "image/jpeg";
      return [
        { type: "image", source: { type: "base64", media_type: mediaType, data: m[2] } },
        { type: "text", text: textPart }
      ];
    }
    // Data URL malformed (rare) — fall through to text-only with a note
    return textPart + "\n\n(NOTE: image data was attached but could not be parsed — proceed with caption/context only.)";
  }

  return textPart;
}

// ── Studio UI ──────────────────────────────────────────────────────────

function StudioApiKeyModal({open, current, onSave, onClose}){
  const [val,setVal] = useState(current || "");
  const [err,setErr] = useState("");
  useEffect(()=>{ if(open){ setVal(current || ""); setErr(""); } },[open,current]);
  if(!open) return null;
  function save(e){
    e.preventDefault();
    const v = val.trim();
    if(!v.startsWith("sk-ant-")) { setErr("That doesn't look like an Anthropic key. It should start with sk-ant-"); return; }
    onSave(v);
  }
  return (
    <div className="fixed inset-0 z-[80] fade-in flex items-center justify-center px-4" style={{background:"rgba(15,23,42,0.55)", backdropFilter:"blur(3px)"}} onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[480px]" style={{border:"1px solid var(--border)"}} onClick={e=>e.stopPropagation()}>
        <form onSubmit={save}>
          <div className="px-6 pt-6 pb-4 border-b border-[var(--border)]">
            <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--muted)] mb-1.5">THE STUDIO · SETUP</div>
            <h2 className="font-serif text-[22px] leading-tight tracking-tight mb-2">Connect your Claude API key</h2>
            <p className="text-[12px] text-[var(--muted)] leading-relaxed">The Studio runs briefs through Claude. Paste your Anthropic API key — it stays in your browser only, never leaves your machine except to call api.anthropic.com directly.</p>
          </div>
          <div className="px-6 py-5">
            <label className="font-mono text-[9px] tracking-wider text-[var(--muted)]">ANTHROPIC API KEY</label>
            <input type="password" autoFocus value={val} onChange={e=>{setVal(e.target.value); setErr("");}} placeholder="sk-ant-..."
              className="w-full mt-2 px-3 py-2.5 rounded-md border border-[var(--border)] bg-[#FAFAF7] font-mono text-[12px] text-[#202A44] focus:outline-none focus:border-[#202A44]"/>
            {err && <div className="font-mono text-[10px] tracking-wider text-[var(--red)] mt-2">{err}</div>}
            <div className="mt-3 text-[11px] text-[var(--muted)] leading-relaxed">
              Don't have one? Get it at <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer" className="src-link">console.anthropic.com/settings/keys</a>. Under $0.01 per brief at typical use.
            </div>
          </div>
          <div className="px-6 py-4 border-t border-[var(--border)] flex items-center justify-between" style={{background:"var(--bg-warm)"}}>
            <button type="button" onClick={onClose} className="font-mono text-[9px] tracking-wider text-[var(--muted)] hover:text-[var(--ink)]">CANCEL</button>
            <button type="submit" className="font-mono text-[10px] tracking-wider px-5 py-2.5 rounded-md text-white hover:shadow-md transition" style={{background:"var(--ink)"}}>SAVE KEY →</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Name prompt — fires AFTER the user submits their first sticky (not
// before). The sticky is already created with a generic byline; this
// modal retro-stamps it once the user enters their name. Per Alex's
// 2026-05-18 ask: don't make name entry a gate to participation, make
// it a soft prompt that arrives after the user has shown they're engaging.
function NamePromptModal({open, onSave, onSkip}){
  const [val,setVal] = useState("");
  useEffect(()=>{ if(open) setVal(""); },[open]);
  if(!open) return null;
  function save(e){
    e.preventDefault();
    const v = val.trim();
    if(!v) return;
    onSave(v);
  }
  return (
    <div className="fixed inset-0 z-[80] fade-in flex items-center justify-center px-4" style={{background:"rgba(15,23,42,0.45)", backdropFilter:"blur(3px)"}} onClick={onSkip}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[440px]" style={{border:"1px solid var(--border)"}} onClick={e=>e.stopPropagation()}>
        <form onSubmit={save}>
          <div className="px-6 pt-6 pb-4 border-b border-[var(--border)]">
            <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--muted)] mb-1.5">THE STUDIO</div>
            <h2 className="font-serif text-[22px] leading-tight tracking-tight mb-2">Nice — first drop in.</h2>
            <p className="text-[12.5px] text-[var(--muted)] leading-relaxed">Quick — what should we call you on the wall? Stickies get tagged so the team can see who added what.</p>
          </div>
          <div className="px-6 py-5">
            <label className="font-mono text-[9px] tracking-wider text-[var(--muted)]">YOUR NAME</label>
            <input autoFocus value={val} onChange={e=>setVal(e.target.value)} placeholder="e.g., Christina" maxLength={40}
              className="w-full mt-2 px-3 py-2.5 rounded-md border border-[var(--border)] bg-[#FAFAF7] text-[13px] text-[#202A44] focus:outline-none focus:border-[#202A44]"/>
          </div>
          <div className="px-6 py-4 border-t border-[var(--border)] flex items-center justify-between" style={{background:"var(--bg-warm)"}}>
            <button type="button" onClick={onSkip} className="font-mono text-[9px] tracking-wider text-[var(--muted)] hover:text-[var(--ink)]">SKIP FOR NOW</button>
            <button type="submit" className="font-mono text-[10px] tracking-wider px-5 py-2.5 rounded-md text-white hover:shadow-md transition" style={{background:"var(--ink)"}}>SAVE →</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// "Posting as: NAME" strip above the Studio input bar. Studio is a shared
// whiteboard so each sticky needs to attribute who dropped it. First-use:
// the strip auto-focuses + asks for a name. After: the name shows as a
// small editable chip — click to change. Stored per-browser in localStorage
// (real auth comes when we wire Supabase user accounts).
function PostingAsStrip(){
  const [name, setNameState] = React.useState(() => getUserName());
  const [editing, setEditing] = React.useState(() => !getUserName());
  const [draft, setDraft] = React.useState(name);
  const inputRef = React.useRef();

  React.useEffect(()=>{
    if(editing && inputRef.current){ inputRef.current.focus(); }
  }, [editing]);

  function save(){
    const v = (draft || "").trim();
    if(!v) return;
    setUserName(v);
    setNameState(v);
    setEditing(false);
  }

  return (
    <div className="mb-3 flex items-center gap-2 px-3 py-2 rounded-md border" style={{borderColor:"#E8E1C2", background:"#FFFEF7"}}>
      <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">POSTING AS</span>
      {editing ? (
        <>
          <input
            ref={inputRef}
            value={draft}
            onChange={e=>setDraft(e.target.value)}
            onKeyDown={e=>{
              if(e.key === "Enter"){ e.preventDefault(); save(); }
              if(e.key === "Escape"){ setEditing(false); setDraft(name); }
            }}
            placeholder="Your name (e.g., Christina)"
            className="flex-1 text-[12.5px] font-medium bg-transparent outline-none border-b border-[var(--border)] focus:border-[var(--amber)] py-0.5"
            maxLength={40}
          />
          <button onClick={save}
            className="font-mono text-[9px] tracking-wider px-2 py-1 rounded bg-[#202A44] text-white">
            SAVE
          </button>
        </>
      ) : (
        <>
          <span className="text-[12.5px] font-medium" style={{color:"var(--amber)"}}>{name}</span>
          <button onClick={()=>{ setDraft(name); setEditing(true); }}
            className="ml-auto font-mono text-[8.5px] tracking-wider text-[var(--muted)] hover:text-[var(--ink)] transition">
            ✎ CHANGE
          </button>
        </>
      )}
    </div>
  );
}

function StudioInputBar({onAdd}){
  const [val,setVal] = useState("");
  const [note,setNote] = useState("");
  const [showNote,setShowNote] = useState(false);
  const fileRef = React.useRef();
  const isUrl = /^https?:\/\//i.test(val.trim());
  function submit(e){
    if(e) e.preventDefault();
    const v = val.trim();
    if(!v) return;
    if(isUrl){
      onAdd({type:"link", url:v, content:"", note: note.trim() || null});
    } else {
      onAdd({type:"note", content:v, note: note.trim() || null});
    }
    setVal(""); setNote(""); setShowNote(false);
  }
  function onFile(e){
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    if(file.size > 2 * 1024 * 1024){ alert("Image is too large — keep under 2MB (localStorage limit)."); return; }
    const reader = new FileReader();
    reader.onload = evt => {
      onAdd({type:"photo", image: evt.target.result, source: file.name, note: note.trim() || null});
      setNote(""); setShowNote(false);
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // allow same file again
  }
  return (
    <div className="card p-4">
      <form onSubmit={submit}>
        <div className="flex items-center gap-2">
          <input type="text" value={val} onChange={e=>setVal(e.target.value)}
            placeholder="drop a link, paste a quote, type a half-thought…"
            className="flex-1 px-4 py-3 rounded-full border-2 border-[var(--border)] bg-[#FAFAF7] text-[13.5px] focus:outline-none focus:border-[var(--amber)] transition"/>
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden"/>
          <button type="button" onClick={()=>fileRef.current && fileRef.current.click()}
            title="Upload a photo"
            className="px-4 py-3 rounded-full border-2 border-[var(--border)] bg-white hover:bg-[#FFFEF7] hover:border-[#E8E1C2] transition text-[13px] font-medium flex items-center gap-1.5">
            <span className="text-[15px]">📷</span> photo
          </button>
          <button type="button" onClick={()=>setShowNote(s=>!s)}
            title="Add context for the strategist"
            className={"px-4 py-3 rounded-full border-2 transition text-[13px] font-medium flex items-center gap-1.5 "+(showNote?"bg-[#FFFEF7] border-[var(--amber)] text-[var(--amber)]":"bg-white border-[var(--border)] hover:bg-[#FFFEF7] hover:border-[#E8E1C2]")}>
            <span className="text-[15px]">✎</span> note
          </button>
          <button type="submit" disabled={!val.trim()}
            className="px-5 py-3 rounded-full bg-[#202A44] text-white hover:bg-[#1E293B] transition text-[13px] font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5">
            {isUrl ? <>add link <span>→</span></> : <>drop it in <span>→</span></>}
          </button>
        </div>
        {showNote && (
          <textarea value={note} onChange={e=>setNote(e.target.value)}
            placeholder="Optional — context for the strategist (why this matters, what angle you want, who it's for)…"
            rows={2}
            className="w-full mt-2 px-3 py-2.5 rounded-md border border-[var(--border)] bg-[#FAFAF7] text-[12px] focus:outline-none focus:border-[#202A44] resize-none"/>
        )}
      </form>
    </div>
  );
}

function StickyTypeIcon({type}){
  if(type === "link")  return <span className="text-[13px]">🔗</span>;
  if(type === "photo") return <span className="text-[13px]">📷</span>;
  return <span className="text-[13px]">✎</span>;
}

// Placeholder / ghost stickies — render pastel, dashed-border cards in the
// canvas grid so an empty or sparsely-populated Studio still feels like a
// workspace. Click focuses the input bar. Real stickies always render first;
// ghosts fill to ~12 total cells, then disappear entirely once the canvas
// is full of real work.
const GHOST_STICKY_COLORS = [
  "#73B2C9", "#75C596", "#A191B2", "#9E652E",
  "#FACC15", "#0EA5E9", "#EC4899", "#75C596",
  "#73B2C9", "#9E652E", "#A191B2", "#F59E0B"
];
const GHOST_STICKY_HINTS = [
  "A link from earlier",
  "Screenshot of a TikTok",
  "Note from a retail walk",
  "An NYT article",
  "Photo of a competitor",
  "Recipe you saw",
  "Reddit thread",
  "Voice memo idea",
  "Customer review",
  "Half-formed thought",
  "Trending sound",
  "Podcast clip"
];

function GhostSticky({color, index, hint, onFocus}){
  const rot = (index % 3 === 0) ? "-0.6deg" : (index % 3 === 1) ? "0.5deg" : "0deg";
  return (
    <button onClick={onFocus}
      title="Click to drop your first idea"
      className="text-left p-4 flex flex-col gap-3 transition hover:opacity-90"
      style={{
        background: color + "0F",
        border: "1.5px dashed " + color + "66",
        borderRadius: "10px",
        minHeight: "168px",
        transform: "rotate(" + rot + ")",
        opacity: 0.6
      }}>
      <div className="flex items-center gap-2">
        <span className="inline-block w-[9px] h-[9px] rounded-full shrink-0" style={{background:color}}></span>
        <span className="font-mono text-[8.5px] tracking-wider" style={{color: color, opacity: 0.85}}>OPEN SLOT</span>
      </div>
      {/* Skeleton lines — give the sticky a "waiting to be filled" feel */}
      <div className="flex flex-col gap-1.5 mt-1">
        <div className="h-[7px] rounded-full" style={{background: color + "22", width: "85%"}}></div>
        <div className="h-[7px] rounded-full" style={{background: color + "22", width: "60%"}}></div>
        <div className="h-[7px] rounded-full" style={{background: color + "14", width: "72%"}}></div>
      </div>
      <div className="mt-auto pt-3 font-mono text-[9px] tracking-wider italic" style={{color: color, opacity: 0.7}}>
        e.g. "{hint}"
      </div>
    </button>
  );
}

function StickyCard({sticky, brief, onOpen, onDelete}){
  const when = new Date(sticky.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric"});
  return (
    <div className="card p-4 fade-in flex flex-col gap-3 hover:shadow-md transition cursor-pointer group"
      onClick={onOpen}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <StickyTypeIcon type={sticky.type}/>
          <span className="font-mono text-[9px] tracking-wider text-[var(--muted)] truncate">
            {sticky.type.toUpperCase()} · {when.toUpperCase()}
            {sticky.createdBy && <span className="ml-1.5" style={{color:"var(--amber)"}}>· {sticky.createdBy.toUpperCase()}</span>}
          </span>
        </div>
        <button onClick={e=>{e.stopPropagation(); onDelete(sticky.id);}}
          className="opacity-0 group-hover:opacity-100 transition font-mono text-[10px] text-[var(--muted)] hover:text-[var(--red)]"
          title="Remove this sticky">×</button>
      </div>
      {sticky.type === "link" && (
        <div>
          <a href={sticky.url} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}
            className="text-[12px] text-[var(--ink)] font-medium hover:underline line-clamp-2 break-all">{sticky.url}</a>
          {sticky.content && <p className="text-[11.5px] text-[#64748B] leading-snug mt-1.5 line-clamp-3">{sticky.content}</p>}
        </div>
      )}
      {sticky.type === "photo" && (
        <div>
          <img src={sticky.image} alt={sticky.source || "uploaded"} className="rounded-md w-full object-cover max-h-[180px]"/>
          {sticky.source && <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mt-1.5 truncate">{sticky.source}</div>}
        </div>
      )}
      {sticky.type === "note" && (
        <p className="font-serif text-[14px] text-[#202A44] leading-snug line-clamp-5">{sticky.content}</p>
      )}
      {sticky.note && (
        <div className="pl-2.5 border-l-2 border-[#E8E1C2] text-[11px] italic text-[#64748B] leading-snug">{sticky.note}</div>
      )}
      {sticky.sourceCard && (
        <div className="font-mono text-[9px] tracking-wider text-[var(--muted)]">↳ from {sticky.sourceCard}</div>
      )}
      <div className="mt-auto pt-2 border-t border-[var(--border)] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {brief ? (
            <span className="font-mono text-[9px] tracking-wider px-1.5 py-0.5 rounded text-white shrink-0" style={{background:"#75C596"}}>
              ✓ RIFFED
            </span>
          ) : (
            <span className="font-mono text-[9px] tracking-wider text-[var(--muted)] shrink-0">READY TO RIFF</span>
          )}
        </div>
        <span className="font-mono text-[9px] tracking-wider flex items-center gap-1 text-[var(--ink)] group-hover:text-[#9E652E] transition">
          <span style={{color:"#9E652E"}}>✦</span>
          {brief ? "OPEN →" : "RIFF ON THIS →"}
        </span>
      </div>
    </div>
  );
}

function StudioGeneratedBrief({brief}){
  if(!brief || !brief.draft) return null;
  const d = brief.draft;
  const pillarColor = PILLAR_COLORS[d.pillar] || "#202A44";
  return (
    <div className="card p-5 fade-in" key={brief.id}>
      <div className="flex items-center justify-between mb-3">
        <div className="font-mono text-[10px] tracking-[0.18em] text-[#202A44]">THE DRAFT BRIEF</div>
        {brief.adopted && <span className="font-mono text-[8.5px] tracking-wider px-2 py-[2px] rounded-full text-white" style={{background:"#75C596"}}>✓ ADOPTED</span>}
      </div>
      <div className="flex items-center flex-wrap gap-1.5 mb-3">
        <span className="font-mono text-[9px] tracking-wider px-1.5 py-[2px] rounded" style={{color:pillarColor,background:pillarColor+"12",border:"1px solid "+pillarColor+"33"}}>{d.pillar || "—"}</span>
        {d.priority && <PriorityBadge p={d.priority}/>}
        {d.dnaPattern && <DnaChip patternId={d.dnaPattern}/>}
        {d.flavor && <span className="font-mono text-[9px] tracking-wider px-1.5 py-[2px] rounded bg-[#F1F5F9] text-[#475569]">{d.flavor.toUpperCase()}</span>}
        {d.platform && <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">· {d.platform}</span>}
      </div>
      {d.concept && <h3 className="font-serif text-[18px] leading-snug tracking-tight mb-3">{d.concept}</h3>}
      {d.recommendedHook && (
        <div className="pl-4 border-l-[3px] border-[#75C596] mb-4">
          <span className="inline-block font-mono text-[8.5px] tracking-wider px-2 py-[3px] rounded mb-2.5 text-white" style={{background:"#75C596"}}>✓ RECOMMENDED HOOK</span>
          <p className="font-serif text-[17px] italic leading-snug text-[#202A44]">"{d.recommendedHook}"</p>
        </div>
      )}
      {d.altHooks && d.altHooks.length > 0 && (
        <div className="mb-4">
          <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mb-1.5">ALT HOOKS</div>
          <div className="grid gap-1.5">
            {d.altHooks.map((h,i)=>(<div key={i} className="pl-4 border-l border-[var(--border)] text-[12px] italic text-[#64748B] leading-snug py-1">"{h}"</div>))}
          </div>
        </div>
      )}
      {d.whyNow && (
        <div className="mb-4">
          <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mb-1">WHY NOW</div>
          <p className="text-[12px] text-[#334155] leading-relaxed">{d.whyNow}</p>
        </div>
      )}
      {d.visual && (
        <div className="mb-4">
          <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mb-1">SHOOT · VISUAL</div>
          <p className="text-[12px] text-[#334155] leading-relaxed">{d.visual}</p>
        </div>
      )}
      {d.script && d.script.length > 0 && (
        <div className="mb-4">
          <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mb-2">SCRIPT · {d.script.length} FRAMES</div>
          <div className="grid gap-2">
            {d.script.map((s,i)=>(
              <div key={i} className="pl-3 border-l border-[var(--border)]">
                <div className="font-mono text-[8.5px] tracking-wider text-[#202A44]">{s.scene || "FRAME "+(i+1)} · {s.time}</div>
                <p className="text-[11.5px] text-[#334155] leading-snug mt-0.5">{s.action}</p>
              </div>
            ))}
          </div>
          {(d.audio || d.duration) && (
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[9px] tracking-wider text-[var(--muted)]">
              {d.audio && <span>AUDIO · <span className="text-[var(--ink)]">{d.audio}</span></span>}
              {d.duration && <span>DURATION · <span className="text-[var(--ink)]">{d.duration}</span></span>}
            </div>
          )}
        </div>
      )}
      {d.caption && (
        <div className="mb-4">
          <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mb-1">CAPTION</div>
          <pre className="whitespace-pre-wrap text-[12px] text-[#202A44] leading-relaxed font-sans bg-[#FAFAF7] border border-[var(--border)] rounded-md p-3">{d.caption}</pre>
        </div>
      )}
      {d.benefitShorthand && (
        <div className="mb-3">
          <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mb-1">END-CARD STINGER</div>
          <p className="font-serif italic text-[13px] text-[#202A44]">"{d.benefitShorthand}"</p>
        </div>
      )}
      {d.rationale && (
        <div className="mt-4 pt-3 border-t border-[var(--border)]">
          <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mb-1">STRATEGIST RATIONALE</div>
          <p className="text-[11.5px] italic text-[#64748B] leading-relaxed">{d.rationale}</p>
        </div>
      )}
    </div>
  );
}

// Smart-suggestion picker for the Studio sticky-riff modal. Reaches into
// the sticky's type + content to propose 3 directions the user can click.
function getStudioRiffSuggestions(s) {
  if (s.type === "link") return [
    "Give me 3 angles on this for Willa's voice.",
    "How would Willa's stitch this into a TikTok?",
    "What's the us-vs-them angle in here?"
  ];
  if (s.type === "photo") return [
    "Walk me through what Willa's could do with this visual.",
    "What hook lands over this image?",
    "Which flavor does this belong to?"
  ];
  // note
  return [
    "Turn this into 3 different hook options.",
    "What's the sharpest 10-second scene that delivers this?",
    "Which flavor + platform does this belong on?"
  ];
}

// Studio "Riff on this" modal — the single entry point for working on a sticky
// (2026-04-22 rewrite, replacing the old generate-then-chat flow). Lead is a
// scoped chat with the Strategist, context-aware of the sticky. Agent welcomes
// with 3 POV-discipline-aware suggestions. User can chat freely. When they're
// ready, one button turns the conversation into a full Willa's brief that can
// be adopted into the Content Briefs queue.
function StudioStickyModal({sticky, brief, apiKey, onRequestApiKey, onGenerate, onRiff, onAdopt, onClose}){
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [generatingBrief, setGeneratingBrief] = useState(false);
  const scrollRef = React.useRef();
  const inputRef = React.useRef();
  const genStep = useRotatingStep(generatingBrief, STUDIO_GEN_STEPS, 2200);

  // Sticky-scoped: reset conversation each time a different sticky opens.
  useEffect(()=>{
    if(!sticky) return;
    setMessages([]); setInput(""); setError(null);
    const onKey = e => { if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return ()=>{ window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  },[sticky && sticky.id, onClose]);

  useEffect(()=>{
    if (inputRef.current) setTimeout(()=> inputRef.current.focus(), 100);
  }, [sticky && sticky.id]);

  useEffect(()=>{
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, streaming]);

  if(!sticky) return null;

  const suggestions = getStudioRiffSuggestions(sticky);

  function buildStickyContext(s) {
    const content = s.type === "link"
      ? `URL: ${s.url}${s.content ? "\nContext pasted in: " + s.content : ""}`
      : s.type === "photo"
        ? `Photo: ${s.source || "uploaded image"} — the image is attached to the user's first message in this riff. Read the pixels directly: what brand / format / aesthetic / mood is visible? Don't ask the user to describe it.`
        : `Note: ${s.content}`;
    return `=== IDEA UNDER RIFF (STUDIO) ===
The user dropped this into the Studio and wants to SHAPE it into a Willa's post. Your job: help refine the idea — propose hook options, explore angles, suggest visual direction, nail the voice. Be specific. Show rewritten hooks, caption options, concrete visual direction. Don't just describe what to do — DO it.

**What they dropped:**
Type: ${s.type}
${content}
${s.note ? "User's own note: " + s.note : ""}
${s.sourceCard ? "Came from: " + s.sourceCard : ""}

When the user is ready to commit to a specific direction, mention they can click the "Turn into a brief" button below the chat to generate a full Willa's brief (concept, hook, captions, visual, script, shot list). Don't rush them there — the riffing IS the work.`;
  }

  async function send(text) {
    const prompt = (text || "").trim();
    if (!prompt || streaming) return;
    if (!apiKey) { onRequestApiKey(); return; }
    setError(null);

    // For the very first user message of a photo sticky, attach the image
    // as a vision content block so Claude can SEE it. Subsequent turns are
    // text-only — Anthropic's context preserves the earlier image across
    // the conversation so we don't need to re-attach.
    let userContent = prompt;
    if (messages.length === 0 && sticky.type === "photo" && typeof sticky.image === "string") {
      const m = sticky.image.match(/^data:(image\/(?:jpeg|jpg|png|gif|webp));base64,(.+)$/i);
      if (m) {
        let mediaType = m[1].toLowerCase();
        if (mediaType === "image/jpg") mediaType = "image/jpeg";
        userContent = [
          { type: "image", source: { type: "base64", media_type: mediaType, data: m[2] } },
          { type: "text", text: prompt }
        ];
      }
    }

    const userMsg = { role: "user", content: userContent };
    setMessages(m => [...m, userMsg, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);
    try {
      const systemExtras = [{ type: "text", text: buildStickyContext(sticky) }];
      const convo = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
      for await (const chunk of streamStrategist({
        messages: convo, systemExtras, maxTokens: 1500,
        agentType: "studio_riff", contextId: sticky && sticky.id ? String(sticky.id) : null,
      })) {
        setMessages(m => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { ...last, content: last.content + chunk };
          return copy;
        });
      }
    } catch(e) {
      setMessages(m => m.slice(0, -1));
      if (e.message === "NO_API_KEY") { setError("NO_API_KEY"); onRequestApiKey(); }
      else setError(e.message || "Something went wrong.");
    } finally {
      setStreaming(false);
    }
  }

  async function turnIntoBrief() {
    if(!apiKey){ onRequestApiKey(); return; }
    setGeneratingBrief(true); setError(null);
    try {
      let userMessage = buildStickyUserMessage(sticky);
      if (messages.length > 0) {
        const riff = messages.map(m =>
          (m.role === "user" ? "ME" : "STRATEGIST") + ": " + messageDisplayText(m.content)
        ).join("\n\n");
        userMessage += "\n\n[Riff conversation that shaped this idea — lean into whichever angle the user gravitated toward]:\n" + riff + "\n\nReturn the full brief JSON now.";
      }
      const text = await callClaude(apiKey, [{role:"user", content: userMessage}]);
      const draft = extractBriefJson(text);
      onGenerate(sticky.id, draft, [
        {role:"user", content: userMessage, ts: Date.now()},
        {role:"assistant", content: text, ts: Date.now()}
      ]);
    } catch(e) {
      setError(e.message || "Couldn't turn this into a brief. Try rephrasing or keep riffing.");
    } finally {
      setGeneratingBrief(false);
    }
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text) return;
    send(text);
  }

  return (
    <div className="fixed inset-0 z-[70] fade-in flex items-start justify-center px-4 py-6 md:py-10 overflow-y-auto scrollbar"
      style={{background:"rgba(15,23,42,0.55)", backdropFilter:"blur(3px)"}}
      onClick={onClose}>
      <div className="w-full max-w-[900px] relative my-auto" onClick={e=>e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[var(--ink)] bg-white border border-[var(--border)] hover:bg-[#F6F6F0] transition z-10"
          aria-label="Close">
          <span className="text-[18px] leading-none">×</span>
        </button>

        {/* Sticky content — compact, pinned to the top so the user always sees
            what they're riffing on. */}
        <div className="card p-5 mb-3">
          <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--muted)] mb-2">WHAT YOU DROPPED IN</div>
          <div className="flex items-start gap-3">
            <StickyTypeIcon type={sticky.type}/>
            <div className="flex-1 min-w-0">
              {sticky.type === "link" && (
                <>
                  <a href={sticky.url} target="_blank" rel="noreferrer" className="text-[13px] text-[var(--ink)] font-medium hover:underline break-all">{sticky.url}</a>
                  {sticky.content && <p className="text-[12px] text-[#64748B] leading-snug mt-1">{sticky.content}</p>}
                </>
              )}
              {sticky.type === "photo" && (
                <>
                  <img src={sticky.image} alt={sticky.source || ""} className="rounded-md max-h-[180px] w-auto"/>
                  {sticky.source && <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mt-1.5">{sticky.source}</div>}
                </>
              )}
              {sticky.type === "note" && (
                <p className="font-serif text-[15px] text-[#202A44] leading-snug">{sticky.content}</p>
              )}
              {sticky.note && (
                <div className="pl-2.5 border-l-2 border-[#E8E1C2] text-[11.5px] italic text-[#64748B] leading-snug mt-2">{sticky.note}</div>
              )}
              {sticky.sourceCard && (
                <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mt-2">↳ sent from {sticky.sourceCard}</div>
              )}
            </div>
          </div>
        </div>

        {/* Riff panel — primary interaction */}
        <div className="rounded-lg overflow-hidden mb-3" style={{border:"1.5px solid #E8E1C2", background:"linear-gradient(180deg, #FFFEF7 0%, #FFFFFF 100%)"}}>
          <div className="px-5 py-3 border-b border-[#E8E1C2] flex items-center justify-between gap-2 bg-white">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full shrink-0" style={{background:"#202A44", color:"#FACC15", fontSize:"12px", fontWeight:700}}>✦</span>
              <span className="font-mono text-[9.5px] tracking-[0.22em]" style={{color:"#9E652E"}}>RIFF WITH THE STRATEGIST</span>
              <span className="text-[11px] text-[var(--muted)] hidden md:inline leading-snug">· scoped to this idea</span>
            </div>
          </div>

          {error === "NO_API_KEY" && (
            <div className="px-4 py-2.5 bg-[#FEF3C7] flex items-center justify-between gap-3">
              <div className="text-[11.5px] text-[#92400E] leading-snug">Set your Anthropic API key to start.</div>
              <button onClick={onRequestApiKey} className="font-mono text-[9px] tracking-wider px-2.5 py-1.5 rounded bg-[#202A44] text-white">SET KEY</button>
            </div>
          )}
          {error && error !== "NO_API_KEY" && (
            <div className="px-4 py-2 bg-[#FEE2E2] text-[11px] text-[#991B1B] leading-snug">⚠ {error}</div>
          )}

          <div ref={scrollRef} className="max-h-[420px] overflow-y-auto scrollbar px-4 py-3.5">
            {messages.length === 0 ? (
              <div>
                <div className="pl-3 pr-3 py-2 text-[13px] text-[#202A44] mb-3" style={{borderLeft:"2px solid #FACC15", background:"#FFFEF7", borderRadius:"0 10px 10px 0"}}>
                  <p className="leading-relaxed">I've got what you dropped in. Three ways we could shape it — or tell me something else:</p>
                </div>
                <div className="grid gap-1.5">
                  {suggestions.map((p, i) => (
                    <button key={i} onClick={()=>send(p)}
                      className="text-left px-3 py-2.5 rounded-lg border border-[var(--border)] bg-white hover:border-[#202A44] hover:bg-[#FFFEF7] transition text-[12.5px] text-[#202A44] leading-snug">
                      <span className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mr-1.5">↗</span>{p}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <StrategistMessage key={i} m={m} isLast={i === messages.length - 1} streaming={streaming}/>
              ))
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-[#E8E1C2] px-3 py-3 bg-white">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{ if(e.key === "Enter" && !e.shiftKey){ e.preventDefault(); handleSubmit(); } }}
                placeholder={streaming ? "Thinking…" : "Ask anything about this idea…"}
                disabled={streaming || generatingBrief}
                rows={1}
                className="flex-1 resize-none px-3 py-2 rounded-lg border border-[var(--border)] bg-[#FAFAF7] text-[13px] text-[#202A44] leading-snug focus:outline-none focus:border-[#202A44] disabled:opacity-60"
                style={{maxHeight:"100px", minHeight:"36px"}}/>
              <button type="submit" disabled={!input.trim() || streaming || generatingBrief}
                className="shrink-0 px-3 py-2 rounded-lg bg-[#202A44] text-white font-mono text-[10px] tracking-wider hover:bg-[#1E293B] transition disabled:opacity-40 disabled:cursor-not-allowed">
                {streaming ? "…" : "SEND →"}
              </button>
            </div>
            <div className="flex items-center justify-between mt-1.5 px-1 gap-2 flex-wrap">
              <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)]">ENTER to send · SHIFT+ENTER for new line</div>
              {messages.length >= 2 && !brief && (
                <button onClick={turnIntoBrief} disabled={generatingBrief || streaming}
                  className="font-mono text-[9px] tracking-wider px-2.5 py-1 rounded border transition hover:bg-[#F6FBF8] disabled:opacity-40"
                  style={{color:"#15803D", borderColor:"#75C596", background:"#F6FBF8"}}>
                  {generatingBrief ? "BUILDING…" : "→ TURN INTO A BRIEF"}
                </button>
              )}
            </div>
            {generatingBrief && (
              <div className="mt-2 flex items-center gap-2">
                <span className="pulse-dot pulse-dot-green"></span>
                <span className="font-mono text-[10px] tracking-wider text-[var(--muted)] fade-in" key={genStep}>{genStep}</span>
              </div>
            )}
          </form>
        </div>

        {/* Generated brief (if exists) — shown below the riff so the user can
            keep iterating after the brief is drafted. */}
        {brief && brief.draft && (
          <>
            <StudioGeneratedBrief brief={brief}/>
            {!brief.adopted && (
              <div className="card p-4 mt-3 flex items-center justify-between gap-3 flex-wrap">
                <div className="text-[12px] text-[var(--muted)] min-w-0">Happy with this brief? Adopt it into the Content Briefs queue to ship it this week.</div>
                <button onClick={()=>onAdopt(brief.id)}
                  className="shrink-0 font-mono text-[10px] tracking-wider px-3 py-1.5 rounded-md border border-[#75C596] text-[#15803D] bg-[#F6FBF8] hover:bg-[#ECFDF5] transition">
                  ↗ ADOPT TO QUEUE
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Studio({stickies, briefs, apiKey, onAddSticky, onDeleteSticky, onGenerate, onRiff, onAdopt, onRequestApiKey, onOpenApiKey, topRight, nav}){
  const [openStickyId,setOpenStickyId] = useState(null);
  const openSticky = openStickyId ? stickies.find(s=>s.id===openStickyId) : null;
  const openBrief = openSticky ? briefs.find(b=>b.stickyId===openSticky.id) : null;
  const inputRef = React.useRef();
  const ghostCount = Math.max(0, 12 - stickies.length);
  function focusInput(){
    const input = document.querySelector("input[placeholder^='Drop a link']");
    if(input) input.focus();
  }

  const adoptedCount = briefs.filter(b=>b.adopted).length;
  const draftCount = briefs.length - adoptedCount;

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-6 pb-4 border-b border-[var(--border)]">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="font-serif text-[72px] leading-[0.9] tracking-[-0.02em]">
              the <span className="italic" style={{color:"var(--amber)"}}>studio</span><span style={{color:"var(--amber)"}}>.</span>
            </h1>
            <div className="flex items-center gap-2.5 mt-2">
              <span className="studio-sparkle inline-block" style={{color:"var(--amber)", fontSize:"24px"}}>✦</span>
              <span className="font-mono text-[10px] tracking-[0.22em] text-[var(--muted)]">RIFF ROOM · STRATEGIST ON DUTY</span>
            </div>
            <p className="text-[16px] text-[#334155] mt-5 max-w-[680px] leading-[1.65]">
              drop a link, a photo, or a half-formed thought — she'll turn it into a brief that's already on-brand. <span className="italic">yours to shape, send, or rip up.</span> 🌾
            </p>
          </div>
          {topRight}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar px-8 py-5">
        <div className="max-w-[1400px]">
          <div className="mb-3">
            <PostingAsStrip/>
            <StudioInputBar onAdd={onAddSticky}/>
          </div>

          {/* Vision preview callout removed 2026-05-18 — vision is now live;
              dropping a photo into a sticky and riffing on it works. */}

          {stickies.length === 0 && (
            <div className="mb-5 flex items-start gap-4 px-5 py-4 rounded-lg border-2" style={{background:"#FFFEF7", borderColor:"#E8E1C2"}}>
              <span className="text-[24px] shrink-0 leading-none mt-0.5">💡</span>
              <div className="flex-1">
                <div className="font-mono text-[10px] tracking-[0.18em] mb-1.5" style={{color:"var(--amber)"}}>QUICK TIP</div>
                <p className="text-[13.5px] text-[#202A44] leading-[1.6]">Every card on the Intelligence Brief has a <span className="font-mono text-[10.5px] px-1.5 py-0.5 rounded border border-[var(--border)] bg-white mx-0.5">+ STUDIO</span> button — use it to riff on this week's intel without copy-pasting. The colored placeholders below are what the canvas looks like once your team fills it up. 🌾</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {stickies.map(s=>{
              const b = briefs.find(br=>br.stickyId===s.id);
              return (
                <StickyCard key={s.id} sticky={s} brief={b}
                  onOpen={()=>setOpenStickyId(s.id)}
                  onDelete={onDeleteSticky}/>
              );
            })}
            {Array.from({length: ghostCount}).map((_,i)=>(
              <GhostSticky key={"ghost-"+i}
                color={GHOST_STICKY_COLORS[i % GHOST_STICKY_COLORS.length]}
                hint={GHOST_STICKY_HINTS[i % GHOST_STICKY_HINTS.length]}
                index={i}
                onFocus={focusInput}/>
            ))}
          </div>
        </div>
      </div>

      <StudioStickyModal
        sticky={openSticky}
        brief={openBrief}
        apiKey={apiKey}
        onRequestApiKey={onRequestApiKey}
        onGenerate={onGenerate}
        onRiff={onRiff}
        onAdopt={onAdopt}
        onClose={()=>setOpenStickyId(null)}/>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// ASK THE STRATEGIST — persistent floating chat. Same strategist agent
// as the Studio riff + brief riff (see STRATEGIST_SYSTEM_PROMPT above).
// Opens via the floating button or ⌘K from anywhere on the site.
// Added 2026-04-22.
// ──────────────────────────────────────────────────────────

const STRATEGIST_HISTORY_STORAGE = "willas-strategist-history";
// Suggested prompts surfaced on the empty Ask the Strategist panel.
// These should reflect THIS WEEK's actual cultural moments (CULTURAL_PULSE
// hooks + Memorial Day-style calendar anchors) — not last-month leftovers.
// Refreshed weekly. Long-term: generate dynamically from CULTURAL_PULSE
// during the Sunday refresh, so the prompts always match the live data.
const STRATEGIST_SUGGESTED_PROMPTS = [
  "Memorial Day Weekend is around the corner — what's the strongest play for the family-kitchen lane?",
  "Cottage cheese oats are eating TikTok — how do we ride it without losing the brand voice?",
  "Grandfluencers are having their moment — what's our Willa's-original-story angle here?",
  "What's a diet-culture trend in our feed right now that Willa's should push back on?"
];

// Cap strategist chat history at 100 messages (50 user + 50 assistant turns)
// to prevent localStorage growing unbounded across sessions. The agent doesn't
// need ancient history — Phase B Supabase persists the full thread server-side.
const STRATEGIST_MAX_MESSAGES = 100;

function useStrategistChat() {
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STRATEGIST_HISTORY_STORAGE);
      const parsed = raw ? JSON.parse(raw) : [];
      // Trim on load in case the storage was set before the cap existed
      return parsed.length > STRATEGIST_MAX_MESSAGES
        ? parsed.slice(-STRATEGIST_MAX_MESSAGES)
        : parsed;
    } catch(e) { return []; }
  });
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Cap before persisting — keeps localStorage from growing forever.
      const toSave = messages.length > STRATEGIST_MAX_MESSAGES
        ? messages.slice(-STRATEGIST_MAX_MESSAGES)
        : messages;
      localStorage.setItem(STRATEGIST_HISTORY_STORAGE, JSON.stringify(toSave));
    } catch(e){}
  }, [messages]);

  async function send(text, opts = {}) {
    const prompt = (text || "").trim();
    if (!prompt || streaming) return;
    setError(null);
    const userMsg = { role: "user", content: prompt };
    // If opts.replaceHistory is set, start fresh with just this message
    // (used when seeding a new topic from a card — keeps the chat focused).
    const baseMessages = opts.replaceHistory ? [] : messages;
    setMessages(opts.replaceHistory
      ? [userMsg, { role: "assistant", content: "" }]
      : m => [...m, userMsg, { role: "assistant", content: "" }]);
    setStreaming(true);
    try {
      const convo = [...baseMessages, userMsg].map(m => ({ role: m.role, content: m.content }));
      for await (const chunk of streamStrategist({
        messages: convo,
        systemExtras: opts.systemExtras || [],
        maxTokens: opts.maxTokens || 2000,
        agentType: "strategist", contextId: null
      })) {
        setMessages(m => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { ...last, content: last.content + chunk };
          return copy;
        });
      }
    } catch(e) {
      setMessages(m => m.slice(0, -1));
      if (e.message === "NO_API_KEY") setError("NO_API_KEY");
      else setError(e.message || "Something went wrong talking to Claude.");
    } finally {
      setStreaming(false);
    }
  }

  function clear() {
    setMessages([]);
    setError(null);
  }

  return { messages, streaming, error, send, clear };
}

// Format helpers for seeding the Strategist from other surfaces (brief detail,
// sticky cards, cultural pulse cards). Each returns a ready-to-send user
// message that gives the agent the context it needs to riff productively.
function seedMessageForBrief(b) {
  const recHook = (b.hooks && b.hooks.find(h => h.recommended)) ? b.hooks.find(h => h.recommended).text : (b.hooks && b.hooks[0] ? b.hooks[0].text : "");
  return [
    `I want to riff on this brief and push it in a different direction.`,
    ``,
    `**Brief:** ${b.concept}`,
    `**Platform / flavor / pillar:** ${b.platform} · ${b.flavor} · ${b.pillar}`,
    `**DNA format:** ${b.dnaPattern || "—"}`,
    recHook ? `**Current hook:** "${recHook}"` : "",
    ``,
    `Give me 3 different angles we could push this in — different hook, different emotional beat, or a different DNA format. Keep it tight.`
  ].filter(Boolean).join("\n");
}

function seedMessageForSticky(sticky) {
  let context;
  if (sticky.type === "link") context = `a link: ${sticky.url}${sticky.content ? "\n(Context: " + sticky.content + ")" : ""}`;
  else if (sticky.type === "photo") context = `a photo/screenshot I uploaded: ${sticky.source || "image"}`;
  else context = `a note: "${sticky.content}"`;
  const extra = sticky.note ? `\n\nContext for you: ${sticky.note}` : "";
  return [
    `Help me shape this into a Willa's-voice post.`,
    ``,
    `I dropped ${context}.${extra}`,
    ``,
    `Give me 2–3 angles on how Willa's should ride this. Don't write the full brief yet — just the directional ideas. I'll pick one and we'll build from there.`
  ].join("\n");
}

// Minimal markdown-ish renderer for strategist responses. Handles:
// **bold** / *italic* · bullet lines starting with `- ` or `• ` · paragraph
// breaks on blank lines · ### / ## / # headers. Safe for React (no HTML
// injection — everything renders through React components).
function renderInlineMd(text, keyPrefix) {
  const parts = [];
  let remaining = String(text);
  let i = 0;
  // Bold first, then italic (greedy order matters so *italic* doesn't eat ** bold **)
  const boldRx = /\*\*([^*\n]+)\*\*/;
  while (remaining.length > 0) {
    const m = remaining.match(boldRx);
    if (!m) { parts.push(remaining); break; }
    if (m.index > 0) parts.push(remaining.slice(0, m.index));
    parts.push(<strong key={`${keyPrefix}-b-${i++}`} className="font-semibold">{m[1]}</strong>);
    remaining = remaining.slice(m.index + m[0].length);
  }
  // Italic pass on each string segment (skip React elements)
  const italicRx = /(?<!\*)\*([^*\n]+)\*(?!\*)/;
  return parts.flatMap((p, pi) => {
    if (typeof p !== "string") return p;
    const out = [];
    let rem = p;
    let j = 0;
    while (rem.length > 0) {
      const m = rem.match(italicRx);
      if (!m) { out.push(rem); break; }
      if (m.index > 0) out.push(rem.slice(0, m.index));
      out.push(<em key={`${keyPrefix}-i-${pi}-${j++}`} className="italic">{m[1]}</em>);
      rem = rem.slice(m.index + m[0].length);
    }
    return out;
  });
}

function renderStrategistMd(text) {
  if (!text) return null;
  const lines = text.split(/\n/);
  const blocks = [];
  let curList = null;
  let curPara = null;
  const flushP = () => { if (curPara) { blocks.push({t:"p", s:curPara.join(" ")}); curPara = null; } };
  const flushL = () => { if (curList) { blocks.push({t:"ul", items:curList}); curList = null; } };
  lines.forEach(raw => {
    const line = raw.replace(/\s+$/, "");
    const trimmed = line.trim();
    if (!trimmed) { flushP(); flushL(); return; }
    const bullet = trimmed.match(/^[-•]\s+(.*)/);
    if (bullet) { flushP(); if(!curList) curList = []; curList.push(bullet[1]); return; }
    const header = trimmed.match(/^(#{1,3})\s+(.*)/);
    if (header) { flushP(); flushL(); blocks.push({t:"h", level:header[1].length, s:header[2]}); return; }
    flushL();
    if (!curPara) curPara = [];
    curPara.push(trimmed);
  });
  flushP(); flushL();
  return blocks.map((b, i) => {
    if (b.t === "h") return (
      <div key={i} className={b.level === 1
        ? "font-serif text-[15px] font-semibold text-[#202A44] mt-2 mb-1 first:mt-0"
        : "font-mono text-[9px] tracking-[0.15em] text-[#9E652E] uppercase mt-2 mb-1 first:mt-0"
      }>{renderInlineMd(b.s, "h"+i)}</div>
    );
    if (b.t === "ul") return (
      <ul key={i} className="list-none my-1.5 pl-0 space-y-1">
        {b.items.map((it, j) => (
          <li key={j} className="flex gap-2 leading-relaxed">
            <span className="text-[#9E652E] shrink-0">•</span>
            <span className="flex-1">{renderInlineMd(it, `ul${i}-${j}`)}</span>
          </li>
        ))}
      </ul>
    );
    return <p key={i} className="leading-relaxed mb-2 last:mb-0">{renderInlineMd(b.s, "p"+i)}</p>;
  });
}

function StrategistMessage({ m, isLast, streaming }) {
  const displayText = messageDisplayText(m.content);
  // Surface attached image (vision content block) above the user's text
  // bubble — both so the user sees what they sent + visually confirms the
  // strategist received it. Only applies to user messages.
  const imageBlock = Array.isArray(m.content)
    ? m.content.find(b => b && b.type === "image" && b.source && b.source.data)
    : null;

  if (m.role === "user") {
    return (
      <div className="flex flex-col items-end mb-3 gap-1">
        {imageBlock && (
          <img
            src={`data:${imageBlock.source.media_type};base64,${imageBlock.source.data}`}
            alt="attached"
            className="max-w-[60%] max-h-[180px] rounded-md border border-[var(--border)] object-cover"
          />
        )}
        <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-br-sm text-[13px] leading-relaxed whitespace-pre-wrap" style={{background:"#202A44", color:"#fff"}}>
          {displayText}
        </div>
      </div>
    );
  }
  const showCursor = streaming && isLast && !displayText;
  return (
    <div className="flex justify-start mb-3">
      <div className="max-w-[92%] pl-3 pr-3 py-2 text-[13px] text-[#202A44]" style={{borderLeft:"2px solid #FACC15", background:"#FFFEF7", borderRadius:"0 10px 10px 0"}}>
        {showCursor ? (
          <span className="inline-flex items-center gap-1.5 text-[var(--muted)] text-[11px]">
            <span className="inline-block w-1 h-1 rounded-full animate-pulse" style={{background:"#9E652E"}}></span>
            <span className="inline-block w-1 h-1 rounded-full animate-pulse" style={{background:"#9E652E", animationDelay:"0.2s"}}></span>
            <span className="inline-block w-1 h-1 rounded-full animate-pulse" style={{background:"#9E652E", animationDelay:"0.4s"}}></span>
          </span>
        ) : (
          <>
            {renderStrategistMd(displayText)}
            {streaming && isLast && <span className="inline-block ml-0.5 animate-pulse text-[#9E652E]">▊</span>}
          </>
        )}
      </div>
    </div>
  );
}

function AskStrategist({ open, onClose, onRequestApiKey, chat }) {
  const [input, setInput] = useState("");
  const scrollRef = React.useRef(null);
  const inputRef = React.useRef(null);

  useEffect(() => {
    if (open && inputRef.current) setTimeout(()=> inputRef.current.focus(), 80);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat.messages, chat.streaming]);

  if (!open) return null;

  function handleSubmit(e) {
    e && e.preventDefault();
    if (!getClaudeApiKey()) { onRequestApiKey(); return; }
    const text = input.trim();
    if (!text) return;
    chat.send(text);
    setInput("");
  }

  function sendSuggested(text) {
    if (!getClaudeApiKey()) { onRequestApiKey(); return; }
    chat.send(text);
  }

  return (
    <div className="fixed z-[100] fade-in" style={{right:"24px", bottom:"96px", width:"min(440px, calc(100vw - 48px))", height:"min(640px, calc(100vh - 140px))"}}>
      <div className="w-full h-full flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-white" style={{border:"1px solid var(--border)"}}>
        {/* Header */}
        <div className="px-5 py-3.5 flex items-center justify-between gap-3 border-b border-[var(--border)]" style={{background:"linear-gradient(180deg, #202A44 0%, #1E293B 100%)"}}>
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full shrink-0" style={{background:"#FACC15",color:"#202A44",fontSize:"13px",fontWeight:700}}>✦</span>
            <div className="font-serif text-[15px] text-white leading-none">The Strategist</div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {chat.messages.length > 0 && (
              <button onClick={chat.clear} title="Clear conversation"
                className="font-mono text-[8.5px] tracking-wider px-2 py-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition">CLEAR</button>
            )}
            <button onClick={onClose} title="Close (Esc)"
              className="w-7 h-7 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition text-[14px]">×</button>
          </div>
        </div>

        {/* Error banner */}
        {chat.error === "NO_API_KEY" && (
          <div className="px-5 py-3 border-b border-[var(--border)] bg-[#FEF3C7] flex items-center justify-between gap-3">
            <div className="text-[11.5px] text-[#92400E] leading-snug">Set your Anthropic API key to start chatting.</div>
            <button onClick={onRequestApiKey} className="font-mono text-[9px] tracking-wider px-2.5 py-1.5 rounded bg-[#202A44] text-white">SET KEY</button>
          </div>
        )}
        {chat.error && chat.error !== "NO_API_KEY" && (
          <div className="px-5 py-2.5 border-b border-[var(--border)] bg-[#FEE2E2] text-[11px] text-[#991B1B] leading-snug">
            ⚠ {chat.error}
          </div>
        )}

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar px-4 py-4" style={{background:"#FAFAF7"}}>
          {chat.messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center">
              <div className="text-center mb-5">
                <div className="text-[12px] text-[var(--muted)] leading-snug max-w-[340px] mx-auto">Ask anything. It knows Willa's brand, the cultural calendar, and what drives relevance on TikTok + IG.</div>
              </div>
              <div className="grid gap-1.5">
                {STRATEGIST_SUGGESTED_PROMPTS.map((p, i) => (
                  <button key={i} onClick={()=>sendSuggested(p)}
                    className="text-left px-3 py-2.5 rounded-lg border border-[var(--border)] bg-white hover:border-[#202A44] hover:bg-[#FFFEF7] transition text-[12.5px] text-[#202A44] leading-snug">
                    <span className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mr-1.5">↗</span>{p}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {chat.messages.map((m, i) => (
                <StrategistMessage key={i} m={m} isLast={i === chat.messages.length - 1} streaming={chat.streaming}/>
              ))}
            </>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-[var(--border)] bg-white px-3 py-3">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{
                if(e.key === "Enter" && !e.shiftKey){ e.preventDefault(); handleSubmit(); }
              }}
              placeholder={chat.streaming ? "Thinking…" : "Ask anything — ideas, riffs, strategy…"}
              disabled={chat.streaming}
              rows={1}
              className="flex-1 resize-none px-3 py-2 rounded-lg border border-[var(--border)] bg-[#FAFAF7] text-[13px] text-[#202A44] leading-snug focus:outline-none focus:border-[#202A44] disabled:opacity-60"
              style={{maxHeight:"120px", minHeight:"36px"}}/>
            <button type="submit" disabled={!input.trim() || chat.streaming}
              className="shrink-0 px-3.5 py-2 rounded-lg bg-[#202A44] text-white font-mono text-[10px] tracking-wider hover:bg-[#1E293B] transition disabled:opacity-40 disabled:cursor-not-allowed">
              {chat.streaming ? "…" : "SEND →"}
            </button>
          </div>
          <div className="flex items-center justify-between mt-1.5 px-1">
            <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)]">ENTER to send · SHIFT+ENTER for new line</div>
            <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)]">
              ● STRATEGIST READY
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function StrategistFAB({ open, onToggle, hasNewReply }) {
  return (
    <button onClick={onToggle}
      title={open ? "Close Strategist (Esc)" : "Ask the Strategist (⌘K)"}
      className="fixed z-[99] bottom-6 right-6 flex items-center gap-2 pl-3.5 pr-4 py-3 rounded-full shadow-xl transition-all hover:shadow-2xl"
      style={{
        background: open ? "#FFFFFF" : "linear-gradient(135deg, #202A44 0%, #1E293B 100%)",
        color: open ? "#202A44" : "#fff",
        border: open ? "1px solid var(--border)" : "1px solid rgba(250,204,21,0.45)"
      }}>
      <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full shrink-0" style={{
        background: open ? "#202A44" : "#FACC15",
        color: open ? "#FACC15" : "#202A44",
        fontSize:"12px",
        fontWeight:700
      }}>{open ? "×" : "✦"}</span>
      <span className="font-mono text-[10.5px] tracking-[0.12em]">{open ? "CLOSE" : "ASK THE STRATEGIST"}</span>
    </button>
  );
}

// ──────────────────────────────────────────────────────────
// SETTINGS TAB — theme, text size, motion, account utilities.
// Persisted via localStorage (key: "willas-settings"), applied to the <html>
// element through data-attributes (data-theme, data-text-size, data-motion)
// so CSS variable swaps + accessibility classes propagate without prop drilling.
// ──────────────────────────────────────────────────────────
function SettingsTab({settings, setSettings, nav, topRight}){
  const update = (patch)=> setSettings(s => ({...s, ...patch}));
  const resetWelcome = ()=>{
    try{ localStorage.removeItem("willas-highlights-seen"); }catch(e){}
    alert("Welcome popup reset — it'll show on the next page reload.");
  };
  const resetAll = ()=>{
    if(!confirm("Reset every saved preference? This clears settings, the welcome popup state, and the studio API key.")) return;
    try{
      localStorage.removeItem("willas-settings");
      localStorage.removeItem("willas-highlights-seen");
      localStorage.removeItem(STUDIO_KEY_STORAGE);
    }catch(e){}
    setSettings({theme:"light", textSize:"md", reduceMotion:false});
  };

  // Reusable swatch row for theme selection — three options, one active.
  const ThemeOption = ({value, label, swatch, sub})=>{
    const active = settings.theme === value;
    return (
      <button onClick={()=>update({theme:value})}
        className="text-left rounded-lg p-4 transition flex flex-col gap-2"
        style={{
          background: active ? "var(--bg-soft)" : "var(--bg-card)",
          border: "1.5px solid " + (active ? "var(--ink)" : "var(--border)"),
        }}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.18em]" style={{color:"var(--muted)"}}>{label.toUpperCase()}</span>
          {active && <span className="font-mono text-[8.5px] tracking-wider px-1.5 py-0.5 rounded text-white" style={{background:"var(--ink)"}}>SELECTED</span>}
        </div>
        <div className="flex gap-1.5 mt-1">
          {swatch.map((s,i)=>(
            <div key={i} className="flex-1 h-9 rounded" style={{background:s, border:"1px solid var(--border)"}}></div>
          ))}
        </div>
        <div className="text-[12px]" style={{color:"var(--muted)"}}>{sub}</div>
      </button>
    );
  };

  // Reusable size option for text-size selection.
  const SizeOption = ({value, label, sample})=>{
    const active = settings.textSize === value;
    return (
      <button onClick={()=>update({textSize:value})}
        className="rounded-lg p-4 transition flex-1 text-left"
        style={{
          background: active ? "var(--bg-soft)" : "var(--bg-card)",
          border: "1.5px solid " + (active ? "var(--ink)" : "var(--border)"),
        }}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] tracking-[0.18em]" style={{color:"var(--muted)"}}>{label.toUpperCase()}</span>
          {active && <span className="font-mono text-[8.5px] tracking-wider px-1.5 py-0.5 rounded text-white" style={{background:"var(--ink)"}}>SELECTED</span>}
        </div>
        <div className="font-serif" style={{fontSize:sample, color:"var(--ink)", lineHeight:1.2}}>Aa</div>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-6 pb-4 border-b" style={{borderColor:"var(--border)"}}>
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="font-mono text-[9px] tracking-wider mb-1" style={{color:"var(--muted)"}}>SETTINGS</div>
            <h1 className="font-serif text-[28px] leading-none tracking-tight">Make it yours</h1>
            <p className="text-[12px] mt-1.5 max-w-2xl" style={{color:"var(--muted)"}}>Theme, text size, and accessibility. Saved to this browser — re-applies every time you load the dashboard.</p>
          </div>
          {topRight}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar px-8 py-6">
        <div className="max-w-[860px] flex flex-col gap-7">

          {/* THEME */}
          <section>
            <div className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{color:"var(--muted)"}}>★ THEME</div>
            <h2 className="font-serif text-[20px] tracking-tight mb-4">Light, dark, or follow your system</h2>
            <div className="grid grid-cols-3 gap-3">
              <ThemeOption value="light" label="Light" sub="Daylight cream — the original." swatch={["#FAFAF7","#FFFFFF","#202A44"]}/>
              <ThemeOption value="dark"  label="Dark"  sub="Late-night ink — easier on eyes after 7pm." swatch={["#10141B","#1A1F2A","#E8EDF2"]}/>
              <ThemeOption value="auto"  label="Auto"  sub="Match your OS preference (manual override anytime)." swatch={["#FAFAF7","#10141B","#202A44"]}/>
            </div>
            <div className="mt-2 text-[11px]" style={{color:"var(--muted)"}}>Brand accent colors stay constant across themes — only surfaces flip.</div>
          </section>

          {/* TEXT SIZE */}
          <section>
            <div className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{color:"var(--muted)"}}>★ TEXT SIZE</div>
            <h2 className="font-serif text-[20px] tracking-tight mb-4">Pick a comfortable read</h2>
            <div className="grid grid-cols-3 gap-3">
              <SizeOption value="sm" label="Small"   sample="20px"/>
              <SizeOption value="md" label="Medium"  sample="26px"/>
              <SizeOption value="lg" label="Large"   sample="32px"/>
            </div>
            <div className="mt-2 text-[11px]" style={{color:"var(--muted)"}}>Scales body copy and most UI text. Headlines + nav stay anchored so layout doesn't break.</div>
          </section>

          {/* MOTION */}
          <section>
            <div className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{color:"var(--muted)"}}>★ ACCESSIBILITY</div>
            <h2 className="font-serif text-[20px] tracking-tight mb-4">Reduce motion</h2>
            <button onClick={()=>update({reduceMotion: !settings.reduceMotion})}
              className="w-full rounded-lg p-4 transition flex items-center justify-between"
              style={{
                background: settings.reduceMotion ? "var(--bg-soft)" : "var(--bg-card)",
                border: "1.5px solid " + (settings.reduceMotion ? "var(--ink)" : "var(--border)"),
              }}>
              <div className="text-left">
                <div className="text-[14px] font-medium" style={{color:"var(--ink)"}}>Turn off animations + transitions</div>
                <div className="text-[11.5px] mt-0.5" style={{color:"var(--muted)"}}>Disables the ticker, fade-ins, pulse dots, and the riff-room sparkle. Recommended if you find motion distracting or get vestibular symptoms.</div>
              </div>
              <div className="shrink-0 w-12 h-7 rounded-full p-1 transition"
                style={{background: settings.reduceMotion ? "var(--ink)" : "var(--border)"}}>
                <div className="w-5 h-5 rounded-full transition-transform"
                  style={{background:"#fff", transform: settings.reduceMotion ? "translateX(20px)" : "translateX(0)"}}/>
              </div>
            </button>
          </section>

          {/* ACCOUNT / DATA */}
          <section>
            <div className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{color:"var(--muted)"}}>★ ACCOUNT + DATA</div>
            <h2 className="font-serif text-[20px] tracking-tight mb-4">Reset what's saved in this browser</h2>
            <div className="grid grid-cols-1 gap-2">
              <button onClick={resetWelcome}
                className="rounded-lg p-4 text-left transition flex items-center justify-between"
                style={{background:"var(--bg-card)", border:"1.5px solid var(--border)"}}>
                <div>
                  <div className="text-[14px] font-medium" style={{color:"var(--ink)"}}>Replay the weekly highlights popup</div>
                  <div className="text-[11.5px] mt-0.5" style={{color:"var(--muted)"}}>Clears the "seen this week's highlights" flag so the popup shows next reload.</div>
                </div>
                <span className="font-mono text-[10px] tracking-wider" style={{color:"var(--muted)"}}>RESET ↻</span>
              </button>
              <button onClick={resetAll}
                className="rounded-lg p-4 text-left transition flex items-center justify-between"
                style={{background:"var(--bg-card)", border:"1.5px solid var(--red)"}}>
                <div>
                  <div className="text-[14px] font-medium" style={{color:"var(--red)"}}>Reset all preferences (browser-only)</div>
                  <div className="text-[11.5px] mt-0.5" style={{color:"var(--muted)"}}>Clears settings, welcome popup state, and the saved Studio API key. The dashboard data itself isn't touched.</div>
                </div>
                <span className="font-mono text-[10px] tracking-wider" style={{color:"var(--red)"}}>CLEAR ↻</span>
              </button>
            </div>
          </section>

          {/* QUIET FOOTER */}
          <div className="pt-4 mt-2 border-t font-mono text-[10px] tracking-wider flex items-center justify-between" style={{borderColor:"var(--border-soft)", color:"var(--muted)"}}>
            <span>SETTINGS · BROWSER-LOCAL · {WELCOME_WEEK_RANGE}</span>
            <span>WILLA'S SOCIAL CONTENT ENGINE</span>
          </div>

        </div>
      </div>
    </div>
  );
}

function App(){
  const [unlocked,setUnlocked] = useState(()=>{
    try{ return localStorage.getItem("willas-unlocked")==="1"; }catch(e){ return false; }
  });
  if(!unlocked) return <PasswordGate onUnlock={()=>setUnlocked(true)}/>;
  return <Dashboard/>;
}

function Dashboard(){
  const [section,setSection] = useState("intel");
  const [intelTab,setIntelTab] = useState("pulse");
  const [selectedBriefId,setSelectedBriefId] = useState(null);
  const [briefModalOpen,setBriefModalOpen] = useState(false);
  const [focusId,setFocusId] = useState(null);
  const [howItWorksOpen,setHowItWorksOpen] = useState(false);
  const [referenceOpen,setReferenceOpen] = useState(false);
  const [engineDrawerOpen,setEngineDrawerOpen] = useState(false);
  const [commandOpen,setCommandOpen] = useState(false);
  const [strategistOpen,setStrategistOpen] = useState(false);
  const [namePromptStickyId,setNamePromptStickyId] = useState(null);
  const strategistChat = useStrategistChat();
  const topRight = <TabTopRight drawerOpen={engineDrawerOpen} onToggleDrawer={()=>setEngineDrawerOpen(o=>!o)}/>;
  const [welcomeOpen,setWelcomeOpen] = useState(()=>{
    try{ return localStorage.getItem("willas-highlights-seen")!==WELCOME_WEEK_KEY; }catch(e){ return true; }
  });

  // Settings — persisted to localStorage, applied to <html> via data-attributes
  // so CSS variable swaps + accessibility classes work without re-renders.
  const [settings,setSettings] = useState(()=>{
    try{
      const raw = localStorage.getItem("willas-settings");
      if(raw) return JSON.parse(raw);
    }catch(e){}
    return {theme:"light", textSize:"md", reduceMotion:false};
  });
  useEffect(()=>{
    try{ localStorage.setItem("willas-settings", JSON.stringify(settings)); }catch(e){}
    const html = document.documentElement;
    // Resolve "auto" theme against OS preference; "light"/"dark" are explicit.
    const resolveTheme = ()=>{
      if(settings.theme === "auto"){
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      return settings.theme === "dark" ? "dark" : "light";
    };
    html.setAttribute("data-theme", resolveTheme());
    html.setAttribute("data-text-size", settings.textSize || "md");
    html.setAttribute("data-motion", settings.reduceMotion ? "reduce" : "normal");
    // If "auto", listen to OS preference changes and re-apply.
    if(settings.theme === "auto" && window.matchMedia){
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = ()=> html.setAttribute("data-theme", mq.matches ? "dark" : "light");
      mq.addEventListener("change", onChange);
      return ()=> mq.removeEventListener("change", onChange);
    }
  },[settings]);

  // ── Studio state ──
  const [studioState,setStudioState] = useState(loadStudioState);
  // Phase C (2026-05-18): Studio uses the /api/strategist proxy; client
  // doesn't hold the key. Initializing to truthy sentinel so the modal
  // gates downstream pass — actual auth is server-side.
  const [studioApiKey,setStudioApiKey] = useState("proxy");
  const [apiKeyModalOpen,setApiKeyModalOpen] = useState(false);
  const [studioFlash,setStudioFlash] = useState(null); // {stickyId, message} — "sent to Studio" confirmation

  useEffect(()=>{ saveStudioState(studioState); }, [studioState]);

  function saveApiKey(key){
    try{ localStorage.setItem(STUDIO_KEY_STORAGE, key); }catch(e){}
    setStudioApiKey(key);
    setApiKeyModalOpen(false);
  }

  function addSticky(partial){
    const currentName = getUserName();
    const sticky = {
      id: newId("st"),
      createdAt: Date.now(),
      createdBy: currentName || "Someone on the team",
      ...partial
    };
    setStudioState(prev => ({...prev, stickies: [sticky, ...prev.stickies]}));
    // First-time post — prompt for name. Sticky is already created with a
    // generic byline; modal will retro-stamp it once user enters their name.
    if (!currentName) setNamePromptStickyId(sticky.id);
    return sticky;
  }

  function saveNameAndStampSticky(name) {
    const trimmed = (name || "").trim();
    if (!trimmed) return;
    setUserName(trimmed);
    if (namePromptStickyId) {
      setStudioState(prev => ({
        ...prev,
        stickies: prev.stickies.map(s =>
          s.id === namePromptStickyId ? {...s, createdBy: trimmed} : s
        )
      }));
    }
    setNamePromptStickyId(null);
  }
  function deleteSticky(id){
    setStudioState(prev => ({
      stickies: prev.stickies.filter(s=>s.id!==id),
      briefs: prev.briefs.filter(b=>b.stickyId!==id)
    }));
  }
  function upsertBriefForSticky(stickyId, draft, chat){
    setStudioState(prev => {
      const existing = prev.briefs.find(b=>b.stickyId===stickyId);
      if(existing){
        return {...prev, briefs: prev.briefs.map(b=> b.stickyId===stickyId ? {...b, draft, chat} : b)};
      }
      const fresh = {id: newId("sb"), stickyId, draft, chat, adopted:false, createdAt: Date.now()};
      return {...prev, briefs: [fresh, ...prev.briefs]};
    });
  }
  function updateBriefById(briefId, draft, chat){
    setStudioState(prev => ({
      ...prev,
      briefs: prev.briefs.map(b => b.id === briefId ? {...b, draft, chat} : b)
    }));
  }
  function adoptBrief(briefId){
    setStudioState(prev => ({
      ...prev,
      briefs: prev.briefs.map(b => b.id === briefId ? {...b, adopted: true, adoptedAt: Date.now()} : b)
    }));
  }

  // Adopted Studio briefs transformed into the BRIEFS schema so they render
  // through the exact same Content Briefs components. Ordered newest-first
  // so a just-adopted brief jumps to the top of the grid.
  const studioAdoptedBriefs = useMemo(()=>{
    return studioState.briefs
      .filter(b => b.adopted)
      .sort((a,b)=>(b.adoptedAt||0) - (a.adoptedAt||0))
      .map(b => {
        const sticky = studioState.stickies.find(s => s.id === b.stickyId);
        return studioBriefToContentBrief(b, sticky);
      });
  }, [studioState.briefs, studioState.stickies]);

  // "+ Send to Studio" from any intel card. Flashes a short-lived confirmation
  // on the source card so the user sees "→ SENT" without context-switching.
  // sourceId = the ID of the card the send came from (trend ID, comp ID, pulse ID).
  function sendToStudio(sourceId, partial){
    addSticky(partial);
    setStudioFlash(sourceId);
    setTimeout(()=> setStudioFlash(null), 1800);
  }
  function closeWelcome(){
    try{ localStorage.setItem("willas-highlights-seen", WELCOME_WEEK_KEY); }catch(e){}
    setWelcomeOpen(false);
  }
  function openWelcome(){ setWelcomeOpen(true); }

  function openBrief(briefId){
    setSelectedBriefId(briefId);
    setBriefModalOpen(true);
  }
  function closeBrief(){ setBriefModalOpen(false); }

  // When the user leaves Content Briefs, close the modal so coming back later
  // lands on the clean grid view instead of a surprise re-open.
  useEffect(()=>{
    if(section !== "briefs") setBriefModalOpen(false);
  }, [section]);

  // Global ⌘K / Ctrl+K listener — opens the Strategist chat from anywhere.
  // (Previously opened the command palette; replaced 2026-04-22 per Christina's
  // feedback that the persistent chat should be the primary ⌘K experience.)
  // Esc closes the Strategist.
  useEffect(()=>{
    const onKey = (e)=>{
      if((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")){
        e.preventDefault();
        setStrategistOpen(s => !s);
      }
      if(e.key === "Escape" && strategistOpen){
        setStrategistOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return ()=> window.removeEventListener("keydown", onKey);
  }, [strategistOpen]);

  // Build the command palette search index from live data. Rebuilds when
  // Studio stickies change so the palette sees fresh inputs immediately.
  const commandIndex = useMemo(()=> buildCommandIndex(studioState.stickies), [studioState.stickies]);

  function handleCommandSelect(item){
    if(item.type === "TREND")          nav.goToTrend(item.id);
    else if(item.type === "COMPETITOR") nav.goToComp(item.id);
    else if(item.type === "BRIEF")      nav.goToBrief(item.id);
    else if(item.type === "PULSE"){ setSection("intel"); setIntelTab("pulse"); }
    else if(item.type === "STUDIO")     setSection("studio");
    else if(item.type === "ACTION"){
      switch(item.action){
        case "studio":     setSection("studio"); break;
        case "briefs":     setSection("briefs"); break;
        case "intel":      setSection("intel"); break;
        case "pulse":      setSection("intel"); setIntelTab("pulse"); break;
        case "trends":     setSection("intel"); setIntelTab("trends"); break;
        case "comp":       setSection("intel"); setIntelTab("comp"); break;
        case "playbook":   setSection("playbook"); break;
        case "perf":       setSection("perf"); break;
        case "highlights": openWelcome(); break;
        case "reference":  setReferenceOpen(true); break;
        case "howitworks": setHowItWorksOpen(true); break;
        case "engine":     setEngineDrawerOpen(true); break;
      }
    }
    setCommandOpen(false);
  }

  function flashFocus(id){
    setFocusId(id);
    setTimeout(()=>{
      const el = document.getElementById("card-"+id);
      if(el) el.scrollIntoView({behavior:"smooth", block:"center"});
    }, 60);
    setTimeout(()=> setFocusId(null), 2400);
  }

  // Opens the floating Strategist chat pre-seeded with a user message.
  // Replaces prior chat history so each seeded riff starts clean.
  function openStrategistWithSeed(seedMessage){
    if (!seedMessage) { setStrategistOpen(true); return; }
    if (!getClaudeApiKey()) { setApiKeyModalOpen(true); setStrategistOpen(true); return; }
    setStrategistOpen(true);
    setTimeout(()=> strategistChat.send(seedMessage, { replaceHistory: true }), 180);
  }

  const nav = {
    goToBrief(briefId){
      // Linking from a Trend/Competitor card jumps to Content Briefs AND opens
      // the detail modal directly, so the user is dropped on the thing they
      // clicked rather than just the grid.
      setSection("briefs");
      openBrief(briefId);
    },
    goToTrend(trendId){
      setSection("intel");
      setIntelTab("trends");
      flashFocus(trendId);
    },
    goToComp(compId){
      setSection("intel");
      setIntelTab("comp");
      flashFocus(compId);
    },
    goToPulse(pulseId){
      setSection("intel");
      setIntelTab("pulse");
      flashFocus(pulseId);
    },
    goToStudio(){ setSection("studio"); },
    sendToStudio,
    studioFlash,
    riffWithStrategist: openStrategistWithSeed,
    requestApiKey: ()=> setApiKeyModalOpen(true)
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar section={section} setSection={setSection}
        onHowItWorks={()=>setHowItWorksOpen(true)}
        onOpenReference={()=>setReferenceOpen(true)}
        onOpenWelcome={openWelcome}/>
      <main className="flex-1 overflow-hidden">
        {section==="intel" && <IntelligenceBrief tab={intelTab} setTab={setIntelTab} focusId={focusId} nav={nav} topRight={topRight}/>}
        {section==="playbook" && <WeeklyPlaybook nav={nav} topRight={topRight}/>}
        {section==="briefs" && <ContentBriefs selectedId={selectedBriefId} briefModalOpen={briefModalOpen} openBrief={openBrief} closeBrief={closeBrief} nav={nav} topRight={topRight} studioAdopted={studioAdoptedBriefs}/>}
        {section==="studio" && <Studio
          stickies={studioState.stickies}
          briefs={studioState.briefs}
          apiKey={studioApiKey}
          onAddSticky={addSticky}
          onDeleteSticky={deleteSticky}
          onGenerate={upsertBriefForSticky}
          onRiff={updateBriefById}
          onAdopt={adoptBrief}
          onRequestApiKey={()=>setApiKeyModalOpen(true)}
          onOpenApiKey={()=>setApiKeyModalOpen(true)}
          nav={nav}
          topRight={topRight}/>}
        {section==="perf" && <Performance nav={nav} topRight={topRight}/>}
        {section==="settings" && <SettingsTab settings={settings} setSettings={setSettings} nav={nav} topRight={topRight}/>}
      </main>
      <HowItWorks open={howItWorksOpen} onClose={()=>setHowItWorksOpen(false)}/>
      <ReferenceGuide open={referenceOpen} onClose={()=>setReferenceOpen(false)}/>
      <WelcomeGuide open={welcomeOpen} onClose={closeWelcome}/>
      <StudioApiKeyModal open={apiKeyModalOpen} current={studioApiKey} onSave={saveApiKey} onClose={()=>setApiKeyModalOpen(false)}/>
      <NamePromptModal open={!!namePromptStickyId} onSave={saveNameAndStampSticky} onSkip={()=>setNamePromptStickyId(null)}/>
      <EngineDrawer open={engineDrawerOpen} onClose={()=>setEngineDrawerOpen(false)}/>
      <CommandPalette open={commandOpen} onClose={()=>setCommandOpen(false)} index={commandIndex} onSelect={handleCommandSelect}/>
      {/* Ask the Strategist — floating chat, persistent across tabs.
          Opens via the FAB, via ⌘K (toggles), via the sidebar + top-right
          buttons (both rewired from the old command palette). */}
      <AskStrategist open={strategistOpen} onClose={()=>setStrategistOpen(false)} onRequestApiKey={()=>setApiKeyModalOpen(true)} chat={strategistChat}/>
      <StrategistFAB open={strategistOpen} onToggle={()=>setStrategistOpen(o=>!o)}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
