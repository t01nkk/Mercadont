const { PurchaseOrder } = require("../db");

const createPurchaseOrder = async (orderId,userId,local,status) => {
    for(let product of local){
        await PurchaseOrder.create({
            orderId,
            userId,
            productId: product.id,
            productQuantity: product.quantity,
            status
        })
    }
}

const createPurchaseCompleted = async (orderId,userId) => {
    await PurchaseOrder.update({
        status: "completed",
    },{
        where:{
            orderId,
            userId
        }
    })
}

const createPurchaseCanceled= async (orderId,userId) => {
    await PurchaseOrder.update({
        status: "canceled",
    },{
        where:{
            orderId,
            userId
        }
    })
}

module.exports = {
    createPurchaseOrder,
    createPurchaseCompleted,
    createPurchaseCanceled
}