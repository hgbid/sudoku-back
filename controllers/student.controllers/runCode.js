const logger = require("../../utils/logger");
const { spawn } = require("child_process");
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

function serialize(data) {
  return JSON.stringify(data).replace(/null/g, "None");
}

exports.runCode = async (req, res) => {
  const script = req.body.script;
  const input = req.body.input;
  logger.info("run code called");

  const pythonProcess = spawn("python", ["-c", script]);
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
