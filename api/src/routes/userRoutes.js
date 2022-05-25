const {
    SESSION_SECRET
} = process.env;
const { Product, User } = require("../db")
const { Router } = require("express")
const bcrypt = require("bcrypt")
const passport = require('passport');
const { initialize } = require('../middlewares/middlewares');
const session = require('express-session');

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }
    next()
}

async function findUser(email) {
    return await User.findOne({ where: { email: email } })
}

async function findById(id) {
    return await User.findOne({ where: { id: id } });
}

initialize(passport, email => findUser(email), id => findById(id))

// router.use(session({
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))

// router.use(passport.initialize())
// router.use(passport.session())


//
const router = Router()

//Create User

router.get("/login", async (req, res) => {
    res.send("<h1>hola</h1>\
    <h2>chau</h2>\
    ")
})

router.get("/register", checkNotAuthenticated, async (req, res) => {
    res.send("<input>hola</input>\
    <h2>chau</h2>\
    ")
})

router.post("/login", checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/register',
    // failureFlash: true
}, function (req, res) {
    console.log(req)
}))

router.post("/register", checkNotAuthenticated, async (req, res) => {

    const { email, password } = req.body;
    console.log(req.body)
    // const { name, lastname, email, password, address, description, image, payment } = req.body;
    try {
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email: email, password: hashPass });
        // const newUser = await User.create({ name, lastname, email, hashPass, address, description, image, payment });
        console.log(newUser)
        res.status(201).send("New User Created")

    } catch (error) {
        res.status(401).send(error)
    }
});

//Get User
router.get("/:id", checkAuthenticated, async (req, res) => {
    const { id } = req.params

    try {
        const user = await Product.findOne({
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