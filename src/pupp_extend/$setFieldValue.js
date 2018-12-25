/**
 * @file 设置表单的值，支持输入框、下拉菜单
 * @author laomu1988
 */


/**
 * 设置表单的值，支持输入框、下拉菜单
 *
 * @param {string} label 表单的label文字
 * @param {string} value 表单的value
 */
module.exports = async function $setValue(label, value = '') {
    let input = await this.evaluate(function (label) {
        let selector = window.$client.css(label);
        let dom = selector ? window.document.querySelector(selector) : null;
        if (!dom) {
            return null;
        }
        let parent = dom.parentElement;
        let select = parent.querySelector('.el-select');
        if (select) {
            return {
                type: 'select',
                selector: window.$client.domSelector(select)
            };
        }
        let input = parent.querySelector('.el-input__inner');
        if (input) {
            return {
                type: 'input',
                selector: window.$client.domSelector(input)
            };
        }
        let textarea = parent.querySelector('.el-textarea__inner');
        if (textarea) {
            return {
                type: 'input',
                selector: window.$client.domSelector(textarea)
            };
        }
        selector = window.$client.labelInputSelector(label);
        if (selector) {
            return {type: 'input', selector};
        }
        return null;
    }, label);
    if (!input) {
        throw new Error('Can Not Find Dom with Text:' + label);
    }

    if (input.type === 'input') {
        await this.$clearValue(input.selector, value);
        await this.type(input.selector, value);
    }
    else {
        await this.$click(input.selector);
        await this.waitFor(30);
        await this.$waitFor(value);
        await this.$click(value);
    }
};
