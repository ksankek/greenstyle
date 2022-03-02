const {Favourite_article} = require('../models/models');
const ApiError = require('../error/ApiError');

class FavouriteController{

    async addArticle(req, res, next) {
        try {
            let {favouriteId, articleId} = req.body;

            await Favourite_article.create({favouriteId, articleId});
            return res.status(200).json({msg:"Статья добавлена в закладки"});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async checkOnAdd(req, res, next) {
        try {
            let {favouriteId, articleId} = req.params;

            const favourite = await Favourite_article.findOne({where: {favouriteId, articleId}});

            if (favourite) {
                return res.status(200).json({added: true});
            } else {
                return res.status(200).json({added: false});
            }

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        let favouriteId = req.params.favouriteId;
        let favourite;

        try{
            favourite = await Favourite_article.findAll({where: {favouriteId}})
            return res.json(favourite);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res) {
        const id = req.params.id;

        Favourite_article.destroy({
            where: {id}
        })
        .then(() => {
            res.status(200).json({msg:"Статья удалена из закладок"});
        })
        .catch(err => {
            res.status(500).json({msg:err});
        })
    }

}

module.exports = new FavouriteController();