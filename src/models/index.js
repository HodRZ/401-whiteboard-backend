'use strict'
const { sequelizeOption, DATABASE_URL } = require('./../config')
const { Sequelize, DataTypes } = require('sequelize');
const { post } = require('./post.model');
const { comment } = require('./comment.model');
const { postCommentRoutes } = require('../api/collection/postComment.collection');

const sequelize = new Sequelize(DATABASE_URL, sequelizeOption)
const postModel = post(sequelize, DataTypes)
const commentModel = comment(sequelize, DataTypes)

postModel.hasMany(commentModel, { as: 'comments' })
commentModel.belongsTo(postModel, { as: 'post' })

const postCollection = new postCommentRoutes(postModel)
const commentCollection = new postCommentRoutes(commentModel)

module.exports = {
    sequelize,
    Post: postCollection,
    Cmnt: commentCollection,
    commentModel: commentModel
}