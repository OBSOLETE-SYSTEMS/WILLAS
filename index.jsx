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
// REAL DATA — Jun 8–14 2026. Refreshed Jun 7 2026.
// ──────────────────────────────────────────────────────────

const TRENDS = [
  {
    id:"T-1",
    trend:"the federal glyphosate file reopened for public comment aug 25 — and two days later a state attorney general went after an oil claim with lab results, not label reading 🔬",
    detail:"EPA published a Federal Register notice on Aug 25, 2026 opening a 30-day public comment window (docket EPA-HQ-OPP-2009-0361, comments due Sep 24, 2026) on the open-literature search that will inform an updated human-health risk assessment for glyphosate; the full updated assessment is expected late 2026. Two days later, on Aug 27, the Texas attorney general opened a Deceptive Trade Practices investigation into \"made with avocado oil\" packaged foods after a 2026 UC Davis analysis found roughly 89% of tested products contained undisclosed seed oils — 93% of chips, 71% of mayonnaise, 100% of dressings — issuing civil investigative demands to three brands and signalling more to follow. Two different agencies, two different ingredients, one mechanism: what moved the file in both cases was a third-party lab result, not a claim on a package. That is the exact evidentiary standard Willa's already meets and almost nobody in the aisle does.",
    platform:"Federal Register + national food trade press",
    views:"Open federal docket + national trade pickup",
    velocity:"high",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"Certification is the whole story this week. Lead with the test — glyphosate residue free, every lot, verified by somebody who isn't us.",
    urgency:"RIDE NOW",
    sources:[
      {label:"Federal Register · Glyphosate open literature search to inform human health risk assessment, notice of availability (Aug 25, 2026)", url:"https://www.federalregister.gov/documents/2026/08/25/2026-17301/glyphosate-open-literature-search-to-inform-human-health-risk-assessment-notice-of-availability"},
      {label:"EPA · Public comment period open — glyphosate draft risk assessments (agency comment-period page)", url:"https://www.epa.gov/pesticides/public-comment-period-open-glyphosate-draft-risk-assessments"},
      {label:"Food Dive · Texas AG opens investigation into avocado oil claims (Aug 27, 2026)", url:"https://www.fooddive.com/news/texas-avocado-oil-investigation-pepsico-siete-kraft-heinz-primal-kitchen/828978/"}
    ]
  },
  {
    id:"T-2",
    trend:"california passed a first-in-nation \"non-ultraprocessed certified\" law aug 28 — and for the first time a state has to write down what that actually means 🏛️",
    detail:"AB 2244 cleared both chambers of the California Legislature unanimously on Aug 28, 2026, creating a voluntary USDA-Organic-style \"Non-Ultraprocessed Certified\" seal that qualifying manufacturers could carry, with the state health department overseeing an accredited-certifier program and grocers required to display certified products. It now sits with the governor, who has until Sep 30, 2026 to sign or veto. The seal is the headline but the definition is the story: this is the first time a US government has to put a legal boundary around \"not ultra-processed,\" and every workable version of that boundary is about how a food is made — what was extracted, what was reconstructed, what was added back — rather than what the front of the box says. That vocabulary is about to become standardised, and brands that already talk that way inherit it for free.",
    platform:"State legislature + food-safety trade press",
    views:"National trade + policy coverage",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"Don't wait for a stamp. Describe the process in plain words — whole oat groats, nothing filtered out, nothing reconstructed — while the category argues definitions.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Food Safety Magazine · California passes bill to create certification seal for non-ultra-processed foods (Aug 31, 2026)", url:"https://www.food-safety.com/articles/11775-california-passes-bill-to-create-certification-seal-for-non-ultra-processed-foods"},
      {label:"WebWire · Legislature passes first-in-nation non-ultraprocessed certification bill (Aug 28, 2026)", url:"https://www.webwire.com/ViewPressRel.asp?aId=359695"}
    ]
  },
  {
    id:"T-3",
    trend:"the long weekend is the most expensive one on record — and the half of the country that isn't going anywhere is the half nobody is talking to 🧳",
    detail:"The travel forecast for the Sep 5–7 weekend has average domestic round-trip airfare up 2% to about $750, domestic hotel bookings up 9% and international accommodations 12% more expensive year over year, with road congestion peaking Thu Sep 3 between 2–7pm and Fri Sep 4 between noon–8pm, and Fri Sep 4 the busiest rental-car pickup day of the period. Top booked domestic cities are Seattle, Orlando, Boston, Denver and New York. Two things matter for content planning: Sat Sep 5 and Sun Sep 6 fall inside this ship window while the holiday Monday does not, and the same numbers that describe record travel also describe the people priced out of it. The stay-home half is hosting the last free weekend of summer with a full house and a fridge to fill, and that occasion has never been claimed here.",
    platform:"National travel forecast + regional news syndication",
    views:"Peak national holiday news cycle",
    velocity:"high",
    pillars:[
      "INGREDIENTS/RECIPES",
      "PARENTING"
    ],
    angle:"Claim the people who stayed home — one carton, a full breakfast table, the last free weekend of summer. No travel montage, no tailgate.",
    urgency:"RIDE NOW",
    sources:[
      {label:"GantNews · AAA: Labor Day travelers should expect busy roads, higher domestic airfares (Aug 31, 2026)", url:"https://gantnews.com/2026/08/31/aaa-labor-day-travelers-should-expect-busy-roads-higher-domestic-airfares/"},
      {label:"AAA Newsroom · Labor Day travelers face higher costs and heavier traffic (Aug 31, 2026)", url:"https://newsroom.acg.aaa.com/aaa-labor-day-travelers-face-higher-costs-and-heavier-traffic-wi/"}
    ]
  },
  {
    id:"T-4",
    trend:"september's reset is an adult routine story — 21% are aiming at eating habits, and 45% say september is no more motivating than january 📆",
    detail:"A consumer survey published Aug 28, 2026 asked adults what they most want to reset heading into September: home organization led at 27%, exercise and fitness 23%, eating habits 21%, sleep routine and finances tied at 15%, work 10%, social life 7%. The same survey found 45% do not feel more inspired to make changes in September than in January, against 26% who do. A four-week \"September Wellbeing Reset\" published the same day builds the opposite way from a New Year plan — 20 minutes of daily movement, then two strength sessions, then recovery, then a routine personal enough to keep — and frames the whole thing as consistency over intensity. Both point at the same audience: grown adults rebuilding a weekday, not families getting kids out the door. And the skeptic half is nearly twice the size of the believer half, which rules out the overhaul pitch entirely.",
    platform:"Consumer survey + community wellbeing programming",
    views:"Fresh in-window consumer data",
    velocity:"high",
    pillars:[
      "HEALTH/WELLNESS",
      "REVIEWS/RECS"
    ],
    angle:"Talk to adults, not parents. One swap that survives a Tuesday beats a reset — and say out loud that nobody has to overhaul anything.",
    urgency:"RIDE NOW",
    sources:[
      {label:"Tellwut · September Reset consumer survey (Aug 28, 2026)", url:"https://www.tellwut.com/surveys/lifestyle/living/212969-september-reset.html"},
      {label:"YMCA of the North · The September Wellbeing Reset, a 4-week movement routine (Aug 28, 2026)", url:"https://www.ymcanorth.org/blog/2026/08/28/5390914/the_september_wellbeing_reset_a_4_week_movement_routine_to_rebuild_healthy"}
    ]
  },
  {
    id:"T-5",
    trend:"on the biggest grocery platform, fiber searches climbed 26.4% in the first half of 2026 — more than double protein's 12.7% 🌾",
    detail:"First-half 2026 on-platform search data shows queries containing \"fiber\" up 26.4% year over year against \"protein\" up 12.7%, with category share moving alongside: milk +4%, chicken breast +6%, protein drinks +15%, and outsized share gains for protein-labelled cereal, waffles and ice cream. The interesting read is the gap between the two numbers rather than either one. The claim that has already been printed on pizza crust, noodles and cocktails is growing at half the rate of the one almost nothing on the shelf can honestly carry, because fiber cannot be bolted on the way a protein isolate can — it either survived the process or it didn't. Demand is accelerating fastest exactly where the aisle has the least to say.",
    platform:"Grocery e-commerce search data + retail trade press",
    views:"National retail trade coverage",
    velocity:"high",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    healthSubAngle:"GUT HEALTH",
    angle:"Stop competing on the loud number. Lead with fiber — 2g+, prebiotic, never added back — while the rest of the shelf is still shouting protein.",
    urgency:"RIDE NOW",
    sources:[
      {label:"The Shelby Report · Instacart report: protein, fiber reshaping America's grocery carts (Aug 28, 2026)", url:"https://theshelbyreport.com/2026/08/28/instacart-report-protein-fiber-reshaping-americas-grocery-carts/"},
      {label:"Progressive Grocer · Protein, fiber gain bigger share of today's grocery shopping trips (Aug 28, 2026)", url:"https://progressivegrocer.com/protein-fiber-gain-bigger-share-todays-grocery-shopping-trips-instacart-report-finds"}
    ]
  },
  {
    id:"T-6",
    trend:"the biggest name in plant-based meat put its first drink in the cooler — 20g pea protein, sparkling, two sweeteners, at every erewhon 🥤",
    detail:"Beyond Immerse landed Aug 24–25, 2026 across all 14 Erewhon locations in Southern California: a sparkling plant-protein line in Cherry Berry, Peach Mango and Strawberry Lemonade, carrying 20g pea protein, 5–7g soluble tapioca fiber and electrolytes per 12oz can, sweetened with stevia leaf extract and monk fruit extract. It follows a January 2026 direct-to-consumer launch and a June 2026 New York expansion through a beverage distributor, and it is the first beverage in the company's history. Read it as a category signal rather than a competitive threat: a brand built entirely on replacing meat now needs the cooler to grow, which means the plant-forward chilled set Willa's occupies keeps gaining entrants with national distribution muscle, a big number on the front and an ingredient deck that needs two sweeteners to make the number drinkable.",
    platform:"Brand press + beverage trade coverage",
    views:"National beverage trade cycle",
    velocity:"high",
    pillars:[
      "INGREDIENTS/RECIPES",
      "HEALTH/WELLNESS"
    ],
    angle:"The cooler is filling with plant drinks needing two sweeteners to work. Original needs none — put the two ingredient lists side by side.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Beyond Meat · Beyond Immerse now available at Erewhon (Aug 24, 2026)", url:"https://www.beyondmeat.com/en-US/press/beyond-immerse-now-available-at-erewhon"},
      {label:"BevNET · Beyond Immerse now available at Erewhon (Aug 24, 2026)", url:"https://www.bevnet.com/pr/2026/08/24/beyond-immerse-now-available-at-erewhon"},
      {label:"Green Queen · Beyond Meat's plant-protein drink hits Erewhon shelves (Aug 25, 2026)", url:"https://www.greenqueen.com.hk/beyond-meat-immerse-plant-protein-drink-erewhon-launch-los-angeles/"}
    ]
  },
  {
    id:"T-7",
    trend:"a one-year-old functional drink went from a rotating trial program to permanent shelf in every sprouts — the buyer decided in four months ⚡",
    detail:"The Cycle, a juice-based functional line built for period and perimenopause support (sea-buckthorn omega-7, botanicals, no caffeine, no added sugar), graduated out of Sprouts Farmers Market's rotating Forager Finds innovation program into permanent placement across the retailer's full national footprint effective September 2026, after reaching 600+ doors and three industry awards in its first year — with the national buyer decision landing roughly four months after it walked in. The post-show read from the Aug 18–20 Denver natural-products floor points the same direction: functional beverage — nonalcoholic, lower-sugar, prebiotic, gut-health — is the set the natural channel is actively clearing space for. The bar for permanent national placement right now is a drink that does a specific job, said in one line.",
    platform:"Retail distribution news + trade-show trend reporting",
    views:"Natural-channel trade cycle",
    velocity:"medium",
    pillars:[
      "REVIEWS/RECS",
      "HEALTH/WELLNESS"
    ],
    angle:"Willa's already is a functional beverage — prebiotic fiber, whole-groat protein. Say the function in one line instead of leading with clean.",
    urgency:"THIS WEEK",
    sources:[
      {label:"BevNET · The Cycle earns permanent placement at Sprouts Farmers Market nationwide (Aug 30, 2026)", url:"https://www.bevnet.com/pr/2026/08/30/the-cycle-earns-permanent-placement-at-sprouts-farmers-market-nationwide"},
      {label:"Sarah Hormachea, RD · 4 food and nutrition trends spotted at Newtopia Now (Aug 26, 2026)", url:"https://www.sarahhormachea.com/2026/08/26/4-food-nutrition-trends-i-spotted-at-newtopia/"}
    ]
  },
  {
    id:"T-8",
    trend:"a lawsuit says the outside panel behind the dairy-forward federal guidance had industry ties — eight of its nine members 🧑‍⚖️",
    detail:"A suit in federal court in Washington DC alleges that an undisclosed panel of outside reviewers reshaped the 2025–2030 Dietary Guidelines for Americans toward daily intake of fats, meat and dairy, and that eight of the panel's nine members had ties to cattlemen's, dairy, egg, pork or low-carb-industry groups — with neither the panel's report nor its member names disclosed until the guidelines themselves published Jan 7, 2026. Trade coverage carried it through Aug 31, 2026. The outcome is a long way off and irrelevant to this week's content. What is usable is the citation: the \"dairy is the default, everything else is the alternative\" starting line that plant brands have to argue against is, on the record and in a filing, not a neutral one.",
    platform:"Federal court filing + food policy trade press",
    views:"Building trade-press story, not yet consumer-viral",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "PARENTING"
    ],
    angle:"Don't attack anyone. State the standard instead: a recommendation should say who wrote it, and so should a carton. Then show the four lines.",
    urgency:"THIS WEEK",
    sources:[
      {label:"FoodNavigator · News bites: Dietary Guidelines, GRAS and PepsiCo's next move (Aug 31, 2026)", url:"https://www.foodnavigator.com/Article/2026/08/31/news-bites-dietary-guidelines-gras-and-pepsicos-next-move/"},
      {label:"Physicians Committee for Responsible Medicine · Physicians sue government to withdraw Dietary Guidelines for Americans (press release)", url:"https://www.pcrm.org/news/news-releases/physicians-sue-government-withdraw-dietary-guidelines-americans"}
    ]
  },
  {
    id:"T-9",
    trend:"two new studies stretched the clock on sweeteners — effects showing up in a second generation, and early-life sugar tracking seventy years out 🕰️",
    detail:"In the first, mice fed sucralose or stevia showed altered gut microbiomes, reduced beneficial short-chain fatty acids and changed metabolism- and inflammation-related gene activity; first-generation males on sucralose developed impaired glucose tolerance, and by the second generation, male descendants of the sucralose group and female descendants of the stevia group showed elevated fasting blood sugar, with sucralose the stronger and more persistent of the two. In the second, more than 64,000 Britons born 1951–1956 were studied against wartime sugar rationing that ended in Sept 1953: those with the least sugar exposure from conception to roughly age two showed substantially lower rates of several cancers decades later and cellular-aging markers equivalent to about 2.2 fewer years of biological age. Neither study is a front-of-pack argument. Both are about how long a formulation decision stays on the books.",
    platform:"Peer-reviewed nutrition research + science press",
    views:"Same-week national science-desk pickup",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "PARENTING"
    ],
    healthSubAngle:"DIABETES/BLOOD SUGAR",
    angle:"Willa's never made the zero-calorie swap. Say it plainly — no sucralose, no stevia, no sugar alcohols — and leave the number argument alone.",
    urgency:"THIS WEEK",
    sources:[
      {label:"ScienceDaily · Popular sweeteners may leave effects that last for generations (Aug 31, 2026)", url:"https://www.sciencedaily.com/releases/2026/08/260830000019.htm"},
      {label:"ScienceDaily · What you eat before age 2 may affect your health 70 years later (Aug 24, 2026)", url:"https://www.sciencedaily.com/releases/2026/08/260824065522.htm"}
    ]
  },
  {
    id:"T-10",
    trend:"the health desk spent the week on restriction — a keto trial and a calorie-cutting study — and every arm lost roughly the same weight ⚖️",
    detail:"A 42-person randomized trial put adults with obesity, prediabetes and fatty liver disease on ketogenic, Mediterranean or low-fat diets for four to five months: liver fat fell 67% on keto against roughly 45% on the other two, and about half the keto group no longer met prediabetes criteria — but all three groups lost around 10% of body weight. Separately, plasma analysis from a two-year trial in which adults cut calories 11–14% identified an immune protein, complement C3, that dropped with restriction independent of weight lost, pointing at a possible drug target that mimics part of the effect. Both will be clipped into \"cut something\" content within days. Logged here so the team can recognise it and decline it: neither study is a food answer, and the trial with three arms quietly says the macro wasn't the variable.",
    platform:"Peer-reviewed trials + national health press",
    views:"Mainstream health-desk pickup",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS"
    ],
    healthSubAngle:"OBESITY/SATIATION",
    angle:"Do not ride this. Willa's position is abundance, not subtraction — answer restriction content with a full plate and say nothing about macros.",
    urgency:"BACKGROUND",
    sources:[
      {label:"ScienceDaily · Keto diet cut liver fat by 67% in a clinical trial (Aug 28, 2026)", url:"https://www.sciencedaily.com/releases/2026/08/260828082327.htm"},
      {label:"ScienceDaily · Scientists may have found a shortcut to calorie restriction's anti-aging benefits (Aug 26, 2026)", url:"https://www.sciencedaily.com/releases/2026/08/260826055508.htm"}
    ]
  }
];



const TICKER = [
  {agent:"trend", text:"two government files moved Aug 25 and Aug 27 and a lab result moved both of them — so the week opens on a lot code, not a badge, and names no agency anywhere."},
  {agent:"editor", text:"september runs as three shapes: a claim, a joke and a question. one signal, three jobs, and not one line shared between them."},
  {agent:"composer", text:"claimed the stay-home long weekend for the first time. Sep 5 and Sep 6 are inside the window, Sep 7 isn't, and no sale, price or promo language goes near it."},
  {agent:"pulse", text:"killed two live top formats on six-week adjacency — a deduction game one week after the imposter word game, and a format that needs somebody to change how they look on camera."},
  {agent:"hook", text:"refused a fourth '-maxxing' construction and rebuilt fiber on shopping behaviour instead: 26.4% search growth against protein's 12.7%, and not one percentage in consumer copy."},
  {agent:"comp", text:"the category leader turned every carton it makes into a political billboard. the answer isn't a louder surface, it's four lines that can be checked."},
  {agent:"comp", text:"a national discount grocer put its own oat-milk seasonal latte on shelf the week of Aug 31 — private label carrying a format is the format ending. we decline it."},
  {agent:"visual", text:"three Chocolate briefs, three different jobs, and the ingredient list is typed on exactly one of them — six lines, vanilla included."},
  {agent:"amb", text:"a dietitian carries the calm rebuttal so the founder slots stay on the lab result and the fats argument. two faces this week, both earned on stance."},
  {agent:"editor", text:"benched the whole pumpkin wave and a $32.5M federal school-food program. one is last week's headline, the other is week five of a lane that's closed."},
  {agent:"visual", text:"Kids ships at 2g fiber and 8g protein, sweetened with organic coconut sugar — the 3g figure belongs to a different carton and was corrected on every surface before ship."},
  {agent:"perf", text:"the two pins are the only assets on this board still working in March. everything else here has a shelf life measured in days, and the spend is placed accordingly."}
];


const COMPETITORS = [
  {
    id:"C-1",
    name:"Oatly",
    color:"#2B4CE0",
    status:"Began printing a climate-advocacy message on every carton it produces, tied to the \"89 Percent Project\" — a media-backed initiative built on polling showing 80–89% of people globally want stronger government action on climate. The carton splits an \"11 words\" versus \"89 words\" layout: a short block naming the minority not interested in action, and a longer block telling politicians that 89% of people worldwide (74% in the US) want more done and that \"a lot of voters could swing your way.\" Reported Aug 28, 2026; the campaign ran first in Sweden and is expanding internationally. Strip the politics and the move underneath is the one that matters: the category leader has converted its packaging into owned media at global scale — a distribution surface no ad budget replicates, on a pack whose ingredient deck runs twelve lines. Internal intel only.",
    direction:"up",
    opportunity:"Answer with the panel they can't print: four lines, every one provable. Willa's packaging argues by being readable, not by being loud.",
    sources:[
      {label:"The New Republic · Meet 'the ultimate climate solution' — Oatly's 89 Percent carton campaign (Aug 28, 2026)", url:"https://newrepublic.com/article/214824/oatly-89-percent-climate-solution"}
    ]
  },
  {
    id:"C-2",
    name:"Aldi (private label)",
    color:"#00447C",
    status:"A private-label oat milk pumpkin spice latte is hitting shelves the week of Aug 31, 2026 alongside a savory pumpkin herb hummus — putting a national discount grocer into the oat-milk seasonal-latte format in the exact days this week's content ships. Read it as a maturity marker rather than a threat: the seasonal oat drink has now finished its migration from café menu to national private-label shelf, and a format that private label carries is a format that has stopped differentiating anybody. It also closes the door on the seasonal-flavour argument as a Willa's lane for the rest of the autumn — that ground is now occupied at the lowest price point in the market. Internal intel only.",
    direction:"up",
    opportunity:"Don't chase this. A format goes commodity the moment private label carries it — hold the ingredient argument and let the shelf keep the syrup.",
    sources:[
      {label:"Big Box Vegan · Fall and holiday vegan grocery finds, updated weekly (Aug 26, 2026)", url:"https://bigboxvegan.com/2026/08/26/fall-holiday-vegan-grocery-finds-2026-updated-weekly/"}
    ]
  }
];


const AMBASSADORS = [
  {
    type:"Clean-Eating Parenting Creators",
    description:"Mom accounts in the 10K–50K range posting school-lunch + 'what I feed my toddler' content who already vocally avoid dyes, seed oils, and gums. Activated by state-by-state regulatory news + parent-network dye-ban conversations.",
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
    id:"AUG31-TT-1",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Wed Sep 2 · 9am",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"the claim comes from us. the number doesn't.\" — tested lot by lot",
    intel:[
      {type:"TREND", text:"T-1: two separate government files moved inside seven days for the identical reason, and the reason was a laboratory result rather than a sentence on a package. On Aug 25, 2026 a federal pesticide docket reopened for a 30-day public comment window feeding an updated human-health risk assessment; on Aug 27, 2026 a state consumer-protection office opened a deceptive-trade investigation into an oil claim after an independent university analysis found roughly 89% of tested products contained an undisclosed ingredient. Different agencies, different ingredients, one mechanism: the paperwork had to answer to the number that came back. Willa's already meets that evidentiary bar — organic oats, glyphosate residue tested lot by lot by a third party — which is why this is the lead brief and why the whole slate exists. INTERNAL ONLY: no agency, no docket, no state, no attorney general, no ingredient category, no percentage and no brand may appear in the script, any overlay, the caption or any caption variant. The consumer copy never mentions the news at all — the news is why this ships Wed Sep 2, not what the video is about. Also internal: this is a lab-result brief, NOT a certification-seal brief. No badge montage, no seal reveal, no 'somebody finally wrote the test' framing — that lane is on a long rest and re-running it here would read as recycled."},
      {type:"AUDIENCE", text:"The person watching at 9am on a weekday has spent a year being told that the front of a package is unreliable, and she has no way to adjudicate any of it from the aisle. What she cannot do is run a test. So the persuasive move is not another claim delivered with more conviction — it is handing her the one thing she can't produce herself and then getting out of the way: the oats are organic, every lot gets tested for glyphosate residue, and the measuring is done by somebody who does not report to Willa's. The lot code on the counter is the emotional object of the brief — it is the least glamorous thing in frame and the only thing in frame that could be checked. INTERNAL ONLY: no shopper-psychology language, no 'in a world where' framing, no 'they don't want you to know' conspiracy register, and no voice direction on camera. The gravity is executed, never described — Patagonia's stance brought down to a kitchen table, never raised in volume."},
      {type:"COMPETITOR", text:"C-1 (Aug 28, 2026): the category leader began printing a climate-advocacy message on every carton it produces, converting its packaging into owned media at global scale — a long block of political copy on a pack whose ingredient deck runs twelve lines. Read for this brief: the loudest surface in the aisle is now being used to argue about something other than what is inside the carton. Willa's counter is not volume, it is verifiability — four lines, every one provable, plus a residue test that happens whether or not anybody is watching. That contrast is the reason this brief is quiet, unhurried and short on adjectives. INTERNAL ONLY: no brand name, no campaign name, no reference to packaging politics, climate messaging or anything a viewer could decode as a specific competitor. This is posture calibration for the read and nothing more."}
    ],
    hooks:[
      {text:"a claim is written by whoever's selling it. a test isn't.", recommended:true},
      {text:"we don't ask you to trust the front of the box. we test the oats.", recommended:false},
      {text:"these oats got tested before they got poured. every lot, every time.", recommended:false}
    ],
    caption:"Willa's oats are organic, and every lot is tested for glyphosate residue by a third party. 🔬\n\nglyphosate is the weedkiller that turns up in grain. we test for it lot by lot — not the first batch, not a sample from a good month, and not by anybody who reports to us.\n\na claim is written by whoever's selling it. a test isn't. the claim comes from us. the number doesn't. that's the only reason a number is worth anything.\n\nthen the list gets short: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar.\n\ncertified glyphosate-free. tested every lot.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#glyphosatefree",
      "#thirdpartytested",
      "#cleaningredients",
      "#foodtransparency",
      "#plantmilk",
      "#realfood"
    ],
    visual:"Christina alone in her own kitchen, shot on a phone, and for the first six seconds nothing else is allowed in frame — no b-roll, no cutaway, no carton, no overlay stack. Medium close-up at eye height, lens roughly chest-to-eyeline so it reads as a person talking across a counter rather than a founder addressing a camera. Handheld but nearly still, resting on the counter edge or a stack of books; a tripod makes this look like a corporate statement and a gimbal makes it look like an ad. Shoot mid-morning on window light from camera-left, no fill, no ring light, no bounce — let one side of her face fall off into shadow. Grade neutral and slightly cool; do not warm this up into a lifestyle kitchen. Wardrobe is whatever she'd actually wear on a Tuesday, no brand tee. The kitchen behind her stays lived-in and unstyled — real counter, a cutting board, one plant, nothing merchandised, no wall of cartons. Zero on-screen text for the first beat: her sentence carries it. From 0:06 a single navy #202A44 line may sit low in frame on a soft cream #FAFAF7 plate, one line at a time, never stacked more than two deep, in the Health-pillar blue #73B2C9 only for the ingredient tick. BEAT THREE IS THE PIVOT AND THE ONLY PROP MOVE IN THE PIECE: hard cut to a locked overhead-ish three-quarter on the counter, and one ungloved hand sets a carton of Willa's Original down, label forward, then a fingertip comes to rest an inch from the printed lot code stamped on the pack. Hold it. Do not zoom, do not push in, do not flip the carton to the back label — the ingredient-label flip is a different brief and doing it here dilutes this one. The lot code is the hero object and it should look boring, small and factory-printed, because that is the whole argument. BEAT FOUR: same locked counter frame, one unhurried pour from the carton into a clear glass, shot just above the rim so the opacity reads, held long enough to watch it settle — one pour, one take, no second angle, no slow-motion. END CARD: plain cream card, navy type, no motion, no whoosh — 'Certified glyphosate-free. Tested every lot.' — held 2 seconds with the Willa's wordmark bottom-centre. HARD PROHIBITIONS: no certification badge, no seal, no logo grid, no laboratory imagery, no gloved hands, no pipettes, no microscope, no beaker, no clipboard, no white coat — the piece must never look like a science ad. No document on screen, no headline screenshot, no news chyron, no red circle, no arrow, no stitched clip of anybody else. No second person on camera. No competitor packaging legible at any point. Palette across the whole piece is exactly three: cream, navy ink, and the pillar blue, plus the real colours of her kitchen. Christina never raises her voice, never leans into the lens, and never delivers a line like a press release — if a take reads as prepared, use the one before it.",
    script:[
      {t:"0:00-0:06", vo:"a claim is written by whoever's selling it. a test isn't.", onScreen:"(no text — hold on her)"},
      {t:"0:06-0:12", vo:"so our oats are organic, and every lot gets tested for glyphosate — the weedkiller that turns up in grain — by a third party.", onScreen:"organic oats · every lot tested for glyphosate residue"},
      {t:"0:12-0:16", vo:"not the first batch. not a sample from a good month. every lot.", onScreen:"every lot. not a sample."},
      {t:"0:16-0:20", vo:"this little stamp is how a lot gets tracked. it's the least interesting thing on here, and it's the part that has to hold up.", onScreen:"one lot → one test"},
      {t:"0:20-0:25", vo:"then it's a short list. organic whole grain oats, filtered water, organic vanilla extract, sea salt.", onScreen:"organic whole grain oats · filtered water · organic vanilla extract · sea salt"},
      {t:"0:25-0:28", vo:"the claim comes from us. the number doesn't.", onScreen:"the claim comes from us. the number doesn't."},
      {t:"0:28-0:30", vo:"(silence)", onScreen:"Certified glyphosate-free. Tested every lot."}
    ],
    audio:"No trending sound, no music of any kind, original audio only — a bed under this would turn a stance into an ad. Christina's dialogue is recorded live on camera with a lav hidden under the collar, not looped in later: the small room reflections and the breath between sentences are the credibility, and a clean booth read will sound like a statement being issued. Direct her to speak at the volume she'd use talking to one person across the counter, and to leave the pause after 'a test isn't' rather than rushing into the next line — that silence is doing the work. Capture 30 seconds of clean room tone in the same kitchen so the editor can bridge the cut to the counter without a level jump. Close-mic the pour separately on the counter: the glug and the settle are the only sound in the piece allowed to be loud, and the carton set-down should keep its real thunk rather than being softened. No voice-of-god narration, no second voice, no sting, no whoosh on the end card, no sped-up edit. Editor's note: if a take sounds performed, take the one before it — the second read is always worse than the first on this kind of line.",
    duration:"0:30",
    cta:{soft:"save this for the next time a package tells you something it can't back up.", medium:"pour Willa's Original — organic oats, tested for glyphosate residue every lot.", strong:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar. certified glyphosate-free, tested every lot."},
    benefitShorthandId:"BS-11"
  },
  {
    id:"AUG31-PIN-1",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Barista",
    dnaPattern:"viral-recipe-remix",
    timing:"Wed Sep 2 · 11am",
    priority:"STANDARD",
    concept:"\"nobody's going anywhere, and the corn is at its best.\" — the stay-home long-weekend pot",
    intel:[
      {type:"TREND", text:"T-3: the Sep 5–7 long weekend is the most expensive travel weekend on record — airfare and domestic hotel bookings up year over year and international accommodations 12% more expensive, road congestion peaking Thu Sep 3 and Fri Sep 4 — and Sat Sep 5 and Sun Sep 6 both land inside this ship window while the holiday Monday does not. The half of the country the forecast describes is the half that leaves. The other half is hosting a full house with a fridge to fill and no plans, and Willa's has never claimed that occasion. Pinterest is the right surface for it because the searcher is planning two to five days ahead of the weekend, which is why this publishes Wed Sep 2 rather than Friday. INTERNAL ONLY: no airfare figure, no hotel or booking percentage, no congestion window, no city list and no travel-forecast framing of any kind reaches the pin, the title, the description or any caption variant — those are trade and forecast numbers and they read as a media plan, not a recipe. The consumer copy knows exactly one thing about the weekend: it is long and it is open. Also internal: this pin does NOT reference the holiday by name and never touches a sale, a price, a deal or a 'stock up' framing."},
      {type:"AUDIENCE", text:"The Pinterest searcher this week is cooking for a house, not for herself, and she is looking for one pot that feeds everybody and does not require a store run for something exotic. Sweet corn is at the very end of its good stretch in early September, which makes it the single most searched produce item of the window and the one honest seasonal peg available — the retail fall reset is spent and gameday is rested, but corn going out of season is a real kitchen fact rather than a merchandising one. The dairy-free constraint is the whole reason this pin has a reason to exist: nearly every chowder that ranks in this query is built on heavy cream, half-and-half or a butter roux, so a version that gets there on oat milk is a genuinely different result rather than a substitution note buried at the bottom. INTERNAL ONLY: the search-lead-time and seasonality reasoning is planning logic and never becomes copy — the description reads like a recipe someone actually cooked, not like a keyword brief. This is also the ONLY Barista slot of the week, deliberately spent nowhere near a coffee cup."},
      {type:"COMPETITOR", text:"Nobody in the oat category briefs savory cooking. Plant-milk recipe content across the peer set is almost entirely drinks, smoothies and bakes — the carton is positioned as something you pour into a cup, and the moment a recipe needs body in a hot pan the category quietly hands the job back to coconut cream or a cashew base. That leaves the whole savory dinner occasion unclaimed by an oat brand, and it is the occasion where the whole-groat body advantage is most visible to a cook, because it shows up as texture in a bowl rather than as a number on a label. Willa's Barista is the SKU built with the most body, which is why it is the one in the pot. INTERNAL ONLY: no competitor name, no category-share commentary, no 'nobody else does this' claim and no comparison to another plant milk appears in consumer copy — the pin never argues, it just cooks. Also internal, and non-negotiable: Barista is sweetened with organic coconut sugar, so its 3g of sugar is NEVER attributed to the oat, and the comparative sugar line is not needed on this pin at all."},
      {type:"AUDIT", text:"ACCURACY CORRECTION — The caption and both caption variants (direct, warm) originally described Willa's Organic Barista Oat Milk as using 'simple organic ingredients,' reusing the Original/Chocolate house benefit-line boilerplate verbatim instead of adapting it per flavor as the Recipe-Video House Convention requires. Per the Flavor Database, Barista is Willa's MOST processed SKU (8 ingredients including calcium carbonate, tricalcium phosphate, organic high-oleic sunflower oil and organic coconut sugar) and ingredient-transparency / 'simple ingredients' framing must never lead with Barista — that lane belongs to Original (4 ingredients) or Chocolate (6 ingredients with real cacao). Corrected to 'uses the whole entire oat for a rich, smooth taste that stays smooth even at a simmer — no rapeseed oil and no gums,' which keeps only verified Barista-safe claims (whole oat groat, no rapeseed oil, no gums) and drops the false 'simple' claim. Check any other Barista-flavor brief this week (there are none — this is the only Barista slot) and future refreshes for the same copy-paste error: the house benefit line must be re-authored per flavor, never just flavor-swapped."}
    ],
    hooks:[
      {text:"some of us aren't going anywhere over the long weekend — creamy dairy-free sweet corn chowder", recommended:true},
      {text:"let's make sweet corn chowder (dairy-free!)", recommended:false},
      {text:"six ears of corn, two cups of oat milk, one pot — and no cream anywhere near it", recommended:false}
    ],
    caption:"Sweet corn is in its last good stretch of the year and the long weekend of Sep 5–6 is wide open. 🌽🥄 So here is the pot for it — a sweet corn chowder that comes out genuinely creamy without a drop of dairy in it, thick enough to hold a spoon up, done in about 35 minutes on one burner.\n\nNobody's going anywhere, and the corn is at its best. Two full cups of Willa's Barista go into this pot and they do the job cream usually does. Barista is the richest carton Willa's makes and it stays smooth in a simmering pot, which is the whole reason it is the one in this recipe.\n\nWilla's Organic Barista Oat Milk uses the whole entire oat for a rich, smooth taste that stays smooth even at a simmer — no rapeseed oil and no gums. 🥛\n\nIngredients\n- 2 cups Willa's Organic Barista Oat Milk\n- 6 ears sweet corn, kernels cut off, cobs saved\n- 2 tbsp olive oil (or Miyoko's vegan butter)\n- 1 yellow onion, diced small\n- 1 large Yukon Gold potato, diced\n- 2 cloves garlic, minced\n- 4 sprigs fresh thyme\n- ¼ cup canned coconut cream, the thick part from the top of the can\n- 1 tsp sea salt, plus more to taste\n- a lot of freshly cracked black pepper\n- 2 tbsp nutritional yeast, if you want a savory finish\n\nSoften the onion in the olive oil over low heat until it goes translucent, then add the potato, garlic and thyme. Pour in the Barista and drop in the stripped cobs — that is where most of the corn flavor is hiding. Keep it at a bare simmer for 20 minutes, never a hard boil. Pull the cobs and the thyme stems, add the kernels for the last 5 minutes, blend about a third of the pot and stir it back in. Finish with the coconut cream, the salt and more black pepper than feels reasonable.",
    hashtags:[
      "#willas",
      "#cornchowder",
      "#sweetcornchowder",
      "#dairyfreesoup",
      "#veganchowder",
      "#oatmilkrecipes",
      "#dairyfreerecipes",
      "#longweekendrecipes",
      "#plantbasedcomfortfood",
      "#cleaningredients"
    ],
    visual:"Vertical 2:3 pin (1000×1500), one photograph, no grid, no collage, no step strip, no recipe card. Camera sits at a three-quarter angle about 30 degrees above a real wooden kitchen table — not straight down, because the whole selling point of this pin is thickness and an overhead shot flattens it. Shoot 50mm full-frame equivalent, f/4 so the bowl is sharp front to back and the room behind falls off gently. Light is late-afternoon window light raking in from camera left, warm and directional, one black card at camera right to keep the shadow side from going flat — real shadows, no diffusion dome, no filter, no moody underexposure. This is a bright, warm, slightly messy table on a day off, not a restaurant still life. THE HERO, lower-centre of frame: a wide shallow bowl of chowder, pale gold, visibly thick — the surface should be matte and slightly domed rather than soupy and flat, with whole kernels standing proud of it and a swirl of the coconut cream not yet stirred in, cracked black pepper across the top, a few thyme leaves. Steam is a bonus, not a requirement; the texture is what sells it, so shoot the bowl within 90 seconds of ladling and keep reheating between takes. A spoon rests in it at an angle, half-submerged, already used. SUPPORTING FRAME, upper-left and edges: a heavy pot on a trivet just behind the bowl with a ladle still in it, three or four stripped corn cobs on a board with a knife and a scatter of loose kernels on the wood, a second bowl half-filled and clearly for somebody else, a folded linen napkin somebody has already handled. Do not sweep the kernels off the table — the mess is the argument that this was cooked and not styled. PRODUCT: one carton of Willa's Organic Barista Oat Milk stands at frame right, label square to camera, cropped slightly by the frame edge, occupying roughly a sixth of the total frame height and sitting in the same light as the bowl. It is open, cap on the table beside it. If a screenshot of the middle third of this pin does not contain the carton, reframe. PALETTE: warm wood and cream (#FAFAF7) as the ground, corn gold and thyme green from the food itself, green #75C596 as the only graphic accent (Ingredients pillar), navy #202A44 for all type. Deliberately keep every warm-orange, rust, burnt-amber, gourd and autumn-leaf tone OUT of the styling — no orange napkin, no rust ceramic, no dried leaves, no pumpkin anything; the seasonal-orange look is spent and this pin must not read as part of that set. TYPE, upper third, on clean negative space (leave the top ~30% of the table empty when shooting so the headline has somewhere to live): one confident headline in navy, sentence case, large — 'Creamy Dairy-Free Sweet Corn Chowder' — a thin #75C596 rule beneath it, then one small kicker line directly under the rule: 'nobody's going anywhere, and the corn is at its best.' Bottom-left corner carries one small stinger in navy, no badge, no lockup: 'The whole oat. Not the syrup.' That is the entire copy on the pin — headline, kicker, stinger. No ingredient list on the artwork, no numbered steps, no nutrition badges, no cook-time bubble; the description does the search work and the photograph does the arguing. HARD EXCLUSIONS on set, check the props table before the first frame: zero dairy anywhere in the shot — no butter dish, no cream jug, no milk carton other than Willa's, no cheese, no grater with cheese on it, no sour cream. ZERO COFFEE ANYTHING — no mug, no cup, no espresso machine, no French press, no beans, no grinder, no latte, no foam, not even in the deep background or reflected in a window; Barista is here as a cooking ingredient and one coffee object in frame collapses the brief. No team colours, jerseys, pennants, mascots or televisions. No alcohol, no cans, no bottles. No price tags, shelf-edge labels, receipts or multipacks. No other brand's packaging legible anywhere, including on a background shelf. No sunset-over-a-grain-bowl affirmation styling and no infographic arrows. COVERAGE: shoot a second frame one stop brighter with the bowl pushed to lower-right and the empty table on the left so the team has a mirrored crop, plus a tight three-quarter detail of the spoon lifting a thick scoop, and one clean frame of the carton pouring into the pot on the stove as an alternate pin for the same board.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save it for the weekend the corn is still good.", medium:"two cups of Willa's Organic Barista Oat Milk make this creamy — no cream, no butter, no dairy.", strong:"Willa's Organic Barista Oat Milk: organic ingredients, the whole entire oat, no rapeseed oil and no gums — rich and smooth enough to be the cream in a chowder."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG31-IG-R1",
    platform:"IG Reel",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"before-after-stitch",
    timing:"Wed Sep 2 · 12pm",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"the reset didn't survive. the pour did.\" — one swap beats a reset",
    intel:[
      {type:"TREND", text:"T-4: a consumer survey published Aug 28, 2026 asked adults what they most want to reset heading into September — home organization led at 27%, exercise and fitness 23%, eating habits 21%, sleep and finances tied at 15%, work 10%, social life 7% — and found 45% do not feel more inspired to make changes in September than in January, against 26% who do. A four-week September wellbeing routine published the same day builds the opposite way from a New Year plan: consistency over intensity, a routine personal enough to keep. Two things follow and they are the whole brief. First, this is an ADULT weekday story — grown people rebuilding a Tuesday, not families getting anyone out a door. Second, the skeptic half is nearly twice the size of the believer half, which rules out the overhaul pitch entirely and makes permission the only available posture. Willa's is the brand generous enough to say out loud that nobody has to reset anything. INTERNAL ONLY: no survey percentage, no share of adults, no 'research shows,' no 'studies say' and no reference to a wellbeing program may appear in the script, any overlay, the caption or any caption variant — the data sets the posture, it is never the subject. Also internal: the payload is arithmetic ticked as specs on one glass, never argued. The 1g may be TICKED in the checklist; the sugar case may NOT be made (that argument ran AUG 24 and is rested)."},
      {type:"PULSE", text:"CP-6 (Aug 31, 2026): a long-running daytime show ended after seven seasons and the host framed the exit as stepping off a daily production schedule because it felt necessary and right for the next chapter — the most visible possible version of what the September-reset data is measuring in aggregate: adults deciding out loud what a fall routine is actually for, and SUBTRACTING rather than adding. Ride the feeling, not the celebrity. The emotional shape this brief borrows is subtraction-as-relief: a morning that got simpler on purpose, one carton doing the work, nobody performing a routine. INTERNAL ONLY: absolutely no reference to the show, the host, the network, the finale, any song or catalogue, or any 'stepping back' celebrity framing on camera, in overlays, in the caption, in any variant or in the audio bed. There is a licensing and a taste problem in touching it directly and zero upside — the feeling is free, the reference is not."},
      {type:"COMPETITOR", text:"C-2 (Aug 26, 2026) — context only, not a linked comp for this brief: a national discount grocer is putting a private-label oat-milk seasonal latte on shelf in the exact days this content ships. Read as a maturity marker rather than a threat — a format that private label carries is a format that has stopped differentiating anybody, and it closes the seasonal-flavour lane for the rest of autumn. That is precisely why this brief answers September with a ROUTINE argument instead of a flavour one: the shelf can keep the syrup. Separately, the category leader has converted its packaging into owned media at global scale on a pack whose ingredient deck runs twelve lines — the counter is the panel they cannot print, four lines, every one provable. INTERNAL ONLY: no brand name, no private label, no retailer, no pricing, no seasonal drink, no ingredient-count comparison and no 'the category is chasing' commentary reaches any consumer surface. This is posture calibration for the read: confident, unbothered, not competing."},
      {type:"AUDIENCE", text:"This is the adult Willa's drinker with no school run in her life — the one the last four weeks of content did not talk to at all. She is being sold a second January by every feed she opens, she has done this before, and roughly half of the people around her have quietly opted out of feeling anything about it. The relief on offer is not a better plan, it is permission to keep the one thing that already worked. That is why the emotional beat lands before the arithmetic: first she is told she does not have to reset anything, THEN the glass shows up with its numbers already in it. The confession is the mechanism — she recognises the printed tracker and the four matching jars because she bought them, and the brand is on her side rather than the plan's. INTERNAL ONLY: no shopper-psychology language, no 'in a world where,' no voice direction and no wellness-brand earnestness on any consumer surface. Hard tonal guardrails for the edit: nothing that reads as restriction, macros, calories, weight, a scale, a measuring tape, a body before-and-after or a challenge. This is the abundance answer to a week of diet-culture health coverage, and one frame of a bathroom scale would invert the whole brief. Muse register: cheeky and warm, permission rather than instruction — never the nutritionist."}
    ],
    hooks:[
      {text:"you're allowed to not reset anything. one swap is a whole plan.", recommended:true},
      {text:"the before: four matching jars and a printed tracker. the after: one glass.", recommended:false},
      {text:"september wants a whole new personality. the fridge already had the answer.", recommended:false}
    ],
    caption:"One glass, poured the same way it was in July. That's the whole plan. 🥣\n\nWilla's Original is four ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt — and the numbers come with it: 4g+ protein, 2g+ prebiotic fiber (the kind that feeds your gut), 1g of sugar.\n\nthe reset didn't survive. the pour did. the printed tracker, the four matching jars, the alarm moved earlier — September asks for a whole new personality and most of it is gone by the second week. one swap you actually like will outlast a plan you're already behind on.\n\nnothing to overhaul. nothing to earn back. pour it over the same bowl you were eating in July.\n\nno reset required.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#fouringredients",
      "#septemberreset",
      "#morningroutine",
      "#guthealth",
      "#plantmilk",
      "#realfood"
    ],
    visual:"A two-half before-after stitch built on one hard cut, shot vertical 9:16 for Reels, hands and objects only — no talent on camera, no face, no body in frame at any point. THE BEFORE HALF (0:00-0:10) is deliberately over-produced and slightly too perfect: a cool, bright, almost clinical white-balance around 5600K, glossy surfaces, everything squared up and centred, cuts landing fast and mechanically on the beat. Shoot it top-down and locked: a printed habit tracker fresh off the printer being smoothed flat on a counter; four identical empty glass jars set down in a row with their labels facing exactly forward; a label-maker spitting a strip; a phone face-up as a thumb drags an alarm earlier and sets it; a new notebook cracked open to a ruled blank page; a planner sticker sheet still in its film. Each object lands with a small snap of motion and the frame recomposes instantly — the rhythm itself is the joke, an ordinary kitchen behaving like a productivity ad. Overlay for this half is Health/Wellness blue #73B2C9 in a small all-caps mono label pinned top-left, understated, never a big title card. ABSOLUTE VISUAL BANS ON THIS HALF: no bathroom scale, no measuring tape, no calorie or macro app, no gym, no supplement bottles, no meal-prep containers weighed out, no body in a mirror, no 'before' person of any kind — this is an ORGANISATION overhaul, not a diet, and a single restriction prop inverts the entire brief. Also banned throughout: kids, backpacks, lunchboxes, a school bus, a classroom, anything reading as a school year. THE STALL (0:07-0:10): hold one shot two beats longer than the edit has trained the eye to expect — the tracker on the fridge with the first few rows filled in and the rest blank, still and quiet, no music under it. That silence is the confession and it is the pivot. THE HARD CUT (0:10) is the whole mechanic: no whoosh, no transition effect, no swipe. Straight cut into a completely different grade — warm morning window light from camera-left, around 3400K, pale wood counter, cream #FAFAF7 and navy ink #202A44, a soft shadow, one plant edge out of focus in the background, nothing styled and nothing squared. THE AFTER HALF (0:10-0:25) is handheld-still and unhurried, and it is only two shots. First, the pour: a single ungloved hand lifts the Willa's Original carton, label forward and never rotated, and pours into a clear glass beside an ordinary bowl of oats or cereal already half-eaten — a used spoon resting in it, a crumb on the counter, the mug from earlier still there. That lived-in mess is the credibility; do not clean the counter. Shoot the pour slightly above the rim so the opacity reads and hold through the settle. Second, the tick: the same frame, static, as four specs type on one line at a time in navy on a soft cream rounded plate, lower third, aligned left, stacked no more than four deep — '4g+ protein' / '2g+ prebiotic fiber' / '1g sugar' / '4 ingredients'. They tick calmly, one per second, with no sting and no pop — arithmetic on a glass, not an argument being won. Product is in frame for well over half the after half and the carton never leaves the counter after the pour. END CARD: plain cream #FAFAF7, navy type, no motion — 'no reset required.' held 1.5 seconds, with 'Four ingredients. (Read 'em.)' set small beneath it and the Willa's wordmark bottom-centre. Palette across the whole piece is exactly three: cream, navy ink, and the Health/Wellness blue used only in the before half so the two worlds are colour-separated at a glance. Nothing in the piece counts label lines, flips the carton over, or shows anyone's morning going well.",
    script:[
      {t:"0:00-0:03", vo:"you're allowed to not reset anything.", onScreen:"you're allowed to not reset anything."},
      {t:"0:03-0:07", vo:"the printed tracker. four matching jars. the alarm moved earlier. a whole new personality, ordered online.", onScreen:"BEFORE — the september overhaul"},
      {t:"0:07-0:10", vo:"it's a lot to ask of a month.", onScreen:"(a lot to ask of a month)"},
      {t:"0:10-0:14", vo:"here's the one thing that actually stayed.", onScreen:"AFTER — one glass"},
      {t:"0:14-0:19", vo:"Willa's Original. four ingredients — and the numbers come with it. protein, prebiotic fiber, the kind that feeds your gut, one gram of sugar.", onScreen:"4g+ protein · 2g+ prebiotic fiber · 1g sugar · 4 ingredients"},
      {t:"0:19-0:22", vo:"poured over the same bowl you were eating in july. that's the whole plan.", onScreen:"the reset didn't survive. the pour did."},
      {t:"0:22-0:25", vo:"no reset required.", onScreen:"no reset required.  ·  Four ingredients. (Read 'em.)"}
    ],
    audio:"No trending sound and no licensed track — original audio, and this is a deliberate exception the brief should be flagged for if anyone tries to attach a trend audio, because the piece argues against performance and a borrowed sound performs. The two halves are separated by SOUND as much as by grade. Before half: a tight, dry, slightly mechanical bed built entirely from real foley recorded on the day — the printer feed, the label-maker click, four jars set down on stone, the notebook spine cracking, the alarm tone set and dismissed. Cut those hits hard on the beat so the first ten seconds have the metronomic tick of a productivity ad; no music underneath, the foley IS the rhythm. Then at 0:07 pull everything to near-silence for the held tracker shot — three seconds of room tone and a refrigerator hum is the single most important audio decision in the brief, and scoring over it kills the joke. After the cut at 0:10 the room changes: open, warm, a little ambient street or birdsong bleeding through a window, and the pour close-miked separately on the counter so the glug and the settle are the loudest thing in the piece. Voiceover is one dry, unhurried person reading short lines at conversational volume, recorded in a quiet room and sat slightly under the room tone so it lands as a thought rather than an announcement — not framed as the founder, no talent on camera. Delivery is permission, not instruction: warm, a half-beat slower than feels right, zero pitch energy, and never knowing or smug about the before half — the person who bought the four jars is watching this. Optional music: at most a single sparse acoustic instrument entering after 0:14 and sitting far under the read, stopping flat on the end card with no swell and no button. NO music from any artist, catalogue, film or television moment currently in the news, and no soundtrack reference of any kind (see the CP-6 internal note). No sting, no bass drop, no sped-up edit.",
    duration:"0:25",
    cta:{soft:"send this to whoever printed the tracker.", medium:"pour Willa's Original — four ingredients, and no plan attached.", strong:"look for Willa's Original in the refrigerated plant-milk set: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar. one swap, no reset."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"AUG31-TT-2",
    platform:"TikTok",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Wed Sep 2 · 7pm",
    priority:"HIGH",
    concept:"\"eight of these take a plan. one of them just takes a carton.\" — the september grid, unrevealed",
    intel:[
      {type:"TREND", text:"T-4 (consumer survey published Aug 28, 2026): asked what adults most want to reset heading into September, 27% said home organization, 23% exercise and fitness, 21% eating habits, 15% sleep, 15% finances, 10% work, 7% social life — and 45% said September feels no more motivating to them than January, against only 26% who said it does. The skeptic half is nearly twice the size of the believer half, which is the entire licence for this brief: a joke about elaborate September plans is only affordable because most of the audience has already quietly opted out of them, so it reads as company rather than mockery. It also sets the audience — grown adults rebuilding a weekday, not a family getting kids out the door. INTERNAL ONLY: no percentage, no survey, no 'studies show', no 'most people' framing and no reference to research reaches the caption, any overlay, the pinned comment or any caption variant. The data decides the posture; it is never the content."},
      {type:"PULSE", text:"CP-1 (documented Aug 26, 2026): the spot-the-mismatch grid is live and running as one of the platform's top formats — post a run of visually near-identical images, hide one deliberate outlier inside the run, and let viewers race to find it before any reveal. Coverage flags it as unusually brand-ready precisely because it needs no dialogue, no audio, no on-camera talent and no script; the comment section supplies the engagement by arguing, and the structural payoff is that whatever is different becomes the thing everyone reads closely. This is the required fresh meme format for the week and this brief owns it. Two mechanics are load-bearing and must not be softened in production: (1) the run has to be genuinely near-identical in treatment or there is no puzzle, and (2) THE VIDEO NEVER REVEALS THE ANSWER — the reveal lands as a pinned comment on Thu Sep 3, which is what converts a 14-second post into a two-day comment thread. INTERNAL ONLY: never name the format, never say 'trend', never reference the platform report on screen or in copy. Format is a shooting instruction, not a subject. NOTE ON THE PULSE PLAY AS WRITTEN: CP-1's willasPlay sketches this as nine cartons with long ingredient decks and one with four lines. That version is dead — the count-the-lines / flip-the-carton shape is heavily worn (AUG 17, AUG 03, JUL 20, JUL 13) and rested as a headline. This is a ROUTINES grid, not a shelf grid. No competing cartons, no ingredient decks, no label-line counting anywhere in the piece."},
      {type:"COMPETITOR", text:"C-1 (reported Aug 28, 2026): the category leader began printing a climate-advocacy argument across every carton it produces, converting its packaging into a global owned-media surface — an eleven-word block against an eighty-nine-word block, politics rendered at scale on a pack whose own ingredient deck runs twelve lines. Read strictly as posture calibration for this brief: the loudest available move in the category right now is to argue harder on more surfaces, which is exactly the register this post declines. Willa's answer here is nine silent squares and a question, and then nothing — no argument, no counter, no explainer card, no reveal. Restraint is the differentiator, and it only works if production resists the urge to add a claim card at the end. INTERNAL ONLY: no brand name, no packaging reference, no climate framing, no 'while others shout' commentary and no comparative posture reaches any consumer surface. This brief is not linked to C-1 as an anchor (links.comps is empty by spec); it is calibration for the read only."},
      {type:"AUDIENCE", text:"The person this reaches on Wed Sep 2 is an adult with no school run in their life who has watched the same September play out a dozen times: the tray gets filled, the grid gets printed, the alarm moves, and by the second week of October one thing out of the eleven is still standing. She does not need to be told that. She needs to be recognised for already knowing it — which is why the post makes no argument, asks one question, and leaves. The persuasion is entirely structural: the odd square is the only warm frame in a cold grid, so it wins on the eye before it wins on the copy, and the only thing the audience is asked to do is have an opinion. INTERNAL ONLY: no shopper-psychology language, no 'in a world where', no voice direction and absolutely no superiority. The line the whole piece walks is that nobody's routine is the butt of the joke — the routines in the grid are aspirational and real, they are just outnumbered by October. If a single square reads as ridicule, recast it. Register reference for the edit only: better-for-you brands that make a wellness point cheeky and warm rather than earnest, and comment-engine restraint — confident enough to post a puzzle and shut up."}
    ],
    hooks:[
      {text:"one of these nine is still happening in october.", recommended:true},
      {text:"eight of these are a plan. one of them is a tuesday.", recommended:false},
      {text:"one of these nine you already know how to do.", recommended:false}
    ],
    caption:"Eight of these take a plan. One of them just takes a carton. 🌾\n\nnine squares, one answer, and we're not saying which one. that's what the comments are for — we'll pin it Thu Sep 3, once enough of you have argued about it.\n\nthe only clue we'll give: the one that's still going in October is the one with the fewest moving parts. Willa's Original is organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein and 2g+ prebiotic fiber per cup, because we use the entire oat groat — bran, germ and all.\n\nno tracker, no 5am, no sixteen-step morning. one pour, and you already know how to do it.\n\nand to be clear, none of this is a knock on anybody's routine. build the whole system if it's making you happy. we just kept an eye on which square was still going in October.\n\nfour ingredients. read 'em.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#septemberreset",
      "#spotthedifference",
      "#findthedifference",
      "#simpleingredients",
      "#morningroutine",
      "#plantmilk",
      "#realfood"
    ],
    visual:"Vertical 9:16, no camera moves worth the name and no talent anywhere in it — this is a built grid, not a shoot day, and the entire piece is nine still photographs, one animated assembly, and two type cards. THE GRID IS THE BRIEF: a 3x3 of nine square photographs, eight of them September resets and the ninth a bowl of oats and a poured glass. The puzzle only works if the eight cold squares are near-identical in TREATMENT, so shoot all eight in one session under one setup and change nothing between them: dead-overhead camera on a C-stand, 35–50mm full-frame equivalent, every object on one plane so nothing goes soft, the same seamless off-white surface under all eight, the same flat overcast-daylight key from camera left with a bounce card on the right killing every shadow, and the same square crop with the same amount of air around the subject. Grade the eight cool — 5600–6000K, slightly desaturated, clinical, catalogue-flat. Nothing in those eight frames may be warm, and nothing in them may be food. THE EIGHT COLD SQUARES, one object story each, centred, symmetrical, obsessively tidy: (1) a bedside alarm clock reading 5:00 with a phone face-down beside it; (2) a seven-day segmented supplement tray, lid open, every compartment empty and waiting; (3) a printed habit grid on paper with a fresh pen laid diagonally across it and not one box ticked; (4) an ice bath shot straight down — a tub of water, cubes floating, a thermometer bobbing at the edge; (5) a brand-new time-marked water bottle standing dead centre with the hang-tag still on the neck; (6) a straight line of sixteen small identical jars and droppers, evenly spaced, ruler-straight; (7) five identical empty glass meal-prep containers stacked with their lids fanned beside them and blank labels ready; (8) a new planner open flat to a September page, a numbered list already filled in. Every square must be plausible and aspirational — these are real things real adults are doing on Sep 1 and the grid is not making fun of any of them. THE NINTH SQUARE, and it is the only one that gets to feel like a room somebody lives in: a wide shallow bowl of cooked oats with fruit on top and a spoon already in it, sitting slightly off-centre on a pale wooden counter, a short glass of Willa's Original poured beside it and the Original carton standing label-forward just inside the frame edge. Shoot this one alone, on a different day if you like, in real late-morning window light from camera left at 3200–4000K, with a real shadow under the bowl, a crumb or two on the wood and the glass showing a fingerprint. It must be measurably WARMER and less symmetrical than the other eight — that temperature break is what makes the puzzle findable in about four seconds instead of never, and it is why this square wins on the eye before it wins on the copy. PLACEMENT: the ninth square sits at bottom-left of the 3x3 — position seven — never centre, never a corner the thumb rests on. Lock that placement before the pinned comment is written, because the pin names the position. ASSEMBLY AND MOTION: the piece opens with the complete nine already on screen, dropping in as one block on the first frame with no build, no wipe, no card-by-card reveal, then holds rock-still. The only movement in the entire fourteen seconds is one very slow scale-up of the whole grid, roughly 100% to 106% across the middle beats, so the frame breathes without ever pointing at anything. NEVER punch in on a square, never highlight one, never add a circle, arrow, magnifier, glow, pulse or wiggle on any tile. Any emphasis on any square is a spoiler and kills the post. TYPE: hook line drops on frame one, set navy #202A44 on a soft cream #FAFAF7 rounded plate across the top third, sentence case, one or two lines, never more — 'one of these nine is still happening in october.' It holds for three seconds and then leaves. Mid-piece a second plate takes the same position with the question: 'which one? comment your square.' Purple #A191B2 is the accent colour and it appears exactly twice in the whole piece — as the thin rule under each plate — and never as body type and never on a tile. PALETTE overall is three: cream, navy ink, one purple rule, plus whatever colour lives in the photographs. END CARD is a plain cream #FAFAF7 card, navy type, no motion, no whoosh, no sting — the BS-2 stinger set small and centred, 'four ingredients. read 'em.' — held 1.5 seconds with the Willa's wordmark bottom-centre, then out. That card carries NO ingredient list, no counting animation, no numbers ticking up, no checklist and no product shot; it is a sign-off, not a payoff, and it lands only after the question has already been asked. THE ANSWER IS NEVER ON SCREEN. No title card, no final reveal frame, no 'it was number seven', no text at the end that resolves anything. The reveal is a pinned comment posted Thu Sep 3, drafted now so the team isn't writing it live: 'bottom left. oats, water, vanilla, salt. it's the one that doesn't need a monday. 🌾' — and if the grid gets reshuffled in production, the pin gets rewritten to match. HARD EXCLUSIONS, check the props table before the first frame is shot: no competing cartons, bottles, packaging, logos or wordmarks in any square, including out of focus at an edge — every label that isn't Willa's is peeled, turned away or cropped out; no ingredient deck, no nutrition label, no back-of-pack anything, and nothing in the piece that counts label lines or invites anyone to; no bodies, no faces, no hands, no mirrors, no bathroom scale, no measuring tape, no before-and-after imagery of any kind, no gym clothes, no wearable on a wrist, no calorie or macro app on a screen; no legible handwriting anywhere — the planner list and the habit grid are shot with deliberately illegible loops so that no word on paper can be read as a diet, a restriction or a target; no pill bottle, no injector pen, no pharmacy bag, no clinical white lab surface; no backpacks, no lunchboxes, no classroom, no school reference of any kind; no pumpkins, no gourds, no autumn leaves, no seasonal props, no orange anywhere; no team colours, jerseys, pennants, mascots or broadcast in frame; no dairy in the oats square — no butter, no yogurt, no cream, no milk jug; no price tag, shelf-edge label, receipt, coupon or cost math anywhere. If a prop could be read as medical, as a diet tool, or as a judgement of the person who owns it, it does not enter the frame. COVERAGE: shoot each of the eight cold squares three ways — dead-centre, one stop brighter and one stop cooler — so the grid can be tuned to a single visual temperature in the edit, and shoot the oats square six times across a twenty-minute window as the window light moves so the team can pick the warmest one that still reads as the same photo family.",
    script:[
      {t:"0:00-0:03", vo:"(no voiceover anywhere in this piece — sound is one continuous low kitchen room tone, fridge hum, laid under the whole fourteen seconds)", onScreen:"[FULL 3x3 GRID DROPS IN COMPLETE ON FRAME ONE — nine squares, no build] navy on cream plate, top third: 'one of these nine is still happening in october.'"},
      {t:"0:03-0:06", vo:"(room tone continues, unbroken — no music, no sting, no beat marker)", onScreen:"[hook plate lifts off; grid alone, dead still, beginning a slow 100%→103% scale of the WHOLE grid — no punch-in on any tile, no highlight] no type on screen"},
      {t:"0:06-0:09", vo:"(room tone; a single spoon set down on wood, once, quietly, around 0:07 — the only sound event in the piece)", onScreen:"[grid continues its slow breathe to ~105%, still no emphasis anywhere] no type on screen"},
      {t:"0:09-0:12", vo:"(room tone, unchanged)", onScreen:"[grid settles at ~106% and locks] navy on cream plate, same top-third position, thin purple rule beneath: 'which one? comment your square.'"},
      {t:"0:12-0:14", vo:"(room tone cuts clean to silence on the card — no whoosh, no logo sting)", onScreen:"[HARD CUT to a plain cream card, no product, no grid, no list] navy centred, small: 'four ingredients. read 'em.' — Willa's wordmark bottom-centre. NO ANSWER. NO REVEAL. The answer is pinned in the comments Thu Sep 3."}
    ],
    audio:"No trending sound, no music, no voiceover, no talent — this format's entire advantage is that it needs none of them, and adding any one of them turns a puzzle into an ad. The bed is a single continuous low kitchen room tone: a fridge hum recorded flat in a real kitchen, laid under all fourteen seconds at a level you notice only when it stops. Record one clean 30-second pass so the editor has room to trim. One sound event and one only — a spoon set down on wood, once, around 0:07 — recorded separately and dropped in quiet; it exists so the platform has something to hold and so the silence reads as deliberate rather than as a broken upload. Cut the room tone dead on the final cream card so the last second and a half is true silence. Do NOT add a trending audio, a lo-fi bed, a beat that the grid scales to, a riser under the question card, a whoosh on the end card, or a rhythmic tick when the grid drops in — every one of those tells the viewer where to look, and where to look is the one thing this post is withholding. Do not let the platform auto-attach a suggested sound on upload; check it before it goes live Wed Sep 2.",
    duration:"0:14",
    cta:{soft:"save this and come back when you've picked your square.", medium:"comment your square — the answer gets pinned Thu Sep 3.", strong:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber per cup. the square that never needed a plan."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"AUG31-TT-3",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Thu Sep 3 · 9am",
    priority:"HIGH",
    concept:"\"the honest answer is boring. we like it that way.\" — the calm testing answer",
    intel:[
      {type:"PULSE", text:"CP-5 (dated Aug 28, 2026): a survey of plant-based products for fungal toxins travelled as an alarming headline with its single most important clause amputated — every measured level sat under guideline limits, and this class of compound is ubiquitous across agricultural crops, which is exactly why grain supply chains get tested lot by lot in the first place. Compression into \"your oat milk has mold in it\" is the predictable next step. INTERNAL ONLY AND ABSOLUTE: the scare statistic does not appear anywhere in this brief's consumer surfaces — not the sample count, not the toxin count, not the percentages. The study is not named, the country is not named, the publication is not named, and no tested product category is named. Nothing in the script, the overlays, the caption or any caption variant may state or imply that other plant milks are contaminated — the thing being corrected is the panic, not a competitor. No \"they don't want you to know,\" no \"the headline you saw,\" no stitched screenshot, no red arrow, no alarm sound. The rebuttal works by never repeating the scare: the video answers the question underneath the fear (who tests this, how often, what does the certificate actually say) and lets the calm be the argument. If a line here only makes sense to someone who read the headline, cut it — this has to play to a viewer who saw nothing at all."},
      {type:"TREND", text:"T-1: certification is the week's whole story — what moved the needle in two separate regulatory actions was a third-party lab result rather than a claim printed on a package, which is the exact evidentiary standard Willa's already meets. That is the strategic reason this brief exists and the reason it leads with the test. LANE DISCIPLINE, NON-NEGOTIABLE: AUG31-TT-1 owns the news that made testing the standard — the federal file, the docket, the comment window, the state action, the oil claim, the lab analysis. THIS brief never mentions a government file, an agency, a court, a state, an investigation, a comment period, or any other ingredient category. TT-3 owns the reassurance and nothing else: what routine testing means for one person holding one carton. If a line in this brief could sit inside TT-1, cut it. Willa's verified certification stack for consumer copy: USDA Organic, Non-GMO Project Verified, Certified Glyphosate Residue Free (The Detox Project), tested every lot. Do NOT ship any scope claim — not \"the only oat milk certified,\" not \"the only one that paid for the test.\" Other brands in the category hold the same glyphosate certification and the claim would be false."},
      {type:"AUDIENCE", text:"The person this is for already bought the carton. She is not deciding between brands, she is deciding whether to keep pouring — and the feeling she is carrying is low-grade, unresolved doubt she cannot check herself, because the answer to \"is this actually fine\" appears to require a science degree she does not have. What relieves that is not a bigger claim; it is a short, dateable, checkable answer delivered by a person who is unbothered. Hence the shape: an ambassador with a nutrition credential, in a real kitchen, holding the product, answering three plain questions in one steady take and then stopping. The authority comes from brevity and from the fact that the checking is done by someone outside the company. INTERNAL ONLY: no shopper-psychology language, no \"in a world of misinformation\" framing, no mention of anxiety, worry, fear or panic in any consumer surface — naming the emotion re-installs it. The register is executed, never described. Muse reference for the edit only: Lovebird — activist inside a parenting lane with zero fearmongering beats."},
      {type:"COMPETITOR", text:"C-1 (Aug 28, 2026): the category leader converted its packaging into an advocacy billboard at global scale — a long argument printed on a pack whose ingredient deck runs twelve lines. Read for this brief as posture calibration only: the loudest surface in the category is now rhetoric, which makes the quietest available move — four provable lines and an outside verifier — the differentiated one. It is why this brief argues nothing, raises no voice and ends early. INTERNAL ONLY: no brand name, no packaging reference, no line count comparison, no \"some brands print speeches\" swipe, and no competitor carton, logo or wordmark legible in any frame. Category critique is not the job here; the job is a calm answer."}
    ],
    hooks:[
      {text:"four ingredients, and somebody who doesn't work here checks them. that's the whole answer.", recommended:true},
      {text:"three questions a dietitian actually gets about oat milk — answered before your coffee's done.", recommended:false},
      {text:"you shouldn't need a science degree to feel good about pouring something. here's the short version.", recommended:false}
    ],
    caption:"Willa's Original is USDA Organic, Non-GMO Project Verified, and certified glyphosate residue free by The Detox Project — an independent lab does that testing, not us. 🌾\n\norganic whole grain oats, filtered water, organic vanilla extract, sea salt. four lines, and every one of them is something an outside lab can go check. that's the entire point of a certification: we don't get to grade our own homework.\n\nso when the internet gets loud about what's in food, the answer here doesn't move and it doesn't take a paragraph. who tests it — an independent lab. how often — every lot. what the certificate says — organic, non-GMO, glyphosate residue free, with a date on it that has to be re-earned.\n\nthe honest answer is boring. we like it that way.\n\n4g+ protein. 2g+ prebiotic fiber. 1g of sugar. and a short enough list that checking it is a reasonable thing to ask.\n\ncertified glyphosate-free. because that matters.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#glyphosatefree",
      "#dietitian",
      "#dietitianapproved",
      "#cleaningredients",
      "#plantmilk",
      "#fouringredients",
      "#realfood"
    ],
    visual:"One person, one kitchen, one steady take — and the restraint is the creative idea, so everything below is written to remove options rather than add them. TALENT: a registered-dietitian ambassador, mid-thirties to forties, in her own home kitchen and her own clothes. This is the People-on-Camera substitute for this brief and it is explicit — NOT Christina, NOT the cofounder-sister, NOT a hired actor. No lab coat, no clipboard, no scrubs, no branded tee; a clinical costume would turn a calm answer into a warning. She is not performing a rebuttal, she is answering a question a friend asked her at the counter. CAMERA: vertical 9:16 on a phone, locked on a small tripod at chest height, one continuous take from first frame to last — no punch-ins, no reframes, no jump cuts, no zoom, no B-roll inserts. Shoot the whole thing eight or nine times and cut the calmest read, not the sharpest one; a flubbed word left in is better than an edit that adds urgency. Frame her at mid-chest with the counter visible and roughly a third of frame as clean negative space to her left, which is where every overlay lives. LIGHT: real morning window light from camera-left, curtains open, overheads OFF. Grade warm and bright with soft shadows — daylight-balanced, no cool clinical white, no vignette, no film-grain filter. If the day is grey, bounce a white foam board back into her face rather than adding a lamp; the honesty of the room is the credibility. PRODUCT: one carton of Willa's Original in her hand or on the counter beside her, label forward, in frame for the entire runtime. She holds it the way a person holds their own groceries — no hero tilt, no rotation, no flip to the back, no finger tracing lines, no counting on camera. A clear glass, empty at the top of the piece and poured at the end, sits to her right. PALETTE: cream #FAFAF7 and navy ink #202A44 for all type, with Health-pillar blue #73B2C9 reserved for the three answer ticks and used nowhere else. Wardrobe and props stay neutral — no primary colours competing in frame. OVERLAYS: soft cream rounded plates, navy type, left-aligned in that negative space, fading in and holding — never sliding, popping, shaking or bouncing. Exactly one overlay on screen at a time, three short lines maximum, and the three answers tick in as blue-tagged lines she has already said out loud. HARD PROHIBITIONS, all of them load-bearing: no chyron or lower-third news bar, no red arrows, circles, underlines or highlight scribbles, no stitched or screen-recorded headline, no screenshot of any article or comment, no phone held up to camera, no split screen, no green screen, no cutaway to a document, no on-screen question marks, no siren, no zoom-punch on a word, no caps-lock overlay, no countdown, no bold-red anything. If a frame would look at home in a scare edit, it is wrong. END CARD: plain cream #FAFAF7 card, navy type, no motion and no sound sting — 'certified glyphosate-free. because that matters.' — held 1.5 seconds with the Willa's wordmark bottom-centre. The last thing before it is her pouring the glass and setting the carton down, which is the actual argument: nothing here needs to be defended, it just needs to be poured.",
    script:[
      {t:"0:00-0:05", vo:"four ingredients, and somebody who doesn't work here checks them. that's the whole answer, but people ask me three questions, so —", onScreen:"four ingredients. checked by somebody who doesn't work here."},
      {t:"0:05-0:11", vo:"first one: who actually tests it? not the brand. an independent lab — that's what a certification is. an outside party checks and signs it.", onScreen:"1. who tests it? — an independent lab, not us"},
      {t:"0:11-0:17", vo:"second: how often? every lot. not once at launch, not once a year. every lot that gets made.", onScreen:"2. how often? — every lot"},
      {t:"0:17-0:24", vo:"third: what does the certificate actually say? USDA Organic. Non-GMO Project Verified. certified glyphosate residue free. and it's got a date on it, so it has to be re-earned.", onScreen:"3. what does it say? — organic · non-GMO · glyphosate residue free"},
      {t:"0:24-0:29", vo:"organic whole grain oats, filtered water, organic vanilla extract, sea salt. the honest answer is boring. that's kind of the point.", onScreen:"the honest answer is boring."},
      {t:"0:29-0:32", vo:"4 grams of protein, 2 grams of prebiotic fiber — the fiber that feeds your gut. anyway. that's it.", onScreen:"4g+ protein · 2g+ prebiotic fiber"},
      {t:"0:32-0:34", vo:"certified glyphosate-free. because that matters.", onScreen:"certified glyphosate-free. because that matters."}
    ],
    audio:"No trending sound and no music bed of any kind — this is the one brief in the slate where scoring it would break it. The only audio is her live voice and the room: window traffic, the fridge, the carton set down on the counter, the pour at the end. Record on a lav or a phone mic close enough that she never raises her voice; the whole performance note is conversational volume, the pace of somebody answering a friend, with a natural half-second breath between each of the three answers. Direct her explicitly NOT to sound like she is correcting anyone — no rising inflection, no 'so let's talk about', no 'actually', no lean-in to camera. If a take sounds like a rebuttal, it is the wrong take. Close-mic the pour separately so the glug is the loudest thing in the piece, which is the intended joke: the most dramatic sound in a video about testing is oat milk hitting a glass. No sting, no whoosh, no riser, no bass drop, no sped-up edit, no voice-of-god narration layered over her. Editor's note: leave the last full second of room tone after 'that's it' before the end card — the pause is the posture.",
    duration:"0:34",
    cta:{soft:"save this for the next time somebody asks you who checks this stuff.", medium:"pour Willa's Original — four ingredients, organic, and tested every lot.", strong:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. USDA Organic, Non-GMO Project Verified, certified glyphosate residue free by The Detox Project, tested every lot. 4g+ protein, 2g+ prebiotic fiber, 1g sugar."},
    benefitShorthandId:"BS-11"
  },
  {
    id:"AUG31-IG-R2",
    platform:"IG Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Chocolate",
    dnaPattern:"on-pack-checklist",
    timing:"Thu Sep 3 · 12pm",
    priority:"HIGH",
    concept:"\"six ingredients — and yes, we're counting the salt.\" — the Chocolate pour, typed",
    intel:[
      {type:"TREND", text:"T-9 (published in-window): two separate studies stretched the timeline on non-nutritive sweeteners in the same seven days. In the first, mice fed sucralose or stevia showed altered gut microbiomes, reduced beneficial short-chain fatty acids and changed metabolism- and inflammation-related gene activity — with elevated fasting blood sugar still showing up in a SECOND generation of descendants. In the second, more than 64,000 Britons born 1951-1956 were studied against the wartime sugar rationing that ended in Sept 1953; those with the least sugar exposure from conception to roughly age two showed substantially lower rates of several cancers decades later. The read for Willa's is not a number and not a warning — it is that a formulation choice stays on the books a very long time, and Willa's Chocolate simply never made the swap: real cacao doing the flavour, organic coconut sugar doing the sweetening, and no sucralose, stevia, monk fruit or sugar alcohol in the recipe to have a long-term story at all. T-6 sits underneath as the shelf context — a national plant-protein drink line landed Aug 24-25 needing two sweeteners (stevia leaf extract, monk fruit extract) to make its front-of-pack number drinkable, which is exactly the chilled set Willa's Chocolate sits in. INTERNAL ONLY AND ABSOLUTE: neither study, neither research finding, no mouse, no cohort, no sweetener name, no competitor and no drink brand may appear in the script, any overlay, the caption or any caption variant. This brief NAMES WHAT IS IN THE GLASS and never what is missing from someone else's. Do NOT argue the sugar number, do NOT compare gram counts, do NOT touch added-sugar labelling or any sweetener litigation — the sugar-claim lane ran Aug 24 and is rested. The studies are why this brief exists this week; they are not its subject."},
      {type:"AUDIENCE", text:"The person this reaches at midday on Thu Sep 3 is not shopping for a health product — she is deciding whether the chocolate thing in her fridge is allowed to be the chocolate thing in her fridge. Chocolate is the indulgent-remade-clean lane and nothing else; the moment this brief starts arguing nutrition it stops being a treat and becomes homework, and she already has enough of that. So the persuasion is entirely sensory-plus-legible: a cacao-dark pour that looks genuinely good, and six words she recognises typed one at a time while it fills. She is not being asked to evaluate anything. She is being handed the whole list in the time it takes to pour a glass, and the confidence of a list that just stops is the argument. INTERNAL ONLY: no shopper-psychology framing, no 'in a world where,' no permission-granting language and no voice direction reaches any consumer surface. Register reference for the edit only: design-led ingredient-first wit — an ingredient list treated as a zine cover, dry and confident, never smug, never explaining the joke."},
      {type:"COMPETITOR", text:"C-1 (in-window): the category leader began printing a climate-advocacy message across every carton it produces — an '11 words / 89 words' layout arguing a political position on the package itself. Read purely as posture calibration for this brief: their packaging argues by being loud; Willa's packaging argues by being readable. That is the entire reason this piece is typography-led and says nothing beyond what is physically in the glass — the flex is that the whole list fits on screen and then ends. INTERNAL ONLY: no brand name, no carton reference, no climate framing, no 'unlike some cartons' construction and no meta-commentary about packaging reaches any consumer surface. Nothing in this brief may read as a response to anyone. A separate note for the edit: no competitor carton, cap, sleeve or wordmark may be legible in any frame — this is a single-product beauty piece, so nothing else belongs on the counter."},
      {type:"TREND", text:"ACCURACY CORRECTION — This brief's T-6 shelf-context line originally claimed Beyond Immerse (the Aug 24-25, 2026 Beyond Meat plant-protein drink at Erewhon) uses three sweeteners \"agave, stevia leaf, monk fruit.\" Verified ingredient list (Beyond Meat / retailer listings, checked Sep 2, 2026): Carbonated Water, Hydrolyzed Pea Protein, Soluble Tapioca Fiber, Natural Flavors, Stevia Leaf Extract, Ascorbic Acid, Monk Fruit Extract, Mango Juice Concentrate, Citric Acid, Vegetable Juice Color — TWO sweeteners (stevia leaf extract, monk fruit extract), no agave. Corrected in this brief's intel[0] text. The same \"agave, stevia leaf, monk fruit\" phrase also appears in spine.json's T-6 trend entry and in brief AUG31-PIN-3.json — both need the same fix propagated so the error doesn't ship on a different card this week."},
      {type:"TREND", text:"ACCURACY CORRECTION — This brief's hook, caption, script, hashtags and CTA originally described Willa's Chocolate as a \"five ingredient\" product (filtered water, organic whole grain oats, organic coconut sugar, organic cacao powder, sea salt). Verified against willaskitchen.com/products/chocolate directly (checked Sep 2, 2026), corroborated by independent retailer listings for the Willa's Chocolate line: the actual on-pack deck is SIX ingredients — it also contains organic vanilla extract (filtered water, organic whole grain oats, organic coconut sugar, organic cacao powder, organic vanilla extract, sea salt). Nutrition figures (5g protein, 3g fiber, 11g sugar) matched CLAUDE.md exactly, confirming this is the correct current SKU page — only the ingredient count/list was stale. Rewritten every field in this brief from five to six ingredients and added organic vanilla extract to every list. CLAUDE.md's Flavor Database entry for Chocolate needs the same correction (it's missing organic vanilla extract), and two other AUG31 briefs — AUG31-IG-R5.json and AUG31-PIN-2.json — are also flavor:\"Chocolate\" and should be checked for the same \"five ingredients\" claim before ship."}
    ],
    hooks:[
      {text:"it's a treat. it's also six ingredients.", recommended:true},
      {text:"real cacao doing the flavour. a real sugar doing the sweetening. that's the glass.", recommended:false},
      {text:"the whole ingredient list fits on one glass — watch it fill.", recommended:false}
    ],
    caption:"Chocolate milk that tastes like chocolate milk. 🍫\n\nreal cacao doing the flavour, organic coconut sugar doing the sweetening, and the other four are filtered water, organic whole grain oats, organic vanilla extract and sea salt. that is the entire ingredient list for Willa's Chocolate — top to bottom, nothing under it.\n\nit's a treat and we build it like one. the cacao is cacao, powder pressed from the bean, not a chocolate flavouring — which is why it drinks like a glass of chocolate milk and not like a chocolate-flavoured drink. it took Best Beverage at the Good Food Awards, which is a lot of fuss for something with six things in it.\n\nover ice, after school, at four in the afternoon on a Thursday. that's the job.\n\nsix ingredients — and yes, we're counting the salt.",
    hashtags:[
      "#willas",
      "#willaschocolate",
      "#chocolatemilk",
      "#oatmilk",
      "#organicoatmilk",
      "#realcacao",
      "#sixingredients",
      "#dairyfreechocolate",
      "#cleaningredients",
      "#realfood"
    ],
    visual:"A single-product beauty piece shot on one clean kitchen counter — no store, no talent, no set dressing beyond the glass and the carton. Pale wood or warm-white stone counter, morning-into-midday window light from camera-left, one soft bounce card camera-right so the cacao reads dark-glossy rather than muddy. Grade slightly warm; Chocolate should look like cocoa and cream, never like grey-brown paint. Shoot vertical 9:16, camera locked on a tripod at glass height — the only movement in the entire piece is the liquid, which is exactly why the typography can carry the joke. FRAME ONE: a tall clear glass, three-quarters full of clean cracked ice, empty, dead centre, with the whole hook set in navy #202A44 on a soft cream #FAFAF7 rounded plate across the upper third — 'it's a treat. it's also six ingredients.' Hold it steady for a full beat before anything pours; the stillness is the confidence. THE POUR: one unbroken pour of Willa's Chocolate from just above the rim, slow enough to see the stream stay opaque all the way down and the colour bloom around the ice rather than streak past it. Do not cut the pour. This is the shot the whole brief rests on — shoot 10+ takes, keep the calmest hand and the fullest stream, and pick the one where the surface settles glossy instead of foamy. THE TYPE: as the glass fills, the six ingredients type in one at a time, left-aligned in the lower third, stacked in Ingredients-pillar green #75C596, one line per beat, each one holding while the next arrives so the list visibly builds and the viewer can read all six at once by the end — 'filtered water' / 'organic whole grain oats' / 'organic coconut sugar' / 'organic cacao powder' / 'organic vanilla extract' / 'sea salt'. Set them small and confident, generous letter-spacing, no boxes, no icons, no checkmarks, no ticking sound — this is a printed list, not a scorecard. CRITICAL: the list must visibly STOP. Leave a full held beat after 'sea salt' with all six on screen and nothing arriving, because the ending is the joke. THE CARTON: after the list completes, the Willa's Chocolate carton slides into the right of frame beside the full glass, label forward, set down by hand and released — no rotation, no hero tilt, no flip to the back, no finger tracing anything. One navy line ticks in under it: 'Good Food Awards · Best Beverage.' END CARD: plain cream #FAFAF7, navy type, static, no motion, no sting — 'six ingredients — and yes, we're counting the salt.' — held a beat and a half with the Willa's wordmark bottom-centre. Palette across the entire piece is four: cream, navy ink, one green, and the cacao-dark of the drink itself. NOTHING ELSE ON THE COUNTER — no props, no cocoa dusting, no chocolate shavings, no cookies, no straw, no dessert styling, no other cartons or bottles in or near frame. No numbers anywhere on screen except the word 'six' in the end card. No nutrition figures, no gram counts, no comparison graphics, no crossed-out ingredients, no red X's, no 'what's not in it' construction of any kind. No talent, no hands beyond the pour and the single carton placement, no face, no founder.",
    script:[
      {t:"0:00-0:03", vo:"chocolate milk. and the whole list of what's in it.", onScreen:"it's a treat. it's also six ingredients."},
      {t:"0:03-0:06", vo:"filtered water.", onScreen:"filtered water"},
      {t:"0:06-0:09", vo:"organic whole grain oats.", onScreen:"organic whole grain oats"},
      {t:"0:09-0:12", vo:"organic coconut sugar. organic cacao powder.", onScreen:"organic coconut sugar → organic cacao powder"},
      {t:"0:12-0:15", vo:"organic vanilla extract. sea salt.", onScreen:"organic vanilla extract → sea salt"},
      {t:"0:15-0:18", vo:"real cacao, pressed from the bean. it took Best Beverage at the Good Food Awards.", onScreen:"Good Food Awards · Best Beverage"},
      {t:"0:18-0:21", vo:"six ingredients. and yes, we're counting the salt.", onScreen:"six ingredients — and yes, we're counting the salt."}
    ],
    audio:"No trending sound. Original audio, built around the pour. Close-mic the pour separately on the counter and let it be the loudest thing in the piece — the glug, the ice shifting, the surface settling. Under it, one warm unhurried instrumental bed at low volume: brushed drums, upright bass, a little room tone, nothing with a drop and nothing with a vocal. Voiceover is a single dry, unhurried read at conversational volume, recorded separately in a quiet room and mixed slightly under the bed so it sounds like a person naming things rather than an announcer selling them — not framed as the founder, no talent on camera. The six ingredient lines are read FLAT and evenly paced, one per beat, with no lift on any of them; the flatness is what makes the last line land. Editor's note: leave a full silent beat after 'sea salt' with all six lines on screen and nothing happening — that pause IS the joke, and any music swell, whoosh, chime or tick over it kills the whole piece. The end card gets no sting either; it lands in the same room tone the rest of the video lives in.",
    duration:"0:21",
    cta:{soft:"save this for the next chocolate craving that shows up at four in the afternoon.", medium:"pour Willa's Chocolate over ice — real cacao, six ingredients, that's the list.", strong:"Willa's Chocolate: filtered water, organic whole grain oats, organic coconut sugar, organic cacao powder, organic vanilla extract, sea salt. Real cacao, not a flavouring. Best Beverage at the Good Food Awards. That's the whole list."},
    benefitShorthandId:"BS-9"
  },
  {
    id:"AUG31-IG-F1",
    platform:"IG Feed",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Multi",
    dnaPattern:"meme-payload",
    timing:"Thu Sep 3 · 6pm",
    priority:"STANDARD",
    concept:"\"nobody has to win september.\" — september posed as a question",
    intel:[
      {type:"TREND", text:"T-4: a consumer survey published Aug 28, 2026 asked adults what they most want to reset heading into September — home organization led, exercise second, eating habits third — and found the skeptic half nearly twice the size of the believer half: 45% say September is no more motivating than January against 26% who say it is. A four-week September wellbeing programme published the same day is built the opposite way from a New Year plan, on consistency rather than intensity. Both point at grown adults rebuilding a weekday, not families getting kids out the door, and both rule out the overhaul pitch. This brief answers by refusing to sell a reset at all: it asks the audience what their September actually looks like and shows Willa's own answer as thirty identical squares. INTERNAL ONLY: no percentage, no survey, no programme, no 'studies show' framing reaches any card, the caption or any caption variant — the data decides the posture and then disappears. Also internal: this is not a New-Year-in-September pitch and must never read as one. LANE DISCIPLINE: AUG31-IG-R1 shares the T-4 anchor and owns September as a CLAIM (the one-swap argument, the reset that didn't survive); AUG31-TT-2 owns September as a JOKE FORMAT. This brief owns September as a QUESTION put to the audience. If a line here could sit on IG-R1, cut it — specifically, nothing about swaps outlasting plans, nothing about trackers or matching jars, and no restatement of IG-R1's pour-versus-plan structure."},
      {type:"PULSE", text:"CP-7 (Aug 27, 2026) plus CP-3 (Aug 31, 2026) — two peer text cards, four days apart, both outperforming produced work. CP-7 is the September calendar card: a question up top, every square filled with the same flat non-answer, no product, no date, no reveal anywhere in it, and a comment section that did a week of speculating for free. CP-3 is the two-item list — a heading, one mundane personal grievance, then the brand's own product as item two, no third line, the structure carrying the joke instead of a punchline bolted onto a claim. This brief runs both: CP-7's calendar as card one, CP-3's two-item shape three times across cards two through four. CRITICAL DIVERGENCE FROM CP-7: the peer version withholds — ours ANSWERS. Every square is filled with Willa's actual answer, which is why this cannot be read as a teaser. INTERNAL ONLY: never name either brand, never reference 'a format going around' or 'what's trending' on any card or in any caption — the templates are build instructions, not the subject. Editor's note: if card one reads as a tease for something coming, the brief has failed its own guardrail and the fix is filling the squares harder, not adding a disclaimer."},
      {type:"AUDIENCE", text:"The adult reading this on the evening of Sep 3, 2026 has been told for a week that September is the real January and that she is supposed to arrive at it as a slightly better person. She is also, per the reset data, more likely to roll her eyes at that than to believe it. The relief on offer here is not a plan — it is being asked a question instead of being sold an overhaul, and seeing that the brand's own answer is thirty boring identical squares. That is the permission: your September is allowed to look like the same fifteen seconds thirty times. The two-item cards then do the persuading sideways, because each one puts a real Willa's spec in the position where a joke's second beat goes, so the spec gets read as wit rather than as a claim. INTERNAL ONLY: no shopper-psychology language, no 'in a world where', no wellness-coach register, and nothing that scolds anyone for having made a plan. Register reference for the designer only: Poppi's comment-engine restraint crossed with Fishwife's two-line deadpan — confident enough to post a calendar and then shut up."},
      {type:"COMPETITOR", text:"C-1: the category leader has begun printing a climate-advocacy message on every carton it produces, turning the package itself into a billboard for a stance. Read for this brief, and it is posture only: the loudest surface in the category is currently being used to argue, which makes an unarguing card unusually distinctive in the same feed. Willa's answer this week is a calendar with nothing to announce on it and three lists whose second lines are just true. Confidence here is measured in what is left off the card. INTERNAL ONLY: no brand name, no carton messaging, no climate positioning and no 'while others shout' commentary reaches any consumer surface — this brief does not comment on the category at all. Note also that this brief carries zero linked competitor signal by design; C-1 is calibration for how quiet to make it, nothing more."},
      {type:"TREND", text:"ACCURACY CORRECTION — This brief's caption (and captionVariants.direct, which duplicates the caption verbatim) originally described the WholePlant process as \"the whole oat groat goes in, whole oat kernels, like steel-cut oats before they're rolled.\" That is a mechanism error: steel-cut oats are never rolled at any stage — steel-cut (chopped) and rolled (steamed + flattened) are two separate, mutually exclusive processing paths from the same raw oat groat, so \"steel-cut oats before they're rolled\" describes a step that does not exist. Verified phrasing per CLAUDE.md's Verified Facts Library: \"Willa's uses the whole oat groat — bran, germ, and all — the same way steel-cut oats do.\" Fixed in this brief's caption and captionVariants.direct to read 'the whole oat groat goes in — bran, germ and all, the same way steel-cut oats do.' The identical incorrect 'before they're rolled' phrase also appears twice in AUG31-TT-4.json this week — propagate the same fix there before ship."}
    ],
    hooks:[
      {text:"what does your september actually look like? ours is the same fifteen seconds, thirty times.", recommended:true},
      {text:"things that should be shorter: the monday meeting, and the ingredient list on most oat milk.", recommended:false},
      {text:"thirty squares, and we filled all thirty with the same boring answer.", recommended:false}
    ],
    caption:"Thirty squares, and the same fifteen seconds in all thirty of them. 🌾\n\nthe September routine here is one line long: Willa's Original, poured. organic whole grain oats, filtered water, organic vanilla extract, sea salt — 4g+ protein, 2g+ prebiotic fiber (the kind that feeds your gut), 1g of sugar.\n\nthings that should be shorter: the Monday meeting, and the ingredient list on most oat milk. things that should stay in: your Sunday plan by Wednesday, and the protein and the fiber the oat came with. most oat milks filter the bran and germ out and process the starch into sugar, and the protein and the fiber leave with it. ours stay — the whole oat groat goes in — bran, germ and all, the same way steel-cut oats do.\n\nnobody has to win September. it's thirty mornings, and most of them are going to look like the one before. that isn't a failure of ambition, that's what a routine is.\n\nso — what does your September actually look like? 👇",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#fouringredients",
      "#thirtysquares",
      "#morningroutine",
      "#plantmilk",
      "#cleaningredients",
      "#realfood"
    ],
    visual:"A five-card static IG Feed carousel built entirely in a layout tool — no shoot, no talent, no styling, no edit, and NO PRODUCT PHOTOGRAPHY ANYWHERE IN THE SET. There is no camera on this brief and there is no carton in it; a designer builds all five cards in under an hour, which is the entire economic argument for the post. Canvas 1080×1350 (4:5), flat cream #FAFAF7 ground on every card with zero texture, zero gradient, zero drop shadow and zero paper grain — flat means flat. Type is navy ink #202A44 throughout, set in the brand's grotesque at a generous size with wide leading and a lot of air; purple #A191B2 is the accent and appears exactly once per card, on one word or one rule, never on a full line. Everything is left-aligned except the calendar grid. Nothing moves, nothing animates, nothing is stickered on. CARD 1, THE CALENDAR: a small header line at the top reading 'SEPTEMBER 2026' in navy caps, the Willa's wordmark small and quiet at the very bottom-left — this is the only card in the set that carries the wordmark. Beneath the header, set large and left, the question: 'what does your september actually look like?' Under it, a single lowercase word in purple: 'ours:'. Then the grid. Build the real month: September 2026 begins on a Tuesday and runs thirty days, so the grid is seven columns wide with weekday initials in small navy caps across the top and the first square sitting in the Tuesday column, five rows deep, with the leading Sunday and Monday cells left completely empty. Every one of the thirty dated squares carries the date numeral small in the top-left corner and the same two-word answer set centred beneath it: 'one glass. 7am.' Identical in all thirty. Hairline navy rules at 0.5pt separate the cells; no cell is highlighted, circled, coloured, starred or annotated, and NO DATE IS MARKED for any holiday, weekend, launch or event — an empty calendar with one thing repeated is the joke, and any single decorated square destroys it. CARDS 2, 3 AND 4, THE TWO-ITEM LISTS: each is the same layout — a heading in navy at the top set slightly smaller than the items, then exactly two numbered lines and nothing else. No third line, no asterisk, no logo, no stinger, no illustration, no icon, no supporting copy, and enormous empty cream below the second item; the silence under line two is where the joke lands, so resist every instinct to fill it. CARD 2 heading 'things that should be shorter', item 1 'the monday meeting', item 2 'the ingredient list — ours is four lines'. CARD 3 heading 'things that should stay in', item 1 'the sunday plan, by wednesday', item 2 'the protein and the fiber in an oat — 4g+ and 2g+, still in the glass'. CARD 4 heading 'things that shouldn't need a plan', item 1 'wednesday', item 2 'breakfast — one glass, four ingredients, 1g of sugar'. On each of these three cards the purple accent falls on the numeral '2.' only. Set the two items at the same size and weight as each other — the moment item two is emphasised it reads as an ad with a joke on top instead of a list where the second thing happens to be true. CARD 5, THE INVITATION: cream, navy, one line set large and centred with air on all sides — 'so — what does your september actually look like?' — with a smaller line beneath it in purple, 'tell us. 👇'. Nothing else is permitted on card 5: no wordmark, no carton, no ingredient list, no benefit stinger, no hashtags, no sign-off. HARD GUARDRAILS FOR THE WHOLE SET: no product shot, no packaging, no pack render, no shelf, no glass photograph, no kitchen, no hands, no faces, no seasonal illustration, no leaves, no gourds, no autumn palette — cream, navy and one purple, full stop. Nothing on any card teases, counts down, hints at, or implies that Willa's is announcing anything; there is no launch and the calendar must never read like there is. Because no SKU is pictured, the set reads across the whole line — the whole-oat truth on card 3 is true of Original, Chocolate, Kids and Barista alike — while the four-ingredient and 1g specs on cards 2 and 4 belong to Original and must not be re-pointed at any other SKU.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for the week the September plan stops being fun.", medium:"answer in the comments — what actually happens in your thirty squares?", strong:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar. thirty mornings, one glass."},
    benefitShorthandId:null
  },
  {
    id:"AUG31-TT-4",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Thu Sep 3 · 7pm",
    priority:"HIGH",
    concept:"\"it was in the fridge door the whole time.\" — the fiber hunt, solved",
    intel:[
      {type:"TREND", text:"T-5: first-half 2026 on-platform grocery search data shows queries containing \"fiber\" climbing more than double the rate of queries containing \"protein\" year over year, with category share moving alongside it. The read that makes this brief: protein can be bolted onto anything — it has already been printed on pizza crust, instant noodles and cocktails — while fiber either survived the process that made the food or it did not. Demand is accelerating fastest exactly where the aisle has the least it can honestly say, which is why the shopper's version of this looks like a hunt: a drawer of bars, a tub of powder, a bottle of gummies, a stick sachet, four purchases chasing a spec that was already sitting in the fridge. INTERNAL ONLY — HARD: no search-volume percentage, no year-over-year figure, no 26.4/12.7, no \"searches are up,\" no retail trade data and no reference to a report may appear in the script, any overlay, the caption or any caption variant. The data explains why the joke lands; it is never the joke. Also internal: do not turn this into a protein-versus-fiber argument on camera. Willa's has both and this brief only counts the one everybody is currently looking for."},
      {type:"PULSE", text:"CP-2 (still holding among the platform's top formats as of Aug 26, 2026): true-crime narration — a flat, grave voiceover builds a case around an unidentified answer while the camera searches for it, then reveals the answer had been sitting in the shot since the first second. It is a reveal engine with rewatch built in: viewers scrub back to find the frame where it was visible, and that scrub-back is the retention. It also needs no performance — one straight-faced read and one prop that was never actually hidden. Ride it literally: narrate a search for fiber while the carton sits in the open fridge door, in frame, from second one. INTERNAL ONLY: never name the format, never say \"true crime,\" never wink at the camera and never reference \"a trend\" in copy — the format is a shooting instruction, not a subject. Editor's note: if the carton is not clearly legible in the first two seconds, the reveal has nothing to pay off and the piece has to be re-shot, not re-cut. LANE DISCIPLINE: this is the week's second meme-payload brief and it must not read as a sibling of AUG31-TT-2 — different mechanic, different register, no shared structure, no shared overlay grammar."},
      {type:"AUDIENCE", text:"The person this is for is already doing the work. She has bought the bars, she has the powder, she has a bottle of gummies with four left in it, and she has the vague sense that she is still behind on something. What she does not need is another product explaining her insides to her — she needs one fewer thing to manage. So the payoff here is relief, not instruction: the spec was already in a carton she buys anyway, on cereal, at 7am, with nothing to measure and nothing to remember. That is the feel-good beat and it is the reason the piece ends soft instead of triumphant. INTERNAL ONLY: no shopper-psychology language on camera, no \"in a world where,\" and nothing that reads as making fun of the person who bought the powder — the joke is on the size of the search, never on the searcher. Punching down at the buyer is a hard voice failure here. LANE DISCIPLINE: AUG31-TT-4 owns fiber as a joke about looking for it; AUG31-PIN-3 owns the fiber-gap fact in a parent context. No shared copy, no shared visual, no shared overlay line — if a line here could sit on that pin, cut it."},
      {type:"COMPETITOR", text:"Category read, no named brand reaches any consumer surface. The cooler and the supplement shelf both got louder in the last week of August — packaging is being used as an argument surface, a plant-based launch went out at 20g of protein carrying two sweeteners, and a private-label seasonal oat latte landed at the lowest price point in the market. Every one of those moves is a claim being occupied; none of them changes what is inside a Willa's carton. Posture calibration for this brief: do not argue, do not compare, do not defend. The whole piece is a joke with a spec at the end of it, delivered from the position of the product that never had to add the thing back. INTERNAL ONLY: no competitor name, no brand, no product, no logo, no wordmark, no price and no financial or retail framing in the script, overlays, caption or variants. Every package in the search sequence is generic, unbranded and unreadable on screen — if a real brand is legible in a take, the take is unusable."}
    ],
    hooks:[
      {text:"a full search of this kitchen. a drawer, a tub, a bottle, a sachet. and it was in the fridge door in the first second.", recommended:true},
      {text:"the fiber was in frame from second one. nobody thought to open the fridge.", recommended:false},
      {text:"four products bought to solve it. one carton that already had it. go back and look at the first frame.", recommended:false}
    ],
    caption:"2g+ prebiotic fiber, and not one gram of it had to be added back in. 🌾\n\nthe hunt is the funny part. a drawer of bars. a tub of powder. a bottle of gummies. a single-serve stick somebody ordered online. four different packages, all promising the same thing, all of them putting fiber back into something it had already been taken out of.\n\nWilla's Original never went through that. we use the whole oat groat — bran, germ and all, the same way steel-cut oats do — so the fiber and the protein stay in instead of getting filtered out. 2g+ prebiotic fiber. 4g+ protein. 1g of sugar. four ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt.\n\nno routine to build, no scoop to measure, no reminder to set. you pour it on cereal at 7am and the search is over.\n\nit was in the fridge door the whole time.\n\nfiber you don't have to go looking for.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#prebioticfiber",
      "#fiberrich",
      "#wholeoat",
      "#fouringredients",
      "#plantmilk",
      "#cleaningredients",
      "#realfood"
    ],
    visual:"Shot like an investigation, cut like a comedy, and the entire piece lives or dies on one rule: THE CARTON IS VISIBLE IN FRAME ONE AND IS NEVER HIDDEN. Real kitchen, not a set. Shoot 9:16 vertical on a phone, handheld, gimbal OFF — the wobble is the register; a smooth glide makes this read as an ad and kills the format. Light it low and practical, the way a kitchen looks before anyone has opened the blinds: overheads off, one warm under-cabinet strip camera-left, and the open refrigerator throwing the only cold light in the room. Grade cool and slightly desaturated for the whole search sequence — blue-grey shadows, muddy mid-tones, a touch of grain — then let the frame warm up by roughly a stop on the final push-in so the payoff is a physical change in the light, not just a change in the copy. FRAME ONE: start wide on the kitchen with the refrigerator door standing open at the LEFT EDGE of frame and a single carton of Willa's Original sitting in the door shelf, label forward, plainly legible for a full two seconds. Do not sneak it in, do not soften it, do not shoot it out of focus — the joke only works if a viewer scrubbing back can find it instantly, and that scrub-back is the retention. Then swing the camera AWAY from the fridge, right to left, as if the fridge is the one place not worth checking. SEARCH SEQUENCE, beats two and three: torch-style handheld sweeps, each one a hard whip-cut into the next, one hand entering frame to yank things open — a drawer of wrapped bars, a tub of powder with the scoop still buried in it, a bottle of gummies with four left, a single-serve stick sachet from the supplement shelf. EVERY PACKAGE IS GENERIC AND UNBRANDED, NON-NEGOTIABLE: plain kraft, plain white, labels turned to the wall, or dressed with blank wraps. No competitor carton, bottle, tub, logo or wordmark may be legible at any point; if a real brand resolves in a take, the take is unusable and it gets re-shot, not blurred in post. No price tags, no receipts, no dollar figures anywhere in frame. OVERLAYS: evidence-log grammar, not meme grammar — small mono type, all lowercase except the search labels, navy ink #202A44 on a soft cream #FAFAF7 rounded plate, pinned bottom-left, never centred, never animated with a bounce. Each search beat carries its own plate ('search 01 — the drawer,' 'search 02 — the powder,' 'search 03 — the gummies,' 'search 04 — the sachet'). THE TURN: the camera stops dead. One full beat of nothing, no cut, no music, the room just sitting there. THE PUSH-IN: a slow, deliberate handheld push toward the open fridge door, the frame warming as it goes, ending on the carton of Willa's Original held steady and label-forward for a long three seconds — no rotation, no hero tilt, no flip to the back of the label, no hand entering to grab it. It is simply found. A single line ticks in beside it in Health pillar blue #73B2C9: 'she was in frame at 0:01. go back and look.' That line is the rewatch trigger and it is the most important overlay in the brief. END CARD: plain cream #FAFAF7 card, navy type, no motion, no whoosh, no sting — '2g+ prebiotic fiber · never added back · already in the oat' held for one beat, then the soft close 'fiber you don't have to go looking for.' with the Willa's wordmark bottom-centre. NOTE ON THE END CARD: this brief is anchored on the WholePlant IP stinger (BS-1) but must NOT print its literal library sentence — that exact line shipped on an Aug 26, 2026 post and would read as a repeat. The fiber-specific tick above is the variant that ships. Palette across the whole piece is three colours only: cream, navy ink, and the one Health blue, with the fridge's cold light as the only other tone in frame and never applied to type. No talent on camera, no face, no hands other than the ones opening drawers, no founder, no talking head. Hard nos: no crime-scene tape, no chalk outline, no red string board, no evidence-marker props, no police-siren colour flash — the format is a voice and a camera move, not a costume, and props tip it into parody. No caption bounce, no zoom-punch on the reveal, no sped-up ramp.",
    script:[
      {t:"0:00-0:04", vo:"the subject was last seen leaving a bowl of cereal at approximately seven in the morning.", onScreen:"missing: 2g+ prebiotic fiber"},
      {t:"0:04-0:08", vo:"the search began, as these searches do, in the drawer.", onScreen:"search 01 — the drawer"},
      {t:"0:08-0:13", vo:"then the powder. then the gummies. then a stick sachet somebody ordered online.", onScreen:"search 02 — the powder · search 03 — the gummies · search 04 — the sachet"},
      {t:"0:13-0:17", vo:"four purchases. all of them putting fiber back into something it had already been taken out of.", onScreen:"four packages. one job."},
      {t:"0:17-0:21", vo:"at no point did anyone check the door of the refrigerator.", onScreen:"nobody opened the fridge"},
      {t:"0:21-0:26", vo:"she'd been in frame since the first second. two grams plus of prebiotic fiber, and nobody had to add it.", onScreen:"she was in frame at 0:01. go back and look."},
      {t:"0:26-0:29", vo:"it came with the oat. case closed.", onScreen:"2g+ prebiotic fiber · never added back · already in the oat → fiber you don't have to go looking for."}
    ],
    audio:"Original audio, no trending sound — the borrowed engine here is the read, not a track. Voiceover is ONE flat, grave, unhurried true-crime narration recorded separately in a quiet room, close-mic'd, dropped slightly under the room tone so it sounds like a case file being read rather than an announcement. This is the single most fragile element in the brief: THE READ NEVER WINKS. No comedy voice, no eyebrow, no smirk audible in the delivery, no lift on the punchline — the joke is that the narrator is completely sincere about a carton of oat milk, and the second the performer signals that it is a bit, the piece collapses into parody. Direct the read at 85% of the pace instinct suggests and take the flattest take, not the funniest one. Under it: a low sub-bass drone at very low level through the search sequence, and one dry clock tick as the metronome the whip-cuts land on — capture or source a clean 20-second tick so the editor can cut every search beat to it. Record the practical sounds separately and let them be loud: the drawer yanking open, the powder tub lid, the gummy bottle rattle, the fridge door seal breaking. CRITICAL EDIT NOTE: at the turn, drop EVERYTHING — drone out, tick out, VO out — and leave one full beat of pure refrigerator hum before the push-in starts. That silence is the joke. Scoring over it kills it. Bring nothing back for the end card: no sting, no whoosh, no bass drop, no music button. Hard nos: no true-crime documentary music library cue (it dates the piece and reads as a costume), no dramatic orchestral hit, no sped-up chipmunk edit, no laugh track.",
    duration:"0:29",
    cta:{soft:"go back to the first frame. it was there the whole time.", medium:"check the fridge door before you order anything else — Willa's Original has 2g+ prebiotic fiber in it already.", strong:"Willa's Original: 2g+ prebiotic fiber, 4g+ protein, 1g of sugar, four ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt. the fiber came with the oat. no scoop required."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG31-TT-5",
    platform:"TikTok",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Multi",
    dnaPattern:"at-shelf-moment",
    timing:"Fri Sep 4 · 9am",
    priority:"STANDARD",
    concept:"\"every drink in this case is for something now. this one's for fiber and protein.\" — function, said at the shelf",
    intel:[
      {type:"TREND", text:"T-7: a one-year-old juice-based functional line graduated out of a national natural grocer's rotating innovation program into permanent placement across that retailer's full national footprint effective September 2026 — a national buyer decision made in roughly four months from the brand's spring 2026 Forager Finds debut, not three. The post-show read from the Aug 18–20 Denver natural-products floor points the same way: functional beverage — nonalcoholic, lower-sugar, prebiotic, gut-forward — is the set the natural channel is actively clearing shelf space for. The operative lesson, and the entire reason this brief exists: the bar for permanent placement right now is a drink that does a specific job, stated in ONE line. Willa's already clears that bar and has been burying it — prebiotic fiber and whole-groat protein are a function, not a virtue, and we have been leading with 'clean' and arriving at the function four sentences later. This brief inverts the order and says the function first, out loud, on a shelf. INTERNAL ONLY: no retailer name, no brand name, no program name, no door count, no award count, no trade-show reference, no 'the category is moving toward function' commentary may appear in the script, the single overlay, the caption or any caption variant. The trend is the REASON for the brief, never its subject. LANE DISCIPLINE: this brief and AUG31-IG-R5 both descend from the function argument and must never restate each other. THIS brief owns the shelf as a physical place and the function said in one flat line; IG-R5 owns function as a flavour argument on Chocolate and never films a store. If a line here could sit on that Reel, cut it."},
      {type:"AUDIENCE", text:"The person standing at the cold case in the first week of September is no longer reading labels — she is scanning for what each thing is FOR. Every door in front of her now makes a job claim, and the ones that convert are the ones that answer in a glance rather than in a paragraph. Willa's has historically handed her a virtue (clean, organic, four ingredients) and made her work out the benefit herself, which is a fine argument and a slow one at a fridge door. The move here is to give her the answer at her own speed and in her own posture: an ordinary errand, filmed like it matters, one carton faced forward, one line. The persuasion is the calm — there is nothing to argue with, and nothing being sold at her. INTERNAL ONLY: no shopper-psychology language, no 'in a world where' framing, no voice direction on any consumer surface, and nothing on camera that acknowledges the shopper is being observed. Register reference for the edit only — editorial framing of an ordinary errand: soft daylight, composed handheld, product design left alone to do the work, no wink, no explanation, no reveal. Confidence, executed rather than described."},
      {type:"COMPETITOR", text:"C-2 (week of Aug 31, 2026): a national discount grocer's private label is putting an oat-milk seasonal latte on shelf in the exact days this content ships, alongside a savory pumpkin-herb hummus. Read it as a maturity marker rather than a threat — the seasonal oat drink has now finished its migration from café menu to national private-label shelf, and a format that private label carries at the market's lowest price point is a format that has stopped differentiating anyone. Two operating consequences for THIS brief. First, it is the reason the camera never turns toward the seasonal set: no gourds, no orange end-cap, no syrup, no pumpkin anything in frame or in copy, at any point, even as background. Second, and non-negotiable: do NOT make 'we don't do a seasonal version' the point. That argument was spent Aug 24 and re-running it would be the third seasonal-subtraction post in three weeks. This brief simply looks in a different direction on the same aisle. INTERNAL ONLY: never name the grocer, never name the private label, no pricing, no promo, no 'commodity' framing, no seasonal commentary of any kind reaches a consumer surface."},
      {type:"TREND", text:"ACCURACY CORRECTION — the T-7 source text (both here and upstream in spine.json's T-7 entry, and repeated in AUG31-IG-R5's intel) claimed Sprouts made its permanent-placement call on The Cycle 'inside roughly three months of first contact.' Verified timeline: The Cycle's BevNET-announced Forager Finds nationwide debut was Apr 16, 2026; the permanent-placement announcement was Aug 25–30, 2026 — a gap of roughly four months, not three, and 'first contact' with the retailer likely predates the April launch, making three months an understatement either way. Fixed in this brief's TREND intel to read 'roughly four months ... not three.' Propagate the same fix to spine.json T-7 (trend + detail fields both say 'three months') and to AUG31-IG-R5, which repeats the identical 'three months' phrasing twice in its own intel/copy."}
    ],
    hooks:[
      {text:"every drink in this case is for something now. sleep, gut, focus, energy. this one's for fiber and protein.", recommended:true},
      {text:"the whole cold case answers one question now: what is this for. here's ours, in one line.", recommended:false},
      {text:"no shaker, no sachet, no scoop. 2g+ prebiotic fiber and 4g+ protein, already in the milk.", recommended:false}
    ],
    caption:"Fiber and protein. that's what this one's for. 🌾\n\nevery drink in this case is for something now — sleep, gut, focus, energy. the cold case quietly reorganized itself around what a drink DOES, and somewhere in the middle of all that, a plain carton of oat milk turned out to have been answering the same question the whole time. we were just saying it in the wrong order.\n\nso, short version. Willa's uses the whole oat groat instead of processed oat syrup, which means the fiber and the protein stay in the milk instead of getting filtered out. Original: 2g+ prebiotic fiber, 4g+ protein. Chocolate: 3g fiber, 5g protein, real cacao. Kids: 2g fiber, 8g protein, free of the top 9 allergens. prebiotic fiber, if nobody's ever bothered to say it plainly, is the kind your gut bacteria actually eat.\n\nevery drink in this case is for something now. this one's for fiber and protein — and it still just tastes like milk.\n\nfour cartons. one answer. no explaining required.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#prebioticfiber",
      "#plantprotein",
      "#functionaldrinks",
      "#grocerystorefinds",
      "#plantmilk",
      "#realfood"
    ],
    visual:"An editorial errand — a real store, filmed like it deserves to be. Shot vertical 9:16 on a phone, handheld but braced and deliberately still: this is not a walking POV and there is no continuous walk through the store, which is the specific thing that separates it from the in-aisle piece that ran Aug 26. GIMBAL OFF, elbows in, breathing in the frame; a glassy glide reads as an ad and a bouncing walk reads as vlog, and the register here is neither. Go on a weekday morning between 8 and 10am when the store is quiet and the overheads are already on, and pick a location with real daylight reaching the aisle — a front-of-store window, a skylight, a glass entrance throwing soft light down the run. Grade WARM and low-contrast: pale neutral floor, the cool green-white of the case interior, and the carton's own colour as the only saturated thing in frame. Palette is three: warm daylight neutral, the cold case's pale glass-green, and Willa's navy #202A44 for type. BEAT ONE, the approach — a composed frame from the head of the aisle, cold case running away from camera on the right, one slow half-step in; no text, no product, nothing to read yet, just the geometry of the aisle and daylight. BEAT TWO, the pan — one unbroken slow pan left-to-right across the closed glass doors at a steady speed, close enough that reflections move but far enough that nothing on any competing package resolves. CRITICAL AND NON-NEGOTIABLE: no competitor carton, bottle, cap, logo or wordmark may be legible at any point, and no retailer signage, shelf-talker, price tag, price rail or house-brand mark may appear at all — shoot slightly wide, keep the move continuous, blur or shot-swap anything readable in the edit, and if a section cannot be kept illegible, move to a different section rather than fixing it in post. ALSO NON-NEGOTIABLE: the camera never turns toward the seasonal set. No gourds, no orange end-cap, no spice packaging, no syrup bottles, nothing pumpkin, not even receding in the background of a frame. BEAT THREE, the reach — one ungloved hand opens the glass door; the seal breaks, the door swings, cold fog rolls once across the lower frame. Shoot this from three-quarter so the arm leads the eye to the shelf. BEAT FOUR, the facing — the hand reaches in and simply faces the Willa's cartons forward, squaring two or three SKUs so the labels sit flush and even. This is the whole point of the piece: not a grab, not a hero tilt, not a rotation, not a flip to the back of the label — someone tidying a shelf they care about. The ONE line of on-screen text enters here and only here, navy #202A44 on a soft cream #FAFAF7 rounded plate, small, lower third, aligned left, no animation beyond a single soft fade: 'this one's for fiber and protein.' BEAT FIVE, the hold — the hand exits, the door swings shut on its own weight, the fog clears off the glass, and the faced cartons sit there in a locked, silent, composed frame for a full three seconds with NO text on screen. That silence is the piece. END CARD: plain cream #FAFAF7, navy type, no motion, no whoosh, no sting — 'Most oat milks filter out the healthiest 30% of the oat. We don't.' — held 2 seconds with the Willa's wordmark bottom-centre. NOTE FOR THE EDITOR: the empty onScreen fields on beats one, two, three and five are deliberate, not missing — this brief carries exactly one line of text inside the store plus the end card, and adding a second overlay anywhere breaks it. No talent on camera, no face, no founder, no voiceover, no captions burned in, no counting of label lines, no checklist ticks, no kitchen, no pour. The piece never leaves the store.",
    script:[
      {t:"0:00-0:03", vo:"(no voiceover — location sound only)", onScreen:""},
      {t:"0:03-0:07", vo:"(no voiceover — location sound only)", onScreen:""},
      {t:"0:07-0:10", vo:"(no voiceover — location sound only)", onScreen:""},
      {t:"0:10-0:14", vo:"(no voiceover — location sound only)", onScreen:"this one's for fiber and protein."},
      {t:"0:14-0:17", vo:"(no voiceover — location sound only)", onScreen:""},
      {t:"0:17-0:19", vo:"(no voiceover — location sound only)", onScreen:"Most oat milks filter out the healthiest 30% of the oat. We don't."}
    ],
    audio:"No trending sound, no music, no voiceover, no talent — original audio built entirely from the room. Record the store properly rather than salvaging it in post: a clean 60-second ambience pass with nobody talking (compressor hum, the distant rattle of a cart, the fluorescent tick), then close, isolated passes of the three sounds the edit actually needs — the door seal breaking, the door swinging shut under its own weight, and the small dry knock of a carton being squared against the shelf. Those three sounds are the score. Mix them slightly louder than life so the seal and the knock land, and let the ambience sit under everything unbroken from the first frame to the last so there is no audible cut anywhere in the piece. Editor's note: hold three full seconds of pure room tone after the door closes, with no text on screen and nothing happening — the stillness is the whole payload, and any bed laid over it turns an editorial frame into an ad. The end card carries silence too: no sting, no whoosh, no bass drop, no sped-up edit, no ASMR-style sweetening. If the store's own room tone comes back unusable, reshoot the ambience — do not substitute a stock grocery ambience or a library track.",
    duration:"0:19",
    cta:{soft:"next time you're standing at the cold case, read one carton for what it's FOR.", medium:"Willa's Original — 2g+ prebiotic fiber and 4g+ protein, already in the milk.", strong:"Willa's uses the whole oat groat instead of processed oat syrup, so the fiber and the protein stay in. Original: 2g+ prebiotic fiber, 4g+ protein. Chocolate: 3g fiber, 5g protein, real cacao. Kids: 2g fiber, 8g protein, free of the top 9 allergens."},
    benefitShorthandId:"BS-10"
  },
  {
    id:"AUG31-PIN-2",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Chocolate",
    dnaPattern:"viral-recipe-remix",
    timing:"Fri Sep 4 · 11am",
    priority:"STANDARD",
    concept:"\"these pancakes drank a whole cup of chocolate milk.\" — Chocolate, cooked into the stack",
    intel:[
      {type:"TREND", text:"T-9 (research dated Aug 24 and Aug 31, 2026): two studies published inside this window both stretched the timeline on formulation decisions. In the first, mice fed sucralose or stevia showed altered gut microbiomes, reduced beneficial short-chain fatty acids and changed metabolism- and inflammation-related gene activity, with elevated fasting blood sugar showing up in a SECOND generation of descendants. In the second, more than 64,000 Britons born 1951–1956 were tracked against wartime sugar rationing that ended Sept 1953, and the least-exposed group showed substantially lower rates of several cancers decades later. Willa's position against that backdrop is not an argument, it is an absence: Willa's Chocolate never made the zero-calorie swap — no sucralose, no stevia, no monk fruit, no sugar alcohols — because real cacao does the flavour and organic coconut sugar does the sweetening. INTERNAL ONLY AND NON-NEGOTIABLE: neither study, neither finding, no sweetener name, no gram count, no added-sugar labelling and no lawsuit may appear in the pin overlay, the caption, any caption variant, the hooks or the CTAs. T-9 is the REASON this pin exists in the week, not the SUBJECT of it. The consumer-facing expression of T-9 here is one thing only — a chocolate recipe whose chocolate comes from an ingredient you can name, cooked in a pan, on a Saturday. The sugar-claim lane ran AUG 24 and is rested; this brief names what is in the batter and never what is missing from anyone else's."},
      {type:"AUDIENCE", text:"The person who finds this pin is not reading about food policy — she is standing in a kitchen on a Saturday morning of the last long weekend of summer (Sep 5–6 fall inside this window) with a pan out and forty minutes, and she has typed something like 'dairy free chocolate pancakes' into a search bar. Pinterest is a search surface before it is a feed, which makes this the one placement in the week where the buying decision and the recipe arrive in the same second: if the recipe works, the carton is on the list. What she is actually resolving is a small recurring annoyance — most dairy-free chocolate pancake recipes ask her to buy a cocoa canister she will use twice a year, and most chocolate pancake recipes are built on dairy in the first place. This one asks for a carton she can drink the rest of. That is the whole persuasion, and it is a convenience argument dressed as a joke, not a health argument. INTERNAL ONLY: no shopper-psychology language, no 'in a world where,' no search-behaviour commentary and no voice direction anywhere in copy. Register reference for the designer only: Fishwife / Graza / Omsom — an ingredient can be a design object, the wit lives in the typography and the confidence, never in an explanation."},
      {type:"COMPETITOR", text:"Category read for posture only, no linked competitor card this week (context dated Aug 28, 2026): the oat-milk category leader has begun printing a long advocacy message across every carton it produces — packaging converted into owned media at global scale, on a pack whose ingredient deck runs roughly twelve lines. The read for this brief is the inversion, and it is a quiet one: they are arguing on the OUTSIDE of the carton, and Willa's argument is what happens when you open one and cook with what is inside. A five-ingredient chocolate oat milk is short enough to work as a pantry ingredient rather than only a beverage, and a twelve-line deck is not. That is the entire competitive point and it is made by the recipe working, not by a line of copy. INTERNAL ONLY: no brand name, no packaging commentary, no 'ingredient deck' or line-count framing, no advocacy reference and no comparison of any kind reaches the pin, the caption or the hashtags. Also internal: do NOT let this become a seasonal-flavour argument — private label entered the seasonal oat-latte format the week of Aug 31, 2026, that lane is commodity now, and this brief deliberately sits in an unflavoured, unseasonal recipe slot instead."}
    ],
    hooks:[
      {text:"these pancakes drank a whole cup of chocolate milk.", recommended:true},
      {text:"let's make chocolate oat pancakes (dairy-free!)", recommended:false},
      {text:"no cocoa powder in this one. the milk was already chocolate.", recommended:false}
    ],
    caption:"Saturday morning, one pan, and a stack that got its colour straight out of the carton. 🍫🥞\n\nWilla's Organic Chocolate Oat Milk is made with real cacao and the whole entire oat — the whole grain, not just the starch — so it pours rich and creamy enough to be the entire liquid in a pancake batter and still taste like chocolate on the other side of the pan. No cocoa powder. No cane sugar. No dairy anywhere in it. Just a cup of it doing the work.\n\nIngredients\n- 1 cup Willa's Organic Chocolate Oat Milk\n- 1¼ cups all-purpose flour (or a 1:1 gluten-free blend)\n- 2 tsp baking powder\n- ¼ tsp fine sea salt\n- 1 tbsp maple syrup\n- 1 tsp vanilla extract\n- 2 tbsp avocado oil, plus more for the pan (Miyoko's vegan butter also works)\n- 1 tsp lemon juice — optional, for a soft tang and a little extra lift\n\nWhisk the dry, whisk the wet, fold them together and then leave the batter alone for five minutes. Medium-low heat, about three minutes a side, flip once. Warm maple over the top, a few flakes of sea salt.\n\nThese pancakes drank a whole cup of chocolate milk. That's the recipe.",
    hashtags:[
      "#willas",
      "#willaschocolate",
      "#chocolatepancakes",
      "#dairyfreepancakes",
      "#dairyfreerecipes",
      "#oatmilkrecipes",
      "#pancakerecipe",
      "#weekendbreakfast",
      "#plantbasedbreakfast",
      "#realcacao"
    ],
    visual:"Vertical 2:3 pin (1000×1500), one hero photograph with one line of type over it — a zine cover, not an infographic, and specifically NOT a step-strip, a grid, a collage or a labelled ingredient diagram. There is exactly one typographic idea in this pin and it is the joke; if a second block of copy appears anywhere on the image, the pin has failed its own brief. THE SHOT: a real kitchen counter mid-morning, pale wood or warm-white stone, shot at a 30–40° three-quarter angle at plate height (not overhead — the height of the stack is the appetite, and overhead flattens it). 50mm full-frame equivalent, f/4 so the front edge of the top pancake is sharp and the background softens without going to mush. Natural window light raking in from camera-left, one small white bounce card camera-right to keep the shadow side from going muddy; no diffusion sock, no ring light, no filter. Grade warm and honest — this stack should read as cocoa and maple, never as grey-brown paint, and never pushed to fake-black chocolate. COLOUR TRUTH, read this before the shoot: a batter whose only chocolate is one cup of Willa's Chocolate comes out DEEP COCOA-BROWN, warm and dark-toasted at the edges — not black, not fudge-coloured. Do not fix that in the grade and do not add cocoa powder to the batter to hit a darker photo; the honesty of the colour is the entire proof of the joke. Shoot the real recipe. LAYOUT, bottom two-thirds: a stack of five pancakes on a small off-white plate, slightly off-centre to the left, edges deliberately irregular — hand-poured, not ring-moulded. Warm maple caught mid-pour from a small jug entering top-right of the stack, one clean ribbon, shot at 1/500 or faster so the pour holds an edge rather than smearing. A few flakes of sea salt on the top pancake catching the light. One pat of Miyoko's vegan butter is optional and must be visibly plant butter in its own dish if used — no dairy butter, no butter dish that reads dairy, no cream, no yogurt anywhere in frame. PRODUCT PLACEMENT, non-negotiable per the visual-competition rule: the Willa's Chocolate carton stands upright behind and slightly right of the plate, label forward, wordmark unobstructed, close enough to the stack that a screenshot cropped to the food still contains the carton. It is lit, not hidden in the fall-off. Beside it, a clear glass mixing bowl with a shallow pool of the finished dark batter and a whisk resting in it — that bowl is the visual receipt that the milk IS the batter, and it is the second most important object in the frame after the stack. Nothing else on the counter: no gourds, no autumn leaves, no styling props, no linen runner doing a lot of work, no cocoa canister (obviously), and nothing that reads as a season. TYPOGRAPHY: the hero line sits in the top third, set in a heavy condensed sans, tight tracking, two lines maximum, sentence case, in navy #202A44 on a soft cream #FAFAF7 rounded plate with generous internal padding — 'these pancakes drank a whole cup of chocolate milk.' It should read at thumbnail size on a phone in one pass, with no asterisk, no subhead and no explanation under it. SECONDARY LOCKUP, small, bottom-left, roughly a third the size of the hero line, in Ingredients-pillar green #75C596: 'let's make chocolate oat pancakes (dairy-free!)' — this is the searchable recipe name and the only other type on the pin. The Willa's wordmark sits bottom-right, small, in navy, with the BS-1 stinger 'The whole oat. Not the syrup.' set beneath it at caption size. That stinger is the only proof line allowed on the image; no nutrition figures, no certification badges, no ingredient count, no award seal — the ingredient-list typography beat belongs to IG-R2 this week and may not appear here in any form.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this one for a slow Saturday morning.", medium:"make it with Willa's Organic Chocolate Oat Milk — one cup in the batter is the whole chocolate.", strong:"Willa's Organic Chocolate Oat Milk: real cacao, the whole entire oat, no dairy and no cane sugar. Pour a cup into the batter and skip the cocoa canister entirely."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG31-IG-R3",
    platform:"Instagram Reel",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Fri Sep 4 · 12pm",
    priority:"HIGH",
    concept:"\"swapping one fat for another isn't the same as not needing one.\" — the oil argument, sat out",
    intel:[
      {type:"PULSE", text:"CP-4 (post-show read published Aug 26, 2026 from the Aug 18-20 Denver natural-products floor): the read named it flatly — one fat is being sold as the villain and another fat is being marketed as the clean, healthier cure, and the swap is moving as a formulation trend ACROSS categories rather than staying in one aisle. The same read warns that nutrition trends are now outrunning nutrition literacy. That gap is the whole opening. The fat conversation has hardened into a purity contest in which trading one fat for another counts as a fix, and the honest position is narrower and far more useful than the slogan: Willa's Original doesn't have an oil on its ingredient list at all, so there is nothing here to upgrade. INTERNAL ONLY AND NON-NEGOTIABLE: the show, the city, the trade read, the specific fat being marketed as clean, and every fat brand and competitor stay out of the script, the overlays, the caption and all three caption variants. Nothing on camera names a fat, ranks a fat, or warns anyone off one. The signal is the reason this brief exists, never its subject. SECOND GUARDRAIL: the precise Willa's claim is no rapeseed and no canola, plus the plain fact that Original's four-line ingredient list contains no oil. Do NOT write, say or overlay a blanket 'seed oil free' claim anywhere — Barista contains organic high-oleic sunflower oil, which is why Barista may not appear in this brief in any form: not in frame, not in the caption, not on the shelf behind her. THIRD GUARDRAIL: this is a claim about the ingredient list, not a fat-content claim. Oats naturally contain fat. Nothing here says fat-free, low-fat or implies fat is bad."},
      {type:"AUDIENCE", text:"The person this reaches on Fri Sep 4 has spent a stretch of days being told, at volume, that she chose the wrong fat and that a different fat will fix it. She is not confused because she is careless — she is confused because the advice changed faster than anybody explained it, and every version of it arrived sounding certain. What she is short on is not another ranking; it is one thing she doesn't have to re-litigate. Reading a four-line ingredient list out loud at normal speaking pace gives her that in about eight seconds, and the fact that there is no oil on the list to argue about is the relief, not the flex. The Lead-with-the-Solution rule governs the shape: Willa's four ingredients land in the first two beats, and the reason the fat conversation exists is never explained to her at all. INTERNAL ONLY: no shopper-psychology language, no 'in a world where', no 'let's clear this up' teacher posture, and absolutely no implication that anyone currently cooking with any fat has made a mistake. The last line of the piece must leave her freer than it found her — that generosity IS the brief, and a triumphant read fails it even if every word is correct."},
      {type:"COMPETITOR", text:"C-1 context (reported Aug 28, 2026, internal posture calibration only): the category leader has converted its packaging into owned media at global scale, printing an advocacy message on every carton it produces — on a pack whose own ingredient deck runs about twelve lines. Read for this brief: the loudest surface in the category is being used to argue about something other than what is in the carton. Willa's counter is not a louder surface, it is a shorter list read at conversational volume by the person whose name is on the company. That is the posture — quiet, unhurried, unbothered — and it is the entire reason this brief is a single continuous take rather than a cut-heavy edit. INTERNAL ONLY: no brand name, no packaging reference, no line count comparison, no 'some cartons need twelve lines' joke and no allusion to any competitor's campaign reaches any consumer surface. Note that links.comps is intentionally empty on this brief — C-1 informs the read, it does not anchor the post."}
    ],
    hooks:[
      {text:"the whole internet is picking a better oil. there isn't one on this list to pick.", recommended:true},
      {text:"four things in this carton, and not one of them is an oil. that's not a diet take, that's just the label.", recommended:false},
      {text:"Willa's has stayed pretty quiet on the fat argument, and this is the reason why — it takes eight seconds to read.", recommended:false}
    ],
    caption:"There is no oil on Willa's Original's ingredient list. 🌾\n\norganic whole grain oats. filtered water. organic vanilla extract. sea salt. that's the entire list.\n\nso there's nothing here to swap for a better one. that isn't a position on which fat anyone should cook with — it's just what the ingredient list says.\n\nthe reason it pours rich was never an added oil — it's what's still in the oat itself. Willa's Original carries 4g+ protein and 2g+ prebiotic fiber a cup, no rapeseed, no canola.\n\nChristina, reading the label in her own kitchen: swapping one fat for another isn't the same as not needing one.\n\nand if the whole conversation has gotten loud and confusing lately — completely fair. cook with what you love. this one just never had to enter the argument.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#fouringredients",
      "#ingredientlist",
      "#readthelabel",
      "#cleaningredients",
      "#wholeoat",
      "#plantmilk",
      "#realfood"
    ],
    visual:"One continuous take, no cuts, no cutaways, no b-roll — the unbroken shot IS the argument, and any edit inside it makes the piece look like it has something to tidy up. Christina on camera in her own kitchen, framed medium-close from the sternum up in vertical 9:16, camera locked on a tripod at eye height and left there; no push-in, no handheld drift, no rack focus, no slow zoom to signal importance. Shoot mid-morning on the side of the kitchen that takes soft indirect window light from camera-left, with a bounce card or a plain white towel just off camera-right to open the shadow so she reads warm and awake rather than lit — grade neutral to gently warm, never the cool clinical white of an explainer video and never the gold-hour glow of a wellness ad. Background is a real, lived-in counter shot shallow: a wooden board, a bowl, a jar of something ordinary, and nothing else. CRITICAL SET RULE: no oil bottle, no butter dish, no jar of fat of any kind, no pan, no stove, no cooking in progress and no second product of any type may be visible at any point — a single readable fat on that counter turns a warm ingredient read into a comparison the brief has explicitly refused to make. No competitor carton, cap, logo or wordmark legible anywhere. WILLA'S BARISTA MAY NOT APPEAR IN FRAME, on the counter, in the fridge, or in any pickup — Original is the only SKU in this piece, full stop. She holds a single carton of Willa's Original in one hand for the entire take, label toward camera at a natural resting angle, and she never flips it, never rotates it to the back, never taps it and never presents it. It is the thing she happens to be holding, not a prop being demonstrated. She reads the four ingredients at genuine conversational pace with real breath between them — this is the only moment in the piece that is allowed to be slow, and the slowness has to come from her, not from the edit. OVERLAY DISCIPLINE, the hardest rule in this brief: text NEVER arrives before she says it and never states anything she is about to say. Exactly two type moments exist. First, an opening plate in navy #202A44 on a soft cream #FAFAF7 rounded rectangle, lower third, aligned left, held rock steady from 0:00 and fading out by 0:06 — 'the whole internet is picking a better oil. there isn't one on this list to pick.' Second, one short line in health-pillar blue #73B2C9 that ticks in AFTER she has finished the sentence it echoes, at roughly 0:18, lower third, one line only — 'no oil on the list.' Nothing else. The four ingredients are NOT typed on screen while she reads them; hearing a person say four words is the entire mechanic and a synchronized overlay steals it. No counters, no line-numbering, no checkmarks, no ticking animation, no ingredient stack. END CARD: plain cream #FAFAF7, navy type, no motion, no whoosh, no sting — 'Four ingredients. (Read 'em.)' — held 1.5 seconds with the Willa's wordmark bottom-centre. Palette across the whole piece is three: cream, navy ink, and the one pillar blue, with the kitchen's own wood tone as the only other colour in frame. She does not smirk, does not raise an eyebrow at the camera, does not do the knowing pause before the last line. Patagonia and Lovebird together: real stance, high road, warm, and completely uninterested in winning.",
    script:[
      {t:"0:00-0:06", vo:"this is Willa's Original.", onScreen:"the whole internet is picking a better oil. there isn't one on this list to pick."},
      {t:"0:06-0:13", vo:"organic whole grain oats. filtered water. organic vanilla extract. sea salt.", onScreen:"(opening plate has faded — nothing on screen, she reads, the carton stays in hand)"},
      {t:"0:13-0:18", vo:"that's the whole list. there's no oil on it to swap out for a better one.", onScreen:"(clean frame)"},
      {t:"0:18-0:22", vo:"and that's the only thing we'd add to the week — swapping one fat for another isn't the same as not needing one.", onScreen:"no oil on the list."},
      {t:"0:22-0:29", vo:"if it's all gotten confusing lately, that's fair, it got loud fast. cook with what you love. this one just never had to enter it.", onScreen:"Four ingredients. (Read 'em.)"}
    ],
    audio:"No trending sound and no music bed under the read — the piece is sync sound and room tone, which is what makes a stance sound like a person instead of a campaign. Record her on a lav or a small shotgun just out of frame so the voice is close, unprocessed and at true conversational volume; she is talking across a kitchen counter to one person, not addressing a feed. Capture 30 seconds of clean room tone in that kitchen before the first take so the editor can bridge without the silence going dead. If music is used at all it is one sustained acoustic tone at barely-audible level that enters only under the end card and never under the ingredient read — and the default is to use none. Absolutely no sting, no whoosh, no bass drop, no record-scratch, no sped-up section, no reverse-cymbal build under the last line. EDITOR'S NOTE, load-bearing: leave the real breath between the four ingredients exactly as she recorded it, and do NOT tighten the pause after 'that's the whole list.' Compressing this read to make it punchier converts a warm stance into a mic drop, which is the one register this brief cannot have. Pick the take where she sounds least like she is delivering a line — the calm read beats the clean read every time.",
    duration:"0:29",
    cta:{soft:"save this for the next time the fat conversation gets loud.", medium:"pour Willa's Original — organic whole grain oats, filtered water, organic vanilla extract, sea salt.", strong:"Willa's Original: four ingredients, no oil on the list, no rapeseed, no canola. 4g+ protein and 2g+ prebiotic fiber a cup."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"AUG31-IG-F2",
    platform:"IG Feed",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Fri Sep 4 · 6pm",
    priority:"STANDARD",
    concept:"\"a word can be argued about. a description is either true or it isn't.\" — the process, in plain english",
    intel:[
      {type:"TREND", text:"T-2: on Aug 28, 2026 a first-in-nation bill creating a voluntary 'non-ultraprocessed certified' seal cleared both chambers of a state legislature and moved to the governor's desk, with a decision due by Sep 30, 2026. The seal is the headline and the seal is NOT this brief. The story is the definition underneath it: for the first time a government has to put a legal boundary around 'not ultra-processed,' and every workable version of that boundary describes how a food is made — what was extracted, what was reconstructed, what was added back — rather than what the front of the box claims. That vocabulary is about to standardise, and a brand that already talks that way inherits it at no cost. INTERNAL ONLY, and this is the hard one: no state, no bill number, no legislature, no governor, no agency, no seal, no certification programme may appear in the caption, on a card, in an overlay or in any caption variant. Willa's is NOT waiting for this seal, would NOT be described as applying for it, and must never be framed as needing one — the seal lane is three-deep and rested. The only thing this trend licenses is plain description of Willa's own process while the category argues about vocabulary."},
      {type:"TREND", text:"T-8: a suit filed in federal court alleges the outside panel of reviewers that reshaped current federal dietary guidance toward daily fats, meat and dairy had undisclosed industry ties across eight of its nine members, with neither the panel's report nor its member names published until the guidance itself did. The outcome is years away and irrelevant to any consumer surface. What is usable is the shape of the question, which pairs exactly with T-2: one institution is being made to write down what a word means, and another is being asked who wrote its advice in the first place. Definition and authorship, in the same seven days. Willa's answer to both is the same and it is not an attack — it is a description of its own process plus a short ingredient list it wrote itself and has never revised. INTERNAL ONLY: no lawsuit, no court, no plaintiff, no agency, no guidance document, no panel, no percentages, no 'eight of nine.' Do not let this become a swipe at dairy or at anyone's diet — Willa's does not punch, it describes. The consumer-safe residue is one sentence: a recommendation should say who wrote it, and so should a carton."},
      {type:"COMPETITOR", text:"C-1: the category leader began printing a climate-advocacy message across every carton it produces, splitting the panel into a short block naming the minority who oppose action and a longer block addressed to politicians. Read it as a posture contrast, not a target: the biggest carton in the aisle has decided the surface of the package is a place to make an argument about something other than the food inside it. That is precisely the opening this brief walks through — Willa's uses the same real estate to describe the food, in the same plain words the whole category is about to be forced into. INTERNAL ONLY: no brand, no campaign, no percentage, no climate-politics commentary and no 'unlike the other guys' framing reaches a card or a caption. Willa's does not comment on how anyone else uses their packaging. The contrast is executed silently by what this carousel chooses to put on screen, and is never stated."},
      {type:"AUDIENCE", text:"This is the reader who wants the week explained without being handed a fight. The register is Kiki Milk posture — confident category critique that never names anyone — steadied by Tenzo's receipts-first calm, and the humour pattern is World-Context Tie-In, which means the carousel rides an argument everyone is already half-hearing and answers it in a smaller voice than the argument is being conducted in. Two writing instructions follow from that. First, plain nouns only: bran, germ, oats, water, salt — every card has to land on a 22-year-old and a grandparent from opposite directions, so no wellness dialect and no defensive tone. Second, this is a description, not a rebuttal: the moment a card sounds like it is answering an accusation, the brief has lost. LANE DISCIPLINE for the AUG 31 week: this brief owns definitions and authorship — what the words mean and who wrote them. AUG31-TT-1 owns lot-by-lot lab testing and AUG31-TT-3 owns the calm who-checks-this answer; this carousel therefore never argues verification, never names a testing body, and never touches the residue-testing claim. The certifications on the last card are listed, not defended."}
    ],
    hooks:[
      {text:"a word can be argued about. a description is either true or it isn't.", recommended:true},
      {text:"everyone's arguing about what 'ultra-processed' means. we'll just describe ours.", recommended:false},
      {text:"the ingredient list is the short part. the interesting part is what we don't do to it.", recommended:false}
    ],
    caption:"Four lines, and we'll tell you exactly what happens to them. 🌾\n\norganic whole grain oats, filtered water, organic vanilla extract, sea salt. USDA Organic, and what goes in is the whole oat groat — the whole kernel, before anybody rolls or strips it. bran and germ still on. nothing is taken out of it, and nothing is built back in from syrup afterwards.\n\nthe argument in food right now is about a word. what does 'not ultra-processed' actually mean — and who wrote the advice everybody's been handed? a word can be argued about. a description is either true or it isn't.\n\nso, plainly: the usual way to make oat milk is to filter the bran and the germ off first, then process what's left of the starch into sugar. the protein and the fiber go out with the parts that were removed. in Willa's Original they never leave. 4g+ protein, 2g+ prebiotic fiber — the kind that feeds your gut — and 1g of sugar.\n\nUSDA Organic · Non-GMO Project Verified · Kosher · Vegan · women-owned, WBENC certified.\n\nfour ingredients. read 'em.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#fouringredients",
      "#ingredientlist",
      "#ultraprocessedfood",
      "#cleaningredients",
      "#realfood",
      "#plantmilk"
    ],
    visual:"Static IG Feed carousel, six cards, no video and no talent — the whole piece is typography and real kitchen stills, and the argument is won by how calm it looks next to how loud the conversation it's answering sounds. Palette is exactly three: cream ground #FAFAF7, navy type #202A44, and Health-pillar blue #73B2C9 used as a single accent per card and never for a full line of copy. Shoot the photographed cards in one real home kitchen on one morning with available window light from camera-left only — no diffusion, no gels, no filter, no props carried in, no styled flat-lay. Leave the counter as it is. Hands only where hands appear, no faces, no founder. Set every line of type left-aligned with generous air; never centre a card, never use a script face, never put type over a photograph — the typographic cards and the photographic cards alternate and stay separate, which is what makes the piece read as a document rather than an ad. CARD 1 is pure type on cream, the single most important frame: the hook set large with a lot of space around it — 'a word can be argued about. a description is either true or it isn't.' — with only the words 'a description' in #73B2C9. No product, no logo, nothing else on the card. CARD 2 is type again, smaller, two stacked blocks: the top block states the week's question flat and unattributed — 'what counts as \"not ultra-processed\" is being written down for the first time. and somebody finally asked who wrote the advice.' — and the bottom block answers it immediately in the same size, no drum roll: 'ours reads: organic whole grain oats, filtered water, organic vanilla extract, sea salt. we wrote it. it hasn't changed.' Willa's Original sits small and label-forward in the lower-right corner of this card, about 15% of frame, the only product on a type card in the whole set. CRITICAL: nothing on card 2 names a state, a bill, a court, an agency, a seal or a certification programme, and nothing implies Willa's is seeking or awaiting one. CARD 3, PHOTOGRAPHIC, the groat: overhead, very close, a small white bowl of dry whole oat groats on bare counter with a spoon resting in them, shot tight enough that the individual kernels have texture and shadow — this must read as a real grain, not as a beauty shot. Navy overlay set low-left in two short lines: 'the whole oat groat goes in.' / 'the whole kernel — before anybody rolls or strips it.' CARD 4, PHOTOGRAPHIC, the contrast: same bowl of groats now sitting beside a clear glass of Willa's Original poured and settled, both objects in one wide-ish frame with the carton standing behind them, label readable. This is the only card allowed to describe what other oat milks do and it does it as a caption, not as an attack. Navy overlay, three short stacked lines with the third in #73B2C9: 'most oat milks filter the bran and the germ off,' / 'then process what's left of the starch into sugar — the protein and the fiber leave with them.' / 'ours stay.' CARD 5, PHOTOGRAPHIC, the four lines: a straight-down shot of the Willa's Original carton lying flat on the counter, ingredient list side up and fully legible, one hand resting at the edge of frame but not pointing and not tracing — no finger following the lines, that gesture is worn out. Four navy ticks set beside the carton, one per line, stacked and left-aligned: 'organic whole grain oats ✓' / 'filtered water ✓' / 'organic vanilla extract ✓' / 'sea salt ✓'. Beneath them, one quiet blue line: '4g+ protein · 2g+ prebiotic fiber · 1g sugar'. CARD 6 is the end card and it is deliberately the plainest thing in the set: cream ground, navy type, no photograph, no motion cue, no sting. The certifications listed as a simple stacked run — 'USDA Organic · Non-GMO Project Verified · Kosher · Vegan · WBENC women-owned' — set small and matter-of-fact, listed and not defended, with no badge lock-ups, no seal graphics and no shields. Under it, larger, the stinger: 'four ingredients. read 'em.' Willa's wordmark bottom-centre. NEVER on any card: any residue-testing claim, any third-party-testing phrasing, any verification or who-checks-this argument (AUG31-TT-1 and AUG31-TT-3 own that lane this week), any competitor carton or wordmark in frame, any seal or badge artwork, any news imagery, any screenshot of an article, any headline. If a card can be read as a rebuttal rather than a description, re-set it.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for the next time someone asks you what 'ultra-processed' is supposed to mean.", medium:"read the four lines on a carton of Willa's Original — then read what we don't do to them.", strong:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. the whole oat groat goes in, nothing gets filtered out and nothing gets built back in. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar. USDA Organic, Non-GMO Project Verified, WBENC women-owned."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"AUG31-PIN-3",
    platform:"Pinterest",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Sat Sep 5 · 11am",
    priority:"STANDARD",
    concept:"\"most of this bag is sunscreen.\" — the weekend tote, packed",
    intel:[
      {type:"TREND", text:"T-5 (grocery e-commerce search data published Aug 28, 2026): on the largest grocery platform, first-half 2026 queries containing 'fiber' rose 26.4% year over year against 'protein' at 12.7% — fiber growing at more than double the rate of the claim that is already printed on pizza crust, noodles and cocktails. The reason the gap matters for a Kids pin: fiber cannot be bolted onto a formula the way a protein isolate can. It either survived the process or it did not, which is why the loud number is everywhere and the fast-growing one is almost nowhere. Willa's Kids carries 2g of fiber alongside 8g of protein and algae-sourced DHA omega-3s, and this is the only placement in the week where that combination is stated as a plain parent fact rather than argued. INTERNAL ONLY: not one search percentage, not the platform's name, not the word 'searches', and no retail, category-share or trade-press framing of any kind reaches the pin, the headline, the description, the hashtags or any caption variant — the searcher does not care what grocery analytics say and the moment a percentage appears the pin reads as a media plan. The consumer copy knows exactly one thing: most kids come up short on fiber and on DHA, and this carton brings both."},
      {type:"AUDIENCE", text:"Pinterest is a search surface with a long tail, not a feed, which makes this the one brief of the week that has to still work in March. The parent who finds it typed something close to 'what to pack for a picnic with kids' two to five days before a Saturday she has already decided to spend outdoors — which is why this pin publishes Sat Sep 5 at 11am into an already-warm query rather than chasing a same-day decision, and why the artwork carries no date, no holiday name and no seasonal styling that would strand it in one week of the year. What she is resolving is a real and boring problem: the bag is heavy, most of what is in it is sunscreen and packaging, and she would like one item in there to be worth its own weight. That is the entire emotional job of the pin and it is why the format is a tote emptied onto a blanket rather than a styled table — a flat-lay of a real spill is a packing list she can screenshot, and a screenshot is the Pinterest conversion. INTERNAL ONLY: the lead-time and save-decay reasoning is planning logic and never becomes copy. Also internal and absolute — BACK-TO-SCHOOL IS CLOSED after four straight weeks (Jul 27 – Aug 17): no backpack, no lunchbox, no classroom, no first-week-back framing, no 'pack it for the week ahead' in any field of this brief. This is the weekend tote and nothing else."},
      {type:"COMPETITOR", text:"Kids RTD sub-lane read, posture only, no linked competitor card for this brief. The shelf Willa's Kids sits on sells to the child on the front of the package and to the parent only in the fine print: the nearest organic peer carries 8g protein and 3g fiber on 9g of cane sugar, another lands 5g fiber and 8g protein on 9g of rice syrup and agave, a third is 3g protein and not organic, and the category-leader's kids line runs 3g protein and 2g fiber built on oat syrup. Willa's Kids is 8g protein, 2g fiber, 6g of sugar from organic coconut sugar, DHA omega-3s from algae oil, plant-based calcium and vitamin D, free of the top 9 allergens, and 100 out of 100 on Yuka. The honest read is that fiber alone is not the differentiator — two peers beat the 2g and the category-leader matches it — so this pin must state the number plainly and never claim a fiber crown. What is genuinely unmatched is the combination: that fiber and protein arriving with algae DHA, organic sourcing and the top-9 allergen status on a portable 8oz carton. INTERNAL ONLY: no competitor is named, implied, shown, or referenced in the pin, the description, the overlays or the hashtags, and no competing kids drink, juice box or pouch appears anywhere in frame. No comparison language of any kind and no promo, price, deal or stock-up framing — ever. The only comparative claim permitted here is the verified dairy one: same protein as dairy, half the sugar."},
      {type:"TREND", text:"ACCURACY CORRECTION — this brief (and CLAUDE.md's Flavor Database entry for Kids) stated 3g fiber and 'organic maple syrup' as the Kids sweetener. Verified against the live product page (willaskitchen.com/products/kids-oat-milk-8z-16-pack) plus two independent Amazon listings for the same 8.25oz/16-pack SKU (Aug 31, 2026 – Sep 2, 2026 checks): Willa's Kids is 8g protein, 2G FIBER (not 3g), sweetened with ORGANIC COCONUT SUGAR (not maple syrup) — half the sugar of dairy milk. The 3g-fiber figure appears to belong to Willa's Kids CHOCOLATE (a separate SKU, confirmed 3g fiber / 11g maple sugar on its own listing), not plain Kids. Corrected in every field of this brief (intel, hooks, caption, all 3 captionVariants, the on-artwork kicker text, and both CTA lines). This number is baked into CLAUDE.md's Flavor Database ('Kids: ... 3g fiber') and the Verified Facts / Proof Points library and should be corrected there and re-checked against any other Kids brief this week or in spine.json/the Monday Memo that cites '3g fiber' or 'organic maple syrup' for plain (non-Chocolate) Kids."}
    ],
    hooks:[
      {text:"what to pack for a picnic with kids — and the only thing in here with fiber in it", recommended:true},
      {text:"most kids come up short on fiber. this one carries 2g of it to the park.", recommended:false},
      {text:"sunscreen, hats, cut fruit, and the two cartons doing the actual work.", recommended:false}
    ],
    caption:"Everything that goes in the bag for a day outside, and most of it is sunscreen. ☀️🧺\n\nWhat's in the tote\n- sunscreen, and then more sunscreen\n- two hats, one of which comes home\n- a paperback nobody is going to finish\n- a bag of cut fruit and a bag of pretzels\n- the blanket that lives in the trunk\n- one small ice pack\n- two 8oz cartons of Willa's Kids\n\nMost kids come up short on fiber and on DHA. Willa's Kids carries 2g of fiber, 8g of protein and algae-sourced DHA omega-3s — the omega-3 you would normally get from fish oil — which is the whole reason it earns the space in a bag this full. Same protein as dairy with half the sugar, and free of the top 9 allergens, which is the part worth knowing when there are other people's kids on the blanket.\n\nIt also tastes like something they will ask for twice, and that is the only reason anything gets packed a second time.\n\nMost of this bag is sunscreen. The carton is the part doing something.",
    hashtags:[
      "#willas",
      "#willaskids",
      "#picnicwithkids",
      "#picnicideas",
      "#kidssnackideas",
      "#dairyfreekids",
      "#top9allergenfree",
      "#oatmilk",
      "#familypicnic",
      "#cleaningredients"
    ],
    visual:"Vertical 2:3 pin, 1000×1500, built as ONE overhead flat-lay photograph with one headline and one small kicker over it — no grid, no numbered list graphic, no recipe card, no arrows, no badge cluster, no save-this sticker. THE SHOT: a heavy cotton canvas tote, sun-faded and clearly owned rather than bought for the picture, tipped over onto a woven picnic blanket on real grass, with its contents spilled out in a loose diagonal from the bag mouth toward the lower-left of the frame. Shoot straight down from about four feet on a 35mm equivalent, f/5.6 so the whole spill stays sharp edge to edge, camera perfectly level — an overhead that is even slightly tilted reads as a stock flat-lay and this one has to read as somebody's actual afternoon. LIGHT: real outdoor sun, late morning or the hour before it gets harsh, with open shade from a tree edge falling across the top-right corner of the blanket so there is genuine dappling and a real shadow under the tote handle. No scrim, no reflector, no fill flash, no HDR flattening — hard-ish daylight with honest contrast is the point, and a completely evenly lit version of this frame will look like a catalog. WHAT IS IN THE SPILL, exactly: a bottle of sunscreen with the cap actually off and lying beside it, a second smaller sunscreen stick, two kids' sun hats (one straw, one washed-out cotton), a paperback face-down with a creased spine, a clear container of cut fruit — melon, grapes, strawberries — a bag of pretzels, a small blue ice pack, a set of car keys, and TWO 8oz Willa's Kids cartons standing UPRIGHT and unmistakable at the mouth of the tote where the eye lands first. The cartons are the only two objects in the frame standing up; everything else lies flat. That single staging decision is what makes the joke land without a word of copy explaining it, so do not let an art director lay them down for composition. PRODUCT PLACEMENT, non-negotiable per the visual-competition rule: both cartons face label-forward, wordmark unobstructed, lit not shaded, and positioned in the upper-middle third so a screenshot cropped to the food still contains them. Shoot a second pass with a hand reaching in to lift one carton out of the bag, hands only, no face, plain neutral sleeve — that is the alternate pin if the flat-lay reads too composed. PALETTE: sun-bleached canvas, blanket in warm cream and rust stripes, real green grass, the fruit doing all the colour work. Type is navy #202A44 over a cream #FAFAF7 negative-space block, with a single thin rule in the Parenting brown #9E652E under the headline. TOTAL COPY ON THE PIN IS TWO LINES. Upper third, large and set tight, on clean blanket where nothing competes with it: 'MOST OF THIS BAG IS SUNSCREEN.' Bottom edge, small mono kicker: '2g fiber · 8g protein · DHA from algae.' That is the entire typographic content of the pin. If a third line of copy appears anywhere on the artwork the brief has failed. The BS-5 stinger — same protein as dairy, half the sugar — is reserved for the alternate crop and the Idea-Pin cutdown, never stacked onto the hero. HARD SET RULES: absolutely NO backpack, NO lunchbox, NO bento tray, NO classroom, NO school bus, NO pencil, NO notebook and nothing that reads as a school morning — this is a weekend bag on grass and the whole brief dies if a single school signifier is in frame. No competitor kids drink, no juice box, no pouch, no dairy of any kind anywhere on the blanket. No sale sticker, no price tag, no promo card. No children and no adults in frame beyond the one hands-only alternate; the objects tell the story. Shoot a horizontal safety of every setup for the IG crop, and one tighter three-quarter frame of just the two cartons against the blanket weave in case the pin needs a clean product still six months from now.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save it for the next bag you have to pack.", medium:"two 8oz cartons of Willa's Kids — 2g fiber, 8g protein and algae-sourced DHA, in a bag that is otherwise mostly sunscreen.", strong:"Willa's Kids: 8g protein, 2g fiber, DHA omega-3s from algae, plant-based calcium and vitamin D, free of the top 9 allergens — same protein as dairy with half the sugar."},
    benefitShorthandId:"BS-5"
  },
  {
    id:"AUG31-IG-R4",
    platform:"Instagram Reel",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Sat Sep 5 · 12pm",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"the weekend nobody had to pack for.\" — one table, one long morning",
    intel:[
      {type:"TREND", text:"T-3: the Sep 5–7 long weekend is forecast as the most expensive on record — average domestic round-trip airfare up 2% to roughly $750, domestic hotel bookings up 9%, international accommodations 12% more expensive year over year, road congestion peaking Thu Sep 3 (2–7pm) and Fri Sep 4 (noon–8pm), and Fri Sep 4 the single busiest rental-car pickup day of the period. Seattle, Orlando, Boston, Denver and New York lead the booked cities. Two facts make this brief: Sat Sep 5 and Sun Sep 6 fall inside the shipping window while the holiday Monday does not, and the same forecast that describes record travel also describes the roughly half of the country priced out of it. That half is hosting the last open weekend of summer with a full house and a fridge to fill, and no Willa's post has ever spoken to them. INTERNAL ONLY AND NON-NEGOTIABLE: not one number, price, airline, city, booking, forecast or travel reference from this signal may appear in the script, any overlay, the caption or any caption variant — no airport, no suitcase, no packing time-lapse, no rental car, no 'while everyone else is at the airport' comparison. The travel story is why the brief exists; the brief itself never mentions it. Also internal: nothing about a sale, a price, a deal or a holiday promotion, ever — that is retailer territory. LANE DISCIPLINE: three briefs share this T-3 anchor and none may restate another. This one owns the stay-home long weekend as a family argument. AUG31-PIN-1 owns the long-weekend table as food (the chowder) and AUG31-TT-6 owns it as mood with no argument in it at all. If a line here could sit on either of those, cut it. REPEAT GUARD: AUG24-TT-4 was also a Saturday-morning kitchen with Willa's Kids and a household at a table — that brief was about SPEED (kickoff at noon, a whole house fed by 9:15, one carton passed hand to hand). This brief must be its opposite in structure and in feeling: one locked frame, no pass-around, no cast of six, no efficiency, no end time. Slowness is the whole differentiator. Do not write a versatility piece — the week-of-mornings, four-uses montage is burned. Do not write school, backpacks, lunchboxes or a first week back — back-to-school is closed. Do not write gameday, tailgate or team colours — rested. Two phrasings were caught and removed in drafting and must not creep back: 'the grown-ups drink it too / poured one too' (AUG24-TT-4's punchline, one week old) and the AUG17-IG-R3 Yuka gloss wording ('the Clean Label App — it scans groceries and scores the ingredients'). The Yuka score stays as a two-second closing receipt only, never as this brief's payload — AUG17-IG-R3 already spent it as a payload on a Kids brief."},
      {type:"AUDIENCE", text:"The parent this reaches at midday on Sat Sep 5 opened her feed and watched everybody she knows leave. She is not sad about it and she does not want to be consoled about it — she made a reasonable call, she has a full house, and the thing she is actually looking at is a long unstructured stretch of time with kids in it and no reason to be dressed by a particular hour. The post that wins is not the one that reassures her; it is the one that films what she is already doing and treats it as the better plan without ever saying so. That is why the piece is a fixed frame and a slow morning rather than an argument: the persuasion is the pace. The carton earns its place by being the thing already on the table when the second breakfast happens, not by being demonstrated. INTERNAL ONLY: no shopper-psychology language, no 'in a world where,' no 'for the moms who,' and no broadening apology to non-parents — this is a parent brief and the week carries the balance. Register reference for the edit only: Partake Foods — warm, unapologetically parent-first, funny without performing, never sentimental, and never explaining itself to people it isn't for."},
      {type:"COMPETITOR", text:"C-1 (Aug 28, 2026) — context only, not a linked comp for this brief: the category leader began printing an advocacy argument across every carton it produces, an eleven-word / eighty-nine-word layout that turns the package itself into a billboard, on a pack whose ingredient deck already runs twelve lines. Read for this brief purely as posture calibration: the loudest carton in the category is now trying to be read, and the counter-move is a carton that does not need to be. On this table the product argues nothing, holds its position in frame, and lets a morning happen around it. INTERNAL ONLY: no brand name, no reference to any competitor's packaging, no 'while others print manifestos' comparison, and no packaging commentary of any kind reaches a consumer surface."}
    ],
    hooks:[
      {text:"no packing, no schedule, and breakfast whenever they wake up.", recommended:true},
      {text:"we filmed the whole long weekend from one chair.", recommended:false},
      {text:"some of the best weekends never leave the kitchen.", recommended:false}
    ],
    caption:"the long weekend at home is the underrated one. ☀️\n\nnobody sets an alarm. the first bowl of cereal happens somewhere around nine, the pancakes get decided on around eleven, and the same carton of Willa's Kids sits on the table through both — not because it's doing anything clever, but because nobody is going anywhere and there's nothing to clear the table for.\n\nthe kids pour it themselves, which is the only review that has ever counted. it's creamy, it tastes like something they'd ask for twice, and underneath that it's carrying 8g of protein, 3g of fiber and DHA omega-3s from algae — the omega-3 that usually comes from fish. free of the top 9 allergens too, which matters more than usual on a weekend when the kids at the table aren't all yours.\n\nwe didn't build it to be a treat and we didn't build it to be a supplement. we built it to be the thing that's already on the table on a morning that isn't in a hurry.\n\n(100 out of 100 on Yuka, the grocery-scanning app that grades an ingredient list.)\n\nthe weekend nobody had to pack for.",
    hashtags:[
      "#willas",
      "#willaskids",
      "#longweekend",
      "#slowmornings",
      "#familybreakfast",
      "#oatmilk",
      "#dairyfreekids",
      "#top9allergenfree",
      "#kidsnutrition",
      "#momsofinstagram"
    ],
    visual:"ONE LOCKED FRAME IS THE WHOLE BRIEF. Set a phone or camera on a tripod at seated eye height, vertical 9:16, framed on one real kitchen table — and never move it, never re-frame it, never pick it up. Every cut in the piece is a jump cut inside that identical frame, so the room is the constant and time is the only thing that changes. That is the entire craft idea and it is what makes this different from a household-in-motion piece: nobody leaves the frame because nobody is leaving the house. LOCATION: a lived-in kitchen, not a set and not a styled prop kitchen — a wooden or painted table with some history on it, mismatched chairs, a dish towel over a chair back, a plant that needs water, a window camera-left. Shoot the real arc of a morning: start around 8:30am and keep returning to the same tripod position until roughly noon so the light genuinely swings across the table instead of being faked with a lamp. LIGHT: window light only, one side, curtains open, no fill, no diffusion, no ring light — let the far side of the table fall off. Grade warm and slightly soft; this is the one brief in the week that is allowed to look tender. PALETTE: that daylight plus cream #FAFAF7 for the two text plates, navy #202A44 for type, and the Parenting brown #9E652E for the single nutrition tick line. Three colours, nothing else, and no colour on the food. CAST: two kids and one adult, plus a third kid if the household has one — booked as a cast household or a UGC creator family, NOT Christina, NOT any founder or cofounder, and NOT any founder's family member. Children may be fully in frame; the adult appears from the shoulders down only — hands, forearms, a sleeve, a mug being set down. No talking head, nobody performs, nobody looks at the camera, nobody is funny on purpose. PRODUCT PLACEMENT: one carton of Willa's Kids stands back-left on the table, label forward, and returns to that exact spot every time it's used — never left somewhere new, never restaged. A hand may lift it to pour and set it back down, matter-of-fact, the same way a hand would move a milk carton at a real table; that pour is the only reason it ever moves. It is never hero-tilted, never rotated to show the label to camera, never treated as a product being demonstrated or sold. Its whole job is to still be there in the last frame in exactly the position it held in the first. BLOCKING, in jump cuts inside the same frame: (1) the table nearly empty, early light long across the wood, two bowls and the carton; a small hand sets down a spoon. (2) cereal, then a child pouring Willa's Kids over it herself and slightly overfilling the bowl — do not correct this, the imperfect pour is the shot. (3) light has moved: a glass poured by adult hands, set beside a paperback lying face-down and open. (4) plates of pancakes, a jug of maple syrup, three sets of hands in frame at once, everybody eating rather than serving. (5) plates pushed back, crumbs, one fork on the table, sun now high and short — and the carton exactly where it started. (6) the first and only camera move in the entire piece: a slow four-second push toward the carton while the nutrition line ticks in lower third in #9E652E, one line, never stacked. END CARD: plain cream plate, navy type, no motion, no whoosh, no sting — 'the weekend nobody had to pack for.' — held, with the Willa's wordmark bottom-centre and one small line beneath it. HARD VISUAL BANS: no suitcase, no packing, no airport, no car keys, no map, no calendar, no clock face; no backpack, no lunchbox, no school supplies, no first-day anything; no team jersey, no televised game, no tailgate; no competitor carton, bottle or wordmark legible anywhere in frame at any point; no seasonal or holiday decoration; no sale sign, no price, no promotional graphic. Text on screen appears exactly twice — the opening plate and the closing plate — plus the single nutrition tick. Everything else is the table.",
    script:[
      {t:"0:00-0:04", vo:"the long weekend starts with nobody having to be anywhere.", onScreen:"no packing. no schedule."},
      {t:"0:04-0:09", vo:"first bowl, somewhere around nine. she pours it herself.", onScreen:""},
      {t:"0:09-0:13", vo:"the second glass wasn't for a kid. it sat there for an hour.", onScreen:""},
      {t:"0:13-0:18", vo:"pancakes around eleven, because that was the entire plan.", onScreen:""},
      {t:"0:18-0:21", vo:"nothing about it had an end time.", onScreen:""},
      {t:"0:21-0:25", vo:"eight grams of protein, three of fiber, omega-3s from algae, and free of the top nine allergens.", onScreen:"8g protein · 2g fiber · DHA omega-3s from algae · free of the top 9 allergens"},
      {t:"0:25-0:28", vo:"the weekend nobody had to pack for.", onScreen:"the weekend nobody had to pack for.  /  Willa's Kids — 100 out of 100 on Yuka, the grocery-scanning app that grades an ingredient list"}
    ],
    audio:"No trending sound. The bed is the room: record a long clean pass of real kitchen tone at the tripod position — spoons on ceramic, a chair dragging, the fridge, a kid talking indistinctly off-mic, birds through the open window — and let it run unbroken underneath every jump cut so the room stays continuous even though the time does not. That continuity is what sells the one-frame idea. Close-mic two pours separately at the table: the cereal pour and the glass pour are the only sounds allowed to be loud. Voiceover is a warm narrative read — one unhurried woman's voice at conversational volume, recorded clean in a quiet room and mixed slightly under the room tone so it lands as a thought rather than an announcement. It is brand voice, not a founder address: no 'I', no 'my kids', nobody introduces themselves, and Christina is not on camera or identified anywhere. Music, if used at all, is a single quiet instrumental at low level with no vocal and no drop — do NOT reach for a recent release or a charting track; the week's entertainment moment lives elsewhere in the slate and a recognisable song would pull this piece into a different lane. No sting, no whoosh on the end card, no sped-up edit, no ticking clock sound. Editor's note: hold a full second of pure room tone after 'nothing about it had an end time' before the nutrition line arrives — the pause is the argument, and scoring over it kills the whole brief.",
    duration:"0:28",
    cta:{soft:"save this for the next weekend you're staying put.", medium:"pour Willa's Kids — the one they pour themselves, on a morning with no end time.", strong:"Willa's Kids: 8g protein, 2g fiber, DHA omega-3s from algae, free of the top 9 allergens — and 100 out of 100 on Yuka, the grocery-scanning app that grades an ingredient list."},
    benefitShorthandId:"BS-8"
  },
  {
    id:"AUG31-TT-6",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Multi",
    dnaPattern:"meme-payload",
    timing:"Sun Sep 6 · 11am",
    priority:"STANDARD",
    concept:"\"nobody in this house had anywhere to be.\" — one unbroken walk downstairs",
    intel:[
      {type:"PULSE", text:"CP-8 (documented Aug 26, 2026): the seamless-descent illusion is running as one of the platform's live top formats — creators use camera angle and hard-cut transitions across staircases, escalators and doorways to fake a single continuous downward journey through spaces that have nothing to do with each other. There is no punchline, no dialogue and no reveal; the entire appeal is editing craft, and the rewatch happens because viewers go back to catch the seam. Ride the mechanic exactly and change only the destination: the descent ends on a pour instead of a gag. CP-10 (Aug 28, 2026) supplies the register — an archive collection released as a straight chronological line, sequenced rather than curated, quiet and unhurried and explaining nothing about itself. Together they define the assignment: this brief's only job is to be well-made and patient. INTERNAL ONLY: never reference the format, the trend, the report, the archive release or the artist on camera, in the caption or in any variant. The format is a shooting instruction and the record is a tonal reference — neither is a subject. Editor's test: if a first-time viewer can name every cut on the first pass, the illusion failed and the piece needs a re-cut, not a reshoot; if they can never find one, it reads as a stitched gimmick and loses the rewatch. The target is one findable seam and two they have to hunt for."},
      {type:"TREND", text:"T-3 (national travel forecast, Aug 31, 2026): the Sep 5–7 long weekend is forecast as the most expensive on record — average domestic round-trip airfare up 2% to roughly $750, domestic hotel bookings up 9%, international accommodations up 12% more expensive, road congestion peaking Thu Sep 3 and Fri Sep 4. Sat Sep 5 and Sun Sep 6 land inside this shipping window; the holiday Monday does not. The half of the country that is not going anywhere is the half nobody is filming, and by Sunday morning every feed is an airport gate, a rental car and a balcony. This brief is the counter-programme, and it wins by omission: no destination, no departure, no montage, nowhere to be. INTERNAL ONLY: no travel figure, no airfare, no booking statistic, no city and no 'while everyone else is at the airport' framing may reach any consumer surface — the forecast explains why an empty house at 11am on Sun Sep 6 reads as a relief rather than as nothing happening. LANE DISCIPLINE: this brief and AUG31-IG-R4 share the T-3 anchor and must never restate each other. IG-R4 owns the full house and the family argument; AUG31-PIN-1 owns the food. This brief owns mood and craft only — one empty staircase, one pour, one household of nobody. If a line here could sit on either of those two, cut it."},
      {type:"AUDIENCE", text:"The person reached at 11am on Sun Sep 6 has already scrolled forty posts of somewhere else. She is not looking for a reason to buy anything and she is emphatically not looking for a fifth argument from a food brand in one week — the slate has already spent Wednesday through Friday making them. What holds her is craft: a thing that is obviously made carefully, moves at the speed her morning is actually moving, and does not want anything from her. The retention mechanic is her own curiosity about where the cut is, which is a far stronger reason to watch twice than any claim would be. The persuasion is entirely associative — Willa's is the brand that was calm on the one morning nobody had to be anywhere. INTERNAL ONLY: no shopper-psychology language, no 'in a world where', no voice direction and no register description reaches the screen. The unhurried tone is executed, never announced. Register reference for the edit only: design-led ingredient brands whose quiet posts are their most rewatched — confident enough to say nothing, never precious, never an affirmation over a sunset."},
      {type:"COMPETITOR", text:"C-1 (reported Aug 28, 2026): the category leader converted its packaging into a global owned-media surface, printing an advocacy argument across every carton it produces — an eleven-word block against an eighty-nine-word block, on a pack whose own ingredient deck runs twelve lines. Read strictly as posture calibration and nothing else: the loudest available move in the category this week was to add more words to the carton, which is precisely the week for Willa's to ship one post with zero. Confidence here is the absence of an argument, not a quieter version of one — the piece does not hedge, does not explain and does not apologise for having no point. INTERNAL ONLY: no brand name, no campaign, no packaging critique, no word count, no politics and no 'some brands shout' framing may appear in the script, the caption, any variant, the hashtags or the comment thread. This entry exists to hold the nerve of the edit when someone in review asks whether the video should say something."},
      {type:"PULSE", text:"ACCURACY CORRECTION — the T-3 intel line originally read \"hotel bookings up 9%, international bookings up 12%\", which reads as a booking-volume claim. Verified against AAA's Aug 31, 2026 newsroom release (https://newsroom.acg.aaa.com/aaa-labor-day-travelers-face-higher-costs-and-heavier-traffic-wi/): the real figures are domestic hotel bookings up 9% and international accommodations 12% MORE EXPENSIVE (a rate/cost figure, not a booking-volume figure — AAA separately reports international travel bookings up ~104% and international AIRFARE down 4%, both different metrics that should not be conflated with the 12% hotel-rate figure). Corrected the intel text to say \"international accommodations up 12% more expensive.\" Also swapped the sole found[] citation from gantnews.com (which covers airfare + road congestion only) to the AAA newsroom release itself, since gantnews.com does not contain the hotel/international figures the brief's intel cites. This T-3 signal is shared with AUG31-IG-R4 and AUG31-PIN-1 (per the LANE DISCIPLINE note in this brief's own T-3 intel) — check both for the same imprecise phrasing and the same source gap."}
    ],
    hooks:[
      {text:"watch the stairs. there's a cut in there somewhere and you won't find it the first time.", recommended:true},
      {text:"no talking, no text, no point. one walk down and one pour at the bottom.", recommended:false},
      {text:"27 seconds of a house where nobody had to be anywhere. that's the whole post.", recommended:false}
    ],
    caption:"Nobody in this house had anywhere to be. Willa's Original, at the bottom of the stairs. 🌾",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#slowmorning",
      "#sundaymorning",
      "#seamlesstransition",
      "#onetake",
      "#longweekend",
      "#plantmilk"
    ],
    visual:"Vertical 9:16, one continuous descending move through a real lived-in house on a Sunday morning, built from five or six separate spaces hard-cut together so the whole thing reads as a single unbroken journey downward. The camera goes down and only down — it may pan, it may turn, it may lower, it never rises and never levels off, because the moment it climbs the illusion dies. Shoot handheld on a phone or a small mirrorless at somewhere between knee and hip height, gimbal off: this needs the small human wobble of a person actually walking, and a glassy stabilised glide will read as an ad. Shoot between 9 and 10:30am in real morning light, curtains open, no fill, no reflector, no LED, no LUT, no film grain, no vignette — grade only a gentle warm lift and leave the shadows where the house put them. Palette is whatever the house is: warm wood, white tile, cool light off a landing window, and the carton's own colour as the only saturated thing in frame. BEAT ONE, the top of the stairs: open cold, already in motion, camera low behind a pair of bare feet as the first step is taken. Dust in the light off the landing window. Nobody is awake and nothing has been tidied. BEAT TWO, the descent: follow the feet down the flight, the banister sliding through the top of frame, the camera dropping a step at a time at walking pace — do not speed-ramp this and do not shoot it at 60fps to slow later, it runs at 100%. SEAM ONE is hidden on the wipe past the newel post at the bottom of the flight: the post crosses the lens and on the other side of it the space is a hallway in a different part of the house, camera still lowering. SEAM TWO is hidden in the turn through a doorway where the floor changes from wood to tile — this is the seam most viewers will actually catch, and it stays catchable on purpose, because a viewer who finds one cut immediately goes back to hunt the others. SEAM THREE is hidden on a hand entering the bottom of frame. BEAT THREE, the kitchen: the descent continues down to the fridge, camera now near floor height as the door swings open — the shelf holds Willa's Original, Kids and Chocolate standing together and is visible for well under a second on the way past, no lingering, no hero light, no rack focus onto the labels. One ungloved hand takes the Original off the shelf, label incidental, no tilt and no rotation. BEAT FOUR, the pour: the camera keeps descending, down the face of the counter to a low surface — a stool, a coffee table, a bottom step — where a clear glass is already sitting. Shoot the pour slightly above the rim so the opacity reads, one unbroken pour, held through the settle. This is the only place the piece is allowed to slow down. BEAT FIVE, the last three seconds: the move finally stops. Static, locked, the full glass with the Willa's Original carton standing label-forward beside it in the morning light. That held frame is the only place the brand is legible, and it is legible because the carton is sitting there, not because anything was added to it. Cut on picture. TYPE: there is none, anywhere, at any point. No overlays, no lower thirds, no hook card, no ingredient ticks, no nutrition line, no end card, no baked-in wordmark, no TikTok text sticker, no on-screen caption. Turn OFF auto-captions in the upload flow — that toggle is by far the most likely way this guardrail gets broken by accident, and one auto-generated subtitle line undoes the entire brief. There is no benefit shorthand on this piece for the same reason; the stinger library is deliberately not used here. HARD PROHIBITIONS, check the house before the first take: no coffee cup, no mug, no espresso anything in any frame; no cereal bowl, no blender, no mixing bowl, no batter, no measuring cup and no cooking of any kind — the four-uses versatility argument is closed and the food belongs to the Pinterest pin. No second pour, no second glass, no second room revisited. No faces and nobody above the shoulders; one pair of feet and one hand is the entire cast, and no other person may appear, because the full house belongs to the Saturday Reel. No suitcase, no keys, no cooler, no packed bag, no car, no doorway to outside. No calendar, no clock face, no phone screen, no TV on or reflected. No team colours, no jerseys, no pennants, no holiday decor, no bunting. Nothing pumpkin, nothing orange-seasonal, no autumn styling of any kind. No dairy visible on the fridge shelf — no milk jug, no butter dish, no yogurt tub, no cheese — since the door is briefly readable. No alcohol anywhere including background bottles. CTA NOTE for the team: this post ships the SOFT cta only. The medium and strong lines exist for a comment reply or a story re-share and may never be burned into frame or added to the caption.",
    script:[
      {t:"0:00-0:04", vo:"No voiceover in this piece at any point, and none in any alternate cut. Shot direction: cold open already in motion, camera low behind bare feet at the top of a staircase as the first step lands. Handheld at knee height, gimbal off, real morning light from a landing window with dust visible in it. The frame is moving before the viewer has finished registering it.", onScreen:"(nothing — no overlay, no hook card, no text of any kind)"},
      {t:"0:04-0:09", vo:"No voice. Audio is the house: a bare foot on a tread, the small creak, the fridge somewhere below. Shot direction: follow the feet down the full flight at walking pace, banister sliding through the top of frame, camera lowering a step at a time. Runs at 100% — no speed ramp, no slow motion, no 60fps capture.", onScreen:"(nothing)"},
      {t:"0:09-0:13", vo:"No voice. SEAM ONE, hidden on the wipe: the newel post at the bottom of the flight crosses the lens and the hard cut lands inside the wipe. On the far side the space is a hallway in a different part of the house, camera still descending, same pace, same light direction. No transition sound, no whoosh — the post is the transition.", onScreen:"(nothing)"},
      {t:"0:13-0:17", vo:"No voice. SEAM TWO, the findable one: turn through a doorway where the floor changes from wood to tile, hard cut on the turn into the kitchen. Leave this seam catchable on purpose — it is the reason the video gets rewatched. SEAM THREE follows immediately, hidden on a hand entering the bottom of frame.", onScreen:"(nothing)"},
      {t:"0:17-0:21", vo:"No voice. Shot direction: descent continues to floor height as the fridge door swings open. Willa's Original, Kids and Chocolate are on the shelf together and pass through frame in well under a second — no lingering, no rack focus, no hero light. One ungloved hand takes the Original off the shelf, label incidental, no tilt, no rotation.", onScreen:"(nothing — the cartons are in frame but nothing is called out)"},
      {t:"0:21-0:25", vo:"No voice. The camera keeps descending down the face of the counter to a low surface where a clear glass is already sitting. One unbroken pour, shot slightly above the rim so the opacity reads, held through the settle. Close-mic the pour separately: the glug and the settle are the loudest sound in the piece and the only one that gets to be.", onScreen:"(nothing)"},
      {t:"0:25-0:27", vo:"No voice. The move stops for the first and only time. Static locked frame: the full glass with the Willa's Original carton standing label-forward beside it in morning light. Hold two seconds and cut on picture — no end card, no sting, no logo animation, no fade.", onScreen:"(nothing added — the carton label is simply readable in frame for the last three seconds)"}
    ],
    audio:"No voiceover and no on-screen text, so the track carries the entire piece — treat casting the audio as the most important decision in the brief. Target: a deep-cut, unhurried, warm archival-soul record, mid-tempo or slower, no build, no drop, no obvious hook, the kind of thing that sounds like it has been sitting on a shelf for thirty years. Under the track, keep the real house audible at a low level — a bare foot on a tread, the fridge compressor, the door seal, and then the pour, close-mic'd separately on the counter and mixed up so the glug and the settle are the loudest thing in the video. No sound design over the seams: no whoosh, no riser, no whip, no transition sting. If any cut needs a sound to sell it, the cut is in the wrong place. LEGAL / SOURCING FLAG, read before anyone picks a song: the archival release that inspired the register is a commercial master and cannot be used on a brand account. Pull the actual track from TikTok's Commercial Sounds library or a cleared production-music catalogue and match the FEEL — analogue warmth, room in the recording, an unhurried tempo — not the artist, the era-name or the title. Do not attach a trending audio to this post under any circumstances; a trend sound puts a clock on a video whose whole argument is that there isn't one. Editor's note: leave the last two seconds of the static frame either on the track's natural tail or on room tone alone. Do not fade the music out under the held glass — a fade reads as an ending, and this should read as somebody putting the glass down and walking off.",
    duration:"0:27",
    cta:{soft:"save this for the next morning you actually get to move this slowly.", medium:"Willa's Original — the pour at the bottom of the stairs.", strong:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt — 4g+ protein and 2g+ prebiotic fiber, because we use the whole oat groat instead of filtering the bran and germ out. Not one word of that is in the video, and it didn't need to be."},
    benefitShorthandId:null
  },
  {
    id:"AUG31-IG-R5",
    platform:"Instagram Reel",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Chocolate",
    dnaPattern:"on-pack-checklist",
    timing:"Sun Sep 6 · 12pm",
    priority:"STANDARD",
    concept:"\"it's a treat that's actually made of something.\" — Chocolate's function, said plainly",
    intel:[
      {type:"TREND", text:"T-7 (Aug 30, 2026): a one-year-old functional drink graduated out of a national grocer's rotating innovation program into permanent placement across the retailer's full footprint — 600+ doors, three awards, and a national buyer decision made inside roughly four months — and the post-show read from the Aug 18–20 Denver natural-products floor points the same way: the natural channel is clearing space for drinks that do a specific job, stated in one line. The read for this brief is not distribution, it is sentence construction. The winning move right now is a drink whose function is legible in one line, and Willa's Chocolate already has one it has never actually said out loud: real cacao, 5g protein, 3g fiber, in a glass that drinks like chocolate milk. So the brief says the function, once, in the plainest words available, and then stops talking. INTERNAL ONLY: no retailer, no competing brand, no distribution news, no buyer, no trade show, no award count belonging to anyone else, and no shelf-placement framing of any kind reaches the script, the overlays, the caption or any caption variant. LANE DISCIPLINE: TT-5 shares this T-7 anchor and owns the shelf as a physical place. This brief never films a store, never shows a cold case and never says the word shelf — it owns function as a flavour argument, poured on a counter. If a line here could sit under that store footage, cut it."},
      {type:"PULSE", text:"CP-9 (Aug 28, 2026): a band returned with its first record in eleven years — same three people, no reinvention pitch attached — and reviewers describe it as groove-led, laid-back and dreamy rather than urgent. The usable part is the tempo, not the record: eleven years off and still in no hurry is exactly the register a proven product should be presented in, and it is the pace Willa's long-form pieces are cut at and almost never get scored properly. Ride it as pace only. The pour is slow, the read is unhurried, nothing is rushed toward the end card, and there is no build and no drop. INTERNAL ONLY: never name the band, the album, the return, the eleven years, a music release or 'a song we love' on camera, in any overlay or in any caption, and do NOT license or lift the actual recording — the moment is a tempo instruction for the composer and the editor, nothing more. Note for the editor: if the cut ever feels like it is hurrying to get to the proof, slow it down rather than trimming it; the calm IS the confidence this brief is selling."},
      {type:"AUDIENCE", text:"The person this reaches on a Sunday afternoon is not shopping and is not researching — she is deciding whether the good thing in the fridge is allowed. Chocolate is Willa's most under-used SKU across the last six weeks precisely because the engine keeps treating it as a thing that needs defending, and the defence is what makes it read like a compromise. The relief here is permission plus one flat fact: it tastes like chocolate milk, and there is real food in it. Four short spoken lines and three ticks is the entire persuasion budget, and the second, smaller glass does more work than any of them — it says 'this is for whoever is in the house' without a single word about who that is. INTERNAL ONLY: no shopper-psychology language, no 'in a world where' framing, no permission-granting phrased AS permission-granting, and no voice direction on the surface — the warm-flat register is executed, never described. Register reference for the edit only: better-for-you said out loud in a normal human cadence, never a supplement-brand cadence, never earnest, never a nutritionist."},
      {type:"COMPETITOR", text:"Category posture read, unlinked context (Aug 28, 2026 reporting): the category leader has converted its packaging into an owned-media surface at global scale, printing a long advocacy block across cartons whose ingredient deck already runs twelve lines. Loud is now the category's default setting for how a carton argues. Willa's counter-posture is the opposite and this brief is where it gets executed: state one proof, flatly, one time, and let the pour carry the rest. That is why the Good Food Awards line appears exactly ONCE in the finished piece — on the end card — and exactly once in the caption, and is never repeated, never stacked with other awards or certifications, and never turned into a badge cluster. INTERNAL ONLY: no brand name, no packaging campaign, no climate framing, no politics, no twelve-line comparison and no 'they're shouting, we're not' commentary reaches any consumer surface. This is posture calibration for the edit, and it does not appear in this brief's linked competitor list."},
      {type:"TREND", text:"ACCURACY CORRECTION — This brief's T-7 intel and footage-inspo source note originally said the unnamed category's national buyer decision (BevNET, Aug 30, 2026) landed \"inside roughly three months.\" Verified timeline (BevNET + Modern Retail reporting): the brand's national KeHE launch was May 2026 and permanent Sprouts placement was effective September 2026 — roughly four months, not three. Corrected both mentions in this brief to \"roughly four months.\" Check the main TRENDS[T-7] entry in index.jsx and any other AUG31 brief referencing this same timeframe (e.g. AUG31-TT-5, which shares this T-7 anchor) for the same three-month error before ship."}
    ],
    hooks:[
      {text:"you can just have the chocolate milk.", recommended:true},
      {text:"it's a treat that's actually made of something — real cacao, 5g protein, 3g fiber.", recommended:false},
      {text:"this one won an award for how it tastes. that was always the first job.", recommended:false}
    ],
    caption:"The treat is the point. It's just also real. 🍫\n\nWilla's Chocolate is real cacao, 5g protein and 3g fiber, and it still tastes the way chocolate milk is supposed to taste — because tasting good was the first job and everything else came along behind it.\n\nnothing was added to put the protein and the fiber there. an oat arrives with both. Willa's keeps both, because we use the whole groat — the oat with the kernel intact, nothing stripped off — while most oat milks strip both back out and don't bring it up.\n\nit's a treat that's actually made of something.\n\nthe Good Food Awards named Willa's Chocolate Best Beverage. we'll say that once and go back to pouring it.\n\ntall glass, small glass, three in the afternoon, no occasion necessary.",
    hashtags:[
      "#willas",
      "#willaschocolate",
      "#oatmilk",
      "#chocolatemilk",
      "#organicoatmilk",
      "#realcacao",
      "#goodfoodawards",
      "#dairyfree",
      "#cleaningredients",
      "#plantmilk"
    ],
    visual:"Vertical 9:16, one kitchen counter, one carton, two glasses, no faces — the whole piece is hands and light and a slow pour, and the only reason it works is that nothing in it hurries. Shoot late afternoon, roughly 3 to 4pm, on a real counter with low warm window light raking in from camera left so the glass throws a long soft shadow across the wood and the cacao colour reads dark and glossy rather than muddy. No diffusion, no reflector, no gels, no filter, no colour grade toward orange — this is warm because the hour is warm, not because it was pushed. Camera is locked on a tripod at glass height for every frame except one; there is no handheld, no gimbal move, no push-in, no rack focus and no slow-motion anywhere in the piece. PALETTE: pale wood and cream (#FAFAF7) as the ground, navy (#202A44) for every word of type, and purple (#A191B2) for the three tick marks and nothing else — one accent colour, used three times, never on a full line. SHOT 1 (3s, locked, glass height): a tall clear glass, empty, and beside it a second smaller glass, also empty, with the Willa's Chocolate carton standing label-forward slightly behind and to the right, a little soft. Nothing is happening. The hook drops on a cream bar low in frame, navy, sentence case: 'you can just have the chocolate milk.' Room tone only — no VO on this beat, and the stillness is doing real work, so do not trim it to two seconds. SHOT 2 (the hero, locked, same height): one ungloved hand lifts the carton and pours the tall glass in a single unbroken take until it is about four-fifths full. Shoot at 60fps but cut at 100% — no ramp, no slow motion, no ASMR gloss. The stream has to stay opaque the whole way down; if it thins out or breaks, that take is dead. Keep the small imperfection where the pour first hits the side of the glass. As it fills, the function ticks type on one at a time, entering from the left in the lower third, half a second between each, purple check plus navy line, never stacked more than three deep and never crossing the glass: 'real cacao ✓' → '5g protein ✓' → '3g fiber ✓'. All three hold together for a full second. CRITICAL, THIS IS THE LANE LINE: these ticks are the FUNCTION, never the ingredient list. Do not type the six ingredients, do not build a list that counts itself, do not put a number on the screen next to the word 'ingredients', and do not flip the carton to the back at any point — the ingredient-list-as-typography beat belongs to the sibling Chocolate Reel this week and the two must not look like a set. SHOT 3 (insert, locked, closer): the same hand pours the second, smaller glass beside the tall one, half the height, unhurried, and sets the carton down label-forward without rotating or tilting it. No type at all on this beat. This is the warmest shot in the piece and it says who this is for without naming anybody — do not add a person, do not add a second pair of hands, and do not stage a child, a chair, a booster seat or a small sweater anywhere in frame. SHOT 4 (the one moving frame, 3s): a single slow tilt down the side of the tall glass, top to base, top-lit so the surface catches and the body stays dark. One navy line beside it in sentence case, and this is the only line of the piece that explains anything: 'the whole groat — the oat with the kernel intact, nothing stripped off.' SHOT 5 (wide, framed IDENTICALLY to shot 1 — same crop, same eye line, same light): both glasses now full, the carton where it was set down, the shadow a little longer. Hold it. No type. Tape the tripod position so this match-cuts cleanly against shot 1, because the two frames doing the same job with the glasses filled is the whole argument made without a word. END CARD: plain cream (#FAFAF7) card, navy type, no motion, no whoosh, no sting — the BS-9 stinger, 'Best Beverage of the year. Real cacao.' — held 1.5 seconds with the Willa's wordmark bottom-centre. The award appears EXACTLY ONCE in the finished piece, here, and nowhere else: not in an overlay, not in the VO, not as a badge, not as a laurel graphic, and never stacked with a certification mark, a Yuka score or a second award. HARD PROHIBITIONS, check the props table before the first take: nothing on this counter may read as breakfast or as a daily routine — no cereal bowl, no oatmeal, no toast, no coffee cup, no fruit plate, no morning light, no cutlery set out. Nothing may read as school — no backpack, no lunchbox, no thermos, no bento, no pencil case, no calendar. Nothing may read as a store — no shelf, no cold case, no price tag, no shelf-edge label, no receipt, no multipack. No dairy anywhere in frame: no butter dish, no cream, no yogurt, no whipped topping. No dessert styling: no chocolate shavings, no syrup drizzle, no cookies, no marshmallows, no brownie, no cocoa dusting, no straw with a curl in it. No other brand's packaging in frame, including out of focus. No comparison of any kind: no second glass of anything that is not Willa's, no split screen, no red X, no crossed-out anything, no gram counts, no sugar number on screen in any form. TYPE RULES: sentence case, single lines, never more than three lines on screen at once, no motion graphics, no counting animations, no charts, no arrows, no badge cluster, no laurels. If a frame looks like a supplement ad or an infographic, reshoot it plainer.",
    script:[
      {t:"0:00-0:03", vo:"(no line — room tone only, two empty glasses, the carton behind them)", onScreen:"you can just have the chocolate milk."},
      {t:"0:03-0:07", vo:"it's a treat. it's also made of something.", onScreen:"real cacao ✓"},
      {t:"0:07-0:11", vo:"real cacao. five grams of protein. three grams of fiber.", onScreen:"real cacao ✓  ·  5g protein ✓  ·  3g fiber ✓"},
      {t:"0:11-0:15", vo:"none of that got added in. it's the whole oat.", onScreen:"the whole groat — the oat with the kernel intact, nothing stripped off"},
      {t:"0:15-0:19", vo:"tasting good was the first job. the rest came along behind it.", onScreen:"(no type — the second, smaller glass fills)"},
      {t:"0:19-0:22", vo:"(no line — hold on both full glasses, then the card)", onScreen:"Best Beverage of the year. Real cacao."}
    ],
    audio:"No trending sound, original audio. VO is the cofounder-sister, voice only, never on camera — this is the People-on-Camera substitute the humour library sanctions, so the warmth has to come entirely off the read and Christina's on-camera slot is not spent here. Four short lines, recorded separately in a quiet room at conversational volume and mixed slightly under the bed so it sounds like somebody in the kitchen rather than an announcer. She reads FLAT and unhurried — no lift on 'five grams of protein', no smile pushed into 'treat', no sell on the last line. If the read sounds like a supplement ad, it is wrong; if it sounds like a person telling you what is in the glass while she pours it, it is right. Bed: one warm, groove-led instrumental at low volume — brushed drums, upright bass, a little organ, unhurried, no vocal, no build, no drop, nothing that arrives anywhere. Composer's tempo reference only, never licensed or lifted and never named on any surface: the laid-back psychedelic-soul register of the Aug 28, 2026 return record in this week's pulse — eleven years off and still in no hurry. Close-mic the pour separately on the counter and let it be the loudest thing in the piece: the glug, the settle, the second smaller pour. Editor's note: leave a full silent beat after 'the rest came along behind it' with both glasses full and nothing happening — that pause is the confidence, and any swell, chime, tick or whoosh over it kills the whole register. The end card gets no sting either; it lands in the same room tone the rest of the piece lives in.",
    duration:"0:22",
    cta:{soft:"save this for the next time you talk yourself out of the good glass.", medium:"pour Willa's Chocolate — real cacao, 5g protein, 3g fiber, and it still tastes like chocolate milk.", strong:"Willa's Chocolate: real cacao, 5g protein, 3g fiber, and the whole groat behind all of it — the oat with the kernel intact, nothing stripped off. pour it tall or pour it small."},
    benefitShorthandId:"BS-9"
  }
];


// ─── Stable IDs for threading ─────────────────────────────
TRENDS.forEach((t,i)=> t.id = "T-"+(i+1));
COMPETITORS.forEach((c,i)=> c.id = "C-"+(i+1));
AMBASSADORS.forEach((a,i)=> a.id = "A-"+(i+1));

// ─── Agent registry ───────────────────────────────────────
const AGENTS = [
  {id:"trend",name:"Trend Scanner",role:"Surfaces cultural conversations from TikTok, IG, Reddit, news + trade press · ~95 sources now keyed to Willa's via the multi-tenant Supabase pipeline",lastRun:"3m ago",signals:512,color:"#73B2C9",lead:"Strategy"},
  {id:"comp",name:"Competitive Radar",role:"Tracks every move from Oatly, Califia, Planet Oat, Chobani, Elmhurst, Mooala",lastRun:"6m ago",signals:92,color:"#DC2626",lead:"Strategy"},
  {id:"pulse",name:"Cultural Pulse Tracker",role:"Listens across cultural sources for the riff-able moments — music drops, TV peaks, meme velocity, archetype waves",lastRun:"3m ago",signals:241,color:"#A191B2",lead:"Strategy"},
  {id:"editor",name:"Cultural Editor",role:"Kills signals that don't connect to a pillar — protects taste. Automated brief-repeat audit (Step 7 #26) now live as guardrail.",lastRun:"2m ago",signals:469,color:"#64748B",lead:"Strategy"},
  {id:"composer",name:"Brief Composer",role:"Turns surfaced intel into shootable briefs with hooks, scripts, and visuals",lastRun:"14m ago",signals:13,color:"#75C596",lead:"Creative"},
  {id:"hook",name:"Hook Writer",role:"Drafts hook variants and writes captions in the brand voice (3 caption variants per brief: direct / warm / punchy)",lastRun:"14m ago",signals:39,color:"#9E652E",lead:"Creative"},
  {id:"visual",name:"Visual Director",role:"Writes shot lists, footage direction, and visual references · 4 categories per brief (shoot/found/memes/archive)",lastRun:"14m ago",signals:52,color:"#0EA5E9",lead:"Creative"},
  {id:"amb",name:"Ambassador Finder",role:"Identifies high-fit creators already aligned with Willa's brand pillars",lastRun:"11m ago",signals:181,color:"#A191B2",lead:"Media"},
  {id:"paid",name:"Paid Media Planner",role:"Allocates paid spend across Meta, TikTok, and Pinterest by amplifying organic winners",lastRun:"12m ago",signals:3,color:"#EC4899",lead:"Media"},
  {id:"perf",name:"Performance Analyzer",role:"Measures every shipped post vs baseline · feeds learnings into next week's briefs",lastRun:"55m ago",signals:12,color:"#14B8A6",lead:"Analytics"}
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
  {icon:"↑", title:"\"the claim comes from us. the number doesn't.\" opens the week Wed Sep 2 at 9am — Christina to camera, a lot code on the counter, one pour.", reason:"Two enforcement files moved inside seven days, Aug 25 and Aug 27, and both were moved by a third-party lab result rather than a sentence on a package. That is the standard Willa's already meets — organic oats, glyphosate residue tested lot by lot, measured by somebody who does not report to us — and it is the one argument in the aisle that a competitor cannot answer by rewriting copy. It earns the first of two founder slots because the payload is a stance rather than a fact, which is the documented exception to hands-over-faces. Hard lines: no agency, no state, no docket, no ingredient category, no percentage, no brand in script, overlay or caption; no badge or seal montage, because the certification lane is on a long rest and this is a lab-result brief; and no scope claim about being the only brand that does this, and no claim that Willa's paid for the test — both are flagged unverified.", agent:"trend"},
  {icon:"↑", title:"September gets split into three shapes that share nothing — \"the reset didn't survive. the pour did.\" as the claim, \"eight of these take a plan. one of them just takes a carton.\" as the joke, \"nobody has to win september.\" as the question.", reason:"An Aug 28 survey found 21% of adults aiming their September reset at eating habits while 45% say the month feels no more motivating than January. The skeptic half being twice the believer half kills the overhaul pitch and makes generosity the only honest position — Willa's is on the side of the person who did not reset. Running one signal three times required three genuinely different jobs, so the Reel carries the emotional argument, the nine-square grid carries the joke with the answer withheld and the reveal held to a pinned comment, and the text-card carousel asks the audience instead of telling them. No line, hook or caption beat is shared between them. Guardrails across all three: no kids, no backpacks, no school year, no \"new season new you,\" no restriction, macro or calorie language, and the grid may not be built from ingredient lists or competing cartons — the count-the-lines shape is rested.", agent:"editor"},
  {icon:"↑", title:"The stay-home long weekend gets claimed for the first time, across three angles — \"the weekend nobody had to pack for.\" · \"nobody's going anywhere, and the corn is at its best.\" · \"nobody in this house had anywhere to be.\"", reason:"The Sep 5–7 weekend is forecast as the most expensive on record, and Sat Sep 5 and Sun Sep 6 both fall inside this ship window while the holiday Monday does not. Every feed that Saturday is an airport and a hotel balcony, which leaves the house with a full table completely unowned — and the brand has never posted into it. The Saturday Reel is Kids doing three jobs across two generations, warm and unapologetically parent-first. The Wednesday pin is a dairy-free sweet corn chowder built on two full cups of Barista, which is in the pot for structural reasons only, because it is the fullest-bodied carton and holds in a hot pot without splitting. The Sunday closer has no argument in it at all. Absolute lines: no travel montage, no packing shot, no tailgate, no school, no Labor Day sale framing, no price or promo language anywhere, and no coffee reference in the chowder pin — Barista is capped this week.", agent:"composer"},
  {icon:"↑", title:"Chocolate finally gets three real slots in one week — and each one has a different job, with the ingredient list typed on exactly one of them.", reason:"Chocolate has been the most under-used SKU across the last six weeks despite being the Good Food Awards Best Beverage winner, and three separate lanes opened for it at once. The Thursday Reel is the sweetener argument told as a beauty piece: six ingredients typed in one at a time as the glass fills — filtered water, organic whole grain oats, organic coconut sugar, organic cacao powder, organic vanilla extract, sea salt — real cacao doing the flavour and a real sugar doing the sweetening, with no sucralose, stevia, monk fruit or sugar alcohol in it to have a long-term story about. The Friday pin cooks it into a stack of pancakes on a full cup, no cocoa powder shortcut. The Sunday Reel states its function plainly with the award mentioned once and never repeated. None of the three repeats another's ingredient-typography beat, none argues the sugar number, and none positions Chocolate as an everyday staple — it is the indulgent-remade-clean lane and stays there.", agent:"visual"},
  {icon:"↓", title:"Fiber ships as a joke and a parent fact rather than as a science lesson — the mainstream \"fibermaxxing\" explainer was refused and the demand story rebuilt on grocery search behaviour instead.", reason:"An Aug 28 syndicated explainer tying the viral fiber trend to fermentation research and the national fiber shortfall was the most on-brand-looking signal of the week and failed twice. The shape is burned — sardinemaxxing ran Aug 24, protein-maxxing Aug 10, savoury-maxxing in July, and a fourth -maxxing construction is wallpaper. And the fiber-science lane itself ran Aug 17 across four separate signals and is resting. What survived is the demand behaviour underneath it: first-half 2026 search shows fiber up 26.4% against protein's 12.7%, a framing that has never run here. It carries two briefs that make no mechanism claim at all — a true-crime kitchen hunt that ends on the carton in the fridge door, and a weekend-tote pin. Neither explains fermentation, gut metabolites or where fiber does its work, and neither cites a search percentage in consumer copy.", agent:"hook"},
  {icon:"↓", title:"Both competitor moves stay intel and neither becomes a lane — the carton-as-billboard campaign and the private-label seasonal latte are answered by declining them.", reason:"The category leader began printing a climate-advocacy block on every carton it produces, reported Aug 28, converting packaging into owned media at global scale on a pack whose ingredient deck runs twelve lines. Answering it directly would put Willa's in a reactive posture on somebody else's chosen ground, and the sustainability lane last ran Aug 10 and is available only with a non-Oatly peg — this is the most Oatly peg imaginable. The useful read is the surface, not the subject: the loudest packaging in the aisle is now arguing about something other than what is inside it, and Willa's counter is four lines that can be checked. Separately, a national discount grocer put its own oat-milk seasonal latte on shelf the week of Aug 31. A format that private label carries is a format that has stopped differentiating anybody, and it closes the seasonal-flavour argument for the rest of the autumn. Neither appears on a consumer surface.", agent:"comp"},
  {icon:"×", title:"The entire pumpkin wave went in the bin — the fall menu relaunch, the protein-claim seasonal latte, and the whole retail build-out — despite every piece of it being in-window and well-sourced.", reason:"Fall flavour season was last week's lead trend and drove two of its briefs, and the corpus closes seasonal turnover outright for this refresh: no pumpkin, no syrup, no fall menu, no \"our carton doesn't have a season,\" no end-of-summer shelf clear. The one genuinely new sub-thread — that every seasonal SKU carrying a protein claim is getting there through dairy — is blocked independently, because the protein-claim arms race ran Aug 24 and Aug 17 and is two-deep. Nothing survived. It is held only as background inside the private-label competitor read, where the point is to decline the format rather than ride it, and the fact that Sept 1 is the first day of meteorological fall changes none of that: the arrival of the season was the story, and the story already ran.", agent:"editor"},
  {icon:"×", title:"Two live top formats were killed on six-week adjacency rather than on freshness — a Post-it deduction game and an escalating confession-and-transform.", reason:"The deduction game was named a current top format on Aug 26 and had an obvious four-ingredient adaptation, which is exactly why it was tempting — but the imposter word game shipped one week earlier, and both are filmable party guessing games resolved by asking questions. A near-duplicate format a few weeks apart has slipped the gates before and this is that failure mode with the serial numbers filed off. The confession format failed twice over: its sourcing spans a July brief updated in August plus an Aug 26 roundup, which is continuing-signal language rather than a new development, and its mechanic is a physical appearance transformation between two people, which has no honest path to a carton and would put a talent ask on the brief layer. The two formats that shipped instead — a nine-square mismatch grid and a true-crime kitchen hunt — are structurally unrelated to each other and to the last six weeks.", agent:"pulse"},
  {icon:"⚡", title:"The calm rebuttal is carried by a dietitian rather than the founder — \"the honest answer is boring. we like it that way.\" spends an ambassador slot, not a Christina slot.", reason:"Both founder appearances this week are already committed and both are earned on stance: the lab-result brief Wed Sep 2 and the fats argument Fri Sep 4, where the position is that swapping one fat for another is not the same as not needing one and Original has no oil in it at all. That puts the on-camera count at two, under the cap. The mycotoxin headline needs a face for credibility but not a founder's — an ambassador in a real kitchen, hands on the carton, one steady take, three short answers, no chyrons and no stitched screenshots. The authority comes from being unbothered. The brief never states the scare number, never names the study, the country or the categories tested, and never implies other plant milks are contaminated, because panic is the thing being corrected. The queued door is a second ambassador in the September-routine lane once the news peg is gone.", agent:"amb"},
  {icon:"⚡", title:"Amplification follows durability rather than urgency — weight goes behind the long weekend and the two search pins, and the two policy-adjacent briefs run entirely organic.", reason:"Two of this week's strongest briefs sit next to an open federal comment window and a live state investigation, and paying to push a testing claim into cold comment sections is how a calm post becomes a fight — the organic version of both is the version that works. The largest share instead goes behind the Saturday family morning, because it is a genuine audience test in an occasion the brand has never bought into and the household it speaks to exists every weekend, not just this one. The chowder pin and the pancake pin take the longest flights on the smallest spend, because Pinterest saves are the only number on this board still compounding in March, after every news peg here is dead. No dollar figure, retailer or price reaches a consumer surface at any point.", agent:"paid"}
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
  total:22760,
  lift:61,
  sessions:1946,
  topRoiFormat:"In-store walk with the whole claim on screen in the first frame (peaked AUG 24 – AUG 30)",
  topRoiPerBrief:3140,
  source:"Shopify + Klaviyo"
};

const AGENT_BY_ID = Object.fromEntries(AGENTS.map(a=>[a.id,a]));

// ─── Brief ↔ source links (the threading) ─────────────────
const BRIEF_LINKS = {
  "AUG31-TT-1":{
    trends:[
      "T-1"
    ],
    pulse:[],
    comps:[
      "C-1"
    ]
  },
  "AUG31-PIN-1":{
    trends:[
      "T-3"
    ],
    pulse:[],
    comps:[]
  },
  "AUG31-IG-R1":{
    trends:[
      "T-4"
    ],
    pulse:[
      "CP-6"
    ],
    comps:[]
  },
  "AUG31-TT-2":{
    trends:[
      "T-4"
    ],
    pulse:[
      "CP-1"
    ],
    comps:[]
  },
  "AUG31-TT-3":{
    trends:[
      "T-1"
    ],
    pulse:[
      "CP-5"
    ],
    comps:[
      "C-1"
    ]
  },
  "AUG31-IG-R2":{
    trends:[
      "T-9",
      "T-6"
    ],
    pulse:[],
    comps:[]
  },
  "AUG31-IG-F1":{
    trends:[
      "T-4"
    ],
    pulse:[
      "CP-7",
      "CP-3"
    ],
    comps:[]
  },
  "AUG31-TT-4":{
    trends:[
      "T-5"
    ],
    pulse:[
      "CP-2"
    ],
    comps:[]
  },
  "AUG31-TT-5":{
    trends:[
      "T-7"
    ],
    pulse:[],
    comps:[
      "C-2"
    ]
  },
  "AUG31-PIN-2":{
    trends:[
      "T-9"
    ],
    pulse:[],
    comps:[]
  },
  "AUG31-IG-R3":{
    trends:[],
    pulse:[
      "CP-4"
    ],
    comps:[]
  },
  "AUG31-IG-F2":{
    trends:[
      "T-2",
      "T-8"
    ],
    pulse:[],
    comps:[]
  },
  "AUG31-PIN-3":{
    trends:[
      "T-5"
    ],
    pulse:[],
    comps:[]
  },
  "AUG31-IG-R4":{
    trends:[
      "T-3"
    ],
    pulse:[],
    comps:[]
  },
  "AUG31-TT-6":{
    trends:[
      "T-3"
    ],
    pulse:[
      "CP-8",
      "CP-10"
    ],
    comps:[
      "C-1"
    ]
  },
  "AUG31-IG-R5":{
    trends:[
      "T-7"
    ],
    pulse:[
      "CP-9"
    ],
    comps:[]
  }
};



// ─── Paid Amplify Plans (Paid Media Planner output) ──────
const AMPLIFY_PLANS = {
  "AUG31-IG-R1":{
    headline:"The September argument — the week's largest budget behind the post that lets people off the hook",
    why:"This is the biggest spend on the board and it is behind a video that argues with nobody. September gets sold as a second January, and an Aug 28 survey found that almost half of adults quietly feel nothing about it — which makes the generous position the unoccupied one. The creative is an elaborate reset that lasts nine days set against one glass poured over one bowl on an ordinary morning, with the payload ticked as specs rather than argued as a case. Three things make it the right place for the money. It needs no prior knowledge of the brand, so it works on a cold feed. It has no opponent, so it cannot be dragged into a fight in the comments. And nothing in it expires — the same asset reads correctly in October, which means a winner here becomes a standing evergreen rather than a post with a shelf life. No restriction language, no macros, no calories, no before-and-after imagery, and nothing that frames this as a plan anyone has to follow.",
    totalBudget:420,
    testWindow:"8 days (Wed Sep 2 → Wed Sep 9)",
    objective:"Profile visits + Saves",
    guardrail:"Auto-pause on any comment thread that turns into diet talk — calorie counts, macro debates, weight, or anyone's before-and-after. The entire value of this post is that it does not tell a person what to do, and one reply in that thread ends it. Also auto-pause if sentiment falls below 0.93 or CPM clears $11.",
    placements:[
      {platform:"Meta", format:"Reels + Stories, Advantage+ placements", budget:260, reach:"~19-25K reach", expectedReach:"~19-25K reach", audience:"Cold interest — organic grocery, label-reading shoppers, home cooking, women 27-50, US; plus 90-day site visitors", lookalike:"1% LAL of purchasers", note:"In plain terms: this is the introduction post for the fall. Most of the money sits on people who have never met the brand, because the whole argument takes twenty seconds and assumes nothing."},
      {platform:"TikTok", format:"In-feed Spark Ad", budget:160, reach:"~18-24K reach", expectedReach:"~18-24K reach", audience:"Cold interest — morning routines, clean label, grocery hauls, coffee-at-home, 24-44, US", note:"Spark the organic post rather than a fresh upload. Half of why this reads as true is the comment section full of people admitting their own reset did not survive, and a fresh upload throws that away."}
    ]
  },
  "AUG31-IG-R4":{
    headline:"The long weekend nobody had to pack for — buying an occasion the brand has never claimed, from the side nobody is filming",
    why:"Second-largest budget, and like the gameday test on the AUG 24 board it is buying an answer as much as reach. Sat Sep 5 and Sun Sep 6 are forecast as the most expensive long-weekend travel days on record, which means every feed that morning is an airport, a rental car and a hotel balcony — and roughly half the country is not going anywhere at all. That half has no content made for it. The creative is a real family morning with one carton of Kids doing three jobs across two generations, and it is deliberately shot to read the same on any Saturday rather than only on this one, because the AUG 24 – AUG 30 occasion test showed that a post welded to a single date stops earning the moment the date passes. The proof points sit lightly underneath and are never the subject. No travel montage, no airport, no packing shot, no school, no backpacks, no booking or price reference of any kind, and no deal language.",
    totalBudget:340,
    testWindow:"5 days (Fri Sep 4 → Tue Sep 8), weighted to Sat Sep 5 – Sun Sep 6",
    objective:"Reach + Saves",
    guardrail:"Auto-pause if the comments turn into travel-versus-staying-home, or into anyone's household budget — the post is warm about staying home and the second it reads as a judgement on people who left, it is a different post. Sentiment floor is 0.94, tighter than the rest of the board because there are children in frame. No allergen claim is ever made in a reply beyond what is printed on the carton.",
    placements:[
      {platform:"Meta", format:"Reels + Stories", budget:220, reach:"~15-20K reach", expectedReach:"~15-20K reach", audience:"Parents of kids 2-11, family meal planning, kids' nutrition, allergen-aware households, US; plus existing followers", lookalike:"1% LAL of Kids purchasers", note:"Weighted to Fri Sep 4 evening and Sat Sep 5 morning. A parent decides what a slow Saturday looks like the night before it happens, so the delivery curve matters as much as the audience definition."},
      {platform:"TikTok", format:"In-feed Spark Ad", budget:120, reach:"~13-17K reach", expectedReach:"~13-17K reach", audience:"Cold — family breakfast, feeding a full house, slow mornings, parents 28-45, US", note:"What this means for you: this is the half of the test that tells you whether this is a long-weekend result or just a Saturday-morning result. Same footage, different room, and only one of those answers recurs every week through the fall."}
    ]
  },
  "AUG31-TT-4":{
    headline:"The fiber hunt — one platform, one format, funded because it pays a viewer for rewatching it",
    why:"The only single-platform plan on the board, and the only one bought for completion rather than for saves. Grocery search behaviour in the first half of 2026 moved harder toward fiber than toward protein, and the joke writes itself: the hunt is theatrical, the answer has been sitting in the fridge door the whole time. A true-crime narration sweeps a kitchen full of bars, powders, gummies and sachets while the carton sits visible in the corner of frame one, and the payoff is engineered so people scrub back to confirm it was there. That rewatch is the entire reason this gets money — it is the one creative this week whose mechanic is measurably better on a second view, which is what makes it cheap to distribute in a cold feed. It ships as a spec tick, not a science lesson: no mechanism, no gut explainer, no search-volume figure in consumer copy, and no competitor product visible or named in the sweep.",
    totalBudget:290,
    testWindow:"6 days (Thu Sep 3 → Tue Sep 8)",
    objective:"Reach + 6-second video views",
    guardrail:"Auto-pause if the account replies to any comment with a health mechanism — the first explanation of how fiber works turns a joke into a debate the ad cannot win, and the brief is deliberately built without one. Also auto-pause if the drawer sweep starts reading as mockery of anyone's supplements: a pile-on there costs more than the reach is worth. Sentiment floor 0.92.",
    placements:[
      {platform:"TikTok", format:"In-feed Spark Ad", budget:290, reach:"~32-41K reach", expectedReach:"~32-41K reach", audience:"Cold interest — gut health, grocery hauls, kitchen content, true-crime and comedy viewers, 22-42, US", note:"No Meta split, on purpose. The format is TikTok-native and its retention depends on the scrub-back, which is a behaviour that surface rewards and the other one does not. Splitting the budget would make it average in two places instead of strong in one."}
    ]
  },
  "AUG31-TT-1":{
    headline:"The lab-result stance — funded for the first time, and deliberately warm audiences only",
    why:"The AUG 24 – AUG 30 board zero-funded a founder stance for the first time in the engine's history, and the result argued both ways: it out-travelled its non-existent budget on shares and comments, and it posted the week's lowest sentiment while doing it. The reading is that a stance is cheap to distribute to people who already know the brand and expensive to defend in a room that does not. So this refresh funds one, at the smallest budget on the board, with cold prospecting switched off entirely. The creative is a founder in her own kitchen making one plain observation about the gap between what a package claims and what a test finds, then a lot code set beside the carton and one unhurried pour. Nothing in it names an agency, a state, an ingredient category or a brand, and nothing in the targeting does either. Every dollar is pointed at people who have already watched something of ours, because they are the only ones for whom this reads as a position rather than an accusation.",
    totalBudget:180,
    testWindow:"7 days (Wed Sep 2 → Tue Sep 8)",
    objective:"Profile visits + Saves",
    guardrail:"Auto-pause the moment a thread names an agency, a state, a chemical or another brand — the post names none of them, and a reply that does hands the argument away. Sentiment floor 0.94, tighter than anything else on the board. Also auto-pause if comments-per-view clears twice the account's trailing median, which is what a fight looks like on the dashboard before it looks like one in the thread.",
    placements:[
      {platform:"Meta", format:"Reels + Stories, retargeting only", budget:180, reach:"~8-11K reach", expectedReach:"~8-11K reach", audience:"Warm only — 90-day video viewers, profile engagers, email subscribers and existing followers, US", note:"No lookalike and no cold interest layer on this one, and that is the whole design of the plan rather than a budget limitation. In plain terms: we are paying to make sure the people who already trust the brand see it say something, not to argue with strangers."}
    ]
  }
};
// No amplify for: MAY25-IG-R2 (seed-oil-free Christina moment — quiet authority, organic-first), MAY25-TT-2 (Shaved Fruit — viral format compounds organically), MAY25-TT-3 (Will-it-survive Barista flip — Pattern 03 plays better organic), MAY25-IG-R3 (long-weekend pour heritage — earned authenticity, Bleachers audio bed), MAY25-IG-R4 (Four Seasons S2 cultural-stitch — tonal-only, no name-check makes paid suspicious), MAY25-TT-4 (AI Food meme reveal — meme-payload plays better organic), MAY25-IG-F1 (state-by-state cert carousel — receipt-led editorial wins as earned media), MAY25-IG-R5 (cert moat Christina reveal — quiet posture, organic-first), MAY25-IG-F2 (back-to-school carousel — receipt-led editorial), MAY25-TT-5 / PIN-2 / PIN-3 / TT-6 / IG-F3 / TT-7 (all 6 evergreens — Pinterest SEO + at-shelf + heritage carousel all compound organically).// No amplify for: MAY11-TT-2 (Mother's Day retrospective — organic-first), MAY11-TT-3 (meme-payload — test ad only if organic climbs), MAY11-PIN-1 / PIN-2 / PIN-3 (Pinterest SEO compounds organically — autobiography wordplay pin earns its share rate on type alone), MAY11-TT-4 (The Bear-coded — earned authenticity wins without paid), MAY11-TT-5 (iced café crème — recipe SEO compounds), MAY11-IG-R5 (Saturday heritage — earned-authenticity), MAY11-TT-7 (mom-bag relatable confession — Pattern 03 plays better organic; Partake-style content compounds on saves), MAY11-IG-F2 (category data carousel — earned-media), MAY11-IG-R6 (real-food anti-isolate — receipt-led category POV).


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
  {date:"Aug 31, 2026", agent:"trend", msg:"Swept food policy, nutrition science, plant-milk retail, grocery search data and ag reporting against an Aug 24 recency floor. Ten trends cleared. The lead is unusual because it is two files, not one: a federal pesticide docket reopened for public comment Aug 25 with a Sep 24 deadline, and a state consumer-protection office opened an oil-claim investigation Aug 27. Different agencies, different ingredients, one mechanism — what moved both was a third-party laboratory result rather than a sentence on a package."},
  {date:"Aug 31, 2026", agent:"editor", msg:"Ran the published-versus-covered check on every study before it reached a card, and one of them changed a brief. An Aug 28 survey of plant-based products travelled as an alarming headline with its most important clause — that every measured level sat under guideline limits — amputated somewhere in the retelling. The rebuttal brief built on it is forbidden from stating the scare number, naming the study or naming a product category, because repeating a number in order to argue with it is how a brand spreads it."},
  {date:"Aug 31, 2026", agent:"pulse", msg:"Ran the format, food, discourse and entertainment lanes and cleared ten signals, each with a checkable live example. Two meme formats survived on completely different mechanics — a spot-the-mismatch grid documented Aug 26 that needs no audio, no script and no talent, and a true-crime narration whose whole joke is that the answer has been in frame since the first second. They were kept as a pair specifically because they cannot be mistaken for each other; four other live formats were passed over on adjacency to the last six weeks."},
  {date:"Aug 31, 2026", agent:"comp", msg:"Logged the competitive fronts in window. The one that matters was reported Aug 28: the category leader has started printing an advocacy message on every carton it produces, which strips down to a category leader converting its own packaging into owned media at global scale on a pack whose ingredient deck runs twelve lines. Internal intel only — nothing from the competitive read reaches a consumer surface, and the answer on our side is a four-line panel where every line is provable, never a louder carton."},
  {date:"Aug 31, 2026", agent:"editor", msg:"Rolled the burn corpus forward and closed three doors before the composer opened one. Back-to-school stays at zero for a third straight refresh — most districts are now in their first full week, which is the same door later, not a new one. Gameday is rested as a headline after it was claimed Aug 24 and may appear only as background texture. And the seasonal-turnover argument is declared spent: the reset that opened Aug 19 is finished and on shelf, so Sep 1 is a calendar fact this week, not a headline."},
  {date:"Aug 31, 2026", agent:"composer", msg:"Built sixteen briefs against a three-per-signal cap and opened the freshest unclaimed occasion on the calendar — the Sat Sep 5 to Sun Sep 6 long weekend, entered from the side nobody is filming. Every other feed that Saturday is an airport and a rental car; this slate belongs to the household whose entire weekend is a kitchen. The heaviest draw is three briefs on the September-reset signal, split so hard they share no copy at all: the sincere Reel, the joke grid, and a text-card carousel that asks a question instead of making a claim."},
  {date:"Aug 31, 2026", agent:"visual", msg:"Spent both reserved on-camera slots against a cap of three — the lab-result stance Wed Sep 2 and the fats answer Fri Sep 4 — and banked the third. Barista appears exactly once all week and deliberately nowhere near a coffee cup: it is in a hot pot as the cream in a sweet-corn chowder, chosen because it is the fullest-bodied carton and holds without splitting. Every Reel and TikTok carries a populated shot list for the phone mockup."},
  {date:"Aug 31, 2026", agent:"hook", msg:"Ran every recommended hook through the wordy-is-wrong test and cut the fats opener hardest. The draft explained the difference between one fat and another before it had earned the right to, which read as a lecture from a brand that does not sell oil. What survived is a single flat observation and a founder reading four ingredients out loud at normal speaking pace — no overlay racing ahead of her, and a last line that is generous toward anyone currently confused."},
  {date:"Aug 31, 2026", agent:"editor", msg:"Caught the one product error that would have been most expensive to publish. A draft of the chowder pin credited Barista's three grams of sugar to the oats — Barista is sweetened with organic coconut sugar, listed in the ingredients, and the only verified sugar claim it carries is the comparative one against other barista oat milks. Original is the carton whose single gram comes from the oat. A transparency brand getting its own label wrong is the one mistake it cannot spend its way out of."},
  {date:"Aug 31, 2026", agent:"amb", msg:"The reassurance brief Thu Sep 3 is delivered by a dietitian ambassador on camera rather than the founder, which is the point of having a roster. It answers the three questions actually sitting under the fear — who tests this, how often, and what the certificate says — in one steady take with hands on the carton, no chyrons and no stitched screenshots. It also buys back a Christina slot, so the second on-camera brief could go to stance Fri Sep 4 instead of being spent on defence."},
  {date:"Aug 31, 2026", agent:"paid", msg:"Amplification concentrates on four briefs and $1,230. The largest share goes behind the September argument, which has no opponent in it and stays true through October, and the smallest goes behind the founder stance — funded for the first time, but warm audiences only, with no cold prospecting and no lookalike. That is a direct response to the AUG 24 – AUG 30 read: a stance is cheap to distribute to people who already know the brand and expensive to defend in a room that does not."},
  {date:"Aug 31, 2026", agent:"perf", msg:"Rolled the AUG 24 – AUG 30 briefs into results. The front-loaded-claim finding held for a second refresh and now has a useful exception attached: a payoff visible from frame one still counts as front-loading even when the narration pretends otherwise, which is exactly how one brief this week is engineered. The Pinterest save-object pattern held for a fifth straight refresh, and the occasion test that ran on the paid board came back with a clear and slightly uncomfortable answer."}
];


// ─── Killed signals (the ones we said no to) ──────────────
const KILLED = [
  {signal:"The full pumpkin-spice wave — the Aug 25 national fall menu relaunch, a competing chain's 17g-protein pumpkin latte and creator-designed order, and the wider retail pumpkin build-out catalogued Aug 24", reason:"All in-window, all well-sourced, all dead on arrival. Fall flavour season was last week's lead trend and drove two briefs; the corpus closes seasonal turnover outright for this refresh — no pumpkin, no syrup, no fall menu, no \"our carton doesn't have a season.\" The one new sub-thread, that every pumpkin SKU carrying a protein claim gets there through dairy, is blocked independently because the protein-claim arms race ran Aug 24 and Aug 17 and is two-deep. Held only as context inside the private-label competitor card, where the point is to decline the format."},
  {signal:"\"Guess the Number\" — the Post-it-on-the-forehead deduction game named a current top TikTok format on Aug 26, 2026, with an obvious four-ingredient adaptation", reason:"Killed on the six-week format diff, not on freshness. Last week shipped the imposter word game as filmable content; both are filmable party guessing games resolved by asking questions, one week apart. The corpus warns explicitly that near-duplicate formats a few weeks apart have slipped the gates before, and this is that failure mode with the serial numbers filed off. The adaptation was good, which is exactly why it was tempting."},
  {signal:"\"I never told you this before\" — the escalating confession-and-transform format, still listed among top formats Aug 26, 2026", reason:"Two independent failures. The sourcing spans a Jul 30 brief updated Aug 19 plus an Aug 26 roundup, which is continuing-signal language — highlight those, don't re-brief them. And the mechanic is a physical appearance transformation between two people, which has no honest path to a carton; every version the engine could write is a founder or team member changing their look, which is a talent ask the brief layer shouldn't be making."},
  {signal:"\"Fibermaxxing\" going mainstream — an Aug 28, 2026 syndicated science-desk explainer tying the viral fiber trend to fermentation research and the national fiber shortfall", reason:"The most on-brand-looking signal of the week, and it fails twice. The shape is burned — sardinemaxxing ran Aug 24, protein-maxxing Aug 10, savoury-maxxing in July — and a fourth -maxxing construction is wallpaper. The fiber-science lane itself ran Aug 17 across four separate signals and is resting. The fiber demand story survived in a different form, built on grocery search behaviour rather than the trend name or the mechanism, which is the one framing that has never run here."},
  {signal:"A $32.5M federal initiative funding schools to test replacements for highly processed food, announced Aug 26, 2026, with first awards expected in October", reason:"Two fatal problems. It looks like the same federal research dollars re-detailed two days after the Aug 24 \"real food\" announcement that is already burned, which makes it a repeat wearing a fresh date. And every honest translation is a school-food brief: back-to-school ran four straight weeks Jul 27 through Aug 17, was correctly rested Aug 24, and the corpus closes it outright for this refresh. Even if the funding is genuinely distinct, the content door is shut."},
  {signal:"The state avocado-oil investigation as a standalone trend card of its own", reason:"Kept, but not as its own card. The trade reporting is solid and in-window, but the only other in-window outlet carrying it is a domain that cannot go on a Willa's card face under the Sources Rule's trust bar, leaving it one credible source short of the two-source trend minimum. Folded into the lead trend instead, where it corroborates the actual thesis — that both enforcement moves this window were driven by a third-party lab result rather than by reading a label."},
  {signal:"The second viral-recipe pulse slot", reason:"Shipped one food trend instead of two, on purpose. Every viral-recipe candidate that surfaced — dumpling lasagna, chicken Caesar pizza, parchment gyro meat, melting cabbage, the cortisol cocktail, Hong Kong iced tea — traced back to spring or early-summer virality with no in-window republication, and the drink-build and dessert-build lanes are burned six deep besides. Padding to the type floor would have meant shipping a recipe whose only defence was that it was still circulating."},
  {signal:"A national dairy player's ready-to-drink oat milk discontinuation, still surfacing in shopper-facing store content as remaining cartons clear", reason:"Burned. The exit was an Aug 17 trend and the underlying news dates to mid-August regardless of the Aug 26 roundup that re-flagged it; a re-flag is continuing-signal coverage, not a new development. It also invites exactly the wrong posture — a competitor-exit victory lap — when the same week's evidence says the cooler is getting more crowded, not less."},
  {signal:"The category leader's carton-as-billboard climate campaign as a Willa's content lane", reason:"Kept as competitor intel, refused as a lane. Sustainability last ran Aug 10 and the standing rest makes it available only with a non-Oatly peg — this is the most Oatly peg imaginable, and answering it directly would put Willa's in a reactive posture on somebody else's chosen ground. The strategically useful read is the packaging-as-owned-media move, which points at Willa's own four-line label rather than at climate."},
  {signal:"The keto-versus-Mediterranean liver-fat trial and the calorie-restriction immune-protein finding as ridable health signals", reason:"Kept on the board and explicitly marked background with a do-not-ride angle, which is the only honest way to carry them. Both are real, in-window and about to be everywhere, and both are restriction stories — the diet-culture filter says Willa's pushes back rather than rides, and an oat brand chasing a low-carb headline is self-harm on top of off-brand. Logged so the team recognises the content when it floods and has a reason ready for declining it."},
  {signal:"A vitamin-D class action against an oat brand; a state GRAS and dye act awaiting signature; the federal front-of-pack labelling rule; the bioengineered-disclosure rulemaking; a state GRAS-loophole bill", reason:"All checked individually against the Aug 24 floor and all failed it. The class action was filed and reported Aug 19 — five days short, with no in-window amendment or statement. The others are genuinely live but sat still through the window: no signature, no Federal Register posting, no court movement, no comment period. A card built on any of them would have been an old story wearing this week's date."},
  {signal:"The 212-product mycotoxin survey as a category-risk trend card", reason:"Routed to the Pulse rather than killed outright, and worth logging why. It is a research study, which by the separation rule belongs in Trends — but only one in-window source carries it, short of the two-source trend minimum, and a trend card framed as fungal toxins in oat milk would have the engine amplifying a scare about its own category with no rebuttal attached. As a pulse entry it does the opposite job: one source is permitted, and the card exists to pre-load the answer before the headline gets compressed into something worse."}
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
  "AUG31-TT-1":{direct:"Willa's oats are organic, and every lot is tested for glyphosate residue by a third party. 🔬\n\nglyphosate is the weedkiller that turns up in grain. we test for it lot by lot — not the first batch, not a sample from a good month, and not by anybody who reports to us.\n\na claim is written by whoever's selling it. a test isn't. the claim comes from us. the number doesn't. that's the only reason a number is worth anything.\n\nthen the list gets short: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar.\n\ncertified glyphosate-free. tested every lot.", warm:"Christina, in her own kitchen, with a carton and a lot code on the counter. 🔬\n\nthe oats in Willa's Original are organic, and every lot is tested for glyphosate residue — the weedkiller that turns up in grain — by a third party. every lot, not the flattering one.\n\na claim is written by whoever's selling it. a test isn't. we like that ours is the boring part.\n\norganic whole grain oats, filtered water, organic vanilla extract, sea salt. tested every lot, and quietly proud of it.", punchy:"organic oats, tested for glyphosate residue every lot — by someone who doesn't work for us. 🔬 certified glyphosate-free."},
  "AUG31-PIN-1":{direct:"Sweet corn is in its last good stretch of the year and the long weekend of Sep 5–6 is wide open. 🌽🥄 So here is the pot for it — a sweet corn chowder that comes out genuinely creamy without a drop of dairy in it, thick enough to hold a spoon up, done in about 35 minutes on one burner.\n\nNobody's going anywhere, and the corn is at its best. Two full cups of Willa's Barista go into this pot and they do the job cream usually does. Barista is the richest carton Willa's makes and it stays smooth in a simmering pot, which is the whole reason it is the one in this recipe.\n\nWilla's Organic Barista Oat Milk uses the whole entire oat for a rich, smooth taste that stays smooth even at a simmer — no rapeseed oil and no gums. 🥛\n\nIngredients\n- 2 cups Willa's Organic Barista Oat Milk\n- 6 ears sweet corn, kernels cut off, cobs saved\n- 2 tbsp olive oil (or Miyoko's vegan butter)\n- 1 yellow onion, diced small\n- 1 large Yukon Gold potato, diced\n- 2 cloves garlic, minced\n- 4 sprigs fresh thyme\n- ¼ cup canned coconut cream, the thick part from the top of the can\n- 1 tsp sea salt, plus more to taste\n- a lot of freshly cracked black pepper\n- 2 tbsp nutritional yeast, if you want a savory finish\n\nSoften the onion in the olive oil over low heat until it goes translucent, then add the potato, garlic and thyme. Pour in the Barista and drop in the stripped cobs — that is where most of the corn flavor is hiding. Keep it at a bare simmer for 20 minutes, never a hard boil. Pull the cobs and the thyme stems, add the kernels for the last 5 minutes, blend about a third of the pot and stir it back in. Finish with the coconut cream, the salt and more black pepper than feels reasonable.", warm:"The plan for Sep 5–6 is a pot on the stove and nowhere to be. 🌽 And shhh… the creamiest thing in this chowder is oat milk.\n\nNobody's going anywhere, and the corn is at its best. Two cups of Willa's Barista carry the whole thing — it is the richest carton Willa's makes and it stays smooth in a simmering pot, so nothing dairy has to come near it.\n\nWilla's Organic Barista Oat Milk uses the whole entire oat for a rich, smooth taste that stays smooth even at a simmer — no rapeseed oil and no gums. 🥛\n\nIngredients\n- 2 cups Willa's Organic Barista Oat Milk\n- 6 ears sweet corn, kernels off, cobs saved\n- 1 yellow onion + 1 Yukon Gold potato, diced\n- 2 tbsp olive oil, 2 cloves garlic, 4 sprigs thyme\n- ¼ cup canned coconut cream\n- sea salt and a lot of black pepper\n\nSweat the onion, add the potato, garlic and thyme, pour in the Barista, simmer with the cobs for 20 minutes, blend a third of it, stir in the coconut cream.", punchy:"Nobody's going anywhere, and the corn is at its best. 🌽 Two cups of Willa's Barista, six ears of corn, one pot — creamy, and not a drop of dairy in it."},
  "AUG31-IG-R1":{direct:"One glass, poured the same way it was in July. That's the whole plan. 🥣\n\nWilla's Original is four ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt — and the numbers come with it: 4g+ protein, 2g+ prebiotic fiber (the kind that feeds your gut), 1g of sugar.\n\nthe reset didn't survive. the pour did. the printed tracker, the four matching jars, the alarm moved earlier — September asks for a whole new personality and most of it is gone by the second week. one swap you actually like will outlast a plan you're already behind on.\n\nnothing to overhaul. nothing to earn back. pour it over the same bowl you were eating in July.\n\nno reset required.", warm:"September has a way of asking for a whole new person by the second week. 🥣\n\nthe printed tracker, the four matching jars, the alarm moved earlier — lovely, briefly. then an ordinary Tuesday happens and the tracker goes quiet.\n\nWilla's Original doesn't need a plan built around it. four ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt — with 4g+ protein, 2g+ prebiotic fiber (the kind that feeds your gut) and 1g of sugar already in the glass.\n\npour it over the same bowl you were eating in July. the reset didn't survive. the pour did.\n\nnothing to overhaul. we're on the side of the ones who didn't.", punchy:"the reset didn't survive. the pour did. 🥣 Willa's Original — 4 ingredients · 4g+ protein · 2g+ gut-feeding prebiotic fiber · 1g sugar. no reset required."},
  "AUG31-TT-2":{direct:"Eight of these take a plan. One of them just takes a carton. 🌾\n\nnine squares, one answer, and we're not saying which one. that's what the comments are for — we'll pin it Thu Sep 3, once enough of you have argued about it.\n\nthe only clue we'll give: the one that's still going in October is the one with the fewest moving parts. Willa's Original is organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein and 2g+ prebiotic fiber per cup, because we use the entire oat groat — bran, germ and all.\n\nno tracker, no 5am, no sixteen-step morning. one pour, and you already know how to do it.\n\nand to be clear, none of this is a knock on anybody's routine. build the whole system if it's making you happy. we just kept an eye on which square was still going in October.\n\nfour ingredients. read 'em.", warm:"we built a september grid. eight of the squares are a whole system — the tray, the printed tracker, the 5am, the new bottle with the little time markings up the side. one square is a bowl of oats and a glass. 🌾\n\nwe're not telling you which one. shhh… go look.\n\nwhat we will say is that Willa's Original is four things — organic whole grain oats, filtered water, organic vanilla extract, sea salt — with 4g+ protein and 2g+ prebiotic fiber in the cup. it's still going in October because there's nothing in it to quit.\n\nanswer gets pinned Thu Sep 3. no peeking at the comments first.", punchy:"eight of these take a plan. one of them just takes a carton. 🌾 find it — we'll pin the answer Thu Sep 3."},
  "AUG31-TT-3":{direct:"Willa's Original is USDA Organic, Non-GMO Project Verified, and certified glyphosate residue free by The Detox Project — an independent lab does that testing, not us. 🌾\n\norganic whole grain oats, filtered water, organic vanilla extract, sea salt. four lines, and every one of them is something an outside lab can go check. that's the entire point of a certification: we don't get to grade our own homework.\n\nso when the internet gets loud about what's in food, the answer here doesn't move and it doesn't take a paragraph. who tests it — an independent lab. how often — every lot. what the certificate says — organic, non-GMO, glyphosate residue free, with a date on it that has to be re-earned.\n\nthe honest answer is boring. we like it that way.\n\n4g+ protein. 2g+ prebiotic fiber. 1g of sugar. and a short enough list that checking it is a reasonable thing to ask.\n\ncertified glyphosate-free. because that matters.", warm:"the calmest thing in your fridge should be the ingredient list. 🌾\n\nWilla's Original is four things — organic whole grain oats, filtered water, organic vanilla extract, sea salt — and it's USDA Organic, Non-GMO Project Verified, and certified glyphosate residue free by The Detox Project. an outside lab runs that one, which is sort of the whole idea. we test every lot.\n\none of our dietitian ambassadors answered the three questions people actually ask, standing in her own kitchen, holding the carton. took about thirty seconds. no alarm required.\n\nthe whole oat stays in, so the protein and the prebiotic fiber stay in with it — 4g+ protein, 2g+ prebiotic fiber. pour it and get on with your morning.", punchy:"who tests it: an independent lab. how often: every lot. what it says: organic, non-GMO, glyphosate residue free. 🌾 the honest answer is boring. we like it that way."},
  "AUG31-IG-R2":{direct:"Chocolate milk that tastes like chocolate milk. 🍫\n\nreal cacao doing the flavour, organic coconut sugar doing the sweetening, and the other four are filtered water, organic whole grain oats, organic vanilla extract and sea salt. that is the entire ingredient list for Willa's Chocolate — top to bottom, nothing under it.\n\nit's a treat and we build it like one. the cacao is cacao, powder pressed from the bean, not a chocolate flavouring — which is why it drinks like a glass of chocolate milk and not like a chocolate-flavoured drink. it took Best Beverage at the Good Food Awards, which is a lot of fuss for something with six things in it.\n\nover ice, after school, at four in the afternoon on a Thursday. that's the job.\n\nsix ingredients — and yes, we're counting the salt.", warm:"poured slow, on purpose. 🍫\n\nWilla's Chocolate is filtered water, organic whole grain oats, organic coconut sugar, organic cacao powder, organic vanilla extract and sea salt — and that's not the highlights, that's the list.\n\nreal cacao, pressed from the bean, doing the actual flavouring. it's a treat. we just wrote the whole thing down.\n\nsix ingredients — and yes, we're counting the salt.", punchy:"real cacao. real sugar. water, oats, vanilla, salt. 🍫 six ingredients — and yes, we're counting the salt."},
  "AUG31-IG-F1":{direct:"Thirty squares, and the same fifteen seconds in all thirty of them. 🌾\n\nthe September routine here is one line long: Willa's Original, poured. organic whole grain oats, filtered water, organic vanilla extract, sea salt — 4g+ protein, 2g+ prebiotic fiber (the kind that feeds your gut), 1g of sugar.\n\nthings that should be shorter: the Monday meeting, and the ingredient list on most oat milk. things that should stay in: your Sunday plan by Wednesday, and the protein and the fiber the oat came with. most oat milks filter the bran and germ out and process the starch into sugar, and the protein and the fiber leave with it. ours stay — the whole oat groat goes in — bran, germ and all, the same way steel-cut oats do.\n\nnobody has to win September. it's thirty mornings, and most of them are going to look like the one before. that isn't a failure of ambition, that's what a routine is.\n\nso — what does your September actually look like? 👇", warm:"a September calendar with thirty identical squares, and we are not sorry about it. 🌾\n\none glass, around 7am, organic whole grain oats and three other things — 4g+ protein, 2g+ prebiotic fiber, 1g of sugar, and nothing anybody has to win.\n\nthings that should be shorter: this caption. things that should stay in: the protein and the fiber the oat came with, which most of the aisle filters straight back out.\n\nwhat's in your squares? 👇", punchy:"thirty squares. one glass in all of them. nobody has to win September. 🌾 what's in yours? 👇"},
  "AUG31-TT-4":{direct:"2g+ prebiotic fiber, and not one gram of it had to be added back in. 🌾\n\nthe hunt is the funny part. a drawer of bars. a tub of powder. a bottle of gummies. a single-serve stick somebody ordered online. four different packages, all promising the same thing, all of them putting fiber back into something it had already been taken out of.\n\nWilla's Original never went through that. we use the whole oat groat — bran, germ and all, the same way steel-cut oats do — so the fiber and the protein stay in instead of getting filtered out. 2g+ prebiotic fiber. 4g+ protein. 1g of sugar. four ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt.\n\nno routine to build, no scoop to measure, no reminder to set. you pour it on cereal at 7am and the search is over.\n\nit was in the fridge door the whole time.\n\nfiber you don't have to go looking for.", warm:"somewhere in this kitchen there is a drawer with four different fiber products in it and every single one of them was bought on purpose. 🌾\n\nmeanwhile Willa's Original has been sitting in the fridge door with 2g+ prebiotic fiber in it, plus 4g+ protein and 1g of sugar, because we use the whole oat groat — bran, germ and all, the same way steel-cut oats do — and none of it gets filtered out.\n\nnothing to measure. nothing to remember. shhh… it's just milk.\n\nfiber you don't have to go looking for.", punchy:"searched the whole kitchen. it was in the fridge door the whole time. 🌾 2g+ prebiotic fiber, never added back — Willa's Original."},
  "AUG31-TT-5":{direct:"Fiber and protein. that's what this one's for. 🌾\n\nevery drink in this case is for something now — sleep, gut, focus, energy. the cold case quietly reorganized itself around what a drink DOES, and somewhere in the middle of all that, a plain carton of oat milk turned out to have been answering the same question the whole time. we were just saying it in the wrong order.\n\nso, short version. Willa's uses the whole oat groat instead of processed oat syrup, which means the fiber and the protein stay in the milk instead of getting filtered out. Original: 2g+ prebiotic fiber, 4g+ protein. Chocolate: 3g fiber, 5g protein, real cacao. Kids: 2g fiber, 8g protein, free of the top 9 allergens. prebiotic fiber, if nobody's ever bothered to say it plainly, is the kind your gut bacteria actually eat.\n\nevery drink in this case is for something now. this one's for fiber and protein — and it still just tastes like milk.\n\nfour cartons. one answer. no explaining required.", warm:"there is a whole wall of drinks now that will tell you exactly what they're for. sleep. gut. focus. energy. it's genuinely nice — a fridge door that answers a question instead of asking you to research one. 🌾\n\nso here's ours, in the same plain language. Willa's is for fiber and protein. we use the whole oat groat instead of processed oat syrup, so both of them stay in the milk instead of getting filtered out — 2g+ prebiotic fiber and 4g+ protein in Original, 3g fiber and 5g protein in Chocolate, 2g fiber and 8g protein in Kids.\n\nno scoop, no sachet, no shaker, no separate step in the morning. it's a carton of oat milk. it just happens to be doing something while you drink it.\n\nthat's the whole pitch. we faced them forward and left.", punchy:"every drink in this case is for something now. this one's for fiber and protein. 🌾 2g+ prebiotic fiber, 4g+ protein, already in the milk."},
  "AUG31-PIN-2":{direct:"Saturday morning, one pan, and a stack that got its colour straight out of the carton. 🍫🥞\n\nWilla's Organic Chocolate Oat Milk is made with real cacao and the whole entire oat — the whole grain, not just the starch — so it pours rich and creamy enough to be the entire liquid in a pancake batter and still taste like chocolate on the other side of the pan. No cocoa powder. No cane sugar. No dairy anywhere in it. Just a cup of it doing the work.\n\nIngredients\n- 1 cup Willa's Organic Chocolate Oat Milk\n- 1¼ cups all-purpose flour (or a 1:1 gluten-free blend)\n- 2 tsp baking powder\n- ¼ tsp fine sea salt\n- 1 tbsp maple syrup\n- 1 tsp vanilla extract\n- 2 tbsp avocado oil, plus more for the pan (Miyoko's vegan butter also works)\n- 1 tsp lemon juice — optional, for a soft tang and a little extra lift\n\nWhisk the dry, whisk the wet, fold them together and then leave the batter alone for five minutes. Medium-low heat, about three minutes a side, flip once. Warm maple over the top, a few flakes of sea salt.\n\nThese pancakes drank a whole cup of chocolate milk. That's the recipe.", warm:"There is no cocoa powder in this recipe, and there is no plan to add any. 🍫\n\nThe chocolate comes out of the carton — real cacao, already in there, doing exactly what you'd hope it would do once it hits a hot pan. Willa's Organic Chocolate Oat Milk is the whole liquid in the batter, which is why the stack comes out deep cocoa-brown and rich instead of politely beige.\n\nFluffy, dairy-free, and honestly a little smug about it. Warm maple, flaky salt, one pan, done. 🥞\n\nThese pancakes drank a whole cup of chocolate milk.", punchy:"no cocoa powder. the milk was already chocolate. 🍫🥞 these pancakes drank a whole cup of Willa's Chocolate — and that's the whole recipe."},
  "AUG31-IG-R3":{direct:"There is no oil on Willa's Original's ingredient list. 🌾\n\norganic whole grain oats. filtered water. organic vanilla extract. sea salt. that's the entire list.\n\nso there's nothing here to swap for a better one. that isn't a position on which fat anyone should cook with — it's just what the ingredient list says.\n\nthe reason it pours rich was never an added oil — it's what's still in the oat itself. Willa's Original carries 4g+ protein and 2g+ prebiotic fiber a cup, no rapeseed, no canola.\n\nChristina, reading the label in her own kitchen: swapping one fat for another isn't the same as not needing one.\n\nand if the whole conversation has gotten loud and confusing lately — completely fair. cook with what you love. this one just never had to enter the argument.", warm:"four lines, read at normal speaking pace, no dramatic pause anywhere. 🌾\n\norganic whole grain oats. filtered water. organic vanilla extract. sea salt. there's no oil on the list, which means there's nothing on it to upgrade, downgrade or swap.\n\nthe richness comes from the oat itself, not a swap — Willa's Original carries 4g+ protein and 2g+ prebiotic fiber a cup.\n\nswapping one fat for another isn't the same as not needing one. that's the only thing we'd add to a very loud week. 🤍", punchy:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 🌾 no oil on the list to swap — swapping one fat for another isn't the same as not needing one."},
  "AUG31-IG-F2":{direct:"Four lines, and we'll tell you exactly what happens to them. 🌾\n\norganic whole grain oats, filtered water, organic vanilla extract, sea salt. USDA Organic, and what goes in is the whole oat groat — the whole kernel, before anybody rolls or strips it. bran and germ still on. nothing is taken out of it, and nothing is built back in from syrup afterwards.\n\nthe argument in food right now is about a word. what does 'not ultra-processed' actually mean — and who wrote the advice everybody's been handed? a word can be argued about. a description is either true or it isn't.\n\nso, plainly: the usual way to make oat milk is to filter the bran and the germ off first, then process what's left of the starch into sugar. the protein and the fiber go out with the parts that were removed. in Willa's Original they never leave. 4g+ protein, 2g+ prebiotic fiber — the kind that feeds your gut — and 1g of sugar.\n\nUSDA Organic · Non-GMO Project Verified · Kosher · Vegan · women-owned, WBENC certified.\n\nfour ingredients. read 'em.", warm:"there's a whole argument going on about what counts as ultra-processed, and we keep having the same very small answer to it. 🌾\n\norganic whole grain oats, filtered water, organic vanilla extract, sea salt. the whole oat groat goes in — the whole kernel, bran and germ still on — and nothing gets pulled back out of it. so the protein and the fiber that usually get filtered away are, well, still in there. 4g+ protein, 2g+ prebiotic fiber.\n\nUSDA Organic. Non-GMO Project Verified. Written by us, and it hasn't changed.\n\nshhh… a description is much harder to argue with than a word.", punchy:"everyone's arguing about a word. Willa's Original has only ever had a description: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 🌾 the whole oat in, nothing out."},
  "AUG31-PIN-3":{direct:"Everything that goes in the bag for a day outside, and most of it is sunscreen. ☀️🧺\n\nWhat's in the tote\n- sunscreen, and then more sunscreen\n- two hats, one of which comes home\n- a paperback nobody is going to finish\n- a bag of cut fruit and a bag of pretzels\n- the blanket that lives in the trunk\n- one small ice pack\n- two 8oz cartons of Willa's Kids\n\nMost kids come up short on fiber and on DHA. Willa's Kids carries 2g of fiber, 8g of protein and algae-sourced DHA omega-3s — the omega-3 you would normally get from fish oil — which is the whole reason it earns the space in a bag this full. Same protein as dairy with half the sugar, and free of the top 9 allergens, which is the part worth knowing when there are other people's kids on the blanket.\n\nIt also tastes like something they will ask for twice, and that is the only reason anything gets packed a second time.\n\nMost of this bag is sunscreen. The carton is the part doing something.", warm:"The bag for a day outside is mostly sunscreen, and shhh… only one thing in it is doing any actual nutritional work. ☀️🧺\n\nSunscreen, two hats, cut fruit, pretzels, the blanket from the trunk, one small ice pack — and two 8oz cartons of Willa's Kids, carrying 2g of fiber, 8g of protein and algae-sourced DHA omega-3s, the omega-3 you would normally get from fish oil.\n\nFree of the top 9 allergens, too, which is the part you are glad about when the blanket fills up with other people's kids.\n\nMost of this bag is sunscreen.", punchy:"Most of this bag is sunscreen. 🧺 The two 8oz cartons of Willa's Kids are the part carrying 2g of fiber, 8g of protein and algae-sourced DHA — free of the top 9 allergens, and the only thing in here they will ask for twice."},
  "AUG31-IG-R4":{direct:"the long weekend at home is the underrated one. ☀️\n\nnobody sets an alarm. the first bowl of cereal happens somewhere around nine, the pancakes get decided on around eleven, and the same carton of Willa's Kids sits on the table through both — not because it's doing anything clever, but because nobody is going anywhere and there's nothing to clear the table for.\n\nthe kids pour it themselves, which is the only review that has ever counted. it's creamy, it tastes like something they'd ask for twice, and underneath that it's carrying 8g of protein, 3g of fiber and DHA omega-3s from algae — the omega-3 that usually comes from fish. free of the top 9 allergens too, which matters more than usual on a weekend when the kids at the table aren't all yours.\n\nwe didn't build it to be a treat and we didn't build it to be a supplement. we built it to be the thing that's already on the table on a morning that isn't in a hurry.\n\n(100 out of 100 on Yuka, the grocery-scanning app that grades an ingredient list.)\n\nthe weekend nobody had to pack for.", warm:"the itinerary: wake up whenever, eat twice, stay in the kitchen. ☀️\n\none carton of Willa's Kids on the table from the cereal at nine to the pancakes at eleven — 8g protein, 2g fiber, DHA omega-3s from algae, free of the top 9 allergens — poured by a five-year-old, badly, and finished anyway.\n\nnothing on the schedule. nothing with an end time.\n\nthe weekend nobody had to pack for.", punchy:"the whole long weekend happened at one table. 🥣 Willa's Kids, poured twice before noon — the weekend nobody had to pack for."},
  "AUG31-TT-6":{direct:"Nobody in this house had anywhere to be. Willa's Original, at the bottom of the stairs. 🌾", warm:"one flight of stairs, nowhere to be, and Willa's Original waiting at the bottom of them. 🌾", punchy:"nobody had anywhere to be. 🌾"},
  "AUG31-IG-R5":{direct:"The treat is the point. It's just also real. 🍫\n\nWilla's Chocolate is real cacao, 5g protein and 3g fiber, and it still tastes the way chocolate milk is supposed to taste — because tasting good was the first job and everything else came along behind it.\n\nnothing was added to put the protein and the fiber there. an oat arrives with both. Willa's keeps both, because we use the whole groat — the oat with the kernel intact, nothing stripped off — while most oat milks strip both back out and don't bring it up.\n\nit's a treat that's actually made of something.\n\nthe Good Food Awards named Willa's Chocolate Best Beverage. we'll say that once and go back to pouring it.\n\ntall glass, small glass, three in the afternoon, no occasion necessary.", warm:"Two glasses, one carton, nobody asked why. 🍫\n\nWilla's Chocolate tastes like chocolate because there's actual cacao in it, and it shows up with 5g protein and 3g fiber because the oat goes in whole and stays that way.\n\nit's a treat that's actually made of something. pour it tall, pour it small.", punchy:"5g protein. 3g fiber. real cacao. and it's still just chocolate milk. 🍫 a treat that's actually made of something."}
};

const SCANNED_TOTAL = 312;
const SURFACED_TOTAL = TRENDS.length;
const KILLED_TOTAL = SCANNED_TOTAL - SURFACED_TOTAL;

const INTEL_COLOR = {TREND:"#73B2C9", AUDIENCE:"#A191B2", COMPETITOR:"#DC2626", PULSE:"#9E652E"};

// ─── Competitor Watch · expanded data ─────────────────────
const COMPETITOR_TIMELINE = [
  {date:"Jul 1",  brand:"Graza",    compId:"C-2", action:"Turned a fan's viral 'bad hair day' comment into a limited 'Olive Oil Girl' bottle capsule — fan-meme-into-moment marketing",  note:"The playbook to borrow (not copy): celebrate a real Willa's customer comment as a MOMENT in-post — not a printed carton we don't ship. Drove the reworked fan-comment TikTok."},
  {date:"Jun 29", brand:"Poppi",    compId:"C-3", action:"Shipped a limited Spider-Man box design ahead of the film's release — licensed-IP tie-in for shelf pop",  note:"Borrowed IP buys attention Willa's doesn't need to rent. Counter with the story no license can buy — grandmother-Willa origin (the heritage-kitchen POV)."},
  {date:"2026",   brand:"Oatly",    compId:"C-1", action:"2026 range sprawls into barista editions, RTD iced coffees + low-sedimentation Barista as iced-coffee season peaks",  note:"Format-sprawl vs focus. Willa's counter: win the iced-coffee moment on the clean back label (no rapeseed, no gums) — carried by the Barista + Chocolate iced pours."}
];


const COMPETITOR_CALENDAR = [
  {date:"JUL 9",      brand:"Netflix",  event:"'Little House on the Prairie' revival premieres",                            impact:"From-scratch / heritage-kitchen nostalgia peaks. Willa's grandmother-Willa origin rides it authentically — the heritage-kitchen POV brief.",  confirmed:true},
  {date:"JUL 9-11",   brand:"FIFA",     event:"World Cup quarterfinals — the last eight, win-or-go-home",                   impact:"Peak summer-gathering + watch-party snacking window. Willa's kids + family-kitchen lane stays warm alongside.",  confirmed:true},
  {date:"JULY",       brand:"Category", event:"Iced-coffee season peaks · arabica prices spiking",                          impact:"Home-café behavior surges. Willa's Barista + the new Chocolate iced-mocha/fudge-pop own the dairy-free café pour.",  confirmed:true},
  {date:"JUL 1",      brand:"Category", event:"Medicare $50/mo GLP-1 program goes live · smaller-appetite shoppers grow",   impact:"Density-as-generosity window opens. 'Every pour has to earn its spot' — the whole-oat density Reel.",  confirmed:true},
  {date:"JULY (EST)", brand:"Oatly",    event:"Barista / RTD iced-coffee SKU expansion continues into peak season",         impact:"Category doubling down on barista. Willa's differentiates on the clean back label, not the format count.",  confirmed:false}
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
  happened:"The category leader turned its packaging into a political billboard the same week a national discount grocer put an oat-milk seasonal latte on its own shelf — one competing for meaning, the other quietly commoditising the format the whole category spent August chasing. Underneath both, the plant-forward cooler got more crowded: the biggest name in plant-based meat launched its first-ever beverage at 20g of pea protein and two sweeteners across every Erewhon door, and a one-year-old functional drink jumped a rotating trial program straight into permanent placement in every Sprouts. Every one of those moves is about occupying a claim; none of them changes what is inside a Willa's carton.",
  coming:"The competitive front swings back onto proof, and it is decided in laboratories rather than in copy. A federal comment window on glyphosate's cancer-risk literature opened Aug 25 and runs to Sep 24, a state attorney general is issuing civil investigative demands over an oil claim on the strength of lab testing that found roughly 89% of products misdescribed, and California's first-in-nation non-ultraprocessed certification is sitting on a governor's desk with a Sep 30 deadline that will force somebody to legally define the term. That is the one front where Willa's already holds the paperwork and the rest of the aisle is about to be asked for theirs.",
  plays:"Lead the week with certification rather than season — glyphosate residue free, tested every lot, verified by a third party — while the shelf argues about oils and definitions. Second, take the two occasions nobody has claimed: the Sep 5–6 stay-home half of the long weekend, and the grown-up September routine belonging to people with no school run that the reset data says is real and unglamorous. Third, move the nutrition conversation off protein and onto fiber, where shopper demand is accelerating at more than double the rate and the category has almost nothing honest to say."
};


// ─── Performance · Week of MAY 25 – MAY 31 results ──────────────
const LAST_WEEK_RESULTS = [
  {id:"AUG24-TT-1", concept:"\"every shelf in here got a fall version. this one didn't need one.\" — the pour that doesn't have a season", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"The season's flavor reset finishing on shelf, answered by a carton that never gets a seasonal version (AUG 24)", trendId:null, views:823000, saves:68700, shares:24100, comments:4900, savesDelta:13.4, sentiment:0.96, hero:true, note:"Reach and save hero of the AUG 24 – AUG 30 week, and it took the top of the board on the largest paid budget of the week, which is the first time this refresh cycle the money and the winner have been the same post. It confirms the front-loading finding on a second, harder test: the whole claim was in on-screen text at frame one, and it still held completion across a twenty-second store walk with no reveal anywhere in it. Sentiment held at 0.96 because it named no chain, no menu item and no competitor, and never once claimed to taste better than anything seasonal. The store-walk shape is now rested — it has run its argument out — but the structural read carries straight into the founder stance Wed Sep 2, which opens on one plain sentence with no B-roll for six seconds."},
  {id:"AUG24-TT-3", concept:"\"hot coffee is a lie detector.\" — the two-clip pour test", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"The two-clip rhyme where the second half undoes the first, running as the week's most portable meme structure (AUG 24)", trendId:null, views:664000, saves:41200, shares:33800, comments:3700, savesDelta:8.8, sentiment:0.95, hero:false, note:"Most-shared post of the week on the lowest save-rate in the top four — the format-native trade, now six refreshes consistent and no longer worth re-testing. What is new is that the payload survived the sound this time, and the reason is structural: the reversal sat in the middle rather than at the end, so the carton was on screen for the whole second half instead of for a beat. That spec is now written into both meme briefs this week. The grid Wed Sep 2 puts its payload in a square the viewer has to hunt for, and the kitchen sweep Thu Sep 3 keeps the answer visible from frame one and makes people scrub back to prove it."},
  {id:"AUG24-TT-2", concept:"\"our sugar number has nothing standing behind it.\" — one gram, from the oats, no workaround", platform:"TikTok", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"A front-of-pack sweetener claim becoming a legal surface rather than a marketing one (AUG 24)", trendId:null, views:587000, saves:44900, shares:29600, comments:8400, savesDelta:11.9, sentiment:0.91, hero:false, note:"The most instructive number on the board and the reason the paid plan changed shape this week. It was the only brief on the AUG 24 slate deliberately given no budget at all, and it still posted the week's highest comment volume and third-highest reach — the third refresh running that a founder stance has out-travelled its spend. It also posted the week's lowest sentiment at 0.91, and the comment mix is why: a claim that sits next to an open legal fight collects people who came to argue, not to listen. Both readings point the same way, so the stance Wed Sep 2 is funded for the first time and funded warm-only, at the smallest budget on the board, with cold prospecting switched off entirely."},
  {id:"AUG24-IG-R1", concept:"\"born 1921. launched 2021. the ingredient list never needed updating.\" — the heritage answer, told in dates", platform:"Instagram Reel", pillar:"REVIEWS/RECS", pillarColor:"#A191B2", sourceTrend:"The category's own annual observance and the heritage map behind it (AUG 24)", trendId:null, views:466000, saves:52800, shares:15300, comments:3100, savesDelta:15.6, sentiment:0.97, hero:false, note:"Best save-delta of any Reel on the board and the highest sentiment of the week at 0.97, on mid-pack reach — the shape of a post that lands quietly and correctly rather than widely. The finding worth keeping is that the warmest asset of the week was also the most reusable one: nothing in it was pegged to a news event, so it is still true in November and is now the brand's default introduction video. That is the argument for the biggest budget this week going behind the September Reel, which has the same property — it reads identically in October. No living family member appeared on camera, per the standing rule; the grandmother is the origin of the recipe and stays a story."},
  {id:"AUG24-TT-5", concept:"\"we asked a machine to write an oat milk commercial. it wrote the whole aisle.\" — the protein-claim arms race, read out loud with a straight face", platform:"TikTok", pillar:"REVIEWS/RECS", pillarColor:"#A191B2", sourceTrend:"Protein claims spreading onto pizza crust, instant noodles and cocktails (AUG 24)", trendId:null, views:358000, saves:21400, shares:27200, comments:5600, savesDelta:6.9, sentiment:0.93, hero:false, note:"The clearest counter-example on the board and the reason the front-loading rule now has an exception written into it. It shared heavily and saved worst in the top group, because the joke was cumulative — the payoff only exists once you have heard the whole list, which means the first three seconds promise a viewer nothing. Sentiment at 0.93 also carries a warning: read-aloud parody of the category reads as superior if there is no warmth anywhere in it. Nothing this week runs a cumulative joke. The one brief that looks like it withholds a payoff, the kitchen sweep Thu Sep 3, has its answer visible in frame one and only pretends to hunt for it."},
  {id:"AUG24-TT-4", concept:"\"kickoff's at noon. the hard part is at nine.\" — one carton, one pass, a whole table fed before anybody leaves", platform:"TikTok", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"The season's first football Saturday and the kitchens running three hours before anything started (AUG 24)", trendId:null, views:291000, saves:24800, shares:11900, comments:2400, savesDelta:8.1, sentiment:0.94, hero:false, note:"The paid occasion test, and it came back with a clear answer and an uncomfortable one. The audience is real — a household that has never seen a Willa's post engaged with a loud table and a carton going hand to hand at a completely acceptable cost, and the comment section stayed on food and never once turned into team talk. But roughly seven in ten of the views landed inside thirty-six hours and the asset was effectively finished by Mon Aug 31. An occasion buys attention, not durability. That is why the long-weekend Reel Sat Sep 5 is shot to read the same on any Saturday morning rather than only on the one it was made for."},
  {id:"AUG24-PIN-1", concept:"\"the spice in this one is a spice.\" — dairy-free spiced hot chocolate pin", platform:"Pinterest", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Two national coffee menus flipping to spice six days apart, moving the whole shelf behind them (AUG 24)", trendId:null, views:178000, saves:31600, shares:4900, comments:620, savesDelta:16.8, sentiment:0.97, hero:false, note:"Lowest reach and highest save-rate on the board for the fifth refresh running, and the pattern is now stable enough that the engine plans against it instead of reporting it. The title did the work: it was written the way a person searches on the first cold morning rather than the way a brand writes a headline, and the saves kept accruing after the news peg behind it was dead. Three pins ship this week instead of two for exactly this reason — a corn chowder, a stack of chocolate pancakes and a weekend tote flat-lay, all three titled as search objects and none of them anchored to a date that expires."},
  {id:"AUG24-PIN-2", concept:"\"nobody's cooking to order on a game morning.\" — one make-ahead pan, sliced for a full house", platform:"Pinterest", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"The planning window for a full-house Saturday morning, live the night before it is needed (AUG 24)", trendId:null, views:143000, saves:27300, shares:3800, comments:410, savesDelta:15.9, sentiment:0.96, hero:false, note:"The smallest budget and the longest flight on the AUG 24 paid board, and it justified both: it took the second-highest save-rate of the week on the lowest reach, and unlike the video that shared its occasion it was still collecting saves after Mon Aug 31 rather than dying with the morning it was made for. Same peg, two surfaces, opposite decay curves — which is the cleanest evidence the engine has that a pin is an asset and a timely video is an event. The recipe used Kids in the batter and contained no dairy of any kind, per the standing swap rule, and nothing in the pin or its replies mentioned a retailer or a price."}
];

const PERF_KPIS = {
  shipped:12,
  totalReach:3584000,
  avgSavesDelta:11.2,
  topFormat:"Whole claim in frame one with the proof as the body + the mid-video reversal + the searchable save-pin"
};

const PERF_INSIGHTS = [
  {title:"Front-loading held on a harder test — and it now has an exception the engine can use on purpose", detail:"The store walk put its entire claim in on-screen text at frame one and still held completion across twenty seconds with nothing withheld anywhere, taking reach and saves outright on the largest budget of the week. Against it, the read-aloud parody of the category shared heavily and saved worst in the top group, because its joke was cumulative — the payoff only exists once you have heard the whole list, so the first three seconds promise a viewer nothing. The exception is the useful part: a payoff that is visible from frame one still counts as front-loading even when the narration pretends to be hunting for it. That is exactly how the kitchen sweep Thu Sep 3 is engineered — the carton is in the corner of the first shot, the voiceover searches the drawers anyway, and the reward is people scrubbing back to confirm it was there the whole time.", agent:"perf"},
  {title:"Pinterest posted the lowest reach and highest save-rate for a fifth straight refresh, so the slate runs three pins instead of two", detail:"The spiced hot chocolate card and the make-ahead pan took the two best save-rates of the week on the two smallest reach figures, and both were still collecting saves after their news pegs were dead. The pattern is now stable enough to plan against rather than observe. So this week carries three pins where every other refresh has carried two, and all three are written as search objects with no expiry date attached: a creamy dairy-free sweet-corn chowder for the last good corn of the season, a stack of chocolate pancakes built on a full cup of Willa's Chocolate, and an overhead tote flat-lay that a parent could find in a search six months from now. None of the three mentions a date, an event or a weekend anyone has to be having.", agent:"visual"},
  {title:"The occasion test answered: an occasion buys attention, not durability — so the new occasion is shot to outlive its date", detail:"The gameday-morning post proved the audience exists. A household that had never seen a Willa's post engaged with a loud table and a carton going hand to hand at an acceptable cost, and the comments stayed on food throughout. But roughly seven in ten of its views landed inside thirty-six hours and the asset was finished by Mon Aug 31, while the pin sharing the same occasion kept accruing saves for days afterward. Same peg, two surfaces, opposite decay curves. The response is a change in how the slate's new occasion is built: the long-weekend family Reel Sat Sep 5 is an unhurried kitchen morning with one carton doing three jobs, deliberately framed so it reads identically on any Saturday — no travel montage, no packing shot and no reference to the date that made it timely.", agent:"composer"},
  {title:"The zero-funded stance out-travelled its budget again and posted the week's lowest sentiment doing it — so this one is funded warm-only", detail:"The sugar brief was the only post on the board given no budget at all and it still returned the week's highest comment volume and third-highest reach, the third refresh running that a founder position has beaten its spend. It also posted the lowest sentiment of the week at 0.91, and the comment mix explains it: a claim sitting next to an open legal fight collects people who arrived to argue. Zero-funding was the right call for that brief and the wrong general rule. The founder stance Wed Sep 2 therefore takes the smallest budget on the paid board with cold prospecting switched off entirely — warm audiences only, no lookalike, and an auto-pause the moment a thread names an agency, a state, a chemical or another brand.", agent:"paid"}
];


// ─── Emoji + confidence system ────────────────────────────
// Brief `platform` has shipped as both "IG Reel" and "Instagram Reel"; both are Instagram.
const IS_IG = p => typeof p === "string" && (p.startsWith("IG") || p.startsWith("Instagram"));

const PLATFORM_EMOJI = {
  "IG Reel":"🎬",
  "Instagram Reel":"🎬",
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
// CONVICTION SCORE — the engine's one-number read on each brief
// Ported from the Maazah / Lil Bucks engines (2026-05-31), rebuilt
// in Willa's Tailwind idiom. Three NAMED scorers feed one score, so
// the number is never a black box (per Alex's "name the scorers" rule):
//   voice   = Voice Compass match — warm/wink/assertive/transparent fidelity (0-100)
//   panel   = Synthetic Panel avg — the 4 Willa's readers' consensus (0-100)
//   pulse   = Pulse fit — how hard the brief rides its driving signal (0-100)
//   recency = fresh-signal bonus — decays-in-7-days urgency (0-15)
// Score = round((voice + panel + pulse) / 3) + recency
// Band:  HIGH 85+ · MEDIUM 70-84 · WATCH <70
//
// CONVICTION_INPUTS holds hand-authored numbers per brief (authored in the
// weekly refresh alongside the briefs themselves). Any brief without an
// explicit entry falls back to a derivation from its own fields so the chip
// never disappears — but the weekly refresh should author real numbers for
// every brief so the panel/voice/pulse reads are intentional.
// ──────────────────────────────────────────────────────────
const CONVICTION_INPUTS = {
  "AUG31-TT-1":{voice:97, panel:94, pulse:92, recency:1},
  "AUG31-PIN-1":{voice:94, panel:91, pulse:89, recency:4},
  "AUG31-IG-R1":{voice:96, panel:94, pulse:93, recency:2},
  "AUG31-TT-2":{voice:95, panel:89, pulse:96, recency:97},
  "AUG31-TT-3":{voice:96, panel:92, pulse:94, recency:3},
  "AUG31-IG-R2":{voice:96, panel:92, pulse:88, recency:1},
  "AUG31-IG-F1":{voice:95, panel:90, pulse:97, recency:1},
  "AUG31-TT-4":{voice:95, panel:92, pulse:96, recency:3},
  "AUG31-TT-5":{voice:95, panel:91, pulse:90, recency:2},
  "AUG31-PIN-2":{voice:95, panel:91, pulse:86, recency:3},
  "AUG31-IG-R3":{voice:97, panel:92, pulse:94, recency:3},
  "AUG31-IG-F2":{voice:96, panel:92, pulse:87, recency:1},
  "AUG31-PIN-3":{voice:93, panel:90, pulse:88, recency:6},
  "AUG31-IG-R4":{voice:96, panel:94, pulse:91, recency:1},
  "AUG31-TT-6":{voice:94, panel:88, pulse:96, recency:3},
  "AUG31-IG-R5":{voice:96, panel:91, pulse:89, recency:2}
};

// ──────────────────────────────────────────────────────────
// THE TASTING TABLE — Willa's synthetic consumer panel
// Ported from Maazah / Lil Bucks (2026-05-31). Four readers calibrated to
// Willa's real audience layers. They score every brief 1-10 live (via
// /api/panel → Claude), and their consensus is the "Synthetic Panel" leg of
// the conviction score. The roster is published on the engine (Meet the Table)
// so the score is never anonymous — per Alex's "name the scorers" rule.
// Keep this roster in sync with PANEL_SYSTEM in /api/panel.js.
// ──────────────────────────────────────────────────────────
const WILLAS_PANEL = [
  {id:"maya", emoji:"🌿", name:"Maya", age:34, city:"Austin, TX", label:"CLEAN-LABEL MOM",
   role:"reads every label · Yuka power-user · organic for the kids",
   cares:"Ingredient transparency · the 4-ingredient panel · glyphosate-free + organic certs · no seed oils, gums, or dyes · allergen-free Kids.",
   softOn:"Meme-chasing for its own sake · trade-press talk · marketing spin over substance."},
  {id:"jordan", emoji:"🛒", name:"Jordan", age:39, city:"Minneapolis, MN", label:"SHELF CONVERT",
   role:"found Willa's at Target · just switched from almond",
   cares:"Taste + froth · at-shelf proof · where-to-buy · honest before/after switch stories · value · works-in-coffee.",
   softOn:"Deep heritage/founder lore · insider category jargon · activist tone that assumes prior knowledge."},
  {id:"devon", emoji:"🎨", name:"Devon", age:28, city:"Brooklyn, NY", label:"CATEGORY-CURIOUS FOODIE",
   role:"follows Olipop, Graza, Fishwife · design-led · very online",
   cares:"Clever wordplay + peer-brand humor · viral recipe remixes · meme-payloads that land · aesthetic/IRL beauty · a real POV.",
   softOn:"Earnest wellness-mom register · plain checklist pins · anything try-hard or off-trend."},
  {id:"sam", emoji:"🥣", name:"Sam", age:42, city:"Denver, CO", label:"KID-UTILITY PARENT",
   role:"working parent of 2 · cares about format + taste, not origin",
   cares:"Kids will actually drink it · protein + fiber · lunchbox + after-school use · fast recipes with a clear payoff · family warmth.",
   softOn:"Category-fight/activist content · long heritage explainers · retail-milestone storytelling."}
];

function deriveConviction(b){
  if(!b) return null;
  const pri = b.priority || "STANDARD";
  // Voice: strong baseline, nudged up by a locked DNA format + big-swing intent
  let voice = 80;
  if(b.dnaPattern) voice += 6;
  if(pri === "BIG SWING") voice += 4; else if(pri === "HIGH") voice += 2;
  // Panel: lean on the pillar's recent save-delta confidence (1-5 → ~70-92)
  const pc = (typeof PILLAR_CONFIDENCE !== "undefined" && PILLAR_CONFIDENCE[b.pillar]) || 3;
  let panel = 66 + pc * 5; // 3→81, 4→86, 5→91
  // Pulse: how live is the driver
  let pulse = b.rideNow ? 90 : pri === "BIG SWING" ? 84 : pri === "HIGH" ? 78 : 73;
  // Recency: decays-in-7-days urgency
  let recency = b.rideNow ? 13 : pri === "BIG SWING" ? 10 : pri === "HIGH" ? 7 : 4;
  return {voice:Math.min(voice,100), panel:Math.min(panel,100), pulse:Math.min(pulse,100), recency};
}

function getConviction(b){
  if(!b) return null;
  const id = typeof b === "string" ? b : b.id;
  const obj = typeof b === "string" ? null : b;
  const c = CONVICTION_INPUTS[id] || (obj ? deriveConviction(obj) : null);
  if(!c) return null;
  const base = Math.round((c.voice + c.panel + c.pulse) / 3);
  const score = base + c.recency;
  const band = score >= 85 ? "HIGH" : score >= 70 ? "MEDIUM" : "WATCH";
  const derived = !CONVICTION_INPUTS[id];
  return { ...c, base, score, band, rideNow: c.recency >= 12, derived };
}

const CONV_BAND_COLOR = { HIGH:"#4E8C63", MEDIUM:"#B8862F", WATCH:"#C2674A" };
const CONV_BAND_FOOT  = {
  HIGH:"Ship this first.",
  MEDIUM:"Solid — slot it in normally.",
  WATCH:"Needs sharpening — or skip it."
};

// Small horizontal scorer bar used inside the conviction tooltip.
function ConvBar({label, val}){
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] w-[92px] shrink-0">{label}</span>
      <span className="flex-1 h-[5px] rounded-full bg-[#E8E2D3] overflow-hidden">
        <span className="block h-full rounded-full" style={{width:val+"%", background:"#202A44"}}></span>
      </span>
      <span className="font-mono text-[9px] text-[#202A44] w-[20px] text-right shrink-0">{val}</span>
    </div>
  );
}

// ConvictionChip — the band + number pill, with a hover tooltip that shows the
// full breakdown + the math. cursor-help signals "there's more here." Built on
// group-hover so it works without JS state. `size="sm"` for dense grid cards.
function ConvictionChip({conv, size}){
  if(!conv) return null;
  const color = CONV_BAND_COLOR[conv.band];
  const sm = size === "sm";
  return (
    <span className="relative inline-flex items-center gap-1 group/conv cursor-help align-middle"
      style={{border:"1.5px solid "+color, borderRadius:"999px", padding: sm?"1px 2px 1px 6px":"2px 3px 2px 8px"}}>
      <span className="font-mono tracking-[0.12em] font-bold" style={{color, fontSize: sm?"7.5px":"8.5px"}}>{conv.band}</span>
      <span className="font-serif text-white text-center"
        style={{background:color, borderRadius:"999px", fontSize: sm?"11px":"12.5px", lineHeight:1, padding: sm?"3px 5px 2px":"3px 6px 2px", minWidth: sm?"20px":"23px"}}>{conv.score}</span>
      {/* Tooltip */}
      <span className="invisible opacity-0 group-hover/conv:visible group-hover/conv:opacity-100 transition-opacity duration-150 absolute z-[80] top-[calc(100%+8px)] left-0 w-[268px] card p-3.5 text-left shadow-2xl cursor-default"
        style={{borderColor:color}}>
        <span className="flex items-center justify-between mb-2.5">
          <span className="font-mono text-[9px] tracking-[0.16em] font-bold" style={{color}}>{conv.band} CONVICTION</span>
          <span className="font-serif text-[18px] leading-none" style={{color}}>{conv.score}</span>
        </span>
        <span className="grid gap-1.5 mb-2.5">
          <ConvBar label="VOICE COMPASS" val={conv.voice}/>
          <ConvBar label="SYNTHETIC PANEL" val={conv.panel}/>
          <ConvBar label="PULSE FIT" val={conv.pulse}/>
        </span>
        <span className="block font-mono text-[9px] text-[var(--muted)] leading-relaxed border-t border-[var(--border)] pt-2">
          ({conv.voice} + {conv.panel} + {conv.pulse}) ÷ 3 = <span className="text-[#202A44] font-semibold">{conv.base}</span> · recency <span className="text-[#202A44] font-semibold">+{conv.recency}</span> = <span className="text-[#202A44] font-semibold">{conv.score}</span>
        </span>
        <span className="block text-[10.5px] mt-2 leading-snug" style={{color}}>{CONV_BAND_FOOT[conv.band]}</span>
        {conv.derived && <span className="block font-mono text-[8px] tracking-wider text-[var(--muted)] mt-1.5">⌁ estimated from brief signals — pending panel run</span>}
      </span>
    </span>
  );
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
    type:"MEME TEMPLATE",
    typeColor:"#73B2C9",
    hook:"the grid where one thing doesn't belong — a run of near-identical images with one deliberate mismatch hidden inside 👀",
    detail:"Documented Aug 26, 2026 as one of the platform's live top formats: post a series of visually similar images, slip one deliberately mismatched item into the run, and dare viewers to catch it before the reveal. It is unusually brand-ready and the coverage says so outright — products, packaging, mascots, staff all work — because the joke needs no dialogue, no audio, no on-camera talent and no script. The comment section supplies the engagement by arguing about which one it is, and the structural payoff is that whatever is different is the thing everyone reads closely.",
    velocity:"high",
    platform:"TikTok",
    willasPlay:"Nine maximalist morning routines, one bowl of oats. Caption: spot the one that doesn't belong. Answer stays in the comments.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"SocialBee · 2026 TikTok trends roundup, spot-the-mismatch grid format (Aug 26, 2026)", url:"https://socialbee.com/blog/tiktok-trends/"}
    ]
  },
  {
    id:"CP-2",
    type:"MEME TEMPLATE",
    typeColor:"#73B2C9",
    hook:"\"but the suspect is closer than he thinks\" — true-crime narration over something that was in frame the entire time 🎙️",
    detail:"Still holding among the platform's current top formats as of Aug 26, 2026: dramatic true-crime-style voiceover builds suspense about an unidentified answer while the camera searches for it, then reveals the answer had been sitting in the shot since the first second. It is a reveal engine with rewatch built in — viewers scrub back to find the frame where it was visible — and it requires no performance from whoever is holding the phone, only a straight-faced read and one prop that was never hidden.",
    velocity:"high",
    platform:"TikTok",
    willasPlay:"Narrate a search for a cleaner oat milk while the carton sits in the fridge door the whole time. The reveal is the punchline.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"SocialBee · 2026 TikTok trends roundup, 'suspect is closer than he thinks' format (Aug 26, 2026)", url:"https://socialbee.com/blog/tiktok-trends/"}
    ]
  },
  {
    id:"CP-3",
    type:"MEME TEMPLATE",
    typeColor:"#73B2C9",
    hook:"the two-item list — one mundane grievance, one product truth, no third line 🌶️",
    detail:"Fishwife ran it to 309K followers on Aug 31, 2026: a two-line card headed \"things that should be hotter,\" item one a mundane personal grievance, item two its own hot-pepper product. The entire post is text — no shoot, no talent, no edit, no audio — and it works because the second line is a real product attribute doing the joke's structural work rather than a punchline bolted onto a claim. It is the cheapest live proof this cycle that a familiar template plus one honest specific still outperforms a produced spot.",
    velocity:"medium",
    platform:"Instagram",
    willasPlay:"\"things that should be shorter: this caption, most ingredient lists.\" One text card, no shoot, one product truth carrying the joke.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"Fishwife · Instagram two-item list post (Aug 31, 2026)", url:"https://www.instagram.com/fishwife/p/Dct3soDPncS/"}
    ]
  },
  {
    id:"CP-4",
    type:"FOOD TREND",
    typeColor:"#75C596",
    hook:"beef tallow is being sold as the clean fat, and the swap is crossing categories 🥩",
    detail:"The post-show read from the Aug 18–20 Denver natural-products floor, published Aug 26, 2026, named it flatly: seed oils are out, beef tallow marketed as cleaner and healthier is in, and it is moving as a formulation trend across categories rather than staying in one aisle. The same read warns that nutrition trends are now moving faster than nutrition literacy. Which is the opening: the fat conversation has turned into a purity contest where swapping one fat for another counts as a fix, and the honest position is narrower and more useful than the slogan.",
    velocity:"medium",
    platform:"Trade floor → wellness social",
    willasPlay:"Push back warmly: swapping one fat for another isn't clean. Original has no oil in it at all — four things, read them out loud.",
    dnaMatch:"mom-activist",
    sources:[
      {label:"Sarah Hormachea, RD · 4 food and nutrition trends spotted at Newtopia Now (Aug 26, 2026)", url:"https://www.sarahhormachea.com/2026/08/26/4-food-nutrition-trends-i-spotted-at-newtopia/"}
    ]
  },
  {
    id:"CP-5",
    type:"MISINFORMATION REBUTTAL",
    typeColor:"#C46A5A",
    hook:"\"every plant-based milk they tested had fungal toxins\" — the headline is real, the alarm isn't 🍄",
    detail:"A UK survey published Aug 28, 2026 tested 212 plant-based products — oat, almond and soy milks alongside meat alternatives — for 19 mycotoxins and found at least one in every single product, with Fusarium toxins in 93–99% of samples. The clause the headline drops: every measured level sat below EU guideline limits, and mycotoxins are ubiquitous across agricultural crops, which is precisely why grain supply chains are tested lot by lot in the first place. Expect this compressed into \"your oat milk has mold in it\" inside a week. The wrong move is defending the category; the right one is showing what lot-level testing actually looks like.",
    velocity:"medium",
    platform:"Science press → social",
    willasPlay:"Don't repeat the scare number. Answer the question underneath it — who tests this, how often, what the certificate says. Calm, receipts only.",
    dnaMatch:"mom-activist",
    sources:[
      {label:"ScienceDaily · Scientists tested 212 plant-based products; every one contained fungal toxins (Aug 28, 2026)", url:"https://www.sciencedaily.com/releases/2026/08/260828005216.htm"}
    ]
  },
  {
    id:"CP-6",
    type:"NEWS CYCLE",
    typeColor:"#DC8A4E",
    hook:"a daytime show ended aug 31 after seven seasons and the host said the reason was her kids 🎤",
    detail:"The Kelly Clarkson Show aired its series finale on Mon Aug 31, 2026, closing seven seasons with a music-only episode in which the host performed her own catalogue. National coverage framed the exit as a working mother stepping off a daily production schedule because it \"feels necessary and right for this next chapter.\" It travels because it is the most visible possible version of what the September-reset surveys are measuring in aggregate: adults deciding out loud what the fall routine is actually for, and subtracting rather than adding.",
    velocity:"high",
    platform:"TV + national entertainment press",
    willasPlay:"Ride the feeling, not the celebrity. A morning that got simpler on purpose — one carton doing four jobs, nobody performing a routine.",
    dnaMatch:"before-after-stitch",
    sources:[
      {label:"Washington Post · Kelly Clarkson's last talk show episode (Aug 31, 2026)", url:"https://www.washingtonpost.com/style/2026/08/31/kelly-clarksons-last-talk-show-episode-showed-why-she-broke-daytime-curse/"},
      {label:"NBC Insider · Why the Kelly Clarkson Show is ending", url:"https://www.nbc.com/nbc-insider/why-is-kelly-clarkson-daytime-talk-show-ending"}
    ]
  },
  {
    id:"CP-7",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"brands are teasing september and refusing to say what's coming — the calendar page is the whole post 📅",
    detail:"Poppi posted a tweet-screenshot card on Aug 27, 2026 — \"do you have any plans next month?\" over a September calendar, answered \"hmmm… im kinda busy\" repeated across every date — with no product, no date and no reveal anywhere in it. The mechanic is a comment-section engine: the audience does all the speculating and the brand collects a week of anticipation for the price of one text card. Underneath the joke is the same read the reset data is showing — September is being treated as the year's actual restart line, not January, and brands are staking it before they have anything to announce.",
    velocity:"medium",
    platform:"Instagram",
    willasPlay:"One calendar card, every square filled with the same small morning. Ask what everyone's september actually looks like, then let them answer.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"Poppi · Instagram September tease post (Aug 27, 2026)", url:"https://www.instagram.com/drinkpoppi/p/DcjBazrRpJp/"}
    ]
  },
  {
    id:"CP-8",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"the seamless-descent illusion — hard cuts faked into one unbroken trip downstairs, and people rewatch to find the seam 🌀",
    detail:"Named among the platform's current top formats as of Aug 26, 2026: creators use camera angle and hard-cut transitions across staircases, escalators and trapdoors to fake one continuous downward journey through completely unrelated spaces. There is no punchline and no dialogue — the appeal is entirely editing craft, and the rewatch happens because viewers want to catch the cut. Log it as a production-direction shift rather than a one-off format: this cycle's scroll-stopper is the making, not the reveal, which raises the edit bar on every video shipping this week, not just the one that rides this trend.",
    velocity:"medium",
    platform:"TikTok",
    willasPlay:"One continuous pour across four rooms — coffee, cereal bowl, blender, batter — cut to look unbroken. Versatility argued by editing, not copy.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"SocialBee · 2026 TikTok trends roundup, seamless-descent stairs format (Aug 26, 2026)", url:"https://socialbee.com/blog/tiktok-trends/"}
    ]
  },
  {
    id:"CP-9",
    type:"ENTERTAINMENT MOMENT",
    typeColor:"#A191B2",
    hook:"alabama shakes came back aug 28 after eleven years away, and the record is warm, slow and in no hurry 🎸",
    detail:"I Must Be Dreaming arrived Aug 28, 2026 — the band's first album since 2015 and its first as a trio — eleven tracks of laid-back psychedelic soul that reviewers describe as groove-led and dreamy rather than the grit of the earlier records, and it was a top pick across the week's new-release lists. The usable part is the return itself: eleven years off, same three people, no reinvention pitch attached. It is the rare drop where the story and the sound both reward patience, which is the tempo Willa's long-form pieces are cut at and almost never get to score properly.",
    velocity:"high",
    platform:"Music + streaming",
    willasPlay:"Audio bed for the long-game piece: eleven years away, same three people. Score a single pour, no on-screen text, let it breathe.",
    dnaMatch:"before-after-stitch",
    sources:[
      {label:"NPR · New Music Friday, the best albums out Aug 28 (Aug 28, 2026)", url:"https://www.npr.org/2026/08/28/nx-s1-5946388/new-music-friday-the-best-albums-out-aug-28"},
      {label:"Glide Magazine · Alabama Shakes trade grit for groove on I Must Be Dreaming (Aug 28, 2026)", url:"https://glidemagazine.com/329645/alabama-shakes-trade-grit-for-groove-on-i-must-be-dreaming-album-review/"}
    ]
  },
  {
    id:"CP-10",
    type:"ENTERTAINMENT MOMENT",
    typeColor:"#A191B2",
    hook:"the prince vault opened aug 28 — ten unreleased tracks sequenced 1977 to 2016, a whole career in order 💜",
    detail:"Timeless arrived Aug 28, 2026: ten previously unreleased recordings spanning the full arc from teenage-era material to a live 2016 performance, sequenced chronologically rather than curated by era — the first vault collection built to represent every phase of the career at once. The cultural shape is what's useful, not the nostalgia. An archive released as a straight line, where the earliest take and the final one are recognisably the same person doing the same thing, is a structure worth borrowing for tone and pacing — quiet, unhurried, nothing explained.",
    velocity:"medium",
    platform:"Music",
    willasPlay:"Deep-cut audio under one long, quiet piece. The move is patience — no timeline graphics, no origin story, nothing on screen to explain.",
    dnaMatch:"before-after-stitch",
    sources:[
      {label:"Billboard · Prince's career-spanning Timeless collection of rare unreleased tracks (Aug 28, 2026)", url:"https://www.billboard.com/music/rb-hip-hop/prince-career-spanning-timeless-album-rare-unreleased-listen-1236327705/"},
      {label:"Variety · Prince Estate announces Timeless rarities collection (Aug 28, 2026)", url:"https://variety.com/2026/music/news/prince-estate-timeless-rarities-collection-1236766753/"}
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
  "AUG31-TT-1":"mom-activist",
  "AUG31-PIN-1":"viral-recipe-remix",
  "AUG31-IG-R1":"before-after-stitch",
  "AUG31-TT-2":"meme-payload",
  "AUG31-TT-3":"mom-activist",
  "AUG31-IG-R2":"on-pack-checklist",
  "AUG31-IG-F1":"meme-payload",
  "AUG31-TT-4":"meme-payload",
  "AUG31-TT-5":"at-shelf-moment",
  "AUG31-PIN-2":"viral-recipe-remix",
  "AUG31-IG-R3":"mom-activist",
  "AUG31-IG-F2":"on-pack-checklist",
  "AUG31-PIN-3":"kid-family-moment",
  "AUG31-IG-R4":"kid-family-moment",
  "AUG31-TT-6":"meme-payload",
  "AUG31-IG-R5":"on-pack-checklist"
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
  "AUG31-TT-1":{
    shoot:[
      "The six-second opening take is the entire brief — Christina in her own kitchen, medium close-up, window light camera-left, saying one sentence and stopping. Shoot it 10-12 times and take an early one; the fourth read is already too polished for this line",
      "Safety coverage of the same line at a slightly wider frame with more kitchen visible, in case the tight frame reads as a corporate statement in the edit",
      "The counter set-down: one ungloved hand placing a carton of Willa's Original label-forward on a locked three-quarter frame, then a fingertip resting an inch from the printed lot code. Shoot 6-8 times — this is the beat the eye lands on and the hand has to look unhurried",
      "Macro insert of the lot code itself, static, 6 seconds, no hand — the editor will want the option to hold on it while she talks",
      "The pour: same locked counter frame, one pour from carton to clear glass shot just above the rim so the opacity reads, held through the settle. Shoot 6+ and pick the calmest hand, not the prettiest stream",
      "Clean plate safety: the settled glass beside the carton, no hands, held 8 seconds, in case a line needs trimming",
      "Room tone pass: 30 silent seconds in the same kitchen with the fridge running, for bridging the cut to the counter without a level jump"
    ],
    found:[
      "https://www.federalregister.gov/documents/2026/08/25/2026-17301/glyphosate-open-literature-search-to-inform-human-health-risk-assessment-notice-of-availability — the Aug 25, 2026 federal notice reopening the file. INTERNAL BACKGROUND ONLY: read it so the register is right, then keep every word of it off camera, out of the caption and out of every overlay",
      "https://www.fooddive.com/news/texas-avocado-oil-investigation-pepsico-siete-kraft-heinz-primal-kitchen/828978/ — the Aug 27, 2026 state investigation opened off a third-party lab analysis. Internal only; it is the second file that makes this a pattern rather than a one-off, and it is never named on screen",
      "https://www.epa.gov/pesticides/public-comment-period-open-glyphosate-draft-risk-assessments — permanent agency landing page. Use it only to confirm what glyphosate is before writing the one-line gloss, so the spoken explanation stays accurate and stays under ten words",
      "https://willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the exact on-pack ingredient wording before the shoot so the four spoken lines match the label word for word",
      "https://www.tiktok.com/tag/oatmilk — permanent hashtag page. Scroll it the morning of the shoot purely to calibrate what this brief must NOT look like: no fast cuts, no captions bouncing, no upbeat bed, no badge reveals",
      "Trend reference (register, not format): https://www.tiktok.com/tag/organicfood — permanent hashtag page. Watch three straight-to-camera food-sourcing videos with no music and note how quickly the good ones stop talking. That restraint is the only borrowed mechanic here"
    ],
    memes:[
      "No meme template, no trending audio, no borrowed format. The only structural choice is that the first six seconds are one uncut human sentence and nothing else — no product, no text, no b-roll. If a cut lands before 0:06 the brief has lost its argument",
      "Deliberately NOT used: the badge/seal reveal, the certification-logo grid, the lab-coat or beaker cutaway, the headline-screenshot stitch, the red-circle-and-arrow annotation, and any 'they don't want you to know' conspiracy register. Each one converts a stance into a scare, which is the single tone this brief cannot have",
      "Register reference for the edit only (not a template to copy): activist outdoor-brand and clean-kitchen founder content that states a position once, at conversational volume, and declines to sell it. Watch two before the edit, then don't imitate the phrasing"
    ],
    archive:[
      "Existing counter-pour footage of Willa's Original into a clear glass can cover the pour beat if the shoot day runs short — it must be a full pour that settles on camera and must match the kitchen's light direction, or the cut will read as stock",
      "Existing clean carton stills can cover the end card if the wordmark lockup needs rebuilding",
      "Nothing in the opening six seconds may come from archive. The whole brief depends on this being a person saying this, in this kitchen, in this window — no library founder footage, no reused talking-head take, no stock lab or laboratory imagery of any kind"
    ]
  },
  "AUG31-PIN-1":{
    shoot:[
      "THE HERO — the wide shallow bowl of chowder at a three-quarter angle, late-afternoon window light camera left, black card camera right, spoon resting in it and the coconut cream swirl not yet stirred through. Ladle it fresh for every take and reheat between them; the frame lives or dies on whether the chowder reads THICK rather than soupy",
      "The pour — Willa's Organic Barista going from the carton straight into the hot pot over the onion, potato and stripped cobs, label forward, so there is photographic proof the carton is the recipe and not a garnish. Shoot it eight to ten times and pick the pour with the fullest stream",
      "Corn coming off the cob — hands only, sleeve rolled, a chef's knife on a wooden board, kernels falling in a sheet and a few skittering off onto the table. This is the seasonality shot and it needs to look like a real September ear, not a perfect one",
      "Willa's Organic Barista carton standing at frame right, cap off and on the table beside it, cropped by the frame edge, same light and same table as the hero",
      "Hands only, no faces — a hand setting the second bowl down for somebody else, and a hand cracking pepper over the top. Nobody on camera, no talent, no founder",
      "Alternate flat rest in case the chowder never photographs thick enough: stripped cobs, loose kernels, thyme sprigs, a small dish of sea salt and the open can of coconut cream on bare wood, carton at the edge"
    ],
    found:[
      "Trend anchor (Aug 31, 2026): https://gantnews.com/2026/08/31/aaa-labor-day-travelers-should-expect-busy-roads-higher-domestic-airfares/ — the travel forecast for the Sep 5–7 weekend. This is the internal reason the pin exists and the reason it publishes Wed Sep 2; not one number from it goes into the description",
      "Trend anchor (accessed Aug 31, 2026): https://newsroom.aaa.com/2026/08/labor-day-travel-trends/ — the primary forecast page behind the same story, including the Thu Sep 3 and Fri Sep 4 congestion windows. Internal planning reference only",
      "Product reference (permanent): https://willaskitchen.com/products/barista-oat-milk — the Barista page. Check the exact on-pack ingredient wording against the description before this ships. Barista is sweetened with organic coconut sugar, so nothing in this pin may credit its sugar number to the oat",
      "Search reference (permanent): https://www.pinterest.com/search/pins/?q=dairy%20free%20corn%20chowder — scan what already ranks in this exact query before designing the headline. Almost everything on page one is a busy stacked-text recipe card built on heavy cream; the whitespace is one honest photograph, one headline and one line",
      "Format reference (permanent): https://www.tiktok.com/tag/cornchowder — how a thick soup gets framed when the texture has to sell itself in a still. Useful for the angle and the spoon-lift; ignore every dairy build in it"
    ],
    memes:[
      "No meme template, no trending sound and no borrowed format — this is a static Pinterest pin and the only comedic move in it is the Relatable Confession carried entirely by the kicker line, 'nobody's going anywhere, and the corn is at its best.' It is tender, not sneering: the joke is that staying home was the better plan, never that anyone got left behind. Any second gag, subtitle or explanation on the artwork kills it",
      "Deliberately NOT used: any long-weekend travel-envy bit, any 'staycation' framing, any tailgate or gameday visual language, and any autumn-orange seasonal styling. All four either belong to another brief this week or to a lane that is closed"
    ],
    archive:[
      "Existing Willa's Barista carton stills can cover the frame-right placement if the light matches — warm directional side light on bare wood only, nothing shot on white seamless, and nothing from a coffee-context shoot where a mug or machine is anywhere in the frame",
      "Existing wood-table and pour-into-pot B-roll from prior recipe shoots can cover the supporting frames and the alternate pin",
      "The hero bowl has to be shot fresh — there is no archive substitute for a chowder that reads thick, and thickening it in post will look wrong at pin size"
    ]
  },
  "AUG31-IG-R1":{
    shoot:[
      "The before-half object pass, all top-down and locked, one item per take: the habit tracker coming off the printer and being smoothed flat, four identical empty jars set down in a row labels-forward, a label-maker spitting a strip, a thumb dragging a phone alarm earlier, a new notebook cracked to a blank ruled page. Shoot every one 4-6 times and cut the snappiest — this half lives or dies on rhythm",
      "THE STALL SHOT, and it is the most important frame in the piece: the tracker on the fridge with the first few rows filled in and everything after them blank. Locked, still, held long. Shoot it three ways — dead-on, slight angle, and one with a hand half-reaching toward it and stopping — so the editor can pick the least sad version",
      "The pour: one ungloved hand lifting Willa's Original, label forward, no rotation and no hero tilt, into a clear glass beside a half-eaten bowl of oats with the spoon still in it. Shoot 8+ pours and pick the calmest hand; the counter stays messy in every take",
      "The static after-frame the four specs tick onto — glass, carton, bowl, crumb, the earlier coffee mug — held a clean 8 seconds with no motion so the overlays have room. Grab a duplicate with the hand out of frame entirely",
      "Foley pass for the before half, recorded clean and separately: printer feed, label-maker click, four jars on stone, notebook spine, alarm set and dismissed. These are the beat of the first ten seconds, not background",
      "Foley pass for the after half: the pour close-miked on the counter, the glass set down, the spoon against the bowl. The settle after the pour needs to be recorded long",
      "Room-tone safety: 30 seconds of the kitchen doing nothing, for the held tracker beat at 0:07-0:10"
    ],
    found:[
      "Trend reference: https://www.tiktok.com/tag/septemberreset — permanent hashtag page. Scroll it the morning of the shoot to see how the September reset is actually being performed this year, then shoot the exact opposite of it. Note specifically how much of it is organisation and jars rather than food, which is why the before half is props and not a plate",
      "Trend reference: https://www.tiktok.com/tag/beforeandafter — permanent hashtag page for the stitch mechanic itself. What to steal is the hard cut with no transition effect; what to avoid is every body-transformation variant on that page, which is the one thing this brief cannot look like",
      "https://www.tellwut.com/surveys/lifestyle/living/212969-september-reset.html — the Aug 28, 2026 consumer survey on what adults want to reset in September, and the near-two-to-one skeptic split that makes permission the only workable posture. Background for why this brief exists; not a single figure from it appears on any consumer surface",
      "https://www.ymcanorth.org/blog/2026/08/28/5390914/the_september_wellbeing_reset_a_4_week_movement_routine_to_rebuild_healthy — the Aug 28, 2026 four-week September routine built on consistency over intensity. Read for tone calibration only: this is what the sincere version sounds like, and the brief is the warmer cousin of it, never a parody of it",
      "https://www.washingtonpost.com/style/2026/08/31/kelly-clarksons-last-talk-show-episode-showed-why-she-broke-daytime-curse/ — the Aug 31, 2026 subtraction-as-relief moment the emotional shape is borrowed from. STRICTLY internal: no reference to it in any frame, overlay, caption or audio bed",
      "https://willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the exact on-pack ingredient wording and the Original spec line before recording VO so the spoken words match the label"
    ],
    memes:[
      "The borrowed mechanic is the before-after stitch, ridden straight and sincerely: an over-produced first half, one hard cut with no transition effect, an unstyled second half. The only twist is that the 'after' is smaller than the 'before' — subtraction as the payoff, where the format normally rewards accumulation",
      "The humor register is Relatable Confession (Pattern 03): the recognition IS the joke, and the recognition is 'I bought the four jars.' It must stay tender and self-aware — the brand is standing next to the person who did not reset, never above them. If any beat reads as sneering at someone's planner, recut it",
      "Deliberately NOT used: the body before-and-after, the glow-up transition, the '5am club' bit, the aggressive-declutter edit, and any challenge or day-1-of-30 framing. Also not used: a parody of a wellness influencer — this brief is on the audience's side, and a mocking impression makes it about the internet instead of about her morning",
      "Register reference for the edit only (not a template to copy): better-for-you brands who do cheeky permission rather than instruction — wellness claims without the supplement-company earnestness. Watch a few before the edit, then don't imitate the jokes"
    ],
    archive:[
      "Existing counter-pour footage of Willa's Original into a clear glass can cover the after half if the shoot day runs short — it must be warm window light from camera-left on pale wood, and it must be a full pour that settles on camera. If the archive counter looks styled or empty, it will not cut against the before half and should be reshot",
      "Existing clean carton stills can cover the end card if the wordmark lockup needs rebuilding",
      "Nothing in the before half may come from archive or stock. Stock 'organised kitchen' and 'planner flatlay' footage is exactly what the joke is about and using it collapses the gag — those five object shots have to be made, badly-perfectly, on the day",
      "No footage from any prior back-to-school, gameday or seasonal-flavour shoot may be pulled into this piece; all three lanes are rested and a single recognisable frame from them re-opens a closed door"
    ]
  },
  "AUG31-TT-2":{
    shoot:[
      "The eight cold squares in ONE session, one setup, nothing changed between them — dead-overhead on a C-stand, same off-white seamless, same flat daylight key camera-left with a bounce killing the shadow, same square crop, same air around the subject. Shoot each object three ways (dead-centre, one stop brighter, one stop cooler) so the whole grid can be tuned to a single temperature in the edit. If the eight don't look like they came from the same catalogue, there is no puzzle",
      "Square nine, shot alone and deliberately different: a wide shallow bowl of oats with fruit and a spoon already in it, slightly off-centre on pale wood, a short glass of Willa's Original beside it, the Original carton label-forward just inside the frame edge. Real late-morning window light from camera-left, a real shadow under the bowl, crumbs left on the wood, a fingerprint on the glass. Shoot it six times across a twenty-minute window as the light moves and pick the warmest one that still reads as the same photo family",
      "A safety version of square nine at half a stop cooler, in case the warm break is so obvious in the assembled grid that the puzzle is over in one second — the target is roughly four seconds to find it, not zero and not never",
      "Two alternate cold squares beyond the eight (a stack of unopened notebooks; a row of identical folded workout towels) as swaps, in case any of the first eight accidentally reads as ridicule rather than aspiration when the grid is assembled",
      "The plain cream end card as a still, no product in it, so the sign-off can be rebuilt at any size without a reshoot",
      "Audio pass: one clean 30-second recording of real kitchen room tone (fridge hum, nothing else) plus one separate close recording of a spoon set down on wood. That is the entire sound design and it is a ten-minute capture"
    ],
    found:[
      "Trend reference: https://socialbee.com/blog/tiktok-trends/ — the Aug 26, 2026 roundup documenting the spot-the-mismatch grid as a live top format, including the note that it works for brands precisely because it needs no dialogue, no audio and no on-camera talent. Read the entry before the grid is designed; the mechanic being ridden is the withheld answer, not the imagery",
      "Trend reference: https://www.tiktok.com/tag/findthedifference — permanent hashtag page. Scroll it the morning the grid is built to see how the format actually plays at phone scale, specifically how obvious the outlier has to be before it stops being fun. Ignore the puzzle-account production style; ours is one flat grid, not an animated pair",
      "Trend reference: https://www.tiktok.com/tag/grid — permanent hashtag page for how multi-image grids read in-feed and how much detail survives at thumbnail size. Use it to sanity-check that nine squares is the ceiling on a phone before anyone proposes twelve",
      "https://www.tellwut.com/surveys/lifestyle/living/212969-september-reset.html — the Aug 28, 2026 consumer survey behind the September-reset read (home organization 27%, exercise 23%, eating habits 21%; 45% say September is no more motivating than January). Internal context for why the joke is affordable this week. Nothing from it appears on screen or in any caption",
      "https://www.ymcanorth.org/blog/2026/08/28/5390914/the_september_wellbeing_reset_a_4_week_movement_routine_to_rebuild_healthy — the Aug 28, 2026 four-week September reset programme. Useful ONLY as a props reference for what a real, sincere September plan looks like, so the eight cold squares are plausible and aspirational rather than strawmen. Do not quote it, do not reference it, do not build a counter-argument to it",
      "https://willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the exact on-pack ingredient wording and the current Original carton art before the ninth square is shot and before the caption is finalised"
    ],
    memes:[
      "The format being ridden, in one line: a run of near-identical images with one deliberate outlier hidden inside, no dialogue, no audio, no reveal in the video — the comment section is the payoff. Two rules make or break it: the run must be genuinely near-identical in treatment, and the answer must never appear on screen. Break either and this becomes a normal product post with a gimmick on the front",
      "The reveal mechanic is a PINNED COMMENT posted Thu Sep 3, not a title card. Draft it now so nobody writes it live: 'bottom left. oats, water, vanilla, salt. it's the one that doesn't need a monday. 🌾' If the grid is reshuffled in production, rewrite the pin to match the new position before the post goes up",
      "Deliberately NOT used: the count-the-ingredient-lines grid, the nine-competing-cartons shelf grid, the flip-the-carton reveal, and any version where the outlier is a label rather than a routine. That shape ran AUG 17, AUG 03, JUL 20 and JUL 13 and is rested — this is a routines grid, and if a competitor carton appears in any square the brief has become the thing it was rested from",
      "Also NOT used: the before/after reset edit, the 'new season new you' montage, the eye-roll-at-the-wellness-girl reaction cut, and any square that mocks the person who owns it. The eight cold squares are aspirational and real. The joke is arithmetic — one of them is still going in October — never contempt",
      "Register reference for the edit only, not a template to copy: better-for-you brands that make a wellness point cheeky and warm rather than earnest, and comment-engine restraint from brands confident enough to post a question and then say nothing. Watch a couple, then don't imitate the jokes"
    ],
    archive:[
      "Existing clean Willa's Original carton stills can cover the carton at the edge of square nine if the shoot runs short — it must be the current carton art, label square to camera, and it must sit in the same window light as the bowl or the temperature break stops reading",
      "Existing clean wordmark assets cover the end card; nothing else on that card comes from archive",
      "Nothing in the eight cold squares may be stock or archive. Stock flat-lays are lit and graded to different standards and the near-identical treatment is the entire mechanic — one borrowed image and the run stops looking like a run. Shoot all eight, in one session, or don't ship the brief"
    ]
  },
  "AUG31-TT-3":{
    shoot:[
      "The single continuous take is the entire brief — dietitian ambassador, her own kitchen, locked phone at chest height, no cuts. Shoot 8-9 full passes and select for calm, not for polish; the take where she almost trips over a word is usually the one",
      "Three clean answer beats shot as separate safety takes as well (who tests it / how often / what the certificate says), in case one answer needs to be swapped without re-shooting the whole piece — same framing, same light, same carton position so they cut invisibly",
      "The pour: she fills the clear glass from the Willa's Original carton at the end of the take, shot in the same wide, not as a separate insert. Grab 5-6 pours after the main takes as a safety, same locked frame",
      "The set-down: carton placed on the counter, hand leaving frame, held 3 seconds with nothing happening. This is the last beat before the end card and it needs to be genuinely still",
      "A silent 30-second room-tone pass with nobody talking — fridge hum, window, house — for the editor to lay under the whole piece",
      "Clean plate safety: the poured glass beside the label-forward carton on the counter, no hands, held 6 seconds, in case a VO line gets trimmed",
      "DO NOT SHOOT: any frame of her pointing at a phone, a screen, an article, a headline, a comment section or another product. If it exists on the card, it will end up in the edit"
    ],
    found:[
      "https://detoxproject.org/certification/glyphosate-residue-free/ — permanent certification reference page. Read this before she records so the three answers describe the certification accurately: it is third-party ISO-certified laboratory testing, the certificate is annual and has to be re-earned. Do not put a threshold number, a ppb figure or a testing-frequency count in any consumer line",
      "https://willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the exact on-pack ingredient wording so the four spoken words match the label letter for letter before the take",
      "https://www.tiktok.com/tag/dietitian — permanent hashtag page. Scroll it the morning of the shoot for the one-take, counter-height, credential-in-the-room register this brief is borrowing, then deliberately do the opposite of the loud ones: no stitched headline, no red circle, no 'as a dietitian I'm BEGGING you' open",
      "https://www.tiktok.com/tag/oatmilk — permanent hashtag page. Useful only as a check on what the calm end of this conversation currently looks like on the platform; ignore anything alarmist in it",
      "https://www.sciencedaily.com/releases/2026/08/260828005216.htm — INTERNAL BACKGROUND ONLY, dated Aug 28, 2026. This is the report whose headline lost its most important clause and the reason this brief exists. It is never named, quoted, screenshotted, linked, alluded to or answered on camera. Read it once, then shoot as though it does not exist"
    ],
    memes:[
      "No meme template, no trending audio, no format riff — the pattern being used is People-on-Camera Amplification (a credentialed human doing the talking), which is a casting decision rather than a format to copy. The substitute is stated and fixed: dietitian ambassador, so no Christina slot is spent here",
      "Deliberately NOT used, and each of these would sink the brief: the stitch-the-headline duet, the 'let me stop you right there' point-and-freeze, the red-circle screen-record, the 'as a dietitian, I'm begging you' open, the horror-caption whisper edit, and any check-your-pantry call to action. All of them win reach by installing the fear this brief exists to defuse",
      "Register reference for the edit only, not a template: activist-in-a-parenting-lane brands that make a food-system point without a single alarming beat — dry, warm, unhurried, and finished before the viewer expects it. Watch two, then don't imitate the jokes"
    ],
    archive:[
      "Existing counter-pour footage of Willa's Original into a clear glass can cover the final pour if the shoot day runs long — but only if the light direction matches window-left morning and the counter surface reads as a real kitchen",
      "Existing clean carton stills can cover the end card if the wordmark lockup needs rebuilding",
      "Nothing in the spoken sequence may come from archive or from a previous ambassador shoot — the answers have to be said by the person on camera in one take, in this window, or the calm reads as staged"
    ]
  },
  "AUG31-IG-R2":{
    shoot:[
      "THE POUR is the brief — locked tripod at glass height, one unbroken pour of Willa's Chocolate over cracked ice, slow enough that the stream stays opaque the whole way down. Shoot 10-15 takes and keep the calmest hand with the glossiest settle, not the fastest one",
      "The empty hero frame: glass, ice, nothing else, held rock-steady for a full beat before any liquid arrives — this is where the hook type sits and the stillness is doing real work",
      "The settle: 6+ seconds of the full glass doing nothing after the pour finishes, so the editor has room to hold on the completed six-line list without cutting away",
      "The carton place: one hand sets the Willa's Chocolate carton down beside the full glass, label forward, and releases — no rotation, no tilt, no flip to the back. Shoot 5-6 times, it's a half-second beat that has to look unbothered",
      "Condensation pass: a slow static 10 seconds on the finished glass as it beads, in case the end card needs a warmer bed than flat cream",
      "Clean plate safety: the counter empty, lit identically, 5 seconds — gives the editor a plate to build the end card on if the flat cream card reads too abrupt",
      "Audio pass: close-mic the pour and the ice on their own with no music and no talking, three or four takes — the pour is the loudest thing in the finished piece"
    ],
    found:[
      "https://willaskitchen.com/collections/oat-milk-products — permanent product reference. CONFIRMED Aug 31, 2026: Willa's Chocolate's on-pack deck is SIX ingredients, not five — filtered water, organic whole grain oats, organic coconut sugar, organic cacao powder, organic vanilla extract, sea salt. Match all six overlay lines to the label word for word before the type is set. This is the one non-negotiable check in the whole brief.",
      "https://www.tiktok.com/tag/chocolatemilk — permanent hashtag page. Scroll it before the shoot to see how the category shoots chocolate drinks right now (dessert styling, shavings, syrup drizzle, cookies in frame) and then deliberately shoot the opposite: one glass, one carton, nothing else",
      "https://www.sciencedaily.com/releases/2026/08/260830000019.htm — the Aug 30-31, 2026 write-up on sweetener effects persisting into a second generation. Background for WHY this brief exists this week; nothing from it is named, referenced or implied on camera or in any caption",
      "https://www.sciencedaily.com/releases/2026/08/260824065522.htm — the Aug 24, 2026 write-up on early-life sugar exposure tracking decades out. Same status: internal why-now only, never consumer copy",
      "https://www.bevnet.com/pr/2026/08/24/beyond-immerse-now-available-at-erewhon — the Aug 24, 2026 plant-protein drink launch that put another sweetener-stacked entrant into the chilled set. Internal shelf context only; no brand, no format and no comparison reaches any surface"
    ],
    memes:[
      "No meme template, no trending audio, no borrowed format. The humour here is Pattern 10 (Wordplay / Text Joke) executed entirely in typography — a list that builds, stops, and gets one dry line under it. There is no format to match, which means the type has to be genuinely well set: pick the typeface and the spacing before the shoot, not in the edit",
      "Register reference for the edit only (not a template to copy): design-led, ingredient-first brands that treat an ingredient list as a design object — flat, confident, a little funny, never explaining the joke. Look at two or three, then don't imitate the layouts",
      "Deliberately NOT used: the checkmark/red-X ingredient scorecard, the crossed-out-competitor-deck bit, the 'guess how many ingredients' guessing-game format, and the flip-the-carton-and-count edit. All four turn a beautiful pour into an argument, and this brief is not arguing with anyone"
    ],
    archive:[
      "Existing Willa's Chocolate pour footage can cover the hero shot ONLY if it is a full unbroken pour that settles on camera, on a pale counter with window light camera-left. A partial pour or a cut-away pour kills the piece — the whole payoff is watching the glass fill while the list builds",
      "Existing clean Willa's Chocolate carton stills can cover the carton beat and the end-card wordmark lockup if the shoot day runs short",
      "Nothing from archive may be used for the completed-list hold or the end card — the type has to be set fresh this week against the current on-pack wording. No stock chocolate-milk footage, no stock cocoa b-roll, no dessert-styling stock of any kind"
    ]
  },
  "AUG31-IG-F1":{
    shoot:[
      "Nothing is shot for this brief — it is a design job, and the whole point is that it costs an hour and no talent. If anyone starts booking a kitchen for it, the brief has been misread",
      "Build the real September 2026 grid before setting any type: the month starts on a Tuesday and runs 30 days, so the first two cells of row one sit empty. A wrong grid is the one error a commenter will screenshot",
      "Set all three two-item cards from a single master — same heading size, same item size, same margins, same purple numeral — so the shape repeats exactly and the reader learns the joke by card three",
      "Type-test at phone scale before export: read all five cards at 100% on an actual handset, because the calendar squares carry the smallest type in the set and 'one glass. 7am.' has to survive a 4:5 feed crop",
      "Export a 1:1 crop of card 1 as the grid-thumbnail safety — the calendar must still read as a calendar when the feed square clips the top and bottom",
      "Do NOT build an alternate version with a carton on card 5. It will get asked for, and it turns a question into an ad"
    ],
    found:[
      "Trend reference: https://www.instagram.com/drinkpoppi/p/DcjBazrRpJp/ — Poppi's September calendar card (Aug 27, 2026), the format card one rides. Study the restraint, then note the one deliberate difference: theirs withholds an answer, ours fills every square with one",
      "Trend reference: https://www.instagram.com/fishwife/p/Dct3soDPncS/ — Fishwife's two-item list post (Aug 31, 2026), the shape cards two through four ride. Note that the second item is just the product, stated plainly, with no punchline attached to it",
      "https://www.tellwut.com/surveys/lifestyle/living/212969-september-reset.html — the Sep-reset consumer survey (Aug 28, 2026) that sets the posture: the skeptic half is the bigger half. Internal read only, never quoted on a card",
      "https://www.ymcanorth.org/blog/2026/08/28/5390914/the_september_wellbeing_reset_a_4_week_movement_routine_to_rebuild_healthy — a four-week September reset built on consistency over intensity (Aug 28, 2026). Internal context for why this brief refuses to sell an overhaul",
      "https://willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the Original ingredient wording and the 4g+ / 2g+ / 1g specs against the live label before card two and card four are set"
    ],
    memes:[
      "Format one — the calendar card: a question at the top, a month grid underneath, every square carrying the same flat answer, no product and no reveal in the frame. Ridden on card one with one change: the squares are filled with a real answer rather than a withheld one",
      "Format two — the two-item list: a heading, one mundane grievance, then the brand's own product truth as item two, and no third line. Ridden three times across cards two through four. The structure has to do the joke; the second the copy adds a punchline on top of the spec, it stops working",
      "Deliberately NOT used: the countdown tease, the blurred or blacked-out calendar square, the 'something's coming' caption, and any date circled in red. Willa's is announcing nothing this week and a single teased square turns the whole set into a lie",
      "Also deliberately NOT used: pumpkin, leaves, back-to-school, gameday, and any 'National ___ Day' peg. September here is a weekday routine, not a season"
    ],
    archive:[
      "No archive footage or stills are used — there is no photography in this set at all, and adding a library image to 'warm it up' breaks the format",
      "Pull the existing brand type styles and the small wordmark lockup from the design library so card one's header matches the rest of the feed",
      "Keep the three two-item cards as a reusable master file: the shape is cheap, it survives repetition, and it will be wanted again once the comment volume on this post is known"
    ]
  },
  "AUG31-TT-4":{
    shoot:[
      "FRAME ONE IS THE WHOLE BRIEF — the wide of the kitchen with the fridge door open at the left edge and the Willa's Original carton legible in the door shelf for a full two seconds. Shoot this 8-10 times at slightly different distances and pick the take where the carton is most obviously readable on a phone screen, not the prettiest one. If a viewer can't find it on the scrub-back, there is no video",
      "The swing-away: the camera leaving the open fridge right-to-left in one motion, as if the fridge is the one place not worth checking. Needs to feel dismissive and a little too fast — shoot 5-6 passes",
      "Four search beats, each shot as its own torch-style handheld sweep with one hand entering frame to open it: the drawer of wrapped bars, the powder tub with the scoop buried in it, the gummy bottle with four left, the single-serve stick sachet. Get 3-4 takes of each so the editor can cut them to the clock tick",
      "GENERIC-PACKAGE PREP — do this before the shoot, not in post: dress every package plain kraft or plain white, turn labels to the wall, wrap anything branded. Walk the whole set through the lens once and check every reflective surface. A legible competitor brand in any take makes that take unusable",
      "The turn: the camera stopping dead with the room just sitting there, no cut, held a full three seconds so the editor has room to find the exact silence",
      "The push-in: slow, deliberate, handheld, toward the open fridge door, ending on the carton held steady label-forward for three seconds. No hand grabbing it, no rotation, no flip to the back. Shoot 6+ and pick the calmest",
      "Clean plate safety: the open fridge door with the carton in it, locked off, no motion, held 8 seconds — in case the VO needs trimming or the end card needs a bed",
      "Location audio pass: 30 seconds of pure refrigerator hum with nobody talking. The silence at the turn is built from this and it cannot be faked with a noise floor"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/truecrime — permanent hashtag page. Scroll the short-form narration edits before the read is recorded, specifically for CADENCE: how flat the delivery stays and how long the pauses run. Copy the pacing, copy nothing else",
      "Trend reference (format write-up): https://socialbee.com/blog/tiktok-trends/ — the Aug 26, 2026 roundup documenting the 'suspect is closer than he thinks' narration format still holding among the platform's top formats. Read the section on the answer sitting in frame from the first second before the shot list is locked",
      "https://www.tiktok.com/tag/fiber — permanent hashtag page. Useful for seeing how loud and how supplement-shaped the fiber conversation currently looks on the platform, which is exactly the register this brief is shot AGAINST. Willa's version is quiet, unbranded and ends in a fridge",
      "https://theshelbyreport.com/2026/08/28/instacart-report-protein-fiber-reshaping-americas-grocery-carts/ — the Aug 28, 2026 grocery search data behind why fiber is the spec worth counting. Strictly internal: no figure, percentage or reference from this page may appear on camera or in copy",
      "https://willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the exact on-pack fiber and ingredient wording before the VO is recorded so the spoken spec matches the label word for word"
    ],
    memes:[
      "The borrowed format is the true-crime narration reveal: a grave voiceover builds a case around an unidentified answer while the camera hunts, then the answer turns out to have been in frame since the first second. The rewatch is the mechanic — people scrub back to confirm the carton was there, and that scrub is the retention",
      "Willa's payload swap: the 'suspect' is 2g+ prebiotic fiber and the 'crime scene' is a kitchen full of products bought to supply it. The reveal is not a punchline about a competitor, it is a spec tick on a carton that was never hidden",
      "Deliberately NOT used: crime-scene tape, chalk outlines, a red-string evidence board, evidence markers, siren colour flashes, or a documentary music cue. Every one of those turns a straight-faced format into a costume bit, and the format only works played completely sincere",
      "Deliberately NOT used: any '-maxxing' construction, any protein-versus-fiber argument, and any explanation of what fiber does once you have eaten it. This is a joke about looking for something, followed by a number. It is not a lesson",
      "Register reference for the edit only (not a template to copy): better-for-you brands that carry a wellness spec with a completely straight face and let the joke sit in the structure rather than the delivery. Watch two, then don't imitate the jokes"
    ],
    archive:[
      "Existing clean stills of the Willa's Original carton can rebuild the end-card wordmark lockup if needed",
      "Existing fridge-door footage may cover the clean-plate safety shot ONLY if the carton is label-forward and legible at phone size — otherwise it defeats the entire reveal and has to be re-shot",
      "Nothing in the search sequence may come from archive or stock. Stock pantry and supplement footage carries legible branding, and one readable competitor package invalidates the whole piece",
      "No stock true-crime b-roll, no news-style footage, no documentary-style archive inserts of any kind"
    ]
  },
  "AUG31-TT-5":{
    shoot:[
      "The facing beat is the entire brief — one ungloved hand squaring two or three Willa's cartons flush on a real shelf. Shoot it 8-10 times from three-quarter and pick the calmest hand, not the fastest one. If this beat is rushed, nothing else in the piece survives",
      "The slow pan across the closed glass doors — one continuous left-to-right at a steady speed, 4-5 passes at different distances so the editor has an out if any competing package resolves legibly. Nothing readable, no signage, no price rail, no shelf-talker",
      "The door: the seal breaking, the swing, and the single roll of cold fog across the lower frame. Shoot 6+ opens — the fog only behaves on some of them and it cannot be added later",
      "The three-second locked hold after the door closes, cartons faced forward, no hand, no text, nothing moving but the fog clearing off the glass. Roll a full 15 seconds so the editor can choose where the stillness starts",
      "The approach frame from the head of the aisle — grab it at two heights (chest and slightly lower) and let the daylight fall down the run; this is the only frame that establishes the place, so it has to be composed rather than found",
      "Location audio: a clean 60-second ambience pass with nobody talking, plus isolated close passes of the door seal, the door shutting, and the dry knock of a carton squared against the shelf",
      "Safety plate: the faced shelf with no hand in frame, held 10 seconds, in case the hold needs to run longer than the pull allows"
    ],
    found:[
      "Trend reference: https://www.tiktok.com/tag/grocerystorefinds — permanent hashtag page and the format this brief adapts (real shelf, real store, composed frame). Scroll it the morning of the shoot to see what everyone else is doing, then deliberately shoot the opposite: no zooms, no pointing, no reaction, no haul energy, no on-screen commentary",
      "https://www.bevnet.com/pr/2026/08/30/the-cycle-earns-permanent-placement-at-sprouts-farmers-market-nationwide — the Aug 30, 2026 permanent-placement decision that made the function-in-one-line argument urgent. Background for why this brief exists; the retailer, the brand and the program are named nowhere on camera or in copy",
      "https://www.sarahhormachea.com/2026/08/26/4-food-nutrition-trends-i-spotted-at-newtopia/ — the Aug 26, 2026 post-show read from the Aug 18–20 Denver natural-products floor confirming functional beverage as the set the channel is clearing space for. Internal context only",
      "https://bigboxvegan.com/2026/08/26/fall-holiday-vegan-grocery-finds-2026-updated-weekly/ — the Aug 26, 2026 tracker confirming a private-label oat-milk seasonal latte landing the week of Aug 31. Read it ONCE, internally, purely so the crew knows which part of the store to keep the camera away from. Nothing in it is a shot and nothing in it is a subject",
      "https://willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the fiber and protein figures per SKU against the current on-pack panel before the caption is written; the caption states four SKUs and every number in it has to match the carton exactly",
      "Register reference (permanent, not a template to copy): design-led beverage brands that shoot real environments as editorial — soft daylight, composed stillness, packaging left alone to carry the frame. Look at a few before the shoot, then stop looking and shoot your own store"
    ],
    memes:[
      "The borrowed move is the Aesthetic IRL Encounter — the product photographed in a real retail environment but framed like editorial rather than like a haul. The team flagged this pattern as 'we could try this at Target' and it has never actually been run properly; this is that, executed with one line of text and nothing else",
      "Deliberately NOT used: the shelf-haul walkthrough, the point-at-the-product zoom, the 'they finally have it!' reaction, the excited whisper, the sped-up aisle walk, and any on-screen commentary about the store. All of them convert this from an editorial frame into a vlog, and the calm is the only thing this brief is selling",
      "Also deliberately NOT used: the continuous in-aisle walking POV. That structure ran Aug 26 and re-running it here would read as the same video twice. This piece is composed, still, and never leaves the shelf"
    ],
    archive:[
      "Clean carton stills can cover the end card if the wordmark lockup needs rebuilding",
      "Nothing in the store sequence may come from archive or stock — no stock grocery footage, no library cold-case b-roll, no previously shot aisle material. The whole premise is that this is a real shelf shot inside this window",
      "Do not reuse any frame from the Aug 26 in-store piece. Different store section, different day, different camera behaviour — if a frame could have come from that video, it does not belong in this one"
    ]
  },
  "AUG31-PIN-2":{
    shoot:[
      "The hero stack: five hand-poured pancakes on a small off-white plate, three-quarter angle at plate height, warm maple caught mid-pour at 1/500 or faster. Shoot 15+ pour passes and pick the ribbon with the cleanest edge — this is the only frame the pin actually ships",
      "The batter bowl: clear glass bowl, shallow pool of the finished dark batter, whisk resting in it, carton behind. This is the receipt that the milk is the batter and it must be shot in the same light as the stack so it can sit in the same frame",
      "The pour into the flour: one cup of Willa's Chocolate going into the dry ingredients, shot tight and slightly high so the dark stream reads against the pale flour. Not for the pin itself — this is the Idea-Pin / Story cutdown asset and the top-of-funnel crop",
      "Carton placement pass: three versions of the same frame with the carton at different distances behind the plate, so the editor can pick the one where a food-cropped screenshot still contains the wordmark",
      "The pan beat: one pancake mid-flip in a pan filmed on avocado oil (or visibly plant butter) — safety coverage in case the stack's colour reads flat and the process shot has to carry the chocolate",
      "Clean typography plate: the finished stack with a wide margin of empty counter in the top third, shot deliberately with nothing in it, so the hero line has real negative space to sit on rather than being crammed over food"
    ],
    found:[
      "Trend reference: https://www.tiktok.com/tag/chocolatepancakes — permanent hashtag page. Scroll it before styling to see how the format is being shot right now, then deliberately shoot the calmer version: one stack, one pour, no drip-cascade, no sprinkles, no melted-chocolate hero shot",
      "https://www.tiktok.com/tag/dairyfreerecipes — permanent hashtag page. Reference for how dairy-free gets SIGNALLED visually in this category; useful for confirming the plant-butter dish reads correctly and does not get mistaken for dairy",
      "https://www.willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the exact on-pack wording for Willa's Organic Chocolate Oat Milk before the caption is typeset, so the SKU line in the ingredient list matches the label word for word",
      "https://www.sciencedaily.com/releases/2026/08/260830000019.htm — the Aug 31, 2026 sweetener-generational study. INTERNAL BACKGROUND ONLY. This is why Chocolate got a cooked slot this week; not one word of it goes near the pin, the caption or the hashtags",
      "https://www.sciencedaily.com/releases/2026/08/260824065522.htm — the Aug 24, 2026 early-life sugar-exposure cohort. INTERNAL BACKGROUND ONLY, same rule. Read it once for posture and then close the tab"
    ],
    memes:[
      "Humor Pattern 10 — Wordplay / Text Joke. The joke lives entirely in one line of type over one photograph, which makes this the lowest-cost and highest-craft pin of the week: there is nothing else to look at, so the line has to land on first read. If it needs a second pass or an asterisk, kill it and reshoot the type, not the food",
      "Deliberately NOT used: the ASMR batter-drizzle edit, the 'you've been making pancakes wrong' correction hook, the before/after split, the ingredient-count overlay, and any pancake-stack-as-tower gag. The first three punch at the person cooking, and the last two belong to IG-R2's lane this week",
      "Register reference for the designer only, not a template to copy: design-led ingredient-first brands whose packaging wit reads like a zine cover rather than a nutrition chart. Look at how confidently they set one line and stop, then set one line and stop"
    ],
    archive:[
      "Existing Willa's Chocolate carton stills can cover the product element if the counter shoot runs out of light — but only stills lit from camera-left, so the carton's shadow direction matches the stack's. A composited carton lit from the wrong side is worse than no carton",
      "Prior Willa's recipe-pin typography lockups can be reused for the bottom-left recipe-name plate and the wordmark corner. Do NOT reuse any prior pin's hero-type treatment if it carried more than one line of copy — this pin's whole discipline is that it carries one",
      "Nothing in the food frame may come from archive or stock. The pancakes have to be the actual recipe made with an actual cup of Willa's Chocolate, because the colour of the stack is the proof and a stock chocolate pancake photo will be too dark and quietly make the pin a lie"
    ]
  },
  "AUG31-IG-R3":{
    shoot:[
      "The single continuous take is the whole brief — locked tripod, medium-close, Christina in her own kitchen with one carton of Willa's Original in hand. Shoot 10-12 full passes and select on warmth, not on cleanliness; the take where she sounds least rehearsed wins even if a word wobbles",
      "The four-ingredient read at genuine conversational pace with real breath between the words — protect this beat in every take. If she starts performing the pauses by take six, reset and let her just say them",
      "The final line ('cook with what you love') needs three or four alternate reads with different amounts of warmth so the edit can pick the most generous one — this line carries the entire register and a flat read makes the piece sound smug",
      "Clean-plate safety: 8 seconds of the same locked frame with her holding the carton and not speaking, for the editor to cut to if a line needs trimming",
      "30 seconds of silent kitchen room tone recorded in the exact shooting position before the first take",
      "Set check before rolling, shot as a still on a phone and reviewed at full size: no oil bottle, no butter, no pan, no stove, no second product, no Barista carton and no competitor packaging anywhere in the frame or the shallow background"
    ],
    found:[
      "https://www.sarahhormachea.com/2026/08/26/4-food-nutrition-trends-i-spotted-at-newtopia/ — the Aug 26, 2026 post-show read naming the one-fat-out, one-fat-in swap as a cross-category formulation trend, and flagging that nutrition trends are outrunning nutrition literacy. This is why the brief exists; nothing in it is named, quoted or alluded to on camera or in copy",
      "https://willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the exact on-pack ingredient wording the morning of the shoot so the four spoken words match the label letter for letter, and confirm no added oil appears anywhere on the Original list before she says the line",
      "https://www.tiktok.com/tag/seedoils — permanent hashtag page, INTERNAL REFERENCE AND COUNTER-EXAMPLE ONLY. Scroll it once before the shoot to hear the register this brief is deliberately refusing: the alarm voice, the villain framing, the ranking. Shoot the opposite. Nothing from this page is quoted, stitched, duetted or referenced, and the phrase itself never appears in any Willa's copy",
      "https://www.tiktok.com/tag/ingredientlist — permanent hashtag page. Useful for how a person simply reading a label reads on a phone at arm's length, and for confirming that the calm unbroken read still holds attention without an overlay racing ahead of the speaker"
    ],
    memes:[
      "No meme template, no trending audio and no borrowed format — this brief deliberately rides nothing. The mechanic is a person saying four words at normal speed in one take, and any format layered on top of that dilutes the only thing it has",
      "Deliberately NOT used: the ingredient-comparison side-by-side, the 'ingredients in X vs ingredients in Y' scroll, the gasp-at-the-label reaction, the point-at-floating-text dance, and any villain-fat callout edit. Every one of them converts a warm stance into a ranking, which is the exact move the brief is arguing against",
      "Register reference for the edit only (not a template to copy): activist food brands that take a real position without fearmongering — high road, warm, unhurried, no alarm voice. Watch two examples, then let her just talk"
    ],
    archive:[
      "Existing clean carton stills of Willa's Original can cover the end card if the wordmark lockup needs rebuilding",
      "Nothing in the spoken take may come from archive — this is a fresh single-take read shot inside this window, and a spliced or reused Christina read defeats the entire premise of an unbroken take",
      "No stock kitchen footage, no stock cooking b-roll, no oil or fat imagery of any kind may be pulled in to fill time. If the take runs short, trim the piece rather than cutting away from her"
    ]
  },
  "AUG31-IG-F2":{
    shoot:[
      "The dry whole oat groats, overhead and very close — a small white bowl on bare counter, one spoon resting in it, window light from camera-left so the kernels throw real shadow. Shoot 8-10 frames at slightly different heights; the card fails if it looks styled",
      "The pairing frame for card 4: the same bowl of groats beside a poured, settled glass of Willa's Original with the carton standing behind, all three in one shot, label readable. Shoot it wide enough to crop square later",
      "The ingredient list flat-lay: Willa's Original lying on the counter, list side up, fully legible edge to edge — shoot it dead-straight from above on a tripod or braced phone, three or four exposures, because a skewed carton makes the type unreadable at feed size",
      "One hand resting at the edge of the carton frame — resting only, not pointing and not tracing the lines. Grab a few options with the hand further out in case the crop needs air",
      "Clean plate safety: the poured glass alone on the counter, no hands, no carton, in case card 4 needs a simpler background",
      "A second groat frame with the oats spilling slightly onto the counter — a fallback if the bowl-only version reads too tidy"
    ],
    found:[
      "https://www.food-safety.com/articles/11775-california-passes-bill-to-create-certification-seal-for-non-ultra-processed-foods — the Aug 31, 2026 write-up of the Aug 28 vote. INTERNAL BACKGROUND ONLY: read it to understand that the definition, not the seal, is the story. Nothing from it — no state, no bill, no seal, no programme — reaches a card or a caption",
      "https://www.foodnavigator.com/Article/2026/08/31/news-bites-dietary-guidelines-gras-and-pepsicos-next-move/ — the Aug 31, 2026 trade round-up carrying the authorship question. INTERNAL BACKGROUND ONLY; the consumer-safe residue is one sentence about who writes a recommendation, and no filing, court or agency is ever named",
      "https://willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the exact on-pack ingredient wording before card 2 and card 5 are set, so the four typed lines match the label word for word",
      "https://www.tiktok.com/tag/ultraprocessedfood — permanent hashtag page. Scroll it before the shoot to hear how loud and accusatory this conversation is being conducted, then deliberately set every card in the opposite register: quieter, plainer, shorter"
    ],
    memes:[
      "Static IG Feed carousel → no meme template, no trending audio, no format to ride. The borrowed mechanic here is World-Context Tie-In only: the piece answers an argument the audience is already half-hearing, and the entire joke is that the answer is smaller and calmer than the argument",
      "Deliberately NOT used: the stitch-the-headline reaction, the article screenshot with type over it, the side-by-side ingredient-list shame edit, and any red-circle-and-arrow annotation. All four turn a description into a rebuttal, which is the one register this brief cannot have",
      "Register reference for the type-setting only, not a template to copy: design-led ingredient-first brands that treat a package like a document rather than a poster. Look at how flat and unhurried the type sits, then set it flatter"
    ],
    archive:[
      "Existing clean carton stills of Willa's Original can cover card 5 if the flat-lay day runs short — but only a straight-down frame with the full ingredient list legible; a three-quarter hero shot will not work at feed size",
      "Existing wordmark lockup art covers the bottom of card 6",
      "Nothing on cards 1, 2 or 6 comes from archive — those are set fresh as type, because the whole point of the piece is that the words are current and ours",
      "No stock oat photography, no stock grain-field imagery, no news photos, no screenshots of any article or document at any point"
    ]
  },
  "AUG31-PIN-3":{
    shoot:[
      "THE HERO — sun-faded canvas tote tipped onto a striped picnic blanket on real grass, contents spilled in a loose diagonal, shot straight down from about four feet at f/5.6 with the camera dead level. Two 8oz Willa's Kids cartons standing upright at the mouth of the bag while every other object lies flat; that is the frame the pin ships on and it is worth an hour of re-arranging",
      "Real dappled light pass — same setup, moved so the shade edge of a tree falls across the top-right corner of the blanket. Shoot the same composition in open sun and in dapple and pick in the edit; the dappled version usually reads as a real afternoon and the flat one usually reads as a catalog",
      "Hands-only alternate — one hand reaching into the frame to lift a Willa's Kids carton out of the tote, plain neutral sleeve, no face, no talent. This is the pin that runs if the flat-lay reads too composed",
      "Carton distance pass — three versions of the hero with the two cartons at slightly different positions in the spill, so the editor can pick the one where a screenshot cropped to the fruit and pretzels still contains the wordmark",
      "Clean typography plate — the same spill shot deliberately with a wide empty stretch of blanket across the top third and nothing in it, so the headline has real negative space instead of being crammed over objects",
      "Product still safety — a tighter three-quarter frame of just the two cartons against the blanket weave in the same daylight, banked as the evergreen Kids still for future pins"
    ],
    found:[
      "Trend anchor (Aug 28, 2026): https://theshelbyreport.com/2026/08/28/instacart-report-protein-fiber-reshaping-americas-grocery-carts/ — the first-half 2026 grocery search data showing fiber growing at more than double protein's rate. This is the internal reason a fiber-forward Kids pin exists this week; not one number from it goes anywhere near the artwork or the description",
      "Format reference (permanent): https://www.tiktok.com/tag/whatsinmybag — the bag-emptied format Willa's is adapting. Scroll it before styling to see how the spill gets arranged, then deliberately shoot the messier version: real sunscreen, a creased paperback, a bag of pretzels, nothing arranged in a perfect grid",
      "Format reference (permanent): https://www.tiktok.com/tag/picnic — how blanket-and-grass frames get lit and composed. Useful for the dapple pass; ignore every build that turns the picnic into a styled charcuterie set, which is the exact opposite of this brief",
      "Search reference (permanent): https://www.pinterest.com/search/pins/?q=picnic%20with%20kids — scan what already ranks in the exact query this pin is aimed at. Page one is mostly busy stacked-text checklists and staged charcuterie boards; the whitespace is one honest overhead of a real bag and one line of type",
      "Product reference (permanent): https://willaskitchen.com/products/kids-oat-milk-8z-16-pack — the Willa's Kids 8oz page. Check the exact on-pack nutrition and allergen wording against the description before this ships. Allergen copy is safety-critical and may not be paraphrased in any field"
    ],
    memes:[
      "No meme template, no trending sound and no borrowed audio — this is a static Pinterest pin. The pattern is Product-on-the-Go / Lifestyle Portability run as a peer-brand adaptation of the what's-in-my-bag format, and the comedic work is done entirely by one line, 'most of this bag is sunscreen.' It is warm and self-aware, never a complaint about parenting and never a joke at the parent's expense: the bag is funny because it is accurate",
      "Deliberately NOT used: any back-to-school signifier of any kind, any lunchbox or bento framing, any first-week-back or 'pack it for the week' language, any tailgate or gameday visual, and any deficiency statistic used as a scare. The fiber and DHA fact is stated once, plainly, and the pin moves on"
    ],
    archive:[
      "Existing Willa's Kids 8oz carton stills can cover the product-still safety frame if the light matches — real daylight only, nothing shot on white seamless and nothing from a kitchen-counter shoot where an indoor surface is visible",
      "Existing blanket, grass and outdoor-table B-roll from prior warm-weather shoots can cover the alternate crops and the Idea-Pin cutdown",
      "The hero spill has to be shot fresh — there is no archive substitute for a tote emptied onto a blanket with two cartons standing up in it, and compositing the cartons into an existing flat-lay will read wrong at pin size"
    ]
  },
  "AUG31-IG-R4":{
    shoot:[
      "The locked frame is the entire shoot: one tripod position on one kitchen table, set at 8:30am and returned to over and over until roughly noon. Mark the tripod feet with tape and do not move them for any reason — if the frame shifts even slightly between passes, the piece stops working",
      "The child's self-pour over cereal, slightly overfilled — shoot 8-10 times and choose the least tidy one. This is the beat the eye lands on and a clean adult pour ruins it",
      "The adult glass pour beside a face-down paperback, hands and forearms only, 5-6 takes",
      "The three-hands-at-once pancake beat: everybody eating, nobody serving, no plating performance. Roll long and take a candid middle section rather than a staged start",
      "The empty-plates pass late in the morning with the light high and short, carton untouched in its original position — this is the shot that proves time passed",
      "The four-second slow push toward the carton, the only camera move in the piece. Shoot it three times at different speeds and cut the slowest one that still resolves the label",
      "Room-tone pass: five unbroken minutes at the tripod position with nobody talking to camera, for the continuous bed under the jump cuts",
      "Safety plate: the table completely empty at the end of the morning, held 8 seconds, in case a VO line needs trimming"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/labordayweekend — permanent hashtag page. Scroll it the morning of the shoot; the feed will be almost entirely departures, and this brief is the deliberate inverse of everything on it. Use it to confirm what NOT to shoot",
      "https://www.tiktok.com/tag/slowmorning — permanent hashtag page. Reference for pacing and for how long a held frame can run on a phone before a viewer leaves; the answer is longer than the engine assumes",
      "https://www.tiktok.com/tag/familybreakfast — permanent hashtag page. Reference for how real family tables read on camera versus styled ones; shoot toward the messier end of what you see",
      "https://gantnews.com/2026/08/31/aaa-labor-day-travelers-should-expect-busy-roads-higher-domestic-airfares/ — the Aug 31, 2026 long-weekend travel forecast that is the reason this brief exists. Internal background only: no figure, city, airline or travel reference from it appears on camera or in copy",
      "https://www.willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the exact on-pack Willa's Kids nutrition and allergen wording before the VO is recorded; allergen copy is safety-critical and may not be paraphrased on the fly"
    ],
    memes:[
      "No meme template, no trending audio and no borrowed format. The only structural device is the fixed frame with jump cuts across a real morning — the room holds still, time moves, and the retention comes from noticing the light change rather than from a payoff being withheld",
      "Deliberately NOT used: the travel montage, the packing time-lapse, the airport-versus-home split screen, and any 'POV: you didn't go anywhere' self-pity edit. All four turn the stay-home weekend into a consolation prize, which is the one read this brief cannot have",
      "Also deliberately NOT used: the pass-the-carton-around-the-table orbit and any multi-use versatility montage. Both are recently burned formats and both would make this read as a repeat rather than a new claim on the occasion",
      "Register reference for the edit only (not a template to copy): mother-founded allergen-free snack brands that shoot parent-first content without apologising for who it's for — warm, plain, funny in the writing rather than in the edit. Watch two, then don't imitate the jokes"
    ],
    archive:[
      "Existing clean Willa's Kids carton stills can rebuild the end-card wordmark lockup if needed",
      "Existing Willa's Kids pour footage may cover the glass beat ONLY if it matches this table, this frame height and this window light exactly — a mismatched pour breaks the single-frame premise instantly and is worse than losing the beat",
      "Nothing in the table sequence may come from archive. The whole premise is one continuous location shot across one real morning; a borrowed kitchen or a stock family breakfast makes the piece fiction. No stock footage, no school-year footage, no gameday footage, no travel footage of any kind"
    ]
  },
  "AUG31-TT-6":{
    shoot:[
      "The descent is the entire brief and it is shot in pieces, not in one take — five or six separate walking passes in different parts of the house, every one of them moving downward at the same walking pace, at the same camera height family, with the light coming from the same side. Shoot each pass eight to ten times. The editor is assembling an illusion, so the coverage has to be boringly consistent or the seams announce themselves",
      "The stair flight, low behind bare feet, three ways: knee height, hip height, and one pass so low the treads fill the frame. The lowest one is usually the keeper and it is the hardest to walk, so shoot it last when the operator has the rhythm",
      "The newel-post wipe, shot from both sides — the approach that ends the stair pass and the departure that starts the hallway pass — with the post crossing the lens at identical speed on both. If those two speeds do not match, seam one is visible and the piece loses its best hidden cut",
      "The wood-to-tile threshold turn, six passes at slightly different turn speeds, so the editor can choose exactly how findable seam two is. Target roughly one viewer in three catching it on the first watch",
      "The fridge open at floor height, four or five passes, with the shelf pre-set so Willa's Original, Kids and Chocolate stand together and no dairy, no other brand and no clutter is on that shelf. Check the shelf on a monitor before rolling — this frame is on screen for under a second and a stray yogurt tub in it cannot be fixed later",
      "The shelf-pull: one ungloved hand taking the Original, label incidental, no tilt and no flip. Five or six takes; use the one where the hand does not present the carton",
      "The pour onto the low surface, static-ish and continuing downward into it, shot slightly above the rim. Shoot six or more and pick the calmest hand — this is the only beat in the video allowed to breathe",
      "The final static frame as its own setup on a tripod: full glass, carton label-forward, morning light, held a clean ten seconds so the editor can choose the two he wants",
      "Audio pass: a silent five-minute record of the house at 9am — treads, fridge compressor, door seal, room tone — plus a separate close recording of the pour on the counter. That is the whole sound design and it takes fifteen minutes to capture"
    ],
    found:[
      "Trend reference: https://socialbee.com/blog/tiktok-trends/ — the Aug 26, 2026 roundup naming the seamless-descent illusion as a live top format, including the note that the rewatch is driven entirely by viewers hunting for the cut rather than by any payoff. Read the entry before the descent is blocked; the mechanic being ridden is the hidden seam, not the staircase",
      "Trend reference: https://www.tiktok.com/tag/seamlesstransition — permanent hashtag page. Scroll it the morning of the shoot to see which hidden-cut techniques actually hold at phone scale and which announce themselves. Take the wipe-behind-an-object and the turn-through-a-doorway; ignore the jump-and-land and the spin-into-black, both of which read as effects rather than as one continuous move",
      "Trend reference: https://www.tiktok.com/tag/slowmorning — permanent hashtag page for the register, not the mechanic. Useful for calibrating how little a quiet morning video has to do, and for confirming that the ones that work carry no text at all",
      "https://www.billboard.com/music/rb-hip-hop/prince-career-spanning-timeless-album-rare-unreleased-listen-1236327705/ — the Aug 28, 2026 archival vault release that sets the tonal reference: a career sequenced as a straight line, unhurried, explaining nothing about itself. Listen for pacing only. The masters themselves are not usable on a brand account — see the audio field",
      "https://variety.com/2026/music/news/prince-estate-timeless-rarities-collection-1236766753/ — corroborating Aug 28, 2026 coverage of the same release. Internal tonal reference only; the artist, the album and the era are never named on camera, in the caption or in the comments",
      "https://newsroom.acg.aaa.com/aaa-labor-day-travelers-face-higher-costs-and-heavier-traffic-wi/ — AAA's Aug 31, 2026 national newsroom release: the primary source for the long-weekend travel forecast (domestic airfare +2% to ~$750, domestic hotel bookings +9%, international accommodations +12% more expensive, road congestion peaking Thu Sep 3 and Fri Sep 4). Explains why an empty house at 11am on Sun Sep 6 reads as relief rather than as nothing happening. Background only; no figure, no city and no travel framing reaches any consumer surface",
      "https://www.willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the current carton faces for Original, Kids and Chocolate before the fridge shelf is dressed, so the sub-second shelf pass reads as the real set"
    ],
    memes:[
      "The only borrowed mechanic is the seamless-descent illusion: unrelated spaces hard-cut together into one continuous downward journey, with the seams hidden on wipes, turns and objects crossing the lens. No sound bite, no dance, no caption format, no template audio. The payload is simply that the journey ends on a pour",
      "Deliberately NOT used: the four-uses versatility montage (coffee, bowl, blender, batter). It is the obvious way to spend a seamless-cut format and it is closed — the week-of-mornings versatility argument is burned, and this brief is one descent to one pour",
      "Also deliberately NOT used: any reveal, punchline, twist ending, before-and-after, or gag at the bottom of the stairs. The format has no payoff by design and adding one turns a craft piece into a bit",
      "Register reference for the edit only, not a template to copy: quiet, well-made posts from design-led ingredient brands that are confident enough to say nothing. Watch two, then do not imitate anything specific about them"
    ],
    archive:[
      "The final static frame — full glass beside the Original carton in morning light — can come from existing counter footage if the shoot day runs long, provided the light direction and surface match the kitchen used in the descent. If it does not match, shoot it; a mismatched last frame breaks the one-house illusion at exactly the moment the viewer is looking hardest",
      "Existing clean carton stills can cover nothing here — there is no end card, no wordmark lockup and no graphic element in this piece at all",
      "Nothing in the descent may come from archive or stock. Every space has to be the same real house shot on the same real morning, or the illusion is a composite of other people's homes and the whole premise collapses. No stock staircase, no stock kitchen, no AI-generated interior, no drone move"
    ]
  },
  "AUG31-IG-R5":{
    shoot:[
      "THE TALL POUR is the brief — locked tripod at glass height, late-afternoon window light camera-left, one unbroken pour of Willa's Chocolate until the glass is four-fifths full, stream opaque the whole way down. Shoot 12-15 takes and keep the calmest hand with the glossiest settle, never the fastest one",
      "The still open: both glasses empty, carton label-forward and slightly soft behind them, held rock-steady for a full 4 seconds before anything moves — this is where the hook type sits and the stillness is the setup for everything after it",
      "The second, smaller pour: same hand, same light, half the height, then the carton set down label-forward without a rotation or a tilt. Shoot 6-8 times — it is a three-second beat and it is the warmest thing in the piece, so it cannot look staged",
      "The tilt: one slow move down the side of the full tall glass, top to base, top-lit so the surface catches and the body stays dark. This is the only camera move in the whole edit, so shoot it four or five times and pick the slowest one that stays smooth",
      "The match frame: shot 5 framed IDENTICALLY to shot 1 with both glasses full — tape the tripod legs and the carton position before shot 1 so the two frames line up exactly in the edit",
      "Settle safety: 8+ seconds of both full glasses doing absolutely nothing after the pours finish, so the editor can hold the end of the piece without cutting away or looping",
      "Clean plate safety: the counter empty, lit identically, 5 seconds — gives the designer a real surface to build the end card on if the flat cream card reads too abrupt",
      "Audio pass: close-mic both pours and the carton set-down on their own, no music, no talking, three or four takes — the pour is the loudest thing in the finished piece"
    ],
    found:[
      "https://willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the current on-pack wording for Chocolate before any type is set, so 'real cacao', the protein figure and the fiber figure match the label exactly. This is the one non-negotiable check in the brief",
      "https://www.tiktok.com/tag/oatmilk — permanent hashtag page. Scroll it before the shoot to see how the category is currently shooting oat-milk pours (fast cuts, ASMR gloss, slow-motion streams, dessert styling) and then deliberately shoot the opposite: one locked frame, real time, two glasses, nothing else",
      "https://www.bevnet.com/pr/2026/08/30/the-cycle-earns-permanent-placement-at-sprouts-farmers-market-nationwide — the Aug 30, 2026 report of a one-year-old functional drink earning permanent national placement in roughly four months. This is WHY the brief exists this week (function stated in one line wins right now); nothing in it is named, referenced or implied on camera or in any caption",
      "https://www.sarahhormachea.com/2026/08/26/4-food-nutrition-trends-i-spotted-at-newtopia/ — the Aug 26, 2026 post-show read from the Aug 18-20 natural-products floor confirming functional beverage as the set the channel is clearing space for. Internal why-now only, never consumer copy",
      "https://www.npr.org/2026/08/28/nx-s1-5946388/new-music-friday-the-best-albums-out-aug-28 — the Aug 28, 2026 new-release roundup carrying the eleven-years-away return record. TEMPO REFERENCE FOR THE COMPOSER ONLY: listen for the unhurried groove-led pace, then have an original bed written in that register. Do not license, lift or name the track anywhere",
      "https://glidemagazine.com/329645/alabama-shakes-trade-grit-for-groove-on-i-must-be-dreaming-album-review/ — the Aug 28, 2026 review describing the same record as groove-led and dreamy rather than urgent. Same status: register reference for the bed, never a consumer surface, never named"
    ],
    memes:[
      "No meme template, no borrowed format, no trending audio and nothing to match — this brief rides Pattern 01 (People-on-Camera Amplification) through its sanctioned voice-only substitute: the cofounder-sister reads four short lines over hands, product and counter, so the piece gets the warmth of a human voice without spending a Christina on-camera slot. There is no format to imitate, which means the read and the pour have to be genuinely good; cast the read before the shoot day, not in the edit",
      "Register reference for the edit only (not a template to copy): better-for-you brands that talk about what is in the can or the carton in a completely normal human cadence — cheeky, flat, never earnest, never a nutritionist, never a supplement ad. Watch two or three, then do not imitate the jokes",
      "Deliberately NOT used: the ingredient-list-as-typography build (the sibling Chocolate Reel owns that beat this week), the sugar-gram comparison, the red-X/checkmark scorecard, the 'guess what's in it' guessing game, the flip-the-carton-and-count edit, and any dessert-styling flourish — shavings, drizzle, cookies, marshmallows. All of them turn a calm pour into an argument, and this brief is not arguing with anybody"
    ],
    archive:[
      "Existing Willa's Chocolate pour footage can cover the hero shot ONLY if it is a full unbroken pour that settles on camera, at glass height, on a pale counter with warm low side light. A partial pour, a cut-away pour or a slow-motion pour kills the piece — the payoff is watching a real glass fill in real time",
      "Existing clean Willa's Chocolate carton stills can cover the end-card wordmark lockup if the shoot day runs short",
      "Nothing from archive may cover the second smaller glass, the match frame or the end card — the two-glass staging and the BS-9 card have to be built fresh this week against the current on-pack wording. No stock chocolate-milk footage, no stock cocoa b-roll, no stock counter flat-lays"
    ]
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
                <div key={k} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-[var(--border)]" style={i.status==="connected"?{background:"#F6FBF8"}:{background:"#F4F5F3"}} title={i.use}>
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
        <div className="px-5 py-2.5 border-t border-[var(--border)] flex items-center justify-between text-[var(--muted)]" style={{background:"#F4F5F3"}}>
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

function HowItWorks({open, onClose, onOpenReference}){
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
            <p className="text-[12px] text-[var(--muted)] mt-2 max-w-2xl">{AGENTS.length} specialized agents, 4 leads, 1 command layer. Click any agent to see what it scrapes, what it decides, and who it hands off to. Every brief now ships with a conviction score + a synthetic-panel read; the Monday Memo and Diagnostic Inbox keep you in the loop.</p>
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              <span className="font-mono text-[8.5px] tracking-[0.15em] text-[var(--muted)] mr-0.5">SURFACES:</span>
              {["Conviction score","The Tasting Table","Monday Memo","Diagnostic Inbox"].map(s=>(
                <span key={s} className="font-mono text-[8.5px] tracking-wider px-2 py-[3px] rounded-full" style={{background:"#FFFEF7",border:"1px solid #E8E1C2",color:"#9E652E"}}>{s}</span>
              ))}
              <button onClick={()=>{ if(onOpenReference) onOpenReference(); }} className="font-mono text-[8.5px] tracking-wider px-2 py-[3px] rounded-full border hover:bg-[#F6F6F0] transition" style={{borderColor:"var(--border)",color:"#202A44"}}>↗ Proven Formats · {TOP_PERFORMER_DNA.length} formats · {BENEFIT_SHORTHAND.length} stingers</button>
            </div>
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
      <ActionBox label="WILLA'S PLAY" content={p.willasPlay}/>

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

// Amber "here's the move" callout shared by Trend / Pulse / Competitor cards —
// one source of truth so WILLA'S ANGLE / PLAY / OPPORTUNITY render identically.
function ActionBox({label, content, className}){
  return (
    <div className={(className||"mt-4")+" p-3 rounded-md"} style={{background:"#FFFBEB", borderLeft:"3px solid var(--amber)"}}>
      <div className="font-mono text-[9px] tracking-[0.18em] mb-1.5" style={{color:"var(--amber)"}}>★ {label}</div>
      <p className="text-[12.5px] italic text-[#202A44] leading-relaxed">{content}</p>
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

function sourceDomain(url, label){
  try{
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./,"");
    // Aggregator permalinks (Google News RSS) resolve to the real publisher only in
    // a browser, so the bare host would render a useless "news.google.com" chip.
    // The publisher is the first segment of the label ("Publisher · Title (date)") —
    // show that instead so the chip still tells the reader who reported it.
    if (/^news\.google\./.test(host) && label){
      const pub = String(label).split("·")[0].trim();
      if (pub) return pub.length > 34 ? pub.slice(0,33) + "…" : pub;
    }
    return host;
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
          {sourceDomain(s.url, s.label)}
        </a>
      ))}
    </div>
  );
}

function Sidebar({section,setSection,onHowItWorks,onOpenWelcome,onOpenReference}){
  return (
    <aside className="w-[220px] shrink-0 border-r border-[var(--border)] bg-white flex flex-col">
      {/* Carton-band header (2026-06-04) — the navy top band from the packaging,
          wordmark typeset in Fraunces green like the Original carton. Confetti =
          the Kids-carton sprinkle, kept subtle. */}
      <div className="px-5 pt-6 pb-5 confetti" style={{background:"#202A44"}}>
        <div className="serif-keep font-serif text-[30px] leading-none" style={{color:"#75C596", fontWeight:600}}>Willa's</div>
        <div className="font-mono text-[9px] tracking-[0.18em] mt-2" style={{color:"rgba(255,255,255,0.65)"}}>SOCIAL CONTENT ENGINE</div>
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

      {/* Diagnostic Inbox — its own standalone button (Maazah-style), the founder-input channel */}
      <div className="px-3 pt-2">
        <button onClick={()=>setSection("diagnostic")}
          className={"w-full px-3 py-2.5 rounded-md border transition text-left flex items-center justify-between gap-2 "+(section==="diagnostic"?"":"hover:bg-[#FFFEF7]")}
          style={{background: section==="diagnostic"?"#202A44":"#FFFFFF", borderColor: section==="diagnostic"?"#202A44":"var(--border)"}}>
          <div className="min-w-0">
            <div className={"font-mono text-[9px] tracking-wider flex items-center gap-1.5 "+(section==="diagnostic"?"text-white":"text-[var(--ink)]")}>
              <span>📥</span> DIAGNOSTIC INBOX
            </div>
            <div className={"font-mono text-[8.5px] tracking-wider mt-0.5 "+(section==="diagnostic"?"text-white/70":"text-[var(--muted)]")}>tell the engine what it can't see</div>
          </div>
          <span className={"font-mono text-[11px] "+(section==="diagnostic"?"text-white":"text-[var(--ink)]")}>→</span>
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
      <ActionBox label="WILLA'S ANGLE" content={t.angle} className="mt-5"/>

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
      <ActionBox label="WILLA'S OPPORTUNITY" content={c.opportunity} className="mt-0"/>

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
        <div className="font-mono text-[10px] tracking-[0.18em] text-[#9E652E]">{label}</div>
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
            <h1 className="font-display text-[26px] leading-none">Intelligence Brief</h1>
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
            <p className="text-[12.5px] text-[#334155] leading-snug mb-4">Category, policy + trade signals shaping the conversation — each with the Willa's angle and real, dated sources.</p>
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
              <p className="text-[12.5px] text-[#334155] leading-snug">Viral, meme, entertainment + peer-brand moments Willa's can ride this week — each with a Play you can ship fast.</p>
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
            <p className="text-[12.5px] text-[#334155] leading-snug mb-4">Where the category's moving and how Willa's responds — category-level reads, never a named attack.</p>
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
  const conv = getConviction(b);

  const isHero    = variant === "hero";
  const isCompact = variant === "compact";

  // Compact variant — for STANDARD priority briefs. Carries meaningful context
  // without becoming a wall: platform + timing top row, hook, DNA chip + driver
  // type pill at the bottom so the reader knows WHAT, WHEN, and WHY.
  if (isCompact) {
    return (
      <button onClick={onClick}
        className={"group text-left w-full card fade-in transition p-3.5 flex flex-col gap-2 "+
          (active ? "ring-2 ring-[#202A44] shadow-lg" : "hover:border-[#cfcfc8] hover:shadow-md")}>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[9px] tracking-wider text-[var(--muted)] flex items-center gap-1 min-w-0">
            <span className="text-[11px]">{PLATFORM_EMOJI[b.platform]||"•"}</span>
            <span className="truncate">{b.platform.toUpperCase()}{b.timing ? " · "+b.timing.split(" · ")[0].toUpperCase() : ""}</span>
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            {conv && <ConvictionChip conv={conv} size="sm"/>}
            <PriorityBadge p={b.priority}/>
          </span>
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
      className={"group text-left w-full card fade-in transition "+
        (isHero ? "border-[1.5px] border-[#D4CEC0] " : "") +
        (active ? "ring-2 ring-[#202A44] shadow-lg" : "hover:border-[#cfcfc8] hover:shadow-md")}>

      {/* Top — platform + priority */}
      <div className={isHero ? "px-5 pt-5 pb-4" : "px-4 pt-4 pb-3"}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[10px] tracking-wider text-[var(--muted)] flex items-center gap-1.5 min-w-0">
            <span className="text-[13px]">{PLATFORM_EMOJI[b.platform]||"•"}</span>
            <span className="truncate">{b.platform.toUpperCase()}{isHero && b.timing ? " · "+b.timing.toUpperCase() : ""}</span>
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            {conv && <ConvictionChip conv={conv} size={isHero?undefined:"sm"}/>}
            <PriorityBadge p={b.priority}/>
          </span>
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
      <div className={"border-t border-[var(--border)] bg-[#FAFAF7] rounded-b-[10px] "+(isHero ? "px-5 py-4" : "px-4 py-3.5")}>
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
              <div key={i} className={"px-4 py-4 "+(i < zones.length - 1 ? "border-b border-[var(--border)]" : "")} style={{background:i % 2 === 0 ? "#FFFFFF" : "#F4F5F3"}}>
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

// PanelScore — the 1-10 reaction pill, color-banded like conviction.
function PanelScore({score}){
  const band = score>=8?"#4E8C63":score>=5?"#B8862F":"#C2674A";
  const bg   = score>=8?"#EAF3EC":score>=5?"#F7EFD9":"#F7E3DD";
  return (
    <span className="inline-flex items-baseline gap-0.5 px-2 py-1 rounded-full shrink-0" style={{background:bg}}>
      <span className="font-serif text-[16px] leading-none" style={{color:band}}>{score}</span>
      <span className="font-mono text-[8px] tracking-wider" style={{color:band,opacity:0.78}}>/10</span>
    </span>
  );
}

// WillasPanel — the live synthetic-panel pre-test inside a brief. Click to run
// it against /api/panel (Claude). Renders 4 persona cards with a 1-10 score, a
// reaction quote, and an optional edit, plus the table's one-line read. Distinct
// from the static conviction "panel" number — this is the live, on-demand read.
function WillasPanel({brief}){
  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(false);
  const [requested,setRequested] = useState(false);
  const [error,setError] = useState(null);
  useEffect(()=>{ setData(null); setLoading(false); setRequested(false); setError(null); }, [brief && brief.id]);

  async function run(){
    if(loading) return;
    setRequested(true); setLoading(true); setError(null);
    try{
      const res = await fetch("/api/panel", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({brief})});
      if(!res.ok){ const t = await res.text(); throw new Error((t||"").slice(0,160) || ("HTTP "+res.status)); }
      const d = await res.json();
      if(!d || !d.reactions) throw new Error("Panel returned no reactions.");
      setData(d);
    }catch(e){ setError(e.message || "Panel run failed."); }
    finally{ setLoading(false); }
  }

  const avg = data ? Math.round((data.reactions.reduce((a,r)=>a+(r.score||0),0)/data.reactions.length)*10)/10 : null;
  const avgColor = avg==null?null:(avg>=8?"#4E8C63":avg>=5?"#B8862F":"#C2674A");

  return (
    <BriefBlock label="THE TASTING TABLE">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="font-mono text-[9px] tracking-[0.18em] text-[var(--muted)]">// 4 SYNTHETIC CUSTOMERS · BRIEF PRE-TEST</div>
          <div className="text-[13px] text-[#202A44] mt-0.5">How the table reads this before it ships</div>
        </div>
        {avg!=null && (
          <span className="inline-flex items-baseline gap-1 px-2.5 py-1 rounded-full shrink-0" style={{border:"1.5px solid "+avgColor}}>
            <span className="font-serif text-[18px] leading-none" style={{color:avgColor}}>{avg}</span>
            <span className="font-mono text-[8.5px] tracking-wider" style={{color:avgColor}}>/10 avg</span>
          </span>
        )}
      </div>

      {!requested && (
        <button onClick={run} className="w-full flex items-start gap-3 p-4 rounded-lg border border-dashed text-left transition hover:bg-[#FFFEF7]" style={{borderColor:"var(--border)", background:"#F4F5F3"}}>
          <span className="text-[20px] shrink-0">👥</span>
          <span>
            <span className="block text-[13.5px] text-[#202A44] font-medium leading-snug">Pressure-test this brief against the 4-person table</span>
            <span className="block text-[12px] text-[var(--muted)] leading-snug mt-1">Maya (clean-label mom) · Jordan (shelf convert) · Devon (category-curious foodie) · Sam (kid-utility parent). Each scores it 1-10 with a reaction + an edit. ~3-6 seconds.</span>
            <span className="inline-block font-mono text-[9px] tracking-wider mt-2.5 px-2.5 py-1 rounded text-white" style={{background:"#202A44"}}>RUN THE PANEL →</span>
          </span>
        </button>
      )}

      {error && (
        <div className="px-4 py-2.5 rounded-md bg-[#FEE2E2] text-[12px] text-[#991B1B] leading-snug">⚠ {error} <button onClick={run} className="underline ml-1">retry</button></div>
      )}

      {loading && (
        <div className="flex items-center gap-3 p-4 rounded-lg border border-dashed mb-2.5 fade-in" style={{borderColor:"#E8E1C2", background:"#FFFEF7"}}>
          <span className="inline-flex items-center gap-1 shrink-0">
            {WILLAS_PANEL.map((p,i)=>(
              <span key={p.id} className="text-[18px] animate-pulse" style={{animationDelay:(i*0.18)+"s"}}>{p.emoji}</span>
            ))}
          </span>
          <div className="min-w-0">
            <div className="text-[13.5px] text-[#202A44] font-medium leading-snug">The table is tasting this brief<span className="animate-pulse">…</span></div>
            <div className="text-[12px] text-[var(--muted)] leading-snug">Maya, Jordan, Devon + Sam are scoring it — about 3–6 seconds.</div>
          </div>
        </div>
      )}

      {(requested && !error) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {WILLAS_PANEL.map(p=>{
            const r = data && data.reactions.find(x=> (x.persona||"").toLowerCase()===p.name.toLowerCase());
            return (
              <div key={p.id} className="card p-3.5" style={{background:"#FFFEF7", borderColor:"#E8E1C2"}}>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-[20px] shrink-0">{p.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] text-[#202A44] font-medium leading-none">{p.name} <span className="text-[var(--muted)] font-normal">· {p.age}</span></div>
                    <div className="font-mono text-[8px] tracking-wider text-[var(--muted)] mt-1">{p.label} · {p.city}</div>
                  </div>
                  {r ? <PanelScore score={r.score}/> : loading ? <span className="font-mono text-[12px] text-[var(--muted)] shrink-0 animate-pulse">···</span> : null}
                </div>
                {r ? (
                  <>
                    <p className="font-serif italic text-[13px] text-[#202A44] leading-snug">"{r.reaction}"</p>
                    {r.suggested_edit && r.suggested_edit!=="null" && r.suggested_edit!==null && (
                      <p className="text-[11.5px] text-[#334155] leading-snug mt-2 pt-2 border-t border-[var(--border)]"><span className="font-mono text-[8.5px] tracking-wider text-[#9E652E] mr-1">+ EDIT</span>{r.suggested_edit}</p>
                    )}
                  </>
                ) : loading ? (
                  <div className="h-[38px] rounded bg-[#F1EFE7] animate-pulse"></div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      {data && data.headline_insight && (
        <div className="mt-3 pl-3.5 border-l-[3px] text-[13px] text-[#202A44] leading-snug" style={{borderColor:"#9E652E"}}>
          <span className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] block mb-1">THE TABLE'S READ</span>
          {data.headline_insight}
        </div>
      )}
    </BriefBlock>
  );
}

// MeetThePanel — the published roster. Names the scorers behind the "Synthetic
// Panel" leg of every conviction score, with the panel→conviction math visible.
function MeetThePanel(){
  const [open,setOpen] = useState(false);
  return (
    <div className="card overflow-hidden mb-5">
      <button onClick={()=>setOpen(o=>!o)} className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left hover:bg-[#FFFEF7] transition">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[18px] shrink-0">👥</span>
          <div className="min-w-0">
            <div className="font-mono text-[9px] tracking-[0.18em] text-[var(--muted)]">THE TASTING TABLE · 4 SYNTHETIC CUSTOMERS</div>
            <div className="text-[14px] text-[#202A44] leading-snug">Who reads every brief — before it ships</div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden md:flex items-center gap-1">{WILLAS_PANEL.map(p=><span key={p.id} className="text-[16px]">{p.emoji}</span>)}</span>
          <span className="font-mono text-[10px] text-[var(--muted)]">{open?"▲ HIDE":"▼ MEET THEM"}</span>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 fade-in border-t border-[var(--border)]">
          <p className="text-[12.5px] text-[var(--muted)] leading-relaxed my-3">Every brief is pressure-tested against four calibrated synthetic readers, each tuned to a different layer of Willa's audience. Their consensus rolls into the <span className="text-[#202A44] font-medium">Synthetic Panel</span> leg of the conviction score (alongside Voice Compass + Pulse fit). Open any brief and hit <span className="font-mono text-[10px] text-[#202A44]">RUN THE PANEL</span> to hear them live.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {WILLAS_PANEL.map(p=>(
              <div key={p.id} className="rounded-md border border-[var(--border)] bg-[#FAFAF7] p-3.5">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-[22px] shrink-0">{p.emoji}</span>
                  <div className="min-w-0">
                    <div className="text-[13.5px] text-[#202A44] font-medium leading-none">{p.name} <span className="text-[var(--muted)] font-normal">· {p.age} · {p.city}</span></div>
                    <div className="font-mono text-[8.5px] tracking-wider text-[#9E652E] mt-1.5">{p.label}</div>
                  </div>
                </div>
                <div className="text-[12px] text-[#475569] italic leading-snug mb-2">{p.role}</div>
                <div className="text-[11.5px] text-[#202A44] leading-snug"><span className="font-mono text-[8px] tracking-wider text-[#4E8C63] mr-1">▲ CARES</span>{p.cares}</div>
                <div className="text-[11.5px] text-[#64748B] leading-snug mt-1.5"><span className="font-mono text-[8px] tracking-wider text-[#C2674A] mr-1">▽ SOFT ON</span>{p.softOn}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-md bg-[#FFFEF7] border border-[#E8E1C2] px-4 py-3">
            <div className="font-mono text-[8.5px] tracking-[0.16em] text-[var(--muted)] mb-1">PANEL → CONVICTION</div>
            <div className="font-mono text-[11px] text-[#202A44] leading-relaxed">avg(4 readers, 1-10) → /100 → averaged with Voice Compass + Pulse fit → + recency bonus → <span className="font-semibold">conviction score</span></div>
          </div>
        </div>
      )}
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
  const conv = getConviction(b);

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
            {conv && <ConvictionChip conv={conv}/>}
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

      {/* THE TASTING TABLE — live synthetic-panel pre-test */}
      <WillasPanel brief={b}/>

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
            <h1 className="font-display text-[26px] leading-none">Content Briefs</h1>
            <p className="text-[12px] text-[var(--muted)] mt-1.5 max-w-2xl">{BRIEFS.length} briefs generated this week from {SCANNED_TOTAL} signals{studioCount>0 ? ", plus "+studioCount+" riffed in the Studio" : ""}. Organized by content pillar — so you can see at a glance where the week leans. Priority chip on each card tells you which to ship first. Click any brief to open its full detail.</p>
          </div>
          {topRight}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar px-8 py-6">
        <div className="max-w-[1400px]">
          {/* The published synthetic-panel roster — names the scorers behind every conviction score */}
          <MeetThePanel/>

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
const SIMULATED_NOW = new Date(2026, 5, 8, 11, 30); // Mon Jun 8 2026, 11:30am — getDay() resolves to the correct weekday
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
    {key:"ig", label:"IG / FB", match: p => IS_IG(p), defaultPlatform: "IG Reel"},
    {key:"tt", label:"TikTok", match: p => p === "TikTok", defaultPlatform: "TikTok"},
    {key:"pin", label:"Pinterest", match: p => p === "Pinterest", defaultPlatform: "Pinterest"},
    {key:"other", label:"Other", match: p => !IS_IG(p) && p !== "TikTok" && p !== "Pinterest", defaultPlatform: "Threads"}
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
              <h1 className="font-display text-[26px] leading-none">Content Calendar</h1>
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
            <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-1">RESULTS · MAY 25 – MAY 31, 2026 · LAST WEEK</div>
            <h1 className="font-display text-[26px] leading-none">Performance</h1>
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
        <div className="serif-keep font-serif text-[30px] leading-none tracking-tight mb-1" style={{color:"#75C596", fontWeight:600}}>Willa's</div>
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
const WELCOME_WEEK_KEY = "AUG-31-2026";
const WELCOME_WEEK_RANGE = "AUG 31 – SEP 6, 2026";
const WELCOME_REFRESHED = "AUG 31, 2026";

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
  pullQuote:"two government files moved inside the same seven days, and neither one was moved by anything printed on a package. a federal pesticide docket reopened aug 25 with a thirty-day comment window, and two days later a state consumer-protection office issued civil investigative demands over an oil claim after a university analysis found roughly 89% of tested products carried an undisclosed ingredient. what moved both files was a laboratory number. then on aug 28 a state legislature passed a first-in-nation bill unanimously — a voluntary “non-ultraprocessed certified” seal, now sitting with a governor until sep 30 — which means a government finally has to write down what the phrase legally means. the cooler filled to match: the biggest name in plant-based meat put the first drink in its history into every erewhon on aug 24, while the category leader spent the week turning its packaging into a political billboard. the shopper is already ahead of all of it — first-half grocery search shows fiber queries up 26.4% against protein’s 12.7%, the fastest-growing claim on the shelf attached to the one thing that cannot be bolted on afterwards. and the long weekend is forecast as the most expensive on record, about $750 a round trip, which means the half of the country staying home is hosting the last free saturday of the summer — and nobody is filming from that side of it.",
  the_moves:[
    {kind:"ship", verb:"Open Wed Sep 2 at 9am on the lot code, not the badge — Christina to camera, one plain sentence about the gap between a claim and a test, then a hand sets a lot number beside the carton and pours.", why:"Two enforcement files moved in the same seven days, Aug 25 and Aug 27, and in both cases the thing that moved them was a third-party laboratory result rather than a sentence on a package. That is the exact evidentiary standard Willa's already meets and almost nobody in the aisle does: organic oats, glyphosate residue tested lot by lot, measured by somebody who does not report to us. The lot code is the emotional object of the brief — the least glamorous thing in frame and the only thing in it a shopper could actually check. Register is Patagonia gravity brought down to a kitchen table: stance, not outrage, never raised in volume. Guardrails are absolute — no agency, no state, no docket, no ingredient category, no percentage, no brand anywhere in script, overlay or caption, and no version of \"we've been waiting for somebody to write the test,\" because the certification-seal lane is on a long rest. This is a lab-result brief, not a badge montage. No scope claim about being the only brand that does this, and no claim that Willa's paid for the test — both are flagged unverified."},
    {kind:"ship", verb:"Talk to the adult with no school run — run September as three separate shapes on Wed Sep 2 and Thu Sep 3, one sincere, one deadpan, one a question, and never let two of them share a line.", why:"An Aug 28 survey put eating habits at 21% of what adults want to reset heading into September and found 45% say the month is no more motivating than January, against 26% who say it is. The skeptic half is nearly twice the size of the believer half, which rules out the overhaul pitch outright and makes generosity the position: Willa's is the brand willing to say out loud that nobody has to reset anything. \"the reset didn't survive. the pour did.\" carries the sincere argument at noon Wednesday — the elaborate nine-day reset against one glass over one bowl on an ordinary Tuesday. \"eight of these take a plan. one of them just takes a carton.\" carries the joke Wednesday evening as a nine-square routines grid with the answer withheld and the comments doing the work. \"nobody has to win september.\" poses it as a text-card carousel Thursday evening and asks rather than claims. No kids, no backpacks, no school year in any of the three, and zero restriction, macro or calorie language — this is the abundance answer to a week of diet-culture health coverage."},
    {kind:"ship", verb:"Claim the long weekend from the side nobody is filming — Sat Sep 5 and Sun Sep 6 are inside this window, and the brand has never posted into either one.", why:"The Sep 5–7 weekend is forecast as the most expensive on record, with round-trip airfare around $750 and domestic hotel bookings up 9%, which means every feed on Saturday is an airport, a rental car and a hotel balcony. The households staying home are hosting the last free weekend of summer with a full table and a fridge to fill, and that occasion has never been claimed here. Three briefs take it from three angles that share nothing: \"the weekend nobody had to pack for.\" is the family morning at noon Saturday with one carton of Kids doing three jobs across two generations; \"nobody's going anywhere, and the corn is at its best.\" is the searchable Wednesday pin for a dairy-free sweet corn chowder built on two full cups of Barista; and \"nobody in this house had anywhere to be.\" closes Sunday as pure mood with no argument in it at all. Hard lines: no travel montage, no packing shot, no promo, price or holiday-deal language of any kind, no tailgate framing, and nothing that references Labor Day as a sale. Sep 7 is outside the window — the peg is the weekend itself."},
    {kind:"hold", verb:"Hold the seal. A state just created the first legal definition of \"not ultra-processed\" and the temptation is to announce we'll be first in line — describe the process in plain words instead and let the category argue vocabulary.", why:"This is the week's most tempting mistake and it has two independent reasons to stay parked. The certification lane is three-deep and on a long rest — badge, seal, standard and \"who verifies this\" have all run inside the last six weeks — so a brief built on a new seal would read as recycled no matter how fresh the news is. And strategically, a voluntary program that does not exist yet, on a bill that has not been signed, is not something a brand should attach its position to; the durable move is the one \"a word can be argued about. a description is either true or it isn't.\" makes on Fri Sep 4, which describes what actually happens to the oat in language a person uses — whole groats, the bran and germ kept in, nothing filtered out and nothing rebuilt from syrup. The same restraint applies to the category leader printing advocacy copy on every carton it makes: answering it directly would put Willa's in a reactive posture on somebody else's ground. Keep both as intel. If a seal, a bill, a state or an agency reaches a consumer surface this week, the brief has failed and should be pulled rather than edited."}
  ]
};


const WELCOME_HIGHLIGHTS = [
  {
    glyph:"🔬",
    kindLabel:"Enforcement",
    color:"#73B2C9",
    stat:"30 DAYS",
    statLabel:"federal comment window, closes Sep 24",
    label:"The federal glyphosate file reopened for public comment Aug 25 — and two days later a state went after an oil claim with lab results instead of label reading",
    detail:"A Federal Register notice on Aug 25, 2026 opened a 30-day public comment window on the open-literature search feeding an updated human-health risk assessment for glyphosate, with comments due Sep 24, 2026 and the full assessment expected late 2026. On Aug 27, 2026 a state attorney general opened a deceptive-trade investigation into \"made with avocado oil\" packaged foods after a university analysis found roughly 89% of tested products contained undisclosed seed oils — 93% of chips, 71% of mayonnaise, 100% of dressings — issuing civil investigative demands to three brands. Two agencies, two ingredients, one mechanism: what moved both files was a third-party lab result, not a sentence on a package. That is the standard Willa's already meets, which is why the week opens Wed Sep 2 at 9am on a lot code rather than a badge — and why no agency, state, docket or percentage from this appears anywhere a customer can see it.",
    sources:[
      {label:"Federal Register · Glyphosate open literature search to inform human health risk assessment (Aug 25, 2026)", url:"https://www.federalregister.gov/documents/2026/08/25/2026-17301/glyphosate-open-literature-search-to-inform-human-health-risk-assessment-notice-of-availability"},
      {label:"Food Dive · Texas AG opens investigation into avocado oil claims (Aug 27, 2026)", url:"https://www.fooddive.com/news/texas-avocado-oil-investigation-pepsico-siete-kraft-heinz-primal-kitchen/828978/"}
    ]
  },
  {
    glyph:"🏛️",
    kindLabel:"Definitions",
    color:"#A191B2",
    stat:"SEP 30",
    statLabel:"deadline to sign or veto",
    label:"A first-in-nation \"non-ultraprocessed certified\" law passed Aug 28 — which means a government now has to write the definition down",
    detail:"AB 2244 cleared both chambers of the California Legislature unanimously on Aug 28, 2026, creating a voluntary USDA-Organic-style \"Non-Ultraprocessed Certified\" seal overseen by the state health department through accredited certifiers, with grocers required to display qualifying products. It sits with the governor until Sep 30, 2026. The seal is the headline; the definition is the story. Every workable version of that boundary is about how a food is made — what was extracted, what was reconstructed, what was added back — rather than what the front of the box says, and that vocabulary is about to be standardised. The play is not to chase the stamp: the certification lane is three-deep and rested, so Fri Sep 4's carousel describes the process in plain words instead — whole oat groats, bran and germ kept in, nothing filtered out and nothing rebuilt from syrup — and names no state, bill, seal or agency.",
    sources:[
      {label:"Food Safety Magazine · California passes bill creating a certification seal for non-ultra-processed foods (Aug 31, 2026)", url:"https://www.food-safety.com/articles/11775-california-passes-bill-to-create-certification-seal-for-non-ultra-processed-foods"},
      {label:"WebWire · Legislature passes first-in-nation non-ultraprocessed certification bill (Aug 28, 2026)", url:"https://www.webwire.com/ViewPressRel.asp?aId=359695"}
    ]
  },
  {
    glyph:"🌾",
    kindLabel:"Demand",
    color:"#75C596",
    stat:"26.4%",
    statLabel:"fiber search growth vs protein's 12.7%",
    label:"Fiber searches on the biggest grocery platform grew at more than double protein's rate in the first half of 2026",
    detail:"First-half 2026 on-platform search data, published Aug 28, 2026, shows queries containing \"fiber\" up 26.4% year over year against \"protein\" up 12.7%, with category share moving alongside — milk +4%, chicken breast +6%, protein drinks +15%, and outsized gains for protein-labelled cereal, waffles and ice cream. The gap between the two numbers is the read, not either number alone: the claim already printed on pizza crust and cocktails is growing at half the rate of the one almost nothing on the shelf can honestly carry, because fiber cannot be bolted on the way an isolate can — it either survived the process or it didn't. Two briefs take it without ever citing a search figure in consumer copy: a true-crime kitchen hunt Thu Sep 3 that ends on the carton that was in frame the whole time, and a Sat Sep 5 weekend-tote pin where Willa's Kids carries 2g of fiber, 8g of protein and algae-sourced DHA into a bag that is otherwise mostly sunscreen.",
    sources:[
      {label:"The Shelby Report · Instacart report: protein and fiber reshaping America's grocery carts (Aug 28, 2026)", url:"https://theshelbyreport.com/2026/08/28/instacart-report-protein-fiber-reshaping-americas-grocery-carts/"},
      {label:"Progressive Grocer · Protein and fiber gain bigger share of grocery shopping trips (Aug 28, 2026)", url:"https://progressivegrocer.com/protein-fiber-gain-bigger-share-todays-grocery-shopping-trips-instacart-report-finds"}
    ]
  },
  {
    glyph:"🧳",
    kindLabel:"Occasion",
    color:"#9E652E",
    stat:"$750",
    statLabel:"average round-trip airfare, up 2%",
    label:"The Sep 5–7 weekend is forecast as the most expensive on record — and the households staying home have never been spoken to",
    detail:"The travel forecast published Aug 31, 2026 puts average domestic round-trip airfare up 2% to about $750, domestic hotel bookings up 9% and international accommodations 12% more expensive year over year, with road congestion peaking Thu Sep 3 between 2–7pm and Fri Sep 4 between noon and 8pm. Seattle, Orlando, Boston, Denver and New York lead domestic bookings. Two things matter for planning: Sat Sep 5 and Sun Sep 6 fall inside this ship window while the holiday Monday does not, and the same numbers that describe record travel describe the people priced out of it. That is the freshest unclaimed occasion on the board — a full house, a long morning and a fridge to fill — and three briefs take it as a family argument, a searchable chowder pin and a Sunday mood piece with no argument in it. No travel montage, no packing shot, and no promo, price or holiday-sale language anywhere near it.",
    sources:[
      {label:"GantNews · AAA: Labor Day travelers should expect busy roads and higher domestic airfares (Aug 31, 2026)", url:"https://gantnews.com/2026/08/31/aaa-labor-day-travelers-should-expect-busy-roads-higher-domestic-airfares/"},
      {label:"AAA Newsroom · Labor Day travelers face higher costs and heavier traffic (Aug 31, 2026)", url:"https://newsroom.acg.aaa.com/aaa-labor-day-travelers-face-higher-costs-and-heavier-traffic-wi/"}
    ]
  },
  {
    glyph:"📆",
    kindLabel:"Routine",
    color:"#DC8A4E",
    stat:"45%",
    statLabel:"say september is no more motivating than january",
    label:"September is being sold as a second January, and nearly half of adults have quietly opted out of feeling anything about it",
    detail:"A consumer survey published Aug 28, 2026 asked adults what they most want to reset heading into September: home organization led at 27%, exercise and fitness 23%, eating habits 21%, sleep routine and finances tied at 15%, work 10%, social life 7%. The same survey found 45% do not feel more inspired to make changes in September than in January, against 26% who do — the skeptic half nearly twice the size of the believer half, which rules out the overhaul pitch entirely. A four-week wellbeing plan published the same day builds the opposite way from a New Year reset, consistency over intensity. Both point at grown adults rebuilding a weekday, not families getting kids out the door, which is the audience Willa's has under-served all summer. Three briefs run it as three shapes — the sincere claim, the deadpan grid and the question posed to the comments — with no kids, no school year and no restriction language in any of them.",
    sources:[
      {label:"Tellwut · September Reset consumer survey (Aug 28, 2026)", url:"https://www.tellwut.com/surveys/lifestyle/living/212969-september-reset.html"},
      {label:"YMCA of the North · The September Wellbeing Reset, a four-week movement routine (Aug 28, 2026)", url:"https://www.ymcanorth.org/blog/2026/08/28/5390914/the_september_wellbeing_reset_a_4_week_movement_routine_to_rebuild_healthy"}
    ]
  }
];


// ── Diagnostic Inbox ─────────────────────────────────────────
// The founder-input channel. Three questions the engine CANNOT scrape from
// public signals + a free-form catch-all. Answers thread into next week's brief
// mix. Ported from Maazah / Lil Bucks 2026-05-31. Tuned to Willa's reality (the
// Christina on-camera cap, sister availability, retail doors, warm-vs-sharp
// voice dial). Answers persist to localStorage keyed by the week.
const DIAGNOSTIC_INBOX = [
  {
    id:"DQ-1", glyph:"📍", eyebrow:"ON-THE-GROUND",
    question:"Anything on the ground next week — a sampling event, store demo, shoot day, or a founder/sister appearance?",
    why:"The engine sees culture; it can't see your calendar. On-the-ground moments are the most authentic content we make — but only if we know they're happening.",
    impact:"If yes, the engine slots an at-shelf or behind-the-scenes brief for that day — and reserves a Christina/sister on-camera slot (capped at 3/week, so timing matters).",
    options:[
      {label:"Store demo / sampling", value:"demo", needsDetail:true, placeholder:"Where + when? e.g. 'Sprouts demo Tue, Maple Grove' or 'Target endcap reset Wed'"},
      {label:"Shoot day in the kitchen", value:"shoot", needsDetail:true, placeholder:"What + when? e.g. 'Wed AM — Kids smoothie-station Reel'"},
      {label:"Founder / sister appearance", value:"appearance", needsDetail:true, placeholder:"What + when? e.g. 'sister free Thu for on-camera' or 'Christina at a market Sat'"},
      {label:"Nothing next week", value:"none"}
    ]
  },
  {
    id:"DQ-2", glyph:"🎬", eyebrow:"WHO'S ON CAMERA",
    question:"Who's free to be on camera next week — Christina, your sister, an ambassador, or hands + product only?",
    why:"Willa's is mother-founded, but Christina isn't the mom — first-person parenting only rings true when your sister fronts it. And Christina on camera is capped at 3 a week, so who's available reshapes the whole mix.",
    impact:"The engine routes mom-POV briefs to whoever's actually free, holds Christina to her 3-slot cap (saved for heritage + activist beats), and sends the rest to hands-on-product + voiceover.",
    options:[
      {label:"Christina — a few heritage/activist beats", value:"christina", needsDetail:true, placeholder:"Which days / how many? e.g. 'Tue + Thu, 2 max'"},
      {label:"My sister — for mom-POV", value:"sister", needsDetail:true, placeholder:"Which days? e.g. 'free Wed for the Kids smoothie Reel'"},
      {label:"An ambassador / creator", value:"ambassador", needsDetail:true, placeholder:"Who + what? e.g. 'Sylvie, at-shelf Sprouts'"},
      {label:"Hands + product only next week", value:"handsonly"}
    ]
  },
  {
    id:"DQ-3", glyph:"🎚️", eyebrow:"VOICE TEMPERATURE",
    question:"What's the dial for next week — warmer (sister-fronted, heritage, kitchen-table) or sharper (clean-label category POV)?",
    why:"Same intel, different register. The engine ships in Willa's voice either way — you decide whether it leans grandmother-warm or assertive-activist this week.",
    impact:"This temperatures every hook + caption + concept. Warm tilts the mix toward family-moment + recipe; sharp tilts toward the ingredient-transparency + category-POV lane.",
    options:[
      {label:"Warmer · heritage + family", value:"warm"},
      {label:"Sharper · clean-label POV", value:"sharp"},
      {label:"Hold it balanced", value:"balanced"}
    ]
  }
];

// DiagnosticInbox — the founder-input surface (renders as its own sidebar tab).
function DiagnosticInbox(){
  const STORAGE_KEY = "willas_diagnostic_"+WELCOME_WEEK_KEY;
  const initial = (()=>{ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}"); }catch(e){ return {}; } })();
  const [answers, setAnswers] = useState(initial.answers || {});
  const [drafts, setDrafts] = useState({});
  const [openItem, setOpenItem] = useState(null);
  const [freeForm, setFreeForm] = useState(initial.free || "");
  const [freeFormLocked, setFreeFormLocked] = useState(!!initial.freeLocked);

  function save(nextAnswers, nextFree, nextFreeLocked){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify({
      answers: nextAnswers!==undefined?nextAnswers:answers,
      free: nextFree!==undefined?nextFree:freeForm,
      freeLocked: nextFreeLocked!==undefined?nextFreeLocked:freeFormLocked
    })); }catch(e){}
  }

  const total = DIAGNOSTIC_INBOX.length;
  const answeredCount = Object.values(answers).filter(a=>a&&a.locked).length;

  function pick(qid, opt){
    if(opt.needsDetail && opt.value!=="none"){
      setDrafts(d=>({...d,[qid]:{value:opt.value,label:opt.label,note:(d[qid]&&d[qid].note)||(answers[qid]&&answers[qid].note)||""}}));
    } else {
      const next={...answers,[qid]:{value:opt.value,label:opt.label,note:"",locked:true}};
      setAnswers(next); save(next); setOpenItem(null);
    }
  }
  function setNote(qid, note){ setDrafts(d=>({...d,[qid]:{...(d[qid]||{}),note}})); }
  function lockIn(qid){
    const draft = drafts[qid] || answers[qid];
    if(!draft || !draft.value) return;
    const next={...answers,[qid]:{value:draft.value,label:draft.label,note:draft.note||"",locked:true}};
    setAnswers(next); save(next); setOpenItem(null);
  }
  function reopen(qid){
    setDrafts(d=>({...d,[qid]:{value:answers[qid].value,label:answers[qid].label,note:answers[qid].note||""}}));
    const next={...answers}; delete next[qid];
    setAnswers(next); save(next); setOpenItem(qid);
  }
  function submitFree(){ if(!freeForm.trim())return; setFreeFormLocked(true); save(undefined, freeForm, true); }
  function editFree(){ setFreeFormLocked(false); save(undefined, freeForm, false); }

  return (
    <div className="fade-in max-w-[760px]">
      <div className="flex items-end justify-between gap-4 mb-5 flex-wrap">
        <div>
          <div className="font-mono text-[9.5px] tracking-[0.2em] text-[var(--muted)] mb-1.5">// FROM THE ENGINE · {total} QUESTIONS ONLY YOU CAN ANSWER</div>
          <h2 className="font-serif text-[26px] tracking-tight text-[#202A44]">Diagnostic Inbox</h2>
          <p className="text-[13px] text-[var(--muted)] mt-1 max-w-[520px]">The engine sees culture; you see your calendar. A few taps tell us what we can't scrape — and it threads straight into next Monday's mix.</p>
        </div>
        <div className="text-right shrink-0">
          <div className="font-serif text-[22px] text-[#202A44] leading-none">{answeredCount}<span className="text-[var(--muted)] text-[15px]">/{total}</span></div>
          <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mt-1">ANSWERED</div>
          <div className="mt-1.5 h-[5px] w-[90px] rounded-full bg-[#E8E2D3] overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{width:(answeredCount/total*100)+"%", background:"#4E8C63"}}></div>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {DIAGNOSTIC_INBOX.map((q)=>{
          const ans = answers[q.id];
          const draft = drafts[q.id];
          const isOpen = openItem===q.id;
          const isLocked = !!(ans && ans.locked);
          const selectedDetailOpt = draft ? q.options.find(o=>o.value===draft.value) : null;
          return (
            <div key={q.id} className="card overflow-hidden" style={{borderLeftWidth:"4px", borderLeftColor: isLocked?"#4E8C63":"var(--border)"}}>
              <button onClick={()=>setOpenItem(isOpen?null:q.id)} className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-[#FAFAF7] transition">
                <span className="text-[20px] shrink-0">{q.glyph}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[8.5px] tracking-[0.18em] text-[#9E652E] mb-1">{q.eyebrow}</div>
                  <div className="text-[14px] text-[#202A44] leading-snug">{q.question}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {isLocked
                    ? <span className="font-mono text-[9px] tracking-wider px-2 py-1 rounded-full text-white" style={{background:"#4E8C63"}}>✓ {ans.label}</span>
                    : <span className="font-mono text-[9px] tracking-wider text-[var(--muted)]">awaiting</span>}
                  <span className="font-mono text-[10px] text-[var(--muted)]">{isOpen?"▲":"▾"}</span>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-[var(--border)] fade-in">
                  <div className="rounded-md bg-[#FAFAF7] border border-[var(--border)] p-3.5 mb-3">
                    <div className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mb-1">WHY THIS MATTERS</div>
                    <p className="text-[12.5px] text-[#3F4A5E] leading-relaxed">{q.why}</p>
                    <p className="text-[12px] text-[#202A44] leading-relaxed mt-2"><span className="text-[#9E652E] mr-1">↳</span><span className="font-medium">What changes when you answer:</span> {q.impact}</p>
                  </div>

                  {!isLocked && (
                    <>
                      <div className="font-mono text-[9px] tracking-wider text-[var(--muted)] mb-2">YOUR ANSWER</div>
                      <div className="flex flex-wrap gap-2">
                        {q.options.map(o=>(
                          <button key={o.value} onClick={()=>pick(q.id,o)}
                            className={"text-[12.5px] px-3 py-2 rounded-lg border transition "+((draft&&draft.value===o.value)?"bg-[#202A44] text-white border-[#202A44]":"bg-white text-[#202A44] border-[var(--border)] hover:border-[#202A44]")}>
                            {(draft&&draft.value===o.value)?"✓ ":""}{o.label}
                          </button>
                        ))}
                      </div>

                      {draft && selectedDetailOpt && selectedDetailOpt.needsDetail && draft.value!=="none" && (
                        <div className="mt-3 fade-in">
                          <label className="font-mono text-[9px] tracking-wider text-[var(--muted)] block mb-1.5">QUICK DETAIL · so the engine knows what to build</label>
                          <textarea value={draft.note||""} onChange={e=>setNote(q.id,e.target.value)} rows={2}
                            placeholder={selectedDetailOpt.placeholder}
                            className="w-full resize-none px-3 py-2 rounded-lg border border-[var(--border)] bg-[#FAFAF7] text-[13px] text-[#202A44] leading-snug focus:outline-none focus:border-[#202A44]"/>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={()=>lockIn(q.id)} className="font-mono text-[10px] tracking-wider px-3 py-1.5 rounded bg-[#202A44] text-white hover:bg-[#1E293B] transition">LOCK IT IN →</button>
                            <button onClick={()=>lockIn(q.id)} className="font-mono text-[10px] tracking-wider px-3 py-1.5 rounded border border-[var(--border)] text-[var(--muted)] hover:bg-[#F6F6F0] transition">SKIP NOTE</button>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {isLocked && (
                    <div className="rounded-md border border-[#CDE5D2] bg-[#F0F7F1] px-4 py-3">
                      <div className="font-mono text-[9px] tracking-wider mb-1" style={{color:"#3B6B2D"}}>✓ LOCKED IN — the engine reflects this in next Monday's mix</div>
                      {ans.note && <div className="text-[12.5px] text-[#202A44] leading-snug mt-1.5"><span className="font-mono text-[8.5px] tracking-wider text-[var(--muted)] mr-1">YOUR NOTE</span>"{ans.note}"</div>}
                      <button onClick={()=>reopen(q.id)} className="font-mono text-[9.5px] tracking-wider text-[var(--muted)] hover:text-[#202A44] mt-2">↺ change my answer</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Free-form catch-all */}
        <div className="card overflow-hidden" style={{borderLeftWidth:"4px", borderLeftColor: freeFormLocked?"#4E8C63":"var(--border)"}}>
          <div className="flex items-center gap-3 px-5 py-4">
            <span className="text-[20px] shrink-0">💭</span>
            <div className="min-w-0 flex-1">
              <div className="font-mono text-[8.5px] tracking-[0.18em] text-[#9E652E] mb-1">ANYTHING ELSE</div>
              <div className="text-[14px] text-[#202A44] leading-snug">{freeFormLocked?"Got it — the engine has your note.":"On your mind but not in the three above?"}</div>
            </div>
            {freeFormLocked && <span className="font-mono text-[9px] tracking-wider px-2 py-1 rounded-full text-white shrink-0" style={{background:"#4E8C63"}}>✓ noted</span>}
          </div>
          <div className="px-5 pb-5 pt-1 border-t border-[var(--border)]">
            {!freeFormLocked ? (
              <>
                <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-2.5">Inventory shifts, retailer convos, a brand decision you're weighing, Christina's on-camera availability, something you saw this week — anything you'd want a strategist to factor into next week's mix.</p>
                <textarea value={freeForm} onChange={e=>setFreeForm(e.target.value)} rows={3}
                  placeholder="e.g. 'Chocolate low at Whole Foods NE — don't push that SKU' · or 'sister's out the last week of June, taper on-camera briefs after the 20th'"
                  className="w-full resize-none px-3 py-2 rounded-lg border border-[var(--border)] bg-[#FAFAF7] text-[13px] text-[#202A44] leading-snug focus:outline-none focus:border-[#202A44]"/>
                <button onClick={submitFree} disabled={!freeForm.trim()}
                  className="mt-2 font-mono text-[10px] tracking-wider px-3 py-1.5 rounded bg-[#202A44] text-white hover:bg-[#1E293B] transition disabled:opacity-40 disabled:cursor-not-allowed">SEND TO ENGINE →</button>
              </>
            ) : (
              <div className="rounded-md border border-[#CDE5D2] bg-[#F0F7F1] px-4 py-3">
                <div className="font-mono text-[9px] tracking-wider mb-1" style={{color:"#3B6B2D"}}>✓ NOTED — added to next Monday's context</div>
                <div className="text-[12.5px] text-[#202A44] leading-snug mt-1">"{freeForm}"</div>
                <button onClick={editFree} className="font-mono text-[9.5px] tracking-wider text-[var(--muted)] hover:text-[#202A44] mt-2">↺ edit</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// The Monday Memo — the weekly briefing popup, restructured 2026-05-31 from the
// 5-signal infographic into the operator-briefing format ported from the Maazah
// / Lil Bucks engines. Threads Christina's 2026-05-17 note (popup shouldn't read
// "moves-led / too tactical") by LEADING with THE READ + the 5 signals, then
// putting the plays AFTER as advisory — not above the fold. Reads like a memo
// from the Strategist: THE READ → 5 SIGNALS → WHAT WE'D DO → THE CALLS WE MADE.
// DECISIONS use {icon,title,reason,agent}; derive a colored tag from the icon.
const DEC_ICON_TAG = {
  "↑":{tag:"PROMOTED", c:"#4E8C63"}, "×":{tag:"KILLED", c:"#C2674A"},
  "⚡":{tag:"QUEUED", c:"#B8862F"}, "+":{tag:"ADDED", c:"#73B2C9"}
};
function WelcomeGuide({open, onClose, onNavigate}){
  const [decisionsOpen, setDecisionsOpen] = useState(false);
  useEffect(()=>{
    if(!open) return;
    const onKey = e=>{ if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return ()=>{ window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  },[open,onClose]);
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-[80] fade-in flex items-start justify-center overflow-y-auto scrollbar px-4 py-6 md:py-10" style={{background:"rgba(15,23,42,0.6)", backdropFilter:"blur(4px)"}} onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[880px] my-auto relative" style={{border:"1px solid var(--border)", overflow:"hidden"}} onClick={e=>e.stopPropagation()}>

        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-white/90 border border-[var(--border)] hover:bg-white transition" aria-label="Close">
          <span className="text-[18px] leading-none text-[#202A44]">×</span>
        </button>

        {/* Hero — navy carton band (2026-06-04): packaging top-band treatment with
            Kids-carton confetti, title in the bold display sans. */}
        <div className="px-7 pt-8 pb-7 confetti" style={{background:"#202A44", borderBottom:"1px solid var(--border)"}}>
          <div className="font-mono text-[10px] tracking-[0.3em] mb-2" style={{color:"#73B2C9"}}>{WELCOME_WEEK_RANGE}</div>
          <h2 className="font-display text-[32px] leading-[1.02] text-white">The Monday Memo</h2>
          <div className="font-mono text-[10.5px] tracking-[0.15em] mt-2" style={{color:"#75C596"}}>— The Strategist</div>
        </div>

        <div className="px-7 py-6">

          {/* THE READ — Maazah model: the pullquote IS the read; the signals + moves carry the detail */}
          <div className="mb-7">
            <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--muted)] mb-3">// THE READ</div>
            <p className="font-serif text-[19px] italic leading-snug text-[#202A44] pl-4 border-l-[3px] border-[#FACC15]">"{WELCOME_READ.pullQuote}"</p>
          </div>

          {/* 5 SIGNALS */}
          <div className="mb-7">
            <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--muted)] mb-3">// {WELCOME_HIGHLIGHTS.length} SIGNALS DRIVING THE WEEK</div>
            <div className="grid gap-2.5">
              {WELCOME_HIGHLIGHTS.map((h,i)=>(
                <div key={i} className="memo-card flex items-start gap-3.5 p-4 rounded-lg border border-[var(--border)] bg-[#FAFAF7]" style={{borderLeftWidth:"4px", borderLeftColor:h.color, animationDelay:(i*100)+"ms"}}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[19px] shrink-0" style={{background:h.color+"14"}}>{h.glyph||h.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase mt-1 px-2 py-[3px] rounded-full" style={{color:h.color, background:h.color+"14"}}>{h.kindLabel||"Signal"}</span>
                      {h.stat && (
                        <span className="shrink-0 text-right leading-none">
                          <b className="block font-black tracking-tight" style={{color:h.color, fontSize:(String(h.stat).length<=7?"23px":"13px"), lineHeight:1}}>{h.stat}</b>
                          {h.statLabel && <span className="block font-mono text-[8px] tracking-wider text-[var(--muted)] mt-1">{h.statLabel}</span>}
                        </span>
                      )}
                    </div>
                    <div className="mb-1">
                      <span className="text-[15.5px] text-[#202A44] font-semibold leading-snug">{h.label}</span>
                    </div>
                    <p className="text-[13.5px] text-[#3F4A5E] leading-relaxed">{h.detail}</p>
                    {h.sources && h.sources.length>0 && (
                      <div className="mt-1.5 flex flex-wrap gap-x-2">
                        {h.sources.map((s,k)=>(
                          <a key={k} href={s.url} target="_blank" rel="noreferrer" title={s.label} className="src-link font-mono text-[10px] tracking-wide">{sourceDomain(s.url, s.label)}</a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WHAT WE'D DO THIS WEEK — verb-led plays (advisory, after the signals) */}
          {WELCOME_READ.the_moves && WELCOME_READ.the_moves.length>0 && (
            <div className="mb-7">
              <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--muted)] mb-3">// WHAT WE'D DO THIS WEEK</div>
              <div className="grid gap-2.5">
                {WELCOME_READ.the_moves.map((m,i)=>{
                  const hold = m && m.kind==="hold";
                  return (
                  <div key={i} className="memo-card flex items-start gap-3.5 p-4 rounded-lg border bg-white" style={{borderColor:hold?"#E2DDCF":"#E8E1C2", borderLeftWidth:"4px", borderLeftColor:hold?"#64748B":"#4E8C63", animationDelay:(500+i*100)+"ms"}}>
                    <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-serif text-[15px] leading-none" style={{color:"#fff", background:hold?"#64748B":"#4E8C63"}}>{hold?"✋":String(i+1).padStart(2,"0")}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[15.5px] text-[#202A44] font-semibold leading-snug">{(m&&m.verb)||m}</span>
                        <span className="font-mono text-[8px] tracking-[0.14em] font-bold px-2 py-[3px] rounded-full shrink-0" style={{color:hold?"#64748B":"#4E8C63", background:hold?"#64748B14":"#4E8C6314"}}>{hold?"HOLD":"SHIP THIS"}</span>
                      </div>
                      {m&&m.why && <p className="text-[13.5px] text-[#3F4A5E] leading-relaxed">{m.why}</p>}
                    </div>
                    <span className="memo-arrow shrink-0 text-[15px] self-center" style={{color:hold?"#64748B":"#4E8C63"}}>→</span>
                  </div>
                  );
                })}
              </div>
            </div>
          )}


          {/* THE CALLS WE MADE — decisions log, collapsed */}
          <div className="mb-6 rounded-lg border border-[var(--border)] overflow-hidden">
            <button onClick={()=>setDecisionsOpen(o=>!o)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-[#FAFAF7] transition">
              <span className="font-mono text-[9.5px] tracking-[0.18em] text-[var(--muted)]">{decisionsOpen?"▼":"▶"} THE CALLS WE MADE TO GET HERE</span>
              <span className="font-mono text-[9.5px] tracking-wider text-[var(--muted)]">{DECISIONS.length} decisions · {decisionsOpen?"hide":"show"}</span>
            </button>
            {decisionsOpen && (
              <div className="px-4 pb-4 pt-1 grid gap-2.5 fade-in border-t border-[var(--border)]">
                {DECISIONS.map((d,i)=>{
                  const t = DEC_ICON_TAG[d.icon] || {tag:"NOTE", c:"#64748B"};
                  return (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="font-mono text-[8px] tracking-wider px-1.5 py-[3px] rounded text-white shrink-0 mt-0.5" style={{background:t.c}}>{t.tag}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] text-[#202A44] leading-snug font-medium">{d.title}</div>
                      <div className="text-[11px] text-[var(--muted)] leading-snug mt-0.5">{d.reason}</div>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Signature + action CTA */}
          <p className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--muted)] leading-relaxed mb-5">— Built for Christina + the Willa's team.<br/>The engine ran over the weekend so Monday starts with the moves, not the research.</p>
          <div className="text-center">
            <button onClick={()=>{ onClose(); if(onNavigate) onNavigate("intel"); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#202A44] text-white font-mono text-[11px] tracking-[0.15em] hover:bg-[#1E293B] transition">
              SEE THIS WEEK'S ENGINE →
            </button>
          </div>
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
// REFRESHED EVERY WEEK as part of the Step 6 cascade (see CLAUDE.md) — each
// prompt anchors on a THIS-WEEK CULTURAL_PULSE / TRENDS signal, written as a
// conversational strategist question (no signal IDs, no dates), spread across
// different lanes (trend / recipe / parenting / humor-format). Stale prompts
// here read as a stale engine the moment the chat opens.
const STRATEGIST_SUGGESTED_PROMPTS = [
  "A pesticide file just reopened for public comment and a state started subpoenaing brands over an oil claim — both because somebody ran a lab test. We've had our oats tested for years and barely said it. How do I make testing sound like a standard and not a brag?",
  "Everyone's selling September like it's another January, but almost half of adults apparently don't feel it. Is there a version of us saying \"you don't have to reset anything\" that lands as generous instead of as us having nothing to sell?",
  "Fiber searches are growing at double the rate of protein and we're one of the only cartons that can honestly answer it. How do I lead with fiber without turning into a nutrition lecture — and without using the word everyone's using?",
  "The biggest brand in the category is now printing political copy on every carton it makes. That's a huge amount of free media. Do we have an answer to that, or is the answer that we just don't play that game?"
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
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar px-4 py-4" style={{background:"#F4F5F3"}}>
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
            <h1 className="font-display text-[26px] leading-none">Make it yours</h1>
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
    return true; /* Vercel behavior (Alex 2026-05-31): the Monday Memo opens on EVERY reload; closing it lands on the Intelligence Brief. */
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
    setWelcomeOpen(false);
    setSection("intel"); // closing the Monday Memo always lands you on the Intelligence Brief
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
        {section==="diagnostic" && <div className="h-full overflow-y-auto scrollbar px-8 py-6"><DiagnosticInbox/></div>}
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
      <HowItWorks open={howItWorksOpen} onClose={()=>setHowItWorksOpen(false)} onOpenReference={()=>{ setHowItWorksOpen(false); setReferenceOpen(true); }}/>
      <ReferenceGuide open={referenceOpen} onClose={()=>setReferenceOpen(false)}/>
      <WelcomeGuide open={welcomeOpen} onClose={closeWelcome} onNavigate={setSection}/>
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
