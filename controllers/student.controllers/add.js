const logger = require("../../utils/logger");
const { Student } = require("../../models/models");

exports.addStudent = async (req, res) => {
  logger.info("add student called");

  try {
    const studentData = req.body;
    let student = await Student.findOne({ name: studentData.name });

    if (student) {
      student.sumbits.push({
        code: studentData.code,
        date: new Date().toISOString(),
        pass: studentData.pass,
      });
      await student.save();
      logger.info("Sumbit added successfully");
    } else {
      student = new Student(studentData);
      await student.save();

      await Instructor.findByIdAndUpdate(
        student.instructor,
        { $push: { students: student._id } },
        { new: true, useFindAndModify: false }
      );
      logger.info("Student added successfully");
    }

    res.status(201).send("Student added successfully");
  } catch (error) {
    logger.error(error.stack);
    res.status(500).send("Error adding student");
  }
};
