const router = require('express').Router();
const pool = require('../db')
const authorize = require('../middleware/authorization')

router.get('/', authorize, async(req, res) => {
    try {
        //res.json(req.user)
        const user = await pool.query('SELECT user_name FROM projectuser WHERE user_id = $1', [req.user])
        res.json(user.rows[0])

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error Try Later !');
    }
});


module.exports = router;