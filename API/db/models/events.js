'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Events.init({
    name: DataTypes.STRING,
    date_event: DataTypes.DATE,
    path_img: DataTypes.STRING,
    description: DataTypes.STRING,
    external_link: DataTypes.STRING,
    contact_number: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};