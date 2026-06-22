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
    trend:"RFK Jr. signals a red/yellow/green front-of-pack label is coming — judge a food at a glance, no flipping required 🚦",
    detail:"On Jun 16, 2026 RFK Jr. told the produce sector the FDA's ultra-processed-food definition is awaiting White House sign-off and a color-coded front-of-pack label (red/yellow/green) is the next move — 'fruits and vegetables would get a green light' — with final publication expected over the next couple of months. The whole premise is letting shoppers judge a food at a glance without reading the back. It's a distinct mechanism from the GRAS-disclosure fight: a new consumer-facing label, not hidden-ingredient disclosure.",
    platform:"Trade + policy press",
    views:"National policy-press cycle",
    velocity:"high",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    healthSubAngle:"IMMUNE",
    angle:"A green-light-at-a-glance label is the regulator validating Willa's whole pitch. Make a calm authority Reel: a 4-ingredient carton reads green before you flip it.",
    urgency:"RIDE NOW",
    sources:[
      {label:"FoodNavigator USA · Kennedy signals new course for food labels as FDA nears UPF definition (Jun 16, 2026)", url:"https://www.foodnavigator-usa.com/Article/2026/06/16/fda-ultra-processed-food-definition-could-reshape-front-of-pack-labels/"},
      {label:"Agri-Pulse · Kennedy: defining ultra-processed foods is first step toward reshaping Americans' diets (mid-Jun 2026)", url:"https://www.agri-pulse.com/articles/24812-kennedy-defining-ultra-processed-foods-is-first-step-toward-reshaping-americans-diets"}
    ]
  },
  {
    id:"T-2",
    trend:"School lunch lines open to plant milk — a parent's note, not a doctor's, now qualifies a dairy-free pour for 30M kids 🏫",
    detail:"The Whole Milk for Healthy Kids Act, signed into law Jan 14, 2026, for the first time lets schools serve nutritionally-equivalent non-dairy milk as a standard menu option and lets a parent's note (not a physician's) qualify a child for a dairy-free pour, reaching roughly 30 million students. The open question for parents at pickup is which carton is actually clean enough to send.",
    platform:"Policy + plant-based trade press",
    views:"National school-nutrition policy",
    velocity:"medium",
    pillars:[
      "PARENTING",
      "HEALTH/WELLNESS"
    ],
    angle:"The cafeteria finally has a plant-milk slot. Make a PARENTING Reel that answers 'which one would I actually send' with Willa's Kids — 8g protein, allergen-free, Yuka 100.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Plant Based News · US Senate votes to give school kids access to plant-based milk (school-lunch law explainer)", url:"https://plantbasednews.org/culture/law-and-politics/senate-school-kids-plant-based-milk/"},
      {label:"Plant Based Foods Association · Policy win: new law expands student access to plant-based milks", url:"https://plantbasedfoods.org/latest/senate-passes-legislation-increase-plant-based-milk-in-schools"}
    ]
  },
  {
    id:"T-3",
    trend:"Oat milk is quietly becoming the default cafe pour — no upcharge, no asking 🥛",
    detail:"A peer-reviewed 2026 study found making oat milk the default option at a campus cafe pushed plant-based milk use from 16.6% to 51.9% and cut per-drink milk carbon footprint 25-34%. Chains are following — Peet's dropped its US plant-milk upcharge in mid-2025; Blue Bottle, Stumptown and Blank Street now pour oat as the default in some stores. The barista lane is no longer the exception, it's the structural default.",
    platform:"Coffee trade press + academic study",
    views:"Coffee-channel category shift",
    velocity:"medium",
    pillars:[
      "INGREDIENTS/RECIPES"
    ],
    angle:"If the cafe now defaults to oat, the upgrade is the carton you keep at home. Make a Barista home-pour Reel: same gorgeous build, 50% less sugar, no rapeseed.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Barista Magazine · Is Anyone Still Charging Extra for Alt Milk in 2026?", url:"https://www.baristamagazine.com/is-anyone-still-charging-extra-for-alt-milk-in-2026/"},
      {label:"Blue Bottle Coffee · Oat Milk Now the Default in US Cafes", url:"https://blog.bluebottlecoffee.com/posts/oat-milk-by-default"}
    ]
  },
  {
    id:"T-4",
    trend:"California's Assembly passes a first-in-the-nation 'Non-Ultraprocessed Certified' seal — and most of the milk aisle won't qualify ✅",
    detail:"The California State Assembly passed AB 2244 (Assemblymember Jesse Gabriel), creating a first-in-the-nation state certification with a standardized 'Non-Ultraprocessed Certified' label; products classified as UPF under state law would be barred from carrying it, with third-party certifiers accredited by mid-2028. It's the clearest sign yet that 'ultra-processed' is becoming a line drawn ON the package — surfaced in the Jun 15 DLA Piper food-law roundup.",
    platform:"Trade + legal press",
    views:"State certification + labeling cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"A 'not-ultra-processed' seal is being built for cartons like Willa's — whole oat groat, no isolates, no gums. Make a confident read-the-label Reel that leads with the carton, not the bill.",
    urgency:"THIS WEEK",
    sources:[
      {label:"DLA Piper · Food and Beverage News and Trends (Jun 15, 2026 roundup)", url:"https://www.dlapiper.com/en-us/insights/publications/food-and-beverage-news-and-trends/2026/food-and-beverage-news-and-trends-june-12-2026"}
    ]
  },
  {
    id:"T-5",
    trend:"States, not the FDA, are now the front line on food chemicals — there's a live map of who's cleaning up the supply 🗺️",
    detail:"EWG's interactive map (refreshed June 2026) tracks 30+ states that have introduced legislation to ban or regulate food dyes, heavy metals and other chemicals of concern; bills targeting school food are moving in Vermont, Indiana, Iowa, New Jersey and New York, with Arizona, California, Louisiana, Tennessee, Texas, Utah, Virginia and West Virginia already protecting kids from chemicals in school meals. The center of gravity on food safety has shifted from the agency to the statehouse.",
    platform:"NGO policy tracker",
    views:"National state-policy cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "PARENTING"
    ],
    healthSubAngle:"IMMUNE",
    angle:"Willa's already clears the bar states are racing toward: organic, glyphosate-free, no dyes. Make an activist Reel framing the clean carton as the standard, not the exception.",
    urgency:"THIS WEEK",
    sources:[
      {label:"EWG · Interactive map: tracking state food chemical regulation in the U.S. (June 2026 refresh — permanent reference)", url:"https://www.ewg.org/news-insights/news/2026/06/interactive-map-tracking-state-food-chemical-regulation-us"}
    ]
  },
  {
    id:"T-6",
    trend:"The dye phase-out gets a hard deadline — petroleum dyes out of the whole food supply by 2027 🧪",
    detail:"Per the Jun 15 DLA Piper roundup, the FDA's Acting Deputy Commissioner for Food called dye removal 'a generational change,' citing commitments to eliminate petroleum-based synthetic dyes from school foods by 2026 and the entire food supply by 2027. Separately, ten states have implemented SNAP restrictions on candy and sugary drinks with ten more set for year-end — the clean-up is moving on multiple fronts at once.",
    platform:"Trade + legal press",
    views:"Federal dye-policy cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"An entire industry is reformulating on a deadline. Willa's never had a dye to remove — make a calm wordplay Reel where the clean carton is the punchline, the deadline the backdrop.",
    urgency:"BACKGROUND",
    sources:[
      {label:"DLA Piper · Food and Beverage News and Trends — FDA revises synthetic dye phase-out timing (Jun 15, 2026)", url:"https://www.dlapiper.com/en-us/insights/publications/food-and-beverage-news-and-trends/2026/food-and-beverage-news-and-trends-june-12-2026"},
      {label:"FDA · Tracking food industry pledges to remove petroleum-based food dyes (permanent reference)", url:"https://www.fda.gov/food/color-additives-information-consumers/tracking-food-industry-pledges-remove-petroleum-based-food-dyes"}
    ]
  },
  {
    id:"T-7",
    trend:"'Clean label' isn't a trend anymore — it's the price of admission, with 80%+ of shoppers screening for it 📋",
    detail:"Per 2026 category reads, over 80% of US consumers now actively seek clean-label / all-natural attributes and more than two-thirds say those claims influence what they buy. The shorthand consumers want is 'understand it at a glance' — short lists, whole grains, real fiber and protein, recognizable names. The bar that used to be a niche selling point is now the baseline expectation.",
    platform:"Trade press + category research",
    views:"Clean-label consumer-demand cycle",
    velocity:"medium",
    pillars:[
      "INGREDIENTS/RECIPES",
      "HEALTH/WELLNESS"
    ],
    angle:"Don't claim the trend, claim the floor — clean is the baseline now, and Willa's has been below the floor the whole time (1g sugar, no gums). Make a receipts-first Reel.",
    urgency:"BACKGROUND",
    sources:[
      {label:"Food Institute · 2026 Innovative Trends: Clean Label", url:"https://foodinstitute.com/focus/2026-innovative-trends-clean-label/"},
      {label:"New Hope · SPINS identifies top natural/organic food trends shaping 2026 (clean label + protein)", url:"https://www.newhope.com/food-and-beverage/spins-identifies-top-natural-organic-food-trends-shaping-2026"}
    ]
  },
  {
    id:"T-8",
    trend:"Women-built brands keep over-indexing at the shelf — when shoppers can see the founder, they buy 👩‍🍳",
    detail:"Buy Women Built reports its collective now spans 2,300+ women-built consumer brands with 76M social followers; retailer takeovers have lifted sales sharply where the founders are made visible. Female founders still face disproportionate barriers to capital and national listings — but the receipts on shopper preference are getting hard to ignore. The throughline: a face behind the brand is itself a proof point.",
    platform:"Trade press / category momentum",
    views:"Women-owned category cycle",
    velocity:"medium",
    pillars:[
      "REVIEWS/RECS"
    ],
    angle:"Willa's belongs on every 'shop women-built' shelf — WBENC-certified, named for grandmother Willa. Make a REVIEWS carousel: meet the founder, read the carton, the face is the proof.",
    urgency:"BACKGROUND",
    sources:[
      {label:"Speciality Food Magazine · How shining a light on female founders boosts retailers' sales (Buy Women Built)", url:"https://www.specialityfoodmagazine.com/retail/international-womens-day-buy-women-built-supporting-female-founders"}
    ]
  },
  {
    id:"T-9",
    trend:"Hojicha is the cafe breakout of summer — toasty, low-caffeine, built for an oat-milk pour 🍵",
    detail:"Hojicha (roasted Japanese green tea) is the breakout cafe drink of summer 2026, positioned as the smoother, less-bitter, naturally-lower-caffeine alternative to matcha. Searches for 'hojicha latte' are up roughly 173% and global hojicha interest up about 55% since early 2025; cafes are adding iced hojicha lattes that pair specifically with oat milk and vanilla. Unlike the matcha shortage story, this is a flavor-discovery wave with an open creamy-base lane.",
    platform:"Cafe menus + search data",
    views:"Season-defining drink discovery",
    velocity:"medium",
    pillars:[
      "INGREDIENTS/RECIPES"
    ],
    angle:"Nobody in the oat lane has claimed hojicha yet. Make a 'let's make an iced hojicha latte (dairy-free!)' Barista recipe video — nutty profile, rich low-sugar base.",
    urgency:"THIS WEEK",
    sources:[
      {label:"TikTok · #hojicha hashtag landing page (permanent reference)", url:"https://www.tiktok.com/tag/hojicha"},
      {label:"TikTok · #hojichalatte hashtag landing page (permanent reference)", url:"https://www.tiktok.com/tag/hojichalatte"}
    ]
  },
  {
    id:"T-10",
    trend:"The kids RTD aisle still runs on cane sugar and rice syrup — and a fresh raise is heating up the protein race 🍼",
    detail:"The dairy-free kids RTD lane is competitive but compromised: the leading organic kids shake carries 9g cane sugar, the major pea-milk kids line uses 5g cane sugar (not organic), and Ripple is leaning hard into its 8g-protein kids line after a fresh $17M raise to push organic, nutrition-first plant milk in 2026. Willa's Kids holds 8g protein, 6g sugar from organic maple, DHA, top-9 allergen-free, and a perfect Yuka 100.",
    platform:"Trade press + brand launches",
    views:"Kids RTD competitive cycle",
    velocity:"medium",
    pillars:[
      "PARENTING",
      "REVIEWS/RECS"
    ],
    angle:"Competitors are organic-but-sugary or simple-but-not-organic. Make a label-literacy Kids carousel on what to actually check on a kids' milk — sweetener, protein, allergens, organic.",
    urgency:"THIS WEEK",
    sources:[
      {label:"PR Newswire · Ripple Foods Launches Organic Plant-Based Milk That Doesn't Skimp on Protein (reference)", url:"https://www.prnewswire.com/news-releases/ripple-foods-launches-organic-plant-based-milk-that-doesnt-skimp-on-protein-302660540.html"},
      {label:"Orgain · Kids Protein Organic Nutrition Shake (brand reference)", url:"https://orgain.com/products/kids-protein-organic-nutrition-shake"}
    ]
  }
];



const TICKER = [
  {agent:"trend", text:"flagged regulators floating a red/yellow/green front-of-pack label you can judge at a glance — routed it into the \"green before you flip it\" calm-authority label Reel, carton already reads green."},
  {agent:"pulse", text:"caught the anime Food Jutsu summon as June's top brand-friendly TikTok format — threw the hand signs and summoned \"the one with nothing to hide,\" 4-ingredient stinger as the payload."},
  {agent:"composer", text:"wrote \"the one i'd actually send\" against the new law that opens the cafeteria's plant-milk slot — Willa's Kids, 8g protein, allergen-free, Yuka 100, cofounder-mom voice."},
  {agent:"pulse", text:"answered the viral protein-soda dirty-drink trend calmly — \"the cleanest protein move has nothing to mix in,\" whole-oat protein and fiber, no isolate, no fizzy filler."},
  {agent:"trend", text:"logged a first-in-the-nation 'not-ultraprocessed' seal most of the aisle won't qualify for — built \"the whole oat, nothing pulled out, nothing faked back in\" as confident product truth, no trade stats on the surface."},
  {agent:"composer", text:"planted the oat-milk flag on summer's breakout cafe drink — \"matcha got the headlines. hojicha got the oat milk,\" a dairy-free Barista hojicha latte before the chains claim it."},
  {agent:"pulse", text:"rode the #1 trending drink ingredient with \"the purple does the talking. the carton does the rest.\" — a vivid iced ube oat latte over Willa's clean white base, color does the work."},
  {agent:"composer", text:"answered optimization fatigue with \"a breakfast you'd actually share, not just survive.\" — the joy-not-tracking wave, the pour as the joyful, shareable thing, sunlit and slow."},
  {agent:"hook", text:"ran the one-sip, four-emotions no-audio format — \"i was not prepared for oat milk to taste like this,\" the taste reaction is the whole gag, comments do the reach."},
  {agent:"comp", text:"watched the category pour marketing into summer iced coffee — countered with a home cold-foam play, \"shake it cold and it foams like a cafe machine did it,\" half the sugar, no rapeseed, no names."},
  {agent:"composer", text:"rebuilt a passed-down icebox cake clean — \"grandma's icebox cake, minus the dairy,\" a dairy-free mango float with whipped coconut cream and Willa's Original, heritage remade forward."},
  {agent:"editor", text:"claimed the family table off the World Cup with \"the halftime chocolate milk the kids cheer for and the label can't argue with\" — one carton feeds the room, no halftime sugar bomb, no sports-bro register."}
];


const COMPETITORS = [
  {
    id:"C-1",
    name:"Oatly",
    color:"#1F6F54",
    status:"Launched the second chapter of its Nespresso iced-coffee collaboration Jun 17, 2026 — four curated iced-coffee recipes (Pink Dragon Mocha, Dirty Berry Matcha, Mangoat Coconut Latte and a fourth) plus a co-branded barista blend, expanding into 11 new cities across 26 global markets for a flavor-spectacle summer push.",
    direction:"up",
    opportunity:"The category just funded a summer iced-coffee moment. Ride it with a clean home-iced-latte Reel — same gorgeous cold pour, half the sugar, no rapeseed, no special blend required.",
    sources:[
      {label:"StockTitan · Oatly, Nespresso extend iced coffee deal to 26 markets (Jun 17, 2026)", url:"https://www.stocktitan.net/news/OTLY/oatly-and-nespresso-return-to-bring-the-iced-coffee-experience-8v2uu2qae1c3.html"},
      {label:"GlobeNewswire · Oatly and Nespresso Return to Bring the Iced Coffee Experience Home (Jun 17, 2026)", url:"https://www.globenewswire.com/news-release/2026/06/17/3313321/0/en/oatly-and-nespresso-return-to-bring-the-iced-coffee-experience-home.html"}
    ]
  },
  {
    id:"C-2",
    name:"Muscle Milk",
    color:"#C9A23F",
    status:"Relaunched its core lineup in June 2026 (DairyReporter, Jun 3) as its 'biggest transformation' yet — a Pro line built to boost protein, cut lactose and 'simplify the label,' the latest legacy RTD name racing toward shorter ingredient lists.",
    direction:"flat",
    opportunity:"The 'simplify the label' wave is now industry-wide. Make a confident Original-led POV piece on what a genuinely short, readable ingredient list looks like — product truth, no shake-brand named.",
    sources:[
      {label:"NutritionInsight · PepsiCo's Muscle Milk reformulates RTD protein shake with ultra-filtered milk", url:"https://www.nutritioninsight.com/news/muscle-milk-ultra-filtered-protein-shakes.html"}
    ]
  },
  {
    id:"C-3",
    name:"Graza",
    color:"#8FAE3C",
    status:"Rolled its Extra Virgin Olive Oil Potato Chips nationwide at Target in four flavors Jun 8, 2026; the Instagram launch pulled a viral comment thread (Brie Larson, Spindrift, Soapbox all chiming in), turning the announcement into a public co-sign with the no-seed-oil proof point as the punchline.",
    direction:"up",
    opportunity:"Borrow the at-shelf-plus-comment-co-sign move — stage Willa's at the Target shelf, let the 4-ingredient back-label be the reveal, and bait real-buyer UGC in the caption to carry it.",
    sources:[
      {label:"Graza Olive Oil Potato Chips — Instagram launch post", url:"https://www.instagram.com/p/DYFv2kyjGtz/"}
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
    id:"JUN22-TT-1",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Wed Jun 24 · 10am",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"summon the one with nothing to hide.\" — Food Jutsu summon, 4-ingredient payload",
    intel:[
      {type:"PULSE", text:"The anime 'Food Jutsu' summon (hand signs → drink materializes on the match-cut, set to 'Delirious') is June's top brand-friendly TikTok format (CP-1). The reveal IS the punchline — so the payload Willa's summons is the carton with the shortest ingredient list in the aisle: organic whole oats, filtered water, organic vanilla, sea salt. The whole oat groat (bran + germ, not oat syrup) is the move, named in the reveal, not the news."},
      {type:"AUDIENCE", text:"FoodTok scrolls fast and rewards a satisfying final frame; a CapCut template already exists so the format does the reach work while the four-line payload does the brand work. The audience is in on the anime bit — they'll rewatch to catch the stinger, which is exactly where the proof point lands."},
      {type:"COMPETITOR", text:"Internal only: most oat milks filter out the bran AND germ then process the starch into sugar — roughly 84% of plant milks read as ultra-processed (CP-10), the floor 80%+ of shoppers now screen against (T-7). Never name a competitor on the surface; let the summoned four-line list be the contrast."}
    ],
    hooks:[
      {text:"summon the one with nothing to hide.", recommended:true},
      {text:"POV: you cast the spell and the oat milk that actually shows its work appears.", recommended:false},
      {text:"the strongest summon in the kitchen has four ingredients.", recommended:false}
    ],
    caption:"Most oat milks summon a 12-line label. We summon four. ✋🥛\n\nWilla's Original is the whole plant milk — made from the whole entire oat groat (bran, germ and all), not oat syrup. Most oat milks filter out both the fiber AND the protein, then process the starch into sugar. We keep the good stuff.\n\nThe payload, every time you cast the spell:\n• 1g sugar (from the oats, nothing added)\n• 4g+ protein\n• 2g+ prebiotic fiber\n• 4 real ingredients, no isolates, no gums\n\nOrganic whole grain oats. Filtered water. Organic vanilla extract. Sea salt. That's the whole scroll. 📜\n\nUSDA Organic. Non-GMO. Certified glyphosate-free — tested every lot. Summon the one with nothing to hide.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#foodjutsu",
      "#wholeplant",
      "#cleaningredients",
      "#labelcheck",
      "#4ingredients",
      "#dairyfree",
      "#fyp",
      "#foodtok"
    ],
    visual:"Bright, high-saturation kitchen on a clean white-and-green counter, hard summer daylight, fast match-cut energy to match the Food Jutsu format. Open on empty hands mid-frame against a soft backdrop. Three crisp hand-sign poses cut to the beat, then the match-cut: on the snap, a frosty glass of creamy oat milk + the Willa's Original carton MATERIALIZE in-hand (carton holds 40%+ of frame, label readable). Glowing summon-circle graphic flashes behind the reveal anime-style, then dissolves. Final frame: overhead of the four real ingredients laid out like spell components (oats in a small bowl, water, vanilla bottle, pinch of sea salt) with the four-ingredient list as a clean kanji-card-style overlay. Trend-forward, playful, hands-and-product only — no talent on camera.",
    script:[
      {scene:"HOOK", time:"0-2s", action:"Empty hands enter center frame against a bright backdrop, palms together summon-ready. Static close-up. Text overlay (bold, top): 'summon the one with nothing to hide.' Audio: 'Delirious' (Jujutsu Kaisen score) drops in."},
      {scene:"HAND SIGNS", time:"2-5s", action:"Three quick hand-sign poses, each a hard cut on the beat (snap-zoom between them). Faint glowing rune flickers over the hands on the third sign. Camera handheld-tight. No overlay — let the format breathe."},
      {scene:"THE SUMMON", time:"5-8s", action:"MATCH-CUT on the beat drop: a frosty glass of creamy oat milk + the Willa's Original carton materialize in both hands, condensation beading. Anime summon-circle graphic flashes behind, then fades. Carton label faces camera, 40%+ of frame. Text overlay: 'four ingredients. summoned.'"},
      {scene:"THE PAYLOAD", time:"8-12s", action:"Slow pour from carton into the glass, creamy and thick (whole-oat body). Overlay stings in one line at a time, fast: '1g sugar · 4g+ protein · 2g+ fiber.' Then: 'the whole oat groat — not oat syrup.' Camera close on the pour."},
      {scene:"THE SCROLL", time:"12-16s", action:"Overhead match-cut to the four real ingredients arranged like spell components: oats in a bowl, filtered water, organic vanilla bottle, pinch of sea salt. Kanji-card-style overlay lists them one at a time. Hand slides the carton into frame beside them."},
      {scene:"END CARD", time:"16-18s", action:"Snap to the carton alone on the bright counter, glass beside it. End-card text: 'nothing to hide. nothing to add.' Small tag: 'Willa's Original · the whole plant milk.' Audio resolves."}
    ],
    audio:"Warm narrative voiceover kept minimal (let the format carry) over 'Delirious' from the Jujutsu Kaisen score — the Food Jutsu trend audio. VO lands only the stinger near the end: 'most oat milks summon a 12-line label. we summon four.' Fast cuts synced to the beat drop at the summon.",
    duration:"16-18 seconds",
    cta:{soft:"which one are you summoning? 👀", medium:"the carton that reads green before you flip it — that's the move.", strong:"summon the four-ingredient one at willaskitchen.com 🥛"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN22-IG-R1",
    platform:"Instagram Reel",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Wed Jun 24 · 12pm",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"green before you flip it.\" — calm-authority label Reel",
    intel:[
      {type:"TREND", text:"Willa's Original is already what a green light looks like — 4 ingredients, organic, glyphosate-free, whole oat groat (bran + germ + all). A federal red/yellow/green front-of-pack label is the next move per the FDA's pending ultra-processed-food definition (T-1) — fruits and veggies get green. The regulator's coming standard validates the carton that's read green the whole time."},
      {type:"AUDIENCE", text:"Health-forward shoppers and label-readers are exhausted by flipping every carton to decode it. A 'judge it at a glance' label is the thing they've been doing manually for years — this Reel hands them the carton that already passes that glance, no decoding required."},
      {type:"COMPETITOR", text:"Internal: most of the oat-milk shelf filters out the bran + germ and processes the starch into sugar, landing them in the yellow/red zone a color-coded label would draw. Never name a competitor on the surface — keep it 'most oat milks' / 'the rest of the aisle.'"}
    ],
    hooks:[
      {text:"four ingredients reads green in any color code. the regulators are just getting around to printing it.", recommended:true},
      {text:"they're inventing a green light for the front of the carton. ours has four ingredients on the back.", recommended:false},
      {text:"a label that tells you it's good at a glance? we've been that glance the whole time.", recommended:false}
    ],
    caption:"Willa's Original is what a green light looks like — 4 ingredients, organic, certified glyphosate-free, made from the whole oat groat (bran, germ, and all).\n\nA color-coded front-of-pack label is coming so you can judge a food at a glance, no flipping required. Fruits and veggies get the green light. Most oat milks won't, because they filter out the bran + germ — discarding both the fiber AND the protein — then process the starch into sugar.\n\nNot this one:\n· organic whole grain oats\n· filtered water\n· organic vanilla extract\n· sea salt\n\n1g sugar · 4g+ protein · 2g+ prebiotic fiber. Certified glyphosate-free. Tested every lot.\n\n\"Green before you flip it.\" Four ingredients reads green in any color code — the regulators are just getting around to printing it.\n\nPlants, finally done right.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#wholeoat",
      "#organicoatmilk",
      "#labelcheck",
      "#cleaningredients",
      "#frontofpacklabel",
      "#1gsugar",
      "#glyphosatefree",
      "#realfood"
    ],
    visual:"Bright, airy, trend-forward — sunlit kitchen counter, warm white balance, soft morning shadows. Hands only (Christina-reserved, no talent here). HERO: Willa's Original carton standing front-label-out, on screen 40%+ the whole way through. A traffic-light motif lives in the on-screen graphics, not the set — a small red/yellow/green chip animates in the corner and snaps to GREEN over the carton. Open on the front of the carton with the green chip already lit, never the back. Mid-Reel a hand sets the carton down next to a generic anonymous 'other' carton (label blurred/cropped, never identifiable) whose chip flickers yellow. Close on a slow push-in to the 4-line ingredient list with the green chip glowing beside it. Clean kondo-style negative space, one sprig of oats in soft focus, no clutter. Text overlays in a friendly sans, navy ink (#202A44) on cream.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Close-up, static: Willa's Original carton front-label-out on a sunlit counter, a red/yellow/green chip animating in the top corner and SNAPPING to green over the carton. Text overlay fades in: 'reads green in any color code.' Subtle whip-zoom into the carton on the beat."},
      {scene:"STAKES", time:"3-7s", action:"Hand enters frame and slides a second, anonymous carton (label blurred, unidentifiable) next to Willa's; its corner chip flickers and lands on YELLOW. Text overlay: 'most oat milks filter out the bran + germ — losing the fiber AND the protein — then turn the starch to sugar.' Camera holds on the contrast."},
      {scene:"SOLUTION", time:"7-12s", action:"Hand lifts the anonymous carton out of frame; only Willa's remains, green chip glowing. Slow push-in. Text overlay builds line by line: 'whole oat groat · bran, germ + all'. Carton stays 40%+ of frame."},
      {scene:"CHECKLIST", time:"12-17s", action:"Cut to a tight overhead of the back-label ingredient list. Finger traces the 4 lines as green checkmarks pop on each: 'organic whole grain oats ✅ · filtered water ✅ · organic vanilla extract ✅ · sea salt ✅'. Text overlay: '1g sugar · 4g+ protein · 2g+ fiber'."},
      {scene:"PROOF", time:"17-20s", action:"Snap back to the front of the carton, green chip lit, a 'Certified Glyphosate-Free · Tested Every Lot' stamp animating in beside it. Text overlay: 'green before you flip it.'"},
      {scene:"END CARD", time:"20-22s", action:"Carton centered on cream background, oats in soft focus. End-card stinger animates in: 'no decoding required.' Small Willa's logo lower-third. Tagline: 'Plants, finally done right.'"}
    ],
    audio:"Warm narrative voiceover, calm and assured — authority without preachiness, a knowing half-smile in the delivery. Lo-fi, slightly upbeat instrumental bed (soft keys + light percussion), low under the VO. No trending sound required; the calm-confidence tone is the point.",
    duration:"20-22 seconds",
    cta:{soft:"read the front. then read the back. they agree.", medium:"next time a label tells you what's good at a glance — this one already did.", strong:"skip the decoding. grab the carton that reads green from the front."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUN22-TT-2",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Thu Jun 25 · 9am",
    priority:"HIGH",
    rideNow:false,
    concept:"\"the cleanest protein move has nothing to mix in.\" — calm misinfo correction",
    intel:[
      {type:"PULSE", text:"Protein Diet Coke — a pre-made protein shake poured into diet soda — is the viral MomTok dirty-soda trend, with doctors warning the shakes 'sneak in a lot of filler' so you get more sugar than protein, turning a 'diet' drink into a dessert (CP-7). Lead with the Willa's answer: protein + fiber that's already in the whole oat groat — bran, germ, and all — 4 ingredients, no isolate, no filler. The viral craze is the backdrop, not the hook."},
      {type:"AUDIENCE", text:"Willa's buyers are protein-aware parents who got sold the protein wave but feel queasy watching it turn into soda-and-shaker theater. They want the upgrade that's actually food — not another lab-built drink dressed up as wellness. The calm, witty correction (not the lecture) is what they screenshot and send to the group chat."},
      {type:"COMPETITOR", text:"Internal: a legacy protein-shake giant relaunched in June to 'cut lactose and simplify the label' (C-2) — the whole RTD lane is racing toward shorter ingredient lists while still selling isolate-in-a-bottle. Never name them. The contrast Willa's owns is whole-oat protein vs. additive protein, framed at the category level only."}
    ],
    hooks:[
      {text:"doctors are pushing back on the protein soda thing. here's the part nobody's saying out loud.", recommended:true},
      {text:"pouring a protein shake into diet coke does not make it food.", recommended:false},
      {text:"the whole trend is mixing two things. the better move mixes nothing.", recommended:false}
    ],
    caption:"Willa's Original is whole-oat protein — 4g+ protein, 2g+ prebiotic fiber, 1g sugar, 4 ingredients. No isolate. No filler. Nothing to mix in.\n\nThe viral move right now is pouring a pre-made protein shake into diet soda and calling it a health hack. Doctors are pushing back — a lot of those shakes sneak in filler, so you can end up with more sugar than protein. A 'diet' drink quietly turns into a dessert.\n\nThe calmer answer is a pour with nothing to mix in. Willa's uses the whole oat groat — bran, germ, and all — the way steel-cut oats do. Most oat milks filter out both the protein AND the fiber, then process the starch into sugar. We keep all of it.\n\nOrganic. Non-GMO. Certified glyphosate-free. WBENC women-owned.\n\nThe cleanest protein move has nothing to mix in.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#proteindietcoke",
      "#dirtysoda",
      "#proteintok",
      "#wholeoat",
      "#cleanlabel",
      "#wholeplant",
      "#oatmilkprotein",
      "#momtok"
    ],
    visual:"Bright, daylight-flooded kitchen counter, no talent on camera — hands + product + text overlays carry it. Open on a dramatized 'protein soda' build (hands cracking a diet-soda can, glugging a generic pre-made protein shake into a tall fizzy glass, the mixture going murky and over-foamed) shot tight and slightly chaotic to signal the trend. Hard cut to a calm, slow pour of Willa's Original into a clean glass over ice — same camera distance, opposite energy: smooth, creamy, unhurried, nothing added. Carton stays in frame 40%+ of the runtime, label readable. Color temperature warm and crisp, high-key. Text overlays in clean sans, lowercase, navy on cream. End on the carton beside the glass, morning light, the 4-ingredient list visible. The cut from murky-fizz to clean-pour IS the argument — let the contrast do the talking.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Tight, slightly handheld: hands crack a generic diet-soda can and glug a pre-made protein shake into a fizzy glass — it goes murky, over-foams. Text overlay (lowercase, navy on cream): 'doctors are pushing back on the protein soda thing.' Quick shaky energy to signal the viral trend."},
      {scene:"PROBLEM", time:"3-7s", action:"Hold on the murky over-foamed glass, slow push-in. Text overlay swaps: 'a lot of those shakes sneak in filler → more sugar than protein.' Small lower-third gloss fades in: '(a 'diet' drink that's basically a dessert.)' Keep it calm, not mocking."},
      {scene:"TURN", time:"7-11s", action:"Hard cut, brighter frame: a hand sets down the messy glass and reaches for the Willa's Original carton, label to camera. Text overlay: 'the better move mixes nothing.' Beat. Then: 'the protein's already in the oat.' Carton fills 40%+ of frame."},
      {scene:"PROOF", time:"11-16s", action:"Slow, smooth pour of Willa's Original over ice in a clean glass — creamy, satisfying, opposite of the foam. Overlay stacks the receipts one line at a time: '4g+ protein' · '2g+ prebiotic fiber' · '1g sugar' · '4 ingredients.' Then a single gloss line: 'whole oat groat — bran, germ + all. no isolate. no filler.'"},
      {scene:"PAYOFF", time:"16-20s", action:"End card: carton beside the finished glass in warm morning light, 4-ingredient label readable. Benefit-shorthand stinger overlay: 'the cleanest protein move has nothing to mix in.' Small navy wordmark lower corner. Hold on the clean still."}
    ],
    audio:"Warm narrative voiceover, dry and a little witty — the calm aunt at the kitchen table, never preachy. Lo-fi, unhurried beat underneath that drops slightly on the murky-foam beat and lifts on the clean pour, so the audio mirrors the visual turn. VO matches the on-screen text lines roughly but lands the 'nothing to mix in' beat with a knowing pause.",
    duration:"20-22 seconds",
    cta:{soft:"the protein's already in the oat. no mixing required.", medium:"skip the shaker build — just pour Willa's Original.", strong:"find Willa's Original at willaskitchen.com — whole-oat protein, nothing to mix in."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUN22-IG-R2",
    platform:"Instagram Reel",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Thu Jun 25 · 12pm",
    priority:"BIG SWING",
    rideNow:false,
    concept:"\"the cafeteria has a plant-milk slot now. this is the one we'd actually send.\" — note-unlocks-the-pour parenting Reel",
    intel:[
      {type:"TREND", text:"School lunch lines now open to plant milk, and a parent's note (not a doctor's) qualifies the dairy-free pour for ~30M kids (T-2). Willa's Kids is the answer: 8g protein, top-9 allergen-free, Yuka 100. The law opened the slot — the only question left for parents is which carton clears it, so lead with the carton, the law is the backdrop."},
      {type:"AUDIENCE", text:"Parents at pickup don't read trade press — they read the back of the carton in the milk aisle. The 'beta mom' exhale (CP-3) is real: the win isn't color-coding the week, it's grabbing the one carton you can read in four seconds and trust in a cafeteria you can't see. Speak to the parent who wants one good default, not a system."},
      {type:"COMPETITOR", text:"Internal: the leading organic kids shake runs 9g cane sugar; the major pea-milk kids line runs 5g cane sugar and isn't organic; a fresh $17M raise is heating the kids-protein race (T-10). Never name them on the surface — Willa's Kids holds 8g protein, 6g sugar from organic maple, DHA, top-9 allergen-free, Yuka 100. Contrast stays 'vs. the average kids' milk' only."}
    ],
    hooks:[
      {text:"the cafeteria finally has a plant-milk slot. now: which carton would you actually send?", recommended:true},
      {text:"a note from you (not a doctor) now unlocks dairy-free milk at school. here's the one to ask for.", recommended:false},
      {text:"school lunch just opened up for ~30 million kids. read this carton before you fill the slot.", recommended:false}
    ],
    caption:"30 million kids can now get a plant-milk pour at school — and a note from you, not a doctor, unlocks it. So the only question left is which carton you'd actually send. The cafeteria has a plant-milk slot now. This is the one we'd actually send. 🌾\n\nWilla's Kids: 8g protein (same as dairy), 6g sugar from organic maple, plant-based DHA, and free of the top 9 allergens — no nut, soy, gluten, dairy, sesame. Yuka scored it 100/100. We use the whole oat, bran and germ and all, not oat syrup, so the good stuff stays in.\n\nMost kids' milks lean on cane sugar or rice syrup. Willa's Kids is organic, allergen-free, and short enough to read in the four seconds you've got in the milk aisle.\n\nParents asked us to make a kids' carton they could trust. We listened — and now there's a slot at school worth filling. 🥛\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#schoollunch",
      "#dairyfreekids",
      "#allergenfriendly",
      "#cleanlabel",
      "#momsoftiktok",
      "#kidsnutrition",
      "#labelcheck"
    ],
    visual:"Bright, sun-washed kitchen-to-cafeteria flow, warm wood + cream tones, lots of natural light and quick hands-in-frame movement. Open on a real lunchbox being packed at a home counter — a folded handwritten note on top of a kid's lunch, then a hand slides the Willa's Kids carton next to it. Cut to a clean overhead of the carton turned to its back label, finger tracing the short ingredient list. Willa's Kids carton holds frame 40%+ throughout — pour into a kid's cup, condensation on the glass, the maple-cream color catching light. No talent's face required; hands + product + lunchbox + a kid's hand reaching for the cup at the end. Trend-forward, not stock-photo; quick cuts, lofi-warm grade. End card on a clean cream background with the carton and the Yuka 100 + allergen-free stinger.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Overhead close-up: a folded handwritten note resting on top of a packed kids' lunchbox at a sunlit counter. A hand sets it down. Text overlay (bold, top): 'a note from you now unlocks dairy-free milk at school.' Quick whip-cut transition to the next frame."},
      {scene:"SETUP", time:"3-7s", action:"Wide-to-medium: hand slides the Willa's Kids carton into frame next to the lunchbox; the school slot is implied, not shown. Text overlay: 'the cafeteria has a plant-milk slot now.' Soft push-in on the carton. Warm light, kitchen blur behind."},
      {scene:"PAYOFF", time:"7-13s", action:"Clean overhead: carton flipped to back label, finger traces the short list. On-screen ticks animate in beside the label: '8g protein ✓  6g sugar (organic maple) ✓  DHA ✓  top-9 allergen-free ✓.' Text overlay: 'this is the one we'd actually send.' Cut to the maple-cream pour into a kid's cup, condensation, light through the glass."},
      {scene:"PROOF", time:"13-18s", action:"Tight on the carton face beside the cup; a Yuka-style '100/100' badge fades in. Text overlay: 'organic. short enough to read in 4 seconds.' A small kid's hand enters frame and lifts the cup."},
      {scene:"END CARD", time:"18-22s", action:"Cream background, Willa's Kids carton centered. Stinger text resolves: 'parents asked. we listened. Yuka 100 · top-9 allergen-free.' Logo lockup fades up. End on the carton, still."}
    ],
    audio:"Warm narrative voiceover over lofi-warm, gentle morning-kitchen beat. VO leads with the benefit: 'thirty million kids can get a plant-milk pour at school now — and the only question left is which carton you'd actually send.' Conversational, parent-to-parent warmth, not clinical. Soft ambient kitchen sound (pour, cup set down) under the music.",
    duration:"20-22 seconds",
    cta:{soft:"save this for the next milk-aisle run.", medium:"tap to read the full label on Willa's Kids.", strong:"find Willa's Kids and fill the slot — the one you'd actually send."},
    benefitShorthandId:"BS-3"
  },
  {
    id:"JUN22-IG-F1",
    platform:"IG Feed",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Thu Jun 25 · 6pm",
    priority:"STANDARD",
    concept:"\"the one carton that's safe for the whole lunch table.\" — allergen-free parent carousel",
    intel:[
      {type:"TREND", text:"The kids RTD lane is crowded but built around a tradeoff: the organic options lean sugary, the simple ones aren't organic, and most carry at least one of the top allergens that get a carton banned from a classroom. Willa's Kids skips the tradeoff — 8g protein, 6g sugar from organic maple, USDA Organic, and free of the top 9 allergens. Lead with the carton that's already safe for the lunch table; the crowded set is just the backdrop."},
      {type:"AUDIENCE", text:"Parents packing for a nut-free / dairy-free / sesame-free classroom aren't comparing nutrition panels at the shelf — they're scared of one wrong ingredient getting their kid's snack sent home or, worse, a reaction. The relief Willa's Kids sells is 'you can stop reading the fine print on this one.' Make the brief about the calm of a carton you don't have to second-guess, not about scoring the aisle."},
      {type:"COMPETITOR", text:"Internal: the kids RTD set splits into organic-but-sugary and simple-but-not-organic, and most options still carry a top-9 allergen. Never name a brand on the surface — contrast stays 'vs. the average kids' milk.' Willa's Kids is uniquely positioned because it clears allergen-free + organic + 8g protein at once, which is exactly the parent-fear the category leaves open. Keep all competitor specifics internal."}
    ],
    hooks:[
      {text:"packing for a nut-free, dairy-free classroom? this is the one you can stop double-checking.", recommended:true},
      {text:"the snack that won't get sent home from the allergy table.", recommended:false},
      {text:"free of the top 9 allergens — and your kid asks for it by name.", recommended:false}
    ],
    caption:"The one carton that's safe for the whole lunch table. 🌾\n\nWilla's Kids is free of the top 9 allergens — no nut, soy, gluten, dairy, sesame — so it clears the nut-free, dairy-free classroom without a second read.\n\nAnd it doesn't trade that safety for everything else:\n- 8g protein, same as dairy\n- 6g sugar, from organic maple\n- USDA Organic, with plant-based DHA\n- made with the whole oat — bran and germ and all, not oat syrup\n\nMost kids' milks make you pick: organic OR simple, sweet OR clean, allergy-safe OR actually nourishing. Willa's Kids is the one that doesn't make you choose. Parents asked us to make a carton they could trust. We listened. 🥛\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#dairyfreekids",
      "#allergenfriendly",
      "#nutfree",
      "#kidsnutrition",
      "#momsoftiktok",
      "#schoollunch",
      "#organickids"
    ],
    visual:"Four-card editorial carousel, bright and trend-forward — warm cream backgrounds, soft natural daylight, lots of breathing room, a zine-cover feel (Fishwife/Graza design-wit register), not an infographic. Card 1: a packed lunchbox on a sun-washed cream surface with the Willa's Kids carton tucked in beside real, identifiable kid food (a sandwich, clementine, crackers), bold overlay 'safe for the whole lunch table.' Card 2: tight close-up of the carton's allergen callout with the top-9-free line in a hand-drawn marker circle, big overlay 'no nut · soy · gluten · dairy · sesame.' Card 3: the carton centered, big number callouts (8g protein · 6g sugar · USDA Organic) with one short plain-English line each. Card 4: cream background, carton with the Yuka 100 badge and a warm closing line. Carton holds frame 40%+ across every card. Hands + product + real lunch food only, no talent face. Consistent palette + type across all cards so it reads as one designed set, swipe-rewarding.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for the next lunchbox run.", medium:"swipe through, then check the back of Willa's Kids.", strong:"find Willa's Kids — the carton your classroom can clear."}
  },
  {
    id:"JUN22-TT-4",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Fri Jun 26 · 9am",
    priority:"HIGH",
    concept:"\"i was not prepared for oat milk to taste like this\" — one-sip, four-emotions format",
    intel:[
      {type:"PULSE", text:"June 2026's breakout no-audio acting format has creators deliver one short phrase four ways with numbered on-screen text so the comments rank them (CP-2). LEAD with the payload: ride the format on the FIRST SIP, not the ingredient list — one creamy pour, four honest taste reactions (braced, surprised, won-over, hooked). The format is the reach engine; the taste payoff is the brand work. Stays clear of the read-the-label / count-the-lines lane the engine has been resting."},
      {type:"AUDIENCE", text:"FoodTok scrollers carry a 'plant milk is watery and chalky' prejudice — a lowest-lift reaction format that dramatizes a real taste turn lets them argue in the comments which reaction the pour earns, which is exactly the 'delicious' proof Willa's underdelivers in content."},
      {type:"COMPETITOR", text:"Internal: the category leans on flavor-spectacle and novelty drops to manufacture taste excitement, while the base pour underneath still reads watery to a lot of drinkers. Never name a competitor on the surface; the contrast is rich-and-creamy from 4 ingredients, no flash required — let the on-camera reaction sell it."}
    ],
    hooks:[
      {text:"watch my face the second the oat milk hits", recommended:true},
      {text:"rank my four reactions to one sip", recommended:false},
      {text:"POV: you expected watery and got creamy", recommended:false}
    ],
    caption:"I was not prepared for oat milk to taste like this. 🥛 Willa's Original is rich, smooth, and actually creamy — not the watery, chalky pour you brace for. It's organic whole grain oats, filtered water, organic vanilla, and sea salt, with 1g sugar, 4g+ protein, and 2g+ fiber per cup. Most oat milks filter out the protein AND the fiber, then turn the starch into sugar — we use the whole oat groat, bran and germ and all, so the body stays in the glass. That's where the creamy comes from. So: braced, surprised, won-over, or hooked — comment your face. We already know which one we'd pick. 🌾",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#tastetest",
      "#creamyoatmilk",
      "#wholeplant",
      "#organicoatmilk",
      "#fyp",
      "#foodtok",
      "#plantmilk",
      "#firstsip"
    ],
    visual:"Bright, sunlit kitchen counter, warm morning light, shallow depth of field. No talent on camera — hands plus a single on-camera taster's reactions (face optional; can run as hands-and-glass with reaction captions if no talent). A chilled Willa's Original carton pours into a clear glass so the rich, creamy white body is the swipe-stop, condensation on the carton for freshness. The four-emotions format is delivered through NUMBERED ON-SCREEN TEXT over four quick re-grabs of the same first-sip beat, each reframed with a different captioned taste reaction. Keep the palette creamy and trend-forward (Willa's green #75C596 accents on the text cards), fast handheld micro-cuts between beats. End on the creamy pour in crisp focus with the stinger card.",
    script:[
      {scene:"HOOK", time:"0-2s", action:"Close-up, handheld: a chilled Willa's Original carton tips into a clear glass, thick creamy pour catching the light, condensation visible. On-screen text (no audio dialogue): 'watch my face the second the oat milk hits'. Quick zoom-snap onto the creamy body settling in the glass."},
      {scene:"BEAT 1 — BRACED", time:"2-5s", action:"Glass lifts toward the mouth, shoulders-up braced energy. Numbered on-screen text top-left: '1. braced →'. Caption card across the bottom: 'here we go, another watery oat milk'. Hard cut on the first sip."},
      {scene:"BEAT 2 — SURPRISED", time:"5-8s", action:"Eyebrows-up, glass pulled back to look at it. Numbered text: '2. surprised →'. Caption card: 'wait — that's actually creamy?'. Small green check graphics ping next to '4 ingredients' and '1g sugar'. Hard cut."},
      {scene:"BEAT 3 — WON OVER", time:"8-11s", action:"Second, slower sip, settling-in energy; soft-focus carton in the background. Numbered text: '3. won over →'. Caption card: 'whole oat groat — that's where the rich comes from'. Quick overhead of the creamy glass. Hard cut."},
      {scene:"BEAT 4 — HOOKED", time:"11-14s", action:"Glass set down nearly empty, reach-back-for-the-carton beat. Numbered text: '4. hooked →'. Caption card: 'organic. 4g+ protein. i'm keeping this one.' Slow push-in on the carton."},
      {scene:"END CARD", time:"14-18s", action:"Creamy pour into the glass in crisp focus, carton centered. Stinger text overlay: 'one sip. four reactions. one carton.' then the brand sign-off 'Plants, finally done right.' On-screen prompt: 'comment your face → 1, 2, 3, or 4'."}
    ],
    audio:"Warm narrative voiceover kept minimal — the format is no-audio-acting by design, so let on-screen text carry the four beats over a chill lofi kitchen track. Optional soft VO reads only the end-card stinger: 'one sip. four reactions. one carton.'",
    duration:"16-18 seconds",
    cta:{soft:"comment your face — 1, 2, 3, or 4", medium:"pour a glass and clock your own reaction", strong:"grab the creamy one and feel all four"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN22-IG-R3",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Barista",
    dnaPattern:"viral-recipe-remix",
    timing:"Fri Jun 26 · 12pm",
    priority:"HIGH",
    concept:"\"matcha got the headlines. hojicha got the oat milk.\" — first-mover recipe remix",
    intel:[
      {type:"TREND", text:"Hojicha (roasted Japanese green tea) is summer's breakout cafe drink — 'hojicha latte' searches up ~173%, cafes building iced hojicha lattes specifically around oat milk + vanilla (T-9). Unlike the matcha-shortage story, this is open whitespace: no oat brand has planted a flag. Willa's Barista is the move — toasty-nutty profile over a rich, 3g-sugar base with no rapeseed."},
      {type:"AUDIENCE", text:"Willa's home-cafe crowd discovered matcha and got priced/rationed out by the global shortage — they're hungry for the next iced ritual they can build at home. A naturally-lower-caffeine, less-bitter pour fits the afternoon-cup, no-jitters use case parents keep asking about."},
      {type:"COMPETITOR", text:"Internal: the category just funded a summer iced-coffee moment (Oatly-Nespresso flavor-spectacle, 26 markets, Jun 17 — C-1). Counter by owning the OTHER drink they didn't claim — hojicha, no special blend or co-brand required, just the carton already in the fridge. Never name a competitor on the surface."}
    ],
    hooks:[
      {text:"let's make an iced hojicha latte (dairy-free!)", recommended:true},
      {text:"matcha had its summer. hojicha is having this one.", recommended:false},
      {text:"toasty, creamy, naturally low-caffeine — your afternoon cup just got an upgrade", recommended:false}
    ],
    caption:"Matcha got the headlines. Hojicha got the oat milk. 🍵☀️ The roasted-tea wave finally hit our kitchen and we are not mad about it — this iced hojicha latte is toasty, a little nutty, naturally lower in caffeine, and so creamy it sips like a treat.\n\nWilla's Barista Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup — 50% less sugar than other barista oat milks, no rapeseed, no gums. 🥛\n\nIngredients\n- 1.5 tsp hojicha powder (roasted green tea)\n- 2 tbsp hot water\n- 1 tsp maple syrup (optional)\n- 1 cup ice\n- 3/4 cup Willa's Barista Organic Oat Milk\n- splash of vanilla\n\nWhisk the hojicha with hot water + maple until smooth. Fill a glass with ice, pour Willa's Barista over the top, add the hojicha, finish with vanilla, swirl, sip. That's the whole recipe — and the roasted-tea drink nobody in the oat lane claimed yet.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#hojicha",
      "#hojichalatte",
      "#dairyfree",
      "#icedlatte",
      "#homecafe",
      "#baristaoatmilk",
      "#organicoatmilk",
      "#summerdrinks"
    ],
    visual:"Bright, sunlit kitchen counter, warm-but-clean color temp (golden hour through a window, not muted brand stock). Lo-fi chill audio. Hands-only, no talent. Hero is the dramatic pour: roasted-amber hojicha swirling down through Willa's clean white oat base over clear ice — the toasty-tan-meets-cream contrast is the swipe-stop. Willa's Barista carton stays in frame the whole time, positioned back-left so it reads in 40%+ of shots. Clear glass so the layered swirl is visible. Crisp overhead for the whisk step, then a tight side-angle slow-zoom on the pour. Minimal props — a small whisk, a wooden spoon, a linen napkin. Trend-forward and appetizing, never infographic-y.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Overhead, bright kitchen counter. Hands set down a glass + the Willa's Barista carton (label facing camera). On-screen text fades in, sentence case: 'let's make an iced hojicha latte (dairy-free!)'. Quick whip-pan transition to next scene."},
      {scene:"THE WHISK", time:"3-8s", action:"Tight overhead: hand whisks 1.5 tsp roasted-amber hojicha powder with 2 tbsp hot water + a drizzle of maple in a small bowl until glossy and smooth. Text overlay: 'roasted green tea — less caffeine, never bitter'. Satisfying whisk ASMR."},
      {scene:"THE BASE", time:"8-13s", action:"Side angle: hand fills a clear glass with ice, then pours Willa's Barista over the top — slow, creamy, white. Carton tilts into frame mid-pour. Text overlay: 'Willa's Barista · 3g sugar · no rapeseed'. Slow-zoom on the cream filling the glass."},
      {scene:"THE POUR (PAYOFF)", time:"13-19s", action:"Macro side-angle, slow-motion: the amber hojicha cascades into the white oat base, blooming into a toasty-cream swirl over the ice. This is the hero frame. No text — let the swirl land. Tiny splash of vanilla on top."},
      {scene:"THE SIP + END CARD", time:"19-23s", action:"Hand swirls with a long spoon, lifts the finished glass into golden light beside the carton. Cut to clean end card over the still glass, text: 'matcha got the headlines. hojicha got the oat milk.' Logo lockup small bottom-center."}
    ],
    audio:"Warm narrative voiceover, low and easy, over a lo-fi chill beat. VO beats: 'roasted green tea — toasty, nutty, naturally lower in caffeine' (over whisk) → 'pour it over Willa's Barista — rich, smooth, 50% less sugar than other barista oat milks, no rapeseed' (over base) → silence on the pour, let the swirl breathe → 'the latte nobody in the oat lane claimed yet. shhh… now it's ours.' (end card).",
    duration:"20-23 seconds",
    cta:{soft:"save this for your next afternoon cup ☕", medium:"tell us: hojicha or matcha for summer? 🍵", strong:"grab Willa's Barista and build the swirl this weekend — tag us when you do"},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUN22-PIN-1",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"at-shelf-moment",
    timing:"Fri Jun 26 · 2pm",
    priority:"STANDARD",
    concept:"\"a plate where nothing has to apologize — least of all the glass\" — anti-rules breakfast board",
    intel:[
      {type:"PULSE", text:"Snack-plate / girl-dinner searches up ~300% YoY, framed explicitly as opting out of food rules — abundance, no shame (CP-11). Willa's answer leads: a pour that's only 4 ingredients (organic whole grain oats, filtered water, organic vanilla, sea salt), 1g sugar, 4g+ protein, 2g+ fiber, so it belongs on the abundant plate without being the 'good' penance item."},
      {type:"AUDIENCE", text:"Pinterest breakfast/board savers are the exact crowd quietly exhausted by optimization — they want the screenshot-able abundant plate, not a macro spreadsheet. The glass has to look like it's there for joy, not for points."},
      {type:"COMPETITOR", text:"Internal: the category just funded a summer iced-coffee spectacle and a 'simplify the label' relaunch (C-1, C-2) — both chasing where Willa's already lives. Never name them; the move is to plant Willa's IN the abundant lifestyle frame, not in a comparison."}
    ],
    hooks:[
      {text:"the snack plate that opted out of food rules", recommended:true},
      {text:"build a plate, pour a glass, call it breakfast", recommended:false},
      {text:"the abundant breakfast board, with a pour that belongs on it", recommended:false}
    ],
    caption:"The snack plate is abundance with no rules attached — assemble what's good, pour what you like, let the plate be loud. 🍓 So we built a bright one and gave it a glass that fits right in: a plate where nothing has to apologize — least of all the glass. Willa's Original isn't the 'good for you' penance item hiding in the corner of the board — it's 4 ingredients (organic whole grain oats, filtered water, organic vanilla, sea salt), 1g sugar, 4g+ protein, 2g+ fiber, made from the whole oat groat (bran and germ and all) instead of the filtered-down oat syrup most milks pour. Other oat milks filter out both the fiber AND the protein; Willa's keeps them. The whole point of an abundant plate is that nothing on it is a test. Neither is the glass. No spreadsheet, no scoring, just breakfast you'd actually screenshot.\n\nWhat we built:\n- Willa's Original, poured tall over ice\n- fresh strawberries + a handful of blueberries\n- crunchy whole-grain toast, torn not sliced\n- a soft-boiled egg with flaky salt\n- a little pile of dark chocolate squares because it's a plate, not a test",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#snackplate",
      "#girldinner",
      "#breakfastboard",
      "#dairyfree",
      "#labelcheck",
      "#organicoats",
      "#nourishthespark",
      "#realfood"
    ],
    visual:"Bright overhead flat-lay on a sunlit linen-and-wood counter, late-morning window light, warm and airy (no muted brand-kitchen stock). The hero is an abundant, slightly-imperfect breakfast snack-plate: torn whole-grain toast, fresh strawberries + blueberries, a halved soft-boiled egg with flaky salt, a small pile of dark chocolate squares. Staged DELIBERATELY next to the plate — competing for the frame, not losing to it — is a tall iced glass of Willa's Original (creamy white over clear ice, condensation, a single straw) with the Willa's Original carton standing upright just behind it, label facing camera, occupying 40%+ of the frame between the glass and carton. The pour is the visual partner to the plate, never a sad scoop of plain oats. A hand drifts into the top of the frame mid-reach for a strawberry (Pattern 09 aesthetic-IRL + Pattern 03 relatable confession). Color story: creamy white, strawberry red, oat-tan, leafy green sprig accent. Crisp text overlay, lower third, clean sans: 'a plate where nothing has to apologize.' Pinterest-native 2:3 vertical crop, screenshot-able, zero clinical infographic energy.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for your next slow morning", medium:"build your own no-rules plate — tag what's on it", strong:"grab Willa's Original and pour the glass your plate deserves"}
  },
  {
    id:"JUN22-TT-7",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Barista",
    dnaPattern:"before-after-stitch",
    timing:"Fri Jun 26 · 7pm",
    priority:"STANDARD",
    concept:"\"shake it cold and it foams like a cafe machine did it.\" — home cold-foam iced latte",
    intel:[
      {type:"COMPETITOR", text:"Internal: the big oat name launched the second chapter of its branded Nespresso iced-coffee collab Jun 17, 2026 (C-1) — four curated recipe drinks. Funded coffee content is flooding the feed, so a clean home cold-foam build rides the same attention without buying anyone's kit. Never name the brand on the surface; don't frame Willa's as the category 'catching up' — just show the better pour."},
      {type:"AUDIENCE", text:"Willa's buyer wants the cafe-summer iced latte but flips the carton first — she clocks rapeseed, gums, and a 7g+ sugar pour, and she's quietly proud she can build a better cold foam at her own counter without a machine."},
      {type:"TREND", text:"Oat is becoming the default cafe pour with no upcharge (T-3) — a campus study pushed plant-milk use from 16.6% to 51.9% when oat was the default. The home upgrade is the carton already in the fridge: shake it cold, it froths, done."}
    ],
    hooks:[
      {text:"20 seconds in a jar — shake it cold and it foams like a cafe machine did it.", recommended:true},
      {text:"before: a four-recipe iced-coffee tutorial. after: oats, ice, one shake.", recommended:false},
      {text:"pov: cafe cold foam at your own counter, 50% less sugar than other barista oat milks.", recommended:false}
    ],
    caption:"Let's make a cold-foam iced latte (dairy-free!) ☕️\n\nThe summer heat had us craving that pretty cafe pour at home — no machine, no barista, no $7. Here's the trick that still surprises us: shake it cold and it foams like a cafe machine did it. Twenty seconds in a jar, and the espresso cascades down through a real cloud of foam.\n\nWilla's Barista uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein per cup — 50% less sugar than other barista oat milks, 4g protein, no rapeseed, no gums. 🥛\n\nIngredients\n- 1 cup Willa's Barista Organic Oat Milk\n- 1 double shot espresso or 1/2 cup strong cold brew\n- ice\n- optional: a splash of maple + a pinch of sea salt\n\nShake the Willa's Barista cold until frothy, pour over ice, float the espresso on top, and let it cascade. That's it — same gorgeous build, half the sugar.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#icedlatte",
      "#baristaoatmilk",
      "#homecafe",
      "#dairyfree",
      "#lesssugar",
      "#cleaningredients",
      "#coldfoam",
      "#icedcoffee"
    ],
    visual:"Bright, high-summer, sun-through-the-window kitchen — warm daylight, white marble or pale wood counter, a sweating clear glass full of ice as the hero. SPLIT-STITCH energy without a face: open on a fast, slightly chaotic 'before' beat (a cluttered counter with a phone propped to a multi-step iced-coffee tutorial, too many bottles, hands fumbling) then hard-cut to the calm 'after' — one carton, one glass, one shake. Willa's Barista carton stays in frame 40%+, label legible, condensation on the glass. Macro on the cold foam building inside the clear shaker, then the espresso cascading down through the ice in slow-mo. Trend-forward color: golden coffee against clean white oat pour against bright daylight. Hands + product + kitchen only, no talent on camera. End on the finished glass with the carton beside it, light catching the foam.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Fast handheld over a cluttered counter — a phone propped showing a multi-step iced-coffee tutorial, multiple bottles, hands fumbling. Text overlay (top): 'let's make a cold-foam iced latte (dairy-free!)' · quick jitter-zoom on the mess. Trending hard-cut sound stab cues the flip."},
      {scene:"TURN", time:"3-7s", action:"HARD CUT to calm bright frame: a single hand sets down one Willa's Barista carton next to an empty ice-filled glass, everything else gone. Text overlay: 'no machine. one shake.' Carton label dead center, sunlit."},
      {scene:"BUILD", time:"7-13s", action:"Macro: hand pours Willa's Barista into a clear shaker over ice, lid on, fast 20-second shake — cold foam visibly builds inside the shaker. Cut: pour the frothy oat over the fresh glass of ice in slow-mo. Text overlay fades in line by line: 'no rapeseed · no gums · froths cold.'"},
      {scene:"PAYOFF", time:"13-18s", action:"Slow-mo macro: dark espresso floats on top and cascades down through the pale oat pour — the swipe-stop money shot. Text overlay: '50% less sugar than other barista oat milks.' Glass sweating in the light."},
      {scene:"END CARD", time:"18-22s", action:"Pull back to finished iced latte beside the Willa's Barista carton, foam catching daylight. Text overlay stinger: 'the oat milk your coffee deserves.' Small Willa's logo bottom corner. Hold."}
    ],
    audio:"Warm narrative voiceover, light and a little cheeky, over a lofi-summer beat. VO beats: 'shake it cold and it foams like a cafe machine did it … one carton, one jar, twenty seconds. froths cold, half the sugar, no rapeseed, no gums. pour it over ice and let it cascade.' Use a peaking lofi/chill TikTok sound under the VO for FYP reach.",
    duration:"20-22 seconds",
    cta:{soft:"save this for your next iced-coffee morning ☕️", medium:"grab Willa's Barista and shake your own cold foam — comment your go-to ratio", strong:"find Willa's Barista at the link and make cold foam at home your summer default"},
    benefitShorthandId:"BS-4"
  },
  {
    id:"JUN22-IG-R4",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"viral-recipe-remix",
    timing:"Sat Jun 27 · 11am",
    priority:"HIGH",
    rideNow:false,
    concept:"\"grandma's icebox cake, minus the dairy\" — heritage no-bake remix",
    intel:[
      {type:"PULSE", text:"Filipino mango float — the no-bake icebox cake of summer 2026 — is everywhere on FoodTok, built entirely on condensed milk + heavy cream (CP-6). Willa's answer: rebuild the whole cream layer dairy-free with whipped coconut cream + Willa's Original and a maple 'condensed' swirl — a heritage dessert remade clean, 4 organic ingredients in the carton doing the heavy lifting."},
      {type:"AUDIENCE", text:"Willa's buyers want the nostalgic, abundance-coded treat without the sugar bomb or the dairy. A heritage dessert remade dairy-free hits 'real food, reinvented forward' dead center — and a strong mango season means everyone's already saving mango float videos, so the format reach is pre-built."},
      {type:"COMPETITOR", text:"Internal: the category is pouring spend into summer flavor-spectacle (iced-coffee collabs, ube/hojicha drink discovery) — almost no oat brand is showing up in the no-bake dessert lane where Willa's whole-oat creaminess actually wins. Whitespace. Never name a competitor on the surface."}
    ],
    hooks:[
      {text:"let's make dairy-free mango float", recommended:true},
      {text:"the no-bake summer cake your grandma would actually recognize", recommended:false},
      {text:"mango float, but the whole cream layer is just coconut + a four-ingredient carton", recommended:false}
    ],
    caption:"Mango season is peaking and we couldn't stop thinking about mango float — the no-bake icebox cake we all want a slice of. 🥭☀️ The classic runs on condensed milk + heavy cream, so we rebuilt the whole cloud dairy-free, and shhh… you'd genuinely fight someone for the corner piece. Grandma's icebox cake, minus the dairy.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 It's what makes the cream layer taste like the real thing — 1g sugar, 4g+ protein, 4 ingredients on the carton (organic whole grain oats, filtered water, organic vanilla extract, sea salt).\n\nReal food, reinvented forward.\n\nIngredients\n- 1 cup Willa's Organic Oat Milk\n- 1 can full-fat coconut cream, chilled overnight\n- 3 tbsp maple syrup (for the 'condensed' swirl)\n- 1 tsp vanilla extract\n- 2 ripe mangoes, thinly sliced\n- 1 sleeve graham crackers\n- pinch of sea salt",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#mangofloat",
      "#dairyfree",
      "#nobakedessert",
      "#dairyfreedessert",
      "#summerrecipes",
      "#wholeplant",
      "#organicoatmilk",
      "#realfoodreinvented"
    ],
    visual:"Bright, sun-drenched kitchen, warm daylight pouring across the counter — peak summer abundance energy. Lofi/chill audio, hands-in-frame throughout (Christina-rule: no talent on camera). Open on a tower of ripe mangoes + a chilled can of coconut cream sweating beside the Willa's Original carton (carton visible behind the build for 40%+ of the run). Overhead + 45-degree close-ups of the layering: graham crackers, the whipped coconut-cream-and-Willa's cloud spooned and swirled, fans of golden mango. Color story is creamy white + sunshine gold + the green Willa's accent. Final beat is a clean cross-section slice pull revealing the layers — the swipe-stop. Keep it tactile and editorial, not stock-photo; the dessert AND the carton both read as heroes in frame.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Overhead, fast: hands sweep ripe mangoes + chilled coconut cream can + Willa's Original carton into a sunny frame on a marble counter. On-screen text (sentence case): 'let's make dairy-free mango float'. Quick whip-pan transition to the mixing bowl."},
      {scene:"CREAM LAYER", time:"3-8s", action:"Close-up, 45-degree: hand pours 1 cup Willa's Original into a bowl of chilled coconut cream, adds maple + vanilla, whisks to soft peaks. Carton stays in soft-focus behind. Text overlay: 'the cream layer = whipped coconut cream + Willa's. zero dairy, all cloud.'"},
      {scene:"LAYER IT", time:"8-14s", action:"Overhead: hands lay graham crackers, spoon and swirl the oat-coconut cloud, fan golden mango slices across the top. Repeat once, satisfying and rhythmic. Text overlay: '4 organic ingredients in the carton. 1g sugar. that's the whole trick.'"},
      {scene:"THE SET", time:"14-18s", action:"Quick time-passes wipe (fridge door close → open). Then the slow reveal: knife pulls a clean slice, lifting it to show the layered cross-section. Handheld, intimate. Text overlay: 'grandma's icebox cake, minus the dairy.'"},
      {scene:"END CARD", time:"18-22s", action:"Soft push-in on a plated slice beside the Willa's Original carton, mango glistening. Benefit stinger card fades up: 'real food, reinvented forward.' Willa's logo lower third."}
    ],
    audio:"Warm narrative voiceover over lofi/chill summer beat — unhurried, kitchen-table tone. VO carries the hook and the two proof lines (whole oat, 1g sugar, 4 ingredients) without over-explaining; lets the layering ASMR breathe in the gaps.",
    duration:"20-22 seconds",
    cta:{soft:"save this for your next mango haul 🥭", medium:"the no-bake slice that earns a second helping — tag who you're making it with.", strong:"grab Willa's Original and rebuild the icebox cake dairy-free — recipe's in the caption."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUN22-TT-3",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Barista",
    dnaPattern:"viral-recipe-remix",
    timing:"Sat Jun 27 · 11am",
    priority:"HIGH",
    rideNow:false,
    concept:"\"the purple does the talking. the carton does the rest.\" — viral ube latte remix",
    intel:[
      {type:"PULSE", text:"Ube (Filipino purple yam) is the breakout drink ingredient of summer, all over cafe menus as iced ube lattes, with the #ube tag at 118k+ posts and TikTok obsessed with the purple-on-cream contrast (CP-5). Willa's Barista is the swap that makes the pour clean — 50% less sugar than other barista oat milks, no rapeseed, no gums — so the dramatic color lands on a base that actually reads good on the label."},
      {type:"AUDIENCE", text:"Home-cafe creators want the cafe drink without the cafe price or the mystery deck. The win here is a 60-second build they can recreate Saturday morning — and the purple swirl is the share trigger that makes them stitch their own version."},
      {type:"COMPETITOR", text:"Internal: the category just funded a summer iced-coffee moment (Oatly-Nespresso flavor-spectacle collab into 26 markets, Jun 17 — C-1). Willa's counter is the no-special-blend-required home pour: same gorgeous cold build, half the sugar, no rapeseed. Never name a competitor on the surface."}
    ],
    hooks:[
      {text:"let's make an iced ube oat latte (dairy-free!)", recommended:true},
      {text:"the prettiest latte of the summer is purple — and it's dairy-free", recommended:false},
      {text:"ube latte at home > $7 cafe ube latte (and the label's cleaner)", recommended:false}
    ],
    caption:"Ube season has us in a happy little chokehold, and honestly? earned it. 💜 This iced ube oat latte is earthy-sweet, creamy, and the exact shade of purple that stops a thumb mid-scroll.\n\nHere's the part nobody clocks: the purple does the talking, the carton does the rest. Willa's Organic Barista Oat Milk is the clean white base under all that drama — simple organic ingredients and the whole entire oat for a rich, smooth taste, 50% less sugar than other barista oat milks, no rapeseed, no gums. 🥛\n\nIngredients:\n- 1 cup Willa's Organic Barista Oat Milk\n- 1 tbsp Suncore Foods ube purple yam powder (or 2 tbsp ube halaya, dairy-free)\n- 1 tsp maple syrup (or to taste)\n- ½ cup brewed coffee or 1 shot espresso, chilled\n- ice\n\nWhisk the ube powder + maple + a splash of warm water into a smooth paste. Pour over ice, layer in chilled coffee, then float Willa's Barista on top and watch the purple bloom. ☀️",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#ubelatte",
      "#ube",
      "#icedlatte",
      "#dairyfree",
      "#homecafe",
      "#oatmilklatte",
      "#baristaoatmilk",
      "#summerdrinks"
    ],
    visual:"Bright, sun-washed home kitchen, lofi/chill audio. Lead frame is the vivid purple ube paste hitting the clean white Willa's Barista pour — that color contrast IS the swipe-stop, let it do the work. Hands-in-frame throughout, no talent on camera. Carton visible behind the glass for 40%+ of the runtime, label readable. Tall clear glass, lots of ice, slow purple bloom as the layers settle. Crisp daylight, high color saturation on the ube, warm neutral counter. End card lands the Barista stinger over the finished swirl. Trend-forward, fast cuts on the build, one slow hero shot on the bloom.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Overhead close-up: hands set a tall glass + the Willa's Barista carton on a sunlit counter. On-screen text (sentence case, big): 'let's make an iced ube oat latte (dairy-free!)'. Quick whip-pan transition to the next scene."},
      {scene:"THE PASTE", time:"3-9s", action:"Tight macro: hand whisks vivid purple Suncore Foods ube powder + maple + a splash of warm water into a glossy paste in a small bowl. Text overlay: '1 tbsp ube + a little maple = the color.' Satisfying whisk ASMR."},
      {scene:"THE POUR", time:"9-15s", action:"Hand spoons the purple paste over a glass packed with ice, then pours chilled coffee — the dark coffee meets purple. Text overlay: 'ice. coffee. then the good part →' Camera holds steady, handheld-natural."},
      {scene:"THE BLOOM (hero)", time:"15-21s", action:"Slow-motion hero shot: hand pours Willa's Barista over the top — clean white cream cascades and the purple blooms up through it. Carton held just behind the glass, label facing camera. Text overlay: 'no rapeseed. no gums. 50% less sugar than other barista oat milks.'"},
      {scene:"THE STIR", time:"21-26s", action:"Top-down: a straw swirls the purple and cream into a marbled lavender. Quick condensation drip on the glass. Text overlay: 'the purple does the talking.'"},
      {scene:"END CARD", time:"26-30s", action:"Final glass in sunlight, Willa's Barista carton beside it. Benefit stinger text card animates in: 'the oat milk your coffee deserves.' Small Willa's wordmark lower-third."}
    ],
    audio:"Warm narrative voiceover over lofi/chill beat — light, conversational, with-a-wink. VO walks the 3 steps fast, lands the proof point ('50% less sugar than other barista oat milks, no rapeseed') on the bloom shot, closes on the swirl.",
    duration:"28-30 seconds",
    cta:{soft:"save this for your next sunny morning ☀️", medium:"tag whoever owes you a coffee date — make them this instead", strong:"grab Willa's Barista and make the prettiest latte of your summer 💜"},
    benefitShorthandId:"BS-4"
  },
  {
    id:"JUN22-TT-6",
    platform:"TikTok",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Sat Jun 27 · 12pm",
    priority:"STANDARD",
    concept:"\"you shouldn't need a chemistry degree to pour your kid a drink.\" — clean-by-default parent POV (Pattern 03)",
    intel:[
      {type:"TREND", text:"30+ states have introduced bills to ban or restrict food dyes and chemicals of concern, many aimed squarely at kids' food (T-5). Willa's Kids already clears the bar the statehouses are racing toward — organic, no dyes, no isolates, top-9 allergen-free, 8g protein, a perfect Yuka 100. Lead with the carton being clean by default; the state-by-state pressure is the backdrop, not the headline."},
      {type:"AUDIENCE", text:"Parents shouldn't have to be amateur toxicologists to pick a kids' drink. The pain point: a kids' beverage aisle full of dye numbers and syrups they can't pronounce, while lawmakers play whack-a-mole one chemical at a time. Speak to the parent who just wants a default they can pour without a second thought — the relief is in not having to fight the aisle at all."},
      {type:"COMPETITOR", text:"Internal: the dairy-free kids RTD lane is organic-but-sugary (leading organic kids shake 9g cane sugar) or simple-but-not-organic (major pea-milk kids line 5g cane sugar, not organic), and a fresh $17M raise is heating the kids-protein race (T-10). Never name them on the surface — Willa's Kids holds 8g protein, 6g sugar from organic maple, DHA, top-9 allergen-free, Yuka 100. Contrast stays 'vs. the average kids' drink' only."}
    ],
    hooks:[
      {text:"POV: you pour your kid a drink and don't have to google a single ingredient first.", recommended:true},
      {text:"states are banning food dyes one bill at a time. or you could just pour the carton that never had them.", recommended:false},
      {text:"the kids' drink aisle is a chemistry quiz. Willa's Kids is the one with five ingredients.", recommended:false}
    ],
    caption:"Willa's Kids was built clean from the start — organic, no dyes, no isolates, top-9 allergen-free, 8g protein, and a Yuka 100. You shouldn't need a chemistry degree to pour your kid a drink. 🌾\n\nRight now 30+ states are racing to pull food dyes and sketchy additives out of kids' food, one bill at a time. Willa's Kids is already on the other side of that fight: 8g protein (same as dairy), 6g sugar from organic maple, plant-based DHA, and free of the top 9 allergens — no nut, soy, gluten, dairy, sesame. We use the whole oat, bran and germ and all, not oat syrup, so the good stuff stays in.\n\nMost kids' drinks lean on cane sugar, rice syrup, or a color number you'd have to look up. The Willa's Kids ingredient list is short on purpose — nothing to decode, nothing to second-guess.\n\nParents asked us for a kids' carton they could trust without a second thought. We listened. 🥛\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC",
    hashtags:[
      "#willas",
      "#willaskids",
      "#dyefree",
      "#oatmilk",
      "#kidsnutrition",
      "#momsoftiktok",
      "#cleanlabel",
      "#dairyfreekids",
      "#allergenfriendly",
      "#labelcheck"
    ],
    visual:"Bright, sun-washed weekend kitchen — windows open, warm cream + wood tones, lofi-warm grade, lots of natural light and quick hands-in-frame movement. NO talent's face required (Christina-rule default); a real parent's hands do all the work, with a kid's hand entering at the end. Open on the relatable chaos of a fridge door crowded with brightly-colored kids' drinks, then the hand reaches past all of it and pulls the Willa's Kids carton in one calm grab. The whole sequence is hands + product + kitchen + text overlays. Willa's Kids carton holds frame 40%+ of runtime: the grab, the back-label beat, the maple-cream pour into a kid's cup, condensation catching light. Color is creamy + cheerful, not muted-wellness; quick warm cuts, then one slow beat on the pour to let it breathe. End card lands the stinger over the carton on a clean cream background.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Eye-level into an open fridge: a shelf crowded with brightly-colored, syrup-heavy kids' drinks. A parent's hand hovers, then reaches past all of it and grabs ONE — the Willa's Kids carton. Text overlay (bold, top-center): 'POV: you don't have to google a single ingredient.' Quick whip-cut on the grab."},
      {scene:"RELIEF BEAT", time:"3-7s", action:"Close-up: the same hand sets the Willa's Kids carton on a sunlit counter, label facing camera, with a calm exhale. Text overlay fades in: 'built clean from the start.' Carton fills 45% of frame. Lofi beat settles, warm kitchen blur behind."},
      {scene:"THE PROOF", time:"7-13s", action:"Clean overhead: carton flipped to its back label, finger traces the short list. On-screen ticks animate in beside the label, one line at a time: '8g protein ✓  6g sugar — organic maple ✓  no dyes ✓  top-9 allergen-free ✓.' Text overlay: 'nothing to decode.' Handheld-gentle, daylight. No competitor shown."},
      {scene:"THE POUR", time:"13-18s", action:"Cut to the maple-cream pour into a kid's cup — creamy swirl, condensation on the glass, morning light through it. Text overlay: 'organic. no chemistry degree required.' A small kid's hand enters frame and lifts the cup."},
      {scene:"END CARD", time:"18-21s", action:"Clean cream background, Willa's Kids carton centered, cup beside it. Stinger text resolves: 'parents asked. we listened. Yuka 100 · top-9 allergen-free.' Logo lockup fades up. Hold 2 beats on the still carton, lofi resolves."}
    ],
    audio:"Warm narrative voiceover over a lofi-warm morning-kitchen beat. VO leads with the benefit, unhurried and a little wry — the sound of a parent who's relieved they don't have to fight the aisle: 'you shouldn't need a chemistry degree to pour your kid a drink.' Conversational, parent-to-parent warmth, not clinical. Soft ambient kitchen sound (pour, cup set down) under the music; lands the stinger on the end card.",
    duration:"20-21 seconds",
    cta:{soft:"what's the one carton you never have to think twice about? 🌾", medium:"the kids' carton with nothing to decode — Willa's Kids.", strong:"skip the chemistry quiz in the aisle — grab Willa's Kids."},
    benefitShorthandId:"BS-3"
  },
  {
    id:"JUN22-PIN-2",
    platform:"Pinterest",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Original",
    dnaPattern:"before-after-stitch",
    timing:"Sat Jun 27 · 3pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"this isn't the carton you try once. it's the one that quietly never leaves the grocery list.\" — keeper-pour rec pin",
    intel:[
      {type:"PULSE", text:"The wellness internet named its 2026 mood #JoyMagenta — permission to enjoy your food instead of scoring it (CP-9). That mood is the lead here, not a stat: the carton you keep re-buying is the one that earns a place in the morning because you actually look forward to it, not because an app told you to. Willa's Original — rich, smooth, 1g sugar, 4g+ protein — is the repeat-pour, and the pin frames it as a recommendation, not a report card."},
      {type:"AUDIENCE", text:"Pinterest's 'pin it to my grocery list' savers don't pin things to try once — they pin the staples they want to find again. The save-and-shop pin that wins for this audience is the quiet recommendation: the friend-tested carton that ends up on the list every week, photographed so it's instantly recognizable on the shelf. Lead with the keeper status, not a teardown of anything else on the aisle."},
      {type:"COMPETITOR", text:"Internal: legacy RTD names are racing toward shorter lists and more protein (C-2 is the latest 'simplify the label' relaunch), but that's backdrop context for why a genuinely simple, whole-oat carton stands out as a keeper — it is NOT the framing for this pin. Never name a competitor on the surface; use 'most oat milks' / 'average oat milk' only. Do NOT frame this as the category catching up to Willa's — that lane is rested this week. Keep the pin about why people re-buy this one, full stop."}
    ],
    hooks:[
      {text:"the oat milk that doesn't get tried once — it gets re-bought on every grocery run.", recommended:true},
      {text:"pin this to your grocery list: the keeper-pour, not the one-time experiment.", recommended:false},
      {text:"rich, smooth, 1g sugar — the carton that quietly becomes a fridge fixture.", recommended:false}
    ],
    caption:"this isn't the carton you try once. it's the one that quietly never leaves the grocery list.\n\nthe wellness internet decided 2026 is about joy over scorekeeping — enjoying your morning instead of grading it. this is the pour that keeps coming back: rich, smooth, and something you actually reach for.\n\nwhy it stays in the cart:\n• 1g sugar, 4g+ protein, 2g+ prebiotic fiber\n• Willa's Original is the whole oat groat — bran, germ, and all, like steel-cut oats — so the protein and fiber stay in instead of getting filtered out\n• USDA Organic · Non-GMO · Certified Glyphosate Residue Free · Yuka 94/100\n• Good Food Awards winner · WBENC mother-founded\n\nrich and smooth, no chalk, no gums faking the body back. the kind of carton that turns into a standing order.\n\npin it to your grocery list — then go pour a glass and see why it sticks.\n\nplants, finally done right.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#wholeoat",
      "#grocerylist",
      "#pantrystaples",
      "#organicoatmilk",
      "#realfood",
      "#plantmilk",
      "#oatmilkreview",
      "#cleaneating"
    ],
    visual:"Bright, editorial Pinterest still — vertical 2:3, sunlit and trend-forward, not muted brand-stock. Willa's Original carton standing front-and-center on a clean creamy-white surface, joined by a soft 'keeper' prop story that signals 'this lives here': a clear glass of thick, creamy oat milk, a small notepad grocery list with 'Willa's Original' written in at the top, and a few whole oat groats scattered as texture. Carton occupies 40%+ of the frame. Overlay a tidy, recommendation-style 'why it stays' card in the Reviews/Recs purple (#A191B2): three short lines — 'the keeper pour' / 'rich · smooth · 1g sugar' / 'Yuka 94 · Good Food Awards.' The whole composition reads as a warm recommendation a friend would screenshot, not a teardown — scannable at thumbnail size. Daylight, airy negative space at top for the headline overlay, no talent on camera (hands + product only; Christina-reserved is NOT used here). Headline text top-third: 'the carton that ends up on the list for good.' Sub-line near the carton: 'not a one-time try — a standing order.'",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"pin this to your grocery list.", medium:"save it and grab Willa's Original on the next run — taste why it stays.", strong:"make Willa's Original the standing order in your cart — the one pour you keep re-buying every week."}
  },
  {
    id:"JUN22-TT-5",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"before-after-stitch",
    timing:"Sun Jun 28 · 10am",
    priority:"STANDARD",
    concept:"\"a breakfast you'd actually share, not just survive.\" — joy-magenta celebrate-food stitch",
    intel:[
      {type:"PULSE", text:"The wellness internet named its year #JoyMagenta — abundance over scarcity, gratitude, shared meals (CP-9). Willa's IS the celebrate-food brand: real food, 1g sugar, 4 ingredients, organic — the joyful pour you reach for, not ration. Lead with the carton as the happy thing, the culture-moment as the backdrop."},
      {type:"AUDIENCE", text:"Willa's buyer has spent years treating breakfast like a task to get right and wants it to feel like a treat again (overlaps the snack-plate abundance wave, CP-11). She isn't looking for another framework — she wants a pour she genuinely loves on the table. The arc from 'breakfast as chore' to 'breakfast as the good part' is the exact shift she's living."},
      {type:"COMPETITOR", text:"Internal: the category is funding a flavor-spectacle summer (curated iced-coffee collabs, RTD relaunches racing to simplify their ingredient list). The whitespace nobody's claiming is the emotional one — permission to enjoy, not optimize. Never name a competitor on the surface; own the feeling, not the feature war."}
    ],
    hooks:[
      {text:"the breakfast that felt like homework. and the one that feels like a treat.", recommended:true},
      {text:"when a glass of oat milk goes from 'fine, i guess' to 'oh, this is the good part.'", recommended:false},
      {text:"POV: breakfast stopped being a task and started being something you'd share.", recommended:false}
    ],
    caption:"a breakfast you'd actually share, not just survive.\n\nWilla's Original is the pour you reach for on purpose — real food, made from the whole oat groat (the whole oat kernel, bran and germ and all), not oat syrup.\n\nthe receipts, since the ingredient list is the best part:\n• 1g sugar, from the oats — nothing added\n• 4g+ protein · 2g+ prebiotic fiber per cup\n• 4 ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt\n• USDA Organic · Certified glyphosate-free (tested every lot)\n• Yuka 94/100\n\nthe whole point: the carton you'd happily pour for the people at your table. nourish the spark — abundance, not restriction.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#joymagenta",
      "#realfood",
      "#organicoatmilk",
      "#wholeoat",
      "#1gsugar",
      "#cleaneating",
      "#breakfastvibes",
      "#nourishthespark"
    ],
    visual:"Bright, sunlit, slow-paced — a Sunday-morning kitchen with windows open. Two-act before/after stitch held entirely in hands + product, no talent on camera. ACT ONE (cooler, busier, slightly joyless): a sparse, dutiful counter — a lone bowl of plain dry oats, a half-eaten piece of dry toast, a propped phone, grey morning light. Quick, flat cuts; muted desaturated grade — breakfast as a chore. ACT TWO (warm, golden, unhurried, abundant): the dull plate slides out of frame, replaced by a bright snack-plate spread — berries, a warm pastry, and the hero: a single tall glass and the Willa's Original carton catching morning light. One long, glossy slow-pour of creamy oat milk into the glass — the hero shot, the whole post. Carton on screen 40%+ throughout act two, label readable. Warm honey-gold grade, soft lens flare, condensation on the glass. End card: clean cream background, carton beside the full glass + a few berries, stinger text. Trend-forward, editorial, zero clinical wellness-brand earnestness.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Cold open on a sparse, dutiful counter — hand sets down a lone bowl of plain dry oats beside a piece of dry toast, grey morning light. Cool desaturated grade, flat handheld cut. Text overlay (top): 'breakfast as a task.' Hard match-cut transition primed."},
      {scene:"BEFORE", time:"3-7s", action:"Tight close-up: hand pushes the plain oats around the bowl, a forkful of dry toast, no joy in the frame. Cuts stay flat + a little gloomy. Text overlay: 'eat it because you should.' Color stays muted."},
      {scene:"TURN", time:"7-11s", action:"Whip-pan / hand swipes the dull plate clean OUT of frame. Light blooms warm as it leaves. A bright snack-plate (berries, a warm pastry) and the Willa's Original carton slide IN, label facing camera. Grade shifts to golden in real time. Text overlay: 'or… the part you look forward to.' (whip-pan transition)"},
      {scene:"AFTER (HERO POUR)", time:"11-17s", action:"The whole point of the post: overhead-then-side slow-motion pour of creamy Willa's Original into a tall glass, sunlit, condensation forming, berries scattered beside it. Carton held beside it, 40%+ of frame. No overlay for 2 beats — let the pour breathe — then text fades in: '1g sugar. 4 ingredients. all the good part.'"},
      {scene:"PROOF", time:"17-21s", action:"Quick warm close-up: hand turns the carton to the ingredient list, finger traces the 4 lines. Text overlay: 'organic whole grain oats, water, vanilla, sea salt. that's the list.' Soft, unhurried — confident, not clinical."},
      {scene:"END CARD", time:"21-24s", action:"Clean cream background, full glass beside the Willa's Original carton + a few berries in golden light. Stinger text (BS end card): 'a breakfast you'd actually share, not just survive.' Small sign-off beneath: 'nourish the spark.'"}
    ],
    audio:"Warm narrative voiceover, unhurried + a little wry — reads the before/after arc like a friend who finally let herself enjoy the morning again. Lofi/chill morning beat under it, soft and golden, builds gently at the hero pour. No trending-aggressive sound; the calm joy IS the point.",
    duration:"22-24 seconds",
    cta:{soft:"what's the breakfast that finally feels like a treat for you? 👇", medium:"pour one Sunday morning and let it be the good part — see how that feels.", strong:"make breakfast the part you look forward to — Willa's Original, the pour you'd share."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN22-IG-R5",
    platform:"Instagram Reel",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Sun Jun 28 · 12pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"the whole oat, nothing pulled out, nothing faked back in.\" — whole-oat POV",
    intel:[
      {type:"TREND", text:"California's Assembly passed AB 2244, a first-in-the-nation state 'Non-Ultraprocessed Certified' label, with products classified as UPF barred from carrying it (T-4). Lead with Willa's answer: whole oat groat, 4 ingredients, no isolates, no gums. The bill is backdrop only — the brief is about what's physically in the carton, not about who got there first."},
      {type:"AUDIENCE", text:"Label-literate parents and clean shoppers are tracking 'ultra-processed' becoming something a state can define. They want to know which oat milk is whole-food simple right now — and they reward a brand that shows the ingredients plainly instead of explaining a process. Keep it about the food, not the policy fight."},
      {type:"COMPETITOR", text:"Internal: most oat milks filter out the bran + germ (both fiber AND protein), then process the starch into sugar and add gums + isolates — the exact profile a UPF definition flags. Never name a competitor on the surface; use 'most oat milks' / 'average oat milk' framing only. (Comp context: C-2 'simplify the label' relaunch signals the category is racing toward shorter lists.)"}
    ],
    hooks:[
      {text:"this is the whole oat — bran, germ and all. most oat milks throw that part out.", recommended:true},
      {text:"1g sugar. 4 ingredients. nothing isolated, nothing gummed back in.", recommended:false},
      {text:"a state is now defining 'not-ultra-processed.' this carton is just oats, water, vanilla, salt.", recommended:false}
    ],
    caption:"the whole oat, nothing pulled out, nothing faked back in.\n\nWilla's Original is made from the entire oat groat — bran, germ and all, the way steel-cut oats are. most oat milks filter out the bran + germ (the fiber AND the protein), process the starch into sugar, then add gums to fake the body back.\n\nWilla's keeps it whole:\n• organic whole grain oats\n• filtered water\n• organic vanilla extract\n• sea salt\n\nthat's the whole recipe. 1g sugar · 4g+ protein · 2g+ prebiotic fiber.\n\nUSDA Organic · Non-GMO · certified glyphosate-free, tested every lot.\n\nCalifornia just passed a first-in-the-nation 'Non-Ultraprocessed Certified' label. whichever way the rules land, this is what whole-food simple actually tastes like.\n\nplants, finally done right.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#wholeoat",
      "#labelcheck",
      "#cleaningredients",
      "#notultraprocessed",
      "#organicoatmilk",
      "#realfood",
      "#plantmilk",
      "#wholeoatgroat"
    ],
    visual:"Bright, sunlit kitchen, warm daylight, airy and trend-forward — not muted brand-stock. Open on whole oat groats in a wooden scoop (steel-cut look) tumbling in soft light, then rack focus to the Willa's Original carton on a clean marble counter, carton occupying 40%+ of frame throughout. A slow, thick, creamy pour of the oat milk into a clear glass so the body reads rich, not watery. Tasteful overlay text in the Health/Wellness creamy blue (#73B2C9) names the four ingredients one at a time. Color palette leans creamy-white. No talent on camera — hands + product + kitchen + text overlays carry it (Christina-reserved is NOT used here). End on the full glass beside the carton with the four-ingredient line legible and the sign-off card.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Close-up, soft daylight: whole oat groats tumble from a wooden scoop into frame (steel-cut look). Rack focus to the Willa's Original carton on a sunlit marble counter. Text overlay (creamy blue, top third): 'this is the whole oat — bran, germ and all.' Quick beat-matched cut."},
      {scene:"SOLUTION", time:"3-8s", action:"Hands enter and set a clear glass beside the carton. Overlay fades in line by line: 'organic oats · water · vanilla · sea salt.' Then a stamp-in: 'that's the whole recipe.' Tight insert of the groats holds for 0.5s as the whole-oat proof."},
      {scene:"CONTRAST", time:"8-14s", action:"Overhead: the clear glass centered. Text overlay: 'most oat milks filter out the bran + germ — the fiber AND the protein — then process the starch into sugar.' Quick visual: a thin, watery pour, then cut to Willa's thick, creamy pour into the glass. Overlay: 'then add gums to fake the body back.'"},
      {scene:"PROOF", time:"14-19s", action:"Tight on the carton front. Stinger overlays stagger in: '1g sugar · 4g+ protein · 2g+ fiber · 4 ingredients.' Small cert chips animate along the bottom: 'USDA Organic · glyphosate-free · tested every lot.' Hand sets the full creamy glass next to the carton."},
      {scene:"PAYOFF", time:"19-23s", action:"Slow push-in on the carton beside the full glass. Text overlay (the zinger): 'the whole oat, nothing pulled out, nothing faked back in.' Hold."},
      {scene:"END CARD", time:"23-25s", action:"Carton centered on clean creamy-white background. Sign-off text: 'plants, finally done right.' Small Willa's wordmark beneath. Cut to black."}
    ],
    audio:"Warm narrative voiceover, calm and assertive — activist confidence, not combative. Soft lofi/acoustic kitchen bed underneath, low and unhurried. VO beats track the overlays: open on the whole-oat line, land the four ingredients slowly, drop register slightly on the closing zinger.",
    duration:"23-25 seconds",
    cta:{soft:"see the four ingredients for yourself.", medium:"find Willa's Original and pour a glass — the body says it all.", strong:"switch the carton your whole family drinks from to the whole-oat one."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUN22-PIN-3",
    platform:"Pinterest",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Chocolate",
    dnaPattern:"kid-family-moment",
    timing:"Sun Jun 28 · 2pm",
    priority:"STANDARD",
    concept:"\"the halftime chocolate milk the kids cheer for and the label can't argue with\" — World Cup snack-spread pin",
    intel:[
      {type:"PULSE", text:"One in four Americans say the 2026 World Cup made them new soccer fans, and watch parties are spilling into every kitchen (CP-8). Willa's answer: a halftime chocolate milk made with real cacao and 5 ingredients — so the kids cheer and the parents don't wince at the back of the box."},
      {type:"AUDIENCE", text:"Pinterest planners build the snack table, not the game — they save 'easy gathering spread' and 'kid-friendly party food' pins days ahead. This is the host who wants the spread to feel abundant and effortless, not a sugar minefield to police."},
      {type:"COMPETITOR", text:"Internal: the category poured its summer budget into iced-coffee flavor spectacle for grown-ups , leaving the kids' watch-party pour wide open. Never name a competitor on the pin — own the clean treat that earns a cheer."}
    ],
    hooks:[
      {text:"the watch-party chocolate milk that isn't a halftime sugar bomb", recommended:true},
      {text:"real cacao, 5 ingredients, 11g sugar — the kids' pour the back of the box won't argue with", recommended:false},
      {text:"the halftime spread where even the chocolate milk is the clean one", recommended:false}
    ],
    caption:"Hosting the crew for the matches this summer? ⚽️ Pour the kids a halftime chocolate milk they'll actually cheer for — the halftime chocolate milk the kids cheer for and the label can't argue with.\n\nWilla's Chocolate is the chocolate milk you wish you grew up on — made with real cacao and just 5 simple ingredients, for a rich, creamy taste with way less sugar than the boxed stuff. 🥛\n\nWilla's Chocolate: 11g sugar · 5g protein · 3g fiber · 5 ingredients (filtered water, organic whole grain oats, organic coconut sugar, organic cacao powder, sea salt). A Good Food Awards winner made with real cacao — not flavoring.\n\nUSDA Organic · Non-GMO · Certified glyphosate-free, tested every lot · WBENC women-owned.\n\nA clean treat that still tastes like a treat. Nourish the spark in everyone.\n\n#willas #oatmilk #worldcupwatchparty #dairyfree #cleanlabel #organic #watchpartyfood #chocolatemilk #oatmilkchocolate #glyphosatefree",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#worldcupwatchparty",
      "#dairyfree",
      "#cleanlabel",
      "#organic",
      "#watchpartyfood",
      "#chocolatemilk",
      "#oatmilkchocolate",
      "#glyphosatefree"
    ],
    visual:"Bright, sun-flooded overhead Pinterest pin (2:3 vertical) of a styled summer watch-party snack table on a linen runner — the match playing soft and out-of-focus on a screen in the deep background. The hero is a tray of iced Willa's Chocolate poured over big ice cubes in short kid-friendly glasses, condensation beading on the carton. The Willa's Chocolate carton stands label-forward at the center of the table, occupying 40%+ of the frame. Scatter the table with fresh fruit, a bowl of popcorn, orange slices, and a couple of small soccer-coded touches (a striped napkin, a paper pennant) — celebratory, never sports-bro: no jerseys, no beer, no stadium register. Warm natural daylight, airy creamy-blue and white palette, a kid's hand optional reaching for a glass. Crisp text overlay top third: 'the halftime chocolate milk that isn't a sugar bomb.' Keep it editorial-bright and shareable, the kind of spread a host screenshots to recreate.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for your next match-day spread", medium:"build the table — start with a chocolate milk the kids cheer for", strong:"grab Willa's Chocolate and pour the cleanest treat on the watch-party table"}
  },
  {
    id:"JUN22-IG-F2",
    platform:"IG Feed",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Multi",
    dnaPattern:"at-shelf-moment",
    timing:"Sun Jun 28 · 6pm",
    priority:"STANDARD",
    concept:"\"the one we'd put in your own cart.\" — trusted-rec shelf carousel",
    intel:[
      {type:"TREND", text:"Willa's belongs in the women-built shelf set shoppers are actively seeking out — WBENC-certified, mother-founded, named for grandmother Willa (T-8). Lead with the carton as the rec; the founder story is the trust layer, not the pitch. Frame it the way a friend hands you a recommendation — 'this is the one I keep buying' — and let the 4 ingredients + organic + glyphosate-free do the closing. Do NOT run this as a read-the-label score or a cert-wall carousel — the move is the trusted rec, not the audit."},
      {type:"AUDIENCE", text:"The Willa's REVIEWS/RECS buyer trusts a person before she trusts a brand — she wants to know who already vetted it. A 'the rec, then the receipts' carousel gives her both: a real recommendation energy up front, then the proof a skeptical shopper can verify herself. Motivate the move: end on 'this is the one to put in the cart first.'"},
      {type:"COMPETITOR", text:"Internal: peer at-shelf launches keep using the carousel-as-rec format and baiting buyer co-sign in the comments (C-3). Borrow the move for Willa's without naming anyone — stage the carton as the friend's pick, let founder credibility + 4 ingredients be the payload, and open the comments for real buyers to add their own."}
    ],
    hooks:[
      {text:"shhh… here's the one carton we'd actually put in your own cart.", recommended:true},
      {text:"if a friend handed you one plant milk to start with, this is the one.", recommended:false},
      {text:"the rec first, the receipts second. (you'll want both.)", recommended:false}
    ],
    caption:"Rich, smooth, and the one we'd put in your own cart.\n\nIf a friend asked us for one plant milk to start with, Willa's is the carton we'd hand over — mother-founded, WBENC-certified, named for a real grandmother who was making oatmeal way before it was cool.\n\nThe rec, then the receipts:\n\n→ 4 ingredients on Willa's Original (organic whole grain oats, filtered water, organic vanilla extract, sea salt)\n→ 1g sugar · 4g+ protein · 2g+ prebiotic fiber\n→ made from the whole oat groat — bran, germ, and all — not oat syrup. Most oat milks filter out both the protein AND the fiber, then process the starch into sugar.\n→ USDA Organic · Non-GMO · Certified glyphosate-free (tested every lot) · Kosher · Vegan\n\nReal food, passed down. Reinvented forward.\n\nSwipe for the rec, then the receipts. Drop the carton you already swear by in the comments. 🌾",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#womenbuilt",
      "#womenownedbusiness",
      "#wbenc",
      "#motherfounded",
      "#cleaningredients",
      "#wholeoat",
      "#shopsmall",
      "#planttmilk"
    ],
    visual:"Bright, editorial 5-card IG Feed carousel — warm daylight, real shelf and real kitchen, no studio sterility. CARD 1: hero shelf shot, Willa's cartons (Original + Kids + Chocolate + Barista) stacked clean on a sunlit grocery shelf, a hand reaching for the Original, bold serif text overlay: 'the one we'd put in your own cart.' Carton design carries 40%+ of frame. CARD 2: founder in her own kitchen, mid-motion (pouring or holding the carton, not posed-to-camera) — warm, candid, hands-and-product energy, small caption strip: 'mother-founded · named for grandmother Willa.' CARD 3: macro pour — Willa's Original cascading into a clear glass, creamy ribbon, crisp focus, overlay: 'rich, smooth — and 4 ingredients.' CARD 4: a clean flat-lay of the carton beside its short ingredient line + nutrition shorthand (1g sugar · 4g+ protein · 2g+ fiber), overlay: 'the receipts, if you want them.' CARD 5: end card, soft cream background, sign-off in serif: 'plants, finally done right.' Color palette bright + trend-forward — creamy whites, warm wood, a pop of the purple pillar accent. Carton visible on every card.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"swipe for the rec, then the receipts →", medium:"if you've only got room for one new plant milk this month, make it this one. drop your own go-to in the comments.", strong:"make Willa's the first carton in the cart — on shelves now."}
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
  {icon:"↑", title:"\"green before you flip it.\" leads the week as the calm-authority label Reel on Wed Jun 24.", reason:"Regulators are floating a red/yellow/green front-of-pack label so shoppers can judge a food at a glance. A 4-ingredient carton reads green before you turn it over — the regulator validating Willa's whole pitch. We lead with the answer, not the headline; the label is catching up to what's been on the carton. Patagonia gravity, no panic.", agent:"trend"},
  {icon:"↑", title:"\"summon the one with nothing to hide.\" goes BIG SWING on TikTok Wed Jun 24, riding June's Food Jutsu format.", reason:"The anime hand-sign summon — where a drink materializes in-hand on the match-cut — is flagged as June's best brand-friendly F&B format and already has a CapCut template. We throw the signs, summon the creamy glass + carton, and the 4-ingredient stinger is the payload. The format does the reach; the short list is the punchline. No competitor named.", agent:"pulse"},
  {icon:"↑", title:"\"the one i'd actually send.\" carries the school-milk parenting Reel on Thu Jun 25 against the new cafeteria slot.", reason:"A new law opens school lunch lines to plant milk and lets a parent's note unlock a dairy-free pour for ~30M kids. The real question at pickup is which carton's clean enough — Willa's Kids answers with 8g protein, top-9 allergen-free, Yuka 100. Cofounder-mom or brand 'we' voice, never first-person Christina.", agent:"composer"},
  {icon:"↑", title:"\"matcha got the headlines. hojicha got the oat milk.\" claims the breakout cafe drink before the chains do.", reason:"Hojicha is summer's breakout cafe drink, built to pair with an oat-milk pour, and nobody in the oat lane has planted a flag. We get there first with a 'let's make an iced hojicha latte (dairy-free!)' Barista recipe Reel — nutty profile, rich low-sugar base, no rapeseed. First-mover on an open lane.", agent:"composer"},
  {icon:"⚡", title:"\"the cleanest protein move has nothing to mix in.\" calm protein-soda correction queued for Thu Jun 25.", reason:"Doctors are publicly pushing back on the viral protein-Diet-Coke dirty-soda trend — the pre-made shakes sneak in filler and tip a 'diet' drink into dessert. We answer matter-of-factly: the protein wave doesn't need a fizzy mixer, it needs real food — whole-oat protein + fiber, no isolate. Kiki-Milk confidence, the rebuttal leads, never strident.", agent:"pulse"},
  {icon:"⚡", title:"\"the whole oat, nothing pulled out, nothing faked back in.\" whole-oat POV Reel queued to close the week Sun Jun 28.", reason:"A state passed a first-in-the-nation 'Non-Ultraprocessed Certified' seal that most of the milk aisle won't qualify for. We don't claim the seal — we read the carton: whole oat groat, bran and germ and all, no isolates, no gums. The certification is being built for cartons like this one. Confident product truth, no trade-press stats on the surface.", agent:"trend"},
  {icon:"↓", title:"Held the entertainment lane to the World Cup watch-party table over a standalone sports stitch.", reason:"The tournament is genuinely mass-cultural, but Willa's plays the family table, not the match — a sports-bro register fails the tonal test. We ride the halftime spread where one carton feeds the room (kids' chocolate pour + adult iced coffee) as a warm snack-spread pin, not a play-by-play. The sport stays background; the kitchen is the lead.", agent:"pulse"},
  {icon:"×", title:"Killed the synthetic-dye phase-out deadline signal before it could anchor a brief.", reason:"The dye-removal lane is burned at the anchor level — last refresh rode 'dye-removal pressure reaches private-label shelves,' and the phase-out leans on a stale background source. Kept the fresh front-of-pack green-light label and the state 'Non-Ultraprocessed Certified' seal as the in-window policy anchors instead.", agent:"editor"}
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
  total:14180,
  lift:41,
  sessions:1142,
  topRoiFormat:"Calm-authority founder Reel + viral-recipe-remix (glyphosate-probe founder Reel peaked JUN 8)",
  topRoiPerBrief:1573,
  source:"Shopify + Klaviyo"
};

const AGENT_BY_ID = Object.fromEntries(AGENTS.map(a=>[a.id,a]));

// ─── Brief ↔ source links (the threading) ─────────────────
const BRIEF_LINKS = {
  "JUN22-TT-1":{
    trends:[
      "T-7"
    ],
    pulse:[
      "CP-1",
      "CP-10"
    ],
    comps:[]
  },
  "JUN22-IG-R1":{
    trends:[
      "T-1"
    ],
    pulse:[],
    comps:[]
  },
  "JUN22-TT-2":{
    trends:[],
    pulse:[
      "CP-7"
    ],
    comps:[
      "C-2"
    ]
  },
  "JUN22-IG-R2":{
    trends:[
      "T-2",
      "T-10"
    ],
    pulse:[
      "CP-3"
    ],
    comps:[]
  },
  "JUN22-IG-F1":{
    trends:[
      "T-10",
      "T-6"
    ],
    pulse:[],
    comps:[]
  },
  "JUN22-TT-4":{
    trends:[],
    pulse:[
      "CP-2"
    ],
    comps:[]
  },
  "JUN22-IG-R3":{
    trends:[
      "T-9"
    ],
    pulse:[],
    comps:[
      "C-1"
    ]
  },
  "JUN22-PIN-1":{
    trends:[],
    pulse:[
      "CP-11",
      "CP-9"
    ],
    comps:[]
  },
  "JUN22-TT-7":{
    trends:[
      "T-3"
    ],
    pulse:[],
    comps:[
      "C-1"
    ]
  },
  "JUN22-IG-R4":{
    trends:[],
    pulse:[
      "CP-6"
    ],
    comps:[]
  },
  "JUN22-TT-3":{
    trends:[],
    pulse:[
      "CP-5"
    ],
    comps:[
      "C-1"
    ]
  },
  "JUN22-TT-6":{
    trends:[
      "T-5",
      "T-10"
    ],
    pulse:[],
    comps:[]
  },
  "JUN22-PIN-2":{
    trends:[],
    pulse:[
      "CP-9"
    ],
    comps:[
      "C-2"
    ]
  },
  "JUN22-TT-5":{
    trends:[],
    pulse:[
      "CP-9",
      "CP-11"
    ],
    comps:[]
  },
  "JUN22-IG-R5":{
    trends:[
      "T-4"
    ],
    pulse:[],
    comps:[
      "C-2"
    ]
  },
  "JUN22-PIN-3":{
    trends:[],
    pulse:[
      "CP-8"
    ],
    comps:[]
  },
  "JUN22-IG-F2":{
    trends:[
      "T-8"
    ],
    pulse:[],
    comps:[
      "C-3"
    ]
  }
};



// ─── Paid Amplify Plans (Paid Media Planner output) ──────
const AMPLIFY_PLANS = {
  "JUN22-IG-R1":{
    headline:"Green-light label calm-authority Reel — lead the week on the front-of-pack label moment with the carton that already reads green",
    totalBudget:290,
    testWindow:"5 days (Wed Jun 24 → Sun Jun 28)",
    objective:"Saves + Profile Visits",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"Regulators signaled a color-coded front-of-pack label — red/yellow/green — is the next move, the whole point being that shoppers can judge a food without flipping it over (FoodNavigator Jun 16, Agri-Pulse mid-Jun). A 4-ingredient carton reads green before you turn it over — the label catching up to what's been on the carton. We lead with the answer, not the policy: Patagonia gravity, carton as the lead, no panic. We name no one.",
    placements:[
      {platform:"Meta", format:"Reels Ad (IG Reels + FB Reels)", budget:290, audience:"Interest: Clean Label, Glyphosate-Free, Organic Food, Whole Foods, Sprouts, Mom-Founded, MAHA, Food Transparency · Age: 28–48 · Behavior: Engaged with clean-label / food-safety content (30 days)", lookalike:"Klaviyo Willa's purchaser lookalike + Detox Project / glyphosate-free engaged audience + clean-label parent lookalike", expectedReach:"85K–145K video views", note:"Optimize for Saves. The carton reading green before the flip is the share engine — the 'already passes' beat should land as calm authority, never fear. If sentiment holds above 0.88 through 72hr, extend to $370 for the full weekend ride."}
    ]
  },
  "JUN22-TT-1":{
    headline:"Food Jutsu summon format flip — ride June's top brand-friendly TikTok format and summon the carton with nothing to hide",
    totalBudget:250,
    testWindow:"4 days (Wed Jun 24 → Sun Jun 28)",
    objective:"Video Views + Saves",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"The anime hand-sign summon — where a drink materializes in-hand on the match-cut — is June's top brand-friendly F&B format and already has a CapCut template. We throw the signs, summon the creamy glass + carton, and the 4-ingredient stinger lands as the payload. The format carries the reach; the short list is the punchline. Format-as-virality has been the highest-reach lane all year. No competitor named.",
    placements:[
      {platform:"TikTok", format:"Spark Ad", budget:250, audience:"Interest: Clean Label, Oat Milk, Dairy-Free, TikTok Food, Anime, Trending Audio, Label Check · Age: 22–42 · Behavior: Engaged with trending-format + recipe content (30 days)", lookalike:"Willa's Original engaged-non-follower lookalike + clean-label / FoodTok format audience", expectedReach:"80K–140K video views", note:"Optimize for Video Views first, Saves second — this rides a fast-moving format with a live template, so ship inside the window. The match-cut summon is the hook; keep the 4-ingredient payoff clean. If the format cools before Day 3, redirect budget to JUN22-IG-R1."}
    ]
  },
  "JUN22-IG-R2":{
    headline:"\"The one i'd actually send\" school-milk parenting Reel — own the new cafeteria plant-milk slot with Willa's Kids",
    totalBudget:230,
    testWindow:"4 days (Thu Jun 25 → Sun Jun 28)",
    objective:"Saves + Shares",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"A new law opens school lunch lines to plant milk and lets a parent's note — not a doctor's — qualify a dairy-free pour for ~30M kids (Plant Based News, PBFA). The open question at pickup is which carton is actually clean enough to send: Willa's Kids answers with 8g protein, top-9 allergen-free, Yuka 100. Cofounder-mom or brand 'we' voice, never first-person Christina. The parent-family format compounds on Saves + Shares.",
    placements:[
      {platform:"Meta", format:"Reels Ad (IG Reels + FB Reels)", budget:230, audience:"Interest: Parenting, Kids Nutrition, School Lunch, Allergen-Free, Mom-Founded, Dairy-Free Kids, Back to School · Age: 28–45 · Behavior: Engaged with family / kids-food content (30 days)", lookalike:"Willa's Kids engaged-non-follower lookalike + clean-label parent lookalike + allergen-free-household audience", expectedReach:"70K–125K video views", note:"Optimize for Saves. The 'which one would I actually send' framing is the share engine — let the proof (8g protein, allergen-free, Yuka 100) land as the quiet receipt, no hard-sell. Ship Thu Jun 25 midday so it lands while the cafeteria-slot conversation is live."}
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
  {date:"Sun Jun 21 · 22:10", agent:"composer", msg:"17 briefs delivered for the week of JUN 22-28 · 3 BIG SWINGs (green-light label calm-authority Reel · Food Jutsu summon format flip · school-milk \"the one i'd actually send\" parenting Reel) · 6 HIGH · hojicha + ube + whole-oat POV spine"},
  {date:"Sun Jun 21 · 21:25", agent:"editor", msg:"Caption variants drafted across the slate (direct / warm / punchy) · brand-voice default · Willa's capitalized in caption bodies · cofounder-mom voice reserved for the school-milk Reel, brand 'we' everywhere else, no first-person Christina"},
  {date:"Sun Jun 21 · 17:50", agent:"trend", msg:"Regulators floating a red/yellow/green front-of-pack label so shoppers judge a food at a glance (FoodNavigator Jun 16 · Agri-Pulse mid-Jun) — BIG SWING \"green before you flip it\" calm-authority Reel queued, a 4-ingredient carton already reads green"},
  {date:"Sun Jun 21 · 16:30", agent:"trend", msg:"New law opens school lunch lines to plant milk + lets a parent's note (not a doctor's) qualify a dairy-free pour for ~30M kids (Plant Based News · PBFA) — BIG SWING \"the one i'd actually send\" parenting Reel queued, Willa's Kids 8g protein, allergen-free, Yuka 100"},
  {date:"Sun Jun 21 · 14:40", agent:"pulse", msg:"Anime Food Jutsu hand-sign summon confirmed as June's top brand-friendly TikTok format with a live CapCut template — BIG SWING format flip queued, throw the signs, summon the creamy glass + carton, 4-ingredient stinger as the payload"},
  {date:"Sun Jun 21 · 13:15", agent:"trend", msg:"Hojicha pegged summer's breakout cafe drink, built for an oat-milk pour and wide open in the oat lane (TikTok #hojicha + #hojichalatte hubs) — first-mover \"matcha got the headlines. hojicha got the oat milk.\" Barista recipe Reel queued before the chains claim it"},
  {date:"Sun Jun 21 · 12:05", agent:"pulse", msg:"Ube logged as the #1 trending drink ingredient + #JoyMagenta wellness-day permission-to-enjoy wave cresting (Global Wellness Summit Jun 16 · Destination Deluxe Jun 13) — vivid ube oat latte + \"a breakfast you'd actually share, not just survive\" celebrate-food stitch queued"},
  {date:"Sun Jun 21 · 11:20", agent:"pulse", msg:"Doctors publicly pushing back on the viral protein-Diet-Coke dirty-soda trend — calm \"the cleanest protein move has nothing to mix in\" correction queued, whole-oat protein + fiber, no isolate, no fizzy filler, Kiki-Milk confidence not strident"},
  {date:"Sun Jun 21 · 10:35", agent:"comp", msg:"Category pouring spend into summer iced coffee (Oatly-Nespresso Jun 17 kept as the live comp) — countered with a home cold-foam play, \"shake it cold and it foams like a cafe machine did it,\" half the sugar, no rapeseed, no names"},
  {date:"Sat Jun 20 · 18:40", agent:"editor", msg:"Killed 15 stale or burned-lane signals: FDA self-affirmed-GRAS rule (JUN 15 burn corpus) · 3 undated Oatly comps · over-optimization backlash (JUN 15 anchor, rested) · cottage-cheese fatigue (JUN 15 protein-critique rested) · cloud-coffee + Ariana coffee dance (latte cap) · cortisol cocktail (no fresh peg) · others adjacency-killed"},
  {date:"Sat Jun 20 · 15:20", agent:"perf", msg:"Rolled JUN 8-14 results into the Performance window (2-week lag) — 8 shipped, ~2.78M reach, 6.4× avg saves-delta · the glyphosate-probe founder Reel was the saves hero (8.9×) · escalated the calm-authority register into the green-light label Reel this week"},
  {date:"Sat Jun 20 · 13:10", agent:"visual", msg:"Visual direction set bright + trend-forward across the slate — hands + product + kitchen default, Patagonia gravity on the label Reel, electric-purple ube pour over clean white base, warm sunlit JoyMagenta stitch · phone-mockup scripts populated on all 12 Reels + TikToks"}
];


// ─── Killed signals (the ones we said no to) ──────────────
const KILLED = [
  {signal:"FDA proposed rule to end 'self-affirmed GRAS' (C&EN, Green Queen)", reason:"Too adjacent to the JUN 15 burn corpus — T-1 (NY GRAS-disclosure bill) and T-2 (FRESH Act / 90-day GRAS auto-clear) both anchored the GRAS reform lane last week. Different federal actor but the same 'mystery additive / publish the safety homework' angle the audience just saw. The clean front-of-pack label (T-1 this week) carries the fresh, distinct policy anchor instead.", by:"Cultural Editor"},
  {signal:"Oatly 'Trust the Processed' label + 4-ingredient 'Super Basic' SKU", reason:"Strong competitor signal but the only on-brand counter ('the category is finally stripping down toward where Willa's started') is squarely on the burn list — the catching-up / category-renovating framing was used JUN 1 and JUN 15 and is explicitly rested. Sources are also undated reference pages with no fresh-this-week peg. Kept the dated Oatly-Nespresso move (Jun 17) as the live comp instead.", by:"Cultural Editor"},
  {signal:"Oatly stopped advertising 'no added sugars' after Campbell challenge (Food Dive)", reason:"Excellent third-party proof for the processing-makes-the-sugar story, but the Food Dive source is undated/older reference with no Jun 15-22 peg, and the GI/processing-sugar correction lane was just rested (JUN 15 CP-9). Folded into Muscle Milk comp + CP-10 as background, not its own card.", by:"Cultural Editor"},
  {signal:"Oatly seventh VegNews Veggie Award + Summer Fancy Food Show awards angle", reason:"The awards-season comp is real but Willa's own Good Food Awards win + Yuka 100 were referenced JUN 8 and the won-an-award brief lane is rested; framing the week around competitor trophy counts risks the audience-outsider test. Surfaced the Fancy Food Show only as forward-looking context in compWeeklyPOV.coming.", by:"Cultural Editor"},
  {signal:"Oatly climate-badge + 100% British oats sustainability flex", reason:"Tonally usable (kitchen-table sustainability vs. boardroom badge) but all sources are undated brand-reference pages with no fresh peg, and stacking a third Oatly-anchored comp would make the week read Oatly-vs-Willa's. Held to keep the comp set diversified (Oatly / Muscle Milk / Graza).", by:"Cultural Editor"},
  {signal:"Over-optimization / orthosomnia sleep-tracker backlash (Gulf Today, Eastern Herald)", reason:"Genuinely in-window (Jun 9 + Jun 14) and tonally perfect, but the 'Over-Optimization Backlash' was the named anchor of JUN 15 T-9 ('fed-not-tracked / culture turns from metrics back to real food') and is rested. The #JoyMagenta wellness-day angle (CP-9) carries the same energy with a genuinely new, distinct news hook.", by:"Cultural Editor"},
  {signal:"Cottage-cheese fatigue / 'real is the new flex' protein backlash (Chowhound Jun 21)", reason:"Fresh and on-tone, but the protein-overconsumption-critique lane was just anchored JUN 15 T-6 ('most active adults already hit their target') and is rested for fresh anchoring. The protein-Diet-Coke rebuttal (CP-7) carries the additive-protein pushback with a sharper, more specific viral peg.", by:"Cultural Editor"},
  {signal:"Cottage-cheese tacos / 30-30-30 protein breakfast remix", reason:"Dairy-coded viral recipe that's remixable, but the protein-breakfast lane is doubly adjacent to the rested protein-maxxing trend AND the cottage-cheese-oats lane is on the older burn list. Mango float + ube + girl-dinner snack-plate cover the fresh recipe whitespace without the burned adjacency.", by:"Cultural Editor"},
  {signal:"Cloud coffee whipped-foam pour + Ariana Grande coffee-in-hand dance", reason:"Both are real peaking formats, but both are latte/coffee vehicles and the week already runs an iced-coffee comp (Oatly-Nespresso C-1) plus hojicha (T-9) — stacking more coffee-pour pulses would over-index the lane and burn the latte cap. Held to keep the Pulse spread across recipe/meme/parenting/news, not coffee-heavy.", by:"Cultural Editor"},
  {signal:"'Everything Hallelujah' + Nirvana 'oh well, whatever, nevermind' carefree carousels", reason:"Both warm, brand-safe entertainment formats, but the meme lane is already covered by the two higher-reach formats (Food Jutsu CP-1, four-emotions CP-2) and the carefree-energy angle overlaps the #JoyMagenta and beta-mom exhale signals already in the slate. Held to avoid stacking optimization-exhale pulses.", by:"Cultural Editor"},
  {signal:"Mommaxxing / mommymaxxing optimization-burnout trend (CBC Jun 9, Yahoo)", reason:"In-window and tonally aligned, but it's the same parenting-optimization conversation as the beta-mom signal (CP-3) — beta mom is the relief, mommaxxing is the thing being pushed back on. Picked beta mom as the warmer, embody-not-satirize lane; running both would be one conversation twice.", by:"Cultural Editor"},
  {signal:"Cortisol cocktail / adrenal-cocktail debunk (Cleveland Clinic, OSF)", reason:"Clean misinfo-rebuttal candidate, but all sources are permanent debunk-reference pages with no fresh-this-week peg, and the wellness-potion pushback overlaps the protein-Diet-Coke rebuttal (CP-7) already carrying the diet-culture-filter lane. One calm-correction pulse is enough; CP-7 has the sharper viral hook.", by:"Cultural Editor"},
  {signal:"Swavory (sweet + savory) flavor trend / sea-salt-on-sweet", reason:"On-brand (sea salt is on Original's label) and fresh-ish, but it's a flavor-direction conversation better expressed as a recipe execution than a standalone pulse, and the recipe slots are already filled by ube, mango float and the snack-plate. Parked as voice/flavor context for brief generation rather than a card.", by:"Cultural Editor"},
  {signal:"Frozen yogurt clusters + drinkable/yogurt tiramisu dairy-free remixes", reason:"Both legit dairy-free-remix lanes, but the no-bake summer-dessert lane is on the burn list (brownies → fudge → frozen fudge exhausted) and tiramisu's coffee-forward profile overlaps the already-heavy coffee slate. Mango float was kept as the single no-bake remix because its heritage 'reinvented forward' angle is the strongest on-DNA fit.", by:"Cultural Editor"},
  {signal:"Poppi × Love Island watch-party can / Graza 'Seriously Serious' 22,353 spoons", reason:"Both are peer-brand PATTERN observations to mine for voice, not fresh datable signals for Willa's — Poppi's reality-TV register fails the tonal test and Graza's campaign debuted Mar 4 (out of window). The portable moves (watch-party-as-distribution, humanize-the-receipts) are folded into CP-8 World Cup and T-8 founder-visibility instead.", by:"Cultural Editor"},
  {signal:"'North Berkeley Mom' TikTok send-up (CP-4)", reason:"Only anchoring source (Berkeleyside Jun 12) is 10 days old — outside the 7-day window — and no fresh sibling or brief depended on it. Dropped per drop-or-replace-never-hide; the mom-archetype lane is carried by the in-window beta-mom / quiz pulse instead.", by:"Cultural Editor"}
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
  "JUN22-TT-1":{direct:"Most oat milks summon a 12-line label. We summon four. ✋🥛\n\nWilla's Original is the whole plant milk — made from the whole entire oat groat (bran, germ and all), not oat syrup. Most oat milks filter out both the fiber AND the protein, then process the starch into sugar. We keep the good stuff.\n\nThe payload, every time you cast the spell:\n• 1g sugar (from the oats, nothing added)\n• 4g+ protein\n• 2g+ prebiotic fiber\n• 4 real ingredients, no isolates, no gums\n\nOrganic whole grain oats. Filtered water. Organic vanilla extract. Sea salt. That's the whole scroll. 📜\n\nUSDA Organic. Non-GMO. Certified glyphosate-free — tested every lot. Summon the one with nothing to hide.", warm:"POV: you throw the hand signs and the oat milk with nothing to hide appears. ✋🥛\n\nWilla's Original uses the whole entire oat — bran, germ and all — so you keep the protein and fiber most oat milks filter out. 1g sugar, four real ingredients, and shhh… the list reads like a grocery receipt, not a chemistry set.\n\nthat's the whole spell.", punchy:"summon the one with nothing to hide. four real ingredients, 1g sugar, the whole oat. ✋🥛"},
  "JUN22-IG-R1":{direct:"Willa's Original is what a green light looks like — 4 ingredients, organic, certified glyphosate-free, made from the whole oat groat (bran, germ, and all).\n\nA color-coded front-of-pack label is coming so you can judge a food at a glance, no flipping required. Fruits and veggies get the green light. Most oat milks won't, because they filter out the bran + germ — discarding both the fiber AND the protein — then process the starch into sugar.\n\nNot this one:\n· organic whole grain oats\n· filtered water\n· organic vanilla extract\n· sea salt\n\n1g sugar · 4g+ protein · 2g+ prebiotic fiber. Certified glyphosate-free. Tested every lot.\n\n\"Green before you flip it.\" Four ingredients reads green in any color code — the regulators are just getting around to printing it.\n\nPlants, finally done right.", warm:"There's a new color-coded label coming — green, yellow, red — so you can size up a food without flipping it over. shhh… Willa's Original has been a green light the whole time. 4 ingredients, organic, certified glyphosate-free, the whole oat (bran + germ + all). \"Green before you flip it.\" 🌾", punchy:"they're inventing a green light for the front of the carton. Willa's Original has four ingredients on the back. green before you flip it."},
  "JUN22-TT-2":{direct:"Willa's Original is whole-oat protein — 4g+ protein, 2g+ prebiotic fiber, 1g sugar, 4 ingredients. No isolate. No filler. Nothing to mix in.\n\nThe viral move right now is pouring a pre-made protein shake into diet soda and calling it a health hack. Doctors are pushing back — a lot of those shakes sneak in filler, so you can end up with more sugar than protein. A 'diet' drink quietly turns into a dessert.\n\nThe calmer answer is a pour with nothing to mix in. Willa's uses the whole oat groat — bran, germ, and all — the way steel-cut oats do. Most oat milks filter out both the protein AND the fiber, then process the starch into sugar. We keep all of it.\n\nOrganic. Non-GMO. Certified glyphosate-free. WBENC women-owned.\n\nThe cleanest protein move has nothing to mix in.", warm:"the whole trend is mixing two things in a glass. the better move mixes nothing. 🥛\n\nWilla's Original keeps the whole oat — bran, germ, and all — so the protein + fiber are already in there. 4g+ protein, 2g+ fiber, 1g sugar, 4 ingredients.\n\nshhh… the cleanest hack is the one with nothing to add.", punchy:"pouring a protein shake into diet coke isn't a hack. Willa's Original is: 4g+ protein, 2g+ fiber, 1g sugar, 4 ingredients — and nothing to mix in. 🥛"},
  "JUN22-IG-R2":{direct:"30 million kids can now get a plant-milk pour at school — and a note from you, not a doctor, unlocks it. So the only question left is which carton you'd actually send. The cafeteria has a plant-milk slot now. This is the one we'd actually send. 🌾\n\nWilla's Kids: 8g protein (same as dairy), 6g sugar from organic maple, plant-based DHA, and free of the top 9 allergens — no nut, soy, gluten, dairy, sesame. Yuka scored it 100/100. We use the whole oat, bran and germ and all, not oat syrup, so the good stuff stays in.\n\nMost kids' milks lean on cane sugar or rice syrup. Willa's Kids is organic, allergen-free, and short enough to read in the four seconds you've got in the milk aisle.\n\nParents asked us to make a kids' carton they could trust. We listened — and now there's a slot at school worth filling. 🥛\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC", warm:"the lunch line opened up — plant milk's allowed now, and a note from you is all it takes. shhh… you don't need a system for this. just the one carton you can read in four seconds and trust. Willa's Kids: 8g protein, organic maple, top-9 allergen-free, Yuka 100. the one we'd actually send. 🌾", punchy:"the cafeteria has a plant-milk slot now. Willa's Kids is the one we'd actually send. 🥛"},
  "JUN22-IG-F1":{direct:"The one carton that's safe for the whole lunch table. 🌾\n\nWilla's Kids is free of the top 9 allergens — no nut, soy, gluten, dairy, sesame — so it clears the nut-free, dairy-free classroom without a second read.\n\nAnd it doesn't trade that safety for everything else:\n- 8g protein, same as dairy\n- 6g sugar, from organic maple\n- USDA Organic, with plant-based DHA\n- made with the whole oat — bran and germ and all, not oat syrup\n\nMost kids' milks make you pick: organic OR simple, sweet OR clean, allergy-safe OR actually nourishing. Willa's Kids is the one that doesn't make you choose. Parents asked us to make a carton they could trust. We listened. 🥛\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC", warm:"for the parent packing around a nut-free, dairy-free classroom: shhh… here's the one you can stop double-checking. Willa's Kids is free of the top 9 allergens, with 8g protein, 6g sugar from organic maple, and USDA Organic on the front. parents asked us to make a carton they could trust. we listened. 🌾", punchy:"free of the top 9 allergens. safe for the whole lunch table. 🥛"},
  "JUN22-TT-4":{direct:"I was not prepared for oat milk to taste like this. 🥛 Willa's Original is rich, smooth, and actually creamy — not the watery, chalky pour you brace for. It's organic whole grain oats, filtered water, organic vanilla, and sea salt, with 1g sugar, 4g+ protein, and 2g+ fiber per cup. Most oat milks filter out the protein AND the fiber, then turn the starch into sugar — we use the whole oat groat, bran and germ and all, so the body stays in the glass. That's where the creamy comes from. So: braced, surprised, won-over, or hooked — comment your face. We already know which one we'd pick. 🌾", warm:"I was not prepared for oat milk to taste like this. 🥛 rich, smooth, actually creamy — and shhh… it's only four things: organic oats, filtered water, organic vanilla, sea salt. the creamy comes from keeping the whole oat. comment your face: braced, surprised, won-over, or hooked?", punchy:"one sip. four reactions. one creamy carton. comment your face. 🌾"},
  "JUN22-IG-R3":{direct:"Matcha got the headlines. Hojicha got the oat milk. 🍵☀️ The roasted-tea wave finally hit our kitchen and we are not mad about it — this iced hojicha latte is toasty, a little nutty, naturally lower in caffeine, and so creamy it sips like a treat.\n\nWilla's Barista Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup — 50% less sugar than other barista oat milks, no rapeseed, no gums. 🥛\n\nIngredients\n- 1.5 tsp hojicha powder (roasted green tea)\n- 2 tbsp hot water\n- 1 tsp maple syrup (optional)\n- 1 cup ice\n- 3/4 cup Willa's Barista Organic Oat Milk\n- splash of vanilla\n\nWhisk the hojicha with hot water + maple until smooth. Fill a glass with ice, pour Willa's Barista over the top, add the hojicha, finish with vanilla, swirl, sip. That's the whole recipe — and the roasted-tea drink nobody in the oat lane claimed yet.", warm:"Roasted tea + a creamy pour = the afternoon cup we didn't know we needed. 🍵 Hojicha is toasty, a little nutty, and naturally lower in caffeine — so it sips like a treat without the jitters.\n\nThe creamy half? Willa's Barista. Rich, smooth, 50% less sugar than other barista oat milks. shhh… nobody in the oat lane claimed this drink yet, so we did.", punchy:"matcha got the headlines. hojicha got the oat milk. 🍵 Willa's Barista — toasty swirl, half the sugar."},
  "JUN22-PIN-1":{direct:"The snack plate is abundance with no rules attached — assemble what's good, pour what you like, let the plate be loud. 🍓 So we built a bright one and gave it a glass that fits right in: a plate where nothing has to apologize — least of all the glass. Willa's Original isn't the 'good for you' penance item hiding in the corner of the board — it's 4 ingredients (organic whole grain oats, filtered water, organic vanilla, sea salt), 1g sugar, 4g+ protein, 2g+ fiber, made from the whole oat groat (bran and germ and all) instead of the filtered-down oat syrup most milks pour. Other oat milks filter out both the fiber AND the protein; Willa's keeps them. The whole point of an abundant plate is that nothing on it is a test. Neither is the glass. No spreadsheet, no scoring, just breakfast you'd actually screenshot.\n\nWhat we built:\n- Willa's Original, poured tall over ice\n- fresh strawberries + a handful of blueberries\n- crunchy whole-grain toast, torn not sliced\n- a soft-boiled egg with flaky salt\n- a little pile of dark chocolate squares because it's a plate, not a test", warm:"the abundant snack plate already left the rules behind — we just handed it a glass that belongs. 🍓 a plate where nothing has to apologize — least of all the glass. Willa's Original is 4 ingredients and 1g sugar, made from the whole oat groat, so it keeps the fiber and protein most milks filter out. shhh… nothing here is a test. assemble what's good, pour what you like, call it breakfast.", punchy:"loud, abundant, zero rules. a plate where nothing has to apologize — least of all the glass of Willa's Original. 🍓"},
  "JUN22-TT-7":{direct:"Let's make a cold-foam iced latte (dairy-free!) ☕️\n\nThe summer heat had us craving that pretty cafe pour at home — no machine, no barista, no $7. Here's the trick that still surprises us: shake it cold and it foams like a cafe machine did it. Twenty seconds in a jar, and the espresso cascades down through a real cloud of foam.\n\nWilla's Barista uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein per cup — 50% less sugar than other barista oat milks, 4g protein, no rapeseed, no gums. 🥛\n\nIngredients\n- 1 cup Willa's Barista Organic Oat Milk\n- 1 double shot espresso or 1/2 cup strong cold brew\n- ice\n- optional: a splash of maple + a pinch of sea salt\n\nShake the Willa's Barista cold until frothy, pour over ice, float the espresso on top, and let it cascade. That's it — same gorgeous build, half the sugar.", warm:"shhh… here's the part baristas won't tell you: shake it cold and it foams like a cafe machine did it. ☕️\n\none carton, one jar, twenty seconds. Willa's Barista froths cold, pours pretty, and skips the rapeseed, the gums, and half the sugar.", punchy:"shake it cold and it foams like a cafe machine did it. Willa's Barista, over ice. ☕️"},
  "JUN22-IG-R4":{direct:"Mango season is peaking and we couldn't stop thinking about mango float — the no-bake icebox cake we all want a slice of. 🥭☀️ The classic runs on condensed milk + heavy cream, so we rebuilt the whole cloud dairy-free, and shhh… you'd genuinely fight someone for the corner piece. Grandma's icebox cake, minus the dairy.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 It's what makes the cream layer taste like the real thing — 1g sugar, 4g+ protein, 4 ingredients on the carton (organic whole grain oats, filtered water, organic vanilla extract, sea salt).\n\nReal food, reinvented forward.\n\nIngredients\n- 1 cup Willa's Organic Oat Milk\n- 1 can full-fat coconut cream, chilled overnight\n- 3 tbsp maple syrup (for the 'condensed' swirl)\n- 1 tsp vanilla extract\n- 2 ripe mangoes, thinly sliced\n- 1 sleeve graham crackers\n- pinch of sea salt", warm:"The mango float of the summer, remade so the whole table gets a slice. 🥭 The cream layer is whipped coconut cream + Willa's Original where the condensed milk + heavy cream used to be — rich, smooth, and shhh… completely dairy-free. Grandma's icebox cake, minus the dairy. Recipe below 🤍", punchy:"mango float, rebuilt dairy-free. the whole cream layer is just coconut + Willa's. 🥭🥛"},
  "JUN22-TT-3":{direct:"Ube season has us in a happy little chokehold, and honestly? earned it. 💜 This iced ube oat latte is earthy-sweet, creamy, and the exact shade of purple that stops a thumb mid-scroll.\n\nHere's the part nobody clocks: the purple does the talking, the carton does the rest. Willa's Organic Barista Oat Milk is the clean white base under all that drama — simple organic ingredients and the whole entire oat for a rich, smooth taste, 50% less sugar than other barista oat milks, no rapeseed, no gums. 🥛\n\nIngredients:\n- 1 cup Willa's Organic Barista Oat Milk\n- 1 tbsp Suncore Foods ube purple yam powder (or 2 tbsp ube halaya, dairy-free)\n- 1 tsp maple syrup (or to taste)\n- ½ cup brewed coffee or 1 shot espresso, chilled\n- ice\n\nWhisk the ube powder + maple + a splash of warm water into a smooth paste. Pour over ice, layer in chilled coffee, then float Willa's Barista on top and watch the purple bloom. ☀️", warm:"the prettiest drink of the summer is purple — and it's dairy-free. 💜 shhh… the secret isn't the ube. the purple does the talking, the carton does the rest — and the carton is Willa's Barista, keeping it rich and creamy with 50% less sugar than other barista oat milks and zero rapeseed. ☀️", punchy:"iced ube oat latte: the purple does the talking, the carton does the rest. (the carton's Willa's Barista.) 💜"},
  "JUN22-TT-6":{direct:"Willa's Kids was built clean from the start — organic, no dyes, no isolates, top-9 allergen-free, 8g protein, and a Yuka 100. You shouldn't need a chemistry degree to pour your kid a drink. 🌾\n\nRight now 30+ states are racing to pull food dyes and sketchy additives out of kids' food, one bill at a time. Willa's Kids is already on the other side of that fight: 8g protein (same as dairy), 6g sugar from organic maple, plant-based DHA, and free of the top 9 allergens — no nut, soy, gluten, dairy, sesame. We use the whole oat, bran and germ and all, not oat syrup, so the good stuff stays in.\n\nMost kids' drinks lean on cane sugar, rice syrup, or a color number you'd have to look up. The Willa's Kids ingredient list is short on purpose — nothing to decode, nothing to second-guess.\n\nParents asked us for a kids' carton they could trust without a second thought. We listened. 🥛\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC", warm:"the kids' drink aisle reads like a chemistry quiz — dye numbers, syrups, things you'd have to look up. shhh… you can just skip it. Willa's Kids is organic, no dyes, top-9 allergen-free, 8g protein, Yuka 100. one carton, nothing to decode. 🌾", punchy:"you shouldn't need a chemistry degree to pour your kid a drink. Willa's Kids — organic, no dyes, five ingredients. 🥛"},
  "JUN22-PIN-2":{direct:"this isn't the carton you try once. it's the one that quietly never leaves the grocery list.\n\nthe wellness internet decided 2026 is about joy over scorekeeping — enjoying your morning instead of grading it. this is the pour that keeps coming back: rich, smooth, and something you actually reach for.\n\nwhy it stays in the cart:\n• 1g sugar, 4g+ protein, 2g+ prebiotic fiber\n• Willa's Original is the whole oat groat — bran, germ, and all, like steel-cut oats — so the protein and fiber stay in instead of getting filtered out\n• USDA Organic · Non-GMO · Certified Glyphosate Residue Free · Yuka 94/100\n• Good Food Awards winner · WBENC mother-founded\n\nrich and smooth, no chalk, no gums faking the body back. the kind of carton that turns into a standing order.\n\npin it to your grocery list — then go pour a glass and see why it sticks.\n\nplants, finally done right.", warm:"the wellness internet says 2026 is about joy, not scorekeeping. 🌾\n\nso here's the carton we keep reaching for — Willa's Original, the whole oat groat, four ingredients, 1g sugar, rich and smooth.\n\nshhh… it's not the one you try once. it's the one that quietly ends up on the list every single week.", punchy:"the oat milk you don't try once — you re-buy. Willa's Original: whole oat, 1g sugar, no gums. pin it to the grocery list."},
  "JUN22-TT-5":{direct:"a breakfast you'd actually share, not just survive.\n\nWilla's Original is the pour you reach for on purpose — real food, made from the whole oat groat (the whole oat kernel, bran and germ and all), not oat syrup.\n\nthe receipts, since the ingredient list is the best part:\n• 1g sugar, from the oats — nothing added\n• 4g+ protein · 2g+ prebiotic fiber per cup\n• 4 ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt\n• USDA Organic · Certified glyphosate-free (tested every lot)\n• Yuka 94/100\n\nthe whole point: the carton you'd happily pour for the people at your table. nourish the spark — abundance, not restriction.", warm:"shhh… breakfast is allowed to be the good part.\n\nno chore, no fine-i-guess — just a slow pour of Willa's Original, real food made from the whole oat. 1g sugar, 4 ingredients you can actually pronounce, and a morning you'd happily share. 🌾", punchy:"breakfast went from a chore to the good part. (Willa's Original — 1g sugar, 4 ingredients, all real.)"},
  "JUN22-IG-R5":{direct:"the whole oat, nothing pulled out, nothing faked back in.\n\nWilla's Original is made from the entire oat groat — bran, germ and all, the way steel-cut oats are. most oat milks filter out the bran + germ (the fiber AND the protein), process the starch into sugar, then add gums to fake the body back.\n\nWilla's keeps it whole:\n• organic whole grain oats\n• filtered water\n• organic vanilla extract\n• sea salt\n\nthat's the whole recipe. 1g sugar · 4g+ protein · 2g+ prebiotic fiber.\n\nUSDA Organic · Non-GMO · certified glyphosate-free, tested every lot.\n\nCalifornia just passed a first-in-the-nation 'Non-Ultraprocessed Certified' label. whichever way the rules land, this is what whole-food simple actually tastes like.\n\nplants, finally done right.", warm:"the whole oat, nothing pulled out, nothing faked back in. 🌾\n\nWilla's Original is the entire oat groat — bran, germ, all of it. four ingredients you can pronounce, 1g sugar, no gums hiding anywhere.\n\nshhh… the secret is there's no secret. it's just oats, water, vanilla, salt.", punchy:"this is the whole oat — bran, germ and all. Willa's Original keeps the fiber and protein most oat milks throw out. oats, water, vanilla, salt. 1g sugar."},
  "JUN22-PIN-3":{direct:"Hosting the crew for the matches this summer? ⚽️ Pour the kids a halftime chocolate milk they'll actually cheer for — the halftime chocolate milk the kids cheer for and the label can't argue with.\n\nWilla's Chocolate is the chocolate milk you wish you grew up on — made with real cacao and just 5 simple ingredients, for a rich, creamy taste with way less sugar than the boxed stuff. 🥛\n\nWilla's Chocolate: 11g sugar · 5g protein · 3g fiber · 5 ingredients (filtered water, organic whole grain oats, organic coconut sugar, organic cacao powder, sea salt). A Good Food Awards winner made with real cacao — not flavoring.\n\nUSDA Organic · Non-GMO · Certified glyphosate-free, tested every lot · WBENC women-owned.\n\nA clean treat that still tastes like a treat. Nourish the spark in everyone.\n\n#willas #oatmilk #worldcupwatchparty #dairyfree #cleanlabel #organic #watchpartyfood #chocolatemilk #oatmilkchocolate #glyphosatefree", warm:"The matches turned every kitchen into a watch party — so we poured the kids the cleanest treat on the table. 🥛 Iced Willa's Chocolate over big cubes, real cacao, 5 ingredients. shhh… it tastes like the boxed stuff you grew up on, minus the sugar bomb. A Good Food Awards winner, top-to-bottom organic.", punchy:"the halftime chocolate milk that isn't a sugar bomb. ⚽️ real cacao, 5 ingredients, kids cheer."},
  "JUN22-IG-F2":{direct:"Rich, smooth, and the one we'd put in your own cart.\n\nIf a friend asked us for one plant milk to start with, Willa's is the carton we'd hand over — mother-founded, WBENC-certified, named for a real grandmother who was making oatmeal way before it was cool.\n\nThe rec, then the receipts:\n\n→ 4 ingredients on Willa's Original (organic whole grain oats, filtered water, organic vanilla extract, sea salt)\n→ 1g sugar · 4g+ protein · 2g+ prebiotic fiber\n→ made from the whole oat groat — bran, germ, and all — not oat syrup. Most oat milks filter out both the protein AND the fiber, then process the starch into sugar.\n→ USDA Organic · Non-GMO · Certified glyphosate-free (tested every lot) · Kosher · Vegan\n\nReal food, passed down. Reinvented forward.\n\nSwipe for the rec, then the receipts. Drop the carton you already swear by in the comments. 🌾", warm:"shhh… here's the one we'd actually hand a friend: Willa's.\n\nMother-founded, WBENC-certified, named for the grandmother who was making oatmeal way before it was cool. Rich and smooth, 4 ingredients, and you'll taste why it's the rec. 🌾", punchy:"if you've got room for one new plant milk this month, make it Willa's. 4 ingredients, mother-founded, and the one we'd put in your own cart."}
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
  happened:"The category poured marketing into summer iced coffee — the biggest oat name extended its Nespresso flavor-spectacle collab into 26 markets (Jun 17) while a legacy protein-shake giant relaunched to 'simplify the label' (Jun 3), both signaling where the shelf is heading.",
  coming:"Watch the summer drink-discovery wave (hojicha, ube, coffee tonic) drive at-home recreation demand, the World Cup keep family watch-parties spilling into the kitchen, and the Summer Fancy Food Show (Jun 28-30) put awards and global flavors back in the news.",
  plays:"About 15-17 briefs on the table; the two biggest are a clean home-iced-latte answer riding the category's funded coffee moment and a Target at-shelf co-sign play that turns the 4-ingredient back-label into the reveal."
};


// ─── Performance · Week of MAY 25 – MAY 31 results ──────────────
const LAST_WEEK_RESULTS = [
  {id:"JUN08-IG-R1", concept:"\"We test every lot. So you never have to wonder.\" — calm-authority founder Reel", platform:"IG Reel", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"Texas AG glyphosate probe naming oat-based kids' foods (JUN 8)", trendId:null, views:538000, saves:34200, shares:16100, comments:2580, savesDelta:8.9, sentiment:0.97, hero:true, note:"Saves hero of the JUN 8 week. Christina on camera answering a weed-killer news cycle with 'we test every lot' — letting the cert + 4-ingredient calm be the whole argument — was the share engine. The learning: calm authority beats alarm. This week the same register escalates: the glyphosate-probe story became a front-of-pack label proposal, so the \"green before you flip it\" Reel answers the regulator with the carton that already reads green."},
  {id:"JUN08-TT-2", concept:"\"they soaked pineapple in candy powder. we just let the pineapple be the candy.\" — real-fruit smoothie remix", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Kool-Aid Pineapple candy-in-a-fruit-costume sugar bomb (JUN 8)", trendId:null, views:472000, saves:28400, shares:15200, comments:2240, savesDelta:7.6, sentiment:0.95, hero:false, note:"The dairy-free / real-fruit remix landed — taking a viral sugar-bomb drink and rebuilding it clean over a whole-oat base adds value without preaching. Viral-recipe-remix stays the highest-reach format. This week the same play runs on the breakout cafe drink: \"matcha got the headlines. hojicha got the oat milk\" plants the dairy-free flag on summer's open oat lane before the chains package it."},
  {id:"JUN08-IG-R1B", concept:"\"the whole aisle is getting a shorter ingredient list 🛒\" — clean-category POV", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Dye-removal push jumps to grocers' private-label aisles (JUN 8)", trendId:null, views:356000, saves:21600, shares:10400, comments:1620, savesDelta:6.8, sentiment:0.96, hero:false, note:"The confident clean-category POV converted — 'Willa's has been four the whole time, clean isn't the trend, it's just Tuesday' rewards the buyer without a victory lap or a label-check lecture. This week the same product-truth confidence carries the whole-oat POV Reel (\"the whole oat, nothing pulled out, nothing faked back in\") against a first-in-the-nation 'not-ultraprocessed' seal most of the aisle won't qualify for — read the carton, don't claim the seal."},
  {id:"JUN08-TT-3", concept:"\"the only summer anthem with 8g of protein.\" — #summeranthem pour, beat-drop count", platform:"TikTok", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"7-second 'Like a Prayer' lip-sync lowest-lift viral entry (JUN 8)", trendId:null, views:418000, saves:18900, shares:13800, comments:1980, savesDelta:5.4, sentiment:0.94, hero:false, note:"Reach amplifier (418K views, lower save-rate) — riding a peaking audio with an 8g-protein Kids payload is a recognition vehicle, the proof point is the receipt. Format-as-virality stays the highest-reach lane. This week that format-stitch energy moves to the BIG SWING: the Food Jutsu summon throws the hand signs and materializes the carton, the 4-ingredient stinger as the payload — the format carries the reach, the short list is the punchline."},
  {id:"JUN08-IG-R4", concept:"\"the best recipes don't get invented — they get handed down\" — heritage pour Reel", platform:"IG Reel", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"Taylor Swift Toy Story 5 country-rooted heirloom song (JUN 8)", trendId:null, views:312000, saves:20800, shares:9600, comments:1440, savesDelta:6.9, sentiment:0.98, hero:false, note:"Highest sentiment of the JUN 8 week (0.98) — the grandmother-recipe-card handoff, real food passed down and reinvented forward, won as warm heritage with Christina in the reserved on-camera slot. This week the heritage lane moves into the kitchen: \"grandma's icebox cake, minus the dairy\" rebuilds a passed-down no-bake clean — whipped coconut cream + Willa's Original, heritage remade forward, the pour as hero."},
  {id:"JUN08-IG-R3", concept:"\"protein doesn't have to come in a shaker.\" — nutrient-dense pour, no powder", platform:"IG Reel", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"Stanford study confirms GLP-1 weight loss strips muscle (JUN 8)", trendId:null, views:288000, saves:18200, shares:8400, comments:1280, savesDelta:6.3, sentiment:0.96, hero:false, note:"Additive-protein framing landed — 'the most protein of any oat milk, no scoop of powder in sight' celebrated real food over a shaker without valorizing restriction. This week the calm-correction lane sharpens against a fresher viral peg: \"the cleanest protein move has nothing to mix in\" answers the protein-Diet-Coke dirty-soda trend matter-of-factly — whole-oat protein + fiber, no isolate, no fizzy filler, Kiki-Milk confidence not strident."},
  {id:"JUN08-IG-R5", concept:"\"pink, creamy, and made with real strawberries — not syrup 🍓\" — strawberry summer refresher", platform:"IG Reel", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Dunkin Barbie summer menu makes oatmilk the default (JUN 8)", trendId:null, views:334000, saves:15800, shares:11200, comments:1720, savesDelta:5.1, sentiment:0.93, hero:false, note:"The vivid pink ribbon-pour was the reach play — real strawberries not syrup, competing on the glass not the chain. Color-does-the-work recipes pull saves on Pinterest-bound stills. This week the same visual-first logic runs electric: \"the purple does the talking. the carton does the rest\" pours a vivid iced ube oat latte over Willa's clean white base, the #1 trending drink ingredient carried by color alone."},
  {id:"JUN08-PIN-2", concept:"\"the carton that earns the glass — and the second pour.\" — kids' pin proof-row", platform:"Pinterest", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"Investors back another mother-founded, chef-led kids' brand (JUN 8)", trendId:null, views:124000, saves:9400, shares:0, comments:0, savesDelta:6.6, sentiment:0.97, hero:false, note:"Pinterest pin compounded for 7+ days (CTR climbing daily) — the planning audience captured the kids'-carton proof row (8g protein, allergen-free, Yuka 100) as a save-and-return grocery cue. This week the parent lane shifts from the planning pin to the live cafeteria moment: the BIG SWING \"the one i'd actually send\" Reel answers the new school plant-milk slot with the carton a parent's note can unlock — belonging at the lunch table, not just utility."}
];

const PERF_KPIS = {
  shipped:13,
  totalReach:2782000,
  avgSavesDelta:6.4,
  topFormat:"Calm-authority founder Reels + viral-recipe-remix + format-as-virality audio stitches"
};

const PERF_INSIGHTS = [
  {title:"Calm authority answering a news cycle was the saves hero of the JUN 8 week (the glyphosate-probe founder Reel hit 8.9× saves)", detail:"The 'we test every lot. so you never have to wonder.' Reel hit 8.9× saves and 0.97 sentiment — Christina on camera meeting a weed-killer news cycle with the cert + 4-ingredient calm instead of alarm. The learning: calm authority out-saves fear, the carton out-argues the headline. This week the engine escalates the same register — the glyphosate story became a front-of-pack label proposal, so the \"green before you flip it\" Reel answers the regulator with the carton that already reads green before you turn it over.", agent:"perf"},
  {title:"The dairy-free remix stays the highest-engagement recipe frame (the real-fruit smoothie hit 7.6× saves)", detail:"The 'we just let the pineapple be the candy' TikTok hit 7.6× saves and 0.95 sentiment — taking a viral sugar-bomb drink and rebuilding it clean over a whole-oat base adds value without preaching. This week the engine runs the same play on summer's breakout cafe drink: \"matcha got the headlines. hojicha got the oat milk\" pours a clean whole-oat Barista layer into the open oat lane and plants the dairy-free flag before the chains package it.", agent:"editor"},
  {title:"Format-as-virality audio stitches carry the reach even at lower save-rate (the #summeranthem pour hit 418K views)", detail:"The 'only summer anthem with 8g of protein' stitch pulled 418K views on a peaking audio with a Kids-protein payload — the format does the reach work, the proof point is the payload. This week the engine doubles down with the BIG SWING: the Food Jutsu hand-sign summon rides June's top brand-friendly TikTok format and materializes the carton on the match-cut, the 4-ingredient stinger as the payload. The format carries the reach; the short list is the punchline.", agent:"pulse"},
  {title:"Heritage posted the week's highest sentiment (the handed-down recipe Reel hit 0.98)", detail:"The 'the best recipes don't get invented — they get handed down' Reel posted the week's highest sentiment (0.98) — the grandmother-recipe-card handoff, real food reinvented forward, with Christina in the reserved on-camera slot. This week the heritage lane moves into the kitchen as a recipe: \"grandma's icebox cake, minus the dairy\" rebuilds a passed-down no-bake clean with whipped coconut cream + Willa's Original — heritage remade forward, the pour as the hero shot.", agent:"composer"}
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
  "JUN22-TT-1":{voice:94, panel:90, pulse:95, recency:9},
  "JUN22-IG-R1":{voice:94, panel:91, pulse:88, recency:9},
  "JUN22-TT-2":{voice:93, panel:90, pulse:88, recency:8},
  "JUN22-IG-R2":{voice:93, panel:91, pulse:86, recency:8},
  "JUN22-IG-F1":{voice:91, panel:89, pulse:82, recency:8},
  "JUN22-TT-4":{voice:92, panel:88, pulse:90, recency:9},
  "JUN22-IG-R3":{voice:92, panel:88, pulse:90, recency:8},
  "JUN22-PIN-1":{voice:93, panel:88, pulse:86, recency:8},
  "JUN22-TT-7":{voice:92, panel:88, pulse:85, recency:9},
  "JUN22-IG-R4":{voice:93, panel:89, pulse:86, recency:8},
  "JUN22-TT-3":{voice:92, panel:89, pulse:94, recency:9},
  "JUN22-TT-6":{voice:93, panel:90, pulse:84, recency:8},
  "JUN22-PIN-2":{voice:91, panel:86, pulse:82, recency:7},
  "JUN22-TT-5":{voice:94, panel:88, pulse:86, recency:8},
  "JUN22-IG-R5":{voice:93, panel:90, pulse:84, recency:9},
  "JUN22-PIN-3":{voice:92, panel:88, pulse:90, recency:8},
  "JUN22-IG-F2":{voice:90, panel:86, pulse:82, recency:7}
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
    type:"MEME FORMAT",
    typeColor:"#73B2C9",
    hook:"The anime 'Food Jutsu' summon is FoodTok's top brand format — throw the hand signs, the pour materializes ✋",
    detail:"The anime-inspired Food Jutsu format — hand signs set to 'Delirious' from the Jujutsu Kaisen score, where a drink or dish materializes in-hand on the match-cut — is one of June 2026's top brand-friendly formats. New Engen flags it as the best F&B format of the month; Wingstop UK and matcha brand Anaba have already run it. The format rewards a satisfying final-frame payoff: the thing that appears IS the punchline, and a CapCut template already exists.",
    velocity:"high",
    willasPlay:"TikTok: throw the hand signs, summon a creamy glass + the carton on the match-cut, end card lands the 4-ingredient stinger. Hands-and-product, the reveal is the payload.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"New Engen · June 2026 TikTok Trends, Food Jutsu flagged best-for-F&B (Jun 2026)", url:"https://newengen.com/insights/june-tiktok-trends/"},
      {label:"Epidemic Sound · Latest TikTok Trends, Food Jutsu (Jun 18, 2026)", url:"https://www.epidemicsound.com/blog/latest-tiktok-trends/"}
    ]
  },
  {
    id:"CP-2",
    type:"MEME FORMAT",
    typeColor:"#73B2C9",
    hook:"The 'one phrase, four emotions' no-audio challenge is the lowest-lift format on the FYP — the comments rank you 🎭",
    detail:"June 2026's breakout no-audio acting format has creators deliver one short phrase four ways — supportive, disappointed, sarcastic, flirty — with numbered on-screen text so the comments rank them. New Engen and Epidemic Sound both flag it as the lowest-production-bar performance challenge on the FYP, where the comment section does half the reach work. No specific audio required.",
    velocity:"high",
    willasPlay:"TikTok: read the ingredient list four ways — skeptical, relieved, delighted, smug — over hands flipping the carton. No talent needed; the four-line list is the gag, comments are the reach.",
    dnaMatch:"on-pack-checklist",
    sources:[
      {label:"New Engen · June 2026 TikTok Trends, 'wow ok' breakout no-audio format (Jun 2026)", url:"https://newengen.com/insights/june-tiktok-trends/"},
      {label:"Epidemic Sound · Latest TikTok Trends, One Phrase Four Emotions (Jun 18, 2026)", url:"https://www.epidemicsound.com/blog/latest-tiktok-trends/"}
    ]
  },
  {
    id:"CP-3",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"The 'beta mom' exhale is June's breakout parenting archetype — good-enough beats hyper-optimized 🌾",
    detail:"'Beta Mom' is the breakout June 2026 parenting archetype — the anti-Alpha-Mom who rejects perfectionism and curated optimization for flexible, emotionally-available, 'good enough' parenting. Psychology Today's Vanessa LoBue, Ph.D. covered it Jun 15, 2026, anchoring it to Winnicott's 'good enough' concept; outlets frame it as a 'collective exhale' from intensive-parenting pressure. It's the direct countermovement to optimization burnout.",
    velocity:"high",
    willasPlay:"Reel: brand 'we' voice — the beta mom doesn't color-code the week, she grabs the carton she can read in four seconds. One simple swap is the good-enough win. Embody, don't satirize.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"Psychology Today · 'The Rise of the Beta Mom,' Vanessa LoBue Ph.D. (Jun 15, 2026)", url:"https://www.psychologytoday.com/us/blog/the-baby-scientist/202606/the-rise-of-the-beta-mom"},
      {label:"The Everymom · 'What Is a Beta Mom?' parenting-trend explainer (Jun 2026)", url:"https://theeverymom.com/what-is-a-beta-mom/"}
    ]
  },
  {
    id:"CP-5",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"Ube is the #1 trending drink ingredient of summer — earthy-sweet purple that wants a creamy, low-sugar pour 💜",
    detail:"Ube (Filipino purple yam) is the breakout drink ingredient of summer 2026, with Perfect Daily Grind analysts calling it potentially 'matcha-level.' It's all over cafe menus — ube cold foam, iced ube lattes, ube cold brew — and TikTok loves the dramatic purple-on-cream contrast; the #ube tag has 118k+ posts. Ube is naturally rich in anthocyanins, the same antioxidants as blueberries.",
    velocity:"high",
    willasPlay:"Reel: 'let's make an iced ube oat latte (dairy-free!)' — the vivid purple over Willa's clean white base is the swipe-stop. Use a named ube product, let the color do the work.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"TikTok · #ube hashtag landing page (permanent reference)", url:"https://www.tiktok.com/tag/ube"},
      {label:"Starbucks Stories · Reserve spring menu — Ube, Coconut & Citrus (brand reference)", url:"https://about.starbucks.com/stories/2026/starbucks-reserve-introduces-a-vibrant-spring-menu-with-ube-coconut-and-citrus-flavors/"}
    ]
  },
  {
    id:"CP-6",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"Filipino mango float is the no-bake icebox cake of the summer — a textbook dairy-free remix 🥭",
    detail:"Filipino mango float — a no-bake icebox cake of layered graham crackers, whipped cream, condensed milk and ripe mango — has become one of summer 2026's trending no-bake desserts: four ingredients, under 20 minutes, sets in the fridge. A strong mango season fueled homemade versions across TikTok, farmers markets and pop-ups. The whole structure is built on dairy, leaving a clean plant-based entry point.",
    velocity:"medium",
    willasPlay:"Reel: 'let's make dairy-free mango float' — rebuild the cream layer with whipped coconut cream + Willa's Original, maple-sweetened 'condensed' swap, fruit-forward. A passed-down dessert, remade clean.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"Tasting Table · No-Bake Filipino Mango Float Recipe (recipe reference page)", url:"https://www.tastingtable.com/1805972/no-bake-filipino-mango-float-recipe/"},
      {label:"TikTok · #mangofloat hashtag landing page (permanent reference)", url:"https://www.tiktok.com/tag/mangofloat"}
    ]
  },
  {
    id:"CP-7",
    type:"MISINFO WATCH",
    typeColor:"#DC2626",
    hook:"The 'protein Diet Coke' dirty-soda craze is the protein wave gone sideways — doctors say it's dessert in disguise 🥤",
    detail:"Protein Diet Coke — a pre-made protein shake poured into diet soda — is a viral MomTok dirty-soda trend in 2026, with creators hitting millions of views. Doctors are publicly pushing back: Dr. Zac Turner warns the pre-made shakes 'sneak in a lot of filler' and you may get 'more calories from sugar than from protein,' turning a 'diet' drink into a dessert. The protein craze has officially gone sideways.",
    velocity:"medium",
    willasPlay:"Reel: calm, witty correction — the protein wave doesn't need a fizzy filler-shake, it needs real food. Lead with Willa's whole-oat protein + fiber, no isolate, no fillers, by beat two.",
    dnaMatch:"mom-activist",
    sources:[
      {label:"Dexerto · Doctor warns against TikTok's viral protein Diet Coke trend (2026)", url:"https://www.dexerto.com/tiktok/doctor-warns-against-tiktoks-viral-protein-diet-coke-trend-2972395/"},
      {label:"TikTok · #proteindietcoke hashtag landing page (permanent reference)", url:"https://www.tiktok.com/tag/proteindietcoke"}
    ]
  },
  {
    id:"CP-8",
    type:"ENTERTAINMENT",
    typeColor:"#A191B2",
    hook:"The World Cup turned 1 in 4 Americans into new soccer fans — the watch-party breakfast pour is up for grabs ⚽",
    detail:"The 2026 FIFA World Cup, hosted across North America, has more than one in four Americans saying they're newly interested in soccer because of the tournament, and Meltwater data shows World Cup conversation has grown nearly sixfold since January and is still accelerating in June 2026. It's a genuine mass-cultural, family-gathering moment with watch parties spilling into every kitchen.",
    velocity:"high",
    willasPlay:"Reel: ride the watch-party table, not the sport — the halftime spread where one carton feeds the room, kids' chocolate pour plus an adult Barista iced coffee. No sports-bro register.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"PR News Online · When Culture Moves, Brands Follow (World Cup, Toy Story 5) (Jun 2026)", url:"https://www.prnewsonline.com/pr-roundup-when-culture-moves-brands-follow-lessons-from-kalshi-the-world-cup-and-toy-story-5/"}
    ]
  },
  {
    id:"CP-9",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"The wellness internet just named its year: #JoyMagenta — permission to enjoy your food again 🎉",
    detail:"The Global Wellness Summit's June Trendium and Global Wellness Day 2026 (Jun 13, theme #JoyMagenta) both reframed the year's defining shift away from measurement toward 'joy in gratitude — abundance over scarcity' and 'joy through connection — shared meals.' After a decade of scores and restriction, the cultural permission slip is back: eat the breakfast, share the carton, stop auditing it.",
    velocity:"medium",
    willasPlay:"Reel: ride the joy-not-tracking wave directly — Willa's IS the celebrate-food brand. Lead with the pour as the joyful, shareable thing, sunlit and slow. 'Nourish the spark,' meeting culture halfway.",
    dnaMatch:"before-after-stitch",
    sources:[
      {label:"Global Wellness Day · #JoyMagenta official theme page", url:"https://www.globalwellnessday.org/joymagenta/"},
      {label:"GoWell · JoyMagenta: Global Wellness Day 2026 Celebrates the Transformative Power of Joy", url:"https://go-well.mx/en/magazine/wellness-pulse/joymagenta-global-wellness-day-2026-celebrates-the-transformative-power-of-joy/"}
    ]
  },
  {
    id:"CP-10",
    type:"NEWS CYCLE",
    typeColor:"#DC8A4E",
    hook:"'84% of plant milks are ultra-processed' is the stat the internet keeps citing — here's where the other 16% lives 📉",
    detail:"The widely-circulated review finding that roughly 84% of plant milks are ultra-processed, 14% processed and only about 2% minimally processed keeps fueling the 'is oat milk even food?' discourse. The honest answer for most cartons is fair — they're filtered and the starch turned to sugar. The honest answer for a whole-groat, 4-ingredient one is different: the category critique is real, the blanket verdict isn't.",
    velocity:"medium",
    willasPlay:"Reel: stand inside the critique instead of dodging it — most oat milk IS over-processed; Willa's uses the whole oat groat, bran and germ and all, 4 ingredients. Name the answer first, stat as backdrop.",
    dnaMatch:"on-pack-checklist",
    sources:[
      {label:"Springer · Ultra-processed Plant Foods: Are They Worse review (permanent reference)", url:"https://link.springer.com/article/10.1007/s13668-025-00704-6"},
      {label:"News-Medical · are ultra-processed plant foods really worse than meat? (permanent reference)", url:"https://www.news-medical.net/news/20251026/Are-ultra-processed-plant-foods-really-worse-than-meat-Scientists-weigh-in.aspx"}
    ]
  },
  {
    id:"CP-11",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"Girl dinner grew up: the snack-plate movement is abundance without a single rule 🍓",
    detail:"Searches for 'girl dinner / snack plate' are up roughly 300% year-over-year, with the trend explicitly framed as opting out of food rules — 'abundance in simplicity, no shame, just vibes.' It's diet-culture's exact opposite: assemble what's good, pour what you like, call it a meal. The anti-restriction snack plate is having its biggest moment yet.",
    velocity:"medium",
    willasPlay:"Reel: build a bright breakfast snack-plate with a no-guilt Willa's pour beside it — an iced glass or chocolate pour that earns its spot in frame, not a side of plain oats that loses it.",
    dnaMatch:"at-shelf-moment",
    sources:[
      {label:"Today · Snack Plate (Girl Dinner) recipe + trend (permanent reference)", url:"https://www.today.com/recipes/snack-plate-girl-dinner-t301435"},
      {label:"Rose Bakes · TikTok viral savory snack plate / girl dinner ideas (permanent reference)", url:"https://rosebakes.com/tiktok-viral-savory-snack-plate-girl-dinner-ideas/"}
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
  "JUN22-TT-1":"meme-payload",
  "JUN22-IG-R1":"on-pack-checklist",
  "JUN22-TT-2":"meme-payload",
  "JUN22-IG-R2":"kid-family-moment",
  "JUN22-IG-F1":"kid-family-moment",
  "JUN22-TT-4":"meme-payload",
  "JUN22-IG-R3":"viral-recipe-remix",
  "JUN22-PIN-1":"at-shelf-moment",
  "JUN22-TT-7":"before-after-stitch",
  "JUN22-IG-R4":"viral-recipe-remix",
  "JUN22-TT-3":"viral-recipe-remix",
  "JUN22-TT-6":"kid-family-moment",
  "JUN22-PIN-2":"before-after-stitch",
  "JUN22-TT-5":"before-after-stitch",
  "JUN22-IG-R5":"mom-activist",
  "JUN22-PIN-3":"kid-family-moment",
  "JUN22-IG-F2":"at-shelf-moment"
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
  "JUN22-TT-1":{
    shoot:[
      "Three clean hand-sign poses against a bright backdrop, shot to cut on a beat",
      "Match-cut reveal: glass + Willa's Original carton appearing in-hand, label facing camera",
      "Slow creamy pour from carton into a frosty glass (whole-oat body, condensation)",
      "Overhead flat-lay of the four real ingredients arranged as spell components"
    ],
    found:[
      "Trend reference (Format): https://newengen.com/insights/june-tiktok-trends/ — New Engen flags Food Jutsu as June's best F&B format; study the summon → match-cut payoff structure",
      "Trend reference (Audio + examples): https://www.epidemicsound.com/blog/latest-tiktok-trends/ — Food Jutsu breakdown w/ 'Delirious' audio + Wingstop UK / Anaba brand executions to match cut timing",
      "Trend reference (Audio): TikTok 'Delirious' (Jujutsu Kaisen score) — the sound powering the Food Jutsu format; a CapCut template already exists"
    ],
    memes:[
      "Anime summon-circle / glowing-rune graphic overlay packs (CapCut) for the materialize moment",
      "Kanji-card / 'spell scroll' text-overlay style for the four-ingredient reveal frame"
    ],
    archive:[
      "Skip — format is native-shot + trend-audio driven; no vintage/archive b-roll needed"
    ]
  },
  "JUN22-IG-R1":{
    shoot:[
      "Sunlit overhead of Willa's Original front-label-out, room for a corner traffic-light graphic",
      "Hand sliding an anonymous (blurred-label) carton in beside Willa's for the contrast beat",
      "Tight overhead of the 4-line back-label ingredient list, finger tracing each line",
      "Slow push-in on the front of the carton for the 'green chip glows' moment"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/labelcheck — label-reading / 'flip it over' POV format for pacing + on-screen-text rhythm",
      "Policy reference: FoodNavigator USA · Kennedy signals new course for food labels (Jun 16, 2026) — backdrop for the 'coming label' framing (internal, do not cite outlet on the surface)"
    ],
    memes:[
      "Skip — calm-authority Reel, no meme-template overlay; the traffic-light chip graphic is the visual gag"
    ],
    archive:[
      "Skip — fully shot original; no vintage/archival b-roll needed for a current-label brief"
    ]
  },
  "JUN22-TT-2":{
    shoot:[
      "Hands cracking a generic diet-soda can + glugging a pre-made shake into a fizzy glass — murky, over-foamed, slightly chaotic",
      "Hard-cut clean slow pour of Willa's Original over ice in a tall glass, smooth + creamy",
      "Carton-to-camera label reveal, 4-ingredient list readable in warm daylight",
      "End-card still: carton beside finished glass, morning light"
    ],
    found:[
      "Trend reference (TikTok hashtag): https://www.tiktok.com/tag/proteindietcoke — top videos for the dirty-soda build + format pacing Willa's is calmly answering",
      "Trend reference (TikTok hashtag): https://www.tiktok.com/tag/dirtysoda — broader MomTok dirty-soda format the protein build is riding"
    ],
    memes:[
      "Optional: a calm 'let me explain' reaction-text overlay tone (no face) riffing the gentle-correction format — keep it grandma-at-the-table, not dunk-energy"
    ],
    archive:[
      "Skip — no archival footage; this is a present-tense trend correction shot fresh in-kitchen"
    ]
  },
  "JUN22-IG-R2":{
    shoot:[
      "Overhead: handwritten note set on top of a packed kids' lunchbox at a sunlit counter",
      "Hand sliding the Willa's Kids carton next to the lunchbox",
      "Clean overhead of the carton back label, finger tracing the short ingredient list",
      "Maple-cream pour into a kid's cup, condensation, backlight",
      "Small kid's hand reaching in to lift the cup"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/schoollunch — top videos for the 'what I pack / lunch-prep' format, hook + overlay pacing parents already recognize",
      "Trend reference (article): https://plantbasednews.org/culture/law-and-politics/senate-school-kids-plant-based-milk/ — the school-lunch plant-milk law explainer, source for the 30M / parent-note framing"
    ],
    memes:[
      "Skip heavy meme overlays — kid-family-moment register, warm not goofy; the note-unlocks-the-pour reveal is the payoff, no gif needed"
    ],
    archive:[
      "Skip archive — this is a present-day kitchen + lunchbox shoot, no vintage b-roll"
    ]
  },
  "JUN22-IG-F1":{
    shoot:[
      "Packed lunchbox on a sun-washed cream surface, Willa's Kids carton tucked beside real kid food (sandwich, clementine, crackers)",
      "Tight allergen-callout shot — top-9-free line isolated on the back of the carton",
      "Big-number callout shots (protein line, sugar line, organic seal)",
      "Final flat-lay: carton beside the Yuka 100 badge on a cream background"
    ],
    found:[
      "Trend reference (carousel format): Partake Foods + Graza 'what's in the lunchbox' / allergen-safe parent carousels on IG — clean cream backgrounds, one proof per card, zine-cover type as the pacing model",
      "Reference (audience lane): @7kidskitchen7 and allergy-parent creators' real packed-lunch posts — the unstaged 'this is what actually goes in the box' framing"
    ],
    memes:[
      "Static carousel → skip memes; the lunchbox shot + allergen callout carry it, no gif overlay"
    ],
    archive:[
      "Skip archive — present-day product + lunchbox shoot only, no vintage b-roll"
    ]
  },
  "JUN22-TT-4":{
    shoot:[
      "Thick, creamy Willa's Original pour into a clear glass in bright morning light, condensation visible — the body of the pour is the hero",
      "Four near-identical re-grabs of the same first-sip beat so the numbered reaction cards can layer over one continuous take",
      "Reach-back-for-the-carton 'i'm keeping this' beat for BEAT 4",
      "Overhead soft-focus shot of the creamy glass for BEAT 3",
      "Slow push-in on the carton resolving to crisp focus for the end card"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/onephrasefouremotions — top videos for the numbered-text four-reaction structure + how the comments rank the beats",
      "Trend reference (Trends roundup): https://www.epidemicsound.com/blog/latest-tiktok-trends/ — Epidemic Sound's Jun 18, 2026 write-up of the One Phrase Four Emotions format (no specific audio required)",
      "Trend reference (Trends roundup): https://newengen.com/insights/june-tiktok-trends/ — New Engen June 2026 flag on the breakout no-audio performance format"
    ],
    memes:[
      "Numbered on-screen reaction cards (1. braced / 2. surprised / 3. won over / 4. hooked) are the meme payload itself — keep them clean, sentence-case, green-accented",
      "Comment-rank prompt ('which face?') drives the engagement-bait layer; pin a Willa's reply teasing which one we'd pick"
    ],
    archive:[
      "Skip — no vintage/archive footage needed; this is a fresh-shoot pour-and-reaction format"
    ]
  },
  "JUN22-IG-R3":{
    shoot:[
      "Macro slow-motion of the amber hojicha blooming into the white oat base over clear ice (the hero payoff frame)",
      "Overhead whisk of hojicha powder + hot water going from clumpy to glossy",
      "Slow creamy pour of Willa's Barista over ice with the carton tilting into frame",
      "Finished glass lifted into golden window light beside the carton"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/hojichalatte — study the top iced-hojicha videos for the pour/swirl framing + on-screen text patterns Willa's is riffing",
      "Trend reference (TikTok): https://www.tiktok.com/tag/hojicha — broader tag for the roasted-tea aesthetic + audio choices peaking on FoodTok"
    ],
    memes:[
      "Skip overt meme overlays — the swirl IS the payload; keep it recipe-clean per house convention"
    ],
    archive:[
      "Skip archive — this is a fresh-shoot home-cafe recipe, no vintage b-roll needed"
    ]
  },
  "JUN22-PIN-1":{
    shoot:[
      "Overhead flat-lay: hand reaching into frame for a strawberry off the abundant plate, iced Willa's Original glass + carton sharing the frame",
      "Tight detail: condensation on the iced Original glass beside torn toast and berries, flaky-salt egg in soft focus",
      "Carton-forward angle: Willa's Original label upright behind the plate, label legible, late-morning window light"
    ],
    found:[
      "Trend reference (recipe/format): https://www.today.com/recipes/snack-plate-girl-dinner-t301435 — the snack-plate/girl-dinner assembly + abundance framing this pin is riding (CP-11)",
      "Trend reference (format ideas): https://rosebakes.com/tiktok-viral-savory-snack-plate-girl-dinner-ideas/ — viral snack-plate styling for component + composition cues"
    ],
    memes:[
      "Static Pinterest pin → skip memes; the joke lives in the overlay wordplay ('a plate, not a test')"
    ],
    archive:[
      "Static pin → skip archive; all original sunlit flat-lay capture, no vintage b-roll needed"
    ]
  },
  "JUN22-TT-7":{
    shoot:[
      "Cluttered 'before' counter — a phone propped to a multi-step iced-coffee tutorial + too many bottles, hands fumbling",
      "Clean 'after' single-carton reset, sunlit",
      "Macro shake: cold foam building inside a clear shaker (20-second shake)",
      "Slow-mo espresso cascade through the pale oat pour over ice (the money shot)",
      "Finished glass sweating beside the Willa's Barista carton in daylight"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/coldfoam — top home cold-foam builds for the shake-and-froth framing + before/after pacing",
      "Trend reference (TikTok): https://www.tiktok.com/tag/baristaoatmilk — how creators frame the at-home oat pour vs cafe builds"
    ],
    memes:[
      "Optional text-joke beat on the propped-phone tutorial — keep it warm, never name a brand"
    ],
    archive:[
      "Skip — fully original same-day kitchen shoot, no archive needed"
    ]
  },
  "JUN22-IG-R4":{
    shoot:[
      "Overhead layering build: graham crackers → whipped oat-coconut cream → mango fans, shot rhythmically",
      "Cross-section slice pull revealing the layers (the swipe-stop money shot)",
      "Hand pouring Willa's Original into the chilled coconut cream bowl, carton in soft focus behind",
      "Sun-drenched counter still: mango tower + sweating coconut can + Willa's Original carton"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/mangofloat — pull the top no-bake mango float builds for the layering rhythm + reveal-slice format Willa's is riffing",
      "Recipe reference: https://www.tastingtable.com/1805972/no-bake-filipino-mango-float-recipe/ — the classic condensed-milk + heavy-cream structure we're swapping dairy-free"
    ],
    memes:[
      "Skip — this is a clean recipe build, not a meme-format brief; the layering ASMR + slice reveal carry it"
    ],
    archive:[
      "Optional: a few seconds of soft-grain 'grandmother's kitchen' b-roll (hands, morning light) to bridge into the 'reinvented forward' end card — keeps the heritage thread without putting talent on camera"
    ]
  },
  "JUN22-TT-3":{
    shoot:[
      "Overhead build sequence: ube paste whisk → spoon over ice → coffee pour → Barista cream bloom",
      "Slow-mo hero of the white Willa's Barista pour blooming through the purple",
      "Carton held just behind the glass, label readable, in full sun",
      "Straw-swirl top-down marbling shot + condensation drip"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/ube — 118k+ posts; pull the top iced-ube-latte builds for the purple-on-cream contrast + pacing the format rewards",
      "Trend reference (TikTok): https://www.tiktok.com/tag/ubelatte — match the cafe-style pour + bloom payoff structure home-cafe creators are using"
    ],
    memes:[
      "Skip — recipe build, the color reveal is the payload, no meme overlay needed"
    ],
    archive:[
      "Skip — fresh in-kitchen footage only; no vintage/b-roll for a current viral-drink remix"
    ]
  },
  "JUN22-TT-6":{
    shoot:[
      "Eye-level grab: hand reaching past a fridge full of brightly-colored kids' drinks to pull the Willa's Kids carton",
      "Carton set on a sunlit counter with a real calm exhale on the soundtrack",
      "Clean overhead of the Willa's Kids back label, finger tracing the short ingredient list",
      "Maple-cream pour into a kid's cup, condensation, backlight",
      "Small kid's hand reaching in to lift the cup"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/dyefree — top videos for the dye-free parent-haul format, hook + overlay pacing parents already recognize",
      "Trend reference (article): https://www.ewg.org/news-insights/news/2026/06/interactive-map-tracking-state-food-chemical-regulation-us — EWG's June 2026 state food-chemical map, source for the 30+ states framing"
    ],
    memes:[
      "Skip heavy meme overlays — kid-family-moment register, warm not goofy; the reach-past-the-aisle grab is the payoff, no gif needed"
    ],
    archive:[
      "Skip archive — this is a present-day kitchen + fridge moment, no vintage b-roll"
    ]
  },
  "JUN22-PIN-2":{
    shoot:[
      "Editorial flat-lay / front-on: Willa's Original carton on creamy-white, clear glass of thick creamy oat milk beside it, a handwritten grocery-list notepad with 'Willa's Original' at the top as the 'keeper' prop",
      "Tight on a hand adding the carton to a real cart / fridge door to signal the standing-order feeling",
      "Overlay-card composite: 'the keeper pour' + 'rich · smooth · 1g sugar' + 'Yuka 94 · Good Food Awards' in purple (#A191B2)"
    ],
    found:[
      "Cultural reference (article): Global Wellness Summit · #JoyMagenta / joy-not-tracking named 2026's wellness mood — https://www.globalwellnesssummit.com/trends-in-the-news/ — internal backdrop for the joy-over-scorekeeping framing, not on-pin copy (CP-9)",
      "Cultural reference (trend): Global Wellness Day 2026 celebrating 15 years — https://destinationdeluxe.com/global-wellness-day-2026/ — corroborates the joy-led, enjoy-your-food cultural mood"
    ],
    memes:[
      "Skip — static Pinterest pin; meme/gif overlay doesn't fit the recommendation save-and-shop format and would undercut the clean editorial design"
    ],
    archive:[
      "Optional macro of whole oat groats / steel-cut oats from a stock library to reinforce 'whole oat' — no vintage/period footage needed for a clean editorial pin"
    ]
  },
  "JUN22-TT-5":{
    shoot:[
      "Sparse 'before' counter: lone bowl of plain dry oats, dry toast, propped phone — cool desaturated grade, joyless",
      "The clean-sweep transition: hand swiping the dull plate out of frame as warm light + a bright snack-plate bloom in",
      "Hero slow-pour: Willa's Original into a tall sunlit glass, berries scattered, condensation forming, side + overhead angles",
      "Carton flip to ingredient list, finger tracing the 4 lines",
      "End-card still: full glass beside Willa's Original carton + a few berries, golden cream background"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/joymagenta — #JoyMagenta joy-over-metrics framing + audio direction",
      "Trend reference (TikTok): https://www.tiktok.com/tag/girldinner — abundance/no-rules snack-plate energy to echo in the 'after' act (CP-11 adjacency)"
    ],
    memes:[
      "Skip hard meme-gifs — this is a calm slow-pour stitch; the before/after IS the format payload, not a reaction-gif",
      "Optional: the 'me before / me after' split-screen text convention as the only meme-adjacent structure"
    ],
    archive:[
      "Skip archive — fully shot-in-kitchen this week; no vintage/period b-roll needed for a present-tense morning-ritual stitch"
    ]
  },
  "JUN22-IG-R5":{
    shoot:[
      "Whole oat groats tumbling from a wooden scoop (steel-cut look) in soft daylight — the 'whole oat' proof beat",
      "Slow thick creamy pour into a clear glass — body reads rich, not watery",
      "Close-up: the Willa's Original carton on sunlit marble with overlay text naming the four ingredients one at a time",
      "Hand setting the full creamy glass beside the carton for the payoff"
    ],
    found:[
      "Trend reference (article): DLA Piper · Food and Beverage News and Trends (Jun 15, 2026 roundup, surfaces the AB 2244 'non-ultraprocessed' certification) — https://www.dlapiper.com/en-us/insights/publications/food-and-beverage-news-and-trends/2026/food-and-beverage-news-and-trends-june-12-2026 — backdrop context only",
      "Trend reference (Reel format): calm, paced whole-food POV Reels where a single ingredient (oat groats) is the hero and overlays animate line-by-line — match this calm-confident cadence, not fast meme cuts"
    ],
    memes:[
      "Skip — this is a calm authority Reel, not a meme-payload format; no gif overlay (it would undercut the activist gravity / Patagonia posture)"
    ],
    archive:[
      "Optional 0.5s B-roll: steel-cut oats / whole groats macro from a stock library to reinforce 'the whole oat, like steel-cut' — no vintage/period footage needed for this lane"
    ]
  },
  "JUN22-PIN-3":{
    shoot:[
      "Overhead flat-lay of the watch-party snack table — tray of iced Willa's Chocolate, carton label-forward at center, popcorn + fruit framing",
      "Close-up: a kid's hand reaching for an iced Willa's Chocolate glass beaded with condensation",
      "Slow pour shot: Willa's Chocolate cascading over big ice cubes in a short glass, carton behind",
      "Detail: striped napkins, orange slices, popcorn bowl framing the carton — celebratory not sports-bro"
    ],
    found:[
      "Pinterest reference: search 'summer watch party snack table' + 'kid-friendly party food' for the airy editorial spread styling to match",
      "Pinterest reference: 'iced oat milk chocolate' pins for the cold-pour-over-big-ice composition"
    ],
    memes:[
      "Static pin → skip memes (no format-stitch on a Pinterest still)"
    ],
    archive:[
      "Static lifestyle pin → skip archive (all original styled-table photography)"
    ]
  },
  "JUN22-IG-F2":{
    shoot:[
      "Hero shelf shot: Willa's full lineup stacked on a sunlit grocery shelf, a hand reaching for Willa's Original",
      "Founder candid in her own kitchen, mid-pour, hands-and-product (not posed talking-head)",
      "Macro pour: Willa's Original cascading into a clear glass, creamy ribbon",
      "Clean flat-lay: carton beside its short ingredient line + nutrition shorthand",
      "End card: 'plants, finally done right.' on cream"
    ],
    found:[
      "Buy Women Built · women-built brand collective + retailer-takeover reference: https://www.buywomenbuilt.com/ — frame Willa's as belonging on this shelf",
      "WBENC certification page (permanent reference) for the 'certified women-owned' callout: https://www.wbenc.org/"
    ],
    memes:[
      "Static IG Feed carousel → skip memes; the friend's-rec framing + the pour carry the post"
    ],
    archive:[
      "Skip archive — this is a present-day shelf + kitchen + pour shoot, no period footage needed"
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
const WELCOME_WEEK_KEY = "JUN-22-2026";
const WELCOME_WEEK_RANGE = "JUN 22 – JUN 28, 2026";
const WELCOME_REFRESHED = "JUN 22, 2026";

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
  pullQuote:"the regulators want a green light you can read at a glance, the cafeteria finally has a plant-milk slot, and the whole internet's tired of measuring breakfast. good week to be the carton that already passes.",
  the_moves:[
    {kind:"ship", verb:"Open the week with the \"green before you flip it\" calm-authority label Reel.", why:"Regulators are floating a red/yellow/green front-of-pack label so you can judge a food at a glance — and a 4-ingredient carton already reads green before you turn it over. We lead with the answer, not the policy: the label catches up to what's been on the carton. Patagonia gravity, carton as the lead. Ship Wed Jun 24, 12pm."},
    {kind:"ship", verb:"Go BIG SWING on TikTok with the \"summon the one with nothing to hide\" Food Jutsu format.", why:"June's top brand-friendly TikTok format is the anime hand-sign summon where the thing materializes on the match-cut. We throw the signs, summon a creamy glass + the carton, and the 4-ingredient stinger lands as the payload. The format carries the reach; the short list is the punchline. TikTok Wed Jun 24, 10am."},
    {kind:"ship", verb:"Own the cafeteria slot with the \"the one i'd actually send\" school-milk parenting Reel.", why:"A new law opens school lunch lines to plant milk and lets a parent's note — not a doctor's — qualify a dairy-free pour for ~30M kids. The open question at pickup is which carton's actually clean enough: 8g protein, top-9 allergen-free, Yuka 100. Cofounder-mom voice or brand 'we,' never first-person Christina. IG Reel Thu Jun 25, 12pm."},
    {kind:"hold", verb:"Keep the protein-soda correction calm — real food beats a fizzy filler-shake.", why:"Doctors are publicly pushing back on the viral protein-Diet-Coke trend — the pre-made shakes sneak in filler and turn a 'diet' drink into dessert. We answer matter-of-factly: the protein wave doesn't need a soda mixer, it needs whole-oat protein + fiber, no isolate. Kiki-Milk confidence, never strident, the rebuttal leads."},
    {kind:"hold", verb:"Let hojicha and ube own the dairy-free lane before the chains claim them.", why:"Hojicha is summer's breakout cafe drink built for an oat-milk pour, and ube is the #1 trending drink ingredient — both wide open in the oat lane. We pour a clean whole-oat Barista layer into each, no rapeseed, half the sugar, color does the work. House recipe-video convention, the pour is the hero."}
  ]
};


const WELCOME_HIGHLIGHTS = [
  {
    stat:"green light coming",
    label:"regulators want a label you can judge at a glance — and a clean carton already reads green",
    detail:"Regulators signaled a color-coded front-of-pack label — red/yellow/green — is the next move, with the whole point being that shoppers can judge a food without flipping it over and reading the back. The ultra-processed-food definition is awaiting final sign-off. our move: a calm-authority Reel where a 4-ingredient carton reads green before you flip it — the label catching up to what's been on the carton, carton as the lead, never panic.",
    color:"#73B2C9",
    icon:"🚦",
    glyph:"🚦",
    kindLabel:"Policy Signal",
    sources:[
      {label:"FoodNavigator USA · Kennedy signals new course for food labels as FDA nears UPF definition (Jun 16, 2026)", url:"https://www.foodnavigator-usa.com/Article/2026/06/16/fda-ultra-processed-food-definition-could-reshape-front-of-pack-labels/"},
      {label:"Agri-Pulse · Kennedy: defining ultra-processed foods is first step toward reshaping Americans' diets (mid-Jun 2026)", url:"https://www.agri-pulse.com/articles/24812-kennedy-defining-ultra-processed-foods-is-first-step-toward-reshaping-americans-diets"}
    ]
  },
  {
    stat:"~30M kids",
    label:"the school lunch line just opened a plant-milk slot — a parent's note unlocks it",
    detail:"A new law lets schools serve nutritionally-equivalent non-dairy milk as a standard menu option and lets a parent's note, not a physician's, qualify a child for a dairy-free pour — reaching roughly 30 million students. The open question at pickup is which carton is actually clean enough to send. our move: a parenting Reel that answers 'which one would I actually send' with Willa's Kids — 8g protein, top-9 allergen-free, Yuka 100 — in cofounder-mom or brand 'we' voice.",
    color:"#9E652E",
    icon:"🏫",
    glyph:"🏫",
    kindLabel:"Parenting Signal",
    sources:[
      {label:"Plant Based News · US Senate votes to give school kids access to plant-based milk (school-lunch law explainer)", url:"https://plantbasednews.org/culture/law-and-politics/senate-school-kids-plant-based-milk/"},
      {label:"Plant Based Foods Association · Policy win: new law expands student access to plant-based milks", url:"https://plantbasedfoods.org/latest/senate-passes-legislation-increase-plant-based-milk-in-schools"}
    ]
  },
  {
    stat:"+173% searches",
    label:"summer's breakout cafe drink wants a creamy pour nobody's claimed yet",
    detail:"Hojicha — roasted Japanese green tea — is the cafe breakout of summer 2026, the smoother, naturally-lower-caffeine answer to matcha, with 'hojicha latte' searches up roughly 173% and cafes pairing iced hojicha specifically with oat milk and vanilla. Unlike the matcha-shortage story, this is a flavor-discovery wave with an open creamy-base lane. our move: a 'let's make an iced hojicha latte (dairy-free!)' Barista recipe Reel — nutty profile, rich low-sugar base, first to plant the oat-milk flag.",
    color:"#75C596",
    icon:"🍵",
    glyph:"🍵",
    kindLabel:"Viral Recipe",
    sources:[
      {label:"TikTok · #hojicha hashtag landing page (permanent reference)", url:"https://www.tiktok.com/tag/hojicha"},
      {label:"TikTok · #hojichalatte hashtag landing page (permanent reference)", url:"https://www.tiktok.com/tag/hojichalatte"}
    ]
  },
  {
    stat:"#JoyMagenta",
    label:"the wellness internet just named its year — permission to enjoy food again",
    detail:"The wellness world reframed the year's defining shift away from measurement toward 'joy in gratitude — abundance over scarcity' and 'joy through connection — shared meals,' anchored to Global Wellness Day (Jun 13) and its #JoyMagenta theme. After a decade of scores and restriction, the cultural permission slip is back: eat the breakfast, share the carton, stop auditing it. our move: a celebrate-food stitch that pours the morning as the joyful, shareable thing — sunlit and slow — Willa's IS the brand that says nourish, don't track.",
    color:"#A191B2",
    icon:"🎉",
    glyph:"🎉",
    kindLabel:"Wellness Signal",
    sources:[
      {label:"Global Wellness Summit · the Trends in the News, June 2026 (Jun 16, 2026)", url:"https://www.globalwellnesssummit.com/trendium/the-trends-in-the-news-june-2026/"},
      {label:"Global Wellness Day · #JoyMagenta official theme page", url:"https://www.globalwellnessday.org/joymagenta/"}
    ]
  },
  {
    stat:"1 in 4 Americans",
    label:"the World Cup turned a quarter of the country into new fans — the watch-party pour is up for grabs",
    detail:"The World Cup, hosted across North America, has more than one in four Americans saying they're newly interested in soccer because of the tournament, with conversation up nearly sixfold since January and still accelerating — a genuine mass-cultural, family-gathering moment with watch parties spilling into every kitchen. our move: ride the halftime table, not the sport — one carton feeds the room, a kids' chocolate pour beside an adult iced coffee, no sports-bro register, no halftime sugar bomb.",
    color:"#73B2C9",
    icon:"⚽",
    glyph:"⚽",
    kindLabel:"Cultural Conversation",
    sources:[
      {label:"PR News Online · When Culture Moves, Brands Follow (World Cup, Toy Story 5) (Jun 2026)", url:"https://www.prnewsonline.com/pr-roundup-when-culture-moves-brands-follow-lessons-from-kalshi-the-world-cup-and-toy-story-5/"}
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
  "Regulators are floating a red/yellow/green label so shoppers can judge a food at a glance — how hard do we lean on our carton already reading green without sounding like we're chasing the policy?",
  "The school lunch line just opened a plant-milk slot and a parent's note unlocks it — what's the warmest way to say 'this is the one I'd actually send' without making it feel like an ad?",
  "Hojicha is summer's breakout cafe drink and nobody in the oat lane has claimed it — how do we plant the dairy-free flag first before the chains package it?",
  "Doctors are pushing back on the protein-soda trend — what's the calmest way to say real food beats a fizzy filler-shake without sounding preachy?"
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
