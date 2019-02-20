/**
 * @file puppeterr测试环境初始化
 * @author muzhilong<muzhilong@baidu.com>
 */
const puppeteer = require('puppeteer');
const extend = require('./index');


module.exports = async function (params = {headless: true}, logHandle) {
    params = Object.assign({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
        ignoreHTTPSErrors: true,
        defaultViewport: {
            width: 1280,
            height: 800
        }
    }, params);
    let browser = await puppeteer.launch(params);
    let page = extend(await browser.newPage(), logHandle, browser);
    page.browser = browser;
    return {
        browser,
        page,
        extend,
        async newPage() {
            let page = extend(await browser.newPage(), logHandle);
            page.browser = browser;
            return page;
        }
    };
};
