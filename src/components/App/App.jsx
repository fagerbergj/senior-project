import React from 'react'
import Welcome from '../Welcome/Welcome'
import Result from '../Result/Result'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      state: 'UPLOAD',
      file: null,
      filePath: '',
      boardTranscription: null,
      audioTranscription: null
    }
    this.successfulPost = this.successfulPost.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  successfulPost (file, filePath, boardTranscription, audioTranscription) {
    this.setState({
      state: 'RESULT',
      file: { file },
      filePath: { filePath },
      boardTranscription: { boardTranscription },
      audioTranscription: { audioTranscription }
    })
  }

  resetState () {
    this.setState({
      state: 'UPLOAD',
      file: '',
      transcription: ''
    })
  }

  render () {
    var mainComponent
    if (this.state.state === 'UPLOAD') {
      mainComponent = <Welcome successfulPost={this.successfulPost}/>
    } else {
      mainComponent = <Result
        video={this.state.file}
        videoPath={this.state.filePath}
        transcription={this.state.transcription}
        goBack={this.resetState}/>
    }
    return (
      <div className={'main-color'}>
        <div className={'container'}>
          {mainComponent}
        </div>
      </div>
    )
  }
}

export default App

