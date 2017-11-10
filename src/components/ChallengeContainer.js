import React from 'react';
import Editor from './Editor';
import ObstacleContainer from './ObstacleContainer';
import '../stylesheets/challenge.css';

export default class ChallengeContainer extends React.Component {

  constructor(props) {
    super(props);
    const editor = this.determineEditor(props);
    this.state = {
      currentEditor: editor,
      currentAttempt: editor.attempt
    }
  }

  handleRun = (output) => {
    if (Array.isArray(output)) {
      this.setState({
        currentAttempt: output
      });
    };
  };

  determineEditor = (props) => (
    props.editors.filter(editor => (editor.name === this.props.name))[0]
  );


  render() {
    return (
      <div className="challenge-container-wrapper">
        <Editor editor={this.state.currentEditor} onQuit={this.props.handleQuit} onPass={this.props.handlePass} handleRun={this.handleRun}/>
        <ObstacleContainer challenge={this.props.name} attempt={this.state.currentAttempt}/>
      </div>
    )
  };
};
