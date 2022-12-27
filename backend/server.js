const express = require("express");
const cors = require("cors");
const userRoutes = require("./app/routes/users-routes");
const accountRoutes = require("./app/routes/account-routes");

const app = express();
const port = 4000;
app.use(express.json());
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api/user", userRoutes);
app.use("/api/account", accountRoutes);


app.listen(port, () => console.log(`app listening on port ${port}`));
