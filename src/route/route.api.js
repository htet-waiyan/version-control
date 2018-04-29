const express = require('express');
const router = express.Router();
const versionController = require('../version/');

router.get('/echo',(req,res,next) => {
    logger.info('Returning echo');
    res.status(200).json({status: 'success',message: 'Hello from Version Control'})
})

router.post('/object',versionController.create);
router.get('/object/:mykey',versionController.find);

module.exports = router;