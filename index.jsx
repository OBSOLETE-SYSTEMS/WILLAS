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
    trend:"A private \"Non-UPF Verified\" seal is landing on real packages — issued by the same body that already verifies Willa's Non-GMO 🏷️",
    detail:"The Non-GMO Project's Non-UPF Verified standard, administered with NSF, has moved from announcement to shelf. Go Raw announced its seal on Aug 11, 2026; Simple Mills said roughly 60% of its products qualified without reformulating a single item; Amy's Kitchen and Spindrift are also on the verified list. A consumer-advocacy critique published Aug 12, 2026 asks the harder question — whether a private badge arriving years ahead of any federal definition is a genuine shortcut for shoppers or one more unverifiable claim on the front of the box.",
    platform:"Certification bodies + food-policy advocacy press",
    views:"National clean-label cycle",
    velocity:"high",
    pillars:[
      "INGREDIENTS/RECIPES",
      "HEALTH/WELLNESS"
    ],
    angle:"Go get the badge. Four ingredients already clears the bar — apply now and let a third party do the arguing on shelf.",
    urgency:"RIDE NOW",
    sources:[
      {label:"Center for Science in the Public Interest · Non-UPF labels: Useful new tool or cause for confusion? (Aug 12, 2026)", url:"https://news.google.com/rss/articles/CBMihwFBVV95cUxQX1pzdGZ5MElWa1lTX3R2dXE4NU1XTzZtVDZhNmd6YmVOOWNFcVQ0N010b0pYd2RJZ3dpWVEwdDZQRHZyYWhGTFFYUUFwY053eWt3VW9ORDRVVHA5dGVFWVJBV2s2WFpZaHF0TzBfTnM4Y3YzUk9teWQ2WHhzdTlyQlJnWnFaVmc?oc=5"},
      {label:"Non-UPF Verified · certification program page (permanent reference, linked from nongmoproject.org)", url:"https://www.nonultraprocessed.org/"}
    ]
  },
  {
    id:"T-2",
    trend:"A House bill would put \"oats\" on the major-allergen line of every label in America 🌾",
    detail:"H.R. 9988, introduced Jul 30, 2026, would amend the Federal Food, Drug, and Cosmetic Act to strike \"wheat\" from the major food allergen definition and replace it with \"gluten-containing grain\" — defined as wheat, rye, barley, oats and crossbreeds such as triticale. It would also require HHS to report on celiac prevalence, diagnostics and prevention. Legal analysis of the bill text published Aug 12, 2026 and food-safety trade coverage Aug 11, 2026. Celiac disease affects roughly 1% of the US population, and oats have been the contested grain in that argument for years.",
    platform:"Federal legislation + food-safety trade press",
    views:"National regulatory cycle",
    velocity:"medium",
    pillars:[
      "PARENTING",
      "INGREDIENTS/RECIPES"
    ],
    angle:"Kids is already free of the top 9. Publish the gluten answer for every SKU plainly, now — before a label rewrite forces it.",
    urgency:"THIS WEEK",
    sources:[
      {label:"The Daily Intake · Bill Introduced into House Would Require Allergen Labeling for Gluten-containing Grains (Aug 12, 2026)", url:"https://www.dailyintakeblog.com/2026/08/bill-introduced-into-house-would-require-allergen-labeling-for-gluten-containing-grains/"},
      {label:"Quality Assurance & Food Safety · Bipartisan Bill Would Expand Major Food Allergen Labeling to Barley, Rye and Oats (Aug 11, 2026)", url:"https://news.google.com/rss/articles/CBMirgFBVV95cUxPc04tbHJsSS1RMlphMmhwNWNSSG1JRDFrX3VsR0VjZG1weVFZUkl5QmVTX2JJbDRqY3A3a0hNeHFIRnJkWF9Tc1NiaDh6UDEwR0RrZjhqUnhna3JOV2lVeGZacXNLczVtTmVNQW91R2JJVkFPVE1MY3FDRFZJVzZxdXJxLUk1OC1jMk51UGlvYmlpb3hBdmxnN3ZuQ0lVQks0WnBWRlg4ZndZZzladHc?oc=5"}
    ]
  },
  {
    id:"T-3",
    trend:"A court just took away the QR code as a way to disclose bioengineered ingredients ⬛",
    detail:"A federal district court in Natural Grocers v. Rollins ordered prospective vacatur of three USDA regulations governing bioengineered food disclosure, rejecting the agency's request to delay parts of it until 2029. Two provisions are going away: the digital-disclosure option that let brands park the disclosure behind a QR code or a text-message line, and the \"detectability\" exemption that excused products whose modified genetic material could not be detected in the finished food. Manufacturers have until Jan 1, 2028 to move to on-package text or a USDA-approved symbol, or the vacatur takes effect automatically. Legal analysis published Aug 17, 2026.",
    platform:"Federal litigation + food-law analysis",
    views:"National regulatory cycle",
    velocity:"medium",
    pillars:[
      "INGREDIENTS/RECIPES",
      "REVIEWS/RECS"
    ],
    angle:"Disclosure is being pushed back onto the box. Willa's prints Non-GMO Project Verified on the front — show the carton, not a scan.",
    urgency:"THIS WEEK",
    sources:[
      {label:"The Daily Intake · Court Sets Jan. 1, 2028, Deadline for Bioengineered Food Labeling Changes (Aug 17, 2026)", url:"https://www.dailyintakeblog.com/2026/08/court-sets-jan-1-2028-deadline-for-bioengineered-food-labeling-changes/"},
      {label:"Genetic Literacy Project · Ultraprocessed foods made with GMO corn or soybeans will have to carry bioengineered labels (Aug 13, 2026)", url:"https://news.google.com/rss/articles/CBMi8gFBVV95cUxQX0EyUnRJNHB4cmxqMGxiV0lrTGJzSnRQZ3BrMGRxbThLYjVJTEZkaHVvblRUUC1pOVYyRk9WMDhvcGNYV0ZsREprblJ3T1lvUllNWWxYVnphSG9VNFpSSEtNdnFOVTdCZEdISGxFcUJHOEJrQWZ5VkZnNVRSU3VYS09PMjhGajdURDNJME4zTXBGTmRkT29FMm81cmFUcUZpNEpwd1NvLWJ5RkZvUVM1T1FwbGJRRFRsMzhiX01kVkllYUF2NEE5TFlrRnJXOUQ2VkRqVWdJRG1QazdLS0dhX3RVbmxOWmJDcWIxYU1CckdCdw?oc=5"}
    ]
  },
  {
    id:"T-4",
    trend:"A national dairy player just quit ready-to-drink oat milk entirely — the reason given was \"lack of demand\" 🥛",
    detail:"Chobani confirmed on Aug 11, 2026 that its drinkable Oatmilk line — Original, Vanilla and Zero Sugar — has been discontinued for lack of demand. Remaining retail stock sells through and will not be restocked, and the company would not say whether seasonal Oat Nog returns for the holidays. It is the second oat line it has walked away from, after quietly dropping its oat creamers around 2022-23. The same day it cut its 2026 earnings outlook to roughly $920 million despite 20% second-quarter revenue growth to $1.15 billion, framing the oat exit as part of a broader pullback from plant-based expansion as material costs rose about $35 million year on year.",
    platform:"Brand confirmation + national business press",
    views:"Category trade + business cycle",
    velocity:"high",
    pillars:[
      "REVIEWS/RECS",
      "INGREDIENTS/RECIPES"
    ],
    angle:"Shelf space is opening, not closing. Answer a retreat with commitment — one piece on why oat, and why we're still here.",
    urgency:"RIDE NOW",
    sources:[
      {label:"Big Box Vegan · Chobani Discontinues Their Oatmilk Line (Aug 11, 2026)", url:"https://bigboxvegan.com/2026/08/11/chobani-discontinues-their-oatmilk-line/"},
      {label:"Bloomberg · Chobani Cuts Annual Earnings Forecast on Rising Material Costs (Aug 11, 2026)", url:"https://www.bloomberg.com/news/articles/2026-08-11/chobani-cuts-annual-earnings-forecast-on-rising-material-costs"},
      {label:"briefs.co · Chobani Cuts Its Profit Forecast as Costs Rise (Aug 11, 2026)", url:"https://www.briefs.co/news/chobani-cuts-its-profit-forecast-as-costs-rise/"}
    ]
  },
  {
    id:"T-5",
    trend:"The clean-label challenger launched a 12g-protein \"whole\" milk replacement — and there's cane sugar in it 🥥",
    detail:"Whole Malk went into Whole Foods, Target and Sprouts nationally on Aug 10, 2026 — a USDA-organic blend of coconut, cashew, soy and pea protein delivering 12g protein per serving with no gums, oils or fillers, fortified with iron, potassium, magnesium, B2, B12 and D. Trade press calls it the brand's biggest innovation to date, coming off a 2025 that hit $94 million in sales, up 46%, on more than 1.4 million units. The ingredient list also carries cane sugar and Himalayan pink salt, and the protein number comes from an added isolate rather than from the grain itself.",
    platform:"Retail rollout + category trade press",
    views:"Category trade cycle",
    velocity:"high",
    pillars:[
      "REVIEWS/RECS",
      "HEALTH/WELLNESS"
    ],
    angle:"\"Whole\" is now being used for a blend. Own the literal version — one whole oat groat, nothing added to hit a number.",
    urgency:"THIS WEEK",
    sources:[
      {label:"FoodBev · Malk unveils brand's 'biggest innovation yet' with clean-label Whole Malk NPD (Aug 10, 2026)", url:"https://www.foodbev.com/news/malk-unveils-brand-s-biggest-innovation-yet-with-clean-label-whole-malk-npd"},
      {label:"Green Queen · Malk Debuts High-Protein Plant-Based Whole Milk After Sales Surged 46% (Aug 12, 2026)", url:"https://www.greenqueen.com.hk/malk-organics-plant-based-whole-milk-high-protein-clean-label-organic-sales/"},
      {label:"The Plant Base · Malk unveils Whole Malk NPD (Aug 10, 2026)", url:"https://www.theplantbasemag.com/news/malk-unveils-brand-s-biggest-innovation-yet-with-clean-label-whole-malk-npd"}
    ]
  },
  {
    id:"T-6",
    trend:"It isn't fiber alone — indigestible plant protein is what steers the gut toward the good metabolites 🧬",
    detail:"\"Digestion-resistant proteins support the healthy metabolite profiles associated with plant-based diets\" ran in the Aug 11, 2026 print issue of PNAS, with the mainstream science write-up following Aug 14, 2026. The researchers name these indigestible plant proteins \"Prif\": they survive intact to the colon and, working alongside indigestible plant fiber, push gut bacteria toward beneficial phenols such as phenylpropionate and hippuric acid and away from harmful ones like p-cresol sulfate. Fiber separately suppresses bacterial breakdown of the body's own mucin proteins. The authors suggest food labels may eventually track resistant protein right next to fiber.",
    platform:"Nutrition science + national science press",
    views:"National health-press pickup",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS",
      "INGREDIENTS/RECIPES"
    ],
    healthSubAngle:"GUT",
    angle:"Stop selling fiber alone. Most oat milks filter out the fiber AND the protein — say them as one sentence, not two claims.",
    urgency:"THIS WEEK",
    sources:[
      {label:"ScienceDaily · When gut microbes run low on fiber, they may start eating you (Aug 14, 2026)", url:"https://www.sciencedaily.com/releases/2026/08/260814235842.htm"},
      {label:"PNAS · Digestion-resistant proteins support the healthy metabolite profiles associated with plant-based diets (print issue Aug 11, 2026)", url:"https://www.pnas.org/doi/10.1073/pnas.2605226123"}
    ]
  },
  {
    id:"T-7",
    trend:"Fiber for IBS just got a top-tier journal's meta-analysis behind it 🌾",
    detail:"A systematic review and meta-analysis of randomized controlled trials on fiber supplementation in irritable bowel syndrome was published in Gastroenterology on Aug 14, 2026, pooling the trial evidence for fiber as a symptom-management strategy. Gut comfort is one of the most-searched and least-answered questions in the plant-milk aisle — most shoppers with sensitive digestion have been told to avoid everything — and this is the first hard-evidence anchor for soluble fiber in that conversation in a while.",
    platform:"Nutrition science + gastroenterology press",
    views:"Clinical + health-press cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS"
    ],
    healthSubAngle:"GUT",
    angle:"Own the gut question the aisle dodges: no gums, no stabilizers, 2g+ prebiotic fiber. Answer it calmly — don't diagnose anyone.",
    urgency:"THIS WEEK",
    sources:[
      {label:"PubMed · Fiber supplementation in irritable bowel syndrome: systematic review and meta-analysis (Gastroenterology, Aug 14, 2026)", url:"https://pubmed.ncbi.nlm.nih.gov/42600900/"},
      {label:"Gastroenterology (ScienceDirect) · Fiber supplementation in irritable bowel syndrome (Aug 14, 2026)", url:"https://www.sciencedirect.com/science/article/pii/S0016508526071477"}
    ]
  },
  {
    id:"T-8",
    trend:"25,000 adults, twelve years: the heaviest ultra-processed eaters carried 40% more type-2 diabetes 📊",
    detail:"The Melbourne Collaborative Cohort study was published Aug 10, 2026 in the Journal of the Academy of Nutrition and Dietetics. It followed 25,214 adults for roughly twelve years and recorded 1,734 new cases of type-2 diabetes. The group eating the most ultra-processed food carried a 40% higher risk than the group eating the least, and body-mass index explained only about a fifth of that association — meaning the effect is not simply \"these foods make you heavier.\" It is a large, well-powered number to use instead of vague processed-food language.",
    platform:"Nutrition science + epidemiology press",
    views:"National health-press pickup",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS"
    ],
    healthSubAngle:"DIABETES",
    angle:"Skip the fear framing. Show what un-processed looks like in a glass — four ingredients, 1g sugar, and it comes from the oats.",
    urgency:"THIS WEEK",
    sources:[
      {label:"PubMed · Ultra-processed food consumption and risk of type-2 diabetes, Melbourne Collaborative Cohort (Aug 10, 2026)", url:"https://pubmed.ncbi.nlm.nih.gov/42575428/"},
      {label:"Journal of the Academy of Nutrition and Dietetics · Ultra-processed food consumption and risk of type-2 diabetes (Aug 10, 2026)", url:"https://doi.org/10.1016/j.jand.2026.156434"}
    ]
  },
  {
    id:"T-9",
    trend:"Where fiber's fermentation lands in the gut is what decides how full you feel 🔬",
    detail:"A randomized crossover trial published in the American Journal of Clinical Nutrition on Aug 10, 2026 delivered short-chain fatty acids — the compounds gut bacteria make when they ferment fiber — directly to either the small intestine or the colon in 28 healthy adults. Colonic delivery produced more PYY, the fullness signal. Small-intestinal delivery unexpectedly produced more GLP-1 and higher circulating short-chain fatty acids. Glucose and insulin responses didn't differ by site, but appetite did. The conclusion is that where fiber's byproducts land shapes the hormonal payoff — not just how many grams are printed on the front.",
    platform:"Nutrition science + clinical trial press",
    views:"Clinical + health-press cycle",
    velocity:"medium",
    pillars:[
      "HEALTH/WELLNESS"
    ],
    healthSubAngle:"GLP-1",
    angle:"Go one level below the protein-sticker crowd: explain in plain words why oat fiber actually holds you. Once, well, not weekly.",
    urgency:"BACKGROUND",
    sources:[
      {label:"PubMed · Small intestinal versus colonic short-chain fatty acid delivery: randomized crossover trial (AJCN, Aug 10, 2026)", url:"https://pubmed.ncbi.nlm.nih.gov/42575284/"},
      {label:"American Journal of Clinical Nutrition · Small intestinal versus colonic SCFA delivery (Aug 10, 2026)", url:"https://doi.org/10.1016/j.ajcnut.2026.101470"}
    ]
  },
  {
    id:"T-10",
    trend:"While one giant quit the category, the supply chain spent the same week adding capacity 🏭",
    detail:"Scoular announced on Aug 11, 2026 that it is expanding dehulled soybean capacity at its Covington facility specifically to meet rising demand from plant-based milk manufacturers. Three days later, on Aug 14, 2026, a German dairy company opened a dedicated plant-based facility for milk and yogurt production. Both are capital commitments with multi-year horizons, made inside the same seven days a major US player publicly walked away from drinkable oat milk citing lack of demand. The people who supply this category are not reading the same story as the people exiting it.",
    platform:"Ingredient supply + category trade press",
    views:"Category trade cycle",
    velocity:"medium",
    pillars:[
      "REVIEWS/RECS"
    ],
    angle:"Confidence is a content position. Post like a brand with a decade ahead of it, not one defending its own aisle.",
    urgency:"BACKGROUND",
    sources:[
      {label:"Green Queen · Scoular Expands Dehulled Soybean Capacity to Meet Rising Demand for Plant-Based Milk (Aug 11, 2026)", url:"https://www.greenqueen.com.hk/scoular-soybean-dehulling-capacity-plant-based-food-milk-covington/"},
      {label:"Plant Based News · German Dairy Company Opens Plant-Based Facility For Milk And Yogurt (Aug 14, 2026)", url:"https://plantbasednews.org/news/alternative-protein/german-dairy-company-plant-based-facility/"}
    ]
  }
];



const TICKER = [
  {agent:"trend", text:"a third party finally wrote the ultra-processed bar down, so the week opens on \"we've been waiting for somebody to write the test\" — and never claims a badge we haven't applied for."},
  {agent:"editor", text:"killed the self-certification follow-up despite a full news cycle behind it — the only new fact is a docket number, and that lane ran last Monday."},
  {agent:"comp", text:"a national player quit ready-to-drink oat milk, so Wednesday noon answers with \"the recipe came from a kitchen. the carton was the only new part\" — and never mentions that anyone left."},
  {agent:"comp", text:"reframed the 12g-protein launch off a scoreboard we'd lose — \"protein has a return address. ours says oats\" asks where it came from instead of whose number is bigger."},
  {agent:"pulse", text:"the kitchen-scale video became an invitation, not a pile-on: \"we built this carton to be checked.\" nobody gets named and no carton goes on a scale."},
  {agent:"trend", text:"a bill would put oats on the major-allergen line, so the Kids answer publishes while it's still a choice — \"you shouldn't have to read a carton twice.\""},
  {agent:"editor", text:"benched back-to-school entirely after three straight weeks — a state school-food law is held as the first candidate when a slot opens."},
  {agent:"pulse", text:"passed on the biggest challenge of the week by volume — a finger-count dance has no payoff slot a carton can occupy."},
  {agent:"hook", text:"gave the sugar truth its own object: \"kinda chic that the only sugar in it came from the oats.\" one line, one carton, no second sentence."},
  {agent:"visual", text:"the illusion-plus-proof pour ships only if the pour is real — no thickener, no prop milk, kill the brief before faking a proof shot."},
  {agent:"paid", text:"amplification concentrates on the two Wednesday briefs plus the creamy lemonade build — the founder stance takes the smallest and tightest spend on the board."},
  {agent:"perf", text:"Pinterest has posted the lowest reach and the highest save rate three refreshes running, so all three pins are built as save objects rather than news rides."}
];


const COMPETITORS = [
  {
    id:"C-1",
    name:"Chobani",
    color:"#1E4C8A",
    status:"Confirmed on Aug 11, 2026 that its ready-to-drink Oatmilk line — Original, Vanilla and Zero Sugar — is discontinued for lack of demand, with remaining stock selling through and no restock planned; it declined to confirm whether seasonal Oat Nog returns. It is the second oat line the company has abandoned after quietly dropping its oat creamers around 2022-23. The same day it cut its 2026 earnings outlook to roughly $920 million despite 20% Q2 revenue growth to $1.15 billion, explicitly framing the exit as part of a wider retreat from plant-based expansion as material costs climbed about $35 million year on year.",
    direction:"down",
    opportunity:"A giant leaving on 'lack of demand' is a confidence test, not a verdict. Answer with commitment and the whole-oat reason we're here.",
    sources:[
      {label:"Big Box Vegan · Chobani Discontinues Their Oatmilk Line (Aug 11, 2026)", url:"https://bigboxvegan.com/2026/08/11/chobani-discontinues-their-oatmilk-line/"},
      {label:"Bloomberg · Chobani Cuts Annual Earnings Forecast on Rising Material Costs (Aug 11, 2026)", url:"https://www.bloomberg.com/news/articles/2026-08-11/chobani-cuts-annual-earnings-forecast-on-rising-material-costs"}
    ]
  },
  {
    id:"C-2",
    name:"MALK Organics",
    color:"#6B8E3D",
    status:"Launched Whole Malk nationally into Whole Foods, Target and Sprouts on Aug 10, 2026 — a USDA-organic coconut, cashew, soy and pea-protein blend at 12g protein per serving, no gums, oils or fillers, fortified with iron, potassium, magnesium, B2, B12 and D, and positioned as a true everyday whole-milk replacement for coffee, cereal, cooking and baking. Trade press calls it the brand's biggest innovation to date, off a 2025 of $94 million in sales, up 46%. The ingredient list also carries cane sugar, and the protein figure comes from an added isolate rather than the grain.",
    direction:"up",
    opportunity:"They raised the protein bar with an isolate and borrowed the word 'whole.' Willa's earns both from the groat — show that difference plainly.",
    sources:[
      {label:"FoodBev · Malk unveils brand's 'biggest innovation yet' with clean-label Whole Malk NPD (Aug 10, 2026)", url:"https://www.foodbev.com/news/malk-unveils-brand-s-biggest-innovation-yet-with-clean-label-whole-malk-npd"},
      {label:"Green Queen · Malk Debuts High-Protein Plant-Based Whole Milk After Sales Surged 46% (Aug 12, 2026)", url:"https://www.greenqueen.com.hk/malk-organics-plant-based-whole-milk-high-protein-clean-label-organic-sales/"}
    ]
  },
  {
    id:"C-3",
    name:"The Non-UPF Verified early movers",
    color:"#8A6FA8",
    status:"Clean-label brands are claiming the Non-GMO Project and NSF 'Non-UPF Verified' seal ahead of any federal definition. Go Raw announced its verification on Aug 11, 2026; Simple Mills said roughly 60% of its portfolio qualified without reformulating anything; Amy's Kitchen and Spindrift are also on the list. A consumer-advocacy critique published Aug 12, 2026 questions whether a private badge helps shoppers or adds noise — but the badge is being printed either way, and the brands that move first will own the shelf explanation.",
    direction:"up",
    opportunity:"First-mover window on a badge Willa's already qualifies for. Start the application now; the shelf argument gets easier the day it prints.",
    sources:[
      {label:"Center for Science in the Public Interest · Non-UPF labels: Useful new tool or cause for confusion? (Aug 12, 2026)", url:"https://news.google.com/rss/articles/CBMihwFBVV95cUxQX1pzdGZ5MElWa1lTX3R2dXE4NU1XTzZtVDZhNmd6YmVOOWNFcVQ0N010b0pYd2RJZ3dpWVEwdDZQRHZyYWhGTFFYUUFwY053eWt3VW9ORDRVVHA5dGVFWVJBV2s2WFpZaHF0TzBfTnM4Y3YzUk9teWQ2WHhzdTlyQlJnWnFaVmc?oc=5"},
      {label:"Non-UPF Verified · certification program page (permanent reference, linked from nongmoproject.org)", url:"https://www.nonultraprocessed.org/"}
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
    id:"AUG17-TT-1",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"mom-activist",
    timing:"Wed Aug 19 · 9am",
    priority:"BIG SWING",
    concept:"\"we've been waiting for somebody to write the test.\" — the argument finally gets a bar",
    intel:[
      {type:"TREND", text:"T-1: Go Raw earned Non-UPF Verified certification for its Organic Sea Salt Sprouted Pumpkin Seeds on Aug 11, 2026 — the newest name to clear a third-party standard that's been testing real products since earlier this year (Amy's Kitchen, Simple Mills and Spindrift were among the first wave verified, back in Feb 2026 — not new this week, but still standing). Go Raw's own line on why it applied was blunt: 'isn't about changing what we make — it's about validating the standards we've held ourselves to for more than 20 years.' No federal definition of 'ultra-processed' exists yet — Washington is still drafting one — so a private group writing its own testable bar, ahead of any government line, is the actual news. T-8 is the reason the stance carries weight: a multi-year, growing body of research keeps tying heavy ultra-processed intake to worse metabolic and diabetes outcomes — that's durable backdrop, not a headline this week, and no specific study or figure should be cited here without a fresh in-window source. HARD LINE FOR CONSUMER COPY — the seal is NOT on Willa's carton, Willa's has not applied for it, and no line in this brief may name a badge, a mark, or tell a shopper to look for one. The story is that the bar exists and real products are clearing it as-is, not that we're on the list."},
      {type:"AUDIENCE", text:"Three years of 'ultra-processed' talk has left the shopper with a vocabulary and no ruler — she can use the phrase in a sentence and still can't apply it standing in the aisle, which is exactly why the term has started to feel like noise to her. The relief on offer is not another warning; it's the news that the argument now has a line somebody outside the industry drew, and that clearing it apparently didn't require anyone to change what they make. Hand her that, calmly, then put four things she recognizes on a counter and let her do the rest. The persuasion is the ordinariness of the four objects, not the size of the claim."},
      {type:"COMPETITOR", text:"C-3 (INTERNAL): the early movers on this standard are clean-label brands claiming the ground before any official definition exists, and the first-mover window is real — the shelf argument gets materially easier for whoever prints it first. That is a business decision for the team, not a content beat, and it is the single most valuable thing in this week's competitor read. Nothing about the certification program, the certifying bodies, the early-mover brands, or Willa's own eligibility is spoken on camera, written on screen, or referenced in any caption variant."}
    ],
    hooks:[
      {text:"for years, 'ultra-processed' was an argument. somebody finally wrote it down as a test.", recommended:true},
      {text:"four things on a counter. that's the whole list, and it's the whole answer.", recommended:false},
      {text:"the bar for 'ultra-processed' finally exists. our four lines haven't moved since 2021.", recommended:false}
    ],
    caption:"We've been waiting for somebody to write the test. 🌾\n\nWilla's Original is four things: organic whole grain oats, filtered water, organic vanilla extract, sea salt. You could set all four on a counter and point at them one at a time.\n\nHere's what changed. For years, \"ultra-processed\" — food assembled from parts you'd never cook with at home — has been an argument with no ruler. Everyone had a position, nobody had a line. Earlier this year, a third party finally put that line on paper and started testing real products against it. This month, another one cleared it without changing a single ingredient.\n\nThat's the part worth sitting with. The bar didn't ask anyone to reformulate. It asked what was in there.\n\nWilla's has been pouring the same answer since 2021 — the whole oat groat, whole oat kernels, like steel-cut oats before they're rolled. Most oat milks filter out the bran and germ, then process the starch into sugar, and the fiber AND the protein leave with it. Ours stay: 4g+ protein, 2g+ prebiotic fiber, 1g of sugar that comes from the oats.\n\nAn argument you can't settle is exhausting. A bar you can see is a gift.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#ultraprocessed",
      "#wholeoat",
      "#cleaningredients",
      "#plantmilk",
      "#realfood",
      "#fouringredients",
      "#labelcheck"
    ],
    visual:"Reserved founder-activist slot, and deliberately a different shape from a talking-head: the four ingredients are the co-star and they arrive as real objects, not as text. Bright real kitchen, pale wood counter, cream wall, hard morning window light from camera-left with no fill and no diffusion — 9am light, not studio light. Palette is cream + navy ink (#202A44) typography, with creamy blue (#73B2C9) spent exactly once, on the single line about the bar. Camera is a static tripod at counter height, framed slightly wide so Christina's hands and the empty counter surface both live in the shot; she is in frame from the chest up at camera-left, the bare counter runs to camera-right, and that empty space is the whole visual promise — it is going to get filled. Four objects land there in order: a small bowl of dry oats, a clear glass of water, a short amber bottle of vanilla extract, a pinch dish of sea salt. They are set down deliberately, one per beat, with a real sound on each. Willa's Original enters LAST, placed behind the four so the line reads left to right as ingredients-then-carton, and it does not move again. No headline screenshots, no document B-roll, no red arrows, no logos, no badges, no seals, no certification marks on screen at any point — nothing that could read as a mark Willa's is claiming. On-screen text is lower-third, one clean line at a time, never stacked more than four deep. The gravity is Patagonia: a person saying something true in her own kitchen at conversational volume, with four ordinary objects doing the arguing for her.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Cold open, no title card, no B-roll runway. Static tripod at counter height, hard window light camera-left: Christina already mid-thought at camera-left with an empty pale-wood counter running to camera-right. She is calm and unhurried. Spoken: 'for years, \"ultra-processed\" was an argument. somebody finally wrote it down as a test.' On-screen text, navy on cream, lower third: 'for years this was only an argument.'"},
      {scene:"THE COUNTER", time:"3-10s", action:"No cut, camera does not move. She sets four real objects onto the empty counter, one per beat, roughly 1.4s apart, each with an audible set-down: a small bowl of dry oats, a clear glass of water, a short amber bottle of vanilla extract, a pinch dish of sea salt. She names each one as it lands. On-screen text ticks in beside each object as it appears: 'organic whole grain oats' / 'filtered water' / 'organic vanilla extract' / 'sea salt'. Then a hand reaches in and sets Willa's Original down BEHIND the four, label forward, and leaves it. Single line lands under the row: 'four things you can point at.'"},
      {scene:"THE BAR", time:"10-16s", action:"Same locked frame, no cut, four objects and the carton holding in the lower third. She explains it plainly, no scare words, no raised voice: for years there was no ruler for this — everyone had a position, nobody had a line, and earlier this year a third party put the line on paper and started testing real products against it. Then the beat that matters: this month, another one cleared it without changing a single ingredient. One creamy-blue (#73B2C9) overlay appears and holds through the beat: 'somebody drew the line. then started testing against it.' It fades before she finishes. NOTHING appears on screen resembling a seal, badge, mark or logo, and she does not name the program or the bodies behind it."},
      {scene:"THE WHOLE OAT", time:"16-21s", action:"First and only camera move: slow 3-second push-in past her shoulder to the four objects and the carton. She delivers the whole-oat line — most oat milks filter out the bran and germ and process the starch into sugar, and the fiber AND the protein leave with it; Willa's uses the whole oat kernel, like steel-cut oats before they're rolled. As she says it, her hand tilts the bowl of oats slightly toward camera so the whole kernels catch the light. Navy overlay ticks in beside the carton: '1g sugar · 4g+ protein · 2g+ prebiotic fiber.'"},
      {scene:"END CARD", time:"21-25s", action:"Hard cut back to the wide static frame, one full beat of silence before she speaks. Straight to camera: 'we've been waiting for somebody to write the test.' Cut to a plain cream card, navy type, no motion: 'four ingredients. (read 'em.)' Hold 1.5s. Willa's wordmark bottom-centre. No music sting, no whoosh, no badge, no cert lockup."}
    ],
    audio:"Founder sync sound — Christina on camera, live room tone only through the first fourteen seconds so the four set-downs are the only percussion in the piece. Close-mic the counter: the bowl, the glass, the bottle and the dish each need a real audible landing, and the carton's set-down is the fifth and softest. A single sustained low string enters under THE WHOLE OAT and resolves on the end card. No trending sound, no sped-up edit, no bass drop, no caption-read-aloud energy. Editor's note: leave the full beat of silence before the closing line in — it is the line.",
    duration:"23-25 seconds",
    cta:{soft:"save this for the next time somebody asks what 'ultra-processed' actually means.", medium:"pour Willa's Original — four things, and you can point at all four.", strong:"Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 1g sugar from the oats, 4g+ protein, 2g+ prebiotic fiber."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"AUG17-IG-R1",
    platform:"Instagram Reel",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Multi",
    dnaPattern:"at-shelf-moment",
    timing:"Wed Aug 19 · 12pm",
    priority:"BIG SWING",
    rideNow:true,
    concept:"\"the recipe came from a kitchen. the carton was the only new part.\" — one-take founder answer",
    intel:[
      {type:"TREND", text:"T-4 + T-10 — INTERNAL ONLY, and this one is absolute: not a single fact in this paragraph reaches a consumer-facing line. A national dairy player confirmed on Aug 11, 2026 that its ready-to-drink oat milk line is discontinued for lack of demand, remaining stock selling through with no restock planned, and cut its 2026 earnings outlook the same day while framing the move as a wider pullback from plant-based expansion. Inside the same seven days the people who actually supply this category moved the opposite way: an ingredient processor announced expanded dehulled soybean capacity on Aug 11, 2026 specifically to meet rising plant-milk demand, and a German dairy company opened a dedicated plant-based milk and yogurt facility on Aug 14, 2026. Two multi-year capital commitments against one exit. That contradiction is the entire reason this brief is a BIG SWING and it is the one thing the audience must never hear. No exits, no demand, no forecasts, no shelf space, no 'the category is fine.' The customer gets a founder answering a plain question, and the confidence does the work the argument would have done worse."},
      {type:"AUDIENCE", text:"The person standing in front of the chilled set is not weighing a category — she is deciding whether an unfamiliar carton is worth more than the familiar one beside it, and the one thing a large brand structurally cannot copy is a founder who will stand next to her own product and say plainly why it exists. That makes this the week to spend one of Christina's three on-camera slots: Pattern 01 (People-on-Camera Amplification) stacked on Pattern 06 (Founder Humanization), in Ghia's founder-calling-a-longtime-customer warmth crossed with Graza's co-founder-letter register. The failure mode here is polish, not nerves. A clean, well-lit, perfectly delivered take reads as an ad; the take where she pauses a half-second too long before 'Willa was my grandmother' is the one that works. Cast the imperfect take on purpose, and cut nothing."},
      {type:"COMPETITOR", text:"C-1 (INTERNAL): the brand that walked away is never named, never shown, never implied — no defocused label a viewer could identify, no 'unlike some,' no knowing look to camera. This is also why the brief carries hard shoot constraints the auditor should check line by line: no retailer signage, logos, wayfinding, shelf tags or price tags anywhere in frame, and no store counts, state counts or distributor references anywhere in copy, per the internal-only retail-footprint rule. The competitive read sets the timing of this post. It contributes nothing to its content."}
    ],
    hooks:[
      {text:"the reason this carton exists has nothing to do with oat milk.", recommended:true},
      {text:"we get asked why we make this. here's the whole answer, no cuts.", recommended:false},
      {text:"the recipe was already in the family. the carton was our idea.", recommended:false}
    ],
    caption:"Christina, in the chilled aisle, answering the question she gets asked more than any other: why make this at all? 🥛\n\nWilla was her grandmother. She cooked with real food, and she had a way of making everyone at her table feel like the most interesting person in the room. Willa's exists to keep doing both.\n\nWilla's Original is four organic ingredients — whole grain oats, filtered water, vanilla extract, sea salt. It's made from the whole oat groat, whole oat kernels like steel-cut oats before they're rolled, which is why it pours rich and smooth. 4g+ protein, 2g+ prebiotic fiber, and 1g of sugar that comes from the oats.\n\nCertified organic. Certified glyphosate-free, tested every lot. Mother-founded, WBENC certified.\n\nThe recipe came from a kitchen. The carton was the only new part.\n\nWe'll be right here. 🌾",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#motherfounded",
      "#wbenc",
      "#womenowned",
      "#cleaningredients",
      "#plantmilk",
      "#realfood"
    ],
    visual:"One unbroken handheld take, start to finish — there is no cut anywhere in this Reel and the scene list below is beats, not edits. Vertical 9:16, 35mm equivalent, operator moving on foot at chest height, breathing visible in the frame. The location is a real refrigerated plant-milk set, and the single hardest constraint is anonymity: no retailer signage, logo, wayfinding, shelf tag, price tag, endcap graphic or uniformed staff may appear in any frame, and every non-Willa's carton is either faced away or held far enough out of focus that no label is legible. Shoot at a low-traffic hour with permission secured in advance. Willa's is the only readable brand on screen and is in frame for effectively the entire runtime. Light: the case throws cold fluorescent, so carry a single small warm LED or a bounce card just off-lens to put daylight back in Christina's face — the grade should land bright and warm on her skin and let the case stay cool and blue behind her, which is what separates this from muted brand-kitchen stock. Typography is navy ink (#202A44) on a translucent cream (#FAFAF7) bar, with purple (#A191B2) reserved for the single low-third accent line; text enters as clean single lines and never stacks more than four deep. She wears no visible logo. The hero frame is her thumb tracing four lines on the ingredient list with the carton label filling the right two-thirds — that frame is the proof, so the operator steps in physically to get it and never zooms. Final frame is the Willa's set alone on the shelf, faced up and in focus, after she has walked out of the left of frame.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Handheld, chest height, following a step behind Christina as she turns into the chilled aisle — refrigerated case running out of focus behind her, no signage or shelf tags legible anywhere in frame. She reaches the Willa's set and turns back toward the lens mid-step, no mark hit, slightly off-balance. On-screen text drops in on a translucent cream bar, navy: 'the reason this carton exists has nothing to do with oat milk.' No music yet — refrigerated-case hum and footsteps only."},
      {scene:"THE QUESTION", time:"3-8s", action:"No cut. She takes Willa's Original off the shelf one-handed and holds it label-forward at chest height. Straight to lens, unhurried, conversational volume: 'People ask why we make this.' Beat — hold the pause, do not trim it. Then: 'Willa was my grandmother.' Operator steps in six inches on the line, no zoom. No text overlay on this beat; her face carries it. Warm acoustic bed fades in underneath after the second line."},
      {scene:"THE KITCHEN", time:"8-13s", action:"No cut. She turns the carton a quarter-turn in her hands, thumb landing on the ingredient list without looking at it. Still to lens: 'She cooked with real food. And she had this way of making whoever was at her table feel like the most interesting person in the room.' Small beat, half a smile: 'That's the whole idea.' Purple low-third line types on and holds: 'not a lab. a kitchen.'"},
      {scene:"THE FOUR LINES", time:"13-19s", action:"No cut. She tips the carton so the ingredient list faces the lens and the operator steps in to a loose close-up, label filling the right two-thirds of frame, her thumb moving down the list as she reads it out loud, flat and unsold: 'Organic whole grain oats. Filtered water. Organic vanilla. Sea salt.' Music drops out entirely under this beat — room tone and her voice only. Four navy check lines tick on beside her thumb, one per ingredient, nothing more: 'organic whole grain oats ✓' → 'filtered water ✓' → 'organic vanilla ✓' → 'sea salt ✓'."},
      {scene:"THE LINE", time:"19-24s", action:"No cut. Music back in. Operator steps out and back to reveal the full Willa's set faced up on the shelf beside her — Original, Chocolate, Kids and Barista, all four label-forward. She slots the Original back into its gap with two hands and squares it with her fingertips, then looks up to lens: 'The recipe came from a kitchen. The carton was the only new part.' Beat, quieter, almost thrown away: 'We'll be right here.'"},
      {scene:"END CARD", time:"24-27s", action:"No cut. She lets her hand fall from the shelf and walks out of the left of frame; the operator holds, and the Willa's lineup sits alone on the shelf in focus with the cold case light behind it. On-screen text centers underneath, navy on cream: 'Mother-founded. WBENC-certified. Built to outlive me.' Music resolves and stops on the last frame — no button, no whoosh."}
    ],
    audio:"Sync sound, founder on camera — Christina speaks live to lens and there is no voiceover, no ADR and no narration anywhere in the piece. Lav under the collar plus a shotgun overhead; keep the refrigerated case hum in the mix rather than gating it out, because the hum is the proof the aisle is real. Music enters only after 'Willa was my grandmother' — a warm, unhurried acoustic bed with real strings, no drums, no lyric, no trending sound, sitting far under the dialogue and never swelling. Music cuts to silence entirely under THE FOUR LINES so the ingredient list reads in room tone, then returns for the last line and resolves flat on the final frame. Her delivery direction is the whole job: conversational, half a beat too slow, zero pitch energy. If a take sounds like it was written, use a different take.",
    duration:"26-28 seconds",
    cta:{soft:"send this to whoever in your life still thinks all oat milk is the same thing.", medium:"pour Willa's Original — four organic ingredients, made from the whole oat.", strong:"find Willa's in the refrigerated plant-milk set — Original, Chocolate, Kids and Barista, all organic, all certified glyphosate-free and tested every lot."},
    benefitShorthandId:"BS-12"
  },
  {
    id:"AUG17-PIN-1",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Chocolate",
    dnaPattern:"viral-recipe-remix",
    timing:"Wed Aug 19 · 2pm",
    priority:"STANDARD",
    concept:"\"two ingredients — and one of them won Best Beverage.\" — dairy-free croissant ice cream sandwich pin",
    intel:[
      {type:"PULSE", text:"CP-4: the two-ingredient croissant ice cream sandwich — split a croissant, pack it with ice cream, freeze it, slice it — is the dessert build food accounts are testing right now, with fresh taste-test coverage landing Aug 16, 2026 alongside a wider homemade-ice-cream wave. The trigger for shipping it Aug 19 rather than later: the format is at the testing stage, not the saturation stage, and the ice cream inside is the one slot nobody has claimed with a clean ingredient list. Willa's Chocolate is structural here — 1½ cups churned into the base, not a splash."},
      {type:"AUDIENCE", text:"A cut cross-section is the single most-saved shape on Pinterest food — flake against cold reads instantly at thumbnail size and keeps pulling saves long after the format cools on video platforms. This is the week's one indulgent-remade-clean slot and Chocolate is the only SKU that should hold it. The dairy trap is the croissant itself, so the ingredient list has to send the buyer to the label instead of vouching for a specific store product's dairy status; a Willa's buyer who trusts a claim we can't stand behind and finds dairy in the layers will not make it twice."},
      {type:"COMPETITOR", text:"INTERNAL ONLY — chocolate plant-milk SKUs across the category get shelved as either a kids' cup or a sugar-forward treat, and none of them are being briefed as a dessert base. Willa's Chocolate is the one with real cacao, coconut sugar instead of cane, and a Good Food Awards Best Beverage win to carry an ingredient argument inside a dessert format. No brand is named in caption, overlay or pin copy — the contrast is the flake and the list, not a comparison."}
    ],
    hooks:[
      {text:"dairy-free croissant ice cream sandwiches (2 ingredients, no ice cream maker)", recommended:true},
      {text:"let's make croissant ice cream sandwiches (dairy-free!)", recommended:false},
      {text:"the flakiest ice cream sandwich of the summer — and the cleanest thing in the freezer", recommended:false}
    ],
    caption:"The best dessert on the internet right now is a croissant that spent the night in the freezer. 🥐🍫 Split it, pack it with chocolate oat milk ice cream, freeze it solid, then cut it straight down the middle — the flake against the cold is the entire reason this one travels.\n\nWilla's Organic Chocolate Oat Milk is made with real cacao and five simple organic ingredients, with 50% less sugar — rich and creamy enough to churn into actual ice cream instead of just flavoring it. It won Best Beverage at the Good Food Awards. 🥛\n\nTwo ingredients. One of them won Best Beverage.\n\nIngredients\n- 1½ cups Willa's Organic Chocolate Oat Milk\n- ½ cup canned coconut cream, chilled\n- 2 tbsp maple syrup\n- 1 tbsp organic cacao powder\n- pinch of sea salt\n- 4 dairy-free croissants — a vegetable-oil-based puff pastry or crescent dough rolled and baked works, but read the label before you buy: several mainstream doughs skip butter and still list whey or milk. A bakery croissant marked vegan or dairy-free is the safest swap if your store carries one\n- flaky sea salt, to finish\n\nBlend, freeze 4 hours, stirring every hour (no ice cream maker needed). Split the cooled croissants, pack them full, freeze 2 more hours, then slice.",
    hashtags:[
      "#willas",
      "#chocolateoatmilk",
      "#dairyfreedessert",
      "#croissanticecreamsandwich",
      "#dairyfreeicecream",
      "#oatmilkicecream",
      "#nochurnicecream",
      "#realcacao",
      "#cleaningredients",
      "#summerdessert"
    ],
    visual:"Vertical 2:3 pin built on one image, not a grid — the cut cross-section is the whole thing. Hero frame is a single sandwich standing cut-face to camera on a pale wooden board, sliced clean with a hot knife so the layers read: flaked pastry on top, a thick dark band of chocolate oat ice cream through the middle, flaked pastry beneath, one visible bead of melt starting at the bottom edge. Shoot it straight-on at sandwich height with a 50mm, shallow depth of field, so the flake catches light and the cold face stays matte — that contrast IS the image and nothing else in frame is allowed to compete with it. Late-afternoon window light from camera left, hard enough to throw a real shadow, no diffusion, no filter, no fake frost. Palette is cream, deep cacao brown, and green (#75C596) as the only accent; type is navy (#202A44). ONE clean line of type across the upper third — 'DAIRY-FREE CROISSANT ICE CREAM SANDWICHES' — set large in navy on cream with a thin green rule beneath it, and one small kicker at the base: 'two ingredients. one of them won Best Beverage.' That is the total copy on the pin. No infographic, no numbered steps, no ingredient callout stack, no badge cluster — Fishwife / Graza restraint, where the type is confident and the food does the arguing. Willa's Chocolate carton stands at frame right in soft focus, label forward, tall enough to occupy roughly a fifth of the frame so a screenshot of the top two-thirds still contains it. Shoot a second option with a hand lifting one sandwich away from a stack of three, melt threading between them, and use whichever cut face reads sharper. Hands only, no talent on camera.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"pin it for the last hot week of August.", medium:"the ice cream is Willa's Chocolate — real cacao, five organic ingredients, no cane sugar.", strong:"Willa's Organic Chocolate Oat Milk: real cacao, five organic ingredients, coconut sugar instead of cane, 50% less sugar — Good Food Awards Best Beverage."},
    benefitShorthandId:"BS-9"
  },
  {
    id:"AUG17-IG-F1",
    platform:"IG Feed",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Wed Aug 19 · 6pm",
    priority:"HIGH",
    rideNow:false,
    concept:"\"the fiber was never working alone.\" — the protein half of the oat story",
    intel:[
      {type:"TREND", text:"T-6: new nutrition work published Aug 11, 2026 and picked up by the national science press Aug 14, 2026 makes the case that indigestible plant fiber has not been doing the job by itself — the plant proteins that survive digestion intact reach the colon and work alongside it, and the authors even float the idea that labels may one day track resistant protein right next to fiber. That is the whole why-now. INTERNAL ONLY: do not name the journal, the researchers, the coined term for these proteins, or any metabolite in consumer copy, and do not attach a single gut-health outcome to Willa's. Willa's claim on this brief is compositional and nothing more — other oat milks filter out both the fiber and the protein, Willa's keeps both. The science is only why that pair suddenly matters to a reader."},
      {type:"TREND", text:"T-7: a systematic review and meta-analysis of randomized trials on fiber supplementation in irritable bowel syndrome published Aug 14, 2026 puts a top-tier journal behind soluble fiber in the same seven-day window. The useful read is the timing, not the finding: fiber is having its most credible week in the health press at the exact moment the research is saying fiber was never the whole story. That gap is the brief. INTERNAL ONLY — the review, the condition, and any symptom language stay off the post entirely; Willa's does not diagnose, dose, or manage anyone's digestion. Lane discipline: AUG17-PIN-2 owns the gut-comfort / no-gums-no-stabilizers answer this week. This brief stays strictly on the fiber-plus-protein pair so the two don't overlap."},
      {type:"AUDIENCE", text:"Two years of fibermaxxing — TikTok's term for eating more fiber on purpose — trained this reader to find one number on a label and stop reading. Protein got the same solo treatment on a separate shelf. Nobody has told her the two arrive together inside a whole plant, or that the standard oat-milk method removes them together. So the brief's job is one sentence she has never heard said plainly, and the register is aunt-at-the-kitchen-table matter-of-fact: Taboo-as-Normal dialled 30% down from Olipop's crassness, and nowhere near a nutritionist's lecture. Muse is Olipop for the permission to say 'prebiotic fiber' out loud, Kiki Milk for the category posture. One idea per card, benefit first, and the whole-groat 'how' waits until card five."}
    ],
    hooks:[
      {text:"turns out fiber's been getting all the credit for a two-person job.", recommended:true},
      {text:"fiber gets the headlines. the protein next to it does half the work.", recommended:false},
      {text:"shhh… fiber wasn't doing it by itself.", recommended:false}
    ],
    caption:"Willa's Original keeps both halves of the oat — 2g+ prebiotic fiber, the kind your gut bacteria feed on, and 4g+ protein. Per cup. 🌾\n\nThe fiber was never working alone. The aisle has spent two years shouting one number, and the newer nutrition work keeps landing on a pair instead: fiber does part of the job, and the plant protein that makes it all the way through your system intact is pulling its weight right next to it.\n\nWhich is awkward for a category that loses both on the way to the carton. Most oat milks filter the bran and the germ off before the oat ever becomes milk, then process what's left into sugar — and the fiber and the protein were both living in the part that just left. Vs. the average oat milk: under 1g of each.\n\nWilla's never took that shortcut. Whole oat groats go in — bran and germ still attached — so the pair stays put. Four organic ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt. Certified organic. Certified glyphosate-free, tested every lot.\n\nWe didn't add the protein back in. We just never took it out.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#prebioticfiber",
      "#plantprotein",
      "#plantmilk",
      "#cleaningredients",
      "#labelcheck",
      "#realfood"
    ],
    visual:"Static IG Feed carousel, 6 cards, one idea per card and never two. Palette is creamy blue (#73B2C9) and flat cream (#FAFAF7) with navy (#202A44) type — design-led and calm, closer to a zine spread than a nutrition graphic. No talent, no hands except where noted, no infographic arrows, no chart. The structural rule: the two numbers never appear on the same card as the process, and the process does not appear before CARD 5. CARD 1 is pure typography, no product at all — the hook line set large and left-aligned on flat cream with a lot of air around it, the words 'two-person job' the only ones in creamy blue. CARD 2 is a straight-down macro of dry whole oat groats filling the frame edge to edge in warm real window light, small navy overlay bottom-left: 'an oat brings two things worth keeping.' CARD 3 is the hero — Willa's Original carton standing label-forward on a cream surface beside one clear glass, shot straight-on at glass height, carton occupying 40%+ of the frame; two lines of navy type stacked in the negative space at frame left, in creamy blue check ticks: '2g+ prebiotic fiber ✅ · 4g+ protein ✅' with a smaller line beneath, 'per cup.' CARD 4 is the contrast, framed IDENTICALLY to card 3 — same crop, same eye line, same light — but the carton is replaced by a plain unbranded glass on the same cream surface, nothing identifiable, no logo, no label; navy overlay reads 'vs. the average oat milk: under 1g of each.' CARD 5 is the only process card: a hand tilting a small spoon of whole oat groats beside the Willa's Original back label, four ingredient lines legible, overlay in two short lines — 'whole oat groats go in.' / 'bran and germ still attached.' CARD 6 is the end card: the carton alone on a windowsill in late-afternoon light with cream negative space above, the BS-10 stinger set small in navy and written so both halves are named — 'most oat milks filter out the healthiest 30% of the oat — the fiber and the protein both. we don't.' Cards 3 and 4 must be framed identically or the comparison doesn't land, and no card carries more than two lines of copy.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"send this to whoever's been counting only fiber.", medium:"Willa's Original — 2g+ prebiotic fiber and 4g+ protein, in the same cup.", strong:"pour Willa's Original: 2g+ prebiotic fiber, 4g+ protein, 1g sugar from the oats, four organic ingredients, certified organic and certified glyphosate-free, tested every lot."},
    benefitShorthandId:"BS-10"
  },
  {
    id:"AUG17-TT-2",
    platform:"TikTok",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Thu Aug 20 · 9am",
    priority:"HIGH",
    rideNow:true,
    concept:"\"oats. oats. oats. oats.\" — one word doing four jobs on the week's live format",
    intel:[
      {type:"PULSE", text:"CP-1: the dominant format on TikTok the week of Aug 10-17, 2026 has a fixed, dead-simple mechanic — pose a setup question, answer it with the identical one-word answer three or four times, and make each repetition land bigger than the last. It started as a haircut joke and has stretched to justifying any decision, with an active hashtag behind it. Willa's has a one-word answer already sitting on the carton, which is the rare case where the payload doesn't have to be bent to fit the template. Shoot it this week — the format is at peak and a fixed mechanic like this burns out fast."},
      {type:"AUDIENCE", text:"T-6 (INTERNAL — no study, no journal, no researcher and no metabolite name ships in consumer copy): a paper in the Aug 11, 2026 print issue of PNAS, with science-press pickup Aug 14, 2026, found that indigestible plant PROTEIN — not fiber alone — is what steers gut bacteria toward beneficial compounds, and the authors float labels eventually tracking resistant protein right next to fiber. The buyer doesn't need any of that. What it means for this brief is structural: protein and fiber are one sentence, not two claims, and both come from the same place. That is exactly what the one-word joke is already saying — the format is doing the argument for us, so let it."},
      {type:"COMPETITOR", text:"C-2 (INTERNAL — never named on camera, in caption, or in a comment reply): a clean-label peer launched a national whole-milk-replacement blend on Aug 10, 2026 at 12g protein per serving, hitting that number with pea protein and a nut-and-seed blend, and borrowing the word 'whole' for the name. Their answer to 'where's the protein from?' is a list. Willa's answer is one word, and it is the same word as the answer to the sugar question, the texture question and the ingredient question. Do not counter, do not compare, do not subtweet — just run the joke. The single-word answer IS the differentiation, and it lands harder unannotated."}
    ],
    hooks:[
      {text:"where's the protein coming from?", recommended:true},
      {text:"4g+ protein, 1g sugar — one ingredient's responsible for both.", recommended:false},
      {text:"ask it four different ways. you get the same word back.", recommended:false}
    ],
    caption:"Oats. 🌾\n\nWilla's Original is four organic ingredients: whole grain oats, filtered water, vanilla extract, sea salt.\n\n4g+ protein. 2g+ prebiotic fiber — the kind that feeds your gut. 1g of sugar, and it came along with the oats.\n\nCertified organic. Certified glyphosate-free, tested every lot.\n\nRich and smooth, with nothing holding it together but the oat.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#plantmilk",
      "#dairyfree",
      "#cleaningredients",
      "#bobtrend",
      "#realfood"
    ],
    visual:"Bright and high-key, shot flat and deliberately plain — near-white counter (#FAFAF7), cream board, one clear glass, hard mid-morning window light with no diffusion and no filter. Hands and product only; no talent on camera at any point. Every one of the four beats is a LOCKED-OFF frame with a hard cut between them — no push-ins, no whip pans, no transitions. The escalation is entirely in the physical quantity of oat in frame and in the size of the type, never in camera movement and never in the volume of the read. Question text sits top-third in navy (#202A44) at a constant size for all four beats. The answer word sits center-frame in green (#75C596) and grows every beat: beat 1 small and low, beat 2 noticeably bigger, beat 3 bigger again, beat 4 filling the frame edge to edge and slightly overlapping the carton. Willa's Original carton is in frame from beat 2 onward, label forward, and by beat 4 it fills the frame. Nothing else appears on screen — no arrows, no subtitles, no explainer line, no logo bug. If a single word of annotation lands anywhere in the cut, the joke is dead; the plainness is the craft.",
    script:[
      {scene:"BEAT 1 — SPLASH", time:"0-3s", action:"Locked overhead, tight on an empty clear glass on a cream board in hard window light. On-screen text top-third, navy: 'where's the protein coming from?' A hand enters and flicks a small splash of Willa's Original into the bottom of the glass — barely covers the base. Green answer text pops center-frame, small: 'oats'. Hard cut on the downbeat."},
      {scene:"BEAT 2 — POUR", time:"3-6s", action:"Same locked overhead, same glass, no reframe. On-screen text top-third, navy: 'where's the sugar coming from?' Hand enters with the Willa's Original carton label-forward and pours steadily until the glass is two-thirds full. Green answer text pops center-frame, now roughly double the size of beat 1: 'oats'. Hard cut on the downbeat."},
      {scene:"BEAT 3 — GROATS", time:"6-9s", action:"Hard cut to a locked overhead one step wider: the full glass now sits beside a shallow bowl heaped with dry whole oat kernels, carton behind at frame right. On-screen text top-third, navy: 'why's it so creamy?' A hand plunges into the bowl and lets a fistful of oats fall back through the fingers in real time — audible. Green answer text pops center-frame, bigger again, now wider than the glass: 'oats'. Hard cut on the downbeat."},
      {scene:"BEAT 4 — CARTON", time:"9-12s", action:"Hard cut to a locked frontal frame filled edge to edge by the Willa's Original carton, label dead center and fully legible, oats and glass gone. On-screen text top-third, navy: 'what's it made of?' Green answer text lands center-frame at maximum size, overlapping the carton edges: 'oats'. Nothing moves. Hold two full seconds in silence after the word lands."},
      {scene:"END CARD", time:"12-15s", action:"The green word fades off the same locked carton frame; a hand enters from below and turns the carton a quarter-turn to the ingredient list. Slow, single, unhurried move — the only camera-adjacent motion in the whole piece. On-screen text centered underneath in navy: 'four ingredients. (read 'em.)' Cut to black on the beat."}
    ],
    audio:"No music bed of our own. As of this week the format is riding Fat Papi's 'Freaked Out' — but confirm it's still the top sound on the #bobtrend hashtag page the morning of the shoot rather than trusting this reference, because the sound attached to this mechanic turns over fast. Whatever it is, it must have a hard, unmistakable downbeat: all four cuts land on it. Over that, a single deadpan voiceover reads the word 'oats' four times — warm narrative voiceover, not framed as the founder, flat and unbothered, the EXACT same read and the EXACT same volume every time. Do not escalate the read. The whole joke is that the voice never reacts while the picture keeps getting bigger. Splash, pour and falling-oats sounds close-miked and left loud in the mix; the two-second silence after beat 4 is scripted and must not be filled.",
    duration:"15 seconds",
    cta:{soft:"send this to whoever asks what's actually in your oat milk.", medium:"pour Willa's Original — four organic ingredients, and the oat is doing the work.", strong:"try Willa's Original: 4g+ protein, 2g+ prebiotic fiber, 1g sugar from the oats, certified organic and glyphosate-free, tested every lot."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"AUG17-IG-R2",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"viral-recipe-remix",
    timing:"Thu Aug 20 · 12pm",
    priority:"STANDARD",
    concept:"\"watch the yellow go opaque — and hold.\" — creamy lemonade, blended on Willa's Original",
    intel:[
      {type:"AUDIENCE", text:"CP-3: creamy lemonade is the late-summer drink build people are actually testing at home — tart lemonade blended with a creamy element until it lands between a milkshake and a slushie, with the taste-test verdict circulating as 'lemon pie in a glass.' National chains piled into the same idea inside the same window with blended lemonade coolers built on soft serve. The mechanic is entirely milk-dependent: icy-tart base plus a creamy element blended in. That is the one variable in the whole recipe, and it's the exact spot a thin plant milk gets caught out — it goes cloudy, then separates. Willa's is the proof-of-taste slot: the retention beat is the moment the yellow goes opaque and STAYS opaque."},
      {type:"COMPETITOR", text:"C-2 (INTERNAL CONTEXT — not linked, never in consumer copy): a clean-label competitor (MALK Organics) put a 12g-protein 'whole' milk replacement into national retail on Aug 10, 2026 — but the protein comes from an added isolate and the ingredient list carries cane sugar. No trade press, no retailer, no sales figure and no brand name ships in this brief. What it changes is the recipe design: the sweetener here is maple, never cane sugar, and the creaminess has to come from the oat itself rather than anything added to hit a number. That is the difference the blender proves on camera in four seconds — which is cheaper than arguing it."},
      {type:"COMPETITOR", text:"C-1 (INTERNAL CONTEXT — not linked): a national dairy player confirmed on Aug 11, 2026 that it is discontinuing its ready-to-drink oat milk line, citing lack of demand. The brand is never named, referenced or implied anywhere on camera or in caption. It matters here only as posture: the correct answer to a retreat is a piece of content that is confident and appetizing, not defensive. This brief is the delicious beat of the week — no category critique, no rebuttal, no receipts stacked mid-pour. Let the blend make the argument and keep the copy warm."}
    ],
    hooks:[
      {text:"let's make creamy lemonade (dairy-free!)", recommended:true},
      {text:"the tart part is easy. the creamy part is the whole trick.", recommended:false},
      {text:"lemonade goes in. lemon pie comes out.", recommended:false}
    ],
    caption:"The last stretch of August had us craving something icy and sharp — and then, somehow, creamy. 🍋☀️ Creamy lemonade sits right between a milkshake and a slushie, and the whole thing turns on one variable: what you blend in. Watch the yellow go opaque and hold — that's the whole video.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 Four ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt. That's why it blends creamy instead of thin — and why it stays that way in the glass.\n\nIngredients\n- 1 cup Willa's Organic Oat Milk, cold\n- 1/3 cup fresh lemon juice (about 2 lemons)\n- 3 tbsp maple syrup, more if your lemons are mean\n- 1 tsp lemon zest\n- 2 cups ice\n- a pinch of sea salt\n\nBlend the ice, lemon, maple, zest and salt first, then pour in the cold Willa's and blend 20 seconds more. Cold and fast is the trick — it goes opaque and holds. Pour, zest over the top, drink it before it warms up.",
    hashtags:[
      "#willas",
      "#creamylemonade",
      "#oatmilk",
      "#organicoatmilk",
      "#dairyfree",
      "#wholeoat",
      "#dairyfreedrinks",
      "#summerdrinks",
      "#lemonade",
      "#realfood"
    ],
    visual:"Bright, high-key, late-summer kitchen — near-white counter (#FAFAF7), a cream board, one tall clear glass, real lemons cut and messy on the board. Typography is navy ink (#202A44) with green (#75C596) accents on the ingredient lines only. Hands only, no face, no talent on camera. Two camera positions carry it: a locked overhead on the board for the build, and a side-on 50mm at glass height for the blend reveal and the pour. Hard mid-afternoon window light, no diffusion, no filter — lemon yellow should look genuinely acidic on camera, and the glass should throw a real shadow. This is a SINGLE blended drink, not a layered build: the glass fills as one continuous opaque pale-yellow body, no strata, no stripes, no visible line anywhere in the frame. The hero frame is the blender jar mid-blend — sharp translucent yellow turning creamy and opaque in one take — so shoot that until the turn reads clean in a single unbroken shot; do not cut away and come back to it. Willa's Original carton stands label-forward at frame right and never leaves the right third once it enters, in frame for roughly 60% of the runtime. Text enters as single clean lines, never more than two on screen at once. NO nutrition numbers, NO benefit stack and NO certification marks appear anywhere during the pour or the blend — the copy proof lives in the caption and one end card only. Final frame is the full glass sweating in the light with the carton beside it, lemon zest scattered on the counter.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Locked overhead on the cream board: two hands halve a lemon and squeeze it straight into a blender jar already loaded with ice, in one unbroken motion. Juice, pulp, a bit of mess. On-screen text, navy on cream, centered: 'let's make creamy lemonade (dairy-free!)'. Warm voiceover starts over the squeeze."},
      {scene:"THE TART BASE", time:"3-8s", action:"Stay overhead. Hand pours maple syrup from a small glass jug into the jar in a slow ribbon, then grates lemon zest over the top and drops in a pinch of sea salt from finger and thumb. Text lines type on one at a time in green, single lines only: 'fresh lemon' → 'maple to sweeten' → 'zest + a pinch of salt'. Quick 20-frame blend burst — the jar contents are sharp, translucent, aggressively yellow. Hold on that translucency; it's the before."},
      {scene:"THE POUR IN", time:"8-12s", action:"Cut to side-on 50mm at jar height. Hand lifts Willa's Original into frame label-forward, thumbs the cap off, and pours a full measured cup into the jar over the icy yellow base. Shoot it slow-motion — the white column entering the yellow reads as the whole premise. On-screen text, navy, one line: '1 cup Willa's Organic Oat Milk'. Carton is set down at frame right and stays there for the rest of the piece."},
      {scene:"THE TURN", time:"12-17s", action:"Same side-on 50mm, locked, ONE unbroken take, no cuts: blender runs and the jar goes from translucent yellow to fully opaque pale cream-yellow, then keeps running three extra seconds while it holds — no separation, no thinning, no ring at the top. This is the retention shot and it must not be cut away from. No text over the turn itself. As the blade stops, one line fades in low in frame: 'it goes creamy. and it stays creamy.'"},
      {scene:"THE POUR OUT", time:"17-22s", action:"Side-on 50mm, glass height: pour from the jar into the tall clear glass in one continuous motion, filling as a single opaque body — no layers, no stripes. Hand grates one last pass of zest over the top and slides the glass forward into the light. Sound is close-miked: the pour, the glass on the counter. On-screen text, navy, centered: 'lemonade in. lemon pie out.'"},
      {scene:"END CARD", time:"22-24s", action:"Hard cut to a static side-on frame: full glass sweating in hard light, Willa's Original carton label-forward beside it, zest scattered on the cream board. Hand exits frame and leaves both alone in focus. On-screen text centered underneath, navy on cream: 'the whole oat. not the syrup.'"}
    ],
    audio:"Warm narrative voiceover — People-on-Camera Amplification run as VOICE ONLY, no face in frame at any point (the sanctioned substitute; this brief does not use the on-camera quota). Read it like someone talking a friend through it at the counter: unhurried, a little amused, absolutely no wellness-brand earnestness and no nutrition lecture. Not framed as the founder. Poppi's short-form discipline is the reference — fast, satisfying, nothing explained twice. Bright upbeat lo-fi bed sitting low under the VO, and the bed drops out entirely under THE TURN so the blender and the room carry that beat alone, then comes back on the pour out. Blender, ice, pour, zest and glass-on-counter all close-miked and left audible over the VO.",
    duration:"22-24 seconds",
    cta:{soft:"save this one — it's a two-minute drink and it's the last stretch of lemon weather.", medium:"blend it with Willa's Organic Oat Milk and watch it go opaque.", strong:"make creamy lemonade with Willa's Original — four organic ingredients, 1g sugar from the oats, and it blends creamy because it's made from the whole oat."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG17-TT-3",
    platform:"TikTok",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Original",
    dnaPattern:"before-after-stitch",
    timing:"Thu Aug 20 · 7pm",
    priority:"HIGH",
    concept:"\"protein has a return address. ours says oats.\" — the question that beats the number on the front",
    intel:[
      {type:"TREND", text:"T-5: a clean-label challenger rolled a USDA-organic 12g-protein 'whole milk replacement' into Whole Foods, Target and Sprouts on Aug 10, 2026 — a coconut, cashew, soy and pea blend with no gums, oils or fillers, fortified across six micronutrients. Two details make it the week's most useful label story rather than a threat: the ingredient panel names 'pea protein' as a stand-alone added ingredient rather than protein intrinsic to a whole food (press coverage confirms the ingredient list, not the word 'isolate' itself — this is the ingredient-panel read, so keep the brief's own language to 'added to hit the number' rather than the more clinical, unconfirmed term), and cane sugar sits on the ingredient list, confirmed by press. INTERNAL ONLY — the brand is never named, the 12g figure never appears on screen or in caption, and no sales, trade-press or category number ships. The customer hears the question, not the competitor."},
      {type:"AUDIENCE", text:"Protein is now the most-read number on a carton and the least-understood one. The real decision happens in about eight seconds in the chilled aisle, two cartons held up, front-of-pack figures compared, and almost nobody asks where the gram came from — because nothing on the front tells you. That is the confession this brief names, and it has to be named gently: the turn is not 'you were doing it wrong,' it's 'there's a better question.' Relatable Confession only works if the joke is that we are all standing in the same aisle. One word of scolding and the brief dies."},
      {type:"COMPETITOR", text:"C-2 (INTERNAL): the same launch borrows the word 'whole' for a four-plant assembled blend, and that — not the gram count — is the actual opening. 'Whole' is doing positioning work for a formulation that is built rather than intact; Willa's earns the word literally, from one oat groat with the bran and germ still on it. HARD internal guardrails: do NOT counter with a 4-vs-12 scoreboard (a framing Willa's loses and one that misses the point entirely), do NOT run the protein-pay-up or 'they finally caught up' angles (both rested), and do NOT let the 'nothing added to hit a number' line spill onto Willa's Kids — Kids uses organic pea protein by design and that is a separate, parent-led story."}
    ],
    hooks:[
      {text:"the bigger number isn't the question. where it came from is.", recommended:true},
      {text:"we've all grabbed the carton with the biggest number on it. shhh… wrong question.", recommended:false},
      {text:"protein has a return address. worth checking whose.", recommended:false}
    ],
    caption:"Willa's Original has 4g+ protein and 2g+ prebiotic fiber — the kind gut bacteria actually feed on — and both were in the oat before we ever opened the bag. 🌾\n\nHere's the label question worth asking any time a plant milk posts a big protein number: was that protein in the plant, or was it added to the plant to hit the number? Both are legal. Both print the same on the front of the carton. They are not the same food.\n\nAn isolate is protein pulled out of one crop and stirred into another — the fastest way to make a number big. Willa's Original doesn't use one. It's made from the whole oat groat, the whole kernel with the bran and germ still on it, which is why the protein and the prebiotic fiber both survive the trip into the carton. Most oat milks discard the bran and germ, and that takes the fiber AND the protein with them.\n\nThe 1g of sugar came from the oats too. Nothing added to hit a number, at either end of the label.\n\nFour organic ingredients: whole grain oats, filtered water, organic vanilla extract, sea salt. Certified organic. Certified glyphosate-free. We test every lot.\n\nProtein has a return address. Ours says oats.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#plantmilk",
      "#cleaningredients",
      "#proteinsource",
      "#labelcheck",
      "#dairyfree",
      "#realfood"
    ],
    visual:"Vertical 9:16, shot to feel like a real errand and then a real kitchen — the switch arc is carried by the location change, not by an edit trick. Two worlds: the chilled aisle is cool, fluorescent, slightly desaturated, handheld, a little too close; the kitchen is warm, near-white counter (#FAFAF7), cream board, hard morning window light with no diffusion. The cut between them is the whole brief, so it lands hard and unannounced. Hands only, no talent on camera. In every aisle frame, competitor cartons are turned label-away or shot past focus — check playback frame by frame, because one readable competitor logo breaks the no-named-competitor rule on a brief whose entire subject is the category. Typography is navy (#202A44) for everything Willa's says and purple (#A191B2) for the two question lines only, set in a lower-third band, never more than one line at a time — this is a TikTok, the viewer is reading at speed. Willa's Original enters at the halfway point and never leaves frame after that, label-forward, right third. The hero frame is the pour clinging to the inside of a clear glass; it gets the longest hold in the cut because it is the only argument that doesn't need words. Final frame is carton alone in the light. NOTE for the before-after-stitch format: this also runs as a literal stitch — if a UGC clip lands in the queue where someone compares two plant milks by front-of-pack protein, stitch that clip in place of the aisle-POV hook and start the Willa's half on the cut.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Handheld vertical POV walking a chilled plant-milk aisle at eye level, slight motion blur, cooler hum and room tone only, no music. A hand enters frame and reaches for an anonymous carton with the label turned away from camera. On-screen text, navy on a translucent cream band, lower third: 'the bigger number isn't the question.'"},
      {scene:"THE TURN", time:"3-6s", action:"The hand stops mid-reach and pulls back empty. Hard cut to a locked overhead on a cream board where the anonymous carton is set down and rotated a half-turn so its face points away from camera. The navy line wipes off and a purple (#A191B2) line replaces it: 'where it came from is.' A soft acoustic bed drops in on the cut."},
      {scene:"TWO ROADS", time:"6-11s", action:"Locked overhead, cream board, hands only. Two small hand-lettered cards slide in from opposite sides — left reads 'already in the plant,' right reads 'added to hit the number.' A hand pours a small pile of whole oat groats onto the left card, then levels a scoop of plain white protein powder onto the right at the exact same unhurried pace. No voiceover under this beat and no judgment in the framing; the two piles make the point."},
      {scene:"THE ANSWER", time:"11-16s", action:"Cut to side-on 50mm at glass height: Willa's Original pours into a clear glass in hard morning window light, carton label-forward at frame right, the milk leaving a visible coat on the glass wall. Hold long. Text lands in two beats, navy: '4g+ protein · 2g+ prebiotic fiber — already in the oat.' then, centered, 'protein has a return address. ours says oats.'"},
      {scene:"THE FOUR LINES", time:"16-18s", action:"Locked overhead: a hand turns the Willa's Original carton to the ingredient list and a finger traces down it, one line per beat. Text types in beneath the finger: 'organic whole grain oats · filtered water · organic vanilla · sea salt.'"},
      {scene:"END CARD", time:"18-20s", action:"Hard cut back to the side-on frame: full glass and carton together in the light, a hand lifts the glass out of frame and the carton is left alone in focus. Centered text underneath: '1g sugar. zero added.'"}
    ],
    audio:"Warm narrative voiceover — dry, unhurried, curious rather than corrective, and explicitly not framed as the founder. The register to hit is a friend in the aisle next to you, not a nutritionist. Cold open with no music: aisle room tone and cooler hum carry the first three seconds so the confession lands flat and real. The acoustic bed enters on the cut to the overhead and stays low the entire time — it never swells on the pour, because the pour is supposed to feel like an answer, not a reveal. Pour, glass and groat sounds close-miked and left audible over the voiceover. No trending sound is required; if one is added it sits under the voiceover, because the two text turns are the payload and a loud trend sound buries them.",
    duration:"18-20 seconds",
    cta:{soft:"send this to whoever's still comparing the fronts of two cartons in the aisle.", medium:"pour Willa's Original — 4g+ protein and 2g+ prebiotic fiber that were in the oat to begin with.", strong:"try Willa's Original: four organic ingredients, 4g+ protein, 2g+ prebiotic fiber, 1g of sugar from the oats. Certified organic, certified glyphosate-free, and we test every lot."},
    benefitShorthandId:"BS-3"
  },
  {
    id:"AUG17-TT-4",
    platform:"TikTok",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Fri Aug 21 · 9am",
    priority:"HIGH",
    rideNow:true,
    concept:"\"we built this carton to be checked.\" — an open-door dare, aimed at a shopper who already has her phone out",
    intel:[
      {type:"PULSE", text:"CP-7: a video that went wide Aug 11, 2026 shows a shopper unwrapping stick after stick of a packaged staple, putting each one on a kitchen scale, and finding every single one short of what the package promised. The comment section did the thing that matters — people went and checked their own kitchens. INTERNAL ONLY, and this is the sharpest guardrail on the brief: the brand is never named, never shown, never alluded to, and the category it sits in is never mentioned on camera, in caption, or in a comment reply. Willa's does not join a pile-on. The signal Willa's is riding is not the failure — it's the instinct. Shoppers have stopped taking the front of a package on faith, and that is the single best thing that has happened to a brand that survives being checked. The move is to open the door, not to point at someone else's."},
      {type:"TREND", text:"T-1 (INTERNAL — no seal, no certifying body, no advocacy group and no policy language ships in consumer copy): a private 'Non-UPF Verified' standard moved from announcement to actual shelf the week of Aug 10-17, 2026, with the first packages announcing the seal Aug 11, 2026 — and a consumer-advocacy critique published Aug 12, 2026 asked the harder question, whether a private badge arriving years ahead of any federal definition genuinely helps a shopper or just adds one more unverifiable mark to the front of a box. That critique is exactly why this brief exists. The durable answer to badge fatigue isn't a bigger badge — it's a brand that hands you the ways to verify it yourself. Willa's has three that take under a minute: count the ingredients, scan it in the Clean Label App, look up the glyphosate certification with the third party that issued it. Say those out loud and the badge argument stops mattering."},
      {type:"AUDIENCE", text:"The buyer this is written for already has her phone in her hand in the aisle. She is not asking a brand to be trusted — she is asking to be allowed to check, and most brands answer that with a QR code that goes to a marketing page. The deliverable on this post is therefore NOT the video, it's the comment section: assign one person to answer every single question about the four ingredients, the sourcing and the certification through Sat Aug 22, in plain language, with no defensiveness and no deflection to a link. An unanswered question under a post that says 'check us' is the only way this brief can fail. Answered questions are the proof the video is claiming."}
    ],
    hooks:[
      {text:"check us. we're not nervous.", recommended:true},
      {text:"four ingredients, a scan and a certification you can look up. take your time.", recommended:false},
      {text:"shhh… we've been hoping everyone would start checking.", recommended:false}
    ],
    caption:"Four organic ingredients: whole grain oats, filtered water, vanilla extract, sea salt. Count them. 🥛\n\nCertified glyphosate-free by The Detox Project — the third party that tests every lot for weedkiller residue. Look it up without asking us.\n\nScan the carton in the Clean Label App (Yuka scans groceries and scores the ingredients out of 100). Willa's Original comes back 94.\n\n4g+ protein. 2g+ prebiotic fiber — the kind that feeds your gut. 1g of sugar, and it came in with the oats. Most oat milks filter out the bran and germ and process the starch into sugar, which takes the fiber AND the protein with it. Willa's keeps the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled.\n\nGot a question about any of the four? Ask it in the comments. We'll answer every one.\n\nWe built this carton to be checked.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#plantmilk",
      "#cleaningredients",
      "#glyphosatefree",
      "#dairyfree",
      "#labelcheck",
      "#realfood"
    ],
    visual:"One unbroken take, no cuts anywhere in the piece — a locked 50mm at counter height, framed on a cream board against a near-white counter (#FAFAF7) in hard mid-morning window light, no diffusion and no filter. Hands and one Willa's Original carton, nothing else on the surface. No talent on camera at any point. The single line of on-screen text — the invitation — types on in purple (#A191B2) in the first two seconds and STAYS on screen for the entire runtime, top-third, never moving; it is the only piece of copy that appears until the end card. Everything the hands prove happens under that unmoving line, which is the whole design: the dare goes up first, then it just sits there while the evidence stacks. Proof text at the end card lands in navy (#202A44). The carton is label-forward and in frame for 100% of the runtime and never leaves the center third. Two things in frame are non-negotiable production guardrails: there is NO kitchen scale anywhere in this piece and nothing is ever weighed (fill weight varies and it is not a Willa's claim), and there is NO second package, no blurred label, no turned-away carton and no competitor product in the shot at any point — a single carton alone in the light is what keeps this generous instead of a pile-on. Phone screens that enter frame must be legible at phone size; shoot a legibility check before wrapping. Bright, plain, unstyled — no props, no linen, no styling ambition.",
    script:[
      {scene:"BEAT 1 — THE DARE", time:"0-4s", action:"Locked 50mm, counter height, hard window light on an empty cream board. Two hands enter and set the Willa's Original carton down center frame, label forward, and let go. On-screen text types on top-third in purple and holds there for the rest of the take: 'check us. we're not nervous.' Camera does not move again for the entire piece."},
      {scene:"BEAT 2 — COUNT", time:"4-9s", action:"Same unbroken frame, no cut. A hand turns the carton a quarter-turn to the ingredient list and an index finger taps down the four lines, one deliberate tap each, holding a beat on each line so it reads at phone size: organic whole grain oats · filtered water · organic vanilla extract · sea salt. The finger reaches the bottom of the list and there is nothing left to tap — it hovers over blank carton for a full second. No new text; the purple invitation is still the only copy on screen."},
      {scene:"BEAT 3 — SCAN", time:"9-14s", action:"Same unbroken frame, no cut. A second hand brings a phone in from the bottom of frame and holds it over the carton, camera-side down, until the scan resolves; the phone tilts up toward lens just far enough for the score to be legible — 94 out of 100 in the Clean Label App. The hand holds it steady for two full seconds, then lowers it out of frame. Still no new text."},
      {scene:"BEAT 4 — LOOK IT UP", time:"14-18s", action:"Same unbroken frame, no cut. The index finger taps the glyphosate-free certification mark on the carton, twice. The phone comes back into frame showing the third-party certifier's own page for that certification — not a Willa's page, and it should be visibly not a Willa's page. Held two seconds, then the phone is set face-down on the board beside the carton and both hands withdraw from frame."},
      {scene:"END CARD", time:"18-20s", action:"Same unbroken frame. Carton alone in the light, hands gone, nothing moving. The purple invitation fades out and is replaced center-frame in navy by: 'we built this carton to be checked.' A smaller navy line settles underneath it: 'certified glyphosate-free. tested every lot.' Hold in silence. Cut to black on the last beat of the bed."}
    ],
    audio:"Warm narrative voiceover — dry, unhurried, generous, faintly amused, and completely free of defensiveness. Not framed as the founder. The read carries the invitation and names each thing as the hands do it — 'count them' · 'scan it' · 'look up the certification' · 'ask us anything about the four' — four short phrases across twenty seconds and nothing else; every silence between them is scripted and stays. No trending sound and no meme audio on this one; a borrowed sound would make an open-door dare read as a dunk. Light acoustic bed, low in the mix, with a clean final beat to cut the end card on. Practical sounds close-miked and left loud — the carton setting down on the board, the fingertip taps on the ingredient list, the phone's scan chime, the phone going face-down at the end. Those taps are the piece's rhythm section; do not bury them under the bed.",
    duration:"18-20 seconds",
    cta:{soft:"got a question about any of the four ingredients? put it in the comments.", medium:"pour Willa's Original — four organic ingredients, and every one of them holds up to a look.", strong:"try Willa's Original — four organic ingredients, 94 out of 100 in the Clean Label App, and a glyphosate certification you can look up yourself."},
    benefitShorthandId:"BS-11"
  },
  {
    id:"AUG17-IG-R3",
    platform:"Instagram Reel",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Fri Aug 21 · 12pm",
    priority:"HIGH",
    concept:"\"you shouldn't have to read a carton twice.\" — the four-second Kids answer",
    intel:[
      {type:"TREND", text:"T-2 (INTERNAL ONLY — the news itself never ships): federal legislation introduced Jul 30, 2026 would strike 'wheat' from the major-allergen definition and replace it with 'gluten-containing grain,' a category that expressly includes oats. Legal analysis published Aug 12, 2026; food-safety trade coverage Aug 11, 2026. What it means for this brief: the quiet question parents have been asking about oats for years is heading toward being printed on packages, and the brand that answers it plainly while it's still a choice looks like the one that was never worried. NO bill, NO bill number, NO Congress, NO agency, NO legislation and NO celiac framing appears anywhere on camera or in caption — not as a fact, not as a hint. The trend sets the timing. The carton does the talking."},
      {type:"AUDIENCE", text:"CP-7 (INTERNAL CONTEXT — not linked): the butter-on-the-scale video that went wide Aug 11, 2026 is the shape of the buyer right now — shoppers have stopped taking the front of the package on faith and have started reaching for a scale, a scanner or an app. For a parent that instinct is older and sharper than any trend: she has already picked up a kids' drink, turned it over, read it twice and put it back. That is the person this brief is for, and the reason the Yuka scan is in the script rather than a nutrition overlay. Being checked is the best thing that can happen to Willa's Kids — so let the check happen on camera. Relief, not fear: no scary-label montage, no 'what they don't want you to know,' no other product in frame. Partake Foods' register — unapologetically parent-first, warm, no broadening to keep non-parents comfortable."},
      {type:"COMPETITOR", text:"C-2 (INTERNAL ONLY — hard guardrail, not a talking point; FACT-CHECK CORRECTION — source coverage does NOT describe an added protein isolate, that detail is not supported and must not be repeated): a clean-label competitor put a 12g-protein 'whole' milk into national retail on Aug 10, 2026, built from a blend of coconut, cashew, soy and pea protein per the trade coverage. Do NOT run any added-isolate or sourcing-method critique in this brief — it isn't backed by the reporting, and Willa's Kids gets its own 8g from organic pea protein, so a sourcing-method argument would land on our own carton either way. Kids does not position against the plant-milk shelf at all; per the Flavor Database it positions against DAIRY — same protein as a cup of dairy milk, half the sugar. Also hard-scoped: the allergen claim belongs to Willa's Kids ONLY and must never be extended to Original, Barista or Chocolate, and no line in this brief may give allergy or medical guidance or imply the product is right for a specific diagnosis."}
    ],
    hooks:[
      {text:"you shouldn't have to read a carton twice.", recommended:true},
      {text:"what's actually in it? okay — four seconds.", recommended:false},
      {text:"parents asked us to make this one. so here's exactly what's in it.", recommended:false}
    ],
    caption:"Willa's Kids has none of the nine major food allergens in it. No dairy, no nut, no soy, no gluten, no sesame. That's the short answer, and it's the same answer every single time you pick up the carton. 🌾\n\n8g of protein — the same as a cup of dairy milk, with half the sugar. Plant-based calcium, vitamin D, and DHA omega-3s from algae oil, the omega-3 most kids fall short on. 6g of sugar, all of it from organic maple syrup.\n\nHave you scanned it on Yuka? It's the Clean Label App — it scans groceries and scores the ingredients out of 100. Willa's Kids comes back 100 out of 100. Bobby Approved, too.\n\nWilla's Kids exists because parents asked us for it. So when a parent asks what's in it, the answer should take about four seconds.\n\nQuestions about a diagnosed allergy belong with your pediatrician. Questions about what's in the carton belong to us.\n\nYou shouldn't have to read a carton twice.",
    hashtags:[
      "#willas",
      "#willaskids",
      "#kidsoatmilk",
      "#allergenfree",
      "#dairyfreekids",
      "#organicoatmilk",
      "#kidsnutrition",
      "#plantbasedkids",
      "#realfood",
      "#yuka"
    ],
    visual:"A real family kitchen, not a set — lived-in counter, a dish or two still out, warm mid-afternoon window light coming in low and hard from camera left. Near-white counter (#FAFAF7) and a cream board for the end frame; typography is navy ink (#202A44) with brown (#9E652E) accents used ONLY on the five 'no ___' lines. TALENT: cofounder-sister on camera — genuine first-person mom POV, this is the sanctioned People-on-Camera substitute. Christina does not appear in this brief at all, on camera or in voiceover. Her kid enters once, late, at waist height; face partially in frame is fine, a clean full-face beauty shot is not — it should look like a kid walking through a kitchen, because that's what it is. Three camera positions carry it: a handheld medium-close at eye level for the two talking beats, a locked side-on 50mm at glass height for the pour, and an over-the-shoulder phone-screen POV for the scan. No filter, no diffusion, no colour grade toward gold — the light is already warm, let it be. Willa's Kids carton is label-forward and in her hand or in frame for at least 70% of the runtime. Text enters as single clean lines that REPLACE each other rather than stacking — never more than two on screen at once. No nutrition overlay of any kind sits over the kid or over the handoff beat; that stretch is silent copy-wise on purpose. Nothing on screen is scary, red, crossed-out or urgent — no warning graphics, no other brand's carton, no shelf, no cart. Final frame is the carton and the emptied glass together on the counter in the low light.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Handheld medium-close, eye level: cofounder-sister at her own kitchen counter, Willa's Kids carton already in her hand, an empty kid's glass beside her. She starts mid-thought, straight down the lens, no intro and no greeting. Sync sound only, no music yet. On-screen text, navy on cream, lower third: 'you shouldn't have to read a carton twice.'"},
      {scene:"THE SHORT ANSWER", time:"3-10s", action:"Same handheld frame. She rotates the carton so the ingredient list faces the lens and holds it steady — real hand, real carton, no graphic laid over the label. She reads it out plainly, first person, unhurried. Text lines type on one at a time in brown and REPLACE each other, no stacking: 'no dairy' → 'no nut' → 'no soy' → 'no gluten' → 'no sesame'. Then a single navy line lands centered and holds: 'none of the nine major allergens.' Warm acoustic bed enters low underneath that last line."},
      {scene:"THE POUR", time:"10-16s", action:"Cut to locked side-on 50mm at glass height. She pours Willa's Kids into the kid's glass in one continuous motion, carton label-forward at frame right and set down there when she's done. Pour and glass close-miked. Three navy lines replace each other in the empty left third, one per beat: '8g protein' → 'plant-based calcium + vitamin D' → 'DHA omega-3s from algae oil.' No stacking, no check marks, no badge graphics."},
      {scene:"THE SCAN", time:"16-21s", action:"Over-the-shoulder POV on her phone as she holds it over the barcode on the carton — real app, real scan, one take. On-screen text, navy, one line: 'the Yuka app scans groceries and scores the ingredients.' The score resolves on the phone screen and the camera pushes in two inches on it: 100/100. She barely reacts — a small nod, that's all. Second line replaces the first: '100 out of 100.'"},
      {scene:"THE HANDOFF", time:"21-26s", action:"Cut wide and static, locked off, room tone up and music dropped almost out. Her kid walks into frame at waist height, takes the glass off the counter, drinks, walks back out without a word. She watches him go, then turns back to the lens and says one dry line, sync sound: 'that's the whole answer.' No text on screen for this entire beat."},
      {scene:"END CARD", time:"26-28s", action:"Hard cut to a static frame on the counter in the low afternoon light: Willa's Kids carton label-forward, the emptied glass beside it, her hand exiting frame. Music resolves. On-screen text centered underneath, navy on cream: 'Yuka says 100 out of 100.'"}
    ],
    audio:"Sync sound, on camera — cofounder-sister speaking for herself in a real first-person mom register. This is People-on-Camera Amplification run through the cofounder-sister substitute, so it does NOT draw on Christina's on-camera quota; Christina is not in this brief in any form, including voiceover. Direction for the read: plain, warm, a little amused, the tone of answering a question you've answered a hundred times and don't mind answering again. Relief, not warning — no urgency in the voice, no 'listen up,' no fear. Partake Foods' parent-first confidence is the reference. Warm acoustic bed, guitar and room, entering under 'none of the nine major allergens' and sitting low the whole way, dropping almost out under THE HANDOFF so the kid, the glass and the room carry that beat alone. NO trending sound and no licensed track — the face and the sync audio are the format. Pour, glass on counter and the phone's scan chime all close-miked and left audible.",
    duration:"26-28 seconds",
    cta:{soft:"send this to the parent who turns every carton over before it goes in the cart.", medium:"pour Willa's Kids — none of the nine major food allergens, 8g of protein.", strong:"try Willa's Kids: 8g of protein, plant-based calcium, vitamin D, DHA omega-3s from algae oil, none of the nine major food allergens, and a 100 out of 100 on Yuka."},
    benefitShorthandId:"BS-8"
  },
  {
    id:"AUG17-PIN-2",
    platform:"Pinterest",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Fri Aug 21 · 3pm",
    priority:"STANDARD",
    concept:"\"no stabilizers. it stands up on its own.\" — the subtraction pin",
    intel:[
      {type:"TREND", text:"T-7: a systematic review and meta-analysis of randomized controlled trials on fiber supplementation ran in Gastroenterology on Aug 14, 2026 — a top-tier journal putting pooled trial evidence behind soluble fiber. INTERNAL ONLY. The journal, the study, the word 'trial' and every clinical term in it stay off the pin entirely. No condition is named, no symptom is named, and Willa's never claims to treat, soothe, calm or improve anything. The signal's only job here is to tell us the gut-comfort question is live in the aisle this week and that the honest way to answer it is by subtraction — what isn't in the carton — not by making a promise."},
      {type:"TREND", text:"T-6: PNAS ran 'Digestion-resistant proteins support the healthy metabolite profiles associated with plant-based diets' in the Aug 11, 2026 print issue, with national science-press pickup Aug 14, 2026 — indigestible plant protein working alongside plant fiber, the two of them as a pair rather than fiber carrying the story alone. INTERNAL ONLY as a citation, but it settles a design question: the fiber number and the protein number belong on the same pin, because the shortcut this pin crosses off is the one that removes both. The fiber+protein Feed carousel owns the pair as an argument this week; this pin owns it as a line item on a list of omissions."},
      {type:"AUDIENCE", text:"Pinterest is a search box, not a feed — the title has to be the query a shopper actually types, which is why 'oat milk with no gums or stabilizers' runs verbatim across the top and does not get trimmed for layout. This is a save-and-return pin: it keeps pulling months after it posts, so the payload is the permanent ingredient truth, not a news peg. The move: make the omission list the design, let the joke land in one line, and let the carton do the rest."}
    ],
    hooks:[
      {text:"oat milk with no gums or stabilizers (the whole list is four things)", recommended:true},
      {text:"no stabilizers. it stands up on its own.", recommended:false},
      {text:"the short list is on the front. the longer list is everything we left out.", recommended:false}
    ],
    caption:"Four ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt. That is the entire list on Willa's Original. 🥛\n\nNo gums. No stabilizers. No phosphates. And no enzymatic oat-syrup process — the shortcut where the bran and germ get filtered out and the starch gets processed into sugar, taking the fiber AND the protein with it.\n\nWilla's Original keeps the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled. That is where the 2g+ prebiotic fiber comes from — the kind that feeds good gut bacteria — plus 4g+ protein and 1g of sugar, from the oats, nothing added.\n\nCertified organic. Certified glyphosate-free, tested every lot. Mother-founded, WBENC certified.\n\nRich and smooth is supposed to come from the oat. Ours does.\n\nNo stabilizers. It stands up on its own.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#gumfree",
      "#cleanlabel",
      "#wholeoat",
      "#prebioticfiber",
      "#plantmilk",
      "#dairyfree",
      "#labelcheck"
    ],
    visual:"Vertical 2:3 typographic pin — this is a search result, not a feed post, so legibility beats styling and the layout should read like a zine cover, not a wellness infographic. Background is a flat cream field (#FAFAF7): no gradient, no texture, no lifestyle scene, no kitchen. One object carries the frame — a plain clear glass three-quarters full of Willa's Original, shot straight-on at glass height in soft daylight so the milk reads genuinely opaque and creamy against the cream, throwing one real shadow to frame right. The Willa's Original carton stands beside it, label forward, roughly a quarter of the frame width, anchored in the LOWER third so a top-crop screenshot can never lose it. Palette is cream, navy ink (#202A44) for all type, and HEALTH/WELLNESS creamy blue (#73B2C9) used exactly twice — once as a thin rule under the title, once on the four cross-off marks. Register is Graza / Omsom design-wit: one big confident line, generous white space, no icons, no leaf motifs, no gut diagrams, no supplement-brand chrome, nothing earnest. Type stack, top to bottom, exact copy: (1) TITLE, large navy all-caps over two lines — 'OAT MILK WITH / NO GUMS OR STABILIZERS' — with the blue rule beneath it; this line is written to be searched and does NOT get shortened for design. (2) Under the rule, the omission list as four short lowercase lines, each struck through in light blue as if crossed off by hand: 'gums' · 'stabilizers' · 'phosphates' · 'oat syrup'. (3) Beside the glass, small navy line: '4 ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt.' (4) Bottom kicker, medium navy, the punchline of the pin: 'no stabilizers. it stands up on its own.' (5) Corner card, small: '2g+ prebiotic fiber — feeds good gut bacteria · 4g+ protein · 1g sugar, from the oats.' Hands only if a hand appears at all; no talent, no props beyond glass and carton. The only permitted on-screen name for the list of ingredients is 'ingredient list' — never the industry word for it. Shoot one alternate frame mid-pour as insurance if the still glass reads flat, but the still version is the default: the joke needs stillness to land.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"pin this for the next time an ingredient list runs longer than the glass.", medium:"Willa's Original — four organic ingredients, no gums, no stabilizers, no phosphates.", strong:"Willa's Original: 4 organic ingredients, 2g+ prebiotic fiber, 4g+ protein, 1g sugar from the oats. Certified organic. Certified glyphosate-free, tested every lot."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"AUG17-TT-5",
    platform:"TikTok",
    pillar:"HEALTH/WELLNESS",
    pillarColor:"#73B2C9",
    flavor:"Multi",
    dnaPattern:"mom-activist",
    timing:"Sat Aug 22 · 10am",
    priority:"STANDARD",
    concept:"\"nothing on this table is a side you have to pick.\" — the abundance answer to the pick-a-team pitch",
    intel:[
      {type:"PULSE", text:"CP-8: a public figure's household anecdote about quitting one way of eating and feeling better on an extreme replacement went wide Aug 15, 2026, and the feed converted it inside a day into a referendum on whether plants work at all. It is one family's story, not a study and not a finding. The move Willa's is built for is NOT defending a diet — it is refusing the premise that eating well requires eliminating a category and joining a side. INTERNAL ONLY: the person is never named, on screen, in caption, in VO or in a hashtag, and no diet, no food group and no eating style is named either. The moment is the weather this brief is shot in, not the subject of it."},
      {type:"TREND", text:"T-6 (INTERNAL): a study in the Aug 11, 2026 print issue of PNAS found that indigestible plant protein — not fiber working alone — is what steers gut bacteria toward the beneficial metabolites associated with eating plants, with the mainstream write-up following Aug 14, 2026. Why it matters for this brief: it retires the single-nutrient argument entirely. Willa's answer to a subtract-a-category pitch is an addition — the whole oat groat carries the fiber and the protein together, which is exactly what most of the category strains out. No journal, no researcher, no percentage and no mechanism jargon ships in consumer copy. The whole finding compresses down to one plain sentence on screen: nothing gets filtered out."},
      {type:"AUDIENCE", text:"The buyer for this post is not in the argument — she is watching it scroll past while deciding what to feed people on a Saturday, and every open door in her feed asks her to declare something. This is the one post that asks her for nothing. That sets three hard guardrails on execution: no question in the caption, no 'thoughts?', no comment prompt of any kind (an engagement-bait close would make Willa's a participant in exactly the fight it is declining); no face and no argument on screen, because a talking head reads as a rebuttal; and zero condescension toward anyone who found the pitch convincing — the dryness is aimed at the premise, never at a person. Lovebird's gravity at a warm volume is the register. If it reads as smug on the first pass, it is wrong."}
    ],
    hooks:[
      {text:"you don't have to quit a food group to eat well.", recommended:true},
      {text:"the table doesn't need a villain.", recommended:false},
      {text:"we're staying out of the food fight.", recommended:false}
    ],
    caption:"Every so often the feed decides food is a competition. Willa's has never had a side to pick — just a short list and a full table. 🍞\n\nFour things go in Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber — the kind that looks after your gut — and 1g of sugar that comes from the oats.\n\nMost of the category filters the bran and germ out of the oat and processes what's left into sugar. The protein leaves with the fiber. Willa's keeps the whole oat groat — the entire kernel, the way steel-cut oats keep it — so nothing has to be added back in later.\n\nCertified organic. Certified glyphosate-free by The Detox Project, tested every lot. Mother-founded, WBENC certified.\n\nBread on the board. Fruit in the bowl. Something warm. A carton with nothing hiding on the back.\n\nNothing on this table is a side you have to pick.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#plantmilk",
      "#cleaningredients",
      "#glyphosatefree",
      "#realfood",
      "#familytable",
      "#dairyfree"
    ],
    visual:"One locked overhead is the entire piece — camera set square over a scrubbed wood table, never moved, never re-framed, with a single macro insert as the only cut in the edit. Real hard morning light raking in from frame left, no diffusion, no filter, no color grade toward gold; the shadows under the bowls should be sharp enough to read the time of day. The table is warm brown wood against the brand's cream and navy (#202A44) typography — creamy blue (#73B2C9) is reserved for the one nutrition line and nothing else. Hands only, from all four edges of frame, no faces, no bodies, no talent, no one addressing camera. The abundance has to be genuinely real and slightly untidy: a torn loaf on a board, stone fruit crowding a bowl, a jar of jam with the lid off, a basket of small summer squash with the stems still on, a pot of oats with the spoon left standing in it, mismatched glasses, a cloth folded once and not styled. Nothing is spaced into a wellness flat-lay grid — things overlap, crumbs stay, the frame gets fuller and messier as it goes. Willa's Original sits label-forward at the center from the second beat and never moves again; Kids and Chocolate flank it. Text enters as clean single navy lines in the lower third, one at a time, never more than one line on screen at once, and no line ever argues with anyone — every overlay is a statement about this table. The final frame is the loaded table with every hand gone, held long enough to feel still.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Locked overhead, square over an empty scrubbed wood table in hard morning light from frame left. Two hands enter from the bottom edge and set down a board with a torn loaf on it, then leave. No voiceover — practical room tone and the sound of the board landing on wood. On-screen text, navy on cream, lower third: 'you don't have to quit a food group to eat well.'"},
      {scene:"THE ANSWER", time:"3-8s", action:"Same locked overhead, no cut. Hands place Willa's Original into the center of the table, label forward, then set Willa's Kids and Willa's Chocolate on either side of it. Voiceover begins, dry and low: 'four organic ingredients. whole grain oats, filtered water, vanilla, sea salt.' On-screen text, single line in creamy blue: '4 organic ingredients · 4g+ protein · 2g+ prebiotic fiber · 1g sugar, from the oats.'"},
      {scene:"THE TABLE FILLS", time:"8-15s", action:"Same locked overhead, still no cut. Hands enter continuously from all four edges and the frame fills: a bowl of peaches and plums, a jar of jam with the lid set beside it, a basket of small summer squash with the stems still on, a pot of oats with the spoon standing in it, two mismatched glasses, a folded cloth. Things overlap and crowd; nothing gets straightened. Voiceover: 'eating well isn't a subtraction problem. it's a what's-on-the-table problem.' No on-screen text — the frame is doing the talking."},
      {scene:"THE LABEL", time:"15-19s", action:"The only cut in the piece: a macro insert, shallow depth of field, on the ingredient list on the side of the Willa's Original carton. A finger traces down the four lines, one per beat. On-screen text types on line by line as the finger moves: 'organic whole grain oats' → 'filtered water' → 'organic vanilla extract' → 'sea salt.' Voiceover: 'certified organic. certified glyphosate-free, tested every lot.'"},
      {scene:"THE POUR", time:"19-23s", action:"Hard cut back to the identical locked overhead — same framing, table now full. A hand pours Willa's Original into one of the glasses at the near edge of the table and withdraws. Close-miked pour, no voiceover. On-screen text, navy, lower third: 'nothing on this table is a side you have to pick.'"},
      {scene:"END CARD", time:"23-25s", action:"No cut. Every hand is out of frame and the loaded table holds still in the light for a full beat — steam off the pot, one plum rocking to a stop. Music drops out to room tone. On-screen text centered on the bare wood between the loaf and the carton: 'the oat came whole. so does the table.'"}
    ],
    audio:"Warm narrative voiceover — dry, low, unhurried, the register of someone stating a preference rather than winning a point. Not framed as the founder, no talent on camera. Three short VO lines total and long silences between them; the voice never raises and never gets faster. Sparse real-instrument bed: one acoustic guitar and a brushed snare, no ambient wellness pads, no trending sound, no stitch audio — riding a sound here would look like joining the argument. Music sits well under the VO and drops out entirely for the final two seconds so the last frame is room tone. Keep the practical sounds loud and close-miked: the board landing, the jar lid, the spoon against the pot, the pour.",
    duration:"23-25 seconds",
    cta:{soft:"save this for a week when the feed gets loud about food.", medium:"keep a carton of Willa's Original on the table — nothing filtered out, nothing to argue about.", strong:"try Willa's Original — organic whole grain oats, filtered water, organic vanilla extract, sea salt. that's the list."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG17-IG-R4",
    platform:"Instagram Reel",
    pillar:"PARENTING",
    pillarColor:"#9E652E",
    flavor:"Kids",
    dnaPattern:"kid-family-moment",
    timing:"Sat Aug 22 · 12pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"the best swirl in the fridge is on the kids' carton.\" — one carton, two drinks, a Saturday",
    intel:[
      {type:"PULSE", text:"CP-10: a warm, ragged rocker with fiddle and fretless guitar premiered Aug 17, 2026, and the artist has said it's mostly about his son and 'feeling overwhelming love.' That is the rarest thing on the audio shelf right now — unironic, un-precious, family-forward, played on real instruments, and the exact opposite register from a wellness-brand music bed. It is the reason this brief is a slow Saturday and not another explainer. INTERNAL: the artist, song and album are never named on screen or in caption. The team pulls the track from the Cultural Pulse card and lets it carry mood, not credit."},
      {type:"AUDIENCE", text:"The most underused truth in the whole lineup: adults reach for Willa's Kids on purpose — more protein in the iced coffee, and per Christina it 'oddly blends and creates the best swirls' of any SKU. Every Kids brief this engine has shipped treats the carton as a kids' product with a parent as the buyer. This one treats it as a carton two people drink for two different reasons, which is a bigger and far more repeatable story than another lunchbox. Do not trap Kids as only-for-kids, and do not send this one anywhere near a school morning — that door has run three weeks straight and is shut."},
      {type:"COMPETITOR", text:"C-2 (INTERNAL — never on camera, never in caption, brand never named): a clean-label peer put a 12g-protein plant 'whole milk' into national distribution on Aug 10, 2026, blending coconut, cashew, soy and pea protein to hit the number — not one whole ingredient doing the work. The category's answer to protein anxiety is a bigger number on the front of the box. Willa's answer this week is two people in a kitchen. Say '8g protein' once and flatly — do NOT claim the 8g comes from the oat (Kids carries organic pea protein), and do NOT put any number on the hero swirl shot."}
    ],
    hooks:[
      {text:"it says Kids on the front. it's in her iced coffee anyway.", recommended:true},
      {text:"she poured her kid a glass, then poured the rest over ice.", recommended:false},
      {text:"shhh… the kids' carton is the one the adults keep stealing.", recommended:false}
    ],
    caption:"Saturday morning, one carton, two drinks. 🥛\n\nOur cofounder poured her kid a glass of Willa's Kids, then poured the rest of the same carton over ice into her own coffee. Nobody staged that part.\n\nThe best swirl in the fridge is on the Kids carton. We don't have a better explanation than that — it just does it, and we've stopped apologizing for how good it looks.\n\nMade from the whole oat — bran, germ and all — not oat syrup. 8g protein. Top-9-allergen-free.\n\nShhh… the one we designed for kids' tastebuds is the one the grown-ups keep finishing.\n\nSame carton. Two glasses. One of them has ice in it.",
    hashtags:[
      "#willas",
      "#willaskids",
      "#oatmilk",
      "#organicoatmilk",
      "#dairyfree",
      "#top9free",
      "#allergenfriendly",
      "#kidsdrinks",
      "#realfood",
      "#slowweekend"
    ],
    visual:"A real weekend kitchen, not a set — crumbs on the counter, a cereal bowl nobody moved, a stack of unopened mail at the edge of frame. Warm low morning light coming in hard from one window at frame left, no diffusion, no filter, no color grade beyond a gentle warm lift; shadows are allowed to be shadows. Palette is whatever the room already is — wood, ceramic, the brown (#9E652E) of the Willa's Kids carton picked up in the only two text overlays that carry numbers. Talent is the cofounder-sister and her kid; Christina is not in this brief. Neither of them ever looks at the camera and neither of them speaks. Shoot on a 35mm for the wides and a macro for the hero, hold every shot one full beat longer than an edit would normally allow, and cut on the music rather than on the action. Text is close to absent: one line in the first four seconds, two small lines near the end, nothing anywhere else — and specifically nothing on the swirl. The Willa's Kids carton is in frame for most of the runtime and its label stays readable through the handoff from the kid's hands to hers, because that handoff is the entire argument. The hero frame is the swirl: pale ribbons rolling down through dark iced coffee, curling, folding in, disappearing. That is a swirl that DISSOLVES — it is not a layered-glass build and must never be cut to hold stripes. Final frame is the two finished glasses and the carton between them in the same light.",
    script:[
      {scene:"HOOK", time:"0-4s", action:"Handheld, waist-height, warm hard window light: a kid's hands drag the Willa's Kids carton across a lived-in weekend counter — cereal bowl, crumbs, a stack of mail — and a mother's hand steadies it without taking it. Faces optional, no one addresses camera. On-screen text, small, warm brown, lower third: 'it says Kids on the front. it's in her iced coffee anyway.' This is the only overlay in the first half of the piece."},
      {scene:"THE KID'S GLASS", time:"4-9s", action:"Cut to a locked 35mm at counter height, slightly low: the kid pours Willa's Kids into a short glass, overfills it a touch, stops on his own. Real sound only — the glug, the glass settling on wood. No text, no voiceover, no cutaway. Hold a full beat past where the edit wants to go."},
      {scene:"THE SAME CARTON", time:"9-13s", action:"Static 35mm at glass height, cofounder-sister's hands enter frame right: she picks up the same carton the kid just set down — label readable through the whole handoff — and carries it over a tall glass of ice and cold coffee. The kid's full glass stays visible and sweating at the edge of frame; nothing gets staged out. No text."},
      {scene:"THE SWIRL", time:"13-20s", action:"Macro, 60fps, side-on through the glass wall: Willa's Kids goes into the iced coffee and blooms — pale ribbons rolling down through the dark, curling, then folding in until the whole glass goes light. Let it dissolve completely; do not cut early to hold stripes, this is not a layered drink. ZERO on-screen text on this shot — no numbers, no nutrition, no stinger. Music and the pour carry it alone. Longest shot in the piece: shoot it eight times, cut the one where the ribbons hold longest before they fold."},
      {scene:"TWO DRINKS", time:"20-24s", action:"Pull back to a wide of the counter in the same light: the kid's glass, her iced coffee, the carton standing between them, both people in frame and neither looking at the lens. Two small warm-brown lines fade up low, one after the other, clear of both drinks: '8g protein · 3g fiber' → 'top-9-allergen-free.' Plain type, no boxes, no icons, no third line."},
      {scene:"END CARD", time:"24-26s", action:"Hold the same wide. Both pairs of hands leave frame; the carton stays, still in the window light. On-screen text centered underneath, warm brown: 'the best swirl in the fridge is on the kids' carton.' The stinger holds under it for the final beat: 'More protein than any oat milk. (Yes, really.)'"}
    ],
    audio:"The Aug 17, 2026 indie-rock drop carried on the Cultural Pulse card — warm, ragged, fiddle and fretless guitar, written about the artist's son and 'feeling overwhelming love,' completely unironic. That register is the whole reason it's this track and not a wellness-brand bed; if it starts sounding like a spa, it's the wrong song. Sit it at conversational level rather than underneath, and cut picture to the music instead of to the action. NO voiceover anywhere in this piece — the only other sound is the kitchen: the pour, the ice, the glass on wood, and one kid noise left in on purpose. The artist, song and album are never named on screen, in caption, or in comments.",
    duration:"24-26 seconds",
    cta:{soft:"save this for the next person who tells you the kids' carton is only for kids.", medium:"pour Willa's Kids — 8g protein, top-9-allergen-free, and the best swirl in the fridge.", strong:"try Willa's Kids: 8g protein, 3g fiber, top-9-allergen-free, made from the whole oat — for the kid's glass and for yours."},
    benefitShorthandId:"BS-4"
  },
  {
    id:"AUG17-IG-F2",
    platform:"IG Feed",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"on-pack-checklist",
    timing:"Sat Aug 22 · 6pm",
    priority:"STANDARD",
    rideNow:false,
    concept:"\"our label isn't a link.\" — everything you'd have to scan for, already printed on the front",
    intel:[
      {type:"TREND", text:"T-3: legal analysis published Aug 17, 2026 confirms that two of the escape hatches in the federal bioengineered-food disclosure rules are being taken away — the option to park the disclosure behind a QR code or a text-message line, and the exemption for products whose modified genetic material can't be detected in the finished food. The direction of travel is the entire why-now: for a decade proof migrated OFF the package, and it is now being pushed back onto it. INTERNAL ONLY and non-negotiable — no court, no judge, no agency, no case name, no 2028 date, no word 'vacatur' and no compliance framing appears anywhere in consumer copy. The customer never hears the ruling. She only sees a carton that never used the escape hatch. 'Bioengineered' gets its one plain-English gloss on the card and then the brief moves on."},
      {type:"COMPETITOR", text:"T-1 + C-3 (INTERNAL): the Non-GMO Project's Non-UPF Verified standard, administered with NSF, is landing on real packages — Go Raw announced its seal Aug 11, 2026, Simple Mills says roughly 60% of its portfolio qualified without reformulating anything, and Amy's Kitchen and Spindrift are on the list. Same certifying body that already verifies Willa's Non-GMO. Two hard guardrails: (1) Willa's is NOT verified to this standard and the seal is NOT claimed, implied, hinted at or shown in any card, caption, hashtag or overlay on this brief — the application is a business action for the team, not a content claim; (2) a consumer-advocacy critique published Aug 12, 2026 is already questioning whether private badges arriving ahead of a federal definition help shoppers at all, so a badge-parade post would be walking into that critique. This brief deliberately runs the opposite play: not more marks, just the ones already printed. Note also AUG17-TT-1 owns the Non-UPF story this week — this brief must not touch it."},
      {type:"AUDIENCE", text:"The reader has been trained by a decade of front-of-pack marketing to assume the real answer is somewhere else — a scan, a site, a claim with no definition behind it — and to feel faintly stupid for not chasing it. The Willa's move is relief, not indignation: you're already holding the answer. Humor pattern is Wordplay / Text Joke, so the craft bar is high — nothing to look at but type, which means every line has to land on first read with no asterisk. Muse is Fishwife / Graza / Omsom for the design-wit (a four-ingredient list can read like a zine cover, not an infographic) with Kiki Milk's flat category posture underneath. Lead-with-the-solution: Willa's four organic ingredients are on CARD 2, not card 5. One idea per card, never two. Lane discipline: AUG17-PIN-2 owns subtraction/no-gums, AUG17-TT-4 owns the check-us dare, AUG17-TT-3 owns protein provenance — this brief owns one thing only, which is WHERE the proof is printed."}
    ],
    hooks:[
      {text:"if the ingredients are behind a QR code, that's the answer.", recommended:true},
      {text:"four ingredients, printed on the front. no scanning required.", recommended:false},
      {text:"shhh… the whole answer is already on the carton.", recommended:false}
    ],
    caption:"Willa's Original is four organic ingredients, and every one of them is printed on the front of the carton. 🥛\n\nOrganic whole grain oats. Filtered water. Organic vanilla extract. Sea salt. No code to scan, no site to visit, no number to call — the box is the answer.\n\nNext to that list sits a butterfly: Non-GMO Project Verified. 'Bioengineered' is the label word for genetically modified ingredients, and that mark is where the answer lives on our carton — in ink, on the front, where you were already looking.\n\nMade from the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled — so the fiber and the protein both stay in. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar, from the oats, nothing added.\n\nCertified organic. Certified glyphosate-free, tested every lot.\n\nProof spent a decade quietly moving off the package. Ours never left it.\n\nOur label isn't a link.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#nongmoprojectverified",
      "#wholeoat",
      "#cleaningredients",
      "#glyphosatefree",
      "#plantmilk",
      "#labelcheck",
      "#realfood"
    ],
    visual:"Static IG Feed carousel, 6 cards, one idea per card and never two. This is a typography post — the joke is the writing, so the design has to be confident and quiet: flat cream (#FAFAF7) grounds, navy (#202A44) type, green (#75C596) reserved for exactly one accent per card and never used for a full line. Closer to a zine cover than a nutrition graphic — no arrows, no charts, no comparison tables, no badge grid, no talent. Real hard window light on every photographed card, mid-morning, no diffusion and no filter. CARD 1 is pure type on cream, no product at all: the hook set large and left-aligned with a lot of air around it, 'QR code' the only words in green. CARD 2 is the hero and it arrives second on purpose — Willa's Original carton straight-on at eye height, label-forward, filling 45%+ of the frame on a cream surface, the four ingredient lines legible in the real photograph; navy type in the negative space at frame left reads 'organic whole grain oats · filtered water · organic vanilla extract · sea salt' with a smaller green line beneath it: 'front of the carton. that's the whole list.' CARD 3 is type only again, three short navy lines dropping in a stack with generous space between them — 'no code to scan.' / 'no site to visit.' / 'no number to call.' — then one green line landing alone at the bottom: 'it's just printed.' CARD 4 is a tight macro on the Non-GMO Project Verified butterfly mark on the front of the carton, shallow depth of field, the rest of the label falling soft; two navy lines below it, and this is the only card allowed two lines because the gloss is a safety requirement: \"'bioengineered' is the label word for genetically modified ingredients.\" / 'ours says Non-GMO Project Verified — printed, not linked.' CARD 5 is a slow macro crop across the certification marks already on the front of the pack, and it carries the post's single stinger, BS-11, set small in navy: 'certified glyphosate-free. because that matters.' with 'tested every lot.' beneath it in green. CARD 6 is the end card: the carton alone on a windowsill in late-afternoon light, cream negative space above it, and one line of navy type — 'our label isn't a link.' Nothing else on that card. Hard rules for the designer: the only certification marks that may appear in this carousel are ones already printed on the current Willa's carton — do not add, mock up or composite any new or pending seal onto the pack — no card carries more than two lines of copy, and no card stacks more than one certification.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this for the next time a label sends you somewhere else to find the answer.", medium:"pour Willa's Original — four organic ingredients, all four printed on the front.", strong:"try Willa's Original: four organic ingredients, 4g+ protein, 2g+ prebiotic fiber, 1g sugar from the oats, Non-GMO Project Verified, certified organic and certified glyphosate-free, tested every lot."},
    benefitShorthandId:"BS-11"
  },
  {
    id:"AUG17-TT-6",
    platform:"TikTok",
    pillar:"REVIEWS/RECS",
    pillarColor:"#A191B2",
    flavor:"Multi",
    dnaPattern:"at-shelf-moment",
    timing:"Sun Aug 23 · 11am",
    priority:"STANDARD",
    concept:"\"five things I don't compromise on. number four has four ingredients.\" — a real cart, a real list, Willa's fourth",
    intel:[
      {type:"PULSE", text:"CP-5: creators are listing, straight to camera, the five purchases they consider non-negotiable — the things they keep paying for while they cut elsewhere. The hashtag carries tens of thousands of posts and consumer-behaviour coverage dated Aug 12, 2026 reads the format as evidence of a wider value-audit mood, with the lists running mostly to subscriptions and beauty or lifestyle purchases. The reason this is the rare list Willa's should want in on: almost nothing on these lists is groceries. A carton in slot four is the surprise, and it can only land if it's genuinely on someone's list rather than placed there. Trigger for THIS week: the format is live and unclaimed by the category — a grocery item can earn a slot without the brand asking for it, and nobody in plant milk has taken one."},
      {type:"AUDIENCE", text:"This is the deliberate peer-brand steal of the week: Partake Foods' cart-full haul crossed with Olipop's 'spending money on a product I love' confession. Both work for the same reason — the person on camera is a buyer, not a brand, and the affection is unembarrassed. The register has to stay tender and self-aware, never sneering, and Willa's never punches down at the buyer. Which is why the placement matters more than the pitch: first reads as an ad, fifth reads as the finale, fourth reads as a person telling the truth in the middle of a list. HARD COPY GUARDRAIL — nothing in this brief states or implies a price, compares cost, or mentions a deal, a discount or a sale. 'Worth it' here means what's inside the carton. Pricing is retailer territory and the engine does not touch it."},
      {type:"COMPETITOR", text:"C-1 (INTERNAL ONLY — never in consumer copy): a national dairy player exited ready-to-drink oat milk in this window, citing lack of demand. A value-audit mood plus a category exit is exactly the conditions under which cheaper-per-ounce arguments get loud, and the worst possible move is to answer one. Willa's answer is not a comparison — it's a person who already made the decision and doesn't relitigate it. No demand talk, no shelf talk, no category-health talk anywhere on camera or in caption."}
    ],
    hooks:[
      {text:"five things in my cart I don't compromise on.", recommended:true},
      {text:"these five never change, no matter what else goes in.", recommended:false},
      {text:"shhh… number four is the one I'd defend in the comments.", recommended:false}
    ],
    caption:"Number four on the list has four ingredients. 🥛\n\nFive things in a real cart that never get swapped — and this is the one that reads shortest on the back. Willa's Original is organic whole grain oats, filtered water, organic vanilla extract and sea salt. That's the entire list.\n\nIt's made from the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled — instead of oat syrup. Most of the category filters out the bran and the germ first, then processes the starch into sugar, which takes the fiber AND the protein out before the carton is ever filled. Willa's keeps both: 4g+ protein, 2g+ prebiotic fiber, the kind that feeds your gut, and 1g of sugar that came from the oats.\n\nCertified organic. Certified glyphosate-free, tested every lot. Mother-founded, WBENC certified.\n\nWilla's Original goes in the coffee. Willa's Kids goes in the glass. Same cart, same trip.\n\nA list like this isn't really a list of things you buy. It's a list of things you stopped rethinking.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#nonnegotiables",
      "#groceryhaul",
      "#cleaningredients",
      "#pantrystaples",
      "#dairyfree",
      "#plantmilk"
    ],
    visual:"Bright, high-key, walking-pace and deliberately unpolished — this is a person with a cart, not a brand with a set. Palette is real-store daylight plus purple (#A191B2) numeral chips and navy (#202A44) type on cream (#FAFAF7) lower-third chips. Talent is a Willa's ambassador or a team member — NOT Christina, and not the cofounder-sister (she is already carrying two briefs this week). She is the buyer here, not a spokesperson, so no scripted delivery, no ring light, no mark to hit. Shoot handheld at chest height on a 35mm at f/1.8 so the background reads as color and motion only. PRODUCTION GUARDRAIL, non-negotiable: no retailer signage, no shelf-talkers, no aisle markers, no store-brand cartons and NO LEGIBLE SHELF TAGS OR PRICE LABELS may appear in any frame — the shallow focus does most of the work but the shot list should be blocked so nothing with a number on it is ever in the plane of focus. Four of the five items are held up fast, one beat each, at walking pace. Willa's is the only item that stops the cart: the camera settles, the movement drops out, and that beat runs roughly twice as long as any other. Willa's Original is label-forward in the last four key frames and Willa's Kids sits beside it in the cart from the fourth beat onward. Purple numeral chips punch in top-left on each item and punch out — except '4', which stays for the whole beat. On-screen text is one line at a time, sentence case, never stacked, and no line anywhere in the piece contains a currency symbol or a number that could read as one.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Handheld, chest height, walking: she pushes a cart straight down the lens in a chilled-aisle corridor, background thrown fully out of focus so no signage, logo or shelf tag is legible. She looks right at camera and says it plainly, mid-stride, sync sound: 'five things in my cart I don't compromise on.' On-screen text lands lower-third, navy on a cream chip: 'five things in my cart I don't compromise on.'"},
      {scene:"ONE + TWO", time:"3-11s", action:"Two fast handheld cuts, same walking energy, camera stays on the cart and never the shelf. She lifts a bottle of Graza olive oil out of the cart, one beat, drops it back: 'the olive oil — I cook with it every day, it should taste like something.' Hard cut. She lifts a Fishwife tin: 'the tinned fish. that's lunch on the days I don't want to think.' Purple (#A191B2) numeral chips punch in top-left on each cut — '1' then '2' — and punch straight back out."},
      {scene:"THREE", time:"11-15s", action:"Same handheld walking cut: she holds up an Omsom sauce starter packet, one beat, drops it back in the cart: 'the sauce starters. thirty minutes and it tastes like I tried.' Purple numeral chip '3' punches in and out. Keep the pace up here — the next beat has to feel like a gear change."},
      {scene:"FOUR — THE CARTON", time:"15-25s", action:"The cart stops. Camera settles into the only static frame in the piece and the motion drops out of the shot entirely. She lifts Willa's Original out with both hands, turns it label-forward, then turns it once more to the back and holds it there while she says: 'the oat milk. four ingredients — and unlike most oat milks, the fiber and the protein are still in it.' Purple numeral chip '4' punches in and STAYS for the whole beat. Two-second macro insert cutaway: her thumb runs down the four-line ingredient list on the back, with Willa's Kids visible in the cart just behind it, soft. On-screen text under the insert, one line: 'four ingredients. the fiber and the protein are still in it.' Back to the settled wide — she sets the carton in the cart facing out."},
      {scene:"FIVE", time:"25-29s", action:"Handheld again, cart moving, pace back up: she holds up a box of Partake cookies and half-laughs it: 'and the cookies. everybody in this house eats them.' Purple numeral chip '5' punches in and out. She keeps walking past the lens and out of frame left."},
      {scene:"END CARD", time:"29-32s", action:"Hard cut to a locked overhead directly above the open cart: all five items in a loose row on the cart floor, Willa's Original label-forward dead center with Willa's Kids beside it. Her hand enters frame and squares the carton once, then leaves. Navy (#202A44) type across the bottom on a cream chip, BS-1 stinger: 'The whole oat. Not the syrup.' Cut on room tone — no music sting, no logo animation."}
    ],
    audio:"Sync sound, on camera — she is speaking for herself the whole way through and there is no voiceover anywhere in this piece. Live store room tone stays audible under everything (cart wheels, the chilled-case hum, her footsteps) because that texture is what makes the list read as a real trip. A light, unfussy instrumental bed sits very low behind the four fast items and drops out completely on the FOUR beat so the carton line lands in room tone, then does not come back. No trending audio — the format is carried by the person and the list, and dropping a sound trend on top of a confession flattens it.",
    duration:"29-32 seconds",
    cta:{soft:"send this to whoever asks you what's actually worth keeping in the cart.", medium:"add Willa's Original to the list — four organic ingredients, made from the whole oat.", strong:"reach for Willa's Original: made from the whole oat groat, so the 4g+ protein and 2g+ prebiotic fiber never got filtered out, and the 1g of sugar came from the oats. Certified organic. Certified glyphosate-free, tested every lot."},
    benefitShorthandId:"BS-1"
  },
  {
    id:"AUG17-IG-R5",
    platform:"Instagram Reel",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Sun Aug 23 · 12pm",
    priority:"STANDARD",
    concept:"\"it looks fake. it's four ingredients.\" — illusion-plus-proof pour cut",
    intel:[
      {type:"PULSE", text:"CP-9: the food-video cut winning completion in the Aug 8-15, 2026 window is 'illusion plus proof' — open on something so hyperreal it reads as CGI or a trick, then cut to the interior or the texture as evidence it's real. The viewer gets process satisfaction AND a perceptual surprise, which is why it's beating ordinary meal-presentation footage. The structure has disbelief and receipt built into it. Willa's is the rare product where the receipt already exists on the back of the box, so the format costs nothing to adopt — the pour IS the illusion, the four-line list IS the proof."},
      {type:"TREND", text:"T-6: a PNAS paper in the Aug 11, 2026 print issue found indigestible plant proteins — not fiber alone — steer gut bacteria toward beneficial metabolites, and the authors suggest labels may eventually track resistant protein next to fiber. INTERNAL ONLY — no study, no journal, no mechanism ships in this brief's copy. What it changes is the sentence discipline: when Willa's says the category filters things out, it says fiber AND protein as one clause, never fiber alone. That's the only trace of T-6 the customer should ever see."},
      {type:"COMPETITOR", text:"C-2 (INTERNAL): a clean-label peer put a 12g-protein 'whole' plant milk into national retail on Aug 10, 2026 — gum-free and organic, but the protein comes from an added isolate and the list carries cane sugar. The word 'whole' is now being applied to a blend, which makes a literal, unedited texture demonstration more valuable than any number Willa's could print. Do not name the brand, do not counter-claim, do not mention protein grams on camera. The counter is that this pour was not engineered — it just is. Silence on the comparison is the strategy."}
    ],
    hooks:[
      {text:"you're going to think this pour is fake.", recommended:true},
      {text:"this is the part where somebody comments 'cgi.'", recommended:false},
      {text:"shhh… nothing in this shot has been edited.", recommended:false}
    ],
    caption:"Thick enough that people assume it's edited. It isn't. 🥛\n\nWilla's Original pours like that because it's made from the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled. Most oat milks filter out the bran and germ and then process the starch into sugar, which takes the fiber AND the protein out with it. We keep all of it. That's the entire reason it's rich and smooth instead of thin.\n\nIt looks fake. It's four ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt.\n\n1g of sugar, and it comes from the oats. No gums, no stabilizers, nothing added to make it behave on camera.\n\nCertified organic. Certified glyphosate-free, tested every lot.\n\nDrag a spoon through it. That's the whole argument.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#plantmilk",
      "#fouringredients",
      "#cleaningredients",
      "#dairyfree",
      "#foodtiktok",
      "#realfood"
    ],
    visual:"Bright and high-key, but the whole piece lives at macro distance — this is a texture film, not a kitchen film. Near-white counter (#FAFAF7), one clear straight-sided glass, cream board, Willa's Original carton. Hands only, no talent on camera. Hard mid-morning window light coming in from camera left with no diffusion and no filter, so the milk throws a real specular highlight and a real shadow on the counter — a soft, evenly-lit frame kills the illusion instantly because it reads as rendered. Two lenses do everything: a 100mm macro locked at glass height for the pour and the spoon drag, and a 50mm for the hard cut to the carton. The hero frame is the pour column itself, shot close enough that the glass rim is out of frame, so for the first three seconds the viewer cannot tell scale or product — that ambiguity IS the format. Hold it two beats longer than feels comfortable. Typography is navy ink (#202A44) on the milk-white frames, with the green (#75C596) reserved for one word only — the count on the receipt frame. Text enters as single lines, never stacked, always lower third, never over the pour column itself. SHOOT IT REAL: no cornstarch, no cream, no prop milk, no speed ramp on the pour, no viscosity added in post, no AI cleanup. If the pour doesn't look that rich straight out of camera, kill the brief — faking the proof shot on a transparency brand is the one mistake that can't be walked back. Final frame is the carton label-forward beside the half-empty glass with the spoon channel still visible in it.",
    script:[
      {scene:"HOOK", time:"0-3s", action:"Extreme macro, locked 100mm at glass height, hard window light: a pour column of Willa's Original falls into frame and lands in a clear glass. Shot so close that neither the glass rim nor the carton is visible — no scale, no branding, no context. The milk is opaque and folds over itself as it hits. On-screen text, navy, lower third: 'you're going to think this pour is fake.'"},
      {scene:"THE HOLD", time:"3-8s", action:"Do not cut. Same locked macro, pour continues and the level rises past frame center, the surface catching one hard highlight. Music drops out entirely — pour sound only, close-miked, almost too loud. Hold two beats past comfortable so the viewer starts composing the 'this is CGI' comment. Single line of on-screen text fades in at 6s: 'one take. no thickener.'"},
      {scene:"THE RECEIPT", time:"8-13s", action:"Hard cut, no transition, to a 50mm three-quarter of the Willa's Original carton flipped to its back label on the cream board. A finger enters and traces down the four-line ingredient list, one line per beat — organic whole grain oats, filtered water, organic vanilla extract, sea salt. Music snaps back in on the cut. On-screen text lands under the list: 'it looks fake. it's four ingredients.' — the word 'four' in green (#75C596), everything else navy."},
      {scene:"THE DRAG", time:"13-18s", action:"Cut back to the macro, now wide enough to read as a full glass. A spoon enters from frame right, is dragged slowly through the milk and lifted out — the channel it leaves holds for a full second before closing. Real time, no slow motion. On-screen text: 'same glass. same shot. no edit.'"},
      {scene:"END CARD", time:"18-20s", action:"Pull to a static 50mm two-shot: carton label-forward at frame right, the half-empty glass at frame left with the spoon channel still faintly visible. Nothing moves. On-screen text centered underneath, navy: 'Four ingredients. (Read 'em.)'"}
    ],
    audio:"No voiceover — the format is a perceptual trick and a narrator explains away the disbelief. Close-miked pour, spoon and glass sounds carried loud and dry, ASMR-adjacent. Music bed is a low, steady instrumental that CUTS TO SILENCE for the entire HOLD beat (3-8s) so the only thing in the viewer's ears is milk hitting glass, then snaps back hard on the cut to the label. If the team wants a trending bed, pull a current sound off the food-side tag pages the week of shooting rather than pinning one now — but whatever it is, the pour audio stays audible over it. That sound is half the proof.",
    duration:"18-20 seconds",
    cta:{soft:"watch it twice — the second time you're looking for the edit.", medium:"pour Willa's Original and do the spoon test yourself.", strong:"grab Willa's Original — four organic ingredients, made from the whole oat, 1g of sugar from the oats."},
    benefitShorthandId:"BS-2"
  },
  {
    id:"AUG17-PIN-3",
    platform:"Pinterest",
    pillar:"INGREDIENTS/RECIPES",
    pillarColor:"#75C596",
    flavor:"Original",
    dnaPattern:"meme-payload",
    timing:"Sun Aug 23 · 2pm",
    priority:"STANDARD",
    concept:"\"kinda chic that the only sugar in it came from the oats.\" — one line, one carton, no punchline",
    intel:[
      {type:"PULSE", text:"CP-6: the 'kinda chic' format — a creator names an unglamorous personal habit and calls it chic, over bossa nova or bedroom pop, with no joke at the end and no apology in front of it. Currently one of the strongest formats running on the feed. The register is the entire reason this brief exists: it is the closest thing on the feed right now to Willa's actual voice, which means Willa's runs it straight instead of adapting it. Play it as a bit and it breaks."},
      {type:"AUDIENCE", text:"The sugar truth is the least-repeated core fact Willa's owns — per Christina, even longtime followers are surprised to be reminded the gram of sugar in Original came from the oats and nothing was added. Pinterest is the right surface for a fact people forget, because a pin gets saved once and re-encountered months later. One claim stated once saves better than a proof stack, so this pin carries the sugar line and nothing else."},
      {type:"TREND", text:"T-8 (INTERNAL ONLY): a twelve-year cohort of 25,214 adults published Aug 10, 2026 tied the heaviest ultra-processed eaters to a 40% higher rate of type-2 diabetes, with body weight explaining only about a fifth of the association. None of that — no study, no figure, no disease language, no risk framing — goes anywhere near this pin or its caption. It is only the reason a sugar-origin post is worth making the week of Aug 17, 2026. Fear is the failure mode of this whole lane; calm is the counter-move."}
    ],
    hooks:[
      {text:"kinda chic that the only sugar in it came from the oats.", recommended:true},
      {text:"kinda chic that nobody had to add the sugar.", recommended:false},
      {text:"kinda chic that the oats brought their own gram of sugar.", recommended:false}
    ],
    caption:"One gram of sugar in Willa's Original, and the oats brought it. 🌾\n\nNothing was added — no cane sugar, no syrup, no sweetener of any kind. Willa's Original is made from the whole oat groat, the whole oat kernel the way steel-cut oats keep it, so the small sweetness that's in there belongs to the grain.\n\nCertified organic. Certified glyphosate-free, tested every lot.\n\nKinda chic that the only sugar in it came from the oats.",
    hashtags:[
      "#willas",
      "#oatmilk",
      "#organicoatmilk",
      "#wholeoat",
      "#lowsugaroatmilk",
      "#cleaningredients",
      "#glyphosatefree",
      "#dairyfree",
      "#plantmilk",
      "#realfood"
    ],
    visual:"Vertical 2:3 pin. One carton, one line of type, nothing else in the frame. Warm cream ground (#FAF7F0), navy ink (#202A44) for the type, green (#75C596) used once and only on the word 'oats' — that is the whole color system. Product still: Willa's Original shot straight-on at eye line, label forward, centered in the lower half, on soft north-facing daylight with a single long shadow falling right. No props, no counter styling, no glass, no oat scatter, no hands, no kitchen. The carton should read like a portrait, not a product shot. The hero line sits in the upper half, set large and generously leaded across two or three ragged lines with a hard break before 'came from the oats' — either a calm high-contrast serif (Canela / Editorial New register) or a clean neutral sans (Söhne / Suisse register), one weight, sentence case, lowercase 'k' on 'kinda'. That line is the only copy in the frame. NO second sentence, no subhead, no footer, no receipt strip, no nutrition callout, no check marks, no arrows, no icons, no leaf, no badge lockup, no percentage and no 'read the label' line — a single unexplained claim is the format, and any support copy kills it. Fishwife / Graza / Omsom zine-cover register: confident, spare, funny only in how flatly it's stated. Margins are generous and the composition must still parse at a 236px thumbnail — if the line doesn't read at thumbnail size, cut a word, don't shrink the type. Willa's wordmark small and quiet at the very bottom, or nowhere at all; the carton is already the signature.",
    script:null,
    audio:null,
    duration:null,
    cta:{soft:"save this one.", medium:"Willa's Original — the gram of sugar in it came from the oats.", strong:"pour Willa's Original: 1g sugar that came from the oats, 4g+ protein, 2g+ prebiotic fiber, certified organic and certified glyphosate-free, tested every lot."},
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
  {icon:"↑", title:"\"we've been waiting for somebody to write the test.\" opens the week Wed Aug 19 at 9am, with Christina in the first of her reserved on-camera slots.", reason:"A third-party standard for ultra-processed food is now on real packages, issued by the same body that already verifies Willa's Non-GMO — and one early mover cleared roughly 60% of its portfolio without changing an ingredient. The stance is the payload, which is the documented founder-POV exception; a faceless voiceover lands soft here. The carton answers by beat two: organic whole grain oats, filtered water, organic vanilla extract, sea salt. Guardrails are absolute — Willa's does not carry this seal and the brief never implies otherwise, no badge-stack flex, no politician, no 'chemicals'.", agent:"trend"},
  {icon:"↑", title:"\"the recipe came from a kitchen. the carton was the only new part.\" takes the Wednesday midday Instagram slot as a one-take answer, not an argument.", reason:"A national player left the ready-to-drink oat aisle citing lack of demand, and that fact stays entirely internal per the audience-outsider rule. What it changes is posture: confidence now outperforms commentary, so the Reel answers the plainest possible question — why do you make this at all — in one continuous handheld take beside the lineup. Ghia's founder warmth crossed with a co-founder-letter register, unpolished, no manifesto. Nothing about demand, shelf space, forecasts or the category's health, no identifiable retailer signage, and no century-gap heritage framing, which is spent.", agent:"composer"},
  {icon:"↑", title:"The parenting slot answers the oat question before the law does: \"you shouldn't have to read a carton twice.\"", reason:"A House bill would replace 'wheat' in the major-allergen definition with 'gluten-containing grain' and name oats outright, which turns a quiet parent question into printed type. Willa's answers now, while it is a choice — Kids is free of the top nine major allergens, 8g protein, plant-based calcium, DHA, 100 out of 100 on the Clean Label App, glossed in one line. Cofounder-sister on camera for the first-person mom POV, Partake's unapologetic parent-first warmth, relief rather than fear. The top-nine claim belongs to Kids only, no bill reference, no medical advice, and no back-to-school door anywhere in it.", agent:"editor"},
  {icon:"↑", title:"The kitchen-scale moment gets converted into an invitation rather than a pile-on: \"we built this carton to be checked.\"", reason:"A shopper weighed every stick in a box of butter, found all of them short, and sent an entire comment section to their kitchen scales. The story isn't the butter — it's that people have stopped taking the front of a package on faith, which is the best thing that can happen to a brand that survives being checked. So the play is generous: count them, scan it, look the glyphosate certification up yourself. Nobody gets named or alluded to, no Willa's carton goes on a scale, no certification recital, and the headline is the invitation rather than a read-the-label instruction.", agent:"pulse"},
  {icon:"×", title:"The self-certification story returning as this week's anchor, despite a full national news cycle behind it.", reason:"The mandatory-notification proposed rule was formally published in the Federal Register on Aug 11, 2026 with a comment window open into December, and the coverage was everywhere. It still doesn't ship: the burn corpus rests the self-certification lane outright after it ran as last Monday's lead trend and drove the founder TikTok, and the only genuinely new fact this week is procedural — a docket number and an open window. Running it would put the same lane on the Category tab two Mondays running. Held as internal context in case a real new angle appears.", agent:"editor"},
  {icon:"×", title:"The scoreboard version of the challenger's 12g-protein launch — reframed to \"protein has a return address. ours says oats.\"", reason:"A clean-label peer went national on Aug 10, 2026 with an organic multi-nut-and-legume blend at 12g protein, no gums or oils, and cane sugar on the list — with the protein coming from an added isolate rather than the plant itself. Putting 4g against 12g loses the framing and misses the point. The useful question for a shopper is whether the protein was already in the plant or added to hit a number, which Willa's answers from the groat. Nobody named, no protein-pay-up angle, no 'they finally caught up', and the line never extends to Kids, which uses organic pea protein by design.", agent:"comp"},
  {icon:"×", title:"The single biggest challenge on the board this week by volume.", reason:"A finger-count dance trend running off a Brazilian funk track is the dominant format of the window, and it is a pure dance-and-audio challenge — no reveal, no payoff slot, nowhere for a carton to sit. Forcing a beverage into it is precisely the chase-don't-ride failure the Tonal Resonance Framework exists to prevent. The meme slots went instead to the one-word repetition format, which has a fixed four-beat escalation the product can occupy, and to the illusion-plus-proof cut, which has disbelief and receipt built into its structure.", agent:"pulse"},
  {icon:"⚡", title:"Back-to-school is benched at zero this week — and the freshest new door found gets held rather than spent.", reason:"Back-to-school has run three straight weeks and the lunchbox, the morning, the allergy desk and the school-milk lane are all used. A state clean-label school-food law hitting its first school year surfaced in-window and is a genuinely new door, but the two label-policy cards already carrying the week do more for Willa's, and a fourth consecutive BTS week would read as the engine recycling its own calendar. It is first in line the moment a slot opens. The parenting briefs this week stand in two rooms that have nothing to do with school.", agent:"trend"},
  {icon:"⚡", title:"The week's one indulgent slot goes to Chocolate on the croissant ice cream sandwich pin — with the croissant itself named dairy-free in the list.", reason:"The two-ingredient build is everywhere in dessert content right now and the whole format lives or dies on what's inside it, which nobody has claimed with a clean ingredient list. Chocolate is structural here rather than a cameo: at least a cup churned into the base, real cacao, coconut sugar already in the carton, Good Food Awards Best Beverage as the quiet proof. The no-dairy rule reaches the pastry too, so the pin names a plant-based croissant and coconut cream for body. Pinterest is a search surface, so the title is literal and the cut cross-section is the hero.", agent:"visual"},
  {icon:"⚡", title:"Repetition gets its own object: \"kinda chic that the only sugar in it came from the oats.\"", reason:"The sugar truth is the least-repeated core fact in the library and the one longtime followers still forget, so it gets a post of its own instead of a clause inside somebody else's caption. The format carrying it is the quiet-flex text post — a preference stated calmly, called chic, and left to stand with no punchline and no self-deprecation, which is the closest thing on the feed to Willa's actual register. One line of type, one carton, no second sentence. No ingredient count, no read-the-label line, and no wink hard enough to turn it into a joke.", agent:"hook"}
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
  total:23180,
  lift:63,
  sessions:1952,
  topRoiFormat:"Layered drink build with the milk as the visible middle band (peaked AUG 10 – AUG 16)",
  topRoiPerBrief:2610,
  source:"Shopify + Klaviyo"
};

const AGENT_BY_ID = Object.fromEntries(AGENTS.map(a=>[a.id,a]));

// ─── Brief ↔ source links (the threading) ─────────────────
const BRIEF_LINKS = {
  "AUG17-TT-1":{
    trends:[
      "T-1",
      "T-8"
    ],
    pulse:[],
    comps:[
      "C-3"
    ]
  },
  "AUG17-IG-R1":{
    trends:[
      "T-4",
      "T-10"
    ],
    pulse:[],
    comps:[
      "C-1"
    ]
  },
  "AUG17-PIN-1":{
    trends:[],
    pulse:[
      "CP-4"
    ],
    comps:[]
  },
  "AUG17-IG-F1":{
    trends:[
      "T-6",
      "T-7"
    ],
    pulse:[],
    comps:[]
  },
  "AUG17-TT-2":{
    trends:[],
    pulse:[
      "CP-1"
    ],
    comps:[
      "C-2"
    ]
  },
  "AUG17-IG-R2":{
    trends:[],
    pulse:[
      "CP-3"
    ],
    comps:[]
  },
  "AUG17-TT-3":{
    trends:[
      "T-5"
    ],
    pulse:[],
    comps:[
      "C-2"
    ]
  },
  "AUG17-TT-4":{
    trends:[
      "T-1"
    ],
    pulse:[
      "CP-7"
    ],
    comps:[]
  },
  "AUG17-IG-R3":{
    trends:[
      "T-2"
    ],
    pulse:[],
    comps:[]
  },
  "AUG17-PIN-2":{
    trends:[
      "T-7",
      "T-6"
    ],
    pulse:[],
    comps:[]
  },
  "AUG17-TT-5":{
    trends:[],
    pulse:[
      "CP-8"
    ],
    comps:[]
  },
  "AUG17-IG-R4":{
    trends:[],
    pulse:[
      "CP-10"
    ],
    comps:[]
  },
  "AUG17-IG-F2":{
    trends:[
      "T-3",
      "T-1"
    ],
    pulse:[],
    comps:[
      "C-3"
    ]
  },
  "AUG17-TT-6":{
    trends:[],
    pulse:[
      "CP-5"
    ],
    comps:[]
  },
  "AUG17-IG-R5":{
    trends:[
      "T-6"
    ],
    pulse:[
      "CP-9"
    ],
    comps:[
      "C-2"
    ]
  },
  "AUG17-PIN-3":{
    trends:[
      "T-8"
    ],
    pulse:[
      "CP-6"
    ],
    comps:[]
  }
};



// ─── Paid Amplify Plans (Paid Media Planner output) ──────
const AMPLIFY_PLANS = {
  "AUG17-IG-R1":{
    headline:"Why we make this at all — the founder answer that never mentions the aisle",
    why:"This is the largest budget on the board, and it is deliberately behind warmth rather than argument. The Aug 10 – Aug 16 week showed that a position travels well among people who already know the brand and lands soft on people who do not, while a plainly-shot human answer travels in both directions. What this buys is simple: someone who has never heard of Willa's meets a real person explaining why she makes this, in one unbroken take, with the four-ingredient reason arriving in the second sentence. Nothing in the copy or the targeting touches the category's health, anyone's sales, or the fact that a larger company just walked away — that context is why the post exists and it stays entirely on our side of the wall.",
    totalBudget:420,
    testWindow:"6 days (Wed Aug 19 → Mon Aug 24)",
    objective:"Profile visits + Saves",
    guardrail:"Auto-pause if sentiment falls below 0.90, or on any comment thread that pulls the post into category-decline or is-oat-milk-over talk — the entire value of this brief is that it never argues, and a defensive comment section makes the spend the problem. Also pause if CPM clears $10.",
    placements:[
      {platform:"Meta", format:"Reels + Stories, Advantage+ placements", budget:280, reach:"~24-32K reach", expectedReach:"~24-32K reach", audience:"Cold interest — clean label, organic grocery, ingredient-first shoppers, women 28-48, US; plus warm retargeting of 90-day site visitors", lookalike:"1% LAL of purchasers", note:"In plain terms: this is the introduction post. Most of the money is on people who have never met the brand, because a founder saying why she makes something is the cheapest trust the engine can buy."},
      {platform:"TikTok", format:"In-feed Spark Ad", budget:140, reach:"Cold + warm", expectedReach:"Cold + warm", audience:"Small-brand founders, clean label, grocery hauls, 25-45", note:"Spark the organic post rather than a cut-down. The comments underneath a founder answer are part of what makes it credible, and a fresh ad upload throws them away."}
    ]
  },
  "AUG17-IG-R3":{
    headline:"The oats question parents already ask — answered plainly, while it is still a choice",
    why:"Parents have been quietly asking whether oat milk is genuinely safe for their kid for years, and that question is about to be printed on packaging across the country. Getting there first is worth real money for a narrow window, because the answer is short and Willa's Kids actually has it: free of the top 9 allergens, 8g protein, plant-based calcium and DHA, and a perfect 100 on the label-scanning app parents already use. The Aug 10 – Aug 16 week's highest sentiment came from the parenting brief that led with relief rather than alarm, and the spend here is tuned to protect exactly that. Modest budget, tight interest targeting, short flight — this is about being findable at the moment the question gets asked, not about scale.",
    totalBudget:280,
    testWindow:"5 days (Fri Aug 21 → Tue Aug 25)",
    objective:"Saves + Link taps",
    guardrail:"Auto-pause immediately on any comment reading the post as allergy or medical advice, and pause if sentiment dips below 0.92 — the bar is higher here than anywhere else this week. Interest targeting only; no health-condition audiences, which Meta restricts and which would be the wrong door regardless.",
    placements:[
      {platform:"Meta", format:"Reels + Stories", budget:280, reach:"~19-26K reach", expectedReach:"~19-26K reach", audience:"Parents of kids 2-10, allergen-free cooking, kids' nutrition, label-scanning app users, US", lookalike:"1% LAL of Kids purchasers", note:"What this means for you: no TikTok split on this one. The parent who reads a label twice and still isn't sure is on Instagram, and splitting a small budget across two platforms would make it invisible on both."}
    ]
  },
  "AUG17-TT-4":{
    headline:"Count them, scan it, look it up — the open-door dare",
    why:"A shopper caught a household brand short-weighting every stick in the box on Aug 11 and sent a whole comment section to their kitchen scales. That instinct is the best thing that has happened to brands that survive being checked, and the only correct response is to invite it rather than comment on it. Paid works here because the post is generous instead of defensive — it names nobody, accuses nobody, and simply opens the door. The Aug 10 – Aug 16 read is that the non-defensive register is what holds sentiment when a trust conversation gets loud, so the spend goes wide on TikTok where the original moment lives and stays small on Meta where the audience already trusts us.",
    totalBudget:230,
    testWindow:"4 days (Fri Aug 21 → Mon Aug 24)",
    objective:"Saves + Profile visits",
    guardrail:"Auto-pause if the comment section turns into a pile-on against any named brand — the moment this reads as punching down, the generosity that makes it work is gone. Also pause if sentiment falls below 0.90 or if negative feedback clears 0.08%.",
    placements:[
      {platform:"TikTok", format:"In-feed Spark Ad", budget:160, reach:"Cold reach", expectedReach:"Cold reach", audience:"Label-checking, grocery-price watching, food transparency, 25-45, US", note:"Cold on purpose. The people who spent the week weighing things in their own kitchens have no idea this brand exists, and they are the single most receptive audience on the board right now."},
      {platform:"Meta", format:"Reels", budget:70, reach:"Warm", expectedReach:"Warm", audience:"Existing followers, email subscribers, 90-day engagers", note:"Small and warm. Followers do not need to be dared — they need to see the brand say it out loud so they can send it to someone else."}
    ]
  },
  "AUG17-TT-1":{
    headline:"Someone finally wrote the test down — the calm stance, deliberately under-funded",
    why:"The smallest budget of the four, on purpose. For three years ultra-processed has been an argument with no scoreboard, and a third party has now written the bar down and started testing products against it. That is worth a founder saying so calmly — but a stance post is the cheapest thing in the engine to over-fund and the fastest to start looking like a campaign. The payoff here is profile visits and trust rather than immediate saves. It also carries the tightest copy risk of the week: the seal is not on the Willa's carton, and the post cannot say or imply otherwise, which makes the comment section the real thing to watch rather than the cost per view.",
    totalBudget:170,
    testWindow:"4 days (Wed Aug 19 → Sat Aug 22)",
    objective:"Profile visits",
    guardrail:"Auto-pause on any comment reading the post as a claim that Willa's carries the new mark — that is the one failure mode and it is not fixable with a reply. Also pause if the thread turns political in any direction or if sentiment falls below 0.88.",
    placements:[
      {platform:"TikTok", format:"In-feed Spark Ad", budget:110, reach:"Cold + warm", expectedReach:"Cold + warm", audience:"Clean label, food transparency, ingredient-first shoppers 28-50, US", note:"Founder credibility is the payload — this is one of only two briefs all week where a face outperforms hands."},
      {platform:"Meta", format:"Reels", budget:60, reach:"Warm", expectedReach:"Warm", audience:"Existing followers + email subscribers", note:"Deliberately tiny. If this needs a budget to travel, the stance is not landing and more money will make that louder, not better."}
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
  {date:"Aug 17, 2026", agent:"trend", msg:"Swept food policy, nutrition science, plant-milk retail and clean-label brand news against an Aug 10 recency floor. Ten trends cleared. The lead is a third-party non-UPF standard that has stopped being an announcement and started appearing on real packages — issued by the same body that already verifies Willa's Non-GMO."},
  {date:"Aug 17, 2026", agent:"editor", msg:"Ran the published-versus-covered check on every study before it reached a card. Three failed: a diet paper written up Aug 17 but published Aug 6, a science-press piece resting on a 2025 journal article, and an oat-milk feature that direct-fetch dated to Feb 1, 2022. All three read as fresh in the headline and none of them are."},
  {date:"Aug 17, 2026", agent:"pulse", msg:"Ran the format, food, parenting, entertainment and discourse lanes and cleared ten signals, each with a checkable live example. The single biggest dance of the week was passed over — it is audio and finger-counting with no reveal slot a carton can occupy, and riding it would be chasing."},
  {date:"Aug 17, 2026", agent:"comp", msg:"Logged three in-window competitive fronts: a national player confirming Aug 11 that it has left ready-to-drink oat milk, a clean-label challenger putting a 12g-protein blend into national retail Aug 10, and a first wave of brands printing the non-UPF seal Aug 11 ahead of any federal definition."},
  {date:"Aug 17, 2026", agent:"editor", msg:"Rolled the burn corpus forward. Back-to-school entered the week capped at two briefs and earned zero — the genuinely new door on the board was a state school-food law, and the two label-side policy signals did more for the brand. Both parenting briefs this week leave the school building entirely."},
  {date:"Aug 17, 2026", agent:"composer", msg:"Built sixteen briefs against a three-per-signal cap. Nothing came close to the ceiling: the heaviest draw is two on the non-UPF standard, and each takes a different shape — a stance to camera Wed Aug 19 and a static carousel about proof moving back onto the box Sat Aug 22."},
  {date:"Aug 17, 2026", agent:"visual", msg:"Spent both reserved on-camera slots on Wed Aug 19, against a cap of three — the standard stance at 9am and the why-we-make-this aisle answer at noon. Barista sits the week out entirely, which keeps the coffee slot banked. Every Reel and TikTok carries a populated shot list for the phone mockup."},
  {date:"Aug 17, 2026", agent:"hook", msg:"Ran every recommended hook through the wordy-is-wrong test and cut three concepts back to one clean line. The one-word repeat format was shortened until the payload is literally a single syllable four times over — the version with an explanation bolted on the end tested as two posts stapled together."},
  {date:"Aug 17, 2026", agent:"editor", msg:"Flagged and rewrote the one claim that could have sunk the lead brief: an early draft implied Willa's already carries the new non-UPF mark. It does not. Telling shoppers to look for a seal that is not on the carton is the single fastest way to lose a transparency brand its argument."},
  {date:"Aug 17, 2026", agent:"amb", msg:"One ambassador brief this week, Sun Aug 23 — a real cart, five things someone refuses to cheap out on, Willa's fourth and never the finale. The other four have to be genuinely admired non-competing pantry brands or the list reads as a placement, and price never gets said out loud."},
  {date:"Aug 17, 2026", agent:"paid", msg:"Amplification concentrates on four briefs and $1,100. The largest share goes to the founder answer in the aisle rather than to the stance post — on the Aug 10 – Aug 16 read that warmth out-travels argument on cold audiences, and that a calm position over-funded starts to look like a campaign."},
  {date:"Aug 17, 2026", agent:"perf", msg:"Rolled the Aug 10 – Aug 16 briefs into results. A build took reach and saves outright for the second refresh running, and the pin posted the lowest reach and highest save-rate of the week for the third. Both findings are already routed into this week's slate."}
];


// ─── Killed signals (the ones we said no to) ──────────────
const KILLED = [
  {signal:"The mandatory food-additive notification rule formally publishing with a public comment window open into December", reason:"Real, in-window and covered by every national outlet. Killed anyway: the burn corpus rests the self-certification lane outright after it ran as last Monday's lead trend and drove the founder TikTok, and the only genuinely new fact this week is procedural — a docket number and an open window. Running it puts the same lane on the Category tab two Mondays running. Held as internal context."},
  {signal:"A state clean-label school-food law reaching its first school year", reason:"A genuinely fresh back-to-school door — not the lunchbox, the morning, the allergy desk or the school-milk provision. Held rather than shipped, because back-to-school has run three straight weeks and the two label-policy cards already carrying the week do more for Willa's. First candidate to promote the moment a slot opens."},
  {signal:"The blend-frozen-produce-into-ice-cream trend", reason:"In-window and a natural assist for an oat creamer, but the mechanic is the same one already burned twice — watermelon ice cream in mid-July and frozen-fruit shaved ice the week after. A new frozen treat has to be a different format, not a different fruit. Replaced with the croissant ice cream sandwich, which is a bakery build and a different shape entirely."},
  {signal:"The $22 celebrity smoothie recreated at home", reason:"In-window and a clean ride for a milk-base cutaway, but this exact smoothie was already the second source behind last Monday's borrowed-celebrity-reach card. Same event, second week — a hard repeat."},
  {signal:"A heart surgeon's viral claim that swapping cooking oils cuts heart attacks 30%", reason:"A textbook single-number overclaim and a real rebuttal candidate, killed on two grounds. The seed-oil lane is rested pending genuinely new federal action, and Willa's Barista carries organic high-oleic sunflower oil — so a card headlined on oils drags the team toward the one ingredient conversation where Willa's has to caveat itself. Replaced with a restriction-framing rebuttal that carries no ingredient exposure."},
  {signal:"The 'cortisol cocktail' as this week's misinformation rebuttal", reason:"Checked the full coverage history. Every substantive debunk is dated between 2024 and July 2026, and the only item inside the window is a product-promotion press release, which is marketing rather than a news hook. Fails the recency floor."},
  {signal:"A vegan-diet energy-density study covered by the science press on Aug 17, 2026", reason:"The covered-versus-published trap. The journal publication date is Aug 6, 2026 — outside the Aug 10–17 window. The Aug 17 write-up is coverage of a paper that had already run, and the engine cites publication dates, not pickup dates."},
  {signal:"Two nutrition papers resurfacing inside fresh science-press write-ups", reason:"Same trap, further gone. An orange-juice gene-expression study behind an Aug 13, 2026 article is dated 2025, and an oat-milk avenanthramide piece that looked like a perfect fit turned out on direct fetch to be published Feb 1, 2022. Four years stale. Neither is an in-window signal no matter how current the article carrying it looks."},
  {signal:"The single biggest dance challenge of the week by volume", reason:"A finger-count trend on a Brazilian funk track, dominant across every roundup, and a pure dance-and-audio format with no reveal and no payoff slot a carton can occupy. Riding it would be chasing rather than riding, which is exactly what the Tonal Resonance Framework guards against."},
  {signal:"The weekly peer-brand humor scan", reason:"No card shipped from this lane again. Instagram fetches returned login walls, and two guessed handles turned out to belong to unrelated accounts — not a single dated post permalink could be verified, and the never-fabricate rule outranks the lane. The reliable path remains creative trade press, and nothing surfaced there inside the window."}
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
  "AUG17-TT-1":{direct:"We've been waiting for somebody to write the test. 🌾\n\nWilla's Original is four things: organic whole grain oats, filtered water, organic vanilla extract, sea salt. You could set all four on a counter and point at them one at a time.\n\nHere's what changed. For years, \"ultra-processed\" — food assembled from parts you'd never cook with at home — has been an argument with no ruler. Everyone had a position, nobody had a line. Earlier this year, a third party finally put that line on paper and started testing real products against it. This month, another one cleared it without changing a single ingredient.\n\nThat's the part worth sitting with. The bar didn't ask anyone to reformulate. It asked what was in there.\n\nWilla's has been pouring the same answer since 2021 — the whole oat groat, whole oat kernels, like steel-cut oats before they're rolled. Most oat milks filter out the bran and germ, then process the starch into sugar, and the fiber AND the protein leave with it. Ours stay: 4g+ protein, 2g+ prebiotic fiber, 1g of sugar that comes from the oats.\n\nAn argument you can't settle is exhausting. A bar you can see is a gift.", warm:"Oats, water, vanilla, salt — four things you could line up on a counter and point at. That's been the list since Willa's launched in 2021. 🌾\n\nFor years \"ultra-processed\" was a word everybody used and nobody could measure. Earlier this year a third party finally wrote the bar down and started testing real food against it — and this month, another brand cleared it without changing a thing.\n\nWe've been waiting for somebody to write the test. Turns out the answer was always going to be short.", punchy:"\"Ultra-processed\" finally has a bar. Willa's Original has four things you could set on a counter: organic oats, water, vanilla, sea salt. 🌾"},
  "AUG17-IG-R1":{direct:"Christina, in the chilled aisle, answering the question she gets asked more than any other: why make this at all? 🥛\n\nWilla was her grandmother. She cooked with real food, and she had a way of making everyone at her table feel like the most interesting person in the room. Willa's exists to keep doing both.\n\nWilla's Original is four organic ingredients — whole grain oats, filtered water, vanilla extract, sea salt. It's made from the whole oat groat, whole oat kernels like steel-cut oats before they're rolled, which is why it pours rich and smooth. 4g+ protein, 2g+ prebiotic fiber, and 1g of sugar that comes from the oats.\n\nCertified organic. Certified glyphosate-free, tested every lot. Mother-founded, WBENC certified.\n\nThe recipe came from a kitchen. The carton was the only new part.\n\nWe'll be right here. 🌾", warm:"\"People ask why we make this.\" Christina, in the aisle, with the actual answer — one take, no cuts. 🥛\n\nWilla was her grandmother: real food, and a way of making everyone at her table feel like the most interesting person in the room. Willa's Original is four organic ingredients and the whole oat, which is the entire reason it pours rich instead of thin.\n\nThe recipe came from a kitchen. The carton was the only new part. 🌾", punchy:"The recipe came from a kitchen. The carton was the only new part. Willa's Original — four organic ingredients, made from the whole oat. 🌾"},
  "AUG17-PIN-1":{direct:"The best dessert on the internet right now is a croissant that spent the night in the freezer. 🥐🍫 Split it, pack it with chocolate oat milk ice cream, freeze it solid, then cut it straight down the middle — the flake against the cold is the entire reason this one travels.\n\nWilla's Organic Chocolate Oat Milk is made with real cacao and five simple organic ingredients, with 50% less sugar — rich and creamy enough to churn into actual ice cream instead of just flavoring it. It won Best Beverage at the Good Food Awards. 🥛\n\nTwo ingredients. One of them won Best Beverage.\n\nIngredients\n- 1½ cups Willa's Organic Chocolate Oat Milk\n- ½ cup canned coconut cream, chilled\n- 2 tbsp maple syrup\n- 1 tbsp organic cacao powder\n- pinch of sea salt\n- 4 dairy-free croissants — a vegetable-oil-based puff pastry or crescent dough rolled and baked works, but read the label before you buy: several mainstream doughs skip butter and still list whey or milk. A bakery croissant marked vegan or dairy-free is the safest swap if your store carries one\n- flaky sea salt, to finish\n\nBlend, freeze 4 hours, stirring every hour (no ice cream maker needed). Split the cooled croissants, pack them full, freeze 2 more hours, then slice.", warm:"Two ingredients, and shhh… one of them won Best Beverage. 🥐🍫 A croissant, split and packed with chocolate oat milk ice cream, frozen solid and cut straight through — flake on the outside, cold in the middle, nothing on the list you'd have to explain.\n\nWilla's Organic Chocolate Oat Milk churns into real ice cream because it's made with real cacao, five organic ingredients and coconut sugar instead of cane.\n\nIngredients\n- 1½ cups Willa's Organic Chocolate Oat Milk\n- ½ cup canned coconut cream, chilled\n- 2 tbsp maple syrup\n- 1 tbsp organic cacao powder\n- pinch of sea salt\n- 4 dairy-free croissants (a vegetable-oil-based puff pastry or crescent dough — check the label for whey or milk, or grab a bakery croissant marked vegan/dairy-free)\n- flaky sea salt, to finish", punchy:"Two ingredients. One of them won Best Beverage. 🥐🍫 Croissant ice cream sandwiches, made with Willa's Chocolate — real cacao, five organic ingredients, no cane sugar."},
  "AUG17-IG-F1":{direct:"Willa's Original keeps both halves of the oat — 2g+ prebiotic fiber, the kind your gut bacteria feed on, and 4g+ protein. Per cup. 🌾\n\nThe fiber was never working alone. The aisle has spent two years shouting one number, and the newer nutrition work keeps landing on a pair instead: fiber does part of the job, and the plant protein that makes it all the way through your system intact is pulling its weight right next to it.\n\nWhich is awkward for a category that loses both on the way to the carton. Most oat milks filter the bran and the germ off before the oat ever becomes milk, then process what's left into sugar — and the fiber and the protein were both living in the part that just left. Vs. the average oat milk: under 1g of each.\n\nWilla's never took that shortcut. Whole oat groats go in — bran and germ still attached — so the pair stays put. Four organic ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt. Certified organic. Certified glyphosate-free, tested every lot.\n\nWe didn't add the protein back in. We just never took it out.", warm:"Two things in an oat are worth keeping. Most of the aisle shows up with neither. 🌾\n\nThe fiber was never working alone — the plant protein sitting right there in the oat is doing its half. Willa's Original brings both to the glass: 2g+ prebiotic fiber, the kind your gut bacteria feed on, and 4g+ protein per cup, out of four organic ingredients.\n\nShhh… we've been pouring the pair the whole time.", punchy:"The fiber was never working alone. Willa's Original brings the pair — 2g+ prebiotic fiber and 4g+ protein, per cup, out of four organic ingredients. 🌾"},
  "AUG17-TT-2":{direct:"Oats. 🌾\n\nWilla's Original is four organic ingredients: whole grain oats, filtered water, vanilla extract, sea salt.\n\n4g+ protein. 2g+ prebiotic fiber — the kind that feeds your gut. 1g of sugar, and it came along with the oats.\n\nCertified organic. Certified glyphosate-free, tested every lot.\n\nRich and smooth, with nothing holding it together but the oat.", warm:"Four questions. One answer. 🌾\n\nWilla's Original is four organic ingredients, and the oat is doing almost all of the work — 4g+ protein, 2g+ prebiotic fiber, 1g of sugar that came along for the ride. No gums holding it together.\n\nShhh… that's the whole trick.", punchy:"Oats. 🌾 4g+ protein, 2g+ prebiotic fiber, 1g sugar — all from the same place."},
  "AUG17-IG-R2":{direct:"The last stretch of August had us craving something icy and sharp — and then, somehow, creamy. 🍋☀️ Creamy lemonade sits right between a milkshake and a slushie, and the whole thing turns on one variable: what you blend in. Watch the yellow go opaque and hold — that's the whole video.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 Four ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt. That's why it blends creamy instead of thin — and why it stays that way in the glass.\n\nIngredients\n- 1 cup Willa's Organic Oat Milk, cold\n- 1/3 cup fresh lemon juice (about 2 lemons)\n- 3 tbsp maple syrup, more if your lemons are mean\n- 1 tsp lemon zest\n- 2 cups ice\n- a pinch of sea salt\n\nBlend the ice, lemon, maple, zest and salt first, then pour in the cold Willa's and blend 20 seconds more. Cold and fast is the trick — it goes opaque and holds. Pour, zest over the top, drink it before it warms up.", warm:"Tart, icy, and then — creamy. 🍋 The internet's creamy lemonade is a two-minute drink, and the only thing it really tests is the milk you blend into it.\n\nWilla's Organic Oat Milk uses simple organic ingredients and the whole entire oat for a rich, smooth taste, less sugar, and more protein and fiber per cup. 🥛 Shhh… it goes opaque and it holds.\n\nIngredients\n- 1 cup Willa's Organic Oat Milk, cold\n- 1/3 cup fresh lemon juice\n- 3 tbsp maple syrup\n- 1 tsp lemon zest\n- 2 cups ice\n- a pinch of sea salt\n\nIce, lemon, maple, zest and salt first. Willa's last. Blend 20 seconds and pour.", punchy:"Lemonade in, lemon pie out. 🍋 1 cup Willa's Organic Oat Milk, 1/3 cup lemon juice, 3 tbsp maple, ice — blend until the yellow goes opaque and holds."},
  "AUG17-TT-3":{direct:"Willa's Original has 4g+ protein and 2g+ prebiotic fiber — the kind gut bacteria actually feed on — and both were in the oat before we ever opened the bag. 🌾\n\nHere's the label question worth asking any time a plant milk posts a big protein number: was that protein in the plant, or was it added to the plant to hit the number? Both are legal. Both print the same on the front of the carton. They are not the same food.\n\nAn isolate is protein pulled out of one crop and stirred into another — the fastest way to make a number big. Willa's Original doesn't use one. It's made from the whole oat groat, the whole kernel with the bran and germ still on it, which is why the protein and the prebiotic fiber both survive the trip into the carton. Most oat milks discard the bran and germ, and that takes the fiber AND the protein with them.\n\nThe 1g of sugar came from the oats too. Nothing added to hit a number, at either end of the label.\n\nFour organic ingredients: whole grain oats, filtered water, organic vanilla extract, sea salt. Certified organic. Certified glyphosate-free. We test every lot.\n\nProtein has a return address. Ours says oats.", warm:"Big number on the front of a plant milk? There's one more question worth asking: was that protein in the plant, or added to it? 🌾\n\nWilla's Original — 4g+ protein, 2g+ prebiotic fiber, 1g of sugar — and all three of those came out of the oat, not out of a bag of isolate. Four organic ingredients. The whole oat groat, bran and germ still on it.\n\nShhh… we never had a number to hit.", punchy:"Protein has a return address. Willa's Original says oats — 4g+ protein, 2g+ prebiotic fiber, four organic ingredients, 1g of sugar. 🌾"},
  "AUG17-TT-4":{direct:"Four organic ingredients: whole grain oats, filtered water, vanilla extract, sea salt. Count them. 🥛\n\nCertified glyphosate-free by The Detox Project — the third party that tests every lot for weedkiller residue. Look it up without asking us.\n\nScan the carton in the Clean Label App (Yuka scans groceries and scores the ingredients out of 100). Willa's Original comes back 94.\n\n4g+ protein. 2g+ prebiotic fiber — the kind that feeds your gut. 1g of sugar, and it came in with the oats. Most oat milks filter out the bran and germ and process the starch into sugar, which takes the fiber AND the protein with it. Willa's keeps the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled.\n\nGot a question about any of the four? Ask it in the comments. We'll answer every one.\n\nWe built this carton to be checked.", warm:"A lot of people have started checking things lately — counting, scanning, looking things up instead of taking the front of a package at its word. 🥛 Shhh… we've been hoping for this.\n\nWilla's Original is four organic ingredients, certified organic and certified glyphosate-free, tested every lot. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar that came in with the oats.\n\nCount them, scan it, look up the certification, ask us anything. We built this carton to be checked.", punchy:"Four organic ingredients, a 94 in the Clean Label App, and a glyphosate certification you can look up yourself. 🥛 We're not nervous."},
  "AUG17-IG-R3":{direct:"Willa's Kids has none of the nine major food allergens in it. No dairy, no nut, no soy, no gluten, no sesame. That's the short answer, and it's the same answer every single time you pick up the carton. 🌾\n\n8g of protein — the same as a cup of dairy milk, with half the sugar. Plant-based calcium, vitamin D, and DHA omega-3s from algae oil, the omega-3 most kids fall short on. 6g of sugar, all of it from organic maple syrup.\n\nHave you scanned it on Yuka? It's the Clean Label App — it scans groceries and scores the ingredients out of 100. Willa's Kids comes back 100 out of 100. Bobby Approved, too.\n\nWilla's Kids exists because parents asked us for it. So when a parent asks what's in it, the answer should take about four seconds.\n\nQuestions about a diagnosed allergy belong with your pediatrician. Questions about what's in the carton belong to us.\n\nYou shouldn't have to read a carton twice.", warm:"The question we get asked most about Willa's Kids is a short one. So is the answer. 🌾\n\nNone of the nine major food allergens — no dairy, no nut, no soy, no gluten, no sesame. 8g of protein, plant-based calcium, vitamin D, and DHA omega-3s from algae oil.\n\nThat's our cofounder, in her own kitchen, holding the carton she asked us to make. Shhh… it scans 100 out of 100 on Yuka, the app that scores the ingredients.\n\nYou shouldn't have to read a carton twice.", punchy:"None of the nine major food allergens. 8g of protein. 100 out of 100 on Yuka, the app that scores the ingredients. Willa's Kids — the whole answer takes four seconds. 🌾"},
  "AUG17-PIN-2":{direct:"Four ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt. That is the entire list on Willa's Original. 🥛\n\nNo gums. No stabilizers. No phosphates. And no enzymatic oat-syrup process — the shortcut where the bran and germ get filtered out and the starch gets processed into sugar, taking the fiber AND the protein with it.\n\nWilla's Original keeps the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled. That is where the 2g+ prebiotic fiber comes from — the kind that feeds good gut bacteria — plus 4g+ protein and 1g of sugar, from the oats, nothing added.\n\nCertified organic. Certified glyphosate-free, tested every lot. Mother-founded, WBENC certified.\n\nRich and smooth is supposed to come from the oat. Ours does.\n\nNo stabilizers. It stands up on its own.", warm:"Shhh… the interesting part of this label is the part that isn't there. 🥛\n\nNo gums, no stabilizers, no phosphates in Willa's Original — just organic whole grain oats, filtered water, organic vanilla extract and sea salt. It pours rich and smooth because it's made from the whole oat instead of oat syrup, which is also where the 2g+ prebiotic fiber and 4g+ protein come from.\n\nNo stabilizers. It stands up on its own.", punchy:"No gums. No stabilizers. No phosphates. Willa's Original stands up on its own — four organic ingredients, 2g+ prebiotic fiber, 1g sugar. 🥛"},
  "AUG17-TT-5":{direct:"Every so often the feed decides food is a competition. Willa's has never had a side to pick — just a short list and a full table. 🍞\n\nFour things go in Willa's Original: organic whole grain oats, filtered water, organic vanilla extract, sea salt. 4g+ protein, 2g+ prebiotic fiber — the kind that looks after your gut — and 1g of sugar that comes from the oats.\n\nMost of the category filters the bran and germ out of the oat and processes what's left into sugar. The protein leaves with the fiber. Willa's keeps the whole oat groat — the entire kernel, the way steel-cut oats keep it — so nothing has to be added back in later.\n\nCertified organic. Certified glyphosate-free by The Detox Project, tested every lot. Mother-founded, WBENC certified.\n\nBread on the board. Fruit in the bowl. Something warm. A carton with nothing hiding on the back.\n\nNothing on this table is a side you have to pick.", warm:"Eating well has never required quitting anything. 🍞\n\nWilla's Original is four organic ingredients, built on the whole oat groat rather than oat syrup — 4g+ protein, 2g+ prebiotic fiber, 1g of sugar that comes from the oats.\n\nShhh… we're not picking a side. We're setting a table.", punchy:"Four organic ingredients, 1g of sugar from the oats, and no team to join. 🍞 Willa's Original."},
  "AUG17-IG-R4":{direct:"Saturday morning, one carton, two drinks. 🥛\n\nOur cofounder poured her kid a glass of Willa's Kids, then poured the rest of the same carton over ice into her own coffee. Nobody staged that part.\n\nThe best swirl in the fridge is on the Kids carton. We don't have a better explanation than that — it just does it, and we've stopped apologizing for how good it looks.\n\nMade from the whole oat — bran, germ and all — not oat syrup. 8g protein. Top-9-allergen-free.\n\nShhh… the one we designed for kids' tastebuds is the one the grown-ups keep finishing.\n\nSame carton. Two glasses. One of them has ice in it.", warm:"One carton went out to the counter Saturday morning and came back half gone. 🥛 The kid had a glass. Our cofounder put the rest over ice in her coffee and watched it swirl for longer than she'd admit.\n\nShhh… the one we designed for kids' tastebuds is the one the grown-ups keep finishing. 8g protein, top-9-allergen-free, made from the whole oat.\n\nSame carton. Two glasses. One of them has ice in it.", punchy:"The kid gets a glass. She gets the swirl in her iced coffee. Same carton, two reasons — Willa's Kids, 8g protein, top-9-allergen-free. 🥛"},
  "AUG17-IG-F2":{direct:"Willa's Original is four organic ingredients, and every one of them is printed on the front of the carton. 🥛\n\nOrganic whole grain oats. Filtered water. Organic vanilla extract. Sea salt. No code to scan, no site to visit, no number to call — the box is the answer.\n\nNext to that list sits a butterfly: Non-GMO Project Verified. 'Bioengineered' is the label word for genetically modified ingredients, and that mark is where the answer lives on our carton — in ink, on the front, where you were already looking.\n\nMade from the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled — so the fiber and the protein both stay in. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar, from the oats, nothing added.\n\nCertified organic. Certified glyphosate-free, tested every lot.\n\nProof spent a decade quietly moving off the package. Ours never left it.\n\nOur label isn't a link.", warm:"Four organic ingredients, and all four are on the front of the carton. 🥛\n\nNo code to scan, no site to visit, no number to call — Willa's Original just says it out loud: organic whole grain oats, filtered water, organic vanilla extract, sea salt. Non-GMO Project Verified is printed right there next to them.\n\nShhh… our label isn't a link.", punchy:"Our label isn't a link. 🥛 Willa's Original — four organic ingredients, printed on the front. Nothing to scan."},
  "AUG17-TT-6":{direct:"Number four on the list has four ingredients. 🥛\n\nFive things in a real cart that never get swapped — and this is the one that reads shortest on the back. Willa's Original is organic whole grain oats, filtered water, organic vanilla extract and sea salt. That's the entire list.\n\nIt's made from the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled — instead of oat syrup. Most of the category filters out the bran and the germ first, then processes the starch into sugar, which takes the fiber AND the protein out before the carton is ever filled. Willa's keeps both: 4g+ protein, 2g+ prebiotic fiber, the kind that feeds your gut, and 1g of sugar that came from the oats.\n\nCertified organic. Certified glyphosate-free, tested every lot. Mother-founded, WBENC certified.\n\nWilla's Original goes in the coffee. Willa's Kids goes in the glass. Same cart, same trip.\n\nA list like this isn't really a list of things you buy. It's a list of things you stopped rethinking.", warm:"Most people have three or four things they never rethink at the store. 🛒 Willa's made somebody's list, at number four.\n\nWilla's Original is four organic ingredients, made from the whole oat instead of oat syrup — which is why the fiber and the protein are still in there. 4g+ protein, 2g+ prebiotic fiber, 1g of sugar from the oats.\n\nShhh… fourth is a great place to land.", punchy:"Number four had four ingredients. Willa's Original — organic whole grain oats, filtered water, vanilla, sea salt, and the fiber and protein still in it. 🥛"},
  "AUG17-IG-R5":{direct:"Thick enough that people assume it's edited. It isn't. 🥛\n\nWilla's Original pours like that because it's made from the whole oat groat — whole oat kernels, like steel-cut oats before they're rolled. Most oat milks filter out the bran and germ and then process the starch into sugar, which takes the fiber AND the protein out with it. We keep all of it. That's the entire reason it's rich and smooth instead of thin.\n\nIt looks fake. It's four ingredients: organic whole grain oats, filtered water, organic vanilla extract, sea salt.\n\n1g of sugar, and it comes from the oats. No gums, no stabilizers, nothing added to make it behave on camera.\n\nCertified organic. Certified glyphosate-free, tested every lot.\n\nDrag a spoon through it. That's the whole argument.", warm:"No, we didn't do anything to it. 🥛 One take, one glass, one very ordinary Tuesday pour.\n\nIt looks fake. It's four ingredients — organic oats, water, vanilla, sea salt — and it comes out that rich because Willa's uses the whole oat instead of oat syrup.\n\nShhh… the least edited thing on your feed.", punchy:"It looks fake. It's four ingredients. 🥛 Willa's Original — whole oat, 1g sugar from the oats, no gums, no edit."},
  "AUG17-PIN-3":{direct:"One gram of sugar in Willa's Original, and the oats brought it. 🌾\n\nNothing was added — no cane sugar, no syrup, no sweetener of any kind. Willa's Original is made from the whole oat groat, the whole oat kernel the way steel-cut oats keep it, so the small sweetness that's in there belongs to the grain.\n\nCertified organic. Certified glyphosate-free, tested every lot.\n\nKinda chic that the only sugar in it came from the oats.", warm:"Nothing added. 🌾 The gram of sugar in Willa's Original came from the oats themselves — that's the whole story, there's no second half to it.\n\nMade from the whole oat groat, the whole kernel like steel-cut oats, which is also why it pours rich instead of thin.\n\nKinda chic, honestly.", punchy:"One gram of sugar in Willa's Original, and the oats brought it. 🌾 Kinda chic."}
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
  happened:"The category split hard in seven days: Chobani confirmed on Aug 11 that its ready-to-drink oat milk is discontinued for lack of demand and cut its 2026 earnings outlook to roughly $920 million while framing the exit as a broader plant-based retreat, MALK went the other way and put a 12g-protein, gum-free 'Whole Malk' into Whole Foods, Target and Sprouts on Aug 10, and a third front opened entirely — clean-label brands including Go Raw, Simple Mills, Amy's and Spindrift started printing the Non-GMO Project and NSF 'Non-UPF Verified' seal on packages years ahead of any federal definition.",
  coming:"The pressure now moves onto the label itself rather than the shelf: a House bill introduced Jul 30 would replace 'wheat' in the major-allergen definition with 'gluten-containing grain' and name oats outright, a federal court has ordered the QR-code and detectability escapes out of bioengineered-food disclosure with a Jan 1, 2028 compliance date, and a private Non-UPF seal is establishing the front-of-pack standard while Washington is still writing the definition.",
  plays:"The lead is the Non-UPF seal — the certification body already on Willa's carton now issues a badge Willa's four-ingredient list should clear, and getting in early converts a policy fight into a shelf advantage; second is answering Chobani's exit with commitment rather than commentary, because shelf space is opening and confidence reads better than defence; third is getting ahead of the oats-as-allergen bill by publishing the gluten answer plainly now, while it's a choice rather than a compliance deadline."
};


// ─── Performance · Week of MAY 25 – MAY 31 results ──────────────
const LAST_WEEK_RESULTS = [
  {id:"AUG10-IG-R4", concept:"\"three stripes, one glass — and the middle one is the milk.\" — layered strawberry matcha ride", platform:"Instagram Reel", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"The three-band layered strawberry matcha glass running hot across TikTok and Reels (AUG 10)", trendId:null, views:838000, saves:66200, shares:23400, comments:4100, savesDelta:13.4, sentiment:0.96, hero:true, note:"Reach and save hero of the AUG 10 – AUG 16 week, and the second refresh running that a build has beaten a stance. The specific finding is sharper than 'recipes work': the milk was the visible middle band, so the product did the retention work instead of being announced. Three briefs this week are built the same way — the drink that turns opaque on camera, the pour too thick to read as plant milk, and the frozen dessert whose whole quality lives in what got churned into it."},
  {id:"AUG10-IG-R1", concept:"\"taste it first — that's the part we're least worried about.\" — four-objection category answer", platform:"Instagram Reel", pillar:"REVIEWS/RECS", pillarColor:"#A191B2", sourceTrend:"The category charged with four failures at once — price, taste, processing, protein (AUG 10)", trendId:null, views:694000, saves:44800, shares:19600, comments:6100, savesDelta:9.4, sentiment:0.91, hero:false, note:"Highest comment volume of the week and its lowest sentiment at 0.91, which is what answering an accusation looks like even when it goes well. It held above the guardrail because taste led and no number was argued. The read carried forward: this week's Wednesday noon slot answers the same underlying pressure with warmth instead of a rebuttal, and never mentions the charge at all."},
  {id:"AUG10-TT-1", concept:"\"nothing self-certified. nothing to disclose.\" — founder stance on the loophole", platform:"TikTok", pillar:"HEALTH/WELLNESS", pillarColor:"#73B2C9", sourceTrend:"The rule closing the route that let companies vouch for their own new ingredients (AUG 10)", trendId:null, views:611000, saves:39200, shares:27400, comments:5300, savesDelta:8.8, sentiment:0.93, hero:false, note:"The week's highest share count outside a meme format, on the smallest paid budget on the board. Sentiment held at 0.93 for one reason — no person, party or agency was named anywhere in it. Both reserved on-camera slots this week sit on Wed Aug 19 on that finding, and only one of the two is a stance."},
  {id:"AUG10-TT-2", concept:"\"same bowl. the milk finally caught up.\" — childhood-photo beat drop", platform:"TikTok", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"The childhood-photo nostalgia transition running across the feed (AUG 10)", trendId:null, views:552000, saves:24900, shares:31800, comments:2200, savesDelta:6.8, sentiment:0.95, hero:false, note:"Most-shared post of the week on the lowest save-rate in the top eight — the format-native trade, now four refreshes consistent. The mechanic travels and the payload only sticks if one line outlives the sound. Both meme briefs this week are built on a single surviving element: one word repeated four times, and one hard cut from an unbelievable pour to a four-line list."},
  {id:"AUG10-IG-R2", concept:"\"free of the top 9 — that list is already long enough.\" — allergy-desk back-to-school", platform:"Instagram Reel", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"Food-allergy training required for school food staff in its first school year (AUG 10)", trendId:null, views:478000, saves:37100, shares:15200, comments:3100, savesDelta:10.6, sentiment:0.97, hero:false, note:"Highest sentiment of the week at 0.97 on mid-pack reach — the shape of a narrow, high-intent room entered correctly. It led with relief instead of alarm and gave no advice of any kind. Friday noon this week answers the allergen question again for the same audience, in the same register, with no school anywhere in the frame."},
  {id:"AUG10-IG-R3", concept:"\"one law, two sentences — and everyone only read the first one.\" — the school milk provision", platform:"Instagram Reel", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"The statute returning whole milk to the tray that also permits a nutritionally equivalent nondairy beverage (AUG 10)", trendId:null, views:396000, saves:28400, shares:13700, comments:4400, savesDelta:9.1, sentiment:0.94, hero:false, note:"Strong comment volume for a policy brief, most of it parents asking follow-up questions rather than arguing — evidence that handing someone a question they can actually take somewhere outperforms handing them a position. The Friday brief this week runs the same mechanic on a different question, and the Saturday carousel hands the reader a thing to look for on the front of a box."},
  {id:"AUG10-TT-3", concept:"\"fifteen minutes isn't much of a plan. it's enough for a mug.\" — wind-down, not wake-up", platform:"TikTok", pillar:"PARENTING", pillarColor:"#9E652E", sourceTrend:"Pediatricians across local news pushing the school-year sleep reset (AUG 10)", trendId:null, views:344000, saves:21600, shares:9800, comments:1900, savesDelta:7.2, sentiment:0.95, hero:false, note:"Sat mid-pack, which is now the observed ceiling on any school-calendar post once every brand in the feed is running one — the third such result in four refreshes. That ceiling is why back-to-school earned none of its two allowed slots this week and both parenting briefs moved off the calendar entirely."},
  {id:"AUG10-PIN-2", concept:"\"three layers — and the middle one has four ingredients.\" — layered iced matcha pin", platform:"Pinterest", pillar:"INGREDIENTS/RECIPES", pillarColor:"#75C596", sourceTrend:"The layered drink build people save in August and make in September (AUG 10)", trendId:null, views:186000, saves:27300, shares:4100, comments:420, savesDelta:14.6, sentiment:0.97, hero:false, note:"Lowest reach and highest save-rate of the week for the third refresh running — the most reliable finding the engine holds. Pinterest saves are the only number here that keeps compounding after the news peg dies. All three pins this week are written as save objects with literally searchable titles: a frozen dessert card, a no-gums search pin, and a single calm line about where the sugar comes from."}
];

const PERF_KPIS = {
  shipped:16,
  totalReach:4236000,
  avgSavesDelta:9.5,
  topFormat:"Layered drink build with the milk as the visible middle band + founder stance to camera + searchable save-pin"
};

const PERF_INSIGHTS = [
  {title:"A build beat a stance again — and the margin came from the product being visible, not mentioned", detail:"The layered strawberry matcha ride took reach and saves outright, the second refresh running that a build has topped the board. The finding is narrower than 'recipes work': the milk was the visible middle band, so the product carried the retention beat instead of being announced after it. Three briefs this week are built to that spec — the late-summer drink whose entire reveal is the moment it turns opaque and holds, the macro pour too thick to read as plant milk, and the frozen dessert whose quality lives in what got churned into it.", agent:"perf"},
  {title:"Pinterest is a shelf, and the save-object pattern is now the most reliable finding the engine has", detail:"The layered drink card posted the week's lowest reach and its highest save-rate for the third refresh in a row. Saves there are the only number in the engine that keeps compounding once the news peg dies. All three pins this week are written as save objects with literally searchable titles rather than as timely takes — a frozen dessert card, a pin for people searching for a milk with no gums or stabilizers, and one calm line about where the only gram of sugar comes from.", agent:"visual"},
  {title:"The stance travelled on shares — and held sentiment only because nobody was named", detail:"The self-certification answer posted the highest share count outside a meme format on the smallest paid budget of the week, and sentiment sat at 0.93 because no person, party or agency appeared in it. Both reserved on-camera slots this week land on Wed Aug 19 on that read, but only one of them is a position: the 9am brief says a third party finally wrote the test down, and the noon brief is not an argument at all — it is a founder in the aisle answering why she makes this, which is the version that travels on cold audiences.", agent:"hook"},
  {title:"Format-native posts still trade saves for shares, so each one carries exactly one surviving line", detail:"The childhood-photo beat drop was the most-shared post of the week on the lowest save-rate in the top eight — the same trade for four refreshes now. The mechanic travels; the payload only sticks if a single element outlives the sound. Both meme briefs this week are built around one: a format that answers four different questions with the identical one-word answer, escalating visually to a full carton, and a cut that opens on something that looks fake and lands hard on the four-line list.", agent:"composer"}
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
  "AUG17-TT-1":{voice:96, panel:95, pulse:88, recency:80},
  "AUG17-IG-R1":{voice:96, panel:93, pulse:82, recency:10},
  "AUG17-PIN-1":{voice:94, panel:92, pulse:93, recency:10},
  "AUG17-IG-F1":{voice:94, panel:93, pulse:80, recency:9},
  "AUG17-TT-2":{voice:95, panel:92, pulse:97, recency:10},
  "AUG17-IG-R2":{voice:94, panel:91, pulse:96, recency:10},
  "AUG17-TT-3":{voice:94, panel:93, pulse:90, recency:10},
  "AUG17-TT-4":{voice:96, panel:93, pulse:95, recency:10},
  "AUG17-IG-R3":{voice:96, panel:93, pulse:88, recency:10},
  "AUG17-PIN-2":{voice:94, panel:92, pulse:86, recency:9},
  "AUG17-TT-5":{voice:96, panel:91, pulse:87, recency:9},
  "AUG17-IG-R4":{voice:95, panel:91, pulse:88, recency:10},
  "AUG17-IG-F2":{voice:93, panel:90, pulse:74, recency:10},
  "AUG17-TT-6":{voice:95, panel:91, pulse:92, recency:9},
  "AUG17-IG-R5":{voice:93, panel:90, pulse:94, recency:10},
  "AUG17-PIN-3":{voice:96, panel:86, pulse:91, recency:9}
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
    hook:"the \"bob\" format answers every question with the same word, four times, each one bigger 💇",
    detail:"The mechanic is fixed and very easy to shoot: pose a setup question, then say the exact same one-word answer three or four times, each repetition landing on the beat with a bigger reaction, a funnier reveal, or a more ridiculous visual than the last. It started as a haircut joke — \"reasons to get a bob\" answered with \"bob, bob, bob, bob\" — and has stretched to ranking anything and justifying any decision. Named one of the two dominant formats live the week of Aug 10-17, 2026, with an active hashtag behind it.",
    velocity:"high",
    platform:"TikTok",
    willasPlay:"TikTok: \"reasons to switch\" answered with one word — \"simple\" — four times, each bigger, landing on the carton at the drop.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"tiktoktrends.org · TikTok Trends: August 10-17, 2026 (page dated Aug 16, 2026)", url:"https://tiktoktrends.org/tiktok-trends-10-august/"},
      {label:"TikTok · #bobtrend hashtag page", url:"https://www.tiktok.com/tag/bobtrend"}
    ]
  },
  {
    id:"CP-2",
    type:"MEME TEMPLATE",
    typeColor:"#73B2C9",
    hook:"\"repeat twice, reveal third\" is being called the week's most portable meme structure 🔁",
    detail:"Run the same setup or the same visual twice, then swap the third repetition for something unexpected — a different object, a pet, another character stepping into the slot the viewer has already learned. The timing is controlled entirely by the audio, so no dialogue is needed and it works from a single fixed camera. Cataloged as an active recurring mechanic in the Aug 8-15, 2026 trend report. It is a cleaner shape than the escalating formats because the twist lands once and lands hard.",
    velocity:"medium",
    platform:"TikTok + Instagram Reels",
    willasPlay:"Reel: same hand, same mug, twice with the expected carton. Third beat swaps in Willa's. No dialogue, no caption needed.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"Lightreel · What Is Trending on TikTok — weekly report, Aug 8-15, 2026 (updated Aug 15, 2026)", url:"https://lightreel.ai/blogs/whats-trending-on-tiktok"}
    ]
  },
  {
    id:"CP-3",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"\"creamy lemonade\" is the milkshake-slushie hybrid taking over late-summer drink content 🍋",
    detail:"Tart lemonade blended with a creamy element until it sits somewhere between a milkshake and a slushie — the taste-test verdict going around is that it drinks like lemon pie in a glass. National chains piled into the same idea inside the same window with blended lemonade coolers built on soft serve. The remixable mechanic is simple and entirely milk-dependent: icy-tart base plus a creamy element blended in, which is exactly where a plant milk either performs or gets watery.",
    velocity:"high",
    platform:"TikTok + food media",
    willasPlay:"Reel: \"let's make creamy lemonade (dairy-free!)\" — blend Willa's Original into the tart base so it turns creamy on camera.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"Parade · I Tried the Viral 'Creamy Lemonade' and It Tastes Like Lemon Pie in a Glass (Aug 17, 2026)", url:"https://news.google.com/rss/articles/CBMiYkFVX3lxTE9Sd2k4ZHVJWkdFYldqbVBEMlJZUkVmR2ZmZFFVQkJ3MXk2R1BiQmg5ZDdOTE5EcFVDSElUOTJaekJjbllDTWhXclJBSTNQM0RvME9peEdkX1pJSTc5cU9hRkxR?oc=5"}
    ]
  },
  {
    id:"CP-4",
    type:"VIRAL RECIPE",
    typeColor:"#75C596",
    hook:"the two-ingredient croissant ice cream sandwich is the dessert build everyone is testing 🥐",
    detail:"Split a croissant, pack ice cream into it, freeze, slice. Two ingredients, no churn required, and the appeal is entirely textural — the flake against the cold. Fresh taste-test coverage landed Aug 16, 2026 and it is running alongside a broader homemade-ice-cream wave in food media this window. The whole format lives or dies on the ice cream inside it, which is the part nobody has claimed yet with a clean ingredient list.",
    velocity:"medium",
    platform:"TikTok + Instagram Reels",
    willasPlay:"Reel: \"let's make a croissant ice cream sandwich (dairy-free!)\" — churn the base on Willa's Chocolate. Real cacao, no cane sugar.",
    dnaMatch:"viral-recipe-remix",
    sources:[
      {label:"Parade · I Tried the Viral 2-Ingredient Croissant Ice Cream Sandwich (Aug 16, 2026)", url:"https://news.google.com/rss/articles/CBMiakFVX3lxTFA4R1V2aWR4c0lLY1ZzYzZlb05GdEZILXROY1lRUzRIRHlVVHQtNkdJSlc1M1JpSzVoVFVjSFhLaExVZFVUbWRVOFR1blNZanRyd2FHOUtBanZiNlhCaG5idEtQNjd4RGhOd0E?oc=5"}
    ]
  },
  {
    id:"CP-5",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"\"five things worth the money\" is people publicly defending what they refuse to cheap out on 💸",
    detail:"Creators list, straight to camera, the purchases and subscriptions they consider non-negotiable — the things they will keep paying for while they cut elsewhere. Consumer-behaviour coverage on Aug 12, 2026 reads it as evidence of a broader value-audit mood: shoppers are being unusually deliberate this month, and financial planners have picked the format up as a signal. The hashtag carries tens of thousands of posts. It is the rare list format where a grocery item can earn a slot without the brand asking for it.",
    velocity:"medium",
    platform:"TikTok",
    willasPlay:"TikTok list, direct to camera: five grocery things worth it. \"the one carton I don't cheap out on.\" Willa's lands fourth.",
    dnaMatch:"on-pack-checklist",
    sources:[
      {label:"YourCoffeeBreak · TikTok's '5 Things Worth The Money' Trend Signals a Major Shift in Consumer Spending (Aug 12, 2026)", url:"https://yourcoffeebreak.co.uk/lifestyle/26338827088/tiktoks-5-things-worth-the-money-trend-signals-a-major-shift-in-consumer-spending/"},
      {label:"TikTok · #worththemoney hashtag page", url:"https://www.tiktok.com/tag/worththemoney"}
    ]
  },
  {
    id:"CP-6",
    type:"CULTURAL CONVERSATION",
    typeColor:"#9E652E",
    hook:"\"kinda chic\" is the quiet flex — declaring an unglamorous personal habit stylish, without the joke 🪞",
    detail:"Selfie clips or photo slideshows with on-screen text naming something unconventional the creator does and calling it chic, set to bossa nova, jazz beats or indie bedroom pop. Named a top format for the week of Aug 10-17, 2026. What makes it different from the usual confession formats is the register: it is not self-deprecating and it is not a punchline. It is someone stating a preference calmly and letting it stand — which is the closest thing on the feed right now to Willa's actual voice.",
    velocity:"medium",
    platform:"TikTok + Instagram Reels",
    willasPlay:"Static text post: \"kinda chic that my whole ingredient list fits on one line.\" One carton, one shot, no explanation.",
    dnaMatch:"meme-payload",
    sources:[
      {label:"tiktoktrends.org · TikTok Trends: August 10-17, 2026 (page dated Aug 16, 2026)", url:"https://tiktoktrends.org/tiktok-trends-10-august/"}
    ]
  },
  {
    id:"CP-7",
    type:"NEWS CYCLE",
    typeColor:"#C9A227",
    hook:"a woman put every stick of butter on a kitchen scale and caught the brand short-weighing all of them 🧈",
    detail:"The video went wide on Aug 11, 2026: she unwraps stick after stick, weighs each one, and every single one comes in under what the package says. The comment section did what comment sections do — people started weighing things in their own kitchens. It is a small story that is really about a much larger one: shoppers have stopped taking the front of the package on faith and have started reaching for a scale, a scanner or an app. That instinct is the single best thing that has happened to brands that can survive being checked.",
    velocity:"high",
    platform:"TikTok + consumer news",
    willasPlay:"Reel: put Willa's on the scale and read the label out loud. Nothing to catch. Caption: \"weigh it. we'll wait.\"",
    dnaMatch:"on-pack-checklist",
    sources:[
      {label:"The Daily Dot · A Viral TikTok Shows a Woman Catching Her Butter Brand Short-Weighing Every Stick (Aug 11, 2026)", url:"https://news.google.com/rss/articles/CBMimwFBVV95cUxQeDlLSkw4UXRfRGoybFptYjlyWXVqNHFpTHVvUk9wSVZ2Tnkyb2V2eWp6eFdGWUNXTmF6a1pXNHZjM3MxYURyNTRuN0xKaGd2Z1N6ZGlPZEQybThQMkhwc01nZk5qY0V4OTlmS0dtX2VsQWNLYTgzWi1IajZNV0JJOS1oT0xFSDE0YU8tSU9NSEp2bC1NQjdTdnZDZw?oc=5"}
    ]
  },
  {
    id:"CP-8",
    type:"MISINFORMATION REBUTTAL",
    typeColor:"#C46A5A",
    hook:"a celebrity survivalist says organ meats made his family \"thrive\" after quitting plants — the pick-a-team pitch is back 🥩",
    detail:"The framing circulating on Aug 15, 2026 is the familiar one: a public figure describes abandoning a plant-based diet, credits an extreme replacement, and the internet turns it into a referendum on whether plants work at all. It is not a study and it is not a finding — it is one household's anecdote pushed into a food-tribe argument. The rebuttal Willa's is actually built for isn't about defending veganism; it is about refusing the premise that eating well requires eliminating a category and joining a side.",
    velocity:"medium",
    platform:"Social video + plant-based press",
    willasPlay:"Don't name him. Push back on the team-picking: \"you don't have to quit a food group to eat well.\" Abundance, not elimination.",
    dnaMatch:"mom-activist",
    sources:[
      {label:"Plant Based News · Bear Grylls Says Organ Meats Helped His Family 'Thrive' After Ditching Vegan Diet (Aug 15, 2026)", url:"https://plantbasednews.org/news/celebrities/bear-grylls-organ-meats-vegan-diet/"}
    ]
  },
  {
    id:"CP-9",
    type:"MEME TEMPLATE",
    typeColor:"#73B2C9",
    hook:"\"illusion plus proof\" is the food-video cut driving completion right now — make it look fake, then prove it 🍮",
    detail:"Open on a shot so hyperreal it reads as CGI or as a trick — a mango that turns out to be a pastry, a pour that looks impossibly thick — then cut to the interior or the texture as evidence that it is real. Flagged in the Aug 8-15, 2026 report as the mechanic outperforming ordinary meal presentation on food TikTok this week, because the viewer gets both the process satisfaction and a final perceptual surprise. The structure has disbelief and receipt built into it, which is unusually convenient for a product whose whole argument is on the back of the box.",
    velocity:"medium",
    platform:"TikTok + Instagram Reels",
    willasPlay:"Open on a pour too creamy to read as dairy-free, cut hard to the four-line label. Disbelief, then receipt.",
    dnaMatch:"on-pack-checklist",
    sources:[
      {label:"Lightreel · What Is Trending on TikTok — weekly report, Aug 8-15, 2026 (updated Aug 15, 2026)", url:"https://lightreel.ai/blogs/whats-trending-on-tiktok"}
    ]
  },
  {
    id:"CP-10",
    type:"ENTERTAINMENT MOMENT",
    typeColor:"#A191B2",
    hook:"a warm, fiddle-laced rocker about family landed Aug 17 — and it would soundtrack a kitchen without irony 🎻",
    detail:"Wild Pink's \"Still Coming Down\" arrived Aug 17, 2026 as the title track ahead of the album on Aug 21, recorded in Asheville with fretless guitar from Meg Duffy and fiddle from Landon George. It is described as a warm, ragged rocker, and the frontman has said the song is mostly about his connection to his family. Unironic, un-precious, family-forward and played on real instruments — the opposite register from a wellness-brand soundtrack, and a genuine fit for heritage and morning-kitchen footage.",
    velocity:"medium",
    platform:"Streaming + social audio",
    willasPlay:"Use the track under a slow family-kitchen cut — hands, oats, morning light. Riff the warmth, never name the artist.",
    dnaMatch:"kid-family-moment",
    sources:[
      {label:"Stereogum · Wild Pink — \"Still Coming Down\" (Aug 17, 2026)", url:"https://stereogum.com/2508511/wild-pink-still-coming-down/music"}
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
  "AUG17-TT-1":"mom-activist",
  "AUG17-IG-R1":"at-shelf-moment",
  "AUG17-PIN-1":"viral-recipe-remix",
  "AUG17-IG-F1":"on-pack-checklist",
  "AUG17-TT-2":"meme-payload",
  "AUG17-IG-R2":"viral-recipe-remix",
  "AUG17-TT-3":"before-after-stitch",
  "AUG17-TT-4":"on-pack-checklist",
  "AUG17-IG-R3":"kid-family-moment",
  "AUG17-PIN-2":"on-pack-checklist",
  "AUG17-TT-5":"mom-activist",
  "AUG17-IG-R4":"kid-family-moment",
  "AUG17-IG-F2":"on-pack-checklist",
  "AUG17-TT-6":"at-shelf-moment",
  "AUG17-IG-R5":"meme-payload",
  "AUG17-PIN-3":"meme-payload"
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
  "AUG17-TT-1":{
    shoot:[
      "The four set-downs are the whole brief — bowl of oats, glass of water, vanilla bottle, dish of sea salt, one per beat onto an empty pale-wood counter. Shoot the sequence 6-8 times and cut the take where the rhythm is slowest, not the one where it's cleanest",
      "Single locked-off counter-height frame with Christina at camera-left and deliberately empty counter at camera-right — shoot the whole thing in one continuous take, then again slower; the calmer take is the one",
      "Carton set-down at the end of the row, placed BEHIND the four objects, label forward, hand exiting frame — shoot 4-5 times, it is the beat the eye lands on",
      "Slow 3-second push-in past her shoulder to the four objects plus carton, with the bowl of oats tilting toward the light on the whole-oat line",
      "Clean plate of the finished row — four objects and the carton, no hands, held 6 seconds — as a safety cutaway if a line needs trimming"
    ],
    found:[
      "Reference (permanent program page): https://www.nonultraprocessed.org/ — read this before the shoot so the one sentence about the bar is said correctly and nothing gets overstated. It is background for the script only; nothing from this page, no seal, mark or program name, goes on screen or in caption",
      "Reference (listening): https://www.tiktok.com/tag/ultraprocessed — scroll the top posts and read the comments for how people actually use the phrase. Most of them are using it without a definition, which is exactly the gap this brief fills",
      "Reference (posture): watch two Patagonia founder-to-camera stance films back to back before rolling — copy the stillness, the conversational volume and the refusal to sell, not the subject matter",
      "Reference (Instagram): Kiki Milk's category-critique posts — proof you can lay out what the category does without naming a single brand or sounding defensive"
    ],
    memes:[
      "No meme layer and no trending sound on this one — it's the week's straight-faced stance and the four set-downs are the rhythm. A format on top would undercut the gravity and make the calm read as a bit"
    ],
    archive:[
      "Skip archive — single-take founder frame, all original footage, no stock, no news clips, and explicitly no certification-mark or packaging-seal imagery of any kind"
    ]
  },
  "AUG17-IG-R1":{
    shoot:[
      "The walk-in: follow Christina from a step behind as she turns into the chilled aisle and reaches the Willa's set — shoot 4+ takes, the whole Reel lives or dies on whether the first three seconds feel unstaged rather than blocked",
      "The straight-to-lens answer: 'people ask why we make this' → pause → 'Willa was my grandmother' — shoot at least 6 takes and select the one where the pause runs too long, not the clean one",
      "Loose close-up of her thumb tracing the four-line ingredient list on Willa's Original, label filling the right two-thirds — achieved by the operator physically stepping in, never a zoom",
      "The step-back reveal of the full Willa's set faced up on the shelf (Original, Chocolate, Kids, Barista) with her hand squaring the carton she just replaced",
      "Coverage pass with zero Willa's dialogue: her hands, the shelf, the case light — insurance only, to be used for a Story cutdown, never to break the Reel's single take",
      "Safety take of the entire piece at half the pace and half the volume, in case the first selects play as pitched rather than said"
    ],
    found:[
      "Reference (posture, not format): Ghia's founder-calling-a-longtime-customer post — the exact warmth register to match. Find it on the brand's own feed; do not guess a handle and do not paste a URL nobody has opened.",
      "Reference (register): Graza's co-founder letter posts — plainspoken, slightly unpolished, no manifesto, no stance. That is the ceiling for this brief's tone.",
      "Trend reference (TikTok): https://www.tiktok.com/tag/oatmilk — read how people actually phrase the 'why does this brand even exist' question in the comments and steal a real phrasing for her opening line rather than writing one from scratch"
    ],
    memes:[
      "No meme template, no trending sound, no transition, no cut. This is deliberately the one post in the week that isn't riding anything — a format would undo the entire point of it."
    ],
    archive:[
      "Do NOT cut in heritage, kitchen or period archive footage. The unbroken-take-in-the-aisle constraint IS the piece; a nostalgic B-roll insert turns a plain answer into a commercial and kills it.",
      "Existing Willa's shelf photography is fine for a Story still or the cover frame, but the Reel itself stays unbroken."
    ]
  },
  "AUG17-PIN-1":{
    shoot:[
      "THE CUT — one sandwich standing cut-face to camera, sliced with a hot knife so the pastry layers and the dark ice cream band both read. This is the pin; shoot it fifteen times and keep cutting fresh sandwiches until one face is clean",
      "Hand lifting one sandwich off a stack of three, melt threading between them — the alternate hero, shot at the same height and light",
      "Willa's Chocolate pouring into the blender jar over chilled coconut cream — the pour is the only step worth a frame, and it proves the carton is the base, not a garnish",
      "Willa's Chocolate carton standing at frame right in late-afternoon window light, label forward, sandwich in front of it slightly out of focus",
      "Overhead of the split croissants lined up on the board waiting to be packed — flake side up, natural crumb, nothing styled off the counter"
    ],
    found:[
      "Trend reference (article): https://news.google.com/rss/articles/CBMiakFVX3lxTFA4R1V2aWR4c0lLY1ZzYzZlb05GdEZILXROY1lRUzRIRHlVVHQtNkdJSlc1M1JpSzVoVFVjSFhLaExVZFVUbWRVOFR1blNZanRyd2FHOUtBanZiNlhCaG5idEtQNjd4RGhOd0E?oc=5 — Parade's Aug 16, 2026 taste-test of the two-ingredient croissant ice cream sandwich, the coverage that put the build in front of food media this window",
      "Trend reference (TikTok): https://www.tiktok.com/tag/icecreamsandwich — scan the top posts for how the cut face is framed and lit; every strong one shoots the cross-section straight-on, never overhead",
      "Reference (Instagram): Fishwife and Graza feeds — the exact type restraint to match. One confident line over one beautiful photograph, never a recipe card, never a badge cluster"
    ],
    memes:[
      "Static pin → no meme template and no trending sound. The joke is entirely in the kicker line — 'two ingredients. one of them won Best Beverage.' — and it only lands if the pin stays clean around it"
    ],
    archive:[
      "Skip archive — all original food photography. Existing carton stills can back up the frame-right placement, but the cut face has to be shot fresh"
    ]
  },
  "AUG17-IG-F1":{
    shoot:[
      "CARD 1 typography plate — flat cream sweep with nothing on it, shot (or built) with enough clean margin that the hook line can sit large and left with real air around it",
      "Straight-down macro of dry whole oat groats filling the frame edge to edge in warm window light — no bowl, no props, just the grain and its texture",
      "The hero: Willa's Original label-forward beside one clear glass on cream, straight-on at glass height, with deliberate empty space at frame left for the two-line stat stack. Shoot 3-4 takes, this is the card the post lives on",
      "The contrast plate: same surface, same crop, same eye line, same light — plain unbranded glass where the carton was. Lock the tripod between these two setups and do NOT move it, the comparison is the whole mechanic",
      "Hand tilting a small spoon of whole oat groats beside the Willa's Original back label with all four ingredient lines legible",
      "Carton alone on a windowsill in late-afternoon light, cream negative space above it for the sign-off line"
    ],
    found:[
      "Reference (TikTok): https://www.tiktok.com/tag/fibermaxxing — not a format to ride, a language mine. Read how people actually talk about fiber before writing the card overlays, then say the protein half in that same plain register",
      "Reference (Instagram): Olipop's benefit posts — the proof you can say 'prebiotic fiber' out loud without turning into a supplement company. Borrow the ease, cut the crassness by about a third",
      "Reference (Instagram): Kiki Milk's feed — the category posture to match. State the shortcut plainly, state the fix, name no one, apologize for nothing"
    ],
    memes:[
      "No meme template and no trending sound — this is a static carousel and CARD 1 carries the joke on its own. The humor is entirely in the phrase 'two-person job' applied to a grain; adding a format on top would flatten it"
    ],
    archive:[
      "Existing whole-groat macro footage can cover CARD 2 if the grain reads sharp and the light is warm, not clinical. Everything else needs a fresh shoot because cards 3 and 4 must come from one locked camera position"
    ]
  },
  "AUG17-TT-2":{
    shoot:[
      "The four locked frames, shot in one session without moving the camera between beats 1-2 — the cut only reads as a format if the frame is genuinely identical",
      "Hand flicking a small splash into an empty clear glass, then a full steady pour from the label-forward carton — shoot both at the same height so the escalation is unmistakable",
      "Fistful of dry whole oat kernels falling back into a heaped bowl in real time, close-miked — this is the beat that sells 'creamy' without a single word about it",
      "Frontal frame filled edge to edge by the Willa's Original carton, label dead center and fully legible at phone size — check legibility on a phone before wrapping",
      "One slow quarter-turn of the carton to the ingredient list for the end card — one take, unhurried, no hand jitter"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/bobtrend — watch the top posts before shooting and match the mechanic exactly: identical one-word answer, escalation carried by the visual, cuts on the downbeat",
      "Trend reference (article): https://tiktoktrends.org/tiktok-trends-10-august/ — the Aug 10-17, 2026 roundup naming this one of the two dominant live formats; use it to confirm the format is still peaking the morning of the shoot",
      "Reference (Instagram): Olipop's feed — proof you can run a dumb-simple joke on a functional-nutrition product without a single sentence of explanation attached to it",
      "Reference (Instagram): Fishwife's and Graza's flat, plain product frames — the visual register to match. Bright, unfussy, zero styling ambition"
    ],
    memes:[
      "The format IS the meme — a fixed four-beat question/one-word-answer escalation, currently live on TikTok. Ride the mechanic straight, do not remix it or add a second joke on top",
      "Hard rule for this brief: no caption annotation, no on-screen explainer, no 'IYKYK' text, no comment-pinned setup. If someone doesn't recognize the format they still get four questions answered with one word, which is the actual point"
    ],
    archive:[
      "No archive footage — every frame is shot fresh so the four beats match exactly. Existing pour footage will not cut against a new locked frame and will kill the format read"
    ]
  },
  "AUG17-IG-R2":{
    shoot:[
      "Overhead one-take lemon squeeze straight into the ice-loaded blender jar — mess is good, do not clean the board between takes",
      "The maple ribbon and the zest grate, shot overhead and close — these are the two 'made by a person' beats in the whole piece",
      "Side-on slow-motion of the white Willa's column entering the translucent yellow base — this is the premise shot, get 4+ takes",
      "THE TURN: one locked unbroken side-on take of the jar going translucent-yellow to fully opaque and holding three extra seconds. This is the retention shot. Shoot it until it turns clean in a single continuous frame — do not fix it in the edit",
      "Continuous pour into a tall clear glass filling as one opaque body — reshoot if any line, ring or strata appears in the glass",
      "Static end frame: sweating glass + carton label-forward + scattered zest on the cream board, hand exiting"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/creamylemonade — watch the top posts for pacing and for how the creamy turn is framed; almost none of them hold the blend long enough, which is the gap this brief takes",
      "Trend reference (article): Parade · 'I Tried the Viral Creamy Lemonade and It Tastes Like Lemon Pie in a Glass' (Aug 17, 2026) — https://news.google.com/rss/articles/CBMiYkFVX3lxTE9Sd2k4ZHVJWkdFYldqbVBEMlJZUkVmR2ZmZFFVQkJ3MXk2R1BiQmg5ZDdOTE5EcFVDSElUOTJaekJjbllDTWhXclJBSTNQM0RvME9peEdkX1pJSTc5cU9hRkxR?oc=5 — the 'lemon pie in a glass' verdict is the taste promise to match",
      "Trend reference (TikTok): https://www.tiktok.com/tag/lemonade — the wider late-summer drink lane; useful for reading which thumbnails are winning on pure color contrast"
    ],
    memes:[
      "No meme template and no trending audio on this one. The format IS the trend — the recipe remix is the ride, and the joke is entirely in the voiceover's dryness plus the blender doing the arguing",
      "Humor pattern is People-on-Camera Amplification run as voiceover-only, no face. The warmth of a real voice over anonymous hands is the whole reason this doesn't read like a stock recipe reel"
    ],
    archive:[
      "Existing Willa's Original pour footage can cover the carton-set-down beat, but THE TURN and the pour-out must be shot fresh — no archive clip has the opacity change, and that change is the entire retention mechanic",
      "Do NOT pull from any archived layered-drink footage. This drink is one opaque body, no strata, no visible line in the glass"
    ]
  },
  "AUG17-TT-3":{
    shoot:[
      "Handheld POV walk down a chilled plant-milk aisle, hand reaching for an anonymous carton with the label turned away — shoot 4 takes and check playback frame by frame that no competitor branding is readable anywhere in the sequence",
      "Locked overhead on a cream board: two hand-lettered cards, a pile of whole oat groats poured onto one and a level scoop of plain white protein powder tapped onto the other — both hands must move at the same unhurried pace, because the second the powder hand looks contemptuous the brief turns into a sneer",
      "Side-on 50mm pour of Willa's Original into a clear glass in hard morning window light, carton label-forward at frame right — the coat the milk leaves on the glass wall is the shot, so run it until it's clean",
      "Overhead of a hand turning the Willa's Original carton to the ingredient list and tracing the four lines with a finger, one line per beat",
      "Hand lifting the full glass out of frame and leaving the carton alone in focus — this is the end-card frame, shoot it wide enough to set text underneath"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/highprotein — read how people are actually talking about protein numbers right now and steal their phrasing for the hook; the confession has to use their words, not ours",
      "Trend reference (TikTok): https://www.tiktok.com/tag/oatmilk — the handheld aisle-comparison POV is a live format on this tag; match its pace and its lower-third text placement so the first three seconds read native",
      "Reference (Instagram): Kiki Milk's feed — the exact posture for this brief. Lay out the category's shortcut plainly, then the fix, no defensiveness and no named brand anywhere"
    ],
    memes:[
      "Relatable-confession structure with no trending audio required — the joke is that every one of us has compared two cartons in eight seconds and never once asked where the number came from. The humor is recognition, not a punchline, so there is nothing to land and nothing to escalate. Keep the voiceover flat and let the aisle-to-kitchen cut do the work."
    ],
    archive:[
      "Existing clean-pour footage of Willa's Original can cover the pour beat if the coat on the inside of the glass is visible. The aisle POV and the two-cards overhead have to be shot fresh — there is no archive frame with a safely un-branded competitor carton in it."
    ]
  },
  "AUG17-TT-4":{
    shoot:[
      "The entire piece in ONE unbroken locked 50mm take — shoot ten or twelve full passes and pick the cleanest, because a single hand fumble kills a take and there is no cut to hide behind",
      "Index finger tapping down the four ingredient lines, one deliberate tap each, then hovering over blank carton with nothing left to tap — that one-second hover on empty space is the joke and the proof at the same time, so shoot it long",
      "Phone held over the carton until the Clean Label App scan resolves, then tilted just enough for '94' to be legible — check legibility on an actual phone before wrapping, not on the monitor",
      "Fingertip taps on the glyphosate-free certification mark, then the third-party certifier's own page held up beside the carton — it has to be visibly not a Willa's page",
      "Hands withdrawing and leaving the carton alone in hard light with nothing moving — the last frame is the whole posture, so give it a clean three seconds of room tone"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/oatmilk — scan the top posts for how people phrase a verification challenge to a brand in the comments; the exact words they use are better than anything we'd write for the reply script",
      "Context (article, Aug 11, 2026): https://news.google.com/rss/articles/CBMimwFBVV95cUxQeDlLSkw4UXRfRGoybFptYjlyWXVqNHFpTHVvUk9wSVZ2Tnkyb2V2eWp6eFdGWUNXTmF6a1pXNHZjM3MxYURyNTRuN0xKaGd2Z1N6ZGlPZEQybThQMkhwc01nZk5qY0V4OTlmS0dtX2VsQWNLYTgzWi1IajZNV0JJOS1oT0xFSDE0YU8tSU9NSEp2bC1NQjdTdnZDZw?oc=5 — the checking moment this brief is riding. INTERNAL BACKGROUND ONLY. Watch it to understand the audience's mood, then never reference the brand, the product or the category anywhere in the shoot, the caption or the replies",
      "Reference (permanent): https://www.nonultraprocessed.org/ — the third-party-verification landscape shoppers are being asked to trust right now. Internal context for why 'here's how to check us yourself' beats 'here's another badge'",
      "Reference (Instagram): Kiki Milk's feed — the exact posture to match. Confident, specific, zero defensiveness, and never a named opponent",
      "Reference (Instagram): Graza and Fishwife product frames — the plain, bright, unstyled register for a single object alone on a board"
    ],
    memes:[
      "No meme template and no trending sound. The humor is the unmoving purple dare sitting on screen for twenty seconds while the hands quietly do the homework underneath it — a borrowed audio would tip an open door into a dunk",
      "Hard guardrails, both non-negotiable: (1) nothing is ever weighed and no kitchen scale appears in frame — fill weight varies and it is not a Willa's claim; (2) no other brand is named, shown, blurred, alluded to or implied, and no line in the caption or the comment replies references anyone else's package. The post is generous or it is off-brand"
    ],
    archive:[
      "No archive footage usable — the piece is one continuous take and any inserted library shot breaks the single-take premise that makes the dare credible. Existing carton stills can be used for the paid cutdown, never in the organic post"
    ]
  },
  "AUG17-IG-R3":{
    shoot:[
      "Cofounder-sister at her own counter, carton already in hand, starting mid-thought straight down the lens — shoot 4+ takes and use the one where she hasn't warmed up yet. The unpolished take is the take",
      "Her hand rotating the Willa's Kids carton so the ingredient list faces the lens and holding it steady — real carton, real hand, no graphic over the label. Shoot it long enough to hold under five lines of text",
      "Locked side-on 50mm pour into the kid's glass, carton label-forward at frame right — one continuous motion, no cutaway",
      "Over-the-shoulder phone POV of the real Yuka scan resolving to 100/100 — do the scan for real, do not mock the screen up in post",
      "Kid walking in at waist height, taking the glass, drinking, walking out — one wide locked take, no direction given to the kid, no second attempt at 'cuter'",
      "Static end frame: carton label-forward beside the emptied glass on the counter in low afternoon light, her hand exiting"
    ],
    found:[
      "Reference (Instagram): @partakefoods — https://www.instagram.com/partakefoods/ — the exact register to match. Parent-first with zero apology, warm, allergen facts stated like weather. Study how they say the hard thing without ever sounding worried",
      "Reference (TikTok): https://www.tiktok.com/tag/allergenfree — read the comments, not the videos. The phrasing parents actually use when they're asking 'is this okay' is the phrasing the on-camera read should borrow",
      "Reference (TikTok): https://www.tiktok.com/tag/dairyfreekids — useful for pacing: the posts that land are the ones where a parent answers in one breath instead of building suspense",
      "Reference (app): Yuka — https://yuka.io/en/ — pull the actual scoring screen for the scan beat so the on-screen UI matches what a viewer sees when she scans it herself"
    ],
    memes:[
      "No meme template, no trending sound, no format ride on this one. Humor pattern is People-on-Camera Amplification via the cofounder-sister — the whole charm is a real mom answering a question fast and then getting on with her day",
      "The closest thing to a joke is the timing of THE HANDOFF: the kid takes the glass, drinks it, leaves, and the punchline is that nothing dramatic happens. Do not add a sound effect, a zoom or a caption to that beat — the flatness is the joke"
    ],
    archive:[
      "No archive footage on this one. Every frame has to be the cofounder-sister and her own kitchen — pulling a stock pour or an old studio carton clip is exactly what would make this read as an ad instead of an answer",
      "Existing Willa's Kids packshots may be used for the end card ONLY if the light matches the kitchen; if it doesn't, shoot the end frame on the same counter at the same hour"
    ]
  },
  "AUG17-PIN-2":{
    shoot:[
      "Straight-on at glass height: one plain clear glass three-quarters full of Willa's Original on flat cream, soft daylight, one real shadow to frame right — shoot until the milk reads opaque and creamy against the cream, that opacity IS the no-gums argument",
      "Same setup with the Willa's Original carton standing label-forward beside the glass in the lower third, leaving clean empty cream across the top two-thirds for the title block",
      "Alternate insurance frame: mid-pour into the same glass, same camera position, in case the still version reads flat in the feed",
      "Macro of the ingredient list on the carton, four lines legible edge to edge — not for the pin face, for the alt-pin and the Studio riff"
    ],
    found:[
      "Reference (TikTok): https://www.tiktok.com/tag/oatmilk — read the comment sections under category posts for the exact words shoppers use about gums and thickeners, then let the title match their phrasing instead of ours",
      "Reference (Instagram): https://www.instagram.com/graza/ — the design target. An ingredient story told as a zine cover: one line, big, confident, zero infographic chrome",
      "Reference (Instagram): https://www.instagram.com/omsom/ — typographic nerve. Proof a flat colour field and one sentence can out-perform a styled food shot on a search surface"
    ],
    memes:[
      "No meme template and no trending format on this one — it's a static search pin and the whole payload is the wordplay in the kicker line. A borrowed format would bury the joke and break the title's searchability"
    ],
    archive:[
      "Existing clean-pour stills of Willa's Original can stand in if the coat on the inside of the glass is visible and the background is a true flat cream — reshoot if the archive frame has a kitchen scene behind it, the pin depends on the empty field"
    ]
  },
  "AUG17-TT-5":{
    shoot:[
      "The empty scrubbed wood table under hard morning light, locked overhead, camera squared and taped down — shoot the empty frame first and never move the head again; the fixed camera is the whole idea",
      "Hands entering from all four edges to load the table: bread board with a torn loaf, bowl of stone fruit, jar of jam with the lid off, basket of small summer squash with the stems still on, pot of oats with the spoon left standing in it, mismatched glasses. Let things overlap and leave the crumbs",
      "Willa's Original, Kids and Chocolate set into the center, Original label-forward — place it once and do not re-stage it for the rest of the shoot",
      "Macro insert: a finger tracing the four-line ingredient list on the side of the Original carton, shallow focus, one clean take per line — this is the only cut in the piece so it has to be perfect",
      "The pour into a glass at the near edge of the table, shot from the same overhead. Do not cover it side-on; a second angle here breaks the piece",
      "The loaded table with every hand out of frame — hold three seconds longer than feels comfortable, and get steam off the pot if you can"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/familydinner — the unstyled overhead table shots to match. The ones that work are crowded and slightly messy, not composed",
      "Trend reference (TikTok): https://www.tiktok.com/tag/oatmilk — read the register people use when they talk about what they eat without arguing about it; that flatness is the target tone for the VO",
      "Reference (Instagram): Lovebird's feed — a real food-system POV delivered at a warm volume. The gravity to match, without a single line of preaching",
      "Reference (Instagram): Partake Foods — proof a brand can be completely for its own audience without taking a swing at anybody else's"
    ],
    memes:[
      "No meme template, no trending sound, no stitch, no duet. The moment this is answering is loud enough that riding a format would look like joining in. The refusal IS the format — one fixed camera, no face, no argument on screen. If the edit starts feeling clever, cut the cleverness, not the silence"
    ],
    archive:[
      "Existing overhead kitchen-table footage can cover the fill beats if the light matches, but the macro label insert has to be shot fresh — the four ingredient lines need to be legible at 1x on a phone, not just on the edit monitor"
    ]
  },
  "AUG17-IG-R4":{
    shoot:[
      "Kid's hands dragging the Willa's Kids carton across a genuinely messy weekend counter, mother's hand steadying it — shoot before anyone tidies the room; the crumbs and the mail are the credibility",
      "Locked counter-height pour into a short glass by the kid, including the small overfill — do not coach him to stop, the imperfection is the shot",
      "The handoff: her hands lifting the same carton the kid just set down, label readable the entire time, kid's full glass sweating at the edge of frame",
      "HERO — macro 60fps side-on through the glass: Willa's Kids blooming down through iced coffee and folding all the way in. Eight takes minimum. Cut the one where the ribbons hold longest before they dissolve. It must never freeze into stripes",
      "Wide of the finished counter — kid's glass, her iced coffee, carton between them, both people in frame, nobody looking at the lens"
    ],
    found:[
      "Audio reference: https://stereogum.com/2508511/wild-pink-still-coming-down/music (Stereogum, Aug 17, 2026) — the release the Pulse flagged, for the team to source the track. Internal reference only: it is never named on screen, in caption, or in comments",
      "Reference (Instagram): Partake Foods' mum-and-daughter snack-time posts — the exact confidence to match. Parent-first, no broadening, no apology for who it's for",
      "Reference (Instagram): Ghia's feed for the pacing — slow cuts, real light, letting a shot breathe past the point most brands would cut"
    ],
    memes:[
      "No meme template and no trending audio format on this one. The only structure is People-on-Camera Amplification with the cofounder-sister and her kid — a face and a real moment, no bit. Adding a format gag would break the register the track is doing all the work to set"
    ],
    archive:[
      "Existing Kids-carton and kitchen b-roll can cover the wides, but the swirl must be shot fresh — no archive pour will read as the same glass the kid just poured from, and the continuity of that one carton is the whole idea"
    ]
  },
  "AUG17-IG-F2":{
    shoot:[
      "CARD 1 type plate — a flat cream sweep with nothing on it, shot or built with enough clean margin that the hook can sit large and left with real air around it. The whole post is judged on this card in the grid",
      "CARD 2 hero — Willa's Original straight-on at eye height, label-forward on cream in hard window light, all four ingredient lines legible in the actual photograph (do not fake the list in post). Deliberate empty space at frame left for the type. Shoot 4+ takes",
      "CARD 4 macro — tight on the Non-GMO Project Verified butterfly on the front of the carton, shallow depth of field, one clean focus pull so the mark snaps in and the rest of the label falls soft",
      "CARD 5 macro drift — slow crop across the certification marks already printed on the front of the pack, ending on the glyphosate-free mark. Shoot it as one continuous move and pull the frame you need",
      "CARD 6 end card — the carton alone on a windowsill in late-afternoon light with cream negative space above it for the sign-off line. No hands, no glass, no second object in frame"
    ],
    found:[
      "Reference (organization page): https://www.nongmoproject.org/ — pull the exact verified-mark language and the correct name of the mark before writing CARD 4. The claim is 'Non-GMO Project Verified,' never 'GMO-free'",
      "Reference (Instagram): Fishwife, Graza and Omsom feeds — the proof an ingredient list can be designed like a zine cover instead of an infographic. Steal the type confidence and the restraint, not the palette",
      "Reference (Instagram): Kiki Milk's feed — the flat category posture for CARD 3. State where the proof usually hides, state where ours is, name nobody, apologize for nothing",
      "Reference (TikTok): https://www.tiktok.com/tag/oatmilk — a language mine, not a format. Read how shoppers actually describe hunting for an ingredient list, then write CARD 3 in their words"
    ],
    memes:[
      "No meme template and no trending sound — this is a static carousel and the humor is entirely in the typography. CARD 1 and CARD 6 are the joke; a format on top of them would flatten both"
    ],
    archive:[
      "Existing front-of-carton macro footage can cover CARDS 4 and 5 if the marks read sharp and the light is real rather than studio-flat. CARDS 1, 2 and 6 need a fresh shoot — the negative space is designed around the type and old crops won't hold it"
    ]
  },
  "AUG17-TT-6":{
    shoot:[
      "Walking push-in on the cart, straight down the lens, mid-stride — shoot this 4 or 5 times and take the one where she isn't performing. The whole brief rests on the first three seconds reading as a person, not a spot",
      "Four fast item lift-outs at walking pace (olive oil, tinned fish, sauce starter, cookies) — one beat each, hold the item at chest height so the cart stays in frame under it",
      "THE HERO: the cart stopping, the camera settling, Willa's Original coming out with both hands and turning to the back label. Shoot the most takes here — this is the only beat where the movement drops out and it has to feel like she actually meant it",
      "Macro insert: thumb running down the four-line ingredient list on the back of Willa's Original, with Willa's Kids soft in the cart behind it",
      "Locked overhead of the open cart with all five items in a loose row, Willa's Original label-forward in the middle — this is the end card, shoot it clean with nothing else in the basket",
      "SAFETY PASS before you roll: walk the frame and confirm no store signage, aisle marker, shelf-talker or price label is legible in ANY setup. If a shelf tag is in the plane of focus, move the cart"
    ],
    found:[
      "Trend reference (TikTok): https://www.tiktok.com/tag/worththemoney — the live hashtag for the format, for research only. Watch the top posts for pacing: how fast the throwaway items get held up, and how much longer the one that actually matters gets held. That ratio is the entire edit. Don't post under this tag — it reads as a price frame, so the piece ships under #nonnegotiables instead",
      "Trend reference (article): 'TikTok's 5 Things Worth The Money Trend Signals a Major Shift in Consumer Spending' (Aug 12, 2026) — https://yourcoffeebreak.co.uk/lifestyle/26338827088/tiktoks-5-things-worth-the-money-trend-signals-a-major-shift-in-consumer-spending/ — read it for what people actually put on these lists. Almost none of it is groceries, which is exactly why a carton in slot four is the surprise",
      "Reference (Instagram): Partake Foods' cart-full haul posts — the exact energy to match. A real person, a real cart, unapologetic about naming the brands, zero product-shot polish",
      "Reference (Instagram): Olipop's 'spending money on a product I love' confession posts — proof the register can be warm and funny without the joke ever being about price"
    ],
    memes:[
      "No trending sound and no meme audio on this one. The format IS the meme — a list, direct to camera, with one item held longer than the rest. Adding a viral sound on top turns a confession into a skit and the fourth beat stops landing",
      "The only 'joke' in the piece is structural: four items get a sentence, one gets the camera to stop. Don't punch it up with a caption gag"
    ],
    archive:[
      "Existing clean carton stills can back the overhead end card, but the cart footage has to be shot fresh — archive product footage is exactly the polish this format dies from",
      "PRE-SHOOT CHECK: the four non-Willa's slots must be brands the person on camera genuinely buys. If she doesn't actually keep one of them in her cart, swap it for something she does — a list she can't defend in the comments reads false and kills the whole premise"
    ]
  },
  "AUG17-IG-R5":{
    shoot:[
      "The hero macro pour, 100mm, glass rim OUT of frame — shoot at least eight takes in hard window light and pick the one where the milk folds over itself as it lands. If none of them look too rich to be real straight out of camera, stop and reshoot on a different day rather than fixing it later",
      "The same pour framed slightly wider as a safety, in case the tight version reads as unidentifiable rather than unbelievable",
      "Back-label flip: finger tracing the four-line ingredient list, one line per beat, 50mm, carton square to camera — shoot it clean enough that the list is legible on a phone at arm's length",
      "The spoon drag through a full glass, real time, at least six takes — the channel has to hold for about a second. This is the receipt for the pour, so it gets the most attempts",
      "Static two-shot end frame: carton label-forward, half-empty glass with the channel still visible, nothing moving"
    ],
    found:[
      "Trend reference: https://lightreel.ai/blogs/whats-trending-on-tiktok — the Aug 8-15, 2026 weekly trend report entry describing the 'illusion plus proof' food cut. Read the entry before shooting and match the CUT TIMING, not the subject matter: the payoff arrives fast and without a transition",
      "Trend reference (TikTok, permanent hashtag page): https://www.tiktok.com/tag/isitcake — the mass-scale version of the same disbelief mechanic, running the opposite polarity (looks real, is fake). Willa's is running it the honest way round — looks fake, is real — so borrow the reveal rhythm and invert the joke",
      "Reference (TikTok, permanent hashtag page): https://www.tiktok.com/tag/oatmilk — scroll the comment sections on category texture videos for the exact words people use when they don't believe a plant-milk pour. Those words belong on screen, not ours"
    ],
    memes:[
      "The only meme mechanic in play is the format itself (Format-as-Virality) — the joke is that the viewer's accusation is anticipated and then answered with a label. Do not add a meme sticker, a reaction overlay, or a caption explaining the format. The moment the video explains itself the trick is dead"
    ],
    archive:[
      "No archive footage. Everything must be shot fresh for this one — reusing an older pour clip means nobody on the team can vouch for what was and wasn't done to it, and vouching is the entire point of the brief"
    ]
  },
  "AUG17-PIN-3":{
    shoot:[
      "Willa's Original straight-on at eye line on warm cream seamless, label forward, one long soft shadow falling right — shoot with the carton low in the frame and at least half the height left empty above it for type",
      "The same carton one stop brighter and one stop darker, same framing, so the type can be placed against whichever ground holds contrast at thumbnail size",
      "A slightly tighter crop of the same setup, carton filling more of the lower half, as the alternate for a type-shorter variant",
      "No props on set. If a stylist reaches for oats, a glass, a linen or a spoon, that's the version of this pin that fails"
    ],
    found:[
      "Trend reference (format): https://tiktoktrends.org/tiktok-trends-10-august/ — the 'kinda chic' entry; read the description for the register, which is calm and unjoked, not confessional (use for register only — this page's own dateline reads Aug 9, 2026, so treat it as a format reference, not a this-week freshness citation; freshness rests on the TikTok tag page below)",
      "Trend reference (TikTok): https://www.tiktok.com/tag/kindachic — pull the top posts on the hashtag and watch how the text is set and how flatly it's delivered; match the flatness, not the aesthetic",
      "Design reference: Graza, Fishwife and Omsom pack + pin typography — one line, one product, generous margins. This is the exact register; do not look at wellness-brand Pinterest for this one"
    ],
    memes:[
      "Riding the 'kinda chic' format straight — no edit, no audio, no transition, because this is the static translation of it. The single rule: the line is stated and then nothing happens. No wink hard enough to read as a punchline, no self-deprecation, no 'shhh…', and nothing on the pin explaining what the format is"
    ],
    archive:[
      "Existing clean carton stills can substitute if the shadow is a single soft directional one and there is real empty space above the carton — most archive product shots are styled with props and centered high, which won't work here"
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
const WELCOME_WEEK_KEY = "AUG-17-2026";
const WELCOME_WEEK_RANGE = "AUG 17 – AUG 23, 2026";
const WELCOME_REFRESHED = "AUG 17, 2026";

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
  pullQuote:"three separate things moved the same direction this week, and all three land on the front of the box. a third party finally wrote down what 'ultra-processed' actually means and started printing a seal against it. a federal court took the qr code away as a way to disclose what's inside a package, so the proof goes back onto the carton itself. a house bill would name oats on the major-allergen line, which prints the question parents have been asking quietly for years. and in the middle of all that, a national player walked out of ready-to-drink oat milk and gave lack of demand as the reason. none of it asks willa's to change anything — four things on the front, all four of which a person can point at. so the week is built on saying it first, calmly, before anybody asks: the bar, the answer about oats, and the reason this carton exists at all.",
  the_moves:[
    {kind:"ship", verb:"Open Wed Aug 19 at 9am on the standard itself — Christina to camera, stance inside the first three seconds, the four ingredients landing by beat two.", why:"The Non-GMO Project's Non-UPF Verified standard, administered with NSF, moved from announcement to actual packages this window — one clean-label brand announced its seal Aug 11, 2026, another said roughly 60% of its portfolio qualified without reformulating a single item. For three years 'ultra-processed' has been an argument with no scoreboard, and somebody finally wrote the test down. This is the one brief of the week where a face beats hands, because the payload is the stance. Hard line: Willa's has not applied for and does not carry this seal — the brief is about the bar existing, never about a mark on our carton."},
    {kind:"ship", verb:"Answer the aisle Wed Aug 19 at noon with one continuous take on why this carton exists — and never mention that anyone left.", why:"A national player confirmed Aug 11, 2026 that its ready-to-drink oat line is discontinued for lack of demand, its second oat exit, framed as part of a wider plant-based retreat. That is entirely internal context. What it changes is the register: for the next month, commitment is the most valuable thing a small brand can post, and confidence reads louder than argument. Christina in the chilled set beside the lineup, unpolished, one take, the grandmother's kitchen in a single line and the four-ingredient reason in the next. No demand talk, no shelf talk, no category health, no retailer signage."},
    {kind:"ship", verb:"Publish the oat answer Fri Aug 21 at noon while it is still a choice — cofounder-sister on camera, plain, four seconds long.", why:"H.R. 9988 would strike 'wheat' from the major food allergen definition and replace it with 'gluten-containing grain' — wheat, rye, barley, oats and crossbreeds — which puts the quiet question parents already ask about oats onto every package in America. Willa's Kids answers it now, before a label rewrite forces the conversation: free of the top nine major allergens, 8g protein, plant-based calcium and DHA, 100 out of 100 on the Clean Label App. The claim belongs to Kids only. No bill, no Congress, no medical advice, and no back-to-school framing anywhere near it."}
  ]
};


const WELCOME_HIGHLIGHTS = [
  {
    glyph:"🏷️",
    kindLabel:"Certification",
    color:"#75C596",
    stat:"60%",
    label:"Somebody finally wrote down the bar for 'ultra-processed' — and the seal is already printing on packages",
    detail:"The Non-GMO Project's Non-UPF Verified standard, administered with NSF, has moved from announcement to shelf. One clean-label brand announced its verification Aug 11, 2026; another said roughly 60% of its products cleared the bar without reformulating a single item. A consumer-advocacy critique published Aug 12, 2026 asks the harder question — whether a private badge arriving years ahead of any federal definition helps shoppers or adds noise. Either way the bar now exists and it is being printed. This is the week's lead brief, and the discipline is exact: talk about the test being written, never imply Willa's carries the mark.",
    sources:[
      {label:"Center for Science in the Public Interest · Non-UPF labels: Useful new tool or cause for confusion? (Aug 12, 2026)", url:"https://news.google.com/rss/articles/CBMihwFBVV95cUxQX1pzdGZ5MElWa1lTX3R2dXE4NU1XTzZtVDZhNmd6YmVOOWNFcVQ0N010b0pYd2RJZ3dpWVEwdDZQRHZyYWhGTFFYUUFwY053eWt3VW9ORDRVVHA5dGVFWVJBV2s2WFpZaHF0TzBfTnM4Y3YzUk9teWQ2WHhzdTlyQlJnWnFaVmc?oc=5"},
      {label:"Non-UPF Verified · certification program page (permanent reference, linked from nongmoproject.org)", url:"https://www.nonultraprocessed.org/"}
    ],
    statLabel:"cleared it unchanged"
  },
  {
    glyph:"🥛",
    kindLabel:"Competitive",
    color:"#A191B2",
    stat:"DISCONTINUED",
    label:"A national player walked out of ready-to-drink oat milk and gave lack of demand as the reason",
    detail:"Confirmed Aug 11, 2026: the drinkable oat line — Original, Vanilla and Zero Sugar — is discontinued, with remaining stock selling through and no restock planned. It is the company's second oat exit after quietly dropping its oat creamers a few years ago, and it came the same day it cut its annual earnings outlook and framed the move as part of a wider retreat from plant-based expansion. Every number here stays internal. What ships is the posture: shelf space is opening, not closing, and the Wednesday noon Reel answers with the reason this carton exists rather than a word about anyone leaving.",
    sources:[
      {label:"Big Box Vegan · Chobani Discontinues Their Oatmilk Line (Aug 11, 2026)", url:"https://bigboxvegan.com/2026/08/11/chobani-discontinues-their-oatmilk-line/"},
      {label:"Bloomberg · Chobani Cuts Annual Earnings Forecast on Rising Material Costs (Aug 11, 2026)", url:"https://www.bloomberg.com/news/articles/2026-08-11/chobani-cuts-annual-earnings-forecast-on-rising-material-costs"}
    ],
    statLabel:"the oat RTD line"
  },
  {
    glyph:"🧬",
    kindLabel:"Science",
    color:"#73B2C9",
    stat:"NOT FIBER ALONE",
    label:"The plant protein that survives digestion intact turns out to be doing the work next to the fiber",
    detail:"New work published in the Aug 11, 2026 print issue of PNAS, with the mainstream science write-up following Aug 14, 2026, names a class of indigestible plant proteins that reach the colon intact and — working alongside plant fiber — push gut bacteria toward beneficial compounds and away from harmful ones. The authors suggest labels may eventually track resistant protein right next to fiber. The fiber conversation has run solo for two years; this is the pair. And the pair is exactly what most oat milks filter out and Willa's keeps — 2g+ prebiotic fiber and 4g+ protein per cup. The claim we make is compositional, never clinical.",
    sources:[
      {label:"ScienceDaily · When gut microbes run low on fiber, they may start eating you (Aug 14, 2026)", url:"https://www.sciencedaily.com/releases/2026/08/260814235842.htm"},
      {label:"PNAS · Digestion-resistant proteins support the healthy metabolite profiles associated with plant-based diets (print issue Aug 11, 2026)", url:"https://www.pnas.org/doi/10.1073/pnas.2605226123"}
    ],
    statLabel:"the new finding"
  },
  {
    glyph:"🌾",
    kindLabel:"Labels",
    color:"#9E652E",
    stat:"OATS NAMED",
    label:"A House bill would move oats onto the major-allergen line of every label in America",
    detail:"H.R. 9988 would strike 'wheat' from the major food allergen definition and replace it with 'gluten-containing grain' — defined as wheat, rye, barley, oats and crossbreeds such as triticale — and require a federal report on celiac prevalence, diagnostics and prevention. Legal analysis published Aug 12, 2026 and food-safety trade coverage Aug 11, 2026. Celiac affects roughly 1% of the population and oats have been the contested grain in that argument for years. The move is to answer the question parents already ask, plainly, while it is still a choice rather than a compliance deadline — and to keep the top-nine-free claim on Kids alone.",
    sources:[
      {label:"The Daily Intake · Bill Introduced into House Would Require Allergen Labeling for Gluten-containing Grains (Aug 12, 2026)", url:"https://www.dailyintakeblog.com/2026/08/bill-introduced-into-house-would-require-allergen-labeling-for-gluten-containing-grains/"},
      {label:"Quality Assurance & Food Safety · Bipartisan Bill Would Expand Major Food Allergen Labeling to Barley, Rye and Oats (Aug 11, 2026)", url:"https://news.google.com/rss/articles/CBMirgFBVV95cUxPc04tbHJsSS1RMlphMmhwNWNSSG1JRDFrX3VsR0VjZG1weVFZUkl5QmVTX2JJbDRqY3A3a0hNeHFIRnJkWF9Tc1NiaDh6UDEwR0RrZjhqUnhna3JOV2lVeGZacXNLczVtTmVNQW91R2JJVkFPVE1MY3FDRFZJVzZxdXJxLUk1OC1jMk51UGlvYmlpb3hBdmxnN3ZuQ0lVQks0WnBWRlg4ZndZZzladHc?oc=5"}
    ],
    statLabel:"in H.R. 9988"
  },
  {
    glyph:"📦",
    kindLabel:"Policy",
    color:"#73B2C9",
    stat:"NO MORE QR",
    label:"A court took away the QR code as a way to disclose bioengineered ingredients — the proof goes back on the box",
    detail:"A federal district court ordered prospective vacatur of three USDA regulations on bioengineered food disclosure and rejected the agency's request to delay parts of it, per legal analysis published Aug 17, 2026 and science-press coverage Aug 13, 2026. Two escapes are going away: parking the disclosure behind a QR code or a text line, and the exemption for products whose modified genetic material can't be detected in the finished food. Manufacturers move to on-package text or an approved symbol. The Saturday carousel takes the plain version of this — everything you'd have to scan for is already printed, and the carton has carried Non-GMO Project Verified on the front the whole time.",
    sources:[
      {label:"The Daily Intake · Court Sets Deadline for Bioengineered Food Labeling Changes (Aug 17, 2026)", url:"https://www.dailyintakeblog.com/2026/08/court-sets-jan-1-2028-deadline-for-bioengineered-food-labeling-changes/"},
      {label:"Genetic Literacy Project · Ultraprocessed foods made with GMO corn or soybeans will have to carry bioengineered labels (Aug 13, 2026)", url:"https://news.google.com/rss/articles/CBMi8gFBVV95cUxQX0EyUnRJNHB4cmxqMGxiV0lrTGJzSnRQZ3BrMGRxbThLYjVJTEZkaHVvblRUUC1pOVYyRk9WMDhvcGNYV0ZsREprblJ3T1lvUllNWWxYVnphSG9VNFpSSEtNdnFOVTdCZEdISGxFcUJHOEJrQWZ5VkZnNVRSU3VYS09PMjhGajdURDNJME4zTXBGTmRkT29FMm81cmFUcUZpNEpwd1NvLWJ5RkZvUVM1T1FwbGJRRFRsMzhiX01kVkllYUF2NEE5TFlrRnJXOUQ2VkRqVWdJRG1QazdLS0dhX3RVbmxOWmJDcWIxYU1CckdCdw?oc=5"}
    ],
    statLabel:"proof goes on-pack"
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
  "Someone finally wrote down a test for what counts as ultra-processed, and brands are printing the seal. We'd clear the bar but we haven't applied — how do we talk about the standard without anyone thinking we have the badge?",
  "A big brand just walked out of the oat aisle and blamed demand. How do we sound confident about staying without ever mentioning that anybody left?",
  "There's a push to name oats on the allergen line. How do we answer the question parents already have about oats without drifting into medical territory?",
  "There's a format going around where every question gets the same one-word answer, four times. Is that genuinely us, or does riding it make us look like we're chasing?"
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
