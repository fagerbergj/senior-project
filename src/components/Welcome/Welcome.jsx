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
  post: PropTypes.function
}
