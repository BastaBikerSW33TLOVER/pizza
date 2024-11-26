
const express = require('express')
const {
    createOrder,
    getOrders,
    getOrder,
    deleteOrder,
    updateOrder
} = require('../controllers/orderControllers')
const router = express.Router()

// GET all workouts
router.get('/', getOrders)

// GET a single workout 
router.get('/:id', getOrder)

// POST  a new workout 
router.post('/', createOrder)

// DELETE a workout 
router.delete('/:id',deleteOrder)

// UPDATE a workout
router.patch('/:id', updateOrder)

module.exports = router
