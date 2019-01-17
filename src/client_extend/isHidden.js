/**
 * @file 判断DOM节点是否被隐藏
 * @author laomu1988
 */


/**
 * 判断DOM节点是否被隐藏
 *
 * @param {string} dom 要查找的节点
 * @return {boolean} 当dom节点是隐藏时返回true，否则为false
 */
module.exports = function isHidden(dom) {
    if (!dom) {
        return false;
    }
    if (dom && !dom.getClientRects && dom.parentElement) {
        dom = dom.parentElement;
    }
    if (!dom.getClientRects) {
        return false;
    }
    if (dom.offsetWidth || dom.offsetHeight || dom.getClientRects().length) {
        return false;
    }
    return true;
};
