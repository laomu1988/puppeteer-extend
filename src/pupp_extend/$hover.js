/**
 * @file hover指定元素
 * @author laomu1988
 */


/**
 * hover指定元素
 *
 * @param {string} target 目标选择文字内容或css选择器
 */
async function $hover(target) {
    let selector = await this.evaluate(target => window.$client.css(target), target);
    if (selector) {
        await this.hover(selector);
    }
    else {
        throw new Error('Can Not Find Dom:', target);
    }
}

module.exports = $hover;
