/**
 * @file 点击文字附近符合选择器的元素
 * @author laomu1988
 */


/**
 * 点击附近目标元素
 *
 * @param {string} start 起始节点文字或css选择器
 * @param {string} target 目标节点文字或css选择器
 */
async function $clickClosest(start, target) {
    let selector = await this.evaluate(
        (start, target) => window.$client.closestSelector(start, target),
        start, target);
    if (selector) {
        await this.$click(selector);
    }
    else {
        throw new Error('Can Not Find Dom with Text:' + start + ',' + target);
    }
}

module.exports = $clickClosest;
