const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User, Favourite } = require("../models/models");
const jwt = require("jsonwebtoken");

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
    async registration(req, res) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            const apiError = new ApiError(400, "Некорректные логин или пароль.");
            return res.status(apiError.status).json(apiError);
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            const apiError = new ApiError(
                400,
                "Пользователь с таким логином уже существует."
            );
            return res.status(apiError.status).json(apiError);
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, password: hashPassword });
        const favourite = await Favourite.create({ userId: user.id });
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
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
        return res.json({ token });
    }

    async check(req, res, next) {
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
}

module.exports = new UserController();
