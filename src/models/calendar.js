/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('calendar', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dayType: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'calendar'
  });
};
