import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_FOOTBALL_KEY || "";
const TZ = process.env.TIMEZONE || "Africa/Accra";

app.use(express.static(path.join(__dirname, "public")));

const ALLOWED_LEAGUE_TERMS = [
  "Iceland", "Finland", "Netherlands", "Germany", "Switzerland", "Wales",
  "Norway", "England", "Belgium", "Hungary"
];

function dateInTZ(offsetDays = 0) {
  const now = new Date();
  const d = new Date(now.toLocaleString("en-US", { timeZone: TZ }));
  d.setDate(d.getDate() + offsetDays);
  const y = d.getFullYear(), m = String(d.getMonth()+1).padStart(2,"0"), day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}

function weekendDates() {
  const now = new Date();
  const d = new Date(now.toLocaleString("en-US", { timeZone: TZ }));
  const day = d.getDay();
  const sat = new Date(d); sat.setDate(d.getDate() + (6-day));
  const sun = new Date(sat); sun.setDate(sat.getDate()+1);
  const fmt = x => `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}-${String(x.getDate()).padStart(2,"0")}`;
  return [fmt(sat), fmt(sun)];
}

async function api(pathname, params={}) {
  if (!API_KEY) throw new Error("API_FOOTBALL_KEY is not configured");
  const qs = new URLSearchParams(params);
  const r = await fetch(`https://v3.football.api-sports.io/${pathname}?${qs}`, {
    headers: {"x-apisports-key": API_KEY}
  });
  if (!r.ok) throw new Error(`Football API HTTP ${r.status}`);
  return r.json();
}

function leagueAllowed(name="") {
  const s = name.toLowerCase();
  return ALLOWED_LEAGUE_TERMS.some(x => s.includes(x.toLowerCase()));
}

function poissonPAtLeast2(lambda) {
  return 1 - Math.exp(-lambda) * (1 + lambda);
}

function clamp(x, a=0.01, b=0.99) { return Math.max(a, Math.min(b, x)); }

function estimate(f) {
  // Transparent baseline. The production model can be upgraded with stored
  // team/league histories, xG, lineups and odds calibration.
  const homeAvg = Number(f.goals?.home ?? 1.55);
  const awayAvg = Number(f.goals?.away ?? 1.25);
  const pHome2 = poissonPAtLeast2(homeAvg);
  const pAway2 = poissonPAtLeast2(awayAvg);
  const gg2 = clamp(pHome2 * pAway2);

  // Both-halves is intentionally stricter. This baseline assumes roughly
  // 45% of goals occur in each half and requires all four scoring events.
  const h1Home = clamp(homeAvg * 0.50);
  const h1Away = clamp(awayAvg * 0.50);
  const h2Home = clamp(homeAvg * 0.50);
  const h2Away = clamp(awayAvg * 0.50);
  const bh = clamp(
    (1-Math.exp(-h1Home)) * (1-Math.exp(-h1Away)) *
    (1-Math.exp(-h2Home)) * (1-Math.exp(-h2Away))
  );

  return {
    gg2: Math.round(gg2*100),
    bothHalves: Math.round(bh*100)
  };
}

app.get("/api/health", (_,res)=>res.json({ok:true, configured:Boolean(API_KEY), timezone:TZ}));

app.get("/api/fixtures", async (req,res) => {
  try {
    const mode = req.query.range || "today";
    let from, to;
    if (mode === "today") from = to = dateInTZ(0);
    else if (mode === "tomorrow") from = to = dateInTZ(1);
    else if (mode === "next3") { from=dateInTZ(1); to=dateInTZ(3); }
    else if (mode === "weekend") {
      [from,to] = weekendDates();
    } else throw new Error("Unknown date range");

    const data = await api("fixtures", {from,to, timezone:TZ});
    const fixtures = (data.response || [])
      .filter(x => ["NS","TBD"].includes(x.fixture?.status?.short))
      .filter(x => leagueAllowed(x.league?.country) || leagueAllowed(x.league?.name))
      .map(x => {
        const est = estimate(x);
        return {
          id:x.fixture.id,
          date:x.fixture.date,
          league:x.league.name,
          country:x.league.country,
          home:x.teams.home.name,
          away:x.teams.away.name,
          gg2:est.gg2,
          bothHalves:est.bothHalves
        };
      });

    res.json({from,to,timezone:TZ,fixtures,generatedAt:new Date().toISOString()});
  } catch (e) {
    res.status(503).json({error:e.message, configured:Boolean(API_KEY)});
  }
});

app.get("/health", (req,res)=>res.json({ok:true, configured:Boolean(API_KEY), timezone:TZ}));

app.listen(PORT, "0.0.0.0", ()=>console.log(`Goal Hunter running on port ${PORT}`));
