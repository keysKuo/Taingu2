const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const upload = require('../middlewares/multer');
const checkAdmin = require('../middlewares/validator');

router.get('/register', UsersController.getRegister);
router.get('/login', UsersController.getLogin);
router.get('/logout', UsersController.getLogout);
router.get('/change-password', UsersController.getchangePassword);
router.get('/change-information', UsersController.getchangeInformation);
router.get('/add-product', checkAdmin, UsersController.getaddProduct);
router.get('/update-product/:id', checkAdmin, UsersController.getUpdateProduct);

router.post('/register', UsersController.postRegister);
router.post('/login', UsersController.postLogin);
router.post('/change-password', UsersController.postchangePassword);
router.post('/change-information', UsersController.postchangeInformation);
router.post('/add-product', checkAdmin, upload.array('product-image', 12), UsersController.postCreateProduct);
router.post('/update-product', checkAdmin, upload.array('product-image', 12), UsersController.postUpdateProduct);

// router.post('/add-product/count', (req, res) => {
//     console.log('pass')
//     Products.findOne()
//         .sort({ createdAt: -1 })
//         .then(product => {
//             if (product) {
//                 return res.send(product.pid)
//             }
//         })

// })


module.exports = router;