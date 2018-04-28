module.exports = app => {
    app.use('/', require('./route.api'));

    /**
     * 404 handler middleware
     * Unregistered route will come to here and respond 404
     * IMPORTANT to place this route at the end of all registered routes
     */
    app.use('*',(req,res,next) => {
        res.sendStatus(400);
    })

    /**
     * Fatal Error handler
     */
    app.use((err,req,res,next) =>{
        logger.error('System Error ',err);
        res.sendStatus(500);
    })
}