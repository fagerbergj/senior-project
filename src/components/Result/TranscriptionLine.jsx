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
    return (
      <span onClick={this.handleClick} className={classNames('line', { 'selected': this.props.selected })}>
        {this.props.line[0] + ' '}
      </span>)
  }
}

TranscriptionLine.propsType = {
  index: PropTypes.number,
  line: PropTypes.object,
  selected: PropTypes.bool,
  lineClicked: PropTypes.func
}
