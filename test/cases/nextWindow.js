/**
 * @file nextWindow
 * @author muzhilong
 */

const assert = require('assert');

module.exports = async (page, browser) => {
    await page.$hash('/agent');
    let newPage = await browser.newPage();
    await newPage.goto('http://www.baidu.com');
    let newPage2 = await page.$nextWindow();
    assert.equal(newPage, newPage2);
    let prev = await newPage2.$prevWindow();
    assert.equal(prev, page);
};

