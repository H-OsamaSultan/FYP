const Movie = require('./../models/movieModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
// const catchAsync = require('./../utils/catchAsync');

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllMovies = factory.getAll(Movie);
exports.getMovie = factory.getOne(Movie, { path: 'reviews' });
exports.createMovie = factory.createOne(Movie);
// exports.updateMovie = factory.updateOne(Movie);
exports.deleteMovie = factory.deleteOne(Movie);

exports.updateMovie = catchAsync(async (req, res, next) => {
  const filter = { user: req.user.id, movieID: req.params.id };
  //   console.log(req.params.action);
  //   const action = req.params.action;
  let update;
  if (req.params.action === 'watched') {
    update = { watched: req.params.state };
  } else if (req.params.action === 'liked') {
    update = { liked: req.params.state };
  } else if (req.params.action === 'watchlist') {
    update = { watchlist: req.params.state };
  } else if (req.params.action === 'rating') {
    update = { rating: req.params.state };
  }

  const doc = await Movie.findOneAndUpdate(filter, update);

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

exports.checkMovieExists = catchAsync(async (req, res, next) => {
  //   const filter = {};
  const doc = await Movie.findOne({
    user: req.user.id,
    movieID: req.params.id
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
