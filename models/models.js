const mongoose = require("mongoose");

const Instructor = mongoose.model(
  "Instructor",
  new mongoose.Schema({
    name: String,
    region: { type: mongoose.Schema.Types.ObjectId, ref: "Region" },
    city: String,
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
    sumbit: [{ code: String, date: String, pass: Boolean }],
  })
);

const Region = mongoose.model(
  "Region",
  new mongoose.Schema({
    name: String,
    manager: String,
    instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Instructor" }],
  })
);
module.exports = { Student, Instructor, Region };
