const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./connectToDB");
const { routes } = require("./routes");
const logger = require("./utils/logger");
const logIpMiddleware = require("./middleware/ipLog.js");



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors());
app.use(cors({ origin: "http://localhost:5173" }));

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
