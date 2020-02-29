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
    'buyer': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    },
    'buyerId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'sysuser',
        key: 'id'
      }
    },
    'carrierId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'carrier',
        key: 'id'
      }
    },
    'carrierServiceId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'carrierservice',
        key: 'id'
      }
    },
    'currencyId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'currency',
        key: 'id'
      }
    },
    'currencyRate': {
      type: "DOUBLE",
      allowNull: true,
      comment: "null"
    },
    'customerSO': {
      type: DataTypes.STRING(25),
      allowNull: true,
      comment: "null"
    },
    'dateCompleted': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'dateConfirmed': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'dateCreated': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'dateFirstShip': {
      type: DataTypes.DATE,
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
    'dateRevision': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'deliverTo': {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "null"
    },
    'email': {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "null"
    },
    'fobPointId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'fobpoint',
        key: 'id'
      }
    },
    'locationGroupId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'locationgroup',
        key: 'id'
      }
    },
    'note': {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "null"
    },
    'num': {
      type: DataTypes.STRING(25),
      allowNull: false,
      comment: "null",
      unique: true
    },
    'paymentTermsId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'paymentterms',
        key: 'id'
      }
    },
    'phone': {
      type: DataTypes.STRING(256),
      allowNull: true,
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
    'remitAddress': {
      type: DataTypes.STRING(90),
      allowNull: true,
      comment: "null"
    },
    'remitCity': {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "null"
    },
    'remitCountryId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null"
    },
    'remitStateId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null"
    },
    'remitToName': {
      type: DataTypes.STRING(41),
      allowNull: true,
      comment: "null"
    },
    'remitZip': {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "null"
    },
    'revisionNum': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null"
    },
    'shipTermsId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'shipterms',
        key: 'id'
      }
    },
    'shipToAddress': {
      type: DataTypes.STRING(90),
      allowNull: true,
      comment: "null"
    },
    'shipToCity': {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "null"
    },
    'shipToCountryId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null"
    },
    'shipToName': {
      type: DataTypes.STRING(41),
      allowNull: true,
      comment: "null"
    },
    'shipToStateId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null"
    },
    'shipToZip': {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "null"
    },
    'statusId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'postatus',
        key: 'id'
      }
    },
    'taxRateId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'taxrate',
        key: 'id'
      }
    },
    'taxRateName': {
      type: DataTypes.STRING(31),
      allowNull: true,
      comment: "null"
    },
    'totalIncludesTax': {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "null"
    },
    'totalTax': {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: "null"
    },
    'typeId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'potype',
        key: 'id'
      }
    },
    'url': {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "null"
    },
    'username': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    },
    'vendorContact': {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "null"
    },
    'vendorId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'vendor',
        key: 'id'
      }
    },
    'vendorSO': {
      type: DataTypes.STRING(25),
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'po'
  });
};
