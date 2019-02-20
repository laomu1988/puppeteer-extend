/**
 * @file 切换到上一个窗口
 * @author laomu1988
 */
const extend = require('../index.js');

/**
 * 切换到上一个窗口
 * @return {Page} Puppeteer的Page
 */
async function $prevWindow() {
    this.waitFor(200);
    let pages = await this.browser.pages();
    let index = pages.indexOf(this);
    let prev = pages[index - 1];
    if (!prev) {
        throw new Error('Can Not Find Prev Window');
    }
    require('../index.js')(prev);
    prev.browser = this.browser;
    this.browser.emit('switch-window', prev);
    return prev;
}

module.exports = $prevWindow;
