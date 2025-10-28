const User = require('../Models/User')
//const bcrypt = require('bcrypt')

module.exports = {
    async createdUser(req, res) {
        const { 
            username, 
            password, 
            name, 
            description, 
            site 
        } = req.body

        try {
            const userAlredyExists = await User.findOne({
                username
            })
            if (userAlredyExists) return res.status(400).send({ message: "User already exists. Try a different one" })
            
            //const hashedUsername = await bcrypt.hash(username, 10)
            //const hashedPassword = await bcrypt.hash(password, 12)
            const createdUser = await User.create({
                username,//: hashedUsername,
                password,//: hashedPassword,
                name,
                description,
                site
            })
            return res.status(200).send({
                message: 'User created successfully',
                data: createdUser
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async listUser(req,res) {
        try {
            const allUsers = await User.find()

            return res.status(200).send({
                message: "All users found",
                data: allUsers
                })
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}