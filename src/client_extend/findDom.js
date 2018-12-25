/**
* @file 根据内容查找dom
* @author laomu1988
*/


/**
 * 根据内容查找dom节点
 *
 * @param {string} target 要查找的元素的文本或css选择器
 * @param {string} [box] 文本所在的选择器或文字
 * @return {Dom} 找到的DOM元素，当未找到DOM节点时，返回null
 */
module.exports = function findDom(target, box) {
    if (!target || typeof target !== 'string') {
        throw new Error('findDom(target) need target as string');
    }
    box = box || document.body;
    // 当selector是字符串时处理
    if (typeof box === 'string') {
        // 当selector是选择器
        try {
            let doms = document.querySelectorAll(box);
            for (let i = doms.length - 1; i >= 0; i--) { // 从后向前查找，避免后面覆盖前面时查找到的是前面内容
                let dom = findDom(target, doms[i]);
                if (dom) {
                    return dom;
                }
            }
        }
        catch (e) {
            // box不是css选择器
        }
        box = findDom(box); // 当box是文字时处理
        if (!box) {
            return null;
        }
    }
    if (!box.querySelector) {
        return null;
    }
    // text是css选择器
    try {
        let dom = box.querySelector(target);
        if (dom) {
            return dom;
        }
        if (box.tagName.toLowerCase() === target.toLowerCase()) {
            return box;
        }
    }
    catch (e) {
        // text不是css选择器
    }
    // text是文本时处理
    target = (target + '').replace(/\s/g, '');
    // input元素的当前输入值
    let values = window.$client.filterHidden(document.querySelectorAll('input'));
    for (let i = 0; i < values.length; i++) {
        let dom = values[i];
        let value = dom.getAttribute('value') || dom.value;
        if (value && value.replace(/\s/g, '') === target) {
            return dom;
        }
    }

    // 查询input元素的placeholder
    values = window.$client.filterHidden(document.querySelectorAll('[placeholder]'));
    for (let i = 0; i < values.length; i++) {
        let dom = values[i];
        let value = dom.getAttribute('placeholder');
        if (value && value.replace(/\s/g, '') === target) {
            return dom;
        }
    }

    // 此函数要写在findDomByText内部，写在外部时因为环境问题无法访问
    function findDomByTextAssist(target, dom) {
        let myText = ((dom.innerText || dom.data) + '').replace(/\s/g, '');
        if (myText.indexOf(target) < 0 || window.$client.isHidden(dom)) {
            return null;
        }
        if (dom.TEXT_NODE > 0 || dom.childElementCount > 0) {
            // 从后向前查找，避免后面覆盖前面时查找到的是前面内容
            let node = dom.lastChild;
            while (node) {
                let d = findDomByTextAssist(target, node);
                if (d) {
                    return d.tagName ? d : node;
                }
                node = node.previousSibling;
            }
        }
        if (target === myText) {
            return dom;
        }
        return null;
    }
    return findDomByTextAssist(target, box);
};
