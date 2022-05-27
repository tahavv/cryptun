const router = require('express').Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
var uuid = require('uuid');
const jwtGenrator = require('../utils/jwtGenerator')
const validInfo = require('../middleware/validate')
const authorize = require('../middleware/authorization')

//register route
router.post('/register', validInfo, async(req, res) => {
    try {
        const { name, password, email } = req.body;
        const user = await pool.query("SELECT * FROM projectuser WHERE user_email = $1 ", [email]);
        //res.json(user.rows);
        if (user.rows.length !== 0) {
            return res.status(401).json("User already exist")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await pool.query("INSERT INTO projectuser (user_id,user_name,user_password,user_email) VALUES ($1,$2,$3,$4) RETURNING *", [uuid.v4(), name, hashedPass, email])
            /*res.json(newUser.rows[0]);
            console.log(newUser.rows[0])*/
        const token = jwtGenrator(newUser.rows[0].user_id);
        res.json({ token })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error Try Later !');
    }

});


//login route
router.post('/login', validInfo, async(req, res) => {
    try {

        const { email, password } = req.body;
        const user = await pool.query('SELECT * FROM projectuser WHERE user_email=$1', [email]);

        if (user.rows.length === 0) {
            return res.status(401).json('Email or Password is incorrect!');
        }
        //validate pass
        const validpass = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validpass) {
            return res.json('Email or Password is incorrect!');
        }

        const token = jwtGenrator(user.rows[0].user_id);
        return res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error Try Later !');
    }
});


router.get('/verify', authorize, (req, res) => {
    try {
        res.json(true)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error Try Later !');
    }
});

module.exports = router;