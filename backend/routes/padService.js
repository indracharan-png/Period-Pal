const express = require('express');

const router = express.Router();

const {
    getPadServices,
    addPadService,
    deletePadService
} = require('../controllers/padServiceController')

// retrieve a list of all pad service records
router.get('/', getPadServices);

// create a new pad service record for a user
router.post('/', addPadService);

// delete the pad service with the specified id (the id will be the email of the user)
router.delete('/:email', deletePadService);

module.exports = router;