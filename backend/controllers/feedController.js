const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

exports.teacherFeed = async (req, res) => {
  try {
    const tid = req.user.id;
    console.log(tid);
    const teacherFeed = await db("journal")
      .where("journal.tid", tid)
      .select("description", "attachment", "published_at");
    res.status(200).json({
      success: true,
      message: "Teacher feed fetched",
      teacherFeed,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error,
    });
  }
};

exports.studentFeed = async (req, res, next) => {
    try {
        const sid = req.user.id;
        console.log(sid);
        const studentfeed = await db("tags")
            .where("tags.sid", sid)
            .join("journal", "journal.jid", "=", "tags.jid")
            .select(
                "tags.sid",
                "journal.description",
                "journal.attachment",
                "journal.published_at"
            );

        const feedforstudent = studentfeed.filter((feed) => {
            if (new Date() >= new Date(feed.published_at)) return feed;
        });

        res.status(200).json({
            success: true,
            message: "Student feed fetched",
            feedforstudent,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error,
        });
    }
};
