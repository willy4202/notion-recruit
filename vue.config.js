const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      "/notion": {
        changeOrigin: true,
        pathRewrite: {
          "/notion": "",
        },
        target: "https://api.notion.com/",
      },
    },
  },
});
