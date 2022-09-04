const router = require('express').Router();
const usersController = require('../app/controllers/UsersController');
const authMiddleware = require('../middleware/auth');

router.post('/account', usersController.submitUserData);
router.get('/account', authMiddleware.verifyUserToken, usersController.getUserData);
router.put('/account', authMiddleware.verifyUserToken, usersController.updateUserData);

router.get('/reviews', authMiddleware.verifyUserToken, usersController.getUserReviews);

router.get('/wishlist', authMiddleware.verifyUserToken, usersController.getWishlist);
router.put('/wishlist/:productId', authMiddleware.verifyUserToken, usersController.addToWishlist);
router.put('/wishlist/delete/:productId', authMiddleware.verifyUserToken, usersController.removeFromWishlist);
router.get('/wishlist/:productId/liked', authMiddleware.verifyUserToken, usersController.checkProductLiked);

router.get('/addresses', authMiddleware.verifyUserToken, usersController.getAddresses);
router.put('/address/:addressId', authMiddleware.verifyUserToken, usersController.updateAddress);

router.get('/recently', authMiddleware.verifyUserToken, usersController.getRecentlyViewedProducts);
router.put('/recently', authMiddleware.verifyUserToken, usersController.addRecentlyViewedProduct);

router.get('/intended_cart', authMiddleware.verifyUserToken, usersController.getIntendedCart);
router.put('/intended_cart', authMiddleware.verifyUserToken, usersController.updateCart);

module.exports = router;