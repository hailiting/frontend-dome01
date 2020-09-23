import { GET, route } from "awilix-koa";

@route("/")
// @route("/index.html")
export default class IndexController {
  // 这里的indexService 应该是sevice文件夹里 export的 FN名的驼峰
  constructor({ indexService }) {
    this.indexService = indexService;
  }
  @route("/test/:id")
  @GET()
  async indexAction(ctx) {
    console.log(123);
    const result = await this.indexService.getData();
    let a = 32222;
    ctx.body = await ctx.render("index", {
      data: result,
    });
  }
}
