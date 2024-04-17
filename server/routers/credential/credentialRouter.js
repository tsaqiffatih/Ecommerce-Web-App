const router = require ('express').Router()
const userController = require('../../controllers/user.controller')

// localhost:3000/credentials/

router.post('/login', userController.loginUser)
router.post('/register', userController.registerUser)
router.post('/google-login', userController.loginUserWithGoogle)

router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


// router.get('/', (req, res) => {
//     res.send('Hello credential!')
//   })

module.exports = router;