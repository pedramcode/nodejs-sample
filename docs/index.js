const basicInfo = require('./basicInfo');
const servers = require('./servers');
const tags = require('./tags');
const components = require('./components');

const userRoute = require("./users")

module.exports = {
    ...basicInfo,
    ...servers,
    ...tags,
    ...components,
    ...userRoute,
}