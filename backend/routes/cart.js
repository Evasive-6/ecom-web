const {addToCart, getCartItems,removeFromCart,updateQuantity, getCartById} = require('../controllers/cartController')
const router = require('express').Router()

router.post('/add', addToCart)
// router.post('/total', updateTotal)
// router.post('/quantity', updateQuantity)
router.delete('/delete/:id', removeFromCart)
router.get('/', getCartItems)
router.post('/update', updateQuantity)
router.get('/:id', getCartById)

module.exports = router