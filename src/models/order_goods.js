/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_goods', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'order',
        key: 'orderId'
      }
    },
    goodsId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'goods',
        key: 'goodsId'
      }
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'order_goods'
  });
};
