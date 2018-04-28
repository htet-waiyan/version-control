const express = require('express');
const router = express.Router();

router.get('/echo',(req,res,next) => {
    logger.info('Returning echo');
    res.status(200).json({status: 'success',message: 'Hello from Version Control'})
})

module.exports = router;