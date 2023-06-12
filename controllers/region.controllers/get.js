const { Region } = require("../../models/models");
const logger = require("../../utils/logger");

exports.getAllRegions = async (req, res) => {
  logger.info("get regions called");

  try {
    const regions = await Region.find();
    const regionList = regions.map((region) => ({
      id: region._id,
      name: region.name,
    }));
    logger.info("Regions return successfully");
    res.status(200).json(regionList);
  } catch (error) {
    logger.error(error.stack);
    res.status(500).send("Error retrieving regions");
  }
};
