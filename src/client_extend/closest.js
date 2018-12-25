/**
* @file 查找最近的其他文本节点
* @author laomu1988
*/

/**
 * 查找最近的其他文本节点
 *
 * @param {string} start 开始节点的文字或css选择器
 * @param {string} target 目标文字或css选择器
 * @return {Dom} 找到的DOM元素，当未找到DOM节点时，返回null
 */
module.exports = function closest(start, target) {
    if (!target) {
        return null;
    }
    let dom = window.$client.findDom(start);
    if (!dom) {
        return null;
    }

    while (dom && dom.tagName && dom.tagName !== 'BODY') {
        let find = window.$client.findDom(target, dom);
        if (find) {
            return find;
        }
        dom = dom.parentElement;
    }
    return null;
};
