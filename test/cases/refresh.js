/**
 * @file refresh
 * @author muzhilong
 */

module.exports = async page => {
    await page.$hash('/agent');
    await page.$clickClosest('auto-test', '管理后台');
    await page.$waitFor('问答库');
    await page.$refresh();
    await page.$waitFor('问答库');
};

