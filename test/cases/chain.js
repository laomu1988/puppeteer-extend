/**
 * @file 测试链式操作
 */

module.exports = async page => {
    await page
        .$chain()
        .$hash('/agent')
        .$waitForNot('.el-loading-mask', 4000)
        .$click('新建Agent')
        .$waitFor('Agent名字')
        .$click('取消')
        .end();
};

