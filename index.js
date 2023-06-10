const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./connectToDB");
const { routes } = require("./routes");
const logger = require("./utils/logger");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/student", routes.student);
app.use("/inst", routes.instr);
app.use("/region", routes.region);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info("Starting the progarm");
  connectToDB();
  console.log(`Listening at http://localhost:${port}`);
});

/*
const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(bodyParser.json());

app.post("/run-script", (req, res) => {
  const script = req.body.script;
  const input = req.body.input;
  console.log(input);
  const pythonProcess = spawn("python", ["-c", script]);

  let output = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.on("close", (code) => {
    res.send(output);
  });

  if (input) {
    const inputString = serialize(input);
    pythonProcess.stdin.write(inputString);
    pythonProcess.stdin.end();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

function serialize(data) {
  return JSON.stringify(data).replace(/null/g, "None");
}
*/
