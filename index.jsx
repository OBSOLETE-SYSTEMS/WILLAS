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
    trend:"America's 250th turns July 4 into the biggest cookout table of the decade — and the drink cooler is wide open 🇺🇸",
    detail:"July 4, 2026 lands on a Saturday AND marks the Semiquincentennial — America's 250th birthday — making it the single largest cookout-and-gather day of the year, with 16-day civic festivals running in Philadelphia, NYC and DC across Jul 3-5. Trend coverage points to lighter, more visual entertaining (frozen-drink machines, layered patriotic lemonades, melon-caprese skewers) replacing heavy fare, and a kitchen full of people who haven't decided what's in the kids' cups yet.",
    platform:"Holiday + entertaining press",
    views:"National semiquincentennial cycle",
    velocity:"high",
    pillars:[
      "INGREDIENTS/RECIPES",
      "PARENTING"
    ],
    angle:"Own the heritage table, not the fireworks. Make a 'passed-down, reinvented forward' Reel — a red-white-blue oat-milk drink the whole gathering pours from one carton.",
    urgency:"RIDE NOW",
    sources:[
      {label:"America250 · July 4 Moments — Semiquincentennial events (2026 reference)", url:"https://america250.org/july-4-moments/"},
      {label:"Food Network · July 4th Favorites & Recipes (Jun 28, 2026)", url:"https://www.foodnetwork.com/recipes/photos/july-4th-favorites"}
    ]
  },
  {
    id:"T-2",
    trend:"Beans and pulses are officially out-growing meat — fava, lentil and chickpea protein is the category's fastest-rising lane 🫘",
    detail:"The pulse-protein market is forecast to outpace meat in every major region through 2030 (beans/pulses +1.7% annual volume vs. meat +0.7%), with the broader plant-protein market projected to hit $24.3B in 2026. Fava and almond proteins are the fastest-growing ingredients, and legumes now drive 41% of new fiber-and-protein product launches — a structural shift toward whole-plant nutrition that an oat groat sits squarely inside.",
    platform:"Trade press + category research",
    views:"Plant-protein category cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    healthSubAngle:"GUT",
    angle:"The whole-plant protein wave is the category's center of gravity now. Make a confident Original Reel: protein AND fiber kept in, not isolated back — the whole oat groat, bran and germ included.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Just Food · Full of Beans — plant-based protein boom 2026 (reference)", url:"https://www.just-food.com/comment/full-of-beans-could-2026-see-a-boom-in-plant-based-proteins/"},
      {label:"Nutrition Insight · GLP-1 therapies beyond blood sugar (Jun 22, 2026)", url:"https://www.ajmc.com/view/glp-1-therapies-in-2026-beyond-blood-sugar-and-the-scale"}
    ]
  },
  {
    id:"T-3",
    trend:"AAP just put plant-based kid nutrition on the record — pediatricians endorse legumes and plant protein at every age 🩺",
    detail:"The American Academy of Pediatrics formally endorses well-planned plant-based diets for children of all ages, framing beans, lentils, soy and plant protein as a mainstream choice rather than a niche substitute (kids 4-8 need about 19g protein daily). It's medical air-cover for parents who want a clean, plant-forward pour — and it lands the same month the federal school milk-choice rules took effect, widening the lane for premium dairy-free options.",
    platform:"Pediatric guidance + parenting press",
    views:"National kids-nutrition cycle",
    velocity:"medium",
    pillars:[
      "PARENTING",
      "HEALTH/WELLNESS"
    ],
    angle:"Pediatric guidance now backs plant protein for kids. Make a PARENTING carousel on what a parent actually checks on a kids' pour — protein, sweetener, allergens, organic — answered by Willa's Kids (8g protein, Yuka 100).",
    urgency:"THIS WEEK",
    sources:[
      {label:"HealthyChildren.org (AAP) · Plant-Based Diets for Children (permanent reference)", url:"https://www.healthychildren.org/English/healthy-living/nutrition/Pages/Plant-Based-Diets.aspx"},
      {label:"Nutrition Insight · Kidfresh top nutritional food trends for US children 2026 (reference)", url:"https://www.nutritioninsight.com/news/kidfresh-children-food-nutrition-market-research-2026.html"}
    ]
  },
  {
    id:"T-4",
    trend:"Health and price now beat sustainability at the shelf — the new buy-trigger is nutritional payoff per dollar 💸",
    detail:"Fresh 2026 consumer research finds health is the #1 driver of dietary change, with affordability now the #2 driver — sustainability has slipped to third. The takeaway for the milk aisle: shoppers are weighing what a carton actually does for them (density, real fiber and protein, recognizable ingredients) over an eco-narrative alone. The value story is nutritional ROI, not virtue.",
    platform:"Trade press + consumer research",
    views:"Category buy-trigger cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "REVIEWS/RECS"
    ],
    angle:"Lead with nutritional payoff, not eco-credentials. Make a receipts-first Original Reel: the whole oat keeps more protein and fiber per cup — the carton that earns its place by what's in it.",
    urgency:"BACKGROUND",
    sources:[
      {label:"Nutrition Insight · fiber + health concerns top 2026 US list (Jun 22)", url:"https://www.nutritioninsight.com/news/health-nutrition-trends-2026-us-news-glp1.html"},
      {label:"Food Service Director · how consumers really feel about protein and fiber (Jun 25, 2026)", url:"https://www.foodservicedirector.com/food-beverage-trends/how-consumers-really-feel-about-protein-and-fiber"}
    ]
  },
  {
    id:"T-5",
    trend:"Beta-glucan gets the clinical stamp — daily oats documented to lower LDL cholesterol in peer-reviewed work 🫀",
    detail:"Northwestern Medicine's June 2026 review confirms oat beta-glucan — the soluble fiber in whole oats — is documented in peer-reviewed research to lower LDL cholesterol when eaten daily, positioning oat-based products as functional heart tools, not just a taste swap. The same review flags the catch: most oat milk delivers only 2-4g protein per cup because the protein gets filtered out in processing.",
    platform:"Clinical + nutrition press",
    views:"Heart-health nutrition cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    healthSubAngle:"HEART",
    angle:"Most oat milks filter the fiber-and-protein out — the part the clinical story rewards. Make a calm Original explainer: the whole groat keeps beta-glucan AND 4g+ protein in the cup.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Northwestern Medicine · Is oat milk healthier than cow's milk? (Jun 21, 2026)", url:"https://www.nm.org/healthbeat/healthy-tips/nutrition/is-oat-milk-healthier-than-cows-milk"},
      {label:"Forum Health · fibermaxxing — why fiber is the 2026 trend (Jun 23, 2026)", url:"https://forumhealth.com/nutrition/fibermaxxing-the-2026-trend-worth-paying-attention-to/"}
    ]
  },
  {
    id:"T-6",
    trend:"Postbiotics are the next gut-health frontier — and prebiotic fiber is the raw material they're built from 🦠",
    detail:"Gut-health innovation is shifting from live-bacteria probiotics toward postbiotics — the beneficial compounds (like short-chain fatty acids) that the body makes when gut bacteria ferment fiber. With roughly 70% of consumers now naming fiber the top nutrient they want more of, the science quietly reframes prebiotic fiber as the input that powers the whole microbiome story, no live-culture shelf-life gymnastics required.",
    platform:"Nutrition science + trade press",
    views:"Microbiome category cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS"
    ],
    healthSubAngle:"GUT",
    angle:"Skip the live-culture arms race — the gut story starts with the fiber that feeds it. Make a plain-English Original Reel on prebiotic fiber as the raw material, glossed in one line.",
    urgency:"BACKGROUND",
    sources:[
      {label:"Nutrition Insight · gut health innovations 2026 — biotics + personalized nutrition (Jun 24, 2026)", url:"https://www.nutritioninsight.com/news/gut-health-trends-2026-biotics-personalized-nutrition.html"},
      {label:"Nutrition Insight · 2026 health trends (Jun 22, 2026)", url:"https://www.nutritioninsight.com/news/health-nutrition-trends-2026-us-news-glp1.html"}
    ]
  },
  {
    id:"T-7",
    trend:"76% of kids worldwide run short on DHA — the omega-3 their brains are built on 🧠",
    detail:"Peer-reviewed pediatric data shows roughly 76% of children globally don't get enough DHA, the omega-3 fatty acid critical for brain and eye development, with pediatricians recommending 250-500mg combined EPA+DHA daily from age one. As school cafeterias trim omega-3 sources, parents are reading labels for DHA-fortified options — a deficiency hiding in plain sight on most kids' drinks.",
    platform:"Pediatric research + parenting press",
    views:"Kids-nutrition deficiency cycle",
    velocity:"medium",
    pillars:[
      "PARENTING",
      "HEALTH/WELLNESS"
    ],
    healthSubAngle:"IMMUNE",
    angle:"Most kids' drinks skip the omega-3 their brains need. Make a parent-pain-point Kids Reel — what to look for on a kids' pour, answered by Willa's Kids with algae DHA built in.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Omegor · omega-3 for children's cognitive abilities (peer-reviewed pediatric data, reference)", url:"https://www.omegor.com/en/blogs/omega-3-heart/omega-3-for-children-and-adolescents-supplements-with-450-mg-of-epa-and-dha-and-omega-3-index-of-6-are-needed-to-improve-cognitive-performance"},
      {label:"HealthyChildren.org (AAP) · Plant-Based Diets for Children (permanent reference)", url:"https://www.healthychildren.org/English/healthy-living/nutrition/Pages/Plant-Based-Diets.aspx"}
    ]
  },
  {
    id:"T-8",
    trend:"Summer-camp and road-trip season pushes parents to protein-first, no-fridge-required packing 🎒",
    detail:"With camps reopening at full capacity, the late-June-through-mid-July window is peak season for snacks that travel without refrigeration and deliver sustained energy — parenting forums and camp-prep guides are filling with protein-first picks framed as 'fuel for fun' over sugar-driven treats. The shelf-stable, allergen-aware pour is exactly the slot a clean kids' carton fits.",
    platform:"Parenting press + seasonal cycle",
    views:"Summer-packing buy cycle",
    velocity:"medium",
    pillars:[
      "PARENTING",
      "REVIEWS/RECS"
    ],
    angle:"Parents are packing protein-first for camp and road trips. Make a portability Kids carousel — the allergen-free, 8g-protein pour that earns a spot in the cooler bag.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Mommy Poppins · 24 summer-camp snacks for kids that aren't boring (reference)", url:"https://mommypoppins.com/kids/camps/healthy-snacks-kids-summer-camp-food"},
      {label:"Nutrition Insight · Kidfresh top nutritional food trends for US children 2026 (reference)", url:"https://www.nutritioninsight.com/news/kidfresh-children-food-nutrition-market-research-2026.html"}
    ]
  },
  {
    id:"T-9",
    trend:"Unsweetened plant milk is now the fastest-growing slice of a $1B+ US oat category 📈",
    detail:"The US oat-milk market is worth about $0.97B in 2026 and on track for $1.74B by 2031, with unsweetened variants forecast to grow fastest (about +14.7% annually) — outpacing flavored options as shoppers chase whole-ingredient, lower-sugar pours. Whole-grain positioning plus protein and fiber are moving from selling point to baseline expectation across the category.",
    platform:"Trade press + category research",
    views:"Oat-milk category-growth cycle",
    velocity:"medium",
    pillars:[
      "INGREDIENTS/RECIPES",
      "HEALTH/WELLNESS"
    ],
    angle:"Lower-sugar, whole-ingredient pours are where the growth is. Make a confident Original receipts Reel — 1g sugar, 4 ingredients, the whole oat — the carton already living where the category is heading.",
    urgency:"BACKGROUND",
    sources:[
      {label:"Northwestern Medicine · is oat milk healthier — beta-glucan + LDL (Jun 21)", url:"https://www.nm.org/healthbeat/healthy-tips/nutrition/is-oat-milk-healthier-than-cows-milk"},
      {label:"Industry Arc · pulse proteins market forecast (Jun 22, 2026)", url:"https://www.industryarc.com/PressRelease/4349/Pulse-Proteins-Market"}
    ]
  },
  {
    id:"T-10",
    trend:"'Authoritative 2.0' parenting rewrites mealtime — firm food rules, no short-order cooking, real ingredients win ✋",
    detail:"The dominant 2026 parenting philosophy, dubbed 'Authoritative 2.0,' abandons both helicopter and permissive models for clear, non-negotiable food rules paired with emotional attunement — family meals matter, no separate kid menu. It favors 'upgraded classics': familiar foods kids recognize, rebuilt with real ingredients, no added sugar, no dyes. Picky eating drops when boundaries are clear and the food is genuinely good.",
    platform:"Parenting press + nutrition research",
    views:"Modern-parenting culture cycle",
    velocity:"medium",
    pillars:[
      "PARENTING",
      "HEALTH/WELLNESS"
    ],
    angle:"The upgraded-classic is the winning move — same chocolate milk kids ask for, rebuilt clean. Make a Chocolate Reel: real cacao, 5 ingredients, the pour that needs no separate 'healthy' version.",
    urgency:"THIS WEEK",
    sources:[
      {label:"HOLA! · almond-mom vs butter-mom archetypes resurface (Jun 22)", url:"https://www.hola.com/us/lifestyle/20260408894252/what-type-mom-are-you-almond-butter-gummy-bear/"},
      {label:"Nutrition Insight · Kidfresh top nutritional food trends for US children 2026 (reference)", url:"https://www.nutritioninsight.com/news/kidfresh-children-food-nutrition-market-research-2026.html"}
    ]
  }
];



const TICKER = [
  {agent:"composer", text:"wrote \"real food, passed down. reinvented forward.\" against America's 250th — one clean carton poured for the whole heritage table, a layered red-white-blue cooler everyone shares, no separate kids' version."},
  {agent:"pulse", text:"caught the Charli XCX stuck-frame glitch as the template eating FoodTok — froze the beat on the back label and unfroze to \"the one with four ingredients,\" the four-line list as the payload."},
  {agent:"trend", text:"logged beans + pulses out-growing meat as the category's center of gravity — answered with \"the protein wave doesn't need another isolate. it needs a whole plant,\" 4g protein and fiber kept in the whole oat."},
  {agent:"pulse", text:"rode FoodTok's dense bean salad with \"protein-and-fiber plate, meet your protein-and-fiber pour\" — built the salad, poured a chilled Willa's Original alongside as the creamy whole-oat counterpart."},
  {agent:"pulse", text:"answered the zero-waste DIY oat-milk clips calmly — \"the diy instinct is right. it just strains out the good part,\" the whole groat kept in, nothing strained in or out, aunt-at-the-table not the dunk."},
  {agent:"pulse", text:"made the swap nobody on the FYP made yet — \"dairy-free protein flatbread,\" blended Kite Hill almond cottage cheese plus a splash of Willa's Original as the creamy bind, high-protein, no dairy."},
  {agent:"composer", text:"answered the milk-aisle scan with \"four things every parent checks before it goes in the cup — one carton clears all four,\" Willa's Kids: 8g protein, organic maple, allergen-free, Yuka 100."},
  {agent:"composer", text:"retired the two-chocolate-milk fridge with \"no kid menu. no negotiating. the one they reach for\" — Willa's Chocolate, real cacao, 5 ingredients, half the sugar of dairy, the upgraded classic."},
  {agent:"editor", text:"claimed the 250th cookout off the World Cup with \"one cooler — it carries the whole afternoon\" — a kids' Chocolate pour and an iced Barista for the grown-ups, no sports-bro register, the match blurred behind."},
  {agent:"comp", text:"watched the category run a viral oat-milk froth bracket — countered with \"rate the pour, but check the back of the carton before you score it,\" no rapeseed, no gums, 50% less sugar as the tiebreaker."},
  {agent:"composer", text:"answered the heart-news cycle with \"the part that's good for your heart is the part most oat milks pour down the drain\" — Willa's keeps the beta-glucan AND 4g+ protein in the whole oat."},
  {agent:"hook", text:"rode the Facebook Marketplace chaos-dining bit with \"sourcing dinner off Marketplace — but the oat milk? i can actually read it,\" the 4-ingredient label as the dry punchline, never sneering at the seller."}
];


const COMPETITORS = [
  {
    id:"C-1",
    name:"Oatly",
    color:"#1F6F54",
    status:"Rolled out its 'Sip Back & Relax' summer campaign June 25, 2026, launching a Matcha Latte Strawberry Flavour RTD and partnering with UK wellness spaces (saunas, nail bars) for complimentary pours — a wellness-as-affordable-self-care positioning aimed at a flavor-forward summer.",
    direction:"up",
    opportunity:"Self-care is the pitch; clean ingredients are the proof. Counter with a home self-care pour Reel — a calm Barista build, 50% less sugar, no rapeseed — wellness you can read on the label.",
    sources:[
      {label:"RetailTimes · Oatly launches Sip Back & Relax campaign (Jun 25, 2026)", url:"https://retailtimes.co.uk/oatly-launches-a-new-campaign-encouraging-the-nation-to-take-a-moment-to-sip-back-and-relax/"}
    ]
  },
  {
    id:"C-2",
    name:"Category froth test",
    color:"#C9A23F",
    status:"A viral June 21, 2026 oat-milk frothability tournament pitted major brands head-to-head on texture and ingredients, treating the category like a sport with real product differentiation — signaling that shoppers are now actively comparing oat milks on performance, not just grabbing a default.",
    direction:"flat",
    opportunity:"Shoppers are scoring oat milks like a bracket. Make a confident Barista performance Reel — froth and pour proof — that wins on the back-label too: whole oat, no gums, no rapeseed.",
    sources:[
      {label:"TikTok · @itsblume oat milk froth tournament (Jun 21, 2026)", url:"https://www.tiktok.com/@itsblume/video/7359298857483635973"}
    ]
  },
  {
    id:"C-3",
    name:"Ghia",
    color:"#8FAE3C",
    status:"Ghia's late-June 2026 content doubles down on founder Mélanie's origin story paired with serve-it-this-way ritual tutorials — repositioning a non-alcoholic aperitif from practical to premium lifestyle, reaching a ~$50M valuation and 2,800+ retail doors on founder-credibility plus how-to.",
    direction:"up",
    opportunity:"Borrow the founder-story-plus-ritual move — a heritage-anchored Willa's beat where grandmother Willa's origin pairs with a 'how we pour it' tutorial. Founder credibility is the format, not a tag.",
    sources:[
      {label:"TikTok · @drinkghia founder-story content (Jun 28, 2026)", url:"https://www.tiktok.com/@drinkghia"}
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
    id:"JUN29-TT-1",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Wed Jul 1 · 10am",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"the glitch freezes on the one with four ingredients.\" — stuck-frame reveal, 4-ingredient payload",
    intel:[
      {type:"PULSE", text:"The Charli XCX 'Rock Music' stuck-frame glitch — sync to the track's mid-song vocal malfunction, freeze the moment with a glitch animation, then unfreeze to the payoff — is the template eating FoodTok (CP-3). The freeze IS the reveal, so what Willa's freezes on is the carton back-label landing the shortest ingredient list in the aisle: organic whole oats, filtered water, organic vanilla, sea salt. The whole oat groat (bran + germ, not oat syrup) is the move, named in the unfreeze."},
      {type:"AUDIENCE", text:"FoodTok scrolls fast and the glitch beat is a built-in retention hook — viewers wait through the freeze to catch the payoff, which is exactly where the four-line proof point lands. The format already has thousands of executions, so the template does the reach work while the back-label does the brand work — no talent, no explainer, just hands and product."},
      {type:"COMPETITOR", text:"Internal only: most oat milks filter out both the bran AND germ, then process the starch into sugar — the part the whole-plant nutrition wave (T-2) and the clinical beta-glucan story (T-5) both reward. Never name a competitor on the surface; let the frozen four-line label be the entire contrast."}
    ],
    hooks:[
      {text:"the glitch freezes on the one with four ingredients.", recommended:true},
      {text:"wait for the freeze — that's where the label gives itself away.", recommended:false},
      {text:"POV: the beat glitches and the oat milk with nothing to hide is frozen on screen.", recommended:false}
    ],
    caption:"Most oat milks would NOT survive a freeze-frame on the back label. ✋🥛\n\nWilla's Original is the whole plant milk — made from the whole entire oat groat (bran, germ and all), not oat syrup. Most oat milks filter out both the fiber AND the protein, then process the starch into sugar. We keep the good stuff in.\n\nFreeze the frame on what's actually in the cup:\n• 1g sugar (from the oats, nothing added)\n• 4g+ protein\n• 2g+ prebiotic fiber (the gut-supporting fiber in whole oats)\n• 4 real ingredients, no isolates, no gums\n\nOrganic whole grain oats. Filtered water. Organic vanilla extract. Sea salt. That's the whole list. 📋\n\nUSDA Organic. Non-GMO. Certified glyphosate-free — tested every lot. The label that reads better the longer you stare at it.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#rockmusic",
      "#wholeplant",
      "#cleaningredients",
      "#labelcheck",
      "#4ingredients",
      "#dairyfree",
      "#fyp",
      "#foodtok"
    ],
    visual:"Bright, high-saturation kitchen on a clean white-and-blue counter, hard summer daylight, fast-cut energy synced to the 'Rock Music' track. Open on a quick pour montage — hands tilting the Willa's Original carton into a frosty glass, creamy whole-oat body, condensation beading (carton holds 40%+ of frame, label readable). On the deliberate mid-song glitch beat, the image FREEZES with a chromatic-aberration / VHS-glitch animation locking the frame mid-pour. The freeze holds on the carton's back label, glitch shimmer overlaying it. Then UNFREEZE: snap to a crisp clean shot of the four-ingredient list as a bold typographic card, one line at a time. Final overhead of the four real ingredients laid out — oats in a small bowl, filtered water, organic vanilla bottle, pinch of sea salt — carton beside them. Trend-forward, playful, hands-and-product only, no talent on camera.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Fast pour montage: hands tilt the Willa's Original carton into a frosty glass, creamy thick stream, hard cuts on the beat. Bright backdrop, handheld-tight. Text overlay (bold, top): 'the glitch freezes on the one with four ingredients.' Audio: Charli XCX 'Rock Music' building toward the drop."},
      {scene:"THE GLITCH FREEZE", time:"3-7s", action:"On the deliberate mid-song vocal-malfunction beat, the frame FREEZES mid-pour with a chromatic-aberration / VHS-glitch animation locking it. The freeze holds on the carton's back label, glitch shimmer over it. No new overlay — let the format's signature beat carry. Camera locked."},
      {scene:"THE UNFREEZE", time:"7-11s", action:"Snap UNFREEZE on the beat resolve: hard cut to the carton back label in sharp focus, 40%+ of frame. Overlay stings in one line at a time, fast: 'whole oat groat — bran, germ and all.' Then: 'not oat syrup.' Creamy pour resumes underneath."},
      {scene:"THE PAYLOAD", time:"11-15s", action:"Tight on the glass + label. Overlay stings the receipts one line at a time: '1g sugar · 4g+ protein · 2g+ fiber.' Then: '4 real ingredients. no isolates. no gums.' Quick condensation drip on the glass for texture."},
      {scene:"THE LIST", time:"15-19s", action:"Overhead match-cut to the four real ingredients arranged clean: oats in a bowl, filtered water, organic vanilla bottle, pinch of sea salt. Bold typographic overlay lists them one at a time. Hand slides the carton into frame beside them."},
      {scene:"END CARD", time:"19-22s", action:"Snap to the carton alone on the bright counter, glass beside it. End-card text: 'the label that reads better the longer you stare.' Small tag: 'Willa's Original · the whole plant milk.' Audio resolves."}
    ],
    audio:"Charli XCX 'Rock Music' — the stuck-frame glitch trend audio, cut so the deliberate mid-song vocal malfunction lands the freeze. Warm narrative voiceover kept minimal (let the format carry); VO lands only the stinger on the unfreeze: 'most oat milks would not survive a freeze-frame on the back label.' Fast cuts synced to the beat.",
    duration:"15-25 seconds",
    cta:{soft:"freeze on your oat milk's label — what does it say? 👀", medium:"the back label that reads green before you flip it — that's the move.", strong:"grab the four-ingredient one at willaskitchen.com 🥛"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN29-IG-R1",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Multi",
    dnaPattern:"before-after-stitch",
    timing:"Wed Jul 1 · 12pm",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"real food, passed down. reinvented forward.\" — 250th heritage-table pour",
    intel:[
      {type:"PULSE", text:"America's 250th is reframing July 4 from fireworks to roots — whose-recipe-is-this, grandmother dishes, the foods that made it to American tables across 250 years (CP-6, T-1). Willa's owns this register without forcing it: a grandmother-founded brand built on 'real food, passed down. reinvented forward.' The move is one clean carton poured for the whole gathering — heritage as the lead, the carton belongs because the table does."},
      {type:"AUDIENCE", text:"Hosts pouring for a multi-generation cookout on Sat Jul 4 haven't decided what's in everyone's cups — and they're craving lighter, more visual entertaining (layered drinks, frozen machines) over heavy fare. This Reel hands them one beautiful red-white-blue pour the whole table shares from a single carton, no separate kids' version, no decoding a label at the party."},
      {type:"COMPETITOR", text:"Internal: the rest of the oat-milk shelf has no heritage to pour from — most filter out the bran + germ and process the starch into sugar, and none carry a 1921 grandmother origin. Keep the surface to 'real food, passed down' — never name a competitor, never frame this as a comparison piece."}
    ],
    hooks:[
      {text:"250 years of american tables. the best recipes didn't get invented — they got handed down.", recommended:true},
      {text:"real food, passed down. reinvented forward. one carton, the whole table.", recommended:false},
      {text:"the heritage table doesn't need fireworks. it needs one carton everyone pours from.", recommended:false}
    ],
    caption:"Real food, passed down. Reinvented forward.\n\n250 years of American tables, and the dishes that lasted are the ones that got handed down — a grandmother's hands, real ingredients, no shortcuts. Willa's started the same way: our founder's grandmother, Willa, born 1921, cooked with whole, real food long before it was cool. We just reinvented it forward into a carton.\n\nFor the America's 250th gathering, one clean carton everyone pours from — a layered red-white-blue oat-milk cooler the whole table shares. No separate kids' version. No label to decode at the party.\n\nThe pour:\n· Willa's Original Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup 🥛\n· blended fresh strawberries + a touch of maple for the red\n· Willa's Original, poured slow over ice, for the white\n· wild blueberries blended with a splash of Willa's for the blue\n\n1g sugar · 4g+ protein · 2g+ prebiotic fiber · 4 ingredients. Organic. Certified glyphosate-free, tested every lot.\n\n\"Real food, passed down. Reinvented forward.\" The carton belongs because the table does. 🇺🇸\n\nNourish the spark in everyone.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#realfoodpasseddown",
      "#americas250",
      "#fourthofjuly",
      "#heritagerecipes",
      "#organicoatmilk",
      "#dairyfree",
      "#wholeoat",
      "#redwhiteandblue"
    ],
    visual:"Bright, warm, heritage-meets-now — sunlit table, golden afternoon light, soft long shadows of a gathering. This is a Christina-reserved heritage beat: Christina appears briefly in-frame (hands + a glimpse, founder presence), pouring; otherwise hands + product + the layered drink do the work. HERO: a single Willa's Original carton on the table, on screen 40%+ throughout, pouring for everyone. Open on an old-feel detail — a worn handwritten recipe card or a grandmother's glass — then cut forward to the modern pour: a tall clear glass building red (blended strawberry) → white (Willa's Original over ice) → blue (wild-blueberry blend) in clean layers, natural color only, no dyes. Multiple mismatched heirloom glasses on a linen runner, oats and fresh berries in soft focus, one carton at the center feeding them all. Avoid flags-and-fireworks clutter; the patriotism is in the red-white-blue drink + the heritage register, not bunting. Text overlays in friendly sans, navy ink (#202A44) on cream. Lofi, unhurried pacing.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Close-up, warm and slightly nostalgic: a worn handwritten recipe card and a grandmother's vintage glass on a linen runner, dust-soft morning light. Text overlay fades in: 'real food, passed down.' Slow pull-back begins on the beat."},
      {scene:"STITCH-FORWARD", time:"3-7s", action:"Match-cut forward in time — same table, now set for a gathering, mismatched heirloom glasses lined up. Willa's Original carton lands at the center. Text overlay: 'reinvented forward.' Christina's hands enter to start the pour (founder presence, no talking head)."},
      {scene:"BUILD-RED", time:"7-11s", action:"Tight on a tall clear glass over ice: blended fresh strawberry + maple poured first for a vivid natural red layer. Text overlay: 'real ingredients. natural color, no dyes.' Carton visible in soft focus behind."},
      {scene:"BUILD-WHITE-BLUE", time:"11-16s", action:"Willa's Original poured slow over the back of a spoon for a clean white middle layer, then a wild-blueberry blend spooned on top for the blue. The red-white-blue layers settle. Text overlay builds: 'one carton · the whole table · whole oat, bran + germ + all'. Carton stays 40%+ of frame."},
      {scene:"THE-TABLE", time:"16-20s", action:"Pull wide: the single Willa's carton pouring into glass after glass down the runner — kids' glasses and adults' glasses from the same carton, hands reaching in. Text overlay: '1g sugar · 4g+ protein · organic · glyphosate-free.' Warm, full-table energy."},
      {scene:"END CARD", time:"20-24s", action:"Settle on the layered red-white-blue glass beside the carton and the old recipe card, oats + berries in soft focus. End-card stinger animates: 'the carton belongs because the table does.' Small Willa's logo lower-third. Tagline: 'Nourish the spark in everyone.'"}
    ],
    audio:"Founder voiceover — Christina, warm and unhurried, heritage register, a half-smile in the delivery; reads the 'real food, passed down. reinvented forward.' line over the pour, never a hard sell. Slow-folk instrumental bed (soft acoustic guitar + light keys), low and sunlit, the pace of a Saturday gathering. No combative or salesy tone; the warmth is the point.",
    duration:"15-25 seconds",
    cta:{soft:"pour one carton for the whole table Sat Jul 4.", medium:"skip the separate kids' version — one clean carton everyone shares.", strong:"build the red-white-blue pour from one Willa's carton for the 250th gathering."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUN29-TT-6",
    platform:"TikTok",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"mom-activist",
    timing:"Wed Jul 1 · 7pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the omega-3 their brain runs on? most kids' drinks skip it. Willa's Kids pours it.\" — confession-style kids' pour POV",
    intel:[
      {type:"TREND", text:"Willa's Kids is built around the omega-3 most kids' drinks skip — algae DHA (the brain-and-eye fat kids are built on), 8g protein, Yuka 100/100, top-9 allergen-free. The backdrop: peer-reviewed pediatric data shows roughly 76% of kids worldwide run short on DHA, with pediatricians recommending 250-500mg combined EPA+DHA daily from age one (T-7). So the move isn't 'panic about a deficiency' — it's 'here's the pour that already builds it in.' Lead with the answer, the stat is the why-now."},
      {type:"AUDIENCE", text:"Parents quietly read the back of every kids' drink and feel like they need a nutrition degree to do it. The confession that lands: 'I assumed the kids' carton I grabbed had this. it didn't.' Naming the one thing worth looking for (the omega-3 their brain runs on) turns a vague worry into a single, doable check — and Willa's Kids is the relief, not the homework."},
      {type:"COMPETITOR", text:"Internal only: the kids RTD sub-lane mostly competes on sugar and protein, and DHA is the spec almost nobody fortifies — Willa's algae DHA is a genuine whitespace claim no other clean kids' oat milk can match. Never name a competitor on the surface; frame as 'most kids' drinks,' category-level only."}
    ],
    hooks:[
      {text:"the one thing i never thought to check on my kid's drink: the omega-3 their brain runs on.", recommended:true},
      {text:"76% of kids run short on DHA — the omega-3 their brains are built on. most kids' drinks skip it. ours pours it.", recommended:false},
      {text:"confession: i assumed my kid's milk had the brain omega-3. it didn't. this one does.", recommended:false}
    ],
    caption:"Willa's Kids pours the one thing most kids' drinks quietly skip: DHA — the omega-3 their brains and eyes are built on. 🧠🥛 We put it in on purpose, from algae (no fish, no top-9 allergens), because parents asked us for a kids' drink they didn't have to second-guess.\n\nHere's the part nobody clocks until they flip the carton: roughly 76% of kids worldwide run short on DHA, and most kids' cartons add zero. Pediatricians suggest 250-500mg of EPA+DHA a day from age one — and it's hiding in plain sight on the front of the fridge.\n\nWhat's actually in the Willa's Kids pour:\n- Algae DHA (the omega-3 their brain runs on)\n- 8g protein\n- 6g sugar (from organic maple, not cane)\n- Free of the top 9 allergens — no nut, soy, gluten, dairy, sesame\n- Yuka 100/100\n\nSame creamy pour your kid asks for. One less thing for you to second-guess. 🤍",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#dha",
      "#kidsnutrition",
      "#momsoftiktok",
      "#dairyfree",
      "#allergenfree",
      "#momtok",
      "#kidsdrinks"
    ],
    visual:"Warm, bright real-family kitchen on a sunlit counter, lofi/chill audio, trend-forward but tender. No talent on camera — hands + product + the kid's-cup ritual do the work (cofounder-mom voiceover carries the first-person POV off-camera). Open on a parent's hand grabbing the Willa's Kids carton from the fridge, then pause-and-flip the carton to read it — the relatable confession beat. Cut to a clean pour into a kid's cup, creamy whole-oat body, carton readable and holding 40%+ of frame. Mid-video, a bold typographic sting names the one thing to look for (the omega-3 their brain runs on) over the carton front. Soft, abundant, no fear-mongering — the energy is relief, not alarm. End on the filled cup beside the carton in full daylight. High color saturation, warm neutral counter, hands-and-product only.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Close-up: a parent's hand pulls the Willa's Kids carton from a bright fridge and sets it on the counter. Cofounder-mom VO (off-camera, warm): 'the one thing i never thought to check on my kid's drink…' Text overlay (bold, top): 'the omega-3 their brain runs on.' Handheld-tight, sunlit."},
      {scene:"THE CONFESSION", time:"3-8s", action:"Hand flips the carton to read the front, finger pauses on the DHA callout — the 'oh, I assumed every kids' drink had this' beat. VO: 'i assumed the carton i grabbed already had it. most don't.' Text overlay stings in: 'DHA — the omega-3 kids are built on. most kids' drinks add zero.' Macro on the carton, label sharp."},
      {scene:"THE POUR", time:"8-13s", action:"Cut to a clean pour of Willa's Kids into a kid's cup, creamy whole-oat stream, condensation on the cup. Carton held just behind, label facing camera. VO: 'this one builds it in on purpose — from algae, no fish, no top-9 allergens.' Text overlay: 'algae DHA · built in on purpose.'"},
      {scene:"THE PAYLOAD", time:"13-18s", action:"Tight on the cup + carton. Overlay stings the receipts one line at a time, fast: '8g protein · 6g sugar (organic maple) · top-9 allergen-free.' Then: 'Yuka 100/100.' VO lands light: 'same pour they ask for — one less thing to second-guess.'"},
      {scene:"THE WHY-NOW", time:"18-22s", action:"Quick text card over the carton front, calm not alarmist: '~76% of kids run short on DHA.' Then: 'pediatricians suggest 250-500mg EPA+DHA a day from age one.' VO: 'it's the easiest one to check — and the easiest to fix.' Carton in soft focus behind the text."},
      {scene:"END CARD", time:"22-25s", action:"Snap to the filled kid's cup beside the Willa's Kids carton in full daylight. End-card text: 'the omega-3 their brain runs on — already in the pour.' Small tag: 'Willa's Kids · designed for kids' tastebuds. parent approved.' Audio resolves."}
    ],
    audio:"Cofounder-mom voiceover (off-camera, first-person mom POV — warm, conversational, relieved not alarmed) over a lofi/chill beat. VO walks the confession → the look-for → the pour, lands the proof points ('algae DHA, 8g protein, top-9 allergen-free') on the pour shot, closes tender on the kid's cup. Soft, with-a-wink, never clinical.",
    duration:"15-25 seconds",
    cta:{soft:"flip your kid's drink and look for the omega-3 — what does it say? 👀", medium:"the one spec worth checking on a kids' pour — and the one carton that already has it.", strong:"grab Willa's Kids at willaskitchen.com — DHA already built in 🥛"},
    benefitShorthandId:"BS-3"
  },
  {
    id:"JUN29-TT-2",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Thu Jul 2 · 10am",
    priority:"HIGH",
    rideNow:false,
    concept:"\"the diy instinct is right. it just strains out the good part.\" — calm oat-milk correction",
    intel:[
      {type:"PULSE", text:"Zero-waste 'just make your own oat milk' clips (½ cup oats + ice water, strain, 4-day fridge life) are circulating as the plastic-free, no-fillers flex — but the 30-second version strains out most of the oat's body and skips the salt balance and shelf-life a real carton holds (CP-4). Lead with the Willa's answer: the DIY instinct is right, and Willa's strains nothing extra in — organic, glyphosate-free, the whole groat kept. The DIY clip is the backdrop, not the hook. Apolitical peg."},
      {type:"AUDIENCE", text:"Willa's buyers are label-readers who genuinely admire the DIY move — they want fewer fillers, less plastic, food they can name. The correction has to honor that instinct, not dunk on it. They screenshot the calm, matter-of-fact version (you're right, here's the part the 30-second clip skips) and send it to the friend who keeps straining oats at midnight — never the lecture."},
      {type:"COMPETITOR", text:"Internal: the category is racing toward shorter ingredient lists and 'simple' positioning (C-1, C-2 froth/froth-tournament chatter), which makes 'fewer ingredients' table stakes, not a differentiator. Never name them. The contrast Willa's owns is the whole oat groat kept in — bran, germ, and all, organic + glyphosate-free — vs. either a watery DIY strain or a filtered store-bought, framed at the category level only."}
    ],
    hooks:[
      {text:"the 'just make your own oat milk' clips are right about one thing. and wrong about the part that matters.", recommended:true},
      {text:"straining oats in your kitchen pours out the exact part you wanted to keep.", recommended:false},
      {text:"the diy oat milk instinct is good. the diy oat milk is mostly water.", recommended:false}
    ],
    caption:"Willa's Original is organic, certified glyphosate-free, and made from the whole oat groat — bran, germ, and all. 4g+ protein, 2g+ prebiotic fiber (the kind that supports gut health), 1g sugar, 4 ingredients. Nothing strained in. Nothing strained out.\n\nThe DIY clips have the right instinct — fewer fillers, less plastic, food you can name. We're with you on that. Here's the part the 30-second version skips: straining oats and ice water pours most of the oat's body down the drain, and a homemade jar lasts about 4 days.\n\nWilla's keeps the whole groat the way steel-cut oats do — so the protein and the prebiotic fiber stay in the pour. Most oat milks filter out both the protein AND the fiber, then process the starch into sugar. We don't.\n\nOrganic. Non-GMO. Certified glyphosate-free. WBENC women-owned.\n\nThe DIY instinct is right. It just strains out the good part.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#diyoatmilk",
      "#zerowaste",
      "#wholeoat",
      "#cleanlabel",
      "#wholeplant",
      "#oatmilkrecipe",
      "#readthelabel",
      "#organicoatmilk"
    ],
    visual:"Bright, daylight-flooded kitchen counter, no talent on camera — hands + product + text overlays carry it. Open on a dramatized DIY build: hands tip ½ cup oats into a blender with ice water, blitz, then pour through a nut-milk bag — the strained pulp clumps thick in the bag, the liquid running out thin and watery into a jar. Shoot the straining beat tight so you SEE the body left behind in the bag. Hard cut to a calm, slow pour of Willa's Original into a clean glass over ice — same camera distance, opposite energy: smooth, creamy, full-bodied, nothing held back. Carton stays in frame 40%+ of the runtime, label readable, the 'organic' and 4-ingredient list legible. Color temperature warm and crisp, high-key. Text overlays in clean sans, lowercase, navy on cream. End on the carton beside the glass in morning light. The cut from thin-strain-and-clumped-pulp to full creamy pour IS the argument — let the contrast do the talking, never the dunk.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Tight, slightly handheld: hands tip ½ cup oats + ice water into a blender, blitz. Text overlay (lowercase, navy on cream): 'the diy oat milk clips are right about one thing.' Quick, light energy to signal the trend Willa's is gently answering."},
      {scene:"PROBLEM", time:"3-8s", action:"Hold on hands squeezing the nut-milk bag — the pulp clumps thick, the liquid runs out thin. Slow push-in on the clumped pulp left in the bag. Text overlay swaps: 'straining pours out most of the oat → and the jar lasts ~4 days.' Calm, matter-of-fact, not mocking — the aunt at the table, not the dunk."},
      {scene:"TURN", time:"8-12s", action:"Hard cut, brighter frame: a hand sets the messy bag aside and reaches for the Willa's Original carton, label to camera, 'organic' legible. Text overlay: 'the better move strains nothing in. and nothing out.' Beat. Then: 'the whole oat stays in the pour.' Carton fills 40%+ of frame."},
      {scene:"PROOF", time:"12-17s", action:"Slow, smooth pour of Willa's Original over ice in a clean glass — creamy, full-bodied, the opposite of the thin strain. Overlay stacks the receipts one line at a time: '4g+ protein' · '2g+ prebiotic fiber' · '1g sugar' · '4 ingredients.' Then a single gloss line: 'whole oat groat — bran, germ + all. organic. glyphosate-free.'"},
      {scene:"PAYOFF", time:"17-21s", action:"End card: carton beside the finished glass in warm morning light, 4-ingredient label readable. Benefit-shorthand stinger overlay: 'the diy instinct is right. it just strains out the good part.' Small navy wordmark lower corner. Hold on the clean still."}
    ],
    audio:"Warm narrative voiceover, dry and a little witty — the calm aunt at the kitchen table who agrees with you first, then gently fills in the rest. Never preachy, never a dunk. Lo-fi, unhurried beat underneath that dips slightly on the thin-strain beat and lifts on the full creamy pour, so the audio mirrors the visual turn. VO roughly matches the on-screen text and lands the 'strains out the good part' beat with a knowing pause.",
    duration:"20-22 seconds",
    cta:{soft:"the whole oat stays in. nothing strained out.", medium:"skip the midnight straining — just pour Willa's Original.", strong:"find Willa's Original at willaskitchen.com — organic, glyphosate-free, the whole oat kept in."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUN29-IG-R2",
    platform:"Instagram Reel",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Thu Jul 2 · 12pm",
    priority:"BIG SWING",
    rideNow:false,
    concept:"\"the protein wave doesn't need another isolate. it needs a whole plant.\" — kept-in-not-added-back POV",
    intel:[
      {type:"TREND", text:"Beans, lentils and fava are the category's fastest-rising protein lane, pulling the whole shelf toward whole-plant nutrition (T-2). Willa's Original is the confident answer: 4g+ protein, 2g+ fiber, 4 ingredients — protein AND fiber kept IN the oat, not stripped out and isolated back. Lead with the carton; the bean-and-pulse wave is the backdrop, not the headline."},
      {type:"AUDIENCE", text:"The protein-curious shopper has been trained to chase isolates, scoops and powders — but they're quietly exhausted by ingredient decks that read like a chemistry set. The win here is permission: you don't have to add protein back after a brand took it out. A whole plant kept it the whole time. Speak to the reader who wants real food, not a fortified one."},
      {type:"COMPETITOR", text:"Internal: the protein-milk arms race is fortifying — most oat milks filter the bran + germ out, then add pea or isolate protein back to hit a number; the average oat milk still lands under 1g protein and under 1g fiber per cup. Never name them on the surface — Willa's keeps both in the whole oat groat. Contrast stays 'vs. the average oat milk' only."}
    ],
    hooks:[
      {text:"the protein wave doesn't need another isolate. it needs a whole plant.", recommended:true},
      {text:"most oat milks filter out the protein AND the fiber — then sell it back to you as a scoop.", recommended:false},
      {text:"4g protein. 2g fiber. 4 ingredients. none of it added back — it just never left.", recommended:false}
    ],
    caption:"Willa's Original keeps it all in: 4g+ protein, 2g+ prebiotic fiber (the fiber that feeds gut health), 1g sugar, 4 ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt. The whole oat groat — bran, germ and all — so the protein and fiber stay exactly where they started. 🌾\n\nMost oat milks don't. They filter the protein AND the fiber out of the oat, process the leftover starch into sugar, then sell the protein back to you as a scoop. The protein wave doesn't need another isolate. It needs a whole plant.\n\nBeans, lentils, fava — the whole-plant protein lane is moving fast right now. The whole oat has been one the entire time. 🥛\n\nNo isolate. No pea protein added back. No gums. Nothing taken out just to be sold back to you.\n\nUSDA Organic · Non-GMO · Certified Glyphosate Residue Free · 4g+ protein · 2g+ fiber · 1g sugar · WBENC",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#wholeplant",
      "#plantprotein",
      "#fiber",
      "#cleanlabel",
      "#oatgroats",
      "#realfood",
      "#guthealth",
      "#labelcheck"
    ],
    visual:"Bright, sun-washed kitchen, warm wood + cream tones, lots of natural light and quick hands-in-frame movement. Open on a counter staged with the whole-plant protein wave as backdrop — a bowl of mixed beans, a scoop of lentils, dried fava — then a hand sweeps a generic protein-scoop tub OUT of frame and slides the Willa's Original carton IN. Cut to a clean overhead: a few raw oat groats spilled beside the carton, finger nudging them next to the 4-line back label. Carton holds frame 40%+ throughout — a slow creamy pour into a clear glass, condensation catching light, the whole-oat body visible. No talent's face; hands + product + kitchen + text overlays do the work. Trend-forward, not stock-photo; quick cuts, lofi-warm grade. End card on a clean cream background with the carton and the kept-it-all-in stinger.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Sunlit counter, overhead: bowl of mixed beans, lentils, dried fava staged as the 'protein wave.' A hand sweeps a generic protein-scoop tub out of frame. Text overlay (bold, top): 'the protein wave doesn't need another isolate.' Quick whip-cut transition."},
      {scene:"SETUP", time:"3-8s", action:"Hand slides the Willa's Original carton into the empty spot beside the beans. Text overlay: 'it needs a whole plant.' Soft push-in on the carton face. Calm, matter-of-fact pacing — the taboo said plainly, no drama."},
      {scene:"PAYOFF", time:"8-14s", action:"Clean overhead: a few raw oat groats spilled beside the carton, finger nudges them toward the back label. Text overlay (plain, dry): 'most oat milks filter the protein + fiber OUT — then sell it back as a scoop.' On-screen ticks animate beside the label: '4g protein ✓  2g fiber ✓  1g sugar ✓  4 ingredients ✓.'"},
      {scene:"PROOF", time:"14-19s", action:"Slow creamy pour into a clear glass, condensation, light through the whole-oat body. Text overlay: 'whole oat groat — bran, germ and all. nothing added back.' Tight on the 4-line ingredient list beside the glass."},
      {scene:"END CARD", time:"19-23s", action:"Cream background, Willa's Original carton centered. Stinger text resolves: 'the whole oat kept it in the whole time. 4 ingredients. organic. glyphosate-free.' Logo lockup fades up. End on the carton, still."}
    ],
    audio:"Warm narrative voiceover over lofi-warm, gentle kitchen beat. VO leads with the benefit, calm and dry: 'willa's keeps both the protein and the fiber in the whole oat. everyone's chasing whole-plant protein right now — beans, lentils, fava. here's the part most oat milks won't say: they take the protein and fiber out, then sell it back to you as a scoop.' Conversational, matter-of-fact authority — the taboo stated like an aunt at the kitchen table, not a callout. Soft ambient kitchen sound (pour, glass set down) under the music.",
    duration:"20-23 seconds",
    cta:{soft:"save this for your next label-check in the milk aisle.", medium:"tap to read the 4-ingredient label on Willa's Original.", strong:"find Willa's Original — the whole oat, nothing added back."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN29-IG-F1",
    platform:"IG Feed",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"on-pack-checklist",
    timing:"Thu Jul 2 · 6pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the pour that survives the cooler bag — no fridge, no fight.\" — camp + road-trip pack-out carousel",
    intel:[
      {type:"TREND", text:"Camp + road-trip season pushes parents toward snacks that travel without a fridge and deliver real energy, not a sugar spike — protein-first picks framed as 'fuel for the day' (T-8). Lead with the carton that already fits the cooler bag: Willa's Kids is shelf-stable, 8g protein, free of the top 9 allergens, made with the whole oat. The seasonal packing scramble is the backdrop; the answer is a pour that doesn't need ice to earn its spot."},
      {type:"AUDIENCE", text:"The parent packing a cooler bag at 7am isn't scoring ingredient labels — she's solving for what won't leak, won't spoil by noon, won't get sent home from an allergy-aware camp, and won't crash a kid mid-afternoon. The relief Willa's Kids sells here is 'pack it and forget it.' Make the carousel feel like the calm of one less thing to second-guess on the way out the door — Partake's 'what's in the bag' register, parent-first and unfussy."},
      {type:"COMPETITOR", text:"Internal: most kids' RTD pours split into organic-but-sugary or simple-but-not-organic, and the shelf-stable single-serve lane skews toward juice + flavored milks heavy on added sugar. Never name a brand on the surface — contrast stays 'vs. the average kids' drink.' Willa's Kids is uniquely positioned because it clears shelf-stable + organic + allergen-free + 8g protein at once, which is exactly the cooler-bag problem the category leaves half-solved. Keep competitor specifics internal."}
    ],
    hooks:[
      {text:"the snack that doesn't need a fridge — or a sugar crash to keep up.", recommended:true},
      {text:"packing the cooler bag for camp? this one earns its spot.", recommended:false},
      {text:"8g protein, no fridge required, no allergy worry. into the bag it goes.", recommended:false}
    ],
    caption:"The pour that survives the cooler bag — no fridge, no fight. 🎒\n\nCamp mornings and road-trip afternoons need fuel that travels, not a juice box that spoils by noon or a sugar drink that crashes the day. Willa's Kids checks the whole list before it goes in the bag:\n\n- shelf-stable — packs without ice, holds till snack time\n- 8g protein — the same as dairy, real fuel for the day\n- top-9 allergen-free — no nut, soy, gluten, dairy, sesame\n- USDA Organic — with plant-based DHA, made from the whole oat\n\nMost kids' drinks make you trade one of those away — organic OR simple, sweet OR clean, travel-ready OR actually nourishing. Willa's Kids is the one you can pack and forget. Parents asked us to make a carton they could trust on the go. We listened. 🥛\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#dairyfreekids",
      "#campsnacks",
      "#roadtripsnacks",
      "#kidsnutrition",
      "#momsoftiktok",
      "#allergenfriendly",
      "#summerwithkids"
    ],
    visual:"Four-card editorial carousel, bright and trend-forward — warm cream + sun-bleached backgrounds, soft natural daylight, lots of breathing room, a zine-cover feel (Fishwife/Graza design-wit register), not an infographic. Card 1: an open cooler bag or canvas tote packed for the day on a sunlit surface, Willa's Kids carton tucked in beside real, identifiable kid food (a sandwich, clementine, crackers) — no ice pack in sight — bold overlay 'survives the cooler bag.' Card 2: the carton centered with a hand-drawn checklist overlay in marker — 'shelf-stable / 8g protein / top-9 allergen-free / organic' each ticked, one short plain-English line under each. Card 3: a road-trip cup-holder or picnic-blanket moment, carton standing upright, big overlay 'no fridge. no crash.' Card 4: cream background, carton with the Yuka 100 badge and a warm closing line. Carton holds frame 40%+ across every card. Hands + product + real packing context only, no talent face. Consistent palette + type across all cards so it reads as one designed set, swipe-rewarding.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for the next camp-morning scramble.", medium:"swipe the checklist, then pack a few in the cooler bag.", strong:"grab Willa's Kids — the pour that's packed and ready before you are."},
    benefitShorthandId:"BS-3"
  },
  {
    id:"JUN29-TT-3",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"viral-recipe-remix",
    timing:"Fri Jul 3 · 10am",
    priority:"HIGH",
    rideNow:false,
    concept:"\"the swap nobody on the FYP made yet\" — dairy-free flatbread viral remix",
    intel:[
      {type:"PULSE", text:"The 3-ingredient cottage-cheese flatbread is breaking the FYP (For You Page) in late June 2026 — high-protein, low-carb, naturally gluten-free — and the whole thing leans on dairy, leaving a wide-open plant-based entry (CP-2). Willa's Original is the creamy bind: 4 ingredients, 4g+ protein, 2g+ fiber, 1g sugar, glyphosate-free — so the dairy-free rebuild lands on a base that actually reads clean on the ingredient list. Build the flatbread from blended Kite Hill almond cottage cheese + a splash of Willa's Original."},
      {type:"AUDIENCE", text:"Macro-counting home cooks and dairy-free families are watching this flatbread blow up and quietly wondering if there's a version they can actually eat. The win is a fast, two-bowl build they can recreate Jul 3 before the Jul 4 long weekend — and the 'I made it dairy-free' reveal is the stitch trigger that gets the plant-based crowd recreating it."},
      {type:"COMPETITOR", text:"Internal: vegan creators are racking up millions by oat-milk-swapping viral dairy formats and proving the swap is invisible when the base is rich enough (CP-10). The category default is to ride the cottage-cheese wave straight; Willa's lane is the clean rebuild where whole-oat body does the work most plant milks can't. Never name a competitor on the surface."}
    ],
    hooks:[
      {text:"let's make dairy-free protein flatbread", recommended:true},
      {text:"the cottage-cheese flatbread breaking the FYP — but make it dairy-free", recommended:false},
      {text:"high-protein flatbread, no dairy, 4-ingredient milk doing the heavy lifting", recommended:false}
    ],
    caption:"The protein flatbread taking over everyone's feeds right now is delicious — and built entirely on dairy. So we made the swap nobody did yet. 🫓 High-protein, 100% plant-based, zero compromise on the chew.\n\nThe trick is the bind: blended Kite Hill almond cottage cheese (dairy-free) plus a splash of Willa's Organic Oat Milk. Willa's uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup — so the dough comes together creamy without a drop of dairy. 🥛\n\nIngredients:\n- 1 cup Kite Hill almond cottage cheese (dairy-free), blended smooth\n- 3 tbsp Willa's Organic Oat Milk\n- 1 cup all-purpose or gluten-free flour\n- 1 tsp baking powder\n- ½ tsp sea salt\n- olive oil, for the pan\n\nBlend the Kite Hill almond cottage cheese with Willa's Original until silky. Fold in the dry ingredients to a soft dough, press flat, and pan-fry in a little olive oil until golden and puffed. ☀️",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#cottagecheeseflatbread",
      "#dairyfree",
      "#highprotein",
      "#proteinflatbread",
      "#plantbased",
      "#viralrecipe",
      "#foodtok",
      "#dairyfreerecipes"
    ],
    visual:"Bright, sun-washed home kitchen, lofi/chill audio. Hands-in-frame throughout, no talent on camera. Lead frame is the silky blended almond-cottage-cheese-plus-Willa's mix going glossy in the blender — the creamy bind IS the proof the swap works, let it read rich. Carton visible behind the bowl for 40%+ of the runtime, label readable. Soft dough press, golden pan-puff, steamy tear-and-pull hero on the finished flatbread. Crisp daylight, high color saturation, warm neutral counter. Fast cuts on the build, one slow hero shot on the steamy pull-apart. End card lands the Original stinger over the stacked flatbread.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Overhead close-up: hands set a blender, a mixing bowl, and the Willa's Original carton on a sunlit counter. On-screen text (sentence case, big): 'let's make dairy-free protein flatbread'. Quick whip-pan transition to the next scene."},
      {scene:"THE BIND", time:"3-9s", action:"Tight macro: hand spoons Kite Hill almond cottage cheese into a blender, then pours in a splash of Willa's Original. Blender whirs to a glossy, silky cream. Text overlay: 'Kite Hill almond cottage cheese + Willa's Original = the creamy bind.' Carton held in frame, label facing camera."},
      {scene:"THE DOUGH", time:"9-15s", action:"Top-down: hand folds flour, baking powder and a pinch of sea salt into the creamy blend until a soft dough forms. Text overlay: 'fold in flour + baking powder → soft dough.' Hands knead briefly, natural handheld."},
      {scene:"THE PAN (hero)", time:"15-21s", action:"Slow-motion hero shot: pressed-flat dough lowers into a hot olive-oiled pan, edges bubbling and puffing golden. Carton on the counter just behind the pan, label readable in full sun. Text overlay: '4 ingredients in the milk. 4g+ protein, 1g sugar, no dairy.'"},
      {scene:"THE PULL", time:"21-26s", action:"Macro: two hands tear the warm golden flatbread apart — steam, soft chew, stretchy interior. Text overlay: 'high-protein. zero dairy. all chew.'"},
      {scene:"END CARD", time:"26-30s", action:"Final stacked flatbread in sunlight, Willa's Original carton beside it. Benefit stinger text card animates in: 'four simple ingredients. the least sugar. the most protein.' Small Willa's wordmark lower-third."}
    ],
    audio:"Warm narrative voiceover over lofi/chill beat — light, conversational, with-a-wink. VO walks the two-bowl build fast, lands the proof point ('4 ingredients, 4g+ protein, 1g sugar, no dairy') on the pan-puff hero shot, closes on the steamy tear-and-pull.",
    duration:"28-30 seconds",
    cta:{soft:"save this for the Jul 4 weekend cookout 🫓", medium:"send this to the dairy-free friend who thought they were out", strong:"grab Willa's Original and rebuild the flatbread the whole internet is making ☀️"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN29-IG-F2",
    platform:"IG Feed",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Fri Jul 3 · 11am",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the part that's good for your heart is the part most oat milks pour down the drain.\" — keep-it-in explainer carousel",
    intel:[
      {type:"TREND", text:"Peer-reviewed work documents oat beta-glucan — the soluble fiber in whole oats — lowering LDL cholesterol when eaten daily, putting oats in the functional-heart-tool conversation, not just the taste-swap one (T-5). But the same coverage flags the catch: most oat milk delivers only 2-4g protein per cup because the protein gets filtered out in processing — the same step that strips the fiber. Lead with what Willa's KEEPS in the cup (4g+ protein and the whole-oat fiber), not the clinical headline; the heart news is the backdrop that explains why keeping it matters."},
      {type:"AUDIENCE", text:"The health shopper who clocked the 'oats lower cholesterol' story is reaching for an oat milk assuming the carton carries the benefit the bowl of oatmeal does. They don't know the typical filtering step pours out exactly the protein and fiber that earn the clinical story — they think 'oat milk = oats.' The relief Willa's sells is 'this one actually kept the part you came for.' Make the carousel about the gap between what people assume is in the cup and what's actually there, answered calmly by the carton."},
      {type:"COMPETITOR", text:"Internal: the typical oat-milk process filters out the bran and germ, then processes the leftover starch into sugar — discarding both the fiber AND the protein the whole oat carries (most land under 1g of each). Never name a brand on the surface — contrast stays 'vs. the average oat milk.' Willa's is uniquely positioned because it uses the whole oat groat, keeping 4g+ protein and 2g+ fiber where the category leaves a gap. Keep all competitor specifics internal."}
    ],
    hooks:[
      {text:"the part that's good for your heart is the part most oat milks pour down the drain.", recommended:true},
      {text:"oats lower cholesterol. then most oat milks filter out the part that does it.", recommended:false},
      {text:"you came for the whole oat. did your oat milk keep it?", recommended:false}
    ],
    caption:"the part that's good for your heart is the part most oat milks pour down the drain. Willa's keeps it in the cup — beta-glucan (the fiber in oats that supports your heart + gut) AND 4g+ protein, the parts most oat milks filter out. 🌾\n\nHere's the gap nobody mentions: oats are documented to support healthy cholesterol when you eat them daily. But the typical oat-milk process filters out the bran and germ first — pouring out the protein and fiber — then turns the leftover starch into sugar. You came for the oat. Most cartons kept the sugar and tossed the good part.\n\nWilla's Original uses the whole oat groat — bran, germ, and all, like steel-cut oats:\n- 4g+ protein, where most oat milks land under 1g\n- 2g+ fiber, including the beta-glucan oats are known for\n- 1g sugar, from the oats, nothing added\n- 4 ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt\n\nThe whole oat is the whole point. We just never filtered it out. 🥛\n\nUSDA Organic · Non-GMO · Certified Glyphosate-Free · WBENC",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#wholeoat",
      "#betaglucan",
      "#hearthealth",
      "#cleaningredients",
      "#plantmilk",
      "#organicoatmilk",
      "#realfood",
      "#labelcheck"
    ],
    visual:"Four-card editorial carousel, bright and trend-forward — warm cream backgrounds, soft natural daylight, generous negative space, a zine-cover feel (Fishwife/Graza design-wit register), never an infographic. Card 1: the Willa's Original carton centered on a sun-washed cream surface beside a small bowl of whole oat groats, bold hand-set overlay 'the part that's good for your heart is the part most oat milks pour down the drain.' Card 2: a simple two-side visual — a strainer with oats going through it on one side ('most oat milk: bran + germ filtered out, starch turned to sugar') vs. the whole oat groat held in a hand on the other ('Willa's: the whole oat, kept in'), one plain line each, no clutter. Card 3: the carton with three big number callouts stacked clean — '4g+ protein' · '2g+ fiber, incl. beta-glucan — the fiber that supports heart + gut' · '1g sugar' — each with a short plain-English line. Card 4: cream background, carton centered with the closing line 'the whole oat is the whole point. we just never filtered it out.' and the cert row small at the base. Carton holds frame 40%+ on every card. Hands + product + oats only, no talent face. Consistent palette + type across all four cards so it reads as one designed set, swipe-rewarding.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for the next oat-milk run.", medium:"swipe through, then check the back of Willa's Original.", strong:"find Willa's Original — the oat milk that kept the whole oat."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUN29-IG-R3",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"viral-recipe-remix",
    timing:"Fri Jul 3 · 12pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"protein-and-fiber plate, meet your protein-and-fiber pour.\" — FoodTok bean-salad remix",
    intel:[
      {type:"PULSE", text:"The dense bean salad is FoodTok's protein-and-fiber juggernaut, with high-protein versions stacking three or four bean types for 20g+ protein per serving (CP-1). It's the recipe face of the whole-plant protein wave — cheap, sturdy, all real ingredients you can name. Willa's answer is built-in: pour a chilled glass of Willa's Original alongside as the creamy whole-oat counterpart — 4g+ protein, 2g+ prebiotic fiber, 1g sugar, 4 ingredients, the whole oat groat (bran, germ and all) instead of filtered oat syrup. Plate and pour both keep the protein AND the fiber in."},
      {type:"AUDIENCE", text:"Willa's whole-plant crowd is already deep in the bean-salad wave — they're building it for the dense, satiating, no-crash fuel a July cookout week needs. They want a drink that earns a spot on the same real-ingredient plate, not a sugary pour that undoes the salad. A creamy, whole-oat glass with actual protein and fiber is the obvious co-star."},
      {type:"COMPETITOR", text:"Internal: the category is leaning into summer mood and performance — a wellness-as-self-care matcha push and a viral frothability tournament showing shoppers now compare oat milks like a bracket (C-1, C-2). Counter by owning the real-ingredient nutrition lane the bracket can't froth its way out of — whole oat, 4 ingredients, protein and fiber kept in, staged beside the recipe FoodTok already loves. Never name a competitor on the surface."}
    ],
    hooks:[
      {text:"let's make a dense bean salad", recommended:true},
      {text:"the most-remixed salad on FoodTok, plus the pour that actually matches it", recommended:false},
      {text:"20g of protein on the plate. real protein and fiber in the glass.", recommended:false}
    ],
    caption:"The dense bean salad took over our feed, so it took over our counter. 🫘☀️ Layers of beans, crisp veg and a bright olive-oil dressing — built sturdy, built to satisfy, built entirely on real ingredients you can name. We poured a chilled glass of Willa's Original right alongside, because a protein-and-fiber plate deserves a protein-and-fiber pour.\n\nWilla's Original Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup — 4 ingredients, 1g sugar, 4g+ protein, 2g+ prebiotic fiber (the kind that feeds good gut bacteria), the whole oat groat instead of filtered oat syrup. 🥛\n\nIngredients\n- 1 can chickpeas, drained + rinsed\n- 1 can cannellini beans, drained + rinsed\n- 1 can kidney beans, drained + rinsed\n- 1 cup cherry tomatoes, quartered\n- 1 mini cucumber, diced\n- 1/2 red onion, finely diced\n- 1/4 cup chopped parsley\n- 3 tbsp olive oil\n- 2 tbsp red wine vinegar\n- juice of 1 lemon, salt + pepper\n- 1 tall glass Willa's Original Organic Oat Milk, chilled, poured alongside\n\nToss the beans, veg and herbs, whisk the dressing, fold it through and let it sit 10 minutes. Pour the Willa's Original over ice on the side. Protein-and-fiber plate, protein-and-fiber pour — both real-ingredient, both keeping the good stuff in.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#densebeansalad",
      "#beansalad",
      "#highprotein",
      "#fibermaxxing",
      "#organicoatmilk",
      "#plantprotein",
      "#dairyfree",
      "#realfood"
    ],
    visual:"Bright, sunlit kitchen counter, clean warm color temp (midday July light through a window, not muted brand stock). Lo-fi chill audio. Hands-only, no talent. Two heroes share the frame: the dense bean salad building up in a big clear glass bowl (saturated reds, creamy beans, green herbs — color does the work) and a tall clear glass of Willa's Original poured over ice beside it, creamy-white against the colorful plate. Willa's Original carton stays in frame the whole time, positioned back-left so it reads in 40%+ of shots. Crisp overheads for the layering + toss, a tight side-angle slow-zoom on the creamy pour, then a final two-shot of plate-and-pour together. Minimal props — wooden spoon, linen napkin, a halved lemon. Trend-forward and appetizing, never infographic-y.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Overhead, bright kitchen counter. Hands set down a big clear bowl + the Willa's Original carton (label facing camera). On-screen text fades in, sentence case: 'let's make a dense bean salad'. Quick whip-pan transition to next scene."},
      {scene:"THE LAYERS", time:"3-9s", action:"Tight overhead, fast cuts: hands tip three cans of drained beans into the bowl (chickpeas, cannellini, kidney), then quartered cherry tomatoes, diced cucumber, red onion, torn parsley — saturated color stacking up. Text overlay: 'three kinds of beans · 20g+ protein · real fiber'. Satisfying chop + pour ASMR."},
      {scene:"THE TOSS + DRESSING", time:"9-14s", action:"Hand whisks olive oil, red wine vinegar, lemon, salt + pepper in a small bowl, pours it over, then folds everything through with a wooden spoon. Text overlay: 'real ingredients you can name'. Glossy toss, beans glistening."},
      {scene:"THE POUR (PAYOFF)", time:"14-20s", action:"Side angle, slow-motion: hand fills a tall clear glass with ice and pours Willa's Original over the top — slow, creamy, white — set right beside the finished colorful salad. Carton tilts into frame mid-pour. This is the hero two-shot: protein-and-fiber plate next to protein-and-fiber pour. Text overlay: 'Willa's Original · 4g+ protein · 2g+ fiber · 1g sugar · 4 ingredients'."},
      {scene:"THE BITE + END CARD", time:"20-24s", action:"Quick: a forkful of salad lifted, then the glass lifted into midday light beside the bowl. Cut to clean end card over the still two-shot, text: 'protein-and-fiber plate, meet your protein-and-fiber pour.' Logo lockup small bottom-center."}
    ],
    audio:"Warm narrative voiceover, low and easy, over a lo-fi chill beat. VO beats: 'the dense bean salad everyone's making — three kinds of beans, 20g+ protein, real fiber' (over layers) → 'real ingredients you can name, dressed bright and let to sit' (over toss) → 'and the pour that actually matches it — Willa's Original, the whole oat, 4g+ protein, 2g+ fiber, 1g sugar, 4 ingredients' (over pour) → 'protein-and-fiber plate, protein-and-fiber pour. shhh… both keep the good stuff in.' (end card).",
    duration:"20-24 seconds",
    cta:{soft:"save this for your July cookout spread 🫘", medium:"tell us your bean-salad mix — three beans or four? 🥗", strong:"grab Willa's Original and build the plate-and-pour this weekend — tag us when you do"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN29-IG-R4",
    platform:"Instagram Reel",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Sat Jul 4 · 11am",
    priority:"HIGH",
    rideNow:false,
    concept:"\"four things every parent checks before it goes in the cup. one carton clears all four.\" — milk-aisle confession Reel",
    intel:[
      {type:"TREND", text:"Pediatric guidance now formally backs plant protein for kids of every age — beans, lentils, plant protein framed as a mainstream choice, not a niche swap, with kids 4-8 needing ~19g protein daily (T-3). Willa's Kids is the answer parents can grab in four seconds: 8g protein, top-9 allergen-free, plant-based DHA, Yuka 100. The guidance is the medical air-cover; the carton is the resolution — lead with what's in the cup, the pediatric backing is the backdrop."},
      {type:"AUDIENCE", text:"Every parent runs the same silent four-point scan at the milk aisle — protein, sugar/sweetener, allergens, organic — but almost no carton clears all four, so they settle. The relatable confession is the exhale of finding the one that doesn't make you choose. Speak to the parent who's tired of trading protein for clean sweetener or organic for allergen-safe — name the checklist they already run in their head, then hand them the carton that passes it."},
      {type:"COMPETITOR", text:"Internal: the leading organic kids' shake runs 9g cane sugar; the major pea-milk kids' line runs 5g cane sugar and isn't organic; the kids-protein category is the fastest-rising lane as pulse + plant protein out-grows meat (T-2, T-3). Never name them on the surface — Willa's Kids holds 8g protein, 6g sugar from organic maple, plant-based DHA, top-9 allergen-free, Yuka 100. Contrast stays 'vs. the average kids' milk' only."}
    ],
    hooks:[
      {text:"there are 4 things every parent checks before it goes in the cup. turns out one carton clears all four.", recommended:true},
      {text:"protein, sweetener, allergens, organic — the milk-aisle checklist every parent runs in their head.", recommended:false},
      {text:"pediatricians just backed plant protein for kids of every age. here's the carton that already passed the test.", recommended:false}
    ],
    caption:"Four things every parent checks before it goes in the cup. One carton clears all four. 🌾\n\nProtein? 8g — same as dairy. Sweetener? 6g from organic maple, nothing added. Allergens? Free of the top 9 — no nut, soy, gluten, dairy, sesame. Organic? USDA certified. That's Willa's Kids.\n\nWilla's Kids: plant-based DHA from algae, Yuka scored 100/100, and we use the whole oat — bran and germ and all, not oat syrup — so the protein and fiber stay in.\n\nPediatric guidance now backs well-planned plant protein for kids of every age — beans, lentils, plant protein as a real choice, not a niche swap. The carton makes it easy to say yes to.\n\nParents asked us to make a kids' carton they could trust in four seconds. We listened. 🥛\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#dairyfreekids",
      "#kidsnutrition",
      "#allergenfriendly",
      "#cleanlabel",
      "#momsoftiktok",
      "#plantprotein",
      "#labelcheck"
    ],
    visual:"Bright, sun-washed kitchen, warm wood + cream tones, lots of natural light and quick hands-in-frame movement. Open on a parent's hand holding the Willa's Kids carton over a kid's empty cup at a counter — the pause before the pour. Four short text overlays animate in like a mental checklist being ticked: protein, sweetener, allergens, organic. Cut to a clean overhead of the carton turned to its back label, finger tracing the short ingredient list as each box ticks. Willa's Kids carton holds frame 40%+ throughout — the maple-cream pour into the cup, condensation on the glass, light catching the color. No talent's face required; hands + product + cup + a kid's hand reaching at the end. Trend-forward, not stock-photo; quick cuts, lofi-warm grade. End card on a clean cream background with the carton and the Yuka 100 + allergen-free stinger.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Medium close-up: a parent's hand holds the Willa's Kids carton paused over an empty kid's cup at a sunlit counter — the beat before pouring. Text overlay (bold, top): 'there are 4 things every parent checks before it goes in the cup.' Quick whip-cut to the next frame."},
      {scene:"SETUP", time:"3-8s", action:"Clean overhead: carton flipped to its back label, finger moving down the short list. Four checklist items stamp in one by one beside the label, each with a tick: 'protein ✓  sweetener ✓  allergens ✓  organic ✓.' Text overlay: 'most cartons clear two. maybe three.' Soft push-in. Warm light, kitchen blur behind."},
      {scene:"PAYOFF", time:"8-14s", action:"Cut to the maple-cream pour into the kid's cup, condensation, light through the glass. On-screen specs animate beside it: '8g protein  ·  6g sugar (organic maple)  ·  DHA  ·  top-9 allergen-free.' Text overlay: 'this one clears all four.'"},
      {scene:"PROOF", time:"14-18s", action:"Tight on the carton face beside the full cup; a Yuka-style '100/100' badge fades in. Text overlay: 'organic. short enough to read in 4 seconds.' A small kid's hand enters frame and lifts the cup."},
      {scene:"END CARD", time:"18-22s", action:"Cream background, Willa's Kids carton centered. Stinger text resolves: 'parents asked. we listened. Yuka 100 · top-9 allergen-free.' Logo lockup fades up. End on the carton, still."}
    ],
    audio:"Warm narrative voiceover over lofi-warm, gentle morning-kitchen beat. VO leads with the confession-benefit: 'there are four things every parent checks before it goes in the cup — protein, sweetener, allergens, organic. most cartons clear two. this one clears all four.' Conversational, parent-to-parent warmth, not clinical. Soft ambient kitchen sound (pour, cup set down) under the music.",
    duration:"20-22 seconds",
    cta:{soft:"save this for the next milk-aisle run.", medium:"tap to read the full label on Willa's Kids.", strong:"find Willa's Kids — the one carton that clears all four."},
    benefitShorthandId:"BS-3"
  },
  {
    id:"JUN29-TT-4",
    platform:"TikTok",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Chocolate",
    dnaPattern:"kid-family-moment",
    timing:"Sat Jul 4 · 11am",
    priority:"HIGH",
    rideNow:false,
    concept:"\"no kid menu. no negotiating. the one they reach for.\" — one-carton no-compromise confession",
    intel:[
      {type:"TREND", text:"The dominant 2026 parenting philosophy favors 'upgraded classics' — the familiar foods kids recognize, rebuilt with real ingredients and no separate kid menu, no short-order cooking (T-10). LEAD with Willa's answer: Chocolate is the upgraded classic in a carton — real cacao, 5 ingredients, 5g protein, 11g sugar (50% less than dairy chocolate milk), a Good Food Awards winner. The pour kids ask for that doesn't need a 'healthy' version next to it. The parenting shift is the backdrop; the one-carton answer is the lead."},
      {type:"AUDIENCE", text:"Real parents are tired of running two systems — the chocolate milk the kids actually drink AND a 'better-for-you' bottle they ignore. A confession that names the relief of buying ONE carton everyone reaches for lands harder than any spec sheet. The win the audience feels: no negotiating, no second fridge shelf, no guilt."},
      {type:"COMPETITOR", text:"Internal: the kids' chocolate-milk aisle splits into sugar-bomb 'fun' SKUs and joyless 'health' SKUs, training parents to expect a tradeoff. Never name a competitor on the surface; the contrast is one carton that's genuinely delicious AND reads clean — real cacao, 5 ingredients, half the sugar of dairy — so the tradeoff disappears."}
    ],
    hooks:[
      {text:"we used to keep two chocolate milks in the fridge. the one the kids actually drink — and the one we felt okay about.", recommended:true},
      {text:"the chocolate milk doesn't need a 'healthy' version sitting next to it anymore", recommended:false},
      {text:"no kid menu in this house — not even for chocolate milk", recommended:false}
    ],
    caption:"We used to keep two chocolate milks in the fridge: the one the kids actually drink, and the one we felt okay about them drinking. 🍫 Willa's Chocolate is the one carton that's both. It's real cacao and just 5 ingredients — organic whole grain oats, filtered water, organic coconut sugar, organic cacao, sea salt — with 5g protein and 11g sugar (about half the sugar of dairy chocolate milk). It even won a Good Food Awards Best Beverage. The whole oat groat stays in, bran and germ and all, so it's rich and creamy without the junk. No kid menu, no separate 'healthy' version, no negotiating at the fridge. Just the chocolate milk everyone reaches for. 🌾",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#chocolateoatmilk",
      "#kidsdrinks",
      "#nokidmenu",
      "#cleanlabel",
      "#momsoftiktok",
      "#fyp",
      "#dairyfree",
      "#realfood"
    ],
    visual:"Bright, sunlit family kitchen, warm Saturday-morning light, trend-forward and high-color. No talent on camera by default — a real parent's hands plus a kid's hand in frame, plus text overlays (this can run as a kid-family-moment without a face). Open on a fridge door with TWO chocolate milk cartons crowding the shelf, then a hand pulls both and replaces them with a single chilled Willa's Chocolate carton — the visual confession. Cut to a thick, rich chocolate pour from the Willa's carton into a clear glass so the deep cocoa body is the swipe-stop, condensation on the carton. A kid's hand reaches in and takes the glass without being asked. Brown pillar accent (#9E652E) on the on-screen text cards. Fast, handheld micro-cuts. Carton on screen 40%+ of runtime; end on the carton centered with the stinger card.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Close-up, handheld: fridge door opens to reveal TWO chocolate milk cartons crowding the shelf. On-screen text (sentence case): 'we used to keep two chocolate milks.' A hand rests on both. Quick beat before the reveal."},
      {scene:"THE CONFESSION", time:"3-6s", action:"Hand pulls both cartons out and sets them aside off-frame. On-screen text: 'the one the kids drink → and the one we felt okay about.' Hard cut to a single chilled Willa's Chocolate carton placed alone on the now-clear shelf, condensation visible."},
      {scene:"THE POUR", time:"6-9s", action:"Cut to a thick, rich chocolate pour from the Willa's Chocolate carton into a clear glass on the counter, deep cocoa body catching the light. On-screen text: 'now it's just one carton.' Small brown check graphics ping next to 'real cacao' and '5 ingredients'."},
      {scene:"THE PROOF", time:"9-12s", action:"Overhead of the full glass beside the carton, label facing camera. On-screen text: '5g protein · 11g sugar (½ of dairy chocolate milk) · Good Food Awards winner.' Keep it quick and clean, brown-accented cards."},
      {scene:"THE KID-MOMENT", time:"12-15s", action:"A kid's hand reaches into frame and takes the glass off the counter without being asked, lifts it out of frame. On-screen text: 'no kid menu. no negotiating. the one they reach for.' Soft-focus carton stays in the background."},
      {scene:"END CARD", time:"15-18s", action:"Willa's Chocolate carton centered in crisp focus, full chocolate glass beside it. Stinger text overlay: 'the chocolate milk you wish you grew up on.' then the brand sign-off 'Plants, finally done right.' On-screen prompt: 'one carton or two in your fridge? 🍫'"}
    ],
    audio:"Warm narrative voiceover, kept light and confessional — a real-parent tone reading the on-screen beats over a chill lofi kitchen track. Soft VO lands the end-card stinger: 'the chocolate milk you wish you grew up on.' Let on-screen text carry the confession beats; VO is supporting, not a hard sell.",
    duration:"15-25 seconds",
    cta:{soft:"one carton or two in your fridge? comment below", medium:"swap the two cartons for the one everyone drinks", strong:"grab Willa's Chocolate and retire the kid-menu shelf"},
    benefitShorthandId:"BS-4"
  },
  {
    id:"JUN29-TT-5",
    platform:"TikTok",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Multi",
    dnaPattern:"meme-payload",
    timing:"Sat Jul 4 · 12pm",
    priority:"HIGH",
    rideNow:true,
    concept:"\"one cooler. a kids' chocolate pour and an iced coffee for the grown-ups. it carries the whole afternoon.\" — cooler-pack POV",
    intel:[
      {type:"PULSE", text:"The World Cup Round of 16 kicks off Sat Jul 4 — the knockout phase landing on America's 250th cookout day, one long afternoon of grazing where the cooler has to feed both crowds (CP-7). Willa's answer leads from the cooler, not the match: a kids' Chocolate pour (real cacao, 5 ingredients) plus an iced Barista coffee for the adults (50% less sugar than other barista oat milks, no rapeseed) — one carton family that carries the whole gathering. No sports-bro register; the table is the hero."},
      {type:"AUDIENCE", text:"Willa's buyer is hosting (or showing up to) a Jul 4 cookout that stretches all afternoon while a match plays in the background — kids underfoot, adults grazing, nobody wants to make four separate drink runs. She isn't choosing between the kids' table and the grown-ups' cooler; she wants one thing she trusts that quietly handles both. The 'pack the cooler once and it just works' relief is the exact feeling to ride."},
      {type:"COMPETITOR", text:"Internal: the category is leaning into summer flavor-spectacle (RTD relaunches, matcha-as-self-care pours) chasing the single-serve adult coffee moment. The whitespace nobody's claiming on a big-gathering day is the multi-generation cooler — one brand that pours for the kid AND the adult from the same lineup. Never name a competitor on the surface; own the whole-table moment, not a single SKU."}
    ],
    hooks:[
      {text:"one cooler. one carton family. it pours for the kids AND the grown-ups all afternoon.", recommended:true},
      {text:"POV: the match is on, the cookout's going for hours, and your cooler only had to do one job.", recommended:false},
      {text:"the move isn't four drink runs. it's one cooler that pours for everybody.", recommended:false}
    ],
    caption:"one cooler. a kids' chocolate pour and an iced coffee for the grown-ups. it carries the whole afternoon.\n\nthe Jul 4 cookout runs long — kids underfoot, the match on in the background, everyone grazing. Willa's packs the cooler once and pours for the whole table.\n\nwhat's in the cooler, since the lineup is the whole point:\n• Willa's Chocolate for the kids — real cacao, 5 ingredients, 50% less sugar than the chocolate milk you grew up on\n• Willa's Barista over ice for the grown-ups — 50% less sugar than other barista oat milks, no rapeseed\n• both made from the whole oat groat (the whole oat kernel, bran and germ and all), not oat syrup\n• USDA Organic · Certified glyphosate-free (tested every lot)\n\nthe whole point: one carton family that handles the kids' table and the adults' cooler at the same time. nourish the spark — for everybody at the gathering.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#july4",
      "#cookout",
      "#worldcup",
      "#organicoatmilk",
      "#wholeoat",
      "#dairyfree",
      "#familygathering",
      "#nourishthespark"
    ],
    visual:"Bright, sunlit, warm — a backyard cookout afternoon, golden-hour-leaning, no talent's face on camera (hands + product + cooler do everything; family-gathering vibe, not a watch-party). Held in a POV cooler-pack-and-pour format. ACT ONE (the pack): overhead on an open cooler bag, ice and condensation, hands tuck in a Willa's Chocolate carton and a Willa's Barista carton side by side — the two-SKU reveal, labels facing camera. ACT TWO (the long afternoon): quick warm cuts of the cookout running in the background — a grill plume soft-focus, a phone propped showing a match in the distance (blurred, never the hero), kids' hands reaching, a grazing table of fruit and chips. ACT THREE (the two pours, the payload): a kid-height glass gets a glossy slow-pour of creamy Willa's Chocolate; cut to a tall glass over ice getting an iced Barista pour, condensation beading. Both cartons stay on screen 40%+ across the pour beats, labels readable. Warm honey-gold grade, soft lens flare, real-summer texture. End card: cream background, the Chocolate carton + the Barista carton standing together beside the two filled glasses in golden light, stinger text. Trend-forward, editorial, zero clinical wellness-brand earnestness, zero sports-bro energy.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Cold open POV: overhead on an open cooler bag packed with ice, hands lowering in two Willa's cartons (Chocolate + Barista) side by side, labels to camera. Bright midday light, condensation on the cartons. Text overlay (top): 'packing one cooler for an all-afternoon cookout.' Match-cut primed."},
      {scene:"STAKES", time:"3-7s", action:"Quick warm cuts establishing the long afternoon: soft-focus grill plume, a phone propped in the distance showing a blurred match (never the hero), a grazing table of fruit + chips, kids' hands reaching past the frame. Text overlay: 'it has to feed the kids AND the grown-ups.' Golden, busy, joyful."},
      {scene:"POUR ONE (KIDS)", time:"7-12s", action:"Cut to a short kid-height glass on a picnic table: glossy slow-pour of creamy Willa's Chocolate, sunlit, the carton held beside it at 40%+ of frame, label facing camera. Text overlay: 'real cacao. 5 ingredients. the kids' pour.' Unhurried — let the pour breathe."},
      {scene:"POUR TWO (ADULTS / PAYLOAD)", time:"12-17s", action:"Whip-pan to a tall glass over ice: iced Willa's Barista pour, condensation beading, slow cream-bloom through the ice. Barista carton held beside it, 40%+ of frame. Text overlay: 'iced coffee for the grown-ups. 50% less sugar, no rapeseed.' (whip-pan transition)"},
      {scene:"PROOF", time:"17-21s", action:"Warm close-up: both cartons set together on the cookout table, hand taps each label in turn. Text overlay: 'one cooler. one carton family. whole oat, organic, glyphosate-free.' Confident, not clinical."},
      {scene:"END CARD", time:"21-24s", action:"Clean cream background, Willa's Chocolate carton + Willa's Barista carton standing together beside the two filled glasses in golden light. Stinger text (BS end card): 'one cooler. it carries the whole afternoon.' Small sign-off beneath: 'nourish the spark — for everybody.'"}
    ],
    audio:"Warm narrative voiceover, easy + a little wry — reads the cooler-pack like a host who finally cracked the all-day-gathering code. Lofi/chill summer beat under it, golden and unhurried, lifts gently at each pour. No stadium-roar or sports-hype sound; the calm, full-table feeling IS the point.",
    duration:"15-25 seconds",
    cta:{soft:"what's the one thing your cooler can't show up without? 👇", medium:"pack the cooler once this Jul 4 — one carton family for the kids' glass and the grown-ups' iced coffee.", strong:"feed the whole gathering from one cooler — Willa's Chocolate for the kids, Barista for the grown-ups."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN29-TT-7",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Sun Jul 5 · 11am",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"sourcing dinner off Marketplace. but the oat milk? i can actually read it.\" — chaos-dining text joke",
    intel:[
      {type:"PULSE", text:"Ordering homemade BBQ + seafood boils off Facebook Marketplace is the chaos-dining bit eating TikTok (CP-11) — surprise-and-delight dinner you can't trace. Willa's payload is the dry flip: when the rest of the meal is a mystery, the one thing you don't have to guess about is a 4-ingredient carton you can read — organic whole grain oats, filtered water, organic vanilla, sea salt. Lead with the readable label, ride the bit as the setup."},
      {type:"AUDIENCE", text:"Willa's buyer is in on the chaos-dining joke — she'll happily try the Marketplace brisket — but she's the one who flips every carton and reads the ingredient list before it goes in her body. The punchline lands because she's already living it: trust the unhinged dinner, but know exactly what's in the glass."},
      {type:"COMPETITOR", text:"Internal: a viral Jun 21, 2026 oat-milk frothability tournament (C-2) showed shoppers now compare oat milks head-to-head on ingredients, not just texture — they're reading labels like a bracket. This brief rides that label-literacy energy without the comparison framing: never name a competitor, never frame Willa's as 'beating' anyone — just be the carton you can actually read."}
    ],
    hooks:[
      {text:"sourcing dinner off Facebook Marketplace. but the oat milk? that i can actually read.", recommended:true},
      {text:"the brisket came from a stranger's garage. the oat milk has 4 ingredients i can pronounce.", recommended:false},
      {text:"pov: you'll eat the Marketplace seafood boil but you still flip the carton and read every word.", recommended:false}
    ],
    caption:"you'll order a seafood boil from a guy named Dwayne off Facebook Marketplace — but you still flip the oat milk carton and read every word. 👀\n\nfunny how that works. the dinner's a gamble; the carton doesn't have to be. Willa's Original is 4 ingredients you can actually read — organic whole grain oats, filtered water, organic vanilla extract, sea salt. that's the whole list.\n\nmost oat milks filter out both the fiber AND the protein, then process the leftover starch into sugar. Willa's keeps the whole oat — so it's 1g sugar, 4g+ protein, 2g+ prebiotic fiber per cup. the part your gut actually wants stays in.\n\nso go ahead, trust the unhinged Marketplace dinner. just know exactly what's in the glass next to it.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#facebookmarketplace",
      "#readthelabel",
      "#4ingredients",
      "#cleaningredients",
      "#organic",
      "#wholeplant",
      "#labelcheck",
      "#fyp"
    ],
    visual:"Bright, trend-forward, fast-cut TikTok-native — high-summer daylight, clean pale-wood or white counter. Pure text-joke energy (Pattern 10) with hands + product only, no talent on camera. Open on a deliberately chaotic, slightly grainy phone-screen-recording aesthetic: a Facebook Marketplace listing for 'homemade brisket + seafood boil — DM to pickup' with a sketchy photo, the bit everyone recognizes. Hard cut to a calm, sunlit reset — a single hand sets a Willa's Original carton on the bright counter, condensation on a clear glass beside it. Macro: the hand slowly turns the carton to the ingredient list and a finger traces the 4 lines, each word legible. The gap between the chaotic Marketplace frame and the clean readable label IS the joke — let the contrast do the work. Carton in frame 40%+, label dead center and sharp. End on the finished glass of oat milk beside the carton, light catching the pour. Trend-forward palette: chaotic phone-blue of the Marketplace screen against the warm clean daylight of the kitchen.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Phone-screen-recording aesthetic, slightly grainy: a Facebook Marketplace listing fills frame — 'homemade brisket + seafood boil 🦐 DM to pickup,' sketchy garage photo, $40. Text overlay (top): 'sourcing dinner off Marketplace' · finger scrolls the chaotic listing. Trending hard-cut sound stab cues the flip."},
      {scene:"TURN", time:"3-7s", action:"HARD CUT to a calm, bright, sunlit counter — a single hand sets down one Willa's Original carton beside an empty clear glass, everything else gone. Text overlay: 'the dinner: a gamble. the oat milk: i can actually read it.' Carton label dead center, daylight clean."},
      {scene:"BUILD", time:"7-13s", action:"Macro: the hand slowly rotates the Willa's Original carton to the back label, finger traces the ingredient list line by line. Text overlay appears word by word in sync: 'organic whole grain oats · filtered water · organic vanilla · sea salt.' Then: 'that's the whole list.'"},
      {scene:"PAYOFF", time:"13-18s", action:"Quick macro pour — creamy oat milk fills the clear glass over the bright counter. Text overlay: '1g sugar · 4g+ protein · 2g+ prebiotic fiber — the whole oat, kept whole.' Glass catching the light, carton beside it."},
      {scene:"END CARD", time:"18-22s", action:"Pull back to the finished glass beside the Willa's Original carton in daylight. Text overlay stinger: 'trust the Marketplace dinner. read the oat milk.' Small Willa's logo bottom corner. Hold."}
    ],
    audio:"Warm narrative voiceover, dry and a little cheeky, over a peaking lofi/chill TikTok sound for FYP reach. VO beats: 'you'll order a seafood boil from a stranger's garage … but you still flip the carton and read every word. funny how that works. the dinner's a gamble — the oat milk doesn't have to be. four ingredients. that's the whole list.' Let the deadpan land on the punchline; keep the bit warm, never sneering.",
    duration:"15-25 seconds",
    cta:{soft:"save this for the next time you read a carton like a contract 👀", medium:"flip your oat milk carton — comment how many ingredients you can actually pronounce", strong:"find Willa's Original at the link — 4 ingredients, the whole oat, nothing to guess about"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUN29-IG-R5",
    platform:"Instagram Reel",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Barista",
    dnaPattern:"at-shelf-moment",
    timing:"Sun Jul 5 · 12pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"rate the pour — but check the back of the carton before you score it.\" — froth-bracket debate",
    intel:[
      {type:"TREND", text:"The category leaned hard into head-to-head performance comparison this week — a viral froth tournament pitted major barista oat milks against each other on texture and ingredients, treating the category like a sport (C-2). Willa's Barista enters: froths thick, pours clean, AND wins on the back of the carton. The performance is the entry; the label is the tiebreaker. Never name a competitor on the surface — use 'most barista oat milks' / 'the other brackets' framing only."},
      {type:"AUDIENCE", text:"Home-cafe makers and latte people who used to grab a default are now actively comparing oat milks on how they foam — and they love arguing about it in the comments. Give them a friendly 'rate the pour' debate prompt, then reward the ones who flip the carton: the best froth shouldn't come with rapeseed oil and a gum stabilizer."},
      {type:"COMPETITOR", text:"Internal context: C-1 wellness-as-self-care push + C-2 frothability tournament are this week's competitor signals. Barista is Willa's most-processed SKU — lead with froth-and-pour performance, NOT an ingredient-comparison teardown. 50% less sugar + no rapeseed + no gums are the correct proof points here."}
    ],
    hooks:[
      {text:"everyone's running an oat-milk froth bracket. cool — now flip the carton and score THAT too.", recommended:true},
      {text:"rate this pour 1-10. then check the back: no rapeseed, no gums, 50% less sugar.", recommended:false},
      {text:"the froth tournament has a tiebreaker nobody's judging — the ingredient list.", recommended:false}
    ],
    caption:"rate the pour — but check the back of the carton before you score it.\n\nthe internet is running an oat-milk froth bracket this week, and honestly? we're here for it. so here's Willa's Barista entering the tournament: thick microfoam, a pour that holds its shape, latte art that actually behaves.\n\nbut the froth is just the entry round. the real tiebreaker is the back of the carton:\n• no rapeseed (canola) oil\n• no gums, no stabilizers\n• 50% less sugar than other barista oat milks\n• 4g protein\n\nthe oat milk your coffee deserves — and the one that still wins when you flip it over.\n\nso: rate the pour 1-10 in the comments. then tell us how many other brackets can say the same about their label. 👀",
    hashtags:[
      "#willas",
      "#willasbarista",
      "#oatmilk",
      "#oatmilklatte",
      "#frothtest",
      "#homebarista",
      "#latteart",
      "#labelcheck",
      "#norapeseed",
      "#cleaningredients"
    ],
    visual:"Bright, sunlit home-cafe counter — warm daylight, airy, trend-forward, not muted brand-stock. Hands only, no talent on camera. Open tight on a steel pitcher steaming/frothing Willa's Barista into thick, glossy microfoam, then a confident slow pour into a clear glass or ceramic cup so a clean tulip/rosetta forms — the pour is the hero and reads like a sport replay. Mock 'tournament scorecard' overlay graphics in the Reviews/Recs purple (#A191B2) animate in like a bracket UI — a 'POUR SCORE' meter that fills up, then a second card flips to a 'BACK OF CARTON' scorecard. Willa's Barista carton sits in frame throughout, occupying 40%+, label legible. Olipop-cheeky energy in the typography — playful, knowing, a little smug-but-warm. End on the finished latte beside the carton with the sign-off card. Color palette: creamy white, espresso brown, soft daylight.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Tight close-up, soft daylight: a steel pitcher frothing Willa's Barista into thick glossy microfoam, swirling. Bracket-style overlay (purple #A191B2, top): 'OAT MILK FROTH TOURNAMENT'. Text overlay punches in: 'everyone's running a froth bracket. cool.' Quick beat-matched cut."},
      {scene:"PERFORMANCE", time:"3-9s", action:"Hands pour Willa's Barista from the pitcher into a clear glass over espresso — a confident slow pour that forms a clean tulip. Animated 'POUR SCORE' meter fills to a high number. Overlay: 'the froth? she performs.' Willa's Barista carton visible at frame edge, label legible."},
      {scene:"TWIST", time:"9-15s", action:"Hand flips the carton to show the back label. The bracket UI flips with a card-turn transition to a second scorecard titled 'BACK OF CARTON'. Overlay lines stagger in: 'no rapeseed · no gums · 50% less sugar than other barista oat milks · 4g protein.' Cheeky stamp: 'tiebreaker. 🏆'"},
      {scene:"DEBATE", time:"15-20s", action:"Overhead: the finished latte centered beside the carton, foam pristine. Engagement-bait overlay (the Pattern 07 move): 'rate this pour 1-10 👇' then a second line: 'then tell us how many other brackets can say that about their label.' Hold on the latte for a beat."},
      {scene:"END CARD", time:"20-23s", action:"Willa's Barista carton centered beside the latte on a clean creamy-white background. Sign-off text: 'the oat milk your coffee deserves.' Small Willa's wordmark beneath. Cut to black."}
    ],
    audio:"Warm narrative voiceover, playful and a little smug-but-warm — Olipop-cheeky confidence, never combative. Upbeat lofi/jazzy coffee-shop bed underneath, light and bouncy to match the tournament energy. VO beats track the overlays: lean into the froth on the pour, drop a knowing beat on the carton-flip, lift on the comment-bait close. Optional trending sound swap if a peaking home-cafe audio fits the cut.",
    duration:"20-23 seconds",
    cta:{soft:"rate the pour in the comments — 1 to 10.", medium:"froth a glass of Willa's Barista and score it yourself — then flip the carton.", strong:"swap the bracket favorite for the one that wins on the label too — Willa's Barista."},
    benefitShorthandId:"BS-4"
  },
  {
    id:"JUN29-PIN-1",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"viral-recipe-remix",
    timing:"Wed Jul 1 · any",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the cream was never the secret. the whole oat was.\" — dairy-free creamy ramen pin",
    intel:[
      {type:"PULSE", text:"Plant-based creators are quietly winning FoodTok by oat-milk-swapping viral dairy formats, with dairy-free creamy ramen leading the wave — the swap disappears when the base is rich enough (CP-10). Willa's answer leads: the body comes from the whole oat groat (bran, germ and all), not cream, so a silky broth is 4 ingredients of oat milk doing the work — 1g sugar, 4g+ protein, 2g+ fiber, no dairy, no filtered-down oat syrup."},
      {type:"AUDIENCE", text:"Pinterest recipe savers are searching 'dairy-free creamy ramen' to recreate the FoodTok hit at home — they want a screenshot-able pin with a real ingredient list, not a vague 'use oat milk' note. The pour has to read as the trick, not a sad substitute."},
      {type:"COMPETITOR", text:"Internal: the category is leaning summer-flavor-forward and 'simplify the label' (C-1) — both chasing where Willa's already lives. Never name them; the move is to own the creamy-without-cream recipe lane with a pour built to actually carry a broth."}
    ],
    hooks:[
      {text:"let's make dairy-free creamy ramen", recommended:true},
      {text:"silky ramen broth, zero cream, zero dairy", recommended:false},
      {text:"the creamy ramen swap nobody can taste", recommended:false}
    ],
    caption:"Cozy-bowl weather doesn't take the summer off, and this dairy-free creamy ramen is the one we keep coming back to. 🍜🥢 Silky, savory, a little spicy — and the rich, creamy broth comes entirely from oat milk, no cream and no dairy in sight. Willa's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 That whole-oat body is the whole trick — it carries the broth the way cream would, so the swap just disappears into the richness.\n\nIngredients\n- 1.5 cups Willa's Organic Oat Milk\n- 2 cups low-sodium veggie broth\n- 2 portions ramen noodles\n- 1 tbsp white miso\n- 2 tsp sriracha (more to taste)\n- 2 tbsp nutritional yeast\n- 1 tbsp soy sauce or tamari\n- 2 cloves garlic, grated\n- 1 tsp fresh ginger, grated\n- toppings: soft-boiled egg or crispy tofu, scallions, chili crisp, toasted sesame",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#dairyfreeramen",
      "#creamyramen",
      "#dairyfree",
      "#veganrecipes",
      "#labelcheck",
      "#organicoats",
      "#nourishthespark",
      "#realfood"
    ],
    visual:"Bright overhead flat-lay on a sunlit linen-and-light-wood counter, warm late-afternoon window light, airy and trend-forward (no muted brand-kitchen stock). The hero is a deep ceramic bowl of dairy-free creamy ramen: a glossy, silky pale-gold broth visibly clinging to a tangle of noodles, a halved soft-boiled egg or golden crispy tofu, bright scallion coins, a swirl of red chili crisp, toasted sesame. Steam rising, chopsticks lifting a noodle pull mid-frame to show the broth's creamy cling. Staged DELIBERATELY in frame beside the bowl — competing for the shot, not losing to it — is the Willa's Original carton standing upright, label facing camera, with a small measuring glass of the oat milk mid-pour or resting beside it, so the carton + pour occupy 40%+ of the frame and read as the source of the creaminess. A hand drifts in at the top of frame grating ginger or holding the chopsticks (Pattern 09 aesthetic-IRL). Color story: pale-gold broth, scallion green, chili red, oat-tan carton, creamy white pour. Crisp lower-third text overlay, clean sans: 'the cream was never the secret. the whole oat was.' Pinterest-native 2:3 vertical crop, screenshot-able, zero clinical infographic energy.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for your next cozy-bowl night", medium:"make the swap and tell us nobody could taste it", strong:"grab Willa's Original and build the creamiest ramen broth without a drop of cream"}
  },
  {
    id:"JUN29-PIN-2",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Multi",
    dnaPattern:"at-shelf-moment",
    timing:"Thu Jul 2 · any",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"abundance plate, abundance pour — the drink that earns its spot on the board.\" — stone-fruit grazing pin",
    intel:[
      {type:"PULSE", text:"Grazing culture is peaking with the 'bring a board' format headlined by peach charcuterie — ripe stone fruit, hot honey, heirloom tomatoes, basil — built for shareability where saturated natural color beats muted styling (CP-9). The lead here is the abundance, not a nutrition stat: a no-cook, anti-restriction summer plate that wants a beautiful drink staged beside it. Willa's is the visual co-star — a tall iced Barista or a creamy chocolate pour styled in frame as the pour pretty enough to belong on the board. Celebrate-food beat: no plain-oats side that loses the shot."},
      {type:"AUDIENCE", text:"Pinterest's summer-entertaining savers pin the spread they want to recreate for the next 'bring a board' night — the boards that get saved are the ones styled with saturated color and a drink that completes the picture. The win is a gorgeous, screenshot-ready abundance plate where the carton is part of the styling, not an afterthought scoop on the side. Lead with the feast and the feel-good of a table you don't have to apologize for — the drink reads as the finishing touch that makes the board look effortless."},
      {type:"COMPETITOR", text:"Internal: the category leaned into summer mood this cycle (a major oat name ran a wellness-as-self-care matcha push, C-1) — backdrop for why a genuinely styleable, whole-oat pour wins the visual-entertaining moment, NOT the framing for this pin. Never name a competitor on the surface; use 'most oat milks' / 'average oat milk' only if a contrast is needed, but this pin doesn't need a teardown at all. Keep it about the board and the pour that earns its spot, full stop."}
    ],
    hooks:[
      {text:"build the board, then pour the drink that actually deserves a spot on it.", recommended:true},
      {text:"peach charcuterie season called — your grazing board needs a pour this pretty.", recommended:false},
      {text:"abundance plate, abundance pour: stone fruit, hot honey, and a glass worth styling.", recommended:false}
    ],
    caption:"abundance plate, abundance pour — the drink that earns its spot on the board.\n\nsummer's loudest flex is the 'bring a board' night: ripe peaches, hot honey, heirloom tomatoes, torn basil, no cooking required. style it big, style it colorful — and pour something beside it that looks as good as the spread.\n\nwhy Willa's belongs on the board:\n• tall iced Willa's Barista — 50% less sugar than other barista oat milks, no rapeseed, no gums faking the body\n• or a creamy Willa's Chocolate pour — real cacao, 5 ingredients, Good Food Awards winner\n• whole oat groat — bran, germ, and all, like steel-cut oats — so the protein and fiber stay in\n• USDA Organic · Non-GMO · Certified Glyphosate Residue Free · WBENC mother-founded\n\nno plain-oats side that loses the shot. a pour pretty enough to be part of the picture, on a table that celebrates eating instead of scoring it.\n\npin it for your next board night — then build the plate and pour the glass.\n\nplants, finally done right.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#grazingboard",
      "#peachcharcuterie",
      "#summerentertaining",
      "#boardnight",
      "#organicoatmilk",
      "#realfood",
      "#wholeoat",
      "#abundance"
    ],
    visual:"Bright, editorial Pinterest still — vertical 2:3, sunlit and saturated (lean INTO natural color, not muted brand-stock). A generous stone-fruit grazing board fills most of the frame: halved ripe peaches, a drizzle of hot honey, heirloom tomato wedges, torn basil, a few crackers, color-forward and abundant. Staged in frame as the visual co-star — a tall clear glass of iced Willa's Barista over ice (creamy, with the carton visible just behind it) OR a creamy Willa's Chocolate pour mid-stream into a glass — the pour is photographed pretty enough to earn its place on the board, NOT scooped plain on the side. Carton occupies 40%+ of the styled frame, label readable. No talent on camera (hands + product + board only; Christina-reserved is NOT used here). Daylight, airy negative space at top for the headline overlay. Headline text top-third in clean type: 'the pour that earns a spot on the board.' Optional small green (#75C596) tag near the carton: 'whole oat · no rapeseed · real cacao.' Whole composition reads as a warm, screenshot-ready abundance plate a host would save — celebrate-food energy, no teardown, scannable at thumbnail size.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"pin this for your next board night.", medium:"save it and grab Willa's for the spread — Barista on ice or Chocolate poured cold.", strong:"build the board and pour the Willa's that completes it — the drink that earns its spot on the table."}
  },
  {
    id:"JUN29-PIN-3",
    platform:"Pinterest",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Fri Jul 3 · any",
    priority:"STANDARD",
    concept:"\"read the carton, not the marketing — this one earns its spot per pour\" — receipts-as-headline pin",
    intel:[
      {type:"TREND", text:"Health is the #1 driver of what people buy now, with affordability #2 and the eco-story slipped to #3 — shoppers want nutritional payoff per dollar at the shelf (T-4). Willa's answer leads: 4 ingredients (organic whole grain oats, filtered water, organic vanilla, sea salt), 1g sugar, 4g+ protein, 2g+ fiber, because Willa's keeps the whole oat groat — bran, germ and all — instead of the filtered-down oat syrup most milks pour."},
      {type:"AUDIENCE", text:"Pinterest savers building grocery + pantry boards are scoring cartons like a checklist now — they pin 'clean pantry staples' and 'what to actually buy' days before the run. This is the shopper who flips the box over and wants the math to add up before it goes in the cart."},
      {type:"COMPETITOR", text:"Internal: the category is leaning on summer-mood self-care spectacle and eco-narrative to sell the pour (C-1) — but the shopper's buy-trigger moved to what the carton actually does. Never name a competitor on the pin; own the receipts that read better than the marketing."}
    ],
    hooks:[
      {text:"the carton that earns its spot by what's actually in it", recommended:true},
      {text:"1g sugar · 4g+ protein · 2g+ fiber · 4 ingredients — read it, then buy it", recommended:false},
      {text:"skip the marketing, flip the box — the whole oat does the talking", recommended:false}
    ],
    caption:"These days the question at the shelf isn't 'is it pretty' — it's 'what does this carton actually do for me?' 🛒 So here's the receipt: read the carton, not the marketing — this one earns its spot per pour.\n\nWilla's Original is 4 ingredients (organic whole grain oats, filtered water, organic vanilla extract, sea salt), 1g sugar, 4g+ protein, 2g+ fiber per cup. That's because Willa's keeps the whole oat groat — bran, germ and all, like steel-cut oats — instead of the filtered-down oat syrup most milks pour. Most oat milks filter out both the fiber AND the protein, then process the starch into sugar. Willa's keeps both.\n\nUSDA Organic · Non-GMO · Certified glyphosate-free, tested every lot · WBENC women-owned. (And yes — whole-oat, zero-food-waste, climate-friendly oats. That part's just the footnote.)\n\nThe payoff is in the pour, not the pitch. Nourish the spark in everyone.\n\n#willas #oatmilk #labelcheck #cleanlabel #organic #oatmilkbenefits #realfood #wholeplant #dairyfree #glyphosatefree",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#labelcheck",
      "#cleanlabel",
      "#organic",
      "#oatmilkbenefits",
      "#realfood",
      "#wholeplant",
      "#dairyfree",
      "#glyphosatefree"
    ],
    visual:"Bright, editorial Pinterest pin (2:3 vertical), receipts-as-headline energy — Pattern 10 wordplay where the text overlay IS the post. Clean sun-flooded backdrop in a warm creamy-white and soft-purple palette (Reviews/Recs lane), zero clinical infographic feel. The Willa's Original carton stands label-forward, hero-center, occupying 45%+ of the frame, a tall iced glass of creamy Original beaded with condensation beside it. Style the proof points as a crisp, hand-checklist text overlay running down one side like a literal receipt: '✓ 1g sugar  ✓ 4g+ protein  ✓ 2g+ fiber  ✓ 4 ingredients  ✓ the whole oat.' Big sans headline across the top third: 'earns its spot by what's IN it.' A hand optionally drifting in to tilt the carton back-label toward camera, ingredient list legible. Keep the eco-credential visually tiny if shown at all — a small footnote-style line at the very bottom ('+ zero food waste'), never the headline. Editorial-bright, screenshot-able, the kind of pin a shopper saves to a 'what to actually buy' board.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for your next grocery run", medium:"flip the box before you buy — start with one that earns its spot", strong:"grab Willa's Original and pour the carton that reads better than the marketing"}
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
  {icon:"↑", title:"\"real food, passed down. reinvented forward.\" leads the week as the 250th heritage-table Reel on Wed Jul 1.", reason:"July 4 lands on a Saturday and marks America's 250th — the cookout conversation is leaning into roots over fireworks, whose-recipe-is-this and the dishes that lasted 250 years. A grandmother-founded brand born from a 1921 kitchen owns this register naturally. We pour one clean carton for the whole gathering — a layered red-white-blue cooler everyone shares, no separate kids' version. Christina-reserved heritage beat, the carton belongs because the table does.", agent:"composer"},
  {icon:"↑", title:"\"the glitch freezes on the one with four ingredients.\" goes BIG SWING on TikTok Wed Jul 1, riding the stuck-frame glitch.", reason:"Charli XCX's 'Rock Music' stuck-frame glitch is the template eating FoodTok — sync to the mid-song malfunction, freeze the beat, unfreeze to the payoff. The freeze IS the reveal, so we freeze on the back label and unfreeze to the shortest ingredient list in the aisle. The format carries the reach; the four real ingredients are the payload. No competitor named — the frozen four-line label is the whole contrast.", agent:"pulse"},
  {icon:"↑", title:"\"the protein wave doesn't need another isolate. it needs a whole plant.\" carries the second BIG SWING Thu Jul 2.", reason:"Beans, lentils and fava are the category's fastest-rising protein lane, pulling the whole shelf toward whole-plant nutrition. The protein-curious shopper is exhausted by scoops and isolates. We lead with permission, not the wave: Willa's Original kept the protein AND fiber in the whole oat the entire time — nothing taken out to be sold back as a scoop. Kiki-Milk confidence, the carton is the lead.", agent:"trend"},
  {icon:"↑", title:"\"protein-and-fiber plate, meet your protein-and-fiber pour.\" rides FoodTok's dense bean salad Fri Jul 3.", reason:"The dense bean salad is FoodTok's protein-and-fiber juggernaut, the recipe face of the whole-plant protein wave. The move is built-in: build the salad, then pour a chilled Willa's Original alongside as the creamy whole-oat counterpart — both real-ingredient, both keeping the protein and fiber in. House recipe-video convention, the plate-and-pour two-shot is the payload.", agent:"pulse"},
  {icon:"⚡", title:"\"one cooler. it carries the whole afternoon.\" cooler-pack POV queued for Sat Jul 4 against the Round of 16.", reason:"The World Cup Round of 16 lands on the 250th cookout — one long afternoon where the cooler feeds both crowds. We ride the cooler, not the match: a kids' Chocolate pour beside an iced Barista for the grown-ups, one carton family for the whole table. No sports-bro register, the match stays blurred in the background; the multi-generation cooler is the whitespace nobody's claiming on a big-gathering day.", agent:"editor"},
  {icon:"⚡", title:"\"the diy instinct is right. it just strains out the good part.\" calm oat-milk correction queued for Thu Jul 2.", reason:"Zero-waste 'just make your own oat milk' clips are circulating as the plastic-free flex — but the 30-second version strains most of the oat's body down the drain and skips the shelf-life a real carton holds. We honor the instinct, then fill in the part the clip skips: Willa's keeps the whole groat, strains nothing in and nothing out. Aunt-at-the-table calm, never the dunk.", agent:"pulse"},
  {icon:"↓", title:"Held the World Cup lane to the cooler-pack table over a watch-party or match-reaction stitch.", reason:"The tournament is genuinely mass-cultural, but Willa's plays the family table, not the match — a sports-bro register fails the tonal test. We ride the long-afternoon cooler where one carton family pours for the kids' table AND the adults' iced coffee, the match blurred and secondary in frame. The sport stays background; the kitchen is the lead.", agent:"pulse"},
  {icon:"×", title:"Killed the fibermaxxing-anchored brief before it could anchor a card.", reason:"Fibermaxxing is genuinely everywhere this week, but fiber-trend briefs are oversaturated on the burn list and explicitly rested. We folded the fiber science into the beta-glucan/heart explainer and the whole-plant protein POV as supporting proof — the trend is the backdrop, the whole-oat answer is the lead — rather than letting fibermaxxing anchor its own card.", agent:"editor"}
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
  total:15240,
  lift:44,
  sessions:1218,
  topRoiFormat:"Parent-confession Reel + format-as-virality stitch (school-milk \"the one i'd actually send\" Reel peaked JUN 15)",
  topRoiPerBrief:1693,
  source:"Shopify + Klaviyo"
};

const AGENT_BY_ID = Object.fromEntries(AGENTS.map(a=>[a.id,a]));

// ─── Brief ↔ source links (the threading) ─────────────────
const BRIEF_LINKS = {
  "JUN29-TT-1":{
    trends:[
      "T-2",
      "T-5"
    ],
    pulse:[
      "CP-3"
    ],
    comps:[]
  },
  "JUN29-IG-R1":{
    trends:[
      "T-1"
    ],
    pulse:[
      "CP-6"
    ],
    comps:[]
  },
  "JUN29-TT-6":{
    trends:[
      "T-7"
    ],
    pulse:[],
    comps:[]
  },
  "JUN29-TT-2":{
    trends:[],
    pulse:[
      "CP-4"
    ],
    comps:[
      "C-1",
      "C-2"
    ]
  },
  "JUN29-IG-R2":{
    trends:[
      "T-2"
    ],
    pulse:[],
    comps:[]
  },
  "JUN29-IG-F1":{
    trends:[
      "T-8",
      "T-3"
    ],
    pulse:[],
    comps:[]
  },
  "JUN29-TT-3":{
    trends:[],
    pulse:[
      "CP-2",
      "CP-10"
    ],
    comps:[]
  },
  "JUN29-IG-F2":{
    trends:[
      "T-5"
    ],
    pulse:[],
    comps:[]
  },
  "JUN29-IG-R3":{
    trends:[],
    pulse:[
      "CP-1"
    ],
    comps:[]
  },
  "JUN29-IG-R4":{
    trends:[
      "T-3",
      "T-2"
    ],
    pulse:[],
    comps:[]
  },
  "JUN29-TT-4":{
    trends:[
      "T-10"
    ],
    pulse:[],
    comps:[]
  },
  "JUN29-TT-5":{
    trends:[],
    pulse:[
      "CP-7"
    ],
    comps:[]
  },
  "JUN29-TT-7":{
    trends:[],
    pulse:[
      "CP-11"
    ],
    comps:[
      "C-2"
    ]
  },
  "JUN29-IG-R5":{
    trends:[],
    pulse:[],
    comps:[
      "C-2"
    ]
  },
  "JUN29-PIN-1":{
    trends:[],
    pulse:[
      "CP-10"
    ],
    comps:[]
  },
  "JUN29-PIN-2":{
    trends:[],
    pulse:[
      "CP-9"
    ],
    comps:[
      "C-1"
    ]
  },
  "JUN29-PIN-3":{
    trends:[
      "T-4"
    ],
    pulse:[],
    comps:[
      "C-1"
    ]
  }
};



// ─── Paid Amplify Plans (Paid Media Planner output) ──────
const AMPLIFY_PLANS = {
  "JUN29-IG-R1":{
    headline:"250th heritage-table Reel — lead the week on America's biggest cookout day with one clean carton the whole gathering pours from",
    totalBudget:300,
    testWindow:"5 days (Wed Jul 1 → Sun Jul 5)",
    objective:"Saves + Shares",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"July 4, 2026 falls on a Saturday and marks America's 250th — the biggest cookout-and-gather day of the decade, with the conversation leaning into roots over fireworks (America250, Food Network Jun 28). A grandmother-founded brand born from a 1921 kitchen owns 'real food, passed down. reinvented forward.' without forcing it. We pour one clean carton for the whole gathering — a layered red-white-blue cooler everyone shares, natural color, no separate kids' version. Christina-reserved heritage beat, the carton belongs because the table does. We name no one.",
    placements:[
      {platform:"Meta", format:"Reels Ad (IG Reels + FB Reels)", budget:300, audience:"Interest: Clean Label, Organic Food, Whole Foods, Sprouts, Mom-Founded, Heritage Cooking, July 4th Entertaining, Dairy-Free · Age: 28–50 · Behavior: Engaged with recipe / family-gathering content (30 days)", lookalike:"Klaviyo Willa's purchaser lookalike + clean-label parent lookalike + heritage/organic-cooking engaged audience", expectedReach:"90K–150K video views", note:"Optimize for Saves + Shares — the one-carton-whole-table pour is the share engine on a gathering day. Ship Wed Jul 1 midday so it compounds through the Sat Jul 4 weekend. If sentiment holds above 0.88 through 72hr, extend to $400 for the full holiday-weekend ride."}
    ]
  },
  "JUN29-TT-1":{
    headline:"Rock Music glitch-freeze — ride FoodTok's stuck-frame template and freeze on the carton with four ingredients",
    totalBudget:250,
    testWindow:"4 days (Wed Jul 1 → Sat Jul 4)",
    objective:"Video Views + Saves",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"The Charli XCX 'Rock Music' stuck-frame glitch — freeze on the mid-song malfunction, unfreeze to the payoff — is the template eating FoodTok (New Engen Jun 21). The freeze IS the reveal, so we freeze on the back label and unfreeze to the shortest ingredient list in the aisle. The format carries the reach; the four real ingredients are the payload. Format-as-virality has been the highest-reach lane all year. No competitor named — the frozen four-line label is the whole contrast.",
    placements:[
      {platform:"TikTok", format:"Spark Ad", budget:250, audience:"Interest: Clean Label, Oat Milk, Dairy-Free, TikTok Food, Trending Audio, Label Check, FoodTok · Age: 22–42 · Behavior: Engaged with trending-format + recipe content (30 days)", lookalike:"Willa's Original engaged-non-follower lookalike + clean-label / FoodTok format audience", expectedReach:"85K–145K video views", note:"Optimize for Video Views first, Saves second — this rides a fast-moving format with a live audio, so ship inside the window. The glitch-freeze on the label is the hook; keep the four-ingredient unfreeze clean. If the format cools before Day 3, redirect budget to JUN29-IG-R1."}
    ]
  },
  "JUN29-IG-R2":{
    headline:"\"The protein wave doesn't need another isolate\" Reel — answer the bean-and-pulse wave with the whole oat that kept it in",
    totalBudget:240,
    testWindow:"4 days (Thu Jul 2 → Sun Jul 5)",
    objective:"Saves + Profile Visits",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"Beans, lentils and fava are the category's fastest-rising protein lane, pulling the whole shelf toward whole-plant nutrition (Just Food, Industry Arc Jun 22). The protein-curious shopper is exhausted by isolates and scoops. We lead with permission, not the wave: Willa's Original kept the protein AND fiber in the whole oat the entire time — nothing taken out to be sold back as a scoop. Kiki-Milk confidence, the carton is the lead, the taboo (most oat milks filter both out) stated calmly. We name no one.",
    placements:[
      {platform:"Meta", format:"Reels Ad (IG Reels + FB Reels)", budget:240, audience:"Interest: Clean Label, High Protein, Plant Protein, Fiber, Whole Foods, Organic Food, Gut Health · Age: 25–45 · Behavior: Engaged with protein / clean-label nutrition content (30 days)", lookalike:"Willa's Original engaged-non-follower lookalike + high-protein / clean-label audience", expectedReach:"70K–125K video views", note:"Optimize for Saves. The 'nothing added back — it just never left' beat is the share engine — let the calm taboo land as matter-of-fact authority, never a callout. Ship Thu Jul 2 midday while the whole-plant protein conversation is live."}
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
  {date:"Sun Jun 28 · 22:05", agent:"composer", msg:"17 briefs delivered for the week of JUN 29 – JUL 5 · 3 BIG SWINGs (250th heritage-table pour · Rock Music glitch-freeze 4-ingredient · whole-plant-protein \"needs a whole plant\" Reel) · 6 HIGH · America's 250th + World Cup R16 + bean/pulse-protein spine"},
  {date:"Sun Jun 28 · 21:20", agent:"editor", msg:"Caption variants drafted across the slate (direct / warm / punchy) · brand-voice default · Willa's capitalized in caption bodies · Christina reserved for the 250th heritage Reel only, brand 'we' / cofounder-mom voice everywhere else, no first-person Christina"},
  {date:"Sun Jun 28 · 18:10", agent:"composer", msg:"America's 250th lands July 4 on a Saturday — biggest cookout-and-gather day of the decade, conversation leaning into roots over fireworks (America250 · Food Network Jun 28) — BIG SWING \"real food, passed down. reinvented forward.\" heritage-table Reel queued, one clean carton everyone pours from"},
  {date:"Sun Jun 28 · 16:45", agent:"pulse", msg:"Charli XCX 'Rock Music' stuck-frame glitch confirmed as the template eating FoodTok (New Engen Jun 21) — BIG SWING glitch-freeze queued, freeze on the back label, unfreeze to the four-ingredient list as the payload"},
  {date:"Sun Jun 28 · 15:30", agent:"trend", msg:"Beans + pulses pegged out-growing meat through 2030, fava + almond the fastest-rising, legumes driving 41% of new fiber-and-protein launches (Just Food · Industry Arc Jun 22) — BIG SWING \"the protein wave doesn't need another isolate\" Original Reel queued, protein + fiber kept in the whole oat"},
  {date:"Sun Jun 28 · 14:15", agent:"pulse", msg:"World Cup Round of 16 begins Sat Jul 4, knockout phase landing on the 250th cookout day (ESPN 2026 schedule) — \"one cooler — it carries the whole afternoon\" cooler-pack POV queued, kids' Chocolate + iced Barista, no sports-bro register"},
  {date:"Sun Jun 28 · 13:00", agent:"pulse", msg:"Dense bean salad confirmed FoodTok's protein-and-fiber juggernaut, the recipe face of the whole-plant wave (Eating by Elaine Jun 26 · #beansalad) — \"protein-and-fiber plate, meet your protein-and-fiber pour\" remix queued, chilled Willa's Original as the creamy counterpart"},
  {date:"Sun Jun 28 · 11:40", agent:"pulse", msg:"Zero-waste DIY oat-milk clips circulating as the plastic-free flex but straining out the oat's body (TikTok @zerowastestore Jun 19) — calm \"the diy instinct is right. it just strains out the good part\" correction queued, the whole groat kept in, never the dunk"},
  {date:"Sun Jun 28 · 10:35", agent:"comp", msg:"Viral oat-milk frothability tournament showing shoppers now score oat milks like a bracket (TikTok @itsblume Jun 21) — countered with \"rate the pour, but check the back of the carton before you score it,\" no rapeseed, no gums, 50% less sugar as the tiebreaker"},
  {date:"Sat Jun 27 · 18:30", agent:"editor", msg:"Killed 9 stale or burned-lane signals: fibermaxxing (oversaturated burn list, folded into T-5/T-2) · front-of-pack label (JUN 22 BIG SWING, burned) · Phoebe Bridgers audio bed (entertainment lane just used) · Scary Mommy passing (generosity/recognition fail) · postbiotics (fiber-adjacent dupe) · unsweetened-category market-size (audience-outsider) · others adjacency- or trade-press-killed"},
  {date:"Sat Jun 27 · 15:10", agent:"perf", msg:"Rolled JUN 15-21 results into the Performance window (2-week lag) — 13 shipped, ~2.74M reach, 6.6× avg saves-delta · the school-milk \"the one i'd actually send\" parenting Reel was the saves hero (8.7×) · escalated the parent-confession register into the milk-aisle-checklist Reel this week"},
  {date:"Sat Jun 27 · 13:00", agent:"visual", msg:"Visual direction set bright + trend-forward across the slate — hands + product + kitchen default, Christina-reserved heritage presence on the 250th Reel only, layered red-white-blue natural-color pour, golden-hour cookout grade on the cooler POV · phone-mockup scripts populated on all 12 Reels + TikToks"}
];


// ─── Killed signals (the ones we said no to) ──────────────
const KILLED = [
  {signal:"Fibermaxxing peaking (Johns Hopkins, Forum Health, NPR, multiple Jun 22-25 sources)", reason:"Genuinely fresh and everywhere this week, but fiber-trend briefs are explicitly oversaturated on the burn list (APR 20, APR 27, MAY 11, MAY 18 — no fiber-trend anchors). Folded the fiber science into the beta-glucan/heart explainer (T-5) and the whole-plant protein POV (T-2) as supporting proof rather than letting fibermaxxing anchor its own card — the trend is the backdrop, the whole-oat answer is the lead.", by:"Cultural Editor"},
  {signal:"Front-of-pack red/yellow/green label + UPF-definition policy cycle (FoodNavigator, Agri-Pulse)", reason:"The front-of-pack-label lane was the JUN 22 BIG SWING (T-1, the 'green before you flip it' calm-authority Reel) and is squarely burned — running it again two weeks later reads as the engine looping the same policy beat. The America's 250th heritage table (T-1 this week) carries a genuinely fresh, distinct cultural anchor instead.", by:"Cultural Editor"},
  {signal:"Phoebe Bridgers 'Lost Boys' slow-folk audio bed (Consequence Jun 21, NPR Jun 26)", reason:"On-tone and in-window, but the entertainment-as-audio-bed lane was just used JUN 22 (hojicha + JoyMagenta morning-ritual content) and the heritage-table Reel already carries the slow-folk-instrumental mood this week. Running a standalone music-drop pulse on top would over-stack the unhurried-kitchen register; held it to keep the slate spread across recipe / meme / parenting / news rather than music-heavy.", by:"Cultural Editor"},
  {signal:"Scary Mommy founder Jill Smokler passing / honest-motherhood reckoning (Fox News Jun 22)", reason:"Genuinely in-window and tonally adjacent to Willa's mother-founded lane, but riding a public figure's death as a content peg fails the audience-recognition + generosity test — too easy to read as opportunistic, and the brand can't honor it without making the post about Willa's. The parenting lane is carried by the milk-aisle checklist (T-3) and the no-kid-menu confession (T-10) instead, both warmer and lower-risk.", by:"Cultural Editor"},
  {signal:"Postbiotics / prebiotic-fiber-as-raw-material gut-health frontier (Nutrition Insight Jun 24)", reason:"Fresh and on-lane, but the gut-fiber story is doubly adjacent to the rested fibermaxxing trend AND the beta-glucan/heart explainer (T-5) already carries the prebiotic-fiber proof this week. Running a separate postbiotics card would be one fiber conversation twice; held it to keep the HEALTH/WELLNESS slate from over-indexing on fiber science.", by:"Cultural Editor"},
  {signal:"Unsweetened plant milk fastest-growing slice of the $1B+ US oat category (FoodNavigator, Industry Arc)", reason:"A real category-growth signal, but it's trade-press market-size framing that fails the audience-outsider test — '$0.97B to $1.74B by 2031' is internal context, not customer copy. Folded the whole-grain / lower-sugar baseline insight into the receipts-first pin (T-4, nutritional payoff per dollar) as background; led with what the carton does, never the market projection.", by:"Cultural Editor"},
  {signal:"AAP plant-based kid-nutrition endorsement as a standalone news brief", reason:"Kept as the backdrop for the milk-aisle checklist Reel (T-3) rather than its own card — the pediatric guidance is medical air-cover that explains why-now, but a brief anchored on 'pediatricians endorse plant protein' reads as a press release, not a Willa's post. Lead-with-the-solution: the carton that already passes is the lead, the endorsement is the why.", by:"Cultural Editor"},
  {signal:"Ghia founder-story-plus-ritual content move (TikTok @drinkghia Jun 28)", reason:"A strong portable peer-brand move (founder credibility + how-to ritual), but it's a pattern to mine for voice, not a fresh datable signal for Willa's — and the heritage-table Reel (T-1) already carries the founder/grandmother-origin energy this week via Christina's reserved on-camera slot. Folded the founder-credibility posture into that brief rather than running a separate comp-driven card.", by:"Cultural Editor"},
  {signal:"Health + price beat sustainability at the shelf as its own card (T-4 standalone)", reason:"The buy-trigger research is real and informs the receipts-first pin, but a brief headlined on 'sustainability slipped to #3' is consumer-irrelevant industry framing. Kept the insight as the why-now behind the 'read the carton, not the marketing' pin — nutritional payoff per dollar leads, the eco-credential rides as a footnote, never the headline.", by:"Cultural Editor"}
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
  "JUN29-TT-1":{direct:"Most oat milks would NOT survive a freeze-frame on the back label. ✋🥛\n\nWilla's Original is the whole plant milk — made from the whole entire oat groat (bran, germ and all), not oat syrup. Most oat milks filter out both the fiber AND the protein, then process the starch into sugar. We keep the good stuff in.\n\nFreeze the frame on what's actually in the cup:\n• 1g sugar (from the oats, nothing added)\n• 4g+ protein\n• 2g+ prebiotic fiber (the gut-supporting fiber in whole oats)\n• 4 real ingredients, no isolates, no gums\n\nOrganic whole grain oats. Filtered water. Organic vanilla extract. Sea salt. That's the whole list. 📋\n\nUSDA Organic. Non-GMO. Certified glyphosate-free — tested every lot. The label that reads better the longer you stare at it.", warm:"POV: the beat glitches, the frame freezes, and the oat milk with nothing to hide is the one stuck on your screen. ✋🥛\n\nWilla's Original uses the whole entire oat — bran, germ and all — so you keep the protein and fiber most oat milks filter out. 1g sugar, four real ingredients, and shhh… the back label reads like a grocery receipt, not a chemistry set.\n\nstare as long as you want.", punchy:"the glitch freezes on the one with four ingredients. 1g sugar, the whole oat, nothing to hide. ✋🥛"},
  "JUN29-IG-R1":{direct:"Real food, passed down. Reinvented forward.\n\n250 years of American tables, and the dishes that lasted are the ones that got handed down — a grandmother's hands, real ingredients, no shortcuts. Willa's started the same way: our founder's grandmother, Willa, born 1921, cooked with whole, real food long before it was cool. We just reinvented it forward into a carton.\n\nFor the America's 250th gathering, one clean carton everyone pours from — a layered red-white-blue oat-milk cooler the whole table shares. No separate kids' version. No label to decode at the party.\n\nThe pour:\n· Willa's Original Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup 🥛\n· blended fresh strawberries + a touch of maple for the red\n· Willa's Original, poured slow over ice, for the white\n· wild blueberries blended with a splash of Willa's for the blue\n\n1g sugar · 4g+ protein · 2g+ prebiotic fiber · 4 ingredients. Organic. Certified glyphosate-free, tested every lot.\n\n\"Real food, passed down. Reinvented forward.\" The carton belongs because the table does. 🇺🇸\n\nNourish the spark in everyone.", warm:"The recipes that made it 250 years? The ones a grandmother handed down. 🇺🇸 shhh… that's Willa's whole story — real food from a 1921 kitchen, reinvented forward into a carton. For the gathering, one clean pour the whole table shares: red strawberry, white Willa's Original over ice, blue blueberry, all from a single carton. No separate kids' version. The carton belongs because the table does.", punchy:"real food, passed down. reinvented forward. one Willa's carton, the whole 250th table. 🇺🇸"},
  "JUN29-TT-6":{direct:"Willa's Kids pours the one thing most kids' drinks quietly skip: DHA — the omega-3 their brains and eyes are built on. 🧠🥛 We put it in on purpose, from algae (no fish, no top-9 allergens), because parents asked us for a kids' drink they didn't have to second-guess.\n\nHere's the part nobody clocks until they flip the carton: roughly 76% of kids worldwide run short on DHA, and most kids' cartons add zero. Pediatricians suggest 250-500mg of EPA+DHA a day from age one — and it's hiding in plain sight on the front of the fridge.\n\nWhat's actually in the Willa's Kids pour:\n- Algae DHA (the omega-3 their brain runs on)\n- 8g protein\n- 6g sugar (from organic maple, not cane)\n- Free of the top 9 allergens — no nut, soy, gluten, dairy, sesame\n- Yuka 100/100\n\nSame creamy pour your kid asks for. One less thing for you to second-guess. 🤍", warm:"shhh… here's the one spec worth checking on a kids' drink, and almost nobody tells you: DHA — the omega-3 their little brains and eyes are built on. 🧠 most kids' cartons add zero. Willa's Kids builds it in on purpose, from algae — plus 8g protein, free of the top 9 allergens, and a Yuka 100/100. same creamy pour they ask for. one less thing to second-guess. 🤍", punchy:"the omega-3 their brain runs on? most kids' drinks skip it. Willa's Kids pours it — algae DHA, 8g protein, top-9 allergen-free. 🧠🥛"},
  "JUN29-TT-2":{direct:"Willa's Original is organic, certified glyphosate-free, and made from the whole oat groat — bran, germ, and all. 4g+ protein, 2g+ prebiotic fiber (the kind that supports gut health), 1g sugar, 4 ingredients. Nothing strained in. Nothing strained out.\n\nThe DIY clips have the right instinct — fewer fillers, less plastic, food you can name. We're with you on that. Here's the part the 30-second version skips: straining oats and ice water pours most of the oat's body down the drain, and a homemade jar lasts about 4 days.\n\nWilla's keeps the whole groat the way steel-cut oats do — so the protein and the prebiotic fiber stay in the pour. Most oat milks filter out both the protein AND the fiber, then process the starch into sugar. We don't.\n\nOrganic. Non-GMO. Certified glyphosate-free. WBENC women-owned.\n\nThe DIY instinct is right. It just strains out the good part.", warm:"love the diy oat milk energy — fewer fillers, food you can name, we're genuinely here for it. 🥛\n\nhere's the bit the 30-second clip skips: straining pours most of the oat down the drain. Willa's Original keeps the whole groat — bran, germ, and all — so the protein + fiber stay in. 4g+ protein, 2g+ fiber, 1g sugar, 4 ingredients. organic, glyphosate-free.\n\nshhh… we strain nothing in, and nothing out.", punchy:"straining your own oat milk pours out the part you wanted to keep. Willa's Original keeps the whole oat in: 4g+ protein, 2g+ fiber, 1g sugar, 4 ingredients — organic + glyphosate-free. 🥛"},
  "JUN29-IG-R2":{direct:"Willa's Original keeps it all in: 4g+ protein, 2g+ prebiotic fiber (the fiber that feeds gut health), 1g sugar, 4 ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt. The whole oat groat — bran, germ and all — so the protein and fiber stay exactly where they started. 🌾\n\nMost oat milks don't. They filter the protein AND the fiber out of the oat, process the leftover starch into sugar, then sell the protein back to you as a scoop. The protein wave doesn't need another isolate. It needs a whole plant.\n\nBeans, lentils, fava — the whole-plant protein lane is moving fast right now. The whole oat has been one the entire time. 🥛\n\nNo isolate. No pea protein added back. No gums. Nothing taken out just to be sold back to you.\n\nUSDA Organic · Non-GMO · Certified Glyphosate Residue Free · 4g+ protein · 2g+ fiber · 1g sugar · WBENC", warm:"shhh… here's what most oat milks won't say: they strip the protein AND the fiber out of the oat, then sell it back to you as a scoop. Willa's Original just kept it in. 4g+ protein, 2g+ fiber (the kind that feeds gut health), 1g sugar, 4 ingredients, the whole oat groat — bran, germ and all. nothing added back, because nothing left. 🌾 the protein wave doesn't need another isolate. it needs a whole plant.", punchy:"the protein wave doesn't need another isolate. it needs a whole plant. Willa's Original: 4g protein, 2g fiber, 4 ingredients, the whole oat. 🥛"},
  "JUN29-IG-F1":{direct:"The pour that survives the cooler bag — no fridge, no fight. 🎒\n\nCamp mornings and road-trip afternoons need fuel that travels, not a juice box that spoils by noon or a sugar drink that crashes the day. Willa's Kids checks the whole list before it goes in the bag:\n\n- shelf-stable — packs without ice, holds till snack time\n- 8g protein — the same as dairy, real fuel for the day\n- top-9 allergen-free — no nut, soy, gluten, dairy, sesame\n- USDA Organic — with plant-based DHA, made from the whole oat\n\nMost kids' drinks make you trade one of those away — organic OR simple, sweet OR clean, travel-ready OR actually nourishing. Willa's Kids is the one you can pack and forget. Parents asked us to make a carton they could trust on the go. We listened. 🥛\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC", warm:"for the parent packing the cooler bag at 7am: shhh… this one doesn't need ice, doesn't spoil by noon, and won't crash the kid mid-afternoon. Willa's Kids is shelf-stable, 8g protein, top-9 allergen-free, USDA Organic. pack it and forget it. parents asked us to make a carton they could trust on the go — we listened. 🎒", punchy:"shelf-stable. 8g protein. allergen-free. into the cooler bag it goes. 🥛"},
  "JUN29-TT-3":{direct:"The protein flatbread taking over everyone's feeds right now is delicious — and built entirely on dairy. So we made the swap nobody did yet. 🫓 High-protein, 100% plant-based, zero compromise on the chew.\n\nThe trick is the bind: blended Kite Hill almond cottage cheese (dairy-free) plus a splash of Willa's Organic Oat Milk. Willa's uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup — so the dough comes together creamy without a drop of dairy. 🥛\n\nIngredients:\n- 1 cup Kite Hill almond cottage cheese (dairy-free), blended smooth\n- 3 tbsp Willa's Organic Oat Milk\n- 1 cup all-purpose or gluten-free flour\n- 1 tsp baking powder\n- ½ tsp sea salt\n- olive oil, for the pan\n\nBlend the Kite Hill almond cottage cheese with Willa's Original until silky. Fold in the dry ingredients to a soft dough, press flat, and pan-fry in a little olive oil until golden and puffed. ☀️", warm:"the whole internet is making the protein flatbread — but it's all dairy. so we made the swap nobody did yet. 🫓 shhh… the creamy bind is blended Kite Hill almond cottage cheese plus a splash of Willa's Original, the 4-ingredient oat milk doing the rich-and-smooth work no dairy required. high-protein, all chew, zero compromise. ☀️", punchy:"dairy-free protein flatbread: blended Kite Hill almond cottage cheese + a splash of Willa's Original = the swap nobody on the FYP made yet. high-protein, no dairy, all chew. 🫓"},
  "JUN29-IG-F2":{direct:"the part that's good for your heart is the part most oat milks pour down the drain. Willa's keeps it in the cup — beta-glucan (the fiber in oats that supports your heart + gut) AND 4g+ protein, the parts most oat milks filter out. 🌾\n\nHere's the gap nobody mentions: oats are documented to support healthy cholesterol when you eat them daily. But the typical oat-milk process filters out the bran and germ first — pouring out the protein and fiber — then turns the leftover starch into sugar. You came for the oat. Most cartons kept the sugar and tossed the good part.\n\nWilla's Original uses the whole oat groat — bran, germ, and all, like steel-cut oats:\n- 4g+ protein, where most oat milks land under 1g\n- 2g+ fiber, including the beta-glucan oats are known for\n- 1g sugar, from the oats, nothing added\n- 4 ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt\n\nThe whole oat is the whole point. We just never filtered it out. 🥛\n\nUSDA Organic · Non-GMO · Certified Glyphosate-Free · WBENC", warm:"quick one for the oat-milk aisle: shhh… the part that's good for your heart is the part most oat milks pour down the drain — right along with the protein. Willa's keeps the whole oat groat, so you get beta-glucan (the heart-and-gut fiber) plus 4g+ protein and just 1g sugar. the whole oat was the whole point. 🌾", punchy:"you came for the oat. Willa's is the one that kept it. 🥛"},
  "JUN29-IG-R3":{direct:"The dense bean salad took over our feed, so it took over our counter. 🫘☀️ Layers of beans, crisp veg and a bright olive-oil dressing — built sturdy, built to satisfy, built entirely on real ingredients you can name. We poured a chilled glass of Willa's Original right alongside, because a protein-and-fiber plate deserves a protein-and-fiber pour.\n\nWilla's Original Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup — 4 ingredients, 1g sugar, 4g+ protein, 2g+ prebiotic fiber (the kind that feeds good gut bacteria), the whole oat groat instead of filtered oat syrup. 🥛\n\nIngredients\n- 1 can chickpeas, drained + rinsed\n- 1 can cannellini beans, drained + rinsed\n- 1 can kidney beans, drained + rinsed\n- 1 cup cherry tomatoes, quartered\n- 1 mini cucumber, diced\n- 1/2 red onion, finely diced\n- 1/4 cup chopped parsley\n- 3 tbsp olive oil\n- 2 tbsp red wine vinegar\n- juice of 1 lemon, salt + pepper\n- 1 tall glass Willa's Original Organic Oat Milk, chilled, poured alongside\n\nToss the beans, veg and herbs, whisk the dressing, fold it through and let it sit 10 minutes. Pour the Willa's Original over ice on the side. Protein-and-fiber plate, protein-and-fiber pour — both real-ingredient, both keeping the good stuff in.", warm:"The salad FoodTok can't stop remixing finally hit our kitchen. 🫘 Three kinds of beans, bright veg, a lemony dressing — sturdy, satisfying, all real food. We poured a tall chilled glass of Willa's Original right beside it.\n\nWhy that pour? It's the whole oat — 4g+ protein, 2g+ fiber, 1g sugar, 4 ingredients. shhh… a protein-and-fiber plate deserves a protein-and-fiber pour.", punchy:"protein-and-fiber plate, meet your protein-and-fiber pour. 🫘 Willa's Original — whole oat, 4 ingredients, 1g sugar."},
  "JUN29-IG-R4":{direct:"Four things every parent checks before it goes in the cup. One carton clears all four. 🌾\n\nProtein? 8g — same as dairy. Sweetener? 6g from organic maple, nothing added. Allergens? Free of the top 9 — no nut, soy, gluten, dairy, sesame. Organic? USDA certified. That's Willa's Kids.\n\nWilla's Kids: plant-based DHA from algae, Yuka scored 100/100, and we use the whole oat — bran and germ and all, not oat syrup — so the protein and fiber stay in.\n\nPediatric guidance now backs well-planned plant protein for kids of every age — beans, lentils, plant protein as a real choice, not a niche swap. The carton makes it easy to say yes to.\n\nParents asked us to make a kids' carton they could trust in four seconds. We listened. 🥛\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC", warm:"the milk-aisle math: enough protein, the right sweetener, allergen-safe, organic — and you usually have to give one up. shhh… not with this one. Willa's Kids clears all four: 8g protein, organic maple, top-9 allergen-free, Yuka 100. the one you don't have to settle on. 🌾", punchy:"protein. sweetener. allergens. organic. Willa's Kids is the one carton that clears all four. 🥛"},
  "JUN29-TT-4":{direct:"We used to keep two chocolate milks in the fridge: the one the kids actually drink, and the one we felt okay about them drinking. 🍫 Willa's Chocolate is the one carton that's both. It's real cacao and just 5 ingredients — organic whole grain oats, filtered water, organic coconut sugar, organic cacao, sea salt — with 5g protein and 11g sugar (about half the sugar of dairy chocolate milk). It even won a Good Food Awards Best Beverage. The whole oat groat stays in, bran and germ and all, so it's rich and creamy without the junk. No kid menu, no separate 'healthy' version, no negotiating at the fridge. Just the chocolate milk everyone reaches for. 🌾", warm:"two chocolate milks used to live in our fridge — the fun one and the 'okay i guess' one. 🍫 now it's just Willa's Chocolate. real cacao, 5 ingredients, half the sugar of dairy chocolate milk, and shhh… it won a Good Food Award. the one they reach for, no kid menu required.", punchy:"retire the two-chocolate-milk fridge. Willa's Chocolate is the one everyone reaches for. 🍫🌾"},
  "JUN29-TT-5":{direct:"one cooler. a kids' chocolate pour and an iced coffee for the grown-ups. it carries the whole afternoon.\n\nthe Jul 4 cookout runs long — kids underfoot, the match on in the background, everyone grazing. Willa's packs the cooler once and pours for the whole table.\n\nwhat's in the cooler, since the lineup is the whole point:\n• Willa's Chocolate for the kids — real cacao, 5 ingredients, 50% less sugar than the chocolate milk you grew up on\n• Willa's Barista over ice for the grown-ups — 50% less sugar than other barista oat milks, no rapeseed\n• both made from the whole oat groat (the whole oat kernel, bran and germ and all), not oat syrup\n• USDA Organic · Certified glyphosate-free (tested every lot)\n\nthe whole point: one carton family that handles the kids' table and the adults' cooler at the same time. nourish the spark — for everybody at the gathering.", warm:"shhh… the secret to an all-afternoon cookout is packing the cooler once.\n\nWilla's Chocolate for the kids' glasses, Willa's Barista over ice for the grown-ups — one carton family that pours for everybody at the table while the match plays on. real cacao, real coffee, real oat. 🥤☀️", punchy:"one cooler. kids' Chocolate + iced Barista for the grown-ups. it carries the whole Jul 4 afternoon. (whole oat, organic, no rapeseed.)"},
  "JUN29-TT-7":{direct:"you'll order a seafood boil from a guy named Dwayne off Facebook Marketplace — but you still flip the oat milk carton and read every word. 👀\n\nfunny how that works. the dinner's a gamble; the carton doesn't have to be. Willa's Original is 4 ingredients you can actually read — organic whole grain oats, filtered water, organic vanilla extract, sea salt. that's the whole list.\n\nmost oat milks filter out both the fiber AND the protein, then process the leftover starch into sugar. Willa's keeps the whole oat — so it's 1g sugar, 4g+ protein, 2g+ prebiotic fiber per cup. the part your gut actually wants stays in.\n\nso go ahead, trust the unhinged Marketplace dinner. just know exactly what's in the glass next to it.", warm:"shhh… you can eat the Marketplace seafood boil. we're not judging. 🦐\n\njust maybe read the one thing you don't have to guess about — Willa's Original, 4 ingredients you can actually pronounce, the whole oat kept whole.", punchy:"the brisket came from a stranger's garage. the oat milk has 4 ingredients i can read. 👀"},
  "JUN29-IG-R5":{direct:"rate the pour — but check the back of the carton before you score it.\n\nthe internet is running an oat-milk froth bracket this week, and honestly? we're here for it. so here's Willa's Barista entering the tournament: thick microfoam, a pour that holds its shape, latte art that actually behaves.\n\nbut the froth is just the entry round. the real tiebreaker is the back of the carton:\n• no rapeseed (canola) oil\n• no gums, no stabilizers\n• 50% less sugar than other barista oat milks\n• 4g protein\n\nthe oat milk your coffee deserves — and the one that still wins when you flip it over.\n\nso: rate the pour 1-10 in the comments. then tell us how many other brackets can say the same about their label. 👀", warm:"rate the pour — but flip the carton before you score it. ☕\n\nWilla's Barista froths thick, pours pretty, and holds the latte art. the part the bracket forgets to judge? no rapeseed, no gums, 50% less sugar than other barista oat milks.\n\nshhh… the froth is the easy part. the label is the flex.", punchy:"rate this pour 1-10 👇 then flip the carton: no rapeseed, no gums, 50% less sugar than other barista oat milks. Willa's Barista — wins the bracket AND the back label."},
  "JUN29-PIN-1":{direct:"Cozy-bowl weather doesn't take the summer off, and this dairy-free creamy ramen is the one we keep coming back to. 🍜🥢 Silky, savory, a little spicy — and the rich, creamy broth comes entirely from oat milk, no cream and no dairy in sight. Willa's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 That whole-oat body is the whole trick — it carries the broth the way cream would, so the swap just disappears into the richness.\n\nIngredients\n- 1.5 cups Willa's Organic Oat Milk\n- 2 cups low-sodium veggie broth\n- 2 portions ramen noodles\n- 1 tbsp white miso\n- 2 tsp sriracha (more to taste)\n- 2 tbsp nutritional yeast\n- 1 tbsp soy sauce or tamari\n- 2 cloves garlic, grated\n- 1 tsp fresh ginger, grated\n- toppings: soft-boiled egg or crispy tofu, scallions, chili crisp, toasted sesame", warm:"creamy ramen, no cream, no dairy — and somehow it's the richest bowl on the table. 🍜 the cream was never the secret. the whole oat was. Willa's Original is 4 ingredients and 1g sugar, made from the whole oat groat, so it keeps the fiber and protein most milks filter out — and pours a broth silky enough that shhh… nobody clocks the swap.", punchy:"silky, creamy, spicy ramen — zero cream, zero dairy. the cream was never the secret. the whole oat was. 🍜🥛"},
  "JUN29-PIN-2":{direct:"abundance plate, abundance pour — the drink that earns its spot on the board.\n\nsummer's loudest flex is the 'bring a board' night: ripe peaches, hot honey, heirloom tomatoes, torn basil, no cooking required. style it big, style it colorful — and pour something beside it that looks as good as the spread.\n\nwhy Willa's belongs on the board:\n• tall iced Willa's Barista — 50% less sugar than other barista oat milks, no rapeseed, no gums faking the body\n• or a creamy Willa's Chocolate pour — real cacao, 5 ingredients, Good Food Awards winner\n• whole oat groat — bran, germ, and all, like steel-cut oats — so the protein and fiber stay in\n• USDA Organic · Non-GMO · Certified Glyphosate Residue Free · WBENC mother-founded\n\nno plain-oats side that loses the shot. a pour pretty enough to be part of the picture, on a table that celebrates eating instead of scoring it.\n\npin it for your next board night — then build the plate and pour the glass.\n\nplants, finally done right.", warm:"the 'bring a board' night is summer's loudest flex — ripe peaches, hot honey, heirloom tomatoes, no cooking required. 🍑\n\nso pour something beside it that looks as good as the spread: an iced Willa's Barista or a creamy Chocolate pour, styled right into the picture.\n\nshhh… the secret to a board that photographs is a drink that earns its spot on it.", punchy:"peach charcuterie season needs a pour this pretty. iced Willa's Barista or a Chocolate pour — the drink that earns its spot on the board. pin it for board night."},
  "JUN29-PIN-3":{direct:"These days the question at the shelf isn't 'is it pretty' — it's 'what does this carton actually do for me?' 🛒 So here's the receipt: read the carton, not the marketing — this one earns its spot per pour.\n\nWilla's Original is 4 ingredients (organic whole grain oats, filtered water, organic vanilla extract, sea salt), 1g sugar, 4g+ protein, 2g+ fiber per cup. That's because Willa's keeps the whole oat groat — bran, germ and all, like steel-cut oats — instead of the filtered-down oat syrup most milks pour. Most oat milks filter out both the fiber AND the protein, then process the starch into sugar. Willa's keeps both.\n\nUSDA Organic · Non-GMO · Certified glyphosate-free, tested every lot · WBENC women-owned. (And yes — whole-oat, zero-food-waste, climate-friendly oats. That part's just the footnote.)\n\nThe payoff is in the pour, not the pitch. Nourish the spark in everyone.\n\n#willas #oatmilk #labelcheck #cleanlabel #organic #oatmilkbenefits #realfood #wholeplant #dairyfree #glyphosatefree", warm:"the shelf got smarter — so flip the box before it goes in the cart. 🛒 read the carton, not the marketing — this one earns its spot per pour. Willa's Original: 4 ingredients, 1g sugar, 4g+ protein, 2g+ fiber, made from the whole oat groat so it keeps the fiber and protein most milks filter out. shhh… the eco part's real too, it's just the footnote here. the payoff's in the pour.", punchy:"read the carton, not the marketing. 🛒 4 ingredients · 1g sugar · 4g+ protein · 2g+ fiber. earns its spot per pour."}
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
  happened:"The category leaned into summer mood and performance — the biggest oat name launched a wellness-as-self-care matcha push (Jun 25) while a viral frothability tournament (Jun 21) showed shoppers now compare oat milks like a bracket, scoring texture and ingredients head-to-head instead of grabbing a default.",
  coming:"Watch America's 250th turn July 4 into the year's biggest cookout-and-gather moment with the World Cup Round of 16 landing the same day, the whole-plant protein wave (beans, pulses, fava) keep pulling the category toward real-ingredient nutrition, and unsweetened, whole-grain pours keep setting the new baseline.",
  plays:"About 15-17 briefs on the table; the two biggest are a heritage-table semiquincentennial swing that pours one clean carton for the whole gathering, and a whole-plant-protein Original answer that rides the bean-and-pulse wave on what the oat groat actually keeps in."
};


// ─── Performance · Week of MAY 25 – MAY 31 results ──────────────
const LAST_WEEK_RESULTS = [
  {id:"JUN15-IG-R2", concept:"\"the one i'd actually send.\" — school-milk parenting Reel", platform:"IG Reel", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"New law opens school lunch lines to plant milk, parent's note unlocks a dairy-free pour for ~30M kids (JUN 15)", trendId:null, views:524000, saves:33800, shares:17400, comments:2620, savesDelta:8.7, sentiment:0.97, hero:true, note:"Saves hero of the JUN 15 week. The 'which one would I actually send' framing — answering the new cafeteria plant-milk slot with Willa's Kids (8g protein, allergen-free, Yuka 100) in cofounder-mom voice — was the share engine. The learning: a parent confession out-saves a spec sheet. This week the same parent-confession register escalates into the milk-aisle checklist Reel: 'four things every parent checks before it goes in the cup — one carton clears all four,' the silent four-point scan named and then resolved."},
  {id:"JUN15-TT-1", concept:"\"summon the one with nothing to hide.\" — Food Jutsu format flip", platform:"TikTok", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"Anime Food Jutsu hand-sign summon flagged June's top brand-friendly TikTok format (JUN 15)", trendId:null, views:486000, saves:27600, shares:15800, comments:2180, savesDelta:7.4, sentiment:0.95, hero:false, note:"Format-as-virality carried the reach — the anime hand-sign summon materialized the carton on the match-cut with the 4-ingredient stinger as the payload. The format does the reach work; the short list is the punchline. This week the same highest-reach lane runs the BIG SWING: the Charli XCX 'Rock Music' stuck-frame glitch freezes on the back label and unfreezes to the four-ingredient list — the format carries the reach, the four real ingredients are the payload."},
  {id:"JUN15-IG-R1", concept:"\"green before you flip it.\" — calm-authority label Reel", platform:"IG Reel", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"Regulators floating a red/yellow/green front-of-pack label you can judge at a glance (JUN 15)", trendId:null, views:398000, saves:24200, shares:11600, comments:1840, savesDelta:6.9, sentiment:0.96, hero:false, note:"Calm authority converted again — a 4-ingredient carton reading green before you turn it over, the regulator validating the whole pitch without a victory lap. The learning: lead with the answer, the policy is the backdrop. This week the same product-truth confidence carries the keep-it-in heart explainer: 'the part that's good for your heart is the part most oat milks pour down the drain' — Willa's keeps the beta-glucan AND the protein in the whole oat, the clinical news as the why."},
  {id:"JUN15-IG-R3", concept:"\"matcha got the headlines. hojicha got the oat milk.\" — first-mover Barista hojicha latte", platform:"IG Reel", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Hojicha pegged summer's breakout cafe drink, wide open in the oat lane (JUN 15)", trendId:null, views:356000, saves:21400, shares:12200, comments:1760, savesDelta:6.3, sentiment:0.94, hero:false, note:"First-mover recipe play landed — planting the dairy-free flag on summer's breakout cafe drink before the chains packaged it, color-and-pour doing the work. Viral-recipe-remix stays the highest-engagement recipe frame. This week the same remix logic runs on FoodTok's biggest food: 'protein-and-fiber plate, meet your protein-and-fiber pour' builds the dense bean salad and pours a chilled Willa's Original alongside as the creamy whole-oat counterpart."},
  {id:"JUN15-TT-3", concept:"\"the cleanest protein move has nothing to mix in.\" — calm protein-soda correction", platform:"TikTok", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"Doctors pushing back on the viral protein-Diet-Coke dirty-soda trend (JUN 15)", trendId:null, views:412000, saves:22800, shares:13400, comments:2040, savesDelta:6.1, sentiment:0.95, hero:false, note:"The calm-correction lane converted without preaching — answering the viral protein-soda trend matter-of-factly, whole-oat protein and fiber over a fizzy filler. The learning: agree with the instinct, then fill in the part the trend skips. This week the same gentle-correction register carries 'the diy instinct is right. it just strains out the good part' against the zero-waste DIY oat-milk clips — honor the instinct, keep the whole groat in, aunt-at-the-table not the dunk."},
  {id:"JUN15-IG-R4", concept:"\"the whole oat, nothing pulled out, nothing faked back in.\" — whole-oat POV Reel", platform:"IG Reel", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"First-in-the-nation 'Non-Ultraprocessed Certified' seal most of the aisle won't qualify for (JUN 15)", trendId:null, views:318000, saves:20600, shares:9800, comments:1520, savesDelta:6.8, sentiment:0.97, hero:false, note:"Confident product truth converted — reading the carton instead of claiming the seal, whole oat groat with nothing pulled out or faked back in. This week the same whole-plant confidence anchors the second BIG SWING: 'the protein wave doesn't need another isolate. it needs a whole plant' — Willa's Original kept the protein AND fiber in the whole oat the entire time, nothing added back because nothing left."},
  {id:"JUN15-TT-2", concept:"\"the purple does the talking. the carton does the rest.\" — vivid iced ube oat latte", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Ube logged the #1 trending drink ingredient (JUN 15)", trendId:null, views:372000, saves:18400, shares:12600, comments:1680, savesDelta:5.6, sentiment:0.93, hero:false, note:"Color-does-the-work reach play — a vivid iced ube oat latte over the clean white base, the #1 trending drink ingredient carried by color alone. Visual-first recipes pull saves on Pinterest-bound stills. This week the same styled-pour logic runs on the grazing board: the stone-fruit 'bring a board' pin stages an iced Barista or chocolate pour as the visual co-star — abundance plate, a pour pretty enough to earn its spot."},
  {id:"JUN15-IG-F1", concept:"\"the halftime chocolate milk the kids cheer for and the label can't argue with.\" — World Cup family-table pin", platform:"Pinterest", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"World Cup turning a quarter of the country into new fans, watch parties spilling into kitchens (JUN 15)", trendId:null, views:138000, saves:10200, shares:0, comments:0, savesDelta:6.9, sentiment:0.97, hero:false, note:"Pinterest pin compounded for 7+ days (CTR climbing daily) — the family-table-off-the-World-Cup framing captured the planning audience as a save-and-return cue, one carton feeding the room. This week the World Cup lane moves from the planning pin to the live cooler moment as the R16 lands on the 250th cookout: 'one cooler — it carries the whole afternoon' pours a kids' Chocolate and an iced Barista from one carton family, the match blurred behind."}
];

const PERF_KPIS = {
  shipped:17,
  totalReach:2742000,
  avgSavesDelta:6.6,
  topFormat:"Parent-confession Reels + format-as-virality audio stitches + viral-recipe-remix"
};

const PERF_INSIGHTS = [
  {title:"A parent confession was the saves hero of the JUN 15 week (the school-milk \"the one i'd actually send\" Reel hit 8.7× saves)", detail:"The 'the one i'd actually send' Reel hit 8.7× saves and 0.97 sentiment — answering the new cafeteria plant-milk slot with Willa's Kids (8g protein, allergen-free, Yuka 100) in cofounder-mom voice, never first-person Christina. The learning: a parent confession out-saves a spec sheet. This week the engine escalates the same register — the milk-aisle checklist Reel names the silent four-point scan every parent runs ('protein, sweetener, allergens, organic') and resolves it: 'four things every parent checks before it goes in the cup — one carton clears all four.'", agent:"composer"},
  {title:"Format-as-virality audio stitches carry the reach even at lower save-rate (the Food Jutsu summon hit 486K views)", detail:"The anime hand-sign summon pulled 486K views by materializing the carton on the match-cut with the 4-ingredient stinger as the payload — the format does the reach work, the short list is the punchline. This week the engine doubles down with the BIG SWING: the Charli XCX 'Rock Music' stuck-frame glitch freezes on the back label and unfreezes to the four-ingredient list. The format carries the reach; the four real ingredients are the payload.", agent:"pulse"},
  {title:"The dairy-free remix stays the highest-engagement recipe frame (the hojicha first-mover Reel hit 6.3× saves)", detail:"The 'matcha got the headlines. hojicha got the oat milk' Reel hit 6.3× saves and 0.94 sentiment — planting the dairy-free flag on summer's breakout cafe drink before the chains packaged it, color-and-pour doing the work without preaching. This week the engine runs the same remix logic on FoodTok's biggest food: 'protein-and-fiber plate, meet your protein-and-fiber pour' builds the dense bean salad and pours a chilled Willa's Original alongside as the creamy whole-oat counterpart — plate and pour both keeping the protein and fiber in.", agent:"pulse"},
  {title:"Calm correction converts without preaching (the protein-soda rebuttal hit 6.1× saves on 412K views)", detail:"The 'the cleanest protein move has nothing to mix in' TikTok answered the viral protein-soda trend matter-of-factly and converted at 0.95 sentiment — the learning: agree with the instinct first, then fill in the part the trend skips. This week the engine runs the same gentle-correction register against the zero-waste DIY oat-milk clips: 'the diy instinct is right. it just strains out the good part' honors the fewer-fillers instinct, then shows the whole groat Willa's keeps in — aunt-at-the-table calm, never the dunk.", agent:"pulse"}
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
  "JUN29-TT-1":{voice:93, panel:90, pulse:88, recency:7},
  "JUN29-IG-R1":{voice:95, panel:90, pulse:93, recency:9},
  "JUN29-TT-6":{voice:90, panel:87, pulse:85, recency:7},
  "JUN29-TT-2":{voice:94, panel:90, pulse:88, recency:8},
  "JUN29-IG-R2":{voice:93, panel:90, pulse:84, recency:8},
  "JUN29-IG-F1":{voice:90, panel:88, pulse:83, recency:8},
  "JUN29-TT-3":{voice:92, panel:90, pulse:94, recency:9},
  "JUN29-IG-F2":{voice:92, panel:90, pulse:79, recency:8},
  "JUN29-IG-R3":{voice:93, panel:90, pulse:93, recency:8},
  "JUN29-IG-R4":{voice:92, panel:90, pulse:84, recency:8},
  "JUN29-TT-4":{voice:93, panel:90, pulse:87, recency:9},
  "JUN29-TT-5":{voice:92, panel:89, pulse:90, recency:9},
  "JUN29-TT-7":{voice:93, panel:87, pulse:88, recency:8},
  "JUN29-IG-R5":{voice:92, panel:89, pulse:87, recency:9},
  "JUN29-PIN-1":{voice:92, panel:87, pulse:85, recency:8},
  "JUN29-PIN-2":{voice:90, panel:85, pulse:84, recency:7},
  "JUN29-PIN-3":{voice:92, panel:89, pulse:87, recency:8}
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
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"The dense bean salad is FoodTok's protein-and-fiber juggernaut — millions of remixes and counting 🫘",
    detail:"Violet Witchel's dense bean salad — layers of mixed beans, fresh veg and an olive-oil dressing — has spawned millions of recreations, with high-protein versions stacking four bean types for 20g+ protein per serving. It's the recipe face of the whole-plant protein wave: cheap, sturdy, endlessly customizable, and built entirely on real ingredients you can name.",
    velocity:"high",
    willasPlay:"Reel: build a dense bean salad in frame, then pour a chilled glass of Willa's Original alongside as the creamy, whole-oat counterpart — protein-and-fiber plate, protein-and-fiber pour, both real-ingredient.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"Eating by Elaine · Mediterranean dense bean salad (Jun 26, 2026)", url:"https://www.eatingbyelaine.com/mediterranean-dense-bean-salad/"},
      {label:"TikTok · #beansalad hashtag landing page (permanent reference)", url:"https://www.tiktok.com/tag/beansalad"}
    ]
  },
  {
    id:"CP-2",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"Cottage-cheese flatbread is the 3-ingredient protein bread breaking the FYP — and it's wide open for a dairy-free rebuild 🫓",
    detail:"A 3-ingredient cottage-cheese flatbread — high-protein, low-carb, naturally gluten-free — is breaking TikTok in late June 2026, the latest in a cottage-cheese remix wave that's gone from 'bland boomer food' to macro-optimization darling. The entire structure leans on dairy, which leaves a clean plant-based entry point for a creamy oat-and-tofu rebuild.",
    velocity:"high",
    willasPlay:"Reel: rebuild the flatbread dairy-free — blended Kite Hill almond cottage cheese plus a splash of Willa's Original for the creamy bind. 'Let's make dairy-free protein flatbread,' real-ingredient swap, no dairy.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"40 Aprons · cottage cheese flatbread viral TikTok recipe (Jun 27, 2026)", url:"https://40aprons.com/cottage-cheese-flatbread/"},
      {label:"TikTok · #cottagecheeseflatbread hashtag landing page (permanent reference)", url:"https://www.tiktok.com/tag/cottagecheeseflatbread"}
    ]
  },
  {
    id:"CP-3",
    type:"MEME FORMAT",
    typeColor:"#73B2C9",
    hook:"Charli XCX's 'Rock Music' stuck-frame glitch is the template eating the FYP — freeze on the drop, reveal the payoff 🎚️",
    detail:"Charli XCX's 'Rock Music' is peaking on TikTok in late June 2026 via the 'stuck-frame' glitch format: creators sync to the track's deliberate mid-song vocal malfunction, then freeze the moment with a glitch animation. It's a template-based format with a built-in payoff beat — the freeze IS the reveal — used across thousands of videos and primed for a clean brand drop-in.",
    velocity:"high",
    willasPlay:"TikTok: ride the stuck-frame glitch — fast pour montage, freeze on the glitch beat, unfreeze to the carton back-label landing the 4-ingredient stinger. The freeze is the reveal, hands-and-product.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"Stereogum · Charli XCX 'Rock Music' (May 2026 reference)", url:"https://stereogum.com/2498320/charli-xcx-rock-music/music"},
      {label:"NewEngen · June 2026 TikTok trends (Jun 21, 2026)", url:"https://newengen.com/insights/june-tiktok-trends/"}
    ]
  },
  {
    id:"CP-4",
    type:"MISINFO WATCH",
    typeColor:"#DC2626",
    hook:"'Just make your own oat milk' DIY clips are everywhere — and quietly skip what store-bought has to keep in 🥛",
    detail:"Zero-waste DIY oat-milk clips (½ cup oats + ice water, strain, 4-day fridge life) are circulating as the plastic-free, no-fillers flex — but the 30-second version strains out most of the oat's body and skips the fortification, sea-salt balance and shelf-life that a real carton holds. The DIY impulse is right; the assumption that all store-bought oat milk is fillers-and-oil is the part that needs a calm correction.",
    velocity:"medium",
    willasPlay:"Reel: warm, witty correction — the DIY instinct is right, but Willa's already strains nothing extra in and keeps the whole oat. Lead with what's actually in the 4-ingredient carton by beat two.",
    dnaMatch:"mom-activist",
    sources:[
      {label:"TikTok · #homemadeoatmilk (DIY oat-milk clips, hashtag page)", url:"https://www.tiktok.com/tag/homemadeoatmilk"}
    ]
  },
  {
    id:"CP-5",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"Scary Mommy's founder passed at 48 — and the internet is reckoning with the honest-motherhood movement she built 🤍",
    detail:"Jill Smokler, who launched Scary Mommy in 2008 and built a cultural phenomenon by centering honesty over Instagram-perfect motherhood — the chaos, the guilt, the love — died June 22, 2026 at 48 after a battle with glioblastoma. Her passing has parenting creators reflecting on the shift toward real, unfiltered family content and the mother-founded media she made room for.",
    velocity:"medium",
    willasPlay:"Reel: brand 'we' voice, no satire — honor the honest-motherhood lane by embodying it. A real, un-staged morning pour; the unfussy carton a real parent grabs. Mother-founded meeting mother-founded, gently.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"Fox News · Scary Mommy founder Jill Smokler dies at 48 (Jun 22, 2026)", url:"https://www.foxnews.com/health/popular-mommy-blogger-dies-48-two-years-devastating-cancer-diagnosis"}
    ]
  },
  {
    id:"CP-6",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"America's 250th is reframing the cookout as a heritage table — recipes that got passed down, not just grilled 🇺🇸",
    detail:"With July 4, 2026 marking the Semiquincentennial, the cultural conversation around the holiday is leaning into roots, generations and what gets handed down — immigrant family recipes, grandmother dishes, the foods that actually made it to American tables across 250 years. It's less fireworks, more 'whose recipe is this' — a heritage register a grandmother-founded brand lives inside naturally.",
    velocity:"high",
    willasPlay:"Reel: lean into the heritage-table register — a 'real food, passed down, reinvented forward' beat where a family recipe meets a clean oat-milk pour. The carton belongs because the table does. Christina heritage-eligible.",
    dnaMatch:"before-after-stitch",
    sources:[
      {label:"America250 · July 4 Moments — Semiquincentennial (2026 reference)", url:"https://america250.org/july-4-moments/"},
      {label:"The Observer · 2026 food trends shaping family cookouts (Jun 22, 2026)", url:"https://x.com/theobserver/status/2062567604275814870"}
    ]
  },
  {
    id:"CP-7",
    type:"NEWS CYCLE",
    typeColor:"#DC8A4E",
    hook:"The World Cup Round of 16 kicks off on July 4 itself — the cookout and the bracket collide in one kitchen ⚽",
    detail:"The 2026 FIFA World Cup Round of 16 begins Saturday July 4 with knockout matches in Houston (1pm ET) and Philadelphia (5pm ET), landing the tournament's most-watched phase directly on America's 250th cookout day. The result is a sports-plus-patriotic-plus-grazing convergence — one long afternoon where the spread has to carry both the grill crowd and the kids glued to the bracket.",
    velocity:"high",
    willasPlay:"Reel: ride the long-afternoon grazing table, not the match — the cooler that carries a kids' chocolate pour and an iced Barista coffee for the adults through a Round-of-16 cookout. No sports-bro register.",
    dnaMatch:"at-shelf-moment",
    sources:[
      {label:"ESPN · 2026 FIFA World Cup schedule — knockout rounds (2026 reference)", url:"https://www.espn.com/soccer/story/_/id/48939282/2026-fifa-world-cup-fixtures-results-match-schedule-group-stage-knockout-rounds-bracket"}
    ]
  },
  {
    id:"CP-8",
    type:"ENTERTAINMENT",
    typeColor:"#A191B2",
    hook:"Phoebe Bridgers is back after six years — 'Lost Boys' is the slow-folk soundtrack summer kitchens were waiting for 🎸",
    detail:"Phoebe Bridgers released 'Lost Boys,' the lead single from her first album in six years, in late June 2026 — vulnerable, heritage-leaning slow-folk that's already anchoring summer playlists. It's the exact tonal register Willa's content lives in: unhurried, grounded, the sound of a quiet kitchen with the windows open, no irony required.",
    velocity:"medium",
    willasPlay:"Reel: use the slow-folk mood as the audio bed for an unhurried morning-ritual pour — sunlit kitchen, single creamy glass, no hard sell. The song sets the pace; the carton just belongs in it.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"Consequence · Phoebe Bridgers 'Lost Boys' review (Jun 21, 2026)", url:"https://consequence.net/2026/06/phoebe-bridgers-lost-boys-review/"},
      {label:"NPR Music · New Music Friday (Jun 26, 2026)", url:"https://www.npr.org/2026/06/26/nx-s1-5871172/new-music-friday-best-albums-june-26-2026"}
    ]
  },
  {
    id:"CP-9",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"Peach charcuterie and 'bring a board' nights are summer's loudest grazing flex — messy, ripe, no-cook abundance 🍑",
    detail:"Grazing culture is peaking on June TikTok with the 'Bring a Board Night' format, headlined by peach charcuterie — ripe peaches, hot honey, heirloom tomatoes, basil — built for visual shareability where saturated, natural color outperforms muted styling. It's no-cook, indulgent and abundance-coded: the anti-restriction summer plate that wants a beautiful drink staged beside it.",
    velocity:"medium",
    willasPlay:"Reel: style a stone-fruit grazing board with a tall iced glass of Willa's Barista or a chocolate pour staged in frame as the visual co-star — abundance plate, a pour pretty enough to earn its spot. No plain-oats side that loses the shot.",
    dnaMatch:"at-shelf-moment",
    sources:[
      {label:"Bakery and Snacks · top 10 TikTok trends shaping bakery & snacks 2026 (Jun 25, 2026)", url:"https://www.bakeryandsnacks.com/Article/2026/01/27/top-10-tiktok-trends-shaping-bakery-and-snacks-in-2026"},
      {label:"TikTok · #grazingboard hashtag landing page (permanent reference)", url:"https://www.tiktok.com/tag/grazingboard"}
    ]
  },
  {
    id:"CP-10",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"Vegan creators are quietly winning FoodTok by oat-milk-swapping the viral dairy formats — dairy-free ramen leads 🍜",
    detail:"Plant-based creators are racking up millions of views by rebuilding trending dairy formats with oat milk and plant butter — dairy-free creamy ramen (oat milk, sriracha, nutritional yeast), creamy chickpea curries, sticky-lemon tofu — proving the swap is invisible when the base is rich enough. The move isn't 'vegan version,' it's 'this just tastes better and happens to be dairy-free.'",
    velocity:"medium",
    willasPlay:"Reel: 'let's make dairy-free creamy ramen' — a silky broth built on Willa's Original, no cream, no dairy. The swap disappears into the richness; whole-oat body is the whole trick.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"VegNews · 16 best TikTok recipes made vegan (Jun 24, 2026)", url:"https://vegnews.com/vegan-tiktok-recipes"},
      {label:"TikTok · #dairyfree hashtag landing page (permanent reference)", url:"https://www.tiktok.com/tag/dairyfree"}
    ]
  },
  {
    id:"CP-11",
    type:"MEME FORMAT",
    typeColor:"#73B2C9",
    hook:"'Ordering food off Facebook Marketplace' is TikTok's chaos-dining bit — and it's begging for a calm punchline 🛒",
    detail:"Ordering homemade BBQ and seafood boils off Facebook Marketplace is TikTok's most chaotic discovery trend of June 2026, led by creator @itsgabrielrivera — surprise-and-delight, community-sourced, gloriously unhinged dining. The format runs on the gap between chaos and what you actually trust to put in your body, a setup with a clean punchline for a brand built on knowing exactly what's in it.",
    velocity:"medium",
    willasPlay:"TikTok: ride the chaos-dining bit with a dry turn — 'sourcing dinner off Marketplace' energy, hard cut to the one thing you don't have to guess about: a 4-ingredient carton you can actually read. Wordplay payoff.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"NewEngen · June 2026 TikTok trends — Facebook Marketplace dining (Jun 21, 2026)", url:"https://newengen.com/insights/june-tiktok-trends/"}
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
  "JUN29-TT-1":"meme-payload",
  "JUN29-IG-R1":"before-after-stitch",
  "JUN29-TT-6":"mom-activist",
  "JUN29-TT-2":"mom-activist",
  "JUN29-IG-R2":"mom-activist",
  "JUN29-IG-F1":"on-pack-checklist",
  "JUN29-TT-3":"viral-recipe-remix",
  "JUN29-IG-F2":"on-pack-checklist",
  "JUN29-IG-R3":"viral-recipe-remix",
  "JUN29-IG-R4":"kid-family-moment",
  "JUN29-TT-4":"kid-family-moment",
  "JUN29-TT-5":"meme-payload",
  "JUN29-TT-7":"meme-payload",
  "JUN29-IG-R5":"at-shelf-moment",
  "JUN29-PIN-1":"viral-recipe-remix",
  "JUN29-PIN-2":"at-shelf-moment",
  "JUN29-PIN-3":"on-pack-checklist"
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
  "JUN29-TT-1":{
    shoot:[
      "Fast pour montage: hands tilting the Willa's Original carton into a frosty glass, hard cuts on the beat",
      "Locked freeze-frame mid-pour holding on the carton back label (for the glitch overlay)",
      "Sharp unfreeze cut to the four-ingredient list as a bold typographic card",
      "Overhead flat-lay of the four real ingredients beside the carton"
    ],
    found:[
      "Trend reference (Format + audio): https://newengen.com/insights/june-tiktok-trends/ — New Engen flags the 'Rock Music' stuck-frame glitch as a top June format; study the freeze-on-the-drop → unfreeze payoff structure",
      "Trend reference (Audio): https://stereogum.com/2498320/charli-xcx-rock-music/music — Charli XCX 'Rock Music', the track powering the stuck-frame glitch; cut the freeze to the deliberate mid-song vocal malfunction",
      "Trend reference (Format style): https://www.tiktok.com/tag/rockmusic — live top videos for glitch-animation timing + freeze-frame style to match"
    ],
    memes:[
      "Chromatic-aberration / VHS-glitch animation packs (CapCut) for the freeze-frame lock moment",
      "Bold typographic 'receipt' card style for the four-ingredient unfreeze reveal"
    ],
    archive:[
      "Skip — format is native-shot + trend-audio driven; no vintage/archive b-roll needed"
    ]
  },
  "JUN29-IG-R1":{
    shoot:[
      "Close-up of a worn handwritten recipe card + vintage glass on linen for the heritage open",
      "Match-cut forward to the same table set for a gathering, Willa's carton landing center",
      "Tight build of the layered red-white-blue glass (strawberry → Willa's over ice → blueberry), natural color only",
      "Wide of the single carton pouring into kids' + adults' glasses down the runner",
      "Christina's hands starting the pour (founder presence, no talking head)"
    ],
    found:[
      "Trend reference (Reel): https://www.tiktok.com/tag/layereddrink — red-white-blue layered-drink build format for pour pacing + on-screen-text rhythm",
      "Heritage-table reference: America250 · July 4 Moments (2026) — backdrop for the 'whose recipe is this' register (internal, do not cite on the surface)"
    ],
    memes:[
      "Skip — heritage World-Context Tie-In beat, no meme-template overlay; the layered-pour build is the visual hook"
    ],
    archive:[
      "Optional: 1950s-era home-kitchen b-roll or a real family recipe-card scan for the opening heritage frame (Prelinger Archive / family archive) — keep it a quick texture beat, not the whole Reel"
    ]
  },
  "JUN29-TT-6":{
    shoot:[
      "Parent's hand grabs the Willa's Kids carton from a bright fridge, sets it on the counter",
      "Pause-and-flip beat: finger reads the front of the carton, lands on the DHA callout",
      "Clean pour of Willa's Kids into a kid's cup, creamy whole-oat body, carton readable behind",
      "End shot: filled kid's cup beside the carton in full daylight"
    ],
    found:[
      "Trend reference (Format — Pattern 03 Relatable Confession): parent-creator 'the one thing I never thought to check' kids-nutrition POVs on https://www.tiktok.com/tag/kidsnutrition — match the calm pause-and-flip confession beat, not an alarmist read",
      "Trend reference (Creator style): @7kidskitchen7 (Mary Neilis) feed — borrow the real-parent phrasing + unfussy kitchen pacing for the VO cadence"
    ],
    memes:[
      "Skip — tender confession-style POV, no meme overlay; the pause-and-flip + typographic stings carry it"
    ],
    archive:[
      "Skip — fresh in-kitchen footage only; no vintage/b-roll for a current parenting POV"
    ]
  },
  "JUN29-TT-2":{
    shoot:[
      "Hands tipping ½ cup oats + ice water into a blender, blitzing — light, quick DIY energy",
      "Tight on the nut-milk-bag squeeze — clumped pulp left in the bag, thin liquid running out (the 'good part left behind' beat)",
      "Hard-cut clean slow pour of Willa's Original over ice in a tall glass, smooth + full-bodied",
      "Carton-to-camera label reveal, 'organic' + 4-ingredient list readable in warm daylight",
      "End-card still: carton beside finished glass, morning light"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/@zerowastestore/video/7383575631541325098 — the zero-waste DIY oat-milk build Willa's is calmly answering; match the strain-and-jar format pacing",
      "Trend reference (TikTok hashtag): https://www.tiktok.com/tag/diyoatmilk — broader DIY oat-milk format + hook patterns for the gentle correction"
    ],
    memes:[
      "Optional: a calm 'no shade, just the part the clip skips' text-overlay tone (no face) riffing the gentle-correction format — keep it grandma-at-the-table, never dunk-energy"
    ],
    archive:[
      "Skip — no archival footage; this is a present-tense trend correction shot fresh in-kitchen"
    ]
  },
  "JUN29-IG-R2":{
    shoot:[
      "Overhead: bowl of mixed beans, lentils, dried fava staged as the whole-plant protein wave",
      "Hand sweeping a generic protein-scoop tub out of frame, sliding the Willa's Original carton in",
      "Clean overhead of raw oat groats spilled beside the carton's 4-line back label, finger tracing",
      "Slow creamy pour into a clear glass, condensation, backlight catching the whole-oat body",
      "Tight on the 4-ingredient list beside the full glass"
    ],
    found:[
      "Trend reference (article): https://www.just-food.com/comment/full-of-beans-could-2026-see-a-boom-in-plant-based-proteins/ — the whole-plant / bean-and-pulse protein wave framing the Reel rides as backdrop",
      "Trend reference (Reel/TikTok): https://www.tiktok.com/tag/plantprotein — top videos for the protein-POV overlay pacing + matter-of-fact 'here's what they don't tell you' hook structure"
    ],
    memes:[
      "Skip heavy meme overlays — Taboo-as-Normal register lands on calm, dry delivery (Olipop-cheeky dialed down 30%), not gif comedy; the swap-out reveal is the payoff"
    ],
    archive:[
      "Skip archive — present-day kitchen + product shoot, no vintage b-roll needed"
    ]
  },
  "JUN29-IG-F1":{
    shoot:[
      "Open cooler bag / canvas tote packed for camp on a sunlit surface, Willa's Kids carton tucked beside real kid food (sandwich, clementine, crackers), no ice pack",
      "Carton centered with hand-drawn marker checklist overlay — shelf-stable / 8g protein / allergen-free / organic",
      "Road-trip cup-holder or picnic-blanket shot, carton standing upright in the wild",
      "Final flat-lay: carton beside the Yuka 100 badge on a cream background"
    ],
    found:[
      "Trend reference (carousel format): Partake Foods 'what's in the bag' + Ghia 'places you can take it' portability carousels on IG — clean sun-washed backgrounds, one proof per card, zine-cover type as the pacing model",
      "Reference (seasonal lane): Mommy Poppins-style camp-snack pack-out posts and allergy-aware-camp parent creators — the unstaged 'this is what actually goes in the cooler' framing"
    ],
    memes:[
      "Static carousel → skip memes; the packed-cooler shot + checklist overlay carry it, no gif overlay"
    ],
    archive:[
      "Skip archive — present-day product + summer-packing shoot only, no vintage b-roll"
    ]
  },
  "JUN29-TT-3":{
    shoot:[
      "Blender sequence: Kite Hill almond cottage cheese + Willa's Original whirring to a glossy silky cream",
      "Soft-dough fold + knead, then the press-flat shape",
      "Slow-mo dough lowering into the hot olive-oiled pan, edges puffing golden",
      "Steamy two-hand tear-and-pull hero on the finished flatbread, carton readable behind"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/cottagecheeseflatbread — pull the top builds for the press-flat-and-pan-fry pacing + the protein-bread payoff structure the format rewards",
      "Trend reference (TikTok): https://www.tiktok.com/tag/dairyfree — match the 'this just tastes better and happens to be dairy-free' reveal tone vegan creators are winning with"
    ],
    memes:[
      "Skip — recipe build, the dairy-free rebuild reveal is the payload, no meme overlay needed"
    ],
    archive:[
      "Skip — fresh in-kitchen footage only; no vintage/b-roll for a current viral-recipe remix"
    ]
  },
  "JUN29-IG-F2":{
    shoot:[
      "Willa's Original carton on a sun-washed cream surface beside a small bowl of whole oat groats",
      "Two-side process shot — oats through a strainer (filtered-out) vs. whole oat groat held in a hand (kept-in)",
      "Big-number callout stills (4g+ protein, 2g+ fiber incl. beta-glucan, 1g sugar)",
      "Final flat-lay: carton centered on cream with the cert row small at the base"
    ],
    found:[
      "Trend reference (carousel format): Olipop + Graza 'here's what's actually in it' explainer carousels on IG — clean cream backgrounds, one proof per card, zine-cover type as the pacing model",
      "Reference (science backdrop): Northwestern Medicine 'is oat milk healthier than cow's milk?' (Jun 21, 2026) — the beta-glucan / filtered-protein framing the carousel rebuts calmly"
    ],
    memes:[
      "Static carousel → skip memes; the strainer-vs-whole-oat visual carries the wordplay, no gif overlay"
    ],
    archive:[
      "Skip archive — present-day product + oats shoot only, no vintage b-roll"
    ]
  },
  "JUN29-IG-R3":{
    shoot:[
      "Overhead fast-cut layering of three drained beans + colorful veg stacking into a big clear bowl",
      "Glossy toss of the salad with the olive-oil dressing folding through (beans glistening)",
      "Slow creamy pour of Willa's Original over ice in a tall glass set beside the finished colorful salad (the hero two-shot)",
      "Final two-shot: forkful of salad lifted, then the glass lifted into midday light beside the bowl + carton"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/beansalad — study the top dense-bean-salad videos for the layering/toss framing + on-screen text patterns Willa's is riffing",
      "Trend reference (recipe): https://www.eatingbyelaine.com/mediterranean-dense-bean-salad/ — the Mediterranean dense-bean-salad build the wave is remixing, for ingredient + ratio reference"
    ],
    memes:[
      "Skip overt meme overlays — the plate-and-pour two-shot IS the payload; keep it recipe-clean per house convention"
    ],
    archive:[
      "Skip archive — this is a fresh-shoot home-kitchen recipe, no vintage b-roll needed"
    ]
  },
  "JUN29-IG-R4":{
    shoot:[
      "Medium close-up: parent's hand holding the Willa's Kids carton paused over an empty kid's cup at a sunlit counter",
      "Clean overhead of the carton back label, finger tracing the short ingredient list as checklist ticks stamp in",
      "Maple-cream pour into a kid's cup, condensation, backlight",
      "Tight on the carton face beside the full cup with Yuka 100 badge",
      "Small kid's hand reaching in to lift the cup"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/labelcheck — top 'reading the label / what I check before buying' videos for the confession-checklist overlay pacing parents recognize",
      "Trend reference (article): https://www.healthychildren.org/English/healthy-living/nutrition/Pages/Plant-Based-Diets.aspx — AAP plant-based-diets-for-children page, source for the pediatric-guidance backdrop"
    ],
    memes:[
      "Skip heavy meme overlays — kid-family-moment register, warm not goofy; the four-ticks-then-pour reveal is the payoff, no gif needed"
    ],
    archive:[
      "Skip archive — this is a present-day kitchen + milk-aisle shoot, no vintage b-roll"
    ]
  },
  "JUN29-TT-4":{
    shoot:[
      "Fridge door opening to two crowded chocolate-milk cartons, then a hand swapping both for a single chilled Willa's Chocolate carton — the visual confession",
      "Thick, rich chocolate pour from the Willa's Chocolate carton into a clear glass in bright morning light, deep cocoa body as the hero",
      "Overhead of the full chocolate glass beside the carton with the label facing camera for the proof beat",
      "A kid's hand reaching in and taking the glass off the counter without being asked",
      "Slow push-in resolving the carton to crisp focus for the end card"
    ],
    found:[
      "Trend reference (Parenting / clean-label roundup): https://everandeverbaby.com/blog/healthy-beginnings/modern-baby-nutrition-trends — Ever & Ever Baby evergreen guide to the 'Authoritative 2.0' upgraded-classics / no-kid-menu parenting philosophy this brief rides (permanent reference page, not a dated article)",
      "Trend reference (Kids nutrition market): https://www.nutritioninsight.com/news/kidfresh-children-food-nutrition-market-research-2026.html — Kidfresh 2026 US kids' nutrition research for the 'familiar food rebuilt clean' framing (2026 publication, verify date on access)"
    ],
    memes:[
      "The two-cartons-down-to-one swap IS the payload — keep the on-screen confession cards clean, sentence-case, brown-accented (#9E652E)",
      "Comment-bait prompt ('one carton or two in your fridge?') drives the engagement layer; pin a Willa's reply about retiring the kid-menu shelf"
    ],
    archive:[
      "Skip — no vintage/archive footage needed; this is a fresh-shoot fridge-and-pour family moment"
    ]
  },
  "JUN29-TT-5":{
    shoot:[
      "POV cooler-pack: overhead on an open ice-packed cooler bag, hands lowering in Willa's Chocolate + Barista cartons side by side, labels to camera",
      "All-afternoon establishers: soft-focus grill plume, a blurred match on a propped phone in the distance, a grazing table, kids' hands reaching",
      "Kid pour: glossy slow-pour of Willa's Chocolate into a short kid-height glass, sunlit, carton beside it",
      "Adult pour: iced Willa's Barista into a tall glass over ice, cream-bloom through the cubes, condensation beading",
      "End-card still: Chocolate + Barista cartons standing together beside the two filled glasses, golden cream background"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/cookout — Jul 4 cooler-pack + grazing-table POV format + warm summer grade to match",
      "Trend reference (web): https://www.espn.com/soccer/story/_/id/48939282/2026-fifa-world-cup-fixtures-results-match-schedule-group-stage-knockout-rounds-bracket — R16 begins Sat Jul 4 (the cultural backdrop, kept blurred + secondary in frame, never the hero)"
    ],
    memes:[
      "Skip hard meme-gifs — this is a warm cooler-pack-and-pour POV; the two-pour reveal IS the payload, not a reaction-gif",
      "Optional: the 'pack the bag with me' / 'what's in my cooler' POV text convention as the only meme-adjacent structure"
    ],
    archive:[
      "Skip archive — fully shot in-backyard this week; no vintage/period b-roll needed for a present-tense summer-cookout POV"
    ]
  },
  "JUN29-TT-7":{
    shoot:[
      "Phone-screen-recording of a (mocked-up, generic) Facebook Marketplace homemade-food listing — chaotic, grainy, recognizable",
      "Clean sunlit single-carton reset on a bright counter",
      "Macro: hand rotating the Willa's Original carton to the ingredient list, finger tracing the 4 lines",
      "Quick macro pour of creamy oat milk into a clear glass in daylight",
      "Finished glass beside the Willa's Original carton, light catching the pour"
    ],
    found:[
      "Trend reference (TikTok): https://newengen.com/insights/june-tiktok-trends/ — NewEngen's June 2026 breakdown of the Facebook Marketplace chaos-dining bit (creator @itsgabrielrivera) for the setup framing + pacing",
      "Trend reference (TikTok): https://www.tiktok.com/@itsgabrielrivera — the originating creator's Marketplace-dining format for the hard-cut + deadpan-reveal structure"
    ],
    memes:[
      "Lean into the text-joke beat (Pattern 10) — the contrast between the sketchy Marketplace listing overlay and the clean readable label is the whole gag; keep it dry, never name a brand or sneer at the seller"
    ],
    archive:[
      "Skip — fully original same-day kitchen shoot + a mocked-up generic listing, no archive needed"
    ]
  },
  "JUN29-IG-R5":{
    shoot:[
      "Steel pitcher frothing Willa's Barista into thick glossy microfoam — the 'performance' beat",
      "Confident slow pour forming a clean tulip/rosetta into a clear glass over espresso",
      "Hand flipping the Willa's Barista carton to the back label for the 'tiebreaker' card-turn",
      "Overhead of the finished latte beside the carton, foam pristine, for the comment-bait close"
    ],
    found:[
      "Trend reference (TikTok): @itsblume oat milk froth tournament — https://www.tiktok.com/@itsblume/video/7359298857483635973 — the head-to-head 'score the froth' bracket format Willa's is riffing on; match the scorecard/bracket UI energy",
      "Trend reference (format): home-barista 'rate my pour' Reels where a pour score or 1-10 prompt drives comments — borrow the engagement-bait debate structure (Humor Pattern 07)"
    ],
    memes:[
      "Bracket/tournament scorecard graphic (March-Madness-style UI) repurposed as a 'POUR SCORE' + 'BACK OF CARTON' two-card flip — built in-edit, not a gif overlay"
    ],
    archive:[
      "Skip — no vintage/period footage; this is a bright present-day home-cafe performance Reel"
    ]
  },
  "JUN29-PIN-1":{
    shoot:[
      "Overhead flat-lay: chopsticks lifting a creamy noodle pull from the bowl, Willa's Original carton + measuring glass sharing the frame",
      "Tight detail: glossy pale-gold broth clinging to noodles, soft-boiled egg halved, chili crisp swirl, steam rising",
      "Carton-forward angle: Willa's Original label upright beside the bowl mid-pour into the broth, label legible, warm window light"
    ],
    found:[
      "Trend reference (recipe/format): https://www.tiktok.com/tag/dairyfreeramen — #dairyfreeramen hashtag landing page, top-performing videos show oat-milk creamy broth as the primary swap format (CP-10 driver)",
      "Trend reference (hashtag): https://www.tiktok.com/tag/dairyfree — #dairyfree landing page for creamy-broth swap styling + hook patterns"
    ],
    memes:[
      "Static Pinterest pin → skip memes; the joke lives in the overlay wordplay ('the cream was never the secret')"
    ],
    archive:[
      "Static pin → skip archive; all original sunlit flat-lay capture, no vintage b-roll needed"
    ]
  },
  "JUN29-PIN-2":{
    shoot:[
      "Editorial overhead + front-on: a saturated stone-fruit grazing board (halved peaches, hot honey, heirloom tomatoes, basil) with a tall iced Willa's Barista glass + carton styled into the frame as the co-star",
      "Alt styling: creamy Willa's Chocolate pour mid-stream into a glass beside the board, label readable, daylight",
      "Overlay-card composite: 'the pour that earns a spot on the board' + small green tag 'whole oat · no rapeseed · real cacao' (#75C596)"
    ],
    found:[
      "Trend reference (TikTok): #grazingboard hashtag landing page — https://www.tiktok.com/tag/grazingboard — 'bring a board' / peach-charcuterie format for styling + saturated-color cues (CP-9)"
    ],
    memes:[
      "Skip — static Pinterest pin; the clean editorial board styling is the hook, a meme/gif overlay would undercut the saturated abundance composition"
    ],
    archive:[
      "Optional macro of whole oat groats / steel-cut oats from a stock library to reinforce 'whole oat' — no vintage/period footage needed for a clean editorial pin"
    ]
  },
  "JUN29-PIN-3":{
    shoot:[
      "Carton-forward hero: Willa's Original label-forward center-frame, tall iced glass beside it, sunlit creamy-white-and-purple palette",
      "Detail: hand tilting the Willa's Original back-label toward camera, 4-ingredient list legible",
      "Overhead receipt-style flat-lay: carton + glass with the proof-point checklist staged as a literal hand-checked list down one side",
      "Close-up: condensation beading on the iced Original glass, carton just behind in soft focus"
    ],
    found:[
      "Pinterest reference: search 'clean pantry staples' + 'what to actually buy grocery' for the receipts/checklist editorial styling to match",
      "Pinterest reference: 'oat milk label check' pins for the carton-back + proof-point overlay composition"
    ],
    memes:[
      "Static pin → skip memes; the joke lives entirely in the overlay wordplay ('earns its spot by what's IN it')"
    ],
    archive:[
      "Static lifestyle pin → skip archive; all original carton-forward styled photography, no vintage b-roll needed"
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
const WELCOME_WEEK_KEY = "JUN-29-2026";
const WELCOME_WEEK_RANGE = "JUN 29 – JUL 5, 2026";
const WELCOME_REFRESHED = "JUN 28, 2026";

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
  pullQuote:"america turns 250 on a saturday, the whole country's at the cookout table, and the internet's busy straining its own oat milk at midnight. good week to be the carton that got handed down — and still reads green when you flip it.",
  the_moves:[
    {kind:"ship", verb:"Open the week pouring one carton for the 250th heritage table.", why:"July 4 lands on a Saturday AND marks America's 250th — the biggest cookout-and-gather day of the decade, and the conversation is leaning into roots: whose-recipe-is-this, grandmother dishes, the foods that lasted 250 years. A grandmother-founded brand built on 'real food, passed down. reinvented forward.' owns this register without forcing it. The move is one clean carton everyone shares — a layered red-white-blue pour, natural color, no separate kids' version. Christina-reserved heritage beat. Ship the BIG SWING IG Reel Wed Jul 1, 12pm."},
    {kind:"ship", verb:"Freeze the FoodTok glitch on the one carton with four ingredients.", why:"Charli XCX's 'Rock Music' stuck-frame glitch — sync to the mid-song malfunction, freeze the beat, unfreeze to the payoff — is the template eating FoodTok. The freeze IS the reveal, so we freeze on the back label and unfreeze to the shortest ingredient list in the aisle: organic whole oats, filtered water, organic vanilla, sea salt. The format does the reach; the four-line label does the brand work. Ship the BIG SWING TikTok Wed Jul 1, 10am, inside the format's window."},
    {kind:"ship", verb:"Answer the whole-plant protein wave with the carton that never took it out.", why:"Beans, lentils and fava are the category's fastest-rising protein lane, pulling the whole shelf toward whole-plant nutrition. The protein-curious shopper is exhausted by isolates and scoops — so the move is permission: you don't have to add protein back after a brand filtered it out. Willa's Original kept it the whole time — 4g+ protein, 2g+ fiber, 4 ingredients, the whole oat groat. Lead with the carton, the bean wave is the backdrop. BIG SWING IG Reel Thu Jul 2, 12pm."}
  ]
};


const WELCOME_HIGHLIGHTS = [
  {
    stat:"America's 250th",
    label:"July 4 lands on a Saturday and marks the Semiquincentennial — the cookout becomes a heritage table",
    detail:"July 4, 2026 falls on a Saturday AND marks America's 250th birthday, making it the single largest cookout-and-gather day of the decade, with civic festivals running across Philadelphia, NYC and DC Jul 3-5. The conversation is leaning into roots over fireworks — whose-recipe-is-this, grandmother dishes, the foods that made it to American tables across 250 years. our move: a 'real food, passed down. reinvented forward.' Reel that pours one clean carton for the whole gathering — a layered red-white-blue oat-milk cooler everyone shares, natural color, no separate kids' version, the carton belonging because the table does.",
    color:"#9E652E",
    icon:"🇺🇸",
    glyph:"🇺🇸",
    kindLabel:"Cultural Conversation",
    sources:[
      {label:"America250 · July 4 Moments — Semiquincentennial events (2026 reference)", url:"https://america250.org/july-4-moments/"},
      {label:"Food Network · July 4th Favorites & Recipes (Jun 28, 2026)", url:"https://www.foodnetwork.com/recipes/photos/july-4th-favorites"}
    ]
  },
  {
    stat:"beans > meat",
    label:"pulse protein is officially out-growing meat — the category's center of gravity moved to the whole plant",
    detail:"The pulse-protein market is forecast to outpace meat in every major region through 2030 (beans and pulses growing about +1.7% annual volume vs. meat's +0.7%), with fava and almond proteins the fastest-rising ingredients and legumes now driving 41% of new fiber-and-protein launches — a structural shift toward whole-plant nutrition that an oat groat sits squarely inside. our move: a confident Original Reel that leads with the carton, not the headline — 4g+ protein and 2g+ fiber kept IN the whole oat, bran and germ included, not stripped out and sold back as a scoop. The protein wave doesn't need another isolate; it needs a whole plant.",
    color:"#73B2C9",
    icon:"🫘",
    glyph:"🫘",
    kindLabel:"Category Signal",
    sources:[
      {label:"Just Food · Full of Beans — plant-based protein boom 2026 (reference)", url:"https://www.just-food.com/comment/full-of-beans-could-2026-see-a-boom-in-plant-based-proteins/"},
      {label:"Industry Arc · pulse proteins market forecast (Jun 22, 2026)", url:"https://www.industryarc.com/PressRelease/4349/Pulse-Proteins-Market"}
    ]
  },
  {
    stat:"R16 on Jul 4",
    label:"the World Cup knockout round lands on the 250th cookout — one cooler has to feed the whole afternoon",
    detail:"The 2026 FIFA World Cup Round of 16 begins Saturday July 4 with knockout matches in Houston and Philadelphia, landing the tournament's most-watched phase directly on America's 250th cookout day — a sports-plus-patriotic-plus-grazing convergence where one long afternoon's spread has to carry both the grill crowd and the kids glued to the bracket. our move: ride the cooler, not the match — a kids' Chocolate pour beside an iced Barista coffee for the grown-ups, one carton family that handles the whole table. No sports-bro register, no halftime sugar bomb; the kitchen is the hero and the match stays blurred in the background.",
    color:"#A191B2",
    icon:"⚽",
    glyph:"⚽",
    kindLabel:"News Cycle",
    sources:[
      {label:"ESPN · 2026 FIFA World Cup schedule — knockout rounds (2026 reference)", url:"https://www.espn.com/soccer/story/_/id/48939282/2026-fifa-world-cup-fixtures-results-match-schedule-group-stage-knockout-rounds-bracket"}
    ]
  },
  {
    stat:"lowers LDL",
    label:"daily oats just got the clinical stamp — and most oat milks pour out the part that earns it",
    detail:"A June 2026 medical review confirms oat beta-glucan — the soluble fiber in whole oats — is documented in peer-reviewed research to lower LDL cholesterol when eaten daily, positioning oat-based products as functional heart tools, not just a taste swap. The same review flags the catch: most oat milk delivers only 2-4g protein per cup because the protein gets filtered out in processing — the same step that strips the fiber. our move: a calm keep-it-in explainer — Willa's uses the whole oat groat, so the beta-glucan AND the 4g+ protein stay in the cup. The part that's good for your heart is the part most oat milks pour down the drain; we just never filtered it out.",
    color:"#73B2C9",
    icon:"🫀",
    glyph:"🫀",
    kindLabel:"Health Signal",
    sources:[
      {label:"Northwestern Medicine · Is oat milk healthier than cow's milk? (Jun 21, 2026)", url:"https://www.nm.org/healthbeat/healthy-tips/nutrition/is-oat-milk-healthier-than-cows-milk"},
      {label:"Forum Health · fibermaxxing — why fiber is the 2026 trend (Jun 23, 2026)", url:"https://forumhealth.com/nutrition/fibermaxxing-the-2026-trend-worth-paying-attention-to/"}
    ]
  },
  {
    stat:"76% of kids",
    label:"most kids run short on the omega-3 their brains are built on — and most kids' drinks add zero",
    detail:"Peer-reviewed pediatric data shows roughly 76% of children globally don't get enough DHA, the omega-3 fatty acid critical for brain and eye development, with pediatricians recommending 250-500mg combined EPA+DHA daily from age one. As school cafeterias trim omega-3 sources, parents are reading labels for DHA-fortified options — a deficiency hiding in plain sight on the front of most kids' cartons. our move: not panic, relief — Willa's Kids builds the DHA in on purpose, from algae (no fish, no top-9 allergens), alongside 8g protein and a Yuka 100. The one spec worth checking on a kids' pour, answered by the carton that already has it.",
    color:"#9E652E",
    icon:"🧠",
    glyph:"🧠",
    kindLabel:"Parenting Signal",
    sources:[
      {label:"Omegor · omega-3 for children's cognitive abilities (peer-reviewed pediatric data, reference)", url:"https://www.omegor.com/en/blogs/omega-3-heart/omega-3-for-children-and-adolescents-supplements-with-450-mg-of-epa-and-dha-and-omega-3-index-of-6-are-needed-to-improve-cognitive-performance"},
      {label:"HealthyChildren.org (AAP) · Plant-Based Diets for Children (permanent reference)", url:"https://www.healthychildren.org/English/healthy-living/nutrition/Pages/Plant-Based-Diets.aspx"}
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
  "July 4 is America's 250th and the cookout's become a heritage table — how hard do we lean on the grandmother story without making it feel like we're forcing the patriotism?",
  "Beans and pulses are officially out-growing meat right now — what's the calmest way to say Willa's kept the protein AND fiber in without sounding like we're dunking on the whole shelf?",
  "The World Cup knockout round lands on the cookout this Saturday — how do we ride the long-afternoon cooler for the kids AND the grown-ups without slipping into a sports-bro register?",
  "Those 'just make your own oat milk' clips are everywhere — how do we honor the DIY instinct while gently pointing out the part the 30-second version strains away?"
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
