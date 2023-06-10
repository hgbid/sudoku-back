const logger = require("../../utils/logger");
const { Student, Instructor } = require("../../models/models");

exports.addStudent = async (req, res) => {
  logger.info("add student called");

  try {
    const studentData = req.body;
    const student = new Student(studentData);
    await student.save();

    // Update the instructor's students
    await Instructor.findByIdAndUpdate(
      student.instructor,
      { $push: { students: student._id } },
      { new: true, useFindAndModify: false }
    );

    logger.info("Student added successfully");
    res.status(201).send("Student added successfully");
  } catch (error) {
    logger.error("Error adding student");
    res.status(500).send("Error adding student");
  }
};
