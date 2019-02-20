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
    return (<div> </div>)
  }
}

Video.protoType = {
  videoPath: PropTypes.string
}

