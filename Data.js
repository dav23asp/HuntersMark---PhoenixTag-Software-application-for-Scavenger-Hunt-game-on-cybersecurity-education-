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
        this.userCount = 0;
        this.users = [];
        this.users.push(new User("mberg", "1234ddffss&", this.userCount));
        this.userCount++;
        this.users.push(new User("dserr", "rreerree4433##ccDDsSdaL", this.userCount));
        this.userCount++;
        this.users.push(new User("smurr", "54321ttEDS%$ddd", this.userCount));
        this.userCount++;
    }

    login() {
        const inputElement1 = document.getElementById("username");
        const username = inputElement1.value;
        const inputElement2 = document.getElementById("password");
        const password = inputElement2.value;
        this.userCount++;
        for(let i = 0; i < this.userCount; i++) {
            if(username == this.users[i].username && password == this.users[i].password){
                window.location.replace("welcomePage.html");
            }
        }
    }


}

m = new main();