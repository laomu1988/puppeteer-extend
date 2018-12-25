/**
* @file 查找最近元素的css选择器
* @author laomu1988
*/


/**
 * 查找最近元素的css选择器
 *
 * @param {string} start 开始节点的文字或css选择器
 * @param {string} [target] 目标文字或css选择器，为空时直接采用start作为目标
 * @return {string} 找到的DOM元素的css选择器，当未找到DOM节点时，返回空字符串
 */
module.exports = function closestSelector(start, target) {
    if (!target) {
        return window.$client.css(start);
    }
    let dom = window.$client.closest(start, target);
    if (dom) {
        return window.$client.domSelector(dom);
    }
    return '';
};
