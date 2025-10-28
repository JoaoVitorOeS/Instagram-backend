const { Router } = require('express')
const UserController = require('../Controllers/UserController')
const LoginController = require('../Controllers/LoginController')
const PostController = require('../Controllers/PostController')
const ProfileController = require('../Controllers/ProfileController')
const LikeController = require('../Controllers/LikeController')

const router = Router()

//User
router.post('/users', UserController.createdUser)
router.get('/users', UserController.listUser)

//login
router.post('/login', LoginController.login)

//post
router.post('/posts', PostController.createPost)
router.get('/posts', PostController.listAllPosts)
router.delete('/posts/:post_id', PostController.deletePost)
router.put('/posts/:post_id', PostController.editPost)

// Visualizar perfil de um usuário
router.get('/users/:user_id', ProfileController.getProfile)

//like em foto
router.post('/post/:post_id/likes', LikeController.likePost)
router.post('/post/:post_id/dislike', LikeController.dislikePost)


module.exports = router
