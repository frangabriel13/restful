const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('order', {
    status: {
      type: DataTypes.ENUM('new', 'inProgress', 'pending', 'sold', 'notSold'),
    },
    statusDate: {
      type: DataTypes.JSON,
      defaultValue: {
        date: DataTypes.NOW,
        updatedBy: 'system',
      },
    },
    insurance: {
      type: DataTypes.ENUM('pending', 'GWIC', 'CMT'),
    },
    tracking: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
    },
    price: {
      type: DataTypes.STRING,
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
    relationship: {
      type: DataTypes.STRING,
    },
    deceasedName: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    source: {
      type: DataTypes.STRING,
    },
    comission: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    updates: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
    },
  });
};