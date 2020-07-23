const { Sequelize, DataTypes } = require('sequelize');

const Book = global.db.define('book', {
  uuid: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  title: {
    type: DataTypes.STRING(255)
  },
  author: {
    type: DataTypes.STRING(255)
  },
  language: {
    type: DataTypes.STRING(255)
  },
  createtime: {
    type: DataTypes.DATEONLY
  },
  id: {
    type: DataTypes.INTEGER,
    unique: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Book;