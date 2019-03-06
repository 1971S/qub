const router = require('express').Router();
const controller = require('./controller');

router.get('/users', controller.getAll);

router.post('/users', controller.postOne);

module.exports = router;
