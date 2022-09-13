'use strict'

const { Post, commentModel } = require('../../../models')

async function getPost(req, res, next) {
    try {
        const post = await Post.get();
        res.status(200).send({
            post
        })
    } catch (e) {
        next(e)
    }
};

async function createPost(req, res, next) {
    const newPost = req.body;
    try {
        const post = await Post.create(newPost);
        res.status(201).send(post);
    } catch (err) { next(err) }
};

async function getPostById(req, res, next) {
    const id = req.params.id;
    try {
        const post = await Post.get(id);
        res.status(200).json(post)
    } catch (err) { next(err) }
};

async function deletePost(req, res, next) {
    const id = req.params.id;
    try {
        let deletedPost = await Post.delete(id)
        res.status(204).json({ deletedPost });
    } catch (err) {
        next(err)
    }
};

async function updatePost(req, res, next) {
    const id = req.params.id;
    const post = req.body;
    try {
        const updatedPost = await Post.update(id, post)
        res.status(200).json(updatedPost);
    } catch (err) { next(err) }
}

async function populate(req, res, next) {
    const { filter } = req.query
    try {
        const populatedPosts = await Post.populate(filter)
        res.status(200).json(populatedPosts);
    } catch (err) { next(err) }

}

module.exports = {
    getPost,
    createPost,
    getPostById,
    deletePost,
    updatePost,
    populate
}