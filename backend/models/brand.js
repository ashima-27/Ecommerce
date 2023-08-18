"use strict";
var bcrypt = require("bcrypt-nodejs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        
        static associate(models) {
          
        }
    }
    Brand.init(
        {  id:{ allowNull : false,
            primaryKey : true,
            type : DataTypes.UUID,
            defaultValue : DataTypes.UUIDV4,},
            label: { type : DataTypes.STRING, required: true, unique: true },
            value: { type : DataTypes.STRING, required: true, unique: true },
        },
        {
            sequelize,
            modelName: "brand",
        }
    );
    return Brand;
};
