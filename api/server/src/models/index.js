import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configJson from '../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = configJson[env];

console.log('Current environment: ', env);

const shoptrackerdb = {};
const fishbowldb = {}

let shoptrackerSequelize;
let fishbowlSequelize;

if (config.environment === 'production') {
  shoptrackerSequelize = new Sequelize(
      process.env[config.use_env_variable], config.databases.shopdb
    );
  shoptrackerSequelize = new Sequelize(
    process.env.SHOPDB_NAME,
    process.env.SHOPDB_USER,
    process.env.SHOPDB_PASS, {
      host: process.env.SHOPDB_HOST,
      port: process.env.SHOPDB_PORT,
      dialect: 'mysql',
      dialectOption: {
        ssl: true,
        native: true
      },
      logging: true
    }
  );

  fishbowlSequelize = new Sequelize(
    process.env[config.use_env_variable], config.databases.fbdb
  );
  fishbowlSequelize = new Sequelize(
    process.env.FBDB_NAME,
    process.env.FBDB_USER,
    process.env.FBDB_PASS, {
      host: process.env.FBDB_HOST,
      port: process.env.FBDB_PORT,
      dialect: 'mysql',
      dialectOption: {
        ssl: true,
        native: true
      },
      logging: true
    }
  );
} else {
  shoptrackerSequelize = new Sequelize(
     config.databases.shopdb.database,
     config.databases.shopdb.username,
     config.databases.shopdb.password,
     config.databases.shopdb
  );

  fishbowlSequelize = new Sequelize(
    config.databases.fbdb.database,
    config.databases.fbdb.username,
    config.databases.fbdb.password,
    config.databases.fbdb
 );
}

fs.readdirSync(__dirname + "/shopdb")
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = shoptrackerSequelize.import(path.join(__dirname + '/shopdb', file));
    shoptrackerdb[model.name] = model;
  });

fs.readdirSync(__dirname + "/fbdb")
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = fishbowlSequelize.import(path.join(__dirname + '/fbdb', file));
    fishbowldb[model.name] = model;
  });

Object.keys(shoptrackerdb).forEach((modelName) => {
  if (shoptrackerdb[modelName].associate) {
    shoptrackerdb[modelName].associate(shoptrackerdb);
  }
});

Object.keys(fishbowldb).forEach((modelName) => {
  if (fishbowldb[modelName].associate) {
    fishbowldb[modelName].associate(fishbowldb);
  }
});

shoptrackerdb.sequelize = shoptrackerSequelize;
shoptrackerdb.Sequelize = Sequelize;

fishbowldb.sequelize = fishbowlSequelize;
fishbowldb.Sequelize = Sequelize;

export const shopdb = shoptrackerdb;
export const fbdb = fishbowldb;