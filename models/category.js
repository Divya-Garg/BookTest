const { Sequelize, DataTypes } = require('sequelize');

const Category = global.db.define('category', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  iconcolor: {
    type: DataTypes.STRING(6)
  },
  iconurl: {
    type: DataTypes.STRING(255)
  },
  name: {
    type: DataTypes.STRING(255)
  },
  description: {
    type: DataTypes.STRING(255)
  },
  parent_id: {
    type: DataTypes.INTEGER
  },
  listorder: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Category;