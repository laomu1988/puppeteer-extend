/**
 * @file puppeteer扩展函数
 * @author laomu1988
 */
const kill = require('tree-kill');
const debug = require('debug')('puppeteer-extend');

// page链式操作，调用结束后执行时需增加end方法
function $chain() {
    const page = this;
    const arr = [];
    let ended = true;
    let timer = 0;
    const chain = new Proxy({}, {
        get(target, method) {
            ended = false;
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (ended === false) {
                    console.error('$chain need call "end" method.');
                    kill(process.pid, () => {
                        process.exit();
                    });
                }
            }, 0);
            if (method === 'end') {
                ended = true;
                return async () => {
                    for (let i = 0; i < arr.length; i++) {
                        let attr = arr[i].method;
                        let args = arr[i].args;
                        let argString = args.map(v => typeof v === 'object' ? JSON.stringify(v) : v).join(',');
                        debug('$chain.' + attr + '(' + argString + ')');
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