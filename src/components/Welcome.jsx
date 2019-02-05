import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App/App.css'

export default class Welcome extends React.Component {
  render () {
    return (
      <div className={'row vertical-center'}>
        <div className={'jumbotron col-sm-12 pagination-centered light-pink text-center'}>
          <h1>Welcome to AutoNote!</h1>
          <h4>Upload a video to generate a linked transcription.</h4>
          <button className={'btn-primary btn-lg'}>Upload Video</button>
        </div>
      </div>)
  }
}
