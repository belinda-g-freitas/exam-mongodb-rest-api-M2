const router = require('express').Router();
const { query, param, body } = require('express-validator')
const controller = require('../controllers').author;

// 
router.route('/create').post(
  body('name').isString().escape().trim().isLength({ min: 3 }),
  body('nationality').isString().escape().trim().isLength(),
  body('birthday').isDate({ format: 'DD/MM/YYYY' }),
  body('books').isArray(),
  controller.create,
);
// 
router.route('update').put(
  
  controller.update,
)
// 
router.route('/delete').delete(
  query('id').isString().escape().trim().notEmpty(),
  controller.delete,
)


module.exports = router