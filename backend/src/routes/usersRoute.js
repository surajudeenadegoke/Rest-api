const express = require('express');
const router = express.Router();
const { getGoals, getGoalById, createGoal, updateGoal, deleteGoal }  = require('../controllers/goalController')



router.route('/').get(getGoals).post(createGoal)
router.route('/:id').get(getGoalById).put(updateGoal).delete(deleteGoal)
// router.get('/', getGoals);
// router.get('/:id', getGoalById);
// router.post('/', createGoal)
// router.put('/:id', updateGoal);

// router.delete('/:id', deleteGoal)




module.exports = router;