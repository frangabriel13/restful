const { Router } = require('express');
const { Order } = require('../db.js');
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController.js');

const router = Router();

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);


module.exports = router;