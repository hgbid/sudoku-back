const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./connectToDB");
const { routes } = require("./routes");
const logger = require("./utils/logger");
const logIpMiddleware = require("./middleware/ipLog.js");

(function () {
  var childProcess = require("child_process");
  var oldSpawn = childProcess.spawn;
  function mySpawn() {
    console.log("spawn called");
    console.log(arguments);
    var result = oldSpawn.apply(this, arguments);
    return result;
  }
  childProcess.spawn = mySpawn;
})();

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
