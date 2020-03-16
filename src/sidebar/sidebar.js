import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem/sidebarItem';


class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    };
   // this.newNoteBtnClick = this.newNoteBtnClick.bind(this);
   // this.updateTitle = this.updateTitle.bind(this);
   // this.newNote = this.newNote.bind(this);
  }

  newNoteBtnClick = () => {           
    this.setState({ title: null, addingNote: !this.state.addingNote });
  }
  
  updateTitle = (txt) => {
    console.log('text is ', txt);
    this.setState({ title: txt });
  }
  
  saveNote = () => {
    if (this.state.title === null) return;
    this.props.newNote(this.state.title);
    this.setState({ title: null, addingNote: false });
  }

  selectNote = (n,i) => {
    this.props.selectNote(n,i);
  }
  
  deleteNote = (note) => {
    this.props.deleteNote(note);
  }
  
  render() {
    const { notes, classes, selectedNoteIndex } = this.props;
    
    return(
      <div className={classes.sidebarContainer}>
        <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
          { this.state.addingNote ? 'Cancel' : 'New Note' }
        </Button>
          { this.state.addingNote ? 
            <div>
              <input type='text' required className={classes.newNoteInput} placeholder='Enter a note title'
              onKeyUp={(e)=> this.updateTitle(e.target.value)}></input>
              <Button onClick={this.saveNote} className={classes.newNoteSubmitBtn}>
                Save Note
              </Button>
            </div>
          : 
            <Divider></Divider>
          }
        <List>
          { 
            notes.map((note, idx) => {
              return (
                <div key={idx}>
                  <SidebarItemComponent note={note} index={idx}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={this.selectNote}
                    deleteNote={this.deleteNote}>
                  </SidebarItemComponent>
                  <Divider></Divider>
                </div>
              )
            }) 
            
          }
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(SidebarComponent);