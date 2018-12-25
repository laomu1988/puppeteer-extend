/**
 * @file 移动鼠标指定位置
 * @author laomu1988
 */


/**
 * 移动鼠标指定位置
 *
 * @param {string} start 起始目标节点的文字内容或css选择器
 * @param {string} target 目标选择文字内容或css选择器
 */
async function $moveTo(start, target) {
    let ps = await this.evaluate((start, target) => {
        let selector = window.$client.css(start, target);
        if (selector) {
            let dom = document.querySelector(selector);
            let ps = dom.getBoundingClientRect();
            let data = {
                x: ps.x,
                y: ps.y,
                selector: selector
            };
            return JSON.stringify(data);
        }
        return null;
    }, start, target);
    if (ps) {
        ps = JSON.parse(ps);
        await this.mouse.move(ps.x + 4, ps.y + 4, {steps: 3});
        await this.waitFor(20);
        await this.hover(ps.selector);
    }
    else {
        throw new Error('Can Not Find Dom: ' + start + ',' + target);
    }
}

module.exports = $moveTo;
