import { resolve } from "path";

export default class DataService {
  constructor(app) {}
  getData() {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve("dataservice delay data");
      }, 1000);
    });
  }
}
