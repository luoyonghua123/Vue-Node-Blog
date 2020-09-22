const { categoryValidator}=require('../validators/category')
const CategoryModel=require('../models/CategoryModel');
const {Resolve}=require('../lib/helper')
const res=new Resolve();
class CategoryController{
  //创建分类
  static async createCategory(ctx,next){
    //校验分类
    categoryValidator(ctx);
    const {name,keyword}=ctx.request.body;
    const hasCategory=await CategoryModel.findOne({name});
    if(hasCategory){
      throw new global.errs.Existing('分类已经存在')
    }
    const category=await CategoryModel.create({name,keyword});
    ctx.status=200;
    ctx.body=res.json(category);
  }
  //获取所有分类
  static async getCategotyList(ctx,next){
    const categoryList=await CategoryModel.find();
    ctx.status=200;
    ctx.body = res.json(categoryList)
  }

  static async updateCategoryById(ctx,next){
    //校验参数
    categoryValidator(ctx);
    const _id=ctx.params._id;
    const {name,keyword}=ctx.request.body;
    const category=await CategoryModel.findByIdAndUpdate({_id},{name,keyword})
    if(!category){
      throw new global.errs.NotFound('没有找到分类')
    }
    ctx.body=res.success('更新分类成功')
  }

  static async getCategoryDetailById(ctx,next){
    const _id=ctx.params._id;
    const categoryDetail=await CategoryModel.findById({_id});
    if(!categoryDetail){
      throw new global.errs.NotFound('没有找到该分类')
    }
    ctx.body=res.json(categoryDetail)
  }

  static async deleteCategoryDetailById(ctx,next){
    const _id = ctx.params._id;
    const categoryDetail = await CategoryModel.findByIdAndDelete({ _id });
    if (!categoryDetail) {
      throw new global.errs.NotFound('没有找到该分类')
    }
    ctx.body = res.success('删除分类成功')
  }
}


module.exports=CategoryController