const axios = require("axios");
const { mailPayPal, modifyStockPaypal } = require("../middlewares/middlewares");
const { createPurchaseOrder, createPurchaseCompleted, createPurchaseCanceled } = require("./purchase_order");

const createOrder = async (req, res) => {
  const {purchase_units, user, local} = req.body
  try {
    const order = {
      // intent: "CAPTURE", // Requerido. Es lo que se va a hacer con la compra. Si paga al instante o no.
      // purchase_units: [
      //   //^ Requerido. Es... Bueno, lo que está comprando.
      //   {
      //     amount: {
      //       //^ Requerido.
      //       currency_code: "USD", //Requerido. El código de 3 letras de la moneda en la que se cobra el pago. SIEMPRE es 3 letras. Estándar ISO-4217.
      //       value: "10", //Requerido. Precio total. Y es una string. Ojete al piojete.
      //       //Se puede poner un objeto breakdown: {} para dar más info de todo el pago y bla bla, pero no es requerido.
      //     },
      //     description: "Girasol en rama.", //No requerido. Max: 128 caracteres.
      //   },
      intent: "CAPTURE",
      purchase_units: purchase_units,
      application_context: {
        //No requerido, pero añade un montón de info extra bastante útil, aparte de dos métodos para redireccionar al usuario que son bastante como útiles.
        brand_name: "Mercadon't Libre", //String. 127 max length. Nombre de la marca del sitio en PayPal.
        landing_page: "LOGIN", //ENUM. LOGIN: si acepta el pago lo lleva a la página para loggearse en PP. BILLING: lo lleva a la página para poner la info de tarjeta de crédito/débito en PP. NO_PREFERENCE: dependiendo de si está logeado o no en PP va al login o al billing.
        user_action: "PAY_NOW", //ENUM. CONTINUE: básicamente si el sitio no te dio toda la info porque cosas usar este. Más "confianza", ponele. PAY_NOW: cobrale ahora y que se cague.
        return_url: `${process.env.HOST}${process.env.PORT}/buying/payPal/capture-order`, //Si todo sale bien (acepta el pago) devolvelo a esta página.
        cancel_url: `${process.env.HOST}${process.env.PORT}/buying/payPal/cancel-order`, //Si el muchacho cancela traelo para acá.
      },
    };
    //Sí o sí hay que hacerlo así porque no se puede enviar un "grant-type", "client_credentials" así nomás al segundo argumento de la petición POST.
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
      data: { access_token },
    } = await axios.post(`${process.env.PAYPAL_API}/v1/oauth2/token`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_CLIENT_SECRET,
      },
    });

    const { data } = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    // console.log("purchase_units:", purchase_units)
    // console.log("user:", user)
    // console.log("local:", local)
    // console.log("data:", data.id)
    createPurchaseOrder(data.id,user,local)
    res.status(200).send(data.links[1].href);
  } catch (error) {
    console.log("error:", error)
    return res
      .status(500)
      .send(
        "Nope. Something went wrong while trying to generate the purchase order."
      );
  }
};

const captureOrder = async (req, res) => {
  const { token } = req.query;

  const { data } = await axios.post(
    `${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    {},
    {
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_CLIENT_SECRET,
      },
    }
  );
  // console.log("data in captureOrder:",data)
  // console.log("data.id in captureOrder:",data.id)
  // console.log("data.status in captureOrder:",data.status)
  // console.log("user.datavalues.id in captureOrder:",req.user.dataValues.id)
  createPurchaseCompleted(data.id, req.user.dataValues.id)
  modifyStockPaypal(data.id, req.user.dataValues.id)
  mailPayPal();
  // purchaseOrder(id,userId,local)
  res.status(200).redirect(`http://localhost:3000/home`);
};

const cancelOrder = (req, res) => {
  // console.log("req in cancelOrder:",req)
  // console.log("req.query.token:",req.query.token)
  // console.log("req.route.Route.path:",req.route.Route.path)
  // console.log("user.datavalues.id in captureOrder:",req.user.dataValues.id)
  createPurchaseCanceled(req.query.token,req.user.dataValues.id)
  // res.status(200).send("Pathetic.");
  res.status(200).redirect(`http://localhost:3000/home`);
};

module.exports = {
  createOrder,
  captureOrder,
  cancelOrder,
};
