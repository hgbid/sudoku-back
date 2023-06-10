const express = require("express");
const router = express.Router();

const { addStudent } = require("../controllers/student.controllers/add");

router.post("/add", addStudent);

module.exports = router;
