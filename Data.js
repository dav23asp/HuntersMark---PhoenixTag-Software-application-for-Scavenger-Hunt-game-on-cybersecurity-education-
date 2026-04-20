class User {
    constructor(username, password, id) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.score = 0;
        this.correctAns = 0;
    }

    login(username, password) {
        if(this.username == username && this.password == password) {
            //do logic to go to next page or something can't do this rn
        }
        else {
            //output on html saying incorrect password
        }
    }

    logout() {
        //go to login page in some way
    }
}