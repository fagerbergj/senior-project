import axios from 'axios'

// this method will process the post request to the back end and handel the response
export default function processPost (body, callback) {
  // config for post
  var config = {
    timeout: 300000,
    headers: { 'content-type': 'multipart/form-data' }

  }

  // url for server endpoint
  var url = 'http://localhost:5000/uploader'

  // actual post
  axios
    .post(url, body, config)
    .then(callback)
    .catch(function (error) {
      // Non 200 Response
      if (error.response) {
        // Request made but no response received
      } else if (error.request) {
        // something else happened
      } else {
      }
      throw error
    })
}

export function cancelPost () {
  var url = 'http://localhost:5000/uploader'
  var CancelToken = axios.CancelToken
  var cancel
  axios.post(url,
    {
      cancelToken: new CancelToken(
        function executor (c) {
          cancel = c
        })
    }
  ).then((response) => {
    cancel()
  })
}
