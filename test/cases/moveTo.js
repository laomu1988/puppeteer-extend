/**
 * @file moveTo
 * @author muzhilong
 */


module.exports = async page => {
    await page.$hash('/agent');
    await page.$moveTo('auto-test', '.btn-more');
    await page.screenshot({path: './test/result/more.png'});
    await page.$pause(20);
    await page.$click('设置');
    await page.$waitFor('Agent名字');
};

