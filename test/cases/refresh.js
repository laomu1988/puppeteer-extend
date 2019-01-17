/**
 * @file refresh
 * @author muzhilong
 */

module.exports = async page => {
    await page.$hash('/agent');
    await page.$waitForNot('.el-loading-mask', 4000);
    await page.$clickClosest('auto-test', '管理后台');
    await page.$waitForNot('.el-loading-mask', 4000);
    await page.$waitFor('问答库');
    await page.$refresh();
    await page.$waitForNot('.el-loading-mask', 4000);
    await page.$waitFor('问答库');
};

