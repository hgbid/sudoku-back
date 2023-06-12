const logger = require("../../utils/logger");
const { spawn } = require("child_process");

function serialize(data) {
  return JSON.stringify(data).replace(/null/g, "None");
}

exports.runCode = async (req, res) => {
  const script = req.body.script;
  const input = req.body.input;
  logger.info("run code called");

  // Check if the Docker image exists
  const inspectProcess = spawn("docker", ["image", "inspect", "python-runner"]);
  let imageExists = false;
  inspectProcess.on("close", (code) => {
    if (code === 0) {
      imageExists = true;
    }
    if (!imageExists) {
      // Build the Docker image
      const buildProcess = spawn("docker", [
        "build",
        "-t",
        "python-runner",
        ".",
      ]);
      buildProcess.on("close", (code) => {
        if (code !== 0) {
          logger.error("Docker build failed");
          res.status(500).send("Docker build failed");
          return;
        }
        runPythonScript(script, input, res);
      });
    } else {
      runPythonScript(script, input, res);
    }
  });
};

function runPythonScript(script, input, res) {
  // Run the Docker container
  const pythonProcess = spawn("docker", [
    "run",
    "--rm",
    "-i",
    "python-runner",
    "python",
    "-c",
    script,
  ]);

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
}
