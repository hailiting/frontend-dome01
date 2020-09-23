import { resolve } from "path";

export default class IndexService {
  // koa2上下文
  constructor(app) {}
  getData() {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve("IndexService 异步数据222");
      }, 1000);
    });
  }
}
