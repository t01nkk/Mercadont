const {
    SESSION_SECRET
} = process.env;
const { User } = require("../db")
const { Router } = require("express")
const bcrypt = require("bcrypt")
const passport = require('passport');
const { initialize } = require('../middlewares/middlewares');
// const session = require('express-session');


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

async function findUser(email) {
    const userEmail = await User.findOne({ where: { email: email } })
    // console.log(userEmail);
    return userEmail
}

async function findById(id) {
    const userId = await User.findOne({ where: { id: id } });
    // console.log(userId);
    return userId
}

initialize(passport, email => findUser(email), id => findById(id))

//
const router = Router()

//Create User
function getUser(user) {
    return user
}

router.get("/login", async (req, res) => {
    res.send({ msg: 'Failure to authenticate credentials' })
})

router.get("/", async (req, res) => {
    const user = await getUser(req.user)
    if (user) {

        res.status(300).send(user)
    } else {
        return res.status(401).send({ msg: "you need to log in" })
    }
})

router.get("/register", checkNotAuthenticated, async (req, res) => {
    res.send({ msg: 'reg' })
})

router.post("/login", checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/user/login',
    failureFlash: true
}
))


router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/user');
    });
});

router.post("/register", checkNotAuthenticated, async (req, res) => {
    if (req.user) {
        return res.status(400).send({ message: "You can't register right now, you're already logged in!" })
    }
    // const { email, password } = req.body;
    const { name, lastname, email, password, address, description, image, payment } = req.body;
    const exists = await User.findOne({ where: { email: email } });
    try {
        if (!exists) {
            const hashPass = await bcrypt.hash(password, 10);
            // const newUser = await User.create({ email: email, password: hashPass });
            const newUser = await User.create({ name, lastname, email, password: hashPass, address, description, image, payment });
            // console.log(newUser)
            res.status(201).send("New User Created")

        } else {
            res.status(400).send({ msg: "This user already exists" });
        }

    } catch (error) {
        res.status(401).send(error)
    }
});

//Get User
router.get("/:id", checkAuthenticated, async (req, res) => {
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

//Update User
router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { name, lastname, email, password, address, image, payment } = req.body;

    try {
        const updatedUser = await User.update(
            {
                name: name,
                lastname: lastname,
                email: email,
                password: password,
                address: address,
                image: image,
                payment: payment,
            },
            { where: { id: id } }
        );
        res.status(202).send(updatedUser)

    } catch (error) {
        res.status(400).send(error)
    }
});

//Delete User
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const destroyedUser = await User.destroy({ where: { id: id } });
        res.status(200).send(destroyedUser)
    } catch (error) {
        res.status(400).send(error)
    }
});
module.exports = router