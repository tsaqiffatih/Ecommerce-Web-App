const router = require ('express').Router()
const userController = require('../../controllers/user.controller')

// localhost:3000/credentials/

router.post('/login', userController.loginUser)
router.post('/register', userController.registerUser)
router.post('/google-login', userController.loginUserWithGoogle)
router.get('/auth/github', userController.githubLogin);
router.get('/github-callback', userController.githubLoginCallback);



module.exports = router;