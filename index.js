const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

//Connect DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("mongoDB is connected!"))
    .catch((err) => console.log(err));

//Middleware
app.use(express.json());
app.use(cors());

//Route
app.use("/banners", require("./routes/Banner"));
app.use("/categories", require("./routes/Categories"));
app.use("/pages", require("./routes/PagesData"));
app.use("/auth", require("./routes/Auth"));

app.listen(5000, () => {
    console.log("The Server is running...");
});