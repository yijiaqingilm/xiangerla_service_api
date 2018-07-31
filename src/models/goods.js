/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('goods', {
    goodsId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    catalogsId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'catalogs',
        key: 'catalogsId'
      }
    }
  }, {
    tableName: 'goods'
  });
};
