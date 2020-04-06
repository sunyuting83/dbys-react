import cheerio from 'cheerio'

// 菜单函数
const makeMenu = ($) => {
  let json = {
    menu: [],
    menumore: []
  }
  const $menuRoot = $('body').find('div.navbar')
  const $menu = $($menuRoot).children('.container').children('a.item')
  $menu.each((index, element) => {
    if(index !== 0) {
      const title = $(element).text()
      const url = $(element).attr('href')
      json.menu = [...json.menu,{title:title,url:url}]
    }
  })
  const $menumore = $($menuRoot).children('.flowing').children('.divided').children('.column')
  $menumore.each((index, element) => {
    const l = $(element).children('.list').children('a.item')
    l.each((i, e) => {
      const title = $(e).text()
      const url = $(e).attr('href')
      json.menumore = [...json.menumore,{title:title,url:url}]
    })
  })
  localStorage.setItem('menu', JSON.stringify(json))
  return json
}

// 获取menu函数
const getMenu = ($) => {
  let menu = localStorage.getItem('menu')
  if(menu === null) {
    menu = makeMenu($)
  }else {
    menu = JSON.parse(menu);
  }
  return menu
}

// makeurl
const makeUrl = (str) => {
  str = str.substring(0, str.lastIndexOf('.'))
  return Buffer.from(str).toString('base64')
}

// index数据
const IndexJson = (data) => {
  const $ = cheerio.load(data)
      , menu = getMenu($)
  let json = {
    status: 0,
    swiper: [],
    menu: menu.menu,
    menumore: menu.menumore,
    movielist: []
  };
  const $swiper = $('body').find('#pbSlider0').children('div.o-slider--item')
  $swiper.each((index, element) => {
    const title = unescape($(element).children('div.o-slider-textWrap').children('a').text())
    let url = $(element).children('div.o-slider-textWrap').children('a').attr('href')
    url = makeUrl(url)
    const img = $(element).children('img').attr('src')
    json.swiper = [...json.swiper,{title:title,url:url,img:img}]
  })
  let movie = []
  const $mtitle = $('body').find('h3.dividing')
  $mtitle.each((index, element) => {
    let title = $(element).children('.content').text()
    if(title.includes('Tel')) {
      title = title.substring(0,title.lastIndexOf('Tel'))
    }else{
      title = title.substring(0,title.lastIndexOf('更'))
    }
    title = title.replace(/(^\s+)|(\s+$)/g, "")
    movie = [...movie,{title:title,list:[]}]
  })
  let mls = []
  const $mlist = $('body').find('div.seven')
  $mlist.each((index, element) => {
    const $card = $(element).children('.card')
    let m = []
    $card.each((i, e) => {
      const rt = $(e).children('a.image')
          , title = unescape($(rt).attr('title'))
          , img = $(rt).children('img').attr('data-src')
          , rate = $(rt).children('span').text()
          , date = $(e).find('meta').text()
      let url = $(rt).attr('href')
      url = makeUrl(url)
      m = [...m,{title:title,url:url,img:img,rate:rate,date:date}]
    })
    mls = [...mls,m]
  })
  for (const i in movie) {
    if (movie.hasOwnProperty(i)) {
      let element = movie[i]
      element.list = mls[i]
    }
  }
  json.movielist = movie
  return json;
}

// 详情页数据
const DetailJson = (data) => {
  const $ = cheerio.load(data)
      , menu = getMenu($)
  let json = {
    status: 0,
    menu: menu.menu,
    menumore: menu.menumore,
    detail: {}
  }
  let player = $('body').children('div.body').children('div.movie-info').children('div.info1').children('a.secondary').attr('href')
  json.detail.player = makeUrl(player)
  return json
}

// 播放页数据
const PlayerJson = (data) => {
  const $ = cheerio.load(data)
      , menu = getMenu($)
  let json = {
    status: 0,
    menu: menu.menu,
    menumore: menu.menumore,
    detail: {}
  }
  let $d = $('head').children('script')
  const l = $d.length - 1
  let d = ''
  $d.each((index, element) => {
    if(index === l) {
      d = $(element).html()
    }
  })
  let n = d.split(';')
  n = n.filter(x => {
    if(x) {
      x = x.replace(/(^\s+)|(\s+$)/g, "")
      x = x.replace(/\s/g, "")
      return x
    }
  })
  const ptoken = n[0].split('=')[1].replace(/"/g, "").replace(/\s/g, "")
  const sg = window.fxxk(ptoken)
  const url = `https://cors.zme.ink/https://www.bde4.com/god/${ptoken}?sg=${sg}`
  console.log(url)
  fetch(url, {
      method:'GET',
      header: {
        Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
  })
  .then(function(data){
    if(data.ok) {
      data.text().then(function(data) {
        console.log(data)
      })
    }
  })
  json.detail.code = d
  return json
}

export {
  IndexJson,
  DetailJson,
  PlayerJson
}
