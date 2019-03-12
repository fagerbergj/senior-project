import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../App/App.css'
import PropTypes from 'prop-types'
import classNames from 'class-names'
import TranscriptionLine from './TranscriptionLine'

export default class Result extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      transcriptionType: 'BOARD',
      transcription: this.props.boardTranscription,
      hoveredText: '',
      selectedTextIndex: null
    }
    this.lineClicked = this.lineClicked.bind(this)
    this.updateSelectedText = this.updateSelectedText.bind(this)
    this.changeTab = this.changeTab.bind(this)
  }

  lineClicked (index) {
    this.setState({
      selectedTextIndex: index
    })
    // todo allow this to be changed between transcriptions
    this.refs.videoPlayer.currentTime = this.state.transcription[index][1]
  }

  // every second, check to see if the next line should be highlighted
  updateSelectedText () {
    var index = this.state.selectedTextIndex
    var video = this.refs.videoPlayer
    var transcription = this.state.transcription

    // if no text is selected, assume 0 is the next text selected
    if (index === null) index = 0
    if (transcription.length === 0) transcription[0] = ['No Transcription Found', 0]
    if (video.currentTime === transcription[index][1]) return

    // If the current time is greater than selected line timestamp
    if (video.currentTime > transcription[index][1]) {
      // if last line is highlighted, not use in checking for any time greater than current selected line
      if (transcription[index + 1] === undefined) return
      // if current time > next line timestamp, loop until that isnt the case
      if (video.currentTime > transcription[index + 1][1]) {
        var i
        for (i = index + 1; i < transcription.length; i++) {
          // if next timestamp is greater than current time
          if (transcription[i][1] > video.currentTime) {
            // highlight previous line
            this.setState({ selectedTextIndex: i - 1 })
            return
            // else if at end of transcriptions
          } else if (i + 1 === transcription.length) {
            // highlight current line (last line)
            this.setState({ selectedTextIndex: i })
            return
          }
        }
      } else if (transcription[index][1] <= video.currentTime) {
        this.setState({ selectedTextIndex: index })
      }
      // if current time is less than selected line timestamp
    } else if (video.currentTime <= transcription[index][1]) {
      if (video.currentTime < transcription[0][1]) {
        this.setState({ selectedTextIndex: null })
        return
      }
      for (i = index - 1; i >= 0; i--) {
        // if transcription time is less than or equal to current time, select that line
        if (transcription[i][1] <= video.currentTime) {
          this.setState({ selectedTextIndex: i })
          return
        }
      }
    }
  }

  componentDidMount () {
    this.interval = setInterval(() => this.updateSelectedText(), 250)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  changeTab (e) {
    if (e.target.id === 'BOARD') {
      this.setState({
        selectedTextIndex: null,
        transcription: this.props.boardTranscription,
        transcriptionType: e.target.id
      })
    } else {
      this.setState({
        selectedTextIndex: null,
        transcription: this.props.audioTranscription,
        transcriptionType: e.target.id
      })
    }
  }

  render () {
    return (
      <React.Fragment>
        <div>
          <div className={'row'}>
            <button
              className={'btn-light btn-sm col-1 btn-sm'}
              onClick={this.props.goBack}
            >Back</button>
            <video ref="videoPlayer" className={'col-10 col-offset-1'} controls >
              <source src={this.props.videoPath} />
            </video>
          </div>
          <div className={'row bottom'}>
            <ul className="nav nav-tabs">
              <li id='BOARD' className={classNames('nav-link', { 'active': this.state.transcriptionType === 'BOARD' })} onClick={this.changeTab}> Board </li>
              <li id='AUDIO' className={classNames('nav-link', { 'active': this.state.transcriptionType === 'AUDIO' })} onClick={this.changeTab}> Audio </li>
            </ul>
            <div className={'div transcription'} >
              {this.state.transcription.map(function (line, index) {
                return (
                  <React.Fragment key={index}>
                    <TranscriptionLine
                      index={index}
                      line={line}
                      lineClicked={this.lineClicked}
                      selected={this.state.selectedTextIndex !== undefined && this.state.selectedTextIndex === index}
                    />
                  </React.Fragment>
                )
              }, this)}
            </div>
          </div>
        </div>
        <footer className={'light-pink col-12'} style={{ padding: '1%' }}>
          <button className={'btn-light btn col-4 box'}>Save Results</button>
        </footer>
      </React.Fragment>
    )
  }
}

Result.propsType = {
  video: PropTypes.object,
  videoPath: PropTypes.string,
  boardTranscription: PropTypes.array,
  audioTranscription: PropTypes.array,
  goBack: PropTypes.func
}
