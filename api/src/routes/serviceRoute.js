const { Router } = require('express');
const { Service } = require('../db.js');
const { getServices, getServiceId, createService, updateService, deleteService } = require('../controllers/serviceController.js');

const router = Router();

// router.get('/', getServices);
// router.get('/:id', getServiceId);
// router.post('/', createService);
// router.put('/:id', updateService);
// router.delete('/:id', deleteService);
router.get('/:lang', getServices);
router.get('/:lang/:id', getServiceId);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);


module.exports = router;