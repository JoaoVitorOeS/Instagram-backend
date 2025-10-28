const Post = require('../Models/Post')

module.exports = {
    async likePost(req,res) {
        const { post_id } = req.params
        const { user_id } = req.headers

        try {
            const likedPosts = await Post.findById(post_id)
            if (!likedPosts) return res.status(400).send('Post does not exist')
            
            if (likedPosts.likes.includes(user_id)) {
                return res.status(400).send('post already like')

            }

            likedPosts.likes.push(user_id)

            //likedPosts.likes.pull(user_id)

            await likedPosts.save()

            return res.status(200).send({
                message: 'Post liked',
                likedPosts
            }
            )
        } catch(err) {
            return res.status(400).send(err)
        }
    },
    async dislikePost(req,res) {
        const { post_id } = req.params
        const { user_id } = req.headers

        try {
            const dislikedPost = await Post.findById(post_id)
            if (!dislikedPost) return res.status(400).send('Post does not exist')
            
            if (!dislikedPost.likes.includes(user_id)) return res.status(400).send('Post not liked yet')

            dislikedPost.likes.pull(user_id)
            await dislikedPost.save()

            return res.status(200).send({
                message: 'Post unliked',
                dislikedPost
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}