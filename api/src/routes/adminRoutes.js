const {
    SESSION_SECRET
} = process.env;
const { User } = require("../db")
const { Router } = require("express")
const bcrypt = require("bcrypt")
const passport = require('passport');
const { validateInputUser } = require('../middlewares/middlewares');
const router = Router()

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/user')
    }
    next()
}

//Register a new Admin user
router.post("/register", checkNotAuthenticated, async (req, res) => {

    const { name, lastname, email, password} = req.body;

    let errors = validateInputUser(name,lastname,email,password)
    if(errors.length) return res.status(400).send({ msg: errors});

    const exists = await User.findOne({ where: { email: email } });

    try {
        if (!exists) {
            const hashPass = await bcrypt.hash(password, 10);
            await User.create({ name, lastname, email, password: hashPass, isAdmin: true});
            res.status(201).send("New Admin User Created")
        } else {
            res.status(400).send({ msg: "This user already exists" });
        }

    } catch (error) {
        res.status(401).send(error)
    }
});

//Get User
router.get("users/:id", checkAuthenticated, async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findOne({
            where: { id: id }
        });
        if (!user) {
            return res.status(404).send("User Not Found")
        }
        return res.status(200).send(user)

    } catch (error) {
        res.status(404).send(error)
    }
});

//Get Banned Users
router.get("/users", checkAuthenticated, async (req, res) => {
    const {flag} = req.query

    try {
        const user = await User.findAll({
            where: { flag}
        });
        if (!user) {
            return res.status(404).send("There aren't any banned users yet")
        }
        return res.status(200).send(user)

    } catch (error) {
        res.status(404).send(error)
    }
});

//Give user Admin credencials OR Ban user
router.put("/users/:id", checkAuthenticated, async (req, res) => {
    const { id } = req.params;
    const {setAdmin, setBan} = req.body

    if(setAdmin){
        try {
            const isAdmin = await User.update(
                {
                    isAdmin: setAdmin
                },
                { where: { id: id } });
            return res.status(200).send(isAdmin);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    if(setBan){
        try {
            const bannedUser = await User.update(
                {
                    banned: setBan
                },
                { where: { id: id } });
            return res.status(200).send(bannedUser);
        } catch (error) {
            return res.status(400).send(error);
        }
    }
    
});

module.exports = router