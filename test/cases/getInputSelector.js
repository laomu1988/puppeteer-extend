/**
 * @file 取得输入框的选择器
 * @author muzhilong
 */


module.exports = async page => {
    await page.$hash('/agent');
    await page.$click('新建Agent');
    await page.$waitFor('Agent名字');
    await page.$click('取消');
};

