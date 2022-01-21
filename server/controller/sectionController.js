const {Section} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController{

    async create(req, res, next){
        try {
            const {name} = req.body;
            const section = await Section.create({name});
            return res.json(section);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next){
        try {
            const sections = await Section.findAll();
            return res.json(sections);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

}

module.exports = new TypeController();