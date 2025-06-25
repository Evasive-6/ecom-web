const {makePayment, verifyPayment} = require('../controllers/paymentController')
const router = require('express').Router()

router.post('/checkout', makePayment)
router.post('/verify', makePayment)

module.exports = router