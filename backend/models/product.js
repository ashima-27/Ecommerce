"use strict";
var bcrypt = require("bcrypt-nodejs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {

        static associate(models) {
            Product.hasMany(models.brand, {
                foreignKey: "id",
                onDelete: "CASCADE",
        onUpdate: "CASCADE"
            });
            Product.hasMany(models.cart, {
                foreignKey: "id",
                onDelete: "SET NULL",
            }); 
        }
       
    }
    Product.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.STRING,

            },
            price: {
                type: DataTypes.FLOAT,

                validate: { min: 1, max: 10000 }
            },
            discountPercentage:
            {
                type: DataTypes.FLOAT,
                validate: { min: 1, max: 99 }
            },
            rating: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
                validate: { min: 0, max: 5 }
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: { min: 0 }
            },
            brand:
            {
                type: DataTypes.STRING,
            },
            category: {
                type: DataTypes.STRING
            },
            thumbnail: {
                type: DataTypes.STRING,
            },
            // images: {
            //     type: DataTypes.ARRAY(DataTypes.STRING),
            //     allowNull: false
            // },
            // colors: { type: DataTypes.ARRAY(DataTypes.JSON), allowNull: true },
            // sizes: { type: DataTypes.ARRAY(DataTypes.JSON), allowNull: true },
            // highlights: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
            discountPrice: { type: DataTypes.FLOAT, },
            deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
 },
{
    sequelize,
    modelName: "product",
});
return Product;
};




















