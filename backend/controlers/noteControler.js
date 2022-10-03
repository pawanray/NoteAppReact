const asyncHandler = require('express-async-handler');
const Note = require('../models/notesModel');
const mongodb = require('mongodb');
const getNotes = asyncHandler(
    async (req,res)=>{
        try{
            const notes = await Note.find({userId:req.user._id});
            res.json(notes); 
        }
        catch(err){
            res.status(404).json(err);
        }
    }
) 

const createNote = asyncHandler(
    async (req,res)=>{
        const {title,category,content} = req.body;
            const note = new Note({userId:req.user._id,title,category,content});
            const addNote = await note.save();
            res.status(201).json(addNote)
     
    }
) 

const getNoteById = asyncHandler(async (req,res)=>{
        try{
            const note = await Note.findById(req.params._id);
            res.status(200).json(note);
        }
        catch(err){
            res.status(404).json("Note not found");
        }
})

const updateNoteById = asyncHandler(async (req,res)=>{
    try{
         const note = await Note.findById(req.params._id);
        //  console.log("note", note.userId)
        // if(note.userId.toString() !== req.params._id){
        //     res.status(401);
        //     throw new Error('you cannot perform this action')
        // }
        
            const updateNote = await Note.updateOne(
                {_id:req.params._id},
                {$set:req.body}
                );
            res.status(200).json(updateNote);
        
    }
    catch(err){
        res.status(404).json("Note not found");
    }
})

const deleteNoteById = asyncHandler(async (req,res)=>{
    try{
         const note = await Note.findById(req.params._id);
        // if(note.userId.toString() !== req.params._id){
        //     res.status(401);
        //     throw new Error('you cannot perform this action')
        // }
       
            console.log('aaaa')
            await Note.deleteOne({_id:mongodb.ObjectId(req.params._id)});
            res.status(200).json({message:"Note Deleted"});
        
    }
    catch(err){
        res.status(404).json("Note not found");
    }
})



module.exports = {getNotes,createNote,getNoteById, updateNoteById, deleteNoteById }