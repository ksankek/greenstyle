const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User, Favourite} = require("../models/models");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const path = require("path");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {
            id: id,
            email,
            role,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "24h",
        }
    );
};

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body;
            if (!email || !password) {
                const apiError = new ApiError(400, "Некорректные логин или пароль.");
                return res.status(apiError.status).json(apiError);
            }

            const candidate = await User.findOne({where: {email}});
            if (candidate) {
                const apiError = new ApiError(
                    400,
                    "Пользователь с таким логином уже существует."
                );
                return res.status(apiError.status).json(apiError);
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({email, role, password: hashPassword});
            await Favourite.create({userId: user.id});
            const token = generateJwt(user.id, user.email, user.role);
            return res.json({token});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({where: {email}});
            if (!user) {
                const apiError = new ApiError(400, "Пользователь не найден.");
                return res.status(apiError.status).json(apiError);
            }

            let comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                const apiError = new ApiError(400, "Неверный пароль.");
                return res.status(apiError.status).json(apiError);
            }
            const token = generateJwt(user.id, user.email, user.role);
            return res.json({token});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }

    async getAllUsers(req, res, next) {
        let users;

        try{
            users = await User.findAll();
            return res.json(users);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getUserById(req, res, next) {
        const id = req.params.userId;

        try{
            const user = await User.findOne({where: {id: id}})
            return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async edit(req, res, next) {
        try {
            const id = req.params.userId;
            const {firstname, lastname, patronymic, phone} = req.body;

            User.update({
                    firstname: `${firstname}`,
                    lastname: `${lastname}`,
                    patronymic: `${patronymic}`,
                    phone: `${phone}`
                },
                { where: {id}})
                .then(() => {
                    res.status(200).json({msg:"Пользовтель обновлен"});
                })
                .catch(err => {
                    res.status(500).json({msg:err});
                })
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async addPhoto(req, res, next) {
        try{
            const id = req.params.userId;
            const {img} = req.files;

            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            await User.update({
                    photo: fileName
                }, {where: {id}}
            ).then(() => {
                res.status(200).json({msg:"Фото добавлено"});
            })
            .catch(err => {
                res.status(500).json({msg:err});
            });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deletePhoto(req, res, next) {
        try{
            const {userId} = req.params;

            await User.update({
                    photo: null
                }, {where: {id:userId}}
            ).then(() => {
                return res.status(200).json({msg:"Фото удалено"});
            })
            .catch(err => {
                return res.status(500).json({msg:err});
            });

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new UserController();
