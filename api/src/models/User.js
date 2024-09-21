const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Admin',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('superAdmin', 'admin'),
      allowNull: false,
      defaultValue: 'admin',
    }
  });

  // Agregar hooks para validar que siempre haya al menos un superAdmin
  User.addHook('beforeDestroy', async (user, options) => {
    if (user.role === 'superAdmin') {
      const superAdminCount = await User.count({ where: { role: 'superAdmin' } });
      if (superAdminCount <= 1) {
        throw new Error('Debe haber al menos un superAdmin.');
      }
    }
  });

  User.addHook('beforeUpdate', async (user, options) => {
    if (user.role !== 'superAdmin') {
      const superAdminCount = await User.count({ where: { role: 'superAdmin' } });
      if (superAdminCount <= 1) {
        throw new Error('Debe haber al menos un superAdmin.');
      }
    }
  });

  return User;
};