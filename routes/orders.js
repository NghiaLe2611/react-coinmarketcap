const router = require('express').Router();
const ordersController = require('../app/controllers/OrdersController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.verifyUserToken, ordersController.getOrders);
router.get('/search', authMiddleware.verifyUserToken, ordersController.searchOrders);
router.get('/tracking/:orderId', ordersController.trackingOrder);
router.get('/:orderId', authMiddleware.verifyUserToken, ordersController.getOrderDetail);
router.post('/', ordersController.submitOrder);

module.exports = router;