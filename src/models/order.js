/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('order', {
    orderId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    referrer: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    priceTotal: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    payType: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    payee: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    source: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'order'
  })
}
