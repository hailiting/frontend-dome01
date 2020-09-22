const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
module.exports = {
  plugins: [
    // 处理views的模板
    new CopyPlugin(
      [
        {
          from: path.join(
            __dirname,
            "../" + "/src/+webapp/views/common/layout.html"
          ),
          to: "../components",
        },
      ],
      {
        copyUnmodified: true,
        ignore: ["*.js", "*.css", "*.ts", ".DS_Store"],
      }
    ),
  ],
};
