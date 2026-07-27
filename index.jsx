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
    trend:"A Senate committee just advanced a bipartisan bill to put warning labels on ultra-processed foods and ban junk-food ads aimed at kids ⚠️",
    detail:"On Jul 24, 2026 the Senate health committee advanced a bipartisan bill (12-10) requiring FDA warning labels on ultra-processed foods high in sugar, salt and saturated fat, plus a ban on junk-food advertising targeting children. The move reframes 'processed' around what's actually in the ingredient list — and the shorter the list, the better it reads.",
    platform:"Federal food-policy press",
    views:"National MAHA policy cycle",
    velocity:"high",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"Original leads: '4 ingredients is what not-ultra-processed actually looks like.' Post the back label against the warning-label news — calm reassurance, not alarm.",
    urgency:"RIDE NOW",
    sources:[
      {label:"STAT · Ultra-processed food warning-label bill clears Senate committee on bipartisan vote (Jul 24, 2026)", url:"https://www.statnews.com/2026/07/24/ultraprocessed-food-warning-label-bill-clears-senate-committee-bipartisan-vote/"},
      {label:"Cheese Reporter · Senate panel OKs bill to require warning labels on foods high in saturated fat, sodium (Jul 24, 2026)", url:"https://cheesereporter.com/news/policy-legislation/2026/07/24/senate-panel-oks-bill-to-require-warning-labels-on-foods-high-in-saturated-fat-sodium/"}
    ]
  },
  {
    id:"T-2",
    trend:"New research says it's damaged fat cells — not just extra fat — that drive diabetes and fatty-liver risk 🔬",
    detail:"University of Michigan research published Jul 26, 2026 found that when fat cells lose their ability to store lipids they trigger inflammation that sets up diabetes and fatty-liver disease — cellular dysfunction, not obesity alone. The takeaway for shoppers: metabolic health rides on the quality of what you eat, not just the quantity.",
    platform:"Nutrition-science press",
    views:"Metabolic-health cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS"
    ],
    healthSubAngle:"DIABETES",
    angle:"Original: whole-oat fiber and protein for steady energy, no spike-and-crash. A benefit-first carousel on why real food beats the sugar rollercoaster.",
    urgency:"THIS WEEK",
    sources:[
      {label:"ScienceDaily · University of Michigan fat-cell dysfunction study (Jul 26, 2026)", url:"https://www.sciencedaily.com/releases/2026/07/260726015259.htm"}
    ]
  },
  {
    id:"T-3",
    trend:"The seed-oil war is loud again — the canola and sunflower lobbies are publicly defending their oils as MAHA calls them poison 🌻",
    detail:"As of late July 2026 the canola and sunflower industries are pushing back on federal claims that seed oils 'poison' Americans, with officials favoring beef tallow and the debate spilling across food media. Whatever side wins, it keeps one question front-of-mind at the shelf: which oil is actually in this carton?",
    platform:"Ag + food trade press",
    views:"Seed-oil discourse cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    healthSubAngle:"HEART",
    angle:"Category-critique, no names: Original is seed-oil-free and Barista skips rapeseed and canola. A quiet Reel showing which oils are — and aren't — in the carton.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Agweek · Despite rhetoric, canola and sunflower industry say seed oils are still a healthy choice (Jul 27, 2026)", url:"https://www.agweek.com/crops/other-crops/despite-rhetoric-canola-and-sunflower-industry-say-seed-oils-are-still-a-healthy-choice"},
      {label:"National Law Review · Seed oil debate sparks consumer and industry concerns (permanent reference)", url:"https://natlawreview.com/article/study-projects-steep-price-increases-if-seed-oils-were-be-banned"}
    ]
  },
  {
    id:"T-4",
    trend:"A new trial found a daily dose of fiber cut arthritis pain and built strength — the case for fiber as an essential nutrient keeps growing 💪",
    detail:"A University of Nottingham trial reported Jul 24, 2026 found a daily fiber supplement measurably reduced knee-arthritis pain and improved strength, the latest sign fiber is being reclassified from nice-to-have to essential. Most people still eat roughly half the fiber they need — and most oat milks filter theirs out.",
    platform:"Nutrition-science press",
    views:"Fibermaxxing / longevity cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS"
    ],
    healthSubAngle:"GUT",
    angle:"Original: 2g+ prebiotic fiber the whole oat keeps in, not filters out. Tie the fiber-and-strength science to an easy daily pour, benefit-first.",
    urgency:"BACKGROUND",
    sources:[
      {label:"ScienceDaily · Daily fiber supplement reduced knee arthritis pain and improved strength (Jul 24, 2026)", url:"https://www.sciencedaily.com/releases/2026/07/260724061448.htm"},
      {label:"ScienceDaily · Nutrition News (permanent landing)", url:"https://www.sciencedaily.com/news/health_medicine/nutrition/"}
    ]
  },
  {
    id:"T-5",
    trend:"The synthetic-dye cleanup is reaching the cafeteria — the FDA pulled more petroleum-based colors as school and dairy programs commit to dropping artificial dye 🎨",
    detail:"On Jul 22, 2026 the FDA finalized removal of the color additive Orange B and moved to revoke Citrus Red No. 2 — its latest step phasing petroleum-based dyes out of the food supply, alongside the broader push to pull six synthetic dyes by 2027 and a dairy-industry commitment to remove artificial colors from school milk, cheese and yogurt for the 2026-27 school year. Clean color is becoming a school-food baseline, not a premium.",
    platform:"Federal food-policy press",
    views:"Dye-ban policy cycle",
    velocity:"medium",
    pillars:[
      "PARENTING",
      "HEALTH/WELLNESS"
    ],
    angle:"Kids leads: no dyes, real maple, top-9 allergen-free — the school-safe carton for the parent watching the dye headlines. Position it as the easy swap.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Akin (Eye on FDA) · FDA continues its food-dye cleanup — Orange B revoked, Citrus Red 2 next (Jul 22, 2026 action)", url:"https://www.akingump.com/en/insights/blogs/eye-on-fda/fda-continues-its-food-dye-cleanup"},
      {label:"IDFA · Healthy Dairy in Schools Commitment — removing certified artificial colors from school dairy (permanent reference)", url:"https://www.idfa.org/healthydairyinschools"}
    ]
  },
  {
    id:"T-6",
    trend:"Back-to-school lunchbox buying is tilting toward clean-label, allergen-conscious and functional — parents are reading tighter than ever 🎒",
    detail:"With back-to-school buying peaking mid-August 2026, the lunchbox aisle is being reshaped by clean-label, allergen-conscious and functional picks; a May 2026 survey of K-12 parents found 48% planning to buy nutrient bars, with non-GMO, individually-wrapped and simple formulations deciding the cart. Familiar staples still matter, but nutrition and label clarity now lead.",
    platform:"Retail + grocery trade press",
    views:"Back-to-school buying cycle",
    velocity:"medium",
    pillars:[
      "PARENTING"
    ],
    angle:"Kids: a gentle back-to-school seed — the clean, allergen-free pour for the lunchbox rethink. One calm morning-routine Reel, no full blitz yet.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Circana · Best in Class: What Circana's insights reveal about 2026 back-to-school trends (2026 report)", url:"https://www.circana.com/post/best-in-class-what-circana-s-insights-reveal-about-2026-back-to-school-trends"},
      {label:"Canadian Grocer · New labels, tighter budgets and functional claims are reshaping what families pack for school (2026)", url:"https://canadiangrocer.com/new-labels-tighter-budgets-and-functional-claims-are-reshaping-what-families-pack-school"}
    ]
  },
  {
    id:"T-7",
    trend:"Regenerative organic oats are scaling from farm to shelf — grown to rebuild soil and pull down carbon 🌱",
    detail:"The Regenerative Organic Certified system now spans nearly 20 million acres across 140-plus crops including oats, and a farmer-led organic oat mill is set to open in Minnesota in fall 2026. Oats grown to rebuild soil health and sequester carbon are becoming a shelf story shoppers can point to, not just a farm practice.",
    platform:"Sustainability + food trade press",
    views:"Regenerative-ag cycle",
    velocity:"medium",
    pillars:[
      "INGREDIENTS/RECIPES",
      "HEALTH/WELLNESS"
    ],
    angle:"Ingredients/heritage: climate-fighting organic oats, whole groat, zero food waste. A soil-to-carton Reel on oats that give back — own the sustainability POV.",
    urgency:"BACKGROUND",
    sources:[
      {label:"Regenerative Organic Alliance · Regenerative Organic Certified (permanent reference)", url:"https://regenerativeorganic.org"},
      {label:"WholeFoods Magazine · The State of Regenerative Agriculture (2026)", url:"https://www.wholefoodsmagazine.com/articles/17879-the-state-of-regenerative-agriculture"}
    ]
  },
  {
    id:"T-8",
    trend:"For Gen Alpha, plant-based is the default — 60-70% eat plant-forward meals weekly and are driving a protein-packed 'breakfast-for-lunch' shift 🥣",
    detail:"2026 school-food data shows 60-70% of Gen Alpha students eat plant-based meals weekly and are pushing menus toward protein-forward, breakfast-for-lunch builds like overnight oats and egg bowls. For this generation plant-based isn't the alternative — it's the normal.",
    platform:"K-12 foodservice trade press",
    views:"Gen Alpha food-trend cycle",
    velocity:"medium",
    pillars:[
      "PARENTING"
    ],
    angle:"Kids: 'the milk they already reach for.' Plant-based is the default now — pair Willa's Kids with a real protein breakfast-for-lunch build.",
    urgency:"BACKGROUND",
    sources:[
      {label:"The Food Institute · 5 Gen Alpha food trends to watch in 2026, per Chartwells K12 (2026)", url:"https://foodinstitute.com/focus/5-gen-alpha-food-trends-to-watch-in-2026-according-to-chartwells-k12/"},
      {label:"The National Provisioner · Protein-rich meals dominate kids' food trends in 2026 (2026)", url:"https://www.provisioneronline.com/articles/119867-protein-rich-meals-dominate-kids-food-trends-in-2026"}
    ]
  },
  {
    id:"T-9",
    trend:"The oat aisle is forking — novelty-flavor premiumization on one side, clean-ingredient authority on the other 🍿",
    detail:"Post-earnings in late July 2026, a category leader accelerated indulgent novelty barista flavors — Popcorn, Churros, Coconut — plus a matcha push as it repositioned as a 'full-on beverages company.' The split is now obvious: flavor-novelty velocity versus clean-ingredient credibility, and the mushy middle is getting squeezed.",
    platform:"Beverage + dairy trade press",
    views:"Category bifurcation",
    velocity:"high",
    pillars:[
      "INGREDIENTS/RECIPES",
      "REVIEWS/RECS"
    ],
    angle:"Barista is the anti-gimmick: don't chase novelty-flavor smoke — foam you can actually read, 50% less sugar than other barista oat milks. Plant the clean-flavor flag.",
    urgency:"THIS WEEK",
    sources:[
      {label:"Dairy Reporter · Oatly shifts to become a 'full-on' beverages company as revenues rise (Jul 27, 2026)", url:"https://www.dairyreporter.com/Article/2026/07/27/oatly-shifts-to-become-a-full-on-beverages-company-as-revenues-rise/"},
      {label:"The Plant Base · Industry roundtable: plant-based dairy trends for 2026 (permanent reference)", url:"https://www.theplantbasemag.com/news/industry-roundtable-plant-based-dairy-trends-for-2026"}
    ]
  }
];



const TICKER = [
  {agent:"trend", text:"logged the Senate advancing a bipartisan warning-label bill on ultra-processed foods — answered with the four-ingredients founder Reel: the shorter the list, the better it reads."},
  {agent:"comp", text:"clocked a category leader turning the oat aisle into a dessert cart — Popcorn, Churros, Coconut — countered with the Barista flag: foam you can actually read, 50% less sugar."},
  {agent:"hook", text:"wrote the hand-drawn-to-real bit — sketch oats, water, vanilla, sea salt, and each morphs into the real carton on the beat. four ingredients, drawn to life."},
  {agent:"pulse", text:"caught cloud coffee peaking on FoodTok — remixed it dairy-free on Willa's Barista, a whipped-oat float that holds instead of thinning the drink. no gums, real foam."},
  {agent:"pulse", text:"flagged the 'oat milk spikes like soda' clip recirculating — built the calm rebuttal: four ingredients, 1g sugar, the whole oat, no rapeseed. the label does the arguing."},
  {agent:"trend", text:"read the new metabolic science on damaged fat cells — cut the steady-energy carousel: it's the quality of what you eat, not the quantity, that beats the spike-and-crash."},
  {agent:"pulse", text:"clocked the Gummy Bear Mom middle-ground archetype — framed the no-drama morning pour: not restriction, not a sugar bomb, just the real one."},
  {agent:"trend", text:"tracked the FDA's dye cleanup reaching school food — staged the dye-free easy-swap pin: clean color is the cafeteria baseline now, and Willa's Kids started there."},
  {agent:"pulse", text:"spotted the tap-to-reveal format driving completion — hid the Kids carton under a sticker, one tap to reveal a Yuka 100. full transparency, algorithm-approved."},
  {agent:"editor", text:"rested the glyphosate lane despite fresh Supreme Court + study news — it ran BIG SWING two of the last three weeks; this week's fresh heat is the UPF bill and seed-oil science."},
  {agent:"pulse", text:"matched Joy Oladokun's 'Kind' to a slow sunlit pour — hands, carton, quiet morning. the mood carries it, the product stays soft."},
  {agent:"composer", text:"delivered 16 briefs for JUL 29 – AUG 2 — 3 BIG SWINGs, all four pillars, four ingredients leading every health beat."}
];


const COMPETITORS = [
  {
    id:"C-1",
    name:"Oatly",
    color:"#0F5C4B",
    status:"Post-earnings in late July 2026, Oatly leaned into indulgent novelty barista flavors — Popcorn, Churros, Coconut — plus a matcha push, repositioning as a 'full-on beverages company' as revenues rose (Jul 27, 2026).",
    direction:"up",
    opportunity:"Answer novelty with clarity: Barista is the anti-gimmick — 50% less sugar than other barista oat milks, no rapeseed. Own foam you can actually read.",
    sources:[
      {label:"Dairy Reporter · Oatly shifts to become a 'full-on' beverages company as revenues rise (Jul 27, 2026)", url:"https://www.dairyreporter.com/Article/2026/07/27/oatly-shifts-to-become-a-full-on-beverages-company-as-revenues-rise/"}
    ]
  },
  {
    id:"C-2",
    name:"Califia Farms",
    color:"#E4572E",
    status:"Califia keeps widening its Simple & Organic clean-label platform across milks and creamers, pushing 'simple' as a mainstream, multi-occasion positioning — the clearest sign 'clean label' has moved from niche claim to table stakes in the aisle.",
    direction:"flat",
    opportunity:"Simple isn't a claim, it's what's in the carton: four whole-oat ingredients, organic, glyphosate-free, mother-founded. Lead with the certs a platform can't copy.",
    sources:[
      {label:"Califia Farms · Simple & Organic clean-label platform (brand/press reference)", url:"https://www.prnewswire.com/news-releases/califia-farms-expands-simple--organic-portfolio-with-its-first-ever-soymilk-launch-302663570.html"}
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
    id:"JUL27-TT-6",
    platform:"TikTok",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Original",
    dnaPattern:"before-after-stitch",
    timing:"Sat Aug 1 · 10am",
    priority:"STANDARD",
    concept:"\"here's what we actually pour.\" — de-influenced real-morning stitch",
    intel:[
      {type:"PULSE", text:"De-influencing is winning — parent-creators are trading gloss for raw, un-filtered 'real morning' content, and the platforms are rewarding it (CP-7). LEAD with Willa's answer: Original is the un-staged carton — 4 ingredients, 1g sugar, whole oat. The honesty IS the format; the pour holds up without a ring light."},
      {type:"AUDIENCE", text:"Viewers are unfollowing the perfectly-lit morning-routine and saving the real one — a messy counter, natural light, a genuine pour. Meet them there: no props, no filter, just the carton that's actually on the counter. The relief of 'oh, that's my kitchen too' is the hook."},
      {type:"COMPETITOR", text:"Internal: the category leans on glossy, over-produced flavor-drop content to sell (C-1 context). Never name it on the surface — Willa's counter-move is authenticity, not a callout. A carton with 4 ingredients has nothing to hide behind a filter; let the raw morning be the flex."}
    ],
    hooks:[
      {text:"no ring light, no filter — just the pour we actually make.", recommended:true},
      {text:"de-influencing hit the kitchen. here's the carton that survives it.", recommended:false},
      {text:"4 ingredients don't need a filter.", recommended:false}
    ],
    caption:"the glossy morning routine is getting unfollowed. the real one's getting saved. 🌾\n\nno ring light, no perfectly-staged flatlay — just a real kitchen, a little chaos, and the carton that's actually on our counter. here's what we actually pour.\n\nWilla's Original, and the whole story fits on the label:\n· 4 ingredients (organic whole grain oats, filtered water, organic vanilla extract, sea salt)\n· 1g sugar · 4g+ protein · 2g+ prebiotic fiber\n· made from the whole oat groat — bran, germ, and all — not filtered down into oat syrup\n· certified glyphosate-free · USDA Organic · tested every lot\n\nthe un-staged morning was always the good one.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#deinfluencing",
      "#realmorning",
      "#cleaningredients",
      "#wholeoat",
      "#4ingredients",
      "#oatmilkreview",
      "#morningpour",
      "#plantbased"
    ],
    visual:"Deliberately un-polished and TikTok-native — the anti-glossy cut. Open on a parody of over-produced 'morning routine' content: ring light, a too-perfect matcha flatlay, staged linen, cool blue color grade. Hard whip-cut to a REAL kitchen — warm natural window light, a slightly cluttered counter, a dish or two in the sink, life happening off-frame. A parent-creator / ambassador on camera (UGC-style, NOT a founder-family member — no reliance on Christina or the cofounder), no makeup filter, gives the camera a knowing look. A single Willa's Original carton sits on the real counter (on screen 40%+ throughout). Hands pour Willa's Original into a plain everyday glass — no props, no styling. Bright text overlays snap in on the beat but stay simple, hand-typed energy. Color temp warm and true-to-life, not candy-graded; motion handheld, intimate, a little imperfect on purpose. End on the carton in the real morning light beside the poured glass.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Cold open on a parody-glossy 'morning routine': ring light glare, staged matcha flatlay, cool blue grade. Text overlay snaps in: 'the morning routine glow-up nobody asked for ✨'. Hard whip-cut on the beat to a real, warm-lit, slightly messy kitchen — parent-creator (UGC ambassador, on camera) gives a knowing look to lens."},
      {scene:"TURN", time:"3-6s", action:"Creator, no filter, reaches across a cluttered real counter and grabs a Willa's Original carton, label facing camera. Text overlay: 'here's what we actually pour.' Handheld, intimate."},
      {scene:"PROOF", time:"6-10s", action:"Close-up hands pour Willa's Original into a plain everyday glass on the real countertop — no styling. Stacked text overlays flick in one per beat: '4 ingredients' → '1g sugar' → 'the whole oat, not oat syrup'."},
      {scene:"PAYOFF", time:"10-13s", action:"Creator takes a genuine sip, shrugs at the camera, half-smile. Text overlay: 'no filter needed.' Lower-third wink: 'shhh… the messy morning was always the good one.'"},
      {scene:"END CARD", time:"13-16s", action:"Willa's Original carton rests on the real counter in warm morning light beside the poured glass. Benefit-shorthand stinger text lands: '4 ingredients. That's it.' Willa's logo lockup fades in, carton stays in frame."}
    ],
    audio:"Warm narrative voiceover, unhurried and honest, over a stripped-back lo-fi bed with a soft beat for the whip-cut. VO beats: 'the internet is finally over the ring-light morning… so here's the real one. no props, no filter — just the carton that's actually on our counter. four ingredients, one gram of sugar, the whole oat. the un-staged morning was always the good one.'",
    duration:"15-17 seconds",
    cta:{soft:"what's actually on your counter this morning?", medium:"meet the un-staged carton — Willa's Original.", strong:"pour the real thing — grab Willa's Original."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUL27-IG-R4",
    platform:"Instagram Reel",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Sat Aug 1 · 12pm",
    priority:"HIGH",
    concept:"\"not restriction, not a sugar bomb — just a real pour.\" — Gummy Bear Mom middle-ground",
    intel:[
      {type:"PULSE", text:"The 'Gummy Bear Mom' archetype is peaking as the balanced-parenting identity — the middle ground between restriction-mom and indulgence-mom, food as moderation, not a permission war (CP-6). LEAD with Willa's Kids as the answer, not the discourse: 8g protein, 6g sugar from real organic maple, top-9 allergen-free — the no-drama morning pour. Ride the archetype's energy but gently opt out of the strict-vs-fun binary; celebrate competence over optimization. Relatable Confession, kid-family-moment."},
      {type:"AUDIENCE", text:"The label-reading parent is exhausted by the online scorekeeping — strict mom, fun mom, are-you-doing-it-wrong. She isn't looking for permission or a manifesto; she wants a morning that just works. A calm kid-at-the-table moment that quietly says 'you can skip the debate and still pour something good' lands as relief, not another rule — and it's the tender, un-preachy register her feed is short on."},
      {type:"COMPETITOR", text:"Internal only: most kids' oat/plant drinks force the exact false choice this archetype is reacting to — heavily sweetened cane-sugar options on one side, thin low-sugar pours with little protein on the other. Willa's Kids sits in the real middle (8g protein, 6g maple sugar, plant DHA + calcium, allergen-free). Never name a brand or run a comparison on the surface; let the calm and the numbers carry it."}
    ],
    hooks:[
      {text:"skip the strict-mom vs fun-mom thing. pour the one that's actually good.", recommended:true},
      {text:"the calmest thing on the breakfast table isn't strict or indulgent — it's just real.", recommended:false},
      {text:"you don't have to pick a parenting side at 7am. you just have to pour.", recommended:false}
    ],
    caption:"Willa's Kids is the no-drama morning pour — 8g protein, 6g sugar from real organic maple, and free of the top 9 allergens. 🐻🥛\n\nThere's a whole debate online about what kind of parent you are — the strict one or the fun one. We'll gently opt out. Breakfast isn't a permission war; it's just a good pour. Not restriction, not a sugar bomb — just a real pour.\n\nWilla's Kids keeps the whole entire oat for a rich, smooth taste with more protein and fiber per cup, plus plant-based DHA and calcium. Same protein as dairy, less sugar, and a label short enough to actually read.\n\nThe calm morning isn't a parenting flex. It's just breakfast, done right.\n\nNourish the spark in everyone.",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#kidsnutrition",
      "#allergenfree",
      "#top9free",
      "#momsofinstagram",
      "#realfoodkids",
      "#8gprotein",
      "#nodramamorning"
    ],
    visual:"Bright, warm, trend-forward kid-family-moment Reel — sunlit real kitchen, cream-and-brown palette (#9E652E parenting accents), light-wood table, morning light through a window. A parent-creator (ambassador/UGC talent — not Willa's founder family) sits at the table with her kid mid-ordinary-morning — no styling-perfect flat-lay, de-influenced/un-polished register per the week's real-morning mood. The Willa's Kids carton is in frame from the first second and holds 40%+ across the video (on the table, then poured). Warm, unhurried Relatable-Confession energy — she's not lecturing to camera, she's just living the calm morning while the on-screen text does the confession. Kid pours their own glass; she sips her coffee. Text overlays in a simple sans, navy on cream, sentence case. No scorecards, no red 'strict/fun' graphics beyond one light playful title card that gets waved off. End on the carton beside two glasses, back label catching the light. Partake/Lovebird parent-first warmth, Olipop-light wit.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Warm medium shot: parent-creator at a sunlit kitchen table, coffee in hand, gives a small knowing shrug as a playful title card floats up — 'strict mom or fun mom?' — and she waves it off. Text overlay (sentence case, lower third): 'skip the strict-mom vs fun-mom thing.' Real-morning, un-polished feel."},
      {scene:"THE POUR", time:"3-8s", action:"Cut to close-up: the kid picks up the Willa's Kids carton and pours their own glass at the table, carton label facing camera. Text overlay: 'pour the one that’s actually good.' Small tag lower corner: 'Willa’s Kids · 8g protein · 6g sugar (real maple).' Natural, unstaged."},
      {scene:"THE MIDDLE GROUND", time:"8-13s", action:"Two quick beats side by side then dismissed: a fast overlay 'not restriction' over a stark empty plate, then 'not a sugar bomb' over a candy-bright glass — both swipe away to reveal the real glass of Willa’s Kids on the table. Text overlay lands: 'just a real pour.' Parent-creator and kid clink glass-to-coffee-mug, easy laugh."},
      {scene:"THE RECEIPTS", time:"13-18s", action:"Cut to overhead of the carton with three calm badge stamps appearing: 'top-9 allergen-free' / 'plant DHA + calcium' / 'same protein as dairy, less sugar.' Text overlay: 'the no-drama morning.' Keep it matter-of-fact, no alarm graphics."},
      {scene:"END CARD", time:"18-22s", action:"Static hero: Willa’s Kids carton beside two glasses in morning light, kid’s hand still on the table. End-card stinger text (BS-3): '8g protein. 6g sugar. top-9 allergen-free. just breakfast, done right.' Small brand mark bottom center."}
    ],
    audio:"On-camera dialogue + light ambient kitchen sound — parent-creator (ambassador/UGC talent, not Willa's family), warm and matter-of-fact, grandma-at-the-table calm (never preachy, never combative). One easy laugh with the kid. Soft, de-influenced lo-fi bed low under the room tone so the real-morning feel carries; no loud trending drop over the dialogue. Not framed as founder-to-audience.",
    duration:"18-22 seconds",
    cta:{soft:"save this for the next time the internet tells you you’re doing breakfast wrong.", medium:"skip the debate — pour the one with 8g protein and a label you can read.", strong:"make the calm morning the easy one: Willa’s Kids, 8g protein, 6g sugar, top-9 allergen-free."},
    benefitShorthandId:"BS-3"
  },
  {
    id:"JUL27-IG-F2",
    platform:"IG Feed",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Multi",
    dnaPattern:"at-shelf-moment",
    timing:"Sat Aug 1 · 6pm",
    priority:"STANDARD",
    concept:"\"simple isn't our new direction — it's our whole ingredient list.\" — own-the-standard at-shelf carousel",
    intel:[
      {type:"TREND", text:"T-1: the Senate's move to put FDA warning labels on ultra-processed foods reframes 'processed' around what's actually in the ingredient list — pushing 'simple/clean' from a marketing claim toward a standard. LEAD with Willa's answer, not the policy: Willa's has been four whole-oat ingredients, organic and certified glyphosate-free since day one, so 'simple' was never a pivot here — it's the original recipe. Policy/market context stays INTERNAL; no trade-press or market framing appears in the caption. The consumer beat is quiet confidence: we've stood here the whole time."},
      {type:"AUDIENCE", text:"The label-literate REVIEWS/RECS shopper who has watched every brand suddenly discover the word 'simple' and wants to know which one actually means it. She's not moved by a short front-of-pack claim anymore — she's looking for the proof that's hard to fake. 'You can shrink an ingredient list, but you can't clone who made it or how it's grown' is exactly the receipt she'll screenshot: organic, glyphosate-free, mother-founded — the uncopyable stack."},
      {type:"COMPETITOR", text:"Internal (C-2, never on the surface): a category peer keeps widening a 'Simple & Organic' clean-label platform, pushing 'simple' as a mainstream multi-occasion play. Per the 2026-05-04 fact-check note, just-clean-label is no longer a Willa's-only stance; many peers have had simple SKUs for 1-2+ years. So DON'T frame this as 'the category just caught up' — press only the levers that ARE Willa's-only: organic + Detox Project glyphosate-free + WBENC mother-founded + whole oat groat. Never name a competitor."}
    ],
    hooks:[
      {text:"everyone's chasing 'simple' now. Willa's has been four whole-oat ingredients the whole time.", recommended:true},
      {text:"you can shrink an ingredient list. you can't clone who made it — or how it's grown.", recommended:false},
      {text:"organic. glyphosate-free. mother-founded. the parts a short front label can't copy.", recommended:false}
    ],
    caption:"Four whole-oat ingredients. Organic. Certified glyphosate-free. Mother-founded. That was never a reformulation — it's the recipe grandmother Willa passed down, on the shelf since day one.\n\nsimple isn't our new direction — it's our whole ingredient list.\n\nA short list is easy to print on a front-of-pack. The parts that actually take work are harder to copy: oats grown certified glyphosate-free and tested every lot, the whole oat groat kept in — bran, germ and all — instead of processed oat syrup, and a women-owned, WBENC-certified brand a mother built.\n\nSo while 'simple' becomes everyone's favorite word, Willa's is just standing where it started. Original, Barista, Kids, Chocolate — the same standard across the whole lineup.\n\nNourish the spark in everyone.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#cleanlabel",
      "#glyphosatefree",
      "#motherfounded",
      "#wbenc",
      "#womenowned",
      "#realfood"
    ],
    visual:"Bright, editorial static carousel with an at-shelf-moment soul — Willa's photographed like it lives in a real cooler, framed like a magazine spread, not stock. Warm cream and soft daylight with purple (#A191B2) REVIEWS/RECS accents and navy ink (#202A44) type; wordplay text-joke overlays carry the humor. Slide 1 (the hook): the full Willa's lineup — Original, Barista, Kids, Chocolate — lined up on a clean shelf edge, big navy type overhead reading 'everyone's chasing simple.' with a small purple asterisk. Slide 2: same lineup, the asterisk pays off — overlay flips to 'Willa's has been simple since ingredient one.' with a hand reaching in to lift one carton off the shelf. Slide 3: extreme close-up of a single back label, the short four-line list fully legible, purple checkmark overlays ticking 'organic ✓ · glyphosate-free, tested every lot ✓ · whole oat groat ✓ · WBENC mother-founded ✓' — the uncopyable stack. Slide 4 (payoff): the four cartons hero on soft cream with the stinger line 'simple isn't our new direction — it's our whole ingredient list.' and the tagline. Every slide bright, uncluttered, screenshot-friendly; cartons fill 40%+ of each key frame. No talent on camera — hands + product + shelf only.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"next time a carton claims 'simple,' look for who's behind it. Willa's has been organic, glyphosate-free and mother-founded since day one.", medium:"four whole-oat ingredients, organic, glyphosate-free, mother-founded — the standard across the lineup.", strong:"meet the whole lineup — Original, Barista, Kids, Chocolate — certified organic + glyphosate-free."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUL27-IG-R5",
    platform:"Instagram Reel",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Multi",
    dnaPattern:"before-after-stitch",
    timing:"Sun Aug 2 · 12pm",
    priority:"STANDARD",
    concept:"\"some mornings don't need to be optimized — just poured.\" — slow-morning audio stitch",
    intel:[
      {type:"PULSE", text:"Joy Oladokun released the introspective single 'Kind' on Jul 24, 2026 — lush, soulful, slow-kitchen-morning energy ahead of her fall album — and it's the exact unhurried mood the heritage, real-food-passed-down pocket Willa's lives in (CP-9). The move: use 'Kind' as the audio bed for a before/after pour stitch — the frantic 'optimized' morning (timers, powders, phone) cuts to a quiet sunlit pour, hands and carton only. Willa's stays soft; the mood carries it, and the whole oat is the thing that doesn't need optimizing. World-Context Tie-In, before-after-stitch."},
      {type:"AUDIENCE", text:"Her feed is a wall of five-step morning routines, greens powders and wellness-optimization pressure, and she's quietly tired of it. A slow, un-optimized pour set to a song she's just discovering reads as permission to exhale — feel-good, not another rule. She'll save it for the mood, re-share it for the song, and register the carton as the calm choice without being sold to."},
      {type:"COMPETITOR", text:"Internal only: the category keeps bolting on functional add-ons and novelty flavors to sound like more — more protein blends, more powders, more steps. Willa's counter is subtraction: the whole oat already does the work, so the morning doesn't need engineering. Never name a brand or run a comparison on the surface; let the calm and the short label carry the contrast."}
    ],
    hooks:[
      {text:"the optimized morning can wait. this one's just a pour.", recommended:true},
      {text:"before the timers and the greens powder — there was just this.", recommended:false},
      {text:"no five-step routine. just a good carton and better light.", recommended:false}
    ],
    caption:"Some mornings don't ask you to optimize anything. 🌾🥛\n\nThe feed is full of five-step routines, powders and timers — and some mornings don't need to be optimized, just poured. Willa's uses the whole entire oat (bran, germ and all, not just the starch) for a rich, smooth taste with less sugar and more protein and fiber per cup, so the good part is already handled before you're even awake.\n\nNo blends to stack. No steps to nail. Just real food, passed down, in a carton with a label short enough to read half-asleep.\n\nPour slow. Let the morning be kind.\n\nNourish the spark in everyone.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#wholeoat",
      "#slowmorning",
      "#organicoatmilk",
      "#realfood",
      "#morningritual",
      "#cleaningredients",
      "#oatmilkreel",
      "#nourishthespark"
    ],
    visual:"Bright-but-soft, trend-forward before-after-stitch Reel — NO talent on camera (hands + product + kitchen only, respecting the Christina on-camera cap). Cream-and-purple palette (#A191B2 REVIEWS/RECS accents), warm morning light through a window, light-wood counter. FIRST HALF (the 'before'): quick, slightly-too-fast cuts of an 'optimized' morning — a phone timer, a scoop of green powder tapped into a shaker, a cluttered counter, a hand rubbing a tired eye; cooler, busier, over-stepped. On the song's turn it CUTS to the SECOND HALF (the 'after'): everything slows, the light goes golden, and a single hand pours Willa's into a glass in one unhurried motion, steam-free, dreamy, un-optimized. Carton on screen 40%+ across the after-half (soft focus is fine — product stays gentle, the mood leads). De-influenced/real-morning register per the week's mood, not a styled flat-lay. Text overlays in a simple serif-adjacent sans, navy on cream, sentence case, sparing. End on the carton beside the poured glass in the light. Lana-Del-Rey-slow, heritage-kitchen energy; Partake warmth, no wink needed here — let it be tender.",
    script:[
      {scene:"HOOK · THE OPTIMIZED MORNING", time:"0-4s", action:"Fast, slightly-jittery cuts (cooler light): a phone timer starting, a green-powder scoop tapped into a shaker, a crowded counter, a hand pressing a tired eye. Joy Oladokun's 'Kind' plays soft underneath, still building. Text overlay (sentence case, lower third): 'the optimized morning can wait.' Busy, over-stepped energy on purpose."},
      {scene:"THE CUT", time:"4-7s", action:"On the song's turn, hard cut to stillness — the shaker set down, the phone flipped face-down. Light warms to golden. Everything slows to real-time. Text overlay fades in: 'this one's just a pour.' Let the frame breathe; the tempo drop is the whole beat."},
      {scene:"THE SLOW POUR", time:"7-13s", action:"Close-up, unhurried: a single hand lifts the Willa's carton and pours into a clear glass in one smooth motion, morning light catching the pour, carton label to camera and holding 40%+ of frame. No overlay for a beat — just the sound and the pour. Then soft text: 'some mornings don't need to be optimized — just poured.'"},
      {scene:"THE QUIET", time:"13-17s", action:"Wider soft-focus: the glass on the counter, hand resting beside it, window light, no rush. Small calm tag lower corner: 'whole oat · real food, passed down.' The carton stays in frame. Nothing happens on purpose — that's the payoff."},
      {scene:"END CARD", time:"17-20s", action:"Static hero: Willa's carton beside the poured glass in golden morning light, back label softly readable. End-card stinger text (BS-1): 'the whole oat. not the syrup.' below a small brand mark. Text overlay above: 'pour slow. let the morning be kind.'"}
    ],
    audio:"Joy Oladokun's 'Kind' (single released Jul 24, 2026) as the audio bed — no voiceover, let the song carry the mood. Structure the cut so the frantic 'before' half sits under the song's build and the slow pour lands on its softening turn. Light, near-silent kitchen foley (a set-down glass, the pour) barely under the track; nothing loud over the vocal.",
    duration:"18-20 seconds",
    cta:{soft:"save this for the mornings you don't feel like optimizing.", medium:"pour slow this weekend — one glass, better light, no five-step routine.", strong:"make the calm morning the easy one: whole oat, four ingredients, already handled."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUL27-TT-1",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Barista",
    dnaPattern:"at-shelf-moment",
    timing:"Wed Jul 29 · 10am",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"the aisle turned into a dessert cart. Willa's Barista just makes foam you can actually read.\" — anti-gimmick cafe flag",
    intel:[
      {type:"TREND", text:"The oat aisle is forking — novelty-flavor premiumization vs clean-ingredient authority (T-9). LEAD with Willa's answer: Barista is the anti-gimmick pour — 50% less sugar than other barista oat milks, no rapeseed. Plant the clean-flavor flag while the aisle chases dessert."},
      {type:"AUDIENCE", text:"Home-barista + coffee-tok viewers scrolling for the next cafe flavor drop are the exact crowd who quietly want a foam that performs without the sugar bomb — give them the calm, confident counter-order."},
      {type:"COMPETITOR", text:"Internal: a category leader accelerated Popcorn/Churros/Coconut novelty flavors post-earnings (C-1). Never name it on the surface — answer novelty with clarity, not a callout. Category-critique voice only."}
    ],
    hooks:[
      {text:"the oat aisle went full dessert cart — your latte didn't order dessert.", recommended:true},
      {text:"while the aisle races to churros-flavored foam, Willa's Barista just froths clean.", recommended:false},
      {text:"50% less sugar than other barista oat milks — and a foam that actually holds.", recommended:false}
    ],
    caption:"novelty flavors are having a moment. clean foam is having a career. ☕\n\nwhile the oat aisle races toward popcorn, churros, and coconut, Willa's Barista is holding the clean-cafe line. the aisle turned into a dessert cart. Willa's Barista just makes foam you can actually read.\n\nthe whole story, right on the label:\n· 50% less sugar than other barista oat milks (3g, from organic coconut sugar)\n· no rapeseed, no canola\n· 4g protein, froths dense and holds its shape without thinning your drink\n· certified glyphosate-free · USDA Organic · tested every lot\n\ngimmicks come and go. a clean latte is forever.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#baristaoatmilk",
      "#oatmilklatte",
      "#homebarista",
      "#coffeetok",
      "#lesssugar",
      "#cleaningredients",
      "#norapeseed",
      "#plantbased"
    ],
    visual:"Bright, high-key, TikTok-native with faster cuts than the IG cut. Open on a real grocery oat-milk shelf, sunlit, cartons crowded with loud novelty-flavor callouts (generic, no legible brands) — quick handheld push-in. Whip-cut to a clean home-cafe counter: warm morning light, marble or light-wood surface, a single Willa's Barista carton front and center (on screen 40%+ throughout). Hands only — pour Willa's Barista into a milk frother, then a slow dense stream of microfoam over espresso, foam holding a crisp peak. Bright text overlays snap in on the beat. End on the carton beside a finished latte with clean latte art. Color temp warm-neutral, saturated but not candy-bright; motion energetic, confident, a little cheeky.",
    script:[
      {scene:"HOOK", time:"0-2s", action:"Handheld push-in on a crowded, sunlit oat-milk grocery shelf packed with loud dessert-flavor cartons (generic, no legible logos). Text overlay snaps in: 'the oat aisle went full dessert cart 🍿🍩'. Hard whip-cut out on the beat."},
      {scene:"TURN", time:"2-5s", action:"Cut to clean home-cafe counter, warm light. Hand sets a single Willa's Barista carton down, label facing camera. Text overlay: 'your latte didn't order dessert.' Camera holds tight on the carton."},
      {scene:"PROOF", time:"5-9s", action:"Overhead: hand pours Willa's Barista into a handheld frother, quick spin, dense microfoam rises. Stacked text overlays flick in one per beat: '50% less sugar than other barista oat milks' → 'no rapeseed' → '4g protein'."},
      {scene:"PAYOFF", time:"9-13s", action:"Slow-motion close-up: thick foam streams over espresso and holds a crisp peak, doesn't thin the drink. Text overlay: 'foam you can actually read.' Small wink caption lower-third: 'shhh… clean was never a gimmick.'"},
      {scene:"END CARD", time:"13-16s", action:"Hands slide the finished latte with clean art next to the Willa's Barista carton. Benefit-shorthand stinger text lands: 'Latte art. No rapeseed oil.' Willa's logo lockup fades in, carton stays in frame."}
    ],
    audio:"Warm narrative voiceover, dry-witty and confident, over an upbeat lo-fi hip-hop bed with a clean beat for the whip-cuts. VO beats: 'the oat aisle turned into a dessert cart… your coffee just wants a clean pour. dense foam, half the sugar, no rapeseed. gimmicks come and go — a clean latte is forever.'",
    duration:"15-17 seconds",
    cta:{soft:"what flavor is your oat milk actually chasing?", medium:"meet the barista pour that skips the gimmicks — Willa's Barista.", strong:"pour a clean cafe latte at home — grab Willa's Barista."},
    benefitShorthandId:"BS-7"
  },
  {
    id:"JUL27-IG-R1",
    platform:"Instagram Reel",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Wed Jul 29 · 12pm",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"they're warning-labeling the long lists — we kept ours to four lines you can pronounce.\" — UPF warning-label founder answer",
    intel:[
      {type:"TREND", text:"T-1: On Jul 24, 2026 the Senate health committee advanced a bipartisan bill (12-10) requiring FDA warning labels on ultra-processed foods high in sugar, salt and saturated fat. LEAD with Willa's answer, not the policy: Willa's Original is already four organic ingredients you can read on a spoon — the warning-label news is the calm backdrop that proves the point, never the alarm. Willa's specific stance (4 ingredients · organic · whole oat) lands in the first beat."},
      {type:"AUDIENCE", text:"The label-reading shopper who saw the 'warning labels on ultra-processed foods' headline and thought about the 20-line cartons in her own fridge. She's not looking for fear — she wants the reassurance of a carton that would never need the label. 'Four lines you can pronounce' is exactly the calm she's scanning for while everything else on the shelf braces for a warning."},
      {type:"COMPETITOR", text:"Internal: most oat milks run 11-14 ingredients — gums, oils, phosphates, an enzymatic oat-syrup process that filters out the fiber AND protein, then processes the starch into sugar. Those are the decks a UPF warning framework is built to flag. Willa's four-ingredient whole-oat deck is structurally on the safe side of that line. Keep the surface to Willa's own list; never name a competitor."}
    ],
    hooks:[
      {text:"when they start warning-labeling the long lists, i'll be over here with four ingredients.", recommended:true},
      {text:"the government is about to flag the 20-line cartons. ours fits on a spoon.", recommended:false},
      {text:"read a carton you'd never have to slap a warning on: organic whole oats, water, vanilla, sea salt.", recommended:false}
    ],
    caption:"Willa's Original is four ingredients you can pronounce — organic whole grain oats, filtered water, organic vanilla, sea salt. That's the whole list. No gums, no oils, no oat syrup.\n\nHere's the backdrop: on Jul 24 a bipartisan Senate committee advanced a bill to put FDA warning labels on ultra-processed foods high in sugar, salt and fat. The kind of labels built for the 14-ingredient cartons, not the 4-ingredient one.\n\nWe didn't reformulate to get here. Willa's uses the whole oat — bran, germ and all — so the fiber and protein stay in and the sugar stays low. 1g sugar. 4g+ protein. 2g+ prebiotic fiber. Certified organic, glyphosate-free, tested every lot.\n\nThey're warning-labeling the long lists — we kept ours to four lines you can pronounce.\n\nNourish the spark in everyone.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#cleanlabel",
      "#ultraprocessed",
      "#UPF",
      "#realfood",
      "#fouringredients",
      "#labelcheck",
      "#wholeoat"
    ],
    visual:"Bright, calm, trend-forward kitchen — warm cream palette with creamy-blue (#73B2C9) accents and navy ink (#202A44) typography. This is a reserved Christina-on-camera slot: founder-POV activist, so she's present and speaking, but the carton still fills 40%+ of the key frames. Open on Christina in her own sunlit kitchen, Willa's Original in hand, relaxed and direct-to-camera — no lab coat, no fear, just steady confidence (Patagonia gravity, not a warning siren). She flips the carton to the back and lets the camera hold on the 4-line ingredient list. The 'backdrop' beat is a single plain cream text card — quiet, unalarmed, no red — stating the Senate warning-label news matter-of-factly with a small source note. Return to Christina + a clean pour of Willa's Original, whole-oat creaminess catching the light. End card: carton hero on cream with the stinger. Keep every frame bright, warm and readable — the activist energy is in the calm, not the alarm.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Christina, direct-to-camera in a sunlit kitchen, holds up the Willa's Original carton with a small knowing smile. She says the line; on-screen text mirrors it (navy on cream): 'when they start warning-labeling the long lists, i'll be over here with four ingredients.' Soft warm piano begins."},
      {scene:"THE FOUR LINES", time:"3-9s", action:"Close-up as Christina's hand flips the carton to the back; finger traces the 4-line ingredient list. Overlay stamps one line at a time: 'organic whole oats · filtered water · organic vanilla · sea salt.' Then: 'that's the whole list.'"},
      {scene:"THE BACKDROP", time:"9-14s", action:"Cut to a plain cream text card, calm typography (no alarm, no red): 'Jul 24 — the Senate advanced a bill for FDA warning labels on ultra-processed foods.' Small source line bottom-left: 'STAT, Jul 24.' Hold, quiet."},
      {scene:"THE ANSWER", time:"14-19s", action:"Back to warmth: Christina pours Willa's Original into a glass, creamy and whole-oat-rich, half-frame carton. Overlay: 'we kept the whole oat. 1g sugar · 4g protein · 2g fiber.'"},
      {scene:"END CARD", time:"19-22s", action:"Carton hero on soft cream. Overlay resolves the stinger: 'Four ingredients. (Read 'em.)' beat, then the tagline: 'Nourish the spark in everyone.'"}
    ],
    audio:"Founder voiceover — Christina, calm and matter-of-fact activist register with zero alarm; the confidence is in the steadiness, not the volume. Lo-fi warm piano bed underneath. She's on camera, so the VO matches her visible delivery.",
    duration:"20-22 seconds",
    cta:{soft:"flip a carton — count the lines. that's the whole test.", medium:"the carton that would never need the warning: four organic ingredients, whole oat.", strong:"pour Willa's Original — four ingredients, 1g sugar, certified organic + glyphosate-free."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUL27-TT-2",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Wed Jul 29 · 7pm",
    priority:"HIGH",
    concept:"\"oat milk isn't soda. Willa's Original keeps the whole oat to prove it.\" — calm misinfo rebuttal",
    intel:[
      {type:"PULSE", text:"The 'oat milk spikes your blood sugar like soda' claim is recirculating on FoodTok and fact-checkers keep rating the soda comparison misleading (CP-5). LEAD with Willa's answer, not the fear: Original keeps the whole oat, so the fiber that steadies blood sugar stays in — 1g sugar, four ingredients, no rapeseed. Calm receipts beat a loud clip."},
      {type:"AUDIENCE", text:"Health-scanning shoppers and label-reading parents watch one alarmist clip and second-guess a staple they already trust. They don't want a lecture — they want the carton held up so they can decide for themselves. Matter-of-fact authority converts; combative defensiveness doesn't."},
      {type:"COMPETITOR", text:"Internal only: most oat milks filter out both the fiber AND the protein, then process the starch into sugar — which is exactly the formula the 'it's basically soda' clip is reacting to. Never name a competitor on the surface; let the whole-oat contrast do the work."}
    ],
    hooks:[
      {text:"one viral clip says oat milk 'spikes like soda.' the whole oat says otherwise.", recommended:true},
      {text:"before you dump your oat milk over one TikTok clip — meet the whole oat that's actually in it.", recommended:false},
      {text:"'oat milk raises your blood sugar like Coca-Cola'? not this one, and here's why.", recommended:false}
    ],
    caption:"No, oat milk doesn't spike your blood sugar like soda. Willa's Original is four ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt — with 1g sugar and no rapeseed. Most oat milks filter out both the fiber AND the protein, then process the starch into sugar. Willa's keeps the whole oat, so the fiber that steadies blood sugar stays right where it belongs. Oat milk isn't soda. Willa's Original keeps the whole oat to prove it. Certified organic. Certified glyphosate-free. Tested every lot. The whole oat does the arguing — not the algorithm. 🌾",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#wholeplant",
      "#wholeoat",
      "#1gsugar",
      "#glyphosatefree",
      "#organicoatmilk",
      "#bloodsugar",
      "#nutritionmyths",
      "#cleaningredients"
    ],
    visual:"Bright, warm daylight kitchen — near-white counter, a real bowl of dry oats and the Willa's Original carton in frame from the first second (carton holds 40%+ of the frame across the video). People-on-Camera substitute (Christina is reserved this week, at cap): the cofounder-sister sits calmly at the kitchen table, matter-of-fact, grandma-at-the-table register — never combative, no finger-wagging. Fast, clean TikTok cuts between her at the table, a close-up of whole oat groats being poured, and a slow pour of Willa's Original into a glass. Text overlays in a simple sans, high-contrast navy on cream. No alarmist red, no scare graphics — the calm IS the message. End on the carton, front label facing camera, morning light.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Medium shot: cofounder-sister at a sunlit kitchen table, holding her phone, gives a small unbothered head-shake to camera. Text overlay: 'one viral clip says oat milk \"spikes like soda.\"' Hard cut on the last word."},
      {scene:"THE CLAIM", time:"3-7s", action:"Cut to close-up: cofounder-sister sets the Willa's Original carton on the table, front label facing camera. Text overlay: 'the claim: oat milk spikes blood sugar like soda. the truth: not this one.' Quick zoom on 'not this one.'"},
      {scene:"THE PROOF", time:"7-13s", action:"Close-up of a real bowl of dry oats, then a slow pour of Willa's Original into a glass. She (on camera, calm) says the line while overlay reads: 'most oat milks filter out the fiber AND protein, then turn the starch into sugar. Willa's keeps the whole oat.' Cut to the fiber/whole-oat visual — groats in hand."},
      {scene:"THE RECEIPTS", time:"13-18s", action:"Cut to three quick badge stamps over the carton: 'organic' / 'glyphosate-free · tested every lot' / 'no rapeseed.' Text overlay: 'oat milk isn't soda.' She lifts the carton toward camera, unbothered half-smile."},
      {scene:"END CARD", time:"18-22s", action:"Static hero: Willa's Original carton, front label facing camera, morning light. End-card stinger text (BS-1): '1g sugar. 4 ingredients. the whole oat, still whole.' Small brand mark bottom center."}
    ],
    audio:"On-camera dialogue, cofounder-sister — warm, matter-of-fact, grandma-at-the-table calm (never combative). Low ambient kitchen sound under the talking; no trending-audio overlay so the receipts land clean. Not framed as founder-to-audience.",
    duration:"20-22 seconds",
    cta:{soft:"next time a clip tells you oat milk is 'basically soda,' remember what's actually in the carton: the whole oat.", medium:"the whole oat steadies blood sugar. most oat milks strip it out. Willa's Original doesn't.", strong:"swap to the oat milk that keeps the whole oat: Willa's Original, 1g sugar, four ingredients."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"JUL27-TT-3",
    platform:"TikTok",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"on-pack-checklist",
    timing:"Thu Jul 30 · 10am",
    priority:"HIGH",
    concept:"\"tap to see the score — spoiler: it's a perfect 100.\" — tap-to-reveal Yuka format",
    intel:[
      {type:"PULSE", text:"The tap-to-reveal sticker format is driving high completion + rewatch on Reels (CP-4). Lead with Willa's proof: cover the Kids carton, one tap reveals a perfect Yuka 100/100 — the payload IS the transparency, not the fear."},
      {type:"AUDIENCE", text:"Parents reading the dye + clean-label headlines want a fast, trustworthy read on a kids' drink — a third-party score they don't have to take on faith. The tap makes the viewer the one who uncovers it, so the proof lands as discovery, not a claim."},
      {type:"COMPETITOR", text:"Internal: peers keep widening their 'simple / organic' clean-label lines (C-2), but a perfect third-party score stacked with top-9-allergen-free is a Willa's-only proof stack. Never name them on the surface."}
    ],
    hooks:[
      {text:"tap to see what this kids' carton scores 👆", recommended:true},
      {text:"a kids' drink that scores a perfect 100? tap it.", recommended:false},
      {text:"cover the carton. tap the sticker. see the score.", recommended:false}
    ],
    caption:"One tap. A perfect 100. 🎯\n\nWilla's Kids just scored 100 out of 100 on Yuka — the Clean Label App that scans your groceries and scores every ingredient 0 to 100. Tap to see the score — spoiler: it's a perfect 100.\n\nHere's what earns it:\n🌾 8g protein — same as dairy, half the sugar\n🍁 6g sugar, from real organic maple (nothing weird)\n🧬 plant-based DHA + calcium\n🚫 free of the top 9 allergens — no nut, soy, gluten, dairy, sesame\n\nThe perfect score isn't the point. It's proof of what's actually in the carton. Nourish the spark in everyone.\n\n— Willa's Kids 🥛",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#cleanlabel",
      "#yuka",
      "#labelcheck",
      "#top9allergenfree",
      "#kidssnacks",
      "#momsoftiktok",
      "#dairyfree"
    ],
    visual:"Bright, trend-forward, TikTok-native. Sunlit clean kitchen counter, warm daylight, punchy color. Open cold on the Willa's Kids carton centered and filling ~50% of frame, with a playful die-cut 'tap 👆' sticker physically covering the front label — the interactive tap-to-reveal setup. Hands-and-product only, no talent on camera. Fast, on-beat cuts. The money moment is the sticker peeling off on the beat drop to reveal a clean Yuka '100/100 · EXCELLENT' result graphic sitting over the carton. Follow with quick macro passes across the back label (a finger tracing the protein / sugar / allergen lines) and a sunlit pour into a kid's glass. End on the carton hero with the BS-8 stinger stamped in. Keep it snappy, satisfying, and legible on a phone at arm's length.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Locked overhead-ish close-up, bright counter. Willa's Kids carton centered, front label hidden under a round cartoon 'tap 👆' sticker. Text overlay (top): 'tap to see this carton's score'. Trending tap-to-reveal audio starts."},
      {scene:"BUILD", time:"3-6s", action:"Slow push-in. A hand enters frame, fingertip hovers over the sticker, teasing the tap. Text overlay: 'one tap. full transparency.' Anticipation beat before the drop."},
      {scene:"REVEAL", time:"6-10s", action:"On the beat drop, finger taps — sticker peels and flies off, snap zoom to a clean Yuka scan-result graphic overlaid on the carton reading '100 / 100 · EXCELLENT'. Text overlay: 'Yuka: 100 out of 100 ✅ (the app that scores groceries 0–100)'."},
      {scene:"PROOF", time:"10-15s", action:"Fast cuts across the back label, finger tracing each line as stamped text overlays hit: '8g protein', '6g sugar · real maple', 'top-9 allergen-free', 'plant-based DHA'. Macro, crisp, on-beat."},
      {scene:"PAYOFF", time:"15-19s", action:"Sunlit morning pour — Willa's Kids into a kid's glass, a small hand reaching for it. Text overlay: 'the score is just the proof.'"},
      {scene:"END CARD", time:"19-21s", action:"Carton hero back on the bright counter, gentle settle. BS-8 stinger text: 'Yuka says 100 out of 100.' Willa's logo lower-third."}
    ],
    audio:"Warm narrative voiceover over an upbeat, trending tap-to-reveal audio bed; punchy on-beat sting at the sticker-peel reveal.",
    duration:"19-21 seconds",
    cta:{soft:"scan your kids' drink on Yuka and see what it says.", medium:"find Willa's Kids in the fridge aisle — the carton that scores a perfect 100.", strong:"swap the mystery carton for the one that scores 100 out of 100."},
    benefitShorthandId:"BS-8"
  },
  {
    id:"JUL27-IG-R2",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Barista",
    dnaPattern:"viral-recipe-remix",
    timing:"Thu Jul 30 · 12pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"a coffee cloud that actually holds — real whipped oat, no gums.\" — dairy-free cloud coffee",
    intel:[
      {type:"PULSE", text:"CP-1: cloud coffee — a coconut-water iced americano under a thick whipped-oat float — is peaking across TikTok with millions of recreations, and the whole drink lives or dies on whether that float holds. Willa's Barista is the answer: it whips into a real, dense foam with no gums, so the cloud sits on top instead of thinning the drink. viral-recipe-remix, riding a format already doing the reach work."},
      {type:"AUDIENCE", text:"She's scrolled cloud coffee a dozen times and half the recreations collapse into a beige puddle. Give her the dairy-free build that actually works — whip cold Willa's Barista into a float that holds — and she screenshots it, makes it Saturday, and tags the friend who kept sending her the trend."},
      {type:"COMPETITOR", text:"Internal: category barista blends lean on gums and stabilizers to fake a stable foam, and the novelty-flavor arms race is chasing the same viral drinks. Willa's doesn't need an additive to hold the cloud — the whole-oat Barista foams on its own. Keep the surface to the drink + the whip; never name a brand."}
    ],
    hooks:[
      {text:"let's make cloud coffee (dairy-free!)", recommended:true},
      {text:"cloud coffee — but the whipped top actually holds", recommended:false},
      {text:"the dairy-free cloud coffee where the oat float never thins the drink", recommended:false}
    ],
    caption:"Cloud coffee is all over the feed — and the whole thing lives or dies on whether that whipped top actually holds. ☁️☕ Here's the dairy-free build: a coffee cloud that actually holds — real whipped oat, no gums — floating over an iced coconut-water americano.\n\nWilla's Barista is made with the whole entire oat and simple organic ingredients — it froths into a real, dense foam with 50% less sugar than other barista oat milks and no rapeseed oil, so the cloud stays thick instead of thinning your drink. 🥛\n\nIngredients:\n- ¾ cup Willa's Barista, cold\n- 1 cup coconut water\n- 1–2 shots espresso (or ½ cup strong cold brew)\n- ice\n- optional: 1 tsp maple syrup\n\nFill a glass with ice, pour in the coconut water and espresso for the americano. Whip the cold Willa's Barista (milk frother or blender) until it holds soft peaks, then spoon the cloud on top. Sip straight through the float.\n\nPlants, finally done right.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#cloudcoffee",
      "#dairyfreecoffee",
      "#coconutwater",
      "#icedcoffee",
      "#baristaoatmilk",
      "#organicoatmilk",
      "#dairyfree",
      "#coffeetok"
    ],
    visual:"Bright, trend-forward recipe Reel — warm sunlit kitchen, cream-and-green palette (#75C596 accents), marble or light-wood counter, a tall clear glass so the layers read. NO talent; hands + product + kitchen only. Carton on screen 40%+: the Willa's Barista carton stays visible beside the glass the whole time. Opening on-screen text 'let's make cloud coffee (dairy-free!)' in clean sentence case, lower third. Overhead + macro cuts: coconut water and a dark espresso shot pouring over crackling ice, the cold Barista whipping in a jar into glossy soft peaks, the thick oat cloud spooned on top and sitting proud on the surface, a slow straw-pull through the float that shows it holds instead of collapsing. Editorial-but-real, Poppi/Graza chill-FoodTok energy — movement, light, no dairy in sight. End card: the finished glass beside the carton with the benefit stinger text.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Overhead macro: hands set a tall glass of iced coffee crowned with a dense whipped-oat cloud next to the Willa's Barista carton on a sunlit counter. Text overlay (sentence case, lower third): 'let's make cloud coffee (dairy-free!)'. Quick whip-pan to the counter mise-en-place."},
      {scene:"BUILD THE AMERICANO", time:"3-9s", action:"Macro slow-pour: coconut water streams over crackling ice in a clear glass, then a dark espresso shot pours in and blooms through the coconut water. Barista carton held in frame beside the glass. Text overlay: 'coconut water + espresso = the americano'. Soft foley on the pour."},
      {scene:"WHIP THE CLOUD", time:"9-15s", action:"Close-up: cold Willa's Barista pours into a small jar; a handheld frother spins it into glossy, thickening soft peaks that pull up into a real cloud. Text overlay: 'whip Willa's Barista into a real cloud — no gums'. Satisfying froth-rise reveal."},
      {scene:"THE FLOAT THAT HOLDS", time:"15-20s", action:"Overhead: a spoon lifts the thick oat cloud and lays it over the iced americano — it sits high on the surface and holds instead of sinking. Text overlay: 'the float that holds — it never thins the drink'. Slow push-in on the layered glass."},
      {scene:"SIP + END CARD", time:"20-24s", action:"Macro: a straw pulls down through the cloud into the dark coffee below, dragging a clean ribbon that proves the float is stable. Cut to the finished glass beside the carton. End-card text overlay (benefit stinger): 'Latte art. No rapeseed oil.' Willa's Barista carton centered."}
    ],
    audio:"Warm narrative voiceover over a lo-fi, chill kitchen beat — unhurried, cheeky-calm. VO leads with the payoff ('cloud coffee, dairy-free — and the float actually holds'), then walks the three moves: build the americano, whip the cloud, spoon it on. Light foley on the pour, the whip, the straw-pull.",
    duration:"22-24 seconds",
    cta:{soft:"save this for the next time cloud coffee crosses your feed.", medium:"make the dairy-free cloud coffee — whip Willa's Barista into a float that actually holds.", strong:"build it on Willa's Barista — real dense foam, no gums, no rapeseed, 50% less sugar than other barista oat milks."},
    benefitShorthandId:"BS-7"
  },
  {
    id:"JUL27-IG-R3",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Thu Jul 30 · 6pm",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"draw every ingredient in your oat milk — we only needed four.\" — hand-drawn-to-real meme",
    intel:[
      {type:"PULSE", text:"CP-3: the hand-drawn-to-real transition — creators sketch an object that morphs into the real thing on the beat drop, paired with the trending 'Colette' audio — is peaking on Reels + TikTok and rewards a slow reveal with a clean payoff. Willa's payload writes itself: the whole ingredient list is only four things to draw (organic whole grain oats, filtered water, organic vanilla extract, sea salt), and each sketch becomes the real Original carton. The short list IS the joke and the proof. Format-as-Virality, meme-payload."},
      {type:"AUDIENCE", text:"She's seen the sketch-to-real format all over her feed this week and she reads ingredient lists at the shelf. Watching four quick drawings finish an entire oat-milk recipe lands the 'wait, that's all that's in it?' beat faster than any nutrition graphic — satisfying to watch, instantly re-shareable, and it makes the four-ingredient story feel like a flex instead of a lecture."},
      {type:"COMPETITOR", text:"Internal: the aisle keeps stacking longer novelty-flavor decks even as policy (T-1, the Senate warning-label move) reframes 'processed' around the ingredient list itself. The average oat milk would need a dozen-plus sketches — water, oils, gums, added sugars, stabilizers. Willa's needs four. Never name a brand or show a competitor list; let the shortness of Willa's own draw carry the contrast."}
    ],
    hooks:[
      {text:"draw every ingredient in your oat milk. (we'll wait.)", recommended:true},
      {text:"sketching the whole recipe — it's a four-drawing job.", recommended:false},
      {text:"the entire ingredient list, one pencil stroke at a time.", recommended:false}
    ],
    caption:"Four sketches. Four ingredients. One carton you can actually read. ✏️🥛\n\nHere's the whole recipe for Willa's Original, drawn one line at a time: organic whole grain oats, filtered water, organic vanilla extract, sea salt. That's it — draw every ingredient in your oat milk, we only needed four.\n\nMost oat milks would take a whole lot more pencil — water, oils, gums, added sugars. Willa's uses the whole entire oat (bran, germ and all, not just the starch) for a rich, smooth taste with less sugar and more protein and fiber per cup. So the drawing's done before it even gets complicated.\n\nWhole oat. 1g sugar. 4g+ protein. 2g+ fiber. Nothing you'd need a second page to sketch.\n\nNourish the spark in everyone.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#wholeoat",
      "#fouringredients",
      "#organicoatmilk",
      "#cleaningredients",
      "#readtheingredients",
      "#sketchtoreality",
      "#oatmilkreel",
      "#realfood"
    ],
    visual:"Bright, trend-forward meme Reel riding the hand-drawn-to-real transition. NO talent on camera — sunlit clean kitchen, cream-and-green palette (#75C596 accents), light-wood or marble counter. A hand-drawn white sketch overlay sits on an empty countertop; on each beat of the 'Colette' audio the sketch morphs into the real ingredient, then all four resolve into the real Willa's Original carton, which holds screen 40%+ through the payoff. Satisfying, unhurried pacing — the reveal is the whole point, so let each morph breathe. Pencil-line overlays should look genuinely sketched (slight wobble, cross-hatch), and the sketch-to-real cut lands exactly on the beat. Opening on-screen text 'draw every ingredient in your oat milk. (we'll wait.)' in clean sentence case, lower third. Editorial-but-real, Graza/Fishwife design-wit energy. End card: the four ingredients labeled around the real carton, benefit stinger text. Steam-free, dreamy, high-completion.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Static overhead on an empty sunlit counter. A white hand-drawn sketch outline of an oat-milk carton scribbles itself into frame (fast pencil animation). Text overlay (sentence case, lower third): 'draw every ingredient in your oat milk. (we'll wait.)'. 'Colette' audio starts under it. Hold on the beat."},
      {scene:"SKETCH 1 · OATS", time:"3-6s", action:"Close-up: a hand-drawn sketch of oat groats appears on the counter. On the beat drop, the sketch morphs into real whole oat groats spilling into frame. Small text tag: '1 · organic whole grain oats'. Clean sketch-to-real transition on the swell."},
      {scene:"SKETCH 2 · WATER", time:"6-9s", action:"A sketched water droplet / stream draws in beside the oats; on the next beat it morphs into a real pour of filtered water catching the light. Text tag: '2 · filtered water'. Keep the reveal slow and satisfying."},
      {scene:"SKETCH 3 + 4 · VANILLA + SALT", time:"9-13s", action:"Two quick sketches land back to back — a vanilla pod, then a pinch of salt — each morphing into the real thing on consecutive beats (vanilla extract dropper, flaky sea salt raining down). Text tags: '3 · organic vanilla extract' then '4 · sea salt'. The counter now holds all four real ingredients."},
      {scene:"PAYOFF + END CARD", time:"13-18s", action:"The four ingredients slide together and the last sketch — the carton outline from the hook — morphs into the REAL Willa's Original carton, centered. The four labels arc around it. Text overlay lands on the final beat: 'that was the whole list.' End-card benefit stinger below: 'whole oat · 1g sugar · 4g+ protein · four ingredients you could draw.'"}
    ],
    audio:"Trending 'Colette' audio (the orchestral hand-drawn-to-real transition sound peaking on Reels + TikTok) as the bed — no voiceover. Cut each sketch-to-real morph exactly on the beat/swell so the reveals hit in rhythm. Light pencil-scratch and soft pour/salt foley layered under the track.",
    duration:"15-18 seconds",
    cta:{soft:"save this next time you're reading an oat-milk label.", medium:"try the format — sketch your carton's ingredient list and see how many drawings it takes.", strong:"four ingredients, whole oat, 1g sugar — the shortest draw in the aisle is Willa's Original."},
    benefitShorthandId:"BS-4"
  },
  {
    id:"JUL27-TT-4",
    platform:"TikTok",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Fri Jul 31 · 10am",
    priority:"STANDARD",
    concept:"\"the protein breakfast that actually reads clean.\" — dairy-free breakfast-taco remix",
    intel:[
      {type:"PULSE", text:"High-protein breakfast tacos with cottage-cheese-and-egg shells crossed 1M+ views as a morning-protein build parents can actually make (CP-2). Willa's answer leads: rebuild the shell dairy-free with Kite Hill and pour Willa's Kids alongside — 8g protein, top-9 allergen-free, a breakfast a kid actually finishes."},
      {type:"AUDIENCE", text:"Parents saving every protein-breakfast build want the morning win without the dairy their kid's stomach fights back on — hand them a shell that reads clean and a pour that does the protein work, so the save turns into a Tuesday they can repeat."},
      {type:"COMPETITOR", text:"Internal: kids' RTD peers lean on oat syrup (3g protein) or cane sugar (9g) to chase the same protein halo (Kids sub-lane context). Never name them on the surface — win on the label, not the callout: 8g protein, 6g sugar from maple, no top-9 allergens."}
    ],
    hooks:[
      {text:"the viral high-protein breakfast taco, rebuilt dairy-free — 8g protein your kid actually eats.", recommended:true},
      {text:"protein breakfast without the cottage-cheese tummy ache — here's the clean-shell version.", recommended:false},
      {text:"you saved the protein taco. then you clocked the dairy shell. we fixed it.", recommended:false}
    ],
    caption:"protein breakfast tacos are all over the feed — here's the version that passes the label check. 🌮\n\nWilla's Kids does the heavy lifting: 8g protein (same as dairy), 6g sugar from real maple, DHA, and top-9 allergen-free. the shell gets rebuilt dairy-free, the pour goes right beside it — the protein breakfast that actually reads clean.\n\nno tummy-ache dairy, no sugar bomb, and a real plate: protein + grain + something green + a drink your kid asks for by name.\n\nIngredients:\n- 2 eggs, whisked with 1/4 cup Kite Hill dairy-free cottage cheese (this is the shell)\n- 1 small tortilla, warmed\n- 1/4 avocado, sliced\n- a scramble of 1 more egg for the top\n- 1 glass of Willa's Kids Oat Milk, poured alongside\n- flaky salt to finish\n\nthe morning win you can actually repeat on a Tuesday.",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#highprotein",
      "#proteinbreakfast",
      "#dairyfree",
      "#kidsnacks",
      "#allergenfree",
      "#momsoftiktok",
      "#breakfasttacos"
    ],
    visual:"Bright, high-key, TikTok-native with fast, appetizing cuts. Warm sunlit kitchen counter, light wood or marble, real-morning feel (de-influenced, lived-in, not styled-stiff). Hands-forward build: whisk eggs with Kite Hill dairy-free cottage cheese, pour into a hot pan and swirl a thin protein 'shell,' pile on scrambled egg + avocado, fold into a taco. A Willa's Kids carton stays in frame throughout (on screen 40%+) with a poured glass beside the plate. Optional: a kid's hands reach in at the end to grab the taco and the glass — real kid-family-moment energy, no adult talent to camera. Snappy text overlays land on the beat, warm-neutral color, saturated-not-candy. Close on the plate + full glass + carton, morning light catching the foam on the pour.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Overhead, bright counter: hands crack 2 eggs into a bowl and spoon in Kite Hill dairy-free cottage cheese. Whisk fast. Text overlay snaps in: 'the viral protein breakfast taco — rebuilt dairy-free 🌮'. Willa's Kids carton visible top of frame."},
      {scene:"BUILD", time:"3-8s", action:"Cut to a hot nonstick pan: pour the egg-and-cottage-cheese mix, swirl thin, it sets into a golden protein 'shell.' Quick whip-cut. Text overlay: 'the shell IS the protein.' Hands lift the shell with a spatula, steam rising."},
      {scene:"PROOF", time:"8-13s", action:"Fill the shell with soft scrambled egg + sliced avocado, fold into a taco on a plate. Hand pours Willa's Kids into a glass beside it, slow creamy stream. Stacked overlays flick in one per beat: '8g protein' -> 'top-9 allergen-free' -> '6g sugar, from maple'."},
      {scene:"PAYOFF", time:"13-18s", action:"A kid's hands reach into frame, grab the taco, then the glass, and take a bite/sip (no face to camera needed). Text overlay: 'the protein breakfast that actually reads clean.' Small wink lower-third: 'shhh… no tummy-ache dairy.'"},
      {scene:"END CARD", time:"18-21s", action:"Clean plate + empty-ish glass + Willa's Kids carton in warm light. Benefit-shorthand stinger lands: 'Same protein as dairy. Half the sugar.' Willa's logo lockup fades in, carton holds in frame."}
    ],
    audio:"Warm narrative voiceover, easy and confident (no founder, no first-person parenting), over a chill lo-fi breakfast beat. VO beats: 'the protein breakfast taco everyone's saving? the shell's usually dairy. rebuild it clean — eggs, dairy-free cottage cheese, avocado — and pour the protein alongside. 8 grams, half the sugar of dairy, nothing on the top-9 list. the morning win you can actually repeat.'",
    duration:"20-22 seconds",
    cta:{soft:"what's the one breakfast your kid never leaves on the plate?", medium:"rebuild the viral protein taco clean — pour Willa's Kids alongside.", strong:"grab Willa's Kids and make the protein breakfast that actually reads clean."},
    benefitShorthandId:"BS-5"
  },
  {
    id:"JUL27-IG-F1",
    platform:"IG Feed",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Fri Jul 31 · 11am",
    priority:"HIGH",
    concept:"\"steady energy isn't a hack — it's just the whole oat doing its job.\" — quality-over-quantity carousel",
    intel:[
      {type:"TREND", text:"T-2: University of Michigan research (Jul 26, 2026) found damaged, dysfunctional fat cells — not just carrying more fat — are what trigger the inflammation behind diabetes and fatty-liver risk. That's evidence that CELL-LEVEL QUALITY matters for metabolic health; Willa's editorial connection (not the study's own claim): what you put in your body matters as much as how much. LEAD with Willa's answer, not the study: Willa's Original is whole-oat fiber + protein built for steady energy, 1g sugar, no spike-and-crash. Willa's specific stance (whole oat · 1g sugar · 4g protein · 2g fiber) lands in the first beat; the research stays INTERNAL framing — no trade-press citation in the caption body."},
      {type:"AUDIENCE", text:"The metabolic-health-curious shopper who keeps hearing that 'quality matters more than quantity' and is tired of feeds that turn every food into a math problem. She doesn't want to eat less — she wants a morning pour that keeps her even instead of spiking her at 10am. 'Steady energy isn't a hack' is exactly the permission-not-punishment framing she'll screenshot: real food, no restriction, no crash."},
      {type:"COMPETITOR", text:"Internal: most oat milks filter out both the fiber AND the protein, then process the leftover starch into sugar — the exact profile that spikes and crashes. Their higher-sugar, stripped-oat decks are what a 'quality over quantity' metabolic story quietly indicts. Willa's whole-oat groat (bran, germ and all) keeps the fiber and protein in and the sugar at 1g, so it sits on the steady side of that line. Keep the surface to Willa's own numbers; never name a competitor."}
    ],
    hooks:[
      {text:"steady all morning beats spiking at 10am — that's the whole oat's whole point.", recommended:true},
      {text:"your body reads the quality of what you eat, not just the quantity. so does this label.", recommended:false},
      {text:"1g sugar · 4g protein · 2g fiber — the pour built to skip the spike-and-crash.", recommended:false}
    ],
    caption:"Metabolic health rides on the quality of what you eat — not just the quantity. Willa's Original is built for the steady lane: 1g sugar, 4g+ protein, 2g+ prebiotic fiber, four organic ingredients.\n\nMost oat milks filter out both the fiber AND the protein, then process the leftover starch into sugar. Willa's keeps the whole oat groat — bran, germ and all — so the fiber and protein stay in and your energy stays even. No spike, no 10am crash.\n\nSteady energy isn't a hack — it's just the whole oat doing its job.\n\nThis isn't about eating less. It's about a real-food pour that carries you to lunch. Certified organic, glyphosate-free, tested every lot.\n\nNourish the spark in everyone.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#steadyenergy",
      "#bloodsugarbalance",
      "#cleanlabel",
      "#realfood",
      "#fiberandprotein",
      "#labelcheck"
    ],
    visual:"Bright, trend-forward static carousel — warm cream backdrop with creamy-blue (#73B2C9) accents and navy ink (#202A44) type. On-pack-checklist energy: the carton is the hero and the proof sits in clean checkmark overlays. Slide 1 (the hook): Willa's Original carton centered on cream, big navy type 'steady beats spiky' beside a simple hand-drawn line-graph doodle — a jagged spike line vs a smooth even line, the smooth one in creamy blue. Slide 2: overhead of the carton plus a poured glass, hand in frame, checklist overlay ticking '1g sugar ✓ · 4g+ protein ✓ · 2g+ prebiotic fiber ✓ · 4 organic ingredients ✓.' Slide 3: extreme close-up of the back label, all four lines legible, overlay 'the whole oat — bran, germ and all — kept in.' Slide 4 (payoff): carton hero on soft cream with the stinger line and the tagline. Keep every slide bright, uncluttered and screenshot-friendly; the carton fills 40%+ of each key frame. No talent on camera — hands + product + kitchen only.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"steady or spiky? check what your morning pour is really doing.", medium:"the whole-oat pour built for even energy: 1g sugar, 4g protein, 2g fiber.", strong:"pour Willa's Original — whole oat, four organic ingredients, certified organic + glyphosate-free."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUL27-TT-5",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Fri Jul 31 · 7pm",
    priority:"STANDARD",
    concept:"\"pick a side in the seed-oil war — Willa's Original didn't even show up.\" — seed-oil-war category critique",
    intel:[
      {type:"TREND", text:"The seed-oil argument is loud across the feed again as the canola and sunflower camps publicly defend their oils (T-3). Lead with Willa's answer: Original is four ingredients with no oil at all, so there's no side to pick — the carton already settled it. Stay calm and category-level, never pick a political side."},
      {type:"AUDIENCE", text:"Shoppers watching the seed-oil back-and-forth don't want a verdict — they want proof that at least one carton skipped the fight entirely. The move that lands is a visual absence: line the oils up side by side, then leave them out of the shot. A clean four-ingredient carton is the relief valve on a tiring debate."},
      {type:"COMPETITOR", text:"Internal: most category barista blends still carry rapeseed / canola, and a leading peer is chasing novelty flavors over substance (C-1). Willa's Original skips oil entirely and Barista skips rapeseed and canola — a whole-oat clean-oil stance. Never name a competitor on the surface; category-critique only."}
    ],
    hooks:[
      {text:"everyone's picking a side in the seed-oil war. Willa's Original isn't playing — there's no oil in it at all. 🌻", recommended:true},
      {text:"canola, sunflower, or none of the above? Willa's Original picked none.", recommended:false},
      {text:"the seed-oil war needs two sides. our four ingredients don't have a horse in it.", recommended:false}
    ],
    caption:"Canola camp. Sunflower camp. Pick a side — or don't. 🌻\n\nWilla's Original isn't in the seed-oil fight at all: organic whole grain oats, filtered water, organic vanilla, sea salt. No oil, period. Pick a side in the seed-oil war — Willa's Original didn't even show up.\n\n🌾 whole oat groat — bran, germ and all, not oat syrup\n💧 1g sugar, 4g+ protein, 2g+ prebiotic fiber\n🚫 no gums, no fillers, no seed oil in Original\n☕ and Barista skips rapeseed + canola too — real high-oleic sunflower oil, nothing industrial\n\nFour ingredients you can pronounce. That's the whole argument. Nourish the spark in everyone.\n\n— Willa's Original 🥛",
    hashtags:[
      "#willas",
      "#willasoriginal",
      "#oatmilk",
      "#seedoilfree",
      "#cleaningredients",
      "#fouringredients",
      "#plantmilk",
      "#organic",
      "#whatsinit",
      "#realfood"
    ],
    visual:"Bright, trend-forward, TikTok-native but deliberately calm — the quiet counter-move to a loud online fight. Sunlit clean kitchen counter, warm daylight, soft punchy color. Hands-and-product only, no talent on camera. Open on two generic, unbranded cooking-oil bottles (canola-style, sunflower-style — no brand call-outs) set on the counter like they're squaring off. A hand sets the Willa's Original carton down between them, front label to camera, then slides both bottles out of frame — leaving just the carton. Quick ingredient-line graphic stamps in the four real ingredients as the only 'oil' explanation needed. Cut to a soft sunlit pour into a clear glass. Keep cuts unhurried and legible at arm's length — the flex is simplicity, not volume. End on the carton hero with the BS-2 stinger stamped in.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Bright counter, hands only. Two generic cooking-oil bottles (canola-style, sunflower-style, no brand labels) sit facing off like opponents. Text overlay (top): 'everyone's picking a side in the seed-oil war.' Calm, dry audio tone."},
      {scene:"TURN", time:"3-7s", action:"Same hand sets the Willa's Original carton down between the two bottles, front label to camera. Text overlay: 'Willa's Original didn't even show up.' The answer arrives second, not last."},
      {scene:"PAYLOAD", time:"7-12s", action:"Hand slides both oil bottles out of frame, leaving just the carton centered. Overlay stamps in: 'organic whole grain oats · filtered water · organic vanilla · sea salt.' No oil line to add."},
      {scene:"PROOF", time:"12-16s", action:"Quick graphic card, fast and crisp: '1g sugar · 4g+ protein · 2g+ prebiotic fiber · 0 oil.'"},
      {scene:"PAYOFF", time:"16-20s", action:"Soft sunlit pour of Willa's Original into a clear glass, steady and unhurried. Text overlay: 'no matter who wins the fight, our answer's the same.'"},
      {scene:"END CARD", time:"20-23s", action:"Carton hero back on the bright counter, gentle settle. BS-2 stinger text: 'Four ingredients. Zero oil.' Willa's logo lower-third."}
    ],
    audio:"Warm narrative voiceover over a mellow, slightly wry lo-fi bed — deliberately calm against the online noise; soft settle sting on the carton reveal.",
    duration:"20-23 seconds",
    cta:{soft:"curious what's really in your oat milk? Willa's Original keeps it to four ingredients — no oil, period.", medium:"find Willa's Original in the fridge aisle — the carton that skipped the seed-oil fight entirely.", strong:"skip the seed-oil debate — pour the four-ingredient carton with zero oil instead."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"JUL27-PIN-1",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Chocolate",
    dnaPattern:"viral-recipe-remix",
    timing:"Thu Jul 30 · any",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"rich enough to be a splurge, clean enough it doesn't need to hide.\" — dairy-free mousse remix",
    intel:[
      {type:"TREND", text:"T-9: Internal category read — the oat aisle is forking, with a category leader accelerating indulgent novelty barista flavors and repositioning as a 'full-on beverages company' (late July 2026). Trade-press framing stays INTERNAL. Consumer story leads with the carton, never the category math: Willa's counters the novelty-premiumization wave with indulgent-remade-CLEAN — a genuinely fancy dairy-free chocolate mousse built from Willa's Chocolate (real cacao, 5 readable ingredients, Good Food Awards winner). The splurge IS the proof; the carton is a visible hero in-frame. Chocolate is the flavor-role match for indulgent-remade-healthy."},
      {type:"AUDIENCE", text:"She's watching the shelf get louder — churro, popcorn, coconut novelty flavors chasing her attention — and she wants a treat she doesn't have to feel weird about serving. A dairy-free chocolate mousse she can actually screenshot and make at home gives her the fancy-dessert moment without the sugar-bomb regret. Pinterest is exactly where she saves the 'better version' of the indulgence she already loves."},
      {type:"COMPETITOR", text:"Internal: the category's loudest move right now is stacking indulgent novelty flavors on top of the same long, processed ingredient decks. Willa's answer isn't a gimmick flavor — it's real cacao and the whole oat, proof you can literally taste in a dessert. Keep the surface to the recipe + Willa's own carton; never name a competitor."}
    ],
    hooks:[
      {text:"let's make chocolate mousse (dairy-free!)", recommended:true},
      {text:"a fancy chocolate mousse made from five ingredients and real cacao — no dairy.", recommended:false},
      {text:"the indulgent dessert built from a carton you'd actually want to keep.", recommended:false}
    ],
    caption:"Craving something rich and a little fancy without the sugar crash? This dairy-free chocolate mousse is silky, deep, and made with real cacao — rich enough to be a splurge, clean enough it doesn't need to hide. 🍫✨\n\nWilla's Chocolate Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, creamy taste with real cacao, less sugar, and more protein and fiber per cup — perfect for dairy-free mousse, bakes, and anything you want indulgent but clean. 🥛\n\nIngredients\n- 1 cup Willa's Chocolate Organic Oat Milk\n- 1 can coconut cream, chilled overnight\n- 6 oz dairy-free dark chocolate, melted\n- 2 tbsp maple syrup, to taste\n- 1 tsp vanilla extract\n- pinch of sea salt\n- cacao powder + shaved dark chocolate, to finish\n\nNourish the spark in everyone.",
    hashtags:[
      "#willas",
      "#willaschocolate",
      "#chocolatemousse",
      "#dairyfreedessert",
      "#realcacao",
      "#oatmilk",
      "#cleanlabel",
      "#goodfoodawards",
      "#dairyfree",
      "#labelcheck"
    ],
    visual:"Static Pinterest pin (2:3 vertical), bright and appetite-forward — a save-worthy dessert pin. Warm cream background (#FAFAF7) with cocoa-brown and green (#75C596) accents, navy ink (#202A44) typography. The finished dairy-free chocolate mousse is the styled hero, spooned into two small glass jars, glossy and dense, with a dusting of cacao and shaved dark chocolate on top — AND the Willa's Chocolate carton stands right beside it, unmistakably in-frame at 40%+ (passes the visual-competition test: carton is a co-hero, never cropped out). A spoon pulls through one jar to show the airy texture. Bold sentence-case wordplay headline across the top: 'let's make chocolate mousse (dairy-free!)'. Small zinger strip lower third: 'rich enough to be a splurge, clean enough it doesn't need to hide.' Tiny proof cluster tucked in a corner — 'real cacao · 5 ingredients · Good Food Awards' with a small Yuka 94/100 badge. No talent needed; hands optional for the spoon-pull. Sources footnoted small. Screenshot-worthy, Pinterest-SEO-friendly recipe energy.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this one — dessert that still reads clean.", medium:"make the dairy-free mousse: Willa's Chocolate, coconut cream, real cacao.", strong:"pour Willa's Chocolate — real cacao, 5 ingredients, Good Food Awards winner — and whip the mousse."},
    benefitShorthandId:"BS-4"
  },
  {
    id:"JUL27-PIN-2",
    platform:"Pinterest",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"at-shelf-moment",
    timing:"Fri Jul 31 · any",
    priority:"STANDARD",
    concept:"\"clean color isn't the upgrade anymore — it's the baseline.\" — dye-ban easy-swap pin",
    intel:[
      {type:"TREND", text:"T-5: the FDA is advancing its synthetic-dye cleanup (finalizing removal of Orange B and moving to revoke Citrus Red 2 on Jul 22, 2026) while the dairy industry pledges to pull artificial colors from school milk, cheese and yogurt for the 2026-27 school year. LEAD with Willa's answer, not the policy: Willa's Kids has always poured clean — no synthetic dyes, real organic maple instead of coloring, top-9 allergen-free — the easy swap already on the shelf, years ahead of the deadline. Frame clean color as the new school-food baseline, not a premium; the dye cleanup is the calm backdrop that proves the carton was early."},
      {type:"AUDIENCE", text:"The parent who's been watching the food-dye headlines and starting to eye the lunchbox aisle with back-to-school a few weeks out. She isn't looking for fear — she wants the shortcut: which carton already passes whatever her state's cafeteria will eventually require. 'No synthetic dyes, real maple, top-9 allergen-free' is the reassurance she saves to a board and buys on the next run. This is a green-shoot pin — it seeds the lunchbox-rethink audience now and keeps working as evergreen back-to-school SEO."},
      {type:"COMPETITOR", text:"Internal: many kids' RTD milks lean on added color or coloring agents and carry cane or rice syrup for sweetness; the dye-ban wave is exactly the pressure a synthetic-color deck feels as state effective dates approach. Willa's Kids uses organic maple for both sweetness and its natural color and holds a top-9-allergen-free formula — structurally on the safe side of the line years ahead of the 2027 deadlines states are setting. Keep the surface to Willa's own carton; never name a competitor."}
    ],
    hooks:[
      {text:"the whole cafeteria is going dye-free. Willa's Kids started there.", recommended:true},
      {text:"no synthetic dyes, real maple, top-9 allergen-free — the school-safe pour.", recommended:false},
      {text:"clean color used to be the upgrade. now it's the assignment.", recommended:false}
    ],
    caption:"The school-safe carton doesn't need a dye ban to catch up to it. 🎨 Willa's Kids has always poured clean — no synthetic dyes, real organic maple instead of coloring, and free of all top-9 allergens.\n\nHere's the backdrop: the FDA is phasing petroleum-based dyes out of the food supply, and the dairy industry has pledged to pull artificial colors from school milk, cheese and yogurt for the coming school year. Clean color is quietly becoming the school-food baseline.\n\nSo it's an easy swap for the lunchbox rethink — 8g protein, 6g sugar from real maple, plant-based DHA, and a perfect 100/100 on the Yuka Clean Label App (it scans groceries and scores the ingredients 0-100). The only color in this carton is oat and maple.\n\nclean color isn't the upgrade anymore — it's the baseline.",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#dyefree",
      "#nosyntheticdyes",
      "#schoolsafe",
      "#allergenfree",
      "#cleanlabel",
      "#lunchbox",
      "#backtoschool"
    ],
    visual:"Bright, editorial Pinterest pin (vertical 2:3), warm cream palette with the Parenting brown (#9E652E) and navy ink (#202A44) typography — trend-forward, not muted brand-stock. Aesthetic IRL Encounter: the Willa's Kids carton photographed like a real morning, not a studio setup — on a sunlit kitchen counter beside a packed, ready-to-go lunchbox (a real, kid-friendly lunch: whole fruit, a simple sandwich, a snack), soft daylight, a little intentional school-morning clutter kept pretty. Carton is the hero, filling 40%+ of the frame, label facing forward, natural cream-and-maple color doing the work. One clean typographic wordplay overlay set against the pack (navy on cream, uncluttered): 'real maple. no Red 40.' with a small secondary line underneath: 'no synthetic dyes · top-9 allergen-free · Yuka 100.' Let the carton design carry it — no busy graphics, no alarm energy. The whole frame should read like a screenshot a parent would actually save to a back-to-school board.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this to the back-to-school board — the dye-free pour that's already on the shelf.", medium:"the school-safe swap: Willa's Kids — no synthetic dyes, real maple, top-9 allergen-free.", strong:"pour Willa's Kids — no synthetic dyes, 8g protein, 6g sugar from real maple, Yuka 100/100."},
    benefitShorthandId:"BS-7"
  },
  {
    id:"JUL27-PIN-3",
    platform:"Pinterest",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Sun Aug 2 · any",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"for this crew, plant-based was never the alternative — it's just the milk.\" — Gen Alpha protein-jar pin",
    intel:[
      {type:"TREND", text:"T-8: For Gen Alpha, plant-based is the default — school-food data shows 60-70% eat plant-forward meals weekly and are pushing menus toward protein-forward 'breakfast-for-lunch' builds like overnight oats. LEAD with Willa's answer, not the trend read: Willa's Kids is the milk they already reach for — 8g protein for a real breakfast-for-lunch build that actually fills them up. Green-shoot / forward-bet: normalize plant-based as the default, not the alternative, for the generation growing up with it — an evergreen recipe-search pin, not tied to a single calendar moment. Kids is the flavor-role match (family + protein + crossover)."},
      {type:"AUDIENCE", text:"The parent who's noticed her kids don't think of oat milk as a substitute — it's just what they pour. She wants a real breakfast that travels to the midday meal and actually fills them up, and she saves the 'protein version' of a jar she can prep the night before for a busy week. This is a green-shoot pin: normalize plant-based as the default for this generation, and it keeps working as an evergreen recipe-search save."},
      {type:"COMPETITOR", text:"Internal: many kids' RTD milks lean on cane or rice syrup and lower protein, positioning as a dairy alternative rather than the default pour. Willa's Kids carries 8g protein (matching dairy), 6g sugar from real organic maple, plant-based DHA, and a top-9 allergen-free formula — built to BE the milk kids reach for, not the swap they tolerate. Keep the surface to Willa's own carton + the build; never name a competitor."}
    ],
    hooks:[
      {text:"the protein breakfast they'll actually finish — poured from the milk they already reach for.", recommended:true},
      {text:"for this generation, plant-based isn't the alternative. it's just breakfast.", recommended:false},
      {text:"8g protein, top-9 allergen-free, and already their favorite — the breakfast-for-lunch jar.", recommended:false}
    ],
    caption:"Ask this generation what 'plant-based' means and you'll get a shrug — for them it was never the alternative, it's just the milk they already reach for. 🥣 Willa's Kids makes that easy: 8g protein for a real breakfast-for-lunch build (breakfast foods packed for the midday meal) that actually keeps them full till the next one.\n\nWilla's Kids Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, more protein and fiber per cup, real organic maple instead of coloring, plant-based DHA, and a top-9 allergen-free label. 🥛\n\nMake it a breakfast-for-lunch overnight-oats jar:\n- 1 cup Willa's Kids Organic Oat Milk\n- 1/2 cup rolled oats\n- 1 tbsp chia seeds\n- 1 tbsp sunflower seed butter\n- 1/2 banana, mashed\n- drizzle of real maple\n- berries, to top\n\nfor this crew, plant-based was never the alternative — it's just the milk.",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#overnightoats",
      "#breakfastforlunch",
      "#familybreakfast",
      "#allergenfree",
      "#kidsnacks",
      "#cleanlabel",
      "#kidsnutrition"
    ],
    visual:"Bright, trend-forward Pinterest pin (vertical 2:3), warm cream palette (#FAFAF7) with the Parenting brown (#9E652E) and navy ink (#202A44) typography — sunlit and lived-in, not muted brand-stock. Kid-family morning: a small hand reaching for a prepped overnight-oats jar on a sunny kitchen counter, the Willa's Kids carton standing right beside it as a co-hero at 40%+ of the frame, label facing forward (passes the visual-competition test — the carton is never cropped out). The jar is the styled, screenshot-worthy build: creamy oats layered with mashed banana, a swirl of sunflower seed butter, chia, a maple drizzle, and berries on top — a real, kid-friendly breakfast that reads as an actual meal. A light kitchen towel or an empty jar rack can sit softly in the background to keep the frame lived-in. One clean sentence-case wordplay overlay upper third: 'the milk they already reach for.' Small proof cluster tucked in a corner: '8g protein · real maple · top-9 allergen-free · Yuka 100.' Let the daylight + carton design do the work; no busy graphics, no clinical energy. The whole frame should read like something a parent saves to a family-recipes board.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this recipe — the breakfast-for-lunch jar they'll actually finish.", medium:"prep the overnight-oats jar: Willa's Kids, rolled oats, chia, banana, seed butter, maple.", strong:"pour Willa's Kids — 8g protein, real maple, top-9 allergen-free — and build the breakfast-for-lunch jar."},
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
  {icon:"↑", title:"\"when they start warning-labeling the long lists, i'll be over here with four ingredients\" leads the week as the Wed Jul 29 founder answer.", reason:"A bipartisan Senate committee just advanced ultra-processed-food warning labels and a kids' junk-ad ban — a fresh policy window that puts the ingredient list back at the center. We answer with the calm opposite: Original's four lines you can pronounce, the warning-label news as backdrop, not a scare. Founder on camera because the stance is uncopyable. Lead with the label. rideNow.", agent:"trend"},
  {icon:"↑", title:"\"the oat aisle went full dessert cart — your latte didn't order dessert\" is the Wed Jul 29 Barista BIG SWING.", reason:"A category leader accelerated novelty barista flavors — Popcorn, Churros, Coconut — and rebranded as a beverages company. We answer velocity with clarity: Barista is the anti-gimmick — 50% less sugar than other barista oat milks, no rapeseed, foam you can actually read. Own the clean-cafe flag while the middle gets squeezed.", agent:"comp"},
  {icon:"↑", title:"\"draw every ingredient in your oat milk. (we'll wait.)\" rides the hand-drawn-to-real meme Thu Jul 30.", reason:"The sketch-morphs-into-real format on the 'Colette' audio rewards a slow reveal and a clean payoff — tailor-made for a four-item ingredient story. We draw oats, water, vanilla, sea salt; each becomes the real carton on the beat. Format-as-virality does the reach; the payload is literally four ingredients. rideNow.", agent:"hook"},
  {icon:"⚡", title:"Two rideNow briefs claim Wed Jul 29 — the four-ingredients founder Reel at noon and the anti-gimmick cafe TikTok at 10am.", reason:"Both decay fast: the warning-label bill is a this-week authority window and the novelty-flavor story is peaking off earnings. Capped at the day's two rideNow slots to keep the signal meaningful — the TikTok carries reach at 10am, the Reel carries substance at noon.", agent:"composer"},
  {icon:"↑", title:"\"tap to see what this kids' carton scores\" rides the tap-to-reveal format Thu Jul 30, revealing a Yuka 100.", reason:"The interactive tap-to-reveal sticker is driving high completion and rewatch on Reels — built for one satisfying reveal. We hide the Willa's Kids carton, invite the tap, and land the perfect 100/100. One tap, full transparency — on-pack proof in the format the algorithm is already pushing.", agent:"pulse"},
  {icon:"↑", title:"\"not restriction, not a sugar bomb — just a real pour\" rides the Gummy Bear Mom archetype Sat Aug 1.", reason:"The 'Gummy Bear Mom' middle-ground is peaking — food as moderation, not a permission war. We frame the no-drama morning: Willa's Kids as the calm breakfast fuel, neither the strict-mom nor the fun-mom bit. Celebrate feeding, don't referee it — the reframe lands without a lecture.", agent:"pulse"},
  {icon:"↓", title:"No plain latte-hero this week — Barista rides only inside the cloud-coffee float and the anti-gimmick cafe flag.", reason:"Latte cap is one per two weeks. Barista's only appearances this week are the viral cloud-coffee remix (the hero is the whipped-oat float) and the category-critique flag against the novelty-flavor cart. No standalone latte brief — coffee earns a slot only as a recipe or critique vehicle.", agent:"editor"},
  {icon:"×", title:"Glyphosate is back in the news — a Supreme Court labeling ruling plus a fresh pre-term-birth study — but it stays off the slate.", reason:"Real and in-window, but the glyphosate/pesticide-on-oats lane ran BIG SWING JUL 20 and JUL 06 — two of the last three weeks. Resting per the standing-rest rule despite the new hooks; the fresh authority heat this week is the Senate UPF bill and the metabolic + seed-oil science.", agent:"editor"},
  {icon:"⚡", title:"A gentle back-to-school seed only — the Gen Alpha protein-jar pin and the dye-free easy-swap — no lunchbox blitz yet.", reason:"Back-to-school buying peaks mid-August, roughly three weeks out. We seed the lunchbox rethink with two calm Kids pins (the milk they already reach for; clean color is the baseline as the dye cleanup reaches school food) and hold the full morning-routine push for later. One seed, not a push.", agent:"composer"}
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
  total:16640,
  lift:48,
  sessions:1372,
  topRoiFormat:"Anime summon-format meme-payload TikTok + clean-sourcing activist Reel (the summon-format reveal peaked JUL 20 – JUL 26)",
  topRoiPerBrief:1820,
  source:"Shopify + Klaviyo"
};

const AGENT_BY_ID = Object.fromEntries(AGENTS.map(a=>[a.id,a]));

// ─── Brief ↔ source links (the threading) ─────────────────
const BRIEF_LINKS = {
  "JUL27-TT-6":{
    trends:[],
    pulse:[
      "CP-7"
    ],
    comps:[]
  },
  "JUL27-IG-R4":{
    trends:[],
    pulse:[
      "CP-6"
    ],
    comps:[]
  },
  "JUL27-IG-F2":{
    trends:[
      "T-1"
    ],
    pulse:[],
    comps:[
      "C-2"
    ]
  },
  "JUL27-IG-R5":{
    trends:[],
    pulse:[
      "CP-9"
    ],
    comps:[]
  },
  "JUL27-TT-1":{
    trends:[
      "T-9"
    ],
    pulse:[],
    comps:[
      "C-1"
    ]
  },
  "JUL27-IG-R1":{
    trends:[
      "T-1"
    ],
    pulse:[],
    comps:[]
  },
  "JUL27-TT-2":{
    trends:[],
    pulse:[
      "CP-5"
    ],
    comps:[]
  },
  "JUL27-TT-3":{
    trends:[
      "T-5"
    ],
    pulse:[
      "CP-4"
    ],
    comps:[
      "C-2"
    ]
  },
  "JUL27-IG-R2":{
    trends:[],
    pulse:[
      "CP-1"
    ],
    comps:[]
  },
  "JUL27-IG-R3":{
    trends:[
      "T-1"
    ],
    pulse:[
      "CP-3"
    ],
    comps:[]
  },
  "JUL27-TT-4":{
    trends:[
      "T-8"
    ],
    pulse:[
      "CP-2"
    ],
    comps:[]
  },
  "JUL27-IG-F1":{
    trends:[
      "T-2"
    ],
    pulse:[],
    comps:[]
  },
  "JUL27-TT-5":{
    trends:[
      "T-3"
    ],
    pulse:[],
    comps:[
      "C-1"
    ]
  },
  "JUL27-PIN-1":{
    trends:[
      "T-9"
    ],
    pulse:[],
    comps:[
      "C-1"
    ]
  },
  "JUL27-PIN-2":{
    trends:[
      "T-5"
    ],
    pulse:[],
    comps:[]
  },
  "JUL27-PIN-3":{
    trends:[
      "T-8"
    ],
    pulse:[],
    comps:[]
  }
};



// ─── Paid Amplify Plans (Paid Media Planner output) ──────
const AMPLIFY_PLANS = {
  "JUL27-IG-R1":{headline:"UPF warning-label answer — they're warning-labeling the long lists; Willa's Original kept it to four lines you can pronounce, organic and glyphosate-free", totalBudget:350, testWindow:"5 days (Wed Jul 29 → Sun Aug 2)", objective:"Saves + Shares", guardrail:"Auto-pause if CPM exceeds $9 or sentiment dips below 0.85; the four-ingredient label is the whole argument — calm reassurance against the Senate bill news, never alarm or fear imagery", why:"The clean-sourcing activist Reel held 7.4x saves at 0.96 sentiment on the JUL 20 – JUL 26 week — the calm receipts-first posture reads as reassurance, not panic. That exact register runs the UPF warning-label answer against a live policy moment: lead with the label, let the news be the backdrop."},
  "JUL27-IG-R3":{headline:"Hand-drawn-to-real meme — sketch oats, water, vanilla, sea salt and each drawing morphs into the real carton on the beat; four ingredients, drawn to life", totalBudget:300, testWindow:"4 days (Thu Jul 30 → Sun Aug 2)", objective:"Saves + Reach", guardrail:"Pull if save-to-view drops below the summon-format meme benchmark from JUL 20 – JUL 26; the payoff has to land on the beat — the carton reveal is the entire point", why:"The anime summon-format meme was the reach hero at 9.1x — format-as-virality carried the whole week. The hand-drawn-to-real format runs the same play: the trending format does the reach work, the four-ingredient carton is the clean payoff."},
  "JUL27-TT-1":{headline:"Anti-gimmick cafe flag — the aisle turned into a dessert cart; Willa's Barista just makes foam you can actually read, 50% less sugar than other barista oat milks, no rapeseed", totalBudget:300, testWindow:"5 days (Wed Jul 29 → Sun Aug 2)", objective:"Saves + Site visits", guardrail:"Auto-pause if CPM exceeds $8; category-critique stays no-names — the contrast is 'novelty vs. clean,' never a named competitor on the surface", why:"The category leader's novelty-flavor push (Popcorn, Churros, Coconut) is the live foil — the split between flavor-novelty velocity and clean-ingredient credibility is now obvious at the shelf. Planting the clean-flavor flag while the arms race is loud is the timely counter."},
  "JUL27-IG-R2":{headline:"Dairy-free cloud coffee — whip Willa's Barista into a dense float over a coconut-water americano; the float that holds instead of thinning the drink, no gums", totalBudget:250, testWindow:"4 days (Thu Jul 30 → Sun Aug 2)", objective:"Saves + Reach", guardrail:"Pull if the float doesn't read genuinely dense on camera, or if save-to-view drops below the dairy-free FoodTok-remix benchmark; the real-foam proof is the payload", why:"Cloud coffee is peaking across FoodTok with millions of recreations, and dairy-free frozen remixes were reliable savers on the JUL 20 – JUL 26 week. The named creamy build travels straight to Pinterest, and it replaces the expiring ice-cream-month recipe lane with a fresh peg."},
  "JUL27-IG-R4":{headline:"Gummy Bear Mom middle-ground — not restriction, not a sugar bomb, just a real pour; Willa's Kids as the no-drama morning fuel, 8g protein and a Yuka 100", totalBudget:250, testWindow:"4 days (Sat Aug 1 → Tue Aug 4)", objective:"Saves + Site visits", guardrail:"Auto-pause on any body-image or diet-culture comment sentiment; abundance-and-moderation framing only, brand or cofounder voice, no required family member on camera", why:"The Gummy Bear Mom archetype is peaking as the balanced-parenting middle ground, and the fan-request Kids Reel converted at 7.0x on the JUL 20 – JUL 26 week. The moderation-not-restriction register is squarely Willa's parenting pocket and converts a high-intent parent audience to considered site visits."}
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
  {date:"Sun Jul 26 · 21:40", agent:"perf", msg:"rolled the JUL 20 – JUL 26 briefs into the Performance tab — 16 shipped, ~2.95M reach, 7.0x average saves-delta; the anime summon-format meme TikTok was the reach hero at 9.1x, format-as-virality proving out again"},
  {date:"Sun Jul 26 · 21:15", agent:"perf", msg:"flagged the summon-hand-sign meme as the JUL 20 – JUL 26 breakout — the trending format carried the reach and the whole-oat carton was the entire payload; the read holds: when the format does the reach work, the carton alone is the punchline"},
  {date:"Sun Jul 26 · 20:50", agent:"perf", msg:"Pinterest over-indexed again — the dairy-free chocolate scoop pin hit 8.2x saves at 0.97 sentiment, the highest Pinterest delta of the JUL 20 – JUL 26 week"},
  {date:"Sun Jul 26 · 20:25", agent:"pulse", msg:"ice-cream-month desserts converted all week, but the calendar peg expires Jul 31 — pivoting the recipe lane off ice cream to cloud coffee and the anti-gimmick cafe flag before it goes stale"},
  {date:"Sun Jul 26 · 20:00", agent:"paid", msg:"drafted amplify plans for the JUL 29 – AUG 2 BIG SWINGs — the UPF warning-label four-ingredient answer, the hand-drawn-to-real meme, and the anti-gimmick Barista cafe flag"},
  {date:"Sun Jul 26 · 19:35", agent:"paid", msg:"set the guardrails — CPM ceilings, sentiment floors, calm-reassurance-only on the UPF-adjacent creative; hard sentiment auto-pause on the policy answer so it never reads as fear"},
  {date:"Sun Jul 26 · 19:10", agent:"composer", msg:"confirmed the calm receipts-first register cascades into the Wed Jul 29 UPF warning-label BIG SWING — lead with the four-line label, the Senate committee bill stays the calm backdrop"},
  {date:"Sun Jul 26 · 18:45", agent:"trend", msg:"connected the clean-sourcing activist Reel's high sentiment to this week's own-the-standard clean-label carousel — Willa's set the bar the category is now racing to hit, already cleared"},
  {date:"Sun Jul 26 · 18:20", agent:"pulse", msg:"matched the meme-payload win to the hand-drawn-to-real four-ingredient Reel and the tap-to-reveal Yuka format — two clean-payoff formats already peaking, both cued for the week"},
  {date:"Sun Jul 26 · 18:00", agent:"perf", msg:"noted the savoury-maxxing balance Reel sagged to 6.0x — health-education holds only when the benefit leads, so the Fri Jul 31 metabolic carousel opens on steady energy, not the fat-cell science"},
  {date:"Mon Jul 27 · 09:30", agent:"comp", msg:"logged the category leader's novelty-flavor push (Popcorn, Churros, Coconut) as the live foil for the Barista clean-cafe counter — foam you can actually read is the Wed Jul 29 flag"},
  {date:"Mon Jul 27 · 10:00", agent:"perf", msg:"opened baseline tracking on the UPF warning-label BIG SWING — reading early reach velocity against the summon-format meme benchmark from JUL 20 – JUL 26"}
];


// ─── Killed signals (the ones we said no to) ──────────────
const KILLED = [
  {signal:"Glyphosate back in the news — Supreme Court labeling ruling + a July 2026 pre-term-birth study (No-Till Farmer roundups, Jul 20-21)", reason:"Fresh and in-window, but the glyphosate/pesticide lane ran BIG SWING JUL20 (T-1) and JUL06 (T-2) — two of the last three weeks. Resting per the standing-rest rule despite the new hooks."},
  {signal:"'Bangladesh' 49-second song-of-summer text-substitution meme (Yahoo Entertainment, Jul 23)", reason:"Genuinely peaking, but the 'you never take me to Bangladesh / you never ___' template was already burned JUL13 (CP-6). Can't re-run the format."},
  {signal:"Organic-food misinformation rebuttal — 'organic isn't actually safer' (Genetic Literacy Project, Jul 7)", reason:"Compelling rebuttal, but the source is Jul 7 (stale, pre-Jul 20 cutoff) AND rebutting the organic-benefit narrative cuts directly against Willa's own organic + glyphosate-free cert story."},
  {signal:"Frozen Hugo Spritz — '2026's drink of summer' (Yahoo Lifestyle, Jul 20)", reason:"In-window and viral, but it's an elderflower-and-Prosecco alcohol cocktail with no clean path to Willa's warm, family-safe voice."},
  {signal:"House of the Dragon S3 major-character death (TVLine, Jul 23)", reason:"Fresh and huge, but dark-fantasy spectacle is tonally off Willa's calm morning-kitchen register. Entertainment slots better spent on Joy Oladokun and Bon Iver."},
  {signal:"SNAP soda/candy purchase waivers now approved in 23 states (USDA, July 2026)", reason:"Real MAHA momentum, but the SNAP-restriction lane was burned JUL13 (T-5) and the framing risks a partisan food-policy tone the brand avoids."}
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
  "JUL27-TT-6":{direct:"the glossy morning routine is getting unfollowed. the real one's getting saved. 🌾\n\nno ring light, no perfectly-staged flatlay — just a real kitchen, a little chaos, and the carton that's actually on our counter. here's what we actually pour.\n\nWilla's Original, and the whole story fits on the label:\n· 4 ingredients (organic whole grain oats, filtered water, organic vanilla extract, sea salt)\n· 1g sugar · 4g+ protein · 2g+ prebiotic fiber\n· made from the whole oat groat — bran, germ, and all — not filtered down into oat syrup\n· certified glyphosate-free · USDA Organic · tested every lot\n\nthe un-staged morning was always the good one.", warm:"the internet is finally over the ring-light morning. same. 🌾\n\nno filter, no props — just the real kitchen and the carton we actually reach for. here's what we actually pour.\n\nshhh… the messy morning was always the good one.", punchy:"no ring light. no filter. here's what we actually pour. 🌾"},
  "JUL27-IG-R4":{direct:"Willa's Kids is the no-drama morning pour — 8g protein, 6g sugar from real organic maple, and free of the top 9 allergens. 🐻🥛\n\nThere's a whole debate online about what kind of parent you are — the strict one or the fun one. We'll gently opt out. Breakfast isn't a permission war; it's just a good pour. Not restriction, not a sugar bomb — just a real pour.\n\nWilla's Kids keeps the whole entire oat for a rich, smooth taste with more protein and fiber per cup, plus plant-based DHA and calcium. Same protein as dairy, less sugar, and a label short enough to actually read.\n\nThe calm morning isn't a parenting flex. It's just breakfast, done right.\n\nNourish the spark in everyone.", warm:"shhh… you don't actually have to pick a side at breakfast. Willa's Kids is the middle-ground pour — 8g protein, 6g sugar from real maple, top-9 allergen-free. not restriction, not a sugar bomb, just a real morning with a kid who pours their own glass. 🐻", punchy:"not restriction, not a sugar bomb — just a real pour. Willa's Kids: 8g protein, 6g sugar, top-9 allergen-free. 🐻🥛"},
  "JUL27-IG-F2":{direct:"Four whole-oat ingredients. Organic. Certified glyphosate-free. Mother-founded. That was never a reformulation — it's the recipe grandmother Willa passed down, on the shelf since day one.\n\nsimple isn't our new direction — it's our whole ingredient list.\n\nA short list is easy to print on a front-of-pack. The parts that actually take work are harder to copy: oats grown certified glyphosate-free and tested every lot, the whole oat groat kept in — bran, germ and all — instead of processed oat syrup, and a women-owned, WBENC-certified brand a mother built.\n\nSo while 'simple' becomes everyone's favorite word, Willa's is just standing where it started. Original, Barista, Kids, Chocolate — the same standard across the whole lineup.\n\nNourish the spark in everyone.", warm:"shhh… 'simple' isn't a rebrand around here. 💜 four whole-oat ingredients, organic, certified glyphosate-free, mother-founded — the same standard in every carton on the shelf. the whole category's favorite new word has been Willa's whole recipe since day one.", punchy:"everyone's discovering 'simple.' Willa's has been four whole-oat ingredients the whole time. 💜 organic · glyphosate-free · mother-founded."},
  "JUL27-IG-R5":{direct:"Some mornings don't ask you to optimize anything. 🌾🥛\n\nThe feed is full of five-step routines, powders and timers — and some mornings don't need to be optimized, just poured. Willa's uses the whole entire oat (bran, germ and all, not just the starch) for a rich, smooth taste with less sugar and more protein and fiber per cup, so the good part is already handled before you're even awake.\n\nNo blends to stack. No steps to nail. Just real food, passed down, in a carton with a label short enough to read half-asleep.\n\nPour slow. Let the morning be kind.\n\nNourish the spark in everyone.", warm:"Set the song to Joy Oladokun's 'Kind' and let the morning slow all the way down. 🌾 No powders to stack, no routine to nail — some mornings don't need to be optimized, just poured. Willa's keeps the whole entire oat, so the good part's already handled while you're still half-asleep. Pour slow. Let it be kind.", punchy:"some mornings don't need to be optimized — just poured. 🌾🥛 whole oat · real food, passed down."},
  "JUL27-TT-1":{direct:"novelty flavors are having a moment. clean foam is having a career. ☕\n\nwhile the oat aisle races toward popcorn, churros, and coconut, Willa's Barista is holding the clean-cafe line. the aisle turned into a dessert cart. Willa's Barista just makes foam you can actually read.\n\nthe whole story, right on the label:\n· 50% less sugar than other barista oat milks (3g, from organic coconut sugar)\n· no rapeseed, no canola\n· 4g protein, froths dense and holds its shape without thinning your drink\n· certified glyphosate-free · USDA Organic · tested every lot\n\ngimmicks come and go. a clean latte is forever.", warm:"the oat aisle is out here launching churros-flavored foam. cute. ☕\n\nWilla's Barista would rather nail the part that matters — dense foam that holds, 3g sugar, no rapeseed.\n\nshhh… clean was never a gimmick. it's just the recipe.", punchy:"the aisle turned into a dessert cart. Willa's Barista just makes foam you can actually read. ☕"},
  "JUL27-IG-R1":{direct:"Willa's Original is four ingredients you can pronounce — organic whole grain oats, filtered water, organic vanilla, sea salt. That's the whole list. No gums, no oils, no oat syrup.\n\nHere's the backdrop: on Jul 24 a bipartisan Senate committee advanced a bill to put FDA warning labels on ultra-processed foods high in sugar, salt and fat. The kind of labels built for the 14-ingredient cartons, not the 4-ingredient one.\n\nWe didn't reformulate to get here. Willa's uses the whole oat — bran, germ and all — so the fiber and protein stay in and the sugar stays low. 1g sugar. 4g+ protein. 2g+ prebiotic fiber. Certified organic, glyphosate-free, tested every lot.\n\nThey're warning-labeling the long lists — we kept ours to four lines you can pronounce.\n\nNourish the spark in everyone.", warm:"shhh… here's the calm version of a big headline. 💙 On Jul 24 the Senate moved to put FDA warning labels on ultra-processed foods. Willa's Original never had to sweat it — organic whole oats, filtered water, vanilla, sea salt. Four lines you can pronounce, 1g sugar, whole oat and all.", punchy:"they're warning-labeling the long lists. Willa's Original kept it to four lines you can pronounce. 💙 organic whole oats · water · vanilla · sea salt."},
  "JUL27-TT-2":{direct:"No, oat milk doesn't spike your blood sugar like soda. Willa's Original is four ingredients — organic whole grain oats, filtered water, organic vanilla extract, sea salt — with 1g sugar and no rapeseed. Most oat milks filter out both the fiber AND the protein, then process the starch into sugar. Willa's keeps the whole oat, so the fiber that steadies blood sugar stays right where it belongs. Oat milk isn't soda. Willa's Original keeps the whole oat to prove it. Certified organic. Certified glyphosate-free. Tested every lot. The whole oat does the arguing — not the algorithm. 🌾", warm:"shhh… oat milk isn't soda, no matter what the algorithm keeps insisting. Willa's Original: four ingredients, 1g sugar, the whole oat kept whole. we'll let the fiber do the talking. 🌾", punchy:"oat milk isn't soda. Willa's Original: 4 ingredients, 1g sugar, the whole oat — receipts included."},
  "JUL27-TT-3":{direct:"One tap. A perfect 100. 🎯\n\nWilla's Kids just scored 100 out of 100 on Yuka — the Clean Label App that scans your groceries and scores every ingredient 0 to 100. Tap to see the score — spoiler: it's a perfect 100.\n\nHere's what earns it:\n🌾 8g protein — same as dairy, half the sugar\n🍁 6g sugar, from real organic maple (nothing weird)\n🧬 plant-based DHA + calcium\n🚫 free of the top 9 allergens — no nut, soy, gluten, dairy, sesame\n\nThe perfect score isn't the point. It's proof of what's actually in the carton. Nourish the spark in everyone.\n\n— Willa's Kids 🥛", warm:"cover the carton. tap the sticker. 100 out of 100. 👆\n\nwe scanned Willa's Kids on Yuka — the Clean Label App that scores groceries 0 to 100 — and shhh… it's a perfect score.\n\n8g protein, real maple, free of the top 9 allergens. the label does the talking. 🥛", punchy:"tap to see the score — spoiler: it's a perfect 100. 🎯 Willa's Kids, receipts on the carton."},
  "JUL27-IG-R2":{direct:"Cloud coffee is all over the feed — and the whole thing lives or dies on whether that whipped top actually holds. ☁️☕ Here's the dairy-free build: a coffee cloud that actually holds — real whipped oat, no gums — floating over an iced coconut-water americano.\n\nWilla's Barista is made with the whole entire oat and simple organic ingredients — it froths into a real, dense foam with 50% less sugar than other barista oat milks and no rapeseed oil, so the cloud stays thick instead of thinning your drink. 🥛\n\nIngredients:\n- ¾ cup Willa's Barista, cold\n- 1 cup coconut water\n- 1–2 shots espresso (or ½ cup strong cold brew)\n- ice\n- optional: 1 tsp maple syrup\n\nFill a glass with ice, pour in the coconut water and espresso for the americano. Whip the cold Willa's Barista (milk frother or blender) until it holds soft peaks, then spoon the cloud on top. Sip straight through the float.\n\nPlants, finally done right.", warm:"Cloud coffee kept crossing our feed, so we made it dairy-free — and got the part everyone struggles with to actually work. ☁️ A coffee cloud that actually holds: whip cold Willa's Barista into a real, dense float and spoon it over an iced coconut-water americano. shhh… no gums did the holding, just the whole oat. Real foam, 50% less sugar than other barista oat milks, no rapeseed. Full build below. ☕", punchy:"cloud coffee, dairy-free — and the float actually holds. whip Willa's Barista into a real cloud over an iced coconut-water americano. no gums, no rapeseed. ☁️☕"},
  "JUL27-IG-R3":{direct:"Four sketches. Four ingredients. One carton you can actually read. ✏️🥛\n\nHere's the whole recipe for Willa's Original, drawn one line at a time: organic whole grain oats, filtered water, organic vanilla extract, sea salt. That's it — draw every ingredient in your oat milk, we only needed four.\n\nMost oat milks would take a whole lot more pencil — water, oils, gums, added sugars. Willa's uses the whole entire oat (bran, germ and all, not just the starch) for a rich, smooth taste with less sugar and more protein and fiber per cup. So the drawing's done before it even gets complicated.\n\nWhole oat. 1g sugar. 4g+ protein. 2g+ fiber. Nothing you'd need a second page to sketch.\n\nNourish the spark in everyone.", warm:"We tried the sketch-to-real trend with the whole ingredient list — and the drawing was over embarrassingly fast. ✏️ Oats, water, vanilla, sea salt, and each one becomes the real Willa's Original carton on the beat. shhh… four is kind of the whole flex. Whole oat, 1g sugar, and a list you could finish on a napkin.", punchy:"draw every ingredient in your oat milk. we only needed four. ✏️🥛 whole oat · 1g sugar · organic."},
  "JUL27-TT-4":{direct:"protein breakfast tacos are all over the feed — here's the version that passes the label check. 🌮\n\nWilla's Kids does the heavy lifting: 8g protein (same as dairy), 6g sugar from real maple, DHA, and top-9 allergen-free. the shell gets rebuilt dairy-free, the pour goes right beside it — the protein breakfast that actually reads clean.\n\nno tummy-ache dairy, no sugar bomb, and a real plate: protein + grain + something green + a drink your kid asks for by name.\n\nIngredients:\n- 2 eggs, whisked with 1/4 cup Kite Hill dairy-free cottage cheese (this is the shell)\n- 1 small tortilla, warmed\n- 1/4 avocado, sliced\n- a scramble of 1 more egg for the top\n- 1 glass of Willa's Kids Oat Milk, poured alongside\n- flaky salt to finish\n\nthe morning win you can actually repeat on a Tuesday.", warm:"everyone's saving the high-protein breakfast taco. then they hit the cottage-cheese shell. 🌮\n\nrebuild it dairy-free (Kite Hill in the shell), pour Willa's Kids beside it — 8g protein, half the sugar of dairy, nothing on the top-9 list.\n\nshhh… the protein breakfast that actually reads clean.", punchy:"the viral protein taco, rebuilt dairy-free. the protein breakfast that actually reads clean. 🌮"},
  "JUL27-IG-F1":{direct:"Metabolic health rides on the quality of what you eat — not just the quantity. Willa's Original is built for the steady lane: 1g sugar, 4g+ protein, 2g+ prebiotic fiber, four organic ingredients.\n\nMost oat milks filter out both the fiber AND the protein, then process the leftover starch into sugar. Willa's keeps the whole oat groat — bran, germ and all — so the fiber and protein stay in and your energy stays even. No spike, no 10am crash.\n\nSteady energy isn't a hack — it's just the whole oat doing its job.\n\nThis isn't about eating less. It's about a real-food pour that carries you to lunch. Certified organic, glyphosate-free, tested every lot.\n\nNourish the spark in everyone.", warm:"shhh… a smooth morning isn't willpower, it's what's in the cup. 💙 Willa's Original keeps the whole oat — fiber and protein in, sugar low (1g). The quality is the whole point, so your energy stays even all the way to lunch. No spike, no crash.", punchy:"quality over quantity, in one pour. 💙 Willa's Original: whole oat, 1g sugar, 4g protein, 2g fiber — steady energy, no crash."},
  "JUL27-TT-5":{direct:"Canola camp. Sunflower camp. Pick a side — or don't. 🌻\n\nWilla's Original isn't in the seed-oil fight at all: organic whole grain oats, filtered water, organic vanilla, sea salt. No oil, period. Pick a side in the seed-oil war — Willa's Original didn't even show up.\n\n🌾 whole oat groat — bran, germ and all, not oat syrup\n💧 1g sugar, 4g+ protein, 2g+ prebiotic fiber\n🚫 no gums, no fillers, no seed oil in Original\n☕ and Barista skips rapeseed + canola too — real high-oleic sunflower oil, nothing industrial\n\nFour ingredients you can pronounce. That's the whole argument. Nourish the spark in everyone.\n\n— Willa's Original 🥛", warm:"canola or sunflower — Willa's Original isn't picking a side. 🌻\n\nfour ingredients, whole oat, filtered water, vanilla, sea salt. shhh… no oil in the mix at all.\n\nnothing to defend when there's nothing there. 🥛", punchy:"pick a side in the seed-oil war — Willa's Original didn't even show up. 🌻 four ingredients, zero oil."},
  "JUL27-PIN-1":{direct:"Craving something rich and a little fancy without the sugar crash? This dairy-free chocolate mousse is silky, deep, and made with real cacao — rich enough to be a splurge, clean enough it doesn't need to hide. 🍫✨\n\nWilla's Chocolate Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, creamy taste with real cacao, less sugar, and more protein and fiber per cup — perfect for dairy-free mousse, bakes, and anything you want indulgent but clean. 🥛\n\nIngredients\n- 1 cup Willa's Chocolate Organic Oat Milk\n- 1 can coconut cream, chilled overnight\n- 6 oz dairy-free dark chocolate, melted\n- 2 tbsp maple syrup, to taste\n- 1 tsp vanilla extract\n- pinch of sea salt\n- cacao powder + shaved dark chocolate, to finish\n\nNourish the spark in everyone.", warm:"shhh… the fancy dessert that's still just Willa's. 🍫 whip chilled coconut cream with melted dark chocolate and Willa's Chocolate until it's silky and dense, chill, and top with cacao. it tastes like a splurge with a fraction of the sugar — real cacao, whole oat, Good Food Awards and all. rich enough to be a splurge, clean enough it doesn't need to hide.", punchy:"dairy-free chocolate mousse, made with real cacao. 🍫 rich enough to be a splurge, clean enough it doesn't need to hide. — Willa's Chocolate + coconut cream."},
  "JUL27-PIN-2":{direct:"The school-safe carton doesn't need a dye ban to catch up to it. 🎨 Willa's Kids has always poured clean — no synthetic dyes, real organic maple instead of coloring, and free of all top-9 allergens.\n\nHere's the backdrop: the FDA is phasing petroleum-based dyes out of the food supply, and the dairy industry has pledged to pull artificial colors from school milk, cheese and yogurt for the coming school year. Clean color is quietly becoming the school-food baseline.\n\nSo it's an easy swap for the lunchbox rethink — 8g protein, 6g sugar from real maple, plant-based DHA, and a perfect 100/100 on the Yuka Clean Label App (it scans groceries and scores the ingredients 0-100). The only color in this carton is oat and maple.\n\nclean color isn't the upgrade anymore — it's the baseline.", warm:"shhh… the cafeteria is finally catching up. 🎨 Willa's Kids skipped the synthetic dyes from day one — real organic maple, no coloring, free of all top-9 allergens. As more states pass bans on artificial colors in school meals, clean color is going from upgrade to baseline. Ours has been here the whole time.", punchy:"the cafeteria is dropping the dyes. Willa's Kids never had them. 🎨 real maple, no synthetic color, top-9 allergen-free."},
  "JUL27-PIN-3":{direct:"Ask this generation what 'plant-based' means and you'll get a shrug — for them it was never the alternative, it's just the milk they already reach for. 🥣 Willa's Kids makes that easy: 8g protein for a real breakfast-for-lunch build (breakfast foods packed for the midday meal) that actually keeps them full till the next one.\n\nWilla's Kids Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, more protein and fiber per cup, real organic maple instead of coloring, plant-based DHA, and a top-9 allergen-free label. 🥛\n\nMake it a breakfast-for-lunch overnight-oats jar:\n- 1 cup Willa's Kids Organic Oat Milk\n- 1/2 cup rolled oats\n- 1 tbsp chia seeds\n- 1 tbsp sunflower seed butter\n- 1/2 banana, mashed\n- drizzle of real maple\n- berries, to top\n\nfor this crew, plant-based was never the alternative — it's just the milk.", warm:"shhh… they don't think of it as the alternative. 🥣 for this generation, oat milk is just the milk they reach for — so lean in. build a breakfast-for-lunch overnight-oats jar with Willa's Kids: 8g protein, real organic maple, top-9 allergen-free, prepped the night before and ready to grab any morning. the good stuff, already their favorite.", punchy:"for this crew, plant-based was never the alternative — it's just the milk. 🥣 Willa's Kids: 8g protein, the breakfast-for-lunch jar they'll actually finish."}
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
  happened:"Peers doubled down on flavor and platform, not substance — a category leader accelerated novelty barista flavors (Popcorn, Churros, Coconut) and matcha as it declared itself a 'full-on beverages company,' while another widened its Simple & Organic clean-label line.",
  coming:"A MAHA policy wave is putting minimal-ingredient sourcing back at the center — a Senate ultra-processed-food warning-label bill cleared committee Jul 24, fresh metabolic and seed-oil science is live, and the FDA's dye cleanup is reaching school food with back-to-school roughly three weeks out.",
  plays:"About 16 briefs on the table; the two biggest are an Original '4 ingredients is what not-ultra-processed looks like' answer to the Senate UPF bill, and a Barista clean-cafe counter to the novelty-flavor arms race — foam you can actually read."
};


// ─── Performance · Week of MAY 25 – MAY 31 results ──────────────
const LAST_WEEK_RESULTS = [
  {id:"JUL20-TT-1", concept:"\"throw the sign, the whole oat lands.\" — anime summon-format meme payload", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Anime summon-hand-sign meme format + the whole-oat payload (JUL 20)", trendId:null, views:641000, saves:39200, shares:22400, comments:3100, savesDelta:9.1, sentiment:0.94, hero:true, note:"Reach hero of the JUL 20 – JUL 26 week. The trending summon-format did the reach work and the whole-oat carton was the entire payload — no talking head, just the hand-sign landing on the carton reveal. The learning holds from the label-reveal wins: when a peaking format carries the reach, the carton alone can be the punchline. This week the same format-as-virality play runs the hand-drawn-to-real four-ingredient Reel and the tap-to-reveal Yuka format — two clean-payoff formats already peaking."},
  {id:"JUL20-IG-R3", concept:"\"olive oil, flaky salt, and a whole-oat base — the grown-up scoop of ice cream month.\" — dairy-free olive oil ice cream", platform:"IG Reel", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Dairy-free FoodTok remix + National Ice Cream Month churn (JUL 20)", trendId:null, views:462000, saves:27600, shares:13900, comments:2140, savesDelta:7.6, sentiment:0.95, hero:false, note:"The olive-oil ice cream churn landed at 7.6x — the pattern held: name a real creamy build, don't hand-wave it. The Ice Cream Month peg plus a named Willa's pour was the seasonal save-magnet. But the calendar peg expires Jul 31, so this week the recipe lane pivots off ice cream to cloud coffee and the anti-gimmick cafe flag before it reads stale."},
  {id:"JUL20-IG-R1", concept:"\"the whole oat that never met a pesticide invented 20 years ago.\" — clean-sourcing activist answer", platform:"IG Reel", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"Grain-residue scrutiny / organic + glyphosate-free cert-already-on-the-label (JUL 20)", trendId:null, views:428000, saves:25100, shares:10900, comments:1820, savesDelta:7.4, sentiment:0.96, hero:false, note:"The clean-sourcing activist Reel held 7.4x saves at 0.96 sentiment — the highest sentiment of the week. The calm 'our answer's already on the label' posture reads as reassurance, not fear. That exact structure is why the calm receipts-first register leads this week's UPF warning-label BIG SWING against the new Senate committee bill — lead with the four-line label, let the news be the backdrop."},
  {id:"JUL20-PIN-1", concept:"\"a chocolate scoop you can actually read the ingredient list on.\" — dairy-free ice cream month pin", platform:"Pinterest", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"No-cook dairy-free frozen dessert / Ice Cream Month (JUL 20)", trendId:null, views:236000, saves:18600, shares:5900, comments:720, savesDelta:8.2, sentiment:0.97, hero:false, note:"Pinterest over-indexed again — the dairy-free chocolate scoop hit 8.2x saves and 0.97 sentiment, the highest Pinterest delta of the week. Pinterest rewards a genuinely save-worthy, real-ingredient frozen treat with the Good Food Awards Chocolate as the payload. This week the pin lane runs the dairy-free chocolate mousse remix and the dye-free easy-swap pin, both built to compete visually on the feed."},
  {id:"JUL20-IG-R2", concept:"\"the plain carton isn't what's growing. the one that does more is.\" — fan-request Kids answer", platform:"IG Reel", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"Kids protein-premium / parents-asked-us-we-listened (JUL 20)", trendId:null, views:393000, saves:22800, shares:9800, comments:2010, savesDelta:7.0, sentiment:0.95, hero:false, note:"The fan-request Kids Reel converted at 7.0x with strong comment volume — the parents-asked-us framing still drives engagement, and the 8g protein + Yuka 100 payload lands without diet-culture backlash. This week the parenting lane carries into the Gummy Bear Mom middle-ground: moderation-not-restriction, brand or cofounder voice, never a required family member on camera."},
  {id:"JUL20-TT-4", concept:"\"mango sago, but make it dairy-free.\" — viral tapioca remix", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"Viral mango-sago tapioca dessert / dairy-free rebuild (JUL 20)", trendId:null, views:372000, saves:20100, shares:11200, comments:1680, savesDelta:6.7, sentiment:0.93, hero:false, note:"The mango-sago remix landed at 6.7x — solid but the softest of the dairy-free recipe set, confirming a named creamy build converts better than a novelty-fruit format. This week the recipe lane leans into cloud coffee, where the dense whipped-Barista float is the visible creamy proof, not a sweet-fruit garnish."},
  {id:"JUL20-TT-3", concept:"\"no machine, no condensed milk — just a microplane and a bag of berries.\" — dog-days frozen-fruit snow", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"No-cook heat-wave frozen-fruit snow hack (JUL 20)", trendId:null, views:356000, saves:19400, shares:10200, comments:1560, savesDelta:6.4, sentiment:0.94, hero:false, note:"The frozen-fruit snow hack held 6.4x — the no-equipment heat-wave treat still converts on saves, but coasts more on utility than brand payload. The read: keep the no-cook hacks as a supporting saver, lead the recipe lane with builds where a real Willa's pour is the visible hero. This week that means the whipped-Barista cloud coffee float carries the recipe slot."},
  {id:"JUL20-IG-R4", concept:"\"the feed swung savory. your morning pour never had to.\" — savoury-maxxing balance play", platform:"IG Reel", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"Savoury-breakfast-maxxing feed swing / abundance balance (JUL 20)", trendId:null, views:318000, saves:17200, shares:7400, comments:1290, savesDelta:6.0, sentiment:0.94, hero:false, note:"The savoury-maxxing balance Reel was the softest of the week at 6.0x — health-education holds attention but doesn't over-save when the framing leads with the trend instead of the benefit. The read: benefit-first or bust. This week the metabolic-health carousel opens on steady energy and the whole oat doing its job, with the fat-cell science as supporting proof, not the hook."}
];

const PERF_KPIS = {
  shipped:16,
  totalReach:2951000,
  avgSavesDelta:7.0,
  topFormat:"Anime summon-format meme-payload TikTok + dairy-free ice cream / recipe remixes + clean-sourcing activist Reel"
};

const PERF_INSIGHTS = [
  {title:"An anime summon-format meme was the reach hero of the JUL 20 – JUL 26 week (the whole-oat payload TikTok hit 9.1x saves)", detail:"The trending summon-hand-sign format carried the reach and the whole-oat carton was the entire payload — no talking head, just the hand-sign landing on the carton reveal. The learning holds from the label-reveal wins: when a peaking format does the reach work, the carton alone can be the punchline. This week the engine runs the same format-as-virality play twice — the hand-drawn-to-real four-ingredient Reel and the tap-to-reveal Yuka format, both clean-payoff formats already peaking.", agent:"perf"},
  {title:"Pinterest over-indexes on photogenic, real-ingredient dairy-free treats", detail:"The dairy-free chocolate scoop pin hit 8.2x saves at 0.97 sentiment — the highest Pinterest delta of the JUL 20 – JUL 26 week. Pinterest rewards a genuinely save-worthy frozen treat with a real payload (here the Good Food Awards Chocolate). This week the pin lane runs the dairy-free chocolate mousse remix and the dye-ban easy-swap pin, both built to compete visually on the feed.", agent:"perf"},
  {title:"Dairy-free recipe remixes converted all week, but the Ice Cream Month peg expires Jul 31", detail:"The olive-oil ice cream churn (7.6x) and the frozen-fruit snow hack (6.4x) rode the calendar peg hard, and named creamy builds beat novelty-fruit formats. But the seasonal peg is burned and expiring, so this week the recipe lane pivots off ice cream to cloud coffee — the dense whipped-Barista float is the fresh peg's visible creamy proof — and the anti-gimmick cafe flag.", agent:"pulse"},
  {title:"Health-education Reels only over-save when the benefit leads, not the science", detail:"The clean-sourcing activist Reel held 7.4x at 0.96 sentiment by leading with the calm 'our answer's on the label' posture, while the savoury-maxxing balance Reel sagged to 6.0x when the trend led instead of the benefit. This week the register carries into the UPF warning-label BIG SWING — lead with the four-line label, let the Senate bill be the backdrop — and the metabolic carousel opens on steady energy, not the fat-cell study.", agent:"composer"}
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
  "JUL27-TT-6":{voice:93, panel:88, pulse:92, recency:6},
  "JUL27-IG-R4":{voice:92, panel:90, pulse:89, recency:8},
  "JUL27-IG-F2":{voice:93, panel:86, pulse:58, recency:6},
  "JUL27-IG-R5":{voice:91, panel:88, pulse:87, recency:6},
  "JUL27-TT-1":{voice:94, panel:91, pulse:90, recency:9},
  "JUL27-IG-R1":{voice:94, panel:91, pulse:78, recency:9},
  "JUL27-TT-2":{voice:93, panel:88, pulse:86, recency:8},
  "JUL27-TT-3":{voice:92, panel:88, pulse:90, recency:8},
  "JUL27-IG-R2":{voice:91, panel:88, pulse:90, recency:8},
  "JUL27-IG-R3":{voice:92, panel:89, pulse:90, recency:9},
  "JUL27-TT-4":{voice:92, panel:88, pulse:90, recency:6},
  "JUL27-IG-F1":{voice:93, panel:88, pulse:70, recency:8},
  "JUL27-TT-5":{voice:93, panel:86, pulse:82, recency:6},
  "JUL27-PIN-1":{voice:88, panel:84, pulse:74, recency:6},
  "JUL27-PIN-2":{voice:90, panel:87, pulse:74, recency:6},
  "JUL27-PIN-3":{voice:89, panel:85, pulse:72, recency:6}
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
    hook:"cloud coffee is everywhere — a coconut-water americano under a dense whipped-oat float ☁️",
    detail:"The coconut-water iced americano topped with a thick, stable whipped-oat-milk float is peaking across TikTok in late July 2026, with millions of recreations. Oat milk's superior frothing versus dairy cream makes it the preferred base — the float holds instead of thinning the drink.",
    velocity:"high",
    platform:"TikTok + Reels",
    willasPlay:"Reel: whip Willa's Barista into a dense float over a coconut-water americano — 'the float that doesn't thin the drink.' No gums, real foam.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"TikTok · #2026-trend-summer-drinks hashtag page (permanent platform reference)", url:"https://www.tiktok.com/tag/cloudcoffee"}
    ]
  },
  {
    id:"CP-2",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"high-protein breakfast tacos are the July build — cottage-cheese-and-egg shells hit 1M+ views 🌮",
    detail:"Breakfast tacos with cottage cheese blended into egg-white shells, topped with eggs and avocado, crossed 1M+ views in July 2026 as 'cottage cheese' searches spiked roughly 40% week over week. The whole thing is chasing a protein-packed morning parents can actually make.",
    velocity:"high",
    platform:"TikTok + Reels",
    willasPlay:"Reel: high-protein breakfast tacos with dairy-free cottage cheese (Kite Hill) and a Willa's Kids pour alongside — 'the protein breakfast that actually reads clean.'",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"TikTok · Viral cottage cheese snack recipes 2026 hashtag page (permanent platform reference)", url:"https://www.tiktok.com/tag/highproteinbreakfast"}
    ]
  },
  {
    id:"CP-3",
    type:"MEME TEMPLATE",
    typeColor:"#73B2C9",
    hook:"the hand-drawn-to-real transition — sketch it, and it becomes the real thing on the beat drop ✏️",
    detail:"A hand-drawn-into-real-life format, paired with the trending 'Colette' audio, has creators sketching an object that morphs into the real thing as the beat drops. It rewards a slow reveal and a clean payoff — tailor-made for a simple ingredient story.",
    velocity:"high",
    platform:"TikTok + Reels",
    willasPlay:"Reel: sketch oats, water, vanilla, sea salt — each drawing morphs into the real carton on the beat. 'four ingredients, drawn to life.'",
    dnaMatch:"meme-payload",
    sources:[
      {label:"SocialBee · The latest Instagram trends (Jul 22, 2026)", url:"https://socialbee.com/blog/instagram-trends/"}
    ]
  },
  {
    id:"CP-4",
    type:"MEME TEMPLATE",
    typeColor:"#73B2C9",
    hook:"the tap-to-reveal sticker format is driving huge completion — cover it, make them tap to see 👆",
    detail:"The interactive tap-to-reveal format — cover part of the frame with a sticker and invite viewers to tap to see what's underneath — is driving high completion and rewatch on Reels in late July 2026. It's built for one satisfying reveal, like a hidden nutrition score.",
    velocity:"high",
    platform:"TikTok + Reels",
    willasPlay:"Reel: cover the Willa's Kids carton with a sticker, 'tap to see the score,' reveal Yuka 100/100. One tap, full transparency.",
    dnaMatch:"on-pack-checklist",
    sources:[
      {label:"SocialBee · The latest Instagram trends (Jul 22, 2026)", url:"https://socialbee.com/blog/instagram-trends/"}
    ]
  },
  {
    id:"CP-5",
    type:"MISINFORMATION REBUTTAL",
    typeColor:"#C46A5A",
    hook:"the 'oat milk spikes your blood sugar like soda' claim is recirculating — and the receipts say otherwise 🧾",
    detail:"A recurring wellness-influencer claim that oat milk 'spikes blood sugar like Coca-Cola,' hides seed oils and drives inflammation keeps making the rounds on TikTok, and fact-checkers have repeatedly rated the soda comparison misleading. With only about 2% of social nutrition content accurate, the calm, receipts-first correction wins.",
    velocity:"medium",
    platform:"TikTok + Reels",
    willasPlay:"Reel: calm rebuttal — oat milk isn't soda. Willa's Original is four ingredients, 1g sugar, whole oat, no rapeseed. The label does the arguing.",
    dnaMatch:"mom-activist",
    sources:[
      {label:"TikTok · Oat milk side effects hashtag page (permanent platform reference)", url:"https://www.tiktok.com/tag/oatmilk"},
      {label:"PolitiFact · No, oat milk does not raise blood sugar as fast as soda (fact-check reference)", url:"https://www.politifact.com/factchecks/2024/jan/31/instagram-posts/no-oat-milk-does-not-raise-blood-sugar-as-fast-as"}
    ]
  },
  {
    id:"CP-6",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"'Gummy Bear Mom' is the new balanced-parenting identity — not restriction, not a sugar bomb, just moderation 🐻",
    detail:"The 'Gummy Bear Mom' archetype is peaking in late July 2026 as the middle ground between restriction-mom and indulgence-mom — food as moderation, not a permission war. It's the 2026 parenting reframe: balance and competence over optimization.",
    velocity:"high",
    platform:"TikTok + Reels",
    willasPlay:"Reel: the middle-ground morning — not restriction, not a sugar bomb, just a real pour. Willa's as the no-drama breakfast fuel.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"Lightreel · Instagram Trends Weekly Report (Jul 25, 2026)", url:"https://lightreel.ai/blogs/whats-trending-on-instagram"}
    ]
  },
  {
    id:"CP-7",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"de-influencing is winning — parent creators are ditching gloss for real, un-filtered morning content 🌾",
    detail:"Through late July 2026, parent-creator content is shifting hard toward de-influenced, minimalist, un-polished 'real morning' storytelling — honesty and process over polish — and the platforms are rewarding it with engagement. Filters out, real kitchen in.",
    velocity:"high",
    platform:"TikTok + Reels",
    willasPlay:"Reel: raw, unfiltered morning — kid at the table, carton on the counter, no polish. 'here's what we actually pour.' Lean into the real.",
    dnaMatch:"before-after-stitch",
    sources:[
      {label:"trends.usa.one · 102 viral internet trends dominating TikTok this July 2026", url:"https://trends.usa.one/102-viral-internet-trends-dominating-tiktok-this-july-2026.html"},
      {label:"Lightreel · Instagram Trends Weekly Report (Jul 25, 2026)", url:"https://lightreel.ai/blogs/whats-trending-on-instagram"}
    ]
  },
  {
    id:"CP-8",
    type:"NEWS CYCLE",
    typeColor:"#C9A227",
    hook:"the heart doctors just weighed in — coffee's fine, it's the energy drink that isn't ☕",
    detail:"An American Heart Association scientific statement (Jul 21, 2026) found up to about 400mg of caffeine from black coffee daily appears heart-safe and may even be linked to lower disease risk, while energy drinks packing 3-4x the caffeine carry elevated blood-pressure and arrhythmia risk. The clean home latte just got a green light.",
    velocity:"high",
    platform:"TikTok + Reels",
    willasPlay:"Reel: the coffee's fine — it's the energy drink that isn't. Pour a real home latte on Willa's Barista, clean base, no jitters.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"ScienceDaily · American Heart Association statement on caffeine and cardiovascular health, Circulation (Jul 21, 2026)", url:"https://www.sciencedaily.com/releases/2026/07/260721000820.htm"},
      {label:"TikTok · Energy drinks hashtag page (permanent platform reference)", url:"https://www.tiktok.com/tag/energydrinks"}
    ]
  },
  {
    id:"CP-9",
    type:"ENTERTAINMENT MOMENT",
    typeColor:"#A191B2",
    hook:"Joy Oladokun's 'Kind' is a soulful, slow-morning single made for an unhurried pour 🎶",
    detail:"Joy Oladokun released the introspective single 'Kind' on Jul 24, 2026 — lush, soulful, slow-kitchen-morning energy, arriving ahead of her fall album. The warm, unhurried mood sits squarely in the heritage, morning-ritual pocket Willa's lives in.",
    velocity:"medium",
    platform:"IG Reels + TikTok",
    willasPlay:"Reel: use 'Kind' as the audio bed for a slow sunlit pour — hands, carton, quiet morning. Let the mood carry it; the product stays soft.",
    dnaMatch:"before-after-stitch",
    sources:[
      {label:"Consequence · New Music Releases (Jul 24, 2026)", url:"https://consequence.net/music"}
    ]
  },
  {
    id:"CP-10",
    type:"ENTERTAINMENT MOMENT",
    typeColor:"#A191B2",
    hook:"Bon Iver played a full Bob Dylan covers set at Eaux Claires — a contemporary artist honoring a forebear 🪕",
    detail:"Justin Vernon (Bon Iver) took the Eaux Claires stage on Jul 24, 2026 for a one-night-only 'Bon Dylan' set — a full performance of Bob Dylan covers as his festival returned to Wisconsin. A folk artist carrying a legend's songs forward: pure generational pass-down energy, the same thread as grandmother Willa.",
    velocity:"high",
    platform:"IG Reels + TikTok",
    willasPlay:"Reel: pair the covers-set moment with a passed-down-kitchen beat — 'the songs that shaped us shape what we make.' Heritage, no product pitch.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"Rolling Stone · Music News & Festivals — Bon Iver Dylan covers at Eaux Claires (Jul 24, 2026)", url:"https://www.rollingstone.com/music/music-news"}
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
  "JUL27-TT-6":"before-after-stitch",
  "JUL27-IG-R4":"kid-family-moment",
  "JUL27-IG-F2":"at-shelf-moment",
  "JUL27-IG-R5":"before-after-stitch",
  "JUL27-TT-1":"at-shelf-moment",
  "JUL27-IG-R1":"mom-activist",
  "JUL27-TT-2":"mom-activist",
  "JUL27-TT-3":"on-pack-checklist",
  "JUL27-IG-R2":"viral-recipe-remix",
  "JUL27-IG-R3":"meme-payload",
  "JUL27-TT-4":"kid-family-moment",
  "JUL27-IG-F1":"on-pack-checklist",
  "JUL27-TT-5":"mom-activist",
  "JUL27-PIN-1":"viral-recipe-remix",
  "JUL27-PIN-2":"at-shelf-moment",
  "JUL27-PIN-3":"kid-family-moment"
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
  "JUL27-TT-6":{
    shoot:[
      "Parody-glossy 'morning routine' open — ring light, staged matcha flatlay, cool color grade, deliberately over-produced",
      "Hard cut to a real warm-lit kitchen with an authentically cluttered counter and dishes in the sink",
      "Parent-creator / ambassador (UGC, on camera, no filter) grabbing the Willa's Original carton off the real counter",
      "Close-up hands pouring Willa's Original into a plain everyday glass, no styling",
      "Carton resting in warm morning light beside the poured glass for the end card"
    ],
    found:[
      "Trend reference (TikTok): https://trends.usa.one/102-viral-internet-trends-dominating-tiktok-this-july-2026.html — the de-influenced / un-filtered 'real morning' format the brief rides",
      "Trend reference (Reel): https://lightreel.ai/blogs/whats-trending-on-instagram — parent-creator raw-morning content wave (Jul 25, 2026) for cut pace + tone"
    ],
    memes:[
      "Light 'glossy expectation vs. real kitchen reality' two-panel energy in the stitch — keep it a wink, no named brands, no punching at creators"
    ],
    archive:[
      "Skip — this is a shoot-fresh stitch of staged-vs-real morning footage, no archive needed"
    ]
  },
  "JUL27-IG-R4":{
    shoot:[
      "Parent-creator (ambassador/UGC talent, not Willa's founder family) at the sunlit table with coffee — capture 2-3 easy knowing shrugs / waves-off for the hook (un-posed, real-morning feel)",
      "Kid pouring their own glass of Willa's Kids at the table, carton label to camera",
      "The 'not restriction / not a sugar bomb' contrast beats: a stark empty plate and a candy-bright glass, both to be swiped away to the real glass",
      "Glass-to-mug clink between kid and parent-creator, natural laugh",
      "Overhead of the Willa's Kids carton for the badge-stamp beat",
      "Static end-card hero: carton beside two glasses, back label in morning light"
    ],
    found:[
      "Trend reference (archetype): Lightreel · Instagram Trends Weekly Report (Jul 25, 2026) — the 'Gummy Bear Mom' balanced-parenting identity peaking; study the moderation-not-permission-war framing so the Reel opts out of the binary rather than joining it, https://lightreel.ai/blogs/whats-trending-on-instagram",
      "Creator-style reference (Relatable Confession): a real parent-creator un-polished morning-table register (e.g. @7kidskitchen7 style) — natural kitchen, kid in frame, confession lives in the overlay not a monologue"
    ],
    memes:[
      "Light touch only: the swipe-away of 'strict mom' / 'fun mom' title cards is the one meme beat — a full meme layer would undercut the calm, tender register"
    ],
    archive:[
      "Skip — all fresh in-kitchen kid-family footage; keep it real-morning, not vintage"
    ]
  },
  "JUL27-IG-F2":{
    shoot:[
      "Full Willa's lineup — Original, Barista, Kids, Chocolate — lined up on a clean shelf edge in soft daylight for the slide-1 hook frame",
      "Hand reaching in to lift one carton off the shelf for the slide-2 payoff",
      "Extreme close-up of a single back label with the four-line list fully legible for the checkmark slide",
      "Purple asterisk + checkmark overlay assets ('organic ✓ · glyphosate-free ✓ · whole oat groat ✓ · WBENC mother-founded ✓')",
      "End-card of the four cartons hero on soft cream"
    ],
    found:[
      "Backdrop reference (internal, NOT consumer copy): STAT · Senate advances FDA ultra-processed-food warning-label bill (Jul 24, 2026) — https://www.statnews.com/2026/07/24/ultraprocessed-food-warning-label-bill-clears-senate-committee-bipartisan-vote/ — informs the 'simple is becoming the standard' framing only; no policy framing in the caption",
      "Competitor context (internal, NOT consumer copy): a category peer keeps widening a 'Simple & Organic' clean-label platform (C-2) — the 'everyone's discovering simple' backdrop this brief quietly answers; never named on the surface"
    ],
    memes:[
      "Static at-shelf carousel → skip memes; the asterisk-then-payoff wordplay overlay is the humor device, not a meme format"
    ],
    archive:[
      "Static carousel → skip archive; every frame is in-cooler product photography"
    ]
  },
  "JUL27-IG-R5":{
    shoot:[
      "The 'before' optimized-morning cuts: phone timer starting, green-powder scoop tapped into a shaker, a cluttered counter, a hand pressing a tired eye (shoot cooler/busier)",
      "The tempo-drop cut: shaker set down, phone flipped face-down, light warming to golden",
      "The slow pour: single hand pouring Willa's into a clear glass in one unhurried motion, carton label to camera, morning light on the stream",
      "The quiet: glass resting on the counter, hand beside it, soft window light",
      "Static end-card hero: carton beside the poured glass, back label softly readable in golden light"
    ],
    found:[
      "Trend reference (audio / entertainment moment): Stereogum · \"Joy Oladokun Announces New Album Hope Is A Heavy Thing: Hear 'Kind'\" (Jul 24, 2026) — the slow soulful bed this stitch is built on, https://stereogum.com/2506203/joy-oladokun-announces-new-album-hope-is-a-heavy-thing-hear-kind/music",
      "Creator-style reference (before/after mood stitch): de-influenced slow-morning Reels using the fast-then-slow tempo-drop cut on a mellow track — study the timing of the busy-to-calm turn so the pour lands on the song's softening"
    ],
    memes:[
      "Skip a meme layer — the tender before/after mood is the format; a joke overlay would undercut the calm"
    ],
    archive:[
      "Skip — all fresh in-kitchen hands + product footage; keep it real-morning, not vintage"
    ]
  },
  "JUL27-TT-1":{
    shoot:[
      "Handheld push-in on a real crowded oat-milk grocery shelf, sunlit, novelty-flavor cartons crowding the frame (keep competitor logos illegible)",
      "Overhead pour of Willa's Barista into a handheld milk frother, dense microfoam rising",
      "Slow-motion foam stream over espresso holding a crisp peak without thinning the drink",
      "Finished latte with clean art set beside the Willa's Barista carton, warm morning counter light"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/homebarista — cafe-flavor drop + home-barista foam formats to match the cut pace",
      "Category context (permanent): https://www.theplantbasemag.com/news/industry-roundtable-plant-based-dairy-trends-for-2026 — the novelty-vs-clean fork the brief answers"
    ],
    memes:[
      "Light 'she's chasing a flavor / I'm chasing a clean pour' two-panel energy in the text overlays — keep it a wink, no named brands"
    ],
    archive:[
      "Skip — this is a shoot-fresh at-shelf + home-cafe cut, no archive footage needed"
    ]
  },
  "JUL27-IG-R1":{
    shoot:[
      "Christina direct-to-camera in her sunlit kitchen, Willa's Original in hand — steady, warm, unalarmed founder delivery",
      "Close-up hand-flip of the carton to the 4-line back label, finger tracing each ingredient",
      "Clean pour of Willa's Original into a glass, whole-oat creaminess catching the light",
      "Cream text-card frame shot in the same light for the calm 'backdrop' beat",
      "End-card carton hero on soft cream"
    ],
    found:[
      "Backdrop reference (internal, not consumer copy): STAT · Ultra-processed food warning-label bill clears Senate committee on bipartisan vote (Jul 24, 2026) — https://www.statnews.com/2026/07/24/ultraprocessed-food-warning-label-bill-clears-senate-committee-bipartisan-vote/"
    ],
    memes:[
      "Founder-activist authority brief → skip memes; the calm cream text-card is the visual device, not a meme format"
    ],
    archive:[
      "Optional: soft-focus b-roll of an organic oat field for the 'whole oat' beat (licensed or brand-shot) — skip if it drifts toward stock-photo energy"
    ]
  },
  "JUL27-TT-2":{
    shoot:[
      "Cofounder-sister at the kitchen table, calm to-camera — capture 2-3 unbothered head-shakes + half-smiles for the hook",
      "Overhead pour of whole oat groats from an open hand into a bowl, Willa's Original carton beside it, front label visible",
      "Slow pour of Willa's Original into a clear glass, morning light",
      "Whole oat groats in an open hand vs. a bowl of dry oats — the 'whole oat' visual",
      "Static front-label hero for the end card"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/oatmilk — the 'oat milk spikes like soda / hides seed oils' claim in the wild; study the exact phrasing creators use so the rebuttal answers it directly",
      "Fact-check anchor (PolitiFact): https://www.politifact.com/factchecks/2024/jan/31/instagram-posts/no-oat-milk-does-not-raise-blood-sugar-as-fast-as — the receipts the calm rebuttal leans on (internal reference, not cited on screen)"
    ],
    memes:[
      "Skip — calm receipts rebuttal; a meme layer would undercut the matter-of-fact authority register"
    ],
    archive:[
      "Optional: warm 1950s-kitchen b-roll texture for the heritage undertone, but keep it subtle — the modern real-kitchen shots carry the piece"
    ]
  },
  "JUL27-TT-3":{
    shoot:[
      "Overhead: Willa's Kids carton with a die-cut 'tap 👆' sticker covering the front label, bright counter, warm daylight",
      "Hand tapping + sticker peeling off cleanly on the beat",
      "Macro pull across the back label — protein / sugar / maple / allergen lines",
      "Sunlit morning pour into a kid's glass, small hand reaching in"
    ],
    found:[
      "Trend reference (Reel/TikTok): tap-to-reveal sticker format — https://socialbee.com/blog/instagram-trends/ (Jul 22, 2026 roundup, 'tap to reveal' section) for the cover-then-reveal structure + pacing",
      "Yuka app scan-result screen (100/100 · Excellent) to composite over the carton at the reveal"
    ],
    memes:[
      "IG native interactive 'tap to reveal' sticker for the Reels cut; pair a physical sticker-peel for the TikTok crosspost so the payoff reads without the native sticker"
    ],
    archive:[
      "Fresh-shot format brief → skip archive"
    ]
  },
  "JUL27-IG-R2":{
    shoot:[
      "Overhead pour: coconut water + espresso over ice in a clear glass, Barista carton in frame",
      "Close-up: cold Willa's Barista whipping in a jar into glossy soft peaks",
      "The thick oat cloud spooned onto the iced americano, sitting high on the surface",
      "Straw-pull through the float proving it holds, finished glass beside the carton"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/cloudcoffee — cloud-coffee / whipped-float builds peaking, for format style + hook patterns to match"
    ],
    memes:[
      "Skip — house-style recipe reel, no meme overlay needed"
    ],
    archive:[
      "Skip — all fresh in-kitchen footage"
    ]
  },
  "JUL27-IG-R3":{
    shoot:[
      "Overhead empty-counter plate for the sketch overlays to morph onto (locked-off, consistent lighting)",
      "Real ingredient beauty shots to reveal into: whole oat groats spilling, filtered-water pour, vanilla dropper, flaky sea salt in slow-mo",
      "The real Willa's Original carton, centered hero, for the final morph",
      "Four ingredient labels / hand-lettered tags to arc around the end-card carton"
    ],
    found:[
      "Trend reference (Reel format + 'Colette' audio): SocialBee · The latest Instagram trends (Jul 22, 2026) — the hand-drawn-to-real sketch-morph transition, https://socialbee.com/blog/instagram-trends/",
      "Trend reference (weekly, live): Later · Top Instagram Reels Trends to Try in 2026 (updated weekly) — sketch-to-reality format + trending audio, https://later.com/blog/instagram-reels-trends/",
      "Trend reference (platform, permanent): TikTok · Trending Transition Audios hashtag page, https://www.tiktok.com/tag/transition"
    ],
    memes:[
      "Ride the sketch-to-real transition exactly — pencil overlay wobble + on-beat morph is the whole meme; payload is that the list only needs four drawings"
    ],
    archive:[
      "Skip — all fresh in-kitchen + sketch-overlay footage"
    ]
  },
  "JUL27-TT-4":{
    shoot:[
      "Overhead whisk of eggs + Kite Hill dairy-free cottage cheese, Willa's Kids carton top of frame",
      "Egg-and-cottage-cheese mix poured into a hot pan, swirled thin, setting into a golden protein shell",
      "Taco fold on a plate with scrambled egg + avocado, Willa's Kids poured into a glass alongside (slow creamy stream)",
      "Kid's hands reaching in to grab the taco and the glass — no adult face to camera"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/highproteinbreakfast — top cottage-cheese-shell breakfast builds for the format + on-screen hook pacing",
      "Creator-style reference: de-influenced parent-morning kitchen content (raw, unpolished counter, hands-forward) — match the un-styled real-morning look"
    ],
    memes:[
      "Light 'the recipe said cottage cheese / my kid said no dairy' two-panel energy in the text overlays — keep it a wink, no named competitors"
    ],
    archive:[
      "Skip — shoot-fresh kitchen build, no archive footage needed"
    ]
  },
  "JUL27-IG-F1":{
    shoot:[
      "Willa's Original carton centered on cream for the slide-1 hook frame",
      "Overhead of the carton plus a poured glass with a hand in frame for the checklist slide",
      "Extreme close-up of the 4-line back label, fully legible",
      "Simple hand-drawn spike-vs-steady line-graph doodle as an overlay asset",
      "End-card carton hero on soft cream"
    ],
    found:[
      "Backdrop reference (internal, NOT consumer copy): ScienceDaily · University of Michigan fat-cell dysfunction study (Jul 26, 2026) — https://www.sciencedaily.com/releases/2026/07/260726015259.htm — cellular fat-quality research informs the 'quality over quantity / steady energy' angle as Willa's own editorial connection (not the study's literal claim); no citation appears in the caption body"
    ],
    memes:[
      "Static on-pack-checklist carousel → skip memes; the spike-vs-steady line doodle is the visual device, not a meme format"
    ],
    archive:[
      "Static carousel → skip archive; every frame is in-kitchen product photography"
    ]
  },
  "JUL27-TT-5":{
    shoot:[
      "Hands-only: two generic unbranded cooking-oil bottles set counter-to-counter like they're facing off, on a bright sunlit counter",
      "Willa's Original carton set down between the two oil bottles, front label to camera",
      "Hand slides both oil bottles out of frame, leaving just the carton centered",
      "Soft sunlit pour of Willa's Original into a clear glass"
    ],
    found:[
      "Trend reference (news context): Agweek · Despite rhetoric, canola and sunflower industry say seed oils are still a healthy choice (Jul 27, 2026) — https://www.agweek.com/crops/other-crops/despite-rhetoric-canola-and-sunflower-industry-say-seed-oils-are-still-a-healthy-choice — for the tone of the argument the piece is calmly answering (do NOT restage a hot take; stay category-level)",
      "Willa's Original front-label plate for the carton hero shots"
    ],
    memes:[
      "Optional split-screen 'the two camps vs. the untouched carton' cutaway structure — the contrast is the joke; keep it dry, not smug"
    ],
    archive:[
      "Fresh-shot format brief → skip archive"
    ]
  },
  "JUL27-PIN-1":{
    shoot:[
      "Finished dairy-free chocolate mousse in two small glass jars, glossy and dense, cacao-dusted with shaved dark chocolate",
      "Willa's Chocolate carton styled beside the jars, 40%+ of frame — the co-hero, never cropped",
      "Coconut cream whipping in a bowl; melted dark chocolate folded in with a splash of Willa's Chocolate",
      "Spoon-pull through one jar showing the airy texture",
      "Overhead flat-lay of the ingredient lineup on cream — carton, coconut cream can, dark chocolate, cacao"
    ],
    found:[
      "Recipe/styling reference (permanent platform page): Pinterest · dairy-free chocolate mousse search — https://www.pinterest.com/search/pins/?q=dairy%20free%20chocolate%20mousse — for plating + jar-styling format",
      "Trend backdrop (internal, NOT consumer copy): Dairy Reporter · Oatly shifts to become a 'full-on' beverages company as revenues rise (Jul 27, 2026) — https://www.dairyreporter.com/Article/2026/07/27/oatly-shifts-to-become-a-full-on-beverages-company-as-revenues-rise/ — the novelty-premiumization wave Willa's is countering with indulgent-remade-clean; stays INTERNAL"
    ],
    memes:[
      "Static recipe pin → skip memes; the wordplay headline + zinger strip are the visual device"
    ],
    archive:[
      "Static recipe pin → skip archive"
    ]
  },
  "JUL27-PIN-2":{
    shoot:[
      "Willa's Kids carton hero on a sunlit kitchen counter beside a real, packed lunchbox — editorial-but-lived-in, carton label forward",
      "Overhead of the carton next to a simple kid lunch (whole fruit, sandwich, snack) for a second board-worthy crop",
      "Tight detail of the carton's natural cream-and-maple color, no overlay, for the 'the color is just oat and maple' beat",
      "Clean flat-lay of the carton on cream with room for the 'real maple. no Red 40.' wordplay overlay"
    ],
    found:[
      "Backdrop reference (internal, not consumer copy): Akin (Eye on FDA) · FDA continues its food-dye cleanup, Jul 22 2026 action — https://www.akingump.com/en/insights/blogs/eye-on-fda/fda-continues-its-food-dye-cleanup — informs the 'clean color is the baseline' framing only",
      "Backdrop reference (internal, not consumer copy): IDFA · Healthy Dairy in Schools Commitment — https://www.idfa.org/healthydairyinschools — school dairy dropping artificial colors"
    ],
    memes:[
      "Static aesthetic pin → skip memes; the on-pack wordplay overlay is the text device, not a meme format"
    ],
    archive:[
      "Static pin → skip archive; optional soft-focus school-morning b-roll only if it stays bright and un-stocky"
    ]
  },
  "JUL27-PIN-3":{
    shoot:[
      "Small hand reaching for a prepped overnight-oats jar on a sunlit counter, Willa's Kids carton beside it as co-hero at 40%+, label forward",
      "Styled breakfast-for-lunch jar: layered oats, mashed banana, sunflower seed butter swirl, chia, maple drizzle, berries on top — reads as a real meal",
      "Overhead flat-lay of the build lineup on cream — carton, jar, oats, banana, seed butter, berries — for a second board-worthy crop",
      "Willa's Kids carton pouring into the jar, natural cream-and-maple color doing the work",
      "Soft background beat: a light kitchen towel or empty jar rack to keep the frame lived-in"
    ],
    found:[
      "Recipe/styling reference (permanent platform page): Pinterest · overnight oats for kids search — https://www.pinterest.com/search/pins/?q=overnight%20oats%20for%20kids — for jar-layering + board-worthy plating format",
      "Trend backdrop (internal, NOT consumer copy): The Food Institute · 5 Gen Alpha food trends to watch in 2026, per Chartwells K12 (2026) — https://foodinstitute.com/focus/5-gen-alpha-food-trends-to-watch-in-2026-according-to-chartwells-k12/ — the plant-based-default + breakfast-for-lunch shift Willa's is normalizing against; stays INTERNAL"
    ],
    memes:[
      "Static recipe/family pin → skip memes; the sentence-case wordplay overlay is the text device"
    ],
    archive:[
      "Static pin → skip archive; optional soft-focus morning b-roll only if it stays bright and un-stocky"
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
const WELCOME_WEEK_KEY = "JUL-27-2026";
const WELCOME_WEEK_RANGE = "JUL 27 – AUG 2, 2026";
const WELCOME_REFRESHED = "Jul 27, 2026";

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
  pullQuote:"the world-cup screens went dark, the dog days rolled in, and washington got loud about what's actually in our food — a senate move to warning-label the long ingredient lists, fresh science on fat cells and fiber, the dye cleanup reaching the cafeteria. meanwhile the oat aisle split in two: one side chasing popcorn-and-churros novelty, the other standing on clean. we don't have to pick a side of that war. we've been four ingredients you can pronounce the whole time. this week we don't chase the noise — we pour the answer.",
  the_moves:[
    {kind:"ship", verb:"Open Wed Jul 29 with the four-ingredient answer to the Senate's warning-label move — founder on camera, the label leading, the policy as backdrop.", why:"On Jul 24 a Senate committee advanced a bipartisan bill (12-10) to put FDA warning labels on ultra-processed foods and ban junk-food ads aimed at kids — reframing 'processed' around what's actually in the ingredient list. Don't ride the alarm; ride the receipt. Ship the BIG SWING IG Reel \"when they start warning-labeling the long lists, i'll be over here with four ingredients\" Wed Jul 29, 12pm — rideNow, calm reassurance, Original's back label doing the arguing. The shorter the list, the better it reads."},
    {kind:"ship", verb:"Plant the clean-cafe flag on TikTok the same morning — answer the novelty-flavor arms race with foam you can actually read.", why:"Post-earnings in late July a category leader accelerated indulgent novelty barista flavors — Popcorn, Churros, Coconut — plus a matcha push, declaring itself a 'full-on beverages company.' The aisle turned into a dessert cart. Answer velocity with clarity, not another gimmick. Ship the BIG SWING TikTok \"the oat aisle went full dessert cart — your latte didn't order dessert\" Wed Jul 29, 10am — rideNow, Barista's 50% less sugar than other barista oat milks, no rapeseed, foam you can read."},
    {kind:"ship", verb:"Let culture carry the reach Thursday — the dairy-free cloud-coffee float at noon and the draw-your-ingredients meme at 6pm.", why:"Cloud coffee — a coconut-water americano under a dense whipped-oat float — is peaking across FoodTok, and oat milk's the preferred base because the float holds instead of thinning the drink. Pair it with the hand-drawn-to-real format ('Colette' audio) where a sketch morphs into the real thing on the beat. Ship the cloud-coffee Reel Thu Jul 30, 12pm and the rideNow meme \"draw every ingredient in your oat milk. (we'll wait.)\" Thu 6pm — the format does the reach, and the payload is literally four ingredients drawn to life."}
  ]
};


const WELCOME_HIGHLIGHTS = [];


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
  "The Senate just moved to put warning labels on ultra-processed foods — what's the calmest way to show that Willa's four-ingredient label is already the opposite of that, without sounding preachy or scaring parents?",
  "Cloud coffee is all over my feed right now — can you help me build the dairy-free Willa's version so the whipped-oat float actually holds instead of thinning the drink?",
  "There's a 'Gummy Bear Mom' thing going around about balanced, no-drama feeding — how do I make Willa's Kids the easy middle-ground pour without it turning into a lecture?",
  "The oat aisle is going full novelty flavors — popcorn, churros, all of it — how do we plant a cheeky clean-cafe flag with Barista that's funny but still lands the 'foam you can actually read' point?"
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
