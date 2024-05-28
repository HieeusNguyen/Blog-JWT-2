const newsRouter = require("./news");
const siteRouter = require("./site");
const courseRouter = require("./course");
const meRouter = require("./me");
const authRouter = require("./auth")
const bikeRouter = require("./bike")
const { requireAuth, checkUser } = require("../middlewares/UserMiddlewares");
const cartRouter = require("./cart")
const invoiceRouter = require("./invoice")

function route(app) {
    app.get('*', checkUser);
    app.use("/auth", authRouter)
    app.use("/collection", bikeRouter)
    app.use("/news",requireAuth, newsRouter);
    app.use("/courses", courseRouter);
    app.use("/me", meRouter);
    app.use("/cart", cartRouter);
    app.use('/invoice', invoiceRouter)
    app.use("/", siteRouter);
}

module.exports = route;
