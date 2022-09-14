

const mongoose = require('mongoose')

const asyncHandler = require('express-async-handler');
const  Goal   =  require('../models/goalModel');

// @desc Get all goals
// @route GET/api/goals
// @access private
const getGoals = asyncHandler ( async ( req, res )=>{
    
    const goals = await Goal.find()
    if(!goals){
        res.status(400).send("goals not found")
    }

    res.status(200).json(goals);
})

// @desc Get goalById
// @route GET/api/goals/:id
// @access private
const getGoalById = asyncHandler( async (req, res)=>{
    const goal = await Goal.findById(req.params.id);
    console.log(req.params.id)
    if(!goal){
        res.status(404).send(`goal with id:${req.params.id} not found`);
    }
   
    
})

// @desc Set goal
// @route POST/api/goals
// @access private
const createGoal = asyncHandler( async (req, res)=>{
    const { text } = req.body
    if(!text){
        res.status(400).send({ message: 'please enter a text value' });
    }
    
    const oldGoal = await Goal.findOne({ text })
    if(oldGoal){
        res.status(400).send({ message: 'Goal already exists' });
        return;

    }
    const goal = await Goal.create({ text: text})
    res.status(200).send(goal)
    
})
// @desc Update goal
// @route PUT/api/goals/:id
// @access private
const updateGoal = asyncHandler( async (req, res)=>{
    const goal = await Goal.findById(req.params.id);
    if(!goal) {
        res.status(404)
        throw new Error('goal not found');
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new : true})
    res.status(200).json( updatedGoal );
    
})
// @desc Delete goal
// @route DELETE/api/goals/:id
// @access private
const deleteGoal =  asyncHandler( async (req, res)=>{
    const goal = await Goal.findById(req.params.id);
    if(!goal) {
        res.status(404)
        throw new Error( 'goal was not found' );
    }
    goal.remove()
    res.status(200).send( `goal with id ${req.params.id} was removed successfully` );
    

})

module.exports = {
    getGoals,
    getGoalById,
    createGoal,
    updateGoal,
    deleteGoal
}