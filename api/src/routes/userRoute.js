const { Router } = require('express');
const { User } = require('../db.js');

const router = Router();

router.get('/', async (req, res) => {
  res.send('Hello World');
});


module.exports = router;