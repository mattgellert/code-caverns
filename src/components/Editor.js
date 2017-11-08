import React from 'react'; 
import AceEditor from 'react-ace';
import brace from 'brace';

class Editor extends React.Component {

  handleChange = (newValue) => {
    console.log('change',newValue);
  }

  render() {
    return (
      <AceEditor 
        mode="javascript"
        onChange={this.handleChange}
        name="editor"
        editorProps={{$blockScrolling: true}}
      />
    )
  }
}; 

export default Editor;