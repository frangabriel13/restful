const { Router } = require('express');
const userRoute = require('./userRoute');
const serviceRoute = require('./serviceRoute');
const emailRoute = require('./emailRoute');

const router = Router();

router.use('/users', userRoute);
router.use('/services', serviceRoute);
router.use('/emails', emailRoute);


module.exports = router;