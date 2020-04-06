const CROSUrl = 'https://cors.zme.ink/';
const RootUrl = 'https://www.bde4.com';
const IndexUrl = `${CROSUrl}${RootUrl}/`;
const DetailUrl = (d,u) => {
  return `${IndexUrl}${d}/${u}.htm`
}


export {
  IndexUrl,
  RootUrl,
  DetailUrl
}
