const { Student } = require("../../models/models");
const logger = require("../../utils/logger");

exports.getPass = async (req, res) => {
  logger.info("get student called");

  try {
    const task = req.query.task;
    const region = req.query.region;
    if (!task) {
      return res.status(400).send("Missing task parameter");
    }

    let students = await Student.find()
      .populate({
        path: "instructor",
        select: "city region",
        populate: {
          path: "region",
          select: "name",
        },
      })
      .select("name instructor sumbits")
      .lean();

    if (region) {
      students = students.filter(
        (student) => student.instructor.region.name === region
      );
    }

    const result = students
      .map((student) => {
        const submit = student.sumbits.find(
          (submit) =>
            submit.task === task && submit.data.some((data) => data.pass)
        );
        if (!submit) return null;

        const earliestPass = submit.data
          .filter((data) => data.pass)
          .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

        return {
          name: student.name,
          city: student.instructor.city,
          date: earliestPass.date,
        };
      })
      .filter((student) => student !== null);

    logger.info("student responded successfully");
    logger.info(result);
    res.status(200).send(result);
  } catch (error) {
    logger.error(error.stack);
    res.status(500).send("Error getting students");
  }
};
