const { Router } = require('express');
const router = new Router();
const conn = require('D:/Proyecto BBDD2/proyecto-BBDD2/src/Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Retirados';

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
  const sql = `SELECT * FROM Retirados WHERE Cedula = ${id}`;
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
  const sql = 'INSERT INTO Retirados SET ?';

  const retiredWorkerObj = {
    Cedula: req.body.Cedula,
    FechaRetiro: req.body.FechaRetiro,
    Motivo: req.body.Motivo
  };
  
  // Aqui poner las verificaciones
  
  conn.query(sql, retiredWorkerObj, error => {
    if (error) throw error;
    res.send('Relative created!');
  });
});

router.delete('/delete/:id', (req, res) => {
  const { id, date } = req.params;
  const sql = `DELETE FROM Retirados WHERE Cedula = '${id}'`;

  conn.query(sql, error => {
    if (error) throw error;
    res.send('Relative deleted');
  });
});


module.exports = router;