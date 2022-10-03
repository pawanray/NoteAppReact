const express = require('express');
const { getNotes, createNote, getNoteById, updateNoteById, deleteNoteById } = require('../controlers/noteControler');
const { protect } = require('../middlewares/authMiddleware');

const router= express.Router();

router.route('/').get(protect,getNotes);
router.route('/create').post(protect,createNote);
router.route("/:_id").get(getNoteById).put(protect,updateNoteById).delete(protect,deleteNoteById);

module.exports = router;