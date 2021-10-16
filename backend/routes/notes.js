const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1:
//get all the notes using : GET endpoint: "/api/auth/fetchallnotes" .Login required
//yeh hmko notes fetch krke dega ..jo user already loggedin hai
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    //yaha saare notes mil jaayenge //req.user.id fetchuser se aa rhe hai
    console.log(req.user.id)
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 2:
//Add a new note using : POST endpoint: "/api/notes/addnote" .Login required
router.post("/addnote",fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast five characters").isLength({ min: 5 }),
  ],async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are erros, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //ishne true return nhi kiya toh
        return res.status(400).json({ errors: errors.array() }); // hum bad request or eror bhejenge
      }

      //now we will create new note
      const note = new Note({
        title,description,tag,user: req.user.id
      });
      //console.log(req.body.id)
      const savedNote = await note.save(); //jaise hi note save ho jaayega response send kr denge
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3:
// Update note using : POST endpoint: "/api/notes/updatenote" .Login required
router.put("/updatenote/:id",fetchuser,async (req, res) => {
    //body se saari items le aao
    const {title, description, tag} = req.body;
    try {
        //create new note object
        const newNote = {};
        //agr title aa rha h req se toh newNote object me add krdo
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        //find the note to be updated to update it : //yeh req.params.id .. url wali hai
        let note = await Note.findById(req.params.id);
        if(!note){ //agr note hi nhi hai toh
            return res.status(404).send("Not Found")
        }
        //note.user.tostring ish note ki ID dega
        if(note.user.toString() !== req.user.id){ //jo user logged in hai vo kisi or ka note access kr rha h, so we put this
            return res.status(401).send("Not Allowed")
        }

        //{$set:newNote} = nya note set ko dedenge
        //new:true = agr koi nya content aata hai toh vo create ho jaayega
        note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
        res.json({note})
    
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    } 
  })


  //Route 4:
//Delete an existing note using : POST endpoint: "/api/notes/deletenote" .Login required
router.delete("/deletenote/:id",fetchuser,async (req, res) => {
    try {
        //yaha hum verify krenege ki jo insaan delete kr rha h ky yeh note uhsi ka h

        //find the note to be deleted to delete it : //yeh req.params.id .. url wali hai
        let note = await Note.findById(req.params.id); //note ko nikalanege
        if(!note){ //agr note hi nhi hai toh
            return res.status(404).send("Not Found")
        }

        //Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id){ //jo user logged in hai vo kisi or ka note access kr rha h, so we put this
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id) //yeh find krega id or delete krega mere note ko
        res.json({"Success": "Note has been deleted", note:note})
    
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    } 
  })


module.exports = router;
