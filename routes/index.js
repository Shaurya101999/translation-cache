const express = require('express');
const router = express.Router();
const cache = require('../middleware/cache');

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home)
router.post('/translate', cache.myCache , homeController.translate);
module.exports = router ;
