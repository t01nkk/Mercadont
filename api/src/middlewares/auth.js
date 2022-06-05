const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { User } = require("../db");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // console.log(email, password, "EMAIL, PASS");
        const user = await User.findOne({ where: { email: email } });
        // console.log(user, "HERE BE USER IF FOUND");
        if (!user) {
          return done(null, false);
        }
        const isCompared = await bcrypt.compare(password, user.password);

        if (!isCompared) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.log({ msg: err.message });
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const UserId = await User.findByPk(id); // lo busacamos en la base de datos
    done(null, UserId); // devolvemos el usuario
  } catch (err) {
    done(err);
  }
});
