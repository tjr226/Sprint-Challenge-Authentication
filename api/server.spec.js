const request = require('supertest');
const server = require('./server.js');

describe('GET /', () => {
    it('API returning 200', () => {
        return request(server)
        .get('/')
        .expect(200)
    });
});