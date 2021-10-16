import React, { useContext, useEffect, useRef, useState }  from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from './AddNote';
import NoteItems from "./NoteItems";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes,getNotes, editNote } = context;

  let history = useHistory();
  
  useEffect(() => {
    if(localStorage.getItem('token')){ //agr token null nhi hai
      
      getNotes(); //toh get notes krunga
    
    }else{
      history.push('/login')  //nhi toh login kro
    }
    // eslint-disable-next-line
  }, [])

  //Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // modal end
  
  const refEdit = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id:"",etitle:"", edescription:"", etag:""})

  const getUpdateNote = (currentNote) =>{
    //ref.toggle(); // javascript syntx to show and hide modal.. yaani agr show ho toh hide ho jaaaye or hide ho toh show
    refEdit.current.click();
    //yeh srf update modal me set krega
    setNote({id:currentNote._id,etitle: currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    
  }

  const handleUpdate = (e) =>{
    //console.log("updating the notes",note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    //edit note databse me fr frontend note uodate krdega
    
    refClose.current.click();
    props.showAlert("Note Updated Successfully","success")
  }

  const onChange =(e) =>{
    //spread operator
    setNote({...note, [e.target.name]:e.target.value})
}

  
  return (
    <React.StrictMode>
    
    {/* AddNote Component */}
    <AddNote showAlert={props.showAlert}/>
    
    <Button ref={refEdit} onClick={handleShow} className="d-none">Modal</Button>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="my-3">
            <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" onChange={onChange} name="etitle" value={note.etitle} className="form-control" id="etitle" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" onChange={onChange} name="edescription" value={note.edescription} className="form-control" id="edescription"/>
            </div>
            <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" onChange={onChange} name="etag" value={note.etag} className="form-control" id="etag"/>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" ref={refClose} onClick={handleClose}>Close</Button>
          <Button disabled={note.etitle.length<5 || note.edescription.length<5} variant="primary" onClick={handleUpdate}>Update Changes</Button>
        </Modal.Footer>
      </Modal>
    <div className="row my-3">
      <h2>Your Notes</h2>
      <div className="container">
      {notes.length===0 && "No Notes to Display"}
      </div>
        {notes.map((note) => {
          return <NoteItems key={note._id} showAlert={props.showAlert} updateNote={getUpdateNote} note={note} />
        })}
    </div>
    </React.StrictMode>
  );
};

export default Notes;
