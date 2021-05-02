const proxy=require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/api/server-status',{target:'http://localhost:5000'})),
    app.use(proxy('/api/authentication',{target:'http://localhost:5001'}))
}