const CROSUrl = 'https://cors.zme.ink/';
const RootUrl = 'https://www.bde4.com';
const IndexUrl = `${CROSUrl}${RootUrl}/`;
const DetailUrl = (b) => {
  b = Buffer.from(b, 'base64').toString('utf8')
  return `${IndexUrl}${b}.htm`
}


export {
  IndexUrl,
  RootUrl,
  DetailUrl
}
