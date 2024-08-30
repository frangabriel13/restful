const { Router } = require('express');
const { getFuneralHomes, getFuneralHomeById, createFuneralHome, updateFuneralHome, deleteFuneralHome } = require('../controllers/funeralHomeController.js');

const router = Router();

router.get('/', getFuneralHomes);
router.get('/:id', getFuneralHomeById);
router.post('/', createFuneralHome);
router.put('/:id', updateFuneralHome);
router.delete('/:id', deleteFuneralHome);


module.exports = router;