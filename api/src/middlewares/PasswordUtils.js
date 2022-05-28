const bcrypt = require('bcryptjs');
/*-------------------------------------------------- */
/*------Funcion para Hash contraseñas----- */
function genPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(15));
}
/*-------------------------------------------------- */
/*------Authorizacion de usuarios------------------ */
function auth(req, res, next) {
    // return req.isAuthenticated()? next() : res.redirect('/login')
    // console.log(req.session);
    console.log(req.isAuthenticated());
    return req.isAuthenticated() ? next() : res.send({ msg: "You're not authenticated" })
}
module.exports = {
    genPassword,
    auth
}