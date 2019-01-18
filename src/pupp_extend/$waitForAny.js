/**
 * @file 等待任意一个文字或选择器出现
 * @author laomu1988
 */


/**
 * 等待任意一个文字或选择器出现，一般用于判断当前所在页面
 *
 * @param {string} target1 第一个目标
 * @param {string} target2 第二个目标
 * @param {number} timeout 等待时间，单位ms，默认5000ms
 * @return {string} 出现目标的文字或css选择器
 */
async function $waitForAny(target1, target2, timeout = 5000) {
    let result = await this.waitForFunction(function (target1, target2) {
        if (!window.$client) {
            return false;
        }
        if (window.$client.css(target1)) {
            return target1;
        }
        if (window.$client.css(target2)) {
            return target2;
        }
        return false;
    }, {timeout}, target1, target2);
    let value = await result.jsonValue();
    await this.waitFor(10);
    return value;
}

module.exports = $waitForAny;
