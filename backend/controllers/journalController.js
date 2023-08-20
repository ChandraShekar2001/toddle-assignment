const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);
const firebase = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { handleDatabaseError } = require("../utils/handleDatabaseErrors");

const firebaseConfig = {
  apiKey: "AIzaSyDs56M_Z_t9ee42kF0EWDZGTXwAUFnmQzs",
  authDomain: "toddle-fb730.firebaseapp.com",
  projectId: "toddle-fb730",
  storageBucket: "toddle-fb730.appspot.com",
  messagingSenderId: "512778740813",
  appId: "1:512778740813:web:eff6c69dfc80a084d8e804",
  measurementId: "G-FC07FMG5R4",
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

//creating a journal
exports.createJournal = async (req, res) => { 
  try {
    const tid = req.user.id;
    let {
      published_at,
      attachment_type,
      url,
      description,
      taggedStudents,
    } = req.body;

    const file = req.file;
    //attachment_type == 4 indicated it is a url
    //so we dont have to upload it to firebase as it is already a link
    if (attachment_type !== "4") {
      const storageRef = ref(storage, file.originalname);
      await uploadBytes(storageRef, file.buffer);
      url = await getDownloadURL(storageRef);
    }

    const result = await handleDatabaseError(
      async () =>
        await db("journal").returning('jid').insert({
          tid,
          published_at,
          attachment_type,
          attachment: url,
          description,
        })
    );
    // console.log(result);
    const journalinsert = result[0];

    // console.log(journalinsert);

    const tagsdata = taggedStudents
      .split(",")
      .map(Number)
      .map((studentId) => {
        return { jid: journalinsert.jid, sid: studentId };
      });

    await handleDatabaseError(
      async () => await db("tags").returning("sid").insert(tagsdata)
    );
    res.status(200).json({
      success: true,
      message: "Journal creation successfull",
      attachment_url: url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// reading journals
exports.getJournals = async (req, res, next) => {
  try {
    const journals = await handleDatabaseError(async () => await db("journal"));
    res.status(200).json({
      success: true,
      journals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

//update journal
exports.updateJournal = async (req, res, next) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      const storageRef = ref(storage, req.file.originalname);
      await uploadBytes(storageRef, req.file.buffer);
      url = await getDownloadURL(storageRef);
      updateData = { ...updateData, attachment: url };
    }

    const journalId = req.params.id;
    await handleDatabaseError(async () => {
      await db("journal")
        .returning("jid")
        .where("jid", journalId)
        .update(updateData);
    });

    res.status(200).json({
      success: true,
      message: `Journal with id ${journalId} updated`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete journal
exports.deleteJournal = async (req, res, next) => {
  try {
    const journalId = req.params.id;
    await handleDatabaseError(
      async () => await db("journal").del().where({ jid: journalId })
    );

    res.status(200).json({
      success: true,
      message: "Deletion successfull.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
