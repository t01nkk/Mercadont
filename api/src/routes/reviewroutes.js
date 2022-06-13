const { Product, User, Category, Qa, Review, PurchaseOrder } = require("../db")
const { calcProdRating } = require('../middlewares/middlewares')
const { Router } = require("express")


const router = Router()

//Add Review to Product

router.post("/:id/review", async (req, res) => {
    const { id } = req.params
    const { rating, text, userId, orderId } = req.body
    if (rating > 5 && rating < 1) {
        return res.status(400).send({ message: "Rating must be a number betwin 5 and 1" })
    }
    try {
        const product = await Product.findOne({
            include: {
                model: Review,
                attributes: ["rating", "text"],
                through: { attributes: [] }
            }
        },
            { where: { id: id } })
        if (!product) console.log("no product")
        const user = await User.findOne({ where: { id: userId } })
        for (let review of product.reviews) {
            if (user.hasReview(review)) return res.status(400).send("User Already reviewed product," +
                " please update your review if your wish to leave feedback")
        }
        if (!user) console.log("no user")
        const fullReview = await Review.create({
            rating,
            text,
            productId: product.id,
            userId: user.id
        })
        product.addReview(fullReview)
        user.addReview(fullReview)
        await calcProdRating(rating, product);
        //Setea el valor "REVIEW" de la tabla Purchase order en TRUE para Deshabilitar una review nueva en por el mismo usuario en el front
        const findOrder = await PurchaseOrder.findone({ where: { orderId: orderId } });
        if (!findOrder) return res.status(400).send({ msg: "This order Id isn't valid" });
        await PurchaseOrder.update({ review: true }, { where: { orderId: orderId } })
        return res.status(200).send("Review Added")
    }
    catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
})


//Update Review
router.put("/:reviewId/updateReview", async (req, res) => {
    const { reviewId } = req.params
    const { rating, text, userId } = req.body

    try {
        const review = Review.findOne({ where: { id: reviewId } })
        const user = User.findOne({ where: { id: userId } })

        Review.update({
            rating,
            text
        }, { where: { id: reviewId } })
        return res.status(200).send("Review Updated")
    }
    catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
})

module.exports = router;