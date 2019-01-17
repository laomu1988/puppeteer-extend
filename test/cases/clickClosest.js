/**
 * @file 点击
 * @author muzhilong
 */
const assert = require('assert');

module.exports = async page => {
    await page.$hash('/agent');
    await page.$waitForNot('.el-loading-mask', 4000);
    await page.$clickClosest('auto-test', '管理后台');
    await page.$waitFor('问答库');
    const value = await page.$has('auto-test');
    assert.strictEqual(value, true);
};

