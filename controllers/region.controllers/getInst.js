const logger = require("../../utils/logger");
const { Region } = require("../../models/models");

exports.getInst = async (req, res) => {
  logger.info("get inst by region called");

  try {
    const regionId = req.params.regionId;
    const region = await Region.findById(regionId).populate("instructors");
    if (!region) {
      res.status(404).send("Region not found");
    } else {
      const instructors = region.instructors.map((instructor) => ({
        id: instructor._id,
        name: instructor.name,
      }));
      logger.info("Retrieving instructors successfully");
      res.status(200).json(instructors);
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error retrieving instructors");
  }
};
