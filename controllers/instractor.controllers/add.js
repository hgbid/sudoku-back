const logger = require("../../utils/logger");
const { Instructor, Region } = require("../../models/models");

exports.addInstr = async (req, res) => {
  logger.info("add insrtactor called");

  try {
    const instructorData = req.body;
    const instructor = new Instructor(instructorData);
    await instructor.save();

    await Region.findByIdAndUpdate(
      instructor.region,
      { $push: { instructors: instructor._id } },
      { new: true, useFindAndModify: false }
    );
    logger.info("Instructor added successfully");
    res.status(201).send({ massage: "Instructor added successfully" });
  } catch (error) {
    logger.error("Error adding instructor");
    res.status(500).send("Error adding instructor");
  }
};
