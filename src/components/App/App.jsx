import React from 'react'
import Welcome from '../Welcome/Welcome'
import Result from '../Result/Result'
import processPost from '../../utils/ApiClient'
import FormData from 'form-data'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      state: 'UPLOAD',
      file: '',
      transcription: ''
    }
    this.post = this.post.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  post (file) {
    const data = new FormData()
    // pass in header, body, then callback
    data.append('file', file)
    processPost(data,
      resp => {
        // callback to handel transcription coming back from response
        console.log(resp.data)
        this.setState({
          state: 'RESULT',
          file: { file },
          transcription: resp.data
        })
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
      mainComponent = <Welcome post={this.post}/>
    } else {
      mainComponent = <Result
        video={this.state.file}
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
