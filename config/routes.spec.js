const db = require('../database/dbConfig.js');

const Users = require('./models.js');

describe('users model', () => {
    beforeAll(async () => {
        await db('users').truncate()
        // forgot to add () to this line of code, mistakenly spent a bunch of time trying to find 
    });

    describe('add()', () => {
        it('should add user into db', async () => {
            await Users.add({ username: "Bill", password: "pass" });

            const users = await db('users');
            expect(users).toHaveLength(1);
        });
    });

});