import React from 'react'
import F from 'flyd'

import {model_stream, input_stream, coffee, commit, restart} from '../model'

export default class App extends React.Component {

  componentWillMount() { // boilerplate
    F.on(s => this.setState(s), model_stream)
  }

  render() {

    return <div className="container">
      <p className="title">A coder's working day</p>
      <button onClick={restart}>Restart</button>
      <button onClick={coffee}>Make coffee</button>
      <span className="lines_of_code">Committed: {this.state.committed}</span>
      <span className="lines_of_code">Uncommitted: {this.state.uncommitted}</span>
      {this.state.can_commit ? <button onClick={commit}>Push a commit</button> : undefined}
    </div>
  }

}
