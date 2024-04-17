const router = require ('express').Router()
const productController = require('../../controllers/product.controller');
const {authentication} = require('../../middleware/auth') 

// Routes for CRUD operations on products
router.get('/getAll', productController.getAllProducts); //V
router.get('/getOne/:productId', productController.getProductById); //V

router.use(authentication)
router.post('/create', productController.createProduct); //V
router.put('/update/:productId', productController.updateProductById);
router.delete('/destroy/:productId', productController.deleteProductById);

module.exports = router;


// router.get('/', (req, res) => {
//     res.send('Hello product!')
//   })

module.exports = router;