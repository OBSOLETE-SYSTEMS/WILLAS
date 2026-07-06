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
    trend:"Medicare's $50/month GLP-1 program goes live July 1 — millions more shoppers about to eat with a smaller appetite 💉",
    detail:"A new Medicare bridge program starting July 1, 2026 puts GLP-1 medications at about $50/month for nearly 4 million eligible beneficiaries, on top of the roughly 1-in-5 US households already using one. As appetites shrink, the food a person does eat has to carry more nutrition per bite — density beats volume, and filtered-out oat sugar doesn't cut it.",
    platform:"Health policy + nutrition press",
    views:"National GLP-1 access cycle",
    velocity:"high",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    healthSubAngle:"GLP-1",
    angle:"Smaller appetites mean every calorie counts. Make an Original Reel: the whole oat keeps real protein + fiber in the cup — nutrient-dense, not filtered-out sugar.",
    urgency:"RIDE NOW",
    sources:[
      {label:"CNBC · Medicare obesity-drug GLP-1 coverage starting July 1 (Jun 30, 2026)", url:"https://www.cnbc.com/2026/06/30/medicare-obesity-drug-glp-1-coverage-starting-july-1.html"},
      {label:"Science-Based Ingredients · Summer 2026 Trend Report (Jul 5, 2026)", url:"https://sciencebasedingredients.com/summer-2026-trend-report/"}
    ]
  },
  {
    id:"T-2",
    trend:"The EPA just reopened its glyphosate safety review — putting grain-residue scrutiny back on the table 🌾",
    detail:"The EPA confirmed in early July 2026 it is running a new draft risk assessment of glyphosate, targeting completion by year-end, following a retracted study and fresh litigation. The move reopens the residue question across grain and commodity sourcing — an authority window for a brand that already tests for it.",
    platform:"Policy + trade press",
    views:"Federal residue-review cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "REVIEWS/RECS"
    ],
    angle:"Regulators are reopening the glyphosate question. Make a calm authority Reel: certified glyphosate-free, tested every lot — the cert Willa's already holds while the debate restarts.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Daily Signal · EPA glyphosate safety review (Jul 1, 2026)", url:"https://www.dailysignal.com/2026/07/01/glyphosate-ban-epa-safety-review/"},
      {label:"USDA ERS · Oil Crops Outlook June 2026 (Jun 30, 2026)", url:"https://www.ers.usda.gov/publications/115031"}
    ]
  },
  {
    id:"T-3",
    trend:"Arabica just spiked 6.71% in a day as iced-coffee season peaks — the home café is suddenly the smart pour 🧊☕",
    detail:"Torrential rains in Brazil's Minas Gerais (nearly 2,000% above the weekly average) sent arabica futures up 6.71% on July 2 — the steepest one-day climb in four years — right as mid-summer iced-coffee demand peaks and cold brew heads toward a $1.75B market. The café upcharge keeps climbing; the at-home iced cup is where the value moved.",
    platform:"Commodity + beverage trade press",
    views:"Summer coffee-season cycle",
    velocity:"high",
    pillars:[
      "INGREDIENTS/RECIPES",
      "REVIEWS/RECS"
    ],
    angle:"Coffee prices are spiking and iced-coffee season peaks — the home café wins. Make a Barista Reel: the pour that makes the at-home iced cup worth it.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Perfect Daily Grind · Coffee News Recap (Jul 3, 2026)", url:"https://perfectdailygrind.com/2026/07/coffee-news-recap-3-july-2026/"},
      {label:"Tastewise · Summer Drink Trends 2026 (Jul 1, 2026)", url:"https://tastewise.io/blog/summer-drink-trends"}
    ]
  },
  {
    id:"T-4",
    trend:"Parents are quitting the macro-count — 'functional nutrition' is replacing the high-protein label chase 🍎",
    detail:"Baby-and-toddler nutrition coverage in early July 2026 shows parents moving past macro-counting toward bioavailable micronutrients, fiber and real sourcing — and a parallel shift toward low-pressure feeding (parent decides what's offered, child decides how much). 'High protein' as a headline is fading; recognizable, whole-food quality is the new bar.",
    platform:"Parenting + nutrition press",
    views:"Modern kids-nutrition cycle",
    velocity:"medium",
    pillars:[
      "PARENTING",
      "HEALTH/WELLNESS"
    ],
    angle:"Parents are done macro-counting — real, whole-food nutrition wins. Make a Kids Reel: organic, recognizable ingredients, nothing to tally — the pour that isn't a number to chase.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Ever & Ever Baby · How baby & toddler nutrition is changing in 2026 (Jul 1, 2026)", url:"https://everandeverbaby.com/blog/healthy-beginnings/modern-baby-nutrition-trends"},
      {label:"Dear Parents · This Week in Parenting (Jul 3, 2026)", url:"https://dearparents.substack.com/p/this-week-in-parenting-july-3-2026"}
    ]
  },
  {
    id:"T-5",
    trend:"Dairy-free crossed into fully mainstream — allergy-friendly is a $25B+ category and clean kids' pours are the norm 🥛",
    detail:"The food-allergy-and-intolerance category is valued north of $25B in 2026, and new clinical work shows most high-risk kids can tolerate baked milk after a supervised challenge — evidence the dairy-free shelf is a permanent fixture, not a niche. Allergen-aware, recognizable-ingredient pours are now the default parents expect.",
    platform:"Category research + pediatric press",
    views:"Dairy-free mainstreaming cycle",
    velocity:"medium",
    pillars:[
      "PARENTING",
      "REVIEWS/RECS"
    ],
    angle:"Dairy-free is mainstream now, not niche. Make a Kids Reel: top-9 allergen-free, the pour built for how families actually shop — no double-checking the box.",
    urgency:"BACKGROUND",
    sources:[
      {label:"HCPLive · Most high-risk kids with milk allergy tolerate baked milk (Jun 30, 2026)", url:"https://www.hcplive.com/view/most-high-risk-kids-with-milk-allergy-tolerate-baked-milk-after-oral-food-challenge"},
      {label:"Global Growth Insights · Food Allergy & Intolerance Products Market report (permanent reference)", url:"https://www.globalgrowthinsights.com/market-reports/food-allergy-and-intolerance-products-market-106081"}
    ]
  },
  {
    id:"T-6",
    trend:"New federal soil-health standards put crop sourcing under the microscope — traceability is the next differentiator 🌱",
    detail:"The Federal Register published technical guidelines on June 29, 2026 establishing science-backed criteria for regenerative crop production — soil health, biodiversity and supply-chain traceability — the same inputs that separate a climate-positive oat from a commodity one. Sourcing is becoming a claim shoppers can actually check.",
    platform:"Policy + agriculture press",
    views:"Regenerative-sourcing policy cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"New federal soil-health standards spotlight sourcing. Make an Original Reel — lead with the nutrition, back it with organic, climate-positive whole oats and zero food waste.",
    urgency:"BACKGROUND",
    sources:[
      {label:"Federal Register · Regenerative Agricultural Feedstock Guidelines (Jun 29, 2026)", url:"https://www.federalregister.gov/documents/2026/06/29/2026-13092/technical-guidelines-for-the-production-of-regenerative-agricultural-biofuel-feedstocks"},
      {label:"USDA ERS · Oil Crops Outlook June 2026 (Jun 30, 2026)", url:"https://www.ers.usda.gov/publications/115031"}
    ]
  },
  {
    id:"T-7",
    trend:"Summer sips are going 'functional' — adaptogens, protein and mushroom coffee are reshaping the seasonal menu 🍄",
    detail:"Mid-summer 2026 beverage menus are tilting functional: mushroom coffee is up more than 4x year-over-year, protein frappes and electrolyte sodas are surging, and dessert-and-floral flavors dominate seasonal lineups. The through-line is 'a drink that does something' — but most of it arrives as a powder stack, not real food.",
    platform:"Beverage trade press + menu data",
    views:"Functional-beverage summer cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"Summer sips are going functional — adaptogens, protein, mushrooms. Make an Original or Barista Reel: the real-food creamy base that beats a powder stack, no lab additives.",
    urgency:"BACKGROUND",
    sources:[
      {label:"Drink Ripples · Summer 2026 Coffee Trends (2026 reference)", url:"https://www.drinkripples.com/blog/summer-coffee-trends/"},
      {label:"Science-Based Ingredients · Summer 2026 Trend Report (Jul 5, 2026)", url:"https://sciencebasedingredients.com/summer-2026-trend-report/"}
    ]
  },
  {
    id:"T-8",
    trend:"Food creators are going live — Food Network stars hit TikTok LIVE and the platform named its 2026 class 📱",
    detail:"TikTok LIVE cooking streams with Food Network talent launched July 1, 2026 alongside TikTok's list of ten food creators to watch this year — signaling that real-time, creator-fronted cooking is the format the platform is pushing next. It's an open lane for a brand willing to show a pour being made, live and unpolished.",
    platform:"Platform + creator trade press",
    views:"Creator-economy platform cycle",
    velocity:"medium",
    pillars:[
      "REVIEWS/RECS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"Food creators are going live and TikTok's naming its 2026 class. Make a creator-collab or real-time recipe Reel — ride the live-cooking format with a Willa's pour.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Tubefilter · Food Network stars on TikTok LIVE (Jul 1, 2026)", url:"https://www.tubefilter.com/2026/07/01/tiktok-live-food-network-cooking-stream/"},
      {label:"TikTok · Food Trends 2026 discovery page (permanent reference)", url:"https://www.tiktok.com/discover/food-trends-2026"}
    ]
  },
  {
    id:"T-9",
    trend:"The FDA settled the plant-milk 'milk' question — now the aisle competes on what's actually in the cup 🥤",
    detail:"New FDA draft guidance (late June 2026) confirms plant-based drinks can keep the 'milk' name while nudging brands toward voluntary nutrient-comparison statements. With the naming fight over, the next battleground is nutrition per cup — where keeping the protein and fiber in, instead of filtering them out, is the real edge.",
    platform:"Policy + trade press",
    views:"Plant-milk labeling cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"With the plant-milk naming settled, the aisle now competes on what's in the cup. Make an Original Reel: the whole oat keeps the protein + fiber most filter out.",
    urgency:"BACKGROUND",
    sources:[
      {label:"FDA · Draft labeling guidance for plant-based milk alternatives (permanent reference)", url:"https://www.fda.gov/news-events/press-announcements/fda-provides-draft-labeling-recommendations-plant-based-milk-alternatives-inform-consumers"},
      {label:"National Agricultural Law Center · Alternative proteins legislative tracker (rolling reference)", url:"https://nationalaglawcenter.org/alternative-proteins-2025-legislative-update/"}
    ]
  },
  {
    id:"T-10",
    trend:"Clean-label kids' snacks are winning Costco shelf space — mainstream shoppers now want the transparent-ingredient pick 🛒",
    detail:"Costco's July 2026 new-product drop leans hard into parent-targeted clean-label snacks — dairy-free, nut-free, zero-added-sugar melt bites and prebiotic-fiber smoothies — evidence that transparent-ingredient demand has moved from the natural aisle to the warehouse floor. 'What I feed my kids' is now a mass-market buying filter.",
    platform:"Retail + platform-search data",
    views:"Clean-label retail cycle",
    velocity:"medium",
    pillars:[
      "PARENTING",
      "REVIEWS/RECS"
    ],
    angle:"Clean-label kids' snacks are winning Costco shelf space — mainstream wants transparent ingredients. Make a Kids Reel: the recognizable-ingredient pour parents are already reaching for.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Parade · The 15 best Costco finds, July 2026 (Jul 1, 2026)", url:"https://parade.com/food/best-costco-finds-july-2026"},
      {label:"Ever & Ever Baby · How baby & toddler nutrition is changing in 2026 (Jul 1, 2026)", url:"https://everandeverbaby.com/blog/healthy-beginnings/modern-baby-nutrition-trends"}
    ]
  }
];



const TICKER = [
  {agent:"trend", text:"logged Medicare's $50/month GLP-1 bridge going live July 1 — answered with \"eating less doesn't mean getting less,\" the whole oat keeping real protein and fiber in the cup so every pour earns its spot."},
  {agent:"pulse", text:"caught the build-then-drop reveal eating the FYP — built the slow pour and dropped on the beat to \"the four-ingredient back label,\" the short list as the payload, format doing the reach."},
  {agent:"trend", text:"flagged the EPA reopening its glyphosate review as an authority window — countered with \"our answer's already on the label,\" certified glyphosate-free, tested every lot, the receipt leading, the news as the why."},
  {agent:"pulse", text:"rebuilt FoodTok's proffee dairy-free — \"proffee, minus the chalk,\" cold brew plus Willa's Kids for 8g protein and a creamy swirl, no chalky powder, the swap nobody on the FYP made yet."},
  {agent:"trend", text:"watched arabica spike 6.71% in a day as iced-coffee season peaks — moved the café home with \"the home iced coffee just became the savvy one,\" Barista, 50% less sugar, no rapeseed."},
  {agent:"pulse", text:"rode the World Cup hydration-break storyline off the match — \"the refuel shouldn't be sugar and dye,\" a creamy real-food Kids pour after the heat, kid-athlete, no watch-party framing."},
  {agent:"composer", text:"answered the milk-aisle protein-math with \"real food in a carton, not a number to chase\" — Willa's Kids, 8g protein, recognizable ingredients, Yuka 100, the pour a parent can stop tallying."},
  {agent:"pulse", text:"corrected the 'natural Ozempic' clips calmly — \"no pour replaces the medication, but food that actually fills you up? that part's real,\" whole oat, protein and fiber, 1g sugar, aunt-at-the-table not the dunk."},
  {agent:"editor", text:"claimed the homestead-kitchen mood off the Netflix moment with \"the from-scratch kitchen isn't a trend to us — it's the recipe grandmother Willa passed down,\" heritage warmth, no irony required."},
  {agent:"composer", text:"made the no-cook heat-wave move with \"when it's too hot to cook, the creamy still comes from a bottle\" — a Willa's Original tahini-lemon drizzle over the viral chickpea salad, zero stove, real-food creamy."},
  {agent:"comp", text:"watched a peer turn a fan's meme into a sold-out capsule — countered with \"you left the comment, we made it the moment,\" a real customer line elevated, creativity over couponing, no coupon required."},
  {agent:"composer", text:"answered the food-freedom conversation with \"no good-food, bad-food math at this table\" — breakfast poured without a second thought, the carton that was never a good-vs-bad decision."}
];


const COMPETITORS = [
  {
    id:"C-1",
    name:"Oatly",
    color:"#1F6F54",
    status:"Oatly's 2026 range now spans barista editions, ready-to-drink iced coffees, low-sedimentation Baristamatic, oatgurt and ice cream — a format-diversification play visible across its full product line as it leans into the summer coffee ritual.",
    direction:"up",
    opportunity:"Counter format-sprawl with focus — a Barista iced-coffee moment that wins on the back label: no rapeseed, no gums, 50% less sugar than other barista oat milks.",
    sources:[
      {label:"Oatly.com · all products landing page (permanent reference)", url:"https://www.oatly.com/products"}
    ]
  },
  {
    id:"C-2",
    name:"Graza",
    color:"#8FAE3C",
    status:"Graza turned a fan's viral 'bad hair day' meme into a limited Olive Oil Girl bottle capsule (Jul 1) — seeded to creators, zero paid, sold out on pre-order in about 72 hours — proving design-led fan moments outrun discounting.",
    direction:"up",
    opportunity:"Borrow the fan-meme-into-moment move — turn a real Willa's customer comment into a limited label or drop. Creativity over couponing.",
    sources:[
      {label:"Fast Company / TikTok · Graza Olive Oil Girl capsule (Jul 1, 2026)", url:"https://www.tiktok.com/@fastcompany/video/7229378595234254123"}
    ]
  },
  {
    id:"C-3",
    name:"Poppi",
    color:"#E24A8B",
    status:"Poppi shipped a limited Spider-Man box design ahead of the film's release (Jun 29), pairing an IP tie-in with a Prime Day push to trigger user unboxings — culture-timed packaging as the growth lever.",
    direction:"up",
    opportunity:"Willa's owns a story no license can buy — lead the summer with grandmother-Willa origin, not a borrowed character. Heritage is the built-in IP.",
    sources:[
      {label:"Poppi · limited-edition release announcement, Instagram (Jun 29, 2026)", url:"https://www.instagram.com/drinkpoppi/"}
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
    id:"JUL06-TT-1",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Wed Jul 8 · 10am",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"the beat drops — and so does the four-ingredient back label.\" — build-then-drop label reveal",
    intel:[
      {type:"PULSE", text:"TikTok's build-tension-then-drop reveal format is eating the FYP (CP-3) — creators build anticipation through a slow intro, then cut hard on the beat drop to the transformation or reveal. Willa's rides it clean: a slow pour builds through the intro, then the drop cuts to the carton's back label landing the shortest ingredient list in the aisle — organic whole oats, filtered water, organic vanilla, sea salt. The whole oat groat (bran + germ, not oat syrup) is the move, named in the drop. The format has a built-in retention beat, so it holds the scroll while the label does the brand work."},
      {type:"AUDIENCE", text:"FoodTok scrolls fast, and the build-then-drop structure is a retention machine — viewers stay through the tension to catch the payoff, which is exactly where the four-line proof point and the creamy pour land together. Beats healthier AND delicious in one frame: the reveal is a clean label, but the visual is a rich, thick, whole-oat pour that reads as taste, not restriction. No talent, no explainer — just hands, product, and the drop."},
      {type:"COMPETITOR", text:"Internal only: most oat milks filter out both the bran AND germ, then process the starch into sugar — the exact protein + fiber the 'what's actually in the cup' story (T-9) and the GLP-1 nutrient-density wave (T-1) both reward. Never name a competitor on the surface; let the frozen four-line label be the whole contrast."}
    ],
    hooks:[
      {text:"wait for the drop — that's when the label gives itself away.", recommended:true},
      {text:"the beat drops on the shortest ingredient list in the aisle.", recommended:false},
      {text:"POV: beat drops — four ingredients, nothing to hide.", recommended:false}
    ],
    caption:"Willa's Original is the whole plant milk — four real ingredients, and it pours rich, smooth and creamy. 🥛\n\nHere's what the drop lands on: the whole entire oat groat (bran, germ and all), not oat syrup. Most oat milks filter out both the protein AND the fiber, then process the starch into sugar. We keep the good stuff in — which is exactly why it tastes like more, not less.\n\nWhat's actually in the cup:\n• 1g sugar (from the oats, nothing added)\n• 4g+ protein\n• 2g+ prebiotic fiber (the gut-supporting fiber in whole oats)\n• 4 real ingredients, no isolates, no gums\n\nOrganic whole grain oats. Filtered water. Organic vanilla extract. Sea salt. That's the whole list. 📋\n\nUSDA Organic. Non-GMO. Certified glyphosate-free — tested every lot. The label that reads better the longer you look.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#wholeplant",
      "#cleaningredients",
      "#labelcheck",
      "#4ingredients",
      "#dairyfree",
      "#fyp",
      "#foodtok",
      "#beatdrop"
    ],
    visual:"Bright, high-saturation kitchen on a clean white-and-green counter, hard summer daylight, patient build then a hard-cut payoff synced to a trending build-then-drop track. Open slow and deliberate — a single unbroken pour of Willa's Original into a frosty glass, creamy thick whole-oat body, condensation beading, the tension stretching as the audio climbs (carton holds 40%+ of frame, label kept turned away for now). On the beat DROP, hard cut — snap to the carton's back label in razor focus, the four-ingredient list stinging in one line at a time as a bold typographic card. Then a tight receipts sequence and an overhead of the four real ingredients laid out — oats in a small bowl, filtered water, organic vanilla bottle, pinch of sea salt — carton beside them. Trend-forward, playful, hands-and-product only, no talent on camera.",
    script:[
      {scene:"HOOK / BUILD", time:"0-4s", action:"Slow, deliberate open: hands tilt the Willa's Original carton and start a single unbroken pour into a frosty glass, creamy thick stream, camera easing in. Bright green-and-white backdrop. Text overlay (bold, top): 'wait for the drop — that's when the label gives itself away.' Audio: trending build-then-drop track climbing, tension rising."},
      {scene:"THE TENSION", time:"4-8s", action:"Pour continues, slow-zoom tightening on the glass, condensation beading, carton still turned away from camera. Micro-anticipation cuts on the rising beat — glass filling, cream swirling — holding the viewer for the drop. No new overlay; let the format's build carry. Camera pushes in."},
      {scene:"THE DROP", time:"8-11s", action:"On the beat DROP, hard cut — snap to the carton's back label in razor focus, 40%+ of frame. Overlay stings in one line at a time, fast: 'whole oat groat — bran, germ and all.' Then: 'not oat syrup.' The creamy pour resolves underneath."},
      {scene:"THE PAYLOAD", time:"11-15s", action:"Tight on the glass + label. Overlay stings the receipts one line at a time: '1g sugar · 4g+ protein · 2g+ fiber.' Then: '4 real ingredients. no isolates. no gums.' A quick condensation drip on the glass for texture — reads rich, not clinical."},
      {scene:"THE LIST", time:"15-19s", action:"Overhead match-cut to the four real ingredients arranged clean: oats in a bowl, filtered water, organic vanilla bottle, pinch of sea salt. Bold typographic overlay lists them one at a time. Hand slides the carton into frame beside them."},
      {scene:"END CARD", time:"19-22s", action:"Snap to the carton alone on the bright counter, frosty glass beside it. End-card text: 'the label that reads better the longer the frame holds.' Small tag: 'Willa's Original · the whole plant milk.' Audio resolves out."}
    ],
    audio:"A trending build-then-drop TikTok track — cut so the deliberate beat drop lands the hard cut to the back label. Warm narrative voiceover kept minimal (let the format carry); VO lands only the stinger on the drop: 'the oat milk with nothing to hide.' Fast cuts snap to the drop, patient build before it.",
    duration:"15-25 seconds",
    cta:{soft:"hold the frame on your oat milk's label — what does it say? 👀", medium:"the back label that reads green before you flip it — that's the move.", strong:"grab the four-ingredient one at willaskitchen.com 🥛"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUL06-IG-R1",
    platform:"Instagram Reel",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Wed Jul 8 · 12pm",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"eating less doesn't mean getting less.\" — whole-oat density Reel",
    intel:[
      {type:"TREND", text:"T-1: Medicare's $50/month GLP-1 bridge program went live July 1 (CNBC, Jun 30, 2026), putting appetite-shrinking medications in reach of nearly 4M more people on top of the ~1-in-5 households already using one. As appetites shrink, density-per-bite becomes the whole game — and the Summer 2026 trend read (Science-Based Ingredients, Jul 5, 2026) names nutrient-per-calorie as the season's headline. This is a World-Context Tie-In: the GLP-1 news is the backdrop, not the pitch. Lead with the solution — the whole oat keeps real protein + fiber in the cup — and let the moment make it relevant. Pairs with the food-freedom register of the 'butter mom' conversation (CP-5): abundance and honesty, never restriction-shaming."},
      {type:"AUDIENCE", text:"Willa's core shopper — and a fast-growing slice of the July feed — is now eating with a smaller appetite and quietly auditing what earns space in the cup. She's not looking for a diet lecture; she's looking for food that does more with less. This Reel hands her one honest answer: when you eat less, every pour has to carry more, so pick the one that didn't filter its best parts out. No before/after body framing, no 'shrink yourself' energy — just density as generosity."},
      {type:"COMPETITOR", text:"Internal (C-1): most of the oat-milk shelf filters out the bran + germ — stripping the protein and fiber — and processes the starch into sugar, exactly the wrong build for a shopper who now needs every calorie to count. Willa's keeps the whole entire oat, so the protein and fiber stay in. Keep the surface to 'nothing filtered out' — never name Oatly or any competitor, never frame as a comparison piece."}
    ],
    hooks:[
      {text:"if you're eating less this summer, every pour has to earn its spot in the cup.", recommended:true},
      {text:"smaller appetite? every pour has to carry more. Willa's keeps the whole oat — protein + fiber in, nothing filtered out.", recommended:false},
      {text:"when you eat less, density beats volume. one pour: real protein + fiber, 1g sugar, nothing stripped.", recommended:false}
    ],
    caption:"Eating less doesn't mean getting less.\n\nWilla's keeps the whole entire oat — so the protein and fiber stay in, not get filtered down to sugar like most oat milks. 1g sugar · 4g+ protein · 2g+ prebiotic fiber · 4 ingredients. That's what density looks like.\n\nWith Medicare's new coverage bringing GLP-1 medications — the appetite-shrinking shots like Ozempic — to millions more this July, a lot of people are simply eating less. Which means what makes it into the cup has to carry more. That's exactly when it matters what's in the pour.\n\nEvery pour:\n· Willa's Original Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup 🥛\n· 1g sugar · 4g+ protein · 2g+ prebiotic fiber · 4 ingredients\n· Organic. Certified glyphosate-free, tested every lot. Nothing filtered out.\n\nNo rules, no guilt — just real food that pulls its weight. Make each pour count.\n\nNourish the spark in everyone.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#wholeoat",
      "#glp1",
      "#nutrientdense",
      "#proteinandfiber",
      "#organicoatmilk",
      "#dairyfree",
      "#1gsugar",
      "#realfood"
    ],
    visual:"Clean, bright, modern-wellness — cool daylight, a calm kitchen counter, lots of white and soft blue (#73B2C9 accents). NO talent on camera (default Christina Rule — this is not the reserved heritage beat): hands + product + the pour do all the work. HERO: a single Willa's Original carton, on screen 40%+ throughout. Open on a slow, satisfying cold pour into a clear glass over ice — condensation, a beautiful creamy stream, unhurried. The 'context' beat lets a calm on-screen line acknowledge the GLP-1 news as backdrop while the pour continues — never a chart, never medical imagery, just a text line and the glass. For the whole-oat proof, a quick tactile insert: whole oats in the hand vs. a fine processed powder sifting away, natural light, no lab or clinical staging. Text overlays in friendly sans, navy ink (#202A44) on cream, one clean stat build. Absolutely no body-transformation imagery, no scales, no 'before/after' — density is framed as generosity, not shrinking. Lofi, confident, unhurried pacing.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Tight, satisfying close-up: a single Willa's Original carton pours a creamy cold stream into a clear glass over ice, condensation beading, cool daylight. Text overlay fades in on the beat: 'eating less this summer?' Carton clearly in frame."},
      {scene:"WORLD-CONTEXT", time:"3-7s", action:"Pour continues, camera drifts slightly wider. Calm text overlay lands the World-Context Tie-In as backdrop, not pitch: 'with GLP-1 access opening up July 1, a lot more people are eating less…' Then a beat: 'so every pour has to earn its spot.' No charts, no medical imagery — just the glass and the line."},
      {scene:"THE-STRIP", time:"7-11s", action:"Tactile insert: whole oats cupped in a hand, then a fine processed powder sifting away between fingers in the light. Text overlay: 'most oat milks strip out the protein + fiber — what's left is sugar.' Willa's carton stays in soft focus behind."},
      {scene:"THE-SOLUTION", time:"11-16s", action:"Back to the full glass, Willa's Original poured slow, creamy and rich. Whole oats + the carton in frame. Stat overlay builds clean: '1g sugar · 4g+ protein · 2g+ prebiotic fiber · whole oat, nothing filtered out.' Carton holds 40%+ of frame."},
      {scene:"END CARD", time:"16-22s", action:"Settle on the finished glass beside the carton, oats in soft focus, cool light. End-card stinger animates: 'when every bite counts more — make each pour count.' Small Willa's logo lower-third. Tagline: 'Nourish the spark in everyone.'"}
    ],
    audio:"Text-forward — no founder talking head (default Christina Rule; Christina is not on camera and is not framed as a mom). Optional calm, warm non-identified voiceover reading only the solution line ('eating less doesn't mean getting less') over the pour, never a hard sell. Modern-wellness instrumental bed: soft keys + a light, steady pulse, low and confident, the pace of an unhurried morning. Non-preachy, non-clinical — the calm is the point.",
    duration:"15-25 seconds",
    cta:{soft:"make each pour count — the whole oat keeps the good parts in.", medium:"eating less? pick the pour that didn't filter its protein and fiber out.", strong:"swap in Willa's Original — 1g sugar, 4g+ protein, whole oat, nothing filtered out."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUL06-PIN-1",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"viral-recipe-remix",
    timing:"Wed Jul 8 · 2pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the drink of the summer isn't a coffee.\" — tropical cooler recipe pin",
    intel:[
      {type:"PULSE", text:"Coconut-lime coolers are up around 70% year-over-year as summer 2026's tropical, no-coffee sip — coconut water, citrus and a creamy element over ice (CP-9). Most builds reach for canned coconut cream and land sugary; the open lane is a creamy build that gets its body from a splash of oat milk instead. Willa's answer leads with the benefit: the whole oat groat (bran, germ, and all — like steel-cut oats) gives that silky body with far less sugar — 4 ingredients, 1g sugar, real protein and fiber per cup, and no syrup needed to make it taste like a treat."},
      {type:"AUDIENCE", text:"Pinterest savers are building a summer-drink board and searching 'dairy-free coconut cooler' to recreate the tropical sip at home — they want a grab-and-go pin with a real ingredient list they can screenshot and pour into a travel tumbler for the dock, the pool or the drive. The pour has to read as the creamy trick, not a vague 'add oat milk' note, and it has to survive a cooler with ice."},
      {type:"COMPETITOR", text:"Internal: the biggest oat name is sprawling into the summer coffee ritual — RTD iced coffees, barista editions, a Baristamatic (C-1) — chasing the café lane. The move here is to own the drink coffee can't touch: a no-coffee tropical cooler that wins on the back label, creamy without the sugar. Never name them."}
    ],
    hooks:[
      {text:"let's make a coconut cooler", recommended:true},
      {text:"the tropical summer sip that skips the coffee line", recommended:false},
      {text:"creamy coconut cooler, zero syrup, zero dairy", recommended:false}
    ],
    caption:"The drink of the summer isn't a coffee. ☀️🥥 This creamy coconut cooler is coconut water, fresh lime and a splash of Willa's Original over a full cup of ice — tropical, refreshing, and dairy-free, with none of the sugar a canned coconut cream would sneak in. Willa's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 That whole-oat body is the whole trick — it gives the cooler a creamy swirl without any syrup, so it pours into a travel tumbler and heads straight out the door.\n\nIngredients\n- 1 cup coconut water\n- 1/3 cup Willa's Organic Oat Milk\n- juice of 1/2 lime (plus a wheel to garnish)\n- 1 cup ice\n- optional: a few fresh mint leaves, splash of pineapple juice\n\nBuild it: fill a tumbler with ice, pour in the coconut water, add the lime juice, then float the Willa's Original on top for the creamy swirl. Stir, lid on, go.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#coconutcooler",
      "#dairyfreedrinks",
      "#summerdrinks",
      "#dairyfree",
      "#nocoffee",
      "#labelcheck",
      "#organicoats",
      "#realfood"
    ],
    visual:"Bright overhead-to-45° shot on a sunlit linen-and-light-wood surface with warm midday light and a hint of poolside/dock energy — airy, tropical, trend-forward (no muted brand-kitchen stock). The hero is a clear travel tumbler packed with ice, a pale, creamy-clouded coconut cooler mid-swirl where the Willa's Original ribbons down through the coconut water, a fresh lime wheel on the rim, a couple of mint leaves, condensation beading on the cup. A reusable straw is in and a lid rests beside it — the pin has to read grab-and-go (Pattern 08 portability): the drink is built to travel. Staged DELIBERATELY in frame beside the tumbler — competing for the shot, not losing to it — is the Willa's Original carton standing upright, label facing camera, with a small measuring glass of oat milk mid-pour into the cup, so the carton + pour occupy 40%+ of the frame and read as the source of the creaminess. A hand drifts in at the top of frame capping the tumbler or squeezing the lime (Pattern 09 aesthetic-IRL). Color story: coconut-white swirl, lime green, oat-tan carton, creamy pour, bright sun. Crisp lower-third text overlay, clean sans: 'pour it in the tumbler, straw in, out the door.' Pinterest-native 2:3 vertical crop, screenshot-able, zero clinical infographic energy.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this to your summer-drinks board", medium:"build one for the cooler and skip the coffee line", strong:"grab Willa's Original and pour the creamiest coconut cooler — no syrup, no dairy"},
    benefitShorthandId:"whole-oat-body"
  },
  {
    id:"JUL06-TT-2",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Thu Jul 9 · 10am",
    priority:"HIGH",
    rideNow:false,
    concept:"\"no pour replaces the medication. but food that actually fills you up? that part's real.\" — calm ozempic-myth correction",
    intel:[
      {type:"PULSE", text:"As GLP-1 headlines flood the news (Medicare's $50/month access went live Jul 1 — T-1), the 'drink this instead of Ozempic' clips are resurfacing: DIY 'natural Ozempic' videos promising a soaked-oat shake replaces the medication (CP-4). Lead with the Willa's answer, not the dunk — no pour is a weight-loss shortcut, but Willa's Original is real food that actually fills you up: whole oat, 4g+ protein, 2g+ fiber, 1g sugar. The clip is the backdrop; the honest correction is the hook. Apolitical, non-preachy — the instinct toward filling real food is RIGHT, only the drug-mimic claim is wrong."},
      {type:"AUDIENCE", text:"Willa's buyers are label-readers who scroll past the 'oatzempic' clips half-believing — they want food that keeps them full, and the shortcut is seductive precisely because the instinct behind it is good. The correction has to honor that instinct, not shame anyone who tried it. They screenshot the calm, matter-of-fact version (no pour is magic, but real food that fills you up is the honest move) and send it to the friend deep in the natural-Ozempic rabbit hole — never the lecture."},
      {type:"COMPETITOR", text:"Internal: the functional-beverage lane is racing to sell 'a drink that does something' as a powder stack — protein isolates, appetite-suppressant shakes, mushroom-adaptogen blends riding the same GLP-1 wave (T-7 context). Never name them. The contrast Willa's owns is real food over a lab promise: the whole oat groat kept in — bran, germ, and all, organic + glyphosate-free — carrying real protein + prebiotic fiber, not an additive stack marketed as a shortcut. Category-level framing only."}
    ],
    hooks:[
      {text:"no drink is a weight-loss shortcut. but food that actually fills you up? that part's real.", recommended:true},
      {text:"the 'natural Ozempic' clips have good instincts and bad science. here's the honest version.", recommended:false},
      {text:"your oat milk isn't Ozempic. it's just real food that happens to keep you full.", recommended:false}
    ],
    caption:"Willa's Original is real food that actually fills you up — 4g+ protein, 2g+ prebiotic fiber (the kind that supports gut health), 1g sugar, 4 ingredients. No pour is a weight-loss shortcut, and we'd never sell you one.\n\nHere's the honest version: the 'drink this instead of Ozempic' clips — the wave of DIY 'natural Ozempic' videos riding the weight-loss-drug headlines — get one thing right. The instinct toward real, filling food is good. The claim that a soaked-oat shake mimics the medication (the drug that tells your body it's full) is the part that isn't true.\n\nSo skip the shortcut. Real food that keeps you satisfied is the move that actually holds up: the whole oat groat kept in — bran, germ, and all — so the protein AND the fiber stay in the cup. Most oat milks filter out both, then process the starch into sugar. We don't.\n\nOrganic. Non-GMO. Certified glyphosate-free. WBENC women-owned.\n\nNo pour replaces the medication. But food that actually fills you up? That part's real.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#oatzempic",
      "#glp1",
      "#realfood",
      "#wholeoat",
      "#cleanlabel",
      "#proteinandfiber",
      "#labelcheck",
      "#organicoatmilk"
    ],
    visual:"Bright, daylight-flooded kitchen counter, no talent on camera — hands + product + text overlays carry it. Open on a dramatized 'natural Ozempic' build the clips are pushing: hands drop oats + lime + water into a glass, stir, hold it up like a promise. Shoot it a touch skeptical, calm not mocking. Then a hard cut, brighter frame: a hand sets the murky glass aside and reaches for the Willa's Original carton, label to camera, 'organic' legible. Slow, smooth pour of Willa's Original over ice in a clean glass — creamy, full-bodied, the opposite of the gritty shortcut. Carton stays in frame 40%+ of the runtime, 4-ingredient list readable. Color temperature warm and crisp, high-key. Text overlays in clean sans, lowercase, navy on cream. End on the carton beside the glass in morning light. The cut from murky-DIY-shot to full creamy pour IS the argument — let the contrast do the talking, never shame the person who tried the shot.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Tight, slightly handheld: hands drop oats + lime + water into a glass and stir it murky. Text overlay (lowercase, navy on cream): 'the drink this instead of ozempic clips are back.' Calm, matter-of-fact energy — the taboo topic treated plainly, not mocked."},
      {scene:"TURN", time:"3-8s", action:"Beat, then text overlay swaps: 'no drink replaces the medication.' A hand calmly sets the murky glass aside. Overlay adds: 'but the instinct toward real, filling food? that part's right.' Warm authority — the aunt at the table who agrees with you first."},
      {scene:"SOLUTION", time:"8-13s", action:"Hard cut, brighter frame: hand reaches for the Willa's Original carton, label to camera, 'organic' legible, fills 40%+ of frame. Text overlay: 'real food that actually fills you up.' Then, one line: 'whole oat — protein + fiber kept in.'"},
      {scene:"PROOF", time:"13-19s", action:"Slow, smooth pour of Willa's Original over ice in a clean glass — creamy, full-bodied. Overlay stacks the receipts one line at a time: '4g+ protein' · '2g+ prebiotic fiber' · '1g sugar' · '4 ingredients.' Then a gloss line: 'organic. glyphosate-free. no shortcut sold here.'"},
      {scene:"PAYOFF", time:"19-24s", action:"End card: carton beside the finished glass in warm morning light, 4-ingredient label readable. Benefit-shorthand stinger overlay: 'no pour replaces the medication. but food that fills you up? that part's real.' Small navy wordmark lower corner. Hold on the clean still."}
    ],
    audio:"Warm narrative voiceover, dry and calm — the aunt at the kitchen table who agrees with your instinct first, then gently fills in the science. Never preachy, never a dunk, never shaming anyone who tried the shot. Lo-fi, unhurried beat underneath that dips slightly on the murky-glass beat and lifts on the full creamy pour, so the audio mirrors the visual turn. VO roughly matches the on-screen text and lands the 'that part's real' beat with a knowing pause.",
    duration:"15-25 seconds",
    cta:{soft:"real food that keeps you full. no shortcut required.", medium:"skip the natural-Ozempic shot — pour Willa's Original instead.", strong:"find Willa's Original at willaskitchen.com — real food that actually fills you up: 4g+ protein, 2g+ fiber, 1g sugar."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUL06-IG-R2",
    platform:"Instagram Reel",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Thu Jul 9 · 12pm",
    priority:"BIG SWING",
    rideNow:false,
    concept:"\"the glyphosate debate is reopening — our answer's already on the label.\" — glyphosate-free cert receipt",
    intel:[
      {type:"TREND", text:"The EPA confirmed in early July 2026 it's running a fresh draft risk assessment of glyphosate, targeting a year-end finish, reopening the grain-residue question across commodity sourcing (T-2). Lead with Willa's answer: Willa's Original is Certified Glyphosate Residue Free (Detox Project), tested every lot — a cert already held while the review restarts. The news is the backdrop; the seal on the carton is the headline. Show the label, not the policy."},
      {type:"AUDIENCE", text:"The label-checking shopper sees 'glyphosate' back in the headlines and feels the familiar low-grade dread — is my food fine, and how would I even know? The win here is calm authority, not alarm: a residue cert is something a brand earns in a lab, lot by lot, not a claim it slaps on a box. Give the reader a place to point when the question comes up — sourcing they can actually check, already done."},
      {type:"COMPETITOR", text:"Internal: grain and commodity oats are exactly the sourcing under fresh federal scrutiny, and the average oat milk carries no lot-level glyphosate testing — it's a claim most simply don't make. Willa's holds the Detox Project 'Certified Glyphosate Residue Free' cert and tests every lot. Never name a competitor on the surface; contrast stays 'vs. the average oat milk,' and the cert seal does the talking."}
    ],
    hooks:[
      {text:"regulators just reopened the glyphosate question. this label already answered it.", recommended:true},
      {text:"a residue cert isn't a claim you make. it's one you earn — lot by lot.", recommended:false},
      {text:"there's a word back in the news this July. our label has the certified answer.", recommended:false}
    ],
    caption:"Willa's Original is Certified Glyphosate Residue Free — tested every single lot, by the Detox Project (the lab that runs third-party, lot-level residue certification). 🌾 Not \"we're pretty sure it's clean.\" Tested. Documented. On the label long before the news cycle came back around.\n\nThe glyphosate question landed back on the regulators' desk in early July 2026 — a fresh federal review of the residue that rides along with commodity grain. Good time to check what's actually been done about it. And a residue cert isn't a claim you make; it's one you earn, lot by lot, in a lab.\n\nWilla's Original keeps it simple where it counts: 4 ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber (the kind that feeds gut health), 1g sugar. The whole oat groat, bran and germ and all. Sourcing you can actually check. 🥛\n\nThe glyphosate debate is reopening — our answer's already on the label.\n\nUSDA Organic · Non-GMO · Certified Glyphosate Residue Free · Kosher · Vegan · WBENC · Zero Food Waste · 4g+ protein · 2g+ fiber · 1g sugar",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#glyphosatefree",
      "#cleanlabel",
      "#organic",
      "#realfood",
      "#labelcheck",
      "#detoxproject",
      "#wholeoat",
      "#knowyourfood"
    ],
    visual:"Bright, sun-washed kitchen, warm wood + cream tones, lots of natural light and quick hands-in-frame movement — no talent's face. Open on a counter where a folded newspaper / phone shows a plain glyphosate-review headline; a hand calmly slides the Willa's Original carton on top, covering it. Cut to a slow push-in on the BACK of the carton — a finger lands squarely on the 'Certified Glyphosate Residue Free' seal, holding it in frame. Then a clean overhead: the carton with cert seals animating as on-screen check ticks (Certified Glyphosate Residue Free ✓ · Tested every lot ✓ · USDA Organic ✓ · Non-GMO ✓). A few raw oat groats spilled beside the 4-line ingredient list, finger tracing. Carton holds frame 40%+ throughout — a slow creamy pour into a clear glass, condensation catching light, the whole-oat body visible. Trend-forward, not stock-photo; quick warm cuts, lofi grade. End card on a clean cream background with the carton and the cert stinger.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Sunlit counter, overhead. A folded newspaper / phone shows a plain 'EPA reopens glyphosate review' headline; a calm hand slides the Willa's Original carton on top of it. Text overlay (bold, top): 'the glyphosate question is back on the regulators' desk.' Quick soft whip-cut."},
      {scene:"SETUP", time:"3-8s", action:"Slow push-in on the BACK of the carton. A finger lands on the 'Certified Glyphosate Residue Free' seal and holds. Text overlay: 'this label already answered it.' Calm, matter-of-fact pacing — authority, not alarm."},
      {scene:"CHECKLIST", time:"8-14s", action:"Clean overhead of the carton, cert seals animate as on-screen ticks appear one by one: 'Certified Glyphosate Residue Free ✓  ·  Tested every lot ✓  ·  USDA Organic ✓  ·  Non-GMO ✓.' Text overlay (plain, dry): 'not a claim you make. one you earn — lot by lot.'"},
      {scene:"PROOF", time:"14-19s", action:"A few raw oat groats spilled beside the carton's 4-line ingredient list, finger tracing it; cut to a slow creamy pour into a clear glass, condensation, light through the whole-oat body. Text overlay: '4 ingredients. whole oat, bran and germ. sourcing you can check.'"},
      {scene:"END CARD", time:"19-23s", action:"Cream background, Willa's Original carton centered. Stinger text resolves: 'certified glyphosate-free. tested every lot.' Logo lockup fades up. End on the carton, still."}
    ],
    audio:"Warm narrative voiceover over a lofi, gentle kitchen beat. VO leads with the reassurance, calm and dry: 'the glyphosate question is back in the news this July. here's the thing about a residue cert — you don't get to just say it. you earn it, lot by lot, in a lab. Willa's Original has been certified glyphosate residue free the whole time. four ingredients, organic whole oat, sourcing you can actually check.' Conversational, matter-of-fact authority — like an aunt at the kitchen table settling the question, not a lecture. Soft ambient kitchen sound (pour, glass set down) under the music.",
    duration:"20-23 seconds",
    cta:{soft:"save this for the next time glyphosate hits your feed.", medium:"tap to see the certs on the back of Willa's Original.", strong:"find Willa's Original — certified glyphosate-free, tested every lot."},
    benefitShorthandId:"BS-3"
  },
  {
    id:"JUL06-PIN-2",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Chocolate",
    dnaPattern:"viral-recipe-remix",
    timing:"Thu Jul 9 · 2pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the heat-wave dessert is just frozen chocolate oat milk.\" — no-cook fudge-pop pin",
    intel:[
      {type:"PULSE", text:"No-cook, no-oven dinners are dominating post-cookout mid-summer FoodTok as heat waves roll in — chickpea salads, gazpacho, ceviche, lettuce wraps, all built for a kitchen no one wants to heat up (CP-2). The open gap in the trend is a creamy element that doesn't require a pan. Lead with Willa's answer: a 30-second creamy drizzle — Willa's Organic Original + tahini + lemon, whisked and poured over the viral chickpea salad. Whole oat groat means the protein + fiber stay in (most oat milks filter both out), so the 'creamy' is real food, not a canned dairy dressing. Delicious beat first, the whole-oat receipt is the supporting proof. Motivate the save: pin it for the next heat wave, then blend it stove-free."},
      {type:"AUDIENCE", text:"Pinterest's summer savers pin the exact dinner they can pull off when it's 95 out and the oven is off-limits — the recipe pins that get saved are the ones that look effortless and name their ingredients cleanly. The win here is a screenshot-ready no-cook plate where the creamy drizzle is the hook and the Willa's carton is styled right into the frame, ingredient list readable. Lead with the relief — dinner solved without turning on a burner — and let the drizzle read as the small upgrade that makes a can of chickpeas feel like a meal you chose, not settled for."},
      {type:"COMPETITOR", text:"Internal: the biggest oat name is leaning on format-sprawl this cycle — RTD iced coffees, Baristamatic, oatgurt (C-1) — chasing the summer beverage ritual rather than owning the no-cook kitchen. That's the backdrop for why a genuinely useful whole-oat recipe pin wins the heat-wave moment, NOT the framing for this pin. Never name a competitor on the surface; use 'most oat milks' only for the filtered-out protein/fiber contrast if needed. Keep it about the drizzle and the dinner, full stop — no teardown required."}
    ],
    hooks:[
      {text:"the heat-wave dessert is just frozen chocolate oat milk.", recommended:true},
      {text:"pour, freeze, done — a fudge pop with 4 ingredients you can read"},
      {text:"the clean chocolate treat the kids won't clock as 'clean'"}
    ],
    caption:"the heat-wave dessert is just frozen chocolate oat milk. 🍫\n\npour Willa's Chocolate into pop molds, freeze, done — no cooking, no dairy, no 20-ingredient fudge recipe. real cocoa and the whole oat kept whole, so it's a treat you can actually read the back of.\n\n4 ingredients in, one no-cook dessert out. save it for the next 95° afternoon.",
    hashtags:[
      "#willas",
      "#chocolateoatmilk",
      "#fudgepops",
      "#nocookdessert",
      "#heatwavetreat",
      "#dairyfree",
      "#kidsnack",
      "#realfood",
      "#wholeoat",
      "#organicoatmilk"
    ],
    visual:"Bright, editorial Pinterest still — vertical 2:3, sunlit and appetizing. A row of dark-chocolate oat-milk fudge pops on a chilled plate, condensation beading, one with a bite taken to show the creamy set. A Willa's Chocolate carton softly out of focus behind, pop molds + a cocoa dusting as props. Warm summer daylight, glossy-cold texture, no talent on camera. Text overlay: 'frozen chocolate oat milk pops · 4 ingredients · no cook.'",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"pin this for the next heat wave.", medium:"save it and grab Willa's Chocolate — the pour that freezes into dessert.", strong:"pour Willa's Chocolate into molds tonight — frozen fudge pops by tomorrow."},
    benefitShorthandId:null
  },
  {
    id:"JUL06-IG-F1",
    platform:"IG Feed",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Kids",
    dnaPattern:"at-shelf-moment",
    timing:"Thu Jul 9 · 6pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"clean label made it to the warehouse aisle — and this pour was already there.\" — at-shelf clean-label carousel",
    intel:[
      {type:"TREND", text:"Clean-label kids' snacks are winning big-box shelf space — Costco's July 2026 new-product drop leaned hard into dairy-free, nut-free, zero-added-sugar picks, proof that transparent-ingredient demand moved from the natural aisle to the warehouse floor and 'what parents feed their kids' is now a mass-market buying filter (T-10). Lead with the pour already built for that cart: Willa's Kids is made from the whole oat (real food, not oat syrup), 8g protein, top-9 allergen-free, USDA Organic, Yuka 100. The mainstream shift is the backdrop — the recognizable-ingredient carton parents already reach for is the answer, and it reads clean on a 2-second in-aisle glance."},
      {type:"AUDIENCE", text:"The parent on the warehouse run isn't reading a nutrition seminar — she's scanning for a name she recognizes, running a fast gut check between the rotisserie chickens and the paper towels: can I pronounce it, is it going to spike him, will the allergy-aware table send it back. The relief Willa's Kids sells here is 'trust on sight' — a label short enough to clear in two seconds, no ingredient to Google mid-aisle. Make the carousel feel like the satisfying spot-it-in-the-wild moment — parent-first, 'what's actually in it' register: unfussy and warm, the win being one less thing to second-guess in the cart."},
      {type:"COMPETITOR", text:"Internal: peers are winning the shelf with spectacle — licensed-character boxes and IP tie-ins engineered for unboxings (C-3) — but the clean-label mainstreaming means the durable buy filter is recognizable ingredients, not a borrowed character. Never name a brand on the surface; contrast stays 'vs. the average kids' drink,' which still splits organic-OR-simple, sweet-OR-clean. Willa's Kids clears whole-oat + organic + top-9 allergen-free + 8g protein all at once — the exact transparent-ingredient promise the warehouse trend is validating. Keep competitor specifics internal."}
    ],
    hooks:[
      {text:"spotted on the warehouse run: a kids' drink with a label you can actually read.", recommended:true},
      {text:"clean-label kids' snacks finally hit the big-box shelf — here's the pour already earning the cart.", recommended:false},
      {text:"if you can pronounce every ingredient, it goes in the cart. Willa's Kids clears every time.", recommended:false}
    ],
    caption:"Clean label made it to the warehouse aisle — and this pour was already there. 🛒\n\nTransparent ingredients used to mean a special trip to the natural-foods aisle. Now the big-box shelf is stocked with kids' snacks parents can actually read — proof that 'what parents feed their kids' became a mainstream buying filter. Willa's Kids has been built for that cart the whole time:\n\n- made from the whole oat — real food, not oat syrup\n- 8g protein — the same as dairy\n- top-9 allergen-free — no nut, soy, gluten, dairy, sesame\n- USDA Organic · plant-based DHA · Yuka 100 (the Clean Label App's highest score)\n\nNo mystery ingredient to Google mid-aisle, no trade-off between organic and simple. Just the recognizable-ingredient pour you'd already reach for. Parents asked us to make a carton they could trust on sight — we listened. 🥛\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#dairyfreekids",
      "#cleanlabel",
      "#costcofinds",
      "#kidsnutrition",
      "#momsofinstagram",
      "#allergenfriendly",
      "#readtheingredients"
    ],
    visual:"Four-card editorial carousel, bright and trend-forward — warm cream + clean daylight, that satisfying 'spotted it in the wild' aesthetic (Fishwife/Graza design-wit meets a real warehouse run), never an infographic. Card 1: an IRL at-shelf moment — Willa's Kids carton held in-hand or riding in a warehouse cart beside real recognizable haul (rotisserie, clementines, a flat of snacks), soft overlay 'spotted on the warehouse run.' Card 2: the carton centered, back label in focus with a hand-drawn marker circle around the short ingredient list — overlay 'read every ingredient in the aisle.' each with one plain line under it: whole oat / 8g protein / top-9 allergen-free / organic. Card 3: the carton in the cart-seat or on the checkout belt, big overlay 'the one you'd already reach for.' Card 4: cream background, carton with the Yuka 100 badge and a warm closing line. Carton holds 40%+ of frame on every card. Hands + product + real shelf/cart context only, no talent face. One consistent palette + type across all cards so it reads as a single designed set, swipe-rewarding.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for your next warehouse run.", medium:"swipe the label, then look for Willa's Kids on your next big-box haul.", strong:"grab Willa's Kids — the recognizable-ingredient pour that's already in the cart."},
    benefitShorthandId:"BS-3"
  },
  {
    id:"JUL06-TT-3",
    platform:"TikTok",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Fri Jul 10 · 10am",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"no grown-ups required\" — kid-led shake pour",
    intel:[
      {type:"PULSE", text:"Mid-summer 2026 has a clear parenting-culture beat: cooking-literacy camps sending kids home to make their own food, plus a wave of 'let my kid make it themselves' snack videos on FoodTok (CP-6). The move is a 20-second shake-and-pour a kid can build start to finish with real ingredients they can name — Willa's Kids as the creamy base, plus frozen berries and a drizzle of maple. It rides the moment because the whole payload is a kid doing it solo, hands-on, no adult stepping in. The feel-good is the pride; the delicious is the frothy berry pour they made themselves."},
      {type:"AUDIENCE", text:"Parents this summer are actively looking for low-stakes ways to hand kids some independence in the kitchen — and quietly love a recipe simple + clean enough that they can say yes without hovering. The confession that lands here is the parent's, off-screen: 'she made the whole thing and I didn't touch it.' A pour a kid can name every ingredient in (oat milk, blueberries, a little maple) is also a pour the parent already trusts — recognizable, whole-food, nothing to tally (T-4)."},
      {type:"COMPETITOR", text:"Internal only: the kids RTD sub-lane leans on cartoon branding and sugar-load, not on being a base kids can actually cook with. Willa's Kids is clean + creamy enough to be the hero ingredient in a kid-led recipe — 8g protein, algae DHA, top-9 allergen-free, Yuka 100/100 — which no sugar-forward kids' drink can credibly do. Keep it category-level on the surface, never name a competitor."}
    ],
    hooks:[
      {text:"let's make a berry shake-up", recommended:true},
      {text:"the summer snack a kid can make all by herself (no grown-ups required)", recommended:false},
      {text:"a 20-second pour a kid can build solo — real ingredients they can name", recommended:false}
    ],
    caption:"Mid-summer means the kids want in on everything — so we made a pour they can build start to finish, no grown-ups required. 🫐☀️ Shake, pour, and that first proud sip: it's the kind of little win that makes a whole afternoon.\n\nWilla's Kids Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, creamy taste — plus 8g protein, DHA, and it's free of the top 9 allergens, so it's the one carton you can hand over without a second thought. 🥛\n\nIngredients:\n- 1 cup Willa's Kids Organic Oat Milk\n- ¼ cup frozen blueberries\n- 1 tsp maple syrup (optional)\n- a handful of ice\n- 1 jar with a tight lid, for shaking\n\nHave your kid pour the Willa's Kids into the jar, drop in the frozen blueberries and a little maple, snap the lid on tight, and shake until it's frothy and purple. Pour over ice — and let them take the credit. 💜",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#kidsinthekitchen",
      "#kidscooking",
      "#dairyfree",
      "#summersnack",
      "#kidsrecipe",
      "#foodtok",
      "#momsoftiktok"
    ],
    visual:"Bright, sun-washed home kitchen, lofi/chill DIY-snack-video energy — the kid IS the star, on camera and hands-in-frame throughout, no adult on camera or voiceover. Shoot from a kid's-eye height so it reads as their video: small hands lifting the Willa's Kids carton (label readable, held 40%+ of runtime), pouring into a clear lidded jar, dropping in frozen blueberries, snapping the lid, and the hero SHAKE — the jar going frothy purple, full of movement. High color saturation, warm neutral counter, real morning light. Big playful sentence-case text overlays name each step the way a kid would. Close on the proud over-the-ice pour and that first sip. The energy is joyful independence, not a polished ad — a little messy, all delight.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Kid-height close-up: a kid grins at the camera and sets the Willa's Kids carton, a clear lidded jar, and a bowl of frozen blueberries on a sunlit counter. On-screen text (sentence case, big + playful): 'let's make a berry shake-up'. Kid's own voice (no adult VO): 'i'm making my own drink!' Quick handheld cut."},
      {scene:"THE POUR", time:"3-8s", action:"Small hands tip the Willa's Kids carton and pour into the jar — creamy whole-oat stream, carton label facing camera. Kid names it out loud: 'oat milk!' Text overlay: '1. pour the Willa's Kids 🥛'. Bright, saturated, real light."},
      {scene:"THE ADD-INS", time:"8-13s", action:"Kid drops a scoop of frozen blueberries into the jar, then a little squeeze of maple. Kid's voice: 'blueberries… and a little maple!' Text overlay: '2. blueberries + a drizzle of maple 🫐'. Macro on the berries hitting the milk."},
      {scene:"THE SHAKE (hero)", time:"13-18s", action:"Lid snaps on. Kid shakes the jar hard with both hands — the whole frame full of movement, the milk going frothy purple through the clear jar. Text overlay: '3. lid on. SHAKE! 💜'. Big grin, joyful, a little wobbly-handheld."},
      {scene:"THE POUR + SIP", time:"18-23s", action:"Kid pours the frothy berry shake over a cup of ice, then takes a proud first sip and does a little 'ta-da' to camera. Carton on the counter beside the cup, readable. Text overlay: 'made it myself. no grown-ups required. ☀️'"},
      {scene:"END CARD", time:"23-25s", action:"Snap to the finished berry shake-up beside the Willa's Kids carton in full daylight. End-card text: 'the pour they can make themselves.' Small tag: 'Willa's Kids · designed for kids' tastebuds. parent approved.' Audio resolves warm."}
    ],
    audio:"No adult voiceover — the kid's own on-camera voice naming each step ('oat milk!', 'blueberries!', 'shake!') over a lofi/chill DIY-snack-video beat. Light, unpolished, joyful. Let the shake and the first sip breathe with natural sound. Never a scripted adult narration — the whole charm is that a kid is running the show.",
    duration:"15-25 seconds",
    cta:{soft:"save this for the next 'i'm boooored' afternoon 🫐", medium:"hand your kid the carton and let them make the whole thing", strong:"grab Willa's Kids at willaskitchen.com and let them take the credit ☀️"},
    benefitShorthandId:"BS-3"
  },
  {
    id:"JUL06-IG-R3",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Kids",
    dnaPattern:"viral-recipe-remix",
    timing:"Fri Jul 10 · 12pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"proffee, minus the chalk — 8g protein, all creamy swirl.\" — dairy-free FoodTok remix",
    intel:[
      {type:"PULSE", text:"Proffee — protein iced coffee — is riding the #icedcoffee wave (334M+ views) as mid-summer iced-coffee season peaks, with creators blending protein into cold brew for a high-protein sip (CP-1). Most versions reach for chalky protein powder or Greek yogurt, leaving a wide-open lane for a creamy, real-food, dairy-free rebuild. Willa's answer is built-in: cold brew + a pour of Willa's Kids for 8g plant protein and a creamy swirl — top-9 allergen-free, DHA omega-3s, organic simple ingredients, no powder to hide. Lead with the swirl, back it with the protein."},
      {type:"AUDIENCE", text:"Willa's whole-plant crowd already knows the not-so-secret hack — adults reach for the Kids carton when they want more protein in their iced coffee, because it oddly blends and creates the best creamy swirls. Mid-summer, they want a cold cup that carries real protein without a scoop of grit or a dairy stomachache. The proffee wave is their permission slip to post the pour they already make."},
      {type:"COMPETITOR", text:"Internal: the category is leaning on format-sprawl into the iced-coffee season — RTD iced coffees and barista-gadget launches from the biggest oat name rather than a sharp real-food POV (C-1, C-2). Counter by owning the creamy-protein lane the powder-and-gadget set can't: a carton that swirls into cold brew for 8g protein, no chalk, no dairy, no additives. Never name a competitor on the surface."}
    ],
    hooks:[
      {text:"let's make protein iced coffee (dairy-free!)", recommended:true},
      {text:"proffee, but dairy-free and actually creamy — no chalky powder", recommended:false},
      {text:"8g of protein in your iced coffee. zero grit. zero dairy.", recommended:false}
    ],
    caption:"Proffee — that's protein + coffee — took over FoodTok (the recipe corner of TikTok), so it took over our cold brew. ☕️💪 The creamy, high-protein iced coffee that skips the chalky powder and the dairy entirely — just cold brew and a slow pour that swirls itself.\n\nWilla's Kids Organic Oat Milk brings 8g of plant protein, DHA omega-3s, and top-9-allergen-free simple ingredients to the glass — turns out the carton kids love makes the creamiest iced coffee too, no scoop of grit required. 🥛\n\nIngredients\n- 1 cup cold brew coffee (or strong chilled coffee)\n- 1 cup Willa's Kids Organic Oat Milk, chilled\n- a tall glass of ice\n- optional: 1/2 tsp vanilla + a small drizzle of maple syrup\n\nFill the glass with ice, pour the cold brew, then pour the Willa's Kids slowly over the top and watch it swirl. Give it one stir if you can't wait. Proffee, minus the chalk — 8g protein, all creamy swirl.",
    hashtags:[
      "#willas",
      "#willaskids",
      "#proffee",
      "#proteincoffee",
      "#icedcoffee",
      "#coldbrew",
      "#dairyfree",
      "#highprotein",
      "#oatmilk",
      "#allergenfree"
    ],
    visual:"Bright, sunlit kitchen counter, clean warm color temp (midday July light through a window, not muted brand stock). Lo-fi chill audio. Hands-only, no talent. The hero is the pour: a tall clear glass of cold brew over ice, then a slow cascade of creamy Willa's Kids swirling down through the dark coffee into a marbled coffee-and-cream spiral. Willa's Kids carton stays in frame the whole time, positioned back-left so it reads in 40%+ of shots. Crisp overhead for the cold-brew pour, a tight side-angle slow-zoom on the creamy swirl (the payoff), then a final lift of the finished marbled glass into the light beside the carton. Minimal props — a metal straw, a linen napkin, a few coffee beans scattered. Trend-forward and appetizing, never infographic-y — the swirl does the work.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Overhead, bright kitchen counter. Hands set down a tall clear glass + the Willa's Kids carton (label facing camera). On-screen text fades in, sentence case: 'let's make protein iced coffee (dairy-free!)'. Quick whip-pan to next scene."},
      {scene:"THE COLD BREW", time:"3-8s", action:"Tight overhead: hands fill the glass with ice, then pour dark cold brew over the top. Text overlay: 'cold brew + ice'. Crisp pour ASMR, ice clink."},
      {scene:"THE SWIRL (PAYOFF)", time:"8-15s", action:"Side angle, slow-motion: hand pours Willa's Kids slowly over the cold brew — creamy white cascades down and swirls into the coffee, self-marbling. Carton tilts into frame mid-pour. This is the hero shot. Text overlay: 'Willa's Kids · 8g plant protein · no chalky powder'."},
      {scene:"THE STIR", time:"15-19s", action:"Quick top-down: a metal straw draws one lazy swirl through the marbled glass, coffee and cream blending to a soft caramel color. Text overlay: 'top-9 allergen-free · DHA · organic — no dairy, no grit'."},
      {scene:"END CARD", time:"19-22s", action:"The finished glass lifted into midday light beside the Willa's Kids carton. Cut to clean end card over the still, text: 'proffee, minus the chalk — 8g protein, all creamy swirl.' Logo lockup small bottom-center."}
    ],
    audio:"Warm narrative voiceover, low and easy, over a lo-fi chill beat. VO beats: 'proffee — protein iced coffee — is everywhere right now' (over hook) → 'start with cold brew over ice' (over pour) → 'then the swirl — Willa's Kids, 8g plant protein, no chalky powder, no dairy' (over the creamy cascade) → 'one stir if you can't wait. proffee, minus the chalk.' (end card).",
    duration:"15-25 seconds",
    cta:{soft:"save this for your next iced-coffee morning ☕️", medium:"tell us — cold brew or espresso for your proffee? 💪", strong:"grab Willa's Kids, pour the dairy-free proffee, and tag us in the swirl"},
    benefitShorthandId:"BS-3"
  },
  {
    id:"JUL06-PIN-3",
    platform:"Pinterest",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Chocolate",
    dnaPattern:"before-after-stitch",
    timing:"Fri Jul 10 · 2pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"skip the powder stack — the whole oat is the stack\" — before/after functional split",
    intel:[
      {type:"TREND", text:"Mid-summer 2026 beverage menus are tilting 'functional' — mushroom coffee up more than 4x YoY, protein frappes and adaptogen sodas surging — but most of it ships as a powder stack you scoop on top (T-7). Willa's answer leads: Chocolate is functional by composition, not addition — 5 ingredients, real cacao, 5g protein, 11g sugar per cup, Good Food Awards Best Beverage — because Willa's keeps the whole oat groat (bran, germ and all) so the protein and fiber stay in, instead of getting filtered out and the starch processed into sugar."},
      {type:"AUDIENCE", text:"Pinterest savers are building 'functional drink,' 'healthy iced coffee' and 'summer sip' boards this month — pinning the aesthetic of a wellness pour days before they actually build one. This saver already has a cabinet of half-used protein tubs and adaptogen jars and is quietly hunting for the version that skips the shelf. A clean before/after split — the powder pile vs. the single carton — is exactly the save-worthy proof they're scrolling for."},
      {type:"COMPETITOR", text:"Internal: the category is answering 'functional' with format-sprawl and additive stacks — RTD lineups, barista editions, powder-forward builds (C-1) — chasing the trend by adding more. Willa's counters by subtraction: the function is already in the whole oat, nothing scooped on top. Never name a competitor on the pin; let the 5-ingredient side of the split win the argument."}
    ],
    hooks:[
      {text:"skip the powder stack — the whole oat is the stack", recommended:true},
      {text:"5 scoops vs. 5 ingredients — same 'functional,' way less counter", recommended:false},
      {text:"functional isn't a powder you add — it's a food you don't strip", recommended:false}
    ],
    caption:"summer decided every sip has to 'do something' now — so the counter filled up with scoops, tubs and a shaker bottle that never fully rinses. 🥄 here's the shortcut: functional sip, minus the powder stack — real cacao and the whole oat already did the work.\n\nWilla's Chocolate is 5 ingredients, real cacao, 5g protein and 11g sugar per cup — Good Food Awards Best Beverage. it's functional because of what it's made of, not what got scooped on top: Willa's keeps the whole oat groat, bran and germ and all, so the protein and fiber stay in instead of getting filtered out and the starch processed into sugar.\n\nno adaptogen dust (those mushroom-blend and herb-powder jars), no chalky aftertaste, no 12-jar shelf — just a creamy chocolate pour over ice.\n\nUSDA Organic · Non-GMO · Certified glyphosate-free, tested every lot · WBENC women-owned.\n\nthe real food is the function. Nourish the spark in everyone.\n\n#willas #oatmilk #chocolateoatmilk #functionaldrinks #realfood #dairyfree #cleanlabel #wholeplant #summersips #nopowder",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#chocolateoatmilk",
      "#functionaldrinks",
      "#realfood",
      "#dairyfree",
      "#cleanlabel",
      "#wholeplant",
      "#summersips",
      "#nopowder"
    ],
    visual:"Bright, editorial Pinterest pin (2:3 vertical) built as a clean before/after split — wordplay-led design where the text overlay headline IS the post's joke and proof. Hard vertical divider down the center. LEFT (before): a cool-toned, slightly cluttered counter styled with the 'powder stack' — protein tubs, adaptogen and mushroom-coffee jars, loose scoops and a shaker bottle, the maximalist functional-wellness pile. RIGHT (after): a warm, sun-flooded counter in creamy cacao-brown with soft health-blue accents (Health/Wellness lane), the Willa's Chocolate carton standing label-forward, hero-center, occupying 40%+ of the after side, a tall iced glass of creamy chocolate beaded with condensation beside it. Big sans headline running across the top: 'skip the powder stack — the whole oat is the stack.' A crisp small caption on the after side styled like a receipt line: '✓ 5 ingredients  ✓ real cacao  ✓ 5g protein  ✓ nothing scooped on top.' A hand optionally drifting in to tilt the Chocolate back-label toward camera, the 5-ingredient list legible. Keep it editorial-bright and screenshot-able — the kind of pin a shopper saves to a 'functional drinks' board because the joke and the proof land in one glance. No clinical infographic feel, no adaptogen-dust mysticism.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this to your functional-sips board", medium:"before you build a powder shelf, try the pour that skips it", strong:"grab Willa's Chocolate — real-food functional, no scoops required"},
    benefitShorthandId:null
  },
  {
    id:"JUL06-IG-F2",
    platform:"IG Feed",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Fri Jul 10 · 6pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"no good-food, bad-food math at this table — just breakfast, poured without a second thought.\" — food-freedom parenting carousel",
    intel:[
      {type:"PULSE", text:"'Butter mom' summer has grown from a parenting mindset into a full mid-summer aesthetic — food neutrality, comfort normalized, soft-lit homemade mornings, an explicit rejection of restriction-as-wellness (CP-5). It lands squarely in the abundance-not-punishment register Willa's already lives in. Lead with the feeling Willa's Original delivers — a pour a parent can hand over without ranking it first — and let the culture moment be the backdrop, not the headline. The proof (1g sugar, 4g+ protein, 2g+ fiber, 4 ingredients, whole oat) is what makes 'no morality at the table' true instead of just a vibe."},
      {type:"AUDIENCE", text:"This is the parent quietly running good-food/bad-food math in her head — a habit a lot of us inherited and don't want to hand down. The relief Willa's Original sells here isn't a nutrition lecture; it's permission. A pour that's genuinely real means there's nothing to agonize over, nothing to earn back, no guilt attached to a glass of breakfast. Make the carousel a tender relatable-confession (Partake's warm parent-first register, not sneering): name the ranking-every-food habit out loud, then land on the carton that was never a decision to feel anything about but full. The win is one less thing on the table with a moral price tag."},
      {type:"COMPETITOR", text:"Internal: the category trains parents to do exactly this math — 'kids' versions,' added-back nutrients, and marketing that implies a food has to be earned. Never name a brand on the surface; contrast stays 'vs. the average oat milk / average kids' drink.' Willa's is uniquely positioned to opt out of the ranking game because it has nothing to hedge — whole oat groat, 1g sugar, 4 ingredients, organic, glyphosate-free — so 'no good vs. bad decision' is a product truth, not a slogan. Keep all competitor specifics internal."}
    ],
    hooks:[
      {text:"no good-food, bad-food math at this table — just breakfast, poured without a second thought.", recommended:true},
      {text:"the morning pour that was never a rule to follow.", recommended:false},
      {text:"you're allowed to pour your kid a glass without ranking it first.", recommended:false}
    ],
    caption:"Willa's Original was never a 'good' food or a 'bad' one — it's just real breakfast. 🌾\n\nThat math — is this a good food? Should I feel something about it? — isn't yours to run anymore. 'Butter mom' summer (the TikTok pushback on food ranking — almond mom = restriction, butter mom = abundance) put a name on what already feels right at the table: no morality, just food.\n\nThe whole oat does the work:\n\n- 1g sugar, from the oats, nothing added\n- 4g+ protein, more than any oat, almond, pistachio, or coconut milk\n- 2g+ prebiotic fiber\n- 4 ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt\n\nNo good-food, bad-food math at this table — just breakfast, poured without a second thought. A kid can grow up with food they can read, and nobody has to feel anything about it but full. 🥛\n\nUSDA Organic · Non-GMO · Certified Glyphosate-Free · WBENC",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#buttermom",
      "#foodfreedom",
      "#antidietculture",
      "#wholeoat",
      "#cleaningredients",
      "#momsofinstagram",
      "#organicoatmilk",
      "#realfood"
    ],
    visual:"Four-card editorial carousel, bright and trend-forward — warm cream backgrounds, soft late-morning daylight, lived-in-kitchen feel, generous negative space, a zine-cover ease (Fishwife/Graza design-wit, Partake parent-first warmth), never an infographic and never anxious. Card 1: the Willa's Original carton on a sun-washed cream counter beside two glasses already poured (one taller, one smaller) — a calm, un-styled real-morning frame — bold hand-set overlay 'no good-food, bad-food math at this table.' Card 2: the carton centered, back label gently in focus, one warm line overlay 'it was never a decision to agonize over — it's just real,' with the four ingredients set small and unfussy beneath. Card 3: the carton with three clean number callouts stacked — '1g sugar' · '4g+ protein' · '2g+ fiber' — each with a short plain line, the visual point being 'nothing to earn back.' Card 4: cream background, carton centered with the closing line 'just breakfast, poured without a second thought,' cert row small at the base. Carton holds frame 40%+ on every card. Hands + product + glasses only, no talent face — the mood is permission and abundance, not restriction. Consistent palette + type across all four cards so it reads as one designed, swipe-rewarding set.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for the mornings the food math creeps back in.", medium:"swipe through, then pour one without ranking it first.", strong:"find Willa's Original — the pour that was never a 'good vs. bad' decision."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUL06-TT-4",
    platform:"TikTok",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"on-pack-checklist",
    timing:"Sat Jul 11 · 10am",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"real food in a carton — not a number to chase.\" — macro-count confession pour",
    intel:[
      {type:"TREND", text:"Parenting + nutrition coverage in early July 2026 shows parents walking away from macro-counting toward functional, whole-food nutrition — bioavailable micronutrients, fiber, recognizable sourcing — and 'high protein' as a headline number is fading (T-4). LEAD with Willa's answer: Willa's Kids is organic, recognizable ingredients and the whole oat groat (bran and germ and all) — 8g protein, added DHA for growing brains, top-9 allergen-free, Yuka 100. It's the pour that isn't a spreadsheet: nothing to tally, just real food kids actually want. The macro-fatigue shift is the BACKDROP; the recognizable-ingredient carton is the lead."},
      {type:"AUDIENCE", text:"The relief this parent feels isn't a bigger number on the label — it's permission to stop doing math. They've been running a silent tally at the milk aisle (grams of protein up, grams of sugar down) and quietly burning out on it. A confession that names putting the calculator down — 'good nutrition was never supposed to be a spreadsheet' — lands harder than any stat. Deliberately the INVERSE of a checklist: one simple label you don't have to score."},
      {type:"COMPETITOR", text:"Internal: the kids'-drink aisle has trained parents to hunt for a single headline number — the biggest 'high protein' flag on the front — which is exactly the macro-count treadmill parents are quitting. Never name a competitor on the surface; the contrast is a carton where the win is that there's nothing to chase: recognizable ingredients, the whole oat, 8g protein and DHA that speak for themselves."}
    ],
    hooks:[
      {text:"you've been doing the protein math in your head at the milk aisle. you can stop now.", recommended:true},
      {text:"somewhere along the way, feeding your kid turned into a spreadsheet — it really doesn't have to be", recommended:false},
      {text:"this label has nothing for you to count. that's the whole point.", recommended:false}
    ],
    caption:"somewhere along the way, feeding your kid turned into math — grams of protein up, grams of sugar down, a running tally in your head at the milk aisle. 🍎 you can put the calculator down. Willa's Kids is organic, recognizable ingredients and the whole oat groat, bran and germ and all — with 8g protein, added DHA for growing brains, top-9 allergen-free, and a Yuka score of 100 (Yuka — the clean-label app — grades every grocery 0–100). it isn't a number to chase; it's just real food in a carton kids actually reach for. because good nutrition was never supposed to be a spreadsheet — parents asked, we listened. 🌾",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#kidsdrinks",
      "#momsoftiktok",
      "#cleanlabel",
      "#kidsnutrition",
      "#dairyfree",
      "#realfood",
      "#parentsoftiktok",
      "#fyp"
    ],
    visual:"Bright, sunlit family kitchen, warm mid-morning light, trend-forward and high-color. No talent on camera by default — a real parent's hands plus a kid's hand in frame, plus sentence-case text overlays (runs clean as an on-pack-checklist without a face). Open on a phone/notes-app screen full of a scribbled macro tally (protein grams, sugar grams, question marks) held over the counter, then the thumb closes it and sets the phone face-down — the visual confession that the counting is over. Cut to a single chilled Willa's Kids carton placed alone on the clean counter, condensation on the side, label facing camera. On-pack-checklist beat: a slow push-in on the back label where the ONE simple line of recognizable ingredients reads clearly — framed as 'nothing to tally,' the inverse of a scorecard. Cut to a smooth pour into a clear kid's glass, then a kid's hand reaching in to take it without being asked. Brown pillar accent (#9E652E) on the on-screen text cards. Fast, handheld micro-cuts. Carton on screen 40%+ of runtime; end on the carton centered with the stinger card.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Close-up, handheld: a parent's hand holds a phone showing a messy notes-app macro tally over the kitchen counter. On-screen text (sentence case): 'you've been doing the protein math in your head at the milk aisle.' Quick beat."},
      {scene:"THE CONFESSION", time:"3-6s", action:"The thumb closes the note and sets the phone face-down on the counter. On-screen text: 'you can stop now.' Hard cut to a single chilled Willa's Kids carton placed alone on the clean counter, condensation visible, label toward camera."},
      {scene:"THE PROOF (nothing to count)", time:"6-10s", action:"Slow push-in on the Willa's Kids back label — the one short line of recognizable ingredients + the whole oat. On-screen text: 'organic. recognizable. the whole oat. nothing to tally.' Small brown check graphics ping beside '8g protein · DHA · top-9 allergen-free · Yuka 100.'"},
      {scene:"THE POUR", time:"10-13s", action:"Cut to a smooth, creamy pour from the Willa's Kids carton into a clear kid's glass on the counter, catching the light. On-screen text: 'real food, not a number to chase.' Brown-accented card, kept quick and clean."},
      {scene:"THE KID-MOMENT", time:"13-16s", action:"A kid's hand reaches into frame and takes the glass off the counter without being asked, lifts it out of frame. On-screen text: 'the pour that isn't a spreadsheet.' Soft-focus carton stays in the background."},
      {scene:"END CARD", time:"16-19s", action:"Willa's Kids carton centered in crisp focus, full glass beside it. Stinger card: 'same protein as dairy. half the sugar. Yuka 100 — nothing to chase.' Small Willa's logo lockup fades up. On-screen prompt: 'still counting macros on your kids' drinks? 🍎'"}
    ],
    audio:"Warm narrative voiceover, kept light and confessional — a real-parent tone reading the on-screen beats over a chill lofi kitchen track. Soft VO lands the turn ('you can put the calculator down') and the end-card stinger. Let the on-screen text carry the confession beats; VO is supporting, not a hard sell.",
    duration:"15-25 seconds",
    cta:{soft:"still counting macros on your kids' drinks? comment below", medium:"put the calculator down — try the pour that isn't a number to chase", strong:"grab Willa's Kids and retire the milk-aisle math"},
    benefitShorthandId:"BS-5"
  },
  {
    id:"JUL06-TT-6",
    platform:"TikTok",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Sat Jul 11 · 11am",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the from-scratch kitchen isn't a trend to us — it's the recipe grandmother Willa passed down.\" — heritage kitchen POV",
    intel:[
      {type:"PULSE", text:"Netflix's reimagined 'Little House on the Prairie' lands Jul 9 (CP-8), pulling a wave of homestead, from-scratch, real-ingredient nostalgia across summer FoodTok — the sunlit, slow, unhurried kitchen aesthetic everyone's suddenly romanticizing. Willa's doesn't have to chase the mood; it's lived there since day one. Lead with the answer: Willa's Original is 4 real ingredients (organic whole grain oats, filtered water, organic vanilla, sea salt), made from the whole oat groat — named for grandmother Willa, born 1921, real food passed down and reinvented forward. The reboot is backdrop; the from-scratch kitchen IS the brand."},
      {type:"AUDIENCE", text:"Willa's buyer is the one screenshotting the cottage-core, prairie-kitchen aesthetic and quietly wishing her actual pantry matched it — she wants 'made the old way, with real things' to be true and not just styled for the camera. She's tired of clean-looking labels that fall apart when she reads the back. A founder-voiced, unhurried heritage moment — grandmother's recipe, four ingredients, nothing to filter out — lets her feel the from-scratch warmth AND get the receipt in the same breath. This is a trust beat, not a sell."},
      {type:"COMPETITOR", text:"Internal: peers are winning summer on borrowed culture — a rival shipped a Spider-Man IP box tied to the film release (C-3), another turned a fan meme into a limited capsule (C-2). Those moments rent attention from a license. Willa's owns a story no license can buy: grandmother-Willa origin, born 1921, a from-scratch kitchen that predates the trend cycle. Heritage is the built-in IP. Never name a competitor on the surface — just lead the summer with the real thing instead of a borrowed character."}
    ],
    hooks:[
      {text:"before 'from scratch' was a Netflix aesthetic, it was just how grandmother Willa cooked.", recommended:true},
      {text:"everyone's chasing the homestead-kitchen aesthetic this summer. we've made oat milk this way since day one.", recommended:false},
      {text:"sunlit, unhurried, four real ingredients — this is the kitchen Willa's has always lived in.", recommended:false}
    ],
    caption:"the from-scratch kitchen isn't a trend to us — it's the recipe grandmother Willa passed down.\n\nwith Netflix reviving 'Little House on the Prairie' (Jul 9), everyone's suddenly chasing that sunlit, slow, real-ingredient homestead kitchen. it's the exact place Willa's has lived since day one — named for grandmother Willa, born 1921. real food, passed down. reinvented forward.\n\nwhat 'from scratch' actually means in the carton:\n• Willa's Original is 4 ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt. that's it.\n• made from the whole oat groat (the whole oat kernel — bran, germ and all), not oat syrup\n• 1g sugar, with more protein and fiber left in — because most oat milks filter both out, then process the leftover starch into sugar\n• USDA Organic · Certified glyphosate-free (tested every lot) · Zero Food Waste\n\nno set dressing required. the unhurried, real-ingredient kitchen everyone's romanticizing is just… how we've always made it. nourish the spark.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#wholeoat",
      "#organicoatmilk",
      "#fromscratch",
      "#littlehouseontheprairie",
      "#realingredients",
      "#dairyfree",
      "#homesteadkitchen",
      "#nourishthespark"
    ],
    visual:"Warm, sunlit, unhurried — a from-scratch heritage-kitchen mood pulled straight from the homestead aesthetic FoodTok is romanticizing this summer. Golden window light, linen, wood, a worn wooden countertop, wildflowers in a jar, flour-dusted surfaces. This is a heritage/origin beat, so Christina (founder) IS allowed on camera — grandmother-era warmth, hands-and-heart, not a talking-head pitch: her hands sorting oats, wiping the counter, setting a single glass in the light; a brief, soft over-the-shoulder or side-profile is fine, no hard front-facing sell. The Willa's Original carton is present and label-forward across the pour beats (on screen 40%+). Movement is slow and real — pouring, steam-free morning calm, dust motes in the light. No irony, no clinical wellness-brand gloss, no fast cuts. Honey-gold grade, soft grain, a faintly nostalgic film texture that nods to the period aesthetic without costume or set-dressing. End card: cream background, the Original carton beside a single sunlit glass, stinger text.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Open on a sunlit from-scratch kitchen: golden window light across a worn wooden counter, wildflowers in a jar, Christina's hands cupping loose organic oats and letting them fall slowly. Founder voiceover begins. Text overlay (lower third): 'everyone's chasing the homestead kitchen this summer.' Slow, warm, unhurried — no fast cut."},
      {scene:"HERITAGE TURN", time:"3-8s", action:"Soft side-profile of Christina wiping the counter, then reaching for the Willa's Original carton and setting it in the light, label to camera. Founder voiceover: '…we've made oat milk this way since day one — named for my grandmother Willa.' Text overlay: 'grandmother Willa, born 1921. real food, passed down.' Nostalgic film grain."},
      {scene:"THE POUR", time:"8-14s", action:"Close, slow pour of creamy Willa's Original into a single clear glass on the wooden counter, golden light through the stream, carton held beside it at 40%+ of frame, label readable. Text overlay: '4 ingredients. the whole oat. nothing to filter out.' Let the pour breathe — dust motes in the light."},
      {scene:"PROOF", time:"14-19s", action:"Warm close-up: Christina's hand turns the carton to the ingredient list, one finger tracing down it. Founder voiceover: 'organic whole grain oats, filtered water, organic vanilla, sea salt. that's it.' Text overlay: '1g sugar · USDA Organic · glyphosate-free, tested every lot.' Confident, unhurried, not clinical."},
      {scene:"END CARD", time:"19-23s", action:"Clean cream background, Willa's Original carton beside the single sunlit glass. Stinger text (BS end card): 'the from-scratch kitchen we've always lived in.' Small sign-off beneath: 'real food, passed down. nourish the spark.'"}
    ],
    audio:"Founder voiceover — Christina, warm and unhurried, like she's telling you about her grandmother's kitchen, not selling. A quiet, nostalgic acoustic bed underneath (soft guitar or piano), golden and slow, no drop, no trend-audio hype. The calm, real-ingredient warmth IS the sound; let the pauses breathe.",
    duration:"15-25 seconds",
    cta:{soft:"what's the one from-scratch thing your grandmother made that you'd never buy store-bought? 👇", medium:"the homestead-kitchen aesthetic everyone's chasing — Willa's has poured it since day one. four ingredients, the whole oat.", strong:"skip the set dressing — Willa's Original is the real from-scratch pour, four ingredients, organic, glyphosate-free."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUL06-IG-R4",
    platform:"Instagram Reel",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Sat Jul 11 · 12pm",
    priority:"HIGH",
    rideNow:true,
    concept:"\"the game gave everything to the heat. the refuel shouldn't be sugar and dye.\" — after-the-heat kid refuel",
    intel:[
      {type:"PULSE", text:"The 2026 World Cup's July knockout heat forced FIFA's first-ever mandatory three-minute cooling breaks, and the July 3 debate moved past the scoreboard to how a body actually refuels when it's sweating 1-2L an hour (CP-7). Ride the non-table angle: not the watch-party, the after-the-heat refuel. LEAD with Willa's Kids as the answer — 8g protein, plant-based DHA, top-9 allergen-free, 6g sugar from organic maple — the creamy real-food pour a kid drinks after the park or practice, not a neon sugar-and-electrolyte drink. The pro-athlete hydration story is the backdrop; the carton is the resolution."},
      {type:"AUDIENCE", text:"Parents of kid-athletes reach for a sports drink on reflex after practice or the park — but they're squinting at 20+ grams of sugar and a dye they can't pronounce, wishing the refuel actually fed the kid. Speak to that exhausted post-heat moment: the flushed-cheek, empty-water-bottle walk to the car. Name the reflex (grab the sugar drink), then hand them the pour that refuels with real protein and fiber instead of coloring — the one that feels like feeding, not just quenching. Feel-good + healthier, no lecture."},
      {type:"COMPETITOR", text:"Internal: the leading kids' sports/electrolyte drinks run 20-34g sugar per bottle plus synthetic dyes; the major kids' protein shakes lean on 5-9g cane sugar; none deliver fiber or plant-based DHA. Never name them on the surface — contrast stays 'vs. the average sports drink' / 'vs. a neon electrolyte drink' only. Willa's Kids holds 8g protein (same as dairy), 6g sugar from organic maple, plant-based DHA from algae, top-9 allergen-free, Yuka 100, and the whole oat so protein + fiber stay in."}
    ],
    hooks:[
      {text:"the game's over, the heat won. the refuel every kid grabs? sugar and food dye.", recommended:true},
      {text:"your kid just lost 2 water bottles to the heat. the real refuel isn't a neon drink — it's protein you can pour.", recommended:false},
      {text:"post-practice, post-park, red-cheeked and thirsty: here's the after-the-heat pour that actually feeds them.", recommended:false}
    ],
    caption:"The game gave everything to the heat. The refuel shouldn't be sugar and dye. ⚽️\n\nAfter the park, after practice, the reflex is a neon sports drink — 20+ grams of sugar and a coloring you can't pronounce. Willa's Kids is the after-the-heat pour that actually feeds them: 8g protein (same as dairy), 6g sugar from organic maple, plant-based DHA from algae, top-9 allergen-free.\n\nWe use the whole oat — bran and germ and all, not oat syrup — so the protein and fiber stay in, Yuka — the clean-label app that scans groceries, 0–100 — scored it 100/100, and there's nothing neon in the cup.\n\nThe World Cup made hydration the story of the summer — even the pros stop for cooling breaks. Kids sweat through the heat too. The refuel is where it counts. 🥛\n\nParents asked us for a carton they could hand over red-cheeked and thirsty and feel good about. We listened.\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#dairyfreekids",
      "#kidsnutrition",
      "#allergenfriendly",
      "#momsoftiktok",
      "#kidathlete",
      "#summerhydration",
      "#realfood"
    ],
    visual:"Bright, sun-washed summer palette — hot-afternoon golden light, a kitchen counter or open tailgate/back-of-car vibe, warm wood + cream tones. Open on a red-cheeked kid in a soccer jersey or park clothes coming in off the heat, empty water bottle in hand, dropping onto a stool. A parent's hand sets down a neon-bright sports drink, then pauses — swaps it for the Willa's Kids carton. Quick hands-in-frame pour of maple-cream into a glass over ice, condensation beading, light catching the color. Kid takes the cup, big relieved gulp, exhale. Willa's Kids carton holds frame 40%+ throughout; the neon drink appears once, dim and pushed to the edge, then out of frame. People-on-camera: the kid-athlete is the star (not Christina), warm and real, no polished acting. On-screen spec overlays animate in beside the pour. Trend-forward quick cuts, lofi-warm summer grade. End card on clean cream background with the carton and the Yuka 100 + allergen-free stinger.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Medium shot: a red-cheeked kid in a soccer jersey drops onto a kitchen stool off the summer heat, empty water bottle dangling. A parent's hand slides a neon sports drink into frame. Text overlay (bold, top): 'the game's over, the heat won.' Quick whip-cut."},
      {scene:"TURN", time:"3-8s", action:"Tight on the neon bottle — a finger taps the label, on-screen callout stamps: '20g+ sugar · synthetic dye.' The parent's hand pulls it out of frame and picks up the Willa's Kids carton instead. Text overlay: 'the refuel shouldn't be sugar and food coloring.' Soft push-in, warm heat-haze light."},
      {scene:"POUR", time:"8-14s", action:"Clean shot: maple-cream pour of Willa's Kids into a glass over ice, condensation beading, backlight through the cup. Specs animate beside it: '8g protein · 6g sugar (organic maple) · DHA · top-9 allergen-free.' Text overlay: 'the after-the-heat refuel that actually feeds them.'"},
      {scene:"PAYOFF", time:"14-19s", action:"The kid grabs the cup, a big relieved gulp, then an exhale and a small grin. Tight on the carton face beside the empty-again glass; a Yuka-style '100/100' badge fades in. Text overlay: 'real protein + fiber. nothing neon.'"},
      {scene:"END CARD", time:"19-23s", action:"Cream background, Willa's Kids carton centered. Stinger resolves: 'same protein as dairy. half the sugar. Yuka 100.' Logo lockup fades up. End on the carton, still."}
    ],
    audio:"Warm narrative voiceover, parent-to-parent, over a lofi-warm summer beat with a light sport-day energy. VO leads with the feel-good benefit: 'after the heat, the reflex is a neon sports drink — sugar and food dye. this is the refuel that actually feeds them: real protein, fiber, plant-based DHA, nothing neon.' Conversational and relieved, never clinical. Ambient summer sound under the music — screen door, ice in the glass, a tired kid's exhale.",
    duration:"20-23 seconds",
    cta:{soft:"save this for after the next practice.", medium:"tap to see everything in Willa's Kids.", strong:"find Willa's Kids — the after-the-heat refuel that isn't just sugar."},
    benefitShorthandId:"BS-5"
  },
  {
    id:"JUL06-TT-5",
    platform:"TikTok",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Barista",
    dnaPattern:"viral-recipe-remix",
    timing:"Sun Jul 12 · 11am",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"no edits, no retakes — one iced oat latte, poured live.\" — live-format trust play",
    intel:[
      {type:"TREND", text:"Food creators are going live — TikTok LIVE cooking streams launched with Food Network talent Jul 1 and the platform named its 2026 food-creator class, signaling that real-time, unpolished, creator-fronted cooking is the format it's pushing next (T-8). Willa's answer leads from the pour, not the platform: a home-café iced oat latte built in one continuous take — Willa's Barista over ice, cream-blooming through the cubes, 50% less sugar than other barista oat milks and no rapeseed oil. It also lands mid iced-coffee season, when arabica spiked 6.71% in a day and the café upcharge keeps climbing (T-3) — so the value moved to the at-home cup. The format IS the hook: no edits, no retakes, just the real pour."},
      {type:"AUDIENCE", text:"Willa's viewer is scrolling a July FYP full of live, one-take cooking streams and #icedcoffee remakes (334M+ views) and half-suspects every glossy recipe video is over-produced. The trust unlock is watching the pour happen for real — one continuous take, a little unpolished, nothing hidden between cuts. She's also tired of paying the climbing café upcharge for an iced latte she could pour at home in ten seconds. Ride the 'made live, nothing to hide' feeling: the same read-the-label transparency Willa's already stands for, now proven by the format itself."},
      {type:"COMPETITOR", text:"Internal: the category is countering iced-coffee season with format-sprawl — barista editions, ready-to-drink iced coffees, low-sedimentation lines — chasing the summer coffee ritual with more SKUs (C-1). The whitespace on the live-cooking lane is focus, not range: one honest pour that wins on the back label instead of a product wall. Never name a competitor on the surface — let the real-time, one-take build and the clean label (no rapeseed, no gums, 50% less sugar) carry it."}
    ],
    hooks:[
      {text:"let's make an iced oat latte — live, one take (dairy-free!)", recommended:true},
      {text:"no edits, no retakes — iced oat latte, one pour, no cuts.", recommended:false},
      {text:"café iced latte, made live on camera — one pour, no machine, no cuts.", recommended:false}
    ],
    caption:"Iced-coffee season is peaking and the café upcharge keeps climbing — so here's the home-café pour, made live, no edits. ☕🧊\n\nWilla's Barista uses simple organic ingredients and the whole entire oat for a rich, smooth taste — with 50% less sugar than other barista oat milks and no rapeseed oil. 🥛\n\n**Ingredients**\n• ice, filled to the top\n• a double shot of cold brew or espresso\n• a splash of maple or vanilla, if you like\n• Willa's Barista Oat Milk, poured slow for the cream-bloom\n\nNo edits, no retakes — one iced oat latte, poured live. That's the whole video. Nourish the spark. ✨",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#icedcoffee",
      "#icedlatte",
      "#oatlatte",
      "#tiktoklive",
      "#baristaathome",
      "#dairyfree",
      "#proffee",
      "#nourishthespark"
    ],
    visual:"Bright, sunlit kitchen counter shot like a live stream — phone propped at a slightly-off, real angle, one continuous unpolished take, no glossy edit-cuts (that authenticity IS the format). No talent's face on camera — hands + product + counter + a small live-style corner text tag do everything. Morning-bright natural light, condensation already beading on a tall clear glass. The whole build reads as ONE pour caught in real time: a hand fills the glass with ice, pours a dark double shot of cold brew that swirls through the cubes, then lifts the Willa's Barista carton (label to camera, held on screen 40%+ of the frame) and pours slow so the oat cream blooms and marbles down through the coffee — the money shot, unhurried, uncut. Optional tiny maple drizzle. Keep the Barista carton in frame across the whole pour, label readable. Warm, true-to-life grade — not clinical, not stock-kitchen; a little handheld wobble is welcome. End card: clean cream background, the Barista carton standing beside the finished marbled iced latte in bright light, stinger text. Trend-forward, real, zero over-production — the un-edited pour is the point.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Cold open, live-stream framing: propped-phone angle on a sunlit counter, a tall glass and the Willa's Barista carton already in frame (label to camera). A hand gives a small casual wave-in. On-screen opening text (matches recommended hook): 'let's make an iced oat latte — live, one take (dairy-free!)'. Small live-style corner tag: 'no edits · no cuts'. One continuous take starts now."},
      {scene:"BUILD — ICE + COFFEE", time:"3-8s", action:"Same unbroken shot: hand fills the glass to the top with ice (cubes clink, real sound), then pours a dark double shot of cold brew or espresso that swirls and streaks down through the ice. Text overlay: 'ice to the top. a double shot of cold brew.' Handheld, real-time, no jump cut."},
      {scene:"THE POUR — WILLA'S BARISTA (payload)", time:"8-15s", action:"The money shot, held long: hand lifts the Willa's Barista carton (label facing camera, 40%+ of frame) and pours slow — the oat cream blooms and marbles down through the coffee in real time, no speed-up, no cut. Text overlay: 'Willa's Barista, poured slow — watch the cream bloom.' Let it breathe; the uncut bloom is the virality beat."},
      {scene:"PROOF", time:"15-20s", action:"Still one take: hand gives the glass a slow stir, taps the carton label twice. Text overlay: '50% less sugar than other barista oat milks. no rapeseed oil.' Casual, live-register — like showing a friend, not reading a spec sheet."},
      {scene:"END CARD", time:"20-24s", action:"Clean cream background, the Willa's Barista carton standing beside the finished marbled iced latte in bright morning light. Stinger text (BS-7 end card): 'Latte art. No rapeseed oil.' Small sign-off beneath: 'no edits. no retakes. nourish the spark.'"}
    ],
    audio:"Warm narrative voiceover in a casual, live-stream register — easy and a little off-the-cuff, like narrating a pour to friends in real time (never scripted-slick). Light, bright lofi beat under it, low enough to hear the real ice-clink and pour. No added jingle; the honest, un-edited sound of the build carries it.",
    duration:"15-25 seconds",
    cta:{soft:"would you film your iced latte in one take? drop your go-to pour 👇", medium:"skip the café upcharge — pour an iced oat latte at home with Willa's Barista, one take, no machine.", strong:"make the iced latte on camera tonight: cold brew, ice, and a slow pour of Willa's Barista."},
    benefitShorthandId:"BS-7"
  },
  {
    id:"JUL06-TT-7",
    platform:"TikTok",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Multi",
    dnaPattern:"meme-payload",
    timing:"Sun Jul 12 · 12pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"i bring up Willa's like it's my personality now.\" — fan-moment · meme reveal",
    intel:[
      {type:"PULSE", text:"The build-tension-then-drop reveal is the format eating the FYP in early July (CP-3) — creators stack an intro, then cut hard on the beat for the payoff. Willa's payload rides it clean: build through a scroll of real, gushing customer comments, then cut on the drop to ONE of them turned into the moment — printed as a limited label on the carton. The fan comment IS the review; the reveal IS the beat. Lead with the feel-good, let the format do the pacing."},
      {type:"AUDIENCE", text:"Willa's buyer is already doing this unprompted — she screenshots the 4-ingredient back label, tags Willa's in her cart pics, and name-drops it to anyone who'll listen. This isn't a review we're begging for; it's the word-of-mouth she's been leaving in the comments all summer. The move just hands her own comment back to her as the hero — which is why it lands as feel-good, not as an ask."},
      {type:"COMPETITOR", text:"Internal: a peer design-forward brand (C-2) turned a single fan's viral meme into a limited capsule that sold out in about 72 hours (Jul 1), seeded to creators with zero paid — proof that a design-led fan moment outruns any discount. Borrow the MOVE, not the product: creativity over couponing, a real customer's words made the moment. On the surface never name a competitor and never reach for a code or a sale — the whole point is that we didn't have to."}
    ],
    hooks:[
      {text:"you left the comment. we made it the moment — no coupon required.", recommended:true},
      {text:"you comment. we screenshot. it becomes the whole post."},
      {text:"the review that made our whole week: 'Willa's is my personality now.'"}
    ],
    caption:"you keep leaving comments like this one:\n\n\"i bring up Willa's like it's my personality now.\" 🥛\n\nso we did the only reasonable thing — we read it out loud and made it the whole post. no coupon, no code, no limited-edition anything. just your words, said right back to you, because you ARE the whole review.\n\nhere's the part that feels good: you're not gushing over a discount. you're gushing over 4 ingredients you can actually read, the whole oat kept whole, and a lineup — Willa's Original, Kids, Chocolate, Barista — you'd name-drop unprompted.\n\nkeep the comments coming. the next one might be the moment. 💛",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#youasked",
      "#madethemoment",
      "#oatmilkreview",
      "#cleaningredients",
      "#dairyfree",
      "#wholeplant",
      "#smallbrand",
      "#fyp"
    ],
    visual:"Bright, trend-forward, fast-cut TikTok-native — high-summer daylight, clean pale-wood or white counter, feel-good UGC energy. NO talent on camera (Christina Rule) — hands + product + comment screenshots + text overlays only. Open on a phone-screen-recording aesthetic: a TikTok comment section scrolling, full of real-feeling gushing Willa's comments, one highlighted and pulled forward. Build the stack, then a hard cut on the beat drop to a calm sunlit counter where a single hand presents a Willa's carton wrapped in a limited 'fan-comment' label — the customer's words printed as the design, Fishwife/Graza design-wit energy. Then a bright pan across the Multi lineup (Original, Kids, Chocolate, Barista), each carton wearing a different real comment as its label. Carton in frame 40%+, label sharp and legible. Palette: warm clean daylight against the phone-blue of the comment screen; the contrast between 'internet comment' and 'made real on the carton' IS the payoff. No price, no code, no sale on screen — the creativity is the whole flex.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Phone-screen-recording aesthetic: a TikTok comment section scrolls fast, packed with gushing Willa's comments, one glowing brighter than the rest. Text overlay (top): 'you keep commenting this…' · trending build-then-drop audio starts its intro. Comments stack toward the camera."},
      {scene:"BUILD", time:"3-7s", action:"Tension builds as the audio climbs — comments pull forward one by one, then freeze on the hero: '\"i bring up Willa's like it's my personality now\"' centered on screen. Text overlay: 'so we did the only reasonable thing.' Hold on the beat before the drop."},
      {scene:"DROP", time:"7-12s", action:"HARD CUT on the beat drop to a calm, bright sunlit counter — the REAL Willa's Original carton, and the fan comment blown up as big on-screen text right beside it (a pinned screenshot, not printed on anything). Text overlay: 'we made your comment the moment. no coupon. no code. no limited-edition anything.'"},
      {scene:"PAYOFF", time:"12-18s", action:"Bright pan across the full Multi lineup on the counter — Willa's Original, Kids, Chocolate, Barista — real cartons, with different real fan comments floating as on-screen text above each (screenshots, not labels). Text overlay: 'just 4 ingredients you can read + your words. the whole oat, kept whole.'"},
      {scene:"END CARD", time:"18-22s", action:"Hands lift the real Willa's Original carton toward camera; the hero comment sits as big on-screen text beside it (not on the carton). Text overlay stinger: 'keep commenting. the next one's the moment. 💛' Small Willa's logo bottom corner. Hold."}
    ],
    audio:"Warm narrative voiceover over a peaking trending build-then-drop TikTok sound for FYP reach — VO rides the intro, lands the reveal on the drop. VO beats: 'you keep leaving comments like this one … so we did the only reasonable thing. we made your comment the moment — no coupon, no code, just your words on the carton. because you're the whole review.' Keep it warm and a little delighted, never salesy; let the feel-good land on the drop.",
    duration:"15-25 seconds",
    cta:{soft:"drop your Willa's comment below — the next one might be the moment 💛", medium:"tell us why Willa's became your personality — the best one gets made into the moment", strong:"find the whole lineup — Willa's Original, Kids, Chocolate, Barista — at the link, then leave the comment we make famous"},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUL06-IG-R5",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Barista",
    dnaPattern:"before-after-stitch",
    timing:"Sun Jul 12 · 12pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"the home iced coffee just became the savvy one.\" — before/after iced-coffee stitch",
    intel:[
      {type:"TREND", text:"T-3: arabica futures posted their steepest one-day jump in four years (up 6.71% on Jul 2) after rain nearly 2,000% above average hit Brazil's Minas Gerais — right as mid-summer iced-coffee demand peaks and cold brew heads toward a $1.75B market. The café upcharge keeps climbing; the value quietly moved to the at-home iced cup. Willa's Barista is the pour that makes that home cup worth it — creamy over ice, 50% less sugar than other barista oat milks, no rapeseed. LEAD with the smart-pour payoff (delicious + savvy money move), NOT an ingredient teardown — Barista is the most-processed SKU, so keep it performance-and-value, never a comparison list."},
      {type:"AUDIENCE", text:"The home-café crowd is already rebuilding the iced-coffee run at home to skip the markup — proffee blends, cold-brew jars and DIY iced lattes are all over the FYP (CP-1, #icedcoffee 334M+ views). They want a cup that feels like a treat AND like a smart-money win. Open on the relatable confession — 'i did the math on my iced-coffee habit and moved the whole café home' — then reward them with a creamy pour that also reads clean on the back of the carton. The before is the $7 paper cup; the after is the one they pour themselves."},
      {type:"COMPETITOR", text:"Internal: C-1 — the biggest oat name is answering summer with format-sprawl (RTD iced coffees, Baristamatic, oatgurt, ice cream) instead of one sharp POV. Counter sprawl with focus: a single Barista iced-coffee moment that wins on the back of the carton — no rapeseed, no gums, 50% less sugar than other barista oat milks, 4g protein. Never name a competitor on the surface — use 'other barista oat milks' / 'the café upcharge' framing only."}
    ],
    hooks:[
      {text:"confession: i did the math on my iced-coffee habit and moved the whole café home. ☕🧊", recommended:true},
      {text:"not to be dramatic, but coffee prices spiked and my $7 iced latte and i are officially breaking up.", recommended:false},
      {text:"the café upcharge keeps climbing. my iced cup got better AND cheaper — here's the whole pour.", recommended:false}
    ],
    caption:"the smartest pour of the summer isn't at the café. it's the one you make over ice at home. ☕🧊\n\ncoffee prices are climbing and the iced-latte upcharge keeps creeping — so here's the move: cold brew or espresso over ice, a generous splash of Willa's Barista, done. creamy, cold, and it actually tastes like a treat.\n\nthe part that makes it the SMART pour is the back of the carton:\n• 50% less sugar than other barista oat milks\n• no rapeseed (canola) oil\n• no gums, no stabilizers\n• 4g protein · froths and pours creamy, hot or over ice\n\nsame café-quality cup, none of the café markup, and a label you can actually read.\n\nthe home iced coffee just became the savvy one. pour it, sip it, keep the $7. 🧊",
    hashtags:[
      "#willas",
      "#willasbarista",
      "#oatmilk",
      "#icedcoffee",
      "#icedlatte",
      "#homecafe",
      "#homebarista",
      "#coldbrew",
      "#norapeseed",
      "#lesssugar"
    ],
    visual:"Bright, sunlit home kitchen — warm daylight, airy, trend-forward, not muted brand-stock. Hands only, no talent on camera. Built as a clean before/after stitch: the BEFORE half is a to-go paper café cup with a long receipt beside it and a climbing price graphic; hard cut to the AFTER half — a home counter where hands pour Willa's Barista from the carton over a glass of iced cold brew, a glossy creamy swirl blooming through the ice (the pour is the hero). Willa's Barista carton sits in frame throughout the after beats, occupying 40%+, label legible. Overlay graphics in the Ingredients/Recipes green (#75C596): a 'CAFÉ' vs 'HOME' split-price card, then a 'BACK OF CARTON' proof card that flips in on the reveal. Olipop-cheeky-but-warm typography — knowing, a little smug, never combative. End on the finished iced coffee sweating beside the carton with the sign-off card. Color palette: creamy white, espresso brown, iced-glass condensation, soft daylight.",
    script:[
      {scene:"HOOK / BEFORE", time:"0-3s", action:"Tight shot, soft daylight: a hand sets down a generic to-go paper café cup next to a long curling receipt. Text overlay punches in (green #75C596, relatable-confession tone): 'confession: i did the math on my iced-coffee habit.' Quick beat-matched cut."},
      {scene:"THE MATH / BEFORE", time:"3-7s", action:"A climbing price graphic animates up over the paper cup — a 'CAFÉ' card ticking toward $7. Overlay: 'the upcharge kept creeping. so i moved the whole café home.' A stitch-style hard swipe wipes the café cup off-frame."},
      {scene:"AFTER — THE POUR", time:"7-13s", action:"Cut to a sunlit home counter: a glass full of iced cold brew. Hands pour Willa's Barista from the carton over the ice — a glossy creamy swirl blooms through the cubes in slow motion. Overlay: 'cold brew + a splash of Willa's Barista. that's it.' Carton label legible in frame."},
      {scene:"THE SMART PART", time:"13-18s", action:"Hand flips the Willa's Barista carton to the back label; a 'BACK OF CARTON' card flips in beside it. Proof lines stagger up: '50% less sugar than other barista oat milks · no rapeseed · no gums · 4g protein.' Cheeky stamp: 'the smart pour. 🧊'"},
      {scene:"PAYOFF", time:"18-22s", action:"Overhead: the finished iced coffee sweating beside the carton, creamy and cold. Overlay: 'same café cup. none of the markup.' Second line lands: 'keep the $7. 💸'"},
      {scene:"END CARD", time:"22-24s", action:"Willa's Barista carton centered beside the iced glass on a clean creamy-white background. Sign-off text: 'the oat milk your iced coffee deserves.' Small Willa's wordmark beneath. Cut to black."}
    ],
    audio:"Warm narrative voiceover, playful relatable-confession energy — Olipop-cheeky, a little smug-but-warm, never preachy. Upbeat lofi/jazzy coffee-shop bed underneath, light and bouncy. VO beats track the overlays: dry-funny on the receipt/café-math, lift on the creamy pour, drop a knowing beat on the back-of-carton flip, land soft on the 'keep the $7' close. Optional trending-audio swap if a peaking home-café/iced-coffee sound fits the cut.",
    duration:"15-25 seconds",
    cta:{soft:"would you make the switch to the home iced cup? tell us in the comments.", medium:"build one Willa's Barista iced coffee at home this weekend and skip the upcharge.", strong:"swap the café run for Willa's Barista over ice — same creamy cup, none of the markup."},
    benefitShorthandId:"BS-4"
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
  {icon:"↑", title:"\"eating less doesn't mean getting less.\" leads the week as the GLP-1 density Reel on Wed Jul 8.", reason:"Medicare's $50/month GLP-1 bridge program went live July 1 for nearly 4 million more beneficiaries — millions more eating with a smaller appetite, so every pour has to earn its calories. Willa's Original keeps real protein and fiber in the whole oat instead of filtering them out and processing the starch to sugar. We lead with the carton, the appetite shift is the backdrop — density, not filtered-out sugar. Kiki-Milk confidence, no diet-culture register.", agent:"trend"},
  {icon:"↑", title:"\"the beat drops — and so does the four-ingredient back label.\" goes BIG SWING on TikTok Wed Jul 8.", reason:"The build-tension-then-drop reveal is the format eating the FYP in early July — build through the intro, cut hard on the beat drop for the payoff. The drop IS the reveal, so the slow pour builds and the beat drops straight to the four-line back label. The format carries the reach; the short ingredient list is the payload. No competitor named — the four-line label is the whole contrast.", agent:"pulse"},
  {icon:"↑", title:"\"the glyphosate debate is reopening — our answer's already on the label.\" carries the second BIG SWING Thu Jul 9.", reason:"The EPA reopened its glyphosate risk assessment in early July — an authority window for the brand that already holds the cert. We lead with the receipt: certified glyphosate-free by The Detox Project, tested every lot. The news is the why-now, not the lead; no fearmongering, no victory lap. Patagonia gravity — the regulator restarts the debate, the carton already settled it.", agent:"trend"},
  {icon:"↑", title:"\"proffee, minus the chalk — 8g protein, all creamy swirl.\" rides FoodTok's proffee wave Fri Jul 10.", reason:"Protein iced coffee — proffee — is riding the #icedcoffee wave, but most builds lean on protein powder or Greek yogurt, leaving a clean opening for a creamy real-food dairy-free rebuild. We build it with cold brew plus Willa's Kids for 8g protein and a creamy swirl, no chalky powder. House recipe-video convention, 'let's make protein iced coffee (dairy-free!)' — the creamy swirl is the payload.", agent:"pulse"},
  {icon:"⚡", title:"\"the home iced coffee just became the savvy one.\" before/after iced-coffee stitch queued for Sun Jul 12.", reason:"Arabica spiked 6.71% on July 2 as iced-coffee season peaks — the café upcharge keeps climbing and the value moved to the at-home cup. We move the whole café home for the price of one cart run: Barista, 50% less sugar than other barista oat milks, no rapeseed, no gums. Olipop cheek — the savvy pour, styled to earn the screenshot, not a lecture on prices.", agent:"trend"},
  {icon:"⚡", title:"\"the refuel shouldn't be sugar and dye.\" after-the-heat kid refuel queued for Sat Jul 11.", reason:"FIFA's mandatory cooling breaks turned hydration into the World Cup's mid-summer storyline as the knockouts push toward the quarterfinals. We ride the after-the-heat refuel, not the match — post-practice, post-park, a creamy real-food Kids pour with protein and fiber instead of a sugar-and-dye sports drink. Kid-athlete, no watch-party framing; the kitchen is the hero, the match stays background.", agent:"pulse"},
  {icon:"↓", title:"Held the World Cup lane to the after-the-heat refuel over a watch-party or cooler-table pour.", reason:"The tournament is genuinely mass-cultural, but the watch-party and cooler-table beats were used back-to-back in the JUN 22 and JUN 29 refreshes and are rested. The fresh, non-table angle is the hydration-break heat storyline — a kid-athlete refuel after the game, the sport background and secondary. No sports-bro register; Willa's plays the kitchen, not the match.", agent:"pulse"},
  {icon:"×", title:"Killed the July-4 / 250th heritage-table re-run before it could anchor a card.", reason:"July 4 is over — it landed Saturday Jul 4 and the 250th heritage-table pour was the JUN 29 BIG SWING, burned indefinitely. Re-running cookout or Semiquincentennial content the week after reads as the engine looping a dead holiday. The fresh angle is post-cookout / back-to-routine — smaller appetites (GLP-1), mid-summer heat, iced-coffee season — carried by the density Reel and the iced-coffee stitch instead.", agent:"editor"},
  {icon:"×", title:"Killed the fibermaxxing / pulse-protein anchor before it could take a slot.", reason:"Fiber is still everywhere and beans-out-growing-meat is real, but fiber-trend-as-primary-anchor is oversaturated on the burn list and pulse-protein was the JUN 29 T-2 BIG SWING, rested through JUL 19. We folded the fiber-and-protein science into the GLP-1 density Reel and the whole-oat framing as supporting proof — the whole-oat answer is the lead, the trend is the backdrop.", agent:"editor"}
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
  total:15920,
  lift:46,
  sessions:1274,
  topRoiFormat:"Parent-confession Reel + format-as-virality stitch (cafeteria \"the one we'd actually send\" Reel peaked JUN 22)",
  topRoiPerBrief:1742,
  source:"Shopify + Klaviyo"
};

const AGENT_BY_ID = Object.fromEntries(AGENTS.map(a=>[a.id,a]));

// ─── Brief ↔ source links (the threading) ─────────────────
const BRIEF_LINKS = {
  "JUL06-TT-1":{
    trends:[
      "T-9",
      "T-1"
    ],
    pulse:[
      "CP-3"
    ],
    comps:[]
  },
  "JUL06-IG-R1":{
    trends:[
      "T-1"
    ],
    pulse:[
      "CP-5"
    ],
    comps:[]
  },
  "JUL06-PIN-1":{
    trends:[],
    pulse:[
      "CP-9"
    ],
    comps:[]
  },
  "JUL06-TT-2":{
    trends:[
      "T-1"
    ],
    pulse:[
      "CP-4"
    ],
    comps:[]
  },
  "JUL06-IG-R2":{
    trends:[
      "T-2"
    ],
    pulse:[],
    comps:[]
  },
  "JUL06-PIN-2":{
    trends:[],
    pulse:[
      "CP-2"
    ],
    comps:[]
  },
  "JUL06-IG-F1":{
    trends:[
      "T-10",
      "T-5"
    ],
    pulse:[],
    comps:[
      "C-3"
    ]
  },
  "JUL06-TT-3":{
    trends:[
      "T-4"
    ],
    pulse:[
      "CP-6"
    ],
    comps:[]
  },
  "JUL06-IG-R3":{
    trends:[],
    pulse:[
      "CP-1"
    ],
    comps:[]
  },
  "JUL06-PIN-3":{
    trends:[
      "T-7"
    ],
    pulse:[],
    comps:[
      "C-1"
    ]
  },
  "JUL06-IG-F2":{
    trends:[
      "T-4"
    ],
    pulse:[
      "CP-5"
    ],
    comps:[]
  },
  "JUL06-TT-4":{
    trends:[
      "T-4"
    ],
    pulse:[],
    comps:[]
  },
  "JUL06-TT-6":{
    trends:[],
    pulse:[
      "CP-8"
    ],
    comps:[
      "C-2",
      "C-3"
    ]
  },
  "JUL06-IG-R4":{
    trends:[],
    pulse:[
      "CP-7"
    ],
    comps:[]
  },
  "JUL06-TT-5":{
    trends:[
      "T-8",
      "T-3"
    ],
    pulse:[
      "CP-1"
    ],
    comps:[
      "C-1"
    ]
  },
  "JUL06-TT-7":{
    trends:[],
    pulse:[
      "CP-3"
    ],
    comps:[
      "C-2"
    ]
  },
  "JUL06-IG-R5":{
    trends:[
      "T-3"
    ],
    pulse:[],
    comps:[
      "C-1"
    ]
  }
};



// ─── Paid Amplify Plans (Paid Media Planner output) ──────
const AMPLIFY_PLANS = {
  "JUL06-IG-R1":{
    headline:"GLP-1 density Reel — lead the week as smaller appetites make every pour earn its calories, the whole oat keeping protein and fiber in",
    totalBudget:300,
    testWindow:"5 days (Wed Jul 8 → Sun Jul 12)",
    objective:"Saves + Shares",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"Medicare's $50/month GLP-1 bridge program went live July 1 for nearly 4 million more beneficiaries, on top of the ~1-in-5 households already on one (CNBC Jun 30, Science-Based Ingredients Jul 5). As appetites shrink, the food that gets eaten has to carry more nutrition per bite. We lead with the carton — Willa's Original keeps real protein and fiber in the whole oat instead of filtering them out and processing the starch to sugar. Density, not filtered-out sugar; the appetite shift is the backdrop. No diet-culture register, we name no one.",
    placements:[
      {platform:"Meta", format:"Reels Ad (IG Reels + FB Reels)", budget:300, audience:"Interest: Clean Label, High Protein, GLP-1 / Weight Management, Whole Foods, Organic Food, Gut Health, Fiber · Age: 28–52 · Behavior: Engaged with nutrition / clean-label content (30 days)", lookalike:"Klaviyo Willa's purchaser lookalike + high-protein / clean-label engaged audience", expectedReach:"80K–140K video views", note:"Optimize for Saves + Shares — the 'every pour earns its spot' beat is the share engine for the appetite-shift audience. Ship Wed Jul 8 midday. If sentiment holds above 0.88 through 72hr, extend to $400 for the full week ride."}
    ]
  },
  "JUL06-TT-1":{
    headline:"Build-then-drop label reveal — ride the FYP's build-tension-then-drop format and drop on the beat to the four-ingredient back label",
    totalBudget:250,
    testWindow:"4 days (Wed Jul 8 → Sat Jul 11)",
    objective:"Video Views + Saves",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"The build-tension-then-drop reveal is the format eating the FYP in early July (Buffer trending-songs Jul 3) — build through the intro, cut hard on the beat drop for the payoff. The drop IS the reveal, so the slow pour builds and the beat drops straight to the four-line back label. Format-as-virality has been the highest-reach lane all year; the format carries the reach, the four real ingredients are the payload. No competitor named — the four-line label is the whole contrast.",
    placements:[
      {platform:"TikTok", format:"Spark Ad", budget:250, audience:"Interest: Clean Label, Oat Milk, Dairy-Free, TikTok Food, Trending Audio, Label Check, FoodTok · Age: 22–42 · Behavior: Engaged with trending-format + recipe content (30 days)", lookalike:"Willa's Original engaged-non-follower lookalike + clean-label / FoodTok format audience", expectedReach:"85K–150K video views", note:"Optimize for Video Views first, Saves second — this rides a fast-moving format with a live audio, so ship inside the window. The build is the hook; keep the drop-to-label clean. If the format cools before Day 3, redirect budget to JUL06-IG-R1."}
    ]
  },
  "JUL06-IG-R2":{
    headline:"Glyphosate-free cert receipt — ride the reopened EPA review with the cert already on the label, receipt-first",
    totalBudget:240,
    testWindow:"4 days (Thu Jul 9 → Sun Jul 12)",
    objective:"Saves + Profile Visits",
    guardrail:"Auto-pause if CPM exceeds $9 or sentiment drops below 0.85",
    why:"The EPA reopened its glyphosate draft risk assessment in early July (Daily Signal Jul 1, USDA ERS Jun 30), reopening the grain-residue question across the aisle — an authority window for the brand that already tests every lot. We lead with the receipt: certified glyphosate-free by The Detox Project, tested every lot. The news is the why-now, not the lead; no fearmongering, no victory lap. We name no one — the cert is the whole statement.",
    placements:[
      {platform:"Meta", format:"Reels Ad (IG Reels + FB Reels)", budget:240, audience:"Interest: Clean Label, Organic Food, Non-GMO, Glyphosate / Pesticide-Free, Whole Foods, Sprouts, Mom-Founded · Age: 28–50 · Behavior: Engaged with clean-label / food-safety content (30 days)", lookalike:"Willa's Original engaged-non-follower lookalike + clean-label / organic-shopper audience", expectedReach:"70K–120K video views", note:"Optimize for Saves. Let the receipt land as matter-of-fact authority, never a callout — 'we already tested for this' is the whole move. Ship Thu Jul 9 midday while the EPA news is live."}
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
  {date:"Sun Jul 5 · 22:10", agent:"composer", msg:"17 briefs delivered for the week of JUL 6 – JUL 12 · 3 BIG SWINGs (GLP-1 density \"eating less doesn't mean getting less\" · build-then-drop four-ingredient label reveal · glyphosate-free cert receipt) · 5 HIGH · post-cookout mid-summer + GLP-1 + glyphosate + iced-coffee spine"},
  {date:"Sun Jul 5 · 21:15", agent:"editor", msg:"Caption variants drafted across the slate (direct / warm / punchy) · brand-voice default · Willa's capitalized in caption bodies · recipe briefs on the 'let's make [recipe]' house convention · Christina reserved for the heritage from-scratch kitchen POV only, brand 'we' voice everywhere else"},
  {date:"Sun Jul 5 · 18:20", agent:"trend", msg:"Medicare's $50/month GLP-1 bridge confirmed live July 1 for ~4M more beneficiaries (CNBC Jun 30 · Science-Based Ingredients Jul 5) — BIG SWING \"eating less doesn't mean getting less\" density Reel queued, protein and fiber kept in the whole oat, appetite shift as backdrop"},
  {date:"Sun Jul 5 · 16:50", agent:"pulse", msg:"Build-tension-then-drop reveal confirmed as the format eating the FYP (Buffer trending-songs Jul 3) — BIG SWING build-then-drop queued, slow pour builds and the beat drops to the four-ingredient back label as the payload"},
  {date:"Sun Jul 5 · 15:35", agent:"trend", msg:"EPA reopening its glyphosate draft risk assessment confirmed early July (Daily Signal Jul 1 · USDA ERS Jun 30) — BIG SWING \"our answer's already on the label\" cert receipt queued, certified glyphosate-free, tested every lot, the news as why-now"},
  {date:"Sun Jul 5 · 14:20", agent:"pulse", msg:"Proffee riding the #icedcoffee wave with a clean dairy-free opening (TikTok #icedcoffee) — \"proffee, minus the chalk\" remix queued, cold brew plus Willa's Kids for 8g protein and a creamy swirl, no chalky powder"},
  {date:"Sun Jul 5 · 13:05", agent:"trend", msg:"Arabica up 6.71% July 2 as iced-coffee season peaks and cold brew heads toward $1.75B (Perfect Daily Grind Jul 3 · Tastewise Jul 1) — \"the home iced coffee just became the savvy one\" before/after Barista stitch queued"},
  {date:"Sun Jul 5 · 11:45", agent:"pulse", msg:"FIFA cooling breaks turning hydration into the World Cup's mid-summer storyline, players losing 1-2L/hr (Forbes Jul 3) — \"the refuel shouldn't be sugar and dye\" after-the-heat Kids Reel queued, kid-athlete, no watch-party framing"},
  {date:"Sun Jul 5 · 10:30", agent:"comp", msg:"Logged a peer turning a fan meme into a sold-out limited capsule in ~72 hours (Fast Company/TikTok Jul 1) — countered with \"you left the comment, we made it the moment,\" a real customer line elevated, creativity over couponing"},
  {date:"Sat Jul 4 · 18:35", agent:"editor", msg:"Killed 6+ stale or burned-lane signals: July-4 / 250th heritage-table (holiday over, JUN 29 BIG SWING burned) · fibermaxxing + pulse-protein anchor (oversaturated, JUN 29 rested) · front-of-pack label cycle (burned) · IDFA school-dye ban (policy-dupe) · childhood-hunger charity peg (generosity fail) · UFC + stale watermelon/meat sources (skip list + recency gate)"},
  {date:"Sat Jul 4 · 15:15", agent:"perf", msg:"Rolled JUN 22-28 results into the Performance window (2-week lag) — 17 shipped, ~2.81M reach, 6.8× avg saves-delta · the cafeteria \"the one we'd actually send\" parenting Reel was the saves hero (8.9×) · escalated the parent-confession register into the milk-aisle macro-count pour this week"},
  {date:"Sat Jul 4 · 13:00", agent:"visual", msg:"Visual direction set bright + trend-forward across the slate — hands + product + kitchen default, Christina reserved for the from-scratch heritage kitchen POV only, styled iced-coffee pours to win the screenshot, drop-on-the-beat label reveal · phone-mockup scripts populated on all 12 Reels + TikToks"}
];


// ─── Killed signals (the ones we said no to) ──────────────
const KILLED = [
  {signal:"July-4 / Semiquincentennial / heritage-table framing + World Cup watch-party/cooler/table pour", reason:"July 4 is over (it landed Saturday Jul 4) and the 250th heritage-table pour anchored the JUN 29 BIG SWING — burned indefinitely. The World Cup watch-party/cooler/table beat is rested through JUL 19 after back-to-back JUN 22 + JUN 29 use. Reopened the World Cup only via a genuinely fresh, non-table angle: the hydration-break heat storyline (the after-the-heat kid refuel).", by:"Cultural Editor"},
  {signal:"Fibermaxxing surge + pulse/legume protein 'beans out-growing meat' as a lead anchor", reason:"Fiber-trend-as-primary-anchor is explicitly oversaturated on the burn list (APR 20, APR 27, MAY 11, MAY 18) and pulse-protein 'beans out-growing meat' was the JUN 29 T-2 BIG SWING, rested through JUL 19. Folded the fiber-and-protein science into the GLP-1 density Reel and the whole-oat framing as supporting proof — never its own card this week.", by:"Cultural Editor"},
  {signal:"FDA-USDA ultra-processed-food definition / front-of-pack red/yellow/green labeling cycle", reason:"The front-of-pack green/yellow/red and 'read the label' lanes were burned across the JUN 22 refresh and rested through JUL 12. Surfaced the adjacent-but-distinct FDA plant-milk naming guidance (T-9) as the fresh transparency angle and let the glyphosate reassessment (T-2) carry the policy-authority slot with a Willa's-specific cert payload.", by:"Cultural Editor"},
  {signal:"IDFA removes synthetic dyes from school dairy by July 2026 (USDA/FDA, Jul 1)", reason:"Genuinely fresh, but the dye-ban / petroleum-colorant lane was mined JUN 22 and reads as the same food-reform-policy card the audience just saw. Held it to keep the week from stacking two label/dye policy trends; the glyphosate reassessment carries the fresh policy-authority slot instead.", by:"Cultural Editor"},
  {signal:"'Nourish the American Dream' childhood-hunger campaign, July 4th week (Motherly, Jul 1-7)", reason:"Real and in-window, but a brand riding a childhood food-insecurity charity moment reads as opportunistic and tips into the heavy/earnest register Willa's voice avoids — there's no clean, joyful Willa's bridge. Skipped rather than forced.", by:"Cultural Editor"},
  {signal:"UFC 329 McGregor vs Holloway 2 (Jul 11) + watermelon-cooler Pinterest surge + early-meat-introduction allergy study", reason:"UFC is on the permanent sports-bro skip list. The watermelon-cooler and meat-introduction sources both fail the 7-day recency gate, and meat-forward framing is off-brand for a plant-milk. Kept the in-window coconut cooler (CP-9) as the fresh summer-drink recipe instead.", by:"Cultural Editor"},
  {signal:"Almond-mom vs beta-mom archetype quiz + standalone DHA-deficiency kids' anchor", reason:"The mom-archetype quiz was mined to exhaustion (JUN 15 'oat mom,' JUN 22 'beta mom') and the algae-DHA kids' lane is rested through JUL 12. Kept only the food-freedom VALUE of the butter-mom conversation (CP-5) — anti-diet-culture, not the archetype quiz — and led the kids' lane on whole-food quality, not the DHA stat.", by:"Cultural Editor"}
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
  "JUL06-TT-1":{direct:"Willa's Original is the whole plant milk — four real ingredients, and it pours rich, smooth and creamy. 🥛\n\nHere's what the drop lands on: the whole entire oat groat (bran, germ and all), not oat syrup. Most oat milks filter out both the protein AND the fiber, then process the starch into sugar. We keep the good stuff in — which is exactly why it tastes like more, not less.\n\nWhat's actually in the cup:\n• 1g sugar (from the oats, nothing added)\n• 4g+ protein\n• 2g+ prebiotic fiber (the gut-supporting fiber in whole oats)\n• 4 real ingredients, no isolates, no gums\n\nOrganic whole grain oats. Filtered water. Organic vanilla extract. Sea salt. That's the whole list. 📋\n\nUSDA Organic. Non-GMO. Certified glyphosate-free — tested every lot. The label that reads better the longer you look.", warm:"POV: the beat builds. the pour keeps going. and right on the drop — four ingredients, nothing to hide. ✋🥛\n\nWilla's Original uses the whole entire oat — bran, germ and all — so you keep the protein and fiber most oat milks filter out. Rich, smooth, 1g sugar, four real ingredients… and shhh, the back label reads like a grocery receipt, not a chemistry set.\n\nlet the frame hold.", punchy:"the beat drops — and so does the four-ingredient back label. whole oat, 1g sugar, rich + creamy, nothing to hide. ✋🥛"},
  "JUL06-IG-R1":{direct:"Eating less doesn't mean getting less.\n\nWilla's keeps the whole entire oat — so the protein and fiber stay in, not get filtered down to sugar like most oat milks. 1g sugar · 4g+ protein · 2g+ prebiotic fiber · 4 ingredients. That's what density looks like.\n\nWith Medicare's new coverage bringing GLP-1 medications — the appetite-shrinking shots like Ozempic — to millions more this July, a lot of people are simply eating less. Which means what makes it into the cup has to carry more. That's exactly when it matters what's in the pour.\n\nEvery pour:\n· Willa's Original Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup 🥛\n· 1g sugar · 4g+ protein · 2g+ prebiotic fiber · 4 ingredients\n· Organic. Certified glyphosate-free, tested every lot. Nothing filtered out.\n\nNo rules, no guilt — just real food that pulls its weight. Make each pour count.\n\nNourish the spark in everyone.", warm:"Willa's keeps the whole entire oat — protein and fiber in, nothing filtered out. 💙 So if you're eating a little less this summer, here's what matters: the food that makes it into your cup should carry more, not less. 1g sugar, 4g+ protein, 2g+ prebiotic fiber, 4 organic ingredients. No rules, no guilt — just a pour that pulls its weight. Make each one count.", punchy:"eating less? then every pour has to earn it. Willa's Original — whole oat, 4g+ protein, 2g+ fiber, 1g sugar, nothing filtered out. 💙"},
  "JUL06-PIN-1":{direct:"The drink of the summer isn't a coffee. ☀️🥥 This creamy coconut cooler is coconut water, fresh lime and a splash of Willa's Original over a full cup of ice — tropical, refreshing, and dairy-free, with none of the sugar a canned coconut cream would sneak in. Willa's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 That whole-oat body is the whole trick — it gives the cooler a creamy swirl without any syrup, so it pours into a travel tumbler and heads straight out the door.\n\nIngredients\n- 1 cup coconut water\n- 1/3 cup Willa's Organic Oat Milk\n- juice of 1/2 lime (plus a wheel to garnish)\n- 1 cup ice\n- optional: a few fresh mint leaves, splash of pineapple juice\n\nBuild it: fill a tumbler with ice, pour in the coconut water, add the lime juice, then float the Willa's Original on top for the creamy swirl. Stir, lid on, go.", warm:"tropical, creamy, cold — and not a coffee in sight. 🥥 this coconut cooler is just coconut water, lime and a splash of Willa's Original over ice, no syrup and no dairy. Willa's Original is 4 ingredients and 1g sugar, made from the whole oat groat, so it keeps the fiber and protein most milks filter out — and gives the cooler its creamy swirl without a drop of coconut cream. pour it in the tumbler, straw in, out the door.", punchy:"coconut cooler > iced coffee this week. coconut water + lime + a splash of Willa's Original over ice. creamy, tropical, zero syrup, zero dairy. 🥥🥛"},
  "JUL06-TT-2":{direct:"Willa's Original is real food that actually fills you up — 4g+ protein, 2g+ prebiotic fiber (the kind that supports gut health), 1g sugar, 4 ingredients. No pour is a weight-loss shortcut, and we'd never sell you one.\n\nHere's the honest version: the 'drink this instead of Ozempic' clips — the wave of DIY 'natural Ozempic' videos riding the weight-loss-drug headlines — get one thing right. The instinct toward real, filling food is good. The claim that a soaked-oat shake mimics the medication (the drug that tells your body it's full) is the part that isn't true.\n\nSo skip the shortcut. Real food that keeps you satisfied is the move that actually holds up: the whole oat groat kept in — bran, germ, and all — so the protein AND the fiber stay in the cup. Most oat milks filter out both, then process the starch into sugar. We don't.\n\nOrganic. Non-GMO. Certified glyphosate-free. WBENC women-owned.\n\nNo pour replaces the medication. But food that actually fills you up? That part's real.", warm:"gently, from the kitchen table: no drink replaces the medication. 🥛 the 'natural Ozempic' clips have the right instinct — real, filling food — and the wrong science.\n\nWilla's Original is the honest version: the whole oat kept in, so 4g+ protein + 2g+ fiber stay in the cup. 1g sugar, 4 ingredients, organic + glyphosate-free.\n\nshhh… no shortcuts sold here. just food that actually fills you up.", punchy:"no, your oat milk isn't Ozempic. it's just real food that keeps you full — Willa's Original: 4g+ protein, 2g+ fiber, 1g sugar, 4 ingredients. organic + glyphosate-free. 🥛"},
  "JUL06-IG-R2":{direct:"Willa's Original is Certified Glyphosate Residue Free — tested every single lot, by the Detox Project (the lab that runs third-party, lot-level residue certification). 🌾 Not \"we're pretty sure it's clean.\" Tested. Documented. On the label long before the news cycle came back around.\n\nThe glyphosate question landed back on the regulators' desk in early July 2026 — a fresh federal review of the residue that rides along with commodity grain. Good time to check what's actually been done about it. And a residue cert isn't a claim you make; it's one you earn, lot by lot, in a lab.\n\nWilla's Original keeps it simple where it counts: 4 ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber (the kind that feeds gut health), 1g sugar. The whole oat groat, bran and germ and all. Sourcing you can actually check. 🥛\n\nThe glyphosate debate is reopening — our answer's already on the label.\n\nUSDA Organic · Non-GMO · Certified Glyphosate Residue Free · Kosher · Vegan · WBENC · Zero Food Waste · 4g+ protein · 2g+ fiber · 1g sugar", warm:"shhh… here's the thing about a residue cert: you don't get to just say it. you earn it, lot by lot, in a lab. the glyphosate question is back in the news — early July 2026 — and Willa's Original answered it a while ago. Certified Glyphosate Residue Free, tested every lot. 🌾 4 ingredients, organic whole oat, 1g sugar. sourcing you can check, not a claim you take on faith.", punchy:"the glyphosate debate is reopening — our answer's already on the label: Willa's Original is Certified Glyphosate Residue Free, tested every lot. 🌾"},
  "JUL06-PIN-2":{direct:"the heat-wave dessert is just frozen chocolate oat milk. 🍫\n\npour Willa's Chocolate into pop molds, freeze, done — no cooking, no dairy, no 20-ingredient fudge recipe. real cocoa and the whole oat kept whole, so it's a treat you can actually read the back of.\n\n4 ingredients in, one no-cook dessert out. save it for the next 95° afternoon.", warm:"shhh… the easiest chocolate treat of the summer is three steps: pour Willa's Chocolate, freeze, unmold. 🍫 real cocoa, whole oat, no dairy — a fudge pop with 4 ingredients you can read. the kids will not know it's the 'clean' one.", punchy:"pour. freeze. done. frozen chocolate oat milk pops — 4 ingredients, zero cooking. 🍫"},
  "JUL06-IG-F1":{direct:"Clean label made it to the warehouse aisle — and this pour was already there. 🛒\n\nTransparent ingredients used to mean a special trip to the natural-foods aisle. Now the big-box shelf is stocked with kids' snacks parents can actually read — proof that 'what parents feed their kids' became a mainstream buying filter. Willa's Kids has been built for that cart the whole time:\n\n- made from the whole oat — real food, not oat syrup\n- 8g protein — the same as dairy\n- top-9 allergen-free — no nut, soy, gluten, dairy, sesame\n- USDA Organic · plant-based DHA · Yuka 100 (the Clean Label App's highest score)\n\nNo mystery ingredient to Google mid-aisle, no trade-off between organic and simple. Just the recognizable-ingredient pour you'd already reach for. Parents asked us to make a carton they could trust on sight — we listened. 🥛\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC", warm:"psst — clean label finally made it to the warehouse aisle, and Willa's Kids has been built for that cart all along. whole oat, 8g protein, top-9 allergen-free, USDA Organic, Yuka 100 (the Clean Label App's highest score). no ingredient you need to Google between the rotisserie and the paper towels. the pour you'd already reach for. parents asked us for a carton they could trust on sight — we listened. 🛒", punchy:"a label you can read in the aisle. into the cart it goes. 🥛"},
  "JUL06-TT-3":{direct:"Mid-summer means the kids want in on everything — so we made a pour they can build start to finish, no grown-ups required. 🫐☀️ Shake, pour, and that first proud sip: it's the kind of little win that makes a whole afternoon.\n\nWilla's Kids Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, creamy taste — plus 8g protein, DHA, and it's free of the top 9 allergens, so it's the one carton you can hand over without a second thought. 🥛\n\nIngredients:\n- 1 cup Willa's Kids Organic Oat Milk\n- ¼ cup frozen blueberries\n- 1 tsp maple syrup (optional)\n- a handful of ice\n- 1 jar with a tight lid, for shaking\n\nHave your kid pour the Willa's Kids into the jar, drop in the frozen blueberries and a little maple, snap the lid on tight, and shake until it's frothy and purple. Pour over ice — and let them take the credit. 💜", warm:"shhh… the best summer snack is the one they make without you. 🫐 a jar, a handful of frozen blueberries, a little maple, and a cup of Willa's Kids — shake it frothy and purple, pour it over ice. Willa's Kids does the creamy work with 8g protein, DHA and top-9 allergen-free, so 'she made it herself' is a full yes. no grown-ups required. ☀️", punchy:"berry shake-up a kid can make solo: Willa's Kids + frozen blueberries + a little maple, shaken frothy and poured over ice. no grown-ups required. 🫐💜"},
  "JUL06-IG-R3":{direct:"Proffee — that's protein + coffee — took over FoodTok (the recipe corner of TikTok), so it took over our cold brew. ☕️💪 The creamy, high-protein iced coffee that skips the chalky powder and the dairy entirely — just cold brew and a slow pour that swirls itself.\n\nWilla's Kids Organic Oat Milk brings 8g of plant protein, DHA omega-3s, and top-9-allergen-free simple ingredients to the glass — turns out the carton kids love makes the creamiest iced coffee too, no scoop of grit required. 🥛\n\nIngredients\n- 1 cup cold brew coffee (or strong chilled coffee)\n- 1 cup Willa's Kids Organic Oat Milk, chilled\n- a tall glass of ice\n- optional: 1/2 tsp vanilla + a small drizzle of maple syrup\n\nFill the glass with ice, pour the cold brew, then pour the Willa's Kids slowly over the top and watch it swirl. Give it one stir if you can't wait. Proffee, minus the chalk — 8g protein, all creamy swirl.", warm:"The proffee wave finally hit our kitchen — protein iced coffee, but make it dairy-free and actually creamy. ☕️ No chalky powder, no scoop of grit. Just cold brew and a slow pour of Willa's Kids that swirls itself.\n\n8g plant protein, DHA, top-9 allergen-free. shhh… the carton the kids love makes the best iced coffee in the house.", punchy:"proffee, minus the chalk. ☕️ cold brew + Willa's Kids = 8g protein and all creamy swirl. no powder, no dairy."},
  "JUL06-PIN-3":{direct:"summer decided every sip has to 'do something' now — so the counter filled up with scoops, tubs and a shaker bottle that never fully rinses. 🥄 here's the shortcut: functional sip, minus the powder stack — real cacao and the whole oat already did the work.\n\nWilla's Chocolate is 5 ingredients, real cacao, 5g protein and 11g sugar per cup — Good Food Awards Best Beverage. it's functional because of what it's made of, not what got scooped on top: Willa's keeps the whole oat groat, bran and germ and all, so the protein and fiber stay in instead of getting filtered out and the starch processed into sugar.\n\nno adaptogen dust (those mushroom-blend and herb-powder jars), no chalky aftertaste, no 12-jar shelf — just a creamy chocolate pour over ice.\n\nUSDA Organic · Non-GMO · Certified glyphosate-free, tested every lot · WBENC women-owned.\n\nthe real food is the function. Nourish the spark in everyone.\n\n#willas #oatmilk #chocolateoatmilk #functionaldrinks #realfood #dairyfree #cleanlabel #wholeplant #summersips #nopowder", warm:"the 'functional' sip got complicated — scoops, tubs, a shaker bottle that smells forever. shhh… the creamy one on the right is just 5 ingredients and real cacao. 🍫 Willa's Chocolate keeps the whole oat, so the protein and fiber stay in — no powder stack required. functional because of what it's made of, not what you scooped on top.", punchy:"powder stack: retired. 🍫 Willa's Chocolate — real cacao, 5 ingredients, the whole oat already did the work."},
  "JUL06-IG-F2":{direct:"Willa's Original was never a 'good' food or a 'bad' one — it's just real breakfast. 🌾\n\nThat math — is this a good food? Should I feel something about it? — isn't yours to run anymore. 'Butter mom' summer (the TikTok pushback on food ranking — almond mom = restriction, butter mom = abundance) put a name on what already feels right at the table: no morality, just food.\n\nThe whole oat does the work:\n\n- 1g sugar, from the oats, nothing added\n- 4g+ protein, more than any oat, almond, pistachio, or coconut milk\n- 2g+ prebiotic fiber\n- 4 ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt\n\nNo good-food, bad-food math at this table — just breakfast, poured without a second thought. A kid can grow up with food they can read, and nobody has to feel anything about it but full. 🥛\n\nUSDA Organic · Non-GMO · Certified Glyphosate-Free · WBENC", warm:"shhh… you're allowed to pour your kid a glass without ranking it first. 'butter mom' summer (the anti-restriction one — almond mom = rules, butter mom = abundance) already knew that. Willa's Original is just real: 1g sugar, 4g+ protein, the whole oat, 4 ingredients. no morality, no math — just breakfast. 🌾", punchy:"no 'good' list. no 'bad' list. just breakfast. 🥛"},
  "JUL06-TT-4":{direct:"somewhere along the way, feeding your kid turned into math — grams of protein up, grams of sugar down, a running tally in your head at the milk aisle. 🍎 you can put the calculator down. Willa's Kids is organic, recognizable ingredients and the whole oat groat, bran and germ and all — with 8g protein, added DHA for growing brains, top-9 allergen-free, and a Yuka score of 100 (Yuka — the clean-label app — grades every grocery 0–100). it isn't a number to chase; it's just real food in a carton kids actually reach for. because good nutrition was never supposed to be a spreadsheet — parents asked, we listened. 🌾", warm:"remember when 'is this good for them?' had a simple answer? 🍎 Willa's Kids brings it back — organic, recognizable, the whole oat, 8g protein and DHA for growing brains. no macros to tally, no label to decode. shhh… the good stuff was never a number to chase.", punchy:"put the protein calculator down. Willa's Kids is real food, not a number to chase. 🍎🌾"},
  "JUL06-TT-6":{direct:"the from-scratch kitchen isn't a trend to us — it's the recipe grandmother Willa passed down.\n\nwith Netflix reviving 'Little House on the Prairie' (Jul 9), everyone's suddenly chasing that sunlit, slow, real-ingredient homestead kitchen. it's the exact place Willa's has lived since day one — named for grandmother Willa, born 1921. real food, passed down. reinvented forward.\n\nwhat 'from scratch' actually means in the carton:\n• Willa's Original is 4 ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt. that's it.\n• made from the whole oat groat (the whole oat kernel — bran, germ and all), not oat syrup\n• 1g sugar, with more protein and fiber left in — because most oat milks filter both out, then process the leftover starch into sugar\n• USDA Organic · Certified glyphosate-free (tested every lot) · Zero Food Waste\n\nno set dressing required. the unhurried, real-ingredient kitchen everyone's romanticizing is just… how we've always made it. nourish the spark.", warm:"shhh… the 'from-scratch' kitchen everyone's romanticizing this summer? you don't need a prairie for it. 🌾\n\ngrandmother Willa cooked with real ingredients because that's all there was — and it's still all we put in the cup. four things in Willa's Original, the whole oat, nothing filtered out. real food, passed down. nourish the spark.", punchy:"before 'from scratch' was an aesthetic, it was just how grandmother Willa cooked. 4 ingredients, the whole oat, organic. still is. 🌾"},
  "JUL06-IG-R4":{direct:"The game gave everything to the heat. The refuel shouldn't be sugar and dye. ⚽️\n\nAfter the park, after practice, the reflex is a neon sports drink — 20+ grams of sugar and a coloring you can't pronounce. Willa's Kids is the after-the-heat pour that actually feeds them: 8g protein (same as dairy), 6g sugar from organic maple, plant-based DHA from algae, top-9 allergen-free.\n\nWe use the whole oat — bran and germ and all, not oat syrup — so the protein and fiber stay in, Yuka — the clean-label app that scans groceries, 0–100 — scored it 100/100, and there's nothing neon in the cup.\n\nThe World Cup made hydration the story of the summer — even the pros stop for cooling breaks. Kids sweat through the heat too. The refuel is where it counts. 🥛\n\nParents asked us for a carton they could hand over red-cheeked and thirsty and feel good about. We listened.\n\nUSDA Organic · Non-GMO · top-9 allergen-free · Yuka 100 · WBENC", warm:"the walk to the car: red cheeks, empty water bottle, and a hand already reaching for the neon drink. shhh… there's a better refuel. Willa's Kids pours creamy over ice with 8g protein, organic maple, plant-based DHA, top-9 allergen-free — the after-the-heat cup that feeds them instead of just fizzing. ⚽️", punchy:"post-practice pour ≠ a neon sugar drink. Willa's Kids: 8g protein, real maple, nothing neon. the after-the-heat refuel. 🥛"},
  "JUL06-TT-5":{direct:"Iced-coffee season is peaking and the café upcharge keeps climbing — so here's the home-café pour, made live, no edits. ☕🧊\n\nWilla's Barista uses simple organic ingredients and the whole entire oat for a rich, smooth taste — with 50% less sugar than other barista oat milks and no rapeseed oil. 🥛\n\n**Ingredients**\n• ice, filled to the top\n• a double shot of cold brew or espresso\n• a splash of maple or vanilla, if you like\n• Willa's Barista Oat Milk, poured slow for the cream-bloom\n\nNo edits, no retakes — one iced oat latte, poured live. That's the whole video. Nourish the spark. ✨", warm:"shhh… the secret to the iced latte that beats the café upcharge? one pour, no fancy machine. Willa's Barista over ice, watch the cream bloom through the cubes — and yes, we filmed the whole thing in one take. real coffee, real oat, no rapeseed oil. 🧊☕", punchy:"no edits, no retakes — one iced oat latte, poured live. (Willa's Barista, 50% less sugar than other barista oat milks, no rapeseed oil.)"},
  "JUL06-TT-7":{direct:"you keep leaving comments like this one:\n\n\"i bring up Willa's like it's my personality now.\" 🥛\n\nso we did the only reasonable thing — we read it out loud and made it the whole post. no coupon, no code, no limited-edition anything. just your words, said right back to you, because you ARE the whole review.\n\nhere's the part that feels good: you're not gushing over a discount. you're gushing over 4 ingredients you can actually read, the whole oat kept whole, and a lineup — Willa's Original, Kids, Chocolate, Barista — you'd name-drop unprompted.\n\nkeep the comments coming. the next one might be the moment. 💛", warm:"shhh… we read every single comment. 🤫\n\nand when one made us feel this good — 'i bring up Willa's like it's my personality now' — we didn't reach for a discount code. we made your words the moment instead. the whole oat kept whole, and the next moment? it could be your comment. 💛", punchy:"you left the comment. we made it the moment — no coupon, just 4 ingredients and your words. 🥛"},
  "JUL06-IG-R5":{direct:"the smartest pour of the summer isn't at the café. it's the one you make over ice at home. ☕🧊\n\ncoffee prices are climbing and the iced-latte upcharge keeps creeping — so here's the move: cold brew or espresso over ice, a generous splash of Willa's Barista, done. creamy, cold, and it actually tastes like a treat.\n\nthe part that makes it the SMART pour is the back of the carton:\n• 50% less sugar than other barista oat milks\n• no rapeseed (canola) oil\n• no gums, no stabilizers\n• 4g protein · froths and pours creamy, hot or over ice\n\nsame café-quality cup, none of the café markup, and a label you can actually read.\n\nthe home iced coffee just became the savvy one. pour it, sip it, keep the $7. 🧊", warm:"the smart-money iced coffee this summer? the one you pour at home. 🧊\n\nWilla's Barista over ice — creamy, cold, 50% less sugar than other barista oat milks, no rapeseed. same treat, none of the café markup.\n\nshhh… it tastes better than the upcharge anyway.", punchy:"café prices up, your iced coffee just got better. Willa's Barista over ice — 50% less sugar than other barista oat milks, no rapeseed, all creamy. the smart pour. keep the $7. 🧊☕"}
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
  happened:"The oat category stayed quiet mid-July, but peers won on personality and timing — Graza's fan-meme capsule sold out in about 72 hours (Jul 1) and Poppi shipped a Spider-Man IP box (Jun 29), while the biggest oat name leaned on format-sprawl (RTD iced coffees, Baristamatic) rather than a sharp summer POV.",
  coming:"Medicare's GLP-1 expansion (Jul 1) and the EPA reopening the glyphosate question put nutrient-density and clean sourcing back in the spotlight; iced-coffee season peaks as arabica prices spike, and the World Cup knockouts keep heat and real-fuel in the cultural air.",
  plays:"About 15-17 briefs on the table; the two biggest are a GLP-1 nutrient-density Original answer — every pour has to earn its calories now — and a glyphosate-authority Reel that rides the EPA news with 'certified glyphosate-free, tested every lot.'"
};


// ─── Performance · Week of MAY 25 – MAY 31 results ──────────────
const LAST_WEEK_RESULTS = [
  {id:"JUN22-IG-R2", concept:"\"the one we'd actually send.\" — cafeteria plant-milk parenting Reel", platform:"IG Reel", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"New cafeteria plant-milk slot, a parent's note unlocks a dairy-free pour for the lunch line (JUN 22)", trendId:null, views:541000, saves:35200, shares:18100, comments:2740, savesDelta:8.9, sentiment:0.97, hero:true, note:"Saves hero of the JUN 22 week. The 'which one would we actually send' framing — answering the cafeteria plant-milk slot with Willa's Kids (8g protein, allergen-free, Yuka 100) in cofounder-mom voice, never first-person Christina — was the share engine. The learning: a parent confession out-saves a spec sheet. This week the same register escalates into the milk-aisle macro-count pour: 'real food in a carton, not a number to chase,' the silent protein-math named and then put down."},
  {id:"JUN22-TT-1", concept:"\"summon the one with nothing to hide.\" — Food Jutsu format flip", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Anime Food Jutsu hand-sign summon flagged the month's top brand-friendly TikTok format (JUN 22)", trendId:null, views:498000, saves:28400, shares:16200, comments:2260, savesDelta:7.5, sentiment:0.95, hero:false, note:"Format-as-virality carried the reach — the anime hand-sign summon materialized the carton on the match-cut with the 4-ingredient stinger as the payload. The format does the reach work; the short list is the punchline. This week the same highest-reach lane runs the BIG SWING: the build-tension-then-drop reveal builds the pour and drops on the beat to the four-ingredient back label — the format carries the reach, the four real ingredients are the payload."},
  {id:"JUN22-IG-R1", concept:"\"green before you flip it.\" — calm-authority label Reel", platform:"IG Reel", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"Regulators floating a red/yellow/green front-of-pack label you can judge at a glance (JUN 22)", trendId:null, views:402000, saves:24600, shares:11800, comments:1880, savesDelta:7.0, sentiment:0.96, hero:false, note:"Calm authority converted again — a 4-ingredient carton reading green before you turn it over, the regulator validating the whole pitch without a victory lap. The learning: lead with the answer, the policy is the backdrop. This week the same product-truth confidence carries the glyphosate cert receipt: 'the glyphosate debate is reopening — our answer's already on the label,' certified glyphosate-free and tested every lot, the EPA news as the why."},
  {id:"JUN22-IG-R3", concept:"\"matcha got the headlines. hojicha got the oat milk.\" — first-mover Barista remix", platform:"IG Reel", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Hojicha pegged summer's breakout cafe drink, wide open in the oat lane (JUN 22)", trendId:null, views:361000, saves:21800, shares:12400, comments:1800, savesDelta:6.4, sentiment:0.94, hero:false, note:"First-mover recipe play landed — planting the dairy-free flag on summer's breakout cafe drink before the chains packaged it, color-and-pour doing the work. Viral-recipe-remix stays the highest-engagement recipe frame. This week the same remix logic runs on FoodTok's proffee: 'proffee, minus the chalk' rebuilds protein iced coffee with cold brew plus Willa's Kids for 8g protein and a creamy swirl, no chalky powder — the dairy-free swap nobody on the FYP made yet."},
  {id:"JUN22-TT-2", concept:"\"the cleanest protein move has nothing to mix in.\" — calm misinfo correction", platform:"TikTok", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"Doctors pushing back on the viral protein-additive dirty-soda trend (JUN 22)", trendId:null, views:419000, saves:23400, shares:13600, comments:2100, savesDelta:6.2, sentiment:0.95, hero:false, note:"The calm-correction lane converted without preaching — answering the viral protein-additive trend matter-of-factly, whole-oat protein and fiber over a fizzy filler. The learning: agree with the instinct, then fill in the part the trend skips. This week the same gentle-correction register carries 'no pour replaces the medication, but food that actually fills you up? that part's real' against the 'natural Ozempic' clips — honor the instinct, whole oat with protein and fiber, aunt-at-the-table not the dunk."},
  {id:"JUN22-IG-R5", concept:"\"the whole oat, nothing pulled out, nothing faked back in.\" — whole-oat POV", platform:"IG Reel", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"'Non-Ultraprocessed Certified' seal most of the aisle won't qualify for (JUN 22)", trendId:null, views:322000, saves:20800, shares:9900, comments:1560, savesDelta:6.9, sentiment:0.97, hero:false, note:"Confident product truth converted — reading the carton instead of claiming the seal, whole oat groat with nothing pulled out or faked back in. This week the same whole-plant confidence anchors the GLP-1 BIG SWING: 'eating less doesn't mean getting less' answers the smaller-appetite shift with the whole oat that kept the protein AND fiber in — density, not filtered-out sugar, every pour earning its spot in the cup."},
  {id:"JUN22-TT-3", concept:"\"the purple does the talking. the carton does the rest.\" — vivid ube oat latte", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Ube logged a top trending drink ingredient (JUN 22)", trendId:null, views:376000, saves:18800, shares:12800, comments:1720, savesDelta:5.7, sentiment:0.93, hero:false, note:"Color-does-the-work reach play — a vivid iced ube oat latte over the clean white base, the trending drink ingredient carried by color alone. Visual-first recipes pull saves on Pinterest-bound stills. This week the same styled-pour logic runs on the iced-coffee lane as arabica spikes: 'the home iced coffee just became the savvy one' stages a Barista iced pour pretty enough to earn the screenshot and move the whole café home."},
  {id:"JUN22-PIN-3", concept:"\"the halftime chocolate milk the kids cheer for and the label can't argue with.\" — World Cup snack-spread pin", platform:"Pinterest", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"World Cup group stage spilling watch parties into kitchens (JUN 22)", trendId:null, views:142000, saves:10600, shares:0, comments:0, savesDelta:7.0, sentiment:0.97, hero:false, note:"Pinterest pin compounded for 7+ days (CTR climbing daily) — the family-table-off-the-World-Cup framing captured the planning audience as a save-and-return cue, one carton feeding the room. This week the World Cup lane moves from the watch-party spread to the live hydration storyline as the knockouts push toward the quarterfinals: 'the refuel shouldn't be sugar and dye' pours a creamy real-food Kids cup after the heat, the match blurred behind."}
];

const PERF_KPIS = {
  shipped:17,
  totalReach:2812000,
  avgSavesDelta:6.8,
  topFormat:"Parent-confession Reels + format-as-virality audio stitches + viral-recipe-remix"
};

const PERF_INSIGHTS = [
  {title:"A parent confession was the saves hero of the JUN 22 week (the cafeteria \"the one we'd actually send\" Reel hit 8.9× saves)", detail:"The 'the one we'd actually send' Reel hit 8.9× saves and 0.97 sentiment — answering the cafeteria plant-milk slot with Willa's Kids (8g protein, allergen-free, Yuka 100) in cofounder-mom voice, never first-person Christina. The learning: a parent confession out-saves a spec sheet. This week the engine escalates the same register — the milk-aisle macro-count pour names the silent protein-math every parent runs and puts it down: 'real food in a carton, not a number to chase,' the carton that already passes as the relief.", agent:"composer"},
  {title:"Format-as-virality audio stitches carry the reach even at lower save-rate (the Food Jutsu summon hit 498K views)", detail:"The anime hand-sign summon pulled 498K views by materializing the carton on the match-cut with the 4-ingredient stinger as the payload — the format does the reach work, the short list is the punchline. This week the engine doubles down with the BIG SWING: the build-tension-then-drop reveal builds the pour and drops on the beat straight to the four-ingredient back label. The format carries the reach; the four real ingredients are the payload.", agent:"pulse"},
  {title:"The dairy-free remix stays the highest-engagement recipe frame (the hojicha first-mover Reel hit 6.4× saves)", detail:"The 'matcha got the headlines. hojicha got the oat milk' Reel hit 6.4× saves and 0.94 sentiment — planting the dairy-free flag on summer's breakout cafe drink before the chains packaged it, color-and-pour doing the work without preaching. This week the engine runs the same remix logic on FoodTok's proffee: 'proffee, minus the chalk' rebuilds protein iced coffee with cold brew plus Willa's Kids for 8g protein and a creamy swirl, no chalky powder — the dairy-free swap the FYP left open.", agent:"pulse"},
  {title:"Calm correction converts without preaching (the protein-additive rebuttal hit 6.2× saves on 419K views)", detail:"The 'the cleanest protein move has nothing to mix in' TikTok answered the viral protein-additive trend matter-of-factly and converted at 0.95 sentiment — the learning: agree with the instinct first, then fill in the part the trend skips. This week the engine runs the same gentle-correction register against the 'natural Ozempic' oat-drink clips: 'no pour replaces the medication, but food that actually fills you up? that part's real' honors the real-food instinct, then leads with whole-oat protein and fiber — aunt-at-the-table calm, never the dunk.", agent:"pulse"}
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
  "JUL06-TT-1":{voice:86, panel:83, pulse:80, recency:9},
  "JUL06-IG-R1":{voice:88, panel:85, pulse:82, recency:9},
  "JUL06-PIN-1":{voice:90, panel:84, pulse:82, recency:4},
  "JUL06-TT-2":{voice:94, panel:89, pulse:87, recency:8},
  "JUL06-IG-R2":{voice:92, panel:89, pulse:80, recency:8},
  "JUL06-PIN-2":{voice:90, panel:85, pulse:84, recency:7},
  "JUL06-IG-F1":{voice:82, panel:79, pulse:76, recency:8},
  "JUL06-TT-3":{voice:91, panel:86, pulse:88, recency:8},
  "JUL06-IG-R3":{voice:87, panel:84, pulse:81, recency:8},
  "JUL06-PIN-3":{voice:84, panel:81, pulse:78, recency:6},
  "JUL06-IG-F2":{voice:83, panel:80, pulse:77, recency:6},
  "JUL06-TT-4":{voice:93, panel:90, pulse:84, recency:9},
  "JUL06-TT-6":{voice:85, panel:82, pulse:79, recency:6},
  "JUL06-IG-R4":{voice:92, panel:89, pulse:88, recency:9},
  "JUL06-TT-5":{voice:91, panel:88, pulse:90, recency:9},
  "JUL06-TT-7":{voice:92, panel:85, pulse:86, recency:9},
  "JUL06-IG-R5":{voice:91, panel:88, pulse:87, recency:9}
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
    hook:"'proffee' is FoodTok's protein-coffee flex — and it's wide open for a creamy dairy-free rebuild ☕",
    detail:"Protein iced coffee — 'proffee' — is riding the #icedcoffee wave (334M+ views), with creators blending protein into cold brew for a high-protein summer sip. Most versions lean on protein powder or Greek yogurt, leaving a clean opening for a creamy, real-food dairy-free build that skips the chalk.",
    velocity:"high",
    willasPlay:"Reel: dairy-free proffee — cold brew + Willa's Kids for 8g protein and a creamy swirl, no chalky powder. Opening text: 'let's make protein iced coffee.'",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"TikTok · #icedcoffee hashtag page (permanent reference)", url:"https://www.tiktok.com/tag/icedcoffee"}
    ]
  },
  {
    id:"CP-2",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"no-oven, heat-wave dinners are taking over post-cookout — chickpea salads, gazpacho, ceviche, zero stove ⛱️",
    detail:"With mid-summer heat waves rolling in, no-cook meals are dominating July FoodTok — 10-minute gazpacho, chickpea salads, ceviche and lettuce wraps built for a kitchen no one wants to heat up. The gap in the trend is a creamy element that doesn't require a pan.",
    velocity:"medium",
    willasPlay:"Reel: a creamy no-cook drizzle — blend Willa's Original with tahini + lemon over the viral chickpea salad. Zero stove, real-food creamy, dairy-free.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"Boston Globe · No-cook recipes for the heatwave (Jul 1, 2026)", url:"https://www.bostonglobe.com/2026/07/01/lifestyle/no-cook-recipes-heatwave-summer/"}
    ]
  },
  {
    id:"CP-3",
    type:"MEME FORMAT",
    typeColor:"#73B2C9",
    hook:"TikTok's build-tension-then-drop reveal format is everywhere — the beat drops, the payoff lands 🎬",
    detail:"A trending-audio format is dominating the FYP in early July 2026: creators build tension through an intro, then cut hard on the beat drop for a transformation or reveal — used across GRWM, outfit and product-swap posts. It's a template with a built-in payoff beat, primed for a clean brand drop-in.",
    velocity:"high",
    willasPlay:"TikTok: ride the build-then-drop reveal — a slow pour builds on the beat, then cut on the drop to the 4-ingredient back label. Hands and product.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"Buffer · Trending songs on TikTok (Jul 3, 2026)", url:"https://buffer.com/resources/trending-songs-tiktok/"}
    ]
  },
  {
    id:"CP-4",
    type:"MISINFORMATION REBUTTAL",
    typeColor:"#DC2626",
    hook:"the 'drink this instead of Ozempic' clips are back — riding the GLP-1 headlines, wrong on the science 🧪",
    detail:"As GLP-1 coverage floods the news, DIY 'natural Ozempic' clips are resurfacing — promising a shake or a soaked-oat drink can replace the medication. The instinct toward real, filling food is right; the claim that any pour mimics the drug is the part that needs a calm, non-preachy correction.",
    velocity:"medium",
    willasPlay:"Reel: warm correction — no pour is a weight-loss shortcut, but real food that fills you up is the honest move. Willa's Original: whole oat, protein + fiber, 1g sugar.",
    dnaMatch:"mom-activist",
    sources:[
      {label:"TikTok · #oatzempic hashtag page (permanent reference)", url:"https://www.tiktok.com/tag/oatzempic"}
    ]
  },
  {
    id:"CP-5",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"'butter mom' summer is TikTok's food-freedom flex — comfort over control, no food morality at the table 🧈",
    detail:"The 'butter mom' identity — food neutrality, comfort eating normalized, soft-lit homemade meals — has grown from a parenting mindset into a full summer aesthetic across TikTok discovery pages. It's an explicit rejection of restriction-as-wellness, and it lands squarely in the abundance-not-punishment register Willa's already lives in.",
    velocity:"medium",
    willasPlay:"Reel: embody the food-freedom energy — an un-anxious morning pour, zero rules, zero guilt. The carton that was never a 'good vs bad' decision.",
    dnaMatch:"mom-activist",
    sources:[
      {label:"TikTok · Butter mom vs almond mom discovery page (permanent reference)", url:"https://www.tiktok.com/discover/what-is-a-butter-mom-vs-almond-mom"}
    ]
  },
  {
    id:"CP-6",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"it's the summer of kids in the kitchen — cooking-literacy camps and DIY snack videos are everywhere this July 🥣",
    detail:"Summer 2026 has a clear parenting-culture beat: cooking-literacy camps sending kids home to make family meals, plus a wave of 'let my kid make it themselves' snack videos. The moment celebrates kids handling real ingredients — a natural fit for a pour simple enough for small hands.",
    velocity:"medium",
    willasPlay:"Reel: kids-make-it-themselves — a 20-second shake-and-pour a kid can do solo, real ingredients they can name. Kid-in-frame, hands-on, no adult voiceover needed.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"Pioneer News · BCHD healthy summer cooking camp (Jul 2026)", url:"https://www.pmg-ky.com/pioneer_news/features/bchd-provides-healthy-summer-camp/article_ccccc3c0-85b5-5a67-ab77-74964e755c5f.html"}
    ]
  },
  {
    id:"CP-7",
    type:"NEWS CYCLE",
    typeColor:"#DC8A4E",
    hook:"the World Cup's mandatory cooling breaks turned hydration into the tournament's mid-summer storyline ⚽",
    detail:"As the 2026 World Cup runs its July knockout heat, FIFA's first-ever mandatory three-minute cooling breaks sparked a July 3 debate about hydration and fueling as athletic infrastructure — players can lose 1-2L of sweat an hour. The conversation moved past the scoreboard to how the body actually refuels in the heat.",
    velocity:"high",
    willasPlay:"Reel: the after-the-heat refuel — post-practice, post-park, the creamy real-food pour with protein + fiber, not a sugar-electrolyte drink. Kid-athlete, no watch-party framing.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"Forbes · Hydration breaks at the 2026 World Cup raise controversy (Jul 3, 2026)", url:"https://www.forbes.com/sites/brucelee/2026/07/03/hydration-breaks-at-2026-world-cup-raise-controversy-for-fifa/"}
    ]
  },
  {
    id:"CP-8",
    type:"ENTERTAINMENT MOMENT",
    typeColor:"#A191B2",
    hook:"Netflix's 'Little House on the Prairie' reboot is bringing from-scratch, real-ingredient homestead nostalgia back 🌾",
    detail:"Netflix's reimagined 'Little House on the Prairie' lands July 9, 2026, tapping a wave of homestead-and-from-scratch nostalgia — the sunlit, slow, real-ingredient kitchen aesthetic that's already trending across summer FoodTok. It's the exact unhurried, grounded mood Willa's content lives in, no irony required.",
    velocity:"medium",
    willasPlay:"Reel: lean into the homestead-kitchen mood — sunlit, unhurried, real ingredients, one creamy pour. Grandmother-era warmth; Christina heritage-eligible on camera.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"Hollywood Reporter · Netflix July 2026 new releases (Jul 4, 2026)", url:"https://www.hollywoodreporter.com/tv/tv-news/netflix-july-2026-new-releases-movies-tv-1236634437/"}
    ]
  },
  {
    id:"CP-9",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"coconut coolers are summer's tropical no-coffee sip — creamy, cold, and wide open for a dairy-free build 🥥",
    detail:"Coconut-lime coolers are surging (up around 70% year-over-year) as the tropical, non-coffee summer drink of 2026 — coconut water, citrus and a creamy element over ice. Most builds reach for canned coconut cream; a splash of oat milk gives the body with far less sugar.",
    velocity:"medium",
    willasPlay:"Reel: creamy coconut cooler — coconut water + lime + a splash of Willa's Original over ice. Tropical, dairy-free, no syrup. 'let's make a coconut cooler.'",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"Tastewise · Summer Drink Trends 2026 (Jul 1, 2026)", url:"https://tastewise.io/blog/summer-drink-trends"}
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
  "JUL06-TT-1":"meme-payload",
  "JUL06-IG-R1":"mom-activist",
  "JUL06-PIN-1":"viral-recipe-remix",
  "JUL06-TT-2":"mom-activist",
  "JUL06-IG-R2":"on-pack-checklist",
  "JUL06-PIN-2":"viral-recipe-remix",
  "JUL06-IG-F1":"at-shelf-moment",
  "JUL06-TT-3":"kid-family-moment",
  "JUL06-IG-R3":"viral-recipe-remix",
  "JUL06-PIN-3":"before-after-stitch",
  "JUL06-IG-F2":"mom-activist",
  "JUL06-TT-4":"on-pack-checklist",
  "JUL06-TT-6":"mom-activist",
  "JUL06-IG-R4":"kid-family-moment",
  "JUL06-TT-5":"viral-recipe-remix",
  "JUL06-TT-7":"meme-payload",
  "JUL06-IG-R5":"before-after-stitch"
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
  "JUL06-TT-1":{
    shoot:[
      "Slow, deliberate single-pour of Willa's Original into a frosty glass, tension building (carton turned away)",
      "Hard-cut snap to the carton back label in razor focus on the beat drop",
      "Tight receipts sequence: label + glass with one-line-at-a-time overlays",
      "Overhead flat-lay of the four real ingredients beside the carton"
    ],
    found:[
      "Trend reference (Format + audio): https://buffer.com/resources/trending-songs-tiktok/ — Buffer's current trending-songs roundup flags the build-tension-then-drop reveal audios eating the FYP; study the slow-build → hard-cut-on-drop payoff structure",
      "Trend reference (Format style): https://www.tiktok.com/discover/beat-drop-reveal — live top videos for build-then-drop timing + the hard-cut-on-the-drop reveal beat to match",
      "Trend reference (Format lane): https://www.tiktok.com/tag/foodtok — how the drop-reveal template is running across food + product-swap posts this cycle"
    ],
    memes:[
      "Bold typographic 'receipt' card style for the four-ingredient drop reveal",
      "Hard-cut / snap-zoom transition packs (CapCut) timed to the beat drop"
    ],
    archive:[
      "Skip — format is native-shot + trend-audio driven; no vintage/archive b-roll needed"
    ]
  },
  "JUL06-IG-R1":{
    shoot:[
      "Slow satisfying cold pour of Willa's Original into a clear glass over ice, condensation, cool daylight (hero hook)",
      "Wider pour beat with room for the calm World-Context text line — glass + carton, no charts or medical imagery",
      "Tactile insert: whole oats in the hand vs. a fine processed powder sifting away in the light (the 'stripped out' proof)",
      "Clean stat-build frame — full creamy glass, whole oats + carton, room for '1g sugar · 4g+ protein · 2g+ fiber' overlay",
      "End-card: finished glass beside the Willa's Original carton, oats in soft focus"
    ],
    found:[
      "Trend reference (Reel): https://www.tiktok.com/tag/icedcoffee — slow single-pour + on-screen-stat pacing and cold-glass condensation rhythm for the build",
      "World-context backing (internal, do not cite on the surface): CNBC · Medicare obesity-drug GLP-1 coverage starting July 1 (Jun 30, 2026) — https://www.cnbc.com/2026/06/30/medicare-obesity-drug-glp-1-coverage-starting-july-1.html"
    ],
    memes:[
      "Skip — World-Context Tie-In, no meme template; the slow single-pour + clean stat build is the visual hook"
    ],
    archive:[
      "Optional: quick real-food texture beat — whole rolled oats catching light (family/brand b-roll) for the whole-oat insert; keep it a fast tactile cut, not the whole Reel"
    ]
  },
  "JUL06-PIN-1":{
    shoot:[
      "Overhead: creamy coconut cooler swirling in a clear tumbler of ice, lime wheel on rim, Willa's Original carton + measuring glass sharing the frame",
      "Grab-and-go beat: hand capping the travel tumbler with the reusable straw in, condensation beading, dock/poolside light (Pattern 08 portability)",
      "Carton-forward angle: Willa's Original label upright beside the cup mid-pour, the oat milk ribboning down through the coconut water, label legible"
    ],
    found:[
      "Trend reference (drink trend): https://tastewise.io/blog/summer-drink-trends — Tastewise Summer Drink Trends 2026 (Jul 1, 2026) documenting coconut-lime coolers up ~70% YoY as the no-coffee summer sip (CP-9 driver)",
      "Trend reference (hashtag): https://www.tiktok.com/tag/coconutcooler — #coconutcooler landing page for tropical-cooler styling + build formats"
    ],
    memes:[
      "Static Pinterest pin → skip memes; the hook lives in the overlay line ('pour it in the tumbler, straw in, out the door')"
    ],
    archive:[
      "Static pin → skip archive; all original sunlit poolside-adjacent capture, no vintage b-roll needed"
    ]
  },
  "JUL06-TT-2":{
    shoot:[
      "Hands dropping oats + lime + water into a glass, stirring it murky — the 'natural Ozempic' shot the clips push, shot calm not mocking",
      "Hand calmly setting the murky glass aside and reaching for the Willa's Original carton, 'organic' legible",
      "Hard-cut clean slow pour of Willa's Original over ice in a tall glass, smooth + full-bodied",
      "Carton-to-camera label reveal, 4-ingredient list + 'organic' readable in warm daylight",
      "End-card still: carton beside finished glass, morning light"
    ],
    found:[
      "Trend reference (TikTok hashtag): https://www.tiktok.com/tag/oatzempic — the 'natural Ozempic' / soaked-oat clips Willa's is calmly correcting; match the DIY-shot format so the rebuttal reads native, never preachy",
      "Backdrop context (news cycle): GLP-1 access is peaking as Medicare's $50/month program went live Jul 1 — why the 'drink this instead' clips are resurfacing now (internal framing, not on-screen)"
    ],
    memes:[
      "Optional: a calm 'no shade, just the honest version' text-overlay tone (no face) riffing the gentle-correction format — keep it aunt-at-the-table, never dorm-room dunk, never shame the person who tried the shot"
    ],
    archive:[
      "Skip — no archival footage; this is a present-tense misinformation correction shot fresh in-kitchen"
    ]
  },
  "JUL06-IG-R2":{
    shoot:[
      "Overhead: a plain glyphosate-review headline on a folded paper / phone, a hand sliding the Willa's Original carton on top to cover it",
      "Slow push-in on the back of the carton, finger landing on the 'Certified Glyphosate Residue Free' seal",
      "Clean overhead of the carton with animated check-tick overlays down the cert list",
      "Raw oat groats spilled beside the 4-line ingredient list, finger tracing",
      "Slow creamy pour into a clear glass, condensation, backlight through the whole-oat body"
    ],
    found:[
      "Trend reference (news): https://www.dailysignal.com/2026/07/01/glyphosate-ban-epa-safety-review/ — the EPA glyphosate-review reopening the Reel ties to as calm backdrop (World-Context Tie-In)",
      "Trend reference (cert): https://detoxproject.org/glyphosate-residue-free-certification/ — the 'Glyphosate Residue Free' certification standard behind the on-pack seal"
    ],
    memes:[
      "Skip heavy meme overlays — World-Context Tie-In lands on calm authority + a clean seal reveal, not gif comedy; the finger-on-the-cert moment is the payoff"
    ],
    archive:[
      "Skip archive — present-day kitchen + product + label shoot, no vintage b-roll needed"
    ]
  },
  "JUL06-PIN-2":{
    shoot:[
      "Front-on hero: creamy Willa's Original + tahini + lemon drizzle captured mid-pour over a no-cook chickpea salad, carton + tahini jar + halved lemon styled in frame, label readable, daylight",
      "Flat-lay of the four drizzle ingredients (Willa's Original carton, tahini, lemon, sea salt) beside the finished salad — 'no stove' story at a glance",
      "Overlay-card composite: 'the creamy that needs no pan' + small green tag 'whole oat · 30 seconds · zero stove' (#75C596)"
    ],
    found:[
      "Trend reference (no-cook heat-wave dinners): Boston Globe · No-cook recipes for the heatwave (Jul 1, 2026) — https://www.bostonglobe.com/2026/07/01/lifestyle/no-cook-recipes-heatwave-summer/ — styling + occasion cues for the post-cookout no-oven moment (CP-2)"
    ],
    memes:[
      "Skip — static Pinterest recipe pin; the clean mid-pour drizzle IS the hook, a meme/gif overlay would undercut the appetizing composition"
    ],
    archive:[
      "Optional macro of whole oat groats / steel-cut oats from a stock library to reinforce 'whole oat' — no vintage/period footage needed for a clean editorial recipe pin"
    ]
  },
  "JUL06-IG-F1":{
    shoot:[
      "IRL at-shelf moment — Willa's Kids carton held in-hand or riding in a warehouse cart beside real recognizable haul (rotisserie, clementines, a flat of snacks), no staging",
      "Back-label close-up with a hand-drawn marker circle around the short ingredient list — whole oat / 8g protein / top-9 allergen-free / organic",
      "Carton in the cart-seat or on the checkout belt — the everyday big-box-run beat",
      "Final flat-lay: carton beside the Yuka 100 badge on a cream background"
    ],
    found:[
      "Trend reference (at-shelf carousel): Parade '15 best Costco finds, July 2026' clean-label kids'-snack haul — https://parade.com/food/best-costco-finds-july-2026 — echo the warehouse-floor 'transparent ingredients went mainstream' framing",
      "Reference (parent-first label register): Partake Foods 'what's actually in it' IG carousels — clean sun-washed backgrounds, one proof per card as the pacing model"
    ],
    memes:[
      "Static carousel → skip memes; the at-shelf spot + back-label marker circle carry it, no gif overlay"
    ],
    archive:[
      "Skip archive — present-day product + warehouse/at-shelf shoot only, no vintage b-roll"
    ]
  },
  "JUL06-TT-3":{
    shoot:[
      "Kid-height open: a kid sets the Willa's Kids carton, a clear lidded jar and frozen blueberries on a sunlit counter, grins to camera",
      "Small hands pour Willa's Kids into the jar, then drop in blueberries + a drizzle of maple",
      "Hero SHAKE: kid shakes the lidded jar with both hands, milk going frothy purple through the clear glass",
      "Proud over-the-ice pour + first sip + a little 'ta-da', carton readable beside the cup"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/kidsinthekitchen — pull top 'let my kid make it themselves' snack videos for the kid-solo pacing + big-playful-text step format",
      "Trend reference (TikTok): https://www.tiktok.com/tag/kidscooking — match the joyful, unpolished DIY-snack-video energy (kid's own voice, real light, no adult narration)"
    ],
    memes:[
      "Skip — kid-led recipe build, the 'no grown-ups required' pride is the payload, no meme overlay needed"
    ],
    archive:[
      "Skip — fresh in-kitchen footage only; no vintage/b-roll for a current kids-in-the-kitchen moment"
    ]
  },
  "JUL06-IG-R3":{
    shoot:[
      "Overhead cold-brew pour over a glass of ice (crisp, high-contrast)",
      "Slow-motion side-angle pour of Willa's Kids cascading into the cold brew and self-marbling (the hero swirl shot)",
      "Top-down metal-straw stir blending coffee + cream to soft caramel",
      "Final finished glass lifted into midday summer light beside the Willa's Kids carton"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/proffee — study the top proffee videos for the pour/swirl framing + on-screen text patterns Willa's is riffing",
      "Trend reference (TikTok): https://www.tiktok.com/tag/icedcoffee — the #icedcoffee wave (334M+ views) the format rides"
    ],
    memes:[
      "Skip overt meme overlays — the self-marbling swirl pour IS the payload; keep it recipe-clean per house convention"
    ],
    archive:[
      "Skip archive — this is a fresh-shoot home-kitchen recipe, no vintage b-roll needed"
    ]
  },
  "JUL06-PIN-3":{
    shoot:[
      "Before side: cool-toned cluttered counter styled with protein tubs, adaptogen + mushroom-coffee jars, loose scoops and a shaker bottle — the 'powder stack,' slightly chaotic",
      "After side: Willa's Chocolate carton hero center-frame (40%+), a tall iced creamy chocolate pour beaded with condensation, clean sunlit counter",
      "Detail: hand tilting the Willa's Chocolate back label toward camera, 5-ingredient list legible",
      "Overhead split flat-lay: scoops-and-jars on the left, single carton + glass on the right, hard vertical divider between them"
    ],
    found:[
      "Trend reference (functional summer sips / powder-stack drinks): https://www.tiktok.com/tag/functionaldrinks — scroll top posts for the powder-stack aesthetic and format context this split-pin answers",
      "Pinterest reference: search 'functional drinks' + 'healthy iced coffee aesthetic' for the before/after split-pin styling to match"
    ],
    memes:[
      "Static pin → skip memes; the joke lives entirely in the text-overlay wordplay headline ('the whole oat is the stack')"
    ],
    archive:[
      "Static styled pin → skip archive; all original before/after photography, no vintage b-roll needed"
    ]
  },
  "JUL06-IG-F2":{
    shoot:[
      "Sun-washed real-morning counter — Willa's Original carton beside two glasses already poured (one taller, one smaller), un-styled and calm",
      "Back-label in soft focus with the four-ingredient list, one warm overlay line",
      "Clean number-callout stills (1g sugar · 4g+ protein · 2g+ fiber) — 'nothing to earn back' framing",
      "Final flat-lay: carton centered on cream with the cert row small at the base"
    ],
    found:[
      "Trend reference (cultural conversation): TikTok 'butter mom vs almond mom' discovery page — https://www.tiktok.com/discover/what-is-a-butter-mom-vs-almond-mom — the food-freedom / anti-restriction register the carousel embodies",
      "Reference (parent-first tone): Partake Foods 'what's actually in it' IG carousels — warm cream backgrounds, one calm proof per card as the pacing model — https://www.instagram.com/partakefoods/"
    ],
    memes:[
      "Static carousel → skip memes; the two-glasses morning frame + the good/bad-math line carry the confession, no gif overlay"
    ],
    archive:[
      "Skip archive — present-day product + morning-kitchen shoot only, no vintage b-roll"
    ]
  },
  "JUL06-TT-4":{
    shoot:[
      "A parent's hand holding a phone with a messy notes-app macro tally over the counter, then closing it and setting the phone face-down — the visual confession",
      "A single chilled Willa's Kids carton placed alone on a clean, sunlit counter, condensation on the side, label toward camera",
      "Slow push-in on the Willa's Kids back label so the one short line of recognizable ingredients reads clearly — the 'nothing to tally' beat",
      "A smooth, creamy pour from the Willa's Kids carton into a clear kid's glass in bright morning light",
      "A kid's hand reaching in and taking the glass off the counter without being asked"
    ],
    found:[
      "Trend reference (Parenting / kids-nutrition shift): https://everandeverbaby.com/blog/healthy-beginnings/modern-baby-nutrition-trends — Ever & Ever Baby guide to the 2026 move past macro-counting toward functional, whole-food nutrition + low-pressure feeding this brief rides (evergreen reference page)",
      "Trend reference (weekly parenting pulse): https://dearparents.substack.com/p/this-week-in-parenting-july-3-2026 — Dear Parents 'This Week in Parenting' (Jul 3, 2026) for the current no-pressure-feeding / real-food framing"
    ],
    memes:[
      "The close-the-macro-tally-then-pour swap IS the payload — keep the on-screen confession cards clean, sentence-case, brown-accented (#9E652E); deliberately NOT a score-the-label checklist card",
      "Comment-bait prompt ('still counting macros on your kids' drinks?') drives the engagement layer; pin a Willa's reply about retiring the milk-aisle math"
    ],
    archive:[
      "Skip — no vintage/archive footage needed; this is a fresh-shoot counter-and-pour family moment"
    ]
  },
  "JUL06-TT-6":{
    shoot:[
      "Sunlit hands sorting/pouring loose organic oats across a worn wooden counter, golden window light, dust motes",
      "Christina soft side-profile setting the Willa's Original carton into the light, label to camera (heritage/origin — founder on camera)",
      "Slow glossy pour of Willa's Original into a single clear glass, golden light through the stream, carton beside it",
      "Ingredient-list close-up: a finger tracing the 4-ingredient back label",
      "End-card still: Original carton beside a single sunlit glass on a cream background"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/fromscratch — homestead / from-scratch kitchen aesthetic + warm golden grade to match",
      "Trend reference (web): https://www.hollywoodreporter.com/tv/tv-news/netflix-july-2026-new-releases-movies-tv-1236634437/ — Netflix 'Little House' reboot Jul 9 (cultural backdrop, evoke the mood, don't depict the show)"
    ],
    memes:[
      "Skip hard meme-gifs — this is a warm heritage/founder beat; the sincerity IS the payload, a reaction-gif would break the mood",
      "Optional: the 'romanticize your life' / 'that girl's from-scratch kitchen' soft-aesthetic caption convention as the only trend-adjacent framing"
    ],
    archive:[
      "Optional: a single period-warm texture pass (soft film grain / faded home-movie grade) to nod to the homestead era — but shoot present-tense in-kitchen; no literal vintage b-roll needed"
    ]
  },
  "JUL06-IG-R4":{
    shoot:[
      "Red-cheeked kid in a soccer jersey dropping onto a kitchen stool off the heat, empty water bottle in hand",
      "Parent's hand sliding a neon sports drink into frame, then swapping it for the Willa's Kids carton",
      "Maple-cream pour of Willa's Kids into a glass over ice, condensation beading, backlight",
      "Kid taking a big relieved gulp, then an exhale and a small grin",
      "Tight on the carton face beside the empty-again glass with a Yuka 100 badge"
    ],
    found:[
      "Trend reference (article): https://www.forbes.com/sites/brucelee/2026/07/03/hydration-breaks-at-2026-world-cup-raise-controversy-for-fifa/ — the July 3 hydration/cooling-break story that anchors the 'refuel is where it counts' backdrop (CP-7)",
      "Trend reference (TikTok): https://www.tiktok.com/tag/kidathlete — post-practice / after-the-game 'what my kid drinks' clips for the red-cheeked-kid-comes-in pacing and swap-the-sugar-drink beat"
    ],
    memes:[
      "Skip heavy meme overlays — kid-family-moment register, warm and real; the neon-drink-swap-to-pour is the payoff, no gif needed"
    ],
    archive:[
      "Skip archive — present-day summer kitchen + kid-athlete shoot, no vintage b-roll"
    ]
  },
  "JUL06-TT-5":{
    shoot:[
      "One continuous, un-edited take on a sunlit counter, propped-phone live-stream angle — the whole iced-latte build in a single pour, hands + product only",
      "Ice fill: hand fills a tall clear glass to the top, real ice-clink sound",
      "Coffee pour: dark double shot of cold brew/espresso streaking down through the ice",
      "The payload pour: Willa's Barista poured slow, oat cream blooming and marbling through the coffee in real time (no speed-up, no cut), carton label to camera",
      "End-card still: Barista carton beside the finished marbled iced latte, cream background, bright light"
    ],
    found:[
      "Trend reference (web): https://www.tubefilter.com/2026/07/01/tiktok-live-food-network-cooking-stream/ — TikTok LIVE cooking streams + 2026 food-creator class (Jul 1, 2026); match the real-time, one-take, unpolished live-cooking energy",
      "Trend reference (TikTok): https://www.tiktok.com/tag/icedcoffee — #icedcoffee (334M+ views) iced-latte pour + cream-bloom framing to ride",
      "Trend reference (TikTok discovery): https://www.tiktok.com/discover/food-trends-2026 — platform's own live-cooking / food-trends lane for format cues"
    ],
    memes:[
      "Skip reaction-gifs — the format IS the joke (Humor Pattern 05 Format-as-Virality): the un-edited, one-take, 'no cuts' live pour is the payload, not a meme overlay",
      "Optional: the 'making it live, no edits' corner-tag convention as the only meme-adjacent structure"
    ],
    archive:[
      "Skip archive — present-tense, shot live this week; no vintage/period b-roll fits a real-time live pour"
    ]
  },
  "JUL06-TT-7":{
    shoot:[
      "Phone-screen-recording of a (mocked-up, generic) TikTok comment section full of gushing Willa's comments, one highlighted",
      "Clean sunlit reveal: a hand presenting a Willa's Original carton wrapped in a limited 'fan-comment' label",
      "Macro: fingers smoothing the comment-label flat on the carton, words legible",
      "Bright pan across the Multi lineup (Original, Kids, Chocolate, Barista), each with a different fan comment as its label",
      "Hands lifting the comment-labeled carton toward camera on the end card"
    ],
    found:[
      "Format reference (TikTok): https://www.tiktok.com/tag/fanmoment — browse real examples of brands converting a customer comment or DM into the creative moment; the build-then-reveal comment-as-product structure is the team's anchor for pacing and visual framing",
      "Trend reference (TikTok audio/format): https://ads.tiktok.com/business/creativecenter/inspiration/popular/music/pc/en — TikTok Creative Center trending sounds (Jul 2026); select the build-then-drop charting audio for CP-3 pacing — look for tracks with a clear tension climb + hard beat drop around the 7-10s mark"
    ],
    memes:[
      "Lean into Fan-Request Response (Pattern 11) + design-wit — the gag is that a throwaway internet comment becomes a real, legible label on the carton; keep it warm and delighted, never name a competitor, never show a price or code"
    ],
    archive:[
      "Skip — original same-day kitchen shoot + a mocked-up generic comment section and label wrap, no archive needed"
    ]
  },
  "JUL06-IG-R5":{
    shoot:[
      "BEFORE beat: a generic to-go paper café cup + a long receipt, with a climbing 'CAFÉ' price graphic — the setup for the confession",
      "AFTER beat: hands pouring Willa's Barista over a glass of iced cold brew, glossy creamy swirl blooming through the ice in slow motion",
      "Hand flipping the Willa's Barista carton to the back label for the 'BACK OF CARTON' proof card",
      "Overhead of the finished iced coffee sweating beside the carton for the 'keep the $7' payoff"
    ],
    found:[
      "Trend reference (format): before/after home-vs-café iced-coffee stitch Reels — https://www.tiktok.com/tag/icedcoffee — match the hard-cut 'café price → home pour' stitch structure (334M+ views)",
      "Trend reference (adjacent): #proffee home iced-coffee builds — https://www.tiktok.com/tag/proffee — the DIY at-home iced-coffee energy Willa's Barista rebuilds creamy and lower-sugar"
    ],
    memes:[
      "'CAFÉ vs HOME' split-price card + 'BACK OF CARTON' proof card — built in-edit as green (#75C596) overlays, not a gif; the price-tally graphic is the comedic beat"
    ],
    archive:[
      "Skip — no vintage/period footage; this is a bright present-day home-café before/after stitch"
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
const WELCOME_WEEK_KEY = "JUL-06-2026";
const WELCOME_WEEK_RANGE = "JUL 6 – JUL 12, 2026";
const WELCOME_REFRESHED = "JUL 05, 2026";

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
  pullQuote:"the fireworks are swept up, the cookout leftovers are almost gone, and the whole country's easing back into the routine — smaller appetites, bigger heat, iced coffee on a loop. good week to be the pour that earns its spot in a half-full cup.",
  the_moves:[
    {kind:"ship", verb:"Open the week Wed Jul 8 with the density pour — every calorie has to earn its cup now.", why:"Medicare's $50/month GLP-1 bridge program went live July 1 for nearly 4 million more beneficiaries, on top of the ~1-in-5 households already using one — so millions more are eating with a smaller appetite, and the food that gets eaten has to carry more nutrition per bite. Willa's Original keeps real protein and fiber IN the whole oat instead of filtering them out and processing the starch to sugar — density, not filtered-out sugar. Lead with the carton, the appetite shift is the backdrop. Ship the BIG SWING IG Reel \"eating less doesn't mean getting less\" Wed Jul 8, 12pm."},
    {kind:"ship", verb:"Drop the four-ingredient back label on the beat — ride FoodTok's build-then-drop reveal.", why:"The build-tension-then-drop format is eating the FYP in early July — creators build through an intro, then cut hard on the beat drop for the payoff. The drop IS the reveal, so the slow pour builds and the beat drops straight to the four-line back label: organic whole oats, filtered water, organic vanilla, sea salt. The format carries the reach; the short list is the payload. Ship the BIG SWING TikTok \"the beat drops — and so does the four-ingredient back label\" Wed Jul 8, 10am, inside the format's window."},
    {kind:"ship", verb:"Answer the reopened glyphosate question Thu Jul 9 with the cert already on the label.", why:"The EPA confirmed in early July it's running a new draft risk assessment of glyphosate, reopening the grain-residue question across the aisle. That's an authority window for the brand that already holds the cert — certified glyphosate-free by The Detox Project, tested every lot, no press release required. Lead with the receipt, the news is the why-now. Ship the BIG SWING IG Reel \"the glyphosate debate is reopening — our answer's already on the label\" Thu Jul 9, 12pm."}
  ]
};


const WELCOME_HIGHLIGHTS = [
  {
    stat:"$50/month",
    label:"Medicare's GLP-1 bridge just went live — millions more shoppers about to eat with a smaller appetite",
    detail:"A new Medicare bridge program that started July 1, 2026 puts GLP-1 medications at about $50/month for nearly 4 million eligible beneficiaries, on top of the roughly 1-in-5 US households already on one. As appetites shrink, the food a person does eat has to carry more nutrition per bite — density beats volume, and filtered-out oat sugar doesn't cut it. our move: a calm Original Reel — \"eating less doesn't mean getting less\" — that leads with the carton, not the headline. The whole oat keeps real protein and fiber in the cup, so every pour earns its spot; the appetite shift is the backdrop, the density is the lead.",
    color:"#73B2C9",
    icon:"💉",
    glyph:"💉",
    kindLabel:"Health Signal",
    sources:[
      {label:"CNBC · Medicare obesity-drug GLP-1 coverage starting July 1 (Jun 30, 2026)", url:"https://www.cnbc.com/2026/06/30/medicare-obesity-drug-glp-1-coverage-starting-july-1.html"},
      {label:"Science-Based Ingredients · Summer 2026 Trend Report (Jul 5, 2026)", url:"https://sciencebasedingredients.com/summer-2026-trend-report/"}
    ]
  },
  {
    stat:"review reopened",
    label:"the EPA just reopened its glyphosate safety review — grain-residue scrutiny is back on the table",
    detail:"The EPA confirmed in early July 2026 it's running a new draft risk assessment of glyphosate, targeting completion by year-end, following a retracted study and fresh litigation — reopening the residue question across grain and commodity sourcing. It's a clean authority window for a brand that already tests for it every lot. our move: a calm on-pack-checklist Reel — \"the glyphosate debate is reopening — our answer's already on the label\" — that leads with the receipt: certified glyphosate-free by The Detox Project, tested every lot. No victory lap, no fearmongering; the regulator restarts the debate, the carton already settled it.",
    color:"#75C596",
    icon:"🌾",
    glyph:"🌾",
    kindLabel:"Policy Signal",
    sources:[
      {label:"Daily Signal · EPA glyphosate safety review (Jul 1, 2026)", url:"https://www.dailysignal.com/2026/07/01/glyphosate-ban-epa-safety-review/"},
      {label:"USDA ERS · Oil Crops Outlook June 2026 (Jun 30, 2026)", url:"https://www.ers.usda.gov/publications/115031"}
    ]
  },
  {
    stat:"6.71% in a day",
    label:"arabica just spiked as iced-coffee season peaks — the home café is suddenly the savvy pour",
    detail:"Torrential rains in Brazil's Minas Gerais sent arabica futures up 6.71% on July 2 — the steepest one-day climb in four years — right as mid-summer iced-coffee demand peaks and cold brew heads toward a $1.75B market. The café upcharge keeps climbing; the value moved to the at-home iced cup. our move: a before/after Barista stitch — \"the home iced coffee just became the savvy one\" — that moves the whole café home for the price of one cart run. 50% less sugar than other barista oat milks, no rapeseed, no gums; the pour that makes the at-home iced cup worth it, styled to earn the screenshot.",
    color:"#75C596",
    icon:"🧊",
    glyph:"🧊",
    kindLabel:"Category Signal",
    sources:[
      {label:"Perfect Daily Grind · Coffee News Recap (Jul 3, 2026)", url:"https://perfectdailygrind.com/2026/07/coffee-news-recap-3-july-2026/"},
      {label:"Tastewise · Summer Drink Trends 2026 (Jul 1, 2026)", url:"https://tastewise.io/blog/summer-drink-trends"}
    ]
  },
  {
    stat:"1-2L an hour",
    label:"the World Cup's cooling breaks turned hydration into the tournament's mid-summer storyline",
    detail:"As the 2026 World Cup runs its July knockout heat toward the quarterfinals, FIFA's first-ever mandatory three-minute cooling breaks sparked a July 3 debate about hydration and fueling as athletic infrastructure — players can lose 1-2L of sweat an hour. The conversation moved past the scoreboard to how the body actually refuels in the heat. our move: ride the after-the-heat refuel, not the match — a kid-athlete Kids Reel, \"the refuel shouldn't be sugar and dye,\" that pours a creamy real-food cup with protein and fiber after practice or the park instead of a sugar-and-dye sports drink. No watch-party framing; the kitchen is the hero, the match stays background.",
    color:"#A191B2",
    icon:"⚽",
    glyph:"⚽",
    kindLabel:"News Cycle",
    sources:[
      {label:"Forbes · Hydration breaks at the 2026 World Cup raise controversy (Jul 3, 2026)", url:"https://www.forbes.com/sites/brucelee/2026/07/03/hydration-breaks-at-2026-world-cup-raise-controversy-for-fifa/"}
    ]
  },
  {
    stat:"past the macro-count",
    label:"parents are quitting the protein-math — 'functional nutrition' is replacing the label chase",
    detail:"Early-July baby-and-toddler nutrition coverage shows parents moving past macro-counting toward bioavailable micronutrients, fiber and real sourcing — and toward low-pressure feeding, where the parent decides what's offered and the child decides how much. 'High protein' as a headline is fading; recognizable, whole-food quality is the new bar. our move: a Kids pour that ends the aisle math — \"real food in a carton, not a number to chase\" — organic, recognizable ingredients, 8g protein and a Yuka 100 that a parent can stop tallying. Relief, not another spec to chase; the carton that already passes is the lead.",
    color:"#9E652E",
    icon:"🍎",
    glyph:"🍎",
    kindLabel:"Parenting Signal",
    sources:[
      {label:"Ever & Ever Baby · How baby & toddler nutrition is changing in 2026 (Jul 1, 2026)", url:"https://everandeverbaby.com/blog/healthy-beginnings/modern-baby-nutrition-trends"},
      {label:"Dear Parents · This Week in Parenting (Jul 3, 2026)", url:"https://dearparents.substack.com/p/this-week-in-parenting-july-3-2026"}
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
  "Medicare just made GLP-1 way cheaper and a lot more people are eating with a smaller appetite — what's the calmest way to say Willa's keeps real protein and fiber in the cup without slipping into diet-culture talk?",
  "The EPA reopened its glyphosate review this cycle — how hard do we lean on the certified-glyphosate-free receipt without sounding fearmongering or like we're taking a victory lap?",
  "Coffee prices are spiking and iced-coffee season is peaking — how do we make the 'move the café home' case feel savvy and craveable instead of like a lecture about saving money?",
  "Those 'natural Ozempic' oat-drink clips are circulating again — how do we honor the instinct toward real, filling food while gently correcting the claim that any pour mimics the medication?"
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
