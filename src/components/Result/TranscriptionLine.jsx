import React from 'react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import '../App/App.css'
import classNames from 'class-names'

export default class TranscriptionLine extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.lineClicked(this.props.index)
  }

  render () {
    var min = Math.floor(this.props.line[1] / 60)
    var seconds = (this.props.line[1] % 60)
    var secondsOnes = Math.floor(seconds % 10)
    var secondsTens = Math.floor(seconds / 10 % 10)
    return (
      <span tabIndex="0" data-toggle="tooltip" title={'Timestamp: ' + min + ':' + secondsTens.toString() + secondsOnes.toString()}>
        <span onClick={this.handleClick} className={classNames('line', { 'selected': this.props.selected })}>
          {this.props.line[0] + ' '}
        </span>
      </span>)
  }
}

TranscriptionLine.propsType = {
  index: PropTypes.number,
  line: PropTypes.object,
  selected: PropTypes.bool,
  lineClicked: PropTypes.func
}
