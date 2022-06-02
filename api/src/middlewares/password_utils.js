const bcrypt = require("bcryptjs");
/*-------------------------------------------------- */
/*------Funcion para Hash contraseñas----- */
function genPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(15));
}
/*-------------------------------------------------- */
/*------Authorizacion de usuarios------------------ */
function auth(req, res, next) {
  return req.isAuthenticated() ? next() : res.send(req.user);
}
module.exports = {
  genPassword,
  auth,
};
