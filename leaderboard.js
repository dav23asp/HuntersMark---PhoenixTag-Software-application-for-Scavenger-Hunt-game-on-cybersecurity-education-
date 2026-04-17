

let previousPositions = {};
let previousRanks = {};

/*************** SORT ***************/
function sortLeaderboard(data) {
    data.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.correct - a.correct;
    });
}

/*************** RENDER ***************/
function renderLeaderboard(data) {
    const tbody = document.querySelector("#leaderboard tbody");
    if (!tbody) return;

    const rows = tbody.querySelectorAll("tr");

    rows.forEach((row, index) => {
        const name = row.dataset.name;
        previousPositions[name] = row.getBoundingClientRect().top;
        previousRanks[name] = index;
    });

    sortLeaderboard(data);
    tbody.innerHTML = "";

    data.forEach(player => {
        const row = document.createElement("tr");
        row.dataset.name = player.name;

        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.score}</td>
            <td>${player.correct}</td>
        `;

        tbody.appendChild(row);
    });

    const newRows = tbody.querySelectorAll("tr");

    newRows.forEach((row, index) => {
        const name = row.dataset.name;
        const oldTop = previousPositions[name];
        const oldRank = previousRanks[name];

        if (oldTop !== undefined) {
            const newTop = row.getBoundingClientRect().top;
            const delta = oldTop - newTop;

            if (delta !== 0) {
                row.style.transform = `translateY(${delta}px)`;
                row.offsetHeight;

                row.classList.add("animating");

                if (index < oldRank) row.classList.add("moving-up");
                else if (index > oldRank) row.classList.add("moving-down");

                row.style.transform = "translateY(0)";

                setTimeout(() => {
                    row.classList.remove("animating", "moving-up", "moving-down");
                    row.style.transform = "";
                }, 800);
            }
        }
    });
}

/*************** CONTROLS ***************/
function createControls(data) {
    const controlsDiv = document.getElementById("controls");
    controlsDiv.innerHTML = "";

    data.forEach((player, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <strong>${player.name}</strong><br>
            <button onclick="addPoint(${index})">+ Point</button>
            <button onclick="removePoint(${index})">- Point</button>
            <button onclick="addCorrect(${index})">+ Correct</button>
            <button onclick="removeCorrect(${index})">- Correct</button>
            <hr>
        `;

        controlsDiv.appendChild(div);
    });
}

/*************** LIVE UPDATES ***************/
function addPoint(index) {
    gameState.players[index].score++;
    update();
}

function removePoint(index) {
    gameState.players[index].score--;
    update();
}

function addCorrect(index) {
    gameState.players[index].correct++;
    update();
}

function removeCorrect(index) {
    gameState.players[index].correct--;
    update();
}

/*************** SINGLE UPDATE PIPELINE ***************/
function update() {
    renderLeaderboard(gameState.players);
    createControls(gameState.players);
}

/*************** INIT ***************/
function initLeaderBoard(playerData) {
    if (playerData) {
        players = playerData;
    }

    const table = document.querySelector("#leaderboard");
    if (!table) return;

    renderLeaderboard(players);
    createControls(players);
}