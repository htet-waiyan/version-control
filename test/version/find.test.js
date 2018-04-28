const should = require('chai').should();
const assert = require('chai').assert;
const Version = require('../../src/version/schema');
const moment = require('moment');

describe('Version find',()=>{
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

    describe('find by key', ()=> {
        it('it should return one version with key 001', done =>{
            Version.findByKey('001')
                   .then(version =>{
                       assert.isNotNull(version,'Version should not be null');
                       version.values.length.should.be.equal(1);
                       version.values[0].object.should.be.equal('test object 001');

                       done();
                   })
                   .catch(err => {
                       done(err);
                   });
        })
    })
})