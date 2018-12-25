/**
 * @file 设置输入框值
 * @author laomu1988
 */


/**
 * 设置输入框值
 *
 * @param {string} label 表单的label文字
 * @param {string} value 输入框输入内容
 */
async function $setValue(label, value = '') {
    let selector = await this.$getInputSelector(label);
    if (!selector) {
        throw new Error('Can Not Find Dom with Text:', label);
    }
    await this.type(selector, value);
}

module.exports = $setValue;
