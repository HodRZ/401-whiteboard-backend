'use strict'
const { LOCALDB_URL } = require('./../config')
const { Sequelize, DataTypes } = require('sequelize');
const { Post } = require('./post.model');


const sequelize = new Sequelize(LOCALDB_URL)

module.exports = {
    sequelize,
    Post: Post(sequelize, DataTypes)
}