const { Student, Instructor } = require("../../models/models");
const logger = require("../../utils/logger");

exports.getPass = async (req, res) => {
  logger.info("get student called");

  try {
    const students = await Student.find()
      .populate({
        path: "instructor",
        select: "city",
      })
      .select("name instructor sumbits")
      .lean();

    const result = students
      .map((student) => {
        const earliestPass = student.sumbits
          .filter((submit) => submit.pass)
          .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

        if (!earliestPass) return null;

        return {
          name: student.name,
          city: student.instructor.city,
          date: earliestPass.date,
        };
      })
      .filter((student) => student !== null);

    logger.info("student responded successfully");
    res.status(200).send(result);
  } catch (error) {
    logger.error(error.stack);
    res.status(500).send("Error getting students");
  }
};
