const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./connectToDB");
const { routes } = require("./routes");
const logger = require("./utils/logger");
const logIpMiddleware = require("./middleware/ipLog.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(logIpMiddleware);
app.use("/student", routes.student);
app.use("/inst", routes.instr);
app.use("/region", routes.region);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info("Starting the progarm");
  connectToDB();
  console.log(`Listening at http://localhost:${port}`);
});
