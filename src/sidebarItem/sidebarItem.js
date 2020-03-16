import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItemComponent extends React.Component {
  
  selectNote = (n,i) => 
    this.props.selectNote(n,i);
  
  
  deleteNote = (n) => {
    if(window.confirm(`Are you sure?`))
      this.props.deleteNote(n);
  }

  
  render() {
    const { index, note, classes, selectedNoteIndex } = this.props;
    
    return(
      <div key={index}>
        <ListItem className={classes.listItem}
          selected={selectedNoteIndex === index}
          align-items='flex-start'>
          <div className={classes.textSelection}
            onClick={() => this.selectNote(note, index)}>
            <ListItemText primary={note.title}
              secondary={removeHTMLTags(note.body.substring(0,30))+'...'}>
            </ListItemText>
          </div>
          <DeleteIcon className={classes.deleteIcon}
            onClick={() => this.deleteNote(note)}>
          </DeleteIcon>
        </ListItem>
      </div>);
  }
}

export default withStyles(styles)(SidebarItemComponent);