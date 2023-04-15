export default {
  development: {
    username: "root",
    password: "secret",
    database: "choa",
    host: "127.0.0.1",
    port: "5594",
    dialect: 'postgres',
    logging: false,
	
  },
  test: {
    storage: ':memory',
    dialect: 'sqlite',
  },
  staging: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    logging: false,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    logging: false,
    dialect: 'postgres',
  },
};
