import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App/App.css'
import classNames from 'classnames'

export default class Welcome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      state: 'PENDING',
      fileName: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.refs.fileUploader.click()
  }

  handleChange (selectorFiles) {
    console.log(selectorFiles)
    this.setState({
      state: 'PROCESSING',
      fileName: selectorFiles[0].name
    })
  }

  render () {
    var btnClass = classNames({
      btn: true,
      'btn-light btn-lg': true,
      'disabled': this.state.state === 'PROCESSING',
      'active': !this.state.state === 'PROCESSING'
    })

    var loading
    if (this.state.state === 'PROCESSING') {
      loading = (
        <div>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p>processing {this.state.fileName} ...</p>
        </div>
      )
    } else {
      loading = null
    }
    return (
      <div className={'row vertical-center'}>
        <div className={'jumbotron col-sm-12 pagination-centered light-pink text-center'}>
          <h1>Welcome to AutoNote!</h1>
          <h4>Upload a video to generate a linked transcription.</h4>
          <input id="file" ref="fileUploader" type="file" style={{ display: 'none' }} onChange={ (e) => this.handleChange(e.target.files) } />
          <button
            className={btnClass}
            onClick={this.handleClick}
            disabled={this.state.state === 'PROCESSING'}
          >Upload Video</button>
          <br></br>
          {loading}
        </div>
      </div>)
  }
}
