const { Sequelize, DataTypes } = require('sequelize');

const User = global.db.define('wr_user', {
  id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  usergender: {
    type: DataTypes.BIGINT
  },
  age: {
    type: DataTypes.BIGINT
  },
  createdat: {
    type: DataTypes.DATEONLY
  },
  updatedat: {
    type: DataTypes.DATEONLY
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = User;