const { Router } = require('express');
const userRoute = require('./userRoute');
const serviceRoute = require('./serviceRoute');
const emailRoute = require('./emailRoute');
const orderRoute = require('./orderRoute');

const router = Router();

router.use('/users', userRoute);
router.use('/services', serviceRoute);
router.use('/emails', emailRoute);
router.use('/orders', orderRoute);


module.exports = router;