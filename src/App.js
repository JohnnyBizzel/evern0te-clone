import React from 'react';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import './App.css';
const firebase = require('firebase');

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: []
    };
  }
  
  componentDidMount = () => {
    firebase.firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(doc => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });
      this.setState({ notes: notes });
    })
  }
  
  selectNote = (note, i) => {
    this.setState({ selectedNoteIndex : i, selectedNote: note });
  } 
  
  updateNote = (id, note) => {
    console.log(id, note);
    console.log('----');
    firebase.firestore()
      .collection('notes')
      .doc(id)
      .update({ 
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  newNote = async (title) => {
    const note = { title: title, body: '' };
    const newFromDb = await firebase.firestore()      
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    
    const newId = newFromDb.id;    
    await this.setState({ notes: [...this.state.notes, note]});
    
    const newNoteIdx = this.state.notes.indexOf(
                            this.state.notes.filter(n => n.id === newId)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIdx],
                  selectedNoteIndex: newNoteIdx });
  }
  
  deleteNote = async (note) => {
    const noteIdx = this.state.notes.indexOf(note);
    
    // update state
    await this.setState({ notes: this.state.notes.filter(n => n !== note) });
        
    
    if (this.state.selectedNoteIndex === noteIdx) {
      this.setState({ selectedNote: null, selectedNoteIndex: null });
    } else {
      this.state.notes.length > 1 ?
        this.selectNote(this.state.notes[noteIdx-1], noteIdx-1) :
        this.setState({ selectedNote: null, selectedNoteIndex: null });
    }
    console.log(this.state.selectedNoteIndex-1, noteIdx-1);
    
    
    // delete note from firebase
    firebase.firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
      
  }
  
  render() {
    return(
      <div className="app-container">
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex} 
          notes={this.state.notes}
          newNote={this.newNote} 
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          >
        </SidebarComponent>
        { this.state.selectedNote ?
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            updateNote={this.updateNote}>
          </EditorComponent>
          : null    
        }     
      </div>
    );
  }
}

export default App;