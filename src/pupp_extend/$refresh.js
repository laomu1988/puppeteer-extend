/**
 * @file 刷新页面
 * @author laomu1988
 */


/**
 * 刷新页面并等待页面加载完毕
 */
async function $refresh() {
    await this.evaluate(() => {
        history.go(0);
    });
    await this.waitForNavigation();
    await this.waitFor(10);
}

module.exports = $refresh;
