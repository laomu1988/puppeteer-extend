/**
 * @file 根据文字取得输入框选择器
 * @author laomu1988
 */

/**
 * 根据文字取得输入框选择器
 *
 * @param {string} label 输入框前的label文字
 * @return {string} 输入框的css选择器，未找到时返回空字符串
 */
async function $getInputSelector(label) {
    return await this.evaluate(function (label) {
        return window.$client.labelInputSelector(label);
    }, label);
}

module.exports = $getInputSelector;
