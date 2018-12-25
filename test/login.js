/**
 * @file 登录处理
 * @author muzhilong
 */

const config = require('./config');

module.exports = async page => {
    await page.goto(config.host + '/login.html');
    await page.$waitFor('登录', 3000);
    await page.$setValue('手机/邮箱/用户名', config.user.username);
    await page.$setValue('密码', config.user.password);
    await page.$click('登录');
    await page.$waitFor('Agent管理', 10000);
};

