/**
 * @file 等待表单标签出现
 * @author laomu1988
 */


/**
 * 等待表单标签出现
 *
 * @param {string} target 目标节点的文字内容或css选择器，标签中可能包含了冒号“:“
 * @param {number} timeout 等待时间，单位ms，默认2000ms
 */
async function $waitForLabel(target, timeout = 2000) {
    await this.waitForFunction(function (target) {
        return window.$client && (
            !!window.$client.css(target)
            || !!window.$client.css(target + ':')
            || !!window.$client.css(target + '：')
        );
    }, {timeout}, target);
    await this.waitFor(10);
}

module.exports = $waitForLabel;