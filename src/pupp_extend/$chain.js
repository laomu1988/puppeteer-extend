/**
 * @file puppeteer扩展函数
 * @author laomu1988
 */

const debug = require('debug')('puppeteer-extend');

// page链式操作，调用结束后执行时需增加end方法
function $chain() {
    const page = this;
    const arr = [];
    const chain = new Proxy({}, {
        get(target, method) {
            if (method === 'end') {
                return async () => {
                    for (let i = 0; i < arr.length; i++) {
                        let attr = arr[i].method;
                        let args = arr[i].args;
                        debug('$chain.' + attr, args);
                        if (!page[attr]) {
                            throw new Error(`Can NOT find method ${attr} on puppeteer page`);
                        }
                        await page[attr](...args);
                    }
                };
            }
            else if (method === 'then') {
                return;
            }
            return (...args) => {
                arr.push({method, args});
                return chain;
            };
        }
    });
    return chain;
}

module.exports = $chain;