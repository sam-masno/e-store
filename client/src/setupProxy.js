const proxy = require('http-proxy-middleware')

//proxy setup for dev env
module.exports = function(app) {
    app.use(proxy(['/api/**'], { target: 'http://localhost:5000' }));
}