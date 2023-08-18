"use strict";
var bcrypt = require("bcrypt-nodejs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        
        static associate(models) {
          Order.belongsTo(models.user,{
            foreignKey: "id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          })
          Order.hasMany(models.cart, {
            foreignKey: "id",
            onDelete: "CASCADE",
        onUpdate: "CASCADE"
        }); 
        }
    }
    Order.init(
        {  id:{ allowNull : false,
            primaryKey : true,
            type : DataTypes.UUID,
            defaultValue : DataTypes.UUIDV4,},
            type: {
                type: DataTypes.JSON, 
                // allowNull: false,
              },
              totalAmount: {
                type: DataTypes.FLOAT, 
              },
              totalItems: {
                type: DataTypes.INTEGER,
              },
              userId: {
                type: DataTypes.UUID, 
                allowNull: false,
                references: {
                  model: 'user', 
                  key: 'id',
                },
              },
              paymentMethod: {
                type: DataTypes.STRING,
                // allowNull: false,
              },
              paymentStatus: {
                type: DataTypes.STRING,
                defaultValue: 'pending',
              },
              status: {
                type: DataTypes.STRING,
                defaultValue: 'pending',
              },
              selectedAddress: {
                type: DataTypes.JSON,
                // allowNull: false,
              },
        },
        {
            sequelize,
            modelName: "order",
        }
    );
    return Order;
};
