'use strict'
require('dotenv').config()
const express = require('express')


const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}

module.exports = {
    PORT: process.env.PORT,
    LOCALDB_URL: process.env.LOCALDB_URL,
    REMOTEDB_URL: process.env.REMOTEDB_URL,
    sequelizeOption,
    express
}