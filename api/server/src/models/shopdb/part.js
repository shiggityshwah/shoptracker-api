/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('part', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "null"
    },
    'lastMachine': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'num': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'processing': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'rev': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'timeToComplete': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null"
    },
    'lastMade': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'material': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'size': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'timeEstimate': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'desc': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'part'
  });
};
