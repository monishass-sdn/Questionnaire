var express = require('express') 
var router = express.Router() 
var questionForm = require('./questions')
var questionBlock = require('./questionBlocks')

router.use('/questionBlock', questionBlock)
router.use('/question', questionForm)

module.exports = router


