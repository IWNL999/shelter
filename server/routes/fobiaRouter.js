const Router = require('express');
const FobiaController = require('../controllers/fobiaController');
const router = new Router();

router.post("/", FobiaController.create);

module.exports = router;