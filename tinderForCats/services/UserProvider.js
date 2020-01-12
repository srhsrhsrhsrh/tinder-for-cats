export class UserProvider {
    static instance;

    constructor(tinderForCatsUser) {
        if (!UserProvider.instance) {    
            UserProvider.instance = this;
            this.tinderForCatsUser = tinderForCatsUser;
        }

        return UserProvider.instance;
    }
}