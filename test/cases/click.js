/**
 * @file 点击测试
 * @author muzhilong
 */


module.exports = async page => {
    await page.$hash('/agent');
    await page.$waitForNot('.el-loading-mask', 4000);
    await page.$click('新建Agent');
    await page.$waitFor('Agent名字');
    await page.$click('取消');
};

