const {addOrder,getAllOrders,cancelOrder} = require('../controllers/orderController')
const router = require('express').Router()

router.post('/place', addOrder)
router.get('/',getAllOrders)
router.get('/cancel/:id',cancelOrder)

module.exports = router