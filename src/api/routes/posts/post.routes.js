'use strict'
const { express } = require('../../../config');
const { handleNotFound } = require('../../error/400');
const { handleServerError } = require('../../error/500');
const { validateToken, validateRefreshToken, isAuthorized } = require('../../middlewares/auth');
const { getPost, createPost, getPostById, deletePost, updatePost, populate } = require('./post.handlers')
const router = express.Router()



router.get('/post', getPost);
router.get('/post/:id', getPostById)
router.get('/postAll', populate)
router.use(handleNotFound)
router.post('/post', validateToken, createPost)
router.delete('/post/:id',
    validateToken,
    isAuthorized,
    deletePost
)
router.put('/post/:id', validateToken, isAuthorized, updatePost)
router.use(handleServerError)

module.exports = router