const { PurchaseOrder } = require("../db");

const purchaseOrder = async (id,userId,local) => {
    for(let product of local){
        await PurchaseOrder.create({
            orderId: id,
            userId: userId,
            productId: product.id,
            productQuantity: product.quantity,
        })
    }
}

module.exports = {
    purchaseOrder
}