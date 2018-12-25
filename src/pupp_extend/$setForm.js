/**
 * @file 输入表单内容，例如{"标题": "标题内容", "备注": "备注内容"}
 * @author laomu1988
 */

/**
 * 输入表单内容，例如{"标题": "标题内容", "备注": "备注内容"}
 *
 * @param {Object} form 表单内容
 */
async function $setForm(form) {
    for (let attr in form) {
        await this.$setFieldValue(attr, form[attr]);
    }
}

module.exports = $setForm;
