const { Router } = require('express');
const userRoute = require('./userRoute');
const serviceRoute = require('./serviceRoute');
const emailRoute = require('./emailRoute');
const orderRoute = require('./orderRoute');
const funeralHomeRoute = require('./funeralHomeRoute');

const router = Router();

router.use('/users', userRoute);
router.use('/services', serviceRoute);
router.use('/emails', emailRoute);
router.use('/orders', orderRoute);
router.use('/funeral-homes', funeralHomeRoute);


module.exports = router;