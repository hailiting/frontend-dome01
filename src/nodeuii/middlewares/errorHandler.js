const errorHandle = {
  error(app, logger) {
    app.use((ctx, next) => {
      try {
        next();
      } catch (error) {
        logger.error(error);
        ctx.status = error.status || 200;
        ctx.body = "服务器出错";
      }
    });
    app.use((ctx, next) => {
      console.log(ctx.status);
      next();
      // if (ctx.status !== 404) return;
      // ctx.body =
      //   '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
    });
  },
};
export default errorHandle;
