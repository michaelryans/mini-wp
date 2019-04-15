const bcrypt = require('bcryptjs')
module.exports = {
    bcryptHash(password) {
        let hash = bcrypt.hashSync(password, 10)
        return hash
    },
    bcryptCompare(password, hashed) {
        let compared = bcrypt.compareSync(password,hashed)
        return compared
    }
}