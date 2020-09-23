import Koa from "koa";
import render from "koa-swig";
import log4js from "log4js";
import serve from "koa-static";
import co from "co";
import { createContainer, Lifetime, asClass } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa";
import config from "./config";
import errorHandler from "./middlewares/errorHandler";
const app = new Koa();
// 创建ioc容器
const container = createContainer();
// 每次请求都new一次类
// 装载service
container.loadModules([__dirname + "/service/*.js"], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});
app.use(scopePerRequest(container));
app.context.render = co.wrap(
  render({
    root: config.viewDir,
    autoescape: true,
    // cache: "memory",
    ext: "html",
    varControls: ["[[", "]]"],
    writeBody: false,
  })
);

log4js.configure({
  appenders: {
    cheese: {
      type: "file",
      filename: "./logs/yd.log",
    },
  },
  categories: {
    default: {
      appenders: ["cheese"],
      level: "error",
    },
  },
});
const logger = log4js.getLogger("cheese");

errorHandler.error(app, logger);
//自动注册所有路由
app.use(loadControllers("controllers/*.js", { cwd: __dirname }));
app.use(serve(config.staticDir));
app.listen(config.port, () => {
  console.log(`app is listening on ${config.port}`);
});
