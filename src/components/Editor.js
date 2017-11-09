import React from 'react'; 
import AceEditor from 'react-ace';
import 'brace/mode/javascript'; 
import 'brace/theme/textmate'
import ErrorCard from './ErrorCard';
import OutputCard from './OutputCard';

export default class Editor extends React.Component {

  state = {
    code: '',
    error: null,
    output: null
  }

  componentDidMount() {
    this.setState({
      code: `/* Example:
  input: ${this.props.input}
  output: ${this.props.expectedOutput}
*/

  function ${this.props.challenge} {
    // your code here
  }`
    })
  }

  handleChange = (input) => {
    this.setState({
      code: input
    });
  }

  onRun = () => {
    this.setState({
      error: null
    }, () => {
      const inputArray = this.props.input.slice();
      const sortedArray = this.props.expectedOutput; 
      try {
        const userFunction = eval( `(${this.state.code})` );
        const pass = JSON.stringify(userFunction(inputArray)) === JSON.stringify(sortedArray);
        console.log("passed:", pass)
        this.props.handleRun(userFunction(inputArray))
        this.setState({
          output: JSON.stringify(userFunction(inputArray))
        })
      } catch(e) {
        this.setState({
          error: `${e.name}: ${e.message}`
        })
      }
    });
  }

  render() {
    return (
      <div className="editor-wrapper">
        <AceEditor 
          theme="textmate"
          mode="javascript"
          onChange={this.handleChange}
          name="editor"
          editorProps={{$blockScrolling: true}}
          value={this.state.code}
        />
        <ErrorCard message={this.state.error} />
        <OutputCard output={this.state.output} />
        <button onClick={this.onRun}>Run</button>
      </div>
    )
  }
};  