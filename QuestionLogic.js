let questions = [];
let currentIndex = 0;
let activePlayerIndex = 1;

function loadQuestions() {
    fetch("questions.json")
        .then(res => res.json())
        .then(data => {
            questions = shuffleQuestions(data);
            currentIndex = 0;
            showQuestion();
        });
}

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];

    }
    return array;
}

function hamburger(menuId){
    const menu = document.getElementById(menuId);

    if(menu.style.display === "block"){
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

function showLeaderboard(){
    document.getElementById("leaderboard-container").style.display = "block";
    document.getElementById("question-root").style.display = "none";

    update(); // re-render leaderboard
}

function showQuestion() {
    const container = document.getElementById("question-content");

    const q = questions[currentIndex];

    if (!q) return;

    let html = `<h3>${q.question}</h3>`;

    if (q.type === "tf") {
        html += `
            <button onclick="answer(true)">True</button>
            <button onclick="answer(false)">False</button>
        `;
    }

    if (q.type === "mc") {
        q.options.forEach((opt, i) => {
            html += `<button onclick="answer(${i})">${opt}</button><br>`;
        });
    }

    container.innerHTML = html;
}

function answer(userAnswer) {
    const q = questions[currentIndex];

    let correct = false;

    if (q.type === "tf") {
        correct = (userAnswer === q.answer);
    }

    if (q.type === "mc") {
        correct = (userAnswer === q.answer);
    }
    const player = window.gameState.players[activePlayerIndex];

    if (correct) {

        player.score += Math.floor(Math.random()*5+1);
        player.correct += 1;

        // done for global tracking
        window.gameState.TotalPoints += 1;
        window.gameState.TotalCorrect += 1;
    }

    currentIndex++;
    update();

    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        document.getElementById("question-container").innerHTML =
            "<h2>Quiz Finished!</h2>";
    }
}