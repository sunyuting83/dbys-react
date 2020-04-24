const RootUrl = 'http://localhost:5002/api/'

const IndexUrl = `${RootUrl}index`
const HotUrl = `${RootUrl}gethot`
const KeyUrl = (k) => {
  return `${RootUrl}getkey?key=${k}`
}
const SearchUrl = (k, p) => {
  if(!p) p = 1
  return `${RootUrl}search?word=${k}&page=${p}`
}

const makeListUrl = (path) => {
  let url
  switch (path) {
    case 'list':
      url = `list?cid=`
      break;
    case 'area':
      url = `area?id=`
      break;
    case 'performer':
      url = `performer?id=`
      break;
    case 'director':
      url = `director?id=`
      break;
    default:
      break;
  }
  return url
}

const ListUrl = (param) => {
  let {path, id, page} = param
  path = path.substring(1, path.lastIndexOf('/'))
  let l = makeListUrl(path)
  if(!page) page = 1
  return `${RootUrl}${l}${id}&page=${page}`
}
const PlayerUrl = (b) => {
  return `${RootUrl}getmovie?id=${b}`
}
const ClassUrl = (b) => {
  return `${RootUrl}getclass?id=${b}`
}

const getSkin = () => {
  let s = ''
  const skin = localStorage.getItem('skin')
  if(skin) {
    s = skin
  }else{
    s = 'red'
  }
  return s
}

const setHeight = (height, page) => {
  if(page) sessionStorage.setItem(page, height)
}

const Keywords = '爱看影视,最新电影,高清电影,免费电影,在线电影,最新电视剧,电影下载,免费下载'
const Description = '爱看影视专注高清,为广大用户提供全网最高清在线观看体验,每天更新大量电影电视剧,无论是国产,欧美剧,韩剧,日剧,国漫,日漫,只要用户需要,大多数情况下都会更新!'
const GlobalTitle = '爱看影视'

const Pkey = (title) => {
  return `${title}在线观看,${title}在线播放,${title}百度网盘,${title}剧情简介`
}

export {
  IndexUrl,
  RootUrl,
  ListUrl,
  PlayerUrl,
  Keywords,
  Description,
  GlobalTitle,
  Pkey,
  getSkin,
  setHeight,
  ClassUrl,
  HotUrl,
  KeyUrl,
  SearchUrl
}
