import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../App/App.css'
import PropTypes from 'prop-types'

export default class Video extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <video controls width="100%" height="50%">
        <source src={this.props.videoPath.filePath}/>
      </video>
    )
  }
}

Video.protoType = {
  videoPath: PropTypes.string
}
