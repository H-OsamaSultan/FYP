const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.home);
router.get('/movie/:id', authController.isLoggedIn, viewsController.getMovie);
router.get('/request-password-reset', viewsController.getPasswordResetEmail);

router.get(
  '/watched',
  authController.protect,
  viewsController.getWatchedMovies
);

router.get(
  '/watchlist',
  authController.protect,
  viewsController.getWatchlistMovies
);
router.get('/films', authController.isLoggedIn, viewsController.getMovieFilter);
router.get(
  '/recommendations',
  authController.isLoggedIn,
  viewsController.getRecommendations
);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
