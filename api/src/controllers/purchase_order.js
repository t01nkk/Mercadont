const { PurchaseOrder } = require("../db");

const createPurchaseOrder = async (orderId,userId,local,status) => {
    let created;
    for(let product of local){
        created = await PurchaseOrder.create({
            orderId,
            userId,
            productId: product.id,
            productQuantity: product.quantity,
            status
        })
    }
    return created;
}

const createPurchaseCompleted = async (orderId) => {
    let updated;
    await PurchaseOrder.update({
        status: "completed",
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
        status: "canceled",
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