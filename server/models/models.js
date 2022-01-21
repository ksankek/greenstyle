const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    firstname: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    patronymic: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    photo: {type: DataTypes.STRING}
})

const Favourite = sequelize.define('favourite', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Favourite_article = sequelize.define('favourites_article', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Article = sequelize.define('article', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    comments: {type: DataTypes.ARRAY(DataTypes.STRING)},
    files: {type: DataTypes.ARRAY(DataTypes.STRING)}
})

const Video = sequelize.define('video', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    url: {type: DataTypes.STRING, allowNull: false},
})

const Section = sequelize.define('section', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

User.hasOne(Favourite);
Favourite.belongsTo(User);

Favourite.hasMany(Favourite_article);
Favourite_article.belongsTo(Favourite);

Article.hasOne(Favourite_article);
Favourite_article.belongsTo(Article);

Section.hasMany(Article);
Article.belongsTo(Section);

Section.hasMany(Video);
Video.belongsTo(Section);

module.exports = {
    User,
    Favourite,
    Favourite_article,
    Article,
    Video,
    Section
}