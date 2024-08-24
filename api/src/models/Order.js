const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('order', {
    contactDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    comission: {
      type: DataTypes.FLOAT,
    },
    relationship: {
      type: DataTypes.STRING,
    },
    deceasedName: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('new', 'inProgress', 'pending', 'sold', 'notSold'),
    },
    statusDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
};