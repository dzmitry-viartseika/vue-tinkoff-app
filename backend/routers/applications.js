const express = require('express');
const ApplicationsController = require('../controllers/applications-controller');
const applications_controller = new ApplicationsController();
const router = new express.Router();

router.get('/getApplications', applications_controller.getApplications);
router.post('/newApplication', applications_controller.newApplication);
router.delete('/deleteApplication', applications_controller.deleteApplication);

module.exports = router;
