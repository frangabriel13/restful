require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, 
  native: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Service, Order, User, FuneralHome } = sequelize.models;

Order.belongsTo(Service, { foreignKey: { name: 'serviceId', allowNull: true }, onDelete: 'CASCADE' });
Service.hasMany(Order, { foreignKey: { name: 'serviceId', allowNull: true }, onDelete: 'CASCADE' });

User.hasMany(Order, { foreignKey: { name: 'userId', allowNull: true }, onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: { name: 'userId', allowNull: true }, onDelete: 'CASCADE' });

FuneralHome.hasMany(Order, { foreignKey: { name: 'funeralHomeId', allowNull: true }, onDelete: 'CASCADE' });
Order.belongsTo(FuneralHome, { foreignKey: { name: 'funeralHomeId', allowNull: true }, onDelete: 'CASCADE' });


module.exports = {
  ...sequelize.models,
  conn: sequelize,
};