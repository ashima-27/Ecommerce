"use strict";
var bcrypt = require("bcrypt-nodejs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {

        static associate(models) {
            Cart.belongsTo(models.user,{
                foreignKey: "userId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
              })
              Cart.belongsTo(models.product,{
                foreignKey: "productId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
              })
              Cart.belongsTo(models.order,{
                foreignKey: "id",
                onDelete: "CASCADE",
                 onUpdate: "CASCADE"
              })
        }
    }
    Cart.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            quantity: { type: DataTypes.INTEGER},
            productId: { type: DataTypes.UUID ,allowNull:false},
            userId: { type: DataTypes.UUID,allowNull:false },
            color: {
                type: DataTypes.STRING
            },
            size: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            modelName: "cart",
        }
    );
    return Cart;
};


// ref: 'User',
// ref: 'Product',