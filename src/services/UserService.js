const responeObject = require("../models/responeObject")

class UserService {

    Login(email, password) {
        try {

            return new responeObject(
                200,
                "OK",
                "Login success",
                { email, password }
            )
        } catch (err) {
            return new responeObject(
                200,
                "OK",
                "Login error"
            )
        }
    }
}

module.exports = new UserService
