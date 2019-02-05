import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App/App.css'

export default class Welcome extends React.Component {
  render () {
    return (
      <div className={'row vertical-center'}>
        <div className={'jumbotron col-sm-12 pagination-centered'}>
          <h1 className='pagination-centered'>Welcome to AutoNote!</h1>
          <h4>Upload a video to get a transcription of what was written.</h4>
          <button>Upload Video</button>
        </div>
      </div>)
  }
}
