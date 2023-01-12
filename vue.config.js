const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      "/api": {
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
        target: "https://api.notion.com/v1/",
      },
    },
  },
});
