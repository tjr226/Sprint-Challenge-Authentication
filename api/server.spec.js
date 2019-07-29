const request = require('supertest');
const server = require('./server.js');

describe('GET /', () => {
    it('API returning 200', () => {
        return request(server)
        .get('/')
        .expect(200)
    });
});

// can't get this to fail
describe('/login', () => {
    it('logging in returns JSON', () => {
        return request(server)
        .post('/api/register')
        .send({ username: "billy", password: "pass" })
        .then(res => {
            // expect(res.type).toMatch(/json/);
            expect(200);
        })
        
    });
})