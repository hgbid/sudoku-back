const { Instructor } = require("../../models/models");
const logger = require("../../utils/logger");

exports.getInst = async (req, res) => {
  logger.info("get instructors called");

  try {
    const instructors = await Instructor.find().populate("region");
    const instructorList = instructors.map((instructor) => ({
      id: instructor._id,
      name: instructor.name,
      region: instructor.region.name,
      regionId: instructor.region._id,
    }));
    logger.info("Instructors returned successfully");
    res.status(200).json(instructorList);
  } catch (error) {
    logger.error(error.stack);
    res.status(500).send("Error retrieving instructors");
  }
};
