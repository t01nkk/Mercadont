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

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    /*
        const cat = await Category.create({name:"Testing"})
        const test1 = await Product.create({
            name: "Test1",
            price: 100,
            description: "Test Product",
            rating: 5,
            image: null,
            stock: 1,
        })

        const test2 = await Product.create({
            name: "Test2",
            price: 10,
            description: "Test Product 2",
            rating: 1,
            image: null,
            stock: 1,
        })

        const test3 = await Product.create({
            name: "Test3",
            price: 10,
            description: "Test Product 3",
            rating: 5,
            image: null,
            stock: 1,
        })
*/
    console.log(`I stand ready at ${process.env.PORT}`); // eslint-disable-line no-console
  });
});
