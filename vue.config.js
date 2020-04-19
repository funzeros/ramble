module.exports = {
  devServer: {
    proxy: {
      "/api/upload": {
        target: "http://localhost:9009",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:9090",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
