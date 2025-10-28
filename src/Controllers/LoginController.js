const userLogin = require('../Models/User')

module.exports = {
    async login(req,res) {
        const { username, password } = req.body

        try {
            const validUsername = await userLogin.findOne({
                username
            })
            if (!validUsername) return res.status(400).send({ message: "User does not exist" })
            
            const validPassword = await userLogin.findOne({
                password: password
            }).where({
                username: username
             })
            if (!validPassword) return res.status(400).send({message: 'Invalid password'})

                const loggedIn = validPassword

                return res.status(200).send({
                    message: 'Success',
                    data: loggedIn
                })
                
        } catch(err) {
            return res.status(400).send(err)
        }
    }
    
}