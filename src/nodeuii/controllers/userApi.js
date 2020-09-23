import bodyParser from "koa-bodyparser";
import { route, GET, POST, before } from "awilix-koa"; // or `awilix-router-core`

@route("/users")
export default class UserAPI {
  constructor({ indexService }) {
    this.indexService = indexService;
  }
  @route("/:id")
  @GET()
  async getUser(ctx) {
    // const result = await this.indexService.getData();
    // console.log(result);
    ctx.body = await ctx.render("index/pages/index", {
      data: "result",
    });
    // ctx.body = "result";
  }
}
