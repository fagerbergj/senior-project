import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../App/App.css'
import { cancelPost } from '../../utils/ApiClient'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export default class Welcome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      state: 'PENDING',
      selectedFile: null
    }
    this.handleClick = this.handleClick.bind(this)
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
    this.setState({
      state: 'PROCESSING',
      selectedFile: selectorFiles[0]
    })
    this.props.post(selectorFiles[0])
  }

  render () {
    var btnClass = classNames({
      btn: true,
      'btn-light btn-lg': true,
      'disabled': this.state.state === 'PROCESSING',
      'active': !this.state.state === 'PROCESSING'
    })

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
        <input id="file" ref="fileUploader" type="file" accept='video/*'
          style={{ display: 'none' }}
          onChange={ (e) => this.handleChange(e.target.files) } />
      )
      loading = null
    }
    return (
      <div className={'row vertical-center'}>
        <div className={jumboClass}>
          <h1 className={'font-size:10vw'}>Welcome to AutoNote!</h1>
          <h4 className={'font-size:5vw'}>Upload a video to generate a linked transcription.</h4>
          {input}
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

Welcome.propsType = {
  post: PropTypes.function
}