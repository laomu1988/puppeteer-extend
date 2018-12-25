/**
* @file 过滤隐藏元素
* @author laomu1988
*/


/**
 * 过滤隐藏元素
 *
 * @param {Array} doms 节点对象列表
 * @return {Array} 返回未隐藏的所有节点数组
 */
module.exports = function filterHidden(doms) {
    let arr = [];
    if (!doms) {
        return arr;
    }
    doms.forEach(elem => {
        if (!window.$client.isHidden(elem)) {
            arr.push(elem);
        }
    });
    return arr;
};
