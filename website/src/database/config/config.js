require("dotenv").config();
module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "mysql",
        dialectOptions: {
            ssl :{
                rejectUnauthorized: false
            }
        }
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "mysql",
        dialectOptions: {
            ssl :{
                rejectUnauthorized: false
            }
        }
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "mysql",
        dialectOptions: {
            ssl :{
                rejectUnauthorized: false
            }
        }
	},
};
