/**
 * @file 切换到下一个窗口
 * @author laomu1988
 */

/**
 * 切换到下一个窗口
 * @return {Page} Puppeteer的Page
 */
async function $nextWindow() {
    this.waitFor(200);
    let pages = await this.browser.pages();
    let index = pages.indexOf(this);
    let next = pages[index + 1];
    if (!next) {
        throw new Error('Can Not Find Next Window');
    }
    require('../index.js')(next);
    next.browser = this.browser;
    this.browser.emit('switch-window', next);
    return next;
}

module.exports = $nextWindow;
