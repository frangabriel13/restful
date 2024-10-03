// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   sequelize.define('service', {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     price: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     features: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//       allowNull: false,
//     },
//     disclaimers: {
//       type: DataTypes.TEXT,
//     },
//     isActive: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   });
// };
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('service', {
    name: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    features: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    disclaimers: {
      type: DataTypes.JSON,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};