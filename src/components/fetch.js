import {IndexJson, DetailJson} from './api';
export default async function HttpServer (url, pages) {
  return new Promise((resolve, reject) => {
    fetch(url, {
        method:'GET',
        header: {
          Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
    })
    .then(async function(data){
      if(data.ok) {
        data.text().then(function(data) {
          const json = makeData(pages,data);
          if(json.status === 0) resolve(json);
        })
      }else {
        resolve({status:1,message:data.status});
      }
    })
    .catch((err)=>{
      resolve({status:1,message:err.message});
    })
  })
};

function makeData(page,data) {
  // console.log(page);
  let d = {};
  switch (page) {
    case 'index':
      d = IndexJson(data)
      break
    case 'detail':
      d = DetailJson(data)
      break
    default:
      break
  }
  return d;
}