import Sequelize from 'sequelize';
import config from './config/config.mjs';

let sequelize;
try {
	if (process.env.NODE_ENV === 'production') {
		sequelize = new Sequelize(config.production);
	  } else if (process.env.NODE_ENV === 'staging') {
		sequelize = new Sequelize(config.staging);
	  } else if (process.env.NODE_ENV === 'test') {
		sequelize = new Sequelize(config.test);
	  } else {
		sequelize = new Sequelize(config.development);
	  }
} catch (error) {
	console.log("db con error", error)
}


const connection = sequelize;

export default connection;


// # docker run --name my_postgres_container -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -p 5594:5432 -d postgres

