const bcrypt = require('bcryptjs');

module.exports ={
    register: async (req, res) => {
        const {email, password, username} = req.body;
        const db =req.app.get('db');

        let user = await db.auth.check_user(email);
        if (user[0]){
            return res.status(400).send('Email Taken, choose another one!')
        }

        let salt = bcrypt.getSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        let newUser = await db.auth.register_user({email, password: hash, username});
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);

    },
    login: async(req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');

        let user = await db.auth.check_user(email);
        if(!user[0]){
            return res.status(400).send('User does not exist!');
        }
        const authenticated =bcrypt.compareSync(password, user[0].password);
        if(!authenticated){
            return res.status(401).send('Password is WRONG!');
        }
        delete user[0].password;
        req.session.user = user[0];
        res.status(202).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}