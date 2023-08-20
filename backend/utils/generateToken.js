const jwt = require("jsonwebtoken");

exports.generateAndSendToken = async (id, role, res) => {
  const payload = {
    id,
    role,
  };
  const token = jwt.sign(payload, "ABCDEFGHIJK", {
    expiresIn: 1000*60*60*24,
  });

  res.status(200).json({
    success: true,
    message: "Please store this token for accessing the APIs of the project.",
    token,
  });
};
