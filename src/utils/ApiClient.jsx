import axios from 'axios'

// this method will process the post request to the back end and handel the response
export default function processPost (headers, body, callback) {
  // config for post
  var config = {
    timeout: 5000,
    headers: headers
  }

  // url for server endpoint
  var url = 'localhost'

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
    })
}

export function cancelPost () {
  var url = 'localhost'
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
