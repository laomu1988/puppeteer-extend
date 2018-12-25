/**
 * @file 根据dom计算其css选择器
 * @author laomu1988
 */


/**
 * 根据dom计算其css选择器
 *
 * @param {Dom} dom 节点对象
 * @return {string} dom元素的css选择器
 */
module.exports = function (dom) {
    let selector = '';
    while (dom) {
        let now = dom.tagName.toLowerCase();
        if (dom.parentElement) {
            let children = dom.parentElement.children;
            for (let i = 0; i < children.length; i++) {
                if (dom === children[i]) {
                    now += ':nth-child(' + (i + 1) + ')';
                    break;
                }
            }
        }
        if (dom.id) {
            now += '#' + dom.id;
        }
        selector = now + (selector ? ' > ' : '') + selector;
        dom = dom.parentElement;
    }
    return selector;
};
