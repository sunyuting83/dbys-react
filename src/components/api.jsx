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
  return json
}
// index数据
const IndexJson = (data) => {
  const $ = cheerio.load(data)
      , m = makeMenu($)
  let json = {
    status: 0,
    swiper: [],
    menu: m.menu,
    menumore: m.menumore,
    movielist: []
  };
  const $swiper = $('body').find('#pbSlider0').children('div.o-slider--item')
  $swiper.each((index, element) => {
    const title = unescape($(element).children('div.o-slider-textWrap').children('a').text())
    const url = $(element).children('div.o-slider-textWrap').children('a').attr('href')
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
      url = url.substring(0, url.lastIndexOf('.'))
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
  const m = makeMenu($)
  let json = {
    status: 0,
    menu: m.menu,
    menumore: m.menumore,
    detail: {}
  }
  return json
}

export {
  IndexJson,
  DetailJson
}
