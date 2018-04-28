const mongoose = require('mongoose');
const moment = require('moment');

const VersionSchema = new mongoose.Schema({
    key: {type : String, required: 'Key is required', unique: true},
    values: [{
        time: {type: Date, default: Date.now, unique: true},
        object: { type:String, required: 'Object value is required'}
    }]
})

VersionSchema.static('findByKey',function(key){
    return this.findOne({key,}).exec();
})

VersionSchema.static('deleteAll',function(){
    return this.remove({}).exec();
})

VersionSchema.static('findAndUpdate', function(key,timestamp,value){
    return this.findOneAndUpdate(
        {key,}, // find by key
        {
           $push:{time: timestamp, object: value}
        },{upsert: true}).exec();
})

module.exports = mongoose.model('Version',VersionSchema);