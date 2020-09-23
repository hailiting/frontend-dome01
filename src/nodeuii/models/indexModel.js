import { resolve } from "path";

export default class IndexModle {
  constructor(app) {}
  getData() {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve("indexAction 异步数据");
      }, 1000);
    });
  }
}
