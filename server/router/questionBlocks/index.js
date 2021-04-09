var express = require('express');
const Router = require('../../controllers/QuestionBlock');
var router = express.Router()
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
 

router.get('/', Router.getAll);

router.get('/:id', Router.getById);

router.post('/',upload.none(), Router.createQBlock);

module.exports = router

 

