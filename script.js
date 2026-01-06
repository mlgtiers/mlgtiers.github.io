const tierRank = {
  "LT5": 1,
  "HT5": 2,
  "LT4": 3,
  "HT4": 4,
  "LT3": 5,
  "HT3": 6,
  "LT2": 7,
  "HT2": 8,
  "LT1": 9,
  "HT1": 10
};

fetch("data/players.json")
  .then(res => res.json())
  .then(players => {
    players.forEach(p => {
      p.points = tierRank[p.tier] ?? 0;
    });

    players.sort((a, b) => b.points - a.points);
    render(players);
  });

function render(players) {
  const ranking = document.getElementById("ranking");
  ranking.innerHTML = "";

  players.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "player";

    div.innerHTML = `
      <div class="pos">${i + 1}</div>

      <img class="skin" src="${p.skin}" alt="${p.nick}">

      <div class="info">
        <div class="nick">${p.nick}</div>
        <div class="muted">Ranked</div>
      </div>

      <div class="region">${p.region}</div>
      <div class="tier ${p.tier}">${p.tier}</div>
    `;

    div.onclick = () => openModal(p);
    ranking.appendChild(div);
  });
}

function openModal(p) {
  modal.classList.add("active");

  mNick.innerText = p.nick;
  mRegion.innerText = `Região: ${p.region}`;
  mTier.innerHTML = `<span class="${p.tier}">${p.tier}</span>`;
  mPoints.innerText = `${p.points} Pontos`;

  mSkin.src = p.skin;
}

function closeModal() {
  modal.classList.remove("active");
}