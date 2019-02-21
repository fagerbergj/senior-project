import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../App/App.css'
import PropTypes from 'prop-types'
import TranscriptionLine from './TranscriptionLine'

export default class Result extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      transcriptionType: 'BOARD',
      hoveredText: '',
      selectedTextIndex: null
    }
    this.lineClicked = this.lineClicked.bind(this)
    this.updateSelectedText = this.updateSelectedText.bind(this)
  }

  lineClicked (index) {
    this.setState({
      selectedTextIndex: index
    })
    // todo allow this to be changed between transcriptions
    this.refs.videoPlayer.currentTime = this.props.boardTranscription[index][1]
  }

  // every second, check to see if the next line should be highlighted
  updateSelectedText () {
    var index = this.state.selectedTextIndex
    var video = this.refs.videoPlayer
    var transcription = this.props.boardTranscription

    // if no text is selected, assume 0 is the next text selected
    if (index === null) index = 0

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
    this.interval = setInterval(() => this.updateSelectedText(), 500)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <div>
        <button
          className={'btn-light btn-sm'}
          onClick={this.props.goBack}
        >Go Back To Upload</button>
        <div className={'row'}>
          <video ref="videoPlayer" className={'float-middle'} controls width="89%" height="50%" >
            <source src={this.props.videoPath} />
          </video>
        </div>
        <div className={'row bottom'}>
          <div className={'div transcription'} >
            {this.props.boardTranscription.map(function (line, index) {
              var selectedLine = this.props.boardTranscription[this.state.selectedTextIndex]
              return (
                <React.Fragment key={line[1]}>
                  <TranscriptionLine
                    index={index}
                    line={line}
                    lineClicked={this.lineClicked}
                    // todo make this change with current transcription
                    selected={selectedLine !== undefined && selectedLine[0] === line[0]}
                  />
                </React.Fragment>
              )
            }, this)}
          </div>
        </div>
      </div>
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
