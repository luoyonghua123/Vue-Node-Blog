const AdminModel = require('../models/AdminModel')
const { generateToken } = require('../core/util')
const bcrypt = require('bcrypt');
class LoginManager{
  static async adminLogin(params){
    const{nickname,password}=params;
    //验证用户名和密码是否正确
    const adminUser = await AdminModel.findOne({ nickname });
    if (!adminUser) {
      throw new global.errs.AuthFailed('账号不存在或者密码不正确');
    }
    const correct = bcrypt.compareSync(password, adminUser.password);
    if (!correct) {
      throw new global.errs.AuthFailed('账号不存在或者密码不正确');
    }
    //颁发令牌生成token
    const token = generateToken(adminUser._id)
    return{
      nickname:adminUser.nickname,
      token
    }
  }
}

module.exports=LoginManager;