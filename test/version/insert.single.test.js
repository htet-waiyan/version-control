const Version = require('../../src/version/schema');
const should = require('chai').should();
const assert = require('chai').assert;
const moment = require('moment');

require('../../src/config/');
require('../../src/config/database');

process.env.NODE_ENV = 'dev_sit';

describe('Version creation', () => {
    beforeEach(done => {
        //remove all inserted versions
        Version.deleteAll()
            .then(()=> {
                done();
            })
            .catch(err => {
                done(err);
            })
    })

    describe('insert single record', () => {
        it('should be able to save single new record', done => {
            Version.findByKey('123')
                   .then(version => {
                       assert.isNull(version,'Greate! No version with key 123')
                       let newVersion = new Version({
                           key: '123',
                           values: [{time: moment().unix(), object: 'test object 1'}]
                       })

                       return newVersion.save()
                   })
                   .then(version => {
                        assert.isNotNull(version,'Version should not be null');

                        version.values.should.be.a('array');
                        version.values.length.should.be.equal(1);
                        version.values[0].object.should.be.equal('test object 1');

                        done();
                   })
                   .catch(error => {
                       done(error);
                   })
        })
    })
})