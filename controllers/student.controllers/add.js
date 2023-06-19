const logger = require("../../utils/logger");
const { Student, Instructor } = require("../../models/models");

exports.addStudent = async (req, res) => {
  logger.info("add student called");

  try {
    const studentData = req.body;
    const task = studentData.task;
    let student = await Student.findOne({ name: studentData.name });

    if (student) {
      let sumbits = student.sumbits.find((sumbit) => sumbit.task === task);
      if (sumbits) {
        sumbits.data.push({
          code: studentData.code,
          date: new Date().toISOString(),
          pass: studentData.pass,
        });
      } else {
        student.sumbits.push({
          task: task,
          data: [
            {
              code: studentData.code,
              date: new Date().toISOString(),
              pass: studentData.pass,
            },
          ],
        });
      }
      await student.save();
      logger.info("Sumbit added successfully");
    } else {
      student = new Student({
        ...studentData,
        sumbits: [
          {
            task: task,
            data: [
              {
                code: studentData.code,
                date: new Date().toISOString(),
                pass: studentData.pass,
              },
            ],
          },
        ],
      });
      await student.save();

      await Instructor.findByIdAndUpdate(
        student.instructor,
        { $push: { students: student._id } },
        { new: true, useFindAndModify: false }
      );
      logger.info("Student added successfully");
    }

    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    logger.error(error.stack);
    res.status(500).json({ message: "Error adding student" });
  }
};
