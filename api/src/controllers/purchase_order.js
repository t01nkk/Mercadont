const { PurchaseOrder, User } = require("../db");
const { mailPayment } = require("../middlewares/middlewares");

const createPurchaseOrder = async (orderId,userId,local,amount,status) => {
    let created;
    try {
        for(let product of local){
            created = await PurchaseOrder.create({
                orderId,
                userId,
                productId: product.id,
                productQuantity: product.quantity,
                totalAmount: amount,
                paymentStatus: status
            })
        }
    
        if(status === "completed"){
            const user = await User.findOne({
                where: { id: userId}
            })
            // DESCOMENTAR PARA ENVIAR MAIL AL USER CUANDO SE HACE EL PAGO.

            mailPayment(user.email, orderId);

            // 
        }
        return created; 
    } catch (error) {
        return error
    }
}

const createPurchaseCompleted = async (orderId) => {
    let updated;
    try {
        updated = await PurchaseOrder.update({
            paymentStatus: "completed",
        },{
            where:{
                orderId,
            }
        })

        const order = await PurchaseOrder.findOne({
            where: { orderId: orderId}
        })

        const user = await User.findOne({
            where: {id: order.userId}
        })

        // DESCOMENTAR PARA ENVIAR MAIL AL USER CUANDO SE HACE EL PAGO.

        mailPayment(user.email, orderId);

        // 
        return updated;
    } catch (error) {
        return error
    }

}

const createPurchaseCanceled= async (orderId) => {
    let updated;
    try {
        updated = await PurchaseOrder.update({
            paymentStatus: "canceled",
        },{
            where:{
                orderId,
            }
        })
        return updated; 
    } catch (error) {
        return error
    }
}

module.exports = {
    createPurchaseOrder,
    createPurchaseCompleted,
    createPurchaseCanceled
}