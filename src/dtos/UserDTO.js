
class UserDTO {

    constructor(_id, isManager, fullName, images, gender, address, city, phoneNumber, birth, email) {

        this._id = _id
        this.isManager = isManager
        this.fullName = fullName
        this.images = images
        this.gender = gender
        this.address = address
        this.city = city
        this.phoneNumber = phoneNumber
        this.birth = birth
        this.email = email
    }

    mapUserToUserDTO(user) {
        const {
            _id,
            isManager,
            fullName,
            images,
            gender,
            address,
            city,
            phoneNumber,
            birth,
            email
        } = user

        return new UserDTO(_id, isManager, fullName, images, gender, address, city, phoneNumber, birth, email)
    }

}

module.exports = new UserDTO
