const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('funeralHome', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};