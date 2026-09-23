/* GOAL HUNTER

   Daily static fixture data — 23 September 2026

   Ghana time (GMT+0 / UTC+0)

   Markets: GG2+ and Both Teams Score Both Halves

   Percentages are model estimates, not guarantees.

*/

const DAILY_DATA = {

  date: "2026-09-23",

  updatedAt: "23 Sep 2026",

  quickPicks: [

    { kickoff:"10:45", league:"UEFA Women's Champions League", home:"Servette Chênois Women", away:"OL Lyonnes Women", market:"GG2+", probability:23 },

    { kickoff:"10:45", league:"UEFA Women's Champions League", home:"OH Leuven Women", away:"Roma Women", market:"GG2+", probability:24 },

    { kickoff:"13:00", league:"UEFA Women's Champions League", home:"Barcelona Women", away:"Paris FC Women", market:"GG2+", probability:28 },

    { kickoff:"13:00", league:"UEFA Women's Champions League", home:"Chelsea Women", away:"Austria Wien Women", market:"GG2+", probability:32 },

    { kickoff:"10:00", league:"UEFA Women's Europa Cup", home:"Metalist 1925 Kharkiv Women", away:"Torreense Women", market:"GG2+", probability:22 },

    { kickoff:"13:00", league:"UEFA Women's Europa Cup", home:"PAOK Women", away:"Spartak Myjava Women", market:"GG2+", probability:21 },

    { kickoff:"14:00", league:"UEFA Women's Europa Cup", home:"Breidablik Women", away:"Czarni Sosnowiec Women", market:"GG2+", probability:24 },

    { kickoff:"15:00", league:"UEFA Women's Europa Cup", home:"Slovan Liberec Women", away:"Rosenborg Women", market:"GG2+", probability:23 },

    { kickoff:"15:30", league:"UEFA Women's Europa Cup", home:"HJK Helsinki Women", away:"Brann Women", market:"GG2+", probability:25 },

    { kickoff:"16:00", league:"UEFA Women's Europa Cup", home:"FH Hafnarfjördur Women", away:"Eintracht Frankfurt Women", market:"GG2+", probability:21 },

    { kickoff:"16:00", league:"UEFA Women's Europa Cup", home:"Sparta Praha Women", away:"Farul Constanța Women", market:"GG2+", probability:23 },

    { kickoff:"16:00", league:"UEFA Women's Europa Cup", home:"Brøndby Women", away:"Sporting CP Women", market:"GG2+", probability:22 },

    { kickoff:"16:45", league:"UEFA Women's Europa Cup", home:"St. Pölten Women", away:"Malmö FF Women", market:"GG2+", probability:24 },

    { kickoff:"17:00", league:"UEFA Women's Europa Cup", home:"Feyenoord Women", away:"Vålerenga Women", market:"GG2+", probability:25 },

    { kickoff:"17:00", league:"UEFA Women's Europa Cup", home:"Hammarby Women", away:"Rangers Women", market:"GG2+", probability:27 },

    { kickoff:"17:00", league:"UEFA Women's Europa Cup", home:"PSV Women", away:"Fortuna Hjørring Women", market:"GG2+", probability:26 },

    { kickoff:"17:00", league:"UEFA Women's Europa Cup", home:"Wolfsburg Women", away:"Sturm Graz Women", market:"GG2+", probability:29 },

    { kickoff:"17:30", league:"UEFA Women's Europa Cup", home:"Ajax Women", away:"Aktobe Women", market:"GG2+", probability:31 },

    { kickoff:"18:00", league:"UEFA Women's Europa Cup", home:"Hearts Women", away:"Real Sociedad Women", market:"GG2+", probability:22 },

    { kickoff:"16:00", league:"International Friendly", home:"Azerbaijan", away:"Tajikistan", market:"GG2+", probability:21 },

    { kickoff:"16:00", league:"International Friendly", home:"Gibraltar", away:"São Tomé and Príncipe", market:"GG2+", probability:20 },

    { kickoff:"13:00", league:"UEFA Women's Champions League", home:"Chelsea Women", away:"Austria Wien Women", market:"BOTH_HALVES", probability:11 },

    { kickoff:"13:00", league:"UEFA Women's Champions League", home:"Barcelona Women", away:"Paris FC Women", market:"BOTH_HALVES", probability:10 },

    { kickoff:"17:30", league:"UEFA Women's Europa Cup", home:"Ajax Women", away:"Aktobe Women", market:"BOTH_HALVES", probability:10 },

    { kickoff:"17:00", league:"UEFA Women's Europa Cup", home:"Wolfsburg Women", away:"Sturm Graz Women", market:"BOTH_HALVES", probability:9 },

    { kickoff:"17:00", league:"UEFA Women's Europa Cup", home:"Hammarby Women", away:"Rangers Women", market:"BOTH_HALVES", probability:9 },

    { kickoff:"17:00", league:"UEFA Women's Europa Cup", home:"PSV Women", away:"Fortuna Hjørring Women", market:"BOTH_HALVES", probability:8 },

    { kickoff:"18:00", league:"UEFA Women's Europa Cup", home:"Hearts Women", away:"Real Sociedad Women", market:"BOTH_HALVES", probability:8 },

    { kickoff:"18:00", league:"KNVB Beker", home:"JOS Watergraafsmeer", away:"TEC", market:"GG2+", probability:18 },

    { kickoff:"18:00", league:"KNVB Beker", home:"IJsselmeervogels", away:"Gemert", market:"GG2+", probability:19 },

    { kickoff:"18:00", league:"KNVB Beker", home:"Sparta Nijkerk", away:"UDI'19", market:"GG2+", probability:18 },

    { kickoff:"18:00", league:"KNVB Beker", home:"TOGB", away:"Rohda Raalte", market:"GG2+", probability:20 },

    { kickoff:"18:00", league:"KNVB Beker", home:"Groesbeek", away:"Kozakken Boys", market:"GG2+", probability:21 },

    { kickoff:"16:00", league:"International Friendly", home:"Azerbaijan", away:"Tajikistan", market:"BOTH_HALVES", probability:7 },

    { kickoff:"16:00", league:"International Friendly", home:"Gibraltar", away:"São Tomé and Príncipe", market:"BOTH_HALVES", probability:6 }

  ]

};

const MARKET_LABELS = {

  GG2+: "GG2+ — both teams 2+",

  BOTH_HALVES: "Both Teams Score Both Halves"

};

function sortPicks(picks) {

  return [...picks].sort((a,b) =>

    b.probability - a.probability || a.kickoff.localeCompare(b.kickoff)

  );

}

function card(pick, index) {

  return `

    <article class="pick-card">

      <div class="pick-top">

        <span class="rank">#${index + 1}</span>

        <span class="league">${pick.league}</span>

        <span class="probability">${pick.probability}%</span>

      </div>

      <div class="teams">

        <strong>${pick.home}</strong>

        <span class="vs">vs</span>

        <strong>${pick.away}</strong>

      </div>

      <div class="pick-bottom">

        <span class="kickoff">${pick.kickoff} Ghana</span>

        <span class="market-pill">${MARKET_LABELS[pick.market]}</span>

      </div>

    </article>`;

}

function section(title, subtitle, picks) {

  if (!picks.length) return "";

  return `

    <section class="section">

      <div class="section-heading">

        <div>

          <h2>${title}</h2>

          <p>${subtitle}</p>

        </div>

        <span class="count">${picks.length}</span>

      </div>

      <div class="picks">

        ${picks.map(card).join("")}

      </div>

    </section>`;

}

function render(market = "all") {

  const app = document.getElementById("app");

  if (!app) return;

  const all = sortPicks(DAILY_DATA.quickPicks);

  const filtered =

    market === "all"

      ? all

      : all.filter(p => p.market === market);

  app.innerHTML =

    section(

      "QUICK PICKS 20",

      "All qualifying fixtures found for today's two markets.",

      filtered.slice(0, 20)

    ) +

    section(

      "BEST 10",

      "Highest model estimates from the qualifying pool.",

      filtered.slice(0, 10)

    ) +

    section(

      "BEST 7",

      "Tightest shortlist from the same qualifying pool.",

      filtered.slice(0, 7)

    );

  if (!filtered.length) {

    app.innerHTML =

      `<div class="empty">No qualifying fixtures found for this market today.</div>`;

  }

}

function init() {

  const dateEl = document.getElementById("date");

  const updatedEl = document.getElementById("updated");

  if (dateEl) {

    dateEl.textContent =

      new Date("2026-09-23T12:00:00Z").toLocaleDateString(

        "en-GH",

        {

          weekday: "long",

          day: "numeric",

          month: "long",

          year: "numeric",

          timeZone: "UTC"

        }

      );

  }

  if (updatedEl) {

    updatedEl.textContent =

      `Last updated: ${DAILY_DATA.updatedAt} · Ghana Time`;

  }

  render();

  document.querySelectorAll(".market").forEach(button => {

    button.addEventListener("click", () => {

      document

        .querySelectorAll(".market")

        .forEach(b => b.classList.remove("active"));

      button.classList.add("active");

      render(button.dataset.market || "all");

    });

  });

}

document.addEventListener("DOMContentLoaded", init);
