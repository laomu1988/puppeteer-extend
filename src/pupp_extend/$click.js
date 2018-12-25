/**
 * @file 点击目标元素
 * @author laomu1988
 */

/**
 * 点击目标元素
 *
 * @param {string} target 要点击的文字或文字的css选择器
 */
async function $click(target) {
    let result = await this.evaluate(target => {
        let selector = window.$client.css(target);
        if (!selector) {
            return -1;
        }
        let dom = window.document.querySelector(selector);
        // 判断节点是否拥有点击属性，假如没有则判断其上级节点
        if (dom && dom.click) {
            dom.click();
        }
        else if (dom && dom.parentElement && dom.parentElement.click) {
            dom.parentElement.click();
        }
    }, target);
    if (result === -1) {
        throw new Error('Can Not Find Dom:' + target);
    }
    await this.waitFor(10);
}

module.exports = $click;
