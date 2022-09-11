const config = require("../../config/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: 'mysql',
  operatorsAliases: 0,
  
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.employees = require("./Employee")(sequelize, Sequelize);
module.exports = db;