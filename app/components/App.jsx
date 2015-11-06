import React from 'react'
import F from 'flyd'

import {model_stream, input_stream, UserClickT} from '../model'

const coffee = () => input_stream(UserClickT.MakeCoffee())
const commit = () => input_stream(UserClickT.CommitCode())
const restart = () => input_stream(UserClickT.Restart())

export default class App extends React.Component {

  componentWillMount() { // boilerplate
    F.on(s => this.setState(s), model_stream)
  }

  render() {

    return <div className="container">
      <p className="title">A coder's working day</p>
      <button onClick={coffee}>Make coffee</button>
      {this.state.can_commit ? <button onClick={commit}>Commit code</button> : undefined}
      <span className="lines_of_code">Committed: {this.state.committed}</span>
      <span className="lines_of_code">Uncommitted: {this.state.uncommitted}</span>
      <button onClick={restart}>Restart</button>
    </div>
  }

}
