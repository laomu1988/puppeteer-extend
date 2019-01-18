/**
 * @file 等待目标出现
 * @author laomu1988
 */


/**
 * 等待目标出现
 *
 * @param {string} target 目标节点的文字内容或css选择器
 * @param {number} timeout 等待时间，单位ms，默认5000ms
 */
async function $waitFor(target, timeout = 5000) {
    await this.waitForFunction(function (target) {
        return window.$client && !!window.$client.css(target);
    }, {timeout}, target);
    await this.waitFor(10);
}

module.exports = $waitFor;
