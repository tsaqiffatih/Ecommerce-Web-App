const router = require('express').Router()

router.use("/credentials", require('./credential/credentialRouter'))

router.use("/products", require('./product/productRouter'))

router.use("/orders", require('./order/orderRouter'))
router.get("/oauth/redirect", )

router.get('/', (req, res) => {
    res.send('Hello sampe!')
  })


module.exports = router;