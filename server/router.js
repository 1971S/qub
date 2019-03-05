const router = require('express').Router();
const controller = require('./controller');

router.get('/events', controller.getAll);

router.post('/events', controller.postOne);

module.exports = router;