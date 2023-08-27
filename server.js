const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();

const app = express();

//db
console.log(process.env.DATABASE);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connect"))
  .catch((err) => console.log("DB Error", err));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

//auto load routes
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

const port = process.env.PORT || 8001;

app.listen(port, () => console.log(`Server Running on port ${port}`));
