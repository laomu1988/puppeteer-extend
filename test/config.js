/**
 * @file 测试配置项
 * @author muzhilong
 */
const fs = require('fs');
let json = requireJSON(__dirname + '/config.json');

const config = Object.assign({
    host: '',
    user: {
        username: '',
        password: ''
    },
    result: __dirname + '/result'
}, json);


function requireJSON(path) {
    if (fs.existsSync(path)) {
        return require(path);
    }
    return {};
}

module.exports = config;
