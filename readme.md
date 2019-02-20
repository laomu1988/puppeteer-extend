# puppeteer-extend
* 扩展ui测试工具puppeteer的方法，便于快速写测试示例

## 代码结构
```
|-- readme.md           // 说明文档
|-- src                 // 源代码目录
    |-- client_extend   // 浏览器端执行函数，会绑定在window.$client对象上以供后续调用
    |-- pupp_extend     // puppeteer扩展函数
    |-- index.js        // 总入口
    |-- client_extend.js  // 汇总浏览器端函数
|-- test                // 测试代码目录
    |-- config.json     // 手动创建的config.json配置文件
    |-- config.js
    |-- login.js        // 登录aicp系统处理
    |-- cases           // 测试Case
    |-- result          // 每个测试Case执行后的截图
|-- package.json
```

## 依赖
* node v8.0或以上版本
* puppeteer 测试工具
* chromium 测试示例执行环境


```sh
npm install # 正常安装
npm install --ignore-scripts # 不安装chromium，避免chromium下载失败问题，安装完之后需要手动下载https://download-chromium.appspot.com/并将Chromium.app放入项目根目录下
# 在test目录下创建config.json，配置host和用户信息后执行test,结构如下{host: "", user: {username: '', password: ''}}. 
# 登录host指定的系统，创建名称为auto-test的agent
npm run test
npm run test-debug # 带日志的调试输出
npm run test click # 执行单个测试case
```

## 示例
```js
const puppeteer = require('puppeteer');
const extend = require('puppeteer-extend');
(async () => {
    const browser = await puppeteer.launch({
        // executablePath: path.join(__dirname, '../Chromium.app/Contents/MacOS/Chromium'), // 修改执行的Chromium路径
        headless: headless,
        ignoreHTTPSErrors: true,
        defaultViewport: {
            width: 1280,
            height: 900
        }
    });
    const page = extend(await broswer.newPage());
    await page.goto('https://www.baidu.com');
    await page.$click('百度一下');

    await page.$chain() // 开启链式操作
        .goto('https://www.baidu.com')
        $click('百度一下')
        .end(); // 结束链式操作
})();
```

## api
* $clearValue(target) 清空输入框内容
* $click(target) 点击文字
* $clickClosest(start, target) 点击附近目标
* $getInputSelector(target) 取得目标附近的输入框的选择器
* $css(target) 取得文字所在dom的css选择器
* $hash(hash) 修改页面hash值
* $has(target) 判断页面是否包含目标元素
* $hover(target) hover指定元素
* $hoverClosest(target) hover指定元素
* $moveTo(target) 移动鼠标到target目标位置
* $pause(timeout) 暂停一段时间，单位ms
* $refresh() 刷新页面
* $setFieldValue(label, value) 设置表单的值，支持输入框、下拉菜单
* $setFrom(form) 输入表单内容，例如{"标题": "标题内容", "备注": "备注内容"}
* $setValue(label, value) 输入内容
* $waitForAny(target1, target2) 等待任一目标出现
* $waitFor(target, timeout) 等待目标出现
* $waitForNot(target) 等待目标消失
* $waitForNotLabel(target) 等待表单标签文字消失
* $waitForLabel(target) 等待表单标签文字（和$waitFor区别是$waitForLabel可以查询到`target:`和`target：`）
* $chain() 返回链式操作，最终需要调用end方法终止链操作
* $nextWindow() 切换到下一个窗口页面
* $prevWindow() 切换到上一个窗口页面


注意：其中target可以是文字内容或者css选择器。当是文字内容时，会去除空格后和dom节点文字内容剔除空格后内容比较，只有完全相同才认为是目标节点。

## [修改记录](https://github.com/laomu1988/puppeteer-extend/blob/master/CHANGELOG.md)
