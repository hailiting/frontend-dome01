import _ from "lodash";
import path from "path";
let config = {
  viewDir: path.join(__dirname, "../views"),
  staticDir: path.join(__dirname, "../assets"),
};

if (process.env.NODE_ENV === "production") {
  const proConfig = {
    port: 80,
  };
  config = _.extend(config, proConfig);
} else {
  const localConfig = {
    port: 8081,
  };
  config = _.extend(config, localConfig);
}
console.log(config);
export default config;
