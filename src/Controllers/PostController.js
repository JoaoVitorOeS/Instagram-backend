const Post = require('../Models/Post')
const User = require('../Models/User')

module.exports = {
    async createPost(req,res) {

        const { picture, description } = req.body
        const { user } = req.headers

        try {
            const userExists = await User.findById(user)

            if (!userExists) {
                return res.status(400).send({ message: "User does not exist" })
            }

            const newPost = await Post.create({
                picture,
                description,
                user: userExists._id
            })

            return res.status(200).send({
                message: 'Post created successfully',
                data: newPost
            })

        } catch(err) {
            return res.status(400).send(err)
        }
        
    },

    async listAllPosts(req,res) {
        
        try {
            const allPost = await Post.find().populate('user')
    

            return res.status(200).send({
                message: 'All Posts',
                data: allPost
            })

        } catch(err) {
            return res.status(400).send(err)
        }
    
            

    },

    async deletePost(req, res) {
        const { post_id } = req.params
        const { user_id } = req.headers

        try {
            if (!post_id || !user_id) {
                return res.status(400).send({ message: 'Missing data' })
            }

            const post = await Post.findById(post_id)

            if (!post) {
                return res.status(404).send({ message: 'Post does not exist' })
            }

            if (!post.user.equals(user_id)) {
                return res.status(403).send({ message: 'Operation not allowed' })
            }

            await post.deleteOne()

            return res.status(200).send({
                message: 'Deleted Successfully'
            })

        } catch (err) {
            console.error(err)
            return res.status(500).send({
                message: 'Error deleting post'
            })
        }
    },

    async editPost(req, res) {
        const { post_id } = req.params
        const { description } = req.body
        const { user_id } = req.headers

        try {
            const post = await Post.findById(post_id)

            if (!post) {
                return res.status(404).send({ message: 'Post does not exist' })
            }

            if (String(post.user) !== user_id) {
                return res.status(403).send({ message: 'Operation not allowed' })
            }

            post.description = description
            await post.save()

            return res.status(200).send({
                message: 'Updated Successfully',
                data: post
            })

        } catch (err) {
            return res.status(500).send(err)
        }
    }
}