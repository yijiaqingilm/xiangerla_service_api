/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_combo', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comboId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'combo',
        key: 'comboId'
      }
    },
    orderId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'order',
        key: 'orderId'
      }
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'order_combo'
  });
};
