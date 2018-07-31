/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('combo', {
    comboId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    oprice: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'combo'
  });
};
