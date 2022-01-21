const {Video} = require('../models/models');
const ApiError = require('../error/ApiError');

class VideoController{

    async addVideo(req, res, next) {
        try {
            let {url, sectionId} = req.body;

            const video = await Video.create({url, sectionId});
            return res.status(200).json(video);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        let sectionId = req.params.sectionId;

        try{
            const video = await Video.findAll({where: {sectionId}})
            return res.json(video);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res) {
        const id = req.params.videoId;

        Video.destroy({
            where: {id}
        })
        .then(() => {
            res.status(200).json({msg:"Видео удалено"});
        })
        .catch(err => {
            res.status(500).json({msg:"Ошибка"});
        })
    }

}

module.exports = new VideoController();