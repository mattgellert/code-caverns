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
          const userFunction = eval( `(${this.state.currentCode})` );
          const expectedOutput = this.props.challenge.editor.expectedOutput; 
          let pass, evalUserFunction;

          switch(this.props.challenge.name) {
            case 'circleOfStones': 
              const inputN = this.props.challenge.editor.input.n;
              const inputFirstNumber = this.props.challenge.editor.input.firstNumber
              pass = userFunction(inputN, inputFirstNumber) === expectedOutput;
              evalUserFunction = userFunction(inputN, inputFirstNumber);
              break; 
            case 'itemWeights': 
              const {value1, weight1, value2, weight2, maxW} = this.props.challenge.editor.input;
              evalUserFunction = userFunction(value1, weight1, value2, weight2, maxW);
              pass = evalUserFunction === expectedOutput;
              break; 
            case 'igniteBomb': 
              const str = this.props.challenge.editor.input;
              evalUserFunction = userFunction(str); 
              pass = JSON.stringify(evalUserFunction) === JSON.stringify(expectedOutput);
              break; 
            case 'pitOfSnakes':
              const snakesArray = this.props.challenge.editor.input;
              evalUserFunction = userFunction(snakesArray); 
              pass = evalUserFunction === expectedOutput; 
              break;
            case 'stringReverse': 
              const revStr = this.props.challenge.editor.input; 
              evalUserFunction = userFunction(revStr); 
              pass = evalUserFunction === expectedOutput; 
              break;
            default: 
              const inputArray = this.props.challenge.editor.input.slice();
              evalUserFunction = userFunction(inputArray); 
              pass = JSON.stringify(evalUserFunction) === JSON.stringify(expectedOutput);
              break; 
          }

          pass ? this.props.onPass(this.props.challenge.name) : null; 
          this.props.handleRun(evalUserFunction); 

          this.setState({
            output: JSON.stringify(evalUserFunction)
          })

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
