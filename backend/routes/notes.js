const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE 1 : GET all the notes USING : GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).send("Internal server error");
  }
});

// ROUTE 2 : Add a  new note USING : POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", " Title name must be atleast of 3 characters").isLength({
      min: 3,
    }),
    body("description", "Description must be atleast of 5 charaters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    try {
      // If there are errors, return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log({ error: error.message });
      res.status(400).send("Internal server error");
    }
  }
);

// ROUTE 3 : Update an exixting note USING : Put "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    
  
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  // Find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(404).send("Not Allowed");
  }
  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({"Success":"Note has been updated successfully " , note: note});
  }
  catch (error) {
    console.log({ error: error.message });
    res.status(400).send("Internal server error");
  }
});

// ROUTE 4 : Delete an exixting note USING : DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
 // const { title, description, tag } = req.body;
  try {
    
  
  // Find the note to be delete and delete it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  // Allows deletion only if user owns this note
  if (note.user.toString() !== req.user.id) {
    return res.status(404).send("Not Allowed");
  }
  note = await Note.findByIdAndDelete(
    req.params.id,
  );
  res.json({"Success " : "Note has been deleted", note: note});
  }
  catch (error) {
    console.log({ error: error.message });
    res.status(400).send("Internal server error");
  }
});
module.exports = router;
