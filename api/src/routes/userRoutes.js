const {Product, User} = require("../db")
const {Router} = require("express")


const router = Router()

//Create User
router.post("/", async (req, res) => {
    const {name, lastname, email, password, address, description, image, payment} = req.body;

    try {
        const newUser = await User.create({name, lastname, email, password, address, description, image, payment});
        res.status(201).send("New User Created")

    } catch (error) {
        res.status(401).send(error)
    }
});

//Get User
router.get("/:id", async (req, res) =>{
    const {id} = req.params

    try {
        const user = await Product.findOne({
            where: {id:id}
        });
        if(!user){
            return res.status(404).send("User Not Found")
        }
        return res.status(200).send(user)

    } catch (error) {
        res.status(404).send(error)
    }
});

//Update User
router.put("/:id", async (req, res) => {
    const {id} = req.params
    const {name, lastname, email, password, address, image, payment} = req.body;

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
            {where: {id:id}}
        );
        res.status(202).send(updatedUser)

    } catch (error) {
        res.status(400).send(error)
    }
});

//Delete User
router.delete("/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const destroyedUser = await User.destroy({where: {id:id}});
        res.status(200).send(destroyedUser)
    } catch (error) {
        res.status(400).send(error)
    }
});
module.exports = router