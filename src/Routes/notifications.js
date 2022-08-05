const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT Nombre FROM Notificaciones WHERE FechaDeNotificacion <= CURDATE() AND Atendido = 0;';

    conn.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('No hay notificaciones disponibles');
    }
    });
});

module.exports = router;