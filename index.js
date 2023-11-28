const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());

app.use(cors());

//available route

app.listen(port, () => {
  console.log(`meet-tech library listening at http://localhost:${port}`);
});
