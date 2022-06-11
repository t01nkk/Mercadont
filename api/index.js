// ░░█▀░░░░░░░░░░░▀▀███████░░░░
// ░░█▌░░░░░░░░░░░░░░░▀██████░░░
// ░█▌░░░░░░░░░░░░░░░░███████▌░░
// ░█░░░░░░░░░░░░░░░░░████████░░
// ▐▌░░░░░░░░░░░░░░░░░▀██████▌░░
// ░▌▄███▌░░░░▀████▄░░░░▀████▌░░
// ▐▀▀▄█▄░▌░░░▄██▄▄▄▀░░░░████▄▄░
// ▐░▀░░═▐░░░░░░══░░▀░░░░▐▀░▄▀▌▌
// ▐░░░░░▌░░░░░░░░░░░░░░░▀░▀░░▌▌
// ▐░░░▄▀░░░▀░▌░░░░░░░░░░░░▌█░▌▌
// ░▌░░▀▀▄▄▀▀▄▌▌░░░░░░░░░░▐░▀▐▐░
// ░▌░░▌░▄▄▄▄░░░▌░░░░░░░░▐░░▀▐░░
// ░█░▐▄██████▄░▐░░░░░░░░█▀▄▄▀░░
// ░▐░▌▌░░░░░░▀▀▄▐░░░░░░█▌░░░░░░
// ░░█░░▄▀▀▀▀▄░▄═╝▄░░░▄▀░▌░░░░░░
// ░░░▌▐░░░░░░▌░▀▀░░▄▀░░▐░░░░░░░
// ░░░▀▄░░░░░░░░░▄▀▀░░░░█░░░░░░░
// ░░░▄█▄▄▄▄▄▄▄▀▀░░░░░░░▌▌░░░░░░
// ░░▄▀▌▀▌░░░░░░░░░░░░░▄▀▀▄░░░░░
// ▄▀░░▌░▀▄░░░░░░░░░░▄▀░░▌░▀▄░░░
// ░░░░▌█▄▄▀▄░░░░░░▄▀░░░░▌░░░▌▄▄
// ░░░▄▐██████▄▄░▄▀░░▄▄▄▄▌░░░░▄░
// ░░▄▌████████▄▄▄███████▌░░░░░▄
// ░▄▀░██████████████████▌▀▄░░░░
// ▀░░░█████▀▀░░░▀███████░░░▀▄░░
// ░░░░▐█▀░░░▐░░░░░▀████▌░░░░▀▄░
// ░░░░░░▌░░░▐░░░░▐░░▀▀█░░░░░░░▀
// ░░░░░░▐░░░░▌░░░▐░░░░░▌░░░░░░░

const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Product, Category } = require("./src/db");
const { getProducts, getUsers } = require("./src/middlewares/middlewares");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    await getProducts();
    // await getUsers();
    console.log("%s Happy Hacking! UWU :3"); // eslint-disable-line no-console
  });
});
