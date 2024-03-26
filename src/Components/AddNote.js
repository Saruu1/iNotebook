import React, {useContext, useState} from 'react'
import noteContext from '../Context/notes/noteContext';
const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setnote] = useState({title:"", description:"", tag:""})
    const handleClick = (e)=>{
         e.preventDefault();
      addNote(note.title, note.description, note.tag);
      props.showAlert("Note Added Successfully", "success")
    }
     const onChange =(e)=>{
     setnote({...note, [e.target.name]:e.target.value})
     }
  return (
    <div><div className="container my-3">
    <h1>Add a note</h1>
    </div>
    <div className="container my-3">
    <form>
<div className="form-group my-2">
  <label htmlFor="title">Title</label>
  <input type="text" className="form-control" value ={note.title} id="title" name="title" aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange}minLength={50} required/>
</div>
<div className="form-group my-2">
  <label htmlFor="description">Description</label>
  <input type="text" className="form-control" value ={note.description} id="description" name="description" placeholder="Description" onChange={onChange}minLength={50} required/>
</div>
<div className="form-group my-2">
  <label htmlFor="tag">Tag</label>
  <input type="text" className="form-control" value ={note.tag} id="tag" name="tag" placeholder="Tag" onChange={onChange}minLength={50} required/>
</div>
<button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<5}type="submit" className="btn btn-primary my-2" onClick={handleClick}>Add Note</button>
</form>
    </div>
    </div>
  )
}

export default AddNote