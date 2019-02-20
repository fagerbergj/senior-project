import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../App/App.css'
import { processPost, cancelPost } from '../../utils/ApiClient'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import FormData from 'form-data'

export default class Welcome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      state: 'PENDING',
      selectedFile: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.post = this.post.bind(this)
  }

  handleClick () {
    if (this.state.state === 'PENDING') {
      this.refs.fileUploader.click()
    } else {
      cancelPost()
      this.setState({ state: 'PENDING' })
    }
  }

  handleChange (selectorFiles) {
    if (selectorFiles.length === 0) return
    console.log(selectorFiles)
    this.post(selectorFiles[0])
  }

  post (file) {
    // set screen to loading
    this.setState({
      state: 'PROCESSING',
      selectedFile: file
    })

    // set up body
    const data = new FormData()
    data.append('file', file)

    // pass in header, body, then callback
    processPost(data,
      resp => {
        console.log(resp.data)
        this.props.successfulPost(file, URL.createObjectURL(file), resp.data.boardTranscription, resp.data.audioTranscription)
      },
      error => {
        // if there is an error, log it and reset state
        console.log(error)
        this.setState({ state: 'PENDING' })
      })
  }

  render () {
    var jumboClass = classNames({
      'jumbotron col-8 offset-2 light-pink text-center': true,
      'jumboProcessing': this.state.state === 'PROCESSING'
    })

    var input
    var loading
    if (this.state.state === 'PROCESSING') {
      input = null
      loading = (
        <div>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p>processing {this.state.selectedFile.name} ...</p>
          <button className={'btn btn-outline-light'} onClick={this.handleClick}>Cancel</button>
        </div>
      )
    } else {
      input = (
        <React.Fragment>
          <br></br>
          <button
            className={'btn-light btn-lg'}
            onClick={this.handleClick}
          >Upload Video</button>
          <input id="file" ref="fileUploader" type="file" accept='video/*'
            style={{ display: 'none' }}
            onChange={ (e) => this.handleChange(e.target.files) } />
        </React.Fragment>
      )
      loading = null
    }
    return (
      <div className={'row vertical-center'}>
        <div className={jumboClass}>
          <h2 className={'h2 font-size:10vw'}>Welcome to AutoNote!</h2>
          <h6 className={'h6 font-size:5vw'}>Upload a video to generate a linked transcription.</h6>
          {input}
          <br></br>
          {loading}
        </div>
      </div>)
  }
}

Welcome.propsType = {
  successfulPost: PropTypes.function
}
