const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);
const { handleDatabaseError } = require("../utils/handleDatabaseErrors");
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
      const result = await handleDatabaseError(
        async () => await db("teacher").where({ teacher_name: name })
      );
      if (result.length > 0) {
        const tid = result[0].tid;
        const dbPassword = result[0].teacher_pwd;
        console.log(dbPassword);
        if (dbPassword !== password) {
          return res.status(401).json({
            success: false,
            message: "The password you entered is incorrect.",
          });
        }
        generateAndSendToken(tid, "teacher", res);
      } else {
        const result = await handleDatabaseError(
          async () =>
            await db("teacher").returning("tid").insert({
              teacher_name: name,
              teacher_pwd: password,
            })
        );
        const newId = result[0].tid;
        generateAndSendToken(newId, "teacher", res);
      }
    } else {
      const result = await handleDatabaseError(
        async () => await db("student").where({ student_name: name })
      );
      if (result.length > 0) {
        const id = result[0].sid;
        const dbPassword = result[0].student_pwd;
        if (dbPassword !== password) {
          return res.status(401).json({
            success: false,
            message: "The password you entered is incorrect.",
          });
        }
        generateAndSendToken(id, "student", res);
      } else {
        const result = await handleDatabaseError(
          async () =>
            await db("student").returning("sid").insert({
              student_name: name,
              student_pwd: password,
            })
        );
        const newId = result[0].sid;
        generateAndSendToken(newId, "student", res);
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
