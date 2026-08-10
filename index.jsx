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
    trend:"The loophole that let companies certify their own additives just cleared its last White House review 🔒",
    detail:"The White House regulatory office finished its review of the FDA's proposed 'Substances Generally Recognized as Safe' rule on Jul 31, 2026, flagging it as a major rule with significant economic impact. It would make FDA notification mandatory for most new GRAS substances, require a public inventory of every notice and its intended use, and clarify how FDA declares a substance not GRAS. Until now a company could convene its own expert panel, self-affirm a new ingredient safe, and never tell the agency or the public.",
    platform:"Federal regulatory + food-safety trade press",
    views:"National regulatory cycle",
    velocity:"high",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"Willa's never needed the loophole — four ingredients, nothing self-certified. Lead with the shortest list on the shelf, said plainly, no fear-mongering.",
    urgency:"RIDE NOW",
    sources:[
      {label:"Food Safety Magazine · GRAS Proposed Rule Clears OMB Review; FDA Sends UPF Whitepaper to OIRA (Aug 4, 2026)", url:"https://www.food-safety.com/articles/11703-regulatory-updates-gras-proposed-rule-clears-omb-review-fda-sends-upf-whitepaper-to-oira"},
      {label:"The Daily Intake · OIRA Completes Review of FDA Proposed GRAS Rule (Aug 7, 2026)", url:"https://www.dailyintakeblog.com/2026/08/oira-completes-review-of-fda-proposed-gras-rule/"}
    ]
  },
  {
    id:"T-2",
    trend:"Washington is finally trying to define 'ultra-processed' — and just sent the draft up for review 📝",
    detail:"HHS and FDA submitted a white paper titled 'Proposed Definition of Ultra-Processed Food' to the White House regulatory office on Aug 3, 2026, following a joint request for public input that closed in October 2025. The format matters: a nonbinding white paper creates a federal reference point without preempting state laws already on the books. This is the definition fight, not a warning label — the argument is over where the line actually falls.",
    platform:"Federal regulatory filing + trade press",
    views:"National regulatory cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"Don't wait for the definition — answer it. Show the whole oat groat and what minimally processed actually looks like in a glass.",
    urgency:"THIS WEEK",
    sources:[
      {label:"FoodNavigator · FDA UPF white paper could reshape food policy (Aug 6, 2026)", url:"https://www.foodnavigator.com/Article/2026/08/06/fda-upf-white-paper-could-reshape-food-policy/"},
      {label:"Food Safety Magazine · GRAS Proposed Rule Clears OMB Review; FDA Sends UPF Whitepaper to OIRA (Aug 4, 2026)", url:"https://www.food-safety.com/articles/11703-regulatory-updates-gras-proposed-rule-clears-omb-review-fda-sends-upf-whitepaper-to-oira"}
    ]
  },
  {
    id:"T-3",
    trend:"Plant-milk volume has fallen more than 5% a year for three straight years — and oat's momentum is cooling 📉",
    detail:"Circana retail data shows dairy-free milk volumes down over 5% annually for three consecutive years, with almond off 9% year-on-year in 2025 and oat milk — long the category's cool kid — losing pace. The analyst reading the numbers named four reasons out loud: price, taste, heavy processing, and low protein next to dairy. Meanwhile dairy milk keeps running at roughly $18 billion a year in US retail.",
    platform:"National business press",
    views:"National business + trade cycle",
    velocity:"high",
    pillars:[
      "REVIEWS/RECS",
      "HEALTH/WELLNESS"
    ],
    angle:"This is the case against processed plant milk, not against oats. Answer all four objections at once with the actual nutrition panel.",
    urgency:"RIDE NOW",
    sources:[
      {label:"Bloomberg · Dairy-Free Milk Sales in Decline as Americans Choose Cow's Milk (Aug 3, 2026)", url:"https://www.bloomberg.com/news/articles/2026-08-03/dairy-free-milk-sales-in-decline-as-americans-choose-cow-s-milk"},
      {label:"Newser · Americans Are Turning Away From Plant Milks (Aug 5, 2026)", url:"https://www.newser.com/story/394134/americans-cool-on-plant-milks-return-to-dairy.html"}
    ]
  },
  {
    id:"T-4",
    trend:"A six-month trial cut people's sweetness intake — cravings and health markers didn't budge 🍬",
    detail:"180 adults were assigned to low-, average- or high-sweetness diets for six months and assessed at one, three and six months, published in the American Journal of Clinical Nutrition. There was no meaningful difference between groups in sweet-taste preference, body weight, or markers tied to diabetes and heart disease. The researchers' conclusion is the useful part: guidance should target the sugar and the energy density, not 'sweetness' as a category, because sweetness from a whole food and sweetness from a syrup are not the same thing.",
    platform:"Nutrition science + health press",
    views:"National health-press pickup",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS"
    ],
    healthSubAngle:"DIABETES",
    angle:"The lever isn't less sweet — it's where the sweet comes from. Willa's Original: 1g, from the oats, nothing added.",
    urgency:"THIS WEEK",
    sources:[
      {label:"ScienceDaily · Cutting sweet foods doesn't curb cravings or improve health (Aug 8, 2026)", url:"https://www.sciencedaily.com/releases/2026/08/260807235103.htm"},
      {label:"PubMed · The Sweet Tooth Trial (American Journal of Clinical Nutrition)", url:"https://pubmed.ncbi.nlm.nih.gov/41485871/"}
    ]
  },
  {
    id:"T-5",
    trend:"Three servings of full-fat dairy a day for twelve weeks — no weight or cholesterol penalty 🥛",
    detail:"A University of Toronto trial put 74 adults with overweight or obesity on either a low-dairy calorie-restricted diet or three daily servings of full-fat dairy, published in The Journal of Nutrition. The full-fat groups matched the low-dairy group on weight, body composition and cholesterol, with better blood pressure and higher calcium, protein and vitamin D intake. This is a real category headwind: the 'low-fat is automatically healthier' story is the one losing this week, and it's the story plant milk quietly leaned on for a decade.",
    platform:"Nutrition science + health press",
    views:"National health-press pickup",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "REVIEWS/RECS"
    ],
    healthSubAngle:"HEART",
    angle:"Stop competing on fat grams. Plant milk's real edge is fiber, no cholesterol, allergen-safe — say that instead of 'lighter.'",
    urgency:"THIS WEEK",
    sources:[
      {label:"ScienceDaily · For decades we were told to choose low-fat dairy. New research says otherwise (Aug 9, 2026)", url:"https://www.sciencedaily.com/releases/2026/08/260808234948.htm"},
      {label:"University of Toronto · Full-fat dairy shows benefits without raising body fat or cholesterol", url:"https://www.utoronto.ca/news/full-fat-dairy-shows-benefits-without-raising-body-fat-or-cholesterol-study-finds"}
    ]
  },
  {
    id:"T-6",
    trend:"Whole milk returns to the lunch line this fall — and the same law opens a door for fortified plant milk 🏫",
    detail:"The USDA final rule took effect Jun 8, 2026, letting districts put whole and 2% back on the tray for the first time since the 2011–12 school year, with fluid milk now excluded from the weekly saturated-fat math. Adoption is optional and varies district to district. The same statute also permits schools to offer nondairy beverages that are 'nutritionally equivalent' to fluid milk under standards set by the Secretary of Agriculture — the plant-milk provision nobody is covering because the whole-milk headline is louder.",
    platform:"USDA policy + national news syndication",
    views:"Back-to-school news cycle",
    velocity:"high",
    pillars:[
      "PARENTING"
    ],
    angle:"The nondairy provision is the story nobody's telling. Make the case a parent could hand to a school: protein, calcium, DHA, allergen-safe.",
    urgency:"RIDE NOW",
    sources:[
      {label:"WFMZ (Stacker) · USDA lets whole milk out of a 15-school-year detention this fall (Aug 4, 2026)", url:"https://www.wfmz.com/health/usda-lets-whole-milk-out-of-a-15-school-year-detention-this-fall/article_7c22bc7a-5b5a-568d-b409-ecdec7b07ac3.html"},
      {label:"Congress.gov (CRS) · The Whole Milk for Healthy Kids Act (P.L. 119-69) — permanent reference page", url:"https://www.congress.gov/crs-product/IN12548"}
    ]
  },
  {
    id:"T-7",
    trend:"Food-allergy training is now federally required for school food staff — this is its first school year 🥜",
    detail:"The Protecting Children with Food Allergies Act, signed Jan 14, 2026, adds a mandatory annual food-allergy module to National School Lunch Program staff training, covering how to prevent, recognize and respond to reactions. Previously USDA made that training available but never required it. Allergy families are being walked through the school-nurse meeting, the action-plan handoff and epinephrine placement as the real pre-first-bell checklist — a completely different back-to-school door than the lunchbox.",
    platform:"Federal policy + allergy press",
    views:"Back-to-school news cycle",
    velocity:"high",
    pillars:[
      "PARENTING",
      "HEALTH/WELLNESS"
    ],
    angle:"Kids is free of the top 9 allergens — that's the point. Talk to the parent filling out the form, not the cafeteria.",
    urgency:"RIDE NOW",
    sources:[
      {label:"Allergic Living · Back-to-School with Food Allergies: 8 Tools for Success (Aug 4, 2026)", url:"https://www.allergicliving.com/2026/08/04/back-to-school-with-food-allergies-8-tools-for-success/"},
      {label:"U.S. Senate · Protecting Children With Food Allergies Bill Signed Into Law (permanent press-room page)", url:"https://www.durbin.senate.gov/newsroom/press-releases/durbin-fischers-protecting-children-with-food-allergies-bill-signed-into-law"}
    ]
  },
  {
    id:"T-8",
    trend:"The category's loudest sustainability voice just widened its climate gap over dairy to 67% 🌱",
    detail:"A new independent life-cycle assessment puts Oatly's ambient barista oat milk at 67% lower climate impact than chilled cow's milk in the UK, up from 55% in 2021 — a nine-point jump its own sustainability director called surprising. The gains come from factory energy efficiency, optimised transport routes, HVO fuel and a shift to British-grown oats across eight best-selling barista products. Hard numbers rather than vibes, defending the plant-milk halo in the same week retail data attacks it.",
    platform:"Trade press + brand sustainability reporting",
    views:"Category trade cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "REVIEWS/RECS"
    ],
    angle:"Provenance is becoming a receipt, not a vibe. Willa's has carbon-sequestering organic oats and zero food waste — publish the proof, quietly.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Green Queen · Oatly Widens Oat Milk Emissions Gap to 67% (Aug 4, 2026)", url:"https://www.greenqueen.com.hk/oatly-sustainability-barista-oat-milk-emissions-gap-climate-impact-lca/"},
      {label:"Oatly · Climate footprint product label (permanent brand reference page)", url:"https://www.oatly.com/en-gb/oatly-who/sustainability-plan/climate-footprint-product-label"}
    ]
  },
  {
    id:"T-9",
    trend:"The clean-label challenger is expanding on two fronts at once — new formats and borrowed celebrity reach 🥥",
    detail:"MALK added shelf-stable Organic Unsweetened Coconut and Cashew milks on Aug 7, 2026 — four simple ingredients, no gums, oils or fillers, USDA Organic, Non-GMO, gluten-free and Glyphosate Residue Free, holding 18 months unopened. A day earlier its almond milk turned up as the base of a limited-run celebrity smoothie at a Los Angeles grocer, the latest in a run of collabs it has ridden at near-zero media cost. Clean label is being stretched into new formats and amplified on someone else's launch.",
    platform:"Brand newsroom + retail",
    views:"Category trade cycle",
    velocity:"medium",
    pillars:[
      "REVIEWS/RECS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"Two cheap levers Willa's also has: a format the fridge doesn't limit, and a venue collab instead of a paid celebrity deal.",
    urgency:"THIS WEEK",
    sources:[
      {label:"MALK Organics newsroom · Shelf-stable coconut and cashew expansion (Aug 7, 2026)", url:"https://malkorganics.com/blogs/news/your-pantry-just-got-cleaner-malk-expands-its-shelf-stable-lineup-with-coconut-and-cashew"},
      {label:"MALK Organics newsroom · Blueberry SYRN smoothie at Erewhon features MALK almond milk (Aug 6, 2026)", url:"https://malkorganics.com/blogs/news/sydney-sweeney-s-blueberry-syrn-smoothie-at-erewhon-features-malk-organic-almond-milk"}
    ]
  },
  {
    id:"T-10",
    trend:"A celebrity cold-brew brand just tripled its lineup — and every can is built on oat milk ☕",
    detail:"JOLENE, the ready-to-drink cold brew founded by Anthony Kiedis with Shane Powers and John Terzian, released its first new flavors since launch on Aug 4, 2026: Red Velvet, Hazelnut and Salted Caramel, in 8oz cans, gluten-free and dairy-free on an oat-milk base, launching through New York City retail and direct. Each carries 120 calories, 10–14g of sugar and 188mg of caffeine. A new premium brand is still betting its whole formula on oat in the exact week the category got called cooling.",
    platform:"Beverage trade press",
    views:"Category trade cycle",
    velocity:"medium",
    pillars:[
      "INGREDIENTS/RECIPES",
      "REVIEWS/RECS"
    ],
    angle:"Oat isn't the problem — the sugar load is. Own the coffee occasion on the ingredient list, not on another flavor name.",
    urgency:"THIS WEEK",
    sources:[
      {label:"BevNET · JOLENE Coffee Introduces Three Bold New Flavors (Aug 4, 2026)", url:"https://www.bevnet.com/pr/2026/08/04/jolene-coffee-introduces-three-bold-new-flavors"},
      {label:"Jolene Coffee · product lineup (permanent brand landing page)", url:"https://jolenecoffee.com/"}
    ]
  }
];



const TICKER = [
  {agent:"trend", text:"the rule ending self-certified food additives cleared its last review — booked Christina's first on-camera slot for \"nothing self-certified. nothing to disclose.\""},
  {agent:"editor", text:"killed the personality-led version of the loophole story — the source 403'd and never surfaced independently, so the card runs on two links verified end to end."},
  {agent:"comp", text:"the category got charged with four failures at once, so the Wednesday Reel answers all four — and taste goes first, because that's the one that resolves on tasting."},
  {agent:"pulse", text:"swapped the week's meme slot after the documentary sit-down turned out to be the same post we ran in mid-July — the childhood-photo beat drop replaces it, and the payload is the bowl that never changed."},
  {agent:"editor", text:"moved back-to-school to the nurse's office: allergy training is federally required for its first school year, and every lunchbox angle is spent."},
  {agent:"trend", text:"one law puts whole milk back on the tray and permits a nutritionally equivalent nondairy beverage — nobody covered the second sentence, so we briefed it."},
  {agent:"comp", text:"the sustainability leader published audited numbers, so provenance is a receipt now — answered with zero food waste and the whole groat, no percentages, no comparison."},
  {agent:"visual", text:"held Barista to one slot and ran it as category critique — a can picks your sugar for you, a glass doesn't."},
  {agent:"hook", text:"sharpened the single-serve dessert pin to \"a whole chocolate cake that happens to serve one.\""},
  {agent:"pulse", text:"killed the number-one sound on the board — a haircut reveal has no payoff a carton can occupy, and forcing it would read as chasing."},
  {agent:"paid", text:"amplification concentrates on the two Wednesday briefs — the four-objection Reel takes the saves budget, the founder stance a smaller, tighter reach spend."},
  {agent:"perf", text:"the uncut label read has topped saves four refreshes running — this week it lives inside the certification-stack carousel rather than as its own post."}
];


const COMPETITORS = [
  {
    id:"C-1",
    name:"Oatly",
    color:"#0F5C4B",
    status:"Published a new independent life-cycle assessment on Aug 4, 2026 showing its ambient barista oat milk now carries a 67% lower climate impact than chilled cow's milk in the UK, up from 55% in 2021 — driven by factory energy efficiency, optimised transport, HVO fuel and a shift to British-grown oats across eight best-selling barista products.",
    direction:"up",
    opportunity:"They're defending the halo with audited numbers. Willa's answer is provenance: carbon-sequestering organic oats, zero food waste, whole groat. Publish the receipt.",
    sources:[
      {label:"Green Queen · Oatly Widens Oat Milk Emissions Gap to 67% (Aug 4, 2026)", url:"https://www.greenqueen.com.hk/oatly-sustainability-barista-oat-milk-emissions-gap-climate-impact-lca/"}
    ]
  },
  {
    id:"C-2",
    name:"MALK Organics",
    color:"#6B8E3D",
    status:"Added shelf-stable Organic Unsweetened Coconut and Cashew milks on Aug 7, 2026 — four ingredients, no gums, oils or fillers, USDA Organic, Non-GMO, gluten-free and Glyphosate Residue Free, 18 months unopened. A day earlier its almond milk was the base of a limited-run celebrity smoothie at a Los Angeles grocer, its latest ride on someone else's launch.",
    direction:"up",
    opportunity:"Clean label is stretching into new formats and borrowed reach. Willa's has both levers, plus a glyphosate cert and a mother-founded story.",
    sources:[
      {label:"MALK Organics newsroom · Shelf-stable coconut and cashew expansion (Aug 7, 2026)", url:"https://malkorganics.com/blogs/news/your-pantry-just-got-cleaner-malk-expands-its-shelf-stable-lineup-with-coconut-and-cashew"},
      {label:"MALK Organics newsroom · Blueberry SYRN smoothie at Erewhon features MALK almond milk (Aug 6, 2026)", url:"https://malkorganics.com/blogs/news/sydney-sweeney-s-blueberry-syrn-smoothie-at-erewhon-features-malk-organic-almond-milk"}
    ]
  },
  {
    id:"C-3",
    name:"Chobani",
    color:"#1E4C8A",
    status:"A federal appellate judge revived a consumer suit on Aug 4, 2026 over the 'Zero Sugar' yogurt line, which carries 4g of allulose per serving against a half-gram threshold for sugar-free-type claims. The FDA filed an amicus brief stating allulose falls under the legal definition of sugar and that its 2020 enforcement guidance was never meant to shield companies from consumer suits. The case moves to discovery.",
    direction:"down",
    opportunity:"Claims-forward labelling is now a litigation surface. Willa's never needed a sweetener asterisk — 1g, from the oats. Say the number, skip the claim.",
    sources:[
      {label:"Food Dive · Chobani faces revived lawsuit claiming 'zero sugar' label deceived consumers (Aug 4, 2026)", url:"https://www.fooddive.com/news/chobani-zero-sugar-consumer-lawsuit-allulose/826934/"}
    ]
  },
  {
    id:"C-4",
    name:"JOLENE Coffee",
    color:"#B33A3A",
    status:"Released its first new flavors since launch on Aug 4, 2026 — Red Velvet, Hazelnut and Salted Caramel — in 8oz cans built on an oat-milk base, gluten-free and dairy-free, 120 calories with 10–14g sugar and 188mg caffeine, launching through New York City retail and direct.",
    direction:"up",
    opportunity:"A new brand still bets everything on oat — oat isn't the problem. Win the coffee occasion on the ingredient list, not another flavor.",
    sources:[
      {label:"BevNET · JOLENE Coffee Introduces Three Bold New Flavors (Aug 4, 2026)", url:"https://www.bevnet.com/pr/2026/08/04/jolene-coffee-introduces-three-bold-new-flavors"}
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
    id:"AUG10-TT-1",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Wed Aug 12 · 9am",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"nothing self-certified. nothing to disclose.\" — founder stance on the loophole",
    intel:[
      {type:"TREND", text:"T-1: the FDA's proposed rule on 'Generally Recognized as Safe' substances cleared its final White House review on Jul 31, 2026 and was flagged a major rule. Until now a company could convene its own hand-picked experts, self-affirm a brand-new ingredient safe, put it in food, and never notify the agency or the public; the rule would make notification mandatory and publish an inventory of every notice and its intended use. T-2 lands in the same window — a federal definition of 'ultra-processed' went up for review Aug 3, 2026 — which means the whole argument for the next month is about what companies actually have to say out loud. Willa's is the brand with nothing to add to that filing."},
      {type:"AUDIENCE", text:"The audience already suspects the system runs on trust rather than proof; what they don't know is the specific mechanism, and naming it plainly is more powerful than any adjective. Give them the one sentence they'll repeat to someone else — a company could decide on its own — then hand them the four-thing list as the relief, not as the argument. No fear, no 'chemicals,' no scare word does the work here; the calm is the persuasion."},
      {type:"COMPETITOR", text:"INTERNAL ONLY — a federal appellate court revived a consumer suit on Jul 28, 2026 over a 'Zero Sugar' yogurt line carrying 4g of allulose, with the FDA's amicus brief stating allulose meets the legal definition of sugar; trade coverage of the FDA position was still running Aug 4, 2026. Claims-forward labelling is now a litigation surface, which is exactly why Willa's stance should be a stated number and a third-party certification rather than a claim. Do not reference the case, the brand, or any lawsuit in consumer copy."}
    ],
    hooks:[
      {text:"companies can call their own new ingredients safe — and never tell anyone.", recommended:true},
      {text:"there's a legal way to put a brand-new ingredient in food and skip the paperwork.", recommended:false},
      {text:"we've never once had to explain something on our carton.", recommended:false}
    ],
    caption:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. Four things, and not one of them needed anyone's permission.\n\nIt's worth saying plainly, because of how the system has actually worked. A company could bring in its own hand-picked scientists, decide a brand-new ingredient was safe, put it in food, and never file a word with the agency or tell the public. On Jul 31, 2026 the rule that would close that route cleared its final review — new ingredients would have to be filed, listed publicly, and named for what they're for.\n\nWilla's never used that door. Organic. The whole oat groat — the entire kernel, bran and germ included — so the fiber and the protein stay in the carton instead of getting filtered out. 1g sugar, from the oats. 4g+ protein. 2g+ prebiotic fiber.\n\nAnd nothing here is certified by us. Certified glyphosate-free, tested every lot, by an outside lab whose whole job is to check.\n\nNothing self-certified. Nothing to disclose. 🌾",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#cleanlabel",
      "#foodtransparency",
      "#realfood",
      "#wholeoat",
      "#glyphosatefree",
      "#ingredientlist",
      "#motherfounded"
    ],
    visual:"Reserved founder-activist slot. Bright real kitchen, not a set — warm cream walls, pale wood counter, window light from camera-left with no fill and no filter, so the frame reads like 9am rather than a studio. Palette is cream + navy ink (#202A44) typography with creamy blue (#73B2C9) used once, for the single mechanism overlay. Static tripod, eye-level, medium close-up, and the camera holds — no whip pans, no jump cuts, no zoom until the single slow push at the proof beat. Christina is the only person in frame and she stays still; hands rest, no gesturing, no eyebrow. Willa's Original enters at 3 seconds, set down on the counter at frame-right, label forward, and stays there for the remaining 20+ seconds — roughly a third of the frame, never picked up, never turned, never flipped. On-screen text is lower-third, one line at a time, sans-serif, no boxes or stickers. No stock news footage, no headline screenshots, no document B-roll, no red arrows. The whole visual argument is that a person can say this calmly in her own kitchen without raising her voice — Patagonia gravity, high road, the confidence of a brand with nothing to add to the filing.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Cold open, no B-roll, no title card. Static tripod, eye-level medium close-up: Christina already mid-thought in her own kitchen, window light camera-left, cream wall behind her. She is calm and completely still. Spoken: 'companies can call their own new ingredients safe — and never tell anyone.' On-screen text, navy on cream, lower third: 'companies can call their own new ingredients safe.'"},
      {scene:"THE ANSWER", time:"3-9s", action:"No cut. She reaches off-frame and sets Willa's Original on the counter at frame-right, label forward, then takes her hand away and leaves it there for the rest of the video. Camera does not move. She names the list. On-screen text stacks one line at a time beside the carton, 1.2s apart: 'organic whole grain oats' / 'filtered water' / 'organic vanilla extract' / 'sea salt'. Final line under the stack: 'four things. none of them needed permission.'"},
      {scene:"THE MECHANISM", time:"9-15s", action:"Same locked frame, no cut. She explains the route in plain language, unhurried, no scare words: a company brings in its own scientists, decides a new ingredient is safe, puts it in food, files nothing. A single creamy-blue (#73B2C9) overlay appears and holds: 'own scientists → own decision → no filing.' As she says the route is being closed, a soft line strikes through the overlay and it fades. Second overlay, navy: 'that rule cleared its last review Jul 31, 2026.' No news footage, no documents, no logos on screen."},
      {scene:"PROOF", time:"15-21s", action:"First and only camera move: slow 4-second push-in to a tight frame of Christina's hand resting beside the carton — she does not turn it or lift it. She delivers the whole-oat line: the entire kernel, bran and germ included, so the fiber and the protein stay in instead of getting filtered out. Overlay ticks in beside the carton: '1g sugar · 4g+ protein · 2g+ prebiotic fiber'."},
      {scene:"END CARD", time:"21-26s", action:"Hard cut back to the wide static frame. Straight to camera, one beat of silence before it: 'nothing here was self-certified.' Cut to a plain cream card, navy type, no motion: 'nothing self-certified. nothing to disclose.' Hold 1.5s, then the stinger card in the same type: 'certified glyphosate-free. because that matters.' Willa's wordmark bottom-centre. No music sting, no whoosh."}
    ],
    audio:"Founder sync sound — Christina on camera, live room tone only for the first 12 seconds so the stance carries with nothing under it. A single low piano note enters beneath the proof beat and resolves on the end card. No trending sound, no bass drop, no sped-up edit, no caption-read-aloud energy. If a bed is needed for the platform, keep it under -24dB and instrumental. The pacing note for the edit: leave the half-second of silence before the closing line in.",
    duration:"24-26 seconds",
    cta:{soft:"keep this one for the next time an ingredient list runs long.", medium:"pour Willa's Original — organic, whole oat, four things on the list.", strong:"Willa's Original: 1g sugar, 4g+ protein, 2g+ prebiotic fiber, USDA Organic, certified glyphosate-free and tested every lot."},
    benefitShorthandId:"BS-11"
  },
  {
    id:"AUG10-IG-R1",
    platform:"Instagram Reel",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Wed Aug 12 · 12pm",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"taste it first — that's the part we're least worried about.\" — four-objection category answer",
    intel:[
      {type:"TREND", text:"T-3: national retail data has dairy-free milk volumes falling for three straight years, and the analyst reading the numbers named four reasons out loud — price, taste, heavy processing, and low protein next to dairy. T-5 compounds it: a University of Toronto trial in The Journal of Nutrition found three daily servings of full-fat dairy carried no weight or cholesterol penalty, which retires the 'lighter is healthier' story plant milk quietly leaned on for a decade. INTERNAL ONLY — none of this data, no percentage, no analyst and no report ships in consumer copy. The customer hears the complaints, never the numbers behind them."},
      {type:"AUDIENCE", text:"CP-8: protein is the most talked-about and most misunderstood nutrient going, now stamped on coffee, chips and soda, and the recurring mistake is treating the number on the front of the pack as the whole story. The buyer who once put back a chalky carton isn't reading a report — she's remembering a taste. Answer the taste first and let the numbers hold it up. That order is the whole brief."},
      {type:"COMPETITOR", text:"C-3 (INTERNAL): a federal appellate judge revived a consumer suit over a major dairy brand's 'Zero Sugar' yogurt claim (Food Dive coverage Aug 4, 2026), with the FDA filing an amicus brief stating allulose falls under the legal definition of sugar. Claims-forward labelling is now a litigation surface. Willa's never needed a sweetener asterisk — state the gram, skip the claim. The brand is never named on camera or in caption."}
    ],
    hooks:[
      {text:"everybody's got a plant milk they bought once and never finished.", recommended:true},
      {text:"watery. over-processed. barely any protein. let's go one at a time.", recommended:false},
      {text:"shhh… most of the complaints about plant milk are fair.", recommended:false}
    ],
    caption:"Watery. Over-processed. Barely any protein. The complaints about plant milk are fair — they're just not about this carton. 🥛\n\nWilla's Original is four organic ingredients: whole grain oats, filtered water, vanilla extract, sea salt. It pours rich and smooth because it's made from the whole oat, not oat syrup. 4g+ protein, 2g+ prebiotic fiber — the kind that feeds your gut — and 1g of sugar, from the oats, nothing added.\n\nThe shortcut most of the category takes: filter out the bran and germ, then process the starch into sugar. That's the fiber AND the protein, gone before it ever reaches the carton. Willa's keeps the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled.\n\nCertified organic. Certified glyphosate-free, tested every lot. Mother-founded, WBENC certified.\n\nAnd if a carton's going to take up fridge space, it should earn it.\n\nTaste it first — that's the part we're least worried about.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#plantmilk",
      "#cleaningredients",
      "#glyphosatefree",
      "#dairyfree",
      "#prebioticfiber",
      "#realfood"
    ],
    visual:"Bright, high-key kitchen — near-white counter (#FAFAF7), cream board, navy ink (#202A44) typography with purple (#A191B2) accent marks for the check ticks and the complaint lines. Hands only, no talent on camera. Two camera positions carry the whole piece: a side-on 50mm at glass height for the pour, and a locked overhead for the checklist. Real hard window light, mid-morning, no diffusion and no filter — the glass should throw a real shadow. Willa's Original carton is label-forward and in frame for at least 60% of the runtime, and it never leaves the right third once it enters. The hero frame is the pour clinging to the inside of the clear glass and leaving a visible coat — that shot is the taste claim, so it gets shot the most times and cut the longest. Text enters as clean single lines, never stacked more than four deep, and the three complaint lines are the only copy that appears in purple; everything Willa's says appears in navy. Final frame is glass and carton together in the light with the end-card line centered underneath.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Handheld, eye-level: a hand opens a fridge door, pushes past two anonymous cartons at the front (labels turned away, never identifiable), and pulls Willa's Original from the back. On-screen text, navy on cream: 'everybody's got a plant milk they bought once and never finished.'"},
      {scene:"THE CHARGES", time:"3-8s", action:"Cut to a locked overhead of one empty clear glass on a cream board. Three lines type on in purple, one at a time, stacking: 'watery' → 'over-processed' → 'barely any protein.' Music drops out entirely under this beat — room tone only. No voiceover."},
      {scene:"THE POUR", time:"8-14s", action:"Cut to side-on 50mm slow motion at glass height: Willa's Original pours into the glass in hard window light, carton label-forward at frame right. Hold long — the milk clings to the glass wall and leaves a coat. The three purple complaint lines wipe off screen as the milk rises past them. On-screen text lands: 'rich + smooth. that's not an accident.'"},
      {scene:"THE CHECKLIST", time:"14-20s", action:"Locked overhead: carton set on the cream board, label forward, glass beside it. Four purple check marks tick on in rhythm, one line each — '4 organic ingredients ✅ · 4g+ protein ✅ · 2g+ prebiotic fiber ✅ · 1g sugar, from the oats ✅'. A hand enters and turns the carton a quarter-turn on the last tick."},
      {scene:"THE RECEIPTS", time:"20-24s", action:"Macro drift across the certification marks on the carton, shallow depth of field, one focus pull per line. On-screen text, one at a time: 'certified organic' → 'certified glyphosate-free, tested every lot' → 'mother-founded, WBENC certified.'"},
      {scene:"END CARD", time:"24-26s", action:"Hard cut back to the side-on frame: full glass and carton together in the light, a hand lifts the glass out of frame and the carton is left alone in focus. On-screen text centered underneath: 'the whole oat. not the syrup.'"}
    ],
    audio:"Warm narrative voiceover — dry, unhurried, matter-of-fact, zero defensiveness. Not framed as the founder. Light acoustic bed sitting low in the mix, cut to silence under THE CHARGES beat so the three complaints land in room tone, then back in on the pour. Pour, glass and cap sounds close-miked and left audible over the VO.",
    duration:"24-26 seconds",
    cta:{soft:"save this for the next time someone tells you plant milk is watery.", medium:"pour Willa's Original — four organic ingredients, made from the whole oat.", strong:"try Willa's Original: 4g+ protein, 2g+ prebiotic fiber, 1g sugar from the oats, certified organic and glyphosate-free, tested every lot."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG10-PIN-1",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Chocolate",
    dnaPattern:"viral-recipe-remix",
    timing:"Wed Aug 12 · 2pm",
    priority:"STANDARD",
    concept:"\"a whole chocolate cake that happens to serve one.\" — single-serve dessert pin",
    intel:[
      {type:"PULSE", text:"CP-5: single-serve cakes assembled one portion at a time — desserts built in a cup instead of a pan — are named among the viral formats actually changing what people buy (Aug 8, 2026). The build is milk-dependent in both the batter and the soak, so the carton is structural here, not a cameo."},
      {type:"AUDIENCE", text:"Portion-honest dessert is a save-for-later Pinterest query, not a scroll-past one — it keeps pulling long after the format cools. This is the week's one indulgent-remade-clean slot, and Chocolate is the only SKU that should hold it."},
      {type:"COMPETITOR", text:"INTERNAL: chocolate plant-milk SKUs in the category get positioned either as a kids' cup or as a sugar-forward treat. Willa's Chocolate is the one with an awards case to make as a baking ingredient — use dessert formats to move it out of the kids' cup."}
    ],
    hooks:[
      {text:"dairy-free chocolate cake for one (the pan was never the point)", recommended:true},
      {text:"let's make chocolate cake for one (dairy-free!)", recommended:false},
      {text:"chocolate cake in a cup, soaked in the oat milk that won Best Beverage", recommended:false}
    ],
    caption:"Cake for one, and no pan to wash. 🍫 A whole chocolate cake that happens to serve exactly one person — baked in a cup, soaked while it's still warm, and rich enough that nobody asks what's missing.\n\nWilla's Organic Chocolate Oat Milk is made with real cacao and five simple organic ingredients — rich and creamy enough to carry a bake, with less sugar and more protein and fiber per cup. It won Best Beverage at the Good Food Awards. 🥛\n\nIngredients\n- 1 cup Willa's Organic Chocolate Oat Milk (1/2 for the batter, 1/2 warmed for the soak)\n- 3/4 cup oat flour\n- 2 tbsp organic cacao powder\n- 2 tbsp maple syrup\n- 1 tsp baking powder\n- pinch of sea salt\n- 2 tbsp coconut cream, whipped, to finish",
    hashtags:[
      "#willas",
      "#chocolateoatmilk",
      "#dairyfreedessert",
      "#cakeforone",
      "#dairyfreebaking",
      "#oatmilk",
      "#chocolatecake",
      "#singleservedessert",
      "#cleanlabel",
      "#realcacao"
    ],
    visual:"Vertical 2:3 pin, shot for the save — recipe-card clarity over clever styling. Primary frame is a slight 3/4 overhead on a single clear glass cup of chocolate cake on a pale wooden board, the soak line visible through the glass as a darker band halfway up, one spoon already pulled through so the crumb reads. Warm afternoon window light from camera left, soft shadow, no filter. Palette is cream and deep cacao brown with green (#75C596) as the only accent and navy ink (#202A44) for type. Willa's Chocolate carton stands in the upper third, label forward, tall enough to occupy roughly a quarter of the frame — the pour is the second hero, so shoot an alternate frame with warm Willa's Chocolate being poured over the baked cup and use whichever reads richer. Big legible overlay across the top: 'DAIRY-FREE CHOCOLATE CAKE FOR ONE' in navy on cream with a green rule beneath, and a small kicker line at the base: 'serves 1. no notes.' Bottom-right corner card, small: 'real cacao · five ingredients in the milk.' Hands only, no talent. Nothing crops the carton out if someone screenshots the top two-thirds.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"pin it for the next time one slice is the right amount.", medium:"made with Willa's Chocolate — real cacao, five organic ingredients, no cane sugar.", strong:"Willa's Chocolate: real cacao, 5 ingredients, coconut sugar instead of cane — Good Food Awards Best Beverage."},
    benefitShorthandId:"BS-9"
  },
  {
    id:"AUG10-TT-2",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Thu Aug 13 · 9am",
    priority:"HIGH",
    rideNow:true,
    concept:"\"same bowl. the milk finally caught up.\" — childhood-photo beat drop",
    intel:[
      {type:"PULSE", text:"CP-1: the 'used to go fishin'' spoken audio has become the go-to nostalgic transition — a childhood photo holds on screen, then cuts hard on the beat to the creator's present day. It is running mostly as GRWM and outfit reveals; the then/now structure underneath it is wide open for a food brand."},
      {type:"AUDIENCE", text:"Willa's buyer grew up on the breakfast she is now re-buying for herself — the bowl is the most loaded nostalgic object in her kitchen and she is not being asked to feel bad about any of it. This is the abundance lane, not the correction lane: nothing about the childhood frame gets mocked."},
      {type:"COMPETITOR", text:"INTERNAL: the category spent this week on novelty formats and borrowed celebrity reach. Nostalgia sourced from an actual 1921 founder story is the one lane a brand cannot buy into. Do not say any of this on camera."}
    ],
    hooks:[
      {text:"the bowl hasn't changed since 1998. the milk has.", recommended:true},
      {text:"you've been eating this exact breakfast for twenty years.", recommended:false},
      {text:"same cereal bowl, grown-up ingredient list.", recommended:false}
    ],
    caption:"Twenty years of the exact same breakfast, and only one thing on the table ever needed updating. 🥣\n\nSame bowl. The milk finally caught up. Willa's Original is four things: organic whole grain oats, filtered water, organic vanilla extract, sea salt.\n\n1g of sugar, and all of it from the oats. 4g+ protein and 2g+ prebiotic fiber — the kind that supports gut and heart health — because we use the whole oat groat, the whole oat kernel the way steel-cut oats do. Most oat milks filter out the bran and germ and process the starch into sugar, which throws away the fiber AND the protein. We kept both.\n\nCertified organic. Certified glyphosate-free, tested every lot. Nothing here you didn't already know the name of.\n\nReal food, passed down. Reinvented forward. 🌾",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#fouringredients",
      "#cleanlabel",
      "#wholeoat",
      "#labelcheck",
      "#dairyfree",
      "#oatmilktok",
      "#nostalgia"
    ],
    visual:"Two looks, one hard cut. FIRST HALF is the archive: a real childhood photo or home-video frame of a cereal bowl at a kitchen table — grain, soft focus, warm faded color, 4:3 with the vertical frame filled top and bottom by a blurred blow-up of the same image. Let it feel found, not designed; a thumb at the edge of the photo is a bonus, not a flaw. SECOND HALF is present-day Willa's house style: bright kitchen, cream and green (#75C596), navy ink (#202A44) typography, morning window light camera-left. Same framing as the photo — bowl centered, spoon at the same angle — so the cut reads as the SAME shot twenty years later. That match is the whole trick; storyboard the archive frame first and build the live shot to match it, not the other way round. Willa's Original carton stays in frame for the entire second half, label forward, just behind the bowl. No text on the archive half — let the audio carry it. Overlay copy only lands after the cut.",
    script:[
      {scene:"HOOK", time:"0-4s", action:"Full-frame archive: a faded childhood photo of a cereal bowl on a kitchen table, held completely static. No text, no movement, no product. The spoken audio runs clean over it. Let it sit long enough to feel like a real memory and not a setup."},
      {scene:"THE HOLD", time:"4-8s", action:"Same photo, an almost imperceptible slow push-in on the bowl. Small on-screen text, bottom third, plain navy: 'this exact breakfast. every morning.' Nothing else moves."},
      {scene:"THE CUT", time:"8-12s", action:"Hard cut on the beat to present day: identical framing, bright kitchen, real bowl, same spoon angle, morning light camera-left. Willa's Original carton just behind, label forward. Text snaps in: 'same bowl.' Hold one full beat with no other movement so the match lands."},
      {scene:"THE POUR", time:"12-18s", action:"Close-up, hands only: Willa's Original pours over the bowl in one clean unbroken take — thick, matte, no bubbles. Text ticks in one line at a time as it pours: 'organic whole grain oats' / 'filtered water' / 'organic vanilla' / 'sea salt.' Four lines, four beats, then stop."},
      {scene:"PAYOFF", time:"18-22s", action:"Pull back to the wide match-frame, spoon lifts once. Text: 'the milk finally caught up.' Carton stays in shot, label forward."},
      {scene:"END CARD", time:"22-24s", action:"Static lockup on cream: carton centered, bowl beside it. Navy type, BS-2 stinger: 'Four ingredients. (Read 'em.)' Audio ends clean on the last frame."}
    ],
    audio:"The trending 'and I used to go fishin' when I was a lil girl, you gotta be real quiet on the creek' spoken audio — pull it from the TikTok sound page so the post attaches to the sound rather than a recreation. The cut to present day lands exactly on the audio's turn. No voiceover and no talent on camera: the memory does the talking and every line lives in the on-screen text. Close-mic the pour and the single spoon clink so the second half has real texture under the music.",
    duration:"22-24 seconds",
    cta:{soft:"send this to whoever still eats your childhood breakfast.", medium:"pour Willa's Original over it — four ingredients, that's the whole list.", strong:"pour Willa's Original: 4 ingredients, 1g sugar straight from the oats, 4g+ protein, 2g+ prebiotic fiber, certified organic and glyphosate-free, tested every lot."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"AUG10-IG-R2",
    platform:"Instagram Reel",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Thu Aug 13 · 12pm",
    priority:"BIG SWING",
    concept:"\"free of the top 9 — that list is already long enough.\" — allergy-desk back-to-school",
    intel:[
      {type:"TREND", text:"T-7: the Protecting Children with Food Allergies Act (signed Jan 14, 2026) added a mandatory annual food-allergy module to National School Lunch Program staff training, and Aug 2026 is its first school year on the ground. Allergy families are working a completely different pre-first-bell checklist right now — the nurse meeting, the action-plan handoff, the epinephrine placement. Speak to the parent filling out the form, not to the cafeteria."},
      {type:"AUDIENCE", text:"This is the back-to-school room the AUG 3 slate never entered. The lunchbox door (cost, hectic mornings, kids'-drink labels) is spent across JUL 27 + AUG 3 — the allergy desk is genuinely new and it is at peak intent for the second week of August. Partake Foods is the posture: talk to one audience with total confidence and do not broaden to keep non-parents comfortable. Alienating non-parents on this brief is fine; the week balances elsewhere."},
      {type:"COMPETITOR", text:"INTERNAL: the clean-label peer set keeps spending its energy on new SKU formats and borrowed celebrity reach — shelf-facing, consumer-channel plays. Nobody is standing at the allergy desk. Willa's Kids sits on top-9-free + 8g protein + mother-founded, a stack the tree-nut-based clean-label set structurally cannot run. Do not say any of this on camera — let the carton and the paperwork do it."}
    ],
    hooks:[
      {text:"if your back-to-school starts in the nurse's office, this one's for you.", recommended:true},
      {text:"the allergy-parent version of back-to-school is a whole other list.", recommended:false},
      {text:"none of the top 9. and shhh… they still ask for it.", recommended:false}
    ],
    caption:"There's a version of back-to-school that happens before the first bell — the meeting, the forms, the folder you hand to someone else and hope they actually read. 📋\n\nWilla's Kids is free of the top 9 allergens — that list is already long enough. No dairy, soy, wheat, egg, peanut, tree nut, fish, shellfish or sesame. 8g of protein, the same as dairy. Plant-based calcium, and plant-based DHA — the omega-3 most kids don't get enough of.\n\nParents asked us to make a kids' product. We listened. This turned out to be the part they asked about first.\n\nTo every family filling out forms this August: we see you. 🤎",
    hashtags:[
      "#willas",
      "#willaskids",
      "#top9free",
      "#foodallergymom",
      "#foodallergyfamily",
      "#backtoschool",
      "#oatmilk",
      "#dairyfree",
      "#kidsnutrition",
      "#momsofinstagram"
    ],
    visual:"Real kitchen, real morning — mid-morning daylight through a window, no ring light, no studio setup. Palette is warm cream with PARENTING brown (#9E652E) accents and navy ink (#202A44) typography; bright and lived-in, not styled. Talent is the cofounder-sister ONLY — Christina is not in this brief and should not appear in any frame or VO. Shoot handheld at chest height with slight natural movement; she is mid-task the whole time and only settles to camera on the first and last lines. The paperwork is the co-star: a real manila folder, school forms, a printed action plan, a highlighted list — shot overhead, hands only, with no readable personal details on screen (use blank or blurred forms). Willa's Kids carton enters at 0:08 and stays in frame through the end, label forward, occupying 30–40% of the last three key frames. On-screen text sits lower-third, sentence case, generous line breaks, one line at a time — never stacked. End card is the carton alone on the counter in morning light running the BS-6 stinger trimmed to its FIRST CLAUSE only — 'no top-9 allergens.' — deliberately without the 'school-safe' half, so nothing on screen can read as a claim that Willa's Kids is approved for, or served in, school meal programs.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Cofounder-sister stands at a real kitchen counter holding a manila folder of school paperwork, handheld chest-height, morning window light behind her. She looks up at camera and says the line out loud, unpolished: 'if your back-to-school starts in the nurse's office, this one's for you.' On-screen text (navy on cream, lower third) mirrors it exactly."},
      {scene:"THE LIST", time:"3-8s", action:"Cut to overhead, hands only: she fans the contents of the folder across the counter — forms, a printed action plan, a highlighted sheet. Blank or blurred documents, no readable personal detail. Her voice continues off-camera, dry: 'there's the list. and then there's the other list.' On-screen text: 'one list. and then another list.'"},
      {scene:"THE TURN", time:"8-13s", action:"Handheld follows her to the fridge. Door opens, she lifts out a Willa's Kids carton and sets it down on the counter right beside the paperwork — label forward, deliberate placement, the two objects sharing the frame. On-screen text fades in: 'free of the top 9 allergens.'"},
      {scene:"THE POUR", time:"13-18s", action:"Close-up: she pours Willa's Kids into a small cup. A kid's hand enters frame from the left and takes it — no face required, just the reach and the exit. She half-laughs at the speed of it. On-screen text ticks in three beats: '8g protein · plant-based DHA · calcium'"},
      {scene:"THE RELIEF", time:"18-23s", action:"Back to her, settled now, one hand resting on the carton, the paperwork still spread behind her. She exhales and delivers the payoff straight to camera: 'that list is already long enough.' On-screen text mirrors the line. Hold on her face for a full beat before cutting."},
      {scene:"END CARD", time:"23-25s", action:"Static: the Willa's Kids carton alone on the counter in morning light, paperwork softly out of focus behind it. On-screen text, single line, navy on cream: 'no top-9 allergens.' Small brown wordmark beneath: 'Willa's Kids'. No other copy on the card."}
    ],
    audio:"Cofounder-sister on camera, first-person mom POV — conversational, unhurried, slightly under-rehearsed. Real kitchen room tone, no studio VO booth, no founder framing. Warm acoustic bed low and instrumental underneath (no lyrics, nothing that pulls focus from her voice). Leave the ambient sounds in and audible: paper on the counter, the fridge door, the cup set down.",
    duration:"23-25 seconds",
    cta:{soft:"send this to the parent who's filling out the forms.", medium:"Willa's Kids — free of the top 9 allergens, 8g protein, plant-based DHA + calcium.", strong:"Pour Willa's Kids: free of the top 9 allergens, 8g protein (the same as dairy), plant-based DHA and calcium, organic, mother-founded."},
    benefitShorthandId:"BS-6"
  },
  {
    id:"AUG10-IG-F1",
    platform:"IG Feed",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"before-after-stitch",
    timing:"Thu Aug 13 · 6pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"sweet was never the problem. added was.\" — the sweetness-source switch",
    intel:[
      {type:"TREND", text:"T-4: 180 adults were put on low-, average- or high-sweetness diets for six months and checked at one, three and six months (reported Aug 8, 2026). Sweet-taste preference, body weight and the diabetes + heart markers all held steady across groups. The researchers' own conclusion is the usable part: guidance should target the sugar and the energy density, not 'sweetness' as a category — sweetness from a whole food and sweetness from a syrup are not the same thing. Do not cite the study, the journal, the sample size or any percentage in consumer copy; ship the conclusion, not the paper."},
      {type:"AUDIENCE", text:"This audience has already run the experiment themselves — the no-sugar month, the sweetener swap, the unsweetened-everything phase — and quietly gone back. The brief lands as recognition, not instruction: the phase wasn't the failure, the question was wrong. That's the Relatable Confession beat, and it's also the diet-culture pushback Willa's is supposed to make."},
      {type:"COMPETITOR", text:"INTERNAL (C-3): a national yogurt brand's 'zero sugar' line had a consumer suit revived Aug 4, 2026 over a sweetener a federal filing says meets the legal definition of sugar; the case moves to discovery. Claims-forward labelling is now a litigation surface. Willa's never needed a sweetener asterisk — say the number, skip the claim. Never name the brand, the sweetener or the case in consumer copy, and do not counter-claim 'zero sugar' ourselves."}
    ],
    hooks:[
      {text:"we all tried the month where nothing was allowed to taste good.", recommended:true},
      {text:"sweet was never the problem. added was.", recommended:false},
      {text:"your oat milk should taste like oats, not like syrup.", recommended:false}
    ],
    caption:"Willa's Original is sweet because it's made of oats. 1g of sugar, none of it added — no sweetener to explain, nothing on the carton that needs a footnote. 🌾\n\nSweet was never the problem. Added was. You can spend a whole month with nothing allowed to taste good and land exactly where you started, because \"sweet\" isn't a thing you can quit — it's a question of where it came from. A syrup stirred into a drink, or a whole oat that already tasted like that.\n\nFour organic ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt. It's rich and smooth because the whole oat is still in there. Most oat milks filter out the fiber and the protein — we keep both, which is why there's 4g+ protein and 2g+ prebiotic fiber in every cup, the kind of fiber that supports gut and heart health.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#1gsugar",
      "#nothingadded",
      "#wholeoat",
      "#cleanlabel",
      "#labelcheck",
      "#realfood",
      "#plantmilk"
    ],
    visual:"Static IG Feed carousel, 5 cards, built as a switch arc — the whole point is card 2 → card 3. Palette is creamy blue (#73B2C9) and cream with navy (#202A44) type; bright and design-led, closer to a zine spread than a nutrition infographic. CARD 1 is pure typography, no product: the hook line set large and left-aligned on flat cream, generous margins, one idea only. CARD 2 (the 'before'): a deliberately generic tall glass of something amber and syrup-sweet on a plain surface, shot straight-on at eye level under flat cool light, an unbranded squeeze bottle soft-focus behind it — no logos, no labels, nothing identifiable; small navy overlay bottom-left reads 'sweet because sugar was added.' CARD 3 (the 'after', the hero): a slow clean pour of Willa's Original into a clear glass, shot straight-on at the same eye level and the same crop so the two cards read as a direct swap, but lit with warm real morning light instead of the flat light; carton stands label-forward beside the glass and occupies 40%+ of the frame; overlay reads 'sweet because it's made of oats.' CARD 4: straight-down macro of dry whole oat groats spilling next to the Willa's Original back label, four lines legible, nothing else in frame; small overlay '1g of sugar. none of it added.' CARD 5: the carton on a windowsill in morning light, cream negative space above it, sign-off line set small in navy. No dense text blocks anywhere — one line per card, and cards 2 and 3 must be framed identically or the switch doesn't land.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for the next time someone swears off sweet.", medium:"Willa's Original — 1g of sugar, and it comes from the oats.", strong:"Willa's Original: 1g sugar with nothing added, 4g+ protein, 2g+ prebiotic fiber, four organic ingredients, certified organic + glyphosate-free."},
    benefitShorthandId:"BS-3"
  },
  {
    id:"AUG10-TT-3",
    platform:"TikTok",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Fri Aug 14 · 9am",
    priority:"HIGH",
    concept:"\"fifteen minutes isn't much of a plan. it's enough for a mug.\" — wind-down, not wake-up",
    intel:[
      {type:"PULSE", text:"CP-7: health desks in market after market ran near-identical pediatrician segments Aug 5–6, 2026 telling parents to start the school-year sleep shift one to two weeks early — devices out 30–60 minutes before bed, then a calm last few minutes before lights-out. Most of that same coverage is really about the morning wake-up. Willa's takes the fifteen minutes at the other end of the day and leaves the rest of the routine alone."},
      {type:"AUDIENCE", text:"Every back-to-school post in a parent's feed in August is set between 6am and the bus. The evening is uncontested territory, and it's the half of the day parents actually like. Put Willa's Kids in the warm mug at the end of it and the brand shows up where nobody else is standing."},
      {type:"COMPETITOR", text:"INTERNAL: the category's August noise is novelty flavors and cold formats — all daytime, all iced, all speed. Nobody in plant milk owns a warm evening cup for kids, and warm is a format the whole shelf has ceded. Do not say any of this on camera; just be the one that's warm."}
    ],
    hooks:[
      {text:"everyone's moving bedtime up 15 minutes. nobody said what to do with them.", recommended:true},
      {text:"the last warm thing of the day.", recommended:false},
      {text:"the fifteen minutes every sleep segment mentions and skips.", recommended:false}
    ],
    caption:"A warm mug of Willa's Kids is the last thing that happens before the screens go off. 🌙\n\nPediatricians were on the local news the first week of August with the same advice: start the school-year sleep shift now, screens away 30 to 60 minutes before bed, a calm last few minutes before lights-out. Most of that same advice is really about the morning wake-up.\n\nFifteen minutes isn't much of a plan. It's enough for a mug, a lamp turned low, and the part of the day that isn't rushing anywhere.\n\nWilla's Kids has 8g of protein — the same as dairy — and none of the top 9 allergens. Organic whole oats, plant-based calcium, and DHA, the omega-3 most kids don't get enough of.\n\nMornings get all the back-to-school content. This is the better half.",
    hashtags:[
      "#willas",
      "#willaskids",
      "#bedtimeroutine",
      "#backtoschool",
      "#kidsnutrition",
      "#allergenfriendly",
      "#dairyfreekids",
      "#organicoatmilk",
      "#parentingwins",
      "#schoolyearprep"
    ],
    visual:"Night interior, one room, one continuous moment — no montage, no second location, no time jump. Locked-off camera on a tripod at counter height with a single slow push-in during the pour; every other beat is a hold. One practical light only — a warm lamp just out of frame, roughly 2700K — so the room falls off into soft brown shadow. Palette is warm cream and lamp-amber against PARENTING brown (#9E652E); typography in navy ink (#202A44), set small and low in frame so it never competes with the steam. The Willa's Kids carton sits on the counter, label forward, from the first frame to the last, holding roughly 40% of the key frames — it is never picked up and presented to camera. Hands only, plus a kid framed from behind or below the shoulders; no faces, no founder, no talking head. Real steam, real ceramic — a small mug a child can hold with two hands. No filter, no grade beyond a slight warm lift. Shoot the whole sequence as one take first, then grab coverage; the edit should feel like it never cut. Final frame is the empty counter with the carton and the lamp, held a full six seconds under the end card.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Locked-off wide at counter height, night, single lamp. A hand sets a small ceramic mug down beside the Willa's Kids carton, label forward. Nothing else moves. On-screen text, navy on the warm dark, lower third: 'everyone's moving bedtime up 15 minutes. nobody said what to do with them.'"},
      {scene:"POUR", time:"3-9s", action:"Slow push-in to a close two-shot of carton and mug. Willa's Kids pours warm into the mug, steam catching the lamp light. Hold the pour — no cut, no cutaway. Close-miked pour sound. On-screen text: 'fifteen minutes isn't much of a plan.'"},
      {scene:"HOLD", time:"9-14s", action:"Camera stops and holds. Two small hands come into frame and wrap the mug, lift it just off the counter, and stay there for a beat. Steam rises through the light. On-screen text: 'it's enough for a mug.'"},
      {scene:"HANDOFF", time:"14-19s", action:"Same frame, no cut. The kid carries the mug out of frame toward a lit doorway; an adult hand reaches in and turns a phone face-down on the counter in one motion. On-screen text: '8g protein. same as dairy. none of the top 9 allergens.'"},
      {scene:"END CARD", time:"19-24s", action:"Empty counter. Just the Willa's Kids carton and the lamp, slow focus settle, six seconds of stillness. End-card text fades up: 'Same protein as dairy. Half the sugar.'"}
    ],
    audio:"No voiceover — the room carries it. Close-miked practical sound: ceramic on wood, the pour, a lamp switch, bare feet on floor. Under it, a slow low-volume instrumental bed (soft piano or warm guitar, unhurried, no build, no drop). Nothing trending, nothing percussive — the whole point is that the video gets quieter as it goes.",
    duration:"20-24 seconds",
    cta:{soft:"save this for the week before the first bell.", medium:"pour Willa's Kids warm — 8g protein, none of the top 9 allergens.", strong:"grab Willa's Kids: 8g protein (the same as dairy), 50% less sugar than dairy, plant-based calcium and DHA, free of the top 9 allergens."},
    benefitShorthandId:"BS-5"
  },
  {
    id:"AUG10-IG-R3",
    platform:"Instagram Reel",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"mom-activist",
    timing:"Fri Aug 14 · 12pm",
    priority:"HIGH",
    concept:"\"one law, two sentences — and everyone only read the first one.\" — the school milk provision",
    intel:[
      {type:"TREND", text:"T-6: the USDA final rule took effect Jun 8, 2026, letting districts put whole and 2% milk back on the tray for the first time since the 2011–12 school year, with fluid milk now excluded from the weekly saturated-fat math. Adoption is optional and varies district to district. The story nobody is covering: the same statute also permits a school to offer nondairy beverages that are 'nutritionally equivalent' to fluid milk under standards set by the Secretary of Agriculture. The whole-milk headline is loud enough that the second provision never made the coverage — that gap is the entire brief."},
      {type:"AUDIENCE", text:"T-7 compounds it: the Protecting Children with Food Allergies Act, signed Jan 14, 2026, made an annual food-allergy module mandatory for National School Lunch Program staff training, and this is its first school year. Allergy and dairy-free families are already walking into the school office in the Aug 10–16 window for the nurse meeting and the action-plan handoff — they are in the building, holding a clipboard, and nobody has told them the milk line is also a conversation they're allowed to start. Give them the questions, not a lecture. Compliance note for the writer: the ask is the deliverable, never a claim that any Willa's carton clears any district's standard."},
      {type:"COMPETITOR", text:"INTERNAL: across the Aug 3–10, 2026 window the category spent its energy on shelf-stable format extensions, borrowed celebrity reach and audited climate numbers — all shelf-facing, all consumer-channel. Nobody in the peer set is working the institutional door, which is where a mother-founded brand with an allergen-free kids SKU has an unfair advantage and zero competition. Do not reference any of this on camera or in caption; it is why the brief exists, not what the brief says."}
    ],
    hooks:[
      {text:"you're allowed to ask the school for a milk your kid can actually drink.", recommended:true},
      {text:"everyone read the first sentence of that school milk law. the second one is the one for us.", recommended:false},
      {text:"three questions to bring to the school office before the first bell.", recommended:false}
    ],
    caption:"There's a conversation you're allowed to start at the school office this year — and almost nobody knows it's on the table. 🥛\n\nWilla's Kids exists because parents asked us for it. 8g of protein, the same as dairy. Plant-based calcium, vitamin D, and DHA omega-3s from algae. Free of the top 9 allergens — no nut, soy, gluten, dairy or sesame. 6g of sugar, from organic maple syrup. Yuka, the app that scans groceries and scores the ingredients, gives it 100 out of 100.\n\nHere's the part that got buried. Whole milk comes back to school trays for the 2026–27 school year; that rule took effect Jun 8, 2026. The same law also allows a school to offer a nondairy beverage that meets the nutrition standard set by the Secretary of Agriculture — the federal official who writes school meal rules. One law, two sentences — and everyone only read the first one.\n\nNothing against the milk on the tray. This is about the kid who can't drink it.\n\nWhether a specific carton clears a specific district's standard is that district's call. The asking is yours. Three questions worth bringing:\n\n1. Does our school offer a nondairy option, and which one is it?\n2. What's the request process — a form, a note, a signature?\n3. Who owns this: the food service director, or the nurse?\n\nOur cofounder walks through all three above. Ask before the first bell. 🌾",
    hashtags:[
      "#willas",
      "#willaskids",
      "#backtoschool",
      "#schoollunch",
      "#allergenfree",
      "#foodallergymom",
      "#dairyfreekids",
      "#plantbasedkids",
      "#momsofinstagram",
      "#organicoatmilk"
    ],
    visual:"Real kitchen, real morning — this one cannot look produced or it loses the whole thing. Warm cream and oat palette with brown (#9E652E) accent rules and navy ink (#202A44) typography; light is unfiltered window light from camera left, early, with visible shadow. Willa's cofounder is the only person on camera — Christina does not appear, and no children appear in any frame. Shoot her handheld at 35mm, chest-up, slightly off-center at frame right, leaning on a counter rather than standing squared to lens; she is talking to another parent, not presenting. Cut away to two locked inserts: an overhead of a plain notepad on the counter where a hand writes the three questions in real handwriting, and a macro slow drift across the Willa's Kids carton's nutrition side, label forward, shot in the same window light. The carton lives in frame for at least half the runtime and sits in the on-camera frame the entire time she talks, at the edge of the counter, never held up or presented. Overlays are single clean lines, navy on cream, entering left-aligned under her — never more than one line at a time while she speaks, and the three questions type on numbered in brown as she says them. The only stacked text is the two-sentence beat, where the two glosses sit one above the other with a brown rule between them. Final frame is the carton on the counter beside an empty backpack propped by the door, morning light across both, end-card line centered underneath. No music swell, no zoom punch-ins, no captions burned over her face.",
    script:[
      {scene:"HOOK", time:"0-4s", action:"Handheld 35mm, chest-up: cofounder leaning on a kitchen counter in real morning window light, Willa's Kids carton label-forward at the edge of frame right. She looks at lens and says it plainly, mid-thought, no greeting. On-screen text, navy on cream, left-aligned low: 'you're allowed to ask the school for a milk your kid can actually drink.'"},
      {scene:"THE TWO SENTENCES", time:"4-12s", action:"Locked overhead insert: a hand writes '1 law. 2 sentences.' on a plain notepad, pen visible, no styling. Two lines type on beside the notepad with a thin brown rule between them — 'sentence one: whole milk is back on the tray for the 2026–27 school year.' then 'sentence two: schools can also offer a nondairy option that meets the federal nutrition standard.' Her voice continues underneath the insert. Music drops out entirely for this beat; pen-on-paper is the only sound."},
      {scene:"THE CARTON", time:"12-19s", action:"Macro slow drift across the Willa's Kids carton nutrition side in the same window light, one focus pull per line, no hand in frame. On-screen text ticks in one line at a time, brown numerals: '8g protein — same as dairy' → 'plant-based calcium + vitamin D' → 'DHA omega-3s from algae' → 'free of the top 9 allergens.' A single navy line lands last and holds: 'whether a carton clears your district's standard is your district's call.'"},
      {scene:"THE THREE QUESTIONS", time:"19-27s", action:"Cut back to the handheld 35mm on the cofounder, now a half-step wider so the counter and carton read. She counts them off on her fingers, unhurried. Three numbered lines type on in brown as she says each one, stacking and holding: '1. does our school offer a nondairy option — which one?' → '2. what's the request process — form, note, signature?' → '3. who owns this — food service director, or the nurse?' Hold the full stack for a beat with her still in frame."},
      {scene:"END CARD", time:"27-31s", action:"Cut to a static wide: Willa's Kids carton on the counter beside an empty backpack propped by the door, morning light across both, no people. Overlays clear off. Single line types on centered underneath and holds to black: 'no nut, soy, gluten, dairy or sesame.'"}
    ],
    audio:"Cofounder on-camera sync sound — she is talking, not performing, and the room tone stays in. Do not smooth or re-record it; a real kitchen behind the voice is the credibility. Light acoustic bed sitting very low, and it cuts out completely under THE TWO SENTENCES beat so pen-on-paper carries that section, then returns quietly under the questions. No music sting on the end card.",
    duration:"28-31 seconds",
    cta:{soft:"save this and bring it to the school office.", medium:"screenshot the three questions — and meet Willa's Kids: 8g protein, free of the top 9 allergens.", strong:"pour Willa's Kids: 8g protein, plant-based calcium, vitamin D and DHA omega-3s from algae, free of the top 9 allergens."},
    benefitShorthandId:"BS-6"
  },
  {
    id:"AUG10-PIN-2",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"viral-recipe-remix",
    timing:"Fri Aug 14 · 3pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"three layers — and the middle one has four ingredients.\" — layered iced matcha pin",
    intel:[
      {type:"PULSE", text:"CP-4: layered strawberry matcha was named among the viral cooking formats currently moving what people actually buy (Aug 8, 2026) — glass jars sold specifically to show off the colored layers. The build Willa's is shooting: crushed strawberries at the base, milk poured over ice, matcha floated on top — the middle band is milk, so the milk is doing the visual work. Second draw on CP-4 and a deliberately different object than the Reel: the Reel rides the pour, this is the searchable recipe card."},
      {type:"AUDIENCE", text:"Pinterest is a search engine with a long tail — a drink pin saved in August gets made in September and again next spring. The people searching 'iced strawberry matcha' already want the drink; Willa's job is to be the milk in the result, with a title plain enough to actually surface."},
      {type:"COMPETITOR", text:"INTERNAL: the plant-milk peer set pins coffee builds and latte art almost exclusively, so the layered fruit-and-matcha query is effectively uncontested. Peers are chasing new formats and borrowed reach (C-2's shelf-stable expansion + celebrity smoothie placement) rather than owning search terms. Do not reference any of this in consumer copy."}
    ],
    hooks:[
      {text:"iced strawberry matcha that holds its stripes (dairy-free)", recommended:true},
      {text:"iced strawberry matcha (dairy-free)", recommended:false},
      {text:"three layers — and the middle one has four ingredients", recommended:false}
    ],
    caption:"Three layers in one glass, and you can taste why they hold. 🍓🍵 Strawberry on the bottom, Willa's Original in the middle, matcha floating on top — pour it slow and the stripes stay put. Three layers — and the middle one has four ingredients.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛\n\nIngredients\n- 1 cup Willa's Organic Oat Milk\n- 1/2 cup fresh strawberries, crushed\n- 1 tsp maple syrup\n- 1 tsp ceremonial-grade matcha — the finer, less bitter grade\n- 2 tbsp hot water, whisked smooth\n- a tall glass of ice",
    hashtags:[
      "#strawberrymatcha",
      "#matcharecipe",
      "#willas",
      "#oatmilk",
      "#dairyfree",
      "#organicoatmilk",
      "#icedmatcha",
      "#layereddrinks",
      "#cleanlabel",
      "#summerdrinks"
    ],
    visual:"Vertical 2:3 pin, shot straight-on at glass height — not overhead — so all three bands read as stripes: deep strawberry red at the base, the wide creamy oat band through the middle, bright green matcha floating on top. The milk band is the centre of the frame and gets the most vertical real estate; compose so the eye lands there first. Bright late-morning daylight from the side, clear tall glass on a pale cream surface, one loose strawberry and a few ice shards for scale. Willa's Original carton sits just behind and to the right, label forward, slightly soft in focus but unmistakably legible. Palette: cream ground, navy ink (#202A44) type, green (#75C596) rule. ONE clean line of text across the lower third — 'ICED STRAWBERRY MATCHA · DAIRY-FREE' — set large in navy with the green rule beneath, plus a small navy sub-line 'three layers. the middle one has four ingredients.' Fishwife/Graza design-wit: beautiful glass, one confident line of typography, zero infographic, no callout arrows, no ingredient icons, no badge stack. Recipe-card clarity is the goal — screenshot-able, searchable, and nothing clever that crops the drink.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"pin it for the next warm afternoon.", medium:"made with Willa's Original — organic whole oats, four ingredients.", strong:"Willa's Original: 1g sugar, 4g+ protein, 2g+ prebiotic fiber, certified organic + glyphosate-free."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"AUG10-TT-4",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Barista",
    dnaPattern:"on-pack-checklist",
    timing:"Fri Aug 14 · 7pm",
    priority:"STANDARD",
    concept:"\"the can picks your sugar. the glass is yours.\" — canned-coffee sugar counter",
    intel:[
      {type:"TREND", text:"T-10: A celebrity-founded ready-to-drink coffee brand added its first new flavors since launch on Aug 4, 2026 — Red Velvet, Hazelnut, Salted Caramel — and all three, like the brand's original latte, are built on an oat-milk base. A newer entrant still betting its expansion on oat is the quietest possible proof that oat isn't the category's problem, in the exact week Circana volume data (T-3) had the category called cooling. The new cans run 10–14g of sugar per 8oz — that number, not the oat, is the opening."},
      {type:"AUDIENCE", text:"Coffee is the one occasion where the audience already builds the drink themselves, and iced-at-home is the August format. Sweetness is the only variable they actually control — so the post's job is to hand them that control, not to perform latte art. This is the week's only coffee slot; spend it on the sugar decision."},
      {type:"COMPETITOR", text:"INTERNAL: C-4 is a celebrity-founded RTD cold brew moving through New York retail and direct. Never name it in copy. The counter-move is owning the coffee occasion on the ingredient list rather than on another flavor name — and Barista's flag stays strictly inside coffee. The general 'they invent flavors, we keep the list short' framing was spent Aug 3; do not run it again."}
    ],
    hooks:[
      {text:"the can picks your sugar. the glass is yours.", recommended:true},
      {text:"iced coffee where the sweetness is your decision", recommended:false},
      {text:"3 grams in the pour. everything after that is up to you.", recommended:false}
    ],
    caption:"Willa's Barista is 3g of sugar — 50% less than the average barista oat milk — with no gums and no rapeseed oil. ☕️ It foams if you want it to, and over ice it just stays creamy.\n\nThe can picks your sugar. The glass is yours. That's the whole case for building iced coffee at home: about ninety seconds of work, and the sweetness is a decision instead of a spec.\n\nIngredients\n- 1 cup Willa's Barista Organic Oat Milk\n- 1/2 cup cold brew (or 1 shot espresso, cooled)\n- a tall glass of ice\n- optional: 1 tsp maple syrup — your call, and that's the point",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#baristaoatmilk",
      "#icedcoffee",
      "#coffeeathome",
      "#coldbrew",
      "#dairyfree",
      "#lesssugar",
      "#organicoatmilk",
      "#cleanlabel"
    ],
    visual:"Vertical, one locked-off waist-height frame for the entire post — no camera moves, no whip cuts, no barista performance. Cream counter, warm late-afternoon window light from frame left, green (#75C596) accents and navy ink (#202A44) typography, one line of text at a time set low so the glass stays clear. Hands only, no talent on camera, no steam wand, no latte art, no foam-pitcher beauty shot. A tall clear glass packed with ice sits center; the Willa's Barista carton stays beside it the entire time, label forward, holding 40%+ of every key frame. The hero moment is the Barista pour blooming up through the cold brew — shoot it long and let it play out. Real condensation on the glass, no filter, no coffee-shop-cliché props. End on the carton in focus with the glass soft behind it.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Locked-off static, waist height: a tall glass packed with ice on a cream counter, Willa's Barista carton beside it, label forward. Nothing moves for a full beat — the stillness is the joke's setup. On-screen text (navy on cream, one line, centered low): 'the can picks your sugar. the glass is yours.'"},
      {scene:"COFFEE", time:"3-7s", action:"Same frame, no cut: hand enters and pours cold brew over the ice, close-miked so the ice crack is audible. Carton unmoved. On-screen text swaps to a single word: 'cold brew.'"},
      {scene:"THE POUR", time:"7-12s", action:"Hero shot, still no cut: hand pours Willa's Barista in slow and the cascade blooms up through the coffee. Hold it — do not cut early, the bloom is the whole visual. On-screen text (two lines): '3g of sugar. / 50% less than the average barista oat milk.'"},
      {scene:"THE CHOICE", time:"12-15s", action:"Hand brings a spoon of maple syrup over the glass, hovers, hesitates — then sets it back down on the counter without pouring. On-screen text: 'add it. or don't. that's the point.'"},
      {scene:"END CARD", time:"15-18s", action:"One quick stir, condensation running down the glass, pull focus off the drink onto the Willa's Barista carton. On-screen text: 'no gums. no rapeseed oil.'"}
    ],
    audio:"No voiceover. Ice crack, cold brew pour, oat-milk pour and one spoon tap close-miked and left dry on top, under a low unfussy lo-fi bed — nothing that reads as coffee-shop cliché, no jazz. The text carries the joke, so keep the room quiet enough that the pour is the loudest thing in the post.",
    duration:"15-18 seconds",
    cta:{soft:"save this for the next 3pm slump.", medium:"make it with Willa's Barista — 3g of sugar, no gums, no rapeseed oil.", strong:"pour Willa's Barista over ice: 3g of sugar, 50% less than the average barista oat milk, no gums, no rapeseed oil."},
    benefitShorthandId:"BS-7"
  },
  {
    id:"AUG10-TT-5",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Sat Aug 15 · 10am",
    priority:"STANDARD",
    concept:"\"one of us has to prove it. it isn't the one making the bigger promise.\" — the evidence double standard",
    intel:[
      {type:"PULSE", text:"CP-6: a bovine-colostrum supplement wave is being sold as 'liquid gold' for adult digestion — while a systematic review of its gastrointestinal benefits came back inconclusive, and one study found it can increase intestinal permeability during endurance exercise. Its nutrient profile was built for a newborn calf. The story isn't the supplement, it's the asymmetry: that gets a halo on thin evidence while an oat milk gets its ingredient list read line by line in the aisle. Ride the asymmetry, never name the product, never punch at anyone who owns it."},
      {type:"AUDIENCE", text:"The wellness-supplement buyer and the label-reading oat-milk buyer are the same person — often the same cabinet. So the post cannot ask her to defend a purchase. It hands her a reusable frame instead: who had to prove it, and who only had to promise it. That frame is the share, and it's the reason this one gets saved rather than argued with in the comments."},
      {type:"COMPETITOR", text:"INTERNAL: no named competitor move anchors this brief — keep names out entirely. The structural point is that Willa's proof is third-party (USDA Organic · Non-GMO Project Verified · Detox Project glyphosate-free, tested every lot), not self-declared, which is exactly the gap CP-6 exposes. CP-8 is the same mechanic in a different aisle: protein claims now stamped on coffee, chips and soda, with the front-of-pack number treated as the whole story. Same counter both times — the list is the receipt. Don't say any of this on camera."}
    ],
    hooks:[
      {text:"nobody asks the wellness powder for receipts.", recommended:true},
      {text:"the studies came back inconclusive. the marketing did not.", recommended:false},
      {text:"our ingredient list gets audited line by line. good.", recommended:false}
    ],
    caption:"There's a supplement going around with liquid gold in the pitch. Its nutrient profile was built for a newborn calf. And when someone finally gathered up the studies on what it does for a grown adult's digestion, the answer came back inconclusive.\n\nWilla's Original gets read line by line, and honestly — good. Four ingredients, and the vanilla extract is the fanciest thing on there. Certified organic. Certified glyphosate-free by an outside lab, tested every lot. 1g sugar, all of it from the oats. 4g+ protein and 2g+ fiber, because we keep the whole oat kernel — bran and germ, the way steel-cut oats do — instead of filtering the protein and the fiber back out the way most oat milks do.\n\nIf it's already in your cabinet, that's your call and we're not in it. We'd only point out that one of us has to prove it — and it isn't the one making the bigger promise. 🥛",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#cleanlabel",
      "#labelcheck",
      "#wholeoat",
      "#wellnesstok",
      "#supplementtok",
      "#glyphosatefree",
      "#dairyfree"
    ],
    visual:"ONE locked-off medium shot, no cuts, held the entire runtime — the stillness is the joke. Camera on a tripod at counter height, straight on, nothing moves but hands entering and leaving frame. Real morning window light from camera-left, no fill, honest shadows across a warm cream counter. Palette: cream backdrop, creamy blue (#73B2C9) overlay accents, navy ink (#202A44) type. Props, left to right: a plain unbranded amber-glass supplement jar with a white scoop (generic prop only — no label, no brand, never named, never touched roughly), two small handwritten index cards, and Willa's Original carton set down label-forward in the right third. The carton enters at ~8s and holds the frame to the end — 40%+ of key frames. A clear glass and a slow pour arrive at the payoff. Text overlays are lowercase, left-aligned, lower third, one line at a time, fading rather than popping — no bounce, no zoom, no whoosh SFX. Nothing is ever removed from frame: the amber jar sits there, untouched, through the final beat. That restraint is the brand's high road and it is deliberate.",
    script:[
      {scene:"HOOK", time:"0-4s", action:"Locked-off medium, cream counter, morning light from camera-left. Hand enters and sets a plain unbranded amber-glass supplement jar down center-left, then withdraws. Frame holds a beat too long on purpose. On-screen text (navy on cream, lower third): 'nobody asks the wellness powder for receipts.'"},
      {scene:"SETUP", time:"4-9s", action:"Same locked frame, no cut. Hand slides a small handwritten index card in front of the jar, face to camera: 'made for: a newborn calf'. Beat. Hand slides a second card beside it: 'evidence: inconclusive'. Dry VO continues underneath. No overlay this beat — the cards ARE the text."},
      {scene:"TURN", time:"9-14s", action:"Same locked frame. Hand sets Willa's Original carton down in the right third, label forward, and slides a third handwritten card in front of it: 'made for: a tuesday morning'. On-screen text fades in: 'four ingredients. organic. certified glyphosate-free, tested every lot.'"},
      {scene:"PROOF", time:"14-20s", action:"Same locked frame. Hand rotates the carton a few degrees so the ingredient list faces camera, then a finger traces down it, one line per beat, unhurried. On-screen text ticks with the finger: 'oats · water · vanilla · sea salt'. Then, holding on the last line: 'the vanilla is the fanciest thing on here.'"},
      {scene:"PAYOFF", time:"20-25s", action:"Same locked frame. Hand pours Willa's Original into a clear glass and sets it in front of the carton. The amber jar stays exactly where it is — untouched, still in frame, nothing taken away. On-screen text: 'one of us has to prove it.' Beat. Second line drops under it: 'it isn't the one making the bigger promise.'"},
      {scene:"END CARD", time:"25-28s", action:"Hands leave frame entirely. Hold on glass + carton + light for a full three seconds, no movement. On-screen text, centered, navy on cream: 'Four ingredients. (Read 'em.)' Willa's wordmark fades in beneath. Cut to black on the beat, no outro sting."}
    ],
    audio:"Dry, unhurried narrative voiceover — brand voice, no founder framing, no face on camera, no first person singular. The register is aunt-at-the-kitchen-table matter-of-fact: reads the calf line and the inconclusive line completely flat, with zero sneer and zero eye-roll, and lets the asymmetry do the work. Deliberately NO trending sound and almost no music — one sustained low tone barely under the VO, plus real close-miked room sound (card sliding on the counter, the pour, the glass set down). Flatness is the format; any music cue would tip it into snark.",
    duration:"26-28 seconds",
    cta:{soft:"read one label all the way through. any label. it's a good habit.", medium:"Willa's Original — four ingredients, and every claim on it was checked by someone who isn't us.", strong:"pour Willa's Original: 1g sugar, 4g+ protein, 2g+ prebiotic fiber, certified organic + glyphosate-free, tested every lot."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"AUG10-IG-R4",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"viral-recipe-remix",
    timing:"Sat Aug 15 · 12pm",
    priority:"HIGH",
    concept:"\"three stripes, one glass — and the middle one is the milk.\" — layered strawberry matcha ride",
    intel:[
      {type:"PULSE", text:"CP-4: the three-band layered strawberry matcha glass was named Aug 8, 2026 as one of the short-form formats actually changing what people buy. Crushed strawberries at the bottom, milk poured over ice, matcha floated on top — and the middle band is the milk, so the product does the visual work with no overlay and no explaining. Shoot the pour clean and the format carries the reach."},
      {type:"AUDIENCE", text:"This audience already orders matcha out — the layered glass is the version they screenshot and try at home. They don't need convincing to make it; they need the dairy-free build that still looks like the cafe one. Willa's job is to be the middle band, not to argue for itself."},
      {type:"COMPETITOR", text:"INTERNAL: category volume has slid for three straight years and taste is one of the four reasons analysts keep naming. A drink people actively want to make is the answer to a taste objection — don't say that on camera, just pour something that looks that good."}
    ],
    hooks:[
      {text:"let's make strawberry matcha (dairy-free!)", recommended:true},
      {text:"the stripe in the middle is doing all the work", recommended:false},
      {text:"pour it slow. that's the whole recipe.", recommended:false}
    ],
    caption:"Three stripes, one glass — and the middle one is the milk. 🍓 Crushed strawberries at the bottom, ice, then a gentle pour so the bands hold their line, and matcha floated over the top. Pour it fast and you get pink. Pour it slow and you get the shot. 🍵\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛\n\nIngredients\n- 1 cup Willa's Organic Oat Milk\n- 1 cup strawberries, hulled\n- 1 tbsp maple syrup\n- 1 tsp lemon juice\n- 1 tsp matcha powder\n- 2 oz hot water\n- ice",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#strawberrymatcha",
      "#matcharecipe",
      "#dairyfree",
      "#organicoatmilk",
      "#icedmatcha",
      "#wholeoat",
      "#matchatok",
      "#summerdrinks"
    ],
    visual:"Bright kitchen counter, late-morning window light from camera left, no filter. Palette: warm cream ground, the red of the strawberries, green (#75C596) matcha, navy ink (#202A44) typography. Camera is locked off, side-on, lens at the exact height of the glass — every band has to read in profile, so there is no overhead angle anywhere in this brief. Tall straight-sided clear glass on a pale wooden board; hands only, no talent on camera. Willa's Original carton stands behind the glass, label forward, in frame from the first second to the last. One continuous build: do not cut away from the glass, do not drop a nutrition overlay mid-pour, do not swap in a sweetened or barista carton — Original is what keeps the middle band bright. Overlays are small, navy, set top-left and out of the glass's way, and there are only three of them: the opener, the ingredient ticks, and the end card. Final frame: three clean bands, condensation running the glass, carton behind, on-screen: 'the pink one's fruit. the green one's matcha. the white one's four ingredients.'",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Side-on, locked off at glass height: empty tall clear glass lands on a pale wooden board, hand sets the Willa's Original carton down behind it, label forward. On-screen text (navy on cream, top-left): 'let's make strawberry matcha (dairy-free!)'"},
      {scene:"BASE", time:"3-8s", action:"Same locked frame, push slightly in: hand spoons crushed strawberries into the bottom of the glass, then a small pour of maple syrup and a squeeze of lemon, and taps the glass once so the fruit settles flat. On-screen text ticks as each lands: 'strawberries · maple · lemon'"},
      {scene:"ICE", time:"8-11s", action:"Hand drops ice cubes in one at a time over the fruit — audible, unhurried, filling the glass to the shoulder. No overlay on this beat; let the sound carry it."},
      {scene:"POUR", time:"11-17s", action:"The hero shot, unbroken: Willa's Original poured slowly over the ice so it stacks white above the fruit without stirring the two together. Hold the whole pour, no cut. On-screen text: '1 cup Willa's Organic Oat Milk'"},
      {scene:"FLOAT", time:"17-20s", action:"Tight macro, same angle: whisked matcha poured over the back of a spoon so it lays green on top and the third band separates. Camera holds on all three bands for a full beat. On-screen text: 'three stripes. don't stir yet.'"},
      {scene:"PAYOFF", time:"20-23s", action:"Pull focus off the glass and onto the carton behind it, then back. Condensation on the glass, bands still clean. End card fades in over the frame: 'the pink one's fruit. the green one's matcha. the white one's four ingredients.'"}
    ],
    audio:"No voiceover — this is a one-take, sound-on build. Close-mic the ice dropping, the pour, and the spoon on glass, and leave all three loud in the mix. Warm lo-fi bed underneath, low; nothing with a drop, a lyric cue, or a beat change that would tempt an edit — the format only works if the camera never cuts.",
    duration:"20-23 seconds",
    cta:{soft:"save this for the next hot afternoon.", medium:"build it with Willa's Original — it pours bright white, so the bands actually read.", strong:"Willa's Original is the middle stripe: 1g sugar, 4g+ protein, 2g+ prebiotic fiber, organic and certified glyphosate-free."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"AUG10-PIN-3",
    platform:"Pinterest",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Sat Aug 15 · 2pm",
    priority:"STANDARD",
    concept:"\"nothing left out of the oat. so nothing left over.\" — the zero-waste receipt",
    intel:[
      {type:"TREND", text:"T-8: The category's loudest sustainability voice published a fresh independent life-cycle assessment on Aug 4, 2026 — audited numbers instead of adjectives. Backdrop only. Provenance is turning into a receipt, so Willa's publishes its own receipt (carbon-sequestering organic oats, soil health, zero food waste from using the whole groat) and never anyone else's figure."},
      {type:"AUDIENCE", text:"Sustainability copy has been claim-shaped for a decade, so shoppers discount it on sight. A small checkable proof — the whole groat goes in, so there's nothing left to discard — outperforms every adjective. Pinterest rewards it too: this saves as a proof card, not a news post."},
      {type:"COMPETITOR", text:"INTERNAL: C-1 is defending the plant-milk halo with an audited climate figure (Aug 4, 2026). Willa's has no comparable life-cycle assessment and must not imply one. Compete on provenance Willa's can name outright — organic, whole oat groat, zero food waste — and never cite their number, never compare to dairy, never imply a head-to-head."}
    ],
    hooks:[
      {text:"nothing left out of the oat. so nothing left over.", recommended:true},
      {text:"good for the planet is easy to say. here's ours, itemized.", recommended:false},
      {text:"organic oats that pull carbon down and build the soil back", recommended:false}
    ],
    caption:"Willa's Original is four organic ingredients and the whole oat groat — the whole oat kernel, the way steel-cut oats keep it. 🌾\n\nThat one decision is also the sustainability answer. Because the whole groat goes into the carton, there's nothing to discard: zero food waste in the process. And organic oats do quiet work while they grow — they sequester carbon, meaning they pull it out of the air and into the ground, and they leave the soil healthier for the next season.\n\nNothing left out of the oat. So nothing left over.\n\nOrganic whole grain oats, filtered water, organic vanilla, sea salt. Certified organic, certified glyphosate-free, tested every lot. 1g sugar, 4g+ protein, 2g+ prebiotic fiber.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#zerofoodwaste",
      "#soilhealth",
      "#cleanlabel",
      "#glyphosatefree",
      "#realfood",
      "#sustainablekitchen"
    ],
    visual:"Vertical 2:3 pin, typographic-first. Warm cream ground, creamy blue (#73B2C9) as the single accent, navy ink (#202A44) for type. Product still: Willa's Original carton shot straight-on and slightly below eye line, centered low, soft north-facing daylight with one gentle shadow falling right — no props, no styled kitchen, no grain bowl, no sunset. The carton sits in the bottom third; the top two-thirds are type. Hero line set large in two stacked lines with a hard break — 'NOTHING LEFT OUT OF THE OAT.' / 'SO NOTHING LEFT OVER.' — with the second line in the creamy blue so the joke lands on the turn. Beneath the carton, a small three-line footer in mono at roughly 40% the hero size, laid out like a short itemized receipt: 'WHOLE OAT GROAT — IN' · 'DISCARDED — NONE' · 'ORGANIC · GLYPHOSATE-FREE, TESTED EVERY LOT'. Hold the footer to three lines. This is a proof pin, not a sustainability infographic — Graza/Omsom zine-cover register, generous margins, legible at a 236px thumbnail. No leaf icons, no globe icons, no earth-tone greenwash palette, and no percentage figures anywhere in frame. A loose scatter of whole oat groats at the base of the carton is the only texture allowed.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save it for the next time a carton says 'sustainable.'", medium:"Willa's Original — the whole oat groat goes in, so zero food waste comes out.", strong:"Willa's Original: 4 ingredients, 1g sugar, 4g+ protein, 2g+ prebiotic fiber, certified organic + certified glyphosate-free, tested every lot."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG10-IG-F2",
    platform:"IG Feed",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Multi",
    dnaPattern:"at-shelf-moment",
    timing:"Sat Aug 15 · 6pm",
    priority:"STANDARD",
    concept:"\"three marks on the carton, and not one of them is self-issued.\" — at-shelf cert stack",
    intel:[
      {type:"TREND", text:"T-9: a clean-label challenger stretched in two directions inside 48 hours — into shelf-stable formats the fridge doesn't limit (Aug 7, 2026) and onto someone else's celebrity launch for near-zero-cost reach (Aug 6, 2026). Both are levers Willa's could pull too. Neither is the answer this brief makes. The one thing on the shelf that cannot be borrowed, collabed or reformulated into existence is the certification stack, because it's issued by people who don't work here. INTERNAL ONLY — no competitor, no format news and no collab is referenced in consumer copy."},
      {type:"AUDIENCE", text:"CP-9 is the mechanic worth stealing, not the sport: the sharpest food-brand work of the Aug 3–9 window took a product's actual function and made it the whole idea, pinned to something already in front of people — no invented occasion, no manufactured holiday. At the shelf, Willa's actual function is that the proof is already printed on the carton and someone outside the company signed off on it. The buyer standing in the aisle is doing exactly one thing: deciding which carton to believe. Give her the reason in three words she can verify herself."},
      {type:"COMPETITOR", text:"C-2 (INTERNAL): the same challenger holds USDA Organic, Non-GMO and Glyphosate Residue Free too — so this brief may NOT claim Willa's is the only glyphosate-free milk, may NOT imply the category is 'finally catching up,' and may NOT name a retailer, store count, state count or distributor. What is genuinely Willa's-only in that peer set is the full stack including WBENC mother-founded. Frame it as what's on our carton, verified by outside bodies — never as a scarcity claim."}
    ],
    hooks:[
      {text:"anyone can print the word clean on a carton. these three had to be earned.", recommended:true},
      {text:"three marks on this carton. not one of them is self-issued.", recommended:false},
      {text:"shhh… the least glamorous part of this brand is the part we're proudest of.", recommended:false}
    ],
    caption:"USDA Organic. Certified Glyphosate Residue Free. WBENC women-owned. Three marks on the carton, and not one of them is self-issued. 🌾\n\nOrganic is a federal standard with an audit behind it. Glyphosate Residue Free means every lot is tested for weedkiller residue before it ships. WBENC means an outside council verified the company is majority women-owned; Willa's was founded by a mother and named for her grandmother.\n\nAnyone can print the word clean on a carton. These three had to be checked by someone who doesn't work here.\n\nAnd the reason any of it holds up is what's inside. Willa's Original is four organic ingredients — whole grain oats, filtered water, vanilla extract, sea salt. 1g of sugar, none of it added. 4g+ protein and 2g+ prebiotic fiber, the kind that supports gut and heart health, because the whole oat stays in instead of getting filtered out.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#usdaorganic",
      "#glyphosatefree",
      "#cleanlabel",
      "#womenowned",
      "#wbenc",
      "#motherfounded",
      "#labelcheck"
    ],
    visual:"Static IG Feed carousel, 5 cards, shot like an editorial spread rather than a proof sheet — this is the deliberate peer-brand steal: the real-shelf encounter, composed the way a design-led brand composes its whole feed. Palette is soft daylight neutrals with purple (#A191B2) as the only accent and navy (#202A44) type; no drop shadows, no badges-on-badges, no infographic furniture. CARD 1 is the hero and carries NO overlay text at all: an actual grocery shelf, Willa's cartons stacked two rows deep and label-forward, shot straight-on at chest height on a 35mm, soft indirect daylight from the aisle end, slight vignette from the shelf lip, the neighbouring shelf left visible but out of focus and unreadable. Do not name, sign or geotag the store, and do not let a retailer logo or shelf tag fall inside the crop — clone it out in post if it does. Let the carton design do the work; the first card should look like something a stranger screenshots before they know what it's selling. CARD 2 is the only card with a hand in it: a hand lifting one carton out of the row, motion slight, overlay set large and left-aligned in the upper third — 'anyone can print the word clean on a carton. these three had to be earned.' CARD 3, 4 and 5 are the stack, one mark per card, shot as macro details of the actual printed marks on the back of the carton with a single focus pull each, cream negative space at frame right for one line of type: CARD 3 'USDA Organic — a federal standard, audited.' CARD 4 'Certified Glyphosate Residue Free — every lot tested for weedkiller residue.' CARD 5 'WBENC women-owned — verified by an outside council. Founded by a mother, named for her grandmother.' Final frame sign-off in small navy type under the last mark: 'Certified glyphosate-free. Because that matters.' Product occupies 60%+ of every card. No talent on camera, no founder, no studio sweep — the whole point is that this is a real shelf and a real carton in real light.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for the next time the aisle all looks the same.", medium:"look for Willa's Original — USDA Organic, certified glyphosate-free, tested every lot.", strong:"pour Willa's Original: four organic ingredients, 1g sugar, 4g+ protein, 2g+ prebiotic fiber, and three certifications nobody here handed themselves."},
    benefitShorthandId:"BS-11"
  },
  {
    id:"AUG10-TT-6",
    platform:"TikTok",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Multi",
    dnaPattern:"meme-payload",
    timing:"Sun Aug 16 · 11am",
    priority:"STANDARD",
    concept:"\"the carton's still full. hallelujah.\" — five small kitchen mercies",
    intel:[
      {type:"PULSE", text:"CP-3: the 'hallelujah' gratitude-list format — sparked by Justin Bieber's 'Everything Hallelujah' at Coachella and still on the Aug 5, 2026 Instagram trend board — is the lowest-lift adaptation available: creators name small daily reliefs and punctuate each one with 'hallelujah.' Willa's version skips the song on purpose: flat voiceover instead of the trending track, so there's no choreography and no licensing question, and the joke reads just as clearly off the text list alone. Shoot it in one unstaged kitchen frame and it costs an afternoon, not a production day."},
      {type:"AUDIENCE", text:"The format runs on recognition, not persuasion — the viewer is nodding along, and the fifth item only earns its place if the first four are things that genuinely happened in a real kitchen. Keep it to five, keep the delivery flat, and let the carton be the last small relief rather than the point of the video. The moment item three starts sounding like a benefit, the whole thing reads as an ad and the nodding stops."},
      {type:"COMPETITOR", text:"INTERNAL: every competitive move this week is an argument — an audited climate-impact number published Aug 4, 2026, a revived 'zero sugar' claim lawsuit Aug 4, 2026, and retail data with an analyst naming price, taste, heavy processing and low protein as the category's problems. This is the one asset in the week's slate that isn't defending anything, and that contrast is its strategic value. Also live on the meme board: CP-2, the 'saxophones are getting louder' dread cue at #4 on Aug 6, 2026 — the reveal-shaped alternative if this one tests soft. None of this goes on camera."}
    ],
    hooks:[
      {text:"five things worth a hallelujah.", recommended:true},
      {text:"small mercies, kitchen edition.", recommended:false},
      {text:"the dishwasher's already empty. hallelujah.", recommended:false}
    ],
    caption:"the dishwasher's already empty. hallelujah.\nboth shoes, same room. hallelujah.\nthe good mug was clean. hallelujah.\nnobody had a strong opinion about breakfast. hallelujah.\nthe carton's still full. hallelujah. 🙌\n\nFive small mercies, and exactly one of them is ours.\n\nWilla's Original and Willa's Kids share a shelf around here — organic whole oats, kept whole, so the fiber and the protein stay in the glass instead of getting filtered out. Most oat milks throw both away.\n\nShhh… a full carton absolutely counts as a win.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#hallelujah",
      "#smallwins",
      "#organicoatmilk",
      "#wholeoat",
      "#morningroutine",
      "#dairyfree",
      "#willaskids",
      "#oatmilktok"
    ],
    visual:"One locked-off static frame for the entire video — phone propped at counter height on a stack of books, no pan, no zoom, no cut until the end card. A real kitchen counter in morning daylight from a window camera-left, and nothing on it is styled: crumbs left on the board, a dish towel bunched where someone dropped it, one cup nobody put away. Natural palette only — warm wood, white counter, cream — shot flat with no filter and no grade, because the format's credibility comes from looking like a phone someone leaned against the toaster. Willa's Original and Willa's Kids stand together at frame right, labels forward, occupying roughly a third of the frame and visible 100% of the runtime; they are never held, presented or turned toward camera. Overlays are the whole design: lowercase plain sans, navy (#202A44), one line at a time appearing in the lower third and stacking upward, with earlier lines holding at ~60% opacity so the list visibly builds — by the last beat the viewer can read all five at once. No emoji in the overlays, no arrows, no 'wait for it,' no purple pillar styling; anything decorative breaks the deadpan. The only movement in the video arrives at 11s when a hand enters from frame right to lift the carton an inch. Final frame is a soft cut to a static lockup: both cartons on cream, labels forward, navy type, nothing else moving.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Locked-off static wide of the unstaged counter, morning daylight camera-left. Willa's Original and Willa's Kids stand together at frame right, labels forward. Nothing in frame moves. On-screen text fades in bottom third, lowercase navy sans: 'five things worth a hallelujah.' It clears, and line one takes its place: 'the dishwasher's already empty. hallelujah.'"},
      {scene:"BEAT TWO", time:"3-6s", action:"Identical frame — same lens, same light, still no movement. Line two appears and stacks above line one, which stays on screen at 60% opacity: 'both shoes, same room. hallelujah.' Voiceover reads it at the exact same pitch as line one; the sameness is the joke."},
      {scene:"BEATS THREE + FOUR", time:"6-11s", action:"Same locked-off frame. Line three lands, then line four, each stacking upward with the earlier lines holding faded beneath: 'the good mug was clean. hallelujah.' → 'nobody had a strong opinion about breakfast. hallelujah.' The stack now fills the lower half of the frame. The cartons at frame right have still not been touched."},
      {scene:"THE ONLY MOVEMENT", time:"11-14s", action:"First and only motion in the video: a hand enters from frame right, lifts the Willa's Original an inch off the counter, gives it one small shake — the audible weight of a full carton — and sets it back down. Line five lands on the shake: 'the carton's still full. hallelujah.' Voiceover delivers it exactly as flat as the other four. Hand exits; frame goes still again."},
      {scene:"END CARD", time:"14-16s", action:"Hold the empty frame two full beats after the hand leaves, then soft cut to a static lockup — Willa's Original and Willa's Kids side by side on cream, labels forward. Navy (#202A44) type, BS-1 stinger: 'The whole oat. Not the syrup.' No music sting, no logo animation. End on room tone."}
    ],
    audio:"This trend is usually shot to Justin Bieber's 'Everything Hallelujah' — skip it on purpose. No trending sound, no audio lock: the flat voiceover carries the joke instead, so do not attach a sound just to attach one. Warm narrative voiceover, deliberately flat and unhurried, no smile in the read: every line lands at the same pitch and the word 'hallelujah' is delivered identically all five times. Keep real room tone underneath — fridge hum, a distant car, the counter — and close-mic the small shake of the carton at 11s so it registers as weight, not as a sound effect. Optional soft warm piano at very low level under the read; cut it before the end card and finish in room tone.",
    duration:"14-16 seconds",
    cta:{soft:"add your fifth one in the comments.", medium:"keep a Willa's on the shelf so the last one's an easy hallelujah.", strong:"pour Willa's Original — organic whole oats, 4 ingredients, 1g sugar straight from the oats — or Willa's Kids, 8g protein and free of the top 9 allergens."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG10-IG-R5",
    platform:"Instagram Reel",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Sun Aug 16 · 12pm",
    priority:"HIGH",
    concept:"\"a hundred years between the bowl and the carton.\" — century-gap heritage cut",
    intel:[
      {type:"PULSE", text:"CP-10: a stripped-back, country-leaning folk record landed Aug 7, 2026 — cut live in three days, half-spoken vocals, warm and completely un-precious. It is the tonal opposite of a wellness-brand soundtrack, which makes it the right bed for the week's one heritage cut. Riff the mood only — the artist and the album stay unnamed on screen and in the caption."},
      {type:"AUDIENCE", text:"The feed the week of Aug 10–16 is all system and reset — routines, hacks, restocks, first-week-of-school logistics. A slow origin cut is the contrast play: the one post this week that asks nothing of the viewer and simply says where the carton came from. Sunday midday is when that lands."},
      {type:"COMPETITOR", text:"INTERNAL: the category spent the week of Aug 3 defending itself with claims — an audited climate number, a clean-label format stretch, and a revived lawsuit over a sugar claim. Claims can be matched, audited, or sued. A hundred-year-old kitchen cannot be reformulated into. Don't say any of that on camera — just let the two dates sit there."}
    ],
    hooks:[
      {text:"no one in 1921 called it clean eating. she just cooked.", recommended:true},
      {text:"born 1921. launched 2021.", recommended:false},
      {text:"it started as a bowl of oatmeal. it still is.", recommended:false}
    ],
    caption:"Willa was born in 1921. The carton launched in 2021. A hundred years between the bowl and the carton, and nothing important changed.\n\nShe cooked with whole oats because that's what food was — not because it scored well. Willa's Original is still organic whole grain oats, filtered water, organic vanilla extract, sea salt. Still the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled — the same thing that went in her pot.\n\nChristina, in her own kitchen: \"my grandmother was making oatmeal way before it was cool.\"\n\nReal food, passed down. Reinvented forward.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#realfood",
      "#grandmaskitchen",
      "#passeddown",
      "#womenownedbusiness",
      "#wbenc"
    ],
    visual:"Un-styled and unhurried — this is the one cut of the week with no graphics energy. Warm cream and wheat palette with brown (#9E652E) heritage accents and navy ink (#202A44) type; hard morning window light raking low across a worn wooden counter, dust visible in the beam, no fill, no filter, no color grade toward 'bright.' Shot almost entirely on a 50mm-equivalent at shallow depth: extreme close-ups of dry whole oat groats, hands, water, steam. Camera is static or a single very slow push — no handheld energy, no whip cuts. Cuts are long (3-5 seconds each) and land on the beat of the music, not ahead of it. Christina appears in exactly one shot, three-quarter to camera in her own kitchen, never addressing the lens straight on — she is in the room, not presenting to it. Willa's Original enters LAST, at roughly 15 seconds, set down by hand with the label forward and held in the same light as the bowl so the carton and the grain read as the same material; product occupies the final third of the runtime, roughly 40% of the closing frames. Text is deliberately scarce: four short lower-third cards total, navy on cream, small, fading in and out. NO nutrition overlay anywhere — no grams, no counts, no badge stack. The last frame is a static wide of the bowl of groats beside the carton with the sign-off centered underneath.",
    script:[
      {scene:"HOOK", time:"0-4s", action:"Extreme close-up, static: hands tip dry whole oat groats from a glass jar into a worn ceramic bowl on a wooden counter, hard morning light from the left. Grain sound close-miked, no music yet. Small on-screen text, lower third (navy on cream): 'born 1921.' Hold on the bowl."},
      {scene:"TURN", time:"4-9s", action:"Music enters. Very slow push-in as a hand runs through the groats and lifts a few. Cut to the same hands filling a pot at the sink, water sound left up. On-screen text replaces the first card: 'launched 2021.' No other overlay."},
      {scene:"THE LINE", time:"9-15s", action:"Medium, static: Christina at the counter in her own kitchen, three-quarter to camera, light from the left, hands still working. Sync sound, one clean take — she says: 'my grandmother was making oatmeal way before it was cool.' NO text overlay on this shot; let the line land alone. Music drops slightly under her."},
      {scene:"PRODUCT", time:"15-20s", action:"Three slow cutaways: pot on the stove with steam crossing the light beam · a wooden spoon set down on the counter · the edge of a framed photograph out of focus (no faces in frame). Then a hand reaches in and sets the Willa's Original carton on the wood beside the bowl, label forward — first appearance of the product. Quiet on-screen text: 'the whole oat. not the syrup.'"},
      {scene:"SIGN-OFF", time:"20-25s", action:"Static wide, no camera move: the bowl of oat groats and the Willa's Original carton side by side in the same raking light. Music resolves. Centered on-screen text fades in and holds to the end: 'Real food, passed down. Reinvented forward.' No CTA card, no badge stack, no nutrition text."}
    ],
    audio:"Sync sound on Christina's line — no voiceover layered over it, no founder narration anywhere else. Underneath: a stripped-back, country-leaning folk bed — acoustic guitar, brushed drums, warm room tone, recorded-live-in-a-room feel, half-spoken rather than sung. Mood reference is CP-10 (INTERNAL — the artist and album are never named on screen or in the caption). Music enters at 4s, ducks under the spoken line, resolves on the final hold. Keep the grain, the water and the spoon audible under everything; this cut should sound like a kitchen, not a track.",
    duration:"24-26 seconds",
    cta:{soft:"send this to whoever taught you to cook.", medium:"Willa's Original — the whole oat, four organic ingredients.", strong:"pour Willa's Original: organic whole oat groats, four ingredients, certified organic + glyphosate-free."},
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
  {icon:"↑", title:"\"nothing self-certified. nothing to disclose.\" opens the week Wed Aug 12 at 9am, with Christina in the first of her two reserved on-camera slots.", reason:"The rule ending self-affirmed food additives cleared its final White House review on Jul 31, 2026 — a company could previously convene its own expert panel, declare a new ingredient safe and never tell the agency or the public. This is the documented founder-POV exception: the stance is the payload and a faceless voiceover would land soft. Willa's answer arrives by beat two — organic whole grain oats, filtered water, organic vanilla extract, sea salt. No politician, no party, no 'toxic', and no flip-the-carton opening, which is worn through. rideNow.", agent:"trend"},
  {icon:"↑", title:"\"taste it first — that's the part we're least worried about.\" takes the Wednesday midday Instagram slot as the answer to all four charges at once.", reason:"The category is being publicly accused of price, taste, heavy processing and low protein in a single breath. Ducking that reads as a brand with no answer, so the Reel takes all four — with taste first, because it's the only one that resolves on tasting. Every retail figure stays internal per the audience-outsider rule: the customer hears the objection and then sees the pour. Kiki Milk posture — lay out the shortcut, then the fix, no defensiveness, nobody named.", agent:"composer"},
  {icon:"↑", title:"Back-to-school re-enters through the allergy desk rather than the lunchbox: \"free of the top 9 — that list is already long enough.\"", reason:"The burn corpus marks the lunchbox-cost, hectic-morning, kids'-drink-label and pack-the-lunchbox angles all spent across the JUL 27 and AUG 3 slates. Federally required food-allergy training for school food staff is in its first school year, and the families living it are doing the nurse meeting and the action-plan handoff — a different room entirely. Cofounder-sister on camera for the first-person mom POV, top-9-allergen-free framed as relief, no claim about school meal programs, no medical advice.", agent:"editor"},
  {icon:"↑", title:"A second, quieter school brief runs the provision nobody is covering: \"one law, two sentences — and everyone only read the first one.\"", reason:"Whole milk returning to the tray is the loud half of the statute. The same law lets a school offer a nondairy beverage meeting the Secretary of Agriculture's nutritional-equivalence standard, and almost no coverage mentions it. The gap is the brief — the question a parent can actually ask, with the two or three follow-ups to bring. Willa's Kids illustrates what to look for and nothing more: no school-approved claim, no equivalence claim, no anti-dairy turn.", agent:"trend"},
  {icon:"×", title:"The personality-led framing of the additive-loophole story as the week's anchor.", reason:"The underlying story is real and corroborated, but the specific article that framed it as a named official's unveiling returned a 403 and never surfaced in an independent search, so it could not be verified first-hand. The trend was re-anchored on two sources verified end to end and rewritten around the verified fact — the proposed rule clearing review on Jul 31, 2026 — which also keeps the lead brief off partisan framing per the political anti-pattern.", agent:"editor"},
  {icon:"×", title:"A third consecutive lunchbox brief, this time off a dietitian's lunch-building formula.", reason:"Real, dated and inside the recency window, but it lands squarely in the pack-the-lunchbox lane the burn corpus marks spent after JUL 27 and AUG 3. The genuinely new back-to-school doors are the sleep reset and the allergen desk, and both are already briefed. A third lunchbox post would read as the engine recycling its own calendar rather than reading the week.", agent:"editor"},
  {icon:"×", title:"The single biggest trending sound on the Aug 6 board.", reason:"It's in-window and it's number one, but it's a haircut-reveal format with no payoff structure a carton can occupy. Forcing a beverage into it is exactly the chase-don't-ride failure the Tonal Resonance Framework exists to prevent. The meme slot went instead to the sit-down documentary sound at number five, which is built on solemn setup and mundane payoff — a shape Willa's can actually fill.", agent:"pulse"},
  {icon:"⚡", title:"The clean-label challenger's two-front move gets Saturday evening, not a lead: \"three marks on the carton, and not one of them is self-issued.\"", reason:"A peer stretched four-ingredient clean label into shelf-stable formats on Aug 7 and borrowed celebrity reach off someone else's launch on Aug 6 — two cheap levers in one week. The counter isn't matching their speed, it's the one thing that can't be borrowed: USDA Organic plus Certified Glyphosate Residue Free plus WBENC mother-founded. That's a proof post, and proof holds better on a weekend static than in a news slot.", agent:"comp"},
  {icon:"⚡", title:"The layered strawberry matcha runs twice, deliberately, as two different objects.", reason:"The Reel rides the pour on Sat Aug 15 — one take, no voiceover, the entire retention mechanic is whether the three bands hold their line. The pin is the searchable card people save in August and cook in September, with at least a cup of Willa's Original written into the ingredient list. Same signal, two jobs: one is a format ride, the other is search. In both, the middle band is the milk, so the product does the visual work for free.", agent:"visual"},
  {icon:"⚡", title:"Barista keeps its single coffee slot and spends it on category critique instead of a latte.", reason:"The standing cap is one latte-lane brief per two weeks and Barista already carried AUG 3. A brand-new premium cold brew tripled its lineup on Aug 4 with every can built on oat — the quietest possible proof that oat isn't the category's problem — while carrying 10 to 14 grams of sugar a can. That's the vehicle: the can picks your sugar, the glass is yours. Nobody gets named, and Barista stays inside the coffee occasion.", agent:"visual"}
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
  total:21460,
  lift:58,
  sessions:1794,
  topRoiFormat:"Clean-label recipe ride with the ingredient list in the caption (peaked AUG 3 – AUG 9)",
  topRoiPerBrief:2380,
  source:"Shopify + Klaviyo"
};

const AGENT_BY_ID = Object.fromEntries(AGENTS.map(a=>[a.id,a]));

// ─── Brief ↔ source links (the threading) ─────────────────
const BRIEF_LINKS = {
  "AUG10-TT-1":{
    trends:[
      "T-1",
      "T-2"
    ],
    pulse:[],
    comps:[]
  },
  "AUG10-IG-R1":{
    trends:[
      "T-3",
      "T-5"
    ],
    pulse:[
      "CP-8"
    ],
    comps:[
      "C-3"
    ]
  },
  "AUG10-PIN-1":{
    trends:[],
    pulse:[
      "CP-5"
    ],
    comps:[]
  },
  "AUG10-TT-2":{
    trends:[],
    pulse:[
      "CP-1"
    ],
    comps:[]
  },
  "AUG10-IG-R2":{
    trends:[
      "T-7"
    ],
    pulse:[],
    comps:[]
  },
  "AUG10-IG-F1":{
    trends:[
      "T-4"
    ],
    pulse:[],
    comps:[
      "C-3"
    ]
  },
  "AUG10-TT-3":{
    trends:[],
    pulse:[
      "CP-7"
    ],
    comps:[]
  },
  "AUG10-IG-R3":{
    trends:[
      "T-6",
      "T-7"
    ],
    pulse:[],
    comps:[]
  },
  "AUG10-PIN-2":{
    trends:[],
    pulse:[
      "CP-4"
    ],
    comps:[]
  },
  "AUG10-TT-4":{
    trends:[
      "T-10",
      "T-3"
    ],
    pulse:[],
    comps:[
      "C-4"
    ]
  },
  "AUG10-TT-5":{
    trends:[],
    pulse:[
      "CP-6",
      "CP-8"
    ],
    comps:[]
  },
  "AUG10-IG-R4":{
    trends:[],
    pulse:[
      "CP-4"
    ],
    comps:[]
  },
  "AUG10-PIN-3":{
    trends:[
      "T-8"
    ],
    pulse:[],
    comps:[
      "C-1"
    ]
  },
  "AUG10-IG-F2":{
    trends:[
      "T-9"
    ],
    pulse:[
      "CP-9"
    ],
    comps:[
      "C-2"
    ]
  },
  "AUG10-TT-6":{
    trends:[],
    pulse:[
      "CP-3",
      "CP-2"
    ],
    comps:[]
  },
  "AUG10-IG-R5":{
    trends:[],
    pulse:[
      "CP-10"
    ],
    comps:[]
  }
};



// ─── Paid Amplify Plans (Paid Media Planner output) ──────
const AMPLIFY_PLANS = {
  "AUG10-IG-R4":{
    headline:"The layered strawberry matcha pour — the format doing the work, with the milk as the middle band",
    totalBudget:400,
    testWindow:"6 days (Sat Aug 15 → Thu Aug 20)",
    objective:"Saves + Link taps",
    guardrail:"Auto-pause if the 3-second view rate drops under 45% — this brief lives or dies on whether the bands hold in the first beat, and a soft hook here means the creative is wrong, not the audience. Also pause if CPM clears $9.",
    placements:[
      {platform:"Meta", format:"Reels + Stories, Advantage+ placements", budget:240, reach:"~26-36K reach", expectedReach:"~26-36K reach", audience:"Dairy-free drink builds, matcha, at-home cafe, women 24-40, US", lookalike:"1% LAL of IG savers + recipe-pin engagers", note:"In plain terms: this is the week's money format. The AUG 3 results say a useful build now earns more per dollar than a stance post, so it gets the biggest share."},
      {platform:"TikTok", format:"In-feed Spark Ad", budget:160, reach:"Cold reach", expectedReach:"Cold reach", audience:"Strawberry matcha, layered drinks, dairy-free swaps", note:"Cold audiences meet the brand through a drink they already want to make. Spark the organic post rather than a cut-down — the comments are part of the proof."}
    ],
    why:"Recipe posts are the one format where paid reliably beats organic for Willa's, because the save is the conversion and saves keep compounding after the spend stops. This is the week's largest budget for that reason — put it behind the pour, not the personality, and let the middle band do the selling."
  },
  "AUG10-IG-R1":{
    headline:"Four objections, one honest answer — taste first, then the pour that backs it up",
    totalBudget:300,
    testWindow:"5 days (Wed Aug 12 → Sun Aug 16)",
    objective:"Saves + Profile visits",
    guardrail:"Auto-pause if sentiment falls below 0.85 or if negative feedback (hide/report) clears 0.08%. This is a confidence play — the moment comments read it as defensive, the spend is making the problem louder, so pull it and let the organic post stand.",
    placements:[
      {platform:"Meta", format:"Reels", budget:200, reach:"~18-25K reach", expectedReach:"~18-25K reach", audience:"Warm — existing followers, site visitors, IG engagers 90d", lookalike:"1% LAL of purchasers", note:"Warm audiences carry a position better than cold ones. Someone who has never met the brand should meet it through a drink, not through an argument."},
      {platform:"TikTok", format:"In-feed Spark Ad", budget:100, reach:"Warm + retargeting", expectedReach:"Warm + retargeting", audience:"Video viewers 75%+ and profile visitors, last 30 days", note:"Retargeting only. If it needs cold spend to travel, the taste beat isn't landing in the first three seconds and the fix is the edit, not the budget."}
    ],
    why:"This is the answer to the loudest attack on the category in three years, so it needs to reach people who are not already followers — that is what the cold split buys. Fund it only after the organic save-rate clears the owned average; if the argument does not land unpaid, more money will not fix the argument."
  },
  "AUG10-IG-R2":{
    headline:"The allergy-desk answer — Willa's Kids for the parent filling out the form, not the cafeteria",
    totalBudget:230,
    testWindow:"4 days (Thu Aug 13 → Sun Aug 16)",
    objective:"Saves + Link taps",
    guardrail:"Auto-pause immediately on any comment reading the post as medical or allergy-management advice, and pause if sentiment dips below 0.90 — the bar is higher here than anywhere else this week. Interest targeting only; no health-condition audiences, which Meta restricts and which would be the wrong door regardless.",
    placements:[
      {platform:"Meta", format:"Reels + Stories", budget:230, reach:"~16-22K reach", expectedReach:"~16-22K reach", audience:"Parents of school-age kids, allergen-free cooking, kids' nutrition, US", lookalike:"1% LAL of Kids purchasers", note:"What this means for you: spend runs only while districts are still doing first-week paperwork, then stops. Nothing about this post gets better with a longer flight."}
    ],
    why:"Allergy parents are a small audience with unusually high intent and they are searching in a narrow two-week window before the first bell. Modest budget, tight targeting, short flight — this is about being findable at the exact moment the form is on the kitchen counter, not about scale."
  },
  "AUG10-TT-1":{
    headline:"The self-certification answer — the shortest list on the shelf, said calmly",
    totalBudget:170,
    testWindow:"4 days (Wed Aug 12 → Sat Aug 15)",
    objective:"Profile visits",
    guardrail:"Auto-pause if the comment section turns political in any direction, or if sentiment falls below 0.88. The post works because it never names a person or a party — paid reach pushes it to people with no context, which is exactly where that framing breaks.",
    placements:[
      {platform:"TikTok", format:"In-feed Spark Ad", budget:110, reach:"Cold + warm", expectedReach:"Cold + warm", audience:"Clean label, food transparency, ingredient-first shoppers 28-50", note:"Founder credibility is the payload — this is one of two briefs all week where a face outperforms hands."},
      {platform:"Meta", format:"Reels", budget:60, reach:"Warm", expectedReach:"Warm", audience:"Existing followers + email subscribers", note:"Small deliberately. A stance post is the cheapest thing to over-fund and the fastest thing to make feel like a campaign."}
    ],
    why:"The smallest budget on the board on purpose. This is a founder-credibility post, and the payoff is profile visits and trust rather than immediate saves — boosting it hard would make a calm stance look like an ad campaign and undercut the thing that makes it work."
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
  {date:"Aug 10, 2026", agent:"trend", msg:"Swept US food policy, nutrition science, plant-milk retail and clean-label brand news against an Aug 3 recency floor. Ten trends cleared. The lead candidate arrived through a paywalled outlet that could not be verified first-hand, so it was rebuilt on the underlying regulatory record rather than dropped."},
  {date:"Aug 10, 2026", agent:"editor", msg:"Date-checked every corroborating URL before it reached a card. One additive-regulation piece came back dated Mar 17, 2025 and another clean-label distribution post dated Jul 7, 2026 — both seventeen months and five weeks outside the floor. Killed rather than propped up."},
  {date:"Aug 10, 2026", agent:"pulse", msg:"Ran the format, food, parenting, entertainment and discourse lanes. Ten pulse signals cleared with a checkable live example each. The single biggest sound on the Aug 6 board was passed over — a haircut-reveal has no payoff structure a carton can occupy."},
  {date:"Aug 10, 2026", agent:"comp", msg:"Logged four in-window competitive moves: an audited climate life-cycle number published Aug 4, a shelf-stable clean-label expansion Aug 7 paired with a borrowed celebrity smoothie Aug 6, a revived sweetener-labelling suit Aug 4, and an oat-based cold brew tripling its lineup Aug 4."},
  {date:"Aug 10, 2026", agent:"editor", msg:"Rolled the burn corpus forward: the AUG 3 week's eight trends, six pulse signals, sixteen hooks and sixteen concepts are burned, with JUL 27 and JUL 20 held as buffer. Back-to-school was flagged as needing a genuinely new door — the cost, hectic-morning and lunchbox angles are all spent."},
  {date:"Aug 10, 2026", agent:"composer", msg:"Built sixteen briefs against a three-per-signal cap. Heaviest draw is two on the layered-glass drink and two on the school calendar — and each second draw takes a different shape, a pour versus a searchable recipe card, an allergy desk versus a bedtime."},
  {date:"Aug 10, 2026", agent:"visual", msg:"Held Christina to two on-camera briefs against a cap of three — the additive stance Wed Aug 12 and the heritage cut Sun Aug 16 — and Barista to one coffee slot against the latte cap. Every Reel and TikTok carries a populated shot list for the phone mockup."},
  {date:"Aug 10, 2026", agent:"hook", msg:"Ran every recommended hook through the wordy-is-wrong test. Four concepts were re-cut as headlines rather than descriptions, and the meme-slot payoff was shortened until it lands inside the sound's own beat instead of trailing it."},
  {date:"Aug 10, 2026", agent:"editor", msg:"Ran the coherence map: signal caps, orphan signals, link resolution, concept-to-caption echo, script presence, dairy terms, trade-press leakage and relative-time language. Five issues found and fixed, including two percentages that had leaked out of the intel and into consumer copy."},
  {date:"Aug 10, 2026", agent:"amb", msg:"No ambassador brief this week. The allergy-parent lane is a trust room, and a seeded creator post would read as a placement in exactly the week the brand wants to sound like a neighbour. Revisit once school-year content lands organically."},
  {date:"Aug 10, 2026", agent:"paid", msg:"Amplification concentrated on four briefs and weighted toward the layered drink build, on the AUG 3 read that a genuinely useful recipe now out-earns a stance post on both saves and sessions. The founder stance takes the smallest spend and the tightest window."},
  {date:"Aug 10, 2026", agent:"perf", msg:"Rolled the AUG 3 week's sixteen briefs into results. The recipe ride took reach and saves outright, ending the uncut label read's three-refresh run at the top — the first time a build has beaten a stance since the pattern started."}
];


// ─── Killed signals (the ones we said no to) ──────────────
const KILLED = [
  {signal:"The personality-led 'unveiling' framing of the food-additive loophole as the anchor for the week's lead trend", reason:"The story is real and corroborated, but the specific article returned a 403 and never surfaced in an independent search, so it could not be verified first-hand. Re-anchored on two sources verified end to end and rewritten around the verified fact — the proposed rule clearing review on Jul 31, 2026 — which also keeps the lead off partisan framing."},
  {signal:"A corroborating additive-regulation piece from a grocery trade outlet", reason:"Fetched and confirmed dated March 17, 2025 — seventeen months stale. It covers the original directive, not this week's clearance, and would have framed a 2025 announcement as current news."},
  {signal:"The 'subtitle gratitude' Instagram format from a trends tracker", reason:"Two problems. The tracker's actual last-updated date is Jul 30, 2026, outside the window — and the format as described did not exist on the page. Replaced with the verified 'hallelujah' gratitude list, which is a better fit for the brand's dry register anyway."},
  {signal:"The escalating-grievance-list sound", reason:"Still circulating, but every dated article anchoring it is Jun 17, 2026 — seven weeks outside the floor. The only in-window-safe link would be a permanent hashtag page, which proves the tag exists but not that the format is live. Killed rather than propped up."},
  {signal:"The number-one trending sound on the Aug 6 board", reason:"In-window and the biggest sound on the chart, but it's a haircut-reveal format with no payoff structure a carton can occupy. Forcing a beverage into it is the chase-don't-ride failure the Tonal Resonance Framework guards against."},
  {signal:"A registered dietitian's back-to-school lunch-building formula", reason:"Real, dated and in-window, but it sits in the pack-the-lunchbox lane the burn corpus marks spent after JUL 27 and AUG 3. The new doors this week are the sleep reset and the allergen desk; a third lunchbox card would read as recycling the calendar."},
  {signal:"The 71% viral-purchase influence stat as a standalone trend", reason:"Verified, but the same syndicated article already anchors two Pulse recipe cards. Running it on the Category tab as well would put one article on both tabs — exactly what the Pulse/Trends separation rule exists to prevent. It survives as supporting context inside the single-serve dessert card."},
  {signal:"The cafe-at-home cold foam and syrup-layering drink build", reason:"A named, in-window viral format and a natural Barista showcase, but Barista already carried AUG 3 and the standing cap is one latte-lane brief per two weeks. Passed over for the layered strawberry matcha, which is milk-forward without spending the coffee slot."},
  {signal:"A plant-milk manufacturing plant closure and layoffs", reason:"The event falls inside the window but every outlet covering it published in May 2026, so it fails the recency floor outright. A layoffs story is also not a lane Willa's should be visibly working."}
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
  "AUG10-TT-1":{direct:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. Four things, and not one of them needed anyone's permission.\n\nIt's worth saying plainly, because of how the system has actually worked. A company could bring in its own hand-picked scientists, decide a brand-new ingredient was safe, put it in food, and never file a word with the agency or tell the public. On Jul 31, 2026 the rule that would close that route cleared its final review — new ingredients would have to be filed, listed publicly, and named for what they're for.\n\nWilla's never used that door. Organic. The whole oat groat — the entire kernel, bran and germ included — so the fiber and the protein stay in the carton instead of getting filtered out. 1g sugar, from the oats. 4g+ protein. 2g+ prebiotic fiber.\n\nAnd nothing here is certified by us. Certified glyphosate-free, tested every lot, by an outside lab whose whole job is to check.\n\nNothing self-certified. Nothing to disclose. 🌾", warm:"Oats, water, vanilla, salt. That's been the whole list since Willa's launched in 2021, and it's the least interesting thing about us — which is sort of the point. 🌾\n\nTurns out a company can bring in its own scientists, decide a brand-new ingredient is safe, and never mention it to anybody. On Jul 31, 2026 the rule closing that route cleared its last review.\n\nWe've just never had anything worth not mentioning. Organic, certified glyphosate-free, tested every lot.", punchy:"Four things in the carton. Zero of them self-certified. 🌾"},
  "AUG10-IG-R1":{direct:"Watery. Over-processed. Barely any protein. The complaints about plant milk are fair — they're just not about this carton. 🥛\n\nWilla's Original is four organic ingredients: whole grain oats, filtered water, vanilla extract, sea salt. It pours rich and smooth because it's made from the whole oat, not oat syrup. 4g+ protein, 2g+ prebiotic fiber — the kind that feeds your gut — and 1g of sugar, from the oats, nothing added.\n\nThe shortcut most of the category takes: filter out the bran and germ, then process the starch into sugar. That's the fiber AND the protein, gone before it ever reaches the carton. Willa's keeps the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled.\n\nCertified organic. Certified glyphosate-free, tested every lot. Mother-founded, WBENC certified.\n\nAnd if a carton's going to take up fridge space, it should earn it.\n\nTaste it first — that's the part we're least worried about.", warm:"Everybody's got a plant milk they bought once and never finished. 🥛 We took that personally.\n\nWilla's Original is four organic ingredients, made from the whole oat instead of oat syrup — which is why it pours rich and smooth instead of thin. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar that comes from the oats.\n\nShhh… taste is the objection we're least worried about.", punchy:"Watery, over-processed, barely any protein — three fair complaints, none of them ours. Willa's Original: four organic ingredients, 4g+ protein, 1g sugar. 🥛"},
  "AUG10-PIN-1":{direct:"Cake for one, and no pan to wash. 🍫 A whole chocolate cake that happens to serve exactly one person — baked in a cup, soaked while it's still warm, and rich enough that nobody asks what's missing.\n\nWilla's Organic Chocolate Oat Milk is made with real cacao and five simple organic ingredients — rich and creamy enough to carry a bake, with less sugar and more protein and fiber per cup. It won Best Beverage at the Good Food Awards. 🥛\n\nIngredients\n- 1 cup Willa's Organic Chocolate Oat Milk (1/2 for the batter, 1/2 warmed for the soak)\n- 3/4 cup oat flour\n- 2 tbsp organic cacao powder\n- 2 tbsp maple syrup\n- 1 tsp baking powder\n- pinch of sea salt\n- 2 tbsp coconut cream, whipped, to finish", warm:"Serves one. That's not a limitation, shhh… that's the entire idea. 🍫 Chocolate cake baked in a cup and soaked in the oat milk that won Best Beverage — real cacao, five organic ingredients, no cane sugar anywhere in it.\n\nIngredients\n- 1 cup Willa's Organic Chocolate Oat Milk\n- 3/4 cup oat flour\n- 2 tbsp organic cacao powder\n- 2 tbsp maple syrup\n- 1 tsp baking powder\n- pinch of sea salt\n- 2 tbsp coconut cream, whipped, to finish", punchy:"A whole chocolate cake that happens to serve one. 🍫 The pan was never the point."},
  "AUG10-TT-2":{direct:"Twenty years of the exact same breakfast, and only one thing on the table ever needed updating. 🥣\n\nSame bowl. The milk finally caught up. Willa's Original is four things: organic whole grain oats, filtered water, organic vanilla extract, sea salt.\n\n1g of sugar, and all of it from the oats. 4g+ protein and 2g+ prebiotic fiber — the kind that supports gut and heart health — because we use the whole oat groat, the whole oat kernel the way steel-cut oats do. Most oat milks filter out the bran and germ and process the starch into sugar, which throws away the fiber AND the protein. We kept both.\n\nCertified organic. Certified glyphosate-free, tested every lot. Nothing here you didn't already know the name of.\n\nReal food, passed down. Reinvented forward. 🌾", warm:"Same spoon, same spot at the table, same bowl you've had since you were seven. 🥣\n\nThe breakfast never needed fixing — the carton beside it did. Four organic ingredients, 1g of sugar and every gram of it from the oats.\n\nShhh… it's better than you remember.", punchy:"Same bowl. The milk finally caught up. Four ingredients. 🥣"},
  "AUG10-IG-R2":{direct:"There's a version of back-to-school that happens before the first bell — the meeting, the forms, the folder you hand to someone else and hope they actually read. 📋\n\nWilla's Kids is free of the top 9 allergens — that list is already long enough. No dairy, soy, wheat, egg, peanut, tree nut, fish, shellfish or sesame. 8g of protein, the same as dairy. Plant-based calcium, and plant-based DHA — the omega-3 most kids don't get enough of.\n\nParents asked us to make a kids' product. We listened. This turned out to be the part they asked about first.\n\nTo every family filling out forms this August: we see you. 🤎", warm:"Some back-to-school lists are a lot longer than others. 📋\n\nWilla's Kids is free of the top 9 allergens — and shhh… it's the one line that doesn't need a paragraph after it.\n\n8g of protein, plant-based calcium and DHA, and a cup they actually finish. 🤎", punchy:"Free of the top 9 allergens. That list is already long enough. 🤎"},
  "AUG10-IG-F1":{direct:"Willa's Original is sweet because it's made of oats. 1g of sugar, none of it added — no sweetener to explain, nothing on the carton that needs a footnote. 🌾\n\nSweet was never the problem. Added was. You can spend a whole month with nothing allowed to taste good and land exactly where you started, because \"sweet\" isn't a thing you can quit — it's a question of where it came from. A syrup stirred into a drink, or a whole oat that already tasted like that.\n\nFour organic ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt. It's rich and smooth because the whole oat is still in there. Most oat milks filter out the fiber and the protein — we keep both, which is why there's 4g+ protein and 2g+ prebiotic fiber in every cup, the kind of fiber that supports gut and heart health.", warm:"You don't have to quit sweet. 🌾 That was never the part that mattered.\n\nWilla's Original is sweet because it's made of oats — 1g of sugar, nothing added, no footnote required. Four organic ingredients, rich and smooth, and it still tastes like something you'd actually want in the morning.", punchy:"Sweet was never the problem. Added was. Willa's Original: 1g of sugar, straight from the oats. 🌾"},
  "AUG10-TT-3":{direct:"A warm mug of Willa's Kids is the last thing that happens before the screens go off. 🌙\n\nPediatricians were on the local news the first week of August with the same advice: start the school-year sleep shift now, screens away 30 to 60 minutes before bed, a calm last few minutes before lights-out. Most of that same advice is really about the morning wake-up.\n\nFifteen minutes isn't much of a plan. It's enough for a mug, a lamp turned low, and the part of the day that isn't rushing anywhere.\n\nWilla's Kids has 8g of protein — the same as dairy — and none of the top 9 allergens. Organic whole oats, plant-based calcium, and DHA, the omega-3 most kids don't get enough of.\n\nMornings get all the back-to-school content. This is the better half.", warm:"Pediatricians were on the local news the first week of August with the same advice: screens away, calm and early. 🌙 So we gave those last fifteen minutes something to be about.\n\nA warm mug of Willa's Kids, a lamp turned low, and the slowest part of the day finally showing up. 8g of protein — the same as dairy — and none of the top 9 allergens.\n\nMornings get all the back-to-school content. This is the better half.", punchy:"Fifteen minutes isn't much of a plan. It's enough for a warm mug of Willa's Kids. 🌙"},
  "AUG10-IG-R3":{direct:"There's a conversation you're allowed to start at the school office this year — and almost nobody knows it's on the table. 🥛\n\nWilla's Kids exists because parents asked us for it. 8g of protein, the same as dairy. Plant-based calcium, vitamin D, and DHA omega-3s from algae. Free of the top 9 allergens — no nut, soy, gluten, dairy or sesame. 6g of sugar, from organic maple syrup. Yuka, the app that scans groceries and scores the ingredients, gives it 100 out of 100.\n\nHere's the part that got buried. Whole milk comes back to school trays for the 2026–27 school year; that rule took effect Jun 8, 2026. The same law also allows a school to offer a nondairy beverage that meets the nutrition standard set by the Secretary of Agriculture — the federal official who writes school meal rules. One law, two sentences — and everyone only read the first one.\n\nNothing against the milk on the tray. This is about the kid who can't drink it.\n\nWhether a specific carton clears a specific district's standard is that district's call. The asking is yours. Three questions worth bringing:\n\n1. Does our school offer a nondairy option, and which one is it?\n2. What's the request process — a form, a note, a signature?\n3. Who owns this: the food service director, or the nurse?\n\nOur cofounder walks through all three above. Ask before the first bell. 🌾", warm:"Turns out you're allowed to ask. 🥛 The same law putting whole milk back on the tray for the 2026–27 school year also lets a school offer a nondairy option that meets the federal nutrition standard. One law, two sentences — and everyone only read the first one.\n\nWilla's Kids is 8g of protein, the same as dairy, plus plant-based calcium, vitamin D, DHA omega-3s from algae, and none of the top 9 allergens.\n\nNothing against the milk on the tray. This is for the kid who can't drink it.\n\nShhh… the second sentence is the one worth reading.", punchy:"One law, two sentences — and everyone only read the first one. Ask your school about the nondairy option. Willa's Kids: 8g protein, free of the top 9 allergens. 🥛"},
  "AUG10-PIN-2":{direct:"Three layers in one glass, and you can taste why they hold. 🍓🍵 Strawberry on the bottom, Willa's Original in the middle, matcha floating on top — pour it slow and the stripes stay put. Three layers — and the middle one has four ingredients.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛\n\nIngredients\n- 1 cup Willa's Organic Oat Milk\n- 1/2 cup fresh strawberries, crushed\n- 1 tsp maple syrup\n- 1 tsp ceremonial-grade matcha — the finer, less bitter grade\n- 2 tbsp hot water, whisked smooth\n- a tall glass of ice", warm:"Strawberries, ice, oat milk, matcha — in that order, and don't stir until you've looked at it. 🍓🍵 Three layers, and shhh… the middle one is the whole reason it looks like that.\n\nWilla's Original is four organic ingredients and the whole oat, so it pours creamy enough to hold its own stripe.\n\nIngredients\n- 1 cup Willa's Organic Oat Milk\n- 1/2 cup fresh strawberries, crushed\n- 1 tsp maple syrup\n- 1 tsp ceremonial-grade matcha — the finer, less bitter grade\n- 2 tbsp hot water, whisked smooth\n- a tall glass of ice", punchy:"Three layers, and the middle one's got four ingredients. 🍓🍵"},
  "AUG10-TT-4":{direct:"Willa's Barista is 3g of sugar — 50% less than the average barista oat milk — with no gums and no rapeseed oil. ☕️ It foams if you want it to, and over ice it just stays creamy.\n\nThe can picks your sugar. The glass is yours. That's the whole case for building iced coffee at home: about ninety seconds of work, and the sweetness is a decision instead of a spec.\n\nIngredients\n- 1 cup Willa's Barista Organic Oat Milk\n- 1/2 cup cold brew (or 1 shot espresso, cooled)\n- a tall glass of ice\n- optional: 1 tsp maple syrup — your call, and that's the point", warm:"Iced coffee, about ninety seconds, and you're the one holding the maple. ☕️\n\nWilla's Barista brings 3g of sugar — 50% less than the average barista oat milk — with no gums and no rapeseed oil, so the base you're building on is already lighter.\n\nThe can picks your sugar. The glass is yours.", punchy:"The can picks your sugar. The glass is yours. ☕️ Willa's Barista — 3g, no gums, no rapeseed oil."},
  "AUG10-TT-5":{direct:"There's a supplement going around with liquid gold in the pitch. Its nutrient profile was built for a newborn calf. And when someone finally gathered up the studies on what it does for a grown adult's digestion, the answer came back inconclusive.\n\nWilla's Original gets read line by line, and honestly — good. Four ingredients, and the vanilla extract is the fanciest thing on there. Certified organic. Certified glyphosate-free by an outside lab, tested every lot. 1g sugar, all of it from the oats. 4g+ protein and 2g+ fiber, because we keep the whole oat kernel — bran and germ, the way steel-cut oats do — instead of filtering the protein and the fiber back out the way most oat milks do.\n\nIf it's already in your cabinet, that's your call and we're not in it. We'd only point out that one of us has to prove it — and it isn't the one making the bigger promise. 🥛", warm:"Somewhere out there a powder built for a newborn calf is being called liquid gold, and nobody has asked it for a single receipt.\n\nMeanwhile Willa's Original gets its four-line ingredient list read out loud in the aisle. Honestly? Good. Read it twice. Organic, certified glyphosate-free, tested every lot — and shhh, the vanilla extract is the fanciest thing on there. 🥛", punchy:"Built for a newborn calf. Reviewed: inconclusive. Meanwhile our four ingredients get audited in the aisle — please, read them twice. 🥛"},
  "AUG10-IG-R4":{direct:"Three stripes, one glass — and the middle one is the milk. 🍓 Crushed strawberries at the bottom, ice, then a gentle pour so the bands hold their line, and matcha floated over the top. Pour it fast and you get pink. Pour it slow and you get the shot. 🍵\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛\n\nIngredients\n- 1 cup Willa's Organic Oat Milk\n- 1 cup strawberries, hulled\n- 1 tbsp maple syrup\n- 1 tsp lemon juice\n- 1 tsp matcha powder\n- 2 oz hot water\n- ice", warm:"Strawberries on the bottom, matcha on top, and the stripe in the middle doing all the work. 🍓 Pour it slow — that's the entire trick, and shhh… it's the easy part.\n\nWilla's Original is four organic ingredients and it pours bright white, so the bands actually read.\n\nIngredients\n- 1 cup Willa's Organic Oat Milk\n- 1 cup strawberries, hulled\n- 1 tbsp maple syrup\n- 1 tsp lemon juice\n- 1 tsp matcha powder\n- ice", punchy:"Strawberry matcha, three stripes, zero dairy — and the middle one's the milk. 🍓🍵"},
  "AUG10-PIN-3":{direct:"Willa's Original is four organic ingredients and the whole oat groat — the whole oat kernel, the way steel-cut oats keep it. 🌾\n\nThat one decision is also the sustainability answer. Because the whole groat goes into the carton, there's nothing to discard: zero food waste in the process. And organic oats do quiet work while they grow — they sequester carbon, meaning they pull it out of the air and into the ground, and they leave the soil healthier for the next season.\n\nNothing left out of the oat. So nothing left over.\n\nOrganic whole grain oats, filtered water, organic vanilla, sea salt. Certified organic, certified glyphosate-free, tested every lot. 1g sugar, 4g+ protein, 2g+ prebiotic fiber.", warm:"Sustainability, itemized. 🌾 The whole oat groat goes into Willa's Original — the whole kernel, like steel-cut oats — so there's nothing left to throw away. Zero food waste, and organic oats that sequester carbon while they grow, pulling it out of the air and into the soil.\n\nThat's a lot of quiet work for four ingredients.\n\nNothing left out of the oat. So nothing left over.", punchy:"Nothing left out of the oat. So nothing left over. 🌾 Willa's Original — whole groat in, zero food waste out."},
  "AUG10-IG-F2":{direct:"USDA Organic. Certified Glyphosate Residue Free. WBENC women-owned. Three marks on the carton, and not one of them is self-issued. 🌾\n\nOrganic is a federal standard with an audit behind it. Glyphosate Residue Free means every lot is tested for weedkiller residue before it ships. WBENC means an outside council verified the company is majority women-owned; Willa's was founded by a mother and named for her grandmother.\n\nAnyone can print the word clean on a carton. These three had to be checked by someone who doesn't work here.\n\nAnd the reason any of it holds up is what's inside. Willa's Original is four organic ingredients — whole grain oats, filtered water, vanilla extract, sea salt. 1g of sugar, none of it added. 4g+ protein and 2g+ prebiotic fiber, the kind that supports gut and heart health, because the whole oat stays in instead of getting filtered out.", warm:"Three marks on the carton, and not one of them is self-issued. 🌾 USDA Organic. Certified Glyphosate Residue Free — every lot tested for weedkiller residue. WBENC women-owned, because Willa's was started by a mother and named for her grandmother.\n\nShhh… the paperwork is the least glamorous part of this brand and the part we're proudest of.", punchy:"USDA Organic. Certified glyphosate-free, tested every lot. WBENC women-owned. Three marks, none of them self-issued. 🌾"},
  "AUG10-TT-6":{direct:"the dishwasher's already empty. hallelujah.\nboth shoes, same room. hallelujah.\nthe good mug was clean. hallelujah.\nnobody had a strong opinion about breakfast. hallelujah.\nthe carton's still full. hallelujah. 🙌\n\nFive small mercies, and exactly one of them is ours.\n\nWilla's Original and Willa's Kids share a shelf around here — organic whole oats, kept whole, so the fiber and the protein stay in the glass instead of getting filtered out. Most oat milks throw both away.\n\nShhh… a full carton absolutely counts as a win.", warm:"the dishwasher's already empty. hallelujah. both shoes, same room. hallelujah. the carton's still full. hallelujah. 🙌\n\nTwo of those are luck. The third one you can just keep on the shelf — Willa's Original and Willa's Kids, organic whole oats kept whole, fiber and protein still in the glass.\n\nShhh… it counts as a win.", punchy:"the carton's still full. hallelujah. 🙌 Willa's Original and Willa's Kids, quietly doing the least dramatic job in the fridge."},
  "AUG10-IG-R5":{direct:"Willa was born in 1921. The carton launched in 2021. A hundred years between the bowl and the carton, and nothing important changed.\n\nShe cooked with whole oats because that's what food was — not because it scored well. Willa's Original is still organic whole grain oats, filtered water, organic vanilla extract, sea salt. Still the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled — the same thing that went in her pot.\n\nChristina, in her own kitchen: \"my grandmother was making oatmeal way before it was cool.\"\n\nReal food, passed down. Reinvented forward.", warm:"Born 1921. Launched 2021. 🌾 Willa cooked with whole oats because that's what food was — no scoring, no swapping, no reformulating.\n\nWilla's Original is still four organic ingredients and still the whole oat, which is a long way of saying the recipe held up.\n\nReal food, passed down. Reinvented forward.", punchy:"Born 1921. Launched 2021. Willa's still uses the whole oat. 🌾"}
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
  happened:"The week split cleanly: retail data turned on the whole category — Circana volumes down more than 5% a year for three straight years, almond off 9%, oat's momentum cooling, and an analyst naming price, taste, heavy processing and low protein as the reasons — while Oatly answered with an audited 67% climate gap (Aug 4), MALK stretched four-ingredient clean label into shelf-stable formats and a borrowed celebrity smoothie (Aug 6–7), a new oat-based cold brew tripled its lineup (Aug 4), and Chobani's 'Zero Sugar' claim got a lawsuit revived against it (Aug 4).",
  coming:"The pressure now comes from Washington and the school calendar rather than the shelf: the FDA's GRAS rule cleared White House review on Jul 31 and would end the self-certify-your-own-additive route, a federal ultra-processed-food definition went up for review on Aug 3, whole milk returns to lunch trays this fall under a law that also permits nutritionally equivalent plant beverages, and mandatory food-allergy training for school food staff hits its first school year.",
  plays:"The lead is the self-certification story — a federal system built on companies vouching for their own ingredients is being closed, and Willa's four-ingredient panel is the answer said calmly, not smugly; second is the allergen door into back-to-school, which is a genuinely different room than the lunchbox we already worked; third is answering the category's four objections (price, taste, processing, protein) in one honest piece instead of pretending the Circana numbers aren't real."
};


// ─── Performance · Week of MAY 25 – MAY 31 results ──────────────
const LAST_WEEK_RESULTS = [
  {id:"AUG03-IG-R1", concept:"\"the whole internet is making overnight oats — with the oat milk that's actually made of oats.\" — clean-label recipe ride", platform:"Instagram Reel", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"A $4B clean-label grocery brand launched its first cookbook and led it with overnight oats (AUG 3)", trendId:null, views:806000, saves:61400, shares:22700, comments:3800, savesDelta:12.6, sentiment:0.96, hero:true, note:"Reach and save hero of the AUG 3 – AUG 9 week, and the first time in four refreshes that a recipe beat a stance. The read is specific: the brand didn't comment on the recipe everyone had just seen, it was useful inside it, and the ingredient list did its work in the caption instead of the headline. Two of this week's briefs are built on that finding — a pour and a searchable card off the same drink."},
  {id:"AUG03-TT-1", concept:"\"four ingredients, and you can say all of them out loud.\" — the two-lists toddler answer", platform:"TikTok", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"Research on how much of the toddler shelf is ultra-processed (AUG 3)", trendId:null, views:674000, saves:42100, shares:26300, comments:5600, savesDelta:9.9, sentiment:0.94, hero:false, note:"Christina's one on-camera slot produced the week's highest share count and its second-highest saves. Sentiment held at 0.94 because the post led with the answer rather than the alarm — no fear framing anywhere in it. The same posture runs the founder stance on Wed Aug 12."},
  {id:"AUG03-TT-2", concept:"\"water walked so the whole oat could run.\" — bass-drop reveal, carton as payload", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"The bass-drop reveal transition peaking across TikTok (AUG 3)", trendId:null, views:592000, saves:27800, shares:28400, comments:2400, savesDelta:7.6, sentiment:0.95, hero:false, note:"Most-shared post of the week and only a middling save-rate — the classic format-native trade. The mechanic travels, the payload doesn't stick unless one line survives the edit. Every meme brief this week carries exactly one line built to outlive the sound."},
  {id:"AUG03-IG-R3", concept:"\"the seven-minute morning, and the part of it nobody fights about.\" — school-week reset", platform:"Instagram Reel", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"The school-restock window opening across Southern and Midwestern districts (AUG 3)", trendId:null, views:468000, saves:29600, shares:14900, comments:2700, savesDelta:8.4, sentiment:0.95, hero:false, note:"Held well but sat mid-pack, which is the ceiling on a morning-routine post once every brand in the feed is running one. The parenting slots this week deliberately moved to two rooms nobody else is standing in — the allergy desk and the night before."},
  {id:"AUG03-IG-R2", concept:"\"one carton, five mornings, zero negotiating.\" — the honest lunchbox-cost answer", platform:"Instagram Reel", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"Packed-lunch costs climbing through the restock window (AUG 3)", trendId:null, views:421000, saves:30900, shares:16800, comments:4900, savesDelta:9.2, sentiment:0.9, hero:false, note:"Second-highest comment volume and the week's lowest sentiment at 0.90 — which is what a price conversation looks like even when it goes well. It stayed above the guardrail because the post never argued the shelf price, it just showed what one carton covers. That non-defensive register carries straight into the four-objections Reel."},
  {id:"AUG03-TT-3", concept:"\"sixty-three new flavors. we're still working on the ingredient list.\" — anti-gimmick barista flag", platform:"TikTok", pillar:"REVIEWS/RECS", pillarColor:"#A191B2", sourceTrend:"The category competing on flavor invention rather than ingredients (AUG 3)", trendId:null, views:384000, saves:19700, shares:11200, comments:2300, savesDelta:5.9, sentiment:0.92, hero:false, note:"Solid, not spectacular, and the second consecutive week the flavor-versus-list flag landed mid-pack. That framing is now rested. The one coffee slot this week takes a different route entirely — the sugar load in a can versus the one you pour yourself."},
  {id:"AUG03-IG-F1", concept:"\"we never sold you 'plant-based.' we sold you a short list.\" — the label everyone's retiring", platform:"IG Feed", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"The category relabeling itself away from 'plant-based' (AUG 3)", trendId:null, views:246000, saves:17300, shares:7400, comments:1900, savesDelta:6.7, sentiment:0.93, hero:false, note:"A static carousel doing static-carousel numbers, but the save-rate on a pure-posture piece was better than expected — the audience will save a position if it reads as a standard they can use. This week's two carousels both hand the reader something to judge with rather than something to agree with."},
  {id:"AUG03-PIN-2", concept:"\"what to actually look for on a kids' drink label.\" — the four-line standard", platform:"Pinterest", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"Parents reading kids'-drink labels hardest through the restock window (AUG 3)", trendId:null, views:178000, saves:24600, shares:3600, comments:380, savesDelta:13.8, sentiment:0.97, hero:false, note:"Lowest reach, highest save-rate of the week for the second refresh running — the Pinterest pattern is now the most reliable finding the engine has. A portable standard outlives the news that produced it by months. All three pins this week are built as save objects rather than news rides."}
];

const PERF_KPIS = {
  shipped:16,
  totalReach:3904000,
  avgSavesDelta:8.9,
  topFormat:"Recipe ride with the ingredient list in the caption + founder-on-camera two-lists answer + framework save-pin"
};

const PERF_INSIGHTS = [
  {title:"A useful recipe finally beat the label read", detail:"The clean-label recipe ride took both reach and saves outright, ending a three-refresh run in which the uncut label read owned the top save-rate. The distinction that matters: the recipe post didn't comment on the moment, it was useful inside it, and the ingredient list did its work in the caption rather than the headline. Three of this week's briefs are builds — a layered pour, a searchable recipe card, and a single-serve dessert — where two weeks ago they would have been positions.", agent:"perf"},
  {title:"Pinterest is a shelf, not a channel — and the pins keep proving it", detail:"The kids'-drink-label standard posted the week's lowest reach and its highest save-rate, the second refresh in a row that pattern has held. Saves on Pinterest are the only metric in the engine that keeps compounding after the news peg dies. All three pins this week are built as save objects — a portion-sized dessert card, a searchable drink card, and a proof pin on where the oats come from — rather than as timely takes.", agent:"visual"},
  {title:"The non-defensive register is what held sentiment on a price conversation", detail:"The honest lunchbox-cost answer drew the week's second-highest comment volume and its lowest sentiment, and stayed above the guardrail for one reason: it never argued the shelf price, it just showed what one carton covers. That is the read carried into the four-objections Reel, which answers taste first, concedes nothing, and never mentions a price at all.", agent:"hook"},
  {title:"Format-native posts trade saves for shares — so give them one line that survives", detail:"The bass-drop reveal posted the week's highest share count on a middling save-rate, the same trade the peaking-format briefs have made three refreshes running. The mechanic travels, the payload doesn't stick unless a single line outlives the sound. Every meme brief this week is built around one such line — the documentary sit-down ends on the confession that there's nothing to confess, and the gratitude list keeps only its last beat about the brand.", agent:"composer"}
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
  "AUG10-TT-1":{voice:96, panel:94, pulse:90, recency:10},
  "AUG10-IG-R1":{voice:95, panel:94, pulse:92, recency:10},
  "AUG10-PIN-1":{voice:94, panel:91, pulse:92, recency:9},
  "AUG10-TT-2":{voice:95, panel:93, pulse:96, recency:10},
  "AUG10-IG-R2":{voice:96, panel:95, pulse:88, recency:9},
  "AUG10-IG-F1":{voice:94, panel:90, pulse:83, recency:9},
  "AUG10-TT-3":{voice:94, panel:91, pulse:93, recency:9},
  "AUG10-IG-R3":{voice:96, panel:94, pulse:89, recency:9},
  "AUG10-PIN-2":{voice:90, panel:89, pulse:93, recency:10},
  "AUG10-TT-4":{voice:93, panel:90, pulse:88, recency:9},
  "AUG10-TT-5":{voice:95, panel:90, pulse:92, recency:9},
  "AUG10-IG-R4":{voice:94, panel:92, pulse:96, recency:10},
  "AUG10-PIN-3":{voice:93, panel:88, pulse:78, recency:9},
  "AUG10-IG-F2":{voice:94, panel:91, pulse:86, recency:9},
  "AUG10-TT-6":{voice:96, panel:90, pulse:94, recency:10},
  "AUG10-IG-R5":{voice:96, panel:93, pulse:90, recency:8}
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
    hook:"the childhood-photo beat drop is the nostalgia transition running all over the feed 🎣",
    detail:"A spoken audio — 'and I used to go fishin' when I was a lil girl, you gotta be real quiet on the creek' — has become the go-to nostalgic transition sound. The mechanic is fixed: a childhood photo holds on screen, then cuts hard on the beat to the creator's present-day self. Most people are running it as a GRWM or outfit reveal, but the structure underneath it is generational — then, and now — which is a shape almost no food brand has claimed.",
    velocity:"high",
    platform:"TikTok + Reels",
    willasPlay:"TikTok: hold the childhood cereal-bowl photo, cut hard on the beat to the grown-up pour. Same morning, better carton.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"New Engen · August 2026 TikTok Trends — the 'used to go fishin'' childhood-photo transition", url:"https://newengen.com/insights/august-tiktok-trends/"},
      {label:"SocialPilot · Trending TikTok Sounds & Viral Trends", url:"https://www.socialpilot.co/blog/tiktok-trends"}
    ]
  },
  {
    id:"CP-2",
    type:"MEME TEMPLATE",
    typeColor:"#73B2C9",
    hook:"the 'saxophones are getting louder' dread cue is sitting at #4 🎷",
    detail:"The ominous saxophone swell sampled from Boyz n the Hood has become shorthand for trouble arriving. The structure is three beats: an ordinary setup, the horn building underneath, then the reveal of what has quietly gone wrong. It ranks #4 on the Aug 6, 2026 trending-sound board and is built entirely around a reveal.",
    velocity:"high",
    platform:"TikTok + Instagram Reels",
    willasPlay:"Sax swells over a slow fridge-door pan past everything long expired, then lands on the one carton still fine. No dialogue.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"Buffer · Trending Songs on TikTok — updated Aug 6, 2026", url:"https://buffer.com/resources/trending-songs-tiktok/"}
    ]
  },
  {
    id:"CP-3",
    type:"MEME TEMPLATE",
    typeColor:"#73B2C9",
    hook:"the 'hallelujah' gratitude list is the lowest-lift format brand accounts are winning with 🙌",
    detail:"Creators list small daily reliefs and punctuate each one with 'hallelujah.' The example running on the Aug 5, 2026 Instagram trend board is almost written for this brand already: 'that first sip of the morning, hallelujah. a line that moves fast, hallelujah.' No audio lock, no choreography, no licensing risk — it works from a single static shot, which is why business accounts are being pointed at it.",
    velocity:"medium",
    platform:"Instagram Reels + TikTok",
    willasPlay:"A morning-relief list in Willa's dry voice over one unstaged kitchen shot. 'the carton's still full, hallelujah.'",
    dnaMatch:"meme-payload",
    sources:[
      {label:"SocialBee · The latest Instagram trends — updated Aug 5, 2026", url:"https://socialbee.com/blog/instagram-trends/"}
    ]
  },
  {
    id:"CP-4",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"strawberry matcha in a layered glass is one of the formats actually moving purchases 🍓",
    detail:"Named in an Aug 8, 2026 roundup of the viral cooking formats currently changing what people buy, alongside cafe-at-home drinks and dot cakes. The build is crushed strawberries at the bottom, milk poured over ice, matcha floated on top. The entire appeal is the three visible bands holding their line in a clear glass — and the middle band is milk, which means the milk is doing the visual work.",
    velocity:"high",
    platform:"TikTok + Instagram Reels",
    willasPlay:"The middle stripe is the product. Pour Willa's Original slowly over ice so the bands hold clean — one take, no voiceover.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"ABC17 (Stacker) · TikTok kitchen: how viral cooking videos changed what we actually own (Aug 8, 2026)", url:"https://abc17news.com/stacker-food-drink/2026/08/08/tiktok-kitchen-how-viral-cooking-videos-changed-what-we-actually-own/"},
      {label:"KTVZ (Stacker) · TikTok kitchen: how viral cooking videos changed what we actually own (Aug 7, 2026)", url:"https://ktvz.com/stacker-food-drink/2026/08/07/tiktok-kitchen-how-viral-cooking-videos-changed-what-we-actually-own/"}
    ]
  },
  {
    id:"CP-5",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"dot cakes are the single-serve dessert format pulling purchases this cycle 🍫",
    detail:"Small portioned cakes built one serving at a time are named in the Aug 8, 2026 viral-format roundup alongside strawberry matcha and dumpling bakes. It is part of a wider swing toward desserts assembled in a single cup rather than a pan — photogenic, portion-honest, and completely milk-dependent in both the batter and the soak. The same roundup notes 71% of shoppers have bought or considered something because it went viral.",
    velocity:"medium",
    platform:"TikTok + Instagram Reels",
    willasPlay:"Chocolate leads: a single-serve cake soaked in Willa's Chocolate. Real cacao, five ingredients, still unmistakably dessert. No cane sugar.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"ABC17 (Stacker) · TikTok kitchen: how viral cooking videos changed what we actually own (Aug 8, 2026)", url:"https://abc17news.com/stacker-food-drink/2026/08/08/tiktok-kitchen-how-viral-cooking-videos-changed-what-we-actually-own/"},
      {label:"KTVZ (Stacker) · TikTok kitchen: how viral cooking videos changed what we actually own (Aug 7, 2026)", url:"https://ktvz.com/stacker-food-drink/2026/08/07/tiktok-kitchen-how-viral-cooking-videos-changed-what-we-actually-own/"}
    ]
  },
  {
    id:"CP-6",
    type:"MISINFORMATION REBUTTAL",
    typeColor:"#C46A5A",
    hook:"colostrum is being sold as 'liquid gold' on evidence a systematic review called inconclusive 🐄",
    detail:"Bovine colostrum now appears on roughly two-thirds more menus than a year ago, with about one in three consumers linking it to digestive wellness. A gut-health science company called it a wellness fad to avoid, on the grounds that the nutrient profile is built for a newborn calf, not an adult human. A systematic review on gastrointestinal benefits came back inconclusive, and one study found it can actually increase intestinal permeability during endurance exercise.",
    velocity:"medium",
    platform:"TikTok wellness + trade press",
    willasPlay:"Don't name it. Name the double standard: one supplement gets a halo on no evidence while oat milk gets its ingredient list audited.",
    dnaMatch:"mom-activist",
    sources:[
      {label:"DairyReporter · Colostrum: functional treasure or cruel wellness fad? (Aug 4, 2026)", url:"https://www.dairyreporter.com/Article/2026/08/04/colostrum-has-functional-food-potential-but-remains-controversial/"}
    ]
  },
  {
    id:"CP-7",
    type:"NEWS CYCLE",
    typeColor:"#C9A227",
    hook:"pediatricians are telling parents to start the school-year sleep reset now, and local news is running it everywhere 😴",
    detail:"Health desks across multiple markets ran near-identical pediatrician segments on Aug 5–6, 2026 telling parents to begin shifting bedtime and wake-up in 15–30 minute steps one to two weeks before the first bell. The prescription is specific: room at 65–70°F, devices out 30–60 minutes before bed, a 30-minute wind-down split between getting ready and something calm. It is the one back-to-school ritual that happens the night before rather than the morning of.",
    velocity:"high",
    platform:"Local TV health desks + parenting press",
    willasPlay:"Own the wind-down, not the wake-up. Willa's Kids warmed in a mug as the last step before screens go off.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"WTOP · How to help your children reset their sleep schedules for the new school year (Aug 5, 2026)", url:"https://wtop.com/parenting/2026/08/how-to-help-your-children-reset-their-sleep-schedules-for-the-new-school-year/"},
      {label:"WSAW · Pediatrician says mid-August is a good time to start adjusting kids' sleep schedules (Aug 6, 2026)", url:"https://www.wsaw.com/2026/08/06/pediatrician-says-mid-august-is-good-time-start-adjusting-kids-sleep-schedules-school/"}
    ]
  },
  {
    id:"CP-8",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"'protein-maxxing' has spread to coffee, chips and soda — and the science says people are timing it wrong 💪",
    detail:"An Aug 9, 2026 wellness feature and companion quiz calls protein the most talked-about and most misunderstood nutrient going, with claims now stamped on coffee, chips and soda. The recurring mistake it names is timing: Americans take roughly half their daily protein at dinner and far too little at breakfast, which is exactly where the satiety and muscle benefit would come from. The number on the front of the pack is being treated as the whole story.",
    velocity:"high",
    platform:"National wellness press + TikTok",
    willasPlay:"Push back on protein-as-a-sticker, ride protein-at-breakfast. Kids has 8g, same as dairy, in a cup a kid actually finishes.",
    dnaMatch:"mom-activist",
    sources:[
      {label:"Washington Post · Are you making these common protein mistakes? Take our quiz (Aug 9, 2026)", url:"https://www.washingtonpost.com/wellness/interactive/2026/08/09/are-you-making-these-common-protein-mistakes-take-our-quiz/"}
    ]
  },
  {
    id:"CP-9",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"the sharpest food-brand spot of the week hung its joke on a real race weekend, not a made-up holiday 🏁",
    detail:"Graza launched 'The Hot Lap Test' on Aug 7, 2026 — a spot built entirely around how many NASCAR hot laps it takes to heat a car hood enough to fry an egg — running on the CW race broadcast from Aug 8 with a trackside food truck and a racing-team tie-in. The move is a product's actual function turned into a joke and pinned to a moment already on television. It's the cheapest kind of cultural relevance there is, and it doesn't require inventing an occasion.",
    velocity:"medium",
    platform:"TV spot + creative trade press",
    willasPlay:"Steal the mechanic, not the sport: pin one Willa's product truth to a live moment people are already watching.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"Shots · Graza adds serious sizzle to NASCAR (Aug 7, 2026)", url:"https://shots.net/news/view/graza-adds-serious-sizzle-to-nascar"}
    ]
  },
  {
    id:"CP-10",
    type:"ENTERTAINMENT MOMENT",
    typeColor:"#A191B2",
    hook:"a stripped-back folk record landed Friday that would soundtrack a kitchen without irony 🎸",
    detail:"Margaret Glaspy's fourth album arrived Aug 7, 2026 — eleven songs, forty-two minutes, produced by Joe Henry and cut live over three days with a trio at a New York studio. Reviewers describe a deliberate turn away from indie-rock into country-leaning folk, with half-spoken, unguarded vocals about relationships and self-reckoning. Warm, unhurried, completely un-precious — the tonal opposite of a wellness-brand soundtrack.",
    velocity:"medium",
    platform:"Streaming + social audio",
    willasPlay:"Use a track as the bed for a slow heritage cut — hands, oats, morning light. Riff the mood, never name the artist.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"Americana Highways · Review: Margaret Glaspy 'I Am Both' (Aug 5, 2026)", url:"https://americanahighways.org/2026/08/05/review-margaret-glaspy-i-am-both/"},
      {label:"Tinnitist · Albums Of The Week: Margaret Glaspy | I Am Both (Aug 6, 2026)", url:"https://tinnitist.com/2026/08/06/albums-of-the-week-margaret-glaspy-i-am-both/"}
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
  "AUG10-TT-1":"mom-activist",
  "AUG10-IG-R1":"on-pack-checklist",
  "AUG10-PIN-1":"viral-recipe-remix",
  "AUG10-TT-2":"meme-payload",
  "AUG10-IG-R2":"kid-family-moment",
  "AUG10-IG-F1":"before-after-stitch",
  "AUG10-TT-3":"kid-family-moment",
  "AUG10-IG-R3":"mom-activist",
  "AUG10-PIN-2":"viral-recipe-remix",
  "AUG10-TT-4":"on-pack-checklist",
  "AUG10-TT-5":"mom-activist",
  "AUG10-IG-R4":"viral-recipe-remix",
  "AUG10-PIN-3":"on-pack-checklist",
  "AUG10-IG-F2":"at-shelf-moment",
  "AUG10-TT-6":"meme-payload",
  "AUG10-IG-R5":"mom-activist"
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
  "AUG10-TT-1":{
    shoot:[
      "Single locked-off medium close-up of Christina in her own kitchen, morning window light camera-left — shoot the whole thing in one take, then again slower; the calmer take is the one",
      "The carton set-down at 3s: hand enters, places Willa's Original label-forward at frame-right, hand exits. Shoot 4-5 times, it's the beat the eye lands on",
      "Slow 4-second push-in to hand-resting-beside-carton for the proof beat — no turning, no flipping, no lifting",
      "Clean plate of the empty counter with the carton alone, held 6 seconds, as a safety cutaway if a line needs trimming"
    ],
    found:[
      "Trend reference (news): https://www.food-safety.com/articles/11703-regulatory-updates-gras-proposed-rule-clears-omb-review-fda-sends-upf-whitepaper-to-oira — Food Safety Magazine, Aug 4, 2026. The plain-language read on what actually cleared review; use it to get the mechanism sentence right before the shoot",
      "Trend reference (news): https://www.dailyintakeblog.com/2026/08/oira-completes-review-of-fda-proposed-gras-rule/ — The Daily Intake, Aug 7, 2026. Confirms the Jul 31, 2026 clearance date and the public-inventory provision",
      "Watch two Patagonia founder-to-camera stance videos back to back before rolling — the reference is the stillness and the refusal to raise the voice, not the subject matter"
    ],
    memes:[
      "No meme layer on this one — it's the week's straight-faced stance, and the joke version of the same signal runs separately on TikTok. Stacking a format on top would undercut the gravity"
    ],
    archive:[
      "Skip archive — single-take founder frame, all original footage, no stock and no news clips by design"
    ]
  },
  "AUG10-IG-R1":{
    shoot:[
      "Fridge-door open, hand pushing past two label-turned-away cartons to pull Willa's Original from the back — shoot 3 takes, this is the confession beat and it has to feel unstaged",
      "Side-on 50mm slow-motion pour into a clear glass in hard window light — the coat it leaves on the glass wall IS the taste claim, shoot it until it's clean",
      "Locked overhead of the carton label-forward on a cream board with empty space at frame left for four stacked check marks",
      "Macro drift across the certification marks on the carton — organic, glyphosate-free, WBENC — one focus pull per mark",
      "Hand lifting the full glass out of frame, carton left alone and in focus"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/oatmilk — read the comment sections under category posts for the exact phrasing people use when they complain about texture; steal their words for the three complaint lines",
      "Reference (Instagram): Kiki Milk's feed — the posture to match exactly. Lay out the category's shortcut plainly, then the fix, no defensiveness, no named brand",
      "Reference (Instagram): Olipop's benefit posts — proof you can say 'prebiotic fiber' out loud without sounding like a supplement company"
    ],
    memes:[
      "No meme template and no trending sound on this one — the humor is the fridge-door confession in the first three seconds. The silence under the three complaints is the setup; adding a sound trend kills it"
    ],
    archive:[
      "Existing clean-pour footage of Willa's Original can back up the hero shot, but reshoot if the coat on the inside of the glass isn't visible — that frame carries the entire taste argument"
    ]
  },
  "AUG10-PIN-1":{
    shoot:[
      "3/4 overhead of the finished cup with the soak line visible through the glass, spoon already pulled through",
      "Warm Willa's Chocolate poured over the baked cup until it pools at the rim — shoot 3-4 takes, this is the alternate hero",
      "Willa's Chocolate carton standing in the upper third, label forward, afternoon window light",
      "Overhead flat-lay of the seven recipe ingredients in small bowls, carton anchoring the frame"
    ],
    found:[
      "Trend reference (article): https://abc17news.com/stacker-food-drink/2026/08/08/tiktok-kitchen-how-viral-cooking-videos-changed-what-we-actually-own/ — the Aug 8, 2026 roundup naming single-serve cakes among the formats moving purchases",
      "Trend reference (TikTok): https://www.tiktok.com/tag/mugcake — single-serve cake builds, for portion framing + how the cup is composed in-frame"
    ],
    memes:[
      "Static pin → skip memes; the portion-size joke in the overlay carries the wink"
    ],
    archive:[
      "Skip archive — all original food photography"
    ]
  },
  "AUG10-TT-2":{
    shoot:[
      "The present-day match-frame: bowl centered, spoon at the same angle as the archive photo, Willa's Original label-forward just behind — shoot this AFTER you have chosen the photo so the framing matches",
      "Hands-only pour over the bowl, one clean unbroken take, thick and matte with no bubbles",
      "Single spoon lift at the end, close-miked",
      "Static end-card lockup: carton and bowl on cream, navy type"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/nostalgia — how creators are pacing the childhood-photo hold before the beat-drop cut; note how long they let the still sit",
      "Format explainer (permanent reference page): https://newengen.com/insights/august-tiktok-trends/ — the 'used to go fishin'' childhood-photo transition, its audio and its mechanic"
    ],
    memes:[
      "The wider then/now transition wave — the joke is always the MATCH, never a punchline; resist adding one",
      "Skip any 'nobody's talking about' or ironic-caption overlay — this format works because it plays the memory straight"
    ],
    archive:[
      "A real team or customer childhood breakfast photo is strongly preferred over stock — put out an internal call before shooting",
      "If no personal photo clears, license a 1990s home-kitchen breakfast still; do NOT use a Willa family photo here (the grandmother archive is reserved for the heritage Reel this week)"
    ]
  },
  "AUG10-IG-R2":{
    shoot:[
      "Cofounder-sister to camera in her own kitchen, mid-morning, no ring light — one continuous take of the hook line, shoot 4-5 versions and pick the least polished",
      "Overhead insert: school forms + a printed action plan fanned across the counter, hands only, blank or blurred documents",
      "Fridge door open → Willa's Kids carton lifted out and set down beside the paperwork, label forward — shoot twice, once slower",
      "Kid's hand entering frame to take the cup and leaving with it — no face needed, just the reach",
      "Carton alone on the counter in morning light for the end card, hold 3 full seconds"
    ],
    found:[
      "Context (Aug 4, 2026): https://www.allergicliving.com/2026/08/04/back-to-school-with-food-allergies-8-tools-for-success/ — the actual pre-first-bell checklist allergy families are working right now. Read it before scripting so the details ring true; do NOT quote it on camera.",
      "Policy grounding (permanent reference page): https://www.durbin.senate.gov/newsroom/press-releases/durbin-fischers-protecting-children-with-food-allergies-bill-signed-into-law — why this back-to-school is different. Internal only, never cited in the post.",
      "Tone reference: Partake Foods' parent-first Reels — mother-founded, allergen-lane, warm, and completely unapologetic about talking to one audience. Match that confidence, not a broader 'for everyone' register."
    ],
    memes:[
      "No meme format on this one — the humor pattern is People-on-Camera Amplification (cofounder-sister), and the wink lives entirely in 'that list is already long enough.' Do not bolt a trending audio onto it; the sound is her voice."
    ],
    archive:[
      "Skip archive — all original footage. Do NOT reuse the AUG 3 school-morning or lunchbox footage; this is a different room and reusing it collapses the two briefs into one."
    ]
  },
  "AUG10-IG-F1":{
    shoot:[
      "The 'before' glass — generic amber syrup-sweet drink, unbranded, flat cool light, eye-level straight-on. Shoot it plain and slightly joyless on purpose",
      "The 'after' pour — Willa's Original into a clear glass, identical crop and eye-line to the before card, warm morning light, carton label-forward beside it. Shoot 3-4 takes, this is the card the post lives on",
      "Straight-down macro of dry whole oat groats spilling beside the Willa's Original back label, four lines legible",
      "Carton on a windowsill in morning light with clean cream negative space above for the sign-off type"
    ],
    found:[
      "Skip found — this is an owned two-panel switch carousel, all original photography. No trending format is being ridden, so nothing to match"
    ],
    memes:[
      "Static carousel → skip memes; card 1 is the Relatable Confession line and carries the whole joke"
    ],
    archive:[
      "Skip archive — no period or stock material needed"
    ]
  },
  "AUG10-TT-3":{
    shoot:[
      "Locked-off wide of one kitchen counter at night, single lamp practical — shoot the entire sequence in one unbroken take first, then get coverage",
      "Slow warm pour of Willa's Kids into a small ceramic mug, steam visible against the dark background — 4-5 takes, this is the hero frame",
      "Small hands wrapping the mug, lifting it just off the counter, holding still for a beat",
      "Adult hand turning a phone face-down on the counter in one motion, no cut",
      "Six full seconds of the empty counter with the carton and the lamp — this is the end-card plate, don't rush it"
    ],
    found:[
      "Trend reference (news cycle): WTOP · How to help your children reset their sleep schedules for the new school year (Aug 5, 2026) — https://wtop.com/parenting/2026/08/how-to-help-your-children-reset-their-sleep-schedules-for-the-new-school-year/ — the screens-away, calm-wind-down-before-bed framing the whole cycle repeats",
      "Trend reference (news cycle): WSAW · Pediatrician says mid-August is a good time to start adjusting kids' sleep schedules (Aug 6, 2026) — https://www.wsaw.com/2026/08/06/pediatrician-says-mid-august-is-good-time-start-adjusting-kids-sleep-schedules-school/",
      "Trend reference (TikTok): https://www.tiktok.com/tag/bedtimeroutine — the low-light single-room pacing parents actually post, and the on-screen text rhythm that fits it"
    ],
    memes:[
      "Skip memes — the register is deliberately quiet. The wink lives in the caption's 'mornings get all the back-to-school content' turn, not in a template."
    ],
    archive:[
      "Skip archive — one room, one night, all original footage."
    ]
  },
  "AUG10-IG-R3":{
    shoot:[
      "Cofounder handheld 35mm chest-up at a kitchen counter in real window light, carton at frame right — shoot the hook line 4-5 times until it sounds like she's telling another parent, not reading",
      "Locked overhead of a hand writing '1 law. 2 sentences.' on a plain notepad, real handwriting, pen sound close-miked",
      "Macro slow drift across the Willa's Kids carton nutrition side, one focus pull per fact, no hand in frame",
      "Wider handheld of her counting the three questions on her fingers, counter and carton both reading in frame",
      "Static wide: carton on the counter beside an empty backpack propped by the door in morning light — no people, no kids in frame at any point"
    ],
    found:[
      "Reference (policy, permanent page): https://www.congress.gov/crs-product/IN12548 — the Congressional Research Service page on the Whole Milk for Healthy Kids Act. Read it before the shoot so the two glosses are worded accurately; do not put the acronym on screen",
      "Reference (news): https://www.wfmz.com/health/usda-lets-whole-milk-out-of-a-15-school-year-detention-this-fall/article_7c22bc7a-5b5a-568d-b409-ecdec7b07ac3.html — Aug 4, 2026 syndication of the whole-milk return; this is the coverage that swamped the nondairy provision, which is exactly why the brief exists",
      "Reference (allergy press): https://www.allergicliving.com/2026/08/04/back-to-school-with-food-allergies-8-tools-for-success/ — Aug 4, 2026 back-to-school checklist for allergy families; the tone to match is calm, practical, checklist-shaped, never alarmed",
      "Trend reference (TikTok): https://www.tiktok.com/tag/schoollunch — scan for the parent-creator delivery pattern on school-office content: talking to lens from a counter, no intro, questions counted on fingers"
    ],
    memes:[
      "No meme template and no trending sound. The dry line — 'one law, two sentences, and everyone only read the first one' — is the entire joke, and a trending audio underneath would flatten it"
    ],
    archive:[
      "Existing Willa's Kids carton macro footage can cover THE CARTON beat if the nutrition side reads clean in matching window light; the on-camera and notepad beats must be shot fresh"
    ]
  },
  "AUG10-PIN-2":{
    shoot:[
      "Straight-on at glass height, tall clear glass, all three bands readable as clean stripes — shoot 4-5 takes, the band separation is the whole pin",
      "Slow pour of Willa's Original over ice as a stills sequence — grab the frame where the oat band is widest and cleanest",
      "Willa's Original carton placed just behind and right of the glass, label forward, in bright side daylight",
      "A crushed-strawberry base close-up as a secondary pin variant for A/B testing the thumbnail"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/strawberrymatcha — top posts for the layer order, glass shape and how creators hold the band separation",
      "Trend reference (article): https://abc17news.com/stacker-food-drink/2026/08/08/tiktok-kitchen-how-viral-cooking-videos-changed-what-we-actually-own/ — Aug 8, 2026 roundup naming the layered strawberry matcha among the formats currently changing what people buy",
      "Pinterest: existing 'iced strawberry matcha' pins — study the title conventions that rank, not the styling"
    ],
    memes:[
      "Static pin → skip memes; the wordplay lives entirely in the one line of typography"
    ],
    archive:[
      "Skip archive — all original food photography"
    ]
  },
  "AUG10-TT-4":{
    shoot:[
      "The single locked-off waist-height frame: tall glass of ice on cream counter, Willa's Barista carton beside it label forward — this one setup carries the entire post, get the composition right before anything is poured",
      "Cold brew hitting ice, close-miked — shoot 3-4 takes purely for the sound",
      "The Willa's Barista pour blooming up through the cold brew, slow, no stir yet — hero frame, shoot it at least 5 times and pick the cleanest bloom",
      "Hand with a spoon of maple hovering over the glass, then setting it down without pouring — shoot BOTH endings (adds it / doesn't) so the edit can pick the funnier beat",
      "Condensation running down the glass with the carton pulling into focus behind it"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/icedcoffee — the at-home build format; watch for how little on-screen text the best ones use",
      "Trend reference (TikTok): https://www.tiktok.com/tag/oatmilk — text-overlay-only posts in the category, for type size + placement on a single static frame"
    ],
    memes:[
      "Pattern 10 (wordplay / text joke) — one line, one frame, no edit tricks. If the line needs a second read, it's the wrong line.",
      "Deliberately NOT riding a meme audio: the stillness is the format. Do not add transitions to make it feel busier."
    ],
    archive:[
      "Skip archive — the maple-spoon hesitation has to be shot fresh, nothing in the library has that beat",
      "Do NOT pull the Aug 3 steam-wand/foam footage; this post is iced and text-only by design"
    ]
  },
  "AUG10-TT-5":{
    shoot:[
      "The full take, locked off on a tripod, one unbroken 28 seconds — shoot it 5-6 times and pick the calmest one. Do not cut into it in post",
      "Hand sliding handwritten index cards into frame, close-miked so the paper-on-counter sound is usable",
      "Finger tracing the four-line ingredient list on the Willa's Original carton, one line per beat — the slower the better",
      "Slow pour into a clear glass in hard morning window light, set down inside the same locked frame",
      "PROP NOTE: use a plain unbranded amber-glass jar + white scoop. No label, no brand, no real product on the counter. It must never be identifiable and it must never leave frame"
    ],
    found:[
      "Signal source (the reason this brief exists — INTERNAL, do not cite on camera): https://www.dairyreporter.com/Article/2026/08/04/colostrum-has-functional-food-potential-but-remains-controversial/",
      "Tone reference (TikTok): https://www.tiktok.com/tag/wellnesstok — scroll for the flat-affect, no-music, single-locked-shot posts; that's the register, not the loud debunk posts",
      "Second signal (CP-8, protein-as-a-sticker — same mechanic, different aisle): https://www.washingtonpost.com/wellness/interactive/2026/08/09/are-you-making-these-common-protein-mistakes-take-our-quiz/"
    ],
    memes:[
      "No meme format on this one — riding a trending sound would read as piling on. The absence of a sound IS the format",
      "Humor pattern is Taboo-as-Normal dialed ~30% down from Olipop: say the uncomfortable thing completely flat, never punch at the buyer, never sneer at wellness"
    ],
    archive:[
      "Pull any existing locked-off counter footage of the Willa's Original carton in morning light as a safety cutaway — but the goal is zero cuts",
      "Archive ingredient-list traces from prior label briefs can sub in if the finger-trace take doesn't land"
    ]
  },
  "AUG10-IG-R4":{
    shoot:[
      "Side-on locked-off at glass height for the whole build — crushed strawberries going in, maple, lemon, tap to settle. No overhead angles anywhere; the bands only read in profile",
      "The slow Willa's Original pour over ice, unbroken — shoot this 5-6 times, it is the only shot that decides whether the Reel works",
      "Macro of matcha poured over the back of a spoon, the exact moment the third band separates",
      "Carton standing behind the finished glass, condensation running, shallow pull-focus between the two"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/strawberrymatcha — the layered-glass builds; study pour speed and how long the good ones hold on the bands before stirring",
      "Trend reference (article): https://abc17news.com/stacker-food-drink/2026/08/08/tiktok-kitchen-how-viral-cooking-videos-changed-what-we-actually-own/ — Aug 8, 2026 roundup naming the layered strawberry matcha as one of the formats moving purchases"
    ],
    memes:[
      "Skip memes — the format IS the payload here. A text joke over the pour would break the one-take discipline the trend runs on"
    ],
    archive:[
      "Skip archive — original footage only, single-session shoot, one continuous build"
    ]
  },
  "AUG10-PIN-3":{
    shoot:[
      "Willa's Original carton straight-on on warm cream seamless, soft north-window daylight, label forward — shoot with deliberate headroom above the carton so the type has two-thirds of the frame",
      "Macro of loose whole oat groats scattered at the base of the carton — this is the only texture in the pin, so shoot it clean and shallow",
      "Alternate frame: the same carton one stop brighter with the groats removed, as a type-only variant to A/B against the textured version"
    ],
    found:[
      "Trend reference (Pinterest): typographic proof pins from ingredient-first food brands — the ones that save are the ones legible at 236px; check every draft at thumbnail before it goes out",
      "Design reference: Graza and Omsom pack typography — the zine-cover register this pin is reaching for, not the earth-tone sustainability template"
    ],
    memes:[
      "Static pin → skip memes; the turn on 'so nothing left over' is the wink and it carries the whole post"
    ],
    archive:[
      "Skip archive — all original stills"
    ]
  },
  "AUG10-IG-F2":{
    shoot:[
      "The hero: an actual grocery shelf with Willa's stacked two rows deep, label-forward, straight-on 35mm at chest height in soft aisle daylight — shoot it 6-8 times across two stores, this card is the entire post and it has to look unstaged and still be beautiful",
      "Hand lifting one carton out of the row, slight motion blur on the hand, row left intact behind it — leave clean negative space in the upper third for the overlay line",
      "Macro of the printed USDA Organic mark on the carton, single focus pull, cream space at frame right",
      "Macro of the Certified Glyphosate Residue Free mark, same crop discipline and same light as the organic card so the three read as a set",
      "Macro of the WBENC women-owned mark, then one wider frame of the full back label for the archive folder"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/groceryhaul — scan the top at-shelf posts for framing height and how much shelf context to keep in frame before it stops reading as editorial",
      "Trend reference (TikTok): https://www.tiktok.com/tag/oatmilk — the aisle-level shots people actually stop on; note how little text the good ones carry",
      "Internal reference: Humor Pattern 09 (Aesthetic IRL Encounter) in the team's 2026 humorous-posts audit — the Ghia aesthetic-cart and glasses-carousel rows are the exact composure this carousel is adapting"
    ],
    memes:[
      "Static carousel → skip memes; the wink lives entirely in the 'not one of them is self-issued' line and in the shhh… variant"
    ],
    archive:[
      "Pull the existing carton-back product photography for the three certification marks if the macro shoot can't get clean light — the marks are printed art, they don't need to be re-shot to be true"
    ]
  },
  "AUG10-TT-6":{
    shoot:[
      "One locked-off static frame of the real counter, both cartons at frame right, labels forward — do NOT style it. Leave the crumbs, the bunched dish towel, the cup nobody put away.",
      "Roll 45 seconds of that empty frame with absolutely nothing happening — the edit needs the extra runtime to time the text stack.",
      "The only move in the video: a hand lifts Willa's Original an inch and gives it one small shake. 4-5 takes; it has to read casual, not demonstrative.",
      "Alternate setup with Willa's Kids nearest camera for a parent-audience cut of the same five lines.",
      "Clean plate of the two cartons on cream for the end-card lockup"
    ],
    found:[
      "Trend reference (Instagram + TikTok): https://socialbee.com/blog/instagram-trends/ — updated Aug 5, 2026; the entry naming the 'hallelujah' gratitude-list format and the example script brand accounts are running",
      "Trend reference (TikTok): https://www.tiktok.com/tag/hallelujah — top posts under the tag for delivery pacing and how flat creators keep the read"
    ],
    memes:[
      "Flat every single time. Same pitch on every 'hallelujah' — the sameness IS the joke, and performed enthusiasm kills it on the second line.",
      "Five items. Not six. The format collapses the moment it turns into a list of features.",
      "Only the last line is about Willa's. If item three starts sounding like a benefit, cut item three and write a real one.",
      "Do not use this to announce anything — no drop, no retailer, no new flavor. It is a feel-good post and the payload is that the carton is full."
    ],
    archive:[
      "Skip archive — one unstaged static frame, shot fresh. Library b-roll is styled and will read as an ad the second it cuts in."
    ]
  },
  "AUG10-IG-R5":{
    shoot:[
      "Extreme close-up of dry whole oat groats tipping from a glass jar into a worn ceramic bowl, hard morning window light — shoot 3-4 takes, this is frame one and it has to be beautiful",
      "Christina three-quarter at the counter in her own kitchen, sync sound, one clean unhurried take of the grandmother line — no lens-direct address, no second take energy",
      "Steam crossing the light beam over a pot on the stove; wooden spoon set down on the counter — slow, boring on purpose",
      "Hand setting the Willa's Original carton on the wood beside the bowl, label forward, lit identically to the grain",
      "Static wide of bowl + carton side by side for the closing hold — lock the camera off and let it sit"
    ],
    found:[
      "Trend reference (audio mood — INTERNAL ONLY, never named on screen or in caption): the Aug 7, 2026 country-leaning folk record behind CP-10 — https://americanahighways.org/2026/08/05/review-margaret-glaspy-i-am-both/ — use it to brief the library search for a same-register bed",
      "Reference (posture, not format): Graza's co-founder letter posts — real-person warmth with no pitch inside it; this is the register the cut sits in"
    ],
    memes:[
      "Skip memes — this is the week's one un-ironic post. Any meme overlay, sticker or trending-caption move breaks it."
    ],
    archive:[
      "Existing Willa family photograph or period kitchen still may be used ONLY as an out-of-focus edge in the PRODUCT scene, and only if Christina clears the image first — otherwise shoot fresh and keep faces out of frame",
      "Willa's archive: any previously shot whole-oat-groat macro footage can cover the TURN scene if the light matches"
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
const WELCOME_WEEK_KEY = "AUG-10-2026";
const WELCOME_WEEK_RANGE = "AUG 10 – AUG 16, 2026";
const WELCOME_REFRESHED = "AUG 10, 2026";

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
  pullQuote:"two things opened on the same wall this week. one is an attack — the category charged out loud with four failures at once: price, taste, heavy processing, low protein. the other is a rule closing the route that let a company convene its own expert panel, declare a brand-new ingredient safe, and never tell the agency or the public. willa's answers both from exactly the same place — four things on the label, and not one of them self-issued. the move is to say it first, calmly, instead of waiting to be asked.",
  the_moves:[
    {kind:"ship", verb:"Open Wed Aug 12 at 9am with the self-certification stance — Christina on camera, the four-line ingredient list landing by beat two.", why:"The FDA rule that would end companies self-affirming their own new additives cleared its last White House review on Jul 31, 2026. Until now a company could convene its own expert panel, declare an ingredient safe, and never notify the agency or the public. This is the one brief this week where a face beats hands — the stance is the payload and a faceless voiceover lands soft. Patagonia gravity: calm, factual, high road. Name no politician, no agency head, and never say 'chemicals in your food.'"},
    {kind:"ship", verb:"Answer all four charges against the category in one Reel Wed Aug 12 at noon — and put taste first.", why:"The loudest attack on plant milk in three years names price, taste, heavy processing and low protein in the same breath. Dodging it reads as a brand that can't answer. Taste leads because it's the objection that resolves the second someone drinks it — rich, smooth, creamy, not chalky — and then the pour carries 4g+ protein, 2g+ prebiotic fiber, 1g sugar, four ingredients. Keep every retail number internal: the customer hears the objection and sees the glass, never an analyst."},
    {kind:"ship", verb:"Walk back into back-to-school through the nurse's office Thu Aug 13, not the lunchbox — cofounder-sister on camera.", why:"Food-allergy training became federally required for school food staff and this is its first school year. Allergy families are doing the nurse meeting, the action-plan handoff and the epinephrine placement right now — a genuinely different room from the lunchbox the last two refreshes already worked through. Willa's Kids is free of the top 9 allergens with 8g protein, DHA and calcium, and that lands as relief, never as fear. Claim nothing about school meal programs and give no medical advice."}
  ]
};


const WELCOME_HIGHLIGHTS = [
  {
    glyph:"🔒",
    kindLabel:"Policy",
    color:"#73B2C9",
    stat:"SELF-CERTIFIED",
    label:"The route that let companies vouch for their own new food ingredients just cleared its final review",
    detail:"The proposed 'Generally Recognized as Safe' rule finished White House review on Jul 31, 2026, flagged as a major rule with significant economic impact. It would make FDA notification mandatory for most new substances and put every notice on a public inventory. Until now a company could convene its own expert panel, self-affirm an ingredient and tell nobody. This is the week's lead brief — four ingredients that never needed anyone's permission slip, said plainly and without fear-framing.",
    sources:[
      {label:"Food Safety Magazine · GRAS Proposed Rule Clears OMB Review; FDA Sends UPF Whitepaper to OIRA (Aug 4, 2026)", url:"https://www.food-safety.com/articles/11703-regulatory-updates-gras-proposed-rule-clears-omb-review-fda-sends-upf-whitepaper-to-oira"},
      {label:"The Daily Intake · OIRA Completes Review of FDA Proposed GRAS Rule (Aug 7, 2026)", url:"https://www.dailyintakeblog.com/2026/08/oira-completes-review-of-fda-proposed-gras-rule/"}
    ]
  },
  {
    glyph:"⚖️",
    kindLabel:"Category",
    color:"#A191B2",
    stat:"4 CHARGES",
    label:"Plant milk is being charged with four failures at once — price, taste, processing, protein",
    detail:"Dairy-free volumes have fallen more than 5% a year for three straight years, almond off 9% in 2025, and oat's momentum is cooling. The analyst reading the numbers named all four objections out loud. That's the case against processed plant milk, not against oats — and it's answerable in one Reel with the pour, taste first, because taste is the charge Willa's wins the moment someone drinks it. Every number here stays internal.",
    sources:[
      {label:"Bloomberg · Dairy-Free Milk Sales in Decline as Americans Choose Cow's Milk (Aug 3, 2026)", url:"https://www.bloomberg.com/news/articles/2026-08-03/dairy-free-milk-sales-in-decline-as-americans-choose-cow-s-milk"},
      {label:"Newser · Americans Are Turning Away From Plant Milks (Aug 5, 2026)", url:"https://www.newser.com/story/394134/americans-cool-on-plant-milks-return-to-dairy.html"}
    ]
  },
  {
    glyph:"🥜",
    kindLabel:"Schools",
    color:"#9E652E",
    stat:"FIRST YEAR",
    label:"Food-allergy training is now required for school food staff — and this is its first school year",
    detail:"A law signed Jan 14, 2026 added a mandatory annual food-allergy module to National School Lunch Program staff training, covering how to prevent, recognize and respond to reactions. Training that was previously optional is now required. Allergy families are being walked through the nurse meeting and the action-plan handoff as the real pre-first-bell checklist — which is the new back-to-school door this week, and the one the lunchbox lane can't reach.",
    sources:[
      {label:"Allergic Living · Back-to-School with Food Allergies: 8 Tools for Success (Aug 4, 2026)", url:"https://www.allergicliving.com/2026/08/04/back-to-school-with-food-allergies-8-tools-for-success/"},
      {label:"U.S. Senate · Protecting Children With Food Allergies Bill Signed Into Law (permanent press-room page)", url:"https://www.durbin.senate.gov/newsroom/press-releases/durbin-fischers-protecting-children-with-food-allergies-bill-signed-into-law"}
    ]
  },
  {
    glyph:"🏫",
    kindLabel:"Schools",
    color:"#9E652E",
    stat:"AUG 4",
    label:"Whole milk returns to the lunch tray this fall — and the same law opens a door for fortified plant milk",
    detail:"The USDA rule took effect Jun 8, 2026, putting whole and 2% back on the tray for the first time since the 2011–12 school year, with adoption optional district by district. The same statute also permits schools to offer nondairy beverages that are nutritionally equivalent to fluid milk under standards set by the Secretary of Agriculture — the second sentence nobody is covering because the first one is louder. That gap is a Friday Reel: the question a parent can actually bring to a school.",
    sources:[
      {label:"WFMZ (Stacker) · USDA lets whole milk out of a 15-school-year detention this fall (Aug 4, 2026)", url:"https://www.wfmz.com/health/usda-lets-whole-milk-out-of-a-15-school-year-detention-this-fall/article_7c22bc7a-5b5a-568d-b409-ecdec7b07ac3.html"},
      {label:"Congress.gov (CRS) · The Whole Milk for Healthy Kids Act (P.L. 119-69) — permanent reference page", url:"https://www.congress.gov/crs-product/IN12548"}
    ]
  },
  {
    glyph:"🌱",
    kindLabel:"Competitive",
    color:"#75C596",
    stat:"67%",
    label:"The category's loudest sustainability voice turned provenance into an audited receipt",
    detail:"A new independent life-cycle assessment puts one brand's ambient barista oat milk at 67% lower climate impact than chilled cow's milk in the UK, up from 55% in 2021, driven by factory energy efficiency, transport routing, HVO fuel and a shift to home-grown oats. Hard numbers in the same week retail data attacks the halo. Willa's receipt is different and doesn't need a percentage — carbon-sequestering organic oats and zero food waste, because the whole groat goes in instead of being filtered out.",
    sources:[
      {label:"Green Queen · Oatly Widens Oat Milk Emissions Gap to 67% (Aug 4, 2026)", url:"https://www.greenqueen.com.hk/oatly-sustainability-barista-oat-milk-emissions-gap-climate-impact-lca/"},
      {label:"Oatly · Climate footprint product label (permanent brand reference page)", url:"https://www.oatly.com/en-gb/oatly-who/sustainability-plan/climate-footprint-product-label"}
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
  "Companies have been allowed to sign off on their own new ingredients without telling anyone. How do we say that out loud without sounding alarmist?",
  "People are saying plant milk is watery, over-processed and short on protein. Do we answer all of that head-on, or does answering just repeat the accusation?",
  "Allergy families are doing the school-nurse meeting right now. How can we actually be useful there without wandering into medical advice?",
  "The layered strawberry matcha is everywhere and the middle stripe is milk. How do we own that format instead of posting one more pretty drink?"
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
