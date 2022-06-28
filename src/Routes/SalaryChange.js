const { Router } = require('express');
const router = new Router();
const conn = require('D:/Proyecto BBDD2/proyecto-BBDD2/src/Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM CambiosSalarios';

    conn.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sql = `SELECT * FROM CambiosSalarios WHERE Cedula = ${id}`;
  conn.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

router.post('/add', (req, res) => {
    const sql = 'INSERT INTO CambiosSalarios SET ?';
  
    const salaryChangeObj = {
      cedula: req.body.Cedula,
      fechaCambio: req.body.FechaCambio,
      motivo: req.body.Motivo,
      salarioSemanalNuevo: req.body.SalarioSemanalNuevo,
    };
    
    // Aqui poner las verificaciones
    
    conn.query(sql, salaryChangeObj, error => {
      if (error) throw error;
      res.send('Salary Change created!');
    });
});

router.delete('/delete/:id/:date', (req, res) => {
    const { id, date } = req.params;
    const sql = `DELETE FROM CambiosSalarios WHERE Cedula = '${id}' AND FechaCambio = '${date}'`;
  
    conn.query(sql, error => {
      if (error) throw error;
      res.send('Worker deleted');
    });
  });
  
module.exports = router;