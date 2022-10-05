const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setMovieUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.movie) req.body.movie = req.params.movieId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.checkReviewExists = catchAsync(async (req, res, next) => {
  //   const filter = {};
  const doc = await Review.findOne({
    user: req.user.id,
    movie: req.params.id
  });

  if (!doc) {
    res.status(200).json({
      status: 'success',
      data: {
        exists: false,
        data: doc
      }
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        exists: true,
        data: doc
      }
    });
  }
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const filter = { user: req.user.id, movie: req.params.id };
  const update = { review: req.body.review };
  const doc = await Review.findOneAndUpdate(filter, update);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
