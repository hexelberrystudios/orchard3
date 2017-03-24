/*
 * Either wait for hoodie to load (if you're on the client),
 * or call hoodie directly somehow (if you're on the server) (@TODO),
 * then call the given function to process data.
 */
const runHoodieFn = (commit, state, fn) => {
  if (typeof window !== 'undefined') {
    // @TODO understand why the hoodie constant is not available here server side
    // @TODO remove, just understanding that hoodie needs time to initialize
    if (typeof hoodie === 'undefined') {
      console.log('hoodie is not defined yet')
    }
    
    let waitForHoodieToLoad = new Promise(function (resolve, reject) {
      let intervalId
      
      console.log('waiting for hoodie to load')
      
      intervalId = setInterval(function () {
        if (typeof hoodie !== 'undefined') {
          console.log('hoodie loaded!')
          
          clearInterval(intervalId);
          hoodie.ready.then(function () {
            fn(resolve, reject)
          })
        } else {
          console.log('hoodie not loaded')
        }
      }, 20)
    })
    
    return waitForHoodieToLoad
  } else {
    // @TODO: just return an empty object until we have something to show for this
    return {}
  }
}

export default {
  runHoodieFn: runHoodieFn
}
