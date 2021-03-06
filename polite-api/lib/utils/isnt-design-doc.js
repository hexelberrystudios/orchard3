/**
 * Checks for a design doc, so we can filter out docs that shouldn't return in *All methods
 */
function isntDesignDoc (row) {
  return row.id.match(/^_design/) === null
}

export default isntDesignDoc
