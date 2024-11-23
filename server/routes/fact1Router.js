const Router = require('express');
const Fact1Controller = require('../controllers/fact1Controller');
const router = new Router();

router.post('/', Fact1Controller.create);

module.exports = router;
