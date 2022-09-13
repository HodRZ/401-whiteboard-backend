'use strict'


class postCommentRoutes {
    constructor(model) {
        this.model = model;
    }

    async get(id) {
        try {
            if (id) {
                return await this.model.findOne({ where: { id } })
            } else {
                return await this.model.findAll()
            }
        } catch (e) {
            console.error(e)
        }
    }

    async create(data) {
        try {
            return await this.model.create(data)
        } catch (e) {
            console.error(e)
        };
    }
    async update(id, data) {
        try {
            return await this.model.update(data, {
                where: { id },
                returning: true,
                plain: true
            })
        } catch (e) {
            console.error(e)
        };
    }
    async delete(id) {
        try {
            return await this.model.destroy({
                where: { id },
                returning: true
            })
        } catch (e) {
            console.error(e);
        }
    }

    async populate(args) {
        try {
            return await this.model.findAll({ include: [args] })
        } catch (e) {
            console.error(e)
        }
    }
}
module.exports = { postCommentRoutes }