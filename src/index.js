/**
 * @file Puppeteer扩展函数
 * @author laomu1988
 */
/* eslint-disable fecs-camelcase */
const pkg = require('../package.json');
const requireDir = require('require-dir');
const debug = require('debug')('puppeteer-extend');
const client = require('./client_extend');
const puttExtend = requireDir('./pupp_extend');

const noClientMethods = ['$chain'];

// 为puppeteer的页面绑定扩展函数
function bindExtends(page, extend, beforeEach) {
    for (let attr in extend) {
        if (noClientMethods.indexOf(attr) >= 0) {
            page[attr] = extend[attr].bind(page);
        }
        else {
            // 绑定扩展函数，执行前务必确认已注入$client
            page[attr] = async function (...args) {
                debug(attr, ...args);
                await injectClient(page);
                if (typeof beforeEach === 'function') {
                    await beforeEach.call(page, page, attr, args);
                }
                return await extend[attr].apply(page, args);
            };
        }
    }
}

module.exports = function (page, options) {
    if (page.__extend_version === pkg.version) {
        return page;
    }
    page.__extend_version = pkg.version;

    let {
        logHandle,
        extend,
        beforeEach
    } = options && typeof options === 'object' ? options : {};
    if (typeof options === 'function') {
        logHandle = options;
    }
    bindExtends(page, puttExtend, beforeEach);
    if (extend) {
        bindExtends(page, extend, beforeEach);
    }
    logHandle = logHandle || console.log.bind(console);
    // 注入client脚本
    page.on('framenavigated', async function (frame) {
        logHandle('[framenavigated]', frame.url());
        await injectClient(frame);
        logHandle('[framenavigated-inject]', frame.url());
    });

    // 执行错误记录
    page.on('error', err => {
        if (typeof logHandle === 'function') {
            logHandle('[Error]', err);
        }
        debug('[Error]', err);
    });
    page.on('pageerror', err => {
        if (typeof logHandle === 'function') {
            logHandle('[PageError]', err);
        }
        debug('[PageError]', err);
    });
    page.on('console', msg => {
        let log = msg.args().map(v => (v + '').replace('JSHandle:', '')).join(' ');
        if (log.match(/error/gi)) {
            debug('[console.error]', log);
            if (typeof logHandle === 'function') {
                logHandle('[console.error]', log);
            }
        }
        else {
            debug('[console]', log);
            if (typeof logHandle === 'function') {
                logHandle('[console]', log);
            }
        }
    });
    return page;
};


async function injectClient(page, times = 0) {
    try {
        await page.evaluate(client);
    }
    catch (err) {
        if (times > 5) {
            throw new Error('Repeat Error:' + err.message);
        }
        if (err.message === 'Execution context was destroyed, most likely because of a navigation.') {
            debug('injectError because navigation');
            try {
                await page.waitForSelector('body');
                await injectClient(page, times + 1);
            }
            catch (err) {
                if (err.message && err.message.indexOf('because browser has disconnected') >= 0) {
                    return;
                }
                throw err;
            }
        }
        else {
            throw err;
        }
    }
}
