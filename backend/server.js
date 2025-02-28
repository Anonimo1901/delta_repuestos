const express = require('express');
const cors = require('cors');
const { conectarDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/datos', async (req, res) => {
  const { t_comp, n_of } = req.query; // Obtener los parámetros desde la query

  // Verificar si se recibieron ambos parámetros
  if (!t_comp || !n_of) {
    return res.status(400).send('❌ Faltan parámetros t_comp o n_of');
  }

  console.log('Recibido t_comp:', t_comp, 'y n_of:', n_of); // Ver los parámetros recibidos

  const pool = await conectarDB();
  if (pool) {
    try {
      // Hacer la consulta con los parámetros t_comp y n_of
      const result = await pool.request().query(`
        USE [DMD_COMPRESORES_SAIC];
        SELECT [RazonSocial]
              ,[cod_articu]
              ,[t_comp]
              ,[n_of]
              ,[modelo]
              ,[potencia_hp]
              ,[tol_inf]
              ,[tol_sup]
              ,[modelo_falso]
              ,[nom_atr]
              ,[localidad_planta]
              ,[CA_Decisor_tec]
        FROM [dbo].[GES_OT]
        WHERE t_comp = '${t_comp}' AND n_of = '${n_of}';
      `);
      res.json(result.recordset);
    } catch (error) {
      res.status(500).send('❌ Error en la consulta');
    }
  } else {
    res.status(500).send('❌ No se pudo conectar a la base de datos');
  }
});

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
