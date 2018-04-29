const should = require('chai').should();
const assert = require('chai').assert;
const Version = require('../../src/version/schema');
const moment = require('moment');

require('../../src/config/');
require('../../src/config/database');

process.env.NODE_ENV = 'dev_sit';

describe('Insert and Find Latest',() => {
    before(done => {
        Version.deleteAll()
               .then(()=> {
                   done();
               })
               .catch(() =>{
                   done();
               })
    })
    beforeEach(done => {
        let v1 = new Version({
            key: 'key0001',
            values:[
                {time:moment.unix(1525131840), object:'test object 001'},
                {time:moment.unix(1525131900), object:'test object 002'},
                {time:moment.unix(1525131960), object:'test object 003'},
                {time:moment.unix(1525132200), object:'test object 004'}
            ]
        })

        v1.save()
          .then(v=>{
              done();
          })
          .catch(err => {
              done(err);
          })
    })

    describe('Find latest version',()=>{
        it('it should return latest version with time 23:46:00 and test object 003',done => {
            Version.findByTimeKey(1525132080,'key0001')
                   .then(version =>{
                        assert.isNotNull(version,'Version should not be null');

                        version.should.be.a('array');
                        version.length.should.be.equal(1); //should only return 1 record which is latest
                        version[0].key.should.be.equal('key0001');
                        version[0].values.object.should.be.equal('test object 003');
                        done();
                   })
                   .catch(err => {
                       done(err);
                   })
        })
    })
})