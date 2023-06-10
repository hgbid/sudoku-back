const express = require("express");
const router = express.Router();

const { addRegion } = require("../controllers/region.controllers/add");
const { getAllRegions } = require("../controllers/region.controllers/get");
const { getInst } = require("../controllers/region.controllers/getInst");

router.post("/add", addRegion);
router.get("/get", getAllRegions);
router.get("/getInst/:regionId", getInst);

module.exports = router;
