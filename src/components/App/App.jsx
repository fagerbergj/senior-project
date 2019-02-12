import React from 'react'
import Welcome from '../Welcome/Welcome'
import processPost from '../../utils/ApiClient'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  post (file) {
    // pass in header, body, then callback
    var headers = {}
    var body = { file: file }
    processPost(headers, body,
      resp => {
        // callback to handel transcription coming back from response
      })
  }
  render () {
    return (
      <div className={'main-color'}>
        <div className={'container'}>
          <Welcome
            post={this.post}/>
        </div>
      </div>
    )
  }
}

export default App
