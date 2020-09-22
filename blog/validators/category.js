function categoryValidator(ctx) {
  ctx.validateBody('keyword')
    .required('分类关键字是必须的')
    .trim()
    .match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/, '密码长度必须在6~22位之间，包含字符、数字和 _ ')
}

module.exports={
  categoryValidator
}