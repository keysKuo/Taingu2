const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/ProductsController');

router.get('/delete/:id', ProductsController.getDeleteProduct);
router.get('/getAll', ProductsController.getCartOfCustomer);
router.get('/:slug', ProductsController.getproDetail);


module.exports = router;