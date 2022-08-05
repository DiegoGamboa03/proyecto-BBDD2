const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    const sql = 'SELECT Nombre FROM Notificaciones WHERE FechaDeNotificacion <= CURDATE() AND Atendido = 0;';
    
    jwt.verify(req.body.token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        conn.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results);
          } else {
            res.send('No hay notificaciones disponibles');
          }
          });
      }
    });
});

module.exports = router;