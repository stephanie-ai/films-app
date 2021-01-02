const request = require('supertest');
const server = require('../server');

describe('endpoints', function() {
    let api;
    
    before(function() {
        console.log('setup tests');
        // api = server(3000, 'localhost');
    });

    it('responds to /', function testSlash(done) {
        request(api)
        .get('/')
        .expect(200, done);
    });

    it('responds to /restaurants', done => {
        request(api)
        .get('/restaurants')
        .expect(200, done);
    });

    it('404 everything else', done => {
        request(api)
        .get('/error')
        .expect(404, done);
    });
})