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
    trend:"New York's GRAS-disclosure bill heads to Hochul's desk — first state to force a published safety basis for self-affirmed ingredients ⚖️",
    detail:"Davis Wright Tremaine published a Jun 8, 2026 analysis of New York's Food Safety and Chemical Disclosure Act (AB 1556/SB 1239), now on Governor Hochul's desk after passing the Assembly 106-32 and the Senate unanimously. If signed, NY becomes the first state to require food companies to publish the scientific safety report behind any self-affirmed 'GRAS' ingredient, and to ban Red Dye 3, potassium bromate, and propylparaben. Provisions take effect 180 days after signing.",
    platform:"Trade + legal press",
    views:"National legal + food-trade pickup",
    velocity:"high",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    healthSubAngle:"IMMUNE",
    angle:"The shelf is being forced to show its safety homework. Make a calm authority Reel — a 4-ingredient label has no self-affirmed mystery to disclose.",
    urgency:"RIDE NOW",
    sources:[
      {label:"Davis Wright Tremaine · Another Patch in the Quilt? New York Legislature Passes GRAS Reform Bill (Jun 8, 2026)", url:"https://www.dwt.com/insights/2026/06/new-york-gras-food-ingredient-disclosure-bill"},
      {label:"CSPI · New York GRAS reform + food chemical disclosure (Jun 2026)", url:"https://www.cspinet.org/protecting-our-food-system/food-chemical-safety"}
    ]
  },
  {
    id:"T-2",
    trend:"Industry-backed FRESH Act would wipe out state food-chemical laws and shrink FDA's GRAS review window to 90 days 🏛️",
    detail:"The proposed FRESH Act of 2026 would let federal additive rules preempt the growing state patchwork (NY, CA, WV, LA) and give FDA just 90 days to review a new GRAS substance — after which it auto-clears, per Dr. David Acheson's Food Safety News breakdown carried through June coverage. Consumer Reports and CSPI are fighting it. The fight pits 'one national standard' against the state-level transparency wins.",
    platform:"Trade + policy press",
    views:"National policy-press cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"While Washington debates who polices additives, make a transparency Reel — Willa's already wrote its own toughest standard: 4 ingredients, every lot tested.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Food Safety News · GRAS, additives, chemicals: Who should hold the authority? (Jun 2026 coverage)", url:"https://www.foodsafetynews.com/2026/06/gras-additives-chemicals-who-should-hold-the-authority/"},
      {label:"C&EN (ACS) · States expected to leapfrog feds on food-chemical regulation (2026)", url:"https://cen.acs.org/policy/chemical-regulation/food-chemical-additive-dye-ingredient-ultraprocessed-fda-maha-gras-preemption/104/web/2026/01"}
    ]
  },
  {
    id:"T-3",
    trend:"Oat milk is the category's fastest-growing lane — projected $3.67B (2025) to $10.68B by 2034 as plant milk hits 16% of U.S. milk dollars 📈",
    detail:"Trade analyses heading into mid-2026 peg oat milk at roughly $3.67B in 2025 growing to $10.68B by 2034 (~12.6% CAGR), the fastest-rising plant-milk subcategory. Plant-based milk now accounts for ~16% of all U.S. retail milk dollar sales and is bought by ~42% of households. The 2026 category story per FoodNavigator: 'whole ingredients' and protein boosts are the differentiators brands are chasing.",
    platform:"Trade press + market research",
    views:"Category market-data cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"The category is finally chasing 'whole ingredients + protein' — not a 2026 pivot for Willa's, it's the whole-oat thesis from day one. Make a confident category-POV Reel.",
    urgency:"THIS WEEK",
    sources:[
      {label:"The Food Institute · Oat Milk Is Gaining Considerable Ground in the Plant-Based Milk Category (Jun 2026)", url:"https://foodinstitute.com/focus/oat-milk-is-gaining-considerable-ground-in-the-plant-based-milk-category/"}
    ]
  },
  {
    id:"T-4",
    trend:"Coconut milk is named the dairy-free 'champion' of summer 2026 coffee as cafes chase tropical iced builds 🥥",
    detail:"Summer-2026 coffee-shop trend forecasts name coconut milk the dairy-free champion of the season — tropical iced coffees, frozen coconut frappes hitting QSR menus, and ready-to-mix iced coffee concentrates, building on coconut coffee's 2025 breakout. Iced Coconut Whipped Coffee specifically shows ~38% engagement growth. The throughline: dairy-free plant milks that read indulgent and photograph like a treat, not 'health-food.'",
    platform:"Trade + cafe-menu trend forecasts",
    views:"Season-defining cafe trend cycle",
    velocity:"medium",
    pillars:[
      "INGREDIENTS/RECIPES"
    ],
    angle:"The category is rewarding dairy-free that tastes indulgent. Make a Barista pour Reel positioning whole-oat creaminess as the creamy answer the tropical-syrup wave is missing.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Dilworth Coffee Pro · Summer Sips: Leveraging 2026's Biggest Drink Trends for Coffee Shops (Jun 2026)", url:"https://pro.dilworthcoffee.com/blogs/news/summer-sips-leveraging-2026-s-biggest-drink-trends-for-coffee-shops"},
      {label:"QSR Magazine · Luckin Coffee Launches New Orange C Series of Summer Drinks (Jun 2026)", url:"https://www.qsrmagazine.com/uncategorized/luckin-coffee-launches-new-orange-c-series-of-summer-drinks/"}
    ]
  },
  {
    id:"T-5",
    trend:"GlobalData crowns 'proffee' a fastest-growing 2026 drink trend as coffee gets redefined around protein + energy ☕",
    detail:"GlobalData declared 'proffee' (protein iced coffee) one of the fastest-growing functional-drink developments of 2026, as consumers redefine coffee around protein, energy, and convenience over sugary lattes. Chains followed — Starbucks added 15-36g protein cold foams; Bulletproof launched a 12g instant iced coffee. The reductive risk per the coverage: protein-coffee as a meal-replacement shake rather than an additive morning ritual.",
    platform:"Trade press + RTD shelf",
    views:"Functional-drink category cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    healthSubAngle:"GUT",
    angle:"Ride proffee as additive, not reductive — make a Reel where a whole-oat pour brings real 4g+ protein and fiber to iced coffee without turning breakfast into a shaker.",
    urgency:"THIS WEEK",
    sources:[
      {label:"The Food Institute · Brewing Gains: 'Proffee' Momentum Grows (2026)", url:"https://foodinstitute.com/focus/brewing-gains-proffee-gains-momentum/"},
      {label:"GlobalData · Functional drink trends 2026 (proffee / protein coffee)", url:"https://www.globaldata.com/store/industry/food-drink/"}
    ]
  },
  {
    id:"T-6",
    trend:"Dietitians flip the protein-maxxing script: most active adults already hit their target 🥄",
    detail:"As protein holds the #1 nutrition-trend spot in 2026 (IFIC), June coverage is turning to the overconsumption critique: dietitians note most active adults already meet the 1.2-1.6 g/kg target and warn that loading fortified products on top adds calories, GI distress and cost without benefit. The body can't store surplus protein — it excretes it or converts to fat. The backlash position: more isn't better; whole-food source is.",
    platform:"Health + nutrition press",
    views:"Mainstream nutrition-cycle pickup",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS"
    ],
    angle:"Willa's protein is additive, not a shaker swap. Make an Original-led Reel positioning whole-oat 4g+ as the calm middle of the protein fight — real food, right amount.",
    urgency:"THIS WEEK",
    sources:[
      {label:"IFIC · 2026 Food & Health Survey (protein as #1 trend)", url:"https://foodinsight.org/2026-food-and-health-survey/"}
    ]
  },
  {
    id:"T-7",
    trend:"Specialty Food Association's 2026 Good Food Awards spotlight 242 small-crafter products judged blind on taste + sourcing 🏅",
    detail:"The Specialty Food Association announced the 2026 Good Food Awards class on Jun 2, 2026: 242 products from 198 crafters chosen by blind tasting from 1,200+ entries, spanning 18 categories. The cohort skews small, mission-driven, often founder-led, judged on both flavor and sustainable, responsible production — the peer set Willa's sits inside as a prior Good Food Awards winner.",
    platform:"Trade press / awards",
    views:"National awards program, 16th year",
    velocity:"medium",
    pillars:[
      "REVIEWS/RECS"
    ],
    angle:"The blind-taste-plus-sourcing standard is exactly Willa's lane. Make a REVIEWS-lane carousel on what 'won on real food' actually means — no fresh-award brief, reference the class as context.",
    urgency:"BACKGROUND",
    sources:[
      {label:"Good Food Foundation · 2026 Winners list", url:"https://goodfoodfdn.org/awards/winners/2026/"}
    ]
  },
  {
    id:"T-8",
    trend:"Matcha demand keeps surging into summer 2026 (+27% YoY searches) even as a global shortage rations cafe supply 🍵",
    detail:"Matcha demand keeps climbing into summer 2026 — global searches up another ~27% YoY — while a deepening shortage (Kyoto tencha auction prices up ~170% YoY) pushes some Western cafes to ration or drop matcha lattes through August 2026. The tension makes matcha both the season's most-wanted drink and a scarcity story. Matcha pairs natively with oat milk, keeping it an evergreen oat-base lane.",
    platform:"Trade press + cafe menus",
    views:"Season-long category cycle",
    velocity:"medium",
    pillars:[
      "INGREDIENTS/RECIPES"
    ],
    angle:"Matcha stays a dairy-free coffee-bar staple. Make a slow oat-milk-matcha pour Reel framing whole-oat creaminess as the build the at-home wave is reaching for.",
    urgency:"BACKGROUND",
    sources:[
      {label:"Fresh Cup · The Matcha Boom Is Reshaping Cafes. How Long Before It Hits a Wall? (Jun 2026)", url:"https://freshcup.com/the-matcha-boom-is-reshaping-cafes-how-long-before-it-hits-a-wall/"},
      {label:"FoodNavigator-USA · Matcha demand + supply squeeze (2026)", url:"https://www.foodnavigator-usa.com/"}
    ]
  },
  {
    id:"T-9",
    trend:"The Over-Optimization Backlash is named 2026's defining wellness trend — culture turns from metrics back to real food 🌿",
    detail:"The Global Wellness Summit's 2026 report named the 'Over-Optimization Backlash' the defining trend of the year, and June coverage shows it cresting: after a decade of sleep scores, HRV tracking, cold plunges and calorie restriction, consumers are revolting against performance-obsessed wellness and demanding joy back. 'Orthosomnia' is now in medical literature; the most-shared early-2026 wellness content is conspicuously analog. The mood: meaning over metrics, abundance over restriction.",
    platform:"Trade + wellness press",
    views:"Industry trend-report cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS"
    ],
    healthSubAngle:"LONGEVITY",
    angle:"Willa's lives where culture is heading: fed-not-tracked, cozy-not-clinical. Make a Reel that answers optimization fatigue with real food that needs no app.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Integrative Nutrition · The Over-Optimization Backlash: Why the Wellness World Is Coming Back to What Actually Works (2026)", url:"https://www.integrativenutrition.com/blog/over-optimization-backlash-wellness-2026"},
      {label:"Global Wellness Summit · 2026 Trends Report", url:"https://www.globalwellnesssummit.com/trends/"}
    ]
  }
];



const TICKER = [
  {agent:"trend", text:"flagged a state transparency bill that would force the shelf to publish its self-affirmed-ingredient safety reports — routed it into the \"four lines, no homework\" calm-authority founder Reel."},
  {agent:"pulse", text:"caught the 'saxophones are getting louder' doom-meter as June's most-used format — aimed it at the OTHER carton, cut the music dead on the calm 4-ingredient label."},
  {agent:"composer", text:"wrote \"one pour for the both of them\" against the latest-possible Father's Day — dad and kid pouring from the same carton, no separate kids' table."},
  {agent:"pulse", text:"answered the recirculating 'oat milk spikes blood sugar like soda' video calmly — it's the processing, not the oat: whole groat, 1g sugar, not close to soda."},
  {agent:"trend", text:"logged oat milk as the fastest-growing plant-milk lane chasing 'whole ingredients + protein' — built \"the whole category wants what's already on the carton\" as confident product truth, no trade stats on the surface."},
  {agent:"pulse", text:"owned the 91M-post espresso-lemonade remix before the chains — a creamy whole-oat Barista layer over the tart base, no rapeseed, no chain sugar load."},
  {agent:"composer", text:"answered optimization fatigue with \"no app. no score. just breakfast.\" — fed-not-tracked, the morning that needs no HRV reading."},
  {agent:"pulse", text:"flipped the protein-maxxing script — \"third scoop? you already hit your number\" — whole-oat 4g+ as the calm middle, not a shaker swap."},
  {agent:"composer", text:"named the fourth answer to the '90s mom quiz — the oat mom — real ingredients, zero restriction, embodied in brand 'we' voice, never satirizing the others."},
  {agent:"comp", text:"logged the legacy oat-milk giants restructuring and retreating — countered with \"the headlines keep changing, the back of this carton hasn't,\" trust the glass, no names."},
  {agent:"pulse", text:"rebuilt FoodTok's confetti 'dot cake' cold-foam latte dairy-free — same photogenic spoon-drag top on whole-oat Kids foam, minus the sugar-bomb creamer."},
  {agent:"editor", text:"wabi-sabi'd the ingredient list — \"a little off-center, a lot less in it\" — the off-center charm is that it's only four things, warm and honest."}
];


const COMPETITORS = [
  {
    id:"C-1",
    name:"Chobani",
    color:"#C9A23F",
    status:"Sent its limited-edition American Blueberry Flavor Drops creamer to Target, Walmart, Kroger and other national retailers Jun 14, 2026, timed to the U.S. 250th-anniversary lead-up — the second drop in its 2026 Flavor Drops series, built on real dairy plus blueberry juice.",
    direction:"up",
    opportunity:"When the category chases limited-edition flavor drops, lean the opposite way — make a Reel anchored on the carton that's the same four ingredients every single week.",
    sources:[
      {label:"FoodBev Media · Chobani debuts limited-edition Flavor Drops creamer (Jun 2026)", url:"https://www.foodbev.com/news/chobani-debuts-limited-edition-flavor-drops-creamer"},
      {label:"Taste of Home · Chobani American Blueberry Flavor Drops creamer (Jun 2026)", url:"https://www.tasteofhome.com/article/chobani-american-blueberry-creamer/"}
    ]
  },
  {
    id:"C-2",
    name:"Oatly",
    color:"#1F6F54",
    status:"Bloomberg reported Jun 9, 2026 that management of Oatly's Greater China business is weighing a buyout, after Greater China revenue fell 2.1% YoY to $29.3M on weak foodservice and shares slid more than 35% since a 2025 strategic review opened.",
    direction:"down",
    opportunity:"While legacy oat-milk giants restructure and retreat, the clean lane is still growing — make a confident product-led Reel that anchors trust in the carton, not the headlines.",
    sources:[
      {label:"Bloomberg · Management of Oatly's China Business Is Said to Consider Buyout (Jun 9, 2026)", url:"https://www.bloomberg.com/news/articles/2026-06-09/management-of-oatly-s-china-business-is-said-to-consider-buyout"},
      {label:"Green Queen · Oatly weighs China carve-out as Greater China revenue slips (Jun 2026)", url:"https://www.greenqueen.com.hk/oatly-china-business-buyout-2026/"}
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
    id:"JUN15-TT-1",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Wed Jun 17 · 9am",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"the saxophones are for the OTHER carton.\" — doom-meter format flip",
    intel:[
      {type:"PULSE", text:"The 'saxophones are getting louder' format (CP-6) — the dramatic Boyz n the Hood sax that swells right before something goes wrong — is one of June's most-used TikTok templates per New Engen + napoleoncat. The structure is dead simple: an ordinary setup, then the metaphorical sax builds to signal incoming dread. The open lane is to aim the doom at the OTHER aisle: flip the average oat-milk back label as the sax climbs (gums, oils, oat syrup, the works), then cut the music dead the second the calm 4-ingredient carton lands. The format does the reach; Willa's short label is the punchline."},
      {type:"AUDIENCE", text:"Willa's buyers are label-flippers who already know that a long back-of-carton list is a red flag — they stop for content that confirms the instinct without making them feel lectured. The win here is the comedic exhale: let the doom-sax do the work the buyer's gut already does, then reward them with the clean cut to four words. Plain-English glosses (oat syrup = the oat turned into sugar) keep the joke landing for the non-insider scrolling past, not just the people who can already read an additive deck."},
      {type:"COMPETITOR", text:"Internal: most oat milks in the set lean on gums, oils, and an enzyme process that turns the oat into syrup and filters out the protein + fiber — the exact stuff the doom-sax is panning across. Willa's uses the whole oat groat, so the back label has nothing to dramatize: four ingredients, 1g sugar, 4g+ protein, 2g+ fiber. The contrast is structural, not a claim — which is why a faceless format-meme can carry it without naming a single brand. Do NOT name or contrast any competitor on this surface."}
    ],
    hooks:[
      {text:"pov: you flip the average oat milk and the saxophones start getting louder 🎷", recommended:true},
      {text:"the back of most oat-milk cartons has a soundtrack. it's the ominous saxophone. 🎷", recommended:false},
      {text:"gums. oils. oat syrup. (cue the dramatic sax.) then there's the one with four words.", recommended:false}
    ],
    caption:"Some back labels read like a horror movie — and yes, the ominous saxophone is included. 🎷 Gums, oils, an enzyme that turns the oat into sugar (that's the \"oat syrup\" you keep seeing)... the list just keeps scrolling. Then there's the carton where the music cuts out, because there's nothing dramatic to play over: organic whole grain oats, filtered water, organic vanilla extract, sea salt. That's the whole list.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 (Original: 4 ingredients · 1g sugar · 4g+ protein · 2g+ prebiotic fiber · certified glyphosate-free.)\n\nNo soundtrack required. Just flip it and read.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#labelcheck",
      "#fouringredients",
      "#wholeoat",
      "#cleanlabel",
      "#dairyfree",
      "#1gsugar",
      "#saxophone",
      "#oatmilktok"
    ],
    visual:"Bright, trend-forward kitchen — warm daylight, clean pale counter, hands-only (no talent on camera). The whole piece runs on the audio gag, so the comedy is in the timing of the cuts, not the styling. Open mundane and unbothered: a hand picks up a generic 'Average Oat Milk' carton (label deliberately plain/anonymized, no real brand) and casually flips it to the back. As the dramatic saxophone swells, the camera pushes IN on the back label and a finger drags down a long ingredient list — each scary word getting a punchy zoom + text-overlay gloss as the sax climbs ('gums 🎷' · 'oils 🎷' · 'oat syrup = the oat turned into sugar 🎷'). Build the tension visually: faster cuts, tighter push-ins, the list scrolling like it never ends. Then the hard reversal — music CUTS DEAD on a beat, daylight floods, and we smash to the Willa's Original carton standing calm and centered, back label facing us with just four clean lines. Carton on screen 40%+ of the runtime, hero in the back half. The four-ingredient list gets one held, quiet beat (no music, maybe a single birdsong/ASMR pour) — the silence IS the joke. Text overlays in clean bold sans; the final card is a tiny, dry 'four words. no soundtrack.' Close on the calm pour into a glass, carton in soft focus behind.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Close-up: a hand casually picks up a generic 'Average Oat Milk' carton (anonymized, no real brand) and flips it to the back, unbothered. The dramatic saxophone begins, low. On-screen text (bold, top): 'pov: you flip the average oat milk 🎷'."},
      {scene:"THE BUILD", time:"3-8s", action:"Camera pushes in on the back label as a finger drags down a long ingredient list. The sax climbs. Punchy zoom + text gloss lands on each scary word as it appears: 'gums 🎷' → 'oils 🎷' → 'oat syrup = the oat, turned into sugar 🎷'. Cuts get faster, the list keeps scrolling like it won't end."},
      {scene:"PEAK DREAD", time:"8-11s", action:"Tightest push-in, sax at its loudest, the list still going. On-screen text: 'it just... keeps going 😬'. Hold the tension one extra beat so the viewer feels it."},
      {scene:"THE CUT", time:"11-15s", action:"Hard reversal: music CUTS DEAD on the beat, daylight floods the frame, smash-cut to the Willa's Original carton standing calm and centered. On-screen text (clean, no chaos): 'then there's this one.' A single ASMR pour/birdsong replaces the sax. Silence does the comedy."},
      {scene:"THE PAYOFF", time:"15-19s", action:"Close-up on the Willa's Original back label, finger tracing four clean lines. On-screen text stacks calmly: 'organic whole grain oats · filtered water · organic vanilla · sea salt'. Then: '4 ingredients. 1g sugar. nothing to play music over.'"},
      {scene:"END CARD", time:"19-22s", action:"Calm pour into a glass, Willa's Original carton in soft focus behind. On-screen text fades in dry: 'four words. no soundtrack.' then the Willa's wordmark."}
    ],
    audio:"The whole brief is built on the 'saxophones are getting louder' trending audio (the dramatic Boyz n the Hood sax) — it MUST be the actual trending sound for the format to land + get reach. The sax swells through HOOK → BUILD → PEAK DREAD, then cuts dead on the smash-cut. Replace it with a single clean ASMR pour or birdsong for the calm half — the abrupt silence is the punchline. No voiceover; this one is fully audio-and-text driven.",
    duration:"20-22 seconds",
    cta:{soft:"save this for the next time you're flipping cartons 🎷", medium:"flip your oat milk to the back and tell us — does it have a soundtrack?", strong:"grab Willa's Original — the carton with four words and zero dramatic music."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUN15-IG-R1",
    platform:"Instagram Reel",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Wed Jun 17 · 12pm",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"some labels have homework to turn in. ours has four lines.\" — calm founder authority Reel",
    intel:[
      {type:"TREND", text:"A New York bill (AB 1556/SB 1239) is on the Governor's desk that would make it the first state to force food companies to publish the actual scientific safety report behind any 'self-affirmed GRAS' ingredient — the loophole that lets companies declare their own additives safe without showing the work (ref T-1). It passed the Assembly 106-32 and the Senate unanimously; provisions also ban Red Dye 3, potassium bromate, and propylparaben. The opening is to LEAD with Willa's answer, not the news: a 4-ingredient label has nothing self-affirmed, nothing to disclose, nothing to hide. Patagonia gravity — stance, not panic. The news is backdrop; the carton is the lead."},
      {type:"AUDIENCE", text:"Willa's buyers are the people who already flip the carton over — they don't want a fear-spiral, they want a brand that's already on the right side of the question before the question gets asked. They came for organic + glyphosate-free + a short list, and they stay because the label reads like food, not chemistry. The move is calm authority, not alarm: don't make them scared of the shelf, make them feel they already picked the carton that has nothing to file. Christina on camera reads as the founder who wrote her own toughest standard years ago."},
      {type:"COMPETITOR", text:"Internal: the category leans on long ingredient decks, self-affirmed additives, and gum/stabilizer stacks that a published-safety-report rule would put under a microscope — while most oat milks also filter out the protein and fiber and leave the sweetness to syrup. Willa's 4-ingredient Original (organic whole grain oats, filtered water, organic vanilla extract, sea salt) has zero self-affirmed mystery to defend, so the contrast is structural, not a marketing claim. Own the transparency lane the additive-heavy crowd structurally can't follow into. Never name a competitor on the surface — 'the category' / 'the average carton' only."}
    ],
    hooks:[
      {text:"some food labels are about to have homework to turn in. ours has four lines.", recommended:true},
      {text:"when the shelf gets asked to show its safety homework, the cleanest carton just shrugs.", recommended:false},
      {text:"nothing self-affirmed. nothing to disclose. nothing to hide. (just four ingredients.)", recommended:false}
    ],
    caption:"Willa's Original is four ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt. Nothing self-affirmed, nothing to disclose, nothing to hide. 🌾\n\nA lot of the shelf is built on ingredients a company quietly declared safe on its own — the kind of thing a transparency law would ask them to show their work on. When your whole label is four lines you can read out loud, there's no homework to turn in. That's not a reaction to the news. It's been the standard since the start.\n\nThe whole entire oat does the work, so you get a rich, smooth taste with less sugar and more protein and fiber per cup — 1g sugar · 4g+ protein · 2g+ prebiotic fiber · organic · certified glyphosate-free, tested every lot. 🥛\n\nClean isn't a scramble around here. It's just what's already on the carton.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#fouringredients",
      "#cleanlabel",
      "#labelcheck",
      "#realfood",
      "#organic",
      "#glyphosatefree",
      "#wholeoat",
      "#1gsugar"
    ],
    visual:"Bright, calm, sunlit kitchen — warm morning light, pale counter, nothing frantic. This is founder-authority, Patagonia gravity: composed, unhurried, sure of itself. Christina is on camera (heritage/founder-activist reserved slot), but the register is calm, not combative — she's the founder who wrote her own toughest standard, not a brand panicking at a headline. Open on Christina at the counter, Willa's Original carton already in her hand, late-morning light raking across the label. She turns the carton so the four-line ingredient list faces camera and lets it sit — no rush, the list IS the argument. Cut to a slow macro push across the four lines (organic whole grain oats · filtered water · organic vanilla extract · sea salt), each catching the light. The carton is the calm center of every frame and stays on screen 40%+ of the runtime. Text overlays are clean, small, confident sans — no shouting, no red-alert energy. The 'news as backdrop' beat is handled with restraint: a single soft on-screen line referencing that the shelf is being asked to show its safety homework, then the cut back to the carton answers it without a word. Close on Christina setting the carton down and the four-ingredient label held to camera for one last beat. Color story warm and golden, condensation real on a poured glass in the background, textures tactile. No clinical infographics, no fear-styling — this is the cleanest carton on the shelf being quietly, completely unbothered.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Christina at a sunlit counter, Willa's Original carton already in hand, calm and unhurried. She turns it label-out toward camera. On-screen text (clean sans, top-center): 'some labels are about to have homework to turn in.' Warm, composed — no alarm."},
      {scene:"THE BACKDROP", time:"3-7s", action:"Soft cut to the carton resting on the counter, morning light raking across it. A single restrained on-screen line sets the news as backdrop: 'a state wants the shelf to publish the safety homework on its self-affirmed ingredients.' Plain-English gloss appears small beneath: 'self-affirmed = a company decided its own additive was safe.' No fear styling."},
      {scene:"THE ANSWER", time:"7-12s", action:"Christina turns the carton so the four-line ingredient list faces camera and holds it steady — the list is the argument. Slow macro push across each line. On-screen text builds: 'organic whole grain oats · filtered water · organic vanilla extract · sea salt'. Then: 'nothing self-affirmed. nothing to disclose.'"},
      {scene:"THE PROOF", time:"12-16s", action:"Quick, calm cuts: a creamy whole-oat pour into a glass in warm light, the 'certified glyphosate-free' line on the carton catching the light. On-screen text stacks the receipts: '1g sugar · 4g+ protein · 2g+ prebiotic fiber · organic · tested every lot.' Christina off to the side, unbothered, letting the carton talk."},
      {scene:"THE STANCE", time:"16-20s", action:"Back to Christina, carton in frame, one calm beat to camera. On-screen text: 'this isn't a reaction. it's been the standard since the start.' Patagonia gravity — stance, not panic."},
      {scene:"END CARD", time:"20-22s", action:"Close macro: the four-ingredient label held to camera, finger resting beside the four lines. On-screen text fades in: 'four lines. no homework.' then the Willa's wordmark and 'Plants, finally done right.'"}
    ],
    audio:"Founder voiceover (Christina is on camera, so VO matches visible talent — calm, warm, sure, never strident). Soft, unhurried instrumental bed — folk-leaning acoustic or warm lo-fi, the kind of audio that reads composed and grounded, not urgent. Light pour + kitchen-ambience SFX under the proof beat. No trending-audio lock; the restraint is the point. Reads fully as text-driven if VO is dropped.",
    duration:"20-22 seconds",
    cta:{soft:"flip your carton over — count the lines 🌾", medium:"next grocery run, read the label all the way through. the short ones are the tell.", strong:"grab Willa's Original — the carton that's got nothing to file."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUN15-IG-F2",
    platform:"IG Feed",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Wed Jun 17 · 6pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"four ingredients — you can pronounce all of them.\" — clean-by-default carousel",
    intel:[
      {type:"TREND", text:"Oat milk is the fastest-growing lane in plant milk, and the 2026 category story (T-3) is a race toward 'whole ingredients' and more protein as differentiators. Rather than claim a victory lap ('we were here first' — burned + fragile), this brief sidesteps the timeline entirely and just states what a genuinely clean oat milk IS, with quiet confidence. The on-pack-checklist DNA carries it: each card names one thing that's simply true of Willa's Original — not a score the viewer is told to run, but a self-evident standard the carton sets."},
      {type:"AUDIENCE", text:"The Willa's health-and-wellness reader is fluent in clean-label by now and a little tired of being homework-assigned ('flip the carton, check the back, does yours pass?'). She doesn't want another label-audit prompt — she wants a brand that's just obviously clean without making her do the work. The win here is confidence, not instruction: she scrolls a calm, design-led grid of four real ingredients + the numbers, feels the relief of 'oh, it's just this,' and saves it because it's pretty and uncomplicated. No quiz, no scorecard, no 'we told you so.'"},
      {type:"COMPETITOR", text:"Internal only: most oat milks use an enzymatic process that filters out the bran + germ and processes the starch into sugar — roughly 30% of the oat discarded, including BOTH the fiber and the protein — then chase 'protein' back by fortifying. Willa's keeps the whole oat, so 4g+ protein + 2g+ prebiotic fiber are structural, not bolted on. Do NOT name or contrast any brand on this surface — and per the burned-lane note, do NOT frame this as 'the category caught up to us' or instruct the viewer to inspect their own label. The contrast lives only as quiet confidence in what Willa's simply is."}
    ],
    hooks:[
      {text:"four ingredients. you can pronounce all of them. that's kind of the whole personality.", recommended:true},
      {text:"no fortified protein. no oat syrup. no asterisk. just the whole oat doing the whole job.", recommended:false},
      {text:"clean oat milk isn't complicated. it's literally just oats, water, vanilla, salt. (shhh… that's the trick.)", recommended:false}
    ],
    caption:"Some oat milks read like a chemistry quiz. Willa's Original reads like a grocery list: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 🌾 That's it. That's the whole thing.\n\nWe use the whole entire oat groat — bran, germ, and all, like steel-cut oats — not the processed oat syrup most oat milks make. So the 4g+ protein and 2g+ prebiotic fiber are just there, the way the oat made them. Nothing fortified back in, nothing filtered out.\n\nWilla's Original — 4 ingredients, 1g sugar, 4g+ protein, 2g+ prebiotic fiber, certified glyphosate-free, organic. 🥛\n\nRich, smooth, and refreshingly boring on the label. Exactly how we like it.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#wholeoat",
      "#cleanlabel",
      "#4ingredients",
      "#dairyfree",
      "#plantmilk",
      "#organicoatmilk",
      "#moreprotein",
      "#1gsugar"
    ],
    visual:"Vertical IG Feed carousel (4:5), bright + trend-forward — clean editorial design on a soft #73B2C9 health-blue and warm-cream palette, the kind of slide deck a design-led brand (Graza / Omsom energy) would ship as a zine, not an infographic. Card 1 (COVER): the Willa's Original carton standing tall in raking daylight against a flat color block, big confident sans headline overlay — 'four ingredients. you can pronounce all of them.' Cards 2-5 are a calm one-per-card statement of what Willa's simply IS — each card names a single truth in big friendly type, NO split-screen, NO scorecard, NO 'does yours pass?' framing: Card 2 = the four ingredients laid out like a grocery list (organic whole grain oats · filtered water · organic vanilla extract · sea salt). Card 3 = 'the whole oat groat, not oat syrup' with a clean ✅. Card 4 = '4g+ protein + 2g+ fiber — kept, not added back.' Card 5 = '1g sugar · certified glyphosate-free · organic.' Real carton photography anchors at least two interior cards — a soft back-label still where the four-ingredient list is simply legible (no finger 'tracing'/auditing gesture — just the carton sitting in light), and a creamy pour into a glass — so the carton is the hero, not just typography. Final card (CLOSER): carton + the line 'refreshingly boring on the label. exactly how we like it.' with the Willa's wordmark. Warm, witty, confident; no clinical chart styling, no supplement-aisle energy, no quiz/audit energy. Carton visible across 40%+ of the cards. Color-pop, screenshot-able, the slide a reader saves because it's pretty and uncomplicated.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this one for the next grocery run 🌾", medium:"swipe through and send it to the friend who loves a short ingredient list", strong:"grab a Willa's Original and let four ingredients do the talking"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN15-IG-R2",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Barista",
    dnaPattern:"viral-recipe-remix",
    timing:"Thu Jun 18 · 12pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"the tart base finally met its creamy answer.\" — dairy-free espresso-lemonade pour",
    intel:[
      {type:"PULSE", text:"The iced-espresso-over-lemonade combo crossed 91M+ posts and tipped from creator hack to packaged kit, with a limited-edition Espresso Lemonade kit landing across late June (CP-2). The format is espresso concentrate over canned lemonade with ice — naturally dairy-free, tart, caffeinated, seconds to make. The open lane the whole format is missing: a creamy counterpart. Willa's owns it before the chains do — a whole-oat Barista layer poured over the tart base, no chain sugar load, the pour as the hero."},
      {type:"AUDIENCE", text:"Willa's buyers want the fun summer drink without the sugar bomb hiding underneath the trend. They've seen the espresso-lemonade hack fifty times on FoodTok and they want a version that reads clean on the label and actually photographs like a treat. The move is craveability, not correction — make the layered pour look so good they screenshot it, and let the 50%-less-sugar-than-other-barista-oat-milks fact land as the quiet bonus, never the lecture."},
      {type:"COMPETITOR", text:"Internal: the category's barista oat milks lean on rapeseed (canola) oil and gums to fake creaminess, and the espresso-lemonade format right now is being packaged as a milk-free novelty — leaving the creamy upgrade wide open. Willa's Barista foams and pours on whole-oat structure, no rapeseed, 50% less sugar than other barista oat milks — so the creamy layer is a real-food upgrade, not a syrup pour. Own the creamy-answer lane the no-milk format can't reach into. Do NOT name any competitor on the surface."}
    ],
    hooks:[
      {text:"let's make a dairy-free espresso lemonade (the creamy layer is the whole point)", recommended:true},
      {text:"the internet made espresso lemonade tart. we gave it a creamy top — and skipped the cafe sugar dump.", recommended:false},
      {text:"tart espresso. bright lemonade. one creamy whole-oat pour over the top. (shhh… that's the upgrade.)", recommended:false}
    ],
    caption:"The espresso-lemonade combo took over feeds tart, fizzy, and milk-free — so we finished it. 🍋 A bright lemonade base, a shot of espresso, and a slow pour of Willa's Barista on top: the creamy layer the format was missing, minus the cafe sugar dump.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 (Barista: 50% less sugar than other barista oat milks, no rapeseed oil, no gums — it foams and pours like the real thing because it's made from the whole oat.)\n\nIngredients:\n- 1 cup fresh lemonade (over ice)\n- 1-2 shots espresso (or strong cold brew)\n- a splash of Willa's Barista, poured slow over the top\n- lemon slice + extra ice to finish\n\nBuild it in the glass, pour the creamy layer last, watch it cloud. ✨",
    hashtags:[
      "#willas",
      "#espressolemonade",
      "#oatmilk",
      "#baristaoatmilk",
      "#dairyfree",
      "#icedcoffee",
      "#summerdrinks",
      "#wholeoat",
      "#coffeetok",
      "#labelcheck"
    ],
    visual:"Bright, sun-flooded summer kitchen — high-key daylight, a tall sweating glass on a pale stone counter, lemon yellow + espresso amber + creamy oat-white as the whole palette. Lofi/chill audio energy, hands-only, no talent on camera. Open on the format everyone already knows — a glass of iced lemonade with a shot of espresso poured in, tart and milk-free, a halved lemon and the Willa's Barista carton waiting in soft focus behind. The whole brief turns on ONE move: the slow creamy pour. Shots are tactile and fast through the build — ice tumbling into the glass, lemonade filling, the dark espresso cascading down and feathering into the lemonade — then everything slows for the hero. Macro, slow-motion: Willa's Barista pours from the carton over the top and blooms into a soft cloud, oat-white curling down through the amber, the carton held just behind the glass so the label reads. Carton stays visible 40%+ of the runtime. Text overlays in clean bold sans, animated on the beat. Close on the finished layered glass — tart base, espresso middle, creamy cloud top — a lemon slice on the rim, then the Barista carton turned to show 'no rapeseed oil' on the label for the kicker. Trend-forward, screenshot-bait, the pour is the entire hook.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Close-up on a tall glass of iced lemonade as a shot of espresso pours in and feathers down — tart, milk-free, the version everyone's seen. On-screen text (bold, top-center): 'let's make a dairy-free espresso lemonade'. The Willa's Barista carton sits in soft focus behind. Hard cut on the beat."},
      {scene:"THE GAP", time:"3-7s", action:"Quick beat holding on the tart espresso-lemonade glass, condensation running. On-screen text: '91M+ posts. all milk-free.' then wipes to 'so we finished it. 🍋'. Hand brings the Barista carton forward into focus."},
      {scene:"BUILD", time:"7-12s", action:"Fast tactile cuts: ice tumbling into a fresh glass, fresh lemonade pouring over, a shot of espresso cascading down and clouding into the lemonade. On-screen text stacks an ingredient checklist as each goes in: 'lemonade · espresso · ice'."},
      {scene:"THE POUR", time:"12-17s", action:"The hero. Macro slow-motion: Willa's Barista pours from the carton over the top and blooms into a soft oat-white cloud, curling down through the amber. Carton held just behind the glass, label readable. On-screen text: 'the creamy layer it was missing 🥛'."},
      {scene:"THE FINISH", time:"17-20s", action:"Hands set a lemon slice on the rim and lift the finished layered glass for a beauty tilt (no face) — tart base, espresso middle, creamy cloud top. On-screen text: 'tart, bright, creamy. zero chain sugar load.'"},
      {scene:"END CARD", time:"20-22s", action:"Hand turns the Barista carton to show the label — finger taps 'no rapeseed oil.' On-screen text fades in: '50% less sugar than other barista oat milks.' then the Willa's wordmark."}
    ],
    audio:"Warm narrative voiceover (brand 'we', optional — works fully text-driven). Lofi/chill summer beat with a clean drop landing on 'THE POUR'; espresso-pour and creamy-pour SFX layered for ASMR craveability, light ice clink. No trending-audio lock required, but a mellow summer-house track keeps it coffee-tok-native.",
    duration:"20-22 seconds",
    cta:{soft:"save this for the next hot afternoon 🍋", medium:"build it, pour the creamy layer last, and tag us — we want to see the cloud.", strong:"grab Willa's Barista and give the espresso-lemonade trend the creamy top it's been missing."},
    benefitShorthandId:"BS-4"
  },
  {
    id:"JUN15-PIN-1",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Barista",
    dnaPattern:"at-shelf-moment",
    timing:"Thu Jun 18 · 2pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the pour is the whole recipe\" — editorial matcha-pour still",
    intel:[
      {type:"TREND", text:"Matcha keeps climbing into summer (searches up ~27% YoY) while a deepening supply squeeze pushes some cafes to ration or drop matcha lattes through August (ref T-8). That tension makes 'I'll build it at home' the natural next move — and a slow matcha-and-oat-milk pour is one of the most-saved, most-screenshotted formats Pinterest rewards. The pin doesn't chase the scarcity story; it quietly owns the at-home build, where whole-oat creaminess is the layer the cafe pour was missing. Matcha pairs natively with oat milk, so this is an evergreen lane, not a one-week ride."},
      {type:"AUDIENCE", text:"The Pinterest saver isn't watching a fast clip — she's planning her morning, screenshotting the cafe-at-home aesthetic she wants to recreate. The at-shelf-moment DNA wins here because the carton's quiet presence in a beautiful, real frame does the persuading: she saves the gorgeous green-and-cream pour and absorbs '4g protein, 50% less sugar than other barista oat milks' as the calm bonus underneath the pretty. No lecture, no recipe wall — just the most photogenic pour she'll want to make herself."},
      {type:"COMPETITOR", text:"Internal only: the category's barista oat milks lean on rapeseed oil and gums to fake creaminess, and most filter the protein out of the oat entirely. Willa's Barista gets its body from the whole oat — no rapeseed, no gums — so the cream layer over the matcha is structural, not a stabilizer trick. Do NOT name or contrast any brand on this surface. Keep the contrast implicit; let the pour read as the proof."}
    ],
    hooks:[
      {text:"the prettiest matcha you'll make this summer is the one with the slow oat-milk pour 🍵", recommended:true},
      {text:"cafe ran out of matcha? good. the home pour was always the better shot.", recommended:false},
      {text:"whole-oat cream, slow over the green. (shhh… that's the entire recipe.)", recommended:false}
    ],
    caption:"Some pours don't need a recipe card — they ARE the recipe. 🍵☁️ Matcha, ice, and a slow stream of Willa's Barista cascading in: that's the whole build, and it photographs like the cafe one without you leaving the kitchen.\n\nWilla's Barista gets its rich, creamy body from the whole entire oat — not rapeseed oil, not gums. 4g protein, 50% less sugar than other barista oat milks, and it foams and pours like it means it. 🥛 The cream layer over the green is the part the at-home wave was missing.\n\nNo blender, no fuss. Just a beautiful pour you'll want to save and make again.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#matcha",
      "#matchalatte",
      "#oatmilkmatcha",
      "#dairyfree",
      "#baristaoatmilk",
      "#homecafe",
      "#norapeseed",
      "#labelcheck"
    ],
    visual:"Vertical pin (2:3), editorial Tenzo-Matcha-style still — bright, calm, sun-raked, shot like a slow-living magazine page, not an ad. Hero: a tall clear glass of iced matcha caught mid-pour, a slow ribbon of Willa's Barista cascading down through the vivid green into a soft marbled cream-and-jade swirl. Late-morning light rakes across the glass; condensation is real, the swirl is the whole composition. The Willa's Barista carton stands tall and beautifully in soft focus just behind the glass — the calm anchor of the frame, the cleanest thing on the counter. Surround it sparingly: a bamboo whisk resting on a small ceramic dish, a few loose matcha grains, a pale linen, one stem of greenery in a low vessel. Color story is jade green + warm cream + pale neutral counter — minimal, tactile, screenshot-able. Tiny tasteful serif overlay, small and low: \"the pour is the recipe.\" One clean chip in the #75C596 green: \"4g protein · 50% less sugar.\" No supplement-aisle styling, no infographic, no recipe wall — keeper energy, the kind of frame a home-cafe saver pins to recreate her own morning. Let the carton design and the swirl do the entire persuading; the pour is the hero and the carton is the proof.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save it for your next slow morning 🍵", medium:"tap to see why the whole oat pours this creamy without rapeseed", strong:"grab Willa's Barista and build the matcha pour that beats the cafe's"},
    benefitShorthandId:"BS-7"
  },
  {
    id:"JUN15-IG-R3",
    platform:"Instagram Reel",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Thu Jun 18 · 6pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"no app. no score. just breakfast.\" — fed-not-tracked calm-category Reel",
    intel:[
      {type:"TREND", text:"The Global Wellness Summit named the 'Over-Optimization Backlash' the defining wellness trend of 2026, and June coverage shows it cresting (T-9): after a decade of sleep scores, HRV readings, cold plunges and calorie restriction, people are revolting against performance-obsessed wellness and asking for joy back. 'Orthosomnia' — anxiety FROM sleep-tracking — is now in medical literature. The mood is meaning over metrics, abundance over restriction. Willa's already lives there: a pour you don't have to log. The move is to EMBODY the calm, not explain it — and pointedly NOT to instruct the viewer to inspect anything (the read-your-label / checklist lane is burned). The win is the exhale, not the audit."},
      {type:"AUDIENCE", text:"Willa's buyer is quietly exhausted by the optimization treadmill — she has the ring, the app, the macro tracker, and a low-grade guilt that breakfast became another scored event. She doesn't want a sixth wellness rule; she wants permission to just eat real food and move on. So the brief lands as relief, not instruction (Pattern 03 — name the thing she's secretly feeling). The win is the exhale: a real-food breakfast that asks nothing of her — no number to beat, no log to fill, no carton to flip."},
      {type:"COMPETITOR", text:"Internal: the category keeps chasing the optimization wave the wrong way — limited-edition flavor drops (Chobani's Jun 14 Flavor Drops push, C-1) and protein-maxxed RTD shakes that turn breakfast into a scored event. Most oat milks also filter out the fiber AND protein, then add the sweetness back as syrup, so 'clean' becomes another spec to track. Willa's structural advantage is that there's simply nothing to optimize — whole oat groat, 4 ingredients, 1g sugar. Own the calm lane the metrics crowd literally can't follow into — fed, not tracked."}
    ],
    hooks:[
      {text:"no app. no score. no HRV reading. just a breakfast that asks nothing of you.", recommended:true},
      {text:"the world wants a number for everything before 9am. this is just a quiet pour and zero notifications.", recommended:false},
      {text:"breakfast doesn't need a leaderboard. some mornings just need to be breakfast.", recommended:false}
    ],
    caption:"Somewhere along the way breakfast became a scored event — a sleep number, an HRV reading, a macro to beat before you've even had a sip. ☀️ This is the opposite of that: a slow morning pour that asks nothing of you. No app to open, no number to chase, no logging required. Just real food and a quiet kitchen.\n\nWilla's Original keeps it calm by design — 4 simple ingredients, 1g sugar, 4g+ protein, 2g+ prebiotic fiber, certified glyphosate-free, made from the whole oat (not oat syrup). The kind of breakfast you don't have to monitor, because it was never a metric to begin with.\n\nFed, not tracked. That's the whole wellness plan. 🥛",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#fednottracked",
      "#realfood",
      "#wellnesswithoutthework",
      "#wholeoat",
      "#slowmorning",
      "#oatmilkpour",
      "#dairyfree",
      "#1gsugar"
    ],
    visual:"Sunlit, slow, and unbothered — the visual antidote to a metrics dashboard. Warm late-morning daylight raking across a pale linen counter, soft shadows, a little dust catching the light. Muted, cozy palette (cream, oat, warm white, one sprig of green) — cozy-not-clinical, the Olipop register without a single supplement cue. Hands-only, no talent on camera. Open on the 'tracked' world as gentle satire: a phone face-up showing a cluttered wellness app (rings, a sleep score, an HRV graph), a smart ring beside it, a notebook of macros — then a hand calmly turns the phone face-DOWN and slides it out of frame. Pivot to the real thing: the Willa's Original carton standing tall in the light, a clear glass, and a slow, unhurried pour — thick, creamy, whole-oat — cascading in real time (no speed-ramp, the slowness IS the point). Carton stays visible 40%+ of the runtime. NO label close-up, NO finger tracing the ingredient list, NO checklist overlay — the whole point is there's nothing to inspect. The only 'numbers' anywhere are the ones we're letting go of (the app's scores, fading out). Text overlays in clean, soft sans, fading (not snapping) in. Close on the glass set down beside the face-down phone — chosen calm over the scroll. No trending-audio lock; a mellow, analog lofi bed.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Overhead, warm daylight: a phone face-up glowing with a cluttered wellness app (sleep score, HRV graph, rings), a smart ring and a macro notebook beside it. A hand reaches in and calmly turns the phone face-DOWN. On-screen text (soft sans, top-center): 'no app. no score. just breakfast.' Slow fade, no hard cut."},
      {scene:"THE EXHALE", time:"3-7s", action:"Pivot to the same counter, now decluttered — just the Willa's Original carton standing in the light and an empty glass. Hand slides the tracking gear (ring, notebook) fully out of frame. On-screen text fades in: 'no number to beat before your first sip.' Light, unhurried movement; the frame breathes."},
      {scene:"THE POUR", time:"7-13s", action:"Close-up, real-time slow pour: Willa's Original cascades into the glass — thick, creamy, whole-oat, no speed-ramp. Light catches the stream. Carton in soft focus behind. On-screen text fades in: '4 ingredients. 1g sugar. nothing to track.'"},
      {scene:"THE CALM", time:"13-17s", action:"Wide, unhurried: the full glass sits in the warm light beside the still-face-down phone — no app open, no notification glow. A hand rests easy on the counter, not reaching for anything. On-screen text fades in: 'breakfast that asks nothing of you.'"},
      {scene:"THE SIP", time:"17-20s", action:"Hands lift the full glass for an unbothered sip (no face), then set it down right beside the face-down phone — calm chosen over the scroll. On-screen text: 'fed, not tracked.'"},
      {scene:"END CARD", time:"20-22s", action:"Static hero: the carton and the full glass in the warm light, phone face-down beside them. On-screen text fades in: 'real food that needs no app.' then the Willa's wordmark."}
    ],
    audio:"Warm narrative voiceover (brand 'we', optional — works fully text-driven). Mellow, analog lofi bed — soft piano or acoustic loop, no drop, no build; the calm is the point. Light ambient kitchen SFX (the pour, a glass set down) layered for a quiet ASMR exhale. No trending-audio lock; a slow folk/lofi track keeps it cozy-not-clinical and tonally adjacent to the morning-after-Bonnaroo mood culture is in.",
    duration:"20-22 seconds",
    cta:{soft:"save this for a slow morning ☀️", medium:"pour one, put the phone down, and just have breakfast — no logging required.", strong:"grab Willa's Original and make breakfast a thing you enjoy, not a thing you track."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN15-TT-2",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Thu Jun 18 · 7pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"it's not the oat. it's what they do to it.\" — calm blood-sugar correction",
    intel:[
      {type:"PULSE", text:"The TikTok claim that oat milk spikes blood sugar 'like soda' keeps recirculating, now met by dietitian fact-checks walking it back: oat milk's glycemic index is moderate, not high, and PolitiFact already rated the soda-equivalence false (CP-9). The nuance the rebuttals open — and the lane Willa's owns — is that the sugar isn't the oat, it's the processing: most oat milks run an enzyme that turns the oat's starch into maltose (a sugar) and filters out the fiber + protein that would slow it down. Willa's keeps the whole oat groat, so it lands at 1g sugar with the fiber + protein still in the glass. The move is calm authority, not panic — answer the fear, name the mechanism in one plain line, point to the carton."},
      {type:"AUDIENCE", text:"Willa's buyer saw the scary clip, half-believed it, and is now standing in her kitchen second-guessing the carton she already trusts. She doesn't want a lecture or a panic — she wants a grown-up to calmly tell her what's actually true so she can stop worrying. The mom-activist voice wins here because it reads as 'we've got you,' not 'you've been fooled.' Lead with reassurance, hand her the one fact that explains everything (it's the processing), and let her screenshot it for the group chat."},
      {type:"COMPETITOR", text:"Internal: the blood-sugar fear is real ammunition AGAINST the category's standard build — the enzymatic process that turns oat starch into maltose is exactly why the average oat milk reads higher-glycemic and thinner on fiber + protein. Willa's whole-groat process sidesteps the maltose step entirely, so this is a structural advantage, not spin. Own the calm-correction lane the syrup-process crowd literally cannot stand in. Do NOT name a competitor on camera — 'the average oat milk' / 'most oat milks' only."}
    ],
    hooks:[
      {text:"saw the 'oat milk spikes your blood sugar like soda' video? okay. let's actually talk about it. 🌾", recommended:true},
      {text:"the oat isn't the problem. it's what most oat milks do to the oat.", recommended:false},
      {text:"deep breath. your oat milk is not soda. here's the part the scary video left out.", recommended:false}
    ],
    caption:"Deep breath — your oat milk is not soda. 🌾 Here's the part that viral clip skipped: the blood-sugar story isn't about the oat, it's about the processing. Most oat milks run an enzyme that turns the oat's starch into sugar (that's where the maltose comes from) and filters out the fiber + protein that would've slowed it down. So you're left with the sugar and none of the brakes.\n\nWilla's keeps the whole oat groat — the whole oat kernel, like steel-cut oats before they're rolled — so the fiber and protein stay in the glass and the sugar stays at 1g. Original: 4 ingredients, 1g sugar, 4g+ protein, 2g+ prebiotic fiber, organic, certified glyphosate-free.\n\nIt's not the oat. It's what they do to it. (shhh… that's the whole secret.)\n\nFlip the label before you flip out. The short ingredient list tells you everything.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#bloodsugar",
      "#glycemicindex",
      "#wholeoat",
      "#1gsugar",
      "#cleanlabel",
      "#dairyfree",
      "#labelcheck",
      "#realfood"
    ],
    visual:"Calm, sunlit kitchen — warm morning light, pale counter, the opposite energy of the alarmist clip it's answering. No talent face on camera; hands + product + clean text overlays do the work (mom-activist voice carried through tone + overlay copy, not a talking head). Open on a phone propped against the carton, the screen showing a paused, vaguely panicked 'OAT MILK = SODA?!' style video frame — then a hand calmly reaches in and turns the phone face-down on the counter. Pivot to the real subject: the Willa's Original carton standing tall in soft light, condensation on a glass beside it. The middle beat is a clean, almost-diagrammatic visual of the mechanism — two side-by-side overlays: 'average oat milk: enzyme turns starch → sugar, fiber + protein filtered out' vs 'Willa's: whole oat groat, fiber + protein stay in.' Keep it warm and tactile, not clinical-infographic: real oat groats poured into a small bowl for the 'whole oat' side, a sweating glass of oat milk for the payoff. Hero frame is a slow pour of Willa's Original into the glass, thick and creamy, carton in soft focus behind — the calm answer made visible. Carton stays on screen 40%+ of the runtime. Text overlays in clean bold sans, animated gently on the beat (no jump-scares — the whole point is the lower-blood-pressure tone). Close on the Original ingredient list held to camera, finger tracing the four lines, with the kicker overlay.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Close-up: a phone propped against the Willa's carton, screen frozen on an alarmist 'OAT MILK SPIKES BLOOD SUGAR LIKE SODA 😱' style video. A hand calmly reaches in and turns the phone face-down on the counter. On-screen text (bold, top): 'saw the scary oat milk video? okay. let's actually talk about it.'"},
      {scene:"THE REFRAME", time:"3-7s", action:"Warm pivot to the Willa's Original carton standing in morning light, glass beside it. On-screen text wipes in: 'it's not the oat. 🌾' then 'it's what most oat milks DO to the oat.' Calm, steady pacing — no fast cuts."},
      {scene:"THE MECHANISM", time:"7-13s", action:"Split-screen comparison, kept warm not clinical. LEFT: a generic glass labeled 'the average oat milk' — on-screen text: 'an enzyme turns the oat's starch into sugar (that's the maltose) + filters out the fiber + protein.' RIGHT: real oat groats pour into a small bowl labeled 'Willa's: the whole oat groat' — text: 'fiber + protein stay in. so does the brake on your blood sugar.'"},
      {scene:"THE RECEIPT", time:"13-17s", action:"Cut to the Willa's Original carton, slow push-in. On-screen text stacks the spec line: '1g sugar · 4g+ protein · 2g+ prebiotic fiber · 4 ingredients · organic.' Then: 'moderate GI. not soda. not close.'"},
      {scene:"THE POUR", time:"17-21s", action:"Hero slow-motion pour: Willa's Original cascades into a sweating glass, thick and creamy, carton in soft focus behind. On-screen text: 'the calm answer.' Hands lift the glass for a sip (no face), set it down easy."},
      {scene:"END CARD", time:"21-23s", action:"Hand holds the Original ingredient list to camera, finger tracing the four lines. On-screen text fades in: 'it's not the oat. it's what they do to it.' then the Willa's wordmark."}
    ],
    audio:"Warm narrative voiceover in the brand 'we' voice — calm, reassuring, matter-of-fact authority (the aunt-at-the-kitchen-table register, never combative or panicked). Soft, grounded lofi bed; deliberately NOT the dramatic 'exposé' audio the original clip uses — the lower-tempo sound IS part of the correction. Light pour + bowl SFX layered for ASMR warmth on THE MECHANISM and THE POUR. No trending-audio lock required; the tonal contrast (calm vs. the alarmist source) is the point.",
    duration:"21-23 seconds",
    cta:{soft:"save this for the next time the scary video shows up 🌾", medium:"send this to whoever sent you the panic clip — calmly.", strong:"flip a Willa's Original label and read it for yourself — 4 ingredients, 1g sugar."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN15-TT-3",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Fri Jun 19 · 9am",
    priority:"HIGH",
    rideNow:false,
    concept:"\"third scoop? you already hit your number.\" — protein-maxxing text-joke over a pour",
    intel:[
      {type:"TREND", text:"Dietitians are flipping the protein-maxxing script (T-6): protein holds the #1 nutrition-trend spot in 2026 per IFIC, and the June nutrition cycle has turned to the overconsumption critique — most active adults already hit the 1.2-1.6 g/kg target, and loading fortified powders on top adds calories, GI distress and cost without benefit (the body excretes the surplus or stores it as fat). The opening is the calm middle: Willa's whole-oat 4g+ protein is additive — what a real breakfast already has — not a third scoop. Don't lecture the protein crowd; under-react to them. The text joke does the work over a clean pour."},
      {type:"AUDIENCE", text:"Willa's HEALTH/WELLNESS viewer is protein-aware but powder-fatigued — she's been told to chase grams and is quietly suspicious that a fourth shake a day is the move. She scrolls past supplement-bro content and stops for the dry, knowing line that gives her permission to chill. The win is relief, not a new rule: real food, the right amount, no shaker math. The joke has to land on the first read and the carton has to look like the calm answer, not another product yelling 'MORE.'"},
      {type:"COMPETITOR", text:"Internal: the category is racing to bolt protein onto everything — fortified RTDs, 15-36g protein cold foams, instant high-protein iced coffees — turning the morning drink into a meal-replacement shaker. Most oat milks also filter out the oat's own protein, then have nothing real to add back. Willa's keeps 4g+ from the whole oat groat itself, so the contrast is structural: additive real food vs. reductive third-scoop. Own the calm-middle lane the more-is-better crowd structurally can't enter. Never name a brand on the surface — 'the average shaker' framing only."}
    ],
    hooks:[
      {text:"pov: the protein math is mathing and you do not need a third scoop", recommended:true},
      {text:"your body already hit its protein number. the internet just won't tell you.", recommended:false},
      {text:"loading a fourth scoop on a breakfast that's already enough? babe. the calm middle is right here.", recommended:false}
    ],
    caption:"Most active adults already hit their protein number — so the third scoop isn't doing what the internet promised. 🥄 (Spoiler: the body can't store the surplus. It just shows it the door.)\n\nWilla's Original isn't a shaker swap — it's the calm middle. 4g+ protein and 2g+ prebiotic fiber that come from the whole oat itself, not a powder stirred in. Real food, the right amount, no math.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 (Original: 4 ingredients · 1g sugar · 4g+ protein · 2g+ prebiotic fiber · certified glyphosate-free.)\n\nMore isn't the flex. Enough, from real food, is. ✨\n\nhonest question, no wrong answer: how many scoops are you actually on? 👇",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#protein",
      "#proteinmaxxing",
      "#realfood",
      "#dairyfree",
      "#wholeoat",
      "#cleanlabel",
      "#nutritiontok",
      "#proteinmath"
    ],
    visual:"Bright, calm, sun-washed kitchen — soft morning light, creamy-blue + warm-oat palette, the visual opposite of harsh gym-supplement content. Hands-only, no talent on camera, lofi/chill audio energy. Open on the loud version of the internet's protein math: a cluttered counter with a protein tub, a shaker bottle, a scoop mid-air dumping powder, and a chalky overfull glass — shot slightly cool + busy. On the beat, a hand calmly slides all of it out of frame and the lighting warms as a single Willa's Original carton settles in next to one clean glass. The whole back half is unhurried: slow whole-oat pour cascading into the glass (thick, smooth, pale), the four-ingredient label held to camera for a beat, a hand setting the glass down with zero ceremony. Text overlays in clean bold sans, animated on the beat — the joke lives in the type (Pattern 10), so overlays carry the payload while the visuals stay quiet. Carton stays visible 40%+ of the runtime, the calm center of every back-half frame. Close on the glass + carton sitting still in the warm light — no hype, that's the point.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Cool, slightly cluttered counter: a protein tub, a shaker bottle, a scoop frozen mid-pour dumping powder into an overfull chalky glass. On-screen text (bold, top-center): 'pov: the protein math is mathing'. Quick, busy energy. Hard cut on the beat."},
      {scene:"THE NUMBER", time:"3-7s", action:"Same counter, text overlay stacks the gag: 'most active adults already hit their target 🥄' then wipes to 'the body can't store the extra. it just… leaves.' A hand starts pushing the tub + shaker toward the edge of frame as the light begins to warm."},
      {scene:"THE CALM SWAP", time:"7-11s", action:"Lighting fully warms — sunlit, soft. Hand sweeps the last of the powder clutter out and sets a single Willa's Original carton beside one clean glass. On-screen text: 'no third scoop required.' The frame goes from busy to still in one move."},
      {scene:"THE POUR", time:"11-16s", action:"Close-up: Willa's Original pours slow and thick into the glass — pale, smooth, whole-oat, no froth-bomb. Carton stands tall in soft focus behind. On-screen text: '4g+ protein · 2g+ fiber — from the whole oat, not a powder 🥛'."},
      {scene:"THE LABEL", time:"16-19s", action:"Hand holds the Original four-ingredient label to camera, finger resting on the four lines (no tracing frenzy — calm). On-screen text: '4 ingredients. that's the whole shaker.'"},
      {scene:"END CARD", time:"19-22s", action:"Glass + carton sit still in the warm light, hand lifts the glass for one unceremonious sip (no face), sets it down. On-screen text fades in: 'more isn't the flex. enough is.' then the Willa's wordmark."}
    ],
    audio:"Warm narrative voiceover (brand 'we', fully optional — works text-driven). Lofi/chill beat with a clean drop on 'THE CALM SWAP' and 'THE POUR'; the front half can carry a faint busy/clatter texture that resolves into quiet pour SFX for the back half (the audio mirrors the loud-to-calm arc). No trending-audio lock required — a mellow, unbothered track keeps the under-react tone. Poppi short-form muscle: confident, dry, never preachy.",
    duration:"20-22 seconds",
    cta:{soft:"save this for the next 'add more protein' video 🥄", medium:"settle it in the comments — how many scoops a day are you actually on? 👇", strong:"grab Willa's Original — the protein that comes from real food, no third scoop."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN15-IG-R4",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Kids",
    dnaPattern:"viral-recipe-remix",
    timing:"Fri Jun 19 · 12pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"the sprinkles are the whole personality. the foam's the clean part.\" — confetti cold-foam remix",
    intel:[
      {type:"PULSE", text:"The 'dot cake iced latte' — iced coffee under a thick cold foam topped with rainbow nonpareil sprinkles — is spreading across TikTok + Reels as confetti-ASMR bait, creators chasing the spoon-drag top and the photogenic sprinkle pour (CP-3). The published recipes lean dairy: heavy-cream cold foam + birthday-cake creamer. That's the open lane — the format is pure visual, so a clean dairy-free rebuild keeps the whole hook (the confetti) and drops the sugar-bomb foam nobody actually came for. Willa's Kids whips into the photogenic spoon-drag foam — and per the team it oddly blends into the best swirls — so the foam carries 8g protein instead of birthday-cake creamer."},
      {type:"AUDIENCE", text:"The Willa's saver wants the treat that looks like a treat without the crash that comes with it — she'll recreate a drink she's seen ten times this week IF the dairy-free version photographs just as well. The confetti is non-negotiable (it's why the format works), so the move is to keep it loud and let the foam quietly be the upgrade. She's also the crossover drinker: Kids isn't just for kids, it's the flavor adults reach for when they want more protein in an iced coffee. Abundance, not a finger-wag — the sprinkle pour has to look better than the heavy-cream version, not more virtuous than it."},
      {type:"COMPETITOR", text:"Internal: the category's loudest summer drink formats keep stacking added-sugar shortcuts — birthday-cake creamers, syrup foams — and most oat milks filter out the protein, so a 'creamy' foam is really just oil + gums + sugar. Willa's Kids whips into a genuinely photogenic foam carrying 8g protein and zero top-9 allergens, so the contrast is structural, not a claim — own the confetti-treat lane the creamer crowd can't follow into clean."}
    ],
    hooks:[
      {text:"let's make a confetti cold-foam iced latte (dairy-free!)", recommended:true},
      {text:"the internet's confetti latte, rebuilt — same sprinkle pour, foam that's actually 8g protein 🎨", recommended:false},
      {text:"spoon-drag the foam. pour the sprinkles. (no birthday-cake creamer in sight.)", recommended:false}
    ],
    caption:"That confetti iced latte all over your feed had us craving the sprinkle pour — so we rebuilt it dairy-free. 🎨✨ Same thick, spoon-drag cold foam, same rainbow confetti top, none of the birthday-cake creamer. The foam's whipped from Willa's Kids, so it photographs like a treat and carries real protein instead of a sugar bomb.\n\nWilla's Kids uses simple organic ingredients and the whole entire oat for a rich, creamy taste, less sugar, and 8g of protein per cup — plus DHA, calcium, and free of the top 9 allergens. 🥛 (And it oddly makes the best swirls.)\n\nIngredients:\n- 1 cup Willa's Kids, cold\n- 1 shot espresso or 1/2 cup cold brew\n- ice\n- a spoonful of rainbow nonpareil sprinkles\n- optional: a drizzle of maple\n\nFroth the Willa's Kids cold until thick, pour over iced coffee, spoon-drag the foam, then rain the sprinkles. ✨",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#dotcakelatte",
      "#confettilatte",
      "#dairyfree",
      "#coldfoam",
      "#icedlatte",
      "#kidsoatmilk",
      "#8gprotein",
      "#fyp"
    ],
    visual:"Bright, sun-washed summer kitchen — warm daylight raking across a pale counter, a tall sweating glass, a candy-bright but clean palette (rainbow nonpareils popping against pale-gold foam). Lofi/chill audio energy, hands-only, no talent on camera. Open on the format everyone's seen — a thick swirl of cold foam under a confetti rain — but stage the dairy version's mess beside it (a heavy-cream carton + a birthday-cake creamer bottle) and physically sweep it out of frame, swapping in the Willa's Kids carton standing tall behind a small frother. Shots are fast and tactile: cold brew over ice catching the light, Willa's Kids pouring into the frother, the foam thickening to a glossy peak, the slow spoon-drag across the top (the ASMR money shot), then the sprinkle pour cascading in confetti slow-motion — the whole reason the format works. Hero frame is the overhead of the finished glass, foam spoon-dragged, confetti scattered, carton in soft focus behind. Carton stays visible 40%+ of the runtime. Text overlays in clean bold sans, animated on the beat. Close on a hand lifting the glass (no face) and the Kids carton's 8g-protein + allergen-free callout held to camera for the kicker. No supplement-aisle styling — keeper energy, the kind of frame someone screenshots to recreate.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Overhead close-up: a finished confetti cold-foam latte, sprinkles mid-scatter, lit warm + bright. A hand slides a heavy-cream carton + birthday-cake creamer bottle to the edge of frame. On-screen text (bold, top-center): 'let's make a confetti cold-foam iced latte (dairy-free!)'. Hard cut on the beat."},
      {scene:"THE SWAP", time:"3-7s", action:"Bright daylight pivot: same counter, now the Willa's Kids carton stands behind a small handheld frother where the creamer was. Hand sweeps the dairy bottles fully out. On-screen text: 'their foam: heavy cream + birthday-cake creamer 😳' then wipes to 'ours: whole-oat Kids foam, 8g protein 🎨'."},
      {scene:"BUILD", time:"7-12s", action:"Fast tactile cuts: cold brew (or a fresh espresso shot) pours over a glass of ice, catching the light. Then Willa's Kids cascades into the frother cup — creamy, whole-oat. Frother kicks on, foam climbing to a glossy peak. On-screen text stacks: 'cold brew + ice' then '1 cup Willa’s Kids, frothed 🥛'."},
      {scene:"THE FOAM", time:"12-17s", action:"Close-up hero: the thick Kids foam spooned over the iced coffee, then the slow spoon-drag across the top — glossy, photogenic, ASMR. On-screen text: 'the spoon-drag is the whole vibe.'"},
      {scene:"THE POUR", time:"17-21s", action:"Smash-cut to slow-motion: a spoonful of rainbow nonpareil sprinkles rains over the foam, confetti scattering across the surface. Overhead reveal of the finished glass, carton in soft focus behind. On-screen text: 'the sprinkles are the whole personality. 🎨'"},
      {scene:"END CARD", time:"21-23s", action:"Hand holds the Willa's Kids carton to camera, finger tapping the callout. On-screen text fades in: '8g protein. top-9 allergen-free. no birthday-cake creamer.' then the Willa's wordmark."}
    ],
    audio:"Warm narrative voiceover (brand 'we', optional — works fully text-driven). Lofi/chill summer beat with a clean drop on 'THE SWAP' and 'THE POUR'; froth-whir + the spoon-drag scrape + the soft patter of sprinkles layered for ASMR craveability. No trending-audio lock required, but a mellow playful track keeps it FoodTok-native and Poppi-coded.",
    duration:"21-23 seconds",
    cta:{soft:"save this for the next iced-coffee afternoon 🎨", medium:"froth it, drag it, rain the sprinkles — then tag us your pour.", strong:"grab Willa's Kids and rebuild the confetti latte with foam that's actually 8g protein."},
    benefitShorthandId:"BS-3"
  },
  {
    id:"JUN15-PIN-2",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Barista",
    dnaPattern:"at-shelf-moment",
    timing:"Fri Jun 19 · 3pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the tropical pour that skipped the syrup line\" — editorial iced-coffee still",
    intel:[
      {type:"TREND", text:"Coconut is being crowned the dairy-free 'champion' of summer 2026 coffee — tropical iced builds, frozen frappes hitting QSR menus, ready-to-mix concentrates, with iced coconut whipped coffee up ~38% in engagement (ref T-4). The throughline the trade forecasts keep naming: plant milks that read indulgent and photograph like a treat, not health-food. It's a search-and-save behavior, not a single viral clip — exactly what a slow, beautiful editorial pin rewards. We slot Willa's Barista into the tropical iced-coffee build the savers are already pinning, positioned as the creamy whole-oat answer the syrup wave keeps reaching for."},
      {type:"AUDIENCE", text:"The Pinterest saver is in summer home-cafe mode — screenshotting iced-coffee builds, glassware, the pour she wants to recreate on a hot Saturday. The at-shelf-moment DNA wins because the carton's presence in a real, well-composed scene does the persuading: she saves the aesthetic and quietly clocks that the indulgent-looking pour is the one with 50% less sugar than other barista oat milks and no rapeseed. Delicious beat, no lecture — the glass looks like the trend, and the cleanest thing in frame happens to be the milk."},
      {type:"COMPETITOR", text:"Internal only: the tropical-coffee wave is being carried by coconut concentrates and syrup-forward QSR builds that lean sweet to read indulgent, and most barista oat milks foam on rapeseed oil, gums, and added syrup. Willa's Barista gets the same indulgent payoff structurally — whole-oat creaminess, coconut sugar, no rapeseed, no gums — so the contrast is built into the glass, not a claim. Own the indulgent-but-clean lane the syrup crowd can't follow into. Do NOT name or contrast any brand on this surface."}
    ],
    hooks:[
      {text:"the tropical iced coffee that got its creaminess from a whole oat, not a syrup pump 🥥", recommended:true},
      {text:"summer iced coffee, indulgent on purpose — 50% less sugar than other barista oat milks", recommended:false},
      {text:"build the tropical pour everyone's pinning — minus the syrup wall ☀️", recommended:false}
    ],
    caption:"Tropical iced coffee is having its summer — and the creamy part doesn't have to come from a syrup pump. ☀️🥥 Willa's Barista brings the rich, indulgent pour using the whole entire oat, so the treat reads clean instead of sugar-heavy.\n\nWilla's Barista uses simple organic ingredients and the whole entire oat for a rich, smooth taste — 50% less sugar than other barista oat milks, no rapeseed oil, no gums. 🥛 It foams, it froths, it photographs like a treat.\n\nThe tropical iced-coffee build:\n- ice in a tall glass\n- a shot (or two) of espresso or cold brew\n- a generous pour of Willa's Barista\n- a splash of coconut cream + a little real coconut on top\n\nIndulgent on purpose. (shhh… the cleanest thing in the glass is the milk.)",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#baristaoatmilk",
      "#icedcoffee",
      "#dairyfree",
      "#homecafe",
      "#tropicaldrinks",
      "#summercoffee",
      "#norapeseed",
      "#labelcheck"
    ],
    visual:"Vertical pin (2:3), editorial Ghia-style still — bright, warm, sun-dappled, shot like a summer drinks page in a magazine, not an ad. Hero: a tall glass of tropical iced coffee on a sunlit counter — espresso settling in gold ribbons through a creamy whole-oat pour, ice catching the light, a curl of real coconut and a thin coconut-cream cloud floating on top. The Willa's Barista carton stands tall and beautiful just behind the glass, late-morning light raking across it, in soft-but-readable focus. Around the scene, an unfussy home-cafe vignette: a small dish of toasted coconut, a halved lime or a sprig of something green, a linen napkin, a moka pot or cold-brew jar to the side, a few tropical leaves casting soft shadow. The carton is the calm center of the composition — everything tropical frames it, nothing competes with it. Tactile, real condensation, golden-warm color story (cream, espresso amber, coconut white, leaf green). Small tasteful serif overlay reads \"the tropical pour, minus the syrup.\" Tiny clean chip in the #75C596 green: \"50% less sugar than other barista oat milks.\" No QSR-menu styling, no neon-syrup-bottle energy, no clinical infographic — keeper energy, screenshot-able, the kind of frame a home-cafe saver pins to recreate on a hot afternoon. The carton's presence in the styled, real scene is the entire hook; let the carton design + the pour do the work. Carton clearly visible and readable in frame.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save it for the next hot afternoon 🥥", medium:"tap for the tropical iced-coffee build — it's a one-pour recipe", strong:"pour Willa's Barista into your summer iced coffee — indulgent, minus the syrup"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN15-TT-4",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Fri Jun 19 · 7pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"some milk's perfect. ours is just four things and that's the whole charm.\" — wabi-sabi clean-category flex",
    intel:[
      {type:"PULSE", text:"The wabi-sabi format — sparked by a Bobby Hill 'I like how mine's a little off-center, it's got wabi-sabi' clip — has the audio on ~500K TikToks (CP-7). Wabi-sabi means finding beauty in the imperfect + handmade. Creators label their everyday quirks as their 'wabi-sabi,' a soft self-love counter to filtered-perfection culture. The opening is to point the format at the Willa's carton, not a face — and frame Willa's OWN short list as the wabi-sabi: the off-center charm is that it's only four things, no engineered gloss. CRITICAL: this is a confident brand flex about WILLA'S being the imperfect-beautiful one — NOT an instruction to the viewer to read/flip/check their own label (that lane is burned). Warm, honest, real."},
      {type:"AUDIENCE", text:"Willa's buyers are tired of plant milks that look engineered — the long deck, the gums, the glossy 'optimized' label. They've watched the wellness world over-optimize everything (sleep scores, additive stacks) and they're leaning back toward food that's just food. This format rewards a soft, unbothered confidence: not 'we're perfect,' but 'we're four real things and that's the whole charm.' Don't lecture — let the short label be the quiet flex."},
      {type:"COMPETITOR", text:"Internal: the category keeps chasing a flawless, optimized look — fortified blends, engineered cold-foam performance, a deck long enough to read like a chemistry set, then a glossy front-of-carton claim to cover it. That polish is the tell. Willa's wins this format by being structurally un-glossy: four ingredients, the whole oat groat, nothing stirred in to perfect it. The wabi-sabi frame turns 'short label' from a spec into a personality — own the honest-not-engineered lane the optimized crowd can't follow into."}
    ],
    hooks:[
      {text:"most oat milk is chasing flawless. ours is a little off-center — four things, that's the whole charm. 🍵", recommended:true},
      {text:"wabi-sabi: beauty in the imperfect. the most beautiful thing about Willa's is how little is in it.", recommended:false},
      {text:"no engineered gloss. no deck to decode. just four real things and the whole oat — that's the flex.", recommended:false}
    ],
    caption:"Wabi-sabi — finding the beauty in the imperfect and the honest. ☁️ Most of the shelf is chasing a flawless, engineered look: a deck long enough to read like a chemistry set, then a glossy claim out front to cover it. Willa's is the opposite kind of beautiful — a little off-center, a little plain, and proud of it. Because the whole charm is the label has nothing to hide.\n\nWilla's Original is made from the whole entire oat — bran, germ and all, the way steel-cut oats are — so the protein and fiber your body wants never get filtered out the way most oat milks toss both. Four ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 1g sugar · 4g+ protein · 2g+ prebiotic fiber · certified glyphosate-free, tested every lot.\n\nNo gloss to engineer. No deck to decode. Just four real things and the whole oat. (shhh… that's the whole trick.) 🌾",
    hashtags:[
      "#willas",
      "#wabisabi",
      "#oatmilk",
      "#fouringredients",
      "#cleanlabel",
      "#wholeoat",
      "#dairyfree",
      "#1gsugar",
      "#realfood",
      "#wholeplant"
    ],
    visual:"Warm, sun-washed kitchen — soft late-morning light raking low across a pale linen counter, the unhurried wabi-sabi mood (handmade ceramics, a slightly-wonky mug, a sprig of something green in a small jar, nothing styled to perfection on purpose). Hands-only, no talent on camera. Lofi/chill audio energy, matched to the recognizable wabi-sabi sound. Open on the universal format beat: a hand turns the Willa's Original carton to its back label and a finger lands on the ingredient list — the camera tilts in slow, almost tender. The joke is in how SHORT the list is: the finger traces four lines and just… stops, with empty space below. Cut to small, honest details — the carton's slightly-imperfect hand-feel, condensation beading on a glass of oat milk poured over ice, a crumb of oat groat on the wood. Contrast beat (no named brand, no on-screen competitor): a fast, almost-comic glimpse of a fictional 'Average Oat Milk' label as a dense, gloss-printed wall of fine print the eye can't finish — then a soft cut back to the calm four-line Willa's list and a held breath. Carton stays visible 40%+ of the runtime. Text overlays in a clean, slightly-soft sans, animated gently on the beat (never hard or clinical). Close on the four-ingredient label held to camera with the finger resting under the last line, a tiny tilt, and the Willa's wordmark fading in. Keeper energy — the kind of slow, warm frame someone screenshots because it feels honest, not optimized.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Close-up, soft light: a hand turns the Willa's Original carton to its back label, finger landing on the ingredient list. Camera tilts in slow. On-screen text (soft sans, top-center): 'most oat milk is chasing flawless…'. Recognizable wabi-sabi audio comes in warm + low."},
      {scene:"THE LIST", time:"3-8s", action:"Macro: the finger traces the list line by line — 'organic whole grain oats · filtered water · organic vanilla extract · sea salt' — then stops, with visible empty space below where more would be. On-screen text appears one line per ingredient, then: 'wait… that's it?' A beat of stillness on the short list."},
      {scene:"THE CONTRAST", time:"8-12s", action:"Fast, almost-comic cut to a fictional 'Average Oat Milk' label — a dense, gloss-printed wall of fine print the eye can't finish scrolling (no real brand, no name shown). On-screen text: 'the category's chasing flawless 🧪'. Hard-ish cut back to the calm four-line Willa's list. On-screen text wipes in: 'ours is just… a little off-center 🍵'."},
      {scene:"THE WHY", time:"12-17s", action:"Tactile beat: a glass of Willa's poured over ice, condensation, a single oat groat on the wood. Finger taps the back of the carton. On-screen text stacks gently: 'the whole oat. bran, germ + all.' then '1g sugar · 4g+ protein · 2g+ fiber'. Warmth, no clinical energy."},
      {scene:"THE FLEX", time:"17-20s", action:"Slow push on the four-ingredient label, finger resting under the last line. On-screen text: 'nothing to hide. that's the wabi-sabi.' A tiny, satisfied tilt of the carton."},
      {scene:"END CARD", time:"20-22s", action:"The four-ingredient list held square to camera for one held beat, then on-screen text fades in: 'four real things. the whole oat.' followed by the Willa's wordmark. Audio softens out."}
    ],
    audio:"Warm narrative voiceover (brand 'we', fully optional — works text-driven). Lead with the recognizable wabi-sabi audio (the Bobby Hill 'a little off-center, it's got wabi-sabi' sound) as the format hook, kept low and warm; layer light pour + condensation SFX for ASMR on THE WHY. Lofi/chill register throughout — soft, unhurried, never a hard beat-drop. The format IS the audio, so lock to the trending wabi-sabi sound rather than a generic track.",
    duration:"20-22 seconds",
    cta:{soft:"save this for your most-honest-thing-in-the-fridge 🍵", medium:"tag the friend who'd appreciate a little off-center.", strong:"grab Willa's Original — four real things and the whole oat, that's the whole charm."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN15-TT-5",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"before-after-stitch",
    timing:"Sat Jun 20 · 10am",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the whole aisle is having a moment. we're just pouring.\" — noise-vs-calm stitch",
    intel:[
      {type:"TREND", text:"The oat-milk lane keeps growing even as the category's old guard wobbles (ref C-2) — plant milk now sits at ~16% of U.S. retail milk dollars and oat is the fastest-rising slice (T-3 background). The cultural read this enables: shoppers are tired of tracking which brand is hot, restructuring, or pivoting this season — the over-optimization fatigue showing up everywhere (T-9). The opening is a confession stitch: the feed is loud with brand drama, and Willa's answer is to stay out of the noise and just pour. Celebratory clean-category calm, NOT a label-instruction and NOT a 'we were here first' victory lap (both lanes burned) — the move is the quiet glass, not telling the viewer to inspect their own carton."},
      {type:"AUDIENCE", text:"Willa's buyer doesn't care whose stock is up — she just wants a clean glass without the discourse. The before-after-stitch DNA wins because the 'before' is the relatable doom-scroll (everyone's quietly exhausted by which brand is restructuring), and the 'after' is the quiet relief of a calm, creamy pour. Confession register, brand 'we' (no founder on camera) — 'we just tuned the noise out and poured' lands warmer than 'we're winning,' and it sidesteps both the burned read-your-label instruction and the burned we-were-first claim."},
      {type:"COMPETITOR", text:"Internal only (ref C-2): a legacy oat-milk giant is weighing a buyout of its slipping Greater China business after revenue fell and shares slid through a strategic review — the category's biggest name is in restructuring, not expansion. Willa's contrast is structural: while the giants chase turnarounds and the press cycle, the four-ingredient carton needs no pivot. NEVER name the competitor or cite any business metric in consumer copy — the stitch lives entirely in 'trust the glass, not the headlines' framing. Kiki Milk us-vs-them posture: confident, no names, anchor trust in the carton."}
    ],
    hooks:[
      {text:"the whole oat-milk aisle is having a moment. we're just over here pouring.", recommended:true},
      {text:"the feed keeps getting louder. the glass keeps getting creamier.", recommended:false},
      {text:"POV: you muted the brand-drama scroll and poured something calm instead.", recommended:false}
    ],
    caption:"While the feed argues about which oat milk is winning, pivoting, restructuring, having a moment 🥛 — we're in the kitchen, pouring a glass and tuning the discourse out.\n\nWilla's Original is organic whole grain oats, filtered water, organic vanilla extract, sea salt. Made from the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🌾 (4 ingredients · 1g sugar · 4g+ protein · 2g+ prebiotic fiber · certified glyphosate-free.)\n\nNo reformulation, no rebrand, no asterisk. Just a creamy, unhurried pour while everyone else doom-scrolls. (shhh… that's the whole flex.)\n\nLet the loud aisle be loud. We'll be here, glass in hand.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#cleanlabel",
      "#fouringredients",
      "#wholeoat",
      "#dairyfree",
      "#1gsugar",
      "#oatmilklatte",
      "#calmnotnoise",
      "#organic"
    ],
    visual:"Two-act before-after stitch, bright and trend-forward — warm daylight kitchen, no talent on camera, hands + phone + carton only. ACT ONE (the 'before'): tight overhead on a phone in hand, thumb doom-scrolling a blurred-out feed of generic 'brand of the season' chatter — headlines deliberately illegible, the energy is the endless scroll of who's-up-who's-down. Cool, slightly anxious color grade, fast micro-cuts mimicking a thumb flick. A small exhale beat. ACT TWO (the 'after'): hard cut to warm golden light — the phone goes face-down on the counter, and a hand reaches past it for the Willa's Original carton. The whole-oat pour into a clean glass follows immediately — thick, creamy, unhurried, the front of the carton facing camera. No back-label flip, no finger tracing an ingredient list (that label-inspection beat is retired); the carton's calm presence + the creamy pour do the work. The carton stays on screen 40%+ of the runtime. Text overlays in clean bold sans, animated on the beat; the 'before' overlays are jittery, the 'after' overlays settle and hold still — the visual grammar of going from noise to calm. No competitor names anywhere on screen; the 'before' is the abstract scroll, never a named brand. Close on the full glass beside the carton, both held steady in soft golden light for one full beat.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Tight overhead: a phone in hand, thumb flicking through a blurred, illegible feed of brand-drama chatter — cool grade, jittery micro-cuts. On-screen text (bold, top, slightly shaking): 'the whole oat-milk aisle is having a moment.' Hard cut on the beat."},
      {scene:"THE TURN", time:"3-7s", action:"Warm golden pivot: same counter, the phone is set face-down on the wood. A hand reaches past it for the Willa's Original carton, front facing camera. On-screen text settles and holds: 'we're just over here pouring. 🌾'"},
      {scene:"THE POUR", time:"7-13s", action:"The whole-oat pour: Original cascades thick and creamy into a clean glass, carton standing front-of-label in soft golden focus behind. On-screen text: '4 ingredients · 1g sugar · 4g+ protein 🥛' then 'creamy, not loud.'"},
      {scene:"THE CONFESSION", time:"13-18s", action:"Hands lift the glass for an unhurried sip (no face), set it down easy. On-screen text: 'no reformulation. no rebrand. no asterisk.'"},
      {scene:"END CARD", time:"18-22s", action:"The full glass beside the Willa's Original carton, both held steady in warm golden light for one full beat. On-screen text fades in: 'let the aisle be loud. 🌾' then the Willa's wordmark."}
    ],
    audio:"Warm narrative voiceover (brand 'we', optional — works fully text-driven). Audio mirrors the two acts: a jittery, busy phone-notification texture under the 'before,' then a clean drop into a mellow lofi/folk-kitchen beat the instant the phone goes face-down. Light page-turn / carton-handling + creamy pour SFX layered for ASMR calm in act two. No trending-audio lock required, but a soft slowed-down acoustic track sells the 'noise to calm' arc.",
    duration:"20-22 seconds",
    cta:{soft:"save this for the next time the feed gets loud 🌾", medium:"tell us your calmest kitchen ritual when the discourse gets noisy.", strong:"grab Willa's Original and pour something quiet this weekend."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUN15-IG-R5",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Chocolate",
    dnaPattern:"viral-recipe-remix",
    timing:"Sat Jun 20 · 11am",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the strawberry is doing the sweetening. we just stayed out of its way.\" — berry-maxxing chocolate-oat remix",
    intel:[
      {type:"PULSE", text:"Japanese strawberries are the summer's most photogenic food trend — luxury Omakase + Kyoto-berry content driving 28% YoY growth and 23M+ posts, fueling layered cakes and minimalist berry desserts all season (CP-8). The format is pure visual perfection plus aspirational pricing that's screenshot bait. The open lane is a clean, dairy-free build that earns the same beauty without the luxury price tag or the sugar bomb: let real berries carry the sweetness over a chocolate-oat base that's still real cacao, not flavoring."},
      {type:"AUDIENCE", text:"Willa's buyers want the treat to LOOK like a treat and still read clean when they flip the label. They stop the scroll for a layered, photogenic build they can actually make at home, and they reach for Chocolate when they want indulgent-without-the-crash. The move is abundance, not restraint — the strawberry-and-cacao build has to look as good as the luxury-berry content it's answering, and taste like dessert."},
      {type:"COMPETITOR", text:"Internal: the category's sweet plays lean on added sugar and flavoring shortcuts, and most chocolate oat milks pile on cane sugar while filtering the protein and fiber out of the oat. Willa's Chocolate uses real cacao and the whole oat, so fresh fruit doesn't have to fight a sugar-bomb base to taste sweet — the contrast is structural. Own the clean-indulgence lane the syrup-heavy crowd can't follow into. (Good Food Award is available as background proof, not the anchor.)"}
    ],
    hooks:[
      {text:"let's make a strawberry chocolate oat treat (dairy-free — the berries do the sweetening)", recommended:true},
      {text:"the luxury-berry dessert, rebuilt clean: real strawberries, real cacao, zero sugar bomb 🍓", recommended:false},
      {text:"everyone's gatekeeping the $19 berry. we layered the regular ones over real cacao instead.", recommended:false}
    ],
    caption:"Berry season had us craving something layered, fruity, and a little indulgent. 🍓🍫 So we built a dairy-free strawberry-chocolate oat treat where the real strawberries do the sweetening and the cacao keeps it dessert — no candy-store sugar load, no flavoring, just a build that looks as good as it tastes.\n\nWilla's Organic Chocolate Oat Milk uses simple organic ingredients and the whole entire oat for a rich, creamy taste that's perfect for dairy-free treats — with real cacao, less sugar, and more protein and fiber per cup than the average chocolate oat milk. 🥛 (Chocolate: 5 ingredients · real cacao · 5g protein · 3g fiber.)\n\nIngredients:\n- 1 cup Willa's Organic Chocolate Oat Milk\n- 1.5 cups fresh strawberries, sliced\n- 2 tbsp chia seeds\n- 1/4 cup coconut cream, whipped\n- a few cacao nibs to finish\n\nLayer, chill, and let the berry be the sweet. ✨",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#chocolateoatmilk",
      "#dairyfree",
      "#strawberry",
      "#realfruit",
      "#cleantreats",
      "#fruittok",
      "#wholeoat",
      "#labelcheck"
    ],
    visual:"Bright, editorial summer kitchen — warm raking daylight, a clean pale counter, Graza-style design-wit where the real strawberry is the hero and nothing is overstyled. Tactile, hands-only, no talent on camera. Color story: deep cacao brown + ripe strawberry red against cream — let the contrast carry the frame. Open on the trend everyone's seen — a single pedestaled luxury berry under a price tag, almost absurd in its preciousness — then a hand sets a humble bowl of ordinary fresh strawberries beside it and slides the pedestal out of frame. The build is the show: a chia-and-Chocolate-oat base poured into a clear glass (the pour is thick, glossy, real-cacao dark), sliced strawberries pressed against the glass in layers so the cross-section reads like a parfait, a soft cloud of whipped coconut cream spooned on top, cacao nibs scattered to finish. Hero frame is the finished layered glass in raking light with the strawberries glowing through the side and the Willa's Chocolate carton standing tall in soft focus behind it. Carton stays visible 40%+ of the runtime. Text overlays in clean bold sans, animated on the beat. Close on a spoon dragging through the layers (ASMR), then the Chocolate carton's ingredient list held to camera for the kicker — finger tracing 'real cacao.'",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Overhead close-up: a single luxury strawberry on a tiny pedestal beside an absurd price tag, lit precious and glossy. A hand sets down a humble bowl of ordinary sliced strawberries next to it and slides the pedestal out of frame. On-screen text (bold, top-center): 'let's make a strawberry chocolate oat treat'. Hard cut on the beat."},
      {scene:"THE BASE", time:"3-7s", action:"Bright daylight pivot: Willa's Chocolate carton standing tall behind a clear glass. The thick, glossy chocolate-oat pour cascades in over chia seeds — real-cacao dark, creamy. On-screen text: '1 cup Willa's Chocolate 🍫' then wipes to 'real cacao. not flavoring.'"},
      {scene:"THE LAYERS", time:"7-12s", action:"Fast tactile cuts: sliced strawberries pressed flat against the inside of the glass in stacked rings, the chia-chocolate base spooned between them so the cross-section reads like a parfait. On-screen text stacks the build: 'fresh strawberries · chia · chocolate oat base'. A beat lands on the layered glass catching the light."},
      {scene:"THE FINISH", time:"12-16s", action:"Close-up: a soft cloud of whipped coconut cream spooned on top (dairy-free), cacao nibs scattered across. On-screen text: 'whipped coconut cream + nibs (no dairy, promise) 🥥'. Smash-cut to the hero slow push-in on the finished glass, strawberries glowing red through the side, carton in soft focus behind."},
      {scene:"THE DRAG", time:"16-20s", action:"A spoon drags slowly down through the layers — strawberry, cacao, cream all catching at once (ASMR). On-screen text: 'the strawberry did the sweetening. 🍓'"},
      {scene:"END CARD", time:"20-22s", action:"Hand holds the Chocolate carton's ingredient list to camera, finger tracing 'organic cacao powder.' On-screen text fades in: 'Real cacao. The whole oat.' then the Willa's wordmark."}
    ],
    audio:"Warm narrative voiceover (brand 'we', optional — works fully text-driven). Lofi/chill summer beat with a clean drop on 'THE BASE' and 'THE FINISH'; light pour + spoon-drag SFX layered for ASMR craveability. No trending-audio lock required, but a mellow, sun-soaked track keeps it FoodTok-native.",
    duration:"20-22 seconds",
    cta:{soft:"save this for peak strawberry season 🍓", medium:"layer one this weekend and tag us — we want to see the cross-section.", strong:"grab Willa's Chocolate and build the clean-indulgent version where the berry is the sweet."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN15-IG-F1",
    platform:"IG Feed",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Multi",
    dnaPattern:"before-after-stitch",
    timing:"Sat Jun 20 · 12pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the shelf next to us is a roster of moms who built it themselves\" — small-crafter peer-set carousel",
    intel:[
      {type:"TREND", text:"The Specialty Food Association named its 2026 small-crafter class on Jun 2 (T-7) — hundreds of products from ~198 small, mostly founder-led makers, a cohort defined by people who built a real food from scratch instead of reformulating a big one. That cohort IS Willa's neighborhood on the shelf, and it's the peer set the REVIEWS/RECS saver actually trusts. The carousel does NOT claim or re-anchor any award and does NOT use a blind-taste / judging-panel / read-the-label framing (those lanes are rested) — it's a warm 'meet the makers around us' POV that lands on what founder-built food has in common: a short, honest carton you can actually trace to a kitchen."},
      {type:"AUDIENCE", text:"The REVIEWS/RECS saver trusts other buyers more than any brand claim — she's the one who reads the comments before she reads the caption. So the persuasion comes from real fan quotes used as headlines (Olipop's fan-voice move), not from Willa's grading itself. The before-after-stitch DNA works because each card flips a 'sounds like marketing' expectation to 'oh, a person actually said that.' Abundance and warmth, never a flex — the peer-set context gets set, then a customer's own words land it."},
      {type:"COMPETITOR", text:"Internal: the category leans on flashy limited-edition flavor drops and long ingredient decks to signal premium, while a legacy oat-milk giant restructures (C-2 context). Founder-built small-batch food is structurally harder to fake than a flavor-of-the-month — you can't reverse-engineer a grandmother's recipe or a four-line carton on a quarterly roadmap. Willa's owns the 'a real person built this' lane the drop-chasers can't follow into. Do NOT name or contrast any brand on this surface, do NOT reference the award win or a blind-taste panel — keep it peer-set-warm, category-level only."}
    ],
    hooks:[
      {text:"the shelf next to us is basically a roster of moms who built their food from scratch 🌾", recommended:true},
      {text:"the small-crafter aisle has one thing in common: a real person you could trace every ingredient back to", recommended:false},
      {text:"meet the makers we share a shelf with — swipe for what real buyers say →", recommended:false}
    ],
    caption:"Pull a few cartons off the small-batch shelf and you'll notice the same thing every time: a real person built each one from scratch. 🌾 That's the cohort Willa's grew up in — founder-led, mostly mother-made, the kind of food you can trace all the way back to a kitchen. Willa's was named after a grandmother who cooked with real ingredients before it was a trend, and we built the whole carton to live up to her.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 (Original: 4 ingredients · 1g sugar · 4g+ protein · 2g+ prebiotic fiber · certified glyphosate-free, tested every lot.)\n\nThe rest of the swipe? Not us talking — real buyers, in their own words. Read to the end. ✨",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#realfood",
      "#smallbatch",
      "#founderled",
      "#motherfounded",
      "#cleaningredients",
      "#dairyfree",
      "#wholeoat",
      "#shopsmall"
    ],
    visual:"Vertical 5-card IG Feed carousel (4:5), bright + editorial — warm daylight, pale linen + butcher-paper backdrop, the small-crafter-pantry aesthetic (think a sunny farmers-market table, not a studio). Consistent type system across all cards: a soft serif headline + a clean sans sub-line, generous whitespace, a tiny purple #A191B2 REVIEWS/RECS chip in the corner of each card so the set reads as one cohesive swipe. The carton (Willa's Original front-and-center, with Kids + Chocolate + Barista fanned softly behind on the final cards) appears in real, well-set scenes — never floating product-shot style. CARD 1 (cover / hook): the full lineup of Willa's cartons on a sunlit table among a few other unbranded small-batch pantry goods (a jar, a tin, a wrapped bar — peer-set energy, no competitor logos), serif headline 'the shelf next to us' with sub-line 'a roster of people who built their food from scratch.' CARD 2 (the cohort): warm wide shot of several hands setting unbranded small-batch goods + a Willa's carton on the same table, headline 'mostly founder-led. mostly mother-made.' sub-line 'small brands you can trace back to a real kitchen.' CARD 3 (the common thread): macro of organic whole oat groats in a hand + the Willa's carton beside the goods, headline 'the thing they share' sub-line 'a short, honest carton — nothing hidden in the back.' CARD 4 (fan voice — the payload): a clean quote card, large hand-set quotation marks, a REAL customer line styled as the headline — e.g. '\"my kids picked it without me saying a word. that never happens.\"' — small attribution '— a Willa's buyer' beneath, carton softly in frame at the edge. CARD 5 (fan voice + close): a second real-buyer quote — e.g. '\"i flip every carton over before i buy. this is the one i stopped overthinking.\"' — then the lineup again with a soft serif end line 'built by a real person. tastes like it.' Keep it abundant + warm, screenshot-able, the kind of carousel a buyer saves to send a friend. Bright, tactile, real condensation, no infographic clutter. Carton design does the work — let it.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for the next time you're shopping the small-batch shelf 🌾", medium:"swipe to the end, then tell us the founder-built brand you'd put on this shelf.", strong:"next grocery run, fill your cart with the cartons a real person actually built — start with Willa's."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN15-PIN-3",
    platform:"Pinterest",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"at-shelf-moment",
    timing:"Sat Jun 20 · 1pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the one part of the morning that isn't a little sad\" — lyric-overlay album-drop still",
    intel:[
      {type:"PULSE", text:"The lyric-overlay carousel is the dominant June format — text-over-clip confessionals set to anthem audio, spiking around the third-album drop the mom-and-teen audience is both already playing on repeat (CP-5). The format is gold; the payload is sad-girl. The open lane is to borrow the format's calm, album-cover composition and warm typography energy WITHOUT the heartbreak — a sunlit morning-ritual still where the only lyric on screen is about something that actually feels good. Same aesthetic the saver is already screenshotting, none of the ache."},
      {type:"AUDIENCE", text:"The Pinterest saver here is a mom whose feed and her teen's feed are running the same soundtrack — she saves album-coded, lyric-overlay stills for the mood, not the message. The at-shelf-moment DNA wins because the carton's quiet presence in a beautifully-composed kitchen does the persuading: she saves the frame for the vibe and absorbs '1g sugar · 4 ingredients' as a calm bonus. Healthier beat, zero lecture — it just looks like a Pin and happens to be the cleanest thing in it."},
      {type:"COMPETITOR", text:"Internal: the category is chasing limited-edition flavor drops and novelty creamers to feel culturally current (C-1). Willa's plays the opposite move on the same cultural beat — instead of a new flavor timed to a moment, it's the same four ingredients every single week, staged inside the moment's aesthetic. Riding the format, not the flavor churn. Do NOT name or contrast any brand on this surface; the contrast stays in the composition."}
    ],
    hooks:[
      {text:"the one part of the morning that isn't a little sad 🎤", recommended:true},
      {text:"play it loud. pour it slow. (the soundtrack and the carton, both on repeat.)", recommended:false},
      {text:"your aux and your kid's aux finally agree on something — and so does the kitchen", recommended:false}
    ],
    caption:"Some mornings deserve the anthem on full blast and a slow pour to match. ☀️🎤 Same album running on your phone and your kid's — and the calmest thing in the kitchen is the one with nothing to hide on the label.\n\nWilla's Original is made from the whole entire oat, so the 4g+ protein and 2g+ prebiotic fiber most oat milks filter out stay right where they belong. Four ingredients — filtered water, organic whole grain oats, organic vanilla extract, sea salt — 1g sugar, certified glyphosate-free.\n\nNo flavor-of-the-week, no asterisk. Just the pour that earns the playlist. (shhh… that's the whole point.)\n\nQueue it up and let the carton hold the frame.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#morningritual",
      "#cleanlabel",
      "#fouringredients",
      "#1gsugar",
      "#dairyfree",
      "#wholeoat",
      "#kitchenmood",
      "#labelcheck"
    ],
    visual:"Vertical pin (2:3), editorial Ghia-style still composed like an album cover, not an ad — bright, warm, sun-raked, the kind of frame a saver screenshots for the mood. Hero: a single carton of Willa's Original standing tall on a pale morning counter, late-morning light cutting across it at an angle, a sweating glass of oat milk poured over ice beside it. The composition borrows the lyric-overlay carousel format directly: a soft serif lyric-style text line set small and tasteful over the lower third — 'the one part of the morning that isn't a little sad' — in the warm, hand-set typography of an album-drop carousel, NOT a bold sans ad overlay. A phone resting face-up on the counter, screen glowing with a paused playlist (no logos, just the universal play-bar shape), nods to the soundtrack everyone's already running. Around the carton, an unfussy morning spread — a small bowl of berries, a linen napkin, a sprig of something green, warm wood and ceramic. The carton is the calm center; everything frames it. Tiny clean chip in the #73B2C9 health blue: '1g sugar · 4 ingredients.' Color story golden and warm, condensation real, textures tactile. No sad-girl payload, no heartbreak coding — the album-cover calm is the borrow, the morning is the mood. Let the carton design and the warm light do the work; the lyric-style line is the only text that needs to land.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save it for slow weekend mornings", medium:"tap to see why the whole oat keeps the protein + fiber in", strong:"set Willa's Original out for the next slow morning — it earns the playlist"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN15-TT-6",
    platform:"TikTok",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Sun Jun 21 · 11am",
    priority:"HIGH",
    rideNow:false,
    concept:"\"there's a fourth answer to the quiz: oat mom.\" — mom-archetype quiz POV",
    intel:[
      {type:"PULSE", text:"The '90s-coded mom-quiz wave is the defining parent-identity meme of the moment (CP-1) — a self-ID POV format sorting moms into almond mom (restriction), butter mom (real-ingredient scratch-cooking comfort), and gummy bear mom (treats allowed, balance over perfection). The format is high-velocity stitch bait. The opening: don't satirize the archetypes — add a fourth answer the quiz forgot. The oat mom: real ingredients, zero restriction, and the treat reads clean on the label. We embody it in brand 'we' voice, gloss the existing archetypes in one plain line so a non-insider gets the joke."},
      {type:"AUDIENCE", text:"Willa's parents are tired of being told they're doing it wrong — the almond-mom restriction lane stresses them out and the sugar-bomb lane scares them. They want the middle: a kids' drink their kid actually wants AND a label they don't have to apologize for. The quiz format is a gift because it lets a parent self-identify INTO a category that's about abundance, not policing. The move is warm recognition, not a finger-wag at the other moms — the joke is 'we're all in this kitchen, here's the easy mode.'"},
      {type:"COMPETITOR", text:"Internal: the kids' RTD shelf splits into sugar-loaded 'fun' options (9-11g cane sugar, oat syrup) and clinical 'better-for-you' options that read like a supplement. Willa's Kids sits in neither — 8g protein (same as dairy), 50% less sugar than dairy, top-9-allergen-free, Yuka 100/100, DHA + calcium. The oat-mom archetype is ownable precisely because no competitor can credibly claim 'treat the kid loves + label the parent trusts' at once. Don't name the archetypes' source brands — keep it category-level."}
    ],
    hooks:[
      {text:"almond mom, butter mom, gummy bear mom… there's a fourth one nobody's talking about.", recommended:true},
      {text:"we took the mom quiz. turns out there's an option they left off. 🌾", recommended:false},
      {text:"real ingredients, zero restriction, treats that read clean — that's the whole archetype.", recommended:false}
    ],
    caption:"Everyone's taking the mom quiz — almond mom counts the snacks, butter mom cooks from scratch, gummy bear mom keeps the treats coming. 🌾 We'd like to add a fourth answer: the oat mom. Real ingredients, zero restriction, and a treat the kid actually wants that still reads clean when you flip the carton.\n\nWilla's Kids was made because parents asked us to — same 8g protein as dairy, 50% less sugar than dairy, DHA + calcium, and free of the top 9 allergens (no nut, soy, gluten, dairy, sesame). It scored a perfect 100/100 on the Yuka clean-label app — the one that scans groceries and scores the ingredients.\n\nNo archetype to live up to. Just the chocolate milk you'd actually feel good pouring. (shhh… the kids think it's the treat. you know it's the easy one.)",
    hashtags:[
      "#willas",
      "#oatmom",
      "#momtok",
      "#kidsnacks",
      "#dairyfree",
      "#cleanlabel",
      "#allergenfriendly",
      "#momsoftiktok",
      "#kidsdrinks",
      "#labelcheck"
    ],
    visual:"Bright, sun-warmed real-kitchen TikTok — not studio, not stock. Warm morning light, a lived-in counter, the trend-forward '90s-nostalgia palette (soft butter-yellow, gummy-bright pops) that nods to the meme without being garish. The format mirrors the mom-quiz POV stitch: clean bold sans-serif on-screen text cycling through the archetype 'options' like a multiple-choice card. Hands-only, no talent on camera — hands sorting through the quiz answers as floating text cards, then sweeping in the Willa's Kids carton as the reveal answer. Tactile cuts: a kid's cup held out, the creamy Kids pour cascading in, the carton's front turned to camera then flipped to show the clean label. The Willa's Kids carton is the hero of the second half and stays on screen 40%+ of the runtime. Bright, fast, FoodTok-native — quick beat-synced text reveals, real condensation on the glass, a genuine kid-hand-reaching-for-the-cup beat that sells the family moment. Close on the carton front + the 'oat mom' text card. Keep it warm and winking, never preachy — the other archetypes are glossed kindly in one line, never mocked.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"POV down at a counter, hands holding a phone-style 'quiz card' graphic (or real printed cards). On-screen text (bold, top-center, multiple-choice style): 'what kind of mom are you?' Three answer cards fan out below. Fast, scroll-stopping. Hard cut on the beat."},
      {scene:"THE OPTIONS", time:"3-8s", action:"Quick beat-synced text reveals over hands tapping each card: 'A) almond mom — counts the snacks 🥗' · 'B) butter mom — cooks from scratch 🧈' · 'C) gummy bear mom — treats stay coming 🐻'. Each archetype glossed in the one plain line so a non-insider gets it. Light, warm, never mocking."},
      {scene:"THE FOURTH ANSWER", time:"8-12s", action:"Hand sweeps the three cards aside and sets down a fourth: 'D) oat mom 🌾'. On-screen text: 'real ingredients · zero restriction · treats that read clean'. The Willa's Kids carton slides into frame behind the card, standing tall in the morning light."},
      {scene:"THE POUR", time:"12-17s", action:"Tactile close-up: a kid's cup held out, Willa's Kids cascades in — creamy, chocolatey, photogenic. Carton stays in soft focus behind. On-screen text stacks the proof: '8g protein (same as dairy) · 50% less sugar than dairy · top-9 allergen-free'. A small kid hand reaches for the cup."},
      {scene:"THE LABEL", time:"17-20s", action:"Hand flips the Kids carton front-to-back, finger resting by the clean label for one beat. On-screen text: 'scored 100/100 on the clean-label app 🌾' (Yuka glossed: scans groceries, scores the ingredients)."},
      {scene:"END CARD", time:"20-22s", action:"Carton front held to camera beside the 'oat mom' card. On-screen text fades in: 'no archetype to live up to.' then the Willa's wordmark. Warm, settled, winking."}
    ],
    audio:"Warm narrative voiceover in brand 'we' voice (works fully text-driven too). Light, upbeat '90s-nostalgia-coded beat matching the mom-quiz format wave — clean drop on 'THE FOURTH ANSWER' and 'THE POUR'. Soft pour + cup SFX layered for craveability. No trending-audio lock required, but match a quiz-POV format sound peaking on MomTok for native reach.",
    duration:"20-22 seconds",
    cta:{soft:"save this for the next mom-quiz on your fyp 🌾", medium:"tell us — which mom are you? (we already know the answer.)", strong:"pour Willa's Kids and claim the oat-mom title — clean label, kid-approved."},
    benefitShorthandId:"BS-3"
  },
  {
    id:"JUN15-IG-R6",
    platform:"Instagram Reel",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Sun Jun 21 · 12pm",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"the carton that skipped the kids' version.\" — Father's Day pancake-morning Reel",
    intel:[
      {type:"PULSE", text:"Father's Day lands Sunday Jun 21 (CP-11), the latest the third-Sunday date can fall — and the brunch-recipe cycle is leaning heavy on overnight-oat pancakes and shaped pancakes with in-season berries. It's a textbook morning-ritual, generational-table moment: the pancake breakfast a dad and kid make together every year. The opening is to own the quiet beat the category misses — there's no separate kids' version of the table when the carton on the counter already reads clean for both of them. Christina in-frame for the family-authenticity beat, brand 'we' voice."},
      {type:"AUDIENCE", text:"The Willa's parent reaches for Kids because it's the rare carton she doesn't have to ration or apologize for — 8g protein, 6g sugar from organic maple, free of the top 9 allergens. On a Father's Day morning she's not running two breakfasts; she's pouring one thing the whole table drinks. The move is warmth and belonging, not a nutrition lecture — let the shared pour BE the message and keep the receipts to a quiet second beat."},
      {type:"COMPETITOR", text:"Internal: the category sells kids' drinks as a separate, sweeter, brighter-packaged SKU — a different aisle, a different sugar load, a different table. Willa's Kids hits 8g protein with 6g sugar (vs the cane-syrup kids' RTDs the category leans on) and crosses over to adult coffee + bakes, so 'the same carton for both of them' is a structural truth, not a tagline. Own the one-table lane the two-SKU category can't follow into. Do NOT name a competitor on this surface."}
    ],
    hooks:[
      {text:"let's make Father's Day blueberry pancakes (the carton that skipped the kids' version)", recommended:true},
      {text:"the kids' drink that's clean enough a dad splashes it in his coffee. 🥞", recommended:false},
      {text:"we never made a separate kids' version. turns out dad pours it too. ☕", recommended:false}
    ],
    caption:"Father's Day morning calls for blueberry pancakes — the two-hands kind where a small hand mashes the banana and a steadier one works the whisk. 🥞 Here's the quiet thing we love about it: the carton on the counter never needed a separate kids' version. It reads clean enough that the glass gets poured AND the coffee gets a splash.\n\nWilla's Kids uses simple organic ingredients and the whole entire oat — 8g protein, 6g sugar from organic maple, DHA omega-3s, and free of the top 9 allergens. 🥛 The rare carton clean enough for the kid and good enough a grown-up reaches for it.\n\nIngredients:\n- 1 cup Willa's Kids\n- 1 cup whole grain oat flour (or blended oats)\n- 1 mashed banana\n- 1 tsp baking powder\n- a handful of fresh blueberries\n\nGriddle, flip, stack, pour. The morning's the recipe. ✨",
    hashtags:[
      "#willas",
      "#fathersday",
      "#oatmilk",
      "#kidsdrinks",
      "#pancakemorning",
      "#dairyfree",
      "#allergenfriendly",
      "#wholeoat",
      "#familybreakfast",
      "#labelcheck"
    ],
    visual:"Warm, lo-fi Father's Day morning — soft east-facing window light raking low across a worn wooden kitchen, steam off the griddle, the unhurried pace of a thing done every year. Muted-but-alive palette: golden pancake brown, blueberry navy, the Willa's Kids carton's color standing on the counter. This is one of the reserved Christina-on-camera briefs (kid-family authenticity beat) — but shot tender and hands-forward, never a talking head: Christina and a kid working the same small stretch of counter, faces soft / often out of focus or in profile, the FOCUS on four hands sharing one bowl. Open on the two of them at the griddle together — a small hand pressing into the bowl, a steadier hand guiding the whisk. The Willa's Kids carton lives on the counter the whole time and gets poured TWICE in one motion: once into a short kid's glass, once into a tall mug of coffee, same tilt, same carton — that double-pour is the hero shot. Tactile cuts: blueberries dropped onto wet batter, the first flip, a stack going taller, maple drizzle. Carton stays visible 40%+ of the runtime, label readable for one beat near the end. Text overlays in a warm, rounded sans, small and unobtrusive, animated gently on the pour — never shouty. Close on the two glasses (one short, one tall) clinking soft, and the Kids carton in soft focus behind. Brand 'we' voice in VO; reads like a memory, not an ad.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Low warm window light. Two sets of hands at a mixing bowl on a worn counter — one small, one adult — Christina half-in-frame in profile, soft focus. The Willa's Kids carton stands on the counter beside the bowl. On-screen text (warm rounded sans, lower-third): 'let's make Father's Day blueberry pancakes'. Hold on the shared bowl."},
      {scene:"THE RITUAL", time:"3-8s", action:"Tactile build: a small hand mashes a banana, the steadier hand sifts oat flour in, blueberries tumble onto the counter. Quick warm cuts, hands-forward, faces soft. On-screen text fades: 'blueberry pancakes, two-hands job 🥞' then 'the carton: clean enough for both of them'."},
      {scene:"THE POUR", time:"8-13s", action:"Hero shot. Christina lifts the Willa's Kids carton and pours in one continuous motion — first into a short kid's glass on the counter, then tilts the same carton into a tall coffee mug right beside it. Same tilt, kid's glass then dad's coffee. On-screen text: 'no separate kids' version. it's just clean.' Carton label catches the light."},
      {scene:"THE GRIDDLE", time:"13-18s", action:"Close on the griddle: batter poured, blueberries pressed in, the first flip in slow motion, a stack building taller with a small hand reaching to steady it. Maple drizzle ribbons down. On-screen text: '8g protein · 6g sugar · top-9 allergen-free 🥛' (small, lower-third)."},
      {scene:"THE TABLE", time:"18-22s", action:"The two glasses — short and tall — meet in a soft clink, kid's hand and adult's hand. The Kids carton sits in soft focus behind. On-screen text: 'clean enough for both of them.'"},
      {scene:"END CARD", time:"22-24s", action:"Hand turns the Kids carton label to camera for one beat, the simple ingredient line readable. On-screen text fades in: 'Clean enough for the whole table.' then the Willa's wordmark."}
    ],
    audio:"Warm narrative voiceover in brand 'we' (Christina's voice works here since she's on camera, but framed as the brand remembering, not a founder monologue). Lo-fi, unhurried acoustic bed — folk-heritage morning mood, gentle finger-picked guitar, no drop. Light griddle sizzle + pour SFX layered low for warmth. No trending-audio lock; a slow singer-songwriter morning track keeps it tender and family-coded.",
    duration:"22-24 seconds",
    cta:{soft:"save this for the next slow morning 🥞", medium:"make the blueberry stack and tag us — we want to see whose hands are in the bowl.", strong:"grab Willa's Kids for the pancakes — clean enough that dad pours it in his coffee too."},
    benefitShorthandId:"BS-3"
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
  {icon:"↑", title:"\"some labels have homework to turn in. ours has four lines.\" leads the week as the calm-authority founder Reel on Wed Jun 17.", reason:"A bill on the Governor's desk would make New York the first state to force the shelf to publish the safety report behind every self-affirmed ingredient. Willa's 4-ingredient Original has nothing self-affirmed to disclose — the direct answer, delivered as Patagonia gravity, not panic. The news is backdrop; the carton is the lead.", agent:"composer"},
  {icon:"↑", title:"\"the saxophones are for the OTHER carton.\" goes BIG SWING on TikTok Wed Jun 17, riding June's doom-meter format.", reason:"The 'saxophones are getting louder' template is one of the month's most-used formats. We aim the dread at the average back label — gums, oils, oat syrup — and cut the music dead on the calm 4-ingredient carton. The format does the reach; the short list is the punchline. No competitor named.", agent:"pulse"},
  {icon:"↑", title:"\"one pour for the both of them.\" closes the week as the Father's Day pancake-morning Reel on Sun Jun 21.", reason:"The latest-possible Father's Day lands Jun 21. A dad-and-kid pancake breakfast where both pour from the same carton — no separate kids' table — carries the in-week generational moment in brand 'we' voice. Heritage warmth, Christina in-frame for the family-authenticity beat.", agent:"composer"},
  {icon:"⚡", title:"\"it's not the oat. it's what they do to it.\" calm blood-sugar correction queued for Thu Jun 18.", reason:"The 'oat milk spikes blood sugar like soda' claim keeps recirculating and dietitian fact-checks have already cut it down. We answer matter-of-factly: it's the processing, not the oat — Willa's keeps the whole groat at 1g sugar. Kiki-Milk confidence, gloss the maltose mechanism in one plain line, never strident.", agent:"composer"},
  {icon:"↑", title:"\"the whole category wants what's already on the carton\" carries the category-POV carousel as confident product truth, no trade-press stats on the surface.", reason:"Oat milk is the fastest-growing plant-milk lane and the 2026 story brands are chasing is 'whole ingredients + protein.' We read it card-by-card — what the category now wants vs. what's been on the label the whole time. The market data stays internal; the carton does the talking.", agent:"trend"},
  {icon:"↓", title:"Held the entertainment lane to the Olivia Rodrigo lyric-overlay still over the Bonnaroo / Noah Kahan headline.", reason:"Both cleared the warm-tonal test, but two album/festival music pulses would crowd the week. The lyric-overlay format carries cleaner reach as a Pinterest morning-ritual still — text-over-pour, two-generations-share-the-aux — without the sad-girl payload. Bonnaroo held as background.", agent:"pulse"},
  {icon:"×", title:"Killed the synthetic-dye phase-out reckoning signal before it could anchor a brief.", reason:"The dye-removal lane is burned at the anchor level — last refresh rode 'dye-removal pressure reaches private-label shelves,' and the broader phase-out leans on a stale April background source. Kept the fresh New York GRAS-disclosure bill (which bans Red Dye 3 as one provision) as the in-window policy anchor instead.", agent:"editor"},
  {icon:"×", title:"Killed the Oatly China-buyout competitor read as a consumer card after verifying the framing.", reason:"The Bloomberg report verifies and the date is in-window, but the business-restructure story fails the audience-outsider test for consumer copy — earnings and carve-outs aren't customer-facing. Kept it as internal intel powering one confident 'trust the carton, not the headlines' stitch; pulled the standalone card per drop-or-replace-never-hide.", agent:"comp"}
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
  total:13420,
  lift:38,
  sessions:1086,
  topRoiFormat:"Calm-authority label-read Reel + dairy-free recipe-remix (four-words avoid-list peaked JUN 1)",
  topRoiPerBrief:1411,
  source:"Shopify + Klaviyo"
};

const AGENT_BY_ID = Object.fromEntries(AGENTS.map(a=>[a.id,a]));

// ─── Brief ↔ source links (the threading) ─────────────────
const BRIEF_LINKS = {
  "JUN15-TT-1":{
    trends:[],
    pulse:[
      "CP-6"
    ],
    comps:[]
  },
  "JUN15-IG-R1":{
    trends:[
      "T-1"
    ],
    pulse:[],
    comps:[]
  },
  "JUN15-IG-F2":{
    trends:[
      "T-3"
    ],
    pulse:[],
    comps:[]
  },
  "JUN15-IG-R2":{
    trends:[],
    pulse:[
      "CP-2"
    ],
    comps:[]
  },
  "JUN15-PIN-1":{
    trends:[
      "T-8"
    ],
    pulse:[],
    comps:[]
  },
  "JUN15-IG-R3":{
    trends:[
      "T-9"
    ],
    pulse:[],
    comps:[]
  },
  "JUN15-TT-2":{
    trends:[],
    pulse:[
      "CP-9"
    ],
    comps:[]
  },
  "JUN15-TT-3":{
    trends:[
      "T-6"
    ],
    pulse:[],
    comps:[]
  },
  "JUN15-IG-R4":{
    trends:[],
    pulse:[
      "CP-3"
    ],
    comps:[]
  },
  "JUN15-PIN-2":{
    trends:[
      "T-4"
    ],
    pulse:[],
    comps:[]
  },
  "JUN15-TT-4":{
    trends:[],
    pulse:[
      "CP-7"
    ],
    comps:[]
  },
  "JUN15-TT-5":{
    trends:[],
    pulse:[],
    comps:[
      "C-2"
    ]
  },
  "JUN15-IG-R5":{
    trends:[],
    pulse:[
      "CP-8"
    ],
    comps:[]
  },
  "JUN15-IG-F1":{
    trends:[
      "T-7"
    ],
    pulse:[],
    comps:[]
  },
  "JUN15-PIN-3":{
    trends:[],
    pulse:[
      "CP-5"
    ],
    comps:[]
  },
  "JUN15-TT-6":{
    trends:[],
    pulse:[
      "CP-1"
    ],
    comps:[]
  },
  "JUN15-IG-R6":{
    trends:[],
    pulse:[
      "CP-11"
    ],
    comps:[]
  }
};



// ─── Paid Amplify Plans (Paid Media Planner output) ──────
const AMPLIFY_PLANS = {
  "JUN15-IG-R1":{
    headline:"Four-lines-no-homework calm-authority founder Reel — lead the week on the GRAS-disclosure transparency moment",
    totalBudget:280,
    testWindow:"5 days (Wed Jun 17 → Sun Jun 21)",
    objective:"Saves + Profile Visits",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"A bill on the Governor's desk would make New York the first state to force food companies to publish the safety report behind every self-affirmed 'GRAS' ingredient (Davis Wright Tremaine Jun 8, CSPI). Willa's 4-ingredient Original has nothing self-affirmed to disclose — the structural answer, delivered as founder authority, not panic. The news is backdrop; the carton is the lead. We name no one.",
    placements:[
      {platform:"Meta", format:"Reels Ad (IG Reels + FB Reels)", budget:280, audience:"Interest: Clean Label, Glyphosate-Free, Organic Food, Whole Foods, Sprouts, Mom-Founded, MAHA, Food Transparency · Age: 28–48 · Behavior: Engaged with clean-label / food-safety content (30 days)", lookalike:"Klaviyo Willa's purchaser lookalike + Detox Project / glyphosate-free engaged audience + clean-label parent lookalike", expectedReach:"80K–140K video views", note:"Optimize for Saves. The four-line label held to camera is the share engine — the 'nothing to disclose' beat should land as calm authority, never fear. If sentiment holds above 0.88 through 72hr, extend to $360 for the full weekend ride."}
    ]
  },
  "JUN15-TT-1":{
    headline:"Saxophone doom-meter format flip — aim June's most-used TikTok format at the OTHER carton",
    totalBudget:240,
    testWindow:"4 days (Wed Jun 17 → Sun Jun 21)",
    objective:"Video Views + Saves",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"The 'saxophones are getting louder' doom-meter is one of June's most-used TikTok formats (New Engen, napoleoncat). Willa's aims the dread at the average back label — gums, oils, oat syrup as the sax climbs — then cuts the music dead on the calm 4-ingredient carton. The format does the reach; the short list is the punchline. Format-as-virality has been the highest-reach lane all year. No competitor named.",
    placements:[
      {platform:"TikTok", format:"Spark Ad", budget:240, audience:"Interest: Label Check, Clean Label, Oat Milk, Dairy-Free, TikTok Food, Trending Audio · Age: 22–42 · Behavior: Engaged with trending-audio + recipe content (30 days)", lookalike:"Willa's Original engaged-non-follower lookalike + clean-label / label-check recipe audience", expectedReach:"75K–135K video views", note:"Optimize for Video Views first, Saves second — this rides a fast-moving trending audio, so ship inside the format's window. The silence after the smash-cut is the joke; keep the calm-carton payoff clean. If the sax audio cools before Day 3, redirect budget to JUN15-IG-R1."}
    ]
  },
  "JUN15-IG-R6":{
    headline:"One-pour Father's Day pancake morning — close the week on the latest-possible Father's Day with the generational-pour beat",
    totalBudget:220,
    testWindow:"3 days (Fri Jun 19 → Sun Jun 21)",
    objective:"Saves + Shares",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"Father's Day 2026 lands Sunday Jun 21 — the latest the third Sunday can fall — closing the refresh week (National Today). A dad-and-kid pancake breakfast where both pour from the same carton, no separate kids' table, carries the in-week generational moment in brand 'we' voice. Heritage warmth, Christina in-frame for the family-authenticity beat. The kid-family-moment format compounds on Saves + Shares.",
    placements:[
      {platform:"Meta", format:"Reels Ad (IG Reels + FB Reels)", budget:220, audience:"Interest: Parenting, Kids Nutrition, Family Breakfast, Allergen-Free, Mom-Founded, Pancakes, Father's Day · Age: 28–45 · Behavior: Engaged with family / kids-food content (30 days)", lookalike:"Willa's Kids engaged-non-follower lookalike + clean-label parent lookalike", expectedReach:"65K–120K video views", note:"Optimize for Saves. The one-carton-two-glasses pour is the share engine — let the every-year-ritual warmth carry it, no product hard-sell. Ship Sat Jun 20 evening / Sun Jun 21 morning so it lands inside the holiday window."}
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
  {date:"Sun Jun 14 · 22:10", agent:"composer", msg:"18 briefs delivered for the week of JUN 15-21 · 3 BIG SWINGs (GRAS-disclosure four-lines founder Reel · saxophone doom-meter format flip · Father's Day one-pour pancake morning) · 7 HIGH · category-POV + dairy-free remix spine"},
  {date:"Sun Jun 14 · 21:30", agent:"editor", msg:"Caption variants drafted across the slate (direct / warm / punchy) · brand-voice default · Willa's capitalized in caption bodies · Christina on-camera reserved for the GRAS founder Reel + the Father's Day pancake morning, inside the 2-3/week cap"},
  {date:"Sun Jun 14 · 16:40", agent:"trend", msg:"New York GRAS-disclosure bill (AB 1556/SB 1239) on the Governor's desk — first state to force published safety reports on self-affirmed ingredients, passed Assembly 106-32 + Senate unanimously (Davis Wright Tremaine Jun 8) · BIG SWING \"four lines, no homework\" founder Reel queued"},
  {date:"Sun Jun 14 · 14:08", agent:"pulse", msg:"'Saxophones are getting louder' confirmed as one of June's most-used TikTok formats (New Engen · napoleoncat) — doom-meter swell-then-dread structure · BIG SWING format flip queued, aim the dread at the average carton, cut to silence on the 4-ingredient label"},
  {date:"Sat Jun 13 · 18:22", agent:"trend", msg:"Oat milk pegged the fastest-growing plant-milk lane — ~$3.67B (2025) to $10.68B by 2034, the 2026 story chasing 'whole ingredients + protein' (Food Institute · FoodNavigator) · category-POV carousel queued, market data stays internal"},
  {date:"Sat Jun 13 · 14:50", agent:"pulse", msg:"Espresso-lemonade crossed 91M+ posts and tipped into a packaged kit timed to first-day-of-summer (Nestle USA) — tart, naturally dairy-free, missing a creamy half · dairy-free Barista remix queued before the chains own it"},
  {date:"Sat Jun 13 · 11:18", agent:"comp", msg:"Bloomberg reported Oatly weighing a Greater China buyout after revenue slipped and shares slid 35% (Jun 9) — kept as internal intel only, fails the audience-outsider test for a consumer card · \"trust the carton, not the headlines\" stitch queued, no names"},
  {date:"Sat Jun 13 · 09:30", agent:"pulse", msg:"'90s mom-quiz wave cresting — almond mom / butter mom / gummy bear mom self-ID POV driving stitch volume (Newsweek · AOL) · Father's Day Jun 21 confirmed as latest-possible date · oat-mom fourth-answer TikTok + one-pour pancake Reel queued"},
  {date:"Fri Jun 12 · 16:40", agent:"pulse", msg:"Olivia Rodrigo's third album set a 2026 single-day Spotify streaming record for a female artist (Variety · Globalnews Jun 12) — lyric-overlay format spiking · held the Bonnaroo/Noah Kahan headline to avoid two music pulses, kept the warm morning-ritual still"},
  {date:"Fri Jun 12 · 14:08", agent:"editor", msg:"Killed 6 stale or out-of-lane signals: synthetic-dye phase-out (burned at anchor) · plant-milk emissions case (Dec 2025 source) · GLP-1 DIY-semaglutide market problem (lane rested) · raw-milk movement (politically charged register) · 'nature's Ozempic' supplement myths (no fresh peg) · seed-oil/tallow panic (out-of-window source)"},
  {date:"Fri Jun 12 · 12:14", agent:"comp", msg:"Killed the Oatly China-buyout standalone competitor card — business-restructure framing fails the audience-outsider test for consumer copy · folded into internal intel powering the headline-vs-label stitch · pulled per drop-or-replace-never-hide"}
];


// ─── Killed signals (the ones we said no to) ──────────────
const KILLED = [
  {signal:"Synthetic-dye phase-out 2026 reckoning (cereal + soup giants reformulating by summer)", reason:"The dye-removal lane is burned at the anchor level — JUN 8 T-2 ('dye-removal pressure reaches private-label shelves') rode it last week, and the broader phase-out leans on a FoodIngredientsFirst Apr 7 background source. Kept the fresh NY-GRAS disclosure bill (which bans Red Dye 3 as one provision) as the in-window policy anchor instead.", by:"Cultural Editor"},
  {signal:"Plant milk's 60-70% lower-emissions sustainability case", reason:"The anchoring FoodNavigator source is dated Dec 2025 and the 60-70% figure is flagged low-confidence in research; the sustainability throughline is durable but the sourcing is stale for a fresh card. Folded into the oat-milk-growth trend as background, not its own entry.", by:"Cultural Editor"},
  {signal:"GLP-1 misinformation now a $130B market problem (DIY semaglutide on TikTok)", reason:"Fresh and real (MedCity Jun 9) but the GLP-1 lane is rested this refresh per do-not-repeat — JUN 8 T-3 anchored the Stanford muscle-loss study, and the whole GLP-1 storyline is burned for fresh anchoring this week. Business-market framing also fails the audience-outsider test for a consumer card.", by:"Cultural Editor"},
  {signal:"Raw-milk movement keeps spreading despite outbreaks (CNN, Jun 14)", reason:"Genuinely in-window and tonally adjacent (tested-and-certified vs. 'natural = safe'), but the raw-dairy + RFK-aligned framing is politically charged and risks a combative register; the cleaner real-food-standards POV is already carried by the NY-GRAS and FRESH Act policy trends.", by:"Cultural Editor"},
  {signal:"'Nature's Ozempic' supplement myths (oatzempic, berberine, ricezempic)", reason:"The oatzempic pushback is a tired CLAUDE.md exemplar with no fresh-this-week peg (coverage is recycled 2024/Jan 2026), and the lane sits adjacent to the rested GLP-1 storyline. The fresher oat-milk-GI fact-check (CP-9) carries the calm-correction pulse instead.", by:"Cultural Editor"},
  {signal:"Seed-oil panic stays loud as MAHA pushes beef tallow (STAT, May 22)", reason:"The STAT anchor is dated May 22 — outside the 7-day window — and the seed-oil-free Christina authority Reel is explicitly burned (MAY 25). Useful internal why-now context for the no-rapeseed Barista claim, but not a fresh consumer card.", by:"Cultural Editor"},
  {signal:"Unregulated 'GLP-1 patches' flooding TikTok Shop despite the ban (Fast Company)", reason:"The underlying Media Matters original is Sept 2025 and the lane is GLP-1-adjacent (rested this week). The 'internet sells shortcuts, Willa's sells food that works' angle is real but better served by the in-window oat-milk-GI rebuttal without the GLP-1 baggage.", by:"Cultural Editor"},
  {signal:"Niall Horan 'Dinner Party' album / 'End of an Era' table tribute (Jun 5)", reason:"Perfect warm-gathering tonal fit, but the Jun 5 drop is pre-window (background only) and the entertainment lane is already carried by the higher-reach Bonnaroo/Noah Kahan and Olivia Rodrigo picks — held to avoid stacking music-album pulses.", by:"Cultural Editor"},
  {signal:"Charli XCX 'Rock Music' stuck-frame glitch edit", reason:"Track dropped May 7 (out of window) and the cold, hard glitch-edit register runs counter to Willa's warm-wink voice. The meme-format lane is better served by the wabi-sabi and saxophone formats that land warmer.", by:"Cultural Editor"},
  {signal:"Dirty soda goes mainstream / coconut-cream builds (Sporked, Jun 2)", reason:"The anchor is dated Jun 2 (background-only) and the #MomTok dirty-soda format leans into soda-as-treat in a way that's a soft fit for a 1g-sugar real-food brand; the coconut-cream cream-swap idea overlaps the cleaner coconut-coffee category trend already in the slate.", by:"Cultural Editor"},
  {signal:"Two-ingredient yogurt-and-cookie no-bake dessert (Canadian Grocer, May 28)", reason:"Anchor dated May 28 (out of window), dairy-coded (yogurt), and the no-bake summer-dessert lane is explicitly exhausted on the burn list (brownies → fudge → frozen fudge). Skip.", by:"Cultural Editor"},
  {signal:"Juneteenth red-drinks + passed-down family table (Thu Jun 19)", reason:"In-window and tonally heritage-aligned, but the passed-down red-drink tradition is culturally specific (Yoruba/Kongo through Texas) and a Willa's brief risks appropriating rather than honoring it; safer to observe than to ride without a genuine, non-extractive bridge. Father's Day (CP-11) carries the in-week generational-table moment instead.", by:"Cultural Editor"}
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
  "JUN15-TT-1":{direct:"Some back labels read like a horror movie — and yes, the ominous saxophone is included. 🎷 Gums, oils, an enzyme that turns the oat into sugar (that's the \"oat syrup\" you keep seeing)... the list just keeps scrolling. Then there's the carton where the music cuts out, because there's nothing dramatic to play over: organic whole grain oats, filtered water, organic vanilla extract, sea salt. That's the whole list.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 (Original: 4 ingredients · 1g sugar · 4g+ protein · 2g+ prebiotic fiber · certified glyphosate-free.)\n\nNo soundtrack required. Just flip it and read.", warm:"you know that dramatic saxophone that means something's about to go wrong? 🎷 that's the back of most oat-milk cartons — gums, oils, oat syrup (the oat turned into sugar). then there's Willa's Original: four words, 1g sugar, whole oat. the music just... stops. (shhh… nothing to play over.)", punchy:"flip the average oat milk 🎷 vs. flip Willa's Original (silence). four words. 1g sugar."},
  "JUN15-IG-R1":{direct:"Willa's Original is four ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt. Nothing self-affirmed, nothing to disclose, nothing to hide. 🌾\n\nA lot of the shelf is built on ingredients a company quietly declared safe on its own — the kind of thing a transparency law would ask them to show their work on. When your whole label is four lines you can read out loud, there's no homework to turn in. That's not a reaction to the news. It's been the standard since the start.\n\nThe whole entire oat does the work, so you get a rich, smooth taste with less sugar and more protein and fiber per cup — 1g sugar · 4g+ protein · 2g+ prebiotic fiber · organic · certified glyphosate-free, tested every lot. 🥛\n\nClean isn't a scramble around here. It's just what's already on the carton.", warm:"Four lines. That's the whole label. 🌾 No additives a company quietly decided were fine on their own, nothing to file, nothing to explain away. Willa's Original is organic, glyphosate-free, 1g sugar — the whole oat doing the work. (shhh… the short list was always the flex.)", punchy:"some labels have homework to turn in. ours has four lines. 🌾"},
  "JUN15-IG-F2":{direct:"Some oat milks read like a chemistry quiz. Willa's Original reads like a grocery list: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 🌾 That's it. That's the whole thing.\n\nWe use the whole entire oat groat — bran, germ, and all, like steel-cut oats — not the processed oat syrup most oat milks make. So the 4g+ protein and 2g+ prebiotic fiber are just there, the way the oat made them. Nothing fortified back in, nothing filtered out.\n\nWilla's Original — 4 ingredients, 1g sugar, 4g+ protein, 2g+ prebiotic fiber, certified glyphosate-free, organic. 🥛\n\nRich, smooth, and refreshingly boring on the label. Exactly how we like it.", warm:"organic whole grain oats, filtered water, organic vanilla extract, sea salt. 🌾 that's the whole ingredient list — no asterisk, no chemistry quiz. Willa's uses the whole entire oat, not oat syrup, so the protein + fiber are just there to begin with. 4 ingredients, 1g sugar, 4g+ protein. (shhh… clean was never supposed to be complicated.)", punchy:"oats, water, vanilla, salt. 1g sugar, 4g+ protein, organic. that's the whole label. 🌾"},
  "JUN15-IG-R2":{direct:"The espresso-lemonade combo took over feeds tart, fizzy, and milk-free — so we finished it. 🍋 A bright lemonade base, a shot of espresso, and a slow pour of Willa's Barista on top: the creamy layer the format was missing, minus the cafe sugar dump.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 (Barista: 50% less sugar than other barista oat milks, no rapeseed oil, no gums — it foams and pours like the real thing because it's made from the whole oat.)\n\nIngredients:\n- 1 cup fresh lemonade (over ice)\n- 1-2 shots espresso (or strong cold brew)\n- a splash of Willa's Barista, poured slow over the top\n- lemon slice + extra ice to finish\n\nBuild it in the glass, pour the creamy layer last, watch it cloud. ✨", warm:"Espresso lemonade went everywhere this summer — tart, bright, and missing one thing. 🍋 So we poured a slow layer of Willa's Barista over the top, and the whole drink came together. Creamy, dreamy, no rapeseed oil, no chain sugar load. (shhh… the pour is the whole trick.)", punchy:"tart espresso lemonade, meet your creamy top. 🍋🥛 no rapeseed. no chain sugar load."},
  "JUN15-PIN-1":{direct:"Some pours don't need a recipe card — they ARE the recipe. 🍵☁️ Matcha, ice, and a slow stream of Willa's Barista cascading in: that's the whole build, and it photographs like the cafe one without you leaving the kitchen.\n\nWilla's Barista gets its rich, creamy body from the whole entire oat — not rapeseed oil, not gums. 4g protein, 50% less sugar than other barista oat milks, and it foams and pours like it means it. 🥛 The cream layer over the green is the part the at-home wave was missing.\n\nNo blender, no fuss. Just a beautiful pour you'll want to save and make again.", warm:"the whole recipe is the pour. 🍵 matcha, ice, and a slow ribbon of Willa's Barista marbling through the green. creamy from the whole oat — no rapeseed, no gums, 4g protein. (shhh… it photographs better than the cafe's.)", punchy:"matcha + a slow oat-milk pour. that's the whole recipe. 🍵"},
  "JUN15-IG-R3":{direct:"Somewhere along the way breakfast became a scored event — a sleep number, an HRV reading, a macro to beat before you've even had a sip. ☀️ This is the opposite of that: a slow morning pour that asks nothing of you. No app to open, no number to chase, no logging required. Just real food and a quiet kitchen.\n\nWilla's Original keeps it calm by design — 4 simple ingredients, 1g sugar, 4g+ protein, 2g+ prebiotic fiber, certified glyphosate-free, made from the whole oat (not oat syrup). The kind of breakfast you don't have to monitor, because it was never a metric to begin with.\n\nFed, not tracked. That's the whole wellness plan. 🥛", warm:"Breakfast doesn't need a leaderboard. ☀️ No app, no ring, no number to beat before your first sip — just a slow pour of Willa's Original and a quiet morning. 4 ingredients, 1g sugar, made from the whole oat. Some mornings just get to be breakfast. Fed, not tracked. 🥛", punchy:"no app. no score. no HRV reading. just 4 ingredients and a quiet morning. ☀️"},
  "JUN15-TT-2":{direct:"Deep breath — your oat milk is not soda. 🌾 Here's the part that viral clip skipped: the blood-sugar story isn't about the oat, it's about the processing. Most oat milks run an enzyme that turns the oat's starch into sugar (that's where the maltose comes from) and filters out the fiber + protein that would've slowed it down. So you're left with the sugar and none of the brakes.\n\nWilla's keeps the whole oat groat — the whole oat kernel, like steel-cut oats before they're rolled — so the fiber and protein stay in the glass and the sugar stays at 1g. Original: 4 ingredients, 1g sugar, 4g+ protein, 2g+ prebiotic fiber, organic, certified glyphosate-free.\n\nIt's not the oat. It's what they do to it. (shhh… that's the whole secret.)\n\nFlip the label before you flip out. The short ingredient list tells you everything.", warm:"Saw the 'oat milk is basically soda' video and side-eyed your carton? 🌾 Take a breath. The sugar isn't the oat — it's the processing. Most oat milks turn the oat's starch into sugar and filter out the fiber + protein that would've slowed it down. Willa's keeps the whole groat, so the fiber + protein stay in and the sugar stays at 1g. (shhh… that's the whole trick.)", punchy:"it's not the oat. it's what they do to it. 🌾 (whole groat. 1g sugar. not soda — not close.)"},
  "JUN15-TT-3":{direct:"Most active adults already hit their protein number — so the third scoop isn't doing what the internet promised. 🥄 (Spoiler: the body can't store the surplus. It just shows it the door.)\n\nWilla's Original isn't a shaker swap — it's the calm middle. 4g+ protein and 2g+ prebiotic fiber that come from the whole oat itself, not a powder stirred in. Real food, the right amount, no math.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 (Original: 4 ingredients · 1g sugar · 4g+ protein · 2g+ prebiotic fiber · certified glyphosate-free.)\n\nMore isn't the flex. Enough, from real food, is. ✨\n\nhonest question, no wrong answer: how many scoops are you actually on? 👇", warm:"Plot twist: you probably already hit your protein number, and the fourth shake is just… vibes. 🥄 Willa's Original isn't another scoop to stack — it's the calm middle. 4g+ protein and 2g+ fiber straight from the whole oat, four ingredients, zero powder. (shhh… enough is allowed to be the goal.) so — how many scoops are you really on? 👇", punchy:"you already hit your protein number. put the third scoop down. 🥄 how many are you on, though? 👀"},
  "JUN15-IG-R4":{direct:"That confetti iced latte all over your feed had us craving the sprinkle pour — so we rebuilt it dairy-free. 🎨✨ Same thick, spoon-drag cold foam, same rainbow confetti top, none of the birthday-cake creamer. The foam's whipped from Willa's Kids, so it photographs like a treat and carries real protein instead of a sugar bomb.\n\nWilla's Kids uses simple organic ingredients and the whole entire oat for a rich, creamy taste, less sugar, and 8g of protein per cup — plus DHA, calcium, and free of the top 9 allergens. 🥛 (And it oddly makes the best swirls.)\n\nIngredients:\n- 1 cup Willa's Kids, cold\n- 1 shot espresso or 1/2 cup cold brew\n- ice\n- a spoonful of rainbow nonpareil sprinkles\n- optional: a drizzle of maple\n\nFroth the Willa's Kids cold until thick, pour over iced coffee, spoon-drag the foam, then rain the sprinkles. ✨", warm:"Turns out the confetti latte never needed the birthday-cake creamer — it needed the sprinkles. 🎨 We froth Willa's Kids into the same thick, spoon-drag foam, pour it over iced coffee, and rain the confetti on top. Photographs like a treat, quietly carries 8g protein. (shhh… the foam's the clean part.)", punchy:"confetti cold-foam latte, dairy-free. the foam's 8g protein. the sprinkles are non-negotiable. 🎨"},
  "JUN15-PIN-2":{direct:"Tropical iced coffee is having its summer — and the creamy part doesn't have to come from a syrup pump. ☀️🥥 Willa's Barista brings the rich, indulgent pour using the whole entire oat, so the treat reads clean instead of sugar-heavy.\n\nWilla's Barista uses simple organic ingredients and the whole entire oat for a rich, smooth taste — 50% less sugar than other barista oat milks, no rapeseed oil, no gums. 🥛 It foams, it froths, it photographs like a treat.\n\nThe tropical iced-coffee build:\n- ice in a tall glass\n- a shot (or two) of espresso or cold brew\n- a generous pour of Willa's Barista\n- a splash of coconut cream + a little real coconut on top\n\nIndulgent on purpose. (shhh… the cleanest thing in the glass is the milk.)", warm:"the tropical iced coffee everyone's pinning, minus the syrup wall. 🥥 Willa's Barista pours creamy from the whole oat — 50% less sugar than other barista oat milks, no rapeseed, no gums. indulgent on purpose. (shhh… the cleanest thing in the glass is the milk.)", punchy:"tropical iced coffee. indulgent on purpose. zero syrup pump. 🥥☀️"},
  "JUN15-TT-4":{direct:"Wabi-sabi — finding the beauty in the imperfect and the honest. ☁️ Most of the shelf is chasing a flawless, engineered look: a deck long enough to read like a chemistry set, then a glossy claim out front to cover it. Willa's is the opposite kind of beautiful — a little off-center, a little plain, and proud of it. Because the whole charm is the label has nothing to hide.\n\nWilla's Original is made from the whole entire oat — bran, germ and all, the way steel-cut oats are — so the protein and fiber your body wants never get filtered out the way most oat milks toss both. Four ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 1g sugar · 4g+ protein · 2g+ prebiotic fiber · certified glyphosate-free, tested every lot.\n\nNo gloss to engineer. No deck to decode. Just four real things and the whole oat. (shhh… that's the whole trick.) 🌾", warm:"wabi-sabi: the beauty in the imperfect and the honest. ☁️ ours is a little off-center — a little plain, a little short on the label — and that's exactly the charm. four ingredients, the whole oat, nothing engineered to look flawless. (shhh… there's nothing to hide.) 🌾", punchy:"a little off-center. a lot less in it. four ingredients, the whole oat. 🍵"},
  "JUN15-TT-5":{direct:"While the feed argues about which oat milk is winning, pivoting, restructuring, having a moment 🥛 — we're in the kitchen, pouring a glass and tuning the discourse out.\n\nWilla's Original is organic whole grain oats, filtered water, organic vanilla extract, sea salt. Made from the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🌾 (4 ingredients · 1g sugar · 4g+ protein · 2g+ prebiotic fiber · certified glyphosate-free.)\n\nNo reformulation, no rebrand, no asterisk. Just a creamy, unhurried pour while everyone else doom-scrolls. (shhh… that's the whole flex.)\n\nLet the loud aisle be loud. We'll be here, glass in hand.", warm:"The feed is loud about which oat milk is 'winning' this season. 🌾 We muted it and poured a glass instead. Willa's Original: organic, 4 ingredients, 1g sugar, made from the whole oat. No rebrand, no reformulation, no asterisk — just creamy. (shhh… that's the whole flex.)", punchy:"the aisle keeps getting louder. the glass keeps getting creamier. 🌾 4 ingredients, no drama."},
  "JUN15-IG-R5":{direct:"Berry season had us craving something layered, fruity, and a little indulgent. 🍓🍫 So we built a dairy-free strawberry-chocolate oat treat where the real strawberries do the sweetening and the cacao keeps it dessert — no candy-store sugar load, no flavoring, just a build that looks as good as it tastes.\n\nWilla's Organic Chocolate Oat Milk uses simple organic ingredients and the whole entire oat for a rich, creamy taste that's perfect for dairy-free treats — with real cacao, less sugar, and more protein and fiber per cup than the average chocolate oat milk. 🥛 (Chocolate: 5 ingredients · real cacao · 5g protein · 3g fiber.)\n\nIngredients:\n- 1 cup Willa's Organic Chocolate Oat Milk\n- 1.5 cups fresh strawberries, sliced\n- 2 tbsp chia seeds\n- 1/4 cup coconut cream, whipped\n- a few cacao nibs to finish\n\nLayer, chill, and let the berry be the sweet. ✨", warm:"Turns out a regular strawberry, layered right, beats the $19 one. 🍓 We stacked fresh berries over a real-cacao chocolate-oat base, topped it with whipped coconut cream, and let the fruit carry the sweetness. Dairy-free, no flavoring, no sugar bomb — just a treat that looks like a treat. (shhh… the secret is the whole oat.)", punchy:"real strawberries. real cacao. zero sugar bomb. 🍓🍫"},
  "JUN15-IG-F1":{direct:"Pull a few cartons off the small-batch shelf and you'll notice the same thing every time: a real person built each one from scratch. 🌾 That's the cohort Willa's grew up in — founder-led, mostly mother-made, the kind of food you can trace all the way back to a kitchen. Willa's was named after a grandmother who cooked with real ingredients before it was a trend, and we built the whole carton to live up to her.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 (Original: 4 ingredients · 1g sugar · 4g+ protein · 2g+ prebiotic fiber · certified glyphosate-free, tested every lot.)\n\nThe rest of the swipe? Not us talking — real buyers, in their own words. Read to the end. ✨", warm:"Most of the small-batch shelf has one thing in common: a real person built every carton from scratch. 🌾 Willa's grew up in that cohort — founder-led, mostly mother-made, named after a grandmother who cooked real food before it was cool. (shhh… the best part of the swipe is the buyers' own words, not ours.)", punchy:"the shelf next to us? a roster of people who built their food by hand. 🌾 (the fans said the rest — swipe.)"},
  "JUN15-PIN-3":{direct:"Some mornings deserve the anthem on full blast and a slow pour to match. ☀️🎤 Same album running on your phone and your kid's — and the calmest thing in the kitchen is the one with nothing to hide on the label.\n\nWilla's Original is made from the whole entire oat, so the 4g+ protein and 2g+ prebiotic fiber most oat milks filter out stay right where they belong. Four ingredients — filtered water, organic whole grain oats, organic vanilla extract, sea salt — 1g sugar, certified glyphosate-free.\n\nNo flavor-of-the-week, no asterisk. Just the pour that earns the playlist. (shhh… that's the whole point.)\n\nQueue it up and let the carton hold the frame.", warm:"anthem on full blast, pour on slow motion. 🎤 same album as your kid's, same carton on the counter — whole-oat, 1g sugar, four ingredients you can actually read. (shhh… it's the calmest thing in the kitchen and it didn't even try.)", punchy:"the soundtrack's already on repeat. so is the carton. 🎤 1g sugar, 4 ingredients."},
  "JUN15-TT-6":{direct:"Everyone's taking the mom quiz — almond mom counts the snacks, butter mom cooks from scratch, gummy bear mom keeps the treats coming. 🌾 We'd like to add a fourth answer: the oat mom. Real ingredients, zero restriction, and a treat the kid actually wants that still reads clean when you flip the carton.\n\nWilla's Kids was made because parents asked us to — same 8g protein as dairy, 50% less sugar than dairy, DHA + calcium, and free of the top 9 allergens (no nut, soy, gluten, dairy, sesame). It scored a perfect 100/100 on the Yuka clean-label app — the one that scans groceries and scores the ingredients.\n\nNo archetype to live up to. Just the chocolate milk you'd actually feel good pouring. (shhh… the kids think it's the treat. you know it's the easy one.)", warm:"almond mom, butter mom, gummy bear mom… and then there's the oat mom. 🌾 real ingredients, zero restriction, and a treat that still reads clean on the carton. Willa's Kids — 8g protein like dairy, half the sugar, top-9 allergen-free. (shhh… the kids think it's the treat.)", punchy:"there's a fourth mom on the quiz. she pours Willa's Kids. 🌾"},
  "JUN15-IG-R6":{direct:"Father's Day morning calls for blueberry pancakes — the two-hands kind where a small hand mashes the banana and a steadier one works the whisk. 🥞 Here's the quiet thing we love about it: the carton on the counter never needed a separate kids' version. It reads clean enough that the glass gets poured AND the coffee gets a splash.\n\nWilla's Kids uses simple organic ingredients and the whole entire oat — 8g protein, 6g sugar from organic maple, DHA omega-3s, and free of the top 9 allergens. 🥛 The rare carton clean enough for the kid and good enough a grown-up reaches for it.\n\nIngredients:\n- 1 cup Willa's Kids\n- 1 cup whole grain oat flour (or blended oats)\n- 1 mashed banana\n- 1 tsp baking powder\n- a handful of fresh blueberries\n\nGriddle, flip, stack, pour. The morning's the recipe. ✨", warm:"Father's Day pancakes, the two-hands kind. 🥞 The little glass gets a pour, the coffee gets a splash — same Willa's Kids, clean enough we never bothered making a separate grown-up version. 8g protein, 6g sugar, top-9 allergen-free. (shhh… the splash in dad's coffee is the best-kept secret.)", punchy:"the kids' drink clean enough dad pours it in his coffee. happy Father's Day. ☕🥞"}
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
  happened:"The two tracked moves point opposite directions — Chobani pushed a limited-edition dairy creamer to national shelves (Jun 14) while a legacy oat-milk giant weighed selling its slipping China business (Jun 9), splitting the category between novelty-flavor chasing and retreat.",
  coming:"Watch the summer dairy-free coffee wave (coconut + matcha + proffee builds, espresso-lemonade kits dropping late June) drive at-home recreation demand, and the latest-possible Father's Day (Jun 21) close the week on a generational-pour moment.",
  plays:"About 12-14 briefs on the table; the two biggest are a calm transparency Reel riding the New York GRAS-disclosure bill and a clean-by-design oat-latte answer to the category's dairy-creamer and tropical-coffee push."
};


// ─── Performance · Week of MAY 25 – MAY 31 results ──────────────
const LAST_WEEK_RESULTS = [
  {id:"JUN01-IG-R1", concept:"\"stop reading the scary list. start reading the short one.\" — four words, zero homework", platform:"IG Reel", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"National oat-milk avoid-list (JUN 1)", trendId:null, views:512000, saves:32600, shares:15400, comments:2440, savesDelta:9.3, sentiment:0.97, hero:true, note:"Highest-saves brief of the JUN 1 refresh. Reading the four-line label out loud against a national avoid-list — letting the back of the carton be the whole argument — is the share engine. The learning: the short list IS the flex. This week the same calm-authority register escalates: the pesticide story became a transparency law, so the \"four lines, no homework\" founder Reel answers the GRAS-disclosure bill with the carton that has nothing to file."},
  {id:"JUN01-TT-1", concept:"\"you genuinely cannot tell the cloud is dairy-free\" — hands-only pour reveal", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Strawberry cloud matcha viral wave (JUN 1)", trendId:null, views:458000, saves:27200, shares:14600, comments:2120, savesDelta:7.7, sentiment:0.95, hero:false, note:"The dairy-free-cloud reveal landed — a four-ingredient base disappearing into the prettiest drink of the summer adds value without preaching. Viral-recipe-remix stays the highest-reach format. This week the same play runs on the espresso-lemonade remix (\"the tart base finally met its creamy answer\"): take the viral format that's missing a creamy half, give it a clean whole-oat layer, let the pour carry it."},
  {id:"JUN02-IG-R2", concept:"\"we already strained it. you're welcome.\" — skip-the-bag reveal", platform:"IG Reel", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Homemade-DIY oat milk debate (JUN 1)", trendId:null, views:322000, saves:19400, shares:9600, comments:1480, savesDelta:6.6, sentiment:0.96, hero:false, note:"The skip-the-homework framing converted — most DIY recipes add a gum to fix the slime, so 'we already strained it' rewards the buyer's instinct without a lecture. This week the same gut-confirming move carries the wabi-sabi ingredient-list POV (\"a little off-center, a lot less in it\") — let the short list be the quiet flex, warm and honest, four things and nothing engineered."},
  {id:"JUN04-IG-R3", concept:"\"set it out once. they run it all afternoon.\" — the snack station that buys you quiet", platform:"IG Reel", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"Summer-snack survival mode (JUN 1)", trendId:null, views:348000, saves:21800, shares:10200, comments:1760, savesDelta:6.9, sentiment:0.96, hero:false, note:"Built-for-the-parent framing landed — 8g protein, top-9 allergen-free, Yuka 100 as the receipt under a station the kids run themselves. This week the parent lane shifts from survival mode to identity + ritual: the oat-mom fourth-answer TikTok claims the '90s mom-quiz wave, and the Father's Day one-pour pancake Reel closes on dad and kid sharing the same carton — belonging, not just utility."},
  {id:"JUN03-IG-F1", concept:"\"the question grew up. so did the answer.\" — four words on the back, nothing to defend", platform:"IG Feed", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"Oat milks adding fiber back (JUN 1)", trendId:null, views:286000, saves:18600, shares:8800, comments:1280, savesDelta:6.1, sentiment:0.98, hero:false, note:"Highest sentiment of the JUN 1 week (0.98) — 'you only add fiber back if you took it out' won as earned editorial that names the category sleight-of-hand without naming a brand. This week the category-POV lane sharpens further: the whole category chasing 'whole ingredients + more protein' becomes \"the whole category wants what's already on the carton\" — the shelf renovating toward where Willa's started."},
  {id:"JUN05-IG-R4", concept:"\"the carton that passed your audit before you flipped it\" — the two-second clean label", platform:"IG Reel", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"Label-literacy parenting wave (JUN 1)", trendId:null, views:264000, saves:16800, shares:7900, comments:1140, savesDelta:5.7, sentiment:0.96, hero:false, note:"Two-second-flip framing landed for the label-reading audience — Kids 100, top-9 allergen-free, DHA as the fast 'just passes' read. This week that label-flip instinct gets the comedic treatment: the saxophone doom-meter TikTok aims the dread at the average back label and rewards the buyer's gut with the silent cut to four words."},
  {id:"JUN05-TT-5", concept:"\"the scrape heard round the freezer\" — real cacao, five ingredients, sound on", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Frozen-treat ASMR wave (JUN 1)", trendId:null, views:398000, saves:14600, shares:13400, comments:1900, savesDelta:4.7, sentiment:0.93, hero:false, note:"Reach amplifier (398K views, lower save-rate) — the ASMR scrape is a recognition vehicle, the real-cacao five-ingredient deck is the receipt. This week the indulgent-remade-clean lane moves to berries: the strawberry-chocolate-oat treat (\"the strawberry is doing the sweetening\") rides berry-maxxing, letting real fruit carry the sweetness over a clean cacao-oat base."},
  {id:"JUN06-PIN-1", concept:"\"the cold drink as clean as it looks\" — four-ingredient iced matcha, save it", platform:"Pinterest", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Summer iced-matcha planning surge (JUN 1)", trendId:null, views:118000, saves:8900, shares:0, comments:0, savesDelta:6.4, sentiment:0.97, hero:false, note:"Pinterest pin compounded for 7+ days (CTR climbing daily) — the planning audience captured the seasonal iced-drink window. This week the Pinterest save-and-return play moves to the slow oat-milk-matcha pour still (\"the pour is the whole recipe\") and the tropical iced-coffee build, riding the dairy-free coffee-bar wave the platform is already planning around."}
];

const PERF_KPIS = {
  shipped:14,
  totalReach:3006000,
  avgSavesDelta:6.7,
  topFormat:"Calm-authority label-read Reels + dairy-free recipe-remix + survival-mode parenting"
};

const PERF_INSIGHTS = [
  {title:"Reading the label out loud was the highest-saves play of the JUN 1 week (the four-words avoid-list Reel hit 9.3× saves)", detail:"The 'stop reading the scary list. start reading the short one.' Reel hit 9.3× saves and 0.97 sentiment — letting the four-line back label be the whole argument against a national avoid-list, no fear-spiral. The learning: the short list IS the flex; the audience trusts the carton over the claim. This week the engine escalates the same register — the pesticide story became a transparency law, so the \"four lines, no homework\" founder Reel answers the GRAS-disclosure bill with the carton that has nothing to disclose.", agent:"perf"},
  {title:"The dairy-free swap stays the highest-engagement recipe frame (the strawberry-cloud-matcha reveal hit 7.7× saves)", detail:"The 'you genuinely cannot tell the cloud is dairy-free' TikTok hit 7.7× saves and 0.95 sentiment — taking a viral drink and rebuilding it clean adds value without preaching. This week the engine runs the same play on the 91M-post espresso-lemonade format: the tart base is naturally milk-free and missing a creamy half, so \"the tart base finally met its creamy answer\" pours a whole-oat Barista layer over it. Take the viral recipe, give it the clean counterpart, let the pour carry it.", agent:"editor"},
  {title:"Category-critique carousels won on sentiment (the 'adding fiber back' Feed post hit the week's high at 0.98)", detail:"The 'the question grew up. so did the answer.' carousel posted the week's highest sentiment (0.98) — naming the category's add-fiber-back sleight-of-hand as earned editorial without naming a brand. This week the category-POV lane sharpens into the growth story: the whole category chasing 'whole ingredients + more protein' becomes \"the whole category wants what's already on the carton\" — the shelf renovating toward where Willa's started, with the market data kept internal.", agent:"trend"},
  {title:"Survival-mode parenting compounds when the carton solves a real summer problem (the snack-station Reel hit 6.9× saves)", detail:"The 'set it out once. they run it all afternoon.' station Reel hit 6.9× saves and 0.96 sentiment — 8g protein + top-9 allergen-free as the receipt under a station that buys parents quiet. This week the parent lane shifts from utility to identity + ritual: the oat-mom fourth-answer TikTok claims the '90s mom-quiz wave, and the Father's Day \"one pour for the both of them\" pancake Reel closes on dad and kid sharing the same carton — belonging over readiness.", agent:"composer"}
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
  "JUN15-TT-1":{voice:92, panel:88, pulse:94, recency:8},
  "JUN15-IG-R1":{voice:93, panel:90, pulse:88, recency:7},
  "JUN15-IG-F2":{voice:92, panel:88, pulse:81, recency:9},
  "JUN15-IG-R2":{voice:90, panel:87, pulse:93, recency:12},
  "JUN15-PIN-1":{voice:89, panel:85, pulse:82, recency:12},
  "JUN15-IG-R3":{voice:93, panel:89, pulse:86, recency:9},
  "JUN15-TT-2":{voice:92, panel:89, pulse:88, recency:10},
  "JUN15-TT-3":{voice:92, panel:87, pulse:85, recency:12},
  "JUN15-IG-R4":{voice:90, panel:87, pulse:93, recency:8},
  "JUN15-PIN-2":{voice:90, panel:85, pulse:86, recency:9},
  "JUN15-TT-4":{voice:92, panel:87, pulse:84, recency:12},
  "JUN15-TT-5":{voice:90, panel:85, pulse:82, recency:9},
  "JUN15-IG-R5":{voice:90, panel:86, pulse:85, recency:12},
  "JUN15-IG-F1":{voice:89, panel:85, pulse:80, recency:12},
  "JUN15-PIN-3":{voice:90, panel:85, pulse:88, recency:9},
  "JUN15-TT-6":{voice:93, panel:90, pulse:94, recency:10},
  "JUN15-IG-R6":{voice:93, panel:89, pulse:90, recency:7}
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
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"The '90s mom-quiz wave goes mainstream: almond mom vs. butter mom vs. gummy bear mom 🧈",
    detail:"A trio of 1990s-coded parenting archetypes — almond mom (restriction), butter mom (real-ingredient comfort, scratch cooking), and the new middle option gummy bear mom (treats allowed, balance over perfection) — is the defining mom-identity meme of June 2026. Newsweek frames butter mom as Gen Z's '90s-themed aesthetic built on whole real ingredients; AOL covered gummy bear mom as the 'most realistic' archetype. The format is a self-identification quiz POV driving stitch volume.",
    velocity:"high",
    willasPlay:"Reel: brand 'we' voice — there's a fourth answer to the quiz, the oat mom: real ingredients, zero restriction, treats that read clean. Embody it, don't satirize.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"Newsweek · What is a 'butter mom'? Gen Z's latest '90s aesthetic (Jun 2026)", url:"https://www.newsweek.com/what-is-butter-mom-gen-z-latest-90s-aesthetic-11793246"},
      {label:"AOL · What is a 'Gummy Bear Mom' — and how do you know if you are one (Jun 2026)", url:"https://www.aol.com/gummy-bear-mom-trend-explained.html"}
    ]
  },
  {
    id:"CP-2",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"Espresso lemonade is summer 2026's unexpected drink — 91M+ posts, now packaged into a kit 🍋",
    detail:"The iced-espresso-over-lemonade combo has crossed 91M+ posts on TikTok and tipped from creator hack to commercial format, with a limited-edition Espresso Lemonade kit dropping across late June timed to the first day of summer. The format is espresso concentrate over canned lemonade with ice — naturally dairy-free, tart, caffeinated, seconds to make. The open lane: the no-milk format still wants a creamy counterpart.",
    velocity:"high",
    willasPlay:"Reel: own the dairy-free oat-milk-lemonade-coffee remix before the chains do — a creamy whole-oat layer over the tart espresso-lemonade base, hero shot is the pour.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"Nestle USA · NESCAFE Redefines Classic Summer Drink with Espresso Lemonade Hack (Jun 2026)", url:"https://www.nestleusa.com/media/pressreleases/nescafe-espresso-lemonade"},
      {label:"TikTok · #EspressoLemonade hashtag hub", url:"https://www.tiktok.com/tag/espressolemonade"}
    ]
  },
  {
    id:"CP-3",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"The 'dot cake iced latte' is FoodTok's new confetti cold-foam ASMR bait 🎨",
    detail:"A 'dot cake iced latte' — iced coffee topped with thick cold foam and rainbow nonpareil sprinkles, riffing the viral dot-cake dessert — started spreading across TikTok and Reels the week of Jun 11, 2026, with creators chasing the spoon-drag ASMR and photogenic confetti top. The published recipes lean dairy (heavy-cream cold foam, birthday-cake creamer), leaving an open lane for a clean dairy-free rebuild. The format is pure visual: the sprinkle-topped pour is the whole hook.",
    velocity:"high",
    willasPlay:"Reel: rebuild the confetti cold-foam pour dairy-free with Willa's Barista foam — the photogenic format minus the sugar-bomb creamer.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"Tomatoes Tomahtos · Viral Dot Cake Iced Latte (Jun 11, 2026)", url:"https://tomatoestomahtos.com/2026/06/11/viral-dot-cake-iced-latte/"}
    ]
  },
  {
    id:"CP-4",
    type:"ENTERTAINMENT",
    typeColor:"#A191B2",
    hook:"Noah Kahan closes Bonnaroo with folk-heritage + a morning-yoga wellness build 🪕",
    detail:"Noah Kahan headlined the What Stage at 9:30pm Sunday, Jun 14 to close Bonnaroo 2026 (Manchester, TN), the defining festival moment of the weekend. Bonnaroo partnered with Kahan's Busyhead Project on 'Camp Busyhead' — morning yoga, a self-care fest-essentials package, and mental-health resources. It's the rare festival headline in Willa's pocket: heritage-folk mood, morning-ritual energy, wellness-as-care, not restriction.",
    velocity:"medium",
    willasPlay:"Reel: use the folk-festival morning-after mood as audio bed for a slow, sunlit kitchen pour — wellness as care and abundance, not a detox.",
    dnaMatch:"at-shelf-moment",
    sources:[
      {label:"MTSU Sidelines · Bonnaroo 2026: 10 music storylines to watch, from Kesha to Noah Kahan (Jun 9, 2026)", url:"https://mtsusidelines.com/2026/06/09/bonnaroo-2026-10-music-storylines-to-watch-from-kesha-to-noah-kahan/"}
    ]
  },
  {
    id:"CP-5",
    type:"ENTERTAINMENT",
    typeColor:"#A191B2",
    hook:"Olivia Rodrigo's third album drops Friday and ignites the lyric-overlay carousel format 🎤",
    detail:"Olivia Rodrigo released her third album 'You Seem Pretty Sad for a Girl So in Love' on Jun 12 via Geffen, setting a 2026 single-day Spotify streaming record for a female artist. New Engen flagged lyric-overlay formats spiking ahead of the drop, the dominant June pattern being text-over-clip confessionals set to anthem audio. It's the soundtrack the mom-and-teen audience is both already playing.",
    velocity:"high",
    willasPlay:"Reel: borrow the lyric-overlay format for a warm morning-ritual carousel — text-over-pour, two-generations-share-the-aux energy, no sad-girl payload.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"Variety · Olivia Rodrigo new album title, June release date (Jun 2026)", url:"https://variety.com/2026/music/news/olivia-rodrigo-third-album-title-release-date-1236764890/"},
      {label:"Globalnews · New Music Friday: 12 new releases for the last weekend of spring (Jun 12, 2026)", url:"https://globalnews.ca/news/11899862/new-music-friday-12-new-releases-for-the-last-weekend-of-spring-12-june-2026/"}
    ]
  },
  {
    id:"CP-6",
    type:"MEME FORMAT",
    typeColor:"#73B2C9",
    hook:"'Saxophones are getting louder' is June's doom-meter format — mundane setup, then dread 🎷",
    detail:"The 'saxophones are getting louder' meme — built on the dramatic sax from Boyz n the Hood signaling an impending bad turn — is one of June 2026's most-used formats per New Engen and napoleoncat roundups. The structure: a relatable ordinary setup, then the metaphorical saxophones swell to signal it's about to go wrong. Universally relatable and fast to produce.",
    velocity:"high",
    willasPlay:"TikTok: aim the doom-sax at the OTHER aisle — POV flipping the average oat-milk label as the saxophones swell, then cut to the calm 4-ingredient carton.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"New Engen · June 2026 TikTok Trends (saxophones are getting louder)", url:"https://newengen.com/insights/june-tiktok-trends/"},
      {label:"napoleoncat · Current TikTok Trends June 2026", url:"https://napoleoncat.com/blog/tiktok-trends/"}
    ]
  },
  {
    id:"CP-7",
    type:"MEME FORMAT",
    typeColor:"#73B2C9",
    hook:"Wabi-sabi — 'I like how mine's a little off-center' — is the celebrate-imperfection POV (~500K videos) 🍵",
    detail:"The wabi-sabi trend — sparked by a King of the Hill clip where Bobby Hill says 'I like how mine's a little off-center, it's got wabi-sabi' — has the audio in roughly half a million TikToks in 2026. Creators label everyday quirks and imperfections as their 'wabi-sabi,' a self-love counter to filtered perfection culture. The format is a soft, warm POV with the recognizable audio. (Wabi-sabi = finding beauty in the imperfect + handmade.)",
    velocity:"medium",
    willasPlay:"Reel: wabi-sabi the ingredient list — the off-center charm is that it's only 4 things, no lab-perfect additive deck. Warm, honest, real.",
    dnaMatch:"on-pack-checklist",
    sources:[
      {label:"Fast Company · TikTok asks: What's your wabi-sabi? (Jun 2026)", url:"https://www.fastcompany.com/91447044/tiktok-wabi-sabi-japan-king-of-the-hill"},
      {label:"Daily Dot · What the 'wabi-sabi' trend means on TikTok (Jun 2026)", url:"https://www.dailydot.com/culture/wabi-sabi-tiktok-trend/"}
    ]
  },
  {
    id:"CP-8",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"Japanese strawberries are the summer's most photogenic food trend — 28% YoY, 23M+ posts 🍓",
    detail:"Japanese strawberries (Oishii's Omakase varieties; Erewhon's ~$19 single Kyoto berry) are 2026's breakout food trend — 28% YoY growth, 23M+ social posts, 5.3M recipes per Tastewise — fueling layered cakes, minimalist desserts, and luxury-berry content all summer. The driver is visual perfection plus aspirational pricing that's screenshot bait. Clean dessert-format adjacency for any berry-forward, dairy-free summer build.",
    velocity:"medium",
    willasPlay:"Reel: ride berry-maxxing with a dairy-free strawberry-oat dessert or pour — let the real berry be the sweetness over a 1g-sugar whole-oat base.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"Tastewise · Viral Food Trends 2026 (Japanese strawberries +28% YoY, 23M+ posts)", url:"https://tastewise.io/blog/viral-food-trends"}
    ]
  },
  {
    id:"CP-9",
    type:"MISINFO WATCH",
    typeColor:"#DC2626",
    hook:"TikTok's 'oat milk spikes blood sugar like soda' warning gets fact-checked down to size 📉",
    detail:"The recurring TikTok claim that oat milk spikes blood sugar 'like soda' kept circulating into mid-June 2026, met by dietitian fact-checks (VegNews, MyFitnessPal): oat milk's GI of ~69 is moderate (high starts at 70), and the maltose formed in processing is moderated by fiber, protein and fat in the glass. PolitiFact previously rated the soda-equivalence claim false. The nuance the rebuttal opens: how the oat is processed determines the sugar.",
    velocity:"medium",
    willasPlay:"Reel: answer calmly — it's the processing, not the oat. Willa's keeps the whole oat groat (1g sugar), so the blood-sugar story is really a clean-label story.",
    dnaMatch:"mom-activist",
    sources:[
      {label:"VegNews · TikTok Is Warning People Off Oat Milk Because It's 'High-Glycemic,' But How Worried Should We Be?", url:"https://vegnews.com/tiktok-oat-milk-high-glycemic-worry"},
      {label:"MyFitnessPal · Is oat milk's glycemic index actually a problem? (2026)", url:"https://www.myfitnesspal.com/blog/oat-milk-glycemic-index/"}
    ]
  },
  {
    id:"CP-10",
    type:"MEME FORMAT",
    typeColor:"#73B2C9",
    hook:"Toy Story 5's childhood-to-adulthood carousels are staged to flood the FYP 🪀",
    detail:"Per New Engen's June 2026 report, Toy Story 5 is 'staged to wreck the FYP' with childhood-to-adulthood carousels — the then/now, 'what I grew up on vs. what I have now' format. It pairs with the broader nostalgia engine of the month ('90s-coded mom archetypes). The format is a swipe from a childhood artifact to its grown-up equivalent.",
    velocity:"medium",
    willasPlay:"Reel: then/now the chocolate milk — the sugar-bomb carton you grew up on, swiped to the clean one your kid grows up on. Heirloom, upgraded.",
    dnaMatch:"before-after-stitch",
    sources:[
      {label:"New Engen · June 2026 TikTok Trends (Toy Story 5 childhood-to-adulthood carousels)", url:"https://newengen.com/insights/june-tiktok-trends/"}
    ]
  },
  {
    id:"CP-11",
    type:"NEWS CYCLE",
    typeColor:"#DC8A4E",
    hook:"Father's Day Sunday closes the week — the every-year pancake breakfast dad and kid make together 🥞",
    detail:"Father's Day 2026 falls Sunday, Jun 21 — the latest the third-Sunday date can land — closing the refresh week. National Today and the brunch-recipe cycle (Food52, Food Network) lean heavy on overnight-oatmeal pancakes and shaped pancakes with in-season berries. It's a textbook morning-ritual, generational-pour moment: dad and kid drinking from the same carton, the pancake breakfast made every year.",
    velocity:"medium",
    willasPlay:"Reel: a Sunday-morning-pancakes beat where dad and kid pour from the same Willa's — no separate kids' version of the table needed.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"National Today · Father's Day — June 21, 2026", url:"https://nationaltoday.com/fathers-day/"},
      {label:"Food52 · Father's Day brunch recipes (Jun 2026)", url:"https://food52.com/recipes/fathers-day"}
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
  "JUN15-TT-1":"meme-payload",
  "JUN15-IG-R1":"mom-activist",
  "JUN15-IG-F2":"on-pack-checklist",
  "JUN15-IG-R2":"viral-recipe-remix",
  "JUN15-PIN-1":"at-shelf-moment",
  "JUN15-IG-R3":"meme-payload",
  "JUN15-TT-2":"mom-activist",
  "JUN15-TT-3":"meme-payload",
  "JUN15-IG-R4":"viral-recipe-remix",
  "JUN15-PIN-2":"at-shelf-moment",
  "JUN15-TT-4":"on-pack-checklist",
  "JUN15-TT-5":"before-after-stitch",
  "JUN15-IG-R5":"viral-recipe-remix",
  "JUN15-IG-F1":"before-after-stitch",
  "JUN15-PIN-3":"at-shelf-moment",
  "JUN15-TT-6":"kid-family-moment",
  "JUN15-IG-R6":"kid-family-moment"
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
  "JUN15-TT-1":{
    shoot:[
      "Hand casually flipping a generic 'Average Oat Milk' carton (anonymized — no real brand) to its long back label",
      "Push-in macro on a long ingredient list with a finger dragging down, each scary word framed for a zoom + text gloss",
      "The smash-cut moment: Willa's Original carton standing calm and centered, daylight flooding in",
      "Macro on Willa's Original back label, finger tracing the four clean lines, held one quiet beat",
      "Calm closing pour into a glass with the Willa's Original carton in soft focus behind"
    ],
    found:[
      "Trend reference (New Engen): https://newengen.com/insights/june-tiktok-trends/ — 'saxophones are getting louder' format breakdown + why it's peaking",
      "Trend reference (napoleoncat): https://napoleoncat.com/blog/tiktok-trends/ — current June TikTok trends roundup with the sax format examples to match for cut timing"
    ],
    memes:[
      "The 'saxophones are getting louder' doom-meter format itself — mundane setup, sax swell, dread payoff. Willa's flips the dread onto the OTHER carton and resolves it with silence instead of disaster."
    ],
    archive:[
      "Reuse any existing Willa's Original back-label / four-ingredient close-up B-roll for the calm payoff cut",
      "Pull a prior calm-pour cutaway for the end card"
    ]
  },
  "JUN15-IG-R1":{
    shoot:[
      "Christina at a sunlit counter, calm and unhurried, turning the Willa's Original carton label-out to camera",
      "Slow macro push across the four-line ingredient list, each line catching morning light",
      "Creamy whole-oat pour into a glass in warm light (background, soft focus)",
      "Macro on the 'certified glyphosate-free' line of the carton",
      "Christina setting the carton down, one calm beat to camera — the four-ingredient label held for the end card"
    ],
    found:[
      "Trend reference (legal analysis): Davis Wright Tremaine on New York's GRAS-disclosure bill — https://www.dwt.com/insights/2026/06/new-york-gras-food-ingredient-disclosure-bill — context for the 'self-affirmed GRAS / publish the safety report' framing (internal grounding only, not cited on screen)",
      "Trend reference (advocacy): CSPI food chemical safety hub — https://www.cspinet.org/protecting-our-food-system/food-chemical-safety — background on the disclosure + Red Dye 3 / bromate / propylparaben provisions"
    ],
    memes:[
      "No meme overlay — this is a calm-authority founder beat, Patagonia gravity. The restraint IS the format; a meme template would undercut the stance."
    ],
    archive:[
      "Pull existing Willa's on-pack-checklist B-roll of the Original four-ingredient label for the macro cutaways",
      "Reuse any prior calm morning-kitchen pour footage for the background glass-pour beat"
    ]
  },
  "JUN15-IG-F2":{
    shoot:[
      "Cover card: Willa's Original carton standing in raking daylight against a flat health-blue color block, room for big headline overlay",
      "Back-label still: the four-ingredient list simply legible in soft light — carton sitting, NOT being flipped/audited",
      "Creamy whole-oat pour into a clear glass against the cream/blue palette — proof-of-richness cutaway",
      "Flat-lay of the carton beside a small bowl of whole oat groats (the 'whole oat, not syrup' visual gloss)"
    ],
    found:[
      "Category-context reference (trade): https://foodinstitute.com/focus/oat-milk-is-gaining-considerable-ground-in-the-plant-based-milk-category/ — the 'whole ingredients + protein are the differentiators brands are chasing' framing (internal grounding only, do NOT cite the stat in consumer copy, and do NOT frame as 'category caught up to us')",
      "Category-context reference (trade): https://www.foodnavigator-usa.com/Article/2025/12/17/whole-ingredients-protein-boosts-plant-based-milk-trends-for-2026/ — the 2026 'whole ingredients + protein boosts' trend, internal why-now only"
    ],
    memes:"Static carousel → skip memes",
    archive:[
      "Pull existing Willa's on-pack-checklist back-label footage for the legible four-ingredient still card",
      "Reuse any prior whole-oat-groat-in-a-bowl B-roll for the 'whole oat, not syrup' gloss card"
    ]
  },
  "JUN15-IG-R2":{
    shoot:[
      "Close-up: espresso shot pouring into iced lemonade and feathering down — the milk-free 'before'",
      "Tactile build cuts: ice tumbling in, lemonade pouring over, espresso clouding into the glass",
      "HERO macro slow-motion: Willa's Barista pour blooming into an oat-white cloud through the amber, carton label readable behind",
      "Finished layered glass with lemon slice on the rim, beauty tilt (no face)",
      "Barista carton turned to label, finger tapping 'no rapeseed oil'"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/espressolemonade — top espresso-lemonade build videos for format style + pour-timing the creamy layer answers",
      "Trend reference (press): https://www.nestleusa.com/media/pressreleases/nescafe-espresso-lemonade — the packaged-kit moment Willa's is racing the creamy upgrade against"
    ],
    memes:[
      "The 'wait, add oat milk' reply wave under espresso-lemonade build videos — the creamy-counterpart question the format keeps asking is exactly the gap Willa's fills"
    ],
    archive:[
      "Pull any prior Willa's Barista cold-pour / cloud-bloom B-roll for the hero-pour cutaway",
      "Reuse the Barista carton label close-up ('no rapeseed oil') from existing on-pack-checklist footage"
    ]
  },
  "JUN15-PIN-1":{
    shoot:[
      "Hero: tall clear glass of iced matcha, slow Willa's Barista pour cascading through the green into a marbled cream-and-jade swirl, raking late-morning light",
      "Detail: bamboo whisk on a ceramic dish, loose matcha grains, pale linen, one stem of greenery",
      "3/4 angle: Willa's Barista carton standing in soft focus behind the glass, the calm anchor of the frame",
      "Macro: condensation on the glass + the moment the cream ribbon hits the matcha"
    ],
    found:"Trend reference: Fresh Cup · The Matcha Boom Is Reshaping Cafes (Jun 2026) — https://freshcup.com/the-matcha-boom-is-reshaping-cafes-how-long-before-it-hits-a-wall/ — pull composition + scarcity context only, no clip lift. Tenzo Matcha's IG grid for the calm, ingredient-transparent still styling Willa's is matching.",
    memes:"Static editorial pin → skip memes",
    archive:[
      "Slow-living + tea-ceremony stills for the calm, intentional pour mood",
      "Vintage editorial beverage photography for the warm jade-and-cream color story"
    ]
  },
  "JUN15-IG-R3":{
    shoot:[
      "Overhead: phone face-up with a cluttered wellness app (sleep score, HRV graph, rings) + smart ring + macro notebook, warm daylight — the 'tracked' before",
      "Hand calmly turning the phone face-DOWN and sliding the tracking gear out of frame",
      "Real-time slow pour of Willa's Original into a clear glass, light catching the stream, carton in soft focus behind",
      "Wide calm beat: full glass + carton in the light beside the face-down phone, a hand resting easy on the counter",
      "Closer: glass set down beside the face-down phone — calm chosen over the scroll"
    ],
    found:[
      "Trend reference (article): https://www.integrativenutrition.com/blog/over-optimization-backlash-wellness-2026 — the Over-Optimization Backlash explainer Willa's is embodying (the 'meaning over metrics' mood)",
      "Trend reference (report): https://www.globalwellnesssummit.com/trends/ — Global Wellness Summit 2026 Trends Report naming the backlash, for the cultural why-now"
    ],
    memes:[
      "The 'things i don't track' / 'fed not tracked' relatable-confession format peaking in the wellness-fatigue conversation — the face-down-phone exhale beat is the share trigger (Pattern 03)"
    ],
    archive:[
      "Pull any prior Willa's slow-pour B-roll for the real-time hero pour",
      "Reuse warm-kitchen / morning-light B-roll from existing calm-morning footage (no label close-ups)"
    ]
  },
  "JUN15-TT-2":{
    shoot:[
      "Close-up: phone propped against the carton showing a paused alarmist 'oat milk = soda' style frame, then a hand calmly turning it face-down",
      "Warm hero of the Willa's Original carton in morning light with a sweating glass beside it",
      "The mechanism beat: real oat groats pouring into a small bowl ('whole oat' side) vs a plain glass ('average oat milk' side)",
      "Hero slow-motion pour of Willa's Original into a glass, thick + creamy, carton in soft focus behind",
      "Original 4-ingredient label held to camera, finger tracing the four lines"
    ],
    found:[
      "Trend reference (article): VegNews · oat milk 'high-glycemic' fact-check — https://vegnews.com/tiktok-oat-milk-high-glycemic-worry — the dietitian rebuttal Willa's is calmly echoing",
      "Trend reference (article): MyFitnessPal · is oat milk's glycemic index actually a problem? (2026) — https://www.myfitnesspal.com/blog/oat-milk-glycemic-index/ — moderate-GI framing + the fiber/protein-slows-it nuance"
    ],
    memes:[
      "The 'calm-down-it's-fine' reaction register — answering an alarmist FoodTok claim with deliberate, lower-tempo authority. Willa's enters the conversation as the steady voice, not another panic clip."
    ],
    archive:[
      "Pull any prior Willa's whole-groat / steel-cut-oats macro B-roll for the 'whole oat' mechanism side",
      "Reuse the Original carton 4-ingredient-label close-up from existing on-pack-checklist footage"
    ]
  },
  "JUN15-TT-3":{
    shoot:[
      "Cool/cluttered open: protein tub + shaker + scoop frozen mid-pour into an overfull chalky glass — the 'loud' before",
      "Hand sweeping the powder clutter out of frame as the lighting warms — the loud-to-calm transition in one move",
      "Slow whole-oat pour into a single clean glass, Willa's Original carton standing tall in soft focus behind",
      "Original four-ingredient label held calm to camera, finger resting (not frantically tracing) the four lines",
      "Final still: glass + carton in warm light, one unceremonious sip, no face"
    ],
    found:[
      "Trend reference (article): https://medicotrick.com/blog/the-2026-protein-craze-is-real — the dietitian overconsumption critique Willa's is calmly answering (T-6)",
      "Trend reference (TikTok): https://www.tiktok.com/tag/proteinmaxxing — top scoop-stacking + shaker videos for the format energy Willa's under-reacts to (pull tone only, no clip lift)"
    ],
    memes:[
      "The 'pov: the math is mathing' text-overlay format — Willa's drops the protein-number payload into the dry, knowing version of it (Pattern 10 wordplay over a quiet visual)"
    ],
    archive:[
      "Pull any prior Willa's slow-pour B-roll for the calm hero-pour cutaway",
      "Reuse the Original four-ingredient-label close-up from existing on-pack-checklist footage"
    ]
  },
  "JUN15-IG-R4":{
    shoot:[
      "Overhead: finished confetti cold-foam latte, sprinkles mid-scatter, warm daylight — the 'after' hero",
      "Hand sweeping a heavy-cream carton + birthday-cake creamer bottle out of frame, swapping in Willa's Kids + a handheld frother",
      "Willa's Kids cascading into the frother cup; foam climbing to a glossy peak",
      "Close-up slow spoon-drag across the cold foam — the ASMR money shot",
      "Slow-motion sprinkle pour: rainbow nonpareils raining over the foam",
      "Close on the Kids carton's 8g-protein + top-9-allergen-free callout held to camera"
    ],
    found:[
      "Trend reference (Reel/TikTok): Tomatoes Tomahtos 'Viral Dot Cake Iced Latte' (Jun 11, 2026) — https://tomatoestomahtos.com/2026/06/11/viral-dot-cake-iced-latte/ — the exact confetti cold-foam format Willa's is rebuilding dairy-free",
      "Trend reference (TikTok): search #dotcakelatte + #confettilatte for the spoon-drag + sprinkle-pour shot structure creators are matching"
    ],
    memes:[
      "The confetti-ASMR comment energy under the dot-cake format — 'the spoon-drag', 'the sprinkle pour' — is the exact craving Willa's enters with the clean foam answer"
    ],
    archive:[
      "Pull any prior Willa's cold-foam / frother B-roll for the foam-peak + spoon-drag cutaways",
      "Reuse the Kids carton 8g-protein + allergen-free callout close-up from existing on-pack footage"
    ]
  },
  "JUN15-PIN-2":{
    shoot:[
      "Hero 3/4 angle: tall glass of tropical iced coffee, espresso ribboning through a creamy whole-oat pour, Willa's Barista carton standing just behind in raking late-morning light",
      "Macro: coconut-cream cloud + real coconut curl settling on top, condensation beading on the glass",
      "Detail: the Barista carton readable for one beat beside a small dish of toasted coconut + tropical leaf shadow",
      "Overhead: full home-cafe vignette — glass, carton, moka pot/cold-brew jar, linen, the carton as calm anchor"
    ],
    found:[
      "Trend reference: Summer 2026 coffee-shop trend forecast naming coconut the dairy-free champion + tropical iced builds (https://pro.dilworthcoffee.com/blogs/news/summer-sips-leveraging-2026-s-biggest-drink-trends-for-coffee-shops) — pull composition + color cues only, no clip lift",
      "Trend reference: QSR Magazine summer tropical-drink launch context (https://www.qsrmagazine.com/uncategorized/luckin-coffee-launches-new-orange-c-series-of-summer-drinks/) — for the 'tropical iced coffee is the season' framing"
    ],
    memes:"Static editorial pin → skip memes",
    archive:[
      "Vintage tropical-drink + tiki-bar editorial photography for warm golden styling reference (no kitsch — pull the light, not the gimmick)",
      "Mid-century summer-entertaining stills for the sunlit home-cafe mood"
    ]
  },
  "JUN15-TT-4":{
    shoot:[
      "Close-up: hand turning Willa's Original to the back label, finger landing on the four-line ingredient list with empty space below",
      "Macro: finger tracing each of the four lines, then stopping — the 'wait, that's it?' beat",
      "Tactile warmth: glass of Willa's over ice with condensation, a single oat groat on pale wood, slightly-imperfect ceramics in frame",
      "Mocked-up 'Average Oat Milk' label as a dense wall of fine print (no real brand) for the fast contrast cut",
      "Final: the four-ingredient label held square to camera, finger resting under the last line"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/wabisabi — top videos using the Bobby Hill 'a little off-center' audio for format + pacing",
      "Trend context (Fast Company): https://www.fastcompany.com/91447044/tiktok-wabi-sabi-japan-king-of-the-hill — origin of the audio + how creators are labeling their 'wabi-sabi'",
      "Trend context (Daily Dot): https://www.dailydot.com/culture/wabi-sabi-tiktok-trend/ — what the trend means + the soft self-love framing Willa's is matching"
    ],
    memes:[
      "The 'what's your wabi-sabi?' self-identification wave under the King of the Hill audio — Willa's enters by pointing the format at the ingredient list instead of a personal quirk, keeping the warm-not-self-deprecating tone"
    ],
    archive:[
      "Pull any prior Willa's back-label / ingredient-list close-up from existing on-pack-checklist footage",
      "Reuse a slow oat-milk pour + condensation cutaway from the recipe B-roll library for THE WHY beat"
    ]
  },
  "JUN15-TT-5":{
    shoot:[
      "Overhead: hand thumb-scrolling a blurred, illegible brand-chatter feed — cool grade, jittery cuts (the 'before')",
      "Hand setting the phone face-down on a warm wood counter, then reaching past it for the Willa's Original carton",
      "Whole-oat pour: Original cascading thick + creamy into a clean glass, carton front-of-label in soft focus behind",
      "Unhurried sip (no face), glass set down easy on the warm counter",
      "Full glass beside the carton, both held steady in golden light for one full beat (end card)"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/wabisabi — the 'I just like mine simple / off-center' confession-POV register Willa's borrows for the calm 'after' (King of the Hill audio wave, ~500K videos)",
      "Format reference (TikTok): https://www.tiktok.com/tag/romanticizeyourlife — slow golden-light pour + ritual videos for the calm 'after' pacing + overlay style"
    ],
    memes:[
      "The over-optimization / 'I muted the discourse' confession wave — the 'me too, I tuned it out' comment energy Willa's enters with the calm creamy pour"
    ],
    archive:[
      "Pull any prior Willa's front-of-carton + whole-oat pour B-roll for the act-two calm reveal",
      "Reuse existing golden-light kitchen pour footage for the unhurried act-two pacing"
    ]
  },
  "JUN15-IG-R5":{
    shoot:[
      "Overhead: a single luxury strawberry on a tiny pedestal beside an absurd price tag — the precious 'before' gimmick — then a humble bowl of ordinary sliced berries set beside it",
      "Glossy real-cacao chocolate-oat pour cascading over chia into a clear glass, Willa's Chocolate carton standing behind",
      "Sliced strawberries pressed flat against the inside of the glass in stacked rings, parfait cross-section building",
      "Whipped coconut cream cloud spooned on top + cacao nibs scattered; hero push-in on the finished layered glass in raking light",
      "Spoon dragging slowly down through the layers (ASMR), then the Chocolate 5-ingredient label held to camera, finger tracing 'organic cacao powder'"
    ],
    found:[
      "Trend reference (article): https://sporked.com/article/why-is-everyone-talking-about-japanese-strawberries/ — the luxury-berry / berry-maxxing context Willa's is rebuilding clean (Jun 2, 2026)",
      "Trend reference (TikTok): search #strawberrytok + layered-berry-dessert builds for the parfait-cross-section styling the format rewards"
    ],
    memes:[
      "The gatekeep-the-$19-berry vs. just-use-regular-strawberries energy — Willa's enters with the humble-berry-rebuilt-beautiful flex, no sneer"
    ],
    archive:[
      "Pull any prior Willa's Chocolate pour B-roll for the glossy base cutaway",
      "Reuse the Chocolate 5-ingredient-label close-up from existing on-pack-checklist footage"
    ]
  },
  "JUN15-IG-F1":{
    shoot:[
      "Cover: full Willa's lineup (Original front, Kids + Chocolate + Barista fanned behind) on a sunlit farmers-market-style table among unbranded small-batch pantry goods — peer-set energy, no competitor logos",
      "Wide: several hands setting unbranded small-batch goods + a Willa's carton on the same table — the 'founder-led cohort' card",
      "Macro: organic whole oat groats in a hand + the Willa's carton beside the goods — the 'short, honest carton' card",
      "Two clean quote-card layouts with large hand-set quotation marks for the real-buyer lines",
      "Closing lineup shot with soft serif end line overlaid"
    ],
    found:[
      "Peer-set context: Specialty Food Association · 2026 small-crafter class named Jun 2, 2026 — use as internal context for the founder-led-cohort framing only; do NOT claim or reference any Willa's award on this surface, and do NOT use a blind-taste / judging-panel framing (rested lanes)",
      "Cohort styling reference: small-batch founder-led pantry-brand flat-lays — farmers-market / butcher-paper aesthetic, no competitor logos in frame"
    ],
    memes:"Static carousel → skip memes",
    archive:[
      "Pull real Willa's customer comments / DMs / reviews to source the two fan-quote headline lines (use genuine buyer language, verbatim where possible)",
      "Reuse any existing Willa's lineup + at-shelf carton stills for the cover + close cards"
    ]
  },
  "JUN15-PIN-3":{
    shoot:[
      "3/4 angle: Willa's Original carton standing on a pale morning counter, late-morning light raking across it, glass of oat milk over ice beside it",
      "Detail: phone resting face-up with a glowing paused-playlist screen (no logos), composed into the frame as the 'soundtrack' cue",
      "Macro: condensation on the iced glass, linen + warm wood + a small bowl of berries for the spread",
      "The four-ingredient label readable for one beat beside the morning spread"
    ],
    found:"Trend reference: lyric-overlay carousel format spiking around the third-album drop (CP-5) — https://www.tiktok.com/tag/lyricoverlay for the warm hand-set typography + album-cover composition cues. Pull styling only, no clip lift, no lyric copied.",
    memes:"Static editorial pin → skip memes",
    archive:[
      "Vintage album-cover photography + liner-note typography for the warm, hand-set lyric-overlay styling reference",
      "Mid-century sunlit-kitchen + morning-still stills for the warm set-counter editorial mood (Prelinger Archive home-economics reels)"
    ]
  },
  "JUN15-TT-6":{
    shoot:[
      "POV over the counter: hands fanning out three 'quiz answer' cards, multiple-choice graphic style",
      "Hand sweeping the three archetype cards aside and laying down the fourth 'oat mom' card with the Kids carton behind it",
      "Tactile pour: kid's cup held out, Willa's Kids cascading in creamy + chocolatey, carton in soft focus",
      "Small kid hand reaching for the filled cup — the real family-moment beat",
      "Carton flip front-to-back, finger resting by the clean label for one beat"
    ],
    found:[
      "Trend reference (Newsweek): https://www.newsweek.com/what-is-butter-mom-gen-z-latest-90s-aesthetic-11793246 — butter-mom archetype framing + '90s aesthetic context for matching the look",
      "Trend reference (AOL): https://www.aol.com/gummy-bear-mom-trend-explained.html — gummy-bear-mom 'most realistic archetype' framing the quiz-POV is built on",
      "Trend reference (TikTok): search the mom-quiz / 'what kind of mom are you' self-ID POV format for the exact card-reveal cadence + on-screen-text style"
    ],
    memes:[
      "The almond-mom / butter-mom / gummy-bear-mom self-identification quiz stitch wave — Willa's enters by ADDING the fourth answer (oat mom), not by ranking or roasting the existing three"
    ],
    archive:[
      "Pull existing Willa's Kids pour + kid-reaching-for-cup B-roll for the family-moment cutaways",
      "Reuse the Kids carton clean-label flip from prior on-pack footage for the label beat"
    ]
  },
  "JUN15-IG-R6":{
    shoot:[
      "Two sets of hands (Christina + a kid) sharing one mixing bowl in low warm window light — faces soft / in profile, hands-forward",
      "Hero double-pour: one continuous tilt of the Willa's Kids carton into a short kid's glass, then a tall coffee mug, same motion",
      "Griddle tactile: batter poured, blueberries pressed in, slow-motion first flip, stack building taller",
      "Two glasses (short + tall) clinking soft, kid's hand + adult's hand, Kids carton in soft focus behind",
      "Kids carton label turned to camera for one beat — simple ingredient line readable"
    ],
    found:[
      "Trend reference (calendar + format): https://nationaltoday.com/fathers-day/ — Father's Day Jun 21, 2026 framing; the Father's Day pancake-breakfast occasion the Reel rides",
      "Trend reference (recipe format): https://food52.com/recipes/fathers-day — Father's Day brunch + oat-pancake recipe styling cues for the griddle beats"
    ],
    memes:[
      "No meme lift — this is a warm kid-family-moment beat, not a format-stitch. The 'no separate kids' version' double-pour visual IS the payload; keep it tender, skip the meme layer."
    ],
    archive:[
      "Vintage home-kitchen + weekend-breakfast b-roll for the warm, lo-fi morning mood (Prelinger Archive home-life reels)",
      "Pull any existing Willa's morning-pour / kitchen B-roll for the double-pour cutaway"
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
const WELCOME_WEEK_KEY = "JUN-15-2026";
const WELCOME_WEEK_RANGE = "JUN 15 – JUN 21, 2026";
const WELCOME_REFRESHED = "JUN 14, 2026";

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
  pullQuote:"the shelf is being told to show its work — and the feed's finally tired of optimizing breakfast. good week to be four honest ingredients.",
  the_moves:[
    {kind:"ship", verb:"Open the week with the \"four lines, no homework\" calm-authority founder Reel.", why:"A state is moving to force the shelf to publish the safety report behind every self-affirmed ingredient. We don't react to the headline — we lead with the answer: four ingredients, nothing self-affirmed, nothing to file. Patagonia gravity, founder on camera, news as backdrop. Ship Wed Jun 17, 12pm."},
    {kind:"ship", verb:"Aim the doom-sax at the OTHER carton with the \"saxophones are for the other oat milk\" TikTok.", why:"June's most-used TikTok format is the swelling-saxophone doom meter. We point it at the average back label — gums, oils, oat syrup as the sax climbs — then cut the music dead on the calm 4-ingredient carton. The format carries the reach; the short list is the punchline. TikTok Wed Jun 17, 9am."},
    {kind:"ship", verb:"Close the week on Father's Day with \"one pour for the both of them.\"", why:"The latest-possible Father's Day lands Sunday Jun 21. A dad-and-kid pancake morning where both pour from the same carton — no separate kids' table. Heritage warmth, brand 'we,' the every-year ritual. IG Reel Sun Jun 21, 12pm."},
    {kind:"hold", verb:"Keep the blood-sugar correction calm — it's the processing, not the oat.", why:"A 'oat milk spikes blood sugar like soda' video keeps recirculating. We answer matter-of-factly: most oat milks turn the starch into sugar; Willa's keeps the whole groat at 1g. Kiki-Milk confidence, gloss the maltose mechanism in one line, never strident."},
    {kind:"hold", verb:"Let the espresso-lemonade remix own the dairy-free lane before the chains do.", why:"The 91M-post espresso-lemonade format is tart and naturally milk-free — which means it's missing a creamy counterpart. We pour a whole-oat Barista layer over the top, no rapeseed, no chain sugar load. The pour is the hero, house recipe-video convention."}
  ]
};


const WELCOME_HIGHLIGHTS = [
  {
    stat:"first-state bill",
    label:"a transparency law would force the shelf to show its safety homework",
    detail:"A bill on the Governor's desk would make New York the first state to require food companies to publish the scientific safety report behind any self-affirmed 'GRAS' ingredient — the loophole that lets a company declare its own additive safe without showing the work — and ban Red Dye 3, potassium bromate, and propylparaben. our move: lead with the answer, not the news — a 4-ingredient label has nothing self-affirmed to disclose. Calm founder authority, the carton as the lead.",
    color:"#73B2C9",
    icon:"⚖️",
    glyph:"⚖️",
    kindLabel:"Policy Signal",
    sources:[
      {label:"Davis Wright Tremaine · Another Patch in the Quilt? New York Legislature Passes GRAS Reform Bill (Jun 8, 2026)", url:"https://www.dwt.com/insights/2026/06/new-york-gras-food-ingredient-disclosure-bill"},
      {label:"CSPI · New York GRAS reform + food chemical disclosure (Jun 2026)", url:"https://www.cspinet.org/protecting-our-food-system/food-chemical-safety"}
    ]
  },
  {
    stat:"$10.68B by 2034",
    label:"the category is finally chasing whole ingredients and more protein",
    detail:"Oat milk is the fastest-growing plant-milk lane — projected to nearly triple to $10.68B by 2034 as plant milk reaches ~16% of U.S. retail milk dollars — and the 2026 story brands are racing toward is 'whole ingredients + protein boosts.' our move: a confident category-POV carousel that reads the carton card-by-card — what the category now wants vs. what's been on the label since day one. The whole-oat thesis was never a pivot.",
    color:"#75C596",
    icon:"📈",
    glyph:"📈",
    kindLabel:"Category Signal",
    sources:[
      {label:"The Food Institute · Oat Milk Is Gaining Considerable Ground in the Plant-Based Milk Category (Jun 2026)", url:"https://foodinstitute.com/focus/oat-milk-is-gaining-considerable-ground-in-the-plant-based-milk-category/"}
    ]
  },
  {
    stat:"91M+ posts",
    label:"summer's tart espresso-lemonade format is missing its creamy half",
    detail:"The iced-espresso-over-lemonade combo has crossed 91M+ posts and tipped from creator hack into a packaged kit timed to the first day of summer — naturally dairy-free, tart, caffeinated, seconds to make. The open lane: the no-milk format still wants a creamy counterpart. our move: own the dairy-free remix before the chains do — a whole-oat Barista layer poured over the tart base, no rapeseed, no chain sugar load, the pour as the hero shot.",
    color:"#75C596",
    icon:"🍋",
    glyph:"🍋",
    kindLabel:"Viral Recipe",
    sources:[
      {label:"Nestle USA · NESCAFE Redefines Classic Summer Drink with Espresso Lemonade Hack (Jun 2026)", url:"https://www.nestleusa.com/media/pressreleases/nescafe-espresso-lemonade"},
      {label:"TikTok · #EspressoLemonade hashtag hub", url:"https://www.tiktok.com/tag/espressolemonade"}
    ]
  },
  {
    stat:"defining 2026 trend",
    label:"culture is turning from optimization scores back to real food",
    detail:"The Global Wellness Summit named the 'Over-Optimization Backlash' the defining trend of the year, and June coverage shows it cresting — after a decade of sleep scores, HRV tracking and cold plunges, the mood has flipped to meaning over metrics, abundance over restriction. our move: a fed-not-tracked confession Reel that answers optimization fatigue with breakfast that needs no app, no score, no reading — just real food and a quiet morning. Willa's lives exactly where culture is heading.",
    color:"#9E652E",
    icon:"🌿",
    glyph:"🌿",
    kindLabel:"Wellness Signal",
    sources:[
      {label:"Integrative Nutrition · The Over-Optimization Backlash: Why the Wellness World Is Coming Back to What Actually Works (2026)", url:"https://www.integrativenutrition.com/blog/over-optimization-backlash-wellness-2026"},
      {label:"Global Wellness Summit · 2026 Trends Report", url:"https://www.globalwellnesssummit.com/trends/"}
    ]
  },
  {
    stat:"fourth answer",
    label:"the '90s mom-quiz wave needs an option nobody's named yet",
    detail:"A trio of '90s-coded parenting archetypes — almond mom (restriction), butter mom (real-ingredient comfort), and gummy bear mom (treats allowed, balance over perfection) — is the defining mom-identity meme of June, running as a self-identification quiz POV that drives stitch volume. our move: there's a fourth answer to the quiz, the oat mom — real ingredients, zero restriction, treats that read clean. Embody it in brand 'we' voice, never satirize the others.",
    color:"#A191B2",
    icon:"🌾",
    glyph:"🌾",
    kindLabel:"Cultural Conversation",
    sources:[
      {label:"Newsweek · What is a 'butter mom'? Gen Z's latest '90s aesthetic (Jun 2026)", url:"https://www.newsweek.com/what-is-butter-mom-gen-z-latest-90s-aesthetic-11793246"},
      {label:"AOL · What is a 'Gummy Bear Mom' — and how do you know if you are one (Jun 2026)", url:"https://www.aol.com/gummy-bear-mom-trend-explained.html"}
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
                <div key={i} className="flex items-start gap-3.5 p-4 rounded-lg border border-[var(--border)] bg-[#FAFAF7]">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[19px] shrink-0" style={{background:h.color+"14"}}>{h.glyph||h.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase" style={{color:h.color}}>{h.kindLabel||"Signal"}</span>
                      <span className="font-mono text-[9.5px] tracking-wider text-[var(--muted)] shrink-0">{h.stat}</span>
                    </div>
                    <div className="mb-1">
                      <span className="text-[15.5px] text-[#202A44] font-semibold leading-snug">{h.label}</span>
                    </div>
                    <p className="text-[13.5px] text-[#3F4A5E] leading-relaxed">{h.detail}</p>
                    {h.sources && h.sources.length>0 && (
                      <div className="mt-1.5 flex flex-wrap gap-x-2">
                        {h.sources.map((s,k)=>(
                          <a key={k} href={s.url} target="_blank" rel="noreferrer" title={s.label} className="src-link font-mono text-[10px] tracking-wide">{sourceDomain(s.url)}</a>
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
                  <div key={i} className="flex items-start gap-3.5 p-4 rounded-lg border bg-white" style={{borderColor:hold?"#E2DDCF":"#E8E1C2", borderLeftWidth:"4px", borderLeftColor:hold?"#64748B":"#4E8C63"}}>
                    <div className="shrink-0 font-serif text-[20px] leading-none mt-0.5" style={{color:hold?"#64748B":"#4E8C63"}}>{hold?"✋":String(i+1).padStart(2,"0")}</div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[15.5px] text-[#202A44] font-semibold leading-snug mb-1">{(m&&m.verb)||m}</div>
                      {m&&m.why && <p className="text-[13.5px] text-[#3F4A5E] leading-relaxed">{m.why}</p>}
                    </div>
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
  "A state is about to force the shelf to publish the safety report behind every self-affirmed ingredient — how hard do we lean on our four-line label without sounding alarmist?",
  "The 'oat milk spikes blood sugar like soda' video is back — what's the calmest way to say it's the processing, not the oat, without getting defensive?",
  "There's a whole '90s mom-quiz wave — almond mom, butter mom, gummy bear mom — what's the cleanest way to claim the fourth answer, the oat mom, without making fun of the others?",
  "Tart espresso-lemonade is everywhere and it's missing a creamy half — how do we own the dairy-free remix before the chains package it?"
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
