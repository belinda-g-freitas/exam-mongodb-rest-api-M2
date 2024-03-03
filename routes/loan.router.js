const router = require('express').Router();
const { query, body } = require('express-validator')
const controller = require('../controllers').loan;

// 
router.route('/create').post(
  body('user').isMongoId(),
  body('book').isMongoId(),
  body('loan_date').isDate({ format: 'DD/MM/YYYY' }),
  body('planned_return_date').isDate({ format: 'DD/MM/YYYY' }),
  controller.create,
);
// 
router.route('/by-user').get(
  query('user').isMongoId(),
  controller.getByUser,
);
// 
router.route('/update-date-and-qty').put(
  body('loan_id').isMongoId(),
  body('effective_return_date').isDate({ format: 'DD/MM/YYYY' }),
  controller.updateDateAndQty,
);

router.route('/update-and-delete').put(
  body('loan_id').isMongoId(),
  body('effective_return_date').isDate({ format: 'DD/MM/YYYY' }),
  controller.updateDateAndDelete,
);


module.exports = router