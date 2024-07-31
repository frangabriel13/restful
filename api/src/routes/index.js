const { Router } = require('express');
const userRoute = require('./userRoute');
const serviceRoute = require('./serviceRoute');

const router = Router();

router.use('/users', userRoute);
router.use('/services', serviceRoute);


module.exports = router;