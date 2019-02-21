import axios from 'axios'

// this method will process the post request to the back end and handel the response
// callback and errorUpdate are methods that will be used to handle the results from the post
// callback will handel a happy response
// errorUpdate will update the components state on post error
export function processPost (body, callback, errorUpdate) {
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
        errorUpdate('non 200 response from server')
        // Request made but no response received
      } else if (error.request) {
        errorUpdate('no response from server')
        // something else happened
      } else {
        errorUpdate('Something Else Happened')
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