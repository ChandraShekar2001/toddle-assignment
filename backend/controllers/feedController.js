const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

exports.teacherFeed = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const teacherFeed = await db("journal")
      .where("journal.teacherId", teacherId)
      .select("description", "attachmentLink", "publishedAt", "journalId");
    res.status(200).json({
      success: true,
      message: "Teacher feed fetched",
      teacherFeed,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

exports.studentFeed = async (req, res, next) => {
    try {
        const studentId = req.user.id;
        const studentFeed = await db("tags")
            .where("tags.studentId", studentId)
            .join("journal", "journal.journalId", "=", "tags.journalId")
            .select(
                "tags.studentId",
                "journal.description",
                "journal.attachmentLink",
                "journal.publishedAt",
                "journal.journalId",
            );

        const filteredStudentFeed = studentFeed.filter((feed) => {
            if (new Date() >= new Date(feed.publishedAt)) return feed;
        });

        res.status(200).json({
            success: true,
            message: "Student feed fetched",
            studentFeed: filteredStudentFeed,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};
