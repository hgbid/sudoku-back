const mongoose = require("mongoose");

const Instructor = mongoose.model(
  "Instructor",
  new mongoose.Schema({
    name: String,
    area: String,
    level: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  })
);
const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    name: String,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
    code: String,
    passed: Boolean,
  })
);

module.exports = { Student, Instructor };
