class User {
    constructor(username, password, id) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.score = 0;
        this.correctAns = 0;
    }
}

class main {
    constructor() {
        fetch("./Data.json")
            .then(res => res.json())
            .then(data => {
                this.users = data;
            });
    }

    login() {
        const captchaResponse = grecaptcha.getResponse();
        if (!captchaResponse) {
            alert("Please complete the reCAPTCHA.");
            return;
        }
        const inputElement1 = document.getElementById("username");
        const username = inputElement1.value;
        const inputElement2 = document.getElementById("password");
        const password = inputElement2.value;

        for(let i = 0; i < this.users.length; i++) {
            if(username == this.users[i].username && password == this.users[i].password){
                window.location.replace("welcomePage.html");
            }
        }
    }


}

m = new main();