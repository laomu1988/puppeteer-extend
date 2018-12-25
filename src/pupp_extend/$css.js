/**
 * @file 取得文字所在dom的选择器
 * @author laomu1988
 */


/**
 * 取得目标元素的css选择器
 *
 * @param {string} target 目标节点文字或css选择器
 * @return {string} 目标节点的css选择器
 */
async function $css(target) {
    return await this.evaluate(function (target) {
        return window.$client.css(target);
    }, target);
}

module.exports = $css;
