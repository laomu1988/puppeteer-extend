/**
 * @file 设置表单的值
 * @author muzhilong
 */
const assert = require('assert');

module.exports = async page => {
    await page.$hash('/agent');
    let value = await page.$waitForAny('新建Agent', '问答库');
    assert.strictEqual(value, '新建Agent');
};

