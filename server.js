const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const dotenv = require('dotenv')
const PORT = process.env.PORT || 7000;

// Use .env file in config folder
dotenv.config({ path: "./config/.env" });

// Connect to Database
connectDB();

// Using EJS for views
app.set("view engine", "ejs");

// Static Folder
app.use(express.static("public"));

// Body Parsing
app.use(express.urlencoded({  extended: false }));
app.use(express.json());

// Logging
app.use(logger("dev"));

// Use forms for put/delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );

// Use flash messages for errors, info, etc...
app.use(flash());

// Setup Routes for which the server is listening
app.use("/", mainRoutes);

// Server running
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}, you better catch it!`);
});