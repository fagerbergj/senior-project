import React from 'react'
import Welcome from '../Welcome'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  render () {
    return (
      <body>
        <div className={'container'}>
          <Welcome/>
        </div>
      </body>
    )
  }
}

export default App
