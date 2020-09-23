const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
module.exports = {
  plugins: [
    // 处理views的模板
    new CopyPlugin({
      patterns: [
        {
          from: path.join(
            __dirname,
            "../",
            "/src/webapp/views/common/layout.html"
          ),
          to: "../views/common/layout.html",
          globOptions: {
            copyUnmodified: true,
            ignore: ["*.js", "*.css", "*.ts", ".DS_Store"],
          },
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "../", "/src/webapp/components"),
          to: "../components",
          globOptions: {
            copyUnmodified: true,
            ignore: ["*.js", "*.css", "*.ts", ".DS_Store"],
          },
        },
      ],
    }),
  ],
};
