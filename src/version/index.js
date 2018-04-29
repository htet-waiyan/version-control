const Version = require('./schema');
const moment = require('moment');

exports.create = (req,res,next) => {
    let keys = Object.keys(req.body);
    logger.info(`Key ${keys[0]} Value ${req.body[keys[0]]}`)
    Version.findByKey(keys[0])
           .then(version => {
               if(version) //existing version
                return Version.findAndUpdate(keys[0],req.body[keys[0]])

                //new version
                let v1 = new Version({
                    key: keys[0],
                    values:[{time: moment().unix(), object: req.body.mykey}]
                })

                return v1.save();
           })
           .then(version =>{
               res.status(200).json({
                   key: keys[0],
                   value: version.values[version.values.length-1].object,
                   timestamp: moment(version.values[version.values.length-1].time).format('X')
               })
           })
           .catch(err => {
               logger.error(err);
               throw err;
           })
}