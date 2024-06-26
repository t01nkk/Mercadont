const { Product, PurchaseOrder } = require('../db');

const modifyStockStripe = async (local) => {
    let updateProduct;
    try {
        for (let i = 0; i < local.length; i++) {
            const findProduct = await Product.findByPk(local[i].id);

            if (
                findProduct.stock <= 0 ||
                findProduct.stock - local[i].quantity < 0
            ) {
                return false;
            }

            if (findProduct.stock - local[i].quantity > 0) {
                updateProduct = await Product.update(
                    { stock: findProduct.stock - local[i].quantity },
                    { where: { id: local[i].id } }
                );
            }

            if (findProduct.stock - local[i].quantity === 0) {
                updateProduct = await Product.update(
                    {
                        stock: findProduct.stock - local[i].quantity,
                        status: 'inactive',
                    },
                    { where: { id: local[i].id } }
                );
            }
        }
        return updateProduct;
    } catch (error) {
        return error.message;
    }
};

const modifyStockPaypal = async (orderId) => {
    try {
        const findProducts = await PurchaseOrder.findAll({
            where: {
                orderId,
            },
        });
        for (let product of findProducts) {
            const findProduct = await Product.findByPk(
                product.dataValues.productId
            );

            if (
                findProduct.stock <= 0 ||
                findProduct.stock - product.dataValues.productQuantity < 0
            ) {
                return false;
            }

            if (findProduct.stock - product.dataValues.productQuantity > 0) {
                updateProduct = await Product.update(
                    {
                        stock:
                            findProduct.stock -
                            product.dataValues.productQuantity,
                    },
                    { where: { id: product.dataValues.productId } }
                );
            }

            if (findProduct.stock - product.dataValues.productQuantity === 0) {
                updateProduct = await Product.update(
                    {
                        stock:
                            findProduct.stock -
                            product.dataValues.productQuantity,
                        status: 'inactive',
                    },
                    { where: { id: product.dataValues.productId } }
                );
            }
        }
        return { msg: 'stock updated' };
    } catch (error) {
        return error;
    }
};

const reStockOrderCancelled = async (orderId) => {
    let updateProduct;
    try {
        const findProducts = await PurchaseOrder.findAll({
            where: { orderId },
        });

        for (let product of findProducts) {
            const findProduct = await Product.findByPk(
                product.dataValues.productId
            );
            if (findProduct.status === 'inactive') {
                updateProduct = await Product.update(
                    {
                        stock:
                            findProduct.stock +
                            product.dataValues.productQuantity,
                        status: 'active',
                    },
                    { where: { id: product.dataValues.productId } }
                );
            } else {
                updateProduct = await Product.update(
                    {
                        stock:
                            findProduct.stock +
                            product.dataValues.productQuantity,
                    },
                    { where: { id: product.dataValues.productId } }
                );
            }
        }
        return { msg: 'stock updated' };
    } catch (error) {
        return error;
    }
};

function validateInputProduct(
    name,
    price,
    description,
    image,
    stock,
    categories
) {
    let errors = [];
    if (!name || name.length > 60) errors.push('Name is not valid');
    if (!image) errors.push('Please, add at least one image of the product');
    if (!description) errors.push('Description is not valid');
    if (typeof stock !== 'number' || stock < 0)
        errors.push('Stock is not valid');
    if (typeof price !== 'number' || price <= 0)
        errors.push('Price is not valid');
    if (!categories?.length)
        errors.push(
            'Please, add at least one category that the product belongs to'
        );
    return errors;
}

const calcProdRating = async (rating, prod) => {
    let sum = parseInt(rating);
    let count = 1;
    prod.reviews.map((review) => {
        sum += review.rating;
        ++count;
    });
    await Product.update(
        {
            rating: Number(sum / count).toFixed(2),
        },
        {
            where: {
                id: prod.id,
            },
        }
    );
};

function groupPurchaseOrders(purchaseOrders) {
    let orders = [];
    let order = {
        orderNumber: '',
        date: '',
        products: [],
        amount: 0,
        orderStatus: '',
        review: false,
        user: '',
        deliveryAddress: '',
    };

    for (let item of purchaseOrders) {
        if (order.orderNumber === item.orderId) {
            order.products.push({
                product: item.productId,
                productQuantity: item.productQuantity,
            });
        } else {
            if (order.orderNumber !== '') orders.push(order);
            order = {
                orderNumber: '',
                date: '',
                products: [],
                amount: 0,
                orderStatus: '',
                review: false,
                user: '',
                deliveryAddress: '',
            };
            order.user = item.userId;
            order.orderNumber = item.orderId;
            order.date = item.date;
            order.amount = item.totalAmount;
            order.orderStatus = item.orderStatus;
            order.review = item.review;
            order.products.push({
                product: item.productId,
                productQuantity: item.productQuantity,
            });
            order.deliveryAddress = `${item.country},${item.province},${item.city},${item.street},${item.postalCode}`;
        }
    }
    orders.push(order);
    return orders;
}

module.exports = {
    calcProdRating,
    validateInputProduct,
    modifyStockStripe,
    modifyStockPaypal,
    reStockOrderCancelled,
    groupPurchaseOrders,
};
