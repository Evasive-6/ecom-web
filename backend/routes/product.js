const router = require('express').Router()
const {createProduct, getProductById, getAllProducts, updateProduct, deleteProduct,myProducts} = require('../controllers/productController')
const {upload} = require('../config/multer')

router.post('/', upload.array('images', 10), createProduct)
router.get('/', getAllProducts)
router.get('/my-products', myProducts)
router.get('/:id', getProductById)
router.put('/:id',upload.array('images', 10), updateProduct )
router.delete('/:id', deleteProduct)


module.exports = router