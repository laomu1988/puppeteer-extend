/**
* @file 根据label查找输入框
* @author laomu1988
*/

/**
 * 根据label查找输入框的css选择器
 *
 * @param {string} label 要查找的输入框前的文字内容
 * @return {DOM} 查找到的输入框DOM节点的css选择器，当未找到输入框时返回空字符串
 */
module.exports = function labelInputSelector(label) {
    let dom = window.$client.labelInput(label);
    if (dom) {
        return window.$client.domSelector(dom);
    }
    return '';
};
