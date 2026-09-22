/*
  GOAL HUNTER
  Daily data lives in DAILY_DATA below.
  No API key. No server. No backend.
  Each morning, replace the DAILY_DATA object with the new verified fixtures.
*/

const DAILY_DATA = {
  date: "2026-09-23",
  updatedAt: "2026-09-22 23:45 Ghana time",
  quickPicks: [
    // Example structure. Replace this array with the verified daily shortlist.
    // {
    //   time: "17:00",
    //   league: "League name",
    //   fixture: "Home vs Away",
    //   market: "GG2+",
    //   percentage: 31
    // }
  ]
};

const marketNames = {
  "GG2+": "GG2+",
  "BOTH_HALVES": "Both Teams Score Both Halves"
};

let selectedMarket = "all";

const ghanaDate = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Accra",
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric"
});

document.getElementById("date").textContent = ghanaDate.format(new Date(
  `${DAILY_DATA.date}T12:00:00+00:00`
));
document.getElementById("updated").textContent =
  `Last updated: ${DAILY_DATA.updatedAt}`;

document.querySelectorAll(".market").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".market").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedMarket = btn.dataset.market;
    render();
  });
});

function filtered() {
  if (selectedMarket === "all") return DAILY_DATA.quickPicks;
  return DAILY_DATA.quickPicks.filter(x => x.market === selectedMarket);
}

function best10() {
  return [...filtered()].sort((a,b) => b.percentage - a.percentage).slice(0, 10);
}

function best7() {
  return best10().slice(0, 7);
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
}

function row(x, i) {
  const cls = x.market === "GG2+" ? "gg" : "halves";
  return `<tr>
    <td>${i !== undefined ? i + 1 : ""}</td>
    <td>${esc(x.time)}</td>
    <td>${esc(x.league)}</td>
    <td><strong>${esc(x.fixture)}</strong></td>
    <td><span class="market-pill ${cls}">${esc(marketNames[x.market] || x.market)}</span></td>
    <td class="pct">${esc(x.percentage)}%</td>
  </tr>`;
}

function section(title, subtitle, items, cls) {
  return `<section class="section ${cls}">
    <div class="section-head">
      <div>
        <h2 class="section-title">${title}</h2>
        <p class="section-sub">${subtitle}</p>
      </div>
      <span class="count">${items.length} ${items.length === 1 ? "match" : "matches"}</span>
    </div>
    ${items.length ? `<div class="table-wrap"><table>
      <thead><tr><th>#</th><th>Ghana</th><th>League</th><th>Fixture</th><th>Market</th><th>Est. %</th></tr></thead>
      <tbody>${items.map(row).join("")}</tbody>
    </table></div>` :
    `<div class="empty">No verified qualifying fixtures have been loaded for this market yet.</div>`}
  </section>`;
}

function render() {
  const q = filtered();
  const b10 = best10();
  const b7 = best7();

  document.getElementById("app").innerHTML =
    section("⚡ Quick Picks 20", "All qualifying picks · up to 20", q.slice(0,20), "quick") +
    section("🔥 Best 10", "10 strongest selections from the available qualifiers", b10, "best10") +
    section("🎯 Best 7", "7 strongest selections from the Best 10", b7, "best7");
}

render();
