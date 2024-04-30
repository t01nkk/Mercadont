const { User, Product, PurchaseOrder } = require('../db');
const { groupPurchaseOrders } = require('../middlewares/middlewares');

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            where: { id: id },
            include: { all: true },
        });

        if (!user) {
            res.status(404).send('User Not Found');
        }

        res.status(200).send({ message: 'User found', data: user });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        lastname,
        image,
        country,
        province,
        city,
        street,
        postalCode,
    } = req.body;
    try {
        const updatedUser = await User.update(
            {
                name: name,
                lastname: lastname,
                country: country,
                province: province,
                city: city,
                street: street,
                postalCode: postalCode,
                image: image,
            },
            { where: { id: id } }
        );
        res.status(202).send({ message: `User updated`, data: updatedUser });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const addFavorite = async (req, res) => {
    const { idUser, idProduct } = req.body;
    try {
        const user = await User.findOne({ where: { id: idUser } });
        const favoriteProduct = await Product.findOne({
            where: { id: idProduct },
        });
        const favorite = await user.addProduct(favoriteProduct);
        res.status(201).send({ message: 'Favorite created', data: favorite });
    } catch (error) {
        res.status(404).send({ message: error });
    }
};

const removeFavorite = async (req, res) => {
    const { idUser, idProduct } = req.body;
    try {
        const user = await User.findOne({ where: { id: idUser } });
        const favoriteProduct = await Product.findOne({
            where: { id: idProduct },
        });
        if (!user || !favoriteProduct)
            res.status(404).send({
                message: 'data not found',
                user: user?.length,
                product: favoriteProduct?.length,
            });
        await user.removeProduct(favoriteProduct);
        res.status(200).send('Favorite removed');
    } catch (error) {
        res.status(404).send({ message: error });
    }
};

// Get User's favorites
const findOneFavorite = async (req, res) => {
    const { id } = req.params;

    try {
        const userFavorites = await User.findOne({
            include: {
                model: Product,
                through: {
                    attributes: [],
                },
            },
            where: { id: id },
        });
        if (!userFavorites) {
            res.status(404).send('User Not Found');
        }
        res.status(200).send({ data: userFavorites.products });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

/*-------------------------------------------------------------- */
/*---------------------Purchase History--------------------------*/

// Get User's purchase history
// router.get("/history/:id", async (req, res) => {
const getPurchaseHistoryById = async (req, res) => {
    const { id } = req.params;
    let orders = [];

    try {
        const userHistory = await PurchaseOrder.findAll({
            where: {
                userId: id,
                paymentStatus: 'completed',
            },
        });
        if (!userHistory.length) {
            res.status(200).send([]);
        }

        let userPurchaseOrders = groupPurchaseOrders(userHistory);
        res.status(200).send(userPurchaseOrders);
    } catch (error) {
        res.status(404).send(error);
    }
};

const getUserPurchasingHistory = async (req, res) => {
    const { order } = req.body;
    var foundProducts = [];
    try {
        for (var i = 0; i < order.length; i++) {
            let found = await Product.findOne({ where: { id: order[i] } });
            if (!found) {
                console.log({
                    msg: `The product id:  ${order[i]}  doesn't exist`,
                });
                res.status(404).send({
                    msg: `The product id:  ${order[i]}  doesn't exist`,
                });
            }
            foundProducts.push(found);
        }
        res.send(foundProducts);
    } catch (err) {
        console.log('This be err.message:  ', err.message);
        res.status(404).send({ msg: err.message });
    }
};

module.exports = {
    getUser,
    updateUser,
    addFavorite,
    removeFavorite,
    findOneFavorite,
    getPurchaseHistoryById,
    getUserPurchasingHistory,
};
