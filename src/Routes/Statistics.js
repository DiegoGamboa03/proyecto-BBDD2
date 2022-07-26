const { Router } = require('express');
const router = new Router();
const conn = require('D:/Proyecto BBDD2/proyecto-BBDD2/src/Config/DatabaseConfig');

router.get('/AnualSalaryChanges', (req, res) => {
    const sql = 'CALL totalCambiosSalariosAnual();';

    conn.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
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
    res.send('Not result');
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
    res.send('Not result');
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
    res.send('Not result');
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
    res.send('Not result');
  }
  });
});

module.exports = router;