const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/',require('./users'))


console.log('hii jorda')
module.exports = router;