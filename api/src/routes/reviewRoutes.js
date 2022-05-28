const { Product, User, Category, Qa, Review } = require("../db")
const { Router } = require("express")


const router = Router()

//Add Review to Product

router.post("/:id/review", async (req, res) => {
    const { id } = req.params
    const { rating, text, userId } = req.body

    try {
        const product = await Product.findOne({
            include: {
                model: Review,
                attributes: ["rating", "text"],
                through: { attributes: [] }
            }
        },
            { where: { id: id } })
        const user = await User.findOne({ where: { id: userId } })
        for (let review of product.reviews) {
            if (user.hasReview(review)) return res.status(400).send("User Already reviewed product," +
                " please update your review if your wish to leave feedback")
        }
        const fullReview = await Review.create({
            rating,
            text
        })
        product.addReview(fullReview)
        user.addReview(fullReview)
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