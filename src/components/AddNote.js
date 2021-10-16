import React from 'react'
import { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:""})
    
    const handleAdd = (e) =>{
        e.preventDefault(); // page reload na ho submit krne par
        addNote(note.title, note.description, note.tag)
        props.showAlert("Note Added Successfully","success")
        setNote({title:"", description:"", tag:""})
    }

    const onChange =(e) =>{
        //spread operator // jo bhi value note obj k ander hai vo rhe lakin jo properties aage likhi h unhe add/overwrite krna
        setNote({...note, [e.target.name]:e.target.value}) 
    }


    return (
        <div>
            <div className="conatiner my-3">
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" onChange={onChange} name="title" className="form-control" value={note.title} id="title" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" onChange={onChange} name="description" className="form-control" value={note.description} id="description"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" onChange={onChange} name="tag" className="form-control" value={note.tag} id="tag"/>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleAdd}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote;
