const {Favourite_article} = require('../models/models');
const ApiError = require('../error/ApiError');

class FavouriteController{

    async addArticle(req, res, next) {
        try {
            let {favouriteId, articleId} = req.body;

            const favourite = await Favourite_article.create({favouriteId, articleId});
            return res.status(200).json({msg:"Статья добавлена в закладки"});
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

    async delete(req, res, next) {
        const id = req.params.id;

        Favourite_article.destroy({
            where: {id}
        })
        .then(() => {
            res.status(200).json({msg:"Статья убрана из закладок"});
        })
        .catch(err => {
            res.status(500).json({msg:"Ошибка"});
        })
    }

}

module.exports = new FavouriteController();