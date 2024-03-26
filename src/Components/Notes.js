import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote} = context;
  const [note, setnote] = useState({id:"", etitle:"", edescription:"", etag:""})
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token:", token)
    if(token){
      getNotes()
    }
    else{
      navigate("/login") 
    }
    //eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null)
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  };

  const onChange =(e)=>{
    setnote({...note, [e.target.name]:e.target.value})
    }

    const handleClick = (e)=>{
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click();
      props.showAlert("Note Updated Successfully", "success")
 }
  return (
    <>
      <AddNote showAlert = {props.showAlert}/>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <div className="container my-3">
                  <form>
              <div className="form-group my-2">
                <label htmlFor="etitle">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle"  value ={note.etitle}aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} minLength={50} required/>
              </div>
              <div className="form-group my-2">
                <label htmlFor="edescription">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value ={note.edescription} placeholder="Description" onChange={onChange} minLength={50} required/>
              </div>
              <div className="form-group my-2">
                <label htmlFor="etag">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value ={note.etag} placeholder="Tag" onChange={onChange} minLength={50} required/>
              </div>
              </form>
                  </div>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button  disabled={note.etitle.length<5 || note.edescription.length<5 || note.etag.length<5} type="button" className="btn btn-primary" onClick={handleClick}>
                Update Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1> Your Notes :</h1>
        <div className="container">
          {notes.length===0 && "No notes available"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
