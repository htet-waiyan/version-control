const Version = require('../../src/version/schema');
const should = require('chai').should();
const assert = require('chai').assert;
const moment = require('moment');

require('../../src/config/');
require('../../src/config/database');

process.env.NODE_ENV = 'dev_sit';

describe('Version Multiple Versions',() =>{
    before(done =>{
        Version.deleteAll()
               .then(()=> {
                   done();
               })
               .catch(() =>{
                   done();
               })
    })
    beforeEach(done =>{
        let version = new Version({
            key:'001',
            values:[{time: moment().unix(), object: 'test object 001'}]
        })

        version.save()
            .then(version => {
                done();
            })
            .catch(err => {
                done(err);
            })
    })

    describe('add new version',()=>{
        it('it should insert new version with test object 002', done =>{
            Version.findAndUpdate('001','test object 002')
                   .then(version => {
                        version.should.be.a('object');
                        version.key.should.be.equal('001');
                        version.values.length.should.be.equal(2);
                        version.values[1].object.should.be.equal('test object 002');
                        done();
                   })
                   .catch(err => {
                       done(err);
                   })
        })
    })
})