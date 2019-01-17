/**
 * @file 设置表单的值
 * @author muzhilong
 */


module.exports = async page => {
    await page.$hash('/agent');
    await page.$waitForNot('.el-loading-mask', 4000);
    await page.$waitFor('auto-test');
    await page.$clickClosest('auto-test', '管理后台');
    await page.$waitForNot('.el-loading-mask', 4000);
    await page.$waitFor('问答库');
    if (await page.$has('测试问题')) {
        await deleteQuestion();
    }
    await page.$click('添加问答');
    await page.$waitForLabel('问题描述');
    await page.$setForm({
        '问题描述': '测试问题',
        '请输入答案内容': '答案内容'
    });
    await page.$click('保存');
    await page.$waitForNotLabel('问题描述');
    await page.$waitFor('测试问题');
    await page.$refresh();
    await page.$waitFor('测试问题');
    await page.$pause(100);
    await deleteQuestion();

    async function deleteQuestion() {
        await page.$waitFor('编辑');
        await page.$moveTo('编辑');
        // await page.$hoverClosest('编辑', 'tr');
        await page.$waitFor('删除');
        await page.$click('删除');
        await page.$waitFor('确定');
        await page.$click('确定');
        await page.$waitForNot('测试问题');
        await page.$refresh();
        await page.$waitForNot('.el-loading-mask', 4000);
        await page.$waitForNot('测试问题');
    }
};

