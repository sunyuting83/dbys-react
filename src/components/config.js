const RootUrl = 'http://127.0.0.1:5002/api/'

const IndexUrl = `${RootUrl}index`

const DetailUrl = (b) => {
  b = Buffer.from(b, 'base64').toString('utf8')
  return `${IndexUrl}${b}.htm`
}
const PlayerUrl = (b) => {
  return `${RootUrl}getmovie?id=${b}`
}

export {
  IndexUrl,
  RootUrl,
  DetailUrl,
  PlayerUrl
}
