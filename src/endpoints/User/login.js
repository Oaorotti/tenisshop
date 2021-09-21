import express from 'express';
import User from '../../database/Schemas/UserSchema';

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password, email } = req.body;

    const Users = new User();

    if (!username) {
        res.status(400).send({
            message: 'you need to specify a username',
        });
        return;
    }
    if (!password) {
        res.status(400).send({
            message: 'you need to specify a password',
        });
        return;
    }
    if (!email) {
        res.status(400).send({
            message: 'you need to specify a email',
        });
        return;
    }

    Users.findOne({
        username: username,
    }).then(() => {});

    res.json({
        password: password,
        email: email,
        username: username,
    });
});

export default router;
