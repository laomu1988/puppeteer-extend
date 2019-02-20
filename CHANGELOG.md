# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.1.0-2"></a>
# [0.1.0-2](https://github.com/laomu1988/puppeteer-extend/compare/v0.1.0-1...v0.1.0-2) (2019-02-20)


### Features

* 增加切换窗口$prevWindow和$nextWindow和初始化方法 ([e00fdf1](https://github.com/laomu1988/puppeteer-extend/commit/e00fdf1))



<a name="0.1.0-1"></a>
# [0.1.0-1](https://github.com/laomu1988/puppeteer-extend/compare/v0.1.0-0...v0.1.0-1) (2019-01-22)


### Bug Fixes

* 修复当页面跳转时执行函数抛出错误“Execution context was destroyed, most likely because of a navigation.” ([ee4c413](https://github.com/laomu1988/puppeteer-extend/commit/ee4c413))


### Features

* 注入可执行函数时假如页面正在跳转则等待页面跳转;链式操作未执行end时抛出错误；page注入函数增加beforeEach参数 ([a5ec03f](https://github.com/laomu1988/puppeteer-extend/commit/a5ec03f))



<a name="0.1.0-0"></a>
# [0.1.0-0](https://github.com/laomu1988/puppeteer-extend/compare/v0.0.3...v0.1.0-0) (2019-01-18)


### Features

* 增加链式操作$chain;默认超时时间改为5秒 ([bcaa1a3](https://github.com/laomu1988/puppeteer-extend/commit/bcaa1a3))



<a name="0.0.3"></a>
## [0.0.3](https://github.com/laomu1988/puppeteer-extend/compare/v0.0.2...v0.0.3) (2019-01-17)


### Bug Fixes

* 使用选择器查询元素时过滤掉隐藏元素；完善$client.isHidden函数 ([a1bcf3a](https://github.com/laomu1988/puppeteer-extend/commit/a1bcf3a))


### Features

* 增加$waitForLabel函数 ([fa552f6](https://github.com/laomu1988/puppeteer-extend/commit/fa552f6))
* 增加$waitForNotLabel; $refresh细节调整 ([64f652f](https://github.com/laomu1988/puppeteer-extend/commit/64f652f))



<a name="0.0.2"></a>
## 0.0.2 (2018-12-25)


### Bug Fixes

* findDom时box为空处理 ([b129ed3](https://github.com/laomu1988/puppeteer-extend/commit/b129ed3))
