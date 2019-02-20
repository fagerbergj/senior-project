import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../App/App.css'
import PropTypes from 'prop-types'
import Video from './Video'

export default class Result extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
  }

  render () {
    return (
      <div className={'row vertical-center'}>
        <button
          className={'btn-light btn-lg'}
          onClick={this.props.goBack}
        >Go Back To Upload</button>
        <Video videoPath={this.props.videoPath}/>
      </div>
    )
  }
}

Result.propsType = {
  video: PropTypes.object,
  videoPath: PropTypes.string,
  transcription: PropTypes.array,
  goBack: PropTypes.func
}