const HtmlWebpackPlugin = require("html-webpack-plugin");
const { compilation } = require("webpack");

const pluginName = "htmlAfterWebpackPlugin";
const assetsHelp = (val) => {
  const data = JSON.parse(val);
  let css = [],
    js = [];
  const dir = {
    js: (item) => `<script src="${item}"></script>`,
    css: (item) => `<link rel="stylesheet" href="${item}" />`,
  };
  for (let key of data) {
    if (key.indexOf(".js") > -1) {
      js.push(dir.js(key));
    } else if (key.indexOf(".css") > -1) {
      css.push(dir.css(key));
    }
  }
  console.log(css, js);
  return {
    css,
    js,
  };
};
class HtmlAfterWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "MyPlugin",
        (htmlPluginData, cb) => {
          let _html = htmlPluginData.html;
          _html = _html.replace(/components:/g, "../../../components/");
          _html = _html.replace(/common:/g, "../../common/");
          console.log("32:--------", htmlPluginData.plugin.assetJson);
          const result = assetsHelp(htmlPluginData.plugin.assetJson);
          console.log("33:  ---", { result }, result.css);
          _html = _html.replace("<!-- injectcss -->", result.css.join(""));
          _html = _html.replace("<!-- injectjs -->", result.js.join(""));
          htmlPluginData.html = _html;
          cb(null, htmlPluginData);
        }
      );
    });
  }
}
module.exports = HtmlAfterWebpackPlugin;
