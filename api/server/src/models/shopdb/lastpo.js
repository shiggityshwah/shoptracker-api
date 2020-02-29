/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lastpo', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'lastPO': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'lastpo'
  });
};
