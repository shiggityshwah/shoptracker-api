/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('po', {
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
      comment: "null"
    },
    'num': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null"
    },
    'buyer': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    },
    'note': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    },
    'dateIssued': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'dateLastModified': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'dateStarted': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'status': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'dateRequested': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'priority': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'partQty': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null"
    },
    'nextPo': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null"
    },
    'dateCompleted': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'po'
  });
};
