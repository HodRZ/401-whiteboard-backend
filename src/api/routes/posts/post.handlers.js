'use strict'

const { Post } = require('../../../models')

async function getPost(req, res) {
    let post = await Post.findAll();
    res.status(200).send({
        post
    })
};

async function createPost(req, res) {
    const newPost = req.body;
    const post = await Post.create(newPost);
    res.status(201).send(post);
};

async function getPostById(req, res) {
    const id = req.params.id;
    const post = await Post.findOne({
        where: { id: id }
    });
    res.status(200).json(post)
};

async function deletePost(req, res) {
    const id = req.params.id;
    let deletedPost = await Post.destroy({
        where: { id: id },
        returning: true
    });
    res.status(204).json({ deletedPost });
};

async function updatePost(req, res) {
    const id = req.params.id;
    const post = req.body;
    const updatedPost = await Post.update(post, {
        where: { id: id },
        returning: true,
        plain: true
    });
    res.status(200).json(updatedPost);
}

module.exports = {
    getPost,
    createPost,
    getPostById,
    deletePost,
    updatePost
}