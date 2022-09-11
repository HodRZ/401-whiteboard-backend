'use strict'
const supertest = require('supertest');
const { app } = require('../src/server')
const request = supertest(app)

describe('Server is a live', () => {
    test('get to "/"', async () => {
        const res = await request.get('/')
        expect(res.status).toEqual(200);
        expect(res.text).toEqual('Hey Mom!')
    });
});

describe('/Post Route', () => {
    it('Get, should get all data fro db', async () => {
        const res = await request.get('/post');
        expect(res.status).toEqual(200);
        expect(res.body.post[0].title).toEqual('test from postman');
    });
    it('Get/:id, should get a route by id', async () => {
        const newPost = {
            "title": "test from server.test",
            "content": "this is a test from jest",
            "image": "jest testing"
        }
        const addedPost = await request.post('/post').send(newPost);
        const { id, img, title } = addedPost.body
        const res = await request.get(`/post/${id}`);
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(title);
    });
    it('Post, should a new post to database', async () => {
        const newPost = {
            "title": "test from server.test",
            "content": "this is a test from jest",
            "image": "jest testing"
        }
        const addedPost = await request.post('/post').send(newPost);
        expect(addedPost.status).toEqual(201);
        expect(addedPost.body.title).toEqual('test from server.test')
    });
    it('Put, should update a post', async () => {
        const newPost = {
            "title": "test from server.test",
            "content": "this is a test from jest",
            "image": "jest testing"
        }
        const editedPost = {
            "title": "edited from server.test",
            "content": "edited from jest"
        }
        const addedPost = await request.post('/post').send(newPost);
        const { id, img } = addedPost.body
        const updated = await request.put(`/post/${id}`).send(editedPost)
        expect(img).toEqual(updated.image)
    });

    it('Delete, should delete a post', async () => {
        const newPost = {
            "title": "test from server.test",
            "content": "this is a test from jest",
            "image": "jest testing"
        }
        const addedPost = await request.post('/post').send(newPost);
        const { id } = addedPost.body
        const res = await request.delete(`/post/${id}`);
        expect(res.status).toEqual(204);
    });
});