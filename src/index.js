const express = require("express");
const path = require("path");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const { send } = require("process");
const app = express();
const port = 3000;
const route = require("./routes/");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

const db = require("./config/db");
//Connect to DB
db.connect();
//HTTP logger
app.use(morgan("combined"));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

//Template engine
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
        },
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

//Route Init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`); //http://localhost:3000/
    console.log("Path: ", path.join(__dirname));
});
