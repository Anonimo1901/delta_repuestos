require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.TANGO_USER,
  password: process.env.TANGO_PASSWORD,
  server: process.env.TANGO_SERVER,
  port: parseInt(process.env.TANGO_PORT),
  database: process.env.TANGO_DB,
  options: {
    encrypt: false,
    enableArithAbort: true
  }
};

async function conectarDB() {
  try {
    const pool = await sql.connect(config);
    console.log('✅ Conexión exitosa a la base de datos');
    return pool;
  } catch (error) {
    console.error('❌ Error al conectar la base de datos:', error);
  }
}

module.exports = { conectarDB, sql };
