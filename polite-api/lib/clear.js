/**
 * Destroys db.
 */
function clear () {
  const db = this

  return db.destroy()
    .then(function () {
      state.emitter.emit('clear')
    })
}

export default clear
