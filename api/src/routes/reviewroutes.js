const { Router } = require('express');
const { addReview, updateReview } = require('../controllers/reviewController');

const router = Router();

//Add Review to Product

router.put('/', addReview);

//Update Review
router.put('/:reviewId/updateReview', updateReview);

module.exports = router;
