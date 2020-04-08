export default async function HttpServer (url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
        method:'GET',
        header: {
          Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
    })
    .then(async function(data){
      if(data.ok) {
        data.json().then(function(data) {
          resolve(data);
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