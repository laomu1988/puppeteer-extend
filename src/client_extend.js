/**
 * @file 汇总浏览器端函数
 * @author laomu1988
 */

const requireDir = require('require-dir');
const clientExtend = requireDir(__dirname + '/client_extend');
let func = `
    if (window.$client) return;
    var $client = window.$client = {};

    function catchError(func) {
        return function (...argv) {
            try {
                return func.apply(window.$client, argv);
            }
            catch (err) {
                console.error('Error', err.stack);
            }
        };
    }
`;

for (let attr in clientExtend) {
    func += '$client.' + attr + ' = catchError(' + clientExtend[attr] + ');\n\n';
}

module.exports = new Function(func);
