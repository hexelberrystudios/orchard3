
function idOrObjectToId (idOrObject) {
  return typeof idOrObject === 'object' ? idOrObject._id : idOrObject
}

export default idOrObjectToId
