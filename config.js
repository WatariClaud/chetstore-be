const dotenv = require('dotenv')

dotenv.config();

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USERdev}:${process.env.DB_PASSWORDdev}@${process.env.DB_HOSTdev}:${process.env.DB_PORTdev}/${process.env.DB_DATABASEdev}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction ? {rejectUnauthorized: false} : isProduction,
});

module.exports = pool;