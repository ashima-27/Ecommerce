"use strict";
var bcrypt = require("bcrypt-nodejs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        
        static associate(models) {
          User.hasMany(models.order, {
                foreignKey: "id",
                onDelete: "CASCADE",
        onUpdate: "CASCADE"
            });
         User.hasOne(models.cart, {
                foreignKey: "id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }); 
      
        }
    }
   
    //     {  id:{ allowNull : false,
    //         primaryKey : true,
    //         type : DataTypes.UUID,
    //         defaultValue : DataTypes.UUID,},
          
    //         email: {
    //         type: DataTypes.STRING,
    //         allowNull: false,
    //         unique: true
    //       },
    //       password: {
    //         type: DataTypes.BLOB, 
    //         allowNull: false
    //       },
    //       role: {
    //         type: DataTypes.STRING,
    //         allowNull: false,
    //         defaultValue: 'user'
    //       },
    //       // addresses: {
    //       //   type: DataTypes.JSON, 
    //       //   defaultValue: []
    //       // },
    //       name: {
    //         type: DataTypes.STRING
    //       },
    //       // salt: {
    //       //   type: DataTypes.BLOB 
    //       // },
    //       resetPasswordToken: {
    //         type: DataTypes.STRING,
    //         defaultValue: ''
    //       }
    //     }, {
    //       timestamps: true
    //     },
    
    //     {
    //         sequelize:sequelize,
    //         modelName: "user",
    //     }
    // );
    User.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'user',
        },
        resetPasswordToken: {
                  type: DataTypes.STRING,
                  defaultValue: ''
                },
                name: {
                          type: DataTypes.STRING
                        },
       addresses: {
            type: DataTypes.STRING, 
           allowNull:true
          },
      },
      {
        timestamps: true,
        sequelize: sequelize, // Pass the Sequelize instance here
        modelName: 'user',
      }
    );
    
    return User;
};
