const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    movieID: {
      type: String,
      required: [true, 'ID cannot be empty!']
    },
    watched: {
      type: Boolean
    },
    watchlist: {
      type: Boolean
    },
    liked: {
      type: Boolean
    },
    rating: {
      type: Number
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Movie must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual populate
movieSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'movie',
  localField: '_id'
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
