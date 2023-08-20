const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);
const { generateAndSendToken } = require("../utils/generateToken");

exports.register = async (req, res, next) => {
  try {
    const { name, password, role } = req.body;

    //basic validation
    if (!name || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please enter all of the name, password and role fields.",
      });
    }

    if (role !== "teacher" && role !== "student") {
      return res.status(400).json({
        success: false,
        message:
          "The value of the role field should be either 'teacher' or 'student.",
      });
    }

    //check if the user exists
    if (role === "teacher") {
      const result = await db("teacher").where({ teacherName: name });
      if (result.length > 0) {
        const teacherId = result[0].teacherId;
        const dbPassword = result[0].teacherPwd;
        console.log(dbPassword);
        if (dbPassword !== password) {
          return res.status(401).json({
            success: false,
            message: "The password you entered is incorrect.",
          });
        }
        generateAndSendToken(teacherId, "teacher", res);
      } else {
        const result = await db("teacher").returning("teacherId").insert({
          teacherName: name,
          teacherPwd: password,
        });

        const newId = result[0].teacherId;
        generateAndSendToken(newId, "teacher", res);
      }
    } else {
      const result = await db("student").where({ studentName: name });

      if (result.length > 0) {
        const id = result[0].studentId;
        const dbPassword = result[0].studentPwd;
        if (dbPassword !== password) {
          return res.status(401).json({
            success: false,
            message: "The password you entered is incorrect.",
          });
        }
        generateAndSendToken(id, "student", res);
      } else {
        const result = await db("student").returning("studentId").insert({
          studentName: name,
          studentPwd: password,
        });

        const newId = result[0].studentId;
        generateAndSendToken(newId, "student", res);
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
