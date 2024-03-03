const router = require('express').Router();
const { query, param, body } = require('express-validator')
const controller = require('../controllers').book;

// 
router.route('/create').post(
  body('title').isString().escape().trim().isLength({ min: 3 }),
  body('author').isArray().notEmpty(),
  body('description').isString({}).escape().trim(),//.notEmpty(),
  body('genres').isArray().notEmpty(),
  body('publish_year').isInt({ min: 1500, max: new Date(Date.now()).getFullYear(), allow_leading_zeroes: false }),
  body('available_quantity').isInt(false).toInt(),
  controller.create,
);
// router.route('/update').put(
//   body('id').isMongoId(),
//   body('date').isInt({ min: 1500, max: new Date(Date.now()).getFullYear(), allow_leading_zeroes: false }),
//   controller.update,
// )
// 
router.route('/by-genre').get(
  query('genre').isString().escape().trim().notEmpty(),
  controller.getByGenre,
);
// 
router.route('/by-author').get(
  query('author').isMongoId(),//isString().escape().trim().notEmpty(),
  controller.getByAuthor,
);
// 
router.route('/search').get(
  query('search').isString().escape().trim().notEmpty(),
  controller.search,
);
// 
router.route('/delete').delete(
  query('id').isMongoId(),//isString().escape().trim().notEmpty(),
  controller.delete,
)




module.exports = router