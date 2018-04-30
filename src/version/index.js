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
                    values:[{time: moment(), object: req.body[keys[0]]}]
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

exports.find = (req,res,next) =>{
    let now = req.query.timestamp || moment().unix();
    logger.info(`Finding the key ${req.params.mykey} at ${now} | ${moment.unix(now)}`);

    Version.findByTimeKey(now,req.params.mykey)
           .then(version => {
               if(version.length <=0) //no version found
                return res.status(404).json({message:`No version associated with this key ${req.params.mykey}`})

               res.status(200).json({
                    value: version[0].values.object
               })
           })
           .catch(err => {
               logger.error(err);
               throw err;
           })
}