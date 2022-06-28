const { Router } = require('express');
const router = new Router();
const conn = require('D:/Proyecto BBDD2/proyecto-BBDD2/src/Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Permisos';

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
  const sql = `SELECT * FROM Permisos WHERE Cedula = ${id}`;
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
  const sql = 'INSERT INTO Permisos SET ?';

  const workRestLeaveObj = {
    Cedula: req.body.Cedula,
    FechaReposo: req.body.FechaReposo,
    Motivo: req.body.Motivo,
    Tipo: req.body.Tipo,
  };
  
  // Aqui poner las verificaciones
  
  conn.query(sql, workRestLeaveObj, error => {
    if (error) throw error;
    res.send('WorkRestLeave created!');
  });
});

router.delete('/delete/:id/:date', (req, res) => {
  const { id, date } = req.params;
  const sql = `DELETE FROM Permisos WHERE Cedula = '${id}' AND FechaReposo = '${date}'`;

  conn.query(sql, error => {
    if (error) throw error;
    res.send('WorkRestLeave deleted');
  });
});



module.exports = router;