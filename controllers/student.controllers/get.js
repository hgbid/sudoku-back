const { Student, Instructor } = require("../../models/models");
const logger = require("../../utils/logger");

exports.getStudents = async (req, res) => {
  logger.info("get student called");

  try {
    const instructorId = req.query.instId;
    let students;

    if (instructorId) {
      const instructor = await Instructor.findById(instructorId).populate(
        "students"
      );
      students = instructor.students;
    } else {
      students = await Student.find();
    }
    logger.info("student responded successfully");

    res.status(200).send(students);
  } catch (error) {
    logger.error(error.stack);

    res.status(500).send("Error getting students");
  }
};
