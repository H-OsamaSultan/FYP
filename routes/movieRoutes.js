const express = require('express');
const movieController = require('./../controllers/movieController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:movieId/reviews', reviewRouter);
router.use(authController.protect);

router
  .route('/')
  .get(movieController.getAllMovies)
  .post(
    authController.restrictTo('user'),
    movieController.setUserIds,
    movieController.createMovie
  );

router
  .route('/:id')
  .get(movieController.getMovie)
  .patch(
    authController.restrictTo('user'),
    authController.isLoggedIn,
    movieController.updateMovie
  )
  .delete(authController.restrictTo('user'), movieController.deleteMovie);

router
  .route('/:id/:state/:action')
  .patch(
    authController.restrictTo('user'),
    authController.isLoggedIn,
    movieController.updateMovie
  );
router.route('/checkmovie/:id').get(movieController.checkMovieExists);

module.exports = router;
