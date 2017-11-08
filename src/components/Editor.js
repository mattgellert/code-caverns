import React from 'react'; 
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript'; 
import ErrorCard from './ErrorCard';

class Editor extends React.Component {
  state = {
    code: '',
    error: null
  }

  componentDidMount() {
    this.setState({
      code: `/* Example:
  input: [9,6,3,4,5,1,0,2,8,7]
  output: [0,1,2,3,4,5,6,7,8,9,10]
*/

  function sortRocks(array) {
    // your code here
  }`
    })
  }

  handleChange = (input) => {
    this.setState({
      code: input
    });
  }

  handleRun = () => {
    this.setState({
      error: null
    }, () => {
      const inputArray = [9,6,3,4,5,1,0,2,8,7,10];
      const sortedArray = [0,1,2,3,4,5,6,7,8,9,10]; 
      try {
        const userFunction = eval( `(${this.state.code})` );
        const pass = JSON.stringify(userFunction(inputArray)) === JSON.stringify(sortedArray);
      } catch(e) {
        this.setState({
          error: `${e.name}: ${e.message}`
        })
      }
    });
  }

  render() {
    return (
      <div id="editor-wrapper">
        <AceEditor 
          mode="javascript"
          onChange={this.handleChange}
          name="editor"
          editorProps={{$blockScrolling: true}}
          value={this.state.code}
        />
        <ErrorCard message={this.state.error} />
        <button onClick={this.handleRun}>Run</button>
      </div>
    )
  }
};  

export default Editor;