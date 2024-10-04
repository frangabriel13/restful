const { Router } = require('express');
const { Order } = require('../db.js');
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder, createOrdersFromExcel, exportOrdersToExcel } = require('../controllers/orderController.js');
const upload = require('../utils/multer.js');

const router = Router();

router.get('/', getOrders);
router.get('/export-excel', exportOrdersToExcel);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.post('/excel', upload.single('file'), createOrdersFromExcel);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);


module.exports = router;