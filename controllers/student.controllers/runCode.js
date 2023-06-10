const logger = require("../../utils/logger");
const { spawn } = require("child_process");

function serialize(data) {
  return JSON.stringify(data).replace(/null/g, "None");
}

exports.runCode = async (req, res) => {
  const script = req.body.script;
  const input = req.body.input;
  console.log(input);
  logger.info("run code called");

  const pythonProcess = spawn("python", ["-c", script]);

  let output = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.on("close", (code) => {
    logger.info("run code return output");

    res.send(output);
  });

  if (input) {
    const inputString = serialize(input);
    pythonProcess.stdin.write(inputString);
    pythonProcess.stdin.end();
  }
};
