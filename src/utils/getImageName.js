function getImageName(url) {
  if (!url) return
  const start = url.lastIndexOf('/') + 1
  const end = url.indexOf('?alt=media')
  const filePath = url.substring(start, end)

  return filePath
}

export default getImageName
