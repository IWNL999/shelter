const Router = require("express")
const professionController = require("../controllers/professionController")
const router = new Router()

router.post('/', professionController.create);

module.exports = router;