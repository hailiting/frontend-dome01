import { GET, route } from "awilix-koa";

@route("/test")
class TestController {
  constructor({ dataService }) {
    this.dataService = dataService;
  }
  @GET()
  async indexAction(ctx) {
    // console.log(123);
    // const data = await this.dataService.getData();
    ctx.body = data;
  }
}
