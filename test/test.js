/**
 * @file 测试示例总入口
 * @author muzhilong
 */
const pptr = require('../src/init');
const path = require('path');
const requireDir = require('require-dir');
const fs = require('fs');
const config = require('./config');
const login = require('./login');
const cases = requireDir(__dirname + '/cases/'); // case列表
const headless = process.env.headless !== 'false';
const argv = process.argv;
const list = [{attr: 'login', method: login}]; // 执行的测试Case

let oneCase = '';

if (argv[2] && argv[2].match(/^\w+$/)) {
    oneCase = argv[2];
}


for (let attr in cases) {
    if (oneCase && attr.toLowerCase() !== oneCase.toLowerCase()) {
        continue;
    }
    list.push({attr: attr, method: cases[attr]});
}


// 执行测试Case
(async function test() {
    if (!fs.existsSync(config.result)) {
        fs.mkdirSync(config.result);
    }

    const browser = await pptr({
        executablePath: path.join(__dirname, '../Chromium.app/Contents/MacOS/Chromium'),
        headless: headless
    });
    const page = await browser.newPage();
    try {
        console.time('all');
        for (let i = 0; i < list.length; i++) {
            let one = list[i];
            console.log('Start Case: ' + one.attr + ' -----------');
            console.time(one.attr);
            await one.method(page, browser);
            console.timeEnd(one.attr);
            await page.screenshot({path: config.result + '/' + one.attr + '.png'});
            await page.$pause(10);
        }
        console.timeEnd('all');
    }
    catch (err) {
        console.error('Error:', err);
        await page.screenshot({path: config.result + '/error.png'});
    }
    await browser.browser.close();
})();
