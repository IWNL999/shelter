const Router = require("express");
const hobbyController = require("../controllers/hobbyController");
const router = new Router();

router.post('/', hobbyController.create);

module.exports = router;