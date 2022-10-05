const express = require('express');
const recommendationController = require('../controllers/recommendationController');

const router = express.Router({ mergeParams: true });

// router.use(authController.protect);

router.route('/:query').get(recommendationController.getRecommendations);

module.exports = router;
