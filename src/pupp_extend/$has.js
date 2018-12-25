/**
 * @file 是否存在文字
 * @author laomu1988
 */


/**
 * 判断页面是否存在目标元素
 *
 * @param {string} target 目标选择文字内容或css选择器
 * @return {boolean} 是否存在目标元素
 */
async function $has(target) {
    return !!(await this.evaluate(function (target) {
        return window.$client && window.$client.css(target);
    }, target));
}

module.exports = $has;
