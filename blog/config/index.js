module.exports={
  db:{
    port:27017,
    host:'127.0.0.1',
    dbName:'myBlog'
  },
  //签证配置
  security:{
    secretKey:"secretKey",
    exp: Math.floor(Date.now() / 1000) + (100*60 * 60),
  }
}