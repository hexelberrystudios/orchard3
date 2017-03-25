'use strict';

var renderLayout = function (renderer, html, req, res) {
  var path = require('path');
  var fs = require('fs');
  var context = { url: req.url };
  var stream;
  
  if (!renderer) {
    return res.send('waiting for compilation... refresh in a moment.');
  } else {
    console.log(req.url.path);
    // Render our Vue app to a stream
    stream = renderer.renderToStream(context);
    // Write the pre-app HTML to the response
    res.write(html.head);
    // Whenever new chunks are rendered...
    stream.on('data', function (chunk) {
      // Write the chunk to the response
      res.write(chunk);
    });
    // When all chunks are rendered...
    stream.on('end', function () {
      // Write the post-app HTML to the response
      res.end(html.tail);
    });
    // If an error occurs while rendering...
    stream.on('error', function (error) {
      // Log the error in the console
      console.error(error)
      // Tell the client something went wrong
      return res
        .status(500)
        .send('Server Error')
    });
  }
}

module.exports = {
  renderLayout: renderLayout
};
