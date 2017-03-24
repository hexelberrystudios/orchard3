const renderLayout = function (renderer, html, request, reply) {
  'use strict';
  
  if (!renderer) {
    return request.raw.res.end('waiting for compilation... refresh in a moment.')
  }
  console.log('Rendering...');

  var s = Date.now()
  const context = { url: request.url.path }
  
  const renderStream = renderer.renderToStream(context)
  let firstChunk = true
  request.raw.res.write(html.head)
  console.log('Wrote head');

  renderStream.on('data', chunk => {
    console.log('chunk');
    /*
    if (firstChunk) {
      // embed initial store state
      if (context.initialState) {
        request.raw.res.write(
          `<script>window.__INITIAL_STATE__=${
            serialize(context.initialState, { isJSON: true })
          }</script>`
        )
      }
      firstChunk = false
    }
    */
    request.raw.res.write(chunk)
  })

  renderStream.on('end', () => {
    console.log('Finished rendering');
    request.raw.res.end(html.tail);
    //reply.close({ end: false });
    console.log(`whole request: ${Date.now() - s}ms`)
  })

  renderStream.on('error', err => {
    console.log(err);
    throw err
  })
}

module.exports = {
  renderLayout: renderLayout
};