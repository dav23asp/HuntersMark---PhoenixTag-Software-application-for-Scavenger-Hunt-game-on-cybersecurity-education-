

let previousPositions = {};
let previousRanks = {};

function hamburger(menuId){
    const menu = document.getElementById(menuId);

    if(menu.style.display === "block"){
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

document.addEventListener("click", function (event) {
    const openMenus = document.querySelectorAll(".menuBody");

    openMenus.forEach(menu => {
        if (menu.style.display !== "block") return;

        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnButton = event.target.closest(".menuButton");

        if (!isClickInsideMenu && !isClickOnButton) {
            menu.style.display = "none";
        }
    });
});

function MainGame(){
    document.getElementById("leaderboard-container").style.display = "none";
    document.getElementById("question-root").style.display = "block";
}
/*************** sort ***************/
function sortLeaderboard(data) {
    data.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.correct - a.correct;
    });
}

/*************** render ***************/
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




/*************** Updates ***************/
function update() {
    renderLeaderboard(window.gameState.players);

}

/*************** Checks everything else is laoded before leaderboard ***************/
function initLeaderBoard(playerData) {
    if (playerData) {
        window.gameState.players = playerData;
    }

    const table = document.querySelector("#leaderboard");
    if (!table) return;

    renderLeaderboard(window.gameState.players);

}