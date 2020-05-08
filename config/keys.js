//determine environment and return respective set of keys
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod.js')
} else {
    module.exports = require('./dev.js')
}