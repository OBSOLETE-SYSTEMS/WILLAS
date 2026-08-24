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
    trend:"fall flavor season opened aug 19 — five pumpkin drinks, a tiramisu line and a 17-gram-protein latte, with the rest of the shelf turning over aug 25 🎃",
    detail:"Dunkin' launched its full fall 2026 lineup nationwide on Aug 19, 2026: a five-item pumpkin range — a Nutty Pumpkin Protein Latte carrying a 17g protein claim, Pumpkin Cloud Dunkalatte, Pumpkin Pie Coffee Chiller, Pumpkin Patch Cloud Latte and pumpkin swirl — alongside an entirely new tiramisu beverage line. Starbucks confirmed its own fall lineup lands Aug 25, 2026, led by the Pumpkin Spice Latte's return plus new pumpkin cream drinks and a chai-cider \"Chaider.\" Two national chains, six days apart, moved the whole coffee occasion from cold-and-simple to syrup-and-spice — and one of them bolted a protein number onto the seasonal build. The fridge and the menu board are both turning over to autumn in the last full week of August, which is the earliest this changeover has been fully live.",
    platform:"National food-service menus + consumer press",
    views:"Peak national seasonal news cycle",
    velocity:"high",
    pillars:[
      "INGREDIENTS/RECIPES",
      "HEALTH/WELLNESS"
    ],
    angle:"Let the shelf go orange. Post the pour that didn't change — same four ingredients in September as in June, no syrup pump required.",
    urgency:"RIDE NOW",
    sources:[
      {label:"Yahoo Lifestyle · Dunkin' 2026 fall menu: Pumpkin spice is back and it's not alone (Aug 19, 2026)", url:"https://www.yahoo.com/lifestyle/articles/dunkin-2026-fall-menu-pumpkin-090102966.html"},
      {label:"Fox 10 Phoenix · Starbucks reveals Pumpkin Spice Latte return date, Aug 25 (Aug 19, 2026)", url:"https://www.fox10phoenix.com/news/starbucks-reveals-pumpkin-spice-latte-return-date-2026"}
    ]
  },
  {
    id:"T-2",
    trend:"protein is now printed on pizza crust, instant noodles and cocktails — and new research says the number on breakfast isn't doing the job the box implies 💪",
    detail:"A national feature published Aug 18, 2026 traced protein claims spreading into pizza crust, instant noodles and even cocktails, tied the surge to a mix of political messaging and influencer culture, and noted that most Americans already meet their protein needs while falling well short on fruit and vegetables. Three days later, on Aug 21, 2026, a new analysis landed the mechanism side of the same argument: protein loaded into breakfast items or snacks does not build muscle on its own — dietary protein and resistance training have to work together — and most healthy adults get enough from ordinary food without any fortified format. Two different kinds of evidence, four days apart, both pointing at the same thing: the number on the front of the package has outrun what the number actually does.",
    platform:"National press + nutrition science coverage",
    views:"National feature cycle",
    velocity:"high",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    healthSubAngle:"OBESITY/SATIATION",
    angle:"Skip the number war. The move is a breakfast that's already food — no fortification, no bolt-on, nothing added to make the claim.",
    urgency:"RIDE NOW",
    sources:[
      {label:"The Washington Post · How protein ate our grocery stores (Aug 18, 2026)", url:"https://www.washingtonpost.com/ripple/2026/08/18/protein-ate-our-grocery-stores/"},
      {label:"Medical Xpress · More protein in your breakfast or snacks won't give you more muscle without more work (Aug 21, 2026)", url:"https://medicalxpress.com/news/2026-08-protein-breakfast-snacks-wont-muscle.html"}
    ]
  },
  {
    id:"T-3",
    trend:"the first football saturday of the year is aug 29 — eight games, noon into the night, and a few million kitchens running early 🏈",
    detail:"The official season-opening slate, published Aug 17, 2026, puts eight college football games on Saturday, Aug 29, 2026, running from a noon kickoff into the night: North Carolina–TCU staged in Dublin, NC State–Virginia as the season's first ACC game, and the Cricket MEAC/SWAC Challenge Kickoff between Alabama A&M and Howard among them. Coverage dated Aug 22, 2026 framed that Saturday as the last Saturday without FBS football, which means the anticipation window is already live and running. It is the season's first tailgate, first watch party and first early-alarm household morning — an occasion the brand has never claimed, arriving in a week where back-to-school is spent and the fall menu conversation is entirely owned by coffee chains.",
    platform:"National sports media + watch-party social",
    views:"Season-opening national audience",
    velocity:"high",
    pillars:[
      "INGREDIENTS/RECIPES",
      "PARENTING"
    ],
    angle:"Claim the morning, not the tailgate. Kickoff is noon — own the 9am breakfast that gets a whole house out the door.",
    urgency:"RIDE NOW",
    sources:[
      {label:"ESPN Press Room · College football returns: ESPN's Week 0 slate opens the 2026 season (Aug 17, 2026)", url:"https://espnpressroom.com/press-release/college-football-returns-espns-week-0-slate-opens-2026-season-with-dublin-duel-all-acc-clash-cricket-meac-swac-challenge-kickoff-and-more/"},
      {label:"Yahoo Sports · Are there college football games today? 2026 season starts August 29 (Aug 22, 2026)", url:"https://sports.yahoo.com/articles/college-football-games-today-2026-184854593.html"}
    ]
  },
  {
    id:"T-4",
    trend:"the category's own holiday landed aug 22 with 47,000 people signed up for a seven-day dairy-free run — and a 5,000-year heritage map behind it 🌍",
    detail:"World Plant Milk Day's ninth annual edition landed Saturday, Aug 22, 2026, anchored this year by a \"Heritage Campaign\" that maps roughly 5,000 years of plant-based milk tradition across six continents, plus a \"Milkscape\" digital experience. More than 47,000 people registered for the seven-day dairy-free pledge ahead of the day, which puts the pledge window running through roughly Aug 29, 2026 — live for the whole of this refresh week. Two things make it usable where a manufactured observance would not be: it is category-owned with nine years behind it, and its 2026 framing is lineage and tradition rather than novelty or swap-shaming. Plant milk is being presented as the old thing, not the new thing.",
    platform:"Category advocacy + food press",
    views:"Global category observance",
    velocity:"high",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"Answer the heritage frame with dates, not adjectives: born 1921, launched 2021, and the ingredient list never needed modernising.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Green Queen · Future Food Quick Bites: plant milk day heritage campaign and 47,000 pledge sign-ups (Aug 19, 2026)", url:"https://www.greenqueen.com.hk/future-food-quick-bites-oatly-x-breadfast-blended-koji-beef-plant-milk-day/"},
      {label:"World Plant Milk Day · official campaign site (permanent reference page)", url:"https://www.worldplantmilkday.com/"}
    ]
  },
  {
    id:"T-5",
    trend:"a \"sugar free\" claim just got sued over a sweetener that legally sits outside the sugar number 🍬",
    detail:"A class action filed Aug 12, 2026 in California by two plaintiffs — first widely reported Aug 18, 2026 — alleges that a national electrolyte-mix brand's \"sugar free\" hydration sticks are sweetened with 4–5g of allulose per serving, well above the 0.5g ceiling a sugar-free claim is allowed to sit on. The regulatory picture is genuinely unsettled, and that is the story: the complaint leans on FDA's 2016 Nutrition Facts rule, which listed allulose inside \"Total Sugars,\" while FDA has exercised enforcement discretion since 2019 allowing allulose to be excluded from BOTH the Total Sugars and Added Sugars figures — still counted in Total Carbohydrate, still printed in the ingredient list. It is guidance rather than a rule change, which is exactly why the claim space is contested. A trade analysis published Aug 21, 2026 documented allulose spreading fast across clean-label formulation as the cheapest route to a low-sugar claim without changing how a product tastes. The claim space around sugar is now a litigation surface, not just a marketing one.",
    platform:"Consumer litigation + ingredient trade press",
    views:"Trade + class-action coverage",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"Two words the category can't say: nothing added. Willa's sugar number has no sweetener standing behind it — state it flatly, no asterisk.",
    urgency:"THIS WEEK",
    sources:[
      {label:"ClassAction.org · 'Sugar free' Liquid I.V. electrolyte drink mixes contain sugar, class action claims (Aug 18, 2026)", url:"https://www.classaction.org/news/sugar-free-liquid-i.v.-electrolyte-drink-mixes-contain-sugar-class-action-lawsuit-claims"},
      {label:"FoodNavigator · The rise of allulose: can this rare sugar crack the clean-label challenge? (Aug 21, 2026)", url:"https://www.foodnavigator.com/Article/2026/08/21/why-allulose-is-gaining-industry-attention/"}
    ]
  },
  {
    id:"T-6",
    trend:"\"real food\" is now the phrase in the federal press release, not just the wellness aisle 🏛️",
    detail:"USDA announced $7.5 million in Cold Chain Grants for the Emergency Food Assistance Program on Aug 17, 2026, funding cold-storage equipment at up to $200,000 per sub-awardee so food-assistance organizations can hold and move more fresh, frozen and minimally processed food; applications close Oct 1, 2026 and sub-awardees carry a 10% cash cost-share. The content that matters is the vocabulary: the announcement is titled around expanding access to \"real food,\" and federal officials tied the money explicitly to getting whole foods to families rather than to calorie volume. Whole-food-versus-processed has moved from an advocacy frame to the language of a routine grant notice — a quiet but durable tailwind for every brand whose whole argument is what's actually in the package.",
    platform:"Federal agency communications + ag trade press",
    views:"Ag + policy trade pickup",
    velocity:"low",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"The vocabulary shifted — use it. \"Real food\" is now the neutral term, so stop hedging it as a positioning word and just say it.",
    urgency:"WATCH",
    sources:[
      {label:"USDA · USDA announces $7.5 million in grant funding to expand cold chain capacity and increase access to real food (Aug 17, 2026)", url:"https://www.usda.gov/about-usda/news/press-releases/2026/08/17/usda-announces-75-million-grant-funding-expand-cold-chain-capacity-and-increase-access-real-food"},
      {label:"WBIW · USDA announces $7.5 million in grant funding to expand cold chain capacity (Aug 18, 2026)", url:"https://www.wbiw.com/2026/08/18/usda-announces-7-5-million-in-grant-funding-to-expand-cold-chain-capacity-and-increase-access-to-real-food/"}
    ]
  },
  {
    id:"T-7",
    trend:"the medication changed one person's plate — and about 70% of them say it changed the whole household's 🏠",
    detail:"New consumer survey data reported Aug 19, 2026 found roughly 60% of GLP-1 users are buying less food overall, about 30% are trading up to more expensive items, and about 70% say the medication changed what the rest of their household eats as well. More than 80% of people who stop the medication keep at least some of the dietary changes, while baked goods and salty snacks are the categories most likely to rebound within one to three months of stopping. Separate trade analysis dated Aug 21, 2026 found searches for GLP-1 safety concerns spiked 100% after a UK regulator disclosed adverse-event reports, but consultants describe the safety story as having limited cut-through next to cost and access — so the buying shift toward smaller portions and nutrient-dense picks is durable regardless of the headline cycle. The addressable audience is no longer the person on the medication; it's the fridge they share.",
    platform:"Consumer survey + category trade analysis",
    views:"Category-planning coverage",
    velocity:"high",
    pillars:[
      "HEALTH/WELLNESS",
      "PARENTING"
    ],
    healthSubAngle:"GLP-1",
    angle:"The buyer isn't one person anymore. Talk to the shared fridge — nutrient-dense breakfast is becoming a household default, not a personal regimen.",
    urgency:"THIS WEEK",
    sources:[
      {label:"BakeryandSnacks · New GLP-1 consumer data challenges food industry forecasts (Aug 19, 2026)", url:"https://www.bakeryandsnacks.com/Article/2026/08/19/new-glp-1-consumer-data-challenges-food-industry-forecasts/"},
      {label:"FoodNavigator · Could GLP-1 safety concerns affect uptake? (Aug 21, 2026)", url:"https://www.foodnavigator.com/Article/2026/08/21/impact-of-glp-1-safety-concerns-on-food-industry/"}
    ]
  },
  {
    id:"T-8",
    trend:"43% of shoppers can't pronounce what's in their snacks — and it's gen z and boomers, not the middle, who mind the most 🗣️",
    detail:"A Talker Research survey of 2,000 US adults, published Aug 17 and picked up in business press Aug 20, 2026, found 66% agree that the fewer ingredients a snack has the more they trust it, and 43% admit struggling to pronounce common snack ingredients — 52% of Gen Z versus 34% of Boomers. The useful finding is underneath the headline number: Boomers and Gen Z both rank \"not over-processed\" as their top priority, while Millennials and Gen X rank protein content first. The two ends of the age range are arriving at the same standard from opposite directions while the demographic in the middle is buying on a completely different metric. That is a targeting instruction, not just a stat — the grandparent and the 22-year-old are the same customer.",
    platform:"Consumer survey + regional business press",
    views:"Trade + regional business pickup",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "REVIEWS/RECS"
    ],
    angle:"Write one line that lands on a 22-year-old and a grandparent at once. The middle follows the trust, not the claim.",
    urgency:"WATCH",
    sources:[
      {label:"Idaho Business Review · Link Snacks survey reveals generational differences in protein and ingredient preferences (Aug 20, 2026)", url:"https://idahobusinessreview.com/2026/08/20/link-snacks-survey-generational-protein-ingredient-preferences/"},
      {label:"Talker News · Are there too many ingredients in our snacks? (Aug 17, 2026)", url:"https://talker.news/2026/08/17/are-there-too-many-ingredients-in-our-snacks/"}
    ]
  },
  {
    id:"T-9",
    trend:"the country's biggest grocery door posted 2.6% comps — its slowest pace in years — and the volume that still grew was pantry and fresh 🛒",
    detail:"Walmart's Q2 FY2027 results, reported Aug 20, 2026, showed US comparable sales up 2.6%, the slowest comparable-sales pace in years, even as total revenue rose 5.9% year over year to $187.9 billion on e-commerce, advertising and membership. Grocery comps rose mid-single digits on pantry and fresh-food volume with grocery inflation measured at 1.3%, and the company leaned on roughly $3 billion in tariff refunds and more than 11,000 price rollbacks to hold share. Its CEO said customers \"tell us they're still feeling some pressure.\" The read for a premium clean-label carton is not about price: shoppers under pressure are still adding real-food volume to the basket, they are just interrogating what each item earns.",
    platform:"Retail earnings + national business press",
    views:"National business cycle",
    velocity:"medium",
    pillars:[
      "REVIEWS/RECS",
      "HEALTH/WELLNESS"
    ],
    angle:"Squeezed shoppers still buy real food. Argue worth, never price — show what one carton actually covers across a week of mornings.",
    urgency:"WATCH",
    sources:[
      {label:"CNBC · Walmart (WMT) Q2 2027 earnings (Aug 20, 2026)", url:"https://www.cnbc.com/2026/08/20/walmart-wmt-q2-2027-earnings.html"},
      {label:"PYMNTS · Walmart sees mid-single-digit grocery growth as shoppers prioritize affordability (Aug 20, 2026)", url:"https://www.pymnts.com/earnings/2026/walmart-sees-mid-single-digit-grocery-growth-as-shoppers-prioritize-affordability/"}
    ]
  },
  {
    id:"T-10",
    trend:"this year's oat harvest is running ahead of last year's pace — iowa was 96% off the field by mid-august 🌾",
    detail:"USDA NASS's Crop Progress report for the week ending Aug 16, 2026, released Aug 17, 2026, showed the oat harvest well underway across the nine states that account for 78% of US oat acreage. Iowa stood at 96% harvested — six points ahead of last year's pace, after running 25 points ahead in early August — while Wisconsin sat at 57% the week prior. This is the raw-material backdrop under every oat-sourcing, zero-waste and soil-health story available this fall, and it is a non-competitor peg for a sustainability lane that has been resting since the last climate story ran. It is not itself a consumer hook; it is the reason the fall harvest visual is honest right now rather than decorative.",
    platform:"USDA crop reporting",
    views:"Ag trade + commodity desks",
    velocity:"low",
    pillars:[
      "INGREDIENTS/RECIPES",
      "HEALTH/WELLNESS"
    ],
    angle:"Harvest is the only honest fall story going. Show a groat coming off a real field before the category shows another syrup pump.",
    urgency:"WATCH",
    sources:[
      {label:"USDA NASS · Crop Progress, week ending Aug 16 (released Aug 17, 2026)", url:"https://esmis.nal.usda.gov/sites/default/release-files/796020/prog3326.pdf"},
      {label:"USDA NASS · National Crop Progress publications index (permanent reference page)", url:"https://www.nass.usda.gov/Publications/National_Crop_Progress/index.php"}
    ]
  }
];



const TICKER = [
  {agent:"trend", text:"two national coffee menus flipped to pumpkin and spice six days apart, so the week opens on the pour that didn't get a fall version — and never names a chain."},
  {agent:"editor", text:"a 'sugar free' claim became a legal surface this window, so the founder brief states 1g from the oats plainly — no case, no brand, no plaintiff, and never the words 'sugar free' about us."},
  {agent:"composer", text:"claimed gameday morning for the first time — kickoff is noon on Aug 29, so the brief owns 9am. no tailgate, no stadium, no team, no logo."},
  {agent:"pulse", text:"five of six live meme formats failed on adjacency or required a real family member on camera. the one that shipped has a hard reversal built in — a slot a carton can occupy without being announced."},
  {agent:"editor", text:"benched back-to-school for a second straight week, including a measured Aug 21 school-food story — every honest version of it is week five of the same lane."},
  {agent:"trend", text:"caught a heart-health coffee story dated Aug 18 that publishes to Jul 20 — a month-old paper wearing an in-window byline. held as internal context only."},
  {agent:"hook", text:"demoted 'fewer ingredients, more trust' from headline to supporting proof — that lane ran five times in six weeks. rebuilt the brief on the generational fork underneath it."},
  {agent:"comp", text:"private label cut an organic oat six-pack about 20% through Aug 24. the answer is the Saturday carousel counting six jobs one carton covers — not one dollar figure anywhere."},
  {agent:"comp", text:"the retreat narrative broke on Aug 17 — the category's biggest listed player up 41% on the month while a different name fell 11%. posture this week is confidence, not defence."},
  {agent:"visual", text:"the harvest Reel ships only if the groats are real and the pour is real — no prop milk, no thickener. faking a proof shot on a transparency brand is the one unrecoverable mistake."},
  {agent:"paid", text:"$1,150 across four briefs. the largest share is behind the store walk, the smallest and longest behind the make-ahead pin, and the founder sugar brief gets nothing on purpose."},
  {agent:"perf", text:"front-loaded posts out-completed withheld reveals across AUG 17 – AUG 23, so four briefs this week state the whole claim in frame one and spend the rest of the runtime proving it."}
];


const COMPETITORS = [
  {
    id:"C-1",
    name:"Oatly",
    color:"#2B4CE0",
    status:"Flagged Aug 17, 2026 as the rare bright spot in plant-based equities — shares up 41% over the trailing month and 29% year to date — on the same day Beyond Meat fell 11% on the reaction to a 1-for-30 reverse stock split. The coverage framed the divergence explicitly: weakness elsewhere in plant-based is company-specific, not sector-wide, and parts of the category are demonstrably working. That reading matters because the prevailing trade narrative through early August had been retreat — a national dairy player exiting ready-to-drink oat entirely, hybrid players signalling pullback. The oat-milk category leader compounding through the same window is the counter-evidence, and it is internal intel only.",
    direction:"up",
    opportunity:"Stop answering the retreat narrative. The leader is compounding, which means the category is fine and the exits were company problems — posture should be confidence, not defence.",
    sources:[
      {label:"24/7 Wall St · Beyond Meat falls 11% on reverse split reaction, Oatly slips (Aug 17, 2026)", url:"https://247wallst.com/investing/2026/08/17/beyond-meat-falls-11-on-1-for-30-reverse-split-reaction-oatly-slips/"}
    ]
  },
  {
    id:"C-2",
    name:"Kirkland Signature (Costco private label)",
    color:"#E31837",
    status:"A crowdsourced warehouse price tracker covering 641+ Costco locations shows Kirkland Signature Organic Oat Beverage (6 × 32oz) currently logging at $9.79–$9.99, down roughly 20% from an earlier $12.49 list, with the most recent warehouse data points dated Aug 24, 2026. Private label moving down 20% on an organic oat SKU lands in exactly the week a national grocery leader reported its slowest comparable-sales pace in years and leaned on 11,000+ rollbacks to hold share. The bulk value-seeking household is being actively courted, and private label is the quietest and most persistent threat in the set because it never has to run a campaign.",
    direction:"up",
    opportunity:"Pricing intel only — Willa's never answers a price move with a price move. The counter is worth: what the carton contains that a bulk pack structurally cannot.",
    sources:[
      {label:"WarehouseRunner · Kirkland Signature Organic Oat Beverage price tracker, 641+ warehouses (data through Aug 24, 2026)", url:"https://app.warehouserunner.com/costco/1272413-kirkland-signature-organic-oat-beverage-6-32-oz"}
    ]
  },
  {
    id:"C-3",
    name:"Row 7 Seed Company",
    color:"#D64F2A",
    status:"Announced Aug 18, 2026: the flavor-bred certified-organic produce brand expanded its Sprouts Farmers Market partnership from a regional footprint to the produce aisle of all 490 Sprouts locations across 25 states. It is a full-fleet natural-channel win for a brand whose entire proposition is that the thing itself was bred to taste better, not processed to taste better — the nearest structural analogue in an adjacent category to Willa's whole-oat argument. The same retailer announced a new dense-urban location in San Francisco's SoMa on Aug 22, 2026, so the channel is expanding doors at the same time it is expanding clean-label assortment.",
    direction:"up",
    opportunity:"The 'earn the whole fleet' story is live in the natural channel right now. Watch how a flavor-first, no-processing argument gets sold to a buyer — it is the same pitch.",
    sources:[
      {label:"NOSH · Row 7 Seed Company expands partnership with Sprouts Farmers Market nationwide (Aug 18, 2026)", url:"https://www.nosh.com/pr/2026/08/18/row-7-seed-company-expands-partnership-with-sprouts-farmers-market-to-bring-flavorfirst-organic-produce-nationwide"},
      {label:"Hoodline · Sprouts Farmers Market plots new store locations (Aug 22, 2026)", url:"https://hoodline.com/2026/08/sprouts-farmers-market-plots-panorama-city-store-on-long-vacant-roscoe-lot/"}
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
    id:"AUG24-TT-1",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"at-shelf-moment",
    timing:"Wed Aug 26 · 9am",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"every shelf in here got a fall version. this one didn't need one.\" — the pour that doesn't have a season",
    intel:[
      {type:"TREND", text:"T-1: the fall food-service changeover went fully live in a six-day span — one national chain dropped its complete fall lineup on Aug 19, 2026 (a five-item pumpkin range, including a latte carrying a 17g protein claim, plus an entirely new tiramisu beverage line), and the second national chain flips its own fall menu on Aug 25, 2026 led by the return of its pumpkin drink. Two menu boards, six days apart, moved the whole coffee occasion from cold-and-simple to syrup-and-spice, and the grocery end-cap resets orange behind them — the earliest this changeover has ever been fully live. That is the pressure this brief answers, and the answer is subtraction: nothing about the carton changes for the season, because the reason it tastes the way it does is structural (the whole oat groat), not seasonal (a pump). INTERNAL ONLY: neither chain, neither menu, no drink name, no competitor and no 17g protein figure may appear in the script, any overlay, the caption or any caption variant — the turnover is described generically as 'the aisle going orange' and 'the seasonal reset.' Also internal: do NOT let this become a taste-competition claim. Willa's does not beat a seasonal drink on flavor in this brief; Willa's simply never needed a seasonal version. LANE DISCIPLINE: this brief and AUG24-PIN-1 share the same T-1 anchor and must never restate each other. This brief owns the no-seasonal-SKU argument — the carton didn't change. PIN-1 owns the make-it-at-home spiced Chocolate drink and never touches the argument. If a line here could sit on that pin, cut it."},
      {type:"PULSE", text:"CP-8 (report dated Aug 22, 2026): the dominant platform-wide pattern is structural, not topical — opening on-screen text now states the entire situation in one flat sentence in the first frame, and the video spends every remaining second supplying the proof. No slow build, no withheld payoff, no reveal. This inverts the instinct behind almost all food editing, which saves the carton for the end. Ride it exactly: the whole claim sits in frame one, then four ingredients get said out loud on the walk back and one pour closes it. INTERNAL ONLY: never reference the format, the report, or 'what's trending' on camera or in copy — the format is a shooting instruction, not a subject. Note for the editor: if the first frame reads as a teaser rather than the entire claim, the brief has failed its own structure and needs a re-cut, not a re-shoot."},
      {type:"COMPETITOR", text:"C-1 (Aug 17, 2026): the oat-milk category leader was flagged as the rare bright spot in plant-based equities — shares up 41% over the trailing month, 29% year to date — on the same day a hybrid player fell 11% on a reverse-split reaction, with coverage framing the divergence explicitly as company-specific weakness rather than a sector problem. Read for this brief: the prevailing retreat narrative is wrong, the category is compounding, and Willa's posture should be confidence rather than defence. That is why this brief does not argue, apologise or explain itself — it states the list and walks. INTERNAL ONLY: no brand name, no ticker, no share-price move, no financial framing and no 'the category is fine' commentary reaches any consumer surface. This is posture calibration for the read, nothing more."},
      {type:"AUDIENCE", text:"The shopper standing in this aisle in the last week of August is being asked to re-buy her whole routine in autumn packaging — the end-cap, the menu board and the cold case all changed within a week, and none of them changed for her. The relief is not another claim; it's permission to keep something. Front-loading the claim per CP-8 hands her that in the first second, and the rest of the video is just four recognisable words said out loud while she watches a real store go orange behind them. The persuasion is the ordinariness of the four things, not the size of the argument. INTERNAL ONLY: no shopper-psychology language, no 'in a world where' framing, and no voice direction — the dry-confident register is executed, never described. Register reference for the edit only: design-led, ingredient-first in-aisle content — dry, unhurried, never smug, never winking at the camera."}
    ],
    hooks:[
      {text:"every shelf in here got a fall version. this one didn't need one. oats, water, vanilla, salt — same as june.", recommended:true},
      {text:"this whole store went orange in a week. the carton in my hand reads exactly the way it did in june.", recommended:false},
      {text:"no autumn edition. no limited run. four things, and they don't change in september.", recommended:false}
    ],
    caption:"The pour in September is the same pour as June. 🌾\n\norganic whole grain oats, filtered water, organic vanilla extract, sea salt. that was the list in june. it's the list now. it'll be the list in november.\n\nevery shelf in here got a fall version. this one didn't need one. what makes Willa's Original rich and smooth was never a syrup pump, it was the whole oat groat. most oat milks filter the bran and germ out and process the starch into sugar, and the protein and the fiber leave with it. ours stay. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar, and the oats brought it.\n\nnothing against a season. we just never needed one to make this taste like something.\n\nthe whole oat. not the syrup.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#fouringredients",
      "#fallreset",
      "#pumpkinspiceseason",
      "#grocerystorefinds",
      "#plantmilk",
      "#cleaningredients",
      "#realfood"
    ],
    visual:"One continuous handheld walk through a real grocery store during the actual fall reset — no studio, no styled set, no b-roll runway. Shoot it on a phone at chest height in a horizontal-stabilised vertical 9:16, gimbal OFF: the small wobble is the credibility and a glassy gimbal glide makes this read as an ad. Go on a weekday morning between 8 and 10am when the store is empty, the seasonal end-caps are already built and the overheads are on but the aisles are quiet — grade toward that slightly cool fluorescent white rather than warming it up, because the honesty of the location is the whole point. FRAME ONE IS THE WHOLE BRIEF: open cold, mid-stride, already walking, with the full claim set in navy #202A44 on a soft cream #FAFAF7 rounded plate, centred, held rock-steady for the first three seconds while the store moves behind it — 'every shelf in here got a fall version. this one didn't need one.' No teaser, no build, nothing withheld; per the front-loaded structure the rest of the video is only proof. BEAT TWO, the walk past the reset: track left-to-right past a seasonal end-cap that has gone fully orange — gourds, spice packaging, autumn-leaf shelf talkers, the whole build — and let it slide through frame without stopping on any single item. CRITICAL AND NON-NEGOTIABLE: no competitor carton, bottle, logo or wordmark may be legible at any point. Shoot the end-cap slightly wide and keep it moving so nothing resolves; blur or shot-swap anything readable in the edit, and if a competitor product cannot be kept illegible in a given aisle, move to a different aisle rather than fixing it in post. BEAT THREE, the turn: swing into the set where this store actually stocks Willa's — shoot the real placement, refrigerated or ambient, and do not build a fake one. Slow the walk here, one held beat of the shelf. BEAT FOUR, the pull: a single ungloved hand enters from the bottom-right and takes one carton of Willa's Original off the shelf, label forward, no hero tilt, no rotation, no flip to the back of the label — this is a person picking up their milk, not a product demo. BEAT FIVE, the walk back: same unbroken handheld motion heading back toward the front of the store with the carton in hand and the orange end-cap receding behind it, while the four ingredients tick on one at a time in Ingredients-pillar green #75C596, one word-group per footfall, stacked no more than four deep, aligned left in the lower third — 'organic whole grain oats' / 'filtered water' / 'organic vanilla extract' / 'sea salt'. BEAT SIX, the pour: hard cut to a clean kitchen counter, pale wood, morning window light from camera-left, static and locked — the only static shot in the piece, which is why it lands. One pour into a clear glass, shot slightly above the rim so the opacity reads, held long enough to see it settle. One navy line ticks in beside the glass: '4g+ protein · 2g+ prebiotic fiber · 1g sugar, from the oats.' END CARD: plain cream #FAFAF7 card, navy type, no motion, no whoosh, no sting — 'the whole oat. not the syrup.' — held 1.5 seconds with the Willa's wordmark bottom-centre. Palette across the whole piece is exactly three: cream, navy ink, and one green, with the store's own orange as the only other colour in frame and never applied to type. Hands and the store do all the work; no talent on camera, no face, no voice-of-god narration — the voiceover is one dry, unhurried person reading short lines at conversational volume. No pumpkin-spice costume bit, no eye-roll to camera, no seasonal props brought to set. Nothing on screen counts label lines or flips the carton over.",
    script:[
      {t:"0:00-0:03", vo:"the whole front of this store changed in about a week.", onScreen:"every shelf in here got a fall version. this one didn't need one."},
      {t:"0:03-0:06", vo:"spice, syrup, an autumn edition of everything.", onScreen:"the seasonal reset, in progress"},
      {t:"0:06-0:09", vo:"we didn't make a fall one.", onScreen:"no fall version"},
      {t:"0:09-0:12", vo:"there'd be nothing to change. it'd be the same four things.", onScreen:"(there was nothing to change)"},
      {t:"0:12-0:17", vo:"organic whole grain oats. filtered water. organic vanilla extract. sea salt.", onScreen:"organic whole grain oats → filtered water → organic vanilla extract → sea salt"},
      {t:"0:17-0:20", vo:"rich and smooth in september for the same reason it was in june — we use the whole oat.", onScreen:"4g+ protein · 2g+ prebiotic fiber · 1g sugar, from the oats"},
      {t:"0:20-0:22", vo:"the whole oat. not the syrup.", onScreen:"the whole oat. not the syrup."}
    ],
    audio:"No trending sound, original audio. The bed is the store itself — record real location sound on the walk: the refrigeration hum, wheels on tile, the shelf-pull, the footfalls. Those footfalls are the metronome the four ingredient overlays tick to, so capture a clean 20-second walking pass with no talking for the editor to lay under everything. Voiceover is a single dry, unhurried read at conversational volume, recorded separately in a quiet room and dropped in slightly under the room tone so it sounds like a thought, not an announcement — not framed as the founder, no talent on camera. Close-mic the pour separately on the counter: the glug and the settle are the only sound in the piece that gets to be loud. No music, no sting, no bass drop, no sped-up edit, no seasonal jingle joke. Editor's note: leave a half-beat of pure store hum after 'we didn't make a fall one' — the pause is the joke, and scoring over it kills it.",
    duration:"0:22",
    cta:{soft:"save this for the next time the aisle tries to sell you a season.", medium:"pour Willa's Original — same four ingredients in september as in june.", strong:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar, and the oats brought it. same list all year."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG24-IG-R1",
    platform:"Instagram Reel",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Wed Aug 26 · 12pm",
    priority:"HIGH",
    rideNow:true,
    concept:"\"born 1921. launched 2021. the ingredient list never needed updating.\" — the heritage answer, told in dates",
    intel:[
      {type:"TREND", text:"T-4 — the category's own ninth annual observance landed Saturday, Aug 22, 2026, and its 2026 framing is the usable part: a heritage campaign built around a \"5,000-year story\" of plant-milk tradition mapped across six continents, plus a Milkscape digital experience, with more than 47,000 people registered for a seven-day dairy-free pledge that runs through roughly Aug 29, 2026 — live across this entire refresh window. The strategic read: the category spent the weekend arguing that plant milk is the OLD thing, not the new thing. Lineage, not novelty. Tradition, not swap-shaming. That is the first heritage frame the category has handed Willa's all year, and Willa's is the only brand in the set that can answer it with an actual pair of dates instead of an adjective. INTERNAL ONLY: not one element of this paragraph reaches consumer copy. Never name the observance, never say \"World\" or \"Day\" or \"ninth annual\" — the standing no-manufactured-observance rule kills a peg the second it becomes the hook. Never cite the 47,000 figure, and above all never let it read as a Willa's number. Never quote the 5,000-year map as if Willa's measured it. The signal sets the WEEK this posts. It contributes zero words to what the viewer hears."},
      {type:"AUDIENCE", text:"The heritage frame only converts if the answer is specific, and Willa's specificity is dates: born 1921, launched 2021. Everyone else in the chilled set answers a lineage question with adjectives — traditional, timeless, ancient grain. This is therefore the week to spend Christina's second and final on-camera slot (Christina Rule, reserved category 1: heritage / origin beats, cap of 3/week; TT-2 holds the other slot as founder-POV activist). Pattern 06, Founder / Team Humanization, played at Lovebird gravity — activist credibility without a sermon. The on-camera exception applies in full: she may speak in her own first person about her grandmother, and \"my grandmother was making oatmeal way before it was cool\" is her own documented, consumer-safe line. INTERNAL ONLY: the POV correction still binds — Christina is NOT a mom (her sister and cofounder is), so nothing in this brief may put a parenting first-person in her mouth, and the CAPTION stays brand voice in third person (\"Willa was her grandmother\"), never first. The failure mode is reverence, not nerves: a hushed, perfectly delivered heritage take reads like a commercial for a bank. Cast the plainest take."},
      {type:"COMPETITOR", text:"INTERNAL ONLY — no competitor is named, shown, implied, or defocused-but-identifiable in a single frame of this piece, and the whole-oat proof line uses the approved comparison pattern (\"most oat milks\") with no brand attached. The shoot constraints exist for the same reason and the auditor should check them line by line: no retailer signage, no store counts, no state counts, no distributor references, no growth figures, no award-résumé positioning, and none of the investor-facing framing from the founder talk — the \"they come for the label, they stay for the taste\" line is locked investor-only and must never surface as a caption or overlay. Also barred: any dairy contrast. The category's own weekend framing was explicitly anti-swap-shaming, and a brief that answers heritage by putting down what somebody's grandmother poured would invert the whole point."},
      {type:"TREND", text:"LANE DISCIPLINE — this brief owns heritage and origin, and it is the only brief in the AUG 24–30 set permitted to touch 1921. The whole-oat-groat proof is a SHARED point and the split is strict: AUG24-IG-R3 owns the whole-groat process story as a full field-to-glass editorial arc with the bran-and-germ tick overlay and the Aug 21 record as its audio bed, so R1 gets exactly ONE sentence of it — the groat in the jar, glossed in under ten words, then straight back to the dates. AUG24-TT-1 owns the seasonal-turnover argument (nothing about the carton changes for fall); this brief must never restate it. AUG24-TT-2 owns sugar and the added-sugar claim; R1 may state 1g from the oats as a spec but may not argue it. AUG24-IG-F1 owns household worth. Burned and unavailable per the corpus: the AUG 17 kitchen-versus-carton origin line, the AUG 10 hundred-years-between-the-bowl-and-the-carton line, and the AUG 17 \"not a lab, a kitchen\" overlay — all three are the obvious lazy landing spot for a heritage brief, and all three are spent."}
    ],
    hooks:[
      {text:"my grandmother was making oatmeal way before it was cool.", recommended:true},
      {text:"born 1921. launched 2021. the ingredient list never needed updating.", recommended:false},
      {text:"this is what oat milk looks like before anybody touches it.", recommended:false}
    ],
    caption:"four organic ingredients, 4g+ protein, 2g+ prebiotic fiber, and 1g of sugar that comes from the oats. none of that is new. 🌾\n\nChristina, in her kitchen, starting where Willa's starts: a jar of whole oat groats — bran, germ and all, the way steel-cut oats are. most oat milks filter that part out, the fiber and the protein with it, and process what's left into sugar. Willa's keeps the whole oat, which is why it pours rich instead of thin.\n\nWilla is the grandmother the company is named for. she fed people properly, and she noticed the spark in everyone who sat down at her table.\n\nborn 1921. launched 2021. the ingredient list never needed updating.\n\norganic whole grain oats, filtered water, organic vanilla extract, sea salt. certified organic, certified glyphosate-free, tested every lot. 🥛",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#oatgroats",
      "#realfoodpasseddown",
      "#motherfounded",
      "#womenowned",
      "#wbenc",
      "#plantmilk",
      "#cleaningredients",
      "#realfood"
    ],
    visual:"One kitchen, one morning, and a deliberate ratio: hands and ingredients hold roughly two-thirds of the runtime, Christina's face the other third. This is a heritage beat shot as a working kitchen, not a memorial — no sepia, no soft-focus nostalgia haze, no slow-motion anything. Vertical 9:16, 35mm equivalent, handheld with the operator's weight visible in the frame; one small breath of drift on every static shot so nothing reads as tripod-locked. Location: a real domestic kitchen with a wood or worn-stone counter, a window camera-left, and shooting scheduled for the 60–90 minutes after the light first clears the sill — hard morning sun rakes across the counter, dust visible in the beam, no bounce needed on the ingredient shots and a single warm bounce card just off-lens for anything with her face in it. Grade lands warm and bright, whites clean, contrast up — closer to a Fishwife product page than to a brand-heritage film. PROPS, exact: a clear glass jar of whole oat groats with the lid off (uncooked, unrolled — check on set that the kernels are visibly whole and not rolled oats, which is the single most likely continuity failure in this shoot), a heavy-bottomed pot, a wooden spoon, a small dish of sea salt, a bottle of vanilla extract, a pitcher of filtered water, and one carton of Willa's Original standing at the back of the counter, label forward and in focus, present from the first frame so the product never has to be 'introduced.' Nothing is styled into a flat-lay; things sit where a person put them. SHOT ORDER: (1) macro, groats pouring from the jar into an open palm, sun through the stream, sound of the kernels landing — this is the hero frame and it is the first thing the viewer sees; (2) Christina's hands only, tipping the palm of groats into the pot; (3) the first face beat, three-quarter profile at the counter, not to lens, talking while she works; (4) a straight-to-lens beat, waist-up, hands still, the only time she looks down the barrel; (5) macro of the four ingredients entering frame one at a time — oats, water, vanilla, salt — each set down by a hand, with the four names ticking on one at a time in a single cream bar — 'oats · water · vanilla · salt' — and no titles on the objects themselves; (6) she picks up the Willa's Original carton and turns it a quarter-turn so the ingredient list faces lens, thumb resting on it without tracing it; (7) end card. TYPOGRAPHY: navy ink (#202A44) on a translucent cream (#FAFAF7) bar, single lines only, never stacked more than two deep, entering with a straight cut and no animation. The two dates — 1921 and 2021 — are the ONLY elements set in purple (#A191B2), sized up, appearing one after the other with a full beat between them; that pair is the whole graphic idea of the piece and nothing else on screen is allowed to compete with it. No lower-third name super, no logo bug, no date-stamp graphic, no film grain, no archival photographs of any kind. She wears no visible logo and no jewellery that clatters on the counter. END CARD: hold on the pot and the carton side by side on the counter with her hand leaving frame, cream bar centered underneath in navy — 'The whole oat. Not the syrup.' — then a clean cut to black on the last frame with no button and no logo sting.",
    script:[
      {t:"0:00-0:03", vo:"my grandmother was making oatmeal way before it was cool.", onScreen:"my grandmother was making oatmeal way before it was cool."},
      {t:"0:03-0:07", vo:"this is where it still starts. whole oat groats — bran, germ and all, the way steel-cut oats are.", onScreen:"whole oat groats · bran and germ, still on"},
      {t:"0:07-0:11", vo:"most oat milks filter that part out — the fiber and the protein with it — and process what's left into sugar. we just don't.", onScreen:"the part most oat milks throw away"},
      {t:"0:11-0:15", vo:"oats. water. vanilla. salt. that's the whole thing.", onScreen:"oats · water · vanilla · salt"},
      {t:"0:15-0:19", vo:"Willa was born in 1921. we launched in 2021.", onScreen:"1921        2021"},
      {t:"0:19-0:22", vo:"the ingredient list never needed updating.", onScreen:"the ingredient list never needed updating"},
      {t:"0:22-0:25", vo:"she fed people properly. we just kept doing it.", onScreen:"The whole oat. Not the syrup."}
    ],
    audio:"No trending sound, original audio — this is a deliberate exception and the brief should be flagged if anyone tries to attach a trend audio to it, because a borrowed sound would date a piece whose entire argument is that it isn't dated. Sync sound, Christina live to camera: lav under the collar plus a shotgun overhead, and the kitchen stays in the mix rather than being gated out — the groats hitting the palm at 0:00-0:03, the jar set down on wood, the pot, the tap. Those three seconds of real kernel sound are the best asset in the piece; record a dedicated foley pass of the pour at 96kHz and lay it under the macro at full weight. Music: a sparse acoustic bed, one instrument, no drums, no vocal, entering only at 0:07 after the groat gloss and sitting far under her voice; cut it to silence entirely under the 1921 / 2021 beat so the two dates land in room tone, then let it return for the last line and stop flat on the final frame — no swell, no button, no whoosh. Delivery direction is the whole job: talking-while-working volume, half a beat slower than feels right, zero pitch energy, no reverence. If a take sounds like a heritage film, use a different take. (Lane note: AUG24-IG-R3 carries the licensed Aug 21 record as its bed — this brief must not also use it.)",
    duration:"0:25",
    cta:{soft:"send this to whoever taught you to cook.", medium:"pour Willa's Original — four organic ingredients, made from the whole oat.", strong:"look for Willa's Original in the refrigerated plant-milk set: 4 organic ingredients, 4g+ protein, 2g+ prebiotic fiber, 1g sugar from the oats, certified organic and certified glyphosate-free, tested every lot."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG24-TT-3",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Barista",
    dnaPattern:"meme-payload",
    timing:"Wed Aug 26 · 7pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"hot coffee is a lie detector.\" — the two-clip pour test",
    intel:[
      {type:"PULSE", text:"CP-1: the \"aura, laura\" two-clip rhyme was documented live and rising in a TikTok trend roundup dated Aug 19, 2026. The mechanic is strict and unusually easy to execute: clip one shows an action done impressively while the audio says \"aura\"; a hard cut on the rhyming word drops clip two, the exact same action failing, text reading \"LAURA.\" Text overlay only, no voiceover, no sound design beyond the audio cue itself. Two things make it worth Willa's time this week — it is a genuinely fresh format (nothing adjacent has run in the last six weeks of briefs; the bob/one-word-four-times and repeat-twice-reveal-third formats are burned from AUG 17 and this shares no structure with either), and the roundup itself names the brand-adaptable variants as expert-vs-beginner and expectation-vs-reality, which is exactly a side-by-side pour test. The word is also at a national peak independent of this format: separate coverage dated Aug 20, 2026 documents \"aura farming\" and public aura battles spilling off the app into plazas, so the vocabulary needs no explaining to the viewer. INTERNAL ONLY: the two-clip structure, the audio cue timing and the fact that this is the week's required meme ride are production direction — nothing about \"riding a trend,\" the format's name, or its rising velocity may appear in a caption, an overlay or a script line. The post is a pour test that happens to be cut to a sound. Sources: SocialBee TikTok trend roundup, Aug 19, 2026 (https://socialbee.com/blog/tiktok-trends/); HOLA! 'What is an Aura Battle?', Aug 20, 2026 (https://www.hola.com/us/lifestyle/20260820919193/aura-battle-what-is-farming-aura/)."},
      {type:"AUDIENCE", text:"Oat milk failing in hot coffee is not a hypothetical the brief has to teach — it is already one of the category's most-searched consumer complaints, with standing TikTok discover pages devoted to oat milk separating in coffee and to curdled oat milk generally (permanent, undated reference pages). The drinker has watched her cup go mottled and has blamed herself: wrong temperature, poured too fast, coffee too hot, cheap beans. The relief on offer is that it was never her technique. She also already knows, vaguely, that the oat milks that never split are doing it with something added — she just doesn't have the word for it. Giving her both halves in twelve seconds, without a lecture and without asking her to read anything, is the entire persuasion. Register accordingly: Olipop cheeky, the joke pointed at the category, never at the person who has been quietly re-pouring her coffee for two years. INTERNAL ONLY: never frame this as a mistake the viewer has been making, and never use the word \"curdle\" on screen or in caption — it reads as spoiled dairy and drags the whole piece somewhere unappetizing. On screen the word is flecks; in caption it is flecks or splits. Sources (permanent reference pages): https://www.tiktok.com/discover/oat-milk-separating-coffee ; https://www.tiktok.com/discover/curdled-oat-milk"},
      {type:"COMPETITOR", text:"INTERNAL ONLY — the reason the average barista oat milk performs is well understood inside the category and must never be spoken as an accusation on camera: gellan and other gums for body, rapeseed (canola) oil for mouthfeel and heat stability, and a sugar load from processed oat syrup for sweetness and crema. Willa's Barista clears all three differently — no gums, no rapeseed, no canola, 3g sugar from organic coconut sugar, and the whole oat groat carrying the body. The nuance the team must hold and never volunteer in consumer copy: Barista does contain organic high-oleic sunflower oil, which is structurally different from industrial seed oils but is still an oil, so any claim that this SKU contains no seed oils is factually wrong and is a kill-shot if it reaches a caption. The precise, defensible claim set for this brief is: no gums · no rapeseed · no canola · 3g sugar · about half the sugar of other barista oat milks. No brand name, no competitor carton, no readable label on the LAURA side — approved comparison pattern only, \"the average barista oat milk.\""},
      {type:"TREND", text:"LANE DISCIPLINE for the AUG 24–30 slate. This brief owns taste and performance in coffee, full stop — it is the only Barista slot of the week and the only place the coffee occasion is argued on behaviour rather than ingredients. TT-1 owns the no-seasonal-SKU argument against the fall menu turnover and is the week's at-shelf lead; nothing here may reference the season, a syrup, a menu, or a fall flavour. TT-2 owns sugar and the added-sugar labelling claim; this brief may state 3g as a performance footnote but may not argue sugar, and may not use the word \"added.\" TT-5 owns the protein-claim arms race. The nutrition-label argument — counting lines, flipping the carton, reading the ingredient list on camera — is rested this week and is explicitly out of bounds here even though the flavour invites it; per the standing rule, Barista is Willa's most processed SKU and must never lead ingredient-comparison content. INTERNAL ONLY: the whole lane map, the latte cap (≤1 latte brief per 2 weeks, last run AUG 03) and the reason this format was permitted through it stay engine-side."}
    ],
    hooks:[
      {text:"one of these pours has aura. the other one is laura.", recommended:true},
      {text:"hot coffee is a lie detector — two pours, three seconds, one survivor.", recommended:false},
      {text:"no gums. no rapeseed oil. and it still doesn't fleck.", recommended:false},
      {text:"same cup, same shot, same pour. watch what the second one does.", recommended:false}
    ],
    caption:"Willa's Barista goes into hot espresso and comes out one drink. ☕\n\nhot coffee is a lie detector. it finds the shortcut in about three seconds — the swirl breaks up, the flecks come to the surface, and what's in the cup is two things pretending to be one.\n\nthe usual way out of that is gums and rapeseed oil. Willa's Barista doesn't carry either — the whole oat groat is doing the work instead. and at 3g of sugar, it pours about half what other barista oat milks do.\n\nit behaves because of what's in it. not because of a stabilizer added to make it behave.\n\nthe oat milk your coffee deserves.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#baristaoatmilk",
      "#oatmilklatte",
      "#coffeetok",
      "#nogums",
      "#norapeseedoil",
      "#organicoatmilk",
      "#homecafe",
      "#latteart",
      "#plantmilk",
      "#auralaura"
    ],
    visual:"Two clips, one end card, and the entire piece lives or dies on the two clips being visually identical — shoot them back to back without moving the camera, the cup, the light or the lens between takes, and mark the cup's position on the counter with tape before the first roll. Setup: a warm home-cafe counter, pale wood, cream wall, a single window behind camera-right throwing soft directional morning light across the surface; no practicals, no coloured gels, no moody cafe darkness — the whole point is that you can see the surface of the drink clearly. Camera is locked on a tripod, 45-degree three-quarter angle looking down into the cup, framed tight enough that the crema surface fills roughly half the vertical frame, shot at 60fps so the pour can be eased to 0.8x in the edit without smearing. The cup is a plain white ceramic 6oz tulip, no logo, no pattern, sitting on a bare counter — nothing else in frame but the cup, the pitcher lip entering top-left, and a hand. CLIP ONE (AURA): fresh double shot in the cup, crema intact. A stainless pitcher of steamed Willa's Barista enters top-left, the pour starts high and thin, then drops close and opens — the white folds into the brown in one continuous ribbon, the surface stays a single unbroken caramel-and-cream field, and a clean heart lands and sits there. Overlay: the single word AURA, centred, huge, brand navy #202A44 in the house sans, set at roughly 22% of frame height, hitting on the audio's first word and holding for the full clip. The Willa's Barista carton sits just at the back edge of frame, label forward, slightly soft in the shallow depth of field — present, never hero, never picked up. HARD CUT on the rhyme, no transition, no whip, no crossfade — one frame to the next. CLIP TWO (LAURA): identical frame, identical cup position, identical fresh double shot, identical pour height and speed, the same hand and the same pitcher. This time the average barista oat milk goes in and the surface immediately goes wrong — the foam is big-bubbled and grey rather than glossy, the white breaks into flecks on contact, the ribbon won't hold a line, and the surface finishes mottled and separated with a rim of pale specks against the cup wall. Let it run three full seconds past the point where it's clearly failed; the extra beat is the joke. Overlay: LAURA, identical position, identical size, identical navy, hitting on the audio's second word. CRITICAL GUARDRAIL — there is NO carton at the back edge of this frame, and the milk for clip two is decanted into an unmarked stainless pitcher before the shoot so no label, cap colour, logo, silhouette or brand mark is on screen at any point; nobody says or types a brand name; if a producer asks what it is, the only answer that ever leaves the building is 'the average barista oat milk.' MICRO-BEAT: a half-second return to the AURA cup — a bar spoon lifts and the surface closes back over itself, still one colour, still one drink. END CARD: hard cut to a flat cream card, #FAFAF7 ground, brand navy #202A44 type, no motion, no whoosh, no sting. Line one, large: 'Latte art. No rapeseed oil.' Line two, half the size, set in the Ingredients green #75C596 — the single spend of colour in the entire piece — 'no gums · no rapeseed oil · 3g sugar'. Willa's wordmark bottom-centre, small. Hold 2 seconds, out. No captions burned over the pours beyond the two format words, no lower thirds, no arrows, no red circles, no split-screen — the format is sequential, never side by side, and putting the two pours in one frame at the same time breaks the joke and the trend both.",
    script:[
      {t:"0:00-0:03", vo:"No voiceover anywhere in this piece. Audio cue only — the format's sound lands its first word here and the cut is timed to it. Under the cue, keep the real sound of the pour audible: the pitcher, the milk hitting crema.", onScreen:"AURA"},
      {t:"0:03-0:06", vo:"Still no voice. Let the pour finish clean and hold one silent beat on the finished surface before the cut — the eye needs to register that it stayed one colour.", onScreen:"AURA (holding, centred, unchanged)"},
      {t:"0:06-0:09", vo:"Hard cut on the rhyming word. Nothing added on the audio bed — no whip, no riser, no transition sound. The rhyme is the transition.", onScreen:"LAURA"},
      {t:"0:09-0:13", vo:"No voice. Real pour audio only — and it sounds different, thinner and flatter than the first, which is worth keeping. Let the failure run three seconds past the point where it's obvious.", onScreen:"LAURA (holding) — small line, lower third, appears at 0:11: the average barista oat milk"},
      {t:"0:13-0:16", vo:"No voice. Cut back to the AURA cup. Bar spoon lifts, the surface closes over itself. One clean spoon sound.", onScreen:"it closes back up. no gum needed."},
      {t:"0:16-0:19", vo:"No voice. Audio bed drops out entirely for one beat before the card — the silence is what makes the card land.", onScreen:"no gums. no rapeseed oil."},
      {t:"0:19-0:22", vo:"Silent end card. No music sting, no wordmark whoosh, no outro animation.", onScreen:"Latte art. No rapeseed oil.  /  no gums · no rapeseed oil · 3g sugar  /  Willa's"}
    ],
    audio:"Ride the format's own audio — the two-word 'aura … laura' cue documented live and rising in the SocialBee TikTok trend roundup dated Aug 19, 2026 (https://socialbee.com/blog/tiktok-trends/). Pull the exact sound from the trend's own page inside the TikTok app on shoot day and cut to it natively rather than recreating or re-recording it; a rebuilt version loses the algorithmic credit that is half the reason to run this format at all, and the sound is moving fast enough that the editor should confirm it is still the top-used version the morning of the ship. NO voiceover anywhere in the piece — this is a text-overlay format and a narrator would flatten the joke. NO music bed under the cue. Keep the two pours' real diegetic audio up underneath — the pitcher, the milk hitting the crema, the bar spoon — because the failing pour genuinely sounds thinner than the clean one and that difference does free work. Full audio dropout for one beat before the end card. If the sound has cooled by Wed Aug 26, the fallback is original audio only: the two pours at full level, hard cut, no music, no VO, and the two words as silent overlays — the piece still works, it just travels less far.",
    duration:"0:22",
    cta:{soft:"send this to the person who keeps blaming their coffee.", medium:"pour Willa's Barista into your next espresso and watch the surface stay one colour.", strong:"Willa's Barista — no gums, no rapeseed oil, 3g sugar. the oat milk your coffee deserves."},
    benefitShorthandId:"BS-7"
  },
  {
    id:"AUG24-TT-2",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Thu Aug 27 · 9am",
    priority:"BIG SWING",
    rideNow:false,
    concept:"\"our sugar number has nothing standing behind it.\" — one gram, from the oats, no workaround",
    intel:[
      {type:"TREND", text:"T-5: A class action lawsuit filed Aug 12, 2026 in California — first widely reported Aug 18, 2026 — targets a national hydration brand's \"sugar free\" sticks, which the complaint says carry 4–5g of allulose per serving — well above the 0.5g ceiling a sugar-free claim is allowed to sit on. A trade analysis published Aug 21, 2026 documented the same ingredient's fast rise across clean-label formulation as the cheapest available route to a low-sugar claim without changing how a product tastes. ACCURACY CORRECTION — READ THIS BEFORE ANY LINE GETS REWRITTEN: the slate's conceptSeed described the mechanism as 'counted inside Total Sugars but exempted from Added Sugars.' That is the plaintiff's reading of a 2016 FDA guidance, not the operative practice, and shipping it as stated fact would be a fabricated regulatory claim — the one failure mode this engine cannot survive. Verified position: FDA has exercised enforcement discretion since 2019 allowing allulose to be excluded from BOTH the Total Sugars and Added Sugars figures, while still requiring it inside Total Carbohydrate and inside the ingredient list. It is guidance, not a rule change — which is exactly why the claim space is contested right now. Every consumer line in this brief is written against the verified version only, and it is phrased the same way twice: it is in the ingredient list, it is not in the number. INTERNAL ONLY: no brand, no product, no plaintiff, no lawsuit, no court, no filing, no dollar figure and no trade publication may appear in the hook, the script, any overlay, the caption or any caption variant. The audience-outsider rule kills trade-press framing on sight, and the guardrail is absolute: this is a labelling rule, not a case."},
      {type:"TREND", text:"T-6: USDA announced $7.5M in Cold Chain Grants for the Emergency Food Assistance Program on Aug 17, 2026, and titled the announcement around expanding access to \"real food\" — whole, fresh and minimally processed — rather than around calorie volume. The content that matters here is vocabulary, not money: whole-food-versus-processed has moved from an advocacy phrase into the neutral language of a routine federal grant notice. That is the permission structure behind this brief's flat, unhedged register. Willa's does not have to argue that reading a sugar number is a reasonable thing to care about — that argument is already won, so the brief skips it entirely and goes straight to the number. INTERNAL ONLY: never cite USDA, the grant, a dollar amount or the program on camera or in caption. Related consumer-copy call made on set: the script says \"the rules\" rather than naming a federal agency — naming a regulator tips a calm labelling explainer into a political one, and Willa's is not litigating Washington. This signal sets the tone of the delivery and nothing else. It also anchors the calm: the piece reads as a brand stating a fact in a settled conversation, not as a brand picking a fight."},
      {type:"COMPETITOR", text:"Category read (INTERNAL): the Aug 21, 2026 trade analysis is the useful part of the week, and it is a formulation story, not a news story. Allulose is spreading through exactly the shelf-set Willa's competes against because it is the only sweetener that delivers sugar-like performance while legally staying out of the sugar figure — which means over the next two to three quarters a growing share of \"low sugar\" and \"zero sugar\" front-of-pack claims on the cold case will sit on top of a sweetener the shopper cannot see in the number. Willa's structural advantage is that it has no equivalent to disclose: 1g, from the oats, and the whole workaround was never built. That is a durable position worth restating quarterly, and it gets stronger the more the category adopts. LANE DISCIPLINE: this brief owns sugar and the sugar claim for the AUG 24–30 week and no sibling brief may argue it. IG-R2 is permitted to TICK '1g sugar from the oats' inside its per-glass nutrient checklist but may not explain, defend or contextualise the number. TT-5 owns the protein-claim arms race and must not extend that argument to sweeteners. TT-1 owns the no-seasonal-SKU argument and must not reach for a syrup-and-sugar critique to get there. INTERNAL ONLY: none of this reaches copy."},
      {type:"AUDIENCE", text:"The shopper reading a sugar number is not doing chemistry — she is doing arithmetic, and she has been trained for a decade to trust that one figure as the fastest honest read on a package. The unsettling thing about this week's signal is not that a sweetener exists; it is that the single number she uses as a shortcut can be technically correct and still incomplete. That is a quiet, specific, non-hysterical anxiety, and it must be met at exactly the same volume it arrives at. The persuasion here is arithmetic, not outrage: one gram, from the oats, nothing behind it. Which is why the guardrails hold the register down — no accusation, no naming, no 'they're lying to you', no toxic, no chemicals, no scare cut, no red arrow. The lead-with-the-solution rule applies at full force: the carton is in hand and the number is spoken by beat two, before the mechanism is ever explained, because the audience will not stay through a setup to hear the answer. And Willa's is 1g — it is NOT sugar-free and may never be described that way, in any surface, in any variant, including by implication."}
    ],
    hooks:[
      {text:"a sugar that doesn't have to show up in the sugar number. that's allowed.", recommended:true},
      {text:"we have one gram of sugar. nothing is standing behind it.", recommended:false},
      {text:"the number on the label is the number in the carton. that shouldn't be a flex.", recommended:false}
    ],
    caption:"One gram of sugar, and it came from the oats. Nothing added. 🌾\n\nHere's the part worth knowing. There's a sweetener called allulose — a rare sugar used to sweeten things — and the rules currently let it sit out of the sugar number on a label. It's still printed in the ingredient list. It just doesn't have to be counted.\n\nWhich means a sugar claim on the front of a package can be completely true and still not tell you what you're drinking.\n\nWilla's never had to build around that. Willa's Original is four things: organic whole grain oats, filtered water, organic vanilla extract, sea salt. We use the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled — so the small sweetness that's in there arrived with the grain, not after it.\n\nThat's the whole reason our sugar number has nothing standing behind it. One gram, and you can trace where it came from.\n\n4g+ protein. 2g+ prebiotic fiber. 1g sugar. Read the list.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#1gsugar",
      "#lowsugar",
      "#nosugaradded",
      "#wholeoat",
      "#cleaningredients",
      "#labelcheck",
      "#realfood",
      "#plantmilk",
      "#fouringredients"
    ],
    visual:"Reserved founder-activist slot one, and it is deliberately built as the opposite shape to a counter-choreography piece — there is no row of objects, no set-down rhythm, no props arriving one per beat. One person, one carton, one number. Location is a real lived-in kitchen shot at the table rather than at the counter: Christina seated, elbows down, a plain cream wall and a sliver of window behind her falling out of focus. Light is soft morning key from camera-right through a sheer, bounced back with a white card at camera-left so there is no hard shadow on her face — this piece is calm, and hard light would read as accusation. Lens is longer and closer than the house wide: 50–85mm equivalent, chest-up, shallow background, so the frame has no room for anything except her and what she is holding. Camera is on sticks with a very slight handheld breathe added in post — alive, never shaky. Palette is near-white (#FAFAF7) ground, navy ink (#202A44) for every line of type, and creamy blue (#73B2C9) spent EXACTLY ONCE, on the single overlay about the number. Blocking: cold open on her already mid-thought, hands empty, nothing on screen but the hook line — no title card, no establishing shot, no B-roll runway, no logo bumper. At the top of beat two her right hand lifts Willa's Original into frame from below the table line, label forward at chest height, and it does not leave frame again for the rest of the video. That is the entire visual engine of the piece: the carton enters at second three and stays. She never turns it, never spins it, never points at the back of it, and the camera never pushes in on the ingredient list — no flip, no scan, no line-counting, no macro of the label, no QR code, no certification mark, no seal, no badge, no mark of any kind on screen at any point. Type treatment is lower-third only, one line at a time, left-aligned, never stacked more than two deep, set in the house navy at a size a phone reads at arm's length; each line cuts in clean with no animation, no kinetic type, no highlighter swipe. The single creamy-blue overlay lands on the '1g sugar · from the oats' beat and holds through it, then leaves before she finishes speaking — it is the only colour in the film and it should feel like the one thing underlined in a page of notes. There is exactly one camera move in the whole piece: a slow, almost invisible 2-second push on the beat about the whole oat, ending with the carton and her hands filling the lower third. No headline screenshots, no document B-roll, no court or agency imagery, no red circles, no arrows, no split screens, no competitor packaging — not blurred, not cropped, not out of focus in the background, not on a shelf behind her. End card is a hard cut to flat cream, navy type, no motion and no sting: '1 gram of sugar. zero added.' held 1.5 seconds with the Willa's wordmark small at bottom-centre. Leave a full beat of silence before her last line — the pause is the point, and an editor who tightens it will kill the piece.",
    script:[
      {t:"0:00-0:03", vo:"there's a sugar that doesn't have to show up in the sugar number.", onScreen:"a sugar that isn't counted as sugar."},
      {t:"0:03-0:07", vo:"Willa's has one gram. it came from the oats. nothing added, and nothing standing behind it.", onScreen:"1g sugar · from the oats"},
      {t:"0:07-0:12", vo:"the one I mean is allulose — a rare sugar used to sweeten things. the rules let it sit out of the sugar count. it's still printed in the ingredient list. it just isn't in the number.", onScreen:"in the ingredient list. not in the number."},
      {t:"0:12-0:16", vo:"so a sugar claim on the front of a package can be completely true, and still not tell you what you're drinking.", onScreen:"true. and still not the whole answer."},
      {t:"0:16-0:20", vo:"we never had to build around that. the whole oat goes in, so the little bit of sweetness that's there arrived with the grain.", onScreen:"the whole oat. nothing added to sweeten it."},
      {t:"0:20-0:24", vo:"our sugar number has nothing standing behind it.", onScreen:"1 gram of sugar. zero added."}
    ],
    audio:"No trending sound — original audio, founder sync sound. Christina is on camera, so the voice is hers, live-recorded, close-mic'd on a lav hidden under the collar with room tone kept in rather than gated out; the small sounds of a real kitchen behind her are the texture. The only added element is one sustained low string that enters under the whole-oat beat at 0:16 and resolves on the end card — no drums, no sting, no whoosh, no bass drop, no sped-up edit, no caption-read-aloud energy, and nothing that reads as a reveal. The carton's lift into frame at 0:03 gets a real, audible pick-up sound; do not clean it out. Editor's note: leave the full beat of silence before the closing line — the piece is 24 seconds and the pause is one of them.",
    duration:"0:24",
    cta:{soft:"save this for the next time a sugar number looks too good.", medium:"pour Willa's Original — 1g of sugar, and it came from the oats.", strong:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 1g sugar from the oats, 4g+ protein, 2g+ prebiotic fiber. Read the list."},
    benefitShorthandId:"BS-3"
  },
  {
    id:"AUG24-PIN-1",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Chocolate",
    dnaPattern:"viral-recipe-remix",
    timing:"Thu Aug 27 · 11am",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the spice in this one is a spice.\" — dairy-free spiced hot chocolate pin",
    intel:[
      {type:"TREND", text:"T-1: two national coffee menus flipped to fall six days apart — a five-item pumpkin range plus an entirely new tiramisu beverage line went live Aug 19, 2026, and the second chain's fall lineup lands Aug 25, 2026. In one week the whole warm-drink occasion moved from cold-and-simple to syrup-and-spice, and the grocery shelf resets orange behind it. That is a search event as much as a menu event: the moment the boards turn, people start typing 'spiced hot chocolate' and 'dairy free fall drinks' into Pinterest, and Pinterest indexes on a lag, which is why this pin publishes Thu Aug 27 rather than waiting for September. Willa's has the only honest home version — the spice is an actual spice and the sweetness is already in the carton. INTERNAL ONLY: no chain name, no menu-item name, no three-letter acronym for a seasonal drink, and no pumpkin anywhere in the pin, the title, the description or the styling. The consumer copy references 'the menu board' generically and never points at anyone."},
      {type:"AUDIENCE", text:"Pinterest is a search surface with a seasonal lead time, not a feed — saves on a fall-drink pin compound for eight to ten weeks past the day it goes up, which makes late August the highest-leverage publish window of the quarter for anything cozy. The searcher's intent is specific: they want the coffee-shop feeling at home and they want it in one pan with things already in the cupboard. That is why the recipe is deliberately five things and four minutes with no sweetener step — a recipe that needs a syrup you have to buy loses to one that doesn't. This is also the week's only warm-drink slot and the only Chocolate slot, so the indulgent-remade-clean lane sits here and nowhere else. INTERNAL ONLY: the Pinterest-lead-time and save-decay reasoning is planning logic, never copy — the description reads like a recipe, not like a media plan."},
      {type:"COMPETITOR", text:"Seasonal warm-drink builds across the category all arrive the same way: a syrup, a sauce, or a powdered spice blend bolted onto a neutral base, with the sweetness sold separately from the flavor. Nobody in chocolate plant milk is briefing a fall drink at all — chocolate SKUs get shelved as either a kids' cup or a sugar-forward treat. Willa's Chocolate is the one carrying real cacao, organic coconut sugar instead of cane, five organic ingredients and a Good Food Awards Best Beverage win (15th annual), which lets it be the base AND the sweetener in the same pour. INTERNAL ONLY: no brand named in the title, description, overlays or hashtags; the contrast is expressed as 'nothing gets pumped into it,' never as a comparison to a company. Approved framing if the contrast ever needs stating is 'vs. the average chocolate oat milk.'"},
      {type:"TREND", text:"LANE DISCIPLINE — T-1 is shared with AUG24-TT-1, which owns the ARGUMENT: the in-store walk, the shelf going orange, and the point that the carton needs no autumn edition because it is the same four ingredients in September as in June. PIN-1 must never make that argument. This brief owns the make-it-at-home fall drink and nothing else: a recipe, a mug, and one text joke. The four-ingredients / no-seasonal-version proof point belongs to TT-1 and is not to appear in this pin's title, description or overlays. The whole-oat-not-oat-syrup stinger appears here only as the small base kicker under the photograph — a stinger, not a thesis. AUG24-PIN-2 owns the other Pinterest slot (game-morning breakfast, Kids, Fri Aug 28), so this pin stays entirely off breakfast, off crowds and off Saturday."}
    ],
    hooks:[
      {text:"the spice in this one is a spice — dairy-free spiced hot chocolate", recommended:true},
      {text:"let's make spiced hot chocolate (dairy-free!)", recommended:false},
      {text:"five things go in the pan. a syrup isn't one of them.", recommended:false},
      {text:"one mug, one cinnamon stick, nothing gets pumped into it", recommended:false}
    ],
    caption:"Late August turns everything spiced and orange, and the best version of it is a mug you make in four minutes on your own stove. 🍫🍂 One cup of chocolate oat milk, a cinnamon stick, a wide strip of orange peel and enough heat to steam it. Nothing gets pumped into it.\n\nWilla's Organic Chocolate Oat Milk is made with real cacao, organic coconut sugar and five simple organic ingredients for a rich, creamy cup with 50% less sugar than the chocolate milk most of us grew up on — sweet enough that this recipe doesn't need a sweetener of its own. It won Best Beverage at the Good Food Awards. 🥛\n\nThe spice in this one is a spice.\n\nIngredients\n- 1 cup Willa's Organic Chocolate Oat Milk\n- 1 cinnamon stick (or ¼ tsp ground cinnamon)\n- 2 pinches of nutmeg, freshly grated, plus more to finish\n- 1 wide strip of orange peel\n- a pinch of sea salt\n- whipped canned coconut cream to top, if you're making it a whole thing\n\nWarm it all together over low heat for 4 minutes — steaming, never boiling. Pull the peel and the cinnamon stick, pour into the heaviest mug you own, and grate more nutmeg over the top.",
    hashtags:[
      "#willas",
      "#chocolateoatmilk",
      "#dairyfreehotchocolate",
      "#spicedhotchocolate",
      "#hotchocolaterecipe",
      "#dairyfreerecipes",
      "#oatmilkrecipes",
      "#realcacao",
      "#cozydrinks",
      "#fallrecipes",
      "#cleaningredients"
    ],
    visual:"Vertical 2:3 pin, 1000×1500, built on ONE still — no grid, no step sequence, no recipe card. Hero frame: a heavy stoneware mug, unglazed clay or warm cream, three-quarters full of dark spiced cocoa, sitting on a bare wood counter with visible grain. Steam is the actual subject — shoot in the first two hours of morning light with a hard side-window source at camera left and a black card just off camera right, so the steam reads bright against the shadowed side of the frame. Do not fake it: heat the drink to just-steaming, shoot fast, reheat between takes; no glycerin, no steam wand, nothing added in post. A cinnamon stick rests against the mug at four o'clock and a second one lies on the counter; a small pinch bowl of freshly grated nutmeg sits front-left slightly out of focus, with a microplane and a wide curl of orange peel beside it, so the frame explains its own ingredient list without a single callout. Grate fresh nutmeg over the surface right before the shutter so there is visible flecking on the cocoa. If a topping is used it is whipped canned coconut cream, spooned not piped — one soft mound, a dusting of cacao, nothing else. NO DAIRY ANYWHERE ON SET: no butter, no cream, no aerosol whip, no marshmallow, no milk jug in the background of any frame. Camera: 50mm, straight-on at mug height, f/2.0, mug set slightly camera-left of centre so the type has clean air above it. Palette is warm cream, deep cacao brown, cinnamon rust, and one accent of green (#75C596); type is navy (#202A44). TOTAL COPY ON THE PIN IS TWO LINES. Upper third, large and set tight in navy over the cream negative space: 'THE SPICE IN THIS ONE IS A SPICE.' — that line is the whole joke and the whole pin, so give it room, a thin green rule beneath it, and nothing to compete with. Bottom edge, small mono kicker: 'the whole oat. not the syrup.' That is it — no ingredient stack, no numbered steps, no badge cluster, no arrows, no save-this sticker. Fishwife / Graza restraint: confident type over one good photograph, food does the arguing. Willa's Organic Chocolate Oat Milk carton stands at frame right, label forward, cropped by the frame edge so roughly two-thirds of it is visible and it occupies about a fifth of the frame height — high enough that a screenshot of the top two-thirds still contains it. Shoot two alternates: one from 20 degrees overhead with mug, pinch bowl and carton in a loose triangle; one with a hand wrapped around the mug lifting it an inch off the counter so the steam pulls with it. Hands only — no talent, no face, plain neutral knit sleeve. Grab a horizontal safety of every setup for the IG crop. No filters, no orange grade, no autumn-leaf props, no plaid, no gourds, no jack-o'-lanterns — the season lives in the spices and the light, never in the styling.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save it for the first cold morning.", medium:"the cocoa is one ingredient — Willa's Organic Chocolate Oat Milk, warmed with real spices.", strong:"Willa's Organic Chocolate Oat Milk: real cacao, five simple organic ingredients, organic coconut sugar instead of cane, 50% less sugar — Good Food Awards Best Beverage."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG24-IG-R2",
    platform:"Instagram Reel",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Multi",
    dnaPattern:"on-pack-checklist",
    timing:"Thu Aug 27 · 7pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"one person's plate changed. the whole fridge followed.\" — a four-tick checklist for the glass that has to earn its spot on a full table",
    intel:[
      {type:"TREND", text:"T-7 — new consumer survey data reported Aug 19, 2026 found roughly 60% of GLP-1 users are buying less food overall, about 30% are trading up to more expensive items, and about 70% say the medication changed what the rest of their household eats, not just their own plate. More than 80% of people who stop keep at least some of the dietary changes; baked goods and salty snacks are the categories most likely to rebound within one to three months. Separate trade analysis dated Aug 21, 2026 found searches for GLP-1 safety concerns spiked 100% after a UK regulator disclosed adverse-event reports, but consultants read the safety story as low cut-through next to cost and access — so the buying shift toward smaller portions and nutrient-dense picks holds regardless of the headline cycle. Strategic read: the addressable buyer is no longer one person on a medication, it's the shared fridge, which turns nutrient-dense breakfast into a household default rather than a personal regimen. INTERNAL ONLY: not one of these numbers reaches consumer copy — no 70%, no 60%, no 80%, no survey, no trade publication, no 'new data shows.' The audience-outsider rule kills industry stats as caption hooks. The consumer version of this insight is a plain, unstatistical observation: a lot of kitchens are eating differently this year, and the food that's left has to be worth the room it takes. Also internal: the safety-search spike is context for WHY the tone must be steady and non-promotional this week; it is never referenced, never rebutted, never hinted at."},
      {type:"PULSE", text:"CP-5 — 'sardinemaxxing,' the single-ingredient obsession, rose 100% between late July and early August 2026 and the backlash arrived with it; trade coverage dated Aug 17, 2026 — citing wellness brand Zoe and general nutrition guidance — criticises the whole hero-ingredient pattern for tunnel-visioning on one food while starving out everything a real diet needs, landing on the line that no single ingredient makes up for a balanced diet. The usable part is behavioural, not nutritional: the internet is now actively mocking the practice of picking one food and maximising it, which opens the door for the abundance posture instead of the restriction one. This brief carries that backlash structurally and never names it — the full breakfast stays physically in frame for the entire runtime, and the closing line concedes the glass is not the meal. INTERNAL ONLY: never say sardine, never say maxxing, never say backlash, never reference a trend at all. The correction is the staging, not the copy. This also hard-blocks any read of Willa's as a meal replacement, which is a compliance requirement on a GLP-1-adjacent brief, not a stylistic preference."},
      {type:"AUDIENCE", text:"The register is the whole risk on this one. Humor Pattern 04, Taboo-as-Normal, run at Willa's calibration — aunt at the kitchen table, not dorm-room comedy, directness dialled down about 30%. The taboo being normalised is that a medication quietly rewrote what a whole household eats and nobody says it out loud at the table. Willa's says it once, flatly, in about a dozen words with the mechanism glossed ('GLP-1 medicines work on the hormone that tells your body it's full'), then moves straight back to the glass. The tonal failure mode is sympathy: the second this sounds like it is addressing a patient rather than a household, it reads as a supplement ad and Christina will kill it. Christina stays off camera per the on-camera policy — this is a hands-and-product checklist and the founder's three reserved slots are spent on TT-2 and IG-R1 this week. Voiceover default is warm narrative brand voice, one person, unhurried, no pitch energy."},
      {type:"AUDIENCE", text:"LANE DISCIPLINE, check line by line before this ships. This brief owns exactly one thing: nutrient density inside a single glass — 4g+ protein, 2g+ prebiotic fiber, 1g of sugar from the oats, four ingredients. AUG24-IG-F1 owns household worth and versatility (one carton across a week of mornings) — do not argue uses-per-carton, do not run a 'works for everyone' versatility line, and do not put a week of occasions on screen. AUG24-TT-5 owns the protein-claim arms race — do not critique how the category bolts protein numbers onto things, do not compare Willa's protein to a named or implied competitor's, and do not run a category-critique beat at all. AUG24-TT-2 owns sugar and the added-sugar labelling gap — the 1g here is a tick on a checklist, never an argument. HARD GUARDRAILS, non-negotiable: no weight, no weight loss, no calories, no portion size as a goal, no appetite suppression as an aspiration, no 'on it' or 'off it,' no drug brand names, no before-and-after bodies, no dosing, no clinical language. Willa's is never framed as a meal replacement, a supplement, a medical product or a nutrition plan. Refer to the on-pack list only as 'the label' or 'the ingredient list' — the industry word for it is banned in every field of this brief."}
    ],
    hooks:[
      {text:"four ticks on one glass — and it's still not the whole breakfast.", recommended:true},
      {text:"one person's plate changed. the whole fridge followed.", recommended:false},
      {text:"if there's room for one thing at breakfast, here's what it should be carrying.", recommended:false}
    ],
    caption:"4g+ protein. 2g+ prebiotic fiber. 1g of sugar, from the oats. four ingredients. that's one glass. 🥛\n\na lot of kitchens are eating differently this year. GLP-1 medicines work on the hormone that tells your body it's full, and when one person's meals change, the grocery list changes for everybody. one person's plate changed. the whole fridge followed.\n\nso the food that's left has to be worth the room it takes up. Willa's is made with the whole oat kernel — bran, germ and all, the way steel-cut oats are — which is why the protein and the fiber are still in the glass instead of filtered out of it.\n\nand it's still not the whole breakfast. put it next to the eggs, the fruit, the toast. no single food was ever supposed to do all of it.\n\nthe ingredient list is four lines long. read it in one breath. 🌾",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#nutrientdense",
      "#proteinbreakfast",
      "#prebioticfiber",
      "#cleaningredients",
      "#labelcheck",
      "#plantmilk",
      "#realfood",
      "#breakfastathome"
    ],
    visual:"Vertical 9:16, locked tripod on every frame except the pour, shot on a real kitchen counter in late-morning north light — bright, warm, real shadows, no diffusion, no filter, nothing styled to death. There are no faces anywhere in this piece and no more than two hands ever enter frame, so the kitchen reads as one household rather than a cast. Palette is the Health/Wellness pillar: creamy blue (#73B2C9) for every tick mark and for exactly one accent line, navy (#202A44) for all type, translucent cream (#FAFAF7) for the bars type sits on. BUILD THE SET BEFORE YOU ROLL — the staging is the argument. The counter is not empty and this is not a flat-lay: a full breakfast is already laid out and stays in frame for the entire runtime — a plate of eggs, a bowl of cut fruit, toast on a wooden board, a jar of dry oats, a mug of coffee, a napkin somebody has actually used. The glass we pour sits among them at counter height, never isolated, never hero-lit on its own. If at any point in the edit the glass looks like the only food in the room, the brief has failed. SHOT 1 (wide, 3s): counter height, 35mm equivalent, the whole breakfast across frame with the empty glass at center-left and Willa's Original standing label-forward just behind it. Hook text drops on a cream bar in navy: 'four ticks on one glass — and it's still not the whole breakfast.' Room tone only. SHOT 2 (medium, static): one hand lifts Willa's Original, thumbs the cap off, and pours in a single unbroken take until the glass is about three-quarters full. Shoot 60fps but cut at 100% — no slow motion, no ramp, no ASMR gloss. Keep the small imperfection where the pour hits the side of the glass; do not reshoot for a clean stream. SHOT 3 (locked close-up, the hero): the filled glass at glass height, carton label-forward and slightly soft behind it, breakfast still readable at the edges of frame. Four ticks type on one at a time with a half-second beat between each, creamy-blue check plus navy line, entering from the left, never stacking more than four deep and never crossing the glass. Exact copy, in this order: '4g+ protein ✓' → '2g+ prebiotic fiber ✓' → '1g sugar — from the oats ✓' → 'four ingredients ✓'. All four hold together for a full second before the cut. SHOT 4 (insert): a thumb resting on the ingredient list with all four lines legible, achieved by the operator physically stepping in — never a zoom, never a punch-in in post. Single creamy-blue line beneath: 'four lines. that's the list.' SHOT 5 (wide, framed IDENTICALLY to shot 1 — same crop, same eye line, same light): the glass now full, everything else on the counter untouched. Navy on cream, one line: 'still not the whole breakfast.' The match cut between shot 1 and shot 5 is what makes the abundance point without a word of copy, so lock the tripod position with tape and do not move it between setups. END CARD: the Willa's set faced up on the counter, Original and Kids label-forward, generous cream negative space above, BS-4 stinger set small in navy — 'More protein than any oat milk. (Yes, really.)' Cut on room tone; no music sting, no logo animation, no whoosh. HARD PROHIBITIONS ON SET, check the props table before the first take: no bodies, no mirrors, no bathroom scale, no measuring tape, no measuring cup used as a portion device, no pill bottle, no blister pack, no injector pen, no pharmacy bag, no clinical white surface, no fitness tracker on a wrist, no gym clothes, no before-and-after anything, no calorie or macro app on a phone screen. If a prop could be read as medical or as a diet tool it does not enter the frame. The medication is the reason this brief exists and it never appears in it. TYPE RULES: sentence case, single lines, never more than four lines on screen at once, no motion graphics, no counting animations, no charts, no arrows, no badge cluster. Only certification marks already printed on the current carton may be visible, and none are called out.",
    script:[
      {t:"0:00-0:03", vo:"", onScreen:"four ticks on one glass — and it's still not the whole breakfast."},
      {t:"0:03-0:07", vo:"a lot of kitchens are eating differently this year.", onScreen:"—"},
      {t:"0:07-0:10", vo:"GLP-1 medicines work on the hormone that tells your body it's full.", onScreen:"one person's plate changed. the whole fridge followed."},
      {t:"0:10-0:16", vo:"so whatever's left on the counter has to be worth the room it takes.", onScreen:"4g+ protein ✓ → 2g+ prebiotic fiber ✓ → 1g sugar — from the oats ✓ → four ingredients ✓"},
      {t:"0:16-0:19", vo:"whole oat kernel. bran, germ and all — the way steel-cut oats are.", onScreen:"four lines. that's the list."},
      {t:"0:19-0:22", vo:"and it's still not the whole breakfast.", onScreen:"still not the whole breakfast."},
      {t:"0:22-0:24", vo:"", onScreen:"More protein than any oat milk. (Yes, really.)"}
    ],
    audio:"No trending sound, original audio. This is deliberately the one Reel in the week that isn't riding a format — a trending audio would put a joke on top of a subject that only works played straight. Bed the piece on real room tone captured on the day (fridge hum, the pour, the glass touching down on the counter) with a warm narrative brand voiceover recorded clean and dry — one person, conversational volume, half a beat slower than feels natural, zero pitch energy. NOT a founder voiceover and not framed as one; Christina is off camera and off mic here. Music, if the editor wants any, is a single unhurried acoustic bed with no drums, no lyric and no swell, sitting far under the read and dropping to silence entirely under the four-tick beat so the numbers land in room tone. Resolve flat on the end card — no button, no sting. If a take sounds sympathetic rather than matter-of-fact, use a different take.",
    duration:"0:24",
    cta:{soft:"send this to whoever does the grocery list at your house.", medium:"pour Willa's Original — 4g+ protein, 2g+ prebiotic fiber, 1g of sugar from the oats.", strong:"find Willa's in the refrigerated plant-milk set — Original, Chocolate, Kids and Barista, all organic, all certified glyphosate-free and tested every lot."},
    benefitShorthandId:"BS-4"
  },
  {
    id:"AUG24-TT-5",
    platform:"TikTok",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Fri Aug 28 · 9am",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"we asked a machine to write an oat milk commercial. it wrote the whole aisle.\" — the protein-claim arms race, read out loud with a straight face",
    intel:[
      {type:"PULSE", text:"CP-3: the \"we had ChatGPT make us a script\" one-take is documented live in a TikTok trends update dated Aug 19, 2026, and it is the second meme ride of the AUG 24–30 slate (TT-3 owns the other one, the two-clip rhyme — do not borrow its cutting pattern). The mechanic is strict and in this order: prompt an AI for a short scene with a stated setting and vibe, read it once so everyone knows their lines, then shoot the whole thing in a single unbroken take with every line delivered completely straight. On-screen text up front tells the viewer AI wrote it, so nobody is being tricked. The counterintuitive performance rule is the entire format: the flatter and less winking the delivery, the better it performs, because the comedy lives in the gap between the machine's overwrought copy and two ordinary people saying it out loud. INTERNAL ONLY: the format's name, the trends page it was documented on, and the fact that the engine surfaced it never appear on screen, in the caption, or in any variant — the post reads as two people at work having an idea, not as a brand executing a documented trend. Also internal: the script genuinely must be AI-generated and then trimmed for LENGTH only. Do not hand-write parody copy and label it AI on screen — the on-screen line is a factual claim about how the video was made, and the whole joke collapses if the team has to hedge it later."},
      {type:"TREND", text:"T-2: a national feature published Aug 18, 2026 traced protein claims spreading into pizza crust, instant noodles and even cocktails, tied the surge to political messaging and influencer culture, and noted that most Americans already meet their protein needs while falling well short on fruit and vegetables. Three days later, on Aug 21, 2026, a new analysis landed the mechanism side: protein loaded into breakfast items or snacks does not build muscle on its own — dietary protein and resistance training have to work together — and most healthy adults get enough from ordinary food without any fortified format. Two kinds of evidence, four days apart, both pointing at the same thing: the number on the front of the package has outrun what the number actually does. That is the payload this brief rides, and it rides it as LANGUAGE, not as science — the joke is what the category now sounds like. INTERNAL ONLY: neither the feature nor the analysis is named, cited, quoted, screenshotted or paraphrased-as-fact anywhere on screen or in the caption, and no nutrition finding is attributed to any outlet, researcher or study in consumer copy. LANE DISCIPLINE: this brief owns the protein-claim arms race for the week. AUG24-IG-R2 owns nutrient density and the GLP-1 household — it may not restate the arms race, and this brief may not touch nutrient density, appetite, satiety or household eating. The fiber-and-protein science lane (gut metabolites, fermentation site, satiety mechanism) is on a hard rest from AUG 17 and is off-limits to both."},
      {type:"COMPETITOR", text:"No competitor ID is linked to this brief on purpose. The target is the category's shared vocabulary — bio-optimized, clinically-inspired, fortified, enhanced, engineered, bioavailable, synergy, ritual — which no single brand owns and every brand is now renting. That vocabulary is the funniest thing on the shelf precisely because it is anonymous. HARD LINE: the AI-generated script must not contain a real brand name, a real product name, a real retailer, or any recognisable trade dress, and the prompt fed to the AI must be written so it cannot return one (specify \"a fictional wellness beverage, no real brands\"). If the machine returns a real name, re-prompt — do not edit it out and keep the take, because the on-screen line says the copy is unedited. The invented protein figure in the script must be an obviously absurd number that matches nothing actually on shelf, so it reads as machine nonsense rather than a claim about any product, ours or anyone's. INTERNAL ONLY: every word of this note. Nothing about the category read, the vocabulary audit, or the prompt engineering reaches consumer copy."},
      {type:"AUDIENCE", text:"The shopper's ear has been trained on this language for three straight years and she can now produce it herself — which is exactly the moment it stops working and starts being funny. She is not confused by adaptogen copy, she is bored of it, and boredom is a much easier emotion to convert than confusion: she does not need to be taught anything, she needs to be told she was right. That is why the delivery has to be flat. A brand winking at her is a brand still performing; two people reading machine copy in a dead voice and then reading four real words in the same voice hands her the recognition and gets out of the way. HARD LINE: the joke targets the category's language, never the customer. Nothing in this brief may imply that anyone who bought a fortified drink was fooled, gullible, or wasting money — the machine is the mark, not the shopper. Second hard line: this brief does not disparage protein. Willa's Kids uses organic pea protein by design, Original carries 4g+ from the oat itself, and a post that reads as anti-protein contradicts our own lineup. The critique is bolt-on marketing language, full stop."}
    ],
    hooks:[
      {text:"we had an AI write our oat milk commercial. we didn't change a word.", recommended:true},
      {text:"we asked a machine to write an oat milk commercial. it wrote the whole aisle.", recommended:false},
      {text:"one take, no rewrites. every line is the machine's — except the last four.", recommended:false},
      {text:"the machine wanted adaptogens. the carton wanted oats.", recommended:false}
    ],
    caption:"Four ingredients. It took a machine about four hundred words to say less. 🌾\n\nwe asked a machine to write an oat milk commercial. it wrote the whole aisle — a protein number nobody could hit, two adaptogens, a third mushroom it refused to name, and the word \"bioavailable\" three times in a row. we read it out loud once, completely straight, and we didn't change a word.\n\nthen we read the label:\n\norganic whole grain oats. filtered water. organic vanilla extract. sea salt.\n\nthat's the whole commercial. Willa's Original is 1g of sugar and it came from the oats, plus 4g+ protein and 2g+ prebiotic fiber — all of it already sitting in the oat before anyone thought to print a number on the front of a box. most oat milks filter the bran and germ out and process the starch into sugar, and the fiber and the protein leave with it. we keep the whole groat, so there's nothing to add back.\n\nwe're not against protein. we're against needing a paragraph to explain a drink.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#fouringredients",
      "#wholeoat",
      "#cleaningredients",
      "#plantmilk",
      "#labelcheck",
      "#realfood",
      "#proteintok",
      "#chatgptscript"
    ],
    visual:"One unbroken take, no cuts, no cutaways, no B-roll — the single continuous shot IS the format and any edit inside it kills the joke. Location is the real Willa's kitchen or office kitchenette, not a set: pale wood counter, cream wall, a bright window camera-left throwing hard late-morning light with no diffusion and no fill. Bright and trend-forward, not muted brand-kitchen — let the window blow out slightly behind them. Camera is a locked-off tripod at chest height, vertical 9:16, framed medium-wide so BOTH performers are in frame from mid-thigh up with about a foot of air between them and roughly a third of the counter visible along the bottom edge. Nobody moves out of frame and the camera never moves. Talent: two team members who are NOT Christina and NOT anyone's family — this is the People-on-Camera pattern running its team substitute, and the on-camera quota stays untouched. Wardrobe is whatever they actually wore to work; no aprons, no branded tees, no styling. They stand shoulder to shoulder, arms at their sides, phones down, looking straight into the lens like they are reading a hostage note. Nobody smiles, nobody laughs, nobody looks at the other person. Delivery is metronome-flat all the way through — the direction to give on set is \"read it like a court clerk reading a docket,\" and if a take has a smirk in it, it is dead, roll again. THE ONE PIECE OF STAGING THAT MATTERS: Willa's Original is already sitting on the counter at the lower-right edge of frame from the very first frame, label forward, completely ignored, present in every second of the video. Nobody touches it, gestures at it, or looks at it until 0:15. That is the whole visual argument — the answer was in the shot the entire time the machine was talking. Text treatment: a full-width opening card in navy ink (#202A44) on near-white (#FAFAF7), lower third, three lines max, reading \"we had an AI write our oat milk commercial. we didn't change a word.\" It holds for the first three seconds and fades. From 0:03 onward a small mono corner tag sits top-left for the remainder of the take, all caps, navy, 60% opacity, reading \"AI SCRIPT · UNEDITED\" — it never moves and never leaves, and it is what keeps the viewer in on the premise without a single wink from the performers. No captions burned in over the machine's lines: let the audio carry them so the flatness is the only thing on screen. The pillar purple (#A191B2) is spent EXACTLY ONCE, at 0:15, as a single centred lower-third line — \"that last one's the label\" — that fades in as the second performer picks up the carton and fades before the line ends. It is the only colour in the piece and it marks the turn. At 0:15 the second performer picks the carton up with one hand, holds it at chest height, does not tilt it, does not flip it, does not point at anything on it — she reads the four ingredients off the front in exactly the same dead voice she used for the adaptogens, and the sameness of the two voices is the punchline. No finger-tracing, no zoom, no on-screen ingredient checklist, no counting gesture: this is deliberately NOT a count-the-lines or flip-the-carton brief, and any of those moves collapses it into a format the feed has already seen four times this summer. Then one full beat of silence — leave it long enough to feel wrong — before the last spoken line. End card is a hard cut to a plain near-white (#FAFAF7) card, navy type, no motion, no sound design: \"The whole oat. Not the syrup.\" held 1.5 seconds, Willa's wordmark bottom-centre. No whoosh, no sting, no logo animation, no product beauty shot at the end — the carton already did its job by standing there for twenty-two seconds.",
    script:[
      {t:"0:00-0:03", vo:"PERFORMER A, dead flat, straight into the lens: \"Introducing the future of the morning wellness occasion.\"", onScreen:"we had an AI write our oat milk commercial. we didn't change a word."},
      {t:"0:03-0:06", vo:"PERFORMER B, same flatness, no reaction to A: \"Now with twenty-seven grams of bio-optimized plant protein per serving.\"", onScreen:"AI SCRIPT · UNEDITED  (small mono corner tag, top-left — holds for the rest of the take)"},
      {t:"0:06-0:09", vo:"PERFORMER A: \"Infused with clinically-inspired adaptogens for total-body synergy.\"", onScreen:"— (corner tag only; nothing new enters)"},
      {t:"0:09-0:12", vo:"PERFORMER B: \"Ashwagandha. Lion's mane. And a third mushroom we are not able to name.\"", onScreen:"— (corner tag only)"},
      {t:"0:12-0:15", vo:"PERFORMER A, no acceleration, no emphasis: \"Fortified. Enhanced. Engineered. Bioavailable. Bioavailable. Bioavailable.\"", onScreen:"— (corner tag only)"},
      {t:"0:15-0:18", vo:"PERFORMER B picks up the Willa's Original that has been sitting in frame since the first second, holds it at chest height, and reads off the front in the exact same dead voice: \"Organic whole grain oats. Filtered water. Organic vanilla extract. Sea salt.\"", onScreen:"that last one's the label  (single centred line, pillar purple #A191B2 — the only colour in the piece, fades before the line ends)"},
      {t:"0:18-0:22", vo:"One full beat of silence — hold it past comfortable. PERFORMER A, still flat, still not smiling: \"That's it. That's the commercial.\" Hard cut to end card.", onScreen:"The whole oat. Not the syrup."}
    ],
    audio:"No trending sound, original audio. Sync sound only — the flatness of two real voices in a real room is the entire asset and a trending bed would supply the energy the performances are deliberately withholding. Record with a lav on each performer or a shotgun just out of frame top-centre; do not shoot this on the phone's built-in mic, because room reverb makes the delivery read as amateur rather than deliberate. Keep live room tone under everything — the fridge hum, the far-off traffic, whatever the kitchen actually sounds like — and do NOT clean it out in post. Zero music for the full twenty-two seconds, including under the end card. The only sound design note in the whole piece: the soft real thunk of the carton being set back down does NOT happen, because she never puts it down. Editor's note: the full beat of silence at 0:18 is the single most important frame-range in the brief — it is where the audience realises the two voices were identical. Leave it long. If it feels one beat too long in the edit, it is correct.",
    duration:"0:22",
    cta:{soft:"save this for the next time a drink needs a paragraph.", medium:"pour Willa's Original — the whole ingredient list fits in one breath.", strong:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 1g sugar from the oats, 4g+ protein, 2g+ prebiotic fiber. the whole oat, not the syrup."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG24-PIN-2",
    platform:"Pinterest",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"viral-recipe-remix",
    timing:"Fri Aug 28 · 10am",
    priority:"STANDARD",
    rideNow:true,
    concept:"\"nobody's cooking to order on a game morning.\" — one make-ahead pan, sliced for a full house, built to be found in search the day before it's needed",
    intel:[
      {type:"TREND", text:"T-3: the season-opening college football slate published Aug 17, 2026 puts eight games on Saturday, Aug 29, 2026, running from a noon kickoff into the night, and coverage dated Aug 22, 2026 framed the weekend just past as the last Saturday without football — meaning the anticipation and planning window is live right now, not on the day. That is the entire reason this pin publishes Friday Aug 28 rather than Saturday: Pinterest is a planning surface, and a pin has to be indexed and saved the day before the morning it serves. Willa's has never claimed this occasion, and the noon kickoff is what makes it a Willa's occasion at all — the food event is breakfast, not the game. INTERNAL ONLY: the games, the matchups, the network, the schedule sources and the words 'college football' never appear in the pin title, description, overlay or hashtags — no team names, logos, colours, mascots, jerseys or broadcast references of any kind, and never the word tailgate. Consumer copy says 'game morning' and 'a full house on a Saturday' and stops there. LANE DISCIPLINE: TT-4 owns the video half of this signal — the one-carton relay around the table and the 'kickoff's at noon, the hard part is at nine' line are its property and must not be echoed here. PIN-2 owns the make-ahead recipe and the search surface: the pan, the night before, the crowd math."},
      {type:"AUDIENCE", text:"The search language on Pinterest for this occasion is boring on purpose — 'make-ahead breakfast for a crowd', 'baked oatmeal', 'breakfast that feeds 12', 'dairy-free breakfast for a group' — and evergreen roundups on that exact query have been indexed for years, which means the pin competes on the image and the specificity of the ingredient list, not on cleverness in the title. The house move is to spend the wit in the kicker line and keep the headline in plain search language. Two things drive saves on this format: a cut cross-section that reads at thumbnail size, and a description with a real, complete, cookable ingredient list rather than a link tease. Note the seasonal window — this is the last week of August, so the fruit in frame is late-summer (blueberries, plums), not autumn produce. INTERNAL ONLY: never write the SEO reasoning, the indexing timing, or the phrase 'search volume' into anything the client-facing pin shows; the description reads as a recipe a person wrote, not as a keyword strategy."},
      {type:"AUDIENCE", text:"The payload here — 8g protein (same as dairy, 50% less sugar), DHA omega-3s from algae oil, calcium and vitamin D, free of the top 9 allergens — is a claim about the CARTON, not about the finished bake, and this is the trap that could sink the pin in its own comments. If the recipe called for eggs, or almond flour, or walnuts on top, a parent would read 'free of the top 9 allergens' three lines above an ingredient list that contains two of them and conclude Willa's is being slippery. So the recipe is built to hold the line: flax replaces eggs, pumpkin seeds replace nuts, Country Crock Plant Butter replaces butter per the named dairy-free swap library, and maple replaces cane sugar. Willa's is the protagonist at 2½ cups in the pan plus a carton for every kid at the counter, not a splash. INTERNAL ONLY: do not let any version of the copy claim the BAKE is top-9-free — the sentence is scoped to the cartons ('every carton in the pack is safe for every kid at the table'), and a copyeditor must not 'tighten' it into a claim about the pan. Also internal: Willa's own product page lists fiber differently from the internal flavor database, so this brief states no fiber gram number and does not name the sweetener — protein, DHA, calcium, vitamin D and the top-9 line only."},
      {type:"COMPETITOR", text:"INTERNAL ONLY — the plant-milk category treats the first football weekend, when it shows up at all, as adult territory: the cooler, the crowd-pleaser dip, the coffee for the drive. Nobody is briefing a kids' SKU onto a Saturday-morning counter, and no plant milk owns 'breakfast for a house full of people' as a repeatable seasonal occupancy. That is the green shoot: this is a land-grab on an unclaimed occasion with a format (make-ahead bake) that repeats every single weekend of the fall without ever getting stale. GREEN-SHOOT NEXT MOVE: if saves on this pin clear the account's pin median, open a dedicated season-long game-morning board and ship one new make-ahead pin into it every week through the fall, rotating the bake (oat squares → sheet-pan pancakes → overnight oat jars) while the crowd-and-counter staging stays identical so the board reads as one series. No competitor, retailer or private label is named anywhere in the pin, and no comparison is drawn — the only contrast on the surface is dairy, and only inside the approved 'same protein as dairy, 50% less sugar' phrasing."}
    ],
    hooks:[
      {text:"make-ahead game day breakfast for a crowd (dairy-free baked oatmeal squares)", recommended:true},
      {text:"nobody's cooking to order on a game morning.", recommended:false},
      {text:"one pan the night before, and Saturday morning takes care of itself", recommended:false},
      {text:"breakfast for a full house, cut into twelve squares", recommended:false}
    ],
    caption:"A full house on a Saturday morning is a math problem you solve the night before. 🏈🌾 One pan of baked oatmeal, cut into squares and stacked, a bowl of whatever fruit is still good, and a few Willa's Kids cartons standing open with straws in — everything within reach on the counter, nothing plated, nobody waiting on a griddle.\n\nWilla's Organic Kids Oat Milk goes into the pan, and a few more cartons from the same 16-pack go straight on the counter. 8g of protein — the same as dairy, with 50% less sugar — plus calcium, vitamin D, and DHA omega-3s that come from algae oil. It's free of the top 9 allergens, so every carton in the pack is safe for any kid at the table and nobody has to stop and read the label first. 🥛\n\nNobody's cooking to order on a game morning.\n\nIngredients\n- 3 cups organic old-fashioned rolled oats\n- 2½ cups Willa's Organic Kids Oat Milk\n- 2 very ripe bananas, mashed\n- ⅓ cup pure maple syrup\n- ¼ cup Country Crock Plant Butter, melted (olive oil works too)\n- 2 tbsp ground flaxseed + 5 tbsp water, stirred and left to sit 5 minutes\n- 2 tsp baking powder\n- 1½ tsp cinnamon\n- 1 tsp vanilla extract\n- ½ tsp sea salt\n- 1½ cups blueberries\n- ¼ cup pumpkin seeds, for the top\n\nThe night before: stir everything except the blueberries and seeds together in one bowl, fold the blueberries in last, spread it into a 9x13 greased with plant butter, scatter the seeds over the top, cover and refrigerate. In the morning: bake at 375°F for 40–45 minutes, until the edges pull away and the middle is set. Rest 10 minutes, cut into 12 squares, stack them on the board, and set a few more Willa's Kids cartons alongside, straws already in — everything within arm's reach.",
    hashtags:[
      "#willas",
      "#willaskids",
      "#makeaheadbreakfast",
      "#breakfastforacrowd",
      "#bakedoatmeal",
      "#dairyfreebreakfast",
      "#gamedaybreakfast",
      "#top9free",
      "#allergyfriendlyrecipes",
      "#oatmilkrecipes",
      "#kidsbreakfast",
      "#saturdaymorningbreakfast"
    ],
    visual:"Vertical 2:3 pin (1000×1500), one overhead flat-lay, shot straight down — no grid, no collage, no step strip. This is a real counter at 8:40 in the morning, not a styled set: a pale butcher-block or light wood counter with visible grain and a couple of water rings, natural daylight raking in from camera left through a kitchen window, no diffusion, no reflector, no filter. Hard-ish morning light so the stacked squares throw real shadows and the oat texture reads. Camera dead overhead on a C-stand at 35–50mm full-frame equivalent, everything on one plane so nothing goes soft. LAYOUT, bottom two-thirds of the frame: the 9x13 baking dish sits at lower left, already cut into twelve squares with two squares lifted out so the cut edges show the oat-and-blueberry cross-section — that cross-section is the single most important texture in the pin and should catch the light. Next to it, a small stack of three squares on a sheet of parchment, edges crumbling, real crumbs on the counter around them (do not sweep the counter — the crumbs are the point). Centre right: a wide low bowl of loose fruit, blueberries and halved plums or peaches, unstyled, a few berries rolled out onto the wood. Foreground right: four Willa's Organic Kids Oat Milk On-the-Go cartons — the real single-serve 8oz format, straws already punched in, no glasses, nothing to pour — standing at slightly different angles with one or two tipped where a kid already started; uneven angles read as real, a lined-up row reads as an ad. One unopened carton props upright at the right edge, label square to camera, tall enough to occupy roughly a sixth of the frame so a cropped screenshot of the middle band still contains it. Scatter a few pumpkin seeds and one used spoon across the wood. One adult hand may enter from the bottom edge lifting a square — hands only, sleeve rolled, no talent, no faces, no children in frame. PALETTE: warm cream and pale wood as the ground, deep blueberry and toasted-oat gold from the food, brown #9E652E as the only graphic accent (Parenting pillar), navy #202A44 for all type. Deliberately avoid any paired-colour styling that could read as team colours — no two-tone napkins, no jerseys, no pennants, no bunting. Nothing orange or pumpkin-toned anywhere; the sibling fall-drink pin owns that palette and these two must not look like a set. TYPE, upper third on clean cream negative space (leave the top ~30% of the counter empty when shooting so type has somewhere to live): one confident headline in navy, sentence case, large — 'Make-Ahead Game Day Breakfast for a Crowd' — with a thin #9E652E rule beneath it, then one small kicker line directly under the rule: 'nobody's cooking to order on a game morning.' Bottom-left corner carries one small stinger, BS-6 adapted: 'no top-9 allergens' — set small in navy, no badge, no lockup. Use ONLY the allergen half of BS-6; its second clause carries a classroom framing that is closed this week, so it does not go on the pin in any form. That is the total copy on the pin: headline, kicker, stinger. No ingredient list on the image, no numbered steps, no recipe card, no nutrition badge cluster — Fishwife / Graza restraint, where the type is confident and the food does the arguing; the description does the SEO work, not the artwork. HARD EXCLUSIONS on set: no team names, logos, colours, mascots or merchandise; no television, no screen, no broadcast anything in frame or reflected in any surface; no alcohol, no cans, no bottles; no dairy on the counter at all — no butter dish, no cream, no yogurt tub; no cane sugar in frame. Shoot a second overhead one stop brighter with the pan pushed to lower right and the empty counter on the left, so the team has a mirrored crop if the headline needs the other side. Also grab a tight overhead detail of the cut cross-section and one of the four cartons beside the 16-pack box as alternates for the season-long board.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save it to your Saturday morning board before the weekend gets here.", medium:"one pan, a few cartons from the pack — Willa's Kids goes into the batter and straight into little hands.", strong:"Willa's Organic Kids Oat Milk: 8g of protein, the same as dairy with 50% less sugar, plus calcium, vitamin D, algae-oil DHA omega-3s, and free of the top 9 allergens."},
    benefitShorthandId:"BS-6"
  },
  {
    id:"AUG24-IG-R3",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Fri Aug 28 · 12pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"you can taste the part most oat milks leave behind.\" — the harvest cut: groats, hands, one pour",
    intel:[
      {type:"TREND", text:"T-10 — USDA NASS released its Crop Progress report for the week ending Aug 16, 2026 on Aug 17, 2026, showing the oat harvest well underway across the nine states that carry 78% of US oat acreage: Iowa at 96% harvested, six points ahead of last year's pace after running 25 points ahead in early August, Wisconsin at 73% the same week (versus a 62% five-year average). This is the only honest fall event available to this brand right now — while two national coffee menus flip to syrup and spice, the actual seasonal thing happening to an oat is that it comes off a field in August. That is what makes a harvest-lit shoot true this week instead of decorative. INTERNAL ONLY: the crop-progress numbers, the state names, the percentages and the phrase 'ahead of last year's pace' never reach consumer copy — no Iowa, no 96%, no USDA, no yield language, no implication that Willa's oats came from this harvest or from any named state. Sourcing is not verified at that granularity and a state claim would be a fabricated provenance line. The field in frame is a generic organic oat field; the copy says organic oats and stops there. LANE DISCIPLINE: TT-1 (Wed Aug 26) owns the seasonal-turnover argument — the shelf going orange, the syrup pump, nothing-about-the-carton-changes-for-the-season. This brief must not argue the season at all. It owns the whole-groat process story and the taste it produces, full stop."},
      {type:"PULSE", text:"CP-6 + CP-10 — two mechanics, both stolen, neither named on screen. CP-6: a fast-casual chain's limited-time Niçoise ran nationwide Aug 11–24, 2026 paired with a custom-illustrated co-branded tuna tin the guest opens and tips in themselves rather than receiving it pre-mixed; trade coverage dated Aug 20, 2026. The transferable move is the conversion of a functional add-on into a hands-on ritual with a physical beat — the lid peeling, the tipping, the small mess — which puts the PACKAGE on camera doing something rather than the finished dish sitting there. Applied here: the cap comes off, the seal cracks audibly, the carton tilts, one drop misses the glass and stays on the counter. CP-10: a stripped-bare soul and cosmic-country record released Aug 21, 2026 via Thirty Tigers, warm and vocal-forward on real instruments, which is the exact opposite of the ambient-wellness gloss that makes brand kitchen footage read as an advert. INTERNAL ONLY: never name the chain, the tinned-fish brand, the artist or the album in caption, overlay, VO or hashtag — and clear the audio through Instagram's licensed library or a sync licence before the Fri Aug 28 slot rather than after. If clearance is not in hand by Thu Aug 27, ship on room tone and the pour; the piece survives silence and does not survive a mute."},
      {type:"COMPETITOR", text:"C-3 — a flavor-bred certified-organic produce brand announced Aug 18, 2026 that it expanded from a regional Sprouts footprint into the produce aisle of all 490 stores across 25 states, and the retailer announced a new Los Angeles-area location in Panorama City on Aug 22, 2026. The reason it sits on this brief and not another: its entire proposition is that the thing itself was bred to taste better rather than processed to taste better. That is structurally the same argument as the whole groat — flavor as a property of the raw material, not of a formulation step — and it is the nearest adjacent-category proof that a buyer will pay for it. Watch how the pitch gets made. INTERNAL ONLY: no competitor, peer or adjacent brand is named, shown, defocused-but-identifiable, or alluded to anywhere in this Reel, and no store counts, state counts, retailer names or distribution language appears in any consumer field per the retail-footprint rule. The category critique in this brief stays at the approved altitude — 'most oat milks' — and never lands on a name."},
      {type:"AUDIENCE", text:"This is the Friday midday slot, which the adult non-parent drinker actually reads, and it is the week's DELICIOUS beat — the one the slate is thinnest on. The prejudice this brief is aimed at is not health scepticism, it is the memory of a thin, chalky, watery plant milk, and no nutrition number has ever fixed that memory. Only a pour fixes it. So the proof stack is inverted from the house default: the benefit (it is rich, it pours thick) leads, and the process (whole groat, bran and germ kept, no oat syrup step) is the explanation that arrives afterwards to make the richness credible rather than the claim that has to be believed first. Humor pattern is Aesthetic IRL Encounter — the raw grain turning up on a real kitchen counter next to the carton it becomes, which is the unexpected-cameo version of the at-shelf move. INTERNAL ONLY: no diet-culture framing, no restriction language, no 'clean' as a moral category, and nothing that reads as an earnest-wellness affirmation over a grain bowl. The register is Fishwife / Graza editorial-wit: beautiful, dry, unbothered. LANE DISCIPLINE: IG-R2 (Thu Aug 27) owns the nutrient-density checklist and the per-glass tick stack for the household context — this brief's three ticks are process ticks about the oat, not nutrition ticks about the glass, and the two must not converge on the same overlay."}
    ],
    hooks:[
      {text:"rich isn't an ingredient. it's the part we didn't remove.", recommended:true},
      {text:"you can taste the part most oat milks leave behind.", recommended:false},
      {text:"a whole oat goes in. that's the entire flavor plan.", recommended:false}
    ],
    caption:"creamy is not something we add. it's the part of the oat we don't take out. 🌾\n\noats come off the field in august as whole groats — whole oat kernels, like steel-cut oats before they're rolled, bran and germ still on them. most oat milks filter that part off and turn what's left into sugar. we keep the whole thing, which is the only reason it pours thick instead of thin.\n\nyou can taste the part most oat milks leave behind.\n\nWilla's Original is four organic ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber, and 1g of sugar that came from the oats.\n\nthe whole oat. not the syrup.\n\npour it cold and see. 🥛",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#oatgroats",
      "#cleaningredients",
      "#labelcheck",
      "#plantmilk",
      "#realfood",
      "#dairyfree"
    ],
    visual:"A short editorial arc in three moves — grain, carton, glass — shot on one wooden counter in one hour of real light, vertical 9:16, no faces, hands only, no talent on camera. Shoot late morning through a window that throws a hard-edged rectangle of sun across the counter; every hero beat is placed inside that rectangle so the grain is backlit and the dust in the air is visible. 50mm equivalent for the wides, a proper macro for the groat inserts, everything on sticks except the pour, which is handheld and slightly alive. HARD GUARDRAIL: no drone footage, no aerial field plates, no stock harvest B-roll, and no combine — the 'field' in this piece is a shallow linen-lined bowl of raw organic oat groats and a few loose stalks laid on the counter, lit like produce, and it must never be cut or captioned in a way that claims these oats came from a named state or from a specific harvest. Beat one: a wide of the counter with the bowl of groats in the light, one hand entering from frame right, hook text dropping in navy (#202A44) on a translucent cream (#FAFAF7) bar. Beat two: two cupped hands pouring groats hand to hand, backlit, shot at 120fps and cut to roughly half speed — let a dozen kernels miss and scatter on the wood and do not sweep them, they stay in frame for the rest of the piece. Beat three: macro, a single groat rolling to a stop, filling two-thirds of frame, so the bran husk and the pale germ end are actually legible — this is the shot that earns the whole argument, so shoot it four ways and stop down for depth. Beat four is the ritual and it is the beat the piece is built around: thumb under the cap of Willa's Original, a quarter twist, the seal cracking on-mic, the cap set down on the wood next to the scattered groats — in frame, at real speed, no cheat cut, sound recorded close. Beat five: the pour into a clear straight-sided glass, camera at glass height so the stream reads thick and the head folds over on itself, one drop landing on the counter and left there. Beat six: the glass sits, half in sun, groats scattered around its base, carton label-forward and in focus behind it — and three ticks type on one at a time in green (#75C596) with navy text, never more than one line on screen at once: 'the whole groat ✓' → 'bran + germ, kept ✓' → 'no oat syrup step ✓'. Palette is bright and warm, not muted brand-kitchen — push the highlights, keep the wood honey-toned and the linen off-white, let the milk read faintly ivory rather than blue-white, and resist any autumn grade: no orange filter, no leaves, no gourd, no spice styling anywhere in frame, because the whole point is that this is what fall actually looks like for an oat. Typography enters as clean single lines, sentence case, and never stacks more than three deep. End card: the glass alone in the last of the light, 'The whole oat. Not the syrup.' centered in navy on cream, the carton just readable at the edge of frame. No zoom-punch, no whoosh, no logo sting.",
    script:[
      {t:"0:00-0:03", vo:"rich isn't an ingredient.", onScreen:"rich isn't an ingredient. it's the part we didn't remove."},
      {t:"0:03-0:07", vo:"it's the part of the oat almost nobody leaves in.", onScreen:"—"},
      {t:"0:07-0:11", vo:"this is a whole oat groat. the whole kernel, bran and germ, like steel-cut oats before they're rolled.", onScreen:"whole oat groat"},
      {t:"0:11-0:14", vo:"most oat milks filter that off and turn what's left into sugar.", onScreen:"—"},
      {t:"0:14-0:18", vo:"we keep the whole thing. you can taste the part most oat milks leave behind.", onScreen:"you can taste the part most oat milks leave behind."},
      {t:"0:18-0:21", vo:"four organic ingredients. that's the whole recipe.", onScreen:"the whole groat ✓   →   bran + germ, kept ✓   →   no oat syrup step ✓"},
      {t:"0:21-0:22", vo:"(silence — music resolves)", onScreen:"The whole oat. Not the syrup."}
    ],
    audio:"Licensed music bed: Grace Potter, 'Trespasser' (seventh studio album, released Aug 21, 2026 via Thirty Tigers) — pull a warm, mid-tempo, vocal-forward passage from the stripped-back soul end of the record rather than the hellraising-rock end. It has to be real instruments and audible room, because the entire job of the bed is to keep this from sounding like an ambient-wellness advert. CLEARANCE IS A GATE, NOT A NOTE: use the track only if it is available in Instagram's licensed audio library for business accounts, or if a sync licence is confirmed, and the artist and album are never named in caption, overlay, VO or hashtag. If clearance is not confirmed by Thu Aug 27, the fallback is not a substitute song — it is no music at all: original audio, room tone, and the sound design carrying it. Either way, the sound design is mandatory and recorded close: groats rattling into the bowl, the dry rush of kernels falling hand to hand, the cap seal cracking on the quarter-twist, and the pour — all of it mixed forward and never gated out. Under the pour, drop the music entirely for two seconds so the liquid is the only thing audible, then bring it back for the ticks and resolve flat on the end card. Voiceover is warm narrative brand voice, off camera, low and unhurried, half a beat slower than feels right — no founder framing, no announcer lift, no upward inflection at the end of a line.",
    duration:"0:22",
    cta:{soft:"send this to the person who still thinks all oat milk tastes the same.", medium:"pour Willa's Original cold and see what a whole oat does to a glass.", strong:"find Willa's Original in the refrigerated plant-milk set — four organic ingredients, made from the whole oat groat, certified organic and certified glyphosate-free."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG24-TT-4",
    platform:"TikTok",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Sat Aug 29 · 10am",
    priority:"HIGH",
    rideNow:true,
    concept:"\"kickoff's at noon. the hard part is at nine.\" — one carton, one pass, a whole table fed before anybody leaves",
    intel:[
      {type:"TREND", text:"T-3: the season-opening slate published Aug 17, 2026 puts eight college football games on Saturday, Aug 29, 2026, opening with a noon kickoff (North Carolina–TCU staged in Dublin) and running into a 9pm window. Coverage dated Aug 22, 2026 framed that Saturday as the last one without football, so the anticipation window is already live and the audience is already planning that morning. Why it matters: a noon kickoff makes the 9am kitchen the actual logistics event of the day — a whole house fed and out the door before anyone sits down — and that morning is unclaimed. Willa's has never posted into this occasion, the wider category is spending the entire week on fall coffee menus, and back-to-school is spent after four straight weeks. This is the freshest untouched seasonal lane on the slate. INTERNAL ONLY: the schedule, the matchups, the network, the phrase 'Week 0', the city of Dublin, and the word 'tailgate' never appear in any consumer-facing surface — no team names, no logos, no team colours, no mascots, no broadcast footage, no stadium imagery, no scoreboard. The video reads as a big Saturday morning in a kitchen and nothing more; a viewer with no interest in football should be able to watch it without noticing what it is pegged to. LANE DISCIPLINE: AUG24-PIN-2 shares this T-3 anchor and owns the make-ahead food — the batch bake, the flat-lay spread, and all the plain-search SEO language for planning a game morning. TT-4 must not become a recipe or show a plated build; the carton and the people are the only subjects here."},
      {type:"PULSE", text:"CP-2: the 'B4 B4' relay format, flagged high-velocity in a platform trend report covering Aug 15–22, 2026 (report dated Aug 22, 2026) with the strongest reference version a poolside montage where a large group each took a single one-to-two-second micro-turn, every cut landing hard on the beat inside one continuous video. The mechanic is why it is worth taking: because no turn runs longer than two seconds, nobody has to be good at it, and four to six people is enough to read as a crowd. That forgiveness is exactly what makes it survivable with a real household and a real kid on camera. Willa's translation is a physical baton instead of a dance fragment — the carton itself is the object being passed, one pour per person, one cut per handoff. INTERNAL ONLY: never reference the format by name, never say 'trend', 'challenge', 'we're doing the thing', or describe the mechanic on screen or in caption — the video simply IS the format. Voice direction and format names stay backend. LANE DISCIPLINE: AUG24-TT-3 owns the week's fresh two-clip meme ride (CP-1) and AUG24-TT-5 owns the deadpan one-take; TT-4 is the only brief riding CP-2 and must not borrow either of their mechanics."},
      {type:"AUDIENCE", text:"The parent this is aimed at is not planning a party — she is running a departure. Six to nine people in a house on a Saturday morning with a hard deadline attached to it is a logistics problem, and the current answer is usually three different drinks: one kid can't have dairy, one visiting kid has a nut thing nobody wants to interrogate at 9am, and the adults are on coffee. The relief Willa's Kids offers is arithmetic, not aspiration: one carton clears the whole table because free of the top 9 allergens means the pass never stops to ask a question. 8g protein (same as dairy, 50% less sugar), DHA omega-3s from algae oil, calcium and vitamin D means the glass is also doing real work in a morning where breakfast is otherwise going to be whatever is fastest. Register is Partake Foods warmth — unapologetically a family brief, no broadening, no apology for talking to parents. INTERNAL ONLY: do not frame any of this as convenience-for-mom, do not imply the drink replaces a meal, and never gloss the allergen fact as a safety guarantee for a specific child — the on-pack claim is 'free of the top 9 allergens' and the copy says exactly that and nothing more. Allergen wording is safety-critical and goes through the accuracy check verbatim, never paraphrased. LANE DISCIPLINE: AUG24-IG-R2 owns nutrient-density-per-glass and AUG24-IG-F1 owns household worth — TT-4 states the numbers once, in one end-of-video overlay, and never argues them."},
      {type:"COMPETITOR", text:"INTERNAL read, no C-id and nothing consumer-facing: the entire category's seasonal voice this week is pointed at fall coffee — syrups, spice, pumpkin ranges, menu flips — which is a beverage-occasion land grab happening at 2pm on a weekday. Nobody in plant milk is speaking to the Saturday-morning household at all, and the first live football weekend is the highest-density family-breakfast morning of the fall calendar. That gap is the strategic value of this brief and it is worth more than the post itself: if this performs, the occasion is claimable for the whole season before anyone else notices it is empty. INTERNAL ONLY: no competitor, chain, menu or product is named, shown, implied or compared anywhere in the video, overlays, caption, hashtags or comments; the approved comparison pattern is not needed here because there is no comparison in this brief at all. GREEN-SHOOT NEXT MOVE: if saves and shares clear the week's median, book a recurring Saturday-morning slot for the rest of the season and have the second one briefed before the next noon-kickoff weekend — same table, different month, so the format compounds into a series instead of a one-off."}
    ],
    hooks:[
      {text:"kickoff's at noon. the hard part is at nine.", recommended:true},
      {text:"one carton, one pass, and everybody in this house is fed.", recommended:false},
      {text:"six glasses. one carton. nobody had to get up twice.", recommended:false},
      {text:"the loudest room in the house on a saturday morning is the kitchen.", recommended:false}
    ],
    caption:"Eight grams of protein, poured six times, out of one carton. 🏈\n\nThe first football Saturday of the year is Aug 29 and kickoff is at noon — which means the real event is at nine, in the kitchen, getting a whole house fed before anybody gets in a car.\n\nWilla's Kids is built to go all the way around a table like that. 8g protein — same as dairy, 50% less sugar. DHA omega-3s from algae oil, calcium and vitamin D. Free of the top 9 allergens, so the carton doesn't stop when it gets to the kid who can't have the other one.\n\nOne pour each. One pass. Everybody's fed and it's still only 9:15.\n\nkickoff's at noon. the hard part is at nine. 🌾",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#gamedaymorning",
      "#saturdaymorning",
      "#familybreakfast",
      "#top9free",
      "#allergenfriendly",
      "#dhaomega3",
      "#breakfastforacrowd",
      "#kidsdrinks",
      "#onecarton"
    ],
    visual:"One continuous take, one table, one carton, shot vertical 9:16 on a gimbal or a very steady handheld — the whole piece is a single unbroken orbit of a kitchen table with hard cuts added in post ON THE BEAT at each handoff, so the edit feels chopped while the space stays whole. Location is a real, lived-in kitchen at 9am on a Saturday — not a set, not a styled prop kitchen: crumbs on the counter, a dish towel on a chair back, a phone face-down, somebody's shoes by the door. Cast is a household of five to six people plus one dog if the location has one — grandparent, two adults, two kids, one teenager still in a hoodie — booked as a cast household or a UGC creator family. NOT Christina, NOT any founder's family member, and nobody performs; the whole reason the format works is that nobody has to be good at it. Light is real morning window light from one side, curtains open, no fill, no diffusion, no ring light, and let the far side of the room fall off a little — warmth over evenness. Palette is that light plus the Parenting brown (#9E652E) for every overlay, set in the brand's navy-adjacent weight, lower third, one line at a time, never stacked. Blocking, in order: cold open on the carton already in motion — a hand sets Willa's Kids down hard in the middle of the table and the first person is already reaching for it before the frame settles; hook line drops in at 0:01. Then the relay: person one grabs the carton, pours one glass, hands it sideways — HARD CUT on the beat — person two pours, passes — CUT — person three is a kid standing on a chair or a stool, two-handed, slightly too much pour, and this take is the one you protect above all others because the small overshoot is the honesty of the whole piece — CUT — person four pours while walking past, doesn't sit down — CUT — person five, the teenager, pours without looking up — CUT — person six, the grandparent, gets the last of it and tips the carton fully vertical to drain it. Camera never stops moving around the table through all six; the cuts do the rhythm, the movement does the continuity. Then the release: camera pulls back and rises slightly to a high three-quarter wide of the whole table, six full glasses, everybody mid-motion, nobody posed — hold this for a full two and a half seconds, it is the only calm beat in the video and it is what people rewatch. Overlays: one hook line at 0:01, then NOTHING at all through the entire relay — no counting, no names, no labels, no numbers competing with the cuts — then one payload line under the wide table shot, brown on cream: '8g protein · DHA omega-3s from algae oil · calcium + vitamin D'. End card is a plain cream card, brown type, no motion, no whoosh: 'no top-9 allergens.' held 1.5s, Willa's wordmark bottom-centre, then out. (Note: that end card is stinger BS-6 with its second clause deliberately dropped — the library line reads 'No top-9 allergens. School-safe.' and the school half is wrong register for a Saturday and would drag a closed back-to-school lane back into the week. Use the trimmed line exactly as written.) Product handling: the Willa's Kids carton is the only branded object in frame and its label faces camera on at least three of the six handoffs — brief the cast to pass it label-forward, then let them forget, and cut around the ones where it spins. HARD GUARDRAILS ON SET: nothing in frame may reference a team, a league, a broadcast or a game — no jerseys, no team colours worn deliberately, no mascots, no pennants, no TV on in the background, no stadium or field imagery, no scoreboard, no confetti. Nobody says 'tailgate' and no one is dressed for one. Zero alcohol anywhere in frame, including background bottles on a counter. Any food on the table is incidental and already half-eaten — fruit, toast, a cut melon — never plated, never styled, and never a recipe build, because the make-ahead spread belongs to the Pinterest pin and this brief must not duplicate it. No backpacks, no lunchboxes, no school references of any kind. No dairy in frame: no milk jug, no butter dish, no cheese, no yogurt cups. Coverage to protect the single take: shoot the full relay eight to ten times and choose the take with the most real overlap in it — somebody talking over somebody else, the dog crossing frame, a glass set down too hard — not the cleanest one, and pick up the kid's over-pour and the grandparent's final drain as separate safety inserts in case the master take loses them.",
    script:[
      {t:"0:00-0:02", vo:"Room tone and overlapping kitchen noise — a chair scraping, two people talking over each other, a fridge closing. No narration. A hand sets Willa's Kids down hard in the middle of the table.", onScreen:"kickoff's at noon. the hard part is at nine."},
      {t:"0:02-0:04", vo:"No dialogue. The pour and the glass are the sound — close, real, unprocessed. Person one fills a glass and slides the carton sideways.", onScreen:"—"},
      {t:"0:04-0:06", vo:"Hard cut lands on the beat. Person two pours and passes without looking up from what she's doing.", onScreen:"—"},
      {t:"0:06-0:08", vo:"Cut. A kid on a stool takes it two-handed and pours slightly too much. Somebody off-camera laughs — leave it in, do not clean it up in the mix.", onScreen:"—"},
      {t:"0:08-0:10", vo:"Cut. Person four pours while walking past the table and never sits down.", onScreen:"—"},
      {t:"0:10-0:12", vo:"Cut. The teenager pours one-handed, hood still up, eyes elsewhere.", onScreen:"—"},
      {t:"0:12-0:15", vo:"Cut. The grandparent gets the last of it and tips the carton fully vertical to drain it, then, flat and unperformed: 'that's everybody.'", onScreen:"—"},
      {t:"0:15-0:19", vo:"Music and room tone open back up. Camera pulls wide and rises to the whole table — six full glasses, everybody mid-motion, nobody posed. Hold the calm.", onScreen:"8g protein · DHA omega-3s from algae oil · calcium + vitamin D"},
      {t:"0:19-0:22", vo:"Music drops out clean on the cut — no sting, no whoosh, no button. Silence under the card.", onScreen:"no top-9 allergens."}
    ],
    audio:"No trending sound — original audio. Build a simple in-post percussion bed at roughly 100 BPM out of the room itself: table taps, a spoon on a bowl rim, a cupboard, a clap, layered so the beat is recognisably kitchen and not library. Every handoff cut lands on the downbeat. Live sound stays punched through the whole relay — the pour, the glass set-down, the overlapping talking, the laugh at the kid's over-pour — those are the texture and the piece is dead without them. Music opens up under the wide table shot at 0:15 and drops out clean on the end-card cut with no sting. Editor's note: the only spoken line in the video is 'that's everybody' at 0:14, and it must stay flat and unperformed — if it reads as a line, recut to the take where it doesn't. If the platform's Commercial Sounds library still carries a charting relay-format track at post time, it may be swapped in over the original bed — commercially licensed sounds only on the brand account, never a personal-use sound.",
    duration:"0:22",
    cta:{soft:"save this for the next big Saturday morning at your house.", medium:"tag the person who always ends up doing the 9am shift.", strong:"pour Willa's Kids for the whole table — 8g protein, DHA omega-3s from algae oil, calcium and vitamin D, free of the top 9 allergens."},
    benefitShorthandId:"BS-6"
  },
  {
    id:"AUG24-IG-F1",
    platform:"IG Feed",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Multi",
    dnaPattern:"on-pack-checklist",
    timing:"Sat Aug 29 · 11am",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"nothing in our fridge gets to do just one job.\" — the versatility argument, told as one real week of mornings",
    intel:[
      {type:"TREND", text:"T-9: the country's largest grocery door reported US comparable sales up 2.6% on Aug 20, 2026 — its slowest comparable-sales pace in years — while total revenue still climbed on e-commerce, advertising and membership, and the volume that actually grew inside grocery was pantry and fresh food. Its CEO's own read was that customers 'tell us they're still feeling some pressure.' The useful inference for a premium clean-label carton is not a pricing inference: shoppers under pressure are still putting real food in the basket, they have just started interrogating what each individual item earns its place with. That interrogation is the brief — and the answer Willa's gives is versatility, how many jobs one carton covers, never money. INTERNAL ONLY: the retailer, the 2.6% comp, the revenue figure, the grocery-inflation number, the rollback count and the CEO quote never appear in a caption, hook, overlay or card. Per the audience-outsider rule, earnings data is why-now context for us and irrelevant to the reader — it converts into 'here is what this carton actually covers in your week,' nothing more."},
      {type:"TREND", text:"T-8: a survey of 2,000 US adults published Aug 17, 2026 and picked up in business press Aug 20, 2026 found two-thirds agree that the fewer ingredients something has the more they trust it, and 43% admit they struggle to pronounce common ingredients. The finding under the headline is the one that shapes this brief: the two ends of the age range — Gen Z and Boomers — both rank 'not over-processed' as their top priority, while the demographic in the middle ranks protein content first. A 22-year-old and a grandparent are arriving at the same standard from opposite directions. That is a writing instruction, not a stat to publish: every line of this caption has to land on both of them, which means plain nouns, real kitchen objects, no wellness dialect and no protein-first framing. INTERNAL ONLY: no survey, no percentages, no generational labels, no 'Gen Z' or 'Boomers' in consumer copy — the reader should simply recognise themselves without being told which cohort they are."},
      {type:"COMPETITOR", text:"C-2: warehouse-club price tracking across 641+ locations shows a private-label organic oat beverage six-pack logging at roughly $9.79–$9.99 through Aug 24, 2026, down about 20% from an earlier list price. Private label cutting an organic oat SKU by a fifth, in the same week the biggest grocery door leans on thousands of rollbacks to hold share, means the value-seeking bulk household is being actively courted by the quietest competitor in the set — the one that never has to run a campaign. Willa's does not answer a price move with a price move. The counter is worth: what a carton contains and how many jobs it covers, which a bulk pack cannot structurally match. INTERNAL ONLY — this is pricing intelligence and it is radioactive in consumer copy: no private label, no warehouse club, no retailer, no dollar figure, no cost-per-serving, no 'cheaper than,' no promo, no discount, no coupon. If a single money word reaches a card, this brief has failed."},
      {type:"AUDIENCE", text:"This is the REVIEWS/RECS pillar in its Relatable Confession register — Partake Foods' cart-full warmth, not Olipop's crassness. The confession is that everyone has quietly started auditing the fridge door, and the joke is tender and shared, never aimed down at the buyer: we are all in this kitchen together. The house rule to hold is one use per card, no stacking, and no nutrient checklist — lane discipline: AUG24-IG-R2 owns nutrient density per glass this week and is the only brief allowed to tick protein, fiber and sugar as an overlay stack, while AUG24-TT-4 owns the whole-table Kids payload (8g protein, DHA, top-9-allergen-free) on the Saturday-morning relay. This brief carries its nutrition in the caption body only and keeps every on-card tick on a USE. It also must not open a back-to-school door of any kind — that lane closed after four consecutive weeks."}
    ],
    hooks:[
      {text:"nothing in our fridge gets to do just one job.", recommended:true},
      {text:"the coffee, the bowl, the blender, the batter, the pan. same carton.", recommended:false},
      {text:"we ask a lot more of the fridge door than we used to.", recommended:false},
      {text:"the same four ingredients, no matter what you're making.", recommended:false}
    ],
    caption:"Willa's Original pours into the coffee, the oats, the blender, the batter and the pan — and it's the same four organic ingredients every single time. 🌾\n\nNothing in our fridge gets to do just one job. Everything in that door is getting looked at harder than it used to be: what's actually in it, and how many mornings it's going to show up for.\n\nFair question to ask a carton. Ours answers plainly — organic whole grain oats, filtered water, organic vanilla extract, sea salt. 1g sugar, all of it from the oats. 4g+ protein and 2g+ prebiotic fiber per cup, because whole oat groats go in, bran and germ still attached, instead of oat syrup.\n\nSo it never turns into a different decision at every use. Hot, cold, blended, whisked, simmered. One ingredient list. Six different jobs. No asterisks. The Kids carton beside it does the same for the shortest person at the table.\n\nNothing in our fridge gets to do just one job. Willa's Original doesn't either.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#cleaningredients",
      "#labelcheck",
      "#realfood",
      "#plantmilk",
      "#kitchenstaple",
      "#morningroutine"
    ],
    visual:"Static IG Feed carousel, 8 cards — one card front-loads the claim, six cards are one use each and never two, one card closes on the ingredient list. Palette is flat cream (#FAFAF7) as the ground, navy (#202A44) for all type, and purple (#A191B2) reserved for exactly one accent per card and never a full line. Shoot rule that governs everything: these are real kitchen stills, not styled flat-lays. One actual home kitchen, one real morning, one camera, available window light only — no diffusion, no gels, no reflector, no filter, no props carried in. Leave the crumbs, the coffee ring, the dish towel where it fell, the second mug nobody has cleared. Hands only, no faces, no talent, no founder. Every frame is warm and bright, not moody — Christina's brief is trend-forward and colourful, so let the counter, the fruit, the batter and the cartons carry actual colour rather than shooting everything beige. CARD 1 is pure typography on cream, no product at all: the hook set large and left-aligned with a lot of air around it — 'nothing in our fridge gets to do just one job.' — with the words 'one job' the only ones in purple. Nothing else on that card. CARD 2, THE COFFEE: shot down at about 45 degrees over a chipped mug of black coffee on the counter, a hand tilting Willa's Original in from frame right, the pour caught mid-bloom while the swirl is still opening. Carton label readable, at least 30% of frame. Small navy overlay bottom-left: 'the coffee ✅'. CARD 3, THE BOWL: straight-down over a bowl of oats or cereal with the milk already in and the spoon abandoned at an angle, one blueberry off to the side on the counter. Carton standing just inside the top of frame. Overlay bottom-left: 'the bowl ✅'. CARD 4, THE BLENDER: eye-height, straight-on, blender jar half-loaded — frozen banana, a handful of berries, oats — with the carton mid-pour into the jar and the level visibly dropping. Overlay bottom-left: 'the blender ✅'. CARD 5, THE KID'S GLASS: a short heavy glass on a kitchen table, poured from Willa's Kids, a small hand entering from the edge of frame to take it — hand only, no face, cast household, never a founder's family member. Kids carton label-forward behind the glass. Overlay bottom-left: 'the kid's glass ✅'. CARD 6, THE BATTER: overhead into a mixing bowl mid-whisk, pancake batter still streaky and not fully combined, carton open on the counter beside the bowl with the cap sitting next to it. Overlay bottom-left: 'the batter ✅'. CARD 7, THE PAN: low and close over a warm skillet, a splash going in from a measuring cup, steam catching the window light, the carton soft in the background but identifiable. Overlay bottom-left: 'the pan ✅'. CARD 8 is the end card and it is deliberately quiet: Willa's Original and Willa's Kids standing together on a windowsill in late-morning light, cream negative space above them, and the four ingredients set SMALL in navy on two lines — 'organic whole grain oats · filtered water' / 'organic vanilla extract · sea salt' — with the BS-1 stinger beneath in purple: 'The whole oat. Not the syrup.' Hard rules for the designer and the shooter. Cards 2 through 7 must feel like six moments from ONE morning in ONE kitchen — same counter material, same light direction, same camera height family — or the carousel reads as stock and the whole argument collapses. No card carries more than one line of copy except CARD 8. The tick overlays are USES, never nutrients — no nutrition ticks anywhere in this carousel, that column belongs to the sibling Reel this week. Absolutely nothing in any frame that reads as money: no price tag, no shelf-edge label, no receipt, no coupon, no sticker, no cost-per-serving math, no 'that's only —' overlay. No retailer signage, no store interior, no shopping cart, no bulk multipack, and no other brand's packaging anywhere in frame, including out of focus in a background fridge shelf — turn labels away or clear the shelf before rolling. No infographic arrows, no charts, no comparison table, no badge grid, and no card that counts the ingredient list or invites the reader to count it. No sunset-over-a-grain-bowl affirmation styling. If a frame looks like a catalogue, reshoot it messier.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"tell us the seventh use you'd have added to the carousel.", medium:"keep Willa's Original in the door — it covers the coffee, the bowl, the blender, the batter and the pan.", strong:"pour Willa's Original all week: organic whole grain oats, filtered water, organic vanilla extract, sea salt — 1g sugar from the oats, 4g+ protein, 2g+ prebiotic fiber per cup, certified organic and certified glyphosate-free, tested every lot."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG24-TT-6",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Multi",
    dnaPattern:"before-after-stitch",
    timing:"Sun Aug 30 · 11am",
    priority:"STANDARD",
    rideNow:true,
    concept:"\"the only thing on the shelf that made it to september.\" — the end-of-summer fridge turnover, told on one shelf",
    intel:[
      {type:"PULSE", text:"CP-9: a six-year streaming series released its fifth and final season globally on Aug 20, 2026 — all ten episodes at once — and coverage dated Aug 21, 2026 reported it debuted at a series-high review score, making it one of the most-discussed streaming moments of the Aug 17–24 window. What the engine is actually harvesting is not the show, it is the FEELING the platform spent the week in: last summer, the group scattering, the end of a run that started when the audience was younger. That feeling has nowhere to land, and this brief hands it a physical object — a fridge shelf in the last week of August. HARD LINE / INTERNAL ONLY: the show is never named, quoted, captioned, hashtagged, stitched, sound-borrowed, or visually referenced — no still, no clip, no character, no actor, no location, no colour-grade homage, no 'iykyk' in the comments from the brand account. If a viewer can identify the show from this video, the brief has failed. The register is season change, not fandom, and there is no rights posture here to fall back on."},
      {type:"PULSE", text:"CP-8: a platform report dated Aug 22, 2026 found the clearest structural pattern of the week is front-loading — opening on-screen text states the entire situation in one flat sentence in the first frame, not as a teaser, and the video then supplies the proof or the payoff. No slow build, no withheld reveal. That is the opposite instinct to most reveal-led food editing, and it is why the whole claim ('one shelf, cleared, and one thing that stays') sits in frame one here instead of arriving at 0:15. INTERNAL ONLY: this is an edit instruction, never a talking point — nothing on screen or in the voiceover may reference structure, the algorithm, 'the trend,' or how the video is built. Lane discipline: TT-3 and TT-5 own the week's two explicit meme rides; this brief borrows a structural habit only and must not read as a format bit."},
      {type:"AUDIENCE", text:"GREEN SHOOT TWO — the adult non-parent Willa's drinker, an audience this slate almost never addresses directly. Standing corpus flags it as an unclaimed lane alongside the end-of-summer fridge turnover; both are live in this exact window (the wider category visibly flipped toward autumn on Aug 19 and again on Aug 25). This person buys Willa's for their own coffee and their own bowl, sees every parenting beat in the feed sail past them, and has never been spoken to in their own voice. Confession register is the entry point: the annual fridge clear-out is a household ritual with no diet attached and no kids required. NEXT MOVE (this is the measurement, not a nice-to-have): watch the comments for 'no kids and I drink this' replies through Sept 3. If they land in volume, brief a September follow-up written for that drinker specifically. INTERNAL ONLY: never say 'for adults' or 'not just for kids' on screen — the targeting is done by casting the shelf, not by announcing the audience."},
      {type:"TREND", text:"Category backdrop, context only: fall flavour season opened across national coffee menus on Aug 19 and again Aug 25, and the grocery shelf turns orange behind it — which is exactly why an ordinary fridge shelf reads as a calendar this week without a single autumn prop in frame. LANE DISCIPLINE, ENFORCE IT: TT-1 owns the fall-flavour category critique and the in-store reset; IG-F1 owns household worth and versatility across a week of mornings; IG-R2 owns nutrient density per glass. This brief owns the switch arc on one shelf and nothing else — no syrup critique, no cost-per-serving or worth math, no versatility montage, no label-count card. INTERNAL ONLY: no chain, retailer, private label or competitor is named, shown, implied, or left legible on a bottle in frame; every non-Willa's item on the BEFORE shelf must be unbranded or label-turned. No pumpkin, no orange leaves, no cinnamon-stick styling — the season change is carried by what leaves the shelf, not by what is dressed onto it."}
    ],
    hooks:[
      {text:"every august ends the same way: one shelf, cleared, and one thing that stays.", recommended:true},
      {text:"the last week of august, the fridge door starts telling on you.", recommended:false},
      {text:"half a lime, something neon, two bottles nobody's finishing — and one thing worth keeping.", recommended:false}
    ],
    caption:"Four things on the ingredient list, and none of them go out of season. 🌾\n\nConfession: we do this every year. The last week of August, the fridge door starts telling on us — half a lime going dry, something neon nobody's finishing, two bottles of the drink we swore by in June.\n\nSo we clear the shelf. And the only thing on the shelf that made it to September is the carton.\n\nWilla's Original is organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar, and the oat put it there. Made from the whole oat groat, so the protein and the fiber never get strained out along the way.\n\nIt was in the iced coffee all summer. It'll be in the mug come October, with Willa's Chocolate moving up the shelf beside it. That's the only thing about this that changes.\n\nNothing on this shelf is auditioning for a second time.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#fridgerestock",
      "#restockmyfridge",
      "#endofsummer",
      "#cleaningredients",
      "#fouringredients",
      "#plantmilk"
    ],
    visual:"One fridge shelf, one locked frame, and the entire story is what leaves it. Shoot in a real kitchen, not a set: a normal fridge with a normal amount of wear, door open, camera on a tripod at shelf height and square to the shelf so the BEFORE and AFTER read as the identical rectangle — if the frame drifts even slightly between the two states the switch dies, so mark the tripod feet with tape and do not touch the head between setups. Light it with the fridge's own bulb as the key plus one soft bounce from camera-left just strong enough to keep the shadows readable; the interior should look cool and slightly clinical against a warm kitchen edge at the frame's border, because that temperature split is the only 'season' cue in the piece. Palette is cream (#FAFAF7) and navy ink (#202A44) for all typography, with the creamy blue (#73B2C9) spent exactly once, on the single overlay about the thing that stays. BEFORE state, dressed with real end-of-August debris and nothing styled: a cut lime with a dry, papery face; a bottle of something neon with maybe two inches left; two identical bottles of a summer drink, both unopened, both dusty at the shoulder; a takeout condiment packet; a wilting bunch of herbs still in its rubber band. Every one of those items is either unbranded, decanted, or turned label-away — no legible brand on the shelf but Willa's, ever, and absolutely nothing dairy in frame at any point, including in the door racks and the background shelves, so clear those too before rolling. Beat one is a cold open on the dressed shelf with the full claim already typed across the top third in navy, three lines maximum, appearing before the first frame finishes — no title card, no logo sting, no build. Then a single hand enters from camera-right and removes the items one at a time, unhurried, each removal its own small beat with a real sound, until the shelf is bare; shoot this as one continuous take rather than cuts, because the rhythm of a person actually doing this is the whole charm and a cut makes it look staged. Hold the empty shelf for a full beat of silence — that pause is the emotional centre of the video and the edit will want to trim it, so protect it. AFTER state, same frame, rebuilt in a few seconds of real time: the hand sets back a few honest September things — a jar of something homemade, a bunch of grapes, a small stack of eggs, apples — and then Willa's Original goes back to the exact spot it occupied in the BEFORE shelf, which the viewer should recognise without being told, with Willa's Chocolate placed beside it as the only new arrival. Final move is a slow two-second push-in from the wide shelf to the two cartons, the only camera move in the piece. On-screen text is one clean line at a time, lower third, navy on a soft cream slab, never stacked more than two deep and never on screen during the silent empty-shelf beat. End card is a plain cream frame, navy type, no motion: 'The whole oat. Not the syrup.' held 1.5 seconds with the Willa's wordmark bottom-centre. No talent on camera beyond a pair of hands, no faces, no voices in frame, no seasonal props, no autumn leaves, no pumpkins, no cinnamon sticks, no calendar, no clock, and nothing on screen that could identify a television show, a soundtrack or a piece of fandom.",
    script:[
      {t:"0:00-0:03", vo:"okay. confession. we do this every single year.", onScreen:"every august ends the same way: one shelf, cleared, and one thing that stays."},
      {t:"0:03-0:07", vo:"the last week of august, the fridge door starts telling on us.", onScreen:"the last week of august"},
      {t:"0:07-0:12", vo:"half a lime. something neon. two bottles of the drink we swore by in june and haven't touched since.", onScreen:"june's whole personality"},
      {t:"0:12-0:15", vo:"so we clear it. we clear it every year.", onScreen:"(silence — no text over the empty shelf)"},
      {t:"0:15-0:18", vo:"and every year, one thing goes back exactly where it was.", onScreen:"the only thing on the shelf that made it to september"},
      {t:"0:18-0:21", vo:"four ingredients. one gram of sugar, and the oat put it there. iced all summer, warm in a mug come october.", onScreen:"Willa's Original · 4 ingredients · 1g sugar from the oats"},
      {t:"0:21-0:23", vo:"same carton. new month.", onScreen:"The whole oat. Not the syrup."}
    ],
    audio:"No trending sound, original audio. Sound design is the shelf: close-mic the fridge so the door seal, the compressor hum and the glass-on-wire-rack contact of each item being lifted out are all audible — those removals are the only percussion in the first twelve seconds. Voiceover is warm narrative, off-camera, first-person-plural, recorded close and slightly under-projected so it reads as an admission rather than a read; unsentimental, no smile in the voice, no upspeak, no 'so cute' energy. Absolutely no music under the clear-out. A single sustained warm chord may enter only on the push-in to the two cartons and resolve on the end card. Editor's note: leave the full beat of silence on the empty shelf — it is the joke and the feeling at the same time. Do not use a licensed track, a show soundtrack, a nostalgia edit sound, or any audio that carries a title card.",
    duration:"0:23",
    cta:{soft:"send this to whoever cleared your shelf last august.", medium:"keep Willa's Original in the door — iced in august, warm in the mug come october.", strong:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar from the oats."},
    benefitShorthandId:"BS-1"
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
  {icon:"↑", title:"\"every shelf in here got a fall version. this one didn't need one.\" opens the week Wed Aug 26 at 9am, shot as one continuous walk through a store mid-reset.", reason:"Two national coffee menus flipped to pumpkin, spice and tiramisu six days apart — Aug 19 and Aug 25 — and the grocery shelf turns over behind them. Every brand in the category will spend September proving it can flavor something, which leaves exactly one argument unclaimed: subtraction. No autumn edition, no limited run, four ingredients that read the same in September as in June. It also carries the week's structural bet — the entire claim sits in on-screen text at frame one and the video spends every remaining second proving it, because front-loaded posts out-completed withheld reveals across the AUG 17 – AUG 23 slate. Guardrails: no chain, no menu item, no competitor in script, overlay or caption, no pumpkin-spice costume bit, and no claim that this beats a seasonal drink on taste.", agent:"trend"},
  {icon:"↑", title:"The sugar number goes on record Thu Aug 27 at 9am, in the first of the reserved on-camera slots — \"our sugar number has nothing standing behind it.\"", reason:"A front-of-pack sugar claim became a litigation surface this window, and the mechanism is public: FDA guidance lets allulose sit outside both the Total Sugars and the Added Sugars figures, so a product can be sweetened and still clear a sugar-free claim. Willa's never built the workaround, and saying so plainly is worth far more now, while it is a brand choice, than later when it reads as a legal position. The stance is the payload, which is the documented founder-POV exception to hands-over-faces. Hard lines: no brand, no plaintiff, no case, no accusation, no 'toxic' or 'chemicals', the sweetener glossed in under ten words, and Willa's is never described as sugar-free — it is 1g, and the honesty of the number is the entire point.", agent:"editor"},
  {icon:"↑", title:"Gameday morning gets claimed for the first time — \"kickoff's at noon. the hard part is at nine.\" runs Sat Aug 29 at 10am.", reason:"Eight games run from a noon kickoff into the night on Aug 29, the first football Saturday of the year, and the brand has never posted into that day. The category reads gameday as a beer-and-chips occasion, which leaves the morning shift — a full house, a loud kitchen, everybody fed before anyone leaves — completely unowned. It rides the group-relay format documented live this window: one carton passed hand to hand, one pour per person, every cut on the beat. Kids is the flavor because it is the only one that feeds a whole table on one pass. No tailgate, no stadium, no team, no logo, no school, and nobody watches a game on camera — the game is why the kitchen is busy, nothing more.", agent:"composer"},
  {icon:"↑", title:"The week's meme slot goes to a two-clip rhyme where the second clip undoes the first — and it is the only Barista brief on the board.", reason:"Six meme formats were on the table and five were structurally unusable: three were near-neighbours of things already burned in the last six weeks, and one required a real family member on camera, which the brief rules forbid outright. The one that survived has a hard reversal built into its mechanic, which is the rarest thing in a meme — a slot the product can occupy without being announced. Clip one, a pour that swirls and holds in hot coffee. Hard cut, identical framing, clip two, the average barista oat milk flecking and separating. The payload lands only in the end card. The comparison clip uses an unlabelled glass and the approved 'average barista oat milk' framing, never a real carton, and the claim is no rapeseed and no canola — never 'seed-oil free,' because Barista contains organic high-oleic sunflower oil.", agent:"pulse"},
  {icon:"↓", title:"\"fewer ingredients, more trust\" got demoted from a headline to supporting proof — the brief was rebuilt on the generational fork underneath the survey.", reason:"A survey of 2,000 US adults published Aug 17 found two-thirds trust a shorter ingredient list more, and 43% struggle to pronounce common ingredients. The obvious brief — count the lines, flip the carton — is dead on arrival: that lane ran twice on Aug 17 alone, plus Jul 20, Jul 13 and Aug 3, and the corpus rests it as a headline. The finding worth keeping was underneath: Gen Z and Boomers both rank 'not over-processed' first while the demographic in the middle ranks protein content first. Two ends of the age range arriving at the same standard from opposite directions is a writing instruction, not a statistic — plain nouns, real kitchen objects, no wellness dialect, and no cohort labels anywhere in consumer copy.", agent:"hook"},
  {icon:"×", title:"Back-to-school stays at zero for a second straight week — including a genuinely strong, measured, in-window school-food story.", reason:"A district finished a four-year move off pre-packaged trays to scratch-cooked, self-serve meals across all 57 of its elementary schools, with a university study finding students at open-tray stations eat 30% more entrees and 30% more vegetables. Real, dated Aug 21, measured, and squarely in the real-food lane. Killed anyway: back-to-school has now run four consecutive weeks, every honest translation of this story is a school-food brief, and running it makes this week five. The parenting slots went to a Saturday kitchen and a make-ahead pan instead, both of which stand in rooms that have nothing to do with a school building. Banked for a September re-entry once the lane has actually rested.", agent:"editor"},
  {icon:"×", title:"A heart-health coffee story that read perfectly in-window — and was a month old under the byline.", reason:"Coverage dated Aug 18 carried national guidance on caffeine and cardiovascular risk, with added sugar and syrup named as the thing that cancels the benefit. It would have made a clean contrast against the fall syrup cycle. It fails twice. The Aug 18 piece is coverage; the underlying scientific statement published Jul 20, which is a month-old paper wearing an in-window date — exactly the trap the published-versus-covered check exists to catch. And the lane is already spent: heart doctors on coffee versus energy drinks ran Jul 27. Held as internal context for the fall-syrup contrast and nothing more.", agent:"trend"},
  {icon:"×", title:"A structurally fresh caption format — killed on paraphrase adjacency, one week after the same emotional move already shipped.", reason:"The format plays an ordinary local reality as a badge rather than an apology, over ordinary footage, and it is genuinely new this window. But the beat underneath it — an unglamorous personal reality worn proudly, played straight — is the same move as the quiet-flex one-liner that ran Aug 17 and drove a pin. One week apart, same register, different words. Christina would clock it inside a second, and the mechanical repeat check would not, because not a single phrase overlaps. Two other candidates went the same way: a nostalgia-cut format that structurally requires a real parent on camera, and a group-chat parenting fight that would put the brand in the position of refereeing somebody else's kid.", agent:"pulse"},
  {icon:"⚡", title:"The ambassador slot goes unspent this week on purpose — and gameday morning is the door it opens into next.", reason:"The format that carried the last ambassador brief was a real cart with five things someone refuses to cheap out on, and that shopping-list build is rested along with the whole consumer-vigilante lane it came from. Rather than force a creator into a policy brief or a meme ride, the slot stays empty and the twelve-brief slate runs tighter. The queued door is the Saturday morning kitchen: a creator with a full house on Aug 29 is a far better fit than a creator holding a carton in an aisle, and the occasion will still be live every Saturday through the fall rather than dying with a news peg.", agent:"amb"},
  {icon:"⚡", title:"Amplification concentrates on four briefs and $1,150 — and the founder sugar brief deliberately receives none of it.", reason:"The largest share goes behind the in-store walk, because the AUG 17 – AUG 23 read was that a plainly-shot post with no argument in it travels on cold audiences while a position lands soft on people who have never met the brand. Gameday morning takes the second-largest share as a genuine audience test in an occasion the brand has never bought into. The make-ahead pin takes the smallest and the longest flight, because Pinterest saves are the only number here that keeps compounding after a news peg dies. The sugar brief gets zero on purpose: paying to push a claim adjacent to live litigation into cold comment sections is how a calm post becomes a fight, and the organic version of it is the version that works.", agent:"paid"}
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
  total:25940,
  lift:68,
  sessions:2184,
  topRoiFormat:"One-take founder answer with the claim stated in the first sentence (peaked AUG 17 – AUG 23)",
  topRoiPerBrief:2870,
  source:"Shopify + Klaviyo"
};

const AGENT_BY_ID = Object.fromEntries(AGENTS.map(a=>[a.id,a]));

// ─── Brief ↔ source links (the threading) ─────────────────
const BRIEF_LINKS = {
  "AUG24-TT-1":{
    trends:[
      "T-1"
    ],
    pulse:[
      "CP-8"
    ],
    comps:[
      "C-1"
    ]
  },
  "AUG24-IG-R1":{
    trends:[
      "T-4"
    ],
    pulse:[],
    comps:[]
  },
  "AUG24-TT-3":{
    trends:[],
    pulse:[
      "CP-1"
    ],
    comps:[]
  },
  "AUG24-TT-2":{
    trends:[
      "T-5",
      "T-6"
    ],
    pulse:[],
    comps:[]
  },
  "AUG24-PIN-1":{
    trends:[
      "T-1"
    ],
    pulse:[],
    comps:[]
  },
  "AUG24-IG-R2":{
    trends:[
      "T-7"
    ],
    pulse:[
      "CP-5"
    ],
    comps:[]
  },
  "AUG24-TT-5":{
    trends:[
      "T-2"
    ],
    pulse:[
      "CP-3"
    ],
    comps:[]
  },
  "AUG24-PIN-2":{
    trends:[
      "T-3"
    ],
    pulse:[],
    comps:[]
  },
  "AUG24-IG-R3":{
    trends:[
      "T-10"
    ],
    pulse:[
      "CP-6",
      "CP-10"
    ],
    comps:[
      "C-3"
    ]
  },
  "AUG24-TT-4":{
    trends:[
      "T-3"
    ],
    pulse:[
      "CP-2"
    ],
    comps:[]
  },
  "AUG24-IG-F1":{
    trends:[
      "T-9",
      "T-8"
    ],
    pulse:[],
    comps:[
      "C-2"
    ]
  },
  "AUG24-TT-6":{
    trends:[],
    pulse:[
      "CP-9",
      "CP-8"
    ],
    comps:[]
  }
};



// ─── Paid Amplify Plans (Paid Media Planner output) ──────
const AMPLIFY_PLANS = {
  "AUG24-TT-1":{
    headline:"The pour that didn't get a fall version — the largest spend, behind the post with no argument in it",
    why:"This is the biggest budget on the board and it sits behind a video that never argues with anybody. The AUG 17 – AUG 23 read was specific: a plainly-shot post with the claim stated up front travels on people who have never met the brand, while a position lands soft on them and only really works on people who already agree. This brief is the first kind. Somebody who has never heard of Willa's watches a hand walk past a shelf going orange, hears four ingredients said out loud, and watches one pour — and the entire seasonal argument is made without a single comparison. It is also the most durable creative of the week: nothing in it expires when the fall news cycle does, which means a winning ad here can run into September. Nothing in the copy or targeting names a chain, a menu item or a competitor, and nothing claims this tastes better than a seasonal drink.",
    totalBudget:380,
    testWindow:"6 days (Wed Aug 26 → Mon Aug 31)",
    objective:"Profile visits + Saves",
    guardrail:"Auto-pause on any comment thread that turns into a pumpkin-spice pile-on or names a coffee chain — the moment this reads as an attack on somebody's seasonal drink, the calm that makes it work is gone. Also pause if sentiment falls below 0.90 or CPM clears $10.",
    placements:[
      {platform:"TikTok", format:"In-feed Spark Ad", budget:230, reach:"~26-34K reach", expectedReach:"~26-34K reach", audience:"Cold interest — grocery hauls, clean label, ingredient-first shoppers, coffee-at-home, 25-45, US", note:"Spark the organic post rather than a fresh upload. The comments under a store walk are people naming their own shelf, and that is half of why the video reads as true."},
      {platform:"Meta", format:"Reels + Stories, Advantage+ placements", budget:150, reach:"~17-22K reach", expectedReach:"~17-22K reach", audience:"Cold interest — organic grocery, label-reading shoppers, women 28-48, US; plus 90-day site visitors", lookalike:"1% LAL of purchasers", note:"In plain terms: this is the introduction post for the fall. Most of the money is on people who have never met the brand, because the argument only needs twenty seconds and no prior knowledge."}
    ]
  },
  "AUG24-TT-4":{
    headline:"Gameday morning — a real audience test in an occasion the brand has never bought into",
    why:"Second-largest budget, and it is buying an answer as much as reach. Willa's has never posted into gameday and has certainly never paid into it, so there is no historical read on whether the household that is up at nine on a football Saturday is a Willa's household. This is the cheapest possible way to find out, in the single highest-attention weekend of the occasion's year: eight games running from noon into the night on Aug 29, and several million kitchens busy before any of them start. The creative is a loud table and one carton going hand to hand, which is a warmth post rather than a claim post, so it carries almost no risk in a cold feed. The flight is deliberately short and front-loaded around the day itself — if the audience is there, the read is unambiguous and the occasion recurs every Saturday through the fall. No tailgate, no stadium, no team, no logo and no school appear in the ad or the targeting.",
    totalBudget:330,
    testWindow:"5 days (Thu Aug 27 → Mon Aug 31), weighted to Fri–Sat",
    objective:"Reach + Saves",
    guardrail:"Auto-pause if the comment section turns into team or rivalry talk — the brand has no side and a reply in that thread is worse than silence. Interest targeting only, no team or league audiences. Pause if sentiment falls below 0.92, which is the bar for anything with kids in frame.",
    placements:[
      {platform:"TikTok", format:"In-feed Spark Ad", budget:200, reach:"~22-29K reach", expectedReach:"~22-29K reach", audience:"Cold — family breakfast, feeding-a-crowd, big-batch cooking, parents 28-45, US, weighted to Fri–Sat delivery", note:"Cold on purpose, and timed. The people planning a big Saturday morning are planning it on Friday, so the delivery curve matters more here than the audience definition does."},
      {platform:"Meta", format:"Reels + Stories", budget:130, reach:"~12-16K reach", expectedReach:"~12-16K reach", audience:"Parents of kids 3-12, kids' nutrition, family meal planning, US; plus existing followers", lookalike:"1% LAL of Kids purchasers", note:"What this means for you: this is the half of the test that tells you whether it is a gameday result or just a Saturday-morning result. Same creative, different room."}
    ]
  },
  "AUG24-IG-R1":{
    headline:"Born 1921, launched 2021 — the heritage answer, funded as warmth rather than as a position",
    why:"The category spent Aug 22 telling a 5,000-year heritage story about itself, with 47,000 people signed up for a seven-day dairy-free run. That is a lot of attention pointed at where plant milk comes from, and it is the one week of the year where a real family answer costs nothing to make and lands on people who are already thinking about the question. The spend is modest and Instagram-only because this is a warmth post, not an argument: a founder, a kitchen, two dates and an ingredient list that never needed updating. It is also the most re-usable asset in the week — nothing in it is pegged to a news event, so a winning version becomes the brand's default introduction video for the rest of the year. Hard line: the grandmother is the origin of the recipe and appears only as story, never as a required participant, and no living family member is asked to be on camera.",
    totalBudget:260,
    testWindow:"7 days (Wed Aug 26 → Tue Sep 1)",
    objective:"Profile visits + Saves",
    guardrail:"Auto-pause if the thread turns into a dairy-versus-plant argument — this post has no opponent and the second it acquires one it stops being a story about a kitchen. Pause if sentiment falls below 0.92.",
    placements:[
      {platform:"Meta", format:"Reels + Stories", budget:260, reach:"~18-24K reach", expectedReach:"~18-24K reach", audience:"Cold interest — heritage cooking, from-scratch baking, organic grocery, women 30-55, US; plus warm retargeting of 90-day engagers", lookalike:"1% LAL of purchasers", note:"No TikTok split on this one. A slow, warm, unhurried family answer is an Instagram object, and splitting a budget this size across two platforms would make it invisible on both."}
    ]
  },
  "AUG24-PIN-2":{
    headline:"The make-ahead pan — the smallest budget and the longest flight, because saves keep paying after the peg dies",
    why:"Pinterest posted the week's lowest reach and its highest save-rate for a fourth straight refresh, and saves there are the only number in the engine that keeps compounding once a news peg is dead. That makes this the cheapest long-term asset on the board: a make-ahead pan for a full house, titled the way a person actually searches for it the night before a big Saturday morning. The peg is Aug 29, but the object outlives it — the same pin is findable every football Saturday through the fall and every holiday morning after that, which is why the flight runs longer than anything else this week on the smallest budget. The recipe uses Kids in the batter and contains no dairy of any kind, per the standing swap rule, and nothing in the copy mentions price, a retailer or a multipack deal.",
    totalBudget:180,
    testWindow:"10 days (Thu Aug 27 → Sat Sep 5)",
    objective:"Saves + Outbound clicks",
    guardrail:"Pause if save-rate falls below the account's trailing Pinterest median — on this surface a low save-rate means the title is wrong, not that the budget is too small, and more money will not fix a title. No dairy substitution ever appears in a comment reply.",
    placements:[
      {platform:"Pinterest", format:"Promoted Standard Pin, keyword + interest targeting", budget:180, reach:"~9-13K reach", expectedReach:"~9-13K reach", audience:"Keyword — make-ahead breakfast, breakfast for a crowd, baked oatmeal, dairy-free kids breakfast, game day breakfast; US", note:"Keyword-led rather than interest-led. On Pinterest the search query is the audience, and this pin exists to be found by someone typing 'breakfast for a crowd' at nine at night."}
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
  {date:"Aug 24, 2026", agent:"trend", msg:"Swept food policy, nutrition science, plant-milk retail, ag reporting and clean-label brand news against an Aug 17 recency floor. Ten trends cleared. The lead is the fall flavor turnover — two national coffee menus flipping to pumpkin, tiramisu and spice six days apart, Aug 19 and Aug 25, with the grocery shelf resetting behind them."},
  {date:"Aug 24, 2026", agent:"editor", msg:"Ran the published-versus-covered check on every study and guidance document before it reached a card. The one that mattered: a heart-health coffee story dated Aug 18 whose underlying scientific statement published Jul 20 — a month-old paper reading as fresh news, and the exact failure mode this check exists for."},
  {date:"Aug 24, 2026", agent:"pulse", msg:"Ran the format, food, discourse and entertainment lanes and cleared ten signals, each with a checkable live example. Six meme formats were live; five failed on paraphrase adjacency to the last six weeks or on requiring a real family member on camera. The one that survived has a hard reversal built into its mechanic, which is where a carton can sit without being announced."},
  {date:"Aug 24, 2026", agent:"comp", msg:"Logged three in-window competitive fronts: the plant-based retreat narrative breaking on Aug 17 as the category's biggest listed player was flagged up 41% on the month, a private-label organic oat six-pack logging roughly 20% off list across 641+ warehouses through Aug 24, and a flavor-bred organic produce brand taking all 490 doors of a natural-channel retailer on Aug 18 with the same no-processing argument one aisle over."},
  {date:"Aug 24, 2026", agent:"editor", msg:"Rolled the burn corpus forward and held back-to-school at zero for a second straight week. A district's scratch-cooked school-food story landed Aug 21 with real measured outcomes and was killed anyway — every honest translation of it is week five of the same lane. Both parenting briefs this week stand in a kitchen on a Saturday."},
  {date:"Aug 24, 2026", agent:"composer", msg:"Built twelve briefs against a three-per-signal cap and opened one occasion the brand has never claimed. The heaviest draw is two on the fall turnover, split so they never restate each other — a store walk that owns the no-seasonal-SKU argument, and a pin that owns the make-it-at-home version and is forbidden from repeating the argument at all."},
  {date:"Aug 24, 2026", agent:"visual", msg:"Spent both reserved on-camera slots against a cap of three — the sugar stance Thu Aug 27 and the heritage answer Wed Aug 26 — and left the third banked. Barista appears exactly once, inside the two-clip contrast, which keeps the latte cap intact. Every Reel and TikTok carries a populated shot list for the phone mockup."},
  {date:"Aug 24, 2026", agent:"hook", msg:"Ran every recommended hook through the wordy-is-wrong test. The sugar brief's opener was cut from a two-sentence explanation to a single flat observation — the longer version explained the labelling rule before it earned the right to, and read as a lecture rather than a founder noticing something."},
  {date:"Aug 24, 2026", agent:"editor", msg:"Flagged and rewrote the one claim that could have sunk the meme brief: an early draft used 'seed-oil free' as the payload. Barista contains organic high-oleic sunflower oil, so the precise claim is no gums, no rapeseed, no canola. A transparency brand overstating a claim by one word loses the argument the whole carton is built on."},
  {date:"Aug 24, 2026", agent:"amb", msg:"No ambassador brief this week, and the slot is empty on purpose. The cart-list format that carried the last one is rested along with the whole consumer-vigilante lane behind it. The queued door is a creator with a full house on a Saturday morning — an occasion that stays live every weekend through the fall rather than dying with a news peg."},
  {date:"Aug 24, 2026", agent:"paid", msg:"Amplification concentrates on four briefs and $1,150. The largest share goes behind the store walk rather than the founder stance, on the AUG 17 – AUG 23 read that a post with no argument in it travels on cold audiences. The sugar brief is deliberately unfunded — paying to push a claim adjacent to live litigation into cold comment sections is how a calm post becomes a fight."},
  {date:"Aug 24, 2026", agent:"perf", msg:"Rolled the AUG 17 – AUG 23 briefs into results. The clearest finding is structural rather than topical: posts that stated the whole claim in the first frame out-completed posts that withheld a reveal, by a wide enough margin to change how four briefs this week are cut. The Pinterest save-object pattern held for a fourth straight refresh."}
];


// ─── Killed signals (the ones we said no to) ──────────────
const KILLED = [
  {signal:"American Heart Association coffee guidance — up to 400mg caffeine of black coffee generally safe and linked to lower cardiovascular risk, with added sugar, syrup and cream noted as counteracting the benefit (coverage dated Aug 18, 2026)", reason:"Nearly shipped as a trend and fails on two independent grounds. The recency is an illusion: the Aug 18 article is coverage, but the underlying scientific statement published Jul 20, 2026 — a month-old paper wearing an in-window date. And the burn corpus already spent the lane; heart doctors on coffee versus energy drinks ran as a Jul 27 pulse entry, which would put the same lane four weeks apart. Held as internal context for the fall-syrup contrast."},
  {signal:"A school district completed a four-year move off pre-packaged lunch trays to scratch-cooked, self-serve meals across all 57 elementary schools, with a university study finding students at open-tray stations eat 30% more entrees and 30% more vegetables (Aug 21, 2026)", reason:"Real, in-window, measured, and squarely in the real-food-versus-processed lane — killed anyway because back-to-school has now run four consecutive weeks and the corpus closes the lane outright for this refresh. Every honest translation of this story is a school-food brief, which makes it week five. Banked for a September re-entry when the lane has actually rested."},
  {signal:"Survey of 2,000 US adults: 66% say the fewer ingredients a snack has the more they trust it, 43% struggle to pronounce common snack ingredients (published Aug 17, picked up Aug 20, 2026)", reason:"The obvious headline — shorter list, more trust, go count the lines — is dead on arrival. Flip-the-carton and count-the-lines ran twice on Aug 17 plus Jul 20, Jul 13 and Aug 3; the corpus rests it as a headline and permits it only as supporting proof. The survey was kept and the trend rebuilt entirely on the generational fork underneath it, where the two ends of the age range converge on 'not over-processed' while the middle buys on protein. That framing has never run."},
  {signal:"Research linking proximity to dollar stores with higher obesity, hypertension, high cholesterol and type 2 diabetes across US metro areas, with researchers pointing to food quality rather than affordability (Aug 18, 2026)", reason:"In-window, single-sourced, and tonally disqualifying. Every version of this brief has a premium clean-label carton commenting on the food available to people shopping where they can afford to shop. That is punching down, it violates the voice compass rule against attacks and preachiness, and it puts the brand on the wrong side of the abundance posture the diet-culture filter exists to protect. No angle rescues it."},
  {signal:"A named creator fronting a national combo meal as part of the Aug 19 fall launch — a creator-led menu collaboration in place of a traditional celebrity endorsement", reason:"A genuinely interesting format signal — a single creator's name now anchors a national menu the way a celebrity used to — but it comes out of the same Aug 19 announcement that drives the week's lead trend. Surfacing both would put one news event on the Category tab and the Pulse tab in the same week, which the zero-overlap rule forbids. Picked the stronger lens and committed. Logged as a watch item for a week when the format has news of its own."},
  {signal:"The 'we can't all be in [glamorous destination], some of us have to hold it down in [your actual town]' caption format, played straight over ordinary local footage (Aug 19, 2026)", reason:"Structurally fresh and a clean fit for the end-of-summer lane, but the beat underneath — an unglamorous ordinary reality worn as a badge rather than an apology — is the same emotional move as the quiet-flex one-liner that ran Aug 17 and drove a pin. One week apart, same tonal register, different words. The mechanical repeat check would pass it because no phrase overlaps. Killed on paraphrase adjacency, not on quality."},
  {signal:"'Me at the same age as my parents' — creators state their current age on screen, then cut to what a parent was doing at that same age (Aug 19, 2026)", reason:"Two failures stacked. The format structurally requires a real parent comparison — photos, milestones, a family member's life as the payload — and the standing rule is that a founder's family is an origin reference, never a required participant in a brief. And the nostalgia-photo-cut mechanic sits adjacent to the childhood-photo beat drop that ran Aug 10. The heritage contrast it would have carried is already served without needing anyone's family album."},
  {signal:"A parent asking a school group chat to stop other families sending a specific packaged cookie, published as a six-part social series and mocked across platforms (Aug 21, 2026)", reason:"Live, loud, and the single most-discussed parenting moment of the window — and there is no version where Willa's takes a side without refereeing somebody else's child's lunch. Kept as pulse context only, with the play written as the opposite picture rather than a comment: a table where nobody has to check whose food belongs to whom. No brief anchors on it, because a brief anchored on it is a brand entering a fight between two parents."},
  {signal:"A national beverage campaign proposing an absurd fake solution to a live public anxiety, fronted by a celebrity and a sold-out novelty object (Aug 19, 2026)", reason:"Kept the mechanic, killed the card. The transferable lesson is real and banked internally — take a live public anxiety and answer it with an absurd, fully-committed fake solution rather than a hot take, so the joke does the persuading instead of a moral. But the subject matter has no translation that survives contact with a parent audience, and surfacing it as a pulse card invites a brief nobody should write. Logged as a humor-mechanic reference, not a signal."},
  {signal:"A matcha liqueur built on ceremonial matcha and oat milk signing national distribution across 47 markets, with shelf rollout Sept 1 (Aug 18, 2026)", reason:"A legitimate category-expansion counter-signal: oat milk keeps gaining credibility as a premium base ingredient even while some players exit ready-to-drink. But it is an alcohol product, Willa's never references alcohol in consumer-facing copy, and the shelf date is outside this window anyway. It stays in the internal read on where oat milk's formulation reputation is heading and goes no further."}
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
  "AUG24-TT-1":{direct:"The pour in September is the same pour as June. 🌾\n\norganic whole grain oats, filtered water, organic vanilla extract, sea salt. that was the list in june. it's the list now. it'll be the list in november.\n\nevery shelf in here got a fall version. this one didn't need one. what makes Willa's Original rich and smooth was never a syrup pump, it was the whole oat groat. most oat milks filter the bran and germ out and process the starch into sugar, and the protein and the fiber leave with it. ours stay. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar, and the oats brought it.\n\nnothing against a season. we just never needed one to make this taste like something.\n\nthe whole oat. not the syrup.", warm:"the end-cap went orange, the menu boards went orange, and somewhere in the middle of all that a carton just sat there reading the same way it read in june. 🌾\n\norganic whole grain oats, filtered water, organic vanilla extract, sea salt. we never built an autumn edition, mostly because there'd be nothing in it to change.\n\nWilla's Original uses the whole oat groat — bran, germ and all — so the protein and the prebiotic fiber stay in instead of getting filtered out. rich, smooth, 4g+ protein, and 1g of sugar the oats brought themselves.\n\nseasons are lovely. ingredient lists don't need them.", punchy:"every shelf in here got a fall version. this one didn't need one. oats, water, vanilla, salt. 🌾 the whole oat, not the syrup."},
  "AUG24-IG-R1":{direct:"four organic ingredients, 4g+ protein, 2g+ prebiotic fiber, and 1g of sugar that comes from the oats. none of that is new. 🌾\n\nChristina, in her kitchen, starting where Willa's starts: a jar of whole oat groats — bran, germ and all, the way steel-cut oats are. most oat milks filter that part out, the fiber and the protein with it, and process what's left into sugar. Willa's keeps the whole oat, which is why it pours rich instead of thin.\n\nWilla is the grandmother the company is named for. she fed people properly, and she noticed the spark in everyone who sat down at her table.\n\nborn 1921. launched 2021. the ingredient list never needed updating.\n\norganic whole grain oats, filtered water, organic vanilla extract, sea salt. certified organic, certified glyphosate-free, tested every lot. 🥛", warm:"\"my grandmother was making oatmeal way before it was cool.\" Christina, in her kitchen, with the jar it all still starts from. 🌾\n\nwhole oat groats — bran, germ and all, the way steel-cut oats are. most oat milks filter that part out; keeping it is why Willa's pours rich instead of thin. four organic ingredients and 1g of sugar, from the oats.\n\nborn 1921. launched 2021. the ingredient list never needed updating. 🥛", punchy:"born 1921. launched 2021. the ingredient list never needed updating. Willa's Original — the whole oat, not the syrup. 🌾"},
  "AUG24-TT-3":{direct:"Willa's Barista goes into hot espresso and comes out one drink. ☕\n\nhot coffee is a lie detector. it finds the shortcut in about three seconds — the swirl breaks up, the flecks come to the surface, and what's in the cup is two things pretending to be one.\n\nthe usual way out of that is gums and rapeseed oil. Willa's Barista doesn't carry either — the whole oat groat is doing the work instead. and at 3g of sugar, it pours about half what other barista oat milks do.\n\nit behaves because of what's in it. not because of a stabilizer added to make it behave.\n\nthe oat milk your coffee deserves.", warm:"one of these pours has aura. the other one is laura. ☕\n\nsame cup, same shot, same three seconds — and only one of them stays a drink. no gums, no rapeseed oil, and it still doesn't fleck.\n\nturns out you don't need a stabilizer to behave in coffee. you need a better oat. shhh… that's the whole trick.", punchy:"hot coffee is a lie detector. ☕ no gums, no rapeseed oil, 3g sugar — and it still doesn't fleck. Willa's Barista."},
  "AUG24-TT-2":{direct:"One gram of sugar, and it came from the oats. Nothing added. 🌾\n\nHere's the part worth knowing. There's a sweetener called allulose — a rare sugar used to sweeten things — and the rules currently let it sit out of the sugar number on a label. It's still printed in the ingredient list. It just doesn't have to be counted.\n\nWhich means a sugar claim on the front of a package can be completely true and still not tell you what you're drinking.\n\nWilla's never had to build around that. Willa's Original is four things: organic whole grain oats, filtered water, organic vanilla extract, sea salt. We use the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled — so the small sweetness that's in there arrived with the grain, not after it.\n\nThat's the whole reason our sugar number has nothing standing behind it. One gram, and you can trace where it came from.\n\n4g+ protein. 2g+ prebiotic fiber. 1g sugar. Read the list.", warm:"One gram of sugar. It came from the oats, and that's the entire story. 🌾\n\nThere's a sweetener out there that's allowed to sit out of the sugar number on a label — still printed in the ingredient list, just not counted in the total. Not a scandal. That's genuinely how the rule reads right now.\n\nWilla's never needed the workaround. Four ingredients, the whole oat, and a number you can follow back to the grain.", punchy:"1g of sugar, and it came from the oats. our sugar number has nothing standing behind it. 🌾"},
  "AUG24-PIN-1":{direct:"Late August turns everything spiced and orange, and the best version of it is a mug you make in four minutes on your own stove. 🍫🍂 One cup of chocolate oat milk, a cinnamon stick, a wide strip of orange peel and enough heat to steam it. Nothing gets pumped into it.\n\nWilla's Organic Chocolate Oat Milk is made with real cacao, organic coconut sugar and five simple organic ingredients for a rich, creamy cup with 50% less sugar than the chocolate milk most of us grew up on — sweet enough that this recipe doesn't need a sweetener of its own. It won Best Beverage at the Good Food Awards. 🥛\n\nThe spice in this one is a spice.\n\nIngredients\n- 1 cup Willa's Organic Chocolate Oat Milk\n- 1 cinnamon stick (or ¼ tsp ground cinnamon)\n- 2 pinches of nutmeg, freshly grated, plus more to finish\n- 1 wide strip of orange peel\n- a pinch of sea salt\n- whipped canned coconut cream to top, if you're making it a whole thing\n\nWarm it all together over low heat for 4 minutes — steaming, never boiling. Pull the peel and the cinnamon stick, pour into the heaviest mug you own, and grate more nutmeg over the top.", warm:"Fall showed up on every menu board with a pump attached. This one takes a saucepan and four minutes. 🍫🍂 Chocolate oat milk, a cinnamon stick, a strip of orange peel, a little fresh nutmeg — and shhh… no sweetener goes in, because the carton already handled that.\n\nWilla's Organic Chocolate Oat Milk is real cacao and five simple organic ingredients, rich and creamy with 50% less sugar than the chocolate milk most of us grew up on.\n\nThe spice in this one is a spice.\n\nIngredients\n- 1 cup Willa's Organic Chocolate Oat Milk\n- 1 cinnamon stick\n- 2 pinches of freshly grated nutmeg, plus more to finish\n- 1 wide strip of orange peel\n- a pinch of sea salt\n- whipped canned coconut cream, optional\n\nLow heat, 4 minutes, steaming not boiling. Pull the peel, pour, grate more nutmeg on top.", punchy:"The spice in this one is a spice. 🍫 Four minutes, one saucepan, nothing pumped into it — spiced hot chocolate made with Willa's Organic Chocolate Oat Milk. Real cacao, five organic ingredients, no sweetener required."},
  "AUG24-IG-R2":{direct:"4g+ protein. 2g+ prebiotic fiber. 1g of sugar, from the oats. four ingredients. that's one glass. 🥛\n\na lot of kitchens are eating differently this year. GLP-1 medicines work on the hormone that tells your body it's full, and when one person's meals change, the grocery list changes for everybody. one person's plate changed. the whole fridge followed.\n\nso the food that's left has to be worth the room it takes up. Willa's is made with the whole oat kernel — bran, germ and all, the way steel-cut oats are — which is why the protein and the fiber are still in the glass instead of filtered out of it.\n\nand it's still not the whole breakfast. put it next to the eggs, the fruit, the toast. no single food was ever supposed to do all of it.\n\nthe ingredient list is four lines long. read it in one breath. 🌾", warm:"one glass, four ticks: 4g+ protein, 2g+ prebiotic fiber, 1g of sugar from the oats, four ingredients. 🥛\n\na lot of kitchens are eating differently this year — one person's plate changed, and the whole fridge followed. when there's less on the counter, what's on it should be worth the room.\n\nWilla's is made with the whole oat kernel, so the protein and the fiber stay in the glass instead of getting filtered out of it.\n\nstill not the whole breakfast, though. that's what the eggs are for. 🌾", punchy:"one person's plate changed. the whole fridge followed. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar from the oats — and it's still not the whole breakfast. 🌾"},
  "AUG24-TT-5":{direct:"Four ingredients. It took a machine about four hundred words to say less. 🌾\n\nwe asked a machine to write an oat milk commercial. it wrote the whole aisle — a protein number nobody could hit, two adaptogens, a third mushroom it refused to name, and the word \"bioavailable\" three times in a row. we read it out loud once, completely straight, and we didn't change a word.\n\nthen we read the label:\n\norganic whole grain oats. filtered water. organic vanilla extract. sea salt.\n\nthat's the whole commercial. Willa's Original is 1g of sugar and it came from the oats, plus 4g+ protein and 2g+ prebiotic fiber — all of it already sitting in the oat before anyone thought to print a number on the front of a box. most oat milks filter the bran and germ out and process the starch into sugar, and the fiber and the protein leave with it. we keep the whole groat, so there's nothing to add back.\n\nwe're not against protein. we're against needing a paragraph to explain a drink.", warm:"the machine gave us adaptogens, a mushroom it wouldn't name, and the word bioavailable. three times. 🌾\n\nwe read every line with a straight face, then read the label out loud in the same voice: organic whole grain oats, filtered water, organic vanilla extract, sea salt.\n\nshhh… that was the whole ad. Willa's Original keeps the whole oat, so there was never anything to add back in.", punchy:"we asked a machine to write an oat milk commercial. it wrote the whole aisle. Willa's Original is still four ingredients. 🌾"},
  "AUG24-PIN-2":{direct:"A full house on a Saturday morning is a math problem you solve the night before. 🏈🌾 One pan of baked oatmeal, cut into squares and stacked, a bowl of whatever fruit is still good, and a few Willa's Kids cartons standing open with straws in — everything within reach on the counter, nothing plated, nobody waiting on a griddle.\n\nWilla's Organic Kids Oat Milk goes into the pan, and a few more cartons from the same 16-pack go straight on the counter. 8g of protein — the same as dairy, with 50% less sugar — plus calcium, vitamin D, and DHA omega-3s that come from algae oil. It's free of the top 9 allergens, so every carton in the pack is safe for any kid at the table and nobody has to stop and read the label first. 🥛\n\nNobody's cooking to order on a game morning.\n\nIngredients\n- 3 cups organic old-fashioned rolled oats\n- 2½ cups Willa's Organic Kids Oat Milk\n- 2 very ripe bananas, mashed\n- ⅓ cup pure maple syrup\n- ¼ cup Country Crock Plant Butter, melted (olive oil works too)\n- 2 tbsp ground flaxseed + 5 tbsp water, stirred and left to sit 5 minutes\n- 2 tsp baking powder\n- 1½ tsp cinnamon\n- 1 tsp vanilla extract\n- ½ tsp sea salt\n- 1½ cups blueberries\n- ¼ cup pumpkin seeds, for the top\n\nThe night before: stir everything except the blueberries and seeds together in one bowl, fold the blueberries in last, spread it into a 9x13 greased with plant butter, scatter the seeds over the top, cover and refrigerate. In the morning: bake at 375°F for 40–45 minutes, until the edges pull away and the middle is set. Rest 10 minutes, cut into 12 squares, stack them on the board, and set a few more Willa's Kids cartons alongside, straws already in — everything within arm's reach.", warm:"One pan, made the night before, and Saturday morning takes care of itself. 🏈 Baked oatmeal cut into squares and stacked, fruit in a bowl, a few Willa's Kids cartons standing by with straws in — nobody's cooking to order on a game morning.\n\nWilla's Organic Kids Oat Milk carries 8g of protein (same as dairy, half the sugar), calcium, vitamin D, algae-oil DHA omega-3s, and none of the top 9 allergens — which is the whole reason every carton in the box is safe to hand to any kid at the counter. And shhh… the grown-ups take a square too. 🌾\n\nIngredients\n- 3 cups organic old-fashioned rolled oats\n- 2½ cups Willa's Organic Kids Oat Milk\n- 2 very ripe bananas, mashed\n- ⅓ cup pure maple syrup\n- ¼ cup Country Crock Plant Butter, melted\n- 2 tbsp ground flaxseed + 5 tbsp water\n- 2 tsp baking powder · 1½ tsp cinnamon · 1 tsp vanilla · ½ tsp sea salt\n- 1½ cups blueberries + ¼ cup pumpkin seeds\n\nAssemble at night, bake at 375°F for 40–45 minutes in the morning, cut into 12.", punchy:"One pan the night before. Twelve squares, a bowl of fruit, and a carton for every kid at the counter — 8g protein, no top-9 allergens. Nobody's cooking to order on a game morning. 🏈🌾"},
  "AUG24-IG-R3":{direct:"creamy is not something we add. it's the part of the oat we don't take out. 🌾\n\noats come off the field in august as whole groats — whole oat kernels, like steel-cut oats before they're rolled, bran and germ still on them. most oat milks filter that part off and turn what's left into sugar. we keep the whole thing, which is the only reason it pours thick instead of thin.\n\nyou can taste the part most oat milks leave behind.\n\nWilla's Original is four organic ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber, and 1g of sugar that came from the oats.\n\nthe whole oat. not the syrup.\n\npour it cold and see. 🥛", warm:"a whole oat groat, in the light, on its way to a glass. 🌾\n\nit's the whole kernel — bran, germ and all, like steel-cut oats before they're rolled. most oat milks filter that off. we didn't, and that's the entire reason Willa's Original pours rich instead of thin.\n\nyou can taste the part most oat milks leave behind. shhh… it was never a secret, it's on the label. 🥛", punchy:"you can taste the part most oat milks leave behind. Willa's Original — the whole oat, not the syrup. 🌾"},
  "AUG24-TT-4":{direct:"Eight grams of protein, poured six times, out of one carton. 🏈\n\nThe first football Saturday of the year is Aug 29 and kickoff is at noon — which means the real event is at nine, in the kitchen, getting a whole house fed before anybody gets in a car.\n\nWilla's Kids is built to go all the way around a table like that. 8g protein — same as dairy, 50% less sugar. DHA omega-3s from algae oil, calcium and vitamin D. Free of the top 9 allergens, so the carton doesn't stop when it gets to the kid who can't have the other one.\n\nOne pour each. One pass. Everybody's fed and it's still only 9:15.\n\nkickoff's at noon. the hard part is at nine. 🌾", warm:"Kickoff's at noon, so the hard part is at nine. 🏈\n\nOne carton around one table — six glasses, one pass, nobody waiting. Willa's Kids carries 8g of protein (same as dairy, half the sugar), DHA omega-3s from algae oil, and none of the top 9 allergens, which is the whole reason it makes it all the way around.\n\nAnd shhh… the grown-ups poured one too. 🌾", punchy:"One carton. Six glasses. One pass around the table. 8g protein, no top-9 allergens — kickoff's at noon, the hard part is at nine. 🏈🌾"},
  "AUG24-IG-F1":{direct:"Willa's Original pours into the coffee, the oats, the blender, the batter and the pan — and it's the same four organic ingredients every single time. 🌾\n\nNothing in our fridge gets to do just one job. Everything in that door is getting looked at harder than it used to be: what's actually in it, and how many mornings it's going to show up for.\n\nFair question to ask a carton. Ours answers plainly — organic whole grain oats, filtered water, organic vanilla extract, sea salt. 1g sugar, all of it from the oats. 4g+ protein and 2g+ prebiotic fiber per cup, because whole oat groats go in, bran and germ still attached, instead of oat syrup.\n\nSo it never turns into a different decision at every use. Hot, cold, blended, whisked, simmered. One ingredient list. Six different jobs. No asterisks. The Kids carton beside it does the same for the shortest person at the table.\n\nNothing in our fridge gets to do just one job. Willa's Original doesn't either.", warm:"Nothing in our fridge gets to do just one job. 🌾\n\nWilla's Original goes into the coffee, the oats, the blender, the batter and the pan — organic whole grain oats, filtered water, organic vanilla extract, sea salt, every single time. 1g sugar, all of it from the oats.\n\nNothing in our fridge gets to do just one job. Willa's Original doesn't either.", punchy:"Nothing in our fridge gets to do just one job. Willa's Original: the coffee, the oats, the blender, the batter, the pan — one ingredient list the whole way through. 🌾"},
  "AUG24-TT-6":{direct:"Four things on the ingredient list, and none of them go out of season. 🌾\n\nConfession: we do this every year. The last week of August, the fridge door starts telling on us — half a lime going dry, something neon nobody's finishing, two bottles of the drink we swore by in June.\n\nSo we clear the shelf. And the only thing on the shelf that made it to September is the carton.\n\nWilla's Original is organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar, and the oat put it there. Made from the whole oat groat, so the protein and the fiber never get strained out along the way.\n\nIt was in the iced coffee all summer. It'll be in the mug come October, with Willa's Chocolate moving up the shelf beside it. That's the only thing about this that changes.\n\nNothing on this shelf is auditioning for a second time.", warm:"Confession: we clear the same shelf every August. 🌾\n\nHalf a lime, something neon, two bottles of the drink we swore by in June — all out. Then one thing goes back exactly where it was.\n\nThe only thing on the shelf that made it to September is the carton. Organic whole grain oats, filtered water, organic vanilla extract, sea salt. 1g of sugar, from the oats.\n\nIt doesn't have an opinion about what month it is.", punchy:"the only thing on the shelf that made it to September. 🌾 four ingredients, 1g of sugar from the oats — iced in august, warm in october."}
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
  happened:"The retreat narrative broke in seven days. Oatly was flagged Aug 17 as a plant-based bright spot — up 41% on the month, 29% year to date — on the same day Beyond Meat fell 11% on a 1-for-30 reverse split, with coverage framing the divergence as proof that the weakness elsewhere is company-specific rather than category-wide. Underneath the leader, the pressure moved to price: Kirkland Signature's organic oat beverage is logging $9.79–$9.99 across 641+ Costco warehouses through Aug 24, roughly 20% off its earlier list, in the same week Walmart reported US comps of just 2.6% on Aug 20 and leaned on ~$3B in tariff refunds and 11,000+ rollbacks. And in the adjacent clean-label set, Row 7 took its flavor-bred organic produce into all 490 Sprouts doors on Aug 18 — a full-fleet natural-channel win for a brand arguing the same thing Willa's argues, one aisle over.",
  coming:"The competitive front moves off the shelf and onto the claim. A class action filed Aug 12 and widely reported Aug 18 over allulose in 'sugar free' electrolyte sticks turns the front-of-pack sugar claim into a litigation surface, while an Aug 21 trade analysis shows allulose spreading fast precisely because FDA guidance since 2019 lets it sit outside both the Total Sugars and Added Sugars figures — in the ingredient list, but not in the number. On the flavor side, two national coffee chains flipped to pumpkin six days apart — Aug 19 and Aug 25 — one of them attaching a 17g protein claim to a seasonal latte, which is the protein-number arms race arriving in the beverage occasion. Expect Q4 line reviews to reward whoever can hold a low-sugar claim without a novel sweetener behind it, and expect private label to keep pressing the bulk household through the holiday.",
  plays:"The lead is the fall turnover: while the category spends September proving it can flavor something, Willa's proves it didn't have to change anything — same four ingredients across the season change, no syrup, no seasonal SKU. Second is refusing the price fight Kirkland is starting; a 20% private-label cut is answered with worth, never with a counter-price, and Walmart's own numbers say pressured shoppers are still adding real-food volume. Third is getting the sugar claim on record plainly ahead of the allulose litigation cycle — 1g, from the oat, nothing added, no novel sweetener standing behind the number — while it is still a brand choice rather than a legal position."
};


// ─── Performance · Week of MAY 25 – MAY 31 results ──────────────
const LAST_WEEK_RESULTS = [
  {id:"AUG17-IG-R1", concept:"\"the recipe came from a kitchen. the carton was the only new part.\" — one-take founder answer", platform:"Instagram Reel", pillar:"REVIEWS/RECS", pillarColor:"#A191B2", sourceTrend:"A national player leaving ready-to-drink oat milk, answered with why this carton exists rather than a word about anyone leaving (AUG 17)", trendId:null, views:892000, saves:71400, shares:26900, comments:5200, savesDelta:14.1, sentiment:0.96, hero:true, note:"Reach and save hero of the AUG 17 – AUG 23 week, and the finding underneath it is structural rather than warm. It was not the founder's face — the two briefs that withheld a reveal until the end, the blended drink and the illusion-plus-proof pour, both landed mid-pack on completion despite strong reach, while every post that stated its whole claim in the first sentence and spent the rest of the runtime proving it finished ahead. That is the same structure a platform-wide report dated Aug 22 describes as the dominant pattern right now. Four briefs this week are cut to it: the store walk puts the entire claim in on-screen text at frame one, the two-clip contrast shows the reversal immediately, the fridge-shelf post opens on the cleared shelf, and the versatility carousel leads with the answer on card one instead of building to it."},
  {id:"AUG17-TT-1", concept:"\"we've been waiting for somebody to write the test.\" — the argument finally gets a bar", platform:"TikTok", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"A private third-party standard for ultra-processed food landing on real packages (AUG 17)", trendId:null, views:764000, saves:48900, shares:31200, comments:6800, savesDelta:9.6, sentiment:0.94, hero:false, note:"Highest share count of the week and it ran on the smallest paid budget on the board — the second refresh running that a founder stance has over-delivered against its spend. Sentiment held at 0.94 for one reason: no person, party, agency or brand appeared anywhere in it. Thursday Aug 27 takes the same slot with the same discipline on a harder subject, and the paid plan deliberately gives it nothing, because a claim adjacent to live litigation is the one thing that gets worse when you buy it a cold audience."},
  {id:"AUG17-TT-2", concept:"\"oats. oats. oats. oats.\" — one word doing four jobs on the week's live format", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"The one-word-four-times answer format running as the week's most portable meme structure (AUG 17)", trendId:null, views:703000, saves:26800, shares:38400, comments:2600, savesDelta:6.4, sentiment:0.95, hero:false, note:"Most-shared post of the week on the lowest save-rate in the top eight — the format-native trade, now five refreshes consistent. The mechanic travels and the payload only sticks if one element outlives the sound. The single meme brief this week is built to that spec: a two-clip rhyme with a hard reversal in the middle, and one end card carrying the whole payload. One meme slot, not two, because the surviving-element budget does not divide."},
  {id:"AUG17-IG-R2", concept:"\"watch the yellow go opaque — and hold.\" — creamy lemonade, blended on Willa's Original", platform:"Instagram Reel", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"The blended late-summer drink hybrid running across TikTok and Reels (AUG 17)", trendId:null, views:611000, saves:52300, shares:18700, comments:3400, savesDelta:12.8, sentiment:0.96, hero:false, note:"Strong saves and the third straight refresh a build has posted a double-digit save delta — but it did not take the week, and the reason is the one worth carrying. The whole video is a withheld reveal: the payoff is the moment the colour changes, which sits at the end. It won on saves and lost on completion. Builds keep earning their slot; they just stop paying if the reveal is the only reason to stay. Both pins this week are builds, and both put the finished object in the first frame rather than at the end."},
  {id:"AUG17-TT-4", concept:"\"we built this carton to be checked.\" — an open-door dare aimed at a shopper who already has her phone out", platform:"TikTok", pillar:"REVIEWS/RECS", pillarColor:"#A191B2", sourceTrend:"A shopper weighing every stick in a box of butter and sending a comment section to their kitchen scales (AUG 17)", trendId:null, views:528000, saves:34600, shares:21300, comments:7900, savesDelta:9.0, sentiment:0.92, hero:false, note:"Highest comment volume of the week at its lowest sentiment, 0.92 — which is what an invitation looks like when the room arrives already suspicious. It stayed above the guardrail because it named nobody and accused nobody. The read carried forward is a limit, not a win: trust posts get one slot a week, and this week's is the sugar brief. The verify-us posture, the seal, the badge and the who-checks-this lane are all rested outright."},
  {id:"AUG17-IG-R3", concept:"\"you shouldn't have to read a carton twice.\" — the four-second Kids answer", platform:"Instagram Reel", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"A House bill that would name oats on the major-allergen line of every label (AUG 17)", trendId:null, views:447000, saves:40100, shares:16400, comments:3300, savesDelta:11.2, sentiment:0.97, hero:false, note:"Highest sentiment of the week at 0.97 on mid-pack reach — the shape of a narrow, high-intent room entered correctly. It led with relief instead of alarm and gave no advice of any kind. Both parenting briefs this week hold the same register in a completely different room: a Saturday morning kitchen and a make-ahead pan, neither of which mentions a label rule, a school or a rule anybody has to follow."},
  {id:"AUG17-IG-R5", concept:"\"it looks fake. it's four ingredients.\" — illusion-plus-proof pour cut", platform:"Instagram Reel", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"The make-it-look-fake-then-prove-it cut driving completion across food video (AUG 17)", trendId:null, views:361000, saves:19800, shares:9100, comments:1800, savesDelta:7.1, sentiment:0.95, hero:false, note:"The clearest counter-example of the week and the reason the front-loaded finding is more than a hunch. It had the best raw footage on the board and the lowest reach of any Reel, because the entire structure asks a viewer to wait for the proof. Same asset, claim moved to frame one, is a materially different post. The macro pour survives into this week inside the harvest Reel, where the texture is the opening image rather than the reward."},
  {id:"AUG17-PIN-1", concept:"\"two ingredients — and one of them won Best Beverage.\" — dairy-free croissant ice cream sandwich pin", platform:"Pinterest", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"The two-ingredient croissant ice cream sandwich build everyone was testing across dessert content (AUG 17)", trendId:null, views:198000, saves:29900, shares:4600, comments:510, savesDelta:15.1, sentiment:0.97, hero:false, note:"Lowest reach and highest save-rate of the week for the fourth refresh running — the most reliable finding the engine holds, and now stable enough to plan against rather than observe. Pinterest saves are the only number here that keeps compounding after a news peg dies. Both pins this week are written as search objects with literally searchable titles, and the make-ahead pan carries the smallest budget and the longest flight of anything on the paid board for exactly this reason."}
];

const PERF_KPIS = {
  shipped:16,
  totalReach:4612000,
  avgSavesDelta:10.4,
  topFormat:"Front-loaded claim in frame one with the proof as the body + one-take founder answer + searchable save-pin"
};

const PERF_INSIGHTS = [
  {title:"Front-loading the claim beat withholding the reveal — and the gap was wide enough to re-cut four briefs", detail:"The one-take founder answer took reach and saves outright, and the two briefs that held their payoff to the end — the blended drink and the illusion-plus-proof pour — both under-delivered on completion relative to their reach, with the pour posting the lowest reach of any Reel despite the best footage on the board. The finding is narrower than 'lead with the hook': posts that stated the entire claim in the first frame and spent the rest of the runtime proving it finished ahead of posts that asked a viewer to wait. Four briefs this week are cut to that spec — the store walk puts the whole claim in on-screen text at frame one, the two-clip contrast shows its reversal immediately, the fridge post opens on the cleared shelf, and the versatility carousel answers on card one.", agent:"perf"},
  {title:"Pinterest is a shelf, and the save-object pattern is now stable enough to plan against", detail:"The frozen dessert card posted the week's lowest reach and its highest save-rate for the fourth refresh in a row. Saves there are the only number in the engine that keeps compounding once the news peg dies, which makes a pin the cheapest durable asset the engine can produce. Both pins this week are written as search objects rather than timely takes — a spiced hot chocolate titled the way someone searches for one on the first cold morning, and a make-ahead pan titled the way a person searches at nine the night before a big Saturday. The pan also takes the smallest budget and the longest flight on the paid board, because the asset outlives its peg by months.", agent:"visual"},
  {title:"Format-native posts traded saves for shares for the fifth refresh running, so the week runs one meme slot instead of two", detail:"The one-word repetition ride was the most-shared post of the week on the lowest save-rate in the top eight — the same trade five refreshes in a row. The mechanic travels and the payload only sticks if a single element outlives the sound, which means the surviving-element budget is one line per post and does not divide across two briefs. So the meme slot was consolidated: one format this week, a two-clip rhyme whose second clip undoes the first, with a hard reversal in the middle and the entire payload held to a single end card. Five other live formats were passed over, four on adjacency and one because it structurally required a real family member on camera.", agent:"hook"},
  {title:"The under-funded stance out-travelled its budget again — so the money moved to the post with no argument in it", detail:"The founder stance posted the week's highest share count on the smallest paid budget on the board, the second refresh running that a position has over-delivered against its spend and the second running that it has posted the week's lowest sentiment among top performers. Both readings point the same way: a stance is cheap to distribute organically and expensive to defend when paid pushes it into cold rooms. So this week's largest budget sits behind the in-store walk, which makes the seasonal argument without an opponent, and the founder sugar brief receives nothing at all — the one time the engine has deliberately zero-funded a BIG SWING.", agent:"paid"}
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
  "AUG24-TT-1":{voice:96, panel:93, pulse:95, recency:2},
  "AUG24-IG-R1":{voice:97, panel:91, pulse:84, recency:5},
  "AUG24-TT-3":{voice:95, panel:92, pulse:96, recency:4},
  "AUG24-TT-2":{voice:95, panel:93, pulse:74, recency:3},
  "AUG24-PIN-1":{voice:94, panel:91, pulse:90, recency:5},
  "AUG24-IG-R2":{voice:94, panel:89, pulse:84, recency:3},
  "AUG24-TT-5":{voice:93, panel:90, pulse:96, recency:3},
  "AUG24-PIN-2":{voice:93, panel:90, pulse:91, recency:2},
  "AUG24-IG-R3":{voice:94, panel:88, pulse:83, recency:3},
  "AUG24-TT-4":{voice:94, panel:90, pulse:93, recency:2},
  "AUG24-IG-F1":{voice:93, panel:88, pulse:74, recency:4},
  "AUG24-TT-6":{voice:94, panel:86, pulse:93, recency:2}
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
    hook:"\"aura, laura\" is the two-clip rhyme where the second half undoes the first ✨",
    detail:"Strict two-clip mechanic, text overlay only, no sound design needed beyond the audio cue. Clip one: an activity executed impressively, on-screen text reads AURA, cut timed to the audio saying the word. Hard cut to clip two: the same activity failing spectacularly, text reads LAURA, timed to the audio saying the rhyming nonsense name. The whole joke is the rhyme carrying the fall from competence to disaster, so the two clips must be the same framing and the same action — expert-versus-beginner or expectation-versus-reality are the two brand-adaptable variants. Documented as live and rising in a trend roundup dated Aug 19, 2026.",
    velocity:"high",
    platform:"TikTok",
    willasPlay:"AURA: an ingredient list you can read aloud in four seconds. LAURA: the one that needs a chemistry degree. No names.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"SocialBee · TikTok trends roundup, 'Aura, Laura' format (Aug 19, 2026)", url:"https://socialbee.com/blog/tiktok-trends/"}
    ]
  },
  {
    id:"CP-2",
    type:"MEME TEMPLATE",
    typeColor:"#73B2C9",
    hook:"the \"b4 b4\" relay turns one object into a baton passed around a whole group 🏃",
    detail:"A group handoff format: many participants each take a rapid micro-turn — one to two seconds — contributing a fragment of a dance beat or a lip-sync line before passing to the next person, every cut landing hard on the beat inside one continuous video. The verified reference is a poolside montage where a large group each took a single micro-turn. The mechanic is unusually forgiving: because no turn is longer than two seconds, nobody has to be good at it, and four to six people is enough to make it read as a crowd. Flagged as high-velocity in a platform trend report dated Aug 22, 2026.",
    velocity:"high",
    platform:"TikTok + Reels",
    willasPlay:"One carton, passed hand to hand around a breakfast table. Every person gets one pour, one second, one cut on the beat.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"Lightreel · TikTok weekly report, 'B4 B4' relay challenge (Aug 22, 2026)", url:"https://lightreel.ai/blogs/whats-trending-on-tiktok"}
    ]
  },
  {
    id:"CP-3",
    type:"MEME TEMPLATE",
    typeColor:"#73B2C9",
    hook:"\"we had chatgpt write the script\" is the deadpan one-take everyone can shoot with two people 🤖",
    detail:"The mechanic in order: prompt an AI for a short scene with a stated setting and vibe, read it once so everyone knows their lines, then film the whole thing in a single unbroken take, delivering every line completely straight-faced no matter how strange the writing gets. On-screen text up front reads \"we had ChatGPT make us a script\" so the viewer is in on the premise from the first frame. The performance rule that makes it work is counterintuitive: the flatter and less winking the delivery, the better it performs, because the comedy lives in the gap between the machine's overwrought copy and two ordinary people saying it. Documented as a live format in a trends update dated Aug 19, 2026.",
    velocity:"high",
    platform:"TikTok + Reels",
    willasPlay:"Ask AI to write an oat milk commercial, perform it stone-faced, then cut to the four words on the actual carton.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"Newengen · August 2026 TikTok trends, AI-script one-take format (updated Aug 19, 2026)", url:"https://newengen.com/insights/august-tiktok-trends/"}
    ]
  },
  {
    id:"CP-4",
    type:"MEME TEMPLATE",
    typeColor:"#73B2C9",
    hook:"the imposter word game is back as filmable content — everyone knows the secret word except one person 🕵️",
    detail:"A live social-deduction game, shot in one continuous take around a table with four or more people. Everybody sees a secret word except one player, the imposter. Players take turns giving a single one-word clue that fits the secret word without saying it outright, while the imposter has to bluff a plausible clue with no idea what the word is. After one round of clues, the group votes on who they think the imposter was. It is a game, not a template, so it needs no audio, no trending sound and no choreography — just a table, a group and one camera. Flagged as reviving in a trend roundup dated Aug 17, 2026.",
    velocity:"medium",
    platform:"TikTok + Reels",
    willasPlay:"Make the secret word an ingredient. Four players give honest clues, one bluffs — a four-item list is very hard to fake.",
    dnaMatch:"on-pack-checklist",
    sources:[
      {label:"Virlo · Top TikTok trends right now, Imposter game revival (Aug 17, 2026)", url:"https://virlo.ai/blog/tiktok-trends-august-2026"}
    ]
  },
  {
    id:"CP-5",
    type:"FOOD TREND",
    typeColor:"#75C596",
    hook:"\"sardinemaxxing\" is the single-ingredient obsession finally eating itself 🐟",
    detail:"Interest in eating as many sardines as possible — including a three-day sardine-only stretch some participants claim induces ketosis — rose 100% between late July and early August 2026, and the backlash arrived with it. Nutrition researchers quoted in trade coverage dated Aug 17, 2026 criticise the whole hero-ingredient pattern for tunnel-visioning on one food while starving out everything else a real diet needs, landing on the line that no single ingredient makes up for a balanced diet. The signal here is behavioural rather than nutritional: the internet is now actively mocking the practice of picking one food and maximising it, which is a live opening for the abundance posture instead of the restriction one.",
    velocity:"medium",
    platform:"TikTok + food trade press",
    willasPlay:"We never asked anyone to max out on anything. Ride the backlash with a full breakfast table, not a single hero ingredient.",
    dnaMatch:"mom-activist",
    sources:[
      {label:"FoodNavigator · Maxxing trends focus too much on single ingredients (Aug 17, 2026)", url:"https://www.foodnavigator.com/Article/2026/08/17/maxxing-trends-focus-too-much-on-single-ingredients/"}
    ]
  },
  {
    id:"CP-6",
    type:"FOOD TREND",
    typeColor:"#75C596",
    hook:"a salad served with a tin you open yourself — the packaging became the content 🥫",
    detail:"A fast-casual chain's limited-time summer Nicoise, live nationwide Aug 11–24, 2026, pairs the salad with a custom-illustrated co-branded tin of albacore tuna that the guest opens and adds at the table rather than receiving it pre-mixed. The mechanic worth stealing is the conversion of a functional add-on into a hands-on ritual with its own artwork: peeling the lid, tipping it in, the small mess. It gives an ordinary food moment a physical beat and a reason to film, and it means the package — not the finished dish — is the thing on camera. Documented in trade coverage dated Aug 24, 2026.",
    velocity:"medium",
    platform:"Food service + Reels",
    willasPlay:"Make the pour the ritual, not the recipe. Cap off, tilt, the swirl — film the carton doing something, not sitting there.",
    dnaMatch:"at-shelf-moment",
    sources:[
      {label:"QSR Magazine · Sweetgreen launches tinned tuna salad with Fishwife (Aug 24, 2026)", url:"https://www.qsrmagazine.com/news/sweetgreen-launches-tinned-tuna-salad-with-fishwife/"}
    ]
  },
  {
    id:"CP-7",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"one parent asked a group chat to ban another kid's snack, and the internet picked a side within a day 💬",
    detail:"A parent asked her school's parent group chat to stop other families from sending a specific packaged cookie, because her daughter, who isn't allowed them, gets upset watching classmates eat them. The exchange was published as a six-part social series starting Aug 21, 2026 and was widely mocked; the school publicly reaffirmed that each family decides what goes in their own child's food. The conversation underneath is not about the cookie — it is about whose rules travel, and whether one family's restriction becomes everyone's. Both sides are being argued loudly and the pile-on is running hot, which means the winning position for a brand is the one that refuses to referee.",
    velocity:"high",
    platform:"Instagram + X",
    willasPlay:"Do not referee. Post the opposite picture: a table where nobody has to check whose food belongs to whom.",
    dnaMatch:"mom-activist",
    sources:[
      {label:"Twitchy · One mom tried to ban Oreos from the entire class and the group chat went nuclear (Aug 21, 2026)", url:"https://twitchy.com/justmindy/2026/08/21/great-oreo-debate-school-lunch-n2431546"},
      {label:"Matt Whitlock on X · original viral thread (Aug 21, 2026)", url:"https://x.com/MattWhitlock/status/2090825257951125545"}
    ]
  },
  {
    id:"CP-8",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"the reveal is out — creators are putting the whole claim on screen in the first second and letting the video prove it ⏱️",
    detail:"The clearest platform-wide pattern in a report dated Aug 22, 2026 is structural rather than topical: opening on-screen text now states the entire situation in one sentence immediately, not as a teaser, and the video itself supplies the proof, reaction or punchline. No slow build, no withheld payoff. Where creators go longer, they compress multi-part stories into one video with visual chapter cards every five to eight seconds — part one, part two, plot twist — rather than asking anyone to come back for a sequel. This inverts the instinct behind most reveal-led food editing, and it applies to every hook shot this week regardless of subject.",
    velocity:"high",
    platform:"TikTok + Reels",
    willasPlay:"Front-load the claim in frame one. State it flat in text, then spend the whole video proving it — no build, no withhold.",
    dnaMatch:"before-after-stitch",
    sources:[
      {label:"Lightreel · TikTok weekly report, compressed chaptered storytelling (Aug 22, 2026)", url:"https://lightreel.ai/blogs/whats-trending-on-tiktok"}
    ]
  },
  {
    id:"CP-9",
    type:"ENTERTAINMENT MOMENT",
    typeColor:"#A191B2",
    hook:"the show a whole generation grew up on dropped its final ten episodes at once on aug 20 🌊",
    detail:"Outer Banks released its fifth and final season globally on Aug 20, 2026, all ten episodes at once, closing a six-year story; coverage dated Aug 21, 2026 reported it set a series-high review score on debut, making it one of the most-discussed streaming moments of the window. The resonance is thematic and needs no product placement: last summer, the group scattering, the end of a run that started when the audience was younger. It lands in the same week the fridge and the calendar are both turning over from summer to fall, which gives the end-of-an-era feeling a real-world object to attach to.",
    velocity:"high",
    platform:"Streaming + social",
    willasPlay:"Ride the last-summer feeling, not the show. The end-of-August fridge clear-out, and the one carton that stays through the season change.",
    dnaMatch:"before-after-stitch",
    sources:[
      {label:"Forbes · Netflix's Outer Banks season 5 sets an IMDb review score record (Aug 21, 2026)", url:"https://www.forbes.com/sites/paultassi/2026/08/21/netflixs-outer-banks-season-5-sets-an-imdb-review-score-record/"},
      {label:"What's on Netflix · Outer Banks season 5 release date confirmation", url:"https://www.whats-on-netflix.com/news/outer-banks-season-5-netflix-release-date-first-look/"}
    ]
  },
  {
    id:"CP-10",
    type:"ENTERTAINMENT MOMENT",
    typeColor:"#A191B2",
    hook:"a stripped-bare soul-to-cosmic-country record landed aug 21 and it plays a kitchen straight, with no irony 🎸",
    detail:"Grace Potter's seventh studio album, Trespasser, released Aug 21, 2026 via Thirty Tigers, described in reviews as spanning stripped-bare soul, cosmic country and hellraising rock, and written across a road trip between Topanga, Nashville and Vermont. What makes it usable is register rather than fame: it is warm, unpolished and vocal-forward, played on real instruments, with none of the ambient-wellness gloss that makes brand kitchen footage feel like an advert. A second same-day option exists if the rock edge is too much — a folk duo harmony record also released Aug 21, 2026, deliberately optimistic rather than heavy.",
    velocity:"medium",
    platform:"Streaming + social audio",
    willasPlay:"Lay it under a slow morning-kitchen cut — hands, oats, light. Riff the warmth, never name the artist.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"Tinnitist · Albums of the week: Grace Potter, Trespasser (Aug 20, 2026)", url:"https://tinnitist.com/2026/08/20/albums-of-the-week-grace-potter-trespasser/"},
      {label:"V13 · The Kennedys premiere their album Smoketree, released Aug 21 (Aug 19, 2026)", url:"https://v13.net/2026/08/the-kennedys-smoketree-album-premiere/"}
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
  "AUG24-TT-1":"at-shelf-moment",
  "AUG24-IG-R1":"mom-activist",
  "AUG24-TT-3":"meme-payload",
  "AUG24-TT-2":"mom-activist",
  "AUG24-PIN-1":"viral-recipe-remix",
  "AUG24-IG-R2":"on-pack-checklist",
  "AUG24-TT-5":"meme-payload",
  "AUG24-PIN-2":"viral-recipe-remix",
  "AUG24-IG-R3":"on-pack-checklist",
  "AUG24-TT-4":"kid-family-moment",
  "AUG24-IG-F1":"on-pack-checklist",
  "AUG24-TT-6":"before-after-stitch"
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
  "AUG24-TT-1":{
    shoot:[
      "The unbroken in-store walk is the entire brief — one take, phone at chest height, gimbal off, from the orange seasonal end-cap through to the set where Willa's actually sits. Shoot it 8-10 times and cut the slowest walk, not the smoothest one",
      "The seasonal end-cap slide: track past a fully built orange autumn display without stopping on any item, shot slightly wide and kept moving so no competitor packaging ever resolves legibly — grab 3-4 passes at different distances so the editor has an out",
      "The shelf-pull: one ungloved hand entering from bottom-right, taking a single carton of Willa's Original label-forward, no tilt and no flip to the back — shoot 5-6 times, this is the beat the eye lands on",
      "The walk back with the carton in hand and the orange end-cap receding behind it — needs to run a clean 8 seconds so the four ingredient overlays can tick one per footfall",
      "The counter pour: static locked frame, pale wood, morning window light camera-left, one pour into a clear glass shot just above the rim so the opacity reads, held through the settle. Shoot 6+ pours and pick the one with the calmest hand",
      "Clean plate safety: the finished glass beside the carton, no hands, held 6 seconds, in case a VO line needs trimming",
      "Location audio pass: a silent 20-second walking take with no talking, for the refrigeration hum, wheels and footfalls the overlays cut to"
    ],
    found:[
      "https://www.yahoo.com/lifestyle/articles/dunkin-2026-fall-menu-pumpkin-090102966.html — the Aug 19, 2026 full fall lineup drop (five-item pumpkin range + a new tiramisu beverage line). Background for why this brief exists; nothing from it is named on camera or in copy",
      "https://www.fox10phoenix.com/news/starbucks-reveals-pumpkin-spice-latte-return-date-2026 — confirms the second national fall menu flips Aug 25, 2026, which is why this posts Wed Aug 26. Internal timing reference only",
      "https://lightreel.ai/blogs/whats-trending-on-tiktok — the Aug 22, 2026 platform report documenting the front-loaded-claim structure this brief rides. Read the section on opening text stating the whole situation before the first frame is designed",
      "https://www.tiktok.com/tag/pumpkinspice — permanent hashtag page. Scroll it the morning of the shoot to see how the orange reset actually looks on the platform this year, and deliberately shoot the opposite of it: no props, no costume, no autumn filter",
      "https://willaskitchen.com/collections/oat-milk-products — permanent product reference. Confirm the exact on-pack ingredient wording before recording VO so the four spoken lines match the label word for word",
      "https://www.tiktok.com/discover/reaching-shelf-grocery-store — permanent reference page for in-aisle shelf-pull framing; useful for how a hand entering frame reads on a phone, ignore the audio trends attached to it"
    ],
    memes:[
      "No meme template and no trending sound — the format being ridden is structural, not comedic: the entire claim in on-screen text in frame one, then every remaining second spent proving it, per the Aug 22, 2026 platform report. That is the only borrowed mechanic in the brief",
      "Deliberately NOT used: the pumpkin-spice costume/persona bit, the seasonal-drink taste-off, and any eye-roll-to-camera reaction edit. All three make the dry register read as a joke at the shopper's expense, which is the one tone this brief cannot have",
      "Register reference for the edit only (not a template to copy): design-led, ingredient-first in-aisle content from brands known for dry, confident, unhurried wit — never smug. Watch a couple of examples before the edit, then don't imitate the jokes"
    ],
    archive:[
      "Existing counter-pour footage of Willa's Original into a clear glass can cover beat six if the store day runs long — it must be the pale-wood counter with window light camera-left, and it must be a full pour that settles on camera, not a partial",
      "Existing clean carton stills can cover the end card if the wordmark lockup needs rebuilding",
      "Nothing in the in-store sequence may come from archive — the fall reset has to be the real reset, shot inside this window, or the whole premise is fiction. No stock grocery footage, no stock autumn end-cap, no news clips, no menu-board imagery of any kind"
    ]
  },
  "AUG24-IG-R1":{
    shoot:[
      "The groat pour, macro: whole oat groats falling from a glass jar into an open palm with hard morning sun through the stream. This is the first frame of the Reel and the hero asset of the shoot — get 10+ takes at three distances, and shoot a separate close foley pass of the same pour for the sound",
      "Hands-only working coverage: palm of groats tipped into a heavy pot, jar lid set down on wood, water poured, salt pinched — a full pass of every action with Christina's face deliberately out of frame, so the edit can hold the two-thirds hands ratio",
      "The three-quarter profile talking beat at the counter — she works while she talks, never stops to deliver a line; shoot 6+ takes and select the one where she's least aware of the camera",
      "The single straight-to-lens beat for 1921 / 2021, waist-up, hands still. Shoot it flat and unhurried at least 8 times, plus one pass where she says the two years and nothing else — the editor may want the dates clean with no sentence around them",
      "The four ingredients entering frame one at a time, set down by a hand: oats, water, vanilla, salt. Locked frame, one item per take, no titles on the objects",
      "The carton quarter-turn: Willa's Original picked up and rotated so the ingredient list faces lens, thumb resting on it and NOT tracing it (tracing is the burned AUG 17 move) — 4 takes",
      "Safety pass of the entire piece shot at half pace with her talking at half volume, in case the selects play performed rather than said"
    ],
    found:[
      "https://www.worldplantmilkday.com/ — the campaign's own permanent site, where the 5,000-year heritage framing and the Aug 22, 2026 date are documented. STRICTLY a research reference for the strategist: do not screenshot it, do not screen-record it, do not name it in any frame or line",
      "https://www.greenqueen.com.hk/future-food-quick-bites-oatly-x-breadfast-blended-koji-beef-plant-milk-day/ — Green Queen, Aug 19, 2026, the trade write-up carrying the heritage-campaign and 47,000-pledge detail behind T-4. Internal sourcing only; the 47,000 number never appears in copy",
      "https://www.tiktok.com/tag/oatmilk — permanent hashtag reference page. Read it before the shoot for how people actually phrase origin questions in comments, and steal a real phrasing rather than writing one",
      "Posture reference, not format: Graza's co-founder letter posts and Lovebird's food-system posts on their own feeds — plainspoken activist gravity with no sermon. That register is the ceiling for this brief. Find them on the brands' own accounts; do not guess a handle and do not paste a URL nobody has opened"
    ],
    memes:[
      "No meme template and no trending sound, on purpose. A borrowed format would date a piece whose entire argument is that nothing about it needed updating — and every fresh format available this week is already claimed (TT-3 holds the two-clip rhyme, TT-4 holds the relay, TT-5 holds the AI-script deadpan). The only structural device here is the two purple dates, and that device is the brief's own."
    ],
    archive:[
      "Existing Willa's kitchen and pour B-roll can cover the water, vanilla and salt inserts if the shoot day runs short — but the groat pour must be shot new, because no existing asset has the whole unrolled kernel legible in hard morning light",
      "Existing Willa's Original packshots are fine for the Story cutdown and the cover frame; the Reel itself stays in the kitchen",
      "NO archival or period footage, and NO family photographs of any kind. The brief must not require a photo of Willa, a family member on camera, or anything sourced from the founder's family — the heritage lands through the two dates and the jar, and a photo insert would turn a plain answer into a commercial",
      "Do NOT pull the AUG 17 in-aisle founder footage into this cut; that piece owns the chilled-aisle look and reusing it would read as the same post twice"
    ]
  },
  "AUG24-TT-3":{
    shoot:[
      "The AURA pour — steamed Willa's Barista into a fresh double shot in a plain white 6oz tulip, locked 45-degree three-quarter angle, 60fps. Shoot 10-12 takes and cut the one where the heart lands latest and slowest; a rushed clean pour reads as a demo, a patient one reads as competence",
      "The LAURA pour — identical frame, identical cup mark, identical shot, identical pour height and speed, the average barista oat milk decanted into an UNMARKED stainless pitcher before anyone rolls. Shoot 6-8 takes at slightly varied steam temperatures and cut the one that flecks earliest and most visibly on contact",
      "Both clips back to back in the same session without touching camera, cup, light or lens — if the two frames don't match to the pixel the format collapses. Tape the cup position and the tripod feet before take one",
      "Micro-beat safety: bar spoon lifting out of the finished AURA cup and the surface closing back over itself, 4-5 takes, shot immediately after the hero pour while the foam is still live",
      "Clean plate of the Willa's Barista carton at the back edge of the AURA frame, label forward, slightly soft — for the edit to reposition if the depth of field lands wrong",
      "Two cutaway seconds of the LAURA cup sitting still, mottled and separated, no hands — pure safety in case the pour take needs trimming"
    ],
    found:[
      "Trend reference: https://socialbee.com/blog/tiktok-trends/ — SocialBee TikTok trend roundup dated Aug 19, 2026, where the 'Aura, Laura' format is documented live: the sound says 'aura' over someone doing something impressively well, then cuts to 'Laura' over the same thing attempted and failed. Read the mechanic before the shoot; the brand-adaptable variants it names are expert-vs-beginner and expectation-vs-reality, and a pour test is both",
      "Trend reference: https://www.tiktok.com/discover/aura-lura — permanent TikTok discover page collecting the format in the wild. Scroll ten of these before rolling to feel how hard and how early the cut lands; the single most common mistake is cutting too late",
      "Reference (permanent, audience proof): https://www.tiktok.com/discover/oat-milk-separating-coffee — the standing discover page for oat milk splitting in hot coffee. This is the pain point the LAURA clip is dramatising, and the comments are the best free copy research available for this brief",
      "Reference (permanent, audience proof): https://www.tiktok.com/discover/curdled-oat-milk — same territory, blunter language. Read it for what people call the failure, then deliberately do NOT use their word: on screen it is flecks, never curdled",
      "Reference (context, in-window): https://www.hola.com/us/lifestyle/20260820919193/aura-battle-what-is-farming-aura/ — Aug 20, 2026 coverage of 'aura farming' and public aura battles. Background only, confirming the word needs no explaining to a US viewer right now; nothing from this page goes on screen or into caption",
      "Reference (posture): Olipop's category-critique shorts — study how the joke stays aimed at the category and never at the person watching. That calibration is the difference between cheeky and smug on this brief"
    ],
    memes:[
      "TEMPLATE: 'Aura, Laura' — strict two-clip rhyme, text overlay only, hard cut timed to the audio's second word. Clip one = the action executed well, overlay AURA. Clip two = the identical action failing, overlay LAURA. Non-negotiables that make it read as the format rather than a generic before/after: identical framing, identical action, sequential never side-by-side, no transition effect, no voiceover, and the overlay words in the same position and the same size in both clips",
      "SOUND: use the format's native audio pulled from the trend page in-app rather than a recreated version — see the audio field. Confirm it is still the top-used cut on the morning of Wed Aug 26 before scheduling",
      "FORMAT DIFF CHECK (engine-side, passed): this shares no structure with the burned bob / one-word-four-times ride (AUG 17), repeat-twice-reveal-third (AUG 17), illusion-plus-proof (AUG 17), the childhood-photo beat drop (AUG 10) or the bass-drop reveal (AUG 03). Two clips, one rhyme, one hard cut — genuinely new to the slate"
    ],
    archive:[
      "Existing steamed-pour and latte-art b-roll from the Barista shoots can cover the AURA clip IF a matching failing pour can be shot to the same lens, angle, cup and light — in practice it almost never can, so treat archive as reference for framing and plan to shoot both clips fresh in one session",
      "Archive carton stills are fine for the back-of-frame placement in the AURA clip only",
      "Do NOT pull the failing pour from any archive, stock library or found footage — there is no way to guarantee a competitor carton, cap or label is out of frame, and that is the one mistake on this brief that cannot be fixed in the edit"
    ]
  },
  "AUG24-TT-2":{
    shoot:[
      "The single seated founder frame, 50–85mm equivalent, chest-up, soft morning key from camera-right — shoot the entire 24 seconds as one continuous take, then shoot it again 30% slower and 20% quieter. The slower, quieter take is almost always the one",
      "The carton lift at 0:03 — Willa's Original rising into frame from below the table line into label-forward at chest height, hand steady, no adjusting. Shoot this 6–8 times in isolation; it is the beat the whole film hangs on and it has to look like she simply had it, not like she presented it",
      "A safety take of beats 3 and 4 delivered even flatter — no emphasis on any word — in case the performance drifts toward argument in the edit",
      "The closing line shot separately, after a real pause, straight down the lens, one take per setup, no smile at the end",
      "Clean plate: the empty frame with the carton alone resting on the table, held 6 seconds, no hands — an emergency cutaway if a line needs trimming"
    ],
    found:[
      "Background reading, verified in-window (FoodNavigator, Aug 21, 2026): https://www.foodnavigator.com/Article/2026/08/21/why-allulose-is-gaining-industry-attention/ — read this before rolling so the one sentence about the rule is said correctly and nothing gets overstated. It is script accuracy only; the publication, the ingredient's market story and every figure in it stay off screen and out of caption",
      "Listening reference (permanent hashtag page): https://www.tiktok.com/tag/allulose — scroll the top posts and the comments to hear how people already talk about this. Most of them are confused rather than angry, which is exactly the volume this brief is pitched at",
      "Label reference (permanent brand page): https://willaskitchen.com/ — confirm the exact on-pack wording for Original before anything goes on screen; every number spoken or typed in this piece must match the carton in her hand",
      "Posture reference (permanent): https://www.patagonia.com/stories/ — watch two founder-to-camera stance films back to back and copy the stillness, the conversational volume and the refusal to sell. Not the subject matter, not the outdoor grade"
    ],
    memes:[
      "No meme layer, no trending sound, no format ride on this one — and that is a deliberate slate decision, not an omission. TT-3 and TT-5 carry the week's two meme rides; this is the week's straight-faced stance, and a template on top of it would turn calm into a bit and read as a brand doing a voice"
    ],
    archive:[
      "Skip archive for the A-roll — single-take founder frame, all original, no stock and no news footage of any kind",
      "Existing clean product stills of Willa's Original may only be used for the flat end card. Do NOT pull any past label macro, ingredient-list close-up or certification-mark footage from the archive: this brief is explicitly barred from flip-the-carton, count-the-lines, scan-it and seal imagery, all of which are rested lanes from AUG 17"
    ]
  },
  "AUG24-PIN-1":{
    shoot:[
      "THE HERO — heavy stoneware mug of dark spiced cocoa, straight-on at mug height, hard morning window light camera left, black card camera right, real steam rising. Shoot it twenty times and reheat between every take; the frame lives or dies on whether the steam reads",
      "Fresh nutmeg grated over the surface just before the shutter, microplane in frame, so the flecking on the cocoa is genuinely fresh and not styled on",
      "The pour — Willa's Chocolate going from the carton into the saucepan over a cinnamon stick and a strip of orange peel, proving the carton is the recipe and not a garnish",
      "Willa's Chocolate carton standing at frame right, label forward, cropped by the frame edge, same light and same counter as the hero",
      "Hand wrapped around the mug lifting it an inch off the wood, steam pulling with it — hands only, plain neutral knit sleeve, no face",
      "Flat ingredient rest: cinnamon sticks, a pinch bowl of grated nutmeg, a wide curl of orange peel, a small dish of sea salt on bare wood — the alternate pin if the steam never behaves"
    ],
    found:[
      "Trend anchor (Aug 19, 2026): https://www.yahoo.com/lifestyle/articles/dunkin-2026-fall-menu-pumpkin-090102966.html — the first of the two national fall-menu launches, the five-item seasonal range plus the new tiramisu line. Internal reference for WHY this pin ships this week; the chain is never named in copy",
      "Trend anchor (Aug 19, 2026): https://bluewaterhealthyliving.com/news/local-news/michigan/when-dunkin-and-starbucks-fall-menus-launch-and-what-they-include/ — confirms both national fall-menu launches in one place: the first chain's Aug 19 launch and the second chain's Aug 25 launch. Internal reference for the timing note in the weekly deck; same rule, no chain name in copy",
      "Product reference (permanent): https://willaskitchen.com/products/chocolate — the Chocolate page for exact on-pack ingredient wording, cacao sourcing and the Good Food Awards claim. Check the carton copy against this before the description goes out",
      "Search reference (permanent): https://www.pinterest.com/search/pins/?q=dairy%20free%20hot%20chocolate — scan the top pins for what already ranks in this query. Almost all of them are busy recipe cards with stacked text; the whitespace is one photograph and one line",
      "Format reference (permanent): https://www.tiktok.com/tag/hotchocolate — for how the steam and the pour get framed when the drink has to sell itself in a still"
    ],
    memes:[
      "No meme template and no trending sound — this is a static Pinterest pin. The comedic job is done entirely by the headline, 'the spice in this one is a spice,' which is the Wordplay / Text Joke pattern in its cheapest and highest-share form. It only works if the pin stays clean around it, so any impulse to add a second gag, a subtitle or an explanation kills the brief"
    ],
    archive:[
      "Existing Willa's Chocolate carton stills can cover the frame-right placement if the light matches — warm morning side light on bare wood only, nothing shot on white seamless",
      "Existing wood-counter and pour-into-saucepan B-roll from prior recipe shoots can cover the supporting frames",
      "The hero mug with real steam has to be shot fresh — there is no archive substitute and a composited steam layer will read fake at pin size"
    ]
  },
  "AUG24-IG-R2":{
    shoot:[
      "THE SET BUILD, before anything else: a genuinely full breakfast counter — eggs, cut fruit, toast on a board, a jar of dry oats, coffee, a used napkin — dressed so it survives in the wide frame for the entire runtime. Shoot a stills reference of the finished counter and get it approved before the first take; if this set is wrong, no amount of overlay work rescues the brief",
      "The unbroken pour: one hand, cap off, Willa's Original into the glass at 100% speed, 4+ takes. Select the take with the small imperfect splash, not the clean stream",
      "The four-tick hero: locked close on the filled glass with the carton label-forward and soft behind it, shot long (15s+ of clean hold) so the editor can time each tick with a half-second beat rather than fighting a short clip",
      "The ingredient-list insert: thumb resting on the four legible lines, operator physically stepping in — shoot a second pass at a slightly wider crop as insurance for the Story cutdown",
      "The matched wide: tape the tripod position from shot 1 and return to it exactly for shot 5. Shoot both wides back to back before striking anything on the counter",
      "The end card: Original and Kids faced up on the counter with cream negative space above for the stinger",
      "A silent coverage pass with no overlays and no VO — hands, glass, counter, light — for a Story cutdown and for the cover frame"
    ],
    found:[
      "Anchor signal (INTERNAL, do not cite in copy): BakeryandSnacks · New GLP-1 consumer data challenges food industry forecasts (Aug 19, 2026) — https://www.bakeryandsnacks.com/Article/2026/08/19/new-glp-1-consumer-data-challenges-food-industry-forecasts/ — this is the household-shift finding the brief is built on. Read it so the plain-language version in the VO is accurate, then never quote a number from it",
      "Context (INTERNAL): FoodNavigator · Could GLP-1 safety concerns affect uptake? (Aug 21, 2026) — https://www.foodnavigator.com/Article/2026/08/21/impact-of-glp-1-safety-concerns-on-food-industry/ — the reason the register stays steady and non-promotional. Never referenced, never rebutted on screen",
      "Posture (INTERNAL): FoodNavigator · Maxxing trends focus too much on single ingredients (Aug 17, 2026) — https://www.foodnavigator.com/Article/2026/08/17/maxxing-trends-focus-too-much-on-single-ingredients/ — the abundance correction this brief stages rather than states. Read the researcher quote, then throw the vocabulary away",
      "Reference (TikTok, permanent hashtag page): https://www.tiktok.com/tag/oatmilk — a language mine, not a format. Scroll comments on category nutrition posts for the exact words people use about protein and fiber in a plant milk, and write the tick copy in their register",
      "Reference (TikTok, permanent hashtag page): https://www.tiktok.com/tag/proteinbreakfast — useful only for pacing: the posts that hold are the ones that show the food before the number, which is why the pour lands before the first tick here",
      "Reference (Instagram): Olipop's benefit posts — proof you can say 'prebiotic fiber' out loud without turning into a supplement company. Borrow the ease, cut the crassness by about a third; this is Pattern 04 at Willa's calibration",
      "Reference (Instagram): Kiki Milk's feed — the flat, unapologetic posture for the tick sequence. State the number, say nothing about anyone else, apologise for nothing",
      "Reference (brand's own product page): https://www.willaskitchen.com/ — confirm the exact current ingredient wording and nutrition figures against the live pack copy before the insert is shot, so the four legible lines on camera match the four ticks on screen"
    ],
    memes:[
      "NO meme template and no trending sound applies here, deliberately. The week's two meme rides are already placed — AUG24-TT-3 on the two-clip rhyme and AUG24-TT-5 on the deadpan one-take — and a third would flatten the slate. More importantly, a borrowed format would put a joke on top of a subject that only works played completely straight",
      "The only borrowed mechanic is the on-pack-checklist DNA itself: tick, beat, tick, beat. Treat the timing as the format — the half-second gap between ticks IS the entertainment, so do not compress it in the edit to make length"
    ],
    archive:[
      "Existing pour and carton-macro footage can cover SHOT 2 and SHOT 4 in a pinch and will save half a shoot day — but only if the counter dressing matches, which on most existing Willa's footage it does not (the archive pours are shot on empty surfaces, which is the exact thing this brief cannot do)",
      "SHOTS 1, 3 and 5 must be newly shot together in one setup — the matched wide and the tick hold are frame-accurate against each other and cannot be assembled from library clips",
      "Existing Willa's shelf and lineup stills are fine for the end card and for the Reel cover frame",
      "Do NOT cut in any archive of a person eating, drinking or in frame at all. A face turns a household observation into a personal story about one body, which is precisely the read this brief is engineered to avoid"
    ]
  },
  "AUG24-TT-5":{
    shoot:[
      "THE TAKE — one locked-off vertical medium-wide, two team members shoulder to shoulder, whole script in a single unbroken run. Shoot 10–12 complete takes minimum and cut the FLATTEST one, not the cleanest one; a fluffed word delivered deadpan beats a perfect read with a smile in it",
      "Pre-shoot capture: screen-record the actual AI prompt and its response on a laptop before rolling. Not for the edit — it is the receipt that backs the on-screen 'unedited' line if anyone asks, and it lives in the shoot folder",
      "Frame check before the first take: Willa's Original set at the lower-right edge of frame, label forward, sharp, and confirmed visible in the phone preview — it must be there from frame one and never repositioned between takes",
      "The 0:15 pick-up — Performer B lifting the carton to chest height and reading the front. Shoot this beat 5–6 extra times in isolation as a safety, matching eyeline and hand height to the master take exactly in case the master needs a patch",
      "Safety close-up, shot AFTER the master is in the can: hands holding the carton at chest height, static, 6 seconds, no movement — only to be used if a legibility issue turns up in the edit, and only as a last resort since a cut breaks the one-take promise",
      "Clean plate of the end-card wall — near-white surface, 4 seconds, no hands — in case the end card gets built in-camera rather than in post"
    ],
    found:[
      "Format reference (documented Aug 19, 2026): https://newengen.com/insights/august-tiktok-trends/ — read the 'we had ChatGPT make us a script' entry before the shoot. The two rules to copy exactly are: film in one continuous take, and deliver every line seriously no matter how strange the writing gets",
      "Format reference (permanent discover page): https://www.tiktok.com/discover/ask-chat-gpt-trend — scroll ten of these back to back and time how long the good ones hold before anyone breaks. That is the bar for the performance direction",
      "Payload reference (Aug 18, 2026): https://www.thenation.com/article/society/protein-ate-our-grocery-stores/ — the vocabulary audit that makes this joke land. Read it for the LANGUAGE the category is using, not for any statistic. Nothing from this piece is cited, quoted or shown on screen",
      "Payload reference (Aug 21, 2026): https://medicalxpress.com/news/2026-08-protein-breakfast-snacks-wont-muscle.html — background only, so the team knows why the bolt-on number is the soft target. No finding from this page may be stated as fact in the caption or on screen",
      "Listening (permanent hashtag page): https://www.tiktok.com/tag/protein — scroll the top posts for the exact adjectives the category is currently renting; feed the recurring ones into the AI prompt so the machine returns the vocabulary the viewer already has in her ear",
      "Posture reference: Olipop's deadpan on-camera Reels — copy the register, not the subject. Willa's is the straight man in this piece and the machine gets all the punchlines"
    ],
    memes:[
      "TEMPLATE: the 'we had ChatGPT make us a script' one-take, live and documented Aug 19, 2026. Mechanic in strict order — prompt the AI for a short scene with a stated setting and vibe, read it once so everyone knows their lines, then shoot the entire thing in a single unbroken take with every line delivered completely straight-faced",
      "NO trending sound is layered on this one, and that is the format's own rule rather than a Willa's exception — the native version of this trend runs on sync audio because the whole payoff is hearing real voices commit to machine copy. A trending bed would supply exactly the energy the performances are withholding",
      "The on-screen 'we had an AI write our oat milk commercial' card at 0:00 is a required part of the template, not a Willa's disclaimer. The viewer is in on the premise from frame one; the surprise is not that AI wrote it, it is that nobody breaks",
      "FORMAT DIFF CHECK (run before the shoot): this must not resemble the two-clip rhyme running on AUG24-TT-3, the one-word-four-times ride from AUG 17, the repeat-twice-reveal-third structure from AUG 17, or the illusion-plus-proof pour from AUG 17. Different mechanic, different cutting pattern, different payload — confirm all four before rolling"
    ],
    archive:[
      "Archive covers almost nothing here by design — a one-take format cannot be assembled from library footage, and every second of the master has to be shot fresh",
      "Reusable from library: the end-card template itself — near-white (#FAFAF7) card, navy (#202A44) type, wordmark bottom-centre. Swap the line to 'The whole oat. Not the syrup.' and nothing else changes",
      "Reusable from library: existing Willa's Original packshots if a legibility patch is ever needed on the carton at 0:15 — last resort only, since inserting one breaks the unbroken-take promise the opening card makes",
      "Explicitly NOT usable: any existing hands-and-counter kitchen b-roll, any pour footage, any latte footage. Cutting to any of it turns this into an ordinary brand video and the format dies on the first edit"
    ]
  },
  "AUG24-PIN-2":{
    shoot:[
      "THE HERO OVERHEAD — full counter flat-lay: 9x13 pan cut into twelve squares with two lifted out, a stack of three on parchment, a bowl of late-summer fruit, four Willa's Kids On-the-Go cartons with straws in, unevenly angled, one unopened carton upright at the right edge, crumbs left where they fell. Leave the top third of the counter empty for type",
      "THE CUT EDGE — tight overhead detail of a lifted square showing the oat-and-blueberry cross-section; this is the texture that makes the pin readable at thumbnail size, so shoot it a dozen times and keep cutting fresh squares until one edge is clean",
      "One adult hand entering from the bottom of frame lifting a square off the stack, sleeve rolled — hands only, no faces, no children on camera",
      "The overnight assembly, shot the night before: several Willa's Kids cartons emptied one after another into the bowl of dry oats, poured in sequence, the cartons clearly the source of the liquid rather than a garnish",
      "Four Willa's Kids cartons, straws in, beside the 16-pack box in morning window light, an alternate crop for the season-long board",
      "MIRROR VERSION — the same overhead one stop brighter with the pan pushed to lower right and the empty counter at left, so the headline can flip sides if the layout needs it"
    ],
    found:[
      "Occasion source (internal only, never cited in copy): https://espnpressroom.com/press-release/college-football-returns-espns-week-0-slate-opens-2026-season-with-dublin-duel-all-acc-clash-cricket-meac-swac-challenge-kickoff-and-more/ — the season-opening slate published Aug 17, 2026 confirming eight games on Sat Aug 29 with a noon kickoff",
      "Occasion source (internal only): https://sports.yahoo.com/articles/college-football-games-today-2026-184854593.html — Aug 22, 2026 coverage framing the weekend just past as the last Saturday without football, which is what puts the planning window inside this week",
      "Format reference: https://www.thekitchn.com/53-big-batch-breakfasts-you-can-make-ahead-of-time-229838 — the evergreen make-ahead-breakfast-for-a-crowd roundup this pin is competing against in search; study the titles for the plain language to match",
      "Method reference: https://www.thekitchn.com/healthy-baked-oatmeal-the-easiest-make-ahead-method-252030 — the assemble-at-night, bake-in-the-morning method. NOTE: the reference version is dairy- and egg-coded; the Willa's build swaps to Willa's Kids, flax and Country Crock Plant Butter, which is exactly the substitution the description should make visible",
      "Search-surface reference (permanent page): https://www.pinterest.com/search/pins/?q=make%20ahead%20breakfast%20for%20a%20crowd — scan the top saved pins for how the crowd-scale shot is framed; the strongest ones show the whole pan, not a single plated portion",
      "Product reference (permanent page): https://willaskitchen.com/products/kids-oat-milk-8z-16-pack — the Willa's Kids page, for label-facing accuracy on the cartons in frame — note this is the real single-serve 8oz On-the-Go format, not a large pourable carton",
      "Aesthetic reference: Fishwife and Graza feeds — the type restraint to match. One confident headline over one honest photograph, never a recipe card, never a badge stack"
    ],
    memes:[
      "Static pin — no meme template, no trending sound and no format ride applies here. The two meme rides of the week live on TikTok (TT-3 and TT-5) and this surface deliberately does the opposite job: it is built to be found in search weeks from now, so it carries nothing time-stamped. The only wit on the pin is the kicker line, 'nobody's cooking to order on a game morning,' and it only lands if everything around it stays plain"
    ],
    archive:[
      "Existing Willa's Kids carton stills and label close-ups (of the actual 8oz On-the-Go carton) can back up the right-edge placement and any recrop for the board",
      "Existing carton stills of Willa's Kids cover the four-cartons alternate if the shoot runs long",
      "The pan, the cut cross-section and the full counter must all be shot fresh — there is no archive of a crowd-scale bake, and this is the frame the whole pin rests on"
    ]
  },
  "AUG24-IG-R3":{
    shoot:[
      "The bowl of raw organic oat groats in a hard rectangle of window light on a wood counter — shoot the establishing wide first while the sun edge is crisp, and shoot it before anything is touched so the surface is clean",
      "Hands pouring groats hand to hand at 120fps, backlit, cut to roughly half speed — shoot at least six passes and choose the one where the most kernels miss; the scatter is the shot, not the catch",
      "Macro of a single whole groat rolling to a stop, filling two-thirds of frame, stopped down far enough that the bran husk and the pale germ end are both legible — four angles, this is the proof frame",
      "THE RITUAL BEAT (borrowed mechanic, the one thing that cannot be skipped): thumb under the cap of Willa's Original, quarter twist, the seal cracking, cap set down on the wood beside the scattered groats — real speed, no cut, close-mic'd",
      "The pour into a clear straight-sided glass shot at glass height so the stream reads thick and the head folds over — pour four times, keep the one where a single drop lands on the counter, and leave the drop",
      "The rest frame: glass half in sun, groats round the base, carton label-forward and in focus behind, held long and still for the three-tick overlay to type onto",
      "Insurance pass with no product at all — grain, hands, light, wood — for the Story cutdown and the cover frame"
    ],
    found:[
      "Anchor signal (T-10): USDA NASS Crop Progress, week ending Aug 16, released Aug 17, 2026 — https://esmis.nal.usda.gov/sites/default/release-files/796020/prog3326.pdf",
      "Corroboration, Iowa oats 96% harvested and six points ahead of last year (Aug 18, 2026) — https://kmch.com/2026/08/18/iowa-crop-progress-condition-report-august-17/",
      "Permanent reference page for crop-progress publications, undated — https://www.nass.usda.gov/Publications/National_Crop_Progress/index.php",
      "Mechanic reference (CP-6), the package-as-ritual move being borrowed — trade coverage dated Aug 20, 2026: https://sporked.com/article/sweetgreens-new-salad-comes-with-its-own-canned-tuna/",
      "Mechanic reference (CP-6), the brand's own limited-time landing page, permanent reference — https://www.sweetgreen.com/landing/fishwife/ (study how the tin is shot as an object with a job, not as packaging)",
      "Audio reference (CP-10), the record released Aug 21, 2026 — https://tinnitist.com/2026/08/20/albums-of-the-week-grace-potter-trespasser/ ; album listing for clearance check: https://music.apple.com/us/album/trespasser/1895159104",
      "Product truth check before any overlay is typed, permanent page — https://willaskitchen.com/products/unsweetened-original"
    ],
    memes:[
      "No meme template and no trending-sound ride on this one — deliberately. The week already carries two format rides (TT-3 on the two-clip rhyme, TT-5 on the AI-script one-take) and a third would flatten the slate; this is the week's one piece of straight editorial craft.",
      "The only borrowed structure is CP-6's package-as-ritual mechanic — the cap, the tilt, the small mess — which is a shooting instruction, not a format. It is invisible to the viewer, which is the point.",
      "Register references to watch before the shoot: Fishwife and Graza editorial stills — beautiful, dry, product doing something. Explicitly NOT the sunset-over-a-grain-bowl-with-an-affirmation register, which is the failure mode this brief is one bad grade away from."
    ],
    archive:[
      "Existing Willa's carton pack shots and label macros can cover the end-card frame and the Story still — the label does not need to be re-shot.",
      "Any previously captured whole-groat macro from the WholePlant process shoots can substitute for beat three if the macro lens is not available, provided the grade is matched warm.",
      "Do NOT cut in stock harvest, field, combine or aerial footage of any kind. It would be the one dishonest frame in a piece whose entire argument is that the thing in the bowl is real, and it also risks implying a sourcing claim the brand cannot substantiate."
    ]
  },
  "AUG24-TT-4":{
    shoot:[
      "THE MASTER TAKE — one continuous orbit of a real kitchen table, six people, one Willa's Kids carton passed hand to hand, one pour each. Shoot it eight to ten times end to end. Select on realness, not cleanliness: the winning take is the one with overlapping talk, a dog crossing frame, or a glass set down too hard.",
      "The kid's over-pour on a stool, two-handed, slightly too much — shoot as a protected safety insert as well as inside the master, because it is the single most human second in the piece.",
      "The final drain — grandparent tipping the carton fully vertical to get the last of it, plus the flat delivery of 'that's everybody' — four or five takes, keep the least performed one.",
      "The wide release — camera pull-back and slight rise to a high three-quarter of the full table with six poured glasses, everybody mid-motion. Hold six seconds so the edit can breathe.",
      "Clean plate of the empty carton beside six full glasses on the table, no hands, held five seconds, as a trim safety.",
      "Cast + location prep list to shoot against: real lived-in kitchen, one-sided morning window light, no ring light, no styling pass, and a sweep of the frame for anything with a team, a league, a broadcast, alcohol, or dairy in it before the first take rolls."
    ],
    found:[
      "Schedule + timing reference ONLY, never footage: https://espnpressroom.com/press-release/college-football-returns-espns-week-0-slate-opens-2026-season-with-dublin-duel-all-acc-clash-cricket-meac-swac-challenge-kickoff-and-more/ (Aug 17, 2026) — confirms the eight-game Saturday Aug 29 slate and the noon kickoff that sets the 9am framing. Nothing from this page, no team, network or matchup, reaches any consumer surface.",
      "Timing confirmation: https://sports.yahoo.com/articles/college-football-games-today-2026-184854593.html (Aug 22, 2026) — confirms the season starts Aug 29 and the anticipation window is already running, which is why this posts Saturday morning rather than Friday.",
      "Format reference: https://lightreel.ai/blogs/whats-trending-on-tiktok (weekly report covering Aug 15–22, 2026) — the 'B4 B4' relay entry and the poolside group-montage reference version. Read the mechanic, then throw away the dance: the transferable part is the one-to-two-second micro-turn and the hard cut on the beat.",
      "Listening (permanent tag page): https://www.tiktok.com/tag/relay — scroll group-handoff posts before the shoot to calibrate how fast a handoff can read and still be legible on a phone. Reference only; nothing from it appears in the cut."
    ],
    memes:[
      "Template being ridden: the group-relay handoff — four to six people, one to two seconds each, hard cut on the beat, single continuous video. Willa's substitution is the only change that matters: the baton is a physical object, the Willa's Kids carton, and the micro-turn is a pour instead of a dance fragment.",
      "Do not name the format, caption the format, or nod to the format on screen. The video is the format; announcing it is what makes a brand version die. No 'we tried the trend' framing, no text explaining the mechanic.",
      "Format hygiene against the burn corpus: this is NOT the two-clip rhyme (AUG24-TT-3), NOT repeat-twice-reveal-third or the one-word-four-times bob (both AUG 17), NOT the bass-drop reveal (AUG 03), and NOT illusion-plus-proof (AUG 17). It is a continuous single-space group relay, unused by Willa's in the last six weeks."
    ],
    archive:[
      "Archive cannot cover the relay — it is one continuous take in one space with a booked cast and there is no substitute for shooting it.",
      "Archive CAN cover: the end card (cream card, brown type, Willa's wordmark — reuse the standing template), any Willa's Kids carton pack shot needed for the thumbnail, and existing clean pour-into-glass inserts as emergency trim material if a handoff in the master take is unusable.",
      "Explicitly excluded from any archive pull: stock kitchens, stock families, any sports or stadium footage, any broadcast clip, and any existing Willa's footage that has a lunchbox, a backpack or a school reference in frame."
    ]
  },
  "AUG24-IG-F1":{
    shoot:[
      "CARD 1 typography plate — a clean cream sweep with nothing on it, shot or built with enough margin that the hook can sit large and left with real air around it",
      "THE COFFEE: 45-degree over a chipped mug of black coffee, hand tilting Willa's Original in, pour caught mid-bloom while the swirl is still opening. Shoot 4-5 takes, this is the strongest single frame in the set",
      "THE BOWL: straight-down over oats or cereal with the milk already in and the spoon abandoned at an angle, carton just inside the top of frame",
      "THE BLENDER: eye-height straight-on, jar half-loaded with frozen banana, berries and oats, carton mid-pour with the level visibly dropping",
      "THE KID'S GLASS: short heavy glass on a kitchen table poured from Willa's Kids, a small hand entering from the edge of frame to take it — hand only, cast household, never a founder's family member",
      "THE BATTER: overhead into a mixing bowl mid-whisk, batter still streaky, carton open beside the bowl with the cap next to it",
      "THE PAN: low and close over a warm skillet, a splash going in from a measuring cup, steam catching window light",
      "END CARD: Original and Kids together on a windowsill in late-morning light with cream negative space above for the ingredient lines and the stinger",
      "Shoot all six use frames in ONE kitchen on ONE morning in a single session — same counter, same light direction — and clear every competing carton off the shelf behind camera before the first frame"
    ],
    found:[
      "Reference (Instagram): https://www.instagram.com/partakefoods/ — the register to match. Read how their cart-and-kitchen posts stay warm and self-aware without ever punching down at the shopper, then write the card overlays in that same plain, shared voice",
      "Reference (Instagram): https://www.instagram.com/willas_kitchen/ — house continuity check. The six use frames have to sit in this feed without looking like a different brand shot them",
      "Reference (TikTok): https://www.tiktok.com/tag/whatieatinaweek — not a format to ride, a language mine. Listen to how people actually narrate a week of ordinary eating before writing the use labels, then keep every label to a plain noun",
      "Reference (brand): https://www.willaskitchen.com/ — confirm the current Original and Kids carton art and the exact ingredient wording before the end card is set"
    ],
    memes:[
      "No meme template, no trending sound and no format ride — this is a static carousel and CARD 1 carries the whole confession on its own. The recognition IS the mechanic; bolting a template on top would turn a shared, tender line into a bit and flatten it. If the team wants a format ride this week, AUG24-TT-3 and AUG24-TT-5 are the two meme slots and this brief must stay out of their way"
    ],
    archive:[
      "Existing coffee-pour footage can cover CARD 2 if the swirl reads open rather than fully mixed and the light is real window light, not a lightbox",
      "Existing whisk and batter footage can cover CARD 6 if the carton is open and identifiable in the same frame",
      "Existing windowsill carton stills can cover CARD 8 provided both Original and Kids are in the shot together",
      "Cards 3, 4, 5 and 7 need a fresh shoot — the blender, the kid's glass and the pan have no usable archive, and the six use frames have to come from one continuous morning to read as one kitchen"
    ]
  },
  "AUG24-TT-6":{
    shoot:[
      "The dressed BEFORE shelf, locked tripod at shelf height, square to the shelf — tape the tripod feet and shoot a clean 8-second hold before anything is touched. This same frame has to be reproducible exactly for the AFTER, so shoot BEFORE and AFTER back to back without moving the camera",
      "The clear-out as ONE continuous take: a single hand entering from camera-right removing the lime, the neon bottle, the two unfinished bottles, the herbs, one at a time with real sound on each. Shoot it 5-6 times and cut the slowest take, not the tidiest one",
      "The empty shelf held for a full 3 seconds with no hand, no text and no music — shoot this as its own clean plate so the edit can extend the pause if it needs to",
      "The AFTER rebuild: honest September items going back (jar of something homemade, grapes, small stack of eggs, apples), then Willa's Original returned to the exact spot it held in the BEFORE frame, with Willa's Chocolate set beside it. Shoot the carton placement 4-5 times — it is the beat the eye lands on",
      "Slow 2-second push-in from the wide shelf to the two cartons, single move, no whip and no snap zoom",
      "Safety cutaway: an overhead of the removed items lined up on the counter, unbranded and label-turned, held 4 seconds — useful if a line needs trimming without breaking the locked shelf frame"
    ],
    found:[
      "Permanent reference (format literacy, watch before dressing the shelf): https://www.tiktok.com/tag/fridgerestock — scroll the top posts for how a real shelf reads on camera vs a styled one. Steal the sound design and the pacing of hands moving; do NOT steal the container-bin aesthetic, which reads as an organising-product ad and kills the confession",
      "Structure reference (why the claim is in frame one): https://lightreel.ai/blogs/whats-trending-on-tiktok — platform report dated Aug 22, 2026 on compressed, front-loaded chaptered editing. Read it, then look at the hook overlay and confirm the whole situation is stated before the first frame ends",
      "Mood reference, INTERNAL ONLY — do not screenshot, quote, name or reference on any surface: https://www.forbes.com/sites/paultassi/2026/08/21/netflixs-outer-banks-season-5-sets-an-imdb-review-score-record/ — this is the end-of-an-era feeling the week is sitting in, and the reason this brief exists. It is context for the voiceover's register only",
      "Product reference (ingredient wording, carton facings, correct SKU art for both cartons): https://www.willaskitchen.com/ — check the Original and Chocolate ingredient lists against the overlay copy before the shoot"
    ],
    memes:[
      "No meme template and no trending sound on this one, deliberately. What is borrowed is a STRUCTURAL habit — the front-loaded claim in frame one per the Aug 22, 2026 platform report — not a format bit, a sound, or a caption template. TT-3 and TT-5 carry the week's two explicit meme rides; a third would make this shelf read as a gag and the confession register is the whole point",
      "Explicitly forbidden as a reference layer: any nostalgia-edit sound, any end-of-an-era supercut audio, any show soundtrack. The feeling is being earned by a dry lime, not borrowed from a title card"
    ],
    archive:[
      "Existing pour and glass footage is NOT usable here — there is no pour in this brief and dropping one in would break the single-frame discipline",
      "Archive carton hero stills of Original and Chocolate can cover the end card if the wordmark lockup needs rebuilding",
      "Any previously shot fridge-interior B-roll can be checked for a dairy carton or a legible competitor bottle in the door racks — if it exists in the library, flag it now so nobody reaches for it during the edit"
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
const WELCOME_WEEK_KEY = "AUG-24-2026";
const WELCOME_WEEK_RANGE = "AUG 24 – AUG 30, 2026";
const WELCOME_REFRESHED = "AUG 24, 2026";

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
  pullQuote:"the shelf turned orange in six days. one national coffee chain opened its fall lineup aug 19 — a five-item pumpkin range, an entirely new tiramisu line, and a latte carrying a 17-gram protein claim — and the second chain flips its own menu aug 25, which moves the whole morning-drink occasion from cold-and-simple to syrup-and-spice inside one week. protein is having that same moment everywhere else: a national feature published aug 18 traced the claim onto pizza crust, instant noodles and cocktails, and an analysis three days later, on aug 21, said the number bolted onto a breakfast isn't doing what the box implies. at the same time the front of a package quietly became a legal surface — a class action filed aug 12, reported aug 18, over 'sugar free' hydration sticks turns on a genuinely unsettled rule — fda guidance since 2019 lets allulose sit outside both the total sugars and the added sugars figures, so a product can carry an actual sweetener, print it in the ingredient list, and still keep it out of the number. the category threw itself a party on aug 22: ninth annual, 47,000 people signed up for a seven-day dairy-free run, and a heritage campaign mapping roughly 5,000 years of plant milk across six continents. the money picture is neither as sunny nor as bleak as the last month of headlines suggested — the biggest grocery door in the country posted 2.6% comparable sales on aug 20, its slowest pace in years, and the volume that still grew inside grocery was pantry and fresh, while a warehouse private label cut its organic oat six-pack about 20% and is logging there through aug 24. and the plant-based retreat story broke in half on aug 17, when the category's biggest listed player was flagged up 41% on the month and 29% on the year on the same day a different plant-based name fell 11% on a reverse split — the read being that the weakness was company-specific, not category-wide. out in culture: a six-year series dropped its final ten episodes at once on aug 20 and the internet spent the week on last-summer feeling, the first football saturday of the year is aug 29 with a noon kickoff and eight games behind it, and the oat harvest is running ahead of last year's pace — iowa was 96% off the field by aug 16.",
  the_moves:[
    {kind:"ship", verb:"Open Wed Aug 26 at 9am inside a real store mid-reset — one continuous walk, the entire claim in on-screen text at frame one, four ingredients said out loud on the way back to the cold case.", why:"Two national coffee menus flipped to pumpkin, spice and tiramisu six days apart, Aug 19 and Aug 25, and the grocery shelf resets behind them. Every brand in the category will spend September proving it can flavor something. The only argument nobody else can make is subtraction: this carton has no autumn edition, no limited run, and no syrup pump — the pour in September is the pour from June. Shot handheld in a store going orange, hands and shelves only, Christina off camera. The structure is the part to hold: the claim goes in the first frame as flat on-screen text and the rest of the video spends itself proving it, with no build and nothing withheld. Guardrails are absolute — no chain, no menu item, no competitor named in script, overlay or caption, and no claim that Willa's beats a seasonal drink on taste. Only that it never needed a seasonal version."},
    {kind:"ship", verb:"Get the sugar number on record Thu Aug 27 at 9am — Christina to camera, one plain sentence about the labelling gap, then one gram, from the oats, nothing standing behind it.", why:"A front-of-pack sugar claim stopped being a marketing decision this window and started being a litigation surface. The mechanism is public and specific: FDA guidance counts allulose outside both Total Sugars and Added Sugars, which means a product can be sweetened and still clear a sugar-free claim, and an Aug 21 trade analysis shows the sweetener spreading fast for exactly that reason. Willa's has never needed the workaround, and saying so while it is still a brand choice rather than a legal position is worth far more than saying it after the category is forced to. This is the one brief of the week where a face beats hands, because the payload is the stance. Name no brand, no plaintiff, no case, and never say Willa's is sugar-free — it is 1g, and the whole point is that the number is honest."},
    {kind:"ship", verb:"Claim the 9am, not the tailgate — Sat Aug 29 is the first football Saturday of the year and Willa's has never been in that kitchen.", why:"Eight games run from a noon kickoff into the night on Aug 29, which means several million households are up early with a full table and no time. Gameday is one of the last big unclaimed occasions on the board — the brand has never posted into it, the category treats it as a beer-and-chip lane, and the morning shift before kickoff is completely unowned. Two briefs take it from opposite ends: a Saturday morning relay where one carton gets passed hand to hand around a loud kitchen, and a Friday pin for the make-ahead pan that gets searched the night before. No tailgate, no stadium, no team, no logo, no school — this is a house on a Saturday morning, and the occasion is the only peg it needs."},
    {kind:"hold", verb:"Hold the price answer. A warehouse private label is logging its organic oat six-pack about 20% down through Aug 24 — that gets answered with worth on Sat Aug 29, and never with a number.", why:"This is the week's most tempting mistake. Private label cutting an organic oat SKU by a fifth, in the same week the biggest grocery door leans on thousands of rollbacks to hold share, will read to everyone as a signal to talk about value. Willa's does not answer a price move with a price move, and the retailer's own numbers say the useful thing anyway: shoppers under pressure kept adding pantry and fresh volume. So the answer is versatility, not money — the Saturday carousel counts what one carton actually covers across a week of mornings, six jobs, one fridge door. If a single dollar figure, cost-per-serving, retailer or the word 'cheaper' reaches a card, the brief has failed and should be pulled rather than edited."}
  ]
};


const WELCOME_HIGHLIGHTS = [
  {
    glyph:"🎃",
    kindLabel:"Category",
    color:"#75C596",
    stat:"6 DAYS",
    statLabel:"between the two flips",
    label:"Fall flavor season opened Aug 19 — five pumpkin drinks, a tiramisu line, and a 17-gram protein claim on a latte",
    detail:"A national coffee chain launched its full fall lineup on Aug 19, 2026: a five-item pumpkin range including a Nutty Pumpkin Protein Latte carrying a 17g protein claim, plus an entirely new tiramisu beverage line. The second national chain confirmed its own fall menu lands Aug 25, 2026, led by the pumpkin spice latte. Six days apart, the whole morning-drink occasion moves from cold-and-simple to syrup-and-spice, and the grocery shelf resets behind it. This is the week's lead brief and the discipline is exact: no chain, no menu item and no competitor is named anywhere, and Willa's never claims to beat a seasonal drink on taste — only that it never needed a seasonal version.",
    sources:[
      {label:"Yahoo Lifestyle · Dunkin' 2026 fall menu: Pumpkin spice is back and it's not alone (Aug 19, 2026)", url:"https://www.yahoo.com/lifestyle/articles/dunkin-2026-fall-menu-pumpkin-090102966.html"},
      {label:"Fox 10 Phoenix · Starbucks reveals Pumpkin Spice Latte return date, Aug 25 (Aug 19, 2026)", url:"https://www.fox10phoenix.com/news/starbucks-reveals-pumpkin-spice-latte-return-date-2026"}
    ]
  },
  {
    glyph:"🍬",
    kindLabel:"Labels",
    color:"#73B2C9",
    stat:"4–5g",
    statLabel:"of sugar behind a 'sugar free' claim",
    label:"A 'sugar free' claim just got sued over a sweetener the FDA itself counts as sugar",
    detail:"A class action filed Aug 12, 2026 in California — reported Aug 18 — alleges a national electrolyte-mix brand's 'sugar free' hydration sticks are sweetened with 4–5g of allulose per serving. The rule it turns on is genuinely unsettled: the complaint leans on FDA's 2016 Nutrition Facts rule, which listed allulose inside Total Sugars, while FDA guidance since 2019 lets it sit outside both Total Sugars and Added Sugars — still in Total Carbohydrate, still in the ingredient list, just not in the number. That gap is why a product can carry an actual sweetener and still clear the claim. Trade analysis published Aug 21, 2026 shows the sweetener spreading fast for exactly that reason. The move is to state Willa's plainly while it is still a brand choice rather than a legal position — 1g of sugar, from the oats, nothing standing behind the number. No brand, no plaintiff, no case is ever named.",
    sources:[
      {label:"ClassAction.org · 'Sugar free' Liquid I.V. electrolyte drink mixes contain sugar, class action claims (Aug 18, 2026)", url:"https://www.classaction.org/news/sugar-free-liquid-i.v.-electrolyte-drink-mixes-contain-sugar-class-action-lawsuit-claims"},
      {label:"FoodNavigator · The rise of allulose: can this rare sugar crack the clean-label challenge? (Aug 21, 2026)", url:"https://www.foodnavigator.com/Article/2026/08/21/why-allulose-is-gaining-industry-attention/"}
    ]
  },
  {
    glyph:"🏈",
    kindLabel:"Occasion",
    color:"#9E652E",
    stat:"AUG 29",
    statLabel:"noon kickoff, eight games",
    label:"The first football Saturday of the year lands Aug 29 — and the hard part of that day is at nine in the morning",
    detail:"The official season-opening slate, published Aug 17, 2026, puts eight games on Saturday, Aug 29, 2026, running from a noon kickoff into the night, with coverage dated Aug 22, 2026 framing it as the last Saturday of the summer. This is the freshest untouched occasion available to the brand: the category treats gameday as a beer-and-chips lane and nobody owns the morning shift that gets a full house fed before anyone leaves. Two briefs claim it from opposite ends — a Saturday relay around a loud kitchen table and a Friday make-ahead pin built for the search that happens the night before. No tailgate, no stadium, no team, no logo.",
    sources:[
      {label:"ESPN Press Room · College football returns: ESPN's Week 0 slate opens the 2026 season (Aug 17, 2026)", url:"https://espnpressroom.com/press-release/college-football-returns-espns-week-0-slate-opens-2026-season-with-dublin-duel-all-acc-clash-cricket-meac-swac-challenge-kickoff-and-more/"},
      {label:"Yahoo Sports · Are there college football games today? 2026 season starts August 29 (Aug 22, 2026)", url:"https://sports.yahoo.com/articles/college-football-games-today-2026-184854593.html"}
    ]
  },
  {
    glyph:"🛒",
    kindLabel:"Retail",
    color:"#A191B2",
    stat:"2.6%",
    statLabel:"comps — slowest in years",
    label:"The country's biggest grocery door posted its slowest comparable sales in years — and the volume that still grew was pantry and fresh",
    detail:"Quarterly results reported Aug 20, 2026 showed US comparable sales up 2.6%, the slowest pace in years, even as total revenue rose 5.9% year over year on e-commerce, advertising and membership. Grocery comps rose mid-single digits on pantry and fresh-food volume, with the company leaning on roughly $3 billion in tariff refunds and 11,000-plus rollbacks to hold share. In the same window, warehouse price tracking across 641+ locations shows a private-label organic oat six-pack logging roughly 20% below its earlier list through Aug 24, 2026. All of it is internal: the answer is worth, not money — pressured shoppers are still buying real food, they have just started interrogating what each item earns.",
    sources:[
      {label:"CNBC · Walmart (WMT) Q2 2027 earnings (Aug 20, 2026)", url:"https://www.cnbc.com/2026/08/20/walmart-wmt-q2-2027-earnings.html"},
      {label:"PYMNTS · Walmart sees mid-single-digit grocery growth as shoppers prioritize affordability (Aug 20, 2026)", url:"https://www.pymnts.com/earnings/2026/walmart-sees-mid-single-digit-grocery-growth-as-shoppers-prioritize-affordability/"}
    ]
  },
  {
    glyph:"🌾",
    kindLabel:"Supply",
    color:"#75C596",
    stat:"96%",
    statLabel:"of Iowa's oats off the field",
    label:"This year's oat harvest is running ahead of last year's pace — the only honest fall story in the category",
    detail:"USDA crop reporting for the week ending Aug 16, 2026, released Aug 17, 2026, shows the oat harvest well underway across the nine states that account for 78% of US oat acreage. Iowa stood at 96% harvested, six points ahead of last year's pace after running 25 points ahead in early August; Wisconsin sat at 57% the week prior. While the rest of the category spends September proving it can flavor something, the raw material under a four-ingredient carton is coming off a real field right now. The Friday Reel takes it as texture rather than agronomy — groats in a hand, one pour, no statistics on screen and no harvest-report language anywhere in the copy.",
    sources:[
      {label:"USDA NASS · Crop Progress, week ending Aug 16 (released Aug 17, 2026)", url:"https://esmis.nal.usda.gov/sites/default/release-files/796020/prog3326.pdf"},
      {label:"USDA NASS · National Crop Progress publications index (permanent reference page)", url:"https://www.nass.usda.gov/Publications/National_Crop_Progress/index.php"}
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
  "Everybody's fall menu just dropped and the shelf is going orange. We don't have a seasonal version of anything — is that a story, or does it just make us look like we missed the moment?",
  "A brand is getting sued because its 'sugar free' claim sits on top of a sweetener the FDA counts as sugar. How do I say our gram of sugar is real without sounding like I'm dunking on somebody's lawsuit?",
  "The first big football Saturday is Aug 29 and we've never posted anything for gameday. Is the morning actually ours, or is that us reaching for an occasion that belongs to beer?",
  "A warehouse label just cut its organic oat six-pack by about a fifth. I know we don't answer on price — so what do I actually say to the person standing there doing the math?"
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
