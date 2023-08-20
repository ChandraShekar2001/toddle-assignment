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
    const teacherId = req.user.id;
    console.log(teacherId);
    let { publishedAt, attachmentType, url, description, taggedStudents } =
      req.body;
    if (attachmentType === "4" && !url) {
      return res.status(400).json({
        success: false,
        message: "Missing parameter url",
      });
    }
    const file = req.file;
    console.log(file);
    //attachmentType == 4 indicated it is a url
    //so we dont have to upload it to firebase as it is already a link
    if (attachmentType !== "4") {
      const storageRef = ref(storage, file.originalname);
      await uploadBytes(storageRef, file.buffer);
      url = await getDownloadURL(storageRef);
    }
    const result = await db("journal").returning("journalId").insert({
      teacherId,
      publishedAt,
      attachmentType,
      attachmentLink: url,
      description,
    });
    // console.log(result);
    const insertedJournalId = result[0].journalId;

    // console.log(journalinsert);
    const tagsData = taggedStudents
      .split(",")
      .map(Number)
      .map((studentId) => {
        return { journalId: insertedJournalId, studentId };
      });

    await db("tags").returning("studentId").insert(tagsData);

    res.status(200).json({
      success: true,
      message: "Journal creation successfull",
      data: {
        publishedAt,
        attachmentType,
        url,
        description,
        taggedStudents,
      },
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
    const journals = await db("journal");
    res.status(200).json({
      success: true,
      journals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//update journal
exports.updateJournal = async (req, res) => {
  try {  
    const journalId = req.params.id;
    let updateData = { ...req.body };

    //check if we are updating a file
    if (req.file) {
      const storageRef = ref(storage, req.file.originalname);
      await uploadBytes(storageRef, req.file.buffer);
      url = await getDownloadURL(storageRef);
      updateData = { ...updateData, attachmentLink: url };
    }
    
    //check if we are updating the tags of the journal
    if (req.body.taggedStudents) {
      //delete previous students
      await db('tags').del().where({journalId});

      //add new students
      const tagsData = req.body.taggedStudents
        .split(",")
        .map(Number)
        .map((studentId) => {
          return { journalId, studentId };
        });

      await db("tags").returning("studentId").insert(tagsData);

      //delete tagged students from updateData because it is not required to be put in journal table
      delete updateData.taggedStudents;
    }


    await db("journal")
      .returning("journalId")
      .where("journalId", journalId)
      .update(updateData);
   
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
    await db("journal").del().where({ journalId });

    res.status(200).json({
      success: true,
      message: "Deletion successfull.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
