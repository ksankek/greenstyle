const uuid = require('uuid');
const path = require('path');
const {Article} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");

class ArticleController{

    async create(req, res, next){
        try{
            const {name, description, sectionId} = req.body;
            const article = await Article.create({name, description, sectionId});

            return res.json(article);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async addPhoto(req, res, next){
        try{
            const id = req.params.articleId;
            const {img} = req.files;

            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const article = await Article.update({
                files: Sequelize.fn('array_append', Sequelize.col('files'), fileName)
            }, {where: {id:id}}
            ).then(() => {
                res.status(200).json({msg:"Фото добавлено"});
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({msg:"Ошибка"});
            });

            return res.json(article);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deletePhoto(req, res, next){
        try{
            const {articleId, fileName} = req.params;

            let article = await Article.findOne({where: {id:articleId}})
            const files = article.dataValues.files.filter(file => {
                return file !== fileName
            })

            article = await Article.update({
                    files: files
                }, {where: {id:articleId}}
            ).then(() => {
                return res.status(200).json({msg:"Фото удалено"});
            })
            .catch(err => {
                return res.status(500).json({msg:"Ошибка"});
            });

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next){
        let articles;

        try{
            articles = await Article.findAll();

            return res.json(articles);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getArticleById(req, res, next){
        let articleId = req.params.articleId;

        try{
            const article = await Article.findOne({where: {id:articleId}})

            return res.json(article);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async edit(req, res, next){
        const id = req.params.articleId;
        const {name, description, sectionId} = req.body;

        Article.update({
                name: `${name}`,
                description: `${description}`,
                sectionIdId: `${sectionId}`
            },
            { where: {id}})
            .then(() => {
                res.status(200).json({msg:"Статья обновлена"});
            })
            .catch(err => {
                res.status(500).json({msg:"Ошибка"});
            })
    }

    async delete(req, res, next){
        const id = req.params.articleId;

        Article.destroy({
            where: {id}
        })
            .then(() => {
                res.status(200).json({msg:"Статья удалена"});
            })
            .catch(err => {
                res.status(500).json({msg:"Ошибка"});
            })
    }

}

module.exports = new ArticleController();