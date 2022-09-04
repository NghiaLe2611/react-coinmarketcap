const router = require('express').Router();
const reviewsController = require('../app/controllers/ReviewsController');

router.get('/', reviewsController.getReviews);
router.post('/submit/:productId', reviewsController.submitReview);

module.exports = router;
