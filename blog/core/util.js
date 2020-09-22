const jwt =require('jsonwebtoken');
const config = require('../config')
//颁发令牌
const generateToken=function (_id) {
  const token = jwt.sign({
    exp: config.security.exp,
    data: _id
  }, config.security.secretKey)
  return token

}


module.exports={
  generateToken
}