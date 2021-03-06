const HappyWebpack = require("happypack");
const os = require("os");
const happyThreadPoll = HappyWebpack.ThreadPool({
  size: os.cpus().length,
});
module.exports = [
  new HappyWebpack({
    id: "happyTS",
    threadPool: happyThreadPoll,
    loaders: ["ts-loader"],
  }),
];
