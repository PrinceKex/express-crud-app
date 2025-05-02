module.exports = {
 publicPath: '/',
 outputDir: 'dist',
 assetsDir: 'static',
 lintOnSave: process.env.NODE_ENV === 'development',
 productionSourceMap: false,
 devServer: {
  port: 8080,
  proxy: {
   '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
   },
  },
 },
}
