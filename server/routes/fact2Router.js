const Router = require('express');
const Fact2Controller = require('../controllers/fact2Controller');
const router = new Router();

router.post('/', Fact2Controller.create);

module.exports = router;
