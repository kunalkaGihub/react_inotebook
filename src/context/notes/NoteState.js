import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{
    const host = "http://localhost:5000"
    //Example for use context:
            // const s1 = {
            //     "name": "Kunal",
            //     "class": "5b"
            // }

            // const [state, setstate] = useState(s1);
            // const update = () =>{
            //     setTimeout(() => {
            //         setstate({
            //             "name":"Harry",
            //             "class":"c1"
            //         })
            //     }, 1000);
            // }

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    //get all notes
    const getNotes = async () =>{
      //TODO: API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
          // 'Example:auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNjI3ODk1ODkwZTUyMjA0Zjc1YjZiIn0sImlhdCI6MTYzMDk0NTU4Nn0.kAbdtm5jv4o_MRcEZpF-FP0LLShtgOhNPaTDpWQjEtk'
        },
      });
      const json = await response.json() // yeh pased kregi json ko
      console.log(json)
      setNotes(json)
    }

      //const addNote 
      const addNote = async (title, description, tag) =>{
        //TODO: API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            // 'Example:auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNjI3ODk1ODkwZTUyMjA0Zjc1YjZiIn0sImlhdCI6MTYzMDk0NTU4Nn0.kAbdtm5jv4o_MRcEZpF-FP0LLShtgOhNPaTDpWQjEtk'
          },
          body: JSON.stringify({title, description, tag}) //yeh hum body me bhej rhe hai
        });
        const note= await response.json();
        
        setNotes(notes.concat(note))
        //concat return an array where as push updates an array
      }

      //delete notes

      const deleteNote = async(id) =>{
        //TODO: API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            // 'Example:auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNjI3ODk1ODkwZTUyMjA0Zjc1YjZiIn0sImlhdCI6MTYzMDk0NTU4Nn0.kAbdtm5jv4o_MRcEZpF-FP0LLShtgOhNPaTDpWQjEtk'
          },
        });
        const json= response.json();
        console.log(json)

        const newNotes = notes.filter((note)=>  { return note._id !== id})
        setNotes(newNotes)
      }

      //edit note
      const editNote = async (id, title, description, tag) =>{
        //TODO: API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            // 'Example:auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNjI3ODk1ODkwZTUyMjA0Zjc1YjZiIn0sImlhdCI6MTYzMDk0NTU4Nn0.kAbdtm5jv4o_MRcEZpF-FP0LLShtgOhNPaTDpWQjEtk'
          },
          body: JSON.stringify({id, title, description, tag})
        });
        const json= await response.json(); 
        console.log(json)

        //yeh basically note update krne pe frontend pe nhi dikh rha .. ushke liye reload krna pd rha tha
        let newNotes = JSON.parse(JSON.stringify(notes)) //yeh krne se ishki ek deep copy ban jaayegi
        
        //Logic to edit in client side
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes)
      }



    return (
        // jo bhi chz hum provide krni hai ushe value me daaldo or tum context provider ka syntax use kro
        //uske ander jb bhi kuch wrap kroge uske bich me automatically saare children aajayenge.. App.js check kro
        //Example: About.js// <NoteContext.Provider value={{state, update}}>
        
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
