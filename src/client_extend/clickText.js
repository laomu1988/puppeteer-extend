/**
* @file 根据文本查找元素并点击
* @author laomu1988
*/


/**
 * 根据文本查找元素并点击
 *
 * @param {string} target 要查找的元素的文本或css选择器
 * @param {string} [box] 文本所在的选择器或文字
 * @return {Dom} 找到的DOM元素，当未找到DOM节点时，返回null
 */
module.exports = function clickText(target, box) {
    let dom = window.$client.findDom(target, box);
    if (dom) {
        dom.click();
        return dom;
    }
    return null;
};
