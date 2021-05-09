require("dotenv").config();
const express = require("express");
const app = express();
let sequelize = require("./db");
const bcrypt = require('bcryptjs');

var user = require("./controllers/usercontroller");
var project = require("./controllers/projectcontroller");

// sequelize.sync();

sequelize.sync({ force: true }).then(() => {
  const User = require("./db").import("./models/user");
  // CREATE BUILT IN ADMIN USER WHEN NO USERS EXIST
  User.count().then((numberOfUsers) => {
    console.log(numberOfUsers);
    if (numberOfUsers === 0) {
      User.create({
        firstname: process.env.DEFAULT_ADMIN,
        lastname: process.env.DEFAULT_ADMIN,
        username: process.env.DEFAULT_ADMIN,
        email: process.env.DEFAULT_ADMIN_EMAIL,
        password: bcrypt.hashSync(process.env.DEFAULT_ADMIN_PASSWORD, 13),
        isAdmin: true,
      });
    }
  });
});

app.use(require("./middleware/headers"));

app.use(express.json());

app.use("/user", user);
app.use("/project", project);

app.listen(process.env.PORT, function () {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
