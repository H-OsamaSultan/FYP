const { PythonShell } = require('python-shell');
const catchAsync = require('../utils/catchAsync');

exports.getRecommendations = catchAsync(async (req, res, next) => {
  PythonShell.run(
    'D:/University/8th_samester/Capstone/FYP till 6-06-22(completed)/public/py/movie_recommender.py',
    { args: [req.params.query] },
    (err, resp) => {
      if (resp) {
        res.status(201).json({
          status: 'success',
          data: {
            data: resp
          }
        });
      }
      if (err) {
        res.status(404).json({
          status: 'error'
        });
      }
    }
  );
});
