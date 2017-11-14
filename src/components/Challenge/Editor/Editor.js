import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/textmate'
import ErrorCard from './ErrorCard';
import OutputCard from './OutputCard';

export default class Editor extends React.Component {

  state = {
    error: null,
    output: null,
    currentCode: this.props.challenge.editor.code
  };

  handleChange = (input) => {
    this.setState({
      currentCode: input
    });
  };

  onRun = () => {
    this.setState({
      error: null
    }, () => {


        try {
          if (this.props.challenge.name === 'circleOfStones') {
            const inputN = this.props.challenge.editor.input.n;
            const inputFirstNumber = this.props.challenge.editor.input.firstNumber
            const expectedNum = this.props.challenge.editor.expectedOutput;
            const userFunction = eval( `(${this.state.currentCode})` );
            const pass = userFunction(inputN, inputFirstNumber) === expectedNum;

            pass ? this.props.onPass(this.props.challenge.name) : null;
            this.props.handleRun( userFunction(inputN, inputFirstNumber) );

            this.setState({
              output: JSON.stringify( userFunction(inputN, inputFirstNumber) )
            });

          } else {
            const inputArray = this.props.challenge.editor.input.slice();
            const sortedArray = this.props.challenge.editor.expectedOutput;
            const userFunction = eval( `(${this.state.currentCode})` );
            const pass = JSON.stringify(userFunction(inputArray)) === JSON.stringify(sortedArray);

            pass ? this.props.onPass(this.props.challenge.name) : null;
            this.props.handleRun(userFunction(inputArray));

            this.setState({
              output: JSON.stringify(userFunction(inputArray))
            });
          }

        } catch(e) {
          this.setState({
            error: `${e.name}: ${e.message}`
          });
        };
    });
  };


  onQuit = () => {
    this.props.onQuit(this.props.challenge.name, this.state.currentCode, this.props.challenge.pass);
  };

  componentWillUnmount() {
    console.log("Editor CWU")
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
          value={this.state.currentCode}
        />
        <ErrorCard message={this.state.error} />
        <OutputCard output={this.state.output} />
        <button onClick={this.onRun}>Run</button>
        {this.props.challenge.pass ? <button onClick={this.onQuit}>Continue!</button> : <button onClick={this.onQuit}>Quit</button>}
      </div>
    );
  };
};
