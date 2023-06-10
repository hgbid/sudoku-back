const express = require("express");
const router = express.Router();

const { addInstr } = require("../controllers/instractor.controllers/add");

router.post("/add", addInstr);

module.exports = router;
