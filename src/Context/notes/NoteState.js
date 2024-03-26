import React, { useState } from "react";
import NoteContext from "./noteContext";
import Notes from "../../Components/Notes";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

     //GET ALL NOTES
     const getNotes = async () => {
      // Api call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const  json=  await response.json();
      setNotes(json);
    };
    //ADD A NOTE
    const addNote = async (title, description, tag) => {
    // Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };
    //DELETE A NOTE
    const deleteNote = async (id) => {
    // Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json =  await response.json();
    //Logic to delete note
    const newNotes =  await notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
    //EDIT A NOTE
    const editNote = async (id, title, description, tag) => {
    // Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    // Logic to edit a note
    const updatedNotes = notes.map(note => {
    if (note._id === id) {
      return {
        ...note,
        title,
        description,
        tag
      };
    }
    return note;
  });

  setNotes(updatedNotes);
};
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
