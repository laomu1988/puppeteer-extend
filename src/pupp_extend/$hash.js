/**
 * @file 修改页面的hash值
 * @author laomu1988
 */

/**
 * 修改页面的hash值
 *
 * @param {string} hash hash值
 */
async function $hash(hash) {
    if (hash[0] !== '#') {
        hash = '#' + hash;
    }
    await this.evaluate(hash => {
        location.hash = hash;
    }, hash);
}

module.exports = $hash;
