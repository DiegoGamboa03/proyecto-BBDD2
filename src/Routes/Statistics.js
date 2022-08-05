const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/AnualSalaryChanges', (req, res) => {
    const sql = 'CALL totalCambiosSalariosAnual();';

    conn.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('No hay resultados');
    }
    });
});

router.get('/AnualRetiredWorkers', (req, res) => {
  const sql = 'CALL totalEmpleadosRetiradosAnual();';

  conn.query(sql, (error, results) => {
  if (error) throw error;
  if (results.length > 0) {
    res.json(results);
  } else {
    res.send('No hay resultados');
  }
  });
});

router.get('/AnualRetiredWorkersByGender', (req, res) => {
  const sql = 'CALL totalEmpleadosRetiradosAnual();';

  conn.query(sql, (error, results) => {
  if (error) throw error;
  if (results.length > 0) {
    res.json(results);
  } else {
    res.send('No hay resultados');
  }
  });
});

router.get('/AnualNewWorkers', (req, res) => {
  const sql = 'CALL totalNuevoIngresosAnual();';

  conn.query(sql, (error, results) => {
  if (error) throw error;
  if (results.length > 0) {
    res.json(results);
  } else {
    res.send('No hay resultados');
  }
  });
});


router.get('/AnualNewWorkersByGender', (req, res) => {
  const sql = 'CALL totalNuevoIngresosAnualPorGenero();';

  conn.query(sql, (error, results) => {
  if (error) throw error;
  if (results.length > 0) {
    res.json(results);
  } else {
    res.send('No hay resultados');
  }
  });
});

module.exports = router;