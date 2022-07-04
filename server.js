const express = require("express");
const path = require("path");
const dotenv = require('dotenv');

const app = express();
const port = 4567;

dotenv.config( {path: './.env'} );

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory))
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/user", require("./routes/user"));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
