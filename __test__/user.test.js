'use strict'

const { request } = require("../src/config/test-config")

describe('User', () => {
    describe('User Sign Up', () => {
        it('should create a new accout', async () => {
            const newUser = {
                "name": "hod from jest",
                "email": "hodjest@401.com",
                "birthday": "1990-12-22",
                "password": "verySafePassword",
                "about": "im a super user using a super password from jest"
            }
            const addedUser = await request.post('/user').send(newUser);
            expect(addedUser.status).toEqual(201);
            expect(addedUser.body.name).toEqual("hod from jest")
            const { id } = addedUser.body
            await request.delete(`/user/${id}`)
        });
    });
    describe('User can login', () => {
        it('should login', async () => {
            const newUser = {
                "name": "hod from jest",
                "email": "hodjest@401.com",
                "birthday": "1990-12-22",
                "password": "verySafePassword",
                "about": "im a super user using a super password from jest"
            }
            const addedUser = await request.post('/user').send(newUser);
            const userData = {
                "email": "hodjest@401.com",
                "password": "verySafePassword"
            }
            const loggedIn = await request.post('/signin').send(userData)
            expect(loggedIn.status).toEqual(200)
            expect(loggedIn.body).toEqual('welcome hod from jest')
            const { id } = addedUser.body
            await request.delete(`/user/${id}`)
        });
        it('should not login with wrong crdintials', async () => {
            const newUser = {
                "name": "hod from jest",
                "email": "hodjest@401.com",
                "birthday": "1990-12-22",
                "password": "verySafePassword",
                "about": "im a super user using a super password from jest"
            }
            const addedUser = await request.post('/user').send(newUser);
            const userData = {
                "email": "hodjest@401.com",
                "password": "verySafePasswo"
            }
            const loggedIn = await request.post('/signin').send(userData)
            expect(loggedIn.status).toEqual(403)
            expect(loggedIn.body).toEqual('انقلع')
            const { id } = addedUser.body
            await request.delete(`/user/${id}`)
        });
    });
});