const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setMovieUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user'),
    reviewController.updateReview //useless, this was for handlerfactory update review
  )
  .delete(authController.restrictTo('user'), reviewController.deleteReview);

router.route('/checkreview/:id').get(reviewController.checkReviewExists);
router.route('/updatereview/:id').patch(reviewController.updateReview);
module.exports = router;
