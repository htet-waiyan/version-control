const mongoose = require('mongoose');
const moment = require('moment');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const VersionSchema = new mongoose.Schema({
    key: {type : String, required: 'Key is required', unique: true},
    values: [{
        time: {type: Date, default: moment(), unique: true},
        object: { type:String, required: 'Object value is required'}
    }]
})

VersionSchema.plugin(mongooseUniqueValidator,{
    type:'version-unique-validator',
    message: '{PATH} {VALUE} already exists'
})

VersionSchema.static('findByTimeKey',function(timestamp,key){
    return this.aggregate([
        { // split documents into the size of values arry
            $unwind:'$values'
        },
        {
            $match:{ //search by key and timestamp
                $and:[
                    {key,},
                    {'values.time':{$lte:moment.unix(timestamp).toDate()}}
                ]
            }
        },
        { // sort by values timestamp by decending
            $sort:{'values.time':-1}
        },
        { // limit to 1
            $limit: 1
        }
    ])
})

VersionSchema.static('findByKey',function(key){
    return this.findOne({key,}).exec();
})

VersionSchema.static('deleteAll',function(){
    return this.remove({}).exec();
})

VersionSchema.static('findAndUpdate', function(key,value){
    return this.findOneAndUpdate(
        {key,}, // find by key
        {
           $addToSet:{
               values:{'time': moment(), 'object': value}
           } 
        },
        {
            new:true
        }).exec();
})

module.exports = mongoose.model('Version',VersionSchema);