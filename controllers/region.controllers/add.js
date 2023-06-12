const logger = require("../../utils/logger");
const { Region } = require("../../models/models");

exports.addRegion = async (req, res) => {
  logger.info("add region called");

  try {
    const regionData = req.body;
    const region = new Region(regionData);
    await region.save();
    logger.info("Region added successfully");
    res.status(201).send("Region added successfully");
  } catch (error) {
    logger.error(error.stack);
    res.status(500).send("Error adding region");
  }
};
