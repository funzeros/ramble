module.exports = {
  devServer: {
    proxy: {
      "/api/upload": {
        // target: "http://localhost:9009",
        target: "http://47.103.218.109:9009",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        // target: "http://localhost:9090",
        target: "http://47.103.218.109:9090",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
