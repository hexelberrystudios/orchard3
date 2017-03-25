'use strict';

module.exports = function (request, response) {
  var path = require('path');
  var fs = require('fs');
  // Create a renderer
  var renderer = require('vue-server-renderer').createRenderer();
  // Get the HTML layout
  var layout = fs.readFileSync(path.resolve(__dirname, '../../views/index.html'), 'utf8');
  var app = require(path.resolve(__dirname, '../../public/bundle'));
  // Split the layout into two sections of HTML
  var layoutSections = layout.split('<div id="app"></div>');
  var preAppHTML = layoutSections[0];
  var postAppHTML = layoutSections[1];

  renderer.renderToString(
    // Create an app instance
    require(path.resolve(__dirname, '../../public/bundle')),
    // Handle the rendered result
    function (error, html) {
      console.log(html);
    }
  );
  // Render our Vue app to a stream
  var stream = renderer.renderToStream(app);
  // Write the pre-app HTML to the response
  response.write(preAppHTML)
  // Whenever new chunks are rendered...
  stream.on('data', function (chunk) {
    // Write the chunk to the response
    response.write(chunk)
  })
  // When all chunks are rendered...
  stream.on('end', function () {
    // Write the post-app HTML to the response
    response.end(postAppHTML)
  })
  // If an error occurs while rendering...
  stream.on('error', function (error) {
    // Log the error in the console
    console.error(error)
    // Tell the client something went wrong
    return response
      .status(500)
      .send('Server Error')
  })
};