const express = require("express");
const router = express.Router();

const { addStudent } = require("../controllers/student.controllers/add");
const { runCode } = require("../controllers/student.controllers/runCode");
//const { runCode } = require("../controllers/student.controllers/TESTrunCode");
const { getStudents } = require("../controllers/student.controllers/get");
const { getPass } = require("../controllers/student.controllers/getPass");

router.post("/add", addStudent);
router.post("/run", runCode);
router.get("/get", getStudents);
router.get("/getPass", getPass);

module.exports = router;
