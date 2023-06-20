const logger = require("../../utils/logger");
const { spawn } = require("child_process");

function serialize(data) {
  return JSON.stringify(data).replace(/null/g, "None");
}

exports.runCode = async (req, res) => {
  const script = req.body.script;
  const input = req.body.input;
  logger.info("run code called");

  const pythonProcess = spawn("python", [__dirname + "/script2.py"]);

  let output = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    output += data.toString();
  });

  const timeout = 10000;
  const timeoutId = setTimeout(() => {
    pythonProcess.kill();
    res.status(500).json({ error: "Timeout" });
  }, timeout);

  pythonProcess.on("close", (code) => {
    clearTimeout(timeoutId);
    logger.info("run code return output");
    res.json({ output });
  });

  if (input) {
    const inputString = serialize(input);
    pythonProcess.stdin.write(inputString);
    pythonProcess.stdin.end();
  }
};
