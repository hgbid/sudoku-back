const express = require("express");
const router = express.Router();

const { addInstr } = require("../controllers/instractor.controllers/add");
const { getInst } = require("../controllers/instractor.controllers/get");
const { login } = require("../controllers/instractor.controllers/login");

router.post("/add", addInstr);
router.get("/get", getInst);
router.post("/login", login);

module.exports = router;
