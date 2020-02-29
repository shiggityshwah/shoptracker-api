/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('poitem', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'customerId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'customer',
        key: 'id'
      }
    },
    'dateLastFulfillment': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'dateScheduledFulfillment': {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "null"
    },
    'description': {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "null"
    },
    'mcTotalCost': {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: "null"
    },
    'note': {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "null"
    },
    'partId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'part',
        key: 'id'
      }
    },
    'outsourcedPartId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'part',
        key: 'id'
      }
    },
    'partNum': {
      type: DataTypes.STRING(70),
      allowNull: false,
      comment: "null"
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
    'poLineItem': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null"
    },
    'qbClassId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'qbclass',
        key: 'id'
      }
    },
    'qtyFulfilled': {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: "null"
    },
    'qtyPicked': {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: "null"
    },
    'qtyToFulfill': {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: "null"
    },
    'repairFlag': {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "null"
    },
    'revLevel': {
      type: DataTypes.STRING(15),
      allowNull: true,
      comment: "null"
    },
    'statusId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'poitemstatus',
        key: 'id'
      }
    },
    'taxId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'taxrate',
        key: 'id'
      }
    },
    'taxRate': {
      type: "DOUBLE",
      allowNull: false,
      comment: "null"
    },
    'tbdCostFlag': {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "null"
    },
    'totalCost': {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: "null"
    },
    'typeId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'poitemtype',
        key: 'id'
      }
    },
    'unitCost': {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: "null"
    },
    'uomId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null"
    },
    'vendorPartNum': {
      type: DataTypes.STRING(70),
      allowNull: false,
      comment: "null"
    },
    'outsourcedPartNumber': {
      type: DataTypes.STRING(70),
      allowNull: false,
      comment: "null"
    },
    'outsourcedPartDescription': {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'poitem'
  });
};
