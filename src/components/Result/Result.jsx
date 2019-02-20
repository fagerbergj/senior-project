import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../App/App.css'
import PropTypes from 'prop-types'

export default class Result extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.refs.videoPlayer.currentTime = 3
  }

  render () {
    return (
      <div>
        <button
          className={'btn-light btn-sm'}
          onClick={this.props.goBack}
        >Go Back To Upload</button>
        <div className={'row'}>
          <video ref="videoPlayer" controls width="100%" height="50%">
            <source src={this.props.videoPath.filePath}/>
          </video>
        </div>
        <div className={'row half'}>
          <div className={'div transcription'} onClick={this.handleClick}>
            <p>transcription</p>
          </div>
        </div>
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
