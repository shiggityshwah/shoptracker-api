/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('poitems', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'poId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'po',
        key: 'id'
      }
    },
    'partId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'part',
        key: 'id'
      }
    },
    'qty': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null"
    },
    'lastUpdate': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'machine': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    },
    'dateStarted': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'dateCompleted': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'poitems'
  });
};
