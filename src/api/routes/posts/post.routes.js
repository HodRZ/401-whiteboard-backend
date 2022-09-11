'use strict'
const { express } = require('../../../config')
const { getPost, createPost, getPostById, deletePost, updatePost } = require('./post.handlers')
const route = express.Router()



route.get('/post', getPost);
route.get('/post/:id', getPostById)
route.post('/post', createPost)
route.delete('/post/:id', deletePost)
route.put('/post/:id', updatePost)

module.exports = route