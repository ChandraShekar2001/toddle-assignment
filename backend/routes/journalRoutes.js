const router = require('express').Router();
const multer = require('multer');

const {isAuthenticated, isTeacher} = require('../middleware/auth');
const {createJournal, getJournals, updateJournal, deleteJournal}  = require("../controllers/journalController.js")



const upload = multer({storage: multer.memoryStorage()})

router.route('/journal/new').post(isAuthenticated, isTeacher,upload.single('attachment'), createJournal);

router.route('/journal/all').get(getJournals);

router.route('/journal/update/:id').post(isAuthenticated, isTeacher,upload.single('attachment'), updateJournal)

router.route('/journal/delete/:id').delete(isAuthenticated, isTeacher, deleteJournal)

module.exports = router