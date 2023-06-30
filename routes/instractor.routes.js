const express = require("express");
const router = express.Router();

const { addInstr } = require("../controllers/instractor.controllers/add");
const { getInst } = require("../controllers/instractor.controllers/get");

router.post("/add", addInstr);
router.get("/get", getInst);

module.exports = router;
