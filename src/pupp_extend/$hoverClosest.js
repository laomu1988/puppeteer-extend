/**
 * @file hover附近元素
 * @author laomu1988
 */

/**
 * hover附近元素
 *
 * @param {string} start 起始目标节点的文字内容或css选择器
 * @param {string} target 目标选择文字内容或css选择器
 */
async function $hoverClosest(start, target) {
    let selector = await this.evaluate(
        (start, target) => window.$client.closestSelector(start, target),
        start, target);
    if (selector) {
        await this.hover(selector);
    }
    else {
        throw new Error('Can Not Find Dom:', start, target);
    }
}

module.exports = $hoverClosest;
