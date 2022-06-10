const { PurchaseOrder } = require("../db");

const createPurchaseOrder = async (orderId,userId,local,amount,status) => {
    let created;
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
    return created;
}

const createPurchaseCompleted = async (orderId) => {
    let updated;
    await PurchaseOrder.update({
        paymentStatus: "completed",
    },{
        where:{
            orderId,
        }
    })
    return updated;
}

const createPurchaseCanceled= async (orderId) => {
    let updated;
    await PurchaseOrder.update({
        paymentStatus: "canceled",
    },{
        where:{
            orderId,
        }
    })
    return updated;
}

module.exports = {
    createPurchaseOrder,
    createPurchaseCompleted,
    createPurchaseCanceled
}