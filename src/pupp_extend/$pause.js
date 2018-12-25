/**
 * @file 等待指定时间
 * @author laomu1988
 */

/**
 * 暂停指定时间
 *
 * @param {number} timeout 暂停时间，单位ms，默认100ms
 */
async function $pause(timeout = 100) {
    await this.waitFor(timeout);
}

module.exports = $pause;
