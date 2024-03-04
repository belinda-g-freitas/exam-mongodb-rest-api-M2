const router = require('express').Router();
const { query, param, body } = require('express-validator')
const controller = require('../controllers').author;

// 
router.route('/create').post(
  body('name').isString().escape().trim().isLength({ min: 3 }),
  body('nationality').isString().escape().trim().isLength({ min: 2 }),
  body('birthday').isDate({ format: 'DD/MM/YYYY' }),
  body('books').isArray(),
  controller.create,
);
// 
router.route('update').put(
  body('id').isMongoId(),
  body('name').optional().isString().escape().trim().isLength({ min: 3 }),
  body('nationality').optional().isString().escape().trim().isLength({ min: 2 }),
  body('birthday').optional().isDate({ format: 'DD/MM/YYYY' }),
  body('books').optional().isArray(),
  controller.update,
)
// 
router.route('/delete').delete(
  query('id').isMongoId(),
  controller.delete,
)


module.exports = router