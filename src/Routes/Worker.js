const { Router } = require('express');
const router = new Router();
const conn = require('D:/Proyecto BBDD2/proyecto-BBDD2/src/Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Trabajadores';

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
  const sql = `SELECT * FROM Trabajadores WHERE Cedula = ${id}`;
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
  const sql = 'INSERT INTO Trabajadores SET ?';

  const workerObj = {
    cedula: req.body.Cedula,
    COD: req.body.COD,
    PrimerNombre: req.body.PrimerNombre,
    SegundoNombre: req.body.SegundoNombre,
    PrimerApellido: req.body.PrimerApellido,
    SegundoApellido: req.body.SegundoApellido,
    Genero: req.body.Genero,
    Direccion: req.body.Direccion,
    FechaNacimiento: req.body.FechaNacimiento,
    Ocupacion: req.body.Ocupacion,
    SalarioSemanal: req.body.SalarioSemanal,
    FechaIngreso: req.body.FechaIngreso,
    esZurdo: req.body.esZurdo,
  };
  
  // Aqui poner las verificaciones
  
  conn.query(sql, workerObj, error => {
    if (error) throw error;
    res.send('Worker created!');
  });
});

router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { Cedula, COD, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido,Genero,Direccion,FechaNacimiento,
    Ocupacion, SalarioSemanal, FechaIngreso, esZurdo} = req.body;
    const sql = 'UPDATE Trabajadores SET '  +
    `COD='${COD}',` + 
    `PrimerNombre='${PrimerNombre}',`+
    `SegundoNombre='${SegundoNombre}',`+
    `PrimerApellido='${PrimerApellido}',`+
    `SegundoApellido='${SegundoApellido}',`+
    `Genero='${Genero}',`+
    `Direccion='${Direccion}',`+
    `FechaNacimiento='${FechaNacimiento}',`+
    `Ocupacion='${Ocupacion}',`+
    `SalarioSemanal='${SalarioSemanal}',`+
    `FechaIngreso='${FechaIngreso}',`+
    `esZurdo='${esZurdo}' `+
    `WHERE Cedula='${id}'`;

  conn.query(sql, error => {
    if (error) throw error;
    res.send('Worker updated!');
  });
});



router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Trabajadores WHERE Cedula = ${id}`;

  conn.query(sql, error => {
    if (error) throw error;
    res.send('Delete worker');
  });
});


module.exports = router;