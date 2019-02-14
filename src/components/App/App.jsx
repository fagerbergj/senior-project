import React from 'react'
import Welcome from '../Welcome/Welcome'
import processPost from '../../utils/ApiClient'
import FormData from 'form-data'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  post (file) {
    const data = new FormData()
    // pass in header, body, then callback
    data.append('file', file)
    processPost(data,
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
