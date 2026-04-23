function showWelcome(){
    document.getElementById("leaderboard-container").style.display = "none";

    const question = document.getElementById("question-root");
    if (question) {
        question.style.display = "none";
    }

    const welcome = document.getElementById("welcome-container");
    if (welcome) {
        welcome.style.display = "block";
    }
}