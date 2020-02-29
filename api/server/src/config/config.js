require("dotenv").config();

module.exports = {
  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    databases: {
      shopdb: {
        database: process.env.SHOPDB_NAME,
        username: process.env.SHOPDB_USER,
        password: process.env.SHOPDB_PASS,
        host: process.env.SHOPDB_HOST,
        dialect: "mysql",
        define: {
          timestamps: false
        }
      },
      fbdb: {
        database: process.env.FBDB_NAME,
        username: process.env.FBDB_USER,
        password: process.env.FBDB_PASS,
        port: process.env.FBDB_PORT,
        host: process.env.FBDB_HOST,
        dialect: "mysql",
        define: {
          timestamps: false
        }
      }
    }
  },

  shopdb: {
    database: process.env.SHOPDB_NAME,
    username: process.env.SHOPDB_USER,
    password: process.env.SHOPDB_PASS,
    host: process.env.SHOPDB_HOST,
    dialect: "mysql",
    define: {
      timestamps: false
    }
  },

  fbdb: {
    database: process.env.FBDB_NAME,
    username: process.env.FBDB_USER,
    password: process.env.FBDB_PASS,
    port: process.env.FBDB_PORT,
    host: process.env.FBDB_HOST,
    dialect: "mysql",
    define: {
      timestamps: false
    }
  },

  test: {
    database: "shoptracker_test",
    username: "root",
    password: null,
    host: "127.0.0.1",
    dialect: "mysql"
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: {
      timestamps: false
    }
  }
};
